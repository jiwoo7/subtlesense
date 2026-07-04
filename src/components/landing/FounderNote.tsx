import logoUrl from "@/assets/subtle-sense-logo.png";

const FounderNote = () => {
  return (
    <section className="container mx-auto px-8 lg:px-12 py-24 border-t border-border/60">
      <div className="max-w-3xl mx-auto">
        <p className="eyebrow mb-8 text-center">A note from the founder</p>

        <div className="flex items-center justify-center mb-8">
          <img
            src={logoUrl}
            alt=""
            className="w-14 h-14 object-contain opacity-90"
          />
        </div>

        <p className="editorial-heading text-2xl md:text-3xl leading-snug text-foreground text-center mb-8">
          I built <span className="editorial-italic text-gold">Subtle Sense</span> because
          the feelings I ignore are the ones that shape my week.
        </p>

        <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed text-center">
          Most emotion tools hand you a chart and disappear. I wanted something quieter —
          a small, private ritual that could tell me the thing I hadn't said out loud yet.
          If it names one feeling for you honestly, it has done its job.
        </p>

        <div className="gold-hairline my-10 max-w-[40%] mx-auto" />

        <p className="editorial-italic text-center text-foreground text-lg">
          &mdash; Naiyya Thapa
        </p>
        <p className="eyebrow text-center mt-2 text-muted-foreground">
          Founder · Subtle Sense
        </p>
      </div>
    </section>
  );
};

export default FounderNote;
