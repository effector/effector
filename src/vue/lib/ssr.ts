import {hasInjectionContext, inject, ssrContextKey} from 'vue-next'

/**
 * `renderToString` provides its context to the whole application it renders,
 * so a composable tells a server render from a client one by injection, with
 * no global flag and no bundler condition.
 */
export function isServerRender(): boolean {
  if (!hasInjectionContext()) return false

  return inject(ssrContextKey, null) !== null
}
