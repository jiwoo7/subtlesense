import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Crown, ArrowLeft, Check, Sparkles, BookOpen, BarChart3, History,
  Brain, Zap, Shield, Infinity as InfinityIcon, Heart, Download, Loader2, Share2, Users
} from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import logoUrl from "@/assets/subtle-sense-logo.png";

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
  const [searchParams] = useSearchParams();
  const referralCode = searchParams.get("ref") || "";
  const [showModal, setShowModal] = useState(false);
  const [joined, setJoined] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [signup, setSignup] = useState<{ position?: number; referral_code?: string } | null>(null);
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);

  useEffect(() => {
    supabase.from("waitlist_stats").select("total").maybeSingle().then(({ data }) => {
      if (data?.total != null) setWaitlistCount(data.total);
    });
  }, []);

  const fireConfetti = () => {
    const colors = ["#ff3d7f", "#a855f7", "#ec4899", "#ef4444", "#fff"];
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 }, colors });
    setTimeout(() => confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0, y: 0.7 }, colors }), 150);
    setTimeout(() => confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1, y: 0.7 }, colors }), 300);
  };

  const handleJoinWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast({ title: "Please enter your email", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("join-waitlist", {
        body: { email: email.trim(), name: name.trim(), referredByCode: referralCode || undefined },
      });
      if (error) throw error;
      setSignup(data);
      setJoined(true);
      fireConfetti();
      if (data?.alreadyJoined) {
        toast({ title: "You're already on the waitlist! 💌", description: `Position #${data.position}` });
      } else {
        toast({ title: "You're in! 💌", description: "Check your inbox for confirmation." });
        setWaitlistCount((c) => (c == null ? c : c + 1));
      }
    } catch (err: any) {
      console.error(err);
      toast({ title: "Couldn't join", description: err?.message || "Try again in a moment", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const shareReferral = async () => {
    if (!signup?.referral_code) return;
    const url = `${window.location.origin}/premium?ref=${signup.referral_code}`;
    if (navigator.share) {
      try { await navigator.share({ title: "Subtle Sense Premium", text: "Join me on the Subtle Sense Premium waitlist ✨", url }); return; } catch {}
    }
    await navigator.clipboard.writeText(url);
    toast({ title: "Referral link copied!", description: "Share it with a friend 💜" });
  };

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
              <img src={logoUrl} alt="Subtle Sense" className="w-7 h-7 rounded-lg" />
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
            {/* Soft pulsing aura (no rotation) */}
            <motion.span
              aria-hidden
              className="absolute -inset-3 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(closest-side, hsl(var(--neon-pink)/0.55), hsl(var(--neon-purple)/0.3) 60%, transparent 75%)",
                filter: "blur(18px)",
              }}
              animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Twin breathing ring */}
            <motion.span
              aria-hidden
              className="absolute -inset-1 rounded-full border border-neon-pink/40 pointer-events-none"
              animate={{ scale: [1, 1.08, 1], opacity: [0.8, 0.3, 0.8] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.button
              onClick={() => setShowModal(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="relative overflow-hidden rounded-full px-8 sm:px-12 py-4 sm:py-5 font-display text-base sm:text-lg font-bold text-white bg-gradient-to-r from-neon-purple via-neon-pink to-neon-red shadow-[0_0_40px_hsl(var(--neon-pink)/0.6)] hover:shadow-[0_0_60px_hsl(var(--neon-pink)/0.9)] transition-shadow"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Pay Now — Enjoy Unlimited
              </span>
            </motion.button>
          </motion.div>

          <p className="text-xs text-muted-foreground/70 mt-3">
            Cancel anytime • Secure checkout • Loved by emotional explorers ✨
          </p>

          {waitlistCount != null && waitlistCount > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-xs sm:text-sm"
            >
              <Users className="w-4 h-4 text-neon-pink" />
              <span><strong className="gradient-text">{waitlistCount}</strong> {waitlistCount === 1 ? "explorer is" : "explorers are"} already on the waitlist</span>
            </motion.div>
          )}
          {referralCode && (
            <p className="mt-3 text-xs text-neon-pink">✨ A friend invited you — first 100 get lifetime 50% off</p>
          )}
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

        {/* Compare strip — pricing + tiers */}
        <section className="container mx-auto px-3 sm:px-6 py-6 sm:py-8">
          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
            {/* Free */}
            <div className="glass-panel rounded-2xl p-4 sm:p-6 border border-border/40">
              <p className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground mb-1">Free</p>
              <p className="font-display text-2xl sm:text-3xl font-extrabold mb-3">₹0<span className="text-xs font-normal text-muted-foreground">/forever</span></p>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li className="flex gap-2"><Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground mt-0.5 flex-shrink-0" /> 10 analyses / day</li>
                <li className="flex gap-2"><Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground mt-0.5 flex-shrink-0" /> Core emotion detection</li>
                <li className="flex gap-2"><Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground mt-0.5 flex-shrink-0" /> Basic journaling & streak</li>
                <li className="flex gap-2"><Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground mt-0.5 flex-shrink-0" /> 7-day history</li>
              </ul>
            </div>
            {/* Premium */}
            <div className="relative glass-panel rounded-2xl p-4 sm:p-6 border border-neon-pink/40 bg-gradient-to-br from-neon-purple/10 to-neon-pink/10">
              <div className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-gradient-to-r from-neon-pink to-neon-purple text-white text-[9px] sm:text-[10px] font-bold tracking-wide">
                RECOMMENDED
              </div>
              <p className="text-[10px] sm:text-xs uppercase tracking-wider gradient-text font-bold mb-1">Premium</p>
              <div className="flex items-baseline gap-2 mb-3 flex-wrap">
                <p className="font-display text-2xl sm:text-3xl font-extrabold">₹399<span className="text-xs font-normal text-muted-foreground">/mo</span></p>
                <span className="text-[10px] sm:text-xs text-muted-foreground">or ₹2999/yr <span className="text-neon-pink font-semibold">(save 37%)</span></span>
              </div>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li className="flex gap-2"><Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neon-pink mt-0.5 flex-shrink-0" /> Unlimited Pro AI (~95% accuracy)</li>
                <li className="flex gap-2"><Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neon-pink mt-0.5 flex-shrink-0" /> Hidden & suppressed emotions</li>
                <li className="flex gap-2"><Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neon-pink mt-0.5 flex-shrink-0" /> Weekly email reports (Sundays)</li>
                <li className="flex gap-2"><Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neon-pink mt-0.5 flex-shrink-0" /> Moodboard, themes & rich journal</li>
                <li className="flex gap-2"><Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neon-pink mt-0.5 flex-shrink-0" /> Mindful games & training</li>
                <li className="flex gap-2"><Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neon-pink mt-0.5 flex-shrink-0" /> Lifetime history + PDF export</li>
              </ul>
            </div>
          </div>
          <p className="max-w-3xl mx-auto text-center text-[11px] sm:text-sm text-muted-foreground italic mt-4 px-2">
            "Most people only see surface emotions. Premium users understand the emotions they hide even from themselves."
          </p>
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
                {joined ? "You took a step ✨" : "Coming Soon ✨"}
              </h3>
              {!joined ? (
                <>
                  <p className="text-sm text-muted-foreground mb-5">
                    Premium payments are launching shortly. Drop your email and we'll let you know the moment it's live.
                  </p>
                  <form onSubmit={handleJoinWaitlist} className="space-y-3 text-left">
                    <Input
                      type="text"
                      placeholder="Your name (optional)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={submitting}
                      className="bg-background/50"
                    />
                    <Input
                      type="email"
                      required
                      placeholder="you@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={submitting}
                      className="bg-background/50"
                    />
                    <button
                      type="submit"
                      disabled={submitting}
                      className="relative w-full overflow-hidden rounded-full px-6 py-3 font-bold text-white bg-gradient-to-r from-neon-purple via-neon-pink to-neon-red shadow-[0_0_30px_hsl(var(--neon-pink)/0.6)] hover:shadow-[0_0_50px_hsl(var(--neon-pink)/0.9)] transition-shadow disabled:opacity-60"
                    >
                      <motion.span
                        aria-hidden
                        className="absolute inset-y-0 w-1/2"
                        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)" }}
                        animate={{ x: ["-100%", "250%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Joining…</> : <>Join the Waitlist</>}
                      </span>
                    </button>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", damping: 12 }}
                  className="space-y-4"
                >
                  <p className="text-sm text-muted-foreground">
                    {signup?.position ? <>You're <strong className="gradient-text">#{signup.position}</strong> in line. Check your inbox 💌</> : "Confirmation sent — check your inbox 💌"}
                  </p>
                  <motion.div
                    className="relative inline-block w-full"
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span
                      aria-hidden
                      className="absolute -inset-1 rounded-full blur-xl opacity-70"
                      style={{ background: "linear-gradient(90deg, hsl(var(--neon-pink)), hsl(var(--neon-purple)))" }}
                    />
                    <div className="relative w-full rounded-full px-6 py-4 bg-gradient-to-r from-neon-purple via-neon-pink to-neon-red text-white font-display font-bold flex items-center justify-center gap-2">
                      <Heart className="w-5 h-5 fill-white" />
                      You've taken a step for yourself
                    </div>
                  </motion.div>
                  {signup?.referral_code && (
                    <Button
                      onClick={shareReferral}
                      variant="outline"
                      className="w-full gap-2 border-neon-pink/40 hover:bg-neon-pink/10"
                    >
                      <Share2 className="w-4 h-4" />
                      Share with a friend (50% off for first 100)
                    </Button>
                  )}
                </motion.div>
              )}
              <button
                onClick={() => { setShowModal(false); setTimeout(() => setJoined(false), 300); }}
                className="text-xs text-muted-foreground hover:text-foreground mt-4 transition-colors"
              >
                {joined ? "Close" : "Maybe later"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Premium;
