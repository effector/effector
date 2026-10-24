/* eslint-disable react-hooks/rules-of-hooks */
import {
  EffectorScopePlugin,
  createGate,
  useGate,
  useStore,
  useStoreMap,
  useUnit,
  useVModel,
} from 'effector-vue/composition'
import {
  Scope,
  allSettled,
  createEffect,
  createEvent,
  createStore,
  fork,
  sample,
  serialize,
} from 'effector'
import {
  Component,
  Plugin,
  createSSRApp,
  defineComponent,
  h,
  onServerPrefetch,
} from 'vue-next'
import {renderToString} from '@vue/server-renderer'

import {VueSSRPlugin} from '../ssr/VueSSRPlugin'
import {useEvent} from '../ssr/useEvent'

jest.mock('vue', () => require('vue-next'))

type User = {name: string; friends: string[]}

const users: Record<string, User> = {
  alice: {name: 'alice', friends: ['bob', 'carol']},
  bob: {name: 'bob', friends: ['alice']},
  carol: {name: 'carol', friends: ['alice']},
}

function createModel() {
  const start = createEvent<string>()
  const fetchUser = createEffect(async (name: string) => {
    /** Bob answers last, so parallel renders finish out of order. */
    await new Promise(rs => setTimeout(rs, name === 'bob' ? 30 : 10))
    return users[name]
  })
  sample({clock: start, target: fetchUser})

  const $user = createStore('guest', {sid: 'user'}).on(
    fetchUser.doneData,
    (_, user) => user.name,
  )
  const $friends = createStore<string[]>([], {sid: 'friends'}).on(
    fetchUser.doneData,
    (_, user) => user.friends,
  )
  const Gate = createGate<{page: string}>()

  return {start, fetchUser, $user, $friends, Gate}
}

type Model = ReturnType<typeof createModel>

/** One composable per component, the way an application spreads them. */
function createPage(model: Model) {
  const Name = defineComponent({
    setup() {
      const user = useUnit(model.$user)
      return () => h('h2', user.value)
    },
  })
  const Friends = defineComponent({
    setup() {
      const friends = useStoreMap({
        store: model.$friends,
        keys: () => [],
        fn: list => list.join(', '),
      })
      return () => h('p', friends.value)
    },
  })
  const Total = defineComponent({
    setup() {
      const friends = useStore(model.$friends)
      return () => h('small', String(friends.value.length))
    },
  })
  const Input = defineComponent({
    setup() {
      const user = useVModel(model.$user)
      return () => h('input', {value: user.value})
    },
  })

  return defineComponent({
    setup() {
      useGate(model.Gate, () => ({page: 'friends'}))
      return () => h('main', [h(Name), h(Friends), h(Total), h(Input)])
    },
  })
}

function pageOf(name: string) {
  const {friends} = users[name]
  return (
    `<main><h2>${name}</h2><p>${friends.join(', ')}</p>` +
    `<small>${friends.length}</small><input value="${name}"></main>`
  )
}

function render(
  component: Component,
  plugin: Plugin,
  props?: Record<string, unknown>,
) {
  const app = createSSRApp(component, props)
  app.use(plugin)
  return renderToString(app)
}

/** The install of effector-vue 23.1.1: a string key and nothing else. */
function legacyPlugin(scope: Scope, scopeName: string): Plugin {
  return {
    install(app) {
      app.config.globalProperties.scopeName = scopeName
      app.provide(scopeName, scope)
    },
  }
}

const plugins: Array<[string, (scope: Scope) => Plugin]> = [
  ['EffectorScopePlugin', scope => EffectorScopePlugin({scope})],
  [
    'EffectorScopePlugin with a scopeName',
    scope => EffectorScopePlugin({scope, scopeName: 'app'}),
  ],
  ['VueSSRPlugin', scope => VueSSRPlugin({scope})],
  ['the plugin of effector-vue 23.1.1', scope => legacyPlugin(scope, 'app')],
]

let warn: jest.SpyInstance

beforeEach(() => {
  /** VueSSRPlugin and useEvent print their deprecation. */
  warn = jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
  warn.mockRestore()
})

describe.each(plugins)('application render with %s', (_, plugin) => {
  test('parallel requests render the data of their own scope', async () => {
    const model = createModel()
    const Page = createPage(model)
    const names = ['alice', 'bob', 'carol']
    const scopes = names.map(() => fork())

    await Promise.all(
      scopes.map((scope, i) =>
        allSettled(model.start, {scope, params: names[i]}),
      ),
    )
    const html = await Promise.all(
      scopes.map(scope => render(Page, plugin(scope))),
    )

    expect(html).toEqual(names.map(pageOf))
    scopes.forEach((scope, i) => {
      expect(serialize(scope)).toMatchObject({
        user: names[i],
        friends: users[names[i]].friends,
      })
    })
    expect(model.$user.getState()).toBe('guest')
    expect(model.Gate.status.getState()).toBe(false)
  })

  test('parallel requests load their data in onServerPrefetch', async () => {
    const model = createModel()
    const Page = createPage(model)
    const App = defineComponent({
      props: {user: {type: String, required: true}},
      setup(props) {
        const fetchUser = useUnit(model.fetchUser)
        onServerPrefetch(() => fetchUser(props.user))
        return () => h(Page)
      },
    })
    const names = ['bob', 'alice', 'carol']

    const html = await Promise.all(
      names.map(user => render(App, plugin(fork()), {user})),
    )

    expect(html).toEqual(names.map(pageOf))
    expect(model.$user.getState()).toBe('guest')
  })

  test('useEvent of effector-vue/ssr calls the event in the request scope', async () => {
    const visit = createEvent()
    const $visits = createStore(0).on(visit, count => count + 1)
    const App = defineComponent({
      setup() {
        const onVisit = useEvent(visit)
        const visits = useUnit($visits)
        onServerPrefetch(() => onVisit())
        return () => h('p', String(visits.value))
      },
    })
    const scopes = [fork(), fork({values: [[$visits, 10]]})]

    const html = await Promise.all(
      scopes.map(scope => render(App, plugin(scope))),
    )

    expect(html).toEqual(['<p>1</p>', '<p>11</p>'])
    expect($visits.getState()).toBe(0)
  })
})
