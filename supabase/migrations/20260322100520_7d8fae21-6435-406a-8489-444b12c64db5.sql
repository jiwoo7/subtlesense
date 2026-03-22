
DROP POLICY "Anyone can view feedbacks" ON public.feedbacks;

CREATE POLICY "Users can view own feedback"
ON public.feedbacks FOR SELECT
TO authenticated
USING (auth.uid() = user_id);
