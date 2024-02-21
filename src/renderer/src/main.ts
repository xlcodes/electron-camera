import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import './assets/tailwind.scss'
import './assets/global.scss'

const setupAll = () => {
  const store = createPinia()
  store.use(piniaPluginPersistedstate)

  const app = createApp(App)

  app.use(store)
  app.use(ElementPlus)

  app.mount('#app')
}

setupAll()
