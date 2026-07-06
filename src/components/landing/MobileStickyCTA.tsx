import { useEffect, useState } from "react";

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
        className="pointer-events-auto w-full py-3.5 rounded-full bg-foreground text-background editorial-heading text-sm tracking-[0.18em] uppercase shadow-2xl"
        style={{ boxShadow: "0 10px 40px hsl(var(--primary) / 0.35)" }}
      >
        Reserve founding spot
      </button>
    </div>
  );
};

export default MobileStickyCTA;
