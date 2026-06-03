# June Launch Polish — Credit-Smart Plan

Goal: fix every mobile flaw from the audit in **3 batched messages** instead of 15+ small ones. Each batch groups related files so we pay for one round of reasoning, not many.

Estimated total: ~3 build messages. Keep plan-mode chatter minimal between batches.

---

## Batch 1 — Mobile Shell, Nav & Safety (1 message)

Everything that touches global layout, so we edit it once.

- **`PhoneFrame.tsx`** — remove the pink blur halo that causes edge overflow on small Androids; add `overflow-x-hidden` guarantees.
- **`MobileLanding.tsx` bottom nav**:
  - Add `pb-[env(safe-area-inset-bottom)]` so iPhone home indicator stops covering it.
  - Make tabs route-aware (active state based on current path).
  - Bump all `text-[9px]` / `text-[10px]` labels to `text-[11px]` minimum (WCAG).
  - Add `aria-label` to every icon-only tab button.
- **Dashboard / Games / Playlists pages** — add `pb-24` so last card isn't hidden under the floating nav.
- **`index.html`** — add per-route-friendly meta description + OG tags placeholder; add `<meta name="theme-color">` for mobile browser chrome.

---

## Batch 2 — Trust, Data Honesty & Auth Flow (1 message)

Grouped because they all touch the same "first impression → signup" journey.

- **MobileLanding hero** — replace hardcoded mood landscape (Overthinking 78% etc.) with either real last-session values from Supabase (if logged in) or an "Example" badge so it's not misleading.
- **`JournalSection.tsx`** — on login, auto-migrate `subtlesense-local-journal` entries to Supabase, then clear localStorage. Show toast: "Your journal entries are now synced."
- **Dashboard analysis result** — append small inline medical disclaimer ("Informational only, not medical advice") under each result.
- **AI failure UX** — in `MediaUploadZone` / `RealAnalysisDashboard`, add a graceful error card with a Retry button instead of silent failure.
- **Auth page mobile** — reorder so Google sign-in is above email; standardize all "Login to save" copy across `SessionHistory`, `EmotionTimeline`, `MoodBoard`, `StreakBadge` to one shared component.
- **PWA `InstallPrompt`** — delay until 2nd visit (check localStorage visit counter).

---

## Batch 3 — Performance & Polish (1 message)

- **`Landing.tsx`** — gate the desktop landing behind a `useIsMobile` check so mobiles don't parse the heavy desktop tree (currently both render, just one is `hidden`).
- **Logo/mascot `<img>`** — add explicit `width` / `height` to prevent CLS; add `loading="eager"` + `fetchpriority="high"` on hero, `loading="lazy"` elsewhere.
- **Streak badge** — show ghost "Start your streak → Login" version for unauth users instead of hiding.
- **Companion chat mobile** — ensure close button reachable; add swipe-down-to-dismiss handler.
- **OG image** — generate one branded 1200x630 image with `imagegen`, wire into `index.html`.
- **Premium page** — confirm ₹399/₹2999 toggle hit area + add sticky bottom CTA on mobile only.

---

## Credit-Saving Rules I'll Follow

1. **Batch all file edits in parallel** within each message — one round of model reasoning, many writes.
2. **No "try to fix" loops** — I'll verify changes via `code--view` and the preview screenshot, not by guessing.
3. **No design-direction prototypes** for these fixes — they're deterministic edits, not visual explorations.
4. **No new backend tables / migrations** — everything is frontend + one localStorage→Supabase migration on existing `journals` table.
5. **Skip rewrites** — surgical `line_replace` edits only.

---

## What I'm NOT doing (to save credits)

- No first-time coachmark tour — nice-to-have, not launch-blocking.
- No SSR for social previews — would require migration off Vite.
- No new analytics events.
- No refactor of working desktop code.

If you approve, reply "go" and I'll start Batch 1. After each batch you can preview, then say "next" for the following batch.