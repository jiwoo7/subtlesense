import { motion } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getEmotionalContext, getRelatedGuides } from "@/lib/emotionalRecommendations";

interface EmotionalSupportWidgetProps {
  emotion?: string;
  compact?: boolean;
  className?: string;
}

const EmotionalSupportWidget = ({
  emotion,
  compact = false,
  className = ""
}: EmotionalSupportWidgetProps) => {
  if (!emotion) return null;

  const context = getEmotionalContext(emotion);
  if (!context) return null;

  const relatedGuides = getRelatedGuides(emotion);

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg p-6 ${className}`}
      >
        <div className="flex gap-3 items-start">
          <Heart className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-foreground mb-2">
              You're not alone in feeling this way
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {context.subtleSenseValue}
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Start a reading <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`bg-gradient-to-r from-primary/5 via-transparent to-primary/5 border border-primary/20 rounded-lg p-8 ${className}`}
    >
      <div className="flex gap-3 items-start mb-6">
        <Heart className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <h2 className="editorial-heading text-2xl sm:text-3xl text-foreground mb-2">
            If you're experiencing {context.emotion.toLowerCase()}…
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            {context.subtleSenseValue}
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
            What you might notice
          </h3>
          <ul className="space-y-2">
            {context.symptoms.slice(0, 3).map((symptom) => (
              <li key={symptom} className="flex gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                <span>{symptom}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
            How Subtle Sense helps
          </h3>
          <ul className="space-y-2">
            {context.recommendations.slice(0, 3).map((rec) => (
              <li key={rec} className="flex gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-1.5 flex-shrink-0">→</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {relatedGuides.length > 0 && (
        <div className="mb-6 p-4 bg-background/50 rounded border border-border/50">
          <p className="text-sm font-medium text-foreground mb-3">Related guides:</p>
          <div className="flex flex-wrap gap-2">
            {relatedGuides.map((guide) => (
              <Link
                key={guide}
                to={`/guides/${guide}`}
                className="text-xs px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-colors"
              >
                Read guide
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
        <p className="text-xs text-muted-foreground italic">
          Remember: Subtle Sense is not a diagnosis or replacement for professional therapy. If you're in crisis, please reach out to a mental health professional.
        </p>
        <Link
          to="/dashboard"
          className="btn-editorial inline-flex items-center gap-2 whitespace-nowrap"
        >
          Begin a reading <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.section>
  );
};

export default EmotionalSupportWidget;
