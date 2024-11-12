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
        Unmarked error at test line 9 'return this.name * 2'
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
        Unmarked error at test line 7 'return this.state * 2'
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
        no errors
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
        Unmarked error at test line 11 'return this.state * 2'
        The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
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
        Unmarked error at test line 7 'return this.state * 2'
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
        Unmarked error at test line 7 'return this.$name * 2'
        The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
        "
      `)
    })
  })
})
