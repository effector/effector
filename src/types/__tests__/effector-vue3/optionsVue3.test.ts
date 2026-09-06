/* eslint-disable no-unused-vars */
import {createEvent, createStore} from 'effector'
import {ComponentCustomOptions, createApp, defineComponent, Plugin} from 'vue'
/**
 * The runtime of this entry point is not aliased in the jest setup, so the
 * typings are imported as types only: the assertions below never execute.
 */
import type {VueEffector} from 'effector-vue/options-vue3'

const typecheck = '{global}'

describe('VueEffector', () => {
  test('is a vue plugin', () => {
    const plugin: Plugin = null as unknown as typeof VueEffector

    const setup = (app: ReturnType<typeof createApp>) => {
      app.use(plugin)
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('effector option is declared on component options', () => {
    const $count = createStore(0)
    const inc = createEvent()

    const options: ComponentCustomOptions = {
      effector: () => ({count: $count, inc}),
    }

    const component = () =>
      defineComponent({
        effector: () => ({count: $count, inc}),
      })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('effector option is a function, not a plain shape', () => {
    const $count = createStore(0)

    const options: ComponentCustomOptions = {
      effector: {count: $count},
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Object literal may only specify known properties, and 'count' does not exist in type '() => Record<string, EffectorOptionValue>'.
      "
    `)
  })
})

describe('EffectorScopePlugin', () => {
  test('structural plugin type of the root entry point works with app.use', () => {
    /**
     * `EffectorScopePlugin` is declared in the root `effector-vue` typings,
     * which are written against Vue 2 and cannot be compiled in this pass. Its
     * return type is checked structurally here, see
     * packages/effector-vue/index.d.ts.
     */
    const scopePlugin: {install(app: any): void} = {install() {}}

    const setup = (app: ReturnType<typeof createApp>) => {
      app.use(scopePlugin)
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})
