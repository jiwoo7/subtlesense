import { motion } from "framer-motion";

const stats = [
  { value: "82%", label: "Detection Accuracy", emoji: "🎯" },
  { value: "40%", label: "Confusion Reduced", emoji: "📉" },
  { value: "<50ms", label: "Real-time Analysis", emoji: "⚡" },
  { value: "10K+", label: "Happy Learners", emoji: "🎉" },
];

const StatsSection = () => {
  return (
    <section className="py-12">
      <motion.div
        className="glass-panel rounded-3xl p-8 pastel-gradient-soft"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                className="text-3xl mb-2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
              >
                {stat.emoji}
              </motion.div>
              <div className="font-display text-3xl md:text-4xl font-extrabold gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default StatsSection;
