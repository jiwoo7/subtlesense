import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, TrendingDown, Target, Brain, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { format } from "date-fns";

interface SessionStats {
  totalSessions: number;
  avgConfusion: number;
  avgFrustration: number;
  avgFocus: number;
  confusionTrend: "up" | "down" | "stable";
  frustrationTrend: "up" | "down" | "stable";
  focusTrend: "up" | "down" | "stable";
}

interface MoodAdvice {
  doList: string[];
  dontList: string[];
  overallMood: "positive" | "neutral" | "needs-attention";
  summary: string;
}

const MoodBoard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<SessionStats | null>(null);
  const [advice, setAdvice] = useState<MoodAdvice | null>(null);
  const [loading, setLoading] = useState(true);
  const [generatingAdvice, setGeneratingAdvice] = useState(false);

  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      const { data: sessions, error } = await supabase
        .from("emotion_sessions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);

      if (error) throw error;

      if (!sessions || sessions.length === 0) {
        setStats(null);
        setLoading(false);
        return;
      }

      // Calculate averages
      const totalSessions = sessions.length;
      const avgConfusion = Math.round(sessions.reduce((sum, s) => sum + s.confusion_level, 0) / totalSessions);
      const avgFrustration = Math.round(sessions.reduce((sum, s) => sum + s.frustration_level, 0) / totalSessions);
      const avgFocus = Math.round(sessions.reduce((sum, s) => sum + s.focus_level, 0) / totalSessions);

      // Calculate trends (compare recent 5 vs previous 5)
      const recent = sessions.slice(0, 5);
      const previous = sessions.slice(5, 10);

      const getTrend = (metric: "confusion_level" | "frustration_level" | "focus_level"): "up" | "down" | "stable" => {
        if (previous.length === 0) return "stable";
        const recentAvg = recent.reduce((sum, s) => sum + s[metric], 0) / recent.length;
        const previousAvg = previous.reduce((sum, s) => sum + s[metric], 0) / previous.length;
        const diff = recentAvg - previousAvg;
        if (Math.abs(diff) < 5) return "stable";
        return diff > 0 ? "up" : "down";
      };

      setStats({
        totalSessions,
        avgConfusion,
        avgFrustration,
        avgFocus,
        confusionTrend: getTrend("confusion_level"),
        frustrationTrend: getTrend("frustration_level"),
        focusTrend: getTrend("focus_level")
      });

      // Generate AI advice
      generateAdvice(avgConfusion, avgFrustration, avgFocus);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
      toast.error("Failed to load mood board");
    } finally {
      setLoading(false);
    }
  };

  const generateAdvice = async (confusion: number, frustration: number, focus: number) => {
    setGeneratingAdvice(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-mood-advice", {
        body: { confusion, frustration, focus }
      });

      if (error) throw error;
      setAdvice(data);
    } catch (error) {
      console.error("Failed to generate advice:", error);
      // Fallback advice
      setAdvice({
        overallMood: focus > 60 && confusion < 50 ? "positive" : 
                     frustration > 60 || confusion > 70 ? "needs-attention" : "neutral",
        summary: "Based on your recent sessions, keep up the learning journey!",
        doList: [
          "Take regular breaks every 25-30 minutes",
          "Break complex topics into smaller chunks",
          "Practice active recall techniques",
          "Stay hydrated and maintain good posture"
        ],
        dontList: [
          "Don't push through when frustrated",
          "Avoid multitasking during learning sessions",
          "Don't skip rest when feeling confused",
          "Avoid long sessions without movement"
        ]
      });
    } finally {
      setGeneratingAdvice(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-8 flex items-center justify-center py-20">
        <motion.div
          className="w-12 h-12 rounded-full border-3 border-primary border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (!stats) {
    return (
      <motion.div
        className="mt-8 glass-panel rounded-3xl p-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <BarChart3 className="w-16 h-16 text-pastel-lavender mx-auto mb-4" />
        <h3 className="font-display text-xl font-bold mb-2">No Data Yet</h3>
        <p className="text-muted-foreground">
          Complete a few analysis sessions to see your mood board and personalized advice! 🎯
        </p>
      </motion.div>
    );
  }

  const moodColor = advice?.overallMood === "positive" ? "pastel-mint" :
                    advice?.overallMood === "needs-attention" ? "pastel-pink" : "pastel-lavender";

  return (
    <motion.div
      className="mt-8 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 className="w-6 h-6 text-pastel-lavender" />
        <h2 className="font-display text-2xl font-bold">Your Mood Board 🎨</h2>
      </div>

      {/* Summary Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <motion.div
          className="glass-panel rounded-2xl p-6 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Target className="w-8 h-8 text-pastel-yellow mx-auto mb-2" />
          <p className="text-3xl font-display font-bold gradient-text">{stats.totalSessions}</p>
          <p className="text-sm text-muted-foreground">Total Sessions</p>
        </motion.div>

        <motion.div
          className="glass-panel rounded-2xl p-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Avg Confusion</span>
            {stats.confusionTrend === "down" ? (
              <TrendingDown className="w-4 h-4 text-green-500" />
            ) : stats.confusionTrend === "up" ? (
              <TrendingUp className="w-4 h-4 text-red-500" />
            ) : null}
          </div>
          <p className="text-2xl font-display font-bold text-foreground">{stats.avgConfusion}%</p>
          <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full bg-pastel-sky"
              initial={{ width: 0 }}
              animate={{ width: `${stats.avgConfusion}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </motion.div>

        <motion.div
          className="glass-panel rounded-2xl p-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Avg Frustration</span>
            {stats.frustrationTrend === "down" ? (
              <TrendingDown className="w-4 h-4 text-green-500" />
            ) : stats.frustrationTrend === "up" ? (
              <TrendingUp className="w-4 h-4 text-red-500" />
            ) : null}
          </div>
          <p className="text-2xl font-display font-bold text-foreground">{stats.avgFrustration}%</p>
          <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full bg-pastel-pink"
              initial={{ width: 0 }}
              animate={{ width: `${stats.avgFrustration}%` }}
              transition={{ duration: 1, delay: 0.6 }}
            />
          </div>
        </motion.div>

        <motion.div
          className="glass-panel rounded-2xl p-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Avg Focus</span>
            {stats.focusTrend === "up" ? (
              <TrendingUp className="w-4 h-4 text-green-500" />
            ) : stats.focusTrend === "down" ? (
              <TrendingDown className="w-4 h-4 text-red-500" />
            ) : null}
          </div>
          <p className="text-2xl font-display font-bold text-foreground">{stats.avgFocus}%</p>
          <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full bg-pastel-mint"
              initial={{ width: 0 }}
              animate={{ width: `${stats.avgFocus}%` }}
              transition={{ duration: 1, delay: 0.7 }}
            />
          </div>
        </motion.div>
      </div>

      {/* AI Summary */}
      {advice && (
        <motion.div
          className={`glass-panel rounded-2xl p-6 border-2 border-${moodColor}/30`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-6 h-6 text-pastel-lavender" />
            <h3 className="font-display text-lg font-bold">AI Summary</h3>
            {generatingAdvice && (
              <motion.div
                className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            )}
          </div>
          <p className="text-muted-foreground">{advice.summary}</p>
        </motion.div>
      )}

      {/* Do's and Don'ts */}
      {advice && (
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            className="glass-panel rounded-2xl p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <h3 className="font-display text-lg font-bold text-green-700">What to Do ✅</h3>
            </div>
            <ul className="space-y-3">
              {advice.doList.map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3 text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <span className="text-green-500 mt-0.5">•</span>
                  <span className="text-muted-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="glass-panel rounded-2xl p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <XCircle className="w-5 h-5 text-red-400" />
              <h3 className="font-display text-lg font-bold text-red-600">What to Avoid ❌</h3>
            </div>
            <ul className="space-y-3">
              {advice.dontList.map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3 text-sm"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <span className="text-red-400 mt-0.5">•</span>
                  <span className="text-muted-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default MoodBoard;
