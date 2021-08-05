import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      manifest: {
        name: "AOGCommunity.org",
        short_name: "AOGCommunity",
        start_url: "https://aogcommunity.org",
        display: "standalone",
        description:
          "A community of general aviation pilots willing to help their fellow aviators in times of need.",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "/src"),
    },
  },
  server: {
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:8888/.netlify/functions",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
