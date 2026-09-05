import { motion } from "framer-motion";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import logoUrl from "@/assets/subtle-sense-logo.png";
import Seo from "@/components/Seo";
import { getGuide, guides } from "@/content/guides";

const ease = [0.25, 1, 0.5, 1] as const;
const SITE = "https://subtlesense.lovable.app";

const GuideArticle = () => {
  const { slug } = useParams();
  const guide = getGuide(slug);

  if (!guide) return <Navigate to="/guides" replace />;

  const url = `${SITE}/guides/${guide.slug}`;
  const others = guides.filter((g) => g.slug !== guide.slug).slice(0, 3);

  return (
    <div className="min-h-[100dvh] bg-background relative">
      <Seo
        title={guide.metaTitle}
        description={guide.metaDescription}
        path={`/guides/${guide.slug}`}
        type="article"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: guide.title,
            description: guide.metaDescription,
            author: { "@type": "Person", name: "Naiyya Thapa" },
            publisher: { "@type": "Organization", name: "Subtle Sense" },
            dateModified: guide.updated,
            mainEntityOfPage: url,
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
              { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE}/guides` },
              { "@type": "ListItem", position: 3, name: guide.title, item: url },
            ],
          },
        ]}
      />

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-10 sm:py-16 max-w-3xl">
        <Link
          to="/guides"
          className="eyebrow inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors mb-10 sm:mb-14"
        >
          <ArrowLeft className="w-3 h-3" strokeWidth={1.5} />
          The Quiet Library
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
          <p className="eyebrow mb-6 text-gold">{guide.eyebrow}</p>
          <h1 className="editorial-heading text-4xl sm:text-5xl leading-[1.04] text-foreground">
            {guide.title}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground font-light mt-6 leading-relaxed max-w-xl">
            {guide.standfirst}
          </p>
          <p className="eyebrow mt-6 text-muted-foreground/70">
            {guide.readingTime} read · Naiyya Thapa
          </p>
        </motion.header>

        <div className="gold-hairline mb-14" />

        <article className="space-y-14">
          {guide.sections.map((s, i) => (
            <motion.section
              key={s.heading}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.04, ease }}
            >
              <h2 className="editorial-heading text-2xl sm:text-3xl text-foreground leading-tight mb-4">
                {s.heading}
              </h2>
              {s.paragraphs.map((p) => (
                <p
                  key={p.slice(0, 24)}
                  className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed mb-4"
                >
                  {p}
                </p>
              ))}
              {s.list && (
                <ul className="mt-5 space-y-3 border-l border-border/60 pl-5">
                  {s.list.map((item) => (
                    <li
                      key={item}
                      className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </motion.section>
          ))}
        </article>

        <div className="gold-hairline my-14" />

        <section>
          <p className="eyebrow text-gold mb-8">Questions</p>
          <div className="divide-y divide-border/50 border-y border-border/50">
            {guide.faqs.map((f) => (
              <div key={f.q} className="py-6">
                <h3 className="editorial-heading text-xl text-foreground leading-snug">{f.q}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed mt-3">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 text-center">
          <p className="editorial-italic text-xl sm:text-2xl text-foreground/90 leading-snug">
            &ldquo;The most important emotions are often the ones we never say out loud.&rdquo;
          </p>
          <Link to="/dashboard" className="btn-editorial inline-block mt-8">
            Begin a reading
          </Link>
        </section>

        <div className="gold-hairline mt-14 mb-8" />

        <section>
          <p className="eyebrow text-muted-foreground mb-6">Continue reading</p>
          <div className="divide-y divide-border/50 border-y border-border/50">
            {others.map((g) => (
              <Link
                key={g.slug}
                to={`/guides/${g.slug}`}
                className="group flex items-center justify-between gap-4 py-5"
              >
                <span className="editorial-heading text-lg text-foreground leading-snug">
                  {g.title}
                </span>
                <ArrowUpRight
                  className="w-4 h-4 text-primary/50 group-hover:text-primary transition-colors shrink-0"
                  strokeWidth={1.4}
                />
              </Link>
            ))}
          </div>
        </section>

        <p className="eyebrow text-muted-foreground mt-10">
          Informational only · Not a diagnosis or medical advice
        </p>
      </div>
    </div>
  );
};

export default GuideArticle;
