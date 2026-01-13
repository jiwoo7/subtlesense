import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import UploadZone from "@/components/UploadZone";
import AnalysisDashboard from "@/components/AnalysisDashboard";
import StatsSection from "@/components/StatsSection";
import ImportanceSection from "@/components/ImportanceSection";
import UsersSection from "@/components/UsersSection";
import HowItHelpsSection from "@/components/HowItHelpsSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleUpload = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setIsAnalyzed(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 container mx-auto px-6 py-8 max-w-6xl">
        <Header />

        {/* Main interaction area */}
        <div className="mt-12 grid lg:grid-cols-2 gap-8">
          {/* Left column - Upload */}
          <div className="space-y-6">
            <UploadZone onUpload={handleUpload} />
            
            {/* Analyzing state */}
            {isAnalyzing && (
              <motion.div
                className="glass-panel rounded-2xl p-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <motion.div
                      className="w-12 h-12 rounded-full border-3 border-pastel-pink border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl">🔍</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-foreground">
                      Analyzing Your Session...
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Reading your emotional patterns ✨
                    </p>
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full pastel-gradient"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                </div>
              </motion.div>
            )}

            {/* Feature highlights */}
            <motion.div
              className="grid grid-cols-3 gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {[
                { label: "Detection", value: "Real-time", emoji: "⚡" },
                { label: "Accuracy", value: "82%", emoji: "🎯" },
                { label: "Response", value: "<50ms", emoji: "🚀" },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  className="glass-panel rounded-xl p-4 text-center"
                  whileHover={{ y: -5 }}
                >
                  <div className="text-2xl mb-1">{stat.emoji}</div>
                  <p className="text-lg font-display font-bold gradient-text">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground font-medium mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right column - Analysis */}
          <AnalysisDashboard isAnalyzed={isAnalyzed} />
        </div>

        {/* Stats Section */}
        <StatsSection />

        {/* Importance Section */}
        <ImportanceSection />

        {/* Users Section */}
        <UsersSection />

        {/* How It Helps Section */}
        <HowItHelpsSection />

        {/* CTA Section */}
        <CTASection />

        {/* Footer */}
        <motion.footer
          className="py-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-muted-foreground">
            Made with 💜 for learners everywhere • Privacy-first • Your emotions, your data
          </p>
        </motion.footer>
      </div>
    </div>
  );
};

export default Index;
