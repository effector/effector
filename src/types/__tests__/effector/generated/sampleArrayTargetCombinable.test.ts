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
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number]; }[]; }'.
      Unmarked error at test line 7 'sample({source:[$num,$str]         , target:[l_num_str]      })'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string]; }[]; }'.
      Unmarked error at test line 8 'sample({source:[$num,$str]         , target:[l_num,l_num_str]})'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string] | [number]; }[]; }'.
      Unmarked error at test line 9 'sample({source:[$num,$str] as const, target:[l_num]          })'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number, string]; targetType: [number]; }[]; }'.
      Unmarked error at test line 15 'sample({source:[$num,$str]         , clock:num, target:[l_num]          })'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number]; }[]; }'.
      Unmarked error at test line 16 'sample({source:[$num,$str]         , clock:num, target:[l_num_str]      })'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string]; }[]; }'.
      Unmarked error at test line 17 'sample({source:[$num,$str]         , clock:num, target:[l_num,l_num_str]})'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string] | [number]; }[]; }'.
      Unmarked error at test line 18 'sample({source:[$num,$str] as const, clock:num, target:[l_num]          })'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number, string]; targetType: [number]; }[]; }'.
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
      Unmarked error at test line 4 'source: {a:$num,b:$str},'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: AS; }[]; }'.
      Unmarked error at test line 11 'source: {a:$num,b:$str},'
      lack of expected error at test line 7 'a_str,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }[]; }'.
      Unmarked error at test line 42 'source: {a:$num,b:$str},'
      lack of expected error at test line 14 'abn,'
      lack of expected error at test line 22 'a_str,'
      lack of expected error at test line 30 'abn,'
      lack of expected error at test line 37 'a_str,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: AS | ABN; }[]; }'.
      Unmarked error at test line 59 'source: [$num,$str],'
      lack of expected error at test line 45 'abn,'
      lack of expected error at test line 47 'a_str,'
      lack of expected error at test line 54 'abn,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [string]; }[]; }'.
      Unmarked error at test line 66 'source: [$num,$str],'
      lack of expected error at test line 62 'l_str,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number]; }[]; }'.
      Unmarked error at test line 73 'source: [$num,$str],'
      lack of expected error at test line 69 'l_num_num,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [string] | [number]; }[]; }'.
      Unmarked error at test line 81 'source: [$num,$str],'
      lack of expected error at test line 77 'l_str,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number] | [number]; }[]; }'.
      Unmarked error at test line 89 'source: [$num,$str],'
      lack of expected error at test line 85 'l_num_num,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number] | [string]; }[]; }'.
      Unmarked error at test line 98 'source: [$num,$str],'
      lack of expected error at test line 92 'l_str,'
      lack of expected error at test line 94 'l_num_num,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [string] | [number, string]; }[]; }'.
      Unmarked error at test line 106 'source: [$num,$str],'
      lack of expected error at test line 102 'l_str,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number] | [number, string]; }[]; }'.
      Unmarked error at test line 114 'source: [$num,$str] as const,'
      lack of expected error at test line 110 'l_num_num,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number, string]; targetType: [string]; }[]; }'.
      Unmarked error at test line 121 'source: [$num,$str] as const,'
      lack of expected error at test line 117 'l_str,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number, string]; targetType: [number, number]; }[]; }'.
      Unmarked error at test line 128 'source: [$num,$str] as const,'
      lack of expected error at test line 124 'l_num_num,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number, string]; targetType: [string] | [number]; }[]; }'.
      Unmarked error at test line 136 'source: [$num,$str] as const,'
      lack of expected error at test line 132 'l_str,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number, string]; targetType: [number, number] | [number]; }[]; }'.
      Unmarked error at test line 144 'source: [$num,$str] as const,'
      lack of expected error at test line 140 'l_num_num,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number, string]; targetType: [number, number] | [string]; }[]; }'.
      Unmarked error at test line 169 'source: {a:$num,b:$str},'
      lack of expected error at test line 147 'l_str,'
      lack of expected error at test line 149 'l_num_num,'
      lack of expected error at test line 157 'l_str,'
      lack of expected error at test line 165 'l_num_num,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: AS; }[]; }'.
      Unmarked error at test line 177 'source: {a:$num,b:$str},'
      lack of expected error at test line 173 'a_str,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }[]; }'.
      Unmarked error at test line 212 'source: {a:$num,b:$str},'
      lack of expected error at test line 181 'abn,'
      lack of expected error at test line 190 'a_str,'
      lack of expected error at test line 199 'abn,'
      lack of expected error at test line 207 'a_str,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: AS | ABN; }[]; }'.
      Unmarked error at test line 231 'source: [$num,$str],'
      lack of expected error at test line 216 'abn,'
      lack of expected error at test line 218 'a_str,'
      lack of expected error at test line 226 'abn,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [string]; }[]; }'.
      Unmarked error at test line 239 'source: [$num,$str],'
      lack of expected error at test line 235 'l_str,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number]; }[]; }'.
      Unmarked error at test line 247 'source: [$num,$str],'
      lack of expected error at test line 243 'l_num_num,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [string] | [number]; }[]; }'.
      Unmarked error at test line 256 'source: [$num,$str],'
      lack of expected error at test line 252 'l_str,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number] | [number]; }[]; }'.
      Unmarked error at test line 265 'source: [$num,$str],'
      lack of expected error at test line 261 'l_num_num,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number] | [string]; }[]; }'.
      Unmarked error at test line 275 'source: [$num,$str],'
      lack of expected error at test line 269 'l_str,'
      lack of expected error at test line 271 'l_num_num,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [string] | [number, string]; }[]; }'.
      Unmarked error at test line 284 'source: [$num,$str],'
      lack of expected error at test line 280 'l_str,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number] | [number, string]; }[]; }'.
      Unmarked error at test line 293 'source: [$num,$str] as const,'
      lack of expected error at test line 289 'l_num_num,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number, string]; targetType: [string]; }[]; }'.
      Unmarked error at test line 301 'source: [$num,$str] as const,'
      lack of expected error at test line 297 'l_str,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number, string]; targetType: [number, number]; }[]; }'.
      Unmarked error at test line 309 'source: [$num,$str] as const,'
      lack of expected error at test line 305 'l_num_num,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number, string]; targetType: [string] | [number]; }[]; }'.
      Unmarked error at test line 318 'source: [$num,$str] as const,'
      lack of expected error at test line 314 'l_str,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number, string]; targetType: [number, number] | [number]; }[]; }'.
      Unmarked error at test line 327 'source: [$num,$str] as const,'
      lack of expected error at test line 323 'l_num_num,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number, string]; targetType: [number, number] | [string]; }[]; }'.
      lack of expected error at test line 331 'l_str,'
      lack of expected error at test line 333 'l_num_num,'
      lack of expected error at test line 342 'l_str,'
      lack of expected error at test line 351 'l_num_num,'
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
      Unmarked error at test line 6 'sample({source:[$num,$str]         , target:[a_num]   , fn:([a,b]) => ({a,b})})'
      Type 'string | number' is not assignable to type 'number'.
        Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 7 'sample({source:[$num,$str]         , target:[ab]      , fn:([a,b]) => ({a,b})})'
      Type 'string | number' is not assignable to type 'number'.
        Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 7 'sample({source:[$num,$str]         , target:[ab]      , fn:([a,b]) => ({a,b})})'
      Type 'string | number' is not assignable to type 'string'.
        Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 8 'sample({source:[$num,$str]         , target:[a_num,ab], fn:([a,b]) => ({a,b})})'
      Type 'string | number' is not assignable to type 'number'.
        Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 8 'sample({source:[$num,$str]         , target:[a_num,ab], fn:([a,b]) => ({a,b})})'
      Type 'string | number' is not assignable to type 'string'.
        Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 15 'sample({source:[$num,$str]         , clock:num, target:[a_num]   , fn:([a,b]) => ({a,b})})'
      Type 'string | number' is not assignable to type 'number'.
        Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 16 'sample({source:[$num,$str]         , clock:num, target:[ab]      , fn:([a,b]) => ({a,b})})'
      Type 'string | number' is not assignable to type 'number'.
        Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 16 'sample({source:[$num,$str]         , clock:num, target:[ab]      , fn:([a,b]) => ({a,b})})'
      Type 'string | number' is not assignable to type 'string'.
        Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 17 'sample({source:[$num,$str]         , clock:num, target:[a_num,ab], fn:([a,b]) => ({a,b})})'
      Type 'string | number' is not assignable to type 'number'.
        Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 17 'sample({source:[$num,$str]         , clock:num, target:[a_num,ab], fn:([a,b]) => ({a,b})})'
      Type 'string | number' is not assignable to type 'string'.
        Type 'number' is not assignable to type 'string'.
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
      Unmarked error at test line 54 'fn: ({a,b}) => ({a,b}),'
      lack of expected error at test line 24 'a_str,'
      lack of expected error at test line 33 'abn,'
      lack of expected error at test line 41 'a_str,'
      lack of expected error at test line 50 'abn,'
      lack of expected error at test line 52 'a_str,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 71 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 60 'abn,'
      lack of expected error at test line 69 'a_str,'
      Type 'string | number' is not assignable to type 'string'.
        Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 79 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 77 'abn,'
      Type 'string | number' is not assignable to type 'number'.
        Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 79 'fn: ([a,b]) => ({a,b}),'
      Type 'string | number' is not assignable to type 'number'.
        Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 88 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 86 'a_str,'
      Type '{ a: string | number; b: string | number; }' is not assignable to type 'AN | AS'.
        Type '{ a: string | number; b: string | number; }' is not assignable to type 'AS'.
          Types of property 'a' are incompatible.
            Type 'string | number' is not assignable to type 'string'.
              Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 97 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 95 'abn,'
      Type 'string | number' is not assignable to type 'number'.
        Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 97 'fn: ([a,b]) => ({a,b}),'
      Type 'string | number' is not assignable to type 'number'.
        Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 106 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 103 'a_str,'
      Type 'string | number' is not assignable to type 'string'.
        Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 116 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 112 'abn,'
      lack of expected error at test line 114 'a_str,'
      Type 'string | number' is not assignable to type 'number'.
        Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 125 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 122 'abn,'
      Type 'string | number' is not assignable to type 'number'.
        Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 133 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 131 'a_str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 141 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 139 'abn,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 178 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 148 'a_str,'
      lack of expected error at test line 157 'abn,'
      lack of expected error at test line 165 'a_str,'
      lack of expected error at test line 174 'abn,'
      lack of expected error at test line 176 'a_str,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 196 'fn: ({a,b}) => ({a,b}),'
      lack of expected error at test line 184 'abn,'
      lack of expected error at test line 194 'a_str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 205 'fn: ({a,b}) => ({a,b}),'
      lack of expected error at test line 203 'abn,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 246 'fn: ({a,b}) => ({a,b}),'
      lack of expected error at test line 213 'a_str,'
      lack of expected error at test line 223 'abn,'
      lack of expected error at test line 232 'a_str,'
      lack of expected error at test line 242 'abn,'
      lack of expected error at test line 244 'a_str,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 265 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 253 'abn,'
      lack of expected error at test line 263 'a_str,'
      Type 'string | number' is not assignable to type 'string'.
        Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 274 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 272 'abn,'
      Type 'string | number' is not assignable to type 'number'.
        Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 274 'fn: ([a,b]) => ({a,b}),'
      Type 'string | number' is not assignable to type 'number'.
        Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 284 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 282 'a_str,'
      Type '{ a: string | number; b: string | number; }' is not assignable to type 'AN | AS'.
        Type '{ a: string | number; b: string | number; }' is not assignable to type 'AS'.
          Types of property 'a' are incompatible.
            Type 'string | number' is not assignable to type 'string'.
              Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 294 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 292 'abn,'
      Type 'string | number' is not assignable to type 'number'.
        Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 294 'fn: ([a,b]) => ({a,b}),'
      Type 'string | number' is not assignable to type 'number'.
        Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 304 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 301 'a_str,'
      Type 'string | number' is not assignable to type 'string'.
        Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 315 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 311 'abn,'
      lack of expected error at test line 313 'a_str,'
      Type 'string | number' is not assignable to type 'number'.
        Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 325 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 322 'abn,'
      Type 'string | number' is not assignable to type 'number'.
        Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 334 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 332 'a_str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 343 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 341 'abn,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 384 'fn: ([a,b]) => ({a,b}),'
      lack of expected error at test line 351 'a_str,'
      lack of expected error at test line 361 'abn,'
      lack of expected error at test line 370 'a_str,'
      lack of expected error at test line 380 'abn,'
      lack of expected error at test line 382 'a_str,'
      Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 391 'abn,'
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
      Unmarked error at test line 4 'sample({source:[$num]         , target:[l_num]})'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number]; }[]; }'.
      Unmarked error at test line 7 'sample({source:[$num]         , clock:num, target:[l_num]})'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number]; }[]; }'.
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
      Unmarked error at test line 4 'source: {a:$num},'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AS; }[]; }'.
      Unmarked error at test line 11 'source: {a:$num},'
      lack of expected error at test line 7 'a_str,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: ABN; }[]; }'.
      Unmarked error at test line 18 'source: {a:$num},'
      lack of expected error at test line 14 'abn,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB; }[]; }'.
      Unmarked error at test line 49 'source: {a:$num},'
      lack of expected error at test line 21 'ab,'
      lack of expected error at test line 29 'a_str,'
      lack of expected error at test line 37 'abn,'
      lack of expected error at test line 45 'ab,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AS | AB; }[]; }'.
      Unmarked error at test line 58 'source: {a:$num},'
      lack of expected error at test line 52 'a_str,'
      lack of expected error at test line 54 'ab,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AS | ABN; }[]; }'.
      Unmarked error at test line 67 'source: {a:$num},'
      lack of expected error at test line 61 'abn,'
      lack of expected error at test line 63 'a_str,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB | ABN; }[]; }'.
      Unmarked error at test line 76 'source: [$num],'
      lack of expected error at test line 70 'abn,'
      lack of expected error at test line 72 'ab,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [string]; }[]; }'.
      Unmarked error at test line 83 'source: [$num],'
      lack of expected error at test line 79 'l_str,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, string]; }[]; }'.
      Unmarked error at test line 90 'source: [$num],'
      lack of expected error at test line 86 'l_num_str,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number]; }[]; }'.
      Unmarked error at test line 97 'source: [$num],'
      lack of expected error at test line 93 'l_num_num,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [string] | [number]; }[]; }'.
      Unmarked error at test line 105 'source: [$num],'
      lack of expected error at test line 101 'l_str,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, string] | [number]; }[]; }'.
      Unmarked error at test line 113 'source: [$num],'
      lack of expected error at test line 109 'l_num_str,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number] | [number]; }[]; }'.
      Unmarked error at test line 121 'source: [$num],'
      lack of expected error at test line 117 'l_num_num,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number] | [string]; }[]; }'.
      Unmarked error at test line 130 'source: [$num],'
      lack of expected error at test line 124 'l_str,'
      lack of expected error at test line 126 'l_num_num,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [string] | [number, string]; }[]; }'.
      Unmarked error at test line 139 'source: [$num],'
      lack of expected error at test line 133 'l_num_str,'
      lack of expected error at test line 135 'l_str,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number] | [number, string]; }[]; }'.
      Unmarked error at test line 148 'source: [$num] as const,'
      lack of expected error at test line 142 'l_num_str,'
      lack of expected error at test line 144 'l_num_num,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [string]; }[]; }'.
      Unmarked error at test line 155 'source: [$num] as const,'
      lack of expected error at test line 151 'l_str,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [number, string]; }[]; }'.
      Unmarked error at test line 162 'source: [$num] as const,'
      lack of expected error at test line 158 'l_num_str,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [number, number]; }[]; }'.
      Unmarked error at test line 193 'source: [$num] as const,'
      lack of expected error at test line 165 'l_num_num,'
      lack of expected error at test line 173 'l_str,'
      lack of expected error at test line 181 'l_num_str,'
      lack of expected error at test line 189 'l_num_num,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [number, number] | [string]; }[]; }'.
      Unmarked error at test line 202 'source: [$num] as const,'
      lack of expected error at test line 196 'l_str,'
      lack of expected error at test line 198 'l_num_num,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [string] | [number, string]; }[]; }'.
      Unmarked error at test line 211 'source: [$num] as const,'
      lack of expected error at test line 205 'l_num_str,'
      lack of expected error at test line 207 'l_str,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [number, number] | [number, string]; }[]; }'.
      Unmarked error at test line 220 'source: {a:$num},'
      lack of expected error at test line 214 'l_num_str,'
      lack of expected error at test line 216 'l_num_num,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AS; }[]; }'.
      Unmarked error at test line 228 'source: {a:$num},'
      lack of expected error at test line 224 'a_str,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: ABN; }[]; }'.
      Unmarked error at test line 236 'source: {a:$num},'
      lack of expected error at test line 232 'abn,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB; }[]; }'.
      Unmarked error at test line 271 'source: {a:$num},'
      lack of expected error at test line 240 'ab,'
      lack of expected error at test line 249 'a_str,'
      lack of expected error at test line 258 'abn,'
      lack of expected error at test line 267 'ab,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AS | AB; }[]; }'.
      Unmarked error at test line 281 'source: {a:$num},'
      lack of expected error at test line 275 'a_str,'
      lack of expected error at test line 277 'ab,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AS | ABN; }[]; }'.
      Unmarked error at test line 291 'source: {a:$num},'
      lack of expected error at test line 285 'abn,'
      lack of expected error at test line 287 'a_str,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB | ABN; }[]; }'.
      Unmarked error at test line 301 'source: [$num],'
      lack of expected error at test line 295 'abn,'
      lack of expected error at test line 297 'ab,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [string]; }[]; }'.
      Unmarked error at test line 309 'source: [$num],'
      lack of expected error at test line 305 'l_str,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, string]; }[]; }'.
      Unmarked error at test line 317 'source: [$num],'
      lack of expected error at test line 313 'l_num_str,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number]; }[]; }'.
      Unmarked error at test line 325 'source: [$num],'
      lack of expected error at test line 321 'l_num_num,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [string] | [number]; }[]; }'.
      Unmarked error at test line 334 'source: [$num],'
      lack of expected error at test line 330 'l_str,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, string] | [number]; }[]; }'.
      Unmarked error at test line 343 'source: [$num],'
      lack of expected error at test line 339 'l_num_str,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number] | [number]; }[]; }'.
      Unmarked error at test line 352 'source: [$num],'
      lack of expected error at test line 348 'l_num_num,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number] | [string]; }[]; }'.
      Unmarked error at test line 362 'source: [$num],'
      lack of expected error at test line 356 'l_str,'
      lack of expected error at test line 358 'l_num_num,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [string] | [number, string]; }[]; }'.
      Unmarked error at test line 372 'source: [$num],'
      lack of expected error at test line 366 'l_num_str,'
      lack of expected error at test line 368 'l_str,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number] | [number, string]; }[]; }'.
      Unmarked error at test line 382 'source: [$num] as const,'
      lack of expected error at test line 376 'l_num_str,'
      lack of expected error at test line 378 'l_num_num,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [string]; }[]; }'.
      Unmarked error at test line 390 'source: [$num] as const,'
      lack of expected error at test line 386 'l_str,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [number, string]; }[]; }'.
      Unmarked error at test line 398 'source: [$num] as const,'
      lack of expected error at test line 394 'l_num_str,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [number, number]; }[]; }'.
      Unmarked error at test line 433 'source: [$num] as const,'
      lack of expected error at test line 402 'l_num_num,'
      lack of expected error at test line 411 'l_str,'
      lack of expected error at test line 420 'l_num_str,'
      lack of expected error at test line 429 'l_num_num,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [number, number] | [string]; }[]; }'.
      Unmarked error at test line 443 'source: [$num] as const,'
      lack of expected error at test line 437 'l_str,'
      lack of expected error at test line 439 'l_num_num,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [string] | [number, string]; }[]; }'.
      Unmarked error at test line 453 'source: [$num] as const,'
      lack of expected error at test line 447 'l_num_str,'
      lack of expected error at test line 449 'l_str,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [number, number] | [number, string]; }[]; }'.
      lack of expected error at test line 457 'l_num_str,'
      lack of expected error at test line 459 'l_num_num,'
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
      Unmarked error at test line 54 'fn: ({a}) => ({a,b:''}),'
      lack of expected error at test line 24 'a_str,'
      lack of expected error at test line 33 'abn,'
      lack of expected error at test line 41 'a_str,'
      lack of expected error at test line 50 'abn,'
      lack of expected error at test line 52 'a_str,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 71 'fn: ([a]) => ({a,b:''}),'
      lack of expected error at test line 60 'abn,'
      lack of expected error at test line 69 'a_str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 79 'fn: ([a]) => ({a,b:''}),'
      lack of expected error at test line 77 'abn,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 116 'fn: ([a]) => ({a,b:''}),'
      lack of expected error at test line 86 'a_str,'
      lack of expected error at test line 95 'abn,'
      lack of expected error at test line 103 'a_str,'
      lack of expected error at test line 112 'abn,'
      lack of expected error at test line 114 'a_str,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 133 'fn: ([a]) => ({a,b:''}),'
      lack of expected error at test line 122 'abn,'
      lack of expected error at test line 131 'a_str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 141 'fn: ([a]) => ({a,b:''}),'
      lack of expected error at test line 139 'abn,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 178 'fn: ([a]) => ({a,b:''}),'
      lack of expected error at test line 148 'a_str,'
      lack of expected error at test line 157 'abn,'
      lack of expected error at test line 165 'a_str,'
      lack of expected error at test line 174 'abn,'
      lack of expected error at test line 176 'a_str,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 196 'fn: ({a}) => ({a,b:''}),'
      lack of expected error at test line 184 'abn,'
      lack of expected error at test line 194 'a_str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 205 'fn: ({a}) => ({a,b:''}),'
      lack of expected error at test line 203 'abn,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 246 'fn: ({a}) => ({a,b:''}),'
      lack of expected error at test line 213 'a_str,'
      lack of expected error at test line 223 'abn,'
      lack of expected error at test line 232 'a_str,'
      lack of expected error at test line 242 'abn,'
      lack of expected error at test line 244 'a_str,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 265 'fn: ([a]) => ({a,b:''}),'
      lack of expected error at test line 253 'abn,'
      lack of expected error at test line 263 'a_str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 274 'fn: ([a]) => ({a,b:''}),'
      lack of expected error at test line 272 'abn,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 315 'fn: ([a]) => ({a,b:''}),'
      lack of expected error at test line 282 'a_str,'
      lack of expected error at test line 292 'abn,'
      lack of expected error at test line 301 'a_str,'
      lack of expected error at test line 311 'abn,'
      lack of expected error at test line 313 'a_str,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 334 'fn: ([a]) => ({a,b:''}),'
      lack of expected error at test line 322 'abn,'
      lack of expected error at test line 332 'a_str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 343 'fn: ([a]) => ({a,b:''}),'
      lack of expected error at test line 341 'abn,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 384 'fn: ([a]) => ({a,b:''}),'
      lack of expected error at test line 351 'a_str,'
      lack of expected error at test line 361 'abn,'
      lack of expected error at test line 370 'a_str,'
      lack of expected error at test line 380 'abn,'
      lack of expected error at test line 382 'a_str,'
      Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 391 'abn,'
      "
    `)
  })
})
