import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WifiOff, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const OfflineIndicator = () => {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const syncConnectionState = () => setIsOffline(!window.navigator.onLine);
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    syncConnectionState();
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleRetry = () => {
    if (typeof window === "undefined") return;
    window.location.reload();
  };

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-sm"
        >
          <motion.div
            className="glass-panel rounded-3xl p-8 max-w-md mx-4 text-center"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <motion.div
              className="w-20 h-20 rounded-full bg-gradient-to-br from-neon-pink to-neon-purple mx-auto mb-6 flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <WifiOff className="w-10 h-10 text-white" />
            </motion.div>

            <h2 className="font-display text-2xl font-bold gradient-text mb-3">
              No Internet Connection 📡
            </h2>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Oops! Looks like you're offline. Please check your internet connection to continue using Subtle Sense.
            </p>

            <Button
              onClick={handleRetry}
              className="bg-gradient-to-r from-neon-purple to-neon-pink text-white font-semibold gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OfflineIndicator;
