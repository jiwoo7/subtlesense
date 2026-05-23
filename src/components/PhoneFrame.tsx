export default function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050507] flex items-center justify-center">

      {/* DESKTOP = NORMAL */}
      <div className="hidden md:block w-full">
        {children}
      </div>

      {/* MOBILE = PHONE UI */}
      <div className="block md:hidden w-full flex justify-center relative">

        {/* glow */}
        <div className="absolute w-[500px] h-[500px] bg-purple-600/30 blur-[120px] rounded-full"></div>

        {/* phone */}
        <div className="w-[390px] h-[844px] rounded-[40px] border border-white/10 bg-[#0d0d0d] shadow-xl overflow-hidden">

          <div className="h-full overflow-y-auto px-4 py-6">
            {children}
          </div>

        </div>
      </div>

    </div>
  );
}
