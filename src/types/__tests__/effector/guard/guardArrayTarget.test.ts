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
        guard({filter: () => true, source:num, clock:num, target:[anyt]          })
        guard({filter: () => true, source:num, clock:str, target:[anyt]          })
        guard({filter: () => true, source:num, clock:num, target:[num]           })
        guard({filter: () => true, source:num, clock:str, target:[num]           })
        guard({filter: () => true, source:str, clock:num, target:[anyt]          })
        guard({filter: () => true, source:str, clock:num, target:[anyt,voidt]    })
        guard({filter: () => true, source:str, clock:num, target:[numStr]        })
        guard({filter: () => true, source:str, clock:num, target:[voidt]         })
        guard({filter: () => true, source:num, clock:num, target:[voidt]         })
        guard({filter: () => true, source:num, clock:num, target:[numStr,anyt]   })
        guard({filter: () => true, source:str, clock:str, target:[numStr,anyt]   })
        guard({filter: () => true, source:str, clock:str, target:[numStr,voidt]  })
        guard({filter: () => true, source:str, clock:str, target:[strBool,numStr]})
        guard({filter: () => true, source:str, clock:str, target:[strBool,anyt]  })
        guard({filter: () => true, source:str, clock:str, target:[strBool,voidt] })
        guard({filter: () => true, source:str, clock:str, target:[anyt,numStr]   })
        guard({filter: () => true, source:str, clock:str, target:[anyt,voidt]    })
        guard({filter: () => true, source:str, clock:str, target:[str,numStr]    })
        guard({filter: () => true, source:str, clock:str, target:[str,anyt]      })
        guard({filter: () => true, source:str, clock:str, target:[str,voidt]     })
        guard({filter: () => true, source:str, clock:str, target:[voidt,numStr]  })
        guard({filter: () => true, source:str, clock:str, target:[voidt,strBool] })
        guard({filter: () => true, source:str, clock:str, target:[voidt,anyt]    })
        guard({filter: () => true, source:str, clock:str, target:[numStr]        })
        guard({filter: () => true, source:str, clock:str, target:[strBool]       })
        guard({filter: () => true, source:str, clock:str, target:[anyt]          })
        guard({filter: () => true, source:str, clock:str, target:[str]           })
        guard({filter: () => true, source:str, clock:str, target:[voidt]         })
        guard({filter: () => true, source:num, clock:str, target:[voidt]         })
        guard({filter: () => true, source:str, clock:num, target:[str,anyt]      })
        guard({filter: () => true, source:str, clock:num, target:[strBool,voidt] })
        guard({filter: () => true, source:num, clock:str, target:[numStr,anyt]   })
        guard({filter: () => true, source:str, clock:num, target:[str,numStr]    })
        guard({filter: () => true, source:str, clock:num, target:[numStr,anyt]   })
        guard({filter: () => true, source:str, clock:num, target:[strBool]       })
        guard({filter: () => true, source:str, clock:num, target:[str]           })
        guard({filter: () => true, source:str, clock:num, target:[str,voidt]     })
        guard({filter: () => true, source:str, clock:num, target:[strBool,numStr]})
        guard({filter: () => true, source:num, clock:num, target:[num,anyt]      })
        guard({filter: () => true, source:num, clock:str, target:[num,anyt]      })
        guard({filter: () => true, source:str, clock:num, target:[numStr,voidt]  })
        guard({filter: () => true, source:num, clock:num, target:[voidt,numStr]  })
        guard({filter: () => true, source:num, clock:num, target:[voidt,anyt]    })
        guard({filter: () => true, source:str, clock:num, target:[voidt,numStr]  })
        guard({filter: () => true, source:num, clock:str, target:[voidt,anyt]    })
        guard({filter: () => true, source:num, clock:num, target:[num,numStr]    })
        guard({filter: () => true, source:num, clock:str, target:[voidt,numStr]  })
        guard({filter: () => true, source:num, clock:num, target:[num,voidt]     })
        guard({filter: () => true, source:num, clock:str, target:[num,voidt]     })
        guard({filter: () => true, source:num, clock:num, target:[numStr]        })
        guard({filter: () => true, source:str, clock:num, target:[anyt,numStr]   })
        guard({filter: () => true, source:str, clock:num, target:[voidt,strBool] })
        guard({filter: () => true, source:num, clock:num, target:[anyt,numStr]   })
        guard({filter: () => true, source:num, clock:str, target:[num,numStr]    })
        guard({filter: () => true, source:str, clock:num, target:[voidt,anyt]    })
        guard({filter: () => true, source:num, clock:num, target:[anyt,voidt]    })
        guard({filter: () => true, source:str, clock:num, target:[strBool,anyt]  })
        guard({filter: () => true, source:num, clock:str, target:[anyt,voidt]    })
        guard({filter: () => true, source:num, clock:str, target:[numStr]        })
        guard({filter: () => true, source:num, clock:num, target:[numStr,voidt]  })
        guard({filter: () => true, source:num, clock:str, target:[numStr,voidt]  })
        guard({filter: () => true, source:num, clock:str, target:[anyt,numStr]   })
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
        guard({filter: () => true, source:str, clock:num, target:[num,strBool]   })
        //@ts-expect-error
        guard({filter: () => true, source:str, clock:num, target:[num]           })
        //@ts-expect-error
        guard({filter: () => true, source:str, clock:str, target:[num]           })
        //@ts-expect-error
        guard({filter: () => true, source:num, clock:num, target:[str]           })
        //@ts-expect-error
        guard({filter: () => true, source:str, clock:num, target:[num,voidt]     })
        //@ts-expect-error
        guard({filter: () => true, source:str, clock:str, target:[num,numStr]    })
        //@ts-expect-error
        guard({filter: () => true, source:str, clock:str, target:[num,strBool]   })
        //@ts-expect-error
        guard({filter: () => true, source:str, clock:str, target:[num,anyt]      })
        //@ts-expect-error
        guard({filter: () => true, source:str, clock:str, target:[num,str]       })
        //@ts-expect-error
        guard({filter: () => true, source:str, clock:str, target:[num,voidt]     })
        //@ts-expect-error
        guard({filter: () => true, source:num, clock:str, target:[str]           })
        //@ts-expect-error
        guard({filter: () => true, source:str, clock:num, target:[num,str]       })
        //@ts-expect-error
        guard({filter: () => true, source:str, clock:num, target:[num,anyt]      })
        //@ts-expect-error
        guard({filter: () => true, source:num, clock:num, target:[num,str]       })
        //@ts-expect-error
        guard({filter: () => true, source:num, clock:str, target:[num,str]       })
        //@ts-expect-error
        guard({filter: () => true, source:str, clock:num, target:[num,numStr]    })
        //@ts-expect-error
        guard({filter: () => true, source:num, clock:num, target:[str,voidt]     })
        //@ts-expect-error
        guard({filter: () => true, source:num, clock:num, target:[strBool,voidt] })
        //@ts-expect-error
        guard({filter: () => true, source:num, clock:num, target:[num,strBool]   })
        //@ts-expect-error
        guard({filter: () => true, source:num, clock:num, target:[str,numStr]    })
        //@ts-expect-error
        guard({filter: () => true, source:num, clock:str, target:[str,numStr]    })
        //@ts-expect-error
        guard({filter: () => true, source:num, clock:str, target:[str,voidt]     })
        //@ts-expect-error
        guard({filter: () => true, source:num, clock:num, target:[strBool]       })
        //@ts-expect-error
        guard({filter: () => true, source:num, clock:str, target:[strBool]       })
        //@ts-expect-error
        guard({filter: () => true, source:num, clock:str, target:[num,strBool]   })
        //@ts-expect-error
        guard({filter: () => true, source:num, clock:num, target:[strBool,anyt]  })
        //@ts-expect-error
        guard({filter: () => true, source:num, clock:str, target:[strBool,voidt] })
        //@ts-expect-error
        guard({filter: () => true, source:num, clock:num, target:[voidt,strBool] })
        //@ts-expect-error
        guard({filter: () => true, source:num, clock:str, target:[strBool,anyt]  })
        //@ts-expect-error
        guard({filter: () => true, source:num, clock:num, target:[strBool,numStr]})
        //@ts-expect-error
        guard({filter: () => true, source:num, clock:num, target:[str,anyt]      })
        //@ts-expect-error
        guard({filter: () => true, source:num, clock:str, target:[str,anyt]      })
        //@ts-expect-error
        guard({filter: () => true, source:num, clock:str, target:[voidt,strBool] })
        //@ts-expect-error
        guard({filter: () => true, source:num, clock:str, target:[strBool,numStr]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<number>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<number>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<number>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<string>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<number>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<number>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<number>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<number>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<number>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<number>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<string>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<number>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<number>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<string>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<string>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<number>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<string>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<string>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<string>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<string>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<string>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<string>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<string | boolean>' is not assignable to type '\\"incompatible unit in target\\"'.
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
        guard({filter: () => true, source:{a:$num,b:$str}, target:[a_num]    })
        guard({filter: () => true, source:{a:$num,b:$str}, target:[a_num,ab] })
        guard({filter: () => true, source:{a:$num,b:$str}, target:[ab]       })
        guard({filter: () => true, source:{a:$num,b:$str}, clock:num, target:[a_num]    })
        guard({filter: () => true, source:{a:$num,b:$str}, clock:num, target:[a_num,ab] })
        guard({filter: () => true, source:{a:$num,b:$str}, clock:num, target:[ab]       })
        guard({filter: () => true, source:[$num,$str]    , target:[l_num_str]})
        guard({filter: () => true, source:[$num,$str]    , clock:num, target:[l_num_str]})
        guard({filter: () => true, source:[$num,$str]    , target:[l_num]               })
        guard({filter: () => true, source:[$num,$str]    , target:[l_num,l_num_str]     })
        guard({filter: () => true, source:[$num,$str]    , clock:num, target:[l_num]    })
        guard({filter: () => true, source:[$num,$str]    , clock:num, target:[l_num,l_num_str]})
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
        guard({filter: () => true, source:{a:$num,b:$str}, target:[abn]                })
        //@ts-expect-error
        guard({filter: () => true, source:{a:$num,b:$str}, target:[a_num,a_str]        })
        //@ts-expect-error
        guard({filter: () => true, source:{a:$num,b:$str}, target:[abn,a_str]          })
        //@ts-expect-error
        guard({filter: () => true, source:{a:$num,b:$str}, target:[a_str]              })
        //@ts-expect-error
        guard({filter: () => true, source:{a:$num,b:$str}, target:[a_num,abn]          })
        //@ts-expect-error
        guard({filter: () => true, source:{a:$num,b:$str}, target:[abn,ab]             })
        //@ts-expect-error
        guard({filter: () => true, source:{a:$num,b:$str}, target:[ab,a_str]           })
        //@ts-expect-error
        guard({filter: () => true, source:{a:$num,b:$str}, target:[a_str,ab]           })
        //@ts-expect-error
        guard({filter: () => true, source:{a:$num,b:$str}, clock:num, target:[abn]                })
        //@ts-expect-error
        guard({filter: () => true, source:{a:$num,b:$str}, clock:num, target:[abn,a_str]          })
        //@ts-expect-error
        guard({filter: () => true, source:{a:$num,b:$str}, clock:num, target:[ab,a_str]           })
        //@ts-expect-error
        guard({filter: () => true, source:{a:$num,b:$str}, clock:num, target:[a_str]              })
        //@ts-expect-error
        guard({filter: () => true, source:{a:$num,b:$str}, clock:num, target:[a_num,abn]          })
        //@ts-expect-error
        guard({filter: () => true, source:{a:$num,b:$str}, clock:num, target:[abn,ab]             })
        //@ts-expect-error
        guard({filter: () => true, source:{a:$num,b:$str}, clock:num, target:[a_str,ab]           })
        //@ts-expect-error
        guard({filter: () => true, source:{a:$num,b:$str}, clock:num, target:[a_num,a_str]        })
        //@ts-expect-error
        guard({filter: () => true, source:[$num,$str]    , target:[l_str]              })
        //@ts-expect-error
        guard({filter: () => true, source:[$num,$str]    , target:[l_num,l_str]        })
        //@ts-expect-error
        guard({filter: () => true, source:[$num,$str]    , target:[l_num_str,l_num_num]})
        //@ts-expect-error
        guard({filter: () => true, source:[$num,$str]    , target:[l_num,l_num_num]    })
        //@ts-expect-error
        guard({filter: () => true, source:[$num,$str]    , target:[l_num_str,l_str]    })
        //@ts-expect-error
        guard({filter: () => true, source:[$num,$str]    , target:[l_num_num,l_str]    })
        //@ts-expect-error
        guard({filter: () => true, source:[$num,$str]    , target:[l_num_num]          })
        //@ts-expect-error
        guard({filter: () => true, source:[$num,$str]    , target:[l_str,l_num_num]    })
        //@ts-expect-error
        guard({filter: () => true, source:[$num,$str]    , clock:num, target:[l_str]              })
        //@ts-expect-error
        guard({filter: () => true, source:[$num,$str]    , clock:num, target:[l_num,l_str]        })
        //@ts-expect-error
        guard({filter: () => true, source:[$num,$str]    , clock:num, target:[l_num,l_num_num]    })
        //@ts-expect-error
        guard({filter: () => true, source:[$num,$str]    , clock:num, target:[l_num_str,l_str]    })
        //@ts-expect-error
        guard({filter: () => true, source:[$num,$str]    , clock:num, target:[l_num_num,l_str]    })
        //@ts-expect-error
        guard({filter: () => true, source:[$num,$str]    , clock:num, target:[l_str,l_num_num]    })
        //@ts-expect-error
        guard({filter: () => true, source:[$num,$str]    , clock:num, target:[l_num_str,l_num_num]})
        //@ts-expect-error
        guard({filter: () => true, source:[$num,$str]    , clock:num, target:[l_num_num]          })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'EventCallable<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'EventCallable<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'EventCallable<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'EventCallable<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'EventCallable<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'EventCallable<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'EventCallable<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'EventCallable<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'EventCallable<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'EventCallable<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'EventCallable<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'EventCallable<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('source:same', () => {
    test('source:same (should pass)', () => {
      //prettier-ignore
      {
        guard({filter: () => true, source:{a:$num}, target:[a_num]})
        guard({filter: () => true, source:{a:$num}, clock:num, target:[a_num]})
        guard({filter: () => true, source:[$num]  , target:[l_num]})
        guard({filter: () => true, source:[$num]  , clock:num, target:[l_num]})
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
        guard({filter: () => true, source:{a:$num}, target:[a_str]              })
        //@ts-expect-error
        guard({filter: () => true, source:{a:$num}, target:[abn]                })
        //@ts-expect-error
        guard({filter: () => true, source:{a:$num}, target:[ab]                 })
        //@ts-expect-error
        guard({filter: () => true, source:{a:$num}, target:[a_num,a_str]        })
        //@ts-expect-error
        guard({filter: () => true, source:{a:$num}, target:[a_num,abn]          })
        //@ts-expect-error
        guard({filter: () => true, source:{a:$num}, target:[a_num,ab]           })
        //@ts-expect-error
        guard({filter: () => true, source:{a:$num}, target:[a_str,ab]           })
        //@ts-expect-error
        guard({filter: () => true, source:{a:$num}, target:[abn,a_str]          })
        //@ts-expect-error
        guard({filter: () => true, source:{a:$num}, target:[abn,ab]             })
        //@ts-expect-error
        guard({filter: () => true, source:{a:$num}, target:[ab,a_str]           })
        //@ts-expect-error
        guard({filter: () => true, source:{a:$num}, clock:num, target:[a_str]              })
        //@ts-expect-error
        guard({filter: () => true, source:{a:$num}, clock:num, target:[a_num,abn]          })
        //@ts-expect-error
        guard({filter: () => true, source:{a:$num}, clock:num, target:[abn,ab]             })
        //@ts-expect-error
        guard({filter: () => true, source:{a:$num}, clock:num, target:[abn,a_str]          })
        //@ts-expect-error
        guard({filter: () => true, source:{a:$num}, clock:num, target:[abn]                })
        //@ts-expect-error
        guard({filter: () => true, source:{a:$num}, clock:num, target:[ab,a_str]           })
        //@ts-expect-error
        guard({filter: () => true, source:{a:$num}, clock:num, target:[a_num,a_str]        })
        //@ts-expect-error
        guard({filter: () => true, source:{a:$num}, clock:num, target:[a_num,ab]           })
        //@ts-expect-error
        guard({filter: () => true, source:{a:$num}, clock:num, target:[ab]                 })
        //@ts-expect-error
        guard({filter: () => true, source:{a:$num}, clock:num, target:[a_str,ab]           })
        //@ts-expect-error
        guard({filter: () => true, source:[$num]  , target:[l_str]              })
        //@ts-expect-error
        guard({filter: () => true, source:[$num]  , target:[l_num_str]          })
        //@ts-expect-error
        guard({filter: () => true, source:[$num]  , target:[l_num_num]          })
        //@ts-expect-error
        guard({filter: () => true, source:[$num]  , target:[l_num,l_str]        })
        //@ts-expect-error
        guard({filter: () => true, source:[$num]  , target:[l_num,l_num_str]    })
        //@ts-expect-error
        guard({filter: () => true, source:[$num]  , target:[l_num,l_num_num]    })
        //@ts-expect-error
        guard({filter: () => true, source:[$num]  , target:[l_str,l_num_num]    })
        //@ts-expect-error
        guard({filter: () => true, source:[$num]  , target:[l_num_str,l_str]    })
        //@ts-expect-error
        guard({filter: () => true, source:[$num]  , target:[l_num_str,l_num_num]})
        //@ts-expect-error
        guard({filter: () => true, source:[$num]  , target:[l_num_num,l_str]    })
        //@ts-expect-error
        guard({filter: () => true, source:[$num]  , clock:num, target:[l_str]              })
        //@ts-expect-error
        guard({filter: () => true, source:[$num]  , clock:num, target:[l_num_str]          })
        //@ts-expect-error
        guard({filter: () => true, source:[$num]  , clock:num, target:[l_num_num]          })
        //@ts-expect-error
        guard({filter: () => true, source:[$num]  , clock:num, target:[l_num,l_str]        })
        //@ts-expect-error
        guard({filter: () => true, source:[$num]  , clock:num, target:[l_num,l_num_str]    })
        //@ts-expect-error
        guard({filter: () => true, source:[$num]  , clock:num, target:[l_num,l_num_num]    })
        //@ts-expect-error
        guard({filter: () => true, source:[$num]  , clock:num, target:[l_str,l_num_num]    })
        //@ts-expect-error
        guard({filter: () => true, source:[$num]  , clock:num, target:[l_num_str,l_str]    })
        //@ts-expect-error
        guard({filter: () => true, source:[$num]  , clock:num, target:[l_num_str,l_num_num]})
        //@ts-expect-error
        guard({filter: () => true, source:[$num]  , clock:num, target:[l_num_num,l_str]    })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'EventCallable<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'EventCallable<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'EventCallable<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'EventCallable<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'EventCallable<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'EventCallable<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'EventCallable<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'EventCallable<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'EventCallable<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'EventCallable<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'EventCallable<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'EventCallable<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'EventCallable<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'EventCallable<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'EventCallable<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<AS>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'EventCallable<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[number, string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[number, string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'EventCallable<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'EventCallable<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[number, string]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'EventCallable<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[number, string]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'EventCallable<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[number, string]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'EventCallable<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[number, string]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'EventCallable<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'EventCallable<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'EventCallable<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[number, string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[number, string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'EventCallable<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'EventCallable<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[number, string]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'EventCallable<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[number, string]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'EventCallable<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[number, string]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'EventCallable<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[number, string]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'EventCallable<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'EventCallable<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'EventCallable<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
              Type 'EventCallable<[string]>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
})
