import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface SuggestionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  metric?: string;
  variant: "primary" | "secondary" | "success";
  delay?: number;
}

const variantStyles = {
  primary: {
    iconBg: "bg-primary/20",
    iconColor: "text-primary",
    border: "border-primary/30",
    glow: "shadow-[0_0_20px_hsla(180,100%,50%,0.2)]",
  },
  secondary: {
    iconBg: "bg-secondary/20",
    iconColor: "text-secondary",
    border: "border-secondary/30",
    glow: "shadow-[0_0_20px_hsla(270,70%,60%,0.2)]",
  },
  success: {
    iconBg: "bg-success/20",
    iconColor: "text-success",
    border: "border-success/30",
    glow: "shadow-[0_0_20px_hsla(160,84%,39%,0.2)]",
  },
};

const SuggestionCard = ({
  icon: Icon,
  title,
  description,
  metric,
  variant,
  delay = 0,
}: SuggestionCardProps) => {
  const styles = variantStyles[variant];

  return (
    <motion.div
      className={`glass-panel rounded-xl p-5 border ${styles.border} ${styles.glow} hover:scale-[1.02] transition-transform duration-300`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-lg ${styles.iconBg} flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-6 h-6 ${styles.iconColor}`} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h4 className="font-display font-semibold text-foreground truncate">
              {title}
            </h4>
            {metric && (
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${styles.iconBg} ${styles.iconColor}`}>
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
