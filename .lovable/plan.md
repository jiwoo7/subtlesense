# Goal
Improve analysis accuracy while keeping the cost at **1 AI credit per analysis**.

# Current state
`supabase/functions/analyze-emotion/index.ts` runs **two AI calls**:
1. Primary pass (`gemini-2.5-pro` with fallbacks)
2. Verification pass (`gemini-2.5-flash`) that re-reads the media and blends results

That's ~2 credits per session. The verification pass adds latency and cost more than it adds accuracy, because the blend mostly trusts the smaller reviewer (60%).

# Plan (single edit, ~1 credit)
Edit only `supabase/functions/analyze-emotion/index.ts`:

1. **Remove the verification pass entirely** — delete `verifyAnalysis`, `VERIFY_MODEL`, `VERIFY_PROMPT`, and the `verifyAnalysis(...)` call in `serve`. Return `primary` directly.
2. **Strengthen the single pass** to recover the accuracy the verifier was contributing:
   - Use `google/gemini-2.5-pro` as the sole primary (best multimodal reasoning available in the gateway), with `gemini-3-flash-preview` and `gemini-2.5-flash` kept ONLY as fallbacks for when Pro is rate-limited / 402 / errors. Fallbacks never trigger on success, so steady-state cost stays at 1 credit.
   - Tighten `SYSTEM_PROMPT`: add an explicit self-check step ("before emitting scores, list the 3 strongest micro-cues you observed and reconcile surface vs hidden vs suppressed") so the single call reasons more carefully.
   - Cap returned `accuracy` at 92 (instead of 95) since we no longer have an agreement boost from two passes — keeps the displayed number honest.

# Out of scope
- No UI changes, no schema changes, no new dependencies, no DB changes.
- `MediaUploadZone`, `RealAnalysisDashboard`, and the client contract stay identical (same response shape).

# Verification
After the edit: trigger one webcam analysis from the preview, confirm the dashboard renders normal scores, and check edge-function logs show **one** `Model ... status: 200` line per request (not two).
