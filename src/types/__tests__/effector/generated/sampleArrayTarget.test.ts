/* eslint-disable no-unused-vars */
import {createStore, createEvent, sample} from 'effector'
const typecheck = '{global}'
const voidt = createEvent()
const anyt = createEvent<any>()
const str = createEvent<string>()
const num = createEvent<number>()
const numStr = createEvent<number | string>()
const strBool = createEvent<string | boolean>()
describe('no fn', () => {
  test('no fn (should pass)', () => {
    //prettier-ignore
    {
      sample({source:num, target:[num]           })
      sample({source:num, target:[voidt]         })
      sample({source:num, target:[anyt]          })
      sample({source:num, target:[numStr]        })
      sample({source:num, target:[num,voidt]     })
      sample({source:num, target:[anyt,num]      })
      sample({source:num, target:[num,numStr]    })
      sample({source:num, target:[anyt,voidt]    })
      sample({source:num, target:[numStr,voidt]  })
      sample({source:num, target:[anyt,numStr]   })
      sample({source:str, target:[voidt]         })
      sample({source:str, target:[str]           })
      sample({source:str, target:[anyt]          })
      sample({source:str, target:[strBool]       })
      sample({source:str, target:[numStr]        })
      sample({source:str, target:[anyt,voidt]    })
      sample({source:str, target:[strBool,voidt] })
      sample({source:str, target:[numStr,voidt]  })
      sample({source:str, target:[str,voidt]     })
      sample({source:str, target:[anyt,str]      })
      sample({source:str, target:[numStr,str]    })
      sample({source:str, target:[anyt,numStr]   })
      sample({source:str, target:[anyt,strBool]  })
      sample({source:str, target:[numStr,strBool]})
      sample({clock:num, target:[num]           })
      sample({clock:num, target:[voidt]         })
      sample({clock:num, target:[anyt]          })
      sample({clock:num, target:[numStr]        })
      sample({clock:num, target:[num,voidt]     })
      sample({clock:num, target:[anyt,num]      })
      sample({clock:num, target:[num,numStr]    })
      sample({clock:num, target:[anyt,voidt]    })
      sample({clock:num, target:[numStr,voidt]  })
      sample({clock:num, target:[anyt,numStr]   })
      sample({clock:str, target:[voidt]         })
      sample({clock:str, target:[str]           })
      sample({clock:str, target:[anyt]          })
      sample({clock:str, target:[strBool]       })
      sample({clock:str, target:[numStr]        })
      sample({clock:str, target:[anyt,voidt]    })
      sample({clock:str, target:[strBool,voidt] })
      sample({clock:str, target:[numStr,voidt]  })
      sample({clock:str, target:[str,voidt]     })
      sample({clock:str, target:[anyt,str]      })
      sample({clock:str, target:[numStr,str]    })
      sample({clock:str, target:[anyt,numStr]   })
      sample({clock:str, target:[anyt,strBool]  })
      sample({clock:str, target:[numStr,strBool]})
      sample({source:num, clock:num, target:[num]           })
      sample({source:num, clock:num, target:[voidt]         })
      sample({source:num, clock:num, target:[anyt]          })
      sample({source:num, clock:num, target:[numStr]        })
      sample({source:num, clock:num, target:[num,voidt]     })
      sample({source:num, clock:num, target:[anyt,num]      })
      sample({source:num, clock:num, target:[num,numStr]    })
      sample({source:num, clock:num, target:[anyt,voidt]    })
      sample({source:num, clock:num, target:[numStr,voidt]  })
      sample({source:num, clock:num, target:[anyt,numStr]   })
      sample({source:num, clock:str, target:[num]           })
      sample({source:num, clock:str, target:[voidt]         })
      sample({source:num, clock:str, target:[anyt]          })
      sample({source:num, clock:str, target:[numStr]        })
      sample({source:num, clock:str, target:[num,voidt]     })
      sample({source:num, clock:str, target:[anyt,num]      })
      sample({source:num, clock:str, target:[num,numStr]    })
      sample({source:num, clock:str, target:[anyt,voidt]    })
      sample({source:num, clock:str, target:[numStr,voidt]  })
      sample({source:num, clock:str, target:[anyt,numStr]   })
      sample({source:str, clock:num, target:[voidt]         })
      sample({source:str, clock:num, target:[str]           })
      sample({source:str, clock:num, target:[anyt]          })
      sample({source:str, clock:num, target:[strBool]       })
      sample({source:str, clock:num, target:[numStr]        })
      sample({source:str, clock:num, target:[anyt,voidt]    })
      sample({source:str, clock:num, target:[strBool,voidt] })
      sample({source:str, clock:num, target:[numStr,voidt]  })
      sample({source:str, clock:num, target:[str,voidt]     })
      sample({source:str, clock:num, target:[anyt,str]      })
      sample({source:str, clock:num, target:[numStr,str]    })
      sample({source:str, clock:num, target:[anyt,numStr]   })
      sample({source:str, clock:num, target:[anyt,strBool]  })
      sample({source:str, clock:num, target:[numStr,strBool]})
      sample({source:str, clock:str, target:[voidt]         })
      sample({source:str, clock:str, target:[str]           })
      sample({source:str, clock:str, target:[anyt]          })
      sample({source:str, clock:str, target:[strBool]       })
      sample({source:str, clock:str, target:[numStr]        })
      sample({source:str, clock:str, target:[anyt,voidt]    })
      sample({source:str, clock:str, target:[strBool,voidt] })
      sample({source:str, clock:str, target:[numStr,voidt]  })
      sample({source:str, clock:str, target:[str,voidt]     })
      sample({source:str, clock:str, target:[anyt,str]      })
      sample({source:str, clock:str, target:[numStr,str]    })
      sample({source:str, clock:str, target:[anyt,numStr]   })
      sample({source:str, clock:str, target:[anyt,strBool]  })
      sample({source:str, clock:str, target:[numStr,strBool]})
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
      sample({
        source: num,
        target: [
          //@ts-expect-error
          str,
        ],
      })
      sample({
        source: num,
        target: [
          //@ts-expect-error
          strBool,
        ],
      })
      sample({
        source: num,
        target: [
          num,
          //@ts-expect-error
          str,
        ],
      })
      sample({
        source: num,
        target: [
          num,
          //@ts-expect-error
          strBool,
        ],
      })
      sample({
        source: num,
        target: [
          //@ts-expect-error
          strBool,
          voidt,
        ],
      })
      sample({
        source: num,
        target: [
          //@ts-expect-error
          str,
          voidt,
        ],
      })
      sample({
        source: num,
        target: [
          anyt,
          //@ts-expect-error
          str,
        ],
      })
      sample({
        source: num,
        target: [
          numStr,
          //@ts-expect-error
          str,
        ],
      })
      sample({
        source: num,
        target: [
          anyt,
          //@ts-expect-error
          strBool,
        ],
      })
      sample({
        source: num,
        target: [
          numStr,
          //@ts-expect-error
          strBool,
        ],
      })
      sample({
        source: str,
        target: [
          //@ts-expect-error
          num,
        ],
      })
      sample({
        source: str,
        target: [
          //@ts-expect-error
          num,
          voidt,
        ],
      })
      sample({
        source: str,
        target: [
          //@ts-expect-error
          num,
          str,
        ],
      })
      sample({
        source: str,
        target: [
          anyt,
          //@ts-expect-error
          num,
        ],
      })
      sample({
        source: str,
        target: [
          //@ts-expect-error
          num,
          strBool,
        ],
      })
      sample({
        source: str,
        target: [
          //@ts-expect-error
          num,
          numStr,
        ],
      })
      sample({
        clock: num,
        target: [
          //@ts-expect-error
          str,
        ],
      })
      sample({
        clock: num,
        target: [
          //@ts-expect-error
          strBool,
        ],
      })
      sample({
        clock: num,
        target: [
          num,
          //@ts-expect-error
          str,
        ],
      })
      sample({
        clock: num,
        target: [
          num,
          //@ts-expect-error
          strBool,
        ],
      })
      sample({
        clock: num,
        target: [
          //@ts-expect-error
          strBool,
          voidt,
        ],
      })
      sample({
        clock: num,
        target: [
          //@ts-expect-error
          str,
          voidt,
        ],
      })
      sample({
        clock: num,
        target: [
          anyt,
          //@ts-expect-error
          str,
        ],
      })
      sample({
        clock: num,
        target: [
          numStr,
          //@ts-expect-error
          str,
        ],
      })
      sample({
        clock: num,
        target: [
          anyt,
          //@ts-expect-error
          strBool,
        ],
      })
      sample({
        clock: num,
        target: [
          numStr,
          //@ts-expect-error
          strBool,
        ],
      })
      sample({
        clock: str,
        target: [
          //@ts-expect-error
          num,
        ],
      })
      sample({
        clock: str,
        target: [
          //@ts-expect-error
          num,
          voidt,
        ],
      })
      sample({
        clock: str,
        target: [
          //@ts-expect-error
          num,
          str,
        ],
      })
      sample({
        clock: str,
        target: [
          anyt,
          //@ts-expect-error
          num,
        ],
      })
      sample({
        clock: str,
        target: [
          //@ts-expect-error
          num,
          strBool,
        ],
      })
      sample({
        clock: str,
        target: [
          //@ts-expect-error
          num,
          numStr,
        ],
      })
      sample({
        source: num,
        clock: num,
        target: [
          //@ts-expect-error
          str,
        ],
      })
      sample({
        source: num,
        clock: num,
        target: [
          //@ts-expect-error
          strBool,
        ],
      })
      sample({
        source: num,
        clock: num,
        target: [
          num,
          //@ts-expect-error
          str,
        ],
      })
      sample({
        source: num,
        clock: num,
        target: [
          num,
          //@ts-expect-error
          strBool,
        ],
      })
      sample({
        source: num,
        clock: num,
        target: [
          //@ts-expect-error
          strBool,
          voidt,
        ],
      })
      sample({
        source: num,
        clock: num,
        target: [
          //@ts-expect-error
          str,
          voidt,
        ],
      })
      sample({
        source: num,
        clock: num,
        target: [
          anyt,
          //@ts-expect-error
          str,
        ],
      })
      sample({
        source: num,
        clock: num,
        target: [
          numStr,
          //@ts-expect-error
          str,
        ],
      })
      sample({
        source: num,
        clock: num,
        target: [
          anyt,
          //@ts-expect-error
          strBool,
        ],
      })
      sample({
        source: num,
        clock: num,
        target: [
          numStr,
          //@ts-expect-error
          strBool,
        ],
      })
      sample({
        source: num,
        clock: str,
        target: [
          //@ts-expect-error
          str,
        ],
      })
      sample({
        source: num,
        clock: str,
        target: [
          //@ts-expect-error
          strBool,
        ],
      })
      sample({
        source: num,
        clock: str,
        target: [
          num,
          //@ts-expect-error
          str,
        ],
      })
      sample({
        source: num,
        clock: str,
        target: [
          num,
          //@ts-expect-error
          strBool,
        ],
      })
      sample({
        source: num,
        clock: str,
        target: [
          //@ts-expect-error
          strBool,
          voidt,
        ],
      })
      sample({
        source: num,
        clock: str,
        target: [
          //@ts-expect-error
          str,
          voidt,
        ],
      })
      sample({
        source: num,
        clock: str,
        target: [
          anyt,
          //@ts-expect-error
          str,
        ],
      })
      sample({
        source: num,
        clock: str,
        target: [
          numStr,
          //@ts-expect-error
          str,
        ],
      })
      sample({
        source: num,
        clock: str,
        target: [
          anyt,
          //@ts-expect-error
          strBool,
        ],
      })
      sample({
        source: num,
        clock: str,
        target: [
          numStr,
          //@ts-expect-error
          strBool,
        ],
      })
      sample({
        source: str,
        clock: num,
        target: [
          //@ts-expect-error
          num,
        ],
      })
      sample({
        source: str,
        clock: num,
        target: [
          //@ts-expect-error
          num,
          voidt,
        ],
      })
      sample({
        source: str,
        clock: num,
        target: [
          //@ts-expect-error
          num,
          str,
        ],
      })
      sample({
        source: str,
        clock: num,
        target: [
          anyt,
          //@ts-expect-error
          num,
        ],
      })
      sample({
        source: str,
        clock: num,
        target: [
          //@ts-expect-error
          num,
          strBool,
        ],
      })
      sample({
        source: str,
        clock: num,
        target: [
          //@ts-expect-error
          num,
          numStr,
        ],
      })
      sample({
        source: str,
        clock: str,
        target: [
          //@ts-expect-error
          num,
        ],
      })
      sample({
        source: str,
        clock: str,
        target: [
          //@ts-expect-error
          num,
          voidt,
        ],
      })
      sample({
        source: str,
        clock: str,
        target: [
          //@ts-expect-error
          num,
          str,
        ],
      })
      sample({
        source: str,
        clock: str,
        target: [
          anyt,
          //@ts-expect-error
          num,
        ],
      })
      sample({
        source: str,
        clock: str,
        target: [
          //@ts-expect-error
          num,
          strBool,
        ],
      })
      sample({
        source: str,
        clock: str,
        target: [
          //@ts-expect-error
          num,
          numStr,
        ],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Unmarked error at test line 4 'source: num,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string; }[]; }'.
      Unmarked error at test line 11 'source: num,'
      lack of expected error at test line 7 'str,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | boolean; }[]; }'.
      Unmarked error at test line 34 'source: num,'
      lack of expected error at test line 14 'strBool,'
      lack of expected error at test line 22 'str,'
      lack of expected error at test line 30 'strBool,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | boolean | void; }[]; }'.
      Unmarked error at test line 42 'source: num,'
      lack of expected error at test line 37 'strBool,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | void; }[]; }'.
      Unmarked error at test line 82 'source: str,'
      lack of expected error at test line 45 'str,'
      lack of expected error at test line 54 'str,'
      lack of expected error at test line 62 'str,'
      lack of expected error at test line 70 'strBool,'
      lack of expected error at test line 78 'strBool,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: string; targetType: number; }[]; }'.
      Unmarked error at test line 89 'source: str,'
      lack of expected error at test line 85 'num,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: string; targetType: number | void; }[]; }'.
      Unmarked error at test line 129 'clock: num,'
      lack of expected error at test line 92 'num,'
      lack of expected error at test line 100 'num,'
      lack of expected error at test line 109 'num,'
      lack of expected error at test line 116 'num,'
      lack of expected error at test line 124 'num,'
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: number; targetType: string; }[]; }'.
      Unmarked error at test line 136 'clock: num,'
      lack of expected error at test line 132 'str,'
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: number; targetType: string | boolean; }[]; }'.
      Unmarked error at test line 159 'clock: num,'
      lack of expected error at test line 139 'strBool,'
      lack of expected error at test line 147 'str,'
      lack of expected error at test line 155 'strBool,'
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: number; targetType: string | boolean | void; }[]; }'.
      Unmarked error at test line 167 'clock: num,'
      lack of expected error at test line 162 'strBool,'
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: number; targetType: string | void; }[]; }'.
      Unmarked error at test line 207 'clock: str,'
      lack of expected error at test line 170 'str,'
      lack of expected error at test line 179 'str,'
      lack of expected error at test line 187 'str,'
      lack of expected error at test line 195 'strBool,'
      lack of expected error at test line 203 'strBool,'
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: string; targetType: number; }[]; }'.
      Unmarked error at test line 214 'clock: str,'
      lack of expected error at test line 210 'num,'
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: string; targetType: number | void; }[]; }'.
      Unmarked error at test line 254 'source: num,'
      lack of expected error at test line 217 'num,'
      lack of expected error at test line 225 'num,'
      lack of expected error at test line 234 'num,'
      lack of expected error at test line 241 'num,'
      lack of expected error at test line 249 'num,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string; }[]; }'.
      Unmarked error at test line 262 'source: num,'
      lack of expected error at test line 258 'str,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | boolean; }[]; }'.
      Unmarked error at test line 288 'source: num,'
      lack of expected error at test line 266 'strBool,'
      lack of expected error at test line 275 'str,'
      lack of expected error at test line 284 'strBool,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | boolean | void; }[]; }'.
      Unmarked error at test line 297 'source: num,'
      lack of expected error at test line 292 'strBool,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | void; }[]; }'.
      Unmarked error at test line 342 'source: num,'
      lack of expected error at test line 301 'str,'
      lack of expected error at test line 311 'str,'
      lack of expected error at test line 320 'str,'
      lack of expected error at test line 329 'strBool,'
      lack of expected error at test line 338 'strBool,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string; }[]; }'.
      Unmarked error at test line 350 'source: num,'
      lack of expected error at test line 346 'str,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | boolean; }[]; }'.
      Unmarked error at test line 376 'source: num,'
      lack of expected error at test line 354 'strBool,'
      lack of expected error at test line 363 'str,'
      lack of expected error at test line 372 'strBool,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | boolean | void; }[]; }'.
      Unmarked error at test line 385 'source: num,'
      lack of expected error at test line 380 'strBool,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | void; }[]; }'.
      Unmarked error at test line 430 'source: str,'
      lack of expected error at test line 389 'str,'
      lack of expected error at test line 399 'str,'
      lack of expected error at test line 408 'str,'
      lack of expected error at test line 417 'strBool,'
      lack of expected error at test line 426 'strBool,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: string; targetType: number; }[]; }'.
      Unmarked error at test line 438 'source: str,'
      lack of expected error at test line 434 'num,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: string; targetType: number | void; }[]; }'.
      Unmarked error at test line 483 'source: str,'
      lack of expected error at test line 442 'num,'
      lack of expected error at test line 451 'num,'
      lack of expected error at test line 461 'num,'
      lack of expected error at test line 469 'num,'
      lack of expected error at test line 478 'num,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: string; targetType: number; }[]; }'.
      Unmarked error at test line 491 'source: str,'
      lack of expected error at test line 487 'num,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: string; targetType: number | void; }[]; }'.
      lack of expected error at test line 495 'num,'
      lack of expected error at test line 504 'num,'
      lack of expected error at test line 514 'num,'
      lack of expected error at test line 522 'num,'
      lack of expected error at test line 531 'num,'
      "
    `)
  })
})
describe('untyped fn', () => {
  test('untyped fn (should pass)', () => {
    //prettier-ignore
    {
      sample({source:num, target:[num]           , fn:(src) => src + 1      })
      sample({source:num, target:[voidt]         , fn:(src) => src + 1      })
      sample({source:num, target:[anyt]          , fn:(src) => src + 1      })
      sample({source:num, target:[numStr]        , fn:(src) => src + 1      })
      sample({source:num, target:[num,voidt]     , fn:(src) => src + 1      })
      sample({source:num, target:[anyt,num]      , fn:(src) => src + 1      })
      sample({source:num, target:[num,numStr]    , fn:(src) => src + 1      })
      sample({source:num, target:[anyt,voidt]    , fn:(src) => src + 1      })
      sample({source:num, target:[numStr,voidt]  , fn:(src) => src + 1      })
      sample({source:num, target:[anyt,numStr]   , fn:(src) => src + 1      })
      sample({source:str, target:[voidt]         , fn:(src) => src + 1      })
      sample({source:str, target:[str]           , fn:(src) => src + 1      })
      sample({source:str, target:[anyt]          , fn:(src) => src + 1      })
      sample({source:str, target:[strBool]       , fn:(src) => src + 1      })
      sample({source:str, target:[numStr]        , fn:(src) => src + 1      })
      sample({source:str, target:[anyt,voidt]    , fn:(src) => src + 1      })
      sample({source:str, target:[strBool,voidt] , fn:(src) => src + 1      })
      sample({source:str, target:[numStr,voidt]  , fn:(src) => src + 1      })
      sample({source:str, target:[str,voidt]     , fn:(src) => src + 1      })
      sample({source:str, target:[anyt,str]      , fn:(src) => src + 1      })
      sample({source:str, target:[numStr,str]    , fn:(src) => src + 1      })
      sample({source:str, target:[anyt,numStr]   , fn:(src) => src + 1      })
      sample({source:str, target:[anyt,strBool]  , fn:(src) => src + 1      })
      sample({source:str, target:[numStr,strBool], fn:(src) => src + 1      })
      sample({clock:num, target:[num]           , fn:(clk) => clk + 1      })
      sample({clock:num, target:[voidt]         , fn:(clk) => clk + 1      })
      sample({clock:num, target:[anyt]          , fn:(clk) => clk + 1      })
      sample({clock:num, target:[numStr]        , fn:(clk) => clk + 1      })
      sample({clock:num, target:[num,voidt]     , fn:(clk) => clk + 1      })
      sample({clock:num, target:[anyt,num]      , fn:(clk) => clk + 1      })
      sample({clock:num, target:[num,numStr]    , fn:(clk) => clk + 1      })
      sample({clock:num, target:[anyt,voidt]    , fn:(clk) => clk + 1      })
      sample({clock:num, target:[numStr,voidt]  , fn:(clk) => clk + 1      })
      sample({clock:num, target:[anyt,numStr]   , fn:(clk) => clk + 1      })
      sample({clock:str, target:[voidt]         , fn:(clk) => clk + 1      })
      sample({clock:str, target:[str]           , fn:(clk) => clk + 1      })
      sample({clock:str, target:[anyt]          , fn:(clk) => clk + 1      })
      sample({clock:str, target:[strBool]       , fn:(clk) => clk + 1      })
      sample({clock:str, target:[numStr]        , fn:(clk) => clk + 1      })
      sample({clock:str, target:[anyt,voidt]    , fn:(clk) => clk + 1      })
      sample({clock:str, target:[strBool,voidt] , fn:(clk) => clk + 1      })
      sample({clock:str, target:[numStr,voidt]  , fn:(clk) => clk + 1      })
      sample({clock:str, target:[str,voidt]     , fn:(clk) => clk + 1      })
      sample({clock:str, target:[anyt,str]      , fn:(clk) => clk + 1      })
      sample({clock:str, target:[numStr,str]    , fn:(clk) => clk + 1      })
      sample({clock:str, target:[anyt,numStr]   , fn:(clk) => clk + 1      })
      sample({clock:str, target:[anyt,strBool]  , fn:(clk) => clk + 1      })
      sample({clock:str, target:[numStr,strBool], fn:(clk) => clk + 1      })
      sample({source:num, clock:num, target:[num]           , fn:(src,clk) => src + clk})
      sample({source:num, clock:num, target:[voidt]         , fn:(src,clk) => src + clk})
      sample({source:num, clock:num, target:[anyt]          , fn:(src,clk) => src + clk})
      sample({source:num, clock:num, target:[numStr]        , fn:(src,clk) => src + clk})
      sample({source:num, clock:num, target:[num,voidt]     , fn:(src,clk) => src + clk})
      sample({source:num, clock:num, target:[anyt,num]      , fn:(src,clk) => src + clk})
      sample({source:num, clock:num, target:[num,numStr]    , fn:(src,clk) => src + clk})
      sample({source:num, clock:num, target:[anyt,voidt]    , fn:(src,clk) => src + clk})
      sample({source:num, clock:num, target:[numStr,voidt]  , fn:(src,clk) => src + clk})
      sample({source:num, clock:num, target:[anyt,numStr]   , fn:(src,clk) => src + clk})
      sample({source:num, clock:str, target:[voidt]         , fn:(src,clk) => src + clk})
      sample({source:num, clock:str, target:[str]           , fn:(src,clk) => src + clk})
      sample({source:num, clock:str, target:[anyt]          , fn:(src,clk) => src + clk})
      sample({source:num, clock:str, target:[strBool]       , fn:(src,clk) => src + clk})
      sample({source:num, clock:str, target:[numStr]        , fn:(src,clk) => src + clk})
      sample({source:num, clock:str, target:[anyt,voidt]    , fn:(src,clk) => src + clk})
      sample({source:num, clock:str, target:[strBool,voidt] , fn:(src,clk) => src + clk})
      sample({source:num, clock:str, target:[numStr,voidt]  , fn:(src,clk) => src + clk})
      sample({source:num, clock:str, target:[str,voidt]     , fn:(src,clk) => src + clk})
      sample({source:num, clock:str, target:[anyt,str]      , fn:(src,clk) => src + clk})
      sample({source:num, clock:str, target:[numStr,str]    , fn:(src,clk) => src + clk})
      sample({source:num, clock:str, target:[anyt,numStr]   , fn:(src,clk) => src + clk})
      sample({source:num, clock:str, target:[anyt,strBool]  , fn:(src,clk) => src + clk})
      sample({source:num, clock:str, target:[numStr,strBool], fn:(src,clk) => src + clk})
      sample({source:str, clock:num, target:[voidt]         , fn:(src,clk) => src + clk})
      sample({source:str, clock:num, target:[str]           , fn:(src,clk) => src + clk})
      sample({source:str, clock:num, target:[anyt]          , fn:(src,clk) => src + clk})
      sample({source:str, clock:num, target:[strBool]       , fn:(src,clk) => src + clk})
      sample({source:str, clock:num, target:[numStr]        , fn:(src,clk) => src + clk})
      sample({source:str, clock:num, target:[anyt,voidt]    , fn:(src,clk) => src + clk})
      sample({source:str, clock:num, target:[strBool,voidt] , fn:(src,clk) => src + clk})
      sample({source:str, clock:num, target:[numStr,voidt]  , fn:(src,clk) => src + clk})
      sample({source:str, clock:num, target:[str,voidt]     , fn:(src,clk) => src + clk})
      sample({source:str, clock:num, target:[anyt,str]      , fn:(src,clk) => src + clk})
      sample({source:str, clock:num, target:[numStr,str]    , fn:(src,clk) => src + clk})
      sample({source:str, clock:num, target:[anyt,numStr]   , fn:(src,clk) => src + clk})
      sample({source:str, clock:num, target:[anyt,strBool]  , fn:(src,clk) => src + clk})
      sample({source:str, clock:num, target:[numStr,strBool], fn:(src,clk) => src + clk})
      sample({source:str, clock:str, target:[voidt]         , fn:(src,clk) => src + clk})
      sample({source:str, clock:str, target:[str]           , fn:(src,clk) => src + clk})
      sample({source:str, clock:str, target:[anyt]          , fn:(src,clk) => src + clk})
      sample({source:str, clock:str, target:[strBool]       , fn:(src,clk) => src + clk})
      sample({source:str, clock:str, target:[numStr]        , fn:(src,clk) => src + clk})
      sample({source:str, clock:str, target:[anyt,voidt]    , fn:(src,clk) => src + clk})
      sample({source:str, clock:str, target:[strBool,voidt] , fn:(src,clk) => src + clk})
      sample({source:str, clock:str, target:[numStr,voidt]  , fn:(src,clk) => src + clk})
      sample({source:str, clock:str, target:[str,voidt]     , fn:(src,clk) => src + clk})
      sample({source:str, clock:str, target:[anyt,str]      , fn:(src,clk) => src + clk})
      sample({source:str, clock:str, target:[numStr,str]    , fn:(src,clk) => src + clk})
      sample({source:str, clock:str, target:[anyt,numStr]   , fn:(src,clk) => src + clk})
      sample({source:str, clock:str, target:[anyt,strBool]  , fn:(src,clk) => src + clk})
      sample({source:str, clock:str, target:[numStr,strBool], fn:(src,clk) => src + clk})
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
      sample({
        source: num,
        target: [
          //@ts-expect-error
          str,
        ],
        fn: (src) => src + 1,
      })
      sample({
        source: num,
        target: [
          //@ts-expect-error
          strBool,
        ],
        fn: (src) => src + 1,
      })
      sample({
        source: num,
        target: [
          num,
          //@ts-expect-error
          str,
        ],
        fn: (src) => src + 1,
      })
      sample({
        source: num,
        target: [
          num,
          //@ts-expect-error
          strBool,
        ],
        fn: (src) => src + 1,
      })
      sample({
        source: num,
        target: [
          //@ts-expect-error
          strBool,
          voidt,
        ],
        fn: (src) => src + 1,
      })
      sample({
        source: num,
        target: [
          //@ts-expect-error
          str,
          voidt,
        ],
        fn: (src) => src + 1,
      })
      sample({
        source: num,
        target: [
          anyt,
          //@ts-expect-error
          str,
        ],
        fn: (src) => src + 1,
      })
      sample({
        source: num,
        target: [
          numStr,
          //@ts-expect-error
          str,
        ],
        fn: (src) => src + 1,
      })
      sample({
        source: num,
        target: [
          anyt,
          //@ts-expect-error
          strBool,
        ],
        fn: (src) => src + 1,
      })
      sample({
        source: num,
        target: [
          numStr,
          //@ts-expect-error
          strBool,
        ],
        fn: (src) => src + 1,
      })
      sample({
        source: str,
        target: [
          //@ts-expect-error
          num,
        ],
        fn: (src) => src + 1,
      })
      sample({
        source: str,
        target: [
          //@ts-expect-error
          num,
          voidt,
        ],
        fn: (src) => src + 1,
      })
      sample({
        source: str,
        target: [
          //@ts-expect-error
          num,
          str,
        ],
        fn: (src) => src + 1,
      })
      sample({
        source: str,
        target: [
          anyt,
          //@ts-expect-error
          num,
        ],
        fn: (src) => src + 1,
      })
      sample({
        source: str,
        target: [
          //@ts-expect-error
          num,
          strBool,
        ],
        fn: (src) => src + 1,
      })
      sample({
        source: str,
        target: [
          //@ts-expect-error
          num,
          numStr,
        ],
        fn: (src) => src + 1,
      })
      sample({
        clock: num,
        target: [
          //@ts-expect-error
          str,
        ],
        fn: (clk) => clk + 1,
      })
      sample({
        clock: num,
        target: [
          //@ts-expect-error
          strBool,
        ],
        fn: (clk) => clk + 1,
      })
      sample({
        clock: num,
        target: [
          num,
          //@ts-expect-error
          str,
        ],
        fn: (clk) => clk + 1,
      })
      sample({
        clock: num,
        target: [
          num,
          //@ts-expect-error
          strBool,
        ],
        fn: (clk) => clk + 1,
      })
      sample({
        clock: num,
        target: [
          //@ts-expect-error
          strBool,
          voidt,
        ],
        fn: (clk) => clk + 1,
      })
      sample({
        clock: num,
        target: [
          //@ts-expect-error
          str,
          voidt,
        ],
        fn: (clk) => clk + 1,
      })
      sample({
        clock: num,
        target: [
          anyt,
          //@ts-expect-error
          str,
        ],
        fn: (clk) => clk + 1,
      })
      sample({
        clock: num,
        target: [
          numStr,
          //@ts-expect-error
          str,
        ],
        fn: (clk) => clk + 1,
      })
      sample({
        clock: num,
        target: [
          anyt,
          //@ts-expect-error
          strBool,
        ],
        fn: (clk) => clk + 1,
      })
      sample({
        clock: num,
        target: [
          numStr,
          //@ts-expect-error
          strBool,
        ],
        fn: (clk) => clk + 1,
      })
      sample({
        clock: str,
        target: [
          //@ts-expect-error
          num,
        ],
        fn: (clk) => clk + 1,
      })
      sample({
        clock: str,
        target: [
          //@ts-expect-error
          num,
          voidt,
        ],
        fn: (clk) => clk + 1,
      })
      sample({
        clock: str,
        target: [
          //@ts-expect-error
          num,
          str,
        ],
        fn: (clk) => clk + 1,
      })
      sample({
        clock: str,
        target: [
          anyt,
          //@ts-expect-error
          num,
        ],
        fn: (clk) => clk + 1,
      })
      sample({
        clock: str,
        target: [
          //@ts-expect-error
          num,
          strBool,
        ],
        fn: (clk) => clk + 1,
      })
      sample({
        clock: str,
        target: [
          //@ts-expect-error
          num,
          numStr,
        ],
        fn: (clk) => clk + 1,
      })
      sample({
        source: num,
        clock: num,
        target: [
          //@ts-expect-error
          str,
        ],
        fn: (src,clk) => src + clk,
      })
      sample({
        source: num,
        clock: num,
        target: [
          //@ts-expect-error
          strBool,
        ],
        fn: (src,clk) => src + clk,
      })
      sample({
        source: num,
        clock: num,
        target: [
          num,
          //@ts-expect-error
          str,
        ],
        fn: (src,clk) => src + clk,
      })
      sample({
        source: num,
        clock: num,
        target: [
          num,
          //@ts-expect-error
          strBool,
        ],
        fn: (src,clk) => src + clk,
      })
      sample({
        source: num,
        clock: num,
        target: [
          //@ts-expect-error
          strBool,
          voidt,
        ],
        fn: (src,clk) => src + clk,
      })
      sample({
        source: num,
        clock: num,
        target: [
          //@ts-expect-error
          str,
          voidt,
        ],
        fn: (src,clk) => src + clk,
      })
      sample({
        source: num,
        clock: num,
        target: [
          anyt,
          //@ts-expect-error
          str,
        ],
        fn: (src,clk) => src + clk,
      })
      sample({
        source: num,
        clock: num,
        target: [
          numStr,
          //@ts-expect-error
          str,
        ],
        fn: (src,clk) => src + clk,
      })
      sample({
        source: num,
        clock: num,
        target: [
          anyt,
          //@ts-expect-error
          strBool,
        ],
        fn: (src,clk) => src + clk,
      })
      sample({
        source: num,
        clock: num,
        target: [
          numStr,
          //@ts-expect-error
          strBool,
        ],
        fn: (src,clk) => src + clk,
      })
      sample({
        source: num,
        clock: str,
        target: [
          //@ts-expect-error
          num,
        ],
        fn: (src,clk) => src + clk,
      })
      sample({
        source: num,
        clock: str,
        target: [
          //@ts-expect-error
          num,
          voidt,
        ],
        fn: (src,clk) => src + clk,
      })
      sample({
        source: num,
        clock: str,
        target: [
          //@ts-expect-error
          num,
          str,
        ],
        fn: (src,clk) => src + clk,
      })
      sample({
        source: num,
        clock: str,
        target: [
          anyt,
          //@ts-expect-error
          num,
        ],
        fn: (src,clk) => src + clk,
      })
      sample({
        source: num,
        clock: str,
        target: [
          //@ts-expect-error
          num,
          strBool,
        ],
        fn: (src,clk) => src + clk,
      })
      sample({
        source: num,
        clock: str,
        target: [
          //@ts-expect-error
          num,
          numStr,
        ],
        fn: (src,clk) => src + clk,
      })
      sample({
        source: str,
        clock: num,
        target: [
          //@ts-expect-error
          num,
        ],
        fn: (src,clk) => src + clk,
      })
      sample({
        source: str,
        clock: num,
        target: [
          //@ts-expect-error
          num,
          voidt,
        ],
        fn: (src,clk) => src + clk,
      })
      sample({
        source: str,
        clock: num,
        target: [
          //@ts-expect-error
          num,
          str,
        ],
        fn: (src,clk) => src + clk,
      })
      sample({
        source: str,
        clock: num,
        target: [
          anyt,
          //@ts-expect-error
          num,
        ],
        fn: (src,clk) => src + clk,
      })
      sample({
        source: str,
        clock: num,
        target: [
          //@ts-expect-error
          num,
          strBool,
        ],
        fn: (src,clk) => src + clk,
      })
      sample({
        source: str,
        clock: num,
        target: [
          //@ts-expect-error
          num,
          numStr,
        ],
        fn: (src,clk) => src + clk,
      })
      sample({
        source: str,
        clock: str,
        target: [
          //@ts-expect-error
          num,
        ],
        fn: (src,clk) => src + clk,
      })
      sample({
        source: str,
        clock: str,
        target: [
          //@ts-expect-error
          num,
          voidt,
        ],
        fn: (src,clk) => src + clk,
      })
      sample({
        source: str,
        clock: str,
        target: [
          //@ts-expect-error
          num,
          str,
        ],
        fn: (src,clk) => src + clk,
      })
      sample({
        source: str,
        clock: str,
        target: [
          anyt,
          //@ts-expect-error
          num,
        ],
        fn: (src,clk) => src + clk,
      })
      sample({
        source: str,
        clock: str,
        target: [
          //@ts-expect-error
          num,
          strBool,
        ],
        fn: (src,clk) => src + clk,
      })
      sample({
        source: str,
        clock: str,
        target: [
          //@ts-expect-error
          num,
          numStr,
        ],
        fn: (src,clk) => src + clk,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Unmarked error at test line 9 'fn: (src) => src + 1,'
      lack of expected error at test line 7 'str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 17 'fn: (src) => src + 1,'
      lack of expected error at test line 15 'strBool,'
      Type 'number' is not assignable to type 'string | boolean'.
      Unmarked error at test line 44 'fn: (src) => src + 1,'
      lack of expected error at test line 24 'str,'
      lack of expected error at test line 33 'strBool,'
      lack of expected error at test line 41 'strBool,'
      Type 'number' is not assignable to type 'string | boolean | void'.
      Unmarked error at test line 53 'fn: (src) => src + 1,'
      lack of expected error at test line 50 'str,'
      Type 'number' is not assignable to type 'string | void'.
      Unmarked error at test line 97 'fn: (src) => src + 1,'
      lack of expected error at test line 60 'str,'
      lack of expected error at test line 69 'str,'
      lack of expected error at test line 78 'strBool,'
      lack of expected error at test line 87 'strBool,'
      lack of expected error at test line 95 'num,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 106 'fn: (src) => src + 1,'
      lack of expected error at test line 103 'num,'
      Type 'string' is not assignable to type 'number | void'.
      Unmarked error at test line 150 'fn: (clk) => clk + 1,'
      lack of expected error at test line 112 'num,'
      lack of expected error at test line 122 'num,'
      lack of expected error at test line 130 'num,'
      lack of expected error at test line 139 'num,'
      lack of expected error at test line 148 'str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 158 'fn: (clk) => clk + 1,'
      lack of expected error at test line 156 'strBool,'
      Type 'number' is not assignable to type 'string | boolean'.
      Unmarked error at test line 185 'fn: (clk) => clk + 1,'
      lack of expected error at test line 165 'str,'
      lack of expected error at test line 174 'strBool,'
      lack of expected error at test line 182 'strBool,'
      Type 'number' is not assignable to type 'string | boolean | void'.
      Unmarked error at test line 194 'fn: (clk) => clk + 1,'
      lack of expected error at test line 191 'str,'
      Type 'number' is not assignable to type 'string | void'.
      Unmarked error at test line 238 'fn: (clk) => clk + 1,'
      lack of expected error at test line 201 'str,'
      lack of expected error at test line 210 'str,'
      lack of expected error at test line 219 'strBool,'
      lack of expected error at test line 228 'strBool,'
      lack of expected error at test line 236 'num,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 247 'fn: (clk) => clk + 1,'
      lack of expected error at test line 244 'num,'
      Type 'string' is not assignable to type 'number | void'.
      Unmarked error at test line 292 'fn: (src,clk) => src + clk,'
      lack of expected error at test line 253 'num,'
      lack of expected error at test line 263 'num,'
      lack of expected error at test line 271 'num,'
      lack of expected error at test line 280 'num,'
      lack of expected error at test line 290 'str,'
      Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 301 'fn: (src,clk) => src + clk,'
      lack of expected error at test line 299 'strBool,'
      Type 'number' is not assignable to type 'string | boolean'.
      Unmarked error at test line 331 'fn: (src,clk) => src + clk,'
      lack of expected error at test line 309 'str,'
      lack of expected error at test line 319 'strBool,'
      lack of expected error at test line 328 'strBool,'
      Type 'number' is not assignable to type 'string | boolean | void'.
      Unmarked error at test line 341 'fn: (src,clk) => src + clk,'
      lack of expected error at test line 338 'str,'
      Type 'number' is not assignable to type 'string | void'.
      Unmarked error at test line 390 'fn: (src,clk) => src + clk,'
      lack of expected error at test line 349 'str,'
      lack of expected error at test line 359 'str,'
      lack of expected error at test line 369 'strBool,'
      lack of expected error at test line 379 'strBool,'
      lack of expected error at test line 388 'num,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 400 'fn: (src,clk) => src + clk,'
      lack of expected error at test line 397 'num,'
      Type 'string' is not assignable to type 'number | void'.
      Unmarked error at test line 449 'fn: (src,clk) => src + clk,'
      lack of expected error at test line 407 'num,'
      lack of expected error at test line 418 'num,'
      lack of expected error at test line 427 'num,'
      lack of expected error at test line 437 'num,'
      lack of expected error at test line 447 'num,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 459 'fn: (src,clk) => src + clk,'
      lack of expected error at test line 456 'num,'
      Type 'string' is not assignable to type 'number | void'.
      Unmarked error at test line 508 'fn: (src,clk) => src + clk,'
      lack of expected error at test line 466 'num,'
      lack of expected error at test line 477 'num,'
      lack of expected error at test line 486 'num,'
      lack of expected error at test line 496 'num,'
      lack of expected error at test line 506 'num,'
      Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 518 'fn: (src,clk) => src + clk,'
      lack of expected error at test line 515 'num,'
      Type 'string' is not assignable to type 'number | void'.
      lack of expected error at test line 525 'num,'
      lack of expected error at test line 536 'num,'
      lack of expected error at test line 545 'num,'
      lack of expected error at test line 555 'num,'
      "
    `)
  })
})
describe('typed fn', () => {
  test('typed fn (should pass)', () => {
    //prettier-ignore
    {
      sample({source:num, target:[num]         , fn:(src:number) => src+1             })
      sample({source:num, target:[voidt]       , fn:(src:number) => src+1             })
      sample({source:num, target:[anyt]        , fn:(src:number) => src+1             })
      sample({source:num, target:[numStr]      , fn:(src:number) => src+1             })
      sample({source:num, target:[num,voidt]   , fn:(src:number) => src+1             })
      sample({source:num, target:[anyt,num]    , fn:(src:number) => src+1             })
      sample({source:num, target:[num,numStr]  , fn:(src:number) => src+1             })
      sample({source:num, target:[anyt,voidt]  , fn:(src:number) => src+1             })
      sample({source:num, target:[numStr,voidt], fn:(src:number) => src+1             })
      sample({source:num, target:[anyt,numStr] , fn:(src:number) => src+1             })
      sample({clock:num, target:[num]         , fn:(clk:number) => clk+1             })
      sample({clock:num, target:[voidt]       , fn:(clk:number) => clk+1             })
      sample({clock:num, target:[anyt]        , fn:(clk:number) => clk+1             })
      sample({clock:num, target:[numStr]      , fn:(clk:number) => clk+1             })
      sample({clock:num, target:[num,voidt]   , fn:(clk:number) => clk+1             })
      sample({clock:num, target:[anyt,num]    , fn:(clk:number) => clk+1             })
      sample({clock:num, target:[num,numStr]  , fn:(clk:number) => clk+1             })
      sample({clock:num, target:[anyt,voidt]  , fn:(clk:number) => clk+1             })
      sample({clock:num, target:[numStr,voidt], fn:(clk:number) => clk+1             })
      sample({clock:num, target:[anyt,numStr] , fn:(clk:number) => clk+1             })
      sample({source:num, clock:num, target:[num]         , fn:(src:number,clk:number) => src+clk})
      sample({source:num, clock:num, target:[voidt]       , fn:(src:number,clk:number) => src+clk})
      sample({source:num, clock:num, target:[anyt]        , fn:(src:number,clk:number) => src+clk})
      sample({source:num, clock:num, target:[numStr]      , fn:(src:number,clk:number) => src+clk})
      sample({source:num, clock:num, target:[num,voidt]   , fn:(src:number,clk:number) => src+clk})
      sample({source:num, clock:num, target:[anyt,num]    , fn:(src:number,clk:number) => src+clk})
      sample({source:num, clock:num, target:[num,numStr]  , fn:(src:number,clk:number) => src+clk})
      sample({source:num, clock:num, target:[anyt,voidt]  , fn:(src:number,clk:number) => src+clk})
      sample({source:num, clock:num, target:[numStr,voidt], fn:(src:number,clk:number) => src+clk})
      sample({source:num, clock:num, target:[anyt,numStr] , fn:(src:number,clk:number) => src+clk})
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
      sample({
        source: num,
        target: [
          //@ts-expect-error
          str,
        ],
        fn: (src:number) => src+1,
      })
      sample({
        source: num,
        target: [
          //@ts-expect-error
          strBool,
        ],
        fn: (src:number) => src+1,
      })
      sample({
        source: num,
        target: [
          num,
          //@ts-expect-error
          str,
        ],
        fn: (src:number) => src+1,
      })
      sample({
        source: num,
        target: [
          num,
          //@ts-expect-error
          strBool,
        ],
        fn: (src:number) => src+1,
      })
      sample({
        source: num,
        target: [
          //@ts-expect-error
          strBool,
          voidt,
        ],
        fn: (src:number) => src+1,
      })
      sample({
        source: num,
        target: [
          //@ts-expect-error
          str,
          voidt,
        ],
        fn: (src:number) => src+1,
      })
      sample({
        source: num,
        target: [
          anyt,
          //@ts-expect-error
          str,
        ],
        fn: (src:number) => src+1,
      })
      sample({
        source: num,
        target: [
          numStr,
          //@ts-expect-error
          str,
        ],
        fn: (src:number) => src+1,
      })
      sample({
        source: num,
        target: [
          anyt,
          //@ts-expect-error
          strBool,
        ],
        fn: (src:number) => src+1,
      })
      sample({
        source: num,
        target: [
          numStr,
          //@ts-expect-error
          strBool,
        ],
        fn: (src:number) => src+1,
      })
      sample({
        clock: num,
        target: [
          //@ts-expect-error
          str,
        ],
        fn: (clk:number) => clk+1,
      })
      sample({
        clock: num,
        target: [
          //@ts-expect-error
          strBool,
        ],
        fn: (clk:number) => clk+1,
      })
      sample({
        clock: num,
        target: [
          num,
          //@ts-expect-error
          str,
        ],
        fn: (clk:number) => clk+1,
      })
      sample({
        clock: num,
        target: [
          num,
          //@ts-expect-error
          strBool,
        ],
        fn: (clk:number) => clk+1,
      })
      sample({
        clock: num,
        target: [
          //@ts-expect-error
          strBool,
          voidt,
        ],
        fn: (clk:number) => clk+1,
      })
      sample({
        clock: num,
        target: [
          //@ts-expect-error
          str,
          voidt,
        ],
        fn: (clk:number) => clk+1,
      })
      sample({
        clock: num,
        target: [
          anyt,
          //@ts-expect-error
          str,
        ],
        fn: (clk:number) => clk+1,
      })
      sample({
        clock: num,
        target: [
          numStr,
          //@ts-expect-error
          str,
        ],
        fn: (clk:number) => clk+1,
      })
      sample({
        clock: num,
        target: [
          anyt,
          //@ts-expect-error
          strBool,
        ],
        fn: (clk:number) => clk+1,
      })
      sample({
        clock: num,
        target: [
          numStr,
          //@ts-expect-error
          strBool,
        ],
        fn: (clk:number) => clk+1,
      })
      sample({
        source: num,
        clock: num,
        target: [
          //@ts-expect-error
          str,
        ],
        fn: (src:number,clk:number) => src+clk,
      })
      sample({
        source: num,
        clock: num,
        target: [
          //@ts-expect-error
          strBool,
        ],
        fn: (src:number,clk:number) => src+clk,
      })
      sample({
        source: num,
        clock: num,
        target: [
          num,
          //@ts-expect-error
          str,
        ],
        fn: (src:number,clk:number) => src+clk,
      })
      sample({
        source: num,
        clock: num,
        target: [
          num,
          //@ts-expect-error
          strBool,
        ],
        fn: (src:number,clk:number) => src+clk,
      })
      sample({
        source: num,
        clock: num,
        target: [
          //@ts-expect-error
          strBool,
          voidt,
        ],
        fn: (src:number,clk:number) => src+clk,
      })
      sample({
        source: num,
        clock: num,
        target: [
          //@ts-expect-error
          str,
          voidt,
        ],
        fn: (src:number,clk:number) => src+clk,
      })
      sample({
        source: num,
        clock: num,
        target: [
          anyt,
          //@ts-expect-error
          str,
        ],
        fn: (src:number,clk:number) => src+clk,
      })
      sample({
        source: num,
        clock: num,
        target: [
          numStr,
          //@ts-expect-error
          str,
        ],
        fn: (src:number,clk:number) => src+clk,
      })
      sample({
        source: num,
        clock: num,
        target: [
          anyt,
          //@ts-expect-error
          strBool,
        ],
        fn: (src:number,clk:number) => src+clk,
      })
      sample({
        source: num,
        clock: num,
        target: [
          numStr,
          //@ts-expect-error
          strBool,
        ],
        fn: (src:number,clk:number) => src+clk,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Unmarked error at test line 9 'fn: (src:number) => src+1,'
      lack of expected error at test line 7 'str,'
      Type '(src: number) => number' is not assignable to type '(src: number) => string'.
        Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 17 'fn: (src:number) => src+1,'
      lack of expected error at test line 15 'strBool,'
      Type '(src: number) => number' is not assignable to type '(src: number) => string | boolean'.
        Type 'number' is not assignable to type 'string | boolean'.
      Unmarked error at test line 44 'fn: (src:number) => src+1,'
      lack of expected error at test line 24 'str,'
      lack of expected error at test line 33 'strBool,'
      lack of expected error at test line 41 'strBool,'
      Type '(src: number) => number' is not assignable to type '(src: number) => string | boolean | void'.
        Type 'number' is not assignable to type 'string | boolean | void'.
      Unmarked error at test line 53 'fn: (src:number) => src+1,'
      lack of expected error at test line 50 'str,'
      Type '(src: number) => number' is not assignable to type '(src: number) => string | void'.
        Type 'number' is not assignable to type 'string | void'.
      Unmarked error at test line 97 'fn: (clk:number) => clk+1,'
      lack of expected error at test line 60 'str,'
      lack of expected error at test line 69 'str,'
      lack of expected error at test line 78 'strBool,'
      lack of expected error at test line 87 'strBool,'
      lack of expected error at test line 95 'str,'
      Type '(clk: number) => number' is not assignable to type '(clk: number) => string'.
        Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 105 'fn: (clk:number) => clk+1,'
      lack of expected error at test line 103 'strBool,'
      Type '(clk: number) => number' is not assignable to type '(clk: number) => string | boolean'.
        Type 'number' is not assignable to type 'string | boolean'.
      Unmarked error at test line 132 'fn: (clk:number) => clk+1,'
      lack of expected error at test line 112 'str,'
      lack of expected error at test line 121 'strBool,'
      lack of expected error at test line 129 'strBool,'
      Type '(clk: number) => number' is not assignable to type '(clk: number) => string | boolean | void'.
        Type 'number' is not assignable to type 'string | boolean | void'.
      Unmarked error at test line 141 'fn: (clk:number) => clk+1,'
      lack of expected error at test line 138 'str,'
      Type '(clk: number) => number' is not assignable to type '(clk: number) => string | void'.
        Type 'number' is not assignable to type 'string | void'.
      Unmarked error at test line 186 'fn: (src:number,clk:number) => src+clk,'
      lack of expected error at test line 148 'str,'
      lack of expected error at test line 157 'str,'
      lack of expected error at test line 166 'strBool,'
      lack of expected error at test line 175 'strBool,'
      lack of expected error at test line 184 'str,'
      Type '(src: number, clk: number) => number' is not assignable to type '(src: number, clk: number) => string'.
        Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 195 'fn: (src:number,clk:number) => src+clk,'
      lack of expected error at test line 193 'strBool,'
      Type '(src: number, clk: number) => number' is not assignable to type '(src: number, clk: number) => string | boolean'.
        Type 'number' is not assignable to type 'string | boolean'.
      Unmarked error at test line 225 'fn: (src:number,clk:number) => src+clk,'
      lack of expected error at test line 203 'str,'
      lack of expected error at test line 213 'strBool,'
      lack of expected error at test line 222 'strBool,'
      Type '(src: number, clk: number) => number' is not assignable to type '(src: number, clk: number) => string | boolean | void'.
        Type 'number' is not assignable to type 'string | boolean | void'.
      Unmarked error at test line 235 'fn: (src:number,clk:number) => src+clk,'
      lack of expected error at test line 232 'str,'
      Type '(src: number, clk: number) => number' is not assignable to type '(src: number, clk: number) => string | void'.
        Type 'number' is not assignable to type 'string | void'.
      lack of expected error at test line 243 'str,'
      lack of expected error at test line 253 'str,'
      lack of expected error at test line 263 'strBool,'
      lack of expected error at test line 273 'strBool,'
      "
    `)
  })
})
test('wrong args (should fail)', () => {
  //prettier-ignore
  {
    sample({
      source: num,
      clock: str,
      target: [num],
      //@ts-expect-error
      fn: (src:number,clk:number) => src+clk,
    })
    sample({
      source: num,
      clock: str,
      target: [voidt],
      //@ts-expect-error
      fn: (src:number,clk:number) => src+clk,
    })
    sample({
      source: num,
      clock: str,
      target: [str],
      //@ts-expect-error
      fn: (src:number,clk:number) => src+clk,
    })
    sample({
      source: num,
      clock: str,
      target: [anyt],
      //@ts-expect-error
      fn: (src:number,clk:number) => src+clk,
    })
    sample({
      source: num,
      clock: str,
      target: [strBool],
      //@ts-expect-error
      fn: (src:number,clk:number) => src+clk,
    })
    sample({
      source: num,
      clock: str,
      target: [numStr],
      //@ts-expect-error
      fn: (src:number,clk:number) => src+clk,
    })
    sample({
      source: num,
      clock: str,
      target: [num,voidt],
      //@ts-expect-error
      fn: (src:number,clk:number) => src+clk,
    })
    sample({
      source: num,
      clock: str,
      target: [num,str],
      //@ts-expect-error
      fn: (src:number,clk:number) => src+clk,
    })
    sample({
      source: num,
      clock: str,
      target: [anyt,num],
      //@ts-expect-error
      fn: (src:number,clk:number) => src+clk,
    })
    sample({
      source: num,
      clock: str,
      target: [num,strBool],
      //@ts-expect-error
      fn: (src:number,clk:number) => src+clk,
    })
    sample({
      source: num,
      clock: str,
      target: [num,numStr],
      //@ts-expect-error
      fn: (src:number,clk:number) => src+clk,
    })
    sample({
      source: num,
      clock: str,
      target: [anyt,voidt],
      //@ts-expect-error
      fn: (src:number,clk:number) => src+clk,
    })
    sample({
      source: num,
      clock: str,
      target: [strBool,voidt],
      //@ts-expect-error
      fn: (src:number,clk:number) => src+clk,
    })
    sample({
      source: num,
      clock: str,
      target: [numStr,voidt],
      //@ts-expect-error
      fn: (src:number,clk:number) => src+clk,
    })
    sample({
      source: num,
      clock: str,
      target: [str,voidt],
      //@ts-expect-error
      fn: (src:number,clk:number) => src+clk,
    })
    sample({
      source: num,
      clock: str,
      target: [anyt,str],
      //@ts-expect-error
      fn: (src:number,clk:number) => src+clk,
    })
    sample({
      source: num,
      clock: str,
      target: [numStr,str],
      //@ts-expect-error
      fn: (src:number,clk:number) => src+clk,
    })
    sample({
      source: num,
      clock: str,
      target: [anyt,numStr],
      //@ts-expect-error
      fn: (src:number,clk:number) => src+clk,
    })
    sample({
      source: num,
      clock: str,
      target: [anyt,strBool],
      //@ts-expect-error
      fn: (src:number,clk:number) => src+clk,
    })
    sample({
      source: num,
      clock: str,
      target: [numStr,strBool],
      //@ts-expect-error
      fn: (src:number,clk:number) => src+clk,
    })
    sample({
      source: str,
      clock: num,
      target: [num],
      //@ts-expect-error
      fn: (src:number,clk:number) => src+clk,
    })
    sample({
      source: str,
      clock: num,
      target: [voidt],
      //@ts-expect-error
      fn: (src:number,clk:number) => src+clk,
    })
    sample({
      source: str,
      clock: num,
      target: [str],
      //@ts-expect-error
      fn: (src:number,clk:number) => src+clk,
    })
    sample({
      source: str,
      clock: num,
      target: [anyt],
      //@ts-expect-error
      fn: (src:number,clk:number) => src+clk,
    })
    sample({
      source: str,
      clock: num,
      target: [strBool],
      //@ts-expect-error
      fn: (src:number,clk:number) => src+clk,
    })
    sample({
      source: str,
      clock: num,
      target: [numStr],
      //@ts-expect-error
      fn: (src:number,clk:number) => src+clk,
    })
    sample({
      source: str,
      clock: num,
      target: [num,voidt],
      //@ts-expect-error
      fn: (src:number,clk:number) => src+clk,
    })
    sample({
      source: str,
      clock: num,
      target: [num,str],
      //@ts-expect-error
      fn: (src:number,clk:number) => src+clk,
    })
    sample({
      source: str,
      clock: num,
      target: [anyt,num],
      //@ts-expect-error
      fn: (src:number,clk:number) => src+clk,
    })
    sample({
      source: str,
      clock: num,
      target: [num,strBool],
      //@ts-expect-error
      fn: (src:number,clk:number) => src+clk,
    })
    sample({
      source: str,
      clock: num,
      target: [num,numStr],
      //@ts-expect-error
      fn: (src:number,clk:number) => src+clk,
    })
    sample({
      source: str,
      clock: num,
      target: [anyt,voidt],
      //@ts-expect-error
      fn: (src:number,clk:number) => src+clk,
    })
    sample({
      source: str,
      clock: num,
      target: [strBool,voidt],
      //@ts-expect-error
      fn: (src:number,clk:number) => src+clk,
    })
    sample({
      source: str,
      clock: num,
      target: [numStr,voidt],
      //@ts-expect-error
      fn: (src:number,clk:number) => src+clk,
    })
    sample({
      source: str,
      clock: num,
      target: [str,voidt],
      //@ts-expect-error
      fn: (src:number,clk:number) => src+clk,
    })
    sample({
      source: str,
      clock: num,
      target: [anyt,str],
      //@ts-expect-error
      fn: (src:number,clk:number) => src+clk,
    })
    sample({
      source: str,
      clock: num,
      target: [numStr,str],
      //@ts-expect-error
      fn: (src:number,clk:number) => src+clk,
    })
    sample({
      source: str,
      clock: num,
      target: [anyt,numStr],
      //@ts-expect-error
      fn: (src:number,clk:number) => src+clk,
    })
    sample({
      source: str,
      clock: num,
      target: [anyt,strBool],
      //@ts-expect-error
      fn: (src:number,clk:number) => src+clk,
    })
    sample({
      source: str,
      clock: num,
      target: [numStr,strBool],
      //@ts-expect-error
      fn: (src:number,clk:number) => src+clk,
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Type '(src: number, clk: number) => number' is not assignable to type '((src: number, clk: string) => any) & ((src: number, clk: number) => number)'.
      Type '(src: number, clk: number) => number' is not assignable to type '(src: number, clk: string) => any'.
        Types of parameters 'clk' and 'clk' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type '(src: number, clk: number) => number' is not assignable to type '((src: number, clk: string) => any) & ((src: number, clk: number) => number)'.
      Type '(src: number, clk: number) => number' is not assignable to type '(src: number, clk: string) => any'.
        Types of parameters 'clk' and 'clk' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type '(src: number, clk: number) => number' is not assignable to type '((src: number, clk: string) => any) & ((src: number, clk: number) => number)'.
      Type '(src: number, clk: number) => number' is not assignable to type '(src: number, clk: string) => any'.
        Types of parameters 'clk' and 'clk' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type '(src: number, clk: number) => number' is not assignable to type '((src: number, clk: string) => any) & ((src: number, clk: number) => number)'.
      Type '(src: number, clk: number) => number' is not assignable to type '(src: number, clk: string) => any'.
        Types of parameters 'clk' and 'clk' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type '(src: number, clk: number) => number' is not assignable to type '((src: number, clk: string) => any) & ((src: number, clk: number) => number)'.
      Type '(src: number, clk: number) => number' is not assignable to type '(src: number, clk: string) => any'.
        Types of parameters 'clk' and 'clk' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type '(src: number, clk: number) => number' is not assignable to type '((src: number, clk: string) => any) & ((src: number, clk: number) => number)'.
      Type '(src: number, clk: number) => number' is not assignable to type '(src: number, clk: string) => any'.
        Types of parameters 'clk' and 'clk' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type '(src: number, clk: number) => number' is not assignable to type '((src: number, clk: string) => any) & ((src: number, clk: number) => number)'.
      Type '(src: number, clk: number) => number' is not assignable to type '(src: number, clk: string) => any'.
        Types of parameters 'clk' and 'clk' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type '(src: number, clk: number) => number' is not assignable to type '((src: number, clk: string) => any) & ((src: number, clk: number) => number)'.
      Type '(src: number, clk: number) => number' is not assignable to type '(src: number, clk: string) => any'.
        Types of parameters 'clk' and 'clk' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type '(src: number, clk: number) => number' is not assignable to type '((src: number, clk: string) => any) & ((src: number, clk: number) => number)'.
      Type '(src: number, clk: number) => number' is not assignable to type '(src: number, clk: string) => any'.
        Types of parameters 'clk' and 'clk' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type '(src: number, clk: number) => number' is not assignable to type '((src: number, clk: string) => any) & ((src: number, clk: number) => number)'.
      Type '(src: number, clk: number) => number' is not assignable to type '(src: number, clk: string) => any'.
        Types of parameters 'clk' and 'clk' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type '(src: number, clk: number) => number' is not assignable to type '((src: number, clk: string) => any) & ((src: number, clk: number) => number)'.
      Type '(src: number, clk: number) => number' is not assignable to type '(src: number, clk: string) => any'.
        Types of parameters 'clk' and 'clk' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type '(src: number, clk: number) => number' is not assignable to type '((src: number, clk: string) => any) & ((src: number, clk: number) => number)'.
      Type '(src: number, clk: number) => number' is not assignable to type '(src: number, clk: string) => any'.
        Types of parameters 'clk' and 'clk' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type '(src: number, clk: number) => number' is not assignable to type '((src: number, clk: string) => any) & ((src: number, clk: number) => number)'.
      Type '(src: number, clk: number) => number' is not assignable to type '(src: number, clk: string) => any'.
        Types of parameters 'clk' and 'clk' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type '(src: number, clk: number) => number' is not assignable to type '((src: number, clk: string) => any) & ((src: number, clk: number) => number)'.
      Type '(src: number, clk: number) => number' is not assignable to type '(src: number, clk: string) => any'.
        Types of parameters 'clk' and 'clk' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type '(src: number, clk: number) => number' is not assignable to type '((src: number, clk: string) => any) & ((src: number, clk: number) => number)'.
      Type '(src: number, clk: number) => number' is not assignable to type '(src: number, clk: string) => any'.
        Types of parameters 'clk' and 'clk' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type '(src: number, clk: number) => number' is not assignable to type '((src: number, clk: string) => any) & ((src: number, clk: number) => number)'.
      Type '(src: number, clk: number) => number' is not assignable to type '(src: number, clk: string) => any'.
        Types of parameters 'clk' and 'clk' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type '(src: number, clk: number) => number' is not assignable to type '((src: number, clk: string) => any) & ((src: number, clk: number) => number)'.
      Type '(src: number, clk: number) => number' is not assignable to type '(src: number, clk: string) => any'.
        Types of parameters 'clk' and 'clk' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type '(src: number, clk: number) => number' is not assignable to type '((src: number, clk: string) => any) & ((src: number, clk: number) => number)'.
      Type '(src: number, clk: number) => number' is not assignable to type '(src: number, clk: string) => any'.
        Types of parameters 'clk' and 'clk' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type '(src: number, clk: number) => number' is not assignable to type '((src: number, clk: string) => any) & ((src: number, clk: number) => number)'.
      Type '(src: number, clk: number) => number' is not assignable to type '(src: number, clk: string) => any'.
        Types of parameters 'clk' and 'clk' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type '(src: number, clk: number) => number' is not assignable to type '((src: number, clk: string) => any) & ((src: number, clk: number) => number)'.
      Type '(src: number, clk: number) => number' is not assignable to type '(src: number, clk: string) => any'.
        Types of parameters 'clk' and 'clk' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type '(src: number, clk: number) => number' is not assignable to type '((src: string, clk: number) => any) & ((src: number, clk: number) => number)'.
      Type '(src: number, clk: number) => number' is not assignable to type '(src: string, clk: number) => any'.
        Types of parameters 'src' and 'src' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type '(src: number, clk: number) => number' is not assignable to type '((src: string, clk: number) => any) & ((src: number, clk: number) => number)'.
      Type '(src: number, clk: number) => number' is not assignable to type '(src: string, clk: number) => any'.
        Types of parameters 'src' and 'src' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type '(src: number, clk: number) => number' is not assignable to type '((src: string, clk: number) => any) & ((src: number, clk: number) => number)'.
      Type '(src: number, clk: number) => number' is not assignable to type '(src: string, clk: number) => any'.
        Types of parameters 'src' and 'src' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type '(src: number, clk: number) => number' is not assignable to type '((src: string, clk: number) => any) & ((src: number, clk: number) => number)'.
      Type '(src: number, clk: number) => number' is not assignable to type '(src: string, clk: number) => any'.
        Types of parameters 'src' and 'src' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type '(src: number, clk: number) => number' is not assignable to type '((src: string, clk: number) => any) & ((src: number, clk: number) => number)'.
      Type '(src: number, clk: number) => number' is not assignable to type '(src: string, clk: number) => any'.
        Types of parameters 'src' and 'src' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type '(src: number, clk: number) => number' is not assignable to type '((src: string, clk: number) => any) & ((src: number, clk: number) => number)'.
      Type '(src: number, clk: number) => number' is not assignable to type '(src: string, clk: number) => any'.
        Types of parameters 'src' and 'src' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type '(src: number, clk: number) => number' is not assignable to type '((src: string, clk: number) => any) & ((src: number, clk: number) => number)'.
      Type '(src: number, clk: number) => number' is not assignable to type '(src: string, clk: number) => any'.
        Types of parameters 'src' and 'src' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type '(src: number, clk: number) => number' is not assignable to type '((src: string, clk: number) => any) & ((src: number, clk: number) => number)'.
      Type '(src: number, clk: number) => number' is not assignable to type '(src: string, clk: number) => any'.
        Types of parameters 'src' and 'src' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type '(src: number, clk: number) => number' is not assignable to type '((src: string, clk: number) => any) & ((src: number, clk: number) => number)'.
      Type '(src: number, clk: number) => number' is not assignable to type '(src: string, clk: number) => any'.
        Types of parameters 'src' and 'src' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type '(src: number, clk: number) => number' is not assignable to type '((src: string, clk: number) => any) & ((src: number, clk: number) => number)'.
      Type '(src: number, clk: number) => number' is not assignable to type '(src: string, clk: number) => any'.
        Types of parameters 'src' and 'src' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type '(src: number, clk: number) => number' is not assignable to type '((src: string, clk: number) => any) & ((src: number, clk: number) => number)'.
      Type '(src: number, clk: number) => number' is not assignable to type '(src: string, clk: number) => any'.
        Types of parameters 'src' and 'src' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type '(src: number, clk: number) => number' is not assignable to type '((src: string, clk: number) => any) & ((src: number, clk: number) => number)'.
      Type '(src: number, clk: number) => number' is not assignable to type '(src: string, clk: number) => any'.
        Types of parameters 'src' and 'src' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type '(src: number, clk: number) => number' is not assignable to type '((src: string, clk: number) => any) & ((src: number, clk: number) => number)'.
      Type '(src: number, clk: number) => number' is not assignable to type '(src: string, clk: number) => any'.
        Types of parameters 'src' and 'src' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type '(src: number, clk: number) => number' is not assignable to type '((src: string, clk: number) => any) & ((src: number, clk: number) => number)'.
      Type '(src: number, clk: number) => number' is not assignable to type '(src: string, clk: number) => any'.
        Types of parameters 'src' and 'src' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type '(src: number, clk: number) => number' is not assignable to type '((src: string, clk: number) => any) & ((src: number, clk: number) => number)'.
      Type '(src: number, clk: number) => number' is not assignable to type '(src: string, clk: number) => any'.
        Types of parameters 'src' and 'src' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type '(src: number, clk: number) => number' is not assignable to type '((src: string, clk: number) => any) & ((src: number, clk: number) => number)'.
      Type '(src: number, clk: number) => number' is not assignable to type '(src: string, clk: number) => any'.
        Types of parameters 'src' and 'src' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type '(src: number, clk: number) => number' is not assignable to type '((src: string, clk: number) => any) & ((src: number, clk: number) => number)'.
      Type '(src: number, clk: number) => number' is not assignable to type '(src: string, clk: number) => any'.
        Types of parameters 'src' and 'src' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type '(src: number, clk: number) => number' is not assignable to type '((src: string, clk: number) => any) & ((src: number, clk: number) => number)'.
      Type '(src: number, clk: number) => number' is not assignable to type '(src: string, clk: number) => any'.
        Types of parameters 'src' and 'src' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type '(src: number, clk: number) => number' is not assignable to type '((src: string, clk: number) => any) & ((src: number, clk: number) => number)'.
      Type '(src: number, clk: number) => number' is not assignable to type '(src: string, clk: number) => any'.
        Types of parameters 'src' and 'src' are incompatible.
          Type 'string' is not assignable to type 'number'.
    Type '(src: number, clk: number) => number' is not assignable to type '((src: string, clk: number) => any) & ((src: number, clk: number) => number)'.
      Type '(src: number, clk: number) => number' is not assignable to type '(src: string, clk: number) => any'.
        Types of parameters 'src' and 'src' are incompatible.
          Type 'string' is not assignable to type 'number'.
    "
  `)
})
