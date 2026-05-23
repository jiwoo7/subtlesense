export default function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#07070a] flex items-center justify-center relative overflow-hidden">

      {/* BIG BACKGROUND GLOW */}
      <div className="absolute w-[600px] h-[600px] bg-purple-600/30 blur-[140px] rounded-full"></div>
      <div className="absolute w-[500px] h-[500px] bg-pink-500/20 blur-[120px] rounded-full right-[-100px] bottom-[-100px]"></div>

      {/* PHONE FRAME */}
      <div className="w-[390px] h-[844px] rounded-[42px] border border-white/10 bg-[#0d0d0d] shadow-[0_0_80px_rgba(168,85,247,0.25)] overflow-hidden relative">

        {/* INNER GRADIENT GLOW */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent pointer-events-none"></div>

        {/* SAFE AREA CONTENT */}
        <div className="relative h-full w-full overflow-y-auto px-4 py-6">
          {children}
        </div>

      </div>
    </div>
  );
}
