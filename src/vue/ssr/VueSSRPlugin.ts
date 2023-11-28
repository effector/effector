import {Scope} from 'effector'
import {Plugin} from 'vue-next'

/** @deprecated since v23.0.0 */
export function VueSSRPlugin(options: {
  scope: Scope
  scopeName?: string
}): Plugin {
  console.error(
    'VueSSRPlugin from effector-vue/ssr is deprecated, use EffectorScopePlugin from effector-vue instead',
  )

  return {
    install(app) {
      let scopeName = options.scopeName ?? 'root'

      app.config.globalProperties.scopeName = scopeName
      app.provide(app.config.globalProperties.scopeName, options.scope)
    },
  }
}
