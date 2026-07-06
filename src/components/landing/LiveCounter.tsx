import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const LiveCounter = () => {
  const [readings, setReadings] = useState<number | null>(null);
  const [members, setMembers] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const sinceIso = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
        const [{ count: r }, { count: m }] = await Promise.all([
          supabase
            .from("emotion_sessions")
            .select("*", { count: "exact", head: true })
            .gte("created_at", sinceIso),
          supabase
            .from("waitlist_signups")
            .select("*", { count: "exact", head: true }),
        ]);
        if (!alive) return;
        setReadings(typeof r === "number" ? r : 0);
        setMembers(typeof m === "number" ? m : 0);
      } catch {
        if (!alive) return;
        setReadings(0);
        setMembers(0);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const fmt = (n: number | null) => (n === null ? "…" : n.toLocaleString());

  return (
    <section className="container mx-auto px-6 sm:px-8 lg:px-12 py-10">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-16 text-center">
        <div>
          <p className="editorial-heading text-3xl sm:text-4xl text-gold">{fmt(readings)}</p>
          <p className="eyebrow text-muted-foreground mt-2">Readings this week</p>
        </div>
        <div className="hidden sm:block h-10 w-px bg-border/60" />
        <div>
          <p className="editorial-heading text-3xl sm:text-4xl text-gold">{fmt(members)}</p>
          <p className="eyebrow text-muted-foreground mt-2">Founding members reserved</p>
        </div>
      </div>
    </section>
  );
};

export default LiveCounter;
