import { motion } from "framer-motion";
import { Brain, Clock, Coffee, Lightbulb, Target, Zap } from "lucide-react";
import EmotionGauge from "./EmotionGauge";
import SuggestionCard from "./SuggestionCard";

interface AnalysisDashboardProps {
  isAnalyzed: boolean;
}

const AnalysisDashboard = ({ isAnalyzed }: AnalysisDashboardProps) => {
  if (!isAnalyzed) {
    return (
      <motion.div
        className="glass-panel rounded-2xl p-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-6 flex items-center justify-center">
          <Brain className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="font-display text-xl font-semibold text-muted-foreground mb-2">
          Awaiting Analysis
        </h3>
        <p className="text-sm text-muted-foreground/70">
          Upload a coding session to begin emotion detection
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
          <span className="text-sm font-medium text-success">Analysis Complete</span>
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground">
          Session Emotion Profile
        </h2>
      </motion.div>

      {/* Accuracy badge */}
      <motion.div
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-primary/30"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Target className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium">
          <span className="text-primary">82%</span>
          <span className="text-muted-foreground ml-1">Detection Accuracy</span>
        </span>
      </motion.div>

      {/* Emotion gauges */}
      <div className="grid grid-cols-2 gap-8">
        <EmotionGauge label="Confusion" value={73} color="confusion" delay={0.3} />
        <EmotionGauge label="Frustration" value={42} color="frustration" delay={0.5} />
      </div>

      {/* Divider */}
      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-border to-transparent"
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
        <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          Personalized Interventions
        </h3>
        
        <div className="space-y-4">
          <SuggestionCard
            icon={Coffee}
            title="Take a 2-Minute Break"
            description="A short pause has been proven to reduce confusion by 40% and restore focus."
            metric="-40% confusion"
            variant="primary"
            delay={1.1}
          />
          <SuggestionCard
            icon={Lightbulb}
            title="Try a Simpler Example"
            description="Breaking down the concept with basic examples can help solidify understanding."
            variant="secondary"
            delay={1.3}
          />
          <SuggestionCard
            icon={Clock}
            title="Debugging Strategy"
            description="Use console.log to trace variable values step by step through your code."
            variant="success"
            delay={1.5}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default AnalysisDashboard;
