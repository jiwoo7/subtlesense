
-- Recreate mood_analytics view without SECURITY DEFINER
-- Use security_invoker = true so it respects the caller's RLS policies
DROP VIEW IF EXISTS public.mood_analytics;

CREATE VIEW public.mood_analytics
WITH (security_invoker = true)
AS
SELECT
  date(created_at) AS date,
  count(*) AS session_count,
  avg(confusion_level) AS avg_confusion,
  avg(frustration_level) AS avg_frustration,
  avg(focus_level) AS avg_focus
FROM public.emotion_sessions
GROUP BY date(created_at);

-- Add a SELECT policy so authenticated users can read analytics from their own sessions
-- (the view will inherit the emotion_sessions RLS which already restricts to own data)
