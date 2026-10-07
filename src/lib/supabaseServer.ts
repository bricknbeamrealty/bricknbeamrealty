import { createClient, SupabaseClient } from "@supabase/supabase-js";

export type LeadStatus =
  | "new"
  | "contacted"
  | "site_visit"
  | "negotiation"
  | "converted"
  | "lost";

export type PropertyCategory = "residential" | "commercial";
export type TransactionType = "buy" | "sell" | "rent";
export type LeadSource = "modal" | "contact_page" | "website";

export interface Lead {
  id: string;
  full_name: string;
  phone: string;
  email?: string | null;
  requirement: string;
  price_range?: string | null;
  property_stage?: string | null;
  property_category: PropertyCategory;
  transaction_type: TransactionType;
  source: LeadSource;
  status: LeadStatus;
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface LeadInput {
  full_name: string;
  phone: string;
  email?: string | null;
  requirement: string;
  price_range?: string | null;
  property_stage?: string | null;
  property_category?: PropertyCategory;
  transaction_type?: TransactionType;
  source?: LeadSource;
  notes?: string | null;
}

let supabaseServerClient: SupabaseClient | null = null;

export function getSupabaseServerClient(): SupabaseClient {
  if (supabaseServerClient) {
    return supabaseServerClient;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // Use service role key on the server side to bypass RLS for admin operations,
  // falling back to anon key if service role is not yet set up
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Supabase credentials are missing. Please configure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY) in .env.local"
    );
  }

  supabaseServerClient = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return supabaseServerClient;
}

export function isSupabaseConfigured(): boolean {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(supabaseUrl && supabaseKey && supabaseUrl.startsWith("http"));
}
