import MobileBottomNav from "@/components/MobileBottomNav";

export default function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center overflow-x-hidden">
      {/* DESKTOP = NORMAL */}
      <div className="hidden md:block w-full">{children}</div>

      {/* MOBILE = PHONE UI */}
      <div className="block md:hidden w-full min-h-[100dvh] relative overflow-x-hidden">
        <div className="relative mx-auto w-full max-w-[430px] min-h-[100dvh] overflow-x-hidden bg-background shadow-xl">
          {children}
        </div>
        <MobileBottomNav />
      </div>
    </div>
  );
}
