import { useEffect, useState } from "react";

export type ThemePreset = "midnight" | "sunset" | "forest";

const KEY = "subtlesense-theme-preset";

export const THEME_PRESETS: { id: ThemePreset; label: string; emoji: string; desc: string; swatch: string }[] = [
  { id: "midnight", label: "Midnight", emoji: "🌙", desc: "Pink + purple neon", swatch: "linear-gradient(135deg,#ec4899,#a855f7,#ef4444)" },
  { id: "sunset",   label: "Sunset",   emoji: "🌅", desc: "Warm orange & red",  swatch: "linear-gradient(135deg,#fb923c,#ef4444,#f43f5e)" },
  { id: "forest",   label: "Forest",   emoji: "🌲", desc: "Calm teal & green",  swatch: "linear-gradient(135deg,#10b981,#06b6d4,#14b8a6)" },
];

export function applyThemePreset(preset: ThemePreset) {
  document.documentElement.setAttribute("data-theme", preset);
  try { localStorage.setItem(KEY, preset); } catch {}
}

export function useThemePreset() {
  const [preset, setPreset] = useState<ThemePreset>(() => {
    if (typeof window === "undefined") return "midnight";
    try { return (localStorage.getItem(KEY) as ThemePreset) || "midnight"; } catch { return "midnight"; }
  });

  useEffect(() => { applyThemePreset(preset); }, [preset]);

  return { preset, setPreset };
}
