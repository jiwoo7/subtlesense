const outlets = ["Product Hunt", "Indie Hackers", "Hacker News", "A quiet corner of Twitter"];

const PressStrip = () => (
  <section className="container mx-auto px-6 sm:px-8 lg:px-12 py-8 border-t border-border/40">
    <p className="eyebrow text-muted-foreground text-center mb-5">Coming to</p>
    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:gap-x-14 opacity-70">
      {outlets.map((o) => (
        <span
          key={o}
          className="editorial-italic text-base sm:text-lg text-foreground/80 tracking-wide"
        >
          {o}
        </span>
      ))}
    </div>
  </section>
);

export default PressStrip;
