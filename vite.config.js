import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), basicSsl()],
  server: {
    https: true
  },
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
});
