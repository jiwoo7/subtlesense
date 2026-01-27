import { motion } from "framer-motion";
import { Brain, Target, Sparkles, Coffee, Lightbulb, Clock, Focus, Headphones, Activity, Music, Heart, Star, Shield, Eye, Unlock } from "lucide-react";
import EmotionGauge from "./EmotionGauge";
import type { AnalysisResult } from "@/types/emotions";
import { SURFACE_EMOTIONS, HIDDEN_EMOTIONS, SUPPRESSED_EMOTIONS, META_EMOTIONS } from "@/types/emotions";

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
  headphones: Headphones,
  heart: Heart,
  star: Star,
  sparkles: Sparkles,
  shield: Shield,
  eye: Eye,
  unlock: Unlock,
};

const variantColors: Record<string, string> = {
  pink: "card-pink",
  lavender: "card-lavender",
  mint: "card-mint",
  sky: "card-sky",
  yellow: "card-yellow",
  peach: "bg-orange-500/20 border border-orange-500/30",
  rose: "bg-rose-500/20 border border-rose-500/30",
  purple: "bg-purple-500/20 border border-purple-500/30",
  red: "bg-red-500/20 border border-red-500/30",
};

const getTypeLabel = (type: string | null) => {
  switch (type) {
    case "webcam": return "Deep Webcam Analysis";
    case "audio": return "Deep Audio Analysis";
    case "video": return "Deep Video Analysis";
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
          <Brain className="w-10 h-10 text-neon-purple" />
        </motion.div>
        <h3 className="font-display text-xl font-bold text-foreground mb-2">
          Ready for Deep Analysis! 🔮
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
          Our AI detects hidden & suppressed emotions beyond the surface
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6 max-h-[80vh] overflow-y-auto pr-2">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <motion.div 
            className="w-4 h-4 rounded-full bg-neon-pink"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="text-sm font-semibold text-neon-pink">
            {getTypeEmoji(analysisResult.uploadType)} {getTypeLabel(analysisResult.uploadType)} Complete! ✨
          </span>
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground">
          Your Deep Emotion Profile
        </h2>
      </motion.div>

      {/* Accuracy badge */}
      <motion.div
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-purple/20 border border-neon-purple/30"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Target className="w-4 h-4 text-neon-purple" />
        <span className="text-sm font-semibold">
          <span className="text-neon-purple">{analysisResult.accuracy}%</span>
          <span className="text-muted-foreground ml-1">AI Confidence</span>
        </span>
      </motion.div>

      {/* Surface Emotions */}
      <motion.div
        className="glass-panel rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Eye className="w-5 h-5 text-neon-pink" />
          Surface Emotions
          <span className="text-xs font-normal text-muted-foreground">(What you show)</span>
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {SURFACE_EMOTIONS.map((emotion, index) => (
            <EmotionGauge
              key={emotion.key}
              label={emotion.label}
              value={Math.min(100, (analysisResult[emotion.key] as number) || 0)}
              color={emotion.color}
              emoji={emotion.emoji}
              delay={0.3 + index * 0.1}
              size="sm"
            />
          ))}
        </div>
      </motion.div>

      {/* Hidden Emotions */}
      <motion.div
        className="glass-panel rounded-2xl p-6 border-2 border-neon-purple/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-neon-purple" />
          Hidden Emotions
          <span className="text-xs font-normal text-muted-foreground">(What you feel but don't show)</span>
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {HIDDEN_EMOTIONS.map((emotion, index) => (
            <EmotionGauge
              key={emotion.key}
              label={emotion.label}
              value={Math.min(100, (analysisResult[emotion.key] as number) || 0)}
              color={emotion.color}
              emoji={emotion.emoji}
              delay={0.5 + index * 0.1}
              size="sm"
            />
          ))}
        </div>
      </motion.div>

      {/* Suppressed Emotions */}
      <motion.div
        className="glass-panel rounded-2xl p-6 border-2 border-neon-red/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Unlock className="w-5 h-5 text-neon-red" />
          Suppressed Emotions
          <span className="text-xs font-normal text-muted-foreground">(What you're holding back)</span>
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {SUPPRESSED_EMOTIONS.map((emotion, index) => (
            <EmotionGauge
              key={emotion.key}
              label={emotion.label}
              value={Math.min(100, (analysisResult[emotion.key] as number) || 0)}
              color={emotion.color}
              emoji={emotion.emoji}
              delay={0.7 + index * 0.1}
              size="sm"
            />
          ))}
        </div>
      </motion.div>

      {/* Meta Emotional States */}
      <motion.div
        className="glass-panel rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-neon-pink" />
          Emotional Awareness
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {META_EMOTIONS.map((emotion, index) => (
            <EmotionGauge
              key={emotion.key}
              label={emotion.label}
              value={Math.min(100, (analysisResult[emotion.key] as number) || 0)}
              color={emotion.color}
              emoji={emotion.emoji}
              delay={0.9 + index * 0.1}
              size="sm"
            />
          ))}
        </div>
      </motion.div>

      {/* Deep Insight */}
      {analysisResult.deepInsight && (
        <motion.div
          className="glass-panel rounded-2xl p-6 border-2 border-neon-purple/50 bg-gradient-to-br from-neon-purple/10 to-neon-pink/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <h3 className="font-display text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-neon-purple" />
            Deep Insight 🔮
          </h3>
          <p className="text-muted-foreground leading-relaxed italic">{analysisResult.deepInsight}</p>
        </motion.div>
      )}

      {/* AI Advice */}
      {analysisResult.advice && (
        <motion.div
          className="glass-panel rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <h3 className="font-display text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <Heart className="w-5 h-5 text-neon-pink" />
            AI Insight
          </h3>
          <p className="text-muted-foreground leading-relaxed">{analysisResult.advice}</p>
        </motion.div>
      )}

      {/* Divider */}
      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-neon-purple to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      />

      {/* Suggestions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-neon-pink" />
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
                transition={{ delay: 1.6 + index * 0.15 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-10 h-10 rounded-xl bg-background/50 flex items-center justify-center flex-shrink-0">
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
