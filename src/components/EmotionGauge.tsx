import { motion } from "framer-motion";

interface EmotionGaugeProps {
  label: string;
  value: number;
  color: "confusion" | "frustration" | "primary" | "success";
  delay?: number;
}

const colorMap = {
  confusion: {
    stroke: "hsl(200, 100%, 60%)",
    glow: "hsla(200, 100%, 60%, 0.4)",
  },
  frustration: {
    stroke: "hsl(25, 95%, 53%)",
    glow: "hsla(25, 95%, 53%, 0.4)",
  },
  primary: {
    stroke: "hsl(180, 100%, 50%)",
    glow: "hsla(180, 100%, 50%, 0.4)",
  },
  success: {
    stroke: "hsl(160, 84%, 39%)",
    glow: "hsla(160, 84%, 39%, 0.4)",
  },
};

const EmotionGauge = ({ label, value, color, delay = 0 }: EmotionGaugeProps) => {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;
  const colors = colorMap[color];

  return (
    <motion.div
      className="flex flex-col items-center gap-4"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="relative w-40 h-40">
        {/* Background circle */}
        <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="hsl(222, 30%, 15%)"
            strokeWidth="8"
          />
          <motion.circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke={colors.stroke}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, delay: delay + 0.3, ease: "easeOut" }}
            style={{
              filter: `drop-shadow(0 0 10px ${colors.glow})`,
            }}
          />
        </svg>
        
        {/* Center value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-3xl font-display font-bold"
            style={{ color: colors.stroke }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.8 }}
          >
            {value}%
          </motion.span>
        </div>
        
        {/* Glow effect */}
        <motion.div
          className="absolute inset-4 rounded-full"
          style={{
            background: `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)`,
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      
      <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
    </motion.div>
  );
};

export default EmotionGauge;
