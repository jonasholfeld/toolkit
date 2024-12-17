import { resolve } from "path";
import { defineConfig, loadEnv } from "vite";
import Vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";

const root = "src";
const envPrefix = ["VITE_", "KIRBY_"];

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), envPrefix));

  return defineConfig({
    root,
    base: mode === "development" ? "/" : "/dist/",
    envPrefix,
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            `@import "` +
            resolve(__dirname, "public/assets") +
            `/scss/_variables.scss";`,
        },
      },
    },
    resolve: {
      alias: {
        "~/": `${resolve(__dirname, root)}/`,
      },
    },

    build: {
      outDir: resolve(__dirname, "public/dist"),
      emptyOutDir: true,
      manifest: true,
      rollupOptions: {
        input: resolve(root, "main.js"),
      },
    },

    plugins: [
      Vue(),

      Components({
        dirs: ["components"],
      }),
    ],

    server: {
      cors: true,
      host: "0.0.0.0",
      port: process.env.VITE_DEV_PORT,
      strictPort: true,
    },
  });
});
