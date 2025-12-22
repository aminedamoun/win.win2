
// /js/supabaseClient.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

// ✅ USE YOUR REAL PROJECT
const SUPABASE_URL = "https://owvufovfnngqdhbscoci.supabase.co";

// ✅ REAL ANON KEY (FROM SUPABASE → Settings → API → anon public)
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55Ymd2ZnNrdGN1bGpxbHJzbXNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0MjYwMTgsImV4cCI6MjA4MjAwMjAxOH0.mtGthHGaMrczVSyIysSTbnQioLdkq_mIPce_27KMjLg";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// expose globally for plain HTML
window.supabase = supabase;
