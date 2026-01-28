import { motion } from "framer-motion";
import { Heart, Sparkles, Star, History, BarChart3, LogOut, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface DashboardHeaderProps {
  activeTab: "analyze" | "history" | "moodboard";
  setActiveTab: (tab: "analyze" | "history" | "moodboard") => void;
}

const DashboardHeader = ({ activeTab, setActiveTab }: DashboardHeaderProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    toast.success("See you soon! 👋");
    navigate("/");
  };

  const tabs = [
    { id: "analyze" as const, label: "Analyze", icon: Sparkles, emoji: "🎯" },
    { id: "history" as const, label: "History", icon: History, emoji: "📊" },
    { id: "moodboard" as const, label: "Mood Board", icon: BarChart3, emoji: "🎨" },
  ];

  return (
    <motion.header
      className="relative py-3 sm:py-4"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        {/* Top row - Logo and user menu */}
        <div className="flex items-center justify-between w-full sm:w-auto">
          <div className="flex items-center gap-3 sm:gap-4">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl pastel-gradient flex items-center justify-center shadow-lg">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white" />
                </motion.div>
                <motion.div
                  className="absolute -top-1 -right-1"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-pastel-yellow" />
                </motion.div>
              </div>
            </motion.div>
            
            <div>
              <h1 className="font-display text-xl sm:text-2xl font-extrabold gradient-text">
                Subtle Sense
              </h1>
              <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">
                Welcome back! ✨
              </p>
            </div>
          </div>

          {/* Mobile user actions */}
          <div className="flex items-center gap-2 sm:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/settings")}
              className="rounded-full h-8 w-8"
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSignOut}
              className="rounded-full h-8 w-8"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Navigation Tabs - Full width on mobile */}
        <div className="flex items-center justify-center w-full sm:w-auto glass-panel rounded-full p-1 sm:p-1.5 overflow-x-auto">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "pastel-gradient text-white shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-sm sm:text-base">{tab.emoji}</span>
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Desktop User Menu */}
        <div className="hidden sm:flex items-center gap-3">
          <motion.div
            className="flex items-center gap-2 px-4 py-2 glass-panel rounded-full"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-8 h-8 rounded-full pastel-gradient-soft flex items-center justify-center">
              <User className="w-4 h-4 text-foreground" />
            </div>
            <span className="text-sm font-medium">
              {user?.email?.split("@")[0]}
            </span>
          </motion.div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/settings")}
            className="rounded-full"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSignOut}
            className="rounded-full"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default DashboardHeader;
