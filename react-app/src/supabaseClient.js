import { createClient } from '@supabase/supabase-js';

// Replace these with your Supabase project credentials
const supabaseUrl = 'https://ybtnddtxgytkoxqjrxva.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlidG5kZHR4Z3l0a294cWpyeHZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMjM5OTUsImV4cCI6MjA3ODc5OTk5NX0.jckQQHkHgemY0vHuD7gagchye-_3mFUN4lBhyR1iTh4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
