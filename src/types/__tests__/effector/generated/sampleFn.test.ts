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
        //@ts-expect-error
        sample({clock:clockExactBad                           , target:exact, fn:({c, d}: DataExact) => ({a: c, b: d})})
        //@ts-expect-error
        sample({clock:clockNarrow                             , target:exact, fn:({c, d}: DataExact) => ({a: c, b: d})})
        //@ts-expect-error
        sample({clock:clockExactNullable                      , target:exact, fn:({c, d}: DataExact) => ({a: c, b: d})})
        //@ts-expect-error
        sample({clock:clockExactNarrow                        , target:exact, fn:({c, d}: DataExact) => ({a: c, b: d})})
        //@ts-expect-error
        sample({clock:clockExactBadNarrow                     , target:exact, fn:({c, d}: DataExact) => ({a: c, b: d})})
        //@ts-expect-error
        sample({clock:clockExactExactBad                      , target:exact, fn:({c, d}: DataExact) => ({a: c, b: d})})
        //@ts-expect-error
        sample({clock:[clockExact,clockExactBad]              , target:exact, fn:({c, d}: DataExact) => ({a: c, b: d})})
        //@ts-expect-error
        sample({clock:[clockExact,clockNarrow]                , target:exact, fn:({c, d}: DataExact) => ({a: c, b: d})})
        //@ts-expect-error
        sample({clock:[clockExact,clockExactNullable]         , target:exact, fn:({c, d}: DataExact) => ({a: c, b: d})})
        //@ts-expect-error
        sample({clock:[clockExact,clockExactNarrow]           , target:exact, fn:({c, d}: DataExact) => ({a: c, b: d})})
        //@ts-expect-error
        sample({clock:[clockExact,clockExactBadNarrow]        , target:exact, fn:({c, d}: DataExact) => ({a: c, b: d})})
        //@ts-expect-error
        sample({clock:[clockExact,clockExactExactBad]         , target:exact, fn:({c, d}: DataExact) => ({a: c, b: d})})
        //@ts-expect-error
        sample({clock:[clockExactBad,clockExactNullable]      , target:exact, fn:({c, d}: DataExact) => ({a: c, b: d})})
        //@ts-expect-error
        sample({clock:[clockExactBad,clockExactNarrow]        , target:exact, fn:({c, d}: DataExact) => ({a: c, b: d})})
        //@ts-expect-error
        sample({clock:[clockExactBad,clockExactBadNarrow]     , target:exact, fn:({c, d}: DataExact) => ({a: c, b: d})})
        //@ts-expect-error
        sample({clock:[clockExactBad,clockExactExactBad]      , target:exact, fn:({c, d}: DataExact) => ({a: c, b: d})})
        //@ts-expect-error
        sample({clock:[clockNarrow,clockExactBad]             , target:exact, fn:({c, d}: DataExact) => ({a: c, b: d})})
        //@ts-expect-error
        sample({clock:[clockNarrow,clockExactNullable]        , target:exact, fn:({c, d}: DataExact) => ({a: c, b: d})})
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
        Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '((clk: { c: number; d: string; } | { c: string; d: string; }) => any) & (({ c, d }: DataExact) => { a: number; b: string; })'.
          Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '(clk: { c: number; d: string; } | { c: string; d: string; }) => any'.
            Types of parameters '__0' and 'clk' are incompatible.
              Type '{ c: number; d: string; } | { c: string; d: string; }' is not assignable to type 'DataExact'.
                Type '{ c: string; d: string; }' is not assignable to type 'DataExact'.
        Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '((clk: { c: number; d: string; } | { c: number; }) => any) & (({ c, d }: DataExact) => { a: number; b: string; })'.
          Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '(clk: { c: number; d: string; } | { c: number; }) => any'.
            Types of parameters '__0' and 'clk' are incompatible.
              Type '{ c: number; d: string; } | { c: number; }' is not assignable to type 'DataExact'.
                Type '{ c: number; }' is not assignable to type 'DataExact'.
        Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '((clk: { c: number; d: string; } | { c: number; d: string; } | null) => any) & (({ c, d }: DataExact) => { a: number; b: string; })'.
          Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '(clk: { c: number; d: string; } | { c: number; d: string; } | null) => any'.
            Types of parameters '__0' and 'clk' are incompatible.
              Type '{ c: number; d: string; } | { c: number; d: string; } | null' is not assignable to type 'DataExact'.
                Type 'null' is not assignable to type 'DataExact'.
        Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '((clk: { c: number; d: string; } | { c: number; d: string; } | { c: number; }) => any) & (({ c, d }: DataExact) => { a: number; b: string; })'.
          Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '(clk: { c: number; d: string; } | { c: number; d: string; } | { c: number; }) => any'.
            Types of parameters '__0' and 'clk' are incompatible.
              Type '{ c: number; d: string; } | { c: number; d: string; } | { c: number; }' is not assignable to type 'DataExact'.
                Type '{ c: number; }' is not assignable to type 'DataExact'.
        Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '((clk: { c: number; d: string; } | { c: string; d: string; } | { c: number; }) => any) & (({ c, d }: DataExact) => { a: number; b: string; })'.
          Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '(clk: { c: number; d: string; } | { c: string; d: string; } | { c: number; }) => any'.
            Types of parameters '__0' and 'clk' are incompatible.
              Type '{ c: number; d: string; } | { c: string; d: string; } | { c: number; }' is not assignable to type 'DataExact'.
                Type '{ c: string; d: string; }' is not assignable to type 'DataExact'.
        Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '((clk: { c: number; d: string; } | { c: number; d: string; } | { c: string; d: string; }) => any) & (({ c, d }: DataExact) => { a: number; b: string; })'.
          Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '(clk: { c: number; d: string; } | { c: number; d: string; } | { c: string; d: string; }) => any'.
            Types of parameters '__0' and 'clk' are incompatible.
              Type '{ c: number; d: string; } | { c: number; d: string; } | { c: string; d: string; }' is not assignable to type 'DataExact'.
                Type '{ c: string; d: string; }' is not assignable to type 'DataExact'.
        Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '((clk: { c: string; d: string; } | { c: number; d: string; } | null) => any) & (({ c, d }: DataExact) => { a: number; b: string; })'.
          Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '(clk: { c: string; d: string; } | { c: number; d: string; } | null) => any'.
            Types of parameters '__0' and 'clk' are incompatible.
              Type '{ c: string; d: string; } | { c: number; d: string; } | null' is not assignable to type 'DataExact'.
                Type 'null' is not assignable to type 'DataExact'.
        Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '((clk: { c: string; d: string; } | { c: number; d: string; } | { c: number; }) => any) & (({ c, d }: DataExact) => { a: number; b: string; })'.
          Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '(clk: { c: string; d: string; } | { c: number; d: string; } | { c: number; }) => any'.
            Types of parameters '__0' and 'clk' are incompatible.
              Type '{ c: string; d: string; } | { c: number; d: string; } | { c: number; }' is not assignable to type 'DataExact'.
                Type '{ c: string; d: string; }' is not assignable to type 'DataExact'.
        Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '((clk: { c: string; d: string; } | { c: string; d: string; } | { c: number; }) => any) & (({ c, d }: DataExact) => { a: number; b: string; })'.
          Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '(clk: { c: string; d: string; } | { c: string; d: string; } | { c: number; }) => any'.
            Types of parameters '__0' and 'clk' are incompatible.
              Type '{ c: string; d: string; } | { c: string; d: string; } | { c: number; }' is not assignable to type 'DataExact'.
                Type '{ c: string; d: string; }' is not assignable to type 'DataExact'.
        Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '((clk: { c: string; d: string; } | { c: number; d: string; } | { c: string; d: string; }) => any) & (({ c, d }: DataExact) => { a: number; b: string; })'.
          Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '(clk: { c: string; d: string; } | { c: number; d: string; } | { c: string; d: string; }) => any'.
            Types of parameters '__0' and 'clk' are incompatible.
              Type '{ c: string; d: string; } | { c: number; d: string; } | { c: string; d: string; }' is not assignable to type 'DataExact'.
                Type '{ c: string; d: string; }' is not assignable to type 'DataExact'.
        Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '((clk: { c: string; d: string; } | { c: number; }) => any) & (({ c, d }: DataExact) => { a: number; b: string; })'.
          Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '(clk: { c: string; d: string; } | { c: number; }) => any'.
            Types of parameters '__0' and 'clk' are incompatible.
              Type '{ c: string; d: string; } | { c: number; }' is not assignable to type 'DataExact'.
                Type '{ c: string; d: string; }' is not assignable to type 'DataExact'.
        Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '((clk: { c: number; } | { c: number; d: string; } | null) => any) & (({ c, d }: DataExact) => { a: number; b: string; })'.
          Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '(clk: { c: number; } | { c: number; d: string; } | null) => any'.
            Types of parameters '__0' and 'clk' are incompatible.
              Type '{ c: number; } | { c: number; d: string; } | null' is not assignable to type 'DataExact'.
                Type 'null' is not assignable to type 'DataExact'.
        Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '((clk: { c: number; } | { c: string; d: string; } | { c: number; }) => any) & (({ c, d }: DataExact) => { a: number; b: string; })'.
          Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '(clk: { c: number; } | { c: string; d: string; } | { c: number; }) => any'.
            Types of parameters '__0' and 'clk' are incompatible.
              Type '{ c: number; } | { c: string; d: string; } | { c: number; }' is not assignable to type 'DataExact'.
                Type '{ c: number; }' is not assignable to type 'DataExact'.
        Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '((clk: { c: number; } | { c: number; d: string; } | { c: string; d: string; }) => any) & (({ c, d }: DataExact) => { a: number; b: string; })'.
          Type '({ c, d }: DataExact) => { a: number; b: string; }' is not assignable to type '(clk: { c: number; } | { c: number; d: string; } | { c: string; d: string; }) => any'.
            Types of parameters '__0' and 'clk' are incompatible.
              Type '{ c: number; } | { c: number; d: string; } | { c: string; d: string; }' is not assignable to type 'DataExact'.
                Type '{ c: number; }' is not assignable to type 'DataExact'.
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
                Type '{ c: number; }' is not assignable to type 'DataExact'.
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
        "
      `)
    })
  })
})
describe('bad fn', () => {
  test('bad fn (should fail)', () => {
    //prettier-ignore
    {
      sample({
        clock: clockExact,
        target: exact,
        //@ts-expect-error
        fn: null,
      })
      sample({
        source: $dataExact,
        target: exact,
        //@ts-expect-error
        fn: null,
      })
      sample({
        source: {c: $c, d: $d},
        target: exact,
        //@ts-expect-error
        fn: null,
      })
      sample({
        source: $dataSrc,
        clock: dataClock,
        target: exact,
        //@ts-expect-error
        fn: null,
      })
      sample({
        source: {c: $c},
        clock: dataClock,
        target: exact,
        //@ts-expect-error
        fn: null,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Unmarked error at test line 4 'clock: clockExact,'
      Type 'EventCallable<{ c: number; d: string; }>' is not assignable to type 'never'.
      Unmarked error at test line 5 'target: exact,'
      Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'never'.
      Type 'null' is not assignable to type 'never'.
      Unmarked error at test line 10 'source: $dataExact,'
      Type 'StoreWritable<{ c: number; d: string; }>' is not assignable to type 'never'.
      Unmarked error at test line 11 'target: exact,'
      Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'never'.
      Type 'null' is not assignable to type 'never'.
      Unmarked error at test line 16 'source: {c: $c, d: $d},'
      Type '{ c: StoreWritable<number>; d: StoreWritable<string>; }' is not assignable to type 'never'.
      Unmarked error at test line 17 'target: exact,'
      Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'never'.
      Type 'null' is not assignable to type 'never'.
      Unmarked error at test line 22 'source: $dataSrc,'
      Type 'StoreWritable<{ c: number; }>' is not assignable to type 'never'.
      Unmarked error at test line 23 'clock: dataClock,'
      Type 'EventCallable<{ d: string; }>' is not assignable to type 'never'.
      Unmarked error at test line 24 'target: exact,'
      Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'never'.
      Type 'null' is not assignable to type 'never'.
      Unmarked error at test line 29 'source: {c: $c},'
      Type '{ c: StoreWritable<number>; }' is not assignable to type 'never'.
      Unmarked error at test line 30 'clock: dataClock,'
      Type 'EventCallable<{ d: string; }>' is not assignable to type 'never'.
      Unmarked error at test line 31 'target: exact,'
      Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'never'.
      Type 'null' is not assignable to type 'never'.
      "
    `)
  })
})
describe('clock exact', () => {
  test('clock exact (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:clockExact, target:exact                        , fn:({c, d}) => ({a: c, b: d})})
      sample({clock:clockExact, target:exactNullable                , fn:({c, d}) => ({a: c, b: d})})
      sample({clock:clockExact, target:exactNarrow                  , fn:({c, d}) => ({a: c, b: d})})
      sample({clock:clockExact, target:exactExactBad                , fn:({c, d}) => ({a: c, b: d})})
      sample({clock:clockExact, target:[exact,narrow]               , fn:({c, d}) => ({a: c, b: d})})
      sample({clock:clockExact, target:[exact,exactNullable]        , fn:({c, d}) => ({a: c, b: d})})
      sample({clock:clockExact, target:[exact,exactNarrow]          , fn:({c, d}) => ({a: c, b: d})})
      sample({clock:clockExact, target:[exact,exactExactBad]        , fn:({c, d}) => ({a: c, b: d})})
      sample({clock:clockExact, target:[narrow,exactNullable]       , fn:({c, d}) => ({a: c, b: d})})
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
        target: exactBad,
        fn: ({c, d}) => ({a: c, b: d}),
      })
      //@ts-expect-error
      sample({clock:clockExact, target:narrow, fn:({c, d}) => ({a: c, b: d})})
      sample({
        clock: clockExact,
        //@ts-expect-error
        target: exactBadNarrow,
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        clock: clockExact,
        target: [
          exact,
          //@ts-expect-error
          exactBad,
        ],
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
          exactNullable,
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
          exactBad,
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
      Unmarked error at test line 4 'clock: clockExact,'
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: { a: string; b: string; }; }; }'.
      lack of expected error at test line 6 'target: exactBad,'
      lack of expected error at test line 10 'sample({clock:clockExact, target:narrow, fn:({c, d}) => ({a: c, b: d})})'
      lack of expected error at test line 14 'target: exactBadNarrow,'
      lack of expected error at test line 22 'exactBad,'
      lack of expected error at test line 31 'exactBadNarrow,'
      lack of expected error at test line 39 'exactBad,'
      lack of expected error at test line 48 'exactBad,'
      lack of expected error at test line 57 'exactBad,'
      lack of expected error at test line 59 'exactBadNarrow,'
      lack of expected error at test line 67 'exactBad,'
      lack of expected error at test line 77 'exactBad,'
      lack of expected error at test line 86 'exactBadNarrow,'
      lack of expected error at test line 95 'exactBadNarrow,'
      lack of expected error at test line 104 'exactBadNarrow,'
      lack of expected error at test line 113 'exactBadNarrow,'
      "
    `)
  })
})
test('clock exact bad (should fail)', () => {
  //prettier-ignore
  {
    sample({
      clock: clockExact,
      //@ts-expect-error
      target: exact,
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      clock: clockExact,
      //@ts-expect-error
      target: narrow,
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      clock: clockExact,
      //@ts-expect-error
      target: exactNullable,
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      clock: clockExact,
      //@ts-expect-error
      target: exactNarrow,
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      clock: clockExact,
      target: [
        //@ts-expect-error
        exact,
        exactBad,
      ],
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
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      clock: clockExact,
      target: [
        //@ts-expect-error
        exact,
        exactBadNarrow,
      ],
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      clock: clockExact,
      target: [
        //@ts-expect-error
        exact,
        exactExactBad,
      ],
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      clock: clockExact,
      target: [
        exactBad,
        //@ts-expect-error
        exactNullable,
      ],
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
        exactBad,
      ],
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
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      clock: clockExact,
      target: [
        //@ts-expect-error
        narrow,
        exactBadNarrow,
      ],
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      clock: clockExact,
      target: [
        //@ts-expect-error
        narrow,
        exactExactBad,
      ],
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      clock: clockExact,
      target: [
        //@ts-expect-error
        exactNullable,
        exactBadNarrow,
      ],
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
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      clock: clockExact,
      target: [
        //@ts-expect-error
        exactNarrow,
        exactBadNarrow,
      ],
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      clock: clockExact,
      target: [
        exactExactBad,
        //@ts-expect-error
        exactNullable,
      ],
      fn: ({d}) => ({a: "no", b: d}),
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 4 'clock: clockExact,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; b: string; }; }; }'.
    Unmarked error at test line 10 'clock: clockExact,'
    lack of expected error at test line 6 'target: exact,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; }; }; }'.
    Unmarked error at test line 16 'clock: clockExact,'
    lack of expected error at test line 12 'target: narrow,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; b: string; } | null; }; }'.
    Unmarked error at test line 22 'clock: clockExact,'
    lack of expected error at test line 18 'target: exactNullable,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; b: string; } | { a: number; }; }; }'.
    Unmarked error at test line 37 'clock: clockExact,'
    lack of expected error at test line 24 'target: exactNarrow,'
    lack of expected error at test line 31 'exact,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 47 'clock: clockExact,'
    lack of expected error at test line 40 'exact,'
    lack of expected error at test line 42 'narrow,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; b: string; } | null; }[]; }'.
    Unmarked error at test line 57 'clock: clockExact,'
    lack of expected error at test line 50 'exact,'
    lack of expected error at test line 52 'exactNullable,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 112 'clock: clockExact,'
    lack of expected error at test line 60 'exact,'
    lack of expected error at test line 62 'exactNarrow,'
    lack of expected error at test line 70 'exact,'
    lack of expected error at test line 79 'exact,'
    lack of expected error at test line 89 'exactNullable,'
    lack of expected error at test line 98 'exactNarrow,'
    lack of expected error at test line 106 'narrow,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; } | null; }[]; }'.
    Unmarked error at test line 149 'clock: clockExact,'
    lack of expected error at test line 115 'narrow,'
    lack of expected error at test line 117 'exactNullable,'
    lack of expected error at test line 125 'narrow,'
    lack of expected error at test line 134 'narrow,'
    lack of expected error at test line 143 'exactNullable,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; } | null; }[]; }'.
    lack of expected error at test line 152 'exactNarrow,'
    lack of expected error at test line 154 'exactNullable,'
    lack of expected error at test line 162 'exactNarrow,'
    lack of expected error at test line 172 'exactNullable,'
    "
  `)
})
test('clock narrow (should fail)', () => {
  //prettier-ignore
  {
    //@ts-expect-error
    sample({clock:clockExact, target:exact                         , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({clock:clockExact, target:exactBad                      , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({clock:clockExact, target:exactNullable                 , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({clock:clockExact, target:exactExactBad                 , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({clock:clockExact, target:[exact,exactBad]              , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({clock:clockExact, target:[exact,narrow]                , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({clock:clockExact, target:[exact,exactNullable]         , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({clock:clockExact, target:[exact,exactNarrow]           , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({clock:clockExact, target:[exact,exactBadNarrow]        , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({clock:clockExact, target:[exact,exactExactBad]         , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({clock:clockExact, target:[exactBad,exactNullable]      , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({clock:clockExact, target:[exactBad,exactNarrow]        , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({clock:clockExact, target:[exactBad,exactBadNarrow]     , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({clock:clockExact, target:[exactBad,exactExactBad]      , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({clock:clockExact, target:[narrow,exactBad]             , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({clock:clockExact, target:[narrow,exactNullable]        , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({clock:clockExact, target:[narrow,exactExactBad]        , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({clock:clockExact, target:[exactNullable,exactBadNarrow], fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({clock:clockExact, target:[exactNarrow,exactNullable]   , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({clock:clockExact, target:[exactExactBad,exactNullable] , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({clock:clockExact, target:[exactExactBad,exactBadNarrow], fn:({c}) => ({a: c})})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; }; }; }'.
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: string; b: string; }; }; }'.
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | null; }; }'.
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | { a: string; b: string; }; }; }'.
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    lack of expected error at test line 14 'sample({clock:clockExact, target:[exact,narrow]                , fn:({c}) => ({a: c})})'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | null; }[]; }'.
    lack of expected error at test line 18 'sample({clock:clockExact, target:[exact,exactNarrow]           , fn:({c}) => ({a: c})})'
    lack of expected error at test line 20 'sample({clock:clockExact, target:[exact,exactBadNarrow]        , fn:({c}) => ({a: c})})'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: string; b: string; } | { a: number; b: string; } | null; }[]; }'.
    lack of expected error at test line 26 'sample({clock:clockExact, target:[exactBad,exactNarrow]        , fn:({c}) => ({a: c})})'
    lack of expected error at test line 28 'sample({clock:clockExact, target:[exactBad,exactBadNarrow]     , fn:({c}) => ({a: c})})'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: string; b: string; } | { a: number; b: string; }; }[]; }'.
    lack of expected error at test line 32 'sample({clock:clockExact, target:[narrow,exactBad]             , fn:({c}) => ({a: c})})'
    lack of expected error at test line 34 'sample({clock:clockExact, target:[narrow,exactNullable]        , fn:({c}) => ({a: c})})'
    lack of expected error at test line 36 'sample({clock:clockExact, target:[narrow,exactExactBad]        , fn:({c}) => ({a: c})})'
    lack of expected error at test line 38 'sample({clock:clockExact, target:[exactNullable,exactBadNarrow], fn:({c}) => ({a: c})})'
    lack of expected error at test line 40 'sample({clock:clockExact, target:[exactNarrow,exactNullable]   , fn:({c}) => ({a: c})})'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | { a: string; b: string; } | null; }[]; }'.
    lack of expected error at test line 44 'sample({clock:clockExact, target:[exactExactBad,exactBadNarrow], fn:({c}) => ({a: c})})'
    "
  `)
})
test('clock exact nullable (should fail)', () => {
  //prettier-ignore
  {
    sample({
      clock: clockExact,
      //@ts-expect-error
      target: exact,
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      clock: clockExact,
      //@ts-expect-error
      target: exactBad,
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      clock: clockExact,
      //@ts-expect-error
      target: narrow,
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      clock: clockExact,
      //@ts-expect-error
      target: exactNarrow,
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      clock: clockExact,
      //@ts-expect-error
      target: exactBadNarrow,
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      clock: clockExact,
      //@ts-expect-error
      target: exactExactBad,
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
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      clock: clockExact,
      target: [
        //@ts-expect-error
        exact,
        exactNullable,
      ],
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
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      clock: clockExact,
      target: [
        //@ts-expect-error
        exactBad,
        exactNullable,
      ],
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
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      clock: clockExact,
      target: [
        //@ts-expect-error
        narrow,
        exactNullable,
      ],
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
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      clock: clockExact,
      target: [
        exactNullable,
        //@ts-expect-error
        exactBadNarrow,
      ],
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      clock: clockExact,
      target: [
        //@ts-expect-error
        exactNarrow,
        exactNullable,
      ],
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
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      clock: clockExact,
      target: [
        //@ts-expect-error
        exactExactBad,
        exactNullable,
      ],
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
      fn: ({c, d}): ExactNullable => null as any,
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 4 'clock: clockExact,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; b: string; }; }; }'.
    Unmarked error at test line 10 'clock: clockExact,'
    lack of expected error at test line 6 'target: exact,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; }; }; }'.
    Unmarked error at test line 16 'clock: clockExact,'
    lack of expected error at test line 12 'target: exactBad,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; }; }; }'.
    Unmarked error at test line 22 'clock: clockExact,'
    lack of expected error at test line 18 'target: narrow,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; b: string; } | { a: number; }; }; }'.
    Unmarked error at test line 28 'clock: clockExact,'
    lack of expected error at test line 24 'target: exactNarrow,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; }; }; }'.
    Unmarked error at test line 34 'clock: clockExact,'
    lack of expected error at test line 30 'target: exactBadNarrow,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; b: string; } | { a: string; b: string; }; }; }'.
    Unmarked error at test line 40 'clock: clockExact,'
    lack of expected error at test line 36 'target: exactExactBad,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 50 'clock: clockExact,'
    lack of expected error at test line 43 'exact,'
    lack of expected error at test line 45 'exactBad,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 69 'clock: clockExact,'
    lack of expected error at test line 53 'exact,'
    lack of expected error at test line 55 'narrow,'
    lack of expected error at test line 63 'exact,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 79 'clock: clockExact,'
    lack of expected error at test line 72 'exact,'
    lack of expected error at test line 74 'exactNarrow,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; }; }[]; }'.
    Unmarked error at test line 89 'clock: clockExact,'
    lack of expected error at test line 82 'exact,'
    lack of expected error at test line 84 'exactBadNarrow,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 108 'clock: clockExact,'
    lack of expected error at test line 92 'exact,'
    lack of expected error at test line 94 'exactExactBad,'
    lack of expected error at test line 102 'exactBad,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; }; }[]; }'.
    Unmarked error at test line 118 'clock: clockExact,'
    lack of expected error at test line 111 'exactBad,'
    lack of expected error at test line 113 'exactNarrow,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; }; }[]; }'.
    Unmarked error at test line 128 'clock: clockExact,'
    lack of expected error at test line 121 'exactBad,'
    lack of expected error at test line 123 'exactBadNarrow,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; b: string; }; }[]; }'.
    Unmarked error at test line 138 'clock: clockExact,'
    lack of expected error at test line 131 'exactBad,'
    lack of expected error at test line 133 'exactExactBad,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; }; }[]; }'.
    Unmarked error at test line 157 'clock: clockExact,'
    lack of expected error at test line 141 'narrow,'
    lack of expected error at test line 143 'exactBad,'
    lack of expected error at test line 151 'narrow,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 167 'clock: clockExact,'
    lack of expected error at test line 160 'narrow,'
    lack of expected error at test line 162 'exactBadNarrow,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 195 'clock: clockExact,'
    lack of expected error at test line 170 'narrow,'
    lack of expected error at test line 172 'exactExactBad,'
    lack of expected error at test line 181 'exactBadNarrow,'
    lack of expected error at test line 189 'exactNarrow,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 214 'clock: clockExact,'
    lack of expected error at test line 198 'exactNarrow,'
    lack of expected error at test line 200 'exactBadNarrow,'
    lack of expected error at test line 208 'exactExactBad,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; }; }[]; }'.
    lack of expected error at test line 217 'exactExactBad,'
    lack of expected error at test line 219 'exactBadNarrow,'
    "
  `)
})
test('clock exact / narrow (should fail)', () => {
  //prettier-ignore
  {
    //@ts-expect-error
    sample({clock:clockExact, target:exact                         , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:exactBad                      , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:exactNullable                 , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:exactExactBad                 , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[exact,exactBad]              , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[exact,narrow]                , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[exact,exactNullable]         , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[exact,exactNarrow]           , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[exact,exactBadNarrow]        , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[exact,exactExactBad]         , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[exactBad,exactNullable]      , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[exactBad,exactNarrow]        , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[exactBad,exactBadNarrow]     , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[exactBad,exactExactBad]      , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[narrow,exactBad]             , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[narrow,exactNullable]        , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[narrow,exactExactBad]        , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[exactNullable,exactBadNarrow], fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[exactNarrow,exactNullable]   , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[exactExactBad,exactNullable] , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[exactExactBad,exactBadNarrow], fn:({c, d}): ExactNarrow => null as any})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; }; }; }'.
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: string; b: string; }; }; }'.
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | null; }; }'.
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | { a: string; b: string; }; }; }'.
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    lack of expected error at test line 14 'sample({clock:clockExact, target:[exact,narrow]                , fn:({c, d}): ExactNarrow => null as any})'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | null; }[]; }'.
    lack of expected error at test line 18 'sample({clock:clockExact, target:[exact,exactNarrow]           , fn:({c, d}): ExactNarrow => null as any})'
    lack of expected error at test line 20 'sample({clock:clockExact, target:[exact,exactBadNarrow]        , fn:({c, d}): ExactNarrow => null as any})'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: string; b: string; } | { a: number; b: string; } | null; }[]; }'.
    lack of expected error at test line 26 'sample({clock:clockExact, target:[exactBad,exactNarrow]        , fn:({c, d}): ExactNarrow => null as any})'
    lack of expected error at test line 28 'sample({clock:clockExact, target:[exactBad,exactBadNarrow]     , fn:({c, d}): ExactNarrow => null as any})'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: string; b: string; } | { a: number; b: string; }; }[]; }'.
    lack of expected error at test line 32 'sample({clock:clockExact, target:[narrow,exactBad]             , fn:({c, d}): ExactNarrow => null as any})'
    lack of expected error at test line 34 'sample({clock:clockExact, target:[narrow,exactNullable]        , fn:({c, d}): ExactNarrow => null as any})'
    lack of expected error at test line 36 'sample({clock:clockExact, target:[narrow,exactExactBad]        , fn:({c, d}): ExactNarrow => null as any})'
    lack of expected error at test line 38 'sample({clock:clockExact, target:[exactNullable,exactBadNarrow], fn:({c, d}): ExactNarrow => null as any})'
    lack of expected error at test line 40 'sample({clock:clockExact, target:[exactNarrow,exactNullable]   , fn:({c, d}): ExactNarrow => null as any})'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | { a: string; b: string; } | null; }[]; }'.
    lack of expected error at test line 44 'sample({clock:clockExact, target:[exactExactBad,exactBadNarrow], fn:({c, d}): ExactNarrow => null as any})'
    "
  `)
})
test('clock exact bad / narrow (should fail)', () => {
  //prettier-ignore
  {
    //@ts-expect-error
    sample({clock:clockExact, target:exact                         , fn:({c, d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:exactNullable                 , fn:({c, d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[exact,exactBad]              , fn:({c, d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[exact,narrow]                , fn:({c, d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[exact,exactNullable]         , fn:({c, d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[exact,exactNarrow]           , fn:({c, d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[exact,exactBadNarrow]        , fn:({c, d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[exact,exactExactBad]         , fn:({c, d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[exactBad,exactNullable]      , fn:({c, d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[exactBad,exactNarrow]        , fn:({c, d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[narrow,exactBad]             , fn:({c, d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[narrow,exactNullable]        , fn:({c, d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[narrow,exactExactBad]        , fn:({c, d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[exactNullable,exactBadNarrow], fn:({c, d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[exactNarrow,exactNullable]   , fn:({c, d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[exactExactBad,exactNullable] , fn:({c, d}): ExactBadNarrow => null as any})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; }; }; }'.
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; } | null; }; }'.
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; }; }[]; }'.
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; } | null; }[]; }'.
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; }; }[]; }'.
    lack of expected error at test line 16 'sample({clock:clockExact, target:[exact,exactBadNarrow]        , fn:({c, d}): ExactBadNarrow => null as any})'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: string; b: string; } | { a: number; b: string; } | null; }[]; }'.
    lack of expected error at test line 22 'sample({clock:clockExact, target:[exactBad,exactNarrow]        , fn:({c, d}): ExactBadNarrow => null as any})'
    lack of expected error at test line 24 'sample({clock:clockExact, target:[narrow,exactBad]             , fn:({c, d}): ExactBadNarrow => null as any})'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; } | null; }[]; }'.
    lack of expected error at test line 28 'sample({clock:clockExact, target:[narrow,exactExactBad]        , fn:({c, d}): ExactBadNarrow => null as any})'
    lack of expected error at test line 30 'sample({clock:clockExact, target:[exactNullable,exactBadNarrow], fn:({c, d}): ExactBadNarrow => null as any})'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; } | null; }[]; }'.
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; } | { a: string; b: string; } | null; }[]; }'.
    "
  `)
})
test('clock exact / exact bad (should fail)', () => {
  //prettier-ignore
  {
    //@ts-expect-error
    sample({clock:clockExact, target:exact                         , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:narrow                        , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:exactNullable                 , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:exactNarrow                   , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[exact,exactBad]              , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[exact,narrow]                , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[exact,exactNullable]         , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[exact,exactNarrow]           , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[exact,exactBadNarrow]        , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[exact,exactExactBad]         , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[exactBad,exactNullable]      , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[exactBad,exactNarrow]        , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[narrow,exactBad]             , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[narrow,exactNullable]        , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[narrow,exactBadNarrow]       , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[narrow,exactExactBad]        , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[exactNullable,exactBadNarrow], fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[exactNarrow,exactNullable]   , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[exactNarrow,exactBadNarrow]  , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({clock:clockExact, target:[exactExactBad,exactNullable] , fn:({c, d}): ExactExactBad => null as any})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; b: string; }; }; }'.
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; }; }; }'.
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; b: string; } | null; }; }'.
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; b: string; } | { a: number; }; }; }'.
    lack of expected error at test line 12 'sample({clock:clockExact, target:[exact,exactBad]              , fn:({c, d}): ExactExactBad => null as any})'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; }; }[]; }'.
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; b: string; } | null; }[]; }'.
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; }; }[]; }'.
    lack of expected error at test line 20 'sample({clock:clockExact, target:[exact,exactBadNarrow]        , fn:({c, d}): ExactExactBad => null as any})'
    lack of expected error at test line 22 'sample({clock:clockExact, target:[exact,exactExactBad]         , fn:({c, d}): ExactExactBad => null as any})'
    lack of expected error at test line 24 'sample({clock:clockExact, target:[exactBad,exactNullable]      , fn:({c, d}): ExactExactBad => null as any})'
    lack of expected error at test line 26 'sample({clock:clockExact, target:[exactBad,exactNarrow]        , fn:({c, d}): ExactExactBad => null as any})'
    lack of expected error at test line 28 'sample({clock:clockExact, target:[narrow,exactBad]             , fn:({c, d}): ExactExactBad => null as any})'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; } | null; }[]; }'.
    lack of expected error at test line 32 'sample({clock:clockExact, target:[narrow,exactBadNarrow]       , fn:({c, d}): ExactExactBad => null as any})'
    lack of expected error at test line 34 'sample({clock:clockExact, target:[narrow,exactExactBad]        , fn:({c, d}): ExactExactBad => null as any})'
    lack of expected error at test line 36 'sample({clock:clockExact, target:[exactNullable,exactBadNarrow], fn:({c, d}): ExactExactBad => null as any})'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; } | null; }[]; }'.
    lack of expected error at test line 40 'sample({clock:clockExact, target:[exactNarrow,exactBadNarrow]  , fn:({c, d}): ExactExactBad => null as any})'
    lack of expected error at test line 42 'sample({clock:clockExact, target:[exactExactBad,exactNullable] , fn:({c, d}): ExactExactBad => null as any})'
    "
  `)
})
describe('source exact', () => {
  test('source exact (should pass)', () => {
    //prettier-ignore
    {
      sample({source:$dataExact    , target:exact                        , fn:({c, d}) => ({a: c, b: d})})
      sample({source:$dataExact    , target:exactNullable                , fn:({c, d}) => ({a: c, b: d})})
      sample({source:$dataExact    , target:exactNarrow                  , fn:({c, d}) => ({a: c, b: d})})
      sample({source:$dataExact    , target:exactExactBad                , fn:({c, d}) => ({a: c, b: d})})
      sample({source:$dataExact    , target:[exact,narrow]               , fn:({c, d}) => ({a: c, b: d})})
      sample({source:$dataExact    , target:[exact,exactNullable]        , fn:({c, d}) => ({a: c, b: d})})
      sample({source:$dataExact    , target:[exact,exactNarrow]          , fn:({c, d}) => ({a: c, b: d})})
      sample({source:$dataExact    , target:[exact,exactExactBad]        , fn:({c, d}) => ({a: c, b: d})})
      sample({source:$dataExact    , target:[narrow,exactNullable]       , fn:({c, d}) => ({a: c, b: d})})
      sample({source:$dataExact    , target:[narrow,exactExactBad]       , fn:({c, d}) => ({a: c, b: d})})
      sample({source:$dataExact    , target:[exactNarrow,exactNullable]  , fn:({c, d}) => ({a: c, b: d})})
      sample({source:$dataExact    , target:[exactExactBad,exactNullable], fn:({c, d}) => ({a: c, b: d})})
      sample({source:{c: $c, d: $d}, target:exact                        , fn:({c, d}) => ({a: c, b: d})})
      sample({source:{c: $c, d: $d}, target:exactNullable                , fn:({c, d}) => ({a: c, b: d})})
      sample({source:{c: $c, d: $d}, target:exactNarrow                  , fn:({c, d}) => ({a: c, b: d})})
      sample({source:{c: $c, d: $d}, target:exactExactBad                , fn:({c, d}) => ({a: c, b: d})})
      sample({source:{c: $c, d: $d}, target:[exact,narrow]               , fn:({c, d}) => ({a: c, b: d})})
      sample({source:{c: $c, d: $d}, target:[exact,exactNullable]        , fn:({c, d}) => ({a: c, b: d})})
      sample({source:{c: $c, d: $d}, target:[exact,exactNarrow]          , fn:({c, d}) => ({a: c, b: d})})
      sample({source:{c: $c, d: $d}, target:[exact,exactExactBad]        , fn:({c, d}) => ({a: c, b: d})})
      sample({source:{c: $c, d: $d}, target:[narrow,exactNullable]       , fn:({c, d}) => ({a: c, b: d})})
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
        target: exactBad,
        fn: ({c, d}) => ({a: c, b: d}),
      })
      //@ts-expect-error
      sample({source:$dataExact    , target:narrow, fn:({c, d}) => ({a: c, b: d})})
      sample({
        source: $dataExact,
        //@ts-expect-error
        target: exactBadNarrow,
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        source: $dataExact,
        target: [
          exact,
          //@ts-expect-error
          exactBad,
        ],
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
          exactNullable,
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
          exactBad,
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
        target: exactBad,
        fn: ({c, d}) => ({a: c, b: d}),
      })
      //@ts-expect-error
      sample({source:{c: $c, d: $d}, target:narrow, fn:({c, d}) => ({a: c, b: d})})
      sample({
        source: {c: $c, d: $d},
        //@ts-expect-error
        target: exactBadNarrow,
        fn: ({c, d}) => ({a: c, b: d}),
      })
      sample({
        source: {c: $c, d: $d},
        target: [
          exact,
          //@ts-expect-error
          exactBad,
        ],
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
          exactNullable,
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
          exactBad,
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
      Unmarked error at test line 4 'source: $dataExact,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: { a: string; b: string; }; }; }'.
      Unmarked error at test line 118 'source: {c: $c, d: $d},'
      lack of expected error at test line 6 'target: exactBad,'
      lack of expected error at test line 10 'sample({source:$dataExact    , target:narrow, fn:({c, d}) => ({a: c, b: d})})'
      lack of expected error at test line 14 'target: exactBadNarrow,'
      lack of expected error at test line 22 'exactBad,'
      lack of expected error at test line 31 'exactBadNarrow,'
      lack of expected error at test line 39 'exactBad,'
      lack of expected error at test line 48 'exactBad,'
      lack of expected error at test line 57 'exactBad,'
      lack of expected error at test line 59 'exactBadNarrow,'
      lack of expected error at test line 67 'exactBad,'
      lack of expected error at test line 77 'exactBad,'
      lack of expected error at test line 86 'exactBadNarrow,'
      lack of expected error at test line 95 'exactBadNarrow,'
      lack of expected error at test line 104 'exactBadNarrow,'
      lack of expected error at test line 113 'exactBadNarrow,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: { a: string; b: string; }; }; }'.
      lack of expected error at test line 120 'target: exactBad,'
      lack of expected error at test line 124 'sample({source:{c: $c, d: $d}, target:narrow, fn:({c, d}) => ({a: c, b: d})})'
      lack of expected error at test line 128 'target: exactBadNarrow,'
      lack of expected error at test line 136 'exactBad,'
      lack of expected error at test line 145 'exactBadNarrow,'
      lack of expected error at test line 153 'exactBad,'
      lack of expected error at test line 162 'exactBad,'
      lack of expected error at test line 171 'exactBad,'
      lack of expected error at test line 173 'exactBadNarrow,'
      lack of expected error at test line 181 'exactBad,'
      lack of expected error at test line 191 'exactBad,'
      lack of expected error at test line 200 'exactBadNarrow,'
      lack of expected error at test line 209 'exactBadNarrow,'
      lack of expected error at test line 218 'exactBadNarrow,'
      lack of expected error at test line 227 'exactBadNarrow,'
      "
    `)
  })
})
test('source exact bad (should fail)', () => {
  //prettier-ignore
  {
    sample({
      source: $dataExact,
      //@ts-expect-error
      target: exact,
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: $dataExact,
      //@ts-expect-error
      target: narrow,
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: $dataExact,
      //@ts-expect-error
      target: exactNullable,
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: $dataExact,
      //@ts-expect-error
      target: exactNarrow,
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exact,
        exactBad,
      ],
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
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exact,
        exactBadNarrow,
      ],
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exact,
        exactExactBad,
      ],
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: $dataExact,
      target: [
        exactBad,
        //@ts-expect-error
        exactNullable,
      ],
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
        exactBad,
      ],
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
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        narrow,
        exactBadNarrow,
      ],
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        narrow,
        exactExactBad,
      ],
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exactNullable,
        exactBadNarrow,
      ],
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
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exactNarrow,
        exactBadNarrow,
      ],
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: $dataExact,
      target: [
        exactExactBad,
        //@ts-expect-error
        exactNullable,
      ],
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c, d: $d},
      //@ts-expect-error
      target: exact,
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c, d: $d},
      //@ts-expect-error
      target: narrow,
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c, d: $d},
      //@ts-expect-error
      target: exactNullable,
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c, d: $d},
      //@ts-expect-error
      target: exactNarrow,
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exact,
        exactBad,
      ],
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
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exact,
        exactBadNarrow,
      ],
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exact,
        exactExactBad,
      ],
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        exactBad,
        //@ts-expect-error
        exactNullable,
      ],
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
        exactBad,
      ],
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
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        narrow,
        exactBadNarrow,
      ],
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        narrow,
        exactExactBad,
      ],
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exactNullable,
        exactBadNarrow,
      ],
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
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exactNarrow,
        exactBadNarrow,
      ],
      fn: ({d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        exactExactBad,
        //@ts-expect-error
        exactNullable,
      ],
      fn: ({d}) => ({a: "no", b: d}),
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 4 'source: $dataExact,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; b: string; }; }; }'.
    Unmarked error at test line 10 'source: $dataExact,'
    lack of expected error at test line 6 'target: exact,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; }; }; }'.
    Unmarked error at test line 16 'source: $dataExact,'
    lack of expected error at test line 12 'target: narrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; b: string; } | null; }; }'.
    Unmarked error at test line 22 'source: $dataExact,'
    lack of expected error at test line 18 'target: exactNullable,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; b: string; } | { a: number; }; }; }'.
    Unmarked error at test line 37 'source: $dataExact,'
    lack of expected error at test line 24 'target: exactNarrow,'
    lack of expected error at test line 31 'exact,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 47 'source: $dataExact,'
    lack of expected error at test line 40 'exact,'
    lack of expected error at test line 42 'narrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; b: string; } | null; }[]; }'.
    Unmarked error at test line 57 'source: $dataExact,'
    lack of expected error at test line 50 'exact,'
    lack of expected error at test line 52 'exactNullable,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 112 'source: $dataExact,'
    lack of expected error at test line 60 'exact,'
    lack of expected error at test line 62 'exactNarrow,'
    lack of expected error at test line 70 'exact,'
    lack of expected error at test line 79 'exact,'
    lack of expected error at test line 89 'exactNullable,'
    lack of expected error at test line 98 'exactNarrow,'
    lack of expected error at test line 106 'narrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; } | null; }[]; }'.
    Unmarked error at test line 149 'source: $dataExact,'
    lack of expected error at test line 115 'narrow,'
    lack of expected error at test line 117 'exactNullable,'
    lack of expected error at test line 125 'narrow,'
    lack of expected error at test line 134 'narrow,'
    lack of expected error at test line 143 'exactNullable,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; } | null; }[]; }'.
    Unmarked error at test line 177 'source: {c: $c, d: $d},'
    lack of expected error at test line 152 'exactNarrow,'
    lack of expected error at test line 154 'exactNullable,'
    lack of expected error at test line 162 'exactNarrow,'
    lack of expected error at test line 172 'exactNullable,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; b: string; }; }; }'.
    Unmarked error at test line 183 'source: {c: $c, d: $d},'
    lack of expected error at test line 179 'target: exact,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; }; }; }'.
    Unmarked error at test line 189 'source: {c: $c, d: $d},'
    lack of expected error at test line 185 'target: narrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; b: string; } | null; }; }'.
    Unmarked error at test line 195 'source: {c: $c, d: $d},'
    lack of expected error at test line 191 'target: exactNullable,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; b: string; } | { a: number; }; }; }'.
    Unmarked error at test line 210 'source: {c: $c, d: $d},'
    lack of expected error at test line 197 'target: exactNarrow,'
    lack of expected error at test line 204 'exact,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 220 'source: {c: $c, d: $d},'
    lack of expected error at test line 213 'exact,'
    lack of expected error at test line 215 'narrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; b: string; } | null; }[]; }'.
    Unmarked error at test line 230 'source: {c: $c, d: $d},'
    lack of expected error at test line 223 'exact,'
    lack of expected error at test line 225 'exactNullable,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 285 'source: {c: $c, d: $d},'
    lack of expected error at test line 233 'exact,'
    lack of expected error at test line 235 'exactNarrow,'
    lack of expected error at test line 243 'exact,'
    lack of expected error at test line 252 'exact,'
    lack of expected error at test line 262 'exactNullable,'
    lack of expected error at test line 271 'exactNarrow,'
    lack of expected error at test line 279 'narrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; } | null; }[]; }'.
    Unmarked error at test line 322 'source: {c: $c, d: $d},'
    lack of expected error at test line 288 'narrow,'
    lack of expected error at test line 290 'exactNullable,'
    lack of expected error at test line 298 'narrow,'
    lack of expected error at test line 307 'narrow,'
    lack of expected error at test line 316 'exactNullable,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; } | null; }[]; }'.
    lack of expected error at test line 325 'exactNarrow,'
    lack of expected error at test line 327 'exactNullable,'
    lack of expected error at test line 335 'exactNarrow,'
    lack of expected error at test line 345 'exactNullable,'
    "
  `)
})
test('source narrow (should fail)', () => {
  //prettier-ignore
  {
    //@ts-expect-error
    sample({source:$dataExact    , target:exact                         , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:$dataExact    , target:exactBad                      , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:$dataExact    , target:exactNullable                 , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:$dataExact    , target:exactExactBad                 , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exact,exactBad]              , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exact,narrow]                , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exact,exactNullable]         , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exact,exactNarrow]           , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exact,exactBadNarrow]        , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exact,exactExactBad]         , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exactBad,exactNullable]      , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exactBad,exactNarrow]        , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exactBad,exactBadNarrow]     , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exactBad,exactExactBad]      , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:$dataExact    , target:[narrow,exactBad]             , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:$dataExact    , target:[narrow,exactNullable]        , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:$dataExact    , target:[narrow,exactExactBad]        , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exactNullable,exactBadNarrow], fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exactNarrow,exactNullable]   , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exactExactBad,exactNullable] , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exactExactBad,exactBadNarrow], fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:exact                         , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:exactBad                      , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:exactNullable                 , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:exactExactBad                 , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exact,exactBad]              , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exact,narrow]                , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exact,exactNullable]         , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exact,exactNarrow]           , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exact,exactBadNarrow]        , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exact,exactExactBad]         , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exactBad,exactNullable]      , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exactBad,exactNarrow]        , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exactBad,exactBadNarrow]     , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exactBad,exactExactBad]      , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[narrow,exactBad]             , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[narrow,exactNullable]        , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[narrow,exactExactBad]        , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exactNullable,exactBadNarrow], fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exactNarrow,exactNullable]   , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exactExactBad,exactNullable] , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exactExactBad,exactBadNarrow], fn:({c}) => ({a: c})})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; }; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: string; b: string; }; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | null; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | { a: string; b: string; }; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    lack of expected error at test line 14 'sample({source:$dataExact    , target:[exact,narrow]                , fn:({c}) => ({a: c})})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | null; }[]; }'.
    lack of expected error at test line 18 'sample({source:$dataExact    , target:[exact,exactNarrow]           , fn:({c}) => ({a: c})})'
    lack of expected error at test line 20 'sample({source:$dataExact    , target:[exact,exactBadNarrow]        , fn:({c}) => ({a: c})})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: string; b: string; } | { a: number; b: string; } | null; }[]; }'.
    lack of expected error at test line 26 'sample({source:$dataExact    , target:[exactBad,exactNarrow]        , fn:({c}) => ({a: c})})'
    lack of expected error at test line 28 'sample({source:$dataExact    , target:[exactBad,exactBadNarrow]     , fn:({c}) => ({a: c})})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: string; b: string; } | { a: number; b: string; }; }[]; }'.
    lack of expected error at test line 32 'sample({source:$dataExact    , target:[narrow,exactBad]             , fn:({c}) => ({a: c})})'
    lack of expected error at test line 34 'sample({source:$dataExact    , target:[narrow,exactNullable]        , fn:({c}) => ({a: c})})'
    lack of expected error at test line 36 'sample({source:$dataExact    , target:[narrow,exactExactBad]        , fn:({c}) => ({a: c})})'
    lack of expected error at test line 38 'sample({source:$dataExact    , target:[exactNullable,exactBadNarrow], fn:({c}) => ({a: c})})'
    lack of expected error at test line 40 'sample({source:$dataExact    , target:[exactNarrow,exactNullable]   , fn:({c}) => ({a: c})})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | { a: string; b: string; } | null; }[]; }'.
    lack of expected error at test line 44 'sample({source:$dataExact    , target:[exactExactBad,exactBadNarrow], fn:({c}) => ({a: c})})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; }; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: string; b: string; }; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | null; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | { a: string; b: string; }; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    lack of expected error at test line 56 'sample({source:{c: $c, d: $d}, target:[exact,narrow]                , fn:({c}) => ({a: c})})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | null; }[]; }'.
    lack of expected error at test line 60 'sample({source:{c: $c, d: $d}, target:[exact,exactNarrow]           , fn:({c}) => ({a: c})})'
    lack of expected error at test line 62 'sample({source:{c: $c, d: $d}, target:[exact,exactBadNarrow]        , fn:({c}) => ({a: c})})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: string; b: string; } | { a: number; b: string; } | null; }[]; }'.
    lack of expected error at test line 68 'sample({source:{c: $c, d: $d}, target:[exactBad,exactNarrow]        , fn:({c}) => ({a: c})})'
    lack of expected error at test line 70 'sample({source:{c: $c, d: $d}, target:[exactBad,exactBadNarrow]     , fn:({c}) => ({a: c})})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: string; b: string; } | { a: number; b: string; }; }[]; }'.
    lack of expected error at test line 74 'sample({source:{c: $c, d: $d}, target:[narrow,exactBad]             , fn:({c}) => ({a: c})})'
    lack of expected error at test line 76 'sample({source:{c: $c, d: $d}, target:[narrow,exactNullable]        , fn:({c}) => ({a: c})})'
    lack of expected error at test line 78 'sample({source:{c: $c, d: $d}, target:[narrow,exactExactBad]        , fn:({c}) => ({a: c})})'
    lack of expected error at test line 80 'sample({source:{c: $c, d: $d}, target:[exactNullable,exactBadNarrow], fn:({c}) => ({a: c})})'
    lack of expected error at test line 82 'sample({source:{c: $c, d: $d}, target:[exactNarrow,exactNullable]   , fn:({c}) => ({a: c})})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | { a: string; b: string; } | null; }[]; }'.
    lack of expected error at test line 86 'sample({source:{c: $c, d: $d}, target:[exactExactBad,exactBadNarrow], fn:({c}) => ({a: c})})'
    "
  `)
})
test('source exact nullable (should fail)', () => {
  //prettier-ignore
  {
    sample({
      source: $dataExact,
      //@ts-expect-error
      target: exact,
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: $dataExact,
      //@ts-expect-error
      target: exactBad,
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: $dataExact,
      //@ts-expect-error
      target: narrow,
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: $dataExact,
      //@ts-expect-error
      target: exactNarrow,
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: $dataExact,
      //@ts-expect-error
      target: exactBadNarrow,
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: $dataExact,
      //@ts-expect-error
      target: exactExactBad,
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
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exact,
        exactNullable,
      ],
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
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exactBad,
        exactNullable,
      ],
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
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        narrow,
        exactNullable,
      ],
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
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        exactNullable,
        //@ts-expect-error
        exactBadNarrow,
      ],
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exactNarrow,
        exactNullable,
      ],
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
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: $dataExact,
      target: [
        //@ts-expect-error
        exactExactBad,
        exactNullable,
      ],
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
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      //@ts-expect-error
      target: exact,
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      //@ts-expect-error
      target: exactBad,
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      //@ts-expect-error
      target: narrow,
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      //@ts-expect-error
      target: exactNarrow,
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      //@ts-expect-error
      target: exactBadNarrow,
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      //@ts-expect-error
      target: exactExactBad,
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
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exact,
        exactNullable,
      ],
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
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exactBad,
        exactNullable,
      ],
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
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        narrow,
        exactNullable,
      ],
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
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        exactNullable,
        //@ts-expect-error
        exactBadNarrow,
      ],
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exactNarrow,
        exactNullable,
      ],
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
      fn: ({c, d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c, d: $d},
      target: [
        //@ts-expect-error
        exactExactBad,
        exactNullable,
      ],
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
      fn: ({c, d}): ExactNullable => null as any,
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 4 'source: $dataExact,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; b: string; }; }; }'.
    Unmarked error at test line 10 'source: $dataExact,'
    lack of expected error at test line 6 'target: exact,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; }; }; }'.
    Unmarked error at test line 16 'source: $dataExact,'
    lack of expected error at test line 12 'target: exactBad,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; }; }; }'.
    Unmarked error at test line 22 'source: $dataExact,'
    lack of expected error at test line 18 'target: narrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; b: string; } | { a: number; }; }; }'.
    Unmarked error at test line 28 'source: $dataExact,'
    lack of expected error at test line 24 'target: exactNarrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; }; }; }'.
    Unmarked error at test line 34 'source: $dataExact,'
    lack of expected error at test line 30 'target: exactBadNarrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; b: string; } | { a: string; b: string; }; }; }'.
    Unmarked error at test line 40 'source: $dataExact,'
    lack of expected error at test line 36 'target: exactExactBad,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 50 'source: $dataExact,'
    lack of expected error at test line 43 'exact,'
    lack of expected error at test line 45 'exactBad,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 69 'source: $dataExact,'
    lack of expected error at test line 53 'exact,'
    lack of expected error at test line 55 'narrow,'
    lack of expected error at test line 63 'exact,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 79 'source: $dataExact,'
    lack of expected error at test line 72 'exact,'
    lack of expected error at test line 74 'exactNarrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; }; }[]; }'.
    Unmarked error at test line 89 'source: $dataExact,'
    lack of expected error at test line 82 'exact,'
    lack of expected error at test line 84 'exactBadNarrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 108 'source: $dataExact,'
    lack of expected error at test line 92 'exact,'
    lack of expected error at test line 94 'exactExactBad,'
    lack of expected error at test line 102 'exactBad,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; }; }[]; }'.
    Unmarked error at test line 118 'source: $dataExact,'
    lack of expected error at test line 111 'exactBad,'
    lack of expected error at test line 113 'exactNarrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; }; }[]; }'.
    Unmarked error at test line 128 'source: $dataExact,'
    lack of expected error at test line 121 'exactBad,'
    lack of expected error at test line 123 'exactBadNarrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; b: string; }; }[]; }'.
    Unmarked error at test line 138 'source: $dataExact,'
    lack of expected error at test line 131 'exactBad,'
    lack of expected error at test line 133 'exactExactBad,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; }; }[]; }'.
    Unmarked error at test line 157 'source: $dataExact,'
    lack of expected error at test line 141 'narrow,'
    lack of expected error at test line 143 'exactBad,'
    lack of expected error at test line 151 'narrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 167 'source: $dataExact,'
    lack of expected error at test line 160 'narrow,'
    lack of expected error at test line 162 'exactBadNarrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 195 'source: $dataExact,'
    lack of expected error at test line 170 'narrow,'
    lack of expected error at test line 172 'exactExactBad,'
    lack of expected error at test line 181 'exactBadNarrow,'
    lack of expected error at test line 189 'exactNarrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 214 'source: $dataExact,'
    lack of expected error at test line 198 'exactNarrow,'
    lack of expected error at test line 200 'exactBadNarrow,'
    lack of expected error at test line 208 'exactExactBad,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; }; }[]; }'.
    Unmarked error at test line 224 'source: {c: $c, d: $d},'
    lack of expected error at test line 217 'exactExactBad,'
    lack of expected error at test line 219 'exactBadNarrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; b: string; }; }; }'.
    Unmarked error at test line 230 'source: {c: $c, d: $d},'
    lack of expected error at test line 226 'target: exact,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; }; }; }'.
    Unmarked error at test line 236 'source: {c: $c, d: $d},'
    lack of expected error at test line 232 'target: exactBad,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; }; }; }'.
    Unmarked error at test line 242 'source: {c: $c, d: $d},'
    lack of expected error at test line 238 'target: narrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; b: string; } | { a: number; }; }; }'.
    Unmarked error at test line 248 'source: {c: $c, d: $d},'
    lack of expected error at test line 244 'target: exactNarrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; }; }; }'.
    Unmarked error at test line 254 'source: {c: $c, d: $d},'
    lack of expected error at test line 250 'target: exactBadNarrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; b: string; } | { a: string; b: string; }; }; }'.
    Unmarked error at test line 260 'source: {c: $c, d: $d},'
    lack of expected error at test line 256 'target: exactExactBad,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 270 'source: {c: $c, d: $d},'
    lack of expected error at test line 263 'exact,'
    lack of expected error at test line 265 'exactBad,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 289 'source: {c: $c, d: $d},'
    lack of expected error at test line 273 'exact,'
    lack of expected error at test line 275 'narrow,'
    lack of expected error at test line 283 'exact,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 299 'source: {c: $c, d: $d},'
    lack of expected error at test line 292 'exact,'
    lack of expected error at test line 294 'exactNarrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; }; }[]; }'.
    Unmarked error at test line 309 'source: {c: $c, d: $d},'
    lack of expected error at test line 302 'exact,'
    lack of expected error at test line 304 'exactBadNarrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 328 'source: {c: $c, d: $d},'
    lack of expected error at test line 312 'exact,'
    lack of expected error at test line 314 'exactExactBad,'
    lack of expected error at test line 322 'exactBad,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; }; }[]; }'.
    Unmarked error at test line 338 'source: {c: $c, d: $d},'
    lack of expected error at test line 331 'exactBad,'
    lack of expected error at test line 333 'exactNarrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; }; }[]; }'.
    Unmarked error at test line 348 'source: {c: $c, d: $d},'
    lack of expected error at test line 341 'exactBad,'
    lack of expected error at test line 343 'exactBadNarrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; b: string; }; }[]; }'.
    Unmarked error at test line 358 'source: {c: $c, d: $d},'
    lack of expected error at test line 351 'exactBad,'
    lack of expected error at test line 353 'exactExactBad,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; }; }[]; }'.
    Unmarked error at test line 377 'source: {c: $c, d: $d},'
    lack of expected error at test line 361 'narrow,'
    lack of expected error at test line 363 'exactBad,'
    lack of expected error at test line 371 'narrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 387 'source: {c: $c, d: $d},'
    lack of expected error at test line 380 'narrow,'
    lack of expected error at test line 382 'exactBadNarrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 415 'source: {c: $c, d: $d},'
    lack of expected error at test line 390 'narrow,'
    lack of expected error at test line 392 'exactExactBad,'
    lack of expected error at test line 401 'exactBadNarrow,'
    lack of expected error at test line 409 'exactNarrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 434 'source: {c: $c, d: $d},'
    lack of expected error at test line 418 'exactNarrow,'
    lack of expected error at test line 420 'exactBadNarrow,'
    lack of expected error at test line 428 'exactExactBad,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; }; }[]; }'.
    lack of expected error at test line 437 'exactExactBad,'
    lack of expected error at test line 439 'exactBadNarrow,'
    "
  `)
})
test('source exact / narrow (should fail)', () => {
  //prettier-ignore
  {
    //@ts-expect-error
    sample({source:$dataExact    , target:exact                         , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:exactBad                      , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:exactNullable                 , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:exactExactBad                 , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exact,exactBad]              , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exact,narrow]                , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exact,exactNullable]         , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exact,exactNarrow]           , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exact,exactBadNarrow]        , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exact,exactExactBad]         , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exactBad,exactNullable]      , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exactBad,exactNarrow]        , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exactBad,exactBadNarrow]     , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exactBad,exactExactBad]      , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[narrow,exactBad]             , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[narrow,exactNullable]        , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[narrow,exactExactBad]        , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exactNullable,exactBadNarrow], fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exactNarrow,exactNullable]   , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exactExactBad,exactNullable] , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exactExactBad,exactBadNarrow], fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:exact                         , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:exactBad                      , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:exactNullable                 , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:exactExactBad                 , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exact,exactBad]              , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exact,narrow]                , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exact,exactNullable]         , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exact,exactNarrow]           , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exact,exactBadNarrow]        , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exact,exactExactBad]         , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exactBad,exactNullable]      , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exactBad,exactNarrow]        , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exactBad,exactBadNarrow]     , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exactBad,exactExactBad]      , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[narrow,exactBad]             , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[narrow,exactNullable]        , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[narrow,exactExactBad]        , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exactNullable,exactBadNarrow], fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exactNarrow,exactNullable]   , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exactExactBad,exactNullable] , fn:({c, d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exactExactBad,exactBadNarrow], fn:({c, d}): ExactNarrow => null as any})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; }; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: string; b: string; }; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | null; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | { a: string; b: string; }; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    lack of expected error at test line 14 'sample({source:$dataExact    , target:[exact,narrow]                , fn:({c, d}): ExactNarrow => null as any})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | null; }[]; }'.
    lack of expected error at test line 18 'sample({source:$dataExact    , target:[exact,exactNarrow]           , fn:({c, d}): ExactNarrow => null as any})'
    lack of expected error at test line 20 'sample({source:$dataExact    , target:[exact,exactBadNarrow]        , fn:({c, d}): ExactNarrow => null as any})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: string; b: string; } | { a: number; b: string; } | null; }[]; }'.
    lack of expected error at test line 26 'sample({source:$dataExact    , target:[exactBad,exactNarrow]        , fn:({c, d}): ExactNarrow => null as any})'
    lack of expected error at test line 28 'sample({source:$dataExact    , target:[exactBad,exactBadNarrow]     , fn:({c, d}): ExactNarrow => null as any})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: string; b: string; } | { a: number; b: string; }; }[]; }'.
    lack of expected error at test line 32 'sample({source:$dataExact    , target:[narrow,exactBad]             , fn:({c, d}): ExactNarrow => null as any})'
    lack of expected error at test line 34 'sample({source:$dataExact    , target:[narrow,exactNullable]        , fn:({c, d}): ExactNarrow => null as any})'
    lack of expected error at test line 36 'sample({source:$dataExact    , target:[narrow,exactExactBad]        , fn:({c, d}): ExactNarrow => null as any})'
    lack of expected error at test line 38 'sample({source:$dataExact    , target:[exactNullable,exactBadNarrow], fn:({c, d}): ExactNarrow => null as any})'
    lack of expected error at test line 40 'sample({source:$dataExact    , target:[exactNarrow,exactNullable]   , fn:({c, d}): ExactNarrow => null as any})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | { a: string; b: string; } | null; }[]; }'.
    lack of expected error at test line 44 'sample({source:$dataExact    , target:[exactExactBad,exactBadNarrow], fn:({c, d}): ExactNarrow => null as any})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; }; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: string; b: string; }; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | null; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | { a: string; b: string; }; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    lack of expected error at test line 56 'sample({source:{c: $c, d: $d}, target:[exact,narrow]                , fn:({c, d}): ExactNarrow => null as any})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | null; }[]; }'.
    lack of expected error at test line 60 'sample({source:{c: $c, d: $d}, target:[exact,exactNarrow]           , fn:({c, d}): ExactNarrow => null as any})'
    lack of expected error at test line 62 'sample({source:{c: $c, d: $d}, target:[exact,exactBadNarrow]        , fn:({c, d}): ExactNarrow => null as any})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: string; b: string; } | { a: number; b: string; } | null; }[]; }'.
    lack of expected error at test line 68 'sample({source:{c: $c, d: $d}, target:[exactBad,exactNarrow]        , fn:({c, d}): ExactNarrow => null as any})'
    lack of expected error at test line 70 'sample({source:{c: $c, d: $d}, target:[exactBad,exactBadNarrow]     , fn:({c, d}): ExactNarrow => null as any})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: string; b: string; } | { a: number; b: string; }; }[]; }'.
    lack of expected error at test line 74 'sample({source:{c: $c, d: $d}, target:[narrow,exactBad]             , fn:({c, d}): ExactNarrow => null as any})'
    lack of expected error at test line 76 'sample({source:{c: $c, d: $d}, target:[narrow,exactNullable]        , fn:({c, d}): ExactNarrow => null as any})'
    lack of expected error at test line 78 'sample({source:{c: $c, d: $d}, target:[narrow,exactExactBad]        , fn:({c, d}): ExactNarrow => null as any})'
    lack of expected error at test line 80 'sample({source:{c: $c, d: $d}, target:[exactNullable,exactBadNarrow], fn:({c, d}): ExactNarrow => null as any})'
    lack of expected error at test line 82 'sample({source:{c: $c, d: $d}, target:[exactNarrow,exactNullable]   , fn:({c, d}): ExactNarrow => null as any})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | { a: string; b: string; } | null; }[]; }'.
    lack of expected error at test line 86 'sample({source:{c: $c, d: $d}, target:[exactExactBad,exactBadNarrow], fn:({c, d}): ExactNarrow => null as any})'
    "
  `)
})
test('source exact bad / narrow (should fail)', () => {
  //prettier-ignore
  {
    //@ts-expect-error
    sample({source:$dataExact    , target:exact                         , fn:({c, d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:exactNullable                 , fn:({c, d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exact,exactBad]              , fn:({c, d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exact,narrow]                , fn:({c, d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exact,exactNullable]         , fn:({c, d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exact,exactNarrow]           , fn:({c, d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exact,exactBadNarrow]        , fn:({c, d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exact,exactExactBad]         , fn:({c, d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exactBad,exactNullable]      , fn:({c, d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exactBad,exactNarrow]        , fn:({c, d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[narrow,exactBad]             , fn:({c, d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[narrow,exactNullable]        , fn:({c, d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[narrow,exactExactBad]        , fn:({c, d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exactNullable,exactBadNarrow], fn:({c, d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exactNarrow,exactNullable]   , fn:({c, d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exactExactBad,exactNullable] , fn:({c, d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:exact                         , fn:({c, d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:exactNullable                 , fn:({c, d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exact,exactBad]              , fn:({c, d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exact,narrow]                , fn:({c, d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exact,exactNullable]         , fn:({c, d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exact,exactNarrow]           , fn:({c, d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exact,exactBadNarrow]        , fn:({c, d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exact,exactExactBad]         , fn:({c, d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exactBad,exactNullable]      , fn:({c, d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exactBad,exactNarrow]        , fn:({c, d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[narrow,exactBad]             , fn:({c, d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[narrow,exactNullable]        , fn:({c, d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[narrow,exactExactBad]        , fn:({c, d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exactNullable,exactBadNarrow], fn:({c, d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exactNarrow,exactNullable]   , fn:({c, d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exactExactBad,exactNullable] , fn:({c, d}): ExactBadNarrow => null as any})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; }; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; } | null; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; }; }[]; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; } | null; }[]; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; }; }[]; }'.
    lack of expected error at test line 16 'sample({source:$dataExact    , target:[exact,exactBadNarrow]        , fn:({c, d}): ExactBadNarrow => null as any})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: string; b: string; } | { a: number; b: string; } | null; }[]; }'.
    lack of expected error at test line 22 'sample({source:$dataExact    , target:[exactBad,exactNarrow]        , fn:({c, d}): ExactBadNarrow => null as any})'
    lack of expected error at test line 24 'sample({source:$dataExact    , target:[narrow,exactBad]             , fn:({c, d}): ExactBadNarrow => null as any})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; } | null; }[]; }'.
    lack of expected error at test line 28 'sample({source:$dataExact    , target:[narrow,exactExactBad]        , fn:({c, d}): ExactBadNarrow => null as any})'
    lack of expected error at test line 30 'sample({source:$dataExact    , target:[exactNullable,exactBadNarrow], fn:({c, d}): ExactBadNarrow => null as any})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; } | null; }[]; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; } | { a: string; b: string; } | null; }[]; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; }; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; } | null; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; }; }[]; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; } | null; }[]; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; }; }[]; }'.
    lack of expected error at test line 48 'sample({source:{c: $c, d: $d}, target:[exact,exactBadNarrow]        , fn:({c, d}): ExactBadNarrow => null as any})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: string; b: string; } | { a: number; b: string; } | null; }[]; }'.
    lack of expected error at test line 54 'sample({source:{c: $c, d: $d}, target:[exactBad,exactNarrow]        , fn:({c, d}): ExactBadNarrow => null as any})'
    lack of expected error at test line 56 'sample({source:{c: $c, d: $d}, target:[narrow,exactBad]             , fn:({c, d}): ExactBadNarrow => null as any})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; } | null; }[]; }'.
    lack of expected error at test line 60 'sample({source:{c: $c, d: $d}, target:[narrow,exactExactBad]        , fn:({c, d}): ExactBadNarrow => null as any})'
    lack of expected error at test line 62 'sample({source:{c: $c, d: $d}, target:[exactNullable,exactBadNarrow], fn:({c, d}): ExactBadNarrow => null as any})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; } | null; }[]; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; } | { a: string; b: string; } | null; }[]; }'.
    "
  `)
})
test('source exact / exact bad (should fail)', () => {
  //prettier-ignore
  {
    //@ts-expect-error
    sample({source:$dataExact    , target:exact                         , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:narrow                        , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:exactNullable                 , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:exactNarrow                   , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exact,exactBad]              , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exact,narrow]                , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exact,exactNullable]         , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exact,exactNarrow]           , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exact,exactBadNarrow]        , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exact,exactExactBad]         , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exactBad,exactNullable]      , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exactBad,exactNarrow]        , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[narrow,exactBad]             , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[narrow,exactNullable]        , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[narrow,exactBadNarrow]       , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[narrow,exactExactBad]        , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exactNullable,exactBadNarrow], fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exactNarrow,exactNullable]   , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exactNarrow,exactBadNarrow]  , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:$dataExact    , target:[exactExactBad,exactNullable] , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:exact                         , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:narrow                        , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:exactNullable                 , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:exactNarrow                   , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exact,exactBad]              , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exact,narrow]                , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exact,exactNullable]         , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exact,exactNarrow]           , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exact,exactBadNarrow]        , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exact,exactExactBad]         , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exactBad,exactNullable]      , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exactBad,exactNarrow]        , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[narrow,exactBad]             , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[narrow,exactNullable]        , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[narrow,exactBadNarrow]       , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[narrow,exactExactBad]        , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exactNullable,exactBadNarrow], fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exactNarrow,exactNullable]   , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exactNarrow,exactBadNarrow]  , fn:({c, d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:{c: $c, d: $d}, target:[exactExactBad,exactNullable] , fn:({c, d}): ExactExactBad => null as any})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; b: string; }; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; }; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; b: string; } | null; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; b: string; } | { a: number; }; }; }'.
    lack of expected error at test line 12 'sample({source:$dataExact    , target:[exact,exactBad]              , fn:({c, d}): ExactExactBad => null as any})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; }; }[]; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; b: string; } | null; }[]; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; }; }[]; }'.
    lack of expected error at test line 20 'sample({source:$dataExact    , target:[exact,exactBadNarrow]        , fn:({c, d}): ExactExactBad => null as any})'
    lack of expected error at test line 22 'sample({source:$dataExact    , target:[exact,exactExactBad]         , fn:({c, d}): ExactExactBad => null as any})'
    lack of expected error at test line 24 'sample({source:$dataExact    , target:[exactBad,exactNullable]      , fn:({c, d}): ExactExactBad => null as any})'
    lack of expected error at test line 26 'sample({source:$dataExact    , target:[exactBad,exactNarrow]        , fn:({c, d}): ExactExactBad => null as any})'
    lack of expected error at test line 28 'sample({source:$dataExact    , target:[narrow,exactBad]             , fn:({c, d}): ExactExactBad => null as any})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; } | null; }[]; }'.
    lack of expected error at test line 32 'sample({source:$dataExact    , target:[narrow,exactBadNarrow]       , fn:({c, d}): ExactExactBad => null as any})'
    lack of expected error at test line 34 'sample({source:$dataExact    , target:[narrow,exactExactBad]        , fn:({c, d}): ExactExactBad => null as any})'
    lack of expected error at test line 36 'sample({source:$dataExact    , target:[exactNullable,exactBadNarrow], fn:({c, d}): ExactExactBad => null as any})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; } | null; }[]; }'.
    lack of expected error at test line 40 'sample({source:$dataExact    , target:[exactNarrow,exactBadNarrow]  , fn:({c, d}): ExactExactBad => null as any})'
    lack of expected error at test line 42 'sample({source:$dataExact    , target:[exactExactBad,exactNullable] , fn:({c, d}): ExactExactBad => null as any})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; b: string; }; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; }; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; b: string; } | null; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; b: string; } | { a: number; }; }; }'.
    lack of expected error at test line 52 'sample({source:{c: $c, d: $d}, target:[exact,exactBad]              , fn:({c, d}): ExactExactBad => null as any})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; }; }[]; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; b: string; } | null; }[]; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; }; }[]; }'.
    lack of expected error at test line 60 'sample({source:{c: $c, d: $d}, target:[exact,exactBadNarrow]        , fn:({c, d}): ExactExactBad => null as any})'
    lack of expected error at test line 62 'sample({source:{c: $c, d: $d}, target:[exact,exactExactBad]         , fn:({c, d}): ExactExactBad => null as any})'
    lack of expected error at test line 64 'sample({source:{c: $c, d: $d}, target:[exactBad,exactNullable]      , fn:({c, d}): ExactExactBad => null as any})'
    lack of expected error at test line 66 'sample({source:{c: $c, d: $d}, target:[exactBad,exactNarrow]        , fn:({c, d}): ExactExactBad => null as any})'
    lack of expected error at test line 68 'sample({source:{c: $c, d: $d}, target:[narrow,exactBad]             , fn:({c, d}): ExactExactBad => null as any})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; } | null; }[]; }'.
    lack of expected error at test line 72 'sample({source:{c: $c, d: $d}, target:[narrow,exactBadNarrow]       , fn:({c, d}): ExactExactBad => null as any})'
    lack of expected error at test line 74 'sample({source:{c: $c, d: $d}, target:[narrow,exactExactBad]        , fn:({c, d}): ExactExactBad => null as any})'
    lack of expected error at test line 76 'sample({source:{c: $c, d: $d}, target:[exactNullable,exactBadNarrow], fn:({c, d}): ExactExactBad => null as any})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; } | null; }[]; }'.
    lack of expected error at test line 80 'sample({source:{c: $c, d: $d}, target:[exactNarrow,exactBadNarrow]  , fn:({c, d}): ExactExactBad => null as any})'
    lack of expected error at test line 82 'sample({source:{c: $c, d: $d}, target:[exactExactBad,exactNullable] , fn:({c, d}): ExactExactBad => null as any})'
    "
  `)
})
describe('source and clock exact', () => {
  test('source and clock exact (should pass)', () => {
    //prettier-ignore
    {
      sample({source:$dataSrc, clock:dataClock, target:exact                        , fn:({c}, {d}) => ({a: c, b: d})})
      sample({source:$dataSrc, clock:dataClock, target:exactNullable                , fn:({c}, {d}) => ({a: c, b: d})})
      sample({source:$dataSrc, clock:dataClock, target:exactNarrow                  , fn:({c}, {d}) => ({a: c, b: d})})
      sample({source:$dataSrc, clock:dataClock, target:exactExactBad                , fn:({c}, {d}) => ({a: c, b: d})})
      sample({source:$dataSrc, clock:dataClock, target:[exact,narrow]               , fn:({c}, {d}) => ({a: c, b: d})})
      sample({source:$dataSrc, clock:dataClock, target:[exact,exactNullable]        , fn:({c}, {d}) => ({a: c, b: d})})
      sample({source:$dataSrc, clock:dataClock, target:[exact,exactNarrow]          , fn:({c}, {d}) => ({a: c, b: d})})
      sample({source:$dataSrc, clock:dataClock, target:[exact,exactExactBad]        , fn:({c}, {d}) => ({a: c, b: d})})
      sample({source:$dataSrc, clock:dataClock, target:[narrow,exactNullable]       , fn:({c}, {d}) => ({a: c, b: d})})
      sample({source:$dataSrc, clock:dataClock, target:[narrow,exactExactBad]       , fn:({c}, {d}) => ({a: c, b: d})})
      sample({source:$dataSrc, clock:dataClock, target:[exactNarrow,exactNullable]  , fn:({c}, {d}) => ({a: c, b: d})})
      sample({source:$dataSrc, clock:dataClock, target:[exactExactBad,exactNullable], fn:({c}, {d}) => ({a: c, b: d})})
      sample({source:{c: $c} , clock:dataClock, target:exact                        , fn:({c}, {d}) => ({a: c, b: d})})
      sample({source:{c: $c} , clock:dataClock, target:exactNullable                , fn:({c}, {d}) => ({a: c, b: d})})
      sample({source:{c: $c} , clock:dataClock, target:exactNarrow                  , fn:({c}, {d}) => ({a: c, b: d})})
      sample({source:{c: $c} , clock:dataClock, target:exactExactBad                , fn:({c}, {d}) => ({a: c, b: d})})
      sample({source:{c: $c} , clock:dataClock, target:[exact,narrow]               , fn:({c}, {d}) => ({a: c, b: d})})
      sample({source:{c: $c} , clock:dataClock, target:[exact,exactNullable]        , fn:({c}, {d}) => ({a: c, b: d})})
      sample({source:{c: $c} , clock:dataClock, target:[exact,exactNarrow]          , fn:({c}, {d}) => ({a: c, b: d})})
      sample({source:{c: $c} , clock:dataClock, target:[exact,exactExactBad]        , fn:({c}, {d}) => ({a: c, b: d})})
      sample({source:{c: $c} , clock:dataClock, target:[narrow,exactNullable]       , fn:({c}, {d}) => ({a: c, b: d})})
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
        target: exactBad,
        fn: ({c}, {d}) => ({a: c, b: d}),
      })
      //@ts-expect-error
      sample({source:$dataSrc, clock:dataClock, target:narrow, fn:({c}, {d}) => ({a: c, b: d})})
      sample({
        source: $dataSrc,
        clock: dataClock,
        //@ts-expect-error
        target: exactBadNarrow,
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
          exactNullable,
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
          exactBad,
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
        target: exactBad,
        fn: ({c}, {d}) => ({a: c, b: d}),
      })
      //@ts-expect-error
      sample({source:{c: $c} , clock:dataClock, target:narrow, fn:({c}, {d}) => ({a: c, b: d})})
      sample({
        source: {c: $c},
        clock: dataClock,
        //@ts-expect-error
        target: exactBadNarrow,
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
          exactNullable,
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
          exactBad,
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
      Unmarked error at test line 4 'source: $dataSrc,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: { a: string; b: string; }; }; }'.
      Unmarked error at test line 131 'source: {c: $c},'
      lack of expected error at test line 7 'target: exactBad,'
      lack of expected error at test line 11 'sample({source:$dataSrc, clock:dataClock, target:narrow, fn:({c}, {d}) => ({a: c, b: d})})'
      lack of expected error at test line 16 'target: exactBadNarrow,'
      lack of expected error at test line 25 'exactBad,'
      lack of expected error at test line 35 'exactBadNarrow,'
      lack of expected error at test line 44 'exactBad,'
      lack of expected error at test line 54 'exactBad,'
      lack of expected error at test line 64 'exactBad,'
      lack of expected error at test line 66 'exactBadNarrow,'
      lack of expected error at test line 75 'exactBad,'
      lack of expected error at test line 86 'exactBad,'
      lack of expected error at test line 96 'exactBadNarrow,'
      lack of expected error at test line 106 'exactBadNarrow,'
      lack of expected error at test line 116 'exactBadNarrow,'
      lack of expected error at test line 126 'exactBadNarrow,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: { a: string; b: string; }; }; }'.
      lack of expected error at test line 134 'target: exactBad,'
      lack of expected error at test line 138 'sample({source:{c: $c} , clock:dataClock, target:narrow, fn:({c}, {d}) => ({a: c, b: d})})'
      lack of expected error at test line 143 'target: exactBadNarrow,'
      lack of expected error at test line 152 'exactBad,'
      lack of expected error at test line 162 'exactBadNarrow,'
      lack of expected error at test line 171 'exactBad,'
      lack of expected error at test line 181 'exactBad,'
      lack of expected error at test line 191 'exactBad,'
      lack of expected error at test line 193 'exactBadNarrow,'
      lack of expected error at test line 202 'exactBad,'
      lack of expected error at test line 213 'exactBad,'
      lack of expected error at test line 223 'exactBadNarrow,'
      lack of expected error at test line 233 'exactBadNarrow,'
      lack of expected error at test line 243 'exactBadNarrow,'
      lack of expected error at test line 253 'exactBadNarrow,'
      "
    `)
  })
})
test('source and clock exact bad (should fail)', () => {
  //prettier-ignore
  {
    sample({
      source: $dataSrc,
      clock: dataClock,
      //@ts-expect-error
      target: exact,
      fn: (_, {d}) => ({a: "no", b: d}),
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      //@ts-expect-error
      target: narrow,
      fn: (_, {d}) => ({a: "no", b: d}),
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      //@ts-expect-error
      target: exactNullable,
      fn: (_, {d}) => ({a: "no", b: d}),
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      //@ts-expect-error
      target: exactNarrow,
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
        exactBad,
      ],
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
      fn: (_, {d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      //@ts-expect-error
      target: exact,
      fn: (_, {d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      //@ts-expect-error
      target: narrow,
      fn: (_, {d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      //@ts-expect-error
      target: exactNullable,
      fn: (_, {d}) => ({a: "no", b: d}),
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      //@ts-expect-error
      target: exactNarrow,
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
        exactBad,
      ],
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
      fn: (_, {d}) => ({a: "no", b: d}),
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 4 'source: $dataSrc,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; b: string; }; }; }'.
    Unmarked error at test line 11 'source: $dataSrc,'
    lack of expected error at test line 7 'target: exact,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; }; }; }'.
    Unmarked error at test line 18 'source: $dataSrc,'
    lack of expected error at test line 14 'target: narrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; b: string; } | null; }; }'.
    Unmarked error at test line 25 'source: $dataSrc,'
    lack of expected error at test line 21 'target: exactNullable,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; b: string; } | { a: number; }; }; }'.
    Unmarked error at test line 42 'source: $dataSrc,'
    lack of expected error at test line 28 'target: exactNarrow,'
    lack of expected error at test line 36 'exact,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 53 'source: $dataSrc,'
    lack of expected error at test line 46 'exact,'
    lack of expected error at test line 48 'narrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; b: string; } | null; }[]; }'.
    Unmarked error at test line 64 'source: $dataSrc,'
    lack of expected error at test line 57 'exact,'
    lack of expected error at test line 59 'exactNullable,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 125 'source: $dataSrc,'
    lack of expected error at test line 68 'exact,'
    lack of expected error at test line 70 'exactNarrow,'
    lack of expected error at test line 79 'exact,'
    lack of expected error at test line 89 'exact,'
    lack of expected error at test line 100 'exactNullable,'
    lack of expected error at test line 110 'exactNarrow,'
    lack of expected error at test line 119 'narrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; } | null; }[]; }'.
    Unmarked error at test line 166 'source: $dataSrc,'
    lack of expected error at test line 129 'narrow,'
    lack of expected error at test line 131 'exactNullable,'
    lack of expected error at test line 140 'narrow,'
    lack of expected error at test line 150 'narrow,'
    lack of expected error at test line 160 'exactNullable,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; } | null; }[]; }'.
    Unmarked error at test line 197 'source: {c: $c},'
    lack of expected error at test line 170 'exactNarrow,'
    lack of expected error at test line 172 'exactNullable,'
    lack of expected error at test line 181 'exactNarrow,'
    lack of expected error at test line 192 'exactNullable,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; b: string; }; }; }'.
    Unmarked error at test line 204 'source: {c: $c},'
    lack of expected error at test line 200 'target: exact,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; }; }; }'.
    Unmarked error at test line 211 'source: {c: $c},'
    lack of expected error at test line 207 'target: narrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; b: string; } | null; }; }'.
    Unmarked error at test line 218 'source: {c: $c},'
    lack of expected error at test line 214 'target: exactNullable,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; b: string; } | { a: number; }; }; }'.
    Unmarked error at test line 235 'source: {c: $c},'
    lack of expected error at test line 221 'target: exactNarrow,'
    lack of expected error at test line 229 'exact,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 246 'source: {c: $c},'
    lack of expected error at test line 239 'exact,'
    lack of expected error at test line 241 'narrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; b: string; } | null; }[]; }'.
    Unmarked error at test line 257 'source: {c: $c},'
    lack of expected error at test line 250 'exact,'
    lack of expected error at test line 252 'exactNullable,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 318 'source: {c: $c},'
    lack of expected error at test line 261 'exact,'
    lack of expected error at test line 263 'exactNarrow,'
    lack of expected error at test line 272 'exact,'
    lack of expected error at test line 282 'exact,'
    lack of expected error at test line 293 'exactNullable,'
    lack of expected error at test line 303 'exactNarrow,'
    lack of expected error at test line 312 'narrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; } | null; }[]; }'.
    Unmarked error at test line 359 'source: {c: $c},'
    lack of expected error at test line 322 'narrow,'
    lack of expected error at test line 324 'exactNullable,'
    lack of expected error at test line 333 'narrow,'
    lack of expected error at test line 343 'narrow,'
    lack of expected error at test line 353 'exactNullable,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; b: string; }; targetType: { a: number; } | null; }[]; }'.
    lack of expected error at test line 363 'exactNarrow,'
    lack of expected error at test line 365 'exactNullable,'
    lack of expected error at test line 374 'exactNarrow,'
    lack of expected error at test line 385 'exactNullable,'
    "
  `)
})
test('source and clock narrow (should fail)', () => {
  //prettier-ignore
  {
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:exact                         , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:exactBad                      , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:exactNullable                 , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:exactExactBad                 , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exact,exactBad]              , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exact,narrow]                , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exact,exactNullable]         , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exact,exactNarrow]           , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exact,exactBadNarrow]        , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exact,exactExactBad]         , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exactBad,exactNullable]      , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exactBad,exactNarrow]        , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exactBad,exactBadNarrow]     , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exactBad,exactExactBad]      , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[narrow,exactBad]             , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[narrow,exactNullable]        , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[narrow,exactExactBad]        , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exactNullable,exactBadNarrow], fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exactNarrow,exactNullable]   , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exactExactBad,exactNullable] , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exactExactBad,exactBadNarrow], fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:exact                         , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:exactBad                      , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:exactNullable                 , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:exactExactBad                 , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exact,exactBad]              , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exact,narrow]                , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exact,exactNullable]         , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exact,exactNarrow]           , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exact,exactBadNarrow]        , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exact,exactExactBad]         , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exactBad,exactNullable]      , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exactBad,exactNarrow]        , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exactBad,exactBadNarrow]     , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exactBad,exactExactBad]      , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[narrow,exactBad]             , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[narrow,exactNullable]        , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[narrow,exactExactBad]        , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exactNullable,exactBadNarrow], fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exactNarrow,exactNullable]   , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exactExactBad,exactNullable] , fn:({c}) => ({a: c})})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exactExactBad,exactBadNarrow], fn:({c}) => ({a: c})})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; }; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: string; b: string; }; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | null; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | { a: string; b: string; }; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    lack of expected error at test line 14 'sample({source:$dataSrc, clock:dataClock, target:[exact,narrow]                , fn:({c}) => ({a: c})})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | null; }[]; }'.
    lack of expected error at test line 18 'sample({source:$dataSrc, clock:dataClock, target:[exact,exactNarrow]           , fn:({c}) => ({a: c})})'
    lack of expected error at test line 20 'sample({source:$dataSrc, clock:dataClock, target:[exact,exactBadNarrow]        , fn:({c}) => ({a: c})})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: string; b: string; } | { a: number; b: string; } | null; }[]; }'.
    lack of expected error at test line 26 'sample({source:$dataSrc, clock:dataClock, target:[exactBad,exactNarrow]        , fn:({c}) => ({a: c})})'
    lack of expected error at test line 28 'sample({source:$dataSrc, clock:dataClock, target:[exactBad,exactBadNarrow]     , fn:({c}) => ({a: c})})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: string; b: string; } | { a: number; b: string; }; }[]; }'.
    lack of expected error at test line 32 'sample({source:$dataSrc, clock:dataClock, target:[narrow,exactBad]             , fn:({c}) => ({a: c})})'
    lack of expected error at test line 34 'sample({source:$dataSrc, clock:dataClock, target:[narrow,exactNullable]        , fn:({c}) => ({a: c})})'
    lack of expected error at test line 36 'sample({source:$dataSrc, clock:dataClock, target:[narrow,exactExactBad]        , fn:({c}) => ({a: c})})'
    lack of expected error at test line 38 'sample({source:$dataSrc, clock:dataClock, target:[exactNullable,exactBadNarrow], fn:({c}) => ({a: c})})'
    lack of expected error at test line 40 'sample({source:$dataSrc, clock:dataClock, target:[exactNarrow,exactNullable]   , fn:({c}) => ({a: c})})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | { a: string; b: string; } | null; }[]; }'.
    lack of expected error at test line 44 'sample({source:$dataSrc, clock:dataClock, target:[exactExactBad,exactBadNarrow], fn:({c}) => ({a: c})})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; }; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: string; b: string; }; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | null; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | { a: string; b: string; }; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    lack of expected error at test line 56 'sample({source:{c: $c} , clock:dataClock, target:[exact,narrow]                , fn:({c}) => ({a: c})})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | null; }[]; }'.
    lack of expected error at test line 60 'sample({source:{c: $c} , clock:dataClock, target:[exact,exactNarrow]           , fn:({c}) => ({a: c})})'
    lack of expected error at test line 62 'sample({source:{c: $c} , clock:dataClock, target:[exact,exactBadNarrow]        , fn:({c}) => ({a: c})})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: string; b: string; } | { a: number; b: string; } | null; }[]; }'.
    lack of expected error at test line 68 'sample({source:{c: $c} , clock:dataClock, target:[exactBad,exactNarrow]        , fn:({c}) => ({a: c})})'
    lack of expected error at test line 70 'sample({source:{c: $c} , clock:dataClock, target:[exactBad,exactBadNarrow]     , fn:({c}) => ({a: c})})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: string; b: string; } | { a: number; b: string; }; }[]; }'.
    lack of expected error at test line 74 'sample({source:{c: $c} , clock:dataClock, target:[narrow,exactBad]             , fn:({c}) => ({a: c})})'
    lack of expected error at test line 76 'sample({source:{c: $c} , clock:dataClock, target:[narrow,exactNullable]        , fn:({c}) => ({a: c})})'
    lack of expected error at test line 78 'sample({source:{c: $c} , clock:dataClock, target:[narrow,exactExactBad]        , fn:({c}) => ({a: c})})'
    lack of expected error at test line 80 'sample({source:{c: $c} , clock:dataClock, target:[exactNullable,exactBadNarrow], fn:({c}) => ({a: c})})'
    lack of expected error at test line 82 'sample({source:{c: $c} , clock:dataClock, target:[exactNarrow,exactNullable]   , fn:({c}) => ({a: c})})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; }; targetType: { a: number; b: string; } | { a: string; b: string; } | null; }[]; }'.
    lack of expected error at test line 86 'sample({source:{c: $c} , clock:dataClock, target:[exactExactBad,exactBadNarrow], fn:({c}) => ({a: c})})'
    "
  `)
})
test('source and clock exact nullable (should fail)', () => {
  //prettier-ignore
  {
    sample({
      source: $dataSrc,
      clock: dataClock,
      //@ts-expect-error
      target: exact,
      fn: ({c}, {d}): ExactNullable => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      //@ts-expect-error
      target: exactBad,
      fn: ({c}, {d}): ExactNullable => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      //@ts-expect-error
      target: narrow,
      fn: ({c}, {d}): ExactNullable => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      //@ts-expect-error
      target: exactNarrow,
      fn: ({c}, {d}): ExactNullable => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      //@ts-expect-error
      target: exactBadNarrow,
      fn: ({c}, {d}): ExactNullable => null as any,
    })
    sample({
      source: $dataSrc,
      clock: dataClock,
      //@ts-expect-error
      target: exactExactBad,
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
      fn: ({c}, {d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      //@ts-expect-error
      target: exact,
      fn: ({c}, {d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      //@ts-expect-error
      target: exactBad,
      fn: ({c}, {d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      //@ts-expect-error
      target: narrow,
      fn: ({c}, {d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      //@ts-expect-error
      target: exactNarrow,
      fn: ({c}, {d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      //@ts-expect-error
      target: exactBadNarrow,
      fn: ({c}, {d}): ExactNullable => null as any,
    })
    sample({
      source: {c: $c},
      clock: dataClock,
      //@ts-expect-error
      target: exactExactBad,
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
      fn: ({c}, {d}): ExactNullable => null as any,
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 4 'source: $dataSrc,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; b: string; }; }; }'.
    Unmarked error at test line 11 'source: $dataSrc,'
    lack of expected error at test line 7 'target: exact,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; }; }; }'.
    Unmarked error at test line 18 'source: $dataSrc,'
    lack of expected error at test line 14 'target: exactBad,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; }; }; }'.
    Unmarked error at test line 25 'source: $dataSrc,'
    lack of expected error at test line 21 'target: narrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; b: string; } | { a: number; }; }; }'.
    Unmarked error at test line 32 'source: $dataSrc,'
    lack of expected error at test line 28 'target: exactNarrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; }; }; }'.
    Unmarked error at test line 39 'source: $dataSrc,'
    lack of expected error at test line 35 'target: exactBadNarrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; b: string; } | { a: string; b: string; }; }; }'.
    Unmarked error at test line 46 'source: $dataSrc,'
    lack of expected error at test line 42 'target: exactExactBad,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 57 'source: $dataSrc,'
    lack of expected error at test line 50 'exact,'
    lack of expected error at test line 52 'exactBad,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 78 'source: $dataSrc,'
    lack of expected error at test line 61 'exact,'
    lack of expected error at test line 63 'narrow,'
    lack of expected error at test line 72 'exact,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 89 'source: $dataSrc,'
    lack of expected error at test line 82 'exact,'
    lack of expected error at test line 84 'exactNarrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; }; }[]; }'.
    Unmarked error at test line 100 'source: $dataSrc,'
    lack of expected error at test line 93 'exact,'
    lack of expected error at test line 95 'exactBadNarrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 121 'source: $dataSrc,'
    lack of expected error at test line 104 'exact,'
    lack of expected error at test line 106 'exactExactBad,'
    lack of expected error at test line 115 'exactBad,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; }; }[]; }'.
    Unmarked error at test line 132 'source: $dataSrc,'
    lack of expected error at test line 125 'exactBad,'
    lack of expected error at test line 127 'exactNarrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; }; }[]; }'.
    Unmarked error at test line 143 'source: $dataSrc,'
    lack of expected error at test line 136 'exactBad,'
    lack of expected error at test line 138 'exactBadNarrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; b: string; }; }[]; }'.
    Unmarked error at test line 154 'source: $dataSrc,'
    lack of expected error at test line 147 'exactBad,'
    lack of expected error at test line 149 'exactExactBad,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; }; }[]; }'.
    Unmarked error at test line 175 'source: $dataSrc,'
    lack of expected error at test line 158 'narrow,'
    lack of expected error at test line 160 'exactBad,'
    lack of expected error at test line 169 'narrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 186 'source: $dataSrc,'
    lack of expected error at test line 179 'narrow,'
    lack of expected error at test line 181 'exactBadNarrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 217 'source: $dataSrc,'
    lack of expected error at test line 190 'narrow,'
    lack of expected error at test line 192 'exactExactBad,'
    lack of expected error at test line 202 'exactBadNarrow,'
    lack of expected error at test line 211 'exactNarrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 238 'source: $dataSrc,'
    lack of expected error at test line 221 'exactNarrow,'
    lack of expected error at test line 223 'exactBadNarrow,'
    lack of expected error at test line 232 'exactExactBad,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; }; }[]; }'.
    Unmarked error at test line 249 'source: {c: $c},'
    lack of expected error at test line 242 'exactExactBad,'
    lack of expected error at test line 244 'exactBadNarrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; b: string; }; }; }'.
    Unmarked error at test line 256 'source: {c: $c},'
    lack of expected error at test line 252 'target: exact,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; }; }; }'.
    Unmarked error at test line 263 'source: {c: $c},'
    lack of expected error at test line 259 'target: exactBad,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; }; }; }'.
    Unmarked error at test line 270 'source: {c: $c},'
    lack of expected error at test line 266 'target: narrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; b: string; } | { a: number; }; }; }'.
    Unmarked error at test line 277 'source: {c: $c},'
    lack of expected error at test line 273 'target: exactNarrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; }; }; }'.
    Unmarked error at test line 284 'source: {c: $c},'
    lack of expected error at test line 280 'target: exactBadNarrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; b: string; } | { a: string; b: string; }; }; }'.
    Unmarked error at test line 291 'source: {c: $c},'
    lack of expected error at test line 287 'target: exactExactBad,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 302 'source: {c: $c},'
    lack of expected error at test line 295 'exact,'
    lack of expected error at test line 297 'exactBad,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 323 'source: {c: $c},'
    lack of expected error at test line 306 'exact,'
    lack of expected error at test line 308 'narrow,'
    lack of expected error at test line 317 'exact,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; }; }[]; }'.
    Unmarked error at test line 334 'source: {c: $c},'
    lack of expected error at test line 327 'exact,'
    lack of expected error at test line 329 'exactNarrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; }; }[]; }'.
    Unmarked error at test line 345 'source: {c: $c},'
    lack of expected error at test line 338 'exact,'
    lack of expected error at test line 340 'exactBadNarrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 366 'source: {c: $c},'
    lack of expected error at test line 349 'exact,'
    lack of expected error at test line 351 'exactExactBad,'
    lack of expected error at test line 360 'exactBad,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; }; }[]; }'.
    Unmarked error at test line 377 'source: {c: $c},'
    lack of expected error at test line 370 'exactBad,'
    lack of expected error at test line 372 'exactNarrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; }; }[]; }'.
    Unmarked error at test line 388 'source: {c: $c},'
    lack of expected error at test line 381 'exactBad,'
    lack of expected error at test line 383 'exactBadNarrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; b: string; }; }[]; }'.
    Unmarked error at test line 399 'source: {c: $c},'
    lack of expected error at test line 392 'exactBad,'
    lack of expected error at test line 394 'exactExactBad,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; }; }[]; }'.
    Unmarked error at test line 420 'source: {c: $c},'
    lack of expected error at test line 403 'narrow,'
    lack of expected error at test line 405 'exactBad,'
    lack of expected error at test line 414 'narrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 431 'source: {c: $c},'
    lack of expected error at test line 424 'narrow,'
    lack of expected error at test line 426 'exactBadNarrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 462 'source: {c: $c},'
    lack of expected error at test line 435 'narrow,'
    lack of expected error at test line 437 'exactExactBad,'
    lack of expected error at test line 447 'exactBadNarrow,'
    lack of expected error at test line 456 'exactNarrow,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: number; } | { a: string; b: string; }; }[]; }'.
    Unmarked error at test line 483 'source: {c: $c},'
    lack of expected error at test line 466 'exactNarrow,'
    lack of expected error at test line 468 'exactBadNarrow,'
    lack of expected error at test line 477 'exactExactBad,'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNullable; targetType: { a: string; b: string; } | { a: number; }; }[]; }'.
    lack of expected error at test line 487 'exactExactBad,'
    lack of expected error at test line 489 'exactBadNarrow,'
    "
  `)
})
test('source and clock exact / narrow (should fail)', () => {
  //prettier-ignore
  {
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:exact                         , fn:({c}, {d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:exactBad                      , fn:({c}, {d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:exactNullable                 , fn:({c}, {d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:exactExactBad                 , fn:({c}, {d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exact,exactBad]              , fn:({c}, {d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exact,narrow]                , fn:({c}, {d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exact,exactNullable]         , fn:({c}, {d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exact,exactNarrow]           , fn:({c}, {d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exact,exactBadNarrow]        , fn:({c}, {d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exact,exactExactBad]         , fn:({c}, {d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exactBad,exactNullable]      , fn:({c}, {d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exactBad,exactNarrow]        , fn:({c}, {d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exactBad,exactBadNarrow]     , fn:({c}, {d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exactBad,exactExactBad]      , fn:({c}, {d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[narrow,exactBad]             , fn:({c}, {d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[narrow,exactNullable]        , fn:({c}, {d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[narrow,exactExactBad]        , fn:({c}, {d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exactNullable,exactBadNarrow], fn:({c}, {d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exactNarrow,exactNullable]   , fn:({c}, {d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exactExactBad,exactNullable] , fn:({c}, {d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exactExactBad,exactBadNarrow], fn:({c}, {d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:exact                         , fn:({c}, {d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:exactBad                      , fn:({c}, {d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:exactNullable                 , fn:({c}, {d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:exactExactBad                 , fn:({c}, {d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exact,exactBad]              , fn:({c}, {d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exact,narrow]                , fn:({c}, {d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exact,exactNullable]         , fn:({c}, {d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exact,exactNarrow]           , fn:({c}, {d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exact,exactBadNarrow]        , fn:({c}, {d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exact,exactExactBad]         , fn:({c}, {d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exactBad,exactNullable]      , fn:({c}, {d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exactBad,exactNarrow]        , fn:({c}, {d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exactBad,exactBadNarrow]     , fn:({c}, {d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exactBad,exactExactBad]      , fn:({c}, {d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[narrow,exactBad]             , fn:({c}, {d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[narrow,exactNullable]        , fn:({c}, {d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[narrow,exactExactBad]        , fn:({c}, {d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exactNullable,exactBadNarrow], fn:({c}, {d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exactNarrow,exactNullable]   , fn:({c}, {d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exactExactBad,exactNullable] , fn:({c}, {d}): ExactNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exactExactBad,exactBadNarrow], fn:({c}, {d}): ExactNarrow => null as any})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; }; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: string; b: string; }; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | null; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | { a: string; b: string; }; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    lack of expected error at test line 14 'sample({source:$dataSrc, clock:dataClock, target:[exact,narrow]                , fn:({c}, {d}): ExactNarrow => null as any})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | null; }[]; }'.
    lack of expected error at test line 18 'sample({source:$dataSrc, clock:dataClock, target:[exact,exactNarrow]           , fn:({c}, {d}): ExactNarrow => null as any})'
    lack of expected error at test line 20 'sample({source:$dataSrc, clock:dataClock, target:[exact,exactBadNarrow]        , fn:({c}, {d}): ExactNarrow => null as any})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: string; b: string; } | { a: number; b: string; } | null; }[]; }'.
    lack of expected error at test line 26 'sample({source:$dataSrc, clock:dataClock, target:[exactBad,exactNarrow]        , fn:({c}, {d}): ExactNarrow => null as any})'
    lack of expected error at test line 28 'sample({source:$dataSrc, clock:dataClock, target:[exactBad,exactBadNarrow]     , fn:({c}, {d}): ExactNarrow => null as any})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: string; b: string; } | { a: number; b: string; }; }[]; }'.
    lack of expected error at test line 32 'sample({source:$dataSrc, clock:dataClock, target:[narrow,exactBad]             , fn:({c}, {d}): ExactNarrow => null as any})'
    lack of expected error at test line 34 'sample({source:$dataSrc, clock:dataClock, target:[narrow,exactNullable]        , fn:({c}, {d}): ExactNarrow => null as any})'
    lack of expected error at test line 36 'sample({source:$dataSrc, clock:dataClock, target:[narrow,exactExactBad]        , fn:({c}, {d}): ExactNarrow => null as any})'
    lack of expected error at test line 38 'sample({source:$dataSrc, clock:dataClock, target:[exactNullable,exactBadNarrow], fn:({c}, {d}): ExactNarrow => null as any})'
    lack of expected error at test line 40 'sample({source:$dataSrc, clock:dataClock, target:[exactNarrow,exactNullable]   , fn:({c}, {d}): ExactNarrow => null as any})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | { a: string; b: string; } | null; }[]; }'.
    lack of expected error at test line 44 'sample({source:$dataSrc, clock:dataClock, target:[exactExactBad,exactBadNarrow], fn:({c}, {d}): ExactNarrow => null as any})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; }; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: string; b: string; }; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | null; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | { a: string; b: string; }; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    lack of expected error at test line 56 'sample({source:{c: $c} , clock:dataClock, target:[exact,narrow]                , fn:({c}, {d}): ExactNarrow => null as any})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | null; }[]; }'.
    lack of expected error at test line 60 'sample({source:{c: $c} , clock:dataClock, target:[exact,exactNarrow]           , fn:({c}, {d}): ExactNarrow => null as any})'
    lack of expected error at test line 62 'sample({source:{c: $c} , clock:dataClock, target:[exact,exactBadNarrow]        , fn:({c}, {d}): ExactNarrow => null as any})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: string; b: string; } | { a: number; b: string; } | null; }[]; }'.
    lack of expected error at test line 68 'sample({source:{c: $c} , clock:dataClock, target:[exactBad,exactNarrow]        , fn:({c}, {d}): ExactNarrow => null as any})'
    lack of expected error at test line 70 'sample({source:{c: $c} , clock:dataClock, target:[exactBad,exactBadNarrow]     , fn:({c}, {d}): ExactNarrow => null as any})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: string; b: string; } | { a: number; b: string; }; }[]; }'.
    lack of expected error at test line 74 'sample({source:{c: $c} , clock:dataClock, target:[narrow,exactBad]             , fn:({c}, {d}): ExactNarrow => null as any})'
    lack of expected error at test line 76 'sample({source:{c: $c} , clock:dataClock, target:[narrow,exactNullable]        , fn:({c}, {d}): ExactNarrow => null as any})'
    lack of expected error at test line 78 'sample({source:{c: $c} , clock:dataClock, target:[narrow,exactExactBad]        , fn:({c}, {d}): ExactNarrow => null as any})'
    lack of expected error at test line 80 'sample({source:{c: $c} , clock:dataClock, target:[exactNullable,exactBadNarrow], fn:({c}, {d}): ExactNarrow => null as any})'
    lack of expected error at test line 82 'sample({source:{c: $c} , clock:dataClock, target:[exactNarrow,exactNullable]   , fn:({c}, {d}): ExactNarrow => null as any})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactNarrow; targetType: { a: number; b: string; } | { a: string; b: string; } | null; }[]; }'.
    lack of expected error at test line 86 'sample({source:{c: $c} , clock:dataClock, target:[exactExactBad,exactBadNarrow], fn:({c}, {d}): ExactNarrow => null as any})'
    "
  `)
})
test('source and clock exact bad / narrow (should fail)', () => {
  //prettier-ignore
  {
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:exact                         , fn:({c}, {d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:exactNullable                 , fn:({c}, {d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exact,exactBad]              , fn:({c}, {d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exact,narrow]                , fn:({c}, {d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exact,exactNullable]         , fn:({c}, {d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exact,exactNarrow]           , fn:({c}, {d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exact,exactBadNarrow]        , fn:({c}, {d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exact,exactExactBad]         , fn:({c}, {d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exactBad,exactNullable]      , fn:({c}, {d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exactBad,exactNarrow]        , fn:({c}, {d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[narrow,exactBad]             , fn:({c}, {d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[narrow,exactNullable]        , fn:({c}, {d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[narrow,exactExactBad]        , fn:({c}, {d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exactNullable,exactBadNarrow], fn:({c}, {d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exactNarrow,exactNullable]   , fn:({c}, {d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exactExactBad,exactNullable] , fn:({c}, {d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:exact                         , fn:({c}, {d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:exactNullable                 , fn:({c}, {d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exact,exactBad]              , fn:({c}, {d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exact,narrow]                , fn:({c}, {d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exact,exactNullable]         , fn:({c}, {d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exact,exactNarrow]           , fn:({c}, {d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exact,exactBadNarrow]        , fn:({c}, {d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exact,exactExactBad]         , fn:({c}, {d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exactBad,exactNullable]      , fn:({c}, {d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exactBad,exactNarrow]        , fn:({c}, {d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[narrow,exactBad]             , fn:({c}, {d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[narrow,exactNullable]        , fn:({c}, {d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[narrow,exactExactBad]        , fn:({c}, {d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exactNullable,exactBadNarrow], fn:({c}, {d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exactNarrow,exactNullable]   , fn:({c}, {d}): ExactBadNarrow => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exactExactBad,exactNullable] , fn:({c}, {d}): ExactBadNarrow => null as any})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; }; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; } | null; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; }; }[]; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; } | null; }[]; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; }; }[]; }'.
    lack of expected error at test line 16 'sample({source:$dataSrc, clock:dataClock, target:[exact,exactBadNarrow]        , fn:({c}, {d}): ExactBadNarrow => null as any})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: string; b: string; } | { a: number; b: string; } | null; }[]; }'.
    lack of expected error at test line 22 'sample({source:$dataSrc, clock:dataClock, target:[exactBad,exactNarrow]        , fn:({c}, {d}): ExactBadNarrow => null as any})'
    lack of expected error at test line 24 'sample({source:$dataSrc, clock:dataClock, target:[narrow,exactBad]             , fn:({c}, {d}): ExactBadNarrow => null as any})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; } | null; }[]; }'.
    lack of expected error at test line 28 'sample({source:$dataSrc, clock:dataClock, target:[narrow,exactExactBad]        , fn:({c}, {d}): ExactBadNarrow => null as any})'
    lack of expected error at test line 30 'sample({source:$dataSrc, clock:dataClock, target:[exactNullable,exactBadNarrow], fn:({c}, {d}): ExactBadNarrow => null as any})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; } | null; }[]; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; } | { a: string; b: string; } | null; }[]; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; }; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; } | null; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; }; }[]; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; } | null; }[]; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; }; }[]; }'.
    lack of expected error at test line 48 'sample({source:{c: $c} , clock:dataClock, target:[exact,exactBadNarrow]        , fn:({c}, {d}): ExactBadNarrow => null as any})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; } | { a: string; b: string; }; }[]; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: string; b: string; } | { a: number; b: string; } | null; }[]; }'.
    lack of expected error at test line 54 'sample({source:{c: $c} , clock:dataClock, target:[exactBad,exactNarrow]        , fn:({c}, {d}): ExactBadNarrow => null as any})'
    lack of expected error at test line 56 'sample({source:{c: $c} , clock:dataClock, target:[narrow,exactBad]             , fn:({c}, {d}): ExactBadNarrow => null as any})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; } | null; }[]; }'.
    lack of expected error at test line 60 'sample({source:{c: $c} , clock:dataClock, target:[narrow,exactExactBad]        , fn:({c}, {d}): ExactBadNarrow => null as any})'
    lack of expected error at test line 62 'sample({source:{c: $c} , clock:dataClock, target:[exactNullable,exactBadNarrow], fn:({c}, {d}): ExactBadNarrow => null as any})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; } | null; }[]; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactBadNarrow; targetType: { a: number; b: string; } | { a: string; b: string; } | null; }[]; }'.
    "
  `)
})
test('source and clock exact / exact bad (should fail)', () => {
  //prettier-ignore
  {
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:exact                         , fn:({c}, {d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:narrow                        , fn:({c}, {d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:exactNullable                 , fn:({c}, {d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:exactNarrow                   , fn:({c}, {d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exact,exactBad]              , fn:({c}, {d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exact,narrow]                , fn:({c}, {d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exact,exactNullable]         , fn:({c}, {d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exact,exactNarrow]           , fn:({c}, {d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exact,exactBadNarrow]        , fn:({c}, {d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exact,exactExactBad]         , fn:({c}, {d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exactBad,exactNullable]      , fn:({c}, {d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exactBad,exactNarrow]        , fn:({c}, {d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[narrow,exactBad]             , fn:({c}, {d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[narrow,exactNullable]        , fn:({c}, {d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[narrow,exactBadNarrow]       , fn:({c}, {d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[narrow,exactExactBad]        , fn:({c}, {d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exactNullable,exactBadNarrow], fn:({c}, {d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exactNarrow,exactNullable]   , fn:({c}, {d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exactNarrow,exactBadNarrow]  , fn:({c}, {d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:$dataSrc, clock:dataClock, target:[exactExactBad,exactNullable] , fn:({c}, {d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:exact                         , fn:({c}, {d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:narrow                        , fn:({c}, {d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:exactNullable                 , fn:({c}, {d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:exactNarrow                   , fn:({c}, {d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exact,exactBad]              , fn:({c}, {d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exact,narrow]                , fn:({c}, {d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exact,exactNullable]         , fn:({c}, {d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exact,exactNarrow]           , fn:({c}, {d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exact,exactBadNarrow]        , fn:({c}, {d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exact,exactExactBad]         , fn:({c}, {d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exactBad,exactNullable]      , fn:({c}, {d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exactBad,exactNarrow]        , fn:({c}, {d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[narrow,exactBad]             , fn:({c}, {d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[narrow,exactNullable]        , fn:({c}, {d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[narrow,exactBadNarrow]       , fn:({c}, {d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[narrow,exactExactBad]        , fn:({c}, {d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exactNullable,exactBadNarrow], fn:({c}, {d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exactNarrow,exactNullable]   , fn:({c}, {d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exactNarrow,exactBadNarrow]  , fn:({c}, {d}): ExactExactBad => null as any})
    //@ts-expect-error
    sample({source:{c: $c} , clock:dataClock, target:[exactExactBad,exactNullable] , fn:({c}, {d}): ExactExactBad => null as any})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; b: string; }; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; }; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; b: string; } | null; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; b: string; } | { a: number; }; }; }'.
    lack of expected error at test line 12 'sample({source:$dataSrc, clock:dataClock, target:[exact,exactBad]              , fn:({c}, {d}): ExactExactBad => null as any})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; }; }[]; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; b: string; } | null; }[]; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; }; }[]; }'.
    lack of expected error at test line 20 'sample({source:$dataSrc, clock:dataClock, target:[exact,exactBadNarrow]        , fn:({c}, {d}): ExactExactBad => null as any})'
    lack of expected error at test line 22 'sample({source:$dataSrc, clock:dataClock, target:[exact,exactExactBad]         , fn:({c}, {d}): ExactExactBad => null as any})'
    lack of expected error at test line 24 'sample({source:$dataSrc, clock:dataClock, target:[exactBad,exactNullable]      , fn:({c}, {d}): ExactExactBad => null as any})'
    lack of expected error at test line 26 'sample({source:$dataSrc, clock:dataClock, target:[exactBad,exactNarrow]        , fn:({c}, {d}): ExactExactBad => null as any})'
    lack of expected error at test line 28 'sample({source:$dataSrc, clock:dataClock, target:[narrow,exactBad]             , fn:({c}, {d}): ExactExactBad => null as any})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; } | null; }[]; }'.
    lack of expected error at test line 32 'sample({source:$dataSrc, clock:dataClock, target:[narrow,exactBadNarrow]       , fn:({c}, {d}): ExactExactBad => null as any})'
    lack of expected error at test line 34 'sample({source:$dataSrc, clock:dataClock, target:[narrow,exactExactBad]        , fn:({c}, {d}): ExactExactBad => null as any})'
    lack of expected error at test line 36 'sample({source:$dataSrc, clock:dataClock, target:[exactNullable,exactBadNarrow], fn:({c}, {d}): ExactExactBad => null as any})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; } | null; }[]; }'.
    lack of expected error at test line 40 'sample({source:$dataSrc, clock:dataClock, target:[exactNarrow,exactBadNarrow]  , fn:({c}, {d}): ExactExactBad => null as any})'
    lack of expected error at test line 42 'sample({source:$dataSrc, clock:dataClock, target:[exactExactBad,exactNullable] , fn:({c}, {d}): ExactExactBad => null as any})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; b: string; }; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; }; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; b: string; } | null; }; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; b: string; } | { a: number; }; }; }'.
    lack of expected error at test line 52 'sample({source:{c: $c} , clock:dataClock, target:[exact,exactBad]              , fn:({c}, {d}): ExactExactBad => null as any})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; }; }[]; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; b: string; } | null; }[]; }'.
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; }; }[]; }'.
    lack of expected error at test line 60 'sample({source:{c: $c} , clock:dataClock, target:[exact,exactBadNarrow]        , fn:({c}, {d}): ExactExactBad => null as any})'
    lack of expected error at test line 62 'sample({source:{c: $c} , clock:dataClock, target:[exact,exactExactBad]         , fn:({c}, {d}): ExactExactBad => null as any})'
    lack of expected error at test line 64 'sample({source:{c: $c} , clock:dataClock, target:[exactBad,exactNullable]      , fn:({c}, {d}): ExactExactBad => null as any})'
    lack of expected error at test line 66 'sample({source:{c: $c} , clock:dataClock, target:[exactBad,exactNarrow]        , fn:({c}, {d}): ExactExactBad => null as any})'
    lack of expected error at test line 68 'sample({source:{c: $c} , clock:dataClock, target:[narrow,exactBad]             , fn:({c}, {d}): ExactExactBad => null as any})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; } | null; }[]; }'.
    lack of expected error at test line 72 'sample({source:{c: $c} , clock:dataClock, target:[narrow,exactBadNarrow]       , fn:({c}, {d}): ExactExactBad => null as any})'
    lack of expected error at test line 74 'sample({source:{c: $c} , clock:dataClock, target:[narrow,exactExactBad]        , fn:({c}, {d}): ExactExactBad => null as any})'
    lack of expected error at test line 76 'sample({source:{c: $c} , clock:dataClock, target:[exactNullable,exactBadNarrow], fn:({c}, {d}): ExactExactBad => null as any})'
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: ExactExactBad; targetType: { a: number; } | null; }[]; }'.
    lack of expected error at test line 80 'sample({source:{c: $c} , clock:dataClock, target:[exactNarrow,exactBadNarrow]  , fn:({c}, {d}): ExactExactBad => null as any})'
    lack of expected error at test line 82 'sample({source:{c: $c} , clock:dataClock, target:[exactExactBad,exactNullable] , fn:({c}, {d}): ExactExactBad => null as any})'
    "
  `)
})
