import {createStore} from 'effector'
import Vue from 'vue'
import {createComponent} from 'effector-vue'

const typecheck = '{global}'

describe('vue extend', () => {
  describe('object type', () => {
    test('should pass typecheck', () => {
      const $counter = createStore(1)

      Vue.extend({
        effector: {
          counter: $counter,
        },
        methods: {
          twice() {
            return this.counter * 2
          },
        },
      })

      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        no errors
        "
      `)
    })
    test('should fail typecheck', () => {
      const $name = createStore('effector')

      Vue.extend({
        effector: {
          name: $name,
        },
        methods: {
          twice() {
            return this.name * 2
          },
        },
      })

      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
        "
      `)
    })
  })

  describe('function', () => {
    test('arrow function should pass typecheck', () => {
      const $counter = createStore(1)

      Vue.extend({
        effector: () => $counter,
        methods: {
          twice() {
            return this.state * 2
          },
        },
      })

      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        no errors
        "
      `)
    })

    test('arrow function should fail typecheck', () => {
      const $name = createStore('effector')

      Vue.extend({
        effector: () => $name,
        methods: {
          twice() {
            return this.state * 2
          },
        },
      })

      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
        "
      `)
    })

    test('function should pass typecheck', () => {
      // Typescript type inference don't works as expected
      // https://github.com/microsoft/TypeScript/issues/38623
      const $counter = createStore(1)

      Vue.extend({
        effector() {
          return $counter
        },
        methods: {
          twice() {
            return this.state * 2
          },
        },
      })

      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        'twice' implicitly has return type 'any' because it does not have a return type annotation and is referenced directly or indirectly in one of its return expressions.
        Property 'state' does not exist on type '{ twice(): any; }'.
        "
      `)
    })

    test('function should fail typecheck', () => {
      // Typescript type inference don't works as expected
      // https://github.com/microsoft/TypeScript/issues/38623
      const $name = createStore('effector')

      Vue.extend({
        effector() {
          return $name
        },
        methods: {
          twice() {
            return this.state * 2
          },
        },
      })

      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        'twice' implicitly has return type 'any' because it does not have a return type annotation and is referenced directly or indirectly in one of its return expressions.
        Property 'state' does not exist on type '{ twice(): any; }'.
        "
      `)
    })
  })

  describe('directly', () => {
    test('should pass typecheck', () => {
      const $counter = createStore(1)

      Vue.extend({
        effector: $counter,
        methods: {
          twice() {
            return this.state * 2
          },
        },
      })

      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        no errors
        "
      `)
    })

    test('should fail typecheck', () => {
      const $name = createStore('effector')

      Vue.extend({
        effector: $name,
        methods: {
          twice() {
            return this.state * 2
          },
        },
      })

      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
        "
      `)
    })
  })

  describe('createComponent', () => {
    test('should pass typecheck', () => {
      const $counter = createStore(1)

      createComponent(
        {
          methods: {
            twice() {
              return this.$counter * 2
            },
          },
        },
        {$counter},
      )

      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        no errors
        "
      `)
    })

    test('should fail typecheck', () => {
      const $name = createStore('effector')

      createComponent(
        {
          methods: {
            twice() {
              return this.$name * 2
            },
          },
        },
        {$name},
      )

      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
        "
      `)
    })
  })
})
