import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'

import App from './App.vue'
import router from './router'
import './assets/main.css'

const pinia = createPinia()
const vuetify = createVuetify()

const app = createApp(App, {
  compilerOptions: {
    isCustomElement: tag => tag.startsWith('md-'),
  },
})

app.use(pinia)
app.use(router)
app.use(vuetify)
app.mount('#app')
