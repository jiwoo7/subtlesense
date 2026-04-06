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
  suppressedAnger: number;
  suppressedSadness: number;
  suppressedFear: number;
  suppressedDesire: number;
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
    description: "Report the full emotion analysis results with scores for surface, hidden, and suppressed emotions.",
    parameters: {
      type: "object",
      properties: {
        happiness: { type: "number", description: "Surface happiness level 0-100" },
        sadness: { type: "number", description: "Surface sadness level 0-100" },
        anger: { type: "number", description: "Surface anger level 0-100" },
        fear: { type: "number", description: "Surface fear level 0-100" },
        surprise: { type: "number", description: "Surface surprise level 0-100" },
        disgust: { type: "number", description: "Surface disgust level 0-100" },
        hiddenAnxiety: { type: "number", description: "Hidden anxiety beneath the surface 0-100" },
        hiddenInsecurity: { type: "number", description: "Hidden insecurity/self-doubt 0-100" },
        hiddenLoneliness: { type: "number", description: "Hidden loneliness/isolation 0-100" },
        hiddenGuilt: { type: "number", description: "Hidden guilt/regret 0-100" },
        suppressedAnger: { type: "number", description: "Suppressed/held-back anger 0-100" },
        suppressedSadness: { type: "number", description: "Suppressed/held-back sadness 0-100" },
        suppressedFear: { type: "number", description: "Suppressed/held-back fear 0-100" },
        suppressedDesire: { type: "number", description: "Suppressed wants/needs 0-100" },
        emotionalMasking: { type: "number", description: "How much they are masking true feelings 0-100" },
        innerConflict: { type: "number", description: "Internal emotional tension level 0-100" },
        accuracy: { type: "number", description: "Your confidence in this analysis 60-95" },
        suggestions: {
          type: "array",
          items: {
            type: "object",
            properties: {
              title: { type: "string", description: "Short actionable title with emoji" },
              description: { type: "string", description: "Supportive suggestion tied to the emotional reading" },
              icon: { type: "string", enum: ["coffee", "lightbulb", "focus", "timer", "stretch", "music", "heart", "star", "sparkles", "shield", "eye", "unlock"] },
              variant: { type: "string", enum: ["pink", "lavender", "mint", "sky", "yellow", "peach", "rose", "purple", "red"] }
            },
            required: ["title", "description", "icon", "variant"]
          },
          description: "3-5 personalized suggestions addressing emotional needs"
        },
        advice: { type: "string", description: "Warm, empathetic advice acknowledging surface and hidden emotions (2-3 sentences)" },
        deepInsight: { type: "string", description: "A profound insight about hidden emotional patterns (1-2 sentences)" }
      },
      required: ["happiness", "sadness", "anger", "fear", "surprise", "disgust", "hiddenAnxiety", "hiddenInsecurity", "hiddenLoneliness", "hiddenGuilt", "suppressedAnger", "suppressedSadness", "suppressedFear", "suppressedDesire", "emotionalMasking", "innerConflict", "accuracy", "suggestions", "advice", "deepInsight"],
      additionalProperties: false
    }
  }
};

const AI_MODELS = [
  "google/gemini-2.5-flash",
  "google/gemini-2.5-pro",
  "openai/gpt-5-mini",
] as const;

const clampScore = (value: unknown, fallback = 30) => {
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
  suppressedAnger: clampScore(raw.suppressedAnger),
  suppressedSadness: clampScore(raw.suppressedSadness),
  suppressedFear: clampScore(raw.suppressedFear),
  suppressedDesire: clampScore(raw.suppressedDesire),
  emotionalMasking: clampScore(raw.emotionalMasking),
  innerConflict: clampScore(raw.innerConflict),
  accuracy: clampScore(raw.accuracy, 75),
  suggestions: Array.isArray(raw.suggestions)
    ? raw.suggestions
        .filter((item): item is Record<string, unknown> => item != null && typeof item === "object")
        .map((item) => ({
          title: typeof item.title === "string" ? item.title : "💡 Gentle reset",
          description: typeof item.description === "string" ? item.description : "Take a slow breath and notice what emotion feels strongest right now.",
          icon: typeof item.icon === "string" ? item.icon : "sparkles",
          variant: typeof item.variant === "string" ? item.variant : "purple",
        }))
        .slice(0, 5)
    : [],
  advice: typeof raw.advice === "string" ? raw.advice : "Take a moment to slow down and notice what feels most present beneath the surface.",
  deepInsight: typeof raw.deepInsight === "string" ? raw.deepInsight : "There may be more emotional complexity here than what is immediately visible.",
});

const SYSTEM_PROMPT = `You are an expert deep emotion detection AI. You analyze facial expressions, body language, micro-expressions, vocal patterns, and overall emotional presentation.

Your task: Analyze the provided media and call the report_emotion_analysis function with your findings.

IMPORTANT RULES:
- Every emotion score MUST be between 0 and 100
- DO NOT return all zeros. Even neutral faces have baseline emotion levels (e.g., happiness 20-40 for a neutral expression)
- A completely neutral face should still show: happiness ~25, hiddenAnxiety ~15, emotionalMasking ~30, etc.
- Be nuanced: most people display multiple emotions simultaneously
- Hidden emotions are what you infer from subtle cues (micro-expressions, eye tension, posture)
- Suppressed emotions are ones being actively held back (jaw clenching, forced smiles, controlled breathing)
- accuracy should be 60-90 depending on image quality and clarity
- Provide 3-5 specific, actionable suggestions
- Write warm, empathetic advice and insights

SURFACE EMOTIONS: happiness, sadness, anger, fear, surprise, disgust (what they openly show)
HIDDEN EMOTIONS: hiddenAnxiety, hiddenInsecurity, hiddenLoneliness, hiddenGuilt (what they feel but mask)
SUPPRESSED EMOTIONS: suppressedAnger, suppressedSadness, suppressedFear, suppressedDesire (actively held back)
META: emotionalMasking (how much they hide), innerConflict (internal tension)`;

const buildUserContent = (uploadType: string, mediaBase64: string, mediaType: string | undefined) => {
  const parts: unknown[] = [];

  if (uploadType === "webcam" || uploadType === "video") {
    parts.push({
      type: "text",
      text: `Analyze this ${uploadType} capture for deep emotions. Look at facial expressions, micro-expressions, eye movements, body language, and emotional masking patterns. Detect surface emotions, hidden emotions beneath the surface, and suppressed emotions being actively held back. Call the report_emotion_analysis function with your complete analysis.`
    });
    parts.push({
      type: "image_url",
      image_url: {
        url: `data:${mediaType || "image/jpeg"};base64,${mediaBase64}`
      }
    });
  } else if (uploadType === "audio") {
    parts.push({
      type: "text",
      text: "Analyze this audio recording for deep emotions. Listen for vocal tone, pitch variations, pauses, breathing patterns, and emotional masking in speech. Detect surface emotions, hidden emotions, and suppressed emotions. Call the report_emotion_analysis function with your complete analysis."
    });
    parts.push({
      type: "input_audio",
      input_audio: {
        data: mediaBase64,
        format: normalizeAudioFormat(mediaType),
      }
    });
  } else {
    parts.push({
      type: "text",
      text: "No clear media was provided. Provide a baseline neutral emotional reading with moderate values. Call the report_emotion_analysis function."
    });
  }

  return parts;
};

const requestAnalysis = async (lovableApiKey: string, userContent: unknown[]): Promise<EmotionAnalysis> => {
  let lastError: Error | null = null;

  for (const model of AI_MODELS) {
    try {
      console.log(`Trying model: ${model}`);
      
      const requestBody: Record<string, unknown> = {
        model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userContent }
        ],
        tools: [TOOL_SCHEMA],
        tool_choice: { type: "function", function: { name: "report_emotion_analysis" } },
      };

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
        console.error(`Model ${model} error: ${rawBody}`);
        lastError = new Error(`AI gateway error (${model}): ${response.status}`);
        continue;
      }

      const data = JSON.parse(rawBody);
      
      // Extract from tool call response
      const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
      if (toolCall?.function?.arguments) {
        const args = JSON.parse(toolCall.function.arguments);
        console.log(`Model ${model} returned tool call successfully`);
        return normalizeAnalysis(args);
      }

      // Fallback: try to parse content as JSON
      const content = data.choices?.[0]?.message?.content;
      if (typeof content === "string" && content.trim()) {
        const cleaned = content.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
        try {
          const parsed = JSON.parse(cleaned);
          console.log(`Model ${model} returned JSON in content`);
          return normalizeAnalysis(parsed);
        } catch {
          console.error(`Model ${model} returned non-JSON content`);
        }
      }

      lastError = new Error(`Model ${model} returned no usable data`);
    } catch (error) {
      if (error instanceof Error && (error.message === "RATE_LIMIT" || error.message === "USAGE_LIMIT")) {
        throw error;
      }
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

    const allowedUploadTypes = ['webcam', 'audio', 'video'];
    if (!allowedUploadTypes.includes(uploadType)) {
      return new Response(
        JSON.stringify({ error: 'Invalid upload type. Must be webcam, audio, or video.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!hasUsableMedia(mediaBase64)) {
      return new Response(
        JSON.stringify({ error: 'No usable media was captured. Please try recording or uploading again.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!isNonEmptyString(mediaType)) {
      return new Response(
        JSON.stringify({ error: 'Missing media type. Please try again.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const userContent = buildUserContent(uploadType, mediaBase64, mediaType);
    const analysis = await requestAnalysis(LOVABLE_API_KEY, userContent);

    return new Response(JSON.stringify(analysis), {
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
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
