import {
  fork,
  type Scope,
  type createStore,
  type Json,
  Node,
  launch,
  StateRef,
} from 'effector'
import { assert } from '../throw'
import { isObject } from '../is'

type Values = Record<string, unknown>

export function hydrateScope(config: {
  scope: Scope
  values: Values
  scheduleWatchers?: (cb: () => void) => void
}) {
  assert(config.scope && config.scope?.kind, 'valid scope is required')
  assert(isObject(config.values), 'values property should be an object')
  const {scope, values, scheduleWatchers} = config
  injectValues(scope, values)
  updateScopeRefs(scope, values)

  /**
   * Watchers run should be schedulable, as some envs (e.g. React)
   * will agro on us for updating state during render
   */
  if (scheduleWatchers) {
    scheduleWatchers(() => {
      runScopeWatchers(scope as ScopeInternal)
    })
  } else {
    runScopeWatchers(scope as ScopeInternal)
  }
}

function injectValues(scope: Scope, values: Values) {
  // @ts-expect-error this is a really hacky way to "hydrate" scope
  Object.assign(scope.values.sidMap, values)
  /**
   * We should explicitly set this flag to true, because otherwise the scope will be treated as it was not created from serialized values
   * => effector will not apply custom serializers to the scope
   */
  ;(scope as any).fromSerialize = true
}

function updateScopeRefs(tscope: Scope, values: Values) {
  const scope = tscope as ScopeInternal

  for (const id in scope.reg) {
    if (Object.hasOwnProperty.call(scope.reg, id)) {
      const ref = scope.reg[id]

      if (!ref.meta || (!ref.meta?.named && ref.meta?.derived)) {
        /**
         * Force recalculation of derived values
         */
        delete scope.reg[id]
      } else {
        /**
         * Update non-derived values
         */
        const sid = ref?.meta?.sid
        if (sid && sid in values) {
          const serialize = ref?.meta?.serialize as StoreSerializationConfig
          const read =
            serialize && serialize !== 'ignore' ? serialize?.read : null
          ref.current = read ? read(values[sid] as Json) : values[sid]
        }
      }
    }
  }
}

function runScopeWatchers(scope: ScopeInternal) {
  /**
   * Run scope watchers (`useUnit`, etc) to push new values to them
   */
  for (const id in scope.additionalLinks) {
    const links = scope.additionalLinks[id]
    links.forEach(link => {
      /**
       * Scope watchers should be run only for store nodes, as it is store values that are updated
       *
       * At this point we have no way to differentiate, if store value is affected by hydration or not
       * - e.g. if store is derived
       *
       * So we run all of the store node watchers
       */
      if (link.meta.watchOp === 'store') {
        launch({
          target: link,
          /**
           * `createWatch` pulls store values directly off the store node,
           * so there is no need to pass any params
           */
          params: null,
          scope,
        })
      }
    })
  }
}

// types for convenience
type StoreSerializationConfig = Exclude<
  Parameters<typeof createStore>[1],
  undefined
>['serialize']

type ScopeInternal = Scope & {
  reg: Record<string, StateRef & {meta?: Record<string, string>}>
  additionalLinks: Record<string, Node[]>
}
