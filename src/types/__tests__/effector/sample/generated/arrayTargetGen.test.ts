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

describe('basic cases', () => {
  describe('no fn', () => {
    test('no fn (should pass)', () => {
      //prettier-ignore
      {
        sample({source:num, clock:num, target:[anyt]          })
        sample({source:num, clock:str, target:[anyt]          })
        sample({source:num, clock:num, target:[num]           })
        sample({source:num, clock:str, target:[num]           })
        sample({source:str, clock:num, target:[anyt]          })
        sample({source:str, clock:num, target:[anyt,voidt]    })
        sample({source:str, clock:num, target:[numStr]        })
        sample({source:str, clock:num, target:[voidt]         })
        sample({source:num, clock:num, target:[voidt]         })
        sample({source:num, clock:num, target:[numStr,anyt]   })
        sample({source:str, clock:str, target:[numStr,anyt]   })
        sample({source:str, clock:str, target:[numStr,voidt]  })
        sample({source:str, clock:str, target:[strBool,numStr]})
        sample({source:str, clock:str, target:[strBool,anyt]  })
        sample({source:str, clock:str, target:[strBool,voidt] })
        sample({source:str, clock:str, target:[anyt,numStr]   })
        sample({source:str, clock:str, target:[anyt,voidt]    })
        sample({source:str, clock:str, target:[str,numStr]    })
        sample({source:str, clock:str, target:[str,anyt]      })
        sample({source:str, clock:str, target:[str,voidt]     })
        sample({source:str, clock:str, target:[voidt,numStr]  })
        sample({source:str, clock:str, target:[voidt,strBool] })
        sample({source:str, clock:str, target:[voidt,anyt]    })
        sample({source:str, clock:str, target:[numStr]        })
        sample({source:str, clock:str, target:[strBool]       })
        sample({source:str, clock:str, target:[anyt]          })
        sample({source:str, clock:str, target:[str]           })
        sample({source:str, clock:str, target:[voidt]         })
        sample({source:num, clock:str, target:[voidt]         })
        sample({source:str, clock:num, target:[str,anyt]      })
        sample({source:str, clock:num, target:[strBool,voidt] })
        sample({source:num, clock:str, target:[numStr,anyt]   })
        sample({source:str, clock:num, target:[str,numStr]    })
        sample({source:str, clock:num, target:[numStr,anyt]   })
        sample({source:str, clock:num, target:[strBool]       })
        sample({source:str, clock:num, target:[str]           })
        sample({source:str, clock:num, target:[str,voidt]     })
        sample({source:str, clock:num, target:[strBool,numStr]})
        sample({source:num, clock:num, target:[num,anyt]      })
        sample({source:num, clock:str, target:[num,anyt]      })
        sample({source:str, clock:num, target:[numStr,voidt]  })
        sample({source:num, clock:num, target:[voidt,numStr]  })
        sample({source:num, clock:num, target:[voidt,anyt]    })
        sample({source:str, clock:num, target:[voidt,numStr]  })
        sample({source:num, clock:str, target:[voidt,anyt]    })
        sample({source:num, clock:num, target:[num,numStr]    })
        sample({source:num, clock:str, target:[voidt,numStr]  })
        sample({source:num, clock:num, target:[num,voidt]     })
        sample({source:num, clock:str, target:[num,voidt]     })
        sample({source:num, clock:num, target:[numStr]        })
        sample({source:str, clock:num, target:[anyt,numStr]   })
        sample({source:str, clock:num, target:[voidt,strBool] })
        sample({source:num, clock:num, target:[anyt,numStr]   })
        sample({source:num, clock:str, target:[num,numStr]    })
        sample({source:str, clock:num, target:[voidt,anyt]    })
        sample({source:num, clock:num, target:[anyt,voidt]    })
        sample({source:str, clock:num, target:[strBool,anyt]  })
        sample({source:num, clock:str, target:[anyt,voidt]    })
        sample({source:num, clock:str, target:[numStr]        })
        sample({source:num, clock:num, target:[numStr,voidt]  })
        sample({source:num, clock:str, target:[numStr,voidt]  })
        sample({source:num, clock:str, target:[anyt,numStr]   })
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
        sample({source:str, clock:num, target:[num,strBool]   })
        //@ts-expect-error
        sample({source:str, clock:num, target:[num]           })
        //@ts-expect-error
        sample({source:str, clock:str, target:[num]           })
        //@ts-expect-error
        sample({source:num, clock:num, target:[str]           })
        //@ts-expect-error
        sample({source:str, clock:num, target:[num,voidt]     })
        //@ts-expect-error
        sample({source:str, clock:str, target:[num,numStr]    })
        //@ts-expect-error
        sample({source:str, clock:str, target:[num,strBool]   })
        //@ts-expect-error
        sample({source:str, clock:str, target:[num,anyt]      })
        //@ts-expect-error
        sample({source:str, clock:str, target:[num,str]       })
        //@ts-expect-error
        sample({source:str, clock:str, target:[num,voidt]     })
        //@ts-expect-error
        sample({source:num, clock:str, target:[str]           })
        //@ts-expect-error
        sample({source:str, clock:num, target:[num,str]       })
        //@ts-expect-error
        sample({source:str, clock:num, target:[num,anyt]      })
        //@ts-expect-error
        sample({source:num, clock:num, target:[num,str]       })
        //@ts-expect-error
        sample({source:num, clock:str, target:[num,str]       })
        //@ts-expect-error
        sample({source:str, clock:num, target:[num,numStr]    })
        //@ts-expect-error
        sample({source:num, clock:num, target:[str,voidt]     })
        //@ts-expect-error
        sample({source:num, clock:num, target:[strBool,voidt] })
        //@ts-expect-error
        sample({source:num, clock:num, target:[num,strBool]   })
        //@ts-expect-error
        sample({source:num, clock:num, target:[str,numStr]    })
        //@ts-expect-error
        sample({source:num, clock:str, target:[str,numStr]    })
        //@ts-expect-error
        sample({source:num, clock:str, target:[str,voidt]     })
        //@ts-expect-error
        sample({source:num, clock:num, target:[strBool]       })
        //@ts-expect-error
        sample({source:num, clock:str, target:[strBool]       })
        //@ts-expect-error
        sample({source:num, clock:str, target:[num,strBool]   })
        //@ts-expect-error
        sample({source:num, clock:num, target:[strBool,anyt]  })
        //@ts-expect-error
        sample({source:num, clock:str, target:[strBool,voidt] })
        //@ts-expect-error
        sample({source:num, clock:num, target:[voidt,strBool] })
        //@ts-expect-error
        sample({source:num, clock:str, target:[strBool,anyt]  })
        //@ts-expect-error
        sample({source:num, clock:num, target:[strBool,numStr]})
        //@ts-expect-error
        sample({source:num, clock:num, target:[str,anyt]      })
        //@ts-expect-error
        sample({source:num, clock:str, target:[str,anyt]      })
        //@ts-expect-error
        sample({source:num, clock:str, target:[voidt,strBool] })
        //@ts-expect-error
        sample({source:num, clock:str, target:[strBool,numStr]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
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
            Type 'Event<string>' is not assignable to type '\\"incompatible unit in target\\"'.
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
            Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
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
        "
      `)
    })
  })
  describe('untyped fn', () => {
    test('untyped fn (should pass)', () => {
      //prettier-ignore
      {
        sample({source:num, clock:str, target:[strBool,numStr], fn:(src,clk) => src + clk})
        sample({source:num, clock:num, target:[numStr,voidt]  , fn:(src,clk) => src + clk})
        sample({source:num, clock:str, target:[strBool,anyt]  , fn:(src,clk) => src + clk})
        sample({source:num, clock:str, target:[numStr,voidt]  , fn:(src,clk) => src + clk})
        sample({source:str, clock:str, target:[numStr,voidt]  , fn:(src,clk) => src + clk})
        sample({source:str, clock:str, target:[strBool,numStr], fn:(src,clk) => src + clk})
        sample({source:num, clock:str, target:[strBool,voidt] , fn:(src,clk) => src + clk})
        sample({source:str, clock:str, target:[strBool,anyt]  , fn:(src,clk) => src + clk})
        sample({source:num, clock:num, target:[anyt,numStr]   , fn:(src,clk) => src + clk})
        sample({source:num, clock:str, target:[anyt,numStr]   , fn:(src,clk) => src + clk})
        sample({source:str, clock:str, target:[strBool,voidt] , fn:(src,clk) => src + clk})
        sample({source:num, clock:str, target:[str,numStr]    , fn:(src,clk) => src + clk})
        sample({source:num, clock:num, target:[anyt,voidt]    , fn:(src,clk) => src + clk})
        sample({source:num, clock:str, target:[anyt,voidt]    , fn:(src,clk) => src + clk})
        sample({source:str, clock:str, target:[anyt,numStr]   , fn:(src,clk) => src + clk})
        sample({source:str, clock:str, target:[anyt,voidt]    , fn:(src,clk) => src + clk})
        sample({source:num, clock:num, target:[voidt,numStr]  , fn:(src,clk) => src + clk})
        sample({source:num, clock:str, target:[str,voidt]     , fn:(src,clk) => src + clk})
        sample({source:num, clock:str, target:[voidt,numStr]  , fn:(src,clk) => src + clk})
        sample({source:num, clock:str, target:[str,anyt]      , fn:(src,clk) => src + clk})
        sample({source:str, clock:str, target:[str,numStr]    , fn:(src,clk) => src + clk})
        sample({source:str, clock:str, target:[str,anyt]      , fn:(src,clk) => src + clk})
        sample({source:str, clock:str, target:[str,voidt]     , fn:(src,clk) => src + clk})
        sample({source:num, clock:str, target:[voidt,strBool] , fn:(src,clk) => src + clk})
        sample({source:str, clock:str, target:[voidt,numStr]  , fn:(src,clk) => src + clk})
        sample({source:num, clock:num, target:[voidt,anyt]    , fn:(src,clk) => src + clk})
        sample({source:num, clock:str, target:[voidt,anyt]    , fn:(src,clk) => src + clk})
        sample({source:str, clock:str, target:[voidt,strBool] , fn:(src,clk) => src + clk})
        sample({source:num, clock:num, target:[num,numStr]    , fn:(src,clk) => src + clk})
        sample({source:str, clock:str, target:[voidt,anyt]    , fn:(src,clk) => src + clk})
        sample({source:num, clock:num, target:[num]           , fn:(src,clk) => src + clk})
        sample({source:num, clock:num, target:[num,anyt]      , fn:(src,clk) => src + clk})
        sample({source:str, clock:num, target:[numStr,anyt]   , fn:(src,clk) => src + clk})
        sample({source:str, clock:num, target:[numStr,voidt]  , fn:(src,clk) => src + clk})
        sample({source:str, clock:num, target:[strBool,anyt]  , fn:(src,clk) => src + clk})
        sample({source:str, clock:num, target:[anyt,numStr]   , fn:(src,clk) => src + clk})
        sample({source:str, clock:num, target:[str,numStr]    , fn:(src,clk) => src + clk})
        sample({source:str, clock:num, target:[str,voidt]     , fn:(src,clk) => src + clk})
        sample({source:str, clock:num, target:[voidt,strBool] , fn:(src,clk) => src + clk})
        sample({source:num, clock:num, target:[numStr]        , fn:(src,clk) => src + clk})
        sample({source:num, clock:str, target:[strBool]       , fn:(src,clk) => src + clk})
        sample({source:num, clock:str, target:[numStr]        , fn:(src,clk) => src + clk})
        sample({source:num, clock:num, target:[num,voidt]     , fn:(src,clk) => src + clk})
        sample({source:str, clock:str, target:[numStr]        , fn:(src,clk) => src + clk})
        sample({source:num, clock:num, target:[anyt]          , fn:(src,clk) => src + clk})
        sample({source:str, clock:num, target:[strBool]       , fn:(src,clk) => src + clk})
        sample({source:num, clock:num, target:[numStr,anyt]   , fn:(src,clk) => src + clk})
        sample({source:str, clock:num, target:[strBool,numStr], fn:(src,clk) => src + clk})
        sample({source:str, clock:num, target:[strBool,voidt] , fn:(src,clk) => src + clk})
        sample({source:str, clock:num, target:[anyt,voidt]    , fn:(src,clk) => src + clk})
        sample({source:str, clock:num, target:[str,anyt]      , fn:(src,clk) => src + clk})
        sample({source:str, clock:num, target:[voidt,numStr]  , fn:(src,clk) => src + clk})
        sample({source:str, clock:num, target:[voidt,anyt]    , fn:(src,clk) => src + clk})
        sample({source:num, clock:str, target:[anyt]          , fn:(src,clk) => src + clk})
        sample({source:str, clock:num, target:[numStr]        , fn:(src,clk) => src + clk})
        sample({source:str, clock:str, target:[strBool]       , fn:(src,clk) => src + clk})
        sample({source:str, clock:num, target:[anyt]          , fn:(src,clk) => src + clk})
        sample({source:num, clock:str, target:[str]           , fn:(src,clk) => src + clk})
        sample({source:str, clock:num, target:[str]           , fn:(src,clk) => src + clk})
        sample({source:str, clock:str, target:[anyt]          , fn:(src,clk) => src + clk})
        sample({source:num, clock:num, target:[voidt]         , fn:(src,clk) => src + clk})
        sample({source:str, clock:str, target:[voidt]         , fn:(src,clk) => src + clk})
        sample({source:num, clock:str, target:[voidt]         , fn:(src,clk) => src + clk})
        sample({source:str, clock:num, target:[voidt]         , fn:(src,clk) => src + clk})
        sample({source:str, clock:str, target:[str]           , fn:(src,clk) => src + clk})
        sample({source:num, clock:str, target:[numStr,anyt]   , fn:(src,clk) => src + clk})
        sample({source:str, clock:str, target:[numStr,anyt]   , fn:(src,clk) => src + clk})
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
        sample({source:num, clock:num, target:[strBool,numStr], fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:num, clock:num, target:[strBool,anyt]  , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:num, clock:num, target:[strBool,voidt] , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:num, clock:num, target:[str,numStr]    , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:num, clock:num, target:[str,voidt]     , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:num, clock:num, target:[str,anyt]      , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:num, clock:num, target:[voidt,strBool] , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:num, clock:num, target:[num,str]       , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[num,str]       , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[num,numStr]    , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:num, clock:num, target:[num,strBool]   , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[num,strBool]   , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:str, clock:str, target:[num,numStr]    , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:num, clock:num, target:[strBool]       , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[num,anyt]      , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:str, clock:str, target:[num,strBool]   , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:str, clock:str, target:[num,anyt]      , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[num,numStr]    , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[num,anyt]      , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[num,voidt]     , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[num,voidt]     , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:str, clock:str, target:[num,str]       , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:str, clock:str, target:[num,voidt]     , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[num]           , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[num]           , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:str, clock:str, target:[num]           , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[num,strBool]   , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[num,str]       , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:num, clock:num, target:[str]           , fn:(src,clk) => src + clk})
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
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('typed fn', () => {
    test('typed fn (should pass)', () => {
      //prettier-ignore
      {
        sample({source:num, clock:num, target:[num]         , fn:(src:number,clk:number) => src+clk})
        sample({source:num, clock:num, target:[voidt]       , fn:(src:number,clk:number) => src+clk})
        sample({source:num, clock:num, target:[anyt]        , fn:(src:number,clk:number) => src+clk})
        sample({source:num, clock:num, target:[numStr]      , fn:(src:number,clk:number) => src+clk})
        sample({source:num, clock:num, target:[num,voidt]   , fn:(src:number,clk:number) => src+clk})
        sample({source:num, clock:num, target:[num,anyt]    , fn:(src:number,clk:number) => src+clk})
        sample({source:num, clock:num, target:[num,numStr]  , fn:(src:number,clk:number) => src+clk})
        sample({source:num, clock:num, target:[voidt,anyt]  , fn:(src:number,clk:number) => src+clk})
        sample({source:num, clock:num, target:[voidt,numStr], fn:(src:number,clk:number) => src+clk})
        sample({source:num, clock:num, target:[anyt,voidt]  , fn:(src:number,clk:number) => src+clk})
        sample({source:num, clock:num, target:[anyt,numStr] , fn:(src:number,clk:number) => src+clk})
        sample({source:num, clock:num, target:[numStr,voidt], fn:(src:number,clk:number) => src+clk})
        sample({source:num, clock:num, target:[numStr,anyt] , fn:(src:number,clk:number) => src+clk})
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
        sample({source:str, clock:num, target:[num]           , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[num]           , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[voidt]         , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[voidt]         , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:num, target:[str]           , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[str]           , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[str]           , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[anyt]          , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[anyt]          , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:num, target:[strBool]       , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[strBool]       , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[strBool]       , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[numStr]        , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[numStr]        , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[num,voidt]     , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[num,voidt]     , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:num, target:[num,str]       , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[num,str]       , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[num,str]       , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[num,anyt]      , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[num,anyt]      , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:num, target:[num,strBool]   , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[num,strBool]   , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[num,strBool]   , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[num,numStr]    , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[num,numStr]    , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[voidt,anyt]    , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[voidt,anyt]    , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:num, target:[voidt,strBool] , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[voidt,strBool] , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[voidt,strBool] , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[voidt,numStr]  , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[voidt,numStr]  , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:num, target:[str,voidt]     , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[str,voidt]     , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[str,voidt]     , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:num, target:[str,anyt]      , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[str,anyt]      , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[str,anyt]      , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:num, target:[str,numStr]    , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[str,numStr]    , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[str,numStr]    , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[anyt,voidt]    , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[anyt,voidt]    , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[anyt,numStr]   , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[anyt,numStr]   , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:num, target:[strBool,voidt] , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[strBool,voidt] , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[strBool,voidt] , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:num, target:[strBool,anyt]  , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[strBool,anyt]  , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[strBool,anyt]  , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:num, target:[strBool,numStr], fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[strBool,numStr], fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[strBool,numStr], fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[numStr,voidt]  , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[numStr,voidt]  , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[numStr,anyt]   , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[numStr,anyt]   , fn:(src:number,clk:number) => src+clk})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
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
            Type '(src: number, clk: number) => number' is not assignable to type '(source: number, clock: string) => unknown'.
              Types of parameters 'clk' and 'clock' are incompatible.
                Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string>' is not assignable to type '\\"incompatible unit in target\\"'.
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
            Type '(src: number, clk: number) => number' is not assignable to type '(source: number, clock: string) => unknown'.
              Types of parameters 'clk' and 'clock' are incompatible.
                Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
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
            Type 'Event<string>' is not assignable to type '\\"incompatible unit in target\\"'.
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
            Type '(src: number, clk: number) => number' is not assignable to type '(source: number, clock: string) => unknown'.
              Types of parameters 'clk' and 'clock' are incompatible.
                Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
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
            Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
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
            Type '(src: number, clk: number) => number' is not assignable to type '(source: number, clock: string) => unknown'.
              Types of parameters 'clk' and 'clock' are incompatible.
                Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<string>' is not assignable to type '\\"incompatible unit in target\\"'.
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
            Type 'Event<string>' is not assignable to type '\\"incompatible unit in target\\"'.
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
            Type 'Event<string>' is not assignable to type '\\"incompatible unit in target\\"'.
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
            Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
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
            Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
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
            Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
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
        "
      `)
    })
  })
})
describe('combinable', () => {
  describe('source:wide', () => {
    test('source:wide (should pass)', () => {
      //prettier-ignore
      {
        sample({source:{a:$num,b:$str}, target:[a_num]    })
        sample({source:{a:$num,b:$str}, target:[a_num,ab] })
        sample({source:{a:$num,b:$str}, target:[ab]       })
        sample({source:{a:$num,b:$str}, clock:num, target:[a_num]    })
        sample({source:{a:$num,b:$str}, clock:num, target:[a_num,ab] })
        sample({source:{a:$num,b:$str}, clock:num, target:[ab]       })
        sample({source:[$num,$str]    , target:[l_num_str]})
        sample({source:[$num,$str]    , clock:num, target:[l_num_str]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[abn]                })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[a_num,a_str]        })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[abn,a_str]          })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[a_str]              })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[a_num,abn]          })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[abn,ab]             })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[ab,a_str]           })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[a_str,ab]           })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[abn]                })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[abn,a_str]          })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[ab,a_str]           })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[a_str]              })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[a_num,abn]          })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[abn,ab]             })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[a_str,ab]           })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[a_num,a_str]        })
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[l_num]              })
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[l_str]              })
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[l_num,l_num_str]    })
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[l_num,l_str]        })
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[l_num_str,l_num_num]})
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[l_num,l_num_num]    })
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[l_num_str,l_str]    })
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[l_num_num,l_str]    })
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[l_num_num]          })
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[l_str,l_num_num]    })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[l_num]              })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[l_str]              })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[l_num,l_str]        })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[l_num,l_num_str]    })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[l_num,l_num_num]    })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[l_num_str,l_str]    })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[l_num_num,l_str]    })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[l_str,l_num_num]    })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[l_num_str,l_num_num]})
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[l_num_num]          })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
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
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
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
            Type 'Event<[number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
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
            Type 'Event<[number]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
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
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
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
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
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
            Type 'Event<[number]>' is not assignable to type '\\"incompatible unit in target\\"'.
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
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('source:wide, fn:untyped', () => {
    test('source:wide, fn:untyped (should pass)', () => {
      //prettier-ignore
      {
        sample({source:{a:$num,b:$str}, target:[ab]      , fn:({a,b}) => ({a,b})        })
        sample({source:{a:$num,b:$str}, target:[a_num]   , fn:fn.noArgs                 })
        sample({source:{a:$num,b:$str}, target:[a_num,ab], fn:fn.noArgs                 })
        sample({source:{a:$num,b:$str}, target:[a_num,ab], fn:({a,b}) => ({a,b})        })
        sample({source:{a:$num,b:$str}, target:[a_num]   , fn:({a,b}) => ({a,b})        })
        sample({source:{a:$num,b:$str}, target:[ab]      , fn:fn.noArgs                 })
        sample({source:{a:$num,b:$str}, clock:num, target:[ab]      , fn:fn.noArgs                 })
        sample({source:{a:$num,b:$str}, clock:num, target:[a_num,ab], fn:({a,b}) => ({a,b})        })
        sample({source:{a:$num,b:$str}, clock:num, target:[a_num]   , fn:fn.noArgs                 })
        sample({source:{a:$num,b:$str}, clock:num, target:[a_num,ab], fn:({a,b},cl) => ({a:a+cl,b})})
        sample({source:{a:$num,b:$str}, clock:num, target:[ab]      , fn:({a,b}) => ({a,b})        })
        sample({source:{a:$num,b:$str}, clock:num, target:[ab]      , fn:({a,b},cl) => ({a:a+cl,b})})
        sample({source:{a:$num,b:$str}, clock:num, target:[a_num]   , fn:({a,b}) => ({a,b})        })
        sample({source:{a:$num,b:$str}, clock:num, target:[a_num,ab], fn:fn.noArgs                 })
        sample({source:{a:$num,b:$str}, clock:num, target:[a_num]   , fn:({a,b},cl) => ({a:a+cl,b})})
        sample({source:[$num,$str]    , target:[a_num]   , fn:fn.noArgs                 })
        sample({source:[$num,$str]    , target:[a_num]   , fn:([a,b]) => ({a,b})        })
        sample({source:[$num,$str]    , target:[a_num,ab], fn:fn.noArgs                 })
        sample({source:[$num,$str]    , target:[ab]      , fn:fn.noArgs                 })
        sample({source:[$num,$str]    , target:[a_num,ab], fn:([a,b]) => ({a,b})        })
        sample({source:[$num,$str]    , target:[ab]      , fn:([a,b]) => ({a,b})        })
        sample({source:[$num,$str]    , clock:num, target:[a_num]   , fn:([a,b]) => ({a,b})        })
        sample({source:[$num,$str]    , clock:num, target:[a_num,ab], fn:([a,b]) => ({a,b})        })
        sample({source:[$num,$str]    , clock:num, target:[a_num]   , fn:fn.noArgs                 })
        sample({source:[$num,$str]    , clock:num, target:[a_num,ab], fn:fn.noArgs                 })
        sample({source:[$num,$str]    , clock:num, target:[ab]      , fn:fn.noArgs                 })
        sample({source:[$num,$str]    , clock:num, target:[ab]      , fn:([a,b]) => ({a,b})        })
        sample({source:[$num,$str]    , clock:num, target:[a_num]   , fn:([a,b],cl) => ({a:a+cl,b})})
        sample({source:[$num,$str]    , clock:num, target:[a_num,ab], fn:([a,b],cl) => ({a:a+cl,b})})
        sample({source:[$num,$str]    , clock:num, target:[ab]      , fn:([a,b],cl) => ({a:a+cl,b})})
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
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[abn,a_str]  , fn:({a,b}) => ({a,b})        })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[abn,a_str]  , fn:fn.noArgs                 })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[a_str,ab]   , fn:fn.noArgs                 })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[a_str,ab]   , fn:({a,b}) => ({a,b})        })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[a_num,abn]  , fn:fn.noArgs                 })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[a_str]      , fn:fn.noArgs                 })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[a_num,a_str], fn:fn.noArgs                 })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[abn,ab]     , fn:({a,b}) => ({a,b})        })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[abn,ab]     , fn:fn.noArgs                 })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[a_num,abn]  , fn:({a,b}) => ({a,b})        })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[a_str]      , fn:({a,b}) => ({a,b})        })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[abn]        , fn:fn.noArgs                 })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[ab,a_str]   , fn:fn.noArgs                 })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[a_num,a_str], fn:({a,b}) => ({a,b})        })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[abn]        , fn:({a,b}) => ({a,b})        })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[ab,a_str]   , fn:({a,b}) => ({a,b})        })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[a_num,abn]  , fn:fn.noArgs                 })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[abn]        , fn:({a,b},cl) => ({a:a+cl,b})})
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[ab,a_str]   , fn:({a,b},cl) => ({a:a+cl,b})})
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[ab,a_str]   , fn:fn.noArgs                 })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[a_num,a_str], fn:({a,b}) => ({a,b})        })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[a_num,abn]  , fn:({a,b}) => ({a,b})        })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[a_num,abn]  , fn:({a,b},cl) => ({a:a+cl,b})})
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[abn]        , fn:({a,b}) => ({a,b})        })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[abn,a_str]  , fn:({a,b}) => ({a,b})        })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[a_str,ab]   , fn:({a,b},cl) => ({a:a+cl,b})})
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[ab,a_str]   , fn:({a,b}) => ({a,b})        })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[abn]        , fn:fn.noArgs                 })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[a_str]      , fn:fn.noArgs                 })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[a_str,ab]   , fn:fn.noArgs                 })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[abn,ab]     , fn:fn.noArgs                 })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[a_num,a_str], fn:({a,b},cl) => ({a:a+cl,b})})
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[abn,ab]     , fn:({a,b},cl) => ({a:a+cl,b})})
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[a_str]      , fn:({a,b},cl) => ({a:a+cl,b})})
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[a_num,a_str], fn:fn.noArgs                 })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[a_str]      , fn:({a,b}) => ({a,b})        })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[abn,a_str]  , fn:({a,b},cl) => ({a:a+cl,b})})
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[abn,ab]     , fn:({a,b}) => ({a,b})        })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[abn,a_str]  , fn:fn.noArgs                 })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[a_str,ab]   , fn:({a,b}) => ({a,b})        })
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[a_num,a_str], fn:fn.noArgs                 })
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[a_str]      , fn:fn.noArgs                 })
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[abn,ab]     , fn:fn.noArgs                 })
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[abn,a_str]  , fn:fn.noArgs                 })
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[a_num,abn]  , fn:fn.noArgs                 })
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[a_str,ab]   , fn:fn.noArgs                 })
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[abn]        , fn:fn.noArgs                 })
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[a_str]      , fn:([a,b]) => ({a,b})        })
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[abn]        , fn:([a,b]) => ({a,b})        })
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[ab,a_str]   , fn:fn.noArgs                 })
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[a_num,abn]  , fn:([a,b]) => ({a,b})        })
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[a_num,a_str], fn:([a,b]) => ({a,b})        })
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[abn,a_str]  , fn:([a,b]) => ({a,b})        })
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[ab,a_str]   , fn:([a,b]) => ({a,b})        })
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[a_str,ab]   , fn:([a,b]) => ({a,b})        })
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[abn,ab]     , fn:([a,b]) => ({a,b})        })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[abn]        , fn:([a,b]) => ({a,b})        })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[a_num,a_str], fn:([a,b]) => ({a,b})        })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[abn,a_str]  , fn:([a,b]) => ({a,b})        })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[a_str]      , fn:([a,b]) => ({a,b})        })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[a_num,abn]  , fn:([a,b]) => ({a,b})        })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[abn,ab]     , fn:([a,b]) => ({a,b})        })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[abn]        , fn:fn.noArgs                 })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[a_str,ab]   , fn:([a,b],cl) => ({a:a+cl,b})})
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[a_num,a_str], fn:fn.noArgs                 })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[abn,a_str]  , fn:fn.noArgs                 })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[a_str,ab]   , fn:fn.noArgs                 })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[a_str]      , fn:([a,b],cl) => ({a:a+cl,b})})
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[ab,a_str]   , fn:fn.noArgs                 })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[ab,a_str]   , fn:([a,b]) => ({a,b})        })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[a_str,ab]   , fn:([a,b]) => ({a,b})        })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[a_str]      , fn:fn.noArgs                 })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[a_num,abn]  , fn:fn.noArgs                 })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[a_num,abn]  , fn:([a,b],cl) => ({a:a+cl,b})})
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[abn]        , fn:([a,b],cl) => ({a:a+cl,b})})
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[a_num,a_str], fn:([a,b],cl) => ({a:a+cl,b})})
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[abn,a_str]  , fn:([a,b],cl) => ({a:a+cl,b})})
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[ab,a_str]   , fn:([a,b],cl) => ({a:a+cl,b})})
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[abn,ab]     , fn:fn.noArgs                 })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[abn,ab]     , fn:([a,b],cl) => ({a:a+cl,b})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
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
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
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
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
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
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
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
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
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
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
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
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
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
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
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
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('source:wide, fn:typed', () => {
    test('source:wide, fn:typed (should pass)', () => {
      //prettier-ignore
      {
        sample({source:{a:$num,b:$str}, target:[ab]      , fn:fn.typedSrc.object.pair     })
        sample({source:{a:$num,b:$str}, target:[a_num]   , fn:fn.typedSrc.object.pair     })
        sample({source:{a:$num,b:$str}, target:[a_num,ab], fn:fn.typedSrc.object.pair     })
        sample({source:{a:$num,b:$str}, clock:num, target:[ab]      , fn:fn.typedSrc.object.pair     })
        sample({source:{a:$num,b:$str}, clock:num, target:[a_num,ab], fn:fn.typedSrcClock.object.pair})
        sample({source:{a:$num,b:$str}, clock:num, target:[a_num]   , fn:fn.typedSrc.object.pair     })
        sample({source:{a:$num,b:$str}, clock:num, target:[a_num,ab], fn:fn.typedSrc.object.pair     })
        sample({source:{a:$num,b:$str}, clock:num, target:[a_num]   , fn:fn.typedSrcClock.object.pair})
        sample({source:{a:$num,b:$str}, clock:num, target:[ab]      , fn:fn.typedSrcClock.object.pair})
        sample({source:[$num,$str]    , target:[ab]      , fn:fn.typedSrc.tuple.pair      })
        sample({source:[$num,$str]    , target:[a_num]   , fn:fn.typedSrc.tuple.pair      })
        sample({source:[$num,$str]    , target:[a_num,ab], fn:fn.typedSrc.tuple.pair      })
        sample({source:[$num,$str]    , clock:num, target:[ab]      , fn:fn.typedSrc.tuple.pair      })
        sample({source:[$num,$str]    , clock:num, target:[ab]      , fn:fn.typedSrcClock.tuple.pair })
        sample({source:[$num,$str]    , clock:num, target:[a_num]   , fn:fn.typedSrcClock.tuple.pair })
        sample({source:[$num,$str]    , clock:num, target:[a_num,ab], fn:fn.typedSrcClock.tuple.pair })
        sample({source:[$num,$str]    , clock:num, target:[a_num]   , fn:fn.typedSrc.tuple.pair      })
        sample({source:[$num,$str]    , clock:num, target:[a_num,ab], fn:fn.typedSrc.tuple.pair      })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:wide, fn:typed (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[a_num,abn]  , fn:fn.typedSrc.object.pair     })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[a_num,a_str], fn:fn.typedSrc.object.pair     })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[a_str]      , fn:fn.typedSrc.object.pair     })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[abn,ab]     , fn:fn.typedSrc.object.pair     })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[abn]        , fn:fn.typedSrc.object.pair     })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[a_str,ab]   , fn:fn.typedSrc.object.pair     })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[ab,a_str]   , fn:fn.typedSrc.object.pair     })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[abn,a_str]  , fn:fn.typedSrc.object.pair     })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[abn]        , fn:fn.typedSrc.object.pair     })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[a_str]      , fn:fn.typedSrc.object.pair     })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[a_str,ab]   , fn:fn.typedSrcClock.object.pair})
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[a_num,abn]  , fn:fn.typedSrcClock.object.pair})
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[a_num,a_str], fn:fn.typedSrc.object.pair     })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[a_num,a_str], fn:fn.typedSrcClock.object.pair})
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[abn,a_str]  , fn:fn.typedSrc.object.pair     })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[a_str]      , fn:fn.typedSrcClock.object.pair})
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[abn]        , fn:fn.typedSrcClock.object.pair})
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[ab,a_str]   , fn:fn.typedSrcClock.object.pair})
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[abn,ab]     , fn:fn.typedSrcClock.object.pair})
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[ab,a_str]   , fn:fn.typedSrc.object.pair     })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[a_num,abn]  , fn:fn.typedSrc.object.pair     })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[abn,a_str]  , fn:fn.typedSrcClock.object.pair})
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[abn,ab]     , fn:fn.typedSrc.object.pair     })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[a_str,ab]   , fn:fn.typedSrc.object.pair     })
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[a_str]      , fn:fn.typedSrc.tuple.pair      })
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[abn]        , fn:fn.typedSrc.tuple.pair      })
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[abn,ab]     , fn:fn.typedSrc.tuple.pair      })
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[ab,a_str]   , fn:fn.typedSrc.tuple.pair      })
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[a_num,a_str], fn:fn.typedSrc.tuple.pair      })
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[a_num,abn]  , fn:fn.typedSrc.tuple.pair      })
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[a_str,ab]   , fn:fn.typedSrc.tuple.pair      })
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[abn,a_str]  , fn:fn.typedSrc.tuple.pair      })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[a_str]      , fn:fn.typedSrcClock.tuple.pair })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[a_str,ab]   , fn:fn.typedSrcClock.tuple.pair })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[a_num,abn]  , fn:fn.typedSrcClock.tuple.pair })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[abn]        , fn:fn.typedSrcClock.tuple.pair })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[a_num,a_str], fn:fn.typedSrcClock.tuple.pair })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[abn,ab]     , fn:fn.typedSrcClock.tuple.pair })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[a_str,ab]   , fn:fn.typedSrc.tuple.pair      })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[a_str]      , fn:fn.typedSrc.tuple.pair      })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[a_num,abn]  , fn:fn.typedSrc.tuple.pair      })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[abn,a_str]  , fn:fn.typedSrcClock.tuple.pair })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[ab,a_str]   , fn:fn.typedSrcClock.tuple.pair })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[abn]        , fn:fn.typedSrc.tuple.pair      })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[a_num,a_str], fn:fn.typedSrc.tuple.pair      })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[abn,a_str]  , fn:fn.typedSrc.tuple.pair      })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[ab,a_str]   , fn:fn.typedSrc.tuple.pair      })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[abn,ab]     , fn:fn.typedSrc.tuple.pair      })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
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
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
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
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
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
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
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
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
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
        "
      `)
    })
  })
  test('source:wide, fn:assert (should fail)', () => {
    //prettier-ignore
    {
      //@ts-expect-error
      sample({source:{a:$num,b:$str}, target:[ab]         , fn:fn.assertFirstOnly.object.pair})
      //@ts-expect-error
      sample({source:{a:$num,b:$str}, target:[a_str]      , fn:fn.assertFirstOnly.object.pair})
      //@ts-expect-error
      sample({source:{a:$num,b:$str}, target:[abn,ab]     , fn:fn.assertFirstOnly.object.pair})
      //@ts-expect-error
      sample({source:{a:$num,b:$str}, target:[abn]        , fn:fn.assertFirstOnly.object.pair})
      //@ts-expect-error
      sample({source:{a:$num,b:$str}, target:[ab,a_str]   , fn:fn.assertFirstOnly.object.pair})
      //@ts-expect-error
      sample({source:{a:$num,b:$str}, target:[a_num,a_str], fn:fn.assertFirstOnly.object.pair})
      //@ts-expect-error
      sample({source:{a:$num,b:$str}, target:[a_num]      , fn:fn.assertFirstOnly.object.pair})
      //@ts-expect-error
      sample({source:{a:$num,b:$str}, target:[a_str,ab]   , fn:fn.assertFirstOnly.object.pair})
      //@ts-expect-error
      sample({source:{a:$num,b:$str}, target:[a_num,ab]   , fn:fn.assertFirstOnly.object.pair})
      //@ts-expect-error
      sample({source:{a:$num,b:$str}, target:[abn,a_str]  , fn:fn.assertFirstOnly.object.pair})
      //@ts-expect-error
      sample({source:{a:$num,b:$str}, target:[a_num,abn]  , fn:fn.assertFirstOnly.object.pair})
      //@ts-expect-error
      sample({source:{a:$num,b:$str}, clock:num, target:[a_num,abn]  , fn:fn.assertSecond.object.pair   })
      //@ts-expect-error
      sample({source:{a:$num,b:$str}, clock:num, target:[abn,ab]     , fn:fn.assertFirst.object.pair    })
      //@ts-expect-error
      sample({source:{a:$num,b:$str}, clock:num, target:[abn,a_str]  , fn:fn.assertSecond.object.pair   })
      //@ts-expect-error
      sample({source:{a:$num,b:$str}, clock:num, target:[a_num]      , fn:fn.assertFirst.object.pair    })
      //@ts-expect-error
      sample({source:{a:$num,b:$str}, clock:num, target:[a_num,a_str], fn:fn.assertSecond.object.pair   })
      //@ts-expect-error
      sample({source:{a:$num,b:$str}, clock:num, target:[a_num,ab]   , fn:fn.assertSecond.object.pair   })
      //@ts-expect-error
      sample({source:{a:$num,b:$str}, clock:num, target:[a_num,abn]  , fn:fn.assertFirstOnly.object.pair})
      //@ts-expect-error
      sample({source:{a:$num,b:$str}, clock:num, target:[a_str,ab]   , fn:fn.assertFirst.object.pair    })
      //@ts-expect-error
      sample({source:{a:$num,b:$str}, clock:num, target:[a_str]      , fn:fn.assertSecond.object.pair   })
      //@ts-expect-error
      sample({source:{a:$num,b:$str}, clock:num, target:[a_str,ab]   , fn:fn.assertFirstOnly.object.pair})
      //@ts-expect-error
      sample({source:{a:$num,b:$str}, clock:num, target:[abn]        , fn:fn.assertFirst.object.pair    })
      //@ts-expect-error
      sample({source:{a:$num,b:$str}, clock:num, target:[a_num,a_str], fn:fn.assertFirstOnly.object.pair})
      //@ts-expect-error
      sample({source:{a:$num,b:$str}, clock:num, target:[ab,a_str]   , fn:fn.assertFirst.object.pair    })
      //@ts-expect-error
      sample({source:{a:$num,b:$str}, clock:num, target:[ab]         , fn:fn.assertFirstOnly.object.pair})
      //@ts-expect-error
      sample({source:{a:$num,b:$str}, clock:num, target:[ab]         , fn:fn.assertFirst.object.pair    })
      //@ts-expect-error
      sample({source:{a:$num,b:$str}, clock:num, target:[ab]         , fn:fn.assertSecond.object.pair   })
      //@ts-expect-error
      sample({source:{a:$num,b:$str}, clock:num, target:[abn]        , fn:fn.assertFirstOnly.object.pair})
      //@ts-expect-error
      sample({source:{a:$num,b:$str}, clock:num, target:[abn,a_str]  , fn:fn.assertFirst.object.pair    })
      //@ts-expect-error
      sample({source:{a:$num,b:$str}, clock:num, target:[a_num,ab]   , fn:fn.assertFirstOnly.object.pair})
      //@ts-expect-error
      sample({source:{a:$num,b:$str}, clock:num, target:[abn,ab]     , fn:fn.assertSecond.object.pair   })
      //@ts-expect-error
      sample({source:{a:$num,b:$str}, clock:num, target:[a_num,abn]  , fn:fn.assertFirst.object.pair    })
      //@ts-expect-error
      sample({source:{a:$num,b:$str}, clock:num, target:[a_num]      , fn:fn.assertFirstOnly.object.pair})
      //@ts-expect-error
      sample({source:{a:$num,b:$str}, clock:num, target:[a_num,ab]   , fn:fn.assertFirst.object.pair    })
      //@ts-expect-error
      sample({source:{a:$num,b:$str}, clock:num, target:[a_str]      , fn:fn.assertFirst.object.pair    })
      //@ts-expect-error
      sample({source:{a:$num,b:$str}, clock:num, target:[a_num]      , fn:fn.assertSecond.object.pair   })
      //@ts-expect-error
      sample({source:{a:$num,b:$str}, clock:num, target:[ab,a_str]   , fn:fn.assertFirstOnly.object.pair})
      //@ts-expect-error
      sample({source:{a:$num,b:$str}, clock:num, target:[a_num,a_str], fn:fn.assertFirst.object.pair    })
      //@ts-expect-error
      sample({source:{a:$num,b:$str}, clock:num, target:[abn]        , fn:fn.assertSecond.object.pair   })
      //@ts-expect-error
      sample({source:{a:$num,b:$str}, clock:num, target:[ab,a_str]   , fn:fn.assertSecond.object.pair   })
      //@ts-expect-error
      sample({source:{a:$num,b:$str}, clock:num, target:[abn,a_str]  , fn:fn.assertFirstOnly.object.pair})
      //@ts-expect-error
      sample({source:{a:$num,b:$str}, clock:num, target:[a_str]      , fn:fn.assertFirstOnly.object.pair})
      //@ts-expect-error
      sample({source:{a:$num,b:$str}, clock:num, target:[a_str,ab]   , fn:fn.assertSecond.object.pair   })
      //@ts-expect-error
      sample({source:{a:$num,b:$str}, clock:num, target:[abn,ab]     , fn:fn.assertFirstOnly.object.pair})
      //@ts-expect-error
      sample({source:[$num,$str]    , target:[abn]        , fn:fn.assertFirstOnly.tuple.pair })
      //@ts-expect-error
      sample({source:[$num,$str]    , target:[ab,a_str]   , fn:fn.assertFirstOnly.tuple.pair })
      //@ts-expect-error
      sample({source:[$num,$str]    , target:[a_num,ab]   , fn:fn.assertFirstOnly.tuple.pair })
      //@ts-expect-error
      sample({source:[$num,$str]    , target:[a_str]      , fn:fn.assertFirstOnly.tuple.pair })
      //@ts-expect-error
      sample({source:[$num,$str]    , target:[a_num,abn]  , fn:fn.assertFirstOnly.tuple.pair })
      //@ts-expect-error
      sample({source:[$num,$str]    , target:[abn,ab]     , fn:fn.assertFirstOnly.tuple.pair })
      //@ts-expect-error
      sample({source:[$num,$str]    , target:[ab]         , fn:fn.assertFirstOnly.tuple.pair })
      //@ts-expect-error
      sample({source:[$num,$str]    , target:[a_num]      , fn:fn.assertFirstOnly.tuple.pair })
      //@ts-expect-error
      sample({source:[$num,$str]    , target:[a_num,a_str], fn:fn.assertFirstOnly.tuple.pair })
      //@ts-expect-error
      sample({source:[$num,$str]    , target:[abn,a_str]  , fn:fn.assertFirstOnly.tuple.pair })
      //@ts-expect-error
      sample({source:[$num,$str]    , target:[a_str,ab]   , fn:fn.assertFirstOnly.tuple.pair })
      //@ts-expect-error
      sample({source:[$num,$str]    , clock:num, target:[a_num]      , fn:fn.assertFirstOnly.tuple.pair })
      //@ts-expect-error
      sample({source:[$num,$str]    , clock:num, target:[abn]        , fn:fn.assertFirstOnly.tuple.pair })
      //@ts-expect-error
      sample({source:[$num,$str]    , clock:num, target:[a_num,a_str], fn:fn.assertFirstOnly.tuple.pair })
      //@ts-expect-error
      sample({source:[$num,$str]    , clock:num, target:[a_num,ab]   , fn:fn.assertFirstOnly.tuple.pair })
      //@ts-expect-error
      sample({source:[$num,$str]    , clock:num, target:[abn,a_str]  , fn:fn.assertFirstOnly.tuple.pair })
      //@ts-expect-error
      sample({source:[$num,$str]    , clock:num, target:[a_str,ab]   , fn:fn.assertFirstOnly.tuple.pair })
      //@ts-expect-error
      sample({source:[$num,$str]    , clock:num, target:[a_str]      , fn:fn.assertFirst.tuple.pair     })
      //@ts-expect-error
      sample({source:[$num,$str]    , clock:num, target:[a_str]      , fn:fn.assertSecond.tuple.pair    })
      //@ts-expect-error
      sample({source:[$num,$str]    , clock:num, target:[a_num,abn]  , fn:fn.assertSecond.tuple.pair    })
      //@ts-expect-error
      sample({source:[$num,$str]    , clock:num, target:[ab,a_str]   , fn:fn.assertFirstOnly.tuple.pair })
      //@ts-expect-error
      sample({source:[$num,$str]    , clock:num, target:[a_num]      , fn:fn.assertFirst.tuple.pair     })
      //@ts-expect-error
      sample({source:[$num,$str]    , clock:num, target:[abn]        , fn:fn.assertFirst.tuple.pair     })
      //@ts-expect-error
      sample({source:[$num,$str]    , clock:num, target:[a_num,a_str], fn:fn.assertFirst.tuple.pair     })
      //@ts-expect-error
      sample({source:[$num,$str]    , clock:num, target:[a_num,ab]   , fn:fn.assertFirst.tuple.pair     })
      //@ts-expect-error
      sample({source:[$num,$str]    , clock:num, target:[abn,a_str]  , fn:fn.assertFirst.tuple.pair     })
      //@ts-expect-error
      sample({source:[$num,$str]    , clock:num, target:[a_num,abn]  , fn:fn.assertFirst.tuple.pair     })
      //@ts-expect-error
      sample({source:[$num,$str]    , clock:num, target:[abn,ab]     , fn:fn.assertFirst.tuple.pair     })
      //@ts-expect-error
      sample({source:[$num,$str]    , clock:num, target:[abn,ab]     , fn:fn.assertSecond.tuple.pair    })
      //@ts-expect-error
      sample({source:[$num,$str]    , clock:num, target:[ab,a_str]   , fn:fn.assertFirst.tuple.pair     })
      //@ts-expect-error
      sample({source:[$num,$str]    , clock:num, target:[ab]         , fn:fn.assertFirst.tuple.pair     })
      //@ts-expect-error
      sample({source:[$num,$str]    , clock:num, target:[a_num]      , fn:fn.assertSecond.tuple.pair    })
      //@ts-expect-error
      sample({source:[$num,$str]    , clock:num, target:[abn]        , fn:fn.assertSecond.tuple.pair    })
      //@ts-expect-error
      sample({source:[$num,$str]    , clock:num, target:[a_num,a_str], fn:fn.assertSecond.tuple.pair    })
      //@ts-expect-error
      sample({source:[$num,$str]    , clock:num, target:[a_str,ab]   , fn:fn.assertFirst.tuple.pair     })
      //@ts-expect-error
      sample({source:[$num,$str]    , clock:num, target:[ab]         , fn:fn.assertFirstOnly.tuple.pair })
      //@ts-expect-error
      sample({source:[$num,$str]    , clock:num, target:[a_num,ab]   , fn:fn.assertSecond.tuple.pair    })
      //@ts-expect-error
      sample({source:[$num,$str]    , clock:num, target:[a_str]      , fn:fn.assertFirstOnly.tuple.pair })
      //@ts-expect-error
      sample({source:[$num,$str]    , clock:num, target:[a_num,abn]  , fn:fn.assertFirstOnly.tuple.pair })
      //@ts-expect-error
      sample({source:[$num,$str]    , clock:num, target:[abn,ab]     , fn:fn.assertFirstOnly.tuple.pair })
      //@ts-expect-error
      sample({source:[$num,$str]    , clock:num, target:[a_str,ab]   , fn:fn.assertSecond.tuple.pair    })
      //@ts-expect-error
      sample({source:[$num,$str]    , clock:num, target:[abn,a_str]  , fn:fn.assertSecond.tuple.pair    })
      //@ts-expect-error
      sample({source:[$num,$str]    , clock:num, target:[ab]         , fn:fn.assertSecond.tuple.pair    })
      //@ts-expect-error
      sample({source:[$num,$str]    , clock:num, target:[ab,a_str]   , fn:fn.assertSecond.tuple.pair    })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }) => unknown'.
            Types of parameters '__0' and 'source' are incompatible.
              Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                Types of property 'b' are incompatible.
                  Type 'string' is not assignable to type 'number'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }) => unknown'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }) => unknown'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }) => unknown'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }) => unknown'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }) => unknown'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }) => unknown'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }) => unknown'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }) => unknown'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }) => unknown'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }) => unknown'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
      No overload matches this call.
        The last overload gave the following error.
          Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }) => unknown'.
            Types of parameters '__0' and 'source' are incompatible.
              Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                Types of property 'b' are incompatible.
                  Type 'string' is not assignable to type 'number'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }) => unknown'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }) => unknown'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
      No overload matches this call.
        The last overload gave the following error.
          Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }) => unknown'.
            Types of parameters '__0' and 'source' are incompatible.
              Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                Types of property 'b' are incompatible.
                  Type 'string' is not assignable to type 'number'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                    Types of property 'b' are incompatible.
                      Type 'string' is not assignable to type 'number'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                    Types of property 'b' are incompatible.
                      Type 'string' is not assignable to type 'number'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                    Types of property 'b' are incompatible.
                      Type 'string' is not assignable to type 'number'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }) => unknown'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }) => unknown'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
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
          Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
            Types of parameters '__0' and 'source' are incompatible.
              Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                Types of property 'b' are incompatible.
                  Type 'string' is not assignable to type 'number'.
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
          Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
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
          Type '({ a }: AB, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
            Types of parameters 'cl' and 'clock' are incompatible.
              Type 'number' is not assignable to type 'string'.
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
          Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
            Types of parameters '__0' and 'source' are incompatible.
              Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                Types of property 'b' are incompatible.
                  Type 'string' is not assignable to type 'number'.
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
          Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
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
          Type '({ a }: AB, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => unknown'.
            Types of parameters 'cl' and 'clock' are incompatible.
              Type 'number' is not assignable to type 'string'.
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
            Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string]) => unknown'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'string' is not assignable to type 'number'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string]) => unknown'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'string' is not assignable to type 'number'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string]) => unknown'.
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
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
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
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number, string], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => unknown'.
      "
    `)
  })
  describe('source:same', () => {
    test('source:same (should pass)', () => {
      //prettier-ignore
      {
        sample({source:{a:$num}, target:[a_num]})
        sample({source:{a:$num}, clock:num, target:[a_num]})
        sample({source:[$num]  , target:[l_num]})
        sample({source:[$num]  , clock:num, target:[l_num]})
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
        //@ts-expect-error
        sample({source:{a:$num}, target:[a_str]              })
        //@ts-expect-error
        sample({source:{a:$num}, target:[abn]                })
        //@ts-expect-error
        sample({source:{a:$num}, target:[ab]                 })
        //@ts-expect-error
        sample({source:{a:$num}, target:[a_num,a_str]        })
        //@ts-expect-error
        sample({source:{a:$num}, target:[a_num,abn]          })
        //@ts-expect-error
        sample({source:{a:$num}, target:[a_num,ab]           })
        //@ts-expect-error
        sample({source:{a:$num}, target:[a_str,ab]           })
        //@ts-expect-error
        sample({source:{a:$num}, target:[abn,a_str]          })
        //@ts-expect-error
        sample({source:{a:$num}, target:[abn,ab]             })
        //@ts-expect-error
        sample({source:{a:$num}, target:[ab,a_str]           })
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[a_str]              })
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[a_num,abn]          })
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[abn,ab]             })
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[abn,a_str]          })
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[abn]                })
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[ab,a_str]           })
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[a_num,a_str]        })
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[a_num,ab]           })
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[ab]                 })
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[a_str,ab]           })
        //@ts-expect-error
        sample({source:[$num]  , target:[l_str]              })
        //@ts-expect-error
        sample({source:[$num]  , target:[l_num_str]          })
        //@ts-expect-error
        sample({source:[$num]  , target:[l_num_num]          })
        //@ts-expect-error
        sample({source:[$num]  , target:[l_num,l_str]        })
        //@ts-expect-error
        sample({source:[$num]  , target:[l_num,l_num_str]    })
        //@ts-expect-error
        sample({source:[$num]  , target:[l_num,l_num_num]    })
        //@ts-expect-error
        sample({source:[$num]  , target:[l_str,l_num_num]    })
        //@ts-expect-error
        sample({source:[$num]  , target:[l_num_str,l_str]    })
        //@ts-expect-error
        sample({source:[$num]  , target:[l_num_str,l_num_num]})
        //@ts-expect-error
        sample({source:[$num]  , target:[l_num_num,l_str]    })
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[l_str]              })
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[l_num_str]          })
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[l_num_num]          })
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[l_num,l_str]        })
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[l_num,l_num_str]    })
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[l_num,l_num_num]    })
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[l_str,l_num_num]    })
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[l_num_str,l_str]    })
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[l_num_str,l_num_num]})
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[l_num_num,l_str]    })
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
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
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
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
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
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
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
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
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
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
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
            Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
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
            Type 'Event<[number, string]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, string]>' is not assignable to type '\\"incompatible unit in target\\"'.
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
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
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
            Type 'Event<[number, string]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, string]>' is not assignable to type '\\"incompatible unit in target\\"'.
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
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('source:same, fn:untyped', () => {
    test('source:same, fn:untyped (should pass)', () => {
      //prettier-ignore
      {
        sample({source:{a:$num}, target:[ab]      , fn:({a}) => ({a,b:''})        })
        sample({source:{a:$num}, target:[a_num]   , fn:fn.noArgs                  })
        sample({source:{a:$num}, target:[ab]      , fn:fn.noArgs                  })
        sample({source:{a:$num}, target:[a_num]   , fn:({a}) => ({a,b:''})        })
        sample({source:{a:$num}, target:[a_num,ab], fn:fn.noArgs                  })
        sample({source:{a:$num}, target:[a_num,ab], fn:({a}) => ({a,b:''})        })
        sample({source:{a:$num}, clock:num, target:[ab]      , fn:({a},cl) => ({a:a+cl,b:''})})
        sample({source:{a:$num}, clock:num, target:[ab]      , fn:fn.noArgs                  })
        sample({source:{a:$num}, clock:num, target:[a_num,ab], fn:fn.noArgs                  })
        sample({source:{a:$num}, clock:num, target:[a_num,ab], fn:({a}) => ({a,b:''})        })
        sample({source:{a:$num}, clock:num, target:[a_num]   , fn:({a},cl) => ({a:a+cl,b:''})})
        sample({source:{a:$num}, clock:num, target:[a_num]   , fn:({a}) => ({a,b:''})        })
        sample({source:{a:$num}, clock:num, target:[ab]      , fn:({a}) => ({a,b:''})        })
        sample({source:{a:$num}, clock:num, target:[a_num]   , fn:fn.noArgs                  })
        sample({source:{a:$num}, clock:num, target:[a_num,ab], fn:({a},cl) => ({a:a+cl,b:''})})
        sample({source:[$num]  , target:[a_num]   , fn:([a]) => ({a,b:''})        })
        sample({source:[$num]  , target:[ab]      , fn:([a]) => ({a,b:''})        })
        sample({source:[$num]  , target:[a_num,ab], fn:([a]) => ({a,b:''})        })
        sample({source:[$num]  , target:[a_num,ab], fn:fn.noArgs                  })
        sample({source:[$num]  , target:[ab]      , fn:fn.noArgs                  })
        sample({source:[$num]  , target:[a_num]   , fn:fn.noArgs                  })
        sample({source:[$num]  , clock:num, target:[a_num]   , fn:([a]) => ({a,b:''})        })
        sample({source:[$num]  , clock:num, target:[ab]      , fn:([a]) => ({a,b:''})        })
        sample({source:[$num]  , clock:num, target:[a_num,ab], fn:([a]) => ({a,b:''})        })
        sample({source:[$num]  , clock:num, target:[a_num]   , fn:([a],cl) => ({a:a+cl,b:''})})
        sample({source:[$num]  , clock:num, target:[ab]      , fn:([a],cl) => ({a:a+cl,b:''})})
        sample({source:[$num]  , clock:num, target:[a_num,ab], fn:([a],cl) => ({a:a+cl,b:''})})
        sample({source:[$num]  , clock:num, target:[a_num]   , fn:fn.noArgs                  })
        sample({source:[$num]  , clock:num, target:[ab]      , fn:fn.noArgs                  })
        sample({source:[$num]  , clock:num, target:[a_num,ab], fn:fn.noArgs                  })
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
        //@ts-expect-error
        sample({source:{a:$num}, target:[a_str]      , fn:fn.noArgs                  })
        //@ts-expect-error
        sample({source:{a:$num}, target:[a_num,abn]  , fn:fn.noArgs                  })
        //@ts-expect-error
        sample({source:{a:$num}, target:[abn]        , fn:fn.noArgs                  })
        //@ts-expect-error
        sample({source:{a:$num}, target:[a_num,a_str], fn:fn.noArgs                  })
        //@ts-expect-error
        sample({source:{a:$num}, target:[a_str,ab]   , fn:({a}) => ({a,b:''})        })
        //@ts-expect-error
        sample({source:{a:$num}, target:[ab,a_str]   , fn:fn.noArgs                  })
        //@ts-expect-error
        sample({source:{a:$num}, target:[abn,ab]     , fn:fn.noArgs                  })
        //@ts-expect-error
        sample({source:{a:$num}, target:[a_num,a_str], fn:({a}) => ({a,b:''})        })
        //@ts-expect-error
        sample({source:{a:$num}, target:[abn]        , fn:({a}) => ({a,b:''})        })
        //@ts-expect-error
        sample({source:{a:$num}, target:[a_str]      , fn:({a}) => ({a,b:''})        })
        //@ts-expect-error
        sample({source:{a:$num}, target:[ab,a_str]   , fn:({a}) => ({a,b:''})        })
        //@ts-expect-error
        sample({source:{a:$num}, target:[a_num,abn]  , fn:({a}) => ({a,b:''})        })
        //@ts-expect-error
        sample({source:{a:$num}, target:[abn,a_str]  , fn:({a}) => ({a,b:''})        })
        //@ts-expect-error
        sample({source:{a:$num}, target:[abn,a_str]  , fn:fn.noArgs                  })
        //@ts-expect-error
        sample({source:{a:$num}, target:[a_str,ab]   , fn:fn.noArgs                  })
        //@ts-expect-error
        sample({source:{a:$num}, target:[abn,ab]     , fn:({a}) => ({a,b:''})        })
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[abn]        , fn:({a},cl) => ({a:a+cl,b:''})})
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[a_str,ab]   , fn:fn.noArgs                  })
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[ab,a_str]   , fn:({a},cl) => ({a:a+cl,b:''})})
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[abn,a_str]  , fn:fn.noArgs                  })
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[abn]        , fn:({a}) => ({a,b:''})        })
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[a_num,a_str], fn:({a},cl) => ({a:a+cl,b:''})})
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[a_str,ab]   , fn:({a},cl) => ({a:a+cl,b:''})})
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[a_str]      , fn:fn.noArgs                  })
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[abn,ab]     , fn:fn.noArgs                  })
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[ab,a_str]   , fn:({a}) => ({a,b:''})        })
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[ab,a_str]   , fn:fn.noArgs                  })
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[a_str]      , fn:({a},cl) => ({a:a+cl,b:''})})
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[a_num,abn]  , fn:({a},cl) => ({a:a+cl,b:''})})
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[abn,ab]     , fn:({a},cl) => ({a:a+cl,b:''})})
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[a_str]      , fn:({a}) => ({a,b:''})        })
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[a_num,abn]  , fn:({a}) => ({a,b:''})        })
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[abn,ab]     , fn:({a}) => ({a,b:''})        })
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[a_num,a_str], fn:fn.noArgs                  })
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[a_num,a_str], fn:({a}) => ({a,b:''})        })
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[abn]        , fn:fn.noArgs                  })
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[a_num,abn]  , fn:fn.noArgs                  })
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[abn,a_str]  , fn:({a}) => ({a,b:''})        })
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[abn,a_str]  , fn:({a},cl) => ({a:a+cl,b:''})})
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[a_str,ab]   , fn:({a}) => ({a,b:''})        })
        //@ts-expect-error
        sample({source:[$num]  , target:[a_str]      , fn:([a]) => ({a,b:''})        })
        //@ts-expect-error
        sample({source:[$num]  , target:[abn]        , fn:([a]) => ({a,b:''})        })
        //@ts-expect-error
        sample({source:[$num]  , target:[a_num,a_str], fn:([a]) => ({a,b:''})        })
        //@ts-expect-error
        sample({source:[$num]  , target:[a_num,abn]  , fn:([a]) => ({a,b:''})        })
        //@ts-expect-error
        sample({source:[$num]  , target:[a_str]      , fn:fn.noArgs                  })
        //@ts-expect-error
        sample({source:[$num]  , target:[a_str,ab]   , fn:([a]) => ({a,b:''})        })
        //@ts-expect-error
        sample({source:[$num]  , target:[abn,a_str]  , fn:([a]) => ({a,b:''})        })
        //@ts-expect-error
        sample({source:[$num]  , target:[a_num,abn]  , fn:fn.noArgs                  })
        //@ts-expect-error
        sample({source:[$num]  , target:[a_str,ab]   , fn:fn.noArgs                  })
        //@ts-expect-error
        sample({source:[$num]  , target:[abn,ab]     , fn:([a]) => ({a,b:''})        })
        //@ts-expect-error
        sample({source:[$num]  , target:[ab,a_str]   , fn:([a]) => ({a,b:''})        })
        //@ts-expect-error
        sample({source:[$num]  , target:[abn]        , fn:fn.noArgs                  })
        //@ts-expect-error
        sample({source:[$num]  , target:[abn,ab]     , fn:fn.noArgs                  })
        //@ts-expect-error
        sample({source:[$num]  , target:[a_num,a_str], fn:fn.noArgs                  })
        //@ts-expect-error
        sample({source:[$num]  , target:[ab,a_str]   , fn:fn.noArgs                  })
        //@ts-expect-error
        sample({source:[$num]  , target:[abn,a_str]  , fn:fn.noArgs                  })
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[a_str]      , fn:([a]) => ({a,b:''})        })
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[abn]        , fn:([a]) => ({a,b:''})        })
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[a_num,a_str], fn:([a]) => ({a,b:''})        })
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[a_num,abn]  , fn:([a]) => ({a,b:''})        })
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[a_str,ab]   , fn:([a]) => ({a,b:''})        })
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[abn,a_str]  , fn:([a]) => ({a,b:''})        })
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[abn,ab]     , fn:([a]) => ({a,b:''})        })
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[ab,a_str]   , fn:([a]) => ({a,b:''})        })
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[a_str]      , fn:([a],cl) => ({a:a+cl,b:''})})
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[abn]        , fn:([a],cl) => ({a:a+cl,b:''})})
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[a_num,a_str], fn:([a],cl) => ({a:a+cl,b:''})})
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[a_num,abn]  , fn:([a],cl) => ({a:a+cl,b:''})})
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[a_str,ab]   , fn:([a],cl) => ({a:a+cl,b:''})})
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[abn,a_str]  , fn:([a],cl) => ({a:a+cl,b:''})})
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[abn,ab]     , fn:([a],cl) => ({a:a+cl,b:''})})
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[ab,a_str]   , fn:([a],cl) => ({a:a+cl,b:''})})
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[a_str]      , fn:fn.noArgs                  })
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[abn]        , fn:fn.noArgs                  })
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[a_num,a_str], fn:fn.noArgs                  })
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[a_num,abn]  , fn:fn.noArgs                  })
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[a_str,ab]   , fn:fn.noArgs                  })
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[abn,a_str]  , fn:fn.noArgs                  })
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[abn,ab]     , fn:fn.noArgs                  })
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[ab,a_str]   , fn:fn.noArgs                  })
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
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
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
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
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
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
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
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
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
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
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
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
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
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
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
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
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
  describe('source:same, fn:typed', () => {
    test('source:same, fn:typed (should pass)', () => {
      //prettier-ignore
      {
        sample({source:{a:$num}, target:[a_num,ab], fn:fn.typedSrc.object.solo     })
        sample({source:{a:$num}, target:[ab]      , fn:fn.typedSrc.object.solo     })
        sample({source:{a:$num}, target:[a_num]   , fn:fn.typedSrc.object.solo     })
        sample({source:{a:$num}, clock:num, target:[a_num]   , fn:fn.typedSrc.object.solo     })
        sample({source:{a:$num}, clock:num, target:[a_num,ab], fn:fn.typedSrc.object.solo     })
        sample({source:{a:$num}, clock:num, target:[a_num]   , fn:fn.typedSrcClock.object.solo})
        sample({source:{a:$num}, clock:num, target:[ab]      , fn:fn.typedSrcClock.object.solo})
        sample({source:{a:$num}, clock:num, target:[ab]      , fn:fn.typedSrc.object.solo     })
        sample({source:{a:$num}, clock:num, target:[a_num,ab], fn:fn.typedSrcClock.object.solo})
        sample({source:[$num]  , target:[ab]      , fn:fn.typedSrc.tuple.solo      })
        sample({source:[$num]  , target:[a_num]   , fn:fn.typedSrc.tuple.solo      })
        sample({source:[$num]  , target:[a_num,ab], fn:fn.typedSrc.tuple.solo      })
        sample({source:[$num]  , clock:num, target:[a_num]   , fn:fn.typedSrc.tuple.solo      })
        sample({source:[$num]  , clock:num, target:[ab]      , fn:fn.typedSrc.tuple.solo      })
        sample({source:[$num]  , clock:num, target:[a_num,ab], fn:fn.typedSrc.tuple.solo      })
        sample({source:[$num]  , clock:num, target:[a_num]   , fn:fn.typedSrcClock.tuple.solo })
        sample({source:[$num]  , clock:num, target:[ab]      , fn:fn.typedSrcClock.tuple.solo })
        sample({source:[$num]  , clock:num, target:[a_num,ab], fn:fn.typedSrcClock.tuple.solo })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:same, fn:typed (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:{a:$num}, target:[a_num,a_str], fn:fn.typedSrc.object.solo     })
        //@ts-expect-error
        sample({source:{a:$num}, target:[abn]        , fn:fn.typedSrc.object.solo     })
        //@ts-expect-error
        sample({source:{a:$num}, target:[abn,a_str]  , fn:fn.typedSrc.object.solo     })
        //@ts-expect-error
        sample({source:{a:$num}, target:[ab,a_str]   , fn:fn.typedSrc.object.solo     })
        //@ts-expect-error
        sample({source:{a:$num}, target:[a_str,ab]   , fn:fn.typedSrc.object.solo     })
        //@ts-expect-error
        sample({source:{a:$num}, target:[a_str]      , fn:fn.typedSrc.object.solo     })
        //@ts-expect-error
        sample({source:{a:$num}, target:[a_num,abn]  , fn:fn.typedSrc.object.solo     })
        //@ts-expect-error
        sample({source:{a:$num}, target:[abn,ab]     , fn:fn.typedSrc.object.solo     })
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[ab,a_str]   , fn:fn.typedSrc.object.solo     })
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[abn]        , fn:fn.typedSrc.object.solo     })
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[a_str,ab]   , fn:fn.typedSrc.object.solo     })
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[a_str,ab]   , fn:fn.typedSrcClock.object.solo})
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[a_str]      , fn:fn.typedSrcClock.object.solo})
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[abn]        , fn:fn.typedSrcClock.object.solo})
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[a_num,abn]  , fn:fn.typedSrcClock.object.solo})
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[abn,ab]     , fn:fn.typedSrcClock.object.solo})
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[abn,a_str]  , fn:fn.typedSrc.object.solo     })
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[a_str]      , fn:fn.typedSrc.object.solo     })
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[a_num,a_str], fn:fn.typedSrcClock.object.solo})
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[ab,a_str]   , fn:fn.typedSrcClock.object.solo})
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[abn,ab]     , fn:fn.typedSrc.object.solo     })
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[a_num,a_str], fn:fn.typedSrc.object.solo     })
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[abn,a_str]  , fn:fn.typedSrcClock.object.solo})
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[a_num,abn]  , fn:fn.typedSrc.object.solo     })
        //@ts-expect-error
        sample({source:[$num]  , target:[a_str]      , fn:fn.typedSrc.tuple.solo      })
        //@ts-expect-error
        sample({source:[$num]  , target:[a_num,abn]  , fn:fn.typedSrc.tuple.solo      })
        //@ts-expect-error
        sample({source:[$num]  , target:[a_str,ab]   , fn:fn.typedSrc.tuple.solo      })
        //@ts-expect-error
        sample({source:[$num]  , target:[a_num,a_str], fn:fn.typedSrc.tuple.solo      })
        //@ts-expect-error
        sample({source:[$num]  , target:[abn,a_str]  , fn:fn.typedSrc.tuple.solo      })
        //@ts-expect-error
        sample({source:[$num]  , target:[abn]        , fn:fn.typedSrc.tuple.solo      })
        //@ts-expect-error
        sample({source:[$num]  , target:[ab,a_str]   , fn:fn.typedSrc.tuple.solo      })
        //@ts-expect-error
        sample({source:[$num]  , target:[abn,ab]     , fn:fn.typedSrc.tuple.solo      })
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[a_str]      , fn:fn.typedSrc.tuple.solo      })
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[abn]        , fn:fn.typedSrc.tuple.solo      })
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[a_num,a_str], fn:fn.typedSrc.tuple.solo      })
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[a_num,abn]  , fn:fn.typedSrc.tuple.solo      })
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[a_str,ab]   , fn:fn.typedSrc.tuple.solo      })
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[abn,a_str]  , fn:fn.typedSrc.tuple.solo      })
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[abn,ab]     , fn:fn.typedSrc.tuple.solo      })
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[ab,a_str]   , fn:fn.typedSrc.tuple.solo      })
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[a_str]      , fn:fn.typedSrcClock.tuple.solo })
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[abn]        , fn:fn.typedSrcClock.tuple.solo })
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[a_num,a_str], fn:fn.typedSrcClock.tuple.solo })
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[a_num,abn]  , fn:fn.typedSrcClock.tuple.solo })
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[a_str,ab]   , fn:fn.typedSrcClock.tuple.solo })
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[abn,a_str]  , fn:fn.typedSrcClock.tuple.solo })
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[abn,ab]     , fn:fn.typedSrcClock.tuple.solo })
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[ab,a_str]   , fn:fn.typedSrcClock.tuple.solo })
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
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
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
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
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
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
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
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
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
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
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
  test('source:same, fn:assert (should fail)', () => {
    //prettier-ignore
    {
      //@ts-expect-error
      sample({source:{a:$num}, target:[a_str,ab]   , fn:fn.assertFirstOnly.object.solo})
      //@ts-expect-error
      sample({source:{a:$num}, target:[a_num,a_str], fn:fn.assertFirstOnly.object.solo})
      //@ts-expect-error
      sample({source:{a:$num}, target:[a_str]      , fn:fn.assertFirstOnly.object.solo})
      //@ts-expect-error
      sample({source:{a:$num}, target:[a_num]      , fn:fn.assertFirstOnly.object.solo})
      //@ts-expect-error
      sample({source:{a:$num}, target:[abn]        , fn:fn.assertFirstOnly.object.solo})
      //@ts-expect-error
      sample({source:{a:$num}, target:[a_num,abn]  , fn:fn.assertFirstOnly.object.solo})
      //@ts-expect-error
      sample({source:{a:$num}, target:[abn,ab]     , fn:fn.assertFirstOnly.object.solo})
      //@ts-expect-error
      sample({source:{a:$num}, target:[ab,a_str]   , fn:fn.assertFirstOnly.object.solo})
      //@ts-expect-error
      sample({source:{a:$num}, target:[abn,a_str]  , fn:fn.assertFirstOnly.object.solo})
      //@ts-expect-error
      sample({source:{a:$num}, target:[a_num,ab]   , fn:fn.assertFirstOnly.object.solo})
      //@ts-expect-error
      sample({source:{a:$num}, target:[ab]         , fn:fn.assertFirstOnly.object.solo})
      //@ts-expect-error
      sample({source:{a:$num}, clock:num, target:[ab,a_str]   , fn:fn.assertFirstOnly.object.solo})
      //@ts-expect-error
      sample({source:{a:$num}, clock:num, target:[a_str]      , fn:fn.assertSecond.object.solo   })
      //@ts-expect-error
      sample({source:{a:$num}, clock:num, target:[a_num,abn]  , fn:fn.assertSecond.object.solo   })
      //@ts-expect-error
      sample({source:{a:$num}, clock:num, target:[abn,ab]     , fn:fn.assertSecond.object.solo   })
      //@ts-expect-error
      sample({source:{a:$num}, clock:num, target:[a_str,ab]   , fn:fn.assertSecond.object.solo   })
      //@ts-expect-error
      sample({source:{a:$num}, clock:num, target:[abn]        , fn:fn.assertFirst.object.solo    })
      //@ts-expect-error
      sample({source:{a:$num}, clock:num, target:[ab,a_str]   , fn:fn.assertFirst.object.solo    })
      //@ts-expect-error
      sample({source:{a:$num}, clock:num, target:[a_str]      , fn:fn.assertFirstOnly.object.solo})
      //@ts-expect-error
      sample({source:{a:$num}, clock:num, target:[abn,a_str]  , fn:fn.assertSecond.object.solo   })
      //@ts-expect-error
      sample({source:{a:$num}, clock:num, target:[abn,ab]     , fn:fn.assertFirstOnly.object.solo})
      //@ts-expect-error
      sample({source:{a:$num}, clock:num, target:[a_num,ab]   , fn:fn.assertSecond.object.solo   })
      //@ts-expect-error
      sample({source:{a:$num}, clock:num, target:[a_num,a_str], fn:fn.assertFirstOnly.object.solo})
      //@ts-expect-error
      sample({source:{a:$num}, clock:num, target:[a_num,ab]   , fn:fn.assertFirst.object.solo    })
      //@ts-expect-error
      sample({source:{a:$num}, clock:num, target:[a_num,abn]  , fn:fn.assertFirstOnly.object.solo})
      //@ts-expect-error
      sample({source:{a:$num}, clock:num, target:[a_num]      , fn:fn.assertFirstOnly.object.solo})
      //@ts-expect-error
      sample({source:{a:$num}, clock:num, target:[a_str,ab]   , fn:fn.assertFirst.object.solo    })
      //@ts-expect-error
      sample({source:{a:$num}, clock:num, target:[a_str,ab]   , fn:fn.assertFirstOnly.object.solo})
      //@ts-expect-error
      sample({source:{a:$num}, clock:num, target:[a_num,a_str], fn:fn.assertSecond.object.solo   })
      //@ts-expect-error
      sample({source:{a:$num}, clock:num, target:[a_num,ab]   , fn:fn.assertFirstOnly.object.solo})
      //@ts-expect-error
      sample({source:{a:$num}, clock:num, target:[ab]         , fn:fn.assertFirstOnly.object.solo})
      //@ts-expect-error
      sample({source:{a:$num}, clock:num, target:[abn]        , fn:fn.assertSecond.object.solo   })
      //@ts-expect-error
      sample({source:{a:$num}, clock:num, target:[ab,a_str]   , fn:fn.assertSecond.object.solo   })
      //@ts-expect-error
      sample({source:{a:$num}, clock:num, target:[abn,a_str]  , fn:fn.assertFirst.object.solo    })
      //@ts-expect-error
      sample({source:{a:$num}, clock:num, target:[ab]         , fn:fn.assertSecond.object.solo   })
      //@ts-expect-error
      sample({source:{a:$num}, clock:num, target:[ab]         , fn:fn.assertFirst.object.solo    })
      //@ts-expect-error
      sample({source:{a:$num}, clock:num, target:[a_str]      , fn:fn.assertFirst.object.solo    })
      //@ts-expect-error
      sample({source:{a:$num}, clock:num, target:[abn,a_str]  , fn:fn.assertFirstOnly.object.solo})
      //@ts-expect-error
      sample({source:{a:$num}, clock:num, target:[a_num,abn]  , fn:fn.assertFirst.object.solo    })
      //@ts-expect-error
      sample({source:{a:$num}, clock:num, target:[a_num]      , fn:fn.assertFirst.object.solo    })
      //@ts-expect-error
      sample({source:{a:$num}, clock:num, target:[a_num]      , fn:fn.assertSecond.object.solo   })
      //@ts-expect-error
      sample({source:{a:$num}, clock:num, target:[abn,ab]     , fn:fn.assertFirst.object.solo    })
      //@ts-expect-error
      sample({source:{a:$num}, clock:num, target:[abn]        , fn:fn.assertFirstOnly.object.solo})
      //@ts-expect-error
      sample({source:{a:$num}, clock:num, target:[a_num,a_str], fn:fn.assertFirst.object.solo    })
      //@ts-expect-error
      sample({source:[$num]  , target:[a_str]      , fn:fn.assertFirstOnly.tuple.solo })
      //@ts-expect-error
      sample({source:[$num]  , target:[ab]         , fn:fn.assertFirstOnly.tuple.solo })
      //@ts-expect-error
      sample({source:[$num]  , target:[abn]        , fn:fn.assertFirstOnly.tuple.solo })
      //@ts-expect-error
      sample({source:[$num]  , target:[a_num,abn]  , fn:fn.assertFirstOnly.tuple.solo })
      //@ts-expect-error
      sample({source:[$num]  , target:[a_str,ab]   , fn:fn.assertFirstOnly.tuple.solo })
      //@ts-expect-error
      sample({source:[$num]  , target:[abn,ab]     , fn:fn.assertFirstOnly.tuple.solo })
      //@ts-expect-error
      sample({source:[$num]  , target:[ab,a_str]   , fn:fn.assertFirstOnly.tuple.solo })
      //@ts-expect-error
      sample({source:[$num]  , target:[a_num]      , fn:fn.assertFirstOnly.tuple.solo })
      //@ts-expect-error
      sample({source:[$num]  , target:[a_num,a_str], fn:fn.assertFirstOnly.tuple.solo })
      //@ts-expect-error
      sample({source:[$num]  , target:[abn,a_str]  , fn:fn.assertFirstOnly.tuple.solo })
      //@ts-expect-error
      sample({source:[$num]  , target:[a_num,ab]   , fn:fn.assertFirstOnly.tuple.solo })
      //@ts-expect-error
      sample({source:[$num]  , clock:num, target:[a_num]      , fn:fn.assertSecond.tuple.solo    })
      //@ts-expect-error
      sample({source:[$num]  , clock:num, target:[a_str]      , fn:fn.assertSecond.tuple.solo    })
      //@ts-expect-error
      sample({source:[$num]  , clock:num, target:[abn]        , fn:fn.assertSecond.tuple.solo    })
      //@ts-expect-error
      sample({source:[$num]  , clock:num, target:[ab]         , fn:fn.assertSecond.tuple.solo    })
      //@ts-expect-error
      sample({source:[$num]  , clock:num, target:[a_num,a_str], fn:fn.assertSecond.tuple.solo    })
      //@ts-expect-error
      sample({source:[$num]  , clock:num, target:[a_num,abn]  , fn:fn.assertSecond.tuple.solo    })
      //@ts-expect-error
      sample({source:[$num]  , clock:num, target:[a_num,ab]   , fn:fn.assertSecond.tuple.solo    })
      //@ts-expect-error
      sample({source:[$num]  , clock:num, target:[a_str,ab]   , fn:fn.assertSecond.tuple.solo    })
      //@ts-expect-error
      sample({source:[$num]  , clock:num, target:[abn,a_str]  , fn:fn.assertSecond.tuple.solo    })
      //@ts-expect-error
      sample({source:[$num]  , clock:num, target:[abn,ab]     , fn:fn.assertSecond.tuple.solo    })
      //@ts-expect-error
      sample({source:[$num]  , clock:num, target:[ab,a_str]   , fn:fn.assertSecond.tuple.solo    })
      //@ts-expect-error
      sample({source:[$num]  , clock:num, target:[a_num]      , fn:fn.assertFirstOnly.tuple.solo })
      //@ts-expect-error
      sample({source:[$num]  , clock:num, target:[a_str]      , fn:fn.assertFirstOnly.tuple.solo })
      //@ts-expect-error
      sample({source:[$num]  , clock:num, target:[abn]        , fn:fn.assertFirstOnly.tuple.solo })
      //@ts-expect-error
      sample({source:[$num]  , clock:num, target:[ab]         , fn:fn.assertFirstOnly.tuple.solo })
      //@ts-expect-error
      sample({source:[$num]  , clock:num, target:[a_num,a_str], fn:fn.assertFirstOnly.tuple.solo })
      //@ts-expect-error
      sample({source:[$num]  , clock:num, target:[a_num,abn]  , fn:fn.assertFirstOnly.tuple.solo })
      //@ts-expect-error
      sample({source:[$num]  , clock:num, target:[a_num,ab]   , fn:fn.assertFirstOnly.tuple.solo })
      //@ts-expect-error
      sample({source:[$num]  , clock:num, target:[a_str,ab]   , fn:fn.assertFirstOnly.tuple.solo })
      //@ts-expect-error
      sample({source:[$num]  , clock:num, target:[abn,a_str]  , fn:fn.assertFirstOnly.tuple.solo })
      //@ts-expect-error
      sample({source:[$num]  , clock:num, target:[abn,ab]     , fn:fn.assertFirstOnly.tuple.solo })
      //@ts-expect-error
      sample({source:[$num]  , clock:num, target:[ab,a_str]   , fn:fn.assertFirstOnly.tuple.solo })
      //@ts-expect-error
      sample({source:[$num]  , clock:num, target:[a_num]      , fn:fn.assertFirst.tuple.solo     })
      //@ts-expect-error
      sample({source:[$num]  , clock:num, target:[a_str]      , fn:fn.assertFirst.tuple.solo     })
      //@ts-expect-error
      sample({source:[$num]  , clock:num, target:[abn]        , fn:fn.assertFirst.tuple.solo     })
      //@ts-expect-error
      sample({source:[$num]  , clock:num, target:[ab]         , fn:fn.assertFirst.tuple.solo     })
      //@ts-expect-error
      sample({source:[$num]  , clock:num, target:[a_num,a_str], fn:fn.assertFirst.tuple.solo     })
      //@ts-expect-error
      sample({source:[$num]  , clock:num, target:[a_num,abn]  , fn:fn.assertFirst.tuple.solo     })
      //@ts-expect-error
      sample({source:[$num]  , clock:num, target:[a_num,ab]   , fn:fn.assertFirst.tuple.solo     })
      //@ts-expect-error
      sample({source:[$num]  , clock:num, target:[a_str,ab]   , fn:fn.assertFirst.tuple.solo     })
      //@ts-expect-error
      sample({source:[$num]  , clock:num, target:[abn,a_str]  , fn:fn.assertFirst.tuple.solo     })
      //@ts-expect-error
      sample({source:[$num]  , clock:num, target:[abn,ab]     , fn:fn.assertFirst.tuple.solo     })
      //@ts-expect-error
      sample({source:[$num]  , clock:num, target:[ab,a_str]   , fn:fn.assertFirst.tuple.solo     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }) => unknown'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }) => unknown'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }) => unknown'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }) => unknown'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }) => unknown'.
            Types of parameters '__0' and 'source' are incompatible.
              Type '{ a: number; }' is not assignable to type 'AS'.
                Types of property 'a' are incompatible.
                  Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }) => unknown'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }) => unknown'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }) => unknown'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }) => unknown'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
                      Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }) => unknown'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }) => unknown'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }) => unknown'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }) => unknown'.
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
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
                Types of parameters '__0' and 'source' are incompatible.
                  Type '{ a: number; }' is not assignable to type 'AS'.
                    Types of property 'a' are incompatible.
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
          Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
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
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
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
          Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
            Types of parameters '__0' and 'source' are incompatible.
              Type '{ a: number; }' is not assignable to type 'AS'.
                Types of property 'a' are incompatible.
                  Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type '({ a }: AN, cl: string) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => unknown'.
            Types of parameters 'cl' and 'clock' are incompatible.
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
            Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number]) => unknown'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number]) => unknown'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number]) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number]) => unknown'.
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
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [number], cl: string) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
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
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
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
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => unknown'.
      "
    `)
  })
})
