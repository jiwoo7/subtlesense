import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  Brain,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import logoUrl from "@/assets/subtle-sense-logo.png";
import StreakBadge from "@/components/StreakBadge";
import { useStreak } from "@/hooks/useStreak";
import MobileStickyCTA from "@/components/landing/MobileStickyCTA";
import type { User } from "@supabase/supabase-js";

interface Props {
  currentUser: User | null;
}

const MobileLanding = ({ currentUser }: Props) => {
  const navigate = useNavigate();
  const { current, longest } = useStreak(currentUser?.id);

  const openCompanion = (text?: string) => {
    window.dispatchEvent(new CustomEvent("subtle:open-companion", { detail: { text } }));
  };

  return (
    <div className="sm:hidden relative z-10 w-full overflow-x-hidden px-4 pt-6 pb-24 min-h-[100dvh] bg-background">
      {/* Minimal luxury backdrop */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(130%_100%_at_50%_20%,hsl(var(--primary)_/_0.04),transparent_70%)]" />
      </div>

      {/* Top bar — ultra minimal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-10"
      >
        <motion.div className="flex items-center gap-2">
          <motion.img
            src={logoUrl}
            alt=""
            className="w-6 h-6 object-contain"
          />
          <span className="text-[10px] tracking-[0.4em] uppercase font-light text-foreground">
            Subtle
          </span>
        </motion.div>
        {currentUser ? (
          <StreakBadge current={current} longest={longest} compact />
        ) : (
          <motion.button
            onClick={() => navigate("/auth")}
            whileTap={{ scale: 0.98 }}
            className="text-[11px] tracking-[0.2em] text-foreground/70 hover:text-foreground transition-colors"
          >
            Sign in
          </motion.button>
        )}
      </motion.div>

      {/* Hero section — refined elegance */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        {/* Subtle accent */}
        <motion.div
          className="flex items-center justify-center gap-1.5 mb-6"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Sparkles className="w-3 h-3 text-gold" strokeWidth={1.5} />
          <span className="text-[9px] tracking-[0.3em] text-gold font-light">
            FOUNDING MEMBER
          </span>
          <Sparkles className="w-3 h-3 text-gold" strokeWidth={1.5} />
        </motion.div>

        {/* Main headline — pure luxury */}
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[2.2rem] leading-[1.1] font-light text-foreground mb-4"
        >
          Discover<br />
          <span className="text-gold font-light">what you're<br />really feeling.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[13px] text-foreground/60 font-light leading-relaxed max-w-xs mx-auto"
        >
          AI reads the emotions you seldom name aloud.
        </motion.p>
      </motion.div>

      {/* Search input — elegant and minimal */}
      <motion.form
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
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
          placeholder="What's on your mind…"
          className="w-full bg-background border border-gold/15 px-4 py-3.5 text-[13px] placeholder:text-foreground/40 focus:outline-none focus:border-gold/50 transition-all duration-300 font-light"
          style={{ borderRadius: 8 }}
        />
        <motion.button
          type="submit"
          whileTap={{ scale: 0.95 }}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-gold hover:text-gold/80 transition-colors"
        >
          <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
        </motion.button>
      </motion.form>

      {/* Primary CTA — refined */}
      <motion.button
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate("/dashboard")}
        className="w-full mb-8 bg-gradient-to-r from-gold to-gold/70 text-foreground py-4 text-sm font-light transition-all hover:from-gold/90 hover:to-gold/60 shadow-lg"
        style={{ borderRadius: 8 }}
      >
        Begin Analysis
      </motion.button>

      {/* Info bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center justify-between text-[11px] mb-10 px-1"
      >
        <p className="text-foreground/50 flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 bg-gold/70 rounded-full animate-pulse" />
          <span>60 seconds end-to-end</span>
        </p>
        <button
          onClick={() => navigate("/philosophy")}
          className="text-gold/80 hover:text-gold transition-colors flex items-center gap-1"
        >
          Learn more
          <ChevronRight className="w-3 h-3" />
        </button>
      </motion.div>

      {/* Quick features — minimal cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="space-y-3 mb-10"
      >
        {[
          { title: "Deep Detection", desc: "AI reads beneath the surface" },
          { title: "Instant Results", desc: "Personalized insights in seconds" },
          { title: "Privacy First", desc: "Nothing stored without consent" },
        ].map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.65 + i * 0.08 }}
            className="flex items-start gap-3 p-3 rounded-lg border border-gold/10 hover:border-gold/25 transition-all"
          >
            <Brain className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <p className="text-xs font-light text-foreground">{f.title}</p>
              <p className="text-[11px] text-foreground/50 font-light mt-0.5">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Mood landscape — refined */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.75 }}
        className="mb-10"
      >
        <div className="mb-4">
          <p className="text-[10px] tracking-[0.3em] text-gold/70 uppercase mb-2">Recent readings</p>
          <p className="text-sm font-light text-foreground">Emotion landscape</p>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {[
            { label: "Overthinking", pct: "78%" },
            { label: "Stress", pct: "65%" },
            { label: "Sadness", pct: "42%" },
            { label: "Hope", pct: "71%" },
          ].map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.06 }}
              className="border border-gold/10 rounded-lg p-3.5 hover:border-gold/25 transition-all"
            >
              <p className="text-[10px] text-foreground/40 mb-1.5">Emotion {i + 1}</p>
              <p className="text-sm font-light text-foreground mb-2">{m.label}</p>
              <p className="text-gold text-xs font-light">{m.pct}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Sticky CTA */}
      <MobileStickyCTA onClick={() => navigate("/pricing")} />

      <div className="h-2" />
    </div>
  );
};

export default MobileLanding;
