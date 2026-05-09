import { useState } from "react";
import { motion } from "framer-motion";

const PROMPTS = [
  "One person who made you smile today",
  "A small thing that brought comfort",
  "Something your body did for you",
  "A sound you enjoyed",
  "A taste you savored",
  "A moment of quiet you noticed",
  "Something you learned recently",
  "A place that feels safe",
  "A memory that warms you",
  "Something you're proud of this week",
  "A kindness you received",
  "A kindness you gave",
];

const GratitudeCards = () => {
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});
  const [cards] = useState(() => [...PROMPTS].sort(() => Math.random() - 0.5).slice(0, 6));

  return (
    <div className="p-6">
      <p className="text-center text-sm text-muted-foreground mb-4">Flip a card. Pause. Reflect.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
        {cards.map((prompt, i) => {
          const isFlipped = flipped[i];
          return (
            <motion.button
              key={i}
              onClick={() => setFlipped((f) => ({ ...f, [i]: !f[i] }))}
              className="relative aspect-[3/4] rounded-2xl preserve-3d"
              style={{ transformStyle: "preserve-3d" }}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <div
                className="absolute inset-0 rounded-2xl neon-gradient flex items-center justify-center text-primary-foreground font-display text-2xl backface-hidden"
                style={{ backfaceVisibility: "hidden" }}
              >
                ✨
              </div>
              <div
                className="absolute inset-0 rounded-2xl glass-panel flex items-center justify-center p-4 text-center text-sm font-medium"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                {prompt}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default GratitudeCards;
