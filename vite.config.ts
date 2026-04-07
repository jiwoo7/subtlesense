import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  // Hardcode Supabase env vars so client.ts never receives undefined,
  // even if the .env file is written after the dev-server starts.
  const supabaseUrl = env.VITE_SUPABASE_URL || "https://uclvhoubbimigdsqcvao.supabase.co";
  const supabaseKey = env.VITE_SUPABASE_PUBLISHABLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjbHZob3ViYmltaWdkc3FjdmFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0NDY0MzYsImV4cCI6MjA4NDAyMjQzNn0.tJpFXAIEU4SgYcdKUFUYnZKARL2vCs3tlozD-EifrSo";

  return {
    define: {
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(supabaseUrl),
      'import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY': JSON.stringify(supabaseKey),
    },
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [
      react(),
      mode === "development" && componentTagger(),
      {
        name: 'html-transform',
        transformIndexHtml(html: string) {
          return html.replace(/%VITE_GA_MEASUREMENT_ID%/g, env.VITE_GA_MEASUREMENT_ID || '');
        },
      },
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
