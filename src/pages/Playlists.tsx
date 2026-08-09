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
    <div className="min-h-screen bg-background">
      <header className="container mx-auto px-5 sm:px-6 py-4 flex items-center justify-between gap-2">
        <Link to="/" className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.24em] uppercase text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.4} /> Back
        </Link>
        <h1 className="editorial-heading text-base sm:text-2xl text-foreground truncate">Mood Playlists</h1>
        <button
          onClick={surprise}
          className="inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 border border-primary/50 text-primary whitespace-nowrap hover:bg-primary/10 transition-colors"
          style={{ borderRadius: 2 }}
        >
          <Shuffle className="w-3 h-3" strokeWidth={1.4} /> Surprise
        </button>
      </header>
      <div className="container mx-auto px-5 sm:px-6"><div className="gold-hairline opacity-60" /></div>

      <main className="container mx-auto px-5 sm:px-6 pb-28 sm:pb-12 pt-8">
        <p className="text-center text-[12.5px] sm:text-sm text-muted-foreground font-light mb-8 max-w-xl mx-auto">
          Tap any playlist to open it in Spotify.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto">
          {MOODS.map((m, i) => (
            <div
              key={m.id}
              className={`border bg-card/40 p-4 sm:p-5 transition-colors ${
                pick?.id === m.id ? "border-primary/70" : "border-border/60"
              }`}
              style={{ borderRadius: 2 }}
            >
              <div className="flex items-baseline gap-3 mb-3">
                <span className="editorial-heading text-primary/50 text-[12px] tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h2 className="editorial-heading text-lg sm:text-xl text-foreground">{m.label}</h2>
                  <p className="text-[11.5px] text-muted-foreground font-light">{m.blurb}</p>
                </div>
              </div>
              <ul className="divide-y divide-border/50 border-t border-border/50">
                {m.playlists.map((p) => (
                  <li key={p.url}>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-2 text-[12.5px] font-light py-2.5 text-foreground/85 hover:text-primary transition-colors"
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
