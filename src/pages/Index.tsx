import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import UploadZone from "@/components/UploadZone";
import AnalysisDashboard from "@/components/AnalysisDashboard";

const Index = () => {
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleUpload = () => {
    setIsAnalyzing(true);
    // Simulate analysis
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

        <div className="mt-12 grid lg:grid-cols-2 gap-8">
          {/* Left column - Upload */}
          <div className="space-y-6">
            <UploadZone onUpload={handleUpload} />
            
            {/* Analyzing state */}
            {isAnalyzing && (
              <motion.div
                className="glass-panel rounded-xl p-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <motion.div
                      className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-primary/20" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-foreground">
                      Analyzing Session...
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Processing facial expressions & audio patterns
                    </p>
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="mt-4 h-1 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-secondary"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                </div>
              </motion.div>
            )}

            {/* Feature highlights */}
            <motion.div
              className="grid grid-cols-3 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {[
                { label: "Detection", value: "Real-time" },
                { label: "Accuracy", value: "82%" },
                { label: "Latency", value: "<50ms" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="glass-panel rounded-lg p-4 text-center"
                >
                  <p className="text-xl font-display font-bold text-primary">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right column - Analysis */}
          <AnalysisDashboard isAnalyzed={isAnalyzed} />
        </div>

        {/* Footer note */}
        <motion.p
          className="mt-16 text-center text-xs text-muted-foreground/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Powered by advanced emotion recognition AI • Privacy-first processing
        </motion.p>
      </div>
    </div>
  );
};

export default Index;
