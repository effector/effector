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
      No overload matches this call.
        Overload 1 of 2, '(tag: string, cb: () => void): void', gave the following error.
          Argument of type '{ text: Store<string | null>; }' is not assignable to parameter of type '() => void'.
            Object literal may only specify known properties, and 'text' does not exist in type '() => void'.
        Overload 2 of 2, '(tag: string, spec: { attr?: PropertyMap | undefined; data?: PropertyMap | undefined; transform?: Partial<TransformMap> | undefined; ... 5 more ...; handler?: Partial<...> | undefined; }): void', gave the following error.
          Type 'Store<string | null>' is not assignable to type 'string | number | boolean | Store<DOMProperty> | null | undefined'.
            Type 'Store<string | null>' is not assignable to type 'Store<DOMProperty>'.
              Types of property 'updates' are incompatible.
                Type 'Event<string | null>' is not assignable to type 'Event<DOMProperty>'.
                  Types of parameters 'payload' and 'payload' are incompatible.
                    Type 'DOMProperty' is not assignable to type 'string | null'.
                      Type 'number' is not assignable to type 'string | null'.
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
        Overload 1 of 2, '(tag: string, cb: () => void): void', gave the following error.
          Argument of type '{ text: Store<{ value: string; } | null>; }' is not assignable to parameter of type '() => void'.
            Object literal may only specify known properties, and 'text' does not exist in type '() => void'.
        Overload 2 of 2, '(tag: string, spec: { attr?: PropertyMap | undefined; data?: PropertyMap | undefined; transform?: Partial<TransformMap> | undefined; ... 5 more ...; handler?: Partial<...> | undefined; }): void', gave the following error.
          Type 'Store<{ value: string; } | null>' is not assignable to type 'string | number | boolean | Store<DOMProperty> | null | undefined'.
            Type 'Store<{ value: string; } | null>' is not assignable to type 'Store<DOMProperty>'.
              The types returned by 'getState()' are incompatible between these types.
                Type '{ value: string; } | null' is not assignable to type 'DOMProperty'.
                  Type '{ value: string; }' is not assignable to type 'DOMProperty'.
                    Type '{ value: string; }' is not assignable to type 'true'.
      "
    `)
  })
})
