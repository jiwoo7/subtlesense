import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Updates and returns the user's session streak.
 * Call recordSession() after a successful analysis save.
 */
export function useStreak(userId: string | undefined) {
  const [current, setCurrent] = useState(0);
  const [longest, setLongest] = useState(0);

  useEffect(() => {
    if (!userId) return;
    supabase
      .from("profiles")
      .select("current_streak,longest_streak")
      .eq("user_id", userId)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setCurrent(data.current_streak ?? 0);
          setLongest(data.longest_streak ?? 0);
        }
      });
  }, [userId]);

  const recordSession = async () => {
    if (!userId) return;
    const { data: profile } = await supabase
      .from("profiles")
      .select("current_streak,longest_streak,last_session_date")
      .eq("user_id", userId)
      .maybeSingle();

    const today = new Date().toISOString().slice(0, 10);
    const last = profile?.last_session_date ?? null;
    let next = profile?.current_streak ?? 0;

    if (last === today) {
      // already counted today
    } else {
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      next = last === yesterday ? next + 1 : 1;
    }

    const newLongest = Math.max(profile?.longest_streak ?? 0, next);

    await supabase
      .from("profiles")
      .update({
        current_streak: next,
        longest_streak: newLongest,
        last_session_date: today,
      })
      .eq("user_id", userId);

    setCurrent(next);
    setLongest(newLongest);
  };

  return { current, longest, recordSession };
}
