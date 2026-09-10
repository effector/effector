/* eslint-disable react-hooks/rules-of-hooks */
import {shallowMount} from 'vue-test-utils-next'
import {EffectorScopePlugin} from 'effector-vue'
import {useUnit} from 'effector-vue/composition'
import {
  createEffect,
  createEvent,
  createStore,
  createWatch,
  fork,
} from 'effector'
import {watchEffect} from 'vue-next'
import {argumentHistory} from 'effector/fixtures'

jest.mock('vue', () => require('vue-next'))

describe('mirror useStore tests', () => {
  it('list of primitive values rendered correct', () => {
    const length = 3
    const $numbers = createStore(Array.from({length}, (_, idx) => idx))
    const wrapper = shallowMount({
      template: `
          <ul id="app">
            <li v-for="(n, key) in numbers" :key="key" data-test="item">{{n}}</li>
          </ul>
        `,
      setup() {
        const numbers = useUnit($numbers)
        return {numbers}
      },
    })
    expect(wrapper.findAll('[data-test="item"]')).toHaveLength(length)
  })

  it('add new item and re-render list', async () => {
    const userAdded = createEvent()
    const $users = createStore([{name: 'John', surname: 'Doe'}])

    $users.on(userAdded, state => [...state, {name: 'Alan', surname: 'Doe'}])

    const wrapper = shallowMount({
      template: `
          <ul id="app">
            <li v-for="(item, key) in users" :key="key" data-test="item">{{item.name}}</li>
          </ul>
        `,
      setup() {
        const users = useUnit($users)
        return {users}
      },
    })
    userAdded()

    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('[data-test="item"]')).toHaveLength(2)
  })
})

describe('useUnit', () => {
  describe('scopeless', () => {
    it('returns event as function', async () => {
      const someEvent = createEvent()
      const wrapper = shallowMount({
        template: `
          <button data-test="btn" @click="greet">Click me</button>
        `,
        setup() {
          const greet = useUnit(someEvent)
          return {greet}
        },
      })
      const listener = jest.fn()
      const unwatch = createWatch({unit: someEvent, fn: listener})

      await wrapper.find('[data-test="btn"]').trigger('click')

      expect(listener).toHaveBeenCalledTimes(1)

      unwatch()
    })

    it('returns effect as function', async () => {
      const someEffect = createEffect(() => {})
      const wrapper = shallowMount({
        template: `
          <button data-test="btn" @click="run">Click me</button>
        `,
        setup() {
          const run = useUnit(someEffect)
          return {run}
        },
      })
      const listener = jest.fn()
      const unwatch = createWatch({unit: someEffect, fn: listener})

      await wrapper.find('[data-test="btn"]').trigger('click')

      expect(listener).toBeCalledTimes(1)

      unwatch()
    })

    it('returns effect as function in array and in object as well', () => {
      const someEffect = createEffect(() => {})
      const results: Record<string, any> = {}

      shallowMount({
        template: `<div />`,
        setup() {
          results.single = useUnit(someEffect)
          results.list = useUnit([someEffect])
          results.shape = useUnit({run: someEffect})
          return {}
        },
      })

      expect(typeof results.single).toBe('function')
      expect(typeof results.list[0]).toBe('function')
      expect(typeof results.shape.run).toBe('function')
    })

    it('supports array of stores', async () => {
      const userAdded = createEvent()
      const $users = createStore([{name: 'John', surname: 'Doe'}]).on(
        userAdded,
        state => [...state, {name: 'Alan', surname: 'Doe'}],
      )

      const titleChanged = createEvent<string>()
      const $title = createStore('Hello').on(titleChanged, (_, title) => title)

      const wrapper = shallowMount({
        template: `
                <h1 data-test="title">{{title}}</h1>
                <ul id="app">
                  <li v-for="(item, key) in users" :key="key" data-test="item">{{item.name}}</li>
                </ul>
              `,
        setup() {
          const [users, title] = useUnit([$users, $title])
          return {users, title}
        },
      })
      expect(wrapper.findAll('[data-test="item"]')).toHaveLength(1)
      expect(wrapper.find('[data-test="title"]').element.textContent).toBe(
        'Hello',
      )

      userAdded()

      await wrapper.vm.$nextTick()
      expect(wrapper.findAll('[data-test="item"]')).toHaveLength(2)
      expect(wrapper.find('[data-test="title"]').element.textContent).toBe(
        'Hello',
      )

      titleChanged('World')
      await wrapper.vm.$nextTick()
      expect(wrapper.findAll('[data-test="item"]')).toHaveLength(2)
      expect(wrapper.find('[data-test="title"]').element.textContent).toBe(
        'World',
      )
    })

    it('supports objects of stores', async () => {
      const userAdded = createEvent()
      const $users = createStore([{name: 'John', surname: 'Doe'}]).on(
        userAdded,
        state => [...state, {name: 'Alan', surname: 'Doe'}],
      )

      const titleChanged = createEvent<string>()
      const $title = createStore('Hello').on(titleChanged, (_, title) => title)

      const wrapper = shallowMount({
        template: `
              <h1 data-test="title">{{title}}</h1>
              <ul id="app">
                <li v-for="(item, key) in users" :key="key" data-test="item">{{item.name}}</li>
              </ul>
            `,
        setup() {
          const {users, title} = useUnit({users: $users, title: $title})
          return {users, title}
        },
      })
      expect(wrapper.findAll('[data-test="item"]')).toHaveLength(1)
      expect(wrapper.find('[data-test="title"]').element.textContent).toBe(
        'Hello',
      )

      userAdded()

      await wrapper.vm.$nextTick()
      expect(wrapper.findAll('[data-test="item"]')).toHaveLength(2)
      expect(wrapper.find('[data-test="title"]').element.textContent).toBe(
        'Hello',
      )

      titleChanged('World')
      await wrapper.vm.$nextTick()
      expect(wrapper.findAll('[data-test="item"]')).toHaveLength(2)
      expect(wrapper.find('[data-test="title"]').element.textContent).toBe(
        'World',
      )
    })

    it('supports objects with events', async () => {
      const someEvent = createEvent()
      const someOtherEvent = createEvent()

      const wrapper = shallowMount({
        template: `
            <div>
                <button data-test="btn-1" @click="greet">Click me 1</button>
                <button data-test="btn-2" @click="bye">Click me 2</button>
            </div>
          `,
        setup() {
          const {greet, bye} = useUnit({greet: someEvent, bye: someOtherEvent})
          return {greet, bye}
        },
      })
      const listener1 = jest.fn()
      const unwatch1 = createWatch({unit: someEvent, fn: listener1})

      const listener2 = jest.fn()
      const unwatch2 = createWatch({unit: someOtherEvent, fn: listener2})

      await wrapper.find('[data-test="btn-1"]').trigger('click')

      expect(listener1).toHaveBeenCalledTimes(1)
      expect(listener2).toHaveBeenCalledTimes(0)

      await wrapper.find('[data-test="btn-2"]').trigger('click')

      expect(listener1).toHaveBeenCalledTimes(1)
      expect(listener2).toHaveBeenCalledTimes(1)

      unwatch1()
      unwatch2()
    })

    it('supports array with events', async () => {
      const someEvent = createEvent()
      const someOtherEvent = createEvent()

      const wrapper = shallowMount({
        template: `
              <div>
                  <button data-test="btn-1" @click="greet">Click me 1</button>
                  <button data-test="btn-2" @click="bye">Click me 2</button>
              </div>
            `,
        setup() {
          const [greet, bye] = useUnit([someEvent, someOtherEvent])
          return {greet, bye}
        },
      })
      const listener1 = jest.fn()
      const unwatch1 = createWatch({unit: someEvent, fn: listener1})

      const listener2 = jest.fn()
      const unwatch2 = createWatch({unit: someOtherEvent, fn: listener2})

      await wrapper.find('[data-test="btn-1"]').trigger('click')

      expect(listener1).toHaveBeenCalledTimes(1)
      expect(listener2).toHaveBeenCalledTimes(0)

      await wrapper.find('[data-test="btn-2"]').trigger('click')

      expect(listener1).toHaveBeenCalledTimes(1)
      expect(listener2).toHaveBeenCalledTimes(1)

      unwatch1()
      unwatch2()
    })

    it('supports object with stores AND events', async () => {
      const userAdded = createEvent()
      const $users = createStore([{name: 'John', surname: 'Doe'}])

      $users.on(userAdded, state => [...state, {name: 'Alan', surname: 'Doe'}])

      const wrapper = shallowMount({
        template: `
            <div>
                <button data-test="btn" @click="add">Add</button>
                <ul id="app">
                    <li v-for="(item, key) in users" :key="key" data-test="item">{{item.name}}</li>
                </ul>
            </div>
            `,
        setup() {
          const {users, add} = useUnit({users: $users, add: userAdded})
          return {users, add}
        },
      })

      expect(wrapper.findAll('[data-test="item"]')).toHaveLength(1)

      await wrapper.find('[data-test="btn"]').trigger('click')

      expect($users.getState()).toHaveLength(2)
      expect(wrapper.findAll('[data-test="item"]')).toHaveLength(2)
    })

    it('supports array with stores AND events', async () => {
      const userAdded = createEvent()
      const $users = createStore([{name: 'John', surname: 'Doe'}])

      $users.on(userAdded, state => [...state, {name: 'Alan', surname: 'Doe'}])

      const wrapper = shallowMount({
        template: `
              <div>
                  <button data-test="btn" @click="add">Add</button>
                  <ul id="app">
                      <li v-for="(item, key) in users" :key="key" data-test="item">{{item.name}}</li>
                  </ul>
              </div>
              `,
        setup() {
          const [users, add] = useUnit([$users, userAdded])
          return {users, add}
        },
      })

      expect(wrapper.findAll('[data-test="item"]')).toHaveLength(1)

      await wrapper.find('[data-test="btn"]').trigger('click')

      expect($users.getState()).toHaveLength(2)
      expect(wrapper.findAll('[data-test="item"]')).toHaveLength(2)
    })

    it('supports @@unitShape', async () => {
      const userAdded = createEvent()
      const $users = createStore([{name: 'John', surname: 'Doe'}])

      $users.on(userAdded, state => [...state, {name: 'Alan', surname: 'Doe'}])

      const customEntity = {
        '@@unitShape': () => ({users: $users, add: userAdded}),
      }

      const wrapper = shallowMount({
        template: `
                <div>
                    <button data-test="btn" @click="add">Add</button>
                    <ul id="app">
                        <li v-for="(item, key) in users" :key="key" data-test="item">{{item.name}}</li>
                    </ul>
                </div>
                `,
        setup() {
          const {users, add} = useUnit(customEntity)
          return {users, add}
        },
      })

      expect(wrapper.findAll('[data-test="item"]')).toHaveLength(1)

      await wrapper.find('[data-test="btn"]').trigger('click')

      expect($users.getState()).toHaveLength(2)
      expect(wrapper.findAll('[data-test="item"]')).toHaveLength(2)
    })
  })

  describe('scopefull', () => {
    it('returns bound event', async () => {
      const correctScope = fork()
      const incorrectScope = fork()

      const someEvent = createEvent()

      const wrapper = shallowMount(
        {
          template: `
            <button data-test="btn" @click="greet">Click me</button>
          `,
          setup() {
            const greet = useUnit(someEvent)
            return {greet}
          },
        },
        {global: {plugins: [EffectorScopePlugin({scope: correctScope})]}},
      )

      const correctListener = jest.fn()
      const unwatch1 = createWatch({
        unit: someEvent,
        fn: correctListener,
        scope: correctScope,
      })

      const incorrectListener = jest.fn()
      const unwatch2 = createWatch({
        unit: someEvent,
        fn: incorrectListener,
        scope: incorrectScope,
      })

      await wrapper.find('[data-test="btn"]').trigger('click')

      expect(correctListener).toHaveBeenCalledTimes(1)
      expect(incorrectListener).toHaveBeenCalledTimes(0)

      unwatch1()
      unwatch2()
    })

    it('returns bound effect', async () => {
      const scope = fork()

      let resolveEffect: () => void = () => {}
      const someEffect = createEffect(() => {
        return new Promise<void>(resolve => {
          resolveEffect = resolve
        })
      })

      const wrapper = shallowMount(
        {
          template: `
            <button data-test="btn" @click="run">Click me</button>
          `,
          setup() {
            const run = useUnit(someEffect)
            return {run}
          },
        },
        {global: {plugins: [EffectorScopePlugin({scope})]}},
      )

      await wrapper.find('[data-test="btn"]').trigger('click')

      expect(scope.getState(someEffect.pending)).toBe(true)
      expect(someEffect.pending.getState()).toBe(false)
      expect(scope.getState(someEffect.inFlight)).toBe(1)
      expect(someEffect.inFlight.getState()).toBe(0)

      resolveEffect()
      await new Promise(resolve => setTimeout(resolve, 0))

      expect(scope.getState(someEffect.pending)).toBe(false)
    })

    it('uses state from scope', async () => {
      const correctScope = fork()
      const incorrectScope = fork()

      const userAdded = createEvent()
      const $users = createStore([{name: 'John', surname: 'Doe'}])

      $users.on(userAdded, state => [...state, {name: 'Alan', surname: 'Doe'}])

      const wrapper = shallowMount(
        {
          template: `
                <div>
                    <button data-test="btn" @click="add">Add</button>
                    <ul id="app">
                        <li v-for="(item, key) in users" :key="key" data-test="item">{{item.name}}</li>
                    </ul>
                </div>
                `,
          setup() {
            const [users, add] = useUnit([$users, userAdded])
            return {users, add}
          },
        },
        {global: {plugins: [EffectorScopePlugin({scope: correctScope})]}},
      )

      expect(wrapper.findAll('[data-test="item"]')).toHaveLength(1)

      await wrapper.find('[data-test="btn"]').trigger('click')

      expect(correctScope.getState($users)).toHaveLength(2)
      expect(incorrectScope.getState($users)).toHaveLength(1)

      expect(wrapper.findAll('[data-test="item"]')).toHaveLength(2)
    })
  })

  test('batching', async () => {
    const $a = createStore(1)
    const $b = createStore(2)

    const inc = createEvent()

    $a.on(inc, v => v + 1)
    $b.on(inc, v => v + 1)

    const listener = jest.fn()

    const wrapper = shallowMount({
      template: `
              <div>
                  <ul id="app">
                      <p data-test="a">{{a}}</p>
                      <p data-test="b">{{b}}</p>
                  </ul>
              </div>
              `,
      setup() {
        const [a, b] = useUnit([$a, $b])

        watchEffect(() => {
          listener([a.value, b.value])
        })

        return {a, b}
      },
    })

    expect(listener).toHaveBeenCalledTimes(1)
    expect(argumentHistory(listener)).toMatchInlineSnapshot(`
      Array [
        Array [
          1,
          2,
        ],
      ]
    `)

    expect(wrapper.find('[data-test="a"]').element.textContent).toBe('1')
    expect(wrapper.find('[data-test="b"]').element.textContent).toBe('2')

    inc()

    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-test="a"]').element.textContent).toBe('2')
    expect(wrapper.find('[data-test="b"]').element.textContent).toBe('3')

    expect(listener).toHaveBeenCalledTimes(2)
    expect(argumentHistory(listener)).toMatchInlineSnapshot(`
      Array [
        Array [
          1,
          2,
        ],
        Array [
          2,
          3,
        ],
      ]
    `)
  })
})
