import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Gamepad2, Music, ArrowRight } from "lucide-react";

const MindToolsSection = () => {
  const cards = [
    {
      to: "/games",
      icon: Gamepad2,
      title: "Mind Games",
      desc: "Breathe, focus, reflect, draw — 4 calming games under 2 mins.",
      tone: "from-neon-pink to-neon-purple",
    },
    {
      to: "/playlists",
      icon: Music,
      title: "Mood Playlists",
      desc: "Curated Spotify playlists tuned to your feeling. Surprise Me inside.",
      tone: "from-neon-purple to-neon-magenta",
    },
  ];
  return (
    <section className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="text-center mb-6">
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-2">After your analysis ✨</h2>
        <p className="text-muted-foreground text-sm sm:text-base">Tiny tools to help you sit with what came up.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
        {cards.map((c) => (
          <motion.div key={c.to} whileHover={{ y: -4 }}>
            <Link
              to={c.to}
              className="block glass-panel rounded-2xl p-5 sm:p-6 group h-full"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.tone} flex items-center justify-center mb-3`}>
                <c.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-display text-lg font-bold">{c.title}</h3>
                <ArrowRight className="w-4 h-4 opacity-50 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-sm text-muted-foreground mt-1">{c.desc}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MindToolsSection;
