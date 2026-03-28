import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Star, Brain, Shield, Zap, Users, ArrowDown } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import FeedbacksSection from "@/components/FeedbacksSection";
import TransparencySection from "@/components/landing/TransparencySection";
import SampleOutputSection from "@/components/landing/SampleOutputSection";
import RealWorldUseCases from "@/components/landing/RealWorldUseCases";
import MediaUploadZone from "@/components/MediaUploadZone";
import RealAnalysisDashboard from "@/components/RealAnalysisDashboard";
import ExitPoll from "@/components/ExitPoll";
import ShareResults from "@/components/ShareResults";
import type { AnalysisResult } from "@/types/emotions";

const Landing = () => {
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setIsAnalyzed(false);
    setAnalysisResult(null);
  };

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);
    setIsAnalyzed(true);
    setIsAnalyzing(false);
  };

  const features = [
    {
      icon: Brain,
      title: "Deep AI Detection",
      description: "Detects hidden & suppressed emotions beyond the surface using advanced AI",
      color: "neon-purple"
    },
    {
      icon: Zap,
      title: "Instant Insights",
      description: "Get personalized suggestions within seconds addressing what you're truly feeling",
      color: "neon-pink"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data stays secure. We analyze locally and never share your emotions",
      color: "neon-purple"
    },
    {
      icon: Users,
      title: "For Everyone",
      description: "Anyone seeking emotional awareness can benefit from deep analysis",
      color: "neon-pink"
    }
  ];

  const stats = [
    { value: "16", label: "Emotions Detected" },
    { value: "84.5%", label: "Avg Accuracy" },
    { value: "<5s", label: "Response time" },
    { value: "Deep", label: "AI Analysis" }
  ];

  const scrollToTry = () => {
    document.getElementById("try-it-out")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <motion.div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white" />
              </motion.div>
              <span className="font-display text-xl sm:text-2xl font-bold gradient-text">Subtle Sense</span>
            </div>
            <Button
              onClick={scrollToTry}
              className="bg-gradient-to-r from-neon-purple to-neon-pink text-white font-semibold shadow-lg text-sm sm:text-base px-3 sm:px-4"
            >
              Analyze Now ↓
            </Button>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass-panel mb-4 sm:mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-neon-pink" />
              <span className="text-xs sm:text-sm font-medium">Powered by Gemini AI • Hidden & Suppressed Detection</span>
            </motion.div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 sm:mb-6 leading-tight">
              Discover What You're
              <br />
              <span className="gradient-text font-serif italic text-[1.1em]">Really Feeling</span>
            </h1>

            <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed px-4">
              Our AI goes beyond surface emotions to detect what you're hiding and suppressing. 
              Test it out right here — instant results, no account needed. 🔮
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
              <Button
                size="lg"
                onClick={scrollToTry}
                className="bg-gradient-to-r from-neon-purple to-neon-pink text-white font-bold text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 shadow-xl w-full sm:w-auto"
              >
                <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Start Analyzing
              </Button>
            </div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mt-10 sm:mt-16 px-4 sm:px-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="glass-panel rounded-xl sm:rounded-2xl p-3 sm:p-6 text-center"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <p className="text-xl sm:text-3xl font-display font-bold gradient-text">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <motion.div
            className="text-center mb-10 sm:mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
              How Subtle Sense Works 🔮
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              Deep analysis that reveals what's beneath the surface
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="glass-panel rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-border/50 hover:border-neon-purple/30 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-${feature.color}/20 flex items-center justify-center mb-3 sm:mb-4`}>
                  <feature.icon className={`w-5 h-5 sm:w-6 sm:h-6 text-${feature.color}`} />
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold mb-1 sm:mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Inline Try Section */}
        <div id="try-it-out">
          <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
            <motion.div
              className="text-center mb-8 sm:mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
                Analyze Your Emotions Now 🔮
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
                Use your webcam, record audio, or upload a video — get full AI-powered deep analysis instantly.
              </p>
            </motion.div>

            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              <div className="space-y-4 sm:space-y-6">
                <MediaUploadZone
                  onStartAnalysis={handleStartAnalysis}
                  onAnalysisComplete={handleAnalysisComplete}
                  isAnalyzing={isAnalyzing}
                />

                {isAnalyzing && (
                  <motion.div
                    className="glass-panel rounded-xl sm:rounded-2xl p-4 sm:p-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="relative flex-shrink-0">
                        <motion.div
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-3 border-neon-pink border-t-transparent"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg sm:text-xl">🔮</span>
                        </div>
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-display font-bold text-foreground text-sm sm:text-base">
                          Deep Emotion Analysis...
                        </h4>
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">
                          Detecting hidden & suppressed emotions ✨
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 sm:mt-4 h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-neon-purple via-neon-pink to-neon-red"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 8, ease: "easeInOut" }}
                      />
                    </div>
                  </motion.div>
                )}

                <motion.div
                  className="grid grid-cols-3 gap-2 sm:gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {[
                    { label: "Detection", value: "16 Emotions", emoji: "🔮" },
                    { label: "Powered by", value: "Gemini AI", emoji: "🧠" },
                    { label: "Detects", value: "Hidden + Suppressed", emoji: "🎭" },
                  ].map((stat) => (
                    <motion.div
                      key={stat.label}
                      className="glass-panel rounded-lg sm:rounded-xl p-2 sm:p-4 text-center"
                      whileHover={{ y: -5 }}
                    >
                      <div className="text-lg sm:text-2xl mb-1">{stat.emoji}</div>
                      <p className="text-[10px] sm:text-sm font-display font-bold gradient-text leading-tight">
                        {stat.value}
                      </p>
                      <p className="text-[9px] sm:text-xs text-muted-foreground font-medium mt-0.5 sm:mt-1">
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              <RealAnalysisDashboard isAnalyzed={isAnalyzed} analysisResult={analysisResult} />
            </div>

            {isAnalyzed && (
              <div className="grid sm:grid-cols-2 gap-4 mt-6 max-w-6xl mx-auto">
                <ExitPoll isVisible={true} onDismiss={() => {}} />
                <ShareResults isVisible={true} analysisResult={analysisResult} />
              </div>
            )}
          </section>
        </div>

        {/* Transparency Section */}
        <TransparencySection />

        {/* Sample Output Section */}
        <SampleOutputSection />

        {/* Real World Use Cases */}
        <RealWorldUseCases />

        {/* How It Works */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <motion.div
            className="text-center mb-10 sm:mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
              Simple 3-Step Process 🚀
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Upload or Record", desc: "Use webcam, record audio, or upload a video of yourself", emoji: "📹" },
              { step: "2", title: "Deep AI Analysis", desc: "AI detects surface, hidden, AND suppressed emotions", emoji: "🔮" },
              { step: "3", title: "Get Deep Insights", desc: "Receive insights about what you're truly feeling inside", emoji: "💜" }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                className="text-center glass-panel sm:bg-transparent rounded-xl sm:rounded-none p-4 sm:p-0 border sm:border-0 border-border/30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{item.emoji}</div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-lg sm:text-xl">{item.step}</span>
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold mb-1 sm:mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Feedbacks Section */}
        <section className="container mx-auto px-4 sm:px-6">
          <FeedbacksSection />
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 text-center border-t border-border/30">
          <p className="text-muted-foreground mb-2 text-sm sm:text-base">
            Made with 💜 for emotional awareness • Privacy-first • Your emotions, your data
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground/70">
            Made by <span className="font-semibold text-neon-pink">Naiyya Thapa</span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
