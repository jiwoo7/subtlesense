*** Begin Patch
*** Update File: supabase/functions/analyze-emotion/index.ts
@@
-import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
+import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
+import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
@@
-const ALLOWED_ORIGIN = Deno.env.get("ALLOWED_ORIGIN") || "https://subtlesense.lovable.app";
-
-const corsHeaders = {
-  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
-  "Access-Control-Allow-Credentials": "true",
-  "Access-Control-Allow-Methods": "POST, OPTIONS",
-  "Access-Control-Allow-Headers": "Authorization, content-type",
-  // Anti-clickjacking headers
-  "X-Frame-Options": "DENY",
-  "Content-Security-Policy": "frame-ancestors 'self'",
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