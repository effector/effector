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
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | boolean; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | boolean | void; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | void; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: string; targetType: number; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: string; targetType: number | void; }[]; }'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: number; targetType: string; }[]; }'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: number; targetType: string | boolean; }[]; }'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: number; targetType: string | boolean | void; }[]; }'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: number; targetType: string | void; }[]; }'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: string; targetType: number; }[]; }'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: string; targetType: number | void; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | boolean; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | boolean | void; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | void; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | boolean; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | boolean | void; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | void; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: string; targetType: number; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: string; targetType: number | void; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: string; targetType: number; }[]; }'.
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
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | boolean; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | boolean | void; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | void; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: number; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: number | void; }[]; }'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string; }[]; }'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | boolean; }[]; }'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | boolean | void; }[]; }'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | void; }[]; }'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: number; }[]; }'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: number | void; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | boolean; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | boolean | void; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | void; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: number; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: number | void; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: number; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: number | void; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: number; }[]; }'.
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
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | boolean; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | boolean | void; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | void; }[]; }'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string; }[]; }'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | boolean; }[]; }'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | boolean | void; }[]; }'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | void; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | boolean; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | boolean | void; }[]; }'.
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
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string] | [number]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number, string]; targetType: [number]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string] | [number]; }[]; }'.
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
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: AS; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: AS | ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [string]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [string] | [number]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number] | [number]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number] | [string]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [string] | [number, string]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number] | [number, string]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number, string]; targetType: [string]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number, string]; targetType: [number, number]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number, string]; targetType: [string] | [number]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number, string]; targetType: [number, number] | [number]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number, string]; targetType: [number, number] | [string]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: AS; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: AS | ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [string]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [string] | [number]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number] | [number]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number] | [string]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [string] | [number, string]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number] | [number, string]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number, string]; targetType: [string]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number, string]; targetType: [number, number]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number, string]; targetType: [string] | [number]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number, string]; targetType: [number, number] | [number]; }[]; }'.
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
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AB; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AB; }[]; }'.
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
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS | ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AS; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AN | AS; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AS | AB; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AS | ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AB | ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS | ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS | ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AS; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AN | AS; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AS | AB; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AS | ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AB | ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: ABN; }[]; }'.
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
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number]; }[]; }'.
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
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AS; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AS | AB; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AS | ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB | ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [string]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, string]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [string] | [number]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, string] | [number]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number] | [number]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number] | [string]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [string] | [number, string]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number] | [number, string]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [string]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [number, string]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [number, number]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [number, number] | [string]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [string] | [number, string]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [number, number] | [number, string]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AS; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AS | AB; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AS | ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB | ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [string]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, string]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [string] | [number]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, string] | [number]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number] | [number]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number] | [string]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [string] | [number, string]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number] | [number, string]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [string]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [number, string]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [number, number]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [number, number] | [string]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [string] | [number, string]; }[]; }'.
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
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS | ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS | ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS | ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS | ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS | ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS | ABN; }[]; }'.
        "
      `)
    })
  })
}
