/* eslint-disable no-unused-vars */
import {
  createEvent,
  createStore,
  Event,
  guard,
  split,
  attach,
  sample,
} from 'effector'

const consoleError = console.error

beforeAll(() => {
  console.error = (message, ...args) => {
    if (String(message).includes('guard')) return
    consoleError(message, ...args)
  }
})

afterAll(() => {
  console.error = consoleError
})

const typecheck = '{global}'

it('infer type by given predicate (should pass)', () => {
  const event: Event<number | string> = createEvent()
  const {onlyNumbers} = split(event, {
    onlyNumbers: (value): value is number => typeof value === 'number',
  })
  const shouldBeOk: Event<number> = onlyNumbers
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

test('matcher stores / matcher functions (should pass)', () => {
  const source: Event<number | string> = createEvent()
  const firstBool = createStore(true)
  const firstTarget: Event<number | string> = createEvent()
  const secondTarget: Event<number | string> = createEvent()
  const defaultarget: Event<number | string> = createEvent()
  split({
    source,
    match: {
      a: firstBool,
      b: e => true,
    },
    cases: {
      a: firstTarget,
      b: secondTarget,
      __: defaultarget,
    },
  })
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

test('case store (should pass)', () => {
  const source: Event<number> = createEvent()
  const caseStore = createStore<'a' | 'b'>('a')
  const firstTarget: Event<number> = createEvent()
  const secondTarget: Event<number> = createEvent()
  const defaultarget: Event<number> = createEvent()
  split({
    source,
    match: caseStore,
    cases: {
      a: firstTarget,
      b: secondTarget,
      __: defaultarget,
    },
  })
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

test('case store case mismatch (should fail)', () => {
  const source: Event<number> = createEvent()
  const caseStore = createStore<'a' | 'c'>('a')
  const firstTarget: Event<number> = createEvent()
  const secondTarget: Event<number> = createEvent()
  const defaultarget: Event<number> = createEvent()
  split({
    //@ts-expect-error
    source,
    match: caseStore,
    cases: {
      a: firstTarget,
      b: secondTarget,
      __: defaultarget,
    },
  })
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Argument of type '{ source: Event<number>; match: Store<\\"a\\" | \\"c\\">; cases: { a: Event<number>; b: Event<number>; __: Event<number>; }; }' is not assignable to parameter of type '{ error: \\"match unit should contain case names\\"; need: \\"a\\" | \\"b\\"; got: \\"a\\" | \\"c\\"; }'.
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"match unit should contain case names\\"; need: \\"a\\" | \\"b\\"; got: \\"a\\" | \\"c\\"; }'.
    "
  `)
})

test('case function (should pass)', () => {
  const source: Event<number> = createEvent()
  const firstTarget: Event<number> = createEvent()
  const secondTarget: Event<number> = createEvent()
  const defaultarget: Event<number> = createEvent()
  split({
    source,
    match: x => (x > 0 ? 'a' : 'b'),
    cases: {
      a: firstTarget,
      b: secondTarget,
      __: defaultarget,
    },
  })
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

test('case function case mismatch (should fail)', () => {
  const source: Event<number> = createEvent()
  const firstTarget: Event<number> = createEvent()
  const secondTarget: Event<number> = createEvent()
  const defaultarget: Event<number> = createEvent()
  split({
    //@ts-expect-error
    source,
    match: x => (x > 0 ? 'a' : 'c'),
    cases: {
      a: firstTarget,
      b: secondTarget,
      __: defaultarget,
    },
  })
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Argument of type '{ source: Event<number>; match: (x: number) => \\"a\\" | \\"c\\"; cases: { a: Event<number>; b: Event<number>; __: Event<number>; }; }' is not assignable to parameter of type '{ error: \\"match function should return case names\\"; need: \\"a\\" | \\"b\\"; got: \\"a\\" | \\"c\\"; }'.
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"match function should return case names\\"; need: \\"a\\" | \\"b\\"; got: \\"a\\" | \\"c\\"; }'.
    "
  `)
})

test('event with unknown payload in target (should pass)', () => {
  const source = createEvent<string>()
  const target = createEvent<unknown>()

  split({
    source,
    match: {
      test: value => value === 'ok',
    },
    cases: {
      test: target,
    },
  })

  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

test('edge case with target (should pass)', () => {
  const intervalStore = createStore(Date.now())
  const filter = createStore(true)
  const enumType = 3
  const typeStore = createStore(enumType)
  const source = guard({source: intervalStore, filter})
  const caseA = createEvent()
  const caseB = createEvent()

  split({source, match: typeStore, cases: {[enumType]: caseA, __: caseB}})

  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

describe('any to void', () => {
  test('void only (should pass)', () => {
    const source = createEvent<number>()
    const $case = createStore<'a' | 'b'>('a')
    const aVoid = createEvent()
    split({
      source,
      match: $case,
      cases: {
        a: [aVoid],
      },
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('non-void in same case (should pass)', () => {
    const source = createEvent<number>()
    const $case = createStore<'a' | 'b'>('a')
    const aVoid = createEvent()
    const aNonVoid = createEvent<number>()
    split({
      source,
      match: $case,
      cases: {
        a: [aNonVoid, aVoid],
      },
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('incorrect non-void in same case (should fail)', () => {
    const source = createEvent<number>()
    const $case = createStore<'a' | 'b'>('a')
    const aVoid = createEvent()
    const aNonVoid = createEvent<string>()
    split({
      //@ts-expect-error
      source,
      match: $case,
      cases: {
        a: [aNonVoid, aVoid],
      },
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Argument of type '{ source: Event<number>; match: Store<\\"a\\" | \\"b\\">; cases: { a: (Event<void> | Event<string>)[]; }; }' is not assignable to parameter of type '{ error: \\"source type should extends cases\\"; sourceType: number; caseType: string | void; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source type should extends cases\\"; sourceType: number; caseType: string | void; }'.
      "
    `)
  })
  test('non-void in another case (should pass)', () => {
    const source = createEvent<number>()
    const $case = createStore<'a' | 'b'>('a')
    const aVoid = createEvent()
    const bNonVoid = createEvent<number>()
    split({
      source,
      match: $case,
      cases: {
        a: [aVoid],
        b: bNonVoid,
      },
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})

describe('union type in source', () => {
  test('case store (should pass)', () => {
    const source: Event<number | string> = createEvent()
    const $case = createStore<'a' | 'b'>('a')
    const firstTarget: Event<number | string> = createEvent()
    const secondTarget: Event<number | string> = createEvent()
    const defaultarget: Event<number | string> = createEvent()
    split({
      source,
      match: $case,
      cases: {
        a: firstTarget,
        b: secondTarget,
        __: defaultarget,
      },
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('case function (should pass)', () => {
    const source: Event<number | string> = createEvent()
    const firstTarget: Event<number | string> = createEvent()
    const secondTarget: Event<number | string> = createEvent()
    const defaultarget: Event<number | string> = createEvent()
    split({
      source,
      match: (src): 'a' | 'b' => 'a',
      cases: {
        a: firstTarget,
        b: secondTarget,
        __: defaultarget,
      },
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('matcher object (should pass)', () => {
    const source: Event<number | string> = createEvent()
    const firstBool = createStore(true)
    const firstTarget: Event<number | string> = createEvent()
    const secondTarget: Event<number | string> = createEvent()
    const defaultarget: Event<number | string> = createEvent()
    split({
      source,
      match: {
        a: firstBool,
        b: e => true,
      },
      cases: {
        a: firstTarget,
        b: secondTarget,
        __: defaultarget,
      },
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})

describe('matcher function with inference', () => {
  test('basic case (should pass)', () => {
    type A = {tag: 'a'; value: 0}
    type B = {tag: 'b'; value: 'b'}
    const source = createEvent<A | B>()
    const aFull = createEvent<A>()
    const aPart = createEvent<{value: 0}>()
    const b = createEvent<{tag: 'b'}>()
    const c = createEvent<A | B>()
    const defTrigger = createEvent<{tag: 'a'} | B>()
    const $cFlag = createStore(false)
    split({
      source,
      match: {
        a: (src): src is A => src.tag === 'a',
        b: (src): src is B => src.tag === 'b',
        c: $cFlag,
      },
      cases: {
        a: [aFull, aPart],
        b,
        c,
        __: defTrigger,
      },
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('wrong inference (should fail)', () => {
    type A = {tag: 'a'; value: 0}
    type B = {tag: 'b'; value: 'b'}
    const source = createEvent<A | B>()
    const aFull = createEvent<A>()
    const aPart = createEvent<{value: 0}>()
    const c = createEvent<A | B>()
    const defTrigger = createEvent<{tag: 'a'} | B>()
    const $cFlag = createStore(false)
    split({
      //@ts-expect-error
      source,
      match: {
        a: (src): src is B => src.tag === 'b',
        c: $cFlag,
      },
      cases: {
        a: [aFull, aPart],
        c,
        __: defTrigger,
      },
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Argument of type '{ source: Event<A | B>; match: { a: (src: A | B) => src is B; c: Store<boolean>; }; cases: { a: (Event<A> | Event<{ value: 0; }>)[]; c: Event<A | B>; __: Event<...>; }; }' is not assignable to parameter of type '{ error: \\"case should extends type inferred by matcher function\\"; incorrectCases: { a: { caseType: A | { value: 0; }; inferredType: B; }; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"case should extends type inferred by matcher function\\"; incorrectCases: { a: { caseType: A | { value: 0; }; inferredType: B; }; }; }'.
      "
    `)
  })
})
describe('clock cases', () => {
  describe('source + clock', () => {
    test('unit clock (should pass)', () => {
      const clock = createEvent<number>()
      const source = createEvent<{foo: 1}>()
      const $case = createStore<'a' | 'b'>('a')
      const a = createEvent<{foo: 1}>()
      const b = createEvent<{foo: 1}>()
      split({
        clock,
        source,
        match: $case,
        cases: {
          a: [a],
          b: [b],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('array clock (should pass)', () => {
      const clockA = createEvent<number>()
      const clockB = createEvent<string>()
      const source = createEvent<{foo: 1}>()
      const $case = createStore<'a' | 'b'>('a')
      const a = createEvent<{foo: 1}>()
      const b = createEvent<{foo: 1}>()
      split({
        clock: [clockA, clockB],
        source,
        match: $case,
        cases: {
          a: [a],
          b: [b],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
  })
})
describe('array cases', () => {
  describe('case store', () => {
    /** type: source == cases, arrays only */

    test('case name: match == cases, type: source == cases, arrays only (should pass)', () => {
      const source = createEvent<{foo: 1}>()
      const $case = createStore<'a' | 'b'>('a')
      const a = createEvent<{foo: 1}>()
      const b = createEvent<{foo: 1}>()
      split({
        source,
        match: $case,
        cases: {
          a: [a],
          b: [b],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('case name: match > cases, type: source == cases, arrays only (should pass)', () => {
      const source = createEvent<{foo: 1}>()
      const $case = createStore<'a' | 'b'>('a')
      const a = createEvent<{foo: 1}>()
      split({
        source,
        match: $case,
        cases: {
          a: [a],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('case name: match < cases, type: source == cases, arrays only (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const $case = createStore<'a'>('a')
      const a = createEvent<{foo: 1}>()
      const b = createEvent<{foo: 1}>()
      split({
        //@ts-expect-error
        source,
        match: $case,
        cases: {
          a: [a],
          b: [b],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; }>; match: Store<\\"a\\">; cases: { a: Event<{ foo: 1; }>[]; b: Event<{ foo: 1; }>[]; }; }' is not assignable to parameter of type '{ error: \\"match unit should contain case names\\"; need: \\"a\\" | \\"b\\"; got: \\"a\\"; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"match unit should contain case names\\"; need: \\"a\\" | \\"b\\"; got: \\"a\\"; }'.
        "
      `)
    })

    /** type: source == cases, array case + unit case */

    test('case name: match == cases, type: source == cases, array case + unit case (should pass)', () => {
      const source = createEvent<{foo: 1}>()
      const $case = createStore<'a' | 'b'>('a')
      const a = createEvent<{foo: 1}>()
      const b = createEvent<{foo: 1}>()
      split({
        source,
        match: $case,
        cases: {
          a: [a],
          b,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('case name: match > cases, type: source == cases, array case + unit case (should pass)', () => {
      const source = createEvent<{foo: 1}>()
      const $case = createStore<'a' | 'b' | 'c'>('a')
      const a = createEvent<{foo: 1}>()
      const b = createEvent<{foo: 1}>()
      split({
        source,
        match: $case,
        cases: {
          a: [a],
          b,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('case name: match < cases, type: source == cases, array case + unit case (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const $case = createStore<'a' | 'b'>('a')
      const a = createEvent<{foo: 1}>()
      const b = createEvent<{foo: 1}>()
      const c = createEvent<{foo: 1}>()
      split({
        //@ts-expect-error
        source,
        match: $case,
        cases: {
          a: [a],
          b,
          c,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; }>; match: Store<\\"a\\" | \\"b\\">; cases: { a: Event<{ foo: 1; }>[]; b: Event<{ foo: 1; }>; c: Event<{ foo: 1; }>; }; }' is not assignable to parameter of type '{ error: \\"match unit should contain case names\\"; need: \\"a\\" | \\"b\\" | \\"c\\"; got: \\"a\\" | \\"b\\"; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"match unit should contain case names\\"; need: \\"a\\" | \\"b\\" | \\"c\\"; got: \\"a\\" | \\"b\\"; }'.
        "
      `)
    })

    /** type: source > cases, arrays only */

    test('case name: match == cases, type: source > cases, arrays only (should pass)', () => {
      const source = createEvent<{foo: 1; bar: number}>()
      const $case = createStore<'a' | 'b'>('a')
      const a = createEvent<{foo: 1}>()
      const b = createEvent<{foo: 1}>()
      split({
        source,
        match: $case,
        cases: {
          a: [a],
          b: [b],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('case name: match > cases, type: source > cases, arrays only (should pass)', () => {
      const source = createEvent<{foo: 1; bar: number}>()
      const $case = createStore<'a' | 'b'>('a')
      const a = createEvent<{foo: 1}>()
      split({
        source,
        match: $case,
        cases: {
          a: [a],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('case name: match < cases, type: source > cases, arrays only (should fail)', () => {
      const source = createEvent<{foo: 1; bar: number}>()
      const $case = createStore<'a'>('a')
      const a = createEvent<{foo: 1}>()
      const b = createEvent<{foo: 1}>()
      split({
        //@ts-expect-error
        source,
        match: $case,
        cases: {
          a: [a],
          b: [b],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; bar: number; }>; match: Store<\\"a\\">; cases: { a: Event<{ foo: 1; }>[]; b: Event<{ foo: 1; }>[]; }; }' is not assignable to parameter of type '{ error: \\"match unit should contain case names\\"; need: \\"a\\" | \\"b\\"; got: \\"a\\"; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"match unit should contain case names\\"; need: \\"a\\" | \\"b\\"; got: \\"a\\"; }'.
        "
      `)
    })

    /** type: source > cases, array case + unit case */

    test('case name: match == cases, type: source > cases, array case + unit case (should pass)', () => {
      const source = createEvent<{foo: 1; bar: number}>()
      const $case = createStore<'a' | 'b'>('a')
      const a = createEvent<{foo: 1}>()
      const b = createEvent<{foo: 1}>()
      split({
        source,
        match: $case,
        cases: {
          a: [a],
          b,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('case name: match > cases, type: source > cases, array case + unit case (should pass)', () => {
      const source = createEvent<{foo: 1; bar: number}>()
      const $case = createStore<'a' | 'b' | 'c'>('a')
      const a = createEvent<{foo: 1}>()
      const b = createEvent<{foo: 1}>()
      split({
        source,
        match: $case,
        cases: {
          a: [a],
          b,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('case name: match < cases, type: source > cases, array case + unit case (should fail)', () => {
      const source = createEvent<{foo: 1; bar: number}>()
      const $case = createStore<'a' | 'b'>('a')
      const a = createEvent<{foo: 1}>()
      const b = createEvent<{foo: 1}>()
      const c = createEvent<{foo: 1}>()
      split({
        //@ts-expect-error
        source,
        match: $case,
        cases: {
          a: [a],
          b,
          c,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; bar: number; }>; match: Store<\\"a\\" | \\"b\\">; cases: { a: Event<{ foo: 1; }>[]; b: Event<{ foo: 1; }>; c: Event<{ foo: 1; }>; }; }' is not assignable to parameter of type '{ error: \\"match unit should contain case names\\"; need: \\"a\\" | \\"b\\" | \\"c\\"; got: \\"a\\" | \\"b\\"; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"match unit should contain case names\\"; need: \\"a\\" | \\"b\\" | \\"c\\"; got: \\"a\\" | \\"b\\"; }'.
        "
      `)
    })

    /** type: source < cases, arrays only */

    test('case name: match == cases, type: source < cases, arrays only (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const $case = createStore<'a' | 'b'>('a')
      const a = createEvent<{foo: 1; bar: number}>()
      const b = createEvent<{foo: 1; bar: string}>()
      split({
        //@ts-expect-error
        source,
        match: $case,
        cases: {
          a: [a],
          b: [b],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; }>; match: Store<\\"a\\" | \\"b\\">; cases: { a: Event<{ foo: 1; bar: number; }>[]; b: Event<{ foo: 1; bar: string; }>[]; }; }' is not assignable to parameter of type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 1; bar: number; } | { foo: 1; bar: string; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 1; bar: number; } | { foo: 1; bar: string; }; }'.
        "
      `)
    })
    test('case name: match > cases, type: source < cases, arrays only (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const $case = createStore<'a' | 'b'>('a')
      const a = createEvent<{foo: 1; bar: number}>()
      split({
        //@ts-expect-error
        source,
        match: $case,
        cases: {
          a: [a],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; }>; match: Store<\\"a\\" | \\"b\\">; cases: { a: Event<{ foo: 1; bar: number; }>[]; }; }' is not assignable to parameter of type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 1; bar: number; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 1; bar: number; }; }'.
        "
      `)
    })
    test('case name: match < cases, type: source < cases, arrays only (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const $case = createStore<'a'>('a')
      const a = createEvent<{foo: 1; bar: number}>()
      const b = createEvent<{foo: 1; bar: string}>()
      split({
        //@ts-expect-error
        source,
        match: $case,
        cases: {
          a: [a],
          b: [b],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; }>; match: Store<\\"a\\">; cases: { a: Event<{ foo: 1; bar: number; }>[]; b: Event<{ foo: 1; bar: string; }>[]; }; }' is not assignable to parameter of type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 1; bar: number; } | { foo: 1; bar: string; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 1; bar: number; } | { foo: 1; bar: string; }; }'.
        "
      `)
    })

    /** type: source < cases, array case + unit case */

    test('case name: match == cases, type: source < cases, array case + unit case (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const $case = createStore<'a' | 'b'>('a')
      const a = createEvent<{foo: 1; bar: number}>()
      const b = createEvent<{foo: 1; bar: string}>()
      split({
        //@ts-expect-error
        source,
        match: $case,
        cases: {
          a: [a],
          b,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; }>; match: Store<\\"a\\" | \\"b\\">; cases: { a: Event<{ foo: 1; bar: number; }>[]; b: Event<{ foo: 1; bar: string; }>; }; }' is not assignable to parameter of type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 1; bar: number; } | { foo: 1; bar: string; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 1; bar: number; } | { foo: 1; bar: string; }; }'.
        "
      `)
    })
    test('case name: match > cases, type: source < cases, array case + unit case (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const $case = createStore<'a' | 'b' | 'c'>('a')
      const a = createEvent<{foo: 1; bar: number}>()
      const b = createEvent<{foo: 1; bar: string}>()
      split({
        //@ts-expect-error
        source,
        match: $case,
        cases: {
          a: [a],
          b,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; }>; match: Store<\\"a\\" | \\"b\\" | \\"c\\">; cases: { a: Event<{ foo: 1; bar: number; }>[]; b: Event<{ foo: 1; bar: string; }>; }; }' is not assignable to parameter of type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 1; bar: number; } | { foo: 1; bar: string; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 1; bar: number; } | { foo: 1; bar: string; }; }'.
        "
      `)
    })
    test('case name: match < cases, type: source < cases, array case + unit case (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const $case = createStore<'a' | 'b'>('a')
      const a = createEvent<{foo: 1; bar: number}>()
      const b = createEvent<{foo: 1; bar: string}>()
      const c = createEvent<{foo: 1}>()
      split({
        //@ts-expect-error
        source,
        match: $case,
        cases: {
          a: [a],
          b,
          c,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; }>; match: Store<\\"a\\" | \\"b\\">; cases: { a: Event<{ foo: 1; bar: number; }>[]; b: Event<{ foo: 1; bar: string; }>; c: Event<{ foo: 1; }>; }; }' is not assignable to parameter of type '{ error: \\"match unit should contain case names\\"; need: \\"a\\" | \\"b\\" | \\"c\\"; got: \\"a\\" | \\"b\\"; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"match unit should contain case names\\"; need: \\"a\\" | \\"b\\" | \\"c\\"; got: \\"a\\" | \\"b\\"; }'.
        "
      `)
    })

    /** type: source != cases, arrays only */

    test('case name: match == cases, type: source != cases, arrays only (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const $case = createStore<'a' | 'b'>('a')
      const a = createEvent<{foo: 2}>()
      const b = createEvent<{foo: 2}>()
      split({
        //@ts-expect-error
        source,
        match: $case,
        cases: {
          a: [a],
          b: [b],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; }>; match: Store<\\"a\\" | \\"b\\">; cases: { a: Event<{ foo: 2; }>[]; b: Event<{ foo: 2; }>[]; }; }' is not assignable to parameter of type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 2; } | { foo: 2; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 2; } | { foo: 2; }; }'.
        "
      `)
    })
    test('case name: match > cases, type: source != cases, arrays only (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const $case = createStore<'a' | 'b'>('a')
      const a = createEvent<{foo: 2}>()
      split({
        //@ts-expect-error
        source,
        match: $case,
        cases: {
          a: [a],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; }>; match: Store<\\"a\\" | \\"b\\">; cases: { a: Event<{ foo: 2; }>[]; }; }' is not assignable to parameter of type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 2; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 2; }; }'.
        "
      `)
    })
    test('case name: match < cases, type: source != cases, arrays only (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const $case = createStore<'a'>('a')
      const a = createEvent<{foo: 2}>()
      const b = createEvent<{foo: 2}>()
      split({
        //@ts-expect-error
        source,
        match: $case,
        cases: {
          a: [a],
          b: [b],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; }>; match: Store<\\"a\\">; cases: { a: Event<{ foo: 2; }>[]; b: Event<{ foo: 2; }>[]; }; }' is not assignable to parameter of type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 2; } | { foo: 2; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 2; } | { foo: 2; }; }'.
        "
      `)
    })

    /** type: source != cases, array case + unit case */

    test('case name: match == cases, type: source != cases, array case + unit case (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const $case = createStore<'a' | 'b'>('a')
      const a = createEvent<{foo: 2}>()
      const b = createEvent<{foo: 2}>()
      split({
        //@ts-expect-error
        source,
        match: $case,
        cases: {
          a: [a],
          b,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; }>; match: Store<\\"a\\" | \\"b\\">; cases: { a: Event<{ foo: 2; }>[]; b: Event<{ foo: 2; }>; }; }' is not assignable to parameter of type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 2; } | { foo: 2; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 2; } | { foo: 2; }; }'.
        "
      `)
    })
    test('case name: match > cases, type: source != cases, array case + unit case (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const $case = createStore<'a' | 'b' | 'c'>('a')
      const a = createEvent<{foo: 2}>()
      const b = createEvent<{foo: 2}>()
      split({
        //@ts-expect-error
        source,
        match: $case,
        cases: {
          a: [a],
          b,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; }>; match: Store<\\"a\\" | \\"b\\" | \\"c\\">; cases: { a: Event<{ foo: 2; }>[]; b: Event<{ foo: 2; }>; }; }' is not assignable to parameter of type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 2; } | { foo: 2; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 2; } | { foo: 2; }; }'.
        "
      `)
    })
    test('case name: match < cases, type: source != cases, array case + unit case (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const $case = createStore<'a' | 'b'>('a')
      const a = createEvent<{foo: 2}>()
      const b = createEvent<{foo: 2}>()
      const c = createEvent<{foo: 2}>()
      split({
        //@ts-expect-error
        source,
        match: $case,
        cases: {
          a: [a],
          b,
          c,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; }>; match: Store<\\"a\\" | \\"b\\">; cases: { a: Event<{ foo: 2; }>[]; b: Event<{ foo: 2; }>; c: Event<{ foo: 2; }>; }; }' is not assignable to parameter of type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 2; } | { foo: 2; } | { foo: 2; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 2; } | { foo: 2; } | { foo: 2; }; }'.
        "
      `)
    })
  })
  describe('case function', () => {
    /** type: source == cases, arrays only */

    test('case name: match == cases, type: source == cases, arrays only (should pass)', () => {
      const source = createEvent<{foo: 1}>()
      const a = createEvent<{foo: 1}>()
      const b = createEvent<{foo: 1}>()
      split({
        source,
        match: (src): 'a' | 'b' => 'a',
        cases: {
          a: [a],
          b: [b],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('case name: match > cases, type: source == cases, arrays only (should pass)', () => {
      const source = createEvent<{foo: 1}>()
      const a = createEvent<{foo: 1}>()
      split({
        source,
        match: (src): 'a' | 'b' => 'a',
        cases: {
          a: [a],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('case name: match < cases, type: source == cases, arrays only (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const a = createEvent<{foo: 1}>()
      const b = createEvent<{foo: 1}>()
      split({
        //@ts-expect-error
        source,
        match: (src): 'a' => 'a',
        cases: {
          a: [a],
          b: [b],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; }>; match: (src: { foo: 1; }) => \\"a\\"; cases: { a: Event<{ foo: 1; }>[]; b: Event<{ foo: 1; }>[]; }; }' is not assignable to parameter of type '{ error: \\"match function should return case names\\"; need: \\"a\\" | \\"b\\"; got: \\"a\\"; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"match function should return case names\\"; need: \\"a\\" | \\"b\\"; got: \\"a\\"; }'.
        "
      `)
    })

    /** type: source == cases, array case + unit case */

    test('case name: match == cases, type: source == cases, array case + unit case (should pass)', () => {
      const source = createEvent<{foo: 1}>()
      const a = createEvent<{foo: 1}>()
      const b = createEvent<{foo: 1}>()
      split({
        source,
        match: (src): 'a' | 'b' => 'a',
        cases: {
          a: [a],
          b,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('case name: match > cases, type: source == cases, array case + unit case (should pass)', () => {
      const source = createEvent<{foo: 1}>()
      const a = createEvent<{foo: 1}>()
      const b = createEvent<{foo: 1}>()
      split({
        source,
        match: (src): 'a' | 'b' | 'c' => 'a',
        cases: {
          a: [a],
          b,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('case name: match < cases, type: source == cases, array case + unit case (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const a = createEvent<{foo: 1}>()
      const b = createEvent<{foo: 1}>()
      const c = createEvent<{foo: 1}>()
      split({
        //@ts-expect-error
        source,
        match: (src): 'a' | 'b' => 'a',
        cases: {
          a: [a],
          b,
          c,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; }>; match: (src: { foo: 1; }) => \\"a\\" | \\"b\\"; cases: { a: Event<{ foo: 1; }>[]; b: Event<{ foo: 1; }>; c: Event<{ foo: 1; }>; }; }' is not assignable to parameter of type '{ error: \\"match function should return case names\\"; need: \\"a\\" | \\"b\\" | \\"c\\"; got: \\"a\\" | \\"b\\"; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"match function should return case names\\"; need: \\"a\\" | \\"b\\" | \\"c\\"; got: \\"a\\" | \\"b\\"; }'.
        "
      `)
    })

    /** type: source > cases, arrays only */

    test('case name: match == cases, type: source > cases, arrays only (should pass)', () => {
      const source = createEvent<{foo: 1; bar: number}>()
      const a = createEvent<{foo: 1}>()
      const b = createEvent<{foo: 1}>()
      split({
        source,
        match: (src): 'a' | 'b' => (src.bar > 0 ? 'a' : 'b'),
        cases: {
          a: [a],
          b: [b],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('case name: match > cases, type: source > cases, arrays only (should pass)', () => {
      const source = createEvent<{foo: 1; bar: number}>()
      const a = createEvent<{foo: 1}>()
      split({
        source,
        match: (src): 'a' | 'b' => 'a',
        cases: {
          a: [a],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('case name: match < cases, type: source > cases, arrays only (should fail)', () => {
      const source = createEvent<{foo: 1; bar: number}>()
      const a = createEvent<{foo: 1}>()
      const b = createEvent<{foo: 1}>()
      split({
        //@ts-expect-error
        source,
        match: (src): 'a' => 'a',
        cases: {
          a: [a],
          b: [b],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; bar: number; }>; match: (src: { foo: 1; bar: number; }) => \\"a\\"; cases: { a: Event<{ foo: 1; }>[]; b: Event<{ foo: 1; }>[]; }; }' is not assignable to parameter of type '{ error: \\"match function should return case names\\"; need: \\"a\\" | \\"b\\"; got: \\"a\\"; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"match function should return case names\\"; need: \\"a\\" | \\"b\\"; got: \\"a\\"; }'.
        "
      `)
    })

    /** type: source > cases, array case + unit case */

    test('case name: match == cases, type: source > cases, array case + unit case (should pass)', () => {
      const source = createEvent<{foo: 1; bar: number}>()
      const a = createEvent<{foo: 1}>()
      const b = createEvent<{foo: 1}>()
      split({
        source,
        match: (src): 'a' | 'b' => 'a',
        cases: {
          a: [a],
          b,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('case name: match > cases, type: source > cases, array case + unit case (should pass)', () => {
      const source = createEvent<{foo: 1; bar: number}>()
      const a = createEvent<{foo: 1}>()
      const b = createEvent<{foo: 1}>()
      split({
        source,
        match: (src): 'a' | 'b' | 'c' => 'a',
        cases: {
          a: [a],
          b,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('case name: match < cases, type: source > cases, array case + unit case (should fail)', () => {
      const source = createEvent<{foo: 1; bar: number}>()
      const a = createEvent<{foo: 1}>()
      const b = createEvent<{foo: 1}>()
      const c = createEvent<{foo: 1}>()
      split({
        //@ts-expect-error
        source,
        match: (src): 'a' | 'b' => 'a',
        cases: {
          a: [a],
          b,
          c,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; bar: number; }>; match: (src: { foo: 1; bar: number; }) => \\"a\\" | \\"b\\"; cases: { a: Event<{ foo: 1; }>[]; b: Event<{ foo: 1; }>; c: Event<{ foo: 1; }>; }; }' is not assignable to parameter of type '{ error: \\"match function should return case names\\"; need: \\"a\\" | \\"b\\" | \\"c\\"; got: \\"a\\" | \\"b\\"; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"match function should return case names\\"; need: \\"a\\" | \\"b\\" | \\"c\\"; got: \\"a\\" | \\"b\\"; }'.
        "
      `)
    })

    /** type: source < cases, arrays only */

    test('case name: match == cases, type: source < cases, arrays only (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const a = createEvent<{foo: 1; bar: number}>()
      const b = createEvent<{foo: 1; bar: string}>()
      split({
        //@ts-expect-error
        source,
        //@ts-expect-error src is any
        match: (src): 'a' | 'b' => 'a',
        cases: {
          a: [a],
          b: [b],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; }>; match: (src: any) => \\"a\\" | \\"b\\"; cases: { a: Event<{ foo: 1; bar: number; }>[]; b: Event<{ foo: 1; bar: string; }>[]; }; }' is not assignable to parameter of type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 1; bar: number; } | { foo: 1; bar: string; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 1; bar: number; } | { foo: 1; bar: string; }; }'.
        Parameter 'src' implicitly has an 'any' type.
        "
      `)
    })
    test('case name: match > cases, type: source < cases, arrays only (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const a = createEvent<{foo: 1; bar: number}>()
      split({
        //@ts-expect-error
        source,
        //@ts-expect-error src is any
        match: (src): 'a' | 'b' => 'a',
        cases: {
          a: [a],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; }>; match: (src: any) => \\"a\\" | \\"b\\"; cases: { a: Event<{ foo: 1; bar: number; }>[]; }; }' is not assignable to parameter of type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 1; bar: number; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 1; bar: number; }; }'.
        Parameter 'src' implicitly has an 'any' type.
        "
      `)
    })
    test('case name: match < cases, type: source < cases, arrays only (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const a = createEvent<{foo: 1; bar: number}>()
      const b = createEvent<{foo: 1; bar: string}>()
      split({
        //@ts-expect-error
        source,
        //@ts-expect-error src is any
        match: (src): 'a' => 'a',
        cases: {
          a: [a],
          b: [b],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; }>; match: (src: any) => \\"a\\"; cases: { a: Event<{ foo: 1; bar: number; }>[]; b: Event<{ foo: 1; bar: string; }>[]; }; }' is not assignable to parameter of type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 1; bar: number; } | { foo: 1; bar: string; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 1; bar: number; } | { foo: 1; bar: string; }; }'.
        Parameter 'src' implicitly has an 'any' type.
        "
      `)
    })

    test('source doesnt satisfy cases but match do it (should fail)', () => {
      const source = sample({
        clock: createEvent<number | null>(),
        source: createStore<number | null>(1),
        fn: ($value, evtPayload) => ({a: $value, b: evtPayload}),
      })
      const cases = {
        write: createEvent<{a: number; b: number}>(),
      }

      split({
        //@ts-expect-error
        source,
        match: {
          //@ts-expect-error src is any
          write: src => src.a !== null && src.b !== null,
        },
        cases,
      })

      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ a: number | null; b: number | null; }>; match: { write: (src: any) => boolean; }; cases: { write: Event<{ a: number; b: number; }>; }; }' is not assignable to parameter of type '{ error: \\"source type should extends cases\\"; sourceType: { a: number | null; b: number | null; }; caseType: { a: number; b: number; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source type should extends cases\\"; sourceType: { a: number | null; b: number | null; }; caseType: { a: number; b: number; }; }'.
        Parameter 'src' implicitly has an 'any' type.
        "
      `)
    })

    /** type: source < cases, array case + unit case */

    test('case name: match == cases, type: source < cases, array case + unit case (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const a = createEvent<{foo: 1; bar: number}>()
      const b = createEvent<{foo: 1; bar: string}>()
      split({
        //@ts-expect-error
        source,
        //@ts-expect-error src is any
        match: (src): 'a' | 'b' => 'a',
        cases: {
          a: [a],
          b,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; }>; match: (src: any) => \\"a\\" | \\"b\\"; cases: { a: Event<{ foo: 1; bar: number; }>[]; b: Event<{ foo: 1; bar: string; }>; }; }' is not assignable to parameter of type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 1; bar: number; } | { foo: 1; bar: string; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 1; bar: number; } | { foo: 1; bar: string; }; }'.
        Parameter 'src' implicitly has an 'any' type.
        "
      `)
    })
    test('case name: match > cases, type: source < cases, array case + unit case (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const a = createEvent<{foo: 1; bar: number}>()
      const b = createEvent<{foo: 1; bar: string}>()
      split({
        //@ts-expect-error
        source,
        //@ts-expect-error src is any
        match: (src): 'a' | 'b' | 'c' => 'a',
        cases: {
          a: [a],
          b,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; }>; match: (src: any) => \\"a\\" | \\"b\\" | \\"c\\"; cases: { a: Event<{ foo: 1; bar: number; }>[]; b: Event<{ foo: 1; bar: string; }>; }; }' is not assignable to parameter of type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 1; bar: number; } | { foo: 1; bar: string; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 1; bar: number; } | { foo: 1; bar: string; }; }'.
        Parameter 'src' implicitly has an 'any' type.
        "
      `)
    })
    test('case name: match < cases, type: source < cases, array case + unit case (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const a = createEvent<{foo: 1; bar: number}>()
      const b = createEvent<{foo: 1; bar: string}>()
      const c = createEvent<{foo: 1}>()
      split({
        //@ts-expect-error
        source,
        match: (src): 'a' | 'b' => 'a',
        cases: {
          a: [a],
          b,
          c,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; }>; match: (src: { foo: 1; }) => \\"a\\" | \\"b\\"; cases: { a: Event<{ foo: 1; bar: number; }>[]; b: Event<{ foo: 1; bar: string; }>; c: Event<{ foo: 1; }>; }; }' is not assignable to parameter of type '{ error: \\"match function should return case names\\"; need: \\"a\\" | \\"b\\" | \\"c\\"; got: \\"a\\" | \\"b\\"; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"match function should return case names\\"; need: \\"a\\" | \\"b\\" | \\"c\\"; got: \\"a\\" | \\"b\\"; }'.
        "
      `)
    })

    /** type: source != cases, arrays only */

    test('case name: match == cases, type: source != cases, arrays only (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const a = createEvent<{foo: 2}>()
      const b = createEvent<{foo: 2}>()
      split({
        //@ts-expect-error
        source,
        //@ts-expect-error src is any
        match: (src): 'a' | 'b' => 'a',
        cases: {
          a: [a],
          b: [b],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; }>; match: (src: any) => \\"a\\" | \\"b\\"; cases: { a: Event<{ foo: 2; }>[]; b: Event<{ foo: 2; }>[]; }; }' is not assignable to parameter of type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 2; } | { foo: 2; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 2; } | { foo: 2; }; }'.
        Parameter 'src' implicitly has an 'any' type.
        "
      `)
    })
    test('case name: match > cases, type: source != cases, arrays only (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const a = createEvent<{foo: 2}>()
      split({
        //@ts-expect-error
        source,
        //@ts-expect-error src is any
        match: (src): 'a' | 'b' => 'a',
        cases: {
          a: [a],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; }>; match: (src: any) => \\"a\\" | \\"b\\"; cases: { a: Event<{ foo: 2; }>[]; }; }' is not assignable to parameter of type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 2; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 2; }; }'.
        Parameter 'src' implicitly has an 'any' type.
        "
      `)
    })
    test('case name: match < cases, type: source != cases, arrays only (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const a = createEvent<{foo: 2}>()
      const b = createEvent<{foo: 2}>()
      split({
        //@ts-expect-error
        source,
        //@ts-expect-error src is any
        match: (src): 'a' => 'a',
        cases: {
          a: [a],
          b: [b],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; }>; match: (src: any) => \\"a\\"; cases: { a: Event<{ foo: 2; }>[]; b: Event<{ foo: 2; }>[]; }; }' is not assignable to parameter of type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 2; } | { foo: 2; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 2; } | { foo: 2; }; }'.
        Parameter 'src' implicitly has an 'any' type.
        "
      `)
    })

    /** type: source != cases, array case + unit case */

    test('case name: match == cases, type: source != cases, array case + unit case (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const a = createEvent<{foo: 2}>()
      const b = createEvent<{foo: 2}>()
      split({
        //@ts-expect-error
        source,
        //@ts-expect-error src is any
        match: (src): 'a' | 'b' => 'a',
        cases: {
          a: [a],
          b,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; }>; match: (src: any) => \\"a\\" | \\"b\\"; cases: { a: Event<{ foo: 2; }>[]; b: Event<{ foo: 2; }>; }; }' is not assignable to parameter of type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 2; } | { foo: 2; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 2; } | { foo: 2; }; }'.
        Parameter 'src' implicitly has an 'any' type.
        "
      `)
    })
    test('case name: match > cases, type: source != cases, array case + unit case (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const a = createEvent<{foo: 2}>()
      const b = createEvent<{foo: 2}>()
      split({
        //@ts-expect-error
        source,
        //@ts-expect-error src is any
        match: (src): 'a' | 'b' | 'c' => 'a',
        cases: {
          a: [a],
          b,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; }>; match: (src: any) => \\"a\\" | \\"b\\" | \\"c\\"; cases: { a: Event<{ foo: 2; }>[]; b: Event<{ foo: 2; }>; }; }' is not assignable to parameter of type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 2; } | { foo: 2; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 2; } | { foo: 2; }; }'.
        Parameter 'src' implicitly has an 'any' type.
        "
      `)
    })
    test('case name: match < cases, type: source != cases, array case + unit case (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const a = createEvent<{foo: 2}>()
      const b = createEvent<{foo: 2}>()
      const c = createEvent<{foo: 2}>()
      split({
        //@ts-expect-error
        source,
        //@ts-expect-error src is any
        match: (src): 'a' | 'b' => 'a',
        cases: {
          a: [a],
          b,
          c,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; }>; match: (src: any) => \\"a\\" | \\"b\\"; cases: { a: Event<{ foo: 2; }>[]; b: Event<{ foo: 2; }>; c: Event<{ foo: 2; }>; }; }' is not assignable to parameter of type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 2; } | { foo: 2; } | { foo: 2; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 2; } | { foo: 2; } | { foo: 2; }; }'.
        Parameter 'src' implicitly has an 'any' type.
        "
      `)
    })
  })
  describe('matcher function', () => {
    /** type: source == cases, arrays only */

    test('case name: match == cases, type: source == cases, arrays only (should pass)', () => {
      const source = createEvent<{foo: 1}>()
      const a = createEvent<{foo: 1}>()
      const b = createEvent<{foo: 1}>()
      split({
        source,
        match: {
          a: src => true,
          b: src => true,
        },
        cases: {
          a: [a],
          b: [b],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('case name: match > cases, type: source == cases, arrays only (should pass)', () => {
      const source = createEvent<{foo: 1}>()
      const a = createEvent<{foo: 1}>()
      split({
        source,
        match: {
          a: src => true,
          b: src => true,
        },
        cases: {
          a: [a],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('case name: match < cases, type: source == cases, arrays only (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const a = createEvent<{foo: 1}>()
      const b = createEvent<{foo: 1}>()
      split({
        //@ts-expect-error
        source,
        match: {
          a: src => true,
        },
        cases: {
          a: [a],
          b: [b],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; }>; match: { a: (src: { foo: 1; }) => true; }; cases: { a: Event<{ foo: 1; }>[]; b: Event<{ foo: 1; }>[]; }; }' is not assignable to parameter of type '{ error: \\"match object should contain case names\\"; need: \\"a\\" | \\"b\\"; got: \\"a\\"; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"match object should contain case names\\"; need: \\"a\\" | \\"b\\"; got: \\"a\\"; }'.
        "
      `)
    })

    /** type: source == cases, array case + unit case */

    test('case name: match == cases, type: source == cases, array case + unit case (should pass)', () => {
      const source = createEvent<{foo: 1}>()
      const a = createEvent<{foo: 1}>()
      const b = createEvent<{foo: 1}>()
      split({
        source,
        match: {
          a: src => true,
          b: src => true,
        },
        cases: {
          a: [a],
          b,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('case name: match > cases, type: source == cases, array case + unit case (should pass)', () => {
      const source = createEvent<{foo: 1}>()
      const a = createEvent<{foo: 1}>()
      const b = createEvent<{foo: 1}>()
      split({
        source,
        match: {
          a: src => true,
          b: src => true,
          c: src => true,
        },
        cases: {
          a: [a],
          b,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('case name: match < cases, type: source == cases, array case + unit case (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const a = createEvent<{foo: 1}>()
      const b = createEvent<{foo: 1}>()
      const c = createEvent<{foo: 1}>()
      split({
        //@ts-expect-error
        source,
        match: {
          a: src => true,
          b: src => true,
        },
        cases: {
          a: [a],
          b,
          c,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; }>; match: { a: (src: { foo: 1; }) => true; b: (src: { foo: 1; }) => true; }; cases: { a: Event<{ foo: 1; }>[]; b: Event<{ foo: 1; }>; c: Event<{ foo: 1; }>; }; }' is not assignable to parameter of type '{ error: \\"match object should contain case names\\"; need: \\"a\\" | \\"b\\" | \\"c\\"; got: \\"a\\" | \\"b\\"; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"match object should contain case names\\"; need: \\"a\\" | \\"b\\" | \\"c\\"; got: \\"a\\" | \\"b\\"; }'.
        "
      `)
    })

    /** type: source > cases, arrays only */

    test('case name: match == cases, type: source > cases, arrays only (should pass)', () => {
      const source = createEvent<{foo: 1; bar: number}>()
      const a = createEvent<{foo: 1}>()
      const b = createEvent<{foo: 1}>()
      split({
        source,
        match: {
          a: src => true,
          b: src => true,
        },
        cases: {
          a: [a],
          b: [b],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('case name: match > cases, type: source > cases, arrays only (should pass)', () => {
      const source = createEvent<{foo: 1; bar: number}>()
      const a = createEvent<{foo: 1}>()
      split({
        source,
        match: {
          a: src => true,
          b: src => true,
        },
        cases: {
          a: [a],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('case name: match < cases, type: source > cases, arrays only (should fail)', () => {
      const source = createEvent<{foo: 1; bar: number}>()
      const a = createEvent<{foo: 1}>()
      const b = createEvent<{foo: 1}>()
      split({
        //@ts-expect-error
        source,
        match: {
          a: src => true,
        },
        cases: {
          a: [a],
          b: [b],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; bar: number; }>; match: { a: (src: { foo: 1; bar: number; }) => true; }; cases: { a: Event<{ foo: 1; }>[]; b: Event<{ foo: 1; }>[]; }; }' is not assignable to parameter of type '{ error: \\"match object should contain case names\\"; need: \\"a\\" | \\"b\\"; got: \\"a\\"; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"match object should contain case names\\"; need: \\"a\\" | \\"b\\"; got: \\"a\\"; }'.
        "
      `)
    })

    /** type: source > cases, array case + unit case */

    test('case name: match == cases, type: source > cases, array case + unit case (should pass)', () => {
      const source = createEvent<{foo: 1; bar: number}>()
      const a = createEvent<{foo: 1}>()
      const b = createEvent<{foo: 1}>()
      split({
        source,
        match: {
          a: src => true,
          b: src => true,
        },
        cases: {
          a: [a],
          b,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('case name: match > cases, type: source > cases, array case + unit case (should pass)', () => {
      const source = createEvent<{foo: 1; bar: number}>()
      const a = createEvent<{foo: 1}>()
      const b = createEvent<{foo: 1}>()
      split({
        source,
        match: {
          a: src => true,
          b: src => true,
          c: src => true,
        },
        cases: {
          a: [a],
          b,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('case name: match < cases, type: source > cases, array case + unit case (should fail)', () => {
      const source = createEvent<{foo: 1; bar: number}>()
      const a = createEvent<{foo: 1}>()
      const b = createEvent<{foo: 1}>()
      const c = createEvent<{foo: 1}>()
      split({
        //@ts-expect-error
        source,
        match: {
          a: src => true,
          b: src => true,
        },
        cases: {
          a: [a],
          b,
          c,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; bar: number; }>; match: { a: (src: { foo: 1; bar: number; }) => true; b: (src: { foo: 1; bar: number; }) => true; }; cases: { a: Event<{ foo: 1; }>[]; b: Event<{ foo: 1; }>; c: Event<...>; }; }' is not assignable to parameter of type '{ error: \\"match object should contain case names\\"; need: \\"a\\" | \\"b\\" | \\"c\\"; got: \\"a\\" | \\"b\\"; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"match object should contain case names\\"; need: \\"a\\" | \\"b\\" | \\"c\\"; got: \\"a\\" | \\"b\\"; }'.
        "
      `)
    })

    /** type: source < cases, arrays only */

    test('case name: match == cases, type: source < cases, arrays only (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const a = createEvent<{foo: 1; bar: number}>()
      const b = createEvent<{foo: 1; bar: string}>()
      split({
        //@ts-expect-error
        source,
        match: {
          //@ts-expect-error src is any
          a: src => true,
          //@ts-expect-error src is any
          b: src => true,
        },
        cases: {
          a: [a],
          b: [b],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; }>; match: { a: (src: any) => boolean; b: (src: any) => boolean; }; cases: { a: Event<{ foo: 1; bar: number; }>[]; b: Event<{ foo: 1; bar: string; }>[]; }; }' is not assignable to parameter of type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 1; bar: number; } | { foo: 1; bar: string; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 1; bar: number; } | { foo: 1; bar: string; }; }'.
        Parameter 'src' implicitly has an 'any' type.
        Parameter 'src' implicitly has an 'any' type.
        "
      `)
    })
    test('case name: match > cases, type: source < cases, arrays only (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const a = createEvent<{foo: 1; bar: number}>()
      split({
        //@ts-expect-error
        source,
        match: {
          //@ts-expect-error src is any
          a: src => true,
          //@ts-expect-error src is any
          b: src => true,
        },
        cases: {
          a: [a],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; }>; match: { a: (src: any) => boolean; b: (src: any) => boolean; }; cases: { a: Event<{ foo: 1; bar: number; }>[]; }; }' is not assignable to parameter of type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 1; bar: number; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 1; bar: number; }; }'.
        Parameter 'src' implicitly has an 'any' type.
        Parameter 'src' implicitly has an 'any' type.
        "
      `)
    })
    test('case name: match < cases, type: source < cases, arrays only (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const a = createEvent<{foo: 1; bar: number}>()
      const b = createEvent<{foo: 1; bar: string}>()
      split({
        //@ts-expect-error
        source,
        match: {
          //@ts-expect-error src is any
          a: src => true,
        },
        cases: {
          a: [a],
          b: [b],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; }>; match: { a: (src: any) => boolean; }; cases: { a: Event<{ foo: 1; bar: number; }>[]; b: Event<{ foo: 1; bar: string; }>[]; }; }' is not assignable to parameter of type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 1; bar: number; } | { foo: 1; bar: string; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 1; bar: number; } | { foo: 1; bar: string; }; }'.
        Parameter 'src' implicitly has an 'any' type.
        "
      `)
    })

    /** type: source < cases, array case + unit case */

    test('case name: match == cases, type: source < cases, array case + unit case (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const a = createEvent<{foo: 1; bar: number}>()
      const b = createEvent<{foo: 1; bar: string}>()
      split({
        //@ts-expect-error
        source,
        match: {
          //@ts-expect-error src is any
          a: src => true,
          //@ts-expect-error src is any
          b: src => true,
        },
        cases: {
          a: [a],
          b,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; }>; match: { a: (src: any) => boolean; b: (src: any) => boolean; }; cases: { a: Event<{ foo: 1; bar: number; }>[]; b: Event<{ foo: 1; bar: string; }>; }; }' is not assignable to parameter of type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 1; bar: number; } | { foo: 1; bar: string; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 1; bar: number; } | { foo: 1; bar: string; }; }'.
        Parameter 'src' implicitly has an 'any' type.
        Parameter 'src' implicitly has an 'any' type.
        "
      `)
    })
    test('case name: match > cases, type: source < cases, array case + unit case (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const a = createEvent<{foo: 1; bar: number}>()
      const b = createEvent<{foo: 1; bar: string}>()
      split({
        //@ts-expect-error
        source,
        match: {
          //@ts-expect-error src is any
          a: src => true,
          //@ts-expect-error src is any
          b: src => true,
          //@ts-expect-error src is any
          c: src => true,
        },
        cases: {
          a: [a],
          b,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; }>; match: { a: (src: any) => boolean; b: (src: any) => boolean; c: (src: any) => boolean; }; cases: { a: Event<{ foo: 1; bar: number; }>[]; b: Event<{ foo: 1; bar: string; }>; }; }' is not assignable to parameter of type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 1; bar: number; } | { foo: 1; bar: string; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 1; bar: number; } | { foo: 1; bar: string; }; }'.
        Parameter 'src' implicitly has an 'any' type.
        Parameter 'src' implicitly has an 'any' type.
        Parameter 'src' implicitly has an 'any' type.
        "
      `)
    })
    test('case name: match < cases, type: source < cases, array case + unit case (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const a = createEvent<{foo: 1; bar: number}>()
      const b = createEvent<{foo: 1; bar: string}>()
      const c = createEvent<{foo: 1}>()
      split({
        //@ts-expect-error
        source,
        match: {
          a: src => true,
          b: src => true,
        },
        cases: {
          a: [a],
          b,
          c,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; }>; match: { a: (src: { foo: 1; }) => true; b: (src: { foo: 1; }) => true; }; cases: { a: Event<{ foo: 1; bar: number; }>[]; b: Event<{ foo: 1; bar: string; }>; c: Event<{ foo: 1; }>; }; }' is not assignable to parameter of type '{ error: \\"match object should contain case names\\"; need: \\"a\\" | \\"b\\" | \\"c\\"; got: \\"a\\" | \\"b\\"; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"match object should contain case names\\"; need: \\"a\\" | \\"b\\" | \\"c\\"; got: \\"a\\" | \\"b\\"; }'.
        "
      `)
    })

    /** type: source != cases, arrays only */

    test('case name: match == cases, type: source != cases, arrays only (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const a = createEvent<{foo: 2}>()
      const b = createEvent<{foo: 2}>()
      split({
        //@ts-expect-error
        source,
        match: {
          //@ts-expect-error src is any
          a: src => true,
          //@ts-expect-error src is any
          b: src => true,
        },
        cases: {
          a: [a],
          b: [b],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; }>; match: { a: (src: any) => boolean; b: (src: any) => boolean; }; cases: { a: Event<{ foo: 2; }>[]; b: Event<{ foo: 2; }>[]; }; }' is not assignable to parameter of type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 2; } | { foo: 2; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 2; } | { foo: 2; }; }'.
        Parameter 'src' implicitly has an 'any' type.
        Parameter 'src' implicitly has an 'any' type.
        "
      `)
    })
    test('case name: match > cases, type: source != cases, arrays only (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const a = createEvent<{foo: 2}>()
      split({
        //@ts-expect-error
        source,
        match: {
          //@ts-expect-error src is any
          a: src => true,
          //@ts-expect-error src is any
          b: src => true,
        },
        cases: {
          a: [a],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; }>; match: { a: (src: any) => boolean; b: (src: any) => boolean; }; cases: { a: Event<{ foo: 2; }>[]; }; }' is not assignable to parameter of type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 2; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 2; }; }'.
        Parameter 'src' implicitly has an 'any' type.
        Parameter 'src' implicitly has an 'any' type.
        "
      `)
    })
    test('case name: match < cases, type: source != cases, arrays only (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const a = createEvent<{foo: 2}>()
      const b = createEvent<{foo: 2}>()
      split({
        //@ts-expect-error
        source,
        match: {
          //@ts-expect-error src is any
          a: src => true,
        },
        cases: {
          a: [a],
          b: [b],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; }>; match: { a: (src: any) => boolean; }; cases: { a: Event<{ foo: 2; }>[]; b: Event<{ foo: 2; }>[]; }; }' is not assignable to parameter of type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 2; } | { foo: 2; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 2; } | { foo: 2; }; }'.
        Parameter 'src' implicitly has an 'any' type.
        "
      `)
    })

    /** type: source != cases, array case + unit case */

    test('case name: match == cases, type: source != cases, array case + unit case (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const a = createEvent<{foo: 2}>()
      const b = createEvent<{foo: 2}>()
      split({
        //@ts-expect-error
        source,
        match: {
          //@ts-expect-error src is any
          a: src => true,
          //@ts-expect-error src is any
          b: src => true,
        },
        cases: {
          a: [a],
          b,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; }>; match: { a: (src: any) => boolean; b: (src: any) => boolean; }; cases: { a: Event<{ foo: 2; }>[]; b: Event<{ foo: 2; }>; }; }' is not assignable to parameter of type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 2; } | { foo: 2; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 2; } | { foo: 2; }; }'.
        Parameter 'src' implicitly has an 'any' type.
        Parameter 'src' implicitly has an 'any' type.
        "
      `)
    })
    test('case name: match > cases, type: source != cases, array case + unit case (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const a = createEvent<{foo: 2}>()
      const b = createEvent<{foo: 2}>()
      split({
        //@ts-expect-error
        source,
        match: {
          //@ts-expect-error src is any
          a: src => true,
          //@ts-expect-error src is any
          b: src => true,
          //@ts-expect-error src is any
          c: src => true,
        },
        cases: {
          a: [a],
          b,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; }>; match: { a: (src: any) => boolean; b: (src: any) => boolean; c: (src: any) => boolean; }; cases: { a: Event<{ foo: 2; }>[]; b: Event<{ foo: 2; }>; }; }' is not assignable to parameter of type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 2; } | { foo: 2; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 2; } | { foo: 2; }; }'.
        Parameter 'src' implicitly has an 'any' type.
        Parameter 'src' implicitly has an 'any' type.
        Parameter 'src' implicitly has an 'any' type.
        "
      `)
    })
    test('case name: match < cases, type: source != cases, array case + unit case (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const a = createEvent<{foo: 2}>()
      const b = createEvent<{foo: 2}>()
      const c = createEvent<{foo: 2}>()
      split({
        //@ts-expect-error
        source,
        match: {
          //@ts-expect-error src is any
          a: src => true,
          //@ts-expect-error src is any
          b: src => true,
        },
        cases: {
          a: [a],
          b,
          c,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ foo: 1; }>; match: { a: (src: any) => boolean; b: (src: any) => boolean; }; cases: { a: Event<{ foo: 2; }>[]; b: Event<{ foo: 2; }>; c: Event<{ foo: 2; }>; }; }' is not assignable to parameter of type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 2; } | { foo: 2; } | { foo: 2; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source type should extends cases\\"; sourceType: { foo: 1; }; caseType: { foo: 2; } | { foo: 2; } | { foo: 2; }; }'.
        Parameter 'src' implicitly has an 'any' type.
        Parameter 'src' implicitly has an 'any' type.
        "
      `)
    })
  })
  test('case store case mismatch (should fail)', () => {
    const source: Event<number> = createEvent()
    const caseStore = createStore<'a' | 'c'>('a')
    const firstTarget: Event<number> = createEvent()
    const secondTarget: Event<number> = createEvent()
    const defaultarget: Event<number> = createEvent()
    split({
      //@ts-expect-error
      source,
      match: caseStore,
      cases: {
        a: [firstTarget],
        b: [secondTarget],
        __: [defaultarget],
      },
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Argument of type '{ source: Event<number>; match: Store<\\"a\\" | \\"c\\">; cases: { a: Event<number>[]; b: Event<number>[]; __: Event<number>[]; }; }' is not assignable to parameter of type '{ error: \\"match unit should contain case names\\"; need: \\"a\\" | \\"b\\"; got: \\"a\\" | \\"c\\"; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"match unit should contain case names\\"; need: \\"a\\" | \\"b\\"; got: \\"a\\" | \\"c\\"; }'.
      "
    `)
  })
  test('case function case mismatch (should fail)', () => {
    const source: Event<number> = createEvent()
    const firstTarget: Event<number> = createEvent()
    const secondTarget: Event<number> = createEvent()
    const defaultarget: Event<number> = createEvent()
    split({
      //@ts-expect-error
      source,
      match: (src): 'a' | 'c' => 'a',
      cases: {
        a: [firstTarget],
        b: [secondTarget],
        __: [defaultarget],
      },
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Argument of type '{ source: Event<number>; match: (src: number) => \\"a\\" | \\"c\\"; cases: { a: Event<number>[]; b: Event<number>[]; __: Event<number>[]; }; }' is not assignable to parameter of type '{ error: \\"match function should return case names\\"; need: \\"a\\" | \\"b\\"; got: \\"a\\" | \\"c\\"; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"match function should return case names\\"; need: \\"a\\" | \\"b\\"; got: \\"a\\" | \\"c\\"; }'.
      "
    `)
  })
  test('matcher function case mismatch (should fail)', () => {
    const source: Event<number> = createEvent()
    const firstTarget: Event<number> = createEvent()
    const secondTarget: Event<number> = createEvent()
    const defaultarget: Event<number> = createEvent()
    split({
      //@ts-expect-error
      source,
      match: {
        a: src => true,
        c: src => true,
      },
      cases: {
        a: [firstTarget],
        b: [secondTarget],
        __: [defaultarget],
      },
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Argument of type '{ source: Event<number>; match: { a: (src: number) => true; c: (src: number) => true; }; cases: { a: Event<number>[]; b: Event<number>[]; __: Event<number>[]; }; }' is not assignable to parameter of type '{ error: \\"match object should contain case names\\"; need: \\"a\\" | \\"b\\"; got: \\"a\\" | \\"c\\"; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"match object should contain case names\\"; need: \\"a\\" | \\"b\\"; got: \\"a\\" | \\"c\\"; }'.
      "
    `)
  })
})

test('split + attach', () => {
  const $number = createStore<number>(0)
  split({
    source: $number,
    match: {},
    cases: {
      __: attach({
        source: createStore<any>(null),
        effect: (_, param: number) => {},
      }),
    },
  })
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Argument of type '{ source: Store<number>; match: {}; cases: { __: Effect<number, void, Error>; }; }' is not assignable to parameter of type '{ error: \\"config should be object with fields \\\\\\"source\\\\\\", \\\\\\"match\\\\\\" and \\\\\\"cases\\\\\\"\\"; got: { source: Store<number>; match: {}; cases: unknown; clock: unknown; }; }'.
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"config should be object with fields \\\\\\"source\\\\\\", \\\\\\"match\\\\\\" and \\\\\\"cases\\\\\\"\\"; got: { source: Store<number>; match: {}; cases: unknown; clock: unknown; }; }'.
    "
  `)
})
