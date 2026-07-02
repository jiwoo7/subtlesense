import { useEffect, useState } from "react";

export type ThemePreset = "onyx" | "heritage" | "minimalist" | "opulence" | "estate" | "carrara";

const KEY = "subtlesense-theme-preset";

export const THEME_PRESETS: {
  id: ThemePreset;
  label: string;
  emoji: string;
  desc: string;
  swatch: string;
}[] = [
  {
    id: "onyx",
    label: "Onyx & Gold",
    emoji: "✦",
    desc: "Signature — Onyx & Antique Gold",
    swatch: "linear-gradient(135deg,#0A0A0A 0%,#0A0A0A 45%,#C9A24C 45%,#F1D98A 72%,#7A5A1E 100%)",
  },
  {
    id: "heritage",
    label: "Heritage",
    emoji: "⚜",
    desc: "Navy, Cream & Brass",
    swatch: "linear-gradient(135deg,#0A192F 0%,#0A192F 45%,#C5A880 45%,#C5A880 72%,#F9F6F0 72%)",
  },

  {
    id: "minimalist",
    label: "Minimalist",
    emoji: "🪨",
    desc: "Charcoal, Stone & Platinum",
    swatch: "linear-gradient(135deg,#1A1A1A 0%,#1A1A1A 45%,#4A4A4A 45%,#4A4A4A 72%,#E2E2E0 72%)",
  },
  {
    id: "opulence",
    label: "Opulence",
    emoji: "🪵",
    desc: "Espresso, Taupe & Champagne",
    swatch: "linear-gradient(135deg,#231F20 0%,#231F20 45%,#A89F91 45%,#A89F91 72%,#F5EBE6 72%)",
  },
  {
    id: "estate",
    label: "Estate",
    emoji: "🌲",
    desc: "Forest, Sage & Warm Bone",
    swatch: "linear-gradient(135deg,#1C2A22 0%,#1C2A22 45%,#8A9A86 45%,#8A9A86 72%,#F7F5F0 72%)",
  },
  {
    id: "carrara",
    label: "Carrara",
    emoji: "🏛️",
    desc: "Crisp Alabaster & Onyx",
    swatch: "linear-gradient(135deg,#F4F4F2 0%,#F4F4F2 45%,#C0C0C0 45%,#C0C0C0 72%,#111111 72%)",
  },
];

const VALID_IDS = new Set<ThemePreset>(THEME_PRESETS.map((t) => t.id));

export function applyThemePreset(preset: ThemePreset) {
  document.documentElement.setAttribute("data-theme", preset);
  try {
    localStorage.setItem(KEY, preset);
  } catch {
    /* ignore */
  }
}

export function useThemePreset() {
  const [preset, setPreset] = useState<ThemePreset>(() => {
    if (typeof window === "undefined") return "onyx";
    try {
      const stored = localStorage.getItem(KEY) as ThemePreset | null;
      if (stored && VALID_IDS.has(stored)) return stored;
    } catch {
      /* ignore */
    }
    return "onyx";
  });


  useEffect(() => {
    applyThemePreset(preset);
  }, [preset]);

  return { preset, setPreset };
}
