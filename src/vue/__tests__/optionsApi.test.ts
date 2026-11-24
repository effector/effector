import {defineComponent, h} from 'vue-next'
import {mount, shallowMount} from 'vue-test-utils-next'
import {
  Event,
  Store,
  allSettled,
  createEffect,
  createEvent,
  createStore,
  fork,
  is,
} from 'effector'
import {EffectorScopePlugin} from 'effector-vue/composition'

import {VueEffector} from '../optionsApi'
import {linksCount, renderSSR} from './helpers'

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

describe('scope', () => {
  const scoped = (scope: ReturnType<typeof fork>) => ({
    global: {
      plugins: [VueEffector, EffectorScopePlugin({scope})],
    },
  })

  test('renders the state of the scope', () => {
    const counter$ = createStore(0)
    const scope = fork({values: [[counter$, 5]]})
    const component = defineComponent({
      template: `<div>{{counter$}}</div>`,
      effector() {
        return {counter$}
      },
    })

    const wrapper = shallowMount(component, scoped(scope))

    expect(wrapper.html()).toBe('<div>5</div>')
  })

  test('follows the updates of the scope and no other', async () => {
    const inc = createEvent()
    const counter$ = createStore(0).on(inc, n => n + 1)
    const scope = fork({values: [[counter$, 5]]})
    const component = defineComponent({
      template: `<div>{{counter$}}</div>`,
      effector() {
        return {counter$}
      },
    })

    const wrapper = shallowMount(component, scoped(scope))

    await allSettled(inc, {scope})
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toBe('<div>6</div>')

    inc()
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toBe('<div>6</div>')
  })

  test('counts the calls of an event made in the scope', async () => {
    const evt = createEvent()
    const scope = fork()
    const component = defineComponent({
      template: `<div>{{evt}}</div>`,
      effector() {
        return {evt}
      },
    })

    const wrapper = shallowMount(component, scoped(scope))

    await allSettled(evt, {scope})
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toBe('<div>1</div>')
  })

  test('refuses a v-model key on a derived store', () => {
    const counter$ = createStore(1)
    const doubled$ = counter$.map(count => count * 2)
    const component = defineComponent({
      template: `<div>{{doubled$}}</div>`,
      effector() {
        return {doubled$: {value: doubled$, vModel: true}}
      },
    })

    expect(() => shallowMount(component, globalOptions)).toThrow(
      'Effector property doubled$.value should not be a derived Store',
    )
  })

  test('writes a v-model edit into the scope', async () => {
    const fullname$ = createStore('')
    const scope = fork()
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

    const wrapper = shallowMount(component, scoped(scope))

    await wrapper.find('[data-input]').setValue('John Doe')

    expect(scope.getState(fullname$)).toBe('John Doe')
    expect(fullname$.getState()).toBe('')
  })

  test('removes its watchers from the scope on unmount', () => {
    const counter$ = createStore(0)
    const scope = fork()
    const component = defineComponent({
      template: `<div>{{counter$}}</div>`,
      effector() {
        return {counter$}
      },
    })

    const wrapper = shallowMount(component, scoped(scope))

    expect(linksCount(scope)).toBe(1)

    wrapper.unmount()

    expect(linksCount(scope)).toBe(0)
    expect(console.error).not.toHaveBeenCalled()
  })

  test('an event or effect key leaves no entry in the scope per mount', () => {
    const evt = createEvent()
    const fx = createEffect(() => {})
    const scope = fork()
    const component = defineComponent({
      template: `<div>{{evt}}, {{fx}}</div>`,
      effector() {
        return {evt, fx}
      },
    })
    /** linksCount sums lengths, and an emptied list keeps its key. */
    const keysCount = () => [
      Object.keys((scope as any).reg).length,
      Object.keys((scope as any).additionalLinks).length,
    ]

    shallowMount(component, scoped(scope)).unmount()

    const before = keysCount()

    shallowMount(component, scoped(scope)).unmount()

    expect(keysCount()).toEqual(before)
    expect(before[0]).toBe(0)
  })

  test('a v-model key leaves no entry in the scope per mount', async () => {
    const fullname$ = createStore('')
    const scope = fork()
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
    const keysCount = () => [
      Object.keys((scope as any).reg).length,
      Object.keys((scope as any).additionalLinks).length,
    ]
    const editOnce = async (text: string) => {
      const wrapper = shallowMount(component, scoped(scope))

      await wrapper.find('[data-input]').setValue(text)
      wrapper.unmount()
    }

    await editOnce('John')

    const before = keysCount()

    await editOnce('Doe')

    expect(scope.getState(fullname$)).toBe('Doe')
    expect(keysCount()).toEqual(before)
  })
})

describe('server render', () => {
  /** The subscribers of a unit and the nodes it owns, a watcher is both. */
  function nodesCount(unit: Store<any> | Event<any>) {
    const units = is.store(unit) ? [unit, unit.updates] : [unit]

    return units.reduce((count, item) => {
      const {next, family} = (item as any).graphite
      return count + next.length + family.links.length
    }, 0)
  }

  function createPage() {
    const submit = createEvent()
    const $name = createStore('global')
    const $title = createStore('global')
    const Page = defineComponent({
      effector() {
        return {
          name: $name,
          title: {value: $title, vModel: true},
          submit,
        }
      },
      render() {
        return h('p', `${this.name}, ${this.title}, ${this.submit}`)
      },
    })

    return {submit, $name, $title, Page}
  }

  test('renders the state of the scope and leaves no node behind', async () => {
    const {submit, $name, $title, Page} = createPage()
    const scope = fork({
      values: [
        [$name, 'scoped'],
        [$title, 'scoped'],
      ],
    })
    const units = [$name, $title, submit]
    const before = units.map(nodesCount)

    const html = await renderSSR(Page, {scope, plugins: [VueEffector]})

    expect(html).toBe('<p>scoped, scoped, null</p>')
    expect(linksCount(scope)).toBe(0)
    expect(units.map(nodesCount)).toEqual(before)
  })

  test('leaves no node behind without a scope', async () => {
    const {submit, $name, $title, Page} = createPage()
    const units = [$name, $title, submit]
    const before = units.map(nodesCount)

    const html = await renderSSR(Page, {plugins: [VueEffector]})

    expect(html).toBe('<p>global, global, null</p>')
    expect(units.map(nodesCount)).toEqual(before)
  })

  test('renders the data loaded in serverPrefetch', async () => {
    const loadFx = createEffect(async () => 'loaded')
    const $name = createStore('empty').on(loadFx.doneData, (_, name) => name)
    const scope = fork()
    const Page = defineComponent({
      effector() {
        return {name: $name}
      },
      serverPrefetch() {
        return allSettled(loadFx, {scope})
      },
      render() {
        return h('p', this.name)
      },
    })

    const html = await renderSSR(Page, {scope, plugins: [VueEffector]})

    expect(html).toBe('<p>loaded</p>')
  })

  test('renders a write into a v-model key', async () => {
    const $search = createStore('')
    const scope = fork()
    const Page = defineComponent({
      effector() {
        return {search: {value: $search, vModel: true}}
      },
      computed: {
        label(): string {
          return `search: ${this.search}`
        },
      },
      created() {
        /** The read caches the computed before the write. */
        this.label
        this.search = 'from route'
      },
      render() {
        return h('p', this.label)
      },
    })

    const html = await renderSSR(Page, {scope, plugins: [VueEffector]})

    expect(html).toBe('<p>search: from route</p>')
    expect(scope.getState($search)).toBe('')
    expect(linksCount(scope)).toBe(0)
  })
})
