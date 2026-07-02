import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const COLORS = [
  { name: "cherry", hsl: "350 85% 55%" },   // richer red
  { name: "emerald", hsl: "160 70% 45%" },  // more alive green
  { name: "silver", hsl: "210 15% 75%" },   // actual metallic feel
  { name: "amber", hsl: "40 95% 60%" },     // punchy gold
];

const ColorFlow: React.FC = () => {
const [target, setTarget] = useState(COLORS);
const [score, setScore] = useState(0);
const [time, setTime] = useState(30);
const [running, setRunning] = useState(false);
const confettiTimeoutRef = useRef<number | null>(null);

useEffect(() => {
if (!running) return;
if (time <= 0) {
setRunning(false);
return;
}
const t = window.setTimeout(() => setTime((s) => s - 1), 1000);
return () => clearTimeout(t);
}, [running, time]);

const next = () =>
setTarget(COLORS[Math.floor(Math.random() * COLORS.length)]);

const quietConfetti = (colorHsl: string) => {
// base color fall — low particle count + gentle gravity for quiet fall
confetti({
particleCount: 18,
angle: 90,
spread: 40,
startVelocity: 20,
ticks: 120,
gravity: 0.25,
origin: { x: Math.random() * 0.6 + 0.2, y: 0 }, // spawn somewhere across top
colors: [hsl(${colorHsl})],
});
// small trailing sparkles (very subtle)
confetti({
particleCount: 6,
angle: 90,
spread: 60,
startVelocity: 8,
ticks: 90,
gravity: 0.15,
origin: { x: Math.random() * 0.6 + 0.2, y: 0 },
colors: ["#ffffff", "#ffffff20"],
});
// clear old timeout if any
if (confettiTimeoutRef.current) {
window.clearTimeout(confettiTimeoutRef.current);
confettiTimeoutRef.current = null;
}
// tiny delayed second pass to make it feel like falling pieces
confettiTimeoutRef.current = window.setTimeout(() => {
confetti({
particleCount: 10,
angle: 90,
spread: 50,
startVelocity: 6,
ticks: 140,
gravity: 0.18,
origin: { x: Math.random() * 0.6 + 0.2, y: 0 },
colors: [hsl(${colorHsl})],
});
}, 160);
};

const handleTap = (c: typeof COLORS[number]) => {
if (!running) return;
if (c.name === target.name) {
setScore((s) => s + 1);
// trigger quiet confetti using the tapped color's HSL string
// c.hsl is like "330 90% 60%" — canvas-confetti accepts CSS color strings like hsl(330 90% 60%)
quietConfetti(c.hsl);
next();
}
};

useEffect(() => {
return () => {
if (confettiTimeoutRef.current) window.clearTimeout(confettiTimeoutRef.current);
};
}, []);

return (
<div className="flex flex-col items-center gap-4 sm:gap-6 p-4 sm:p-6">
<div className="text-center">
<p className="text-xs sm:text-sm text-muted-foreground">Tap the color shown</p>
<AnimatePresence mode="wait">
<motion.p
key={target.name}
initial={{ opacity: 0, y: 10 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -10 }}
className="font-display text-2xl sm:text-4xl font-bold mt-1 sm:mt-2 capitalize"
style={{
  color: `hsl(${target.hsl})`,
  textShadow: "0 2px 10px rgba(0,0,0,0.2)"
}}
>
{target.name}
</motion.p>
</AnimatePresence>
</div>

<div className="grid grid-cols-2 gap-3 sm:gap-4 w-56 sm:w-72">
{COLORS.map((c) => (
<motion.button
key={c.name}
whileTap={{ scale: 0.92 }}
onClick={() => handleTap(c)}
className="aspect-square rounded-2xl sm:rounded-3xl shadow-lg"
style={{
  background: `radial-gradient(circle at 30% 30%, hsl(${c.hsl}), hsl(${c.hsl} / 0.6))`
}}
aria-label={c.name}
// subtle hover/focus animation
whileHover={{ scale: 1.03 }}
transition={{ type: "spring", stiffness: 300, damping: 20 }}
/>
))}
</div>

<div className="flex items-center gap-4 sm:gap-6">
<p className="font-display">
<span className="text-muted-foreground text-xs sm:text-sm">Score</span>{" "}
<span className="text-lg sm:text-2xl font-bold ml-1">{score}</span>
</p>
<p className="font-display">
<span className="text-muted-foreground text-xs sm:text-sm">Time</span>{" "}
<span className="text-lg sm:text-2xl font-bold ml-1">{time}s</span>
</p>
</div>

<button
onClick={() => {
setScore(0);
setTime(30);
setRunning(true);
next();
}}
className="px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-base rounded-full neon-gradient text-primary-foreground font-semibold"
>
{running ? "Playing..." : score > 0 ? "Play again" : "Start"}
</button>
</div>
);
};

export default ColorFlow;

