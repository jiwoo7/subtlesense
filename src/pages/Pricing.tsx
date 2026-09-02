import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Check, Linkedin, Minus } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import ThemePickerButton from "@/components/ThemePickerButton";
import WaitlistDialog from "@/components/WaitlistDialog";
import logoUrl from "@/assets/subtle-sense-logo.png";

const ease = [0.25, 1, 0.5, 1] as const;

type Tier = {
  name: string;
  numeral: string;
  tagline: string;
  intro: string;
  features: string[];
  cta: string;
  to: string;
  featured: boolean;
  ribbon?: string;
};

const tiers: Tier[] = [
  {
    name: "Guest",
    numeral: "I",
    tagline: "For the curious visit.",
    intro:
      "Enough to feel what this is. Three readings a month, no account, no persuasion.",
    features: [
      "3 readings per month",
      "Spoken · Felt · Unsaid analysis",
      "Encrypted, discard-after-reading processing",
      "Mind tools, games & playlists",
      "Private journaling on this device",
    ],
    cta: "Begin quietly",
    to: "/",
    featured: false,
  },
  {
    name: "Interior",
    numeral: "II",
    tagline: "The private practice.",
    intro:
      "For the person who wants to actually see the pattern — week after week, in their own words.",
    features: [
      "Unlimited readings",
      "Weekly interior letter, written for you",
      "Compare any reading to the last",
      "Full history, mood board & trends",
      "Cloud-synced journal across devices",
      "Priority AI response times",
      "Deeper reasoning pass on every reading",
    ],
    cta: "Reserve Interior",
    to: "/auth",
    featured: true,
    ribbon: "Most chosen",
  },
  {
    name: "Atelier",
    numeral: "III",
    tagline: "For the reflective professional.",
    intro:
      "Built for coaches, therapists, researchers and writers who hold other people's interiors for a living.",
    features: [
      "Everything in Interior",
      "Multiple named subjects, kept separate",
      "Longitudinal reports across a subject's sessions",
      "Export sessions as archival PDF or CSV",
      "Annotated readings — add your own clinical notes",
      "Custom vocabulary: name emotions in your own language",
      "Session-set comparison (before / after a period)",
      "White-glove onboarding, one-to-one",
      "Direct line to the founder for feature requests",
    ],
    cta: "Request Atelier",
    to: "/auth",
    featured: false,
  },
];

const matrix: { label: string; guest: string | boolean; interior: string | boolean; atelier: string | boolean }[] = [
  { label: "Readings", guest: "3 / month", interior: "Unlimited", atelier: "Unlimited" },
  { label: "Spoken · Felt · Unsaid", guest: true, interior: true, atelier: true },
  { label: "Mind tools, games, playlists", guest: true, interior: true, atelier: true },
  { label: "History & mood board", guest: false, interior: true, atelier: true },
  { label: "Weekly interior letter", guest: false, interior: true, atelier: true },
  { label: "Cloud-synced journal", guest: false, interior: true, atelier: true },
  { label: "Multiple named subjects", guest: false, interior: false, atelier: true },
  { label: "Export (PDF / CSV)", guest: false, interior: false, atelier: true },
  { label: "Longitudinal reports", guest: false, interior: false, atelier: true },
  { label: "White-glove onboarding", guest: false, interior: false, atelier: true },
];

const Cell = ({ v }: { v: string | boolean }) =>
  typeof v === "string" ? (
    <span className="text-xs sm:text-sm text-foreground font-light">{v}</span>
  ) : v ? (
    <Check className="w-3.5 h-3.5 text-gold mx-auto" strokeWidth={1.5} />
  ) : (
    <Minus className="w-3.5 h-3.5 text-muted-foreground/40 mx-auto" strokeWidth={1.5} />
  );

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
            <button onClick={() => navigate("/")} className="flex items-center gap-3" aria-label="Home">
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

        {/* Overture */}
        <section className="container mx-auto px-6 sm:px-8 lg:px-12 pt-20 sm:pt-24 pb-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease }}
          >
            <p className="eyebrow mb-8">
              <span className="text-gold animate-shimmer">Founding Members</span>
              <span className="mx-3 text-border">·</span>
              First 500 receive lifetime 50% off
            </p>

            <h1 className="editorial-heading text-[2.6rem] sm:text-[4rem] lg:text-[5.25rem] leading-[1.02] mb-8">
              A quiet subscription <br />
              <span className="editorial-italic text-gold">to your own interior.</span>
            </h1>

            <div className="gold-hairline max-w-[9rem] mx-auto mb-8" />

            <p className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground font-light leading-relaxed">
              Three tiers, plainly stated. No dark patterns, no trial mazes &mdash; and
              nothing to pay today. Reserve the tier that sounds like you.
            </p>
          </motion.div>
        </section>

        {/* Tiers */}
        <section className="container mx-auto px-6 sm:px-8 lg:px-12 pb-24">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
            {tiers.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: i * 0.12, ease }}
                className={`group relative border p-8 lg:p-10 flex flex-col transition-all duration-700 ${
                  t.featured
                    ? "border-gold/60 bg-card/40 lg:-my-4 lg:py-14 shadow-[0_30px_90px_-50px_hsl(var(--primary)/0.55)]"
                    : "border-border/60 bg-transparent hover:border-gold/40 hover:bg-card/20"
                }`}
              >
                {/* corner filigree */}
                <span className="pointer-events-none absolute top-0 left-0 w-8 h-8 border-t border-l border-gold/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <span className="pointer-events-none absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {t.ribbon && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 eyebrow whitespace-nowrap bg-background border border-gold/60 text-gold px-3 py-1">
                    {t.ribbon}
                  </span>
                )}

                <p className="editorial-heading text-gold/70 text-2xl leading-none mb-4">{t.numeral}</p>
                <p className="eyebrow mb-3">{t.name}</p>
                <p className="editorial-italic text-foreground text-lg mb-4">{t.tagline}</p>
                <p className="text-sm text-muted-foreground font-light leading-relaxed mb-8">
                  {t.intro}
                </p>

                <div className="gold-hairline mb-6" />

                <ul className="space-y-4 mb-10 flex-1">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className="w-3.5 h-3.5 text-gold mt-1 flex-shrink-0" strokeWidth={1.5} />
                      <span className="text-sm text-foreground font-light leading-relaxed">{f}</span>
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

        {/* Comparison ledger */}
        <section className="container mx-auto px-6 sm:px-8 lg:px-12 pb-24">
          <div className="max-w-4xl mx-auto">
            <p className="eyebrow text-center mb-3">The ledger</p>
            <h2 className="editorial-heading text-3xl sm:text-4xl text-center mb-10">
              Everything, <span className="editorial-italic text-gold">side by side.</span>
            </h2>

            <div className="border border-border/60">
              <div className="grid grid-cols-[1.6fr_repeat(3,1fr)] items-center px-4 sm:px-6 py-4 border-b border-border/60 bg-card/20">
                <span className="eyebrow text-muted-foreground">Included</span>
                {["Guest", "Interior", "Atelier"].map((n) => (
                  <span
                    key={n}
                    className={`eyebrow text-center ${n === "Interior" ? "text-gold" : "text-muted-foreground"}`}
                  >
                    {n}
                  </span>
                ))}
              </div>
              {matrix.map((row, i) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-[1.6fr_repeat(3,1fr)] items-center px-4 sm:px-6 py-4 ${
                    i !== matrix.length - 1 ? "border-b border-border/40" : ""
                  }`}
                >
                  <span className="text-sm text-foreground font-light pr-3">{row.label}</span>
                  <span className="text-center"><Cell v={row.guest} /></span>
                  <span className="text-center"><Cell v={row.interior} /></span>
                  <span className="text-center"><Cell v={row.atelier} /></span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Atelier feature spread */}
        <section className="container mx-auto px-6 sm:px-8 lg:px-12 pb-24">
          <div className="max-w-5xl mx-auto border border-gold/30 bg-card/20 p-8 sm:p-12 lg:p-16">
            <p className="eyebrow mb-4 text-gold">Atelier, in detail</p>
            <h2 className="editorial-heading text-3xl sm:text-[2.75rem] leading-[1.08] mb-6">
              For those who hold <br />
              <span className="editorial-italic text-gold">other people&rsquo;s interiors.</span>
            </h2>
            <div className="gold-hairline max-w-[9rem] mb-10" />

            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10">
              {[
                {
                  h: "Named subjects, kept apart",
                  p: "Each person you work with gets their own thread — separate history, separate mood board, separate letters. Nothing bleeds between them.",
                },
                {
                  h: "Longitudinal reports",
                  p: "Choose a span of weeks and receive one written report on what moved: which emotions rose, which quieted, and where suppression clustered.",
                },
                {
                  h: "Archival export",
                  p: "Export any session or set as a typeset PDF or structured CSV — suitable for case notes, supervision, or your own research.",
                },
                {
                  h: "Your annotations",
                  p: "Add private notes to any reading. They stay with the session and appear in exports, so the AI's read and your read live side by side.",
                },
                {
                  h: "Your own vocabulary",
                  p: "Rename or add emotion terms so readings speak in the language of your practice rather than a generic taxonomy.",
                },
                {
                  h: "White-glove onboarding",
                  p: "A one-to-one session to set up subjects, vocabulary and reporting cadence — plus a direct line for what you need built next.",
                },
              ].map((f) => (
                <div key={f.h}>
                  <p className="editorial-heading text-xl mb-2">{f.h}</p>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">{f.p}</p>
                </div>
              ))}
            </div>

            <button onClick={() => openWaitlist("Atelier")} className="btn-editorial mt-12">
              Request Atelier
            </button>
          </div>
        </section>

        {/* Questions */}
        <section className="container mx-auto px-6 sm:px-8 lg:px-12 pb-24">
          <div className="max-w-3xl mx-auto">
            <p className="eyebrow text-center mb-10">Quietly answered</p>
            <div className="space-y-8">
              {[
                {
                  q: "Am I charged today?",
                  a: "No. Reserving a tier costs nothing and takes an email. You will be told the price before anything is ever asked of you.",
                },
                {
                  q: "What happens to my captures?",
                  a: "They are encrypted in transit, analysed on a secure server, and discarded immediately after the reading is written. Nothing is kept without your consent.",
                },
                {
                  q: "Is this therapy?",
                  a: "No. Subtle Sense is a reflective instrument, not a clinician, and it does not diagnose. It is informational only.",
                },
                {
                  q: "Can I leave?",
                  a: "At any moment, in one click, with your history exportable on the way out.",
                },
              ].map((f) => (
                <div key={f.q} className="border-b border-border/40 pb-8">
                  <p className="editorial-heading text-xl mb-2">{f.q}</p>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
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
                className="inline-block opacity-90 hover:opacity-100 transition-opacity"
              >
                <img
                  src="https://www.uneed.best/badge/dr/subtlesense.svg?theme=dark"
                  alt="SubtleSense Domain Rating by Ahrefs, on Uneed"
                  className="h-[47px] w-auto"
                />
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
