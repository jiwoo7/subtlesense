import { Flame } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  current: number;
  longest: number;
  compact?: boolean;
}

const StreakBadge = ({ current, longest, compact }: Props) => {
  if (current === 0 && longest === 0) return null;

  const intensity = Math.min(current / 7, 1); // 0-1 across a week
  const flameSize = compact ? "w-3.5 h-3.5" : "w-4 h-4";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel border border-warning/30 ${compact ? "text-xs" : "text-sm"}`}
      title={`${current}-day streak · longest ${longest}`}
    >
      <motion.span
        animate={{
          scale: current > 0 ? [1, 1.15, 1] : 1,
          filter: `drop-shadow(0 0 ${4 + intensity * 8}px hsl(var(--warning)))`,
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="inline-flex"
      >
        <Flame className={`${flameSize} text-warning fill-warning/40`} />
      </motion.span>
      <span className="font-bold">{current}</span>
      <span className="text-muted-foreground">day{current === 1 ? "" : "s"}</span>
    </motion.div>
  );
};

export default StreakBadge;
