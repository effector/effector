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
