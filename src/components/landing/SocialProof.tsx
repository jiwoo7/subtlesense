import { motion } from "framer-motion";

const quotes = [
  {
    text: "It named a feeling I've spent a year avoiding in three sentences. I didn't expect that from a browser tab.",
    who: "Early guest · Product designer",
  },
  {
    text: "My clients rehearse composure. Subtle Sense catches the pause I keep asking them about.",
    who: "Early guest · Somatic therapist",
  },
  {
    text: "Feels less like an app and more like a small ritual. Which is exactly what I wanted.",
    who: "Early guest · Writer",
  },
];

const ease = [0.25, 1, 0.5, 1] as const;

const SocialProof = () => {
  return (
    <section className="container mx-auto px-8 lg:px-12 py-24 border-t border-border/60">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <p className="eyebrow mb-6">Correspondence · Received</p>
        <h2 className="editorial-heading text-3xl md:text-4xl leading-tight">
          What early guests have <span className="editorial-italic text-gold">written back.</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {quotes.map((q, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, delay: i * 0.12, ease }}
            className="border border-border/60 p-8 flex flex-col justify-between"
          >
            <blockquote className="editorial-italic text-lg leading-relaxed text-foreground">
              &ldquo;{q.text}&rdquo;
            </blockquote>
            <div className="gold-hairline my-6" />
            <figcaption className="eyebrow text-muted-foreground">{q.who}</figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
};

export default SocialProof;
