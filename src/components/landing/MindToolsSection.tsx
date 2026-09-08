import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Gamepad2, Music, NotebookPen, Library, ArrowRight } from "lucide-react";

const MindToolsSection = () => {
  const cards = [
    {
      to: "/games",
      icon: Gamepad2,
      title: "Mind Games",
      desc: "Breathe, focus, reflect, draw — 4 calming games under 2 mins.",
    },
    {
      to: "/playlists",
      icon: Music,
      title: "Mood Playlists",
      desc: "Curated Spotify playlists tuned to your feeling. Surprise Me inside.",
    },
    {
      to: "/dashboard?tab=journal",
      icon: NotebookPen,
      title: "Mood Journal",
      desc: "Reflect, tag, and revisit what came up. Private by default.",
    },
    {
      to: "/guides",
      icon: Library,
      title: "The Quiet Library",
      desc: "8 essays on hidden, masked and unspoken emotions. Read in minutes.",
    },
  ];
  return (
    <section className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="text-center mb-6">
        <p className="eyebrow mb-3">Chapter · After</p>
        <h2 className="editorial-heading text-3xl sm:text-4xl mb-3">
          After your <span className="editorial-italic text-gold">analysis</span>
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base font-light">Tiny tools to help you sit with what came up.</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
        {cards.map((c) => (
          <motion.div key={c.to} whileHover={{ y: -4 }}>
            <Link
              to={c.to}
              className="block glass-panel rounded-2xl p-4 sm:p-6 group h-full"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl border border-gold/30 bg-gold/10 flex items-center justify-center mb-3">
                <c.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
              </div>
              <div className="flex items-center justify-between gap-2">
                <h3 className="editorial-heading text-base sm:text-lg">{c.title}</h3>
                <ArrowRight className="w-4 h-4 opacity-50 group-hover:translate-x-1 transition-transform shrink-0" />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground font-light mt-1">{c.desc}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MindToolsSection;
