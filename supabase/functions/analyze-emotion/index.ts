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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: authError } = await supabaseClient.auth.getClaims(token);
    if (authError || !claimsData?.claims) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { mediaBase64, mediaType, uploadType } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let userContent: any[];
    const systemPrompt = `You are an expert deep emotion detection AI specializing in analyzing not just surface emotions, but HIDDEN and SUPPRESSED emotions that people often mask or are unaware of.

SURFACE EMOTIONS (what they show):
1. Happiness (0-100): Visible joy, smiles, positive expressions
2. Sadness (0-100): Visible sadness, tears, downcast expressions
3. Anger (0-100): Visible frustration, tension, aggressive expressions
4. Fear (0-100): Visible worry, wide eyes, tense posture
5. Surprise (0-100): Visible shock, raised eyebrows
6. Disgust (0-100): Visible aversion, wrinkled nose

HIDDEN EMOTIONS (what they feel but don't show clearly):
7. Hidden Anxiety (0-100): Underlying worry masked by calm exterior - look for micro-expressions, fidgeting, breathing patterns, subtle tension
8. Hidden Insecurity (0-100): Self-doubt beneath confidence - overcompensation, seeking validation, defensive posture
9. Hidden Loneliness (0-100): Isolation masked by social engagement - distant gaze, forced smiles, disconnected energy
10. Hidden Guilt (0-100): Unspoken regret - avoiding eye contact, shrinking posture, self-soothing behaviors

SUPPRESSED EMOTIONS (what they're actively holding back):
11. Suppressed Anger (0-100): Held-back frustration - clenched jaw while smiling, tight shoulders, controlled voice
12. Suppressed Sadness (0-100): Pushed-down grief - throat clearing, forced cheerfulness, glassy eyes
13. Suppressed Fear (0-100): Masked vulnerability - over-confident tone, rigid posture, avoidance behaviors
14. Suppressed Desire (0-100): Hidden wants/needs - longing glances, hesitation before speaking, unfulfilled energy

META EMOTIONAL STATES:
15. Emotional Masking (0-100): How much they're hiding their true feelings
16. Inner Conflict (0-100): Internal emotional tension between what they feel vs show

Be deeply empathetic. Your goal is to help people understand their complete emotional landscape, including what they might not realize they're feeling.

IMPORTANT: Return your analysis as a function call using the analyze_emotions tool.`;

    if (uploadType === "webcam" || uploadType === "video") {
      userContent = [
        {
          type: "text",
          text: `Deeply analyze this ${uploadType} capture. Go beyond surface emotions - detect HIDDEN emotions (anxiety, insecurity, loneliness, guilt masked beneath the surface) and SUPPRESSED emotions (anger, sadness, fear, desire being actively held back). Look for micro-expressions, body language incongruences, and emotional masking patterns.`
        },
        {
          type: "image_url",
          image_url: {
            url: `data:image/jpeg;base64,${mediaBase64}`
          }
        }
      ];
    } else {
      userContent = [
        {
          type: "text",
          text: `Deeply analyze this audio from a session. Go beyond surface emotions - detect HIDDEN emotions (underlying anxiety, insecurity, loneliness, guilt) and SUPPRESSED emotions (held-back anger, sadness, fear, desire). Listen for vocal inconsistencies, pauses, breathing patterns, and emotional masking in speech.`
        }
      ];
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userContent }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "analyze_emotions",
              description: "Return deep emotion analysis including surface, hidden, and suppressed emotions",
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
                  emotionalMasking: { type: "number", description: "How much they're masking true feelings 0-100" },
                  innerConflict: { type: "number", description: "Internal emotional tension level 0-100" },
                  accuracy: { type: "number", description: "Confidence in analysis 70-95" },
                  suggestions: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        title: { type: "string", description: "Short actionable title with emoji" },
                        description: { type: "string", description: "Helpful supportive description addressing hidden/suppressed emotions" },
                        icon: { type: "string", enum: ["coffee", "lightbulb", "focus", "timer", "stretch", "music", "heart", "star", "sparkles", "shield", "eye", "unlock"] },
                        variant: { type: "string", enum: ["pink", "lavender", "mint", "sky", "yellow", "peach", "rose", "purple", "red"] }
                      },
                      required: ["title", "description", "icon", "variant"]
                    },
                    description: "3-5 suggestions addressing both surface and hidden emotional needs"
                  },
                  advice: {
                    type: "string",
                    description: "Warm, empathetic advice acknowledging what they're showing AND what they might be hiding"
                  },
                  deepInsight: {
                    type: "string",
                    description: "A profound insight about their hidden emotional patterns and what they might need to acknowledge or release"
                  }
                },
                required: ["happiness", "sadness", "anger", "fear", "surprise", "disgust", "hiddenAnxiety", "hiddenInsecurity", "hiddenLoneliness", "hiddenGuilt", "suppressedAnger", "suppressedSadness", "suppressedFear", "suppressedDesire", "emotionalMasking", "innerConflict", "accuracy", "suggestions", "advice", "deepInsight"]
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "analyze_emotions" } }
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Usage limit reached. Please check your account." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      console.error("AI gateway error:", response.status);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall || toolCall.function.name !== "analyze_emotions") {
      throw new Error("Invalid AI response format");
    }

    const analysis: EmotionAnalysis = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
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
