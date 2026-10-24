import {Scope} from 'effector'
import {InjectionKey} from 'vue-next'

/**
 * Injection keys are created with `Symbol.for`, so two copies of the package
 * in one application (a duplicated transitive dependency, a linked package)
 * still resolve the same scope.
 */
export const EffectorScopeKey = Symbol.for(
  'effector-vue:scope',
) as InjectionKey<Scope>

export type EffectorScopeConfig = {
  /** Turns the absence of a scope into an error for the whole application. */
  forceScope?: boolean
  /** Legacy string key the scope is provided under as well. */
  scopeName?: string
}

/** Internal: plugin options shared with the composables. */
export const EffectorScopeConfigKey = Symbol.for(
  'effector-vue:scope-config',
) as InjectionKey<EffectorScopeConfig>
