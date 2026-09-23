import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Valuation engine + report model, shared verbatim with the edge functions.
      // See supabase/functions/_shared/valuation/README.md
      "@core": path.resolve(__dirname, "./supabase/functions/_shared/valuation"),
    },
  },
}));
