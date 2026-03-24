import { motion, AnimatePresence } from "framer-motion";
import { Twitter, Share2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import type { AnalysisResult } from "@/types/emotions";

interface ShareResultsProps {
  isVisible: boolean;
  analysisResult: AnalysisResult | null;
}

const ShareResults = ({ isVisible, analysisResult }: ShareResultsProps) => {
  const [copied, setCopied] = useState(false);

  if (!analysisResult) return null;

  const dominantEmotion = (() => {
    const emotions = [
      { name: "Happiness", val: analysisResult.happiness },
      { name: "Sadness", val: analysisResult.sadness },
      { name: "Surprise", val: analysisResult.surprise },
      { name: "Fear", val: analysisResult.fear },
      { name: "Anger", val: analysisResult.anger },
    ];
    return emotions.sort((a, b) => b.val - a.val)[0]?.name || "complex emotions";
  })();

  const tweetText = `🔮 Just discovered my hidden emotions with SubtleSense AI!\n\nDominant emotion: ${dominantEmotion}\nAI Confidence: ${analysisResult.accuracy}%\n\nIt detects 16 emotions including hidden & suppressed ones 🎭\n\nTry it yourself 👇\nhttps://subtlesense.lovable.app\n\n#SubtleSenseAI #EmotionAI #MentalHealth`;

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(tweetText);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="glass-panel rounded-2xl p-5 border border-accent/30"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Share2 className="w-5 h-5 text-primary" />
            <h4 className="font-display font-bold text-foreground text-sm">
              Share your results! 🚀
            </h4>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            Let others discover their hidden emotions too
          </p>
          <div className="flex gap-2">
            <Button
              onClick={() => window.open(tweetUrl, "_blank", "noopener,noreferrer")}
              className="flex-1 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white font-semibold text-sm"
              size="sm"
            >
              <Twitter className="w-4 h-4 mr-1" />
              Tweet your results!
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="px-3"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground mt-2 text-center">
            #SubtleSenseAI
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShareResults;
