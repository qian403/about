import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const sassOptions = {
  api: 'modern-compiler',
  quietDeps: true,
  silenceDeprecations: ['if-function'],
}

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith('md-'),
        },
      },
    }),
    vuetify({
      autoImport: true,
      styles: { configFile: 'src/assets/vuetify-settings.scss' },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      sass: sassOptions,
      scss: sassOptions,
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vuetify: ['vuetify'],
          'vue-vendor': ['vue', 'vue-router'],
        },
      },
    },
    cssCodeSplit: true,
  },
  server: {
    host: true,
    port: 3000,
    open: true,
  },
})
