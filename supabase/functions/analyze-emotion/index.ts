*** Begin Patch
*** Update File: supabase/functions/analyze-emotion/index.ts
@@
-const corsHeaders = {
-  "Access-Control-Allow-Origin": "*",
-  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
-};
+const ALLOWED_ORIGIN = Deno.env.get("ALLOWED_ORIGIN") || "https://subtlesense.lovable.app";
+
+const corsHeaders = {
+  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
+  "Access-Control-Allow-Credentials": "true",
+  "Access-Control-Allow-Methods": "POST, OPTIONS",
+  "Access-Control-Allow-Headers": "Authorization, content-type",
+  // Anti-clickjacking headers
+  "X-Frame-Options": "DENY",
+  "Content-Security-Policy": "frame-ancestors 'self'",
+};
*** End Patch