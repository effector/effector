import {shallowMount} from 'vue-test-utils-next'
import {EffectorScopePlugin} from 'effector-vue'
import {useUnit} from 'effector-vue/composition'
import {createEvent, createStore, fork, allSettled} from 'effector'

jest.mock('vue', () => require('vue-next'))

describe('EffectorScopePlugin', () => {
  test('does not mix scopes', async () => {
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
      global: {plugins: [EffectorScopePlugin({scope: scopeOne})]},
    })

    const wrapperTwo = shallowMount(App, {
      global: {plugins: [EffectorScopePlugin({scope: scopeTwo})]},
    })

    expect(wrapperOne.find('[data-test="value"]').text()).toBe('scope one')
    expect(wrapperTwo.find('[data-test="value"]').text()).toBe('scope two')

    await allSettled(setValue, {scope: scopeOne, params: 'scope one updated'})
    await allSettled(setValue, {scope: scopeTwo, params: 'scope two updated'})

    expect(wrapperOne.find('[data-test="value"]').text()).toBe(
      'scope one updated',
    )
    expect(wrapperTwo.find('[data-test="value"]').text()).toBe(
      'scope two updated',
    )
  })
})
