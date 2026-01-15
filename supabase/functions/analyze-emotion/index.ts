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
  confusion: number;
  focus: number;
  excitement: number;
  accuracy: number;
  suggestions: Array<{
    title: string;
    description: string;
    icon: string;
    variant: string;
  }>;
  advice: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { mediaBase64, mediaType, uploadType } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let userContent: any[];
    const systemPrompt = `You are an expert emotion detection AI specializing in analyzing human emotional states during learning sessions. 

When analyzing media, detect and quantify these 9 emotions (each 0-100):
1. Happiness (0-100): Smiles, relaxed face, positive posture, light voice, joyful expressions
2. Sadness (0-100): Downturned mouth, droopy eyes, slumped posture, slow/soft speech
3. Anger (0-100): Furrowed brows, clenched jaw, tense muscles, raised voice, aggressive gestures
4. Fear (0-100): Wide eyes, raised eyebrows, tense expression, trembling, hesitant voice
5. Surprise (0-100): Raised eyebrows, wide open eyes, open mouth, gasps, sudden movements
6. Disgust (0-100): Wrinkled nose, curled lip, turned away, expressions of aversion
7. Confusion (0-100): Furrowed brows, squinting, head tilting, pauses, "umm" sounds
8. Focus (0-100): Steady gaze, minimal fidgeting, consistent speech, engaged posture
9. Excitement (0-100): Animated gestures, rapid speech, wide eyes, high energy, enthusiastic tone

Provide actionable, encouraging suggestions based on emotional state. Be supportive and empathetic.

IMPORTANT: Return your analysis as a function call using the analyze_emotions tool.`;

    if (uploadType === "webcam" || uploadType === "video") {
      userContent = [
        {
          type: "text",
          text: `Analyze this ${uploadType} capture from a learning session. Detect all 9 emotional states. Consider facial expressions, body language, and any visible signs of emotional state.`
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
          text: `Analyze this audio transcription from a learning session. Detect all 9 emotional states from speech patterns, word choice, and described feelings. Audio type: ${uploadType}. 
          
Note: Since this is audio-only, focus on vocal indicators like speech pace, word choice, and expressed frustrations.`
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
              description: "Return the emotion analysis results with 9 emotions",
              parameters: {
                type: "object",
                properties: {
                  happiness: { 
                    type: "number", 
                    description: "Happiness level from 0-100" 
                  },
                  sadness: { 
                    type: "number", 
                    description: "Sadness level from 0-100" 
                  },
                  anger: { 
                    type: "number", 
                    description: "Anger level from 0-100" 
                  },
                  fear: { 
                    type: "number", 
                    description: "Fear level from 0-100" 
                  },
                  surprise: { 
                    type: "number", 
                    description: "Surprise level from 0-100" 
                  },
                  disgust: { 
                    type: "number", 
                    description: "Disgust level from 0-100" 
                  },
                  confusion: { 
                    type: "number", 
                    description: "Confusion level from 0-100" 
                  },
                  focus: { 
                    type: "number", 
                    description: "Focus level from 0-100" 
                  },
                  excitement: { 
                    type: "number", 
                    description: "Excitement level from 0-100" 
                  },
                  accuracy: { 
                    type: "number", 
                    description: "Confidence in analysis accuracy from 70-95" 
                  },
                  suggestions: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        title: { type: "string", description: "Short actionable title with emoji" },
                        description: { type: "string", description: "Helpful supportive description" },
                        icon: { type: "string", enum: ["coffee", "lightbulb", "focus", "timer", "stretch", "music", "heart", "star", "sparkles"] },
                        variant: { type: "string", enum: ["pink", "lavender", "mint", "sky", "yellow", "peach", "rose"] }
                      },
                      required: ["title", "description", "icon", "variant"]
                    },
                    description: "3-5 personalized suggestions based on detected emotions"
                  },
                  advice: {
                    type: "string",
                    description: "A warm, encouraging paragraph of overall advice for improving the learning experience based on the emotional profile"
                  }
                },
                required: ["happiness", "sadness", "anger", "fear", "surprise", "disgust", "confusion", "focus", "excitement", "accuracy", "suggestions", "advice"]
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
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
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
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
