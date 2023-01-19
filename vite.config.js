import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // remove console logs
  esbuild: {
    drop: ["debugger"],
    pure: [
      "console.log",
      "console.warn",
      "console.error",
      "console.debug",
      "console.trace",
    ],
  },
  build: {
    outDir: "backend/dist"
  }
});
