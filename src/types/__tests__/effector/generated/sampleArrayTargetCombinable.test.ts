/* eslint-disable no-unused-vars */
import {createStore, createEvent, sample} from 'effector'
const typecheck = '{global}'
/** used as valid source type */
type AN = {a: number}
/** used as invalid source type */
type AS = {a: string}
/** used as valid source type */
type AB = {a: number; b: string}
/** used as invalid source type */
type ABN = {a: number; b: number}
const num = createEvent<number>()
const $num = createStore<number>(0)
const $str = createStore<string>('')
const a_num = createEvent<AN>()
const a_str = createEvent<AS>()
const ab = createEvent<AB>()
const abn = createEvent<ABN>()
const l_num = createEvent<[number]>()
const l_str = createEvent<[string]>()
const l_num_str = createEvent<[number, string]>()
const l_num_num = createEvent<[number, number]>()

const fn = {
  noArgs: () => ({a: 2, b: ''}),
  assertFirst: {
    object: {
      solo: ({a}: AS, cl: number) => ({a: cl, b: a}),
      pair: ({a, b}: ABN, cl: number) => ({a: b + cl, b: ''}),
    },
    tuple: {
      solo: ([a]: [string], cl: number) => ({a: cl, b: a}),
      pair: ([a, b]: [number, number], cl: number) => ({a: b + cl, b: ''}),
    },
  },
  assertFirstOnly: {
    object: {
      solo: ({a}: AS) => ({a: 0, b: a}),
      pair: ({b}: ABN) => ({a: b, b: ''}),
    },
    tuple: {
      solo: ([a]: [string]) => ({a: 2, b: a}),
      pair: ([, b]: [number, number]) => ({a: b, b: ''}),
    },
  },
  assertSecond: {
    object: {
      solo: ({a}: AN, cl: string) => ({a, b: cl}),
      pair: ({a}: AB, cl: string) => ({a, b: cl}),
    },
    tuple: {
      solo: ([a]: [number], cl: string) => ({a, b: cl}),
      pair: ([a]: [number, string], cl: string) => ({a, b: cl}),
    },
  },
  typedSrc: {
    object: {
      solo: ({a}: AN) => ({a, b: ''}),
      pair: ({a, b}: AB) => ({a, b}),
    },
    tuple: {
      solo: ([a]: [number]) => ({a, b: ''}),
      pair: ([a, b]: [number, string]) => ({a, b}),
    },
  },
  typedSrcClock: {
    object: {
      solo: ({a}: AN, cl: number) => ({a: a + cl, b: ''}),
      pair: ({a, b}: AB, cl: number) => ({a: a + cl, b}),
    },
    tuple: {
      solo: ([a]: [number], cl: number) => ({a: a + cl, b: ''}),
      pair: ([a, b]: [number, string], cl: number) => ({a: a + cl, b}),
    },
  },
}
describe('source:wide', () => {
  test('source:wide (should pass)', () => {
    //prettier-ignore
    {
      sample({source:{a:$num,b:$str}     , target:[a_num]          })
      sample({source:{a:$num,b:$str}     , target:[ab]             })
      sample({source:{a:$num,b:$str}     , target:[a_num,ab]       })
      sample({source:[$num,$str]         , target:[l_num]          })
      sample({source:[$num,$str]         , target:[l_num_str]      })
      sample({source:[$num,$str]         , target:[l_num,l_num_str]})
      sample({source:[$num,$str] as const, target:[l_num]          })
      sample({source:[$num,$str] as const, target:[l_num_str]      })
      sample({source:[$num,$str] as const, target:[l_num,l_num_str]})
      sample({source:{a:$num,b:$str}     , clock:num, target:[a_num]          })
      sample({source:{a:$num,b:$str}     , clock:num, target:[ab]             })
      sample({source:{a:$num,b:$str}     , clock:num, target:[a_num,ab]       })
      sample({source:[$num,$str]         , clock:num, target:[l_num]          })
      sample({source:[$num,$str]         , clock:num, target:[l_num_str]      })
      sample({source:[$num,$str]         , clock:num, target:[l_num,l_num_str]})
      sample({source:[$num,$str] as const, clock:num, target:[l_num]          })
      sample({source:[$num,$str] as const, clock:num, target:[l_num_str]      })
      sample({source:[$num,$str] as const, clock:num, target:[l_num,l_num_str]})
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Unmarked error at test line 6 'sample({source:[$num,$str]         , target:[l_num]          })'
      Type 'EventCallable<[number]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Types of property '__' are incompatible.
          Type '[number]' is not assignable to type 'readonly [number, string]'.
            Source has 1 element(s) but target requires 2.
      Unmarked error at test line 8 'sample({source:[$num,$str]         , target:[l_num,l_num_str]})'
      Type 'EventCallable<[number]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Types of property '__' are incompatible.
          Type '[number]' is not assignable to type 'readonly [number, string]'.
            Source has 1 element(s) but target requires 2.
      Unmarked error at test line 9 'sample({source:[$num,$str] as const, target:[l_num]          })'
      Type 'EventCallable<[number]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Types of property '__' are incompatible.
          Type '[number]' is not assignable to type 'readonly [number, string]'.
            Source has 1 element(s) but target requires 2.
      Unmarked error at test line 11 'sample({source:[$num,$str] as const, target:[l_num,l_num_str]})'
      Type 'EventCallable<[number]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Types of property '__' are incompatible.
          Type '[number]' is not assignable to type 'readonly [number, string]'.
            Source has 1 element(s) but target requires 2.
      Unmarked error at test line 15 'sample({source:[$num,$str]         , clock:num, target:[l_num]          })'
      Type 'EventCallable<[number]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Types of property '__' are incompatible.
          Type '[number]' is not assignable to type 'readonly [number, string]'.
            Source has 1 element(s) but target requires 2.
      Unmarked error at test line 17 'sample({source:[$num,$str]         , clock:num, target:[l_num,l_num_str]})'
      Type 'EventCallable<[number]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Types of property '__' are incompatible.
          Type '[number]' is not assignable to type 'readonly [number, string]'.
            Source has 1 element(s) but target requires 2.
      Unmarked error at test line 18 'sample({source:[$num,$str] as const, clock:num, target:[l_num]          })'
      Type 'EventCallable<[number]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Types of property '__' are incompatible.
          Type '[number]' is not assignable to type 'readonly [number, string]'.
            Source has 1 element(s) but target requires 2.
      Unmarked error at test line 20 'sample({source:[$num,$str] as const, clock:num, target:[l_num,l_num_str]})'
      Type 'EventCallable<[number]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Types of property '__' are incompatible.
          Type '[number]' is not assignable to type 'readonly [number, string]'.
            Source has 1 element(s) but target requires 2.
      "
    `)
  })
  test('source:wide (should fail)', () => {
    //prettier-ignore
    {
      sample({
        source: {a:$num,b:$str},
        target: [
          //@ts-expect-error
          a_str,
        ],
      })
      sample({
        source: {a:$num,b:$str},
        target: [
          //@ts-expect-error
          abn,
        ],
      })
      sample({
        source: {a:$num,b:$str},
        target: [
          a_num,
          //@ts-expect-error
          a_str,
        ],
      })
      sample({
        source: {a:$num,b:$str},
        target: [
          a_num,
          //@ts-expect-error
          abn,
        ],
      })
      sample({
        source: {a:$num,b:$str},
        target: [
          //@ts-expect-error
          a_str,
          ab,
        ],
      })
      sample({
        source: {a:$num,b:$str},
        target: [
          //@ts-expect-error
          abn,
          //@ts-expect-error
          a_str,
        ],
      })
      sample({
        source: {a:$num,b:$str},
        target: [
          //@ts-expect-error
          abn,
          ab,
        ],
      })
      sample({
        source: [$num,$str],
        target: [
          //@ts-expect-error
          l_str,
        ],
      })
      sample({
        source: [$num,$str],
        target: [
          //@ts-expect-error
          l_num_num,
        ],
      })
      sample({
        source: [$num,$str],
        target: [
          l_num,
          //@ts-expect-error
          l_str,
        ],
      })
      sample({
        source: [$num,$str],
        target: [
          l_num,
          //@ts-expect-error
          l_num_num,
        ],
      })
      sample({
        source: [$num,$str],
        target: [
          //@ts-expect-error
          l_str,
          //@ts-expect-error
          l_num_num,
        ],
      })
      sample({
        source: [$num,$str],
        target: [
          l_num_str,
          //@ts-expect-error
          l_str,
        ],
      })
      sample({
        source: [$num,$str],
        target: [
          l_num_str,
          //@ts-expect-error
          l_num_num,
        ],
      })
      sample({
        source: [$num,$str] as const,
        target: [
          //@ts-expect-error
          l_str,
        ],
      })
      sample({
        source: [$num,$str] as const,
        target: [
          //@ts-expect-error
          l_num_num,
        ],
      })
      sample({
        source: [$num,$str] as const,
        target: [
          l_num,
          //@ts-expect-error
          l_str,
        ],
      })
      sample({
        source: [$num,$str] as const,
        target: [
          l_num,
          //@ts-expect-error
          l_num_num,
        ],
      })
      sample({
        source: [$num,$str] as const,
        target: [
          //@ts-expect-error
          l_str,
          //@ts-expect-error
          l_num_num,
        ],
      })
      sample({
        source: [$num,$str] as const,
        target: [
          l_num_str,
          //@ts-expect-error
          l_str,
        ],
      })
      sample({
        source: [$num,$str] as const,
        target: [
          l_num_str,
          //@ts-expect-error
          l_num_num,
        ],
      })
      sample({
        source: {a:$num,b:$str},
        clock: num,
        target: [
          //@ts-expect-error
          a_str,
        ],
      })
      sample({
        source: {a:$num,b:$str},
        clock: num,
        target: [
          //@ts-expect-error
          abn,
        ],
      })
      sample({
        source: {a:$num,b:$str},
        clock: num,
        target: [
          a_num,
          //@ts-expect-error
          a_str,
        ],
      })
      sample({
        source: {a:$num,b:$str},
        clock: num,
        target: [
          a_num,
          //@ts-expect-error
          abn,
        ],
      })
      sample({
        source: {a:$num,b:$str},
        clock: num,
        target: [
          //@ts-expect-error
          a_str,
          ab,
        ],
      })
      sample({
        source: {a:$num,b:$str},
        clock: num,
        target: [
          //@ts-expect-error
          abn,
          //@ts-expect-error
          a_str,
        ],
      })
      sample({
        source: {a:$num,b:$str},
        clock: num,
        target: [
          //@ts-expect-error
          abn,
          ab,
        ],
      })
      sample({
        source: [$num,$str],
        clock: num,
        target: [
          //@ts-expect-error
          l_str,
        ],
      })
      sample({
        source: [$num,$str],
        clock: num,
        target: [
          //@ts-expect-error
          l_num_num,
        ],
      })
      sample({
        source: [$num,$str],
        clock: num,
        target: [
          l_num,
          //@ts-expect-error
          l_str,
        ],
      })
      sample({
        source: [$num,$str],
        clock: num,
        target: [
          l_num,
          //@ts-expect-error
          l_num_num,
        ],
      })
      sample({
        source: [$num,$str],
        clock: num,
        target: [
          //@ts-expect-error
          l_str,
          //@ts-expect-error
          l_num_num,
        ],
      })
      sample({
        source: [$num,$str],
        clock: num,
        target: [
          l_num_str,
          //@ts-expect-error
          l_str,
        ],
      })
      sample({
        source: [$num,$str],
        clock: num,
        target: [
          l_num_str,
          //@ts-expect-error
          l_num_num,
        ],
      })
      sample({
        source: [$num,$str] as const,
        clock: num,
        target: [
          //@ts-expect-error
          l_str,
        ],
      })
      sample({
        source: [$num,$str] as const,
        clock: num,
        target: [
          //@ts-expect-error
          l_num_num,
        ],
      })
      sample({
        source: [$num,$str] as const,
        clock: num,
        target: [
          l_num,
          //@ts-expect-error
          l_str,
        ],
      })
      sample({
        source: [$num,$str] as const,
        clock: num,
        target: [
          l_num,
          //@ts-expect-error
          l_num_num,
        ],
      })
      sample({
        source: [$num,$str] as const,
        clock: num,
        target: [
          //@ts-expect-error
          l_str,
          //@ts-expect-error
          l_num_num,
        ],
      })
      sample({
        source: [$num,$str] as const,
        clock: num,
        target: [
          l_num_str,
          //@ts-expect-error
          l_str,
        ],
      })
      sample({
        source: [$num,$str] as const,
        clock: num,
        target: [
          l_num_str,
          //@ts-expect-error
          l_num_num,
        ],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<AS>' is not assignable to type 'Unit<{ readonly a: number; readonly b: string; }>'.
        Types of property '__' are incompatible.
          Property 'b' is missing in type 'AS' but required in type '{ readonly a: number; readonly b: string; }'.
      Type 'EventCallable<ABN>' is not assignable to type 'Unit<{ readonly a: number; readonly b: string; }>'.
        The types of '__.b' are incompatible between these types.
          Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 20 'a_num,'
      Type 'EventCallable<AN>' is not assignable to type 'Unit<{ readonly a: number; readonly b: string; }>'.
        Types of property '__' are incompatible.
          Property 'b' is missing in type 'AN' but required in type '{ readonly a: number; readonly b: string; }'.
      Type 'EventCallable<AS>' is not assignable to type 'Unit<{ readonly a: number; readonly b: string; }>'.
        Types of property '__' are incompatible.
          Property 'b' is missing in type 'AS' but required in type '{ readonly a: number; readonly b: string; }'.
      Unmarked error at test line 28 'a_num,'
      Type 'EventCallable<AN>' is not assignable to type 'Unit<{ readonly a: number; readonly b: string; }>'.
        Types of property '__' are incompatible.
          Property 'b' is missing in type 'AN' but required in type '{ readonly a: number; readonly b: string; }'.
      Type 'EventCallable<ABN>' is not assignable to type 'Unit<{ readonly a: number; readonly b: string; }>'.
        The types of '__.b' are incompatible between these types.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<AS>' is not assignable to type 'Unit<{ readonly a: number; readonly b: string; }>'.
        Types of property '__' are incompatible.
          Property 'b' is missing in type 'AS' but required in type '{ readonly a: number; readonly b: string; }'.
      Type 'EventCallable<ABN>' is not assignable to type 'Unit<{ readonly a: number; readonly b: string; }>'.
        The types of '__.b' are incompatible between these types.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<AS>' is not assignable to type 'Unit<{ readonly a: number; readonly b: string; }>'.
        Types of property '__' are incompatible.
          Property 'b' is missing in type 'AS' but required in type '{ readonly a: number; readonly b: string; }'.
      Type 'EventCallable<ABN>' is not assignable to type 'Unit<{ readonly a: number; readonly b: string; }>'.
        The types of '__.b' are incompatible between these types.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<[string]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Types of property '__' are incompatible.
          Type '[string]' is not assignable to type 'readonly [number, string]'.
            Source has 1 element(s) but target requires 2.
      Type 'EventCallable<[number, number]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Type at position 1 in source is not compatible with type at position 1 in target.
          The types of '__' are incompatible between these types.
            Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 75 'l_num,'
      Type 'EventCallable<[number]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Types of property '__' are incompatible.
          Type '[number]' is not assignable to type 'readonly [number, string]'.
            Source has 1 element(s) but target requires 2.
      Type 'EventCallable<[string]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Types of property '__' are incompatible.
          Type '[string]' is not assignable to type 'readonly [number, string]'.
            Source has 1 element(s) but target requires 2.
      Unmarked error at test line 83 'l_num,'
      Type 'EventCallable<[number]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Types of property '__' are incompatible.
          Type '[number]' is not assignable to type 'readonly [number, string]'.
            Source has 1 element(s) but target requires 2.
      Type 'EventCallable<[number, number]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Type at position 1 in source is not compatible with type at position 1 in target.
          The types of '__' are incompatible between these types.
            Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<[string]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Types of property '__' are incompatible.
          Type '[string]' is not assignable to type 'readonly [number, string]'.
            Source has 1 element(s) but target requires 2.
      Type 'EventCallable<[number, number]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Type at position 1 in source is not compatible with type at position 1 in target.
          The types of '__' are incompatible between these types.
            Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<[string]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Types of property '__' are incompatible.
          Type '[string]' is not assignable to type 'readonly [number, string]'.
            Source has 1 element(s) but target requires 2.
      Type 'EventCallable<[number, number]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Type at position 1 in source is not compatible with type at position 1 in target.
          The types of '__' are incompatible between these types.
            Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<[string]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Types of property '__' are incompatible.
          Type '[string]' is not assignable to type 'readonly [number, string]'.
            Source has 1 element(s) but target requires 2.
      Type 'EventCallable<[number, number]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Type at position 1 in source is not compatible with type at position 1 in target.
          The types of '__' are incompatible between these types.
            Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 130 'l_num,'
      Type 'EventCallable<[number]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Types of property '__' are incompatible.
          Type '[number]' is not assignable to type 'readonly [number, string]'.
            Source has 1 element(s) but target requires 2.
      Type 'EventCallable<[string]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Types of property '__' are incompatible.
          Type '[string]' is not assignable to type 'readonly [number, string]'.
            Source has 1 element(s) but target requires 2.
      Unmarked error at test line 138 'l_num,'
      Type 'EventCallable<[number]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Types of property '__' are incompatible.
          Type '[number]' is not assignable to type 'readonly [number, string]'.
            Source has 1 element(s) but target requires 2.
      Type 'EventCallable<[number, number]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Type at position 1 in source is not compatible with type at position 1 in target.
          The types of '__' are incompatible between these types.
            Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<[string]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Types of property '__' are incompatible.
          Type '[string]' is not assignable to type 'readonly [number, string]'.
            Source has 1 element(s) but target requires 2.
      Type 'EventCallable<[number, number]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Type at position 1 in source is not compatible with type at position 1 in target.
          The types of '__' are incompatible between these types.
            Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<[string]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Types of property '__' are incompatible.
          Type '[string]' is not assignable to type 'readonly [number, string]'.
            Source has 1 element(s) but target requires 2.
      Type 'EventCallable<[number, number]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Type at position 1 in source is not compatible with type at position 1 in target.
          The types of '__' are incompatible between these types.
            Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<AS>' is not assignable to type 'Unit<{ readonly a: number; readonly b: string; }>'.
        Types of property '__' are incompatible.
          Property 'b' is missing in type 'AS' but required in type '{ readonly a: number; readonly b: string; }'.
      Type 'EventCallable<ABN>' is not assignable to type 'Unit<{ readonly a: number; readonly b: string; }>'.
        The types of '__.b' are incompatible between these types.
          Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 188 'a_num,'
      Type 'EventCallable<AN>' is not assignable to type 'Unit<{ readonly a: number; readonly b: string; }>'.
        Types of property '__' are incompatible.
          Property 'b' is missing in type 'AN' but required in type '{ readonly a: number; readonly b: string; }'.
      Type 'EventCallable<AS>' is not assignable to type 'Unit<{ readonly a: number; readonly b: string; }>'.
        Types of property '__' are incompatible.
          Property 'b' is missing in type 'AS' but required in type '{ readonly a: number; readonly b: string; }'.
      Unmarked error at test line 197 'a_num,'
      Type 'EventCallable<AN>' is not assignable to type 'Unit<{ readonly a: number; readonly b: string; }>'.
        Types of property '__' are incompatible.
          Property 'b' is missing in type 'AN' but required in type '{ readonly a: number; readonly b: string; }'.
      Type 'EventCallable<ABN>' is not assignable to type 'Unit<{ readonly a: number; readonly b: string; }>'.
        The types of '__.b' are incompatible between these types.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<AS>' is not assignable to type 'Unit<{ readonly a: number; readonly b: string; }>'.
        Types of property '__' are incompatible.
          Property 'b' is missing in type 'AS' but required in type '{ readonly a: number; readonly b: string; }'.
      Type 'EventCallable<ABN>' is not assignable to type 'Unit<{ readonly a: number; readonly b: string; }>'.
        The types of '__.b' are incompatible between these types.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<AS>' is not assignable to type 'Unit<{ readonly a: number; readonly b: string; }>'.
        Types of property '__' are incompatible.
          Property 'b' is missing in type 'AS' but required in type '{ readonly a: number; readonly b: string; }'.
      Type 'EventCallable<ABN>' is not assignable to type 'Unit<{ readonly a: number; readonly b: string; }>'.
        The types of '__.b' are incompatible between these types.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<[string]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Types of property '__' are incompatible.
          Type '[string]' is not assignable to type 'readonly [number, string]'.
            Source has 1 element(s) but target requires 2.
      Type 'EventCallable<[number, number]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Type at position 1 in source is not compatible with type at position 1 in target.
          The types of '__' are incompatible between these types.
            Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 250 'l_num,'
      Type 'EventCallable<[number]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Types of property '__' are incompatible.
          Type '[number]' is not assignable to type 'readonly [number, string]'.
            Source has 1 element(s) but target requires 2.
      Type 'EventCallable<[string]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Types of property '__' are incompatible.
          Type '[string]' is not assignable to type 'readonly [number, string]'.
            Source has 1 element(s) but target requires 2.
      Unmarked error at test line 259 'l_num,'
      Type 'EventCallable<[number]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Types of property '__' are incompatible.
          Type '[number]' is not assignable to type 'readonly [number, string]'.
            Source has 1 element(s) but target requires 2.
      Type 'EventCallable<[number, number]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Type at position 1 in source is not compatible with type at position 1 in target.
          The types of '__' are incompatible between these types.
            Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<[string]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Types of property '__' are incompatible.
          Type '[string]' is not assignable to type 'readonly [number, string]'.
            Source has 1 element(s) but target requires 2.
      Type 'EventCallable<[number, number]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Type at position 1 in source is not compatible with type at position 1 in target.
          The types of '__' are incompatible between these types.
            Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<[string]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Types of property '__' are incompatible.
          Type '[string]' is not assignable to type 'readonly [number, string]'.
            Source has 1 element(s) but target requires 2.
      Type 'EventCallable<[number, number]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Type at position 1 in source is not compatible with type at position 1 in target.
          The types of '__' are incompatible between these types.
            Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<[string]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Types of property '__' are incompatible.
          Type '[string]' is not assignable to type 'readonly [number, string]'.
            Source has 1 element(s) but target requires 2.
      Type 'EventCallable<[number, number]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Type at position 1 in source is not compatible with type at position 1 in target.
          The types of '__' are incompatible between these types.
            Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 312 'l_num,'
      Type 'EventCallable<[number]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Types of property '__' are incompatible.
          Type '[number]' is not assignable to type 'readonly [number, string]'.
            Source has 1 element(s) but target requires 2.
      Type 'EventCallable<[string]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Types of property '__' are incompatible.
          Type '[string]' is not assignable to type 'readonly [number, string]'.
            Source has 1 element(s) but target requires 2.
      Unmarked error at test line 321 'l_num,'
      Type 'EventCallable<[number]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Types of property '__' are incompatible.
          Type '[number]' is not assignable to type 'readonly [number, string]'.
            Source has 1 element(s) but target requires 2.
      Type 'EventCallable<[number, number]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Type at position 1 in source is not compatible with type at position 1 in target.
          The types of '__' are incompatible between these types.
            Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<[string]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Types of property '__' are incompatible.
          Type '[string]' is not assignable to type 'readonly [number, string]'.
            Source has 1 element(s) but target requires 2.
      Type 'EventCallable<[number, number]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Type at position 1 in source is not compatible with type at position 1 in target.
          The types of '__' are incompatible between these types.
            Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<[string]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Types of property '__' are incompatible.
          Type '[string]' is not assignable to type 'readonly [number, string]'.
            Source has 1 element(s) but target requires 2.
      Type 'EventCallable<[number, number]>' is not assignable to type 'Unit<readonly [number, string]>'.
        Type at position 1 in source is not compatible with type at position 1 in target.
          The types of '__' are incompatible between these types.
            Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('source:wide, fn:untyped', () => {
  test('source:wide, fn:untyped (should pass)', () => {
    //prettier-ignore
    {
      sample({source:{a:$num,b:$str}     , target:[a_num]   , fn:({a,b}) => ({a,b})})
      sample({source:{a:$num,b:$str}     , target:[ab]      , fn:({a,b}) => ({a,b})})
      sample({source:{a:$num,b:$str}     , target:[a_num,ab], fn:({a,b}) => ({a,b})})
      sample({source:[$num,$str]         , target:[a_num]   , fn:([a,b]) => ({a,b})})
      sample({source:[$num,$str]         , target:[ab]      , fn:([a,b]) => ({a,b})})
      sample({source:[$num,$str]         , target:[a_num,ab], fn:([a,b]) => ({a,b})})
      sample({source:[$num,$str] as const, target:[a_num]   , fn:([a,b]) => ({a,b})})
      sample({source:[$num,$str] as const, target:[ab]      , fn:([a,b]) => ({a,b})})
      sample({source:[$num,$str] as const, target:[a_num,ab], fn:([a,b]) => ({a,b})})
      sample({source:{a:$num,b:$str}     , clock:num, target:[a_num]   , fn:({a,b}) => ({a,b})})
      sample({source:{a:$num,b:$str}     , clock:num, target:[ab]      , fn:({a,b}) => ({a,b})})
      sample({source:{a:$num,b:$str}     , clock:num, target:[a_num,ab], fn:({a,b}) => ({a,b})})
      sample({source:[$num,$str]         , clock:num, target:[a_num]   , fn:([a,b]) => ({a,b})})
      sample({source:[$num,$str]         , clock:num, target:[ab]      , fn:([a,b]) => ({a,b})})
      sample({source:[$num,$str]         , clock:num, target:[a_num,ab], fn:([a,b]) => ({a,b})})
      sample({source:[$num,$str] as const, clock:num, target:[a_num]   , fn:([a,b]) => ({a,b})})
      sample({source:[$num,$str] as const, clock:num, target:[ab]      , fn:([a,b]) => ({a,b})})
      sample({source:[$num,$str] as const, clock:num, target:[a_num,ab], fn:([a,b]) => ({a,b})})
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('source:wide, fn:untyped (should fail)', () => {
    //prettier-ignore
    {
      sample({
        source: {a:$num,b:$str},
        target: [
          //@ts-expect-error
          a_str,
        ],
        fn: ({a,b}) => ({a,b}),
      })
      sample({
        source: {a:$num,b:$str},
        target: [
          //@ts-expect-error
          abn,
        ],
        fn: ({a,b}) => ({a,b}),
      })
      sample({
        source: {a:$num,b:$str},
        target: [
          a_num,
          //@ts-expect-error
          a_str,
        ],
        fn: ({a,b}) => ({a,b}),
      })
      sample({
        source: {a:$num,b:$str},
        target: [
          a_num,
          //@ts-expect-error
          abn,
        ],
        fn: ({a,b}) => ({a,b}),
      })
      sample({
        source: {a:$num,b:$str},
        target: [
          //@ts-expect-error
          a_str,
          ab,
        ],
        fn: ({a,b}) => ({a,b}),
      })
      sample({
        source: {a:$num,b:$str},
        target: [
          //@ts-expect-error
          abn,
          //@ts-expect-error
          a_str,
        ],
        fn: ({a,b}) => ({a,b}),
      })
      sample({
        source: {a:$num,b:$str},
        target: [
          //@ts-expect-error
          abn,
          ab,
        ],
        fn: ({a,b}) => ({a,b}),
      })
      sample({
        source: [$num,$str],
        target: [
          //@ts-expect-error
          a_str,
        ],
        fn: ([a,b]) => ({a,b}),
      })
      sample({
        source: [$num,$str],
        target: [
          //@ts-expect-error
          abn,
        ],
        fn: ([a,b]) => ({a,b}),
      })
      sample({
        source: [$num,$str],
        target: [
          a_num,
          //@ts-expect-error
          a_str,
        ],
        fn: ([a,b]) => ({a,b}),
      })
      sample({
        source: [$num,$str],
        target: [
          a_num,
          //@ts-expect-error
          abn,
        ],
        fn: ([a,b]) => ({a,b}),
      })
      sample({
        source: [$num,$str],
        target: [
          //@ts-expect-error
          a_str,
          ab,
        ],
        fn: ([a,b]) => ({a,b}),
      })
      sample({
        source: [$num,$str],
        target: [
          //@ts-expect-error
          abn,
          //@ts-expect-error
          a_str,
        ],
        fn: ([a,b]) => ({a,b}),
      })
      sample({
        source: [$num,$str],
        target: [
          //@ts-expect-error
          abn,
          ab,
        ],
        fn: ([a,b]) => ({a,b}),
      })
      sample({
        source: [$num,$str] as const,
        target: [
          //@ts-expect-error
          a_str,
        ],
        fn: ([a,b]) => ({a,b}),
      })
      sample({
        source: [$num,$str] as const,
        target: [
          //@ts-expect-error
          abn,
        ],
        fn: ([a,b]) => ({a,b}),
      })
      sample({
        source: [$num,$str] as const,
        target: [
          a_num,
          //@ts-expect-error
          a_str,
        ],
        fn: ([a,b]) => ({a,b}),
      })
      sample({
        source: [$num,$str] as const,
        target: [
          a_num,
          //@ts-expect-error
          abn,
        ],
        fn: ([a,b]) => ({a,b}),
      })
      sample({
        source: [$num,$str] as const,
        target: [
          //@ts-expect-error
          a_str,
          ab,
        ],
        fn: ([a,b]) => ({a,b}),
      })
      sample({
        source: [$num,$str] as const,
        target: [
          //@ts-expect-error
          abn,
          //@ts-expect-error
          a_str,
        ],
        fn: ([a,b]) => ({a,b}),
      })
      sample({
        source: [$num,$str] as const,
        target: [
          //@ts-expect-error
          abn,
          ab,
        ],
        fn: ([a,b]) => ({a,b}),
      })
      sample({
        source: {a:$num,b:$str},
        clock: num,
        target: [
          //@ts-expect-error
          a_str,
        ],
        fn: ({a,b}) => ({a,b}),
      })
      sample({
        source: {a:$num,b:$str},
        clock: num,
        target: [
          //@ts-expect-error
          abn,
        ],
        fn: ({a,b}) => ({a,b}),
      })
      sample({
        source: {a:$num,b:$str},
        clock: num,
        target: [
          a_num,
          //@ts-expect-error
          a_str,
        ],
        fn: ({a,b}) => ({a,b}),
      })
      sample({
        source: {a:$num,b:$str},
        clock: num,
        target: [
          a_num,
          //@ts-expect-error
          abn,
        ],
        fn: ({a,b}) => ({a,b}),
      })
      sample({
        source: {a:$num,b:$str},
        clock: num,
        target: [
          //@ts-expect-error
          a_str,
          ab,
        ],
        fn: ({a,b}) => ({a,b}),
      })
      sample({
        source: {a:$num,b:$str},
        clock: num,
        target: [
          //@ts-expect-error
          abn,
          //@ts-expect-error
          a_str,
        ],
        fn: ({a,b}) => ({a,b}),
      })
      sample({
        source: {a:$num,b:$str},
        clock: num,
        target: [
          //@ts-expect-error
          abn,
          ab,
        ],
        fn: ({a,b}) => ({a,b}),
      })
      sample({
        source: [$num,$str],
        clock: num,
        target: [
          //@ts-expect-error
          a_str,
        ],
        fn: ([a,b]) => ({a,b}),
      })
      sample({
        source: [$num,$str],
        clock: num,
        target: [
          //@ts-expect-error
          abn,
        ],
        fn: ([a,b]) => ({a,b}),
      })
      sample({
        source: [$num,$str],
        clock: num,
        target: [
          a_num,
          //@ts-expect-error
          a_str,
        ],
        fn: ([a,b]) => ({a,b}),
      })
      sample({
        source: [$num,$str],
        clock: num,
        target: [
          a_num,
          //@ts-expect-error
          abn,
        ],
        fn: ([a,b]) => ({a,b}),
      })
      sample({
        source: [$num,$str],
        clock: num,
        target: [
          //@ts-expect-error
          a_str,
          ab,
        ],
        fn: ([a,b]) => ({a,b}),
      })
      sample({
        source: [$num,$str],
        clock: num,
        target: [
          //@ts-expect-error
          abn,
          //@ts-expect-error
          a_str,
        ],
        fn: ([a,b]) => ({a,b}),
      })
      sample({
        source: [$num,$str],
        clock: num,
        target: [
          //@ts-expect-error
          abn,
          ab,
        ],
        fn: ([a,b]) => ({a,b}),
      })
      sample({
        source: [$num,$str] as const,
        clock: num,
        target: [
          //@ts-expect-error
          a_str,
        ],
        fn: ([a,b]) => ({a,b}),
      })
      sample({
        source: [$num,$str] as const,
        clock: num,
        target: [
          //@ts-expect-error
          abn,
        ],
        fn: ([a,b]) => ({a,b}),
      })
      sample({
        source: [$num,$str] as const,
        clock: num,
        target: [
          a_num,
          //@ts-expect-error
          a_str,
        ],
        fn: ([a,b]) => ({a,b}),
      })
      sample({
        source: [$num,$str] as const,
        clock: num,
        target: [
          a_num,
          //@ts-expect-error
          abn,
        ],
        fn: ([a,b]) => ({a,b}),
      })
      sample({
        source: [$num,$str] as const,
        clock: num,
        target: [
          //@ts-expect-error
          a_str,
          ab,
        ],
        fn: ([a,b]) => ({a,b}),
      })
      sample({
        source: [$num,$str] as const,
        clock: num,
        target: [
          //@ts-expect-error
          abn,
          //@ts-expect-error
          a_str,
        ],
        fn: ([a,b]) => ({a,b}),
      })
      sample({
        source: [$num,$str] as const,
        clock: num,
        target: [
          //@ts-expect-error
          abn,
          ab,
        ],
        fn: ([a,b]) => ({a,b}),
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Unmarked error at test line 9 'fn: ({a,b}) => ({a,b}),'
      lack of expected error at test line 7 'a_str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 17 'fn: ({a,b}) => ({a,b}),'
      lack of expected error at test line 15 'abn,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 26 'fn: ({a,b}) => ({a,b}),'
      lack of expected error at test line 24 'a_str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 35 'fn: ({a,b}) => ({a,b}),'
      lack of expected error at test line 33 'abn,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 44 'fn: ({a,b}) => ({a,b}),'
      lack of expected error at test line 41 'a_str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 54 'fn: ({a,b}) => ({a,b}),'
      lack of expected error at test line 50 'abn,'
      lack of expected error at test line 52 'a_str,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 63 'fn: ({a,b}) => ({a,b}),'
      lack of expected error at test line 60 'abn,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 71 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 69 'a_str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 79 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 77 'abn,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 88 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 86 'a_str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 97 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 95 'abn,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 106 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 103 'a_str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 116 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 112 'abn,'
      lack of expected error at test line 114 'a_str,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 125 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 122 'abn,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 133 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 131 'a_str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 141 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 139 'abn,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 150 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 148 'a_str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 159 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 157 'abn,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 168 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 165 'a_str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 178 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 174 'abn,'
      lack of expected error at test line 176 'a_str,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 187 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 184 'abn,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 196 'fn: ({a,b}) => ({a,b}),'
      lack of expected error at test line 194 'a_str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 205 'fn: ({a,b}) => ({a,b}),'
      lack of expected error at test line 203 'abn,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 215 'fn: ({a,b}) => ({a,b}),'
      lack of expected error at test line 213 'a_str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 225 'fn: ({a,b}) => ({a,b}),'
      lack of expected error at test line 223 'abn,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 235 'fn: ({a,b}) => ({a,b}),'
      lack of expected error at test line 232 'a_str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 246 'fn: ({a,b}) => ({a,b}),'
      lack of expected error at test line 242 'abn,'
      lack of expected error at test line 244 'a_str,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 256 'fn: ({a,b}) => ({a,b}),'
      lack of expected error at test line 253 'abn,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 265 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 263 'a_str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 274 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 272 'abn,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 284 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 282 'a_str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 294 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 292 'abn,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 304 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 301 'a_str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 315 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 311 'abn,'
      lack of expected error at test line 313 'a_str,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 325 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 322 'abn,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 334 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 332 'a_str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 343 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 341 'abn,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 353 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 351 'a_str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 363 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 361 'abn,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 373 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 370 'a_str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 384 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 380 'abn,'
      lack of expected error at test line 382 'a_str,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 394 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 391 'abn,'
      Type 'string' is not assignable to type 'number'.
      "
    `)
  })
})
describe('source:same', () => {
  test('source:same (should pass)', () => {
    //prettier-ignore
    {
      sample({source:{a:$num}       , target:[a_num]})
      sample({source:[$num]         , target:[l_num]})
      sample({source:[$num] as const, target:[l_num]})
      sample({source:{a:$num}       , clock:num, target:[a_num]})
      sample({source:[$num]         , clock:num, target:[l_num]})
      sample({source:[$num] as const, clock:num, target:[l_num]})
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('source:same (should fail)', () => {
    //prettier-ignore
    {
      sample({
        source: {a:$num},
        target: [
          //@ts-expect-error
          a_str,
        ],
      })
      sample({
        source: {a:$num},
        target: [
          //@ts-expect-error
          abn,
        ],
      })
      sample({
        source: {a:$num},
        target: [
          //@ts-expect-error
          ab,
        ],
      })
      sample({
        source: {a:$num},
        target: [
          a_num,
          //@ts-expect-error
          a_str,
        ],
      })
      sample({
        source: {a:$num},
        target: [
          a_num,
          //@ts-expect-error
          abn,
        ],
      })
      sample({
        source: {a:$num},
        target: [
          a_num,
          //@ts-expect-error
          ab,
        ],
      })
      sample({
        source: {a:$num},
        target: [
          //@ts-expect-error
          a_str,
          //@ts-expect-error
          ab,
        ],
      })
      sample({
        source: {a:$num},
        target: [
          //@ts-expect-error
          abn,
          //@ts-expect-error
          a_str,
        ],
      })
      sample({
        source: {a:$num},
        target: [
          //@ts-expect-error
          abn,
          //@ts-expect-error
          ab,
        ],
      })
      sample({
        source: [$num],
        target: [
          //@ts-expect-error
          l_str,
        ],
      })
      sample({
        source: [$num],
        target: [
          //@ts-expect-error
          l_num_str,
        ],
      })
      sample({
        source: [$num],
        target: [
          //@ts-expect-error
          l_num_num,
        ],
      })
      sample({
        source: [$num],
        target: [
          l_num,
          //@ts-expect-error
          l_str,
        ],
      })
      sample({
        source: [$num],
        target: [
          l_num,
          //@ts-expect-error
          l_num_str,
        ],
      })
      sample({
        source: [$num],
        target: [
          l_num,
          //@ts-expect-error
          l_num_num,
        ],
      })
      sample({
        source: [$num],
        target: [
          //@ts-expect-error
          l_str,
          //@ts-expect-error
          l_num_num,
        ],
      })
      sample({
        source: [$num],
        target: [
          //@ts-expect-error
          l_num_str,
          //@ts-expect-error
          l_str,
        ],
      })
      sample({
        source: [$num],
        target: [
          //@ts-expect-error
          l_num_str,
          //@ts-expect-error
          l_num_num,
        ],
      })
      sample({
        source: [$num] as const,
        target: [
          //@ts-expect-error
          l_str,
        ],
      })
      sample({
        source: [$num] as const,
        target: [
          //@ts-expect-error
          l_num_str,
        ],
      })
      sample({
        source: [$num] as const,
        target: [
          //@ts-expect-error
          l_num_num,
        ],
      })
      sample({
        source: [$num] as const,
        target: [
          l_num,
          //@ts-expect-error
          l_str,
        ],
      })
      sample({
        source: [$num] as const,
        target: [
          l_num,
          //@ts-expect-error
          l_num_str,
        ],
      })
      sample({
        source: [$num] as const,
        target: [
          l_num,
          //@ts-expect-error
          l_num_num,
        ],
      })
      sample({
        source: [$num] as const,
        target: [
          //@ts-expect-error
          l_str,
          //@ts-expect-error
          l_num_num,
        ],
      })
      sample({
        source: [$num] as const,
        target: [
          //@ts-expect-error
          l_num_str,
          //@ts-expect-error
          l_str,
        ],
      })
      sample({
        source: [$num] as const,
        target: [
          //@ts-expect-error
          l_num_str,
          //@ts-expect-error
          l_num_num,
        ],
      })
      sample({
        source: {a:$num},
        clock: num,
        target: [
          //@ts-expect-error
          a_str,
        ],
      })
      sample({
        source: {a:$num},
        clock: num,
        target: [
          //@ts-expect-error
          abn,
        ],
      })
      sample({
        source: {a:$num},
        clock: num,
        target: [
          //@ts-expect-error
          ab,
        ],
      })
      sample({
        source: {a:$num},
        clock: num,
        target: [
          a_num,
          //@ts-expect-error
          a_str,
        ],
      })
      sample({
        source: {a:$num},
        clock: num,
        target: [
          a_num,
          //@ts-expect-error
          abn,
        ],
      })
      sample({
        source: {a:$num},
        clock: num,
        target: [
          a_num,
          //@ts-expect-error
          ab,
        ],
      })
      sample({
        source: {a:$num},
        clock: num,
        target: [
          //@ts-expect-error
          a_str,
          //@ts-expect-error
          ab,
        ],
      })
      sample({
        source: {a:$num},
        clock: num,
        target: [
          //@ts-expect-error
          abn,
          //@ts-expect-error
          a_str,
        ],
      })
      sample({
        source: {a:$num},
        clock: num,
        target: [
          //@ts-expect-error
          abn,
          //@ts-expect-error
          ab,
        ],
      })
      sample({
        source: [$num],
        clock: num,
        target: [
          //@ts-expect-error
          l_str,
        ],
      })
      sample({
        source: [$num],
        clock: num,
        target: [
          //@ts-expect-error
          l_num_str,
        ],
      })
      sample({
        source: [$num],
        clock: num,
        target: [
          //@ts-expect-error
          l_num_num,
        ],
      })
      sample({
        source: [$num],
        clock: num,
        target: [
          l_num,
          //@ts-expect-error
          l_str,
        ],
      })
      sample({
        source: [$num],
        clock: num,
        target: [
          l_num,
          //@ts-expect-error
          l_num_str,
        ],
      })
      sample({
        source: [$num],
        clock: num,
        target: [
          l_num,
          //@ts-expect-error
          l_num_num,
        ],
      })
      sample({
        source: [$num],
        clock: num,
        target: [
          //@ts-expect-error
          l_str,
          //@ts-expect-error
          l_num_num,
        ],
      })
      sample({
        source: [$num],
        clock: num,
        target: [
          //@ts-expect-error
          l_num_str,
          //@ts-expect-error
          l_str,
        ],
      })
      sample({
        source: [$num],
        clock: num,
        target: [
          //@ts-expect-error
          l_num_str,
          //@ts-expect-error
          l_num_num,
        ],
      })
      sample({
        source: [$num] as const,
        clock: num,
        target: [
          //@ts-expect-error
          l_str,
        ],
      })
      sample({
        source: [$num] as const,
        clock: num,
        target: [
          //@ts-expect-error
          l_num_str,
        ],
      })
      sample({
        source: [$num] as const,
        clock: num,
        target: [
          //@ts-expect-error
          l_num_num,
        ],
      })
      sample({
        source: [$num] as const,
        clock: num,
        target: [
          l_num,
          //@ts-expect-error
          l_str,
        ],
      })
      sample({
        source: [$num] as const,
        clock: num,
        target: [
          l_num,
          //@ts-expect-error
          l_num_str,
        ],
      })
      sample({
        source: [$num] as const,
        clock: num,
        target: [
          l_num,
          //@ts-expect-error
          l_num_num,
        ],
      })
      sample({
        source: [$num] as const,
        clock: num,
        target: [
          //@ts-expect-error
          l_str,
          //@ts-expect-error
          l_num_num,
        ],
      })
      sample({
        source: [$num] as const,
        clock: num,
        target: [
          //@ts-expect-error
          l_num_str,
          //@ts-expect-error
          l_str,
        ],
      })
      sample({
        source: [$num] as const,
        clock: num,
        target: [
          //@ts-expect-error
          l_num_str,
          //@ts-expect-error
          l_num_num,
        ],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<AS>' is not assignable to type 'Unit<{ readonly a: number; }>'.
        The types of '__.a' are incompatible between these types.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 11 'source: {a:$num},'
      Property 'b' is missing in type '{ a: StoreWritable<number>; }' but required in type '{ a: Store<number>; b: Store<number>; }'.
      Unmarked error at test line 18 'source: {a:$num},'
      lack of expected error at test line 14 'abn,'
      Property 'b' is missing in type '{ a: StoreWritable<number>; }' but required in type '{ a: Store<number>; b: Store<string>; }'.
      lack of expected error at test line 21 'ab,'
      Type 'EventCallable<AS>' is not assignable to type 'Unit<{ readonly a: number; }>'.
        The types of '__.a' are incompatible between these types.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 34 'target: ['
      Object literal may only specify known properties, and 'target' does not exist in type '{ source: { a: Store<number>; } | { a: Store<number>; b: Store<number>; }; error: \\"source should extend target type\\"; }'.
      Unmarked error at test line 42 'target: ['
      lack of expected error at test line 37 'abn,'
      Object literal may only specify known properties, and 'target' does not exist in type '{ source: { a: Store<number>; } | { a: Store<number>; b: Store<string>; }; error: \\"source should extend target type\\"; }'.
      lack of expected error at test line 45 'ab,'
      Type 'EventCallable<AS>' is not assignable to type 'Unit<{ readonly a: number; }>'.
        The types of '__.a' are incompatible between these types.
          Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 54 'ab,'
      lack of expected error at test line 61 'abn,'
      Type 'EventCallable<AS>' is not assignable to type 'Unit<{ readonly a: number; }>'.
        The types of '__.a' are incompatible between these types.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 67 'source: {a:$num},'
      Type '{ a: StoreWritable<number>; }' is not assignable to type '{ a: Store<number>; b: Store<string>; } | { a: Store<number>; b: Store<number>; }'.
        Property 'b' is missing in type '{ a: StoreWritable<number>; }' but required in type '{ a: Store<number>; b: Store<number>; }'.
      lack of expected error at test line 70 'abn,'
      lack of expected error at test line 72 'ab,'
      Type 'EventCallable<[string]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[string]' is not assignable to type 'readonly [number]'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<[number, string]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[number, string]' is not assignable to type 'readonly [number]'.
            Source has 2 element(s) but target allows only 1.
      Type 'EventCallable<[number, number]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[number, number]' is not assignable to type 'readonly [number]'.
            Source has 2 element(s) but target allows only 1.
      Type 'EventCallable<[string]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[string]' is not assignable to type 'readonly [number]'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<[number, string]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[number, string]' is not assignable to type 'readonly [number]'.
            Source has 2 element(s) but target allows only 1.
      Type 'EventCallable<[number, number]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[number, number]' is not assignable to type 'readonly [number]'.
            Source has 2 element(s) but target allows only 1.
      Type 'EventCallable<[string]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[string]' is not assignable to type 'readonly [number]'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<[number, number]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[number, number]' is not assignable to type 'readonly [number]'.
            Source has 2 element(s) but target allows only 1.
      Type 'EventCallable<[number, string]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[number, string]' is not assignable to type 'readonly [number]'.
            Source has 2 element(s) but target allows only 1.
      Type 'EventCallable<[string]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[string]' is not assignable to type 'readonly [number]'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<[number, string]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[number, string]' is not assignable to type 'readonly [number]'.
            Source has 2 element(s) but target allows only 1.
      Type 'EventCallable<[number, number]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[number, number]' is not assignable to type 'readonly [number]'.
            Source has 2 element(s) but target allows only 1.
      Type 'EventCallable<[string]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[string]' is not assignable to type 'readonly [number]'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<[number, string]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[number, string]' is not assignable to type 'readonly [number]'.
            Source has 2 element(s) but target allows only 1.
      Type 'EventCallable<[number, number]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[number, number]' is not assignable to type 'readonly [number]'.
            Source has 2 element(s) but target allows only 1.
      Type 'EventCallable<[string]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[string]' is not assignable to type 'readonly [number]'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<[number, string]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[number, string]' is not assignable to type 'readonly [number]'.
            Source has 2 element(s) but target allows only 1.
      Type 'EventCallable<[number, number]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[number, number]' is not assignable to type 'readonly [number]'.
            Source has 2 element(s) but target allows only 1.
      Type 'EventCallable<[string]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[string]' is not assignable to type 'readonly [number]'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<[number, number]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[number, number]' is not assignable to type 'readonly [number]'.
            Source has 2 element(s) but target allows only 1.
      Type 'EventCallable<[number, string]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[number, string]' is not assignable to type 'readonly [number]'.
            Source has 2 element(s) but target allows only 1.
      Type 'EventCallable<[string]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[string]' is not assignable to type 'readonly [number]'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<[number, string]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[number, string]' is not assignable to type 'readonly [number]'.
            Source has 2 element(s) but target allows only 1.
      Type 'EventCallable<[number, number]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[number, number]' is not assignable to type 'readonly [number]'.
            Source has 2 element(s) but target allows only 1.
      Type 'EventCallable<AS>' is not assignable to type 'Unit<{ readonly a: number; }>'.
        The types of '__.a' are incompatible between these types.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 228 'source: {a:$num},'
      Property 'b' is missing in type '{ a: StoreWritable<number>; }' but required in type '{ a: Store<number>; b: Store<number>; }'.
      Unmarked error at test line 236 'source: {a:$num},'
      lack of expected error at test line 232 'abn,'
      Property 'b' is missing in type '{ a: StoreWritable<number>; }' but required in type '{ a: Store<number>; b: Store<string>; }'.
      lack of expected error at test line 240 'ab,'
      Type 'EventCallable<AS>' is not assignable to type 'Unit<{ readonly a: number; }>'.
        The types of '__.a' are incompatible between these types.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 254 'clock: num,'
      Object literal may only specify known properties, and 'clock' does not exist in type '{ source: { a: Store<number>; } | { a: Store<number>; b: Store<number>; }; error: \\"source should extend target type\\"; }'.
      Unmarked error at test line 263 'clock: num,'
      lack of expected error at test line 258 'abn,'
      Object literal may only specify known properties, and 'clock' does not exist in type '{ source: { a: Store<number>; } | { a: Store<number>; b: Store<string>; }; error: \\"source should extend target type\\"; }'.
      lack of expected error at test line 267 'ab,'
      Type 'EventCallable<AS>' is not assignable to type 'Unit<{ readonly a: number; }>'.
        The types of '__.a' are incompatible between these types.
          Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 277 'ab,'
      lack of expected error at test line 285 'abn,'
      Type 'EventCallable<AS>' is not assignable to type 'Unit<{ readonly a: number; }>'.
        The types of '__.a' are incompatible between these types.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 291 'source: {a:$num},'
      Type '{ a: StoreWritable<number>; }' is not assignable to type '{ a: Store<number>; b: Store<string>; } | { a: Store<number>; b: Store<number>; }'.
        Property 'b' is missing in type '{ a: StoreWritable<number>; }' but required in type '{ a: Store<number>; b: Store<number>; }'.
      lack of expected error at test line 295 'abn,'
      lack of expected error at test line 297 'ab,'
      Type 'EventCallable<[string]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[string]' is not assignable to type 'readonly [number]'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<[number, string]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[number, string]' is not assignable to type 'readonly [number]'.
            Source has 2 element(s) but target allows only 1.
      Type 'EventCallable<[number, number]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[number, number]' is not assignable to type 'readonly [number]'.
            Source has 2 element(s) but target allows only 1.
      Type 'EventCallable<[string]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[string]' is not assignable to type 'readonly [number]'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<[number, string]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[number, string]' is not assignable to type 'readonly [number]'.
            Source has 2 element(s) but target allows only 1.
      Type 'EventCallable<[number, number]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[number, number]' is not assignable to type 'readonly [number]'.
            Source has 2 element(s) but target allows only 1.
      Type 'EventCallable<[string]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[string]' is not assignable to type 'readonly [number]'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<[number, number]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[number, number]' is not assignable to type 'readonly [number]'.
            Source has 2 element(s) but target allows only 1.
      Type 'EventCallable<[number, string]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[number, string]' is not assignable to type 'readonly [number]'.
            Source has 2 element(s) but target allows only 1.
      Type 'EventCallable<[string]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[string]' is not assignable to type 'readonly [number]'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<[number, string]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[number, string]' is not assignable to type 'readonly [number]'.
            Source has 2 element(s) but target allows only 1.
      Type 'EventCallable<[number, number]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[number, number]' is not assignable to type 'readonly [number]'.
            Source has 2 element(s) but target allows only 1.
      Type 'EventCallable<[string]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[string]' is not assignable to type 'readonly [number]'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<[number, string]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[number, string]' is not assignable to type 'readonly [number]'.
            Source has 2 element(s) but target allows only 1.
      Type 'EventCallable<[number, number]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[number, number]' is not assignable to type 'readonly [number]'.
            Source has 2 element(s) but target allows only 1.
      Type 'EventCallable<[string]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[string]' is not assignable to type 'readonly [number]'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<[number, string]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[number, string]' is not assignable to type 'readonly [number]'.
            Source has 2 element(s) but target allows only 1.
      Type 'EventCallable<[number, number]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[number, number]' is not assignable to type 'readonly [number]'.
            Source has 2 element(s) but target allows only 1.
      Type 'EventCallable<[string]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[string]' is not assignable to type 'readonly [number]'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<[number, number]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[number, number]' is not assignable to type 'readonly [number]'.
            Source has 2 element(s) but target allows only 1.
      Type 'EventCallable<[number, string]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[number, string]' is not assignable to type 'readonly [number]'.
            Source has 2 element(s) but target allows only 1.
      Type 'EventCallable<[string]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[string]' is not assignable to type 'readonly [number]'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<[number, string]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[number, string]' is not assignable to type 'readonly [number]'.
            Source has 2 element(s) but target allows only 1.
      Type 'EventCallable<[number, number]>' is not assignable to type 'Unit<readonly [number]>'.
        Types of property '__' are incompatible.
          Type '[number, number]' is not assignable to type 'readonly [number]'.
            Source has 2 element(s) but target allows only 1.
      "
    `)
  })
})
describe('source:same, fn:untyped', () => {
  test('source:same, fn:untyped (should pass)', () => {
    //prettier-ignore
    {
      sample({source:{a:$num}       , target:[a_num]   , fn:({a}) => ({a,b:''})})
      sample({source:{a:$num}       , target:[ab]      , fn:({a}) => ({a,b:''})})
      sample({source:{a:$num}       , target:[a_num,ab], fn:({a}) => ({a,b:''})})
      sample({source:[$num]         , target:[a_num]   , fn:([a]) => ({a,b:''})})
      sample({source:[$num]         , target:[ab]      , fn:([a]) => ({a,b:''})})
      sample({source:[$num]         , target:[a_num,ab], fn:([a]) => ({a,b:''})})
      sample({source:[$num] as const, target:[a_num]   , fn:([a]) => ({a,b:''})})
      sample({source:[$num] as const, target:[ab]      , fn:([a]) => ({a,b:''})})
      sample({source:[$num] as const, target:[a_num,ab], fn:([a]) => ({a,b:''})})
      sample({source:{a:$num}       , clock:num, target:[a_num]   , fn:({a}) => ({a,b:''})})
      sample({source:{a:$num}       , clock:num, target:[ab]      , fn:({a}) => ({a,b:''})})
      sample({source:{a:$num}       , clock:num, target:[a_num,ab], fn:({a}) => ({a,b:''})})
      sample({source:[$num]         , clock:num, target:[a_num]   , fn:([a]) => ({a,b:''})})
      sample({source:[$num]         , clock:num, target:[ab]      , fn:([a]) => ({a,b:''})})
      sample({source:[$num]         , clock:num, target:[a_num,ab], fn:([a]) => ({a,b:''})})
      sample({source:[$num] as const, clock:num, target:[a_num]   , fn:([a]) => ({a,b:''})})
      sample({source:[$num] as const, clock:num, target:[ab]      , fn:([a]) => ({a,b:''})})
      sample({source:[$num] as const, clock:num, target:[a_num,ab], fn:([a]) => ({a,b:''})})
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('source:same, fn:untyped (should fail)', () => {
    //prettier-ignore
    {
      sample({
        source: {a:$num},
        target: [
          //@ts-expect-error
          a_str,
        ],
        fn: ({a}) => ({a,b:''}),
      })
      sample({
        source: {a:$num},
        target: [
          //@ts-expect-error
          abn,
        ],
        fn: ({a}) => ({a,b:''}),
      })
      sample({
        source: {a:$num},
        target: [
          a_num,
          //@ts-expect-error
          a_str,
        ],
        fn: ({a}) => ({a,b:''}),
      })
      sample({
        source: {a:$num},
        target: [
          a_num,
          //@ts-expect-error
          abn,
        ],
        fn: ({a}) => ({a,b:''}),
      })
      sample({
        source: {a:$num},
        target: [
          //@ts-expect-error
          a_str,
          ab,
        ],
        fn: ({a}) => ({a,b:''}),
      })
      sample({
        source: {a:$num},
        target: [
          //@ts-expect-error
          abn,
          //@ts-expect-error
          a_str,
        ],
        fn: ({a}) => ({a,b:''}),
      })
      sample({
        source: {a:$num},
        target: [
          //@ts-expect-error
          abn,
          ab,
        ],
        fn: ({a}) => ({a,b:''}),
      })
      sample({
        source: [$num],
        target: [
          //@ts-expect-error
          a_str,
        ],
        fn: ([a]) => ({a,b:''}),
      })
      sample({
        source: [$num],
        target: [
          //@ts-expect-error
          abn,
        ],
        fn: ([a]) => ({a,b:''}),
      })
      sample({
        source: [$num],
        target: [
          a_num,
          //@ts-expect-error
          a_str,
        ],
        fn: ([a]) => ({a,b:''}),
      })
      sample({
        source: [$num],
        target: [
          a_num,
          //@ts-expect-error
          abn,
        ],
        fn: ([a]) => ({a,b:''}),
      })
      sample({
        source: [$num],
        target: [
          //@ts-expect-error
          a_str,
          ab,
        ],
        fn: ([a]) => ({a,b:''}),
      })
      sample({
        source: [$num],
        target: [
          //@ts-expect-error
          abn,
          //@ts-expect-error
          a_str,
        ],
        fn: ([a]) => ({a,b:''}),
      })
      sample({
        source: [$num],
        target: [
          //@ts-expect-error
          abn,
          ab,
        ],
        fn: ([a]) => ({a,b:''}),
      })
      sample({
        source: [$num] as const,
        target: [
          //@ts-expect-error
          a_str,
        ],
        fn: ([a]) => ({a,b:''}),
      })
      sample({
        source: [$num] as const,
        target: [
          //@ts-expect-error
          abn,
        ],
        fn: ([a]) => ({a,b:''}),
      })
      sample({
        source: [$num] as const,
        target: [
          a_num,
          //@ts-expect-error
          a_str,
        ],
        fn: ([a]) => ({a,b:''}),
      })
      sample({
        source: [$num] as const,
        target: [
          a_num,
          //@ts-expect-error
          abn,
        ],
        fn: ([a]) => ({a,b:''}),
      })
      sample({
        source: [$num] as const,
        target: [
          //@ts-expect-error
          a_str,
          ab,
        ],
        fn: ([a]) => ({a,b:''}),
      })
      sample({
        source: [$num] as const,
        target: [
          //@ts-expect-error
          abn,
          //@ts-expect-error
          a_str,
        ],
        fn: ([a]) => ({a,b:''}),
      })
      sample({
        source: [$num] as const,
        target: [
          //@ts-expect-error
          abn,
          ab,
        ],
        fn: ([a]) => ({a,b:''}),
      })
      sample({
        source: {a:$num},
        clock: num,
        target: [
          //@ts-expect-error
          a_str,
        ],
        fn: ({a}) => ({a,b:''}),
      })
      sample({
        source: {a:$num},
        clock: num,
        target: [
          //@ts-expect-error
          abn,
        ],
        fn: ({a}) => ({a,b:''}),
      })
      sample({
        source: {a:$num},
        clock: num,
        target: [
          a_num,
          //@ts-expect-error
          a_str,
        ],
        fn: ({a}) => ({a,b:''}),
      })
      sample({
        source: {a:$num},
        clock: num,
        target: [
          a_num,
          //@ts-expect-error
          abn,
        ],
        fn: ({a}) => ({a,b:''}),
      })
      sample({
        source: {a:$num},
        clock: num,
        target: [
          //@ts-expect-error
          a_str,
          ab,
        ],
        fn: ({a}) => ({a,b:''}),
      })
      sample({
        source: {a:$num},
        clock: num,
        target: [
          //@ts-expect-error
          abn,
          //@ts-expect-error
          a_str,
        ],
        fn: ({a}) => ({a,b:''}),
      })
      sample({
        source: {a:$num},
        clock: num,
        target: [
          //@ts-expect-error
          abn,
          ab,
        ],
        fn: ({a}) => ({a,b:''}),
      })
      sample({
        source: [$num],
        clock: num,
        target: [
          //@ts-expect-error
          a_str,
        ],
        fn: ([a]) => ({a,b:''}),
      })
      sample({
        source: [$num],
        clock: num,
        target: [
          //@ts-expect-error
          abn,
        ],
        fn: ([a]) => ({a,b:''}),
      })
      sample({
        source: [$num],
        clock: num,
        target: [
          a_num,
          //@ts-expect-error
          a_str,
        ],
        fn: ([a]) => ({a,b:''}),
      })
      sample({
        source: [$num],
        clock: num,
        target: [
          a_num,
          //@ts-expect-error
          abn,
        ],
        fn: ([a]) => ({a,b:''}),
      })
      sample({
        source: [$num],
        clock: num,
        target: [
          //@ts-expect-error
          a_str,
          ab,
        ],
        fn: ([a]) => ({a,b:''}),
      })
      sample({
        source: [$num],
        clock: num,
        target: [
          //@ts-expect-error
          abn,
          //@ts-expect-error
          a_str,
        ],
        fn: ([a]) => ({a,b:''}),
      })
      sample({
        source: [$num],
        clock: num,
        target: [
          //@ts-expect-error
          abn,
          ab,
        ],
        fn: ([a]) => ({a,b:''}),
      })
      sample({
        source: [$num] as const,
        clock: num,
        target: [
          //@ts-expect-error
          a_str,
        ],
        fn: ([a]) => ({a,b:''}),
      })
      sample({
        source: [$num] as const,
        clock: num,
        target: [
          //@ts-expect-error
          abn,
        ],
        fn: ([a]) => ({a,b:''}),
      })
      sample({
        source: [$num] as const,
        clock: num,
        target: [
          a_num,
          //@ts-expect-error
          a_str,
        ],
        fn: ([a]) => ({a,b:''}),
      })
      sample({
        source: [$num] as const,
        clock: num,
        target: [
          a_num,
          //@ts-expect-error
          abn,
        ],
        fn: ([a]) => ({a,b:''}),
      })
      sample({
        source: [$num] as const,
        clock: num,
        target: [
          //@ts-expect-error
          a_str,
          ab,
        ],
        fn: ([a]) => ({a,b:''}),
      })
      sample({
        source: [$num] as const,
        clock: num,
        target: [
          //@ts-expect-error
          abn,
          //@ts-expect-error
          a_str,
        ],
        fn: ([a]) => ({a,b:''}),
      })
      sample({
        source: [$num] as const,
        clock: num,
        target: [
          //@ts-expect-error
          abn,
          ab,
        ],
        fn: ([a]) => ({a,b:''}),
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Unmarked error at test line 9 'fn: ({a}) => ({a,b:''}),'
      lack of expected error at test line 7 'a_str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 17 'fn: ({a}) => ({a,b:''}),'
      lack of expected error at test line 15 'abn,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 26 'fn: ({a}) => ({a,b:''}),'
      lack of expected error at test line 24 'a_str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 35 'fn: ({a}) => ({a,b:''}),'
      lack of expected error at test line 33 'abn,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 44 'fn: ({a}) => ({a,b:''}),'
      lack of expected error at test line 41 'a_str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 54 'fn: ({a}) => ({a,b:''}),'
      lack of expected error at test line 50 'abn,'
      lack of expected error at test line 52 'a_str,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 63 'fn: ({a}) => ({a,b:''}),'
      lack of expected error at test line 60 'abn,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 71 'fn: ([a]) => ({a,b:''}),'
      lack of expected error at test line 69 'a_str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 79 'fn: ([a]) => ({a,b:''}),'
      lack of expected error at test line 77 'abn,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 88 'fn: ([a]) => ({a,b:''}),'
      lack of expected error at test line 86 'a_str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 97 'fn: ([a]) => ({a,b:''}),'
      lack of expected error at test line 95 'abn,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 106 'fn: ([a]) => ({a,b:''}),'
      lack of expected error at test line 103 'a_str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 116 'fn: ([a]) => ({a,b:''}),'
      lack of expected error at test line 112 'abn,'
      lack of expected error at test line 114 'a_str,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 125 'fn: ([a]) => ({a,b:''}),'
      lack of expected error at test line 122 'abn,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 133 'fn: ([a]) => ({a,b:''}),'
      lack of expected error at test line 131 'a_str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 141 'fn: ([a]) => ({a,b:''}),'
      lack of expected error at test line 139 'abn,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 150 'fn: ([a]) => ({a,b:''}),'
      lack of expected error at test line 148 'a_str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 159 'fn: ([a]) => ({a,b:''}),'
      lack of expected error at test line 157 'abn,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 168 'fn: ([a]) => ({a,b:''}),'
      lack of expected error at test line 165 'a_str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 178 'fn: ([a]) => ({a,b:''}),'
      lack of expected error at test line 174 'abn,'
      lack of expected error at test line 176 'a_str,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 187 'fn: ([a]) => ({a,b:''}),'
      lack of expected error at test line 184 'abn,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 196 'fn: ({a}) => ({a,b:''}),'
      lack of expected error at test line 194 'a_str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 205 'fn: ({a}) => ({a,b:''}),'
      lack of expected error at test line 203 'abn,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 215 'fn: ({a}) => ({a,b:''}),'
      lack of expected error at test line 213 'a_str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 225 'fn: ({a}) => ({a,b:''}),'
      lack of expected error at test line 223 'abn,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 235 'fn: ({a}) => ({a,b:''}),'
      lack of expected error at test line 232 'a_str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 246 'fn: ({a}) => ({a,b:''}),'
      lack of expected error at test line 242 'abn,'
      lack of expected error at test line 244 'a_str,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 256 'fn: ({a}) => ({a,b:''}),'
      lack of expected error at test line 253 'abn,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 265 'fn: ([a]) => ({a,b:''}),'
      lack of expected error at test line 263 'a_str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 274 'fn: ([a]) => ({a,b:''}),'
      lack of expected error at test line 272 'abn,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 284 'fn: ([a]) => ({a,b:''}),'
      lack of expected error at test line 282 'a_str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 294 'fn: ([a]) => ({a,b:''}),'
      lack of expected error at test line 292 'abn,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 304 'fn: ([a]) => ({a,b:''}),'
      lack of expected error at test line 301 'a_str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 315 'fn: ([a]) => ({a,b:''}),'
      lack of expected error at test line 311 'abn,'
      lack of expected error at test line 313 'a_str,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 325 'fn: ([a]) => ({a,b:''}),'
      lack of expected error at test line 322 'abn,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 334 'fn: ([a]) => ({a,b:''}),'
      lack of expected error at test line 332 'a_str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 343 'fn: ([a]) => ({a,b:''}),'
      lack of expected error at test line 341 'abn,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 353 'fn: ([a]) => ({a,b:''}),'
      lack of expected error at test line 351 'a_str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 363 'fn: ([a]) => ({a,b:''}),'
      lack of expected error at test line 361 'abn,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 373 'fn: ([a]) => ({a,b:''}),'
      lack of expected error at test line 370 'a_str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 384 'fn: ([a]) => ({a,b:''}),'
      lack of expected error at test line 380 'abn,'
      lack of expected error at test line 382 'a_str,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 394 'fn: ([a]) => ({a,b:''}),'
      lack of expected error at test line 391 'abn,'
      Type 'string' is not assignable to type 'number'.
      "
    `)
  })
})
