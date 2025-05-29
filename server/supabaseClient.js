// server/supabaseClient.js
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config(); // Load .env file from server directory

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing in the server/.env file.');
  // Optionally, throw an error or exit if Supabase config is critical
  // throw new Error('Supabase configuration is missing.');
}

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = supabase;
