import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import logoUrl from "@/assets/subtle-sense-logo.png";
import StreakBadge from "@/components/StreakBadge";
import { useStreak } from "@/hooks/useStreak";
import MobileStickyCTA from "@/components/landing/MobileStickyCTA";
import type { User } from "@supabase/supabase-js";

interface Props {
  currentUser: User | null;
}

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.25, 1, 0.5, 1] as const },
});

const PILLARS = [
  { n: "01", title: "Spoken", desc: "What your face and voice openly say." },
  { n: "02", title: "Felt", desc: "The current running underneath the words." },
  { n: "03", title: "Unsaid", desc: "What is held back, softly named for you." },
];

const READINGS = [
  { label: "Overthinking", pct: 78 },
  { label: "Quiet stress", pct: 65 },
  { label: "Tenderness", pct: 42 },
  { label: "Hope", pct: 71 },
];

const MobileLanding = ({ currentUser }: Props) => {
  const navigate = useNavigate();
  const { current, longest } = useStreak(currentUser?.id);

  const openCompanion = (text?: string) => {
    window.dispatchEvent(new CustomEvent("subtle:open-companion", { detail: { text } }));
  };

  return (
    <div className="sm:hidden relative z-10 w-full overflow-x-hidden px-6 pt-6 pb-28 min-h-[100dvh] bg-background">
      {/* Backdrop — onyx with a single warm vignette */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,hsl(var(--primary)_/_0.10),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(100%_60%_at_50%_100%,hsl(var(--primary)_/_0.05),transparent_60%)]" />
      </div>

      {/* Masthead */}
      <motion.header {...fade(0)} className="flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2.5">
          <img src={logoUrl} alt="Subtle Sense" width={22} height={22} className="w-[22px] h-[22px] object-contain" />
          <span className="text-[10px] tracking-[0.4em] uppercase text-foreground/80 font-light">Subtle Sense</span>
        </button>
        {currentUser ? (
          <StreakBadge current={current} longest={longest} compact />
        ) : (
          <button onClick={() => navigate("/auth")} className="text-[10px] tracking-[0.24em] uppercase text-foreground/55 hover:text-foreground transition-colors">
            Sign in
          </button>
        )}
      </motion.header>

      <div className="gold-hairline mt-6 opacity-60" />

      {/* Hero */}
      <section className="pt-14 pb-12">
        <motion.p {...fade(0.05)} className="eyebrow text-[9px] tracking-[0.42em] text-primary/80 mb-7">
          Est. 2026 · Emotional Intelligence
        </motion.p>

        <motion.h1 {...fade(0.12)} className="editorial-heading text-[3.05rem] leading-[0.94] text-foreground">
          Discover
          <br />
          <span className="editorial-italic text-primary">what you're</span>
          <br />
          <span className="editorial-italic text-primary">really feeling</span>
          <span className="text-primary">.</span>
        </motion.h1>

        <motion.p {...fade(0.2)} className="mt-7 text-[13.5px] leading-[1.75] text-muted-foreground font-light max-w-[19rem]">
          A quiet reading of the emotions you seldom name aloud — spoken, felt, and unsaid. Sixty seconds, nothing stored.
        </motion.p>

        {/* Whisper input */}
        <motion.form
          {...fade(0.28)}
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            openCompanion(String(fd.get("q") || ""));
            (e.currentTarget as HTMLFormElement).reset();
          }}
          className="relative mt-10"
        >
          <input
            name="q"
            placeholder="Say it here, however it comes out…"
            className="w-full bg-transparent border-b border-border/70 focus:border-primary/70 pb-3 pr-9 text-[13px] font-light text-foreground placeholder:text-muted-foreground/70 focus:outline-none transition-colors duration-500"
          />
          <button
            type="submit"
            aria-label="Send to companion"
            className="absolute right-0 bottom-3 text-primary/70 hover:text-primary transition-colors"
          >
            <ArrowUpRight className="w-4 h-4" strokeWidth={1.6} />
          </button>
        </motion.form>

        {/* CTAs */}
        <motion.div {...fade(0.36)} className="mt-9 space-y-3">
          <button onClick={() => navigate("/dashboard")} className="btn-editorial w-full">
            Begin a reading
          </button>
          <button onClick={() => navigate("/methodology")} className="btn-editorial-ghost w-full">
            How we read
          </button>
        </motion.div>

        <motion.div {...fade(0.44)} className="mt-6 flex items-center gap-2">
          <span className="inline-block w-1 h-1 rounded-full bg-primary/80 animate-pulse-soft" />
          <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Processed in-session only</span>
        </motion.div>
      </section>

      <div className="gold-hairline opacity-50" />

      {/* Three layers */}
      <section className="py-12">
        <p className="eyebrow text-[9px] tracking-[0.4em] text-primary/70 mb-8">Three layers</p>
        <div className="space-y-9">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.25, 1, 0.5, 1] }}
              className="flex gap-5"
            >
              <span className="editorial-heading text-primary/45 text-[13px] pt-1 tabular-nums">{p.n}</span>
              <div className="flex-1 border-b border-border/50 pb-7">
                <h3 className="editorial-heading text-[1.5rem] text-foreground">{p.title}</h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground font-light">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recent readings — editorial index with rules */}
      <section className="pb-12">
        <div className="flex items-baseline justify-between mb-7">
          <p className="eyebrow text-[9px] tracking-[0.4em] text-primary/70">Recent readings</p>
          <button onClick={() => navigate("/dashboard")} className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground flex items-center gap-1">
            All <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <h2 className="editorial-heading text-[2rem] leading-[1.05] text-foreground mb-8">
          Your emotional <span className="editorial-italic text-primary">landscape</span>
        </h2>

        <div className="space-y-5">
          {READINGS.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.06 }}
            >
              <div className="flex items-baseline justify-between">
                <span className="text-[13px] font-light text-foreground">{r.label}</span>
                <span className="editorial-heading text-[13px] text-primary tabular-nums">{r.pct}%</span>
              </div>
              <div className="mt-2.5 h-px w-full bg-border/60 overflow-hidden">
                <motion.div
                  className="h-px bg-primary/80"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${r.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.15 + i * 0.06, ease: [0.25, 1, 0.5, 1] }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="gold-hairline opacity-50" />

      {/* Quiet tools */}
      <section className="py-12">
        <p className="eyebrow text-[9px] tracking-[0.4em] text-primary/70 mb-7">Quiet tools</p>
        <div className="divide-y divide-border/50 border-y border-border/50">
          {[
            { label: "Mind games", note: "Breath, colour, stillness", to: "/games" },
            { label: "Mood playlists", note: "Sound matched to feeling", to: "/playlists" },
            { label: "Philosophy", note: "Why we built this", to: "/philosophy" },
          ].map((t) => (
            <button
              key={t.label}
              onClick={() => navigate(t.to)}
              className="w-full flex items-center justify-between py-5 text-left group"
            >
              <span>
                <span className="editorial-heading text-[1.15rem] text-foreground block">{t.label}</span>
                <span className="text-[11.5px] text-muted-foreground font-light">{t.note}</span>
              </span>
              <ArrowUpRight className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors" strokeWidth={1.4} />
            </button>
          ))}
        </div>
      </section>

      {/* Closing invitation */}
      <section className="pt-6 pb-4 text-center">
        <div className="gold-hairline mb-10 opacity-60" />
        <p className="editorial-italic text-[1.4rem] leading-snug text-foreground/90 px-2">
          “Most people only see the surface. You are allowed to know the rest.”
        </p>
        <p className="mt-6 text-[10px] tracking-[0.32em] uppercase text-muted-foreground">Subtle Sense</p>
      </section>

      <MobileStickyCTA onClick={() => navigate("/pricing")} />
    </div>
  );
};

export default MobileLanding;
