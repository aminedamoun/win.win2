const SUPABASE_URL = 'https://nybgvfskctuljqlrsmsq.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_zbJZxJVPQmkJYK3lK9LrBg_BuJTg1A';

window.supabase = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
