import { motion } from "framer-motion";

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Dark gradient base */}
      <div className="absolute inset-0 bubble-bg" />
      
      {/* Floating neon shapes */}
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-neon-pink/20 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ top: "5%", left: "5%" }}
      />
      
      <motion.div
        className="absolute w-80 h-80 rounded-full bg-neon-purple/20 blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ top: "40%", right: "5%" }}
      />
      
      <motion.div
        className="absolute w-72 h-72 rounded-full bg-neon-red/15 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ bottom: "10%", left: "20%" }}
      />

      <motion.div
        className="absolute w-56 h-56 rounded-full bg-neon-magenta/20 blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ top: "20%", left: "50%" }}
      />

      <motion.div
        className="absolute w-48 h-48 rounded-full bg-neon-violet/20 blur-3xl"
        animate={{
          x: [0, 20, 0],
          y: [0, -25, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ bottom: "30%", right: "15%" }}
      />

      {/* Decorative floating elements with neon glow */}
      <motion.div
        className="absolute w-8 h-8 rounded-full bg-neon-pink/40"
        animate={{ y: [0, -30, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: "15%", left: "15%" }}
      />
      
      <motion.div
        className="absolute w-6 h-6 rounded-lg bg-neon-purple/40 rotate-45"
        animate={{ y: [0, -20, 0], rotate: [45, 135, 45] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: "60%", left: "80%" }}
      />
      
      <motion.div
        className="absolute w-5 h-5 rounded-full bg-neon-red/50"
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: "75%", left: "10%" }}
      />

      <motion.div
        className="absolute w-4 h-4 rounded-full bg-neon-magenta/50"
        animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: "30%", right: "25%" }}
      />
    </div>
  );
};

export default AnimatedBackground;