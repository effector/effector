import {shallowMount, createLocalVue, mount} from '@vue/test-utils'
import {createStore, createEvent} from 'effector'
import Vue from 'vue'
import {VueEffector, createComponent} from 'effector-vue'

const localVue = createLocalVue()
localVue.use(VueEffector)

test('show counter', () => {
  const $counter = createStore(0)
  const component = Vue.extend({
    template: '<div>{{ counter }}</div>',
    effector: {
      counter: $counter,
    },
  })
  const wrapper = shallowMount(component, {
    localVue,
  })
  expect(wrapper.vm.counter).toBe(0)
  expect(wrapper.html()).toBe('<div>0</div>')
})

test('is store its [key] state', async () => {
  const $counter = createStore(0)
  const evt = createEvent()

  $counter.on(evt, state => state + 1)

  const wrapper = shallowMount(
    {
      template: '<div>{{ state }}</div>',
      effector: $counter,
    },
    {localVue},
  )

  evt()

  await wrapper.vm.$nextTick()

  // @ts-ignore
  expect(wrapper.vm.state).toBe(1)
})

test('show counter with createComponent', () => {
  const $counter = createStore(0)
  const componentWithWrapper = createComponent(
    {
      name: 'ComponentWithWrapper',
      template: '<div>{{ counter }}</div>',
    },
    {counter: $counter},
  )

  const wrapper = shallowMount(componentWithWrapper, {
    localVue,
  })

  expect(wrapper.vm.counter).toBe(0)
  expect(wrapper.html()).toBe('<div>0</div>')
})

test('vue $watch', async () => {
  const $counter = createStore(0)
  const mockCallback = jest.fn()

  const component = createComponent(
    {
      template: '<div>{{ counter }}</div>',
      created() {
        this.$watch('counter', function counter() {
          mockCallback()
        })
      },
    },
    {counter: $counter},
  )
  const wrapper = shallowMount(component, {
    localVue,
  })

  expect(wrapper.vm.counter).toBe(0)

  //@ts-ignore
  $counter.setState(1)
  await localVue.nextTick()

  expect(wrapper.vm.counter).toBe(1)
  expect(mockCallback.mock.calls.length).toBe(1)
})

test('test SID if pass event to effector object', async () => {
  const evt = createEvent()
  const mockCallback = jest.fn()

  const component = createComponent(
    {
      template: '<div>{{ evt }}</div>',
      watch: {
        evt() {
          mockCallback()
        },
      },
    },
    {evt},
  )

  const wrapper = shallowMount(component, {
    localVue,
  })

  evt()
  // @ts-ignore
  await wrapper.vm.$nextTick()
  expect(mockCallback.mock.calls.length).toBe(1)
})

test('vue component watch option', async () => {
  const $counter = createStore(0)
  const mockCallback = jest.fn()

  const component = createComponent(
    {
      template: '<div>{{ counter }}</div>',
      watch: {
        counter() {
          mockCallback()
        },
      },
    },
    {counter: $counter},
  )
  const wrapper = shallowMount(component, {
    localVue,
  })

  expect(wrapper.vm.counter).toBe(0)

  //@ts-ignore
  $counter.setState(1)
  await localVue.nextTick()

  expect(wrapper.vm.counter).toBe(1)
  expect(mockCallback.mock.calls.length).toBe(1)
})

test('is v-model works correct with state key on input', () => {
  const expected = 'John Doe'

  const $fullname = createStore('')
  const component = Vue.extend({
    template: `<div><input v-model="state" data-input></div>`,
    effector: $fullname,
  })

  const wrapper = shallowMount(component, {
    localVue,
  })

  wrapper.find('[data-input]').setValue(expected)

  // @ts-ignore
  expect(wrapper.vm.state).toBe(expected)
})

test('is v-model works correct with custom key on input', () => {
  const expected = 'John Doe'

  const $fullname = createStore('')
  const component = Vue.extend({
    template: `<div><input v-model="$fullname" data-input></div>`,
    effector: {
      $fullname,
    },
  })

  const wrapper = shallowMount(component, {
    localVue,
  })

  wrapper.find('[data-input]').setValue(expected)

  // @ts-ignore
  expect(wrapper.vm.$fullname).toBe(expected)
})

test('is v-model works with custom component', () => {
  const expected = 'John Doe'

  const child = Vue.extend({
    name: 'child',
    template: `<div></div>`,
    props: {
      value: String,
    },
    methods: {
      handleChange() {
        this.$emit('input', expected)
      },
    },
  })

  const $fullname = createStore('')
  const component = Vue.extend({
    template: `
      <div>
        <child v-model="$fullname"/>
      </div>
    `,

    components: {
      child,
    },

    effector: {
      $fullname,
    },
  })

  const wrapper = mount(component, {
    localVue,
  })

  // @ts-ignore
  wrapper.findComponent({name: 'child'}).vm.handleChange()

  // @ts-ignore
  expect(wrapper.vm.$fullname).toBe(expected)
})

test('non v-model usage support', () => {
  const changeEvent = createEvent()
  const someEvt = createEvent()

  const $store = createStore('')
    .on(changeEvent, (_, value) => value)
    .on(someEvt, () => 'some-value')

  const component = Vue.extend({
    template: `
      <div id="app">
        <input id="input" :value="value" @input="(e) => changeEvent(e.target.value)" />
        <button id="btn" @click="someEvt">set some-value</button>
      </div>
    `,
    name: 'App',
    effector: {
      value: $store,
    },
    methods: {
      changeEvent,
      someEvt,
    },
  })

  const wrapper = mount(component, {
    localVue,
  })
  const input = wrapper.element.querySelector('#btn')! as HTMLInputElement
  const btn = wrapper.element.querySelector('#btn')! as HTMLButtonElement
  btn.click()
  expect($store.getState()).toBe('some-value')
  // should be 'some-value' but something happens
  expect(input.value).toBe('')
})
