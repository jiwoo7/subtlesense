import { useEffect, useRef } from "react";

const ZenSand = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const hue = useRef(330);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext("2d")!;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const pos = (e: React.PointerEvent) => {
    const r = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const start = (e: React.PointerEvent) => {
    drawing.current = true;
    last.current = pos(e);
  };
  const move = (e: React.PointerEvent) => {
    if (!drawing.current) return;
    const ctx = canvasRef.current!.getContext("2d")!;
    const p = pos(e);
    const l = last.current!;
    hue.current = (hue.current + 1) % 360;
    ctx.strokeStyle = `hsla(${hue.current}, 80%, 65%, 0.85)`;
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.shadowColor = ctx.strokeStyle;
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.moveTo(l.x, l.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last.current = p;
  };
  const end = () => {
    drawing.current = false;
    last.current = null;
  };

  const clear = () => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="p-4">
      <p className="text-center text-sm text-muted-foreground mb-3">
        Draw freely. No goal. Just trace.
      </p>
      <div className="relative rounded-2xl overflow-hidden glass-panel">
        <canvas
          ref={canvasRef}
          className="w-full h-[420px] touch-none cursor-crosshair block"
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerLeave={end}
        />
      </div>
      <div className="flex justify-center mt-4">
        <button onClick={clear} className="px-5 py-2 rounded-full glass-panel font-semibold">
          Clear
        </button>
      </div>
    </div>
  );
};

export default ZenSand;
