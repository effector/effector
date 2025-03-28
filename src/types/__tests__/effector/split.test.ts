/* eslint-disable no-unused-vars */
import {
  createEvent,
  createStore,
  createEffect,
  Event,
  guard,
  split,
  attach,
  sample,
  EventCallable,
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
  const event: EventCallable<number | string> = createEvent()
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
  const source: EventCallable<number | string> = createEvent()
  const firstBool = createStore(true)
  const firstTarget: EventCallable<number | string> = createEvent()
  const secondTarget: EventCallable<number | string> = createEvent()
  const defaultarget: EventCallable<number | string> = createEvent()
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
  const source: EventCallable<number> = createEvent()
  const caseStore = createStore<'a' | 'b'>('a')
  const firstTarget: EventCallable<number> = createEvent()
  const secondTarget: EventCallable<number> = createEvent()
  const defaultarget: EventCallable<number> = createEvent()
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
  const source: EventCallable<number> = createEvent()
  const caseStore = createStore<'a' | 'c'>('a')
  const firstTarget: EventCallable<number> = createEvent()
  const secondTarget: EventCallable<number> = createEvent()
  const defaultarget: EventCallable<number> = createEvent()
  split({
    source,
    //@ts-expect-error
    match: caseStore,
    cases: {
      a: firstTarget,
      //@ts-expect-error
      b: secondTarget,
      __: defaultarget,
    },
  })
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Type 'StoreWritable<\\"a\\" | \\"c\\">' is not assignable to type 'Unit<\\"a\\" | \\"b\\">'.
      Types of property '__' are incompatible.
        Type '\\"a\\" | \\"c\\"' is not assignable to type '\\"a\\" | \\"b\\"'.
          Type '\\"c\\"' is not assignable to type '\\"a\\" | \\"b\\"'.
    Object literal may only specify known properties, and 'b' does not exist in type '{ readonly a: EventCallable<number>; readonly __: EventCallable<number>; }'.
    "
  `)
})

test('case function (should pass)', () => {
  const source: EventCallable<number> = createEvent()
  const firstTarget: EventCallable<number> = createEvent()
  const secondTarget: EventCallable<number> = createEvent()
  const defaultarget: EventCallable<number> = createEvent()
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
  const source: EventCallable<number> = createEvent()
  const firstTarget: EventCallable<number> = createEvent()
  const secondTarget: EventCallable<number> = createEvent()
  const defaultarget: EventCallable<number> = createEvent()
  split({
    source,
    //@ts-expect-error
    match: x => (x > 0 ? 'a' : 'c'),
    cases: {
      a: firstTarget,
      //@ts-expect-error
      b: secondTarget,
      __: defaultarget,
    },
  })
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Type '\\"a\\" | \\"c\\"' is not assignable to type '\\"a\\" | \\"b\\"'.
      Type '\\"c\\"' is not assignable to type '\\"a\\" | \\"b\\"'.
    Object literal may only specify known properties, and 'b' does not exist in type '{ readonly a: EventCallable<number>; readonly __: EventCallable<number>; }'.
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
        //@ts-expect-error
        a: [aNonVoid, aVoid],
      },
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
      Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<number>'.
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
    const source: EventCallable<number | string> = createEvent()
    const $case = createStore<'a' | 'b'>('a')
    const firstTarget: EventCallable<number | string> = createEvent()
    const secondTarget: EventCallable<number | string> = createEvent()
    const defaultarget: EventCallable<number | string> = createEvent()
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
    const source: EventCallable<number | string> = createEvent()
    const firstTarget: EventCallable<number | string> = createEvent()
    const secondTarget: EventCallable<number | string> = createEvent()
    const defaultarget: EventCallable<number | string> = createEvent()
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
    const source: EventCallable<number | string> = createEvent()
    const firstBool = createStore(true)
    const firstTarget: EventCallable<number | string> = createEvent()
    const secondTarget: EventCallable<number | string> = createEvent()
    const defaultarget: EventCallable<number | string> = createEvent()
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
      source,
      match: {
        //@ts-expect-error
        a: (src): src is B => src.tag === 'b',
        c: $cFlag,
      },
      cases: {
        //@ts-expect-error
        a: [aFull, aPart],
        c,
        __: defTrigger,
      },
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type '(src: A | B) => src is B' is not assignable to type '(source: A | B) => source is A'.
        Type predicate 'src is B' is not assignable to 'source is A'.
          Type 'B' is not assignable to type 'A'.
            Types of property 'tag' are incompatible.
              Type '\\"b\\"' is not assignable to type '\\"a\\"'.
      Type 'EventCallable<A>' is not assignable to type 'UnitTargetable<B>'.
        The types of '__.tag' are incompatible between these types.
          Type '\\"a\\"' is not assignable to type '\\"b\\"'.
      Type 'EventCallable<{ value: 0; }>' is not assignable to type 'UnitTargetable<B>'.
        Types of property '__' are incompatible.
          Property 'tag' is missing in type '{ value: 0; }' but required in type 'B'.
      "
    `)
  })
  test('wrong inference (should fail)', () => {
    type A = {tag: 'a'; value: 0}
    type B = {tag: 'b'; value: 'b'}
    const source = createEvent<A | B>()
    const aFull = createEvent<A>()
    const c = createEvent<A | B>()

    split({
      source,
      match: {
        // @ts-expect-error
        a: (src): src is B => src.tag === 'b',
      },
      cases: {
        // @ts-expect-error
        a: [aFull, c],
      },
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type '(src: A | B) => src is B' is not assignable to type '(source: A | B) => source is A'.
        Type predicate 'src is B' is not assignable to 'source is A'.
          Type 'B' is not assignable to type 'A'.
            Types of property 'tag' are incompatible.
              Type '\\"b\\"' is not assignable to type '\\"a\\"'.
      Type 'EventCallable<A>' is not assignable to type 'UnitTargetable<B>'.
        The types of '__.tag' are incompatible between these types.
          Type '\\"a\\"' is not assignable to type '\\"b\\"'.
      "
    `)
  })
  test('nullable source + type guard in case (should pass)', () => {
    const $src = createStore<string | null>(null)
    const a = createEvent<string>()

    split({
      source: $src,
      match: {
        a: (str): str is string => str !== null,
      },
      cases: {
        a,
      },
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
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
        source,
        match: $case,
        cases: {
          a: [a],
          //@ts-expect-error
          b: [b],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'b' does not exist in type '{ readonly a: [EventCallable<{ foo: 1; }>]; }'.
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
        source,
        match: $case,
        cases: {
          a: [a],
          b,
          //@ts-expect-error
          c,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'c' does not exist in type '{ readonly a: [EventCallable<{ foo: 1; }>]; readonly b: EventCallable<{ foo: 1; }>; }'.
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
        source,
        match: $case,
        cases: {
          a: [a],
          //@ts-expect-error
          b: [b],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'b' does not exist in type '{ readonly a: [EventCallable<{ foo: 1; }>]; }'.
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
        source,
        match: $case,
        cases: {
          a: [a],
          b,
          //@ts-expect-error
          c,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'c' does not exist in type '{ readonly a: [EventCallable<{ foo: 1; }>]; readonly b: EventCallable<{ foo: 1; }>; }'.
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
        Type 'EventCallable<{ foo: 1; }>' is not assignable to type 'Unit<{ foo: 1; bar: string; }>'.
          Types of property '__' are incompatible.
            Property 'bar' is missing in type '{ foo: 1; }' but required in type '{ foo: 1; bar: string; }'.
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
        Type 'EventCallable<{ foo: 1; }>' is not assignable to type 'Unit<{ foo: 1; bar: number; }>'.
          Types of property '__' are incompatible.
            Property 'bar' is missing in type '{ foo: 1; }' but required in type '{ foo: 1; bar: number; }'.
        "
      `)
    })
    test('case name: match < cases, type: source < cases, arrays only (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const $case = createStore<'a'>('a')
      const a = createEvent<{foo: 1; bar: number}>()
      const b = createEvent<{foo: 1; bar: string}>()
      split({
        source,
        match: $case,
        cases: {
          a: [a],
          //@ts-expect-error
          b: [b],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'b' does not exist in type '{ readonly a: [EventCallable<{ foo: 1; bar: number; }>]; }'.
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
        Type 'EventCallable<{ foo: 1; }>' is not assignable to type 'Unit<{ foo: 1; bar: string; }>'.
          Types of property '__' are incompatible.
            Property 'bar' is missing in type '{ foo: 1; }' but required in type '{ foo: 1; bar: string; }'.
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
        Type 'EventCallable<{ foo: 1; }>' is not assignable to type 'Unit<{ foo: 1; bar: string; }>'.
          Types of property '__' are incompatible.
            Property 'bar' is missing in type '{ foo: 1; }' but required in type '{ foo: 1; bar: string; }'.
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
        source,
        match: $case,
        cases: {
          a: [a],
          b,
          //@ts-expect-error
          c,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'c' does not exist in type '{ readonly a: [EventCallable<{ foo: 1; bar: number; }>]; readonly b: EventCallable<{ foo: 1; bar: string; }>; }'.
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
          //@ts-expect-error
          a: [a],
          //@ts-expect-error
          b: [b],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Type 'EventCallable<{ foo: 1; }>' is not assignable to type 'Unit<{ foo: 2; }>'.
          The types of '__.foo' are incompatible between these types.
            Type '1' is not assignable to type '2'.
        Type 'EventCallable<{ foo: 2; }>' is not assignable to type 'UnitTargetable<{ foo: 1; }>'.
          The types of '__.foo' are incompatible between these types.
            Type '2' is not assignable to type '1'.
        Type 'EventCallable<{ foo: 2; }>' is not assignable to type 'UnitTargetable<{ foo: 1; }>'.
          The types of '__.foo' are incompatible between these types.
            Type '2' is not assignable to type '1'.
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
          //@ts-expect-error
          a: [a],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Type 'EventCallable<{ foo: 1; }>' is not assignable to type 'Unit<{ foo: 2; }>'.
          The types of '__.foo' are incompatible between these types.
            Type '1' is not assignable to type '2'.
        Type 'EventCallable<{ foo: 2; }>' is not assignable to type 'UnitTargetable<{ foo: 1; }>'.
          The types of '__.foo' are incompatible between these types.
            Type '2' is not assignable to type '1'.
        "
      `)
    })
    test('case name: match < cases, type: source != cases, arrays only (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const $case = createStore<'a'>('a')
      const a = createEvent<{foo: 2}>()
      const b = createEvent<{foo: 2}>()
      split({
        source,
        match: $case,
        cases: {
          a: [a],
          //@ts-expect-error
          b: [b],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'b' does not exist in type '{ readonly a: [EventCallable<{ foo: 2; }>]; }'.
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
          //@ts-expect-error
          a: [a],
          //@ts-expect-error
          b,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Type 'EventCallable<{ foo: 1; }>' is not assignable to type 'Unit<{ foo: 2; }>'.
          The types of '__.foo' are incompatible between these types.
            Type '1' is not assignable to type '2'.
        Type 'EventCallable<{ foo: 2; }>' is not assignable to type 'UnitTargetable<{ foo: 1; }>'.
          The types of '__.foo' are incompatible between these types.
            Type '2' is not assignable to type '1'.
        Type 'EventCallable<{ foo: 2; }>' is not assignable to type 'UnitTargetable<{ foo: 1; }>'.
          The types of '__.foo' are incompatible between these types.
            Type '2' is not assignable to type '1'.
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
          //@ts-expect-error
          a: [a],
          //@ts-expect-error
          b,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Type 'EventCallable<{ foo: 1; }>' is not assignable to type 'Unit<{ foo: 2; }>'.
          The types of '__.foo' are incompatible between these types.
            Type '1' is not assignable to type '2'.
        Type 'EventCallable<{ foo: 2; }>' is not assignable to type 'UnitTargetable<{ foo: 1; }>'.
          The types of '__.foo' are incompatible between these types.
            Type '2' is not assignable to type '1'.
        Type 'EventCallable<{ foo: 2; }>' is not assignable to type 'UnitTargetable<{ foo: 1; }>'.
          The types of '__.foo' are incompatible between these types.
            Type '2' is not assignable to type '1'.
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
        source,
        match: $case,
        cases: {
          a: [a],
          b,
          //@ts-expect-error
          c,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'c' does not exist in type '{ readonly a: [EventCallable<{ foo: 2; }>]; readonly b: EventCallable<{ foo: 2; }>; }'.
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
        source,
        match: (src): 'a' => 'a',
        cases: {
          a: [a],
          //@ts-expect-error
          b: [b],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'b' does not exist in type '{ readonly a: [EventCallable<{ foo: 1; }>]; }'.
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
        source,
        match: (src): 'a' | 'b' => 'a',
        cases: {
          a: [a],
          b,
          //@ts-expect-error
          c,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'c' does not exist in type '{ readonly a: [EventCallable<{ foo: 1; }>]; readonly b: EventCallable<{ foo: 1; }>; }'.
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
        source,
        match: (src): 'a' => 'a',
        cases: {
          a: [a],
          //@ts-expect-error
          b: [b],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'b' does not exist in type '{ readonly a: [EventCallable<{ foo: 1; }>]; }'.
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
        source,
        match: (src): 'a' | 'b' => 'a',
        cases: {
          a: [a],
          b,
          //@ts-expect-error
          c,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'c' does not exist in type '{ readonly a: [EventCallable<{ foo: 1; }>]; readonly b: EventCallable<{ foo: 1; }>; }'.
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
        match: (src): 'a' | 'b' => 'a',
        cases: {
          a: [a],
          b: [b],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Type 'EventCallable<{ foo: 1; }>' is not assignable to type 'Unit<{ foo: 1; bar: string; }>'.
          Types of property '__' are incompatible.
            Property 'bar' is missing in type '{ foo: 1; }' but required in type '{ foo: 1; bar: string; }'.
        "
      `)
    })
    test('case name: match > cases, type: source < cases, arrays only (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const a = createEvent<{foo: 1; bar: number}>()
      split({
        //@ts-expect-error
        source,
        match: (src): 'a' | 'b' => 'a',
        cases: {
          a: [a],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Type 'EventCallable<{ foo: 1; }>' is not assignable to type 'Unit<{ foo: 1; bar: number; }>'.
          Types of property '__' are incompatible.
            Property 'bar' is missing in type '{ foo: 1; }' but required in type '{ foo: 1; bar: number; }'.
        "
      `)
    })
    test('case name: match < cases, type: source < cases, arrays only (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const a = createEvent<{foo: 1; bar: number}>()
      const b = createEvent<{foo: 1; bar: string}>()
      split({
        source,
        match: (src): 'a' => 'a',
        cases: {
          a: [a],
          //@ts-expect-error
          b: [b],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'b' does not exist in type '{ readonly a: [EventCallable<{ foo: 1; bar: number; }>]; }'.
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
          write: src => src.a !== null && src.b !== null,
        },
        cases,
      })

      expect(typecheck).toMatchInlineSnapshot(`
        "
        Type 'Event<{ a: number | null; b: number | null; }>' is not assignable to type 'Unit<{ a: number; b: number; }>'.
          The types of '__.a' are incompatible between these types.
            Type 'number | null' is not assignable to type 'number'.
              Type 'null' is not assignable to type 'number'.
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
        match: (src): 'a' | 'b' => 'a',
        cases: {
          a: [a],
          b,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Type 'EventCallable<{ foo: 1; }>' is not assignable to type 'Unit<{ foo: 1; bar: string; }>'.
          Types of property '__' are incompatible.
            Property 'bar' is missing in type '{ foo: 1; }' but required in type '{ foo: 1; bar: string; }'.
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
        match: (src): 'a' | 'b' | 'c' => 'a',
        cases: {
          a: [a],
          b,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Type 'EventCallable<{ foo: 1; }>' is not assignable to type 'Unit<{ foo: 1; bar: string; }>'.
          Types of property '__' are incompatible.
            Property 'bar' is missing in type '{ foo: 1; }' but required in type '{ foo: 1; bar: string; }'.
        "
      `)
    })
    test('case name: match < cases, type: source < cases, array case + unit case (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const a = createEvent<{foo: 1; bar: number}>()
      const b = createEvent<{foo: 1; bar: string}>()
      const c = createEvent<{foo: 1}>()
      split({
        source,
        match: (src): 'a' | 'b' => 'a',
        cases: {
          a: [a],
          b,
          //@ts-expect-error
          c,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'c' does not exist in type '{ readonly a: [EventCallable<{ foo: 1; bar: number; }>]; readonly b: EventCallable<{ foo: 1; bar: string; }>; }'.
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
        match: (src): 'a' | 'b' => 'a',
        cases: {
          //@ts-expect-error
          a: [a],
          //@ts-expect-error
          b: [b],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Type 'EventCallable<{ foo: 1; }>' is not assignable to type 'Unit<{ foo: 2; }>'.
          The types of '__.foo' are incompatible between these types.
            Type '1' is not assignable to type '2'.
        Type 'EventCallable<{ foo: 2; }>' is not assignable to type 'UnitTargetable<{ foo: 1; }>'.
          The types of '__.foo' are incompatible between these types.
            Type '2' is not assignable to type '1'.
        Type 'EventCallable<{ foo: 2; }>' is not assignable to type 'UnitTargetable<{ foo: 1; }>'.
          The types of '__.foo' are incompatible between these types.
            Type '2' is not assignable to type '1'.
        "
      `)
    })
    test('case name: match > cases, type: source != cases, arrays only (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const a = createEvent<{foo: 2}>()
      split({
        //@ts-expect-error
        source,
        match: (src): 'a' | 'b' => 'a',
        cases: {
          //@ts-expect-error
          a: [a],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Type 'EventCallable<{ foo: 1; }>' is not assignable to type 'Unit<{ foo: 2; }>'.
          The types of '__.foo' are incompatible between these types.
            Type '1' is not assignable to type '2'.
        Type 'EventCallable<{ foo: 2; }>' is not assignable to type 'UnitTargetable<{ foo: 1; }>'.
          The types of '__.foo' are incompatible between these types.
            Type '2' is not assignable to type '1'.
        "
      `)
    })
    test('case name: match < cases, type: source != cases, arrays only (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const a = createEvent<{foo: 2}>()
      const b = createEvent<{foo: 2}>()
      split({
        source,
        match: (src): 'a' => 'a',
        cases: {
          a: [a],
          //@ts-expect-error
          b: [b],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'b' does not exist in type '{ readonly a: [EventCallable<{ foo: 2; }>]; }'.
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
        match: (src): 'a' | 'b' => 'a',
        cases: {
          //@ts-expect-error
          a: [a],
          //@ts-expect-error
          b,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Type 'EventCallable<{ foo: 1; }>' is not assignable to type 'Unit<{ foo: 2; }>'.
          The types of '__.foo' are incompatible between these types.
            Type '1' is not assignable to type '2'.
        Type 'EventCallable<{ foo: 2; }>' is not assignable to type 'UnitTargetable<{ foo: 1; }>'.
          The types of '__.foo' are incompatible between these types.
            Type '2' is not assignable to type '1'.
        Type 'EventCallable<{ foo: 2; }>' is not assignable to type 'UnitTargetable<{ foo: 1; }>'.
          The types of '__.foo' are incompatible between these types.
            Type '2' is not assignable to type '1'.
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
        match: (src): 'a' | 'b' | 'c' => 'a',
        cases: {
          //@ts-expect-error
          a: [a],
          //@ts-expect-error
          b,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Type 'EventCallable<{ foo: 1; }>' is not assignable to type 'Unit<{ foo: 2; }>'.
          The types of '__.foo' are incompatible between these types.
            Type '1' is not assignable to type '2'.
        Type 'EventCallable<{ foo: 2; }>' is not assignable to type 'UnitTargetable<{ foo: 1; }>'.
          The types of '__.foo' are incompatible between these types.
            Type '2' is not assignable to type '1'.
        Type 'EventCallable<{ foo: 2; }>' is not assignable to type 'UnitTargetable<{ foo: 1; }>'.
          The types of '__.foo' are incompatible between these types.
            Type '2' is not assignable to type '1'.
        "
      `)
    })
    test('case name: match < cases, type: source != cases, array case + unit case (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const a = createEvent<{foo: 2}>()
      const b = createEvent<{foo: 2}>()
      const c = createEvent<{foo: 2}>()
      split({
        source,
        match: (src): 'a' | 'b' => 'a',
        cases: {
          a: [a],
          b,
          //@ts-expect-error
          c,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'c' does not exist in type '{ readonly a: [EventCallable<{ foo: 2; }>]; readonly b: EventCallable<{ foo: 2; }>; }'.
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
        source,
        //@ts-expect-error
        match: {
          a: src => true,
        },
        cases: {
          a: [a],
          //@ts-expect-error
          b: [b],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Property 'b' is missing in type '{ a: (src: { foo: 1; }) => true; }' but required in type '{ a: (src: { foo: 1; }) => true; b: (p: { foo: 1; }) => boolean | Store<boolean>; }'.
        Object literal may only specify known properties, and 'b' does not exist in type '{ readonly a: [EventCallable<{ foo: 1; }>]; }'.
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
        source,
        //@ts-expect-error
        match: {
          a: src => true,
          b: src => true,
        },
        cases: {
          a: [a],
          b,
          //@ts-expect-error
          c,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Property 'c' is missing in type '{ a: (src: { foo: 1; }) => true; b: (src: { foo: 1; }) => true; }' but required in type '{ a: (src: { foo: 1; }) => true; b: (src: { foo: 1; }) => true; c: (p: { foo: 1; }) => boolean | Store<boolean>; }'.
        Object literal may only specify known properties, and 'c' does not exist in type '{ readonly a: [EventCallable<{ foo: 1; }>]; readonly b: EventCallable<{ foo: 1; }>; }'.
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
        source,
        //@ts-expect-error
        match: {
          a: src => true,
        },
        cases: {
          a: [a],
          //@ts-expect-error
          b: [b],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Property 'b' is missing in type '{ a: (src: { foo: 1; bar: number; }) => true; }' but required in type '{ a: (src: { foo: 1; bar: number; }) => true; b: (p: { foo: 1; bar: number; }) => boolean | Store<boolean>; }'.
        Object literal may only specify known properties, and 'b' does not exist in type '{ readonly a: [EventCallable<{ foo: 1; }>]; }'.
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
        source,
        //@ts-expect-error
        match: {
          a: src => true,
          b: src => true,
        },
        cases: {
          a: [a],
          b,
          //@ts-expect-error
          c,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Property 'c' is missing in type '{ a: (src: { foo: 1; bar: number; }) => true; b: (src: { foo: 1; bar: number; }) => true; }' but required in type '{ a: (src: { foo: 1; bar: number; }) => true; b: (src: { foo: 1; bar: number; }) => true; c: (p: { foo: 1; bar: number; }) => boolean | Store<boolean>; }'.
        Object literal may only specify known properties, and 'c' does not exist in type '{ readonly a: [EventCallable<{ foo: 1; }>]; readonly b: EventCallable<{ foo: 1; }>; }'.
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
        Type 'EventCallable<{ foo: 1; }>' is not assignable to type 'Unit<{ foo: 1; bar: string; }>'.
          Types of property '__' are incompatible.
            Property 'bar' is missing in type '{ foo: 1; }' but required in type '{ foo: 1; bar: string; }'.
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
          a: src => true,
          b: src => true,
        },
        cases: {
          a: [a],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Type 'EventCallable<{ foo: 1; }>' is not assignable to type 'Unit<{ foo: 1; bar: number; }>'.
          Types of property '__' are incompatible.
            Property 'bar' is missing in type '{ foo: 1; }' but required in type '{ foo: 1; bar: number; }'.
        "
      `)
    })
    test('case name: match < cases, type: source < cases, arrays only (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const a = createEvent<{foo: 1; bar: number}>()
      const b = createEvent<{foo: 1; bar: string}>()
      split({
        source,
        //@ts-expect-error
        match: {
          a: src => true,
        },
        cases: {
          a: [a],
          //@ts-expect-error
          b: [b],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Property 'b' is missing in type '{ a: (src: { foo: 1; }) => true; }' but required in type '{ a: (src: { foo: 1; }) => true; b: (p: { foo: 1; }) => boolean | Store<boolean>; }'.
        Object literal may only specify known properties, and 'b' does not exist in type '{ readonly a: [EventCallable<{ foo: 1; bar: number; }>]; }'.
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
        Type 'EventCallable<{ foo: 1; }>' is not assignable to type 'Unit<{ foo: 1; bar: string; }>'.
          Types of property '__' are incompatible.
            Property 'bar' is missing in type '{ foo: 1; }' but required in type '{ foo: 1; bar: string; }'.
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
        Type 'EventCallable<{ foo: 1; }>' is not assignable to type 'Unit<{ foo: 1; bar: string; }>'.
          Types of property '__' are incompatible.
            Property 'bar' is missing in type '{ foo: 1; }' but required in type '{ foo: 1; bar: string; }'.
        "
      `)
    })
    test('case name: match < cases, type: source < cases, array case + unit case (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const a = createEvent<{foo: 1; bar: number}>()
      const b = createEvent<{foo: 1; bar: string}>()
      const c = createEvent<{foo: 1}>()
      split({
        source,
        //@ts-expect-error
        match: {
          a: src => true,
          b: src => true,
        },
        cases: {
          a: [a],
          b,
          //@ts-expect-error
          c,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Property 'c' is missing in type '{ a: (src: { foo: 1; }) => true; b: (src: { foo: 1; }) => true; }' but required in type '{ a: (src: { foo: 1; }) => true; b: (src: { foo: 1; }) => true; c: (p: { foo: 1; }) => boolean | Store<boolean>; }'.
        Object literal may only specify known properties, and 'c' does not exist in type '{ readonly a: [EventCallable<{ foo: 1; bar: number; }>]; readonly b: EventCallable<{ foo: 1; bar: string; }>; }'.
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
          a: src => true,
          b: src => true,
        },
        cases: {
          //@ts-expect-error
          a: [a],
          //@ts-expect-error
          b: [b],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Type 'EventCallable<{ foo: 1; }>' is not assignable to type 'Unit<{ foo: 2; }>'.
          The types of '__.foo' are incompatible between these types.
            Type '1' is not assignable to type '2'.
        Type 'EventCallable<{ foo: 2; }>' is not assignable to type 'UnitTargetable<{ foo: 1; }>'.
          The types of '__.foo' are incompatible between these types.
            Type '2' is not assignable to type '1'.
        Type 'EventCallable<{ foo: 2; }>' is not assignable to type 'UnitTargetable<{ foo: 1; }>'.
          The types of '__.foo' are incompatible between these types.
            Type '2' is not assignable to type '1'.
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
          a: src => true,
          b: src => true,
        },
        cases: {
          //@ts-expect-error
          a: [a],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Type 'EventCallable<{ foo: 1; }>' is not assignable to type 'Unit<{ foo: 2; }>'.
          The types of '__.foo' are incompatible between these types.
            Type '1' is not assignable to type '2'.
        Type 'EventCallable<{ foo: 2; }>' is not assignable to type 'UnitTargetable<{ foo: 1; }>'.
          The types of '__.foo' are incompatible between these types.
            Type '2' is not assignable to type '1'.
        "
      `)
    })
    test('case name: match < cases, type: source != cases, arrays only (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const a = createEvent<{foo: 2}>()
      const b = createEvent<{foo: 2}>()
      split({
        source,
        //@ts-expect-error
        match: {
          a: src => true,
        },
        cases: {
          a: [a],
          //@ts-expect-error
          b: [b],
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Property 'b' is missing in type '{ a: (src: { foo: 1; }) => true; }' but required in type '{ a: (src: { foo: 1; }) => true; b: (p: { foo: 1; }) => boolean | Store<boolean>; }'.
        Object literal may only specify known properties, and 'b' does not exist in type '{ readonly a: [EventCallable<{ foo: 2; }>]; }'.
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
          a: src => true,
          b: src => true,
        },
        cases: {
          //@ts-expect-error
          a: [a],
          //@ts-expect-error
          b,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Type 'EventCallable<{ foo: 1; }>' is not assignable to type 'Unit<{ foo: 2; }>'.
          The types of '__.foo' are incompatible between these types.
            Type '1' is not assignable to type '2'.
        Type 'EventCallable<{ foo: 2; }>' is not assignable to type 'UnitTargetable<{ foo: 1; }>'.
          The types of '__.foo' are incompatible between these types.
            Type '2' is not assignable to type '1'.
        Type 'EventCallable<{ foo: 2; }>' is not assignable to type 'UnitTargetable<{ foo: 1; }>'.
          The types of '__.foo' are incompatible between these types.
            Type '2' is not assignable to type '1'.
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
          a: src => true,
          b: src => true,
          c: src => true,
        },
        cases: {
          //@ts-expect-error
          a: [a],
          //@ts-expect-error
          b,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Type 'EventCallable<{ foo: 1; }>' is not assignable to type 'Unit<{ foo: 2; }>'.
          The types of '__.foo' are incompatible between these types.
            Type '1' is not assignable to type '2'.
        Type 'EventCallable<{ foo: 2; }>' is not assignable to type 'UnitTargetable<{ foo: 1; }>'.
          The types of '__.foo' are incompatible between these types.
            Type '2' is not assignable to type '1'.
        Type 'EventCallable<{ foo: 2; }>' is not assignable to type 'UnitTargetable<{ foo: 1; }>'.
          The types of '__.foo' are incompatible between these types.
            Type '2' is not assignable to type '1'.
        "
      `)
    })
    test('case name: match < cases, type: source != cases, array case + unit case (should fail)', () => {
      const source = createEvent<{foo: 1}>()
      const a = createEvent<{foo: 2}>()
      const b = createEvent<{foo: 2}>()
      const c = createEvent<{foo: 2}>()
      split({
        source,
        //@ts-expect-error
        match: {
          a: src => true,
          b: src => true,
        },
        cases: {
          a: [a],
          b,
          //@ts-expect-error
          c,
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Property 'c' is missing in type '{ a: (src: { foo: 1; }) => true; b: (src: { foo: 1; }) => true; }' but required in type '{ a: (src: { foo: 1; }) => true; b: (src: { foo: 1; }) => true; c: (p: { foo: 1; }) => boolean | Store<boolean>; }'.
        Object literal may only specify known properties, and 'c' does not exist in type '{ readonly a: [EventCallable<{ foo: 2; }>]; readonly b: EventCallable<{ foo: 2; }>; }'.
        "
      `)
    })
  })
  test('case store case mismatch (should fail)', () => {
    const source: EventCallable<number> = createEvent()
    const caseStore = createStore<'a' | 'c'>('a')
    const firstTarget: EventCallable<number> = createEvent()
    const secondTarget: EventCallable<number> = createEvent()
    const defaultarget: EventCallable<number> = createEvent()
    split({
      source,
      //@ts-expect-error
      match: caseStore,
      cases: {
        a: [firstTarget],
        //@ts-expect-error
        b: [secondTarget],
        __: [defaultarget],
      },
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'StoreWritable<\\"a\\" | \\"c\\">' is not assignable to type 'Unit<\\"a\\" | \\"b\\">'.
      Object literal may only specify known properties, and 'b' does not exist in type '{ readonly a: [EventCallable<number>]; readonly __: [EventCallable<number>]; }'.
      "
    `)
  })
  test('case function case mismatch (should fail)', () => {
    const source: EventCallable<number> = createEvent()
    const firstTarget: EventCallable<number> = createEvent()
    const secondTarget: EventCallable<number> = createEvent()
    const defaultarget: EventCallable<number> = createEvent()
    split({
      source,
      //@ts-expect-error
      match: (src): 'a' | 'c' => 'a',
      cases: {
        a: [firstTarget],
        //@ts-expect-error
        b: [secondTarget],
        __: [defaultarget],
      },
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type '\\"a\\" | \\"c\\"' is not assignable to type '\\"a\\" | \\"b\\"'.
      Object literal may only specify known properties, and 'b' does not exist in type '{ readonly a: [EventCallable<number>]; readonly __: [EventCallable<number>]; }'.
      "
    `)
  })
  test('matcher function case mismatch (should fail)', () => {
    const source: EventCallable<number> = createEvent()
    const firstTarget: EventCallable<number> = createEvent()
    const secondTarget: EventCallable<number> = createEvent()
    const defaultarget: EventCallable<number> = createEvent()
    split({
      source,
      match: {
        a: src => true,
        //@ts-expect-error
        c: src => true,
      },
      cases: {
        a: [firstTarget],
        //@ts-expect-error
        b: [secondTarget],
        __: [defaultarget],
      },
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Object literal may only specify known properties, and 'c' does not exist in type '{ a: (src: number) => true; b: (p: number) => boolean | Store<boolean>; }'.
      Object literal may only specify known properties, and 'b' does not exist in type '{ readonly a: [EventCallable<number>]; readonly __: [EventCallable<number>]; }'.
      "
    `)
  })
})

test('attach in default case (should fail)', () => {
  const $number = createStore<number>(0)
  split({
    //@ts-expect-error
    source: $number,
    match: {},
    cases: {
      //@ts-expect-error
      __: attach({
        source: createStore<any>(null),
        effect: (_, param: string) => {},
      }),
    },
  })
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Type 'StoreWritable<number>' is not assignable to type 'Unit<string>'.
      Types of property '__' are incompatible.
        Type 'number' is not assignable to type 'string'.
    Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<number>'.
      Types of property '__' are incompatible.
        Type 'string' is not assignable to type 'number'.
    "
  `)
})

test('attach in default case (should pass)', () => {
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
    no errors
    "
  `)
})

test('inline prepend call in cases (should pass)', () => {
  const fooFx = createEffect(() => {})
  const errorSettled = createEvent<'ok'>()

  split({
    source: fooFx.failData,
    match: res => 'ok',
    cases: {
      __: errorSettled.prepend(() => 'ok'),
    },
  })
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
