import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Gamepad2, BookOpen, ScanFace, MessageCircle, Music, ArrowRight } from "lucide-react";
import thumbGames from "@/assets/tool-games.jpg";
import thumbJournal from "@/assets/tool-journal.jpg";
import thumbMood from "@/assets/tool-mood.jpg";
import thumbCompanion from "@/assets/tool-companion.jpg";
import thumbPlaylists from "@/assets/tool-playlists.jpg";

const Tools = () => {
  const navigate = useNavigate();

  const openCompanion = () => {
    window.dispatchEvent(new CustomEvent("subtle:open-companion"));
  };

  const items = [
    {
      title: "Mind Games",
      desc: "Breathe, focus, reflect, draw — under two minutes each.",
      icon: Gamepad2,
      thumb: thumbGames,
      action: () => navigate("/games"),
    },
    {
      title: "Journalling",
      desc: "Write it down. Tag the mood. Watch the pattern surface.",
      icon: BookOpen,
      thumb: thumbJournal,
      action: () => navigate("/dashboard?tab=journal"),
    },
    {
      title: "Mood Detection",
      desc: "Read the spoken, the felt and the unsaid in one session.",
      icon: ScanFace,
      thumb: thumbMood,
      action: () => navigate("/dashboard"),
    },
    {
      title: "AI Companion",
      desc: "Talk it through with your Subtle Companion, any hour.",
      icon: MessageCircle,
      thumb: thumbCompanion,
      action: openCompanion,
    },
    {
      title: "Mood Playlists",
      desc: "Sound tuned to the feeling you arrived with.",
      icon: Music,
      thumb: thumbPlaylists,
      action: () => navigate("/playlists"),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="container mx-auto px-5 sm:px-6 py-5 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <p className="eyebrow">Tools</p>
        <div className="w-12" />
      </header>

      <main className="container mx-auto px-5 sm:px-6 pb-32 sm:pb-16 max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="editorial-heading text-3xl sm:text-5xl mb-3">
            Quiet <span className="editorial-italic text-gold">tools</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground font-light max-w-md mx-auto">
            Everything you need to notice, name and settle what you're feeling.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
          {items.map((it, i) => (
            <motion.button
              key={it.title}
              onClick={it.action}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="glass-panel rounded-2xl overflow-hidden text-left group"
            >
              <span className="block relative w-full aspect-[16/7] overflow-hidden">
                <img
                  src={it.thumb}
                  alt={`${it.title} — Subtle Sense tool`}
                  loading="lazy"
                  width={768}
                  height={512}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <span className="absolute bottom-2 left-3 w-8 h-8 rounded-full border border-gold/40 bg-background/60 backdrop-blur-sm flex items-center justify-center">
                  <it.icon className="w-3.5 h-3.5 text-gold" />
                </span>
              </span>
              <span className="block p-4 sm:p-5">
                <span className="flex items-center justify-between gap-2">
                  <span className="editorial-heading text-lg block">{it.title}</span>
                  <ArrowRight className="w-4 h-4 opacity-40 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="block text-sm text-muted-foreground font-light mt-1">{it.desc}</span>
              </span>
            </motion.button>

          ))}
        </div>
      </main>
    </div>
  );
};

export default Tools;
