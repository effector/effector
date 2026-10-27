import {Scope, Store, createWatch, is, launch} from 'effector'
import {
  type EffectScope,
  type Ref,
  Reactive,
  customRef,
  effectScope,
  onScopeDispose,
  reactive,
  ref,
  shallowRef,
  toRaw,
  watch,
} from 'vue-next'

import {clone} from './lib/clone'
import {isEqual} from './lib/isEqual'
import {resolveScope} from './lib/get-scope'
import {isServerRender} from './lib/ssr'
import {stateReader} from './lib/state-reader'
import {printError, throwError} from './lib/throw'
import {UseVModel, UseVModelOptions} from 'effector-vue/composition'

const SCOPE_AS_ARGUMENT =
  'expects the scope of effector in the options, useVModel($store, {scope}), ' +
  'and not as the second argument itself'

const DERIVED_STORE =
  'called with a derived store: an edit lands in it and is overwritten on ' +
  'the next update of the store it is computed from. Bind the form to that ' +
  'store'

/**
 * Binds one store to one value a form can edit.
 *
 * The value is a deep copy, reactive down to the nested fields; `deep: false`
 * binds the state of the store as it is, so only assignments of the whole
 * value reach the store.
 *
 * The wave back into the store is created separately, after the caller has
 * filled the value: assigning it is a change of a reactive property, and a
 * watcher created earlier reads that change as user input.
 */
function bindStore<T>(
  store: Store<T>,
  scope: Scope | undefined,
  deep: boolean,
  live: boolean,
) {
  const source = stateReader(store, scope)

  if (!live) {
    /**
     * A server render has nothing to write back and no way to unsubscribe,
     * and the state keeps changing until the last `onServerPrefetch`
     * resolves: every read takes the state of the scope, copied once per
     * state.
     */
    let last = source
    let copy = deep ? clone(source) : source
    const local: Ref<any> = customRef(() => ({
      get() {
        const state = stateReader(store, scope)
        if (state !== last) {
          last = state
          copy = deep ? clone(state) : state
        }
        return copy
      },
      set() {},
    }))

    return {local, watchForm(_read: () => unknown) {}}
  }

  const local: Ref<any> = deep ? ref(clone(source)) : shallowRef(source)
  /**
   * The writes of this call still on their way into the store. Inside a
   * computation of effector `defer` queues them, so a form edited twice in
   * one pass has two of them pending.
   */
  const pending: unknown[] = []
  /** True while the state of the store is being copied into the form. */
  let applying = false

  const stop = createWatch({
    unit: store,
    fn: state => {
      /**
       * An update this call has made itself: the form already has it, and a
       * later write of the call may be pending. Earlier entries are dropped
       * with it, so a write that never lands does not stay in the queue.
       */
      const index = pending.indexOf(state)
      if (index !== -1) {
        pending.splice(0, index + 1)
        return
      }

      /**
       * The watcher of the form is synchronous, so it runs inside this
       * assignment and has to tell the state of the store from an edit.
       * The flag covers exactly that assignment, unlike the pair of flags
       * of the previous implementation, which were reset a tick later.
       */
      applying = true
      try {
        local.value = deep ? clone(state) : state
      } finally {
        applying = false
      }
    },
    scope,
  })

  /** The call always runs inside an effect scope, see `useVModel` below. */
  onScopeDispose(stop)

  /**
   * Form to store. The copy is compared with the state of the store instead
   * of the pair of flags the previous implementation used: the flags were
   * reset in an asynchronous callback, so an update of the store and an edit
   * of the form in the same tick dropped the edit.
   *
   * `launch` is the public form of the private `store.setState`, which writes
   * into the ambient scope of the kernel and never into the scope of the
   * component. `defer` matters because a synchronous watcher can fire in the
   * middle of a computation of effector, when the back wave writes into the
   * local value.
   */
  function watchForm(read: () => unknown) {
    watch(
      read,
      value => {
        /** The state of the store on its way into the form, not an edit. */
        if (applying) return

        const raw = toRaw(value)
        /**
         * `deep: false` hands out the state of the store itself, so the write
         * hands it back as it is. Copying it there would break the promise of
         * the mode: the form and the store hold one object.
         */
        const params = deep ? clone(raw) : raw
        /** The state the store will hold once the pending writes land. */
        const current = pending.length
          ? pending[pending.length - 1]
          : stateReader(store, scope)
        if (isEqual(params, current)) return

        pending.push(params)
        launch({target: store, params, scope, defer: true})
      },
      /**
       * `Boolean()` survives the build. A bare `true` ships as `1`, and Vue
       * 3.5 reads a numeric `deep` as the depth to traverse.
       */
      {deep: Boolean(deep), flush: 'sync'},
    )
  }

  return {local, watchForm}
}

function isEffectScope(value: unknown): value is EffectScope {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as EffectScope).run === 'function' &&
    typeof (value as EffectScope).stop === 'function'
  )
}

function checkStore(store: Store<any>) {
  if (!is.store(store)) throwError('expect useVModel argument to be a store')
  if (!is.targetable(store)) printError(`useVModel: ${DERIVED_STORE}`)
}

// @ts-expect-error
export const useVModel: UseVModel = <
  T,
  K extends string = keyof Store<unknown>,
>(
  vm: Store<T> | Record<K, Store<T>>,
  optsOrScope?: UseVModelOptions | EffectScope,
) => {
  /**
   * A scope of effector has no `run` and no `stop`, so it would pass for an
   * options object and be dropped without a word.
   */
  if (is.scope(optsOrScope)) throwError(`useVModel: ${SCOPE_AS_ARGUMENT}`)

  const legacyScope = isEffectScope(optsOrScope) ? optsOrScope : null

  const opts = (legacyScope ? undefined : optsOrScope) as
    | UseVModelOptions
    | undefined

  /**
   * The call runs inside an effect scope, so `onScopeDispose` always has one
   * to register on. In a component that scope is the one of the component,
   * and the binding stops with it.
   */
  const vueScope = legacyScope || effectScope()

  return vueScope.run(() => {
    const scope = resolveScope('useVModel', opts)
    const deep = Boolean(opts?.deep ?? true)
    /** A server render has no input to write back and no way to unsubscribe. */
    const live = !isServerRender()

    if (is.store(vm)) {
      checkStore(vm)

      const {local, watchForm} = bindStore(vm, scope, deep, live)
      if (live) watchForm(() => local.value)

      return local
    }

    const shape = reactive({}) as Reactive<Record<string, unknown>>
    const entries = Object.entries<Store<T>>(vm)
    const bindings = entries.map(([, store]) => {
      checkStore(store)
      return bindStore(store, scope, deep, live)
    })

    /**
     * The shape is filled before the watchers of the form exist: filling it is
     * a change of a reactive property, and a watcher created earlier reads
     * that change as user input and writes it back to the store on mount.
     */
    entries.forEach(([key], index) => {
      shape[key] = bindings[index].local
    })

    if (live) {
      entries.forEach(([key], index) => {
        bindings[index].watchForm(() => shape[key])
      })
    }

    return shape
  })
}
