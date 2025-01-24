import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/MidiMama.vue"),
      name: "MidiMama",
      fileName: (format) => `MidiMama.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  plugins: [vue()],
});
