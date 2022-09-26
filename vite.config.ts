import vueJsx from "@vitejs/plugin-vue-jsx";
import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

function pathResolve(dir) {
  return resolve(__dirname, ".", dir);
}
export default defineConfig({
  root: pathResolve("src/index.ts"),
  plugins: [
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
    lib: {
      entry: pathResolve("src/index.ts"),
      name: "VueDragSelect",
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
