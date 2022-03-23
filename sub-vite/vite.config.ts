import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from 'path'
import qiankun from 'vite-plugin-qiankun';
const { name } = require("./package.json");

// useDevMode 开启时与热更新插件冲突
const useDevMode = true

// https://vitejs.dev/config/
export default defineConfig({
  base: "/subapp/sub-vite/",
  plugins: [
    vue(),
    ...(
      useDevMode ? [] : [
        // reactRefresh()
      ]
    ),
    qiankun('sub-vite', {
      useDevMode
    })
  ],
  build: {
    target: "esnext",
    lib: {
      name: `${name}-[name]`,
      entry: path.resolve(__dirname, "src/main.ts"),
      formats: ["umd"],
    },
  },
  server: {
    port: 9181,
    cors: true, // 允许跨域
  }
});
