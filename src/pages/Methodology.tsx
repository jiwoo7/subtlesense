import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import logoUrl from "@/assets/subtle-sense-logo.png";

const ease = [0.25, 1, 0.5, 1] as const;

const sections = [
  {
    n: "I",
    title: "What we read",
    body: "Subtle Sense observes the composition of a short capture — micro-expression, cadence, tonal contour, phrasing, hesitation, breath. It does not read minds. It reads the surface of a signal and returns a considered interpretation of what that signal tends to correspond to in composed human behaviour.",
  },
  {
    n: "II",
    title: "Three layers, not a verdict",
    body: "The reading returns three registers. Spoken — the emotion you present. Felt — the undercurrent visible in micro-signals but seldom voiced. Unsaid — what the composition holds back. These are registers of a signal, not categories of a person.",
  },
  {
    n: "III",
    title: "What the confidence number means",
    body: "The percentage beside each reading is the model's certainty about what it observed — never a claim about the truth of what you feel. A 78% confidence means the model saw a strong signal; it does not mean you are 78% anxious. Read all numbers lightly, and give more weight to the sessions that felt honestly captured.",
  },
  {
    n: "IV",
    title: "Where the model is weak",
    body: "Poor lighting, background noise, self-conscious posing, and captures shorter than a few seconds all degrade the reading. Neurodivergent expression, cultural variation in affect, and medication effects can shift baselines the model was not trained to normalise. If a reading feels wrong, it probably is — trust yourself first.",
  },
  {
    n: "V",
    title: "What it is not",
    body: "Not a diagnosis. Not medical advice. Not a lie detector. Not a substitute for a therapist, a doctor, or a friend who knows you. Subtle Sense is a quiet instrument for self-observation — most useful when treated as a mirror, least useful when treated as a judge.",
  },
  {
    n: "VI",
    title: "Privacy",
    body: "Captures are processed for the length of one session. Nothing is stored to your account unless you are signed in and explicitly save the reading. Media never leaves the pipeline required to produce the analysis. This page is maintained by the app owner and describes current practice, not a certification.",
  },
];

const Methodology = () => {
  return (
    <div className="min-h-[100dvh] bg-background relative">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-10 sm:py-16 max-w-3xl">
        <Link
          to="/"
          className="eyebrow inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors mb-10 sm:mb-14"
        >
          <ArrowLeft className="w-3 h-3" strokeWidth={1.5} />
          Return
        </Link>

        <motion.header
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease }}
          className="mb-14 sm:mb-20"
        >
          <div className="flex items-center gap-3 mb-8">
            <img
              src={logoUrl}
              alt=""
              className="w-9 h-9 object-contain"
              style={{ filter: "drop-shadow(0 0 12px hsl(var(--primary) / 0.35))" }}
            />
            <span className="editorial-heading text-xs tracking-[0.32em] uppercase text-foreground">
              Subtle Sense
            </span>
          </div>
          <p className="eyebrow mb-6">
            <span className="text-gold">Volume I</span>
            <span className="mx-3 text-border">·</span>
            On How This Instrument Reads
          </p>
          <h1 className="editorial-heading text-4xl sm:text-5xl lg:text-6xl leading-[1.02] text-foreground">
            How we read, <br />
            <span className="editorial-italic text-gold">honestly stated.</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground font-light mt-6 leading-relaxed max-w-xl">
            A short, unvarnished account of what Subtle Sense does, what it cannot do, and how to hold its
            readings without giving them more authority than they deserve.
          </p>
        </motion.header>

        <div className="gold-hairline mb-14" />

        <div className="space-y-14">
          {sections.map((s, i) => (
            <motion.section
              key={s.n}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.05, ease }}
              className="grid grid-cols-[3rem_1fr] sm:grid-cols-[4rem_1fr] gap-4 sm:gap-8"
            >
              <p className="eyebrow text-gold pt-1">{s.n}</p>
              <div>
                <h2 className="editorial-heading text-2xl sm:text-3xl text-foreground leading-tight mb-3">
                  {s.title}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed">
                  {s.body}
                </p>
              </div>
            </motion.section>
          ))}
        </div>

        <div className="gold-hairline mt-16 mb-8" />

        <p className="eyebrow text-muted-foreground">
          Est. 2025 · Maintained by the app owner · Not a medical device
        </p>
      </div>
    </div>
  );
};

export default Methodology;
