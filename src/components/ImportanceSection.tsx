import { motion } from "framer-motion";
import { Heart, Shield, TrendingUp, Zap } from "lucide-react";

const importanceData = [
  {
    icon: Heart,
    title: "Emotional Wellbeing",
    description: "Coding frustration affects mental health. We help catch burnout before it happens.",
    color: "pink",
  },
  {
    icon: TrendingUp,
    title: "Better Learning Outcomes",
    description: "Students who manage emotions learn 2x faster and retain knowledge longer.",
    color: "lavender",
  },
  {
    icon: Shield,
    title: "Prevent Dropout",
    description: "67% of coding learners quit due to frustration. Early intervention keeps them going.",
    color: "mint",
  },
  {
    icon: Zap,
    title: "Boost Productivity",
    description: "Recognizing cognitive walls helps developers work smarter, not harder.",
    color: "sky",
  },
];

const colorMap = {
  pink: "card-pink",
  lavender: "card-lavender",
  mint: "card-mint",
  sky: "card-sky",
};

const iconColorMap = {
  pink: "bg-pastel-pink/40 text-pink-600",
  lavender: "bg-pastel-lavender/40 text-purple-600",
  mint: "bg-pastel-mint/40 text-emerald-600",
  sky: "bg-pastel-sky/40 text-blue-600",
};

const ImportanceSection = () => {
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
          Why Emotion-Aware Learning Matters 💜
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Traditional learning ignores how you feel. We believe understanding emotions 
          is the key to unlocking your true potential as a developer.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {importanceData.map((item, index) => (
          <motion.div
            key={item.title}
            className={`${colorMap[item.color as keyof typeof colorMap]} rounded-2xl p-6 hover:-translate-y-2 transition-all duration-300`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <motion.div
              className={`w-14 h-14 rounded-xl ${iconColorMap[item.color as keyof typeof iconColorMap]} flex items-center justify-center mb-4`}
              whileHover={{ rotate: 10, scale: 1.1 }}
            >
              <item.icon className="w-7 h-7" />
            </motion.div>
            <h3 className="font-display text-lg font-bold text-foreground mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ImportanceSection;
