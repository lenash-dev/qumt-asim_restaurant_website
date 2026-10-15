import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/** Solo el origen: tolera que se copie la URL del endpoint REST (…/rest/v1/). */
function projectUrl(raw: string | undefined) {
  try {
    return raw ? new URL(raw.trim()).origin : undefined;
  } catch {
    return undefined;
  }
}

const url = projectUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();

/** `false` mientras no se configure .env (la web usa los datos de ejemplo). */
export const isSupabaseConfigured = Boolean(url && key);

let client: SupabaseClient | null = null;

/**
 * Cliente con la clave pública (rol `anon`): solo puede leer el menú
 * publicado y las promociones vigentes, y crear reservas y solicitudes.
 * Los permisos los define RLS en la base de datos.
 */
export function getSupabase() {
  if (!isSupabaseConfigured) return null;
  client ??= createClient(url!, key!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}
