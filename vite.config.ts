import { resolve } from "path";
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import manifestNamePlugin from "./scripts/manifestNamePlugin";

export default defineConfig({
  plugins: [react(), manifestNamePlugin()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        background: resolve(__dirname, "src/background/background.html"),
        action: resolve(__dirname, "src/action/action.html"),
        settings: resolve(__dirname, "src/settings/settings.html"),
        contextMenu: resolve(__dirname, "src/contextMenu/contextMenu.html"),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
