import { motion } from "framer-motion";
import { Eye, Shield, Unlock, Brain, Target } from "lucide-react";

const sampleOutput = {
  surface: [
    { label: "Happiness", value: 45, emoji: "😊" },
    { label: "Sadness", value: 15, emoji: "😢" },
    { label: "Surprise", value: 22, emoji: "😮" },
  ],
  hidden: [
    { label: "Hidden Anxiety", value: 38, emoji: "😰" },
    { label: "Hidden Insecurity", value: 25, emoji: "🫣" },
  ],
  suppressed: [
    { label: "Suppressed Desire", value: 42, emoji: "🔒" },
    { label: "Suppressed Sadness", value: 35, emoji: "😶" },
  ],
};

const EmotionBar = ({ label, value, emoji, color, delay }: { label: string; value: number; emoji: string; color: string; delay: number }) => (
  <motion.div
    className="space-y-1"
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
  >
    <div className="flex justify-between text-xs">
      <span className="text-muted-foreground">{emoji} {label}</span>
      <span className="font-bold text-foreground">{value}%</span>
    </div>
    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${color}`}
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.2, duration: 0.6 }}
      />
    </div>
  </motion.div>
);

const SampleOutputSection = () => {
  return (
    <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
      <motion.div
        className="text-center mb-10 sm:mb-14"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
          Real Sample Output 📊
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
          Here's what an actual analysis looks like — no signup needed to see the real deal
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto">
        <motion.div
          className="glass-panel rounded-2xl p-5 sm:p-8 border border-neon-purple/30"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Accuracy badge */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <span className="text-lg">📸</span> Webcam Analysis Result
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-purple/20 border border-neon-purple/30">
              <Target className="w-3.5 h-3.5 text-neon-purple" />
              <span className="text-xs font-bold text-neon-purple">87% Accuracy</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {/* Surface */}
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground mb-3 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" /> Surface
              </h4>
              <div className="space-y-2.5">
                {sampleOutput.surface.map((e, i) => (
                  <EmotionBar key={e.label} {...e} color="bg-neon-pink" delay={0.1 + i * 0.05} />
                ))}
              </div>
            </div>

            {/* Hidden */}
            <div>
              <h4 className="text-xs font-semibold text-neon-purple mb-3 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" /> Hidden
              </h4>
              <div className="space-y-2.5">
                {sampleOutput.hidden.map((e, i) => (
                  <EmotionBar key={e.label} {...e} color="bg-neon-purple" delay={0.2 + i * 0.05} />
                ))}
              </div>
            </div>

            {/* Suppressed */}
            <div>
              <h4 className="text-xs font-semibold text-neon-red mb-3 flex items-center gap-1.5">
                <Unlock className="w-3.5 h-3.5" /> Suppressed
              </h4>
              <div className="space-y-2.5">
                {sampleOutput.suppressed.map((e, i) => (
                  <EmotionBar key={e.label} {...e} color="bg-neon-red" delay={0.3 + i * 0.05} />
                ))}
              </div>
            </div>
          </div>

          {/* AI Insight */}
          <motion.div
            className="mt-6 p-4 rounded-xl bg-neon-purple/10 border border-neon-purple/20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-start gap-2">
              <Brain className="w-4 h-4 text-neon-purple mt-0.5 shrink-0" />
              <div className="text-sm">
                <p className="font-semibold text-foreground mb-1">AI Deep Insight</p>
                <p className="text-muted-foreground leading-relaxed">
                  "You're presenting a calm exterior, but there's significant emotional processing beneath the surface. 
                  Your hidden anxiety and suppressed desire suggest you may be holding back from expressing what you truly want."
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SampleOutputSection;
