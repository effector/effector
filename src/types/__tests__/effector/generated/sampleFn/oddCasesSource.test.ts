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
        //@ts-expect-error
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        source: $dataExact,
        target: [
          //@ts-expect-error
          exactBad,
          exactNarrow,
        ],
        //@ts-expect-error
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
        //@ts-expect-error
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
        //@ts-expect-error
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        source: $dataExact,
        target: [
          exactNarrow,
          //@ts-expect-error
          exactBadNarrow,
        ],
        //@ts-expect-error
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        source: $dataExact,
        target: [
          exactExactBad,
          //@ts-expect-error
          exactBadNarrow,
        ],
        //@ts-expect-error
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
        //@ts-expect-error
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        source: {c: $c, d: $d},
        target: [
          //@ts-expect-error
          exactBad,
          exactNarrow,
        ],
        //@ts-expect-error
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
        //@ts-expect-error
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
        //@ts-expect-error
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        source: {c: $c, d: $d},
        target: [
          exactNarrow,
          //@ts-expect-error
          exactBadNarrow,
        ],
        //@ts-expect-error
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        source: {c: $c, d: $d},
        target: [
          exactExactBad,
          //@ts-expect-error
          exactBadNarrow,
        ],
        //@ts-expect-error
        fn: ({c, d}) => ({a: c, b: d}),
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      lack of expected error at test line 6 'target: exactBadNarrow,'
      lack of expected error at test line 8 'fn: ({c, d}) => ({a: c, b: d}),'
      lack of expected error at test line 15 'exactBadNarrow,'
      lack of expected error at test line 18 'fn: ({c, d}) => ({a: c, b: d}),'
      lack of expected error at test line 24 'exactBad,'
      lack of expected error at test line 28 'fn: ({c, d}) => ({a: c, b: d}),'
      lack of expected error at test line 34 'exactBad,'
      lack of expected error at test line 36 'exactBadNarrow,'
      lack of expected error at test line 39 'fn: ({c, d}) => ({a: c, b: d}),'
      lack of expected error at test line 45 'exactBad,'
      lack of expected error at test line 49 'fn: ({c, d}) => ({a: c, b: d}),'
      lack of expected error at test line 56 'exactBadNarrow,'
      lack of expected error at test line 59 'fn: ({c, d}) => ({a: c, b: d}),'
      lack of expected error at test line 66 'exactBadNarrow,'
      lack of expected error at test line 69 'fn: ({c, d}) => ({a: c, b: d}),'
      lack of expected error at test line 76 'exactBadNarrow,'
      lack of expected error at test line 79 'fn: ({c, d}) => ({a: c, b: d}),'
      lack of expected error at test line 86 'exactBadNarrow,'
      lack of expected error at test line 89 'fn: ({c, d}) => ({a: c, b: d}),'
      lack of expected error at test line 94 'target: exactBadNarrow,'
      lack of expected error at test line 96 'fn: ({c, d}) => ({a: c, b: d}),'
      lack of expected error at test line 103 'exactBadNarrow,'
      lack of expected error at test line 106 'fn: ({c, d}) => ({a: c, b: d}),'
      lack of expected error at test line 112 'exactBad,'
      lack of expected error at test line 116 'fn: ({c, d}) => ({a: c, b: d}),'
      lack of expected error at test line 122 'exactBad,'
      lack of expected error at test line 124 'exactBadNarrow,'
      lack of expected error at test line 127 'fn: ({c, d}) => ({a: c, b: d}),'
      lack of expected error at test line 133 'exactBad,'
      lack of expected error at test line 137 'fn: ({c, d}) => ({a: c, b: d}),'
      lack of expected error at test line 144 'exactBadNarrow,'
      lack of expected error at test line 147 'fn: ({c, d}) => ({a: c, b: d}),'
      lack of expected error at test line 154 'exactBadNarrow,'
      lack of expected error at test line 157 'fn: ({c, d}) => ({a: c, b: d}),'
      lack of expected error at test line 164 'exactBadNarrow,'
      lack of expected error at test line 167 'fn: ({c, d}) => ({a: c, b: d}),'
      lack of expected error at test line 174 'exactBadNarrow,'
      lack of expected error at test line 177 'fn: ({c, d}) => ({a: c, b: d}),'
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
      //@ts-expect-error
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
      //@ts-expect-error
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
    Unmarked error at test line 82 'source: $dataExact,'
    lack of expected error at test line 14 'exact,'
    lack of expected error at test line 16 'exactNarrow,'
    lack of expected error at test line 19 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 25 'exact,'
    lack of expected error at test line 29 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 35 'exact,'
    lack of expected error at test line 39 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 46 'exactNarrow,'
    lack of expected error at test line 49 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 55 'narrow,'
    lack of expected error at test line 59 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 65 'narrow,'
    lack of expected error at test line 69 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 75 'exactNullable,'
    lack of expected error at test line 79 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; } | null; }[]; }'.
    Unmarked error at test line 113 'source: {c: $c, d: $d},'
    lack of expected error at test line 85 'exactNarrow,'
    lack of expected error at test line 87 'exactNullable,'
    lack of expected error at test line 90 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 96 'exactNarrow,'
    lack of expected error at test line 100 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 107 'exactNullable,'
    lack of expected error at test line 110 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; b: string; } | { a: number; }; }; }'.
    Unmarked error at test line 120 'source: {c: $c, d: $d},'
    lack of expected error at test line 115 'target: exactNarrow,'
    lack of expected error at test line 117 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 191 'source: {c: $c, d: $d},'
    lack of expected error at test line 123 'exact,'
    lack of expected error at test line 125 'exactNarrow,'
    lack of expected error at test line 128 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 134 'exact,'
    lack of expected error at test line 138 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 144 'exact,'
    lack of expected error at test line 148 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 155 'exactNarrow,'
    lack of expected error at test line 158 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 164 'narrow,'
    lack of expected error at test line 168 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 174 'narrow,'
    lack of expected error at test line 178 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 184 'exactNullable,'
    lack of expected error at test line 188 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; } | null; }[]; }'.
    lack of expected error at test line 194 'exactNarrow,'
    lack of expected error at test line 196 'exactNullable,'
    lack of expected error at test line 199 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 205 'exactNarrow,'
    lack of expected error at test line 209 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 216 'exactNullable,'
    lack of expected error at test line 219 'fn: ({d}) => ({a: \\"no\\", b: d}),'
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
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
    Unmarked error at test line 31 'source: $dataExact,'
    lack of expected error at test line 6 'target: exactExactBad,'
    lack of expected error at test line 8 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 14 'exact,'
    lack of expected error at test line 18 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 24 'exact,'
    lack of expected error at test line 28 'fn: ({c}) => ({a: c}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 62 'source: $dataExact,'
    lack of expected error at test line 34 'exact,'
    lack of expected error at test line 36 'exactExactBad,'
    lack of expected error at test line 39 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 45 'exactBad,'
    lack of expected error at test line 49 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 55 'exactBad,'
    lack of expected error at test line 59 'fn: ({c}) => ({a: c}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: string; b: string; } | { a: number; b: string; }; }[]; }'.
    Unmarked error at test line 103 'source: $dataExact,'
    lack of expected error at test line 65 'exactBad,'
    lack of expected error at test line 67 'exactExactBad,'
    lack of expected error at test line 70 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 77 'exactExactBad,'
    lack of expected error at test line 80 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 86 'exactNullable,'
    lack of expected error at test line 90 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 97 'exactNullable,'
    lack of expected error at test line 100 'fn: ({c}) => ({a: c}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | { a: string; b: string; } | null; }[]; }'.
    Unmarked error at test line 124 'source: {c: $c, d: $d},'
    lack of expected error at test line 106 'exactExactBad,'
    lack of expected error at test line 108 'exactNullable,'
    lack of expected error at test line 111 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 117 'exactExactBad,'
    lack of expected error at test line 121 'fn: ({c}) => ({a: c}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | { a: string; b: string; }; }; }'.
    Unmarked error at test line 151 'source: {c: $c, d: $d},'
    lack of expected error at test line 126 'target: exactExactBad,'
    lack of expected error at test line 128 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 134 'exact,'
    lack of expected error at test line 138 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 144 'exact,'
    lack of expected error at test line 148 'fn: ({c}) => ({a: c}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 182 'source: {c: $c, d: $d},'
    lack of expected error at test line 154 'exact,'
    lack of expected error at test line 156 'exactExactBad,'
    lack of expected error at test line 159 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 165 'exactBad,'
    lack of expected error at test line 169 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 175 'exactBad,'
    lack of expected error at test line 179 'fn: ({c}) => ({a: c}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: string; b: string; } | { a: number; b: string; }; }[]; }'.
    Unmarked error at test line 223 'source: {c: $c, d: $d},'
    lack of expected error at test line 185 'exactBad,'
    lack of expected error at test line 187 'exactExactBad,'
    lack of expected error at test line 190 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 197 'exactExactBad,'
    lack of expected error at test line 200 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 206 'exactNullable,'
    lack of expected error at test line 210 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 217 'exactNullable,'
    lack of expected error at test line 220 'fn: ({c}) => ({a: c}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | { a: string; b: string; } | null; }[]; }'.
    lack of expected error at test line 226 'exactExactBad,'
    lack of expected error at test line 228 'exactNullable,'
    lack of expected error at test line 231 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 237 'exactExactBad,'
    lack of expected error at test line 241 'fn: ({c}) => ({a: c}),'
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        narrow,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        narrow,
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        narrow,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        narrow,
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
      //@ts-expect-error
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
    Unmarked error at test line 53 'source: $dataExact,'
    lack of expected error at test line 35 'exact,'
    lack of expected error at test line 37 'exactBad,'
    lack of expected error at test line 40 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 46 'exact,'
    lack of expected error at test line 50 'fn: ({c, d}): ExactNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | null; }[]; }'.
    Unmarked error at test line 85 'source: $dataExact,'
    lack of expected error at test line 56 'exact,'
    lack of expected error at test line 58 'exactNullable,'
    lack of expected error at test line 61 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 67 'exact,'
    lack of expected error at test line 71 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 77 'exact,'
    lack of expected error at test line 79 'exactBadNarrow,'
    lack of expected error at test line 82 'fn: ({c, d}): ExactNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 96 'source: $dataExact,'
    lack of expected error at test line 88 'exact,'
    lack of expected error at test line 90 'exactExactBad,'
    lack of expected error at test line 93 'fn: ({c, d}): ExactNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: string; b: string; } | { a: number; b: string; } | null; }[]; }'.
    Unmarked error at test line 128 'source: $dataExact,'
    lack of expected error at test line 99 'exactBad,'
    lack of expected error at test line 101 'exactNullable,'
    lack of expected error at test line 104 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 110 'exactBad,'
    lack of expected error at test line 114 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 120 'exactBad,'
    lack of expected error at test line 122 'exactBadNarrow,'
    lack of expected error at test line 125 'fn: ({c, d}): ExactNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: string; b: string; } | { a: number; b: string; }; }[]; }'.
    Unmarked error at test line 190 'source: $dataExact,'
    lack of expected error at test line 131 'exactBad,'
    lack of expected error at test line 133 'exactExactBad,'
    lack of expected error at test line 136 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 143 'exactBad,'
    lack of expected error at test line 146 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 153 'exactNullable,'
    lack of expected error at test line 156 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 163 'exactExactBad,'
    lack of expected error at test line 166 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 172 'exactNullable,'
    lack of expected error at test line 174 'exactBadNarrow,'
    lack of expected error at test line 177 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 184 'exactNullable,'
    lack of expected error at test line 187 'fn: ({c, d}): ExactNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | { a: string; b: string; } | null; }[]; }'.
    Unmarked error at test line 212 'source: {c: $c, d: $d},'
    lack of expected error at test line 193 'exactExactBad,'
    lack of expected error at test line 195 'exactNullable,'
    lack of expected error at test line 198 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 204 'exactExactBad,'
    lack of expected error at test line 206 'exactBadNarrow,'
    lack of expected error at test line 209 'fn: ({c, d}): ExactNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; }; }; }'.
    Unmarked error at test line 219 'source: {c: $c, d: $d},'
    lack of expected error at test line 214 'target: exact,'
    lack of expected error at test line 216 'fn: ({c, d}): ExactNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: string; b: string; }; }; }'.
    Unmarked error at test line 226 'source: {c: $c, d: $d},'
    lack of expected error at test line 221 'target: exactBad,'
    lack of expected error at test line 223 'fn: ({c, d}): ExactNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | null; }; }'.
    Unmarked error at test line 233 'source: {c: $c, d: $d},'
    lack of expected error at test line 228 'target: exactNullable,'
    lack of expected error at test line 230 'fn: ({c, d}): ExactNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | { a: string; b: string; }; }; }'.
    Unmarked error at test line 240 'source: {c: $c, d: $d},'
    lack of expected error at test line 235 'target: exactExactBad,'
    lack of expected error at test line 237 'fn: ({c, d}): ExactNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 261 'source: {c: $c, d: $d},'
    lack of expected error at test line 243 'exact,'
    lack of expected error at test line 245 'exactBad,'
    lack of expected error at test line 248 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 254 'exact,'
    lack of expected error at test line 258 'fn: ({c, d}): ExactNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | null; }[]; }'.
    Unmarked error at test line 293 'source: {c: $c, d: $d},'
    lack of expected error at test line 264 'exact,'
    lack of expected error at test line 266 'exactNullable,'
    lack of expected error at test line 269 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 275 'exact,'
    lack of expected error at test line 279 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 285 'exact,'
    lack of expected error at test line 287 'exactBadNarrow,'
    lack of expected error at test line 290 'fn: ({c, d}): ExactNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 304 'source: {c: $c, d: $d},'
    lack of expected error at test line 296 'exact,'
    lack of expected error at test line 298 'exactExactBad,'
    lack of expected error at test line 301 'fn: ({c, d}): ExactNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: string; b: string; } | { a: number; b: string; } | null; }[]; }'.
    Unmarked error at test line 336 'source: {c: $c, d: $d},'
    lack of expected error at test line 307 'exactBad,'
    lack of expected error at test line 309 'exactNullable,'
    lack of expected error at test line 312 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 318 'exactBad,'
    lack of expected error at test line 322 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 328 'exactBad,'
    lack of expected error at test line 330 'exactBadNarrow,'
    lack of expected error at test line 333 'fn: ({c, d}): ExactNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: string; b: string; } | { a: number; b: string; }; }[]; }'.
    Unmarked error at test line 398 'source: {c: $c, d: $d},'
    lack of expected error at test line 339 'exactBad,'
    lack of expected error at test line 341 'exactExactBad,'
    lack of expected error at test line 344 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 351 'exactBad,'
    lack of expected error at test line 354 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 361 'exactNullable,'
    lack of expected error at test line 364 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 371 'exactExactBad,'
    lack of expected error at test line 374 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 380 'exactNullable,'
    lack of expected error at test line 382 'exactBadNarrow,'
    lack of expected error at test line 385 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 392 'exactNullable,'
    lack of expected error at test line 395 'fn: ({c, d}): ExactNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | { a: string; b: string; } | null; }[]; }'.
    lack of expected error at test line 401 'exactExactBad,'
    lack of expected error at test line 403 'exactNullable,'
    lack of expected error at test line 406 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 412 'exactExactBad,'
    lack of expected error at test line 414 'exactBadNarrow,'
    lack of expected error at test line 417 'fn: ({c, d}): ExactNarrow => null as any,'
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
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
    Unmarked error at test line 72 'source: $dataExact,'
    lack of expected error at test line 54 'exact,'
    lack of expected error at test line 56 'exactNarrow,'
    lack of expected error at test line 59 'fn: ({c, d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 65 'exact,'
    lack of expected error at test line 69 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 83 'source: $dataExact,'
    lack of expected error at test line 75 'exact,'
    lack of expected error at test line 77 'exactExactBad,'
    lack of expected error at test line 80 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: string; b: string; } | { a: number; b: string; } | null; }[]; }'.
    Unmarked error at test line 116 'source: $dataExact,'
    lack of expected error at test line 86 'exactBad,'
    lack of expected error at test line 88 'exactNullable,'
    lack of expected error at test line 91 'fn: ({c, d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 97 'exactBad,'
    lack of expected error at test line 99 'exactNarrow,'
    lack of expected error at test line 102 'fn: ({c, d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 108 'narrow,'
    lack of expected error at test line 110 'exactBad,'
    lack of expected error at test line 113 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; } | null; }[]; }'.
    Unmarked error at test line 148 'source: $dataExact,'
    lack of expected error at test line 119 'narrow,'
    lack of expected error at test line 121 'exactNullable,'
    lack of expected error at test line 124 'fn: ({c, d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 130 'narrow,'
    lack of expected error at test line 132 'exactExactBad,'
    lack of expected error at test line 135 'fn: ({c, d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 141 'exactNullable,'
    lack of expected error at test line 145 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; } | null; }[]; }'.
    Unmarked error at test line 159 'source: $dataExact,'
    lack of expected error at test line 151 'exactNarrow,'
    lack of expected error at test line 153 'exactNullable,'
    lack of expected error at test line 156 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; } | { a: string; b: string; } | null; }[]; }'.
    Unmarked error at test line 170 'source: {c: $c, d: $d},'
    lack of expected error at test line 162 'exactExactBad,'
    lack of expected error at test line 164 'exactNullable,'
    lack of expected error at test line 167 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; }; }; }'.
    Unmarked error at test line 177 'source: {c: $c, d: $d},'
    lack of expected error at test line 172 'target: exact,'
    lack of expected error at test line 174 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; } | null; }; }'.
    Unmarked error at test line 184 'source: {c: $c, d: $d},'
    lack of expected error at test line 179 'target: exactNullable,'
    lack of expected error at test line 181 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 195 'source: {c: $c, d: $d},'
    lack of expected error at test line 187 'exact,'
    lack of expected error at test line 189 'exactBad,'
    lack of expected error at test line 192 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 206 'source: {c: $c, d: $d},'
    lack of expected error at test line 198 'exact,'
    lack of expected error at test line 200 'narrow,'
    lack of expected error at test line 203 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; } | null; }[]; }'.
    Unmarked error at test line 217 'source: {c: $c, d: $d},'
    lack of expected error at test line 209 'exact,'
    lack of expected error at test line 211 'exactNullable,'
    lack of expected error at test line 214 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 238 'source: {c: $c, d: $d},'
    lack of expected error at test line 220 'exact,'
    lack of expected error at test line 222 'exactNarrow,'
    lack of expected error at test line 225 'fn: ({c, d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 231 'exact,'
    lack of expected error at test line 235 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 249 'source: {c: $c, d: $d},'
    lack of expected error at test line 241 'exact,'
    lack of expected error at test line 243 'exactExactBad,'
    lack of expected error at test line 246 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: string; b: string; } | { a: number; b: string; } | null; }[]; }'.
    Unmarked error at test line 282 'source: {c: $c, d: $d},'
    lack of expected error at test line 252 'exactBad,'
    lack of expected error at test line 254 'exactNullable,'
    lack of expected error at test line 257 'fn: ({c, d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 263 'exactBad,'
    lack of expected error at test line 265 'exactNarrow,'
    lack of expected error at test line 268 'fn: ({c, d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 274 'narrow,'
    lack of expected error at test line 276 'exactBad,'
    lack of expected error at test line 279 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; } | null; }[]; }'.
    Unmarked error at test line 314 'source: {c: $c, d: $d},'
    lack of expected error at test line 285 'narrow,'
    lack of expected error at test line 287 'exactNullable,'
    lack of expected error at test line 290 'fn: ({c, d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 296 'narrow,'
    lack of expected error at test line 298 'exactExactBad,'
    lack of expected error at test line 301 'fn: ({c, d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 307 'exactNullable,'
    lack of expected error at test line 311 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; } | null; }[]; }'.
    Unmarked error at test line 325 'source: {c: $c, d: $d},'
    lack of expected error at test line 317 'exactNarrow,'
    lack of expected error at test line 319 'exactNullable,'
    lack of expected error at test line 322 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; } | { a: string; b: string; } | null; }[]; }'.
    lack of expected error at test line 328 'exactExactBad,'
    lack of expected error at test line 330 'exactNullable,'
    lack of expected error at test line 333 'fn: ({c, d}): ExactBadNarrow => null as any,'
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
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
    Unmarked error at test line 43 'source: $dataExact,'
    lack of expected error at test line 27 'target: exactNarrow,'
    lack of expected error at test line 29 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 35 'exact,'
    lack of expected error at test line 37 'exactBad,'
    lack of expected error at test line 40 'fn: ({c, d}): ExactExactBad => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 54 'source: $dataExact,'
    lack of expected error at test line 46 'exact,'
    lack of expected error at test line 48 'narrow,'
    lack of expected error at test line 51 'fn: ({c, d}): ExactExactBad => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; b: string; } | null; }[]; }'.
    Unmarked error at test line 65 'source: $dataExact,'
    lack of expected error at test line 57 'exact,'
    lack of expected error at test line 59 'exactNullable,'
    lack of expected error at test line 62 'fn: ({c, d}): ExactExactBad => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 130 'source: $dataExact,'
    lack of expected error at test line 68 'exact,'
    lack of expected error at test line 70 'exactNarrow,'
    lack of expected error at test line 73 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 79 'exact,'
    lack of expected error at test line 81 'exactBadNarrow,'
    lack of expected error at test line 84 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 90 'exact,'
    lack of expected error at test line 94 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 100 'exactBad,'
    lack of expected error at test line 102 'exactNullable,'
    lack of expected error at test line 105 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 111 'exactBad,'
    lack of expected error at test line 113 'exactNarrow,'
    lack of expected error at test line 116 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 122 'narrow,'
    lack of expected error at test line 124 'exactBad,'
    lack of expected error at test line 127 'fn: ({c, d}): ExactExactBad => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; } | null; }[]; }'.
    Unmarked error at test line 173 'source: $dataExact,'
    lack of expected error at test line 133 'narrow,'
    lack of expected error at test line 135 'exactNullable,'
    lack of expected error at test line 138 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 144 'narrow,'
    lack of expected error at test line 146 'exactBadNarrow,'
    lack of expected error at test line 149 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 155 'narrow,'
    lack of expected error at test line 159 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 165 'exactNullable,'
    lack of expected error at test line 167 'exactBadNarrow,'
    lack of expected error at test line 170 'fn: ({c, d}): ExactExactBad => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; } | null; }[]; }'.
    Unmarked error at test line 205 'source: {c: $c, d: $d},'
    lack of expected error at test line 176 'exactNarrow,'
    lack of expected error at test line 178 'exactNullable,'
    lack of expected error at test line 181 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 187 'exactNarrow,'
    lack of expected error at test line 189 'exactBadNarrow,'
    lack of expected error at test line 192 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 199 'exactNullable,'
    lack of expected error at test line 202 'fn: ({c, d}): ExactExactBad => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; b: string; }; }; }'.
    Unmarked error at test line 212 'source: {c: $c, d: $d},'
    lack of expected error at test line 207 'target: exact,'
    lack of expected error at test line 209 'fn: ({c, d}): ExactExactBad => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; }; }; }'.
    Unmarked error at test line 219 'source: {c: $c, d: $d},'
    lack of expected error at test line 214 'target: narrow,'
    lack of expected error at test line 216 'fn: ({c, d}): ExactExactBad => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; b: string; } | null; }; }'.
    Unmarked error at test line 226 'source: {c: $c, d: $d},'
    lack of expected error at test line 221 'target: exactNullable,'
    lack of expected error at test line 223 'fn: ({c, d}): ExactExactBad => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; b: string; } | { a: number; }; }; }'.
    Unmarked error at test line 244 'source: {c: $c, d: $d},'
    lack of expected error at test line 228 'target: exactNarrow,'
    lack of expected error at test line 230 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 236 'exact,'
    lack of expected error at test line 238 'exactBad,'
    lack of expected error at test line 241 'fn: ({c, d}): ExactExactBad => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 255 'source: {c: $c, d: $d},'
    lack of expected error at test line 247 'exact,'
    lack of expected error at test line 249 'narrow,'
    lack of expected error at test line 252 'fn: ({c, d}): ExactExactBad => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; b: string; } | null; }[]; }'.
    Unmarked error at test line 266 'source: {c: $c, d: $d},'
    lack of expected error at test line 258 'exact,'
    lack of expected error at test line 260 'exactNullable,'
    lack of expected error at test line 263 'fn: ({c, d}): ExactExactBad => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 331 'source: {c: $c, d: $d},'
    lack of expected error at test line 269 'exact,'
    lack of expected error at test line 271 'exactNarrow,'
    lack of expected error at test line 274 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 280 'exact,'
    lack of expected error at test line 282 'exactBadNarrow,'
    lack of expected error at test line 285 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 291 'exact,'
    lack of expected error at test line 295 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 301 'exactBad,'
    lack of expected error at test line 303 'exactNullable,'
    lack of expected error at test line 306 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 312 'exactBad,'
    lack of expected error at test line 314 'exactNarrow,'
    lack of expected error at test line 317 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 323 'narrow,'
    lack of expected error at test line 325 'exactBad,'
    lack of expected error at test line 328 'fn: ({c, d}): ExactExactBad => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; } | null; }[]; }'.
    Unmarked error at test line 374 'source: {c: $c, d: $d},'
    lack of expected error at test line 334 'narrow,'
    lack of expected error at test line 336 'exactNullable,'
    lack of expected error at test line 339 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 345 'narrow,'
    lack of expected error at test line 347 'exactBadNarrow,'
    lack of expected error at test line 350 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 356 'narrow,'
    lack of expected error at test line 360 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 366 'exactNullable,'
    lack of expected error at test line 368 'exactBadNarrow,'
    lack of expected error at test line 371 'fn: ({c, d}): ExactExactBad => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; } | null; }[]; }'.
    lack of expected error at test line 377 'exactNarrow,'
    lack of expected error at test line 379 'exactNullable,'
    lack of expected error at test line 382 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 388 'exactNarrow,'
    lack of expected error at test line 390 'exactBadNarrow,'
    lack of expected error at test line 393 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 400 'exactNullable,'
    lack of expected error at test line 403 'fn: ({c, d}): ExactExactBad => null as any,'
    "
  `)
})
