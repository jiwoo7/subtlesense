import { motion } from "framer-motion";
import { Heart, Brain, Users, Sparkles } from "lucide-react";

const useCases = [
  {
    icon: Brain,
    title: "Self-Awareness",
    emoji: "🧠",
    description: "Most people think they know how they feel — but research shows we misidentify our own emotions 40% of the time. Subtle Sense shows you what you're actually feeling, not what you think you're feeling.",
    examples: [
      "Recognize burnout before it hits",
      "Spot patterns between mood and productivity",
      "Understand emotional triggers you didn't know existed",
    ],
  },
  {
    icon: Heart,
    title: "Therapy & Mental Health",
    emoji: "💜",
    description: "Therapists can't see you 24/7. Subtle Sense fills the gap by giving you concrete emotional data to bring to sessions — making therapy more productive and progress more measurable.",
    examples: [
      "Track emotional progress between sessions",
      "Share objective data with your therapist",
      "Identify suppressed emotions you struggle to articulate",
    ],
  },
  {
    icon: Users,
    title: "Relationships",
    emoji: "💕",
    description: "Arguments often stem from unspoken emotions. When you understand what you're suppressing, you communicate what you actually need — instead of exploding over something unrelated.",
    examples: [
      "Understand what you're really upset about",
      "Communicate needs you couldn't articulate before",
      "Reduce conflicts caused by unprocessed emotions",
    ],
  },
  {
    icon: Sparkles,
    title: "Coaching & Growth",
    emoji: "🚀",
    description: "Performance coaches know that emotions drive decisions. Subtle Sense gives coaches real data on a client's emotional state — replacing guesswork with actionable insights.",
    examples: [
      "Pinpoint emotional blocks holding you back",
      "Measure emotional resilience growth over time",
      "Make data-driven decisions about your well-being",
    ],
  },
];

const RealWorldUseCases = () => {
  return (
    <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
      <motion.div
        className="text-center mb-10 sm:mb-14"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
          How This Actually Helps You 💡
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
          Honest answers — no hype, just real ways emotional awareness changes lives
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 max-w-5xl mx-auto">
        {useCases.map((useCase, index) => (
          <motion.div
            key={useCase.title}
            className="glass-panel rounded-2xl p-5 sm:p-6 border border-border/50 hover:border-neon-purple/30 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{useCase.emoji}</span>
              <h3 className="font-display text-lg font-bold">{useCase.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {useCase.description}
            </p>
            <ul className="space-y-1.5">
              {useCase.examples.map((example) => (
                <li key={example} className="flex items-start gap-2 text-sm">
                  <span className="text-neon-pink mt-0.5 shrink-0">✓</span>
                  <span className="text-foreground/80">{example}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RealWorldUseCases;
