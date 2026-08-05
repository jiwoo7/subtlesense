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
    <div className="sm:hidden fixed left-0 right-0 bottom-[88px] z-30 px-6 pointer-events-none">
      <button
        onClick={onClick}
        className="pointer-events-auto w-full py-3.5 bg-primary text-primary-foreground editorial-heading text-[11px] tracking-[0.24em] uppercase border border-primary/60"
        style={{ borderRadius: 2, boxShadow: "0 18px 44px hsl(var(--background) / 0.9)" }}
      >
        <span className="flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5" strokeWidth={1.4} />
          Reserve founding spot
          <ChevronRight className="w-3.5 h-3.5" strokeWidth={1.4} />
        </span>
      </button>
    </div>

  );
};

export default MobileStickyCTA;
