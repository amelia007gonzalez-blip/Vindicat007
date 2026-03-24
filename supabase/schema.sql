-- Create at: 2026-03-24
-- Description: Anonymized Audit Logs for Vindicat007

CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now(),
    recoverable_amount DECIMAL(10, 2) NOT NULL,
    issues_count INTEGER NOT NULL,
    location_region TEXT, -- General region, not specific address
    infraccion_types TEXT[] -- Array of types (VAT_ERROR, SHRINKFLATION, etc)
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts for local edge-computing reports
CREATE POLICY "Allow anonymous inserts" ON public.audit_logs
FOR INSERT WITH CHECK (true);

-- Allow anonymous selects (optional - for public statistics)
CREATE POLICY "Allow anonymous selects" ON public.audit_logs
FOR SELECT USING (true);
