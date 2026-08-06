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
              className="glass-panel rounded-2xl p-4 sm:p-6 text-left group"
            >
              <div className="flex items-start gap-3">
                <span className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center flex-shrink-0">
                  <it.icon className="w-4 h-4 text-gold" />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="flex items-center justify-between gap-2">
                    <span className="editorial-heading text-lg block">{it.title}</span>
                    <ArrowRight className="w-4 h-4 opacity-40 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="block text-sm text-muted-foreground font-light mt-1">{it.desc}</span>
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Tools;
