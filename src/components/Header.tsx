import { motion } from "framer-motion";
import { Heart, Sparkles, Star } from "lucide-react";

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
        <div className="flex items-center gap-4">
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Animated logo container */}
            <div className="relative w-14 h-14 rounded-2xl pastel-gradient flex items-center justify-center shadow-lg">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart className="w-7 h-7 text-white fill-white" />
              </motion.div>
              
              {/* Sparkle decorations */}
              <motion.div
                className="absolute -top-1 -right-1"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Sparkles className="w-4 h-4 text-pastel-yellow" />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-1 -left-1"
                animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Star className="w-3 h-3 text-pastel-pink fill-pastel-pink" />
              </motion.div>
            </div>
          </motion.div>
          
          <div>
            <h1 className="font-display text-3xl font-extrabold gradient-text">
              Subtle Sense
            </h1>
            <p className="text-sm text-muted-foreground font-medium tracking-wide">
              Your Friendly Learning Companion ✨
            </p>
          </div>
        </div>

        {/* Status indicator */}
        <motion.div
          className="flex items-center gap-2 px-4 py-2.5 rounded-full glass-panel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            className="w-3 h-3 rounded-full bg-pastel-mint"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
          <span className="text-sm font-semibold text-foreground">
            Ready to Help! 💪
          </span>
        </motion.div>
      </div>

      {/* Tagline */}
      <motion.p
        className="mt-6 text-xl text-muted-foreground max-w-2xl leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        We understand how you feel when coding gets tough. Let us help you 
        <span className="text-pastel-pink font-semibold"> overcome frustration</span> and 
        <span className="text-pastel-lavender font-semibold"> embrace clarity</span> 🌟
      </motion.p>
    </motion.header>
  );
};

export default Header;
