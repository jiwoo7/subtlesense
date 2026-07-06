import { motion } from "framer-motion";
import { Heart, Brain, Users, Sparkles, Check } from "lucide-react";

const useCases = [
  {
    icon: Brain,
    title: "Self-Awareness",
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
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="eyebrow mb-3">Chapter · Application</p>
        <h2 className="editorial-heading text-3xl md:text-5xl mb-4">
          How this <span className="editorial-italic text-gold">actually</span> helps you
        </h2>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
          Honest answers — no hype, just real ways emotional awareness changes lives.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 max-w-5xl mx-auto">
        {useCases.map((useCase, index) => {
          const Icon = useCase.icon;
          return (
            <motion.div
              key={useCase.title}
              className="glass-panel rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-gold" strokeWidth={1.5} />
                </div>
                <h3 className="editorial-heading text-lg text-foreground">{useCase.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed font-light mb-5">
                {useCase.description}
              </p>
              <div className="gold-hairline mb-4 opacity-60" />
              <ul className="space-y-2">
                {useCase.examples.map((example) => (
                  <li key={example} className="flex items-start gap-2.5 text-sm font-light">
                    <Check className="w-4 h-4 text-gold mt-0.5 shrink-0" strokeWidth={1.5} />
                    <span className="text-foreground/85">{example}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default RealWorldUseCases;
