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
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 38 'voidt,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 46 'voidt,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 60 'numStr,'
      Type 'EventCallable<string | number>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | number' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 76 'numStr,'
      Type 'EventCallable<string | number>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | number' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 93 'voidt,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 117 'strBool,'
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'string'.
            Type 'boolean' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 125 'numStr,'
      Type 'EventCallable<string | number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'string | number' is not assignable to type 'string'.
            Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 163 'voidt,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 171 'voidt,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 185 'numStr,'
      Type 'EventCallable<string | number>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | number' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 201 'numStr,'
      Type 'EventCallable<string | number>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | number' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 218 'voidt,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 242 'strBool,'
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'string'.
            Type 'boolean' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 250 'numStr,'
      Type 'EventCallable<string | number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'string | number' is not assignable to type 'string'.
            Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 293 'voidt,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 302 'voidt,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 318 'numStr,'
      Type 'EventCallable<string | number>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | number' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 336 'numStr,'
      Type 'EventCallable<string | number>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | number' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 381 'voidt,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 390 'voidt,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 406 'numStr,'
      Type 'EventCallable<string | number>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | number' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 424 'numStr,'
      Type 'EventCallable<string | number>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | number' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 443 'voidt,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 470 'strBool,'
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'string'.
            Type 'boolean' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 479 'numStr,'
      Type 'EventCallable<string | number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'string | number' is not assignable to type 'string'.
            Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 496 'voidt,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 523 'strBool,'
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'string'.
            Type 'boolean' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 532 'numStr,'
      Type 'EventCallable<string | number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'string | number' is not assignable to type 'string'.
            Type 'number' is not assignable to type 'string'.
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
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 42 'voidt,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 51 'voidt,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 67 'numStr,'
      Type 'EventCallable<string | number>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | number' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 85 'numStr,'
      Type 'EventCallable<string | number>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | number' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 104 'voidt,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 131 'strBool,'
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'string'.
            Type 'boolean' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 140 'numStr,'
      Type 'EventCallable<string | number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'string | number' is not assignable to type 'string'.
            Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 183 'voidt,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 192 'voidt,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 208 'numStr,'
      Type 'EventCallable<string | number>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | number' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 226 'numStr,'
      Type 'EventCallable<string | number>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | number' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 245 'voidt,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 272 'strBool,'
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'string'.
            Type 'boolean' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 281 'numStr,'
      Type 'EventCallable<string | number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'string | number' is not assignable to type 'string'.
            Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 329 'voidt,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 339 'voidt,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 357 'numStr,'
      Type 'EventCallable<string | number>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | number' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 377 'numStr,'
      Type 'EventCallable<string | number>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | number' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 398 'voidt,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 428 'strBool,'
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'string'.
            Type 'boolean' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 438 'numStr,'
      Type 'EventCallable<string | number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'string | number' is not assignable to type 'string'.
            Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 457 'voidt,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 487 'strBool,'
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'string'.
            Type 'boolean' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 497 'numStr,'
      Type 'EventCallable<string | number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'string | number' is not assignable to type 'string'.
            Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 516 'voidt,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 546 'strBool,'
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'string'.
            Type 'boolean' is not assignable to type 'string'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 556 'numStr,'
      Type 'EventCallable<string | number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'string | number' is not assignable to type 'string'.
            Type 'number' is not assignable to type 'string'.
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
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 42 'voidt,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 51 'voidt,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 67 'numStr,'
      Type 'EventCallable<string | number>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | number' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 85 'numStr,'
      Type 'EventCallable<string | number>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | number' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 130 'voidt,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 139 'voidt,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 155 'numStr,'
      Type 'EventCallable<string | number>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | number' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 173 'numStr,'
      Type 'EventCallable<string | number>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | number' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 223 'voidt,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 233 'voidt,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 251 'numStr,'
      Type 'EventCallable<string | number>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | number' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 271 'numStr,'
      Type 'EventCallable<string | number>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | number' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string | boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string | boolean' is not assignable to type 'number'.
            Type 'string' is not assignable to type 'number'.
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
