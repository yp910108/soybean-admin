import { createApp } from 'vue'
import { setupAssets } from './plugins'
import { setupStore } from './store'
import { setupI18n } from './locales'
import { setupRouter } from './router'
import AppLoading from './components/common/app-loading.vue'
import App from './App.vue'

async function setupApp() {
  setupAssets()

  const appLoading = createApp(AppLoading)
  appLoading.mount('#app')

  const app = createApp(App)

  setupStore(app)

  setupI18n(app)

  await setupRouter(app)

  appLoading.unmount()
  app.mount('#app')
}

setupApp()
