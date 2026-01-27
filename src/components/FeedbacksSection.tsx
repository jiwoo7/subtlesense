import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Feedback {
  id: string;
  feedback_text: string;
  rating: number;
  created_at: string;
}

const FeedbacksSection = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const { data } = await supabase
        .from("feedbacks")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(6);

      if (data) {
        setFeedbacks(data);
      }
    } catch (error) {
      console.error("Failed to fetch feedbacks:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-neon-pink fill-neon-pink" : "text-muted-foreground/30"}`}
      />
    ));
  };

  if (loading) {
    return (
      <motion.section
        className="mt-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold gradient-text mb-3">
            What Users Say 💬
          </h2>
          <p className="text-muted-foreground">Real feedback from our community</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-panel rounded-2xl p-6 animate-pulse">
              <div className="h-4 bg-muted rounded w-24 mb-3" />
              <div className="h-16 bg-muted rounded mb-3" />
              <div className="h-3 bg-muted rounded w-20" />
            </div>
          ))}
        </div>
      </motion.section>
    );
  }

  if (feedbacks.length === 0) {
    return null;
  }

  return (
    <motion.section
      className="mt-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="text-center mb-10">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-purple/20 border border-neon-purple/30 mb-4"
        >
          <MessageSquare className="w-4 h-4 text-neon-purple" />
          <span className="text-sm font-semibold text-neon-purple">User Feedback</span>
        </motion.div>
        <h2 className="font-display text-3xl font-bold gradient-text mb-3">
          What Users Say 💬
        </h2>
        <p className="text-muted-foreground">Real feedback from our community</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedbacks.map((fb, index) => (
          <motion.div
            key={fb.id}
            className="glass-panel rounded-2xl p-6 border border-border/50 hover:border-neon-purple/30 transition-all"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center gap-1 mb-3">
              {renderStars(fb.rating)}
            </div>
            <p className="text-foreground line-clamp-4 mb-4">
              "{fb.feedback_text}"
            </p>
            <p className="text-xs text-muted-foreground">
              {new Date(fb.created_at).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default FeedbacksSection;
