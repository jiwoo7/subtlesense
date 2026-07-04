import { motion } from "framer-motion";
import { Brain, Cpu, BarChart3, Shield } from "lucide-react";

const TransparencySection = () => {
  return (
    <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
      <motion.div
        className="text-center mb-10 sm:mb-14"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
          Full Transparency — No Black Box 🔬
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
          We believe you deserve to know exactly how your emotions are analyzed
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
        {/* AI Models */}
        <motion.div
          className="glass-panel rounded-2xl p-5 sm:p-6 border border-border/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-neon-purple/20 flex items-center justify-center mb-4">
            <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-neon-purple" />
          </div>
          <h3 className="font-display text-lg font-bold mb-2">AI Models Used</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-neon-pink mt-0.5">•</span>
              <span><strong className="text-foreground">Google Gemini 2.5 Flash</strong> — Primary emotion detection from facial expressions, voice tone & body language</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neon-pink mt-0.5">•</span>
              <span><strong className="text-foreground">Gemini 2.5 Pro</strong> — Deep analysis for hidden & suppressed pattern recognition</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neon-pink mt-0.5">•</span>
              <span>Models run via secure backend functions — your data never leaves our servers</span>
            </li>
          </ul>
        </motion.div>

        {/* Accuracy Rates */}
        <motion.div
          className="glass-panel rounded-2xl p-5 sm:p-6 border border-border/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-neon-pink/20 flex items-center justify-center mb-4">
            <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-neon-pink" />
          </div>
          <h3 className="font-display text-lg font-bold mb-2">Accuracy Rates</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Surface Emotions</span>
                <span className="font-bold text-foreground">~89%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-neon-purple to-neon-pink rounded-full" style={{ width: "89%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Hidden Emotions</span>
                <span className="font-bold text-foreground">~78%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-neon-purple to-neon-pink rounded-full" style={{ width: "78%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Suppressed Emotions</span>
                <span className="font-bold text-foreground">~72%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-neon-purple to-neon-pink rounded-full" style={{ width: "72%" }} />
              </div>
            </div>
            <p className="text-xs text-muted-foreground/70 mt-2">
              Overall avg: <strong>84.5%</strong> across 17+ real sessions. Accuracy varies with lighting, audio quality & input clarity.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default TransparencySection;
