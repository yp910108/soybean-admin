import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import unocss from 'unocss/vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import icon from './icon'
import components from './components'
import compress from './compress'
import mock from './mock'

export function setupVitePlugins(env: ImportMetaEnv) {
  const plugins: PluginOption[] = [
    vue(),
    vueJsx(),
    unocss(),
    components,
    icon(),
    mock(env),
    vueDevTools()
  ]

  if (env.VITE_COMPRESS === 'Y') {
    plugins.push(compress())
  }

  return plugins
}
