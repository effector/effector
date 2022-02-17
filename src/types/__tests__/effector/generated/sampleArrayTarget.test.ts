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
        //@ts-expect-error
        sample({source:num, target:[str]           })
        //@ts-expect-error
        sample({source:num, target:[strBool]       })
        //@ts-expect-error
        sample({source:num, target:[num,str]       })
        //@ts-expect-error
        sample({source:num, target:[num,strBool]   })
        //@ts-expect-error
        sample({source:num, target:[strBool,voidt] })
        //@ts-expect-error
        sample({source:num, target:[str,voidt]     })
        //@ts-expect-error
        sample({source:num, target:[anyt,str]      })
        //@ts-expect-error
        sample({source:num, target:[numStr,str]    })
        //@ts-expect-error
        sample({source:num, target:[anyt,strBool]  })
        //@ts-expect-error
        sample({source:num, target:[numStr,strBool]})
        //@ts-expect-error
        sample({source:str, target:[num]           })
        //@ts-expect-error
        sample({source:str, target:[num,voidt]     })
        //@ts-expect-error
        sample({source:str, target:[num,str]       })
        //@ts-expect-error
        sample({source:str, target:[anyt,num]      })
        //@ts-expect-error
        sample({source:str, target:[num,strBool]   })
        //@ts-expect-error
        sample({source:str, target:[num,numStr]    })
        //@ts-expect-error
        sample({clock:num, target:[str]           })
        //@ts-expect-error
        sample({clock:num, target:[strBool]       })
        //@ts-expect-error
        sample({clock:num, target:[num,str]       })
        //@ts-expect-error
        sample({clock:num, target:[num,strBool]   })
        //@ts-expect-error
        sample({clock:num, target:[strBool,voidt] })
        //@ts-expect-error
        sample({clock:num, target:[str,voidt]     })
        //@ts-expect-error
        sample({clock:num, target:[anyt,str]      })
        //@ts-expect-error
        sample({clock:num, target:[numStr,str]    })
        //@ts-expect-error
        sample({clock:num, target:[anyt,strBool]  })
        //@ts-expect-error
        sample({clock:num, target:[numStr,strBool]})
        //@ts-expect-error
        sample({clock:str, target:[num]           })
        //@ts-expect-error
        sample({clock:str, target:[num,voidt]     })
        //@ts-expect-error
        sample({clock:str, target:[num,str]       })
        //@ts-expect-error
        sample({clock:str, target:[anyt,num]      })
        //@ts-expect-error
        sample({clock:str, target:[num,strBool]   })
        //@ts-expect-error
        sample({clock:str, target:[num,numStr]    })
        //@ts-expect-error
        sample({source:num, clock:num, target:[str]           })
        //@ts-expect-error
        sample({source:num, clock:num, target:[strBool]       })
        //@ts-expect-error
        sample({source:num, clock:num, target:[num,str]       })
        //@ts-expect-error
        sample({source:num, clock:num, target:[num,strBool]   })
        //@ts-expect-error
        sample({source:num, clock:num, target:[strBool,voidt] })
        //@ts-expect-error
        sample({source:num, clock:num, target:[str,voidt]     })
        //@ts-expect-error
        sample({source:num, clock:num, target:[anyt,str]      })
        //@ts-expect-error
        sample({source:num, clock:num, target:[numStr,str]    })
        //@ts-expect-error
        sample({source:num, clock:num, target:[anyt,strBool]  })
        //@ts-expect-error
        sample({source:num, clock:num, target:[numStr,strBool]})
        //@ts-expect-error
        sample({source:num, clock:str, target:[str]           })
        //@ts-expect-error
        sample({source:num, clock:str, target:[strBool]       })
        //@ts-expect-error
        sample({source:num, clock:str, target:[num,str]       })
        //@ts-expect-error
        sample({source:num, clock:str, target:[num,strBool]   })
        //@ts-expect-error
        sample({source:num, clock:str, target:[strBool,voidt] })
        //@ts-expect-error
        sample({source:num, clock:str, target:[str,voidt]     })
        //@ts-expect-error
        sample({source:num, clock:str, target:[anyt,str]      })
        //@ts-expect-error
        sample({source:num, clock:str, target:[numStr,str]    })
        //@ts-expect-error
        sample({source:num, clock:str, target:[anyt,strBool]  })
        //@ts-expect-error
        sample({source:num, clock:str, target:[numStr,strBool]})
        //@ts-expect-error
        sample({source:str, clock:num, target:[num]           })
        //@ts-expect-error
        sample({source:str, clock:num, target:[num,voidt]     })
        //@ts-expect-error
        sample({source:str, clock:num, target:[num,str]       })
        //@ts-expect-error
        sample({source:str, clock:num, target:[anyt,num]      })
        //@ts-expect-error
        sample({source:str, clock:num, target:[num,strBool]   })
        //@ts-expect-error
        sample({source:str, clock:num, target:[num,numStr]    })
        //@ts-expect-error
        sample({source:str, clock:str, target:[num]           })
        //@ts-expect-error
        sample({source:str, clock:str, target:[num,voidt]     })
        //@ts-expect-error
        sample({source:str, clock:str, target:[num,str]       })
        //@ts-expect-error
        sample({source:str, clock:str, target:[anyt,num]      })
        //@ts-expect-error
        sample({source:str, clock:str, target:[num,strBool]   })
        //@ts-expect-error
        sample({source:str, clock:str, target:[num,numStr]    })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<number>; target: Event<string>[]; }' is not assignable to parameter of type '{ source: Event<number>; target: Event<string>[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string; }[]; }'.
          Type '{ source: Event<number>; target: Event<string>[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string; }[]; }': error, targets
        Argument of type '{ source: Event<number>; target: Event<string | boolean>[]; }' is not assignable to parameter of type '{ source: Event<number>; target: Event<string | boolean>[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | boolean; }[]; }'.
          Type '{ source: Event<number>; target: Event<string | boolean>[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | boolean; }[]; }': error, targets
        Argument of type '{ source: Event<number>; target: (Event<void> | Event<string | boolean>)[]; }' is not assignable to parameter of type '{ source: Event<number>; target: (Event<void> | Event<string | boolean>)[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | ... 1 more ... | void; }[]; }'.
          Type '{ source: Event<number>; target: (Event<void> | Event<string | boolean>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | boolean | void; }[]; }': error, targets
        Argument of type '{ source: Event<number>; target: (Event<void> | Event<string>)[]; }' is not assignable to parameter of type '{ source: Event<number>; target: (Event<void> | Event<string>)[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | void; }[]; }'.
          Type '{ source: Event<number>; target: (Event<void> | Event<string>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | void; }[]; }': error, targets
        Argument of type '{ source: Event<string>; target: Event<number>[]; }' is not assignable to parameter of type '{ source: Event<string>; target: Event<number>[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: string; targetType: number; }[]; }'.
          Type '{ source: Event<string>; target: Event<number>[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: string; targetType: number; }[]; }': error, targets
        Argument of type '{ source: Event<string>; target: (Event<void> | Event<number>)[]; }' is not assignable to parameter of type '{ source: Event<string>; target: (Event<void> | Event<number>)[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: string; targetType: number | void; }[]; }'.
          Type '{ source: Event<string>; target: (Event<void> | Event<number>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: string; targetType: number | void; }[]; }': error, targets
        Argument of type '{ clock: Event<number>; target: Event<string>[]; }' is not assignable to parameter of type '{ clock: Event<number>; target: Event<string>[]; } & { error: \\"clock should extend target type\\"; targets: { clockType: number; targetType: string; }[]; }'.
          Type '{ clock: Event<number>; target: Event<string>[]; }' is missing the following properties from type '{ error: \\"clock should extend target type\\"; targets: { clockType: number; targetType: string; }[]; }': error, targets
        Argument of type '{ clock: Event<number>; target: Event<string | boolean>[]; }' is not assignable to parameter of type '{ clock: Event<number>; target: Event<string | boolean>[]; } & { error: \\"clock should extend target type\\"; targets: { clockType: number; targetType: string | boolean; }[]; }'.
          Type '{ clock: Event<number>; target: Event<string | boolean>[]; }' is missing the following properties from type '{ error: \\"clock should extend target type\\"; targets: { clockType: number; targetType: string | boolean; }[]; }': error, targets
        Argument of type '{ clock: Event<number>; target: (Event<void> | Event<string | boolean>)[]; }' is not assignable to parameter of type '{ clock: Event<number>; target: (Event<void> | Event<string | boolean>)[]; } & { error: \\"clock should extend target type\\"; targets: { clockType: number; targetType: string | ... 1 more ... | void; }[]; }'.
          Type '{ clock: Event<number>; target: (Event<void> | Event<string | boolean>)[]; }' is missing the following properties from type '{ error: \\"clock should extend target type\\"; targets: { clockType: number; targetType: string | boolean | void; }[]; }': error, targets
        Argument of type '{ clock: Event<number>; target: (Event<void> | Event<string>)[]; }' is not assignable to parameter of type '{ clock: Event<number>; target: (Event<void> | Event<string>)[]; } & { error: \\"clock should extend target type\\"; targets: { clockType: number; targetType: string | void; }[]; }'.
          Type '{ clock: Event<number>; target: (Event<void> | Event<string>)[]; }' is missing the following properties from type '{ error: \\"clock should extend target type\\"; targets: { clockType: number; targetType: string | void; }[]; }': error, targets
        Argument of type '{ clock: Event<string>; target: Event<number>[]; }' is not assignable to parameter of type '{ clock: Event<string>; target: Event<number>[]; } & { error: \\"clock should extend target type\\"; targets: { clockType: string; targetType: number; }[]; }'.
          Type '{ clock: Event<string>; target: Event<number>[]; }' is missing the following properties from type '{ error: \\"clock should extend target type\\"; targets: { clockType: string; targetType: number; }[]; }': error, targets
        Argument of type '{ clock: Event<string>; target: (Event<void> | Event<number>)[]; }' is not assignable to parameter of type '{ clock: Event<string>; target: (Event<void> | Event<number>)[]; } & { error: \\"clock should extend target type\\"; targets: { clockType: string; targetType: number | void; }[]; }'.
          Type '{ clock: Event<string>; target: (Event<void> | Event<number>)[]; }' is missing the following properties from type '{ error: \\"clock should extend target type\\"; targets: { clockType: string; targetType: number | void; }[]; }': error, targets
        Argument of type '{ source: Event<number>; clock: Event<number>; target: Event<string>[]; }' is not assignable to parameter of type '{ source: Event<number>; clock: Event<number>; target: Event<string>[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string; }[]; }'.
          Type '{ source: Event<number>; clock: Event<number>; target: Event<string>[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string; }[]; }': error, targets
        Argument of type '{ source: Event<number>; clock: Event<number>; target: Event<string | boolean>[]; }' is not assignable to parameter of type '{ source: Event<number>; clock: Event<number>; target: Event<string | boolean>[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | boolean; }[]; }'.
          Type '{ source: Event<number>; clock: Event<number>; target: Event<string | boolean>[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | boolean; }[]; }': error, targets
        Argument of type '{ source: Event<number>; clock: Event<number>; target: (Event<void> | Event<string | boolean>)[]; }' is not assignable to parameter of type '{ source: Event<number>; clock: Event<number>; target: (Event<void> | Event<string | boolean>)[]; } & { error: \\"source should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: Event<number>; clock: Event<number>; target: (Event<void> | Event<string | boolean>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | boolean | void; }[]; }': error, targets
        Argument of type '{ source: Event<number>; clock: Event<number>; target: (Event<void> | Event<string>)[]; }' is not assignable to parameter of type '{ source: Event<number>; clock: Event<number>; target: (Event<void> | Event<string>)[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | void; }[]; }'.
          Type '{ source: Event<number>; clock: Event<number>; target: (Event<void> | Event<string>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | void; }[]; }': error, targets
        Argument of type '{ source: Event<number>; clock: Event<string>; target: Event<string>[]; }' is not assignable to parameter of type '{ source: Event<number>; clock: Event<string>; target: Event<string>[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string; }[]; }'.
          Type '{ source: Event<number>; clock: Event<string>; target: Event<string>[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string; }[]; }': error, targets
        Argument of type '{ source: Event<number>; clock: Event<string>; target: Event<string | boolean>[]; }' is not assignable to parameter of type '{ source: Event<number>; clock: Event<string>; target: Event<string | boolean>[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | boolean; }[]; }'.
          Type '{ source: Event<number>; clock: Event<string>; target: Event<string | boolean>[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | boolean; }[]; }': error, targets
        Argument of type '{ source: Event<number>; clock: Event<string>; target: (Event<void> | Event<string | boolean>)[]; }' is not assignable to parameter of type '{ source: Event<number>; clock: Event<string>; target: (Event<void> | Event<string | boolean>)[]; } & { error: \\"source should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: Event<number>; clock: Event<string>; target: (Event<void> | Event<string | boolean>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | boolean | void; }[]; }': error, targets
        Argument of type '{ source: Event<number>; clock: Event<string>; target: (Event<void> | Event<string>)[]; }' is not assignable to parameter of type '{ source: Event<number>; clock: Event<string>; target: (Event<void> | Event<string>)[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | void; }[]; }'.
          Type '{ source: Event<number>; clock: Event<string>; target: (Event<void> | Event<string>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | void; }[]; }': error, targets
        Argument of type '{ source: Event<string>; clock: Event<number>; target: Event<number>[]; }' is not assignable to parameter of type '{ source: Event<string>; clock: Event<number>; target: Event<number>[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: string; targetType: number; }[]; }'.
          Type '{ source: Event<string>; clock: Event<number>; target: Event<number>[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: string; targetType: number; }[]; }': error, targets
        Argument of type '{ source: Event<string>; clock: Event<number>; target: (Event<void> | Event<number>)[]; }' is not assignable to parameter of type '{ source: Event<string>; clock: Event<number>; target: (Event<void> | Event<number>)[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: string; targetType: number | void; }[]; }'.
          Type '{ source: Event<string>; clock: Event<number>; target: (Event<void> | Event<number>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: string; targetType: number | void; }[]; }': error, targets
        Argument of type '{ source: Event<string>; clock: Event<string>; target: Event<number>[]; }' is not assignable to parameter of type '{ source: Event<string>; clock: Event<string>; target: Event<number>[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: string; targetType: number; }[]; }'.
          Type '{ source: Event<string>; clock: Event<string>; target: Event<number>[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: string; targetType: number; }[]; }': error, targets
        Argument of type '{ source: Event<string>; clock: Event<string>; target: (Event<void> | Event<number>)[]; }' is not assignable to parameter of type '{ source: Event<string>; clock: Event<string>; target: (Event<void> | Event<number>)[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: string; targetType: number | void; }[]; }'.
          Type '{ source: Event<string>; clock: Event<string>; target: (Event<void> | Event<number>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: string; targetType: number | void; }[]; }': error, targets
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
        //@ts-expect-error
        sample({source:num, target:[str]           , fn:(src) => src + 1      })
        //@ts-expect-error
        sample({source:num, target:[strBool]       , fn:(src) => src + 1      })
        //@ts-expect-error
        sample({source:num, target:[num,str]       , fn:(src) => src + 1      })
        //@ts-expect-error
        sample({source:num, target:[num,strBool]   , fn:(src) => src + 1      })
        //@ts-expect-error
        sample({source:num, target:[strBool,voidt] , fn:(src) => src + 1      })
        //@ts-expect-error
        sample({source:num, target:[str,voidt]     , fn:(src) => src + 1      })
        //@ts-expect-error
        sample({source:num, target:[anyt,str]      , fn:(src) => src + 1      })
        //@ts-expect-error
        sample({source:num, target:[numStr,str]    , fn:(src) => src + 1      })
        //@ts-expect-error
        sample({source:num, target:[anyt,strBool]  , fn:(src) => src + 1      })
        //@ts-expect-error
        sample({source:num, target:[numStr,strBool], fn:(src) => src + 1      })
        //@ts-expect-error
        sample({source:str, target:[num]           , fn:(src) => src + 1      })
        //@ts-expect-error
        sample({source:str, target:[num,voidt]     , fn:(src) => src + 1      })
        //@ts-expect-error
        sample({source:str, target:[num,str]       , fn:(src) => src + 1      })
        //@ts-expect-error
        sample({source:str, target:[anyt,num]      , fn:(src) => src + 1      })
        //@ts-expect-error
        sample({source:str, target:[num,strBool]   , fn:(src) => src + 1      })
        //@ts-expect-error
        sample({source:str, target:[num,numStr]    , fn:(src) => src + 1      })
        //@ts-expect-error
        sample({clock:num, target:[str]           , fn:(clk) => clk + 1      })
        //@ts-expect-error
        sample({clock:num, target:[strBool]       , fn:(clk) => clk + 1      })
        //@ts-expect-error
        sample({clock:num, target:[num,str]       , fn:(clk) => clk + 1      })
        //@ts-expect-error
        sample({clock:num, target:[num,strBool]   , fn:(clk) => clk + 1      })
        //@ts-expect-error
        sample({clock:num, target:[strBool,voidt] , fn:(clk) => clk + 1      })
        //@ts-expect-error
        sample({clock:num, target:[str,voidt]     , fn:(clk) => clk + 1      })
        //@ts-expect-error
        sample({clock:num, target:[anyt,str]      , fn:(clk) => clk + 1      })
        //@ts-expect-error
        sample({clock:num, target:[numStr,str]    , fn:(clk) => clk + 1      })
        //@ts-expect-error
        sample({clock:num, target:[anyt,strBool]  , fn:(clk) => clk + 1      })
        //@ts-expect-error
        sample({clock:num, target:[numStr,strBool], fn:(clk) => clk + 1      })
        //@ts-expect-error
        sample({clock:str, target:[num]           , fn:(clk) => clk + 1      })
        //@ts-expect-error
        sample({clock:str, target:[num,voidt]     , fn:(clk) => clk + 1      })
        //@ts-expect-error
        sample({clock:str, target:[num,str]       , fn:(clk) => clk + 1      })
        //@ts-expect-error
        sample({clock:str, target:[anyt,num]      , fn:(clk) => clk + 1      })
        //@ts-expect-error
        sample({clock:str, target:[num,strBool]   , fn:(clk) => clk + 1      })
        //@ts-expect-error
        sample({clock:str, target:[num,numStr]    , fn:(clk) => clk + 1      })
        //@ts-expect-error
        sample({source:num, clock:num, target:[str]           , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:num, clock:num, target:[strBool]       , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:num, clock:num, target:[num,str]       , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:num, clock:num, target:[num,strBool]   , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:num, clock:num, target:[strBool,voidt] , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:num, clock:num, target:[str,voidt]     , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:num, clock:num, target:[anyt,str]      , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:num, clock:num, target:[numStr,str]    , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:num, clock:num, target:[anyt,strBool]  , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:num, clock:num, target:[numStr,strBool], fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[num]           , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[num,voidt]     , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[num,str]       , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[anyt,num]      , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[num,strBool]   , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[num,numStr]    , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[num]           , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[num,voidt]     , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[num,str]       , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[anyt,num]      , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[num,strBool]   , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[num,numStr]    , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:str, clock:str, target:[num]           , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:str, clock:str, target:[num,voidt]     , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:str, clock:str, target:[num,str]       , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:str, clock:str, target:[anyt,num]      , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:str, clock:str, target:[num,strBool]   , fn:(src,clk) => src + clk})
        //@ts-expect-error
        sample({source:str, clock:str, target:[num,numStr]    , fn:(src,clk) => src + clk})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<number>; target: Event<string>[]; fn: (src: number) => number; }' is not assignable to parameter of type '{ source: Event<number>; target: Event<string>[]; fn: (src: number) => number; } & { error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string; }[]; }'.
          Type '{ source: Event<number>; target: Event<string>[]; fn: (src: number) => number; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string; }[]; }': error, targets
        Argument of type '{ source: Event<number>; target: Event<string | boolean>[]; fn: (src: number) => number; }' is not assignable to parameter of type '{ source: Event<number>; target: Event<string | boolean>[]; fn: (src: number) => number; } & { error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | boolean; }[]; }'.
          Type '{ source: Event<number>; target: Event<string | boolean>[]; fn: (src: number) => number; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | boolean; }[]; }': error, targets
        Argument of type '{ source: Event<number>; target: (Event<void> | Event<string | boolean>)[]; fn: (src: number) => number; }' is not assignable to parameter of type '{ source: Event<number>; target: (Event<void> | Event<string | boolean>)[]; fn: (src: number) => number; } & { error: \\"fn result should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: Event<number>; target: (Event<void> | Event<string | boolean>)[]; fn: (src: number) => number; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | boolean | void; }[]; }': error, targets
        Argument of type '{ source: Event<number>; target: (Event<void> | Event<string>)[]; fn: (src: number) => number; }' is not assignable to parameter of type '{ source: Event<number>; target: (Event<void> | Event<string>)[]; fn: (src: number) => number; } & { error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | void; }[]; }'.
          Type '{ source: Event<number>; target: (Event<void> | Event<string>)[]; fn: (src: number) => number; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | void; }[]; }': error, targets
        Argument of type '{ source: Event<string>; target: Event<number>[]; fn: (src: string) => string; }' is not assignable to parameter of type '{ source: Event<string>; target: Event<number>[]; fn: (src: string) => string; } & { error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: number; }[]; }'.
          Type '{ source: Event<string>; target: Event<number>[]; fn: (src: string) => string; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: number; }[]; }': error, targets
        Argument of type '{ source: Event<string>; target: (Event<void> | Event<number>)[]; fn: (src: string) => string; }' is not assignable to parameter of type '{ source: Event<string>; target: (Event<void> | Event<number>)[]; fn: (src: string) => string; } & { error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: number | void; }[]; }'.
          Type '{ source: Event<string>; target: (Event<void> | Event<number>)[]; fn: (src: string) => string; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: number | void; }[]; }': error, targets
        Argument of type '{ clock: Event<number>; target: Event<string>[]; fn: (clk: number) => number; }' is not assignable to parameter of type '{ clock: Event<number>; target: Event<string>[]; fn: (clk: number) => number; } & { error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string; }[]; }'.
          Type '{ clock: Event<number>; target: Event<string>[]; fn: (clk: number) => number; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string; }[]; }': error, targets
        Argument of type '{ clock: Event<number>; target: Event<string | boolean>[]; fn: (clk: number) => number; }' is not assignable to parameter of type '{ clock: Event<number>; target: Event<string | boolean>[]; fn: (clk: number) => number; } & { error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | boolean; }[]; }'.
          Type '{ clock: Event<number>; target: Event<string | boolean>[]; fn: (clk: number) => number; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | boolean; }[]; }': error, targets
        Argument of type '{ clock: Event<number>; target: (Event<void> | Event<string | boolean>)[]; fn: (clk: number) => number; }' is not assignable to parameter of type '{ clock: Event<number>; target: (Event<void> | Event<string | boolean>)[]; fn: (clk: number) => number; } & { error: \\"fn result should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ clock: Event<number>; target: (Event<void> | Event<string | boolean>)[]; fn: (clk: number) => number; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | boolean | void; }[]; }': error, targets
        Argument of type '{ clock: Event<number>; target: (Event<void> | Event<string>)[]; fn: (clk: number) => number; }' is not assignable to parameter of type '{ clock: Event<number>; target: (Event<void> | Event<string>)[]; fn: (clk: number) => number; } & { error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | void; }[]; }'.
          Type '{ clock: Event<number>; target: (Event<void> | Event<string>)[]; fn: (clk: number) => number; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | void; }[]; }': error, targets
        Argument of type '{ clock: Event<string>; target: Event<number>[]; fn: (clk: string) => string; }' is not assignable to parameter of type '{ clock: Event<string>; target: Event<number>[]; fn: (clk: string) => string; } & { error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: number; }[]; }'.
          Type '{ clock: Event<string>; target: Event<number>[]; fn: (clk: string) => string; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: number; }[]; }': error, targets
        Argument of type '{ clock: Event<string>; target: (Event<void> | Event<number>)[]; fn: (clk: string) => string; }' is not assignable to parameter of type '{ clock: Event<string>; target: (Event<void> | Event<number>)[]; fn: (clk: string) => string; } & { error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: number | void; }[]; }'.
          Type '{ clock: Event<string>; target: (Event<void> | Event<number>)[]; fn: (clk: string) => string; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: number | void; }[]; }': error, targets
        Argument of type '{ source: Event<number>; clock: Event<number>; target: Event<string>[]; fn: (src: number, clk: number) => number; }' is not assignable to parameter of type '{ source: Event<number>; clock: Event<number>; target: Event<string>[]; fn: (src: number, clk: number) => number; } & { error: \\"fn result should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: Event<number>; clock: Event<number>; target: Event<string>[]; fn: (src: number, clk: number) => number; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string; }[]; }': error, targets
        Argument of type '{ source: Event<number>; clock: Event<number>; target: Event<string | boolean>[]; fn: (src: number, clk: number) => number; }' is not assignable to parameter of type '{ source: Event<number>; clock: Event<number>; target: Event<string | boolean>[]; fn: (src: number, clk: number) => number; } & { error: \\"fn result should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: Event<number>; clock: Event<number>; target: Event<string | boolean>[]; fn: (src: number, clk: number) => number; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | boolean; }[]; }': error, targets
        Argument of type '{ source: Event<number>; clock: Event<number>; target: (Event<void> | Event<string | boolean>)[]; fn: (src: number, clk: number) => number; }' is not assignable to parameter of type '{ source: Event<number>; clock: Event<number>; target: (Event<void> | Event<string | boolean>)[]; fn: (src: number, clk: number) => number; } & { error: \\"fn result should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: Event<number>; clock: Event<number>; target: (Event<void> | Event<string | boolean>)[]; fn: (src: number, clk: number) => number; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | boolean | void; }[]; }': error, targets
        Argument of type '{ source: Event<number>; clock: Event<number>; target: (Event<void> | Event<string>)[]; fn: (src: number, clk: number) => number; }' is not assignable to parameter of type '{ source: Event<number>; clock: Event<number>; target: (Event<void> | Event<string>)[]; fn: (src: number, clk: number) => number; } & { error: \\"fn result should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: Event<number>; clock: Event<number>; target: (Event<void> | Event<string>)[]; fn: (src: number, clk: number) => number; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | void; }[]; }': error, targets
        Argument of type '{ source: Event<number>; clock: Event<string>; target: Event<number>[]; fn: (src: number, clk: string) => string; }' is not assignable to parameter of type '{ source: Event<number>; clock: Event<string>; target: Event<number>[]; fn: (src: number, clk: string) => string; } & { error: \\"fn result should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: Event<number>; clock: Event<string>; target: Event<number>[]; fn: (src: number, clk: string) => string; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: number; }[]; }': error, targets
        Argument of type '{ source: Event<number>; clock: Event<string>; target: (Event<void> | Event<number>)[]; fn: (src: number, clk: string) => string; }' is not assignable to parameter of type '{ source: Event<number>; clock: Event<string>; target: (Event<void> | Event<number>)[]; fn: (src: number, clk: string) => string; } & { error: \\"fn result should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: Event<number>; clock: Event<string>; target: (Event<void> | Event<number>)[]; fn: (src: number, clk: string) => string; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: number | void; }[]; }': error, targets
        Argument of type '{ source: Event<string>; clock: Event<number>; target: Event<number>[]; fn: (src: string, clk: number) => string; }' is not assignable to parameter of type '{ source: Event<string>; clock: Event<number>; target: Event<number>[]; fn: (src: string, clk: number) => string; } & { error: \\"fn result should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: Event<string>; clock: Event<number>; target: Event<number>[]; fn: (src: string, clk: number) => string; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: number; }[]; }': error, targets
        Argument of type '{ source: Event<string>; clock: Event<number>; target: (Event<void> | Event<number>)[]; fn: (src: string, clk: number) => string; }' is not assignable to parameter of type '{ source: Event<string>; clock: Event<number>; target: (Event<void> | Event<number>)[]; fn: (src: string, clk: number) => string; } & { error: \\"fn result should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: Event<string>; clock: Event<number>; target: (Event<void> | Event<number>)[]; fn: (src: string, clk: number) => string; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: number | void; }[]; }': error, targets
        Argument of type '{ source: Event<string>; clock: Event<string>; target: Event<number>[]; fn: (src: string, clk: string) => string; }' is not assignable to parameter of type '{ source: Event<string>; clock: Event<string>; target: Event<number>[]; fn: (src: string, clk: string) => string; } & { error: \\"fn result should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: Event<string>; clock: Event<string>; target: Event<number>[]; fn: (src: string, clk: string) => string; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: number; }[]; }': error, targets
        Argument of type '{ source: Event<string>; clock: Event<string>; target: (Event<void> | Event<number>)[]; fn: (src: string, clk: string) => string; }' is not assignable to parameter of type '{ source: Event<string>; clock: Event<string>; target: (Event<void> | Event<number>)[]; fn: (src: string, clk: string) => string; } & { error: \\"fn result should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: Event<string>; clock: Event<string>; target: (Event<void> | Event<number>)[]; fn: (src: string, clk: string) => string; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: number | void; }[]; }': error, targets
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
        //@ts-expect-error
        sample({source:num, target:[str]           , fn:(src:number) => src+1             })
        //@ts-expect-error
        sample({source:num, target:[strBool]       , fn:(src:number) => src+1             })
        //@ts-expect-error
        sample({source:num, target:[num,str]       , fn:(src:number) => src+1             })
        //@ts-expect-error
        sample({source:num, target:[num,strBool]   , fn:(src:number) => src+1             })
        //@ts-expect-error
        sample({source:num, target:[strBool,voidt] , fn:(src:number) => src+1             })
        //@ts-expect-error
        sample({source:num, target:[str,voidt]     , fn:(src:number) => src+1             })
        //@ts-expect-error
        sample({source:num, target:[anyt,str]      , fn:(src:number) => src+1             })
        //@ts-expect-error
        sample({source:num, target:[numStr,str]    , fn:(src:number) => src+1             })
        //@ts-expect-error
        sample({source:num, target:[anyt,strBool]  , fn:(src:number) => src+1             })
        //@ts-expect-error
        sample({source:num, target:[numStr,strBool], fn:(src:number) => src+1             })
        //@ts-expect-error
        sample({clock:num, target:[str]           , fn:(clk:number) => clk+1             })
        //@ts-expect-error
        sample({clock:num, target:[strBool]       , fn:(clk:number) => clk+1             })
        //@ts-expect-error
        sample({clock:num, target:[num,str]       , fn:(clk:number) => clk+1             })
        //@ts-expect-error
        sample({clock:num, target:[num,strBool]   , fn:(clk:number) => clk+1             })
        //@ts-expect-error
        sample({clock:num, target:[strBool,voidt] , fn:(clk:number) => clk+1             })
        //@ts-expect-error
        sample({clock:num, target:[str,voidt]     , fn:(clk:number) => clk+1             })
        //@ts-expect-error
        sample({clock:num, target:[anyt,str]      , fn:(clk:number) => clk+1             })
        //@ts-expect-error
        sample({clock:num, target:[numStr,str]    , fn:(clk:number) => clk+1             })
        //@ts-expect-error
        sample({clock:num, target:[anyt,strBool]  , fn:(clk:number) => clk+1             })
        //@ts-expect-error
        sample({clock:num, target:[numStr,strBool], fn:(clk:number) => clk+1             })
        //@ts-expect-error
        sample({source:num, clock:num, target:[str]           , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:num, target:[strBool]       , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:num, target:[num,str]       , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:num, target:[num,strBool]   , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:num, target:[strBool,voidt] , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:num, target:[str,voidt]     , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:num, target:[anyt,str]      , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:num, target:[numStr,str]    , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:num, target:[anyt,strBool]  , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:num, target:[numStr,strBool], fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[num]           , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[voidt]         , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[str]           , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[anyt]          , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[strBool]       , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[numStr]        , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[num,voidt]     , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[num,str]       , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[anyt,num]      , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[num,strBool]   , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[num,numStr]    , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[anyt,voidt]    , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[strBool,voidt] , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[numStr,voidt]  , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[str,voidt]     , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[anyt,str]      , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[numStr,str]    , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[anyt,numStr]   , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[anyt,strBool]  , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:num, clock:str, target:[numStr,strBool], fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[num]           , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[voidt]         , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[str]           , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[anyt]          , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[strBool]       , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[numStr]        , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[num,voidt]     , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[num,str]       , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[anyt,num]      , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[num,strBool]   , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[num,numStr]    , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[anyt,voidt]    , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[strBool,voidt] , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[numStr,voidt]  , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[str,voidt]     , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[anyt,str]      , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[numStr,str]    , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[anyt,numStr]   , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[anyt,strBool]  , fn:(src:number,clk:number) => src+clk})
        //@ts-expect-error
        sample({source:str, clock:num, target:[numStr,strBool], fn:(src:number,clk:number) => src+clk})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<number>; target: Event<string>[]; fn: (src: number) => number; }' is not assignable to parameter of type '{ source: Event<number>; target: Event<string>[]; fn: (src: number) => number; } & { error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string; }[]; }'.
          Type '{ source: Event<number>; target: Event<string>[]; fn: (src: number) => number; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string; }[]; }': error, targets
        Argument of type '{ source: Event<number>; target: Event<string | boolean>[]; fn: (src: number) => number; }' is not assignable to parameter of type '{ source: Event<number>; target: Event<string | boolean>[]; fn: (src: number) => number; } & { error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | boolean; }[]; }'.
          Type '{ source: Event<number>; target: Event<string | boolean>[]; fn: (src: number) => number; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | boolean; }[]; }': error, targets
        Argument of type '{ source: Event<number>; target: (Event<void> | Event<string | boolean>)[]; fn: (src: number) => number; }' is not assignable to parameter of type '{ source: Event<number>; target: (Event<void> | Event<string | boolean>)[]; fn: (src: number) => number; } & { error: \\"fn result should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: Event<number>; target: (Event<void> | Event<string | boolean>)[]; fn: (src: number) => number; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | boolean | void; }[]; }': error, targets
        Argument of type '{ source: Event<number>; target: (Event<void> | Event<string>)[]; fn: (src: number) => number; }' is not assignable to parameter of type '{ source: Event<number>; target: (Event<void> | Event<string>)[]; fn: (src: number) => number; } & { error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | void; }[]; }'.
          Type '{ source: Event<number>; target: (Event<void> | Event<string>)[]; fn: (src: number) => number; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | void; }[]; }': error, targets
        Argument of type '{ clock: Event<number>; target: Event<string>[]; fn: (clk: number) => number; }' is not assignable to parameter of type '{ clock: Event<number>; target: Event<string>[]; fn: (clk: number) => number; } & { error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string; }[]; }'.
          Type '{ clock: Event<number>; target: Event<string>[]; fn: (clk: number) => number; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string; }[]; }': error, targets
        Argument of type '{ clock: Event<number>; target: Event<string | boolean>[]; fn: (clk: number) => number; }' is not assignable to parameter of type '{ clock: Event<number>; target: Event<string | boolean>[]; fn: (clk: number) => number; } & { error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | boolean; }[]; }'.
          Type '{ clock: Event<number>; target: Event<string | boolean>[]; fn: (clk: number) => number; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | boolean; }[]; }': error, targets
        Argument of type '{ clock: Event<number>; target: (Event<void> | Event<string | boolean>)[]; fn: (clk: number) => number; }' is not assignable to parameter of type '{ clock: Event<number>; target: (Event<void> | Event<string | boolean>)[]; fn: (clk: number) => number; } & { error: \\"fn result should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ clock: Event<number>; target: (Event<void> | Event<string | boolean>)[]; fn: (clk: number) => number; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | boolean | void; }[]; }': error, targets
        Argument of type '{ clock: Event<number>; target: (Event<void> | Event<string>)[]; fn: (clk: number) => number; }' is not assignable to parameter of type '{ clock: Event<number>; target: (Event<void> | Event<string>)[]; fn: (clk: number) => number; } & { error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | void; }[]; }'.
          Type '{ clock: Event<number>; target: (Event<void> | Event<string>)[]; fn: (clk: number) => number; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | void; }[]; }': error, targets
        Argument of type '{ source: Event<number>; clock: Event<number>; target: Event<string>[]; fn: (src: number, clk: number) => number; }' is not assignable to parameter of type '{ source: Event<number>; clock: Event<number>; target: Event<string>[]; fn: (src: number, clk: number) => number; } & { error: \\"fn result should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: Event<number>; clock: Event<number>; target: Event<string>[]; fn: (src: number, clk: number) => number; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string; }[]; }': error, targets
        Argument of type '{ source: Event<number>; clock: Event<number>; target: Event<string | boolean>[]; fn: (src: number, clk: number) => number; }' is not assignable to parameter of type '{ source: Event<number>; clock: Event<number>; target: Event<string | boolean>[]; fn: (src: number, clk: number) => number; } & { error: \\"fn result should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: Event<number>; clock: Event<number>; target: Event<string | boolean>[]; fn: (src: number, clk: number) => number; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | boolean; }[]; }': error, targets
        Argument of type '{ source: Event<number>; clock: Event<number>; target: (Event<void> | Event<string | boolean>)[]; fn: (src: number, clk: number) => number; }' is not assignable to parameter of type '{ source: Event<number>; clock: Event<number>; target: (Event<void> | Event<string | boolean>)[]; fn: (src: number, clk: number) => number; } & { error: \\"fn result should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: Event<number>; clock: Event<number>; target: (Event<void> | Event<string | boolean>)[]; fn: (src: number, clk: number) => number; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | boolean | void; }[]; }': error, targets
        Argument of type '{ source: Event<number>; clock: Event<number>; target: (Event<void> | Event<string>)[]; fn: (src: number, clk: number) => number; }' is not assignable to parameter of type '{ source: Event<number>; clock: Event<number>; target: (Event<void> | Event<string>)[]; fn: (src: number, clk: number) => number; } & { error: \\"fn result should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: Event<number>; clock: Event<number>; target: (Event<void> | Event<string>)[]; fn: (src: number, clk: number) => number; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: number; targetType: string | void; }[]; }': error, targets
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
        sample({source:{a:$num,b:$str}, target:[a_num]          })
        sample({source:{a:$num,b:$str}, target:[ab]             })
        sample({source:{a:$num,b:$str}, target:[a_num,ab]       })
        sample({source:[$num,$str]    , target:[l_num]          })
        sample({source:[$num,$str]    , target:[l_num_str]      })
        sample({source:[$num,$str]    , target:[l_num,l_num_str]})
        sample({source:{a:$num,b:$str}, clock:num, target:[a_num]          })
        sample({source:{a:$num,b:$str}, clock:num, target:[ab]             })
        sample({source:{a:$num,b:$str}, clock:num, target:[a_num,ab]       })
        sample({source:[$num,$str]    , clock:num, target:[l_num]          })
        sample({source:[$num,$str]    , clock:num, target:[l_num_str]      })
        sample({source:[$num,$str]    , clock:num, target:[l_num,l_num_str]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: (Store<number> | Store<string>)[]; target: Event<[number]>[]; }' is not assignable to parameter of type '{ source: (Store<number> | Store<string>)[]; target: Event<[number]>[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [...]; }[]; }'.
          Type '{ source: (Store<number> | Store<string>)[]; target: Event<[number]>[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number]; }[]; }': error, targets
        Argument of type '{ source: (Store<number> | Store<string>)[]; target: Event<[number, string]>[]; }' is not assignable to parameter of type '{ source: (Store<number> | Store<string>)[]; target: Event<[number, string]>[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [...]; }[]; }'.
          Type '{ source: (Store<number> | Store<string>)[]; target: Event<[number, string]>[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string]; }[]; }': error, targets
        Argument of type '{ source: (Store<number> | Store<string>)[]; target: (Event<[number]> | Event<[number, string]>)[]; }' is not assignable to parameter of type '{ source: (Store<number> | Store<string>)[]; target: (Event<[number]> | Event<[number, string]>)[]; } & { error: \\"source should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: (Store<number> | Store<string>)[]; target: (Event<[number]> | Event<[number, string]>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string] | [number]; }[]; }': error, targets
        Argument of type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: Event<[number]>[]; }' is not assignable to parameter of type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: Event<[number]>[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [...]; }[]; }'.
          Type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: Event<[number]>[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number]; }[]; }': error, targets
        Argument of type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: Event<[number, string]>[]; }' is not assignable to parameter of type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: Event<[number, string]>[]; } & { error: \\"source should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: Event<[number, string]>[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string]; }[]; }': error, targets
        Argument of type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: (Event<[number]> | Event<[number, string]>)[]; }' is not assignable to parameter of type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: (Event<[number]> | Event<[number, string]>)[]; } & { error: \\"source should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: (Event<[number]> | Event<[number, string]>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string] | [number]; }[]; }': error, targets
        "
      `)
    })
    test('source:wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[a_str]              })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[abn]                })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[a_num,a_str]        })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[a_num,abn]          })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[a_str,ab]           })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[abn,a_str]          })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[abn,ab]             })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[ab,a_str]           })
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[l_str]              })
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[l_num_num]          })
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[l_num,l_str]        })
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[l_num,l_num_num]    })
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[l_str,l_num_num]    })
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[l_num_str,l_str]    })
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[l_num_str,l_num_num]})
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[l_num_num,l_str]    })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[a_str]              })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[abn]                })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[a_num,a_str]        })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[a_num,abn]          })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[a_str,ab]           })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[abn,a_str]          })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[abn,ab]             })
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[ab,a_str]           })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[l_str]              })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[l_num_num]          })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[l_num,l_str]        })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[l_num,l_num_num]    })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[l_str,l_num_num]    })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[l_num_str,l_str]    })
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[l_num_str,l_num_num]})
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[l_num_num,l_str]    })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: Event<AS>[]; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; target: Event<AS>[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: AS; }[]; }'.
          Type '{ source: { a: Store<number>; b: Store<string>; }; target: Event<AS>[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: AS; }[]; }': error, targets
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: Event<ABN>[]; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; target: Event<ABN>[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }[]; }'.
          Type '{ source: { a: Store<number>; b: Store<string>; }; target: Event<ABN>[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }[]; }': error, targets
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: (Event<AS> | Event<ABN>)[]; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; target: (Event<AS> | Event<ABN>)[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: { ...; }; targetType: AS | ABN; }[]; }'.
          Type '{ source: { a: Store<number>; b: Store<string>; }; target: (Event<AS> | Event<ABN>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: AS | ABN; }[]; }': error, targets
        Argument of type '{ source: (Store<number> | Store<string>)[]; target: Event<[string]>[]; }' is not assignable to parameter of type '{ source: (Store<number> | Store<string>)[]; target: Event<[string]>[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [...]; }[]; }'.
          Type '{ source: (Store<number> | Store<string>)[]; target: Event<[string]>[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [string]; }[]; }': error, targets
        Argument of type '{ source: (Store<number> | Store<string>)[]; target: Event<[number, number]>[]; }' is not assignable to parameter of type '{ source: (Store<number> | Store<string>)[]; target: Event<[number, number]>[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [...]; }[]; }'.
          Type '{ source: (Store<number> | Store<string>)[]; target: Event<[number, number]>[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number]; }[]; }': error, targets
        Argument of type '{ source: (Store<number> | Store<string>)[]; target: (Event<[number]> | Event<[string]>)[]; }' is not assignable to parameter of type '{ source: (Store<number> | Store<string>)[]; target: (Event<[number]> | Event<[string]>)[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [...] | [...]; }[]; }'.
          Type '{ source: (Store<number> | Store<string>)[]; target: (Event<[number]> | Event<[string]>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [string] | [number]; }[]; }': error, targets
        Argument of type '{ source: (Store<number> | Store<string>)[]; target: (Event<[number]> | Event<[number, number]>)[]; }' is not assignable to parameter of type '{ source: (Store<number> | Store<string>)[]; target: (Event<[number]> | Event<[number, number]>)[]; } & { error: \\"source should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: (Store<number> | Store<string>)[]; target: (Event<[number]> | Event<[number, number]>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number] | [number]; }[]; }': error, targets
        Argument of type '{ source: (Store<number> | Store<string>)[]; target: (Event<[string]> | Event<[number, number]>)[]; }' is not assignable to parameter of type '{ source: (Store<number> | Store<string>)[]; target: (Event<[string]> | Event<[number, number]>)[]; } & { error: \\"source should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: (Store<number> | Store<string>)[]; target: (Event<[string]> | Event<[number, number]>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number] | [string]; }[]; }': error, targets
        Argument of type '{ source: (Store<number> | Store<string>)[]; target: (Event<[string]> | Event<[number, string]>)[]; }' is not assignable to parameter of type '{ source: (Store<number> | Store<string>)[]; target: (Event<[string]> | Event<[number, string]>)[]; } & { error: \\"source should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: (Store<number> | Store<string>)[]; target: (Event<[string]> | Event<[number, string]>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [string] | [number, string]; }[]; }': error, targets
        Argument of type '{ source: (Store<number> | Store<string>)[]; target: (Event<[number, string]> | Event<[number, number]>)[]; }' is not assignable to parameter of type '{ source: (Store<number> | Store<string>)[]; target: (Event<[number, string]> | Event<[number, number]>)[]; } & { error: \\"source should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: (Store<number> | Store<string>)[]; target: (Event<[number, string]> | Event<[number, number]>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number] | [number, string]; }[]; }': error, targets
        Argument of type '{ source: (Store<number> | Store<string>)[]; target: (Event<[string]> | Event<[number, number]>)[]; }' is not assignable to parameter of type '{ source: (Store<number> | Store<string>)[]; target: (Event<[string]> | Event<[number, number]>)[]; } & { error: \\"source should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: (Store<number> | Store<string>)[]; target: (Event<[string]> | Event<[number, number]>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number] | [string]; }[]; }': error, targets
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; target: Event<AS>[]; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; target: Event<AS>[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: { ...; }; targetType: AS; }[]; }'.
          Type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; target: Event<AS>[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: AS; }[]; }': error, targets
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; target: Event<ABN>[]; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; target: Event<ABN>[]; } & { error: \\"source should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; target: Event<ABN>[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }[]; }': error, targets
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; target: (Event<AS> | Event<ABN>)[]; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; target: (Event<AS> | Event<ABN>)[]; } & { error: \\"source should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; target: (Event<AS> | Event<ABN>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: AS | ABN; }[]; }': error, targets
        Argument of type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: Event<[string]>[]; }' is not assignable to parameter of type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: Event<[string]>[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [...]; }[]; }'.
          Type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: Event<[string]>[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [string]; }[]; }': error, targets
        Argument of type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: Event<[number, number]>[]; }' is not assignable to parameter of type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: Event<[number, number]>[]; } & { error: \\"source should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: Event<[number, number]>[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number]; }[]; }': error, targets
        Argument of type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: (Event<[number]> | Event<[string]>)[]; }' is not assignable to parameter of type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: (Event<[number]> | Event<[string]>)[]; } & { error: \\"source should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: (Event<[number]> | Event<[string]>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [string] | [number]; }[]; }': error, targets
        Argument of type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: (Event<[number]> | Event<[number, number]>)[]; }' is not assignable to parameter of type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: (Event<[number]> | Event<[number, number]>)[]; } & { error: \\"source should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: (Event<[number]> | Event<[number, number]>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number] | [number]; }[]; }': error, targets
        Argument of type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: (Event<[string]> | Event<[number, number]>)[]; }' is not assignable to parameter of type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: (Event<[string]> | Event<[number, number]>)[]; } & { error: \\"source should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: (Event<[string]> | Event<[number, number]>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number] | [string]; }[]; }': error, targets
        Argument of type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: (Event<[string]> | Event<[number, string]>)[]; }' is not assignable to parameter of type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: (Event<[string]> | Event<[number, string]>)[]; } & { error: \\"source should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: (Event<[string]> | Event<[number, string]>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [string] | [number, string]; }[]; }': error, targets
        Argument of type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: (Event<[number, string]> | Event<[number, number]>)[]; }' is not assignable to parameter of type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: (Event<[number, string]> | Event<[number, number]>)[]; } & { error: \\"source should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: (Event<[number, string]> | Event<[number, number]>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number] | [number, string]; }[]; }': error, targets
        Argument of type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: (Event<[string]> | Event<[number, number]>)[]; }' is not assignable to parameter of type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: (Event<[string]> | Event<[number, number]>)[]; } & { error: \\"source should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: (Event<[string]> | Event<[number, number]>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number] | [string]; }[]; }': error, targets
        "
      `)
    })
  })
  describe('source:wide, fn:untyped', () => {
    test('source:wide, fn:untyped (should pass)', () => {
      //prettier-ignore
      {
        sample({source:{a:$num,b:$str}, target:[a_num]   , fn:({a,b}) => ({a,b})})
        sample({source:{a:$num,b:$str}, target:[ab]      , fn:({a,b}) => ({a,b})})
        sample({source:{a:$num,b:$str}, target:[a_num,ab], fn:({a,b}) => ({a,b})})
        sample({source:[$num,$str]    , target:[a_num]   , fn:([a,b]) => ({a,b})})
        sample({source:[$num,$str]    , target:[ab]      , fn:([a,b]) => ({a,b})})
        sample({source:[$num,$str]    , target:[a_num,ab], fn:([a,b]) => ({a,b})})
        sample({source:{a:$num,b:$str}, clock:num, target:[a_num]   , fn:({a,b}) => ({a,b})})
        sample({source:{a:$num,b:$str}, clock:num, target:[ab]      , fn:({a,b}) => ({a,b})})
        sample({source:{a:$num,b:$str}, clock:num, target:[a_num,ab], fn:({a,b}) => ({a,b})})
        sample({source:[$num,$str]    , clock:num, target:[a_num]   , fn:([a,b]) => ({a,b})})
        sample({source:[$num,$str]    , clock:num, target:[ab]      , fn:([a,b]) => ({a,b})})
        sample({source:[$num,$str]    , clock:num, target:[a_num,ab], fn:([a,b]) => ({a,b})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: (Store<number> | Store<string>)[]; target: Event<AN>[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; }' is not assignable to parameter of type '{ source: (Store<number> | Store<string>)[]; target: Event<AN>[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; } & { error: \\"fn result should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: (Store<number> | Store<string>)[]; target: Event<AN>[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AN; }[]; }': error, targets
        Argument of type '{ source: (Store<number> | Store<string>)[]; target: Event<AB>[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; }' is not assignable to parameter of type '{ source: (Store<number> | Store<string>)[]; target: Event<AB>[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; } & { error: \\"fn result should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: (Store<number> | Store<string>)[]; target: Event<AB>[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AB; }[]; }': error, targets
        Argument of type '{ source: (Store<number> | Store<string>)[]; target: (Event<AN> | Event<AB>)[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; }' is not assignable to parameter of type '{ source: (Store<number> | Store<string>)[]; target: (Event<AN> | Event<AB>)[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; } & { ...; }'.
          Type '{ source: (Store<number> | Store<string>)[]; target: (Event<AN> | Event<AB>)[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AN; }[]; }': error, targets
        Argument of type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: Event<AN>[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; }' is not assignable to parameter of type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: Event<AN>[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; } & { ...; }'.
          Type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: Event<AN>[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AN; }[]; }': error, targets
        Argument of type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: Event<AB>[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; }' is not assignable to parameter of type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: Event<AB>[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; } & { ...; }'.
          Type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: Event<AB>[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AB; }[]; }': error, targets
        Argument of type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: (Event<AN> | Event<AB>)[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; }' is not assignable to parameter of type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: (Event<AN> | Event<AB>)[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; } & { ...; }'.
          Type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: (Event<AN> | Event<AB>)[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AN; }[]; }': error, targets
        "
      `)
    })
    test('source:wide, fn:untyped (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[a_str]      , fn:({a,b}) => ({a,b})})
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[abn]        , fn:({a,b}) => ({a,b})})
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[a_num,a_str], fn:({a,b}) => ({a,b})})
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[a_num,abn]  , fn:({a,b}) => ({a,b})})
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[a_str,ab]   , fn:({a,b}) => ({a,b})})
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[abn,a_str]  , fn:({a,b}) => ({a,b})})
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[abn,ab]     , fn:({a,b}) => ({a,b})})
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, target:[ab,a_str]   , fn:({a,b}) => ({a,b})})
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[a_str]      , fn:([a,b]) => ({a,b})})
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[abn]        , fn:([a,b]) => ({a,b})})
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[a_num,a_str], fn:([a,b]) => ({a,b})})
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[a_num,abn]  , fn:([a,b]) => ({a,b})})
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[a_str,ab]   , fn:([a,b]) => ({a,b})})
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[abn,a_str]  , fn:([a,b]) => ({a,b})})
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[abn,ab]     , fn:([a,b]) => ({a,b})})
        //@ts-expect-error
        sample({source:[$num,$str]    , target:[ab,a_str]   , fn:([a,b]) => ({a,b})})
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[a_str]      , fn:({a,b}) => ({a,b})})
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[abn]        , fn:({a,b}) => ({a,b})})
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[a_num,a_str], fn:({a,b}) => ({a,b})})
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[a_num,abn]  , fn:({a,b}) => ({a,b})})
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[a_str,ab]   , fn:({a,b}) => ({a,b})})
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[abn,a_str]  , fn:({a,b}) => ({a,b})})
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[abn,ab]     , fn:({a,b}) => ({a,b})})
        //@ts-expect-error
        sample({source:{a:$num,b:$str}, clock:num, target:[ab,a_str]   , fn:({a,b}) => ({a,b})})
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[a_str]      , fn:([a,b]) => ({a,b})})
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[abn]        , fn:([a,b]) => ({a,b})})
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[a_num,a_str], fn:([a,b]) => ({a,b})})
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[a_num,abn]  , fn:([a,b]) => ({a,b})})
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[a_str,ab]   , fn:([a,b]) => ({a,b})})
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[abn,a_str]  , fn:([a,b]) => ({a,b})})
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[abn,ab]     , fn:([a,b]) => ({a,b})})
        //@ts-expect-error
        sample({source:[$num,$str]    , clock:num, target:[ab,a_str]   , fn:([a,b]) => ({a,b})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: Event<AS>[]; fn: ({ a, b }: { a: number; b: string; }) => { a: number; b: string; }; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; target: Event<AS>[]; fn: ({ a, b }: { a: number; b: string; }) => { a: number; b: string; }; } & { error: \\"fn result should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: { a: Store<number>; b: Store<string>; }; target: Event<AS>[]; fn: ({ a, b }: { a: number; b: string; }) => { a: number; b: string; }; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS; }[]; }': error, targets
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: Event<ABN>[]; fn: ({ a, b }: { a: number; b: string; }) => { a: number; b: string; }; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; target: Event<ABN>[]; fn: ({ a, b }: { a: number; b: string; }) => { a: number; b: string; }; } & { error: \\"fn result should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: { a: Store<number>; b: Store<string>; }; target: Event<ABN>[]; fn: ({ a, b }: { a: number; b: string; }) => { a: number; b: string; }; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: ABN; }[]; }': error, targets
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: (Event<AS> | Event<ABN>)[]; fn: ({ a, b }: { a: number; b: string; }) => { a: number; b: string; }; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; target: (Event<AS> | Event<ABN>)[]; fn: ({ a, b }: { a: number; b: string; }) => { a: number; b: string; }; } & { error: \\"fn result should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: { a: Store<number>; b: Store<string>; }; target: (Event<AS> | Event<ABN>)[]; fn: ({ a, b }: { a: number; b: string; }) => { a: number; b: string; }; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS | ABN; }[]; }': error, targets
        Argument of type '{ source: (Store<number> | Store<string>)[]; target: Event<AS>[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; }' is not assignable to parameter of type '{ source: (Store<number> | Store<string>)[]; target: Event<AS>[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; } & { error: \\"fn result should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: (Store<number> | Store<string>)[]; target: Event<AS>[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AS; }[]; }': error, targets
        Argument of type '{ source: (Store<number> | Store<string>)[]; target: Event<ABN>[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; }' is not assignable to parameter of type '{ source: (Store<number> | Store<string>)[]; target: Event<ABN>[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; } & { error: \\"fn result should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: (Store<number> | Store<string>)[]; target: Event<ABN>[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: ABN; }[]; }': error, targets
        Argument of type '{ source: (Store<number> | Store<string>)[]; target: (Event<AN> | Event<AS>)[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; }' is not assignable to parameter of type '{ source: (Store<number> | Store<string>)[]; target: (Event<AN> | Event<AS>)[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; } & { ...; }'.
          Type '{ source: (Store<number> | Store<string>)[]; target: (Event<AN> | Event<AS>)[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AN | AS; }[]; }': error, targets
        Argument of type '{ source: (Store<number> | Store<string>)[]; target: (Event<AN> | Event<ABN>)[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; }' is not assignable to parameter of type '{ source: (Store<number> | Store<string>)[]; target: (Event<AN> | Event<ABN>)[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; } & { ...; }'.
          Type '{ source: (Store<number> | Store<string>)[]; target: (Event<AN> | Event<ABN>)[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AN; }[]; }': error, targets
        Argument of type '{ source: (Store<number> | Store<string>)[]; target: (Event<AS> | Event<AB>)[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; }' is not assignable to parameter of type '{ source: (Store<number> | Store<string>)[]; target: (Event<AS> | Event<AB>)[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; } & { ...; }'.
          Type '{ source: (Store<number> | Store<string>)[]; target: (Event<AS> | Event<AB>)[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AS | AB; }[]; }': error, targets
        Argument of type '{ source: (Store<number> | Store<string>)[]; target: (Event<AS> | Event<ABN>)[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; }' is not assignable to parameter of type '{ source: (Store<number> | Store<string>)[]; target: (Event<AS> | Event<ABN>)[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; } & { ...; }'.
          Type '{ source: (Store<number> | Store<string>)[]; target: (Event<AS> | Event<ABN>)[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AS | ABN; }[]; }': error, targets
        Argument of type '{ source: (Store<number> | Store<string>)[]; target: (Event<AB> | Event<ABN>)[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; }' is not assignable to parameter of type '{ source: (Store<number> | Store<string>)[]; target: (Event<AB> | Event<ABN>)[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; } & { ...; }'.
          Type '{ source: (Store<number> | Store<string>)[]; target: (Event<AB> | Event<ABN>)[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AB | ABN; }[]; }': error, targets
        Argument of type '{ source: (Store<number> | Store<string>)[]; target: (Event<AS> | Event<AB>)[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; }' is not assignable to parameter of type '{ source: (Store<number> | Store<string>)[]; target: (Event<AS> | Event<AB>)[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; } & { ...; }'.
          Type '{ source: (Store<number> | Store<string>)[]; target: (Event<AS> | Event<AB>)[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AS | AB; }[]; }': error, targets
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; target: Event<AS>[]; fn: ({ a, b }: { a: number; b: string; }) => { a: number; b: string; }; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; target: Event<AS>[]; fn: ({ a, b }: { a: number; b: string; }) => { a: number; b: string; }; } & { error: \\"fn result should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; target: Event<AS>[]; fn: ({ a, b }: { a: number; b: string; }) => { a: number; b: string; }; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS; }[]; }': error, targets
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; target: Event<ABN>[]; fn: ({ a, b }: { a: number; b: string; }) => { a: number; b: string; }; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; target: Event<ABN>[]; fn: ({ a, b }: { a: number; b: string; }) => { a: number; b: string; }; } & { ...; }'.
          Type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; target: Event<ABN>[]; fn: ({ a, b }: { a: number; b: string; }) => { a: number; b: string; }; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: ABN; }[]; }': error, targets
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; target: (Event<AS> | Event<ABN>)[]; fn: ({ a, b }: { a: number; b: string; }) => { ...; }; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; target: (Event<AS> | Event<ABN>)[]; fn: ({ a, b }: { a: number; b: string; }) => { ...; }; } & { ...; }'.
          Type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; target: (Event<AS> | Event<ABN>)[]; fn: ({ a, b }: { a: number; b: string; }) => { ...; }; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS | ABN; }[]; }': error, targets
        Argument of type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: Event<AS>[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; }' is not assignable to parameter of type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: Event<AS>[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; } & { ...; }'.
          Type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: Event<AS>[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AS; }[]; }': error, targets
        Argument of type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: Event<ABN>[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; }' is not assignable to parameter of type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: Event<ABN>[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; } & { ...; }'.
          Type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: Event<ABN>[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: ABN; }[]; }': error, targets
        Argument of type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: (Event<AN> | Event<AS>)[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; }' is not assignable to parameter of type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: (Event<AN> | Event<AS>)[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; } & { ...; }'.
          Type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: (Event<AN> | Event<AS>)[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AN | AS; }[]; }': error, targets
        Argument of type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: (Event<AN> | Event<ABN>)[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; }' is not assignable to parameter of type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: (Event<AN> | Event<ABN>)[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; } & { ...; }'.
          Type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: (Event<AN> | Event<ABN>)[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AN; }[]; }': error, targets
        Argument of type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: (Event<AS> | Event<AB>)[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; }' is not assignable to parameter of type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: (Event<AS> | Event<AB>)[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; } & { ...; }'.
          Type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: (Event<AS> | Event<AB>)[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AS | AB; }[]; }': error, targets
        Argument of type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: (Event<AS> | Event<ABN>)[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; }' is not assignable to parameter of type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: (Event<AS> | Event<ABN>)[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; } & { ...; }'.
          Type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: (Event<AS> | Event<ABN>)[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AS | ABN; }[]; }': error, targets
        Argument of type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: (Event<AB> | Event<ABN>)[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; }' is not assignable to parameter of type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: (Event<AB> | Event<ABN>)[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; } & { ...; }'.
          Type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: (Event<AB> | Event<ABN>)[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AB | ABN; }[]; }': error, targets
        Argument of type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: (Event<AS> | Event<AB>)[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; }' is not assignable to parameter of type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: (Event<AS> | Event<AB>)[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; } & { ...; }'.
          Type '{ source: (Store<number> | Store<string>)[]; clock: Event<number>; target: (Event<AS> | Event<AB>)[]; fn: ([a, b]: (string | number)[]) => { a: string | number; b: string | number; }; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string | number; b: string | number; }; targetType: AS | AB; }[]; }': error, targets
        "
      `)
    })
  })
  describe('source:same', () => {
    test('source:same (should pass)', () => {
      //prettier-ignore
      {
        sample({source:{a:$num}, target:[a_num]})
        sample({source:[$num]  , target:[l_num]})
        sample({source:{a:$num}, clock:num, target:[a_num]})
        sample({source:[$num]  , clock:num, target:[l_num]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Store<number>[]; target: Event<[number]>[]; }' is not assignable to parameter of type '{ source: Store<number>[]; target: Event<[number]>[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number]; }[]; }'.
          Type '{ source: Store<number>[]; target: Event<[number]>[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number]; }[]; }': error, targets
        Argument of type '{ source: Store<number>[]; clock: Event<number>; target: Event<[number]>[]; }' is not assignable to parameter of type '{ source: Store<number>[]; clock: Event<number>; target: Event<[number]>[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [...]; }[]; }'.
          Type '{ source: Store<number>[]; clock: Event<number>; target: Event<[number]>[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number]; }[]; }': error, targets
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
        sample({source:{a:$num}, clock:num, target:[a_str]              })
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[abn]                })
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[ab]                 })
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[a_num,a_str]        })
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[a_num,abn]          })
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[a_num,ab]           })
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[a_str,ab]           })
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[abn,a_str]          })
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[abn,ab]             })
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[ab,a_str]           })
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
        Argument of type '{ source: { a: Store<number>; }; target: Event<AS>[]; }' is not assignable to parameter of type '{ source: { a: Store<number>; }; target: Event<AS>[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AS; }[]; }'.
          Type '{ source: { a: Store<number>; }; target: Event<AS>[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AS; }[]; }': error, targets
        Argument of type '{ source: { a: Store<number>; }; target: Event<ABN>[]; }' is not assignable to parameter of type '{ source: { a: Store<number>; }; target: Event<ABN>[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: ABN; }[]; }'.
          Type '{ source: { a: Store<number>; }; target: Event<ABN>[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: ABN; }[]; }': error, targets
        Argument of type '{ source: { a: Store<number>; }; target: Event<AB>[]; }' is not assignable to parameter of type '{ source: { a: Store<number>; }; target: Event<AB>[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB; }[]; }'.
          Type '{ source: { a: Store<number>; }; target: Event<AB>[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB; }[]; }': error, targets
        Argument of type '{ source: { a: Store<number>; }; target: (Event<AS> | Event<AB>)[]; }' is not assignable to parameter of type '{ source: { a: Store<number>; }; target: (Event<AS> | Event<AB>)[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AS | AB; }[]; }'.
          Type '{ source: { a: Store<number>; }; target: (Event<AS> | Event<AB>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AS | AB; }[]; }': error, targets
        Argument of type '{ source: { a: Store<number>; }; target: (Event<AS> | Event<ABN>)[]; }' is not assignable to parameter of type '{ source: { a: Store<number>; }; target: (Event<AS> | Event<ABN>)[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AS | ABN; }[]; }'.
          Type '{ source: { a: Store<number>; }; target: (Event<AS> | Event<ABN>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AS | ABN; }[]; }': error, targets
        Argument of type '{ source: { a: Store<number>; }; target: (Event<AB> | Event<ABN>)[]; }' is not assignable to parameter of type '{ source: { a: Store<number>; }; target: (Event<AB> | Event<ABN>)[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB | ABN; }[]; }'.
          Type '{ source: { a: Store<number>; }; target: (Event<AB> | Event<ABN>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB | ABN; }[]; }': error, targets
        Argument of type '{ source: { a: Store<number>; }; target: (Event<AS> | Event<AB>)[]; }' is not assignable to parameter of type '{ source: { a: Store<number>; }; target: (Event<AS> | Event<AB>)[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AS | AB; }[]; }'.
          Type '{ source: { a: Store<number>; }; target: (Event<AS> | Event<AB>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AS | AB; }[]; }': error, targets
        Argument of type '{ source: Store<number>[]; target: Event<[string]>[]; }' is not assignable to parameter of type '{ source: Store<number>[]; target: Event<[string]>[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [string]; }[]; }'.
          Type '{ source: Store<number>[]; target: Event<[string]>[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [string]; }[]; }': error, targets
        Argument of type '{ source: Store<number>[]; target: Event<[number, string]>[]; }' is not assignable to parameter of type '{ source: Store<number>[]; target: Event<[number, string]>[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, string]; }[]; }'.
          Type '{ source: Store<number>[]; target: Event<[number, string]>[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, string]; }[]; }': error, targets
        Argument of type '{ source: Store<number>[]; target: Event<[number, number]>[]; }' is not assignable to parameter of type '{ source: Store<number>[]; target: Event<[number, number]>[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number]; }[]; }'.
          Type '{ source: Store<number>[]; target: Event<[number, number]>[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number]; }[]; }': error, targets
        Argument of type '{ source: Store<number>[]; target: (Event<[number]> | Event<[string]>)[]; }' is not assignable to parameter of type '{ source: Store<number>[]; target: (Event<[number]> | Event<[string]>)[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [...] | [...]; }[]; }'.
          Type '{ source: Store<number>[]; target: (Event<[number]> | Event<[string]>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [string] | [number]; }[]; }': error, targets
        Argument of type '{ source: Store<number>[]; target: (Event<[number]> | Event<[number, string]>)[]; }' is not assignable to parameter of type '{ source: Store<number>[]; target: (Event<[number]> | Event<[number, string]>)[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [...] | [...]; }[]; }'.
          Type '{ source: Store<number>[]; target: (Event<[number]> | Event<[number, string]>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, string] | [number]; }[]; }': error, targets
        Argument of type '{ source: Store<number>[]; target: (Event<[number]> | Event<[number, number]>)[]; }' is not assignable to parameter of type '{ source: Store<number>[]; target: (Event<[number]> | Event<[number, number]>)[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [...] | [...]; }[]; }'.
          Type '{ source: Store<number>[]; target: (Event<[number]> | Event<[number, number]>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number] | [number]; }[]; }': error, targets
        Argument of type '{ source: Store<number>[]; target: (Event<[string]> | Event<[number, number]>)[]; }' is not assignable to parameter of type '{ source: Store<number>[]; target: (Event<[string]> | Event<[number, number]>)[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [...] | [...]; }[]; }'.
          Type '{ source: Store<number>[]; target: (Event<[string]> | Event<[number, number]>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number] | [string]; }[]; }': error, targets
        Argument of type '{ source: Store<number>[]; target: (Event<[string]> | Event<[number, string]>)[]; }' is not assignable to parameter of type '{ source: Store<number>[]; target: (Event<[string]> | Event<[number, string]>)[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [...] | [...]; }[]; }'.
          Type '{ source: Store<number>[]; target: (Event<[string]> | Event<[number, string]>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [string] | [number, string]; }[]; }': error, targets
        Argument of type '{ source: Store<number>[]; target: (Event<[number, string]> | Event<[number, number]>)[]; }' is not assignable to parameter of type '{ source: Store<number>[]; target: (Event<[number, string]> | Event<[number, number]>)[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [...] | [...]; }[]; }'.
          Type '{ source: Store<number>[]; target: (Event<[number, string]> | Event<[number, number]>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number] | [number, string]; }[]; }': error, targets
        Argument of type '{ source: Store<number>[]; target: (Event<[string]> | Event<[number, number]>)[]; }' is not assignable to parameter of type '{ source: Store<number>[]; target: (Event<[string]> | Event<[number, number]>)[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [...] | [...]; }[]; }'.
          Type '{ source: Store<number>[]; target: (Event<[string]> | Event<[number, number]>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number] | [string]; }[]; }': error, targets
        Argument of type '{ source: { a: Store<number>; }; clock: Event<number>; target: Event<AS>[]; }' is not assignable to parameter of type '{ source: { a: Store<number>; }; clock: Event<number>; target: Event<AS>[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AS; }[]; }'.
          Type '{ source: { a: Store<number>; }; clock: Event<number>; target: Event<AS>[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AS; }[]; }': error, targets
        Argument of type '{ source: { a: Store<number>; }; clock: Event<number>; target: Event<ABN>[]; }' is not assignable to parameter of type '{ source: { a: Store<number>; }; clock: Event<number>; target: Event<ABN>[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: ABN; }[]; }'.
          Type '{ source: { a: Store<number>; }; clock: Event<number>; target: Event<ABN>[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: ABN; }[]; }': error, targets
        Argument of type '{ source: { a: Store<number>; }; clock: Event<number>; target: Event<AB>[]; }' is not assignable to parameter of type '{ source: { a: Store<number>; }; clock: Event<number>; target: Event<AB>[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB; }[]; }'.
          Type '{ source: { a: Store<number>; }; clock: Event<number>; target: Event<AB>[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB; }[]; }': error, targets
        Argument of type '{ source: { a: Store<number>; }; clock: Event<number>; target: (Event<AS> | Event<AB>)[]; }' is not assignable to parameter of type '{ source: { a: Store<number>; }; clock: Event<number>; target: (Event<AS> | Event<AB>)[]; } & { error: \\"source should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: { a: Store<number>; }; clock: Event<number>; target: (Event<AS> | Event<AB>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AS | AB; }[]; }': error, targets
        Argument of type '{ source: { a: Store<number>; }; clock: Event<number>; target: (Event<AS> | Event<ABN>)[]; }' is not assignable to parameter of type '{ source: { a: Store<number>; }; clock: Event<number>; target: (Event<AS> | Event<ABN>)[]; } & { error: \\"source should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: { a: Store<number>; }; clock: Event<number>; target: (Event<AS> | Event<ABN>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AS | ABN; }[]; }': error, targets
        Argument of type '{ source: { a: Store<number>; }; clock: Event<number>; target: (Event<AB> | Event<ABN>)[]; }' is not assignable to parameter of type '{ source: { a: Store<number>; }; clock: Event<number>; target: (Event<AB> | Event<ABN>)[]; } & { error: \\"source should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: { a: Store<number>; }; clock: Event<number>; target: (Event<AB> | Event<ABN>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB | ABN; }[]; }': error, targets
        Argument of type '{ source: { a: Store<number>; }; clock: Event<number>; target: (Event<AS> | Event<AB>)[]; }' is not assignable to parameter of type '{ source: { a: Store<number>; }; clock: Event<number>; target: (Event<AS> | Event<AB>)[]; } & { error: \\"source should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: { a: Store<number>; }; clock: Event<number>; target: (Event<AS> | Event<AB>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AS | AB; }[]; }': error, targets
        Argument of type '{ source: Store<number>[]; clock: Event<number>; target: Event<[string]>[]; }' is not assignable to parameter of type '{ source: Store<number>[]; clock: Event<number>; target: Event<[string]>[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [...]; }[]; }'.
          Type '{ source: Store<number>[]; clock: Event<number>; target: Event<[string]>[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [string]; }[]; }': error, targets
        Argument of type '{ source: Store<number>[]; clock: Event<number>; target: Event<[number, string]>[]; }' is not assignable to parameter of type '{ source: Store<number>[]; clock: Event<number>; target: Event<[number, string]>[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [...]; }[]; }'.
          Type '{ source: Store<number>[]; clock: Event<number>; target: Event<[number, string]>[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, string]; }[]; }': error, targets
        Argument of type '{ source: Store<number>[]; clock: Event<number>; target: Event<[number, number]>[]; }' is not assignable to parameter of type '{ source: Store<number>[]; clock: Event<number>; target: Event<[number, number]>[]; } & { error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [...]; }[]; }'.
          Type '{ source: Store<number>[]; clock: Event<number>; target: Event<[number, number]>[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number]; }[]; }': error, targets
        Argument of type '{ source: Store<number>[]; clock: Event<number>; target: (Event<[number]> | Event<[string]>)[]; }' is not assignable to parameter of type '{ source: Store<number>[]; clock: Event<number>; target: (Event<[number]> | Event<[string]>)[]; } & { error: \\"source should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: Store<number>[]; clock: Event<number>; target: (Event<[number]> | Event<[string]>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [string] | [number]; }[]; }': error, targets
        Argument of type '{ source: Store<number>[]; clock: Event<number>; target: (Event<[number]> | Event<[number, string]>)[]; }' is not assignable to parameter of type '{ source: Store<number>[]; clock: Event<number>; target: (Event<[number]> | Event<[number, string]>)[]; } & { error: \\"source should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: Store<number>[]; clock: Event<number>; target: (Event<[number]> | Event<[number, string]>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, string] | [number]; }[]; }': error, targets
        Argument of type '{ source: Store<number>[]; clock: Event<number>; target: (Event<[number]> | Event<[number, number]>)[]; }' is not assignable to parameter of type '{ source: Store<number>[]; clock: Event<number>; target: (Event<[number]> | Event<[number, number]>)[]; } & { error: \\"source should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: Store<number>[]; clock: Event<number>; target: (Event<[number]> | Event<[number, number]>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number] | [number]; }[]; }': error, targets
        Argument of type '{ source: Store<number>[]; clock: Event<number>; target: (Event<[string]> | Event<[number, number]>)[]; }' is not assignable to parameter of type '{ source: Store<number>[]; clock: Event<number>; target: (Event<[string]> | Event<[number, number]>)[]; } & { error: \\"source should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: Store<number>[]; clock: Event<number>; target: (Event<[string]> | Event<[number, number]>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number] | [string]; }[]; }': error, targets
        Argument of type '{ source: Store<number>[]; clock: Event<number>; target: (Event<[string]> | Event<[number, string]>)[]; }' is not assignable to parameter of type '{ source: Store<number>[]; clock: Event<number>; target: (Event<[string]> | Event<[number, string]>)[]; } & { error: \\"source should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: Store<number>[]; clock: Event<number>; target: (Event<[string]> | Event<[number, string]>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [string] | [number, string]; }[]; }': error, targets
        Argument of type '{ source: Store<number>[]; clock: Event<number>; target: (Event<[number, string]> | Event<[number, number]>)[]; }' is not assignable to parameter of type '{ source: Store<number>[]; clock: Event<number>; target: (Event<[number, string]> | Event<[number, number]>)[]; } & { error: \\"source should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: Store<number>[]; clock: Event<number>; target: (Event<[number, string]> | Event<[number, number]>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number] | [number, string]; }[]; }': error, targets
        Argument of type '{ source: Store<number>[]; clock: Event<number>; target: (Event<[string]> | Event<[number, number]>)[]; }' is not assignable to parameter of type '{ source: Store<number>[]; clock: Event<number>; target: (Event<[string]> | Event<[number, number]>)[]; } & { error: \\"source should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: Store<number>[]; clock: Event<number>; target: (Event<[string]> | Event<[number, number]>)[]; }' is missing the following properties from type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number] | [string]; }[]; }': error, targets
        "
      `)
    })
  })
  describe('source:same, fn:untyped', () => {
    test('source:same, fn:untyped (should pass)', () => {
      //prettier-ignore
      {
        sample({source:{a:$num}, target:[a_num]   , fn:({a}) => ({a,b:''})})
        sample({source:{a:$num}, target:[ab]      , fn:({a}) => ({a,b:''})})
        sample({source:{a:$num}, target:[a_num,ab], fn:({a}) => ({a,b:''})})
        sample({source:[$num]  , target:[a_num]   , fn:([a]) => ({a,b:''})})
        sample({source:[$num]  , target:[ab]      , fn:([a]) => ({a,b:''})})
        sample({source:[$num]  , target:[a_num,ab], fn:([a]) => ({a,b:''})})
        sample({source:{a:$num}, clock:num, target:[a_num]   , fn:({a}) => ({a,b:''})})
        sample({source:{a:$num}, clock:num, target:[ab]      , fn:({a}) => ({a,b:''})})
        sample({source:{a:$num}, clock:num, target:[a_num,ab], fn:({a}) => ({a,b:''})})
        sample({source:[$num]  , clock:num, target:[a_num]   , fn:([a]) => ({a,b:''})})
        sample({source:[$num]  , clock:num, target:[ab]      , fn:([a]) => ({a,b:''})})
        sample({source:[$num]  , clock:num, target:[a_num,ab], fn:([a]) => ({a,b:''})})
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
        sample({source:{a:$num}, target:[a_str]      , fn:({a}) => ({a,b:''})})
        //@ts-expect-error
        sample({source:{a:$num}, target:[abn]        , fn:({a}) => ({a,b:''})})
        //@ts-expect-error
        sample({source:{a:$num}, target:[a_num,a_str], fn:({a}) => ({a,b:''})})
        //@ts-expect-error
        sample({source:{a:$num}, target:[a_num,abn]  , fn:({a}) => ({a,b:''})})
        //@ts-expect-error
        sample({source:{a:$num}, target:[a_str,ab]   , fn:({a}) => ({a,b:''})})
        //@ts-expect-error
        sample({source:{a:$num}, target:[abn,a_str]  , fn:({a}) => ({a,b:''})})
        //@ts-expect-error
        sample({source:{a:$num}, target:[abn,ab]     , fn:({a}) => ({a,b:''})})
        //@ts-expect-error
        sample({source:{a:$num}, target:[ab,a_str]   , fn:({a}) => ({a,b:''})})
        //@ts-expect-error
        sample({source:[$num]  , target:[a_str]      , fn:([a]) => ({a,b:''})})
        //@ts-expect-error
        sample({source:[$num]  , target:[abn]        , fn:([a]) => ({a,b:''})})
        //@ts-expect-error
        sample({source:[$num]  , target:[a_num,a_str], fn:([a]) => ({a,b:''})})
        //@ts-expect-error
        sample({source:[$num]  , target:[a_num,abn]  , fn:([a]) => ({a,b:''})})
        //@ts-expect-error
        sample({source:[$num]  , target:[a_str,ab]   , fn:([a]) => ({a,b:''})})
        //@ts-expect-error
        sample({source:[$num]  , target:[abn,a_str]  , fn:([a]) => ({a,b:''})})
        //@ts-expect-error
        sample({source:[$num]  , target:[abn,ab]     , fn:([a]) => ({a,b:''})})
        //@ts-expect-error
        sample({source:[$num]  , target:[ab,a_str]   , fn:([a]) => ({a,b:''})})
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[a_str]      , fn:({a}) => ({a,b:''})})
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[abn]        , fn:({a}) => ({a,b:''})})
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[a_num,a_str], fn:({a}) => ({a,b:''})})
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[a_num,abn]  , fn:({a}) => ({a,b:''})})
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[a_str,ab]   , fn:({a}) => ({a,b:''})})
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[abn,a_str]  , fn:({a}) => ({a,b:''})})
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[abn,ab]     , fn:({a}) => ({a,b:''})})
        //@ts-expect-error
        sample({source:{a:$num}, clock:num, target:[ab,a_str]   , fn:({a}) => ({a,b:''})})
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[a_str]      , fn:([a]) => ({a,b:''})})
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[abn]        , fn:([a]) => ({a,b:''})})
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[a_num,a_str], fn:([a]) => ({a,b:''})})
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[a_num,abn]  , fn:([a]) => ({a,b:''})})
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[a_str,ab]   , fn:([a]) => ({a,b:''})})
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[abn,a_str]  , fn:([a]) => ({a,b:''})})
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[abn,ab]     , fn:([a]) => ({a,b:''})})
        //@ts-expect-error
        sample({source:[$num]  , clock:num, target:[ab,a_str]   , fn:([a]) => ({a,b:''})})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: { a: Store<number>; }; target: Event<AS>[]; fn: ({ a }: { a: number; }) => { a: number; b: string; }; }' is not assignable to parameter of type '{ source: { a: Store<number>; }; target: Event<AS>[]; fn: ({ a }: { a: number; }) => { a: number; b: string; }; } & { error: \\"fn result should extend target type\\"; targets: { fnResult: { ...; }; targetType: AS; }[]; }'.
          Type '{ source: { a: Store<number>; }; target: Event<AS>[]; fn: ({ a }: { a: number; }) => { a: number; b: string; }; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS; }[]; }': error, targets
        Argument of type '{ source: { a: Store<number>; }; target: Event<ABN>[]; fn: ({ a }: { a: number; }) => { a: number; b: string; }; }' is not assignable to parameter of type '{ source: { a: Store<number>; }; target: Event<ABN>[]; fn: ({ a }: { a: number; }) => { a: number; b: string; }; } & { error: \\"fn result should extend target type\\"; targets: { fnResult: { ...; }; targetType: ABN; }[]; }'.
          Type '{ source: { a: Store<number>; }; target: Event<ABN>[]; fn: ({ a }: { a: number; }) => { a: number; b: string; }; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: ABN; }[]; }': error, targets
        Argument of type '{ source: { a: Store<number>; }; target: (Event<AS> | Event<ABN>)[]; fn: ({ a }: { a: number; }) => { a: number; b: string; }; }' is not assignable to parameter of type '{ source: { a: Store<number>; }; target: (Event<AS> | Event<ABN>)[]; fn: ({ a }: { a: number; }) => { a: number; b: string; }; } & { error: \\"fn result should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: { a: Store<number>; }; target: (Event<AS> | Event<ABN>)[]; fn: ({ a }: { a: number; }) => { a: number; b: string; }; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS | ABN; }[]; }': error, targets
        Argument of type '{ source: Store<number>[]; target: Event<AS>[]; fn: ([a]: number[]) => { a: number; b: string; }; }' is not assignable to parameter of type '{ source: Store<number>[]; target: Event<AS>[]; fn: ([a]: number[]) => { a: number; b: string; }; } & { error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS; }[]; }'.
          Type '{ source: Store<number>[]; target: Event<AS>[]; fn: ([a]: number[]) => { a: number; b: string; }; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS; }[]; }': error, targets
        Argument of type '{ source: Store<number>[]; target: Event<ABN>[]; fn: ([a]: number[]) => { a: number; b: string; }; }' is not assignable to parameter of type '{ source: Store<number>[]; target: Event<ABN>[]; fn: ([a]: number[]) => { a: number; b: string; }; } & { error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: ABN; }[]; }'.
          Type '{ source: Store<number>[]; target: Event<ABN>[]; fn: ([a]: number[]) => { a: number; b: string; }; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: ABN; }[]; }': error, targets
        Argument of type '{ source: Store<number>[]; target: (Event<AS> | Event<ABN>)[]; fn: ([a]: number[]) => { a: number; b: string; }; }' is not assignable to parameter of type '{ source: Store<number>[]; target: (Event<AS> | Event<ABN>)[]; fn: ([a]: number[]) => { a: number; b: string; }; } & { error: \\"fn result should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: Store<number>[]; target: (Event<AS> | Event<ABN>)[]; fn: ([a]: number[]) => { a: number; b: string; }; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS | ABN; }[]; }': error, targets
        Argument of type '{ source: { a: Store<number>; }; clock: Event<number>; target: Event<AS>[]; fn: ({ a }: { a: number; }) => { a: number; b: string; }; }' is not assignable to parameter of type '{ source: { a: Store<number>; }; clock: Event<number>; target: Event<AS>[]; fn: ({ a }: { a: number; }) => { a: number; b: string; }; } & { error: \\"fn result should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: { a: Store<number>; }; clock: Event<number>; target: Event<AS>[]; fn: ({ a }: { a: number; }) => { a: number; b: string; }; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS; }[]; }': error, targets
        Argument of type '{ source: { a: Store<number>; }; clock: Event<number>; target: Event<ABN>[]; fn: ({ a }: { a: number; }) => { a: number; b: string; }; }' is not assignable to parameter of type '{ source: { a: Store<number>; }; clock: Event<number>; target: Event<ABN>[]; fn: ({ a }: { a: number; }) => { a: number; b: string; }; } & { error: \\"fn result should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: { a: Store<number>; }; clock: Event<number>; target: Event<ABN>[]; fn: ({ a }: { a: number; }) => { a: number; b: string; }; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: ABN; }[]; }': error, targets
        Argument of type '{ source: { a: Store<number>; }; clock: Event<number>; target: (Event<AS> | Event<ABN>)[]; fn: ({ a }: { a: number; }) => { a: number; b: string; }; }' is not assignable to parameter of type '{ source: { a: Store<number>; }; clock: Event<number>; target: (Event<AS> | Event<ABN>)[]; fn: ({ a }: { a: number; }) => { a: number; b: string; }; } & { error: \\"fn result should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: { a: Store<number>; }; clock: Event<number>; target: (Event<AS> | Event<ABN>)[]; fn: ({ a }: { a: number; }) => { a: number; b: string; }; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS | ABN; }[]; }': error, targets
        Argument of type '{ source: Store<number>[]; clock: Event<number>; target: Event<AS>[]; fn: ([a]: number[]) => { a: number; b: string; }; }' is not assignable to parameter of type '{ source: Store<number>[]; clock: Event<number>; target: Event<AS>[]; fn: ([a]: number[]) => { a: number; b: string; }; } & { error: \\"fn result should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: Store<number>[]; clock: Event<number>; target: Event<AS>[]; fn: ([a]: number[]) => { a: number; b: string; }; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS; }[]; }': error, targets
        Argument of type '{ source: Store<number>[]; clock: Event<number>; target: Event<ABN>[]; fn: ([a]: number[]) => { a: number; b: string; }; }' is not assignable to parameter of type '{ source: Store<number>[]; clock: Event<number>; target: Event<ABN>[]; fn: ([a]: number[]) => { a: number; b: string; }; } & { error: \\"fn result should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: Store<number>[]; clock: Event<number>; target: Event<ABN>[]; fn: ([a]: number[]) => { a: number; b: string; }; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: ABN; }[]; }': error, targets
        Argument of type '{ source: Store<number>[]; clock: Event<number>; target: (Event<AS> | Event<ABN>)[]; fn: ([a]: number[]) => { a: number; b: string; }; }' is not assignable to parameter of type '{ source: Store<number>[]; clock: Event<number>; target: (Event<AS> | Event<ABN>)[]; fn: ([a]: number[]) => { a: number; b: string; }; } & { error: \\"fn result should extend target type\\"; targets: { ...; }[]; }'.
          Type '{ source: Store<number>[]; clock: Event<number>; target: (Event<AS> | Event<ABN>)[]; fn: ([a]: number[]) => { a: number; b: string; }; }' is missing the following properties from type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: AS | ABN; }[]; }': error, targets
        "
      `)
    })
  })
}
