/* eslint-disable no-unused-vars */
import {createStore, createEvent, sample, combine} from 'effector'
const typecheck = '{global}'

/** used as valid source type */
type AN = {a: number}
/** used as invalid source type */
type AS = {a: string}
/** used as valid source type */
type AB = {a: number; b: string}
/** used as invalid source type */
type ABN = {a: number; b: number}
const voidt = createEvent()
const anyt = createEvent<any>()
const str = createEvent<string>()
const num = createEvent<number>()
const numStr = createEvent<number | string>()
const strBool = createEvent<string | boolean>()
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

describe('basic cases', () => {
  describe('no fn', () => {
    test('no fn (should pass)', () => {
      //prettier-ignore
      {
        sample({source: str, clock: str, target: [numStr,anyt]})
        sample({source: num, clock: str, target: [numStr,anyt]})
        sample({source: str, clock: num, target: [numStr,anyt]})
        sample({source: num, clock: num, target: [numStr,anyt]})
        sample({source: str, clock: str, target: [numStr,voidt]})
        sample({source: num, clock: str, target: [numStr,voidt]})
        sample({source: str, clock: num, target: [numStr,voidt]})
        sample({source: num, clock: num, target: [numStr,voidt]})
        sample({source: str, clock: str, target: [strBool,numStr]})
        sample({source: str, clock: num, target: [strBool,numStr]})
        sample({source: str, clock: str, target: [strBool,anyt]})
        sample({source: str, clock: num, target: [strBool,anyt]})
        sample({source: str, clock: str, target: [strBool,voidt]})
        sample({source: str, clock: num, target: [strBool,voidt]})
        sample({source: str, clock: str, target: [anyt,numStr]})
        sample({source: num, clock: str, target: [anyt,numStr]})
        sample({source: str, clock: num, target: [anyt,numStr]})
        sample({source: num, clock: num, target: [anyt,numStr]})
        sample({source: str, clock: str, target: [anyt,voidt]})
        sample({source: num, clock: str, target: [anyt,voidt]})
        sample({source: str, clock: num, target: [anyt,voidt]})
        sample({source: num, clock: num, target: [anyt,voidt]})
        sample({source: str, clock: str, target: [str,numStr]})
        sample({source: str, clock: num, target: [str,numStr]})
        sample({source: str, clock: str, target: [str,anyt]})
        sample({source: str, clock: num, target: [str,anyt]})
        sample({source: str, clock: str, target: [str,voidt]})
        sample({source: str, clock: num, target: [str,voidt]})
        sample({source: str, clock: str, target: [voidt,numStr]})
        sample({source: num, clock: str, target: [voidt,numStr]})
        sample({source: str, clock: num, target: [voidt,numStr]})
        sample({source: num, clock: num, target: [voidt,numStr]})
        sample({source: str, clock: str, target: [voidt,strBool]})
        sample({source: str, clock: num, target: [voidt,strBool]})
        sample({source: str, clock: str, target: [voidt,anyt]})
        sample({source: num, clock: str, target: [voidt,anyt]})
        sample({source: str, clock: num, target: [voidt,anyt]})
        sample({source: num, clock: num, target: [voidt,anyt]})
        sample({source: num, clock: str, target: [num,numStr]})
        sample({source: num, clock: num, target: [num,numStr]})
        sample({source: num, clock: str, target: [num,anyt]})
        sample({source: num, clock: num, target: [num,anyt]})
        sample({source: num, clock: str, target: [num,voidt]})
        sample({source: num, clock: num, target: [num,voidt]})
        sample({source: str, clock: str, target: [numStr]})
        sample({source: num, clock: str, target: [numStr]})
        sample({source: str, clock: num, target: [numStr]})
        sample({source: num, clock: num, target: [numStr]})
        sample({source: str, clock: str, target: [strBool]})
        sample({source: str, clock: num, target: [strBool]})
        sample({source: str, clock: str, target: [anyt]})
        sample({source: num, clock: str, target: [anyt]})
        sample({source: str, clock: num, target: [anyt]})
        sample({source: num, clock: num, target: [anyt]})
        sample({source: str, clock: str, target: [str]})
        sample({source: str, clock: num, target: [str]})
        sample({source: str, clock: str, target: [voidt]})
        sample({source: num, clock: str, target: [voidt]})
        sample({source: str, clock: num, target: [voidt]})
        sample({source: num, clock: num, target: [voidt]})
        sample({source: num, clock: str, target: [num]})
        sample({source: num, clock: num, target: [num]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('no fn (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source: num, clock: str, target: [strBool,numStr]})
        //@ts-expect-error
        sample({source: num, clock: num, target: [strBool,numStr]})
        //@ts-expect-error
        sample({source: num, clock: str, target: [strBool,anyt]})
        //@ts-expect-error
        sample({source: num, clock: num, target: [strBool,anyt]})
        //@ts-expect-error
        sample({source: num, clock: str, target: [strBool,voidt]})
        //@ts-expect-error
        sample({source: num, clock: num, target: [strBool,voidt]})
        //@ts-expect-error
        sample({source: num, clock: str, target: [str,numStr]})
        //@ts-expect-error
        sample({source: num, clock: num, target: [str,numStr]})
        //@ts-expect-error
        sample({source: num, clock: str, target: [str,anyt]})
        //@ts-expect-error
        sample({source: num, clock: num, target: [str,anyt]})
        //@ts-expect-error
        sample({source: num, clock: str, target: [str,voidt]})
        //@ts-expect-error
        sample({source: num, clock: num, target: [str,voidt]})
        //@ts-expect-error
        sample({source: num, clock: str, target: [voidt,strBool]})
        //@ts-expect-error
        sample({source: num, clock: num, target: [voidt,strBool]})
        //@ts-expect-error
        sample({source: str, clock: str, target: [num,numStr]})
        //@ts-expect-error
        sample({source: str, clock: num, target: [num,numStr]})
        //@ts-expect-error
        sample({source: str, clock: str, target: [num,strBool]})
        //@ts-expect-error
        sample({source: num, clock: str, target: [num,strBool]})
        //@ts-expect-error
        sample({source: str, clock: num, target: [num,strBool]})
        //@ts-expect-error
        sample({source: num, clock: num, target: [num,strBool]})
        //@ts-expect-error
        sample({source: str, clock: str, target: [num,anyt]})
        //@ts-expect-error
        sample({source: str, clock: num, target: [num,anyt]})
        //@ts-expect-error
        sample({source: str, clock: str, target: [num,str]})
        //@ts-expect-error
        sample({source: num, clock: str, target: [num,str]})
        //@ts-expect-error
        sample({source: str, clock: num, target: [num,str]})
        //@ts-expect-error
        sample({source: num, clock: num, target: [num,str]})
        //@ts-expect-error
        sample({source: str, clock: str, target: [num,voidt]})
        //@ts-expect-error
        sample({source: str, clock: num, target: [num,voidt]})
        //@ts-expect-error
        sample({source: num, clock: str, target: [strBool]})
        //@ts-expect-error
        sample({source: num, clock: num, target: [strBool]})
        //@ts-expect-error
        sample({source: num, clock: str, target: [str]})
        //@ts-expect-error
        sample({source: num, clock: num, target: [str]})
        //@ts-expect-error
        sample({source: str, clock: str, target: [num]})
        //@ts-expect-error
        sample({source: str, clock: num, target: [num]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('untyped fn', () => {
    test('untyped fn (should pass)', () => {
      //prettier-ignore
      {
        sample({source: str, clock: str, target: [numStr,anyt], fn: (src,clk) => src + clk})
        sample({source: num, clock: str, target: [numStr,anyt], fn: (src,clk) => src + clk})
        sample({source: str, clock: num, target: [numStr,anyt], fn: (src,clk) => src + clk})
        sample({source: num, clock: num, target: [numStr,anyt], fn: (src,clk) => src + clk})
        sample({source: str, clock: str, target: [numStr,voidt], fn: (src,clk) => src + clk})
        sample({source: num, clock: str, target: [numStr,voidt], fn: (src,clk) => src + clk})
        sample({source: str, clock: num, target: [numStr,voidt], fn: (src,clk) => src + clk})
        sample({source: num, clock: num, target: [numStr,voidt], fn: (src,clk) => src + clk})
        sample({source: str, clock: str, target: [strBool,numStr], fn: (src,clk) => src + clk})
        sample({source: num, clock: str, target: [strBool,numStr], fn: (src,clk) => src + clk})
        sample({source: str, clock: num, target: [strBool,numStr], fn: (src,clk) => src + clk})
        sample({source: str, clock: str, target: [strBool,anyt], fn: (src,clk) => src + clk})
        sample({source: num, clock: str, target: [strBool,anyt], fn: (src,clk) => src + clk})
        sample({source: str, clock: num, target: [strBool,anyt], fn: (src,clk) => src + clk})
        sample({source: str, clock: str, target: [strBool,voidt], fn: (src,clk) => src + clk})
        sample({source: num, clock: str, target: [strBool,voidt], fn: (src,clk) => src + clk})
        sample({source: str, clock: num, target: [strBool,voidt], fn: (src,clk) => src + clk})
        sample({source: str, clock: str, target: [anyt,numStr], fn: (src,clk) => src + clk})
        sample({source: num, clock: str, target: [anyt,numStr], fn: (src,clk) => src + clk})
        sample({source: str, clock: num, target: [anyt,numStr], fn: (src,clk) => src + clk})
        sample({source: num, clock: num, target: [anyt,numStr], fn: (src,clk) => src + clk})
        sample({source: str, clock: str, target: [anyt,voidt], fn: (src,clk) => src + clk})
        sample({source: num, clock: str, target: [anyt,voidt], fn: (src,clk) => src + clk})
        sample({source: str, clock: num, target: [anyt,voidt], fn: (src,clk) => src + clk})
        sample({source: num, clock: num, target: [anyt,voidt], fn: (src,clk) => src + clk})
        sample({source: str, clock: str, target: [str,numStr], fn: (src,clk) => src + clk})
        sample({source: num, clock: str, target: [str,numStr], fn: (src,clk) => src + clk})
        sample({source: str, clock: num, target: [str,numStr], fn: (src,clk) => src + clk})
        sample({source: str, clock: str, target: [str,anyt], fn: (src,clk) => src + clk})
        sample({source: num, clock: str, target: [str,anyt], fn: (src,clk) => src + clk})
        sample({source: str, clock: num, target: [str,anyt], fn: (src,clk) => src + clk})
        sample({source: str, clock: str, target: [str,voidt], fn: (src,clk) => src + clk})
        sample({source: num, clock: str, target: [str,voidt], fn: (src,clk) => src + clk})
        sample({source: str, clock: num, target: [str,voidt], fn: (src,clk) => src + clk})
        sample({source: str, clock: str, target: [voidt,numStr], fn: (src,clk) => src + clk})
        sample({source: num, clock: str, target: [voidt,numStr], fn: (src,clk) => src + clk})
        sample({source: str, clock: num, target: [voidt,numStr], fn: (src,clk) => src + clk})
        sample({source: num, clock: num, target: [voidt,numStr], fn: (src,clk) => src + clk})
        sample({source: str, clock: str, target: [voidt,strBool], fn: (src,clk) => src + clk})
        sample({source: num, clock: str, target: [voidt,strBool], fn: (src,clk) => src + clk})
        sample({source: str, clock: num, target: [voidt,strBool], fn: (src,clk) => src + clk})
        sample({source: str, clock: str, target: [voidt,anyt], fn: (src,clk) => src + clk})
        sample({source: num, clock: str, target: [voidt,anyt], fn: (src,clk) => src + clk})
        sample({source: str, clock: num, target: [voidt,anyt], fn: (src,clk) => src + clk})
        sample({source: num, clock: num, target: [voidt,anyt], fn: (src,clk) => src + clk})
        sample({source: num, clock: num, target: [num,numStr], fn: (src,clk) => src + clk})
        sample({source: num, clock: num, target: [num,anyt], fn: (src,clk) => src + clk})
        sample({source: num, clock: num, target: [num,voidt], fn: (src,clk) => src + clk})
        sample({source: str, clock: str, target: [numStr], fn: (src,clk) => src + clk})
        sample({source: num, clock: str, target: [numStr], fn: (src,clk) => src + clk})
        sample({source: str, clock: num, target: [numStr], fn: (src,clk) => src + clk})
        sample({source: num, clock: num, target: [numStr], fn: (src,clk) => src + clk})
        sample({source: str, clock: str, target: [strBool], fn: (src,clk) => src + clk})
        sample({source: num, clock: str, target: [strBool], fn: (src,clk) => src + clk})
        sample({source: str, clock: num, target: [strBool], fn: (src,clk) => src + clk})
        sample({source: str, clock: str, target: [anyt], fn: (src,clk) => src + clk})
        sample({source: num, clock: str, target: [anyt], fn: (src,clk) => src + clk})
        sample({source: str, clock: num, target: [anyt], fn: (src,clk) => src + clk})
        sample({source: num, clock: num, target: [anyt], fn: (src,clk) => src + clk})
        sample({source: str, clock: str, target: [str], fn: (src,clk) => src + clk})
        sample({source: num, clock: str, target: [str], fn: (src,clk) => src + clk})
        sample({source: str, clock: num, target: [str], fn: (src,clk) => src + clk})
        sample({source: str, clock: str, target: [voidt], fn: (src,clk) => src + clk})
        sample({source: num, clock: str, target: [voidt], fn: (src,clk) => src + clk})
        sample({source: str, clock: num, target: [voidt], fn: (src,clk) => src + clk})
        sample({source: num, clock: num, target: [voidt], fn: (src,clk) => src + clk})
        sample({source: num, clock: num, target: [num], fn: (src,clk) => src + clk})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('untyped fn (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source: num, clock: num, target: [strBool,numStr], fn: (src,clk) => src + clk})
        //@ts-expect-error
        sample({source: num, clock: num, target: [strBool,anyt], fn: (src,clk) => src + clk})
        //@ts-expect-error
        sample({source: num, clock: num, target: [strBool,voidt], fn: (src,clk) => src + clk})
        //@ts-expect-error
        sample({source: num, clock: num, target: [str,numStr], fn: (src,clk) => src + clk})
        //@ts-expect-error
        sample({source: num, clock: num, target: [str,anyt], fn: (src,clk) => src + clk})
        //@ts-expect-error
        sample({source: num, clock: num, target: [str,voidt], fn: (src,clk) => src + clk})
        //@ts-expect-error
        sample({source: num, clock: num, target: [voidt,strBool], fn: (src,clk) => src + clk})
        //@ts-expect-error
        sample({source: str, clock: str, target: [num,numStr], fn: (src,clk) => src + clk})
        //@ts-expect-error
        sample({source: num, clock: str, target: [num,numStr], fn: (src,clk) => src + clk})
        //@ts-expect-error
        sample({source: str, clock: num, target: [num,numStr], fn: (src,clk) => src + clk})
        //@ts-expect-error
        sample({source: str, clock: str, target: [num,strBool], fn: (src,clk) => src + clk})
        //@ts-expect-error
        sample({source: num, clock: str, target: [num,strBool], fn: (src,clk) => src + clk})
        //@ts-expect-error
        sample({source: str, clock: num, target: [num,strBool], fn: (src,clk) => src + clk})
        //@ts-expect-error
        sample({source: num, clock: num, target: [num,strBool], fn: (src,clk) => src + clk})
        //@ts-expect-error
        sample({source: str, clock: str, target: [num,anyt], fn: (src,clk) => src + clk})
        //@ts-expect-error
        sample({source: num, clock: str, target: [num,anyt], fn: (src,clk) => src + clk})
        //@ts-expect-error
        sample({source: str, clock: num, target: [num,anyt], fn: (src,clk) => src + clk})
        //@ts-expect-error
        sample({source: str, clock: str, target: [num,str], fn: (src,clk) => src + clk})
        //@ts-expect-error
        sample({source: num, clock: str, target: [num,str], fn: (src,clk) => src + clk})
        //@ts-expect-error
        sample({source: str, clock: num, target: [num,str], fn: (src,clk) => src + clk})
        //@ts-expect-error
        sample({source: num, clock: num, target: [num,str], fn: (src,clk) => src + clk})
        //@ts-expect-error
        sample({source: str, clock: str, target: [num,voidt], fn: (src,clk) => src + clk})
        //@ts-expect-error
        sample({source: num, clock: str, target: [num,voidt], fn: (src,clk) => src + clk})
        //@ts-expect-error
        sample({source: str, clock: num, target: [num,voidt], fn: (src,clk) => src + clk})
        //@ts-expect-error
        sample({source: num, clock: num, target: [strBool], fn: (src,clk) => src + clk})
        //@ts-expect-error
        sample({source: num, clock: num, target: [str], fn: (src,clk) => src + clk})
        //@ts-expect-error
        sample({source: str, clock: str, target: [num], fn: (src,clk) => src + clk})
        //@ts-expect-error
        sample({source: num, clock: str, target: [num], fn: (src,clk) => src + clk})
        //@ts-expect-error
        sample({source: str, clock: num, target: [num], fn: (src,clk) => src + clk})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('typed fn', () => {
    test('typed fn (should pass)', () => {
      //prettier-ignore
      {
        sample({source: num, clock: num, target: [numStr,anyt], fn: (src:number,clk:number) => src+clk})
        sample({source: num, clock: num, target: [numStr,voidt], fn: (src:number,clk:number) => src+clk})
        sample({source: num, clock: num, target: [anyt,numStr], fn: (src:number,clk:number) => src+clk})
        sample({source: num, clock: num, target: [anyt,voidt], fn: (src:number,clk:number) => src+clk})
        sample({source: num, clock: num, target: [voidt,numStr], fn: (src:number,clk:number) => src+clk})
        sample({source: num, clock: num, target: [voidt,anyt], fn: (src:number,clk:number) => src+clk})
        sample({source: num, clock: num, target: [num,numStr], fn: (src:number,clk:number) => src+clk})
        sample({source: num, clock: num, target: [num,anyt], fn: (src:number,clk:number) => src+clk})
        sample({source: num, clock: num, target: [num,voidt], fn: (src:number,clk:number) => src+clk})
        sample({source: num, clock: num, target: [numStr], fn: (src:number,clk:number) => src+clk})
        sample({source: num, clock: num, target: [anyt], fn: (src:number,clk:number) => src+clk})
        sample({source: num, clock: num, target: [voidt], fn: (src:number,clk:number) => src+clk})
        sample({source: num, clock: num, target: [num], fn: (src:number,clk:number) => src+clk})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('typed fn (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source: num, clock: str, target: [numStr,anyt], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: str, clock: num, target: [numStr,anyt], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: num, clock: str, target: [numStr,voidt], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: str, clock: num, target: [numStr,voidt], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: num, clock: str, target: [strBool,numStr], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: str, clock: num, target: [strBool,numStr], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: num, clock: num, target: [strBool,numStr], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: num, clock: str, target: [strBool,anyt], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: str, clock: num, target: [strBool,anyt], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: num, clock: num, target: [strBool,anyt], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: num, clock: str, target: [strBool,voidt], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: str, clock: num, target: [strBool,voidt], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: num, clock: num, target: [strBool,voidt], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: num, clock: str, target: [anyt,numStr], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: str, clock: num, target: [anyt,numStr], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: num, clock: str, target: [anyt,voidt], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: str, clock: num, target: [anyt,voidt], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: num, clock: str, target: [str,numStr], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: str, clock: num, target: [str,numStr], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: num, clock: num, target: [str,numStr], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: num, clock: str, target: [str,anyt], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: str, clock: num, target: [str,anyt], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: num, clock: num, target: [str,anyt], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: num, clock: str, target: [str,voidt], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: str, clock: num, target: [str,voidt], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: num, clock: num, target: [str,voidt], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: num, clock: str, target: [voidt,numStr], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: str, clock: num, target: [voidt,numStr], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: num, clock: str, target: [voidt,strBool], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: str, clock: num, target: [voidt,strBool], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: num, clock: num, target: [voidt,strBool], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: num, clock: str, target: [voidt,anyt], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: str, clock: num, target: [voidt,anyt], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: num, clock: str, target: [num,numStr], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: str, clock: num, target: [num,numStr], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: num, clock: str, target: [num,strBool], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: str, clock: num, target: [num,strBool], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: num, clock: num, target: [num,strBool], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: num, clock: str, target: [num,anyt], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: str, clock: num, target: [num,anyt], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: num, clock: str, target: [num,str], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: str, clock: num, target: [num,str], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: num, clock: num, target: [num,str], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: num, clock: str, target: [num,voidt], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: str, clock: num, target: [num,voidt], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: num, clock: str, target: [numStr], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: str, clock: num, target: [numStr], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: num, clock: str, target: [strBool], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: str, clock: num, target: [strBool], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: num, clock: num, target: [strBool], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: num, clock: str, target: [anyt], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: str, clock: num, target: [anyt], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: num, clock: str, target: [str], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: str, clock: num, target: [str], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: num, clock: num, target: [str], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: num, clock: str, target: [voidt], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: str, clock: num, target: [voidt], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: num, clock: str, target: [num], fn: (src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source: str, clock: num, target: [num], fn: (src:number,clk:number) => src+clk})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(src: number, clk: number) => number' is not assignable to type '(source: number, clock: string) => unknown'.
              Types of parameters 'clk' and 'clock' are incompatible.
                Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(src: number, clk: number) => number' is not assignable to type '(source: string, clock: number) => unknown'.
              Types of parameters 'src' and 'source' are incompatible.
                Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(src: number, clk: number) => number' is not assignable to type '(source: number, clock: string) => unknown'.
              Types of parameters 'clk' and 'clock' are incompatible.
                Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(src: number, clk: number) => number' is not assignable to type '(source: string, clock: number) => unknown'.
              Types of parameters 'src' and 'source' are incompatible.
                Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '(src: number, clk: number) => number' is not assignable to type '(source: number, clock: string) => unknown'.
                Types of parameters 'clk' and 'clock' are incompatible.
                  Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '(src: number, clk: number) => number' is not assignable to type '(source: number, clock: string) => unknown'.
                Types of parameters 'clk' and 'clock' are incompatible.
                  Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(src: number, clk: number) => number' is not assignable to type '(source: string, clock: number) => unknown'.
              Types of parameters 'src' and 'source' are incompatible.
                Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '(src: number, clk: number) => number' is not assignable to type '(source: number, clock: string) => unknown'.
                Types of parameters 'clk' and 'clock' are incompatible.
                  Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '(src: number, clk: number) => number' is not assignable to type '(source: number, clock: string) => unknown'.
                Types of parameters 'clk' and 'clock' are incompatible.
                  Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(src: number, clk: number) => number' is not assignable to type '(source: string, clock: number) => unknown'.
              Types of parameters 'src' and 'source' are incompatible.
                Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '(src: number, clk: number) => number' is not assignable to type '(source: number, clock: string) => unknown'.
                Types of parameters 'clk' and 'clock' are incompatible.
                  Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '(src: number, clk: number) => number' is not assignable to type '(source: number, clock: string) => unknown'.
                Types of parameters 'clk' and 'clock' are incompatible.
                  Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(src: number, clk: number) => number' is not assignable to type '(source: string, clock: number) => unknown'.
              Types of parameters 'src' and 'source' are incompatible.
                Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(src: number, clk: number) => number' is not assignable to type '(source: number, clock: string) => unknown'.
              Types of parameters 'clk' and 'clock' are incompatible.
                Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(src: number, clk: number) => number' is not assignable to type '(source: string, clock: number) => unknown'.
              Types of parameters 'src' and 'source' are incompatible.
                Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(src: number, clk: number) => number' is not assignable to type '(source: number, clock: string) => unknown'.
              Types of parameters 'clk' and 'clock' are incompatible.
                Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(src: number, clk: number) => number' is not assignable to type '(source: string, clock: number) => unknown'.
              Types of parameters 'src' and 'source' are incompatible.
                Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '(src: number, clk: number) => number' is not assignable to type '(source: number, clock: string) => unknown'.
                Types of parameters 'clk' and 'clock' are incompatible.
                  Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '(src: number, clk: number) => number' is not assignable to type '(source: number, clock: string) => unknown'.
                Types of parameters 'clk' and 'clock' are incompatible.
                  Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(src: number, clk: number) => number' is not assignable to type '(source: string, clock: number) => unknown'.
              Types of parameters 'src' and 'source' are incompatible.
                Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '(src: number, clk: number) => number' is not assignable to type '(source: number, clock: string) => unknown'.
                Types of parameters 'clk' and 'clock' are incompatible.
                  Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '(src: number, clk: number) => number' is not assignable to type '(source: number, clock: string) => unknown'.
                Types of parameters 'clk' and 'clock' are incompatible.
                  Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(src: number, clk: number) => number' is not assignable to type '(source: string, clock: number) => unknown'.
              Types of parameters 'src' and 'source' are incompatible.
                Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '(src: number, clk: number) => number' is not assignable to type '(source: number, clock: string) => unknown'.
                Types of parameters 'clk' and 'clock' are incompatible.
                  Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '(src: number, clk: number) => number' is not assignable to type '(source: number, clock: string) => unknown'.
                Types of parameters 'clk' and 'clock' are incompatible.
                  Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(src: number, clk: number) => number' is not assignable to type '(source: string, clock: number) => unknown'.
              Types of parameters 'src' and 'source' are incompatible.
                Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(src: number, clk: number) => number' is not assignable to type '(source: number, clock: string) => unknown'.
              Types of parameters 'clk' and 'clock' are incompatible.
                Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(src: number, clk: number) => number' is not assignable to type '(source: string, clock: number) => unknown'.
              Types of parameters 'src' and 'source' are incompatible.
                Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '(src: number, clk: number) => number' is not assignable to type '(source: number, clock: string) => unknown'.
                Types of parameters 'clk' and 'clock' are incompatible.
                  Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '(src: number, clk: number) => number' is not assignable to type '(source: number, clock: string) => unknown'.
                Types of parameters 'clk' and 'clock' are incompatible.
                  Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(src: number, clk: number) => number' is not assignable to type '(source: string, clock: number) => unknown'.
              Types of parameters 'src' and 'source' are incompatible.
                Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(src: number, clk: number) => number' is not assignable to type '(source: number, clock: string) => unknown'.
              Types of parameters 'clk' and 'clock' are incompatible.
                Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(src: number, clk: number) => number' is not assignable to type '(source: string, clock: number) => unknown'.
              Types of parameters 'src' and 'source' are incompatible.
                Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(src: number, clk: number) => number' is not assignable to type '(source: number, clock: string) => unknown'.
              Types of parameters 'clk' and 'clock' are incompatible.
                Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '(src: number, clk: number) => number' is not assignable to type '(source: string, clock: number) => unknown'.
                Types of parameters 'src' and 'source' are incompatible.
                  Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '(src: number, clk: number) => number' is not assignable to type '(source: string, clock: number) => unknown'.
                Types of parameters 'src' and 'source' are incompatible.
                  Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '(src: number, clk: number) => number' is not assignable to type '(source: number, clock: string) => unknown'.
                Types of parameters 'clk' and 'clock' are incompatible.
                  Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '(src: number, clk: number) => number' is not assignable to type '(source: number, clock: string) => unknown'.
                Types of parameters 'clk' and 'clock' are incompatible.
                  Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '(src: number, clk: number) => number' is not assignable to type '(source: string, clock: number) => unknown'.
                Types of parameters 'src' and 'source' are incompatible.
                  Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '(src: number, clk: number) => number' is not assignable to type '(source: string, clock: number) => unknown'.
                Types of parameters 'src' and 'source' are incompatible.
                  Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(src: number, clk: number) => number' is not assignable to type '(source: number, clock: string) => unknown'.
              Types of parameters 'clk' and 'clock' are incompatible.
                Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '(src: number, clk: number) => number' is not assignable to type '(source: string, clock: number) => unknown'.
                Types of parameters 'src' and 'source' are incompatible.
                  Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '(src: number, clk: number) => number' is not assignable to type '(source: string, clock: number) => unknown'.
                Types of parameters 'src' and 'source' are incompatible.
                  Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '(src: number, clk: number) => number' is not assignable to type '(source: number, clock: string) => unknown'.
                Types of parameters 'clk' and 'clock' are incompatible.
                  Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '(src: number, clk: number) => number' is not assignable to type '(source: number, clock: string) => unknown'.
                Types of parameters 'clk' and 'clock' are incompatible.
                  Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '(src: number, clk: number) => number' is not assignable to type '(source: string, clock: number) => unknown'.
                Types of parameters 'src' and 'source' are incompatible.
                  Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '(src: number, clk: number) => number' is not assignable to type '(source: string, clock: number) => unknown'.
                Types of parameters 'src' and 'source' are incompatible.
                  Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(src: number, clk: number) => number' is not assignable to type '(source: number, clock: string) => unknown'.
              Types of parameters 'clk' and 'clock' are incompatible.
                Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '(src: number, clk: number) => number' is not assignable to type '(source: string, clock: number) => unknown'.
                Types of parameters 'src' and 'source' are incompatible.
                  Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '(src: number, clk: number) => number' is not assignable to type '(source: string, clock: number) => unknown'.
                Types of parameters 'src' and 'source' are incompatible.
                  Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(src: number, clk: number) => number' is not assignable to type '(source: number, clock: string) => unknown'.
              Types of parameters 'clk' and 'clock' are incompatible.
                Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(src: number, clk: number) => number' is not assignable to type '(source: string, clock: number) => unknown'.
              Types of parameters 'src' and 'source' are incompatible.
                Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '(src: number, clk: number) => number' is not assignable to type '(source: number, clock: string) => unknown'.
                Types of parameters 'clk' and 'clock' are incompatible.
                  Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '(src: number, clk: number) => number' is not assignable to type '(source: number, clock: string) => unknown'.
                Types of parameters 'clk' and 'clock' are incompatible.
                  Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(src: number, clk: number) => number' is not assignable to type '(source: string, clock: number) => unknown'.
              Types of parameters 'src' and 'source' are incompatible.
                Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(src: number, clk: number) => number' is not assignable to type '(source: number, clock: string) => unknown'.
              Types of parameters 'clk' and 'clock' are incompatible.
                Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(src: number, clk: number) => number' is not assignable to type '(source: string, clock: number) => unknown'.
              Types of parameters 'src' and 'source' are incompatible.
                Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '(src: number, clk: number) => number' is not assignable to type '(source: number, clock: string) => unknown'.
                Types of parameters 'clk' and 'clock' are incompatible.
                  Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '(src: number, clk: number) => number' is not assignable to type '(source: number, clock: string) => unknown'.
                Types of parameters 'clk' and 'clock' are incompatible.
                  Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(src: number, clk: number) => number' is not assignable to type '(source: string, clock: number) => unknown'.
              Types of parameters 'src' and 'source' are incompatible.
                Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(src: number, clk: number) => number' is not assignable to type '(source: number, clock: string) => unknown'.
              Types of parameters 'clk' and 'clock' are incompatible.
                Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(src: number, clk: number) => number' is not assignable to type '(source: string, clock: number) => unknown'.
              Types of parameters 'src' and 'source' are incompatible.
                Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(src: number, clk: number) => number' is not assignable to type '(source: number, clock: string) => unknown'.
              Types of parameters 'clk' and 'clock' are incompatible.
                Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '(src: number, clk: number) => number' is not assignable to type '(source: string, clock: number) => unknown'.
                Types of parameters 'src' and 'source' are incompatible.
                  Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '(src: number, clk: number) => number' is not assignable to type '(source: string, clock: number) => unknown'.
                Types of parameters 'src' and 'source' are incompatible.
                  Type 'string' is not assignable to type 'number'.
        "
      `)
    })
  })
})
describe('combinable', () => {
  describe('source:{a,b}', () => {
    test('source:{a,b} (should pass)', () => {
      //prettier-ignore
      {
        sample({source: {a: $num, b: $str}, clock: num, target: [a_num, ab]})
        sample({source: {a: $num, b: $str}, clock: num, target: [ab]})
        sample({source: {a: $num, b: $str}, clock: num, target: [a_num]})
        sample({source: {a: $num, b: $str}, target: [a_num, ab]})
        sample({source: {a: $num, b: $str}, target: [ab]})
        sample({source: {a: $num, b: $str}, target: [a_num]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:{a,b} (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [ab, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [abn, ab]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [abn, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [a_str, ab]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [a_num, abn]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [a_num, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [abn]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, target: [ab, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, target: [abn, ab]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, target: [abn, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, target: [a_str, ab]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, target: [a_num, abn]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, target: [a_num, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, target: [abn]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, target: [a_str]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('source:{a,b}, fn:() => ...', () => {
    test('source:{a,b}, fn:() => ... (should pass)', () => {
      //prettier-ignore
      {
        sample({source: {a: $num, b: $str}, clock: num, target: [a_num, ab], fn: () => ({a:2,b:''})})
        sample({source: {a: $num, b: $str}, clock: num, target: [ab], fn: () => ({a:2,b:''})})
        sample({source: {a: $num, b: $str}, clock: num, target: [a_num], fn: () => ({a:2,b:''})})
        sample({source: {a: $num, b: $str}, target: [a_num, ab], fn: () => ({a:2,b:''})})
        sample({source: {a: $num, b: $str}, target: [ab], fn: () => ({a:2,b:''})})
        sample({source: {a: $num, b: $str}, target: [a_num], fn: () => ({a:2,b:''})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:{a,b}, fn:() => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [ab, a_str], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [abn, ab], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [abn, a_str], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [a_str, ab], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [a_num, abn], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [a_num, a_str], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [abn], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [a_str], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, target: [ab, a_str], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, target: [abn, ab], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, target: [abn, a_str], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, target: [a_str, ab], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, target: [a_num, abn], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, target: [a_num, a_str], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, target: [abn], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, target: [a_str], fn: () => ({a:2,b:''})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('source:{a,b}, fn:(src: wrong) => ...', () => {
    test('source:{a,b}, fn:(src: wrong) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [ab, a_str], fn: ({b}:ABN) => ({a:b,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [abn, ab], fn: ({b}:ABN) => ({a:b,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [abn, a_str], fn: ({b}:ABN) => ({a:b,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [a_str, ab], fn: ({b}:ABN) => ({a:b,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [a_num, ab], fn: ({b}:ABN) => ({a:b,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [a_num, abn], fn: ({b}:ABN) => ({a:b,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [a_num, a_str], fn: ({b}:ABN) => ({a:b,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [ab], fn: ({b}:ABN) => ({a:b,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [abn], fn: ({b}:ABN) => ({a:b,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [a_str], fn: ({b}:ABN) => ({a:b,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [a_num], fn: ({b}:ABN) => ({a:b,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, target: [ab, a_str], fn: ({b}:ABN) => ({a:b,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, target: [abn, ab], fn: ({b}:ABN) => ({a:b,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, target: [abn, a_str], fn: ({b}:ABN) => ({a:b,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, target: [a_str, ab], fn: ({b}:ABN) => ({a:b,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, target: [a_num, ab], fn: ({b}:ABN) => ({a:b,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, target: [a_num, abn], fn: ({b}:ABN) => ({a:b,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, target: [a_num, a_str], fn: ({b}:ABN) => ({a:b,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, target: [ab], fn: ({b}:ABN) => ({a:b,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, target: [abn], fn: ({b}:ABN) => ({a:b,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, target: [a_str], fn: ({b}:ABN) => ({a:b,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, target: [a_num], fn: ({b}:ABN) => ({a:b,b:''})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                    Types of property 'b' are incompatible.
                      Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                    Types of property 'b' are incompatible.
                      Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                    Types of property 'b' are incompatible.
                      Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                    Types of property 'b' are incompatible.
                      Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                      Types of property 'b' are incompatible.
                        Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                      Types of property 'b' are incompatible.
                        Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                      Types of property 'b' are incompatible.
                        Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                    Types of property 'b' are incompatible.
                      Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                    Types of property 'b' are incompatible.
                      Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                    Types of property 'b' are incompatible.
                      Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                    Types of property 'b' are incompatible.
                      Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                    Types of property 'b' are incompatible.
                      Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                    Types of property 'b' are incompatible.
                      Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                    Types of property 'b' are incompatible.
                      Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                    Types of property 'b' are incompatible.
                      Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                    Types of property 'b' are incompatible.
                      Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                    Types of property 'b' are incompatible.
                      Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: any) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                    Types of property 'b' are incompatible.
                      Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: any) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                    Types of property 'b' are incompatible.
                      Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: any) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                    Types of property 'b' are incompatible.
                      Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: any) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                    Types of property 'b' are incompatible.
                      Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                      Types of property 'b' are incompatible.
                        Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                      Types of property 'b' are incompatible.
                        Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                      Types of property 'b' are incompatible.
                        Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: any) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                    Types of property 'b' are incompatible.
                      Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: any) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                    Types of property 'b' are incompatible.
                      Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: any) => unknown'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: any) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                    Types of property 'b' are incompatible.
                      Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: any) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                    Types of property 'b' are incompatible.
                      Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: any) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                    Types of property 'b' are incompatible.
                      Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: any) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                    Types of property 'b' are incompatible.
                      Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: any) => unknown'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: any) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                    Types of property 'b' are incompatible.
                      Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: any) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                    Types of property 'b' are incompatible.
                      Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: any) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                    Types of property 'b' are incompatible.
                      Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: any) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                    Types of property 'b' are incompatible.
                      Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: any) => unknown'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
        "
      `)
    })
  })
  describe('source:{a,b}, fn:(src: t) => ...', () => {
    test('source:{a,b}, fn:(src: t) => ... (should pass)', () => {
      //prettier-ignore
      {
        sample({source: {a: $num, b: $str}, clock: num, target: [a_num, ab], fn: ({a,b}:AB) => ({a,b})})
        sample({source: {a: $num, b: $str}, clock: num, target: [ab], fn: ({a,b}:AB) => ({a,b})})
        sample({source: {a: $num, b: $str}, clock: num, target: [a_num], fn: ({a,b}:AB) => ({a,b})})
        sample({source: {a: $num, b: $str}, target: [a_num, ab], fn: ({a,b}:AB) => ({a,b})})
        sample({source: {a: $num, b: $str}, target: [ab], fn: ({a,b}:AB) => ({a,b})})
        sample({source: {a: $num, b: $str}, target: [a_num], fn: ({a,b}:AB) => ({a,b})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:{a,b}, fn:(src: t) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [ab, a_str], fn: ({a,b}:AB) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [abn, ab], fn: ({a,b}:AB) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [abn, a_str], fn: ({a,b}:AB) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [a_str, ab], fn: ({a,b}:AB) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [a_num, abn], fn: ({a,b}:AB) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [a_num, a_str], fn: ({a,b}:AB) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [abn], fn: ({a,b}:AB) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [a_str], fn: ({a,b}:AB) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, target: [ab, a_str], fn: ({a,b}:AB) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, target: [abn, ab], fn: ({a,b}:AB) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, target: [abn, a_str], fn: ({a,b}:AB) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, target: [a_str, ab], fn: ({a,b}:AB) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, target: [a_num, abn], fn: ({a,b}:AB) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, target: [a_num, a_str], fn: ({a,b}:AB) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, target: [abn], fn: ({a,b}:AB) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, target: [a_str], fn: ({a,b}:AB) => ({a,b})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('source:{a,b}, fn:(src) => ...', () => {
    test('source:{a,b}, fn:(src) => ... (should pass)', () => {
      //prettier-ignore
      {
        sample({source: {a: $num, b: $str}, clock: num, target: [a_num, ab], fn: ({a,b}) => ({a,b})})
        sample({source: {a: $num, b: $str}, clock: num, target: [ab], fn: ({a,b}) => ({a,b})})
        sample({source: {a: $num, b: $str}, clock: num, target: [a_num], fn: ({a,b}) => ({a,b})})
        sample({source: {a: $num, b: $str}, target: [a_num, ab], fn: ({a,b}) => ({a,b})})
        sample({source: {a: $num, b: $str}, target: [ab], fn: ({a,b}) => ({a,b})})
        sample({source: {a: $num, b: $str}, target: [a_num], fn: ({a,b}) => ({a,b})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:{a,b}, fn:(src) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [ab, a_str], fn: ({a,b}) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [abn, ab], fn: ({a,b}) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [abn, a_str], fn: ({a,b}) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [a_str, ab], fn: ({a,b}) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [a_num, abn], fn: ({a,b}) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [a_num, a_str], fn: ({a,b}) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [abn], fn: ({a,b}) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [a_str], fn: ({a,b}) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, target: [ab, a_str], fn: ({a,b}) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, target: [abn, ab], fn: ({a,b}) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, target: [abn, a_str], fn: ({a,b}) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, target: [a_str, ab], fn: ({a,b}) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, target: [a_num, abn], fn: ({a,b}) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, target: [a_num, a_str], fn: ({a,b}) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, target: [abn], fn: ({a,b}) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, target: [a_str], fn: ({a,b}) => ({a,b})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('source:{a,b}, fn:(src: wrong, clk) => ...', () => {
    test('source:{a,b}, fn:(src: wrong, clk) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [ab, a_str], fn: ({a,b}:ABN, cl:number) => ({a:b+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [abn, ab], fn: ({a,b}:ABN, cl:number) => ({a:b+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [abn, a_str], fn: ({a,b}:ABN, cl:number) => ({a:b+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [a_str, ab], fn: ({a,b}:ABN, cl:number) => ({a:b+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [a_num, ab], fn: ({a,b}:ABN, cl:number) => ({a:b+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [a_num, abn], fn: ({a,b}:ABN, cl:number) => ({a:b+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [a_num, a_str], fn: ({a,b}:ABN, cl:number) => ({a:b+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [ab], fn: ({a,b}:ABN, cl:number) => ({a:b+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [abn], fn: ({a,b}:ABN, cl:number) => ({a:b+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [a_str], fn: ({a,b}:ABN, cl:number) => ({a:b+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [a_num], fn: ({a,b}:ABN, cl:number) => ({a:b+cl,b:''})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                    Types of property 'b' are incompatible.
                      Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                    Types of property 'b' are incompatible.
                      Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                    Types of property 'b' are incompatible.
                      Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                    Types of property 'b' are incompatible.
                      Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                      Types of property 'b' are incompatible.
                        Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                      Types of property 'b' are incompatible.
                        Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                      Types of property 'b' are incompatible.
                        Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                    Types of property 'b' are incompatible.
                      Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                    Types of property 'b' are incompatible.
                      Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                    Types of property 'b' are incompatible.
                      Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                    Types of property 'b' are incompatible.
                      Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                    Types of property 'b' are incompatible.
                      Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                    Types of property 'b' are incompatible.
                      Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                    Types of property 'b' are incompatible.
                      Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                    Types of property 'b' are incompatible.
                      Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                    Types of property 'b' are incompatible.
                      Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                    Types of property 'b' are incompatible.
                      Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
        "
      `)
    })
  })
  describe('source:{a,b}, fn:(src, clk: wrong) => ...', () => {
    test('source:{a,b}, fn:(src, clk: wrong) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [ab, a_str], fn: ({a}:AB, cl:string) => ({a,b:cl})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [abn, ab], fn: ({a}:AB, cl:string) => ({a,b:cl})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [abn, a_str], fn: ({a}:AB, cl:string) => ({a,b:cl})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [a_str, ab], fn: ({a}:AB, cl:string) => ({a,b:cl})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [a_num, ab], fn: ({a}:AB, cl:string) => ({a,b:cl})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [a_num, abn], fn: ({a}:AB, cl:string) => ({a,b:cl})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [a_num, a_str], fn: ({a}:AB, cl:string) => ({a,b:cl})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [ab], fn: ({a}:AB, cl:string) => ({a,b:cl})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [abn], fn: ({a}:AB, cl:string) => ({a,b:cl})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [a_str], fn: ({a}:AB, cl:string) => ({a,b:cl})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [a_num], fn: ({a}:AB, cl:string) => ({a,b:cl})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AB, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                Types of parameters 'cl' and 'clock' are incompatible.
                  Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AB, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                Types of parameters 'cl' and 'clock' are incompatible.
                  Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AB, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                Types of parameters 'cl' and 'clock' are incompatible.
                  Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AB, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                Types of parameters 'cl' and 'clock' are incompatible.
                  Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AB, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AB, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AB, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AB, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                Types of parameters 'cl' and 'clock' are incompatible.
                  Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AB, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                Types of parameters 'cl' and 'clock' are incompatible.
                  Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AB, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
              Types of parameters 'cl' and 'clock' are incompatible.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AB, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                Types of parameters 'cl' and 'clock' are incompatible.
                  Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AB, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                Types of parameters 'cl' and 'clock' are incompatible.
                  Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AB, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                Types of parameters 'cl' and 'clock' are incompatible.
                  Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AB, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                Types of parameters 'cl' and 'clock' are incompatible.
                  Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AB, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
              Types of parameters 'cl' and 'clock' are incompatible.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AB, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                Types of parameters 'cl' and 'clock' are incompatible.
                  Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AB, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                Types of parameters 'cl' and 'clock' are incompatible.
                  Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AB, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                Types of parameters 'cl' and 'clock' are incompatible.
                  Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AB, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
                Types of parameters 'cl' and 'clock' are incompatible.
                  Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AB, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
              Types of parameters 'cl' and 'clock' are incompatible.
                Type 'number' is not assignable to type 'string'.
        "
      `)
    })
  })
  describe('source:{a,b}, fn:(src: t, clk: t) => ...', () => {
    test('source:{a,b}, fn:(src: t, clk: t) => ... (should pass)', () => {
      //prettier-ignore
      {
        sample({source: {a: $num, b: $str}, clock: num, target: [a_num, ab], fn: ({a,b}:AB, cl:number) => ({a:a+cl,b})})
        sample({source: {a: $num, b: $str}, clock: num, target: [ab], fn: ({a,b}:AB, cl:number) => ({a:a+cl,b})})
        sample({source: {a: $num, b: $str}, clock: num, target: [a_num], fn: ({a,b}:AB, cl:number) => ({a:a+cl,b})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:{a,b}, fn:(src: t, clk: t) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [ab, a_str], fn: ({a,b}:AB, cl:number) => ({a:a+cl,b})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [abn, ab], fn: ({a,b}:AB, cl:number) => ({a:a+cl,b})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [abn, a_str], fn: ({a,b}:AB, cl:number) => ({a:a+cl,b})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [a_str, ab], fn: ({a,b}:AB, cl:number) => ({a:a+cl,b})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [a_num, abn], fn: ({a,b}:AB, cl:number) => ({a:a+cl,b})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [a_num, a_str], fn: ({a,b}:AB, cl:number) => ({a:a+cl,b})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [abn], fn: ({a,b}:AB, cl:number) => ({a:a+cl,b})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [a_str], fn: ({a,b}:AB, cl:number) => ({a:a+cl,b})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('source:{a,b}, fn:(src, cl) => ...', () => {
    test('source:{a,b}, fn:(src, cl) => ... (should pass)', () => {
      //prettier-ignore
      {
        sample({source: {a: $num, b: $str}, clock: num, target: [a_num, ab], fn: ({a,b}, cl) => ({a:a+cl,b})})
        sample({source: {a: $num, b: $str}, clock: num, target: [ab], fn: ({a,b}, cl) => ({a:a+cl,b})})
        sample({source: {a: $num, b: $str}, clock: num, target: [a_num], fn: ({a,b}, cl) => ({a:a+cl,b})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:{a,b}, fn:(src, cl) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [ab, a_str], fn: ({a,b}, cl) => ({a:a+cl,b})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [abn, ab], fn: ({a,b}, cl) => ({a:a+cl,b})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [abn, a_str], fn: ({a,b}, cl) => ({a:a+cl,b})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [a_str, ab], fn: ({a,b}, cl) => ({a:a+cl,b})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [a_num, abn], fn: ({a,b}, cl) => ({a:a+cl,b})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [a_num, a_str], fn: ({a,b}, cl) => ({a:a+cl,b})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [abn], fn: ({a,b}, cl) => ({a:a+cl,b})})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: num, target: [a_str], fn: ({a,b}, cl) => ({a:a+cl,b})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('source:{a}', () => {
    test('source:{a} (should pass)', () => {
      //prettier-ignore
      {
        sample({source: {a: $num}, clock: num, target: [a_num]})
        sample({source: {a: $num}, target: [a_num]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:{a} (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [ab, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [abn, ab]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [abn, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [a_str, ab]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [a_num, ab]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [a_num, abn]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [a_num, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [ab]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [abn]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, target: [ab, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, target: [abn, ab]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, target: [abn, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, target: [a_str, ab]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, target: [a_num, ab]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, target: [a_num, abn]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, target: [a_num, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, target: [ab]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, target: [abn]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, target: [a_str]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('source:{a}, fn:() => ...', () => {
    test('source:{a}, fn:() => ... (should pass)', () => {
      //prettier-ignore
      {
        sample({source: {a: $num}, clock: num, target: [a_num, ab], fn: () => ({a:2,b:''})})
        sample({source: {a: $num}, clock: num, target: [ab], fn: () => ({a:2,b:''})})
        sample({source: {a: $num}, clock: num, target: [a_num], fn: () => ({a:2,b:''})})
        sample({source: {a: $num}, target: [a_num, ab], fn: () => ({a:2,b:''})})
        sample({source: {a: $num}, target: [ab], fn: () => ({a:2,b:''})})
        sample({source: {a: $num}, target: [a_num], fn: () => ({a:2,b:''})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:{a}, fn:() => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [ab, a_str], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [abn, ab], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [abn, a_str], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [a_str, ab], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [a_num, abn], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [a_num, a_str], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [abn], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [a_str], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, target: [ab, a_str], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, target: [abn, ab], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, target: [abn, a_str], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, target: [a_str, ab], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, target: [a_num, abn], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, target: [a_num, a_str], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, target: [abn], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, target: [a_str], fn: () => ({a:2,b:''})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('source:{a}, fn:(src: wrong) => ...', () => {
    test('source:{a}, fn:(src: wrong) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [ab, a_str], fn: ({a}:AS) => ({a:0,b:a})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [abn, ab], fn: ({a}:AS) => ({a:0,b:a})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [abn, a_str], fn: ({a}:AS) => ({a:0,b:a})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [a_str, ab], fn: ({a}:AS) => ({a:0,b:a})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [a_num, ab], fn: ({a}:AS) => ({a:0,b:a})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [a_num, abn], fn: ({a}:AS) => ({a:0,b:a})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [a_num, a_str], fn: ({a}:AS) => ({a:0,b:a})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [ab], fn: ({a}:AS) => ({a:0,b:a})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [abn], fn: ({a}:AS) => ({a:0,b:a})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [a_str], fn: ({a}:AS) => ({a:0,b:a})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [a_num], fn: ({a}:AS) => ({a:0,b:a})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, target: [ab, a_str], fn: ({a}:AS) => ({a:0,b:a})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, target: [abn, ab], fn: ({a}:AS) => ({a:0,b:a})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, target: [abn, a_str], fn: ({a}:AS) => ({a:0,b:a})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, target: [a_str, ab], fn: ({a}:AS) => ({a:0,b:a})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, target: [a_num, ab], fn: ({a}:AS) => ({a:0,b:a})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, target: [a_num, abn], fn: ({a}:AS) => ({a:0,b:a})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, target: [a_num, a_str], fn: ({a}:AS) => ({a:0,b:a})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, target: [ab], fn: ({a}:AS) => ({a:0,b:a})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, target: [abn], fn: ({a}:AS) => ({a:0,b:a})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, target: [a_str], fn: ({a}:AS) => ({a:0,b:a})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, target: [a_num], fn: ({a}:AS) => ({a:0,b:a})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '{ a: number; }' is not assignable to type 'AS'.
                      Types of property 'a' are incompatible.
                        Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '{ a: number; }' is not assignable to type 'AS'.
                      Types of property 'a' are incompatible.
                        Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '{ a: number; }' is not assignable to type 'AS'.
                      Types of property 'a' are incompatible.
                        Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '{ a: number; }' is not assignable to type 'AS'.
                      Types of property 'a' are incompatible.
                        Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '{ a: number; }' is not assignable to type 'AS'.
                      Types of property 'a' are incompatible.
                        Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '{ a: number; }' is not assignable to type 'AS'.
                      Types of property 'a' are incompatible.
                        Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '{ a: number; }' is not assignable to type 'AS'.
                      Types of property 'a' are incompatible.
                        Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '{ a: number; }' is not assignable to type 'AS'.
                      Types of property 'a' are incompatible.
                        Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '{ a: number; }' is not assignable to type 'AS'.
                      Types of property 'a' are incompatible.
                        Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '{ a: number; }' is not assignable to type 'AS'.
                      Types of property 'a' are incompatible.
                        Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '{ a: number; }' is not assignable to type 'AS'.
                      Types of property 'a' are incompatible.
                        Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '{ a: number; }' is not assignable to type 'AS'.
                      Types of property 'a' are incompatible.
                        Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '{ a: number; }' is not assignable to type 'AS'.
                      Types of property 'a' are incompatible.
                        Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '{ a: number; }' is not assignable to type 'AS'.
                      Types of property 'a' are incompatible.
                        Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '{ a: number; }' is not assignable to type 'AS'.
                      Types of property 'a' are incompatible.
                        Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '{ a: number; }' is not assignable to type 'AS'.
                      Types of property 'a' are incompatible.
                        Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '{ a: number; }' is not assignable to type 'AS'.
                      Types of property 'a' are incompatible.
                        Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '{ a: number; }' is not assignable to type 'AS'.
                      Types of property 'a' are incompatible.
                        Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '{ a: number; }' is not assignable to type 'AS'.
                      Types of property 'a' are incompatible.
                        Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '{ a: number; }' is not assignable to type 'AS'.
                      Types of property 'a' are incompatible.
                        Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '{ a: number; }' is not assignable to type 'AS'.
                      Types of property 'a' are incompatible.
                        Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '{ a: number; }' is not assignable to type 'AS'.
                      Types of property 'a' are incompatible.
                        Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '{ a: number; }' is not assignable to type 'AS'.
                      Types of property 'a' are incompatible.
                        Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '{ a: number; }' is not assignable to type 'AS'.
                      Types of property 'a' are incompatible.
                        Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: any) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: any) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: any) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: any) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: any) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: any) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: any) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: any) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: any) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: any) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: any) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: any) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: any) => unknown'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        "
      `)
    })
  })
  describe('source:{a}, fn:(src: t) => ...', () => {
    test('source:{a}, fn:(src: t) => ... (should pass)', () => {
      //prettier-ignore
      {
        sample({source: {a: $num}, clock: num, target: [a_num, ab], fn: ({a}:AN) => ({a,b:''})})
        sample({source: {a: $num}, clock: num, target: [ab], fn: ({a}:AN) => ({a,b:''})})
        sample({source: {a: $num}, clock: num, target: [a_num], fn: ({a}:AN) => ({a,b:''})})
        sample({source: {a: $num}, target: [a_num, ab], fn: ({a}:AN) => ({a,b:''})})
        sample({source: {a: $num}, target: [ab], fn: ({a}:AN) => ({a,b:''})})
        sample({source: {a: $num}, target: [a_num], fn: ({a}:AN) => ({a,b:''})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:{a}, fn:(src: t) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [ab, a_str], fn: ({a}:AN) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [abn, ab], fn: ({a}:AN) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [abn, a_str], fn: ({a}:AN) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [a_str, ab], fn: ({a}:AN) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [a_num, abn], fn: ({a}:AN) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [a_num, a_str], fn: ({a}:AN) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [abn], fn: ({a}:AN) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [a_str], fn: ({a}:AN) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, target: [ab, a_str], fn: ({a}:AN) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, target: [abn, ab], fn: ({a}:AN) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, target: [abn, a_str], fn: ({a}:AN) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, target: [a_str, ab], fn: ({a}:AN) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, target: [a_num, abn], fn: ({a}:AN) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, target: [a_num, a_str], fn: ({a}:AN) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, target: [abn], fn: ({a}:AN) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, target: [a_str], fn: ({a}:AN) => ({a,b:''})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('source:{a}, fn:(src) => ...', () => {
    test('source:{a}, fn:(src) => ... (should pass)', () => {
      //prettier-ignore
      {
        sample({source: {a: $num}, clock: num, target: [a_num, ab], fn: ({a}) => ({a,b:''})})
        sample({source: {a: $num}, clock: num, target: [ab], fn: ({a}) => ({a,b:''})})
        sample({source: {a: $num}, clock: num, target: [a_num], fn: ({a}) => ({a,b:''})})
        sample({source: {a: $num}, target: [a_num, ab], fn: ({a}) => ({a,b:''})})
        sample({source: {a: $num}, target: [ab], fn: ({a}) => ({a,b:''})})
        sample({source: {a: $num}, target: [a_num], fn: ({a}) => ({a,b:''})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:{a}, fn:(src) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [ab, a_str], fn: ({a}) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [abn, ab], fn: ({a}) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [abn, a_str], fn: ({a}) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [a_str, ab], fn: ({a}) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [a_num, abn], fn: ({a}) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [a_num, a_str], fn: ({a}) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [abn], fn: ({a}) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [a_str], fn: ({a}) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, target: [ab, a_str], fn: ({a}) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, target: [abn, ab], fn: ({a}) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, target: [abn, a_str], fn: ({a}) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, target: [a_str, ab], fn: ({a}) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, target: [a_num, abn], fn: ({a}) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, target: [a_num, a_str], fn: ({a}) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, target: [abn], fn: ({a}) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, target: [a_str], fn: ({a}) => ({a,b:''})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('source:{a}, fn:(src: wrong, clk) => ...', () => {
    test('source:{a}, fn:(src: wrong, clk) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [ab, a_str], fn: ({a}:AS, cl:number) => ({a: cl, b: a})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [abn, ab], fn: ({a}:AS, cl:number) => ({a: cl, b: a})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [abn, a_str], fn: ({a}:AS, cl:number) => ({a: cl, b: a})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [a_str, ab], fn: ({a}:AS, cl:number) => ({a: cl, b: a})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [a_num, ab], fn: ({a}:AS, cl:number) => ({a: cl, b: a})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [a_num, abn], fn: ({a}:AS, cl:number) => ({a: cl, b: a})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [a_num, a_str], fn: ({a}:AS, cl:number) => ({a: cl, b: a})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [ab], fn: ({a}:AS, cl:number) => ({a: cl, b: a})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [abn], fn: ({a}:AS, cl:number) => ({a: cl, b: a})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [a_str], fn: ({a}:AS, cl:number) => ({a: cl, b: a})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [a_num], fn: ({a}:AS, cl:number) => ({a: cl, b: a})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '{ a: number; }' is not assignable to type 'AS'.
                      Types of property 'a' are incompatible.
                        Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '{ a: number; }' is not assignable to type 'AS'.
                      Types of property 'a' are incompatible.
                        Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '{ a: number; }' is not assignable to type 'AS'.
                      Types of property 'a' are incompatible.
                        Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '{ a: number; }' is not assignable to type 'AS'.
                      Types of property 'a' are incompatible.
                        Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '{ a: number; }' is not assignable to type 'AS'.
                      Types of property 'a' are incompatible.
                        Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '{ a: number; }' is not assignable to type 'AS'.
                      Types of property 'a' are incompatible.
                        Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '{ a: number; }' is not assignable to type 'AS'.
                      Types of property 'a' are incompatible.
                        Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '{ a: number; }' is not assignable to type 'AS'.
                      Types of property 'a' are incompatible.
                        Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '{ a: number; }' is not assignable to type 'AS'.
                      Types of property 'a' are incompatible.
                        Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '{ a: number; }' is not assignable to type 'AS'.
                      Types of property 'a' are incompatible.
                        Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '{ a: number; }' is not assignable to type 'AS'.
                      Types of property 'a' are incompatible.
                        Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '{ a: number; }' is not assignable to type 'AS'.
                      Types of property 'a' are incompatible.
                        Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        "
      `)
    })
  })
  describe('source:{a}, fn:(src, clk: wrong) => ...', () => {
    test('source:{a}, fn:(src, clk: wrong) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [ab, a_str], fn: ({a}:AN, cl:string) => ({a,b:cl})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [abn, ab], fn: ({a}:AN, cl:string) => ({a,b:cl})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [abn, a_str], fn: ({a}:AN, cl:string) => ({a,b:cl})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [a_str, ab], fn: ({a}:AN, cl:string) => ({a,b:cl})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [a_num, ab], fn: ({a}:AN, cl:string) => ({a,b:cl})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [a_num, abn], fn: ({a}:AN, cl:string) => ({a,b:cl})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [a_num, a_str], fn: ({a}:AN, cl:string) => ({a,b:cl})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [ab], fn: ({a}:AN, cl:string) => ({a,b:cl})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [abn], fn: ({a}:AN, cl:string) => ({a,b:cl})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [a_str], fn: ({a}:AN, cl:string) => ({a,b:cl})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [a_num], fn: ({a}:AN, cl:string) => ({a,b:cl})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AN, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AN, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AN, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AN, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AN, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AN, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AN, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AN, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AN, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AN, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AN, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '({ a }: AN, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AN, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                Types of parameters 'cl' and 'clock' are incompatible.
                  Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AN, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                Types of parameters 'cl' and 'clock' are incompatible.
                  Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AN, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                Types of parameters 'cl' and 'clock' are incompatible.
                  Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AN, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                Types of parameters 'cl' and 'clock' are incompatible.
                  Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AN, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                Types of parameters 'cl' and 'clock' are incompatible.
                  Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AN, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                Types of parameters 'cl' and 'clock' are incompatible.
                  Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AN, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                Types of parameters 'cl' and 'clock' are incompatible.
                  Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AN, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                Types of parameters 'cl' and 'clock' are incompatible.
                  Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AN, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                Types of parameters 'cl' and 'clock' are incompatible.
                  Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AN, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                Types of parameters 'cl' and 'clock' are incompatible.
                  Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AN, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                Types of parameters 'cl' and 'clock' are incompatible.
                  Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AN, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                Types of parameters 'cl' and 'clock' are incompatible.
                  Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AN, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
              Types of parameters 'cl' and 'clock' are incompatible.
                Type 'number' is not assignable to type 'string'.
        "
      `)
    })
  })
  describe('source:{a}, fn:(src: t, clk: t) => ...', () => {
    test('source:{a}, fn:(src: t, clk: t) => ... (should pass)', () => {
      //prettier-ignore
      {
        sample({source: {a: $num}, clock: num, target: [a_num, ab], fn: ({a}:AN, cl:number) => ({a:a+cl,b:''})})
        sample({source: {a: $num}, clock: num, target: [ab], fn: ({a}:AN, cl:number) => ({a:a+cl,b:''})})
        sample({source: {a: $num}, clock: num, target: [a_num], fn: ({a}:AN, cl:number) => ({a:a+cl,b:''})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:{a}, fn:(src: t, clk: t) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [ab, a_str], fn: ({a}:AN, cl:number) => ({a:a+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [abn, ab], fn: ({a}:AN, cl:number) => ({a:a+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [abn, a_str], fn: ({a}:AN, cl:number) => ({a:a+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [a_str, ab], fn: ({a}:AN, cl:number) => ({a:a+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [a_num, abn], fn: ({a}:AN, cl:number) => ({a:a+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [a_num, a_str], fn: ({a}:AN, cl:number) => ({a:a+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [abn], fn: ({a}:AN, cl:number) => ({a:a+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [a_str], fn: ({a}:AN, cl:number) => ({a:a+cl,b:''})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('source:{a}, fn:(src, cl) => ...', () => {
    test('source:{a}, fn:(src, cl) => ... (should pass)', () => {
      //prettier-ignore
      {
        sample({source: {a: $num}, clock: num, target: [a_num, ab], fn: ({a}, cl) => ({a:a+cl,b:''})})
        sample({source: {a: $num}, clock: num, target: [ab], fn: ({a}, cl) => ({a:a+cl,b:''})})
        sample({source: {a: $num}, clock: num, target: [a_num], fn: ({a}, cl) => ({a:a+cl,b:''})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:{a}, fn:(src, cl) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [ab, a_str], fn: ({a}, cl) => ({a:a+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [abn, ab], fn: ({a}, cl) => ({a:a+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [abn, a_str], fn: ({a}, cl) => ({a:a+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [a_str, ab], fn: ({a}, cl) => ({a:a+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [a_num, abn], fn: ({a}, cl) => ({a:a+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [a_num, a_str], fn: ({a}, cl) => ({a:a+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [abn], fn: ({a}, cl) => ({a:a+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: num, target: [a_str], fn: ({a}, cl) => ({a:a+cl,b:''})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('source:[a,b]', () => {
    test('source:[a,b] (should pass)', () => {
      //prettier-ignore
      {
        sample({source: [$num, $str], clock: num, target: [l_num_str]})
        sample({source: [$num, $str], target: [l_num_str]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:[a,b] (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [l_num_num, l_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [l_num_str, l_num_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [l_num_str, l_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [l_str, l_num_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [l_num, l_num_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [l_num, l_num_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [l_num, l_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [l_num_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [l_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [l_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], target: [l_num_num, l_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], target: [l_num_str, l_num_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], target: [l_num_str, l_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], target: [l_str, l_num_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], target: [l_num, l_num_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], target: [l_num, l_num_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], target: [l_num, l_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], target: [l_num_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], target: [l_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], target: [l_num]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('source:[a,b], fn:() => ...', () => {
    test('source:[a,b], fn:() => ... (should pass)', () => {
      //prettier-ignore
      {
        sample({source: [$num, $str], clock: num, target: [a_num, ab], fn: () => ({a:2,b:''})})
        sample({source: [$num, $str], clock: num, target: [ab], fn: () => ({a:2,b:''})})
        sample({source: [$num, $str], clock: num, target: [a_num], fn: () => ({a:2,b:''})})
        sample({source: [$num, $str], target: [a_num, ab], fn: () => ({a:2,b:''})})
        sample({source: [$num, $str], target: [ab], fn: () => ({a:2,b:''})})
        sample({source: [$num, $str], target: [a_num], fn: () => ({a:2,b:''})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:[a,b], fn:() => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [ab, a_str], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [abn, ab], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [abn, a_str], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [a_str, ab], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [a_num, abn], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [a_num, a_str], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [abn], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [a_str], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], target: [ab, a_str], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], target: [abn, ab], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], target: [abn, a_str], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], target: [a_str, ab], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], target: [a_num, abn], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], target: [a_num, a_str], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], target: [abn], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], target: [a_str], fn: () => ({a:2,b:''})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('source:[a,b], fn:(src: wrong) => ...', () => {
    test('source:[a,b], fn:(src: wrong) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [ab, a_str], fn: ([,b]:[number,number]) => ({a:b,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [abn, ab], fn: ([,b]:[number,number]) => ({a:b,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [abn, a_str], fn: ([,b]:[number,number]) => ({a:b,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [a_str, ab], fn: ([,b]:[number,number]) => ({a:b,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [a_num, ab], fn: ([,b]:[number,number]) => ({a:b,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [a_num, abn], fn: ([,b]:[number,number]) => ({a:b,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [a_num, a_str], fn: ([,b]:[number,number]) => ({a:b,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [ab], fn: ([,b]:[number,number]) => ({a:b,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [abn], fn: ([,b]:[number,number]) => ({a:b,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [a_str], fn: ([,b]:[number,number]) => ({a:b,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [a_num], fn: ([,b]:[number,number]) => ({a:b,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], target: [ab, a_str], fn: ([,b]:[number,number]) => ({a:b,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], target: [abn, ab], fn: ([,b]:[number,number]) => ({a:b,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], target: [abn, a_str], fn: ([,b]:[number,number]) => ({a:b,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], target: [a_str, ab], fn: ([,b]:[number,number]) => ({a:b,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], target: [a_num, ab], fn: ([,b]:[number,number]) => ({a:b,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], target: [a_num, abn], fn: ([,b]:[number,number]) => ({a:b,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], target: [a_num, a_str], fn: ([,b]:[number,number]) => ({a:b,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], target: [ab], fn: ([,b]:[number,number]) => ({a:b,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], target: [abn], fn: ([,b]:[number,number]) => ({a:b,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], target: [a_str], fn: ([,b]:[number,number]) => ({a:b,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], target: [a_num], fn: ([,b]:[number,number]) => ({a:b,b:''})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
                      Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
                      Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
                      Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: any) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: any) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: any) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: any) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: any) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: any) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: any) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: any) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number, string]' is not assignable to type '[number, number]'.
        "
      `)
    })
  })
  describe('source:[a,b], fn:(src: t) => ...', () => {
    test('source:[a,b], fn:(src: t) => ... (should pass)', () => {
      //prettier-ignore
      {
        sample({source: [$num, $str], clock: num, target: [a_num, ab], fn: ([a,b]:[number,string]) => ({a,b})})
        sample({source: [$num, $str], clock: num, target: [ab], fn: ([a,b]:[number,string]) => ({a,b})})
        sample({source: [$num, $str], clock: num, target: [a_num], fn: ([a,b]:[number,string]) => ({a,b})})
        sample({source: [$num, $str], target: [a_num, ab], fn: ([a,b]:[number,string]) => ({a,b})})
        sample({source: [$num, $str], target: [ab], fn: ([a,b]:[number,string]) => ({a,b})})
        sample({source: [$num, $str], target: [a_num], fn: ([a,b]:[number,string]) => ({a,b})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:[a,b], fn:(src: t) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [ab, a_str], fn: ([a,b]:[number,string]) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [abn, ab], fn: ([a,b]:[number,string]) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [abn, a_str], fn: ([a,b]:[number,string]) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [a_str, ab], fn: ([a,b]:[number,string]) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [a_num, abn], fn: ([a,b]:[number,string]) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [a_num, a_str], fn: ([a,b]:[number,string]) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [abn], fn: ([a,b]:[number,string]) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [a_str], fn: ([a,b]:[number,string]) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], target: [ab, a_str], fn: ([a,b]:[number,string]) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], target: [abn, ab], fn: ([a,b]:[number,string]) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], target: [abn, a_str], fn: ([a,b]:[number,string]) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], target: [a_str, ab], fn: ([a,b]:[number,string]) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], target: [a_num, abn], fn: ([a,b]:[number,string]) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], target: [a_num, a_str], fn: ([a,b]:[number,string]) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], target: [abn], fn: ([a,b]:[number,string]) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], target: [a_str], fn: ([a,b]:[number,string]) => ({a,b})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('source:[a,b], fn:(src) => ...', () => {
    test('source:[a,b], fn:(src) => ... (should pass)', () => {
      //prettier-ignore
      {
        sample({source: [$num, $str], clock: num, target: [a_num, ab], fn: ([a,b]) => ({a,b})})
        sample({source: [$num, $str], clock: num, target: [ab], fn: ([a,b]) => ({a,b})})
        sample({source: [$num, $str], clock: num, target: [a_num], fn: ([a,b]) => ({a,b})})
        sample({source: [$num, $str], target: [a_num, ab], fn: ([a,b]) => ({a,b})})
        sample({source: [$num, $str], target: [ab], fn: ([a,b]) => ({a,b})})
        sample({source: [$num, $str], target: [a_num], fn: ([a,b]) => ({a,b})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:[a,b], fn:(src) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [ab, a_str], fn: ([a,b]) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [abn, ab], fn: ([a,b]) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [abn, a_str], fn: ([a,b]) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [a_str, ab], fn: ([a,b]) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [a_num, abn], fn: ([a,b]) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [a_num, a_str], fn: ([a,b]) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [abn], fn: ([a,b]) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [a_str], fn: ([a,b]) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], target: [ab, a_str], fn: ([a,b]) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], target: [abn, ab], fn: ([a,b]) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], target: [abn, a_str], fn: ([a,b]) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], target: [a_str, ab], fn: ([a,b]) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], target: [a_num, abn], fn: ([a,b]) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], target: [a_num, a_str], fn: ([a,b]) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], target: [abn], fn: ([a,b]) => ({a,b})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], target: [a_str], fn: ([a,b]) => ({a,b})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('source:[a,b], fn:(src: wrong, clk) => ...', () => {
    test('source:[a,b], fn:(src: wrong, clk) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [ab, a_str], fn: ([a,b]:[number,number], cl:number) => ({a:b+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [abn, ab], fn: ([a,b]:[number,number], cl:number) => ({a:b+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [abn, a_str], fn: ([a,b]:[number,number], cl:number) => ({a:b+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [a_str, ab], fn: ([a,b]:[number,number], cl:number) => ({a:b+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [a_num, ab], fn: ([a,b]:[number,number], cl:number) => ({a:b+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [a_num, abn], fn: ([a,b]:[number,number], cl:number) => ({a:b+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [a_num, a_str], fn: ([a,b]:[number,number], cl:number) => ({a:b+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [ab], fn: ([a,b]:[number,number], cl:number) => ({a:b+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [abn], fn: ([a,b]:[number,number], cl:number) => ({a:b+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [a_str], fn: ([a,b]:[number,number], cl:number) => ({a:b+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [a_num], fn: ([a,b]:[number,number], cl:number) => ({a:b+cl,b:''})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number, string]' is not assignable to type '[number, number]'.
        "
      `)
    })
  })
  describe('source:[a,b], fn:(src, clk: wrong) => ...', () => {
    test('source:[a,b], fn:(src, clk: wrong) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [ab, a_str], fn: ([a]:[number,string], cl:string) => ({a,b:cl})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [abn, ab], fn: ([a]:[number,string], cl:string) => ({a,b:cl})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [abn, a_str], fn: ([a]:[number,string], cl:string) => ({a,b:cl})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [a_str, ab], fn: ([a]:[number,string], cl:string) => ({a,b:cl})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [a_num, ab], fn: ([a]:[number,string], cl:string) => ({a,b:cl})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [a_num, abn], fn: ([a]:[number,string], cl:string) => ({a,b:cl})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [a_num, a_str], fn: ([a]:[number,string], cl:string) => ({a,b:cl})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [ab], fn: ([a]:[number,string], cl:string) => ({a,b:cl})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [abn], fn: ([a]:[number,string], cl:string) => ({a,b:cl})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [a_str], fn: ([a]:[number,string], cl:string) => ({a,b:cl})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [a_num], fn: ([a]:[number,string], cl:string) => ({a,b:cl})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                Types of parameters 'cl' and 'clock' are incompatible.
                  Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                Types of parameters 'cl' and 'clock' are incompatible.
                  Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                Types of parameters 'cl' and 'clock' are incompatible.
                  Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                Types of parameters 'cl' and 'clock' are incompatible.
                  Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                Types of parameters 'cl' and 'clock' are incompatible.
                  Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                Types of parameters 'cl' and 'clock' are incompatible.
                  Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                Types of parameters 'cl' and 'clock' are incompatible.
                  Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
                Types of parameters 'cl' and 'clock' are incompatible.
                  Type 'number' is not assignable to type 'string'.
        "
      `)
    })
  })
  describe('source:[a,b], fn:(src: t, clk: t) => ...', () => {
    test('source:[a,b], fn:(src: t, clk: t) => ... (should pass)', () => {
      //prettier-ignore
      {
        sample({source: [$num, $str], clock: num, target: [a_num, ab], fn: ([a,b]:[number,string], cl:number) => ({a:a+cl,b})})
        sample({source: [$num, $str], clock: num, target: [ab], fn: ([a,b]:[number,string], cl:number) => ({a:a+cl,b})})
        sample({source: [$num, $str], clock: num, target: [a_num], fn: ([a,b]:[number,string], cl:number) => ({a:a+cl,b})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:[a,b], fn:(src: t, clk: t) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [ab, a_str], fn: ([a,b]:[number,string], cl:number) => ({a:a+cl,b})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [abn, ab], fn: ([a,b]:[number,string], cl:number) => ({a:a+cl,b})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [abn, a_str], fn: ([a,b]:[number,string], cl:number) => ({a:a+cl,b})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [a_str, ab], fn: ([a,b]:[number,string], cl:number) => ({a:a+cl,b})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [a_num, abn], fn: ([a,b]:[number,string], cl:number) => ({a:a+cl,b})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [a_num, a_str], fn: ([a,b]:[number,string], cl:number) => ({a:a+cl,b})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [abn], fn: ([a,b]:[number,string], cl:number) => ({a:a+cl,b})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [a_str], fn: ([a,b]:[number,string], cl:number) => ({a:a+cl,b})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('source:[a,b], fn:(src, cl) => ...', () => {
    test('source:[a,b], fn:(src, cl) => ... (should pass)', () => {
      //prettier-ignore
      {
        sample({source: [$num, $str], clock: num, target: [a_num, ab], fn: ([a,b], cl) => ({a:a+cl,b})})
        sample({source: [$num, $str], clock: num, target: [ab], fn: ([a,b], cl) => ({a:a+cl,b})})
        sample({source: [$num, $str], clock: num, target: [a_num], fn: ([a,b], cl) => ({a:a+cl,b})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:[a,b], fn:(src, cl) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [ab, a_str], fn: ([a,b], cl) => ({a:a+cl,b})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [abn, ab], fn: ([a,b], cl) => ({a:a+cl,b})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [abn, a_str], fn: ([a,b], cl) => ({a:a+cl,b})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [a_str, ab], fn: ([a,b], cl) => ({a:a+cl,b})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [a_num, abn], fn: ([a,b], cl) => ({a:a+cl,b})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [a_num, a_str], fn: ([a,b], cl) => ({a:a+cl,b})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [abn], fn: ([a,b], cl) => ({a:a+cl,b})})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: num, target: [a_str], fn: ([a,b], cl) => ({a:a+cl,b})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('source:[a]', () => {
    test('source:[a] (should pass)', () => {
      //prettier-ignore
      {
        sample({source: [$num], clock: num, target: [l_num]})
        sample({source: [$num], target: [l_num]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:[a] (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [l_num_num, l_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [l_num_str, l_num_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [l_num_str, l_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [l_str, l_num_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [l_num, l_num_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [l_num, l_num_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [l_num, l_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [l_num_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [l_num_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [l_str]})
        /*@ts-expect-error*/
        sample({source: [$num], target: [l_num_num, l_str]})
        /*@ts-expect-error*/
        sample({source: [$num], target: [l_num_str, l_num_num]})
        /*@ts-expect-error*/
        sample({source: [$num], target: [l_num_str, l_str]})
        /*@ts-expect-error*/
        sample({source: [$num], target: [l_str, l_num_num]})
        /*@ts-expect-error*/
        sample({source: [$num], target: [l_num, l_num_num]})
        /*@ts-expect-error*/
        sample({source: [$num], target: [l_num, l_num_str]})
        /*@ts-expect-error*/
        sample({source: [$num], target: [l_num, l_str]})
        /*@ts-expect-error*/
        sample({source: [$num], target: [l_num_num]})
        /*@ts-expect-error*/
        sample({source: [$num], target: [l_num_str]})
        /*@ts-expect-error*/
        sample({source: [$num], target: [l_str]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, string]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, string]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, string]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, string]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, string]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, string]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, string]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, string]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('source:[a], fn:() => ...', () => {
    test('source:[a], fn:() => ... (should pass)', () => {
      //prettier-ignore
      {
        sample({source: [$num], clock: num, target: [a_num, ab], fn: () => ({a:2,b:''})})
        sample({source: [$num], clock: num, target: [ab], fn: () => ({a:2,b:''})})
        sample({source: [$num], clock: num, target: [a_num], fn: () => ({a:2,b:''})})
        sample({source: [$num], target: [a_num, ab], fn: () => ({a:2,b:''})})
        sample({source: [$num], target: [ab], fn: () => ({a:2,b:''})})
        sample({source: [$num], target: [a_num], fn: () => ({a:2,b:''})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:[a], fn:() => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [ab, a_str], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [abn, ab], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [abn, a_str], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [a_str, ab], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [a_num, abn], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [a_num, a_str], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [abn], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [a_str], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], target: [ab, a_str], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], target: [abn, ab], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], target: [abn, a_str], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], target: [a_str, ab], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], target: [a_num, abn], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], target: [a_num, a_str], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], target: [abn], fn: () => ({a:2,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], target: [a_str], fn: () => ({a:2,b:''})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('source:[a], fn:(src: wrong) => ...', () => {
    test('source:[a], fn:(src: wrong) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [ab, a_str], fn: ([a]:[string]) => ({a:2,b:a})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [abn, ab], fn: ([a]:[string]) => ({a:2,b:a})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [abn, a_str], fn: ([a]:[string]) => ({a:2,b:a})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [a_str, ab], fn: ([a]:[string]) => ({a:2,b:a})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [a_num, ab], fn: ([a]:[string]) => ({a:2,b:a})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [a_num, abn], fn: ([a]:[string]) => ({a:2,b:a})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [a_num, a_str], fn: ([a]:[string]) => ({a:2,b:a})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [ab], fn: ([a]:[string]) => ({a:2,b:a})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [abn], fn: ([a]:[string]) => ({a:2,b:a})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [a_str], fn: ([a]:[string]) => ({a:2,b:a})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [a_num], fn: ([a]:[string]) => ({a:2,b:a})})
        /*@ts-expect-error*/
        sample({source: [$num], target: [ab, a_str], fn: ([a]:[string]) => ({a:2,b:a})})
        /*@ts-expect-error*/
        sample({source: [$num], target: [abn, ab], fn: ([a]:[string]) => ({a:2,b:a})})
        /*@ts-expect-error*/
        sample({source: [$num], target: [abn, a_str], fn: ([a]:[string]) => ({a:2,b:a})})
        /*@ts-expect-error*/
        sample({source: [$num], target: [a_str, ab], fn: ([a]:[string]) => ({a:2,b:a})})
        /*@ts-expect-error*/
        sample({source: [$num], target: [a_num, ab], fn: ([a]:[string]) => ({a:2,b:a})})
        /*@ts-expect-error*/
        sample({source: [$num], target: [a_num, abn], fn: ([a]:[string]) => ({a:2,b:a})})
        /*@ts-expect-error*/
        sample({source: [$num], target: [a_num, a_str], fn: ([a]:[string]) => ({a:2,b:a})})
        /*@ts-expect-error*/
        sample({source: [$num], target: [ab], fn: ([a]:[string]) => ({a:2,b:a})})
        /*@ts-expect-error*/
        sample({source: [$num], target: [abn], fn: ([a]:[string]) => ({a:2,b:a})})
        /*@ts-expect-error*/
        sample({source: [$num], target: [a_str], fn: ([a]:[string]) => ({a:2,b:a})})
        /*@ts-expect-error*/
        sample({source: [$num], target: [a_num], fn: ([a]:[string]) => ({a:2,b:a})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: any) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: any) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: any) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: any) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: any) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: any) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: any) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: any) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: any) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number]' is not assignable to type '[string]'.
        "
      `)
    })
  })
  describe('source:[a], fn:(src: t) => ...', () => {
    test('source:[a], fn:(src: t) => ... (should pass)', () => {
      //prettier-ignore
      {
        sample({source: [$num], clock: num, target: [a_num, ab], fn: ([a]:[number]) => ({a,b:''})})
        sample({source: [$num], clock: num, target: [ab], fn: ([a]:[number]) => ({a,b:''})})
        sample({source: [$num], clock: num, target: [a_num], fn: ([a]:[number]) => ({a,b:''})})
        sample({source: [$num], target: [a_num, ab], fn: ([a]:[number]) => ({a,b:''})})
        sample({source: [$num], target: [ab], fn: ([a]:[number]) => ({a,b:''})})
        sample({source: [$num], target: [a_num], fn: ([a]:[number]) => ({a,b:''})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:[a], fn:(src: t) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [ab, a_str], fn: ([a]:[number]) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [abn, ab], fn: ([a]:[number]) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [abn, a_str], fn: ([a]:[number]) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [a_str, ab], fn: ([a]:[number]) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [a_num, abn], fn: ([a]:[number]) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [a_num, a_str], fn: ([a]:[number]) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [abn], fn: ([a]:[number]) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [a_str], fn: ([a]:[number]) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], target: [ab, a_str], fn: ([a]:[number]) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], target: [abn, ab], fn: ([a]:[number]) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], target: [abn, a_str], fn: ([a]:[number]) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], target: [a_str, ab], fn: ([a]:[number]) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], target: [a_num, abn], fn: ([a]:[number]) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], target: [a_num, a_str], fn: ([a]:[number]) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], target: [abn], fn: ([a]:[number]) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], target: [a_str], fn: ([a]:[number]) => ({a,b:''})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('source:[a], fn:(src) => ...', () => {
    test('source:[a], fn:(src) => ... (should pass)', () => {
      //prettier-ignore
      {
        sample({source: [$num], clock: num, target: [a_num, ab], fn: ([a]) => ({a,b:''})})
        sample({source: [$num], clock: num, target: [ab], fn: ([a]) => ({a,b:''})})
        sample({source: [$num], clock: num, target: [a_num], fn: ([a]) => ({a,b:''})})
        sample({source: [$num], target: [a_num, ab], fn: ([a]) => ({a,b:''})})
        sample({source: [$num], target: [ab], fn: ([a]) => ({a,b:''})})
        sample({source: [$num], target: [a_num], fn: ([a]) => ({a,b:''})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:[a], fn:(src) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [ab, a_str], fn: ([a]) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [abn, ab], fn: ([a]) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [abn, a_str], fn: ([a]) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [a_str, ab], fn: ([a]) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [a_num, abn], fn: ([a]) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [a_num, a_str], fn: ([a]) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [abn], fn: ([a]) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [a_str], fn: ([a]) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], target: [ab, a_str], fn: ([a]) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], target: [abn, ab], fn: ([a]) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], target: [abn, a_str], fn: ([a]) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], target: [a_str, ab], fn: ([a]) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], target: [a_num, abn], fn: ([a]) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], target: [a_num, a_str], fn: ([a]) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], target: [abn], fn: ([a]) => ({a,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], target: [a_str], fn: ([a]) => ({a,b:''})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('source:[a], fn:(src: wrong, clk) => ...', () => {
    test('source:[a], fn:(src: wrong, clk) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [ab, a_str], fn: ([a]:[string], cl:number) => ({a:cl,b:a})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [abn, ab], fn: ([a]:[string], cl:number) => ({a:cl,b:a})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [abn, a_str], fn: ([a]:[string], cl:number) => ({a:cl,b:a})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [a_str, ab], fn: ([a]:[string], cl:number) => ({a:cl,b:a})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [a_num, ab], fn: ([a]:[string], cl:number) => ({a:cl,b:a})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [a_num, abn], fn: ([a]:[string], cl:number) => ({a:cl,b:a})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [a_num, a_str], fn: ([a]:[string], cl:number) => ({a:cl,b:a})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [ab], fn: ([a]:[string], cl:number) => ({a:cl,b:a})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [abn], fn: ([a]:[string], cl:number) => ({a:cl,b:a})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [a_str], fn: ([a]:[string], cl:number) => ({a:cl,b:a})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [a_num], fn: ([a]:[string], cl:number) => ({a:cl,b:a})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters '__0' and 'source' are incompatible.
                    Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '[number]' is not assignable to type '[string]'.
        "
      `)
    })
  })
  describe('source:[a], fn:(src, clk: wrong) => ...', () => {
    test('source:[a], fn:(src, clk: wrong) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [ab, a_str], fn: ([a]:[number], cl:string) => ({a,b:cl})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [abn, ab], fn: ([a]:[number], cl:string) => ({a,b:cl})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [abn, a_str], fn: ([a]:[number], cl:string) => ({a,b:cl})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [a_str, ab], fn: ([a]:[number], cl:string) => ({a,b:cl})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [a_num, ab], fn: ([a]:[number], cl:string) => ({a,b:cl})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [a_num, abn], fn: ([a]:[number], cl:string) => ({a,b:cl})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [a_num, a_str], fn: ([a]:[number], cl:string) => ({a,b:cl})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [ab], fn: ([a]:[number], cl:string) => ({a,b:cl})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [abn], fn: ([a]:[number], cl:string) => ({a,b:cl})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [a_str], fn: ([a]:[number], cl:string) => ({a,b:cl})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [a_num], fn: ([a]:[number], cl:string) => ({a,b:cl})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
                Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                  Types of parameters 'cl' and 'clock' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                Types of parameters 'cl' and 'clock' are incompatible.
                  Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                Types of parameters 'cl' and 'clock' are incompatible.
                  Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                Types of parameters 'cl' and 'clock' are incompatible.
                  Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                Types of parameters 'cl' and 'clock' are incompatible.
                  Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                Types of parameters 'cl' and 'clock' are incompatible.
                  Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                Types of parameters 'cl' and 'clock' are incompatible.
                  Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                Types of parameters 'cl' and 'clock' are incompatible.
                  Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
                Types of parameters 'cl' and 'clock' are incompatible.
                  Type 'number' is not assignable to type 'string'.
        "
      `)
    })
  })
  describe('source:[a], fn:(src: t, clk: t) => ...', () => {
    test('source:[a], fn:(src: t, clk: t) => ... (should pass)', () => {
      //prettier-ignore
      {
        sample({source: [$num], clock: num, target: [a_num, ab], fn: ([a]:[number], cl:number) => ({a:a+cl,b:''})})
        sample({source: [$num], clock: num, target: [ab], fn: ([a]:[number], cl:number) => ({a:a+cl,b:''})})
        sample({source: [$num], clock: num, target: [a_num], fn: ([a]:[number], cl:number) => ({a:a+cl,b:''})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:[a], fn:(src: t, clk: t) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [ab, a_str], fn: ([a]:[number], cl:number) => ({a:a+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [abn, ab], fn: ([a]:[number], cl:number) => ({a:a+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [abn, a_str], fn: ([a]:[number], cl:number) => ({a:a+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [a_str, ab], fn: ([a]:[number], cl:number) => ({a:a+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [a_num, abn], fn: ([a]:[number], cl:number) => ({a:a+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [a_num, a_str], fn: ([a]:[number], cl:number) => ({a:a+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [abn], fn: ([a]:[number], cl:number) => ({a:a+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [a_str], fn: ([a]:[number], cl:number) => ({a:a+cl,b:''})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('source:[a], fn:(src, cl) => ...', () => {
    test('source:[a], fn:(src, cl) => ... (should pass)', () => {
      //prettier-ignore
      {
        sample({source: [$num], clock: num, target: [a_num, ab], fn: ([a], cl) => ({a:a+cl,b:''})})
        sample({source: [$num], clock: num, target: [ab], fn: ([a], cl) => ({a:a+cl,b:''})})
        sample({source: [$num], clock: num, target: [a_num], fn: ([a], cl) => ({a:a+cl,b:''})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:[a], fn:(src, cl) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [ab, a_str], fn: ([a], cl) => ({a:a+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [abn, ab], fn: ([a], cl) => ({a:a+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [abn, a_str], fn: ([a], cl) => ({a:a+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [a_str, ab], fn: ([a], cl) => ({a:a+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [a_num, abn], fn: ([a], cl) => ({a:a+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [a_num, a_str], fn: ([a], cl) => ({a:a+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [abn], fn: ([a], cl) => ({a:a+cl,b:''})})
        /*@ts-expect-error*/
        sample({source: [$num], clock: num, target: [a_str], fn: ([a], cl) => ({a:a+cl,b:''})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
})
