import {Event, scopeBind} from 'effector'

import {getScope} from '../lib/get-scope'

/** @deprecated since v23.0.0 */
export function useEvent<T>(event: Event<T>) {
  console.error(
    'useEvent from effector-vue/ssr is deprecated, use useUnit from effector-vue/composition instead',
  )

  let {scope} = getScope()

  if (scope) {
    return scopeBind(event, {
      scope,
    })
  }

  return event
}
