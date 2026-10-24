import {hasInjectionContext, inject, ssrContextKey} from 'vue-next'

import {EffectorScopeConfigKey} from './scope-key'

/**
 * `renderToString` provides its context to the whole application it renders,
 * so a composable tells a server render from a client one by injection, with
 * no global flag and no bundler condition. Renderers that provide no context,
 * and jsdom tests of the server branch, set the `ssr` option of the plugin.
 */
export function isServerRender(): boolean {
  if (!hasInjectionContext()) return false

  const config = inject(EffectorScopeConfigKey, null)
  if (config && typeof config.ssr === 'boolean') return config.ssr

  return inject(ssrContextKey, null) !== null
}
