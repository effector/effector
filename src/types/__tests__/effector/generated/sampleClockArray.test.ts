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
const fnAbClockAny = ({a, b}: AB, clock: any) => ({a, b, clock})
const fnAString = (a: string) => ({a})
const fnAStringClockAny = (a: string, clock: any) => ({a, clock})
const fnAb = ({a, b}: AB) => ({a, b})
describe('clock only', () => {
  test('noSource (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:strClk       })
      sample({clock:anyt         })
      sample({clock:[strClk]     })
      sample({clock:[anyt]       })
      sample({clock:[strClk,anyt]})
      sample({clock:strClk       , target:str})
      sample({clock:anyt         , target:str})
      sample({clock:[strClk]     , target:str})
      sample({clock:[anyt]       , target:str})
      sample({clock:[strClk,anyt], target:str})
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('noSource, fn (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidt         , fn:()=>({a:'',b:2})})
      sample({clock:num           , fn:()=>({a:'',b:2})})
      sample({clock:strClk        , fn:()=>({a:'',b:2})})
      sample({clock:anyt          , fn:()=>({a:'',b:2})})
      sample({clock:strClk        , fn:(a) => ({a})    })
      sample({clock:anyt          , fn:(a) => ({a})    })
      sample({clock:[voidt]       , fn:()=>({a:'',b:2})})
      sample({clock:[num]         , fn:()=>({a:'',b:2})})
      sample({clock:[strClk]      , fn:()=>({a:'',b:2})})
      sample({clock:[anyt]        , fn:()=>({a:'',b:2})})
      sample({clock:[voidt,num]   , fn:()=>({a:'',b:2})})
      sample({clock:[voidt,strClk], fn:()=>({a:'',b:2})})
      sample({clock:[voidt,anyt]  , fn:()=>({a:'',b:2})})
      sample({clock:[num,anyt]    , fn:()=>({a:'',b:2})})
      sample({clock:[strClk,num]  , fn:()=>({a:'',b:2})})
      sample({clock:[strClk,anyt] , fn:()=>({a:'',b:2})})
      sample({clock:[strClk]      , fn:(a) => ({a})    })
      sample({clock:[anyt]        , fn:(a) => ({a})    })
      sample({clock:[strClk,anyt] , fn:(a) => ({a})    })
      sample({clock:voidt         , target:aTarget, fn:()=>({a:'',b:2})})
      sample({clock:num           , target:aTarget, fn:()=>({a:'',b:2})})
      sample({clock:strClk        , target:aTarget, fn:()=>({a:'',b:2})})
      sample({clock:anyt          , target:aTarget, fn:()=>({a:'',b:2})})
      sample({clock:strClk        , target:aTarget, fn:(a) => ({a})    })
      sample({clock:anyt          , target:aTarget, fn:(a) => ({a})    })
      sample({clock:[voidt]       , target:aTarget, fn:()=>({a:'',b:2})})
      sample({clock:[num]         , target:aTarget, fn:()=>({a:'',b:2})})
      sample({clock:[strClk]      , target:aTarget, fn:()=>({a:'',b:2})})
      sample({clock:[anyt]        , target:aTarget, fn:()=>({a:'',b:2})})
      sample({clock:[voidt,num]   , target:aTarget, fn:()=>({a:'',b:2})})
      sample({clock:[voidt,strClk], target:aTarget, fn:()=>({a:'',b:2})})
      sample({clock:[voidt,anyt]  , target:aTarget, fn:()=>({a:'',b:2})})
      sample({clock:[num,anyt]    , target:aTarget, fn:()=>({a:'',b:2})})
      sample({clock:[strClk,num]  , target:aTarget, fn:()=>({a:'',b:2})})
      sample({clock:[strClk,anyt] , target:aTarget, fn:()=>({a:'',b:2})})
      sample({clock:[strClk]      , target:aTarget, fn:(a) => ({a})    })
      sample({clock:[anyt]        , target:aTarget, fn:(a) => ({a})    })
      sample({clock:[strClk,anyt] , target:aTarget, fn:(a) => ({a})    })
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
    sample({source:a    })
    sample({source:{a,b}})
    sample({source:a    , target:str     })
    sample({source:{a,b}, target:abTarget})
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
    sample({source:a    , clock:[voidt]     })
    sample({source:a    , clock:[str]       })
    sample({source:a    , clock:[voidt,str] })
    sample({source:a    , clock:[]          })
    sample({source:a    , clock:[anyt]      })
    sample({source:a    , clock:[anyt,voidt]})
    sample({source:a    , clock:[anyt,str]  })
    sample({source:a    , clock:[voidt,anyt]})
    sample({source:a    , clock:[str,anyt]  })
    sample({source:a    , clock:[str,voidt] })
    sample({source:{a,b}, clock:[voidt]     })
    sample({source:{a,b}, clock:[str]       })
    sample({source:{a,b}, clock:[voidt,str] })
    sample({source:{a,b}, clock:[]          })
    sample({source:{a,b}, clock:[anyt]      })
    sample({source:{a,b}, clock:[anyt,voidt]})
    sample({source:{a,b}, clock:[anyt,str]  })
    sample({source:{a,b}, clock:[voidt,anyt]})
    sample({source:{a,b}, clock:[str,anyt]  })
    sample({source:{a,b}, clock:[str,voidt] })
    sample({source:a    , clock:[voidt]     , target:str     })
    sample({source:a    , clock:[str]       , target:str     })
    sample({source:a    , clock:[voidt,str] , target:str     })
    sample({source:a    , clock:[]          , target:str     })
    sample({source:a    , clock:[anyt]      , target:str     })
    sample({source:a    , clock:[anyt,voidt], target:str     })
    sample({source:a    , clock:[anyt,str]  , target:str     })
    sample({source:a    , clock:[voidt,anyt], target:str     })
    sample({source:a    , clock:[str,anyt]  , target:str     })
    sample({source:a    , clock:[str,voidt] , target:str     })
    sample({source:{a,b}, clock:[voidt]     , target:abTarget})
    sample({source:{a,b}, clock:[str]       , target:abTarget})
    sample({source:{a,b}, clock:[voidt,str] , target:abTarget})
    sample({source:{a,b}, clock:[]          , target:abTarget})
    sample({source:{a,b}, clock:[anyt]      , target:abTarget})
    sample({source:{a,b}, clock:[anyt,voidt], target:abTarget})
    sample({source:{a,b}, clock:[anyt,str]  , target:abTarget})
    sample({source:{a,b}, clock:[voidt,anyt], target:abTarget})
    sample({source:{a,b}, clock:[str,anyt]  , target:abTarget})
    sample({source:{a,b}, clock:[str,voidt] , target:abTarget})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('noClock, fn (should pass)', () => {
  //prettier-ignore
  {
    sample({source:a    , fn:()=>({a:''})      })
    sample({source:a    , fn:(a) => ({a})      })
    sample({source:{a,b}, fn:()=>({a:'',b:2})  })
    sample({source:{a,b}, fn:({a,b}) => ({a,b})})
    sample({source:a    , target:aTarget , fn:()=>({a:''})      })
    sample({source:a    , target:aTarget , fn:(a) => ({a})      })
    sample({source:{a,b}, target:abTarget, fn:()=>({a:'',b:2})  })
    sample({source:{a,b}, target:abTarget, fn:({a,b}) => ({a,b})})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('fn (should pass)', () => {
  //prettier-ignore
  {
    sample({source:a    , clock:[voidt]     , fn:()=>({a:''})      })
    sample({source:a    , clock:[str]       , fn:()=>({a:''})      })
    sample({source:a    , clock:[voidt,str] , fn:()=>({a:''})      })
    sample({source:a    , clock:[voidt]     , fn:(a) => ({a})      })
    sample({source:a    , clock:[str]       , fn:(a) => ({a})      })
    sample({source:a    , clock:[voidt,str] , fn:(a) => ({a})      })
    sample({source:a    , clock:[]          , fn:()=>({a:''})      })
    sample({source:a    , clock:[anyt]      , fn:()=>({a:''})      })
    sample({source:a    , clock:[anyt,voidt], fn:()=>({a:''})      })
    sample({source:a    , clock:[anyt,str]  , fn:()=>({a:''})      })
    sample({source:a    , clock:[voidt,anyt], fn:()=>({a:''})      })
    sample({source:a    , clock:[str,anyt]  , fn:()=>({a:''})      })
    sample({source:a    , clock:[str,voidt] , fn:()=>({a:''})      })
    sample({source:a    , clock:[]          , fn:(a) => ({a})      })
    sample({source:a    , clock:[anyt]      , fn:(a) => ({a})      })
    sample({source:a    , clock:[anyt,voidt], fn:(a) => ({a})      })
    sample({source:a    , clock:[anyt,str]  , fn:(a) => ({a})      })
    sample({source:a    , clock:[voidt,anyt], fn:(a) => ({a})      })
    sample({source:a    , clock:[str,anyt]  , fn:(a) => ({a})      })
    sample({source:a    , clock:[str,voidt] , fn:(a) => ({a})      })
    sample({source:{a,b}, clock:[voidt]     , fn:()=>({a:'',b:2})  })
    sample({source:{a,b}, clock:[str]       , fn:()=>({a:'',b:2})  })
    sample({source:{a,b}, clock:[voidt,str] , fn:()=>({a:'',b:2})  })
    sample({source:{a,b}, clock:[voidt]     , fn:({a,b}) => ({a,b})})
    sample({source:{a,b}, clock:[str]       , fn:({a,b}) => ({a,b})})
    sample({source:{a,b}, clock:[voidt,str] , fn:({a,b}) => ({a,b})})
    sample({source:{a,b}, clock:[]          , fn:()=>({a:'',b:2})  })
    sample({source:{a,b}, clock:[anyt]      , fn:()=>({a:'',b:2})  })
    sample({source:{a,b}, clock:[anyt,voidt], fn:()=>({a:'',b:2})  })
    sample({source:{a,b}, clock:[anyt,str]  , fn:()=>({a:'',b:2})  })
    sample({source:{a,b}, clock:[voidt,anyt], fn:()=>({a:'',b:2})  })
    sample({source:{a,b}, clock:[str,anyt]  , fn:()=>({a:'',b:2})  })
    sample({source:{a,b}, clock:[str,voidt] , fn:()=>({a:'',b:2})  })
    sample({source:{a,b}, clock:[]          , fn:({a,b}) => ({a,b})})
    sample({source:{a,b}, clock:[anyt]      , fn:({a,b}) => ({a,b})})
    sample({source:{a,b}, clock:[anyt,voidt], fn:({a,b}) => ({a,b})})
    sample({source:{a,b}, clock:[anyt,str]  , fn:({a,b}) => ({a,b})})
    sample({source:{a,b}, clock:[voidt,anyt], fn:({a,b}) => ({a,b})})
    sample({source:{a,b}, clock:[str,anyt]  , fn:({a,b}) => ({a,b})})
    sample({source:{a,b}, clock:[str,voidt] , fn:({a,b}) => ({a,b})})
    sample({source:a    , clock:[voidt]     , target:aTarget , fn:()=>({a:''})      })
    sample({source:a    , clock:[str]       , target:aTarget , fn:()=>({a:''})      })
    sample({source:a    , clock:[voidt,str] , target:aTarget , fn:()=>({a:''})      })
    sample({source:a    , clock:[voidt]     , target:aTarget , fn:(a) => ({a})      })
    sample({source:a    , clock:[str]       , target:aTarget , fn:(a) => ({a})      })
    sample({source:a    , clock:[voidt,str] , target:aTarget , fn:(a) => ({a})      })
    sample({source:a    , clock:[]          , target:aTarget , fn:()=>({a:''})      })
    sample({source:a    , clock:[anyt]      , target:aTarget , fn:()=>({a:''})      })
    sample({source:a    , clock:[anyt,voidt], target:aTarget , fn:()=>({a:''})      })
    sample({source:a    , clock:[anyt,str]  , target:aTarget , fn:()=>({a:''})      })
    sample({source:a    , clock:[voidt,anyt], target:aTarget , fn:()=>({a:''})      })
    sample({source:a    , clock:[str,anyt]  , target:aTarget , fn:()=>({a:''})      })
    sample({source:a    , clock:[str,voidt] , target:aTarget , fn:()=>({a:''})      })
    sample({source:a    , clock:[]          , target:aTarget , fn:(a) => ({a})      })
    sample({source:a    , clock:[anyt]      , target:aTarget , fn:(a) => ({a})      })
    sample({source:a    , clock:[anyt,voidt], target:aTarget , fn:(a) => ({a})      })
    sample({source:a    , clock:[anyt,str]  , target:aTarget , fn:(a) => ({a})      })
    sample({source:a    , clock:[voidt,anyt], target:aTarget , fn:(a) => ({a})      })
    sample({source:a    , clock:[str,anyt]  , target:aTarget , fn:(a) => ({a})      })
    sample({source:a    , clock:[str,voidt] , target:aTarget , fn:(a) => ({a})      })
    sample({source:{a,b}, clock:[voidt]     , target:abTarget, fn:()=>({a:'',b:2})  })
    sample({source:{a,b}, clock:[str]       , target:abTarget, fn:()=>({a:'',b:2})  })
    sample({source:{a,b}, clock:[voidt,str] , target:abTarget, fn:()=>({a:'',b:2})  })
    sample({source:{a,b}, clock:[voidt]     , target:abTarget, fn:({a,b}) => ({a,b})})
    sample({source:{a,b}, clock:[str]       , target:abTarget, fn:({a,b}) => ({a,b})})
    sample({source:{a,b}, clock:[voidt,str] , target:abTarget, fn:({a,b}) => ({a,b})})
    sample({source:{a,b}, clock:[]          , target:abTarget, fn:()=>({a:'',b:2})  })
    sample({source:{a,b}, clock:[anyt]      , target:abTarget, fn:()=>({a:'',b:2})  })
    sample({source:{a,b}, clock:[anyt,voidt], target:abTarget, fn:()=>({a:'',b:2})  })
    sample({source:{a,b}, clock:[anyt,str]  , target:abTarget, fn:()=>({a:'',b:2})  })
    sample({source:{a,b}, clock:[voidt,anyt], target:abTarget, fn:()=>({a:'',b:2})  })
    sample({source:{a,b}, clock:[str,anyt]  , target:abTarget, fn:()=>({a:'',b:2})  })
    sample({source:{a,b}, clock:[str,voidt] , target:abTarget, fn:()=>({a:'',b:2})  })
    sample({source:{a,b}, clock:[]          , target:abTarget, fn:({a,b}) => ({a,b})})
    sample({source:{a,b}, clock:[anyt]      , target:abTarget, fn:({a,b}) => ({a,b})})
    sample({source:{a,b}, clock:[anyt,voidt], target:abTarget, fn:({a,b}) => ({a,b})})
    sample({source:{a,b}, clock:[anyt,str]  , target:abTarget, fn:({a,b}) => ({a,b})})
    sample({source:{a,b}, clock:[voidt,anyt], target:abTarget, fn:({a,b}) => ({a,b})})
    sample({source:{a,b}, clock:[str,anyt]  , target:abTarget, fn:({a,b}) => ({a,b})})
    sample({source:{a,b}, clock:[str,voidt] , target:abTarget, fn:({a,b}) => ({a,b})})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('fn, fnClock (should pass)', () => {
  //prettier-ignore
  {
    sample({source:a    , clock:[voidt]     , fn:(a,clock) => ({a,clock})       })
    sample({source:a    , clock:[str]       , fn:(a,clock) => ({a,clock})       })
    sample({source:a    , clock:[voidt,str] , fn:(a,clock) => ({a,clock})       })
    sample({source:a    , clock:[]          , fn:(a,clock) => ({a,clock})       })
    sample({source:a    , clock:[anyt]      , fn:(a,clock) => ({a,clock})       })
    sample({source:a    , clock:[anyt,voidt], fn:(a,clock) => ({a,clock})       })
    sample({source:a    , clock:[anyt,str]  , fn:(a,clock) => ({a,clock})       })
    sample({source:a    , clock:[voidt,anyt], fn:(a,clock) => ({a,clock})       })
    sample({source:a    , clock:[str,anyt]  , fn:(a,clock) => ({a,clock})       })
    sample({source:a    , clock:[str,voidt] , fn:(a,clock) => ({a,clock})       })
    sample({source:{a,b}, clock:[voidt]     , fn:({a,b}, clock) => ({a,b,clock})})
    sample({source:{a,b}, clock:[str]       , fn:({a,b}, clock) => ({a,b,clock})})
    sample({source:{a,b}, clock:[voidt,str] , fn:({a,b}, clock) => ({a,b,clock})})
    sample({source:{a,b}, clock:[]          , fn:({a,b}, clock) => ({a,b,clock})})
    sample({source:{a,b}, clock:[anyt]      , fn:({a,b}, clock) => ({a,b,clock})})
    sample({source:{a,b}, clock:[anyt,voidt], fn:({a,b}, clock) => ({a,b,clock})})
    sample({source:{a,b}, clock:[anyt,str]  , fn:({a,b}, clock) => ({a,b,clock})})
    sample({source:{a,b}, clock:[voidt,anyt], fn:({a,b}, clock) => ({a,b,clock})})
    sample({source:{a,b}, clock:[str,anyt]  , fn:({a,b}, clock) => ({a,b,clock})})
    sample({source:{a,b}, clock:[str,voidt] , fn:({a,b}, clock) => ({a,b,clock})})
    sample({source:a    , clock:[voidt]     , target:aclock , fn:(a,clock) => ({a,clock})       })
    sample({source:a    , clock:[str]       , target:aclock , fn:(a,clock) => ({a,clock})       })
    sample({source:a    , clock:[voidt,str] , target:aclock , fn:(a,clock) => ({a,clock})       })
    sample({source:a    , clock:[]          , target:aclock , fn:(a,clock) => ({a,clock})       })
    sample({source:a    , clock:[anyt]      , target:aclock , fn:(a,clock) => ({a,clock})       })
    sample({source:a    , clock:[anyt,voidt], target:aclock , fn:(a,clock) => ({a,clock})       })
    sample({source:a    , clock:[anyt,str]  , target:aclock , fn:(a,clock) => ({a,clock})       })
    sample({source:a    , clock:[voidt,anyt], target:aclock , fn:(a,clock) => ({a,clock})       })
    sample({source:a    , clock:[str,anyt]  , target:aclock , fn:(a,clock) => ({a,clock})       })
    sample({source:a    , clock:[str,voidt] , target:aclock , fn:(a,clock) => ({a,clock})       })
    sample({source:{a,b}, clock:[voidt]     , target:abclock, fn:({a,b}, clock) => ({a,b,clock})})
    sample({source:{a,b}, clock:[str]       , target:abclock, fn:({a,b}, clock) => ({a,b,clock})})
    sample({source:{a,b}, clock:[voidt,str] , target:abclock, fn:({a,b}, clock) => ({a,b,clock})})
    sample({source:{a,b}, clock:[]          , target:abclock, fn:({a,b}, clock) => ({a,b,clock})})
    sample({source:{a,b}, clock:[anyt]      , target:abclock, fn:({a,b}, clock) => ({a,b,clock})})
    sample({source:{a,b}, clock:[anyt,voidt], target:abclock, fn:({a,b}, clock) => ({a,b,clock})})
    sample({source:{a,b}, clock:[anyt,str]  , target:abclock, fn:({a,b}, clock) => ({a,b,clock})})
    sample({source:{a,b}, clock:[voidt,anyt], target:abclock, fn:({a,b}, clock) => ({a,b,clock})})
    sample({source:{a,b}, clock:[str,anyt]  , target:abclock, fn:({a,b}, clock) => ({a,b,clock})})
    sample({source:{a,b}, clock:[str,voidt] , target:abclock, fn:({a,b}, clock) => ({a,b,clock})})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 6 'sample({source:a    , clock:[]          , fn:(a,clock) => ({a,clock})       })'
    Type '(a: string, clock: never) => { a: string; clock: never; }' is not assignable to type '() => any'.
      Target signature provides too few arguments. Expected 2 or more, but got 0.
    Unmarked error at test line 16 'sample({source:{a,b}, clock:[]          , fn:({a,b}, clock) => ({a,b,clock})})'
    Type '({ a, b }: { readonly a: string; readonly b: number; }, clock: never) => { a: string; b: number; clock: never; }' is not assignable to type '() => any'.
      Target signature provides too few arguments. Expected 2 or more, but got 0.
    Unmarked error at test line 26 'sample({source:a    , clock:[]          , target:aclock , fn:(a,clock) => ({a,clock})       })'
    Type '(a: string, clock: never) => { a: string; clock: never; }' is not assignable to type '() => any'.
      Target signature provides too few arguments. Expected 2 or more, but got 0.
    Unmarked error at test line 36 'sample({source:{a,b}, clock:[]          , target:abclock, fn:({a,b}, clock) => ({a,b,clock})})'
    Type '({ a, b }: { readonly a: string; readonly b: number; }, clock: never) => { a: string; b: number; clock: never; }' is not assignable to type '() => any'.
      Target signature provides too few arguments. Expected 2 or more, but got 0.
    "
  `)
})
