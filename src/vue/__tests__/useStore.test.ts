/* eslint-disable react-hooks/rules-of-hooks */
import {shallowMount} from 'vue-test-utils-next'
import {useStore} from 'effector-vue/composition'
import {createEvent, createStore} from 'effector'

jest.mock('vue', () => require('vue-next'))

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
      const numbers = useStore($numbers)
      return {numbers}
    }
  })
  expect(wrapper.findAll('[data-test="item"]')).toHaveLength(length)
})

it('add new item and re-render list', async () => {
  const userAdded = createEvent()
  const $users = createStore([{name: 'John', surname: 'Doe'}])

  $users.on(userAdded, (state) => [...state, {name: 'Alan', surname: 'Doe'}])

  const wrapper = shallowMount({
    template: `
      <ul id="app">
        <li v-for="(item, key) in users" :key="key" data-test="item">{{item.name}}</li>
      </ul>
    `,
    setup() {
      const users = useStore($users)
      return {users}
    }
  })
  userAdded()

  await wrapper.vm.$nextTick()
  expect(wrapper.findAll('[data-test="item"]')).toHaveLength(2)
})
