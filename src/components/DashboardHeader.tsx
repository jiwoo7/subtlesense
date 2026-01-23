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
      className="relative py-4"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative w-12 h-12 rounded-xl pastel-gradient flex items-center justify-center shadow-lg">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart className="w-6 h-6 text-white fill-white" />
              </motion.div>
              <motion.div
                className="absolute -top-1 -right-1"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Sparkles className="w-3 h-3 text-pastel-yellow" />
              </motion.div>
            </div>
          </motion.div>
          
          <div>
            <h1 className="font-display text-2xl font-extrabold gradient-text">
              EmotionAI
            </h1>
            <p className="text-xs text-muted-foreground font-medium">
              Welcome back! ✨
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 glass-panel rounded-full p-1.5">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "pastel-gradient text-white shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{tab.emoji}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </motion.button>
          ))}
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-3">
          <motion.div
            className="flex items-center gap-2 px-4 py-2 glass-panel rounded-full"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-8 h-8 rounded-full pastel-gradient-soft flex items-center justify-center">
              <User className="w-4 h-4 text-foreground" />
            </div>
            <span className="text-sm font-medium hidden sm:inline">
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
