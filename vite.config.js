import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
// https://vitejs.dev/config/
import path from "path"


export default defineConfig({
  resolve:{
    alias:{
      "~":path.resolve(__dirname,"src")
    }
  },
  plugins: [vue(),WindiCSS()],
  server:{
    proxy:{
      "/api":{
        target: "http://172.17.0.2:5000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/,""),
      }
    }
  }
})