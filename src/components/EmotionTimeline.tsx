import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";

interface TimelineData {
  date: string;
  confusion: number;
  frustration: number;
  focus: number;
}

const EmotionTimeline = () => {
  const { user } = useAuth();
  const [data, setData] = useState<TimelineData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchData();
      return;
    }
    setData([]);
    setLoading(false);
  }, [user]);

  const fetchData = async () => {
    try {
      const { data: sessions, error } = await supabase
        .from("emotion_sessions")
        .select("confusion_level, frustration_level, focus_level, created_at")
        .order("created_at", { ascending: true })
        .limit(30);

      if (error) throw error;

      const chartData = (sessions || []).map((s) => ({
        date: format(new Date(s.created_at), "MMM d"),
        confusion: s.confusion_level,
        frustration: s.frustration_level,
        focus: s.focus_level,
      }));

      setData(chartData);
    } catch (e) {
      console.error("Failed to fetch timeline:", e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="glass-panel rounded-2xl p-6 flex items-center justify-center h-64">
        <motion.div
          className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (data.length < 2) {
    return (
      <motion.div
        className="glass-panel rounded-2xl p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
        <h3 className="font-display font-bold text-foreground mb-1">{user ? "Not Enough Data Yet" : "Login to save trends"}</h3>
        <p className="text-sm text-muted-foreground">
          {user ? "Complete at least 2 sessions to see your emotion trends 📈" : "Analysis still works now. Your timeline appears here after saved sessions."}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="glass-panel rounded-2xl p-4 sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-primary" />
        <h3 className="font-display font-bold text-foreground">Emotion Trends 📈</h3>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="date"
              stroke="hsl(var(--muted-foreground))"
              fontSize={11}
              tickLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={11}
              tickLine={false}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.75rem",
                color: "hsl(var(--foreground))",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="confusion"
              stroke="hsl(var(--neon-purple))"
              strokeWidth={2}
              dot={{ r: 3 }}
              name="Confusion"
            />
            <Line
              type="monotone"
              dataKey="frustration"
              stroke="hsl(var(--neon-red))"
              strokeWidth={2}
              dot={{ r: 3 }}
              name="Frustration"
            />
            <Line
              type="monotone"
              dataKey="focus"
              stroke="hsl(var(--success))"
              strokeWidth={2}
              dot={{ r: 3 }}
              name="Focus"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default EmotionTimeline;
