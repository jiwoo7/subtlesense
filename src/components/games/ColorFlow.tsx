import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = [
  { name: "pink", hsl: "330 90% 60%" },
  { name: "purple", hsl: "280 80% 60%" },
  { name: "teal", hsl: "175 70% 50%" },
  { name: "amber", hsl: "30 90% 55%" },
];

const ColorFlow = () => {
  const [target, setTarget] = useState(COLORS[0]);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(30);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    if (time <= 0) {
      setRunning(false);
      return;
    }
    const t = setTimeout(() => setTime((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [running, time]);

  const next = () => setTarget(COLORS[Math.floor(Math.random() * COLORS.length)]);

  const handleTap = (c: typeof COLORS[number]) => {
    if (!running) return;
    if (c.name === target.name) {
      setScore((s) => s + 1);
      next();
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <div className="text-center">
        <p className="text-sm text-muted-foreground">Tap the color shown</p>
        <AnimatePresence mode="wait">
          <motion.p
            key={target.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="font-display text-4xl font-bold mt-2 capitalize"
            style={{ color: `hsl(${target.hsl})` }}
          >
            {target.name}
          </motion.p>
        </AnimatePresence>
      </div>
      <div className="grid grid-cols-2 gap-4 w-72">
        {COLORS.map((c) => (
          <motion.button
            key={c.name}
            whileTap={{ scale: 0.92 }}
            onClick={() => handleTap(c)}
            className="aspect-square rounded-3xl shadow-lg"
            style={{ background: `hsl(${c.hsl})` }}
            aria-label={c.name}
          />
        ))}
      </div>
      <div className="flex items-center gap-6">
        <p className="font-display"><span className="text-muted-foreground text-sm">Score</span> <span className="text-2xl font-bold">{score}</span></p>
        <p className="font-display"><span className="text-muted-foreground text-sm">Time</span> <span className="text-2xl font-bold">{time}s</span></p>
      </div>
      <button
        onClick={() => {
          setScore(0);
          setTime(30);
          setRunning(true);
          next();
        }}
        className="px-6 py-2 rounded-full neon-gradient text-primary-foreground font-semibold"
      >
        {running ? "Playing..." : score > 0 ? "Play again" : "Start"}
      </button>
    </div>
  );
};

export default ColorFlow;
