import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Star, Sun, Moon, Coffee } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import logoUrl from "@/assets/subtle-sense-logo.png";

const WelcomeMessage = () => {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState<string>("");
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("display_name, full_name")
          .eq("user_id", user.id)
          .single();

        if (data) {
          setDisplayName(data.display_name || data.full_name || user.email?.split("@")[0] || "friend");
        } else {
          setDisplayName(user.email?.split("@")[0] || "friend");
        }
      }
    };

    fetchProfile();
  }, [user]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { greeting: "Good morning", icon: Sun };
    if (hour < 17) return { greeting: "Good afternoon", icon: Coffee };
    if (hour < 21) return { greeting: "Good evening", icon: Star };
    return { greeting: "Good evening", icon: Moon };
  };

  const cuteMessages = [
    "Take a moment. Then begin when you are ready.",
    "Whatever surfaces today is worth noticing.",
    "A quiet check-in is enough.",
    "Every emotion here is valid.",
  ];

  const { greeting } = getTimeBasedGreeting();
  const randomMessage = cuteMessages[Math.floor(Math.random() * cuteMessages.length)];

  if (!user) return null;

  return (
    <AnimatePresence>
      {showMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          className="glass-panel rounded-sm p-4 mb-6 border border-border"
        >
          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-border"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <img src={logoUrl} alt="Subtle Sense" className="w-full h-full object-cover" />
            </motion.div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="editorial-heading text-xl sm:text-2xl text-foreground">
                  {greeting}, {displayName}
                </h3>
                
              </div>
              <p className="text-sm text-muted-foreground truncate font-light">
                {randomMessage}
              </p>
            </div>

            <motion.button
              onClick={() => setShowMessage(false)}
              className="text-muted-foreground hover:text-foreground p-1 flex-shrink-0"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ✕
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeMessage;
