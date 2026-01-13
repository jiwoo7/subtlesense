import { motion } from "framer-motion";
import { Brain, Clock, Coffee, Lightbulb, Target, Zap, Sparkles } from "lucide-react";
import EmotionGauge from "./EmotionGauge";
import SuggestionCard from "./SuggestionCard";

interface AnalysisDashboardProps {
  isAnalyzed: boolean;
}

const AnalysisDashboard = ({ isAnalyzed }: AnalysisDashboardProps) => {
  if (!isAnalyzed) {
    return (
      <motion.div
        className="glass-panel rounded-3xl p-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <motion.div 
          className="w-20 h-20 rounded-2xl pastel-gradient-soft mx-auto mb-6 flex items-center justify-center"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Brain className="w-10 h-10 text-pastel-lavender" />
        </motion.div>
        <h3 className="font-display text-xl font-bold text-foreground mb-2">
          Ready When You Are! 🎯
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
          Upload a coding session and we'll help you understand your emotional patterns
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <motion.div 
            className="w-4 h-4 rounded-full bg-pastel-mint"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="text-sm font-semibold text-emerald-600">Analysis Complete! ✨</span>
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground">
          Your Emotion Profile
        </h2>
      </motion.div>

      {/* Accuracy badge */}
      <motion.div
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full card-mint"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Target className="w-4 h-4 text-emerald-600" />
        <span className="text-sm font-semibold">
          <span className="text-emerald-600">82%</span>
          <span className="text-muted-foreground ml-1">Accuracy</span>
        </span>
      </motion.div>

      {/* Emotion gauges */}
      <div className="grid grid-cols-2 gap-6">
        <EmotionGauge label="Confusion Level" value={73} color="confusion" emoji="🤔" delay={0.3} />
        <EmotionGauge label="Frustration Level" value={42} color="frustration" emoji="😤" delay={0.5} />
      </div>

      {/* Divider */}
      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-pastel-lavender to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      />

      {/* Suggestions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-pastel-yellow" />
          Personalized Tips for You
        </h3>
        
        <div className="space-y-3">
          <SuggestionCard
            icon={Coffee}
            title="Take a 2-Minute Break ☕"
            description="A short pause reduces confusion by 40% and helps restore your focus!"
            metric="-40%"
            variant="pink"
            delay={1.1}
          />
          <SuggestionCard
            icon={Lightbulb}
            title="Try a Simpler Example 💡"
            description="Breaking concepts into bite-sized pieces makes learning easier and more fun."
            variant="lavender"
            delay={1.3}
          />
          <SuggestionCard
            icon={Clock}
            title="Debug Step by Step 🔍"
            description="Use console.log to trace values — it's like being a detective in your own code!"
            variant="mint"
            delay={1.5}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default AnalysisDashboard;
