import vueJsx from "@vitejs/plugin-vue-jsx";
import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
function pathResolve(dir) {
  return resolve(__dirname, ".", dir);
}
export default defineConfig({
  root: pathResolve("src/index.ts"),
  plugins: [
    vue(),
    // 添加JSX插件
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    }),
  ],
  resolve: {
    alias: {
      "@": pathResolve("src"),
    },
  },
  build: {
    target: "modules",
    minify: true,
    cssCodeSplit: true,
    sourcemap: false,
    outDir: pathResolve("dist"),
    lib: {
      entry: pathResolve("src/index.ts"),
      name: "Vue3-Drag-Select",
      fileName: (format) => `index.${format}.js`,
      formats: ["es", "cjs"],
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
});
