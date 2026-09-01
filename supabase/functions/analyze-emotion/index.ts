import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

/**
 * Origin allow-list. The function is callable without a login, so the origin
 * check + per-IP rate limit are what keep the AI budget from being farmed by
 * third-party sites embedding or scripting this endpoint.
 */
const ALLOWED_ORIGINS = new Set<string>([
  "https://subtlesense.lovable.app",
  "http://localhost:8080",
  "http://localhost:5173",
]);

const isAllowedOrigin = (origin: string | null): boolean => {
  if (!origin) return false;
  if (ALLOWED_ORIGINS.has(origin)) return true;
  try {
    const { hostname, protocol } = new URL(origin);
    // Lovable preview / sandbox hosts for this project only
    return protocol === "https:" && (hostname.endsWith(".lovable.app") || hostname.endsWith(".lovable.dev"));
  } catch {
    return false;
  }
};

const buildCors = (origin: string | null) => ({
  "Access-Control-Allow-Origin": origin ?? "https://subtlesense.lovable.app",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Max-Age": "3600",
  Vary: "Origin",
  "X-Frame-Options": "DENY",
  "Content-Security-Policy": "frame-ancestors 'none'",
  "X-Content-Type-Options": "nosniff",
});

// --- Simple per-IP sliding-window rate limit (per instance) ---
const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_PER_WINDOW = 12;
const hits = new Map<string, number[]>();

const rateLimited = (ip: string): boolean => {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (list.length >= MAX_PER_WINDOW) {
    hits.set(ip, list);
    return true;
  }
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return false;
};

const MAX_MEDIA_BYTES = 8 * 1024 * 1024; // ~8MB of base64 payload
const ALLOWED_MIME = /^(image\/(jpeg|png|webp)|audio\/(webm|mp4|mpeg|wav|ogg)|video\/(mp4|webm|quicktime))$/;

const SYSTEM_PROMPT = `You are Subtle Sense, an expert affective-computing analyst.
You read a single frame, a short audio clip, or a short video and estimate three layers of emotion:
- Spoken (surface) emotions that are openly displayed
- Felt (hidden) emotions that leak through micro-expressions, tension, prosody
- Unsaid (suppressed) emotions the person is actively holding back

Be honest and calibrated. If the signal is weak, lower "accuracy" and keep values moderate.
Never diagnose. Never mention medical conditions. This is informational only.
Return ONLY a JSON object, no prose, no markdown fences, with exactly these keys
(all numbers 0-100 integers):
happiness, sadness, anger, fear, surprise, disgust,
hiddenAnxiety, hiddenInsecurity, hiddenLoneliness, hiddenGuilt, hiddenHappiness, hiddenLove,
suppressedAnger, suppressedSadness, suppressedFear, suppressedDesire, suppressedJoy, suppressedLove,
emotionalMasking, innerConflict, accuracy,
plus "advice" (2-3 warm sentences), "deepInsight" (2-3 sentences naming the gap between what is
shown and what is held), and "suggestions": an array of 3 objects
{ "title": string, "description": string, "icon": string, "variant": string }.
Before answering, silently re-check your own numbers for internal consistency
(e.g. high masking should pair with a gap between surface and suppressed layers).`;

const NUM_KEYS = [
  "happiness", "sadness", "anger", "fear", "surprise", "disgust",
  "hiddenAnxiety", "hiddenInsecurity", "hiddenLoneliness", "hiddenGuilt", "hiddenHappiness", "hiddenLove",
  "suppressedAnger", "suppressedSadness", "suppressedFear", "suppressedDesire", "suppressedJoy", "suppressedLove",
  "emotionalMasking", "innerConflict", "accuracy",
];

const clamp = (v: unknown): number => {
  const n = typeof v === "number" ? v : Number(v);
  if (!isFinite(n)) return 0;
  return Math.max(0, Math.min(100, Math.round(n)));
};

serve(async (req) => {
  const origin = req.headers.get("origin");
  const cors = buildCors(isAllowedOrigin(origin) ? origin : null);
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  // 1. Only our own app may call this endpoint.
  if (!isAllowedOrigin(origin)) {
    return json({ error: "This endpoint may only be called from Subtle Sense." }, 403);
  }

  // 2. Per-IP budget protection.
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("cf-connecting-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return json({ error: "You've reached the hourly reading limit. Please try again later." }, 429);
  }

  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") return json({ error: "Invalid request body" }, 400);

    const { mediaBase64, mediaType, uploadType, consent } = body as Record<string, unknown>;

    // 3. Explicit consent is required before any media is processed.
    if (consent !== true) {
      return json({ error: "Consent is required before your media can be analysed." }, 400);
    }

    if (typeof mediaBase64 !== "string" || !mediaBase64.trim()) {
      return json({ error: "No media received." }, 400);
    }
    if (mediaBase64.length > MAX_MEDIA_BYTES) {
      return json({ error: "That file is too large. Please use a shorter clip." }, 413);
    }
    if (typeof mediaType !== "string" || !ALLOWED_MIME.test(mediaType)) {
      return json({ error: "Unsupported media type." }, 400);
    }
    if (uploadType !== "webcam" && uploadType !== "audio" && uploadType !== "video") {
      return json({ error: "Unsupported input type." }, 400);
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) return json({ error: "AI is not configured." }, 500);

    const dataUrl = `data:${mediaType};base64,${mediaBase64}`;
    const content: unknown[] = [
      {
        type: "text",
        text: `Analyse this ${uploadType} capture and return the JSON object described in your instructions.`,
      },
    ];
    if (mediaType.startsWith("image/")) {
      content.push({ type: "image_url", image_url: { url: dataUrl } });
    } else if (mediaType.startsWith("audio/")) {
      const format = mediaType.split("/")[1]?.replace("mpeg", "mp3").replace("mp4", "m4a") ?? "webm";
      content.push({ type: "input_audio", input_audio: { data: mediaBase64, format } });
    } else {
      content.push({ type: "video_url", video_url: { url: dataUrl } });
    }

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3.7-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!aiRes.ok) {
      const detail = await aiRes.text();
      console.error("AI gateway error", aiRes.status, detail.slice(0, 500));
      if (aiRes.status === 429) return json({ error: "The reader is busy. Please try again in a moment." }, 429);
      if (aiRes.status === 402) return json({ error: "AI credits are exhausted. Please try again later." }, 402);
      return json({ error: "The reading could not be completed. Please try again." }, 502);
    }

    const payload = await aiRes.json();
    const raw = payload?.choices?.[0]?.message?.content ?? "";
    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(typeof raw === "string" ? raw.replace(/^```json\s*|```$/g, "").trim() : "");
    } catch {
      console.error("Unparseable AI response", String(raw).slice(0, 300));
      return json({ error: "The reading came back malformed. Please try again." }, 502);
    }

    const result: Record<string, unknown> = {};
    for (const key of NUM_KEYS) result[key] = clamp(parsed[key]);
    result.advice = typeof parsed.advice === "string" ? parsed.advice.slice(0, 1200) : "";
    result.deepInsight = typeof parsed.deepInsight === "string" ? parsed.deepInsight.slice(0, 1200) : "";
    result.suggestions = Array.isArray(parsed.suggestions)
      ? (parsed.suggestions as Record<string, unknown>[]).slice(0, 4).map((s) => ({
          title: String(s?.title ?? "").slice(0, 120),
          description: String(s?.description ?? "").slice(0, 400),
          icon: String(s?.icon ?? "sparkles").slice(0, 40),
          variant: String(s?.variant ?? "default").slice(0, 40),
        }))
      : [];

    // Media is never persisted — it lives only for the duration of this request.
    return json(result);
  } catch (error) {
    console.error("analyze-emotion error", error);
    return json({ error: "Something went wrong during the reading." }, 500);
  }
});
