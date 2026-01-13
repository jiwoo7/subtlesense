import { motion } from "framer-motion";

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      
      {/* Scan line effect */}
      <div className="absolute inset-0 scan-line" />
      
      {/* Floating orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-primary/10 blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ top: "10%", left: "10%" }}
      />
      
      <motion.div
        className="absolute w-80 h-80 rounded-full bg-secondary/10 blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 80, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ top: "50%", right: "10%" }}
      />
      
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-accent/5 blur-3xl"
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ bottom: "20%", left: "30%" }}
      />
      
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-primary/30" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-primary/30" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-primary/30" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-primary/30" />
    </div>
  );
};

export default AnimatedBackground;
