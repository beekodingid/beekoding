import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_CONFIG_KEY = 'beekoding_supabase_config_v1';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

export interface ConnectionTestResult {
  success: boolean;
  message: string;
  latencyMs?: number;
  tablesFound?: boolean;
}

let cachedClient: SupabaseClient | null = null;
let lastConfigHash: string = '';

export function getSupabaseCredentials(): SupabaseConfig {
  try {
    const raw = localStorage.getItem(SUPABASE_CONFIG_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.url && parsed.anonKey) {
        return {
          url: parsed.url.trim(),
          anonKey: parsed.anonKey.trim(),
        };
      }
    }
  } catch {
    // Ignore error, fallback to env
  }

  // Fallback to Vite env variables
  const envUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
  const envKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

  return {
    url: envUrl,
    anonKey: envKey,
  };
}

export function saveSupabaseCredentials(url: string, anonKey: string): void {
  const cleanUrl = url.trim();
  const cleanKey = anonKey.trim();
  localStorage.setItem(
    SUPABASE_CONFIG_KEY,
    JSON.stringify({ url: cleanUrl, anonKey: cleanKey })
  );
  cachedClient = null;
  lastConfigHash = '';
}

export function clearSupabaseCredentials(): void {
  localStorage.removeItem(SUPABASE_CONFIG_KEY);
  cachedClient = null;
  lastConfigHash = '';
}

export function isSupabaseConfigured(): boolean {
  const { url, anonKey } = getSupabaseCredentials();
  return (
    url.length > 10 &&
    (url.startsWith('https://') || url.startsWith('http://')) &&
    anonKey.length > 20
  );
}

export function getSupabaseClient(): SupabaseClient | null {
  const config = getSupabaseCredentials();
  if (!isSupabaseConfigured()) {
    return null;
  }

  const currentHash = `${config.url}::${config.anonKey}`;
  if (cachedClient && lastConfigHash === currentHash) {
    return cachedClient;
  }

  try {
    cachedClient = createClient(config.url, config.anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
    lastConfigHash = currentHash;
    return cachedClient;
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
    return null;
  }
}

export async function testSupabaseConnection(): Promise<ConnectionTestResult> {
  const client = getSupabaseClient();
  if (!client) {
    return {
      success: false,
      message: 'Kredensial Supabase URL atau Anon Key belum diisi atau tidak valid.',
    };
  }

  const startTime = Date.now();
  try {
    // 1. Uji kueri ringan ke tabel system_settings
    const { error } = await client
      .from('system_settings')
      .select('id, institution_name')
      .limit(1);

    const latencyMs = Date.now() - startTime;

    if (error) {
      // Jika tabel belum dibuat tapi koneksi API Supabase valid
      if (
        error.code === '42P01' ||
        error.code === 'PGRST205' ||
        error.message.includes('relation') ||
        error.message.includes('does not exist') ||
        error.message.includes('schema cache') ||
        error.message.includes('Could not find the table')
      ) {
        return {
          success: true,
          tablesFound: false,
          latencyMs,
          message:
            'Koneksi API Supabase berhasil! Namun skema tabel belum dibuat di database. Silakan buka SQL Editor di Supabase lalu jalankan query migrasi.',
        };
      }
      return {
        success: false,
        latencyMs,
        message: `Gagal terhubung ke database: ${error.message} (Kode: ${error.code || 'ERR'})`,
      };
    }

    return {
      success: true,
      tablesFound: true,
      latencyMs,
      message: `Koneksi ke Cloud PostgreSQL Supabase berhasil! (Latensi: ${latencyMs}ms)`,
    };
  } catch (err: any) {
    return {
      success: false,
      latencyMs: Date.now() - startTime,
      message: `Koneksi gagal: ${err?.message || 'Tidak dapat menghubungi server Supabase'}`,
    };
  }
}
