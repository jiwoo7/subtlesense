import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Crown, ArrowLeft, Check, Sparkles, BookOpen, BarChart3, History,
  Brain, Zap, Shield, Infinity as InfinityIcon, Heart, Download
} from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";

const perks = [
  { icon: Brain, title: "Pro AI Engine", desc: "Multi-pass Gemini 2.5 Pro for ~95% accuracy" },
  { icon: BookOpen, title: "Unlimited Journals", desc: "Reflect, tag moods, and track your growth" },
  { icon: BarChart3, title: "Mood Board", desc: "Visualize 30+ days of emotional trends" },
  { icon: History, title: "Full Session History", desc: "Replay every analysis, anytime" },
  { icon: Sparkles, title: "Personalized Insights", desc: "AI-crafted recommendations for your patterns" },
  { icon: InfinityIcon, title: "Unlimited Analyses", desc: "No daily limits — analyze as much as you want" },
  { icon: Download, title: "Export & Share", desc: "Download reports as PDF or share securely" },
  { icon: Shield, title: "Priority Privacy", desc: "Encrypted storage + early access to new features" },
];

const Premium = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-warning" />
              <span className="font-display font-bold gradient-text">Premium</span>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-6"
          >
            <Crown className="w-4 h-4 text-warning" />
            <span className="text-xs sm:text-sm font-semibold">Subtle Sense Premium</span>
          </motion.div>

          <motion.h1
            className="font-display text-4xl sm:text-6xl font-extrabold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Unlock the{" "}
            <span className="gradient-text font-serif italic">deeper you</span>
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Go beyond the basics. Premium gives you unlimited deep emotion analysis,
            a personal journal, mood trends, and the most accurate AI engine we offer.
          </motion.p>

          {/* Pay Now CTA — glowing with wave */}
          <motion.div
            className="relative inline-block"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {/* Outer animated glow ring */}
            <motion.span
              aria-hidden
              className="absolute -inset-1.5 rounded-full opacity-70"
              style={{
                background:
                  "conic-gradient(from 0deg, hsl(var(--neon-pink)), hsl(var(--neon-purple)), hsl(var(--neon-red)), hsl(var(--neon-pink)))",
                filter: "blur(14px)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
            <motion.button
              onClick={() => setShowModal(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="relative overflow-hidden rounded-full px-8 sm:px-12 py-4 sm:py-5 font-display text-base sm:text-lg font-bold text-white bg-gradient-to-r from-neon-purple via-neon-pink to-neon-red shadow-2xl"
            >
              {/* Translucent wave sweep */}
              <motion.span
                aria-hidden
                className="absolute inset-y-0 w-1/2"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)",
                }}
                animate={{ x: ["-100%", "250%"] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="relative z-10 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Pay Now — Enjoy Unlimited
              </span>
            </motion.button>
          </motion.div>

          <p className="text-xs text-muted-foreground/70 mt-3">
            Cancel anytime • Secure checkout • Loved by emotional explorers ✨
          </p>
        </section>

        {/* Perks grid */}
        <section className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <motion.h2
            className="text-center font-display text-2xl sm:text-3xl font-bold mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Everything you get with Premium
          </motion.h2>

          <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {perks.map((perk, i) => (
              <motion.div
                key={perk.title}
                className="group relative glass-panel rounded-2xl p-5 border border-border/40 overflow-hidden cursor-default"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -6 }}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 0%, hsla(330, 90%, 60%, 0.25), transparent 60%)",
                  }}
                />
                {/* Hover wave sweep */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div
                    className="absolute -inset-y-2 w-1/2 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
                    }}
                  />
                </div>

                <div className="relative z-10">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-neon-purple/30 to-neon-pink/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <perk.icon className="w-5 h-5 text-neon-pink" />
                  </div>
                  <h3 className="font-display font-bold text-base mb-1">{perk.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {perk.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Compare strip */}
        <section className="container mx-auto px-4 sm:px-6 py-8">
          <div className="max-w-3xl mx-auto glass-panel rounded-2xl p-6 sm:p-8 border border-primary/20">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Free</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2"><Check className="w-4 h-4 text-muted-foreground mt-0.5" /> Basic AI analysis</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-muted-foreground mt-0.5" /> Surface emotion detection</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-muted-foreground mt-0.5" /> Limited daily sessions</li>
                </ul>
              </div>
              <div className="relative">
                <div className="absolute -top-3 -right-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-neon-pink to-neon-purple text-white text-[10px] font-bold tracking-wide">
                  RECOMMENDED
                </div>
                <p className="text-xs uppercase tracking-wider gradient-text font-bold mb-2">Premium</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2"><Check className="w-4 h-4 text-neon-pink mt-0.5" /> Pro multi-pass AI (~95% accuracy)</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-neon-pink mt-0.5" /> Hidden + suppressed emotions</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-neon-pink mt-0.5" /> Journals, mood board & history</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-neon-pink mt-0.5" /> Unlimited everything</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="container mx-auto px-4 sm:px-6 py-10 text-center">
          <Button
            size="lg"
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-neon-purple to-neon-pink text-white font-bold text-base px-8 py-6 shadow-xl"
          >
            <Crown className="w-5 h-5 mr-2" />
            Get Premium
          </Button>
          <p className="text-xs text-muted-foreground mt-3 flex items-center justify-center gap-1">
            Made with <Heart className="w-3 h-3 text-neon-pink fill-neon-pink" /> for deeper self-awareness
          </p>
        </section>
      </div>

      {/* Coming Soon Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
              onClick={() => setShowModal(false)}
            />
            <motion.div
              className="relative glass-panel rounded-3xl p-8 max-w-md w-full text-center border border-primary/30"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <motion.div
                className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-purple to-neon-pink mx-auto mb-4 flex items-center justify-center"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="font-display text-2xl font-bold mb-2 gradient-text">
                Coming Soon ✨
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Premium payments are launching shortly. Join the waitlist by emailing us —
                we'll let you know the moment it's live.
              </p>
              <a
                href="mailto:naiyyathapa@gmail.com?subject=Subtle%20Sense%20Premium%20Waitlist"
                className="inline-block w-full"
              >
                <Button className="w-full bg-gradient-to-r from-neon-purple to-neon-pink text-white font-bold">
                  Join the Waitlist
                </Button>
              </a>
              <button
                onClick={() => setShowModal(false)}
                className="text-xs text-muted-foreground hover:text-foreground mt-4 transition-colors"
              >
                Maybe later
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Premium;
