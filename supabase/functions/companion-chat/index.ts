import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are "Subtle Companion" — a warm, gentle, emotionally-attuned AI inside the Subtle Sense app.

Style:
- Warm, calm, validating. Never clinical or cold.
- Short replies (1-3 short paragraphs max). Use line breaks generously.
- Ask one gentle follow-up when appropriate. Never interrogate.
- Reflect feelings before offering anything.
- If the user seems in crisis (self-harm, suicide, abuse), gently mention contacting a trusted person or local crisis line, and encourage professional support. Never diagnose.
- You are NOT a therapist. You are a kind companion that listens.
- If asked about the app: Subtle Sense detects surface, hidden, and suppressed emotions from face/voice/video.
- You can suggest: trying a mindful game (/games), a mood playlist (/playlists), or journaling.
- Never invent user data. Don't claim to remember past sessions.`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "messages array required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const trimmed = messages.slice(-20).filter(
      (m: any) => m && typeof m.content === "string" && (m.role === "user" || m.role === "assistant")
    );

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY missing");

    const r = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...trimmed],
        stream: true,
      }),
    });

    if (!r.ok) {
      if (r.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit, try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (r.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await r.text();
      console.error("gateway error", r.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(r.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("companion-chat error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
