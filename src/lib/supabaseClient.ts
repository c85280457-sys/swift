
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xmundjnfmiqyqlykxlpw.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtdW5kam5mbWlxeXFseWt4bHB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwMDc5NDcsImV4cCI6MjA4MTU4Mzk0N30.QFiHtwqp7n3WIEaxiJmGVFB9JHjXnnYLNo5lGzK01XE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
