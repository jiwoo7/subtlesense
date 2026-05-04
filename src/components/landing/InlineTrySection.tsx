import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Mic, Video, Upload, Brain, Eye, Shield, Unlock, Target, Sparkles } from "lucide-react";
import type { AnalysisResult, UploadType } from "@/types/emotions";

const generateAnalysis = (type: UploadType): AnalysisResult => {
  const randomValue = () => Math.floor(Math.random() * 60) + 20;
  return {
    happiness: randomValue(),
    sadness: randomValue(),
    anger: randomValue(),
    fear: randomValue(),
    surprise: randomValue(),
    disgust: randomValue(),
    hiddenAnxiety: randomValue(),
    hiddenInsecurity: randomValue(),
    hiddenLoneliness: randomValue(),
    hiddenGuilt: randomValue(),
    hiddenHappiness: randomValue(),
    hiddenLove: randomValue(),
    suppressedAnger: randomValue(),
    suppressedSadness: randomValue(),
    suppressedFear: randomValue(),
    suppressedDesire: randomValue(),
    suppressedJoy: randomValue(),
    suppressedLove: randomValue(),
    emotionalMasking: randomValue(),
    innerConflict: randomValue(),
    accuracy: Math.floor(Math.random() * 15) + 75,
    suggestions: [],
    advice: "This is a quick test! Sign up to get personalized AI-powered deep insights.",
    deepInsight: "Quick test results — sign up for full deep analysis with personalized advice.",
    uploadType: type,
  };
};

const EmotionMiniBar = ({ label, value, emoji, color }: { label: string; value: number; emoji: string; color: string }) => (
  <div className="space-y-0.5">
    <div className="flex justify-between text-xs">
      <span className="text-muted-foreground">{emoji} {label}</span>
      <span className="font-bold text-foreground">{value}%</span>
    </div>
    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.6, delay: 0.2 }}
      />
    </div>
  </div>
);

const InlineTrySection = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleTest = (type: UploadType) => {
    setIsAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      setIsAnalyzing(false);
      setResult(generateAnalysis(type));
    }, 2500);
  };

  const handleReset = () => {
    setResult(null);
    setIsAnalyzing(false);
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
      <motion.div
        className="text-center mb-8 sm:mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
          Test It Out — No Signup Needed ⚡
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
          See what your results would look like. Pick an input type and watch the analysis happen live.
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-6 sm:gap-8 items-start">
        {/* Left: Upload zone */}
        <motion.div
          className="glass-panel rounded-2xl p-6 sm:p-8 border border-border/50"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center gap-5">
            <motion.div
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center shadow-lg"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Upload className="w-7 h-7 text-white" />
            </motion.div>

            <div className="text-center">
              <h3 className="text-xl font-display font-bold text-foreground mb-1">
                Quick Test 🎬
              </h3>
              <p className="text-muted-foreground text-sm">
                Pick an input — get instant results beside it
              </p>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              {[
                { icon: Camera, label: "Webcam", type: "webcam" as UploadType, color: "bg-neon-pink/20 text-neon-pink hover:bg-neon-pink/30" },
                { icon: Mic, label: "Audio", type: "audio" as UploadType, color: "bg-neon-purple/20 text-neon-purple hover:bg-neon-purple/30" },
                { icon: Video, label: "Video", type: "video" as UploadType, color: "bg-neon-red/20 text-neon-red hover:bg-neon-red/30" },
              ].map(({ icon: Icon, label, type, color }) => (
                <motion.button
                  key={label}
                  onClick={() => handleTest(type)}
                  disabled={isAnalyzing}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold cursor-pointer transition-all disabled:opacity-50 ${color}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </motion.button>
              ))}
            </div>

            {isAnalyzing && (
              <motion.div
                className="w-full mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    className="w-8 h-8 rounded-full border-2 border-neon-pink border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="text-sm font-medium text-muted-foreground">Analyzing emotions... 🔮</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-neon-purple via-neon-pink to-neon-red"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2.5, ease: "easeInOut" }}
                  />
                </div>
              </motion.div>
            )}

            {result && (
              <motion.button
                onClick={handleReset}
                className="text-sm text-neon-purple font-medium hover:underline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                ↻ Try again
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Right: Results */}
        <motion.div
          className="glass-panel rounded-2xl p-5 sm:p-6 border border-neon-purple/30 min-h-[300px] flex items-center justify-center"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          {!result && !isAnalyzing && (
            <div className="text-center py-8">
              <motion.div
                className="w-14 h-14 rounded-2xl bg-muted mx-auto mb-4 flex items-center justify-center"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Brain className="w-7 h-7 text-muted-foreground" />
              </motion.div>
              <p className="text-muted-foreground text-sm">
                Your results will appear here ←
              </p>
              <p className="text-muted-foreground/60 text-xs mt-1">
                Click any input type to start
              </p>
            </div>
          )}

          {isAnalyzing && (
            <div className="text-center py-8">
              <motion.div
                className="text-4xl mb-3"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                🔮
              </motion.div>
              <p className="text-sm text-muted-foreground">Processing deep patterns...</p>
            </div>
          )}

          {result && (
            <motion.div
              className="w-full space-y-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {/* Accuracy */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Results</span>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neon-purple/20">
                  <Target className="w-3 h-3 text-neon-purple" />
                  <span className="text-xs font-bold text-neon-purple">{result.accuracy}%</span>
                </div>
              </div>

              {/* Surface */}
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                  <Eye className="w-3 h-3" /> Surface
                </h4>
                <div className="space-y-2">
                  <EmotionMiniBar label="Happiness" value={result.happiness} emoji="😊" color="bg-neon-pink" />
                  <EmotionMiniBar label="Sadness" value={result.sadness} emoji="😢" color="bg-neon-pink" />
                  <EmotionMiniBar label="Surprise" value={result.surprise} emoji="😮" color="bg-neon-pink" />
                </div>
              </div>

              {/* Hidden */}
              <div>
                <h4 className="text-xs font-semibold text-neon-purple mb-2 flex items-center gap-1">
                  <Shield className="w-3 h-3" /> Hidden
                </h4>
                <div className="space-y-2">
                  <EmotionMiniBar label="Anxiety" value={result.hiddenAnxiety} emoji="😰" color="bg-neon-purple" />
                  <EmotionMiniBar label="Insecurity" value={result.hiddenInsecurity} emoji="🫣" color="bg-neon-purple" />
                  <EmotionMiniBar label="Loneliness" value={result.hiddenLoneliness} emoji="😔" color="bg-neon-purple" />
                  <EmotionMiniBar label="Guilt" value={result.hiddenGuilt} emoji="😣" color="bg-neon-purple" />
                </div>
              </div>

              {/* Suppressed */}
              <div>
                <h4 className="text-xs font-semibold text-neon-red mb-2 flex items-center gap-1">
                  <Unlock className="w-3 h-3" /> Suppressed
                </h4>
                <div className="space-y-2">
                  <EmotionMiniBar label="Desire" value={result.suppressedDesire} emoji="🔒" color="bg-neon-red" />
                  <EmotionMiniBar label="Anger" value={result.suppressedAnger} emoji="😤" color="bg-neon-red" />
                  <EmotionMiniBar label="Sadness" value={result.suppressedSadness} emoji="💧" color="bg-neon-red" />
                  <EmotionMiniBar label="Fear" value={result.suppressedFear} emoji="😨" color="bg-neon-red" />
                </div>
              </div>

              {/* Quick insight */}
              <div className="p-3 rounded-xl bg-neon-purple/10 border border-neon-purple/20">
                <div className="flex items-start gap-2 text-xs">
                  <Sparkles className="w-3.5 h-3.5 text-neon-purple mt-0.5 shrink-0" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Quick insight:</strong> Your emotional masking index is {result.emotionalMasking}% with inner conflict at {result.innerConflict}%. Try again with different inputs to explore patterns.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default InlineTrySection;
