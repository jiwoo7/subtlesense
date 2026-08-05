import { motion } from "framer-motion";

const stats = [
  { value: "82%", label: "Detection Accuracy" },
  { value: "40%", label: "Confusion Reduced" },
  { value: "<50ms", label: "Real-time Analysis" },
];

const StatsSection = () => {
  return (
    <section className="py-10 sm:py-14">
      <motion.div
        className="glass-panel rounded-sm p-6 sm:p-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-3 gap-4 sm:gap-8 divide-x divide-border">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center px-1"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="editorial-heading text-3xl sm:text-5xl text-foreground mb-2">
                {stat.value}
              </div>
              <div className="eyebrow">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default StatsSection;
