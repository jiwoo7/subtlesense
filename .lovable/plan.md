## Tier A — 7 Audit Fixes (one build message)

### 1. Remove fake "10K+ Happy Learners" from StatsSection
`src/components/StatsSection.tsx` — drop the 4th stat, switch grid to `grid-cols-3` on both breakpoints.

### 2. Scrub "Join thousands of learners…" copy
`src/components/CTASection.tsx` — replace with honest copy ("Start understanding your emotions today" or similar, no learner counts).

### 3. Delete orphaned `src/pages/Index.tsx`
Not referenced in `App.tsx` routes. Removes dead bundle weight + another fake stat surface.

### 4. Fix mobile "Emotion landscape" — label as Example
`src/components/landing/MobileLanding.tsx` — add a small "Example" badge next to the heading so the hardcoded 78/65/42/71 numbers don't read as real user data. (Logged-in users will eventually see real data in a later batch; for launch, labeling is the safe fix.)

### 5. Companion tab reliability
`src/components/MobileBottomNav.tsx` — when "Companion" is tapped and we're not on `/`, navigate to `/` first then dispatch `subtle:open-companion` after a short delay, so CompanionChat (mounted on landing) reliably opens.

### 6. Remove unused `onAnalyze` prop on MobileLanding
`src/components/landing/MobileLanding.tsx` + caller in `src/pages/Landing.tsx` — drop the dead prop.

### 7. Standardize "Login to save" copy under Journal card
`src/components/landing/MobileLanding.tsx` — change Journal card sub from "Login to save" to "Track your mood" (works for both guest & logged-in, no auth-state branching).

---

### Files touched
- Edit: `StatsSection.tsx`, `CTASection.tsx`, `MobileLanding.tsx`, `MobileBottomNav.tsx`, `Landing.tsx`
- Delete: `src/pages/Index.tsx`

### Out of scope (Batch 3, later)
Performance/code-splitting, OG image, AI error retry, local→cloud journal migration, medical disclaimer placement.

Reply **"go"** to ship all 7 in one build message (~1 credit).