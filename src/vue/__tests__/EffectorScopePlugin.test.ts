import {shallowMount} from 'vue-test-utils-next'
import {EffectorScopePlugin} from 'effector-vue'
import {
  EffectorScopePlugin as EffectorScopePluginFromComposition,
  useUnit,
} from 'effector-vue/composition'
import {createEvent, createStore, fork, allSettled} from 'effector'
import {createApp} from 'vue-next'

jest.mock('vue', () => require('vue-next'))

async function expectScopeIsolation(plugin: typeof EffectorScopePlugin) {
  const $value = createStore('No scope')

  const setValue = createEvent<string>()

  $value.on(setValue, (_, value) => value)

  const App = {
    template: `
      <div>
        <p data-test="value">{{value}}</p>
      </div>
    `,
    setup() {
      const value = useUnit($value)

      return {
        value,
      }
    },
  }

  const scopeOne = fork({values: [[$value, 'scope one']]})
  const scopeTwo = fork({values: [[$value, 'scope two']]})

  const wrapperOne = shallowMount(App, {
    global: {plugins: [plugin({scope: scopeOne})]},
  })

  const wrapperTwo = shallowMount(App, {
    global: {plugins: [plugin({scope: scopeTwo})]},
  })

  expect(wrapperOne.find('[data-test="value"]').text()).toBe('scope one')
  expect(wrapperTwo.find('[data-test="value"]').text()).toBe('scope two')

  await allSettled(setValue, {scope: scopeOne, params: 'scope one updated'})
  await allSettled(setValue, {scope: scopeTwo, params: 'scope two updated'})

  expect(wrapperOne.find('[data-test="value"]').text()).toBe('scope one updated')
  expect(wrapperTwo.find('[data-test="value"]').text()).toBe('scope two updated')
}

describe('EffectorScopePlugin', () => {
  test('does not mix scopes', async () => {
    await expectScopeIsolation(EffectorScopePlugin)
  })

  test('is exported from effector-vue/composition', async () => {
    expect(EffectorScopePluginFromComposition).toBe(EffectorScopePlugin)

    await expectScopeIsolation(EffectorScopePluginFromComposition)
  })

  test('installs when passed to app.use with options', () => {
    const $value = createStore('no scope')
    const scope = fork({values: [[$value, 'scoped']]})

    const wrapper = shallowMount(
      {
        template: `<p data-test="value">{{value}}</p>`,
        setup() {
          return {value: useUnit($value)}
        },
      },
      // app.use(EffectorScopePlugin, {scope}) used to do nothing at all
      {global: {plugins: [[EffectorScopePlugin, {scope}]]}},
    )

    expect(wrapper.find('[data-test="value"]').text()).toBe('scoped')
  })

  test('does not install silently without a scope', () => {
    expect(() => createApp({}).use(EffectorScopePlugin({} as any))).toThrow(
      /\[effector-vue\] EffectorScopePlugin: expected "scope"/,
    )
    expect(() => createApp({}).use(EffectorScopePlugin)).toThrow(
      /\[effector-vue\] EffectorScopePlugin: expected "scope"/,
    )
  })
})
