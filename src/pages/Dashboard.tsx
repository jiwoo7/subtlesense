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
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type UploadType = "webcam" | "audio" | "video" | null;

export interface AnalysisResult {
  confusion: number;
  frustration: number;
  focus: number;
  accuracy: number;
  suggestions: Array<{
    title: string;
    description: string;
    icon: string;
    variant: string;
  }>;
  advice: string;
  uploadType: UploadType;
}

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"analyze" | "history" | "moodboard">("analyze");
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

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
        const { error } = await supabase.from("emotion_sessions").insert({
          user_id: user.id,
          upload_type: result.uploadType,
          confusion_level: result.confusion,
          frustration_level: result.frustration,
          focus_level: result.focus,
          accuracy: result.accuracy,
          ai_suggestions: result.suggestions,
          ai_advice: result.advice
        });

        if (error) throw error;
        toast.success("Analysis saved to your history! 📊");
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
      
      <div className="relative z-10 container mx-auto px-6 py-6 max-w-6xl">
        <DashboardHeader activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "analyze" && (
          <div className="mt-8 grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <MediaUploadZone 
                onStartAnalysis={handleStartAnalysis}
                onAnalysisComplete={handleAnalysisComplete}
                isAnalyzing={isAnalyzing}
              />
              
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
                        <span className="text-xl">🧠</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-foreground">
                        AI is Analyzing...
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Detecting your emotional patterns ✨
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full pastel-gradient"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 8, ease: "easeInOut" }}
                    />
                  </div>
                </motion.div>
              )}

              {/* Quick stats */}
              <motion.div
                className="grid grid-cols-3 gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {[
                  { label: "Detection", value: "Real-time", emoji: "⚡" },
                  { label: "Powered by", value: "Gemini AI", emoji: "🧠" },
                  { label: "Response", value: "<5s", emoji: "🚀" },
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

            <RealAnalysisDashboard isAnalyzed={isAnalyzed} analysisResult={analysisResult} />
          </div>
        )}

        {activeTab === "history" && <SessionHistory />}
        {activeTab === "moodboard" && <MoodBoard />}

        {activeTab === "analyze" && <StatsSection />}
      </div>
    </div>
  );
};

export default Dashboard;
