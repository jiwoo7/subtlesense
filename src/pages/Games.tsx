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
      <header className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs sm:text-sm hover:opacity-80">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <h1 className="font-display text-base sm:text-xl font-bold gradient-text">Mind Games 🎮</h1>
        <div className="w-10" />
      </header>

      <main className="container mx-auto px-4 sm:px-6 pb-28 sm:pb-12">
        {!active ? (
          <>
            <p className="text-center text-xs sm:text-base text-muted-foreground mb-5 sm:mb-8 max-w-xl mx-auto px-2">
              Tiny mindful breaks. Pick one — under 2 minutes each.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4 max-w-3xl mx-auto">
              {GAMES.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setActive(g.id)}
                  className="glass-panel rounded-2xl p-3 sm:p-6 text-left hover:scale-[1.02] transition-transform"
                >
                  <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl neon-gradient flex items-center justify-center mb-2 sm:mb-3">
                    <g.icon className="w-4 h-4 sm:w-6 sm:h-6 text-primary-foreground" />
                  </div>
                  <h2 className="font-display text-sm sm:text-lg font-bold">{g.title}</h2>
                  <p className="text-[11px] sm:text-sm text-muted-foreground leading-tight mt-0.5">{g.desc}</p>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-3xl mx-auto">
            <button
              onClick={() => setActive(null)}
              className="mb-3 sm:mb-4 inline-flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-foreground"
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
