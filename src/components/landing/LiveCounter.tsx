import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const LiveCounter = () => {
  const [readings, setReadings] = useState<number | null>(null);
  const [members, setMembers] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const { data, error } = await supabase.rpc("get_public_counts");
        if (error) throw error;
        const row = Array.isArray(data) ? data[0] : (data as any);
        if (!alive) return;
        setReadings(Number(row?.readings_week ?? 0));
        setMembers(Number(row?.members ?? 0));
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

  const fmt = (n: number) => n.toLocaleString();

  // Never advertise a zero — it reads worse than showing nothing.
  const stats = [
    readings && readings > 0 ? { value: readings, label: "Readings this week" } : null,
    members && members > 0 ? { value: members, label: "Founding members reserved" } : null,
  ].filter(Boolean) as { value: number; label: string }[];

  if (stats.length === 0) return null;

  return (
    <section className="container mx-auto px-6 sm:px-8 lg:px-12 py-10">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-16 text-center">
        {stats.map((s, i) => (
          <div key={s.label} className="contents sm:block">
            {i > 0 && <div className="hidden sm:block h-10 w-px bg-border/60" />}
            <div>
              <p className="editorial-heading text-3xl sm:text-4xl text-gold">{fmt(s.value)}</p>
              <p className="eyebrow text-muted-foreground mt-2">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LiveCounter;
