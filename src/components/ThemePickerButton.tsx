import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useThemePreset, THEME_PRESETS } from "@/hooks/useThemePreset";

const ThemePickerButton = () => {
  const [open, setOpen] = useState(false);
  const { preset, setPreset } = useThemePreset();

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen((o) => !o)}
        className="rounded-full"
        title="Change theme"
        aria-label="Change theme"
      >
        <Palette className="w-4 h-4" />
      </Button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-56 z-50 glass-panel rounded-2xl border border-border/60 p-2 shadow-2xl"
            >
              <p className="px-3 pt-2 pb-1 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                Theme
              </p>
              {THEME_PRESETS.map((t) => {
                const active = preset === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setPreset(t.id);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-colors ${
                      active ? "bg-primary/10" : "hover:bg-muted/40"
                    }`}
                  >
                    <span
                      className="w-7 h-7 rounded-full ring-2 ring-border/50 flex-shrink-0"
                      style={{ background: t.swatch }}
                    />
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm font-semibold truncate">
                        {t.emoji} {t.label}
                      </span>
                      <span className="block text-[10px] text-muted-foreground truncate">
                        {t.desc}
                      </span>
                    </span>
                    {active && <Check className="w-4 h-4 text-primary flex-shrink-0" />}
                  </button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemePickerButton;
