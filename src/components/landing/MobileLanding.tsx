import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Crown,
  Send,
  Gamepad2,
  Music,
  BookOpen,
  Brain,
  Home,
  Compass,
  Heart,
  LayoutGrid,
  User as UserIcon,
  Sparkles,
  Zap,
  Droplet,
  Leaf,
} from "lucide-react";
import logoUrl from "@/assets/subtle-sense-logo.png";
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
  { icon: Droplet, label: "Sadness", pct: "42%", color: "text-sky-400", bg: "bg-sky-400/15" },
  { icon: Leaf, label: "Hope", pct: "71%", color: "text-emerald-400", bg: "bg-emerald-400/15" },
];

const tabs = [
  { icon: Home, label: "Home" },
  { icon: Compass, label: "Insights" },
  { icon: Heart, label: "Companion" },
  { icon: LayoutGrid, label: "Tools" },
  { icon: UserIcon, label: "Profile" },
];

const MobileLanding = ({ currentUser, onAnalyze }: Props) => {
  const navigate = useNavigate();

  const openCompanion = (text?: string) => {
    window.dispatchEvent(new CustomEvent("subtle:open-companion", { detail: { text } }));
  };

  const handleCard = (to: string) => {
    navigate(to);
  };

  const handleTab = (label: string) => {
    if (label === "Home") window.scrollTo({ top: 0, behavior: "smooth" });
    else if (label === "Insights") navigate("/dashboard");
    else if (label === "Companion") openCompanion();
    else if (label === "Tools") document.getElementById("mobile-tools")?.scrollIntoView({ behavior: "smooth" });
    else if (label === "Profile") navigate(currentUser ? "/settings" : "/auth");
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
        <button
          onClick={() => navigate("/premium")}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-primary/40 text-primary text-[11px] font-semibold"
        >
          <Crown className="w-3 h-3" />
          Premium
        </button>
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

      {/* Start with something */}
      <h2 id="mobile-tools" className="font-display text-sm font-bold mb-2.5">Tools</h2>
      <div className="grid grid-cols-3 gap-2.5 mb-4">
        {startCards.map((c) => (
          <motion.button
            key={c.label}
            whileTap={{ scale: 0.94 }}
            onClick={() => handleCard(c.to)}
            className="glass-panel rounded-2xl p-2.5 flex min-w-0 flex-col items-center text-center aspect-square justify-center gap-1"
          >
            <c.icon className="w-5 h-5 text-primary mb-0.5" />
            <p className="text-[10px] font-semibold leading-tight break-words">{c.label}</p>
            <p className="text-[9px] text-muted-foreground leading-tight">{c.sub}</p>
          </motion.button>
        ))}
      </div>

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate("/demo")}
        className="w-full mb-5 overflow-hidden rounded-2xl border border-primary/35 bg-primary/10 p-3 text-left shadow-[0_0_22px_hsl(var(--primary)/0.16)]"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Brain className="w-5 h-5 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-display text-sm font-bold text-foreground leading-tight">AI Analysis</p>
            <p className="text-[10px] text-muted-foreground leading-tight">Explore hidden emotions instantly</p>
          </div>
          <span className="text-[10px] font-semibold text-primary">Open ›</span>
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
            <p className="text-[10px] font-semibold leading-tight break-words">{m.label}</p>
            <p className="text-[10px] text-muted-foreground">{m.pct}</p>
          </div>
        ))}
      </div>

      {/* Bottom tabs */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 sm:hidden pointer-events-none">
        <div className="mx-auto mb-3 w-[calc(100%-1rem)] max-w-[414px] rounded-3xl bg-background/90 backdrop-blur-xl border border-border/50 shadow-2xl pointer-events-auto">
          <div className="flex items-center justify-around py-1.5">
            {tabs.map((t, i) => {
              const active = i === 0;
              return (
                <button
                  key={t.label}
                  onClick={() => handleTab(t.label)}
                  className={`flex min-w-[56px] flex-col items-center gap-0.5 px-1 py-1.5 rounded-xl ${
                    active ? "text-neon-pink" : "text-muted-foreground"
                  }`}
                >
                  <t.icon className="w-4 h-4" />
                  <span className="text-[9px] font-medium leading-none">{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MobileLanding;
