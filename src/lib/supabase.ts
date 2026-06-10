import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "⚠️ Supabase credentials missing! Check your .env.local configuration file and restart the dev server."
  );
}

// Fallback to placeholder strings if undefined to prevent app runtime compilation failure
export const supabase = createClient(
  supabaseUrl || 'https://tmkmiwmuuljqgxdpbxgt.supabase.co',
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRta21pd211dWxqcWd4ZHBieGd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5Mjg4MjcsImV4cCI6MjA5NjUwNDgyN30.rE_e1Q0XOSEKcJI6lP1Argsv017iafSs_TPLG48uEKM'
);