const SUPABASE_URL = 'https://nybgvfsktculjqlrsmsq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55Ymd2ZnNrdGN1bGpxbHJzbXNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0MjYwMTgsImV4cCI6MjA4MjAwMjAxOH0.mtGthHGaMrczVSyIysSTbnQioLdkq_mIPce_27KMjLg';

window.supabase = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
