import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface SuggestionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  metric?: string;
  variant: "pink" | "lavender" | "mint" | "sky" | "yellow";
  delay?: number;
}

const variantStyles = {
  pink: "card-pink",
  lavender: "card-lavender",
  mint: "card-mint",
  sky: "card-sky",
  yellow: "card-yellow",
};

const iconColors = {
  pink: "bg-pastel-pink/30 text-pink-600",
  lavender: "bg-pastel-lavender/30 text-purple-600",
  mint: "bg-pastel-mint/30 text-emerald-600",
  sky: "bg-pastel-sky/30 text-blue-600",
  yellow: "bg-pastel-yellow/30 text-amber-600",
};

const SuggestionCard = ({
  icon: Icon,
  title,
  description,
  metric,
  variant,
  delay = 0,
}: SuggestionCardProps) => {
  return (
    <motion.div
      className={`rounded-2xl p-5 ${variantStyles[variant]} hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 cursor-pointer`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
    >
      <div className="flex items-start gap-4">
        <motion.div 
          className={`w-12 h-12 rounded-xl ${iconColors[variant]} flex items-center justify-center flex-shrink-0`}
          whileHover={{ rotate: 10, scale: 1.1 }}
        >
          <Icon className="w-6 h-6" />
        </motion.div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h4 className="font-display font-bold text-foreground">
              {title}
            </h4>
            {metric && (
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${iconColors[variant]}`}>
                {metric}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SuggestionCard;
