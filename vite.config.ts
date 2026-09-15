import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import netlify from "@netlify/vite-plugin-tanstack-start";
import tailwindcss from "@tailwindcss/vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [
    nodePolyfills({
      include: ["buffer", "crypto", "stream", "util", "events", "string_decoder"],
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
    }),
    tailwindcss(),
    tanstackStart(),
    netlify(),
    react(),
    tsconfigPaths()
  ],
  build: {
    target: "esnext", // Required for top-level await in Compact generated code
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "esnext",
    },
  },
});
