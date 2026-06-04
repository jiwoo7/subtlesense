# Batch 2 (Revised) — Navigation, Streaks, Cleanup

Four focused fixes, all in one build message to save credits.

## 1. Fix "stuck after login" — Persistent Mobile Bottom Nav

Right now the bottom nav lives **inside** `MobileLanding.tsx`, which only renders on `/`. After login users land on `/dashboard` and lose access to Home / Companion / Tools / Profile.

- Extract the bottom-nav JSX into a new shared component `src/components/MobileBottomNav.tsx`.
- Render it once from `PhoneFrame.tsx` so it appears on **every** mobile route (`/`, `/dashboard`, `/games`, `/playlists`, `/settings`, `/auth`).
- Remove the duplicate nav from `MobileLanding.tsx`.
- Active tab still derives from `useLocation()` like Batch 1.
- Hide the nav on `/auth` so the login form has full height.

## 2. Show Streak in Top Bar When Logged In

- In `MobileLanding.tsx` top bar, when `currentUser` exists, replace the (now-removed) Premium button with a compact `StreakBadge` fetched via the existing `useStreak` hook.
- Falls back to nothing if streak is 0 (StreakBadge already handles this).

## 3. Remove "10K+ Happy Learners" (Fake Stat)

- Edit `src/components/StatsSection.tsx` — drop the "10K+ Happy Learners" item. Keep the 3 real metrics (Accuracy, Confusion Reduced, Real-time) and switch grid to `grid-cols-3`.

## 4. Remove Premium Completely

- Delete `src/pages/Premium.tsx` and `src/components/landing/PremiumComparisonTable.tsx`.
- Remove the `/premium` route + lazy import from `src/App.tsx`.
- Remove the Crown Premium button from `MobileLanding.tsx` top bar.
- Remove the Premium button + `<PremiumComparisonTable />` usage from `src/pages/Landing.tsx` (desktop).
- Drop unused `Crown` icon imports.

---

## Files touched

- **New**: `src/components/MobileBottomNav.tsx`
- **Edit**: `PhoneFrame.tsx`, `MobileLanding.tsx`, `StatsSection.tsx`, `App.tsx`, `Landing.tsx`
- **Delete**: `pages/Premium.tsx`, `components/landing/PremiumComparisonTable.tsx`

## What I'm NOT doing (saves credits)

- Not touching desktop layout beyond removing Premium references.
- Not changing the Dashboard internals — the shared nav alone fixes the access issue.
- Not auditing every "thousands of learners" copy line; only the visible stat card. (Let me know if you also want the `CTASection.tsx` line scrubbed — easy add.)

Reply **"go"** and I'll ship all four in one message. Then we still have Batch 3 (perf, OG image, AI error retry) left for ~1 more credit.