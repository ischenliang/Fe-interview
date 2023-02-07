import { SearchPlugin } from "vitepress-plugin-search";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    // @ts-ignore
    SearchPlugin({
      placeholder: "Search docs",
      buttonLabel: "搜索",
      previewLength: 10,
    }),
  ],
  server: {
    port: 5175,
    fs: {
      // Allow serving files from one level up to the project root
      allow: ["../.."],
    },
  },
});