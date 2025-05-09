import { cloudflare } from "@cloudflare/vite-plugin";
import build from "@hono/vite-build/cloudflare-workers";
import { defineConfig } from "vite";
import ssrHotReload from "vite-plugin-ssr-hot-reload";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ command, isSsrBuild }) => {
  if (command === "serve") {
    return { plugins: [tailwindcss(), ssrHotReload(), cloudflare()] };
  }
  if (!isSsrBuild) {
    return {
      plugins: [tailwindcss()],
      build: {
        rollupOptions: {
          input: ["./src/style.css"],
          output: {
            assetFileNames: "assets/[name].[ext]",
          },
        },
      },
    };
  }
  return {
    plugins: [
      tailwindcss(),
      build({
        outputDir: "dist-server",
        entryContentAfterHooks: [],
        entryContentDefaultExportHook: (content) => content,
      }),
    ],
  };
});
