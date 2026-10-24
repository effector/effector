import {useStoreMap, useStore} from 'effector-vue/composition'
import {createEvent, createStore, fork} from 'effector'
import {mount, shallowMount} from 'vue-test-utils-next'
import {defineComponent, isReactive, nextTick, reactive, ref} from 'vue-next'

jest.mock('vue', () => require('vue-next'))

/**
 * Runs a composable in the setup of a mounted component. The rest of the file
 * mounts through `vue-test-utils`, which patches `createVNode` globally, so
 * this one mounts the same way instead of using the shared helper.
 */
function withSetup<T>(composable: () => T): T {
  let result: T

  mount({
    setup() {
      result = composable()
      return () => null
    },
  })

  return result!
}

it('should render correct', async () => {
  const userRemove = createEvent<string>()
  const userAgeChange = createEvent<{nickname: string; age: number}>()
  const $users = createStore<Record<string, {age: number; name: string}>>({
    alex: {age: 20, name: 'Alex'},
    john: {age: 30, name: 'John'},
  })
  const $userNames = createStore(['alex', 'john'])

  $userNames.on(userRemove, (list, username) =>
    list.filter(item => item !== username),
  )
  $users
    .on(userRemove, (users, nickname) => {
      const upd = {...users}
      delete upd[nickname]
      return upd
    })
    .on(userAgeChange, (users, {nickname, age}) => ({
      ...users,
      [nickname]: {...users[nickname], age},
    }))

  const Card = defineComponent({
    props: {
      nickname: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      const user = useStoreMap({
        store: $users,
        keys: () => props.nickname,
        fn: (users, nickname) => users[nickname],
      })
      return {user}
    },
    template: `
      <div>{{user.name}}:{{user.age}}</div>
    `,
  })

  const wrapper = mount({
    components: {
      Card,
    },
    setup() {
      const userNames = useStore($userNames)
      return {userNames}
    },
    template: `
      <div>
        <Card v-for="(name, key) in userNames" :key="key" :nickname="name" data-test="card" />
      </div>
    `,
  })

  expect(
    wrapper
      .findAllComponents('[data-test="card"]')
      .map(v => v.text())
      .join(''),
  ).toBe('Alex:20John:30')

  userAgeChange({nickname: 'john', age: 40})

  await nextTick()

  expect(
    wrapper
      .findAllComponents('[data-test="card"]')
      .map(v => v.text())
      .join(''),
  ).toBe('Alex:20John:40')

  userRemove('alex')

  await nextTick()
  expect(
    wrapper
      .findAllComponents('[data-test="card"]')
      .map(v => v.text())
      .join(''),
  ).toBe('John:40')
})

it('defaultValue support', async () => {
  const store = createStore(['Vue', 'React', 'Angular'])
  let target = ref('Vue')

  const wrapper = shallowMount({
    setup() {
      const framework = useStoreMap({
        store,
        keys: () => target.value,
        fn: (state, target) => state.find(t => t === target),
        defaultValue: 'Solid',
      })

      return {framework}
    },
    template: `
      <div>
        {{framework}}
      </div>
    `,
  })

  expect(wrapper.text()).toBe('Vue')

  target.value = 'Ember'

  await nextTick()

  expect(wrapper.text()).toBe('Solid')
})

test('updateFilter support', async () => {
  const update = createEvent<number>()
  const store = createStore(0).on(update, (_, x) => x)

  const wrapper = shallowMount({
    setup() {
      const n = useStoreMap({
        store,
        fn: state => state,
        updateFilter: x => x % 2 === 0,
      })

      return {n}
    },
    template: `
      <div>
        {{n}}
      </div>
    `,
  })

  expect(wrapper.text()).toBe('0')

  update(1)

  await nextTick()

  expect(wrapper.text()).toBe('0')

  update(2)

  await nextTick()

  expect(wrapper.text()).toBe('2')

  update(3)

  await nextTick()

  expect(wrapper.text()).toBe('2')
})

test('reads a store that holds null before it holds an object', () => {
  const setUser = createEvent<{name: string}>()
  const $user = createStore<{name: string} | null>(null).on(
    setUser,
    (_, user) => user,
  )

  const name = withSetup(() =>
    useStoreMap({
      store: $user,
      fn: user => user?.name,
      defaultValue: 'anonymous',
    }),
  )

  expect(name.value).toBe('anonymous')

  setUser({name: 'alice'})

  expect(name.value).toBe('alice')
})

test('falls back to the default value when the key disappears', () => {
  const userRemove = createEvent<string>()
  const $users = createStore<Record<string, string>>({
    alex: 'Alex',
    john: 'John',
  }).on(userRemove, (users, nickname) => {
    const upd = {...users}
    delete upd[nickname]
    return upd
  })

  const name = withSetup(() =>
    useStoreMap({
      store: $users,
      keys: () => 'alex',
      fn: (users, nickname) => users[nickname],
      defaultValue: 'unknown',
    }),
  )

  expect(name.value).toBe('Alex')

  userRemove('alex')

  expect(name.value).toBe('unknown')
})

test('gives the selector the state of the store as it is', () => {
  const $user = createStore({name: 'alice'})

  const user = withSetup(() => useStoreMap({store: $user, fn: state => state}))

  expect(user.value).toBe($user.getState())
})

test('keeps two calls on one store apart and leaves its state alone', () => {
  const update = createEvent<number>()
  const initial = {count: 0}
  const $counter = createStore(initial).on(update, (_, count) => ({count}))

  const frozen = withSetup(() =>
    useStoreMap({
      store: $counter,
      fn: state => state.count,
      updateFilter: () => false,
    }),
  )
  const live = withSetup(() =>
    useStoreMap({store: $counter, fn: state => state.count}),
  )

  update(1)

  expect(live.value).toBe(1)
  expect(frozen.value).toBe(0)
  expect(initial).toEqual({count: 0})
})

test('passes the results of the selector to updateFilter', () => {
  const update = createEvent<number>()
  const $counter = createStore({count: 0}).on(update, (_, count) => ({count}))
  const calls: number[][] = []

  withSetup(() =>
    useStoreMap({
      store: $counter,
      fn: state => state.count * 10,
      updateFilter: (upd, current) => {
        calls.push([upd, current])
        return true
      },
    }),
  )

  update(1)
  update(2)

  expect(calls).toEqual([
    [10, 0],
    [20, 10],
  ])
})

describe('keys', () => {
  const nameOf = (keys: any) => {
    const $names = createStore<Record<string, string>>({
      a: 'Alpha',
      b: 'Beta',
    })

    return withSetup(() =>
      useStoreMap({
        store: $names,
        keys,
        fn: (names, key: string) => names[key],
      }),
    )
  }

  test('a function', () => {
    expect(nameOf(() => 'a').value).toBe('Alpha')
  })

  test('a getter over reactive state', () => {
    const state = reactive({key: 'a'})
    const name = nameOf(() => state.key)

    expect(name.value).toBe('Alpha')

    state.key = 'b'

    expect(name.value).toBe('Beta')
  })

  test('a ref', () => {
    const key = ref('a')
    const name = nameOf(key)

    expect(name.value).toBe('Alpha')

    key.value = 'b'

    expect(name.value).toBe('Beta')
  })

  test('a plain value', () => {
    expect(nameOf('b').value).toBe('Beta')
  })
})

test('falls back to the default value on every undefined result', () => {
  const $frameworks = createStore(['Vue', 'React'])
  const target = ref('Vue')

  const framework = withSetup(() =>
    useStoreMap({
      store: $frameworks,
      keys: target,
      fn: (list, name) => list.find(item => item === name),
      defaultValue: 'Solid',
    }),
  )

  expect(framework.value).toBe('Vue')

  target.value = 'Ember'

  expect(framework.value).toBe('Solid')

  target.value = 'React'

  expect(framework.value).toBe('React')

  target.value = 'Angular'

  expect(framework.value).toBe('Solid')
})

test('filters the recomputes that a change of keys causes', () => {
  const $users = createStore<Record<string, string>>({a: 'Alex', b: 'Bob'})
  const key = ref('a')

  const name = withSetup(() =>
    useStoreMap({
      store: $users,
      keys: key,
      fn: (users, id) => users[id],
      updateFilter: () => false,
    }),
  )

  expect(name.value).toBe('Alex')

  key.value = 'b'

  /** The filter rejects the result of the recompute as well. */
  expect(name.value).toBe('Alex')
})

test('recomputes when fn reads a ref outside of keys', () => {
  const $users = createStore<Record<string, string>>({a: 'Alice', b: 'Bob'})
  const id = ref('a')

  const name = withSetup(() =>
    useStoreMap({store: $users, fn: users => users[id.value]}),
  )

  expect(name.value).toBe('Alice')

  id.value = 'b'

  expect(name.value).toBe('Bob')
})

test('a getter in keys that returns the same value does not run fn again', () => {
  const $users = createStore<Record<string, string>>({a: 'Alice'})
  const tick = ref(0)
  const key: [string] = ['a']
  const fn = jest.fn(
    (users: Record<string, string>, [id]: [string]) => users[id],
  )

  withSetup(() =>
    useStoreMap({
      store: $users,
      keys: () => {
        tick.value
        return key
      },
      fn,
    }),
  )

  const calls = fn.mock.calls.length
  tick.value += 1

  expect(fn).toHaveBeenCalledTimes(calls)
})

test('raises what the selector throws and recovers on the next result', () => {
  const update = createEvent<string>()
  const $value = createStore('fine').on(update, (_, value) => value)
  const error = jest.spyOn(console, 'error').mockImplementation(() => {})

  const selected = withSetup(() =>
    useStoreMap({
      store: $value,
      fn: value => {
        if (value === 'boom') throw new Error('boom from fn')

        return value
      },
    }),
  )

  expect(selected.value).toBe('fine')

  update('boom')

  expect(() => selected.value).toThrow('boom from fn')

  update('good')

  expect(selected.value).toBe('good')
  error.mockRestore()
})

test('gives the selector a reactive state as the store holds it', () => {
  const state = reactive({name: 'alice'})
  const $user = createStore(state)

  const user = withSetup(() => useStoreMap({store: $user, fn: value => value}))

  expect(user.value).toBe($user.getState())
  expect(isReactive(user.value)).toBe(true)
})

test('reports a missing store and a missing selector', () => {
  const $user = createStore({name: 'alice'})

  expect(() =>
    withSetup(() => useStoreMap({fn: (state: any) => state} as any)),
  ).toThrow('useStoreMap expects a store')
  expect(() => withSetup(() => useStoreMap($user as any))).toThrow(
    'useStoreMap expects fn as a function',
  )
})

test('takes a store and a selector as positional arguments', () => {
  const rename = createEvent<string>()
  const $user = createStore({name: 'alice'}).on(rename, (user, name) => ({
    ...user,
    name,
  }))

  const name = withSetup(() => useStoreMap($user, user => user.name))

  expect(name.value).toBe('alice')

  rename('bob')

  expect(name.value).toBe('bob')
})

test('takes the scope in the options of the short form', () => {
  const $user = createStore({name: 'global'})
  const scope = fork({values: [[$user, {name: 'scoped'}]]})

  const name = withSetup(() => useStoreMap($user, user => user.name, {scope}))

  expect(name.value).toBe('scoped')
})
