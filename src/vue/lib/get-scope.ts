import {Scope} from 'effector'
import {getCurrentInstance, inject} from 'vue-next'

export function getScope() {
  let scope: Scope | undefined
  let ctx = getCurrentInstance()
  let scopeName: string | undefined =
    ctx?.appContext.config.globalProperties.scopeName

  if (scopeName) {
    scope = inject(scopeName)
  }

  return {
    scopeName,
    scope,
  }
}
