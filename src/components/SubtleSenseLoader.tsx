import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface SubtleSenseLoaderProps {
  message?: string;
}

const SubtleSenseLoader = ({ message = "Loading Subtle Sense" }: SubtleSenseLoaderProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-neon-pink/20 via-neon-purple/15 to-neon-red/10 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Logo with pulse */}
        <motion.div
          className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center shadow-2xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neon-pink to-neon-purple"
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
          <Heart className="w-10 h-10 text-white fill-white relative z-10" />
        </motion.div>

        {/* Wordmark with translucent wave overlay */}
        <div className="relative">
          <motion.h1
            className="font-display text-3xl sm:text-4xl font-extrabold gradient-text relative"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Subtle Sense
          </motion.h1>
          {/* Translucent white wave sweeping across the text */}
          <motion.div
            className="absolute inset-0 pointer-events-none overflow-hidden rounded-md"
            aria-hidden
          >
            <motion.div
              className="absolute top-0 bottom-0 w-1/3"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)",
                filter: "blur(6px)",
              }}
              animate={{ x: ["-150%", "350%"] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>

        {/* Dots */}
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-2 h-2 rounded-full bg-gradient-to-br from-neon-pink to-neon-purple"
              animate={{ y: [0, -6, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
            />
          ))}
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground font-medium tracking-wide">
          {message}…
        </p>
      </div>
    </div>
  );
};

export default SubtleSenseLoader;
