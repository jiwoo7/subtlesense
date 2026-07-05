import { motion } from "framer-motion";
import { Brain, Clock, Heart, Lightbulb, Sparkles, Target } from "lucide-react";

const benefits = [
  {
    icon: Brain,
    title: "Understand Your Patterns",
    description: "Discover when you're most focused and what triggers confusion. Self-awareness is the first step to growth.",
  },
  {
    icon: Clock,
    title: "Perfect Break Timing",
    description: "Our AI knows exactly when you need a break. Studies show 2-minute breaks reduce confusion by 40%.",
  },
  {
    icon: Lightbulb,
    title: "Personalized Learning Paths",
    description: "Get tailored suggestions based on your emotional state. Confused? We simplify. Frustrated? We encourage.",
  },
  {
    icon: Target,
    title: "Track Your Progress",
    description: "Watch your emotional resilience grow over time. Celebrate victories and learn from struggles.",
  },
  {
    icon: Heart,
    title: "Build Confidence",
    description: "Every person feels frustrated sometimes. We normalize the struggle and help you push through.",
  },
  {
    icon: Sparkles,
    title: "Achieve Flow State",
    description: "Learn to recognize and extend your peak moments. More flow, more clarity.",
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
        <p className="eyebrow mb-3">Chapter · Practice</p>
        <h2 className="editorial-heading text-3xl md:text-5xl mb-4">
          How it <span className="editorial-italic text-gold">actually</span> works
        </h2>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
          A quiet companion for the emotional weather of a working day.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <motion.div
              key={benefit.title}
              className="glass-panel rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-gold" strokeWidth={1.5} />
              </div>
              <h3 className="editorial-heading text-lg text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                {benefit.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default HowItHelpsSection;
