/* eslint-disable react-hooks/rules-of-hooks */
import {EffectorScopePlugin, useVModel} from 'effector-vue/composition'
import {
  createEvent,
  createStore,
  fork,
  restore,
  sample,
  serialize,
} from 'effector'
import {shallowMount, flushPromises} from 'vue-test-utils-next'
import {effectScope, nextTick} from 'vue-next'
import * as v8 from 'v8'

jest.mock('vue', () => require('vue-next'))

/**
 * Hides `console.error` for the cases that expect a report from the
 * composable. Everywhere else the warnings of Vue stay visible.
 */
function withSilencedWarnings<T>(fn: (warn: jest.SpyInstance) => T): T {
  const warn = jest.spyOn(console, 'error').mockImplementation(() => {})
  try {
    return fn(warn)
  } finally {
    warn.mockRestore()
  }
}

it('updated value of input if store changed from outside', async () => {
  const updated = createEvent()
  const $user = createStore({
    skills: [{name: 'HTML', points: 10}],
  })

  $user.on(updated, state => ({...state, skills: [{name: 'HTML', points: 20}]}))

  const wrapper = shallowMount({
    template: `
      <div>
        <input v-model="user.skills[0].points" data-test="skills.points">
      </div>
    `,
    setup() {
      const user = useVModel($user)
      return {user}
    },
  })
  await wrapper.find('[data-test="skills.points"]').setValue(15)
  expect($user.getState()).toEqual({
    skills: [{name: 'HTML', points: '15'}],
  })
  updated()

  await wrapper.vm.$nextTick()
  // @ts-ignore
  expect(wrapper.find('[data-test="skills.points"]').element.value).toBe('20')
})

it('[v-model] works correct with scalar values', async () => {
  const $username = createStore('')
  const wrapper = shallowMount({
    template: `
      <div><input v-model="username" data-test="field"></div>
    `,
    setup() {
      const username = useVModel($username)
      return {username}
    },
  })
  await wrapper.find('[data-test="field"]').setValue('John Doe')
  expect($username.getState()).toBe('John Doe')
})

it('[v-model] works correct with objects', async () => {
  const $user = createStore({
    name: '',
    surname: '',
  })

  const wrapper = shallowMount({
    template: `
      <div>
        <input v-model="user.name" data-test="name">
        <input v-model="user.surname" data-test="surname">
      </div>
    `,
    setup() {
      const user = useVModel($user)
      return {user}
    },
  })

  await wrapper.find('[data-test="name"]').setValue('John')
  await wrapper.find('[data-test="surname"]').setValue('Doe')
  expect($user.getState()).toEqual({
    name: 'John',
    surname: 'Doe',
  })
})

it('reset useVModel', async () => {
  const model = {
    name: '',
    surname: '',
  }
  const reset = createEvent()
  const $user = createStore(model).reset(reset)

  const wrapper = shallowMount({
    template: `
      <div>
        <input v-model="user.name" data-test="name">
        <input v-model="user.surname" data-test="surname">
      </div>
    `,
    setup() {
      const user = useVModel($user)
      return {user}
    },
  })

  await wrapper.find('[data-test="name"]').setValue('John')
  await wrapper.find('[data-test="surname"]').setValue('Doe')
  reset()
  await wrapper.vm.$nextTick()
  expect($user.getState()).toEqual(model)
})

it('[v-model] works correct with checkboxes (like vue-3 way)', async () => {
  const $skills = createStore([])

  const wrapper = shallowMount({
    template: `
      <input type="checkbox" v-model="skills" data-test="skills" value="HTML">
      <input type="checkbox" v-model="skills" data-test="skills" value="CSS">
      <input type="checkbox" v-model="skills" data-test="skills" value="JS">
    `,
    setup() {
      const skills = useVModel($skills)
      return {skills}
    },
  })

  await wrapper.findAll('[data-test="skills"]')[0].setValue()
  await wrapper.findAll('[data-test="skills"]')[1].setValue()
  await wrapper.findAll('[data-test="skills"]')[2].setValue()
  expect($skills.getState()).toEqual(['HTML', 'CSS', 'JS'])
})

it('[v-model] works correct with radio (like vue-3 way)', async () => {
  const $gender = createStore('male')

  const wrapper = shallowMount({
    template: `
      <input type="radio" name="gender" v-model="gender" data-test="gender" value="female">
      <input type="radio" name="gender" v-model="gender" data-test="gender" value="male">
    `,
    setup() {
      const gender = useVModel($gender)
      return {gender}
    },
  })

  await wrapper.find('[data-test="gender"]').setValue()
  expect($gender.getState()).toEqual('female')
})

it('[v-model] default values rendered correct when passing object with Store values', async () => {
  const $user = {
    name: createStore('John'),
    surname: createStore('Doe'),
  }

  const wrapper = shallowMount({
    template: `
      <div>
        <input v-model="user.name" data-test="name">
        <input v-model="user.surname" data-test="surname">
      </div>
    `,
    setup() {
      const user = useVModel($user)

      return {user}
    },
  })

  const nameInput = wrapper.find('[data-test="name"]').element as any
  const surnameInput = wrapper.find('[data-test="surname"]').element as any

  expect(nameInput.value).toBe('John')
  expect(surnameInput.value).toBe('Doe')
})

it('[v-model] changed deep value', async () => {
  const updated = createEvent()
  const $user = createStore({
    skills: [{name: 'HTML', points: 10}],
  })

  $user.on(updated, state => ({...state, skills: [{name: 'HTML', points: 20}]}))

  const userForm = {
    base: $user,
  }

  const wrapper = shallowMount({
    template: `
      <div>
        <input v-model="user.base.skills[0].points" data-test="skills.points">
      </div>
    `,
    setup() {
      const user = useVModel(userForm)

      return {user}
    },
  })
  await wrapper.find('[data-test="skills.points"]').setValue(15)

  expect($user.getState()).toEqual({
    skills: [{name: 'HTML', points: '15'}],
  })

  updated()

  await wrapper.vm.$nextTick()
  // @ts-ignore
  expect(wrapper.find('[data-test="skills.points"]').element.value).toBe('20')
})

it('[v-model] change each store value separately', async () => {
  const nameChanged = createEvent<string>()
  const surnameChanged = createEvent<string>()

  const $name = restore(nameChanged, 'John')
  const $surname = restore(surnameChanged, 'Doe')

  const $user = {
    name: $name,
    surname: $surname,
  }

  const wrapper = shallowMount({
    template: `
      <div>
        <input v-model="user.name" data-test="name">
        <input v-model="user.surname" data-test="surname">
      </div>
    `,
    setup() {
      const user = useVModel($user)

      return {user}
    },
  })

  const nameInput = wrapper.find('[data-test="name"]').element as any
  const surnameInput = wrapper.find('[data-test="surname"]').element as any

  expect(nameInput.value).toBe('John')
  expect(surnameInput.value).toBe('Doe')

  await wrapper.find('[data-test="name"]').setValue('Alan')
  await wrapper.find('[data-test="surname"]').setValue('Boe')

  expect($name.getState()).toEqual('Alan')
  expect($surname.getState()).toEqual('Boe')

  nameChanged('John')
  surnameChanged('Doe')

  await wrapper.vm.$nextTick()

  expect(nameInput.value).toBe('John')
  expect(surnameInput.value).toBe('Doe')
})

it('[v-model] works correct with composable with shape', async () => {
  const nameChanged = createEvent<string>()
  const $name = createStore('John')
  $name.on(nameChanged, (_, value) => value)

  const $user = {
    name: $name,
  }

  const user = useVModel($user)

  user.name = 'Alan'
  await flushPromises()
  expect(user.name).toEqual('Alan')
  expect($name.getState()).toEqual('Alan')

  nameChanged('John')
  await flushPromises()
  expect($name.getState()).toEqual('John')
  expect(user.name).toEqual('John')
})

it('[v-model] works correct with composable with $store', async () => {
  const nameChanged = createEvent<string>()
  const $name = createStore('John')
  $name.on(nameChanged, (_, value) => value)

  const name = useVModel($name)
  name.value = 'Alan'
  await flushPromises()
  expect(name.value).toEqual('Alan')
  expect($name.getState()).toEqual('Alan')

  nameChanged('John')
  await flushPromises()
  expect($name.getState()).toEqual('John')
  expect(name.value).toEqual('John')
})

it('[v-model] two-way binding has been cleared with shape', async () => {
  const nameChanged = createEvent<string>()
  const $name = createStore('Alan')
  $name.on(nameChanged, (_, value) => value)

  const $user = {
    name: $name,
  }

  const scope = effectScope()
  /** The form with a Vue EffectScope on purpose: the case predates the options object. */
  const user = withSilencedWarnings(() => useVModel($user, scope))
  scope.stop()

  nameChanged('John')
  await flushPromises()
  expect(user.name).toEqual('Alan')
  expect($name.getState()).toEqual('John')

  user.name = 'Alice'
  await flushPromises()
  expect(user.name).toEqual('Alice')
  expect($name.getState()).toEqual('John')
})

it('[v-model] two-way binding has been cleared with $store', async () => {
  const nameChanged = createEvent<string>()
  const $name = createStore('Alan')
  $name.on(nameChanged, (_, value) => value)

  const scope = effectScope()
  /** The form with a Vue EffectScope on purpose: the case predates the options object. */
  const name = withSilencedWarnings(() => useVModel($name, scope))
  scope.stop()

  nameChanged('John')
  await flushPromises()
  expect(name.value).toEqual('Alan')
  expect($name.getState()).toEqual('John')

  name.value = 'Alice'
  await flushPromises()
  expect(name.value).toEqual('Alice')
  expect($name.getState()).toEqual('John')
})

describe('scope', () => {
  test('user input is written into the scope of the plugin', async () => {
    const $user = createStore({name: 'John'})
    const scope = fork()

    const wrapper = shallowMount(
      {
        template: `<input v-model="user.name" data-test="name">`,
        setup() {
          const user = useVModel($user)
          return {user}
        },
      },
      {global: {plugins: [EffectorScopePlugin({scope})]}},
    )

    await wrapper.find('[data-test="name"]').setValue('Alan')

    expect(scope.getState($user)).toEqual({name: 'Alan'})
    expect($user.getState()).toEqual({name: 'John'})
    expect(serialize(scope)).toEqual({[$user.sid!]: {name: 'Alan'}})
  })

  test('the scope option is read outside of a component', async () => {
    const $user = createStore({name: 'John'})
    const scope = fork()

    const user = useVModel($user, {scope})
    user.value = {name: 'Alan'}
    await flushPromises()

    expect(scope.getState($user)).toEqual({name: 'Alan'})
    expect($user.getState()).toEqual({name: 'John'})
  })
})

describe('two waves of the sync', () => {
  test('the shape form does not write to its stores on mount', async () => {
    const $user = createStore({name: 'John'})
    const updates = jest.fn()
    $user.updates.watch(updates)

    shallowMount({
      template: `<input v-model="form.user.name" data-test="name">`,
      setup() {
        const form = useVModel({user: $user})
        return {form}
      },
    })
    await nextTick()

    expect(updates).not.toHaveBeenCalled()
    expect($user.getState()).toEqual({name: 'John'})
  })

  test('an update of the store is not written back to it', async () => {
    const updated = createEvent()
    const $user = createStore({name: 'John'})
    $user.on(updated, () => ({name: 'Jane'}))
    const updates = jest.fn()
    $user.updates.watch(updates)

    const user = useVModel($user)
    updated()
    await flushPromises()

    expect(updates).toHaveBeenCalledTimes(1)
    expect(user.value).toEqual({name: 'Jane'})
  })

  test('two edits inside one pass of the kernel both reach the store', async () => {
    const started = createEvent()
    const $user = createStore({first: 'John', last: 'Doe'})

    const user = useVModel($user)
    started.watch(() => {
      user.value.first = 'Jane'
      user.value.last = 'Roe'
    })

    started()
    await flushPromises()

    expect($user.getState()).toEqual({first: 'Jane', last: 'Roe'})
    expect(user.value).toEqual({first: 'Jane', last: 'Roe'})
  })

  test('an edit that reverts the previous one in the same pass is written', async () => {
    const started = createEvent()
    const $user = createStore({name: 'John'})

    const user = useVModel($user)
    started.watch(() => {
      user.value.name = 'Jane'
      user.value.name = 'John'
    })

    started()
    await flushPromises()

    expect($user.getState()).toEqual({name: 'John'})
    expect(user.value).toEqual({name: 'John'})
  })

  test('an update and an edit in the same tick keep the edit', async () => {
    const updated = createEvent()
    const $user = createStore({name: 'John'})
    $user.on(updated, () => ({name: 'Jane'}))

    const user = useVModel($user)

    updated()
    user.value = {name: 'Alan'}
    await flushPromises()

    expect($user.getState()).toEqual({name: 'Alan'})
    expect(user.value).toEqual({name: 'Alan'})
  })
})

describe('the copy of the state', () => {
  /**
   * The jsdom environment of jest has no `structuredClone`, and it is the copy through
   * it that keeps Map, Set and Date. Without the global the composable falls
   * back to `deepCopy`, the branch `clone.test.ts` covers.
   */
  let stubbed = false

  beforeAll(() => {
    stubbed = typeof structuredClone !== 'function'
    if (stubbed) {
      ;(globalThis as any).structuredClone = (value: unknown) =>
        v8.deserialize(v8.serialize(value))
    }
  })

  afterAll(() => {
    if (stubbed) delete (globalThis as any).structuredClone
  })

  test('Map, Set and Date survive a round trip', async () => {
    const $form = createStore({
      title: 'draft',
      tags: new Set(['effector']),
      meta: new Map([['author', 'John']]),
      created: new Date('2020-01-01T00:00:00.000Z'),
    })

    const wrapper = shallowMount({
      template: `<input v-model="form.title" data-test="title">`,
      setup() {
        const form = useVModel($form)
        return {form}
      },
    })

    await wrapper.find('[data-test="title"]').setValue('published')

    const tagOf = (value: unknown) => Object.prototype.toString.call(value)
    const state = $form.getState()

    expect(state.title).toBe('published')
    expect(tagOf(state.tags)).toBe('[object Set]')
    expect([...state.tags]).toEqual(['effector'])
    expect(tagOf(state.meta)).toBe('[object Map]')
    expect([...state.meta]).toEqual([['author', 'John']])
    expect(tagOf(state.created)).toBe('[object Date]')
    expect(state.created.toISOString()).toBe('2020-01-01T00:00:00.000Z')
  })
})

describe('options', () => {
  test('deep: false tracks assignments of the whole value', async () => {
    const $user = createStore({name: 'John'})

    const user = useVModel($user, {deep: false})
    user.value = {name: 'Alan'}
    await flushPromises()

    expect($user.getState()).toEqual({name: 'Alan'})
  })

  test('a store updated twice in one pass settles', async () => {
    const go = createEvent()
    const bump = createEvent()
    const $counter = createStore({n: 0})
      .on(go, ({n}) => ({n: n + 1}))
      .on(bump, ({n}) => ({n: n + 10}))
    sample({clock: go, target: bump})

    const form = useVModel($counter)

    go()
    await nextTick()

    expect($counter.getState()).toEqual({n: 11})
    expect(form.value).toEqual({n: 11})
  })

  test('a state the copy cannot reproduce is not written back', async () => {
    const received = createEvent<{name: string; error: Error}>()
    const $form = createStore({name: 'John', error: new Error('boom')}).on(
      received,
      (_, value) => value,
    )
    const updates = jest.fn()
    $form.updates.watch(updates)

    useVModel($form)
    received({name: 'Alan', error: new Error('boom')})
    await nextTick()

    expect(updates).toHaveBeenCalledTimes(1)
  })

  test('a state that refers to itself is compared without recursing', async () => {
    const self: any = {name: 'John'}
    self.self = self
    const $form = createStore(self)

    const form = useVModel($form)
    form.value.name = 'Alan'
    await nextTick()

    expect($form.getState().name).toBe('Alan')
  })

  test('the scope of effector as the second argument is refused', () => {
    const $form = createStore({name: 'John'})

    expect(() => useVModel($form, fork() as any)).toThrow(
      'the scope of effector in the options',
    )
  })

  test('a derived store is reported', () => {
    const $user = createStore({name: 'John'})
    const $name = $user.map(({name}) => name)

    withSilencedWarnings(warn => {
      useVModel($name)

      expect(warn).toHaveBeenCalledWith(expect.stringContaining('derived store'))
    })
  })

  test('a Vue EffectScope as the second argument still works', () => {
    const $user = createStore({name: 'John'})

    withSilencedWarnings(warn => {
      const user = useVModel($user, effectScope())

      expect(user.value).toEqual({name: 'John'})
      expect(warn).not.toHaveBeenCalled()
    })
  })
})
