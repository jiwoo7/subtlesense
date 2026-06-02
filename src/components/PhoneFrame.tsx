export default function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050507] flex items-center justify-center overflow-x-hidden">

      {/* DESKTOP = NORMAL */}
      <div className="hidden md:block w-full">
        {children}
      </div>

      {/* MOBILE = PHONE UI */}
      <div className="block md:hidden w-full min-h-[100dvh] relative overflow-x-hidden">
        <div className="pointer-events-none absolute left-1/2 top-6 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />

        <div className="relative mx-auto w-full max-w-[430px] min-h-[100dvh] overflow-x-hidden bg-background shadow-xl">
          {children}
        </div>
      </div>

    </div>
  );
}
