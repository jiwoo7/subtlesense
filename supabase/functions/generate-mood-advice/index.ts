import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { confusion, frustration, focus } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are a supportive learning coach AI. Based on the user's emotional metrics from their learning sessions, provide personalized advice.

Return your advice using the generate_advice function with:
- A brief, encouraging summary (2-3 sentences)
- 4-5 actionable "do" recommendations
- 4-5 things to avoid ("don't" recommendations)
- Overall mood assessment (positive, neutral, or needs-attention)

Be warm, supportive, and specific. Focus on practical tips for improving the learning experience.`;

    const userPrompt = `Based on the user's average emotional metrics across their learning sessions:
- Average Confusion: ${confusion}%
- Average Frustration: ${frustration}%
- Average Focus: ${focus}%

Provide personalized advice to help them improve their learning experience.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "generate_advice",
              description: "Generate personalized learning advice",
              parameters: {
                type: "object",
                properties: {
                  summary: {
                    type: "string",
                    description: "A brief, encouraging 2-3 sentence summary of their emotional state and overall recommendation"
                  },
                  overallMood: {
                    type: "string",
                    enum: ["positive", "neutral", "needs-attention"],
                    description: "Overall mood assessment based on metrics"
                  },
                  doList: {
                    type: "array",
                    items: { type: "string" },
                    description: "4-5 actionable recommendations of what to do"
                  },
                  dontList: {
                    type: "array",
                    items: { type: "string" },
                    description: "4-5 things to avoid doing"
                  }
                },
                required: ["summary", "overallMood", "doList", "dontList"]
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "generate_advice" } }
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    
    if (!toolCall || toolCall.function.name !== "generate_advice") {
      throw new Error("Invalid AI response format");
    }

    const advice = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(advice), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("generate-mood-advice error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
