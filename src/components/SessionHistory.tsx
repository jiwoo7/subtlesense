import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { History, Trash2, Calendar, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { format } from "date-fns";

interface Session {
  id: string;
  upload_type: string;
  confusion_level: number;
  frustration_level: number;
  focus_level: number;
  accuracy: number;
  ai_advice: string | null;
  created_at: string;
}

const SessionHistory = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchSessions();
    }
  }, [user]);

  const fetchSessions = async () => {
    try {
      const { data, error } = await supabase
        .from("emotion_sessions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) throw error;
      setSessions(data || []);
    } catch (error) {
      console.error("Failed to fetch sessions:", error);
      toast.error("Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  const deleteSession = async (id: string) => {
    try {
      const { error } = await supabase
        .from("emotion_sessions")
        .delete()
        .eq("id", id);

      if (error) throw error;
      
      setSessions(sessions.filter(s => s.id !== id));
      toast.success("Session deleted");
    } catch (error) {
      console.error("Failed to delete session:", error);
      toast.error("Failed to delete session");
    }
  };

  const getTrend = (current: number, type: "confusion" | "frustration" | "focus") => {
    if (sessions.length < 2) return null;
    
    const previousSessions = sessions.slice(1, 6);
    const avgPrevious = previousSessions.reduce((sum, s) => {
      const value = type === "confusion" ? s.confusion_level : 
                    type === "frustration" ? s.frustration_level : s.focus_level;
      return sum + value;
    }, 0) / previousSessions.length;

    const diff = current - avgPrevious;
    
    if (Math.abs(diff) < 5) return "stable";
    if (type === "focus") {
      return diff > 0 ? "up" : "down";
    }
    return diff > 0 ? "up" : "down";
  };

  const getTypeEmoji = (type: string) => {
    switch (type) {
      case "webcam": return "📸";
      case "audio": return "🎙️";
      case "video": return "🎬";
      default: return "📊";
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

  return (
    <motion.div
      className="mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <History className="w-6 h-6 text-pastel-lavender" />
        <h2 className="font-display text-2xl font-bold">Session Timeline 📊</h2>
      </div>

      {sessions.length === 0 ? (
        <motion.div
          className="glass-panel rounded-3xl p-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Calendar className="w-16 h-16 text-pastel-lavender mx-auto mb-4" />
          <h3 className="font-display text-xl font-bold mb-2">No Sessions Yet</h3>
          <p className="text-muted-foreground">
            Start your first analysis to see your emotional journey here! 🚀
          </p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {sessions.map((session, index) => (
            <motion.div
              key={session.id}
              className="glass-panel rounded-2xl p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{getTypeEmoji(session.upload_type)}</span>
                    <div>
                      <p className="font-display font-bold text-foreground capitalize">
                        {session.upload_type} Analysis
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(session.created_at), "MMM d, yyyy 'at' h:mm a")}
                      </p>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-pastel-sky/20">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Confusion</span>
                        {getTrend(session.confusion_level, "confusion") === "up" && 
                          <TrendingUp className="w-3 h-3 text-red-500" />}
                        {getTrend(session.confusion_level, "confusion") === "down" && 
                          <TrendingDown className="w-3 h-3 text-green-500" />}
                        {getTrend(session.confusion_level, "confusion") === "stable" && 
                          <Minus className="w-3 h-3 text-gray-400" />}
                      </div>
                      <p className="text-lg font-bold text-foreground">{session.confusion_level}%</p>
                    </div>
                    <div className="p-3 rounded-xl bg-pastel-pink/20">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Frustration</span>
                        {getTrend(session.frustration_level, "frustration") === "up" && 
                          <TrendingUp className="w-3 h-3 text-red-500" />}
                        {getTrend(session.frustration_level, "frustration") === "down" && 
                          <TrendingDown className="w-3 h-3 text-green-500" />}
                      </div>
                      <p className="text-lg font-bold text-foreground">{session.frustration_level}%</p>
                    </div>
                    <div className="p-3 rounded-xl bg-pastel-mint/20">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Focus</span>
                        {getTrend(session.focus_level, "focus") === "up" && 
                          <TrendingUp className="w-3 h-3 text-green-500" />}
                        {getTrend(session.focus_level, "focus") === "down" && 
                          <TrendingDown className="w-3 h-3 text-red-500" />}
                      </div>
                      <p className="text-lg font-bold text-foreground">{session.focus_level}%</p>
                    </div>
                  </div>

                  {session.ai_advice && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      💡 {session.ai_advice}
                    </p>
                  )}
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteSession(session.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default SessionHistory;
