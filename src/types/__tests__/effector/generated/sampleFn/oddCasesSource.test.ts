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
  test('assert fn args (should pass)', () => {
    //prettier-ignore
    {
      sample({
        source: $dataExact,
        //@ts-expect-error
        target: exact,
        fn: ({c, d}: DataExact) => ({a: c, b: d}),
      })
      sample({
        source: {c: $c, d: $d},
        //@ts-expect-error
        target: exact,
        fn: ({c, d}: DataExact) => ({a: c, b: d}),
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      lack of expected error at test line 6 'target: exact,'
      lack of expected error at test line 12 'target: exact,'
      "
    `)
  })
})
describe('source exact', () => {
  test('source exact (should pass)', () => {
    //prettier-ignore
    {
      sample({source:$dataExact    , target:exactNarrow                  , fn:({c, d}) => ({a: c, b: d})})
      sample({source:$dataExact    , target:exactExactBad                , fn:({c, d}) => ({a: c, b: d})})
      sample({source:$dataExact    , target:[exact,exactNarrow]          , fn:({c, d}) => ({a: c, b: d})})
      sample({source:$dataExact    , target:[exact,exactExactBad]        , fn:({c, d}) => ({a: c, b: d})})
      sample({source:$dataExact    , target:[narrow,exactExactBad]       , fn:({c, d}) => ({a: c, b: d})})
      sample({source:$dataExact    , target:[exactNarrow,exactNullable]  , fn:({c, d}) => ({a: c, b: d})})
      sample({source:$dataExact    , target:[exactExactBad,exactNullable], fn:({c, d}) => ({a: c, b: d})})
      sample({source:{c: $c, d: $d}, target:exactNarrow                  , fn:({c, d}) => ({a: c, b: d})})
      sample({source:{c: $c, d: $d}, target:exactExactBad                , fn:({c, d}) => ({a: c, b: d})})
      sample({source:{c: $c, d: $d}, target:[exact,exactNarrow]          , fn:({c, d}) => ({a: c, b: d})})
      sample({source:{c: $c, d: $d}, target:[exact,exactExactBad]        , fn:({c, d}) => ({a: c, b: d})})
      sample({source:{c: $c, d: $d}, target:[narrow,exactExactBad]       , fn:({c, d}) => ({a: c, b: d})})
      sample({source:{c: $c, d: $d}, target:[exactNarrow,exactNullable]  , fn:({c, d}) => ({a: c, b: d})})
      sample({source:{c: $c, d: $d}, target:[exactExactBad,exactNullable], fn:({c, d}) => ({a: c, b: d})})
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
        target: exactBadNarrow,
        //@ts-expect-error
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        source: $dataExact,
        target: [
          exact,
          //@ts-expect-error
          exactBadNarrow,
        ],
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        source: $dataExact,
        target: [
          //@ts-expect-error
          exactBad,
          exactNarrow,
        ],
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        source: $dataExact,
        target: [
          //@ts-expect-error
          exactBad,
          //@ts-expect-error
          exactBadNarrow,
        ],
        //@ts-expect-error
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        source: $dataExact,
        target: [
          //@ts-expect-error
          exactBad,
          exactExactBad,
        ],
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        source: $dataExact,
        target: [
          narrow,
          //@ts-expect-error
          exactBadNarrow,
        ],
        //@ts-expect-error
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        source: $dataExact,
        target: [
          exactNullable,
          //@ts-expect-error
          exactBadNarrow,
        ],
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        source: $dataExact,
        target: [
          exactNarrow,
          //@ts-expect-error
          exactBadNarrow,
        ],
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        source: $dataExact,
        target: [
          exactExactBad,
          //@ts-expect-error
          exactBadNarrow,
        ],
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        source: {c: $c, d: $d},
        //@ts-expect-error
        target: exactBadNarrow,
        //@ts-expect-error
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        source: {c: $c, d: $d},
        target: [
          exact,
          //@ts-expect-error
          exactBadNarrow,
        ],
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        source: {c: $c, d: $d},
        target: [
          //@ts-expect-error
          exactBad,
          exactNarrow,
        ],
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        source: {c: $c, d: $d},
        target: [
          //@ts-expect-error
          exactBad,
          //@ts-expect-error
          exactBadNarrow,
        ],
        //@ts-expect-error
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        source: {c: $c, d: $d},
        target: [
          //@ts-expect-error
          exactBad,
          exactExactBad,
        ],
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        source: {c: $c, d: $d},
        target: [
          narrow,
          //@ts-expect-error
          exactBadNarrow,
        ],
        //@ts-expect-error
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        source: {c: $c, d: $d},
        target: [
          exactNullable,
          //@ts-expect-error
          exactBadNarrow,
        ],
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        source: {c: $c, d: $d},
        target: [
          exactNarrow,
          //@ts-expect-error
          exactBadNarrow,
        ],
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        source: {c: $c, d: $d},
        target: [
          exactExactBad,
          //@ts-expect-error
          exactBadNarrow,
        ],
        fn: ({c, d}) => ({a: c, b: d}),
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      lack of expected error at test line 6 'target: exactBadNarrow,'
      lack of expected error at test line 8 'fn: ({c, d}) => ({a: c, b: d}),'
      lack of expected error at test line 15 'exactBadNarrow,'
      lack of expected error at test line 23 'exactBad,'
      lack of expected error at test line 32 'exactBad,'
      lack of expected error at test line 34 'exactBadNarrow,'
      lack of expected error at test line 37 'fn: ({c, d}) => ({a: c, b: d}),'
      lack of expected error at test line 43 'exactBad,'
      lack of expected error at test line 53 'exactBadNarrow,'
      lack of expected error at test line 56 'fn: ({c, d}) => ({a: c, b: d}),'
      lack of expected error at test line 63 'exactBadNarrow,'
      lack of expected error at test line 72 'exactBadNarrow,'
      lack of expected error at test line 81 'exactBadNarrow,'
      lack of expected error at test line 88 'target: exactBadNarrow,'
      lack of expected error at test line 90 'fn: ({c, d}) => ({a: c, b: d}),'
      lack of expected error at test line 97 'exactBadNarrow,'
      lack of expected error at test line 105 'exactBad,'
      lack of expected error at test line 114 'exactBad,'
      lack of expected error at test line 116 'exactBadNarrow,'
      lack of expected error at test line 119 'fn: ({c, d}) => ({a: c, b: d}),'
      lack of expected error at test line 125 'exactBad,'
      lack of expected error at test line 135 'exactBadNarrow,'
      lack of expected error at test line 138 'fn: ({c, d}) => ({a: c, b: d}),'
      lack of expected error at test line 145 'exactBadNarrow,'
      lack of expected error at test line 154 'exactBadNarrow,'
      lack of expected error at test line 163 'exactBadNarrow,'
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
      target: exactNarrow,
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactNarrow,
      ],
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exact,
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exact,
        exactExactBad,
      ],
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: $dataExact,
      target: [
        exactBad,
        //@ts-expect-error
        exactNarrow,
      ],
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        narrow,
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        narrow,
        exactExactBad,
      ],
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exactNullable,
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exactNarrow,
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
        exactNarrow,
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: $dataExact,
      target: [
        exactExactBad,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c, d: $d},
      //@ts-expect-error
      target: exactNarrow,
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactNarrow,
      ],
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exact,
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exact,
        exactExactBad,
      ],
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        exactBad,
        //@ts-expect-error
        exactNarrow,
      ],
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        narrow,
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        narrow,
        exactExactBad,
      ],
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exactNullable,
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exactNarrow,
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
        exactNarrow,
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        exactExactBad,
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
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; b: string; } | { a: number; }; }; }'.
    Unmarked error at test line 11 'source: $dataExact,'
    lack of expected error at test line 6 'target: exactNarrow,'
    lack of expected error at test line 8 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 81 'source: $dataExact,'
    lack of expected error at test line 14 'exact,'
    lack of expected error at test line 16 'exactNarrow,'
    lack of expected error at test line 19 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 25 'exact,'
    lack of expected error at test line 29 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 35 'exact,'
    lack of expected error at test line 39 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 46 'exactNarrow,'
    lack of expected error at test line 54 'narrow,'
    lack of expected error at test line 58 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 64 'narrow,'
    lack of expected error at test line 68 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 74 'exactNullable,'
    lack of expected error at test line 78 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; } | null; }[]; }'.
    Unmarked error at test line 112 'source: {c: $c, d: $d},'
    lack of expected error at test line 84 'exactNarrow,'
    lack of expected error at test line 86 'exactNullable,'
    lack of expected error at test line 89 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 95 'exactNarrow,'
    lack of expected error at test line 99 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 106 'exactNullable,'
    lack of expected error at test line 109 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; b: string; } | { a: number; }; }; }'.
    Unmarked error at test line 119 'source: {c: $c, d: $d},'
    lack of expected error at test line 114 'target: exactNarrow,'
    lack of expected error at test line 116 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 189 'source: {c: $c, d: $d},'
    lack of expected error at test line 122 'exact,'
    lack of expected error at test line 124 'exactNarrow,'
    lack of expected error at test line 127 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 133 'exact,'
    lack of expected error at test line 137 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 143 'exact,'
    lack of expected error at test line 147 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 154 'exactNarrow,'
    lack of expected error at test line 162 'narrow,'
    lack of expected error at test line 166 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 172 'narrow,'
    lack of expected error at test line 176 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 182 'exactNullable,'
    lack of expected error at test line 186 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; } | null; }[]; }'.
    lack of expected error at test line 192 'exactNarrow,'
    lack of expected error at test line 194 'exactNullable,'
    lack of expected error at test line 197 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 203 'exactNarrow,'
    lack of expected error at test line 207 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 214 'exactNullable,'
    lack of expected error at test line 217 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    "
  `)
})
test('source narrow (should fail)', () => {
  //prettier-ignore
  {
    sample({
      source: $dataExact,
      //@ts-expect-error
      target: exactExactBad,
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exact,
        exactNarrow,
      ],
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exact,
        exactBadNarrow,
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
        exactExactBad,
      ],
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exactBad,
        exactNarrow,
      ],
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exactBad,
        exactBadNarrow,
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
        exactExactBad,
      ],
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: $dataExact,
      target: [
        narrow,
        //@ts-expect-error
        exactExactBad,
      ],
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exactNullable,
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: $dataExact,
      target: [
        exactNarrow,
        //@ts-expect-error
        exactNullable,
      ],
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exactExactBad,
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
        exactExactBad,
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: {c: $c, d: $d},
      //@ts-expect-error
      target: exactExactBad,
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exact,
        exactNarrow,
      ],
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exact,
        exactBadNarrow,
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
        exactExactBad,
      ],
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exactBad,
        exactNarrow,
      ],
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exactBad,
        exactBadNarrow,
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
        exactExactBad,
      ],
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        narrow,
        //@ts-expect-error
        exactExactBad,
      ],
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exactNullable,
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        exactNarrow,
        //@ts-expect-error
        exactNullable,
      ],
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exactExactBad,
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
        exactExactBad,
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 4 'source: $dataExact,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | { a: string; b: string; }; }; }'.
    Unmarked error at test line 30 'source: $dataExact,'
    lack of expected error at test line 6 'target: exactExactBad,'
    lack of expected error at test line 8 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 14 'exact,'
    lack of expected error at test line 23 'exact,'
    lack of expected error at test line 27 'fn: ({c}) => ({a: c}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 60 'source: $dataExact,'
    lack of expected error at test line 33 'exact,'
    lack of expected error at test line 35 'exactExactBad,'
    lack of expected error at test line 38 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 44 'exactBad,'
    lack of expected error at test line 53 'exactBad,'
    lack of expected error at test line 57 'fn: ({c}) => ({a: c}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: string; b: string; } | { a: number; b: string; }; }[]; }'.
    Unmarked error at test line 99 'source: $dataExact,'
    lack of expected error at test line 63 'exactBad,'
    lack of expected error at test line 65 'exactExactBad,'
    lack of expected error at test line 68 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 75 'exactExactBad,'
    lack of expected error at test line 83 'exactNullable,'
    lack of expected error at test line 87 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 94 'exactNullable,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | { a: string; b: string; } | null; }[]; }'.
    Unmarked error at test line 120 'source: {c: $c, d: $d},'
    lack of expected error at test line 102 'exactExactBad,'
    lack of expected error at test line 104 'exactNullable,'
    lack of expected error at test line 107 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 113 'exactExactBad,'
    lack of expected error at test line 117 'fn: ({c}) => ({a: c}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | { a: string; b: string; }; }; }'.
    Unmarked error at test line 146 'source: {c: $c, d: $d},'
    lack of expected error at test line 122 'target: exactExactBad,'
    lack of expected error at test line 124 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 130 'exact,'
    lack of expected error at test line 139 'exact,'
    lack of expected error at test line 143 'fn: ({c}) => ({a: c}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 176 'source: {c: $c, d: $d},'
    lack of expected error at test line 149 'exact,'
    lack of expected error at test line 151 'exactExactBad,'
    lack of expected error at test line 154 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 160 'exactBad,'
    lack of expected error at test line 169 'exactBad,'
    lack of expected error at test line 173 'fn: ({c}) => ({a: c}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: string; b: string; } | { a: number; b: string; }; }[]; }'.
    Unmarked error at test line 215 'source: {c: $c, d: $d},'
    lack of expected error at test line 179 'exactBad,'
    lack of expected error at test line 181 'exactExactBad,'
    lack of expected error at test line 184 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 191 'exactExactBad,'
    lack of expected error at test line 199 'exactNullable,'
    lack of expected error at test line 203 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 210 'exactNullable,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | { a: string; b: string; } | null; }[]; }'.
    lack of expected error at test line 218 'exactExactBad,'
    lack of expected error at test line 220 'exactNullable,'
    lack of expected error at test line 223 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 229 'exactExactBad,'
    lack of expected error at test line 233 'fn: ({c}) => ({a: c}),'
    "
  `)
})
test('source exactNullable (should fail)', () => {
  //prettier-ignore
  {
    sample({
      source: $dataExact,
      //@ts-expect-error
      target: exactNarrow,
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: $dataExact,
      //@ts-expect-error
      target: exactBadNarrow,
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: $dataExact,
      //@ts-expect-error
      target: exactExactBad,
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactNarrow,
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
        exactBadNarrow,
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
        exactExactBad,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exactBad,
        //@ts-expect-error
        exactNarrow,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exactBad,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exactBad,
        //@ts-expect-error
        exactExactBad,
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
        exactBadNarrow,
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
        exactExactBad,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        exactNullable,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exactNarrow,
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exactNarrow,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exactExactBad,
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exactExactBad,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      //@ts-expect-error
      target: exactNarrow,
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      //@ts-expect-error
      target: exactBadNarrow,
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      //@ts-expect-error
      target: exactExactBad,
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactNarrow,
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
        exactBadNarrow,
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
        exactExactBad,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exactBad,
        //@ts-expect-error
        exactNarrow,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exactBad,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exactBad,
        //@ts-expect-error
        exactExactBad,
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
        exactBadNarrow,
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
        exactExactBad,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        exactNullable,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exactNarrow,
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exactNarrow,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exactExactBad,
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exactExactBad,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 4 'source: $dataExact,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; b: string; } | { a: number; }; }; }'.
    Unmarked error at test line 11 'source: $dataExact,'
    lack of expected error at test line 6 'target: exactNarrow,'
    lack of expected error at test line 8 'fn: ({c, d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; }; }; }'.
    Unmarked error at test line 18 'source: $dataExact,'
    lack of expected error at test line 13 'target: exactBadNarrow,'
    lack of expected error at test line 15 'fn: ({c, d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; b: string; } | { a: string; b: string; }; }; }'.
    Unmarked error at test line 25 'source: $dataExact,'
    lack of expected error at test line 20 'target: exactExactBad,'
    lack of expected error at test line 22 'fn: ({c, d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 36 'source: $dataExact,'
    lack of expected error at test line 28 'exact,'
    lack of expected error at test line 30 'exactNarrow,'
    lack of expected error at test line 33 'fn: ({c, d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; }; }[]; }'.
    Unmarked error at test line 47 'source: $dataExact,'
    lack of expected error at test line 39 'exact,'
    lack of expected error at test line 41 'exactBadNarrow,'
    lack of expected error at test line 44 'fn: ({c, d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 58 'source: $dataExact,'
    lack of expected error at test line 50 'exact,'
    lack of expected error at test line 52 'exactExactBad,'
    lack of expected error at test line 55 'fn: ({c, d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; }; }[]; }'.
    Unmarked error at test line 69 'source: $dataExact,'
    lack of expected error at test line 61 'exactBad,'
    lack of expected error at test line 63 'exactNarrow,'
    lack of expected error at test line 66 'fn: ({c, d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; }; }[]; }'.
    Unmarked error at test line 80 'source: $dataExact,'
    lack of expected error at test line 72 'exactBad,'
    lack of expected error at test line 74 'exactBadNarrow,'
    lack of expected error at test line 77 'fn: ({c, d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; b: string; }; }[]; }'.
    Unmarked error at test line 91 'source: $dataExact,'
    lack of expected error at test line 83 'exactBad,'
    lack of expected error at test line 85 'exactExactBad,'
    lack of expected error at test line 88 'fn: ({c, d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 102 'source: $dataExact,'
    lack of expected error at test line 94 'narrow,'
    lack of expected error at test line 96 'exactBadNarrow,'
    lack of expected error at test line 99 'fn: ({c, d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 133 'source: $dataExact,'
    lack of expected error at test line 105 'narrow,'
    lack of expected error at test line 107 'exactExactBad,'
    lack of expected error at test line 110 'fn: ({c, d}): ExactNullable => null as any,'
    lack of expected error at test line 117 'exactBadNarrow,'
    lack of expected error at test line 120 'fn: ({c, d}): ExactNullable => null as any,'
    lack of expected error at test line 126 'exactNarrow,'
    lack of expected error at test line 130 'fn: ({c, d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 154 'source: $dataExact,'
    lack of expected error at test line 136 'exactNarrow,'
    lack of expected error at test line 138 'exactBadNarrow,'
    lack of expected error at test line 141 'fn: ({c, d}): ExactNullable => null as any,'
    lack of expected error at test line 147 'exactExactBad,'
    lack of expected error at test line 151 'fn: ({c, d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; }; }[]; }'.
    Unmarked error at test line 165 'source: {c: $c, d: $d},'
    lack of expected error at test line 157 'exactExactBad,'
    lack of expected error at test line 159 'exactBadNarrow,'
    lack of expected error at test line 162 'fn: ({c, d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; b: string; } | { a: number; }; }; }'.
    Unmarked error at test line 172 'source: {c: $c, d: $d},'
    lack of expected error at test line 167 'target: exactNarrow,'
    lack of expected error at test line 169 'fn: ({c, d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; }; }; }'.
    Unmarked error at test line 179 'source: {c: $c, d: $d},'
    lack of expected error at test line 174 'target: exactBadNarrow,'
    lack of expected error at test line 176 'fn: ({c, d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; b: string; } | { a: string; b: string; }; }; }'.
    Unmarked error at test line 186 'source: {c: $c, d: $d},'
    lack of expected error at test line 181 'target: exactExactBad,'
    lack of expected error at test line 183 'fn: ({c, d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 197 'source: {c: $c, d: $d},'
    lack of expected error at test line 189 'exact,'
    lack of expected error at test line 191 'exactNarrow,'
    lack of expected error at test line 194 'fn: ({c, d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; }; }[]; }'.
    Unmarked error at test line 208 'source: {c: $c, d: $d},'
    lack of expected error at test line 200 'exact,'
    lack of expected error at test line 202 'exactBadNarrow,'
    lack of expected error at test line 205 'fn: ({c, d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 219 'source: {c: $c, d: $d},'
    lack of expected error at test line 211 'exact,'
    lack of expected error at test line 213 'exactExactBad,'
    lack of expected error at test line 216 'fn: ({c, d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; }; }[]; }'.
    Unmarked error at test line 230 'source: {c: $c, d: $d},'
    lack of expected error at test line 222 'exactBad,'
    lack of expected error at test line 224 'exactNarrow,'
    lack of expected error at test line 227 'fn: ({c, d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; }; }[]; }'.
    Unmarked error at test line 241 'source: {c: $c, d: $d},'
    lack of expected error at test line 233 'exactBad,'
    lack of expected error at test line 235 'exactBadNarrow,'
    lack of expected error at test line 238 'fn: ({c, d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; b: string; }; }[]; }'.
    Unmarked error at test line 252 'source: {c: $c, d: $d},'
    lack of expected error at test line 244 'exactBad,'
    lack of expected error at test line 246 'exactExactBad,'
    lack of expected error at test line 249 'fn: ({c, d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 263 'source: {c: $c, d: $d},'
    lack of expected error at test line 255 'narrow,'
    lack of expected error at test line 257 'exactBadNarrow,'
    lack of expected error at test line 260 'fn: ({c, d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 294 'source: {c: $c, d: $d},'
    lack of expected error at test line 266 'narrow,'
    lack of expected error at test line 268 'exactExactBad,'
    lack of expected error at test line 271 'fn: ({c, d}): ExactNullable => null as any,'
    lack of expected error at test line 278 'exactBadNarrow,'
    lack of expected error at test line 281 'fn: ({c, d}): ExactNullable => null as any,'
    lack of expected error at test line 287 'exactNarrow,'
    lack of expected error at test line 291 'fn: ({c, d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 315 'source: {c: $c, d: $d},'
    lack of expected error at test line 297 'exactNarrow,'
    lack of expected error at test line 299 'exactBadNarrow,'
    lack of expected error at test line 302 'fn: ({c, d}): ExactNullable => null as any,'
    lack of expected error at test line 308 'exactExactBad,'
    lack of expected error at test line 312 'fn: ({c, d}): ExactNullable => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; }; }[]; }'.
    lack of expected error at test line 318 'exactExactBad,'
    lack of expected error at test line 320 'exactBadNarrow,'
    lack of expected error at test line 323 'fn: ({c, d}): ExactNullable => null as any,'
    "
  `)
})
test('source exactNarrow (should fail)', () => {
  //prettier-ignore
  {
    sample({
      source: $dataExact,
      //@ts-expect-error
      target: exact,
      //@ts-expect-error
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      source: $dataExact,
      //@ts-expect-error
      target: exactBad,
      //@ts-expect-error
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      source: $dataExact,
      //@ts-expect-error
      target: exactNullable,
      //@ts-expect-error
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      source: $dataExact,
      //@ts-expect-error
      target: exactExactBad,
      //@ts-expect-error
      fn: ({c, d}): ExactNarrow => null as any,
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
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exact,
        narrow,
      ],
      fn: ({c, d}): ExactNarrow => null as any,
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
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exact,
        exactNarrow,
      ],
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactExactBad,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNarrow => null as any,
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
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exactBad,
        exactNarrow,
      ],
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exactBad,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exactBad,
        //@ts-expect-error
        exactExactBad,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        narrow,
        //@ts-expect-error
        exactBad,
      ],
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        narrow,
        //@ts-expect-error
        exactNullable,
      ],
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        narrow,
        //@ts-expect-error
        exactExactBad,
      ],
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exactNullable,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        exactNarrow,
        //@ts-expect-error
        exactNullable,
      ],
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exactExactBad,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exactExactBad,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      //@ts-expect-error
      target: exact,
      //@ts-expect-error
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      //@ts-expect-error
      target: exactBad,
      //@ts-expect-error
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      //@ts-expect-error
      target: exactNullable,
      //@ts-expect-error
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      //@ts-expect-error
      target: exactExactBad,
      //@ts-expect-error
      fn: ({c, d}): ExactNarrow => null as any,
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
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exact,
        narrow,
      ],
      fn: ({c, d}): ExactNarrow => null as any,
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
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exact,
        exactNarrow,
      ],
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactExactBad,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNarrow => null as any,
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
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exactBad,
        exactNarrow,
      ],
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exactBad,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exactBad,
        //@ts-expect-error
        exactExactBad,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        narrow,
        //@ts-expect-error
        exactBad,
      ],
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        narrow,
        //@ts-expect-error
        exactNullable,
      ],
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        narrow,
        //@ts-expect-error
        exactExactBad,
      ],
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exactNullable,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        exactNarrow,
        //@ts-expect-error
        exactNullable,
      ],
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exactExactBad,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exactExactBad,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNarrow => null as any,
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 4 'source: $dataExact,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; }; }; }'.
    Unmarked error at test line 11 'source: $dataExact,'
    lack of expected error at test line 6 'target: exact,'
    lack of expected error at test line 8 'fn: ({c, d}): ExactNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: string; b: string; }; }; }'.
    Unmarked error at test line 18 'source: $dataExact,'
    lack of expected error at test line 13 'target: exactBad,'
    lack of expected error at test line 15 'fn: ({c, d}): ExactNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | null; }; }'.
    Unmarked error at test line 25 'source: $dataExact,'
    lack of expected error at test line 20 'target: exactNullable,'
    lack of expected error at test line 22 'fn: ({c, d}): ExactNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | { a: string; b: string; }; }; }'.
    Unmarked error at test line 32 'source: $dataExact,'
    lack of expected error at test line 27 'target: exactExactBad,'
    lack of expected error at test line 29 'fn: ({c, d}): ExactNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 52 'source: $dataExact,'
    lack of expected error at test line 35 'exact,'
    lack of expected error at test line 37 'exactBad,'
    lack of expected error at test line 40 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 46 'exact,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | null; }[]; }'.
    Unmarked error at test line 83 'source: $dataExact,'
    lack of expected error at test line 55 'exact,'
    lack of expected error at test line 57 'exactNullable,'
    lack of expected error at test line 60 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 66 'exact,'
    lack of expected error at test line 75 'exact,'
    lack of expected error at test line 77 'exactBadNarrow,'
    lack of expected error at test line 80 'fn: ({c, d}): ExactNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 94 'source: $dataExact,'
    lack of expected error at test line 86 'exact,'
    lack of expected error at test line 88 'exactExactBad,'
    lack of expected error at test line 91 'fn: ({c, d}): ExactNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: string; b: string; } | { a: number; b: string; } | null; }[]; }'.
    Unmarked error at test line 125 'source: $dataExact,'
    lack of expected error at test line 97 'exactBad,'
    lack of expected error at test line 99 'exactNullable,'
    lack of expected error at test line 102 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 108 'exactBad,'
    lack of expected error at test line 117 'exactBad,'
    lack of expected error at test line 119 'exactBadNarrow,'
    lack of expected error at test line 122 'fn: ({c, d}): ExactNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: string; b: string; } | { a: number; b: string; }; }[]; }'.
    Unmarked error at test line 183 'source: $dataExact,'
    lack of expected error at test line 128 'exactBad,'
    lack of expected error at test line 130 'exactExactBad,'
    lack of expected error at test line 133 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 140 'exactBad,'
    lack of expected error at test line 149 'exactNullable,'
    lack of expected error at test line 158 'exactExactBad,'
    lack of expected error at test line 166 'exactNullable,'
    lack of expected error at test line 168 'exactBadNarrow,'
    lack of expected error at test line 171 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 178 'exactNullable,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | { a: string; b: string; } | null; }[]; }'.
    Unmarked error at test line 205 'source: {c: $c, d: $d},'
    lack of expected error at test line 186 'exactExactBad,'
    lack of expected error at test line 188 'exactNullable,'
    lack of expected error at test line 191 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 197 'exactExactBad,'
    lack of expected error at test line 199 'exactBadNarrow,'
    lack of expected error at test line 202 'fn: ({c, d}): ExactNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; }; }; }'.
    Unmarked error at test line 212 'source: {c: $c, d: $d},'
    lack of expected error at test line 207 'target: exact,'
    lack of expected error at test line 209 'fn: ({c, d}): ExactNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: string; b: string; }; }; }'.
    Unmarked error at test line 219 'source: {c: $c, d: $d},'
    lack of expected error at test line 214 'target: exactBad,'
    lack of expected error at test line 216 'fn: ({c, d}): ExactNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | null; }; }'.
    Unmarked error at test line 226 'source: {c: $c, d: $d},'
    lack of expected error at test line 221 'target: exactNullable,'
    lack of expected error at test line 223 'fn: ({c, d}): ExactNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | { a: string; b: string; }; }; }'.
    Unmarked error at test line 233 'source: {c: $c, d: $d},'
    lack of expected error at test line 228 'target: exactExactBad,'
    lack of expected error at test line 230 'fn: ({c, d}): ExactNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 253 'source: {c: $c, d: $d},'
    lack of expected error at test line 236 'exact,'
    lack of expected error at test line 238 'exactBad,'
    lack of expected error at test line 241 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 247 'exact,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | null; }[]; }'.
    Unmarked error at test line 284 'source: {c: $c, d: $d},'
    lack of expected error at test line 256 'exact,'
    lack of expected error at test line 258 'exactNullable,'
    lack of expected error at test line 261 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 267 'exact,'
    lack of expected error at test line 276 'exact,'
    lack of expected error at test line 278 'exactBadNarrow,'
    lack of expected error at test line 281 'fn: ({c, d}): ExactNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 295 'source: {c: $c, d: $d},'
    lack of expected error at test line 287 'exact,'
    lack of expected error at test line 289 'exactExactBad,'
    lack of expected error at test line 292 'fn: ({c, d}): ExactNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: string; b: string; } | { a: number; b: string; } | null; }[]; }'.
    Unmarked error at test line 326 'source: {c: $c, d: $d},'
    lack of expected error at test line 298 'exactBad,'
    lack of expected error at test line 300 'exactNullable,'
    lack of expected error at test line 303 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 309 'exactBad,'
    lack of expected error at test line 318 'exactBad,'
    lack of expected error at test line 320 'exactBadNarrow,'
    lack of expected error at test line 323 'fn: ({c, d}): ExactNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: string; b: string; } | { a: number; b: string; }; }[]; }'.
    Unmarked error at test line 384 'source: {c: $c, d: $d},'
    lack of expected error at test line 329 'exactBad,'
    lack of expected error at test line 331 'exactExactBad,'
    lack of expected error at test line 334 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 341 'exactBad,'
    lack of expected error at test line 350 'exactNullable,'
    lack of expected error at test line 359 'exactExactBad,'
    lack of expected error at test line 367 'exactNullable,'
    lack of expected error at test line 369 'exactBadNarrow,'
    lack of expected error at test line 372 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 379 'exactNullable,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | { a: string; b: string; } | null; }[]; }'.
    lack of expected error at test line 387 'exactExactBad,'
    lack of expected error at test line 389 'exactNullable,'
    lack of expected error at test line 392 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 398 'exactExactBad,'
    lack of expected error at test line 400 'exactBadNarrow,'
    lack of expected error at test line 403 'fn: ({c, d}): ExactNarrow => null as any,'
    "
  `)
})
test('source exactBadNarrow (should fail)', () => {
  //prettier-ignore
  {
    sample({
      source: $dataExact,
      //@ts-expect-error
      target: exact,
      //@ts-expect-error
      fn: ({c, d}): ExactBadNarrow => null as any,
    })
    sample({
      source: $dataExact,
      //@ts-expect-error
      target: exactNullable,
      //@ts-expect-error
      fn: ({c, d}): ExactBadNarrow => null as any,
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
      fn: ({c, d}): ExactBadNarrow => null as any,
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
      fn: ({c, d}): ExactBadNarrow => null as any,
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
      fn: ({c, d}): ExactBadNarrow => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactNarrow,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactBadNarrow => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exact,
        exactBadNarrow,
      ],
      fn: ({c, d}): ExactBadNarrow => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactExactBad,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactBadNarrow => null as any,
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
      fn: ({c, d}): ExactBadNarrow => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exactBad,
        //@ts-expect-error
        exactNarrow,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactBadNarrow => null as any,
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
      fn: ({c, d}): ExactBadNarrow => null as any,
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
      fn: ({c, d}): ExactBadNarrow => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        narrow,
        //@ts-expect-error
        exactExactBad,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactBadNarrow => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exactNullable,
        exactBadNarrow,
      ],
      fn: ({c, d}): ExactBadNarrow => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exactNarrow,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactBadNarrow => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exactExactBad,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactBadNarrow => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      //@ts-expect-error
      target: exact,
      //@ts-expect-error
      fn: ({c, d}): ExactBadNarrow => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      //@ts-expect-error
      target: exactNullable,
      //@ts-expect-error
      fn: ({c, d}): ExactBadNarrow => null as any,
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
      fn: ({c, d}): ExactBadNarrow => null as any,
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
      fn: ({c, d}): ExactBadNarrow => null as any,
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
      fn: ({c, d}): ExactBadNarrow => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactNarrow,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactBadNarrow => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exact,
        exactBadNarrow,
      ],
      fn: ({c, d}): ExactBadNarrow => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactExactBad,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactBadNarrow => null as any,
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
      fn: ({c, d}): ExactBadNarrow => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exactBad,
        //@ts-expect-error
        exactNarrow,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactBadNarrow => null as any,
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
      fn: ({c, d}): ExactBadNarrow => null as any,
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
      fn: ({c, d}): ExactBadNarrow => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        narrow,
        //@ts-expect-error
        exactExactBad,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactBadNarrow => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exactNullable,
        exactBadNarrow,
      ],
      fn: ({c, d}): ExactBadNarrow => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exactNarrow,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactBadNarrow => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exactExactBad,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactBadNarrow => null as any,
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 4 'source: $dataExact,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; }; }; }'.
    Unmarked error at test line 11 'source: $dataExact,'
    lack of expected error at test line 6 'target: exact,'
    lack of expected error at test line 8 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; } | null; }; }'.
    Unmarked error at test line 18 'source: $dataExact,'
    lack of expected error at test line 13 'target: exactNullable,'
    lack of expected error at test line 15 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 29 'source: $dataExact,'
    lack of expected error at test line 21 'exact,'
    lack of expected error at test line 23 'exactBad,'
    lack of expected error at test line 26 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 40 'source: $dataExact,'
    lack of expected error at test line 32 'exact,'
    lack of expected error at test line 34 'narrow,'
    lack of expected error at test line 37 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; } | null; }[]; }'.
    Unmarked error at test line 51 'source: $dataExact,'
    lack of expected error at test line 43 'exact,'
    lack of expected error at test line 45 'exactNullable,'
    lack of expected error at test line 48 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 71 'source: $dataExact,'
    lack of expected error at test line 54 'exact,'
    lack of expected error at test line 56 'exactNarrow,'
    lack of expected error at test line 59 'fn: ({c, d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 65 'exact,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 82 'source: $dataExact,'
    lack of expected error at test line 74 'exact,'
    lack of expected error at test line 76 'exactExactBad,'
    lack of expected error at test line 79 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: string; b: string; } | { a: number; b: string; } | null; }[]; }'.
    Unmarked error at test line 115 'source: $dataExact,'
    lack of expected error at test line 85 'exactBad,'
    lack of expected error at test line 87 'exactNullable,'
    lack of expected error at test line 90 'fn: ({c, d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 96 'exactBad,'
    lack of expected error at test line 98 'exactNarrow,'
    lack of expected error at test line 101 'fn: ({c, d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 107 'narrow,'
    lack of expected error at test line 109 'exactBad,'
    lack of expected error at test line 112 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; } | null; }[]; }'.
    Unmarked error at test line 146 'source: $dataExact,'
    lack of expected error at test line 118 'narrow,'
    lack of expected error at test line 120 'exactNullable,'
    lack of expected error at test line 123 'fn: ({c, d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 129 'narrow,'
    lack of expected error at test line 131 'exactExactBad,'
    lack of expected error at test line 134 'fn: ({c, d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 140 'exactNullable,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; } | null; }[]; }'.
    Unmarked error at test line 157 'source: $dataExact,'
    lack of expected error at test line 149 'exactNarrow,'
    lack of expected error at test line 151 'exactNullable,'
    lack of expected error at test line 154 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; } | { a: string; b: string; } | null; }[]; }'.
    Unmarked error at test line 168 'source: {c: $c, d: $d},'
    lack of expected error at test line 160 'exactExactBad,'
    lack of expected error at test line 162 'exactNullable,'
    lack of expected error at test line 165 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; }; }; }'.
    Unmarked error at test line 175 'source: {c: $c, d: $d},'
    lack of expected error at test line 170 'target: exact,'
    lack of expected error at test line 172 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; } | null; }; }'.
    Unmarked error at test line 182 'source: {c: $c, d: $d},'
    lack of expected error at test line 177 'target: exactNullable,'
    lack of expected error at test line 179 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 193 'source: {c: $c, d: $d},'
    lack of expected error at test line 185 'exact,'
    lack of expected error at test line 187 'exactBad,'
    lack of expected error at test line 190 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 204 'source: {c: $c, d: $d},'
    lack of expected error at test line 196 'exact,'
    lack of expected error at test line 198 'narrow,'
    lack of expected error at test line 201 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; } | null; }[]; }'.
    Unmarked error at test line 215 'source: {c: $c, d: $d},'
    lack of expected error at test line 207 'exact,'
    lack of expected error at test line 209 'exactNullable,'
    lack of expected error at test line 212 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 235 'source: {c: $c, d: $d},'
    lack of expected error at test line 218 'exact,'
    lack of expected error at test line 220 'exactNarrow,'
    lack of expected error at test line 223 'fn: ({c, d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 229 'exact,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 246 'source: {c: $c, d: $d},'
    lack of expected error at test line 238 'exact,'
    lack of expected error at test line 240 'exactExactBad,'
    lack of expected error at test line 243 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: string; b: string; } | { a: number; b: string; } | null; }[]; }'.
    Unmarked error at test line 279 'source: {c: $c, d: $d},'
    lack of expected error at test line 249 'exactBad,'
    lack of expected error at test line 251 'exactNullable,'
    lack of expected error at test line 254 'fn: ({c, d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 260 'exactBad,'
    lack of expected error at test line 262 'exactNarrow,'
    lack of expected error at test line 265 'fn: ({c, d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 271 'narrow,'
    lack of expected error at test line 273 'exactBad,'
    lack of expected error at test line 276 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; } | null; }[]; }'.
    Unmarked error at test line 310 'source: {c: $c, d: $d},'
    lack of expected error at test line 282 'narrow,'
    lack of expected error at test line 284 'exactNullable,'
    lack of expected error at test line 287 'fn: ({c, d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 293 'narrow,'
    lack of expected error at test line 295 'exactExactBad,'
    lack of expected error at test line 298 'fn: ({c, d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 304 'exactNullable,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; } | null; }[]; }'.
    Unmarked error at test line 321 'source: {c: $c, d: $d},'
    lack of expected error at test line 313 'exactNarrow,'
    lack of expected error at test line 315 'exactNullable,'
    lack of expected error at test line 318 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; } | { a: string; b: string; } | null; }[]; }'.
    lack of expected error at test line 324 'exactExactBad,'
    lack of expected error at test line 326 'exactNullable,'
    lack of expected error at test line 329 'fn: ({c, d}): ExactBadNarrow => null as any,'
    "
  `)
})
test('source exactExactBad (should fail)', () => {
  //prettier-ignore
  {
    sample({
      source: $dataExact,
      //@ts-expect-error
      target: exact,
      //@ts-expect-error
      fn: ({c, d}): ExactExactBad => null as any,
    })
    sample({
      source: $dataExact,
      //@ts-expect-error
      target: narrow,
      //@ts-expect-error
      fn: ({c, d}): ExactExactBad => null as any,
    })
    sample({
      source: $dataExact,
      //@ts-expect-error
      target: exactNullable,
      //@ts-expect-error
      fn: ({c, d}): ExactExactBad => null as any,
    })
    sample({
      source: $dataExact,
      //@ts-expect-error
      target: exactNarrow,
      //@ts-expect-error
      fn: ({c, d}): ExactExactBad => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactBad,
      ],
      fn: ({c, d}): ExactExactBad => null as any,
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
      fn: ({c, d}): ExactExactBad => null as any,
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
      fn: ({c, d}): ExactExactBad => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactNarrow,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactExactBad => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactExactBad => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exact,
        exactExactBad,
      ],
      fn: ({c, d}): ExactExactBad => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exactBad,
        //@ts-expect-error
        exactNullable,
      ],
      fn: ({c, d}): ExactExactBad => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exactBad,
        //@ts-expect-error
        exactNarrow,
      ],
      fn: ({c, d}): ExactExactBad => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        narrow,
        //@ts-expect-error
        exactBad,
      ],
      fn: ({c, d}): ExactExactBad => null as any,
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
      fn: ({c, d}): ExactExactBad => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        narrow,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactExactBad => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        narrow,
        exactExactBad,
      ],
      fn: ({c, d}): ExactExactBad => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exactNullable,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactExactBad => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exactNarrow,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactExactBad => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exactNarrow,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactExactBad => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        exactExactBad,
        //@ts-expect-error
        exactNullable,
      ],
      fn: ({c, d}): ExactExactBad => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      //@ts-expect-error
      target: exact,
      //@ts-expect-error
      fn: ({c, d}): ExactExactBad => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      //@ts-expect-error
      target: narrow,
      //@ts-expect-error
      fn: ({c, d}): ExactExactBad => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      //@ts-expect-error
      target: exactNullable,
      //@ts-expect-error
      fn: ({c, d}): ExactExactBad => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      //@ts-expect-error
      target: exactNarrow,
      //@ts-expect-error
      fn: ({c, d}): ExactExactBad => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactBad,
      ],
      fn: ({c, d}): ExactExactBad => null as any,
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
      fn: ({c, d}): ExactExactBad => null as any,
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
      fn: ({c, d}): ExactExactBad => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactNarrow,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactExactBad => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactExactBad => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exact,
        exactExactBad,
      ],
      fn: ({c, d}): ExactExactBad => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exactBad,
        //@ts-expect-error
        exactNullable,
      ],
      fn: ({c, d}): ExactExactBad => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exactBad,
        //@ts-expect-error
        exactNarrow,
      ],
      fn: ({c, d}): ExactExactBad => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        narrow,
        //@ts-expect-error
        exactBad,
      ],
      fn: ({c, d}): ExactExactBad => null as any,
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
      fn: ({c, d}): ExactExactBad => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        narrow,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactExactBad => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        narrow,
        exactExactBad,
      ],
      fn: ({c, d}): ExactExactBad => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exactNullable,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactExactBad => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exactNarrow,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactExactBad => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exactNarrow,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactExactBad => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        exactExactBad,
        //@ts-expect-error
        exactNullable,
      ],
      fn: ({c, d}): ExactExactBad => null as any,
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 4 'source: $dataExact,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; b: string; }; }; }'.
    Unmarked error at test line 11 'source: $dataExact,'
    lack of expected error at test line 6 'target: exact,'
    lack of expected error at test line 8 'fn: ({c, d}): ExactExactBad => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; }; }; }'.
    Unmarked error at test line 18 'source: $dataExact,'
    lack of expected error at test line 13 'target: narrow,'
    lack of expected error at test line 15 'fn: ({c, d}): ExactExactBad => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; b: string; } | null; }; }'.
    Unmarked error at test line 25 'source: $dataExact,'
    lack of expected error at test line 20 'target: exactNullable,'
    lack of expected error at test line 22 'fn: ({c, d}): ExactExactBad => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; b: string; } | { a: number; }; }; }'.
    Unmarked error at test line 42 'source: $dataExact,'
    lack of expected error at test line 27 'target: exactNarrow,'
    lack of expected error at test line 29 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 35 'exact,'
    lack of expected error at test line 37 'exactBad,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 53 'source: $dataExact,'
    lack of expected error at test line 45 'exact,'
    lack of expected error at test line 47 'narrow,'
    lack of expected error at test line 50 'fn: ({c, d}): ExactExactBad => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; b: string; } | null; }[]; }'.
    Unmarked error at test line 64 'source: $dataExact,'
    lack of expected error at test line 56 'exact,'
    lack of expected error at test line 58 'exactNullable,'
    lack of expected error at test line 61 'fn: ({c, d}): ExactExactBad => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 125 'source: $dataExact,'
    lack of expected error at test line 67 'exact,'
    lack of expected error at test line 69 'exactNarrow,'
    lack of expected error at test line 72 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 78 'exact,'
    lack of expected error at test line 80 'exactBadNarrow,'
    lack of expected error at test line 83 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 89 'exact,'
    lack of expected error at test line 98 'exactBad,'
    lack of expected error at test line 100 'exactNullable,'
    lack of expected error at test line 108 'exactBad,'
    lack of expected error at test line 110 'exactNarrow,'
    lack of expected error at test line 118 'narrow,'
    lack of expected error at test line 120 'exactBad,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; } | null; }[]; }'.
    Unmarked error at test line 167 'source: $dataExact,'
    lack of expected error at test line 128 'narrow,'
    lack of expected error at test line 130 'exactNullable,'
    lack of expected error at test line 133 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 139 'narrow,'
    lack of expected error at test line 141 'exactBadNarrow,'
    lack of expected error at test line 144 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 150 'narrow,'
    lack of expected error at test line 159 'exactNullable,'
    lack of expected error at test line 161 'exactBadNarrow,'
    lack of expected error at test line 164 'fn: ({c, d}): ExactExactBad => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; } | null; }[]; }'.
    Unmarked error at test line 198 'source: {c: $c, d: $d},'
    lack of expected error at test line 170 'exactNarrow,'
    lack of expected error at test line 172 'exactNullable,'
    lack of expected error at test line 175 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 181 'exactNarrow,'
    lack of expected error at test line 183 'exactBadNarrow,'
    lack of expected error at test line 186 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 193 'exactNullable,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; b: string; }; }; }'.
    Unmarked error at test line 205 'source: {c: $c, d: $d},'
    lack of expected error at test line 200 'target: exact,'
    lack of expected error at test line 202 'fn: ({c, d}): ExactExactBad => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; }; }; }'.
    Unmarked error at test line 212 'source: {c: $c, d: $d},'
    lack of expected error at test line 207 'target: narrow,'
    lack of expected error at test line 209 'fn: ({c, d}): ExactExactBad => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; b: string; } | null; }; }'.
    Unmarked error at test line 219 'source: {c: $c, d: $d},'
    lack of expected error at test line 214 'target: exactNullable,'
    lack of expected error at test line 216 'fn: ({c, d}): ExactExactBad => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; b: string; } | { a: number; }; }; }'.
    Unmarked error at test line 236 'source: {c: $c, d: $d},'
    lack of expected error at test line 221 'target: exactNarrow,'
    lack of expected error at test line 223 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 229 'exact,'
    lack of expected error at test line 231 'exactBad,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 247 'source: {c: $c, d: $d},'
    lack of expected error at test line 239 'exact,'
    lack of expected error at test line 241 'narrow,'
    lack of expected error at test line 244 'fn: ({c, d}): ExactExactBad => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; b: string; } | null; }[]; }'.
    Unmarked error at test line 258 'source: {c: $c, d: $d},'
    lack of expected error at test line 250 'exact,'
    lack of expected error at test line 252 'exactNullable,'
    lack of expected error at test line 255 'fn: ({c, d}): ExactExactBad => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 319 'source: {c: $c, d: $d},'
    lack of expected error at test line 261 'exact,'
    lack of expected error at test line 263 'exactNarrow,'
    lack of expected error at test line 266 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 272 'exact,'
    lack of expected error at test line 274 'exactBadNarrow,'
    lack of expected error at test line 277 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 283 'exact,'
    lack of expected error at test line 292 'exactBad,'
    lack of expected error at test line 294 'exactNullable,'
    lack of expected error at test line 302 'exactBad,'
    lack of expected error at test line 304 'exactNarrow,'
    lack of expected error at test line 312 'narrow,'
    lack of expected error at test line 314 'exactBad,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; } | null; }[]; }'.
    Unmarked error at test line 361 'source: {c: $c, d: $d},'
    lack of expected error at test line 322 'narrow,'
    lack of expected error at test line 324 'exactNullable,'
    lack of expected error at test line 327 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 333 'narrow,'
    lack of expected error at test line 335 'exactBadNarrow,'
    lack of expected error at test line 338 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 344 'narrow,'
    lack of expected error at test line 353 'exactNullable,'
    lack of expected error at test line 355 'exactBadNarrow,'
    lack of expected error at test line 358 'fn: ({c, d}): ExactExactBad => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; } | null; }[]; }'.
    lack of expected error at test line 364 'exactNarrow,'
    lack of expected error at test line 366 'exactNullable,'
    lack of expected error at test line 369 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 375 'exactNarrow,'
    lack of expected error at test line 377 'exactBadNarrow,'
    lack of expected error at test line 380 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 387 'exactNullable,'
    "
  `)
})
