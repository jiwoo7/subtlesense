import { motion } from "framer-motion";
import { Brain, Target, Sparkles, Coffee, Lightbulb, Clock, Focus, Headphones, Activity, Music } from "lucide-react";
import EmotionGauge from "./EmotionGauge";
import type { AnalysisResult } from "@/pages/Dashboard";

interface RealAnalysisDashboardProps {
  isAnalyzed: boolean;
  analysisResult: AnalysisResult | null;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  coffee: Coffee,
  lightbulb: Lightbulb,
  focus: Focus,
  timer: Clock,
  stretch: Activity,
  music: Music,
  headphones: Headphones
};

const variantColors: Record<string, string> = {
  pink: "card-pink",
  lavender: "card-lavender",
  mint: "card-mint",
  sky: "card-sky",
  yellow: "card-yellow"
};

const getTypeLabel = (type: string | null) => {
  switch (type) {
    case "webcam": return "Webcam Analysis";
    case "audio": return "Audio Analysis";
    case "video": return "Video Analysis";
    default: return "Session";
  }
};

const getTypeEmoji = (type: string | null) => {
  switch (type) {
    case "webcam": return "📸";
    case "audio": return "🎙️";
    case "video": return "🎬";
    default: return "📊";
  }
};

const RealAnalysisDashboard = ({ isAnalyzed, analysisResult }: RealAnalysisDashboardProps) => {
  if (!isAnalyzed || !analysisResult) {
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
          Choose an input method and our AI will analyze your emotional state in real-time
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
          <span className="text-sm font-semibold text-emerald-600">
            {getTypeEmoji(analysisResult.uploadType)} {getTypeLabel(analysisResult.uploadType)} Complete! ✨
          </span>
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
          <span className="text-emerald-600">{analysisResult.accuracy}%</span>
          <span className="text-muted-foreground ml-1">AI Confidence</span>
        </span>
      </motion.div>

      {/* Emotion gauges */}
      <div className="grid grid-cols-2 gap-6">
        <EmotionGauge 
          label="Confusion Level" 
          value={Math.min(100, analysisResult.confusion)} 
          color="confusion" 
          emoji="🤔" 
          delay={0.3} 
        />
        <EmotionGauge 
          label="Frustration Level" 
          value={Math.min(100, analysisResult.frustration)} 
          color="frustration" 
          emoji="😤" 
          delay={0.5} 
        />
      </div>

      {/* Focus gauge */}
      <EmotionGauge 
        label="Focus Level" 
        value={Math.min(100, analysisResult.focus)} 
        color="focus" 
        emoji="🎯" 
        delay={0.7} 
      />

      {/* AI Advice */}
      {analysisResult.advice && (
        <motion.div
          className="glass-panel rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <h3 className="font-display text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <Brain className="w-5 h-5 text-pastel-lavender" />
            AI Insight
          </h3>
          <p className="text-muted-foreground leading-relaxed">{analysisResult.advice}</p>
        </motion.div>
      )}

      {/* Divider */}
      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-pastel-lavender to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      />

      {/* Suggestions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.1 }}
      >
        <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-pastel-yellow" />
          Personalized Tips for You
        </h3>
        
        <div className="space-y-3">
          {analysisResult.suggestions?.map((suggestion, index) => {
            const IconComponent = iconMap[suggestion.icon] || Lightbulb;
            const colorClass = variantColors[suggestion.variant] || "card-lavender";
            
            return (
              <motion.div
                key={index}
                className={`${colorClass} rounded-xl p-4 flex items-start gap-4`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + index * 0.15 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-10 h-10 rounded-xl bg-white/50 flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-foreground text-sm">
                    {suggestion.title}
                  </h4>
                  <p className="text-muted-foreground text-xs mt-1">
                    {suggestion.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default RealAnalysisDashboard;
