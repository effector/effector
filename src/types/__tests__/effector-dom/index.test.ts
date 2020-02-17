/* eslint-disable no-unused-vars */
import {createStore, Store} from 'effector'
import {h, spec, list, using, remap} from 'effector-dom'

const typecheck = '{global}'

describe('text', () => {
  test('correct case (should pass)', () => {
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
  test('incorrect value (should fail)', () => {
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
  test('value subtyping (should pass)', () => {
    const store = createStore<'foo' | 'bar'>('foo')
    function run() {
      using(document.body, () => {
        h('div', {
          text: store,
        })
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      No overload matches this call.
        Overload 1 of 2, '(tag: DOMTag, spec: { attr?: PropertyMap | undefined; data?: PropertyMap | undefined; transform?: Partial<TransformMap> | undefined; ... 5 more ...; handler?: Partial<...> | undefined; }): void', gave the following error.
          Type 'Store<\\"foo\\" | \\"bar\\">' is not assignable to type 'string | number | boolean | Store<string> | Store<number> | Store<boolean> | Store<null> | Store<string | number> | Store<string | boolean> | ... 10 more ... | undefined'.
            Type 'Store<\\"foo\\" | \\"bar\\">' is not assignable to type 'Store<string>'.
              Types of property 'updates' are incompatible.
                Type 'Event<\\"foo\\" | \\"bar\\">' is not assignable to type 'Event<string>'.
                  Types of parameters 'payload' and 'payload' are incompatible.
                    Type 'string' is not assignable to type '\\"foo\\" | \\"bar\\"'.
        Overload 2 of 2, '(tag: DOMTag, cb: () => void): void', gave the following error.
          Argument of type '{ text: Store<\\"foo\\" | \\"bar\\">; }' is not assignable to parameter of type '() => void'.
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

describe('remap', () => {
  test('single key', () => {
    const shape = createStore({foo: 'ok', bar: 0, baz: null})
    const foo: Store<string> = remap(shape, 'foo')
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors
      "
    `)
  })
  describe('array of keys', () => {
    test('without "as const" (should pass)', () => {
      const shape = createStore({foo: 'ok', bar: 0, baz: null})
      const [foo, bar]: [Store<string>, Store<number>] = remap(shape, [
        'foo',
        'bar',
      ])
      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        Type 'Store<string | number>[]' is missing the following properties from type '[Store<string>, Store<number>]': 0, 1
        "
      `)
    })
    test('with "as const" (should pass)', () => {
      const shape = createStore({foo: 'ok', bar: 0, baz: null})
      const [foo, bar]: readonly [Store<string>, Store<number>] = remap(shape, [
        'foo',
        'bar',
      ] as const)
      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        no errors
        "
      `)
    })
  })
})
