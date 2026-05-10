import { motion } from "framer-motion";
import { Check, X, Crown, Sparkles, Brain, BookOpen, Mail, BarChart3, Gamepad2, Infinity as InfinityIcon, History, Zap, Flame, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const rows: { icon: any; feature: string; free: string | boolean; premium: string | boolean }[] = [
  { icon: Brain, feature: "Emotion detection", free: "10 / day", premium: "Unlimited • 95%+" },
  { icon: Heart, feature: "Hidden & suppressed emotions", free: false, premium: true },
  { icon: BookOpen, feature: "Mood journaling", free: "Basic entries", premium: "AI reflections" },
  { icon: Flame, feature: "Streak counter", free: "Basic", premium: "Advanced" },
  { icon: History, feature: "History", free: "7 days", premium: "Lifetime" },
  { icon: BarChart3, feature: "Moodboard & themes", free: false, premium: true },
  { icon: Mail, feature: "Weekly email reports", free: false, premium: true },
  { icon: Gamepad2, feature: "Mindful games & training", free: false, premium: true },
  { icon: Zap, feature: "Early access to new AI", free: false, premium: true },
  { icon: InfinityIcon, feature: "Export reports (PDF)", free: false, premium: true },
];

const Cell = ({ v }: { v: string | boolean }) => {
  if (v === true) return <Check className="w-4 h-4 sm:w-5 sm:h-5 text-neon-pink mx-auto" />;
  if (v === false) return <X className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground/50 mx-auto" />;
  return <span className="text-[10px] sm:text-xs font-semibold text-center block leading-tight">{v}</span>;
};

const PremiumComparisonTable = () => {
  const navigate = useNavigate();
  return (
    <section className="container mx-auto px-3 sm:px-6 py-10 sm:py-16">
      <motion.div
        className="text-center mb-6 sm:mb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full glass-panel mb-3">
          <Crown className="w-3 h-3 text-warning" />
          <span className="text-[10px] sm:text-xs font-semibold tracking-wide">FREE vs PREMIUM</span>
        </div>
        <h2 className="font-display text-2xl sm:text-4xl font-bold mb-2 px-2">
          Why go <span className="gradient-text font-serif italic">Premium?</span>
        </h2>
        <p className="text-muted-foreground text-xs sm:text-base max-w-xl mx-auto px-3 italic">
          "Most people only see surface emotions. Premium users understand the emotions they hide even from themselves."
        </p>
      </motion.div>

      {/* Comparison table — mobile-first compact */}
      <motion.div
        className="max-w-3xl mx-auto glass-panel rounded-2xl border border-border/50 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-[1fr_56px_72px] sm:grid-cols-[1fr_120px_140px] bg-muted/30 border-b border-border/50">
          <div className="p-2.5 sm:p-4 font-display font-bold text-[11px] sm:text-sm">Feature</div>
          <div className="p-2.5 sm:p-4 text-center font-display font-bold text-[11px] sm:text-sm text-muted-foreground">
            Free
          </div>
          <div className="p-2.5 sm:p-4 text-center font-display font-bold text-[11px] sm:text-sm gradient-text flex items-center justify-center gap-1">
            <Crown className="w-3 h-3 text-warning" /> Premium
          </div>
        </div>
        {rows.map((row, i) => (
          <motion.div
            key={row.feature}
            className={`grid grid-cols-[1fr_56px_72px] sm:grid-cols-[1fr_120px_140px] items-center ${
              i % 2 === 0 ? "bg-background/20" : "bg-muted/10"
            } ${i < rows.length - 1 ? "border-b border-border/30" : ""}`}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.03 }}
          >
            <div className="p-2.5 sm:p-4 flex items-center gap-2 min-w-0">
              <row.icon className="w-3 h-3 sm:w-4 sm:h-4 text-neon-pink/70 flex-shrink-0" />
              <span className="text-[11px] sm:text-sm font-medium truncate">{row.feature}</span>
            </div>
            <div className="p-2 sm:p-4">
              <Cell v={row.free} />
            </div>
            <div className="p-2 sm:p-4 bg-primary/5">
              <Cell v={row.premium} />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Pricing */}
      <motion.div
        className="max-w-3xl mx-auto mt-6 sm:mt-8 grid grid-cols-2 gap-3 sm:gap-4"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="glass-panel rounded-xl p-3 sm:p-5 border border-border/50 text-center">
          <p className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground mb-1">Monthly</p>
          <p className="font-display text-2xl sm:text-3xl font-extrabold">₹399<span className="text-xs sm:text-sm font-normal text-muted-foreground">/mo</span></p>
          <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Cancel anytime</p>
        </div>
        <div className="relative glass-panel rounded-xl p-3 sm:p-5 border border-neon-pink/40 text-center bg-gradient-to-br from-neon-purple/10 to-neon-pink/10">
          <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-gradient-to-r from-neon-pink to-neon-purple text-white text-[9px] sm:text-[10px] font-bold tracking-wide whitespace-nowrap">
            SAVE 37%
          </span>
          <p className="text-[10px] sm:text-xs uppercase tracking-wider gradient-text font-bold mb-1">Yearly</p>
          <p className="font-display text-2xl sm:text-3xl font-extrabold">₹2999<span className="text-xs sm:text-sm font-normal text-muted-foreground">/yr</span></p>
          <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">~₹250/mo</p>
        </div>
      </motion.div>

      <div className="text-center mt-5 sm:mt-8 px-2">
        <Button
          onClick={() => navigate("/premium")}
          size="lg"
          className="w-full sm:w-auto bg-gradient-to-r from-neon-purple via-neon-pink to-neon-red text-white font-bold shadow-xl text-sm sm:text-base"
        >
          <Sparkles className="w-4 h-4" />
          Unlock Premium
        </Button>
        <p className="text-[10px] sm:text-[11px] text-muted-foreground/70 mt-2">Join the waitlist • First 100 get 50% off for life</p>
      </div>
    </section>
  );
};

export default PremiumComparisonTable;
