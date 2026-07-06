import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Send, Gamepad2, Music, BookOpen, Brain } from "lucide-react";
import logoUrl from "@/assets/subtle-sense-logo.png";
import StreakBadge from "@/components/StreakBadge";
import { useStreak } from "@/hooks/useStreak";
import MobileStickyCTA from "@/components/landing/MobileStickyCTA";
import type { User } from "@supabase/supabase-js";

interface Props {
  currentUser: User | null;
}

const tools = [
  { icon: BookOpen, label: "Journal", sub: "Track your mood", to: "/dashboard?tab=journal" },
  { icon: Gamepad2, label: "Mind Games", sub: "2 min reset", to: "/games" },
  { icon: Music, label: "Playlists", sub: "Curated moods", to: "/playlists" },
];

const moodCards = [
  { label: "Overthinking", pct: "78%" },
  { label: "Stress", pct: "65%" },
  { label: "Sadness", pct: "42%" },
  { label: "Hope", pct: "71%" },
];

const ease = [0.25, 1, 0.5, 1] as const;

const MobileLanding = ({ currentUser }: Props) => {
  const navigate = useNavigate();
  const { current, longest } = useStreak(currentUser?.id);

  const openCompanion = (text?: string) => {
    window.dispatchEvent(new CustomEvent("subtle:open-companion", { detail: { text } }));
  };

  return (
    <div className="sm:hidden relative z-10 w-full overflow-x-hidden px-5 pt-5 pb-24 min-h-[100dvh]">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2.5">
          <img
            src={logoUrl}
            alt=""
            className="w-8 h-8 object-contain"
            style={{ filter: "drop-shadow(0 0 10px hsl(var(--primary) / 0.35))" }}
          />
          <span
            className="editorial-heading text-[11px] tracking-[0.32em] uppercase text-foreground"
          >
            Subtle Sense
          </span>
        </div>
        {currentUser ? (
          <StreakBadge current={current} longest={longest} compact />
        ) : (
          <button
            onClick={() => navigate("/auth")}
            className="eyebrow border border-border px-3 py-1.5 hover:border-primary transition-colors duration-500"
          >
            Sign in
          </button>
        )}
      </div>

      {/* Editorial masthead — no logo, letterpress feel */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease }}
        className="text-center mb-6 mt-2"
      >
        <p className="eyebrow text-[9px] tracking-[0.4em] text-gold animate-shimmer">
          Founding Members · 50% off for life
        </p>
        <div className="gold-hairline my-4 max-w-[60%] mx-auto" />
        <p className="eyebrow text-[9px] tracking-[0.4em] text-muted-foreground">MMXXVI Edition</p>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.2, ease }}
        className="editorial-heading text-center text-[2.4rem] leading-[1.02] mb-3 text-foreground"
      >
        Discover what<br />
        you&rsquo;re <span className="editorial-italic text-gold animate-shimmer">really feeling.</span>
      </motion.h1>

      <p className="text-center text-[13px] text-muted-foreground font-light leading-relaxed max-w-[20rem] mx-auto mb-5">
        A quiet reading of the emotions you seldom name aloud.
      </p>

      <p className="eyebrow text-center text-gold animate-shimmer mb-8">
        Understand · Empathize · Elevate
      </p>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          openCompanion(String(fd.get("q") || ""));
          (e.currentTarget as HTMLFormElement).reset();
        }}
        className="relative mb-8"
      >
        <input
          name="q"
          placeholder="Share what's on your mind…"
          className="w-full bg-card/60 border border-border pl-4 pr-12 py-3 text-xs focus:outline-none focus:border-primary transition-colors duration-500"
          style={{ borderRadius: 2 }}
        />
        <button
          type="submit"
          aria-label="Send"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-primary text-primary-foreground"
          style={{ borderRadius: 2 }}
        >
          <Send className="w-3.5 h-3.5" strokeWidth={1.5} />
        </button>
      </form>

      <div className="flex items-center justify-between mb-4">
        <p className="eyebrow flex items-center gap-2 text-muted-foreground">
          <span className="inline-block w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
          Processed in-session · Nothing stored
        </p>
        <button
          onClick={() => navigate("/methodology")}
          className="eyebrow text-gold"
        >
          How we read ›
        </button>
      </div>

      <button
        onClick={() => navigate("/pricing")}
        className="w-full mb-6 border border-gold/40 bg-transparent p-3 text-center hover:border-gold transition-colors duration-500"
        style={{ borderRadius: 2 }}
      >
        <span className="eyebrow text-gold">See Membership ·  From $8/mo</span>
      </button>

      <div className="gold-hairline mb-6" />

      {/* Tools */}
      <p className="eyebrow mb-4">Chapter I · Tools</p>
      <div className="grid grid-cols-3 gap-2.5 mb-6">
        {tools.map((c, i) => (
          <motion.button
            key={c.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 + i * 0.08, ease }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(c.to)}
            aria-label={c.label}
            className="border border-border bg-card/40 p-3 flex flex-col items-start text-left aspect-square justify-between hover:border-primary transition-colors duration-500"
            style={{ borderRadius: 2 }}
          >
            <c.icon className="w-4 h-4 text-primary" strokeWidth={1.25} />
            <div>
              <p className="editorial-heading text-[13px] leading-tight text-foreground">{c.label}</p>
              <p className="eyebrow mt-1 text-[9px]">{c.sub}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate("/dashboard")}
        aria-label="Open AI Analysis"
        className="w-full mb-8 border border-primary/40 bg-primary/[0.04] p-4 text-left hover:bg-primary/[0.08] transition-colors duration-500"
        style={{ borderRadius: 2 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border border-primary/40 flex items-center justify-center flex-shrink-0" style={{ borderRadius: 2 }}>
            <Brain className="w-4 h-4 text-primary" strokeWidth={1.25} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="editorial-heading text-base text-foreground leading-tight">Begin an Analysis</p>
            <p className="eyebrow mt-1 text-[9px]">Analyze now — sign in only to save</p>
          </div>
          <span className="eyebrow text-gold">Open ›</span>
        </div>
      </motion.button>

      <div className="gold-hairline mb-6" />

      {/* Emotion landscape */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="eyebrow">Chapter II · Landscape</p>
          <p className="editorial-heading text-base mt-1 text-foreground">
            Your emotion <span className="editorial-italic">record.</span>
          </p>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="eyebrow text-gold"
        >
          View all ›
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {moodCards.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 + i * 0.08, ease }}
            className="border border-border bg-card/40 p-4"
            style={{ borderRadius: 2 }}
          >
            <p className="eyebrow text-[9px]">№ {String(i + 1).padStart(2, "0")}</p>
            <p className="editorial-heading text-lg text-foreground mt-2">{m.label}</p>
            <div className="flex items-baseline justify-between mt-3">
              <p className="editorial-italic text-gold text-2xl">{m.pct}</p>
              <p className="eyebrow text-[9px]">Example</p>
            </div>
          </motion.div>
        ))}
      </div>
      <MobileStickyCTA onClick={() => navigate("/pricing")} />
    </div>
  );
};

export default MobileLanding;
