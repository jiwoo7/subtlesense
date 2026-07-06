# Launch-Ready in 1 Credit

You have 3 credits and are launching this month. Here's the smallest, highest-impact slice — everything below fits in **one build message**, leaving 2 credits as safety buffer for last-minute fixes.

## What to ship (single pass)

### 1. Trust & legitimacy (biggest conversion lift)
- **Live counter strip** above Founder Note: "X readings this week · Y Founding Members reserved" — pulls real numbers from `sessions` + `waitlist` tables. Nothing signals "real startup" like real numbers.
- **"Featured in" placeholder strip** (editorial serif, monochrome): *Product Hunt · Indie Hackers · Hacker News* — remove any you can't honestly claim on launch day.

### 2. Launch-day essentials
- **SEO meta polish** in `index.html`: sharper title + description matching new positioning ("For the ones who over-explain and under-feel").
- **OG social preview**: ensure title/description are set for when the link is shared on Twitter/LinkedIn/Product Hunt.
- **404 page** quick check — make sure it matches editorial style (not default).

### 3. Conversion polish
- **Sticky "Reserve Founding Spot" CTA** on mobile scroll (only appears after hero) — mobile is where Product Hunt traffic lands.
- **Waitlist confirmation toast** upgrade: after email submit, show "You're #47 in line" (uses existing waitlist count).

### 4. One safety fix
- Verify `join-waitlist` edge function actually delivers to your inbox (Brevo integration) before launch — if it silently fails on launch day, you lose every signup.

## What to skip (not worth credits pre-launch)
- Weekly letter feature (Phase 2) — post-launch when you have users
- Real Stripe wiring — waitlist is enough signal now
- Onboarding walkthrough — your zero-friction entry already works
- Analytics events — GA4 basics are enough for week 1

## Technical scope
- New: `LiveCounter.tsx`, `PressStrip.tsx`, `MobileStickyCTA.tsx`
- Edit: `index.html` (meta), `Landing.tsx` + `MobileLanding.tsx` (mount new components), `WaitlistDialog.tsx` (position toast), one `read_query` to verify waitlist rows
- No schema changes, no new edge functions

## Credit budget
- **1 credit**: everything above in a single focused build
- **1 credit reserve**: last-minute copy/visual tweaks after you preview
- **1 credit reserve**: launch-day emergency fix

Approve and I'll ship it in one pass. If you want to cut further, tell me which of the 4 sections to drop.
