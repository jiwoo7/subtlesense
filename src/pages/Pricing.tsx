import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Check, Linkedin } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import ThemePickerButton from "@/components/ThemePickerButton";
import WaitlistDialog from "@/components/WaitlistDialog";
import logoUrl from "@/assets/subtle-sense-logo.png";

const ease = [0.25, 1, 0.5, 1] as const;

const tiers = [
  {
    name: "Guest",
    tagline: "For the curious visit.",
    features: [
      "3 readings per month",
      "Spoken · Felt · Unsaid analysis",
      "In-session processing",
      "Mind tools & journaling",
    ],
    cta: "Begin quietly",
    to: "/",
    featured: false,
  },
  {
    name: "Interior",
    tagline: "The private practice.",
    features: [
      "Unlimited readings",
      "Weekly interior letter",
      "Compare to last session",
      "Personal history & mood board",
      "Priority AI response times",
    ],
    cta: "Reserve Interior",
    to: "/auth",
    featured: true,
    ribbon: "Most chosen",
  },
  {
    name: "Atelier",
    tagline: "For the reflective professional.",
    features: [
      "Everything in Interior",
      "Export sessions (PDF / CSV)",
      "Multiple named subjects",
      "White-glove onboarding",
    ],
    cta: "Request Atelier",
    to: "/auth",
    featured: false,
  },
];

const Pricing = () => {
  const navigate = useNavigate();
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [waitlistTier, setWaitlistTier] = useState<string | undefined>();

  const openWaitlist = (tier: string) => {
    setWaitlistTier(tier);
    setWaitlistOpen(true);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <AnimatedBackground />

      <div className="relative z-10">
        <header className="container mx-auto px-6 sm:px-8 lg:px-12 pt-8 pb-6 border-b border-border/60">
          <nav className="flex items-center justify-between">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-3"
              aria-label="Home"
            >
              <img src={logoUrl} alt="Subtle Sense" className="w-9 h-9 object-contain" />
              <span className="editorial-heading text-sm sm:text-lg tracking-[0.32em] uppercase text-foreground">
                Subtle Sense
              </span>
            </button>
            <div className="flex items-center gap-3 sm:gap-5">
              <ThemePickerButton />
              <button onClick={() => navigate("/")} className="btn-editorial-ghost">
                Back
              </button>
            </div>
          </nav>
        </header>

        <section className="container mx-auto px-6 sm:px-8 lg:px-12 pt-20 pb-16 text-center">
          <p className="eyebrow mb-8">
            <span className="text-gold animate-shimmer">Founding Members</span>
            <span className="mx-3 text-border">·</span>
            First 500 receive lifetime 50% off
          </p>

          <h1 className="editorial-heading text-[2.6rem] sm:text-[4rem] lg:text-[5.25rem] leading-[1.02] mb-8">
            A quiet subscription <br />
            <span className="editorial-italic text-gold">to your own interior.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground font-light leading-relaxed">
            Three tiers, plainly stated. No dark patterns, no trial mazes &mdash; and
            nothing to pay today. Reserve the tier that sounds like you.
          </p>
        </section>

        <section className="container mx-auto px-6 sm:px-8 lg:px-12 pb-20">
          <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {tiers.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: i * 0.12, ease }}
                className={`relative border p-8 lg:p-10 flex flex-col ${
                  t.featured
                    ? "border-gold/60 bg-card/30"
                    : "border-border/60 bg-transparent"
                }`}
              >
                {t.ribbon && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 eyebrow bg-background border border-gold/60 text-gold px-3 py-1">
                    {t.ribbon}
                  </span>
                )}

                <p className="eyebrow mb-3">{t.name}</p>
                <p className="editorial-italic text-foreground mb-8">{t.tagline}</p>

                <div className="mb-8" />

                <div className="gold-hairline mb-6" />

                <ul className="space-y-4 mb-10 flex-1">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check
                        className="w-3.5 h-3.5 text-gold mt-1 flex-shrink-0"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm text-foreground font-light leading-relaxed">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => (t.to === "/" ? navigate("/") : openWaitlist(t.name))}
                  className={t.featured ? "btn-editorial" : "btn-editorial-ghost"}
                >
                  {t.cta}
                </button>
              </motion.div>
            ))}
          </div>

          <p className="text-center eyebrow mt-14 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Reserving costs nothing. Founding Members hear from us first when the
            practice opens &mdash; and keep their place for life.
          </p>
        </section>

        <footer className="container mx-auto px-6 sm:px-8 lg:px-12 py-14 border-t border-border/60">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="flex flex-wrap items-center gap-5">
              <a
                href="https://launchkiwi.com/p/subtlesense"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block opacity-90 hover:opacity-100 transition-opacity"
              >
                <img
                  src="https://launchkiwi.com/badge-dark.svg"
                  alt="Featured on LaunchKiwi"
                  width="150"
                  height="47"
                  className="w-[150px] h-auto"
                />
              </a>
              <a
                href="https://www.uneed.best/tool/subtlesense"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-4 py-2.5 border border-border/60 bg-card/20 hover:border-gold/60 transition-colors"
              >
                <span className="editorial-heading text-lg text-foreground">Uneed</span>
                <span className="h-4 w-px bg-border/60" />
                <span className="text-xs text-muted-foreground font-light">
                  Featured <span className="text-gold font-normal">#2</span> / 100+
                </span>
              </a>
            </div>
            <div className="text-left md:text-right space-y-3">
              <p className="eyebrow text-muted-foreground">
                Questions of correspondence &mdash;{" "}
                <a
                  href="mailto:naiyyathapa@gmail.com"
                  className="text-foreground border-b border-border hover:border-gold transition-colors pb-0.5"
                >
                  naiyyathapa@gmail.com
                </a>
              </p>
              <a
                href="https://www.linkedin.com/in/naiyya-thapa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 eyebrow text-muted-foreground hover:text-gold transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" /> Naiyya Thapa on LinkedIn
              </a>
            </div>
          </div>
        </footer>
      </div>

      <WaitlistDialog open={waitlistOpen} onOpenChange={setWaitlistOpen} tier={waitlistTier} />
    </div>
  );
};

export default Pricing;
