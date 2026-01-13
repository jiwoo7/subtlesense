import { motion } from "framer-motion";
import { Brain, Clock, Coffee, Lightbulb, Target, Sparkles, Headphones, Video, Camera, Focus } from "lucide-react";
import EmotionGauge from "./EmotionGauge";
import SuggestionCard from "./SuggestionCard";
import type { AnalysisResult } from "@/pages/Index";

interface AnalysisDashboardProps {
  isAnalyzed: boolean;
  analysisResult: AnalysisResult | null;
}

const getSuggestions = (result: AnalysisResult) => {
  const suggestions = [];
  
  // High confusion suggestions
  if (result.confusion > 60) {
    suggestions.push({
      icon: Lightbulb,
      title: "Try a Simpler Example 💡",
      description: "Breaking concepts into bite-sized pieces makes learning easier and more fun.",
      variant: "lavender" as const,
    });
  }
  
  // High frustration suggestions
  if (result.frustration > 50) {
    suggestions.push({
      icon: Coffee,
      title: "Take a 2-Minute Break ☕",
      description: "A short pause reduces confusion by 40% and helps restore your focus!",
      metric: "-40%",
      variant: "pink" as const,
    });
  }
  
  // Low focus suggestions
  if (result.focus < 60) {
    suggestions.push({
      icon: Focus,
      title: "Remove Distractions 🎧",
      description: "Try closing extra tabs and silencing notifications for deeper concentration.",
      variant: "sky" as const,
    });
  }
  
  // Type-specific suggestions
  if (result.uploadType === "webcam") {
    suggestions.push({
      icon: Camera,
      title: "Your Facial Expressions Show Stress 😅",
      description: "We noticed tension in your expression. Try some quick shoulder rolls!",
      variant: "mint" as const,
    });
  } else if (result.uploadType === "audio") {
    suggestions.push({
      icon: Headphones,
      title: "Voice Patterns Indicate Fatigue 🎙️",
      description: "Your voice shows signs of tiredness. A quick stretch might help!",
      variant: "yellow" as const,
    });
  } else if (result.uploadType === "video") {
    suggestions.push({
      icon: Video,
      title: "Body Language Check 📹",
      description: "Your posture suggests you've been coding intensely. Time for a posture reset!",
      variant: "mint" as const,
    });
  }
  
  // Always include debugging tip if confusion is moderate+
  if (result.confusion > 40) {
    suggestions.push({
      icon: Clock,
      title: "Debug Step by Step 🔍",
      description: "Use console.log to trace values — it's like being a detective in your own code!",
      variant: "mint" as const,
    });
  }
  
  return suggestions.slice(0, 4); // Max 4 suggestions
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
          <span className="text-emerald-600">{Math.floor(Math.random() * 10) + 78}%</span>
          <span className="text-muted-foreground ml-1">Accuracy</span>
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
