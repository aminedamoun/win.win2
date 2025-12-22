const SUPABASE_URL = "https://owvufovfnngqdhbscoci.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93dnVmb3Zmbm5ncWRoYnNjb2NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0MTEwOTQsImV4cCI6MjA4MTk4NzA5NH0.sDDk9dKx_jHCEArBsyFzOrEMbSfHHnmZmcMD8znP2_I";

const { createClient } = window.supabase;
window.supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
