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

test('case stores / case functions (should pass)', () => {
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

test('matcher store (should pass)', () => {
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

test('matcher store case mismatch (should fail)', () => {
  const source: Event<number> = createEvent()
  const caseStore = createStore<'a' | 'c'>('a')
  const firstTarget: Event<number> = createEvent()
  const secondTarget: Event<number> = createEvent()
  const defaultarget: Event<number> = createEvent()
  //@ts-expect-error
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
    No overload matches this call.
      Overload 1 of 4, '(config: { source: Unit<number>; match: { [name: string]: Store<boolean> | ((payload: number) => boolean); }; cases: Partial<{ [x: string]: Target; } & { __: Target; }>; }): void', gave the following error.
        Type 'Store<\\"a\\" | \\"c\\">' is not assignable to type '{ [name: string]: Store<boolean> | ((payload: number) => boolean); }'.
          Index signature is missing in type 'Store<\\"a\\" | \\"c\\">'.
      Overload 2 of 4, '(config: { source: Unit<number>; match: (p: number) => \\"a\\" | \\"b\\" | \\"__\\"; cases: Partial<{ a: Event<number>; b: Event<number>; __: Event<number>; } & { __: Event<number>; }>; }): void', gave the following error.
        Type 'Store<\\"a\\" | \\"c\\">' is not assignable to type '(p: number) => \\"a\\" | \\"b\\" | \\"__\\"'.
          Type 'Store<\\"a\\" | \\"c\\">' provides no match for the signature '(p: number): \\"a\\" | \\"b\\" | \\"__\\"'.
      Overload 3 of 4, '(config: { source: Unit<number>; match: Unit<\\"a\\" | \\"c\\">; cases: Partial<{ a: Event<number>; c: Event<number>; } & { __: Event<number>; }>; }): void', gave the following error.
        Type '{ a: Event<number>; b: Event<number>; __: Event<number>; }' is not assignable to type 'Partial<{ a: Event<number>; c: Event<number>; } & { __: Event<number>; }>'.
          Object literal may only specify known properties, and 'b' does not exist in type 'Partial<{ a: Event<number>; c: Event<number>; } & { __: Event<number>; }>'.
    "
  `)
})

test('matcher function (should pass)', () => {
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

test('matcher function case mismatch (should fail)', () => {
  const source: Event<number> = createEvent()
  const firstTarget: Event<number> = createEvent()
  const secondTarget: Event<number> = createEvent()
  const defaultarget: Event<number> = createEvent()
  //@ts-expect-error
  split({
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
          Index signature is missing in type '(x: number) => \\"a\\" | \\"c\\"'.
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
