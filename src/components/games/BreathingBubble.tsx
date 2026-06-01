import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Phase = "inhale" | "hold" | "exhale";
const PHASES: { name: Phase; label: string; seconds: number; scale: number }[] = [
  { name: "inhale", label: "Breathe in", seconds: 4, scale: 1.5 },
  { name: "hold", label: "Hold", seconds: 7, scale: 1.5 },
  { name: "exhale", label: "Breathe out", seconds: 8, scale: 1 },
];

const BreathingBubble = () => {
  const [running, setRunning] = useState(false);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(PHASES[0].seconds);
  const [cycles, setCycles] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;
    timerRef.current = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s > 1) return s - 1;
        setPhaseIdx((p) => {
          const next = (p + 1) % PHASES.length;
          if (next === 0) setCycles((c) => c + 1);
          return next;
        });
        return PHASES[(phaseIdx + 1) % PHASES.length].seconds;
      });
    }, 1000);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [running, phaseIdx]);

  const phase = PHASES[phaseIdx];

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-6 p-4 sm:p-6">
      <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
        <motion.div
          className="absolute w-36 h-36 sm:w-48 sm:h-48 rounded-full neon-gradient opacity-30 blur-2xl"
          animate={{ scale: running ? phase.scale : 1 }}
          transition={{ duration: phase.seconds, ease: "easeInOut" }}
        />
        <motion.div
          className="w-28 h-28 sm:w-40 sm:h-40 rounded-full neon-gradient flex items-center justify-center text-primary-foreground"
          animate={{ scale: running ? phase.scale : 1 }}
          transition={{ duration: phase.seconds, ease: "easeInOut" }}
        >
          <div className="text-center">
            <p className="font-display text-sm sm:text-xl font-bold">{running ? phase.label : "Tap start"}</p>
            {running && <p className="text-2xl sm:text-3xl font-bold mt-1">{secondsLeft}</p>}
          </div>
        </motion.div>
      </div>
      <div className="flex gap-2 sm:gap-3">
        <button
          onClick={() => {
            setRunning((r) => !r);
            if (!running) {
              setPhaseIdx(0);
              setSecondsLeft(PHASES[0].seconds);
            }
          }}
          className="px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-base rounded-full neon-gradient text-primary-foreground font-semibold"
        >
          {running ? "Pause" : "Start 4-7-8"}
        </button>
        <button
          onClick={() => {
            setRunning(false);
            setPhaseIdx(0);
            setSecondsLeft(PHASES[0].seconds);
            setCycles(0);
          }}
          className="px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-base rounded-full glass-panel font-semibold"
        >
          Reset
        </button>
      </div>
      <p className="text-xs sm:text-sm text-muted-foreground">Cycles completed: {cycles}</p>
    </div>
  );
};

export default BreathingBubble;
