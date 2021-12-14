/* eslint-disable no-unused-vars */
import {createStore, createEvent, sample} from 'effector'
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
      sample({filter: () => true, clock:strClk       })
      sample({filter: () => true, clock:anyt         })
      sample({filter: () => true, clock:[strClk]     })
      sample({filter: () => true, clock:[anyt]       })
      sample({filter: () => true, clock:[strClk,anyt]})
      sample({filter: () => true, clock:strClk       , target:str})
      sample({filter: () => true, clock:anyt         , target:str})
      sample({filter: () => true, clock:[strClk]     , target:str})
      sample({filter: () => true, clock:[anyt]       , target:str})
      sample({filter: () => true, clock:[strClk,anyt], target:str})
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
    sample({filter: () => true, source:a    })
    sample({filter: () => true, source:{a,b}})
    sample({filter: () => true, source:a    , target:str     })
    sample({filter: () => true, source:{a,b}, target:abTarget})
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
    sample({filter: () => true, source:a    , clock:[voidt,str]     })
    sample({filter: () => true, source:a    , clock:[voidt]         })
    sample({filter: () => true, source:a    , clock:[str]           })
    sample({filter: () => true, source:a    , clock:[str,voidt,anyt]})
    sample({filter: () => true, source:a    , clock:[voidt,str,anyt]})
    sample({filter: () => true, source:a    , clock:[anyt,str,voidt]})
    sample({filter: () => true, source:a    , clock:[voidt,anyt,str]})
    sample({filter: () => true, source:a    , clock:[str,anyt,voidt]})
    sample({filter: () => true, source:a    , clock:[anyt,voidt,str]})
    sample({filter: () => true, source:{a,b}, clock:[str]           })
    sample({filter: () => true, source:{a,b}, clock:[voidt]         })
    sample({filter: () => true, source:{a,b}, clock:[voidt,str]     })
    sample({filter: () => true, source:{a,b}, clock:[anyt,str,voidt]})
    sample({filter: () => true, source:{a,b}, clock:[voidt,anyt,str]})
    sample({filter: () => true, source:{a,b}, clock:[anyt,voidt,str]})
    sample({filter: () => true, source:{a,b}, clock:[voidt,str,anyt]})
    sample({filter: () => true, source:{a,b}, clock:[str,anyt,voidt]})
    sample({filter: () => true, source:{a,b}, clock:[str,voidt,anyt]})
    sample({filter: () => true, source:a    , clock:[voidt]         , target:str     })
    sample({filter: () => true, source:a    , clock:[str]           , target:str     })
    sample({filter: () => true, source:a    , clock:[voidt,str]     , target:str     })
    sample({filter: () => true, source:a    , clock:[str,voidt,anyt], target:str     })
    sample({filter: () => true, source:a    , clock:[voidt,anyt,str], target:str     })
    sample({filter: () => true, source:a    , clock:[anyt,str,voidt], target:str     })
    sample({filter: () => true, source:a    , clock:[voidt,str,anyt], target:str     })
    sample({filter: () => true, source:a    , clock:[str,anyt,voidt], target:str     })
    sample({filter: () => true, source:a    , clock:[anyt,voidt,str], target:str     })
    sample({filter: () => true, source:{a,b}, clock:[voidt]         , target:abTarget})
    sample({filter: () => true, source:{a,b}, clock:[str]           , target:abTarget})
    sample({filter: () => true, source:{a,b}, clock:[voidt,str]     , target:abTarget})
    sample({filter: () => true, source:{a,b}, clock:[voidt,str,anyt], target:abTarget})
    sample({filter: () => true, source:{a,b}, clock:[anyt,voidt,str], target:abTarget})
    sample({filter: () => true, source:{a,b}, clock:[str,voidt,anyt], target:abTarget})
    sample({filter: () => true, source:{a,b}, clock:[str,anyt,voidt], target:abTarget})
    sample({filter: () => true, source:{a,b}, clock:[voidt,anyt,str], target:abTarget})
    sample({filter: () => true, source:{a,b}, clock:[anyt,str,voidt], target:abTarget})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
