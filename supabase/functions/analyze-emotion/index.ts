import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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

const ANALYSIS_SCHEMA = {
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
    accuracy: { type: "number", description: "Confidence in analysis 0-100" },
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
      description: "3-5 suggestions addressing both surface and hidden emotional needs"
    },
    advice: {
      type: "string",
      description: "Warm, empathetic advice acknowledging what they are showing and what they might be hiding"
    },
    deepInsight: {
      type: "string",
      description: "A profound insight about hidden emotional patterns and what may need acknowledgment or release"
    }
  },
  required: ["happiness", "sadness", "anger", "fear", "surprise", "disgust", "hiddenAnxiety", "hiddenInsecurity", "hiddenLoneliness", "hiddenGuilt", "suppressedAnger", "suppressedSadness", "suppressedFear", "suppressedDesire", "emotionalMasking", "innerConflict", "accuracy", "suggestions", "advice", "deepInsight"]
} as const;

const AI_MODELS = [
  "google/gemini-2.5-flash",
  "google/gemini-3-flash-preview",
  "openai/gpt-5-mini",
] as const;

const clampScore = (value: unknown, fallback = 0) => {
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

const stripCodeFences = (value: string) => value.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```$/i, "").trim();

const extractContentString = (content: unknown) => {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === "string") return part;
        if (part && typeof part === "object" && "text" in part && typeof (part as { text?: unknown }).text === "string") {
          return (part as { text: string }).text;
        }
        return "";
      })
      .join("\n")
      .trim();
  }

  return "";
};

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
        .map((item) => {
          if (typeof item === "string") {
            return {
              title: "💡 Try a clearer capture",
              description: item,
              icon: "sparkles",
              variant: "purple",
            };
          }

          if (item && typeof item === "object") {
            return {
              title: typeof item.title === "string" ? item.title : "💡 Gentle reset",
              description: typeof item.description === "string" ? item.description : "Take a slow breath and notice what emotion feels strongest right now.",
              icon: typeof item.icon === "string" ? item.icon : "sparkles",
              variant: typeof item.variant === "string" ? item.variant : "purple",
            };
          }

          return null;
        })
        .filter((item): item is { title: string; description: string; icon: string; variant: string } => item !== null)
        .map((item) => ({
          title: item.title,
          description: item.description,
          icon: item.icon,
          variant: item.variant,
        }))
        .slice(0, 5)
    : [],
  advice: typeof raw.advice === "string" ? raw.advice : "Take a moment to slow down and notice what feels most present beneath the surface.",
  deepInsight: typeof raw.deepInsight === "string" ? raw.deepInsight : "There may be more emotional complexity here than what is immediately visible.",
});

const buildUserContent = (uploadType: string, mediaBase64: string | undefined, mediaType: string | undefined) => {
  if ((uploadType === "webcam" || uploadType === "video") && mediaBase64) {
    return [
      {
        type: "text",
        text: `Deeply analyze this ${uploadType} capture. Go beyond surface emotions - detect HIDDEN emotions (anxiety, insecurity, loneliness, guilt masked beneath the surface) and SUPPRESSED emotions (anger, sadness, fear, desire being actively held back). Look for micro-expressions, body language incongruences, and emotional masking patterns.`
      },
      {
        type: "image_url",
        image_url: {
          url: `data:${mediaType || "image/jpeg"};base64,${mediaBase64}`
        }
      }
    ];
  }

  if (uploadType === "audio" && mediaBase64) {
    return [
      {
        type: "text",
        text: "Deeply analyze this audio recording. Go beyond surface emotions - detect HIDDEN emotions (underlying anxiety, insecurity, loneliness, guilt) and SUPPRESSED emotions (held-back anger, sadness, fear, desire). Listen for vocal inconsistencies, pauses, breathing patterns, and emotional masking in speech."
      },
      {
        type: "input_audio",
        input_audio: {
          data: mediaBase64,
          format: normalizeAudioFormat(mediaType),
        }
      }
    ];
  }

  return [
    {
      type: "text",
      text: "Analyze the available input and return the best possible emotional reading. If the input is limited, keep the confidence moderate and avoid overclaiming."
    }
  ];
};

const requestAnalysis = async (lovableApiKey: string, userContent: unknown[]) => {
  let lastError: Error | null = null;

  const systemPrompt = `You are an expert deep emotion detection AI specializing in analyzing not just surface emotions, but HIDDEN and SUPPRESSED emotions that people often mask or are unaware of.

SURFACE EMOTIONS (what they show):
1. Happiness (0-100)
2. Sadness (0-100)
3. Anger (0-100)
4. Fear (0-100)
5. Surprise (0-100)
6. Disgust (0-100)

HIDDEN EMOTIONS (what they feel but don't show clearly):
7. Hidden Anxiety (0-100)
8. Hidden Insecurity (0-100)
9. Hidden Loneliness (0-100)
10. Hidden Guilt (0-100)

SUPPRESSED EMOTIONS (what they are actively holding back):
11. Suppressed Anger (0-100)
12. Suppressed Sadness (0-100)
13. Suppressed Fear (0-100)
14. Suppressed Desire (0-100)

META EMOTIONAL STATES:
15. Emotional Masking (0-100)
16. Inner Conflict (0-100)

Be deeply empathetic. Return ONLY a valid JSON object matching the requested schema. No markdown, no extra commentary.`;

  for (const model of AI_MODELS) {
    try {
      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${lovableApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userContent }
          ],
          response_format: {
            type: "json_object"
          }
        }),
      });

      const rawBody = await response.text();

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("RATE_LIMIT");
        }

        if (response.status === 402) {
          throw new Error("USAGE_LIMIT");
        }

        lastError = new Error(`AI gateway error (${model}): ${response.status} ${rawBody}`);
        continue;
      }

      const data = JSON.parse(rawBody);
      const content = stripCodeFences(extractContentString(data.choices?.[0]?.message?.content));

      if (!content) {
        lastError = new Error(`Empty AI response for model ${model}`);
        continue;
      }

      return normalizeAnalysis(JSON.parse(content));
    } catch (error) {
      if (error instanceof Error && (error.message === "RATE_LIMIT" || error.message === "USAGE_LIMIT")) {
        throw error;
      }

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
    // Optional authentication - allow unauthenticated for landing page demo
    const authHeader = req.headers.get('Authorization');
    let userId: string | null = null;

    if (authHeader?.startsWith('Bearer ')) {
      try {
        const supabaseClient = createClient(
          Deno.env.get('SUPABASE_URL') ?? '',
          Deno.env.get('SUPABASE_ANON_KEY') ?? '',
          { global: { headers: { Authorization: authHeader } } }
        );
        const token = authHeader.replace('Bearer ', '');
        const { data: claimsData, error: authError } = await supabaseClient.auth.getClaims(token);
        if (!authError && claimsData?.claims) {
          userId = claimsData.claims.sub as string;
        }
      } catch (_) {
        // Continue without auth
      }
    }

    const { mediaBase64, mediaType, uploadType } = await req.json();

    // Validate uploadType to prevent injection
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
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (error instanceof Error && error.message === "USAGE_LIMIT") {
      return new Response(JSON.stringify({ error: "Usage limit reached. Please check your account." }), {
        status: 402,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.error("analyze-emotion error:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred during analysis. Please try again." }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
