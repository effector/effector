/* eslint-disable no-unused-vars */
import {createStore, createEvent, sample} from 'effector'
const typecheck = '{global}'
// trigger types
type DataExact = {c: number; d: string}
type DataSrc = {c: number}
type DataClk = {d: string}

// fn return types
type Exact = {a: number; b: string}
type ExactBad = {a: string; b: string}
type Narrow = {a: number}
type ExactNullable = {a: number; b: string} | null
type ExactNarrow = {a: number; b: string} | {a: number}
type ExactBadNarrow = {a: string; b: string} | {a: number}
type ExactExactBad = {a: number; b: string} | {a: string; b: string}

const exact = createEvent<{a: number; b: string}>()
const exactBad = createEvent<{a: string; b: string}>()
const narrow = createEvent<{a: number}>()
const exactNullable = createEvent<{a: number; b: string} | null>()
const exactNarrow = createEvent<{a: number; b: string} | {a: number}>()
const exactBadNarrow = createEvent<{a: string; b: string} | {a: number}>()
const exactExactBad = createEvent<
  {a: number; b: string} | {a: string; b: string}
>()

const clockExact = createEvent<{c: number; d: string}>()
const clockExactBad = createEvent<{c: string; d: string}>()
const clockNarrow = createEvent<{c: number}>()
const clockExactNullable = createEvent<{c: number; d: string} | null>()
const clockExactNarrow = createEvent<{c: number; d: string} | {c: number}>()
const clockExactBadNarrow = createEvent<{c: string; d: string} | {c: number}>()
const clockExactExactBad = createEvent<
  {c: number; d: string} | {c: string; d: string}
>()

const dataClock = createEvent<{d: string}>()

const $c = createStore<number>(0)
const $d = createStore<string>('')

const $dataExact = createStore<{c: number; d: string}>({c: 0, d: ''})
const $dataSrc = createStore<{c: number}>({c: 0})
describe('assert fn args', () => {
  describe('assert fn args', () => {
    test('assert fn args (should pass)', () => {
      //prettier-ignore
      {
        sample({clock:clockExact, target:exact, fn:({c, d}: DataExact) => ({a: c, b: d})         })
        sample({source:$dataExact    , target:exact, fn:({c, d}: DataExact) => ({a: c, b: d})         })
        sample({source:{c: $c, d: $d}, target:exact, fn:({c, d}: DataExact) => ({a: c, b: d})         })
        sample({source:$dataSrc      , clock:dataClock , target:exact, fn:({c}: DataSrc, {d}: DataClk) => ({a: c, b: d})})
        sample({source:{c: $c}       , clock:dataClock , target:exact, fn:({c}: DataSrc, {d}: DataClk) => ({a: c, b: d})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('assert fn args (should fail)', () => {
      //prettier-ignore
      {
        sample({
          clock: clockExactBad,
          target: exact,
          //@ts-expect-error
          fn: ({c, d}: DataExact) => ({a: c, b: d}),
        })
        sample({
          clock: clockNarrow,
          target: exact,
          //@ts-expect-error
          fn: ({c, d}: DataExact) => ({a: c, b: d}),
        })
        sample({
          clock: clockExactNullable,
          target: exact,
          //@ts-expect-error
          fn: ({c, d}: DataExact) => ({a: c, b: d}),
        })
        sample({
          clock: [clockExact,clockExactBad],
          target: exact,
          //@ts-expect-error
          fn: ({c, d}: DataExact) => ({a: c, b: d}),
        })
        sample({
          clock: [clockExact,clockNarrow],
          target: exact,
          //@ts-expect-error
          fn: ({c, d}: DataExact) => ({a: c, b: d}),
        })
        sample({
          clock: [clockExact,clockExactNullable],
          target: exact,
          //@ts-expect-error
          fn: ({c, d}: DataExact) => ({a: c, b: d}),
        })
        sample({
          clock: [clockExactBad,clockExactNullable],
          target: exact,
          //@ts-expect-error
          fn: ({c, d}: DataExact) => ({a: c, b: d}),
        })
        sample({
          clock: [clockNarrow,clockExactBad],
          target: exact,
          //@ts-expect-error
          fn: ({c, d}: DataExact) => ({a: c, b: d}),
        })
        sample({
          clock: [clockNarrow,clockExactNullable],
          target: exact,
          //@ts-expect-error
          fn: ({c, d}: DataExact) => ({a: c, b: d}),
        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '((clk: { c: string; d: string; }) => any) & (({ c, d }: DataExact) => { a: number; b: string; })'.
          Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '(clk: { c: string; d: string; }) => any'.
            Types of parameters '__0' and 'clk' are incompatible.
              Type '{ c: string; d: string; }' is not assignable to type 'DataExact'.
                Types of property 'c' are incompatible.
                  Type 'string' is not assignable to type 'number'.
        Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '((clk: { c: number; }) => any) & (({ c, d }: DataExact) => { a: number; b: string; })'.
          Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '(clk: { c: number; }) => any'.
            Types of parameters '__0' and 'clk' are incompatible.
              Property 'd' is missing in type '{ c: number; }' but required in type 'DataExact'.
        Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '((clk: { c: number; d: string; } | null) => any) & (({ c, d }: DataExact) => { a: number; b: string; })'.
          Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '(clk: { c: number; d: string; } | null) => any'.
            Types of parameters '__0' and 'clk' are incompatible.
              Type '{ c: number; d: string; } | null' is not assignable to type 'DataExact'.
                Type 'null' is not assignable to type 'DataExact'.
        Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '((clk: { c: number; d: string; } | { c: string; d: string; }) => any) & (({ c, d }: DataExact) => { a: number; b: string; })'.
          Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '(clk: { c: number; d: string; } | { c: string; d: string; }) => any'.
            Types of parameters '__0' and 'clk' are incompatible.
              Type '{ c: number; d: string; } | { c: string; d: string; }' is not assignable to type 'DataExact'.
                Type '{ c: string; d: string; }' is not assignable to type 'DataExact'.
                  Types of property 'c' are incompatible.
                    Type 'string' is not assignable to type 'number'.
        Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '((clk: { c: number; d: string; } | { c: number; }) => any) & (({ c, d }: DataExact) => { a: number; b: string; })'.
          Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '(clk: { c: number; d: string; } | { c: number; }) => any'.
            Types of parameters '__0' and 'clk' are incompatible.
              Type '{ c: number; d: string; } | { c: number; }' is not assignable to type 'DataExact'.
                Property 'd' is missing in type '{ c: number; }' but required in type 'DataExact'.
        Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '((clk: { c: number; d: string; } | { c: number; d: string; } | null) => any) & (({ c, d }: DataExact) => { a: number; b: string; })'.
          Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '(clk: { c: number; d: string; } | { c: number; d: string; } | null) => any'.
            Types of parameters '__0' and 'clk' are incompatible.
              Type '{ c: number; d: string; } | { c: number; d: string; } | null' is not assignable to type 'DataExact'.
                Type 'null' is not assignable to type 'DataExact'.
        Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '((clk: { c: string; d: string; } | { c: number; d: string; } | null) => any) & (({ c, d }: DataExact) => { a: number; b: string; })'.
          Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '(clk: { c: string; d: string; } | { c: number; d: string; } | null) => any'.
            Types of parameters '__0' and 'clk' are incompatible.
              Type '{ c: string; d: string; } | { c: number; d: string; } | null' is not assignable to type 'DataExact'.
                Type 'null' is not assignable to type 'DataExact'.
        Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '((clk: { c: string; d: string; } | { c: number; }) => any) & (({ c, d }: DataExact) => { a: number; b: string; })'.
          Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '(clk: { c: string; d: string; } | { c: number; }) => any'.
            Types of parameters '__0' and 'clk' are incompatible.
              Type '{ c: string; d: string; } | { c: number; }' is not assignable to type 'DataExact'.
                Type '{ c: string; d: string; }' is not assignable to type 'DataExact'.
                  Types of property 'c' are incompatible.
                    Type 'string' is not assignable to type 'number'.
        Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '((clk: { c: number; } | { c: number; d: string; } | null) => any) & (({ c, d }: DataExact) => { a: number; b: string; })'.
          Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '(clk: { c: number; } | { c: number; d: string; } | null) => any'.
            Types of parameters '__0' and 'clk' are incompatible.
              Type '{ c: number; } | { c: number; d: string; } | null' is not assignable to type 'DataExact'.
                Type 'null' is not assignable to type 'DataExact'.
        "
      `)
    })
  })
})
describe('clock exact', () => {
  test('clock exact (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:clockExact, target:exact                 , fn:({c, d}) => ({a: c, b: d})})
      sample({clock:clockExact, target:exactNullable         , fn:({c, d}) => ({a: c, b: d})})
      sample({clock:clockExact, target:[exact,narrow]        , fn:({c, d}) => ({a: c, b: d})})
      sample({clock:clockExact, target:[exact,exactNullable] , fn:({c, d}) => ({a: c, b: d})})
      sample({clock:clockExact, target:[narrow,exactNullable], fn:({c, d}) => ({a: c, b: d})})
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('clock exact (should fail)', () => {
    //prettier-ignore
    {
      sample({
        clock: clockExact,
        //@ts-expect-error
        target: exactBad,
        //@ts-expect-error
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        clock: clockExact,
        target: narrow,
        //@ts-expect-error
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        clock: clockExact,
        target: [
          exact,
          //@ts-expect-error
          exactBad,
        ],
        //@ts-expect-error
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        clock: clockExact,
        target: [
          //@ts-expect-error
          exactBad,
          exactNullable,
        ],
        //@ts-expect-error
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        clock: clockExact,
        target: [
          narrow,
          //@ts-expect-error
          exactBad,
        ],
        //@ts-expect-error
        fn: ({c, d}) => ({a: c, b: d}),
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Unmarked error at test line 4 'clock: clockExact,'
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: { a: string; b: string; }; }; }'.
      lack of expected error at test line 6 'target: exactBad,'
      lack of expected error at test line 8 'fn: ({c, d}) => ({a: c, b: d}),'
      lack of expected error at test line 14 'fn: ({c, d}) => ({a: c, b: d}),'
      lack of expected error at test line 21 'exactBad,'
      lack of expected error at test line 24 'fn: ({c, d}) => ({a: c, b: d}),'
      lack of expected error at test line 30 'exactBad,'
      lack of expected error at test line 34 'fn: ({c, d}) => ({a: c, b: d}),'
      lack of expected error at test line 41 'exactBad,'
      lack of expected error at test line 44 'fn: ({c, d}) => ({a: c, b: d}),'
      "
    `)
  })
})
test('clock exactBad (should fail)', () => {
  //prettier-ignore
  {
    sample({
      clock: clockExact,
      //@ts-expect-error
      target: exact,
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      clock: clockExact,
      //@ts-expect-error
      target: narrow,
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      clock: clockExact,
      //@ts-expect-error
      target: exactNullable,
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      clock: clockExact,
      target: [
        //@ts-expect-error
        exact,
        exactBad,
      ],
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      clock: clockExact,
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        narrow,
      ],
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      clock: clockExact,
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      clock: clockExact,
      target: [
        exactBad,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      clock: clockExact,
      target: [
        //@ts-expect-error
        narrow,
        exactBad,
      ],
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      clock: clockExact,
      target: [
        //@ts-expect-error
        narrow,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 4 'clock: clockExact,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; b: string; }; }; }'.
    Unmarked error at test line 11 'clock: clockExact,'
    lack of expected error at test line 6 'target: exact,'
    lack of expected error at test line 8 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; }; }; }'.
    Unmarked error at test line 18 'clock: clockExact,'
    lack of expected error at test line 13 'target: narrow,'
    lack of expected error at test line 15 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; b: string; } | null; }; }'.
    Unmarked error at test line 35 'clock: clockExact,'
    lack of expected error at test line 20 'target: exactNullable,'
    lack of expected error at test line 22 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 28 'exact,'
    lack of expected error at test line 32 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 46 'clock: clockExact,'
    lack of expected error at test line 38 'exact,'
    lack of expected error at test line 40 'narrow,'
    lack of expected error at test line 43 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; b: string; } | null; }[]; }'.
    Unmarked error at test line 77 'clock: clockExact,'
    lack of expected error at test line 49 'exact,'
    lack of expected error at test line 51 'exactNullable,'
    lack of expected error at test line 54 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 61 'exactNullable,'
    lack of expected error at test line 64 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 70 'narrow,'
    lack of expected error at test line 74 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; } | null; }[]; }'.
    lack of expected error at test line 80 'narrow,'
    lack of expected error at test line 82 'exactNullable,'
    lack of expected error at test line 85 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    "
  `)
})
test('clock narrow (should fail)', () => {
  //prettier-ignore
  {
    sample({
      clock: clockExact,
      //@ts-expect-error
      target: exact,
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      clock: clockExact,
      //@ts-expect-error
      target: exactBad,
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      clock: clockExact,
      //@ts-expect-error
      target: exactNullable,
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      clock: clockExact,
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactBad,
      ],
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      clock: clockExact,
      target: [
        //@ts-expect-error
        exact,
        narrow,
      ],
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      clock: clockExact,
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      clock: clockExact,
      target: [
        //@ts-expect-error
        exactBad,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      clock: clockExact,
      target: [
        narrow,
        //@ts-expect-error
        exactBad,
      ],
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      clock: clockExact,
      target: [
        narrow,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 4 'clock: clockExact,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; }; }; }'.
    Unmarked error at test line 11 'clock: clockExact,'
    lack of expected error at test line 6 'target: exact,'
    lack of expected error at test line 8 'fn: ({c}) => ({a: c}),'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: string; b: string; }; }; }'.
    Unmarked error at test line 18 'clock: clockExact,'
    lack of expected error at test line 13 'target: exactBad,'
    lack of expected error at test line 15 'fn: ({c}) => ({a: c}),'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | null; }; }'.
    Unmarked error at test line 25 'clock: clockExact,'
    lack of expected error at test line 20 'target: exactNullable,'
    lack of expected error at test line 22 'fn: ({c}) => ({a: c}),'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 46 'clock: clockExact,'
    lack of expected error at test line 28 'exact,'
    lack of expected error at test line 30 'exactBad,'
    lack of expected error at test line 33 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 39 'exact,'
    lack of expected error at test line 43 'fn: ({c}) => ({a: c}),'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | null; }[]; }'.
    Unmarked error at test line 57 'clock: clockExact,'
    lack of expected error at test line 49 'exact,'
    lack of expected error at test line 51 'exactNullable,'
    lack of expected error at test line 54 'fn: ({c}) => ({a: c}),'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: string; b: string; } | { a: number; b: string; } | null; }[]; }'.
    lack of expected error at test line 60 'exactBad,'
    lack of expected error at test line 62 'exactNullable,'
    lack of expected error at test line 65 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 72 'exactBad,'
    lack of expected error at test line 75 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 82 'exactNullable,'
    lack of expected error at test line 85 'fn: ({c}) => ({a: c}),'
    "
  `)
})
test('clock exactNullable (should fail)', () => {
  //prettier-ignore
  {
    sample({
      clock: clockExact,
      //@ts-expect-error
      target: exact,
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      clock: clockExact,
      //@ts-expect-error
      target: exactBad,
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      clock: clockExact,
      //@ts-expect-error
      target: narrow,
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      clock: clockExact,
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactBad,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      clock: clockExact,
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        narrow,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      clock: clockExact,
      target: [
        //@ts-expect-error
        exact,
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      clock: clockExact,
      target: [
        //@ts-expect-error
        exactBad,
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      clock: clockExact,
      target: [
        //@ts-expect-error
        narrow,
        //@ts-expect-error
        exactBad,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      clock: clockExact,
      target: [
        //@ts-expect-error
        narrow,
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 4 'clock: clockExact,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; b: string; }; }; }'.
    Unmarked error at test line 11 'clock: clockExact,'
    lack of expected error at test line 6 'target: exact,'
    lack of expected error at test line 8 'fn: ({c, d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; }; }; }'.
    Unmarked error at test line 18 'clock: clockExact,'
    lack of expected error at test line 13 'target: exactBad,'
    lack of expected error at test line 15 'fn: ({c, d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; }; }; }'.
    Unmarked error at test line 25 'clock: clockExact,'
    lack of expected error at test line 20 'target: narrow,'
    lack of expected error at test line 22 'fn: ({c, d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 36 'clock: clockExact,'
    lack of expected error at test line 28 'exact,'
    lack of expected error at test line 30 'exactBad,'
    lack of expected error at test line 33 'fn: ({c, d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 67 'clock: clockExact,'
    lack of expected error at test line 39 'exact,'
    lack of expected error at test line 41 'narrow,'
    lack of expected error at test line 44 'fn: ({c, d}): ExactNullable => null as any,'
    lack of expected error at test line 50 'exact,'
    lack of expected error at test line 54 'fn: ({c, d}): ExactNullable => null as any,'
    lack of expected error at test line 60 'exactBad,'
    lack of expected error at test line 64 'fn: ({c, d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; }; }[]; }'.
    lack of expected error at test line 70 'narrow,'
    lack of expected error at test line 72 'exactBad,'
    lack of expected error at test line 75 'fn: ({c, d}): ExactNullable => null as any,'
    lack of expected error at test line 81 'narrow,'
    lack of expected error at test line 85 'fn: ({c, d}): ExactNullable => null as any,'
    "
  `)
})
describe('source exact', () => {
  test('source exact (should pass)', () => {
    //prettier-ignore
    {
      sample({source:$dataExact    , target:exact                 , fn:({c, d}) => ({a: c, b: d})})
      sample({source:$dataExact    , target:exactNullable         , fn:({c, d}) => ({a: c, b: d})})
      sample({source:$dataExact    , target:[exact,narrow]        , fn:({c, d}) => ({a: c, b: d})})
      sample({source:$dataExact    , target:[exact,exactNullable] , fn:({c, d}) => ({a: c, b: d})})
      sample({source:$dataExact    , target:[narrow,exactNullable], fn:({c, d}) => ({a: c, b: d})})
      sample({source:{c: $c, d: $d}, target:exact                 , fn:({c, d}) => ({a: c, b: d})})
      sample({source:{c: $c, d: $d}, target:exactNullable         , fn:({c, d}) => ({a: c, b: d})})
      sample({source:{c: $c, d: $d}, target:[exact,narrow]        , fn:({c, d}) => ({a: c, b: d})})
      sample({source:{c: $c, d: $d}, target:[exact,exactNullable] , fn:({c, d}) => ({a: c, b: d})})
      sample({source:{c: $c, d: $d}, target:[narrow,exactNullable], fn:({c, d}) => ({a: c, b: d})})
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('source exact (should fail)', () => {
    //prettier-ignore
    {
      sample({
        source: $dataExact,
        //@ts-expect-error
        target: exactBad,
        //@ts-expect-error
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        source: $dataExact,
        target: narrow,
        //@ts-expect-error
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        source: $dataExact,
        target: [
          exact,
          //@ts-expect-error
          exactBad,
        ],
        //@ts-expect-error
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        source: $dataExact,
        target: [
          //@ts-expect-error
          exactBad,
          exactNullable,
        ],
        //@ts-expect-error
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        source: $dataExact,
        target: [
          narrow,
          //@ts-expect-error
          exactBad,
        ],
        //@ts-expect-error
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        source: {c: $c, d: $d},
        //@ts-expect-error
        target: exactBad,
        //@ts-expect-error
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        source: {c: $c, d: $d},
        target: narrow,
        //@ts-expect-error
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        source: {c: $c, d: $d},
        target: [
          exact,
          //@ts-expect-error
          exactBad,
        ],
        //@ts-expect-error
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        source: {c: $c, d: $d},
        target: [
          //@ts-expect-error
          exactBad,
          exactNullable,
        ],
        //@ts-expect-error
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        source: {c: $c, d: $d},
        target: [
          narrow,
          //@ts-expect-error
          exactBad,
        ],
        //@ts-expect-error
        fn: ({c, d}) => ({a: c, b: d}),
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Unmarked error at test line 4 'source: $dataExact,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: { a: string; b: string; }; }; }'.
      Unmarked error at test line 47 'source: {c: $c, d: $d},'
      lack of expected error at test line 6 'target: exactBad,'
      lack of expected error at test line 8 'fn: ({c, d}) => ({a: c, b: d}),'
      lack of expected error at test line 14 'fn: ({c, d}) => ({a: c, b: d}),'
      lack of expected error at test line 21 'exactBad,'
      lack of expected error at test line 24 'fn: ({c, d}) => ({a: c, b: d}),'
      lack of expected error at test line 30 'exactBad,'
      lack of expected error at test line 34 'fn: ({c, d}) => ({a: c, b: d}),'
      lack of expected error at test line 41 'exactBad,'
      lack of expected error at test line 44 'fn: ({c, d}) => ({a: c, b: d}),'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: { a: string; b: string; }; }; }'.
      lack of expected error at test line 49 'target: exactBad,'
      lack of expected error at test line 51 'fn: ({c, d}) => ({a: c, b: d}),'
      lack of expected error at test line 57 'fn: ({c, d}) => ({a: c, b: d}),'
      lack of expected error at test line 64 'exactBad,'
      lack of expected error at test line 67 'fn: ({c, d}) => ({a: c, b: d}),'
      lack of expected error at test line 73 'exactBad,'
      lack of expected error at test line 77 'fn: ({c, d}) => ({a: c, b: d}),'
      lack of expected error at test line 84 'exactBad,'
      lack of expected error at test line 87 'fn: ({c, d}) => ({a: c, b: d}),'
      "
    `)
  })
})
test('source exactBad (should fail)', () => {
  //prettier-ignore
  {
    sample({
      source: $dataExact,
      //@ts-expect-error
      target: exact,
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: $dataExact,
      //@ts-expect-error
      target: narrow,
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: $dataExact,
      //@ts-expect-error
      target: exactNullable,
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exact,
        exactBad,
      ],
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        narrow,
      ],
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: $dataExact,
      target: [
        exactBad,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        narrow,
        exactBad,
      ],
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        narrow,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c, d: $d},
      //@ts-expect-error
      target: exact,
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c, d: $d},
      //@ts-expect-error
      target: narrow,
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c, d: $d},
      //@ts-expect-error
      target: exactNullable,
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exact,
        exactBad,
      ],
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        narrow,
      ],
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        exactBad,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        narrow,
        exactBad,
      ],
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        narrow,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 4 'source: $dataExact,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; b: string; }; }; }'.
    Unmarked error at test line 11 'source: $dataExact,'
    lack of expected error at test line 6 'target: exact,'
    lack of expected error at test line 8 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; }; }; }'.
    Unmarked error at test line 18 'source: $dataExact,'
    lack of expected error at test line 13 'target: narrow,'
    lack of expected error at test line 15 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; b: string; } | null; }; }'.
    Unmarked error at test line 35 'source: $dataExact,'
    lack of expected error at test line 20 'target: exactNullable,'
    lack of expected error at test line 22 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 28 'exact,'
    lack of expected error at test line 32 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 46 'source: $dataExact,'
    lack of expected error at test line 38 'exact,'
    lack of expected error at test line 40 'narrow,'
    lack of expected error at test line 43 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; b: string; } | null; }[]; }'.
    Unmarked error at test line 77 'source: $dataExact,'
    lack of expected error at test line 49 'exact,'
    lack of expected error at test line 51 'exactNullable,'
    lack of expected error at test line 54 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 61 'exactNullable,'
    lack of expected error at test line 64 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 70 'narrow,'
    lack of expected error at test line 74 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; } | null; }[]; }'.
    Unmarked error at test line 88 'source: {c: $c, d: $d},'
    lack of expected error at test line 80 'narrow,'
    lack of expected error at test line 82 'exactNullable,'
    lack of expected error at test line 85 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; b: string; }; }; }'.
    Unmarked error at test line 95 'source: {c: $c, d: $d},'
    lack of expected error at test line 90 'target: exact,'
    lack of expected error at test line 92 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; }; }; }'.
    Unmarked error at test line 102 'source: {c: $c, d: $d},'
    lack of expected error at test line 97 'target: narrow,'
    lack of expected error at test line 99 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; b: string; } | null; }; }'.
    Unmarked error at test line 119 'source: {c: $c, d: $d},'
    lack of expected error at test line 104 'target: exactNullable,'
    lack of expected error at test line 106 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 112 'exact,'
    lack of expected error at test line 116 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 130 'source: {c: $c, d: $d},'
    lack of expected error at test line 122 'exact,'
    lack of expected error at test line 124 'narrow,'
    lack of expected error at test line 127 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; b: string; } | null; }[]; }'.
    Unmarked error at test line 161 'source: {c: $c, d: $d},'
    lack of expected error at test line 133 'exact,'
    lack of expected error at test line 135 'exactNullable,'
    lack of expected error at test line 138 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 145 'exactNullable,'
    lack of expected error at test line 148 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 154 'narrow,'
    lack of expected error at test line 158 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; } | null; }[]; }'.
    lack of expected error at test line 164 'narrow,'
    lack of expected error at test line 166 'exactNullable,'
    lack of expected error at test line 169 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    "
  `)
})
test('source narrow (should fail)', () => {
  //prettier-ignore
  {
    sample({
      source: $dataExact,
      //@ts-expect-error
      target: exact,
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: $dataExact,
      //@ts-expect-error
      target: exactBad,
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: $dataExact,
      //@ts-expect-error
      target: exactNullable,
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactBad,
      ],
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exact,
        narrow,
      ],
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exactBad,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: $dataExact,
      target: [
        narrow,
        //@ts-expect-error
        exactBad,
      ],
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: $dataExact,
      target: [
        narrow,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: {c: $c, d: $d},
      //@ts-expect-error
      target: exact,
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: {c: $c, d: $d},
      //@ts-expect-error
      target: exactBad,
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: {c: $c, d: $d},
      //@ts-expect-error
      target: exactNullable,
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactBad,
      ],
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exact,
        narrow,
      ],
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exactBad,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        narrow,
        //@ts-expect-error
        exactBad,
      ],
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        narrow,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 4 'source: $dataExact,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; }; }; }'.
    Unmarked error at test line 11 'source: $dataExact,'
    lack of expected error at test line 6 'target: exact,'
    lack of expected error at test line 8 'fn: ({c}) => ({a: c}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: string; b: string; }; }; }'.
    Unmarked error at test line 18 'source: $dataExact,'
    lack of expected error at test line 13 'target: exactBad,'
    lack of expected error at test line 15 'fn: ({c}) => ({a: c}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | null; }; }'.
    Unmarked error at test line 25 'source: $dataExact,'
    lack of expected error at test line 20 'target: exactNullable,'
    lack of expected error at test line 22 'fn: ({c}) => ({a: c}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 46 'source: $dataExact,'
    lack of expected error at test line 28 'exact,'
    lack of expected error at test line 30 'exactBad,'
    lack of expected error at test line 33 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 39 'exact,'
    lack of expected error at test line 43 'fn: ({c}) => ({a: c}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | null; }[]; }'.
    Unmarked error at test line 57 'source: $dataExact,'
    lack of expected error at test line 49 'exact,'
    lack of expected error at test line 51 'exactNullable,'
    lack of expected error at test line 54 'fn: ({c}) => ({a: c}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: string; b: string; } | { a: number; b: string; } | null; }[]; }'.
    Unmarked error at test line 88 'source: {c: $c, d: $d},'
    lack of expected error at test line 60 'exactBad,'
    lack of expected error at test line 62 'exactNullable,'
    lack of expected error at test line 65 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 72 'exactBad,'
    lack of expected error at test line 75 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 82 'exactNullable,'
    lack of expected error at test line 85 'fn: ({c}) => ({a: c}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; }; }; }'.
    Unmarked error at test line 95 'source: {c: $c, d: $d},'
    lack of expected error at test line 90 'target: exact,'
    lack of expected error at test line 92 'fn: ({c}) => ({a: c}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: string; b: string; }; }; }'.
    Unmarked error at test line 102 'source: {c: $c, d: $d},'
    lack of expected error at test line 97 'target: exactBad,'
    lack of expected error at test line 99 'fn: ({c}) => ({a: c}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | null; }; }'.
    Unmarked error at test line 109 'source: {c: $c, d: $d},'
    lack of expected error at test line 104 'target: exactNullable,'
    lack of expected error at test line 106 'fn: ({c}) => ({a: c}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 130 'source: {c: $c, d: $d},'
    lack of expected error at test line 112 'exact,'
    lack of expected error at test line 114 'exactBad,'
    lack of expected error at test line 117 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 123 'exact,'
    lack of expected error at test line 127 'fn: ({c}) => ({a: c}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | null; }[]; }'.
    Unmarked error at test line 141 'source: {c: $c, d: $d},'
    lack of expected error at test line 133 'exact,'
    lack of expected error at test line 135 'exactNullable,'
    lack of expected error at test line 138 'fn: ({c}) => ({a: c}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: string; b: string; } | { a: number; b: string; } | null; }[]; }'.
    lack of expected error at test line 144 'exactBad,'
    lack of expected error at test line 146 'exactNullable,'
    lack of expected error at test line 149 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 156 'exactBad,'
    lack of expected error at test line 159 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 166 'exactNullable,'
    lack of expected error at test line 169 'fn: ({c}) => ({a: c}),'
    "
  `)
})
test('source exactNullable (should fail)', () => {
  //prettier-ignore
  {
    sample({
      source: $dataExact,
      //@ts-expect-error
      target: exact,
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: $dataExact,
      //@ts-expect-error
      target: exactBad,
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: $dataExact,
      //@ts-expect-error
      target: narrow,
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactBad,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        narrow,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exact,
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exactBad,
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        narrow,
        //@ts-expect-error
        exactBad,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        narrow,
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      //@ts-expect-error
      target: exact,
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      //@ts-expect-error
      target: exactBad,
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      //@ts-expect-error
      target: narrow,
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactBad,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        narrow,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exact,
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exactBad,
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        narrow,
        //@ts-expect-error
        exactBad,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        narrow,
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 4 'source: $dataExact,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; b: string; }; }; }'.
    Unmarked error at test line 11 'source: $dataExact,'
    lack of expected error at test line 6 'target: exact,'
    lack of expected error at test line 8 'fn: ({c, d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; }; }; }'.
    Unmarked error at test line 18 'source: $dataExact,'
    lack of expected error at test line 13 'target: exactBad,'
    lack of expected error at test line 15 'fn: ({c, d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; }; }; }'.
    Unmarked error at test line 25 'source: $dataExact,'
    lack of expected error at test line 20 'target: narrow,'
    lack of expected error at test line 22 'fn: ({c, d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 36 'source: $dataExact,'
    lack of expected error at test line 28 'exact,'
    lack of expected error at test line 30 'exactBad,'
    lack of expected error at test line 33 'fn: ({c, d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 67 'source: $dataExact,'
    lack of expected error at test line 39 'exact,'
    lack of expected error at test line 41 'narrow,'
    lack of expected error at test line 44 'fn: ({c, d}): ExactNullable => null as any,'
    lack of expected error at test line 50 'exact,'
    lack of expected error at test line 54 'fn: ({c, d}): ExactNullable => null as any,'
    lack of expected error at test line 60 'exactBad,'
    lack of expected error at test line 64 'fn: ({c, d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; }; }[]; }'.
    Unmarked error at test line 88 'source: {c: $c, d: $d},'
    lack of expected error at test line 70 'narrow,'
    lack of expected error at test line 72 'exactBad,'
    lack of expected error at test line 75 'fn: ({c, d}): ExactNullable => null as any,'
    lack of expected error at test line 81 'narrow,'
    lack of expected error at test line 85 'fn: ({c, d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; b: string; }; }; }'.
    Unmarked error at test line 95 'source: {c: $c, d: $d},'
    lack of expected error at test line 90 'target: exact,'
    lack of expected error at test line 92 'fn: ({c, d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; }; }; }'.
    Unmarked error at test line 102 'source: {c: $c, d: $d},'
    lack of expected error at test line 97 'target: exactBad,'
    lack of expected error at test line 99 'fn: ({c, d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; }; }; }'.
    Unmarked error at test line 109 'source: {c: $c, d: $d},'
    lack of expected error at test line 104 'target: narrow,'
    lack of expected error at test line 106 'fn: ({c, d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 120 'source: {c: $c, d: $d},'
    lack of expected error at test line 112 'exact,'
    lack of expected error at test line 114 'exactBad,'
    lack of expected error at test line 117 'fn: ({c, d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 151 'source: {c: $c, d: $d},'
    lack of expected error at test line 123 'exact,'
    lack of expected error at test line 125 'narrow,'
    lack of expected error at test line 128 'fn: ({c, d}): ExactNullable => null as any,'
    lack of expected error at test line 134 'exact,'
    lack of expected error at test line 138 'fn: ({c, d}): ExactNullable => null as any,'
    lack of expected error at test line 144 'exactBad,'
    lack of expected error at test line 148 'fn: ({c, d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; }; }[]; }'.
    lack of expected error at test line 154 'narrow,'
    lack of expected error at test line 156 'exactBad,'
    lack of expected error at test line 159 'fn: ({c, d}): ExactNullable => null as any,'
    lack of expected error at test line 165 'narrow,'
    lack of expected error at test line 169 'fn: ({c, d}): ExactNullable => null as any,'
    "
  `)
})
describe('source and clock exact', () => {
  test('source and clock exact (should pass)', () => {
    //prettier-ignore
    {
      sample({source:$dataSrc, clock:dataClock, target:exact                 , fn:({c}, {d}) => ({a: c, b: d})})
      sample({source:$dataSrc, clock:dataClock, target:exactNullable         , fn:({c}, {d}) => ({a: c, b: d})})
      sample({source:$dataSrc, clock:dataClock, target:[exact,narrow]        , fn:({c}, {d}) => ({a: c, b: d})})
      sample({source:$dataSrc, clock:dataClock, target:[exact,exactNullable] , fn:({c}, {d}) => ({a: c, b: d})})
      sample({source:$dataSrc, clock:dataClock, target:[narrow,exactNullable], fn:({c}, {d}) => ({a: c, b: d})})
      sample({source:{c: $c} , clock:dataClock, target:exact                 , fn:({c}, {d}) => ({a: c, b: d})})
      sample({source:{c: $c} , clock:dataClock, target:exactNullable         , fn:({c}, {d}) => ({a: c, b: d})})
      sample({source:{c: $c} , clock:dataClock, target:[exact,narrow]        , fn:({c}, {d}) => ({a: c, b: d})})
      sample({source:{c: $c} , clock:dataClock, target:[exact,exactNullable] , fn:({c}, {d}) => ({a: c, b: d})})
      sample({source:{c: $c} , clock:dataClock, target:[narrow,exactNullable], fn:({c}, {d}) => ({a: c, b: d})})
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('source and clock exact (should fail)', () => {
    //prettier-ignore
    {
      sample({
        source: $dataSrc,
        clock: dataClock,
        //@ts-expect-error
        target: exactBad,
        //@ts-expect-error
        fn: ({c}, {d}) => ({a: c, b: d}),
      })
      sample({
        source: $dataSrc,
        clock: dataClock,
        target: narrow,
        //@ts-expect-error
        fn: ({c}, {d}) => ({a: c, b: d}),
      })
      sample({
        source: $dataSrc,
        clock: dataClock,
        target: [
          exact,
          //@ts-expect-error
          exactBad,
        ],
        //@ts-expect-error
        fn: ({c}, {d}) => ({a: c, b: d}),
      })
      sample({
        source: $dataSrc,
        clock: dataClock,
        target: [
          //@ts-expect-error
          exactBad,
          exactNullable,
        ],
        //@ts-expect-error
        fn: ({c}, {d}) => ({a: c, b: d}),
      })
      sample({
        source: $dataSrc,
        clock: dataClock,
        target: [
          narrow,
          //@ts-expect-error
          exactBad,
        ],
        //@ts-expect-error
        fn: ({c}, {d}) => ({a: c, b: d}),
      })
      sample({
        source: {c: $c},
        clock: dataClock,
        //@ts-expect-error
        target: exactBad,
        //@ts-expect-error
        fn: ({c}, {d}) => ({a: c, b: d}),
      })
      sample({
        source: {c: $c},
        clock: dataClock,
        target: narrow,
        //@ts-expect-error
        fn: ({c}, {d}) => ({a: c, b: d}),
      })
      sample({
        source: {c: $c},
        clock: dataClock,
        target: [
          exact,
          //@ts-expect-error
          exactBad,
        ],
        //@ts-expect-error
        fn: ({c}, {d}) => ({a: c, b: d}),
      })
      sample({
        source: {c: $c},
        clock: dataClock,
        target: [
          //@ts-expect-error
          exactBad,
          exactNullable,
        ],
        //@ts-expect-error
        fn: ({c}, {d}) => ({a: c, b: d}),
      })
      sample({
        source: {c: $c},
        clock: dataClock,
        target: [
          narrow,
          //@ts-expect-error
          exactBad,
        ],
        //@ts-expect-error
        fn: ({c}, {d}) => ({a: c, b: d}),
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Unmarked error at test line 4 'source: $dataSrc,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: { a: string; b: string; }; }; }'.
      Unmarked error at test line 52 'source: {c: $c},'
      lack of expected error at test line 7 'target: exactBad,'
      lack of expected error at test line 9 'fn: ({c}, {d}) => ({a: c, b: d}),'
      lack of expected error at test line 16 'fn: ({c}, {d}) => ({a: c, b: d}),'
      lack of expected error at test line 24 'exactBad,'
      lack of expected error at test line 27 'fn: ({c}, {d}) => ({a: c, b: d}),'
      lack of expected error at test line 34 'exactBad,'
      lack of expected error at test line 38 'fn: ({c}, {d}) => ({a: c, b: d}),'
      lack of expected error at test line 46 'exactBad,'
      lack of expected error at test line 49 'fn: ({c}, {d}) => ({a: c, b: d}),'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: { a: string; b: string; }; }; }'.
      lack of expected error at test line 55 'target: exactBad,'
      lack of expected error at test line 57 'fn: ({c}, {d}) => ({a: c, b: d}),'
      lack of expected error at test line 64 'fn: ({c}, {d}) => ({a: c, b: d}),'
      lack of expected error at test line 72 'exactBad,'
      lack of expected error at test line 75 'fn: ({c}, {d}) => ({a: c, b: d}),'
      lack of expected error at test line 82 'exactBad,'
      lack of expected error at test line 86 'fn: ({c}, {d}) => ({a: c, b: d}),'
      lack of expected error at test line 94 'exactBad,'
      lack of expected error at test line 97 'fn: ({c}, {d}) => ({a: c, b: d}),'
      "
    `)
  })
})
test('source and clock exactBad (should fail)', () => {
  //prettier-ignore
  {
    sample({
      source: $dataSrc,
      clock: dataClock,
      //@ts-expect-error
      target: exact,
      //@ts-expect-error
      fn: (_, {d}) => ({a: "no", b: d}),
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      //@ts-expect-error
      target: narrow,
      //@ts-expect-error
      fn: (_, {d}) => ({a: "no", b: d}),
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      //@ts-expect-error
      target: exactNullable,
      //@ts-expect-error
      fn: (_, {d}) => ({a: "no", b: d}),
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        exact,
        exactBad,
      ],
      //@ts-expect-error
      fn: (_, {d}) => ({a: "no", b: d}),
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        narrow,
      ],
      //@ts-expect-error
      fn: (_, {d}) => ({a: "no", b: d}),
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: (_, {d}) => ({a: "no", b: d}),
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        exactBad,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: (_, {d}) => ({a: "no", b: d}),
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        narrow,
        exactBad,
      ],
      //@ts-expect-error
      fn: (_, {d}) => ({a: "no", b: d}),
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        narrow,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: (_, {d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      //@ts-expect-error
      target: exact,
      //@ts-expect-error
      fn: (_, {d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      //@ts-expect-error
      target: narrow,
      //@ts-expect-error
      fn: (_, {d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      //@ts-expect-error
      target: exactNullable,
      //@ts-expect-error
      fn: (_, {d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        exact,
        exactBad,
      ],
      //@ts-expect-error
      fn: (_, {d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        narrow,
      ],
      //@ts-expect-error
      fn: (_, {d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: (_, {d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        exactBad,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: (_, {d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        narrow,
        exactBad,
      ],
      //@ts-expect-error
      fn: (_, {d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        narrow,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: (_, {d}) => ({a: "no", b: d}),
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 4 'source: $dataSrc,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; b: string; }; }; }'.
    Unmarked error at test line 12 'source: $dataSrc,'
    lack of expected error at test line 7 'target: exact,'
    lack of expected error at test line 9 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; }; }; }'.
    Unmarked error at test line 20 'source: $dataSrc,'
    lack of expected error at test line 15 'target: narrow,'
    lack of expected error at test line 17 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; b: string; } | null; }; }'.
    Unmarked error at test line 39 'source: $dataSrc,'
    lack of expected error at test line 23 'target: exactNullable,'
    lack of expected error at test line 25 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 32 'exact,'
    lack of expected error at test line 36 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 51 'source: $dataSrc,'
    lack of expected error at test line 43 'exact,'
    lack of expected error at test line 45 'narrow,'
    lack of expected error at test line 48 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; b: string; } | null; }[]; }'.
    Unmarked error at test line 85 'source: $dataSrc,'
    lack of expected error at test line 55 'exact,'
    lack of expected error at test line 57 'exactNullable,'
    lack of expected error at test line 60 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 68 'exactNullable,'
    lack of expected error at test line 71 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 78 'narrow,'
    lack of expected error at test line 82 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; } | null; }[]; }'.
    Unmarked error at test line 97 'source: {c: $c},'
    lack of expected error at test line 89 'narrow,'
    lack of expected error at test line 91 'exactNullable,'
    lack of expected error at test line 94 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; b: string; }; }; }'.
    Unmarked error at test line 105 'source: {c: $c},'
    lack of expected error at test line 100 'target: exact,'
    lack of expected error at test line 102 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; }; }; }'.
    Unmarked error at test line 113 'source: {c: $c},'
    lack of expected error at test line 108 'target: narrow,'
    lack of expected error at test line 110 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; b: string; } | null; }; }'.
    Unmarked error at test line 132 'source: {c: $c},'
    lack of expected error at test line 116 'target: exactNullable,'
    lack of expected error at test line 118 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 125 'exact,'
    lack of expected error at test line 129 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 144 'source: {c: $c},'
    lack of expected error at test line 136 'exact,'
    lack of expected error at test line 138 'narrow,'
    lack of expected error at test line 141 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; b: string; } | null; }[]; }'.
    Unmarked error at test line 178 'source: {c: $c},'
    lack of expected error at test line 148 'exact,'
    lack of expected error at test line 150 'exactNullable,'
    lack of expected error at test line 153 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 161 'exactNullable,'
    lack of expected error at test line 164 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 171 'narrow,'
    lack of expected error at test line 175 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; } | null; }[]; }'.
    lack of expected error at test line 182 'narrow,'
    lack of expected error at test line 184 'exactNullable,'
    lack of expected error at test line 187 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    "
  `)
})
test('source and clock narrow (should fail)', () => {
  //prettier-ignore
  {
    sample({
      source: $dataSrc,
      clock: dataClock,
      //@ts-expect-error
      target: exact,
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      //@ts-expect-error
      target: exactBad,
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      //@ts-expect-error
      target: exactNullable,
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactBad,
      ],
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        exact,
        narrow,
      ],
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        exactBad,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        narrow,
        //@ts-expect-error
        exactBad,
      ],
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        narrow,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      //@ts-expect-error
      target: exact,
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      //@ts-expect-error
      target: exactBad,
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      //@ts-expect-error
      target: exactNullable,
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactBad,
      ],
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        exact,
        narrow,
      ],
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        exactBad,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        narrow,
        //@ts-expect-error
        exactBad,
      ],
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        narrow,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 4 'source: $dataSrc,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; }; }; }'.
    Unmarked error at test line 12 'source: $dataSrc,'
    lack of expected error at test line 7 'target: exact,'
    lack of expected error at test line 9 'fn: ({c}) => ({a: c}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: string; b: string; }; }; }'.
    Unmarked error at test line 20 'source: $dataSrc,'
    lack of expected error at test line 15 'target: exactBad,'
    lack of expected error at test line 17 'fn: ({c}) => ({a: c}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | null; }; }'.
    Unmarked error at test line 28 'source: $dataSrc,'
    lack of expected error at test line 23 'target: exactNullable,'
    lack of expected error at test line 25 'fn: ({c}) => ({a: c}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 51 'source: $dataSrc,'
    lack of expected error at test line 32 'exact,'
    lack of expected error at test line 34 'exactBad,'
    lack of expected error at test line 37 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 44 'exact,'
    lack of expected error at test line 48 'fn: ({c}) => ({a: c}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | null; }[]; }'.
    Unmarked error at test line 63 'source: $dataSrc,'
    lack of expected error at test line 55 'exact,'
    lack of expected error at test line 57 'exactNullable,'
    lack of expected error at test line 60 'fn: ({c}) => ({a: c}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: string; b: string; } | { a: number; b: string; } | null; }[]; }'.
    Unmarked error at test line 97 'source: {c: $c},'
    lack of expected error at test line 67 'exactBad,'
    lack of expected error at test line 69 'exactNullable,'
    lack of expected error at test line 72 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 80 'exactBad,'
    lack of expected error at test line 83 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 91 'exactNullable,'
    lack of expected error at test line 94 'fn: ({c}) => ({a: c}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; }; }; }'.
    Unmarked error at test line 105 'source: {c: $c},'
    lack of expected error at test line 100 'target: exact,'
    lack of expected error at test line 102 'fn: ({c}) => ({a: c}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: string; b: string; }; }; }'.
    Unmarked error at test line 113 'source: {c: $c},'
    lack of expected error at test line 108 'target: exactBad,'
    lack of expected error at test line 110 'fn: ({c}) => ({a: c}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | null; }; }'.
    Unmarked error at test line 121 'source: {c: $c},'
    lack of expected error at test line 116 'target: exactNullable,'
    lack of expected error at test line 118 'fn: ({c}) => ({a: c}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 144 'source: {c: $c},'
    lack of expected error at test line 125 'exact,'
    lack of expected error at test line 127 'exactBad,'
    lack of expected error at test line 130 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 137 'exact,'
    lack of expected error at test line 141 'fn: ({c}) => ({a: c}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | null; }[]; }'.
    Unmarked error at test line 156 'source: {c: $c},'
    lack of expected error at test line 148 'exact,'
    lack of expected error at test line 150 'exactNullable,'
    lack of expected error at test line 153 'fn: ({c}) => ({a: c}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: string; b: string; } | { a: number; b: string; } | null; }[]; }'.
    lack of expected error at test line 160 'exactBad,'
    lack of expected error at test line 162 'exactNullable,'
    lack of expected error at test line 165 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 173 'exactBad,'
    lack of expected error at test line 176 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 184 'exactNullable,'
    lack of expected error at test line 187 'fn: ({c}) => ({a: c}),'
    "
  `)
})
test('source and clock exactNullable (should fail)', () => {
  //prettier-ignore
  {
    sample({
      source: $dataSrc,
      clock: dataClock,
      //@ts-expect-error
      target: exact,
      //@ts-expect-error
      fn: ({c}, {d}): ExactNullable => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      //@ts-expect-error
      target: exactBad,
      //@ts-expect-error
      fn: ({c}, {d}): ExactNullable => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      //@ts-expect-error
      target: narrow,
      //@ts-expect-error
      fn: ({c}, {d}): ExactNullable => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactBad,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactNullable => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        narrow,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactNullable => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        exact,
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactNullable => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        exactBad,
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactNullable => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        narrow,
        //@ts-expect-error
        exactBad,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactNullable => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        narrow,
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      //@ts-expect-error
      target: exact,
      //@ts-expect-error
      fn: ({c}, {d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      //@ts-expect-error
      target: exactBad,
      //@ts-expect-error
      fn: ({c}, {d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      //@ts-expect-error
      target: narrow,
      //@ts-expect-error
      fn: ({c}, {d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactBad,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        narrow,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        exact,
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        exactBad,
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        narrow,
        //@ts-expect-error
        exactBad,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        narrow,
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactNullable => null as any,
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 4 'source: $dataSrc,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; b: string; }; }; }'.
    Unmarked error at test line 12 'source: $dataSrc,'
    lack of expected error at test line 7 'target: exact,'
    lack of expected error at test line 9 'fn: ({c}, {d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; }; }; }'.
    Unmarked error at test line 20 'source: $dataSrc,'
    lack of expected error at test line 15 'target: exactBad,'
    lack of expected error at test line 17 'fn: ({c}, {d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; }; }; }'.
    Unmarked error at test line 28 'source: $dataSrc,'
    lack of expected error at test line 23 'target: narrow,'
    lack of expected error at test line 25 'fn: ({c}, {d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 40 'source: $dataSrc,'
    lack of expected error at test line 32 'exact,'
    lack of expected error at test line 34 'exactBad,'
    lack of expected error at test line 37 'fn: ({c}, {d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 74 'source: $dataSrc,'
    lack of expected error at test line 44 'exact,'
    lack of expected error at test line 46 'narrow,'
    lack of expected error at test line 49 'fn: ({c}, {d}): ExactNullable => null as any,'
    lack of expected error at test line 56 'exact,'
    lack of expected error at test line 60 'fn: ({c}, {d}): ExactNullable => null as any,'
    lack of expected error at test line 67 'exactBad,'
    lack of expected error at test line 71 'fn: ({c}, {d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; }; }[]; }'.
    Unmarked error at test line 97 'source: {c: $c},'
    lack of expected error at test line 78 'narrow,'
    lack of expected error at test line 80 'exactBad,'
    lack of expected error at test line 83 'fn: ({c}, {d}): ExactNullable => null as any,'
    lack of expected error at test line 90 'narrow,'
    lack of expected error at test line 94 'fn: ({c}, {d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; b: string; }; }; }'.
    Unmarked error at test line 105 'source: {c: $c},'
    lack of expected error at test line 100 'target: exact,'
    lack of expected error at test line 102 'fn: ({c}, {d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; }; }; }'.
    Unmarked error at test line 113 'source: {c: $c},'
    lack of expected error at test line 108 'target: exactBad,'
    lack of expected error at test line 110 'fn: ({c}, {d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; }; }; }'.
    Unmarked error at test line 121 'source: {c: $c},'
    lack of expected error at test line 116 'target: narrow,'
    lack of expected error at test line 118 'fn: ({c}, {d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 133 'source: {c: $c},'
    lack of expected error at test line 125 'exact,'
    lack of expected error at test line 127 'exactBad,'
    lack of expected error at test line 130 'fn: ({c}, {d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 167 'source: {c: $c},'
    lack of expected error at test line 137 'exact,'
    lack of expected error at test line 139 'narrow,'
    lack of expected error at test line 142 'fn: ({c}, {d}): ExactNullable => null as any,'
    lack of expected error at test line 149 'exact,'
    lack of expected error at test line 153 'fn: ({c}, {d}): ExactNullable => null as any,'
    lack of expected error at test line 160 'exactBad,'
    lack of expected error at test line 164 'fn: ({c}, {d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; }; }[]; }'.
    lack of expected error at test line 171 'narrow,'
    lack of expected error at test line 173 'exactBad,'
    lack of expected error at test line 176 'fn: ({c}, {d}): ExactNullable => null as any,'
    lack of expected error at test line 183 'narrow,'
    lack of expected error at test line 187 'fn: ({c}, {d}): ExactNullable => null as any,'
    "
  `)
})
