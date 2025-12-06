import { createClient } from '@supabase/supabase-js';

// Configurações do Supabase fornecidas
const PROJECT_URL = 'https://bzuecinjzrvgxvezxijs.supabase.co';
const ANON_KEY = 'sb_publishable_HaS6Eb5xO3-_g9rHT9FcVQ_5oiYbgTn';

// Verificação para garantir que o cliente está configurado
export const isSupabaseConfigured = () => {
  return PROJECT_URL.startsWith('http') && ANON_KEY.length > 0;
};

export const supabase = createClient(PROJECT_URL, ANON_KEY);