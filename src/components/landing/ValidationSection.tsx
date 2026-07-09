import { motion } from "framer-motion";
import { Award, Microscope, Sparkles, Users } from "lucide-react";

const features = [
  {
    icon: Award,
    label: "Featured on",
    value: "Product Hunt",
    detail: "Day 1: #239",
  },
  {
    icon: Sparkles,
    label: "Featured on",
    value: "Uneed",
    detail: "#9 / 100+ startups",
  },
  {
    icon: Award,
    label: "Featured on",
    value: "UIComet",
    detail: "Selected product showcase",
  },
];

const ease = [0.25, 1, 0.5, 1] as const;

const ValidationSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.85, ease }}
      className="relative mx-auto mt-8 w-full max-w-5xl overflow-hidden border border-border/60 bg-card/25 px-4 py-5 backdrop-blur-sm sm:mt-20 sm:px-8 sm:py-8"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-[-35%] w-1/3 bg-gradient-to-r from-transparent via-primary/15 to-transparent"
        animate={{ x: ["0%", "430%"] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-primary/70 to-transparent" />
            <p className="eyebrow text-gold">Validation</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {features.map((item, index) => (
              <motion.div
                key={`${item.value}-${item.detail}`}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.35, ease }}
                className="group border border-border/50 bg-background/25 p-4 text-left"
              >
                <div className="mb-5 flex items-center justify-between">
                  <item.icon className="h-4 w-4 text-primary" strokeWidth={1.25} />
                  <span className="eyebrow text-[0.55rem] text-muted-foreground">
                    No. {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="eyebrow text-[0.58rem]">{item.label}</p>
                <p className="editorial-heading mt-2 text-2xl text-foreground sm:text-xl lg:text-2xl">
                  {item.value}
                </p>
                <p className="mt-2 text-xs font-light leading-relaxed text-muted-foreground">
                  {item.detail}
                </p>
                <div className="mt-4 h-px w-0 bg-primary transition-all duration-500 group-hover:w-full" />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid gap-3">
          <motion.div
            whileHover={{ x: 4 }}
            className="border border-border/50 bg-background/20 p-5"
          >
            <div className="mb-4 flex items-center gap-3">
              <Microscope className="h-4 w-4 text-primary" strokeWidth={1.25} />
              <p className="eyebrow text-gold">Research</p>
            </div>
            <p className="editorial-heading text-xl leading-tight text-foreground sm:text-2xl">
              Contrastive Multi-Task Regularization
            </p>
            <p className="mt-3 text-xs font-light leading-relaxed text-muted-foreground sm:text-sm">
              "Neutralizing Negative Affect Skew in Low-Bandwidth Facial Emotion Recognition"
              <span className="mt-2 block text-gold">Submitted to IEEE (2026)</span>
            </p>
          </motion.div>

          <motion.div
            whileHover={{ x: 4 }}
            className="flex items-center justify-between gap-5 border border-border/50 bg-background/20 p-5"
          >
            <div>
              <div className="mb-3 flex items-center gap-3">
                <Users className="h-4 w-4 text-primary" strokeWidth={1.25} />
                <p className="eyebrow text-gold">Users</p>
              </div>
              <p className="text-sm font-light leading-relaxed text-muted-foreground">
                700+ organic visitors in 90 days, with $0 marketing spend.
              </p>
            </div>
            <motion.p
              className="editorial-heading shrink-0 text-4xl text-gold sm:text-5xl"
              animate={{ opacity: [0.78, 1, 0.78] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              700+
            </motion.p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ValidationSection;
