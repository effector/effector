import {getCurrentScope, onScopeDispose} from 'vue-next'

import {printError} from './throw'

const NO_EFFECT_SCOPE =
  'called with no active effect scope, so its subscription is never ' +
  'disposed. Call it in setup() before the first await, or run it inside ' +
  'effectScope(true) and stop() that scope when it is no longer needed'

/**
 * Cleanup is tied to the effect scope instead of the component: the same
 * composable then works in a detached `effectScope`, in a shared composable
 * and after the setup of a component has finished.
 *
 * `onScopeDispose` warns on its own when there is no scope to dispose in, and
 * the argument that silences it is Vue 3.5+, while the peer range starts at
 * 3.3. The guard replaces that warning with one that names the composable.
 */
export function tryOnScopeDispose(name: string, fn: () => void): boolean {
  if (!getCurrentScope()) {
    printError(`${name}: ${NO_EFFECT_SCOPE}`)
    return false
  }

  onScopeDispose(fn)

  return true
}
