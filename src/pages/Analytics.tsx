import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Users, TrendingUp, MessageSquare, Star, ArrowLeft, Heart, Calendar, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import AnimatedBackground from "@/components/AnimatedBackground";

interface MoodStats {
  date: string;
  session_count: number;
  avg_focus: number;
  avg_frustration: number;
  avg_confusion: number;
}

interface Feedback {
  id: string;
  feedback_text: string;
  rating: number;
  created_at: string;
}

interface AggregatedEmotions {
  name: string;
  value: number;
  color: string;
}

const Analytics = () => {
  const navigate = useNavigate();
  const [moodData, setMoodData] = useState<MoodStats[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalSessions, setTotalSessions] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [emotionBreakdown, setEmotionBreakdown] = useState<AggregatedEmotions[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Fetch mood analytics from view
      const { data: moodStats } = await supabase
        .from("mood_analytics")
        .select("*")
        .limit(30);

      if (moodStats) {
        setMoodData(moodStats.map(s => ({
          date: new Date(s.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          session_count: Number(s.session_count),
          avg_focus: Math.round(Number(s.avg_focus)),
          avg_frustration: Math.round(Number(s.avg_frustration)),
          avg_confusion: Math.round(Number(s.avg_confusion))
        })).reverse());

        setTotalSessions(moodStats.reduce((acc, s) => acc + Number(s.session_count), 0));
      }

      // Fetch all feedbacks
      const { data: feedbackData } = await supabase
        .from("feedbacks")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);

      if (feedbackData) {
        setFeedbacks(feedbackData);
        if (feedbackData.length > 0) {
          const avg = feedbackData.reduce((acc, f) => acc + (f.rating || 0), 0) / feedbackData.length;
          setAvgRating(Math.round(avg * 10) / 10);
        }
      }

      // Count unique users from sessions
      const { data: sessions } = await supabase
        .from("emotion_sessions")
        .select("user_id");

      if (sessions) {
        const uniqueUsers = new Set(sessions.map(s => s.user_id));
        setTotalUsers(uniqueUsers.size);

        // Calculate emotion breakdown
        const { data: allSessions } = await supabase
          .from("emotion_sessions")
          .select("focus_level, frustration_level, confusion_level");

        if (allSessions && allSessions.length > 0) {
          const avgFocus = allSessions.reduce((acc, s) => acc + s.focus_level, 0) / allSessions.length;
          const avgFrustration = allSessions.reduce((acc, s) => acc + s.frustration_level, 0) / allSessions.length;
          const avgConfusion = allSessions.reduce((acc, s) => acc + s.confusion_level, 0) / allSessions.length;

          setEmotionBreakdown([
            { name: "Focus", value: Math.round(avgFocus), color: "hsl(160, 50%, 78%)" },
            { name: "Frustration", value: Math.round(avgFrustration), color: "hsl(25, 80%, 70%)" },
            { name: "Confusion", value: Math.round(avgConfusion), color: "hsl(200, 70%, 70%)" }
          ]);
        }
      }
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-pastel-yellow fill-pastel-yellow" : "text-muted-foreground/30"}`}
      />
    ));
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
      
      <div className="relative z-10 container mx-auto px-6 py-6 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="rounded-xl"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-display text-3xl font-bold gradient-text">
                Community Analytics 📊
              </h1>
              <p className="text-muted-foreground">
                See how everyone is learning and growing together
              </p>
            </div>
          </div>
          <Button
            onClick={() => navigate("/auth")}
            className="pastel-gradient text-white font-semibold"
          >
            Try EmotionAI
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Users, label: "Total Users", value: totalUsers.toLocaleString(), color: "pastel-pink" },
            { icon: Activity, label: "Total Analyses", value: totalSessions.toLocaleString(), color: "pastel-lavender" },
            { icon: Star, label: "Avg Rating", value: `${avgRating}/5`, color: "pastel-yellow" },
            { icon: MessageSquare, label: "Feedbacks", value: feedbacks.length.toLocaleString(), color: "pastel-mint" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass-panel rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`w-10 h-10 rounded-xl bg-${stat.color}/30 flex items-center justify-center mb-3`}>
                <stat.icon className={`w-5 h-5 text-${stat.color}`} />
              </div>
              <p className="text-2xl font-display font-bold gradient-text">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mood Trends Chart */}
            <motion.div
              className="glass-panel rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-pastel-lavender" />
                <h2 className="font-display text-xl font-bold">Mood Trends Over Time</h2>
              </div>
              
              {moodData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={moodData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(270, 30%, 90%)" />
                    <XAxis dataKey="date" stroke="hsl(270, 20%, 50%)" fontSize={12} />
                    <YAxis stroke="hsl(270, 20%, 50%)" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        background: "rgba(255,255,255,0.9)", 
                        border: "1px solid hsl(270, 60%, 85%)",
                        borderRadius: "12px"
                      }} 
                    />
                    <Line type="monotone" dataKey="avg_focus" stroke="hsl(160, 50%, 60%)" strokeWidth={3} dot={{ fill: "hsl(160, 50%, 60%)" }} name="Focus" />
                    <Line type="monotone" dataKey="avg_frustration" stroke="hsl(25, 80%, 60%)" strokeWidth={3} dot={{ fill: "hsl(25, 80%, 60%)" }} name="Frustration" />
                    <Line type="monotone" dataKey="avg_confusion" stroke="hsl(200, 70%, 60%)" strokeWidth={3} dot={{ fill: "hsl(200, 70%, 60%)" }} name="Confusion" />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  No data yet. Be the first to analyze! 🚀
                </div>
              )}
            </motion.div>

            {/* Sessions Per Day */}
            <motion.div
              className="glass-panel rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-5 h-5 text-pastel-mint" />
                <h2 className="font-display text-xl font-bold">Daily Activity</h2>
              </div>
              
              {moodData.length > 0 ? (
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={moodData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(270, 30%, 90%)" />
                    <XAxis dataKey="date" stroke="hsl(270, 20%, 50%)" fontSize={12} />
                    <YAxis stroke="hsl(270, 20%, 50%)" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        background: "rgba(255,255,255,0.9)", 
                        border: "1px solid hsl(270, 60%, 85%)",
                        borderRadius: "12px"
                      }} 
                    />
                    <Bar dataKey="session_count" fill="hsl(330, 70%, 75%)" radius={[8, 8, 0, 0]} name="Sessions" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                  No activity data yet 📊
                </div>
              )}
            </motion.div>

            {/* Emotion Breakdown */}
            <motion.div
              className="glass-panel rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Heart className="w-5 h-5 text-pastel-pink" />
                <h2 className="font-display text-xl font-bold">Average Emotion Levels</h2>
              </div>
              
              {emotionBreakdown.length > 0 ? (
                <div className="flex items-center justify-center gap-8">
                  <ResponsiveContainer width={200} height={200}>
                    <PieChart>
                      <Pie
                        data={emotionBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        dataKey="value"
                        strokeWidth={0}
                      >
                        {emotionBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-3">
                    {emotionBreakdown.map((emotion) => (
                      <div key={emotion.name} className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: emotion.color }}
                        />
                        <span className="font-medium">{emotion.name}</span>
                        <span className="text-muted-foreground">{emotion.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                  No emotion data yet 💜
                </div>
              )}
            </motion.div>
          </div>

          {/* Feedbacks Sidebar */}
          <motion.div
            className="glass-panel rounded-2xl p-6 h-fit max-h-[800px] overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare className="w-5 h-5 text-pastel-sky" />
              <h2 className="font-display text-xl font-bold">User Feedback</h2>
            </div>

            <div className="space-y-4 overflow-y-auto max-h-[700px] pr-2">
              {feedbacks.length > 0 ? (
                feedbacks.map((fb, index) => (
                  <motion.div
                    key={fb.id}
                    className="p-4 rounded-xl bg-muted/50 border border-border/50"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                  >
                    <div className="flex items-center gap-1 mb-2">
                      {renderStars(fb.rating)}
                    </div>
                    <p className="text-sm text-foreground line-clamp-3">
                      "{fb.feedback_text}"
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(fb.created_at).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No feedback yet</p>
                  <p className="text-sm">Be the first to share! 💬</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
