import { motion } from "framer-motion";

interface EmotionGaugeProps {
  label: string;
  value: number;
  color: "happiness" | "sadness" | "anger" | "fear" | "surprise" | "disgust" | "confusion" | "focus" | "excitement";
  emoji: string;
  delay?: number;
  size?: "sm" | "md";
}

const colorMap = {
  happiness: {
    stroke: "hsl(50, 85%, 60%)",
    bg: "hsla(50, 85%, 60%, 0.2)",
  },
  sadness: {
    stroke: "hsl(220, 65%, 65%)",
    bg: "hsla(220, 65%, 65%, 0.2)",
  },
  anger: {
    stroke: "hsl(0, 70%, 60%)",
    bg: "hsla(0, 70%, 60%, 0.2)",
  },
  fear: {
    stroke: "hsl(280, 60%, 65%)",
    bg: "hsla(280, 60%, 65%, 0.2)",
  },
  surprise: {
    stroke: "hsl(35, 90%, 60%)",
    bg: "hsla(35, 90%, 60%, 0.2)",
  },
  disgust: {
    stroke: "hsl(90, 50%, 50%)",
    bg: "hsla(90, 50%, 50%, 0.2)",
  },
  confusion: {
    stroke: "hsl(200, 70%, 70%)",
    bg: "hsla(200, 70%, 70%, 0.2)",
  },
  focus: {
    stroke: "hsl(270, 60%, 75%)",
    bg: "hsla(270, 60%, 75%, 0.2)",
  },
  excitement: {
    stroke: "hsl(330, 75%, 65%)",
    bg: "hsla(330, 75%, 65%, 0.2)",
  },
};

const EmotionGauge = ({ label, value, color, emoji, delay = 0, size = "md" }: EmotionGaugeProps) => {
  const isSm = size === "sm";
  const radius = isSm ? 35 : 55;
  const viewBox = isSm ? "0 0 85 85" : "0 0 130 130";
  const center = isSm ? 42.5 : 65;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;
  const colors = colorMap[color];

  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
    >
      <div className={`relative ${isSm ? "w-20 h-20" : "w-36 h-36"}`}>
        {/* Background glow */}
        <div 
          className="absolute inset-2 rounded-full blur-xl opacity-50"
          style={{ background: colors.bg }}
        />
        
        {/* Background circle */}
        <svg className="w-full h-full -rotate-90" viewBox={viewBox}>
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="white"
            stroke="hsl(270, 30%, 92%)"
            strokeWidth={isSm ? 6 : 10}
          />
          <motion.circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={colors.stroke}
            strokeWidth={isSm ? 6 : 10}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, delay: delay + 0.3, ease: "easeOut" }}
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className={isSm ? "text-lg" : "text-3xl"}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.5, type: "spring" }}
          >
            {emoji}
          </motion.span>
          <motion.span
            className={`font-display font-bold text-foreground ${isSm ? "text-sm" : "text-2xl"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.8 }}
          >
            {value}%
          </motion.span>
        </div>
      </div>
      
      <span className={`font-semibold text-muted-foreground text-center ${isSm ? "text-xs" : "text-sm"}`}>
        {label}
      </span>
    </motion.div>
  );
};

export default EmotionGauge;
