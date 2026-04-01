import { motion } from "framer-motion";
import { Wind, Music, BookOpen, Dumbbell, Heart, Coffee, Sparkles } from "lucide-react";
import type { AnalysisResult } from "@/types/emotions";

interface MoodRecommendationsProps {
  analysisResult: AnalysisResult | null;
}

interface Recommendation {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  type: "breathing" | "activity" | "music" | "reading";
  gradient: string;
}

const getRecommendations = (result: AnalysisResult): Recommendation[] => {
  const recs: Recommendation[] = [];

  if (result.hiddenAnxiety > 40) {
    recs.push({
      icon: Wind,
      title: "4-7-8 Breathing 🌬️",
      description: "Inhale 4s, hold 7s, exhale 8s. Repeat 3 times to calm your nervous system.",
      type: "breathing",
      gradient: "from-neon-purple/20 to-neon-violet/10",
    });
  }

  if (result.suppressedAnger > 40) {
    recs.push({
      icon: Dumbbell,
      title: "Physical Release 💪",
      description: "Try 5 minutes of intense exercise — pushups, jumping jacks, or a brisk walk to release tension.",
      type: "activity",
      gradient: "from-neon-red/20 to-neon-pink/10",
    });
  }

  if (result.emotionalMasking > 50) {
    recs.push({
      icon: BookOpen,
      title: "Journaling Prompt ✍️",
      description: "Write: 'Right now I'm pretending to feel ___ but actually I feel ___'. No judgment.",
      type: "reading",
      gradient: "from-neon-magenta/20 to-neon-purple/10",
    });
  }

  if (result.innerConflict > 50) {
    recs.push({
      icon: Music,
      title: "Binaural Beats 🎧",
      description: "Listen to alpha-wave (8-12Hz) binaural beats for 10 minutes to reduce inner tension.",
      type: "music",
      gradient: "from-neon-pink/20 to-neon-magenta/10",
    });
  }

  // Always add a calming rec
  recs.push({
    icon: Heart,
    title: "Self-Compassion Pause 💜",
    description: "Place your hand on your heart. Say: 'This is a moment of difficulty. I deserve kindness.'",
    type: "breathing",
    gradient: "from-primary/20 to-neon-purple/10",
  });

  if (result.hiddenAnxiety < 30 && result.suppressedAnger < 30) {
    recs.push({
      icon: Coffee,
      title: "Celebrate This Moment ☕",
      description: "Your emotional state looks balanced! Savor a mindful cup of tea or coffee.",
      type: "activity",
      gradient: "from-success/20 to-success/5",
    });
  }

  return recs.slice(0, 4);
};

const MoodRecommendations = ({ analysisResult }: MoodRecommendationsProps) => {
  if (!analysisResult) return null;

  const recommendations = getRecommendations(analysisResult);

  return (
    <motion.div
      className="mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-primary" />
        <h3 className="font-display text-lg font-bold text-foreground">
          Personalized Recommendations 🎯
        </h3>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {recommendations.map((rec, index) => (
          <motion.div
            key={index}
            className={`glass-panel rounded-xl p-4 bg-gradient-to-br ${rec.gradient} border border-border/50`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3 + index * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-card/80 flex items-center justify-center flex-shrink-0">
                <rec.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="min-w-0">
                <h4 className="font-display font-bold text-sm text-foreground mb-1">
                  {rec.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {rec.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MoodRecommendations;
