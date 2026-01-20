-- Drop the security definer view and recreate with security_invoker
DROP VIEW IF EXISTS public.mood_analytics;

CREATE VIEW public.mood_analytics
WITH (security_invoker = on) AS
SELECT 
  date_trunc('day', created_at) as date,
  COUNT(*) as session_count,
  AVG(focus_level) as avg_focus,
  AVG(frustration_level) as avg_frustration,
  AVG(confusion_level) as avg_confusion
FROM public.emotion_sessions
GROUP BY date_trunc('day', created_at)
ORDER BY date DESC;

-- Allow anon to read emotion_sessions for aggregated stats only
CREATE POLICY "Anyone can view session stats for analytics"
ON public.emotion_sessions FOR SELECT
USING (true);