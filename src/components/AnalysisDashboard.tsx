import { motion } from "framer-motion";
import { Brain, Clock, Coffee, Lightbulb, Target, Sparkles, Headphones, Video, Camera, Shield, Eye, Unlock, Heart } from "lucide-react";
import EmotionGauge from "./EmotionGauge";
import SuggestionCard from "./SuggestionCard";
import type { AnalysisResult } from "@/types/emotions";
import { SURFACE_EMOTIONS, HIDDEN_EMOTIONS, SUPPRESSED_EMOTIONS, META_EMOTIONS } from "@/types/emotions";

interface AnalysisDashboardProps {
  isAnalyzed: boolean;
  analysisResult: AnalysisResult | null;
}

const getSuggestions = (result: AnalysisResult) => {
  const suggestions = [];
  
  // Hidden anxiety suggestions
  if (result.hiddenAnxiety > 50) {
    suggestions.push({
      icon: Lightbulb,
      title: "Release Hidden Tension 🧘",
      description: "You might be carrying more anxiety than you realize. Try a 2-minute breathing exercise.",
      variant: "lavender" as const,
    });
  }
  
  // Suppressed anger suggestions
  if (result.suppressedAnger > 50) {
    suggestions.push({
      icon: Coffee,
      title: "Express What You're Holding 💭",
      description: "It's okay to feel frustrated. Write it down or talk to someone you trust.",
      metric: "-40%",
      variant: "pink" as const,
    });
  }
  
  // High emotional masking
  if (result.emotionalMasking > 60) {
    suggestions.push({
      icon: Shield,
      title: "It's Safe to Be You 🫂",
      description: "You're putting energy into maintaining a facade. Consider spaces where you can be authentic.",
      variant: "sky" as const,
    });
  }
  
  // Type-specific suggestions
  if (result.uploadType === "webcam") {
    suggestions.push({
      icon: Camera,
      title: "Your Face Tells a Story 📸",
      description: "We noticed micro-expressions beyond your smile. What's really on your mind?",
      variant: "mint" as const,
    });
  } else if (result.uploadType === "audio") {
    suggestions.push({
      icon: Headphones,
      title: "Your Voice Reveals Depth 🎙️",
      description: "Vocal patterns suggest there's more beneath the surface. Honor those feelings.",
      variant: "yellow" as const,
    });
  } else if (result.uploadType === "video") {
    suggestions.push({
      icon: Video,
      title: "Body & Soul Connection 📹",
      description: "Your body language shows what words don't say. Be gentle with yourself.",
      variant: "mint" as const,
    });
  }
  
  // Inner conflict suggestion
  if (result.innerConflict > 40) {
    suggestions.push({
      icon: Clock,
      title: "Honor Both Sides 🔮",
      description: "You're experiencing internal tension. Both feelings are valid - give them space.",
      variant: "mint" as const,
    });
  }
  
  return suggestions.slice(0, 4);
};

const getTypeLabel = (type: string | null) => {
  switch (type) {
    case "webcam": return "Webcam Recording";
    case "audio": return "Audio Analysis";
    case "video": return "Video Session";
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

const AnalysisDashboard = ({ isAnalyzed, analysisResult }: AnalysisDashboardProps) => {
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
          Upload a session and we'll detect your hidden & suppressed emotions
        </p>
      </motion.div>
    );
  }

  const suggestions = getSuggestions(analysisResult);

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
          <span className="text-muted-foreground ml-1">Accuracy</span>
        </span>
      </motion.div>

      {/* Surface Emotions */}
      <div className="glass-panel rounded-2xl p-4">
        <h4 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
          <Eye className="w-4 h-4" /> Surface Emotions
        </h4>
        <div className="grid grid-cols-3 gap-3">
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
      </div>

      {/* Hidden Emotions */}
      <div className="glass-panel rounded-2xl p-4 border border-neon-purple/30">
        <h4 className="text-sm font-semibold text-neon-purple mb-3 flex items-center gap-2">
          <Shield className="w-4 h-4" /> Hidden Emotions
        </h4>
        <div className="grid grid-cols-3 gap-3">
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
      </div>

      {/* Suppressed Emotions */}
      <div className="glass-panel rounded-2xl p-4 border border-neon-red/30">
        <h4 className="text-sm font-semibold text-neon-red mb-3 flex items-center gap-2">
          <Unlock className="w-4 h-4" /> Suppressed Emotions
        </h4>
        <div className="grid grid-cols-3 gap-3">
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
      </div>

      {/* Meta States */}
      <div className="glass-panel rounded-2xl p-4">
        <h4 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
          <Brain className="w-4 h-4" /> Emotional Awareness
        </h4>
        <div className="grid grid-cols-2 gap-3">
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
      </div>

      {/* Divider */}
      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-neon-purple to-transparent"
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
          <Sparkles className="w-5 h-5 text-neon-pink" />
          Personalized Tips for You
        </h3>
        
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <SuggestionCard
              key={index}
              icon={suggestion.icon}
              title={suggestion.title}
              description={suggestion.description}
              metric={suggestion.metric}
              variant={suggestion.variant}
              delay={1.1 + index * 0.2}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AnalysisDashboard;
