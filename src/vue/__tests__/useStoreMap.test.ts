import {useStoreMap, useStore} from 'effector-vue/composition'
import {allSettled, createEvent, createStore, restore} from 'effector'
import {mount, shallowMount} from 'vue-test-utils-next'
import { defineComponent, nextTick, ref } from 'vue-next'
import { await } from 'most'

jest.mock('vue', () => require('vue-next'))

it("should render correct", async () => {
  const userRemove = createEvent<string>()
  const userAgeChange = createEvent<{nickname: string; age: number}>()
  const $users = createStore<Record<string, {age: number; name: string}>>({
    alex: {age: 20, name: 'Alex'},
    john: {age: 30, name: 'John'},
  })
  const $userNames = createStore(['alex', 'john'])

  $userNames.on(userRemove, (list, username) =>
    list.filter(item => item !== username),
  )
  $users
    .on(userRemove, (users, nickname) => {
      const upd = {...users}
      delete upd[nickname]
      return upd
    })
    .on(userAgeChange, (users, {nickname, age}) => ({
      ...users,
      [nickname]: {...users[nickname], age},
    }))

  const Card = defineComponent({
    props: {
      nickname: {
        type: String,
        required: true
      },
    },
    setup(props) {
      const user = useStoreMap(
        {
          store: $users,
          keys: () => props.nickname,
          fn: (users, nickname) => users[nickname],
        },
      )
      return {user}
    },
    template: `
      <div>{{user.name}}:{{user.age}}</div>
    `
  })

  const wrapper = mount({
    components: {
      Card,
    },
    setup() {
      const userNames = useStore($userNames)
      return {userNames}
    },
    template: `
      <div>
        <Card v-for="(name, key) in userNames" :key="key" :nickname="name" data-test="card" />
      </div>
    `
  })

  expect(wrapper.findAllComponents('[data-test="card"]').map(v => v.text()).join('')).toBe("Alex:20John:30")

  userAgeChange({nickname: 'john', age: 40 })

  await nextTick()

  expect(wrapper.findAllComponents('[data-test="card"]').map(v => v.text()).join('')).toBe("Alex:20John:40")

  userRemove("alex")

  await nextTick()
  expect(wrapper.findAllComponents('[data-test="card"]').map(v => v.text()).join('')).toBe("John:40")
})

it('defaultValue support', async () => {
  const store = createStore(['Vue', 'React', "Angular"])
  let target = ref("Vue")

  const wrapper = shallowMount({
    setup() {
      const framework = useStoreMap({
        store,
        keys: () => target.value,
        fn: (state, target) => state.find(t => t === target),
        defaultValue: "Solid",
      })

      return {framework}
    },
    template: `
      <div>
        {{framework}}
      </div>
    `
  })

  expect(wrapper.text()).toBe('Vue')

  target.value = "Ember"

  await nextTick()

  expect(wrapper.text()).toBe('Solid')
})
