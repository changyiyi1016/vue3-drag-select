import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from "vite";
export default defineConfig({

    plugins: [
        // 添加JSX插件
        vueJsx({
            // options are passed on to @vue/babel-plugin-jsx
        })
    ],

})