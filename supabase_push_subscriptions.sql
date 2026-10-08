-- ==============================================================================
-- BRICK & BEAMS: ADMIN PWA WEB PUSH SUBSCRIPTIONS TABLE
-- ==============================================================================
-- Run this script in the Supabase SQL Editor (optional, since a resilient
-- local JSON fallback is also built-in at src/data/push-subscriptions.json).
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.admin_push_subscriptions (
    id TEXT PRIMARY KEY,
    endpoint TEXT NOT NULL UNIQUE,
    p256dh TEXT NOT NULL,
    auth TEXT NOT NULL,
    user_agent TEXT,
    device_label TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for speedy lookups
CREATE INDEX IF NOT EXISTS idx_push_subs_endpoint ON public.admin_push_subscriptions(endpoint);

-- Enable Row Level Security (RLS)
ALTER TABLE public.admin_push_subscriptions ENABLE ROW LEVEL SECURITY;

-- Allow full access for backend service role
CREATE POLICY "Service role full access on push subscriptions"
ON public.admin_push_subscriptions
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
