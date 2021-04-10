import {defineComponent} from 'vue-next'
import {mount, shallowMount} from 'vue-test-utils-next'
import {createEvent, createStore} from 'effector'

import {VueEffector} from '../optionsApi'

jest.mock('vue', () => require('vue-next'))

console.error = jest.fn()

beforeEach(() => {
  // @ts-ignore
  console.error.mockClear()
})

const globalOptions = {
  global: {
    plugins: [VueEffector],
  },
}

test('show counter', () => {
  const counter$ = createStore(0)
  const component = defineComponent({
    template: `<div>{{counter$}}</div>`,
    effector() {
      return {
        counter$,
      }
    },
  })

  const wrapper = shallowMount(component, {
    ...globalOptions,
  })

  expect(wrapper.vm.counter$).toBe(0)
  expect(wrapper.html()).toBe('<div>0</div>')
})

test('test SID if pass event to effector object', async () => {
  const evt = createEvent()
  const mockCallback = jest.fn()

  const component = defineComponent({
    template: '<div>{{ evt }}</div>',
    effector() {
      return {
        evt,
      }
    },
    watch: {
      evt() {
        mockCallback()
      },
    },
  })

  const wrapper = shallowMount(component, {
    ...globalOptions,
  })

  evt()
  await wrapper.vm.$nextTick()

  expect(mockCallback.mock.calls.length).toBe(1)
})

test('vue component watch option', async () => {
  const counter$ = createStore(0)
  const mockCallback = jest.fn()

  const component = defineComponent({
    template: '<div>{{ counter$ }}</div>',
    effector() {
      return {
        counter$,
      }
    },
    watch: {
      counter$() {
        mockCallback()
      },
    },
  })

  const wrapper = shallowMount(component, {
    ...globalOptions,
  })

  expect(wrapper.vm.counter$).toBe(0)

  //@ts-ignore
  counter$.setState(1)
  await wrapper.vm.$nextTick()

  expect(wrapper.vm.counter$).toBe(1)
  expect(mockCallback.mock.calls.length).toBe(1)
})

test('is v-model works correct with input', () => {
  const expected = 'John Doe'

  const fullname$ = createStore('')
  const component = defineComponent({
    template: `<div><input v-model="fullname$" data-input></div>`,
    effector() {
      return {
        fullname$: {
          value: fullname$,
          vModel: true,
        },
      }
    },
  })

  const wrapper = shallowMount(component, {
    ...globalOptions,
  })

  wrapper.find('[data-input]').setValue(expected)

  // @ts-ignore
  expect(wrapper.vm.fullname$).toBe(expected)
})

test('is v-model works with custom component', async () => {
  const expected = 'John Doe'

  const child = defineComponent({
    name: 'child',
    template: `<div></div>`,
    methods: {
      handleChange() {
        this.$emit('update:modelValue', expected)
      },
    },
  })

  const fullname$ = createStore('')
  const component = defineComponent({
    template: `
      <div>
        <child v-model="fullname$"/>
      </div>
    `,

    components: {
      child,
    },

    effector() {
      return {
        fullname$: {
          value: fullname$,
          vModel: true,
        },
      }
    },
  })

  const wrapper = mount(component, {
    ...globalOptions,
  })

  wrapper.findComponent({name: 'child'}).vm.handleChange()
  expect(wrapper.vm.fullname$).toBe(expected)
})

test('non v-model usage support', async () => {
  const changeEvent = createEvent()
  const someEvt = createEvent()

  const store$ = createStore('')
    .on(changeEvent, (_, value) => value)
    .on(someEvt, () => 'some-value')

  const component = defineComponent({
    template: `
      <div id="app">
        <input id="input" :value="store$" @input="(e) => changeEvent(e.target.value)" />
        <button id="btn" @click="someEvt">set some-value</button>
      </div>
    `,
    name: 'App',
    effector() {
      return {
        store$,
      }
    },
    methods: {
      changeEvent,
      someEvt,
    },
  })

  const wrapper = mount(component, {
    ...globalOptions,
  })
  const input = wrapper.element.querySelector('#input')! as HTMLInputElement
  const btn = wrapper.element.querySelector('#btn')! as HTMLButtonElement
  btn.click()

  await wrapper.vm.$nextTick()

  expect(store$.getState()).toBe('some-value')
  expect(input.value).toBe('some-value')
})

test('change value in array from UI via v-model', async () => {
  const handleChange = createEvent<number>()

  const users$ = createStore<{name: string; selected: boolean}[]>([
    {name: 'Alan', selected: false},
    {name: 'Criss', selected: false},
    {name: 'John', selected: false},
  ])

  users$.on(handleChange, (state, payload) => {
    const idx = state.findIndex((_, i) => i === payload)
    const s = [...state]

    s[idx].selected = !s[idx].selected
    return s
  })

  const component = defineComponent({
    template: `
      <div>
        <label
          v-for="(user, key) in users$"
          :key="key"
        >
        <input
          type="checkbox"
          :value="user"
          @change="handleChange(key)"
          data-test="checkbox"
        >
          {{user.name}}
        </label>
      </div>
    `,

    effector() {
      return {
        users$,
      }
    },

    methods: {
      handleChange,
    },
  })

  const wrapper = mount(component, {
    ...globalOptions,
  })
  const checkbox = wrapper.find('[data-test="checkbox"]')
  // @ts-ignore
  await checkbox.setChecked()

  expect(users$.getState()[0].selected).toBeTruthy()
})

test('change value in array from event via v-model', async () => {
  const handleChange = createEvent<number>()

  const users$ = createStore<{name: string; selected: boolean}[]>([
    {name: 'Alan', selected: false},
    {name: 'Criss', selected: false},
    {name: 'John', selected: false},
  ])

  users$.on(handleChange, (state, payload) => {
    const idx = state.findIndex((_, i) => i === payload)
    const s = [...state]

    s[idx].selected = !s[idx].selected
    return s
  })

  const component = defineComponent({
    template: `
      <div>
        <label
          v-for="(user, key) in users$"
          :key="key"
        >
        <input
          type="checkbox"
          :value="user"
          @change="handleChange(key)"
          data-test="checkbox"
        >
          {{user.name}}
        </label>

        <button @click="handleChange(0)" data-test="btn">
          Change
        </button>
      </div>
    `,

    effector() {
      return {
        users$,
      }
    },

    methods: {
      handleChange,
    },
  })

  const wrapper = mount(component, {
    ...globalOptions,
  })
  const btn = wrapper.find('[data-test="btn"]')
  await btn.trigger('click')

  expect(users$.getState()[0].selected).toBeTruthy()
})

test('effector store is readonly for UI', async () => {
  const counter$ = createStore(0)

  const component = defineComponent({
    template: `<div></div>`,
    effector() {
      return {
        counter$,
      }
    },
    methods: {
      handleChange() {
        // @ts-ignore
        this.counter$ = 15
      },
    },
  })
  const wrapper = shallowMount(component, {
    ...globalOptions,
  })

  wrapper.vm.handleChange()
  await wrapper.vm.$nextTick()

  expect(console.error).toHaveBeenCalledTimes(1)
})
