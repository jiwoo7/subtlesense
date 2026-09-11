import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Seo from "@/components/Seo";
import EmotionalSupportWidget from "@/components/EmotionalSupportWidget";
import { getEmotionalContext, getRelatedGuides } from "@/lib/emotionalRecommendations";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const EmotionalGuidePage = () => {
  const [searchParams] = useSearchParams();
  const emotion = searchParams.get("emotion") || "";
  const context = getEmotionalContext(emotion);
  const relatedGuides = getRelatedGuides(emotion);

  if (!context) {
    return (
      <div className="min-h-[100dvh] bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No emotional context found for \"{emotion}\"</p>
          <Link to="/guides" className="text-primary hover:text-primary/80">
            Return to guides
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-background relative">
      <Seo
        title={`${context.emotion} — Understanding and Support | Subtle Sense`}
        description={context.subtleSenseValue}
        path={`/emotional-guide?emotion=${encodeURIComponent(emotion)}`}
      />

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-10 sm:py-16 max-w-4xl">
        <Link
          to="/guides"
          className="eyebrow inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors mb-10 sm:mb-14"
        >
          <ArrowLeft className="w-3 h-3" strokeWidth={1.5} />
          The Quiet Library
        </Link>

        <motion.header
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-12 sm:mb-16"
        >
          <h1 className="editorial-heading text-4xl sm:text-5xl leading-tight text-foreground mb-6">
            {context.emotion}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed max-w-2xl">
            {context.subtleSenseValue}
          </p>
        </motion.header>

        <div className="space-y-14">
          <EmotionalSupportWidget emotion={emotion} />

          <motion.section
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="editorial-heading text-2xl sm:text-3xl text-foreground mb-6">About {context.emotion}</h2>
            
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wide">Common triggers</h3>
                <ul className="space-y-2">
                  {context.triggers.map((trigger) => (
                    <li key={trigger} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-primary flex-shrink-0 mt-1">→</span>
                      {trigger}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wide">What you might experience</h3>
                <ul className="space-y-2">
                  {context.symptoms.map((symptom) => (
                    <li key={symptom} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-primary flex-shrink-0 mt-1">•</span>
                      {symptom}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="editorial-heading text-2xl sm:text-3xl text-foreground mb-6">How Subtle Sense helps</h2>
            <div className="bg-secondary/30 border border-border/40 rounded-lg p-8">
              <ul className="space-y-3">
                {context.recommendations.map((rec, i) => (
                  <li key={rec} className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed flex gap-3">
                    <span className="text-primary flex-shrink-0 font-semibold">{i + 1}.</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>

          {relatedGuides.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="editorial-heading text-2xl sm:text-3xl text-foreground mb-6">Learn more</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {relatedGuides.map((guide) => (
                  <Link
                    key={guide}
                    to={`/guides/${guide}`}
                    className="group block p-6 border border-border/50 rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all"
                  >
                    <p className="text-sm font-semibold text-primary/70 group-hover:text-primary transition-colors mb-2">
                      Guide
                    </p>
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {guide
                        .split("-")
                        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                        .join(" ")}
                    </p>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}

          <motion.section
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center py-8"
          >
            <p className="text-base text-foreground/90 mb-6 max-w-2xl mx-auto">
              When you can't therapy, when you want to understand yourself deeper, Subtle Sense is here to help you see what you're actually feeling.
            </p>
            <Link to="/dashboard" className="btn-editorial inline-block">
              Begin your reading
            </Link>
          </motion.section>
        </div>

        <p className="eyebrow text-muted-foreground mt-14 pt-8 border-t border-border/50">
          Informational only · Not a diagnosis or medical advice
        </p>
      </div>
    </div>
  );
};

export default EmotionalGuidePage;
