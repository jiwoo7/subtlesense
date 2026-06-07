import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { WifiOff, X, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import BreathingBubble from "@/components/games/BreathingBubble";

const OfflineGame = () => {
  const location = useLocation();
  const [showGame, setShowGame] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let timer: number | null = null;

    const scheduleGame = () => {
      if (timer) window.clearTimeout(timer);
      timer = window.setTimeout(() => setShowGame(true), 3000);
    };

    const handleOnline = () => {
      if (timer) window.clearTimeout(timer);
      setShowGame(false);
      setDismissed(false);
    };

    const handleOffline = () => {
      setDismissed(false);
      scheduleGame();
    };

    if (!window.navigator.onLine) scheduleGame();

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      if (timer) window.clearTimeout(timer);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Don't block the auth form when connection blips
  if (location.pathname.startsWith("/auth")) return null;

  const handleRetry = () => {
    if (typeof window !== "undefined" && window.navigator.onLine) {
      setShowGame(false);
      setDismissed(false);
      toast.success("You're back online!");
    } else {
      toast("Still offline", {
        description: "We'll auto-resume the moment you reconnect.",
      });
    }
  };

  const visible = showGame && !dismissed;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-background/95 backdrop-blur-md px-4"
        >
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss"
            className="absolute top-4 right-4 p-2 rounded-full bg-muted/60 hover:bg-muted text-foreground"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <WifiOff className="w-4 h-4 text-neon-pink" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              You're offline
            </span>
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-bold gradient-text mb-1 text-center">
            Breathe while we wait
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mb-2 text-center max-w-xs">
            We'll reconnect you the moment you're back online.
          </p>

          <BreathingBubble />

          <button
            onClick={handleRetry}
            className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <RefreshCw className="w-3 h-3" /> Retry connection
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OfflineGame;
