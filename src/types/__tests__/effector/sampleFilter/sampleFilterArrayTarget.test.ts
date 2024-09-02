/* eslint-disable no-unused-vars */
import {createStore, createEvent, sample} from 'effector'
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
        sample({filter: () => true, source:num, clock:num, target:[anyt]          })
        sample({filter: () => true, source:num, clock:str, target:[anyt]          })
        sample({filter: () => true, source:num, clock:num, target:[num]           })
        sample({filter: () => true, source:num, clock:str, target:[num]           })
        sample({filter: () => true, source:str, clock:num, target:[anyt]          })
        sample({filter: () => true, source:str, clock:num, target:[anyt,voidt]    })
        sample({filter: () => true, source:str, clock:num, target:[numStr]        })
        sample({filter: () => true, source:str, clock:num, target:[voidt]         })
        sample({filter: () => true, source:num, clock:num, target:[voidt]         })
        sample({filter: () => true, source:num, clock:num, target:[numStr,anyt]   })
        sample({filter: () => true, source:str, clock:str, target:[numStr,anyt]   })
        sample({filter: () => true, source:str, clock:str, target:[numStr,voidt]  })
        sample({filter: () => true, source:str, clock:str, target:[strBool,numStr]})
        sample({filter: () => true, source:str, clock:str, target:[strBool,anyt]  })
        sample({filter: () => true, source:str, clock:str, target:[strBool,voidt] })
        sample({filter: () => true, source:str, clock:str, target:[anyt,numStr]   })
        sample({filter: () => true, source:str, clock:str, target:[anyt,voidt]    })
        sample({filter: () => true, source:str, clock:str, target:[str,numStr]    })
        sample({filter: () => true, source:str, clock:str, target:[str,anyt]      })
        sample({filter: () => true, source:str, clock:str, target:[str,voidt]     })
        sample({filter: () => true, source:str, clock:str, target:[voidt,numStr]  })
        sample({filter: () => true, source:str, clock:str, target:[voidt,strBool] })
        sample({filter: () => true, source:str, clock:str, target:[voidt,anyt]    })
        sample({filter: () => true, source:str, clock:str, target:[numStr]        })
        sample({filter: () => true, source:str, clock:str, target:[strBool]       })
        sample({filter: () => true, source:str, clock:str, target:[anyt]          })
        sample({filter: () => true, source:str, clock:str, target:[str]           })
        sample({filter: () => true, source:str, clock:str, target:[voidt]         })
        sample({filter: () => true, source:num, clock:str, target:[voidt]         })
        sample({filter: () => true, source:str, clock:num, target:[str,anyt]      })
        sample({filter: () => true, source:str, clock:num, target:[strBool,voidt] })
        sample({filter: () => true, source:num, clock:str, target:[numStr,anyt]   })
        sample({filter: () => true, source:str, clock:num, target:[str,numStr]    })
        sample({filter: () => true, source:str, clock:num, target:[numStr,anyt]   })
        sample({filter: () => true, source:str, clock:num, target:[strBool]       })
        sample({filter: () => true, source:str, clock:num, target:[str]           })
        sample({filter: () => true, source:str, clock:num, target:[str,voidt]     })
        sample({filter: () => true, source:str, clock:num, target:[strBool,numStr]})
        sample({filter: () => true, source:num, clock:num, target:[num,anyt]      })
        sample({filter: () => true, source:num, clock:str, target:[num,anyt]      })
        sample({filter: () => true, source:str, clock:num, target:[numStr,voidt]  })
        sample({filter: () => true, source:num, clock:num, target:[voidt,numStr]  })
        sample({filter: () => true, source:num, clock:num, target:[voidt,anyt]    })
        sample({filter: () => true, source:str, clock:num, target:[voidt,numStr]  })
        sample({filter: () => true, source:num, clock:str, target:[voidt,anyt]    })
        sample({filter: () => true, source:num, clock:num, target:[num,numStr]    })
        sample({filter: () => true, source:num, clock:str, target:[voidt,numStr]  })
        sample({filter: () => true, source:num, clock:num, target:[num,voidt]     })
        sample({filter: () => true, source:num, clock:str, target:[num,voidt]     })
        sample({filter: () => true, source:num, clock:num, target:[numStr]        })
        sample({filter: () => true, source:str, clock:num, target:[anyt,numStr]   })
        sample({filter: () => true, source:str, clock:num, target:[voidt,strBool] })
        sample({filter: () => true, source:num, clock:num, target:[anyt,numStr]   })
        sample({filter: () => true, source:num, clock:str, target:[num,numStr]    })
        sample({filter: () => true, source:str, clock:num, target:[voidt,anyt]    })
        sample({filter: () => true, source:num, clock:num, target:[anyt,voidt]    })
        sample({filter: () => true, source:str, clock:num, target:[strBool,anyt]  })
        sample({filter: () => true, source:num, clock:str, target:[anyt,voidt]    })
        sample({filter: () => true, source:num, clock:str, target:[numStr]        })
        sample({filter: () => true, source:num, clock:num, target:[numStr,voidt]  })
        sample({filter: () => true, source:num, clock:str, target:[numStr,voidt]  })
        sample({filter: () => true, source:num, clock:str, target:[anyt,numStr]   })
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
        sample({filter: () => true, source:str, clock:num, target:[num,strBool]   })
        //@ts-expect-error
        sample({filter: () => true, source:str, clock:num, target:[num]           })
        //@ts-expect-error
        sample({filter: () => true, source:str, clock:str, target:[num]           })
        //@ts-expect-error
        sample({filter: () => true, source:num, clock:num, target:[str]           })
        //@ts-expect-error
        sample({filter: () => true, source:str, clock:num, target:[num,voidt]     })
        //@ts-expect-error
        sample({filter: () => true, source:str, clock:str, target:[num,numStr]    })
        //@ts-expect-error
        sample({filter: () => true, source:str, clock:str, target:[num,strBool]   })
        //@ts-expect-error
        sample({filter: () => true, source:str, clock:str, target:[num,anyt]      })
        //@ts-expect-error
        sample({filter: () => true, source:str, clock:str, target:[num,str]       })
        //@ts-expect-error
        sample({filter: () => true, source:str, clock:str, target:[num,voidt]     })
        //@ts-expect-error
        sample({filter: () => true, source:num, clock:str, target:[str]           })
        //@ts-expect-error
        sample({filter: () => true, source:str, clock:num, target:[num,str]       })
        //@ts-expect-error
        sample({filter: () => true, source:str, clock:num, target:[num,anyt]      })
        //@ts-expect-error
        sample({filter: () => true, source:num, clock:num, target:[num,str]       })
        //@ts-expect-error
        sample({filter: () => true, source:num, clock:str, target:[num,str]       })
        //@ts-expect-error
        sample({filter: () => true, source:str, clock:num, target:[num,numStr]    })
        //@ts-expect-error
        sample({filter: () => true, source:num, clock:num, target:[str,voidt]     })
        //@ts-expect-error
        sample({filter: () => true, source:num, clock:num, target:[strBool,voidt] })
        //@ts-expect-error
        sample({filter: () => true, source:num, clock:num, target:[num,strBool]   })
        //@ts-expect-error
        sample({filter: () => true, source:num, clock:num, target:[str,numStr]    })
        //@ts-expect-error
        sample({filter: () => true, source:num, clock:str, target:[str,numStr]    })
        //@ts-expect-error
        sample({filter: () => true, source:num, clock:str, target:[str,voidt]     })
        //@ts-expect-error
        sample({filter: () => true, source:num, clock:num, target:[strBool]       })
        //@ts-expect-error
        sample({filter: () => true, source:num, clock:str, target:[strBool]       })
        //@ts-expect-error
        sample({filter: () => true, source:num, clock:str, target:[num,strBool]   })
        //@ts-expect-error
        sample({filter: () => true, source:num, clock:num, target:[strBool,anyt]  })
        //@ts-expect-error
        sample({filter: () => true, source:num, clock:str, target:[strBool,voidt] })
        //@ts-expect-error
        sample({filter: () => true, source:num, clock:num, target:[voidt,strBool] })
        //@ts-expect-error
        sample({filter: () => true, source:num, clock:str, target:[strBool,anyt]  })
        //@ts-expect-error
        sample({filter: () => true, source:num, clock:num, target:[strBool,numStr]})
        //@ts-expect-error
        sample({filter: () => true, source:num, clock:num, target:[str,anyt]      })
        //@ts-expect-error
        sample({filter: () => true, source:num, clock:str, target:[str,anyt]      })
        //@ts-expect-error
        sample({filter: () => true, source:num, clock:str, target:[voidt,strBool] })
        //@ts-expect-error
        sample({filter: () => true, source:num, clock:str, target:[strBool,numStr]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        lack of expected error at test line 4 'sample({filter: () => true, source:str, clock:num, target:[num,strBool]   })'
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: string; targetType: number; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: string; targetType: number; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: string; targetType: number | void; }[]; }'.
        lack of expected error at test line 14 'sample({filter: () => true, source:str, clock:str, target:[num,numStr]    })'
        lack of expected error at test line 16 'sample({filter: () => true, source:str, clock:str, target:[num,strBool]   })'
        lack of expected error at test line 18 'sample({filter: () => true, source:str, clock:str, target:[num,anyt]      })'
        lack of expected error at test line 20 'sample({filter: () => true, source:str, clock:str, target:[num,str]       })'
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: string; targetType: number | void; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string; }[]; }'.
        lack of expected error at test line 26 'sample({filter: () => true, source:str, clock:num, target:[num,str]       })'
        lack of expected error at test line 28 'sample({filter: () => true, source:str, clock:num, target:[num,anyt]      })'
        lack of expected error at test line 30 'sample({filter: () => true, source:num, clock:num, target:[num,str]       })'
        lack of expected error at test line 32 'sample({filter: () => true, source:num, clock:str, target:[num,str]       })'
        lack of expected error at test line 34 'sample({filter: () => true, source:str, clock:num, target:[num,numStr]    })'
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | void; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | boolean | void; }[]; }'.
        lack of expected error at test line 40 'sample({filter: () => true, source:num, clock:num, target:[num,strBool]   })'
        lack of expected error at test line 42 'sample({filter: () => true, source:num, clock:num, target:[str,numStr]    })'
        lack of expected error at test line 44 'sample({filter: () => true, source:num, clock:str, target:[str,numStr]    })'
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | void; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | boolean; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | boolean; }[]; }'.
        lack of expected error at test line 52 'sample({filter: () => true, source:num, clock:str, target:[num,strBool]   })'
        lack of expected error at test line 54 'sample({filter: () => true, source:num, clock:num, target:[strBool,anyt]  })'
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | boolean | void; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | boolean | void; }[]; }'.
        lack of expected error at test line 60 'sample({filter: () => true, source:num, clock:str, target:[strBool,anyt]  })'
        lack of expected error at test line 62 'sample({filter: () => true, source:num, clock:num, target:[strBool,numStr]})'
        lack of expected error at test line 64 'sample({filter: () => true, source:num, clock:num, target:[str,anyt]      })'
        lack of expected error at test line 66 'sample({filter: () => true, source:num, clock:str, target:[str,anyt]      })'
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | boolean | void; }[]; }'.
        lack of expected error at test line 70 'sample({filter: () => true, source:num, clock:str, target:[strBool,numStr]})'
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
        sample({filter: () => true, source:{a:$num,b:$str}, target:[a_num]    })
        sample({filter: () => true, source:{a:$num,b:$str}, target:[a_num,ab] })
        sample({filter: () => true, source:{a:$num,b:$str}, target:[ab]       })
        sample({filter: () => true, source:{a:$num,b:$str}, clock:num, target:[a_num]    })
        sample({filter: () => true, source:{a:$num,b:$str}, clock:num, target:[a_num,ab] })
        sample({filter: () => true, source:{a:$num,b:$str}, clock:num, target:[ab]       })
        sample({filter: () => true, source:[$num,$str]    , target:[l_num_str]})
        sample({filter: () => true, source:[$num,$str]    , clock:num, target:[l_num_str]})
        sample({filter: () => true, source:[$num,$str]    , target:[l_num]               })
        sample({filter: () => true, source:[$num,$str]    , target:[l_num,l_num_str]     })
        sample({filter: () => true, source:[$num,$str]    , clock:num, target:[l_num]    })
        sample({filter: () => true, source:[$num,$str]    , clock:num, target:[l_num,l_num_str]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 9 'sample({filter: () => true, source:[$num,$str]    , target:[l_num_str]})'
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string]; }[]; }'.
        Unmarked error at test line 10 'sample({filter: () => true, source:[$num,$str]    , clock:num, target:[l_num_str]})'
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string]; }[]; }'.
        Unmarked error at test line 11 'sample({filter: () => true, source:[$num,$str]    , target:[l_num]               })'
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number]; }[]; }'.
        Unmarked error at test line 12 'sample({filter: () => true, source:[$num,$str]    , target:[l_num,l_num_str]     })'
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string] | [number]; }[]; }'.
        Unmarked error at test line 13 'sample({filter: () => true, source:[$num,$str]    , clock:num, target:[l_num]    })'
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number]; }[]; }'.
        Unmarked error at test line 14 'sample({filter: () => true, source:[$num,$str]    , clock:num, target:[l_num,l_num_str]})'
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string] | [number]; }[]; }'.
        "
      `)
    })
    test('source:wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({filter: () => true, source:{a:$num,b:$str}, target:[abn]                })
        //@ts-expect-error
        sample({filter: () => true, source:{a:$num,b:$str}, target:[a_num,a_str]        })
        //@ts-expect-error
        sample({filter: () => true, source:{a:$num,b:$str}, target:[abn,a_str]          })
        //@ts-expect-error
        sample({filter: () => true, source:{a:$num,b:$str}, target:[a_str]              })
        //@ts-expect-error
        sample({filter: () => true, source:{a:$num,b:$str}, target:[a_num,abn]          })
        //@ts-expect-error
        sample({filter: () => true, source:{a:$num,b:$str}, target:[abn,ab]             })
        //@ts-expect-error
        sample({filter: () => true, source:{a:$num,b:$str}, target:[ab,a_str]           })
        //@ts-expect-error
        sample({filter: () => true, source:{a:$num,b:$str}, target:[a_str,ab]           })
        //@ts-expect-error
        sample({filter: () => true, source:{a:$num,b:$str}, clock:num, target:[abn]                })
        //@ts-expect-error
        sample({filter: () => true, source:{a:$num,b:$str}, clock:num, target:[abn,a_str]          })
        //@ts-expect-error
        sample({filter: () => true, source:{a:$num,b:$str}, clock:num, target:[ab,a_str]           })
        //@ts-expect-error
        sample({filter: () => true, source:{a:$num,b:$str}, clock:num, target:[a_str]              })
        //@ts-expect-error
        sample({filter: () => true, source:{a:$num,b:$str}, clock:num, target:[a_num,abn]          })
        //@ts-expect-error
        sample({filter: () => true, source:{a:$num,b:$str}, clock:num, target:[abn,ab]             })
        //@ts-expect-error
        sample({filter: () => true, source:{a:$num,b:$str}, clock:num, target:[a_str,ab]           })
        //@ts-expect-error
        sample({filter: () => true, source:{a:$num,b:$str}, clock:num, target:[a_num,a_str]        })
        //@ts-expect-error
        sample({filter: () => true, source:[$num,$str]    , target:[l_str]              })
        //@ts-expect-error
        sample({filter: () => true, source:[$num,$str]    , target:[l_num,l_str]        })
        //@ts-expect-error
        sample({filter: () => true, source:[$num,$str]    , target:[l_num_str,l_num_num]})
        //@ts-expect-error
        sample({filter: () => true, source:[$num,$str]    , target:[l_num,l_num_num]    })
        //@ts-expect-error
        sample({filter: () => true, source:[$num,$str]    , target:[l_num_str,l_str]    })
        //@ts-expect-error
        sample({filter: () => true, source:[$num,$str]    , target:[l_num_num,l_str]    })
        //@ts-expect-error
        sample({filter: () => true, source:[$num,$str]    , target:[l_num_num]          })
        //@ts-expect-error
        sample({filter: () => true, source:[$num,$str]    , target:[l_str,l_num_num]    })
        //@ts-expect-error
        sample({filter: () => true, source:[$num,$str]    , clock:num, target:[l_str]              })
        //@ts-expect-error
        sample({filter: () => true, source:[$num,$str]    , clock:num, target:[l_num,l_str]        })
        //@ts-expect-error
        sample({filter: () => true, source:[$num,$str]    , clock:num, target:[l_num,l_num_num]    })
        //@ts-expect-error
        sample({filter: () => true, source:[$num,$str]    , clock:num, target:[l_num_str,l_str]    })
        //@ts-expect-error
        sample({filter: () => true, source:[$num,$str]    , clock:num, target:[l_num_num,l_str]    })
        //@ts-expect-error
        sample({filter: () => true, source:[$num,$str]    , clock:num, target:[l_str,l_num_num]    })
        //@ts-expect-error
        sample({filter: () => true, source:[$num,$str]    , clock:num, target:[l_num_str,l_num_num]})
        //@ts-expect-error
        sample({filter: () => true, source:[$num,$str]    , clock:num, target:[l_num_num]          })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }[]; }'.
        lack of expected error at test line 6 'sample({filter: () => true, source:{a:$num,b:$str}, target:[a_num,a_str]        })'
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: AS | ABN; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: AS; }[]; }'.
        lack of expected error at test line 12 'sample({filter: () => true, source:{a:$num,b:$str}, target:[a_num,abn]          })'
        lack of expected error at test line 14 'sample({filter: () => true, source:{a:$num,b:$str}, target:[abn,ab]             })'
        lack of expected error at test line 16 'sample({filter: () => true, source:{a:$num,b:$str}, target:[ab,a_str]           })'
        lack of expected error at test line 18 'sample({filter: () => true, source:{a:$num,b:$str}, target:[a_str,ab]           })'
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: AS | ABN; }[]; }'.
        lack of expected error at test line 24 'sample({filter: () => true, source:{a:$num,b:$str}, clock:num, target:[ab,a_str]           })'
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: AS; }[]; }'.
        lack of expected error at test line 28 'sample({filter: () => true, source:{a:$num,b:$str}, clock:num, target:[a_num,abn]          })'
        lack of expected error at test line 30 'sample({filter: () => true, source:{a:$num,b:$str}, clock:num, target:[abn,ab]             })'
        lack of expected error at test line 32 'sample({filter: () => true, source:{a:$num,b:$str}, clock:num, target:[a_str,ab]           })'
        lack of expected error at test line 34 'sample({filter: () => true, source:{a:$num,b:$str}, clock:num, target:[a_num,a_str]        })'
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [string]; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [string] | [number]; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number] | [number, string]; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number] | [number]; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [string] | [number, string]; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number] | [string]; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number]; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number] | [string]; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [string]; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [string] | [number]; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number] | [number]; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [string] | [number, string]; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number] | [string]; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number] | [string]; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number] | [number, string]; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number]; }[]; }'.
        "
      `)
    })
  })
  describe('source:same', () => {
    test('source:same (should pass)', () => {
      //prettier-ignore
      {
        sample({filter: () => true, source:{a:$num}, target:[a_num]})
        sample({filter: () => true, source:{a:$num}, clock:num, target:[a_num]})
        sample({filter: () => true, source:[$num]  , target:[l_num]})
        sample({filter: () => true, source:[$num]  , clock:num, target:[l_num]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 5 'sample({filter: () => true, source:[$num]  , target:[l_num]})'
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number]; }[]; }'.
        Unmarked error at test line 6 'sample({filter: () => true, source:[$num]  , clock:num, target:[l_num]})'
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number]; }[]; }'.
        "
      `)
    })
    test('source:same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({filter: () => true, source:{a:$num}, target:[a_str]              })
        //@ts-expect-error
        sample({filter: () => true, source:{a:$num}, target:[abn]                })
        //@ts-expect-error
        sample({filter: () => true, source:{a:$num}, target:[ab]                 })
        //@ts-expect-error
        sample({filter: () => true, source:{a:$num}, target:[a_num,a_str]        })
        //@ts-expect-error
        sample({filter: () => true, source:{a:$num}, target:[a_num,abn]          })
        //@ts-expect-error
        sample({filter: () => true, source:{a:$num}, target:[a_num,ab]           })
        //@ts-expect-error
        sample({filter: () => true, source:{a:$num}, target:[a_str,ab]           })
        //@ts-expect-error
        sample({filter: () => true, source:{a:$num}, target:[abn,a_str]          })
        //@ts-expect-error
        sample({filter: () => true, source:{a:$num}, target:[abn,ab]             })
        //@ts-expect-error
        sample({filter: () => true, source:{a:$num}, target:[ab,a_str]           })
        //@ts-expect-error
        sample({filter: () => true, source:{a:$num}, clock:num, target:[a_str]              })
        //@ts-expect-error
        sample({filter: () => true, source:{a:$num}, clock:num, target:[a_num,abn]          })
        //@ts-expect-error
        sample({filter: () => true, source:{a:$num}, clock:num, target:[abn,ab]             })
        //@ts-expect-error
        sample({filter: () => true, source:{a:$num}, clock:num, target:[abn,a_str]          })
        //@ts-expect-error
        sample({filter: () => true, source:{a:$num}, clock:num, target:[abn]                })
        //@ts-expect-error
        sample({filter: () => true, source:{a:$num}, clock:num, target:[ab,a_str]           })
        //@ts-expect-error
        sample({filter: () => true, source:{a:$num}, clock:num, target:[a_num,a_str]        })
        //@ts-expect-error
        sample({filter: () => true, source:{a:$num}, clock:num, target:[a_num,ab]           })
        //@ts-expect-error
        sample({filter: () => true, source:{a:$num}, clock:num, target:[ab]                 })
        //@ts-expect-error
        sample({filter: () => true, source:{a:$num}, clock:num, target:[a_str,ab]           })
        //@ts-expect-error
        sample({filter: () => true, source:[$num]  , target:[l_str]              })
        //@ts-expect-error
        sample({filter: () => true, source:[$num]  , target:[l_num_str]          })
        //@ts-expect-error
        sample({filter: () => true, source:[$num]  , target:[l_num_num]          })
        //@ts-expect-error
        sample({filter: () => true, source:[$num]  , target:[l_num,l_str]        })
        //@ts-expect-error
        sample({filter: () => true, source:[$num]  , target:[l_num,l_num_str]    })
        //@ts-expect-error
        sample({filter: () => true, source:[$num]  , target:[l_num,l_num_num]    })
        //@ts-expect-error
        sample({filter: () => true, source:[$num]  , target:[l_str,l_num_num]    })
        //@ts-expect-error
        sample({filter: () => true, source:[$num]  , target:[l_num_str,l_str]    })
        //@ts-expect-error
        sample({filter: () => true, source:[$num]  , target:[l_num_str,l_num_num]})
        //@ts-expect-error
        sample({filter: () => true, source:[$num]  , target:[l_num_num,l_str]    })
        //@ts-expect-error
        sample({filter: () => true, source:[$num]  , clock:num, target:[l_str]              })
        //@ts-expect-error
        sample({filter: () => true, source:[$num]  , clock:num, target:[l_num_str]          })
        //@ts-expect-error
        sample({filter: () => true, source:[$num]  , clock:num, target:[l_num_num]          })
        //@ts-expect-error
        sample({filter: () => true, source:[$num]  , clock:num, target:[l_num,l_str]        })
        //@ts-expect-error
        sample({filter: () => true, source:[$num]  , clock:num, target:[l_num,l_num_str]    })
        //@ts-expect-error
        sample({filter: () => true, source:[$num]  , clock:num, target:[l_num,l_num_num]    })
        //@ts-expect-error
        sample({filter: () => true, source:[$num]  , clock:num, target:[l_str,l_num_num]    })
        //@ts-expect-error
        sample({filter: () => true, source:[$num]  , clock:num, target:[l_num_str,l_str]    })
        //@ts-expect-error
        sample({filter: () => true, source:[$num]  , clock:num, target:[l_num_str,l_num_num]})
        //@ts-expect-error
        sample({filter: () => true, source:[$num]  , clock:num, target:[l_num_num,l_str]    })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AS; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: ABN; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB; }[]; }'.
        lack of expected error at test line 10 'sample({filter: () => true, source:{a:$num}, target:[a_num,a_str]        })'
        lack of expected error at test line 12 'sample({filter: () => true, source:{a:$num}, target:[a_num,abn]          })'
        lack of expected error at test line 14 'sample({filter: () => true, source:{a:$num}, target:[a_num,ab]           })'
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AS | AB; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AS | ABN; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB | ABN; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AS | AB; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AS; }[]; }'.
        lack of expected error at test line 26 'sample({filter: () => true, source:{a:$num}, clock:num, target:[a_num,abn]          })'
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB | ABN; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AS | ABN; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: ABN; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AS | AB; }[]; }'.
        lack of expected error at test line 36 'sample({filter: () => true, source:{a:$num}, clock:num, target:[a_num,a_str]        })'
        lack of expected error at test line 38 'sample({filter: () => true, source:{a:$num}, clock:num, target:[a_num,ab]           })'
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AS | AB; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [string]; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, string]; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number]; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [string] | [number]; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, string] | [number]; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number] | [number]; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number] | [string]; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [string] | [number, string]; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number] | [number, string]; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number] | [string]; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [string]; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, string]; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number]; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [string] | [number]; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, string] | [number]; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number] | [number]; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number] | [string]; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [string] | [number, string]; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number] | [number, string]; }[]; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number] | [string]; }[]; }'.
        "
      `)
    })
  })
})
