require("dotenv").config();
const { VITE_SUPABASE_URL, SUPABASE_SERVICE_KEY } = process.env;
const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(VITE_SUPABASE_URL, SUPABASE_SERVICE_KEY);

exports.handler = async function (event) {
  if (event.httpMethod != "GET") {
    return {
      statusCode: 405,
    };
  }

  const { data } = await supabase.rpc("get_user_count");

  return {
    statusCode: 200,
    body: JSON.stringify({ count: data || 0 }),
  };
};
