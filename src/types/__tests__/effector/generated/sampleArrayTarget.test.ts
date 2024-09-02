/* eslint-disable no-unused-vars */
import {createStore, createEvent, sample} from 'effector'
const typecheck = '{global}'
{
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
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | boolean; }[]; }'.
        Unmarked error at test line 34 'source: num,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | boolean | void; }[]; }'.
        Unmarked error at test line 42 'source: num,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | void; }[]; }'.
        Unmarked error at test line 82 'source: str,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: string; targetType: number; }[]; }'.
        Unmarked error at test line 89 'source: str,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: string; targetType: number | void; }[]; }'.
        Unmarked error at test line 129 'clock: num,'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: number; targetType: string; }[]; }'.
        Unmarked error at test line 136 'clock: num,'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: number; targetType: string | boolean; }[]; }'.
        Unmarked error at test line 159 'clock: num,'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: number; targetType: string | boolean | void; }[]; }'.
        Unmarked error at test line 167 'clock: num,'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: number; targetType: string | void; }[]; }'.
        Unmarked error at test line 207 'clock: str,'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: string; targetType: number; }[]; }'.
        Unmarked error at test line 214 'clock: str,'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: string; targetType: number | void; }[]; }'.
        Unmarked error at test line 254 'source: num,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string; }[]; }'.
        Unmarked error at test line 262 'source: num,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | boolean; }[]; }'.
        Unmarked error at test line 288 'source: num,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | boolean | void; }[]; }'.
        Unmarked error at test line 297 'source: num,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | void; }[]; }'.
        Unmarked error at test line 342 'source: num,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string; }[]; }'.
        Unmarked error at test line 350 'source: num,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | boolean; }[]; }'.
        Unmarked error at test line 376 'source: num,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | boolean | void; }[]; }'.
        Unmarked error at test line 385 'source: num,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | void; }[]; }'.
        Unmarked error at test line 430 'source: str,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: string; targetType: number; }[]; }'.
        Unmarked error at test line 438 'source: str,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: string; targetType: number | void; }[]; }'.
        Unmarked error at test line 483 'source: str,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: string; targetType: number; }[]; }'.
        Unmarked error at test line 491 'source: str,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: string; targetType: number | void; }[]; }'.
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
        Unmarked error at test line 4 'source: num,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string; }[]; }'.
        Unmarked error at test line 12 'source: num,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | boolean; }[]; }'.
        Unmarked error at test line 38 'source: num,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | boolean | void; }[]; }'.
        Unmarked error at test line 47 'source: num,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | void; }[]; }'.
        Unmarked error at test line 92 'source: str,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: number; }[]; }'.
        Unmarked error at test line 100 'source: str,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: number | void; }[]; }'.
        Unmarked error at test line 145 'clock: num,'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string; }[]; }'.
        Unmarked error at test line 153 'clock: num,'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | boolean; }[]; }'.
        Unmarked error at test line 179 'clock: num,'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | boolean | void; }[]; }'.
        Unmarked error at test line 188 'clock: num,'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | void; }[]; }'.
        Unmarked error at test line 233 'clock: str,'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: number; }[]; }'.
        Unmarked error at test line 241 'clock: str,'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: number | void; }[]; }'.
        Unmarked error at test line 286 'source: num,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string; }[]; }'.
        Unmarked error at test line 295 'source: num,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | boolean; }[]; }'.
        Unmarked error at test line 324 'source: num,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | boolean | void; }[]; }'.
        Unmarked error at test line 334 'source: num,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | void; }[]; }'.
        Unmarked error at test line 384 'source: num,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: number; }[]; }'.
        Unmarked error at test line 393 'source: num,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: number | void; }[]; }'.
        Unmarked error at test line 443 'source: str,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: number; }[]; }'.
        Unmarked error at test line 452 'source: str,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: number | void; }[]; }'.
        Unmarked error at test line 502 'source: str,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: number; }[]; }'.
        Unmarked error at test line 511 'source: str,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: number | void; }[]; }'.
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
        Unmarked error at test line 4 'source: num,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string; }[]; }'.
        Unmarked error at test line 12 'source: num,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | boolean; }[]; }'.
        Unmarked error at test line 38 'source: num,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | boolean | void; }[]; }'.
        Unmarked error at test line 47 'source: num,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | void; }[]; }'.
        Unmarked error at test line 92 'clock: num,'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string; }[]; }'.
        Unmarked error at test line 100 'clock: num,'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | boolean; }[]; }'.
        Unmarked error at test line 126 'clock: num,'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | boolean | void; }[]; }'.
        Unmarked error at test line 135 'clock: num,'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | void; }[]; }'.
        Unmarked error at test line 180 'source: num,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string; }[]; }'.
        Unmarked error at test line 189 'source: num,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | boolean; }[]; }'.
        Unmarked error at test line 218 'source: num,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | boolean | void; }[]; }'.
        Unmarked error at test line 228 'source: num,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | void; }[]; }'.
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
}
{
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
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }[]; }'.
        Unmarked error at test line 42 'source: {a:$num,b:$str},'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: AS | ABN; }[]; }'.
        Unmarked error at test line 59 'source: [$num,$str],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [string]; }[]; }'.
        Unmarked error at test line 66 'source: [$num,$str],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number]; }[]; }'.
        Unmarked error at test line 73 'source: [$num,$str],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [string] | [number]; }[]; }'.
        Unmarked error at test line 81 'source: [$num,$str],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number] | [number]; }[]; }'.
        Unmarked error at test line 89 'source: [$num,$str],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number] | [string]; }[]; }'.
        Unmarked error at test line 98 'source: [$num,$str],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [string] | [number, string]; }[]; }'.
        Unmarked error at test line 106 'source: [$num,$str],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number] | [number, string]; }[]; }'.
        Unmarked error at test line 114 'source: [$num,$str] as const,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number, string]; targetType: [string]; }[]; }'.
        Unmarked error at test line 121 'source: [$num,$str] as const,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number, string]; targetType: [number, number]; }[]; }'.
        Unmarked error at test line 128 'source: [$num,$str] as const,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number, string]; targetType: [string] | [number]; }[]; }'.
        Unmarked error at test line 136 'source: [$num,$str] as const,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number, string]; targetType: [number, number] | [number]; }[]; }'.
        Unmarked error at test line 144 'source: [$num,$str] as const,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number, string]; targetType: [number, number] | [string]; }[]; }'.
        Unmarked error at test line 169 'source: {a:$num,b:$str},'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: AS; }[]; }'.
        Unmarked error at test line 177 'source: {a:$num,b:$str},'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }[]; }'.
        Unmarked error at test line 212 'source: {a:$num,b:$str},'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: AS | ABN; }[]; }'.
        Unmarked error at test line 231 'source: [$num,$str],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [string]; }[]; }'.
        Unmarked error at test line 239 'source: [$num,$str],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number]; }[]; }'.
        Unmarked error at test line 247 'source: [$num,$str],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [string] | [number]; }[]; }'.
        Unmarked error at test line 256 'source: [$num,$str],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number] | [number]; }[]; }'.
        Unmarked error at test line 265 'source: [$num,$str],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number] | [string]; }[]; }'.
        Unmarked error at test line 275 'source: [$num,$str],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [string] | [number, string]; }[]; }'.
        Unmarked error at test line 284 'source: [$num,$str],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number] | [number, string]; }[]; }'.
        Unmarked error at test line 293 'source: [$num,$str] as const,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number, string]; targetType: [string]; }[]; }'.
        Unmarked error at test line 301 'source: [$num,$str] as const,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number, string]; targetType: [number, number]; }[]; }'.
        Unmarked error at test line 309 'source: [$num,$str] as const,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number, string]; targetType: [string] | [number]; }[]; }'.
        Unmarked error at test line 318 'source: [$num,$str] as const,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number, string]; targetType: [number, number] | [number]; }[]; }'.
        Unmarked error at test line 327 'source: [$num,$str] as const,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number, string]; targetType: [number, number] | [string]; }[]; }'.
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
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AN; }[]; }'.
        Unmarked error at test line 7 'sample({source:[$num,$str]         , target:[ab]      , fn:([a,b]) => ({a,b})})'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AB; }[]; }'.
        Unmarked error at test line 8 'sample({source:[$num,$str]         , target:[a_num,ab], fn:([a,b]) => ({a,b})})'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AN; }[]; }'.
        Unmarked error at test line 15 'sample({source:[$num,$str]         , clock:num, target:[a_num]   , fn:([a,b]) => ({a,b})})'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AN; }[]; }'.
        Unmarked error at test line 16 'sample({source:[$num,$str]         , clock:num, target:[ab]      , fn:([a,b]) => ({a,b})})'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AB; }[]; }'.
        Unmarked error at test line 17 'sample({source:[$num,$str]         , clock:num, target:[a_num,ab], fn:([a,b]) => ({a,b})})'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AN; }[]; }'.
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
        Unmarked error at test line 4 'source: {a:$num,b:$str},'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS; }[]; }'.
        Unmarked error at test line 12 'source: {a:$num,b:$str},'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: ABN; }[]; }'.
        Unmarked error at test line 47 'source: {a:$num,b:$str},'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS | ABN; }[]; }'.
        Unmarked error at test line 66 'source: [$num,$str],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AS; }[]; }'.
        Unmarked error at test line 74 'source: [$num,$str],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: ABN; }[]; }'.
        Unmarked error at test line 82 'source: [$num,$str],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AN | AS; }[]; }'.
        Unmarked error at test line 91 'source: [$num,$str],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AN; }[]; }'.
        Unmarked error at test line 100 'source: [$num,$str],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AS | AB; }[]; }'.
        Unmarked error at test line 109 'source: [$num,$str],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AS | ABN; }[]; }'.
        Unmarked error at test line 119 'source: [$num,$str],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AB | ABN; }[]; }'.
        Unmarked error at test line 128 'source: [$num,$str] as const,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS; }[]; }'.
        Unmarked error at test line 136 'source: [$num,$str] as const,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: ABN; }[]; }'.
        Unmarked error at test line 171 'source: [$num,$str] as const,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS | ABN; }[]; }'.
        Unmarked error at test line 190 'source: {a:$num,b:$str},'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS; }[]; }'.
        Unmarked error at test line 199 'source: {a:$num,b:$str},'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: ABN; }[]; }'.
        Unmarked error at test line 238 'source: {a:$num,b:$str},'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS | ABN; }[]; }'.
        Unmarked error at test line 259 'source: [$num,$str],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AS; }[]; }'.
        Unmarked error at test line 268 'source: [$num,$str],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: ABN; }[]; }'.
        Unmarked error at test line 277 'source: [$num,$str],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AN | AS; }[]; }'.
        Unmarked error at test line 287 'source: [$num,$str],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AN; }[]; }'.
        Unmarked error at test line 297 'source: [$num,$str],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AS | AB; }[]; }'.
        Unmarked error at test line 307 'source: [$num,$str],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AS | ABN; }[]; }'.
        Unmarked error at test line 318 'source: [$num,$str],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AB | ABN; }[]; }'.
        Unmarked error at test line 328 'source: [$num,$str] as const,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS; }[]; }'.
        Unmarked error at test line 337 'source: [$num,$str] as const,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: ABN; }[]; }'.
        Unmarked error at test line 376 'source: [$num,$str] as const,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS | ABN; }[]; }'.
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
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: ABN; }[]; }'.
        Unmarked error at test line 18 'source: {a:$num},'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB; }[]; }'.
        Unmarked error at test line 49 'source: {a:$num},'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AS | AB; }[]; }'.
        Unmarked error at test line 58 'source: {a:$num},'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AS | ABN; }[]; }'.
        Unmarked error at test line 67 'source: {a:$num},'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB | ABN; }[]; }'.
        Unmarked error at test line 76 'source: [$num],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [string]; }[]; }'.
        Unmarked error at test line 83 'source: [$num],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, string]; }[]; }'.
        Unmarked error at test line 90 'source: [$num],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number]; }[]; }'.
        Unmarked error at test line 97 'source: [$num],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [string] | [number]; }[]; }'.
        Unmarked error at test line 105 'source: [$num],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, string] | [number]; }[]; }'.
        Unmarked error at test line 113 'source: [$num],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number] | [number]; }[]; }'.
        Unmarked error at test line 121 'source: [$num],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number] | [string]; }[]; }'.
        Unmarked error at test line 130 'source: [$num],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [string] | [number, string]; }[]; }'.
        Unmarked error at test line 139 'source: [$num],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number] | [number, string]; }[]; }'.
        Unmarked error at test line 148 'source: [$num] as const,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [string]; }[]; }'.
        Unmarked error at test line 155 'source: [$num] as const,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [number, string]; }[]; }'.
        Unmarked error at test line 162 'source: [$num] as const,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [number, number]; }[]; }'.
        Unmarked error at test line 193 'source: [$num] as const,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [number, number] | [string]; }[]; }'.
        Unmarked error at test line 202 'source: [$num] as const,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [string] | [number, string]; }[]; }'.
        Unmarked error at test line 211 'source: [$num] as const,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [number, number] | [number, string]; }[]; }'.
        Unmarked error at test line 220 'source: {a:$num},'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AS; }[]; }'.
        Unmarked error at test line 228 'source: {a:$num},'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: ABN; }[]; }'.
        Unmarked error at test line 236 'source: {a:$num},'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB; }[]; }'.
        Unmarked error at test line 271 'source: {a:$num},'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AS | AB; }[]; }'.
        Unmarked error at test line 281 'source: {a:$num},'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AS | ABN; }[]; }'.
        Unmarked error at test line 291 'source: {a:$num},'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB | ABN; }[]; }'.
        Unmarked error at test line 301 'source: [$num],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [string]; }[]; }'.
        Unmarked error at test line 309 'source: [$num],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, string]; }[]; }'.
        Unmarked error at test line 317 'source: [$num],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number]; }[]; }'.
        Unmarked error at test line 325 'source: [$num],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [string] | [number]; }[]; }'.
        Unmarked error at test line 334 'source: [$num],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, string] | [number]; }[]; }'.
        Unmarked error at test line 343 'source: [$num],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number] | [number]; }[]; }'.
        Unmarked error at test line 352 'source: [$num],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number] | [string]; }[]; }'.
        Unmarked error at test line 362 'source: [$num],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [string] | [number, string]; }[]; }'.
        Unmarked error at test line 372 'source: [$num],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number] | [number, string]; }[]; }'.
        Unmarked error at test line 382 'source: [$num] as const,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [string]; }[]; }'.
        Unmarked error at test line 390 'source: [$num] as const,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [number, string]; }[]; }'.
        Unmarked error at test line 398 'source: [$num] as const,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [number, number]; }[]; }'.
        Unmarked error at test line 433 'source: [$num] as const,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [number, number] | [string]; }[]; }'.
        Unmarked error at test line 443 'source: [$num] as const,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [string] | [number, string]; }[]; }'.
        Unmarked error at test line 453 'source: [$num] as const,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [number, number] | [number, string]; }[]; }'.
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
        Unmarked error at test line 4 'source: {a:$num},'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS; }[]; }'.
        Unmarked error at test line 12 'source: {a:$num},'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: ABN; }[]; }'.
        Unmarked error at test line 47 'source: {a:$num},'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS | ABN; }[]; }'.
        Unmarked error at test line 66 'source: [$num],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS; }[]; }'.
        Unmarked error at test line 74 'source: [$num],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: ABN; }[]; }'.
        Unmarked error at test line 109 'source: [$num],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS | ABN; }[]; }'.
        Unmarked error at test line 128 'source: [$num] as const,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS; }[]; }'.
        Unmarked error at test line 136 'source: [$num] as const,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: ABN; }[]; }'.
        Unmarked error at test line 171 'source: [$num] as const,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS | ABN; }[]; }'.
        Unmarked error at test line 190 'source: {a:$num},'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS; }[]; }'.
        Unmarked error at test line 199 'source: {a:$num},'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: ABN; }[]; }'.
        Unmarked error at test line 238 'source: {a:$num},'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS | ABN; }[]; }'.
        Unmarked error at test line 259 'source: [$num],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS; }[]; }'.
        Unmarked error at test line 268 'source: [$num],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: ABN; }[]; }'.
        Unmarked error at test line 307 'source: [$num],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS | ABN; }[]; }'.
        Unmarked error at test line 328 'source: [$num] as const,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS; }[]; }'.
        Unmarked error at test line 337 'source: [$num] as const,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: ABN; }[]; }'.
        Unmarked error at test line 376 'source: [$num] as const,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS | ABN; }[]; }'.
        "
      `)
    })
  })
}
