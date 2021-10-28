/* eslint-disable no-unused-vars */
import {createEvent, createStore, Event, guard, split} from 'effector'

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
    No overload matches this call.
      Overload 1 of 4, '(config: { source: Unit<number>; match: { [name: string]: Store<boolean> | ((payload: number) => boolean); }; cases: Partial<{ [x: string]: Target; } & { __: Target; }>; }): void', gave the following error.
        Type 'Store<\\"a\\" | \\"c\\">' is not assignable to type '{ [name: string]: Store<boolean> | ((payload: number) => boolean); }'.
          Index signature for type 'string' is missing in type 'Store<\\"a\\" | \\"c\\">'.
      Overload 2 of 4, '(config: { source: Unit<number>; match: (p: number) => \\"a\\" | \\"b\\" | \\"__\\"; cases: Partial<{ a: Event<number>; b: Event<number>; __: Event<number>; } & { __: Event<number>; }>; }): void', gave the following error.
        Type 'Store<\\"a\\" | \\"c\\">' is not assignable to type '(p: number) => \\"a\\" | \\"b\\" | \\"__\\"'.
          Type 'Store<\\"a\\" | \\"c\\">' provides no match for the signature '(p: number): \\"a\\" | \\"b\\" | \\"__\\"'.
      Overload 3 of 4, '(config: { source: Unit<number>; match: Unit<\\"a\\" | \\"c\\">; cases: Partial<{ a: Event<number>; c: Event<number>; } & { __: Event<number>; }>; }): void', gave the following error.
        Type '{ a: Event<number>; b: Event<number>; __: Event<number>; }' is not assignable to type 'Partial<{ a: Event<number>; c: Event<number>; } & { __: Event<number>; }>'.
          Object literal may only specify known properties, and 'b' does not exist in type 'Partial<{ a: Event<number>; c: Event<number>; } & { __: Event<number>; }>'.
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
    No overload matches this call.
      Overload 1 of 4, '(config: { source: Unit<number>; match: { [name: string]: Store<boolean> | ((payload: number) => boolean); }; cases: Partial<{ [x: string]: Target; } & { __: Target; }>; }): void', gave the following error.
        Type '(x: number) => \\"a\\" | \\"c\\"' is not assignable to type '{ [name: string]: Store<boolean> | ((payload: number) => boolean); }'.
          Index signature for type 'string' is missing in type '(x: number) => \\"a\\" | \\"c\\"'.
      Overload 2 of 4, '(config: { source: Unit<number>; match: (p: number) => \\"a\\" | \\"c\\"; cases: Partial<{ a: Event<number>; c: Event<number>; } & { __: Event<number>; }>; }): void', gave the following error.
        Type '{ a: Event<number>; b: Event<number>; __: Event<number>; }' is not assignable to type 'Partial<{ a: Event<number>; c: Event<number>; } & { __: Event<number>; }>'.
          Object literal may only specify known properties, and 'b' does not exist in type 'Partial<{ a: Event<number>; c: Event<number>; } & { __: Event<number>; }>'.
      Overload 3 of 4, '(config: { source: Unit<number>; match: Unit<\\"a\\" | \\"b\\" | \\"__\\">; cases: Partial<{ a: Event<number>; b: Event<number>; __: Event<number>; } & { __: Event<number>; }>; }): void', gave the following error.
        Type '(x: number) => \\"a\\" | \\"c\\"' is missing the following properties from type 'Unit<\\"a\\" | \\"b\\" | \\"__\\">': kind, __
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
      No overload matches this call.
        Overload 3 of 4, '(config: { source: Unit<number>; match: Unit<\\"a\\" | \\"b\\">; cases: Partial<{ a: [\\"incompatible unit in target\\", Event<void>]; b: [\\"incompatible unit in target\\", Event<void>]; } & { ...; }>; }): void', gave the following error.
          Type 'Event<string>' is not assignable to type '\\"incompatible unit in target\\"'.
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
      No overload matches this call.
        Overload 3 of 4, '(config: { source: Unit<number>; match: Unit<\\"a\\" | \\"b\\">; cases: Partial<{ a: Event<number>; b: Event<number>; } & { __: Event<number>; }>; }): void', gave the following error.
          Type 'Event<void>[]' is not assignable to type 'Event<number>'.
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
      no errors
      "
    `)
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
        No overload matches this call.
          Overload 1 of 4, '(config: { source: Unit<{ foo: 1; }>; match: { [name: string]: Store<boolean> | ((payload: { foo: 1; }) => boolean); }; cases: Partial<{ [x: string]: Target; } & { __: Target; }>; }): void', gave the following error.
            Type 'Store<\\"a\\">' is not assignable to type '{ [name: string]: Store<boolean> | ((payload: { foo: 1; }) => boolean); }'.
              Index signature for type 'string' is missing in type 'Store<\\"a\\">'.
          Overload 2 of 4, '(config: { source: Unit<{ foo: 1; }>; match: (p: { foo: 1; }) => \\"a\\" | \\"b\\"; cases: Partial<{ a: [Event<{ foo: 1; }>]; b: [Event<{ foo: 1; }>]; } & { __: [Event<{ foo: 1; }>]; }>; }): void', gave the following error.
            Type 'Store<\\"a\\">' is not assignable to type '(p: { foo: 1; }) => \\"a\\" | \\"b\\"'.
              Type 'Store<\\"a\\">' provides no match for the signature '(p: { foo: 1; }): \\"a\\" | \\"b\\"'.
          Overload 3 of 4, '(config: { source: Unit<{ foo: 1; }>; match: Unit<\\"a\\">; cases: Partial<{ a: [Event<{ foo: 1; }>]; } & { __: [Event<{ foo: 1; }>]; }>; }): void', gave the following error.
            Type '{ a: [Event<{ foo: 1; }>]; b: Event<{ foo: 1; }>[]; }' is not assignable to type 'Partial<{ a: [Event<{ foo: 1; }>]; } & { __: [Event<{ foo: 1; }>]; }>'.
              Object literal may only specify known properties, and 'b' does not exist in type 'Partial<{ a: [Event<{ foo: 1; }>]; } & { __: [Event<{ foo: 1; }>]; }>'.
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
        No overload matches this call.
          Overload 3 of 4, '(config: { source: Unit<{ foo: 1; }>; match: Unit<\\"a\\" | \\"b\\">; cases: Partial<{ a: Event<{ foo: 1; }>; b: Event<{ foo: 1; }>; } & { __: Event<{ foo: 1; }>; }>; }): void', gave the following error.
            Type 'Event<{ foo: 1; }>[]' is not assignable to type 'Event<{ foo: 1; }>'.
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
        No overload matches this call.
          Overload 3 of 4, '(config: { source: Unit<{ foo: 1; }>; match: Unit<\\"a\\" | \\"b\\" | \\"c\\">; cases: Partial<{ a: Event<{ foo: 1; }>; b: Event<{ foo: 1; }>; c: Event<{ foo: 1; }>; } & { __: Event<{ foo: 1; }>; }>; }): void', gave the following error.
            Type 'Event<{ foo: 1; }>[]' is not assignable to type 'Event<{ foo: 1; }>'.
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
        No overload matches this call.
          Overload 3 of 4, '(config: { source: Unit<{ foo: 1; }>; match: Unit<\\"a\\" | \\"b\\">; cases: Partial<{ a: Event<{ foo: 1; }>; b: Event<{ foo: 1; }>; } & { __: Event<{ foo: 1; }>; }>; }): void', gave the following error.
            Type 'Event<{ foo: 1; }>[]' is not assignable to type 'Event<{ foo: 1; }>'.
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
        No overload matches this call.
          Overload 1 of 4, '(config: { source: Unit<{ foo: 1; bar: number; }>; match: { [name: string]: Store<boolean> | ((payload: { foo: 1; bar: number; }) => boolean); }; cases: Partial<{ [x: string]: Target; } & { ...; }>; }): void', gave the following error.
            Type 'Store<\\"a\\">' is not assignable to type '{ [name: string]: Store<boolean> | ((payload: { foo: 1; bar: number; }) => boolean); }'.
              Index signature for type 'string' is missing in type 'Store<\\"a\\">'.
          Overload 2 of 4, '(config: { source: Unit<{ foo: 1; bar: number; }>; match: (p: { foo: 1; bar: number; }) => \\"a\\" | \\"b\\"; cases: Partial<{ a: [Event<{ foo: 1; }>]; b: [Event<{ foo: 1; }>]; } & { __: [Event<{ foo: 1; }>]; }>; }): void', gave the following error.
            Type 'Store<\\"a\\">' is not assignable to type '(p: { foo: 1; bar: number; }) => \\"a\\" | \\"b\\"'.
              Type 'Store<\\"a\\">' provides no match for the signature '(p: { foo: 1; bar: number; }): \\"a\\" | \\"b\\"'.
          Overload 3 of 4, '(config: { source: Unit<{ foo: 1; bar: number; }>; match: Unit<\\"a\\">; cases: Partial<{ a: [Event<{ foo: 1; }>]; } & { __: [Event<{ foo: 1; }>]; }>; }): void', gave the following error.
            Type '{ a: [Event<{ foo: 1; }>]; b: Event<{ foo: 1; }>[]; }' is not assignable to type 'Partial<{ a: [Event<{ foo: 1; }>]; } & { __: [Event<{ foo: 1; }>]; }>'.
              Object literal may only specify known properties, and 'b' does not exist in type 'Partial<{ a: [Event<{ foo: 1; }>]; } & { __: [Event<{ foo: 1; }>]; }>'.
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
        No overload matches this call.
          Overload 3 of 4, '(config: { source: Unit<{ foo: 1; bar: number; }>; match: Unit<\\"a\\" | \\"b\\">; cases: Partial<{ a: Event<{ foo: 1; }>; b: Event<{ foo: 1; }>; } & { __: Event<{ foo: 1; }>; }>; }): void', gave the following error.
            Type 'Event<{ foo: 1; }>[]' is not assignable to type 'Event<{ foo: 1; }>'.
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
        No overload matches this call.
          Overload 3 of 4, '(config: { source: Unit<{ foo: 1; bar: number; }>; match: Unit<\\"a\\" | \\"b\\" | \\"c\\">; cases: Partial<{ a: Event<{ foo: 1; }>; b: Event<{ foo: 1; }>; c: Event<{ foo: 1; }>; } & { __: Event<{ foo: 1; }>; }>; }): void', gave the following error.
            Type 'Event<{ foo: 1; }>[]' is not assignable to type 'Event<{ foo: 1; }>'.
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
        No overload matches this call.
          Overload 3 of 4, '(config: { source: Unit<{ foo: 1; bar: number; }>; match: Unit<\\"a\\" | \\"b\\">; cases: Partial<{ a: Event<{ foo: 1; }>; b: Event<{ foo: 1; }>; } & { __: Event<{ foo: 1; }>; }>; }): void', gave the following error.
            Type 'Event<{ foo: 1; }>[]' is not assignable to type 'Event<{ foo: 1; }>'.
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
        No overload matches this call.
          Overload 1 of 4, '(config: { source: Unit<{ foo: 1; }>; match: { [name: string]: Store<boolean> | ((payload: { foo: 1; }) => boolean); }; cases: Partial<{ [x: string]: Target; } & { __: Target; }>; }): void', gave the following error.
            Type 'Store<\\"a\\" | \\"b\\">' is not assignable to type '{ [name: string]: Store<boolean> | ((payload: { foo: 1; }) => boolean); }'.
              Index signature for type 'string' is missing in type 'Store<\\"a\\" | \\"b\\">'.
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
        No overload matches this call.
          Overload 3 of 4, '(config: { source: Unit<{ foo: 1; }>; match: Unit<\\"a\\" | \\"b\\">; cases: Partial<{ a: [\\"incompatible unit in target\\"]; b: [\\"incompatible unit in target\\"]; } & { __: [\\"incompatible unit in target\\"]; }>; }): void', gave the following error.
            Type 'Event<{ foo: 1; bar: number; }>' is not assignable to type '\\"incompatible unit in target\\"'.
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
        No overload matches this call.
          Overload 3 of 4, '(config: { source: Unit<{ foo: 1; }>; match: Unit<\\"a\\">; cases: Partial<{ a: [\\"incompatible unit in target\\"]; } & { __: [\\"incompatible unit in target\\"]; }>; }): void', gave the following error.
            Type 'Event<{ foo: 1; bar: number; }>' is not assignable to type '\\"incompatible unit in target\\"'.
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
        No overload matches this call.
          Overload 1 of 4, '(config: { source: Unit<{ foo: 1; }>; match: { [name: string]: Store<boolean> | ((payload: { foo: 1; }) => boolean); }; cases: Partial<{ [x: string]: Target; } & { __: Target; }>; }): void', gave the following error.
            Type 'Store<\\"a\\" | \\"b\\">' is not assignable to type '{ [name: string]: Store<boolean> | ((payload: { foo: 1; }) => boolean); }'.
              Index signature for type 'string' is missing in type 'Store<\\"a\\" | \\"b\\">'.
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
        No overload matches this call.
          Overload 1 of 4, '(config: { source: Unit<{ foo: 1; }>; match: { [name: string]: Store<boolean> | ((payload: { foo: 1; }) => boolean); }; cases: Partial<{ [x: string]: Target; } & { __: Target; }>; }): void', gave the following error.
            Type 'Store<\\"a\\" | \\"b\\" | \\"c\\">' is not assignable to type '{ [name: string]: Store<boolean> | ((payload: { foo: 1; }) => boolean); }'.
              Index signature for type 'string' is missing in type 'Store<\\"a\\" | \\"b\\" | \\"c\\">'.
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
        No overload matches this call.
          Overload 1 of 4, '(config: { source: Unit<{ foo: 1; }>; match: { [name: string]: Store<boolean> | ((payload: { foo: 1; }) => boolean); }; cases: Partial<{ [x: string]: Target; } & { __: Target; }>; }): void', gave the following error.
            Type 'Store<\\"a\\" | \\"b\\">' is not assignable to type '{ [name: string]: Store<boolean> | ((payload: { foo: 1; }) => boolean); }'.
              Index signature for type 'string' is missing in type 'Store<\\"a\\" | \\"b\\">'.
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
        No overload matches this call.
          Overload 1 of 4, '(config: { source: Unit<{ foo: 1; }>; match: { [name: string]: Store<boolean> | ((payload: { foo: 1; }) => boolean); }; cases: Partial<{ [x: string]: Target; } & { __: Target; }>; }): void', gave the following error.
            Type 'Store<\\"a\\" | \\"b\\">' is not assignable to type '{ [name: string]: Store<boolean> | ((payload: { foo: 1; }) => boolean); }'.
              Index signature for type 'string' is missing in type 'Store<\\"a\\" | \\"b\\">'.
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
        No overload matches this call.
          Overload 3 of 4, '(config: { source: Unit<{ foo: 1; }>; match: Unit<\\"a\\" | \\"b\\">; cases: Partial<{ a: [\\"incompatible unit in target\\"]; b: [\\"incompatible unit in target\\"]; } & { __: [\\"incompatible unit in target\\"]; }>; }): void', gave the following error.
            Type 'Event<{ foo: 2; }>' is not assignable to type '\\"incompatible unit in target\\"'.
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
        No overload matches this call.
          Overload 3 of 4, '(config: { source: Unit<{ foo: 1; }>; match: Unit<\\"a\\">; cases: Partial<{ a: [\\"incompatible unit in target\\"]; } & { __: [\\"incompatible unit in target\\"]; }>; }): void', gave the following error.
            Type 'Event<{ foo: 2; }>' is not assignable to type '\\"incompatible unit in target\\"'.
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
        No overload matches this call.
          Overload 1 of 4, '(config: { source: Unit<{ foo: 1; }>; match: { [name: string]: Store<boolean> | ((payload: { foo: 1; }) => boolean); }; cases: Partial<{ [x: string]: Target; } & { __: Target; }>; }): void', gave the following error.
            Type 'Store<\\"a\\" | \\"b\\">' is not assignable to type '{ [name: string]: Store<boolean> | ((payload: { foo: 1; }) => boolean); }'.
              Index signature for type 'string' is missing in type 'Store<\\"a\\" | \\"b\\">'.
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
        No overload matches this call.
          Overload 1 of 4, '(config: { source: Unit<{ foo: 1; }>; match: { [name: string]: Store<boolean> | ((payload: { foo: 1; }) => boolean); }; cases: Partial<{ [x: string]: Target; } & { __: Target; }>; }): void', gave the following error.
            Type 'Store<\\"a\\" | \\"b\\" | \\"c\\">' is not assignable to type '{ [name: string]: Store<boolean> | ((payload: { foo: 1; }) => boolean); }'.
              Index signature for type 'string' is missing in type 'Store<\\"a\\" | \\"b\\" | \\"c\\">'.
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
        No overload matches this call.
          Overload 1 of 4, '(config: { source: Unit<{ foo: 1; }>; match: { [name: string]: Store<boolean> | ((payload: { foo: 1; }) => boolean); }; cases: Partial<{ [x: string]: Target; } & { __: Target; }>; }): void', gave the following error.
            Type 'Store<\\"a\\" | \\"b\\">' is not assignable to type '{ [name: string]: Store<boolean> | ((payload: { foo: 1; }) => boolean); }'.
              Index signature for type 'string' is missing in type 'Store<\\"a\\" | \\"b\\">'.
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
        No overload matches this call.
          Overload 1 of 4, '(config: { source: Unit<{ foo: 1; }>; match: { [name: string]: Store<boolean> | ((payload: { foo: 1; }) => boolean); }; cases: Partial<{ [x: string]: Target; } & { __: Target; }>; }): void', gave the following error.
            Type '(src: { foo: 1; }) => \\"a\\"' is not assignable to type '{ [name: string]: Store<boolean> | ((payload: { foo: 1; }) => boolean); }'.
              Index signature for type 'string' is missing in type '(src: { foo: 1; }) => \\"a\\"'.
          Overload 2 of 4, '(config: { source: Unit<{ foo: 1; }>; match: (p: { foo: 1; }) => \\"a\\"; cases: Partial<{ a: [Event<{ foo: 1; }>]; } & { __: [Event<{ foo: 1; }>]; }>; }): void', gave the following error.
            Type '{ a: [Event<{ foo: 1; }>]; b: Event<{ foo: 1; }>[]; }' is not assignable to type 'Partial<{ a: [Event<{ foo: 1; }>]; } & { __: [Event<{ foo: 1; }>]; }>'.
              Object literal may only specify known properties, and 'b' does not exist in type 'Partial<{ a: [Event<{ foo: 1; }>]; } & { __: [Event<{ foo: 1; }>]; }>'.
          Overload 3 of 4, '(config: { source: Unit<{ foo: 1; }>; match: Unit<\\"a\\" | \\"b\\">; cases: Partial<{ a: [Event<{ foo: 1; }>]; b: [Event<{ foo: 1; }>]; } & { __: [Event<{ foo: 1; }>]; }>; }): void', gave the following error.
            Type '(src: { foo: 1; }) => \\"a\\"' is missing the following properties from type 'Unit<\\"a\\" | \\"b\\">': kind, __
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
        Parameter 'src' implicitly has an 'any' type.
        No overload matches this call.
          Overload 2 of 4, '(config: { source: Unit<{ foo: 1; }>; match: (p: { foo: 1; }) => \\"a\\" | \\"b\\"; cases: Partial<{ a: Event<{ foo: 1; }>; b: Event<{ foo: 1; }>; } & { __: Event<{ foo: 1; }>; }>; }): void', gave the following error.
            Type 'Event<{ foo: 1; }>[]' is missing the following properties from type 'Event<{ foo: 1; }>': watch, filterMap, prepend, subscribe, and 7 more.
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
        No overload matches this call.
          Overload 1 of 4, '(config: { source: Unit<{ foo: 1; }>; match: { [name: string]: Store<boolean> | ((payload: { foo: 1; }) => boolean); }; cases: Partial<{ [x: string]: Target; } & { __: Target; }>; }): void', gave the following error.
            Type '(src: any) => \\"a\\" | \\"b\\" | \\"c\\"' is not assignable to type '{ [name: string]: Store<boolean> | ((payload: { foo: 1; }) => boolean); }'.
              Index signature for type 'string' is missing in type '(src: any) => \\"a\\" | \\"b\\" | \\"c\\"'.
        Parameter 'src' implicitly has an 'any' type.
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
        Parameter 'src' implicitly has an 'any' type.
        No overload matches this call.
          Overload 2 of 4, '(config: { source: Unit<{ foo: 1; }>; match: (p: { foo: 1; }) => \\"a\\" | \\"b\\" | \\"c\\"; cases: Partial<{ a: Event<{ foo: 1; }>; b: Event<{ foo: 1; }>; c: Event<{ foo: 1; }>; } & { __: Event<{ foo: 1; }>; }>; }): void', gave the following error.
            Type 'Event<{ foo: 1; }>[]' is missing the following properties from type 'Event<{ foo: 1; }>': watch, filterMap, prepend, subscribe, and 7 more.
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
        No overload matches this call.
          Overload 1 of 4, '(config: { source: Unit<{ foo: 1; bar: number; }>; match: { [name: string]: Store<boolean> | ((payload: { foo: 1; bar: number; }) => boolean); }; cases: Partial<{ [x: string]: Target; } & { ...; }>; }): void', gave the following error.
            Type '(src: { foo: 1; bar: number; }) => \\"a\\"' is not assignable to type '{ [name: string]: Store<boolean> | ((payload: { foo: 1; bar: number; }) => boolean); }'.
              Index signature for type 'string' is missing in type '(src: { foo: 1; bar: number; }) => \\"a\\"'.
          Overload 2 of 4, '(config: { source: Unit<{ foo: 1; bar: number; }>; match: (p: { foo: 1; bar: number; }) => \\"a\\"; cases: Partial<{ a: [Event<{ foo: 1; }>]; } & { __: [Event<{ foo: 1; }>]; }>; }): void', gave the following error.
            Type '{ a: [Event<{ foo: 1; }>]; b: Event<{ foo: 1; }>[]; }' is not assignable to type 'Partial<{ a: [Event<{ foo: 1; }>]; } & { __: [Event<{ foo: 1; }>]; }>'.
              Object literal may only specify known properties, and 'b' does not exist in type 'Partial<{ a: [Event<{ foo: 1; }>]; } & { __: [Event<{ foo: 1; }>]; }>'.
          Overload 3 of 4, '(config: { source: Unit<{ foo: 1; bar: number; }>; match: Unit<\\"a\\" | \\"b\\">; cases: Partial<{ a: [Event<{ foo: 1; }>]; b: [Event<{ foo: 1; }>]; } & { __: [Event<{ foo: 1; }>]; }>; }): void', gave the following error.
            Type '(src: { foo: 1; bar: number; }) => \\"a\\"' is missing the following properties from type 'Unit<\\"a\\" | \\"b\\">': kind, __
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
        Parameter 'src' implicitly has an 'any' type.
        No overload matches this call.
          Overload 2 of 4, '(config: { source: Unit<{ foo: 1; bar: number; }>; match: (p: { foo: 1; bar: number; }) => \\"a\\" | \\"b\\"; cases: Partial<{ a: Event<{ foo: 1; }>; b: Event<{ foo: 1; }>; } & { __: Event<{ foo: 1; }>; }>; }): void', gave the following error.
            Type 'Event<{ foo: 1; }>[]' is missing the following properties from type 'Event<{ foo: 1; }>': watch, filterMap, prepend, subscribe, and 7 more.
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
        No overload matches this call.
          Overload 1 of 4, '(config: { source: Unit<{ foo: 1; bar: number; }>; match: { [name: string]: Store<boolean> | ((payload: { foo: 1; bar: number; }) => boolean); }; cases: Partial<{ [x: string]: Target; } & { ...; }>; }): void', gave the following error.
            Type '(src: any) => \\"a\\" | \\"b\\" | \\"c\\"' is not assignable to type '{ [name: string]: Store<boolean> | ((payload: { foo: 1; bar: number; }) => boolean); }'.
              Index signature for type 'string' is missing in type '(src: any) => \\"a\\" | \\"b\\" | \\"c\\"'.
        Parameter 'src' implicitly has an 'any' type.
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
        Parameter 'src' implicitly has an 'any' type.
        No overload matches this call.
          Overload 2 of 4, '(config: { source: Unit<{ foo: 1; bar: number; }>; match: (p: { foo: 1; bar: number; }) => \\"a\\" | \\"b\\" | \\"c\\"; cases: Partial<{ a: Event<{ foo: 1; }>; b: Event<{ foo: 1; }>; c: Event<{ foo: 1; }>; } & { ...; }>; }): void', gave the following error.
            Type 'Event<{ foo: 1; }>[]' is missing the following properties from type 'Event<{ foo: 1; }>': watch, filterMap, prepend, subscribe, and 7 more.
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
        No overload matches this call.
          Overload 1 of 4, '(config: { source: Unit<{ foo: 1; }>; match: { [name: string]: Store<boolean> | ((payload: { foo: 1; }) => boolean); }; cases: Partial<{ [x: string]: Target; } & { __: Target; }>; }): void', gave the following error.
            Type '(src: any) => \\"a\\" | \\"b\\"' is not assignable to type '{ [name: string]: Store<boolean> | ((payload: { foo: 1; }) => boolean); }'.
              Index signature for type 'string' is missing in type '(src: any) => \\"a\\" | \\"b\\"'.
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
        No overload matches this call.
          Overload 1 of 4, '(config: { source: Unit<{ foo: 1; }>; match: { [name: string]: Store<boolean> | ((payload: { foo: 1; }) => boolean); }; cases: Partial<{ [x: string]: Target; } & { __: Target; }>; }): void', gave the following error.
            Type '(src: any) => \\"a\\" | \\"b\\"' is not assignable to type '{ [name: string]: Store<boolean> | ((payload: { foo: 1; }) => boolean); }'.
              Index signature for type 'string' is missing in type '(src: any) => \\"a\\" | \\"b\\"'.
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
        No overload matches this call.
          Overload 1 of 4, '(config: { source: Unit<{ foo: 1; }>; match: { [name: string]: Store<boolean> | ((payload: { foo: 1; }) => boolean); }; cases: Partial<{ [x: string]: Target; } & { __: Target; }>; }): void', gave the following error.
            Type '(src: any) => \\"a\\"' is not assignable to type '{ [name: string]: Store<boolean> | ((payload: { foo: 1; }) => boolean); }'.
              Index signature for type 'string' is missing in type '(src: any) => \\"a\\"'.
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
        No overload matches this call.
          Overload 1 of 4, '(config: { source: Unit<{ foo: 1; }>; match: { [name: string]: Store<boolean> | ((payload: { foo: 1; }) => boolean); }; cases: Partial<{ [x: string]: Target; } & { __: Target; }>; }): void', gave the following error.
            Type '(src: any) => \\"a\\" | \\"b\\"' is not assignable to type '{ [name: string]: Store<boolean> | ((payload: { foo: 1; }) => boolean); }'.
              Index signature for type 'string' is missing in type '(src: any) => \\"a\\" | \\"b\\"'.
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
        No overload matches this call.
          Overload 1 of 4, '(config: { source: Unit<{ foo: 1; }>; match: { [name: string]: Store<boolean> | ((payload: { foo: 1; }) => boolean); }; cases: Partial<{ [x: string]: Target; } & { __: Target; }>; }): void', gave the following error.
            Type '(src: any) => \\"a\\" | \\"b\\" | \\"c\\"' is not assignable to type '{ [name: string]: Store<boolean> | ((payload: { foo: 1; }) => boolean); }'.
              Index signature for type 'string' is missing in type '(src: any) => \\"a\\" | \\"b\\" | \\"c\\"'.
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
        No overload matches this call.
          Overload 1 of 4, '(config: { source: Unit<{ foo: 1; }>; match: { [name: string]: Store<boolean> | ((payload: { foo: 1; }) => boolean); }; cases: Partial<{ [x: string]: Target; } & { __: Target; }>; }): void', gave the following error.
            Type '(src: any) => \\"a\\" | \\"b\\"' is not assignable to type '{ [name: string]: Store<boolean> | ((payload: { foo: 1; }) => boolean); }'.
              Index signature for type 'string' is missing in type '(src: any) => \\"a\\" | \\"b\\"'.
        Parameter 'src' implicitly has an 'any' type.
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
        No overload matches this call.
          Overload 1 of 4, '(config: { source: Unit<{ foo: 1; }>; match: { [name: string]: Store<boolean> | ((payload: { foo: 1; }) => boolean); }; cases: Partial<{ [x: string]: Target; } & { __: Target; }>; }): void', gave the following error.
            Type '(src: any) => \\"a\\" | \\"b\\"' is not assignable to type '{ [name: string]: Store<boolean> | ((payload: { foo: 1; }) => boolean); }'.
              Index signature for type 'string' is missing in type '(src: any) => \\"a\\" | \\"b\\"'.
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
        No overload matches this call.
          Overload 1 of 4, '(config: { source: Unit<{ foo: 1; }>; match: { [name: string]: Store<boolean> | ((payload: { foo: 1; }) => boolean); }; cases: Partial<{ [x: string]: Target; } & { __: Target; }>; }): void', gave the following error.
            Type '(src: any) => \\"a\\" | \\"b\\"' is not assignable to type '{ [name: string]: Store<boolean> | ((payload: { foo: 1; }) => boolean); }'.
              Index signature for type 'string' is missing in type '(src: any) => \\"a\\" | \\"b\\"'.
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
        No overload matches this call.
          Overload 1 of 4, '(config: { source: Unit<{ foo: 1; }>; match: { [name: string]: Store<boolean> | ((payload: { foo: 1; }) => boolean); }; cases: Partial<{ [x: string]: Target; } & { __: Target; }>; }): void', gave the following error.
            Type '(src: any) => \\"a\\"' is not assignable to type '{ [name: string]: Store<boolean> | ((payload: { foo: 1; }) => boolean); }'.
              Index signature for type 'string' is missing in type '(src: any) => \\"a\\"'.
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
        No overload matches this call.
          Overload 1 of 4, '(config: { source: Unit<{ foo: 1; }>; match: { [name: string]: Store<boolean> | ((payload: { foo: 1; }) => boolean); }; cases: Partial<{ [x: string]: Target; } & { __: Target; }>; }): void', gave the following error.
            Type '(src: any) => \\"a\\" | \\"b\\"' is not assignable to type '{ [name: string]: Store<boolean> | ((payload: { foo: 1; }) => boolean); }'.
              Index signature for type 'string' is missing in type '(src: any) => \\"a\\" | \\"b\\"'.
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
        No overload matches this call.
          Overload 1 of 4, '(config: { source: Unit<{ foo: 1; }>; match: { [name: string]: Store<boolean> | ((payload: { foo: 1; }) => boolean); }; cases: Partial<{ [x: string]: Target; } & { __: Target; }>; }): void', gave the following error.
            Type '(src: any) => \\"a\\" | \\"b\\" | \\"c\\"' is not assignable to type '{ [name: string]: Store<boolean> | ((payload: { foo: 1; }) => boolean); }'.
              Index signature for type 'string' is missing in type '(src: any) => \\"a\\" | \\"b\\" | \\"c\\"'.
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
        No overload matches this call.
          Overload 1 of 4, '(config: { source: Unit<{ foo: 1; }>; match: { [name: string]: Store<boolean> | ((payload: { foo: 1; }) => boolean); }; cases: Partial<{ [x: string]: Target; } & { __: Target; }>; }): void', gave the following error.
            Type '(src: any) => \\"a\\" | \\"b\\"' is not assignable to type '{ [name: string]: Store<boolean> | ((payload: { foo: 1; }) => boolean); }'.
              Index signature for type 'string' is missing in type '(src: any) => \\"a\\" | \\"b\\"'.
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
        No overload matches this call.
          Overload 1 of 4, '(config: { source: Unit<{ foo: 1; }>; match: { a: (src: { foo: 1; }) => true; }; cases: Partial<{ a: Target; } & { __: Target; }>; }): void', gave the following error.
            Type '{ a: [Event<{ foo: 1; }>]; b: Event<{ foo: 1; }>[]; }' is not assignable to type 'Partial<{ a: Target; } & { __: Target; }>'.
              Object literal may only specify known properties, and 'b' does not exist in type 'Partial<{ a: Target; } & { __: Target; }>'.
          Overload 2 of 4, '(config: { source: Unit<{ foo: 1; }>; match: (p: { foo: 1; }) => \\"a\\" | \\"b\\"; cases: Partial<{ a: [Event<{ foo: 1; }>]; b: [Event<{ foo: 1; }>]; } & { __: [Event<{ foo: 1; }>]; }>; }): void', gave the following error.
            Type '{ a: (src: { foo: 1; }) => true; }' is not assignable to type '(p: { foo: 1; }) => \\"a\\" | \\"b\\"'.
              Object literal may only specify known properties, and 'a' does not exist in type '(p: { foo: 1; }) => \\"a\\" | \\"b\\"'.
          Overload 3 of 4, '(config: { source: Unit<{ foo: 1; }>; match: Unit<\\"a\\" | \\"b\\">; cases: Partial<{ a: [Event<{ foo: 1; }>]; b: [Event<{ foo: 1; }>]; } & { __: [Event<{ foo: 1; }>]; }>; }): void', gave the following error.
            Type '{ a: (src: { foo: 1; }) => true; }' is not assignable to type 'Unit<\\"a\\" | \\"b\\">'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<\\"a\\" | \\"b\\">'.
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
        No overload matches this call.
          Overload 1 of 4, '(config: { source: Unit<{ foo: 1; }>; match: { a: (src: { foo: 1; }) => true; b: (src: { foo: 1; }) => true; }; cases: Partial<{ a: Target; b: Target; } & { __: Target; }>; }): void', gave the following error.
            Type '{ a: [Event<{ foo: 1; }>]; b: Event<{ foo: 1; }>; c: Event<{ foo: 1; }>; }' is not assignable to type 'Partial<{ a: Target; b: Target; } & { __: Target; }>'.
              Object literal may only specify known properties, and 'c' does not exist in type 'Partial<{ a: Target; b: Target; } & { __: Target; }>'.
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
        No overload matches this call.
          Overload 1 of 4, '(config: { source: Unit<{ foo: 1; bar: number; }>; match: { a: (src: { foo: 1; bar: number; }) => true; }; cases: Partial<{ a: Target; } & { __: Target; }>; }): void', gave the following error.
            Type '{ a: [Event<{ foo: 1; }>]; b: Event<{ foo: 1; }>[]; }' is not assignable to type 'Partial<{ a: Target; } & { __: Target; }>'.
              Object literal may only specify known properties, and 'b' does not exist in type 'Partial<{ a: Target; } & { __: Target; }>'.
          Overload 2 of 4, '(config: { source: Unit<{ foo: 1; bar: number; }>; match: (p: { foo: 1; bar: number; }) => \\"a\\" | \\"b\\"; cases: Partial<{ a: [Event<{ foo: 1; }>]; b: [Event<{ foo: 1; }>]; } & { __: [Event<{ foo: 1; }>]; }>; }): void', gave the following error.
            Type '{ a: (src: { foo: 1; bar: number; }) => true; }' is not assignable to type '(p: { foo: 1; bar: number; }) => \\"a\\" | \\"b\\"'.
              Object literal may only specify known properties, and 'a' does not exist in type '(p: { foo: 1; bar: number; }) => \\"a\\" | \\"b\\"'.
          Overload 3 of 4, '(config: { source: Unit<{ foo: 1; bar: number; }>; match: Unit<\\"a\\" | \\"b\\">; cases: Partial<{ a: [Event<{ foo: 1; }>]; b: [Event<{ foo: 1; }>]; } & { __: [Event<{ foo: 1; }>]; }>; }): void', gave the following error.
            Type '{ a: (src: { foo: 1; bar: number; }) => true; }' is not assignable to type 'Unit<\\"a\\" | \\"b\\">'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<\\"a\\" | \\"b\\">'.
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
        No overload matches this call.
          Overload 1 of 4, '(config: { source: Unit<{ foo: 1; bar: number; }>; match: { a: (src: { foo: 1; bar: number; }) => true; b: (src: { foo: 1; bar: number; }) => true; }; cases: Partial<{ a: Target; b: Target; } & { __: Target; }>; }): void', gave the following error.
            Type '{ a: [Event<{ foo: 1; }>]; b: Event<{ foo: 1; }>; c: Event<{ foo: 1; }>; }' is not assignable to type 'Partial<{ a: Target; b: Target; } & { __: Target; }>'.
              Object literal may only specify known properties, and 'c' does not exist in type 'Partial<{ a: Target; b: Target; } & { __: Target; }>'.
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
        no errors
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
        no errors
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
        No overload matches this call.
          Overload 1 of 4, '(config: { source: Unit<{ foo: 1; }>; match: { a: (src: { foo: 1; }) => true; }; cases: Partial<{ a: Target; } & { __: Target; }>; }): void', gave the following error.
            Type '{ a: [Event<{ foo: 1; bar: number; }>]; b: Event<{ foo: 1; bar: string; }>[]; }' is not assignable to type 'Partial<{ a: Target; } & { __: Target; }>'.
              Object literal may only specify known properties, and 'b' does not exist in type 'Partial<{ a: Target; } & { __: Target; }>'.
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
        no errors
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
        no errors
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
        No overload matches this call.
          Overload 1 of 4, '(config: { source: Unit<{ foo: 1; }>; match: { a: (src: { foo: 1; }) => true; b: (src: { foo: 1; }) => true; }; cases: Partial<{ a: Target; b: Target; } & { __: Target; }>; }): void', gave the following error.
            Type '{ a: [Event<{ foo: 1; bar: number; }>]; b: Event<{ foo: 1; bar: string; }>; c: Event<{ foo: 1; }>; }' is not assignable to type 'Partial<{ a: Target; b: Target; } & { __: Target; }>'.
              Object literal may only specify known properties, and 'c' does not exist in type 'Partial<{ a: Target; b: Target; } & { __: Target; }>'.
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
        no errors
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
        no errors
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
        No overload matches this call.
          Overload 1 of 4, '(config: { source: Unit<{ foo: 1; }>; match: { a: (src: { foo: 1; }) => true; }; cases: Partial<{ a: Target; } & { __: Target; }>; }): void', gave the following error.
            Type '{ a: [Event<{ foo: 2; }>]; b: Event<{ foo: 2; }>[]; }' is not assignable to type 'Partial<{ a: Target; } & { __: Target; }>'.
              Object literal may only specify known properties, and 'b' does not exist in type 'Partial<{ a: Target; } & { __: Target; }>'.
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
        no errors
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
        no errors
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
        No overload matches this call.
          Overload 1 of 4, '(config: { source: Unit<{ foo: 1; }>; match: { a: (src: { foo: 1; }) => true; b: (src: { foo: 1; }) => true; }; cases: Partial<{ a: Target; b: Target; } & { __: Target; }>; }): void', gave the following error.
            Type '{ a: [Event<{ foo: 2; }>]; b: Event<{ foo: 2; }>; c: Event<{ foo: 2; }>; }' is not assignable to type 'Partial<{ a: Target; b: Target; } & { __: Target; }>'.
              Object literal may only specify known properties, and 'c' does not exist in type 'Partial<{ a: Target; b: Target; } & { __: Target; }>'.
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
      No overload matches this call.
        Overload 1 of 4, '(config: { source: Unit<number>; match: { [name: string]: Store<boolean> | ((payload: number) => boolean); }; cases: Partial<{ [x: string]: Target; } & { __: Target; }>; }): void', gave the following error.
          Type 'Store<\\"a\\" | \\"c\\">' is not assignable to type '{ [name: string]: Store<boolean> | ((payload: number) => boolean); }'.
        Overload 2 of 4, '(config: { source: Unit<number>; match: (p: number) => \\"a\\" | \\"b\\" | \\"__\\"; cases: Partial<{ a: [Event<number>]; b: [Event<number>]; __: [Event<number>]; } & { __: [Event<number>]; }>; }): void', gave the following error.
          Type 'Store<\\"a\\" | \\"c\\">' is not assignable to type '(p: number) => \\"a\\" | \\"b\\" | \\"__\\"'.
        Overload 3 of 4, '(config: { source: Unit<number>; match: Unit<\\"a\\" | \\"c\\">; cases: Partial<{ a: [Event<number>]; c: [Event<number>]; } & { __: [Event<number>]; }>; }): void', gave the following error.
          Type '{ a: [Event<number>]; b: Event<number>[]; __: [Event<number>]; }' is not assignable to type 'Partial<{ a: [Event<number>]; c: [Event<number>]; } & { __: [Event<number>]; }>'.
            Object literal may only specify known properties, and 'b' does not exist in type 'Partial<{ a: [Event<number>]; c: [Event<number>]; } & { __: [Event<number>]; }>'.
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
      No overload matches this call.
        Overload 1 of 4, '(config: { source: Unit<number>; match: { [name: string]: Store<boolean> | ((payload: number) => boolean); }; cases: Partial<{ [x: string]: Target; } & { __: Target; }>; }): void', gave the following error.
          Type '(src: number) => \\"a\\" | \\"c\\"' is not assignable to type '{ [name: string]: Store<boolean> | ((payload: number) => boolean); }'.
            Index signature for type 'string' is missing in type '(src: number) => \\"a\\" | \\"c\\"'.
        Overload 2 of 4, '(config: { source: Unit<number>; match: (p: number) => \\"a\\" | \\"c\\"; cases: Partial<{ a: [Event<number>]; c: [Event<number>]; } & { __: [Event<number>]; }>; }): void', gave the following error.
          Type '{ a: [Event<number>]; b: Event<number>[]; __: [Event<number>]; }' is not assignable to type 'Partial<{ a: [Event<number>]; c: [Event<number>]; } & { __: [Event<number>]; }>'.
            Object literal may only specify known properties, and 'b' does not exist in type 'Partial<{ a: [Event<number>]; c: [Event<number>]; } & { __: [Event<number>]; }>'.
        Overload 3 of 4, '(config: { source: Unit<number>; match: Unit<\\"a\\" | \\"b\\" | \\"__\\">; cases: Partial<{ a: [Event<number>]; b: [Event<number>]; __: [Event<number>]; } & { __: [Event<number>]; }>; }): void', gave the following error.
          Type '(src: number) => \\"a\\" | \\"c\\"' is missing the following properties from type 'Unit<\\"a\\" | \\"b\\" | \\"__\\">': kind, __
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
      No overload matches this call.
        Overload 1 of 4, '(config: { source: Unit<number>; match: { a: (src: number) => true; c: (src: number) => true; }; cases: Partial<{ a: Target; c: Target; } & { __: Target; }>; }): void', gave the following error.
          Type '{ a: [Event<number>]; b: Event<number>[]; __: [Event<number>]; }' is not assignable to type 'Partial<{ a: Target; c: Target; } & { __: Target; }>'.
            Object literal may only specify known properties, and 'b' does not exist in type 'Partial<{ a: Target; c: Target; } & { __: Target; }>'.
        Overload 2 of 4, '(config: { source: Unit<number>; match: (p: number) => \\"a\\" | \\"b\\" | \\"__\\"; cases: Partial<{ a: [Event<number>]; b: [Event<number>]; __: [Event<number>]; } & { __: [Event<number>]; }>; }): void', gave the following error.
          Type '{ a: (src: number) => true; c: (src: number) => true; }' is not assignable to type '(p: number) => \\"a\\" | \\"b\\" | \\"__\\"'.
            Object literal may only specify known properties, and 'a' does not exist in type '(p: number) => \\"a\\" | \\"b\\" | \\"__\\"'.
        Overload 3 of 4, '(config: { source: Unit<number>; match: Unit<\\"a\\" | \\"b\\" | \\"__\\">; cases: Partial<{ a: [Event<number>]; b: [Event<number>]; __: [Event<number>]; } & { __: [Event<number>]; }>; }): void', gave the following error.
          Type '{ a: (src: number) => true; c: (src: number) => true; }' is not assignable to type 'Unit<\\"a\\" | \\"b\\" | \\"__\\">'.
            Object literal may only specify known properties, and 'a' does not exist in type 'Unit<\\"a\\" | \\"b\\" | \\"__\\">'.
      "
    `)
  })
})
