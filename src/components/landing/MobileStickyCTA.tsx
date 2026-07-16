import { useEffect, useState } from "react";
import { ChevronRight, Sparkles } from "lucide-react";

interface Props {
  onClick: () => void;
}

const MobileStickyCTA = ({ onClick }: Props) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="sm:hidden fixed left-0 right-0 bottom-4 z-40 px-5 pointer-events-none">
      <button
        onClick={onClick}
        className="pointer-events-auto w-full py-3.5 rounded-full bg-gradient-to-r from-foreground via-foreground to-foreground text-background editorial-heading text-sm tracking-[0.18em] uppercase shadow-2xl border border-white/10 backdrop-blur-sm"
        style={{ boxShadow: "0 14px 48px hsl(var(--primary) / 0.30)" }}
      >
        <span className="flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4" strokeWidth={1.6} />
          Reserve founding spot
          <ChevronRight className="w-4 h-4" strokeWidth={1.8} />
        </span>
      </button>
    </div>
  );
};

export default MobileStickyCTA;
