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
  peach: "card-peach",
  rose: "card-rose",
  purple: "card-purple",
  red: "card-red",
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

const NEXT_STEPS: Record<string, { title: string; description: string; href: string; cta: string }> = {
  hiddenAnxiety: {
    title: "A 90-second breath, before anything else",
    description: "The reading picked up an anxious undercurrent. Try one round of box breathing — it reliably lowers the arousal signal we just measured.",
    href: "/games?tool=breathing",
    cta: "Open Breathing",
  },
  hiddenLoneliness: {
    title: "A short note to one person",
    description: "Loneliness shows up quietly in your composition. Message one person a single sentence — no request, just presence.",
    href: "/dashboard?tab=journal",
    cta: "Open Journal",
  },
  hiddenGuilt: {
    title: "Name it in one line",
    description: "Guilt lingers when it stays abstract. Write the sentence you'd say aloud if no one heard it.",
    href: "/dashboard?tab=journal",
    cta: "Open Journal",
  },
  hiddenInsecurity: {
    title: "Ground yourself in three facts",
    description: "Insecurity feeds on abstractions. List three things that are true about you today — small, verifiable, unremarkable.",
    href: "/dashboard?tab=journal",
    cta: "Open Journal",
  },
  hiddenHappiness: {
    title: "Let the quiet joy breathe",
    description: "There's a hidden lift in this reading. Sit with it for one minute before the next task — that's usually all it needs.",
    href: "/playlists",
    cta: "Open Playlists",
  },
  hiddenLove: {
    title: "Say the thing, softly",
    description: "Warmth is present but held back. A single unhurried message — no occasion, no context — is the next step.",
    href: "/dashboard?tab=journal",
    cta: "Open Journal",
  },
};

const DEFAULT_NEXT_STEP = {
  title: "A quiet minute is enough",
  description: "The clearest signal here is composure. Take one slow minute before returning to what you were doing.",
  href: "/games?tool=breathing",
  cta: "Open Breathing",
};

const RealAnalysisDashboard = ({ isAnalyzed, analysisResult }: RealAnalysisDashboardProps) => {
  if (!isAnalyzed || !analysisResult) {
    return null;
  }

  const suggestions = analysisResult.suggestions?.length
    ? analysisResult.suggestions
    : [
        {
          title: "Try a clearer capture",
          description: "Face the camera in even lighting, speak clearly, or upload a short front-facing clip for a stronger read.",
          icon: "sparkles",
          variant: "purple",
        },
      ];

  // Dominant hidden emotion → tailored next step
  const dominantHidden = HIDDEN_EMOTIONS.reduce(
    (top, e) => {
      const v = Number(analysisResult[e.key]) || 0;
      return v > top.v ? { key: String(e.key), label: e.label, v } : top;
    },
    { key: "", label: "", v: 0 }
  );
  const nextStep = dominantHidden.v >= 40 ? NEXT_STEPS[dominantHidden.key] ?? DEFAULT_NEXT_STEP : DEFAULT_NEXT_STEP;

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
            className="w-4 h-4 rounded-full bg-primary"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="eyebrow text-primary">
            {getTypeEmoji(analysisResult.uploadType)} {getTypeLabel(analysisResult.uploadType)} · Complete
          </span>
        </div>
        <h2 className="editorial-heading text-2xl text-foreground">
          Your <span className="editorial-italic text-gold">quiet</span> reading
        </h2>
      </motion.div>

      {/* Accuracy badge + honest caveat */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="border border-border/60 p-4"
      >
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-primary" />
          <span className="eyebrow">
            <span className="text-gold">{analysisResult.accuracy}%</span>
            <span className="text-muted-foreground ml-2">Model confidence</span>
          </span>
        </div>
        <p className="text-xs text-muted-foreground font-light mt-2 leading-relaxed">
          A reading, not a diagnosis. Numbers reflect the model's certainty about signals in this capture —
          not the truth of what you feel. Read them lightly. <a href="/methodology" className="text-gold underline underline-offset-4 decoration-border hover:decoration-gold transition-colors">How we read →</a>
        </p>
      </motion.div>

      {/* One quiet next step — tailored */}
      <motion.aside
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        className="border border-primary/40 bg-transparent p-5"
      >
        <p className="eyebrow text-gold mb-2">One quiet next step</p>
        <h3 className="editorial-heading text-xl text-foreground leading-tight">{nextStep.title}</h3>
        <p className="text-sm text-muted-foreground font-light mt-2 leading-relaxed">{nextStep.description}</p>
        <a
          href={nextStep.href}
          className="eyebrow inline-block mt-4 text-gold border-b border-border hover:border-gold transition-colors pb-0.5"
        >
          {nextStep.cta} ›
        </a>
      </motion.aside>

      {/* Spoken (Surface) */}
      <motion.div
        className="border border-border/60 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-baseline justify-between mb-5">
          <h3 className="editorial-heading text-xl text-foreground flex items-center gap-3">
            <Eye className="w-4 h-4 text-primary" strokeWidth={1.25} />
            Spoken
          </h3>
          <span className="eyebrow">What you present</span>
        </div>
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

      {/* Felt (Hidden) */}
      <motion.div
        className="border border-border/60 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-baseline justify-between mb-5">
          <h3 className="editorial-heading text-xl text-foreground flex items-center gap-3">
            <Shield className="w-4 h-4 text-primary" strokeWidth={1.25} />
            Felt
          </h3>
          <span className="eyebrow">What runs beneath</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {HIDDEN_EMOTIONS.map((emotion, index) => (
            <EmotionGauge
              key={emotion.key}
              label={emotion.label.replace(/^Hidden\s+/, "")}
              value={Math.min(100, (analysisResult[emotion.key] as number) || 0)}
              color={emotion.color}
              emoji={emotion.emoji}
              delay={0.5 + index * 0.1}
              size="sm"
            />
          ))}
        </div>
      </motion.div>

      {/* Unsaid (Suppressed) */}
      <motion.div
        className="border border-border/60 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="flex items-baseline justify-between mb-5">
          <h3 className="editorial-heading text-xl text-foreground flex items-center gap-3">
            <Unlock className="w-4 h-4 text-primary" strokeWidth={1.25} />
            Unsaid
          </h3>
          <span className="eyebrow">What stays held back</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {SUPPRESSED_EMOTIONS.map((emotion, index) => (
            <EmotionGauge
              key={emotion.key}
              label={emotion.label.replace(/^Suppressed\s+/, "")}
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
          {suggestions.map((suggestion, index) => {
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
