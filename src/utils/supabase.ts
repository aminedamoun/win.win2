import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://owvufovfnngqdhbscoci.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93dnVmb3Zmbm5ncWRoYnNjb2NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0MTEwOTQsImV4cCI6MjA4MTk4NzA5NH0.sDDk9dKx_jHCEArBsyFzOrEMbSfHHnmZmcMD8znP2_I';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
