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
      {/* Luxury backdrop — subtle depth */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(130%_100%_at_50%_20%,hsl(var(--primary)_/_0.05),transparent_70%)]" />
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none"
          animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Top bar — elegant */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-10"
      >
        <motion.div
          className="flex items-center gap-2 group cursor-pointer"
          whileHover={{ scale: 1.02 }}
        >
          <motion.img
            src={logoUrl}
            alt=""
            className="w-6 h-6 object-contain group-hover:drop-shadow-[0_0_8px_hsl(var(--primary)_/_0.3)] transition-all"
          />
          <span className="text-[11px] tracking-[0.32em] uppercase font-light text-foreground group-hover:text-gold transition-colors duration-500">
            Subtle Sense
          </span>
        </motion.div>
        {currentUser ? (
          <StreakBadge current={current} longest={longest} compact />
        ) : (
          <motion.button
            onClick={() => navigate("/auth")}
            whileTap={{ scale: 0.98 }}
            className="text-[11px] tracking-[0.2em] text-foreground/70 hover:text-gold transition-colors duration-500"
          >
            Sign in
          </motion.button>
        )}
      </motion.div>

      {/* Hero section — luxury refined */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        {/* Founding member badge — with life */}
        <motion.div
          className="flex items-center justify-center gap-1.5 mb-6"
          animate={{ opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-3 h-3 text-gold" strokeWidth={1.5} />
          </motion.div>
          <span className="text-[9px] tracking-[0.3em] text-gold font-light">
            FOUNDING MEMBER · 50% OFF FOR LIFE
          </span>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          >
            <Sparkles className="w-3 h-3 text-gold" strokeWidth={1.5} />
          </motion.div>
        </motion.div>

        {/* Main headline — luxury with accent */}
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[2.3rem] leading-[1.08] font-light text-foreground mb-4"
        >
          Discover<br />
          <motion.span
            className="text-gold font-light italic inline-block"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          >
            what you're really<br />feeling.
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[13px] text-foreground/60 font-light leading-relaxed max-w-sm mx-auto"
        >
          AI reads the emotions you seldom name aloud. In 60 seconds.
        </motion.p>
      </motion.div>

      {/* Search input — elegant with focus state */}
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
        className="relative mb-8 group"
      >
        <input
          name="q"
          placeholder="What's on your mind…"
          className="w-full bg-background border border-gold/15 px-4 py-3.5 text-[13px] placeholder:text-foreground/40 focus:outline-none focus:border-gold/40 focus:shadow-[0_0_20px_hsl(var(--gold)_/_0.1)] transition-all duration-300 font-light"
          style={{ borderRadius: 8 }}
        />
        <motion.button
          type="submit"
          whileTap={{ scale: 0.92 }}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-gold/60 hover:text-gold transition-colors duration-300"
        >
          <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
        </motion.button>
      </motion.form>

      {/* Primary CTA — bold but refined */}
      <motion.button
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => navigate("/dashboard")}
        className="w-full mb-8 bg-gradient-to-r from-gold via-gold to-gold/80 text-foreground py-4 text-sm font-light transition-all hover:shadow-[0_20px_40px_hsl(var(--gold)_/_0.25)] shadow-[0_10px_30px_hsl(var(--gold)_/_0.15)]"
        style={{ borderRadius: 8 }}
      >
        Begin Analysis
      </motion.button>

      {/* Info bar — refined */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center justify-between text-[11px] mb-10 px-1"
      >
        <p className="text-foreground/50 flex items-center gap-1.5">
          <motion.span
            className="inline-block w-1.5 h-1.5 bg-gold/70 rounded-full"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span>In-session only</span>
        </p>
        <motion.button
          onClick={() => navigate("/philosophy")}
          whileHover={{ x: 2 }}
          className="text-gold/70 hover:text-gold transition-colors flex items-center gap-1"
        >
          Philosophy
          <ChevronRight className="w-3 h-3" />
        </motion.button>
      </motion.div>

      {/* Quick features — card-based with depth */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="space-y-3 mb-10"
      >
        {[
          { title: "Deep Detection", desc: "Detects hidden & suppressed emotions" },
          { title: "Instant Insights", desc: "Personalized suggestions in seconds" },
          { title: "Privacy First", desc: "Nothing stored without consent" },
        ].map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.65 + i * 0.08 }}
            whileHover={{ x: 4, borderColor: "hsl(var(--gold) / 0.4)" }}
            className="flex items-start gap-3 p-4 rounded-lg border border-gold/12 hover:bg-gold/[0.02] transition-all duration-300 cursor-pointer group"
          >
            <Brain className="w-4 h-4 text-gold/70 flex-shrink-0 mt-0.5 group-hover:text-gold transition-colors" strokeWidth={1.5} />
            <div>
              <p className="text-xs font-light text-foreground">{f.title}</p>
              <p className="text-[11px] text-foreground/50 font-light mt-0.5">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Mood landscape — elegant grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.75 }}
        className="mb-10"
      >
        <div className="mb-4">
          <p className="text-[10px] tracking-[0.3em] text-gold/60 uppercase mb-2">Recent readings</p>
          <p className="text-sm font-light text-foreground">Your emotional landscape</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
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
              whileHover={{ borderColor: "hsl(var(--gold) / 0.3)", y: -2 }}
              className="border border-gold/10 rounded-lg p-4 hover:bg-gold/[0.02] transition-all duration-300 cursor-pointer group"
            >
              <p className="text-[9px] text-foreground/40 mb-2 tracking-wide">№ {String(i + 1).padStart(2, "0")}</p>
              <p className="text-sm font-light text-foreground mb-3 group-hover:text-gold/80 transition-colors">{m.label}</p>
              <p className="text-gold/80 text-xs font-light group-hover:text-gold transition-colors">{m.pct}</p>
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
