-- ==============================================================================
-- Brick & Beams - Production Supabase Schema for Leads Management & Analytics
-- ==============================================================================
-- Run this script in the Supabase Dashboard:
-- 1. Go to your Supabase Project -> SQL Editor
-- 2. Click "New Query"
-- 3. Paste this entire file and click "Run" (Ctrl+Enter / Cmd+Enter)
-- ==============================================================================

-- 1. Create the leads table (if not already existing)
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    requirement TEXT NOT NULL DEFAULT '2 BHK',
    price_range TEXT,
    property_stage TEXT,
    property_category TEXT NOT NULL DEFAULT 'residential',
    transaction_type TEXT NOT NULL DEFAULT 'buy',
    source TEXT NOT NULL DEFAULT 'modal',
    status TEXT NOT NULL DEFAULT 'new',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Additive migration guards (safe to run on existing tables)
ALTER TABLE public.leads 
    ADD COLUMN IF NOT EXISTS email TEXT;

ALTER TABLE public.leads 
    ADD COLUMN IF NOT EXISTS price_range TEXT;

ALTER TABLE public.leads 
    ADD COLUMN IF NOT EXISTS property_stage TEXT;

ALTER TABLE public.leads 
    ADD COLUMN IF NOT EXISTS property_category TEXT NOT NULL DEFAULT 'residential';

ALTER TABLE public.leads 
    ADD COLUMN IF NOT EXISTS transaction_type TEXT NOT NULL DEFAULT 'buy';

ALTER TABLE public.leads 
    ADD COLUMN IF NOT EXISTS source TEXT NOT NULL DEFAULT 'modal';

ALTER TABLE public.leads 
    ADD COLUMN IF NOT EXISTS notes TEXT;

ALTER TABLE public.leads 
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now());

ALTER TABLE public.leads 
    ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'new';

-- 3. Ensure Status Check Constraint matches Brick N Beams Specification
ALTER TABLE public.leads 
    DROP CONSTRAINT IF EXISTS check_lead_status;

ALTER TABLE public.leads 
    ADD CONSTRAINT check_lead_status 
    CHECK (status IN ('new', 'contacted', 'site_visit', 'negotiation', 'converted', 'lost'));

-- 4. Property Category & Transaction Type Constraints (powers Bar Chart analytics)
ALTER TABLE public.leads 
    DROP CONSTRAINT IF EXISTS check_lead_category;

ALTER TABLE public.leads 
    ADD CONSTRAINT check_lead_category 
    CHECK (property_category IN ('residential', 'commercial'));

ALTER TABLE public.leads 
    DROP CONSTRAINT IF EXISTS check_lead_transaction;

ALTER TABLE public.leads 
    ADD CONSTRAINT check_lead_transaction 
    CHECK (transaction_type IN ('buy', 'sell', 'rent'));

-- 5. High-performance indexes for Dashboard & Filtering
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON public.leads (phone);
CREATE INDEX IF NOT EXISTS idx_leads_category_trans ON public.leads (property_category, transaction_type);

-- 6. Automatically update the updated_at timestamp on row change
CREATE OR REPLACE FUNCTION public.handle_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_leads_updated_at ON public.leads;

CREATE TRIGGER set_leads_updated_at
    BEFORE UPDATE ON public.leads
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_leads_updated_at();

-- 7. Row Level Security (RLS) Configuration
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous public submissions (inserts only) from the website enquiry modal/forms
DROP POLICY IF EXISTS "Allow anonymous lead submissions" ON public.leads;
CREATE POLICY "Allow anonymous lead submissions"
    ON public.leads
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Allow full access to the service_role (used securely by Next.js Server Route Handlers for Admin Panel)
DROP POLICY IF EXISTS "Allow service role full access" ON public.leads;
CREATE POLICY "Allow service role full access"
    ON public.leads
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

COMMENT ON TABLE public.leads IS 'Brick & Beams leads capturing residential & commercial enquiries with live admin tracking.';

-- ==============================================================================
-- 8. Create the properties table for the CMS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    developer TEXT NOT NULL,
    location TEXT NOT NULL,
    sub_location TEXT NOT NULL,
    starting_price TEXT NOT NULL,
    price_range TEXT NOT NULL,
    price_numeric BIGINT NOT NULL DEFAULT 0,
    bhk TEXT[] NOT NULL DEFAULT '{}',
    carpet_area TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Under Construction',
    category TEXT NOT NULL DEFAULT 'residential',
    type TEXT NOT NULL DEFAULT 'Luxury Apartments',
    possession TEXT NOT NULL,
    possession_year INTEGER NOT NULL DEFAULT 2026,
    image TEXT NOT NULL,
    gallery TEXT[] DEFAULT '{}',
    rera_number TEXT,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    overview TEXT,
    highlights TEXT[] DEFAULT '{}',
    amenities TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexes for lightning fast querying and CMS operations
CREATE INDEX IF NOT EXISTS idx_properties_slug ON public.properties (slug);
CREATE INDEX IF NOT EXISTS idx_properties_category ON public.properties (category);
CREATE INDEX IF NOT EXISTS idx_properties_status ON public.properties (status);
CREATE INDEX IF NOT EXISTS idx_properties_is_featured ON public.properties (is_featured);
CREATE INDEX IF NOT EXISTS idx_properties_created_at ON public.properties (created_at DESC);

-- Trigger to auto-update updated_at timestamp on property edits
CREATE OR REPLACE FUNCTION public.handle_properties_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_properties_updated_at ON public.properties;

CREATE TRIGGER set_properties_updated_at
    BEFORE UPDATE ON public.properties
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_properties_updated_at();

-- Row Level Security (RLS) for properties
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Allow public read access (for website visitors to browse properties)
DROP POLICY IF EXISTS "Allow public read access for properties" ON public.properties;
CREATE POLICY "Allow public read access for properties"
    ON public.properties
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- Allow full access to service_role (used securely by Next.js Admin CMS Route Handlers)
DROP POLICY IF EXISTS "Allow service role full access for properties" ON public.properties;
CREATE POLICY "Allow service role full access for properties"
    ON public.properties
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

COMMENT ON TABLE public.properties IS 'Brick & Beams properties CMS storing real estate project listings.';
