import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Send,
  Gamepad2,
  Music,
  BookOpen,
  Brain,
  Sparkles,
  Zap,
  Droplet,
  Leaf,
} from "lucide-react";
import logoUrl from "@/assets/subtle-sense-logo.png";
import StreakBadge from "@/components/StreakBadge";
import { useStreak } from "@/hooks/useStreak";
import type { User } from "@supabase/supabase-js";

interface Props {
  currentUser: User | null;
  onAnalyze: () => void;
}

const startCards = [
  { icon: BookOpen, label: "Journal", sub: "Login to save", to: "/dashboard?tab=journal" },
  { icon: Gamepad2, label: "Mind Games", sub: "2 min reset", to: "/games" },
  { icon: Music, label: "Spotify", sub: "Mood playlists", to: "/playlists" },
];

const moodCards = [
  { icon: Sparkles, label: "Overthinking", pct: "78%", color: "text-neon-purple", bg: "bg-neon-purple/15" },
  { icon: Zap, label: "Stress", pct: "65%", color: "text-warning", bg: "bg-warning/15" },
  { icon: Droplet, label: "Sadness", pct: "42%", color: "text-neon-magenta", bg: "bg-neon-magenta/15" },
  { icon: Leaf, label: "Hope", pct: "71%", color: "text-success", bg: "bg-success/15" },
];

const MobileLanding = ({ currentUser, onAnalyze }: Props) => {
  const navigate = useNavigate();
  const { current, longest } = useStreak(currentUser?.id);

  const openCompanion = (text?: string) => {
    window.dispatchEvent(new CustomEvent("subtle:open-companion", { detail: { text } }));
  };

  const handleCard = (to: string) => {
    navigate(to);
  };

  return (
    <div className="sm:hidden relative z-10 w-full overflow-x-hidden px-4 pt-4 pb-24 min-h-[100dvh]">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full overflow-hidden shadow-[0_0_16px_hsl(var(--neon-pink)/0.45)]">
            <img src={logoUrl} alt="Subtle Sense" className="w-full h-full object-cover" />
          </div>
          <span className="font-display text-base font-bold text-foreground">Subtle Sense</span>
        </div>
        {currentUser ? (
          <StreakBadge current={current} longest={longest} compact />
        ) : (
          <button
            onClick={() => navigate("/auth")}
            className="px-2.5 py-1.5 rounded-full border border-primary/40 text-primary text-[11px] font-semibold"
          >
            Sign in
          </button>
        )}
      </div>

      {/* Hero */}
      <div className="flex items-start justify-between gap-2 mb-4">
        <div className="flex-1">
          <h1
            className="font-display text-3xl font-extrabold leading-tight mb-1.5"
            style={{ color: "hsl(var(--neon-pink))" }}
          >
            Hi, I'm here.
          </h1>
          <p className="text-xs text-muted-foreground leading-snug">
            Tell me how you're feeling,<br />or ask anything. No pressure.
          </p>
        </div>
        <motion.div
          className="w-20 h-20 flex-shrink-0 rounded-full flex items-center justify-center overflow-hidden"
          style={{
            background: "radial-gradient(circle, hsl(var(--neon-pink)/0.45), transparent 70%)",
            boxShadow: "0 0 30px hsl(var(--neon-pink)/0.5)",
          }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <img src={logoUrl} alt="" className="w-16 h-16 rounded-full object-cover" />
        </motion.div>
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          openCompanion(String(fd.get("q") || ""));
          (e.currentTarget as HTMLFormElement).reset();
        }}
        className="relative mb-5"
      >
        <input
          name="q"
          placeholder="Share what's on your mind..."
          className="w-full bg-card/60 border border-border/50 rounded-full pl-4 pr-12 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <button
          type="submit"
          aria-label="Send"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center bg-primary"
        >
          <Send className="w-3.5 h-3.5 text-primary-foreground" />
        </button>
      </form>

      {/* Tools */}
      <h2 id="mobile-tools" className="font-display text-sm font-bold mb-2.5">Tools</h2>
      <div className="grid grid-cols-3 gap-2.5 mb-4">
        {startCards.map((c) => (
          <motion.button
            key={c.label}
            whileTap={{ scale: 0.94 }}
            onClick={() => handleCard(c.to)}
            aria-label={c.label}
            className="glass-panel rounded-2xl p-2.5 flex min-w-0 flex-col items-center text-center aspect-square justify-center gap-1"
          >
            <c.icon className="w-5 h-5 text-primary mb-0.5" />
            <p className="text-[11px] font-semibold leading-tight break-words">{c.label}</p>
            <p className="text-[11px] text-muted-foreground leading-tight">{c.sub}</p>
          </motion.button>
        ))}
      </div>

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate("/dashboard")}
        aria-label="Open AI Analysis"
        className="w-full mb-5 overflow-hidden rounded-2xl border border-primary/35 bg-primary/10 p-3 text-left shadow-[0_0_22px_hsl(var(--primary)/0.16)]"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Brain className="w-5 h-5 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-display text-sm font-bold text-foreground leading-tight">AI Analysis</p>
            <p className="text-[11px] text-muted-foreground leading-tight">Analyze now, login only to save</p>
          </div>
          <span className="text-[11px] font-semibold text-primary">Open ›</span>
        </div>
      </motion.button>

      {/* Emotion landscape */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display text-base font-bold">Your emotion landscape</h2>
        <button
          onClick={() => navigate("/dashboard")}
          className="text-xs text-muted-foreground flex items-center gap-0.5"
        >
          View all ›
        </button>
      </div>
      <div className="grid grid-cols-4 gap-2 mb-5">
        {moodCards.map((m) => (
          <div
            key={m.label}
            className="glass-panel rounded-2xl p-2 flex min-w-0 flex-col items-center text-center aspect-[3/4] justify-center gap-1"
          >
            <div className={`w-8 h-8 rounded-full ${m.bg} flex items-center justify-center mb-0.5`}>
              <m.icon className={`w-4 h-4 ${m.color}`} />
            </div>
            <p className="text-[11px] font-semibold leading-tight break-words">{m.label}</p>
            <p className="text-[11px] text-muted-foreground">{m.pct}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileLanding;
