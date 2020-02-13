/* eslint-disable no-unused-vars */
import {createStore} from 'effector'
import {h, spec, list, using} from 'effector-dom'

const typecheck = '{global}'

describe('text', () => {
  test('should pass', () => {
    const store = createStore<{value: string} | null>(null)
    function run() {
      using(document.body, () => {
        h('div', {
          text: store.map(data => data && data.value),
        })
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors
      "
    `)
  })
  test('should fail', () => {
    const store = createStore<{value: string} | null>(null)
    function run() {
      using(document.body, () => {
        h('div', {
          text: store.map(data => data),
        })
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      No overload matches this call.
        Overload 1 of 2, '(tag: DOMTag, spec: { attr?: PropertyMap | undefined; data?: PropertyMap | undefined; transform?: Partial<TransformMap> | undefined; ... 5 more ...; handler?: Partial<...> | undefined; }): void', gave the following error.
          Type 'Store<{ value: string; } | null>' is not assignable to type 'string | number | boolean | Store<string> | Store<number> | Store<boolean> | Store<null> | Store<string | number> | Store<string | boolean> | ... 10 more ... | undefined'.
            Type 'Store<{ value: string; } | null>' is not assignable to type 'Store<string>'.
              The types returned by 'getState()' are incompatible between these types.
                Type '{ value: string; } | null' is not assignable to type 'string'.
                  Type 'null' is not assignable to type 'string'.
        Overload 2 of 2, '(tag: DOMTag, cb: () => void): void', gave the following error.
          Argument of type '{ text: Store<{ value: string; } | null>; }' is not assignable to parameter of type '() => void'.
            Object literal may only specify known properties, and 'text' does not exist in type '() => void'.
      "
    `)
  })
})

describe('dom tag typecheck', () => {
  test('should pass', () => {
    function run() {
      using(document.body, () => {
        h('div', () => {})
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors
      "
    `)
  })
  test('should fail', () => {
    function run() {
      using(document.body, () => {
        h('damn', () => {})
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
"
--typescript--
No overload matches this call.
  Overload 1 of 2, '(tag: DOMTag, spec: { attr?: PropertyMap | undefined; data?: PropertyMap | undefined; transform?: Partial<TransformMap> | undefined; ... 5 more ...; handler?: Partial<...> | undefined; }): void', gave the following error.
    Argument of type '\\"damn\\"' is not assignable to parameter of type 'DOMTag'.
  Overload 2 of 2, '(tag: DOMTag, cb: () => void): void', gave the following error.
    Argument of type '\\"damn\\"' is not assignable to parameter of type 'DOMTag'.
"
`)
  })
})
