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
