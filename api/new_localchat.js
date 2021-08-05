require("dotenv").config();
const {
  VITE_SUPABASE_URL,
  SUPABASE_SERVICE_KEY,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  SENDGRID_API_KEY,
  DEFAULT_MODERATOR_ID,
  SENDGRID_MSG_SERVICE_ID,
} = process.env;

// create supabase client
const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(VITE_SUPABASE_URL, SUPABASE_SERVICE_KEY);

// create twilio client
const Twilio = require("twilio");
const client = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// sendgrid client
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(SENDGRID_API_KEY);

exports.handler = async function (event) {
  // only allow POST method
  if (event.httpMethod != "POST") {
    return {
      statusCode: 405,
    };
  }

  // verify user is authenticated first
  const token = event.headers.token;
  const body = JSON.parse(event.body);

  const { data: user, error: user_error } = await supabase.auth.api.getUser(
    token
  );

  if (user_error) {
    return {
      statusCode: error.status,
      body: JSON.stringify({ message: error.message }),
    };
  }

  // insert new local chat
  const updates = {
    created_by: user.id,
    title: body.title,
    status: "Open",
    aog_airport: body.airport,
    details: body.details,
    reason: body.reason,
    aircraft_reg: body.aircraft_reg,
    aircraft_type: body.aircraft_type,
    beta_test: true, // beta testing
  };

  const {
    data: localchat,
    error,
    status,
  } = await supabase.from("localchats").insert(updates).single();

  if (localchat) {
    try {
      // add default moderator if not already included
      const moderators =
        localchat.created_by != DEFAULT_MODERATOR_ID
          ? [
              {
                localchat_id: localchat.id,
                user_id: user.id,
                is_moderator: true,
              },
              {
                localchat_id: localchat.id,
                user_id: DEFAULT_MODERATOR_ID,
                is_moderator: true,
              },
            ]
          : {
              localchat_id: localchat.id,
              user_id: user.id,
              is_moderator: true,
            };

      // add moderator
      const { data: moderator, error: moderator_error } = await supabase
        .from("participants")
        .insert(moderators);

      console.log(moderator || moderator_error);
      if (moderator_error) throw error;

      // post details as first message
      const { data: first_message, error: first_message_error } = await supabase
        .from("messages")
        .insert({
          localchat_id: localchat.id,
          user: user.id,
          message: localchat.details,
        })
        .single();

      console.log(first_message || first_message_error);
      if (first_message_error) throw error;

      // don't add anyone else if it's a beta test
      if (!localchat.beta_test) {
        // parse airports
        const airports = [];
        for (var o in body.nearby_airports) {
          airports.push(body.nearby_airports[o].id);
        }
        // add participants
        const { data: add_users_to_chat, error: add_users_to_chat_error } =
          await supabase.rpc("add_users_to_chat", {
            chat_id: localchat.id,
            airports: airports,
          });

        console.log(add_users_to_chat || add_users_to_chat_error);
        if (add_users_to_chat_error) throw error;
      }

      // get participants
      const { data: participants, error: participants_error } = await supabase
        .from("participants")
        .select("id, profiles(username, phone_number, email)")
        .eq("localchat_id", localchat.id);

      console.log(participants || participants_error);
      if (participants_error) throw error;

      const to_emails = [];

      // notifications

      for (const user of participants) {
        // send sms if participant has phone number
        if (user.profiles.phone_number) {
          const message = await client.messages.create({
            body: `${
              localchat.beta_test ? "[THIS IS A TEST MESSAGE]\n \n" : ""
            }${localchat.title}\n \nMessage from pilot: "${
              localchat.details
            }"\n \nJoin the chatroom by logging into aogcommunity.org`,
            messagingServiceSid: SENDGRID_MSG_SERVICE_ID,
            to: user.profiles.phone_number,
          });
          console.log(message);
        }
        // add to bulk email
        if (user.profiles.email) {
          to_emails.push({
            to: [
              {
                email: user.profiles.email,
              },
            ],
          });
        }
      }

      // bulk email notification to participants
      const msg = {
        personalizations: to_emails,
        from: {
          email: "no_reply@aogcommunity.org",
          name: "AOGCommunity.org",
        },
        reply_to: {
          email: "support@aogcommunity.org",
          name: "AOGCommunity.org",
        },
        template_id: localchat.beta_test
          ? "d-1ec82793109f48e4a72d1301112e67bb"
          : "d-fd04f505c09f4355856586d9c4338213",
        dynamic_template_data: {
          title: localchat.title,
          airport: localchat.airport,
          details: localchat.details,
        },
        tracking_settings: {
          click_tracking: {
            enable: true,
            enable_text: false,
          },
          open_tracking: {
            enable: true,
          },
        },
        asm: {
          groupId: 18640,
        },
      };

      // send it
      const email_res = await sgMail.send(msg);
      console.log(email_res);
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(localchat),
    };
  } else {
    return {
      statusCode: status,
      body: JSON.stringify(error),
    };
  }
};
