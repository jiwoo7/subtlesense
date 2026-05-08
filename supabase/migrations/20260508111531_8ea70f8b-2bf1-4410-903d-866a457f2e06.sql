-- Fix mood_analytics view: use security_invoker so caller RLS applies; revoke anon
ALTER VIEW public.mood_analytics SET (security_invoker = on);
REVOKE ALL ON public.mood_analytics FROM anon, public;
GRANT SELECT ON public.mood_analytics TO authenticated;

-- Restrict public-role policies to authenticated only

-- emotion_sessions
DROP POLICY IF EXISTS "Users can view their own sessions" ON public.emotion_sessions;
DROP POLICY IF EXISTS "Users can create their own sessions" ON public.emotion_sessions;
DROP POLICY IF EXISTS "Users can delete their own sessions" ON public.emotion_sessions;
CREATE POLICY "Users can view their own sessions" ON public.emotion_sessions
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own sessions" ON public.emotion_sessions
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own sessions" ON public.emotion_sessions
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- profiles
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can create their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own profile" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- feedbacks
DROP POLICY IF EXISTS "Users can create their own feedback" ON public.feedbacks;
CREATE POLICY "Users can create their own feedback" ON public.feedbacks
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- storage.objects (media bucket)
DROP POLICY IF EXISTS "Users can upload their own media" ON storage.objects;
DROP POLICY IF EXISTS "Users can view their own media" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own media" ON storage.objects;
CREATE POLICY "Users can upload their own media" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'media' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can view their own media" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'media' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can delete their own media" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'media' AND auth.uid()::text = (storage.foldername(name))[1]);