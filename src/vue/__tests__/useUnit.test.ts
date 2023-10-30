/* eslint-disable react-hooks/rules-of-hooks */
import {shallowMount} from 'vue-test-utils-next'
import {useUnit} from 'effector-vue/composition'
import {createEvent, createStore, createWatch} from 'effector'

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

      expect(listener).toBeCalledTimes(1)

      unwatch()
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

      expect(listener1).toBeCalledTimes(1)
      expect(listener2).toBeCalledTimes(0)

      await wrapper.find('[data-test="btn-2"]').trigger('click')

      expect(listener1).toBeCalledTimes(1)
      expect(listener2).toBeCalledTimes(1)

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
  })
})
