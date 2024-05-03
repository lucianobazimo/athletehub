import { fileURLToPath, URL } from 'node:url'
import path from "path";


import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'

import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";

import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()]
    }
  },
  plugins: [
    vue(),
    VueDevTools(),
    VueI18nPlugin({
      include: path.resolve(__dirname, "./src/locales/**"),
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
