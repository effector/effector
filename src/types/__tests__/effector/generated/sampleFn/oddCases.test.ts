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
      lack of expected error at test line 28 'fn: ({c, d}) => ({a: c, b: d}),'
      Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        The types of '__.a' are incompatible between these types.
          Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 36 'exactBadNarrow,'
      Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        The types of '__.a' are incompatible between these types.
          Type 'string' is not assignable to type 'number'.
      Type 'number' is not assignable to type 'string'.
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
    Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
    Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
    Type 'string' is not assignable to type 'number'.
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
    Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: string; b: string; }'.
          Type 'null' is not assignable to type '{ a: string; b: string; }'.
    Type 'string' is not assignable to type 'number'.
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
    Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: string; b: string; }'.
          Type 'null' is not assignable to type '{ a: string; b: string; }'.
    Type 'string' is not assignable to type 'number'.
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
    Type 'number' is not assignable to type 'string'.
    Unmarked error at test line 11 'clock: clockExact,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (args_0: { c: number; d: string; }) => { a: number; b: string; } | { a: number; }; target: readonly [Unit<{ a: number; }>, Unit<{ a: number; b: string; } | { a: number; }>]; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 14 'exact,'
    lack of expected error at test line 18 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 24 'exact,'
    Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 34 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 49 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Type 'number' is not assignable to type 'string'.
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
    Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
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
    Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Type 'number' is not assignable to type 'string'.
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
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'null'.
          Type '{ a: number; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: number; }'.
      Type 'null' is not assignable to type '{ a: number; }'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'null'.
          Type '{ a: string; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: number; }'.
      Type 'null' is not assignable to type '{ a: number; }'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'null'.
          Type '{ a: number; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: string; b: string; }'.
      Type 'null' is not assignable to type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; }' is not assignable to type 'null'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'null'.
          Type '{ a: number; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; }' is not assignable to type 'null'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'null'.
          Type '{ a: string; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; }' is not assignable to type 'null'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'null'.
          Type '{ a: number; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Type 'null' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'null'.
          Type '{ a: number; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: string; b: string; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: string; b: string; } | { a: number; }'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'null'.
          Type '{ a: string; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: string; b: string; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: string; b: string; } | { a: number; }'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'null'.
          Type '{ a: number; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: string; b: string; } | { a: string; b: string; }'.
      Type 'null' is not assignable to type '{ a: string; b: string; } | { a: string; b: string; }'.
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'null'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'null'.
          Type '{ a: string; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: number; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: number; } | { a: number; }'.
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'null'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'null'.
          Type '{ a: number; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: number; } | { a: string; b: string; }'.
      Type 'null' is not assignable to type '{ a: number; } | { a: string; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'null'.
          Type '{ a: string; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'null'.
          Type '{ a: number; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'null'.
          Type '{ a: number; b: string; }' is not assignable to type 'null'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'null'.
          Type '{ a: string; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: number; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: number; } | { a: number; }'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'null'.
          Type '{ a: number; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Type 'null' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'null'.
          Type '{ a: number; b: string; }' is not assignable to type 'null'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'null'.
          Type '{ a: string; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: number; } | { a: string; b: string; }'.
      Type 'null' is not assignable to type '{ a: number; } | { a: string; b: string; }'.
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
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'ExactNarrow' is not assignable to type '{ a: string; b: string; }'.
      Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
        Types of property 'a' are incompatible.
          Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
    Type 'ExactNarrow' is not assignable to type '{ a: number; b: string; }'.
      Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Type 'ExactNarrow' is not assignable to type '{ a: string; b: string; }'.
      Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
        Types of property 'a' are incompatible.
          Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 35 'exact,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'ExactNarrow' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Unmarked error at test line 43 'clock: clockExact,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (args_0: { c: number; d: string; }) => ExactNarrow | { a: number; b: string; }; target: readonly [Unit<{ a: number; }>, Unit<{ a: number; }>]; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 46 'exact,'
    lack of expected error at test line 50 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 56 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
    Type 'ExactNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    Unmarked error at test line 64 'clock: clockExact,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (args_0: { c: number; d: string; }) => ExactNarrow | { a: number; b: string; }; target: readonly [Unit<{ a: number; }>, Unit<{ a: number; b: string; } | { a: number; }>]; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 67 'exact,'
    lack of expected error at test line 71 'fn: ({c, d}): ExactNarrow => null as any,'
    lack of expected error at test line 77 'exact,'
    lack of expected error at test line 79 'exactBadNarrow,'
    Type 'ExactNarrow' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 88 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Type 'ExactNarrow' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
    Type 'ExactNarrow' is not assignable to type '{ a: string; b: string; } | { a: number; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: string; b: string; } | { a: number; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 114 'fn: ({c, d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 122 'exactBadNarrow,'
    Type 'ExactNarrow' is not assignable to type '{ a: string; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; } | { a: string; b: string; }'.
        Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Type 'ExactNarrow' is not assignable to type '{ a: string; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; } | { a: string; b: string; }'.
        Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 146 'fn: ({c, d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
    lack of expected error at test line 156 'fn: ({c, d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 166 'fn: ({c, d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
    lack of expected error at test line 174 'exactBadNarrow,'
    Type 'ExactNarrow' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
    lack of expected error at test line 187 'fn: ({c, d}): ExactNarrow => null as any,'
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
    Type 'ExactNarrow' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 206 'exactBadNarrow,'
    Type 'ExactNarrow' is not assignable to type '{ a: string; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; } | { a: string; b: string; }'.
        Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'number' is not assignable to type 'string'.
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
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
        Types of property 'a' are incompatible.
          Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 21 'exact,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 32 'exact,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 43 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 54 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 65 'exact,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 75 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
    Type 'ExactBadNarrow' is not assignable to type '{ a: string; b: string; } | { a: number; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: string; b: string; } | { a: number; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 102 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 113 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; } | { a: number; b: string; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; } | { a: number; b: string; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 135 'fn: ({c, d}): ExactBadNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
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
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
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
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
        Types of property 'a' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'ExactExactBad' is not assignable to type '{ a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
        Types of property 'a' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: string; b: string; }'.
          Type 'null' is not assignable to type '{ a: string; b: string; }'.
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
        Types of property 'a' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    Type 'ExactExactBad' is not assignable to type '{ a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
        Types of property 'a' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 40 'fn: ({c, d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: string; b: string; }'.
          Type 'null' is not assignable to type '{ a: string; b: string; }'.
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 81 'exactBadNarrow,'
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 94 'fn: ({c, d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: string; b: string; }'.
          Type 'null' is not assignable to type '{ a: string; b: string; }'.
    lack of expected error at test line 105 'fn: ({c, d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 116 'fn: ({c, d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 127 'fn: ({c, d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: string; b: string; }'.
          Type 'null' is not assignable to type '{ a: string; b: string; }'.
    Type 'ExactExactBad' is not assignable to type '{ a: number; } | { a: number; b: string; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; } | { a: number; b: string; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 146 'exactBadNarrow,'
    Type 'ExactExactBad' is not assignable to type '{ a: number; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 159 'fn: ({c, d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: string; b: string; }'.
          Type 'null' is not assignable to type '{ a: string; b: string; }'.
    lack of expected error at test line 167 'exactBadNarrow,'
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
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
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 189 'exactBadNarrow,'
    Type 'ExactExactBad' is not assignable to type '{ a: number; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: string; b: string; }'.
          Type 'null' is not assignable to type '{ a: string; b: string; }'.
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
      lack of expected error at test line 31 'fn: ({c}, {d}) => ({a: c, b: d}),'
      Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        The types of '__.a' are incompatible between these types.
          Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 40 'exactBadNarrow,'
      Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        The types of '__.a' are incompatible between these types.
          Type 'string' is not assignable to type 'number'.
      Type 'number' is not assignable to type 'string'.
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
      lack of expected error at test line 128 'fn: ({c}, {d}) => ({a: c, b: d}),'
      Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        The types of '__.a' are incompatible between these types.
          Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 137 'exactBadNarrow,'
      Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        The types of '__.a' are incompatible between these types.
          Type 'string' is not assignable to type 'number'.
      Type 'number' is not assignable to type 'string'.
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
    Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
    Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
    Type 'string' is not assignable to type 'number'.
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
    Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: string; b: string; }'.
          Type 'null' is not assignable to type '{ a: string; b: string; }'.
    Type 'string' is not assignable to type 'number'.
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
    Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: string; b: string; }'.
          Type 'null' is not assignable to type '{ a: string; b: string; }'.
    Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
    Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
    Type 'string' is not assignable to type 'number'.
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
    Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: string; b: string; }'.
          Type 'null' is not assignable to type '{ a: string; b: string; }'.
    Type 'string' is not assignable to type 'number'.
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
    Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: string; b: string; }'.
          Type 'null' is not assignable to type '{ a: string; b: string; }'.
    Type 'string' is not assignable to type 'number'.
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
    Type 'number' is not assignable to type 'string'.
    Unmarked error at test line 12 'source: $dataSrc,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { c: number; }) => { a: number; b: string; } | { a: number; }; target: readonly [Unit<{ a: number; }>, Unit<{ a: number; b: string; } | { a: number; }>]; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 16 'exact,'
    lack of expected error at test line 20 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 27 'exact,'
    Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 38 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 54 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Type 'number' is not assignable to type 'string'.
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
    Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
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
    Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Type 'number' is not assignable to type 'string'.
    Unmarked error at test line 144 'source: {c: $c},'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { readonly c: number; }) => { a: number; b: string; } | { a: number; }; target: readonly [Unit<{ a: number; }>, Unit<{ a: number; b: string; } | { a: number; }>]; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 148 'exact,'
    lack of expected error at test line 152 'fn: ({c}) => ({a: c}),'
    lack of expected error at test line 159 'exact,'
    Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 170 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 186 'fn: ({c}) => ({a: c}),'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Type 'number' is not assignable to type 'string'.
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
    Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
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
    Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Type 'number' is not assignable to type 'string'.
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
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'null'.
          Type '{ a: number; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: number; }'.
      Type 'null' is not assignable to type '{ a: number; }'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'null'.
          Type '{ a: string; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: number; }'.
      Type 'null' is not assignable to type '{ a: number; }'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'null'.
          Type '{ a: number; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: string; b: string; }'.
      Type 'null' is not assignable to type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; }' is not assignable to type 'null'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'null'.
          Type '{ a: number; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; }' is not assignable to type 'null'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'null'.
          Type '{ a: string; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; }' is not assignable to type 'null'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'null'.
          Type '{ a: number; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Type 'null' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'null'.
          Type '{ a: number; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: string; b: string; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: string; b: string; } | { a: number; }'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'null'.
          Type '{ a: string; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: string; b: string; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: string; b: string; } | { a: number; }'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'null'.
          Type '{ a: number; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: string; b: string; } | { a: string; b: string; }'.
      Type 'null' is not assignable to type '{ a: string; b: string; } | { a: string; b: string; }'.
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'null'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'null'.
          Type '{ a: string; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: number; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: number; } | { a: number; }'.
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'null'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'null'.
          Type '{ a: number; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: number; } | { a: string; b: string; }'.
      Type 'null' is not assignable to type '{ a: number; } | { a: string; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'null'.
          Type '{ a: string; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'null'.
          Type '{ a: number; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'null'.
          Type '{ a: number; b: string; }' is not assignable to type 'null'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'null'.
          Type '{ a: string; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: number; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: number; } | { a: number; }'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'null'.
          Type '{ a: number; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Type 'null' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'null'.
          Type '{ a: number; b: string; }' is not assignable to type 'null'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'null'.
          Type '{ a: string; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: number; } | { a: string; b: string; }'.
      Type 'null' is not assignable to type '{ a: number; } | { a: string; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'null'.
          Type '{ a: number; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: number; }'.
      Type 'null' is not assignable to type '{ a: number; }'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'null'.
          Type '{ a: string; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: number; }'.
      Type 'null' is not assignable to type '{ a: number; }'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'null'.
          Type '{ a: number; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: string; b: string; }'.
      Type 'null' is not assignable to type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; }' is not assignable to type 'null'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'null'.
          Type '{ a: number; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; }' is not assignable to type 'null'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'null'.
          Type '{ a: string; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; }' is not assignable to type 'null'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'null'.
          Type '{ a: number; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Type 'null' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'null'.
          Type '{ a: number; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: string; b: string; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: string; b: string; } | { a: number; }'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'null'.
          Type '{ a: string; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: string; b: string; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: string; b: string; } | { a: number; }'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'null'.
          Type '{ a: number; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: string; b: string; } | { a: string; b: string; }'.
      Type 'null' is not assignable to type '{ a: string; b: string; } | { a: string; b: string; }'.
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'null'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'null'.
          Type '{ a: string; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: number; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: number; } | { a: number; }'.
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'null'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'null'.
          Type '{ a: number; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: number; } | { a: string; b: string; }'.
      Type 'null' is not assignable to type '{ a: number; } | { a: string; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'null'.
          Type '{ a: string; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'null'.
          Type '{ a: number; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type 'null'.
          Type '{ a: number; b: string; }' is not assignable to type 'null'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'null'.
          Type '{ a: string; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: number; } | { a: number; }'.
      Type 'null' is not assignable to type '{ a: number; } | { a: number; }'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'null'.
          Type '{ a: number; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Type 'null' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type 'null'.
          Type '{ a: number; b: string; }' is not assignable to type 'null'.
    Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<null>'.
      Types of property '__' are incompatible.
        Type '{ a: string; b: string; } | { a: number; }' is not assignable to type 'null'.
          Type '{ a: string; b: string; }' is not assignable to type 'null'.
    Type 'ExactNullable' is not assignable to type '{ a: number; } | { a: string; b: string; }'.
      Type 'null' is not assignable to type '{ a: number; } | { a: string; b: string; }'.
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
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'ExactNarrow' is not assignable to type '{ a: string; b: string; }'.
      Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
        Types of property 'a' are incompatible.
          Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
    Type 'ExactNarrow' is not assignable to type '{ a: number; b: string; }'.
      Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Type 'ExactNarrow' is not assignable to type '{ a: string; b: string; }'.
      Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
        Types of property 'a' are incompatible.
          Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 40 'exact,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'ExactNarrow' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Unmarked error at test line 48 'source: $dataSrc,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { c: number; }, args_1: { d: string; }) => ExactNarrow | { a: number; b: string; }; target: readonly [Unit<{ a: number; }>, Unit<{ a: number; }>]; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 52 'exact,'
    lack of expected error at test line 56 'fn: ({c}, {d}): ExactNarrow => null as any,'
    lack of expected error at test line 63 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
    Type 'ExactNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    Unmarked error at test line 71 'source: $dataSrc,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { c: number; }, args_1: { d: string; }) => ExactNarrow | { a: number; b: string; }; target: readonly [Unit<{ a: number; }>, Unit<{ a: number; b: string; } | { a: number; }>]; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 75 'exact,'
    lack of expected error at test line 79 'fn: ({c}, {d}): ExactNarrow => null as any,'
    lack of expected error at test line 86 'exact,'
    lack of expected error at test line 88 'exactBadNarrow,'
    Type 'ExactNarrow' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 98 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Type 'ExactNarrow' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
    Type 'ExactNarrow' is not assignable to type '{ a: string; b: string; } | { a: number; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: string; b: string; } | { a: number; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 126 'fn: ({c}, {d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 135 'exactBadNarrow,'
    Type 'ExactNarrow' is not assignable to type '{ a: string; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; } | { a: string; b: string; }'.
        Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Type 'ExactNarrow' is not assignable to type '{ a: string; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; } | { a: string; b: string; }'.
        Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 161 'fn: ({c}, {d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
    lack of expected error at test line 172 'fn: ({c}, {d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 183 'fn: ({c}, {d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
    lack of expected error at test line 192 'exactBadNarrow,'
    Type 'ExactNarrow' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
    lack of expected error at test line 206 'fn: ({c}, {d}): ExactNarrow => null as any,'
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
    Type 'ExactNarrow' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 227 'exactBadNarrow,'
    Type 'ExactNarrow' is not assignable to type '{ a: string; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; } | { a: string; b: string; }'.
        Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 236 'target: exact,'
    Type 'ExactNarrow' is not assignable to type '{ a: number; b: string; }'.
      Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'ExactNarrow' is not assignable to type '{ a: string; b: string; }'.
      Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
        Types of property 'a' are incompatible.
          Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
    Type 'ExactNarrow' is not assignable to type '{ a: number; b: string; }'.
      Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Type 'ExactNarrow' is not assignable to type '{ a: string; b: string; }'.
      Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
        Types of property 'a' are incompatible.
          Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 269 'exact,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'ExactNarrow' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Unmarked error at test line 277 'source: {c: $c},'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { readonly c: number; }, args_1: { d: string; }) => ExactNarrow | { a: number; b: string; }; target: readonly [Unit<{ a: number; }>, Unit<{ a: number; }>]; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 281 'exact,'
    lack of expected error at test line 285 'fn: ({c}, {d}): ExactNarrow => null as any,'
    lack of expected error at test line 292 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
    Type 'ExactNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    Unmarked error at test line 300 'source: {c: $c},'
    Object literal may only specify known properties, and 'source' does not exist in type '{ fn: (args_0: { readonly c: number; }, args_1: { d: string; }) => ExactNarrow | { a: number; b: string; }; target: readonly [Unit<{ a: number; }>, Unit<{ a: number; b: string; } | { a: number; }>]; error: \\"fn result should extend target type\\"; }'.
    lack of expected error at test line 304 'exact,'
    lack of expected error at test line 308 'fn: ({c}, {d}): ExactNarrow => null as any,'
    lack of expected error at test line 315 'exact,'
    lack of expected error at test line 317 'exactBadNarrow,'
    Type 'ExactNarrow' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 327 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Type 'ExactNarrow' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
    Type 'ExactNarrow' is not assignable to type '{ a: string; b: string; } | { a: number; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: string; b: string; } | { a: number; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 355 'fn: ({c}, {d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 364 'exactBadNarrow,'
    Type 'ExactNarrow' is not assignable to type '{ a: string; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; } | { a: string; b: string; }'.
        Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Type 'ExactNarrow' is not assignable to type '{ a: string; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; } | { a: string; b: string; }'.
        Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 390 'fn: ({c}, {d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
    lack of expected error at test line 401 'fn: ({c}, {d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 412 'fn: ({c}, {d}): ExactNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
    lack of expected error at test line 421 'exactBadNarrow,'
    Type 'ExactNarrow' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
    lack of expected error at test line 435 'fn: ({c}, {d}): ExactNarrow => null as any,'
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
    Type 'ExactNarrow' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 456 'exactBadNarrow,'
    Type 'ExactNarrow' is not assignable to type '{ a: string; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; } | { a: string; b: string; }'.
        Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'number' is not assignable to type 'string'.
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
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
        Types of property 'a' are incompatible.
          Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 24 'exact,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 36 'exact,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 48 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 60 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 72 'exact,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 83 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
    Type 'ExactBadNarrow' is not assignable to type '{ a: string; b: string; } | { a: number; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: string; b: string; } | { a: number; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 112 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 124 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; } | { a: number; b: string; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; } | { a: number; b: string; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 148 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
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
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 189 'target: exact,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
        Types of property 'a' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
        Types of property 'a' are incompatible.
          Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 206 'exact,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 218 'exact,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 230 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 242 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 254 'exact,'
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 265 'exact,'
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
    Type 'ExactBadNarrow' is not assignable to type '{ a: string; b: string; } | { a: number; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: string; b: string; } | { a: number; b: string; }'.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 294 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 306 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; } | { a: number; b: string; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; } | { a: number; b: string; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; } | { a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 330 'fn: ({c}, {d}): ExactBadNarrow => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: number; }'.
          Type 'null' is not assignable to type '{ a: number; }'.
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
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
    Type 'ExactBadNarrow' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
      Type '{ a: number; }' is not assignable to type '{ a: number; b: string; } | { a: string; b: string; }'.
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
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
        Types of property 'a' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'ExactExactBad' is not assignable to type '{ a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
        Types of property 'a' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: string; b: string; }'.
          Type 'null' is not assignable to type '{ a: string; b: string; }'.
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
        Types of property 'a' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    Type 'ExactExactBad' is not assignable to type '{ a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
        Types of property 'a' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 45 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: string; b: string; }'.
          Type 'null' is not assignable to type '{ a: string; b: string; }'.
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 90 'exactBadNarrow,'
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 104 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: string; b: string; }'.
          Type 'null' is not assignable to type '{ a: string; b: string; }'.
    lack of expected error at test line 116 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 128 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 140 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: string; b: string; }'.
          Type 'null' is not assignable to type '{ a: string; b: string; }'.
    Type 'ExactExactBad' is not assignable to type '{ a: number; } | { a: number; b: string; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; } | { a: number; b: string; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 161 'exactBadNarrow,'
    Type 'ExactExactBad' is not assignable to type '{ a: number; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 175 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: string; b: string; }'.
          Type 'null' is not assignable to type '{ a: string; b: string; }'.
    lack of expected error at test line 184 'exactBadNarrow,'
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
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
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 208 'exactBadNarrow,'
    Type 'ExactExactBad' is not assignable to type '{ a: number; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: string; b: string; }'.
          Type 'null' is not assignable to type '{ a: string; b: string; }'.
    lack of expected error at test line 222 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
        Types of property 'a' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'ExactExactBad' is not assignable to type '{ a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
        Types of property 'a' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: string; b: string; }'.
          Type 'null' is not assignable to type '{ a: string; b: string; }'.
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
        Types of property 'a' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    Type 'ExactExactBad' is not assignable to type '{ a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
        Types of property 'a' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 266 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: string; b: string; }'.
          Type 'null' is not assignable to type '{ a: string; b: string; }'.
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; b: string; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 311 'exactBadNarrow,'
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 325 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: string; b: string; }'.
          Type 'null' is not assignable to type '{ a: string; b: string; }'.
    lack of expected error at test line 337 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 349 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
      The types of '__.a' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    lack of expected error at test line 361 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: string; b: string; }'.
          Type 'null' is not assignable to type '{ a: string; b: string; }'.
    Type 'ExactExactBad' is not assignable to type '{ a: number; } | { a: number; b: string; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; } | { a: number; b: string; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 382 'exactBadNarrow,'
    Type 'ExactExactBad' is not assignable to type '{ a: number; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
    lack of expected error at test line 396 'fn: ({c}, {d}): ExactExactBad => null as any,'
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: string; b: string; }'.
          Type 'null' is not assignable to type '{ a: string; b: string; }'.
    lack of expected error at test line 405 'exactBadNarrow,'
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
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
    Type 'ExactExactBad' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; b: string; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
          Type '{ a: number; b: string; }' is not assignable to type '{ a: string; b: string; }'.
            Types of property 'a' are incompatible.
              Type 'number' is not assignable to type 'string'.
    lack of expected error at test line 429 'exactBadNarrow,'
    Type 'ExactExactBad' is not assignable to type '{ a: number; } | { a: number; }'.
      Type '{ a: string; b: string; }' is not assignable to type '{ a: number; } | { a: number; }'.
        Type '{ a: string; b: string; }' is not assignable to type '{ a: number; }'.
          Types of property 'a' are incompatible.
            Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<{ a: number; b: string; } | null>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; } | null' is not assignable to type '{ a: string; b: string; }'.
          Type 'null' is not assignable to type '{ a: string; b: string; }'.
    lack of expected error at test line 443 'fn: ({c}, {d}): ExactExactBad => null as any,'
    "
  `)
})
