require("dotenv").config();
const {
  VITE_SUPABASE_URL,
  SUPABASE_SERVICE_KEY,
  SENDGRID_API_KEY,
  SENDGRID_MSG_SERVICE_ID,
  SUPPORT_EMAIL,
} = process.env;

// supabase client
const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(VITE_SUPABASE_URL, SUPABASE_SERVICE_KEY);

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

  console.log(user);

  if (user_error) {
    return {
      statusCode: error.status,
      body: JSON.stringify({ message: error.message }),
    };
  }

  const first_name =
    body.first_name.toUpperCase() + " " + body.middle_name.toUpperCase();

  const last_name = body.last_name.toUpperCase() + " ";

  if (body.med_class != "BasicMed") {
    // format the date per faa spec
    let md_parser = body.med_date.split("/");
    let med_date = md_parser[0] + md_parser[2];

    // verify from medical date
    const { data, error, status, count } = await supabase
      .from("pilots_basic")
      .select("UNIQUE_ID", { count: "exact" })
      .eq("FIRST_NAME", first_name)
      .eq("LAST_NAME", last_name)
      .eq("MED_CLASS", body.med_class)
      .eq("MED_DATE", med_date);

    console.log(data || error);

    if (!count) {
      // no count, update profile to under_review
      const { data: profile, error: profile_error } = await supabase
        .from("profiles")
        .update({
          verified: false,
          verified_id: "under_review",
        })
        .eq("id", user.id)
        .single();

      console.log(profile || profile_error);

      // notify support for manual verification
      const msg = {
        to: SUPPORT_EMAIL,
        from: "no_reply@aogcommunity.org",
        reply_to: profile.email,
        subject: `Pilot Verification Request for ${profile.username}`,
        text: `User ${profile.username} requires manual verification.`,
        html: `<h3>Pilot Verification Request</h3>
                  <ul>
                      <li><b>Username:</b> ${profile.username}</li>
                      <li><b>First Name:</b> ${first_name}</li>
                      <li><b>Last Name:</b> ${last_name}</li>
                      <li><b>Medical Class:</b> ${body.med_class}</li>
                      <li><b>Medical Date:</b> ${body.med_date}</li>
                  </ul>`,
      };

      // send it
      const email_res = await sgMail.send(msg);

      console.log(email_res);

      return {
        statusCode: status,
        body: JSON.stringify({
          under_review: true,
          verified: false,
        }),
      };
    } else if (count == 1) {
      // verified, update profile & return ID
      const { data: profile, error: profile_error } = await supabase
        .from("profiles")
        .update({
          verified: true,
          verified_id: data[0].UNIQUE_ID,
        })
        .eq("id", user.id);

      console.log(profile || profile_error);

      if (profile) {
        return {
          statusCode: status,
          body: JSON.stringify({
            count: count,
            verified: true,
            verified_id: data[0].UNIQUE_ID,
          }),
        };
      }
    }
  } else {
    // verify from basicmed
    // format the date per faa spec
    let md_parser = body.med_date.split("/");
    let med_date = md_parser[2] + md_parser[0] + md_parser[1];

    const { data, error, status, count } = await supabase
      .from("pilots_basic")
      .select("UNIQUE_ID", { count: "exact" })
      .eq("FIRST_NAME", first_name)
      .eq("LAST_NAME", last_name)
      .eq("BASIC_MED_CMEC_DATE", med_date);

    console.log(data || error);

    if (!count) {
      // no count, return 0
      return {
        statusCode: status,
        body: JSON.stringify({
          count: count,
          verified: false,
        }),
      };
    } else if (count == 1) {
      // verified, update profile & return ID
      const { data: profile, error: profile_error } = await supabase
        .from("profiles")
        .update({
          verified: true,
          verified_id: data[0].UNIQUE_ID,
        })
        .eq("id", user.id);

      console.log(profile || profile_error);

      if (profile) {
        return {
          statusCode: status,
          body: JSON.stringify({
            count: count,
            verified: true,
            verified_id: data[0].UNIQUE_ID,
          }),
        };
      }
    } else {
      // if count > 1... use /api/verify-pilot-city, otherwise verify manually. handle on client-side.
      return {
        statusCode: status,
        body: JSON.stringify({
          count: count,
          verified: false,
        }),
      };
    }
  }
};
