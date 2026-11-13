import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  !supabaseUrl.includes('your-project-ref') &&
  supabaseAnonKey !== 'your-anon-key-here'
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Registers an email for the Wave 1 waitlist.
 * When Supabase keys are provided, it performs a real DB insert.
 * Falls back to simulated response if keys are not yet configured.
 * 
 * @param {string} email
 * @param {string} tier
 * @returns {Promise<{ success: boolean, error?: string, isDuplicate?: boolean }>}
 */
export async function registerWaitlistUser(email, tier = 'Pro') {
  const cleanEmail = email.trim().toLowerCase();

  if (!isSupabaseConfigured || !supabase) {
    console.warn(
      '[GhostLead] Supabase is not configured with real credentials yet. Falling back to local simulation.'
    );
    // Simulate a brief network roundtrip for smooth UX
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { success: true };
  }

  try {
    const { error } = await supabase
      .from('waitlist')
      .insert([
        {
          email: cleanEmail,
          tier: tier || 'Pro',
        },
      ]);

    if (error) {
      // PostgreSQL code 23505: unique_violation (email already on waitlist)
      if (error.code === '23505' || error.message?.includes('duplicate key')) {
        return {
          success: true,
          isDuplicate: true,
        };
      }
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Network error. Please try again.',
    };
  }
}

/**
 * Submits a 50-Lead Free Pilot request for the DFY Agency offer.
 * Inserts into `dfy_leads` table without `.select()`.
 * If `dfy_leads` does not exist (code 42P01 or PGRST205),
 * automatically falls back to inserting into `waitlist` with tier dfy_starter|dfy_growth|dfy_scale.
 *
 * @param {{
 *   email: string,
 *   targetIcp: string,
 *   volume: string,
 *   tier: string,
 *   notes?: string,
 *   sourcePath?: string
 * }} data
 * @returns {Promise<{ success: boolean, error?: string, isDuplicate?: boolean, fallback?: boolean }>}
 */
export async function submitDfyPilotLead({ email, targetIcp, volume, tier, notes = '', sourcePath = '' }) {
  const cleanEmail = String(email || '').trim().toLowerCase();
  const cleanIcp = String(targetIcp || '').trim();
  const cleanVolume = String(volume || '').trim();
  const cleanTier = String(tier || '').trim();
  const cleanNotes = String(notes || '').trim() || null;
  const path = sourcePath || (typeof window !== 'undefined' ? window.location.pathname : '/agency');

  // Map tier to waitlist fallback format: dfy_starter | dfy_growth | dfy_scale
  const tierLower = cleanTier.toLowerCase();
  let fallbackTier = 'dfy_growth';
  if (tierLower.includes('starter')) {
    fallbackTier = 'dfy_starter';
  } else if (tierLower.includes('scale')) {
    fallbackTier = 'dfy_scale';
  }

  if (!isSupabaseConfigured || !supabase) {
    console.warn(
      '[GhostLead DFY] Supabase is not configured with real credentials yet. Falling back to local simulation.'
    );
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { success: true, fallback: false };
  }

  try {
    // 1. Primary insert into dfy_leads table (NO .select())
    const { error } = await supabase
      .from('dfy_leads')
      .insert([
        {
          email: cleanEmail,
          target_icp: cleanIcp,
          volume: cleanVolume,
          tier: cleanTier,
          notes: cleanNotes,
          source_path: path,
        },
      ]);

    if (!error) {
      return { success: true };
    }

    // 2. Check if error indicates missing table (PostgreSQL 42P01 or PostgREST PGRST205)
    const isMissingTable =
      error.code === '42P01' ||
      error.code === 'PGRST205' ||
      error.message?.includes('does not exist') ||
      error.message?.includes('relation "public.dfy_leads" does not exist') ||
      error.message?.includes('Could not find the table');

    if (isMissingTable) {
      console.warn(
        `[GhostLead DFY] Table "dfy_leads" not found (code: ${error.code || 'unknown'}). Falling back to "waitlist" table.`
      );

      // Fallback insert to waitlist table
      // (Waitlist schema has email and tier columns only; no metadata column)
      const { error: waitlistError } = await supabase
        .from('waitlist')
        .insert([
          {
            email: cleanEmail,
            tier: fallbackTier,
          },
        ]);

      if (waitlistError) {
        if (waitlistError.code === '23505' || waitlistError.message?.includes('duplicate key')) {
          return { success: true, isDuplicate: true, fallback: true };
        }
        return { success: false, error: waitlistError.message, fallback: true };
      }

      return { success: true, fallback: true };
    }

    // Other PostgreSQL error (e.g. check constraint failure)
    return { success: false, error: error.message };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Network error. Please try again.',
    };
  }
}

