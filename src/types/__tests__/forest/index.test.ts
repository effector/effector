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
      Unmarked error at test line 6 'text: store.map(data => data),'
      lack of expected error at test line 5 'h('div', {'
      No overload matches this call.
        The last overload gave the following error.
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
      Unmarked error at test line 3 'h('damn', () => {})'
      No overload matches this call.
        The last overload gave the following error.
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
        Unmarked error at test line 3 'const foo1: Store<number> = foo'
        Type 'Store<string>' is not assignable to type 'Store<number>'.
          Type 'string' is not assignable to type 'number'.
        Unmarked error at test line 6 'const bar2: Store<string> = bar'
        Type 'Store<number>' is not assignable to type 'Store<string>'.
          Type 'number' is not assignable to type 'string'.
        "
      `)
    })
  })
})
