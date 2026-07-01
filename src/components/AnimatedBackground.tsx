/**
 * Quiet Luxury background surface.
 * No neon, no floating blobs — a subtle dark gradient mask
 * plus a fine linen/stone noise texture for material depth.
 */
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-0">
      {/* Base gradient mask — vignette that pulls the eye to center */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 20%, hsl(var(--foreground) / 0.05), transparent 60%), radial-gradient(ellipse 80% 60% at 50% 100%, hsl(var(--primary) / 0.06), transparent 55%)",
        }}
      />

      {/* Fine linen / stone noise — SVG fractal for organic material feel */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.9 0 0 0 0 0.88 0 0 0 0 0.85 0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: "240px 240px",
        }}
      />

      {/* Hairline horizon divider — editorial framing */}
      <div
        className="absolute left-0 right-0 top-1/2 h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(var(--border)) 25%, hsl(var(--border)) 75%, transparent)" }}
      />
    </div>
  );
};

export default AnimatedBackground;
