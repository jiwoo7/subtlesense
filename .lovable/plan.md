### Scope
Fix the 4 real bugs identified in the audit. One build message, ~4 small edits.

### 1. Suppress `OfflineGame` on `/auth`
**File:** `src/components/OfflineGame.tsx`
- Import `useLocation` from `react-router-dom`.
- Problem: `OfflineGame` is rendered in `App.tsx` *outside* `<BrowserRouter>`, so `useLocation` won't work there.
- Fix approach: Move `<OfflineGame />` *inside* `<BrowserRouter>` in `src/App.tsx` (just below `<Suspense>` wrapper or as a sibling to `<Routes>`), then inside `OfflineGame.tsx` use `useLocation()` and early-return `null` when `pathname.startsWith("/auth")`.

### 2. Journal migration dedup (prevent double-insert across devices)
**File:** `src/components/JournalSection.tsx`
- Add a `migrated_from_local` boolean column check by querying existing entries first: before inserting local rows, fetch the user's existing `journal_entries` `created_at` values, then filter local entries to only those whose `created_at` isn't already present in cloud.
- Keep the localStorage `journal_migrated_${user.id}` flag for same-device fast-path.
- This prevents re-upload on a second device that still has stale local data.

### 3. `OfflineGame` retry button shouldn't hard-reload when still offline
**File:** `src/components/OfflineGame.tsx`
- Replace `window.location.reload()` with: check `navigator.onLine` → if true, `setShowGame(false)` + `setDismissed(false)`; if still false, show a brief toast "Still offline — we'll auto-resume when you reconnect."
- Import `toast` from `sonner`.

### 4. Swap `Heart` → Subtle Sense logo in MobileBottomNav Companion tab
**File:** `src/components/MobileBottomNav.tsx`
- Remove `Heart` from `lucide-react` imports.
- Replace the Companion tab's icon entry: instead of an icon component, render an `<img src={logoUrl} className="w-4 h-4 rounded-full object-cover" />`.
- Update the `tabs` array shape to allow either `icon` or `img`, OR keep array as-is and special-case Companion in the render loop (simpler — special-case in render).
- Import `logoUrl from "@/assets/subtle-sense-logo.png"`.

### Out of scope (intentionally skipped)
- BreathingBubble timer jitter (cosmetic, pre-existing)
- WelcomeMessage rotate animation tweak (cosmetic)
- Toast z-index conflict with OfflineGame (edge case)
- Medical disclaimer, AI error retry, OG image (separate launch items)

### Verification
- Open `/auth` with DevTools offline → confirm no overlay appears.
- Mobile bottom nav Companion tab shows logo, not heart.
- Click "Retry connection" while offline → toast appears, no reload.
- Journal migration: log in fresh, confirm local entries upload once; reload, confirm no duplicates.
