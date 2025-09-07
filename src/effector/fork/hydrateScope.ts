import {
  fork,
  type Scope,
  type createStore,
  type Json,
  Node,
  launch,
  StateRef,
} from 'effector'

type Values = Record<string, unknown>

export function hydrateScope(config: {
  scope: Scope
  values: Values
  planWatchersRun?: (cb: () => void) => void
}) {
  const {scope, values, planWatchersRun = cb => cb()} = config
  injectValues(scope, values)
  const affectedWatcherLinks = updateScopeRefs(scope, values)

  /**
   * Watchers run should be schedulable, as some envs (e.g. React)
   * will agro on us for updating state during render
   */
  planWatchersRun(() => {
    runScopeWatchers(scope as ScopeInternal, affectedWatcherLinks)
  })
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

function updateScopeRefs(tscope: Scope, values: Values): string[] {
  const scope = tscope as ScopeInternal

  const linksToRun: string[] = []

  for (const id in scope.reg) {
    if (Object.hasOwnProperty.call(scope.reg, id)) {
      const ref = scope.reg[id]

      /**
       * Schedule external watchers (useUnit, etc) re-run
       */
      const nodeId = ref?.meta?.id

      if (nodeId && scope.additionalLinks[nodeId]) {
        linksToRun.push(nodeId)
      }

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

  return linksToRun
}

function runScopeWatchers(scope: ScopeInternal, linksToRun: string[]) {
  /**
   * Run watchers (`useUnit`, etc) to push new values to them
   *
   * Manual lauch is required because top-down re-render stops at `memo`-ed components
   */
  if (linksToRun.length) {
    linksToRun.forEach(nodeId => {
      const links = scope.additionalLinks[nodeId]

      if (links) {
        links.forEach(link => {
          if (link.meta.watchOp === 'store') {
            launch({
              target: link,
              /**
               * `effector-react` internals will get current value internally
               */
              params: null,
              scope,
            })
          }
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
