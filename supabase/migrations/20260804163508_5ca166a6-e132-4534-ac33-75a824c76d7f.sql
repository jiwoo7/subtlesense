REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.set_waitlist_position() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM anon, authenticated, public;

CREATE POLICY "No one can read waitlist signups" ON public.waitlist_signups FOR SELECT TO anon, authenticated USING (false);
CREATE POLICY "No one can update waitlist signups" ON public.waitlist_signups FOR UPDATE TO anon, authenticated USING (false);
CREATE POLICY "No one can delete waitlist signups" ON public.waitlist_signups FOR DELETE TO anon, authenticated USING (false);

CREATE POLICY "Users cannot update sessions" ON public.emotion_sessions FOR UPDATE TO authenticated USING (false) WITH CHECK (false);

CREATE POLICY "Users cannot update feedback" ON public.feedbacks FOR UPDATE TO authenticated USING (false) WITH CHECK (false);
CREATE POLICY "Users cannot delete feedback" ON public.feedbacks FOR DELETE TO authenticated USING (false);