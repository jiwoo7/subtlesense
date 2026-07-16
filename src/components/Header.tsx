import { motion } from "framer-motion";
import logoUrl from "@/assets/subtle-sense-logo.png";

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
            <div className="relative w-14 h-14 rounded-2xl bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center shadow-lg overflow-hidden">
              <motion.img
                src={logoUrl}
                alt="Subtle Sense"
                className="w-10 h-10 object-contain"
                animate={{ rotate: [0, 4, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
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
