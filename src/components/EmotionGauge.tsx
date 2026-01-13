import { motion } from "framer-motion";

interface EmotionGaugeProps {
  label: string;
  value: number;
  color: "confusion" | "frustration" | "primary" | "success" | "focus";
  emoji: string;
  delay?: number;
}

const colorMap = {
  confusion: {
    stroke: "hsl(200, 70%, 70%)",
    bg: "hsla(200, 70%, 70%, 0.2)",
  },
  frustration: {
    stroke: "hsl(25, 80%, 70%)",
    bg: "hsla(25, 80%, 70%, 0.2)",
  },
  primary: {
    stroke: "hsl(330, 70%, 75%)",
    bg: "hsla(330, 70%, 75%, 0.2)",
  },
  success: {
    stroke: "hsl(160, 55%, 70%)",
    bg: "hsla(160, 55%, 70%, 0.2)",
  },
  focus: {
    stroke: "hsl(270, 60%, 75%)",
    bg: "hsla(270, 60%, 75%, 0.2)",
  },
};

const EmotionGauge = ({ label, value, color, emoji, delay = 0 }: EmotionGaugeProps) => {
  const radius = 55;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;
  const colors = colorMap[color];

  return (
    <motion.div
      className="flex flex-col items-center gap-3"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="relative w-36 h-36">
        {/* Background glow */}
        <div 
          className="absolute inset-2 rounded-full blur-xl opacity-50"
          style={{ background: colors.bg }}
        />
        
        {/* Background circle */}
        <svg className="w-full h-full -rotate-90" viewBox="0 0 130 130">
          <circle
            cx="65"
            cy="65"
            r={radius}
            fill="white"
            stroke="hsl(270, 30%, 92%)"
            strokeWidth="10"
          />
          <motion.circle
            cx="65"
            cy="65"
            r={radius}
            fill="none"
            stroke={colors.stroke}
            strokeWidth="10"
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
            className="text-3xl"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.5, type: "spring" }}
          >
            {emoji}
          </motion.span>
          <motion.span
            className="text-2xl font-display font-bold text-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.8 }}
          >
            {value}%
          </motion.span>
        </div>
      </div>
      
      <span className="text-sm font-semibold text-muted-foreground">
        {label}
      </span>
    </motion.div>
  );
};

export default EmotionGauge;
