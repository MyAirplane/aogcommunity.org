require("dotenv").config();
const {
  VITE_SUPABASE_URL,
  SUPABASE_SERVICE_KEY,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  SENDGRID_API_KEY,
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

  if (body.localchat) {
    try {
      // get participants
      const { data: participants, error: participants_error } = await supabase
        .from("participants")
        .select("id, profiles(username, phone_number, email)")
        .eq("localchat_id", body.localchat.id);

      console.log(participants || participants_error);
      if (participants_error) throw error;

      const to_emails = [];

      // notifications

      for (const user of participants) {
        // send sms if participant has phone number
        if (user.profiles.phone_number) {
          const message = await client.messages.create({
            body: `${
              body.localchat.beta_test ? "[THIS IS A TEST MESSAGE]\n \n" : ""
            }${body.localchat.title}\n \nStatus has been updated to: "${
              body.localchat.status
            }"\n \nContinue the conversation at aogcommunity.org`,
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
        template_id: body.localchat.beta_test
          ? "d-1ec82793109f48e4a72d1301112e67bb"
          : "d-fd04f505c09f4355856586d9c4338213",
        dynamic_template_data: {
          title: body.localchat.title,
          airport: body.localchat.airport,
          details: body.localchat.details,
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
      // body: JSON.stringify(localchat),
    };
  } else {
    return {
      statusCode: status,
      body: JSON.stringify(error),
    };
  }
};
