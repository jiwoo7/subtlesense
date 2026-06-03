import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Shuffle, ExternalLink } from "lucide-react";

type Mood = {
  id: string;
  label: string;
  emoji: string;
  blurb: string;
  playlists: { name: string; url: string }[];
};

const MOODS: Mood[] = [
  {
    id: "calm", label: "Calm", emoji: "🌿",
    blurb: "Soft textures to settle the mind",
    playlists: [
      { name: "Peaceful Piano", url: "https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO" },
      { name: "Calming Acoustic", url: "https://open.spotify.com/playlist/37i9dQZF1DX504r1DvyvxG" },
      { name: "Deep Focus", url: "https://open.spotify.com/playlist/37i9dQZF1DWZeKCadgRdKQ" },
    ],
  },
  {
    id: "uplift", label: "Uplift", emoji: "🌅",
    blurb: "Warm, hopeful, gentle energy",
    playlists: [
      { name: "Happy Hits!", url: "https://open.spotify.com/playlist/37i9dQZF1DXdPec7aLusmQ" },
      { name: "Feel-Good Indie", url: "https://open.spotify.com/playlist/37i9dQZF1DX2sUQwD7tbmL" },
      { name: "Mood Booster", url: "https://open.spotify.com/playlist/37i9dQZF1DX3rxVfibe1L0" },
    ],
  },
  {
    id: "focus", label: "Focus", emoji: "🎯",
    blurb: "Lo-fi loops for deep work",
    playlists: [
      { name: "lofi beats", url: "https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn" },
      { name: "Brain Food", url: "https://open.spotify.com/playlist/37i9dQZF1DWXLeA8Omikj7" },
      { name: "Instrumental Study", url: "https://open.spotify.com/playlist/37i9dQZF1DX9sIqqvKsjG8" },
    ],
  },
  {
    id: "release", label: "Release", emoji: "💧",
    blurb: "Sit with sadness, then let go",
    playlists: [
      { name: "Sad Songs", url: "https://open.spotify.com/playlist/37i9dQZF1DX7qK8ma5wgG1" },
      { name: "Life Sucks", url: "https://open.spotify.com/playlist/37i9dQZF1DX3YSRoSdA634" },
      { name: "Down in the Dumps", url: "https://open.spotify.com/playlist/37i9dQZF1DWVrtsSlLKzro" },
    ],
  },
  {
    id: "energy", label: "Energy", emoji: "⚡",
    blurb: "Channel restlessness into motion",
    playlists: [
      { name: "Beast Mode", url: "https://open.spotify.com/playlist/37i9dQZF1DX76Wlfdnj7AP" },
      { name: "Power Workout", url: "https://open.spotify.com/playlist/37i9dQZF1DX35oM5SPECmN" },
      { name: "Cardio", url: "https://open.spotify.com/playlist/37i9dQZF1DWSJHnPb1f0X3" },
    ],
  },
  {
    id: "sleep", label: "Sleep", emoji: "🌙",
    blurb: "Wind down, drift off",
    playlists: [
      { name: "Sleep", url: "https://open.spotify.com/playlist/37i9dQZF1DWZd79rJ6a7lp" },
      { name: "Night Rain", url: "https://open.spotify.com/playlist/37i9dQZF1DWUZ5bk6qqDSy" },
      { name: "Ambient Chill", url: "https://open.spotify.com/playlist/37i9dQZF1DX3Ogo9pFvBkY" },
    ],
  },
];

const Playlists = () => {
  const [pick, setPick] = useState<Mood | null>(null);

  const surprise = () => setPick(MOODS[Math.floor(Math.random() * MOODS.length)]);

  return (
    <div className="min-h-screen bubble-bg">
      <header className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs sm:text-sm hover:opacity-80">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <h1 className="font-display text-sm sm:text-xl font-bold gradient-text truncate">Mood Playlists 🎧</h1>
        <button
          onClick={surprise}
          className="inline-flex items-center gap-1 text-[11px] sm:text-sm px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full neon-gradient text-primary-foreground font-semibold whitespace-nowrap"
        >
          <Shuffle className="w-3 h-3" /> Surprise
        </button>
      </header>

      <main className="container mx-auto px-4 sm:px-6 pb-28 sm:pb-12">
        <p className="text-center text-xs sm:text-base text-muted-foreground mb-5 sm:mb-8 max-w-xl mx-auto">
          Tap any playlist to open in Spotify.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-5xl mx-auto">
          {MOODS.map((m) => (
            <div
              key={m.id}
              className={`glass-panel rounded-2xl p-3 sm:p-5 transition-all ${
                pick?.id === m.id ? "ring-2 ring-primary scale-[1.02]" : ""
              }`}
            >
              <div className="flex items-center gap-2.5 sm:gap-3 mb-2 sm:mb-3">
                <span className="text-2xl sm:text-3xl">{m.emoji}</span>
                <div className="min-w-0">
                  <h2 className="font-display text-base sm:text-lg font-bold">{m.label}</h2>
                  <p className="text-[11px] sm:text-xs text-muted-foreground">{m.blurb}</p>
                </div>
              </div>
              <ul className="space-y-1 sm:space-y-2">
                {m.playlists.map((p) => (
                  <li key={p.url}>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-2 text-xs sm:text-sm px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <span className="truncate">{p.name}</span>
                      <ExternalLink className="w-3 h-3 flex-shrink-0 opacity-60" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Playlists;
