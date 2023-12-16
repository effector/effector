/* eslint-disable no-unused-vars */
import {createStore, Store} from 'effector'
import {h, spec, list, using, remap} from 'forest'

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
      no errors
      "
    `)
  })
  test('incorrect value (should fail)', () => {
    const store = createStore<{value: string} | null>(null)
    function run() {
      using(document.body, () => {
        //@ts-expect-error
        h('div', {
          text: store.map(data => data),
        })
      })
    }
    expect(dropInconsistentLine(typecheck)).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        Overload 1 of 2, '(tag: DOMTag, spec: { attr?: PropertyMap | undefined; data?: PropertyMap | undefined; text?: DOMProperty | AttributeStoreInput | (DOMProperty | AttributeStoreInput)[] | undefined; ... 5 more ...; fn?: (() => void) | undefined; }): void', gave the following error.
          Type 'Store<{ value: string; } | null>' is not assignable to type 'DOMProperty | AttributeStoreInput | (DOMProperty | AttributeStoreInput)[] | undefined'.
            Type 'Store<{ value: string; } | null>' is not assignable to type 'AttributeStoreInput'.
              Types of property 'map' are incompatible.
                Type '<T>(fn: (state: { value: string; } | null) => T, config?: { skipVoid?: boolean | undefined; } | undefined) => Store<T>' is not assignable to type '<T>(fn: (state: string | number | boolean | null) => T, config?: { skipVoid?: boolean | undefined; } | undefined) => Store<T>'.
                  Types of parameters 'fn' and 'fn' are incompatible.
                    Types of parameters 'state' and 'state' are incompatible.
                      Type '{ value: string; } | null' is not assignable to type 'string | number | boolean | null'.
                        Type '{ value: string; }' is not assignable to type 'string | number | boolean | null'.
        Overload 2 of 2, '(tag: DOMTag, cb: () => void): void', gave the following error.
          Argument of type '{ text: Store<{ value: string; } | null>; }' is not assignable to parameter of type '() => void'.
            Object literal may only specify known properties, and 'text' does not exist in type '() => void'.
      "
    `)
    function dropInconsistentLine(text: string) {
      return text
        .split(`\n`)
        .filter(line => !line.includes(`to type 'true'`))
        .join(`\n`)
    }
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
      no errors
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
      No overload matches this call.
        Overload 1 of 2, '(tag: DOMTag, spec: { attr?: PropertyMap | undefined; data?: PropertyMap | undefined; text?: DOMProperty | AttributeStoreInput | (DOMProperty | AttributeStoreInput)[] | undefined; ... 5 more ...; fn?: (() => void) | undefined; }): void', gave the following error.
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
        no errors
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
        no errors
        "
      `)
    })
    test('incorrect types (should fail)', () => {
      const shape = createStore({foo: 'ok', bar: 0, baz: null})
      const [foo, bar] = remap(shape, ['foo', 'bar'])
      const foo1: Store<number> = foo
      const foo2: Store<string> = foo
      const bar1: Store<number> = bar
      const bar2: Store<string> = bar
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Type 'Store<string>' is not assignable to type 'Store<number>'.
        Type 'Store<number>' is not assignable to type 'Store<string>'.
          Type 'number' is not assignable to type 'string'.
        "
      `)
    })
  })
})
