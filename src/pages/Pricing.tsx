import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import ThemePickerButton from "@/components/ThemePickerButton";
import logoUrl from "@/assets/subtle-sense-logo.png";

const ease = [0.25, 1, 0.5, 1] as const;

const tiers = [
  {
    name: "Guest",
    price: "Free",
    cadence: "forever",
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
    price: "$8",
    cadence: "per month",
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
    price: "$24",
    cadence: "per month",
    tagline: "For the reflective professional.",
    features: [
      "Everything in Interior",
      "Export sessions (PDF / CSV)",
      "Multiple named subjects",
      "API access (beta)",
      "White-glove onboarding",
    ],
    cta: "Request Atelier",
    to: "/auth",
    featured: false,
  },
];

const Pricing = () => {
  const navigate = useNavigate();

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
            Three tiers, plainly stated. No dark patterns, no trial mazes. Cancel from a
            single button in settings &mdash; your history exports with you.
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

                <div className="flex items-baseline gap-3 mb-8">
                  <span className="editorial-heading text-5xl text-foreground">{t.price}</span>
                  <span className="eyebrow text-muted-foreground">{t.cadence}</span>
                </div>

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
                  onClick={() => navigate(t.to)}
                  className={t.featured ? "btn-editorial" : "btn-editorial-ghost"}
                >
                  {t.cta}
                </button>
              </motion.div>
            ))}
          </div>

          <p className="text-center eyebrow mt-14 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Prices anchor our roadmap. Payments open with the first Interior release &mdash;
            Founding Members are billed only when the practice begins.
          </p>
        </section>

        <footer className="container mx-auto px-6 sm:px-8 lg:px-12 py-12 border-t border-border/60 text-center">
          <p className="eyebrow text-muted-foreground">
            Questions of correspondence &mdash;{" "}
            <a
              href="mailto:naiyyathapa@gmail.com"
              className="text-foreground border-b border-border hover:border-gold transition-colors pb-0.5"
            >
              naiyyathapa@gmail.com
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Pricing;
