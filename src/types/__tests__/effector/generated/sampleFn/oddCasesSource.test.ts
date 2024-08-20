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
      Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        The types of '__.a' are incompatible between these types.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 25 'exactNarrow,'
      Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        Types of property '__' are incompatible.
          Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: number; b: string; }'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
      lack of expected error at test line 28 'fn: ({c, d}) => ({a: c, b: d}),'
      Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        The types of '__.a' are incompatible between these types.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        Types of property '__' are incompatible.
          Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: number; b: string; }'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 39 'fn: ({c, d}) => ({a: c, b: d}),'
      Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        The types of '__.a' are incompatible between these types.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 46 'exactExactBad,'
      Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        Types of property '__' are incompatible.
          Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
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
      Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        The types of '__.a' are incompatible between these types.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 113 'exactNarrow,'
      Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        Types of property '__' are incompatible.
          Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: number; b: string; }'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
      lack of expected error at test line 116 'fn: ({c, d}) => ({a: c, b: d}),'
      Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        The types of '__.a' are incompatible between these types.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        Types of property '__' are incompatible.
          Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: number; b: string; }'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 127 'fn: ({c, d}) => ({a: c, b: d}),'
      Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        The types of '__.a' are incompatible between these types.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 134 'exactExactBad,'
      Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        Types of property '__' are incompatible.
          Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
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
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 8 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 19 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
    Unmarked error at test line 26 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 29 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
    Unmarked error at test line 36 'exactExactBad,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 39 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 49 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Unmarked error at test line 56 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 59 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Unmarked error at test line 66 'exactExactBad,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 69 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: string; b: string; }'.
          Type 'null' is not assignable to type '{ a: string; b: string; }'.
    Unmarked error at test line 76 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 79 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: string; b: string; }'.
          Type 'null' is not assignable to type '{ a: string; b: string; }'.
    lack of expected error at test line 90 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    Unmarked error at test line 97 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Unmarked error at test line 105 'exactExactBad,'
    lack of expected error at test line 100 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: string; b: string; }'.
          Type 'null' is not assignable to type '{ a: string; b: string; }'.
    lack of expected error at test line 110 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 117 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 128 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
    Unmarked error at test line 135 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 138 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
    Unmarked error at test line 145 'exactExactBad,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 148 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 158 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Unmarked error at test line 165 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 168 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Unmarked error at test line 175 'exactExactBad,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 178 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: string; b: string; }'.
          Type 'null' is not assignable to type '{ a: string; b: string; }'.
    Unmarked error at test line 185 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 188 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: string; b: string; }'.
          Type 'null' is not assignable to type '{ a: string; b: string; }'.
    lack of expected error at test line 199 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    Unmarked error at test line 206 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Unmarked error at test line 214 'exactExactBad,'
    lack of expected error at test line 209 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: string; b: string; }'.
          Type 'null' is not assignable to type '{ a: string; b: string; }'.
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
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Unmarked error at test line 11 'source: $dataExact,'
    lack of expected error at test line 8 'fn: ({c}) => ({a: c}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { c: number; d: string; }) => { a: number; b: string; } | { a: number; b: string; } | { a: number; }; error: \\"fn result should extend target type\\"; }'.
    Unmarked error at test line 25 'exactBadNarrow,'
    lack of expected error at test line 14 'exact,'
    lack of expected error at test line 18 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 24 'exact,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 28 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 34 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 39 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 49 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Unmarked error at test line 56 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 59 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 70 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 80 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
    Unmarked error at test line 87 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 90 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
    lack of expected error at test line 100 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
    lack of expected error at test line 111 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Unmarked error at test line 118 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 121 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Unmarked error at test line 131 'source: {c: $c, d: $d},'
    lack of expected error at test line 128 'fn: ({c}) => ({a: c}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { readonly c: number; readonly d: string; }) => { a: number; b: string; } | { a: number; b: string; } | { a: number; }; error: \\"fn result should extend target type\\"; }'.
    Unmarked error at test line 145 'exactBadNarrow,'
    lack of expected error at test line 134 'exact,'
    lack of expected error at test line 138 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 144 'exact,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 148 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 154 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 159 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 169 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Unmarked error at test line 176 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 179 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 190 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 200 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
    Unmarked error at test line 207 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 210 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
    lack of expected error at test line 220 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
    lack of expected error at test line 231 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Unmarked error at test line 238 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
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
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'ExactNullable'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    lack of expected error at test line 8 'fn: ({c, d}): ExactNullable => null as any,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactNullable'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNullable'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 15 'fn: ({c, d}): ExactNullable => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'ExactNullable'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNullable'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 22 'fn: ({c, d}): ExactNullable => null as any,'
    lack of expected error at test line 28 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'ExactNullable'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    lack of expected error at test line 33 'fn: ({c, d}): ExactNullable => null as any,'
    lack of expected error at test line 39 'exact,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactNullable'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNullable'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 44 'fn: ({c, d}): ExactNullable => null as any,'
    lack of expected error at test line 50 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'ExactNullable'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNullable'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 55 'fn: ({c, d}): ExactNullable => null as any,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<ExactNullable>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'ExactNullable'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    lack of expected error at test line 66 'fn: ({c, d}): ExactNullable => null as any,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<ExactNullable>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactNullable'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNullable'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 77 'fn: ({c, d}): ExactNullable => null as any,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<ExactNullable>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'ExactNullable'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNullable'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 88 'fn: ({c, d}): ExactNullable => null as any,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactNullable'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNullable'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 99 'fn: ({c, d}): ExactNullable => null as any,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'ExactNullable'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNullable'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 110 'fn: ({c, d}): ExactNullable => null as any,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactNullable'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNullable'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 120 'fn: ({c, d}): ExactNullable => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'ExactNullable'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    lack of expected error at test line 130 'fn: ({c, d}): ExactNullable => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'ExactNullable'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactNullable'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNullable'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 141 'fn: ({c, d}): ExactNullable => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'ExactNullable'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNullable'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 151 'fn: ({c, d}): ExactNullable => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'ExactNullable'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNullable'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactNullable'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNullable'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 162 'fn: ({c, d}): ExactNullable => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'ExactNullable'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    lack of expected error at test line 169 'fn: ({c, d}): ExactNullable => null as any,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactNullable'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNullable'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 176 'fn: ({c, d}): ExactNullable => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'ExactNullable'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNullable'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 183 'fn: ({c, d}): ExactNullable => null as any,'
    lack of expected error at test line 189 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'ExactNullable'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    lack of expected error at test line 194 'fn: ({c, d}): ExactNullable => null as any,'
    lack of expected error at test line 200 'exact,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactNullable'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNullable'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 205 'fn: ({c, d}): ExactNullable => null as any,'
    lack of expected error at test line 211 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'ExactNullable'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNullable'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 216 'fn: ({c, d}): ExactNullable => null as any,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<ExactNullable>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'ExactNullable'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    lack of expected error at test line 227 'fn: ({c, d}): ExactNullable => null as any,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<ExactNullable>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactNullable'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNullable'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 238 'fn: ({c, d}): ExactNullable => null as any,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<ExactNullable>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'ExactNullable'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNullable'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 249 'fn: ({c, d}): ExactNullable => null as any,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactNullable'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNullable'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 260 'fn: ({c, d}): ExactNullable => null as any,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'ExactNullable'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNullable'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 271 'fn: ({c, d}): ExactNullable => null as any,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactNullable'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNullable'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 281 'fn: ({c, d}): ExactNullable => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'ExactNullable'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    lack of expected error at test line 291 'fn: ({c, d}): ExactNullable => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'ExactNullable'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactNullable'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNullable'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 302 'fn: ({c, d}): ExactNullable => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'ExactNullable'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNullable'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 312 'fn: ({c, d}): ExactNullable => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'ExactNullable'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNullable'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactNullable'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNullable'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
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
    lack of expected error at test line 6 'target: exact,'
    Type 'ExactNarrow' is not assignable to type '{ a: number; b: string; }'.
      Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 15 'fn: ({c, d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactNarrow'.
          Type 'null' is not assignable to type 'ExactNarrow'.
    lack of expected error at test line 22 'fn: ({c, d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 29 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 35 'exact,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Unmarked error at test line 43 'source: $dataExact,'
    lack of expected error at test line 40 'fn: ({c, d}): ExactNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { c: number; d: string; }) => { a: number; b: string; } | { a: number; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 46 'exact,'
    lack of expected error at test line 50 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 56 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactNarrow'.
          Type 'null' is not assignable to type 'ExactNarrow'.
    Unmarked error at test line 64 'source: $dataExact,'
    lack of expected error at test line 61 'fn: ({c, d}): ExactNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { c: number; d: string; }) => { a: number; b: string; } | { a: number; b: string; } | { a: number; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 67 'exact,'
    lack of expected error at test line 71 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 77 'exact,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 82 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 88 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 93 'fn: ({c, d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactNarrow'.
          Type 'null' is not assignable to type 'ExactNarrow'.
    lack of expected error at test line 104 'fn: ({c, d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 114 'fn: ({c, d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 125 'fn: ({c, d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 136 'fn: ({c, d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 146 'fn: ({c, d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactNarrow'.
          Type 'null' is not assignable to type 'ExactNarrow'.
    lack of expected error at test line 156 'fn: ({c, d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 166 'fn: ({c, d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactNarrow'.
          Type 'null' is not assignable to type 'ExactNarrow'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 177 'fn: ({c, d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactNarrow'.
          Type 'null' is not assignable to type 'ExactNarrow'.
    lack of expected error at test line 187 'fn: ({c, d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactNarrow'.
          Type 'null' is not assignable to type 'ExactNarrow'.
    lack of expected error at test line 198 'fn: ({c, d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 209 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 214 'target: exact,'
    Type 'ExactNarrow' is not assignable to type '{ a: number; b: string; }'.
      Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 223 'fn: ({c, d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactNarrow'.
          Type 'null' is not assignable to type 'ExactNarrow'.
    lack of expected error at test line 230 'fn: ({c, d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 237 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 243 'exact,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Unmarked error at test line 251 'source: {c: $c, d: $d},'
    lack of expected error at test line 248 'fn: ({c, d}): ExactNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { readonly c: number; readonly d: string; }) => { a: number; b: string; } | { a: number; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 254 'exact,'
    lack of expected error at test line 258 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 264 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactNarrow'.
          Type 'null' is not assignable to type 'ExactNarrow'.
    Unmarked error at test line 272 'source: {c: $c, d: $d},'
    lack of expected error at test line 269 'fn: ({c, d}): ExactNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { readonly c: number; readonly d: string; }) => { a: number; b: string; } | { a: number; b: string; } | { a: number; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 275 'exact,'
    lack of expected error at test line 279 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 285 'exact,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 290 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 296 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 301 'fn: ({c, d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactNarrow'.
          Type 'null' is not assignable to type 'ExactNarrow'.
    lack of expected error at test line 312 'fn: ({c, d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 322 'fn: ({c, d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 333 'fn: ({c, d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 344 'fn: ({c, d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 354 'fn: ({c, d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactNarrow'.
          Type 'null' is not assignable to type 'ExactNarrow'.
    lack of expected error at test line 364 'fn: ({c, d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 374 'fn: ({c, d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactNarrow'.
          Type 'null' is not assignable to type 'ExactNarrow'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 385 'fn: ({c, d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactNarrow'.
          Type 'null' is not assignable to type 'ExactNarrow'.
    lack of expected error at test line 395 'fn: ({c, d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactNarrow'.
          Type 'null' is not assignable to type 'ExactNarrow'.
    lack of expected error at test line 406 'fn: ({c, d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
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
    lack of expected error at test line 6 'target: exact,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
        Types of property 'a' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactBadNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactBadNarrow'.
          Type 'null' is not assignable to type 'ExactBadNarrow'.
    lack of expected error at test line 15 'fn: ({c, d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 21 'exact,'
    lack of expected error at test line 23 'exactBad,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 32 'exact,'
    lack of expected error at test line 34 'narrow,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 43 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactBadNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactBadNarrow'.
          Type 'null' is not assignable to type 'ExactBadNarrow'.
    lack of expected error at test line 48 'fn: ({c, d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 54 'exact,'
    lack of expected error at test line 56 'exactNarrow,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    Unmarked error at test line 62 'source: $dataExact,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { c: number; d: string; }) => { a: number; b: string; } | { a: string; b: string; } | { a: number; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 65 'exact,'
    lack of expected error at test line 69 'fn: ({c, d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 75 'exact,'
    lack of expected error at test line 77 'exactExactBad,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 86 'exactBad,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactBadNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactBadNarrow'.
          Type 'null' is not assignable to type 'ExactBadNarrow'.
    Unmarked error at test line 94 'source: $dataExact,'
    lack of expected error at test line 91 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { c: number; d: string; }) => { a: string; b: string; } | { a: number; b: string; } | { a: number; }; error: \\"fn result should extend target type\\"; }'.
    Unmarked error at test line 105 'source: $dataExact,'
    lack of expected error at test line 97 'exactBad,'
    lack of expected error at test line 99 'exactNarrow,'
    lack of expected error at test line 102 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { c: number; d: string; }) => { a: string; b: string; } | { a: number; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 108 'narrow,'
    lack of expected error at test line 110 'exactBad,'
    lack of expected error at test line 113 'fn: ({c, d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 119 'narrow,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactBadNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactBadNarrow'.
          Type 'null' is not assignable to type 'ExactBadNarrow'.
    Unmarked error at test line 127 'source: $dataExact,'
    lack of expected error at test line 124 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { c: number; d: string; }) => { a: number; } | { a: number; b: string; } | { a: string; b: string; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 130 'narrow,'
    lack of expected error at test line 132 'exactExactBad,'
    lack of expected error at test line 135 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactBadNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactBadNarrow'.
          Type 'null' is not assignable to type 'ExactBadNarrow'.
    lack of expected error at test line 145 'fn: ({c, d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 151 'exactNarrow,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactBadNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactBadNarrow'.
          Type 'null' is not assignable to type 'ExactBadNarrow'.
    lack of expected error at test line 156 'fn: ({c, d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 162 'exactExactBad,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactBadNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactBadNarrow'.
          Type 'null' is not assignable to type 'ExactBadNarrow'.
    lack of expected error at test line 167 'fn: ({c, d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 172 'target: exact,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
        Types of property 'a' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactBadNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactBadNarrow'.
          Type 'null' is not assignable to type 'ExactBadNarrow'.
    lack of expected error at test line 181 'fn: ({c, d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 187 'exact,'
    lack of expected error at test line 189 'exactBad,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 198 'exact,'
    lack of expected error at test line 200 'narrow,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 209 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactBadNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactBadNarrow'.
          Type 'null' is not assignable to type 'ExactBadNarrow'.
    lack of expected error at test line 214 'fn: ({c, d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 220 'exact,'
    lack of expected error at test line 222 'exactNarrow,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    Unmarked error at test line 228 'source: {c: $c, d: $d},'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { readonly c: number; readonly d: string; }) => { a: number; b: string; } | { a: string; b: string; } | { a: number; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 231 'exact,'
    lack of expected error at test line 235 'fn: ({c, d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 241 'exact,'
    lack of expected error at test line 243 'exactExactBad,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 252 'exactBad,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactBadNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactBadNarrow'.
          Type 'null' is not assignable to type 'ExactBadNarrow'.
    Unmarked error at test line 260 'source: {c: $c, d: $d},'
    lack of expected error at test line 257 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { readonly c: number; readonly d: string; }) => { a: string; b: string; } | { a: number; b: string; } | { a: number; }; error: \\"fn result should extend target type\\"; }'.
    Unmarked error at test line 271 'source: {c: $c, d: $d},'
    lack of expected error at test line 263 'exactBad,'
    lack of expected error at test line 265 'exactNarrow,'
    lack of expected error at test line 268 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { readonly c: number; readonly d: string; }) => { a: string; b: string; } | { a: number; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 274 'narrow,'
    lack of expected error at test line 276 'exactBad,'
    lack of expected error at test line 279 'fn: ({c, d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 285 'narrow,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactBadNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactBadNarrow'.
          Type 'null' is not assignable to type 'ExactBadNarrow'.
    Unmarked error at test line 293 'source: {c: $c, d: $d},'
    lack of expected error at test line 290 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { readonly c: number; readonly d: string; }) => { a: number; } | { a: number; b: string; } | { a: string; b: string; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 296 'narrow,'
    lack of expected error at test line 298 'exactExactBad,'
    lack of expected error at test line 301 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactBadNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactBadNarrow'.
          Type 'null' is not assignable to type 'ExactBadNarrow'.
    lack of expected error at test line 311 'fn: ({c, d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 317 'exactNarrow,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactBadNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactBadNarrow'.
          Type 'null' is not assignable to type 'ExactBadNarrow'.
    lack of expected error at test line 322 'fn: ({c, d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 328 'exactExactBad,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactBadNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactBadNarrow'.
          Type 'null' is not assignable to type 'ExactBadNarrow'.
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
    lack of expected error at test line 6 'target: exact,'
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
        Types of property 'a' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 15 'fn: ({c, d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    lack of expected error at test line 22 'fn: ({c, d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Unmarked error at test line 32 'source: $dataExact,'
    lack of expected error at test line 29 'fn: ({c, d}): ExactExactBad => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { c: number; d: string; }) => { a: number; b: string; } | { a: string; b: string; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 35 'exact,'
    lack of expected error at test line 37 'exactBad,'
    lack of expected error at test line 40 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 46 'exact,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 51 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 57 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    lack of expected error at test line 62 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 68 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 73 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 79 'exact,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Unmarked error at test line 87 'source: $dataExact,'
    lack of expected error at test line 84 'fn: ({c, d}): ExactExactBad => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { c: number; d: string; }) => { a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 90 'exact,'
    lack of expected error at test line 94 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 100 'exactBad,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    lack of expected error at test line 105 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 111 'exactBad,'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 116 'fn: ({c, d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 124 'exactBad,'
    lack of expected error at test line 127 'fn: ({c, d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    lack of expected error at test line 138 'fn: ({c, d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 149 'fn: ({c, d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 159 'fn: ({c, d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 170 'fn: ({c, d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    lack of expected error at test line 181 'fn: ({c, d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 192 'fn: ({c, d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    lack of expected error at test line 202 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 207 'target: exact,'
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
        Types of property 'a' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 216 'fn: ({c, d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    lack of expected error at test line 223 'fn: ({c, d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Unmarked error at test line 233 'source: {c: $c, d: $d},'
    lack of expected error at test line 230 'fn: ({c, d}): ExactExactBad => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { readonly c: number; readonly d: string; }) => { a: number; b: string; } | { a: string; b: string; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 236 'exact,'
    lack of expected error at test line 238 'exactBad,'
    lack of expected error at test line 241 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 247 'exact,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 252 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 258 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    lack of expected error at test line 263 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 269 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 274 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 280 'exact,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Unmarked error at test line 288 'source: {c: $c, d: $d},'
    lack of expected error at test line 285 'fn: ({c, d}): ExactExactBad => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { readonly c: number; readonly d: string; }) => { a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 291 'exact,'
    lack of expected error at test line 295 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 301 'exactBad,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    lack of expected error at test line 306 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 312 'exactBad,'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 317 'fn: ({c, d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 325 'exactBad,'
    lack of expected error at test line 328 'fn: ({c, d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    lack of expected error at test line 339 'fn: ({c, d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 350 'fn: ({c, d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 360 'fn: ({c, d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 371 'fn: ({c, d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    lack of expected error at test line 382 'fn: ({c, d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 393 'fn: ({c, d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    lack of expected error at test line 403 'fn: ({c, d}): ExactExactBad => null as any,'
    "
  `)
})
