
-- Waitlist signups table
CREATE TABLE public.waitlist_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  name text,
  referred_by_code text,
  referral_code text NOT NULL UNIQUE DEFAULT lower(substr(md5(random()::text || clock_timestamp()::text), 1, 8)),
  position integer,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Auto-assign position
CREATE OR REPLACE FUNCTION public.set_waitlist_position()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  NEW.position := (SELECT COALESCE(MAX(position), 0) + 1 FROM public.waitlist_signups);
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_set_waitlist_position
BEFORE INSERT ON public.waitlist_signups
FOR EACH ROW EXECUTE FUNCTION public.set_waitlist_position();

ALTER TABLE public.waitlist_signups ENABLE ROW LEVEL SECURITY;

-- Anyone can sign up
CREATE POLICY "Anyone can join waitlist"
  ON public.waitlist_signups FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Public count view (no PII)
CREATE OR REPLACE VIEW public.waitlist_stats
WITH (security_invoker = true) AS
SELECT count(*)::int AS total FROM public.waitlist_signups;

GRANT SELECT ON public.waitlist_stats TO anon, authenticated;

-- Theme + streak prefs on profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS theme_preset text DEFAULT 'midnight',
  ADD COLUMN IF NOT EXISTS current_streak integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS longest_streak integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_session_date date;

-- UPDATE policy on profiles already exists; nothing to add.
