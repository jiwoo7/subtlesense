/**
 * Quiet Luxury background surface.
 * No neon, no floating blobs — a subtle dark gradient mask
 * plus a fine linen/stone noise texture for material depth.
 */
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-0">
      {/* Base gradient mask — soft gold vignette on onyx */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% 10%, hsl(var(--primary) / 0.10), transparent 55%), radial-gradient(ellipse 80% 50% at 50% 105%, hsl(var(--primary) / 0.06), transparent 55%)",
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

    </div>
  );
};

export default AnimatedBackground;
