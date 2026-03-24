import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AnimatedBackground from "@/components/AnimatedBackground";
import DashboardHeader from "@/components/DashboardHeader";
import MediaUploadZone from "@/components/MediaUploadZone";
import RealAnalysisDashboard from "@/components/RealAnalysisDashboard";
import SessionHistory from "@/components/SessionHistory";
import MoodBoard from "@/components/MoodBoard";
import StatsSection from "@/components/StatsSection";
import FeedbackModal from "@/components/FeedbackModal";
import ExitPoll from "@/components/ExitPoll";
import ShareResults from "@/components/ShareResults";
import WelcomeMessage from "@/components/WelcomeMessage";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { AnalysisResult, UploadType } from "@/types/emotions";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"analyze" | "history" | "moodboard">("analyze");
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastSessionId, setLastSessionId] = useState<string | undefined>();
  const [showExitPoll, setShowExitPoll] = useState(false);
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const handleAnalysisComplete = async (result: AnalysisResult) => {
    setAnalysisResult(result);
    setIsAnalyzed(true);
    setIsAnalyzing(false);

    // Save to database
    if (user) {
      try {
        const { data, error } = await supabase.from("emotion_sessions").insert({
          user_id: user.id,
          upload_type: result.uploadType,
          confusion_level: result.hiddenAnxiety,
          frustration_level: Math.round((result.suppressedAnger + result.innerConflict) / 2),
          focus_level: 100 - result.emotionalMasking,
          accuracy: result.accuracy,
          ai_suggestions: result.suggestions,
          ai_advice: result.advice
        }).select("id").single();

        if (error) throw error;
        
        setLastSessionId(data?.id);
        toast.success("Deep analysis saved! 🔮");
        
        setTimeout(() => {
          setShowFeedback(true);
        }, 2000);
      } catch (error) {
        console.error("Failed to save session:", error);
        toast.error("Failed to save session");
      }
    }
  };

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setIsAnalyzed(false);
    setAnalysisResult(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-4 sm:py-6 max-w-6xl">
        <DashboardHeader activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "analyze" && (
          <>
            <div className="mt-4 sm:mt-6">
              <WelcomeMessage />
            </div>

            <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
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

              {/* Quick stats - Mobile optimized */}
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
          </>
        )}

        {activeTab === "history" && <SessionHistory />}
        {activeTab === "moodboard" && <MoodBoard />}

        {activeTab === "analyze" && <StatsSection />}
      </div>

      <FeedbackModal
        isOpen={showFeedback}
        onClose={() => {
          setShowFeedback(false);
          setShowExitPoll(true);
          setTimeout(() => setShowShare(true), 500);
        }}
        sessionId={lastSessionId}
      />
    </div>
  );
};

export default Dashboard;
