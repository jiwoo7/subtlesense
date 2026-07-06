import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import logoUrl from "@/assets/subtle-sense-logo.png";
import AnimatedBackground from "@/components/AnimatedBackground";

const ease = [0.25, 1, 0.5, 1] as const;

const philosophyPoints = [
  {
    n: "I",
    title: "The Unspoken Language",
    body: "We are more than our words. In every glance, every pause, every inflection lies a deeper truth—one that often contradicts what we say aloud. Subtle Sense exists to honor this gap between speech and feeling, between presentation and presence.",
  },
  {
    n: "II",
    title: "Observation Without Judgment",
    body: "To observe is not to judge. We read the surface—micro-expressions, cadence, breath—not to label or condemn, but to understand. Every emotion is valid. Every silence speaks. Our role is witnessing, not verdict.",
  },
  {
    n: "III",
    title: "The Suppressed Deserves Attention",
    body: "Society teaches us to edit ourselves. To smile when we're breaking. To remain composed when we're overwhelmed. The emotions we suppress are often the ones that need us most. We see them. We name them. We create space for them.",
  },
  {
    n: "IV",
    title: "Technology as Mirror, Not Master",
    body: "AI is a tool for reflection, not replacement. It cannot feel what you feel. It cannot know your story. What it can do is reflect back what it observes, offering you a quiet moment to meet yourself as you truly are.",
  },
  {
    n: "V",
    title: "Privacy is Sacred",
    body: "Your emotions are yours alone. We don't store them, analyze them for profit, or use them to predict your future purchases. What you share with Subtle Sense stays with you. Privacy isn't a feature—it's a commitment.",
  },
  {
    n: "VI",
    title: "For the Ones Who Over-Explain",
    body: "If you've ever found yourself talking too much to fill a silence, or explaining your feelings in endless loops—this is for you. Subtle Sense speaks the language of nuance, of the unspoken, of those rare moments when someone finally understands.",
  },
  {
    n: "VII",
    title: "Emotion is Intelligence",
    body: "We live in a world that valorizes rationality above all. But emotions are data. They are wisdom. They are signals worth listening to. Subtle Sense treats your feelings not as noise to be managed, but as intelligence to be honored.",
  },
  {
    n: "VIII",
    title: "The 60-Second Ritual",
    body: "In 60 seconds, you speak. We listen. In that brief window, something profound can happen—a recognition, a naming, a release. Sixty seconds is enough time to matter. It's enough time to understand yourself a little better.",
  },
];

const Philosophy = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease },
    },
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      <AnimatedBackground />
      
      <div className="relative z-10">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-10 sm:py-16 max-w-4xl">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mb-10 sm:mb-14"
          >
            <Link
              to="/"
              className="eyebrow inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors"
            >
              <ArrowLeft className="w-3 h-3" strokeWidth={1.5} />
              Return
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.1, ease }}
            className="mb-16 sm:mb-24"
          >
            <div className="flex items-center gap-3 mb-8">
              <motion.img
                src={logoUrl}
                alt=""
                className="w-9 h-9 object-contain"
                style={{ filter: "drop-shadow(0 0 12px hsl(var(--primary) / 0.35))" }}
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="editorial-heading text-xs tracking-[0.32em] uppercase text-foreground">
                Subtle Sense
              </span>
            </div>

            <motion.p
              className="eyebrow mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
            >
              <span className="text-gold">Philosophy</span>
              <span className="mx-3 text-border">·</span>
              Why We Exist
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.3, ease }}
              className="editorial-heading text-4xl sm:text-5xl lg:text-6xl leading-[1.02] text-foreground mb-8"
            >
              We read what you <br />
              <span className="editorial-italic text-gold">seldom name aloud.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.4, ease }}
              className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed max-w-2xl"
            >
              Subtle Sense is built on a belief that emotions deserve to be understood. Not judged, not managed, not optimized—but truly, deeply understood. We believe the unspoken matters. We believe your feelings are valid. We believe in creating space for what's real.
            </motion.p>
          </motion.header>

          {/* Gold hairline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5, ease }}
            className="gold-hairline mb-16 origin-left"
          />

          {/* Philosophy sections */}
          <motion.div
            className="space-y-16 sm:space-y-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {philosophyPoints.map((point, i) => (
              <motion.section
                key={point.n}
                variants={itemVariants}
                className="group relative"
              >
                {/* Decorative line animation on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-gold/0 via-gold/30 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="grid grid-cols-[3rem_1fr] sm:grid-cols-[4rem_1fr] gap-4 sm:gap-8 pl-4 sm:pl-6">
                  <motion.p
                    className="eyebrow text-gold pt-1 text-lg font-light tracking-wider"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: i * 0.05 }}
                  >
                    {point.n}
                  </motion.p>

                  <div className="space-y-3">
                    <motion.h2
                      className="editorial-heading text-2xl sm:text-3xl text-foreground leading-tight"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.05 + 0.1 }}
                    >
                      {point.title}
                    </motion.h2>

                    <motion.p
                      className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed max-w-2xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.7, delay: i * 0.05 + 0.2 }}
                    >
                      {point.body}
                    </motion.p>
                  </div>
                </div>

                {/* Bottom divider */}
                {i < philosophyPoints.length - 1 && (
                  <motion.div
                    className="gold-hairline mt-12 sm:mt-16 opacity-40"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease }}
                  />
                )}
              </motion.section>
            ))}
          </motion.div>

          {/* Closing section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease }}
            className="mt-20 sm:mt-32 pt-16 border-t border-border/30"
          >
            <div className="max-w-2xl">
              <p className="eyebrow mb-6 text-gold">Closing</p>
              <p className="editorial-heading text-3xl sm:text-4xl leading-tight text-foreground mb-6">
                Subtle Sense isn't for everyone.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed mb-8">
                But if you're someone who feels deeply, who notices the spaces between words, who wonders what others are really thinking—this is for you. If you've ever wished someone could read what you can't say, this might be the tool you've been waiting for.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed">
                We're here. We're listening. And we believe in the power of being truly seen.
              </p>
            </div>
          </motion.section>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 sm:mt-32 pt-10 border-t border-border/20"
          >
            <p className="eyebrow text-muted-foreground text-xs">
              Est. 2025 · A philosophy of understanding
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Philosophy;
