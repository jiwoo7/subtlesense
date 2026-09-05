import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import logoUrl from "@/assets/subtle-sense-logo.png";
import Seo from "@/components/Seo";
import { guides } from "@/content/guides";

const ease = [0.25, 1, 0.5, 1] as const;

const Guides = () => {
  return (
    <div className="min-h-[100dvh] bg-background relative">
      <Seo
        title="The Quiet Library — Guides on Suppressed and Masked Emotion"
        description="Essays and practical guides on naming what you feel: suppressed emotion, masked expression, journaling prompts and emotional vocabulary."
        path="/guides"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "The Quiet Library",
          url: "https://subtlesense.lovable.app/guides",
          hasPart: guides.map((g) => ({
            "@type": "Article",
            headline: g.title,
            url: `https://subtlesense.lovable.app/guides/${g.slug}`,
          })),
        }}
      />

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
          className="mb-12 sm:mb-16"
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
          <p className="eyebrow mb-6 text-gold">The Quiet Library</p>
          <h1 className="editorial-heading text-4xl sm:text-5xl lg:text-6xl leading-[1.02] text-foreground">
            Writing on what <br />
            <span className="editorial-italic text-gold">goes unsaid.</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground font-light mt-6 leading-relaxed max-w-xl">
            Slow, practical pieces on suppressed feeling, composed faces, and the vocabulary that makes
            an interior state workable. Free to read, no account required.
          </p>
        </motion.header>

        <div className="gold-hairline mb-10" />

        <div className="divide-y divide-border/50 border-y border-border/50">
          {guides.map((g, i) => (
            <motion.div
              key={g.slug}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.05, ease }}
            >
              <Link to={`/guides/${g.slug}`} className="group flex gap-5 sm:gap-8 py-8">
                <span className="eyebrow text-gold pt-2 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <h2 className="editorial-heading text-2xl sm:text-3xl text-foreground leading-tight">
                    {g.title}
                  </h2>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed mt-3">
                    {g.standfirst}
                  </p>
                  <p className="eyebrow mt-4 text-muted-foreground/70">{g.readingTime} read</p>
                </div>
                <ArrowUpRight
                  className="w-4 h-4 text-primary/50 group-hover:text-primary transition-colors mt-2 shrink-0"
                  strokeWidth={1.4}
                />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="gold-hairline mt-14 mb-8" />
        <p className="eyebrow text-muted-foreground">
          Est. 2025 · Written by Naiyya Thapa · Not a medical device
        </p>
      </div>
    </div>
  );
};

export default Guides;
