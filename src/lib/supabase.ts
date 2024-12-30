import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';
import { getEnvVar } from './env';

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY');

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);