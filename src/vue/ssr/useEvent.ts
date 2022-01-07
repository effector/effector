import {Event, scopeBind} from "effector"

import {getScope} from "../lib/get-scope"

export function useEvent<T>(event: Event<T>) {
  let {scope} = getScope()

  if (scope) {
    return scopeBind(event, {
      scope
    })
  }

  return event
}
