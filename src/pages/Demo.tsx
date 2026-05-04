import { motion } from "framer-motion";
import { ArrowLeft, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import AnimatedBackground from "@/components/AnimatedBackground";
import RealAnalysisDashboard from "@/components/RealAnalysisDashboard";
import type { AnalysisResult } from "@/types/emotions";

// Sample analysis result to showcase the product
const DEMO_ANALYSIS: AnalysisResult = {
  // Surface Emotions
  happiness: 45,
  sadness: 15,
  anger: 8,
  fear: 12,
  surprise: 22,
  disgust: 5,
  // Hidden Emotions
  hiddenAnxiety: 38,
  hiddenInsecurity: 25,
  hiddenLoneliness: 18,
  hiddenGuilt: 12,
  hiddenHappiness: 22,
  hiddenLove: 30,
  // Suppressed Emotions
  suppressedAnger: 28,
  suppressedSadness: 35,
  suppressedFear: 20,
  suppressedDesire: 42,
  suppressedJoy: 18,
  suppressedLove: 26,
  // Meta States
  emotionalMasking: 55,
  innerConflict: 32,
  // Analysis meta
  accuracy: 87,
  uploadType: "webcam",
  deepInsight: "You're presenting a calm and positive exterior, but there's significant emotional processing happening beneath the surface. Your hidden anxiety and suppressed desire suggest you may be holding back from expressing what you truly want. This is common when navigating uncertainty or change.",
  advice: "Consider journaling about what you're holding back. Sometimes acknowledging suppressed emotions helps release their grip on us. You're doing great—self-awareness is the first step! 💜",
  suggestions: [
    {
      title: "Take a 5-Minute Breathing Break",
      description: "Your hidden anxiety levels suggest deep breathing could help. Try 4-7-8 breathing: inhale 4s, hold 7s, exhale 8s.",
      icon: "coffee",
      variant: "lavender"
    },
    {
      title: "Express What You're Holding Back",
      description: "High suppressed desire detected. Consider writing down what you truly want—even if just for yourself.",
      icon: "lightbulb",
      variant: "pink"
    },
    {
      title: "Connect With Someone",
      description: "Some hidden loneliness detected. A quick call or message to a friend could boost your emotional state.",
      icon: "heart",
      variant: "mint"
    },
    {
      title: "Gentle Movement",
      description: "Physical activity can help process suppressed emotions. A short walk or stretch session would help.",
      icon: "stretch",
      variant: "sky"
    }
  ]
};

const Demo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <nav className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
            <Button 
              onClick={() => navigate("/auth")}
              className="bg-gradient-to-r from-neon-purple to-neon-pink text-white font-semibold"
            >
              Get Started Free
            </Button>
          </nav>
        </header>

        {/* Demo Content */}
        <section className="container mx-auto px-4 sm:px-6 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Demo Header */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Play className="w-4 h-4 text-neon-pink" />
                <span className="text-sm font-medium">Demo Analysis</span>
              </motion.div>
              
              <h1 className="font-display text-3xl sm:text-4xl font-bold mb-3">
                See What Subtle Sense Reveals ✨
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                This is a sample analysis showing what you'll discover about your emotions. 
                Sign up free to analyze your own!
              </p>
            </motion.div>

            {/* Sample Analysis Dashboard */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <RealAnalysisDashboard 
                isAnalyzed={true} 
                analysisResult={DEMO_ANALYSIS} 
              />
            </motion.div>

            {/* CTA */}
            <motion.div
              className="text-center mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-neon-purple/30">
                <h2 className="font-display text-xl sm:text-2xl font-bold mb-3">
                  Ready to Discover Your True Emotions? 🔮
                </h2>
                <p className="text-muted-foreground mb-6">
                  Get your own personalized deep analysis in under 30 seconds
                </p>
                <Button
                  size="lg"
                  onClick={() => navigate("/auth")}
                  className="bg-gradient-to-r from-neon-purple to-neon-pink text-white font-bold px-8"
                >
                  Start Your Free Analysis
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Demo;
