import { motion } from "framer-motion";
import { Brain, Sparkles } from "lucide-react";

const Header = () => {
  return (
    <motion.header
      className="relative py-8"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <motion.div
            className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
            whileHover={{ rotate: 5, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Brain className="w-6 h-6 text-primary-foreground" />
            <motion.div
              className="absolute inset-0 rounded-xl bg-primary/30"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </motion.div>
          <div>
            <h1 className="font-display text-2xl font-bold gradient-text">
              EmotionAI
            </h1>
            <p className="text-xs text-muted-foreground tracking-wider uppercase">
              Cognitive Tutor
            </p>
          </div>
        </div>

        {/* Status indicator */}
        <motion.div
          className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
          </motion.div>
          <span className="text-sm font-medium text-muted-foreground">
            AI Ready
          </span>
        </motion.div>
      </div>

      {/* Tagline */}
      <motion.p
        className="mt-6 text-lg text-muted-foreground max-w-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Real-time emotion detection that flags when learners hit cognitive walls during coding sessions
      </motion.p>
    </motion.header>
  );
};

export default Header;
