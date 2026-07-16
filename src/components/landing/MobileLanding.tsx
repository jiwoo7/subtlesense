import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  Brain,
  BookOpen,
  ChevronRight,
  Gamepad2,
  Sparkles,
  Zap,
} from "lucide-react";
import logoUrl from "@/assets/subtle-sense-logo.png";
import StreakBadge from "@/components/StreakBadge";
import { useStreak } from "@/hooks/useStreak";
import MobileStickyCTA from "@/components/landing/MobileStickyCTA";
import type { User } from "@supabase/supabase-js";

interface Props {
  currentUser: User | null;
}

const tools = [
  { icon: Brain, label: "Analyze", sub: "AI Reading", to: "/dashboard", color: "from-primary/20 to-primary/5" },
  { icon: BookOpen, label: "Journal", sub: "Track Mood", to: "/dashboard?tab=journal", color: "from-blue/20 to-blue/5" },
  { icon: Gamepad2, label: "Games", sub: "2 min reset", to: "/games", color: "from-purple/20 to-purple/5" },
];

const features = [
  { icon: Sparkles, title: "Deep Detection", desc: "AI reads what you don't say" },
  { icon: Zap, title: "Instant", desc: "Results in seconds" },
  { icon: BookOpen, title: "Private", desc: "Nothing stored without consent" },
];

const moodCards = [
  { label: "Overthinking", pct: "78%", color: "from-amber/30 to-amber/10" },
  { label: "Stress", pct: "65%", color: "from-red/30 to-red/10" },
  { label: "Sadness", pct: "42%", color: "from-blue/30 to-blue/10" },
  { label: "Hope", pct: "71%", color: "from-green/30 to-green/10" },
];

const ease = [0.25, 1, 0.5, 1] as const;

const MobileLanding = ({ currentUser }: Props) => {
  const navigate = useNavigate();
  const { current, longest } = useStreak(currentUser?.id);

  const openCompanion = (text?: string) => {
    window.dispatchEvent(new CustomEvent("subtle:open-companion", { detail: { text } }));
  };

  return (
    <div className="sm:hidden relative z-10 w-full overflow-x-hidden px-4 pt-4 pb-28 min-h-[100dvh] bg-gradient-to-b from-background via-background to-background">
      {/* Premium mobile backdrop (mobile-only) */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        {/* soft vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,hsl(var(--gold)_/_0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_100%,hsl(var(--primary)_/_0.10),transparent_55%)]" />

        <motion.div
          className="absolute -top-24 -right-20 w-44 h-44 bg-primary/10 rounded-full blur-3xl"
          animate={{ y: [0, 30, 0], x: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 -left-24 w-44 h-44 bg-gold/10 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Top bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <motion.img
            src={logoUrl}
            alt=""
            className="w-7 h-7 object-contain"
            style={{ filter: "drop-shadow(0 0 10px hsl(var(--primary) / 0.35))" }}
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <span className="editorial-heading text-[11px] tracking-[0.32em] uppercase text-foreground">
            Subtle Sense
          </span>
        </motion.div>
        {currentUser ? (
          <StreakBadge current={current} longest={longest} compact />
        ) : (
          <motion.button
            onClick={() => navigate("/auth")}
            whileTap={{ scale: 0.95 }}
            className="eyebrow border border-border/70 bg-card/30 backdrop-blur-sm px-3 py-1.5 hover:border-gold hover:text-gold transition-all duration-500"
            style={{ borderRadius: 999 }}
          >
            Sign in
          </motion.button>
        )}
      </motion.div>

      {/* Masthead */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.1, ease }}
        className="text-center mb-8 mt-4"
      >
        <motion.p
          className="eyebrow text-[10px] tracking-[0.34em] text-gold font-light inline-flex items-center justify-center gap-1.5"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="w-3 h-3" strokeWidth={1.4} />
          FOUNDING MEMBER · 50% OFF FOR LIFE
        </motion.p>
        <div className="gold-hairline my-3 max-w-[50%] mx-auto" />
      </motion.div>

      {/* Hero headline */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.2, ease }}
        className="editorial-heading text-center text-[2.2rem] leading-[1.05] mb-3 text-foreground"
      >
        Discover what<br />
        <span className="relative">
          you&rsquo;re <span className="editorial-italic text-gold animate-shimmer">really feeling.</span>
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center text-[13px] text-muted-foreground font-light leading-relaxed max-w-[19rem] mx-auto mb-6"
      >
        AI reads the emotions you seldom name aloud. In 60 seconds.
      </motion.p>

      {/* Quick features */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 grid grid-cols-3 gap-2 mb-8"
      >
        {features.map((f, i) => (
          <div key={f.title} className="text-center text-[11px]">
            <div className="flex justify-center mb-2">
              <div className="w-8 h-8 rounded-xl border border-border/60 bg-card/40 backdrop-blur-sm flex items-center justify-center shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
                <f.icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
              </div>
            </div>
            <p className="font-light text-foreground">{f.title}</p>
            <p className="eyebrow text-[9px] text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </motion.div>

      {/* CTA Input */}
      <motion.form
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          openCompanion(String(fd.get("q") || ""));
          (e.currentTarget as HTMLFormElement).reset();
        }}
        className="relative mb-3"
      >
        <input
          name="q"
          placeholder="What's on your mind…"
          className="w-full bg-card/55 backdrop-blur-md border border-gold/25 pl-4 pr-12 py-3.5 text-xs focus:outline-none focus:border-gold focus:bg-card/80 transition-all duration-300 font-light shadow-[0_10px_28px_rgba(0,0,0,0.10)]"
          style={{ borderRadius: 14 }}
        />
        <motion.button
          type="submit"
          whileTap={{ scale: 0.9 }}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-gradient-to-br from-gold to-gold/70 text-foreground hover:from-gold/90 hover:to-gold/60 transition-all shadow-[0_10px_24px_hsl(var(--gold)_/_0.25)]"
          style={{ borderRadius: 12 }}
        >
          <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
        </motion.button>
      </motion.form>

      {/* Info bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex items-center justify-between mb-6 px-1 text-[10px]"
      >
        <p className="eyebrow flex items-center gap-1.5 text-muted-foreground">
          <span className="inline-block w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
          <span>In-session only</span>
        </p>
        <button
          onClick={() => navigate("/philosophy")}
          className="eyebrow text-gold hover:text-gold/80 transition-colors flex items-center gap-1"
        >
          Philosophy <ChevronRight className="w-3 h-3" />
        </button>
      </motion.div>

      {/* Main CTA Button */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate("/dashboard")}
        className="w-full mb-8 relative overflow-hidden group bg-gradient-to-r from-primary/85 to-primary p-4 text-white font-light transition-all shadow-[0_18px_40px_hsl(var(--primary)_/_0.28)]"
        style={{ borderRadius: 16 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary to-gold opacity-0 group-hover:opacity-100 transition-opacity"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        {/* glossy highlight */}
        <div className="absolute -top-16 left-0 right-0 h-24 bg-white/10 blur-2xl rotate-6 opacity-70" />
        <div className="relative flex items-center justify-between">
          <div className="text-left">
            <p className="editorial-heading text-base">Begin Analysis</p>
            <p className="eyebrow text-xs mt-0.5 text-white/70">Analyze now — save for later</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center">
            <Brain className="w-5 h-5" strokeWidth={1.5} />
          </div>
        </div>
      </motion.button>

      <div className="gold-hairline mb-6" />

      {/* Tools section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <p className="eyebrow mb-3 text-gold">Quick Tools</p>
        <div className="grid grid-cols-3 gap-2.5 mb-8">
          {tools.map((tool, i) => (
            <motion.button
              key={tool.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 + i * 0.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(tool.to)}
              className={`relative overflow-hidden border border-border/55 bg-gradient-to-br ${tool.color} p-3 flex flex-col items-start text-left aspect-square justify-between hover:border-primary transition-all duration-500 group shadow-[0_14px_30px_rgba(0,0,0,0.08)]`}
              style={{ borderRadius: 16 }}
            >
              <motion.div
                className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
              <div className="relative z-10 w-7 h-7 bg-card/40 backdrop-blur-sm border border-border/50 rounded-xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <tool.icon className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
              </div>
              <div className="relative z-10">
                <p className="editorial-heading text-xs leading-tight text-foreground">{tool.label}</p>
                <p className="eyebrow mt-1 text-[8px] text-muted-foreground">{tool.sub}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>


      {/* Emotion landscape */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="eyebrow text-gold">Your Landscape</p>
            <p className="editorial-heading text-sm mt-1 text-foreground">
              Recent <span className="editorial-italic">readings</span>
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/dashboard")}
            className="eyebrow text-gold hover:text-gold/80 transition-colors flex items-center gap-1 text-xs"
          >
            View all <ChevronRight className="w-3 h-3" />
          </motion.button>
        </div>

        <div className="grid grid-cols-2 gap-2.5 mb-8">
          {moodCards.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95 + i * 0.08 }}
              whileTap={{ scale: 0.97 }}
              className={`relative overflow-hidden border border-border/45 bg-gradient-to-br ${m.color} p-4 group hover:border-primary/50 transition-all shadow-[0_14px_30px_rgba(0,0,0,0.08)]`}
              style={{ borderRadius: 16 }}
            >
              <motion.div
                className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
              <div className="relative z-10">
                <p className="eyebrow text-[8px] text-muted-foreground">№ {String(i + 1).padStart(2, "0")}</p>
                <p className="editorial-heading text-sm text-foreground mt-2">{m.label}</p>
                <div className="flex items-baseline justify-between mt-3">
                  <p className="editorial-italic text-gold text-xl font-light">{m.pct}</p>
                  <p className="eyebrow text-[8px]">Example</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Footer CTA */}
      <MobileStickyCTA onClick={() => navigate("/pricing")} />

      {/* Bottom spacing for sticky CTA */}
      <div className="h-4" />
    </div>
  );
};

export default MobileLanding;
