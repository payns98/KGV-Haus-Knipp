// supabaseClient.js


import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qvuorkjptwisgjuskuhh.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2dW9ya2pwdHdpc2dqdXNrdWhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4NzkwNDEsImV4cCI6MjA4MDQ1NTA0MX0.Y343ojdZTKpeUp2y6jYpWp_BZ0aGns4FwGGxBKgd9q0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
