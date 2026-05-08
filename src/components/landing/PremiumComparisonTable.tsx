import { motion } from "framer-motion";
import { Check, X, Crown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const rows = [
  { feature: "Surface emotion detection", free: true, premium: true },
  { feature: "Hidden & suppressed emotions", free: false, premium: true },
  { feature: "Multi-pass Pro AI (~95% accuracy)", free: false, premium: true },
  { feature: "Unlimited daily analyses", free: false, premium: true },
  { feature: "Personal journal & mood tagging", free: false, premium: true },
  { feature: "Mood board & 30-day trends", free: false, premium: true },
  { feature: "Full session history", free: false, premium: true },
  { feature: "Export reports (PDF)", free: false, premium: true },
  { feature: "Custom themes & profile", free: false, premium: true },
  { feature: "Priority support & early access", free: false, premium: true },
];

const Cell = ({ on }: { on: boolean }) =>
  on ? (
    <Check className="w-5 h-5 text-neon-pink mx-auto" />
  ) : (
    <X className="w-5 h-5 text-muted-foreground/50 mx-auto" />
  );

const PremiumComparisonTable = () => {
  const navigate = useNavigate();
  return (
    <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <motion.div
        className="text-center mb-8 sm:mb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel mb-3">
          <Crown className="w-3.5 h-3.5 text-warning" />
          <span className="text-[11px] sm:text-xs font-semibold tracking-wide">FREE vs PREMIUM</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold mb-2">
          Why go <span className="gradient-text font-serif italic">Premium?</span>
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
          Free gets you a taste. Premium opens the full depth of what AI can read between the lines.
        </p>
      </motion.div>

      <motion.div
        className="max-w-3xl mx-auto glass-panel rounded-2xl border border-border/50 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_120px_120px] bg-muted/30 border-b border-border/50">
          <div className="p-3 sm:p-4 font-display font-bold text-xs sm:text-sm">Feature</div>
          <div className="p-3 sm:p-4 text-center font-display font-bold text-xs sm:text-sm text-muted-foreground w-16 sm:w-auto">
            Free
          </div>
          <div className="p-3 sm:p-4 text-center font-display font-bold text-xs sm:text-sm gradient-text w-20 sm:w-auto flex items-center justify-center gap-1">
            <Crown className="w-3.5 h-3.5 text-warning" /> Premium
          </div>
        </div>
        {rows.map((row, i) => (
          <motion.div
            key={row.feature}
            className={`grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_120px_120px] items-center ${
              i % 2 === 0 ? "bg-background/20" : "bg-muted/10"
            } ${i < rows.length - 1 ? "border-b border-border/30" : ""}`}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.03 }}
          >
            <div className="p-3 sm:p-4 text-xs sm:text-sm font-medium">{row.feature}</div>
            <div className="p-3 sm:p-4 w-16 sm:w-auto">
              <Cell on={row.free} />
            </div>
            <div className="p-3 sm:p-4 w-20 sm:w-auto bg-primary/5">
              <Cell on={row.premium} />
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="text-center mt-6 sm:mt-8">
        <Button
          onClick={() => navigate("/premium")}
          size="lg"
          className="bg-gradient-to-r from-neon-purple via-neon-pink to-neon-red text-white font-bold shadow-xl"
        >
          <Sparkles className="w-4 h-4" />
          Unlock Premium
        </Button>
        <p className="text-[11px] text-muted-foreground/70 mt-2">Join the waitlist • First 100 get 50% off for life</p>
      </div>
    </section>
  );
};

export default PremiumComparisonTable;
