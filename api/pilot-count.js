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

  const { count } = await supabase
    .from("profiles")
    .select("*", { count: "exact" });

  return {
    statusCode: 200,
    body: JSON.stringify({ count: count }),
  };
};
