import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Wind, Sparkles, Heart, Brush } from "lucide-react";
import BreathingBubble from "@/components/games/BreathingBubble";
import ColorFlow from "@/components/games/ColorFlow";
import GratitudeCards from "@/components/games/GratitudeCards";
import ZenSand from "@/components/games/ZenSand";

const GAMES = [
  { id: "breathe", title: "Breathing Bubble", desc: "Guided 4-7-8 breath work", icon: Wind, component: BreathingBubble },
  { id: "color", title: "Color Flow", desc: "Calm focus tap game", icon: Sparkles, component: ColorFlow },
  { id: "gratitude", title: "Gratitude Cards", desc: "Flip & reflect", icon: Heart, component: GratitudeCards },
  { id: "sand", title: "Zen Sand", desc: "Free-flow drawing", icon: Brush, component: ZenSand },
] as const;

const Games = () => {
  const [active, setActive] = useState<string | null>(null);
  const Active = GAMES.find((g) => g.id === active)?.component;

  return (
    <div className="min-h-screen bubble-bg">
      <header className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2 text-sm hover:opacity-80">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <h1 className="font-display text-xl font-bold gradient-text">Mind Games 🎮</h1>
        <div className="w-12" />
      </header>

      <main className="container mx-auto px-4 sm:px-6 pb-12">
        {!active ? (
          <>
            <p className="text-center text-muted-foreground mb-8 max-w-xl mx-auto">
              Tiny mindful breaks designed to reset your nervous system. Pick one — they all take under 2 minutes.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {GAMES.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setActive(g.id)}
                  className="glass-panel rounded-2xl p-6 text-left hover:scale-[1.02] transition-transform"
                >
                  <div className="w-12 h-12 rounded-xl neon-gradient flex items-center justify-center mb-3">
                    <g.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h2 className="font-display text-lg font-bold">{g.title}</h2>
                  <p className="text-sm text-muted-foreground">{g.desc}</p>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-3xl mx-auto">
            <button
              onClick={() => setActive(null)}
              className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" /> All games
            </button>
            <div className="glass-panel rounded-3xl">{Active && <Active />}</div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Games;
