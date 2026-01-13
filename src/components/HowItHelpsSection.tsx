import { motion } from "framer-motion";
import { Brain, Clock, Heart, Lightbulb, Sparkles, Target } from "lucide-react";

const benefits = [
  {
    icon: Brain,
    title: "Understand Your Patterns",
    description: "Discover when you're most focused and what triggers confusion. Self-awareness is the first step to growth.",
    emoji: "🧠",
  },
  {
    icon: Clock,
    title: "Perfect Break Timing",
    description: "Our AI knows exactly when you need a break. Studies show 2-minute breaks reduce confusion by 40%.",
    emoji: "⏰",
  },
  {
    icon: Lightbulb,
    title: "Personalized Learning Paths",
    description: "Get tailored suggestions based on your emotional state. Confused? We simplify. Frustrated? We encourage.",
    emoji: "💡",
  },
  {
    icon: Target,
    title: "Track Your Progress",
    description: "Watch your emotional resilience grow over time. Celebrate victories and learn from struggles.",
    emoji: "🎯",
  },
  {
    icon: Heart,
    title: "Build Confidence",
    description: "Every coder feels frustrated sometimes. We normalize the struggle and help you push through.",
    emoji: "❤️",
  },
  {
    icon: Sparkles,
    title: "Achieve Flow State",
    description: "Learn to recognize and extend your peak coding moments. More flow = more productivity.",
    emoji: "✨",
  },
];

const HowItHelpsSection = () => {
  return (
    <section className="py-16">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-display text-3xl md:text-4xl font-extrabold gradient-text mb-4">
          How We Help You Succeed 🚀
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          EmotionAI is like having a supportive friend who understands the 
          emotional challenges of coding and knows exactly how to help.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => (
          <motion.div
            key={benefit.title}
            className="glass-panel rounded-2xl p-6 hover:-translate-y-2 hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <motion.div
              className="text-4xl mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
            >
              {benefit.emoji}
            </motion.div>
            <h3 className="font-display text-lg font-bold text-foreground mb-2">
              {benefit.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {benefit.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItHelpsSection;
