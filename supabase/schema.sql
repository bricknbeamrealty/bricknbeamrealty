-- ==============================================================================
-- Brick & Beams - Production Supabase Schema
-- Includes: Leads CRM, Properties CMS, and Storage Bucket for Image Uploads
-- ==============================================================================
-- Run this script in your Supabase Dashboard:
-- 1. Go to your Supabase Project -> SQL Editor
-- 2. Click "New Query"
-- 3. Paste this entire file and click "Run" (Ctrl+Enter / Cmd+Enter)
-- ==============================================================================

-- ==============================================================================
-- SECTION 1: LEADS CRM TABLE & POLICIES
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
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS price_range TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS property_stage TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS property_category TEXT NOT NULL DEFAULT 'residential';
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS transaction_type TEXT NOT NULL DEFAULT 'buy';
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS source TEXT NOT NULL DEFAULT 'modal';
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS notes TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now());
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'new';

-- 3. Lead Constraints
ALTER TABLE public.leads DROP CONSTRAINT IF EXISTS check_lead_status;
ALTER TABLE public.leads ADD CONSTRAINT check_lead_status 
    CHECK (status IN ('new', 'contacted', 'site_visit', 'negotiation', 'converted', 'lost'));

ALTER TABLE public.leads DROP CONSTRAINT IF EXISTS check_lead_category;
ALTER TABLE public.leads ADD CONSTRAINT check_lead_category 
    CHECK (property_category IN ('residential', 'commercial'));

ALTER TABLE public.leads DROP CONSTRAINT IF EXISTS check_lead_transaction;
ALTER TABLE public.leads ADD CONSTRAINT check_lead_transaction 
    CHECK (transaction_type IN ('buy', 'sell', 'rent'));

-- 4. High-performance indexes for Leads CRM & Analytics Dashboard
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON public.leads (phone);
CREATE INDEX IF NOT EXISTS idx_leads_category_trans ON public.leads (property_category, transaction_type);

-- 5. Auto-update trigger for leads updated_at
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

-- 6. Row Level Security (RLS) for Leads
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow public anonymous submissions (INSERT only) from website modal & contact forms
DROP POLICY IF EXISTS "Allow anonymous lead submissions" ON public.leads;
CREATE POLICY "Allow anonymous lead submissions"
    ON public.leads
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Allow full access to service_role (used by Next.js Admin API routes)
DROP POLICY IF EXISTS "Allow service role full access" ON public.leads;
CREATE POLICY "Allow service role full access"
    ON public.leads
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

COMMENT ON TABLE public.leads IS 'Brick & Beams leads capturing residential & commercial enquiries with live admin tracking.';


-- ==============================================================================
-- SECTION 2: PROPERTIES CMS TABLE & POLICIES
-- ==============================================================================

-- 1. Create the properties table
-- NOTE: id is TEXT to support slug-based IDs (e.g. 'raymond-ten-x-era') as well as UUIDs
CREATE TABLE IF NOT EXISTS public.properties (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    developer TEXT NOT NULL,
    property_type TEXT NOT NULL DEFAULT 'residential',
    property_type_label TEXT NOT NULL DEFAULT 'Residential High-Rise',
    location TEXT NOT NULL,
    sub_location TEXT NOT NULL,
    price_starting_from TEXT NOT NULL,
    pricing TEXT NOT NULL,
    price_numeric BIGINT NOT NULL DEFAULT 0,
    area TEXT NOT NULL,
    possession TEXT NOT NULL,
    possession_year INTEGER NOT NULL DEFAULT 2028,
    bhks TEXT[] NOT NULL DEFAULT '{}',
    bhk_numeric INTEGER[] NOT NULL DEFAULT '{}',
    rera TEXT NOT NULL DEFAULT 'Applied',
    status TEXT NOT NULL DEFAULT 'Under Construction',
    is_featured BOOLEAN NOT NULL DEFAULT false,
    image TEXT NOT NULL,
    overview TEXT,
    amenities TEXT[] NOT NULL DEFAULT '{}',
    key_highlights TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Additive migration guards (in case table was created with older schema)
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS property_type TEXT NOT NULL DEFAULT 'residential';
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS property_type_label TEXT NOT NULL DEFAULT 'Residential High-Rise';
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS price_starting_from TEXT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS pricing TEXT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS area TEXT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS bhks TEXT[] NOT NULL DEFAULT '{}';
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS bhk_numeric INTEGER[] NOT NULL DEFAULT '{}';
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS rera TEXT NOT NULL DEFAULT 'Applied';
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS key_highlights TEXT[] NOT NULL DEFAULT '{}';
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS amenities TEXT[] NOT NULL DEFAULT '{}';
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS is_featured BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now());

-- 3. If previous columns existed, sync data over seamlessly
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'properties' AND column_name = 'category') THEN
        UPDATE public.properties SET property_type = category WHERE property_type IS NULL OR property_type = 'residential';
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'properties' AND column_name = 'type') THEN
        UPDATE public.properties SET property_type_label = type WHERE property_type_label IS NULL OR property_type_label = 'Residential High-Rise';
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'properties' AND column_name = 'starting_price') THEN
        UPDATE public.properties SET price_starting_from = starting_price WHERE price_starting_from IS NULL;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'properties' AND column_name = 'price_range') THEN
        UPDATE public.properties SET pricing = price_range WHERE pricing IS NULL;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'properties' AND column_name = 'carpet_area') THEN
        UPDATE public.properties SET area = carpet_area WHERE area IS NULL;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'properties' AND column_name = 'bhk') THEN
        UPDATE public.properties SET bhks = bhk WHERE bhks IS NULL OR bhks = '{}';
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'properties' AND column_name = 'rera_number') THEN
        UPDATE public.properties SET rera = rera_number WHERE rera IS NULL OR rera = 'Applied';
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'properties' AND column_name = 'highlights') THEN
        UPDATE public.properties SET key_highlights = highlights WHERE key_highlights IS NULL OR key_highlights = '{}';
    END IF;
END $$;

-- 4. High-performance indexes for properties querying & filtering
CREATE INDEX IF NOT EXISTS idx_properties_slug ON public.properties (slug);
CREATE INDEX IF NOT EXISTS idx_properties_type ON public.properties (property_type);
CREATE INDEX IF NOT EXISTS idx_properties_status ON public.properties (status);
CREATE INDEX IF NOT EXISTS idx_properties_is_featured ON public.properties (is_featured);
CREATE INDEX IF NOT EXISTS idx_properties_price_numeric ON public.properties (price_numeric);
CREATE INDEX IF NOT EXISTS idx_properties_created_at ON public.properties (created_at DESC);

-- 5. Auto-update trigger for properties updated_at
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

-- 6. Row Level Security (RLS) for Properties
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Allow public read access (for all website visitors to view properties)
DROP POLICY IF EXISTS "Allow public read access for properties" ON public.properties;
CREATE POLICY "Allow public read access for properties"
    ON public.properties
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- Allow full access to service_role (used by Next.js Admin CMS route handlers)
DROP POLICY IF EXISTS "Allow service role full access for properties" ON public.properties;
CREATE POLICY "Allow service role full access for properties"
    ON public.properties
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

COMMENT ON TABLE public.properties IS 'Brick & Beams properties CMS storing real estate project listings.';


-- ==============================================================================
-- SECTION 3: SUPABASE STORAGE BUCKET FOR IMAGE UPLOADS
-- ==============================================================================

-- 1. Create or configure the 'project-images' public storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'project-images',
    'project-images',
    true,
    10485760, -- 10MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE 
SET public = true,
    file_size_limit = 10485760,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif', 'image/svg+xml'];

-- 2. Allow public read access on all images in 'project-images'
DROP POLICY IF EXISTS "Public can view project images" ON storage.objects;
CREATE POLICY "Public can view project images"
    ON storage.objects
    FOR SELECT
    TO public
    USING (bucket_id = 'project-images');

-- 3. Allow uploads & modifications for service_role, authenticated, and server clients
DROP POLICY IF EXISTS "Admin and service role can upload project images" ON storage.objects;
CREATE POLICY "Admin and service role can upload project images"
    ON storage.objects
    FOR ALL
    TO anon, authenticated, service_role
    USING (bucket_id = 'project-images')
    WITH CHECK (bucket_id = 'project-images');
