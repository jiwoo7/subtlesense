import { motion } from "framer-motion";

const samples = [
  {
    n: "I",
    spoken: "\"I'm fine, just tired lately.\"",
    felt: "Fatigue · Restlessness",
    unsaid: "A quiet resentment at being unseen.",
    tone: "The composure of someone rehearsed in reassurance.",
  },
  {
    n: "II",
    spoken: "\"The interview went well, I think.\"",
    felt: "Relief · Doubt",
    unsaid: "A wish to be told it was enough.",
    tone: "Cadence steadies on the second sentence — belief arriving late.",
  },
  {
    n: "III",
    spoken: "\"We're taking a break, it's mutual.\"",
    felt: "Grief · Composure",
    unsaid: "Grief held at arm's length, waiting for privacy.",
    tone: "Micro-expression yields half a second before the words do.",
  },
];

const ease = [0.25, 1, 0.5, 1] as const;

const SampleReadings = () => {
  return (
    <section id="samples" className="container mx-auto px-8 lg:px-12 py-28 border-t border-border/60">
      <div className="grid lg:grid-cols-12 gap-12 mb-16">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-6">Chapter I · ii — Sample Readings</p>
          <h2 className="editorial-heading text-4xl md:text-5xl leading-tight">
            What a reading <br />
            <span className="editorial-italic text-gold">actually looks like.</span>
          </h2>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 flex items-end">
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-light">
            Three anonymized sessions, presented as they were returned to the guest.
            No dashboards. No scores in isolation. A short essay on the interior of a moment.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 border-t border-border/60">
        {samples.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: i * 0.12, ease }}
            className={`p-8 lg:p-10 border-b border-border/60 ${
              i < 2 ? "md:border-r" : ""
            }`}
          >
            <p className="eyebrow text-gold mb-6">Reading № {s.n}</p>

            <p className="editorial-italic text-xl leading-snug text-foreground mb-8">
              {s.spoken}
            </p>

            <div className="gold-hairline mb-6" />

            <p className="eyebrow mb-2">Felt</p>
            <p className="text-sm text-foreground font-light mb-6">{s.felt}</p>

            <p className="eyebrow mb-2">Unsaid</p>
            <p className="text-sm text-foreground font-light mb-6 leading-relaxed">{s.unsaid}</p>

            <p className="eyebrow mb-2">Tone</p>
            <p className="text-xs text-muted-foreground font-light leading-relaxed">{s.tone}</p>
          </motion.div>
        ))}
      </div>

      <p className="eyebrow text-center mt-10 text-muted-foreground">
        Composed by the session · Names and details omitted
      </p>
    </section>
  );
};

export default SampleReadings;
