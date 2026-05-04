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
    feature: "Hidden Emotion Inference",
    subtleSense: "full",
    subtleSenseDetail: "Best-effort inference for hidden anxiety, insecurity, loneliness, guilt, happiness, and love that may sit underneath the visible signal.",
    others: "partial",
    othersDetail: "Most APIs expose visible outputs first; hidden-state interpretation usually needs custom prompting or manual review.",
  },
  {
    feature: "Suppressed Emotion Signals",
    subtleSense: "full",
    subtleSenseDetail: "Highlights possible held-back anger, sadness, fear, desire, joy, and love so users get a richer read than surface affect alone.",
    others: "partial",
    othersDetail: "Most competing products do not ship this as a first-class consumer feature.",
  },
  {
    feature: "Emotional Masking Analysis",
    subtleSense: "full",
    subtleSenseDetail: "Returns separate masking and inner-conflict scores describing how polished the outside looks versus what may be happening underneath.",
    others: "partial",
    othersDetail: "This kind of derived interpretation is uncommon in off-the-shelf consumer apps.",
  },
  {
    feature: "Multimodal Browser Flow",
    subtleSense: "full",
    subtleSenseDetail: "Webcam, recorded audio, and uploaded video all feed into one simple browser experience.",
    others: "partial",
    othersDetail: "Many products focus on face analysis or voice analysis, but not both in one lightweight flow.",
  },
  {
    feature: "Actionable Guidance",
    subtleSense: "full",
    subtleSenseDetail: "Turns the analysis into narrative insight plus concrete next steps, not just raw numbers.",
    others: "partial",
    othersDetail: "Many alternatives return labels or charts. Advice and follow-up often need a second product layer.",
  },
];

const StatusIcon = ({ status }: { status: "full" | "partial" | "none" }) => {
  if (status === "full") return <Check className="w-5 h-5 flex-shrink-0 text-primary" />;
  if (status === "partial") return <Minus className="w-5 h-5 flex-shrink-0 text-accent" />;
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
          This compares SubtleSense with the common patterns you usually see in emotion APIs, mood apps, and facial-expression tools. Specific vendors differ by plan and implementation, so this section stays intentionally conservative.
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
            What You Actually Get Here
          </h3>
          <div className="grid sm:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold gradient-text">Deeper</p>
              <p className="text-sm text-muted-foreground">Surface plus hidden and suppressed interpretation</p>
            </div>
            <div>
              <p className="text-3xl font-bold gradient-text">Useful</p>
              <p className="text-sm text-muted-foreground">Guidance and next steps instead of raw labels alone</p>
            </div>
            <div>
              <p className="text-3xl font-bold gradient-text">Simple</p>
              <p className="text-sm text-muted-foreground">Webcam, audio, and video in one browser flow</p>
            </div>
          </div>
          <p className="mt-5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Important: SubtleSense is an interpretive AI product for reflection and guidance. It is not a medical or clinical diagnostic tool, and no comparison here should be read as a scientific benchmark claim.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default ComparisonSection;
