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
        sample({
          clock: clockExactNarrow,
          target: exact,
          //@ts-expect-error
          fn: ({c, d}: DataExact) => ({a: c, b: d}),
        })
        sample({
          clock: clockExactBadNarrow,
          target: exact,
          //@ts-expect-error
          fn: ({c, d}: DataExact) => ({a: c, b: d}),
        })
        sample({
          clock: clockExactExactBad,
          target: exact,
          //@ts-expect-error
          fn: ({c, d}: DataExact) => ({a: c, b: d}),
        })
        sample({
          clock: [clockExact,clockExactNarrow],
          target: exact,
          //@ts-expect-error
          fn: ({c, d}: DataExact) => ({a: c, b: d}),
        })
        sample({
          clock: [clockExact,clockExactBadNarrow],
          target: exact,
          //@ts-expect-error
          fn: ({c, d}: DataExact) => ({a: c, b: d}),
        })
        sample({
          clock: [clockExact,clockExactExactBad],
          target: exact,
          //@ts-expect-error
          fn: ({c, d}: DataExact) => ({a: c, b: d}),
        })
        sample({
          clock: [clockExactBad,clockExactNarrow],
          target: exact,
          //@ts-expect-error
          fn: ({c, d}: DataExact) => ({a: c, b: d}),
        })
        sample({
          clock: [clockExactBad,clockExactBadNarrow],
          target: exact,
          //@ts-expect-error
          fn: ({c, d}: DataExact) => ({a: c, b: d}),
        })
        sample({
          clock: [clockExactBad,clockExactExactBad],
          target: exact,
          //@ts-expect-error
          fn: ({c, d}: DataExact) => ({a: c, b: d}),
        })
        sample({
          clock: [clockNarrow,clockExactBadNarrow],
          target: exact,
          //@ts-expect-error
          fn: ({c, d}: DataExact) => ({a: c, b: d}),
        })
        sample({
          clock: [clockNarrow,clockExactExactBad],
          target: exact,
          //@ts-expect-error
          fn: ({c, d}: DataExact) => ({a: c, b: d}),
        })
        sample({
          clock: [clockExactNullable,clockExactBadNarrow],
          target: exact,
          //@ts-expect-error
          fn: ({c, d}: DataExact) => ({a: c, b: d}),
        })
        sample({
          clock: [clockExactNarrow,clockExactNullable],
          target: exact,
          //@ts-expect-error
          fn: ({c, d}: DataExact) => ({a: c, b: d}),
        })
        sample({
          clock: [clockExactNarrow,clockExactBadNarrow],
          target: exact,
          //@ts-expect-error
          fn: ({c, d}: DataExact) => ({a: c, b: d}),
        })
        sample({
          clock: [clockExactExactBad,clockExactNullable],
          target: exact,
          //@ts-expect-error
          fn: ({c, d}: DataExact) => ({a: c, b: d}),
        })
        sample({
          clock: [clockExactExactBad,clockExactBadNarrow],
          target: exact,
          //@ts-expect-error
          fn: ({c, d}: DataExact) => ({a: c, b: d}),
        })
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
        lack of expected error at test line 102 'target: exact,'
        Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '((clk: { c: string; d: string; }) => any) & (({ c, d }: DataExact) => { a: number; b: string; })'.
          Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '(clk: { c: string; d: string; }) => any'.
            Types of parameters '__0' and 'clk' are incompatible.
              Type '{ c: string; d: string; }' is not assignable to type 'DataExact'.
                Types of property 'c' are incompatible.
                  Type 'string' is not assignable to type 'number'.
        lack of expected error at test line 109 'target: exact,'
        Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '((clk: { c: number; }) => any) & (({ c, d }: DataExact) => { a: number; b: string; })'.
          Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '(clk: { c: number; }) => any'.
            Types of parameters '__0' and 'clk' are incompatible.
              Property 'd' is missing in type '{ c: number; }' but required in type 'DataExact'.
        lack of expected error at test line 116 'target: exact,'
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
        //@ts-expect-error
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        clock: clockExact,
        target: [
          //@ts-expect-error
          exactBad,
          exactNarrow,
        ],
        //@ts-expect-error
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
        //@ts-expect-error
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
        //@ts-expect-error
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        clock: clockExact,
        target: [
          exactNarrow,
          //@ts-expect-error
          exactBadNarrow,
        ],
        //@ts-expect-error
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        clock: clockExact,
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      clock: clockExact,
      target: [
        narrow,
        //@ts-expect-error
        exactNullable,
      ],
      //@ts-expect-error
      fn: ({c, d}): ExactNarrow => null as any,
    })
    sample({
      clock: clockExact,
      target: [
        narrow,
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
      //@ts-expect-error
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
    lack of expected error at test line 50 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 56 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactNarrow'.
          Type 'null' is not assignable to type 'ExactNarrow'.
    Unmarked error at test line 64 'clock: clockExact,'
    lack of expected error at test line 61 'fn: ({c, d}): ExactNarrow => null as any,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (args_0: { c: number; d: string; }) => { a: number; b: string; } | { a: number; b: string; } | { a: number; }; error: \\"fn result should extend target type\\"; }'.
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
      //@ts-expect-error
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
      //@ts-expect-error
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
    Unmarked error at test line 94 'clock: clockExact,'
    lack of expected error at test line 91 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (args_0: { c: number; d: string; }) => { a: string; b: string; } | { a: number; b: string; } | { a: number; }; error: \\"fn result should extend target type\\"; }'.
    Unmarked error at test line 105 'clock: clockExact,'
    lack of expected error at test line 97 'exactBad,'
    lack of expected error at test line 99 'exactNarrow,'
    lack of expected error at test line 102 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (args_0: { c: number; d: string; }) => { a: string; b: string; } | { a: number; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 108 'narrow,'
    lack of expected error at test line 110 'exactBad,'
    lack of expected error at test line 113 'fn: ({c, d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 119 'narrow,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactBadNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactBadNarrow'.
          Type 'null' is not assignable to type 'ExactBadNarrow'.
    Unmarked error at test line 127 'clock: clockExact,'
    lack of expected error at test line 124 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (args_0: { c: number; d: string; }) => { a: number; } | { a: number; b: string; } | { a: string; b: string; }; error: \\"fn result should extend target type\\"; }'.
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
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
    Unmarked error at test line 32 'clock: clockExact,'
    lack of expected error at test line 29 'fn: ({c, d}): ExactExactBad => null as any,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (args_0: { c: number; d: string; }) => { a: number; b: string; } | { a: string; b: string; }; error: \\"fn result should extend target type\\"; }'.
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
    Unmarked error at test line 87 'clock: clockExact,'
    lack of expected error at test line 84 'fn: ({c, d}): ExactExactBad => null as any,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (args_0: { c: number; d: string; }) => { a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; }; error: \\"fn result should extend target type\\"; }'.
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
        //@ts-expect-error
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
        //@ts-expect-error
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
        //@ts-expect-error
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
        //@ts-expect-error
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
        //@ts-expect-error
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
        //@ts-expect-error
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
        //@ts-expect-error
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
        //@ts-expect-error
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
        //@ts-expect-error
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
        //@ts-expect-error
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
        //@ts-expect-error
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
        //@ts-expect-error
        fn: ({c}, {d}) => ({a: c, b: d}),
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      lack of expected error at test line 7 'target: exactBadNarrow,'
      lack of expected error at test line 9 'fn: ({c}, {d}) => ({a: c, b: d}),'
      lack of expected error at test line 17 'exactBadNarrow,'
      lack of expected error at test line 20 'fn: ({c}, {d}) => ({a: c, b: d}),'
      Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        The types of '__.a' are incompatible between these types.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 28 'exactNarrow,'
      Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        Types of property '__' are incompatible.
          Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: number; b: string; }'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
      lack of expected error at test line 31 'fn: ({c}, {d}) => ({a: c, b: d}),'
      Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        The types of '__.a' are incompatible between these types.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        Types of property '__' are incompatible.
          Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: number; b: string; }'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 43 'fn: ({c}, {d}) => ({a: c, b: d}),'
      Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        The types of '__.a' are incompatible between these types.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 51 'exactExactBad,'
      Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        Types of property '__' are incompatible.
          Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 54 'fn: ({c}, {d}) => ({a: c, b: d}),'
      lack of expected error at test line 62 'exactBadNarrow,'
      lack of expected error at test line 65 'fn: ({c}, {d}) => ({a: c, b: d}),'
      lack of expected error at test line 73 'exactBadNarrow,'
      lack of expected error at test line 76 'fn: ({c}, {d}) => ({a: c, b: d}),'
      lack of expected error at test line 84 'exactBadNarrow,'
      lack of expected error at test line 87 'fn: ({c}, {d}) => ({a: c, b: d}),'
      lack of expected error at test line 95 'exactBadNarrow,'
      lack of expected error at test line 98 'fn: ({c}, {d}) => ({a: c, b: d}),'
      lack of expected error at test line 104 'target: exactBadNarrow,'
      lack of expected error at test line 106 'fn: ({c}, {d}) => ({a: c, b: d}),'
      lack of expected error at test line 114 'exactBadNarrow,'
      lack of expected error at test line 117 'fn: ({c}, {d}) => ({a: c, b: d}),'
      Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        The types of '__.a' are incompatible between these types.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 125 'exactNarrow,'
      Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        Types of property '__' are incompatible.
          Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: number; b: string; }'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
      lack of expected error at test line 128 'fn: ({c}, {d}) => ({a: c, b: d}),'
      Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        The types of '__.a' are incompatible between these types.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        Types of property '__' are incompatible.
          Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: number; b: string; }'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 140 'fn: ({c}, {d}) => ({a: c, b: d}),'
      Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        The types of '__.a' are incompatible between these types.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 148 'exactExactBad,'
      Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        Types of property '__' are incompatible.
          Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 151 'fn: ({c}, {d}) => ({a: c, b: d}),'
      lack of expected error at test line 159 'exactBadNarrow,'
      lack of expected error at test line 162 'fn: ({c}, {d}) => ({a: c, b: d}),'
      lack of expected error at test line 170 'exactBadNarrow,'
      lack of expected error at test line 173 'fn: ({c}, {d}) => ({a: c, b: d}),'
      lack of expected error at test line 181 'exactBadNarrow,'
      lack of expected error at test line 184 'fn: ({c}, {d}) => ({a: c, b: d}),'
      lack of expected error at test line 192 'exactBadNarrow,'
      lack of expected error at test line 195 'fn: ({c}, {d}) => ({a: c, b: d}),'
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
      //@ts-expect-error
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
      //@ts-expect-error
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
    lack of expected error at test line 54 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Unmarked error at test line 62 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 65 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Unmarked error at test line 73 'exactExactBad,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 76 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: string; b: string; }'.
          Type 'null' is not assignable to type '{ a: string; b: string; }'.
    Unmarked error at test line 84 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 87 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
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
    lack of expected error at test line 99 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    Unmarked error at test line 107 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Unmarked error at test line 116 'exactExactBad,'
    lack of expected error at test line 110 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
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
    lack of expected error at test line 121 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 129 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 141 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
    Unmarked error at test line 149 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 152 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
    Unmarked error at test line 160 'exactExactBad,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 163 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 174 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Unmarked error at test line 182 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 185 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Unmarked error at test line 193 'exactExactBad,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 196 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: string; b: string; }'.
          Type 'null' is not assignable to type '{ a: string; b: string; }'.
    Unmarked error at test line 204 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 207 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
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
    lack of expected error at test line 219 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    Unmarked error at test line 227 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Unmarked error at test line 236 'exactExactBad,'
    lack of expected error at test line 230 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
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
    lack of expected error at test line 241 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
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
    Unmarked error at test line 28 'exactBadNarrow,'
    lack of expected error at test line 16 'exact,'
    lack of expected error at test line 20 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 27 'exact,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 31 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 38 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 43 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 54 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Unmarked error at test line 62 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 65 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 77 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 88 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
    Unmarked error at test line 96 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 99 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
    lack of expected error at test line 110 'fn: ({c}) => ({a: c}),'
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
    lack of expected error at test line 122 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Unmarked error at test line 130 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 133 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Unmarked error at test line 144 'source: {c: $c},'
    lack of expected error at test line 141 'fn: ({c}) => ({a: c}),'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { readonly c: number; }) => { a: number; b: string; } | { a: number; b: string; } | { a: number; }; error: \\"fn result should extend target type\\"; }'.
    Unmarked error at test line 160 'exactBadNarrow,'
    lack of expected error at test line 148 'exact,'
    lack of expected error at test line 152 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 159 'exact,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 163 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 170 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 175 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 186 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Unmarked error at test line 194 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 197 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 209 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 220 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
    Unmarked error at test line 228 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 231 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
    lack of expected error at test line 242 'fn: ({c}) => ({a: c}),'
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
    lack of expected error at test line 254 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Unmarked error at test line 262 'exactBadNarrow,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 265 'fn: ({c}) => ({a: c}),'
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
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
    lack of expected error at test line 56 'fn: ({c}, {d}): ExactNarrow => null as any,'
    lack of expected error at test line 63 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactNarrow'.
          Type 'null' is not assignable to type 'ExactNarrow'.
    Unmarked error at test line 71 'source: $dataSrc,'
    lack of expected error at test line 68 'fn: ({c}, {d}): ExactNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { c: number; }, args_1: { d: string; }) => { a: number; b: string; } | { a: number; b: string; } | { a: number; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 75 'exact,'
    lack of expected error at test line 79 'fn: ({c}, {d}): ExactNarrow => null as any,'
    lack of expected error at test line 86 'exact,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 91 'fn: ({c}, {d}): ExactNarrow => null as any,'
    lack of expected error at test line 98 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 103 'fn: ({c}, {d}): ExactNarrow => null as any,'
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
    lack of expected error at test line 115 'fn: ({c}, {d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 126 'fn: ({c}, {d}): ExactNarrow => null as any,'
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
    lack of expected error at test line 138 'fn: ({c}, {d}): ExactNarrow => null as any,'
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
    lack of expected error at test line 150 'fn: ({c}, {d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 161 'fn: ({c}, {d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactNarrow'.
          Type 'null' is not assignable to type 'ExactNarrow'.
    lack of expected error at test line 172 'fn: ({c}, {d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 183 'fn: ({c}, {d}): ExactNarrow => null as any,'
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
    lack of expected error at test line 195 'fn: ({c}, {d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactNarrow'.
          Type 'null' is not assignable to type 'ExactNarrow'.
    lack of expected error at test line 206 'fn: ({c}, {d}): ExactNarrow => null as any,'
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
    lack of expected error at test line 218 'fn: ({c}, {d}): ExactNarrow => null as any,'
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
    lack of expected error at test line 230 'fn: ({c}, {d}): ExactNarrow => null as any,'
    lack of expected error at test line 236 'target: exact,'
    Type 'ExactNarrow' is not assignable to type '{ a: number; b: string; }'.
      Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 246 'fn: ({c}, {d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactNarrow'.
          Type 'null' is not assignable to type 'ExactNarrow'.
    lack of expected error at test line 254 'fn: ({c}, {d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 262 'fn: ({c}, {d}): ExactNarrow => null as any,'
    lack of expected error at test line 269 'exact,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Unmarked error at test line 277 'source: {c: $c},'
    lack of expected error at test line 274 'fn: ({c}, {d}): ExactNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { readonly c: number; }, args_1: { d: string; }) => { a: number; b: string; } | { a: number; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 281 'exact,'
    lack of expected error at test line 285 'fn: ({c}, {d}): ExactNarrow => null as any,'
    lack of expected error at test line 292 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactNarrow'.
          Type 'null' is not assignable to type 'ExactNarrow'.
    Unmarked error at test line 300 'source: {c: $c},'
    lack of expected error at test line 297 'fn: ({c}, {d}): ExactNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { readonly c: number; }, args_1: { d: string; }) => { a: number; b: string; } | { a: number; b: string; } | { a: number; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 304 'exact,'
    lack of expected error at test line 308 'fn: ({c}, {d}): ExactNarrow => null as any,'
    lack of expected error at test line 315 'exact,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 320 'fn: ({c}, {d}): ExactNarrow => null as any,'
    lack of expected error at test line 327 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 332 'fn: ({c}, {d}): ExactNarrow => null as any,'
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
    lack of expected error at test line 344 'fn: ({c}, {d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 355 'fn: ({c}, {d}): ExactNarrow => null as any,'
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
    lack of expected error at test line 367 'fn: ({c}, {d}): ExactNarrow => null as any,'
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
    lack of expected error at test line 379 'fn: ({c}, {d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 390 'fn: ({c}, {d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactNarrow'.
          Type 'null' is not assignable to type 'ExactNarrow'.
    lack of expected error at test line 401 'fn: ({c}, {d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'ExactNarrow'.
          Type '{ a: string; b: string; }' is not assignable to type 'ExactNarrow'.
            Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
              Types of property 'a' are incompatible.
                Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 412 'fn: ({c}, {d}): ExactNarrow => null as any,'
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
    lack of expected error at test line 424 'fn: ({c}, {d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactNarrow'.
          Type 'null' is not assignable to type 'ExactNarrow'.
    lack of expected error at test line 435 'fn: ({c}, {d}): ExactNarrow => null as any,'
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
    lack of expected error at test line 447 'fn: ({c}, {d}): ExactNarrow => null as any,'
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
    lack of expected error at test line 459 'fn: ({c}, {d}): ExactNarrow => null as any,'
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
      //@ts-expect-error
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
      //@ts-expect-error
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
    lack of expected error at test line 76 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 83 'exact,'
    lack of expected error at test line 85 'exactExactBad,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 95 'exactBad,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactBadNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactBadNarrow'.
          Type 'null' is not assignable to type 'ExactBadNarrow'.
    Unmarked error at test line 103 'source: $dataSrc,'
    lack of expected error at test line 100 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { c: number; }, args_1: { d: string; }) => { a: string; b: string; } | { a: number; b: string; } | { a: number; }; error: \\"fn result should extend target type\\"; }'.
    Unmarked error at test line 115 'source: $dataSrc,'
    lack of expected error at test line 107 'exactBad,'
    lack of expected error at test line 109 'exactNarrow,'
    lack of expected error at test line 112 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { c: number; }, args_1: { d: string; }) => { a: string; b: string; } | { a: number; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 119 'narrow,'
    lack of expected error at test line 121 'exactBad,'
    lack of expected error at test line 124 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 131 'narrow,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactBadNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactBadNarrow'.
          Type 'null' is not assignable to type 'ExactBadNarrow'.
    Unmarked error at test line 139 'source: $dataSrc,'
    lack of expected error at test line 136 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { c: number; }, args_1: { d: string; }) => { a: number; } | { a: number; b: string; } | { a: string; b: string; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 143 'narrow,'
    lack of expected error at test line 145 'exactExactBad,'
    lack of expected error at test line 148 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactBadNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactBadNarrow'.
          Type 'null' is not assignable to type 'ExactBadNarrow'.
    lack of expected error at test line 159 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 166 'exactNarrow,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactBadNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactBadNarrow'.
          Type 'null' is not assignable to type 'ExactBadNarrow'.
    lack of expected error at test line 171 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 178 'exactExactBad,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactBadNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactBadNarrow'.
          Type 'null' is not assignable to type 'ExactBadNarrow'.
    lack of expected error at test line 183 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 189 'target: exact,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
        Types of property 'a' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactBadNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactBadNarrow'.
          Type 'null' is not assignable to type 'ExactBadNarrow'.
    lack of expected error at test line 199 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 206 'exact,'
    lack of expected error at test line 208 'exactBad,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 218 'exact,'
    lack of expected error at test line 220 'narrow,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 230 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactBadNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactBadNarrow'.
          Type 'null' is not assignable to type 'ExactBadNarrow'.
    lack of expected error at test line 235 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 242 'exact,'
    lack of expected error at test line 244 'exactNarrow,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    Unmarked error at test line 250 'source: {c: $c},'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { readonly c: number; }, args_1: { d: string; }) => { a: number; b: string; } | { a: string; b: string; } | { a: number; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 254 'exact,'
    lack of expected error at test line 258 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 265 'exact,'
    lack of expected error at test line 267 'exactExactBad,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 277 'exactBad,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactBadNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactBadNarrow'.
          Type 'null' is not assignable to type 'ExactBadNarrow'.
    Unmarked error at test line 285 'source: {c: $c},'
    lack of expected error at test line 282 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { readonly c: number; }, args_1: { d: string; }) => { a: string; b: string; } | { a: number; b: string; } | { a: number; }; error: \\"fn result should extend target type\\"; }'.
    Unmarked error at test line 297 'source: {c: $c},'
    lack of expected error at test line 289 'exactBad,'
    lack of expected error at test line 291 'exactNarrow,'
    lack of expected error at test line 294 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { readonly c: number; }, args_1: { d: string; }) => { a: string; b: string; } | { a: number; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 301 'narrow,'
    lack of expected error at test line 303 'exactBad,'
    lack of expected error at test line 306 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 313 'narrow,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactBadNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactBadNarrow'.
          Type 'null' is not assignable to type 'ExactBadNarrow'.
    Unmarked error at test line 321 'source: {c: $c},'
    lack of expected error at test line 318 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { readonly c: number; }, args_1: { d: string; }) => { a: number; } | { a: number; b: string; } | { a: string; b: string; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 325 'narrow,'
    lack of expected error at test line 327 'exactExactBad,'
    lack of expected error at test line 330 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactBadNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactBadNarrow'.
          Type 'null' is not assignable to type 'ExactBadNarrow'.
    lack of expected error at test line 341 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 348 'exactNarrow,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactBadNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactBadNarrow'.
          Type 'null' is not assignable to type 'ExactBadNarrow'.
    lack of expected error at test line 353 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 360 'exactExactBad,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactBadNarrow>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactBadNarrow'.
          Type 'null' is not assignable to type 'ExactBadNarrow'.
    lack of expected error at test line 365 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
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
      //@ts-expect-error
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
      //@ts-expect-error
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
        exactBad,
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
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
      //@ts-expect-error
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
        exactBad,
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
      //@ts-expect-error
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
      //@ts-expect-error
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
    lack of expected error at test line 45 'fn: ({c}, {d}): ExactExactBad => null as any,'
    lack of expected error at test line 52 'exact,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 57 'fn: ({c}, {d}): ExactExactBad => null as any,'
    lack of expected error at test line 64 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    lack of expected error at test line 69 'fn: ({c}, {d}): ExactExactBad => null as any,'
    lack of expected error at test line 76 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 81 'fn: ({c}, {d}): ExactExactBad => null as any,'
    lack of expected error at test line 88 'exact,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Unmarked error at test line 96 'source: $dataSrc,'
    lack of expected error at test line 93 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { c: number; }, args_1: { d: string; }) => { a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 100 'exact,'
    lack of expected error at test line 104 'fn: ({c}, {d}): ExactExactBad => null as any,'
    lack of expected error at test line 111 'exactBad,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    lack of expected error at test line 116 'fn: ({c}, {d}): ExactExactBad => null as any,'
    lack of expected error at test line 123 'exactBad,'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 128 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 137 'exactBad,'
    lack of expected error at test line 140 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    lack of expected error at test line 152 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 164 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 175 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 187 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    lack of expected error at test line 199 'fn: ({c}, {d}): ExactExactBad => null as any,'
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
    lack of expected error at test line 211 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    lack of expected error at test line 222 'fn: ({c}, {d}): ExactExactBad => null as any,'
    lack of expected error at test line 228 'target: exact,'
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
        Types of property 'a' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 238 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    lack of expected error at test line 246 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Unmarked error at test line 257 'source: {c: $c},'
    lack of expected error at test line 254 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { readonly c: number; }, args_1: { d: string; }) => { a: number; b: string; } | { a: string; b: string; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 261 'exact,'
    lack of expected error at test line 263 'exactBad,'
    lack of expected error at test line 266 'fn: ({c}, {d}): ExactExactBad => null as any,'
    lack of expected error at test line 273 'exact,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 278 'fn: ({c}, {d}): ExactExactBad => null as any,'
    lack of expected error at test line 285 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    lack of expected error at test line 290 'fn: ({c}, {d}): ExactExactBad => null as any,'
    lack of expected error at test line 297 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 302 'fn: ({c}, {d}): ExactExactBad => null as any,'
    lack of expected error at test line 309 'exact,'
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Unmarked error at test line 317 'source: {c: $c},'
    lack of expected error at test line 314 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { readonly c: number; }, args_1: { d: string; }) => { a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; }; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 321 'exact,'
    lack of expected error at test line 325 'fn: ({c}, {d}): ExactExactBad => null as any,'
    lack of expected error at test line 332 'exactBad,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    lack of expected error at test line 337 'fn: ({c}, {d}): ExactExactBad => null as any,'
    lack of expected error at test line 344 'exactBad,'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 349 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 358 'exactBad,'
    lack of expected error at test line 361 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    lack of expected error at test line 373 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 385 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 396 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 408 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'ExactExactBad'.
          Type '{ a: number; }' is not assignable to type 'ExactExactBad'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    lack of expected error at test line 420 'fn: ({c}, {d}): ExactExactBad => null as any,'
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
    lack of expected error at test line 432 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<ExactExactBad>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type 'ExactExactBad'.
          Type 'null' is not assignable to type 'ExactExactBad'.
    lack of expected error at test line 443 'fn: ({c}, {d}): ExactExactBad => null as any,'
    "
  `)
})
