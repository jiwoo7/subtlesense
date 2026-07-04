# Subtle Sense — Honest Review & Startup Readiness Plan

## What I genuinely love (as a user)

1. **The core insight is rare.** "Spoken / Felt / Unsaid" is a *narrative* over emotion data. Most competitors give you a bar chart; you give a mirror. That's the moat.
2. **The editorial "Quiet Luxury" aesthetic.** Gold hairlines, serif italics, generous whitespace — it doesn't look like an AI toy. It looks like something a therapist or a design-conscious professional would trust.
3. **Zero-friction entry.** Full analysis before sign-up is the right call. Most apps blow this.
4. **Privacy framing is honest.** "Processed in-session · Nothing stored without consent" is a real differentiator in a market full of black boxes.
5. **The Methodology page.** Very few AI apps admit their limits. That builds trust fast.
6. **Companion Chat + Mind Tools + Journal.** The "what do I do with this feeling" loop is where most emotion apps die. You closed it.

## What honestly holds it back from feeling like a startup

### A. Positioning is unclear
Right now the landing reads as "beautiful emotion mirror." A startup answers: **who is this for, and what changes in their life?** Options:
- Solo — self-awareness / journaling ritual
- Pros — therapists, coaches, HR/UX researchers
- Teams — leadership / interview prep / sales calls

Pick one primary wedge. Everything else becomes secondary.

### B. No reason to come back tomorrow
One-shot analyses don't build habit. Need: streaks (partially there), weekly emotional "letter," notifications, "compare to last week."

### C. No proof
Zero testimonials, no press, no sample outputs above the fold, no video demo. A luxury brand still needs receipts.

### D. No pricing / business model
Nothing signals this is a product with a future. Even a "Founding Member" waitlist tier at a price anchors value.

### E. Onboarding is thin
First-time users don't know: what to say, how long, what happens after. Needs a 15-second guided first session.

### F. Metrics blindspot
No analytics on: completion rate, share rate, return rate, drop-off in capture. Can't improve what isn't measured.

### G. Trust gaps
- No visible founder story on landing (only in footer)
- No "as seen in" / academic references beyond the methodology page
- No SOC2/GDPR/data-deletion badge cluster

---

## Proposed roadmap (phased, non-destructive)

### Phase 1 — Sharpen the pitch (frontend only, ~1 pass)
1. **Above-the-fold repositioning.** Replace "Discover what you're really feeling" with a single-audience promise + micro-proof (e.g. *"For the people who over-explain and under-feel. A 60-second reading of what you didn't say."*).
2. **Add a "How it feels" strip** with 3 real sample readings (anonymized cards) right after the hero. Removes the "what will I get?" anxiety.
3. **Founder note block** above the footer — one paragraph, signed, with the logo mark. Makes it feel human, not corporate.
4. **Social proof placeholder section** — even 3 hand-picked early-user quotes moves conversion measurably.

### Phase 2 — Habit loop
5. **"Your week in feeling" page** — auto-generated Sunday letter summarizing sessions, dominant unsaid emotion, one insight. Email + in-app.
6. **Streak upgrade** — visible on landing when signed in ("Day 4 of your interior study"). Ties into existing `useStreak`.
7. **Compare-to-last-session** widget in the results dashboard.

### Phase 3 — Business model signal
8. **Pricing page** (`/pricing`) — three tiers: Free (3/mo), Interior ($8/mo unlimited + weekly letter), Atelier ($24/mo history export + priority AI). Even without Stripe live, the page signals seriousness.
9. **Founding Member ribbon** on landing — "First 500 members: lifetime 50% off" with counter. Creates urgency + waitlist data.

### Phase 4 — Onboarding & trust
10. **15-second guided first session** — a modal walkthrough on first `/` visit: "Look into camera. Say one sentence about your day. That's it."
11. **Trust cluster** in footer — GDPR, in-session processing, delete-my-data button, methodology link, all in one row of small monochrome marks.
12. **Press/mentions strip** (even placeholder logos of intended targets like *The Verge, Wired, Fast Company* styled as "Coming to…") — remove if it feels dishonest.

### Phase 5 — Analytics & iteration (already have GA4)
13. Instrument: capture-started, capture-completed, result-shown, share-clicked, signup-from-result, return-visit-7d.
14. Add a lightweight "Was this reading accurate?" thumb after results (already have ExitPoll — reuse).

---

## Technical notes (for the builder in you)

- **Phase 1** is pure `src/pages/Landing.tsx` + one or two new components (`SampleReadings.tsx`, `FounderNote.tsx`, `SocialProof.tsx`) + mobile equivalents in `MobileLanding.tsx`. No backend changes.
- **Phase 2** needs a new edge function (`generate-weekly-letter`) that reads recent sessions + a cron trigger, plus a `/weekly` route. Uses existing Lovable AI.
- **Phase 3** is a static `/pricing` page for now. Real Stripe/Paddle wiring only when you have 100+ waitlist emails.
- **Phase 4** is a `useFirstVisit` hook + a Dialog. Trust cluster is footer-only edits.
- **Phase 5** = GA4 event calls sprinkled into existing handlers.

---

## My honest recommendation

**Do Phase 1 + Phase 3 (pricing page) first.** Those two alone change the perceived seriousness of the product more than anything else — they take it from "beautiful side project" to "startup a stranger would pay for."

Tell me which phases to build and I'll start with the smallest possible slice.
