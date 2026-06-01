import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Crown,
  Send,
  Gamepad2,
  Music,
  LineChart,
  BookOpen,
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
  { icon: Gamepad2, label: "Mind Games", sub: "Reset in 2 mins", to: "/games" },
  { icon: Music, label: "Mood Playlists", sub: "Curated for you", to: "/playlists" },
  { icon: LineChart, label: "AI Analysis", sub: "Discover deeper", to: "/demo" },
  { icon: BookOpen, label: "Journal", sub: "Write it out", to: "/dashboard" },
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
    if (to === "#analyze") return onAnalyze();
    navigate(to);
  };

  const handleTab = (label: string) => {
    if (label === "Home") window.scrollTo({ top: 0, behavior: "smooth" });
    else if (label === "Insights") navigate(currentUser ? "/dashboard" : "/auth");
    else if (label === "Companion") openCompanion();
    else if (label === "Tools") navigate("/games");
    else if (label === "Profile") navigate(currentUser ? "/settings" : "/auth");
  };

  return (
    <div className="sm:hidden relative z-10 px-5 pt-5 pb-28 min-h-screen">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-7">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl overflow-hidden shadow-[0_0_18px_hsl(var(--neon-pink)/0.5)]">
            <img src={logoUrl} alt="Subtle Sense" className="w-full h-full object-cover" />
          </div>
          <span className="font-display text-lg font-bold text-foreground">Subtle Sense</span>
        </div>
        <button
          onClick={() => navigate("/premium")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neon-pink/40 text-neon-pink text-xs font-semibold"
        >
          <Crown className="w-3.5 h-3.5" />
          Premium
        </button>
      </div>

      {/* Hero */}
      <div className="flex items-start justify-between gap-3 mb-5">
        <div className="flex-1">
          <h1
            className="font-display text-3xl font-extrabold leading-tight mb-2"
            style={{ color: "hsl(var(--neon-pink))" }}
          >
            Hi, I'm here.
          </h1>
          <p className="text-sm text-muted-foreground leading-snug">
            Tell me how you're feeling,<br />or ask anything. No pressure.
          </p>
        </div>
        <motion.div
          className="w-24 h-24 flex-shrink-0 rounded-2xl flex items-center justify-center"
          style={{
            background: "radial-gradient(circle, hsl(var(--neon-pink)/0.35), transparent 70%)",
          }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <img src={logoUrl} alt="" className="w-20 h-20 object-contain drop-shadow-[0_0_18px_hsl(var(--neon-pink))]" />
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
        className="relative mb-7"
      >
        <input
          name="q"
          placeholder="Share what's on your mind..."
          className="w-full bg-card/60 border border-border/50 rounded-full pl-5 pr-14 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-neon-pink/50"
        />
        <button
          type="submit"
          aria-label="Send"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: "hsl(var(--neon-pink))" }}
        >
          <Send className="w-4 h-4 text-white" />
        </button>
      </form>

      {/* Start with something */}
      <h2 className="font-display text-base font-bold mb-3">Start with something</h2>
      <div className="grid grid-cols-4 gap-2.5 mb-7">
        {startCards.map((c) => (
          <motion.button
            key={c.label}
            whileTap={{ scale: 0.94 }}
            onClick={() => handleCard(c.to)}
            className="glass-panel rounded-2xl p-2.5 flex flex-col items-center text-center aspect-[3/4] justify-center gap-1"
          >
            <c.icon className="w-6 h-6 text-neon-pink mb-1" />
            <p className="text-[11px] font-semibold leading-tight">{c.label}</p>
            <p className="text-[9px] text-muted-foreground leading-tight">{c.sub}</p>
          </motion.button>
        ))}
      </div>

      {/* Emotion landscape */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display text-base font-bold">Your emotion landscape</h2>
        <button
          onClick={() => navigate(currentUser ? "/dashboard" : "/auth")}
          className="text-xs text-muted-foreground flex items-center gap-0.5"
        >
          View all ›
        </button>
      </div>
      <div className="grid grid-cols-4 gap-2.5 mb-6">
        {moodCards.map((m) => (
          <div
            key={m.label}
            className="glass-panel rounded-2xl p-2.5 flex flex-col items-center text-center aspect-[3/4] justify-center gap-1"
          >
            <div className={`w-9 h-9 rounded-full ${m.bg} flex items-center justify-center mb-1`}>
              <m.icon className={`w-4 h-4 ${m.color}`} />
            </div>
            <p className="text-[11px] font-semibold leading-tight">{m.label}</p>
            <p className="text-[10px] text-muted-foreground">{m.pct}</p>
          </div>
        ))}
      </div>

      {/* Bottom tabs */}
      <nav className="fixed bottom-0 inset-x-0 z-40 sm:hidden">
        <div className="mx-3 mb-3 rounded-3xl bg-background/85 backdrop-blur-xl border border-border/50 shadow-2xl">
          <div className="flex items-center justify-around py-2">
            {tabs.map((t, i) => {
              const active = i === 0;
              return (
                <button
                  key={t.label}
                  onClick={() => handleTab(t.label)}
                  className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl ${
                    active ? "text-neon-pink" : "text-muted-foreground"
                  }`}
                >
                  <t.icon className="w-5 h-5" />
                  <span className="text-[10px] font-medium">{t.label}</span>
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
