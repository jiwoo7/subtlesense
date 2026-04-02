import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";

interface ComparisonFeature {
  feature: string;
  subtleSense: "full" | "partial" | "none";
  subtleSenseDetail: string;
  others: "full" | "partial" | "none";
  othersDetail: string;
}

const comparisonData: ComparisonFeature[] = [
  {
    feature: "Surface Emotion Detection",
    subtleSense: "full",
    subtleSenseDetail: "6 core emotions (happiness, sadness, anger, fear, surprise, disgust) with nuanced intensity scoring 0–100",
    others: "full",
    othersDetail: "Most apps detect 5–7 basic emotions using standard facial action coding (FACS)",
  },
  {
    feature: "Hidden Emotion Detection",
    subtleSense: "full",
    subtleSenseDetail: "Detects 4 hidden emotions: anxiety, insecurity, loneliness, guilt — masked beneath surface expressions via micro-expression analysis",
    others: "none",
    othersDetail: "No mainstream emotion app detects hidden or masked emotions; they only report what's visually obvious",
  },
  {
    feature: "Suppressed Emotion Detection",
    subtleSense: "full",
    subtleSenseDetail: "Identifies 4 suppressed states: held-back anger, sadness, fear, and desire — emotions actively being controlled",
    others: "none",
    othersDetail: "Not available in any consumer emotion detection tool; clinical tools sometimes attempt this with EEG/biometric data",
  },
  {
    feature: "Emotional Masking Analysis",
    subtleSense: "full",
    subtleSenseDetail: "Quantifies how much someone is masking (0–100) and measures inner conflict between shown vs felt emotions",
    others: "none",
    othersDetail: "No consumer app provides masking or inner-conflict metrics",
  },
  {
    feature: "Total Emotions Analyzed",
    subtleSense: "full",
    subtleSenseDetail: "16 distinct emotional dimensions across 4 categories (Surface, Hidden, Suppressed, Meta)",
    others: "partial",
    othersDetail: "Typically 5–7 basic emotions. Apps like Affectiva/iMotions detect up to 7; Face++ detects 7",
  },
  {
    feature: "Multimodal Input",
    subtleSense: "full",
    subtleSenseDetail: "Webcam (live), audio recording, and video upload — all three modalities supported",
    others: "partial",
    othersDetail: "Most apps support only one input (photo or video). Few support audio. None combine all three",
  },
  {
    feature: "AI-Powered Advice & Suggestions",
    subtleSense: "full",
    subtleSenseDetail: "Personalized, empathetic suggestions addressing both visible AND hidden emotional needs — breathing exercises, journaling prompts, etc.",
    others: "none",
    othersDetail: "Most apps only show emotion labels/scores. No actionable advice or therapeutic suggestions",
  },
  {
    feature: "Deep Insight Generation",
    subtleSense: "full",
    subtleSenseDetail: "AI generates a profound narrative insight about hidden emotional patterns and what the user may need to acknowledge or release",
    others: "none",
    othersDetail: "Not available — other apps provide charts/numbers but no interpretive emotional insights",
  },
  {
    feature: "Privacy & Local Processing",
    subtleSense: "full",
    subtleSenseDetail: "Media is processed in real-time and never stored permanently. Analysis happens via encrypted API calls",
    others: "partial",
    othersDetail: "Varies widely. Some (like Affectiva) process locally; others (like Face++) send data to cloud servers with unclear retention",
  },
  {
    feature: "Session History & Trends",
    subtleSense: "full",
    subtleSenseDetail: "Full session history with emotion timeline charts, mood boards, and weekly trend tracking",
    others: "partial",
    othersDetail: "Some apps offer basic history. Most don't track trends or provide visual analytics over time",
  },
  {
    feature: "Journaling Integration",
    subtleSense: "full",
    subtleSenseDetail: "Built-in journal for personal reflections linked to emotion sessions, with mood tagging",
    others: "none",
    othersDetail: "No emotion detection app integrates journaling — this is unique to SubtleSense",
  },
  {
    feature: "Free to Use (No API Key Needed)",
    subtleSense: "full",
    subtleSenseDetail: "Completely free. No API key, no subscription required. Works instantly from the browser",
    others: "partial",
    othersDetail: "Most require developer API keys (Affectiva, Face++, AWS Rekognition) or paid subscriptions. Consumer apps are limited",
  },
];

const StatusIcon = ({ status }: { status: "full" | "partial" | "none" }) => {
  if (status === "full") return <Check className="w-5 h-5 flex-shrink-0 text-[hsl(var(--primary))]" />;
  if (status === "partial") return <Minus className="w-5 h-5 flex-shrink-0 text-[hsl(var(--accent))]" />;
  return <X className="w-5 h-5 flex-shrink-0 text-destructive" />;
};

const ComparisonSection = () => {
  return (
    <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
      <motion.div
        className="text-center mb-10 sm:mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
          SubtleSense vs Other Emotion Detection Apps ⚡
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg max-w-3xl mx-auto">
          Most emotion detection tools only scratch the surface. Here's how SubtleSense compares to popular alternatives like Affectiva, Face++, AWS Rekognition, Microsoft Azure Face, and consumer mood apps.
        </p>
      </motion.div>

      {/* Desktop Table */}
      <div className="hidden lg:block max-w-5xl mx-auto">
        <div className="glass-panel rounded-2xl overflow-hidden border border-border/50">
          {/* Header */}
          <div className="grid grid-cols-3 gap-0 bg-muted/30 border-b border-border/50">
            <div className="p-4 font-display font-bold text-foreground">Feature</div>
            <div className="p-4 font-display font-bold text-center gradient-text border-x border-border/30">
              🔮 SubtleSense
            </div>
            <div className="p-4 font-display font-bold text-center text-muted-foreground">
              Other Apps
            </div>
          </div>

          {/* Rows */}
          {comparisonData.map((row, index) => (
            <motion.div
              key={row.feature}
              className={`grid grid-cols-3 gap-0 ${index % 2 === 0 ? "bg-background/30" : "bg-muted/10"} ${index < comparisonData.length - 1 ? "border-b border-border/30" : ""}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="p-4">
                <p className="font-semibold text-foreground text-sm">{row.feature}</p>
              </div>
              <div className="p-4 border-x border-border/30 bg-primary/5">
                <div className="flex items-start gap-2">
                  <StatusIcon status={row.subtleSense} />
                  <p className="text-xs text-foreground/80 leading-relaxed">{row.subtleSenseDetail}</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start gap-2">
                  <StatusIcon status={row.others} />
                  <p className="text-xs text-muted-foreground leading-relaxed">{row.othersDetail}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4 max-w-xl mx-auto">
        {comparisonData.map((row, index) => (
          <motion.div
            key={row.feature}
            className="glass-panel rounded-xl p-4 border border-border/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <h4 className="font-display font-bold text-foreground text-sm mb-3">{row.feature}</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
                <StatusIcon status={row.subtleSense} />
                <div>
                  <p className="text-xs font-semibold gradient-text mb-1">SubtleSense</p>
                  <p className="text-xs text-foreground/80 leading-relaxed">{row.subtleSenseDetail}</p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/30">
                <StatusIcon status={row.others} />
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1">Other Apps</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{row.othersDetail}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <motion.div
        className="mt-10 sm:mt-16 max-w-3xl mx-auto text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-primary/20">
          <h3 className="font-display text-xl sm:text-2xl font-bold mb-4 gradient-text">
            Why SubtleSense Stands Apart
          </h3>
          <div className="grid sm:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold gradient-text">16</p>
              <p className="text-sm text-muted-foreground">Emotions detected<br />(vs 5–7 in others)</p>
            </div>
            <div>
              <p className="text-3xl font-bold gradient-text">3×</p>
              <p className="text-sm text-muted-foreground">More emotional depth<br />(hidden + suppressed)</p>
            </div>
            <div>
              <p className="text-3xl font-bold gradient-text">Free</p>
              <p className="text-sm text-muted-foreground">No API keys needed<br />(vs paid SDKs)</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ComparisonSection;
