export default function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0b0b0f] flex items-center justify-center relative overflow-hidden">

      <div className="absolute w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full"></div>
      <div className="absolute w-[400px] h-[400px] bg-pink-500/20 blur-[100px] rounded-full right-0 bottom-0"></div>

      <div className="w-[390px] h-[844px] rounded-[40px] border border-white/10 bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] shadow-2xl overflow-hidden relative">
        
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent blur-2xl opacity-60"></div>

        <div className="relative h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
