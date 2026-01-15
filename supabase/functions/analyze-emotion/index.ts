import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmotionAnalysis {
  confusion: number;
  frustration: number;
  focus: number;
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

When analyzing media, detect and quantify:
1. Confusion Level (0-100): Signs include furrowed brows, squinting, head tilting, pauses, "umm" sounds, repeated phrases
2. Frustration Level (0-100): Signs include sighs, rapid movements, tense facial expressions, raised voice, clicking sounds
3. Focus Level (0-100): Signs include steady gaze, minimal fidgeting, consistent speech patterns, engaged posture

Provide actionable, encouraging suggestions based on emotional state. Be supportive and empathetic.

IMPORTANT: Return your analysis as a function call using the analyze_emotions tool.`;

    if (uploadType === "webcam" || uploadType === "video") {
      // For video/webcam, analyze visual content
      userContent = [
        {
          type: "text",
          text: `Analyze this ${uploadType} capture from a learning session. Detect emotional states including confusion, frustration, and focus levels. Consider facial expressions, body language, and any visible signs of emotional state.`
        },
        {
          type: "image_url",
          image_url: {
            url: `data:image/jpeg;base64,${mediaBase64}`
          }
        }
      ];
    } else {
      // For audio, we'll analyze the transcription or audio patterns
      userContent = [
        {
          type: "text",
          text: `Analyze this audio transcription from a learning session. The user is speaking about their experience. Detect emotional states from speech patterns, word choice, and described feelings. Audio type: ${uploadType}. 
          
Note: Since this is audio-only, focus on vocal indicators like speech pace, word choice, and expressed frustrations. Provide your best estimate based on typical audio emotion patterns for a learning context.`
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
              description: "Return the emotion analysis results",
              parameters: {
                type: "object",
                properties: {
                  confusion: { 
                    type: "number", 
                    description: "Confusion level from 0-100" 
                  },
                  frustration: { 
                    type: "number", 
                    description: "Frustration level from 0-100" 
                  },
                  focus: { 
                    type: "number", 
                    description: "Focus level from 0-100" 
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
                        icon: { type: "string", enum: ["coffee", "lightbulb", "focus", "timer", "stretch", "music"] },
                        variant: { type: "string", enum: ["pink", "lavender", "mint", "sky", "yellow"] }
                      },
                      required: ["title", "description", "icon", "variant"]
                    },
                    description: "3-5 personalized suggestions based on detected emotions"
                  },
                  advice: {
                    type: "string",
                    description: "A warm, encouraging paragraph of overall advice for improving the learning experience"
                  }
                },
                required: ["confusion", "frustration", "focus", "accuracy", "suggestions", "advice"]
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
    
    // Extract the function call result
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
