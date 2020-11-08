/* eslint-disable react-hooks/rules-of-hooks */
import {useModel} from 'effector-vue/composition'
import {createEvent, createStore} from 'effector'
import {shallowMount} from 'vue-test-utils-next'

jest.mock('vue', () => require('vue-next'))


it('updated value of input if store changed from outside', async () => {
  const updated = createEvent()
  const $user = createStore({
    skills: [
      {name: 'HTML', points: 10}
    ]
  })
  $user
  .on(updated, (state) => ({...state, skills: [{name: 'HTML', points: 20}]}))

  const wrapper = shallowMount({
    template: `
      <div>
        <input v-model="user.skills[0].points" data-test="skills.points">
      </div>
    `,
    setup() {
      const user = useModel($user)
      return {user}
    }
  })
  await wrapper.find('[data-test="skills.points"]').setValue(15)
  expect($user.getState()).toEqual({
    skills: [{name: 'HTML', points: '15'}]
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
      const username = useModel($username)
      return {username}
    }
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
      const user = useModel($user)
      return {user}
    }
  })

  await wrapper.find('[data-test="name"]').setValue('John')
  await wrapper.find('[data-test="surname"]').setValue('Doe')
  expect($user.getState()).toEqual({
    name: 'John',
    surname: 'Doe',
  })
})

it('reset useModel', async () => {
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
      const user = useModel($user)
      return {user}
    }
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
      const skills = useModel($skills)
      return {skills}
    }
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
      const gender = useModel($gender)
      return {gender}
    }
  })

  await wrapper.find('[data-test="gender"]').setValue()
  expect($gender.getState()).toEqual('female')
})
