import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import '@material/web/all.js'

// Vuetify - 使用 vite-plugin-vuetify 自動 tree-shaking
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify()

const app = createApp(App, {
  compilerOptions: {
    isCustomElement: (tag) => tag.startsWith('md-')
  }
})
app.use(router)
app.use(vuetify)
app.mount('#app') 