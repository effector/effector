/* eslint-disable no-unused-vars */
import {
  combine,
  createDomain,
  createEffect,
  createEvent,
  createStore,
  EventCallable,
  fork,
  Scope,
  Store,
} from 'effector'
import {
  computed,
  createApp,
  DeepReadonly,
  effectScope,
  InjectionKey,
  Ref,
  ref,
} from 'vue'
import {
  createGate,
  EffectorScopeKey,
  EffectorScopePlugin,
  Equal,
  UnitToValue,
  UseUnitResult,
  useGate,
  useProvidedScope,
  useStore,
  useStoreMap,
  useUnit,
  useVModel,
} from 'effector-vue/composition'

const typecheck = '{global}'

describe('useUnit', () => {
  test('store', () => {
    const $count = createStore(0)

    const setup = () => {
      const count = useUnit($count)
      const value: number = count.value
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('event', () => {
    const setName = createEvent<string>()
    const reset = createEvent()

    const setup = () => {
      const onName: (payload: string) => string = useUnit(setName)
      const onReset: () => void = useUnit(reset)
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('effect', () => {
    const fetchFx = createEffect<string, number>(() => 0)
    const initFx = createEffect(() => 'done')

    const setup = () => {
      const fetch: (params: string) => Promise<number> = useUnit(fetchFx)
      const init: () => Promise<string> = useUnit(initFx)
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('list', () => {
    const $count = createStore(0)
    const inc = createEvent()
    const fetchFx = createEffect<string, number>(() => 0)

    const setup = () => {
      const [count, onInc, fetch] = useUnit([$count, inc, fetchFx])
      const value: number = count.value
      const done: Promise<number> = fetch('a')
      onInc()
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('shape', () => {
    const $count = createStore(0)
    const inc = createEvent()

    const setup = () => {
      const {count, onInc} = useUnit({count: $count, onInc: inc})
      const value: number = count.value
      onInc()
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('@@unitShape', () => {
    const $count = createStore(0)
    const model = {
      '@@unitShape': () => ({count: $count}),
    }

    const setup = () => {
      const {count} = useUnit(model)
      const value: number = count.value
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('scope options', () => {
    const $count = createStore(0)
    const scope = fork()

    const setup = () => {
      useUnit($count, {forceScope: true})
      useUnit($count, {scope})
      useUnit([$count], {scope, forceScope: true})
      useUnit({count: $count}, {scope})
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('scope option rejects anything but a Scope', () => {
    const $count = createStore(0)

    const setup = () => {
      useUnit($count, {scope: effectScope()})
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Argument of type 'StoreWritable<number>' is not assignable to parameter of type 'Record<string, Store<any> | Effect<any, any, any> | EventCallable<any>> | { '@@unitShape': () => Record<string, Store<any> | Effect<any, any, any> | EventCallable<...>>; }'.
            Type 'StoreWritable<number>' is not assignable to type 'Record<string, Store<any> | Effect<any, any, any> | EventCallable<any>>'.
              Index signature for type 'string' is missing in type 'StoreWritable<number>'.
      "
    `)
  })
})

describe('readonly refs', () => {
  test('a store gives Readonly<Ref>, assignable to the former DeepReadonly', () => {
    const $count = createStore(0)
    const $user = createStore({name: 'alice'})

    const setup = () => {
      const count: Readonly<Ref<number>> = useUnit($count)
      const user: Readonly<Ref<{name: string}>> = useUnit($user)

      const legacyCount: DeepReadonly<Ref<number>> = useUnit($count)
      const legacyUser: DeepReadonly<Ref<{name: string}>> = useUnit($user)
      const legacyStore: DeepReadonly<Ref<{name: string}>> = useStore($user)

      const [inList] = useUnit([$user])
      const legacyList: DeepReadonly<Ref<{name: string}>> = inList

      const {inShape} = useUnit({inShape: $user})
      const legacyShape: DeepReadonly<Ref<{name: string}>> = inShape
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('a helper generic over the state needs the new annotation', () => {
    function legacy<T>($store: Store<T>): DeepReadonly<Ref<T>> {
      return useUnit($store)
    }
    function current<T>($store: Store<T>): Readonly<Ref<T>> {
      return useUnit($store)
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'Readonly<Ref<T, T>>' is not assignable to type 'Readonly<Ref<DeepReadonly<T>, DeepReadonly<T>>>'.
        Types of property 'value' are incompatible.
          Type 'T' is not assignable to type 'DeepReadonly<T>'.
      "
    `)
  })

  test('the ref itself is still protected from writes', () => {
    const $count = createStore(0)

    const setup = () => {
      const count = useUnit($count)
      count.value = 1
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Cannot assign to 'value' because it is a read-only property.
      "
    `)
  })

  test('nested fields are no longer frozen', () => {
    const $user = createStore({name: 'alice'})

    const setup = () => {
      const user = useUnit($user)
      const name: string = user.value.name
      user.value.name = 'bob'
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})

describe('exported types', () => {
  test('Equal', () => {
    const setup = () => {
      const same: Equal<string, string> = true
      const different: Equal<string, number> = false
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('UnitToValue and UseUnitResult describe what useUnit returns', () => {
    const $count = createStore(0)
    const inc = createEvent()
    const fetchFx = createEffect<string, number>(() => 0)

    const setup = () => {
      const count: UnitToValue<Store<number>> = useUnit($count)
      const onInc: UnitToValue<EventCallable<void>> = useUnit(inc)
      const fetch: UnitToValue<typeof fetchFx> = useUnit(fetchFx)

      const shape: UseUnitResult<{count: Store<number>; onInc: typeof inc}> =
        useUnit({count: $count, onInc: inc})
      const list: UseUnitResult<[Store<number>, typeof inc]> = useUnit([
        $count,
        inc,
      ])
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('a derived event is not a callable unit', () => {
    const $count = createStore(0)

    const setup = () => {
      const onUpdate = useUnit($count.updates)
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Argument of type 'Event<number>' is not assignable to parameter of type 'Record<string, Store<any> | Effect<any, any, any> | EventCallable<any>> | { '@@unitShape': () => Record<string, Store<any> | Effect<any, any, any> | EventCallable<...>>; }'.
            Type 'Event<number>' is not assignable to type 'Record<string, Store<any> | Effect<any, any, any> | EventCallable<any>>'.
              Index signature for type 'string' is missing in type 'Event<number>'.
      "
    `)
  })

  test('a derived event or a domain is rejected inside a shape or a list', () => {
    const $count = createStore(0)
    const domain = createDomain()

    const setup = () => {
      useUnit({onUpdate: $count.updates})
      useUnit([domain])
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'Store<any> | Effect<any, any, any> | EventCallable<any>'.
            Type 'Event<number>' is missing the following properties from type 'EventCallable<any>': prepend, targetable
      No overload matches this call.
        The last overload gave the following error.
          Type 'Domain' is not assignable to type 'Store<any> | Effect<any, any, any> | EventCallable<any>'.
            Type 'Domain' is missing the following properties from type 'EventCallable<any>': prepend, map, filter, filterMap, and 3 more.
      "
    `)
  })

  test('an effect with a custom fail type and unions of units', () => {
    const $count = createStore(0)
    const inc = createEvent()
    const failFx = createEffect<string, number, string>(() => 0)
    const units: Array<Store<number> | EventCallable<void>> = [$count, inc]
    const shape: Record<string, Store<number> | EventCallable<void>> = {
      count: $count,
      inc,
    }

    const setup = () => {
      const [fail] = useUnit([failFx])
      const run: (params: string) => Promise<number> = fail
      const fromList = useUnit(units)
      const exactList: Equal<
        typeof fromList,
        Array<Readonly<Ref<number>> | (() => void)>
      > = true
      const fromShape = useUnit(shape)
      const exactShape: Equal<
        typeof fromShape,
        {[key: string]: Readonly<Ref<number>> | (() => void)}
      > = true
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('the way @effector/router-vue uses them', () => {
    const $path = createStore('/')
    const $params = createStore<Record<string, string>>({})
    const navigate = createEvent<string>()
    const model = {'@@unitShape': () => ({path: $path, navigate})}

    const setup = () => {
      const route = useUnit(combine({path: $path, params: $params}))
      const path: string = route.value.path

      const {path: fromShape, navigate: go} = useUnit(model)
      const castAway: DeepReadonly<Ref<string>> = fromShape
      go('/next')

      const isVoid: Equal<void, void> = true
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})

describe('scope', () => {
  test('EffectorScopePlugin', () => {
    const scope = fork()

    const start = () => {
      const app = createApp({})

      app.use(EffectorScopePlugin({scope}))
      app.use(
        EffectorScopePlugin({
          scope,
          scopeName: 'app',
          forceScope: true,
          ssr: false,
        }),
      )
      app.use(EffectorScopePlugin, {scope})
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('EffectorScopeKey', () => {
    const setup = () => {
      const key: InjectionKey<Scope> = EffectorScopeKey
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('useProvidedScope', () => {
    const setup = () => {
      const maybeScope: Scope | null = useProvidedScope()
      const scope: Scope = useProvidedScope({forceScope: true})
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('useProvidedScope without forceScope may return null', () => {
    const setup = () => {
      const scope: Scope = useProvidedScope()
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'Scope | null' is not assignable to type 'Scope'.
        Type 'null' is not assignable to type 'Scope'.
      "
    `)
  })
})

describe('useStore', () => {
  test('store', () => {
    const $count = createStore(0)

    const setup = () => {
      const count = useStore($count)
      const value: number = count.value
      const scoped = useStore($count, {scope: fork(), forceScope: true})
      const scopedValue: number = scoped.value
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})

describe('useStoreMap', () => {
  test('config form', () => {
    const $user = createStore({name: 'alice', age: 30})

    const setup = () => {
      const name = useStoreMap({
        store: $user,
        keys: () => 'name' as const,
        fn: (user, key) => user[key],
        updateFilter: (update, current) => update !== current,
        defaultValue: 'anonymous',
      })
      const value: string = name.value
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('short form', () => {
    const $user = createStore({name: 'alice', age: 30})
    const scope = fork()

    const setup = () => {
      const name = useStoreMap($user, user => user.name)
      const value: string = name.value
      useStoreMap($user, user => user.name, {scope, forceScope: true})
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('keys as a ref, a getter and a plain value', () => {
    const $users = createStore<Record<string, string>>({alice: 'Alice'})

    const setup = () => {
      const key = ref('alice')
      useStoreMap({store: $users, keys: key, fn: (users, id) => users[id]})
      useStoreMap({
        store: $users,
        keys: () => key.value,
        fn: (users, id) => users[id],
      })
      useStoreMap({store: $users, keys: 'alice', fn: (users, id) => users[id]})
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('scope in the config and as a positional argument', () => {
    const $user = createStore({name: 'alice', age: 30})
    const scope = fork()

    const setup = () => {
      useStoreMap({
        store: $user,
        fn: user => user.name,
        scope,
        forceScope: true,
      })
      useStoreMap({store: $user, fn: user => user.name}, scope)
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})

describe('useVModel', () => {
  test('store', () => {
    const $form = createStore({name: 'alice'})

    const setup = () => {
      const form = useVModel($form)
      const name: string = form.value.name
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('shape', () => {
    const $name = createStore('alice')
    const $age = createStore(30)

    const setup = () => {
      const model = useVModel({name: $name, age: $age})
      const name: string = model.name
      const age: number = model.age
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('options', () => {
    const $form = createStore({name: 'alice'})
    const $age = createStore(30)

    const setup = () => {
      useVModel($form, {scope: fork(), forceScope: true, deep: false})
      useVModel({age: $age}, {deep: false})
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('vue effect scope as a second argument', () => {
    const $form = createStore({name: 'alice'})
    const $age = createStore(30)

    const setup = () => {
      useVModel($form, effectScope())
      useVModel({age: $age}, effectScope())
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('an unknown option is rejected', () => {
    const $form = createStore({name: 'alice'})

    const setup = () => {
      useVModel($form, {deeep: true})
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Argument of type 'StoreWritable<{ name: string; }>' is not assignable to parameter of type 'Record<string, Store<any>>'.
            Index signature for type 'string' is missing in type 'StoreWritable<{ name: string; }>'.
      "
    `)
  })
})

describe('gate', () => {
  test('createGate and useGate', () => {
    const Gate = createGate<{id: number}>({name: 'PageGate'})

    const setup = () => {
      const $status: Store<boolean> = Gate.status
      const $state: Store<{id: number}> = Gate.state

      useGate(Gate, () => ({id: 1}))
      useGate(Gate, () => ({id: 1}), {scope: fork(), forceScope: true})
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('props accept a value, a ref and a getter', () => {
    const Gate = createGate<{id: number}>()

    const setup = () => {
      useGate(Gate, {id: 1})
      useGate(Gate, ref({id: 1}))
      useGate(Gate, computed(() => ({id: 1})))
      useGate(Gate, () => ({id: 1}))
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('gate events go into useUnit', () => {
    const Gate = createGate<{id: number}>()

    const setup = () => {
      const open: (payload: {id: number}) => {id: number} = useUnit(Gate.open)
      const {set} = useUnit({set: Gate.set, close: Gate.close})
      const [close] = useUnit([Gate.close])
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('props of another shape are rejected', () => {
    const Gate = createGate<{id: number}>()

    const setup = () => {
      useGate(Gate, {id: 'one'})
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'string' is not assignable to type 'number'.
      "
    `)
  })
})
