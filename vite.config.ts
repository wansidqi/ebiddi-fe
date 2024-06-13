import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import pluginRewriteAll from "vite-plugin-rewrite-all";
import path from "path"; // Import path module

// https://vitejs.dev/config/
const aliases = ["components", "utils", "hooks", "configs"];

export default defineConfig({
  plugins: [react(), pluginRewriteAll()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@sections": path.resolve(__dirname, "./src/sections"),
    },
  },
});
