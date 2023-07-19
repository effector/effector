/* eslint-disable no-unused-vars */
import {createStore, createEvent, guard} from 'effector'
const consoleError = console.error

beforeAll(() => {
  console.error = (message, ...args) => {
    if (String(message).includes('guard')) return
    consoleError(message, ...args)
  }
})

afterAll(() => {
  console.error = consoleError
})
const typecheck = '{global}'

type AB = {a: string; b: number}
const voidt = createEvent()
const anyt = createEvent<any>()
const str = createEvent<string>()
const strClk = createEvent<string>()
const num = createEvent<number>()
const a = createStore('')
const b = createStore(0)
const aTarget = createEvent<{a: string}>()
const abTarget = createEvent<AB>()
const aclock = createEvent<{a: string; clock: any}>()
const abclock = createEvent<{a: string; b: number; clock: any}>()
const fnAbClockString = ({a, b}: AB, clock: string) => ({a, b, clock})
const fnAbClockAny = ({a, b}: AB, clock: any) => ({a, b, clock})
const fnAString = (a: string) => ({a})
const fnAStringClockString = (a: string, clock: string) => ({a, clock})
const fnAStringClockAny = (a: string, clock: any) => ({a, clock})
const fnAb = ({a, b}: AB) => ({a, b})

describe('clock only', () => {
  test('noSource (should pass)', () => {
    //prettier-ignore
    {
      guard({filter: () => true, clock:strClk       })
      guard({filter: () => true, clock:anyt         })
      guard({filter: () => true, clock:[strClk]     })
      guard({filter: () => true, clock:[anyt]       })
      guard({filter: () => true, clock:[strClk,anyt]})
      guard({filter: () => true, clock:strClk       , target:str})
      guard({filter: () => true, clock:anyt         , target:str})
      guard({filter: () => true, clock:[strClk]     , target:str})
      guard({filter: () => true, clock:[anyt]       , target:str})
      guard({filter: () => true, clock:[strClk,anyt], target:str})
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})
test('noClock (should pass)', () => {
  //prettier-ignore
  {
    guard({filter: () => true, source:a    })
    guard({filter: () => true, source:{a,b}})
    guard({filter: () => true, source:a    , target:str     })
    guard({filter: () => true, source:{a,b}, target:abTarget})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test(' (should pass)', () => {
  //prettier-ignore
  {
    guard({filter: () => true, source:a    , clock:[voidt,str]     })
    guard({filter: () => true, source:a    , clock:[voidt]         })
    guard({filter: () => true, source:a    , clock:[str]           })
    guard({filter: () => true, source:a    , clock:[str,voidt,anyt]})
    guard({filter: () => true, source:a    , clock:[voidt,str,anyt]})
    guard({filter: () => true, source:a    , clock:[anyt,str,voidt]})
    guard({filter: () => true, source:a    , clock:[voidt,anyt,str]})
    guard({filter: () => true, source:a    , clock:[str,anyt,voidt]})
    guard({filter: () => true, source:a    , clock:[anyt,voidt,str]})
    guard({filter: () => true, source:{a,b}, clock:[str]           })
    guard({filter: () => true, source:{a,b}, clock:[voidt]         })
    guard({filter: () => true, source:{a,b}, clock:[voidt,str]     })
    guard({filter: () => true, source:{a,b}, clock:[anyt,str,voidt]})
    guard({filter: () => true, source:{a,b}, clock:[voidt,anyt,str]})
    guard({filter: () => true, source:{a,b}, clock:[anyt,voidt,str]})
    guard({filter: () => true, source:{a,b}, clock:[voidt,str,anyt]})
    guard({filter: () => true, source:{a,b}, clock:[str,anyt,voidt]})
    guard({filter: () => true, source:{a,b}, clock:[str,voidt,anyt]})
    guard({filter: () => true, source:a    , clock:[voidt]         , target:str     })
    guard({filter: () => true, source:a    , clock:[str]           , target:str     })
    guard({filter: () => true, source:a    , clock:[voidt,str]     , target:str     })
    guard({filter: () => true, source:a    , clock:[str,voidt,anyt], target:str     })
    guard({filter: () => true, source:a    , clock:[voidt,anyt,str], target:str     })
    guard({filter: () => true, source:a    , clock:[anyt,str,voidt], target:str     })
    guard({filter: () => true, source:a    , clock:[voidt,str,anyt], target:str     })
    guard({filter: () => true, source:a    , clock:[str,anyt,voidt], target:str     })
    guard({filter: () => true, source:a    , clock:[anyt,voidt,str], target:str     })
    guard({filter: () => true, source:{a,b}, clock:[voidt]         , target:abTarget})
    guard({filter: () => true, source:{a,b}, clock:[str]           , target:abTarget})
    guard({filter: () => true, source:{a,b}, clock:[voidt,str]     , target:abTarget})
    guard({filter: () => true, source:{a,b}, clock:[voidt,str,anyt], target:abTarget})
    guard({filter: () => true, source:{a,b}, clock:[anyt,voidt,str], target:abTarget})
    guard({filter: () => true, source:{a,b}, clock:[str,voidt,anyt], target:abTarget})
    guard({filter: () => true, source:{a,b}, clock:[str,anyt,voidt], target:abTarget})
    guard({filter: () => true, source:{a,b}, clock:[voidt,anyt,str], target:abTarget})
    guard({filter: () => true, source:{a,b}, clock:[anyt,str,voidt], target:abTarget})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
