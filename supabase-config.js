// =====================================================
// SUPABASE CONFIGURATION
// =====================================================

// Replace these with YOUR Supabase project details.

const SUPABASE_URL =
    "https://tceummqoawvmqqprzkpr.supabase.co";

const SUPABASE_ANON_KEY =
    "sb_publishable_HicetVAd_hjnMlJtsjgEmw_x5WTKFci";

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
    );