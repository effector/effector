/* eslint-disable react-hooks/rules-of-hooks */
import {useVModel} from 'effector-vue/composition'
import {createEvent, createStore, restore} from 'effector'
import {shallowMount, flushPromises} from 'vue-test-utils-next'
import {effectScope} from 'vue-next'

jest.mock('vue', () => require('vue-next'))

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
  const user = useVModel($user, scope)
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
  const name = useVModel($name, scope)
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
