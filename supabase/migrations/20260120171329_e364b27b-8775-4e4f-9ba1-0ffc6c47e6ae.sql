-- Create feedback table
CREATE TABLE public.feedbacks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  session_id UUID REFERENCES public.emotion_sessions(id) ON DELETE CASCADE,
  feedback_text TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.feedbacks ENABLE ROW LEVEL SECURITY;

-- Users can create their own feedback
CREATE POLICY "Users can create their own feedback"
ON public.feedbacks FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Everyone can view all feedbacks (for analytics display)
CREATE POLICY "Anyone can view feedbacks"
ON public.feedbacks FOR SELECT
USING (true);

-- Create aggregated mood stats view for analytics (public readable)
CREATE VIEW public.mood_analytics AS
SELECT 
  date_trunc('day', created_at) as date,
  COUNT(*) as session_count,
  AVG(focus_level) as avg_focus,
  AVG(frustration_level) as avg_frustration,
  AVG(confusion_level) as avg_confusion
FROM public.emotion_sessions
GROUP BY date_trunc('day', created_at)
ORDER BY date DESC;

-- Allow public read on the view
GRANT SELECT ON public.mood_analytics TO anon, authenticated;