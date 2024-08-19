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
    lack of expected error at test line 6 'target: exactNarrow,'
    Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 14 'exact,'
    lack of expected error at test line 16 'exactNarrow,'
    Type 'string' is not assignable to type 'number'.
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
    lack of expected error at test line 85 'exactNarrow,'
    lack of expected error at test line 87 'exactNullable,'
    Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 96 'exactNarrow,'
    lack of expected error at test line 100 'fn: ({d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 107 'exactNullable,'
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
    lack of expected error at test line 6 'target: exactExactBad,'
    Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 14 'exact,'
    lack of expected error at test line 18 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 24 'exact,'
    lack of expected error at test line 28 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 34 'exact,'
    lack of expected error at test line 36 'exactExactBad,'
    Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
      Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 45 'exactBad,'
    lack of expected error at test line 49 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 55 'exactBad,'
    lack of expected error at test line 59 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 65 'exactBad,'
    lack of expected error at test line 67 'exactExactBad,'
    Type '{ a: number; }' is not assignable to type '{ a: string; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
      Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 77 'exactExactBad,'
    lack of expected error at test line 80 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 86 'exactNullable,'
    lack of expected error at test line 90 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 97 'exactNullable,'
    lack of expected error at test line 100 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 106 'exactExactBad,'
    lack of expected error at test line 108 'exactNullable,'
    Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 117 'exactExactBad,'
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
    lack of expected error at test line 6 'target: exactNarrow,'
    Type 'ExactNullable' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
    lack of expected error at test line 13 'target: exactBadNarrow,'
    Type 'ExactNullable' is not assignable to type '{ a: string; b: string; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: string; b: string; } | { a: number; }'.
    lack of expected error at test line 20 'target: exactExactBad,'
    Type 'ExactNullable' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Type 'null' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
    lack of expected error at test line 28 'exact,'
    lack of expected error at test line 30 'exactNarrow,'
    Type 'ExactNullable' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: number; }'.
    lack of expected error at test line 39 'exact,'
    lack of expected error at test line 41 'exactBadNarrow,'
    Type 'ExactNullable' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; } | { a: number; }'.
    lack of expected error at test line 50 'exact,'
    lack of expected error at test line 52 'exactExactBad,'
    Type 'ExactNullable' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
      Type 'null' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
    lack of expected error at test line 61 'exactBad,'
    lack of expected error at test line 63 'exactNarrow,'
    Type 'ExactNullable' is not assignable to type '{ a: string; b: string; } | { a: number; b: string; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: string; b: string; } | { a: number; b: string; } | { a: number; }'.
    lack of expected error at test line 72 'exactBad,'
    lack of expected error at test line 74 'exactBadNarrow,'
    Type 'ExactNullable' is not assignable to type '{ a: string; b: string; } | { a: string; b: string; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: string; b: string; } | { a: string; b: string; } | { a: number; }'.
    lack of expected error at test line 83 'exactBad,'
    lack of expected error at test line 85 'exactExactBad,'
    Type 'ExactNullable' is not assignable to type '{ a: string; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
      Type 'null' is not assignable to type '{ a: string; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
    lack of expected error at test line 94 'narrow,'
    lack of expected error at test line 96 'exactBadNarrow,'
    Type 'ExactNullable' is not assignable to type '{ a: number; } | { a: string; b: string; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: number; } | { a: string; b: string; } | { a: number; }'.
    lack of expected error at test line 105 'narrow,'
    lack of expected error at test line 107 'exactExactBad,'
    Type 'ExactNullable' is not assignable to type '{ a: number; } | { a: number; b: string; } | { a: string; b: string; }'.
      Type 'null' is not assignable to type '{ a: number; } | { a: number; b: string; } | { a: string; b: string; }'.
    lack of expected error at test line 117 'exactBadNarrow,'
    lack of expected error at test line 120 'fn: ({c, d}): ExactNullable => null as any,'
    lack of expected error at test line 126 'exactNarrow,'
    lack of expected error at test line 130 'fn: ({c, d}): ExactNullable => null as any,'
    lack of expected error at test line 136 'exactNarrow,'
    lack of expected error at test line 138 'exactBadNarrow,'
    Type 'ExactNullable' is not assignable to type '{ a: number; b: string; } | { a: number; } | { a: string; b: string; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: number; b: string; } | { a: number; } | { a: string; b: string; } | { a: number; }'.
    lack of expected error at test line 147 'exactExactBad,'
    lack of expected error at test line 151 'fn: ({c, d}): ExactNullable => null as any,'
    lack of expected error at test line 157 'exactExactBad,'
    lack of expected error at test line 159 'exactBadNarrow,'
    Type 'ExactNullable' is not assignable to type '{ a: string; b: string; } | { a: number; } | { a: number; b: string; } | { a: string; b: string; }'.
      Type 'null' is not assignable to type '{ a: string; b: string; } | { a: number; } | { a: number; b: string; } | { a: string; b: string; }'.
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
    lack of expected error at test line 13 'target: exactBad,'
    Type 'ExactNarrow' is not assignable to type '{ a: string; b: string; }'.
      Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
        Types of property 'a' are incompatible.
          Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 20 'target: exactNullable,'
    Type 'ExactNarrow' is not assignable to type '{ a: number; b: string; } | null'.
      Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    lack of expected error at test line 27 'target: exactExactBad,'
    Type 'ExactNarrow' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 35 'exact,'
    lack of expected error at test line 37 'exactBad,'
    Type 'ExactNarrow' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 46 'exact,'
    lack of expected error at test line 50 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 56 'exact,'
    lack of expected error at test line 58 'exactNullable,'
    Type 'ExactNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | null'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | null'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    lack of expected error at test line 67 'exact,'
    lack of expected error at test line 71 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 77 'exact,'
    lack of expected error at test line 79 'exactBadNarrow,'
    lack of expected error at test line 82 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 88 'exact,'
    lack of expected error at test line 90 'exactExactBad,'
    Type 'ExactNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 99 'exactBad,'
    lack of expected error at test line 101 'exactNullable,'
    Type 'ExactNarrow' is not assignable to type '{ a: string; b: string; } | { a: number; b: string; } | null'.
      Type '{ a: number; }' is not assignable to type '{ a: string; b: string; } | { a: number; b: string; } | null'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    lack of expected error at test line 110 'exactBad,'
    lack of expected error at test line 114 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 120 'exactBad,'
    lack of expected error at test line 122 'exactBadNarrow,'
    lack of expected error at test line 125 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 131 'exactBad,'
    lack of expected error at test line 133 'exactExactBad,'
    Type 'ExactNarrow' is not assignable to type '{ a: string; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: string; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
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
    lack of expected error at test line 193 'exactExactBad,'
    lack of expected error at test line 195 'exactNullable,'
    Type 'ExactNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; } | null'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; } | null'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 204 'exactExactBad,'
    lack of expected error at test line 206 'exactBadNarrow,'
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
    lack of expected error at test line 13 'target: exactNullable,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | null'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
        Types of property 'a' are incompatible.
          Type 'string' is not assignable to type 'number'.
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
    lack of expected error at test line 45 'exactNullable,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | null'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | null'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 54 'exact,'
    lack of expected error at test line 56 'exactNarrow,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 65 'exact,'
    lack of expected error at test line 69 'fn: ({c, d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 75 'exact,'
    lack of expected error at test line 77 'exactExactBad,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 86 'exactBad,'
    lack of expected error at test line 88 'exactNullable,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: string; b: string; } | { a: number; b: string; } | null'.
      Type '{ a: number; }' is not assignable to type '{ a: string; b: string; } | { a: number; b: string; } | null'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    lack of expected error at test line 97 'exactBad,'
    lack of expected error at test line 99 'exactNarrow,'
    lack of expected error at test line 102 'fn: ({c, d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 108 'narrow,'
    lack of expected error at test line 110 'exactBad,'
    lack of expected error at test line 113 'fn: ({c, d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 119 'narrow,'
    lack of expected error at test line 121 'exactNullable,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; } | { a: number; b: string; } | null'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; } | { a: number; b: string; } | null'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 130 'narrow,'
    lack of expected error at test line 132 'exactExactBad,'
    lack of expected error at test line 135 'fn: ({c, d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 141 'exactNullable,'
    lack of expected error at test line 145 'fn: ({c, d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 151 'exactNarrow,'
    lack of expected error at test line 153 'exactNullable,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: number; } | null'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: number; } | null'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 162 'exactExactBad,'
    lack of expected error at test line 164 'exactNullable,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; } | null'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; } | null'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
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
    lack of expected error at test line 13 'target: narrow,'
    Type 'ExactExactBad' is not assignable to type '{ a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
        Types of property 'a' are incompatible.
          Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 20 'target: exactNullable,'
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; } | null'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
        Types of property 'a' are incompatible.
          Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 27 'target: exactNarrow,'
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 35 'exact,'
    lack of expected error at test line 37 'exactBad,'
    lack of expected error at test line 40 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 46 'exact,'
    lack of expected error at test line 48 'narrow,'
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 57 'exact,'
    lack of expected error at test line 59 'exactNullable,'
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | null'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | null'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 68 'exact,'
    lack of expected error at test line 70 'exactNarrow,'
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
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
    lack of expected error at test line 133 'narrow,'
    lack of expected error at test line 135 'exactNullable,'
    Type 'ExactExactBad' is not assignable to type '{ a: number; } | { a: number; b: string; } | null'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; } | { a: number; b: string; } | null'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 144 'narrow,'
    lack of expected error at test line 146 'exactBadNarrow,'
    lack of expected error at test line 149 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 155 'narrow,'
    lack of expected error at test line 159 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 165 'exactNullable,'
    lack of expected error at test line 167 'exactBadNarrow,'
    lack of expected error at test line 170 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 176 'exactNarrow,'
    lack of expected error at test line 178 'exactNullable,'
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: number; } | null'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: number; } | null'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 187 'exactNarrow,'
    lack of expected error at test line 189 'exactBadNarrow,'
    lack of expected error at test line 192 'fn: ({c, d}): ExactExactBad => null as any,'
    lack of expected error at test line 199 'exactNullable,'
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
      lack of expected error at test line 27 'exactBad,'
      lack of expected error at test line 31 'fn: ({c}, {d}) => ({a: c, b: d}),'
      lack of expected error at test line 38 'exactBad,'
      lack of expected error at test line 40 'exactBadNarrow,'
      lack of expected error at test line 43 'fn: ({c}, {d}) => ({a: c, b: d}),'
      lack of expected error at test line 50 'exactBad,'
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
      lack of expected error at test line 124 'exactBad,'
      lack of expected error at test line 128 'fn: ({c}, {d}) => ({a: c, b: d}),'
      lack of expected error at test line 135 'exactBad,'
      lack of expected error at test line 137 'exactBadNarrow,'
      lack of expected error at test line 140 'fn: ({c}, {d}) => ({a: c, b: d}),'
      lack of expected error at test line 147 'exactBad,'
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
    lack of expected error at test line 7 'target: exactNarrow,'
    Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 16 'exact,'
    lack of expected error at test line 18 'exactNarrow,'
    Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 28 'exact,'
    lack of expected error at test line 32 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 39 'exact,'
    lack of expected error at test line 43 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 51 'exactNarrow,'
    lack of expected error at test line 54 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 61 'narrow,'
    lack of expected error at test line 65 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 72 'narrow,'
    lack of expected error at test line 76 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 83 'exactNullable,'
    lack of expected error at test line 87 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 94 'exactNarrow,'
    lack of expected error at test line 96 'exactNullable,'
    Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 106 'exactNarrow,'
    lack of expected error at test line 110 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 118 'exactNullable,'
    lack of expected error at test line 121 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 127 'target: exactNarrow,'
    Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 136 'exact,'
    lack of expected error at test line 138 'exactNarrow,'
    Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 148 'exact,'
    lack of expected error at test line 152 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 159 'exact,'
    lack of expected error at test line 163 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 171 'exactNarrow,'
    lack of expected error at test line 174 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 181 'narrow,'
    lack of expected error at test line 185 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 192 'narrow,'
    lack of expected error at test line 196 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 203 'exactNullable,'
    lack of expected error at test line 207 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 214 'exactNarrow,'
    lack of expected error at test line 216 'exactNullable,'
    Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 226 'exactNarrow,'
    lack of expected error at test line 230 'fn: (_, {d}) => ({a: \\"no\\", b: d}),'
    lack of expected error at test line 238 'exactNullable,'
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
    lack of expected error at test line 7 'target: exactExactBad,'
    Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 16 'exact,'
    lack of expected error at test line 20 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 27 'exact,'
    lack of expected error at test line 31 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 38 'exact,'
    lack of expected error at test line 40 'exactExactBad,'
    Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
      Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 50 'exactBad,'
    lack of expected error at test line 54 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 61 'exactBad,'
    lack of expected error at test line 65 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 72 'exactBad,'
    lack of expected error at test line 74 'exactExactBad,'
    Type '{ a: number; }' is not assignable to type '{ a: string; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
      Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 85 'exactExactBad,'
    lack of expected error at test line 88 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 95 'exactNullable,'
    lack of expected error at test line 99 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 107 'exactNullable,'
    lack of expected error at test line 110 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 117 'exactExactBad,'
    lack of expected error at test line 119 'exactNullable,'
    Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 129 'exactExactBad,'
    lack of expected error at test line 133 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 139 'target: exactExactBad,'
    Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 148 'exact,'
    lack of expected error at test line 152 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 159 'exact,'
    lack of expected error at test line 163 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 170 'exact,'
    lack of expected error at test line 172 'exactExactBad,'
    Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
      Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 182 'exactBad,'
    lack of expected error at test line 186 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 193 'exactBad,'
    lack of expected error at test line 197 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 204 'exactBad,'
    lack of expected error at test line 206 'exactExactBad,'
    Type '{ a: number; }' is not assignable to type '{ a: string; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
      Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 217 'exactExactBad,'
    lack of expected error at test line 220 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 227 'exactNullable,'
    lack of expected error at test line 231 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 239 'exactNullable,'
    lack of expected error at test line 242 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 249 'exactExactBad,'
    lack of expected error at test line 251 'exactNullable,'
    Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 261 'exactExactBad,'
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
    lack of expected error at test line 7 'target: exactNarrow,'
    Type 'ExactNullable' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
    lack of expected error at test line 15 'target: exactBadNarrow,'
    Type 'ExactNullable' is not assignable to type '{ a: string; b: string; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: string; b: string; } | { a: number; }'.
    lack of expected error at test line 23 'target: exactExactBad,'
    Type 'ExactNullable' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Type 'null' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
    lack of expected error at test line 32 'exact,'
    lack of expected error at test line 34 'exactNarrow,'
    Type 'ExactNullable' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: number; }'.
    lack of expected error at test line 44 'exact,'
    lack of expected error at test line 46 'exactBadNarrow,'
    Type 'ExactNullable' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; } | { a: number; }'.
    lack of expected error at test line 56 'exact,'
    lack of expected error at test line 58 'exactExactBad,'
    Type 'ExactNullable' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
      Type 'null' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
    lack of expected error at test line 68 'exactBad,'
    lack of expected error at test line 70 'exactNarrow,'
    Type 'ExactNullable' is not assignable to type '{ a: string; b: string; } | { a: number; b: string; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: string; b: string; } | { a: number; b: string; } | { a: number; }'.
    lack of expected error at test line 80 'exactBad,'
    lack of expected error at test line 82 'exactBadNarrow,'
    Type 'ExactNullable' is not assignable to type '{ a: string; b: string; } | { a: string; b: string; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: string; b: string; } | { a: string; b: string; } | { a: number; }'.
    lack of expected error at test line 92 'exactBad,'
    lack of expected error at test line 94 'exactExactBad,'
    Type 'ExactNullable' is not assignable to type '{ a: string; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
      Type 'null' is not assignable to type '{ a: string; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
    lack of expected error at test line 104 'narrow,'
    lack of expected error at test line 106 'exactBadNarrow,'
    Type 'ExactNullable' is not assignable to type '{ a: number; } | { a: string; b: string; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: number; } | { a: string; b: string; } | { a: number; }'.
    lack of expected error at test line 116 'narrow,'
    lack of expected error at test line 118 'exactExactBad,'
    Type 'ExactNullable' is not assignable to type '{ a: number; } | { a: number; b: string; } | { a: string; b: string; }'.
      Type 'null' is not assignable to type '{ a: number; } | { a: number; b: string; } | { a: string; b: string; }'.
    lack of expected error at test line 129 'exactBadNarrow,'
    lack of expected error at test line 132 'fn: ({c}, {d}): ExactNullable => null as any,'
    lack of expected error at test line 139 'exactNarrow,'
    lack of expected error at test line 143 'fn: ({c}, {d}): ExactNullable => null as any,'
    lack of expected error at test line 150 'exactNarrow,'
    lack of expected error at test line 152 'exactBadNarrow,'
    Type 'ExactNullable' is not assignable to type '{ a: number; b: string; } | { a: number; } | { a: string; b: string; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: number; b: string; } | { a: number; } | { a: string; b: string; } | { a: number; }'.
    lack of expected error at test line 162 'exactExactBad,'
    lack of expected error at test line 166 'fn: ({c}, {d}): ExactNullable => null as any,'
    lack of expected error at test line 173 'exactExactBad,'
    lack of expected error at test line 175 'exactBadNarrow,'
    Type 'ExactNullable' is not assignable to type '{ a: string; b: string; } | { a: number; } | { a: number; b: string; } | { a: string; b: string; }'.
      Type 'null' is not assignable to type '{ a: string; b: string; } | { a: number; } | { a: number; b: string; } | { a: string; b: string; }'.
    lack of expected error at test line 184 'target: exactNarrow,'
    Type 'ExactNullable' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
    lack of expected error at test line 192 'target: exactBadNarrow,'
    Type 'ExactNullable' is not assignable to type '{ a: string; b: string; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: string; b: string; } | { a: number; }'.
    lack of expected error at test line 200 'target: exactExactBad,'
    Type 'ExactNullable' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Type 'null' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
    lack of expected error at test line 209 'exact,'
    lack of expected error at test line 211 'exactNarrow,'
    Type 'ExactNullable' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: number; }'.
    lack of expected error at test line 221 'exact,'
    lack of expected error at test line 223 'exactBadNarrow,'
    Type 'ExactNullable' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; } | { a: number; }'.
    lack of expected error at test line 233 'exact,'
    lack of expected error at test line 235 'exactExactBad,'
    Type 'ExactNullable' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
      Type 'null' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
    lack of expected error at test line 245 'exactBad,'
    lack of expected error at test line 247 'exactNarrow,'
    Type 'ExactNullable' is not assignable to type '{ a: string; b: string; } | { a: number; b: string; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: string; b: string; } | { a: number; b: string; } | { a: number; }'.
    lack of expected error at test line 257 'exactBad,'
    lack of expected error at test line 259 'exactBadNarrow,'
    Type 'ExactNullable' is not assignable to type '{ a: string; b: string; } | { a: string; b: string; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: string; b: string; } | { a: string; b: string; } | { a: number; }'.
    lack of expected error at test line 269 'exactBad,'
    lack of expected error at test line 271 'exactExactBad,'
    Type 'ExactNullable' is not assignable to type '{ a: string; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
      Type 'null' is not assignable to type '{ a: string; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
    lack of expected error at test line 281 'narrow,'
    lack of expected error at test line 283 'exactBadNarrow,'
    Type 'ExactNullable' is not assignable to type '{ a: number; } | { a: string; b: string; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: number; } | { a: string; b: string; } | { a: number; }'.
    lack of expected error at test line 293 'narrow,'
    lack of expected error at test line 295 'exactExactBad,'
    Type 'ExactNullable' is not assignable to type '{ a: number; } | { a: number; b: string; } | { a: string; b: string; }'.
      Type 'null' is not assignable to type '{ a: number; } | { a: number; b: string; } | { a: string; b: string; }'.
    lack of expected error at test line 306 'exactBadNarrow,'
    lack of expected error at test line 309 'fn: ({c}, {d}): ExactNullable => null as any,'
    lack of expected error at test line 316 'exactNarrow,'
    lack of expected error at test line 320 'fn: ({c}, {d}): ExactNullable => null as any,'
    lack of expected error at test line 327 'exactNarrow,'
    lack of expected error at test line 329 'exactBadNarrow,'
    Type 'ExactNullable' is not assignable to type '{ a: number; b: string; } | { a: number; } | { a: string; b: string; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: number; b: string; } | { a: number; } | { a: string; b: string; } | { a: number; }'.
    lack of expected error at test line 339 'exactExactBad,'
    lack of expected error at test line 343 'fn: ({c}, {d}): ExactNullable => null as any,'
    lack of expected error at test line 350 'exactExactBad,'
    lack of expected error at test line 352 'exactBadNarrow,'
    Type 'ExactNullable' is not assignable to type '{ a: string; b: string; } | { a: number; } | { a: number; b: string; } | { a: string; b: string; }'.
      Type 'null' is not assignable to type '{ a: string; b: string; } | { a: number; } | { a: number; b: string; } | { a: string; b: string; }'.
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
    lack of expected error at test line 15 'target: exactBad,'
    Type 'ExactNarrow' is not assignable to type '{ a: string; b: string; }'.
      Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
        Types of property 'a' are incompatible.
          Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 23 'target: exactNullable,'
    Type 'ExactNarrow' is not assignable to type '{ a: number; b: string; } | null'.
      Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    lack of expected error at test line 31 'target: exactExactBad,'
    Type 'ExactNarrow' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 40 'exact,'
    lack of expected error at test line 42 'exactBad,'
    Type 'ExactNarrow' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 52 'exact,'
    lack of expected error at test line 56 'fn: ({c}, {d}): ExactNarrow => null as any,'
    lack of expected error at test line 63 'exact,'
    lack of expected error at test line 65 'exactNullable,'
    Type 'ExactNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | null'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | null'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    lack of expected error at test line 75 'exact,'
    lack of expected error at test line 79 'fn: ({c}, {d}): ExactNarrow => null as any,'
    lack of expected error at test line 86 'exact,'
    lack of expected error at test line 88 'exactBadNarrow,'
    lack of expected error at test line 91 'fn: ({c}, {d}): ExactNarrow => null as any,'
    lack of expected error at test line 98 'exact,'
    lack of expected error at test line 100 'exactExactBad,'
    Type 'ExactNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 110 'exactBad,'
    lack of expected error at test line 112 'exactNullable,'
    Type 'ExactNarrow' is not assignable to type '{ a: string; b: string; } | { a: number; b: string; } | null'.
      Type '{ a: number; }' is not assignable to type '{ a: string; b: string; } | { a: number; b: string; } | null'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    lack of expected error at test line 122 'exactBad,'
    lack of expected error at test line 126 'fn: ({c}, {d}): ExactNarrow => null as any,'
    lack of expected error at test line 133 'exactBad,'
    lack of expected error at test line 135 'exactBadNarrow,'
    lack of expected error at test line 138 'fn: ({c}, {d}): ExactNarrow => null as any,'
    lack of expected error at test line 145 'exactBad,'
    lack of expected error at test line 147 'exactExactBad,'
    Type 'ExactNarrow' is not assignable to type '{ a: string; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: string; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 158 'exactBad,'
    lack of expected error at test line 161 'fn: ({c}, {d}): ExactNarrow => null as any,'
    lack of expected error at test line 169 'exactNullable,'
    lack of expected error at test line 172 'fn: ({c}, {d}): ExactNarrow => null as any,'
    lack of expected error at test line 180 'exactExactBad,'
    lack of expected error at test line 183 'fn: ({c}, {d}): ExactNarrow => null as any,'
    lack of expected error at test line 190 'exactNullable,'
    lack of expected error at test line 192 'exactBadNarrow,'
    lack of expected error at test line 195 'fn: ({c}, {d}): ExactNarrow => null as any,'
    lack of expected error at test line 203 'exactNullable,'
    lack of expected error at test line 206 'fn: ({c}, {d}): ExactNarrow => null as any,'
    lack of expected error at test line 213 'exactExactBad,'
    lack of expected error at test line 215 'exactNullable,'
    Type 'ExactNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; } | null'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; } | null'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 225 'exactExactBad,'
    lack of expected error at test line 227 'exactBadNarrow,'
    lack of expected error at test line 230 'fn: ({c}, {d}): ExactNarrow => null as any,'
    lack of expected error at test line 236 'target: exact,'
    Type 'ExactNarrow' is not assignable to type '{ a: number; b: string; }'.
      Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    lack of expected error at test line 244 'target: exactBad,'
    Type 'ExactNarrow' is not assignable to type '{ a: string; b: string; }'.
      Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
        Types of property 'a' are incompatible.
          Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 252 'target: exactNullable,'
    Type 'ExactNarrow' is not assignable to type '{ a: number; b: string; } | null'.
      Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    lack of expected error at test line 260 'target: exactExactBad,'
    Type 'ExactNarrow' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 269 'exact,'
    lack of expected error at test line 271 'exactBad,'
    Type 'ExactNarrow' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 281 'exact,'
    lack of expected error at test line 285 'fn: ({c}, {d}): ExactNarrow => null as any,'
    lack of expected error at test line 292 'exact,'
    lack of expected error at test line 294 'exactNullable,'
    Type 'ExactNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | null'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | null'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    lack of expected error at test line 304 'exact,'
    lack of expected error at test line 308 'fn: ({c}, {d}): ExactNarrow => null as any,'
    lack of expected error at test line 315 'exact,'
    lack of expected error at test line 317 'exactBadNarrow,'
    lack of expected error at test line 320 'fn: ({c}, {d}): ExactNarrow => null as any,'
    lack of expected error at test line 327 'exact,'
    lack of expected error at test line 329 'exactExactBad,'
    Type 'ExactNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 339 'exactBad,'
    lack of expected error at test line 341 'exactNullable,'
    Type 'ExactNarrow' is not assignable to type '{ a: string; b: string; } | { a: number; b: string; } | null'.
      Type '{ a: number; }' is not assignable to type '{ a: string; b: string; } | { a: number; b: string; } | null'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    lack of expected error at test line 351 'exactBad,'
    lack of expected error at test line 355 'fn: ({c}, {d}): ExactNarrow => null as any,'
    lack of expected error at test line 362 'exactBad,'
    lack of expected error at test line 364 'exactBadNarrow,'
    lack of expected error at test line 367 'fn: ({c}, {d}): ExactNarrow => null as any,'
    lack of expected error at test line 374 'exactBad,'
    lack of expected error at test line 376 'exactExactBad,'
    Type 'ExactNarrow' is not assignable to type '{ a: string; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: string; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 387 'exactBad,'
    lack of expected error at test line 390 'fn: ({c}, {d}): ExactNarrow => null as any,'
    lack of expected error at test line 398 'exactNullable,'
    lack of expected error at test line 401 'fn: ({c}, {d}): ExactNarrow => null as any,'
    lack of expected error at test line 409 'exactExactBad,'
    lack of expected error at test line 412 'fn: ({c}, {d}): ExactNarrow => null as any,'
    lack of expected error at test line 419 'exactNullable,'
    lack of expected error at test line 421 'exactBadNarrow,'
    lack of expected error at test line 424 'fn: ({c}, {d}): ExactNarrow => null as any,'
    lack of expected error at test line 432 'exactNullable,'
    lack of expected error at test line 435 'fn: ({c}, {d}): ExactNarrow => null as any,'
    lack of expected error at test line 442 'exactExactBad,'
    lack of expected error at test line 444 'exactNullable,'
    Type 'ExactNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; } | null'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; } | null'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 454 'exactExactBad,'
    lack of expected error at test line 456 'exactBadNarrow,'
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
    lack of expected error at test line 15 'target: exactNullable,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | null'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
        Types of property 'a' are incompatible.
          Type 'string' is not assignable to type 'number'.
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
    lack of expected error at test line 50 'exactNullable,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | null'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | null'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 60 'exact,'
    lack of expected error at test line 62 'exactNarrow,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 72 'exact,'
    lack of expected error at test line 76 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 83 'exact,'
    lack of expected error at test line 85 'exactExactBad,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 95 'exactBad,'
    lack of expected error at test line 97 'exactNullable,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: string; b: string; } | { a: number; b: string; } | null'.
      Type '{ a: number; }' is not assignable to type '{ a: string; b: string; } | { a: number; b: string; } | null'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    lack of expected error at test line 107 'exactBad,'
    lack of expected error at test line 109 'exactNarrow,'
    lack of expected error at test line 112 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 119 'narrow,'
    lack of expected error at test line 121 'exactBad,'
    lack of expected error at test line 124 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 131 'narrow,'
    lack of expected error at test line 133 'exactNullable,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; } | { a: number; b: string; } | null'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; } | { a: number; b: string; } | null'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 143 'narrow,'
    lack of expected error at test line 145 'exactExactBad,'
    lack of expected error at test line 148 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 155 'exactNullable,'
    lack of expected error at test line 159 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 166 'exactNarrow,'
    lack of expected error at test line 168 'exactNullable,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: number; } | null'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: number; } | null'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 178 'exactExactBad,'
    lack of expected error at test line 180 'exactNullable,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; } | null'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; } | null'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 189 'target: exact,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
        Types of property 'a' are incompatible.
          Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 197 'target: exactNullable,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | null'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
        Types of property 'a' are incompatible.
          Type 'string' is not assignable to type 'number'.
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
    lack of expected error at test line 232 'exactNullable,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | null'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | null'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 242 'exact,'
    lack of expected error at test line 244 'exactNarrow,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 254 'exact,'
    lack of expected error at test line 258 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 265 'exact,'
    lack of expected error at test line 267 'exactExactBad,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 277 'exactBad,'
    lack of expected error at test line 279 'exactNullable,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: string; b: string; } | { a: number; b: string; } | null'.
      Type '{ a: number; }' is not assignable to type '{ a: string; b: string; } | { a: number; b: string; } | null'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    lack of expected error at test line 289 'exactBad,'
    lack of expected error at test line 291 'exactNarrow,'
    lack of expected error at test line 294 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 301 'narrow,'
    lack of expected error at test line 303 'exactBad,'
    lack of expected error at test line 306 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 313 'narrow,'
    lack of expected error at test line 315 'exactNullable,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; } | { a: number; b: string; } | null'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; } | { a: number; b: string; } | null'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 325 'narrow,'
    lack of expected error at test line 327 'exactExactBad,'
    lack of expected error at test line 330 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 337 'exactNullable,'
    lack of expected error at test line 341 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    lack of expected error at test line 348 'exactNarrow,'
    lack of expected error at test line 350 'exactNullable,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: number; } | null'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: number; } | null'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 360 'exactExactBad,'
    lack of expected error at test line 362 'exactNullable,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; } | null'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: string; b: string; } | null'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
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
    lack of expected error at test line 15 'target: narrow,'
    Type 'ExactExactBad' is not assignable to type '{ a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
        Types of property 'a' are incompatible.
          Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 23 'target: exactNullable,'
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; } | null'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
        Types of property 'a' are incompatible.
          Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 31 'target: exactNarrow,'
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 40 'exact,'
    lack of expected error at test line 42 'exactBad,'
    lack of expected error at test line 45 'fn: ({c}, {d}): ExactExactBad => null as any,'
    lack of expected error at test line 52 'exact,'
    lack of expected error at test line 54 'narrow,'
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 64 'exact,'
    lack of expected error at test line 66 'exactNullable,'
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | null'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | null'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 76 'exact,'
    lack of expected error at test line 78 'exactNarrow,'
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 88 'exact,'
    lack of expected error at test line 90 'exactBadNarrow,'
    lack of expected error at test line 93 'fn: ({c}, {d}): ExactExactBad => null as any,'
    lack of expected error at test line 100 'exact,'
    lack of expected error at test line 104 'fn: ({c}, {d}): ExactExactBad => null as any,'
    lack of expected error at test line 111 'exactBad,'
    lack of expected error at test line 113 'exactNullable,'
    lack of expected error at test line 116 'fn: ({c}, {d}): ExactExactBad => null as any,'
    lack of expected error at test line 123 'exactBad,'
    lack of expected error at test line 125 'exactNarrow,'
    lack of expected error at test line 128 'fn: ({c}, {d}): ExactExactBad => null as any,'
    lack of expected error at test line 135 'narrow,'
    lack of expected error at test line 137 'exactBad,'
    lack of expected error at test line 140 'fn: ({c}, {d}): ExactExactBad => null as any,'
    lack of expected error at test line 147 'narrow,'
    lack of expected error at test line 149 'exactNullable,'
    Type 'ExactExactBad' is not assignable to type '{ a: number; } | { a: number; b: string; } | null'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; } | { a: number; b: string; } | null'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 159 'narrow,'
    lack of expected error at test line 161 'exactBadNarrow,'
    lack of expected error at test line 164 'fn: ({c}, {d}): ExactExactBad => null as any,'
    lack of expected error at test line 171 'narrow,'
    lack of expected error at test line 175 'fn: ({c}, {d}): ExactExactBad => null as any,'
    lack of expected error at test line 182 'exactNullable,'
    lack of expected error at test line 184 'exactBadNarrow,'
    lack of expected error at test line 187 'fn: ({c}, {d}): ExactExactBad => null as any,'
    lack of expected error at test line 194 'exactNarrow,'
    lack of expected error at test line 196 'exactNullable,'
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: number; } | null'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: number; } | null'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 206 'exactNarrow,'
    lack of expected error at test line 208 'exactBadNarrow,'
    lack of expected error at test line 211 'fn: ({c}, {d}): ExactExactBad => null as any,'
    lack of expected error at test line 219 'exactNullable,'
    lack of expected error at test line 222 'fn: ({c}, {d}): ExactExactBad => null as any,'
    lack of expected error at test line 228 'target: exact,'
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
        Types of property 'a' are incompatible.
          Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 236 'target: narrow,'
    Type 'ExactExactBad' is not assignable to type '{ a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
        Types of property 'a' are incompatible.
          Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 244 'target: exactNullable,'
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; } | null'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
        Types of property 'a' are incompatible.
          Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 252 'target: exactNarrow,'
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 261 'exact,'
    lack of expected error at test line 263 'exactBad,'
    lack of expected error at test line 266 'fn: ({c}, {d}): ExactExactBad => null as any,'
    lack of expected error at test line 273 'exact,'
    lack of expected error at test line 275 'narrow,'
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 285 'exact,'
    lack of expected error at test line 287 'exactNullable,'
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | null'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | null'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 297 'exact,'
    lack of expected error at test line 299 'exactNarrow,'
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 309 'exact,'
    lack of expected error at test line 311 'exactBadNarrow,'
    lack of expected error at test line 314 'fn: ({c}, {d}): ExactExactBad => null as any,'
    lack of expected error at test line 321 'exact,'
    lack of expected error at test line 325 'fn: ({c}, {d}): ExactExactBad => null as any,'
    lack of expected error at test line 332 'exactBad,'
    lack of expected error at test line 334 'exactNullable,'
    lack of expected error at test line 337 'fn: ({c}, {d}): ExactExactBad => null as any,'
    lack of expected error at test line 344 'exactBad,'
    lack of expected error at test line 346 'exactNarrow,'
    lack of expected error at test line 349 'fn: ({c}, {d}): ExactExactBad => null as any,'
    lack of expected error at test line 356 'narrow,'
    lack of expected error at test line 358 'exactBad,'
    lack of expected error at test line 361 'fn: ({c}, {d}): ExactExactBad => null as any,'
    lack of expected error at test line 368 'narrow,'
    lack of expected error at test line 370 'exactNullable,'
    Type 'ExactExactBad' is not assignable to type '{ a: number; } | { a: number; b: string; } | null'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; } | { a: number; b: string; } | null'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 380 'narrow,'
    lack of expected error at test line 382 'exactBadNarrow,'
    lack of expected error at test line 385 'fn: ({c}, {d}): ExactExactBad => null as any,'
    lack of expected error at test line 392 'narrow,'
    lack of expected error at test line 396 'fn: ({c}, {d}): ExactExactBad => null as any,'
    lack of expected error at test line 403 'exactNullable,'
    lack of expected error at test line 405 'exactBadNarrow,'
    lack of expected error at test line 408 'fn: ({c}, {d}): ExactExactBad => null as any,'
    lack of expected error at test line 415 'exactNarrow,'
    lack of expected error at test line 417 'exactNullable,'
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: number; } | null'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; } | { a: number; } | null'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 427 'exactNarrow,'
    lack of expected error at test line 429 'exactBadNarrow,'
    lack of expected error at test line 432 'fn: ({c}, {d}): ExactExactBad => null as any,'
    lack of expected error at test line 440 'exactNullable,'
    lack of expected error at test line 443 'fn: ({c}, {d}): ExactExactBad => null as any,'
    "
  `)
})
