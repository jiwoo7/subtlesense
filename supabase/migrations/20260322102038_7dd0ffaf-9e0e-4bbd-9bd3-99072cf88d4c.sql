
-- Remove the dangerous public SELECT policy
DROP POLICY "Anyone can view session stats for analytics" ON public.emotion_sessions;

-- Recreate mood_analytics view with security_invoker = off so it uses owner privileges
DROP VIEW IF EXISTS public.mood_analytics;
CREATE VIEW public.mood_analytics
WITH (security_invoker = off) AS
SELECT 
  date_trunc('day', created_at) as date,
  COUNT(*) as session_count,
  AVG(focus_level) as avg_focus,
  AVG(frustration_level) as avg_frustration,
  AVG(confusion_level) as avg_confusion
FROM public.emotion_sessions
GROUP BY 1 ORDER BY 1 DESC;
