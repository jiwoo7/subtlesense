import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircleQuestion, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface ExitPollProps {
  isVisible: boolean;
  sessionId?: string;
  onDismiss: () => void;
}

const MISSED_EMOTIONS = [
  { label: "Nostalgia", emoji: "🥹" },
  { label: "Hope", emoji: "🌱" },
  { label: "Shame", emoji: "😶" },
  { label: "Jealousy", emoji: "💚" },
  { label: "Pride", emoji: "🦁" },
  { label: "Boredom", emoji: "😑" },
  { label: "Gratitude", emoji: "🙏" },
  { label: "Confusion", emoji: "😵‍💫" },
  { label: "Relief", emoji: "😮‍💨" },
  { label: "Excitement", emoji: "🤩" },
  { label: "Grief", emoji: "🖤" },
  { label: "Love", emoji: "💗" },
];

const ExitPoll = ({ isVisible, sessionId, onDismiss }: ExitPollProps) => {
  const { user } = useAuth();
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = async (emotion: string) => {
    setSelected(emotion);

    if (user) {
      try {
        await supabase.from("feedbacks").insert({
          user_id: user.id,
          session_id: sessionId || null,
          feedback_text: `Missed emotion: ${emotion}`,
          rating: null,
        });
      } catch (e) {
        console.error("Failed to save exit poll:", e);
      }
    }

    setSubmitted(true);
    toast.success(`Thanks! We'll work on detecting ${emotion} 💜`);
    setTimeout(onDismiss, 2000);
  };

  return (
    <AnimatePresence>
      {isVisible && !submitted && (
        <motion.div
          className="glass-panel rounded-2xl p-5 border border-accent/30"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <MessageCircleQuestion className="w-5 h-5 text-primary" />
            <h4 className="font-display font-bold text-foreground text-sm">
              What emotion did we miss?
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {MISSED_EMOTIONS.map((e) => (
              <motion.button
                key={e.label}
                onClick={() => handleSelect(e.label)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  selected === e.label
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted/50 text-foreground border-border hover:bg-accent hover:border-accent"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {e.emoji} {e.label}
              </motion.button>
            ))}
          </div>
          <button
            onClick={onDismiss}
            className="mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            None — you got them all! ✨
          </button>
        </motion.div>
      )}
      {isVisible && submitted && (
        <motion.div
          className="glass-panel rounded-2xl p-5 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
        >
          <Check className="w-8 h-8 text-primary mx-auto mb-2" />
          <p className="text-sm font-medium text-foreground">Noted! Thanks for helping us improve 💜</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitPoll;
