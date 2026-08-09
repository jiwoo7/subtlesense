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
    <div className="min-h-screen bg-background">
      <header className="container mx-auto px-5 sm:px-6 py-4 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.24em] uppercase text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.4} /> Back
        </Link>
        <h1 className="editorial-heading text-lg sm:text-2xl text-foreground">Mind Games</h1>
        <div className="w-10" />
      </header>
      <div className="container mx-auto px-5 sm:px-6"><div className="gold-hairline opacity-60" /></div>

      <main className="container mx-auto px-5 sm:px-6 pb-28 sm:pb-12 pt-8">
        {!active ? (
          <>
            <p className="text-center text-[12.5px] sm:text-sm text-muted-foreground font-light mb-8 max-w-xl mx-auto">
              Tiny mindful breaks. Pick one — under two minutes each.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:gap-5 max-w-3xl mx-auto">
              {GAMES.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setActive(g.id)}
                  className="border border-border/60 bg-card/40 p-4 sm:p-6 text-left transition-colors hover:border-primary/50"
                  style={{ borderRadius: 2 }}
                >
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-primary/40 flex items-center justify-center mb-3">
                    <g.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" strokeWidth={1.4} />
                  </div>
                  <h2 className="editorial-heading text-base sm:text-xl text-foreground">{g.title}</h2>
                  <p className="text-[11px] sm:text-[12.5px] text-muted-foreground font-light leading-relaxed mt-1">{g.desc}</p>
                </button>
              ))}
            </div>
          </>

        ) : (
          <div className="max-w-3xl mx-auto">
            <button
              onClick={() => setActive(null)}
              className="mb-4 inline-flex items-center gap-1.5 text-[10px] tracking-[0.24em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.4} /> All games
            </button>
            <div className="border border-border/60 bg-card/40" style={{ borderRadius: 2 }}>{Active && <Active />}</div>

          </div>
        )}
      </main>
    </div>
  );
};

export default Games;
