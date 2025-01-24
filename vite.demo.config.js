import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  root: "examples/demo",
  build: {
    outDir: "../../dist/demo",
    emptyOutDir: true,
  },
  plugins: [vue()],
});
