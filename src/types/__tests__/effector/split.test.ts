/* eslint-disable no-unused-vars */
import {createEvent, createStore, Event, split} from 'effector'

const typecheck = '{global}'

it('should infer type by given predicate', () => {
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

test('condition stores (should pass)', () => {
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
      Overload 1 of 4, '(config: { source: Unit<number>; match: { [name: string]: Store<boolean> | ((payload: number) => boolean); }; cases: Partial<{ [x: string]: Unit<number>; } & { __: Unit<number>; }>; }): void', gave the following error.
        Type 'Store<\\"a\\" | \\"c\\">' is not assignable to type '{ [name: string]: Store<boolean> | ((payload: number) => boolean); }'.
          Index signature is missing in type 'Store<\\"a\\" | \\"c\\">'.
      Overload 2 of 4, '(config: { source: Unit<number>; cases: Partial<Record<string, Unit<number>>>; match: (p: number) => string | number | symbol; }): void', gave the following error.
        Type 'Store<\\"a\\" | \\"c\\">' is not assignable to type '(p: number) => string | number | symbol'.
          Type 'Store<\\"a\\" | \\"c\\">' provides no match for the signature '(p: number): string | number | symbol'.
      Overload 3 of 4, '(config: { source: Unit<number>; cases: Partial<Record<\\"a\\" | \\"__\\" | \\"c\\", Unit<number>>>; match: Store<\\"a\\" | \\"c\\">; }): void', gave the following error.
        Type '{ a: Event<number>; b: Event<number>; __: Event<number>; }' is not assignable to type 'Partial<Record<\\"a\\" | \\"__\\" | \\"c\\", Unit<number>>>'.
          Object literal may only specify known properties, and 'b' does not exist in type 'Partial<Record<\\"a\\" | \\"__\\" | \\"c\\", Unit<number>>>'.
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
      Overload 1 of 4, '(config: { source: Unit<number>; match: { [name: string]: Store<boolean> | ((payload: number) => boolean); }; cases: Partial<{ [x: string]: Unit<number>; } & { __: Unit<number>; }>; }): void', gave the following error.
        Type '(x: number) => \\"a\\" | \\"c\\"' is not assignable to type '{ [name: string]: Store<boolean> | ((payload: number) => boolean); }'.
          Index signature is missing in type '(x: number) => \\"a\\" | \\"c\\"'.
      Overload 2 of 4, '(config: { source: Unit<number>; cases: Partial<Record<\\"a\\" | \\"__\\" | \\"c\\", Unit<number>>>; match: (x: number) => \\"a\\" | \\"c\\"; }): void', gave the following error.
        Type '{ a: Event<number>; b: Event<number>; __: Event<number>; }' is not assignable to type 'Partial<Record<\\"a\\" | \\"__\\" | \\"c\\", Unit<number>>>'.
          Object literal may only specify known properties, and 'b' does not exist in type 'Partial<Record<\\"a\\" | \\"__\\" | \\"c\\", Unit<number>>>'.
      Overload 3 of 4, '(config: { source: Unit<number>; cases: Partial<Record<string, Unit<number>>>; match: Unit<string | number | symbol>; }): void', gave the following error.
        Type '(x: number) => \\"a\\" | \\"c\\"' is missing the following properties from type 'Unit<string | number | symbol>': kind, __
    "
  `)
})
