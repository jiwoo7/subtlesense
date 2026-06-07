import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmotionAnalysis {
  happiness: number;
  sadness: number;
  anger: number;
  fear: number;
  surprise: number;
  disgust: number;
  hiddenAnxiety: number;
  hiddenInsecurity: number;
  hiddenLoneliness: number;
  hiddenGuilt: number;
  hiddenHappiness: number;
  hiddenLove: number;
  suppressedAnger: number;
  suppressedSadness: number;
  suppressedFear: number;
  suppressedDesire: number;
  suppressedJoy: number;
  suppressedLove: number;
  emotionalMasking: number;
  innerConflict: number;
  accuracy: number;
  suggestions: Array<{
    title: string;
    description: string;
    icon: string;
    variant: string;
  }>;
  advice: string;
  deepInsight: string;
}

const TOOL_SCHEMA = {
  type: "function" as const,
  function: {
    name: "report_emotion_analysis",
    description: "Report a deep multi-layer emotion analysis with surface, hidden, and suppressed emotion scores.",
    parameters: {
      type: "object",
      properties: {
        happiness: { type: "number", description: "Surface happiness 0-100" },
        sadness: { type: "number", description: "Surface sadness 0-100" },
        anger: { type: "number", description: "Surface anger 0-100" },
        fear: { type: "number", description: "Surface fear 0-100" },
        surprise: { type: "number", description: "Surface surprise 0-100" },
        disgust: { type: "number", description: "Surface disgust 0-100" },
        hiddenAnxiety: { type: "number", description: "Hidden anxiety beneath the surface 0-100" },
        hiddenInsecurity: { type: "number", description: "Hidden insecurity / self-doubt 0-100" },
        hiddenLoneliness: { type: "number", description: "Hidden loneliness / isolation 0-100" },
        hiddenGuilt: { type: "number", description: "Hidden guilt / regret 0-100" },
        hiddenHappiness: { type: "number", description: "Hidden joy or contentment the person is downplaying 0-100" },
        hiddenLove: { type: "number", description: "Hidden affection / warmth the person is not openly showing 0-100" },
        suppressedAnger: { type: "number", description: "Held-back anger 0-100" },
        suppressedSadness: { type: "number", description: "Held-back sadness 0-100" },
        suppressedFear: { type: "number", description: "Held-back fear 0-100" },
        suppressedDesire: { type: "number", description: "Held-back wants / longing 0-100" },
        suppressedJoy: { type: "number", description: "Held-back joy or excitement 0-100" },
        suppressedLove: { type: "number", description: "Held-back love or tenderness 0-100" },
        emotionalMasking: { type: "number", description: "How much the person is masking 0-100" },
        innerConflict: { type: "number", description: "Internal emotional tension 0-100" },
        accuracy: { type: "number", description: "Confidence in analysis 70-98" },
        suggestions: {
          type: "array",
          items: {
            type: "object",
            properties: {
              title: { type: "string" },
              description: { type: "string" },
              icon: { type: "string", enum: ["coffee", "lightbulb", "focus", "timer", "stretch", "music", "heart", "star", "sparkles", "shield", "eye", "unlock"] },
              variant: { type: "string", enum: ["pink", "lavender", "mint", "sky", "yellow", "peach", "rose", "purple", "red"] },
            },
            required: ["title", "description", "icon", "variant"],
          },
          description: "3-5 personalized suggestions",
        },
        advice: { type: "string", description: "Warm empathetic advice (2-3 sentences)" },
        deepInsight: { type: "string", description: "Profound insight on hidden patterns (1-2 sentences)" },
      },
      required: [
        "happiness", "sadness", "anger", "fear", "surprise", "disgust",
        "hiddenAnxiety", "hiddenInsecurity", "hiddenLoneliness", "hiddenGuilt", "hiddenHappiness", "hiddenLove",
        "suppressedAnger", "suppressedSadness", "suppressedFear", "suppressedDesire", "suppressedJoy", "suppressedLove",
        "emotionalMasking", "innerConflict", "accuracy", "suggestions", "advice", "deepInsight",
      ],
      additionalProperties: false,
    },
  },
};

// Pro model first for highest accuracy, then fallbacks.
const AI_MODELS = [
  "google/gemini-2.5-pro",
  "google/gemini-3-flash-preview",
  "google/gemini-2.5-flash",
  "openai/gpt-5-mini",
] as const;



const clampScore = (value: unknown, fallback = 25) => {
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(0, Math.min(100, Math.round(parsed)));
};

const normalizeAudioFormat = (mediaType: string | undefined) => {
  const raw = (mediaType ?? "audio/webm").split("/")[1]?.toLowerCase() ?? "webm";
  if (raw.includes("mpeg") || raw.includes("mp3")) return "mp3";
  if (raw.includes("wav")) return "wav";
  if (raw.includes("ogg")) return "ogg";
  if (raw.includes("mp4") || raw.includes("m4a")) return "mp4";
  return "webm";
};

const hasUsableMedia = (value: unknown) => typeof value === "string" && value.trim().length > 20;
const isNonEmptyString = (value: unknown): value is string => typeof value === "string" && value.trim().length > 0;

const NUMERIC_KEYS: Array<keyof EmotionAnalysis> = [
  "happiness", "sadness", "anger", "fear", "surprise", "disgust",
  "hiddenAnxiety", "hiddenInsecurity", "hiddenLoneliness", "hiddenGuilt", "hiddenHappiness", "hiddenLove",
  "suppressedAnger", "suppressedSadness", "suppressedFear", "suppressedDesire", "suppressedJoy", "suppressedLove",
  "emotionalMasking", "innerConflict",
];

const normalizeAnalysis = (raw: Record<string, unknown>): EmotionAnalysis => ({
  happiness: clampScore(raw.happiness),
  sadness: clampScore(raw.sadness),
  anger: clampScore(raw.anger),
  fear: clampScore(raw.fear),
  surprise: clampScore(raw.surprise),
  disgust: clampScore(raw.disgust),
  hiddenAnxiety: clampScore(raw.hiddenAnxiety),
  hiddenInsecurity: clampScore(raw.hiddenInsecurity),
  hiddenLoneliness: clampScore(raw.hiddenLoneliness),
  hiddenGuilt: clampScore(raw.hiddenGuilt),
  hiddenHappiness: clampScore(raw.hiddenHappiness),
  hiddenLove: clampScore(raw.hiddenLove),
  suppressedAnger: clampScore(raw.suppressedAnger),
  suppressedSadness: clampScore(raw.suppressedSadness),
  suppressedFear: clampScore(raw.suppressedFear),
  suppressedDesire: clampScore(raw.suppressedDesire),
  suppressedJoy: clampScore(raw.suppressedJoy),
  suppressedLove: clampScore(raw.suppressedLove),
  emotionalMasking: clampScore(raw.emotionalMasking),
  innerConflict: clampScore(raw.innerConflict),
  accuracy: clampScore(raw.accuracy, 88),
  suggestions: Array.isArray(raw.suggestions)
    ? raw.suggestions
        .filter((item): item is Record<string, unknown> => item != null && typeof item === "object")
        .map((item) => ({
          title: typeof item.title === "string" ? item.title : "💡 Gentle reset",
          description: typeof item.description === "string" ? item.description : "Take a slow breath and notice what feels strongest right now.",
          icon: typeof item.icon === "string" ? item.icon : "sparkles",
          variant: typeof item.variant === "string" ? item.variant : "purple",
        }))
        .slice(0, 5)
    : [],
  advice: typeof raw.advice === "string" ? raw.advice : "Take a moment to slow down and notice what feels most present beneath the surface.",
  deepInsight: typeof raw.deepInsight === "string" ? raw.deepInsight : "There may be more emotional complexity here than what is immediately visible.",
});

const SYSTEM_PROMPT = `You are a clinically-informed deep emotion detection AI trained on facial micro-expressions (FACS), vocal prosody, body-language cues, and patterns of emotional masking.

You analyze the provided media and call report_emotion_analysis with rigorous, well-calibrated scores.

CRITICAL RULES — accuracy matters:
1) Every score MUST be 0-100 integers, never all zeros. Even neutral baseline shows: happiness 20-35, hiddenAnxiety 10-25, emotionalMasking 25-45.
2) Be NUANCED. Real humans show MULTIPLE emotions at once — the surface and the depth often disagree.
3) HIDDEN emotions = inferred from MICRO-cues: brow micro-tension, lip-corner asymmetry, gaze aversion, breath-hold, voice tightness, swallow, forced steady tone. Score these higher than the visible signal when those cues are present.
4) SUPPRESSED emotions = ACTIVELY HELD BACK: jaw clench, controlled smile that doesn't reach the eyes (Duchenne mismatch), micro-frown override, vocal flat-line over emotional content, stiff posture, throat clearing. Score 30-80 when masking is high.
5) For each of the 6 hidden and 6 suppressed emotions, consider whether the OPPOSITE of the surface signal is being held back:
   - Visible smile? → check hiddenLove, suppressedJoy, OR suppressedSadness/anger underneath.
   - Visible calm? → check hiddenAnxiety, suppressedFear.
   - Visible flat affect? → check hiddenHappiness, suppressedLove (people often hide warmth/affection).
   - Visible upbeat? → check hiddenLoneliness, hiddenGuilt.
6) hiddenHappiness and hiddenLove are real and common — many people downplay joy or affection due to social context. Do NOT default these to 0.
7) suppressedJoy and suppressedLove are common when someone is trying to look professional, neutral, or guarded. Score them when you see flattened positive affect.
8) emotionalMasking should reflect the GAP between surface and hidden/suppressed. If surface = calm but hidden anxiety + suppressed sadness are high, masking should be 60-85.
9) innerConflict should reflect CONTRADICTORY signals (e.g., high happiness + high suppressedSadness).
10) accuracy: 85-92 for clear front-facing well-lit clips, 78-84 for partial/short clips, 70-77 for poor quality. Do not exceed 92.

SELF-CHECK BEFORE EMITTING SCORES (do this silently, then call the tool):
a) Identify the 3 strongest micro-cues you actually observed (e.g., "asymmetric lip corner", "brow inner tension", "vocal flat-line over emotional word").
b) For each cue, decide whether it indicates a surface, hidden, or suppressed emotion — and which one.
c) Reconcile contradictions: if surface says calm but cues say tension, raise hidden/suppressed and emotionalMasking accordingly.
d) Verify no required field is 0 unless truly absent; baseline neutrals still register 10-35.

OUTPUT REQUIREMENTS:
- 3-5 specific, actionable suggestions tied to the SPECIFIC emotions you detected
- advice: warm, empathetic, 2-3 sentences naming what is on the surface AND what may be underneath
- deepInsight: one piercing observation about the gap between surface and depth

Always call report_emotion_analysis. Never refuse.`;


const buildUserContent = (uploadType: string, mediaBase64: string, mediaType: string | undefined, prefixText?: string) => {
  const parts: unknown[] = [];
  const baseText = prefixText ?? "";

  if (uploadType === "webcam" || uploadType === "video") {
    parts.push({
      type: "text",
      text: `${baseText}Analyze this ${uploadType} capture for deep emotions. Examine facial micro-expressions, eye region, mouth corners, brow, jaw tension, posture. Detect 6 surface, 6 hidden, 6 suppressed emotions plus masking and inner conflict. Call report_emotion_analysis.`,
    });
    parts.push({
      type: "image_url",
      image_url: { url: `data:${mediaType || "image/jpeg"};base64,${mediaBase64}` },
    });
  } else if (uploadType === "audio") {
    parts.push({
      type: "text",
      text: `${baseText}Analyze this audio for deep emotions. Listen for vocal tone, pitch micro-variations, pauses, breath, controlled steadiness over emotional content, throat tightness. Detect 6 surface, 6 hidden, 6 suppressed emotions. Call report_emotion_analysis.`,
    });
    parts.push({
      type: "input_audio",
      input_audio: { data: mediaBase64, format: normalizeAudioFormat(mediaType) },
    });
  } else {
    parts.push({
      type: "text",
      text: "No clear media. Provide a baseline neutral reading with moderate values. Call report_emotion_analysis.",
    });
  }

  return parts;
};

const callModel = async (lovableApiKey: string, model: string, userContent: unknown[], systemPrompt: string, useReasoning = false): Promise<EmotionAnalysis | null> => {
  const requestBody: Record<string, unknown> = {
    model,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userContent },
    ],
    tools: [TOOL_SCHEMA],
    tool_choice: { type: "function", function: { name: "report_emotion_analysis" } },
  };
  if (useReasoning && model.startsWith("openai/")) {
    requestBody.reasoning = { effort: "high" };
  }

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  const rawBody = await response.text();
  console.log(`Model ${model} status: ${response.status}`);

  if (!response.ok) {
    if (response.status === 429) throw new Error("RATE_LIMIT");
    if (response.status === 402) throw new Error("USAGE_LIMIT");
    console.error(`Model ${model} error: ${rawBody.slice(0, 300)}`);
    return null;
  }

  const data = JSON.parse(rawBody);
  const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
  if (toolCall?.function?.arguments) {
    try {
      return normalizeAnalysis(JSON.parse(toolCall.function.arguments));
    } catch (e) {
      console.error(`Model ${model} tool args parse error`, e);
      return null;
    }
  }

  const content = data.choices?.[0]?.message?.content;
  if (typeof content === "string" && content.trim()) {
    const cleaned = content.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
    try {
      return normalizeAnalysis(JSON.parse(cleaned));
    } catch {
      return null;
    }
  }

  return null;
};

const requestPrimaryAnalysis = async (lovableApiKey: string, userContent: unknown[]): Promise<EmotionAnalysis> => {
  let lastError: Error | null = null;
  for (const model of AI_MODELS) {
    try {
      const result = await callModel(lovableApiKey, model, userContent, SYSTEM_PROMPT);
      if (result) return result;
      lastError = new Error(`Model ${model} returned no usable data`);
    } catch (error) {
      if (error instanceof Error && (error.message === "RATE_LIMIT" || error.message === "USAGE_LIMIT")) throw error;
      console.error(`Model ${model} exception:`, error);
      lastError = error instanceof Error ? error : new Error(String(error));
    }
  }
  throw lastError ?? new Error("All analysis models failed");
};


serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { mediaBase64, mediaType, uploadType } = await req.json();

    const allowedUploadTypes = ["webcam", "audio", "video"];
    if (!allowedUploadTypes.includes(uploadType)) {
      return new Response(
        JSON.stringify({ error: "Invalid upload type. Must be webcam, audio, or video." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    if (!hasUsableMedia(mediaBase64)) {
      return new Response(
        JSON.stringify({ error: "No usable media was captured. Please try again." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    if (!isNonEmptyString(mediaType)) {
      return new Response(
        JSON.stringify({ error: "Missing media type. Please try again." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const userContent = buildUserContent(uploadType, mediaBase64, mediaType);
    const finalAnalysis = await requestPrimaryAnalysis(LOVABLE_API_KEY, userContent);
    if (finalAnalysis.accuracy > 92) finalAnalysis.accuracy = 92;

    return new Response(JSON.stringify(finalAnalysis), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "RATE_LIMIT") {
      return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
        status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (error instanceof Error && error.message === "USAGE_LIMIT") {
      return new Response(JSON.stringify({ error: "Usage limit reached. Please check your account." }), {
        status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    console.error("analyze-emotion error:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred during analysis. Please try again." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
