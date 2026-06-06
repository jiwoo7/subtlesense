## Tier B — Pre-launch build (one message, ~2 credits)

### 1. Heart → Subtle Sense logo (greeting card only)
`src/components/WelcomeMessage.tsx`
- Replace the pink-gradient circle containing `<Heart>` with the SS logo (`@/assets/subtle-sense-logo.png`) at the same 12×12 size, keep the soft rotate animation and pink glow ring.
- Remove the `Heart` import.
- No other heart icons touched (per your answer).

### 2. Offline "Wait & Play" mini-game
When the network drops, instead of just showing `OfflineIndicator`, surface a small playable distraction so users have something to do while waiting.

- New component `src/components/OfflineGame.tsx` — lightweight in-house mini (no new deps): a calming **Breathing Bubble** loop reusing logic from `src/components/games/BreathingBubble.tsx` wrapped in a full-screen offline overlay. Tap-to-pause, "You're offline — breathe while we wait" copy, auto-dismisses when `navigator.onLine` flips true (listen to `online` event).
- Wire-in: replace current `<OfflineIndicator />` mount in `App.tsx` with a combined `<OfflineIndicator />` (toast at top, unchanged) **plus** `<OfflineGame />` (overlay), so the toast still appears for quick blips and the game only auto-opens after offline persists >3 s.
- Dismissible: user can close the overlay and just see the toast.

### 3. Journal local → cloud migration (logged-in users)
Currently logged-in users' journal entries are written to `localStorage` in `JournalSection.tsx`, so they don't sync across devices and get lost on cache clear.

- On first mount when `user` exists:
  1. Read any existing `localStorage` journal entries.
  2. Upsert them into the existing `journals` Supabase table (schema already exists per memory).
  3. Clear the localStorage key after successful sync.
- Switch all CRUD in `JournalSection.tsx` to Supabase when `user` is present; keep localStorage path for guests.
- RLS already in place (existing `journals` table); no schema changes.
- Add a one-line toast on successful migration: "Synced N journal entries to your account."

### Files touched
- Edit: `src/components/WelcomeMessage.tsx`, `src/App.tsx`, `src/components/JournalSection.tsx`
- Create: `src/components/OfflineGame.tsx`

### Out of scope (post-launch)
Medical disclaimer placement, AI error retry UX, OG image, PWA install delay, code-splitting.

### Technical notes
- Offline detection: `window.addEventListener("online"/"offline", …)` + `navigator.onLine` initial check.
- No new packages.
- Journal migration is idempotent — guard with a `localStorage.getItem("journal_migrated_<userId>")` flag so it runs once per user per device.

Reply **"go"** to ship.