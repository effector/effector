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
        sample({
          clock: clockExact,
          //@ts-expect-error
          target: exact,
          fn: ({c, d}: DataExact) => ({a: c, b: d}),
        })
        sample({
          source: $dataSrc,
          clock: dataClock,
          //@ts-expect-error
          target: exact,
          fn: ({c}: DataSrc, {d}: DataClk) => ({a: c, b: d}),
        })
        sample({
          source: {c: $c},
          clock: dataClock,
          //@ts-expect-error
          target: exact,
          fn: ({c}: DataSrc, {d}: DataClk) => ({a: c, b: d}),
        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        lack of expected error at test line 6 'target: exact,'
        lack of expected error at test line 13 'target: exact,'
        lack of expected error at test line 20 'target: exact,'
        "
      `)
    })
    test('assert fn args (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({clock:clockExactNarrow                        , target:exact, fn:({c, d}: DataExact) => ({a: c, b: d})})
        //@ts-expect-error
        sample({clock:clockExactBadNarrow                     , target:exact, fn:({c, d}: DataExact) => ({a: c, b: d})})
        //@ts-expect-error
        sample({clock:clockExactExactBad                      , target:exact, fn:({c, d}: DataExact) => ({a: c, b: d})})
        //@ts-expect-error
        sample({clock:[clockExact,clockExactNarrow]           , target:exact, fn:({c, d}: DataExact) => ({a: c, b: d})})
        //@ts-expect-error
        sample({clock:[clockExact,clockExactBadNarrow]        , target:exact, fn:({c, d}: DataExact) => ({a: c, b: d})})
        //@ts-expect-error
        sample({clock:[clockExact,clockExactExactBad]         , target:exact, fn:({c, d}: DataExact) => ({a: c, b: d})})
        //@ts-expect-error
        sample({clock:[clockExactBad,clockExactNarrow]        , target:exact, fn:({c, d}: DataExact) => ({a: c, b: d})})
        //@ts-expect-error
        sample({clock:[clockExactBad,clockExactBadNarrow]     , target:exact, fn:({c, d}: DataExact) => ({a: c, b: d})})
        //@ts-expect-error
        sample({clock:[clockExactBad,clockExactExactBad]      , target:exact, fn:({c, d}: DataExact) => ({a: c, b: d})})
        //@ts-expect-error
        sample({clock:[clockNarrow,clockExactBadNarrow]       , target:exact, fn:({c, d}: DataExact) => ({a: c, b: d})})
        //@ts-expect-error
        sample({clock:[clockNarrow,clockExactExactBad]        , target:exact, fn:({c, d}: DataExact) => ({a: c, b: d})})
        //@ts-expect-error
        sample({clock:[clockExactNullable,clockExactBadNarrow], target:exact, fn:({c, d}: DataExact) => ({a: c, b: d})})
        //@ts-expect-error
        sample({clock:[clockExactNarrow,clockExactNullable]   , target:exact, fn:({c, d}: DataExact) => ({a: c, b: d})})
        //@ts-expect-error
        sample({clock:[clockExactNarrow,clockExactBadNarrow]  , target:exact, fn:({c, d}: DataExact) => ({a: c, b: d})})
        //@ts-expect-error
        sample({clock:[clockExactExactBad,clockExactNullable] , target:exact, fn:({c, d}: DataExact) => ({a: c, b: d})})
        //@ts-expect-error
        sample({clock:[clockExactExactBad,clockExactBadNarrow], target:exact, fn:({c, d}: DataExact) => ({a: c, b: d})})
        sample({
          clock: clockExactBad,
          //@ts-expect-error
          target: exact,
          //@ts-expect-error
          fn: ({c, d}: DataExact) => ({a: c, b: d}),
        })
        sample({
          clock: clockNarrow,
          //@ts-expect-error
          target: exact,
          //@ts-expect-error
          fn: ({c, d}: DataExact) => ({a: c, b: d}),
        })
        sample({
          clock: clockExactNullable,
          //@ts-expect-error
          target: exact,
          //@ts-expect-error
          fn: ({c, d}: DataExact) => ({a: c, b: d}),
        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '((clk: { c: number; d: string; } | { c: number; }) => any) & (({ c, d }: DataExact) => { a: number; b: string; })'.
          Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '(clk: { c: number; d: string; } | { c: number; }) => any'.
            Types of parameters '__0' and 'clk' are incompatible.
              Type '{ c: number; d: string; } | { c: number; }' is not assignable to type 'DataExact'.
                Property 'd' is missing in type '{ c: number; }' but required in type 'DataExact'.
        Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '((clk: { c: string; d: string; } | { c: number; }) => any) & (({ c, d }: DataExact) => { a: number; b: string; })'.
          Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '(clk: { c: string; d: string; } | { c: number; }) => any'.
            Types of parameters '__0' and 'clk' are incompatible.
              Type '{ c: string; d: string; } | { c: number; }' is not assignable to type 'DataExact'.
                Type '{ c: string; d: string; }' is not assignable to type 'DataExact'.
                  Types of property 'c' are incompatible.
                    Type 'string' is not assignable to type 'number'.
        Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '((clk: { c: number; d: string; } | { c: string; d: string; }) => any) & (({ c, d }: DataExact) => { a: number; b: string; })'.
          Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '(clk: { c: number; d: string; } | { c: string; d: string; }) => any'.
            Types of parameters '__0' and 'clk' are incompatible.
              Type '{ c: number; d: string; } | { c: string; d: string; }' is not assignable to type 'DataExact'.
                Type '{ c: string; d: string; }' is not assignable to type 'DataExact'.
                  Types of property 'c' are incompatible.
                    Type 'string' is not assignable to type 'number'.
        Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '((clk: { c: number; d: string; } | { c: number; d: string; } | { c: number; }) => any) & (({ c, d }: DataExact) => { a: number; b: string; })'.
          Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '(clk: { c: number; d: string; } | { c: number; d: string; } | { c: number; }) => any'.
            Types of parameters '__0' and 'clk' are incompatible.
              Type '{ c: number; d: string; } | { c: number; d: string; } | { c: number; }' is not assignable to type 'DataExact'.
                Property 'd' is missing in type '{ c: number; }' but required in type 'DataExact'.
        Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '((clk: { c: number; d: string; } | { c: string; d: string; } | { c: number; }) => any) & (({ c, d }: DataExact) => { a: number; b: string; })'.
          Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '(clk: { c: number; d: string; } | { c: string; d: string; } | { c: number; }) => any'.
            Types of parameters '__0' and 'clk' are incompatible.
              Type '{ c: number; d: string; } | { c: string; d: string; } | { c: number; }' is not assignable to type 'DataExact'.
                Type '{ c: string; d: string; }' is not assignable to type 'DataExact'.
                  Types of property 'c' are incompatible.
                    Type 'string' is not assignable to type 'number'.
        Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '((clk: { c: number; d: string; } | { c: number; d: string; } | { c: string; d: string; }) => any) & (({ c, d }: DataExact) => { a: number; b: string; })'.
          Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '(clk: { c: number; d: string; } | { c: number; d: string; } | { c: string; d: string; }) => any'.
            Types of parameters '__0' and 'clk' are incompatible.
              Type '{ c: number; d: string; } | { c: number; d: string; } | { c: string; d: string; }' is not assignable to type 'DataExact'.
                Type '{ c: string; d: string; }' is not assignable to type 'DataExact'.
                  Types of property 'c' are incompatible.
                    Type 'string' is not assignable to type 'number'.
        Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '((clk: { c: string; d: string; } | { c: number; d: string; } | { c: number; }) => any) & (({ c, d }: DataExact) => { a: number; b: string; })'.
          Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '(clk: { c: string; d: string; } | { c: number; d: string; } | { c: number; }) => any'.
            Types of parameters '__0' and 'clk' are incompatible.
              Type '{ c: string; d: string; } | { c: number; d: string; } | { c: number; }' is not assignable to type 'DataExact'.
                Type '{ c: string; d: string; }' is not assignable to type 'DataExact'.
                  Types of property 'c' are incompatible.
                    Type 'string' is not assignable to type 'number'.
        Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '((clk: { c: string; d: string; } | { c: string; d: string; } | { c: number; }) => any) & (({ c, d }: DataExact) => { a: number; b: string; })'.
          Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '(clk: { c: string; d: string; } | { c: string; d: string; } | { c: number; }) => any'.
            Types of parameters '__0' and 'clk' are incompatible.
              Type '{ c: string; d: string; } | { c: string; d: string; } | { c: number; }' is not assignable to type 'DataExact'.
                Type '{ c: string; d: string; }' is not assignable to type 'DataExact'.
                  Types of property 'c' are incompatible.
                    Type 'string' is not assignable to type 'number'.
        Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '((clk: { c: string; d: string; } | { c: number; d: string; } | { c: string; d: string; }) => any) & (({ c, d }: DataExact) => { a: number; b: string; })'.
          Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '(clk: { c: string; d: string; } | { c: number; d: string; } | { c: string; d: string; }) => any'.
            Types of parameters '__0' and 'clk' are incompatible.
              Type '{ c: string; d: string; } | { c: number; d: string; } | { c: string; d: string; }' is not assignable to type 'DataExact'.
                Type '{ c: string; d: string; }' is not assignable to type 'DataExact'.
                  Types of property 'c' are incompatible.
                    Type 'string' is not assignable to type 'number'.
        Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '((clk: { c: number; } | { c: string; d: string; } | { c: number; }) => any) & (({ c, d }: DataExact) => { a: number; b: string; })'.
          Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '(clk: { c: number; } | { c: string; d: string; } | { c: number; }) => any'.
            Types of parameters '__0' and 'clk' are incompatible.
              Type '{ c: number; } | { c: string; d: string; } | { c: number; }' is not assignable to type 'DataExact'.
                Property 'd' is missing in type '{ c: number; }' but required in type 'DataExact'.
        Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '((clk: { c: number; } | { c: number; d: string; } | { c: string; d: string; }) => any) & (({ c, d }: DataExact) => { a: number; b: string; })'.
          Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '(clk: { c: number; } | { c: number; d: string; } | { c: string; d: string; }) => any'.
            Types of parameters '__0' and 'clk' are incompatible.
              Type '{ c: number; } | { c: number; d: string; } | { c: string; d: string; }' is not assignable to type 'DataExact'.
                Property 'd' is missing in type '{ c: number; }' but required in type 'DataExact'.
        Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '((clk: { c: number; d: string; } | { c: string; d: string; } | { c: number; } | null) => any) & (({ c, d }: DataExact) => { a: number; b: string; })'.
          Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '(clk: { c: number; d: string; } | { c: string; d: string; } | { c: number; } | null) => any'.
            Types of parameters '__0' and 'clk' are incompatible.
              Type '{ c: number; d: string; } | { c: string; d: string; } | { c: number; } | null' is not assignable to type 'DataExact'.
                Type 'null' is not assignable to type 'DataExact'.
        Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '((clk: { c: number; d: string; } | { c: number; d: string; } | { c: number; } | null) => any) & (({ c, d }: DataExact) => { a: number; b: string; })'.
          Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '(clk: { c: number; d: string; } | { c: number; d: string; } | { c: number; } | null) => any'.
            Types of parameters '__0' and 'clk' are incompatible.
              Type '{ c: number; d: string; } | { c: number; d: string; } | { c: number; } | null' is not assignable to type 'DataExact'.
                Type 'null' is not assignable to type 'DataExact'.
        Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '((clk: { c: number; d: string; } | { c: number; } | { c: string; d: string; } | { c: number; }) => any) & (({ c, d }: DataExact) => { a: number; b: string; })'.
          Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '(clk: { c: number; d: string; } | { c: number; } | { c: string; d: string; } | { c: number; }) => any'.
            Types of parameters '__0' and 'clk' are incompatible.
              Type '{ c: number; d: string; } | { c: number; } | { c: string; d: string; } | { c: number; }' is not assignable to type 'DataExact'.
                Property 'd' is missing in type '{ c: number; }' but required in type 'DataExact'.
        Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '((clk: { c: number; d: string; } | { c: number; d: string; } | { c: string; d: string; } | null) => any) & (({ c, d }: DataExact) => { a: number; b: string; })'.
          Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '(clk: { c: number; d: string; } | { c: number; d: string; } | { c: string; d: string; } | null) => any'.
            Types of parameters '__0' and 'clk' are incompatible.
              Type '{ c: number; d: string; } | { c: number; d: string; } | { c: string; d: string; } | null' is not assignable to type 'DataExact'.
                Type 'null' is not assignable to type 'DataExact'.
        Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '((clk: { c: string; d: string; } | { c: number; } | { c: number; d: string; } | { c: string; d: string; }) => any) & (({ c, d }: DataExact) => { a: number; b: string; })'.
          Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '(clk: { c: string; d: string; } | { c: number; } | { c: number; d: string; } | { c: string; d: string; }) => any'.
            Types of parameters '__0' and 'clk' are incompatible.
              Type '{ c: string; d: string; } | { c: number; } | { c: number; d: string; } | { c: string; d: string; }' is not assignable to type 'DataExact'.
                Type '{ c: string; d: string; }' is not assignable to type 'DataExact'.
                  Types of property 'c' are incompatible.
                    Type 'string' is not assignable to type 'number'.
        lack of expected error at test line 38 'target: exact,'
        Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '((clk: { c: string; d: string; }) => any) & (({ c, d }: DataExact) => { a: number; b: string; })'.
          Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '(clk: { c: string; d: string; }) => any'.
            Types of parameters '__0' and 'clk' are incompatible.
              Type '{ c: string; d: string; }' is not assignable to type 'DataExact'.
                Types of property 'c' are incompatible.
                  Type 'string' is not assignable to type 'number'.
        lack of expected error at test line 45 'target: exact,'
        Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '((clk: { c: number; }) => any) & (({ c, d }: DataExact) => { a: number; b: string; })'.
          Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '(clk: { c: number; }) => any'.
            Types of parameters '__0' and 'clk' are incompatible.
              Property 'd' is missing in type '{ c: number; }' but required in type 'DataExact'.
        lack of expected error at test line 52 'target: exact,'
        Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '((clk: { c: number; d: string; } | null) => any) & (({ c, d }: DataExact) => { a: number; b: string; })'.
          Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '(clk: { c: number; d: string; } | null) => any'.
            Types of parameters '__0' and 'clk' are incompatible.
              Type '{ c: number; d: string; } | null' is not assignable to type 'DataExact'.
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
      sample({clock:clockExact, target:exactNarrow                  , fn:({c, d}) => ({a: c, b: d})})
      sample({clock:clockExact, target:exactExactBad                , fn:({c, d}) => ({a: c, b: d})})
      sample({clock:clockExact, target:[exact,exactNarrow]          , fn:({c, d}) => ({a: c, b: d})})
      sample({clock:clockExact, target:[exact,exactExactBad]        , fn:({c, d}) => ({a: c, b: d})})
      sample({clock:clockExact, target:[narrow,exactExactBad]       , fn:({c, d}) => ({a: c, b: d})})
      sample({clock:clockExact, target:[exactNarrow,exactNullable]  , fn:({c, d}) => ({a: c, b: d})})
      sample({clock:clockExact, target:[exactExactBad,exactNullable], fn:({c, d}) => ({a: c, b: d})})
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
        target: exactBadNarrow,
        //@ts-expect-error
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        clock: clockExact,
        target: [
          exact,
          //@ts-expect-error
          exactBadNarrow,
        ],
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        clock: clockExact,
        target: [
          //@ts-expect-error
          exactBad,
          exactNarrow,
        ],
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        clock: clockExact,
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
        clock: clockExact,
        target: [
          //@ts-expect-error
          exactBad,
          exactExactBad,
        ],
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        clock: clockExact,
        target: [
          narrow,
          //@ts-expect-error
          exactBadNarrow,
        ],
        //@ts-expect-error
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        clock: clockExact,
        target: [
          exactNullable,
          //@ts-expect-error
          exactBadNarrow,
        ],
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        clock: clockExact,
        target: [
          exactNarrow,
          //@ts-expect-error
          exactBadNarrow,
        ],
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        clock: clockExact,
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
      Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        The types of '__.a' are incompatible between these types.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 24 'exactNarrow,'
      Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        Types of property '__' are incompatible.
          Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: number; b: string; }'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
      Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        The types of '__.a' are incompatible between these types.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        Types of property '__' are incompatible.
          Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: number; b: string; }'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 37 'fn: ({c, d}) => ({a: c, b: d}),'
      Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        The types of '__.a' are incompatible between these types.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 44 'exactExactBad,'
      Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        Types of property '__' are incompatible.
          Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 53 'exactBadNarrow,'
      lack of expected error at test line 56 'fn: ({c, d}) => ({a: c, b: d}),'
      lack of expected error at test line 63 'exactBadNarrow,'
      lack of expected error at test line 72 'exactBadNarrow,'
      lack of expected error at test line 81 'exactBadNarrow,'
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
      target: exactNarrow,
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      clock: clockExact,
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
      clock: clockExact,
      target: [
        //@ts-expect-error
        exact,
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      clock: clockExact,
      target: [
        //@ts-expect-error
        exact,
        exactExactBad,
      ],
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      clock: clockExact,
      target: [
        exactBad,
        //@ts-expect-error
        exactNarrow,
      ],
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      clock: clockExact,
      target: [
        //@ts-expect-error
        narrow,
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      clock: clockExact,
      target: [
        //@ts-expect-error
        narrow,
        exactExactBad,
      ],
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      clock: clockExact,
      target: [
        //@ts-expect-error
        exactNullable,
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      clock: clockExact,
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
      clock: clockExact,
      target: [
        //@ts-expect-error
        exactNarrow,
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      clock: clockExact,
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
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Unmarked error at test line 55 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 58 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Unmarked error at test line 65 'exactExactBad,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 68 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: string; b: string; }'.
          Type 'null' is not assignable to type '{ a: string; b: string; }'.
    Unmarked error at test line 75 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 78 'fn: ({d}) => ({a: \\"no\\", b: d}),'
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
    lack of expected error at test line 89 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    Unmarked error at test line 96 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Unmarked error at test line 104 'exactExactBad,'
    lack of expected error at test line 99 'fn: ({d}) => ({a: \\"no\\", b: d}),'
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
    lack of expected error at test line 109 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    "
  `)
})
test('clock narrow (should fail)', () => {
  //prettier-ignore
  {
    sample({
      clock: clockExact,
      //@ts-expect-error
      target: exactExactBad,
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      clock: clockExact,
      target: [
        //@ts-expect-error
        exact,
        exactNarrow,
      ],
      fn: ({c}) => ({a: c}),
    })
    sample({
      clock: clockExact,
      target: [
        //@ts-expect-error
        exact,
        exactBadNarrow,
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
        exactExactBad,
      ],
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      clock: clockExact,
      target: [
        //@ts-expect-error
        exactBad,
        exactNarrow,
      ],
      fn: ({c}) => ({a: c}),
    })
    sample({
      clock: clockExact,
      target: [
        //@ts-expect-error
        exactBad,
        exactBadNarrow,
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
        exactExactBad,
      ],
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      clock: clockExact,
      target: [
        narrow,
        //@ts-expect-error
        exactExactBad,
      ],
      fn: ({c}) => ({a: c}),
    })
    sample({
      clock: clockExact,
      target: [
        //@ts-expect-error
        exactNullable,
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      clock: clockExact,
      target: [
        exactNarrow,
        //@ts-expect-error
        exactNullable,
      ],
      fn: ({c}) => ({a: c}),
    })
    sample({
      clock: clockExact,
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
      clock: clockExact,
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
    Unmarked error at test line 11 'clock: clockExact,'
    lack of expected error at test line 8 'fn: ({c}) => ({a: c}),'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (args_0: { c: number; d: string; }) => { a: number; b: string; } | { a: number; b: string; } | { a: number; }; error: \\"fn result should extend target type\\"; }'.
    Unmarked error at test line 24 'exactBadNarrow,'
    lack of expected error at test line 14 'exact,'
    lack of expected error at test line 23 'exact,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 27 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 33 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 38 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Unmarked error at test line 54 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 57 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 68 'fn: ({c}) => ({a: c}),'
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
    Unmarked error at test line 84 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 87 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
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
    lack of expected error at test line 107 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Unmarked error at test line 114 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 117 'fn: ({c}) => ({a: c}),'
    "
  `)
})
test('clock exactNullable (should fail)', () => {
  //prettier-ignore
  {
    sample({
      clock: clockExact,
      //@ts-expect-error
      target: exactNarrow,
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      clock: clockExact,
      //@ts-expect-error
      target: exactBadNarrow,
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      clock: clockExact,
      //@ts-expect-error
      target: exactExactBad,
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      clock: clockExact,
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
      clock: clockExact,
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
      clock: clockExact,
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
      clock: clockExact,
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
      clock: clockExact,
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
      clock: clockExact,
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
      clock: clockExact,
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
      clock: clockExact,
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
      clock: clockExact,
      target: [
        exactNullable,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      clock: clockExact,
      target: [
        //@ts-expect-error
        exactNarrow,
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      clock: clockExact,
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
      clock: clockExact,
      target: [
        //@ts-expect-error
        exactExactBad,
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      clock: clockExact,
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
    "
  `)
})
test('clock exactNarrow (should fail)', () => {
  //prettier-ignore
  {
    sample({
      clock: clockExact,
      //@ts-expect-error
      target: exact,
      //@ts-expect-error
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      clock: clockExact,
      //@ts-expect-error
      target: exactBad,
      //@ts-expect-error
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      clock: clockExact,
      //@ts-expect-error
      target: exactNullable,
      //@ts-expect-error
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      clock: clockExact,
      //@ts-expect-error
      target: exactExactBad,
      //@ts-expect-error
      fn: ({c, d}): ExactNarrow => null as any,
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
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      clock: clockExact,
      target: [
        //@ts-expect-error
        exact,
        narrow,
      ],
      fn: ({c, d}): ExactNarrow => null as any,
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
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      clock: clockExact,
      target: [
        //@ts-expect-error
        exact,
        exactNarrow,
      ],
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      clock: clockExact,
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
      clock: clockExact,
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
      clock: clockExact,
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
      clock: clockExact,
      target: [
        //@ts-expect-error
        exactBad,
        exactNarrow,
      ],
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      clock: clockExact,
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
      clock: clockExact,
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
      clock: clockExact,
      target: [
        narrow,
        //@ts-expect-error
        exactBad,
      ],
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      clock: clockExact,
      target: [
        narrow,
        //@ts-expect-error
        exactNullable,
      ],
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      clock: clockExact,
      target: [
        narrow,
        //@ts-expect-error
        exactExactBad,
      ],
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      clock: clockExact,
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
      clock: clockExact,
      target: [
        exactNarrow,
        //@ts-expect-error
        exactNullable,
      ],
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      clock: clockExact,
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
      clock: clockExact,
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
    Unmarked error at test line 43 'clock: clockExact,'
    lack of expected error at test line 40 'fn: ({c, d}): ExactNarrow => null as any,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (args_0: { c: number; d: string; }) => { a: number; b: string; } | { a: number; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 46 'exact,'
    lack of expected error at test line 55 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactNarrow'.
          Type 'null' is not assignable to type 'ExactNarrow'.
    Unmarked error at test line 63 'clock: clockExact,'
    lack of expected error at test line 60 'fn: ({c, d}): ExactNarrow => null as any,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (args_0: { c: number; d: string; }) => { a: number; b: string; } | { a: number; b: string; } | { a: number; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 66 'exact,'
    lack of expected error at test line 75 'exact,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 80 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 86 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 91 'fn: ({c, d}): ExactNarrow => null as any,'
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
    lack of expected error at test line 102 'fn: ({c, d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
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
    lack of expected error at test line 122 'fn: ({c, d}): ExactNarrow => null as any,'
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
    lack of expected error at test line 133 'fn: ({c, d}): ExactNarrow => null as any,'
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
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 171 'fn: ({c, d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactNarrow'.
          Type 'null' is not assignable to type 'ExactNarrow'.
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
    lack of expected error at test line 191 'fn: ({c, d}): ExactNarrow => null as any,'
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
    lack of expected error at test line 202 'fn: ({c, d}): ExactNarrow => null as any,'
    "
  `)
})
test('clock exactBadNarrow (should fail)', () => {
  //prettier-ignore
  {
    sample({
      clock: clockExact,
      //@ts-expect-error
      target: exact,
      //@ts-expect-error
      fn: ({c, d}): ExactBadNarrow => null as any,
    })
    sample({
      clock: clockExact,
      //@ts-expect-error
      target: exactNullable,
      //@ts-expect-error
      fn: ({c, d}): ExactBadNarrow => null as any,
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
      fn: ({c, d}): ExactBadNarrow => null as any,
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
      fn: ({c, d}): ExactBadNarrow => null as any,
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
      fn: ({c, d}): ExactBadNarrow => null as any,
    })
    sample({
      clock: clockExact,
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
      clock: clockExact,
      target: [
        //@ts-expect-error
        exact,
        exactBadNarrow,
      ],
      fn: ({c, d}): ExactBadNarrow => null as any,
    })
    sample({
      clock: clockExact,
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
      clock: clockExact,
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
      clock: clockExact,
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
      clock: clockExact,
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
      clock: clockExact,
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
      clock: clockExact,
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
      clock: clockExact,
      target: [
        //@ts-expect-error
        exactNullable,
        exactBadNarrow,
      ],
      fn: ({c, d}): ExactBadNarrow => null as any,
    })
    sample({
      clock: clockExact,
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
      clock: clockExact,
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
    Unmarked error at test line 62 'clock: clockExact,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (args_0: { c: number; d: string; }) => { a: number; b: string; } | { a: string; b: string; } | { a: number; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 65 'exact,'
    lack of expected error at test line 74 'exact,'
    lack of expected error at test line 76 'exactExactBad,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 85 'exactBad,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactBadNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactBadNarrow'.
          Type 'null' is not assignable to type 'ExactBadNarrow'.
    Unmarked error at test line 93 'clock: clockExact,'
    lack of expected error at test line 90 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (args_0: { c: number; d: string; }) => { a: string; b: string; } | { a: number; b: string; } | { a: number; }; error: \\"fn result should extend target type\\"; }'.
    Unmarked error at test line 104 'clock: clockExact,'
    lack of expected error at test line 96 'exactBad,'
    lack of expected error at test line 98 'exactNarrow,'
    lack of expected error at test line 101 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (args_0: { c: number; d: string; }) => { a: string; b: string; } | { a: number; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 107 'narrow,'
    lack of expected error at test line 109 'exactBad,'
    lack of expected error at test line 112 'fn: ({c, d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 118 'narrow,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactBadNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactBadNarrow'.
          Type 'null' is not assignable to type 'ExactBadNarrow'.
    Unmarked error at test line 126 'clock: clockExact,'
    lack of expected error at test line 123 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (args_0: { c: number; d: string; }) => { a: number; } | { a: number; b: string; } | { a: string; b: string; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 129 'narrow,'
    lack of expected error at test line 131 'exactExactBad,'
    lack of expected error at test line 134 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactBadNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactBadNarrow'.
          Type 'null' is not assignable to type 'ExactBadNarrow'.
    lack of expected error at test line 149 'exactNarrow,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactBadNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactBadNarrow'.
          Type 'null' is not assignable to type 'ExactBadNarrow'.
    lack of expected error at test line 154 'fn: ({c, d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 160 'exactExactBad,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactBadNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactBadNarrow'.
          Type 'null' is not assignable to type 'ExactBadNarrow'.
    lack of expected error at test line 165 'fn: ({c, d}): ExactBadNarrow => null as any,'
    "
  `)
})
test('clock exactExactBad (should fail)', () => {
  //prettier-ignore
  {
    sample({
      clock: clockExact,
      //@ts-expect-error
      target: exact,
      //@ts-expect-error
      fn: ({c, d}): ExactExactBad => null as any,
    })
    sample({
      clock: clockExact,
      //@ts-expect-error
      target: narrow,
      //@ts-expect-error
      fn: ({c, d}): ExactExactBad => null as any,
    })
    sample({
      clock: clockExact,
      //@ts-expect-error
      target: exactNullable,
      //@ts-expect-error
      fn: ({c, d}): ExactExactBad => null as any,
    })
    sample({
      clock: clockExact,
      //@ts-expect-error
      target: exactNarrow,
      //@ts-expect-error
      fn: ({c, d}): ExactExactBad => null as any,
    })
    sample({
      clock: clockExact,
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactBad,
      ],
      fn: ({c, d}): ExactExactBad => null as any,
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
      fn: ({c, d}): ExactExactBad => null as any,
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
      fn: ({c, d}): ExactExactBad => null as any,
    })
    sample({
      clock: clockExact,
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
      clock: clockExact,
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
      clock: clockExact,
      target: [
        //@ts-expect-error
        exact,
        exactExactBad,
      ],
      fn: ({c, d}): ExactExactBad => null as any,
    })
    sample({
      clock: clockExact,
      target: [
        //@ts-expect-error
        exactBad,
        //@ts-expect-error
        exactNullable,
      ],
      fn: ({c, d}): ExactExactBad => null as any,
    })
    sample({
      clock: clockExact,
      target: [
        //@ts-expect-error
        exactBad,
        //@ts-expect-error
        exactNarrow,
      ],
      fn: ({c, d}): ExactExactBad => null as any,
    })
    sample({
      clock: clockExact,
      target: [
        //@ts-expect-error
        narrow,
        //@ts-expect-error
        exactBad,
      ],
      fn: ({c, d}): ExactExactBad => null as any,
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
      fn: ({c, d}): ExactExactBad => null as any,
    })
    sample({
      clock: clockExact,
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
      clock: clockExact,
      target: [
        //@ts-expect-error
        narrow,
        exactExactBad,
      ],
      fn: ({c, d}): ExactExactBad => null as any,
    })
    sample({
      clock: clockExact,
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
      clock: clockExact,
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
      clock: clockExact,
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
      clock: clockExact,
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
    Unmarked error at test line 32 'clock: clockExact,'
    lack of expected error at test line 29 'fn: ({c, d}): ExactExactBad => null as any,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (args_0: { c: number; d: string; }) => { a: number; b: string; } | { a: string; b: string; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 35 'exact,'
    lack of expected error at test line 37 'exactBad,'
    lack of expected error at test line 45 'exact,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 50 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 56 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    lack of expected error at test line 61 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 67 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 72 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 78 'exact,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Unmarked error at test line 86 'clock: clockExact,'
    lack of expected error at test line 83 'fn: ({c, d}): ExactExactBad => null as any,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (args_0: { c: number; d: string; }) => { a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 89 'exact,'
    lack of expected error at test line 98 'exactBad,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    lack of expected error at test line 108 'exactBad,'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 120 'exactBad,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    lack of expected error at test line 133 'fn: ({c, d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 144 'fn: ({c, d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 164 'fn: ({c, d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    lack of expected error at test line 175 'fn: ({c, d}): ExactExactBad => null as any,'
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
    lack of expected error at test line 186 'fn: ({c, d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    "
  `)
})
describe('source and clock exact', () => {
  test('source and clock exact (should pass)', () => {
    //prettier-ignore
    {
      sample({source:$dataSrc, clock:dataClock, target:exactNarrow                  , fn:({c}, {d}) => ({a: c, b: d})})
      sample({source:$dataSrc, clock:dataClock, target:exactExactBad                , fn:({c}, {d}) => ({a: c, b: d})})
      sample({source:$dataSrc, clock:dataClock, target:[exact,exactNarrow]          , fn:({c}, {d}) => ({a: c, b: d})})
      sample({source:$dataSrc, clock:dataClock, target:[exact,exactExactBad]        , fn:({c}, {d}) => ({a: c, b: d})})
      sample({source:$dataSrc, clock:dataClock, target:[narrow,exactExactBad]       , fn:({c}, {d}) => ({a: c, b: d})})
      sample({source:$dataSrc, clock:dataClock, target:[exactNarrow,exactNullable]  , fn:({c}, {d}) => ({a: c, b: d})})
      sample({source:$dataSrc, clock:dataClock, target:[exactExactBad,exactNullable], fn:({c}, {d}) => ({a: c, b: d})})
      sample({source:{c: $c} , clock:dataClock, target:exactNarrow                  , fn:({c}, {d}) => ({a: c, b: d})})
      sample({source:{c: $c} , clock:dataClock, target:exactExactBad                , fn:({c}, {d}) => ({a: c, b: d})})
      sample({source:{c: $c} , clock:dataClock, target:[exact,exactNarrow]          , fn:({c}, {d}) => ({a: c, b: d})})
      sample({source:{c: $c} , clock:dataClock, target:[exact,exactExactBad]        , fn:({c}, {d}) => ({a: c, b: d})})
      sample({source:{c: $c} , clock:dataClock, target:[narrow,exactExactBad]       , fn:({c}, {d}) => ({a: c, b: d})})
      sample({source:{c: $c} , clock:dataClock, target:[exactNarrow,exactNullable]  , fn:({c}, {d}) => ({a: c, b: d})})
      sample({source:{c: $c} , clock:dataClock, target:[exactExactBad,exactNullable], fn:({c}, {d}) => ({a: c, b: d})})
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
        target: exactBadNarrow,
        //@ts-expect-error
        fn: ({c}, {d}) => ({a: c, b: d}),
      })
      sample({
        source: $dataSrc,
        clock: dataClock,
        target: [
          exact,
          //@ts-expect-error
          exactBadNarrow,
        ],
        fn: ({c}, {d}) => ({a: c, b: d}),
      })
      sample({
        source: $dataSrc,
        clock: dataClock,
        target: [
          //@ts-expect-error
          exactBad,
          exactNarrow,
        ],
        fn: ({c}, {d}) => ({a: c, b: d}),
      })
      sample({
        source: $dataSrc,
        clock: dataClock,
        target: [
          //@ts-expect-error
          exactBad,
          //@ts-expect-error
          exactBadNarrow,
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
          exactExactBad,
        ],
        fn: ({c}, {d}) => ({a: c, b: d}),
      })
      sample({
        source: $dataSrc,
        clock: dataClock,
        target: [
          narrow,
          //@ts-expect-error
          exactBadNarrow,
        ],
        //@ts-expect-error
        fn: ({c}, {d}) => ({a: c, b: d}),
      })
      sample({
        source: $dataSrc,
        clock: dataClock,
        target: [
          exactNullable,
          //@ts-expect-error
          exactBadNarrow,
        ],
        fn: ({c}, {d}) => ({a: c, b: d}),
      })
      sample({
        source: $dataSrc,
        clock: dataClock,
        target: [
          exactNarrow,
          //@ts-expect-error
          exactBadNarrow,
        ],
        fn: ({c}, {d}) => ({a: c, b: d}),
      })
      sample({
        source: $dataSrc,
        clock: dataClock,
        target: [
          exactExactBad,
          //@ts-expect-error
          exactBadNarrow,
        ],
        fn: ({c}, {d}) => ({a: c, b: d}),
      })
      sample({
        source: {c: $c},
        clock: dataClock,
        //@ts-expect-error
        target: exactBadNarrow,
        //@ts-expect-error
        fn: ({c}, {d}) => ({a: c, b: d}),
      })
      sample({
        source: {c: $c},
        clock: dataClock,
        target: [
          exact,
          //@ts-expect-error
          exactBadNarrow,
        ],
        fn: ({c}, {d}) => ({a: c, b: d}),
      })
      sample({
        source: {c: $c},
        clock: dataClock,
        target: [
          //@ts-expect-error
          exactBad,
          exactNarrow,
        ],
        fn: ({c}, {d}) => ({a: c, b: d}),
      })
      sample({
        source: {c: $c},
        clock: dataClock,
        target: [
          //@ts-expect-error
          exactBad,
          //@ts-expect-error
          exactBadNarrow,
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
          exactExactBad,
        ],
        fn: ({c}, {d}) => ({a: c, b: d}),
      })
      sample({
        source: {c: $c},
        clock: dataClock,
        target: [
          narrow,
          //@ts-expect-error
          exactBadNarrow,
        ],
        //@ts-expect-error
        fn: ({c}, {d}) => ({a: c, b: d}),
      })
      sample({
        source: {c: $c},
        clock: dataClock,
        target: [
          exactNullable,
          //@ts-expect-error
          exactBadNarrow,
        ],
        fn: ({c}, {d}) => ({a: c, b: d}),
      })
      sample({
        source: {c: $c},
        clock: dataClock,
        target: [
          exactNarrow,
          //@ts-expect-error
          exactBadNarrow,
        ],
        fn: ({c}, {d}) => ({a: c, b: d}),
      })
      sample({
        source: {c: $c},
        clock: dataClock,
        target: [
          exactExactBad,
          //@ts-expect-error
          exactBadNarrow,
        ],
        fn: ({c}, {d}) => ({a: c, b: d}),
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      lack of expected error at test line 7 'target: exactBadNarrow,'
      lack of expected error at test line 9 'fn: ({c}, {d}) => ({a: c, b: d}),'
      lack of expected error at test line 17 'exactBadNarrow,'
      Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        The types of '__.a' are incompatible between these types.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 27 'exactNarrow,'
      Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        Types of property '__' are incompatible.
          Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: number; b: string; }'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
      Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        The types of '__.a' are incompatible between these types.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        Types of property '__' are incompatible.
          Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: number; b: string; }'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 41 'fn: ({c}, {d}) => ({a: c, b: d}),'
      Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        The types of '__.a' are incompatible between these types.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 49 'exactExactBad,'
      Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        Types of property '__' are incompatible.
          Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 59 'exactBadNarrow,'
      lack of expected error at test line 62 'fn: ({c}, {d}) => ({a: c, b: d}),'
      lack of expected error at test line 70 'exactBadNarrow,'
      lack of expected error at test line 80 'exactBadNarrow,'
      lack of expected error at test line 90 'exactBadNarrow,'
      lack of expected error at test line 98 'target: exactBadNarrow,'
      lack of expected error at test line 100 'fn: ({c}, {d}) => ({a: c, b: d}),'
      lack of expected error at test line 108 'exactBadNarrow,'
      Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        The types of '__.a' are incompatible between these types.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 118 'exactNarrow,'
      Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        Types of property '__' are incompatible.
          Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: number; b: string; }'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
      Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        The types of '__.a' are incompatible between these types.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        Types of property '__' are incompatible.
          Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: number; b: string; }'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 132 'fn: ({c}, {d}) => ({a: c, b: d}),'
      Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        The types of '__.a' are incompatible between these types.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 140 'exactExactBad,'
      Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        Types of property '__' are incompatible.
          Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 150 'exactBadNarrow,'
      lack of expected error at test line 153 'fn: ({c}, {d}) => ({a: c, b: d}),'
      lack of expected error at test line 161 'exactBadNarrow,'
      lack of expected error at test line 171 'exactBadNarrow,'
      lack of expected error at test line 181 'exactBadNarrow,'
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
      target: exactNarrow,
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
        exactNarrow,
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
        exactBadNarrow,
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
        exactExactBad,
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
        exactNarrow,
      ],
      fn: (_, {d}) => ({a: "no", b: d}),
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        narrow,
        exactBadNarrow,
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
        exactExactBad,
      ],
      //@ts-expect-error
      fn: (_, {d}) => ({a: "no", b: d}),
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        exactNullable,
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: (_, {d}) => ({a: "no", b: d}),
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        exactNarrow,
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
        exactNarrow,
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: (_, {d}) => ({a: "no", b: d}),
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        exactExactBad,
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
      target: exactNarrow,
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
        exactNarrow,
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
        exactBadNarrow,
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
        exactExactBad,
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
        exactNarrow,
      ],
      fn: (_, {d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        narrow,
        exactBadNarrow,
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
        exactExactBad,
      ],
      //@ts-expect-error
      fn: (_, {d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        exactNullable,
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: (_, {d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        exactNarrow,
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
        exactNarrow,
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: (_, {d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        exactExactBad,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: (_, {d}) => ({a: "no", b: d}),
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
    lack of expected error at test line 9 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 21 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
    Unmarked error at test line 29 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 32 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
    Unmarked error at test line 40 'exactExactBad,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 43 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Unmarked error at test line 61 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 64 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Unmarked error at test line 72 'exactExactBad,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 75 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: string; b: string; }'.
          Type 'null' is not assignable to type '{ a: string; b: string; }'.
    Unmarked error at test line 83 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 86 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
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
    lack of expected error at test line 98 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    Unmarked error at test line 106 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Unmarked error at test line 115 'exactExactBad,'
    lack of expected error at test line 109 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
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
    lack of expected error at test line 120 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 128 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 140 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
    Unmarked error at test line 148 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 151 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
    Unmarked error at test line 159 'exactExactBad,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 162 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Unmarked error at test line 180 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 183 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Unmarked error at test line 191 'exactExactBad,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 194 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: string; b: string; }'.
          Type 'null' is not assignable to type '{ a: string; b: string; }'.
    Unmarked error at test line 202 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 205 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
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
    lack of expected error at test line 217 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    Unmarked error at test line 225 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Unmarked error at test line 234 'exactExactBad,'
    lack of expected error at test line 228 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
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
    lack of expected error at test line 239 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
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
      target: exactExactBad,
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        exact,
        exactNarrow,
      ],
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        exact,
        exactBadNarrow,
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
        exactExactBad,
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
        exactNarrow,
      ],
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        exactBad,
        exactBadNarrow,
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
        exactExactBad,
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
        exactExactBad,
      ],
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        exactNullable,
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        exactNarrow,
        //@ts-expect-error
        exactNullable,
      ],
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
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
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        exactExactBad,
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      //@ts-expect-error
      target: exactExactBad,
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        exact,
        exactNarrow,
      ],
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        exact,
        exactBadNarrow,
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
        exactExactBad,
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
        exactNarrow,
      ],
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        exactBad,
        exactBadNarrow,
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
        exactExactBad,
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
        exactExactBad,
      ],
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        exactNullable,
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        exactNarrow,
        //@ts-expect-error
        exactNullable,
      ],
      fn: ({c}) => ({a: c}),
    })
    sample({
      source: {c: $c},
      clock: dataClock,
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
      source: {c: $c},
      clock: dataClock,
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
    Unmarked error at test line 12 'source: $dataSrc,'
    lack of expected error at test line 9 'fn: ({c}) => ({a: c}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { c: number; }) => { a: number; b: string; } | { a: number; b: string; } | { a: number; }; error: \\"fn result should extend target type\\"; }'.
    Unmarked error at test line 27 'exactBadNarrow,'
    lack of expected error at test line 16 'exact,'
    lack of expected error at test line 26 'exact,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 30 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 37 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 42 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Unmarked error at test line 60 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 63 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 75 'fn: ({c}) => ({a: c}),'
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
    Unmarked error at test line 93 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 96 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
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
    lack of expected error at test line 118 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Unmarked error at test line 126 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 129 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Unmarked error at test line 140 'source: {c: $c},'
    lack of expected error at test line 137 'fn: ({c}) => ({a: c}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { readonly c: number; }) => { a: number; b: string; } | { a: number; b: string; } | { a: number; }; error: \\"fn result should extend target type\\"; }'.
    Unmarked error at test line 155 'exactBadNarrow,'
    lack of expected error at test line 144 'exact,'
    lack of expected error at test line 154 'exact,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 158 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 165 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 170 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Unmarked error at test line 188 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 191 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 203 'fn: ({c}) => ({a: c}),'
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
    Unmarked error at test line 221 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 224 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
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
    lack of expected error at test line 246 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Unmarked error at test line 254 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 257 'fn: ({c}) => ({a: c}),'
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
      target: exactNarrow,
      //@ts-expect-error
      fn: ({c}, {d}): ExactNullable => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      //@ts-expect-error
      target: exactBadNarrow,
      //@ts-expect-error
      fn: ({c}, {d}): ExactNullable => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      //@ts-expect-error
      target: exactExactBad,
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
        exactNarrow,
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
        exactBadNarrow,
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
        exactExactBad,
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
        //@ts-expect-error
        exactNarrow,
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
        //@ts-expect-error
        exactBadNarrow,
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
        //@ts-expect-error
        exactExactBad,
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
        exactBadNarrow,
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
        exactExactBad,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactNullable => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        exactNullable,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactNullable => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        exactNarrow,
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
        exactNarrow,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactNullable => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        exactExactBad,
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
        exactExactBad,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      //@ts-expect-error
      target: exactNarrow,
      //@ts-expect-error
      fn: ({c}, {d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      //@ts-expect-error
      target: exactBadNarrow,
      //@ts-expect-error
      fn: ({c}, {d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      //@ts-expect-error
      target: exactExactBad,
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
        exactNarrow,
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
        exactBadNarrow,
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
        exactExactBad,
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
        //@ts-expect-error
        exactNarrow,
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
        //@ts-expect-error
        exactBadNarrow,
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
        //@ts-expect-error
        exactExactBad,
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
        exactBadNarrow,
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
        exactExactBad,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        exactNullable,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        exactNarrow,
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
        exactNarrow,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        exactExactBad,
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
        exactExactBad,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactNullable => null as any,
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'ExactNullable'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    lack of expected error at test line 9 'fn: ({c}, {d}): ExactNullable => null as any,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactNullable'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNullable'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 17 'fn: ({c}, {d}): ExactNullable => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'ExactNullable'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNullable'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 25 'fn: ({c}, {d}): ExactNullable => null as any,'
    lack of expected error at test line 32 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'ExactNullable'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    lack of expected error at test line 37 'fn: ({c}, {d}): ExactNullable => null as any,'
    lack of expected error at test line 44 'exact,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactNullable'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNullable'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 49 'fn: ({c}, {d}): ExactNullable => null as any,'
    lack of expected error at test line 56 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'ExactNullable'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNullable'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 61 'fn: ({c}, {d}): ExactNullable => null as any,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<ExactNullable>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'ExactNullable'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    lack of expected error at test line 73 'fn: ({c}, {d}): ExactNullable => null as any,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<ExactNullable>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactNullable'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNullable'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 85 'fn: ({c}, {d}): ExactNullable => null as any,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<ExactNullable>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'ExactNullable'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNullable'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 97 'fn: ({c}, {d}): ExactNullable => null as any,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactNullable'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNullable'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 109 'fn: ({c}, {d}): ExactNullable => null as any,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'ExactNullable'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNullable'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 121 'fn: ({c}, {d}): ExactNullable => null as any,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactNullable'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNullable'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 132 'fn: ({c}, {d}): ExactNullable => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'ExactNullable'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    lack of expected error at test line 143 'fn: ({c}, {d}): ExactNullable => null as any,'
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
    lack of expected error at test line 155 'fn: ({c}, {d}): ExactNullable => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'ExactNullable'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNullable'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 166 'fn: ({c}, {d}): ExactNullable => null as any,'
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
    lack of expected error at test line 178 'fn: ({c}, {d}): ExactNullable => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'ExactNullable'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    lack of expected error at test line 186 'fn: ({c}, {d}): ExactNullable => null as any,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactNullable'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNullable'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 194 'fn: ({c}, {d}): ExactNullable => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'ExactNullable'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNullable'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 202 'fn: ({c}, {d}): ExactNullable => null as any,'
    lack of expected error at test line 209 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'ExactNullable'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    lack of expected error at test line 214 'fn: ({c}, {d}): ExactNullable => null as any,'
    lack of expected error at test line 221 'exact,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactNullable'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNullable'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 226 'fn: ({c}, {d}): ExactNullable => null as any,'
    lack of expected error at test line 233 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'ExactNullable'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNullable'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 238 'fn: ({c}, {d}): ExactNullable => null as any,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<ExactNullable>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'ExactNullable'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    lack of expected error at test line 250 'fn: ({c}, {d}): ExactNullable => null as any,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<ExactNullable>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactNullable'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNullable'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 262 'fn: ({c}, {d}): ExactNullable => null as any,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<ExactNullable>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'ExactNullable'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNullable'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 274 'fn: ({c}, {d}): ExactNullable => null as any,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactNullable'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNullable'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 286 'fn: ({c}, {d}): ExactNullable => null as any,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'ExactNullable'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNullable'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 298 'fn: ({c}, {d}): ExactNullable => null as any,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactNullable'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNullable'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 309 'fn: ({c}, {d}): ExactNullable => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'ExactNullable'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    lack of expected error at test line 320 'fn: ({c}, {d}): ExactNullable => null as any,'
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
    lack of expected error at test line 332 'fn: ({c}, {d}): ExactNullable => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<ExactNullable>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'ExactNullable'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNullable'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 343 'fn: ({c}, {d}): ExactNullable => null as any,'
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
    lack of expected error at test line 355 'fn: ({c}, {d}): ExactNullable => null as any,'
    "
  `)
})
test('source and clock exactNarrow (should fail)', () => {
  //prettier-ignore
  {
    sample({
      source: $dataSrc,
      clock: dataClock,
      //@ts-expect-error
      target: exact,
      //@ts-expect-error
      fn: ({c}, {d}): ExactNarrow => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      //@ts-expect-error
      target: exactBad,
      //@ts-expect-error
      fn: ({c}, {d}): ExactNarrow => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      //@ts-expect-error
      target: exactNullable,
      //@ts-expect-error
      fn: ({c}, {d}): ExactNarrow => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      //@ts-expect-error
      target: exactExactBad,
      //@ts-expect-error
      fn: ({c}, {d}): ExactNarrow => null as any,
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
      fn: ({c}, {d}): ExactNarrow => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        exact,
        narrow,
      ],
      fn: ({c}, {d}): ExactNarrow => null as any,
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
      fn: ({c}, {d}): ExactNarrow => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        exact,
        exactNarrow,
      ],
      fn: ({c}, {d}): ExactNarrow => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactNarrow => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactExactBad,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactNarrow => null as any,
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
      fn: ({c}, {d}): ExactNarrow => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        exactBad,
        exactNarrow,
      ],
      fn: ({c}, {d}): ExactNarrow => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        exactBad,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactNarrow => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        exactBad,
        //@ts-expect-error
        exactExactBad,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactNarrow => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        narrow,
        //@ts-expect-error
        exactBad,
      ],
      fn: ({c}, {d}): ExactNarrow => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        narrow,
        //@ts-expect-error
        exactNullable,
      ],
      fn: ({c}, {d}): ExactNarrow => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        narrow,
        //@ts-expect-error
        exactExactBad,
      ],
      fn: ({c}, {d}): ExactNarrow => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        exactNullable,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactNarrow => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        exactNarrow,
        //@ts-expect-error
        exactNullable,
      ],
      fn: ({c}, {d}): ExactNarrow => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        exactExactBad,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactNarrow => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        exactExactBad,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactNarrow => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      //@ts-expect-error
      target: exact,
      //@ts-expect-error
      fn: ({c}, {d}): ExactNarrow => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      //@ts-expect-error
      target: exactBad,
      //@ts-expect-error
      fn: ({c}, {d}): ExactNarrow => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      //@ts-expect-error
      target: exactNullable,
      //@ts-expect-error
      fn: ({c}, {d}): ExactNarrow => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      //@ts-expect-error
      target: exactExactBad,
      //@ts-expect-error
      fn: ({c}, {d}): ExactNarrow => null as any,
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
      fn: ({c}, {d}): ExactNarrow => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        exact,
        narrow,
      ],
      fn: ({c}, {d}): ExactNarrow => null as any,
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
      fn: ({c}, {d}): ExactNarrow => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        exact,
        exactNarrow,
      ],
      fn: ({c}, {d}): ExactNarrow => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactNarrow => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactExactBad,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactNarrow => null as any,
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
      fn: ({c}, {d}): ExactNarrow => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        exactBad,
        exactNarrow,
      ],
      fn: ({c}, {d}): ExactNarrow => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        exactBad,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactNarrow => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        exactBad,
        //@ts-expect-error
        exactExactBad,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactNarrow => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        narrow,
        //@ts-expect-error
        exactBad,
      ],
      fn: ({c}, {d}): ExactNarrow => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        narrow,
        //@ts-expect-error
        exactNullable,
      ],
      fn: ({c}, {d}): ExactNarrow => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        narrow,
        //@ts-expect-error
        exactExactBad,
      ],
      fn: ({c}, {d}): ExactNarrow => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        exactNullable,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactNarrow => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        exactNarrow,
        //@ts-expect-error
        exactNullable,
      ],
      fn: ({c}, {d}): ExactNarrow => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        exactExactBad,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactNarrow => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        exactExactBad,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactNarrow => null as any,
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    lack of expected error at test line 7 'target: exact,'
    Type 'ExactNarrow' is not assignable to type '{ a: number; b: string; }'.
      Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 17 'fn: ({c}, {d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactNarrow'.
          Type 'null' is not assignable to type 'ExactNarrow'.
    lack of expected error at test line 25 'fn: ({c}, {d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 33 'fn: ({c}, {d}): ExactNarrow => null as any,'
    lack of expected error at test line 40 'exact,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Unmarked error at test line 48 'source: $dataSrc,'
    lack of expected error at test line 45 'fn: ({c}, {d}): ExactNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { c: number; }, args_1: { d: string; }) => { a: number; b: string; } | { a: number; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 52 'exact,'
    lack of expected error at test line 62 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactNarrow'.
          Type 'null' is not assignable to type 'ExactNarrow'.
    Unmarked error at test line 70 'source: $dataSrc,'
    lack of expected error at test line 67 'fn: ({c}, {d}): ExactNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { c: number; }, args_1: { d: string; }) => { a: number; b: string; } | { a: number; b: string; } | { a: number; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 74 'exact,'
    lack of expected error at test line 84 'exact,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 89 'fn: ({c}, {d}): ExactNarrow => null as any,'
    lack of expected error at test line 96 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 101 'fn: ({c}, {d}): ExactNarrow => null as any,'
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
    lack of expected error at test line 113 'fn: ({c}, {d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
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
    lack of expected error at test line 135 'fn: ({c}, {d}): ExactNarrow => null as any,'
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
    lack of expected error at test line 147 'fn: ({c}, {d}): ExactNarrow => null as any,'
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
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 189 'fn: ({c}, {d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactNarrow'.
          Type 'null' is not assignable to type 'ExactNarrow'.
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
    lack of expected error at test line 211 'fn: ({c}, {d}): ExactNarrow => null as any,'
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
    lack of expected error at test line 223 'fn: ({c}, {d}): ExactNarrow => null as any,'
    lack of expected error at test line 229 'target: exact,'
    Type 'ExactNarrow' is not assignable to type '{ a: number; b: string; }'.
      Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 239 'fn: ({c}, {d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactNarrow'.
          Type 'null' is not assignable to type 'ExactNarrow'.
    lack of expected error at test line 247 'fn: ({c}, {d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 255 'fn: ({c}, {d}): ExactNarrow => null as any,'
    lack of expected error at test line 262 'exact,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Unmarked error at test line 270 'source: {c: $c},'
    lack of expected error at test line 267 'fn: ({c}, {d}): ExactNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { readonly c: number; }, args_1: { d: string; }) => { a: number; b: string; } | { a: number; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 274 'exact,'
    lack of expected error at test line 284 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactNarrow'.
          Type 'null' is not assignable to type 'ExactNarrow'.
    Unmarked error at test line 292 'source: {c: $c},'
    lack of expected error at test line 289 'fn: ({c}, {d}): ExactNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { readonly c: number; }, args_1: { d: string; }) => { a: number; b: string; } | { a: number; b: string; } | { a: number; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 296 'exact,'
    lack of expected error at test line 306 'exact,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 311 'fn: ({c}, {d}): ExactNarrow => null as any,'
    lack of expected error at test line 318 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 323 'fn: ({c}, {d}): ExactNarrow => null as any,'
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
    lack of expected error at test line 335 'fn: ({c}, {d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
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
    lack of expected error at test line 357 'fn: ({c}, {d}): ExactNarrow => null as any,'
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
    lack of expected error at test line 369 'fn: ({c}, {d}): ExactNarrow => null as any,'
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
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 411 'fn: ({c}, {d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactNarrow'.
          Type 'null' is not assignable to type 'ExactNarrow'.
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
    lack of expected error at test line 433 'fn: ({c}, {d}): ExactNarrow => null as any,'
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
    lack of expected error at test line 445 'fn: ({c}, {d}): ExactNarrow => null as any,'
    "
  `)
})
test('source and clock exactBadNarrow (should fail)', () => {
  //prettier-ignore
  {
    sample({
      source: $dataSrc,
      clock: dataClock,
      //@ts-expect-error
      target: exact,
      //@ts-expect-error
      fn: ({c}, {d}): ExactBadNarrow => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      //@ts-expect-error
      target: exactNullable,
      //@ts-expect-error
      fn: ({c}, {d}): ExactBadNarrow => null as any,
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
      fn: ({c}, {d}): ExactBadNarrow => null as any,
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
      fn: ({c}, {d}): ExactBadNarrow => null as any,
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
      fn: ({c}, {d}): ExactBadNarrow => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactNarrow,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactBadNarrow => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        exact,
        exactBadNarrow,
      ],
      fn: ({c}, {d}): ExactBadNarrow => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactExactBad,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactBadNarrow => null as any,
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
      fn: ({c}, {d}): ExactBadNarrow => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        exactBad,
        //@ts-expect-error
        exactNarrow,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactBadNarrow => null as any,
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
      fn: ({c}, {d}): ExactBadNarrow => null as any,
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
      fn: ({c}, {d}): ExactBadNarrow => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        narrow,
        //@ts-expect-error
        exactExactBad,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactBadNarrow => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        exactNullable,
        exactBadNarrow,
      ],
      fn: ({c}, {d}): ExactBadNarrow => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        exactNarrow,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactBadNarrow => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        exactExactBad,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactBadNarrow => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      //@ts-expect-error
      target: exact,
      //@ts-expect-error
      fn: ({c}, {d}): ExactBadNarrow => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      //@ts-expect-error
      target: exactNullable,
      //@ts-expect-error
      fn: ({c}, {d}): ExactBadNarrow => null as any,
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
      fn: ({c}, {d}): ExactBadNarrow => null as any,
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
      fn: ({c}, {d}): ExactBadNarrow => null as any,
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
      fn: ({c}, {d}): ExactBadNarrow => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactNarrow,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactBadNarrow => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        exact,
        exactBadNarrow,
      ],
      fn: ({c}, {d}): ExactBadNarrow => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactExactBad,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactBadNarrow => null as any,
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
      fn: ({c}, {d}): ExactBadNarrow => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        exactBad,
        //@ts-expect-error
        exactNarrow,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactBadNarrow => null as any,
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
      fn: ({c}, {d}): ExactBadNarrow => null as any,
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
      fn: ({c}, {d}): ExactBadNarrow => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        narrow,
        //@ts-expect-error
        exactExactBad,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactBadNarrow => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        exactNullable,
        exactBadNarrow,
      ],
      fn: ({c}, {d}): ExactBadNarrow => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        exactNarrow,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactBadNarrow => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        exactExactBad,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactBadNarrow => null as any,
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    lack of expected error at test line 7 'target: exact,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
        Types of property 'a' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactBadNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactBadNarrow'.
          Type 'null' is not assignable to type 'ExactBadNarrow'.
    lack of expected error at test line 17 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 24 'exact,'
    lack of expected error at test line 26 'exactBad,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 36 'exact,'
    lack of expected error at test line 38 'narrow,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 48 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactBadNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactBadNarrow'.
          Type 'null' is not assignable to type 'ExactBadNarrow'.
    lack of expected error at test line 53 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 60 'exact,'
    lack of expected error at test line 62 'exactNarrow,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    Unmarked error at test line 68 'source: $dataSrc,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { c: number; }, args_1: { d: string; }) => { a: number; b: string; } | { a: string; b: string; } | { a: number; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 72 'exact,'
    lack of expected error at test line 82 'exact,'
    lack of expected error at test line 84 'exactExactBad,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 94 'exactBad,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactBadNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactBadNarrow'.
          Type 'null' is not assignable to type 'ExactBadNarrow'.
    Unmarked error at test line 102 'source: $dataSrc,'
    lack of expected error at test line 99 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { c: number; }, args_1: { d: string; }) => { a: string; b: string; } | { a: number; b: string; } | { a: number; }; error: \\"fn result should extend target type\\"; }'.
    Unmarked error at test line 114 'source: $dataSrc,'
    lack of expected error at test line 106 'exactBad,'
    lack of expected error at test line 108 'exactNarrow,'
    lack of expected error at test line 111 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { c: number; }, args_1: { d: string; }) => { a: string; b: string; } | { a: number; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 118 'narrow,'
    lack of expected error at test line 120 'exactBad,'
    lack of expected error at test line 123 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 130 'narrow,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactBadNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactBadNarrow'.
          Type 'null' is not assignable to type 'ExactBadNarrow'.
    Unmarked error at test line 138 'source: $dataSrc,'
    lack of expected error at test line 135 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { c: number; }, args_1: { d: string; }) => { a: number; } | { a: number; b: string; } | { a: string; b: string; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 142 'narrow,'
    lack of expected error at test line 144 'exactExactBad,'
    lack of expected error at test line 147 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactBadNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactBadNarrow'.
          Type 'null' is not assignable to type 'ExactBadNarrow'.
    lack of expected error at test line 164 'exactNarrow,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactBadNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactBadNarrow'.
          Type 'null' is not assignable to type 'ExactBadNarrow'.
    lack of expected error at test line 169 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 176 'exactExactBad,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactBadNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactBadNarrow'.
          Type 'null' is not assignable to type 'ExactBadNarrow'.
    lack of expected error at test line 181 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 187 'target: exact,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
        Types of property 'a' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactBadNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactBadNarrow'.
          Type 'null' is not assignable to type 'ExactBadNarrow'.
    lack of expected error at test line 197 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 204 'exact,'
    lack of expected error at test line 206 'exactBad,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 216 'exact,'
    lack of expected error at test line 218 'narrow,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 228 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactBadNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactBadNarrow'.
          Type 'null' is not assignable to type 'ExactBadNarrow'.
    lack of expected error at test line 233 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 240 'exact,'
    lack of expected error at test line 242 'exactNarrow,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    Unmarked error at test line 248 'source: {c: $c},'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { readonly c: number; }, args_1: { d: string; }) => { a: number; b: string; } | { a: string; b: string; } | { a: number; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 252 'exact,'
    lack of expected error at test line 262 'exact,'
    lack of expected error at test line 264 'exactExactBad,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 274 'exactBad,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactBadNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactBadNarrow'.
          Type 'null' is not assignable to type 'ExactBadNarrow'.
    Unmarked error at test line 282 'source: {c: $c},'
    lack of expected error at test line 279 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { readonly c: number; }, args_1: { d: string; }) => { a: string; b: string; } | { a: number; b: string; } | { a: number; }; error: \\"fn result should extend target type\\"; }'.
    Unmarked error at test line 294 'source: {c: $c},'
    lack of expected error at test line 286 'exactBad,'
    lack of expected error at test line 288 'exactNarrow,'
    lack of expected error at test line 291 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { readonly c: number; }, args_1: { d: string; }) => { a: string; b: string; } | { a: number; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 298 'narrow,'
    lack of expected error at test line 300 'exactBad,'
    lack of expected error at test line 303 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 310 'narrow,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactBadNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactBadNarrow'.
          Type 'null' is not assignable to type 'ExactBadNarrow'.
    Unmarked error at test line 318 'source: {c: $c},'
    lack of expected error at test line 315 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { readonly c: number; }, args_1: { d: string; }) => { a: number; } | { a: number; b: string; } | { a: string; b: string; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 322 'narrow,'
    lack of expected error at test line 324 'exactExactBad,'
    lack of expected error at test line 327 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactBadNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactBadNarrow'.
          Type 'null' is not assignable to type 'ExactBadNarrow'.
    lack of expected error at test line 344 'exactNarrow,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactBadNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactBadNarrow'.
          Type 'null' is not assignable to type 'ExactBadNarrow'.
    lack of expected error at test line 349 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 356 'exactExactBad,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactBadNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactBadNarrow'.
          Type 'null' is not assignable to type 'ExactBadNarrow'.
    lack of expected error at test line 361 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    "
  `)
})
test('source and clock exactExactBad (should fail)', () => {
  //prettier-ignore
  {
    sample({
      source: $dataSrc,
      clock: dataClock,
      //@ts-expect-error
      target: exact,
      //@ts-expect-error
      fn: ({c}, {d}): ExactExactBad => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      //@ts-expect-error
      target: narrow,
      //@ts-expect-error
      fn: ({c}, {d}): ExactExactBad => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      //@ts-expect-error
      target: exactNullable,
      //@ts-expect-error
      fn: ({c}, {d}): ExactExactBad => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      //@ts-expect-error
      target: exactNarrow,
      //@ts-expect-error
      fn: ({c}, {d}): ExactExactBad => null as any,
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
      fn: ({c}, {d}): ExactExactBad => null as any,
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
      fn: ({c}, {d}): ExactExactBad => null as any,
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
      fn: ({c}, {d}): ExactExactBad => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactNarrow,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactExactBad => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactExactBad => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        exact,
        exactExactBad,
      ],
      fn: ({c}, {d}): ExactExactBad => null as any,
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
      fn: ({c}, {d}): ExactExactBad => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        exactBad,
        //@ts-expect-error
        exactNarrow,
      ],
      fn: ({c}, {d}): ExactExactBad => null as any,
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
      fn: ({c}, {d}): ExactExactBad => null as any,
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
      fn: ({c}, {d}): ExactExactBad => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        narrow,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactExactBad => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        narrow,
        exactExactBad,
      ],
      fn: ({c}, {d}): ExactExactBad => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        exactNullable,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactExactBad => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        exactNarrow,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactExactBad => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        //@ts-expect-error
        exactNarrow,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactExactBad => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      target: [
        exactExactBad,
        //@ts-expect-error
        exactNullable,
      ],
      fn: ({c}, {d}): ExactExactBad => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      //@ts-expect-error
      target: exact,
      //@ts-expect-error
      fn: ({c}, {d}): ExactExactBad => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      //@ts-expect-error
      target: narrow,
      //@ts-expect-error
      fn: ({c}, {d}): ExactExactBad => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      //@ts-expect-error
      target: exactNullable,
      //@ts-expect-error
      fn: ({c}, {d}): ExactExactBad => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      //@ts-expect-error
      target: exactNarrow,
      //@ts-expect-error
      fn: ({c}, {d}): ExactExactBad => null as any,
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
      fn: ({c}, {d}): ExactExactBad => null as any,
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
      fn: ({c}, {d}): ExactExactBad => null as any,
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
      fn: ({c}, {d}): ExactExactBad => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactNarrow,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactExactBad => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        exact,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactExactBad => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        exact,
        exactExactBad,
      ],
      fn: ({c}, {d}): ExactExactBad => null as any,
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
      fn: ({c}, {d}): ExactExactBad => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        exactBad,
        //@ts-expect-error
        exactNarrow,
      ],
      fn: ({c}, {d}): ExactExactBad => null as any,
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
      fn: ({c}, {d}): ExactExactBad => null as any,
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
      fn: ({c}, {d}): ExactExactBad => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        narrow,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactExactBad => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        narrow,
        exactExactBad,
      ],
      fn: ({c}, {d}): ExactExactBad => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        exactNullable,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactExactBad => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        exactNarrow,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactExactBad => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        //@ts-expect-error
        exactNarrow,
        //@ts-expect-error
        exactBadNarrow,
      ],
      //@ts-expect-error
      fn: ({c}, {d}): ExactExactBad => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      target: [
        exactExactBad,
        //@ts-expect-error
        exactNullable,
      ],
      fn: ({c}, {d}): ExactExactBad => null as any,
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    lack of expected error at test line 7 'target: exact,'
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
        Types of property 'a' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 17 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    lack of expected error at test line 25 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Unmarked error at test line 36 'source: $dataSrc,'
    lack of expected error at test line 33 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { c: number; }, args_1: { d: string; }) => { a: number; b: string; } | { a: string; b: string; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 40 'exact,'
    lack of expected error at test line 42 'exactBad,'
    lack of expected error at test line 51 'exact,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 56 'fn: ({c}, {d}): ExactExactBad => null as any,'
    lack of expected error at test line 63 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    lack of expected error at test line 68 'fn: ({c}, {d}): ExactExactBad => null as any,'
    lack of expected error at test line 75 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 80 'fn: ({c}, {d}): ExactExactBad => null as any,'
    lack of expected error at test line 87 'exact,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Unmarked error at test line 95 'source: $dataSrc,'
    lack of expected error at test line 92 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { c: number; }, args_1: { d: string; }) => { a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 99 'exact,'
    lack of expected error at test line 109 'exactBad,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    lack of expected error at test line 120 'exactBad,'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 133 'exactBad,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    lack of expected error at test line 147 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 159 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 181 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    lack of expected error at test line 193 'fn: ({c}, {d}): ExactExactBad => null as any,'
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
    lack of expected error at test line 205 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    lack of expected error at test line 221 'target: exact,'
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
        Types of property 'a' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 231 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    lack of expected error at test line 239 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Unmarked error at test line 250 'source: {c: $c},'
    lack of expected error at test line 247 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { readonly c: number; }, args_1: { d: string; }) => { a: number; b: string; } | { a: string; b: string; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 254 'exact,'
    lack of expected error at test line 256 'exactBad,'
    lack of expected error at test line 265 'exact,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 270 'fn: ({c}, {d}): ExactExactBad => null as any,'
    lack of expected error at test line 277 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    lack of expected error at test line 282 'fn: ({c}, {d}): ExactExactBad => null as any,'
    lack of expected error at test line 289 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 294 'fn: ({c}, {d}): ExactExactBad => null as any,'
    lack of expected error at test line 301 'exact,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Unmarked error at test line 309 'source: {c: $c},'
    lack of expected error at test line 306 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { readonly c: number; }, args_1: { d: string; }) => { a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 313 'exact,'
    lack of expected error at test line 323 'exactBad,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    lack of expected error at test line 334 'exactBad,'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 347 'exactBad,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    lack of expected error at test line 361 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 373 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 395 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    lack of expected error at test line 407 'fn: ({c}, {d}): ExactExactBad => null as any,'
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
    lack of expected error at test line 419 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    "
  `)
})
