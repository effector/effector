import {shallowMount, createLocalVue} from '@vue/test-utils'
import {createStore} from 'effector'
import {VueEffector, createComponent} from 'effector-vue'

const localVue = createLocalVue()
localVue.use(VueEffector)

test('show counter', () => {
  const $counter = createStore(0)
  const component = {
    template: '<div>{{ counter }}</div>',
    effector: {
      counter: $counter,
    },
  }
  //@ts-ignore
  const wrapper = shallowMount(component, {
    localVue,
  })
  expect(wrapper.vm.counter).toBe(0)
  expect(wrapper.html()).toBe('<div>0</div>')
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
  //@ts-ignore
  expect(wrapper.vm.counter).toBe(0)
  expect(wrapper.html()).toBe('<div>0</div>')
})

test('vue $watch', async() => {
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
  //@ts-ignore
  expect(wrapper.vm.counter).toBe(0)

  //@ts-ignore
  $counter.setState(1)
  await localVue.nextTick()

  //@ts-ignore
  expect(wrapper.vm.counter).toBe(1)
  expect(mockCallback.mock.calls.length).toBe(1)
})

test('vue component watch option', async() => {
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

  //@ts-ignore
  expect(wrapper.vm.counter).toBe(0)

  //@ts-ignore
  $counter.setState(1)
  await localVue.nextTick()

  //@ts-ignore
  expect(wrapper.vm.counter).toBe(1)
  expect(mockCallback.mock.calls.length).toBe(1)
})
