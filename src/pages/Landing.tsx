import { Suspense, lazy, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Brain, Shield, Zap, Users, BarChart3, History, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AnimatedBackground from "@/components/AnimatedBackground";
import RealAnalysisDashboard from "@/components/RealAnalysisDashboard";
import ShareResults from "@/components/ShareResults";
import ThemePickerButton from "@/components/ThemePickerButton";
import MindToolsSection from "@/components/landing/MindToolsSection";
import MobileLanding from "@/components/landing/MobileLanding";


const TransparencySection = lazy(() => import("@/components/landing/TransparencySection"));
const RealWorldUseCases = lazy(() => import("@/components/landing/RealWorldUseCases"));
import { supabase } from "@/integrations/supabase/client";
import type { AnalysisResult } from "@/types/emotions";
import type { User } from "@supabase/supabase-js";

const MediaUploadZone = lazy(() => import("@/components/MediaUploadZone"));
const ExitPoll = lazy(() => import("@/components/ExitPoll"));

const AnalyzerFallback = () => (
  <div className="glass-panel rounded-2xl sm:rounded-3xl p-6 sm:p-8 min-h-[320px] flex items-center justify-center text-center">
    <div>
      <p className="font-display text-lg font-bold text-foreground mb-2">Preparing the live analyzer…</p>
      <p className="text-sm text-muted-foreground">Camera, audio, and AI tools are loading safely.</p>
    </div>
  </div>
);

const Landing = () => {
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user ?? null);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setCurrentUser(session?.user ?? null);
    });
  }, []);

  const featureToneClasses = {
    primary: { badge: "bg-primary/15", icon: "text-primary" },
    accent: { badge: "bg-accent/15", icon: "text-accent" },
  } as const;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setIsAnalyzed(false);
    setAnalysisResult(null);
  };

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);
    setIsAnalyzed(true);
    setIsAnalyzing(false);
  };

  const handleAnalysisError = () => {
    setIsAnalyzing(false);
  };

  const features = [
    {
      icon: Brain,
      title: "Deep AI Detection",
      description: "Detects hidden & suppressed emotions beyond the surface using advanced AI",
      tone: "primary" as const,
    },
    {
      icon: Zap,
      title: "Instant Insights",
      description: "Get personalized suggestions within seconds addressing what you're truly feeling",
      tone: "accent" as const,
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data stays secure. We analyze locally and never share your emotions",
      tone: "primary" as const,
    },
    {
      icon: Users,
      title: "For Everyone",
      description: "Anyone seeking emotional awareness can benefit from deep analysis",
      tone: "accent" as const,
    }
  ];

  const stats = [
    { value: "20", label: "Emotions Detected" },
    { value: "95%", label: "Peak Accuracy" },
    { value: "<8s", label: "Response time" },
    { value: "Deep", label: "AI Analysis" }
  ];

  const scrollToTry = () => {
    if (typeof document === "undefined") return;
    document.getElementById("try-it-out")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden sm:overflow-hidden">
      <AnimatedBackground />
      
      <MobileLanding currentUser={currentUser} />

      <div className="relative z-10 hidden sm:block">
        {/* ============ HEADER ============ */}
        <header className="container mx-auto px-8 lg:px-12 pt-8 pb-6 border-b border-border/60">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="editorial-heading text-2xl tracking-[0.22em] uppercase text-foreground">
                Subtle&nbsp;Sense
              </span>
            </div>

            <div className="hidden md:flex items-center gap-10">
              <a href="#philosophy" className="nav-link">Philosophy</a>
              <a href="#features" className="nav-link">The Method</a>
              <a href="#try-it-out" className="nav-link">Analysis</a>
            </div>

            <div className="flex items-center gap-4">
              {currentUser ? (
                <>
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="nav-link hidden lg:inline-flex items-center gap-2"
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    Mood Board
                  </button>
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="nav-link hidden lg:inline-flex items-center gap-2"
                  >
                    <History className="w-3.5 h-3.5" />
                    History
                  </button>
                  <button
                    onClick={async () => {
                      await supabase.auth.signOut();
                      setCurrentUser(null);
                    }}
                    className="nav-link inline-flex items-center gap-2"
                    title="Sign out"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </>
              ) : null}
              <ThemePickerButton />
              <button onClick={scrollToTry} className="btn-editorial-ghost">
                Begin
              </button>
            </div>
          </nav>
        </header>

        {/* ============ HERO ============ */}
        <section className="container mx-auto px-8 lg:px-12 pt-24 pb-32">
          <div className="max-w-5xl mx-auto animate-editorial-in">
            <p className="eyebrow text-center mb-10">
              Est. 2025 · An Editorial Study of Emotion
            </p>

            <h1 className="editorial-heading text-center text-[3.75rem] md:text-[5.5rem] lg:text-[6.75rem] leading-[0.98] mb-10">
              Discover What You&rsquo;re
              <br />
              <span className="editorial-italic block mt-2 text-[1.02em]">
                really feeling.
              </span>
            </h1>

            <p className="text-center max-w-2xl mx-auto text-base md:text-lg text-muted-foreground leading-relaxed mb-14 font-light">
              A composed, private study of what lies beneath the surface. Subtle Sense
              observes micro-expression, cadence and tone &mdash; and returns a quiet,
              considered reading of the emotions you seldom name aloud.
            </p>

            <div className="flex items-center justify-center gap-4">
              <button onClick={scrollToTry} className="btn-editorial">
                Start Analysis
              </button>
              <a href="#features" className="btn-editorial-ghost">
                The Method
              </a>
            </div>

            {/* Editorial index strip */}
            <div className="mt-24 pt-10 border-t border-border/60 grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center md:text-left">
                  <p className="editorial-heading text-4xl md:text-5xl text-foreground">
                    {stat.value}
                  </p>
                  <p className="eyebrow mt-3">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ THE METHOD ============ */}
        <section id="features" className="container mx-auto px-8 lg:px-12 py-28 border-t border-border/60">
          <div className="grid lg:grid-cols-12 gap-12 mb-20">
            <div className="lg:col-span-5">
              <p className="eyebrow mb-6">Chapter I &mdash; The Method</p>
              <h2 className="editorial-heading text-4xl md:text-5xl leading-tight">
                A quiet observation, <br />
                <span className="editorial-italic">rendered with precision.</span>
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-light">
                Every session is composed of four disciplined passes &mdash; each attending
                to a different layer of expression. The result is not a verdict, but a
                mirror; a careful account of what was there to be seen.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 border-t border-border/60">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="p-8 lg:p-10 border-b border-border/60 md:border-r md:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(4n)]:border-r-0 animate-editorial-in"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <p className="eyebrow mb-6">№ {String(index + 1).padStart(2, "0")}</p>
                <feature.icon className="w-5 h-5 text-primary mb-8" strokeWidth={1.25} />
                <h3 className="editorial-heading text-2xl mb-4 text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ============ ANALYSIS ============ */}
        <div id="try-it-out" style={{ scrollMarginTop: 80 }}>
          <section className="container mx-auto px-8 lg:px-12 py-28 border-t border-border/60">
            <div className="grid lg:grid-cols-12 gap-12 mb-16">
              <div className="lg:col-span-5">
                <p className="eyebrow mb-6">Chapter II &mdash; The Session</p>
                <h2 className="editorial-heading text-4xl md:text-5xl leading-tight">
                  Begin your <br />
                  <span className="editorial-italic">private analysis.</span>
                </h2>
              </div>
              <div className="lg:col-span-6 lg:col-start-7 flex items-end">
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-light">
                  Speak, look, or upload a short clip. The reading returns in moments and
                  is yours alone &mdash; nothing is stored without consent.
                </p>
              </div>
            </div>

            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <Suspense fallback={<AnalyzerFallback />}>
                  {isMounted ? (
                    <MediaUploadZone
                      onStartAnalysis={handleStartAnalysis}
                      onAnalysisComplete={handleAnalysisComplete}
                      onAnalysisError={handleAnalysisError}
                      isAnalyzing={isAnalyzing}
                    />
                  ) : (
                    <AnalyzerFallback />
                  )}
                </Suspense>

                {isAnalyzing && (
                  <div className="border border-border/60 p-6 animate-editorial-in">
                    <div className="flex items-center justify-between mb-4">
                      <p className="eyebrow">In session</p>
                      <p className="eyebrow text-primary">Observing</p>
                    </div>
                    <h4 className="editorial-heading text-xl text-foreground mb-1">
                      Reading composition&hellip;
                    </h4>
                    <p className="text-sm text-muted-foreground font-light mb-5">
                      Attending to micro-expression, cadence, and tone.
                    </p>
                    <div className="h-px bg-border relative overflow-hidden">
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-primary"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 8, ease: [0.25, 1, 0.5, 1] }}
                      />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-3 border-t border-border/60">
                  {[
                    { label: "Detection", value: "20" },
                    { label: "Method", value: "Multi-pass" },
                    { label: "Reads", value: "Suppressed" },
                  ].map((stat, i) => (
                    <div
                      key={stat.label}
                      className={`p-5 ${i < 2 ? "border-r border-border/60" : ""}`}
                    >
                      <p className="editorial-heading text-2xl text-foreground">{stat.value}</p>
                      <p className="eyebrow mt-2">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <RealAnalysisDashboard isAnalyzed={isAnalyzed} analysisResult={analysisResult} />
            </div>

            {isMounted && isAnalyzed && (
              <div className="grid sm:grid-cols-2 gap-4 mt-8 max-w-6xl mx-auto">
                <Suspense fallback={<div className="border border-border/60 p-5" />}>
                  <ExitPoll isVisible={true} onDismiss={() => {}} />
                </Suspense>
                <ShareResults isVisible={true} analysisResult={analysisResult} />
              </div>
            )}
          </section>
        </div>

        {/* Mind Tools */}
        <div className="border-t border-border/60">
          <MindToolsSection />
        </div>

        {/* Transparency */}
        <div className="hidden sm:block border-t border-border/60">
          <Suspense fallback={<div className="h-32" />}>
            <TransparencySection />
          </Suspense>
        </div>

        {/* Real World Use Cases */}
        <div className="hidden sm:block border-t border-border/60">
          <Suspense fallback={<div className="h-32" />}>
            <RealWorldUseCases />
          </Suspense>
        </div>

        {/* ============ FOOTER ============ */}
        <footer className="container mx-auto px-8 lg:px-12 py-14 border-t border-border/60">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <p className="editorial-heading text-2xl tracking-[0.22em] uppercase text-foreground">
                Subtle Sense
              </p>
              <p className="eyebrow mt-3">Est. 2025 &middot; Made by Naiyya Thapa</p>
            </div>
            <div className="text-left md:text-right">
              <p className="eyebrow mb-2">Correspondence</p>
              <a
                href="mailto:naiyyathapa@gmail.com"
                className="text-sm text-foreground border-b border-border hover:border-primary transition-colors"
              >
                naiyyathapa@gmail.com
              </a>
            </div>
          </div>
        </footer>

        <section className="container mx-auto px-8 lg:px-12 pb-14">
          <p className="mx-auto max-w-4xl text-center text-xs text-muted-foreground/80 leading-relaxed font-light tracking-wide">
            Disclaimer &mdash; This service employs artificial intelligence to offer
            impressions of emotional states for informational and educational purposes
            only. It is not a medical diagnosis nor a substitute for professional advice.
            If you or someone you know is in crisis, please contact a licensed
            professional or emergency services.
          </p>
        </section>


        {/* Footer */}
        <footer className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 text-center border-t border-border/30">
          <p className="text-muted-foreground mb-2 text-sm sm:text-base">
            Made with 💜 for emotional awareness • Privacy-first • Your emotions, your data
          </p>
          <p className="text-xs sm:text-sm">
            Made by{" "}
            <span
              className="font-bold tracking-wide"
              style={{ color: "hsl(0, 85%, 38%)" }}
            >
              Naiyya Thapa
            </span>
          </p>
          <p className="text-[10px] sm:text-xs text-muted-foreground/60 mt-1">
            Powered by AI ✨
          </p>
        </footer>

        <section className="container mx-auto px-4 sm:px-6 pb-6 sm:pb-8">
          <p className="mx-auto max-w-5xl text-center text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Disclaimer: This app uses AI to provide insights into emotional states for informational and educational purposes only. These results are not a medical diagnosis or a substitute for professional mental health advice. If you or someone you know is in crisis, please seek immediate help from a licensed professional or emergency services.
          </p>
        </section>

        {/* Contact */}
        <section className="container mx-auto px-4 sm:px-6 pb-10 sm:pb-14">
          <div className="mx-auto max-w-2xl text-center glass-panel rounded-2xl p-5 sm:p-6 border border-border/40">
            <h3 className="font-display text-base sm:text-lg font-bold text-foreground mb-1">
              Contact & Reviews
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-2">
              Questions, feedback, or partnership ideas? Reach out anytime.
            </p>
            <a
              href="mailto:naiyyathapa@gmail.com"
              className="text-sm sm:text-base font-semibold gradient-text hover:opacity-80 transition-opacity"
            >
              naiyyathapa@gmail.com
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Landing;
