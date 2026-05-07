import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const NOTIFY_TO = "naiyyathapa@gmail.com";
const FROM_EMAIL = "noreply@subtlesense.app"; // Brevo will use sender; can be unverified for low-volume but recommend verifying
const FROM_NAME = "Subtle Sense";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/brevo";

async function sendEmail(opts: {
  to: { email: string; name?: string }[];
  subject: string;
  htmlContent: string;
  replyTo?: { email: string; name?: string };
}) {
  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY");
  if (!LOVABLE_API_KEY || !BREVO_API_KEY) {
    console.error("Missing email keys");
    return { ok: false, error: "missing_keys" };
  }
  const res = await fetch(`${GATEWAY_URL}/smtp/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: { name: FROM_NAME, email: FROM_EMAIL },
      to: opts.to,
      subject: opts.subject,
      htmlContent: opts.htmlContent,
      replyTo: opts.replyTo,
    }),
  });
  const text = await res.text();
  if (!res.ok) {
    console.error("Brevo error", res.status, text);
    return { ok: false, error: text };
  }
  return { ok: true };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { email, name, referredByCode } = await req.json();

    // Validate
    const cleanEmail = String(email || "").trim().toLowerCase();
    const cleanName = String(name || "").trim().slice(0, 80);
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(cleanEmail)) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Insert (unique on email)
    const { data: row, error } = await supabase
      .from("waitlist_signups")
      .insert({
        email: cleanEmail,
        name: cleanName || null,
        referred_by_code: referredByCode || null,
      })
      .select("id, email, name, position, referral_code")
      .single();

    let signup = row;
    if (error) {
      // Already on waitlist? Return existing
      if (error.code === "23505") {
        const { data: existing } = await supabase
          .from("waitlist_signups")
          .select("id, email, name, position, referral_code")
          .eq("email", cleanEmail)
          .maybeSingle();
        if (existing) {
          return new Response(
            JSON.stringify({ ok: true, alreadyJoined: true, ...existing }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } },
          );
        }
      }
      console.error("Insert error", error);
      return new Response(JSON.stringify({ error: "Could not save" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Notify Naiyya (admin)
    const adminHtml = `
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;padding:20px;background:#0a0a0a;color:#fff;border-radius:12px">
        <h2 style="background:linear-gradient(90deg,#a855f7,#ec4899);-webkit-background-clip:text;color:transparent;margin:0 0 12px">✨ New Premium waitlist signup</h2>
        <p style="color:#bbb;margin:0 0 16px">Someone just joined the Subtle Sense Premium waitlist.</p>
        <table style="width:100%;background:#161616;border-radius:8px;padding:12px;color:#eee;border-collapse:separate;border-spacing:0 8px">
          <tr><td style="color:#888;width:90px">Email</td><td><strong>${cleanEmail}</strong></td></tr>
          <tr><td style="color:#888">Name</td><td>${cleanName || "<em style='color:#666'>(not provided)</em>"}</td></tr>
          <tr><td style="color:#888">Position</td><td>#${signup!.position}</td></tr>
          <tr><td style="color:#888">Referred by</td><td>${referredByCode || "<em style='color:#666'>direct</em>"}</td></tr>
        </table>
        <p style="color:#666;font-size:12px;margin-top:20px">— sent automatically by Subtle Sense</p>
      </div>`;

    await sendEmail({
      to: [{ email: NOTIFY_TO, name: "Naiyya" }],
      subject: `🎉 ${cleanName || cleanEmail} joined the Subtle Sense waitlist (#${signup!.position})`,
      htmlContent: adminHtml,
      replyTo: { email: cleanEmail, name: cleanName || cleanEmail },
    });

    // Confirmation to user
    const userHtml = `
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;padding:24px;background:#0a0a0a;color:#fff;border-radius:12px">
        <h1 style="background:linear-gradient(90deg,#a855f7,#ec4899,#ef4444);-webkit-background-clip:text;color:transparent;margin:0 0 8px;font-size:26px">You're in 💌</h1>
        <p style="color:#ddd">Hi ${cleanName || "friend"},</p>
        <p style="color:#bbb;line-height:1.6">Thanks for joining the <strong>Subtle Sense Premium</strong> waitlist. You're <strong>#${signup!.position}</strong> in line — we'll email you the moment Premium opens.</p>
        <p style="color:#bbb;line-height:1.6">In the meantime, you can keep exploring the free experience and journaling your emotions.</p>
        <p style="color:#888;font-size:13px;margin-top:24px">— with care, Naiyya & the Subtle Sense team</p>
      </div>`;

    await sendEmail({
      to: [{ email: cleanEmail, name: cleanName || undefined }],
      subject: "You're on the Subtle Sense Premium waitlist ✨",
      htmlContent: userHtml,
    });

    return new Response(
      JSON.stringify({ ok: true, ...signup }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("Unhandled", e);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
