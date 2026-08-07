CREATE OR REPLACE FUNCTION public.get_public_counts()
RETURNS TABLE (readings_week bigint, members bigint)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    (SELECT count(*) FROM public.emotion_sessions WHERE created_at >= now() - interval '7 days'),
    (SELECT count(*) FROM public.waitlist_signups);
$$;

REVOKE ALL ON FUNCTION public.get_public_counts() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_public_counts() TO anon, authenticated, service_role;