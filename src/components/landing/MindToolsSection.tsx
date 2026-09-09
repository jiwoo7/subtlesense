import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type MarkProps = { className?: string };

/* Custom editorial line marks — drawn to match the Quiet Luxury aesthetic */

const MarkStillness = ({ className }: MarkProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
    <circle cx="24" cy="24" r="17" stroke="currentColor" strokeWidth="1.1" />
    <circle cx="24" cy="24" r="9.5" stroke="currentColor" strokeWidth="1.1" />
    <circle cx="24" cy="24" r="2.6" fill="currentColor" />
    <path d="M24 3.5v5M24 39.5v5M3.5 24h5M39.5 24h5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
  </svg>
);

const MarkSound = ({ className }: MarkProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
    <path d="M9 32V16M16 36V12M23 29V19M30 38V10M37 31V17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="30" cy="10" r="2.2" fill="currentColor" />
  </svg>
);

const MarkQuill = ({ className }: MarkProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
    <path
      d="M38 9c-12 1-20 6-24 13-2.6 4.6-3 9.2-2.4 13.4C16 30 21 25.5 28 22c-4.4 3.9-8.6 8.6-11.2 14"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M9 40l5-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M38 9c1.4 6.4.6 12-2 16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const MarkVolume = ({ className }: MarkProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
    <path
      d="M24 14c-3.6-2.6-8-3.8-13-3.6v23c5-.2 9.4 1 13 3.6 3.6-2.6 8-3.8 13-3.6v-23c-5-.2-9.4 1-13 3.6Z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
    <path d="M24 14v23" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

const MindToolsSection = () => {
  const cards = [
    {
      to: "/games",
      Mark: MarkStillness,
      title: "Mind Games",
      desc: "Breathe, focus, reflect, draw — 4 calming games under 2 mins.",
    },
    {
      to: "/playlists",
      Mark: MarkSound,
      title: "Mood Playlists",
      desc: "Curated Spotify playlists tuned to your feeling. Surprise Me inside.",
    },
    {
      to: "/dashboard?tab=journal",
      Mark: MarkQuill,
      title: "Mood Journal",
      desc: "Reflect, tag, and revisit what came up. Private by default.",
    },
    {
      to: "/guides",
      Mark: MarkVolume,
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
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-gold/40 bg-background/60 flex items-center justify-center mb-4 transition-colors group-hover:border-gold group-hover:bg-gold/10">
                <c.Mark className="w-6 h-6 sm:w-7 sm:h-7 text-gold" />
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
