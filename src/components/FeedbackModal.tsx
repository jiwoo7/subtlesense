import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, Send, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessionId?: string;
}

const FeedbackModal = ({ isOpen, onClose, sessionId }: FeedbackModalProps) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!user || rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("feedbacks").insert({
        user_id: user.id,
        session_id: sessionId || null,
        rating,
        feedback_text: feedback || "No additional feedback"
      });

      if (error) throw error;

      toast.success("Thank you for your feedback! 💜");
      setRating(0);
      setFeedback("");
      onClose();
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      toast.error("Failed to submit feedback");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-panel border-0 max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-bold text-center flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-pastel-yellow" />
            How was your analysis?
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Star Rating */}
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                className="p-1"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Star
                  className={`w-10 h-10 transition-colors ${
                    star <= (hoverRating || rating)
                      ? "text-pastel-yellow fill-pastel-yellow"
                      : "text-muted-foreground/30"
                  }`}
                />
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            {rating > 0 && (
              <motion.p
                className="text-center text-muted-foreground font-medium"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {rating === 1 && "We'll do better! 😢"}
                {rating === 2 && "Room for improvement 🤔"}
                {rating === 3 && "Good experience! 🙂"}
                {rating === 4 && "Great analysis! 😊"}
                {rating === 5 && "Amazing! Thank you! 🎉"}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Feedback Text */}
          <Textarea
            placeholder="Share your thoughts... What can we improve? 💭"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="min-h-[100px] resize-none border-pastel-lavender/30 focus:border-pastel-lavender"
          />

          {/* Submit Button */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Skip
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || rating === 0}
              className="flex-1 pastel-gradient text-white font-semibold"
            >
              {isSubmitting ? (
                <motion.div
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                <>
                  Submit
                  <Send className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;
