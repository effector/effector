/* eslint-disable no-unused-vars */
import {createEvent, createEffect, sample} from 'effector'
const typecheck = '{global}'
const voidClock = createEvent<void>()
const unknownClock = createEvent<unknown>()
const anyClock = createEvent<any>()
const neverClock = createEvent<never>()
const numberClock = createEvent<number>()
const stringClock = createEvent<string>()
const syncinferred = createEffect(() => {})
const syncinferredMutable = [syncinferred]
const syncinferredReadonly: ReadonlyArray<typeof syncinferred> = [syncinferred]
const syncexplicitUnknown = createEffect<unknown, unknown>(() => {})
const syncexplicitUnknownMutable = [syncexplicitUnknown]
const syncexplicitUnknownReadonly: ReadonlyArray<typeof syncexplicitUnknown> = [
  syncexplicitUnknown,
]
const syncvoid = createEffect((value: void) => {})
const syncvoidMutable = [syncvoid]
const syncvoidReadonly: ReadonlyArray<typeof syncvoid> = [syncvoid]
const syncunknown = createEffect((value: unknown) => {})
const syncunknownMutable = [syncunknown]
const syncunknownReadonly: ReadonlyArray<typeof syncunknown> = [syncunknown]
const syncany = createEffect((value: any) => {})
const syncanyMutable = [syncany]
const syncanyReadonly: ReadonlyArray<typeof syncany> = [syncany]
const syncnever = createEffect((value: never) => {})
const syncneverMutable = [syncnever]
const syncneverReadonly: ReadonlyArray<typeof syncnever> = [syncnever]
const syncnumber = createEffect((value: number) => {})
const syncnumberMutable = [syncnumber]
const syncnumberReadonly: ReadonlyArray<typeof syncnumber> = [syncnumber]
const syncstring = createEffect((value: string) => {})
const syncstringMutable = [syncstring]
const syncstringReadonly: ReadonlyArray<typeof syncstring> = [syncstring]
const asyncinferred = createEffect(async () => {})
const asyncinferredMutable = [asyncinferred]
const asyncinferredReadonly: ReadonlyArray<typeof asyncinferred> = [
  asyncinferred,
]
const asyncexplicitUnknown = createEffect<unknown, unknown>(async () => {})
const asyncexplicitUnknownMutable = [asyncexplicitUnknown]
const asyncexplicitUnknownReadonly: ReadonlyArray<typeof asyncexplicitUnknown> =
  [asyncexplicitUnknown]
const asyncvoid = createEffect(async (value: void) => {})
const asyncvoidMutable = [asyncvoid]
const asyncvoidReadonly: ReadonlyArray<typeof asyncvoid> = [asyncvoid]
const asyncunknown = createEffect(async (value: unknown) => {})
const asyncunknownMutable = [asyncunknown]
const asyncunknownReadonly: ReadonlyArray<typeof asyncunknown> = [asyncunknown]
const asyncany = createEffect(async (value: any) => {})
const asyncanyMutable = [asyncany]
const asyncanyReadonly: ReadonlyArray<typeof asyncany> = [asyncany]
const asyncnever = createEffect(async (value: never) => {})
const asyncneverMutable = [asyncnever]
const asyncneverReadonly: ReadonlyArray<typeof asyncnever> = [asyncnever]
const asyncnumber = createEffect(async (value: number) => {})
const asyncnumberMutable = [asyncnumber]
const asyncnumberReadonly: ReadonlyArray<typeof asyncnumber> = [asyncnumber]
const asyncstring = createEffect(async (value: string) => {})
const asyncstringMutable = [asyncstring]
const asyncstringReadonly: ReadonlyArray<typeof asyncstring> = [asyncstring]
describe('single, clock, sync', () => {
  test('single, clock, sync (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , target:createEffect(() => {})                  })
      sample({clock:voidClock   , target:createEffect<unknown, unknown>(() => {})})
      sample({clock:voidClock   , target:createEffect((value: void) => {})       })
      sample({clock:voidClock   , target:createEffect((value: unknown) => {})    })
      sample({clock:voidClock   , target:createEffect((value: any) => {})        })
      sample({clock:unknownClock, target:createEffect(() => {})                  })
      sample({clock:unknownClock, target:createEffect<unknown, unknown>(() => {})})
      sample({clock:unknownClock, target:createEffect((value: void) => {})       })
      sample({clock:unknownClock, target:createEffect((value: unknown) => {})    })
      sample({clock:unknownClock, target:createEffect((value: any) => {})        })
      sample({clock:anyClock    , target:createEffect(() => {})                  })
      sample({clock:anyClock    , target:createEffect<unknown, unknown>(() => {})})
      sample({clock:anyClock    , target:createEffect((value: void) => {})       })
      sample({clock:anyClock    , target:createEffect((value: unknown) => {})    })
      sample({clock:anyClock    , target:createEffect((value: any) => {})        })
      sample({clock:anyClock    , target:createEffect((value: number) => {})     })
      sample({clock:anyClock    , target:createEffect((value: string) => {})     })
      sample({clock:neverClock  , target:createEffect(() => {})                  })
      sample({clock:neverClock  , target:createEffect<unknown, unknown>(() => {})})
      sample({clock:neverClock  , target:createEffect((value: void) => {})       })
      sample({clock:neverClock  , target:createEffect((value: unknown) => {})    })
      sample({clock:neverClock  , target:createEffect((value: any) => {})        })
      sample({clock:neverClock  , target:createEffect((value: never) => {})      })
      sample({clock:neverClock  , target:createEffect((value: number) => {})     })
      sample({clock:neverClock  , target:createEffect((value: string) => {})     })
      sample({clock:numberClock , target:createEffect(() => {})                  })
      sample({clock:numberClock , target:createEffect<unknown, unknown>(() => {})})
      sample({clock:numberClock , target:createEffect((value: void) => {})       })
      sample({clock:numberClock , target:createEffect((value: unknown) => {})    })
      sample({clock:numberClock , target:createEffect((value: any) => {})        })
      sample({clock:numberClock , target:createEffect((value: number) => {})     })
      sample({clock:stringClock , target:createEffect(() => {})                  })
      sample({clock:stringClock , target:createEffect<unknown, unknown>(() => {})})
      sample({clock:stringClock , target:createEffect((value: void) => {})       })
      sample({clock:stringClock , target:createEffect((value: unknown) => {})    })
      sample({clock:stringClock , target:createEffect((value: any) => {})        })
      sample({clock:stringClock , target:createEffect((value: string) => {})     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('single, clock, sync (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: createEffect((value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: createEffect((value: number) => {}),
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: createEffect((value: string) => {}),
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: createEffect((value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: createEffect((value: number) => {}),
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: createEffect((value: string) => {}),
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        target: createEffect((value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        target: createEffect((value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        target: createEffect((value: string) => {}),
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        target: createEffect((value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        target: createEffect((value: number) => {}),
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 7 'target: createEffect((value: never) => {}),'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 25 'target: createEffect((value: never) => {}),'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 31 'target: createEffect((value: number) => {}),'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 37 'target: createEffect((value: string) => {}),'
      Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'any' is not assignable to type 'never'.
      lack of expected error at test line 43 'target: createEffect((value: never) => {}),'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 49 'target: createEffect((value: never) => {}),'
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 61 'target: createEffect((value: never) => {}),'
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('single, source, sync', () => {
  test('single, source, sync (should pass)', () => {
    //prettier-ignore
    {
      sample({source:voidClock   , target:createEffect(() => {})                  })
      sample({source:voidClock   , target:createEffect<unknown, unknown>(() => {})})
      sample({source:voidClock   , target:createEffect((value: void) => {})       })
      sample({source:voidClock   , target:createEffect((value: unknown) => {})    })
      sample({source:voidClock   , target:createEffect((value: any) => {})        })
      sample({source:unknownClock, target:createEffect(() => {})                  })
      sample({source:unknownClock, target:createEffect<unknown, unknown>(() => {})})
      sample({source:unknownClock, target:createEffect((value: void) => {})       })
      sample({source:unknownClock, target:createEffect((value: unknown) => {})    })
      sample({source:unknownClock, target:createEffect((value: any) => {})        })
      sample({source:anyClock    , target:createEffect(() => {})                  })
      sample({source:anyClock    , target:createEffect<unknown, unknown>(() => {})})
      sample({source:anyClock    , target:createEffect((value: void) => {})       })
      sample({source:anyClock    , target:createEffect((value: unknown) => {})    })
      sample({source:anyClock    , target:createEffect((value: any) => {})        })
      sample({source:anyClock    , target:createEffect((value: number) => {})     })
      sample({source:anyClock    , target:createEffect((value: string) => {})     })
      sample({source:neverClock  , target:createEffect(() => {})                  })
      sample({source:neverClock  , target:createEffect<unknown, unknown>(() => {})})
      sample({source:neverClock  , target:createEffect((value: void) => {})       })
      sample({source:neverClock  , target:createEffect((value: unknown) => {})    })
      sample({source:neverClock  , target:createEffect((value: any) => {})        })
      sample({source:neverClock  , target:createEffect((value: never) => {})      })
      sample({source:neverClock  , target:createEffect((value: number) => {})     })
      sample({source:neverClock  , target:createEffect((value: string) => {})     })
      sample({source:numberClock , target:createEffect(() => {})                  })
      sample({source:numberClock , target:createEffect<unknown, unknown>(() => {})})
      sample({source:numberClock , target:createEffect((value: void) => {})       })
      sample({source:numberClock , target:createEffect((value: unknown) => {})    })
      sample({source:numberClock , target:createEffect((value: any) => {})        })
      sample({source:numberClock , target:createEffect((value: number) => {})     })
      sample({source:stringClock , target:createEffect(() => {})                  })
      sample({source:stringClock , target:createEffect<unknown, unknown>(() => {})})
      sample({source:stringClock , target:createEffect((value: void) => {})       })
      sample({source:stringClock , target:createEffect((value: unknown) => {})    })
      sample({source:stringClock , target:createEffect((value: any) => {})        })
      sample({source:stringClock , target:createEffect((value: string) => {})     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('single, source, sync (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: createEffect((value: never) => {}),
      })
      sample({
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: createEffect((value: number) => {}),
      })
      sample({
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: createEffect((value: string) => {}),
      })
      sample({
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: createEffect((value: never) => {}),
      })
      sample({
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: createEffect((value: number) => {}),
      })
      sample({
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: createEffect((value: string) => {}),
      })
      sample({
        //@ts-expect-error
        source: anyClock,
        //@ts-expect-error
        target: createEffect((value: never) => {}),
      })
      sample({
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: createEffect((value: never) => {}),
      })
      sample({
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: createEffect((value: string) => {}),
      })
      sample({
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: createEffect((value: never) => {}),
      })
      sample({
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: createEffect((value: number) => {}),
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 7 'target: createEffect((value: never) => {}),'
      lack of expected error at test line 11 'source: voidClock,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 17 'source: voidClock,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 25 'target: createEffect((value: never) => {}),'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 31 'target: createEffect((value: number) => {}),'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 37 'target: createEffect((value: string) => {}),'
      lack of expected error at test line 41 'source: anyClock,'
      lack of expected error at test line 43 'target: createEffect((value: never) => {}),'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 49 'target: createEffect((value: never) => {}),'
      lack of expected error at test line 53 'source: numberClock,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 61 'target: createEffect((value: never) => {}),'
      lack of expected error at test line 65 'source: stringClock,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('single, both, sync', () => {
  test('single, both, sync (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , source:voidClock   , target:createEffect(() => {})                  })
      sample({clock:voidClock   , source:voidClock   , target:createEffect<unknown, unknown>(() => {})})
      sample({clock:voidClock   , source:voidClock   , target:createEffect((value: void) => {})       })
      sample({clock:voidClock   , source:voidClock   , target:createEffect((value: unknown) => {})    })
      sample({clock:voidClock   , source:voidClock   , target:createEffect((value: any) => {})        })
      sample({clock:unknownClock, source:unknownClock, target:createEffect(() => {})                  })
      sample({clock:unknownClock, source:unknownClock, target:createEffect<unknown, unknown>(() => {})})
      sample({clock:unknownClock, source:unknownClock, target:createEffect((value: void) => {})       })
      sample({clock:unknownClock, source:unknownClock, target:createEffect((value: unknown) => {})    })
      sample({clock:unknownClock, source:unknownClock, target:createEffect((value: any) => {})        })
      sample({clock:anyClock    , source:anyClock    , target:createEffect(() => {})                  })
      sample({clock:anyClock    , source:anyClock    , target:createEffect<unknown, unknown>(() => {})})
      sample({clock:anyClock    , source:anyClock    , target:createEffect((value: void) => {})       })
      sample({clock:anyClock    , source:anyClock    , target:createEffect((value: unknown) => {})    })
      sample({clock:anyClock    , source:anyClock    , target:createEffect((value: any) => {})        })
      sample({clock:anyClock    , source:anyClock    , target:createEffect((value: number) => {})     })
      sample({clock:anyClock    , source:anyClock    , target:createEffect((value: string) => {})     })
      sample({clock:neverClock  , source:neverClock  , target:createEffect(() => {})                  })
      sample({clock:neverClock  , source:neverClock  , target:createEffect<unknown, unknown>(() => {})})
      sample({clock:neverClock  , source:neverClock  , target:createEffect((value: void) => {})       })
      sample({clock:neverClock  , source:neverClock  , target:createEffect((value: unknown) => {})    })
      sample({clock:neverClock  , source:neverClock  , target:createEffect((value: any) => {})        })
      sample({clock:neverClock  , source:neverClock  , target:createEffect((value: never) => {})      })
      sample({clock:neverClock  , source:neverClock  , target:createEffect((value: number) => {})     })
      sample({clock:neverClock  , source:neverClock  , target:createEffect((value: string) => {})     })
      sample({clock:numberClock , source:numberClock , target:createEffect(() => {})                  })
      sample({clock:numberClock , source:numberClock , target:createEffect<unknown, unknown>(() => {})})
      sample({clock:numberClock , source:numberClock , target:createEffect((value: void) => {})       })
      sample({clock:numberClock , source:numberClock , target:createEffect((value: unknown) => {})    })
      sample({clock:numberClock , source:numberClock , target:createEffect((value: any) => {})        })
      sample({clock:numberClock , source:numberClock , target:createEffect((value: number) => {})     })
      sample({clock:stringClock , source:stringClock , target:createEffect(() => {})                  })
      sample({clock:stringClock , source:stringClock , target:createEffect<unknown, unknown>(() => {})})
      sample({clock:stringClock , source:stringClock , target:createEffect((value: void) => {})       })
      sample({clock:stringClock , source:stringClock , target:createEffect((value: unknown) => {})    })
      sample({clock:stringClock , source:stringClock , target:createEffect((value: any) => {})        })
      sample({clock:stringClock , source:stringClock , target:createEffect((value: string) => {})     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('single, both, sync (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: createEffect((value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: createEffect((value: number) => {}),
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: createEffect((value: string) => {}),
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: createEffect((value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: createEffect((value: number) => {}),
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: createEffect((value: string) => {}),
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        source: anyClock,
        //@ts-expect-error
        target: createEffect((value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: createEffect((value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: createEffect((value: string) => {}),
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: createEffect((value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: createEffect((value: number) => {}),
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      lack of expected error at test line 5 'clock: voidClock,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 9 'target: createEffect((value: never) => {}),'
      lack of expected error at test line 13 'clock: voidClock,'
      lack of expected error at test line 15 'source: voidClock,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 21 'clock: voidClock,'
      lack of expected error at test line 23 'source: voidClock,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      lack of expected error at test line 29 'clock: unknownClock,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 33 'target: createEffect((value: never) => {}),'
      lack of expected error at test line 37 'clock: unknownClock,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 41 'target: createEffect((value: number) => {}),'
      lack of expected error at test line 45 'clock: unknownClock,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 49 'target: createEffect((value: string) => {}),'
      lack of expected error at test line 53 'clock: anyClock,'
      lack of expected error at test line 55 'source: anyClock,'
      lack of expected error at test line 57 'target: createEffect((value: never) => {}),'
      lack of expected error at test line 61 'clock: numberClock,'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 65 'target: createEffect((value: never) => {}),'
      lack of expected error at test line 69 'clock: numberClock,'
      lack of expected error at test line 71 'source: numberClock,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 77 'clock: stringClock,'
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 81 'target: createEffect((value: never) => {}),'
      lack of expected error at test line 85 'clock: stringClock,'
      lack of expected error at test line 87 'source: stringClock,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('single, Boolean, sync', () => {
  test('single, Boolean, sync (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , filter:Boolean, target:createEffect(() => {})                  })
      sample({clock:voidClock   , filter:Boolean, target:createEffect<unknown, unknown>(() => {})})
      sample({clock:voidClock   , filter:Boolean, target:createEffect((value: void) => {})       })
      sample({clock:voidClock   , filter:Boolean, target:createEffect((value: unknown) => {})    })
      sample({clock:voidClock   , filter:Boolean, target:createEffect((value: any) => {})        })
      sample({clock:unknownClock, filter:Boolean, target:createEffect(() => {})                  })
      sample({clock:unknownClock, filter:Boolean, target:createEffect<unknown, unknown>(() => {})})
      sample({clock:unknownClock, filter:Boolean, target:createEffect((value: void) => {})       })
      sample({clock:unknownClock, filter:Boolean, target:createEffect((value: unknown) => {})    })
      sample({clock:unknownClock, filter:Boolean, target:createEffect((value: any) => {})        })
      sample({clock:anyClock    , filter:Boolean, target:createEffect(() => {})                  })
      sample({clock:anyClock    , filter:Boolean, target:createEffect<unknown, unknown>(() => {})})
      sample({clock:anyClock    , filter:Boolean, target:createEffect((value: void) => {})       })
      sample({clock:anyClock    , filter:Boolean, target:createEffect((value: unknown) => {})    })
      sample({clock:anyClock    , filter:Boolean, target:createEffect((value: any) => {})        })
      sample({clock:anyClock    , filter:Boolean, target:createEffect((value: number) => {})     })
      sample({clock:anyClock    , filter:Boolean, target:createEffect((value: string) => {})     })
      sample({clock:neverClock  , filter:Boolean, target:createEffect(() => {})                  })
      sample({clock:neverClock  , filter:Boolean, target:createEffect<unknown, unknown>(() => {})})
      sample({clock:neverClock  , filter:Boolean, target:createEffect((value: void) => {})       })
      sample({clock:neverClock  , filter:Boolean, target:createEffect((value: unknown) => {})    })
      sample({clock:neverClock  , filter:Boolean, target:createEffect((value: any) => {})        })
      sample({clock:neverClock  , filter:Boolean, target:createEffect((value: never) => {})      })
      sample({clock:neverClock  , filter:Boolean, target:createEffect((value: number) => {})     })
      sample({clock:neverClock  , filter:Boolean, target:createEffect((value: string) => {})     })
      sample({clock:numberClock , filter:Boolean, target:createEffect(() => {})                  })
      sample({clock:numberClock , filter:Boolean, target:createEffect<unknown, unknown>(() => {})})
      sample({clock:numberClock , filter:Boolean, target:createEffect((value: void) => {})       })
      sample({clock:numberClock , filter:Boolean, target:createEffect((value: unknown) => {})    })
      sample({clock:numberClock , filter:Boolean, target:createEffect((value: any) => {})        })
      sample({clock:numberClock , filter:Boolean, target:createEffect((value: number) => {})     })
      sample({clock:stringClock , filter:Boolean, target:createEffect(() => {})                  })
      sample({clock:stringClock , filter:Boolean, target:createEffect<unknown, unknown>(() => {})})
      sample({clock:stringClock , filter:Boolean, target:createEffect((value: void) => {})       })
      sample({clock:stringClock , filter:Boolean, target:createEffect((value: unknown) => {})    })
      sample({clock:stringClock , filter:Boolean, target:createEffect((value: any) => {})        })
      sample({clock:stringClock , filter:Boolean, target:createEffect((value: string) => {})     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('single, Boolean, sync (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: createEffect((value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: createEffect((value: number) => {}),
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: createEffect((value: string) => {}),
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: createEffect((value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: createEffect((value: number) => {}),
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: createEffect((value: string) => {}),
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: createEffect((value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: createEffect((value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: createEffect((value: string) => {}),
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: createEffect((value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: createEffect((value: number) => {}),
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 7 'filter: Boolean,'
      lack of expected error at test line 9 'target: createEffect((value: never) => {}),'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      lack of expected error at test line 15 'filter: Boolean,'
      Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      lack of expected error at test line 23 'filter: Boolean,'
      Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 31 'filter: Boolean,'
      lack of expected error at test line 33 'target: createEffect((value: never) => {}),'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 39 'filter: Boolean,'
      lack of expected error at test line 41 'target: createEffect((value: number) => {}),'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 47 'filter: Boolean,'
      lack of expected error at test line 49 'target: createEffect((value: string) => {}),'
      Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'any' is not assignable to type 'never'.
      lack of expected error at test line 55 'filter: Boolean,'
      lack of expected error at test line 57 'target: createEffect((value: never) => {}),'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 63 'filter: Boolean,'
      lack of expected error at test line 65 'target: createEffect((value: never) => {}),'
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      lack of expected error at test line 71 'filter: Boolean,'
      Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 79 'filter: Boolean,'
      lack of expected error at test line 81 'target: createEffect((value: never) => {}),'
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 87 'filter: Boolean,'
      Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('single, filter, sync', () => {
  test('single, filter, sync (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , filter:() => true, target:createEffect(() => {})                  })
      sample({clock:voidClock   , filter:() => true, target:createEffect<unknown, unknown>(() => {})})
      sample({clock:voidClock   , filter:() => true, target:createEffect((value: void) => {})       })
      sample({clock:voidClock   , filter:() => true, target:createEffect((value: unknown) => {})    })
      sample({clock:voidClock   , filter:() => true, target:createEffect((value: any) => {})        })
      sample({clock:unknownClock, filter:() => true, target:createEffect(() => {})                  })
      sample({clock:unknownClock, filter:() => true, target:createEffect<unknown, unknown>(() => {})})
      sample({clock:unknownClock, filter:() => true, target:createEffect((value: void) => {})       })
      sample({clock:unknownClock, filter:() => true, target:createEffect((value: unknown) => {})    })
      sample({clock:unknownClock, filter:() => true, target:createEffect((value: any) => {})        })
      sample({clock:anyClock    , filter:() => true, target:createEffect(() => {})                  })
      sample({clock:anyClock    , filter:() => true, target:createEffect<unknown, unknown>(() => {})})
      sample({clock:anyClock    , filter:() => true, target:createEffect((value: void) => {})       })
      sample({clock:anyClock    , filter:() => true, target:createEffect((value: unknown) => {})    })
      sample({clock:anyClock    , filter:() => true, target:createEffect((value: any) => {})        })
      sample({clock:anyClock    , filter:() => true, target:createEffect((value: number) => {})     })
      sample({clock:anyClock    , filter:() => true, target:createEffect((value: string) => {})     })
      sample({clock:neverClock  , filter:() => true, target:createEffect(() => {})                  })
      sample({clock:neverClock  , filter:() => true, target:createEffect<unknown, unknown>(() => {})})
      sample({clock:neverClock  , filter:() => true, target:createEffect((value: void) => {})       })
      sample({clock:neverClock  , filter:() => true, target:createEffect((value: unknown) => {})    })
      sample({clock:neverClock  , filter:() => true, target:createEffect((value: any) => {})        })
      sample({clock:neverClock  , filter:() => true, target:createEffect((value: never) => {})      })
      sample({clock:neverClock  , filter:() => true, target:createEffect((value: number) => {})     })
      sample({clock:neverClock  , filter:() => true, target:createEffect((value: string) => {})     })
      sample({clock:numberClock , filter:() => true, target:createEffect(() => {})                  })
      sample({clock:numberClock , filter:() => true, target:createEffect<unknown, unknown>(() => {})})
      sample({clock:numberClock , filter:() => true, target:createEffect((value: void) => {})       })
      sample({clock:numberClock , filter:() => true, target:createEffect((value: unknown) => {})    })
      sample({clock:numberClock , filter:() => true, target:createEffect((value: any) => {})        })
      sample({clock:numberClock , filter:() => true, target:createEffect((value: number) => {})     })
      sample({clock:stringClock , filter:() => true, target:createEffect(() => {})                  })
      sample({clock:stringClock , filter:() => true, target:createEffect<unknown, unknown>(() => {})})
      sample({clock:stringClock , filter:() => true, target:createEffect((value: void) => {})       })
      sample({clock:stringClock , filter:() => true, target:createEffect((value: unknown) => {})    })
      sample({clock:stringClock , filter:() => true, target:createEffect((value: any) => {})        })
      sample({clock:stringClock , filter:() => true, target:createEffect((value: string) => {})     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('single, filter, sync (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: createEffect((value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: createEffect((value: number) => {}),
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: createEffect((value: string) => {}),
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: createEffect((value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: createEffect((value: number) => {}),
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: createEffect((value: string) => {}),
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: createEffect((value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: createEffect((value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: createEffect((value: string) => {}),
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: createEffect((value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: createEffect((value: number) => {}),
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 7 'filter: () => true,'
      lack of expected error at test line 9 'target: createEffect((value: never) => {}),'
      lack of expected error at test line 13 'clock: voidClock,'
      lack of expected error at test line 15 'filter: () => true,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 21 'clock: voidClock,'
      lack of expected error at test line 23 'filter: () => true,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 31 'filter: () => true,'
      lack of expected error at test line 33 'target: createEffect((value: never) => {}),'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 39 'filter: () => true,'
      lack of expected error at test line 41 'target: createEffect((value: number) => {}),'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 47 'filter: () => true,'
      lack of expected error at test line 49 'target: createEffect((value: string) => {}),'
      lack of expected error at test line 53 'clock: anyClock,'
      lack of expected error at test line 55 'filter: () => true,'
      lack of expected error at test line 57 'target: createEffect((value: never) => {}),'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 63 'filter: () => true,'
      lack of expected error at test line 65 'target: createEffect((value: never) => {}),'
      lack of expected error at test line 69 'clock: numberClock,'
      lack of expected error at test line 71 'filter: () => true,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 79 'filter: () => true,'
      lack of expected error at test line 81 'target: createEffect((value: never) => {}),'
      lack of expected error at test line 85 'clock: stringClock,'
      lack of expected error at test line 87 'filter: () => true,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('single, fn, sync', () => {
  test('single, fn, sync (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , fn:(value: void) => value   , target:createEffect(() => {})                  })
      sample({clock:voidClock   , fn:(value: void) => value   , target:createEffect<unknown, unknown>(() => {})})
      sample({clock:voidClock   , fn:(value: void) => value   , target:createEffect((value: void) => {})       })
      sample({clock:voidClock   , fn:(value: void) => value   , target:createEffect((value: unknown) => {})    })
      sample({clock:voidClock   , fn:(value: void) => value   , target:createEffect((value: any) => {})        })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:createEffect(() => {})                  })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:createEffect<unknown, unknown>(() => {})})
      sample({clock:unknownClock, fn:(value: unknown) => value, target:createEffect((value: void) => {})       })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:createEffect((value: unknown) => {})    })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:createEffect((value: any) => {})        })
      sample({clock:anyClock    , fn:(value: any) => value    , target:createEffect(() => {})                  })
      sample({clock:anyClock    , fn:(value: any) => value    , target:createEffect<unknown, unknown>(() => {})})
      sample({clock:anyClock    , fn:(value: any) => value    , target:createEffect((value: void) => {})       })
      sample({clock:anyClock    , fn:(value: any) => value    , target:createEffect((value: unknown) => {})    })
      sample({clock:anyClock    , fn:(value: any) => value    , target:createEffect((value: any) => {})        })
      sample({clock:anyClock    , fn:(value: any) => value    , target:createEffect((value: number) => {})     })
      sample({clock:anyClock    , fn:(value: any) => value    , target:createEffect((value: string) => {})     })
      sample({clock:neverClock  , fn:(value: never) => value  , target:createEffect(() => {})                  })
      sample({clock:neverClock  , fn:(value: never) => value  , target:createEffect<unknown, unknown>(() => {})})
      sample({clock:neverClock  , fn:(value: never) => value  , target:createEffect((value: void) => {})       })
      sample({clock:neverClock  , fn:(value: never) => value  , target:createEffect((value: unknown) => {})    })
      sample({clock:neverClock  , fn:(value: never) => value  , target:createEffect((value: any) => {})        })
      sample({clock:neverClock  , fn:(value: never) => value  , target:createEffect((value: never) => {})      })
      sample({clock:neverClock  , fn:(value: never) => value  , target:createEffect((value: number) => {})     })
      sample({clock:neverClock  , fn:(value: never) => value  , target:createEffect((value: string) => {})     })
      sample({clock:numberClock , fn:(value: number) => value , target:createEffect(() => {})                  })
      sample({clock:numberClock , fn:(value: number) => value , target:createEffect<unknown, unknown>(() => {})})
      sample({clock:numberClock , fn:(value: number) => value , target:createEffect((value: void) => {})       })
      sample({clock:numberClock , fn:(value: number) => value , target:createEffect((value: unknown) => {})    })
      sample({clock:numberClock , fn:(value: number) => value , target:createEffect((value: any) => {})        })
      sample({clock:numberClock , fn:(value: number) => value , target:createEffect((value: number) => {})     })
      sample({clock:stringClock , fn:(value: string) => value , target:createEffect(() => {})                  })
      sample({clock:stringClock , fn:(value: string) => value , target:createEffect<unknown, unknown>(() => {})})
      sample({clock:stringClock , fn:(value: string) => value , target:createEffect((value: void) => {})       })
      sample({clock:stringClock , fn:(value: string) => value , target:createEffect((value: unknown) => {})    })
      sample({clock:stringClock , fn:(value: string) => value , target:createEffect((value: any) => {})        })
      sample({clock:stringClock , fn:(value: string) => value , target:createEffect((value: string) => {})     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('single, fn, sync (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        fn: (value: void) => value,
        //@ts-expect-error
        target: createEffect((value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        fn: (value: void) => value,
        //@ts-expect-error
        target: createEffect((value: number) => {}),
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        fn: (value: void) => value,
        //@ts-expect-error
        target: createEffect((value: string) => {}),
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        fn: (value: unknown) => value,
        //@ts-expect-error
        target: createEffect((value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        fn: (value: unknown) => value,
        //@ts-expect-error
        target: createEffect((value: number) => {}),
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        fn: (value: unknown) => value,
        //@ts-expect-error
        target: createEffect((value: string) => {}),
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        fn: (value: any) => value,
        //@ts-expect-error
        target: createEffect((value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        fn: (value: number) => value,
        //@ts-expect-error
        target: createEffect((value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        fn: (value: number) => value,
        //@ts-expect-error
        target: createEffect((value: string) => {}),
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        fn: (value: string) => value,
        //@ts-expect-error
        target: createEffect((value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        fn: (value: string) => value,
        //@ts-expect-error
        target: createEffect((value: number) => {}),
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value?: void | undefined) => void; target: Unit<void>; error: \\"fn result should extend target type\\"; }'.
      lack of expected error at test line 7 'fn: (value: void) => value,'
      lack of expected error at test line 9 'target: createEffect((value: never) => {}),'
      lack of expected error at test line 13 'clock: voidClock,'
      Type '(value: void) => void' is not assignable to type '(value?: void | undefined) => number'.
        Type 'void' is not assignable to type 'number'.
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 21 'clock: voidClock,'
      Type '(value: void) => void' is not assignable to type '(value?: void | undefined) => string'.
        Type 'void' is not assignable to type 'string'.
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value: unknown) => unknown; target: Unit<unknown>; error: \\"fn result should extend target type\\"; }'.
      lack of expected error at test line 31 'fn: (value: unknown) => value,'
      lack of expected error at test line 33 'target: createEffect((value: never) => {}),'
      lack of expected error at test line 37 'clock: unknownClock,'
      Type '(value: unknown) => unknown' is not assignable to type '(value: unknown) => number'.
        Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 41 'target: createEffect((value: number) => {}),'
      lack of expected error at test line 45 'clock: unknownClock,'
      Type '(value: unknown) => unknown' is not assignable to type '(value: unknown) => string'.
        Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 49 'target: createEffect((value: string) => {}),'
      lack of expected error at test line 53 'clock: anyClock,'
      lack of expected error at test line 55 'fn: (value: any) => value,'
      lack of expected error at test line 57 'target: createEffect((value: never) => {}),'
      Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value: number) => number; target: Unit<number>; error: \\"fn result should extend target type\\"; }'.
      lack of expected error at test line 63 'fn: (value: number) => value,'
      lack of expected error at test line 65 'target: createEffect((value: never) => {}),'
      lack of expected error at test line 69 'clock: numberClock,'
      Type '(value: number) => number' is not assignable to type '(value: number) => string'.
        Type 'number' is not assignable to type 'string'.
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value: string) => string; target: Unit<string>; error: \\"fn result should extend target type\\"; }'.
      lack of expected error at test line 79 'fn: (value: string) => value,'
      lack of expected error at test line 81 'target: createEffect((value: never) => {}),'
      lack of expected error at test line 85 'clock: stringClock,'
      Type '(value: string) => string' is not assignable to type '(value: string) => number'.
        Type 'string' is not assignable to type 'number'.
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('inline, clock, sync', () => {
  test('inline, clock, sync (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , target:[createEffect(() => {})]                  })
      sample({clock:voidClock   , target:[createEffect<unknown, unknown>(() => {})]})
      sample({clock:voidClock   , target:[createEffect((value: void) => {})]       })
      sample({clock:voidClock   , target:[createEffect((value: unknown) => {})]    })
      sample({clock:voidClock   , target:[createEffect((value: any) => {})]        })
      sample({clock:unknownClock, target:[createEffect(() => {})]                  })
      sample({clock:unknownClock, target:[createEffect<unknown, unknown>(() => {})]})
      sample({clock:unknownClock, target:[createEffect((value: void) => {})]       })
      sample({clock:unknownClock, target:[createEffect((value: unknown) => {})]    })
      sample({clock:unknownClock, target:[createEffect((value: any) => {})]        })
      sample({clock:anyClock    , target:[createEffect(() => {})]                  })
      sample({clock:anyClock    , target:[createEffect<unknown, unknown>(() => {})]})
      sample({clock:anyClock    , target:[createEffect((value: void) => {})]       })
      sample({clock:anyClock    , target:[createEffect((value: unknown) => {})]    })
      sample({clock:anyClock    , target:[createEffect((value: any) => {})]        })
      sample({clock:anyClock    , target:[createEffect((value: number) => {})]     })
      sample({clock:anyClock    , target:[createEffect((value: string) => {})]     })
      sample({clock:neverClock  , target:[createEffect(() => {})]                  })
      sample({clock:neverClock  , target:[createEffect<unknown, unknown>(() => {})]})
      sample({clock:neverClock  , target:[createEffect((value: void) => {})]       })
      sample({clock:neverClock  , target:[createEffect((value: unknown) => {})]    })
      sample({clock:neverClock  , target:[createEffect((value: any) => {})]        })
      sample({clock:neverClock  , target:[createEffect((value: never) => {})]      })
      sample({clock:neverClock  , target:[createEffect((value: number) => {})]     })
      sample({clock:neverClock  , target:[createEffect((value: string) => {})]     })
      sample({clock:numberClock , target:[createEffect(() => {})]                  })
      sample({clock:numberClock , target:[createEffect<unknown, unknown>(() => {})]})
      sample({clock:numberClock , target:[createEffect((value: void) => {})]       })
      sample({clock:numberClock , target:[createEffect((value: unknown) => {})]    })
      sample({clock:numberClock , target:[createEffect((value: any) => {})]        })
      sample({clock:numberClock , target:[createEffect((value: number) => {})]     })
      sample({clock:stringClock , target:[createEffect(() => {})]                  })
      sample({clock:stringClock , target:[createEffect<unknown, unknown>(() => {})]})
      sample({clock:stringClock , target:[createEffect((value: void) => {})]       })
      sample({clock:stringClock , target:[createEffect((value: unknown) => {})]    })
      sample({clock:stringClock , target:[createEffect((value: any) => {})]        })
      sample({clock:stringClock , target:[createEffect((value: string) => {})]     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('inline, clock, sync (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: [createEffect((value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: [createEffect((value: number) => {})],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: [createEffect((value: string) => {})],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: [createEffect((value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: [createEffect((value: number) => {})],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: [createEffect((value: string) => {})],
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        target: [createEffect((value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        target: [createEffect((value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        target: [createEffect((value: string) => {})],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        target: [createEffect((value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        target: [createEffect((value: number) => {})],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 7 'target: [createEffect((value: never) => {})],'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 25 'target: [createEffect((value: never) => {})],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 31 'target: [createEffect((value: number) => {})],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 37 'target: [createEffect((value: string) => {})],'
      Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'any' is not assignable to type 'never'.
      lack of expected error at test line 43 'target: [createEffect((value: never) => {})],'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 49 'target: [createEffect((value: never) => {})],'
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 61 'target: [createEffect((value: never) => {})],'
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('inline, source, sync', () => {
  test('inline, source, sync (should pass)', () => {
    //prettier-ignore
    {
      sample({source:voidClock   , target:[createEffect(() => {})]                  })
      sample({source:voidClock   , target:[createEffect<unknown, unknown>(() => {})]})
      sample({source:voidClock   , target:[createEffect((value: void) => {})]       })
      sample({source:voidClock   , target:[createEffect((value: unknown) => {})]    })
      sample({source:voidClock   , target:[createEffect((value: any) => {})]        })
      sample({source:unknownClock, target:[createEffect(() => {})]                  })
      sample({source:unknownClock, target:[createEffect<unknown, unknown>(() => {})]})
      sample({source:unknownClock, target:[createEffect((value: void) => {})]       })
      sample({source:unknownClock, target:[createEffect((value: unknown) => {})]    })
      sample({source:unknownClock, target:[createEffect((value: any) => {})]        })
      sample({source:anyClock    , target:[createEffect(() => {})]                  })
      sample({source:anyClock    , target:[createEffect<unknown, unknown>(() => {})]})
      sample({source:anyClock    , target:[createEffect((value: void) => {})]       })
      sample({source:anyClock    , target:[createEffect((value: unknown) => {})]    })
      sample({source:anyClock    , target:[createEffect((value: any) => {})]        })
      sample({source:anyClock    , target:[createEffect((value: number) => {})]     })
      sample({source:anyClock    , target:[createEffect((value: string) => {})]     })
      sample({source:neverClock  , target:[createEffect(() => {})]                  })
      sample({source:neverClock  , target:[createEffect<unknown, unknown>(() => {})]})
      sample({source:neverClock  , target:[createEffect((value: void) => {})]       })
      sample({source:neverClock  , target:[createEffect((value: unknown) => {})]    })
      sample({source:neverClock  , target:[createEffect((value: any) => {})]        })
      sample({source:neverClock  , target:[createEffect((value: never) => {})]      })
      sample({source:neverClock  , target:[createEffect((value: number) => {})]     })
      sample({source:neverClock  , target:[createEffect((value: string) => {})]     })
      sample({source:numberClock , target:[createEffect(() => {})]                  })
      sample({source:numberClock , target:[createEffect<unknown, unknown>(() => {})]})
      sample({source:numberClock , target:[createEffect((value: void) => {})]       })
      sample({source:numberClock , target:[createEffect((value: unknown) => {})]    })
      sample({source:numberClock , target:[createEffect((value: any) => {})]        })
      sample({source:numberClock , target:[createEffect((value: number) => {})]     })
      sample({source:stringClock , target:[createEffect(() => {})]                  })
      sample({source:stringClock , target:[createEffect<unknown, unknown>(() => {})]})
      sample({source:stringClock , target:[createEffect((value: void) => {})]       })
      sample({source:stringClock , target:[createEffect((value: unknown) => {})]    })
      sample({source:stringClock , target:[createEffect((value: any) => {})]        })
      sample({source:stringClock , target:[createEffect((value: string) => {})]     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('inline, source, sync (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [createEffect((value: never) => {})],
      })
      sample({
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [createEffect((value: number) => {})],
      })
      sample({
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [createEffect((value: string) => {})],
      })
      sample({
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [createEffect((value: never) => {})],
      })
      sample({
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [createEffect((value: number) => {})],
      })
      sample({
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [createEffect((value: string) => {})],
      })
      sample({
        //@ts-expect-error
        source: anyClock,
        //@ts-expect-error
        target: [createEffect((value: never) => {})],
      })
      sample({
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: [createEffect((value: never) => {})],
      })
      sample({
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: [createEffect((value: string) => {})],
      })
      sample({
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: [createEffect((value: never) => {})],
      })
      sample({
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: [createEffect((value: number) => {})],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 7 'target: [createEffect((value: never) => {})],'
      lack of expected error at test line 11 'source: voidClock,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 17 'source: voidClock,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 25 'target: [createEffect((value: never) => {})],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 31 'target: [createEffect((value: number) => {})],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 37 'target: [createEffect((value: string) => {})],'
      lack of expected error at test line 41 'source: anyClock,'
      lack of expected error at test line 43 'target: [createEffect((value: never) => {})],'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 49 'target: [createEffect((value: never) => {})],'
      lack of expected error at test line 53 'source: numberClock,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 61 'target: [createEffect((value: never) => {})],'
      lack of expected error at test line 65 'source: stringClock,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('inline, both, sync', () => {
  test('inline, both, sync (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , source:voidClock   , target:[createEffect(() => {})]                  })
      sample({clock:voidClock   , source:voidClock   , target:[createEffect<unknown, unknown>(() => {})]})
      sample({clock:voidClock   , source:voidClock   , target:[createEffect((value: void) => {})]       })
      sample({clock:voidClock   , source:voidClock   , target:[createEffect((value: unknown) => {})]    })
      sample({clock:voidClock   , source:voidClock   , target:[createEffect((value: any) => {})]        })
      sample({clock:unknownClock, source:unknownClock, target:[createEffect(() => {})]                  })
      sample({clock:unknownClock, source:unknownClock, target:[createEffect<unknown, unknown>(() => {})]})
      sample({clock:unknownClock, source:unknownClock, target:[createEffect((value: void) => {})]       })
      sample({clock:unknownClock, source:unknownClock, target:[createEffect((value: unknown) => {})]    })
      sample({clock:unknownClock, source:unknownClock, target:[createEffect((value: any) => {})]        })
      sample({clock:anyClock    , source:anyClock    , target:[createEffect(() => {})]                  })
      sample({clock:anyClock    , source:anyClock    , target:[createEffect<unknown, unknown>(() => {})]})
      sample({clock:anyClock    , source:anyClock    , target:[createEffect((value: void) => {})]       })
      sample({clock:anyClock    , source:anyClock    , target:[createEffect((value: unknown) => {})]    })
      sample({clock:anyClock    , source:anyClock    , target:[createEffect((value: any) => {})]        })
      sample({clock:anyClock    , source:anyClock    , target:[createEffect((value: number) => {})]     })
      sample({clock:anyClock    , source:anyClock    , target:[createEffect((value: string) => {})]     })
      sample({clock:neverClock  , source:neverClock  , target:[createEffect(() => {})]                  })
      sample({clock:neverClock  , source:neverClock  , target:[createEffect<unknown, unknown>(() => {})]})
      sample({clock:neverClock  , source:neverClock  , target:[createEffect((value: void) => {})]       })
      sample({clock:neverClock  , source:neverClock  , target:[createEffect((value: unknown) => {})]    })
      sample({clock:neverClock  , source:neverClock  , target:[createEffect((value: any) => {})]        })
      sample({clock:neverClock  , source:neverClock  , target:[createEffect((value: never) => {})]      })
      sample({clock:neverClock  , source:neverClock  , target:[createEffect((value: number) => {})]     })
      sample({clock:neverClock  , source:neverClock  , target:[createEffect((value: string) => {})]     })
      sample({clock:numberClock , source:numberClock , target:[createEffect(() => {})]                  })
      sample({clock:numberClock , source:numberClock , target:[createEffect<unknown, unknown>(() => {})]})
      sample({clock:numberClock , source:numberClock , target:[createEffect((value: void) => {})]       })
      sample({clock:numberClock , source:numberClock , target:[createEffect((value: unknown) => {})]    })
      sample({clock:numberClock , source:numberClock , target:[createEffect((value: any) => {})]        })
      sample({clock:numberClock , source:numberClock , target:[createEffect((value: number) => {})]     })
      sample({clock:stringClock , source:stringClock , target:[createEffect(() => {})]                  })
      sample({clock:stringClock , source:stringClock , target:[createEffect<unknown, unknown>(() => {})]})
      sample({clock:stringClock , source:stringClock , target:[createEffect((value: void) => {})]       })
      sample({clock:stringClock , source:stringClock , target:[createEffect((value: unknown) => {})]    })
      sample({clock:stringClock , source:stringClock , target:[createEffect((value: any) => {})]        })
      sample({clock:stringClock , source:stringClock , target:[createEffect((value: string) => {})]     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('inline, both, sync (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [createEffect((value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [createEffect((value: number) => {})],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [createEffect((value: string) => {})],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [createEffect((value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [createEffect((value: number) => {})],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [createEffect((value: string) => {})],
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        source: anyClock,
        //@ts-expect-error
        target: [createEffect((value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: [createEffect((value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: [createEffect((value: string) => {})],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: [createEffect((value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: [createEffect((value: number) => {})],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      lack of expected error at test line 5 'clock: voidClock,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 9 'target: [createEffect((value: never) => {})],'
      lack of expected error at test line 13 'clock: voidClock,'
      lack of expected error at test line 15 'source: voidClock,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 21 'clock: voidClock,'
      lack of expected error at test line 23 'source: voidClock,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      lack of expected error at test line 29 'clock: unknownClock,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 33 'target: [createEffect((value: never) => {})],'
      lack of expected error at test line 37 'clock: unknownClock,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 41 'target: [createEffect((value: number) => {})],'
      lack of expected error at test line 45 'clock: unknownClock,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 49 'target: [createEffect((value: string) => {})],'
      lack of expected error at test line 53 'clock: anyClock,'
      lack of expected error at test line 55 'source: anyClock,'
      lack of expected error at test line 57 'target: [createEffect((value: never) => {})],'
      lack of expected error at test line 61 'clock: numberClock,'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 65 'target: [createEffect((value: never) => {})],'
      lack of expected error at test line 69 'clock: numberClock,'
      lack of expected error at test line 71 'source: numberClock,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 77 'clock: stringClock,'
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 81 'target: [createEffect((value: never) => {})],'
      lack of expected error at test line 85 'clock: stringClock,'
      lack of expected error at test line 87 'source: stringClock,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('inline, Boolean, sync', () => {
  test('inline, Boolean, sync (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , filter:Boolean, target:[createEffect(() => {})]                  })
      sample({clock:voidClock   , filter:Boolean, target:[createEffect<unknown, unknown>(() => {})]})
      sample({clock:voidClock   , filter:Boolean, target:[createEffect((value: void) => {})]       })
      sample({clock:voidClock   , filter:Boolean, target:[createEffect((value: unknown) => {})]    })
      sample({clock:voidClock   , filter:Boolean, target:[createEffect((value: any) => {})]        })
      sample({clock:unknownClock, filter:Boolean, target:[createEffect(() => {})]                  })
      sample({clock:unknownClock, filter:Boolean, target:[createEffect<unknown, unknown>(() => {})]})
      sample({clock:unknownClock, filter:Boolean, target:[createEffect((value: void) => {})]       })
      sample({clock:unknownClock, filter:Boolean, target:[createEffect((value: unknown) => {})]    })
      sample({clock:unknownClock, filter:Boolean, target:[createEffect((value: any) => {})]        })
      sample({clock:anyClock    , filter:Boolean, target:[createEffect(() => {})]                  })
      sample({clock:anyClock    , filter:Boolean, target:[createEffect<unknown, unknown>(() => {})]})
      sample({clock:anyClock    , filter:Boolean, target:[createEffect((value: void) => {})]       })
      sample({clock:anyClock    , filter:Boolean, target:[createEffect((value: unknown) => {})]    })
      sample({clock:anyClock    , filter:Boolean, target:[createEffect((value: any) => {})]        })
      sample({clock:anyClock    , filter:Boolean, target:[createEffect((value: number) => {})]     })
      sample({clock:anyClock    , filter:Boolean, target:[createEffect((value: string) => {})]     })
      sample({clock:neverClock  , filter:Boolean, target:[createEffect(() => {})]                  })
      sample({clock:neverClock  , filter:Boolean, target:[createEffect<unknown, unknown>(() => {})]})
      sample({clock:neverClock  , filter:Boolean, target:[createEffect((value: void) => {})]       })
      sample({clock:neverClock  , filter:Boolean, target:[createEffect((value: unknown) => {})]    })
      sample({clock:neverClock  , filter:Boolean, target:[createEffect((value: any) => {})]        })
      sample({clock:neverClock  , filter:Boolean, target:[createEffect((value: never) => {})]      })
      sample({clock:neverClock  , filter:Boolean, target:[createEffect((value: number) => {})]     })
      sample({clock:neverClock  , filter:Boolean, target:[createEffect((value: string) => {})]     })
      sample({clock:numberClock , filter:Boolean, target:[createEffect(() => {})]                  })
      sample({clock:numberClock , filter:Boolean, target:[createEffect<unknown, unknown>(() => {})]})
      sample({clock:numberClock , filter:Boolean, target:[createEffect((value: void) => {})]       })
      sample({clock:numberClock , filter:Boolean, target:[createEffect((value: unknown) => {})]    })
      sample({clock:numberClock , filter:Boolean, target:[createEffect((value: any) => {})]        })
      sample({clock:numberClock , filter:Boolean, target:[createEffect((value: number) => {})]     })
      sample({clock:stringClock , filter:Boolean, target:[createEffect(() => {})]                  })
      sample({clock:stringClock , filter:Boolean, target:[createEffect<unknown, unknown>(() => {})]})
      sample({clock:stringClock , filter:Boolean, target:[createEffect((value: void) => {})]       })
      sample({clock:stringClock , filter:Boolean, target:[createEffect((value: unknown) => {})]    })
      sample({clock:stringClock , filter:Boolean, target:[createEffect((value: any) => {})]        })
      sample({clock:stringClock , filter:Boolean, target:[createEffect((value: string) => {})]     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('inline, Boolean, sync (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect((value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect((value: number) => {})],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect((value: string) => {})],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect((value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect((value: number) => {})],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect((value: string) => {})],
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect((value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect((value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect((value: string) => {})],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect((value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect((value: number) => {})],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 7 'filter: Boolean,'
      lack of expected error at test line 9 'target: [createEffect((value: never) => {})],'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      lack of expected error at test line 15 'filter: Boolean,'
      Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      lack of expected error at test line 23 'filter: Boolean,'
      Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 31 'filter: Boolean,'
      lack of expected error at test line 33 'target: [createEffect((value: never) => {})],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 39 'filter: Boolean,'
      lack of expected error at test line 41 'target: [createEffect((value: number) => {})],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 47 'filter: Boolean,'
      lack of expected error at test line 49 'target: [createEffect((value: string) => {})],'
      Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'any' is not assignable to type 'never'.
      lack of expected error at test line 55 'filter: Boolean,'
      lack of expected error at test line 57 'target: [createEffect((value: never) => {})],'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 63 'filter: Boolean,'
      lack of expected error at test line 65 'target: [createEffect((value: never) => {})],'
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      lack of expected error at test line 71 'filter: Boolean,'
      Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 79 'filter: Boolean,'
      lack of expected error at test line 81 'target: [createEffect((value: never) => {})],'
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 87 'filter: Boolean,'
      Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('inline, filter, sync', () => {
  test('inline, filter, sync (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , filter:() => true, target:[createEffect(() => {})]                  })
      sample({clock:voidClock   , filter:() => true, target:[createEffect<unknown, unknown>(() => {})]})
      sample({clock:voidClock   , filter:() => true, target:[createEffect((value: void) => {})]       })
      sample({clock:voidClock   , filter:() => true, target:[createEffect((value: unknown) => {})]    })
      sample({clock:voidClock   , filter:() => true, target:[createEffect((value: any) => {})]        })
      sample({clock:unknownClock, filter:() => true, target:[createEffect(() => {})]                  })
      sample({clock:unknownClock, filter:() => true, target:[createEffect<unknown, unknown>(() => {})]})
      sample({clock:unknownClock, filter:() => true, target:[createEffect((value: void) => {})]       })
      sample({clock:unknownClock, filter:() => true, target:[createEffect((value: unknown) => {})]    })
      sample({clock:unknownClock, filter:() => true, target:[createEffect((value: any) => {})]        })
      sample({clock:anyClock    , filter:() => true, target:[createEffect(() => {})]                  })
      sample({clock:anyClock    , filter:() => true, target:[createEffect<unknown, unknown>(() => {})]})
      sample({clock:anyClock    , filter:() => true, target:[createEffect((value: void) => {})]       })
      sample({clock:anyClock    , filter:() => true, target:[createEffect((value: unknown) => {})]    })
      sample({clock:anyClock    , filter:() => true, target:[createEffect((value: any) => {})]        })
      sample({clock:anyClock    , filter:() => true, target:[createEffect((value: number) => {})]     })
      sample({clock:anyClock    , filter:() => true, target:[createEffect((value: string) => {})]     })
      sample({clock:neverClock  , filter:() => true, target:[createEffect(() => {})]                  })
      sample({clock:neverClock  , filter:() => true, target:[createEffect<unknown, unknown>(() => {})]})
      sample({clock:neverClock  , filter:() => true, target:[createEffect((value: void) => {})]       })
      sample({clock:neverClock  , filter:() => true, target:[createEffect((value: unknown) => {})]    })
      sample({clock:neverClock  , filter:() => true, target:[createEffect((value: any) => {})]        })
      sample({clock:neverClock  , filter:() => true, target:[createEffect((value: never) => {})]      })
      sample({clock:neverClock  , filter:() => true, target:[createEffect((value: number) => {})]     })
      sample({clock:neverClock  , filter:() => true, target:[createEffect((value: string) => {})]     })
      sample({clock:numberClock , filter:() => true, target:[createEffect(() => {})]                  })
      sample({clock:numberClock , filter:() => true, target:[createEffect<unknown, unknown>(() => {})]})
      sample({clock:numberClock , filter:() => true, target:[createEffect((value: void) => {})]       })
      sample({clock:numberClock , filter:() => true, target:[createEffect((value: unknown) => {})]    })
      sample({clock:numberClock , filter:() => true, target:[createEffect((value: any) => {})]        })
      sample({clock:numberClock , filter:() => true, target:[createEffect((value: number) => {})]     })
      sample({clock:stringClock , filter:() => true, target:[createEffect(() => {})]                  })
      sample({clock:stringClock , filter:() => true, target:[createEffect<unknown, unknown>(() => {})]})
      sample({clock:stringClock , filter:() => true, target:[createEffect((value: void) => {})]       })
      sample({clock:stringClock , filter:() => true, target:[createEffect((value: unknown) => {})]    })
      sample({clock:stringClock , filter:() => true, target:[createEffect((value: any) => {})]        })
      sample({clock:stringClock , filter:() => true, target:[createEffect((value: string) => {})]     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('inline, filter, sync (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect((value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect((value: number) => {})],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect((value: string) => {})],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect((value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect((value: number) => {})],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect((value: string) => {})],
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect((value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect((value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect((value: string) => {})],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect((value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect((value: number) => {})],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 7 'filter: () => true,'
      lack of expected error at test line 9 'target: [createEffect((value: never) => {})],'
      lack of expected error at test line 13 'clock: voidClock,'
      lack of expected error at test line 15 'filter: () => true,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 21 'clock: voidClock,'
      lack of expected error at test line 23 'filter: () => true,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 31 'filter: () => true,'
      lack of expected error at test line 33 'target: [createEffect((value: never) => {})],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 39 'filter: () => true,'
      lack of expected error at test line 41 'target: [createEffect((value: number) => {})],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 47 'filter: () => true,'
      lack of expected error at test line 49 'target: [createEffect((value: string) => {})],'
      lack of expected error at test line 53 'clock: anyClock,'
      lack of expected error at test line 55 'filter: () => true,'
      lack of expected error at test line 57 'target: [createEffect((value: never) => {})],'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 63 'filter: () => true,'
      lack of expected error at test line 65 'target: [createEffect((value: never) => {})],'
      lack of expected error at test line 69 'clock: numberClock,'
      lack of expected error at test line 71 'filter: () => true,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 79 'filter: () => true,'
      lack of expected error at test line 81 'target: [createEffect((value: never) => {})],'
      lack of expected error at test line 85 'clock: stringClock,'
      lack of expected error at test line 87 'filter: () => true,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('inline, fn, sync', () => {
  test('inline, fn, sync (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , fn:(value: void) => value   , target:[createEffect(() => {})]                  })
      sample({clock:voidClock   , fn:(value: void) => value   , target:[createEffect<unknown, unknown>(() => {})]})
      sample({clock:voidClock   , fn:(value: void) => value   , target:[createEffect((value: void) => {})]       })
      sample({clock:voidClock   , fn:(value: void) => value   , target:[createEffect((value: unknown) => {})]    })
      sample({clock:voidClock   , fn:(value: void) => value   , target:[createEffect((value: any) => {})]        })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:[createEffect(() => {})]                  })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:[createEffect<unknown, unknown>(() => {})]})
      sample({clock:unknownClock, fn:(value: unknown) => value, target:[createEffect((value: void) => {})]       })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:[createEffect((value: unknown) => {})]    })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:[createEffect((value: any) => {})]        })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[createEffect(() => {})]                  })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[createEffect<unknown, unknown>(() => {})]})
      sample({clock:anyClock    , fn:(value: any) => value    , target:[createEffect((value: void) => {})]       })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[createEffect((value: unknown) => {})]    })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[createEffect((value: any) => {})]        })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[createEffect((value: number) => {})]     })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[createEffect((value: string) => {})]     })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect(() => {})]                  })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect<unknown, unknown>(() => {})]})
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect((value: void) => {})]       })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect((value: unknown) => {})]    })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect((value: any) => {})]        })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect((value: never) => {})]      })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect((value: number) => {})]     })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect((value: string) => {})]     })
      sample({clock:numberClock , fn:(value: number) => value , target:[createEffect(() => {})]                  })
      sample({clock:numberClock , fn:(value: number) => value , target:[createEffect<unknown, unknown>(() => {})]})
      sample({clock:numberClock , fn:(value: number) => value , target:[createEffect((value: void) => {})]       })
      sample({clock:numberClock , fn:(value: number) => value , target:[createEffect((value: unknown) => {})]    })
      sample({clock:numberClock , fn:(value: number) => value , target:[createEffect((value: any) => {})]        })
      sample({clock:numberClock , fn:(value: number) => value , target:[createEffect((value: number) => {})]     })
      sample({clock:stringClock , fn:(value: string) => value , target:[createEffect(() => {})]                  })
      sample({clock:stringClock , fn:(value: string) => value , target:[createEffect<unknown, unknown>(() => {})]})
      sample({clock:stringClock , fn:(value: string) => value , target:[createEffect((value: void) => {})]       })
      sample({clock:stringClock , fn:(value: string) => value , target:[createEffect((value: unknown) => {})]    })
      sample({clock:stringClock , fn:(value: string) => value , target:[createEffect((value: any) => {})]        })
      sample({clock:stringClock , fn:(value: string) => value , target:[createEffect((value: string) => {})]     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('inline, fn, sync (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        fn: (value: void) => value,
        //@ts-expect-error
        target: [createEffect((value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        fn: (value: void) => value,
        //@ts-expect-error
        target: [createEffect((value: number) => {})],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        fn: (value: void) => value,
        //@ts-expect-error
        target: [createEffect((value: string) => {})],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        fn: (value: unknown) => value,
        //@ts-expect-error
        target: [createEffect((value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        fn: (value: unknown) => value,
        //@ts-expect-error
        target: [createEffect((value: number) => {})],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        fn: (value: unknown) => value,
        //@ts-expect-error
        target: [createEffect((value: string) => {})],
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        fn: (value: any) => value,
        //@ts-expect-error
        target: [createEffect((value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        fn: (value: number) => value,
        //@ts-expect-error
        target: [createEffect((value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        fn: (value: number) => value,
        //@ts-expect-error
        target: [createEffect((value: string) => {})],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        fn: (value: string) => value,
        //@ts-expect-error
        target: [createEffect((value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        fn: (value: string) => value,
        //@ts-expect-error
        target: [createEffect((value: number) => {})],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value?: void | undefined) => void; target: readonly [Unit<void>]; error: \\"fn result should extend target type\\"; }'.
      lack of expected error at test line 7 'fn: (value: void) => value,'
      lack of expected error at test line 9 'target: [createEffect((value: never) => {})],'
      lack of expected error at test line 13 'clock: voidClock,'
      Type '(value: void) => void' is not assignable to type '(value?: void | undefined) => number'.
        Type 'void' is not assignable to type 'number'.
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 21 'clock: voidClock,'
      Type '(value: void) => void' is not assignable to type '(value?: void | undefined) => string'.
        Type 'void' is not assignable to type 'string'.
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value: unknown) => unknown; target: readonly [Unit<unknown>]; error: \\"fn result should extend target type\\"; }'.
      lack of expected error at test line 31 'fn: (value: unknown) => value,'
      lack of expected error at test line 33 'target: [createEffect((value: never) => {})],'
      lack of expected error at test line 37 'clock: unknownClock,'
      Type '(value: unknown) => unknown' is not assignable to type '(value: unknown) => number'.
        Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 41 'target: [createEffect((value: number) => {})],'
      lack of expected error at test line 45 'clock: unknownClock,'
      Type '(value: unknown) => unknown' is not assignable to type '(value: unknown) => string'.
        Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 49 'target: [createEffect((value: string) => {})],'
      lack of expected error at test line 53 'clock: anyClock,'
      lack of expected error at test line 55 'fn: (value: any) => value,'
      lack of expected error at test line 57 'target: [createEffect((value: never) => {})],'
      Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value: number) => number; target: readonly [Unit<number>]; error: \\"fn result should extend target type\\"; }'.
      lack of expected error at test line 63 'fn: (value: number) => value,'
      lack of expected error at test line 65 'target: [createEffect((value: never) => {})],'
      lack of expected error at test line 69 'clock: numberClock,'
      Type '(value: number) => number' is not assignable to type '(value: number) => string'.
        Type 'number' is not assignable to type 'string'.
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value: string) => string; target: readonly [Unit<string>]; error: \\"fn result should extend target type\\"; }'.
      lack of expected error at test line 79 'fn: (value: string) => value,'
      lack of expected error at test line 81 'target: [createEffect((value: never) => {})],'
      lack of expected error at test line 85 'clock: stringClock,'
      Type '(value: string) => string' is not assignable to type '(value: string) => number'.
        Type 'string' is not assignable to type 'number'.
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('multiple, clock, sync', () => {
  test('multiple, clock, sync (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , target:[createEffect(() => {}), createEvent<void>()]                  })
      sample({clock:voidClock   , target:[createEffect<unknown, unknown>(() => {}), createEvent<void>()]})
      sample({clock:voidClock   , target:[createEffect((value: void) => {}), createEvent<void>()]       })
      sample({clock:voidClock   , target:[createEffect((value: unknown) => {}), createEvent<void>()]    })
      sample({clock:voidClock   , target:[createEffect((value: any) => {}), createEvent<void>()]        })
      sample({clock:unknownClock, target:[createEffect(() => {}), createEvent<void>()]                  })
      sample({clock:unknownClock, target:[createEffect<unknown, unknown>(() => {}), createEvent<void>()]})
      sample({clock:unknownClock, target:[createEffect((value: void) => {}), createEvent<void>()]       })
      sample({clock:unknownClock, target:[createEffect((value: unknown) => {}), createEvent<void>()]    })
      sample({clock:unknownClock, target:[createEffect((value: any) => {}), createEvent<void>()]        })
      sample({clock:anyClock    , target:[createEffect(() => {}), createEvent<void>()]                  })
      sample({clock:anyClock    , target:[createEffect<unknown, unknown>(() => {}), createEvent<void>()]})
      sample({clock:anyClock    , target:[createEffect((value: void) => {}), createEvent<void>()]       })
      sample({clock:anyClock    , target:[createEffect((value: unknown) => {}), createEvent<void>()]    })
      sample({clock:anyClock    , target:[createEffect((value: any) => {}), createEvent<void>()]        })
      sample({clock:anyClock    , target:[createEffect((value: number) => {}), createEvent<void>()]     })
      sample({clock:anyClock    , target:[createEffect((value: string) => {}), createEvent<void>()]     })
      sample({clock:neverClock  , target:[createEffect(() => {}), createEvent<void>()]                  })
      sample({clock:neverClock  , target:[createEffect<unknown, unknown>(() => {}), createEvent<void>()]})
      sample({clock:neverClock  , target:[createEffect((value: void) => {}), createEvent<void>()]       })
      sample({clock:neverClock  , target:[createEffect((value: unknown) => {}), createEvent<void>()]    })
      sample({clock:neverClock  , target:[createEffect((value: any) => {}), createEvent<void>()]        })
      sample({clock:neverClock  , target:[createEffect((value: never) => {}), createEvent<void>()]      })
      sample({clock:neverClock  , target:[createEffect((value: number) => {}), createEvent<void>()]     })
      sample({clock:neverClock  , target:[createEffect((value: string) => {}), createEvent<void>()]     })
      sample({clock:numberClock , target:[createEffect(() => {}), createEvent<void>()]                  })
      sample({clock:numberClock , target:[createEffect<unknown, unknown>(() => {}), createEvent<void>()]})
      sample({clock:numberClock , target:[createEffect((value: void) => {}), createEvent<void>()]       })
      sample({clock:numberClock , target:[createEffect((value: unknown) => {}), createEvent<void>()]    })
      sample({clock:numberClock , target:[createEffect((value: any) => {}), createEvent<void>()]        })
      sample({clock:numberClock , target:[createEffect((value: number) => {}), createEvent<void>()]     })
      sample({clock:stringClock , target:[createEffect(() => {}), createEvent<void>()]                  })
      sample({clock:stringClock , target:[createEffect<unknown, unknown>(() => {}), createEvent<void>()]})
      sample({clock:stringClock , target:[createEffect((value: void) => {}), createEvent<void>()]       })
      sample({clock:stringClock , target:[createEffect((value: unknown) => {}), createEvent<void>()]    })
      sample({clock:stringClock , target:[createEffect((value: any) => {}), createEvent<void>()]        })
      sample({clock:stringClock , target:[createEffect((value: string) => {}), createEvent<void>()]     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('multiple, clock, sync (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: [createEffect((value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: [createEffect((value: number) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: [createEffect((value: string) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: [createEffect((value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: [createEffect((value: number) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: [createEffect((value: string) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        target: [createEffect((value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        target: [createEffect((value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        target: [createEffect((value: string) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        target: [createEffect((value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        target: [createEffect((value: number) => {}), createEvent<void>()],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 7 'target: [createEffect((value: never) => {}), createEvent<void>()],'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 25 'target: [createEffect((value: never) => {}), createEvent<void>()],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 31 'target: [createEffect((value: number) => {}), createEvent<void>()],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 37 'target: [createEffect((value: string) => {}), createEvent<void>()],'
      Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'any' is not assignable to type 'never'.
      lack of expected error at test line 43 'target: [createEffect((value: never) => {}), createEvent<void>()],'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 49 'target: [createEffect((value: never) => {}), createEvent<void>()],'
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 61 'target: [createEffect((value: never) => {}), createEvent<void>()],'
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('multiple, source, sync', () => {
  test('multiple, source, sync (should pass)', () => {
    //prettier-ignore
    {
      sample({source:voidClock   , target:[createEffect(() => {}), createEvent<void>()]                  })
      sample({source:voidClock   , target:[createEffect<unknown, unknown>(() => {}), createEvent<void>()]})
      sample({source:voidClock   , target:[createEffect((value: void) => {}), createEvent<void>()]       })
      sample({source:voidClock   , target:[createEffect((value: unknown) => {}), createEvent<void>()]    })
      sample({source:voidClock   , target:[createEffect((value: any) => {}), createEvent<void>()]        })
      sample({source:unknownClock, target:[createEffect(() => {}), createEvent<void>()]                  })
      sample({source:unknownClock, target:[createEffect<unknown, unknown>(() => {}), createEvent<void>()]})
      sample({source:unknownClock, target:[createEffect((value: void) => {}), createEvent<void>()]       })
      sample({source:unknownClock, target:[createEffect((value: unknown) => {}), createEvent<void>()]    })
      sample({source:unknownClock, target:[createEffect((value: any) => {}), createEvent<void>()]        })
      sample({source:anyClock    , target:[createEffect(() => {}), createEvent<void>()]                  })
      sample({source:anyClock    , target:[createEffect<unknown, unknown>(() => {}), createEvent<void>()]})
      sample({source:anyClock    , target:[createEffect((value: void) => {}), createEvent<void>()]       })
      sample({source:anyClock    , target:[createEffect((value: unknown) => {}), createEvent<void>()]    })
      sample({source:anyClock    , target:[createEffect((value: any) => {}), createEvent<void>()]        })
      sample({source:anyClock    , target:[createEffect((value: number) => {}), createEvent<void>()]     })
      sample({source:anyClock    , target:[createEffect((value: string) => {}), createEvent<void>()]     })
      sample({source:neverClock  , target:[createEffect(() => {}), createEvent<void>()]                  })
      sample({source:neverClock  , target:[createEffect<unknown, unknown>(() => {}), createEvent<void>()]})
      sample({source:neverClock  , target:[createEffect((value: void) => {}), createEvent<void>()]       })
      sample({source:neverClock  , target:[createEffect((value: unknown) => {}), createEvent<void>()]    })
      sample({source:neverClock  , target:[createEffect((value: any) => {}), createEvent<void>()]        })
      sample({source:neverClock  , target:[createEffect((value: never) => {}), createEvent<void>()]      })
      sample({source:neverClock  , target:[createEffect((value: number) => {}), createEvent<void>()]     })
      sample({source:neverClock  , target:[createEffect((value: string) => {}), createEvent<void>()]     })
      sample({source:numberClock , target:[createEffect(() => {}), createEvent<void>()]                  })
      sample({source:numberClock , target:[createEffect<unknown, unknown>(() => {}), createEvent<void>()]})
      sample({source:numberClock , target:[createEffect((value: void) => {}), createEvent<void>()]       })
      sample({source:numberClock , target:[createEffect((value: unknown) => {}), createEvent<void>()]    })
      sample({source:numberClock , target:[createEffect((value: any) => {}), createEvent<void>()]        })
      sample({source:numberClock , target:[createEffect((value: number) => {}), createEvent<void>()]     })
      sample({source:stringClock , target:[createEffect(() => {}), createEvent<void>()]                  })
      sample({source:stringClock , target:[createEffect<unknown, unknown>(() => {}), createEvent<void>()]})
      sample({source:stringClock , target:[createEffect((value: void) => {}), createEvent<void>()]       })
      sample({source:stringClock , target:[createEffect((value: unknown) => {}), createEvent<void>()]    })
      sample({source:stringClock , target:[createEffect((value: any) => {}), createEvent<void>()]        })
      sample({source:stringClock , target:[createEffect((value: string) => {}), createEvent<void>()]     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('multiple, source, sync (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [createEffect((value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [createEffect((value: number) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [createEffect((value: string) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [createEffect((value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [createEffect((value: number) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [createEffect((value: string) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        source: anyClock,
        //@ts-expect-error
        target: [createEffect((value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: [createEffect((value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: [createEffect((value: string) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: [createEffect((value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: [createEffect((value: number) => {}), createEvent<void>()],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      lack of expected error at test line 5 'source: voidClock,'
      Object literal may only specify known properties, and 'target' does not exist in type '{ source: Unit<void>; error: \\"source should extend target type\\"; }'.
      lack of expected error at test line 11 'source: voidClock,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 17 'source: voidClock,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'void'.
      lack of expected error at test line 25 'target: [createEffect((value: never) => {}), createEvent<void>()],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<void | number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'void | number'.
      lack of expected error at test line 31 'target: [createEffect((value: number) => {}), createEvent<void>()],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<void | string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'void | string'.
      lack of expected error at test line 37 'target: [createEffect((value: string) => {}), createEvent<void>()],'
      lack of expected error at test line 41 'source: anyClock,'
      lack of expected error at test line 43 'target: [createEffect((value: never) => {}), createEvent<void>()],'
      lack of expected error at test line 47 'source: numberClock,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      lack of expected error at test line 53 'source: numberClock,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      lack of expected error at test line 59 'source: stringClock,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      lack of expected error at test line 65 'source: stringClock,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      "
    `)
  })
})
describe('multiple, both, sync', () => {
  test('multiple, both, sync (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , source:voidClock   , target:[createEffect(() => {}), createEvent<void>()]                  })
      sample({clock:voidClock   , source:voidClock   , target:[createEffect<unknown, unknown>(() => {}), createEvent<void>()]})
      sample({clock:voidClock   , source:voidClock   , target:[createEffect((value: void) => {}), createEvent<void>()]       })
      sample({clock:voidClock   , source:voidClock   , target:[createEffect((value: unknown) => {}), createEvent<void>()]    })
      sample({clock:voidClock   , source:voidClock   , target:[createEffect((value: any) => {}), createEvent<void>()]        })
      sample({clock:unknownClock, source:unknownClock, target:[createEffect(() => {}), createEvent<void>()]                  })
      sample({clock:unknownClock, source:unknownClock, target:[createEffect<unknown, unknown>(() => {}), createEvent<void>()]})
      sample({clock:unknownClock, source:unknownClock, target:[createEffect((value: void) => {}), createEvent<void>()]       })
      sample({clock:unknownClock, source:unknownClock, target:[createEffect((value: unknown) => {}), createEvent<void>()]    })
      sample({clock:unknownClock, source:unknownClock, target:[createEffect((value: any) => {}), createEvent<void>()]        })
      sample({clock:anyClock    , source:anyClock    , target:[createEffect(() => {}), createEvent<void>()]                  })
      sample({clock:anyClock    , source:anyClock    , target:[createEffect<unknown, unknown>(() => {}), createEvent<void>()]})
      sample({clock:anyClock    , source:anyClock    , target:[createEffect((value: void) => {}), createEvent<void>()]       })
      sample({clock:anyClock    , source:anyClock    , target:[createEffect((value: unknown) => {}), createEvent<void>()]    })
      sample({clock:anyClock    , source:anyClock    , target:[createEffect((value: any) => {}), createEvent<void>()]        })
      sample({clock:anyClock    , source:anyClock    , target:[createEffect((value: number) => {}), createEvent<void>()]     })
      sample({clock:anyClock    , source:anyClock    , target:[createEffect((value: string) => {}), createEvent<void>()]     })
      sample({clock:neverClock  , source:neverClock  , target:[createEffect(() => {}), createEvent<void>()]                  })
      sample({clock:neverClock  , source:neverClock  , target:[createEffect<unknown, unknown>(() => {}), createEvent<void>()]})
      sample({clock:neverClock  , source:neverClock  , target:[createEffect((value: void) => {}), createEvent<void>()]       })
      sample({clock:neverClock  , source:neverClock  , target:[createEffect((value: unknown) => {}), createEvent<void>()]    })
      sample({clock:neverClock  , source:neverClock  , target:[createEffect((value: any) => {}), createEvent<void>()]        })
      sample({clock:neverClock  , source:neverClock  , target:[createEffect((value: never) => {}), createEvent<void>()]      })
      sample({clock:neverClock  , source:neverClock  , target:[createEffect((value: number) => {}), createEvent<void>()]     })
      sample({clock:neverClock  , source:neverClock  , target:[createEffect((value: string) => {}), createEvent<void>()]     })
      sample({clock:numberClock , source:numberClock , target:[createEffect(() => {}), createEvent<void>()]                  })
      sample({clock:numberClock , source:numberClock , target:[createEffect<unknown, unknown>(() => {}), createEvent<void>()]})
      sample({clock:numberClock , source:numberClock , target:[createEffect((value: void) => {}), createEvent<void>()]       })
      sample({clock:numberClock , source:numberClock , target:[createEffect((value: unknown) => {}), createEvent<void>()]    })
      sample({clock:numberClock , source:numberClock , target:[createEffect((value: any) => {}), createEvent<void>()]        })
      sample({clock:numberClock , source:numberClock , target:[createEffect((value: number) => {}), createEvent<void>()]     })
      sample({clock:stringClock , source:stringClock , target:[createEffect(() => {}), createEvent<void>()]                  })
      sample({clock:stringClock , source:stringClock , target:[createEffect<unknown, unknown>(() => {}), createEvent<void>()]})
      sample({clock:stringClock , source:stringClock , target:[createEffect((value: void) => {}), createEvent<void>()]       })
      sample({clock:stringClock , source:stringClock , target:[createEffect((value: unknown) => {}), createEvent<void>()]    })
      sample({clock:stringClock , source:stringClock , target:[createEffect((value: any) => {}), createEvent<void>()]        })
      sample({clock:stringClock , source:stringClock , target:[createEffect((value: string) => {}), createEvent<void>()]     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('multiple, both, sync (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [createEffect((value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [createEffect((value: number) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [createEffect((value: string) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [createEffect((value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [createEffect((value: number) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [createEffect((value: string) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        source: anyClock,
        //@ts-expect-error
        target: [createEffect((value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: [createEffect((value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: [createEffect((value: string) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: [createEffect((value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: [createEffect((value: number) => {}), createEvent<void>()],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Object literal may only specify known properties, and 'clock' does not exist in type '{ source: Unit<void>; error: \\"source should extend target type\\"; }'.
      lack of expected error at test line 7 'source: voidClock,'
      lack of expected error at test line 9 'target: [createEffect((value: never) => {}), createEvent<void>()],'
      lack of expected error at test line 13 'clock: voidClock,'
      lack of expected error at test line 15 'source: voidClock,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 21 'clock: voidClock,'
      lack of expected error at test line 23 'source: voidClock,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      lack of expected error at test line 29 'clock: unknownClock,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'void'.
      lack of expected error at test line 33 'target: [createEffect((value: never) => {}), createEvent<void>()],'
      lack of expected error at test line 37 'clock: unknownClock,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<void | number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'void | number'.
      lack of expected error at test line 41 'target: [createEffect((value: number) => {}), createEvent<void>()],'
      lack of expected error at test line 45 'clock: unknownClock,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<void | string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'void | string'.
      lack of expected error at test line 49 'target: [createEffect((value: string) => {}), createEvent<void>()],'
      lack of expected error at test line 53 'clock: anyClock,'
      lack of expected error at test line 55 'source: anyClock,'
      lack of expected error at test line 57 'target: [createEffect((value: never) => {}), createEvent<void>()],'
      lack of expected error at test line 61 'clock: numberClock,'
      lack of expected error at test line 63 'source: numberClock,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      lack of expected error at test line 69 'clock: numberClock,'
      lack of expected error at test line 71 'source: numberClock,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      lack of expected error at test line 77 'clock: stringClock,'
      lack of expected error at test line 79 'source: stringClock,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      lack of expected error at test line 85 'clock: stringClock,'
      lack of expected error at test line 87 'source: stringClock,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      "
    `)
  })
})
describe('multiple, Boolean, sync', () => {
  test('multiple, Boolean, sync (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , filter:Boolean, target:[createEffect(() => {}), createEvent<void>()]                  })
      sample({clock:voidClock   , filter:Boolean, target:[createEffect<unknown, unknown>(() => {}), createEvent<void>()]})
      sample({clock:voidClock   , filter:Boolean, target:[createEffect((value: void) => {}), createEvent<void>()]       })
      sample({clock:voidClock   , filter:Boolean, target:[createEffect((value: unknown) => {}), createEvent<void>()]    })
      sample({clock:voidClock   , filter:Boolean, target:[createEffect((value: any) => {}), createEvent<void>()]        })
      sample({clock:unknownClock, filter:Boolean, target:[createEffect(() => {}), createEvent<void>()]                  })
      sample({clock:unknownClock, filter:Boolean, target:[createEffect<unknown, unknown>(() => {}), createEvent<void>()]})
      sample({clock:unknownClock, filter:Boolean, target:[createEffect((value: void) => {}), createEvent<void>()]       })
      sample({clock:unknownClock, filter:Boolean, target:[createEffect((value: unknown) => {}), createEvent<void>()]    })
      sample({clock:unknownClock, filter:Boolean, target:[createEffect((value: any) => {}), createEvent<void>()]        })
      sample({clock:anyClock    , filter:Boolean, target:[createEffect(() => {}), createEvent<void>()]                  })
      sample({clock:anyClock    , filter:Boolean, target:[createEffect<unknown, unknown>(() => {}), createEvent<void>()]})
      sample({clock:anyClock    , filter:Boolean, target:[createEffect((value: void) => {}), createEvent<void>()]       })
      sample({clock:anyClock    , filter:Boolean, target:[createEffect((value: unknown) => {}), createEvent<void>()]    })
      sample({clock:anyClock    , filter:Boolean, target:[createEffect((value: any) => {}), createEvent<void>()]        })
      sample({clock:anyClock    , filter:Boolean, target:[createEffect((value: number) => {}), createEvent<void>()]     })
      sample({clock:anyClock    , filter:Boolean, target:[createEffect((value: string) => {}), createEvent<void>()]     })
      sample({clock:neverClock  , filter:Boolean, target:[createEffect(() => {}), createEvent<void>()]                  })
      sample({clock:neverClock  , filter:Boolean, target:[createEffect<unknown, unknown>(() => {}), createEvent<void>()]})
      sample({clock:neverClock  , filter:Boolean, target:[createEffect((value: void) => {}), createEvent<void>()]       })
      sample({clock:neverClock  , filter:Boolean, target:[createEffect((value: unknown) => {}), createEvent<void>()]    })
      sample({clock:neverClock  , filter:Boolean, target:[createEffect((value: any) => {}), createEvent<void>()]        })
      sample({clock:neverClock  , filter:Boolean, target:[createEffect((value: never) => {}), createEvent<void>()]      })
      sample({clock:neverClock  , filter:Boolean, target:[createEffect((value: number) => {}), createEvent<void>()]     })
      sample({clock:neverClock  , filter:Boolean, target:[createEffect((value: string) => {}), createEvent<void>()]     })
      sample({clock:numberClock , filter:Boolean, target:[createEffect(() => {}), createEvent<void>()]                  })
      sample({clock:numberClock , filter:Boolean, target:[createEffect<unknown, unknown>(() => {}), createEvent<void>()]})
      sample({clock:numberClock , filter:Boolean, target:[createEffect((value: void) => {}), createEvent<void>()]       })
      sample({clock:numberClock , filter:Boolean, target:[createEffect((value: unknown) => {}), createEvent<void>()]    })
      sample({clock:numberClock , filter:Boolean, target:[createEffect((value: any) => {}), createEvent<void>()]        })
      sample({clock:numberClock , filter:Boolean, target:[createEffect((value: number) => {}), createEvent<void>()]     })
      sample({clock:stringClock , filter:Boolean, target:[createEffect(() => {}), createEvent<void>()]                  })
      sample({clock:stringClock , filter:Boolean, target:[createEffect<unknown, unknown>(() => {}), createEvent<void>()]})
      sample({clock:stringClock , filter:Boolean, target:[createEffect((value: void) => {}), createEvent<void>()]       })
      sample({clock:stringClock , filter:Boolean, target:[createEffect((value: unknown) => {}), createEvent<void>()]    })
      sample({clock:stringClock , filter:Boolean, target:[createEffect((value: any) => {}), createEvent<void>()]        })
      sample({clock:stringClock , filter:Boolean, target:[createEffect((value: string) => {}), createEvent<void>()]     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('multiple, Boolean, sync (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect((value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect((value: number) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect((value: string) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect((value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect((value: number) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect((value: string) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect((value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect((value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect((value: string) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect((value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect((value: number) => {}), createEvent<void>()],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 7 'filter: Boolean,'
      lack of expected error at test line 9 'target: [createEffect((value: never) => {}), createEvent<void>()],'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      lack of expected error at test line 15 'filter: Boolean,'
      Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      lack of expected error at test line 23 'filter: Boolean,'
      Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 31 'filter: Boolean,'
      lack of expected error at test line 33 'target: [createEffect((value: never) => {}), createEvent<void>()],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 39 'filter: Boolean,'
      lack of expected error at test line 41 'target: [createEffect((value: number) => {}), createEvent<void>()],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 47 'filter: Boolean,'
      lack of expected error at test line 49 'target: [createEffect((value: string) => {}), createEvent<void>()],'
      Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'any' is not assignable to type 'never'.
      lack of expected error at test line 55 'filter: Boolean,'
      lack of expected error at test line 57 'target: [createEffect((value: never) => {}), createEvent<void>()],'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 63 'filter: Boolean,'
      lack of expected error at test line 65 'target: [createEffect((value: never) => {}), createEvent<void>()],'
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      lack of expected error at test line 71 'filter: Boolean,'
      Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 79 'filter: Boolean,'
      lack of expected error at test line 81 'target: [createEffect((value: never) => {}), createEvent<void>()],'
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 87 'filter: Boolean,'
      Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('multiple, filter, sync', () => {
  test('multiple, filter, sync (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , filter:() => true, target:[createEffect(() => {}), createEvent<void>()]                  })
      sample({clock:voidClock   , filter:() => true, target:[createEffect<unknown, unknown>(() => {}), createEvent<void>()]})
      sample({clock:voidClock   , filter:() => true, target:[createEffect((value: void) => {}), createEvent<void>()]       })
      sample({clock:voidClock   , filter:() => true, target:[createEffect((value: unknown) => {}), createEvent<void>()]    })
      sample({clock:voidClock   , filter:() => true, target:[createEffect((value: any) => {}), createEvent<void>()]        })
      sample({clock:unknownClock, filter:() => true, target:[createEffect(() => {}), createEvent<void>()]                  })
      sample({clock:unknownClock, filter:() => true, target:[createEffect<unknown, unknown>(() => {}), createEvent<void>()]})
      sample({clock:unknownClock, filter:() => true, target:[createEffect((value: void) => {}), createEvent<void>()]       })
      sample({clock:unknownClock, filter:() => true, target:[createEffect((value: unknown) => {}), createEvent<void>()]    })
      sample({clock:unknownClock, filter:() => true, target:[createEffect((value: any) => {}), createEvent<void>()]        })
      sample({clock:anyClock    , filter:() => true, target:[createEffect(() => {}), createEvent<void>()]                  })
      sample({clock:anyClock    , filter:() => true, target:[createEffect<unknown, unknown>(() => {}), createEvent<void>()]})
      sample({clock:anyClock    , filter:() => true, target:[createEffect((value: void) => {}), createEvent<void>()]       })
      sample({clock:anyClock    , filter:() => true, target:[createEffect((value: unknown) => {}), createEvent<void>()]    })
      sample({clock:anyClock    , filter:() => true, target:[createEffect((value: any) => {}), createEvent<void>()]        })
      sample({clock:anyClock    , filter:() => true, target:[createEffect((value: number) => {}), createEvent<void>()]     })
      sample({clock:anyClock    , filter:() => true, target:[createEffect((value: string) => {}), createEvent<void>()]     })
      sample({clock:neverClock  , filter:() => true, target:[createEffect(() => {}), createEvent<void>()]                  })
      sample({clock:neverClock  , filter:() => true, target:[createEffect<unknown, unknown>(() => {}), createEvent<void>()]})
      sample({clock:neverClock  , filter:() => true, target:[createEffect((value: void) => {}), createEvent<void>()]       })
      sample({clock:neverClock  , filter:() => true, target:[createEffect((value: unknown) => {}), createEvent<void>()]    })
      sample({clock:neverClock  , filter:() => true, target:[createEffect((value: any) => {}), createEvent<void>()]        })
      sample({clock:neverClock  , filter:() => true, target:[createEffect((value: never) => {}), createEvent<void>()]      })
      sample({clock:neverClock  , filter:() => true, target:[createEffect((value: number) => {}), createEvent<void>()]     })
      sample({clock:neverClock  , filter:() => true, target:[createEffect((value: string) => {}), createEvent<void>()]     })
      sample({clock:numberClock , filter:() => true, target:[createEffect(() => {}), createEvent<void>()]                  })
      sample({clock:numberClock , filter:() => true, target:[createEffect<unknown, unknown>(() => {}), createEvent<void>()]})
      sample({clock:numberClock , filter:() => true, target:[createEffect((value: void) => {}), createEvent<void>()]       })
      sample({clock:numberClock , filter:() => true, target:[createEffect((value: unknown) => {}), createEvent<void>()]    })
      sample({clock:numberClock , filter:() => true, target:[createEffect((value: any) => {}), createEvent<void>()]        })
      sample({clock:numberClock , filter:() => true, target:[createEffect((value: number) => {}), createEvent<void>()]     })
      sample({clock:stringClock , filter:() => true, target:[createEffect(() => {}), createEvent<void>()]                  })
      sample({clock:stringClock , filter:() => true, target:[createEffect<unknown, unknown>(() => {}), createEvent<void>()]})
      sample({clock:stringClock , filter:() => true, target:[createEffect((value: void) => {}), createEvent<void>()]       })
      sample({clock:stringClock , filter:() => true, target:[createEffect((value: unknown) => {}), createEvent<void>()]    })
      sample({clock:stringClock , filter:() => true, target:[createEffect((value: any) => {}), createEvent<void>()]        })
      sample({clock:stringClock , filter:() => true, target:[createEffect((value: string) => {}), createEvent<void>()]     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('multiple, filter, sync (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect((value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect((value: number) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect((value: string) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect((value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect((value: number) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect((value: string) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect((value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect((value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect((value: string) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect((value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect((value: number) => {}), createEvent<void>()],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      lack of expected error at test line 5 'clock: voidClock,'
      Object literal may only specify known properties, and 'filter' does not exist in type '{ clock: Unit<void>; error: \\"clock should extend target type\\"; }'.
      lack of expected error at test line 9 'target: [createEffect((value: never) => {}), createEvent<void>()],'
      lack of expected error at test line 13 'clock: voidClock,'
      lack of expected error at test line 15 'filter: () => true,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 21 'clock: voidClock,'
      lack of expected error at test line 23 'filter: () => true,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'void'.
      lack of expected error at test line 31 'filter: () => true,'
      lack of expected error at test line 33 'target: [createEffect((value: never) => {}), createEvent<void>()],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<void | number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'void | number'.
      lack of expected error at test line 39 'filter: () => true,'
      lack of expected error at test line 41 'target: [createEffect((value: number) => {}), createEvent<void>()],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<void | string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'void | string'.
      lack of expected error at test line 47 'filter: () => true,'
      lack of expected error at test line 49 'target: [createEffect((value: string) => {}), createEvent<void>()],'
      lack of expected error at test line 53 'clock: anyClock,'
      lack of expected error at test line 55 'filter: () => true,'
      lack of expected error at test line 57 'target: [createEffect((value: never) => {}), createEvent<void>()],'
      lack of expected error at test line 61 'clock: numberClock,'
      lack of expected error at test line 63 'filter: () => true,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      lack of expected error at test line 69 'clock: numberClock,'
      lack of expected error at test line 71 'filter: () => true,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      lack of expected error at test line 77 'clock: stringClock,'
      lack of expected error at test line 79 'filter: () => true,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      lack of expected error at test line 85 'clock: stringClock,'
      lack of expected error at test line 87 'filter: () => true,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      "
    `)
  })
})
describe('multiple, fn, sync', () => {
  test('multiple, fn, sync (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , fn:(value: void) => value   , target:[createEffect(() => {}), createEvent<void>()]                  })
      sample({clock:voidClock   , fn:(value: void) => value   , target:[createEffect<unknown, unknown>(() => {}), createEvent<void>()]})
      sample({clock:voidClock   , fn:(value: void) => value   , target:[createEffect((value: void) => {}), createEvent<void>()]       })
      sample({clock:voidClock   , fn:(value: void) => value   , target:[createEffect((value: unknown) => {}), createEvent<void>()]    })
      sample({clock:voidClock   , fn:(value: void) => value   , target:[createEffect((value: any) => {}), createEvent<void>()]        })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:[createEffect(() => {}), createEvent<void>()]                  })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:[createEffect<unknown, unknown>(() => {}), createEvent<void>()]})
      sample({clock:unknownClock, fn:(value: unknown) => value, target:[createEffect((value: void) => {}), createEvent<void>()]       })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:[createEffect((value: unknown) => {}), createEvent<void>()]    })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:[createEffect((value: any) => {}), createEvent<void>()]        })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[createEffect(() => {}), createEvent<void>()]                  })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[createEffect<unknown, unknown>(() => {}), createEvent<void>()]})
      sample({clock:anyClock    , fn:(value: any) => value    , target:[createEffect((value: void) => {}), createEvent<void>()]       })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[createEffect((value: unknown) => {}), createEvent<void>()]    })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[createEffect((value: any) => {}), createEvent<void>()]        })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[createEffect((value: number) => {}), createEvent<void>()]     })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[createEffect((value: string) => {}), createEvent<void>()]     })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect(() => {}), createEvent<void>()]                  })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect<unknown, unknown>(() => {}), createEvent<void>()]})
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect((value: void) => {}), createEvent<void>()]       })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect((value: unknown) => {}), createEvent<void>()]    })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect((value: any) => {}), createEvent<void>()]        })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect((value: never) => {}), createEvent<void>()]      })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect((value: number) => {}), createEvent<void>()]     })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect((value: string) => {}), createEvent<void>()]     })
      sample({clock:numberClock , fn:(value: number) => value , target:[createEffect(() => {}), createEvent<void>()]                  })
      sample({clock:numberClock , fn:(value: number) => value , target:[createEffect<unknown, unknown>(() => {}), createEvent<void>()]})
      sample({clock:numberClock , fn:(value: number) => value , target:[createEffect((value: void) => {}), createEvent<void>()]       })
      sample({clock:numberClock , fn:(value: number) => value , target:[createEffect((value: unknown) => {}), createEvent<void>()]    })
      sample({clock:numberClock , fn:(value: number) => value , target:[createEffect((value: any) => {}), createEvent<void>()]        })
      sample({clock:numberClock , fn:(value: number) => value , target:[createEffect((value: number) => {}), createEvent<void>()]     })
      sample({clock:stringClock , fn:(value: string) => value , target:[createEffect(() => {}), createEvent<void>()]                  })
      sample({clock:stringClock , fn:(value: string) => value , target:[createEffect<unknown, unknown>(() => {}), createEvent<void>()]})
      sample({clock:stringClock , fn:(value: string) => value , target:[createEffect((value: void) => {}), createEvent<void>()]       })
      sample({clock:stringClock , fn:(value: string) => value , target:[createEffect((value: unknown) => {}), createEvent<void>()]    })
      sample({clock:stringClock , fn:(value: string) => value , target:[createEffect((value: any) => {}), createEvent<void>()]        })
      sample({clock:stringClock , fn:(value: string) => value , target:[createEffect((value: string) => {}), createEvent<void>()]     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('multiple, fn, sync (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        fn: (value: void) => value,
        //@ts-expect-error
        target: [createEffect((value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        fn: (value: void) => value,
        //@ts-expect-error
        target: [createEffect((value: number) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        fn: (value: void) => value,
        //@ts-expect-error
        target: [createEffect((value: string) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        fn: (value: unknown) => value,
        //@ts-expect-error
        target: [createEffect((value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        fn: (value: unknown) => value,
        //@ts-expect-error
        target: [createEffect((value: number) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        fn: (value: unknown) => value,
        //@ts-expect-error
        target: [createEffect((value: string) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        fn: (value: any) => value,
        //@ts-expect-error
        target: [createEffect((value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        fn: (value: number) => value,
        //@ts-expect-error
        target: [createEffect((value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        fn: (value: number) => value,
        //@ts-expect-error
        target: [createEffect((value: string) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        fn: (value: string) => value,
        //@ts-expect-error
        target: [createEffect((value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        fn: (value: string) => value,
        //@ts-expect-error
        target: [createEffect((value: number) => {}), createEvent<void>()],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value?: void | undefined) => void; target: readonly [Unit<void>, Unit<void>]; error: \\"fn result should extend target type\\"; }'.
      lack of expected error at test line 7 'fn: (value: void) => value,'
      lack of expected error at test line 9 'target: [createEffect((value: never) => {}), createEvent<void>()],'
      lack of expected error at test line 13 'clock: voidClock,'
      Type '(value: void) => void' is not assignable to type '(value?: void | undefined) => number'.
        Type 'void' is not assignable to type 'number'.
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 21 'clock: voidClock,'
      Type '(value: void) => void' is not assignable to type '(value?: void | undefined) => string'.
        Type 'void' is not assignable to type 'string'.
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value: unknown) => void; target: readonly [Unit<unknown>, Unit<unknown>]; error: \\"fn result should extend target type\\"; }'.
      lack of expected error at test line 31 'fn: (value: unknown) => value,'
      lack of expected error at test line 33 'target: [createEffect((value: never) => {}), createEvent<void>()],'
      lack of expected error at test line 37 'clock: unknownClock,'
      Type '(value: unknown) => unknown' is not assignable to type '(value: unknown) => number'.
        Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 41 'target: [createEffect((value: number) => {}), createEvent<void>()],'
      lack of expected error at test line 45 'clock: unknownClock,'
      Type '(value: unknown) => unknown' is not assignable to type '(value: unknown) => string'.
        Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 49 'target: [createEffect((value: string) => {}), createEvent<void>()],'
      lack of expected error at test line 53 'clock: anyClock,'
      lack of expected error at test line 55 'fn: (value: any) => value,'
      lack of expected error at test line 57 'target: [createEffect((value: never) => {}), createEvent<void>()],'
      lack of expected error at test line 61 'clock: numberClock,'
      lack of expected error at test line 63 'fn: (value: number) => value,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      lack of expected error at test line 69 'clock: numberClock,'
      Type '(value: number) => number' is not assignable to type '(value: number) => string'.
        Type 'number' is not assignable to type 'string'.
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      lack of expected error at test line 77 'clock: stringClock,'
      lack of expected error at test line 79 'fn: (value: string) => value,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      lack of expected error at test line 85 'clock: stringClock,'
      Type '(value: string) => string' is not assignable to type '(value: string) => number'.
        Type 'string' is not assignable to type 'number'.
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      "
    `)
  })
})
describe('readonly, clock, sync', () => {
  test('readonly, clock, sync (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , target:[createEffect(() => {})] as const                  })
      sample({clock:voidClock   , target:[createEffect<unknown, unknown>(() => {})] as const})
      sample({clock:voidClock   , target:[createEffect((value: void) => {})] as const       })
      sample({clock:voidClock   , target:[createEffect((value: unknown) => {})] as const    })
      sample({clock:voidClock   , target:[createEffect((value: any) => {})] as const        })
      sample({clock:unknownClock, target:[createEffect(() => {})] as const                  })
      sample({clock:unknownClock, target:[createEffect<unknown, unknown>(() => {})] as const})
      sample({clock:unknownClock, target:[createEffect((value: void) => {})] as const       })
      sample({clock:unknownClock, target:[createEffect((value: unknown) => {})] as const    })
      sample({clock:unknownClock, target:[createEffect((value: any) => {})] as const        })
      sample({clock:anyClock    , target:[createEffect(() => {})] as const                  })
      sample({clock:anyClock    , target:[createEffect<unknown, unknown>(() => {})] as const})
      sample({clock:anyClock    , target:[createEffect((value: void) => {})] as const       })
      sample({clock:anyClock    , target:[createEffect((value: unknown) => {})] as const    })
      sample({clock:anyClock    , target:[createEffect((value: any) => {})] as const        })
      sample({clock:anyClock    , target:[createEffect((value: number) => {})] as const     })
      sample({clock:anyClock    , target:[createEffect((value: string) => {})] as const     })
      sample({clock:neverClock  , target:[createEffect(() => {})] as const                  })
      sample({clock:neverClock  , target:[createEffect<unknown, unknown>(() => {})] as const})
      sample({clock:neverClock  , target:[createEffect((value: void) => {})] as const       })
      sample({clock:neverClock  , target:[createEffect((value: unknown) => {})] as const    })
      sample({clock:neverClock  , target:[createEffect((value: any) => {})] as const        })
      sample({clock:neverClock  , target:[createEffect((value: never) => {})] as const      })
      sample({clock:neverClock  , target:[createEffect((value: number) => {})] as const     })
      sample({clock:neverClock  , target:[createEffect((value: string) => {})] as const     })
      sample({clock:numberClock , target:[createEffect(() => {})] as const                  })
      sample({clock:numberClock , target:[createEffect<unknown, unknown>(() => {})] as const})
      sample({clock:numberClock , target:[createEffect((value: void) => {})] as const       })
      sample({clock:numberClock , target:[createEffect((value: unknown) => {})] as const    })
      sample({clock:numberClock , target:[createEffect((value: any) => {})] as const        })
      sample({clock:numberClock , target:[createEffect((value: number) => {})] as const     })
      sample({clock:stringClock , target:[createEffect(() => {})] as const                  })
      sample({clock:stringClock , target:[createEffect<unknown, unknown>(() => {})] as const})
      sample({clock:stringClock , target:[createEffect((value: void) => {})] as const       })
      sample({clock:stringClock , target:[createEffect((value: unknown) => {})] as const    })
      sample({clock:stringClock , target:[createEffect((value: any) => {})] as const        })
      sample({clock:stringClock , target:[createEffect((value: string) => {})] as const     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('readonly, clock, sync (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: [createEffect((value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: [createEffect((value: number) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: [createEffect((value: string) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: [createEffect((value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: [createEffect((value: number) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: [createEffect((value: string) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        target: [createEffect((value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        target: [createEffect((value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        target: [createEffect((value: string) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        target: [createEffect((value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        target: [createEffect((value: number) => {})] as const,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 7 'target: [createEffect((value: never) => {})] as const,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 25 'target: [createEffect((value: never) => {})] as const,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 31 'target: [createEffect((value: number) => {})] as const,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 37 'target: [createEffect((value: string) => {})] as const,'
      Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'any' is not assignable to type 'never'.
      lack of expected error at test line 43 'target: [createEffect((value: never) => {})] as const,'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 49 'target: [createEffect((value: never) => {})] as const,'
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 61 'target: [createEffect((value: never) => {})] as const,'
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('readonly, source, sync', () => {
  test('readonly, source, sync (should pass)', () => {
    //prettier-ignore
    {
      sample({source:voidClock   , target:[createEffect(() => {})] as const                  })
      sample({source:voidClock   , target:[createEffect<unknown, unknown>(() => {})] as const})
      sample({source:voidClock   , target:[createEffect((value: void) => {})] as const       })
      sample({source:voidClock   , target:[createEffect((value: unknown) => {})] as const    })
      sample({source:voidClock   , target:[createEffect((value: any) => {})] as const        })
      sample({source:unknownClock, target:[createEffect(() => {})] as const                  })
      sample({source:unknownClock, target:[createEffect<unknown, unknown>(() => {})] as const})
      sample({source:unknownClock, target:[createEffect((value: void) => {})] as const       })
      sample({source:unknownClock, target:[createEffect((value: unknown) => {})] as const    })
      sample({source:unknownClock, target:[createEffect((value: any) => {})] as const        })
      sample({source:anyClock    , target:[createEffect(() => {})] as const                  })
      sample({source:anyClock    , target:[createEffect<unknown, unknown>(() => {})] as const})
      sample({source:anyClock    , target:[createEffect((value: void) => {})] as const       })
      sample({source:anyClock    , target:[createEffect((value: unknown) => {})] as const    })
      sample({source:anyClock    , target:[createEffect((value: any) => {})] as const        })
      sample({source:anyClock    , target:[createEffect((value: number) => {})] as const     })
      sample({source:anyClock    , target:[createEffect((value: string) => {})] as const     })
      sample({source:neverClock  , target:[createEffect(() => {})] as const                  })
      sample({source:neverClock  , target:[createEffect<unknown, unknown>(() => {})] as const})
      sample({source:neverClock  , target:[createEffect((value: void) => {})] as const       })
      sample({source:neverClock  , target:[createEffect((value: unknown) => {})] as const    })
      sample({source:neverClock  , target:[createEffect((value: any) => {})] as const        })
      sample({source:neverClock  , target:[createEffect((value: never) => {})] as const      })
      sample({source:neverClock  , target:[createEffect((value: number) => {})] as const     })
      sample({source:neverClock  , target:[createEffect((value: string) => {})] as const     })
      sample({source:numberClock , target:[createEffect(() => {})] as const                  })
      sample({source:numberClock , target:[createEffect<unknown, unknown>(() => {})] as const})
      sample({source:numberClock , target:[createEffect((value: void) => {})] as const       })
      sample({source:numberClock , target:[createEffect((value: unknown) => {})] as const    })
      sample({source:numberClock , target:[createEffect((value: any) => {})] as const        })
      sample({source:numberClock , target:[createEffect((value: number) => {})] as const     })
      sample({source:stringClock , target:[createEffect(() => {})] as const                  })
      sample({source:stringClock , target:[createEffect<unknown, unknown>(() => {})] as const})
      sample({source:stringClock , target:[createEffect((value: void) => {})] as const       })
      sample({source:stringClock , target:[createEffect((value: unknown) => {})] as const    })
      sample({source:stringClock , target:[createEffect((value: any) => {})] as const        })
      sample({source:stringClock , target:[createEffect((value: string) => {})] as const     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('readonly, source, sync (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [createEffect((value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [createEffect((value: number) => {})] as const,
      })
      sample({
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [createEffect((value: string) => {})] as const,
      })
      sample({
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [createEffect((value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [createEffect((value: number) => {})] as const,
      })
      sample({
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [createEffect((value: string) => {})] as const,
      })
      sample({
        //@ts-expect-error
        source: anyClock,
        //@ts-expect-error
        target: [createEffect((value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: [createEffect((value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: [createEffect((value: string) => {})] as const,
      })
      sample({
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: [createEffect((value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: [createEffect((value: number) => {})] as const,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 7 'target: [createEffect((value: never) => {})] as const,'
      lack of expected error at test line 11 'source: voidClock,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 17 'source: voidClock,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 25 'target: [createEffect((value: never) => {})] as const,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 31 'target: [createEffect((value: number) => {})] as const,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 37 'target: [createEffect((value: string) => {})] as const,'
      lack of expected error at test line 41 'source: anyClock,'
      lack of expected error at test line 43 'target: [createEffect((value: never) => {})] as const,'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 49 'target: [createEffect((value: never) => {})] as const,'
      lack of expected error at test line 53 'source: numberClock,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 61 'target: [createEffect((value: never) => {})] as const,'
      lack of expected error at test line 65 'source: stringClock,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('readonly, both, sync', () => {
  test('readonly, both, sync (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , source:voidClock   , target:[createEffect(() => {})] as const                  })
      sample({clock:voidClock   , source:voidClock   , target:[createEffect<unknown, unknown>(() => {})] as const})
      sample({clock:voidClock   , source:voidClock   , target:[createEffect((value: void) => {})] as const       })
      sample({clock:voidClock   , source:voidClock   , target:[createEffect((value: unknown) => {})] as const    })
      sample({clock:voidClock   , source:voidClock   , target:[createEffect((value: any) => {})] as const        })
      sample({clock:unknownClock, source:unknownClock, target:[createEffect(() => {})] as const                  })
      sample({clock:unknownClock, source:unknownClock, target:[createEffect<unknown, unknown>(() => {})] as const})
      sample({clock:unknownClock, source:unknownClock, target:[createEffect((value: void) => {})] as const       })
      sample({clock:unknownClock, source:unknownClock, target:[createEffect((value: unknown) => {})] as const    })
      sample({clock:unknownClock, source:unknownClock, target:[createEffect((value: any) => {})] as const        })
      sample({clock:anyClock    , source:anyClock    , target:[createEffect(() => {})] as const                  })
      sample({clock:anyClock    , source:anyClock    , target:[createEffect<unknown, unknown>(() => {})] as const})
      sample({clock:anyClock    , source:anyClock    , target:[createEffect((value: void) => {})] as const       })
      sample({clock:anyClock    , source:anyClock    , target:[createEffect((value: unknown) => {})] as const    })
      sample({clock:anyClock    , source:anyClock    , target:[createEffect((value: any) => {})] as const        })
      sample({clock:anyClock    , source:anyClock    , target:[createEffect((value: number) => {})] as const     })
      sample({clock:anyClock    , source:anyClock    , target:[createEffect((value: string) => {})] as const     })
      sample({clock:neverClock  , source:neverClock  , target:[createEffect(() => {})] as const                  })
      sample({clock:neverClock  , source:neverClock  , target:[createEffect<unknown, unknown>(() => {})] as const})
      sample({clock:neverClock  , source:neverClock  , target:[createEffect((value: void) => {})] as const       })
      sample({clock:neverClock  , source:neverClock  , target:[createEffect((value: unknown) => {})] as const    })
      sample({clock:neverClock  , source:neverClock  , target:[createEffect((value: any) => {})] as const        })
      sample({clock:neverClock  , source:neverClock  , target:[createEffect((value: never) => {})] as const      })
      sample({clock:neverClock  , source:neverClock  , target:[createEffect((value: number) => {})] as const     })
      sample({clock:neverClock  , source:neverClock  , target:[createEffect((value: string) => {})] as const     })
      sample({clock:numberClock , source:numberClock , target:[createEffect(() => {})] as const                  })
      sample({clock:numberClock , source:numberClock , target:[createEffect<unknown, unknown>(() => {})] as const})
      sample({clock:numberClock , source:numberClock , target:[createEffect((value: void) => {})] as const       })
      sample({clock:numberClock , source:numberClock , target:[createEffect((value: unknown) => {})] as const    })
      sample({clock:numberClock , source:numberClock , target:[createEffect((value: any) => {})] as const        })
      sample({clock:numberClock , source:numberClock , target:[createEffect((value: number) => {})] as const     })
      sample({clock:stringClock , source:stringClock , target:[createEffect(() => {})] as const                  })
      sample({clock:stringClock , source:stringClock , target:[createEffect<unknown, unknown>(() => {})] as const})
      sample({clock:stringClock , source:stringClock , target:[createEffect((value: void) => {})] as const       })
      sample({clock:stringClock , source:stringClock , target:[createEffect((value: unknown) => {})] as const    })
      sample({clock:stringClock , source:stringClock , target:[createEffect((value: any) => {})] as const        })
      sample({clock:stringClock , source:stringClock , target:[createEffect((value: string) => {})] as const     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('readonly, both, sync (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [createEffect((value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [createEffect((value: number) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [createEffect((value: string) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [createEffect((value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [createEffect((value: number) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [createEffect((value: string) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        source: anyClock,
        //@ts-expect-error
        target: [createEffect((value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: [createEffect((value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: [createEffect((value: string) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: [createEffect((value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: [createEffect((value: number) => {})] as const,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      lack of expected error at test line 5 'clock: voidClock,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 9 'target: [createEffect((value: never) => {})] as const,'
      lack of expected error at test line 13 'clock: voidClock,'
      lack of expected error at test line 15 'source: voidClock,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 21 'clock: voidClock,'
      lack of expected error at test line 23 'source: voidClock,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      lack of expected error at test line 29 'clock: unknownClock,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 33 'target: [createEffect((value: never) => {})] as const,'
      lack of expected error at test line 37 'clock: unknownClock,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 41 'target: [createEffect((value: number) => {})] as const,'
      lack of expected error at test line 45 'clock: unknownClock,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 49 'target: [createEffect((value: string) => {})] as const,'
      lack of expected error at test line 53 'clock: anyClock,'
      lack of expected error at test line 55 'source: anyClock,'
      lack of expected error at test line 57 'target: [createEffect((value: never) => {})] as const,'
      lack of expected error at test line 61 'clock: numberClock,'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 65 'target: [createEffect((value: never) => {})] as const,'
      lack of expected error at test line 69 'clock: numberClock,'
      lack of expected error at test line 71 'source: numberClock,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 77 'clock: stringClock,'
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 81 'target: [createEffect((value: never) => {})] as const,'
      lack of expected error at test line 85 'clock: stringClock,'
      lack of expected error at test line 87 'source: stringClock,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('readonly, Boolean, sync', () => {
  test('readonly, Boolean, sync (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , filter:Boolean, target:[createEffect(() => {})] as const                  })
      sample({clock:voidClock   , filter:Boolean, target:[createEffect<unknown, unknown>(() => {})] as const})
      sample({clock:voidClock   , filter:Boolean, target:[createEffect((value: void) => {})] as const       })
      sample({clock:voidClock   , filter:Boolean, target:[createEffect((value: unknown) => {})] as const    })
      sample({clock:voidClock   , filter:Boolean, target:[createEffect((value: any) => {})] as const        })
      sample({clock:unknownClock, filter:Boolean, target:[createEffect(() => {})] as const                  })
      sample({clock:unknownClock, filter:Boolean, target:[createEffect<unknown, unknown>(() => {})] as const})
      sample({clock:unknownClock, filter:Boolean, target:[createEffect((value: void) => {})] as const       })
      sample({clock:unknownClock, filter:Boolean, target:[createEffect((value: unknown) => {})] as const    })
      sample({clock:unknownClock, filter:Boolean, target:[createEffect((value: any) => {})] as const        })
      sample({clock:anyClock    , filter:Boolean, target:[createEffect(() => {})] as const                  })
      sample({clock:anyClock    , filter:Boolean, target:[createEffect<unknown, unknown>(() => {})] as const})
      sample({clock:anyClock    , filter:Boolean, target:[createEffect((value: void) => {})] as const       })
      sample({clock:anyClock    , filter:Boolean, target:[createEffect((value: unknown) => {})] as const    })
      sample({clock:anyClock    , filter:Boolean, target:[createEffect((value: any) => {})] as const        })
      sample({clock:anyClock    , filter:Boolean, target:[createEffect((value: number) => {})] as const     })
      sample({clock:anyClock    , filter:Boolean, target:[createEffect((value: string) => {})] as const     })
      sample({clock:neverClock  , filter:Boolean, target:[createEffect(() => {})] as const                  })
      sample({clock:neverClock  , filter:Boolean, target:[createEffect<unknown, unknown>(() => {})] as const})
      sample({clock:neverClock  , filter:Boolean, target:[createEffect((value: void) => {})] as const       })
      sample({clock:neverClock  , filter:Boolean, target:[createEffect((value: unknown) => {})] as const    })
      sample({clock:neverClock  , filter:Boolean, target:[createEffect((value: any) => {})] as const        })
      sample({clock:neverClock  , filter:Boolean, target:[createEffect((value: never) => {})] as const      })
      sample({clock:neverClock  , filter:Boolean, target:[createEffect((value: number) => {})] as const     })
      sample({clock:neverClock  , filter:Boolean, target:[createEffect((value: string) => {})] as const     })
      sample({clock:numberClock , filter:Boolean, target:[createEffect(() => {})] as const                  })
      sample({clock:numberClock , filter:Boolean, target:[createEffect<unknown, unknown>(() => {})] as const})
      sample({clock:numberClock , filter:Boolean, target:[createEffect((value: void) => {})] as const       })
      sample({clock:numberClock , filter:Boolean, target:[createEffect((value: unknown) => {})] as const    })
      sample({clock:numberClock , filter:Boolean, target:[createEffect((value: any) => {})] as const        })
      sample({clock:numberClock , filter:Boolean, target:[createEffect((value: number) => {})] as const     })
      sample({clock:stringClock , filter:Boolean, target:[createEffect(() => {})] as const                  })
      sample({clock:stringClock , filter:Boolean, target:[createEffect<unknown, unknown>(() => {})] as const})
      sample({clock:stringClock , filter:Boolean, target:[createEffect((value: void) => {})] as const       })
      sample({clock:stringClock , filter:Boolean, target:[createEffect((value: unknown) => {})] as const    })
      sample({clock:stringClock , filter:Boolean, target:[createEffect((value: any) => {})] as const        })
      sample({clock:stringClock , filter:Boolean, target:[createEffect((value: string) => {})] as const     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('readonly, Boolean, sync (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect((value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect((value: number) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect((value: string) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect((value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect((value: number) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect((value: string) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect((value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect((value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect((value: string) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect((value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect((value: number) => {})] as const,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 7 'filter: Boolean,'
      lack of expected error at test line 9 'target: [createEffect((value: never) => {})] as const,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      lack of expected error at test line 15 'filter: Boolean,'
      Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      lack of expected error at test line 23 'filter: Boolean,'
      Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 31 'filter: Boolean,'
      lack of expected error at test line 33 'target: [createEffect((value: never) => {})] as const,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 39 'filter: Boolean,'
      lack of expected error at test line 41 'target: [createEffect((value: number) => {})] as const,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 47 'filter: Boolean,'
      lack of expected error at test line 49 'target: [createEffect((value: string) => {})] as const,'
      Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'any' is not assignable to type 'never'.
      lack of expected error at test line 55 'filter: Boolean,'
      lack of expected error at test line 57 'target: [createEffect((value: never) => {})] as const,'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 63 'filter: Boolean,'
      lack of expected error at test line 65 'target: [createEffect((value: never) => {})] as const,'
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      lack of expected error at test line 71 'filter: Boolean,'
      Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 79 'filter: Boolean,'
      lack of expected error at test line 81 'target: [createEffect((value: never) => {})] as const,'
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 87 'filter: Boolean,'
      Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('readonly, filter, sync', () => {
  test('readonly, filter, sync (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , filter:() => true, target:[createEffect(() => {})] as const                  })
      sample({clock:voidClock   , filter:() => true, target:[createEffect<unknown, unknown>(() => {})] as const})
      sample({clock:voidClock   , filter:() => true, target:[createEffect((value: void) => {})] as const       })
      sample({clock:voidClock   , filter:() => true, target:[createEffect((value: unknown) => {})] as const    })
      sample({clock:voidClock   , filter:() => true, target:[createEffect((value: any) => {})] as const        })
      sample({clock:unknownClock, filter:() => true, target:[createEffect(() => {})] as const                  })
      sample({clock:unknownClock, filter:() => true, target:[createEffect<unknown, unknown>(() => {})] as const})
      sample({clock:unknownClock, filter:() => true, target:[createEffect((value: void) => {})] as const       })
      sample({clock:unknownClock, filter:() => true, target:[createEffect((value: unknown) => {})] as const    })
      sample({clock:unknownClock, filter:() => true, target:[createEffect((value: any) => {})] as const        })
      sample({clock:anyClock    , filter:() => true, target:[createEffect(() => {})] as const                  })
      sample({clock:anyClock    , filter:() => true, target:[createEffect<unknown, unknown>(() => {})] as const})
      sample({clock:anyClock    , filter:() => true, target:[createEffect((value: void) => {})] as const       })
      sample({clock:anyClock    , filter:() => true, target:[createEffect((value: unknown) => {})] as const    })
      sample({clock:anyClock    , filter:() => true, target:[createEffect((value: any) => {})] as const        })
      sample({clock:anyClock    , filter:() => true, target:[createEffect((value: number) => {})] as const     })
      sample({clock:anyClock    , filter:() => true, target:[createEffect((value: string) => {})] as const     })
      sample({clock:neverClock  , filter:() => true, target:[createEffect(() => {})] as const                  })
      sample({clock:neverClock  , filter:() => true, target:[createEffect<unknown, unknown>(() => {})] as const})
      sample({clock:neverClock  , filter:() => true, target:[createEffect((value: void) => {})] as const       })
      sample({clock:neverClock  , filter:() => true, target:[createEffect((value: unknown) => {})] as const    })
      sample({clock:neverClock  , filter:() => true, target:[createEffect((value: any) => {})] as const        })
      sample({clock:neverClock  , filter:() => true, target:[createEffect((value: never) => {})] as const      })
      sample({clock:neverClock  , filter:() => true, target:[createEffect((value: number) => {})] as const     })
      sample({clock:neverClock  , filter:() => true, target:[createEffect((value: string) => {})] as const     })
      sample({clock:numberClock , filter:() => true, target:[createEffect(() => {})] as const                  })
      sample({clock:numberClock , filter:() => true, target:[createEffect<unknown, unknown>(() => {})] as const})
      sample({clock:numberClock , filter:() => true, target:[createEffect((value: void) => {})] as const       })
      sample({clock:numberClock , filter:() => true, target:[createEffect((value: unknown) => {})] as const    })
      sample({clock:numberClock , filter:() => true, target:[createEffect((value: any) => {})] as const        })
      sample({clock:numberClock , filter:() => true, target:[createEffect((value: number) => {})] as const     })
      sample({clock:stringClock , filter:() => true, target:[createEffect(() => {})] as const                  })
      sample({clock:stringClock , filter:() => true, target:[createEffect<unknown, unknown>(() => {})] as const})
      sample({clock:stringClock , filter:() => true, target:[createEffect((value: void) => {})] as const       })
      sample({clock:stringClock , filter:() => true, target:[createEffect((value: unknown) => {})] as const    })
      sample({clock:stringClock , filter:() => true, target:[createEffect((value: any) => {})] as const        })
      sample({clock:stringClock , filter:() => true, target:[createEffect((value: string) => {})] as const     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('readonly, filter, sync (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect((value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect((value: number) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect((value: string) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect((value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect((value: number) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect((value: string) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect((value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect((value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect((value: string) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect((value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect((value: number) => {})] as const,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 7 'filter: () => true,'
      lack of expected error at test line 9 'target: [createEffect((value: never) => {})] as const,'
      lack of expected error at test line 13 'clock: voidClock,'
      lack of expected error at test line 15 'filter: () => true,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 21 'clock: voidClock,'
      lack of expected error at test line 23 'filter: () => true,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 31 'filter: () => true,'
      lack of expected error at test line 33 'target: [createEffect((value: never) => {})] as const,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 39 'filter: () => true,'
      lack of expected error at test line 41 'target: [createEffect((value: number) => {})] as const,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 47 'filter: () => true,'
      lack of expected error at test line 49 'target: [createEffect((value: string) => {})] as const,'
      lack of expected error at test line 53 'clock: anyClock,'
      lack of expected error at test line 55 'filter: () => true,'
      lack of expected error at test line 57 'target: [createEffect((value: never) => {})] as const,'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 63 'filter: () => true,'
      lack of expected error at test line 65 'target: [createEffect((value: never) => {})] as const,'
      lack of expected error at test line 69 'clock: numberClock,'
      lack of expected error at test line 71 'filter: () => true,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 79 'filter: () => true,'
      lack of expected error at test line 81 'target: [createEffect((value: never) => {})] as const,'
      lack of expected error at test line 85 'clock: stringClock,'
      lack of expected error at test line 87 'filter: () => true,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('readonly, fn, sync', () => {
  test('readonly, fn, sync (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , fn:(value: void) => value   , target:[createEffect(() => {})] as const                  })
      sample({clock:voidClock   , fn:(value: void) => value   , target:[createEffect<unknown, unknown>(() => {})] as const})
      sample({clock:voidClock   , fn:(value: void) => value   , target:[createEffect((value: void) => {})] as const       })
      sample({clock:voidClock   , fn:(value: void) => value   , target:[createEffect((value: unknown) => {})] as const    })
      sample({clock:voidClock   , fn:(value: void) => value   , target:[createEffect((value: any) => {})] as const        })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:[createEffect(() => {})] as const                  })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:[createEffect<unknown, unknown>(() => {})] as const})
      sample({clock:unknownClock, fn:(value: unknown) => value, target:[createEffect((value: void) => {})] as const       })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:[createEffect((value: unknown) => {})] as const    })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:[createEffect((value: any) => {})] as const        })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[createEffect(() => {})] as const                  })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[createEffect<unknown, unknown>(() => {})] as const})
      sample({clock:anyClock    , fn:(value: any) => value    , target:[createEffect((value: void) => {})] as const       })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[createEffect((value: unknown) => {})] as const    })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[createEffect((value: any) => {})] as const        })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[createEffect((value: number) => {})] as const     })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[createEffect((value: string) => {})] as const     })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect(() => {})] as const                  })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect<unknown, unknown>(() => {})] as const})
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect((value: void) => {})] as const       })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect((value: unknown) => {})] as const    })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect((value: any) => {})] as const        })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect((value: never) => {})] as const      })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect((value: number) => {})] as const     })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect((value: string) => {})] as const     })
      sample({clock:numberClock , fn:(value: number) => value , target:[createEffect(() => {})] as const                  })
      sample({clock:numberClock , fn:(value: number) => value , target:[createEffect<unknown, unknown>(() => {})] as const})
      sample({clock:numberClock , fn:(value: number) => value , target:[createEffect((value: void) => {})] as const       })
      sample({clock:numberClock , fn:(value: number) => value , target:[createEffect((value: unknown) => {})] as const    })
      sample({clock:numberClock , fn:(value: number) => value , target:[createEffect((value: any) => {})] as const        })
      sample({clock:numberClock , fn:(value: number) => value , target:[createEffect((value: number) => {})] as const     })
      sample({clock:stringClock , fn:(value: string) => value , target:[createEffect(() => {})] as const                  })
      sample({clock:stringClock , fn:(value: string) => value , target:[createEffect<unknown, unknown>(() => {})] as const})
      sample({clock:stringClock , fn:(value: string) => value , target:[createEffect((value: void) => {})] as const       })
      sample({clock:stringClock , fn:(value: string) => value , target:[createEffect((value: unknown) => {})] as const    })
      sample({clock:stringClock , fn:(value: string) => value , target:[createEffect((value: any) => {})] as const        })
      sample({clock:stringClock , fn:(value: string) => value , target:[createEffect((value: string) => {})] as const     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('readonly, fn, sync (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        fn: (value: void) => value,
        //@ts-expect-error
        target: [createEffect((value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        fn: (value: void) => value,
        //@ts-expect-error
        target: [createEffect((value: number) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        fn: (value: void) => value,
        //@ts-expect-error
        target: [createEffect((value: string) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        fn: (value: unknown) => value,
        //@ts-expect-error
        target: [createEffect((value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        fn: (value: unknown) => value,
        //@ts-expect-error
        target: [createEffect((value: number) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        fn: (value: unknown) => value,
        //@ts-expect-error
        target: [createEffect((value: string) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        fn: (value: any) => value,
        //@ts-expect-error
        target: [createEffect((value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        fn: (value: number) => value,
        //@ts-expect-error
        target: [createEffect((value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        fn: (value: number) => value,
        //@ts-expect-error
        target: [createEffect((value: string) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        fn: (value: string) => value,
        //@ts-expect-error
        target: [createEffect((value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        fn: (value: string) => value,
        //@ts-expect-error
        target: [createEffect((value: number) => {})] as const,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value?: void | undefined) => void; target: readonly [Unit<void>]; error: \\"fn result should extend target type\\"; }'.
      lack of expected error at test line 7 'fn: (value: void) => value,'
      lack of expected error at test line 9 'target: [createEffect((value: never) => {})] as const,'
      lack of expected error at test line 13 'clock: voidClock,'
      Type '(value: void) => void' is not assignable to type '(value?: void | undefined) => number'.
        Type 'void' is not assignable to type 'number'.
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 21 'clock: voidClock,'
      Type '(value: void) => void' is not assignable to type '(value?: void | undefined) => string'.
        Type 'void' is not assignable to type 'string'.
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value: unknown) => unknown; target: readonly [Unit<unknown>]; error: \\"fn result should extend target type\\"; }'.
      lack of expected error at test line 31 'fn: (value: unknown) => value,'
      lack of expected error at test line 33 'target: [createEffect((value: never) => {})] as const,'
      lack of expected error at test line 37 'clock: unknownClock,'
      Type '(value: unknown) => unknown' is not assignable to type '(value: unknown) => number'.
        Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 41 'target: [createEffect((value: number) => {})] as const,'
      lack of expected error at test line 45 'clock: unknownClock,'
      Type '(value: unknown) => unknown' is not assignable to type '(value: unknown) => string'.
        Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 49 'target: [createEffect((value: string) => {})] as const,'
      lack of expected error at test line 53 'clock: anyClock,'
      lack of expected error at test line 55 'fn: (value: any) => value,'
      lack of expected error at test line 57 'target: [createEffect((value: never) => {})] as const,'
      Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value: number) => number; target: readonly [Unit<number>]; error: \\"fn result should extend target type\\"; }'.
      lack of expected error at test line 63 'fn: (value: number) => value,'
      lack of expected error at test line 65 'target: [createEffect((value: never) => {})] as const,'
      lack of expected error at test line 69 'clock: numberClock,'
      Type '(value: number) => number' is not assignable to type '(value: number) => string'.
        Type 'number' is not assignable to type 'string'.
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value: string) => string; target: readonly [Unit<string>]; error: \\"fn result should extend target type\\"; }'.
      lack of expected error at test line 79 'fn: (value: string) => value,'
      lack of expected error at test line 81 'target: [createEffect((value: never) => {})] as const,'
      lack of expected error at test line 85 'clock: stringClock,'
      Type '(value: string) => string' is not assignable to type '(value: string) => number'.
        Type 'string' is not assignable to type 'number'.
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('extracted, clock, sync', () => {
  test('extracted, clock, sync (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , target:[syncinferred]       })
      sample({clock:voidClock   , target:[syncexplicitUnknown]})
      sample({clock:voidClock   , target:[syncvoid]           })
      sample({clock:voidClock   , target:[syncunknown]        })
      sample({clock:voidClock   , target:[syncany]            })
      sample({clock:unknownClock, target:[syncinferred]       })
      sample({clock:unknownClock, target:[syncexplicitUnknown]})
      sample({clock:unknownClock, target:[syncvoid]           })
      sample({clock:unknownClock, target:[syncunknown]        })
      sample({clock:unknownClock, target:[syncany]            })
      sample({clock:anyClock    , target:[syncinferred]       })
      sample({clock:anyClock    , target:[syncexplicitUnknown]})
      sample({clock:anyClock    , target:[syncvoid]           })
      sample({clock:anyClock    , target:[syncunknown]        })
      sample({clock:anyClock    , target:[syncany]            })
      sample({clock:anyClock    , target:[syncnumber]         })
      sample({clock:anyClock    , target:[syncstring]         })
      sample({clock:neverClock  , target:[syncinferred]       })
      sample({clock:neverClock  , target:[syncexplicitUnknown]})
      sample({clock:neverClock  , target:[syncvoid]           })
      sample({clock:neverClock  , target:[syncunknown]        })
      sample({clock:neverClock  , target:[syncany]            })
      sample({clock:neverClock  , target:[syncnever]          })
      sample({clock:neverClock  , target:[syncnumber]         })
      sample({clock:neverClock  , target:[syncstring]         })
      sample({clock:numberClock , target:[syncinferred]       })
      sample({clock:numberClock , target:[syncexplicitUnknown]})
      sample({clock:numberClock , target:[syncvoid]           })
      sample({clock:numberClock , target:[syncunknown]        })
      sample({clock:numberClock , target:[syncany]            })
      sample({clock:numberClock , target:[syncnumber]         })
      sample({clock:stringClock , target:[syncinferred]       })
      sample({clock:stringClock , target:[syncexplicitUnknown]})
      sample({clock:stringClock , target:[syncvoid]           })
      sample({clock:stringClock , target:[syncunknown]        })
      sample({clock:stringClock , target:[syncany]            })
      sample({clock:stringClock , target:[syncstring]         })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('extracted, clock, sync (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: [syncnever],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: [syncnumber],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: [syncstring],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: [syncnever],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: [syncnumber],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: [syncstring],
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        target: [syncnever],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        target: [syncnever],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        target: [syncstring],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        target: [syncnever],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        target: [syncnumber],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 7 'target: [syncnever],'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 25 'target: [syncnever],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 31 'target: [syncnumber],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 37 'target: [syncstring],'
      Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'any' is not assignable to type 'never'.
      lack of expected error at test line 43 'target: [syncnever],'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 49 'target: [syncnever],'
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 61 'target: [syncnever],'
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('extracted, source, sync', () => {
  test('extracted, source, sync (should pass)', () => {
    //prettier-ignore
    {
      sample({source:voidClock   , target:[syncinferred]       })
      sample({source:voidClock   , target:[syncexplicitUnknown]})
      sample({source:voidClock   , target:[syncvoid]           })
      sample({source:voidClock   , target:[syncunknown]        })
      sample({source:voidClock   , target:[syncany]            })
      sample({source:unknownClock, target:[syncinferred]       })
      sample({source:unknownClock, target:[syncexplicitUnknown]})
      sample({source:unknownClock, target:[syncvoid]           })
      sample({source:unknownClock, target:[syncunknown]        })
      sample({source:unknownClock, target:[syncany]            })
      sample({source:anyClock    , target:[syncinferred]       })
      sample({source:anyClock    , target:[syncexplicitUnknown]})
      sample({source:anyClock    , target:[syncvoid]           })
      sample({source:anyClock    , target:[syncunknown]        })
      sample({source:anyClock    , target:[syncany]            })
      sample({source:anyClock    , target:[syncnumber]         })
      sample({source:anyClock    , target:[syncstring]         })
      sample({source:neverClock  , target:[syncinferred]       })
      sample({source:neverClock  , target:[syncexplicitUnknown]})
      sample({source:neverClock  , target:[syncvoid]           })
      sample({source:neverClock  , target:[syncunknown]        })
      sample({source:neverClock  , target:[syncany]            })
      sample({source:neverClock  , target:[syncnever]          })
      sample({source:neverClock  , target:[syncnumber]         })
      sample({source:neverClock  , target:[syncstring]         })
      sample({source:numberClock , target:[syncinferred]       })
      sample({source:numberClock , target:[syncexplicitUnknown]})
      sample({source:numberClock , target:[syncvoid]           })
      sample({source:numberClock , target:[syncunknown]        })
      sample({source:numberClock , target:[syncany]            })
      sample({source:numberClock , target:[syncnumber]         })
      sample({source:stringClock , target:[syncinferred]       })
      sample({source:stringClock , target:[syncexplicitUnknown]})
      sample({source:stringClock , target:[syncvoid]           })
      sample({source:stringClock , target:[syncunknown]        })
      sample({source:stringClock , target:[syncany]            })
      sample({source:stringClock , target:[syncstring]         })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('extracted, source, sync (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [syncnever],
      })
      sample({
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [syncnumber],
      })
      sample({
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [syncstring],
      })
      sample({
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [syncnever],
      })
      sample({
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [syncnumber],
      })
      sample({
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [syncstring],
      })
      sample({
        //@ts-expect-error
        source: anyClock,
        //@ts-expect-error
        target: [syncnever],
      })
      sample({
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: [syncnever],
      })
      sample({
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: [syncstring],
      })
      sample({
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: [syncnever],
      })
      sample({
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: [syncnumber],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 7 'target: [syncnever],'
      lack of expected error at test line 11 'source: voidClock,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 17 'source: voidClock,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 25 'target: [syncnever],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 31 'target: [syncnumber],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 37 'target: [syncstring],'
      lack of expected error at test line 41 'source: anyClock,'
      lack of expected error at test line 43 'target: [syncnever],'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 49 'target: [syncnever],'
      lack of expected error at test line 53 'source: numberClock,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 61 'target: [syncnever],'
      lack of expected error at test line 65 'source: stringClock,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('extracted, both, sync', () => {
  test('extracted, both, sync (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , source:voidClock   , target:[syncinferred]       })
      sample({clock:voidClock   , source:voidClock   , target:[syncexplicitUnknown]})
      sample({clock:voidClock   , source:voidClock   , target:[syncvoid]           })
      sample({clock:voidClock   , source:voidClock   , target:[syncunknown]        })
      sample({clock:voidClock   , source:voidClock   , target:[syncany]            })
      sample({clock:unknownClock, source:unknownClock, target:[syncinferred]       })
      sample({clock:unknownClock, source:unknownClock, target:[syncexplicitUnknown]})
      sample({clock:unknownClock, source:unknownClock, target:[syncvoid]           })
      sample({clock:unknownClock, source:unknownClock, target:[syncunknown]        })
      sample({clock:unknownClock, source:unknownClock, target:[syncany]            })
      sample({clock:anyClock    , source:anyClock    , target:[syncinferred]       })
      sample({clock:anyClock    , source:anyClock    , target:[syncexplicitUnknown]})
      sample({clock:anyClock    , source:anyClock    , target:[syncvoid]           })
      sample({clock:anyClock    , source:anyClock    , target:[syncunknown]        })
      sample({clock:anyClock    , source:anyClock    , target:[syncany]            })
      sample({clock:anyClock    , source:anyClock    , target:[syncnumber]         })
      sample({clock:anyClock    , source:anyClock    , target:[syncstring]         })
      sample({clock:neverClock  , source:neverClock  , target:[syncinferred]       })
      sample({clock:neverClock  , source:neverClock  , target:[syncexplicitUnknown]})
      sample({clock:neverClock  , source:neverClock  , target:[syncvoid]           })
      sample({clock:neverClock  , source:neverClock  , target:[syncunknown]        })
      sample({clock:neverClock  , source:neverClock  , target:[syncany]            })
      sample({clock:neverClock  , source:neverClock  , target:[syncnever]          })
      sample({clock:neverClock  , source:neverClock  , target:[syncnumber]         })
      sample({clock:neverClock  , source:neverClock  , target:[syncstring]         })
      sample({clock:numberClock , source:numberClock , target:[syncinferred]       })
      sample({clock:numberClock , source:numberClock , target:[syncexplicitUnknown]})
      sample({clock:numberClock , source:numberClock , target:[syncvoid]           })
      sample({clock:numberClock , source:numberClock , target:[syncunknown]        })
      sample({clock:numberClock , source:numberClock , target:[syncany]            })
      sample({clock:numberClock , source:numberClock , target:[syncnumber]         })
      sample({clock:stringClock , source:stringClock , target:[syncinferred]       })
      sample({clock:stringClock , source:stringClock , target:[syncexplicitUnknown]})
      sample({clock:stringClock , source:stringClock , target:[syncvoid]           })
      sample({clock:stringClock , source:stringClock , target:[syncunknown]        })
      sample({clock:stringClock , source:stringClock , target:[syncany]            })
      sample({clock:stringClock , source:stringClock , target:[syncstring]         })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('extracted, both, sync (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [syncnever],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [syncnumber],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [syncstring],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [syncnever],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [syncnumber],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [syncstring],
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        source: anyClock,
        //@ts-expect-error
        target: [syncnever],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: [syncnever],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: [syncstring],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: [syncnever],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: [syncnumber],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      lack of expected error at test line 5 'clock: voidClock,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 9 'target: [syncnever],'
      lack of expected error at test line 13 'clock: voidClock,'
      lack of expected error at test line 15 'source: voidClock,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 21 'clock: voidClock,'
      lack of expected error at test line 23 'source: voidClock,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      lack of expected error at test line 29 'clock: unknownClock,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 33 'target: [syncnever],'
      lack of expected error at test line 37 'clock: unknownClock,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 41 'target: [syncnumber],'
      lack of expected error at test line 45 'clock: unknownClock,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 49 'target: [syncstring],'
      lack of expected error at test line 53 'clock: anyClock,'
      lack of expected error at test line 55 'source: anyClock,'
      lack of expected error at test line 57 'target: [syncnever],'
      lack of expected error at test line 61 'clock: numberClock,'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 65 'target: [syncnever],'
      lack of expected error at test line 69 'clock: numberClock,'
      lack of expected error at test line 71 'source: numberClock,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 77 'clock: stringClock,'
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 81 'target: [syncnever],'
      lack of expected error at test line 85 'clock: stringClock,'
      lack of expected error at test line 87 'source: stringClock,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('extracted, Boolean, sync', () => {
  test('extracted, Boolean, sync (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , filter:Boolean, target:[syncinferred]       })
      sample({clock:voidClock   , filter:Boolean, target:[syncexplicitUnknown]})
      sample({clock:voidClock   , filter:Boolean, target:[syncvoid]           })
      sample({clock:voidClock   , filter:Boolean, target:[syncunknown]        })
      sample({clock:voidClock   , filter:Boolean, target:[syncany]            })
      sample({clock:unknownClock, filter:Boolean, target:[syncinferred]       })
      sample({clock:unknownClock, filter:Boolean, target:[syncexplicitUnknown]})
      sample({clock:unknownClock, filter:Boolean, target:[syncvoid]           })
      sample({clock:unknownClock, filter:Boolean, target:[syncunknown]        })
      sample({clock:unknownClock, filter:Boolean, target:[syncany]            })
      sample({clock:anyClock    , filter:Boolean, target:[syncinferred]       })
      sample({clock:anyClock    , filter:Boolean, target:[syncexplicitUnknown]})
      sample({clock:anyClock    , filter:Boolean, target:[syncvoid]           })
      sample({clock:anyClock    , filter:Boolean, target:[syncunknown]        })
      sample({clock:anyClock    , filter:Boolean, target:[syncany]            })
      sample({clock:anyClock    , filter:Boolean, target:[syncnumber]         })
      sample({clock:anyClock    , filter:Boolean, target:[syncstring]         })
      sample({clock:neverClock  , filter:Boolean, target:[syncinferred]       })
      sample({clock:neverClock  , filter:Boolean, target:[syncexplicitUnknown]})
      sample({clock:neverClock  , filter:Boolean, target:[syncvoid]           })
      sample({clock:neverClock  , filter:Boolean, target:[syncunknown]        })
      sample({clock:neverClock  , filter:Boolean, target:[syncany]            })
      sample({clock:neverClock  , filter:Boolean, target:[syncnever]          })
      sample({clock:neverClock  , filter:Boolean, target:[syncnumber]         })
      sample({clock:neverClock  , filter:Boolean, target:[syncstring]         })
      sample({clock:numberClock , filter:Boolean, target:[syncinferred]       })
      sample({clock:numberClock , filter:Boolean, target:[syncexplicitUnknown]})
      sample({clock:numberClock , filter:Boolean, target:[syncvoid]           })
      sample({clock:numberClock , filter:Boolean, target:[syncunknown]        })
      sample({clock:numberClock , filter:Boolean, target:[syncany]            })
      sample({clock:numberClock , filter:Boolean, target:[syncnumber]         })
      sample({clock:stringClock , filter:Boolean, target:[syncinferred]       })
      sample({clock:stringClock , filter:Boolean, target:[syncexplicitUnknown]})
      sample({clock:stringClock , filter:Boolean, target:[syncvoid]           })
      sample({clock:stringClock , filter:Boolean, target:[syncunknown]        })
      sample({clock:stringClock , filter:Boolean, target:[syncany]            })
      sample({clock:stringClock , filter:Boolean, target:[syncstring]         })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('extracted, Boolean, sync (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [syncnever],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [syncnumber],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [syncstring],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [syncnever],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [syncnumber],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [syncstring],
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [syncnever],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [syncnever],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [syncstring],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [syncnever],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [syncnumber],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 7 'filter: Boolean,'
      lack of expected error at test line 9 'target: [syncnever],'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      lack of expected error at test line 15 'filter: Boolean,'
      Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      lack of expected error at test line 23 'filter: Boolean,'
      Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 31 'filter: Boolean,'
      lack of expected error at test line 33 'target: [syncnever],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 39 'filter: Boolean,'
      lack of expected error at test line 41 'target: [syncnumber],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 47 'filter: Boolean,'
      lack of expected error at test line 49 'target: [syncstring],'
      Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'any' is not assignable to type 'never'.
      lack of expected error at test line 55 'filter: Boolean,'
      lack of expected error at test line 57 'target: [syncnever],'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 63 'filter: Boolean,'
      lack of expected error at test line 65 'target: [syncnever],'
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      lack of expected error at test line 71 'filter: Boolean,'
      Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 79 'filter: Boolean,'
      lack of expected error at test line 81 'target: [syncnever],'
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 87 'filter: Boolean,'
      Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('extracted, filter, sync', () => {
  test('extracted, filter, sync (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , filter:() => true, target:[syncinferred]       })
      sample({clock:voidClock   , filter:() => true, target:[syncexplicitUnknown]})
      sample({clock:voidClock   , filter:() => true, target:[syncvoid]           })
      sample({clock:voidClock   , filter:() => true, target:[syncunknown]        })
      sample({clock:voidClock   , filter:() => true, target:[syncany]            })
      sample({clock:unknownClock, filter:() => true, target:[syncinferred]       })
      sample({clock:unknownClock, filter:() => true, target:[syncexplicitUnknown]})
      sample({clock:unknownClock, filter:() => true, target:[syncvoid]           })
      sample({clock:unknownClock, filter:() => true, target:[syncunknown]        })
      sample({clock:unknownClock, filter:() => true, target:[syncany]            })
      sample({clock:anyClock    , filter:() => true, target:[syncinferred]       })
      sample({clock:anyClock    , filter:() => true, target:[syncexplicitUnknown]})
      sample({clock:anyClock    , filter:() => true, target:[syncvoid]           })
      sample({clock:anyClock    , filter:() => true, target:[syncunknown]        })
      sample({clock:anyClock    , filter:() => true, target:[syncany]            })
      sample({clock:anyClock    , filter:() => true, target:[syncnumber]         })
      sample({clock:anyClock    , filter:() => true, target:[syncstring]         })
      sample({clock:neverClock  , filter:() => true, target:[syncinferred]       })
      sample({clock:neverClock  , filter:() => true, target:[syncexplicitUnknown]})
      sample({clock:neverClock  , filter:() => true, target:[syncvoid]           })
      sample({clock:neverClock  , filter:() => true, target:[syncunknown]        })
      sample({clock:neverClock  , filter:() => true, target:[syncany]            })
      sample({clock:neverClock  , filter:() => true, target:[syncnever]          })
      sample({clock:neverClock  , filter:() => true, target:[syncnumber]         })
      sample({clock:neverClock  , filter:() => true, target:[syncstring]         })
      sample({clock:numberClock , filter:() => true, target:[syncinferred]       })
      sample({clock:numberClock , filter:() => true, target:[syncexplicitUnknown]})
      sample({clock:numberClock , filter:() => true, target:[syncvoid]           })
      sample({clock:numberClock , filter:() => true, target:[syncunknown]        })
      sample({clock:numberClock , filter:() => true, target:[syncany]            })
      sample({clock:numberClock , filter:() => true, target:[syncnumber]         })
      sample({clock:stringClock , filter:() => true, target:[syncinferred]       })
      sample({clock:stringClock , filter:() => true, target:[syncexplicitUnknown]})
      sample({clock:stringClock , filter:() => true, target:[syncvoid]           })
      sample({clock:stringClock , filter:() => true, target:[syncunknown]        })
      sample({clock:stringClock , filter:() => true, target:[syncany]            })
      sample({clock:stringClock , filter:() => true, target:[syncstring]         })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('extracted, filter, sync (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [syncnever],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [syncnumber],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [syncstring],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [syncnever],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [syncnumber],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [syncstring],
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [syncnever],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [syncnever],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [syncstring],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [syncnever],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [syncnumber],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 7 'filter: () => true,'
      lack of expected error at test line 9 'target: [syncnever],'
      lack of expected error at test line 13 'clock: voidClock,'
      lack of expected error at test line 15 'filter: () => true,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 21 'clock: voidClock,'
      lack of expected error at test line 23 'filter: () => true,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 31 'filter: () => true,'
      lack of expected error at test line 33 'target: [syncnever],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 39 'filter: () => true,'
      lack of expected error at test line 41 'target: [syncnumber],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 47 'filter: () => true,'
      lack of expected error at test line 49 'target: [syncstring],'
      lack of expected error at test line 53 'clock: anyClock,'
      lack of expected error at test line 55 'filter: () => true,'
      lack of expected error at test line 57 'target: [syncnever],'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 63 'filter: () => true,'
      lack of expected error at test line 65 'target: [syncnever],'
      lack of expected error at test line 69 'clock: numberClock,'
      lack of expected error at test line 71 'filter: () => true,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 79 'filter: () => true,'
      lack of expected error at test line 81 'target: [syncnever],'
      lack of expected error at test line 85 'clock: stringClock,'
      lack of expected error at test line 87 'filter: () => true,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('extracted, fn, sync', () => {
  test('extracted, fn, sync (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , fn:(value: void) => value   , target:[syncinferred]       })
      sample({clock:voidClock   , fn:(value: void) => value   , target:[syncexplicitUnknown]})
      sample({clock:voidClock   , fn:(value: void) => value   , target:[syncvoid]           })
      sample({clock:voidClock   , fn:(value: void) => value   , target:[syncunknown]        })
      sample({clock:voidClock   , fn:(value: void) => value   , target:[syncany]            })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:[syncinferred]       })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:[syncexplicitUnknown]})
      sample({clock:unknownClock, fn:(value: unknown) => value, target:[syncvoid]           })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:[syncunknown]        })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:[syncany]            })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[syncinferred]       })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[syncexplicitUnknown]})
      sample({clock:anyClock    , fn:(value: any) => value    , target:[syncvoid]           })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[syncunknown]        })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[syncany]            })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[syncnumber]         })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[syncstring]         })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[syncinferred]       })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[syncexplicitUnknown]})
      sample({clock:neverClock  , fn:(value: never) => value  , target:[syncvoid]           })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[syncunknown]        })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[syncany]            })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[syncnever]          })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[syncnumber]         })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[syncstring]         })
      sample({clock:numberClock , fn:(value: number) => value , target:[syncinferred]       })
      sample({clock:numberClock , fn:(value: number) => value , target:[syncexplicitUnknown]})
      sample({clock:numberClock , fn:(value: number) => value , target:[syncvoid]           })
      sample({clock:numberClock , fn:(value: number) => value , target:[syncunknown]        })
      sample({clock:numberClock , fn:(value: number) => value , target:[syncany]            })
      sample({clock:numberClock , fn:(value: number) => value , target:[syncnumber]         })
      sample({clock:stringClock , fn:(value: string) => value , target:[syncinferred]       })
      sample({clock:stringClock , fn:(value: string) => value , target:[syncexplicitUnknown]})
      sample({clock:stringClock , fn:(value: string) => value , target:[syncvoid]           })
      sample({clock:stringClock , fn:(value: string) => value , target:[syncunknown]        })
      sample({clock:stringClock , fn:(value: string) => value , target:[syncany]            })
      sample({clock:stringClock , fn:(value: string) => value , target:[syncstring]         })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('extracted, fn, sync (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        fn: (value: void) => value,
        //@ts-expect-error
        target: [syncnever],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        fn: (value: void) => value,
        //@ts-expect-error
        target: [syncnumber],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        fn: (value: void) => value,
        //@ts-expect-error
        target: [syncstring],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        fn: (value: unknown) => value,
        //@ts-expect-error
        target: [syncnever],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        fn: (value: unknown) => value,
        //@ts-expect-error
        target: [syncnumber],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        fn: (value: unknown) => value,
        //@ts-expect-error
        target: [syncstring],
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        fn: (value: any) => value,
        //@ts-expect-error
        target: [syncnever],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        fn: (value: number) => value,
        //@ts-expect-error
        target: [syncnever],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        fn: (value: number) => value,
        //@ts-expect-error
        target: [syncstring],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        fn: (value: string) => value,
        //@ts-expect-error
        target: [syncnever],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        fn: (value: string) => value,
        //@ts-expect-error
        target: [syncnumber],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value?: void | undefined) => void; target: readonly [Unit<void>]; error: \\"fn result should extend target type\\"; }'.
      lack of expected error at test line 7 'fn: (value: void) => value,'
      lack of expected error at test line 9 'target: [syncnever],'
      lack of expected error at test line 13 'clock: voidClock,'
      Type '(value: void) => void' is not assignable to type '(value?: void | undefined) => number'.
        Type 'void' is not assignable to type 'number'.
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 21 'clock: voidClock,'
      Type '(value: void) => void' is not assignable to type '(value?: void | undefined) => string'.
        Type 'void' is not assignable to type 'string'.
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value: unknown) => unknown; target: readonly [Unit<unknown>]; error: \\"fn result should extend target type\\"; }'.
      lack of expected error at test line 31 'fn: (value: unknown) => value,'
      lack of expected error at test line 33 'target: [syncnever],'
      lack of expected error at test line 37 'clock: unknownClock,'
      Type '(value: unknown) => unknown' is not assignable to type '(value: unknown) => number'.
        Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 41 'target: [syncnumber],'
      lack of expected error at test line 45 'clock: unknownClock,'
      Type '(value: unknown) => unknown' is not assignable to type '(value: unknown) => string'.
        Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 49 'target: [syncstring],'
      lack of expected error at test line 53 'clock: anyClock,'
      lack of expected error at test line 55 'fn: (value: any) => value,'
      lack of expected error at test line 57 'target: [syncnever],'
      Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value: number) => number; target: readonly [Unit<number>]; error: \\"fn result should extend target type\\"; }'.
      lack of expected error at test line 63 'fn: (value: number) => value,'
      lack of expected error at test line 65 'target: [syncnever],'
      lack of expected error at test line 69 'clock: numberClock,'
      Type '(value: number) => number' is not assignable to type '(value: number) => string'.
        Type 'number' is not assignable to type 'string'.
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value: string) => string; target: readonly [Unit<string>]; error: \\"fn result should extend target type\\"; }'.
      lack of expected error at test line 79 'fn: (value: string) => value,'
      lack of expected error at test line 81 'target: [syncnever],'
      lack of expected error at test line 85 'clock: stringClock,'
      Type '(value: string) => string' is not assignable to type '(value: string) => number'.
        Type 'string' is not assignable to type 'number'.
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('mutable, clock, sync', () => {
  test('mutable, clock, sync (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , target:syncinferredMutable       })
      sample({clock:voidClock   , target:syncexplicitUnknownMutable})
      sample({clock:voidClock   , target:syncvoidMutable           })
      sample({clock:voidClock   , target:syncunknownMutable        })
      sample({clock:voidClock   , target:syncanyMutable            })
      sample({clock:unknownClock, target:syncinferredMutable       })
      sample({clock:unknownClock, target:syncexplicitUnknownMutable})
      sample({clock:unknownClock, target:syncvoidMutable           })
      sample({clock:unknownClock, target:syncunknownMutable        })
      sample({clock:unknownClock, target:syncanyMutable            })
      sample({clock:anyClock    , target:syncinferredMutable       })
      sample({clock:anyClock    , target:syncexplicitUnknownMutable})
      sample({clock:anyClock    , target:syncvoidMutable           })
      sample({clock:anyClock    , target:syncunknownMutable        })
      sample({clock:anyClock    , target:syncanyMutable            })
      sample({clock:anyClock    , target:syncnumberMutable         })
      sample({clock:anyClock    , target:syncstringMutable         })
      sample({clock:neverClock  , target:syncinferredMutable       })
      sample({clock:neverClock  , target:syncexplicitUnknownMutable})
      sample({clock:neverClock  , target:syncvoidMutable           })
      sample({clock:neverClock  , target:syncunknownMutable        })
      sample({clock:neverClock  , target:syncanyMutable            })
      sample({clock:neverClock  , target:syncneverMutable          })
      sample({clock:neverClock  , target:syncnumberMutable         })
      sample({clock:neverClock  , target:syncstringMutable         })
      sample({clock:numberClock , target:syncinferredMutable       })
      sample({clock:numberClock , target:syncexplicitUnknownMutable})
      sample({clock:numberClock , target:syncvoidMutable           })
      sample({clock:numberClock , target:syncunknownMutable        })
      sample({clock:numberClock , target:syncanyMutable            })
      sample({clock:numberClock , target:syncnumberMutable         })
      sample({clock:stringClock , target:syncinferredMutable       })
      sample({clock:stringClock , target:syncexplicitUnknownMutable})
      sample({clock:stringClock , target:syncvoidMutable           })
      sample({clock:stringClock , target:syncunknownMutable        })
      sample({clock:stringClock , target:syncanyMutable            })
      sample({clock:stringClock , target:syncstringMutable         })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('mutable, clock, sync (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: syncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: syncnumberMutable,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: syncstringMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: syncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: syncnumberMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: syncstringMutable,
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        target: syncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        target: syncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        target: syncstringMutable,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        target: syncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        target: syncnumberMutable,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      lack of expected error at test line 5 'clock: voidClock,'
      lack of expected error at test line 7 'target: syncneverMutable,'
      lack of expected error at test line 11 'clock: voidClock,'
      Type 'Effect<number, void, Error>[]' is not assignable to type 'readonly UnitTargetable<void>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<void>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 17 'clock: voidClock,'
      Type 'Effect<string, void, Error>[]' is not assignable to type 'readonly UnitTargetable<void>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<void>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'void'.
      lack of expected error at test line 23 'clock: unknownClock,'
      lack of expected error at test line 25 'target: syncneverMutable,'
      lack of expected error at test line 29 'clock: unknownClock,'
      lack of expected error at test line 31 'target: syncnumberMutable,'
      lack of expected error at test line 35 'clock: unknownClock,'
      lack of expected error at test line 37 'target: syncstringMutable,'
      lack of expected error at test line 41 'clock: anyClock,'
      lack of expected error at test line 43 'target: syncneverMutable,'
      lack of expected error at test line 47 'clock: numberClock,'
      lack of expected error at test line 49 'target: syncneverMutable,'
      lack of expected error at test line 53 'clock: numberClock,'
      Type 'Effect<string, void, Error>[]' is not assignable to type 'readonly UnitTargetable<number>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<number>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 59 'clock: stringClock,'
      lack of expected error at test line 61 'target: syncneverMutable,'
      lack of expected error at test line 65 'clock: stringClock,'
      Type 'Effect<number, void, Error>[]' is not assignable to type 'readonly UnitTargetable<string>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<string>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('mutable, source, sync', () => {
  test('mutable, source, sync (should pass)', () => {
    //prettier-ignore
    {
      sample({source:voidClock   , target:syncinferredMutable       })
      sample({source:voidClock   , target:syncexplicitUnknownMutable})
      sample({source:voidClock   , target:syncvoidMutable           })
      sample({source:voidClock   , target:syncunknownMutable        })
      sample({source:voidClock   , target:syncanyMutable            })
      sample({source:unknownClock, target:syncinferredMutable       })
      sample({source:unknownClock, target:syncexplicitUnknownMutable})
      sample({source:unknownClock, target:syncvoidMutable           })
      sample({source:unknownClock, target:syncunknownMutable        })
      sample({source:unknownClock, target:syncanyMutable            })
      sample({source:anyClock    , target:syncinferredMutable       })
      sample({source:anyClock    , target:syncexplicitUnknownMutable})
      sample({source:anyClock    , target:syncvoidMutable           })
      sample({source:anyClock    , target:syncunknownMutable        })
      sample({source:anyClock    , target:syncanyMutable            })
      sample({source:anyClock    , target:syncnumberMutable         })
      sample({source:anyClock    , target:syncstringMutable         })
      sample({source:neverClock  , target:syncinferredMutable       })
      sample({source:neverClock  , target:syncexplicitUnknownMutable})
      sample({source:neverClock  , target:syncvoidMutable           })
      sample({source:neverClock  , target:syncunknownMutable        })
      sample({source:neverClock  , target:syncanyMutable            })
      sample({source:neverClock  , target:syncneverMutable          })
      sample({source:neverClock  , target:syncnumberMutable         })
      sample({source:neverClock  , target:syncstringMutable         })
      sample({source:numberClock , target:syncinferredMutable       })
      sample({source:numberClock , target:syncexplicitUnknownMutable})
      sample({source:numberClock , target:syncvoidMutable           })
      sample({source:numberClock , target:syncunknownMutable        })
      sample({source:numberClock , target:syncanyMutable            })
      sample({source:numberClock , target:syncnumberMutable         })
      sample({source:stringClock , target:syncinferredMutable       })
      sample({source:stringClock , target:syncexplicitUnknownMutable})
      sample({source:stringClock , target:syncvoidMutable           })
      sample({source:stringClock , target:syncunknownMutable        })
      sample({source:stringClock , target:syncanyMutable            })
      sample({source:stringClock , target:syncstringMutable         })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('mutable, source, sync (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: syncneverMutable,
      })
      sample({
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: syncnumberMutable,
      })
      sample({
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: syncstringMutable,
      })
      sample({
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: syncneverMutable,
      })
      sample({
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: syncnumberMutable,
      })
      sample({
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: syncstringMutable,
      })
      sample({
        //@ts-expect-error
        source: anyClock,
        //@ts-expect-error
        target: syncneverMutable,
      })
      sample({
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: syncneverMutable,
      })
      sample({
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: syncstringMutable,
      })
      sample({
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: syncneverMutable,
      })
      sample({
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: syncnumberMutable,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 7 'target: syncneverMutable,'
      lack of expected error at test line 11 'source: voidClock,'
      Type 'Effect<number, void, Error>[]' is not assignable to type 'Unit<void>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 17 'source: voidClock,'
      Type 'Effect<string, void, Error>[]' is not assignable to type 'Unit<void>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 25 'target: syncneverMutable,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 31 'target: syncnumberMutable,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 37 'target: syncstringMutable,'
      lack of expected error at test line 41 'source: anyClock,'
      lack of expected error at test line 43 'target: syncneverMutable,'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 49 'target: syncneverMutable,'
      lack of expected error at test line 53 'source: numberClock,'
      Type 'Effect<string, void, Error>[]' is not assignable to type 'Unit<number>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 61 'target: syncneverMutable,'
      lack of expected error at test line 65 'source: stringClock,'
      Type 'Effect<number, void, Error>[]' is not assignable to type 'Unit<string>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('mutable, both, sync', () => {
  test('mutable, both, sync (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , source:voidClock   , target:syncinferredMutable       })
      sample({clock:voidClock   , source:voidClock   , target:syncexplicitUnknownMutable})
      sample({clock:voidClock   , source:voidClock   , target:syncvoidMutable           })
      sample({clock:voidClock   , source:voidClock   , target:syncunknownMutable        })
      sample({clock:voidClock   , source:voidClock   , target:syncanyMutable            })
      sample({clock:unknownClock, source:unknownClock, target:syncinferredMutable       })
      sample({clock:unknownClock, source:unknownClock, target:syncexplicitUnknownMutable})
      sample({clock:unknownClock, source:unknownClock, target:syncvoidMutable           })
      sample({clock:unknownClock, source:unknownClock, target:syncunknownMutable        })
      sample({clock:unknownClock, source:unknownClock, target:syncanyMutable            })
      sample({clock:anyClock    , source:anyClock    , target:syncinferredMutable       })
      sample({clock:anyClock    , source:anyClock    , target:syncexplicitUnknownMutable})
      sample({clock:anyClock    , source:anyClock    , target:syncvoidMutable           })
      sample({clock:anyClock    , source:anyClock    , target:syncunknownMutable        })
      sample({clock:anyClock    , source:anyClock    , target:syncanyMutable            })
      sample({clock:anyClock    , source:anyClock    , target:syncnumberMutable         })
      sample({clock:anyClock    , source:anyClock    , target:syncstringMutable         })
      sample({clock:neverClock  , source:neverClock  , target:syncinferredMutable       })
      sample({clock:neverClock  , source:neverClock  , target:syncexplicitUnknownMutable})
      sample({clock:neverClock  , source:neverClock  , target:syncvoidMutable           })
      sample({clock:neverClock  , source:neverClock  , target:syncunknownMutable        })
      sample({clock:neverClock  , source:neverClock  , target:syncanyMutable            })
      sample({clock:neverClock  , source:neverClock  , target:syncneverMutable          })
      sample({clock:neverClock  , source:neverClock  , target:syncnumberMutable         })
      sample({clock:neverClock  , source:neverClock  , target:syncstringMutable         })
      sample({clock:numberClock , source:numberClock , target:syncinferredMutable       })
      sample({clock:numberClock , source:numberClock , target:syncexplicitUnknownMutable})
      sample({clock:numberClock , source:numberClock , target:syncvoidMutable           })
      sample({clock:numberClock , source:numberClock , target:syncunknownMutable        })
      sample({clock:numberClock , source:numberClock , target:syncanyMutable            })
      sample({clock:numberClock , source:numberClock , target:syncnumberMutable         })
      sample({clock:stringClock , source:stringClock , target:syncinferredMutable       })
      sample({clock:stringClock , source:stringClock , target:syncexplicitUnknownMutable})
      sample({clock:stringClock , source:stringClock , target:syncvoidMutable           })
      sample({clock:stringClock , source:stringClock , target:syncunknownMutable        })
      sample({clock:stringClock , source:stringClock , target:syncanyMutable            })
      sample({clock:stringClock , source:stringClock , target:syncstringMutable         })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('mutable, both, sync (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: syncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: syncnumberMutable,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: syncstringMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: syncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: syncnumberMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: syncstringMutable,
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        source: anyClock,
        //@ts-expect-error
        target: syncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: syncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: syncstringMutable,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: syncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: syncnumberMutable,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      lack of expected error at test line 5 'clock: voidClock,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 9 'target: syncneverMutable,'
      lack of expected error at test line 13 'clock: voidClock,'
      lack of expected error at test line 15 'source: voidClock,'
      Type 'Effect<number, void, Error>[]' is not assignable to type 'Unit<void>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 21 'clock: voidClock,'
      lack of expected error at test line 23 'source: voidClock,'
      Type 'Effect<string, void, Error>[]' is not assignable to type 'Unit<void>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'void'.
      lack of expected error at test line 29 'clock: unknownClock,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 33 'target: syncneverMutable,'
      lack of expected error at test line 37 'clock: unknownClock,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 41 'target: syncnumberMutable,'
      lack of expected error at test line 45 'clock: unknownClock,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 49 'target: syncstringMutable,'
      lack of expected error at test line 53 'clock: anyClock,'
      lack of expected error at test line 55 'source: anyClock,'
      lack of expected error at test line 57 'target: syncneverMutable,'
      lack of expected error at test line 61 'clock: numberClock,'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 65 'target: syncneverMutable,'
      lack of expected error at test line 69 'clock: numberClock,'
      lack of expected error at test line 71 'source: numberClock,'
      Type 'Effect<string, void, Error>[]' is not assignable to type 'Unit<number>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 77 'clock: stringClock,'
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 81 'target: syncneverMutable,'
      lack of expected error at test line 85 'clock: stringClock,'
      lack of expected error at test line 87 'source: stringClock,'
      Type 'Effect<number, void, Error>[]' is not assignable to type 'Unit<string>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('mutable, Boolean, sync', () => {
  test('mutable, Boolean, sync (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , filter:Boolean, target:syncinferredMutable       })
      sample({clock:voidClock   , filter:Boolean, target:syncexplicitUnknownMutable})
      sample({clock:voidClock   , filter:Boolean, target:syncvoidMutable           })
      sample({clock:voidClock   , filter:Boolean, target:syncunknownMutable        })
      sample({clock:voidClock   , filter:Boolean, target:syncanyMutable            })
      sample({clock:unknownClock, filter:Boolean, target:syncinferredMutable       })
      sample({clock:unknownClock, filter:Boolean, target:syncexplicitUnknownMutable})
      sample({clock:unknownClock, filter:Boolean, target:syncvoidMutable           })
      sample({clock:unknownClock, filter:Boolean, target:syncunknownMutable        })
      sample({clock:unknownClock, filter:Boolean, target:syncanyMutable            })
      sample({clock:anyClock    , filter:Boolean, target:syncinferredMutable       })
      sample({clock:anyClock    , filter:Boolean, target:syncexplicitUnknownMutable})
      sample({clock:anyClock    , filter:Boolean, target:syncvoidMutable           })
      sample({clock:anyClock    , filter:Boolean, target:syncunknownMutable        })
      sample({clock:anyClock    , filter:Boolean, target:syncanyMutable            })
      sample({clock:anyClock    , filter:Boolean, target:syncnumberMutable         })
      sample({clock:anyClock    , filter:Boolean, target:syncstringMutable         })
      sample({clock:neverClock  , filter:Boolean, target:syncinferredMutable       })
      sample({clock:neverClock  , filter:Boolean, target:syncexplicitUnknownMutable})
      sample({clock:neverClock  , filter:Boolean, target:syncvoidMutable           })
      sample({clock:neverClock  , filter:Boolean, target:syncunknownMutable        })
      sample({clock:neverClock  , filter:Boolean, target:syncanyMutable            })
      sample({clock:neverClock  , filter:Boolean, target:syncneverMutable          })
      sample({clock:neverClock  , filter:Boolean, target:syncnumberMutable         })
      sample({clock:neverClock  , filter:Boolean, target:syncstringMutable         })
      sample({clock:numberClock , filter:Boolean, target:syncinferredMutable       })
      sample({clock:numberClock , filter:Boolean, target:syncexplicitUnknownMutable})
      sample({clock:numberClock , filter:Boolean, target:syncvoidMutable           })
      sample({clock:numberClock , filter:Boolean, target:syncunknownMutable        })
      sample({clock:numberClock , filter:Boolean, target:syncanyMutable            })
      sample({clock:numberClock , filter:Boolean, target:syncnumberMutable         })
      sample({clock:stringClock , filter:Boolean, target:syncinferredMutable       })
      sample({clock:stringClock , filter:Boolean, target:syncexplicitUnknownMutable})
      sample({clock:stringClock , filter:Boolean, target:syncvoidMutable           })
      sample({clock:stringClock , filter:Boolean, target:syncunknownMutable        })
      sample({clock:stringClock , filter:Boolean, target:syncanyMutable            })
      sample({clock:stringClock , filter:Boolean, target:syncstringMutable         })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('mutable, Boolean, sync (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: syncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: syncnumberMutable,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: syncstringMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: syncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: syncnumberMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: syncstringMutable,
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: syncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: syncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: syncstringMutable,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: syncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: syncnumberMutable,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      lack of expected error at test line 5 'clock: voidClock,'
      lack of expected error at test line 7 'filter: Boolean,'
      lack of expected error at test line 9 'target: syncneverMutable,'
      lack of expected error at test line 13 'clock: voidClock,'
      lack of expected error at test line 15 'filter: Boolean,'
      Type 'Effect<number, void, Error>[]' is not assignable to type 'readonly UnitTargetable<void>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<void>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 21 'clock: voidClock,'
      lack of expected error at test line 23 'filter: Boolean,'
      Type 'Effect<string, void, Error>[]' is not assignable to type 'readonly UnitTargetable<void>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<void>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'void'.
      lack of expected error at test line 29 'clock: unknownClock,'
      lack of expected error at test line 31 'filter: Boolean,'
      lack of expected error at test line 33 'target: syncneverMutable,'
      lack of expected error at test line 37 'clock: unknownClock,'
      lack of expected error at test line 39 'filter: Boolean,'
      lack of expected error at test line 41 'target: syncnumberMutable,'
      lack of expected error at test line 45 'clock: unknownClock,'
      lack of expected error at test line 47 'filter: Boolean,'
      lack of expected error at test line 49 'target: syncstringMutable,'
      lack of expected error at test line 53 'clock: anyClock,'
      lack of expected error at test line 55 'filter: Boolean,'
      lack of expected error at test line 57 'target: syncneverMutable,'
      lack of expected error at test line 61 'clock: numberClock,'
      lack of expected error at test line 63 'filter: Boolean,'
      lack of expected error at test line 65 'target: syncneverMutable,'
      lack of expected error at test line 69 'clock: numberClock,'
      lack of expected error at test line 71 'filter: Boolean,'
      Type 'Effect<string, void, Error>[]' is not assignable to type 'readonly UnitTargetable<number>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<number>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 77 'clock: stringClock,'
      lack of expected error at test line 79 'filter: Boolean,'
      lack of expected error at test line 81 'target: syncneverMutable,'
      lack of expected error at test line 85 'clock: stringClock,'
      lack of expected error at test line 87 'filter: Boolean,'
      Type 'Effect<number, void, Error>[]' is not assignable to type 'readonly UnitTargetable<string>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<string>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('mutable, filter, sync', () => {
  test('mutable, filter, sync (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , filter:() => true, target:syncinferredMutable       })
      sample({clock:voidClock   , filter:() => true, target:syncexplicitUnknownMutable})
      sample({clock:voidClock   , filter:() => true, target:syncvoidMutable           })
      sample({clock:voidClock   , filter:() => true, target:syncunknownMutable        })
      sample({clock:voidClock   , filter:() => true, target:syncanyMutable            })
      sample({clock:unknownClock, filter:() => true, target:syncinferredMutable       })
      sample({clock:unknownClock, filter:() => true, target:syncexplicitUnknownMutable})
      sample({clock:unknownClock, filter:() => true, target:syncvoidMutable           })
      sample({clock:unknownClock, filter:() => true, target:syncunknownMutable        })
      sample({clock:unknownClock, filter:() => true, target:syncanyMutable            })
      sample({clock:anyClock    , filter:() => true, target:syncinferredMutable       })
      sample({clock:anyClock    , filter:() => true, target:syncexplicitUnknownMutable})
      sample({clock:anyClock    , filter:() => true, target:syncvoidMutable           })
      sample({clock:anyClock    , filter:() => true, target:syncunknownMutable        })
      sample({clock:anyClock    , filter:() => true, target:syncanyMutable            })
      sample({clock:anyClock    , filter:() => true, target:syncnumberMutable         })
      sample({clock:anyClock    , filter:() => true, target:syncstringMutable         })
      sample({clock:neverClock  , filter:() => true, target:syncinferredMutable       })
      sample({clock:neverClock  , filter:() => true, target:syncexplicitUnknownMutable})
      sample({clock:neverClock  , filter:() => true, target:syncvoidMutable           })
      sample({clock:neverClock  , filter:() => true, target:syncunknownMutable        })
      sample({clock:neverClock  , filter:() => true, target:syncanyMutable            })
      sample({clock:neverClock  , filter:() => true, target:syncneverMutable          })
      sample({clock:neverClock  , filter:() => true, target:syncnumberMutable         })
      sample({clock:neverClock  , filter:() => true, target:syncstringMutable         })
      sample({clock:numberClock , filter:() => true, target:syncinferredMutable       })
      sample({clock:numberClock , filter:() => true, target:syncexplicitUnknownMutable})
      sample({clock:numberClock , filter:() => true, target:syncvoidMutable           })
      sample({clock:numberClock , filter:() => true, target:syncunknownMutable        })
      sample({clock:numberClock , filter:() => true, target:syncanyMutable            })
      sample({clock:numberClock , filter:() => true, target:syncnumberMutable         })
      sample({clock:stringClock , filter:() => true, target:syncinferredMutable       })
      sample({clock:stringClock , filter:() => true, target:syncexplicitUnknownMutable})
      sample({clock:stringClock , filter:() => true, target:syncvoidMutable           })
      sample({clock:stringClock , filter:() => true, target:syncunknownMutable        })
      sample({clock:stringClock , filter:() => true, target:syncanyMutable            })
      sample({clock:stringClock , filter:() => true, target:syncstringMutable         })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('mutable, filter, sync (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: syncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: syncnumberMutable,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: syncstringMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: syncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: syncnumberMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: syncstringMutable,
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: syncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: syncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: syncstringMutable,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: syncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: syncnumberMutable,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 7 'filter: () => true,'
      lack of expected error at test line 9 'target: syncneverMutable,'
      lack of expected error at test line 13 'clock: voidClock,'
      lack of expected error at test line 15 'filter: () => true,'
      Type 'Effect<number, void, Error>[]' is not assignable to type 'Unit<void>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 21 'clock: voidClock,'
      lack of expected error at test line 23 'filter: () => true,'
      Type 'Effect<string, void, Error>[]' is not assignable to type 'Unit<void>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 31 'filter: () => true,'
      lack of expected error at test line 33 'target: syncneverMutable,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 39 'filter: () => true,'
      lack of expected error at test line 41 'target: syncnumberMutable,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 47 'filter: () => true,'
      lack of expected error at test line 49 'target: syncstringMutable,'
      lack of expected error at test line 53 'clock: anyClock,'
      lack of expected error at test line 55 'filter: () => true,'
      lack of expected error at test line 57 'target: syncneverMutable,'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 63 'filter: () => true,'
      lack of expected error at test line 65 'target: syncneverMutable,'
      lack of expected error at test line 69 'clock: numberClock,'
      lack of expected error at test line 71 'filter: () => true,'
      Type 'Effect<string, void, Error>[]' is not assignable to type 'Unit<number>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 79 'filter: () => true,'
      lack of expected error at test line 81 'target: syncneverMutable,'
      lack of expected error at test line 85 'clock: stringClock,'
      lack of expected error at test line 87 'filter: () => true,'
      Type 'Effect<number, void, Error>[]' is not assignable to type 'Unit<string>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('mutable, fn, sync', () => {
  test('mutable, fn, sync (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , fn:(value: void) => value   , target:syncinferredMutable       })
      sample({clock:voidClock   , fn:(value: void) => value   , target:syncexplicitUnknownMutable})
      sample({clock:voidClock   , fn:(value: void) => value   , target:syncvoidMutable           })
      sample({clock:voidClock   , fn:(value: void) => value   , target:syncunknownMutable        })
      sample({clock:voidClock   , fn:(value: void) => value   , target:syncanyMutable            })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:syncinferredMutable       })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:syncexplicitUnknownMutable})
      sample({clock:unknownClock, fn:(value: unknown) => value, target:syncvoidMutable           })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:syncunknownMutable        })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:syncanyMutable            })
      sample({clock:anyClock    , fn:(value: any) => value    , target:syncinferredMutable       })
      sample({clock:anyClock    , fn:(value: any) => value    , target:syncexplicitUnknownMutable})
      sample({clock:anyClock    , fn:(value: any) => value    , target:syncvoidMutable           })
      sample({clock:anyClock    , fn:(value: any) => value    , target:syncunknownMutable        })
      sample({clock:anyClock    , fn:(value: any) => value    , target:syncanyMutable            })
      sample({clock:anyClock    , fn:(value: any) => value    , target:syncnumberMutable         })
      sample({clock:anyClock    , fn:(value: any) => value    , target:syncstringMutable         })
      sample({clock:neverClock  , fn:(value: never) => value  , target:syncinferredMutable       })
      sample({clock:neverClock  , fn:(value: never) => value  , target:syncexplicitUnknownMutable})
      sample({clock:neverClock  , fn:(value: never) => value  , target:syncvoidMutable           })
      sample({clock:neverClock  , fn:(value: never) => value  , target:syncunknownMutable        })
      sample({clock:neverClock  , fn:(value: never) => value  , target:syncanyMutable            })
      sample({clock:neverClock  , fn:(value: never) => value  , target:syncneverMutable          })
      sample({clock:neverClock  , fn:(value: never) => value  , target:syncnumberMutable         })
      sample({clock:neverClock  , fn:(value: never) => value  , target:syncstringMutable         })
      sample({clock:numberClock , fn:(value: number) => value , target:syncinferredMutable       })
      sample({clock:numberClock , fn:(value: number) => value , target:syncexplicitUnknownMutable})
      sample({clock:numberClock , fn:(value: number) => value , target:syncvoidMutable           })
      sample({clock:numberClock , fn:(value: number) => value , target:syncunknownMutable        })
      sample({clock:numberClock , fn:(value: number) => value , target:syncanyMutable            })
      sample({clock:numberClock , fn:(value: number) => value , target:syncnumberMutable         })
      sample({clock:stringClock , fn:(value: string) => value , target:syncinferredMutable       })
      sample({clock:stringClock , fn:(value: string) => value , target:syncexplicitUnknownMutable})
      sample({clock:stringClock , fn:(value: string) => value , target:syncvoidMutable           })
      sample({clock:stringClock , fn:(value: string) => value , target:syncunknownMutable        })
      sample({clock:stringClock , fn:(value: string) => value , target:syncanyMutable            })
      sample({clock:stringClock , fn:(value: string) => value , target:syncstringMutable         })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('mutable, fn, sync (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        fn: (value: void) => value,
        //@ts-expect-error
        target: syncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        fn: (value: void) => value,
        //@ts-expect-error
        target: syncnumberMutable,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        fn: (value: void) => value,
        //@ts-expect-error
        target: syncstringMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        fn: (value: unknown) => value,
        //@ts-expect-error
        target: syncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        fn: (value: unknown) => value,
        //@ts-expect-error
        target: syncnumberMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        fn: (value: unknown) => value,
        //@ts-expect-error
        target: syncstringMutable,
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        fn: (value: any) => value,
        //@ts-expect-error
        target: syncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        fn: (value: number) => value,
        //@ts-expect-error
        target: syncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        fn: (value: number) => value,
        //@ts-expect-error
        target: syncstringMutable,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        fn: (value: string) => value,
        //@ts-expect-error
        target: syncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        fn: (value: string) => value,
        //@ts-expect-error
        target: syncnumberMutable,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      lack of expected error at test line 5 'clock: voidClock,'
      Type '(value: void) => void' is not assignable to type '(value?: void | undefined) => never'.
        Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 9 'target: syncneverMutable,'
      lack of expected error at test line 13 'clock: voidClock,'
      Type '(value: void) => void' is not assignable to type '(value?: void | undefined) => never'.
        Type 'void' is not assignable to type 'never'.
      Type 'Effect<number, void, Error>[]' is not assignable to type 'Unit<void>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 21 'clock: voidClock,'
      Type '(value: void) => void' is not assignable to type '(value?: void | undefined) => never'.
        Type 'void' is not assignable to type 'never'.
      Type 'Effect<string, void, Error>[]' is not assignable to type 'Unit<void>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'void'.
      lack of expected error at test line 29 'clock: unknownClock,'
      Type '(value: unknown) => unknown' is not assignable to type '(value: unknown) => never'.
        Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 33 'target: syncneverMutable,'
      lack of expected error at test line 37 'clock: unknownClock,'
      Type '(value: unknown) => unknown' is not assignable to type '(value: unknown) => never'.
        Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 41 'target: syncnumberMutable,'
      lack of expected error at test line 45 'clock: unknownClock,'
      Type '(value: unknown) => unknown' is not assignable to type '(value: unknown) => never'.
        Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 49 'target: syncstringMutable,'
      lack of expected error at test line 53 'clock: anyClock,'
      lack of expected error at test line 55 'fn: (value: any) => value,'
      lack of expected error at test line 57 'target: syncneverMutable,'
      lack of expected error at test line 61 'clock: numberClock,'
      Type '(value: number) => number' is not assignable to type '(value: number) => never'.
        Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 65 'target: syncneverMutable,'
      lack of expected error at test line 69 'clock: numberClock,'
      Type '(value: number) => number' is not assignable to type '(value: number) => never'.
        Type 'number' is not assignable to type 'never'.
      Type 'Effect<string, void, Error>[]' is not assignable to type 'Unit<number>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 77 'clock: stringClock,'
      Type '(value: string) => string' is not assignable to type '(value: string) => never'.
        Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 81 'target: syncneverMutable,'
      lack of expected error at test line 85 'clock: stringClock,'
      Type '(value: string) => string' is not assignable to type '(value: string) => never'.
        Type 'string' is not assignable to type 'never'.
      Type 'Effect<number, void, Error>[]' is not assignable to type 'Unit<string>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('readonlyArray, clock, sync', () => {
  test('readonlyArray, clock, sync (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , target:syncinferredReadonly       })
      sample({clock:voidClock   , target:syncexplicitUnknownReadonly})
      sample({clock:voidClock   , target:syncvoidReadonly           })
      sample({clock:voidClock   , target:syncunknownReadonly        })
      sample({clock:voidClock   , target:syncanyReadonly            })
      sample({clock:unknownClock, target:syncinferredReadonly       })
      sample({clock:unknownClock, target:syncexplicitUnknownReadonly})
      sample({clock:unknownClock, target:syncvoidReadonly           })
      sample({clock:unknownClock, target:syncunknownReadonly        })
      sample({clock:unknownClock, target:syncanyReadonly            })
      sample({clock:anyClock    , target:syncinferredReadonly       })
      sample({clock:anyClock    , target:syncexplicitUnknownReadonly})
      sample({clock:anyClock    , target:syncvoidReadonly           })
      sample({clock:anyClock    , target:syncunknownReadonly        })
      sample({clock:anyClock    , target:syncanyReadonly            })
      sample({clock:anyClock    , target:syncnumberReadonly         })
      sample({clock:anyClock    , target:syncstringReadonly         })
      sample({clock:neverClock  , target:syncinferredReadonly       })
      sample({clock:neverClock  , target:syncexplicitUnknownReadonly})
      sample({clock:neverClock  , target:syncvoidReadonly           })
      sample({clock:neverClock  , target:syncunknownReadonly        })
      sample({clock:neverClock  , target:syncanyReadonly            })
      sample({clock:neverClock  , target:syncneverReadonly          })
      sample({clock:neverClock  , target:syncnumberReadonly         })
      sample({clock:neverClock  , target:syncstringReadonly         })
      sample({clock:numberClock , target:syncinferredReadonly       })
      sample({clock:numberClock , target:syncexplicitUnknownReadonly})
      sample({clock:numberClock , target:syncvoidReadonly           })
      sample({clock:numberClock , target:syncunknownReadonly        })
      sample({clock:numberClock , target:syncanyReadonly            })
      sample({clock:numberClock , target:syncnumberReadonly         })
      sample({clock:stringClock , target:syncinferredReadonly       })
      sample({clock:stringClock , target:syncexplicitUnknownReadonly})
      sample({clock:stringClock , target:syncvoidReadonly           })
      sample({clock:stringClock , target:syncunknownReadonly        })
      sample({clock:stringClock , target:syncanyReadonly            })
      sample({clock:stringClock , target:syncstringReadonly         })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('readonlyArray, clock, sync (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: syncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: syncnumberReadonly,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: syncstringReadonly,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: syncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: syncnumberReadonly,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: syncstringReadonly,
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        target: syncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        target: syncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        target: syncstringReadonly,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        target: syncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        target: syncnumberReadonly,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      lack of expected error at test line 5 'clock: voidClock,'
      lack of expected error at test line 7 'target: syncneverReadonly,'
      lack of expected error at test line 11 'clock: voidClock,'
      Type 'readonly Effect<number, void, Error>[]' is not assignable to type 'readonly UnitTargetable<void>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<void>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 17 'clock: voidClock,'
      Type 'readonly Effect<string, void, Error>[]' is not assignable to type 'readonly UnitTargetable<void>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<void>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'void'.
      lack of expected error at test line 23 'clock: unknownClock,'
      lack of expected error at test line 25 'target: syncneverReadonly,'
      lack of expected error at test line 29 'clock: unknownClock,'
      lack of expected error at test line 31 'target: syncnumberReadonly,'
      lack of expected error at test line 35 'clock: unknownClock,'
      lack of expected error at test line 37 'target: syncstringReadonly,'
      lack of expected error at test line 41 'clock: anyClock,'
      lack of expected error at test line 43 'target: syncneverReadonly,'
      lack of expected error at test line 47 'clock: numberClock,'
      lack of expected error at test line 49 'target: syncneverReadonly,'
      lack of expected error at test line 53 'clock: numberClock,'
      Type 'readonly Effect<string, void, Error>[]' is not assignable to type 'readonly UnitTargetable<number>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<number>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 59 'clock: stringClock,'
      lack of expected error at test line 61 'target: syncneverReadonly,'
      lack of expected error at test line 65 'clock: stringClock,'
      Type 'readonly Effect<number, void, Error>[]' is not assignable to type 'readonly UnitTargetable<string>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<string>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('readonlyArray, source, sync', () => {
  test('readonlyArray, source, sync (should pass)', () => {
    //prettier-ignore
    {
      sample({source:voidClock   , target:syncinferredReadonly       })
      sample({source:voidClock   , target:syncexplicitUnknownReadonly})
      sample({source:voidClock   , target:syncvoidReadonly           })
      sample({source:voidClock   , target:syncunknownReadonly        })
      sample({source:voidClock   , target:syncanyReadonly            })
      sample({source:unknownClock, target:syncinferredReadonly       })
      sample({source:unknownClock, target:syncexplicitUnknownReadonly})
      sample({source:unknownClock, target:syncvoidReadonly           })
      sample({source:unknownClock, target:syncunknownReadonly        })
      sample({source:unknownClock, target:syncanyReadonly            })
      sample({source:anyClock    , target:syncinferredReadonly       })
      sample({source:anyClock    , target:syncexplicitUnknownReadonly})
      sample({source:anyClock    , target:syncvoidReadonly           })
      sample({source:anyClock    , target:syncunknownReadonly        })
      sample({source:anyClock    , target:syncanyReadonly            })
      sample({source:anyClock    , target:syncnumberReadonly         })
      sample({source:anyClock    , target:syncstringReadonly         })
      sample({source:neverClock  , target:syncinferredReadonly       })
      sample({source:neverClock  , target:syncexplicitUnknownReadonly})
      sample({source:neverClock  , target:syncvoidReadonly           })
      sample({source:neverClock  , target:syncunknownReadonly        })
      sample({source:neverClock  , target:syncanyReadonly            })
      sample({source:neverClock  , target:syncneverReadonly          })
      sample({source:neverClock  , target:syncnumberReadonly         })
      sample({source:neverClock  , target:syncstringReadonly         })
      sample({source:numberClock , target:syncinferredReadonly       })
      sample({source:numberClock , target:syncexplicitUnknownReadonly})
      sample({source:numberClock , target:syncvoidReadonly           })
      sample({source:numberClock , target:syncunknownReadonly        })
      sample({source:numberClock , target:syncanyReadonly            })
      sample({source:numberClock , target:syncnumberReadonly         })
      sample({source:stringClock , target:syncinferredReadonly       })
      sample({source:stringClock , target:syncexplicitUnknownReadonly})
      sample({source:stringClock , target:syncvoidReadonly           })
      sample({source:stringClock , target:syncunknownReadonly        })
      sample({source:stringClock , target:syncanyReadonly            })
      sample({source:stringClock , target:syncstringReadonly         })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('readonlyArray, source, sync (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: syncneverReadonly,
      })
      sample({
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: syncnumberReadonly,
      })
      sample({
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: syncstringReadonly,
      })
      sample({
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: syncneverReadonly,
      })
      sample({
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: syncnumberReadonly,
      })
      sample({
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: syncstringReadonly,
      })
      sample({
        //@ts-expect-error
        source: anyClock,
        //@ts-expect-error
        target: syncneverReadonly,
      })
      sample({
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: syncneverReadonly,
      })
      sample({
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: syncstringReadonly,
      })
      sample({
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: syncneverReadonly,
      })
      sample({
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: syncnumberReadonly,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 7 'target: syncneverReadonly,'
      lack of expected error at test line 11 'source: voidClock,'
      Type 'readonly Effect<number, void, Error>[]' is not assignable to type 'readonly Unit<void>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 17 'source: voidClock,'
      Type 'readonly Effect<string, void, Error>[]' is not assignable to type 'readonly Unit<void>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 25 'target: syncneverReadonly,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 31 'target: syncnumberReadonly,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 37 'target: syncstringReadonly,'
      lack of expected error at test line 41 'source: anyClock,'
      lack of expected error at test line 43 'target: syncneverReadonly,'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 49 'target: syncneverReadonly,'
      lack of expected error at test line 53 'source: numberClock,'
      Type 'readonly Effect<string, void, Error>[]' is not assignable to type 'readonly Unit<number>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 61 'target: syncneverReadonly,'
      lack of expected error at test line 65 'source: stringClock,'
      Type 'readonly Effect<number, void, Error>[]' is not assignable to type 'readonly Unit<string>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('readonlyArray, both, sync', () => {
  test('readonlyArray, both, sync (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , source:voidClock   , target:syncinferredReadonly       })
      sample({clock:voidClock   , source:voidClock   , target:syncexplicitUnknownReadonly})
      sample({clock:voidClock   , source:voidClock   , target:syncvoidReadonly           })
      sample({clock:voidClock   , source:voidClock   , target:syncunknownReadonly        })
      sample({clock:voidClock   , source:voidClock   , target:syncanyReadonly            })
      sample({clock:unknownClock, source:unknownClock, target:syncinferredReadonly       })
      sample({clock:unknownClock, source:unknownClock, target:syncexplicitUnknownReadonly})
      sample({clock:unknownClock, source:unknownClock, target:syncvoidReadonly           })
      sample({clock:unknownClock, source:unknownClock, target:syncunknownReadonly        })
      sample({clock:unknownClock, source:unknownClock, target:syncanyReadonly            })
      sample({clock:anyClock    , source:anyClock    , target:syncinferredReadonly       })
      sample({clock:anyClock    , source:anyClock    , target:syncexplicitUnknownReadonly})
      sample({clock:anyClock    , source:anyClock    , target:syncvoidReadonly           })
      sample({clock:anyClock    , source:anyClock    , target:syncunknownReadonly        })
      sample({clock:anyClock    , source:anyClock    , target:syncanyReadonly            })
      sample({clock:anyClock    , source:anyClock    , target:syncnumberReadonly         })
      sample({clock:anyClock    , source:anyClock    , target:syncstringReadonly         })
      sample({clock:neverClock  , source:neverClock  , target:syncinferredReadonly       })
      sample({clock:neverClock  , source:neverClock  , target:syncexplicitUnknownReadonly})
      sample({clock:neverClock  , source:neverClock  , target:syncvoidReadonly           })
      sample({clock:neverClock  , source:neverClock  , target:syncunknownReadonly        })
      sample({clock:neverClock  , source:neverClock  , target:syncanyReadonly            })
      sample({clock:neverClock  , source:neverClock  , target:syncneverReadonly          })
      sample({clock:neverClock  , source:neverClock  , target:syncnumberReadonly         })
      sample({clock:neverClock  , source:neverClock  , target:syncstringReadonly         })
      sample({clock:numberClock , source:numberClock , target:syncinferredReadonly       })
      sample({clock:numberClock , source:numberClock , target:syncexplicitUnknownReadonly})
      sample({clock:numberClock , source:numberClock , target:syncvoidReadonly           })
      sample({clock:numberClock , source:numberClock , target:syncunknownReadonly        })
      sample({clock:numberClock , source:numberClock , target:syncanyReadonly            })
      sample({clock:numberClock , source:numberClock , target:syncnumberReadonly         })
      sample({clock:stringClock , source:stringClock , target:syncinferredReadonly       })
      sample({clock:stringClock , source:stringClock , target:syncexplicitUnknownReadonly})
      sample({clock:stringClock , source:stringClock , target:syncvoidReadonly           })
      sample({clock:stringClock , source:stringClock , target:syncunknownReadonly        })
      sample({clock:stringClock , source:stringClock , target:syncanyReadonly            })
      sample({clock:stringClock , source:stringClock , target:syncstringReadonly         })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('readonlyArray, both, sync (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: syncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: syncnumberReadonly,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: syncstringReadonly,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: syncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: syncnumberReadonly,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: syncstringReadonly,
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        source: anyClock,
        //@ts-expect-error
        target: syncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: syncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: syncstringReadonly,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: syncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: syncnumberReadonly,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      lack of expected error at test line 5 'clock: voidClock,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 9 'target: syncneverReadonly,'
      lack of expected error at test line 13 'clock: voidClock,'
      lack of expected error at test line 15 'source: voidClock,'
      Type 'readonly Effect<number, void, Error>[]' is not assignable to type 'readonly Unit<void>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 21 'clock: voidClock,'
      lack of expected error at test line 23 'source: voidClock,'
      Type 'readonly Effect<string, void, Error>[]' is not assignable to type 'readonly Unit<void>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'void'.
      lack of expected error at test line 29 'clock: unknownClock,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 33 'target: syncneverReadonly,'
      lack of expected error at test line 37 'clock: unknownClock,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 41 'target: syncnumberReadonly,'
      lack of expected error at test line 45 'clock: unknownClock,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 49 'target: syncstringReadonly,'
      lack of expected error at test line 53 'clock: anyClock,'
      lack of expected error at test line 55 'source: anyClock,'
      lack of expected error at test line 57 'target: syncneverReadonly,'
      lack of expected error at test line 61 'clock: numberClock,'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 65 'target: syncneverReadonly,'
      lack of expected error at test line 69 'clock: numberClock,'
      lack of expected error at test line 71 'source: numberClock,'
      Type 'readonly Effect<string, void, Error>[]' is not assignable to type 'readonly Unit<number>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 77 'clock: stringClock,'
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 81 'target: syncneverReadonly,'
      lack of expected error at test line 85 'clock: stringClock,'
      lack of expected error at test line 87 'source: stringClock,'
      Type 'readonly Effect<number, void, Error>[]' is not assignable to type 'readonly Unit<string>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('readonlyArray, Boolean, sync', () => {
  test('readonlyArray, Boolean, sync (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , filter:Boolean, target:syncinferredReadonly       })
      sample({clock:voidClock   , filter:Boolean, target:syncexplicitUnknownReadonly})
      sample({clock:voidClock   , filter:Boolean, target:syncvoidReadonly           })
      sample({clock:voidClock   , filter:Boolean, target:syncunknownReadonly        })
      sample({clock:voidClock   , filter:Boolean, target:syncanyReadonly            })
      sample({clock:unknownClock, filter:Boolean, target:syncinferredReadonly       })
      sample({clock:unknownClock, filter:Boolean, target:syncexplicitUnknownReadonly})
      sample({clock:unknownClock, filter:Boolean, target:syncvoidReadonly           })
      sample({clock:unknownClock, filter:Boolean, target:syncunknownReadonly        })
      sample({clock:unknownClock, filter:Boolean, target:syncanyReadonly            })
      sample({clock:anyClock    , filter:Boolean, target:syncinferredReadonly       })
      sample({clock:anyClock    , filter:Boolean, target:syncexplicitUnknownReadonly})
      sample({clock:anyClock    , filter:Boolean, target:syncvoidReadonly           })
      sample({clock:anyClock    , filter:Boolean, target:syncunknownReadonly        })
      sample({clock:anyClock    , filter:Boolean, target:syncanyReadonly            })
      sample({clock:anyClock    , filter:Boolean, target:syncnumberReadonly         })
      sample({clock:anyClock    , filter:Boolean, target:syncstringReadonly         })
      sample({clock:neverClock  , filter:Boolean, target:syncinferredReadonly       })
      sample({clock:neverClock  , filter:Boolean, target:syncexplicitUnknownReadonly})
      sample({clock:neverClock  , filter:Boolean, target:syncvoidReadonly           })
      sample({clock:neverClock  , filter:Boolean, target:syncunknownReadonly        })
      sample({clock:neverClock  , filter:Boolean, target:syncanyReadonly            })
      sample({clock:neverClock  , filter:Boolean, target:syncneverReadonly          })
      sample({clock:neverClock  , filter:Boolean, target:syncnumberReadonly         })
      sample({clock:neverClock  , filter:Boolean, target:syncstringReadonly         })
      sample({clock:numberClock , filter:Boolean, target:syncinferredReadonly       })
      sample({clock:numberClock , filter:Boolean, target:syncexplicitUnknownReadonly})
      sample({clock:numberClock , filter:Boolean, target:syncvoidReadonly           })
      sample({clock:numberClock , filter:Boolean, target:syncunknownReadonly        })
      sample({clock:numberClock , filter:Boolean, target:syncanyReadonly            })
      sample({clock:numberClock , filter:Boolean, target:syncnumberReadonly         })
      sample({clock:stringClock , filter:Boolean, target:syncinferredReadonly       })
      sample({clock:stringClock , filter:Boolean, target:syncexplicitUnknownReadonly})
      sample({clock:stringClock , filter:Boolean, target:syncvoidReadonly           })
      sample({clock:stringClock , filter:Boolean, target:syncunknownReadonly        })
      sample({clock:stringClock , filter:Boolean, target:syncanyReadonly            })
      sample({clock:stringClock , filter:Boolean, target:syncstringReadonly         })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('readonlyArray, Boolean, sync (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: syncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: syncnumberReadonly,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: syncstringReadonly,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: syncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: syncnumberReadonly,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: syncstringReadonly,
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: syncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: syncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: syncstringReadonly,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: syncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: syncnumberReadonly,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      lack of expected error at test line 5 'clock: voidClock,'
      lack of expected error at test line 7 'filter: Boolean,'
      lack of expected error at test line 9 'target: syncneverReadonly,'
      lack of expected error at test line 13 'clock: voidClock,'
      lack of expected error at test line 15 'filter: Boolean,'
      Type 'readonly Effect<number, void, Error>[]' is not assignable to type 'readonly UnitTargetable<void>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<void>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 21 'clock: voidClock,'
      lack of expected error at test line 23 'filter: Boolean,'
      Type 'readonly Effect<string, void, Error>[]' is not assignable to type 'readonly UnitTargetable<void>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<void>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'void'.
      lack of expected error at test line 29 'clock: unknownClock,'
      lack of expected error at test line 31 'filter: Boolean,'
      lack of expected error at test line 33 'target: syncneverReadonly,'
      lack of expected error at test line 37 'clock: unknownClock,'
      lack of expected error at test line 39 'filter: Boolean,'
      lack of expected error at test line 41 'target: syncnumberReadonly,'
      lack of expected error at test line 45 'clock: unknownClock,'
      lack of expected error at test line 47 'filter: Boolean,'
      lack of expected error at test line 49 'target: syncstringReadonly,'
      lack of expected error at test line 53 'clock: anyClock,'
      lack of expected error at test line 55 'filter: Boolean,'
      lack of expected error at test line 57 'target: syncneverReadonly,'
      lack of expected error at test line 61 'clock: numberClock,'
      lack of expected error at test line 63 'filter: Boolean,'
      lack of expected error at test line 65 'target: syncneverReadonly,'
      lack of expected error at test line 69 'clock: numberClock,'
      lack of expected error at test line 71 'filter: Boolean,'
      Type 'readonly Effect<string, void, Error>[]' is not assignable to type 'readonly UnitTargetable<number>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<number>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 77 'clock: stringClock,'
      lack of expected error at test line 79 'filter: Boolean,'
      lack of expected error at test line 81 'target: syncneverReadonly,'
      lack of expected error at test line 85 'clock: stringClock,'
      lack of expected error at test line 87 'filter: Boolean,'
      Type 'readonly Effect<number, void, Error>[]' is not assignable to type 'readonly UnitTargetable<string>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<string>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('readonlyArray, filter, sync', () => {
  test('readonlyArray, filter, sync (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , filter:() => true, target:syncinferredReadonly       })
      sample({clock:voidClock   , filter:() => true, target:syncexplicitUnknownReadonly})
      sample({clock:voidClock   , filter:() => true, target:syncvoidReadonly           })
      sample({clock:voidClock   , filter:() => true, target:syncunknownReadonly        })
      sample({clock:voidClock   , filter:() => true, target:syncanyReadonly            })
      sample({clock:unknownClock, filter:() => true, target:syncinferredReadonly       })
      sample({clock:unknownClock, filter:() => true, target:syncexplicitUnknownReadonly})
      sample({clock:unknownClock, filter:() => true, target:syncvoidReadonly           })
      sample({clock:unknownClock, filter:() => true, target:syncunknownReadonly        })
      sample({clock:unknownClock, filter:() => true, target:syncanyReadonly            })
      sample({clock:anyClock    , filter:() => true, target:syncinferredReadonly       })
      sample({clock:anyClock    , filter:() => true, target:syncexplicitUnknownReadonly})
      sample({clock:anyClock    , filter:() => true, target:syncvoidReadonly           })
      sample({clock:anyClock    , filter:() => true, target:syncunknownReadonly        })
      sample({clock:anyClock    , filter:() => true, target:syncanyReadonly            })
      sample({clock:anyClock    , filter:() => true, target:syncnumberReadonly         })
      sample({clock:anyClock    , filter:() => true, target:syncstringReadonly         })
      sample({clock:neverClock  , filter:() => true, target:syncinferredReadonly       })
      sample({clock:neverClock  , filter:() => true, target:syncexplicitUnknownReadonly})
      sample({clock:neverClock  , filter:() => true, target:syncvoidReadonly           })
      sample({clock:neverClock  , filter:() => true, target:syncunknownReadonly        })
      sample({clock:neverClock  , filter:() => true, target:syncanyReadonly            })
      sample({clock:neverClock  , filter:() => true, target:syncneverReadonly          })
      sample({clock:neverClock  , filter:() => true, target:syncnumberReadonly         })
      sample({clock:neverClock  , filter:() => true, target:syncstringReadonly         })
      sample({clock:numberClock , filter:() => true, target:syncinferredReadonly       })
      sample({clock:numberClock , filter:() => true, target:syncexplicitUnknownReadonly})
      sample({clock:numberClock , filter:() => true, target:syncvoidReadonly           })
      sample({clock:numberClock , filter:() => true, target:syncunknownReadonly        })
      sample({clock:numberClock , filter:() => true, target:syncanyReadonly            })
      sample({clock:numberClock , filter:() => true, target:syncnumberReadonly         })
      sample({clock:stringClock , filter:() => true, target:syncinferredReadonly       })
      sample({clock:stringClock , filter:() => true, target:syncexplicitUnknownReadonly})
      sample({clock:stringClock , filter:() => true, target:syncvoidReadonly           })
      sample({clock:stringClock , filter:() => true, target:syncunknownReadonly        })
      sample({clock:stringClock , filter:() => true, target:syncanyReadonly            })
      sample({clock:stringClock , filter:() => true, target:syncstringReadonly         })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('readonlyArray, filter, sync (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: syncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: syncnumberReadonly,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: syncstringReadonly,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: syncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: syncnumberReadonly,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: syncstringReadonly,
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: syncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: syncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: syncstringReadonly,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: syncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: syncnumberReadonly,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 7 'filter: () => true,'
      lack of expected error at test line 9 'target: syncneverReadonly,'
      lack of expected error at test line 13 'clock: voidClock,'
      lack of expected error at test line 15 'filter: () => true,'
      Type 'readonly Effect<number, void, Error>[]' is not assignable to type 'readonly Unit<void>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 21 'clock: voidClock,'
      lack of expected error at test line 23 'filter: () => true,'
      Type 'readonly Effect<string, void, Error>[]' is not assignable to type 'readonly Unit<void>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 31 'filter: () => true,'
      lack of expected error at test line 33 'target: syncneverReadonly,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 39 'filter: () => true,'
      lack of expected error at test line 41 'target: syncnumberReadonly,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 47 'filter: () => true,'
      lack of expected error at test line 49 'target: syncstringReadonly,'
      lack of expected error at test line 53 'clock: anyClock,'
      lack of expected error at test line 55 'filter: () => true,'
      lack of expected error at test line 57 'target: syncneverReadonly,'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 63 'filter: () => true,'
      lack of expected error at test line 65 'target: syncneverReadonly,'
      lack of expected error at test line 69 'clock: numberClock,'
      lack of expected error at test line 71 'filter: () => true,'
      Type 'readonly Effect<string, void, Error>[]' is not assignable to type 'readonly Unit<number>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 79 'filter: () => true,'
      lack of expected error at test line 81 'target: syncneverReadonly,'
      lack of expected error at test line 85 'clock: stringClock,'
      lack of expected error at test line 87 'filter: () => true,'
      Type 'readonly Effect<number, void, Error>[]' is not assignable to type 'readonly Unit<string>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('readonlyArray, fn, sync', () => {
  test('readonlyArray, fn, sync (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , fn:(value: void) => value   , target:syncinferredReadonly       })
      sample({clock:voidClock   , fn:(value: void) => value   , target:syncexplicitUnknownReadonly})
      sample({clock:voidClock   , fn:(value: void) => value   , target:syncvoidReadonly           })
      sample({clock:voidClock   , fn:(value: void) => value   , target:syncunknownReadonly        })
      sample({clock:voidClock   , fn:(value: void) => value   , target:syncanyReadonly            })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:syncinferredReadonly       })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:syncexplicitUnknownReadonly})
      sample({clock:unknownClock, fn:(value: unknown) => value, target:syncvoidReadonly           })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:syncunknownReadonly        })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:syncanyReadonly            })
      sample({clock:anyClock    , fn:(value: any) => value    , target:syncinferredReadonly       })
      sample({clock:anyClock    , fn:(value: any) => value    , target:syncexplicitUnknownReadonly})
      sample({clock:anyClock    , fn:(value: any) => value    , target:syncvoidReadonly           })
      sample({clock:anyClock    , fn:(value: any) => value    , target:syncunknownReadonly        })
      sample({clock:anyClock    , fn:(value: any) => value    , target:syncanyReadonly            })
      sample({clock:anyClock    , fn:(value: any) => value    , target:syncnumberReadonly         })
      sample({clock:anyClock    , fn:(value: any) => value    , target:syncstringReadonly         })
      sample({clock:neverClock  , fn:(value: never) => value  , target:syncinferredReadonly       })
      sample({clock:neverClock  , fn:(value: never) => value  , target:syncexplicitUnknownReadonly})
      sample({clock:neverClock  , fn:(value: never) => value  , target:syncvoidReadonly           })
      sample({clock:neverClock  , fn:(value: never) => value  , target:syncunknownReadonly        })
      sample({clock:neverClock  , fn:(value: never) => value  , target:syncanyReadonly            })
      sample({clock:neverClock  , fn:(value: never) => value  , target:syncneverReadonly          })
      sample({clock:neverClock  , fn:(value: never) => value  , target:syncnumberReadonly         })
      sample({clock:neverClock  , fn:(value: never) => value  , target:syncstringReadonly         })
      sample({clock:numberClock , fn:(value: number) => value , target:syncinferredReadonly       })
      sample({clock:numberClock , fn:(value: number) => value , target:syncexplicitUnknownReadonly})
      sample({clock:numberClock , fn:(value: number) => value , target:syncvoidReadonly           })
      sample({clock:numberClock , fn:(value: number) => value , target:syncunknownReadonly        })
      sample({clock:numberClock , fn:(value: number) => value , target:syncanyReadonly            })
      sample({clock:numberClock , fn:(value: number) => value , target:syncnumberReadonly         })
      sample({clock:stringClock , fn:(value: string) => value , target:syncinferredReadonly       })
      sample({clock:stringClock , fn:(value: string) => value , target:syncexplicitUnknownReadonly})
      sample({clock:stringClock , fn:(value: string) => value , target:syncvoidReadonly           })
      sample({clock:stringClock , fn:(value: string) => value , target:syncunknownReadonly        })
      sample({clock:stringClock , fn:(value: string) => value , target:syncanyReadonly            })
      sample({clock:stringClock , fn:(value: string) => value , target:syncstringReadonly         })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('readonlyArray, fn, sync (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        fn: (value: void) => value,
        //@ts-expect-error
        target: syncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        fn: (value: void) => value,
        //@ts-expect-error
        target: syncnumberReadonly,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        fn: (value: void) => value,
        //@ts-expect-error
        target: syncstringReadonly,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        fn: (value: unknown) => value,
        //@ts-expect-error
        target: syncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        fn: (value: unknown) => value,
        //@ts-expect-error
        target: syncnumberReadonly,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        fn: (value: unknown) => value,
        //@ts-expect-error
        target: syncstringReadonly,
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        fn: (value: any) => value,
        //@ts-expect-error
        target: syncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        fn: (value: number) => value,
        //@ts-expect-error
        target: syncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        fn: (value: number) => value,
        //@ts-expect-error
        target: syncstringReadonly,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        fn: (value: string) => value,
        //@ts-expect-error
        target: syncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        fn: (value: string) => value,
        //@ts-expect-error
        target: syncnumberReadonly,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      lack of expected error at test line 5 'clock: voidClock,'
      Type '(value: void) => void' is not assignable to type '(value?: void | undefined) => never'.
        Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 9 'target: syncneverReadonly,'
      lack of expected error at test line 13 'clock: voidClock,'
      Type '(value: void) => void' is not assignable to type '(value?: void | undefined) => never'.
        Type 'void' is not assignable to type 'never'.
      Type 'readonly Effect<number, void, Error>[]' is not assignable to type 'readonly Unit<void>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 21 'clock: voidClock,'
      Type '(value: void) => void' is not assignable to type '(value?: void | undefined) => never'.
        Type 'void' is not assignable to type 'never'.
      Type 'readonly Effect<string, void, Error>[]' is not assignable to type 'readonly Unit<void>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'void'.
      lack of expected error at test line 29 'clock: unknownClock,'
      Type '(value: unknown) => unknown' is not assignable to type '(value: unknown) => never'.
        Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 33 'target: syncneverReadonly,'
      lack of expected error at test line 37 'clock: unknownClock,'
      Type '(value: unknown) => unknown' is not assignable to type '(value: unknown) => never'.
        Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 41 'target: syncnumberReadonly,'
      lack of expected error at test line 45 'clock: unknownClock,'
      Type '(value: unknown) => unknown' is not assignable to type '(value: unknown) => never'.
        Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 49 'target: syncstringReadonly,'
      lack of expected error at test line 53 'clock: anyClock,'
      lack of expected error at test line 55 'fn: (value: any) => value,'
      lack of expected error at test line 57 'target: syncneverReadonly,'
      lack of expected error at test line 61 'clock: numberClock,'
      Type '(value: number) => number' is not assignable to type '(value: number) => never'.
        Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 65 'target: syncneverReadonly,'
      lack of expected error at test line 69 'clock: numberClock,'
      Type '(value: number) => number' is not assignable to type '(value: number) => never'.
        Type 'number' is not assignable to type 'never'.
      Type 'readonly Effect<string, void, Error>[]' is not assignable to type 'readonly Unit<number>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 77 'clock: stringClock,'
      Type '(value: string) => string' is not assignable to type '(value: string) => never'.
        Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 81 'target: syncneverReadonly,'
      lack of expected error at test line 85 'clock: stringClock,'
      Type '(value: string) => string' is not assignable to type '(value: string) => never'.
        Type 'string' is not assignable to type 'never'.
      Type 'readonly Effect<number, void, Error>[]' is not assignable to type 'readonly Unit<string>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('single, clock, async', () => {
  test('single, clock, async (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , target:createEffect(async () => {})                  })
      sample({clock:voidClock   , target:createEffect<unknown, unknown>(async () => {})})
      sample({clock:voidClock   , target:createEffect(async (value: void) => {})       })
      sample({clock:voidClock   , target:createEffect(async (value: unknown) => {})    })
      sample({clock:voidClock   , target:createEffect(async (value: any) => {})        })
      sample({clock:unknownClock, target:createEffect(async () => {})                  })
      sample({clock:unknownClock, target:createEffect<unknown, unknown>(async () => {})})
      sample({clock:unknownClock, target:createEffect(async (value: void) => {})       })
      sample({clock:unknownClock, target:createEffect(async (value: unknown) => {})    })
      sample({clock:unknownClock, target:createEffect(async (value: any) => {})        })
      sample({clock:anyClock    , target:createEffect(async () => {})                  })
      sample({clock:anyClock    , target:createEffect<unknown, unknown>(async () => {})})
      sample({clock:anyClock    , target:createEffect(async (value: void) => {})       })
      sample({clock:anyClock    , target:createEffect(async (value: unknown) => {})    })
      sample({clock:anyClock    , target:createEffect(async (value: any) => {})        })
      sample({clock:anyClock    , target:createEffect(async (value: number) => {})     })
      sample({clock:anyClock    , target:createEffect(async (value: string) => {})     })
      sample({clock:neverClock  , target:createEffect(async () => {})                  })
      sample({clock:neverClock  , target:createEffect<unknown, unknown>(async () => {})})
      sample({clock:neverClock  , target:createEffect(async (value: void) => {})       })
      sample({clock:neverClock  , target:createEffect(async (value: unknown) => {})    })
      sample({clock:neverClock  , target:createEffect(async (value: any) => {})        })
      sample({clock:neverClock  , target:createEffect(async (value: never) => {})      })
      sample({clock:neverClock  , target:createEffect(async (value: number) => {})     })
      sample({clock:neverClock  , target:createEffect(async (value: string) => {})     })
      sample({clock:numberClock , target:createEffect(async () => {})                  })
      sample({clock:numberClock , target:createEffect<unknown, unknown>(async () => {})})
      sample({clock:numberClock , target:createEffect(async (value: void) => {})       })
      sample({clock:numberClock , target:createEffect(async (value: unknown) => {})    })
      sample({clock:numberClock , target:createEffect(async (value: any) => {})        })
      sample({clock:numberClock , target:createEffect(async (value: number) => {})     })
      sample({clock:stringClock , target:createEffect(async () => {})                  })
      sample({clock:stringClock , target:createEffect<unknown, unknown>(async () => {})})
      sample({clock:stringClock , target:createEffect(async (value: void) => {})       })
      sample({clock:stringClock , target:createEffect(async (value: unknown) => {})    })
      sample({clock:stringClock , target:createEffect(async (value: any) => {})        })
      sample({clock:stringClock , target:createEffect(async (value: string) => {})     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('single, clock, async (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: createEffect(async (value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: createEffect(async (value: number) => {}),
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: createEffect(async (value: string) => {}),
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: createEffect(async (value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: createEffect(async (value: number) => {}),
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: createEffect(async (value: string) => {}),
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        target: createEffect(async (value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        target: createEffect(async (value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        target: createEffect(async (value: string) => {}),
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        target: createEffect(async (value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        target: createEffect(async (value: number) => {}),
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 7 'target: createEffect(async (value: never) => {}),'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 25 'target: createEffect(async (value: never) => {}),'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 31 'target: createEffect(async (value: number) => {}),'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 37 'target: createEffect(async (value: string) => {}),'
      Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'any' is not assignable to type 'never'.
      lack of expected error at test line 43 'target: createEffect(async (value: never) => {}),'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 49 'target: createEffect(async (value: never) => {}),'
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 61 'target: createEffect(async (value: never) => {}),'
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('single, source, async', () => {
  test('single, source, async (should pass)', () => {
    //prettier-ignore
    {
      sample({source:voidClock   , target:createEffect(async () => {})                  })
      sample({source:voidClock   , target:createEffect<unknown, unknown>(async () => {})})
      sample({source:voidClock   , target:createEffect(async (value: void) => {})       })
      sample({source:voidClock   , target:createEffect(async (value: unknown) => {})    })
      sample({source:voidClock   , target:createEffect(async (value: any) => {})        })
      sample({source:unknownClock, target:createEffect(async () => {})                  })
      sample({source:unknownClock, target:createEffect<unknown, unknown>(async () => {})})
      sample({source:unknownClock, target:createEffect(async (value: void) => {})       })
      sample({source:unknownClock, target:createEffect(async (value: unknown) => {})    })
      sample({source:unknownClock, target:createEffect(async (value: any) => {})        })
      sample({source:anyClock    , target:createEffect(async () => {})                  })
      sample({source:anyClock    , target:createEffect<unknown, unknown>(async () => {})})
      sample({source:anyClock    , target:createEffect(async (value: void) => {})       })
      sample({source:anyClock    , target:createEffect(async (value: unknown) => {})    })
      sample({source:anyClock    , target:createEffect(async (value: any) => {})        })
      sample({source:anyClock    , target:createEffect(async (value: number) => {})     })
      sample({source:anyClock    , target:createEffect(async (value: string) => {})     })
      sample({source:neverClock  , target:createEffect(async () => {})                  })
      sample({source:neverClock  , target:createEffect<unknown, unknown>(async () => {})})
      sample({source:neverClock  , target:createEffect(async (value: void) => {})       })
      sample({source:neverClock  , target:createEffect(async (value: unknown) => {})    })
      sample({source:neverClock  , target:createEffect(async (value: any) => {})        })
      sample({source:neverClock  , target:createEffect(async (value: never) => {})      })
      sample({source:neverClock  , target:createEffect(async (value: number) => {})     })
      sample({source:neverClock  , target:createEffect(async (value: string) => {})     })
      sample({source:numberClock , target:createEffect(async () => {})                  })
      sample({source:numberClock , target:createEffect<unknown, unknown>(async () => {})})
      sample({source:numberClock , target:createEffect(async (value: void) => {})       })
      sample({source:numberClock , target:createEffect(async (value: unknown) => {})    })
      sample({source:numberClock , target:createEffect(async (value: any) => {})        })
      sample({source:numberClock , target:createEffect(async (value: number) => {})     })
      sample({source:stringClock , target:createEffect(async () => {})                  })
      sample({source:stringClock , target:createEffect<unknown, unknown>(async () => {})})
      sample({source:stringClock , target:createEffect(async (value: void) => {})       })
      sample({source:stringClock , target:createEffect(async (value: unknown) => {})    })
      sample({source:stringClock , target:createEffect(async (value: any) => {})        })
      sample({source:stringClock , target:createEffect(async (value: string) => {})     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('single, source, async (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: createEffect(async (value: never) => {}),
      })
      sample({
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: createEffect(async (value: number) => {}),
      })
      sample({
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: createEffect(async (value: string) => {}),
      })
      sample({
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: createEffect(async (value: never) => {}),
      })
      sample({
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: createEffect(async (value: number) => {}),
      })
      sample({
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: createEffect(async (value: string) => {}),
      })
      sample({
        //@ts-expect-error
        source: anyClock,
        //@ts-expect-error
        target: createEffect(async (value: never) => {}),
      })
      sample({
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: createEffect(async (value: never) => {}),
      })
      sample({
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: createEffect(async (value: string) => {}),
      })
      sample({
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: createEffect(async (value: never) => {}),
      })
      sample({
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: createEffect(async (value: number) => {}),
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 7 'target: createEffect(async (value: never) => {}),'
      lack of expected error at test line 11 'source: voidClock,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 17 'source: voidClock,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 25 'target: createEffect(async (value: never) => {}),'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 31 'target: createEffect(async (value: number) => {}),'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 37 'target: createEffect(async (value: string) => {}),'
      lack of expected error at test line 41 'source: anyClock,'
      lack of expected error at test line 43 'target: createEffect(async (value: never) => {}),'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 49 'target: createEffect(async (value: never) => {}),'
      lack of expected error at test line 53 'source: numberClock,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 61 'target: createEffect(async (value: never) => {}),'
      lack of expected error at test line 65 'source: stringClock,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('single, both, async', () => {
  test('single, both, async (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , source:voidClock   , target:createEffect(async () => {})                  })
      sample({clock:voidClock   , source:voidClock   , target:createEffect<unknown, unknown>(async () => {})})
      sample({clock:voidClock   , source:voidClock   , target:createEffect(async (value: void) => {})       })
      sample({clock:voidClock   , source:voidClock   , target:createEffect(async (value: unknown) => {})    })
      sample({clock:voidClock   , source:voidClock   , target:createEffect(async (value: any) => {})        })
      sample({clock:unknownClock, source:unknownClock, target:createEffect(async () => {})                  })
      sample({clock:unknownClock, source:unknownClock, target:createEffect<unknown, unknown>(async () => {})})
      sample({clock:unknownClock, source:unknownClock, target:createEffect(async (value: void) => {})       })
      sample({clock:unknownClock, source:unknownClock, target:createEffect(async (value: unknown) => {})    })
      sample({clock:unknownClock, source:unknownClock, target:createEffect(async (value: any) => {})        })
      sample({clock:anyClock    , source:anyClock    , target:createEffect(async () => {})                  })
      sample({clock:anyClock    , source:anyClock    , target:createEffect<unknown, unknown>(async () => {})})
      sample({clock:anyClock    , source:anyClock    , target:createEffect(async (value: void) => {})       })
      sample({clock:anyClock    , source:anyClock    , target:createEffect(async (value: unknown) => {})    })
      sample({clock:anyClock    , source:anyClock    , target:createEffect(async (value: any) => {})        })
      sample({clock:anyClock    , source:anyClock    , target:createEffect(async (value: number) => {})     })
      sample({clock:anyClock    , source:anyClock    , target:createEffect(async (value: string) => {})     })
      sample({clock:neverClock  , source:neverClock  , target:createEffect(async () => {})                  })
      sample({clock:neverClock  , source:neverClock  , target:createEffect<unknown, unknown>(async () => {})})
      sample({clock:neverClock  , source:neverClock  , target:createEffect(async (value: void) => {})       })
      sample({clock:neverClock  , source:neverClock  , target:createEffect(async (value: unknown) => {})    })
      sample({clock:neverClock  , source:neverClock  , target:createEffect(async (value: any) => {})        })
      sample({clock:neverClock  , source:neverClock  , target:createEffect(async (value: never) => {})      })
      sample({clock:neverClock  , source:neverClock  , target:createEffect(async (value: number) => {})     })
      sample({clock:neverClock  , source:neverClock  , target:createEffect(async (value: string) => {})     })
      sample({clock:numberClock , source:numberClock , target:createEffect(async () => {})                  })
      sample({clock:numberClock , source:numberClock , target:createEffect<unknown, unknown>(async () => {})})
      sample({clock:numberClock , source:numberClock , target:createEffect(async (value: void) => {})       })
      sample({clock:numberClock , source:numberClock , target:createEffect(async (value: unknown) => {})    })
      sample({clock:numberClock , source:numberClock , target:createEffect(async (value: any) => {})        })
      sample({clock:numberClock , source:numberClock , target:createEffect(async (value: number) => {})     })
      sample({clock:stringClock , source:stringClock , target:createEffect(async () => {})                  })
      sample({clock:stringClock , source:stringClock , target:createEffect<unknown, unknown>(async () => {})})
      sample({clock:stringClock , source:stringClock , target:createEffect(async (value: void) => {})       })
      sample({clock:stringClock , source:stringClock , target:createEffect(async (value: unknown) => {})    })
      sample({clock:stringClock , source:stringClock , target:createEffect(async (value: any) => {})        })
      sample({clock:stringClock , source:stringClock , target:createEffect(async (value: string) => {})     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('single, both, async (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: createEffect(async (value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: createEffect(async (value: number) => {}),
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: createEffect(async (value: string) => {}),
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: createEffect(async (value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: createEffect(async (value: number) => {}),
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: createEffect(async (value: string) => {}),
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        source: anyClock,
        //@ts-expect-error
        target: createEffect(async (value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: createEffect(async (value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: createEffect(async (value: string) => {}),
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: createEffect(async (value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: createEffect(async (value: number) => {}),
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      lack of expected error at test line 5 'clock: voidClock,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 9 'target: createEffect(async (value: never) => {}),'
      lack of expected error at test line 13 'clock: voidClock,'
      lack of expected error at test line 15 'source: voidClock,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 21 'clock: voidClock,'
      lack of expected error at test line 23 'source: voidClock,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      lack of expected error at test line 29 'clock: unknownClock,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 33 'target: createEffect(async (value: never) => {}),'
      lack of expected error at test line 37 'clock: unknownClock,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 41 'target: createEffect(async (value: number) => {}),'
      lack of expected error at test line 45 'clock: unknownClock,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 49 'target: createEffect(async (value: string) => {}),'
      lack of expected error at test line 53 'clock: anyClock,'
      lack of expected error at test line 55 'source: anyClock,'
      lack of expected error at test line 57 'target: createEffect(async (value: never) => {}),'
      lack of expected error at test line 61 'clock: numberClock,'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 65 'target: createEffect(async (value: never) => {}),'
      lack of expected error at test line 69 'clock: numberClock,'
      lack of expected error at test line 71 'source: numberClock,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 77 'clock: stringClock,'
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 81 'target: createEffect(async (value: never) => {}),'
      lack of expected error at test line 85 'clock: stringClock,'
      lack of expected error at test line 87 'source: stringClock,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('single, Boolean, async', () => {
  test('single, Boolean, async (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , filter:Boolean, target:createEffect(async () => {})                  })
      sample({clock:voidClock   , filter:Boolean, target:createEffect<unknown, unknown>(async () => {})})
      sample({clock:voidClock   , filter:Boolean, target:createEffect(async (value: void) => {})       })
      sample({clock:voidClock   , filter:Boolean, target:createEffect(async (value: unknown) => {})    })
      sample({clock:voidClock   , filter:Boolean, target:createEffect(async (value: any) => {})        })
      sample({clock:unknownClock, filter:Boolean, target:createEffect(async () => {})                  })
      sample({clock:unknownClock, filter:Boolean, target:createEffect<unknown, unknown>(async () => {})})
      sample({clock:unknownClock, filter:Boolean, target:createEffect(async (value: void) => {})       })
      sample({clock:unknownClock, filter:Boolean, target:createEffect(async (value: unknown) => {})    })
      sample({clock:unknownClock, filter:Boolean, target:createEffect(async (value: any) => {})        })
      sample({clock:anyClock    , filter:Boolean, target:createEffect(async () => {})                  })
      sample({clock:anyClock    , filter:Boolean, target:createEffect<unknown, unknown>(async () => {})})
      sample({clock:anyClock    , filter:Boolean, target:createEffect(async (value: void) => {})       })
      sample({clock:anyClock    , filter:Boolean, target:createEffect(async (value: unknown) => {})    })
      sample({clock:anyClock    , filter:Boolean, target:createEffect(async (value: any) => {})        })
      sample({clock:anyClock    , filter:Boolean, target:createEffect(async (value: number) => {})     })
      sample({clock:anyClock    , filter:Boolean, target:createEffect(async (value: string) => {})     })
      sample({clock:neverClock  , filter:Boolean, target:createEffect(async () => {})                  })
      sample({clock:neverClock  , filter:Boolean, target:createEffect<unknown, unknown>(async () => {})})
      sample({clock:neverClock  , filter:Boolean, target:createEffect(async (value: void) => {})       })
      sample({clock:neverClock  , filter:Boolean, target:createEffect(async (value: unknown) => {})    })
      sample({clock:neverClock  , filter:Boolean, target:createEffect(async (value: any) => {})        })
      sample({clock:neverClock  , filter:Boolean, target:createEffect(async (value: never) => {})      })
      sample({clock:neverClock  , filter:Boolean, target:createEffect(async (value: number) => {})     })
      sample({clock:neverClock  , filter:Boolean, target:createEffect(async (value: string) => {})     })
      sample({clock:numberClock , filter:Boolean, target:createEffect(async () => {})                  })
      sample({clock:numberClock , filter:Boolean, target:createEffect<unknown, unknown>(async () => {})})
      sample({clock:numberClock , filter:Boolean, target:createEffect(async (value: void) => {})       })
      sample({clock:numberClock , filter:Boolean, target:createEffect(async (value: unknown) => {})    })
      sample({clock:numberClock , filter:Boolean, target:createEffect(async (value: any) => {})        })
      sample({clock:numberClock , filter:Boolean, target:createEffect(async (value: number) => {})     })
      sample({clock:stringClock , filter:Boolean, target:createEffect(async () => {})                  })
      sample({clock:stringClock , filter:Boolean, target:createEffect<unknown, unknown>(async () => {})})
      sample({clock:stringClock , filter:Boolean, target:createEffect(async (value: void) => {})       })
      sample({clock:stringClock , filter:Boolean, target:createEffect(async (value: unknown) => {})    })
      sample({clock:stringClock , filter:Boolean, target:createEffect(async (value: any) => {})        })
      sample({clock:stringClock , filter:Boolean, target:createEffect(async (value: string) => {})     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('single, Boolean, async (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: createEffect(async (value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: createEffect(async (value: number) => {}),
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: createEffect(async (value: string) => {}),
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: createEffect(async (value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: createEffect(async (value: number) => {}),
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: createEffect(async (value: string) => {}),
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: createEffect(async (value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: createEffect(async (value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: createEffect(async (value: string) => {}),
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: createEffect(async (value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: createEffect(async (value: number) => {}),
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 7 'filter: Boolean,'
      lack of expected error at test line 9 'target: createEffect(async (value: never) => {}),'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      lack of expected error at test line 15 'filter: Boolean,'
      Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      lack of expected error at test line 23 'filter: Boolean,'
      Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 31 'filter: Boolean,'
      lack of expected error at test line 33 'target: createEffect(async (value: never) => {}),'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 39 'filter: Boolean,'
      lack of expected error at test line 41 'target: createEffect(async (value: number) => {}),'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 47 'filter: Boolean,'
      lack of expected error at test line 49 'target: createEffect(async (value: string) => {}),'
      Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'any' is not assignable to type 'never'.
      lack of expected error at test line 55 'filter: Boolean,'
      lack of expected error at test line 57 'target: createEffect(async (value: never) => {}),'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 63 'filter: Boolean,'
      lack of expected error at test line 65 'target: createEffect(async (value: never) => {}),'
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      lack of expected error at test line 71 'filter: Boolean,'
      Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 79 'filter: Boolean,'
      lack of expected error at test line 81 'target: createEffect(async (value: never) => {}),'
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 87 'filter: Boolean,'
      Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('single, filter, async', () => {
  test('single, filter, async (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , filter:() => true, target:createEffect(async () => {})                  })
      sample({clock:voidClock   , filter:() => true, target:createEffect<unknown, unknown>(async () => {})})
      sample({clock:voidClock   , filter:() => true, target:createEffect(async (value: void) => {})       })
      sample({clock:voidClock   , filter:() => true, target:createEffect(async (value: unknown) => {})    })
      sample({clock:voidClock   , filter:() => true, target:createEffect(async (value: any) => {})        })
      sample({clock:unknownClock, filter:() => true, target:createEffect(async () => {})                  })
      sample({clock:unknownClock, filter:() => true, target:createEffect<unknown, unknown>(async () => {})})
      sample({clock:unknownClock, filter:() => true, target:createEffect(async (value: void) => {})       })
      sample({clock:unknownClock, filter:() => true, target:createEffect(async (value: unknown) => {})    })
      sample({clock:unknownClock, filter:() => true, target:createEffect(async (value: any) => {})        })
      sample({clock:anyClock    , filter:() => true, target:createEffect(async () => {})                  })
      sample({clock:anyClock    , filter:() => true, target:createEffect<unknown, unknown>(async () => {})})
      sample({clock:anyClock    , filter:() => true, target:createEffect(async (value: void) => {})       })
      sample({clock:anyClock    , filter:() => true, target:createEffect(async (value: unknown) => {})    })
      sample({clock:anyClock    , filter:() => true, target:createEffect(async (value: any) => {})        })
      sample({clock:anyClock    , filter:() => true, target:createEffect(async (value: number) => {})     })
      sample({clock:anyClock    , filter:() => true, target:createEffect(async (value: string) => {})     })
      sample({clock:neverClock  , filter:() => true, target:createEffect(async () => {})                  })
      sample({clock:neverClock  , filter:() => true, target:createEffect<unknown, unknown>(async () => {})})
      sample({clock:neverClock  , filter:() => true, target:createEffect(async (value: void) => {})       })
      sample({clock:neverClock  , filter:() => true, target:createEffect(async (value: unknown) => {})    })
      sample({clock:neverClock  , filter:() => true, target:createEffect(async (value: any) => {})        })
      sample({clock:neverClock  , filter:() => true, target:createEffect(async (value: never) => {})      })
      sample({clock:neverClock  , filter:() => true, target:createEffect(async (value: number) => {})     })
      sample({clock:neverClock  , filter:() => true, target:createEffect(async (value: string) => {})     })
      sample({clock:numberClock , filter:() => true, target:createEffect(async () => {})                  })
      sample({clock:numberClock , filter:() => true, target:createEffect<unknown, unknown>(async () => {})})
      sample({clock:numberClock , filter:() => true, target:createEffect(async (value: void) => {})       })
      sample({clock:numberClock , filter:() => true, target:createEffect(async (value: unknown) => {})    })
      sample({clock:numberClock , filter:() => true, target:createEffect(async (value: any) => {})        })
      sample({clock:numberClock , filter:() => true, target:createEffect(async (value: number) => {})     })
      sample({clock:stringClock , filter:() => true, target:createEffect(async () => {})                  })
      sample({clock:stringClock , filter:() => true, target:createEffect<unknown, unknown>(async () => {})})
      sample({clock:stringClock , filter:() => true, target:createEffect(async (value: void) => {})       })
      sample({clock:stringClock , filter:() => true, target:createEffect(async (value: unknown) => {})    })
      sample({clock:stringClock , filter:() => true, target:createEffect(async (value: any) => {})        })
      sample({clock:stringClock , filter:() => true, target:createEffect(async (value: string) => {})     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('single, filter, async (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: createEffect(async (value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: createEffect(async (value: number) => {}),
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: createEffect(async (value: string) => {}),
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: createEffect(async (value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: createEffect(async (value: number) => {}),
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: createEffect(async (value: string) => {}),
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: createEffect(async (value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: createEffect(async (value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: createEffect(async (value: string) => {}),
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: createEffect(async (value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: createEffect(async (value: number) => {}),
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 7 'filter: () => true,'
      lack of expected error at test line 9 'target: createEffect(async (value: never) => {}),'
      lack of expected error at test line 13 'clock: voidClock,'
      lack of expected error at test line 15 'filter: () => true,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 21 'clock: voidClock,'
      lack of expected error at test line 23 'filter: () => true,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 31 'filter: () => true,'
      lack of expected error at test line 33 'target: createEffect(async (value: never) => {}),'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 39 'filter: () => true,'
      lack of expected error at test line 41 'target: createEffect(async (value: number) => {}),'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 47 'filter: () => true,'
      lack of expected error at test line 49 'target: createEffect(async (value: string) => {}),'
      lack of expected error at test line 53 'clock: anyClock,'
      lack of expected error at test line 55 'filter: () => true,'
      lack of expected error at test line 57 'target: createEffect(async (value: never) => {}),'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 63 'filter: () => true,'
      lack of expected error at test line 65 'target: createEffect(async (value: never) => {}),'
      lack of expected error at test line 69 'clock: numberClock,'
      lack of expected error at test line 71 'filter: () => true,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 79 'filter: () => true,'
      lack of expected error at test line 81 'target: createEffect(async (value: never) => {}),'
      lack of expected error at test line 85 'clock: stringClock,'
      lack of expected error at test line 87 'filter: () => true,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('single, fn, async', () => {
  test('single, fn, async (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , fn:(value: void) => value   , target:createEffect(async () => {})                  })
      sample({clock:voidClock   , fn:(value: void) => value   , target:createEffect<unknown, unknown>(async () => {})})
      sample({clock:voidClock   , fn:(value: void) => value   , target:createEffect(async (value: void) => {})       })
      sample({clock:voidClock   , fn:(value: void) => value   , target:createEffect(async (value: unknown) => {})    })
      sample({clock:voidClock   , fn:(value: void) => value   , target:createEffect(async (value: any) => {})        })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:createEffect(async () => {})                  })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:createEffect<unknown, unknown>(async () => {})})
      sample({clock:unknownClock, fn:(value: unknown) => value, target:createEffect(async (value: void) => {})       })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:createEffect(async (value: unknown) => {})    })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:createEffect(async (value: any) => {})        })
      sample({clock:anyClock    , fn:(value: any) => value    , target:createEffect(async () => {})                  })
      sample({clock:anyClock    , fn:(value: any) => value    , target:createEffect<unknown, unknown>(async () => {})})
      sample({clock:anyClock    , fn:(value: any) => value    , target:createEffect(async (value: void) => {})       })
      sample({clock:anyClock    , fn:(value: any) => value    , target:createEffect(async (value: unknown) => {})    })
      sample({clock:anyClock    , fn:(value: any) => value    , target:createEffect(async (value: any) => {})        })
      sample({clock:anyClock    , fn:(value: any) => value    , target:createEffect(async (value: number) => {})     })
      sample({clock:anyClock    , fn:(value: any) => value    , target:createEffect(async (value: string) => {})     })
      sample({clock:neverClock  , fn:(value: never) => value  , target:createEffect(async () => {})                  })
      sample({clock:neverClock  , fn:(value: never) => value  , target:createEffect<unknown, unknown>(async () => {})})
      sample({clock:neverClock  , fn:(value: never) => value  , target:createEffect(async (value: void) => {})       })
      sample({clock:neverClock  , fn:(value: never) => value  , target:createEffect(async (value: unknown) => {})    })
      sample({clock:neverClock  , fn:(value: never) => value  , target:createEffect(async (value: any) => {})        })
      sample({clock:neverClock  , fn:(value: never) => value  , target:createEffect(async (value: never) => {})      })
      sample({clock:neverClock  , fn:(value: never) => value  , target:createEffect(async (value: number) => {})     })
      sample({clock:neverClock  , fn:(value: never) => value  , target:createEffect(async (value: string) => {})     })
      sample({clock:numberClock , fn:(value: number) => value , target:createEffect(async () => {})                  })
      sample({clock:numberClock , fn:(value: number) => value , target:createEffect<unknown, unknown>(async () => {})})
      sample({clock:numberClock , fn:(value: number) => value , target:createEffect(async (value: void) => {})       })
      sample({clock:numberClock , fn:(value: number) => value , target:createEffect(async (value: unknown) => {})    })
      sample({clock:numberClock , fn:(value: number) => value , target:createEffect(async (value: any) => {})        })
      sample({clock:numberClock , fn:(value: number) => value , target:createEffect(async (value: number) => {})     })
      sample({clock:stringClock , fn:(value: string) => value , target:createEffect(async () => {})                  })
      sample({clock:stringClock , fn:(value: string) => value , target:createEffect<unknown, unknown>(async () => {})})
      sample({clock:stringClock , fn:(value: string) => value , target:createEffect(async (value: void) => {})       })
      sample({clock:stringClock , fn:(value: string) => value , target:createEffect(async (value: unknown) => {})    })
      sample({clock:stringClock , fn:(value: string) => value , target:createEffect(async (value: any) => {})        })
      sample({clock:stringClock , fn:(value: string) => value , target:createEffect(async (value: string) => {})     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('single, fn, async (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        fn: (value: void) => value,
        //@ts-expect-error
        target: createEffect(async (value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        fn: (value: void) => value,
        //@ts-expect-error
        target: createEffect(async (value: number) => {}),
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        fn: (value: void) => value,
        //@ts-expect-error
        target: createEffect(async (value: string) => {}),
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        fn: (value: unknown) => value,
        //@ts-expect-error
        target: createEffect(async (value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        fn: (value: unknown) => value,
        //@ts-expect-error
        target: createEffect(async (value: number) => {}),
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        fn: (value: unknown) => value,
        //@ts-expect-error
        target: createEffect(async (value: string) => {}),
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        fn: (value: any) => value,
        //@ts-expect-error
        target: createEffect(async (value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        fn: (value: number) => value,
        //@ts-expect-error
        target: createEffect(async (value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        fn: (value: number) => value,
        //@ts-expect-error
        target: createEffect(async (value: string) => {}),
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        fn: (value: string) => value,
        //@ts-expect-error
        target: createEffect(async (value: never) => {}),
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        fn: (value: string) => value,
        //@ts-expect-error
        target: createEffect(async (value: number) => {}),
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value?: void | undefined) => void; target: Unit<void>; error: \\"fn result should extend target type\\"; }'.
      lack of expected error at test line 7 'fn: (value: void) => value,'
      lack of expected error at test line 9 'target: createEffect(async (value: never) => {}),'
      lack of expected error at test line 13 'clock: voidClock,'
      Type '(value: void) => void' is not assignable to type '(value?: void | undefined) => number'.
        Type 'void' is not assignable to type 'number'.
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 21 'clock: voidClock,'
      Type '(value: void) => void' is not assignable to type '(value?: void | undefined) => string'.
        Type 'void' is not assignable to type 'string'.
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value: unknown) => unknown; target: Unit<unknown>; error: \\"fn result should extend target type\\"; }'.
      lack of expected error at test line 31 'fn: (value: unknown) => value,'
      lack of expected error at test line 33 'target: createEffect(async (value: never) => {}),'
      lack of expected error at test line 37 'clock: unknownClock,'
      Type '(value: unknown) => unknown' is not assignable to type '(value: unknown) => number'.
        Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 41 'target: createEffect(async (value: number) => {}),'
      lack of expected error at test line 45 'clock: unknownClock,'
      Type '(value: unknown) => unknown' is not assignable to type '(value: unknown) => string'.
        Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 49 'target: createEffect(async (value: string) => {}),'
      lack of expected error at test line 53 'clock: anyClock,'
      lack of expected error at test line 55 'fn: (value: any) => value,'
      lack of expected error at test line 57 'target: createEffect(async (value: never) => {}),'
      Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value: number) => number; target: Unit<number>; error: \\"fn result should extend target type\\"; }'.
      lack of expected error at test line 63 'fn: (value: number) => value,'
      lack of expected error at test line 65 'target: createEffect(async (value: never) => {}),'
      lack of expected error at test line 69 'clock: numberClock,'
      Type '(value: number) => number' is not assignable to type '(value: number) => string'.
        Type 'number' is not assignable to type 'string'.
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value: string) => string; target: Unit<string>; error: \\"fn result should extend target type\\"; }'.
      lack of expected error at test line 79 'fn: (value: string) => value,'
      lack of expected error at test line 81 'target: createEffect(async (value: never) => {}),'
      lack of expected error at test line 85 'clock: stringClock,'
      Type '(value: string) => string' is not assignable to type '(value: string) => number'.
        Type 'string' is not assignable to type 'number'.
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('inline, clock, async', () => {
  test('inline, clock, async (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , target:[createEffect(async () => {})]                  })
      sample({clock:voidClock   , target:[createEffect<unknown, unknown>(async () => {})]})
      sample({clock:voidClock   , target:[createEffect(async (value: void) => {})]       })
      sample({clock:voidClock   , target:[createEffect(async (value: unknown) => {})]    })
      sample({clock:voidClock   , target:[createEffect(async (value: any) => {})]        })
      sample({clock:unknownClock, target:[createEffect(async () => {})]                  })
      sample({clock:unknownClock, target:[createEffect<unknown, unknown>(async () => {})]})
      sample({clock:unknownClock, target:[createEffect(async (value: void) => {})]       })
      sample({clock:unknownClock, target:[createEffect(async (value: unknown) => {})]    })
      sample({clock:unknownClock, target:[createEffect(async (value: any) => {})]        })
      sample({clock:anyClock    , target:[createEffect(async () => {})]                  })
      sample({clock:anyClock    , target:[createEffect<unknown, unknown>(async () => {})]})
      sample({clock:anyClock    , target:[createEffect(async (value: void) => {})]       })
      sample({clock:anyClock    , target:[createEffect(async (value: unknown) => {})]    })
      sample({clock:anyClock    , target:[createEffect(async (value: any) => {})]        })
      sample({clock:anyClock    , target:[createEffect(async (value: number) => {})]     })
      sample({clock:anyClock    , target:[createEffect(async (value: string) => {})]     })
      sample({clock:neverClock  , target:[createEffect(async () => {})]                  })
      sample({clock:neverClock  , target:[createEffect<unknown, unknown>(async () => {})]})
      sample({clock:neverClock  , target:[createEffect(async (value: void) => {})]       })
      sample({clock:neverClock  , target:[createEffect(async (value: unknown) => {})]    })
      sample({clock:neverClock  , target:[createEffect(async (value: any) => {})]        })
      sample({clock:neverClock  , target:[createEffect(async (value: never) => {})]      })
      sample({clock:neverClock  , target:[createEffect(async (value: number) => {})]     })
      sample({clock:neverClock  , target:[createEffect(async (value: string) => {})]     })
      sample({clock:numberClock , target:[createEffect(async () => {})]                  })
      sample({clock:numberClock , target:[createEffect<unknown, unknown>(async () => {})]})
      sample({clock:numberClock , target:[createEffect(async (value: void) => {})]       })
      sample({clock:numberClock , target:[createEffect(async (value: unknown) => {})]    })
      sample({clock:numberClock , target:[createEffect(async (value: any) => {})]        })
      sample({clock:numberClock , target:[createEffect(async (value: number) => {})]     })
      sample({clock:stringClock , target:[createEffect(async () => {})]                  })
      sample({clock:stringClock , target:[createEffect<unknown, unknown>(async () => {})]})
      sample({clock:stringClock , target:[createEffect(async (value: void) => {})]       })
      sample({clock:stringClock , target:[createEffect(async (value: unknown) => {})]    })
      sample({clock:stringClock , target:[createEffect(async (value: any) => {})]        })
      sample({clock:stringClock , target:[createEffect(async (value: string) => {})]     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('inline, clock, async (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {})],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {})],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {})],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {})],
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {})],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {})],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 7 'target: [createEffect(async (value: never) => {})],'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 25 'target: [createEffect(async (value: never) => {})],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 31 'target: [createEffect(async (value: number) => {})],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 37 'target: [createEffect(async (value: string) => {})],'
      Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'any' is not assignable to type 'never'.
      lack of expected error at test line 43 'target: [createEffect(async (value: never) => {})],'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 49 'target: [createEffect(async (value: never) => {})],'
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 61 'target: [createEffect(async (value: never) => {})],'
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('inline, source, async', () => {
  test('inline, source, async (should pass)', () => {
    //prettier-ignore
    {
      sample({source:voidClock   , target:[createEffect(async () => {})]                  })
      sample({source:voidClock   , target:[createEffect<unknown, unknown>(async () => {})]})
      sample({source:voidClock   , target:[createEffect(async (value: void) => {})]       })
      sample({source:voidClock   , target:[createEffect(async (value: unknown) => {})]    })
      sample({source:voidClock   , target:[createEffect(async (value: any) => {})]        })
      sample({source:unknownClock, target:[createEffect(async () => {})]                  })
      sample({source:unknownClock, target:[createEffect<unknown, unknown>(async () => {})]})
      sample({source:unknownClock, target:[createEffect(async (value: void) => {})]       })
      sample({source:unknownClock, target:[createEffect(async (value: unknown) => {})]    })
      sample({source:unknownClock, target:[createEffect(async (value: any) => {})]        })
      sample({source:anyClock    , target:[createEffect(async () => {})]                  })
      sample({source:anyClock    , target:[createEffect<unknown, unknown>(async () => {})]})
      sample({source:anyClock    , target:[createEffect(async (value: void) => {})]       })
      sample({source:anyClock    , target:[createEffect(async (value: unknown) => {})]    })
      sample({source:anyClock    , target:[createEffect(async (value: any) => {})]        })
      sample({source:anyClock    , target:[createEffect(async (value: number) => {})]     })
      sample({source:anyClock    , target:[createEffect(async (value: string) => {})]     })
      sample({source:neverClock  , target:[createEffect(async () => {})]                  })
      sample({source:neverClock  , target:[createEffect<unknown, unknown>(async () => {})]})
      sample({source:neverClock  , target:[createEffect(async (value: void) => {})]       })
      sample({source:neverClock  , target:[createEffect(async (value: unknown) => {})]    })
      sample({source:neverClock  , target:[createEffect(async (value: any) => {})]        })
      sample({source:neverClock  , target:[createEffect(async (value: never) => {})]      })
      sample({source:neverClock  , target:[createEffect(async (value: number) => {})]     })
      sample({source:neverClock  , target:[createEffect(async (value: string) => {})]     })
      sample({source:numberClock , target:[createEffect(async () => {})]                  })
      sample({source:numberClock , target:[createEffect<unknown, unknown>(async () => {})]})
      sample({source:numberClock , target:[createEffect(async (value: void) => {})]       })
      sample({source:numberClock , target:[createEffect(async (value: unknown) => {})]    })
      sample({source:numberClock , target:[createEffect(async (value: any) => {})]        })
      sample({source:numberClock , target:[createEffect(async (value: number) => {})]     })
      sample({source:stringClock , target:[createEffect(async () => {})]                  })
      sample({source:stringClock , target:[createEffect<unknown, unknown>(async () => {})]})
      sample({source:stringClock , target:[createEffect(async (value: void) => {})]       })
      sample({source:stringClock , target:[createEffect(async (value: unknown) => {})]    })
      sample({source:stringClock , target:[createEffect(async (value: any) => {})]        })
      sample({source:stringClock , target:[createEffect(async (value: string) => {})]     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('inline, source, async (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})],
      })
      sample({
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {})],
      })
      sample({
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {})],
      })
      sample({
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})],
      })
      sample({
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {})],
      })
      sample({
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {})],
      })
      sample({
        //@ts-expect-error
        source: anyClock,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})],
      })
      sample({
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})],
      })
      sample({
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {})],
      })
      sample({
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})],
      })
      sample({
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {})],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 7 'target: [createEffect(async (value: never) => {})],'
      lack of expected error at test line 11 'source: voidClock,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 17 'source: voidClock,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 25 'target: [createEffect(async (value: never) => {})],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 31 'target: [createEffect(async (value: number) => {})],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 37 'target: [createEffect(async (value: string) => {})],'
      lack of expected error at test line 41 'source: anyClock,'
      lack of expected error at test line 43 'target: [createEffect(async (value: never) => {})],'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 49 'target: [createEffect(async (value: never) => {})],'
      lack of expected error at test line 53 'source: numberClock,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 61 'target: [createEffect(async (value: never) => {})],'
      lack of expected error at test line 65 'source: stringClock,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('inline, both, async', () => {
  test('inline, both, async (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , source:voidClock   , target:[createEffect(async () => {})]                  })
      sample({clock:voidClock   , source:voidClock   , target:[createEffect<unknown, unknown>(async () => {})]})
      sample({clock:voidClock   , source:voidClock   , target:[createEffect(async (value: void) => {})]       })
      sample({clock:voidClock   , source:voidClock   , target:[createEffect(async (value: unknown) => {})]    })
      sample({clock:voidClock   , source:voidClock   , target:[createEffect(async (value: any) => {})]        })
      sample({clock:unknownClock, source:unknownClock, target:[createEffect(async () => {})]                  })
      sample({clock:unknownClock, source:unknownClock, target:[createEffect<unknown, unknown>(async () => {})]})
      sample({clock:unknownClock, source:unknownClock, target:[createEffect(async (value: void) => {})]       })
      sample({clock:unknownClock, source:unknownClock, target:[createEffect(async (value: unknown) => {})]    })
      sample({clock:unknownClock, source:unknownClock, target:[createEffect(async (value: any) => {})]        })
      sample({clock:anyClock    , source:anyClock    , target:[createEffect(async () => {})]                  })
      sample({clock:anyClock    , source:anyClock    , target:[createEffect<unknown, unknown>(async () => {})]})
      sample({clock:anyClock    , source:anyClock    , target:[createEffect(async (value: void) => {})]       })
      sample({clock:anyClock    , source:anyClock    , target:[createEffect(async (value: unknown) => {})]    })
      sample({clock:anyClock    , source:anyClock    , target:[createEffect(async (value: any) => {})]        })
      sample({clock:anyClock    , source:anyClock    , target:[createEffect(async (value: number) => {})]     })
      sample({clock:anyClock    , source:anyClock    , target:[createEffect(async (value: string) => {})]     })
      sample({clock:neverClock  , source:neverClock  , target:[createEffect(async () => {})]                  })
      sample({clock:neverClock  , source:neverClock  , target:[createEffect<unknown, unknown>(async () => {})]})
      sample({clock:neverClock  , source:neverClock  , target:[createEffect(async (value: void) => {})]       })
      sample({clock:neverClock  , source:neverClock  , target:[createEffect(async (value: unknown) => {})]    })
      sample({clock:neverClock  , source:neverClock  , target:[createEffect(async (value: any) => {})]        })
      sample({clock:neverClock  , source:neverClock  , target:[createEffect(async (value: never) => {})]      })
      sample({clock:neverClock  , source:neverClock  , target:[createEffect(async (value: number) => {})]     })
      sample({clock:neverClock  , source:neverClock  , target:[createEffect(async (value: string) => {})]     })
      sample({clock:numberClock , source:numberClock , target:[createEffect(async () => {})]                  })
      sample({clock:numberClock , source:numberClock , target:[createEffect<unknown, unknown>(async () => {})]})
      sample({clock:numberClock , source:numberClock , target:[createEffect(async (value: void) => {})]       })
      sample({clock:numberClock , source:numberClock , target:[createEffect(async (value: unknown) => {})]    })
      sample({clock:numberClock , source:numberClock , target:[createEffect(async (value: any) => {})]        })
      sample({clock:numberClock , source:numberClock , target:[createEffect(async (value: number) => {})]     })
      sample({clock:stringClock , source:stringClock , target:[createEffect(async () => {})]                  })
      sample({clock:stringClock , source:stringClock , target:[createEffect<unknown, unknown>(async () => {})]})
      sample({clock:stringClock , source:stringClock , target:[createEffect(async (value: void) => {})]       })
      sample({clock:stringClock , source:stringClock , target:[createEffect(async (value: unknown) => {})]    })
      sample({clock:stringClock , source:stringClock , target:[createEffect(async (value: any) => {})]        })
      sample({clock:stringClock , source:stringClock , target:[createEffect(async (value: string) => {})]     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('inline, both, async (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {})],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {})],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {})],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {})],
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        source: anyClock,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {})],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {})],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      lack of expected error at test line 5 'clock: voidClock,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 9 'target: [createEffect(async (value: never) => {})],'
      lack of expected error at test line 13 'clock: voidClock,'
      lack of expected error at test line 15 'source: voidClock,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 21 'clock: voidClock,'
      lack of expected error at test line 23 'source: voidClock,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      lack of expected error at test line 29 'clock: unknownClock,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 33 'target: [createEffect(async (value: never) => {})],'
      lack of expected error at test line 37 'clock: unknownClock,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 41 'target: [createEffect(async (value: number) => {})],'
      lack of expected error at test line 45 'clock: unknownClock,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 49 'target: [createEffect(async (value: string) => {})],'
      lack of expected error at test line 53 'clock: anyClock,'
      lack of expected error at test line 55 'source: anyClock,'
      lack of expected error at test line 57 'target: [createEffect(async (value: never) => {})],'
      lack of expected error at test line 61 'clock: numberClock,'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 65 'target: [createEffect(async (value: never) => {})],'
      lack of expected error at test line 69 'clock: numberClock,'
      lack of expected error at test line 71 'source: numberClock,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 77 'clock: stringClock,'
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 81 'target: [createEffect(async (value: never) => {})],'
      lack of expected error at test line 85 'clock: stringClock,'
      lack of expected error at test line 87 'source: stringClock,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('inline, Boolean, async', () => {
  test('inline, Boolean, async (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , filter:Boolean, target:[createEffect(async () => {})]                  })
      sample({clock:voidClock   , filter:Boolean, target:[createEffect<unknown, unknown>(async () => {})]})
      sample({clock:voidClock   , filter:Boolean, target:[createEffect(async (value: void) => {})]       })
      sample({clock:voidClock   , filter:Boolean, target:[createEffect(async (value: unknown) => {})]    })
      sample({clock:voidClock   , filter:Boolean, target:[createEffect(async (value: any) => {})]        })
      sample({clock:unknownClock, filter:Boolean, target:[createEffect(async () => {})]                  })
      sample({clock:unknownClock, filter:Boolean, target:[createEffect<unknown, unknown>(async () => {})]})
      sample({clock:unknownClock, filter:Boolean, target:[createEffect(async (value: void) => {})]       })
      sample({clock:unknownClock, filter:Boolean, target:[createEffect(async (value: unknown) => {})]    })
      sample({clock:unknownClock, filter:Boolean, target:[createEffect(async (value: any) => {})]        })
      sample({clock:anyClock    , filter:Boolean, target:[createEffect(async () => {})]                  })
      sample({clock:anyClock    , filter:Boolean, target:[createEffect<unknown, unknown>(async () => {})]})
      sample({clock:anyClock    , filter:Boolean, target:[createEffect(async (value: void) => {})]       })
      sample({clock:anyClock    , filter:Boolean, target:[createEffect(async (value: unknown) => {})]    })
      sample({clock:anyClock    , filter:Boolean, target:[createEffect(async (value: any) => {})]        })
      sample({clock:anyClock    , filter:Boolean, target:[createEffect(async (value: number) => {})]     })
      sample({clock:anyClock    , filter:Boolean, target:[createEffect(async (value: string) => {})]     })
      sample({clock:neverClock  , filter:Boolean, target:[createEffect(async () => {})]                  })
      sample({clock:neverClock  , filter:Boolean, target:[createEffect<unknown, unknown>(async () => {})]})
      sample({clock:neverClock  , filter:Boolean, target:[createEffect(async (value: void) => {})]       })
      sample({clock:neverClock  , filter:Boolean, target:[createEffect(async (value: unknown) => {})]    })
      sample({clock:neverClock  , filter:Boolean, target:[createEffect(async (value: any) => {})]        })
      sample({clock:neverClock  , filter:Boolean, target:[createEffect(async (value: never) => {})]      })
      sample({clock:neverClock  , filter:Boolean, target:[createEffect(async (value: number) => {})]     })
      sample({clock:neverClock  , filter:Boolean, target:[createEffect(async (value: string) => {})]     })
      sample({clock:numberClock , filter:Boolean, target:[createEffect(async () => {})]                  })
      sample({clock:numberClock , filter:Boolean, target:[createEffect<unknown, unknown>(async () => {})]})
      sample({clock:numberClock , filter:Boolean, target:[createEffect(async (value: void) => {})]       })
      sample({clock:numberClock , filter:Boolean, target:[createEffect(async (value: unknown) => {})]    })
      sample({clock:numberClock , filter:Boolean, target:[createEffect(async (value: any) => {})]        })
      sample({clock:numberClock , filter:Boolean, target:[createEffect(async (value: number) => {})]     })
      sample({clock:stringClock , filter:Boolean, target:[createEffect(async () => {})]                  })
      sample({clock:stringClock , filter:Boolean, target:[createEffect<unknown, unknown>(async () => {})]})
      sample({clock:stringClock , filter:Boolean, target:[createEffect(async (value: void) => {})]       })
      sample({clock:stringClock , filter:Boolean, target:[createEffect(async (value: unknown) => {})]    })
      sample({clock:stringClock , filter:Boolean, target:[createEffect(async (value: any) => {})]        })
      sample({clock:stringClock , filter:Boolean, target:[createEffect(async (value: string) => {})]     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('inline, Boolean, async (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {})],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {})],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {})],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {})],
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {})],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {})],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 7 'filter: Boolean,'
      lack of expected error at test line 9 'target: [createEffect(async (value: never) => {})],'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      lack of expected error at test line 15 'filter: Boolean,'
      Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      lack of expected error at test line 23 'filter: Boolean,'
      Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 31 'filter: Boolean,'
      lack of expected error at test line 33 'target: [createEffect(async (value: never) => {})],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 39 'filter: Boolean,'
      lack of expected error at test line 41 'target: [createEffect(async (value: number) => {})],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 47 'filter: Boolean,'
      lack of expected error at test line 49 'target: [createEffect(async (value: string) => {})],'
      Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'any' is not assignable to type 'never'.
      lack of expected error at test line 55 'filter: Boolean,'
      lack of expected error at test line 57 'target: [createEffect(async (value: never) => {})],'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 63 'filter: Boolean,'
      lack of expected error at test line 65 'target: [createEffect(async (value: never) => {})],'
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      lack of expected error at test line 71 'filter: Boolean,'
      Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 79 'filter: Boolean,'
      lack of expected error at test line 81 'target: [createEffect(async (value: never) => {})],'
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 87 'filter: Boolean,'
      Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('inline, filter, async', () => {
  test('inline, filter, async (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , filter:() => true, target:[createEffect(async () => {})]                  })
      sample({clock:voidClock   , filter:() => true, target:[createEffect<unknown, unknown>(async () => {})]})
      sample({clock:voidClock   , filter:() => true, target:[createEffect(async (value: void) => {})]       })
      sample({clock:voidClock   , filter:() => true, target:[createEffect(async (value: unknown) => {})]    })
      sample({clock:voidClock   , filter:() => true, target:[createEffect(async (value: any) => {})]        })
      sample({clock:unknownClock, filter:() => true, target:[createEffect(async () => {})]                  })
      sample({clock:unknownClock, filter:() => true, target:[createEffect<unknown, unknown>(async () => {})]})
      sample({clock:unknownClock, filter:() => true, target:[createEffect(async (value: void) => {})]       })
      sample({clock:unknownClock, filter:() => true, target:[createEffect(async (value: unknown) => {})]    })
      sample({clock:unknownClock, filter:() => true, target:[createEffect(async (value: any) => {})]        })
      sample({clock:anyClock    , filter:() => true, target:[createEffect(async () => {})]                  })
      sample({clock:anyClock    , filter:() => true, target:[createEffect<unknown, unknown>(async () => {})]})
      sample({clock:anyClock    , filter:() => true, target:[createEffect(async (value: void) => {})]       })
      sample({clock:anyClock    , filter:() => true, target:[createEffect(async (value: unknown) => {})]    })
      sample({clock:anyClock    , filter:() => true, target:[createEffect(async (value: any) => {})]        })
      sample({clock:anyClock    , filter:() => true, target:[createEffect(async (value: number) => {})]     })
      sample({clock:anyClock    , filter:() => true, target:[createEffect(async (value: string) => {})]     })
      sample({clock:neverClock  , filter:() => true, target:[createEffect(async () => {})]                  })
      sample({clock:neverClock  , filter:() => true, target:[createEffect<unknown, unknown>(async () => {})]})
      sample({clock:neverClock  , filter:() => true, target:[createEffect(async (value: void) => {})]       })
      sample({clock:neverClock  , filter:() => true, target:[createEffect(async (value: unknown) => {})]    })
      sample({clock:neverClock  , filter:() => true, target:[createEffect(async (value: any) => {})]        })
      sample({clock:neverClock  , filter:() => true, target:[createEffect(async (value: never) => {})]      })
      sample({clock:neverClock  , filter:() => true, target:[createEffect(async (value: number) => {})]     })
      sample({clock:neverClock  , filter:() => true, target:[createEffect(async (value: string) => {})]     })
      sample({clock:numberClock , filter:() => true, target:[createEffect(async () => {})]                  })
      sample({clock:numberClock , filter:() => true, target:[createEffect<unknown, unknown>(async () => {})]})
      sample({clock:numberClock , filter:() => true, target:[createEffect(async (value: void) => {})]       })
      sample({clock:numberClock , filter:() => true, target:[createEffect(async (value: unknown) => {})]    })
      sample({clock:numberClock , filter:() => true, target:[createEffect(async (value: any) => {})]        })
      sample({clock:numberClock , filter:() => true, target:[createEffect(async (value: number) => {})]     })
      sample({clock:stringClock , filter:() => true, target:[createEffect(async () => {})]                  })
      sample({clock:stringClock , filter:() => true, target:[createEffect<unknown, unknown>(async () => {})]})
      sample({clock:stringClock , filter:() => true, target:[createEffect(async (value: void) => {})]       })
      sample({clock:stringClock , filter:() => true, target:[createEffect(async (value: unknown) => {})]    })
      sample({clock:stringClock , filter:() => true, target:[createEffect(async (value: any) => {})]        })
      sample({clock:stringClock , filter:() => true, target:[createEffect(async (value: string) => {})]     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('inline, filter, async (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {})],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {})],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {})],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {})],
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {})],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {})],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 7 'filter: () => true,'
      lack of expected error at test line 9 'target: [createEffect(async (value: never) => {})],'
      lack of expected error at test line 13 'clock: voidClock,'
      lack of expected error at test line 15 'filter: () => true,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 21 'clock: voidClock,'
      lack of expected error at test line 23 'filter: () => true,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 31 'filter: () => true,'
      lack of expected error at test line 33 'target: [createEffect(async (value: never) => {})],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 39 'filter: () => true,'
      lack of expected error at test line 41 'target: [createEffect(async (value: number) => {})],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 47 'filter: () => true,'
      lack of expected error at test line 49 'target: [createEffect(async (value: string) => {})],'
      lack of expected error at test line 53 'clock: anyClock,'
      lack of expected error at test line 55 'filter: () => true,'
      lack of expected error at test line 57 'target: [createEffect(async (value: never) => {})],'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 63 'filter: () => true,'
      lack of expected error at test line 65 'target: [createEffect(async (value: never) => {})],'
      lack of expected error at test line 69 'clock: numberClock,'
      lack of expected error at test line 71 'filter: () => true,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 79 'filter: () => true,'
      lack of expected error at test line 81 'target: [createEffect(async (value: never) => {})],'
      lack of expected error at test line 85 'clock: stringClock,'
      lack of expected error at test line 87 'filter: () => true,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('inline, fn, async', () => {
  test('inline, fn, async (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , fn:(value: void) => value   , target:[createEffect(async () => {})]                  })
      sample({clock:voidClock   , fn:(value: void) => value   , target:[createEffect<unknown, unknown>(async () => {})]})
      sample({clock:voidClock   , fn:(value: void) => value   , target:[createEffect(async (value: void) => {})]       })
      sample({clock:voidClock   , fn:(value: void) => value   , target:[createEffect(async (value: unknown) => {})]    })
      sample({clock:voidClock   , fn:(value: void) => value   , target:[createEffect(async (value: any) => {})]        })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:[createEffect(async () => {})]                  })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:[createEffect<unknown, unknown>(async () => {})]})
      sample({clock:unknownClock, fn:(value: unknown) => value, target:[createEffect(async (value: void) => {})]       })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:[createEffect(async (value: unknown) => {})]    })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:[createEffect(async (value: any) => {})]        })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[createEffect(async () => {})]                  })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[createEffect<unknown, unknown>(async () => {})]})
      sample({clock:anyClock    , fn:(value: any) => value    , target:[createEffect(async (value: void) => {})]       })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[createEffect(async (value: unknown) => {})]    })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[createEffect(async (value: any) => {})]        })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[createEffect(async (value: number) => {})]     })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[createEffect(async (value: string) => {})]     })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect(async () => {})]                  })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect<unknown, unknown>(async () => {})]})
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect(async (value: void) => {})]       })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect(async (value: unknown) => {})]    })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect(async (value: any) => {})]        })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect(async (value: never) => {})]      })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect(async (value: number) => {})]     })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect(async (value: string) => {})]     })
      sample({clock:numberClock , fn:(value: number) => value , target:[createEffect(async () => {})]                  })
      sample({clock:numberClock , fn:(value: number) => value , target:[createEffect<unknown, unknown>(async () => {})]})
      sample({clock:numberClock , fn:(value: number) => value , target:[createEffect(async (value: void) => {})]       })
      sample({clock:numberClock , fn:(value: number) => value , target:[createEffect(async (value: unknown) => {})]    })
      sample({clock:numberClock , fn:(value: number) => value , target:[createEffect(async (value: any) => {})]        })
      sample({clock:numberClock , fn:(value: number) => value , target:[createEffect(async (value: number) => {})]     })
      sample({clock:stringClock , fn:(value: string) => value , target:[createEffect(async () => {})]                  })
      sample({clock:stringClock , fn:(value: string) => value , target:[createEffect<unknown, unknown>(async () => {})]})
      sample({clock:stringClock , fn:(value: string) => value , target:[createEffect(async (value: void) => {})]       })
      sample({clock:stringClock , fn:(value: string) => value , target:[createEffect(async (value: unknown) => {})]    })
      sample({clock:stringClock , fn:(value: string) => value , target:[createEffect(async (value: any) => {})]        })
      sample({clock:stringClock , fn:(value: string) => value , target:[createEffect(async (value: string) => {})]     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('inline, fn, async (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        fn: (value: void) => value,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        fn: (value: void) => value,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {})],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        fn: (value: void) => value,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {})],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        fn: (value: unknown) => value,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        fn: (value: unknown) => value,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {})],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        fn: (value: unknown) => value,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {})],
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        fn: (value: any) => value,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        fn: (value: number) => value,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        fn: (value: number) => value,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {})],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        fn: (value: string) => value,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        fn: (value: string) => value,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {})],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value?: void | undefined) => void; target: readonly [Unit<void>]; error: \\"fn result should extend target type\\"; }'.
      lack of expected error at test line 7 'fn: (value: void) => value,'
      lack of expected error at test line 9 'target: [createEffect(async (value: never) => {})],'
      lack of expected error at test line 13 'clock: voidClock,'
      Type '(value: void) => void' is not assignable to type '(value?: void | undefined) => number'.
        Type 'void' is not assignable to type 'number'.
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 21 'clock: voidClock,'
      Type '(value: void) => void' is not assignable to type '(value?: void | undefined) => string'.
        Type 'void' is not assignable to type 'string'.
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value: unknown) => unknown; target: readonly [Unit<unknown>]; error: \\"fn result should extend target type\\"; }'.
      lack of expected error at test line 31 'fn: (value: unknown) => value,'
      lack of expected error at test line 33 'target: [createEffect(async (value: never) => {})],'
      lack of expected error at test line 37 'clock: unknownClock,'
      Type '(value: unknown) => unknown' is not assignable to type '(value: unknown) => number'.
        Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 41 'target: [createEffect(async (value: number) => {})],'
      lack of expected error at test line 45 'clock: unknownClock,'
      Type '(value: unknown) => unknown' is not assignable to type '(value: unknown) => string'.
        Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 49 'target: [createEffect(async (value: string) => {})],'
      lack of expected error at test line 53 'clock: anyClock,'
      lack of expected error at test line 55 'fn: (value: any) => value,'
      lack of expected error at test line 57 'target: [createEffect(async (value: never) => {})],'
      Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value: number) => number; target: readonly [Unit<number>]; error: \\"fn result should extend target type\\"; }'.
      lack of expected error at test line 63 'fn: (value: number) => value,'
      lack of expected error at test line 65 'target: [createEffect(async (value: never) => {})],'
      lack of expected error at test line 69 'clock: numberClock,'
      Type '(value: number) => number' is not assignable to type '(value: number) => string'.
        Type 'number' is not assignable to type 'string'.
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value: string) => string; target: readonly [Unit<string>]; error: \\"fn result should extend target type\\"; }'.
      lack of expected error at test line 79 'fn: (value: string) => value,'
      lack of expected error at test line 81 'target: [createEffect(async (value: never) => {})],'
      lack of expected error at test line 85 'clock: stringClock,'
      Type '(value: string) => string' is not assignable to type '(value: string) => number'.
        Type 'string' is not assignable to type 'number'.
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('multiple, clock, async', () => {
  test('multiple, clock, async (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , target:[createEffect(async () => {}), createEvent<void>()]                  })
      sample({clock:voidClock   , target:[createEffect<unknown, unknown>(async () => {}), createEvent<void>()]})
      sample({clock:voidClock   , target:[createEffect(async (value: void) => {}), createEvent<void>()]       })
      sample({clock:voidClock   , target:[createEffect(async (value: unknown) => {}), createEvent<void>()]    })
      sample({clock:voidClock   , target:[createEffect(async (value: any) => {}), createEvent<void>()]        })
      sample({clock:unknownClock, target:[createEffect(async () => {}), createEvent<void>()]                  })
      sample({clock:unknownClock, target:[createEffect<unknown, unknown>(async () => {}), createEvent<void>()]})
      sample({clock:unknownClock, target:[createEffect(async (value: void) => {}), createEvent<void>()]       })
      sample({clock:unknownClock, target:[createEffect(async (value: unknown) => {}), createEvent<void>()]    })
      sample({clock:unknownClock, target:[createEffect(async (value: any) => {}), createEvent<void>()]        })
      sample({clock:anyClock    , target:[createEffect(async () => {}), createEvent<void>()]                  })
      sample({clock:anyClock    , target:[createEffect<unknown, unknown>(async () => {}), createEvent<void>()]})
      sample({clock:anyClock    , target:[createEffect(async (value: void) => {}), createEvent<void>()]       })
      sample({clock:anyClock    , target:[createEffect(async (value: unknown) => {}), createEvent<void>()]    })
      sample({clock:anyClock    , target:[createEffect(async (value: any) => {}), createEvent<void>()]        })
      sample({clock:anyClock    , target:[createEffect(async (value: number) => {}), createEvent<void>()]     })
      sample({clock:anyClock    , target:[createEffect(async (value: string) => {}), createEvent<void>()]     })
      sample({clock:neverClock  , target:[createEffect(async () => {}), createEvent<void>()]                  })
      sample({clock:neverClock  , target:[createEffect<unknown, unknown>(async () => {}), createEvent<void>()]})
      sample({clock:neverClock  , target:[createEffect(async (value: void) => {}), createEvent<void>()]       })
      sample({clock:neverClock  , target:[createEffect(async (value: unknown) => {}), createEvent<void>()]    })
      sample({clock:neverClock  , target:[createEffect(async (value: any) => {}), createEvent<void>()]        })
      sample({clock:neverClock  , target:[createEffect(async (value: never) => {}), createEvent<void>()]      })
      sample({clock:neverClock  , target:[createEffect(async (value: number) => {}), createEvent<void>()]     })
      sample({clock:neverClock  , target:[createEffect(async (value: string) => {}), createEvent<void>()]     })
      sample({clock:numberClock , target:[createEffect(async () => {}), createEvent<void>()]                  })
      sample({clock:numberClock , target:[createEffect<unknown, unknown>(async () => {}), createEvent<void>()]})
      sample({clock:numberClock , target:[createEffect(async (value: void) => {}), createEvent<void>()]       })
      sample({clock:numberClock , target:[createEffect(async (value: unknown) => {}), createEvent<void>()]    })
      sample({clock:numberClock , target:[createEffect(async (value: any) => {}), createEvent<void>()]        })
      sample({clock:numberClock , target:[createEffect(async (value: number) => {}), createEvent<void>()]     })
      sample({clock:stringClock , target:[createEffect(async () => {}), createEvent<void>()]                  })
      sample({clock:stringClock , target:[createEffect<unknown, unknown>(async () => {}), createEvent<void>()]})
      sample({clock:stringClock , target:[createEffect(async (value: void) => {}), createEvent<void>()]       })
      sample({clock:stringClock , target:[createEffect(async (value: unknown) => {}), createEvent<void>()]    })
      sample({clock:stringClock , target:[createEffect(async (value: any) => {}), createEvent<void>()]        })
      sample({clock:stringClock , target:[createEffect(async (value: string) => {}), createEvent<void>()]     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('multiple, clock, async (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {}), createEvent<void>()],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 7 'target: [createEffect(async (value: never) => {}), createEvent<void>()],'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 25 'target: [createEffect(async (value: never) => {}), createEvent<void>()],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 31 'target: [createEffect(async (value: number) => {}), createEvent<void>()],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 37 'target: [createEffect(async (value: string) => {}), createEvent<void>()],'
      Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'any' is not assignable to type 'never'.
      lack of expected error at test line 43 'target: [createEffect(async (value: never) => {}), createEvent<void>()],'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 49 'target: [createEffect(async (value: never) => {}), createEvent<void>()],'
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 61 'target: [createEffect(async (value: never) => {}), createEvent<void>()],'
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('multiple, source, async', () => {
  test('multiple, source, async (should pass)', () => {
    //prettier-ignore
    {
      sample({source:voidClock   , target:[createEffect(async () => {}), createEvent<void>()]                  })
      sample({source:voidClock   , target:[createEffect<unknown, unknown>(async () => {}), createEvent<void>()]})
      sample({source:voidClock   , target:[createEffect(async (value: void) => {}), createEvent<void>()]       })
      sample({source:voidClock   , target:[createEffect(async (value: unknown) => {}), createEvent<void>()]    })
      sample({source:voidClock   , target:[createEffect(async (value: any) => {}), createEvent<void>()]        })
      sample({source:unknownClock, target:[createEffect(async () => {}), createEvent<void>()]                  })
      sample({source:unknownClock, target:[createEffect<unknown, unknown>(async () => {}), createEvent<void>()]})
      sample({source:unknownClock, target:[createEffect(async (value: void) => {}), createEvent<void>()]       })
      sample({source:unknownClock, target:[createEffect(async (value: unknown) => {}), createEvent<void>()]    })
      sample({source:unknownClock, target:[createEffect(async (value: any) => {}), createEvent<void>()]        })
      sample({source:anyClock    , target:[createEffect(async () => {}), createEvent<void>()]                  })
      sample({source:anyClock    , target:[createEffect<unknown, unknown>(async () => {}), createEvent<void>()]})
      sample({source:anyClock    , target:[createEffect(async (value: void) => {}), createEvent<void>()]       })
      sample({source:anyClock    , target:[createEffect(async (value: unknown) => {}), createEvent<void>()]    })
      sample({source:anyClock    , target:[createEffect(async (value: any) => {}), createEvent<void>()]        })
      sample({source:anyClock    , target:[createEffect(async (value: number) => {}), createEvent<void>()]     })
      sample({source:anyClock    , target:[createEffect(async (value: string) => {}), createEvent<void>()]     })
      sample({source:neverClock  , target:[createEffect(async () => {}), createEvent<void>()]                  })
      sample({source:neverClock  , target:[createEffect<unknown, unknown>(async () => {}), createEvent<void>()]})
      sample({source:neverClock  , target:[createEffect(async (value: void) => {}), createEvent<void>()]       })
      sample({source:neverClock  , target:[createEffect(async (value: unknown) => {}), createEvent<void>()]    })
      sample({source:neverClock  , target:[createEffect(async (value: any) => {}), createEvent<void>()]        })
      sample({source:neverClock  , target:[createEffect(async (value: never) => {}), createEvent<void>()]      })
      sample({source:neverClock  , target:[createEffect(async (value: number) => {}), createEvent<void>()]     })
      sample({source:neverClock  , target:[createEffect(async (value: string) => {}), createEvent<void>()]     })
      sample({source:numberClock , target:[createEffect(async () => {}), createEvent<void>()]                  })
      sample({source:numberClock , target:[createEffect<unknown, unknown>(async () => {}), createEvent<void>()]})
      sample({source:numberClock , target:[createEffect(async (value: void) => {}), createEvent<void>()]       })
      sample({source:numberClock , target:[createEffect(async (value: unknown) => {}), createEvent<void>()]    })
      sample({source:numberClock , target:[createEffect(async (value: any) => {}), createEvent<void>()]        })
      sample({source:numberClock , target:[createEffect(async (value: number) => {}), createEvent<void>()]     })
      sample({source:stringClock , target:[createEffect(async () => {}), createEvent<void>()]                  })
      sample({source:stringClock , target:[createEffect<unknown, unknown>(async () => {}), createEvent<void>()]})
      sample({source:stringClock , target:[createEffect(async (value: void) => {}), createEvent<void>()]       })
      sample({source:stringClock , target:[createEffect(async (value: unknown) => {}), createEvent<void>()]    })
      sample({source:stringClock , target:[createEffect(async (value: any) => {}), createEvent<void>()]        })
      sample({source:stringClock , target:[createEffect(async (value: string) => {}), createEvent<void>()]     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('multiple, source, async (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        source: anyClock,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {}), createEvent<void>()],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      lack of expected error at test line 5 'source: voidClock,'
      Object literal may only specify known properties, and 'target' does not exist in type '{ source: Unit<void>; error: \\"source should extend target type\\"; }'.
      lack of expected error at test line 11 'source: voidClock,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 17 'source: voidClock,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'void'.
      lack of expected error at test line 25 'target: [createEffect(async (value: never) => {}), createEvent<void>()],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<void | number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'void | number'.
      lack of expected error at test line 31 'target: [createEffect(async (value: number) => {}), createEvent<void>()],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<void | string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'void | string'.
      lack of expected error at test line 37 'target: [createEffect(async (value: string) => {}), createEvent<void>()],'
      lack of expected error at test line 41 'source: anyClock,'
      lack of expected error at test line 43 'target: [createEffect(async (value: never) => {}), createEvent<void>()],'
      lack of expected error at test line 47 'source: numberClock,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      lack of expected error at test line 53 'source: numberClock,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      lack of expected error at test line 59 'source: stringClock,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      lack of expected error at test line 65 'source: stringClock,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      "
    `)
  })
})
describe('multiple, both, async', () => {
  test('multiple, both, async (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , source:voidClock   , target:[createEffect(async () => {}), createEvent<void>()]                  })
      sample({clock:voidClock   , source:voidClock   , target:[createEffect<unknown, unknown>(async () => {}), createEvent<void>()]})
      sample({clock:voidClock   , source:voidClock   , target:[createEffect(async (value: void) => {}), createEvent<void>()]       })
      sample({clock:voidClock   , source:voidClock   , target:[createEffect(async (value: unknown) => {}), createEvent<void>()]    })
      sample({clock:voidClock   , source:voidClock   , target:[createEffect(async (value: any) => {}), createEvent<void>()]        })
      sample({clock:unknownClock, source:unknownClock, target:[createEffect(async () => {}), createEvent<void>()]                  })
      sample({clock:unknownClock, source:unknownClock, target:[createEffect<unknown, unknown>(async () => {}), createEvent<void>()]})
      sample({clock:unknownClock, source:unknownClock, target:[createEffect(async (value: void) => {}), createEvent<void>()]       })
      sample({clock:unknownClock, source:unknownClock, target:[createEffect(async (value: unknown) => {}), createEvent<void>()]    })
      sample({clock:unknownClock, source:unknownClock, target:[createEffect(async (value: any) => {}), createEvent<void>()]        })
      sample({clock:anyClock    , source:anyClock    , target:[createEffect(async () => {}), createEvent<void>()]                  })
      sample({clock:anyClock    , source:anyClock    , target:[createEffect<unknown, unknown>(async () => {}), createEvent<void>()]})
      sample({clock:anyClock    , source:anyClock    , target:[createEffect(async (value: void) => {}), createEvent<void>()]       })
      sample({clock:anyClock    , source:anyClock    , target:[createEffect(async (value: unknown) => {}), createEvent<void>()]    })
      sample({clock:anyClock    , source:anyClock    , target:[createEffect(async (value: any) => {}), createEvent<void>()]        })
      sample({clock:anyClock    , source:anyClock    , target:[createEffect(async (value: number) => {}), createEvent<void>()]     })
      sample({clock:anyClock    , source:anyClock    , target:[createEffect(async (value: string) => {}), createEvent<void>()]     })
      sample({clock:neverClock  , source:neverClock  , target:[createEffect(async () => {}), createEvent<void>()]                  })
      sample({clock:neverClock  , source:neverClock  , target:[createEffect<unknown, unknown>(async () => {}), createEvent<void>()]})
      sample({clock:neverClock  , source:neverClock  , target:[createEffect(async (value: void) => {}), createEvent<void>()]       })
      sample({clock:neverClock  , source:neverClock  , target:[createEffect(async (value: unknown) => {}), createEvent<void>()]    })
      sample({clock:neverClock  , source:neverClock  , target:[createEffect(async (value: any) => {}), createEvent<void>()]        })
      sample({clock:neverClock  , source:neverClock  , target:[createEffect(async (value: never) => {}), createEvent<void>()]      })
      sample({clock:neverClock  , source:neverClock  , target:[createEffect(async (value: number) => {}), createEvent<void>()]     })
      sample({clock:neverClock  , source:neverClock  , target:[createEffect(async (value: string) => {}), createEvent<void>()]     })
      sample({clock:numberClock , source:numberClock , target:[createEffect(async () => {}), createEvent<void>()]                  })
      sample({clock:numberClock , source:numberClock , target:[createEffect<unknown, unknown>(async () => {}), createEvent<void>()]})
      sample({clock:numberClock , source:numberClock , target:[createEffect(async (value: void) => {}), createEvent<void>()]       })
      sample({clock:numberClock , source:numberClock , target:[createEffect(async (value: unknown) => {}), createEvent<void>()]    })
      sample({clock:numberClock , source:numberClock , target:[createEffect(async (value: any) => {}), createEvent<void>()]        })
      sample({clock:numberClock , source:numberClock , target:[createEffect(async (value: number) => {}), createEvent<void>()]     })
      sample({clock:stringClock , source:stringClock , target:[createEffect(async () => {}), createEvent<void>()]                  })
      sample({clock:stringClock , source:stringClock , target:[createEffect<unknown, unknown>(async () => {}), createEvent<void>()]})
      sample({clock:stringClock , source:stringClock , target:[createEffect(async (value: void) => {}), createEvent<void>()]       })
      sample({clock:stringClock , source:stringClock , target:[createEffect(async (value: unknown) => {}), createEvent<void>()]    })
      sample({clock:stringClock , source:stringClock , target:[createEffect(async (value: any) => {}), createEvent<void>()]        })
      sample({clock:stringClock , source:stringClock , target:[createEffect(async (value: string) => {}), createEvent<void>()]     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('multiple, both, async (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        source: anyClock,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {}), createEvent<void>()],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Object literal may only specify known properties, and 'clock' does not exist in type '{ source: Unit<void>; error: \\"source should extend target type\\"; }'.
      lack of expected error at test line 7 'source: voidClock,'
      lack of expected error at test line 9 'target: [createEffect(async (value: never) => {}), createEvent<void>()],'
      lack of expected error at test line 13 'clock: voidClock,'
      lack of expected error at test line 15 'source: voidClock,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 21 'clock: voidClock,'
      lack of expected error at test line 23 'source: voidClock,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      lack of expected error at test line 29 'clock: unknownClock,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'void'.
      lack of expected error at test line 33 'target: [createEffect(async (value: never) => {}), createEvent<void>()],'
      lack of expected error at test line 37 'clock: unknownClock,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<void | number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'void | number'.
      lack of expected error at test line 41 'target: [createEffect(async (value: number) => {}), createEvent<void>()],'
      lack of expected error at test line 45 'clock: unknownClock,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<void | string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'void | string'.
      lack of expected error at test line 49 'target: [createEffect(async (value: string) => {}), createEvent<void>()],'
      lack of expected error at test line 53 'clock: anyClock,'
      lack of expected error at test line 55 'source: anyClock,'
      lack of expected error at test line 57 'target: [createEffect(async (value: never) => {}), createEvent<void>()],'
      lack of expected error at test line 61 'clock: numberClock,'
      lack of expected error at test line 63 'source: numberClock,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      lack of expected error at test line 69 'clock: numberClock,'
      lack of expected error at test line 71 'source: numberClock,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      lack of expected error at test line 77 'clock: stringClock,'
      lack of expected error at test line 79 'source: stringClock,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      lack of expected error at test line 85 'clock: stringClock,'
      lack of expected error at test line 87 'source: stringClock,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      "
    `)
  })
})
describe('multiple, Boolean, async', () => {
  test('multiple, Boolean, async (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , filter:Boolean, target:[createEffect(async () => {}), createEvent<void>()]                  })
      sample({clock:voidClock   , filter:Boolean, target:[createEffect<unknown, unknown>(async () => {}), createEvent<void>()]})
      sample({clock:voidClock   , filter:Boolean, target:[createEffect(async (value: void) => {}), createEvent<void>()]       })
      sample({clock:voidClock   , filter:Boolean, target:[createEffect(async (value: unknown) => {}), createEvent<void>()]    })
      sample({clock:voidClock   , filter:Boolean, target:[createEffect(async (value: any) => {}), createEvent<void>()]        })
      sample({clock:unknownClock, filter:Boolean, target:[createEffect(async () => {}), createEvent<void>()]                  })
      sample({clock:unknownClock, filter:Boolean, target:[createEffect<unknown, unknown>(async () => {}), createEvent<void>()]})
      sample({clock:unknownClock, filter:Boolean, target:[createEffect(async (value: void) => {}), createEvent<void>()]       })
      sample({clock:unknownClock, filter:Boolean, target:[createEffect(async (value: unknown) => {}), createEvent<void>()]    })
      sample({clock:unknownClock, filter:Boolean, target:[createEffect(async (value: any) => {}), createEvent<void>()]        })
      sample({clock:anyClock    , filter:Boolean, target:[createEffect(async () => {}), createEvent<void>()]                  })
      sample({clock:anyClock    , filter:Boolean, target:[createEffect<unknown, unknown>(async () => {}), createEvent<void>()]})
      sample({clock:anyClock    , filter:Boolean, target:[createEffect(async (value: void) => {}), createEvent<void>()]       })
      sample({clock:anyClock    , filter:Boolean, target:[createEffect(async (value: unknown) => {}), createEvent<void>()]    })
      sample({clock:anyClock    , filter:Boolean, target:[createEffect(async (value: any) => {}), createEvent<void>()]        })
      sample({clock:anyClock    , filter:Boolean, target:[createEffect(async (value: number) => {}), createEvent<void>()]     })
      sample({clock:anyClock    , filter:Boolean, target:[createEffect(async (value: string) => {}), createEvent<void>()]     })
      sample({clock:neverClock  , filter:Boolean, target:[createEffect(async () => {}), createEvent<void>()]                  })
      sample({clock:neverClock  , filter:Boolean, target:[createEffect<unknown, unknown>(async () => {}), createEvent<void>()]})
      sample({clock:neverClock  , filter:Boolean, target:[createEffect(async (value: void) => {}), createEvent<void>()]       })
      sample({clock:neverClock  , filter:Boolean, target:[createEffect(async (value: unknown) => {}), createEvent<void>()]    })
      sample({clock:neverClock  , filter:Boolean, target:[createEffect(async (value: any) => {}), createEvent<void>()]        })
      sample({clock:neverClock  , filter:Boolean, target:[createEffect(async (value: never) => {}), createEvent<void>()]      })
      sample({clock:neverClock  , filter:Boolean, target:[createEffect(async (value: number) => {}), createEvent<void>()]     })
      sample({clock:neverClock  , filter:Boolean, target:[createEffect(async (value: string) => {}), createEvent<void>()]     })
      sample({clock:numberClock , filter:Boolean, target:[createEffect(async () => {}), createEvent<void>()]                  })
      sample({clock:numberClock , filter:Boolean, target:[createEffect<unknown, unknown>(async () => {}), createEvent<void>()]})
      sample({clock:numberClock , filter:Boolean, target:[createEffect(async (value: void) => {}), createEvent<void>()]       })
      sample({clock:numberClock , filter:Boolean, target:[createEffect(async (value: unknown) => {}), createEvent<void>()]    })
      sample({clock:numberClock , filter:Boolean, target:[createEffect(async (value: any) => {}), createEvent<void>()]        })
      sample({clock:numberClock , filter:Boolean, target:[createEffect(async (value: number) => {}), createEvent<void>()]     })
      sample({clock:stringClock , filter:Boolean, target:[createEffect(async () => {}), createEvent<void>()]                  })
      sample({clock:stringClock , filter:Boolean, target:[createEffect<unknown, unknown>(async () => {}), createEvent<void>()]})
      sample({clock:stringClock , filter:Boolean, target:[createEffect(async (value: void) => {}), createEvent<void>()]       })
      sample({clock:stringClock , filter:Boolean, target:[createEffect(async (value: unknown) => {}), createEvent<void>()]    })
      sample({clock:stringClock , filter:Boolean, target:[createEffect(async (value: any) => {}), createEvent<void>()]        })
      sample({clock:stringClock , filter:Boolean, target:[createEffect(async (value: string) => {}), createEvent<void>()]     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('multiple, Boolean, async (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {}), createEvent<void>()],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 7 'filter: Boolean,'
      lack of expected error at test line 9 'target: [createEffect(async (value: never) => {}), createEvent<void>()],'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      lack of expected error at test line 15 'filter: Boolean,'
      Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      lack of expected error at test line 23 'filter: Boolean,'
      Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 31 'filter: Boolean,'
      lack of expected error at test line 33 'target: [createEffect(async (value: never) => {}), createEvent<void>()],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 39 'filter: Boolean,'
      lack of expected error at test line 41 'target: [createEffect(async (value: number) => {}), createEvent<void>()],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 47 'filter: Boolean,'
      lack of expected error at test line 49 'target: [createEffect(async (value: string) => {}), createEvent<void>()],'
      Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'any' is not assignable to type 'never'.
      lack of expected error at test line 55 'filter: Boolean,'
      lack of expected error at test line 57 'target: [createEffect(async (value: never) => {}), createEvent<void>()],'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 63 'filter: Boolean,'
      lack of expected error at test line 65 'target: [createEffect(async (value: never) => {}), createEvent<void>()],'
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      lack of expected error at test line 71 'filter: Boolean,'
      Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 79 'filter: Boolean,'
      lack of expected error at test line 81 'target: [createEffect(async (value: never) => {}), createEvent<void>()],'
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 87 'filter: Boolean,'
      Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('multiple, filter, async', () => {
  test('multiple, filter, async (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , filter:() => true, target:[createEffect(async () => {}), createEvent<void>()]                  })
      sample({clock:voidClock   , filter:() => true, target:[createEffect<unknown, unknown>(async () => {}), createEvent<void>()]})
      sample({clock:voidClock   , filter:() => true, target:[createEffect(async (value: void) => {}), createEvent<void>()]       })
      sample({clock:voidClock   , filter:() => true, target:[createEffect(async (value: unknown) => {}), createEvent<void>()]    })
      sample({clock:voidClock   , filter:() => true, target:[createEffect(async (value: any) => {}), createEvent<void>()]        })
      sample({clock:unknownClock, filter:() => true, target:[createEffect(async () => {}), createEvent<void>()]                  })
      sample({clock:unknownClock, filter:() => true, target:[createEffect<unknown, unknown>(async () => {}), createEvent<void>()]})
      sample({clock:unknownClock, filter:() => true, target:[createEffect(async (value: void) => {}), createEvent<void>()]       })
      sample({clock:unknownClock, filter:() => true, target:[createEffect(async (value: unknown) => {}), createEvent<void>()]    })
      sample({clock:unknownClock, filter:() => true, target:[createEffect(async (value: any) => {}), createEvent<void>()]        })
      sample({clock:anyClock    , filter:() => true, target:[createEffect(async () => {}), createEvent<void>()]                  })
      sample({clock:anyClock    , filter:() => true, target:[createEffect<unknown, unknown>(async () => {}), createEvent<void>()]})
      sample({clock:anyClock    , filter:() => true, target:[createEffect(async (value: void) => {}), createEvent<void>()]       })
      sample({clock:anyClock    , filter:() => true, target:[createEffect(async (value: unknown) => {}), createEvent<void>()]    })
      sample({clock:anyClock    , filter:() => true, target:[createEffect(async (value: any) => {}), createEvent<void>()]        })
      sample({clock:anyClock    , filter:() => true, target:[createEffect(async (value: number) => {}), createEvent<void>()]     })
      sample({clock:anyClock    , filter:() => true, target:[createEffect(async (value: string) => {}), createEvent<void>()]     })
      sample({clock:neverClock  , filter:() => true, target:[createEffect(async () => {}), createEvent<void>()]                  })
      sample({clock:neverClock  , filter:() => true, target:[createEffect<unknown, unknown>(async () => {}), createEvent<void>()]})
      sample({clock:neverClock  , filter:() => true, target:[createEffect(async (value: void) => {}), createEvent<void>()]       })
      sample({clock:neverClock  , filter:() => true, target:[createEffect(async (value: unknown) => {}), createEvent<void>()]    })
      sample({clock:neverClock  , filter:() => true, target:[createEffect(async (value: any) => {}), createEvent<void>()]        })
      sample({clock:neverClock  , filter:() => true, target:[createEffect(async (value: never) => {}), createEvent<void>()]      })
      sample({clock:neverClock  , filter:() => true, target:[createEffect(async (value: number) => {}), createEvent<void>()]     })
      sample({clock:neverClock  , filter:() => true, target:[createEffect(async (value: string) => {}), createEvent<void>()]     })
      sample({clock:numberClock , filter:() => true, target:[createEffect(async () => {}), createEvent<void>()]                  })
      sample({clock:numberClock , filter:() => true, target:[createEffect<unknown, unknown>(async () => {}), createEvent<void>()]})
      sample({clock:numberClock , filter:() => true, target:[createEffect(async (value: void) => {}), createEvent<void>()]       })
      sample({clock:numberClock , filter:() => true, target:[createEffect(async (value: unknown) => {}), createEvent<void>()]    })
      sample({clock:numberClock , filter:() => true, target:[createEffect(async (value: any) => {}), createEvent<void>()]        })
      sample({clock:numberClock , filter:() => true, target:[createEffect(async (value: number) => {}), createEvent<void>()]     })
      sample({clock:stringClock , filter:() => true, target:[createEffect(async () => {}), createEvent<void>()]                  })
      sample({clock:stringClock , filter:() => true, target:[createEffect<unknown, unknown>(async () => {}), createEvent<void>()]})
      sample({clock:stringClock , filter:() => true, target:[createEffect(async (value: void) => {}), createEvent<void>()]       })
      sample({clock:stringClock , filter:() => true, target:[createEffect(async (value: unknown) => {}), createEvent<void>()]    })
      sample({clock:stringClock , filter:() => true, target:[createEffect(async (value: any) => {}), createEvent<void>()]        })
      sample({clock:stringClock , filter:() => true, target:[createEffect(async (value: string) => {}), createEvent<void>()]     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('multiple, filter, async (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {}), createEvent<void>()],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      lack of expected error at test line 5 'clock: voidClock,'
      Object literal may only specify known properties, and 'filter' does not exist in type '{ clock: Unit<void>; error: \\"clock should extend target type\\"; }'.
      lack of expected error at test line 9 'target: [createEffect(async (value: never) => {}), createEvent<void>()],'
      lack of expected error at test line 13 'clock: voidClock,'
      lack of expected error at test line 15 'filter: () => true,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 21 'clock: voidClock,'
      lack of expected error at test line 23 'filter: () => true,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'void'.
      lack of expected error at test line 31 'filter: () => true,'
      lack of expected error at test line 33 'target: [createEffect(async (value: never) => {}), createEvent<void>()],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<void | number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'void | number'.
      lack of expected error at test line 39 'filter: () => true,'
      lack of expected error at test line 41 'target: [createEffect(async (value: number) => {}), createEvent<void>()],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<void | string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'void | string'.
      lack of expected error at test line 47 'filter: () => true,'
      lack of expected error at test line 49 'target: [createEffect(async (value: string) => {}), createEvent<void>()],'
      lack of expected error at test line 53 'clock: anyClock,'
      lack of expected error at test line 55 'filter: () => true,'
      lack of expected error at test line 57 'target: [createEffect(async (value: never) => {}), createEvent<void>()],'
      lack of expected error at test line 61 'clock: numberClock,'
      lack of expected error at test line 63 'filter: () => true,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      lack of expected error at test line 69 'clock: numberClock,'
      lack of expected error at test line 71 'filter: () => true,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      lack of expected error at test line 77 'clock: stringClock,'
      lack of expected error at test line 79 'filter: () => true,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      lack of expected error at test line 85 'clock: stringClock,'
      lack of expected error at test line 87 'filter: () => true,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      "
    `)
  })
})
describe('multiple, fn, async', () => {
  test('multiple, fn, async (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , fn:(value: void) => value   , target:[createEffect(async () => {}), createEvent<void>()]                  })
      sample({clock:voidClock   , fn:(value: void) => value   , target:[createEffect<unknown, unknown>(async () => {}), createEvent<void>()]})
      sample({clock:voidClock   , fn:(value: void) => value   , target:[createEffect(async (value: void) => {}), createEvent<void>()]       })
      sample({clock:voidClock   , fn:(value: void) => value   , target:[createEffect(async (value: unknown) => {}), createEvent<void>()]    })
      sample({clock:voidClock   , fn:(value: void) => value   , target:[createEffect(async (value: any) => {}), createEvent<void>()]        })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:[createEffect(async () => {}), createEvent<void>()]                  })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:[createEffect<unknown, unknown>(async () => {}), createEvent<void>()]})
      sample({clock:unknownClock, fn:(value: unknown) => value, target:[createEffect(async (value: void) => {}), createEvent<void>()]       })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:[createEffect(async (value: unknown) => {}), createEvent<void>()]    })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:[createEffect(async (value: any) => {}), createEvent<void>()]        })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[createEffect(async () => {}), createEvent<void>()]                  })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[createEffect<unknown, unknown>(async () => {}), createEvent<void>()]})
      sample({clock:anyClock    , fn:(value: any) => value    , target:[createEffect(async (value: void) => {}), createEvent<void>()]       })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[createEffect(async (value: unknown) => {}), createEvent<void>()]    })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[createEffect(async (value: any) => {}), createEvent<void>()]        })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[createEffect(async (value: number) => {}), createEvent<void>()]     })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[createEffect(async (value: string) => {}), createEvent<void>()]     })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect(async () => {}), createEvent<void>()]                  })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect<unknown, unknown>(async () => {}), createEvent<void>()]})
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect(async (value: void) => {}), createEvent<void>()]       })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect(async (value: unknown) => {}), createEvent<void>()]    })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect(async (value: any) => {}), createEvent<void>()]        })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect(async (value: never) => {}), createEvent<void>()]      })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect(async (value: number) => {}), createEvent<void>()]     })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect(async (value: string) => {}), createEvent<void>()]     })
      sample({clock:numberClock , fn:(value: number) => value , target:[createEffect(async () => {}), createEvent<void>()]                  })
      sample({clock:numberClock , fn:(value: number) => value , target:[createEffect<unknown, unknown>(async () => {}), createEvent<void>()]})
      sample({clock:numberClock , fn:(value: number) => value , target:[createEffect(async (value: void) => {}), createEvent<void>()]       })
      sample({clock:numberClock , fn:(value: number) => value , target:[createEffect(async (value: unknown) => {}), createEvent<void>()]    })
      sample({clock:numberClock , fn:(value: number) => value , target:[createEffect(async (value: any) => {}), createEvent<void>()]        })
      sample({clock:numberClock , fn:(value: number) => value , target:[createEffect(async (value: number) => {}), createEvent<void>()]     })
      sample({clock:stringClock , fn:(value: string) => value , target:[createEffect(async () => {}), createEvent<void>()]                  })
      sample({clock:stringClock , fn:(value: string) => value , target:[createEffect<unknown, unknown>(async () => {}), createEvent<void>()]})
      sample({clock:stringClock , fn:(value: string) => value , target:[createEffect(async (value: void) => {}), createEvent<void>()]       })
      sample({clock:stringClock , fn:(value: string) => value , target:[createEffect(async (value: unknown) => {}), createEvent<void>()]    })
      sample({clock:stringClock , fn:(value: string) => value , target:[createEffect(async (value: any) => {}), createEvent<void>()]        })
      sample({clock:stringClock , fn:(value: string) => value , target:[createEffect(async (value: string) => {}), createEvent<void>()]     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('multiple, fn, async (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        fn: (value: void) => value,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        fn: (value: void) => value,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        fn: (value: void) => value,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        fn: (value: unknown) => value,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        fn: (value: unknown) => value,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        fn: (value: unknown) => value,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        fn: (value: any) => value,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        fn: (value: number) => value,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        fn: (value: number) => value,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        fn: (value: string) => value,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {}), createEvent<void>()],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        fn: (value: string) => value,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {}), createEvent<void>()],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value?: void | undefined) => void; target: readonly [Unit<void>, Unit<void>]; error: \\"fn result should extend target type\\"; }'.
      lack of expected error at test line 7 'fn: (value: void) => value,'
      lack of expected error at test line 9 'target: [createEffect(async (value: never) => {}), createEvent<void>()],'
      lack of expected error at test line 13 'clock: voidClock,'
      Type '(value: void) => void' is not assignable to type '(value?: void | undefined) => number'.
        Type 'void' is not assignable to type 'number'.
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 21 'clock: voidClock,'
      Type '(value: void) => void' is not assignable to type '(value?: void | undefined) => string'.
        Type 'void' is not assignable to type 'string'.
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value: unknown) => void; target: readonly [Unit<unknown>, Unit<unknown>]; error: \\"fn result should extend target type\\"; }'.
      lack of expected error at test line 31 'fn: (value: unknown) => value,'
      lack of expected error at test line 33 'target: [createEffect(async (value: never) => {}), createEvent<void>()],'
      lack of expected error at test line 37 'clock: unknownClock,'
      Type '(value: unknown) => unknown' is not assignable to type '(value: unknown) => number'.
        Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 41 'target: [createEffect(async (value: number) => {}), createEvent<void>()],'
      lack of expected error at test line 45 'clock: unknownClock,'
      Type '(value: unknown) => unknown' is not assignable to type '(value: unknown) => string'.
        Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 49 'target: [createEffect(async (value: string) => {}), createEvent<void>()],'
      lack of expected error at test line 53 'clock: anyClock,'
      lack of expected error at test line 55 'fn: (value: any) => value,'
      lack of expected error at test line 57 'target: [createEffect(async (value: never) => {}), createEvent<void>()],'
      lack of expected error at test line 61 'clock: numberClock,'
      lack of expected error at test line 63 'fn: (value: number) => value,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      lack of expected error at test line 69 'clock: numberClock,'
      Type '(value: number) => number' is not assignable to type '(value: number) => string'.
        Type 'number' is not assignable to type 'string'.
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      lack of expected error at test line 77 'clock: stringClock,'
      lack of expected error at test line 79 'fn: (value: string) => value,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      lack of expected error at test line 85 'clock: stringClock,'
      Type '(value: string) => string' is not assignable to type '(value: string) => number'.
        Type 'string' is not assignable to type 'number'.
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      "
    `)
  })
})
describe('readonly, clock, async', () => {
  test('readonly, clock, async (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , target:[createEffect(async () => {})] as const                  })
      sample({clock:voidClock   , target:[createEffect<unknown, unknown>(async () => {})] as const})
      sample({clock:voidClock   , target:[createEffect(async (value: void) => {})] as const       })
      sample({clock:voidClock   , target:[createEffect(async (value: unknown) => {})] as const    })
      sample({clock:voidClock   , target:[createEffect(async (value: any) => {})] as const        })
      sample({clock:unknownClock, target:[createEffect(async () => {})] as const                  })
      sample({clock:unknownClock, target:[createEffect<unknown, unknown>(async () => {})] as const})
      sample({clock:unknownClock, target:[createEffect(async (value: void) => {})] as const       })
      sample({clock:unknownClock, target:[createEffect(async (value: unknown) => {})] as const    })
      sample({clock:unknownClock, target:[createEffect(async (value: any) => {})] as const        })
      sample({clock:anyClock    , target:[createEffect(async () => {})] as const                  })
      sample({clock:anyClock    , target:[createEffect<unknown, unknown>(async () => {})] as const})
      sample({clock:anyClock    , target:[createEffect(async (value: void) => {})] as const       })
      sample({clock:anyClock    , target:[createEffect(async (value: unknown) => {})] as const    })
      sample({clock:anyClock    , target:[createEffect(async (value: any) => {})] as const        })
      sample({clock:anyClock    , target:[createEffect(async (value: number) => {})] as const     })
      sample({clock:anyClock    , target:[createEffect(async (value: string) => {})] as const     })
      sample({clock:neverClock  , target:[createEffect(async () => {})] as const                  })
      sample({clock:neverClock  , target:[createEffect<unknown, unknown>(async () => {})] as const})
      sample({clock:neverClock  , target:[createEffect(async (value: void) => {})] as const       })
      sample({clock:neverClock  , target:[createEffect(async (value: unknown) => {})] as const    })
      sample({clock:neverClock  , target:[createEffect(async (value: any) => {})] as const        })
      sample({clock:neverClock  , target:[createEffect(async (value: never) => {})] as const      })
      sample({clock:neverClock  , target:[createEffect(async (value: number) => {})] as const     })
      sample({clock:neverClock  , target:[createEffect(async (value: string) => {})] as const     })
      sample({clock:numberClock , target:[createEffect(async () => {})] as const                  })
      sample({clock:numberClock , target:[createEffect<unknown, unknown>(async () => {})] as const})
      sample({clock:numberClock , target:[createEffect(async (value: void) => {})] as const       })
      sample({clock:numberClock , target:[createEffect(async (value: unknown) => {})] as const    })
      sample({clock:numberClock , target:[createEffect(async (value: any) => {})] as const        })
      sample({clock:numberClock , target:[createEffect(async (value: number) => {})] as const     })
      sample({clock:stringClock , target:[createEffect(async () => {})] as const                  })
      sample({clock:stringClock , target:[createEffect<unknown, unknown>(async () => {})] as const})
      sample({clock:stringClock , target:[createEffect(async (value: void) => {})] as const       })
      sample({clock:stringClock , target:[createEffect(async (value: unknown) => {})] as const    })
      sample({clock:stringClock , target:[createEffect(async (value: any) => {})] as const        })
      sample({clock:stringClock , target:[createEffect(async (value: string) => {})] as const     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('readonly, clock, async (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {})] as const,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 7 'target: [createEffect(async (value: never) => {})] as const,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 25 'target: [createEffect(async (value: never) => {})] as const,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 31 'target: [createEffect(async (value: number) => {})] as const,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 37 'target: [createEffect(async (value: string) => {})] as const,'
      Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'any' is not assignable to type 'never'.
      lack of expected error at test line 43 'target: [createEffect(async (value: never) => {})] as const,'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 49 'target: [createEffect(async (value: never) => {})] as const,'
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 61 'target: [createEffect(async (value: never) => {})] as const,'
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('readonly, source, async', () => {
  test('readonly, source, async (should pass)', () => {
    //prettier-ignore
    {
      sample({source:voidClock   , target:[createEffect(async () => {})] as const                  })
      sample({source:voidClock   , target:[createEffect<unknown, unknown>(async () => {})] as const})
      sample({source:voidClock   , target:[createEffect(async (value: void) => {})] as const       })
      sample({source:voidClock   , target:[createEffect(async (value: unknown) => {})] as const    })
      sample({source:voidClock   , target:[createEffect(async (value: any) => {})] as const        })
      sample({source:unknownClock, target:[createEffect(async () => {})] as const                  })
      sample({source:unknownClock, target:[createEffect<unknown, unknown>(async () => {})] as const})
      sample({source:unknownClock, target:[createEffect(async (value: void) => {})] as const       })
      sample({source:unknownClock, target:[createEffect(async (value: unknown) => {})] as const    })
      sample({source:unknownClock, target:[createEffect(async (value: any) => {})] as const        })
      sample({source:anyClock    , target:[createEffect(async () => {})] as const                  })
      sample({source:anyClock    , target:[createEffect<unknown, unknown>(async () => {})] as const})
      sample({source:anyClock    , target:[createEffect(async (value: void) => {})] as const       })
      sample({source:anyClock    , target:[createEffect(async (value: unknown) => {})] as const    })
      sample({source:anyClock    , target:[createEffect(async (value: any) => {})] as const        })
      sample({source:anyClock    , target:[createEffect(async (value: number) => {})] as const     })
      sample({source:anyClock    , target:[createEffect(async (value: string) => {})] as const     })
      sample({source:neverClock  , target:[createEffect(async () => {})] as const                  })
      sample({source:neverClock  , target:[createEffect<unknown, unknown>(async () => {})] as const})
      sample({source:neverClock  , target:[createEffect(async (value: void) => {})] as const       })
      sample({source:neverClock  , target:[createEffect(async (value: unknown) => {})] as const    })
      sample({source:neverClock  , target:[createEffect(async (value: any) => {})] as const        })
      sample({source:neverClock  , target:[createEffect(async (value: never) => {})] as const      })
      sample({source:neverClock  , target:[createEffect(async (value: number) => {})] as const     })
      sample({source:neverClock  , target:[createEffect(async (value: string) => {})] as const     })
      sample({source:numberClock , target:[createEffect(async () => {})] as const                  })
      sample({source:numberClock , target:[createEffect<unknown, unknown>(async () => {})] as const})
      sample({source:numberClock , target:[createEffect(async (value: void) => {})] as const       })
      sample({source:numberClock , target:[createEffect(async (value: unknown) => {})] as const    })
      sample({source:numberClock , target:[createEffect(async (value: any) => {})] as const        })
      sample({source:numberClock , target:[createEffect(async (value: number) => {})] as const     })
      sample({source:stringClock , target:[createEffect(async () => {})] as const                  })
      sample({source:stringClock , target:[createEffect<unknown, unknown>(async () => {})] as const})
      sample({source:stringClock , target:[createEffect(async (value: void) => {})] as const       })
      sample({source:stringClock , target:[createEffect(async (value: unknown) => {})] as const    })
      sample({source:stringClock , target:[createEffect(async (value: any) => {})] as const        })
      sample({source:stringClock , target:[createEffect(async (value: string) => {})] as const     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('readonly, source, async (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {})] as const,
      })
      sample({
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {})] as const,
      })
      sample({
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {})] as const,
      })
      sample({
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {})] as const,
      })
      sample({
        //@ts-expect-error
        source: anyClock,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {})] as const,
      })
      sample({
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {})] as const,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 7 'target: [createEffect(async (value: never) => {})] as const,'
      lack of expected error at test line 11 'source: voidClock,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 17 'source: voidClock,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 25 'target: [createEffect(async (value: never) => {})] as const,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 31 'target: [createEffect(async (value: number) => {})] as const,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 37 'target: [createEffect(async (value: string) => {})] as const,'
      lack of expected error at test line 41 'source: anyClock,'
      lack of expected error at test line 43 'target: [createEffect(async (value: never) => {})] as const,'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 49 'target: [createEffect(async (value: never) => {})] as const,'
      lack of expected error at test line 53 'source: numberClock,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 61 'target: [createEffect(async (value: never) => {})] as const,'
      lack of expected error at test line 65 'source: stringClock,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('readonly, both, async', () => {
  test('readonly, both, async (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , source:voidClock   , target:[createEffect(async () => {})] as const                  })
      sample({clock:voidClock   , source:voidClock   , target:[createEffect<unknown, unknown>(async () => {})] as const})
      sample({clock:voidClock   , source:voidClock   , target:[createEffect(async (value: void) => {})] as const       })
      sample({clock:voidClock   , source:voidClock   , target:[createEffect(async (value: unknown) => {})] as const    })
      sample({clock:voidClock   , source:voidClock   , target:[createEffect(async (value: any) => {})] as const        })
      sample({clock:unknownClock, source:unknownClock, target:[createEffect(async () => {})] as const                  })
      sample({clock:unknownClock, source:unknownClock, target:[createEffect<unknown, unknown>(async () => {})] as const})
      sample({clock:unknownClock, source:unknownClock, target:[createEffect(async (value: void) => {})] as const       })
      sample({clock:unknownClock, source:unknownClock, target:[createEffect(async (value: unknown) => {})] as const    })
      sample({clock:unknownClock, source:unknownClock, target:[createEffect(async (value: any) => {})] as const        })
      sample({clock:anyClock    , source:anyClock    , target:[createEffect(async () => {})] as const                  })
      sample({clock:anyClock    , source:anyClock    , target:[createEffect<unknown, unknown>(async () => {})] as const})
      sample({clock:anyClock    , source:anyClock    , target:[createEffect(async (value: void) => {})] as const       })
      sample({clock:anyClock    , source:anyClock    , target:[createEffect(async (value: unknown) => {})] as const    })
      sample({clock:anyClock    , source:anyClock    , target:[createEffect(async (value: any) => {})] as const        })
      sample({clock:anyClock    , source:anyClock    , target:[createEffect(async (value: number) => {})] as const     })
      sample({clock:anyClock    , source:anyClock    , target:[createEffect(async (value: string) => {})] as const     })
      sample({clock:neverClock  , source:neverClock  , target:[createEffect(async () => {})] as const                  })
      sample({clock:neverClock  , source:neverClock  , target:[createEffect<unknown, unknown>(async () => {})] as const})
      sample({clock:neverClock  , source:neverClock  , target:[createEffect(async (value: void) => {})] as const       })
      sample({clock:neverClock  , source:neverClock  , target:[createEffect(async (value: unknown) => {})] as const    })
      sample({clock:neverClock  , source:neverClock  , target:[createEffect(async (value: any) => {})] as const        })
      sample({clock:neverClock  , source:neverClock  , target:[createEffect(async (value: never) => {})] as const      })
      sample({clock:neverClock  , source:neverClock  , target:[createEffect(async (value: number) => {})] as const     })
      sample({clock:neverClock  , source:neverClock  , target:[createEffect(async (value: string) => {})] as const     })
      sample({clock:numberClock , source:numberClock , target:[createEffect(async () => {})] as const                  })
      sample({clock:numberClock , source:numberClock , target:[createEffect<unknown, unknown>(async () => {})] as const})
      sample({clock:numberClock , source:numberClock , target:[createEffect(async (value: void) => {})] as const       })
      sample({clock:numberClock , source:numberClock , target:[createEffect(async (value: unknown) => {})] as const    })
      sample({clock:numberClock , source:numberClock , target:[createEffect(async (value: any) => {})] as const        })
      sample({clock:numberClock , source:numberClock , target:[createEffect(async (value: number) => {})] as const     })
      sample({clock:stringClock , source:stringClock , target:[createEffect(async () => {})] as const                  })
      sample({clock:stringClock , source:stringClock , target:[createEffect<unknown, unknown>(async () => {})] as const})
      sample({clock:stringClock , source:stringClock , target:[createEffect(async (value: void) => {})] as const       })
      sample({clock:stringClock , source:stringClock , target:[createEffect(async (value: unknown) => {})] as const    })
      sample({clock:stringClock , source:stringClock , target:[createEffect(async (value: any) => {})] as const        })
      sample({clock:stringClock , source:stringClock , target:[createEffect(async (value: string) => {})] as const     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('readonly, both, async (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        source: anyClock,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {})] as const,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      lack of expected error at test line 5 'clock: voidClock,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 9 'target: [createEffect(async (value: never) => {})] as const,'
      lack of expected error at test line 13 'clock: voidClock,'
      lack of expected error at test line 15 'source: voidClock,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 21 'clock: voidClock,'
      lack of expected error at test line 23 'source: voidClock,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      lack of expected error at test line 29 'clock: unknownClock,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 33 'target: [createEffect(async (value: never) => {})] as const,'
      lack of expected error at test line 37 'clock: unknownClock,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 41 'target: [createEffect(async (value: number) => {})] as const,'
      lack of expected error at test line 45 'clock: unknownClock,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 49 'target: [createEffect(async (value: string) => {})] as const,'
      lack of expected error at test line 53 'clock: anyClock,'
      lack of expected error at test line 55 'source: anyClock,'
      lack of expected error at test line 57 'target: [createEffect(async (value: never) => {})] as const,'
      lack of expected error at test line 61 'clock: numberClock,'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 65 'target: [createEffect(async (value: never) => {})] as const,'
      lack of expected error at test line 69 'clock: numberClock,'
      lack of expected error at test line 71 'source: numberClock,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 77 'clock: stringClock,'
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 81 'target: [createEffect(async (value: never) => {})] as const,'
      lack of expected error at test line 85 'clock: stringClock,'
      lack of expected error at test line 87 'source: stringClock,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('readonly, Boolean, async', () => {
  test('readonly, Boolean, async (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , filter:Boolean, target:[createEffect(async () => {})] as const                  })
      sample({clock:voidClock   , filter:Boolean, target:[createEffect<unknown, unknown>(async () => {})] as const})
      sample({clock:voidClock   , filter:Boolean, target:[createEffect(async (value: void) => {})] as const       })
      sample({clock:voidClock   , filter:Boolean, target:[createEffect(async (value: unknown) => {})] as const    })
      sample({clock:voidClock   , filter:Boolean, target:[createEffect(async (value: any) => {})] as const        })
      sample({clock:unknownClock, filter:Boolean, target:[createEffect(async () => {})] as const                  })
      sample({clock:unknownClock, filter:Boolean, target:[createEffect<unknown, unknown>(async () => {})] as const})
      sample({clock:unknownClock, filter:Boolean, target:[createEffect(async (value: void) => {})] as const       })
      sample({clock:unknownClock, filter:Boolean, target:[createEffect(async (value: unknown) => {})] as const    })
      sample({clock:unknownClock, filter:Boolean, target:[createEffect(async (value: any) => {})] as const        })
      sample({clock:anyClock    , filter:Boolean, target:[createEffect(async () => {})] as const                  })
      sample({clock:anyClock    , filter:Boolean, target:[createEffect<unknown, unknown>(async () => {})] as const})
      sample({clock:anyClock    , filter:Boolean, target:[createEffect(async (value: void) => {})] as const       })
      sample({clock:anyClock    , filter:Boolean, target:[createEffect(async (value: unknown) => {})] as const    })
      sample({clock:anyClock    , filter:Boolean, target:[createEffect(async (value: any) => {})] as const        })
      sample({clock:anyClock    , filter:Boolean, target:[createEffect(async (value: number) => {})] as const     })
      sample({clock:anyClock    , filter:Boolean, target:[createEffect(async (value: string) => {})] as const     })
      sample({clock:neverClock  , filter:Boolean, target:[createEffect(async () => {})] as const                  })
      sample({clock:neverClock  , filter:Boolean, target:[createEffect<unknown, unknown>(async () => {})] as const})
      sample({clock:neverClock  , filter:Boolean, target:[createEffect(async (value: void) => {})] as const       })
      sample({clock:neverClock  , filter:Boolean, target:[createEffect(async (value: unknown) => {})] as const    })
      sample({clock:neverClock  , filter:Boolean, target:[createEffect(async (value: any) => {})] as const        })
      sample({clock:neverClock  , filter:Boolean, target:[createEffect(async (value: never) => {})] as const      })
      sample({clock:neverClock  , filter:Boolean, target:[createEffect(async (value: number) => {})] as const     })
      sample({clock:neverClock  , filter:Boolean, target:[createEffect(async (value: string) => {})] as const     })
      sample({clock:numberClock , filter:Boolean, target:[createEffect(async () => {})] as const                  })
      sample({clock:numberClock , filter:Boolean, target:[createEffect<unknown, unknown>(async () => {})] as const})
      sample({clock:numberClock , filter:Boolean, target:[createEffect(async (value: void) => {})] as const       })
      sample({clock:numberClock , filter:Boolean, target:[createEffect(async (value: unknown) => {})] as const    })
      sample({clock:numberClock , filter:Boolean, target:[createEffect(async (value: any) => {})] as const        })
      sample({clock:numberClock , filter:Boolean, target:[createEffect(async (value: number) => {})] as const     })
      sample({clock:stringClock , filter:Boolean, target:[createEffect(async () => {})] as const                  })
      sample({clock:stringClock , filter:Boolean, target:[createEffect<unknown, unknown>(async () => {})] as const})
      sample({clock:stringClock , filter:Boolean, target:[createEffect(async (value: void) => {})] as const       })
      sample({clock:stringClock , filter:Boolean, target:[createEffect(async (value: unknown) => {})] as const    })
      sample({clock:stringClock , filter:Boolean, target:[createEffect(async (value: any) => {})] as const        })
      sample({clock:stringClock , filter:Boolean, target:[createEffect(async (value: string) => {})] as const     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('readonly, Boolean, async (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {})] as const,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 7 'filter: Boolean,'
      lack of expected error at test line 9 'target: [createEffect(async (value: never) => {})] as const,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      lack of expected error at test line 15 'filter: Boolean,'
      Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      lack of expected error at test line 23 'filter: Boolean,'
      Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 31 'filter: Boolean,'
      lack of expected error at test line 33 'target: [createEffect(async (value: never) => {})] as const,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 39 'filter: Boolean,'
      lack of expected error at test line 41 'target: [createEffect(async (value: number) => {})] as const,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 47 'filter: Boolean,'
      lack of expected error at test line 49 'target: [createEffect(async (value: string) => {})] as const,'
      Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'any' is not assignable to type 'never'.
      lack of expected error at test line 55 'filter: Boolean,'
      lack of expected error at test line 57 'target: [createEffect(async (value: never) => {})] as const,'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 63 'filter: Boolean,'
      lack of expected error at test line 65 'target: [createEffect(async (value: never) => {})] as const,'
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      lack of expected error at test line 71 'filter: Boolean,'
      Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 79 'filter: Boolean,'
      lack of expected error at test line 81 'target: [createEffect(async (value: never) => {})] as const,'
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 87 'filter: Boolean,'
      Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('readonly, filter, async', () => {
  test('readonly, filter, async (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , filter:() => true, target:[createEffect(async () => {})] as const                  })
      sample({clock:voidClock   , filter:() => true, target:[createEffect<unknown, unknown>(async () => {})] as const})
      sample({clock:voidClock   , filter:() => true, target:[createEffect(async (value: void) => {})] as const       })
      sample({clock:voidClock   , filter:() => true, target:[createEffect(async (value: unknown) => {})] as const    })
      sample({clock:voidClock   , filter:() => true, target:[createEffect(async (value: any) => {})] as const        })
      sample({clock:unknownClock, filter:() => true, target:[createEffect(async () => {})] as const                  })
      sample({clock:unknownClock, filter:() => true, target:[createEffect<unknown, unknown>(async () => {})] as const})
      sample({clock:unknownClock, filter:() => true, target:[createEffect(async (value: void) => {})] as const       })
      sample({clock:unknownClock, filter:() => true, target:[createEffect(async (value: unknown) => {})] as const    })
      sample({clock:unknownClock, filter:() => true, target:[createEffect(async (value: any) => {})] as const        })
      sample({clock:anyClock    , filter:() => true, target:[createEffect(async () => {})] as const                  })
      sample({clock:anyClock    , filter:() => true, target:[createEffect<unknown, unknown>(async () => {})] as const})
      sample({clock:anyClock    , filter:() => true, target:[createEffect(async (value: void) => {})] as const       })
      sample({clock:anyClock    , filter:() => true, target:[createEffect(async (value: unknown) => {})] as const    })
      sample({clock:anyClock    , filter:() => true, target:[createEffect(async (value: any) => {})] as const        })
      sample({clock:anyClock    , filter:() => true, target:[createEffect(async (value: number) => {})] as const     })
      sample({clock:anyClock    , filter:() => true, target:[createEffect(async (value: string) => {})] as const     })
      sample({clock:neverClock  , filter:() => true, target:[createEffect(async () => {})] as const                  })
      sample({clock:neverClock  , filter:() => true, target:[createEffect<unknown, unknown>(async () => {})] as const})
      sample({clock:neverClock  , filter:() => true, target:[createEffect(async (value: void) => {})] as const       })
      sample({clock:neverClock  , filter:() => true, target:[createEffect(async (value: unknown) => {})] as const    })
      sample({clock:neverClock  , filter:() => true, target:[createEffect(async (value: any) => {})] as const        })
      sample({clock:neverClock  , filter:() => true, target:[createEffect(async (value: never) => {})] as const      })
      sample({clock:neverClock  , filter:() => true, target:[createEffect(async (value: number) => {})] as const     })
      sample({clock:neverClock  , filter:() => true, target:[createEffect(async (value: string) => {})] as const     })
      sample({clock:numberClock , filter:() => true, target:[createEffect(async () => {})] as const                  })
      sample({clock:numberClock , filter:() => true, target:[createEffect<unknown, unknown>(async () => {})] as const})
      sample({clock:numberClock , filter:() => true, target:[createEffect(async (value: void) => {})] as const       })
      sample({clock:numberClock , filter:() => true, target:[createEffect(async (value: unknown) => {})] as const    })
      sample({clock:numberClock , filter:() => true, target:[createEffect(async (value: any) => {})] as const        })
      sample({clock:numberClock , filter:() => true, target:[createEffect(async (value: number) => {})] as const     })
      sample({clock:stringClock , filter:() => true, target:[createEffect(async () => {})] as const                  })
      sample({clock:stringClock , filter:() => true, target:[createEffect<unknown, unknown>(async () => {})] as const})
      sample({clock:stringClock , filter:() => true, target:[createEffect(async (value: void) => {})] as const       })
      sample({clock:stringClock , filter:() => true, target:[createEffect(async (value: unknown) => {})] as const    })
      sample({clock:stringClock , filter:() => true, target:[createEffect(async (value: any) => {})] as const        })
      sample({clock:stringClock , filter:() => true, target:[createEffect(async (value: string) => {})] as const     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('readonly, filter, async (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {})] as const,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 7 'filter: () => true,'
      lack of expected error at test line 9 'target: [createEffect(async (value: never) => {})] as const,'
      lack of expected error at test line 13 'clock: voidClock,'
      lack of expected error at test line 15 'filter: () => true,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 21 'clock: voidClock,'
      lack of expected error at test line 23 'filter: () => true,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 31 'filter: () => true,'
      lack of expected error at test line 33 'target: [createEffect(async (value: never) => {})] as const,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 39 'filter: () => true,'
      lack of expected error at test line 41 'target: [createEffect(async (value: number) => {})] as const,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 47 'filter: () => true,'
      lack of expected error at test line 49 'target: [createEffect(async (value: string) => {})] as const,'
      lack of expected error at test line 53 'clock: anyClock,'
      lack of expected error at test line 55 'filter: () => true,'
      lack of expected error at test line 57 'target: [createEffect(async (value: never) => {})] as const,'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 63 'filter: () => true,'
      lack of expected error at test line 65 'target: [createEffect(async (value: never) => {})] as const,'
      lack of expected error at test line 69 'clock: numberClock,'
      lack of expected error at test line 71 'filter: () => true,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 79 'filter: () => true,'
      lack of expected error at test line 81 'target: [createEffect(async (value: never) => {})] as const,'
      lack of expected error at test line 85 'clock: stringClock,'
      lack of expected error at test line 87 'filter: () => true,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('readonly, fn, async', () => {
  test('readonly, fn, async (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , fn:(value: void) => value   , target:[createEffect(async () => {})] as const                  })
      sample({clock:voidClock   , fn:(value: void) => value   , target:[createEffect<unknown, unknown>(async () => {})] as const})
      sample({clock:voidClock   , fn:(value: void) => value   , target:[createEffect(async (value: void) => {})] as const       })
      sample({clock:voidClock   , fn:(value: void) => value   , target:[createEffect(async (value: unknown) => {})] as const    })
      sample({clock:voidClock   , fn:(value: void) => value   , target:[createEffect(async (value: any) => {})] as const        })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:[createEffect(async () => {})] as const                  })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:[createEffect<unknown, unknown>(async () => {})] as const})
      sample({clock:unknownClock, fn:(value: unknown) => value, target:[createEffect(async (value: void) => {})] as const       })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:[createEffect(async (value: unknown) => {})] as const    })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:[createEffect(async (value: any) => {})] as const        })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[createEffect(async () => {})] as const                  })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[createEffect<unknown, unknown>(async () => {})] as const})
      sample({clock:anyClock    , fn:(value: any) => value    , target:[createEffect(async (value: void) => {})] as const       })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[createEffect(async (value: unknown) => {})] as const    })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[createEffect(async (value: any) => {})] as const        })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[createEffect(async (value: number) => {})] as const     })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[createEffect(async (value: string) => {})] as const     })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect(async () => {})] as const                  })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect<unknown, unknown>(async () => {})] as const})
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect(async (value: void) => {})] as const       })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect(async (value: unknown) => {})] as const    })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect(async (value: any) => {})] as const        })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect(async (value: never) => {})] as const      })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect(async (value: number) => {})] as const     })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[createEffect(async (value: string) => {})] as const     })
      sample({clock:numberClock , fn:(value: number) => value , target:[createEffect(async () => {})] as const                  })
      sample({clock:numberClock , fn:(value: number) => value , target:[createEffect<unknown, unknown>(async () => {})] as const})
      sample({clock:numberClock , fn:(value: number) => value , target:[createEffect(async (value: void) => {})] as const       })
      sample({clock:numberClock , fn:(value: number) => value , target:[createEffect(async (value: unknown) => {})] as const    })
      sample({clock:numberClock , fn:(value: number) => value , target:[createEffect(async (value: any) => {})] as const        })
      sample({clock:numberClock , fn:(value: number) => value , target:[createEffect(async (value: number) => {})] as const     })
      sample({clock:stringClock , fn:(value: string) => value , target:[createEffect(async () => {})] as const                  })
      sample({clock:stringClock , fn:(value: string) => value , target:[createEffect<unknown, unknown>(async () => {})] as const})
      sample({clock:stringClock , fn:(value: string) => value , target:[createEffect(async (value: void) => {})] as const       })
      sample({clock:stringClock , fn:(value: string) => value , target:[createEffect(async (value: unknown) => {})] as const    })
      sample({clock:stringClock , fn:(value: string) => value , target:[createEffect(async (value: any) => {})] as const        })
      sample({clock:stringClock , fn:(value: string) => value , target:[createEffect(async (value: string) => {})] as const     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('readonly, fn, async (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        fn: (value: void) => value,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        fn: (value: void) => value,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        fn: (value: void) => value,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        fn: (value: unknown) => value,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        fn: (value: unknown) => value,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        fn: (value: unknown) => value,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        fn: (value: any) => value,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        fn: (value: number) => value,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        fn: (value: number) => value,
        //@ts-expect-error
        target: [createEffect(async (value: string) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        fn: (value: string) => value,
        //@ts-expect-error
        target: [createEffect(async (value: never) => {})] as const,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        fn: (value: string) => value,
        //@ts-expect-error
        target: [createEffect(async (value: number) => {})] as const,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value?: void | undefined) => void; target: readonly [Unit<void>]; error: \\"fn result should extend target type\\"; }'.
      lack of expected error at test line 7 'fn: (value: void) => value,'
      lack of expected error at test line 9 'target: [createEffect(async (value: never) => {})] as const,'
      lack of expected error at test line 13 'clock: voidClock,'
      Type '(value: void) => void' is not assignable to type '(value?: void | undefined) => number'.
        Type 'void' is not assignable to type 'number'.
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 21 'clock: voidClock,'
      Type '(value: void) => void' is not assignable to type '(value?: void | undefined) => string'.
        Type 'void' is not assignable to type 'string'.
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value: unknown) => unknown; target: readonly [Unit<unknown>]; error: \\"fn result should extend target type\\"; }'.
      lack of expected error at test line 31 'fn: (value: unknown) => value,'
      lack of expected error at test line 33 'target: [createEffect(async (value: never) => {})] as const,'
      lack of expected error at test line 37 'clock: unknownClock,'
      Type '(value: unknown) => unknown' is not assignable to type '(value: unknown) => number'.
        Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 41 'target: [createEffect(async (value: number) => {})] as const,'
      lack of expected error at test line 45 'clock: unknownClock,'
      Type '(value: unknown) => unknown' is not assignable to type '(value: unknown) => string'.
        Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 49 'target: [createEffect(async (value: string) => {})] as const,'
      lack of expected error at test line 53 'clock: anyClock,'
      lack of expected error at test line 55 'fn: (value: any) => value,'
      lack of expected error at test line 57 'target: [createEffect(async (value: never) => {})] as const,'
      Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value: number) => number; target: readonly [Unit<number>]; error: \\"fn result should extend target type\\"; }'.
      lack of expected error at test line 63 'fn: (value: number) => value,'
      lack of expected error at test line 65 'target: [createEffect(async (value: never) => {})] as const,'
      lack of expected error at test line 69 'clock: numberClock,'
      Type '(value: number) => number' is not assignable to type '(value: number) => string'.
        Type 'number' is not assignable to type 'string'.
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value: string) => string; target: readonly [Unit<string>]; error: \\"fn result should extend target type\\"; }'.
      lack of expected error at test line 79 'fn: (value: string) => value,'
      lack of expected error at test line 81 'target: [createEffect(async (value: never) => {})] as const,'
      lack of expected error at test line 85 'clock: stringClock,'
      Type '(value: string) => string' is not assignable to type '(value: string) => number'.
        Type 'string' is not assignable to type 'number'.
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('extracted, clock, async', () => {
  test('extracted, clock, async (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , target:[asyncinferred]       })
      sample({clock:voidClock   , target:[asyncexplicitUnknown]})
      sample({clock:voidClock   , target:[asyncvoid]           })
      sample({clock:voidClock   , target:[asyncunknown]        })
      sample({clock:voidClock   , target:[asyncany]            })
      sample({clock:unknownClock, target:[asyncinferred]       })
      sample({clock:unknownClock, target:[asyncexplicitUnknown]})
      sample({clock:unknownClock, target:[asyncvoid]           })
      sample({clock:unknownClock, target:[asyncunknown]        })
      sample({clock:unknownClock, target:[asyncany]            })
      sample({clock:anyClock    , target:[asyncinferred]       })
      sample({clock:anyClock    , target:[asyncexplicitUnknown]})
      sample({clock:anyClock    , target:[asyncvoid]           })
      sample({clock:anyClock    , target:[asyncunknown]        })
      sample({clock:anyClock    , target:[asyncany]            })
      sample({clock:anyClock    , target:[asyncnumber]         })
      sample({clock:anyClock    , target:[asyncstring]         })
      sample({clock:neverClock  , target:[asyncinferred]       })
      sample({clock:neverClock  , target:[asyncexplicitUnknown]})
      sample({clock:neverClock  , target:[asyncvoid]           })
      sample({clock:neverClock  , target:[asyncunknown]        })
      sample({clock:neverClock  , target:[asyncany]            })
      sample({clock:neverClock  , target:[asyncnever]          })
      sample({clock:neverClock  , target:[asyncnumber]         })
      sample({clock:neverClock  , target:[asyncstring]         })
      sample({clock:numberClock , target:[asyncinferred]       })
      sample({clock:numberClock , target:[asyncexplicitUnknown]})
      sample({clock:numberClock , target:[asyncvoid]           })
      sample({clock:numberClock , target:[asyncunknown]        })
      sample({clock:numberClock , target:[asyncany]            })
      sample({clock:numberClock , target:[asyncnumber]         })
      sample({clock:stringClock , target:[asyncinferred]       })
      sample({clock:stringClock , target:[asyncexplicitUnknown]})
      sample({clock:stringClock , target:[asyncvoid]           })
      sample({clock:stringClock , target:[asyncunknown]        })
      sample({clock:stringClock , target:[asyncany]            })
      sample({clock:stringClock , target:[asyncstring]         })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('extracted, clock, async (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: [asyncnever],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: [asyncnumber],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: [asyncstring],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: [asyncnever],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: [asyncnumber],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: [asyncstring],
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        target: [asyncnever],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        target: [asyncnever],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        target: [asyncstring],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        target: [asyncnever],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        target: [asyncnumber],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 7 'target: [asyncnever],'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 25 'target: [asyncnever],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 31 'target: [asyncnumber],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 37 'target: [asyncstring],'
      Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'any' is not assignable to type 'never'.
      lack of expected error at test line 43 'target: [asyncnever],'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 49 'target: [asyncnever],'
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 61 'target: [asyncnever],'
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('extracted, source, async', () => {
  test('extracted, source, async (should pass)', () => {
    //prettier-ignore
    {
      sample({source:voidClock   , target:[asyncinferred]       })
      sample({source:voidClock   , target:[asyncexplicitUnknown]})
      sample({source:voidClock   , target:[asyncvoid]           })
      sample({source:voidClock   , target:[asyncunknown]        })
      sample({source:voidClock   , target:[asyncany]            })
      sample({source:unknownClock, target:[asyncinferred]       })
      sample({source:unknownClock, target:[asyncexplicitUnknown]})
      sample({source:unknownClock, target:[asyncvoid]           })
      sample({source:unknownClock, target:[asyncunknown]        })
      sample({source:unknownClock, target:[asyncany]            })
      sample({source:anyClock    , target:[asyncinferred]       })
      sample({source:anyClock    , target:[asyncexplicitUnknown]})
      sample({source:anyClock    , target:[asyncvoid]           })
      sample({source:anyClock    , target:[asyncunknown]        })
      sample({source:anyClock    , target:[asyncany]            })
      sample({source:anyClock    , target:[asyncnumber]         })
      sample({source:anyClock    , target:[asyncstring]         })
      sample({source:neverClock  , target:[asyncinferred]       })
      sample({source:neverClock  , target:[asyncexplicitUnknown]})
      sample({source:neverClock  , target:[asyncvoid]           })
      sample({source:neverClock  , target:[asyncunknown]        })
      sample({source:neverClock  , target:[asyncany]            })
      sample({source:neverClock  , target:[asyncnever]          })
      sample({source:neverClock  , target:[asyncnumber]         })
      sample({source:neverClock  , target:[asyncstring]         })
      sample({source:numberClock , target:[asyncinferred]       })
      sample({source:numberClock , target:[asyncexplicitUnknown]})
      sample({source:numberClock , target:[asyncvoid]           })
      sample({source:numberClock , target:[asyncunknown]        })
      sample({source:numberClock , target:[asyncany]            })
      sample({source:numberClock , target:[asyncnumber]         })
      sample({source:stringClock , target:[asyncinferred]       })
      sample({source:stringClock , target:[asyncexplicitUnknown]})
      sample({source:stringClock , target:[asyncvoid]           })
      sample({source:stringClock , target:[asyncunknown]        })
      sample({source:stringClock , target:[asyncany]            })
      sample({source:stringClock , target:[asyncstring]         })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('extracted, source, async (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [asyncnever],
      })
      sample({
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [asyncnumber],
      })
      sample({
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [asyncstring],
      })
      sample({
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [asyncnever],
      })
      sample({
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [asyncnumber],
      })
      sample({
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [asyncstring],
      })
      sample({
        //@ts-expect-error
        source: anyClock,
        //@ts-expect-error
        target: [asyncnever],
      })
      sample({
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: [asyncnever],
      })
      sample({
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: [asyncstring],
      })
      sample({
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: [asyncnever],
      })
      sample({
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: [asyncnumber],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 7 'target: [asyncnever],'
      lack of expected error at test line 11 'source: voidClock,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 17 'source: voidClock,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 25 'target: [asyncnever],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 31 'target: [asyncnumber],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 37 'target: [asyncstring],'
      lack of expected error at test line 41 'source: anyClock,'
      lack of expected error at test line 43 'target: [asyncnever],'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 49 'target: [asyncnever],'
      lack of expected error at test line 53 'source: numberClock,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 61 'target: [asyncnever],'
      lack of expected error at test line 65 'source: stringClock,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('extracted, both, async', () => {
  test('extracted, both, async (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , source:voidClock   , target:[asyncinferred]       })
      sample({clock:voidClock   , source:voidClock   , target:[asyncexplicitUnknown]})
      sample({clock:voidClock   , source:voidClock   , target:[asyncvoid]           })
      sample({clock:voidClock   , source:voidClock   , target:[asyncunknown]        })
      sample({clock:voidClock   , source:voidClock   , target:[asyncany]            })
      sample({clock:unknownClock, source:unknownClock, target:[asyncinferred]       })
      sample({clock:unknownClock, source:unknownClock, target:[asyncexplicitUnknown]})
      sample({clock:unknownClock, source:unknownClock, target:[asyncvoid]           })
      sample({clock:unknownClock, source:unknownClock, target:[asyncunknown]        })
      sample({clock:unknownClock, source:unknownClock, target:[asyncany]            })
      sample({clock:anyClock    , source:anyClock    , target:[asyncinferred]       })
      sample({clock:anyClock    , source:anyClock    , target:[asyncexplicitUnknown]})
      sample({clock:anyClock    , source:anyClock    , target:[asyncvoid]           })
      sample({clock:anyClock    , source:anyClock    , target:[asyncunknown]        })
      sample({clock:anyClock    , source:anyClock    , target:[asyncany]            })
      sample({clock:anyClock    , source:anyClock    , target:[asyncnumber]         })
      sample({clock:anyClock    , source:anyClock    , target:[asyncstring]         })
      sample({clock:neverClock  , source:neverClock  , target:[asyncinferred]       })
      sample({clock:neverClock  , source:neverClock  , target:[asyncexplicitUnknown]})
      sample({clock:neverClock  , source:neverClock  , target:[asyncvoid]           })
      sample({clock:neverClock  , source:neverClock  , target:[asyncunknown]        })
      sample({clock:neverClock  , source:neverClock  , target:[asyncany]            })
      sample({clock:neverClock  , source:neverClock  , target:[asyncnever]          })
      sample({clock:neverClock  , source:neverClock  , target:[asyncnumber]         })
      sample({clock:neverClock  , source:neverClock  , target:[asyncstring]         })
      sample({clock:numberClock , source:numberClock , target:[asyncinferred]       })
      sample({clock:numberClock , source:numberClock , target:[asyncexplicitUnknown]})
      sample({clock:numberClock , source:numberClock , target:[asyncvoid]           })
      sample({clock:numberClock , source:numberClock , target:[asyncunknown]        })
      sample({clock:numberClock , source:numberClock , target:[asyncany]            })
      sample({clock:numberClock , source:numberClock , target:[asyncnumber]         })
      sample({clock:stringClock , source:stringClock , target:[asyncinferred]       })
      sample({clock:stringClock , source:stringClock , target:[asyncexplicitUnknown]})
      sample({clock:stringClock , source:stringClock , target:[asyncvoid]           })
      sample({clock:stringClock , source:stringClock , target:[asyncunknown]        })
      sample({clock:stringClock , source:stringClock , target:[asyncany]            })
      sample({clock:stringClock , source:stringClock , target:[asyncstring]         })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('extracted, both, async (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [asyncnever],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [asyncnumber],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: [asyncstring],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [asyncnever],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [asyncnumber],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: [asyncstring],
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        source: anyClock,
        //@ts-expect-error
        target: [asyncnever],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: [asyncnever],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: [asyncstring],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: [asyncnever],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: [asyncnumber],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      lack of expected error at test line 5 'clock: voidClock,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 9 'target: [asyncnever],'
      lack of expected error at test line 13 'clock: voidClock,'
      lack of expected error at test line 15 'source: voidClock,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 21 'clock: voidClock,'
      lack of expected error at test line 23 'source: voidClock,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      lack of expected error at test line 29 'clock: unknownClock,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 33 'target: [asyncnever],'
      lack of expected error at test line 37 'clock: unknownClock,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 41 'target: [asyncnumber],'
      lack of expected error at test line 45 'clock: unknownClock,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 49 'target: [asyncstring],'
      lack of expected error at test line 53 'clock: anyClock,'
      lack of expected error at test line 55 'source: anyClock,'
      lack of expected error at test line 57 'target: [asyncnever],'
      lack of expected error at test line 61 'clock: numberClock,'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 65 'target: [asyncnever],'
      lack of expected error at test line 69 'clock: numberClock,'
      lack of expected error at test line 71 'source: numberClock,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 77 'clock: stringClock,'
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 81 'target: [asyncnever],'
      lack of expected error at test line 85 'clock: stringClock,'
      lack of expected error at test line 87 'source: stringClock,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('extracted, Boolean, async', () => {
  test('extracted, Boolean, async (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , filter:Boolean, target:[asyncinferred]       })
      sample({clock:voidClock   , filter:Boolean, target:[asyncexplicitUnknown]})
      sample({clock:voidClock   , filter:Boolean, target:[asyncvoid]           })
      sample({clock:voidClock   , filter:Boolean, target:[asyncunknown]        })
      sample({clock:voidClock   , filter:Boolean, target:[asyncany]            })
      sample({clock:unknownClock, filter:Boolean, target:[asyncinferred]       })
      sample({clock:unknownClock, filter:Boolean, target:[asyncexplicitUnknown]})
      sample({clock:unknownClock, filter:Boolean, target:[asyncvoid]           })
      sample({clock:unknownClock, filter:Boolean, target:[asyncunknown]        })
      sample({clock:unknownClock, filter:Boolean, target:[asyncany]            })
      sample({clock:anyClock    , filter:Boolean, target:[asyncinferred]       })
      sample({clock:anyClock    , filter:Boolean, target:[asyncexplicitUnknown]})
      sample({clock:anyClock    , filter:Boolean, target:[asyncvoid]           })
      sample({clock:anyClock    , filter:Boolean, target:[asyncunknown]        })
      sample({clock:anyClock    , filter:Boolean, target:[asyncany]            })
      sample({clock:anyClock    , filter:Boolean, target:[asyncnumber]         })
      sample({clock:anyClock    , filter:Boolean, target:[asyncstring]         })
      sample({clock:neverClock  , filter:Boolean, target:[asyncinferred]       })
      sample({clock:neverClock  , filter:Boolean, target:[asyncexplicitUnknown]})
      sample({clock:neverClock  , filter:Boolean, target:[asyncvoid]           })
      sample({clock:neverClock  , filter:Boolean, target:[asyncunknown]        })
      sample({clock:neverClock  , filter:Boolean, target:[asyncany]            })
      sample({clock:neverClock  , filter:Boolean, target:[asyncnever]          })
      sample({clock:neverClock  , filter:Boolean, target:[asyncnumber]         })
      sample({clock:neverClock  , filter:Boolean, target:[asyncstring]         })
      sample({clock:numberClock , filter:Boolean, target:[asyncinferred]       })
      sample({clock:numberClock , filter:Boolean, target:[asyncexplicitUnknown]})
      sample({clock:numberClock , filter:Boolean, target:[asyncvoid]           })
      sample({clock:numberClock , filter:Boolean, target:[asyncunknown]        })
      sample({clock:numberClock , filter:Boolean, target:[asyncany]            })
      sample({clock:numberClock , filter:Boolean, target:[asyncnumber]         })
      sample({clock:stringClock , filter:Boolean, target:[asyncinferred]       })
      sample({clock:stringClock , filter:Boolean, target:[asyncexplicitUnknown]})
      sample({clock:stringClock , filter:Boolean, target:[asyncvoid]           })
      sample({clock:stringClock , filter:Boolean, target:[asyncunknown]        })
      sample({clock:stringClock , filter:Boolean, target:[asyncany]            })
      sample({clock:stringClock , filter:Boolean, target:[asyncstring]         })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('extracted, Boolean, async (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [asyncnever],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [asyncnumber],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [asyncstring],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [asyncnever],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [asyncnumber],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [asyncstring],
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [asyncnever],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [asyncnever],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [asyncstring],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [asyncnever],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: [asyncnumber],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 7 'filter: Boolean,'
      lack of expected error at test line 9 'target: [asyncnever],'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      lack of expected error at test line 15 'filter: Boolean,'
      Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      lack of expected error at test line 23 'filter: Boolean,'
      Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 31 'filter: Boolean,'
      lack of expected error at test line 33 'target: [asyncnever],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 39 'filter: Boolean,'
      lack of expected error at test line 41 'target: [asyncnumber],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 47 'filter: Boolean,'
      lack of expected error at test line 49 'target: [asyncstring],'
      Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'any' is not assignable to type 'never'.
      lack of expected error at test line 55 'filter: Boolean,'
      lack of expected error at test line 57 'target: [asyncnever],'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 63 'filter: Boolean,'
      lack of expected error at test line 65 'target: [asyncnever],'
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      lack of expected error at test line 71 'filter: Boolean,'
      Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 79 'filter: Boolean,'
      lack of expected error at test line 81 'target: [asyncnever],'
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 87 'filter: Boolean,'
      Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('extracted, filter, async', () => {
  test('extracted, filter, async (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , filter:() => true, target:[asyncinferred]       })
      sample({clock:voidClock   , filter:() => true, target:[asyncexplicitUnknown]})
      sample({clock:voidClock   , filter:() => true, target:[asyncvoid]           })
      sample({clock:voidClock   , filter:() => true, target:[asyncunknown]        })
      sample({clock:voidClock   , filter:() => true, target:[asyncany]            })
      sample({clock:unknownClock, filter:() => true, target:[asyncinferred]       })
      sample({clock:unknownClock, filter:() => true, target:[asyncexplicitUnknown]})
      sample({clock:unknownClock, filter:() => true, target:[asyncvoid]           })
      sample({clock:unknownClock, filter:() => true, target:[asyncunknown]        })
      sample({clock:unknownClock, filter:() => true, target:[asyncany]            })
      sample({clock:anyClock    , filter:() => true, target:[asyncinferred]       })
      sample({clock:anyClock    , filter:() => true, target:[asyncexplicitUnknown]})
      sample({clock:anyClock    , filter:() => true, target:[asyncvoid]           })
      sample({clock:anyClock    , filter:() => true, target:[asyncunknown]        })
      sample({clock:anyClock    , filter:() => true, target:[asyncany]            })
      sample({clock:anyClock    , filter:() => true, target:[asyncnumber]         })
      sample({clock:anyClock    , filter:() => true, target:[asyncstring]         })
      sample({clock:neverClock  , filter:() => true, target:[asyncinferred]       })
      sample({clock:neverClock  , filter:() => true, target:[asyncexplicitUnknown]})
      sample({clock:neverClock  , filter:() => true, target:[asyncvoid]           })
      sample({clock:neverClock  , filter:() => true, target:[asyncunknown]        })
      sample({clock:neverClock  , filter:() => true, target:[asyncany]            })
      sample({clock:neverClock  , filter:() => true, target:[asyncnever]          })
      sample({clock:neverClock  , filter:() => true, target:[asyncnumber]         })
      sample({clock:neverClock  , filter:() => true, target:[asyncstring]         })
      sample({clock:numberClock , filter:() => true, target:[asyncinferred]       })
      sample({clock:numberClock , filter:() => true, target:[asyncexplicitUnknown]})
      sample({clock:numberClock , filter:() => true, target:[asyncvoid]           })
      sample({clock:numberClock , filter:() => true, target:[asyncunknown]        })
      sample({clock:numberClock , filter:() => true, target:[asyncany]            })
      sample({clock:numberClock , filter:() => true, target:[asyncnumber]         })
      sample({clock:stringClock , filter:() => true, target:[asyncinferred]       })
      sample({clock:stringClock , filter:() => true, target:[asyncexplicitUnknown]})
      sample({clock:stringClock , filter:() => true, target:[asyncvoid]           })
      sample({clock:stringClock , filter:() => true, target:[asyncunknown]        })
      sample({clock:stringClock , filter:() => true, target:[asyncany]            })
      sample({clock:stringClock , filter:() => true, target:[asyncstring]         })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('extracted, filter, async (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [asyncnever],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [asyncnumber],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [asyncstring],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [asyncnever],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [asyncnumber],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [asyncstring],
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [asyncnever],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [asyncnever],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [asyncstring],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [asyncnever],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: [asyncnumber],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 7 'filter: () => true,'
      lack of expected error at test line 9 'target: [asyncnever],'
      lack of expected error at test line 13 'clock: voidClock,'
      lack of expected error at test line 15 'filter: () => true,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 21 'clock: voidClock,'
      lack of expected error at test line 23 'filter: () => true,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 31 'filter: () => true,'
      lack of expected error at test line 33 'target: [asyncnever],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 39 'filter: () => true,'
      lack of expected error at test line 41 'target: [asyncnumber],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 47 'filter: () => true,'
      lack of expected error at test line 49 'target: [asyncstring],'
      lack of expected error at test line 53 'clock: anyClock,'
      lack of expected error at test line 55 'filter: () => true,'
      lack of expected error at test line 57 'target: [asyncnever],'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 63 'filter: () => true,'
      lack of expected error at test line 65 'target: [asyncnever],'
      lack of expected error at test line 69 'clock: numberClock,'
      lack of expected error at test line 71 'filter: () => true,'
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 79 'filter: () => true,'
      lack of expected error at test line 81 'target: [asyncnever],'
      lack of expected error at test line 85 'clock: stringClock,'
      lack of expected error at test line 87 'filter: () => true,'
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('extracted, fn, async', () => {
  test('extracted, fn, async (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , fn:(value: void) => value   , target:[asyncinferred]       })
      sample({clock:voidClock   , fn:(value: void) => value   , target:[asyncexplicitUnknown]})
      sample({clock:voidClock   , fn:(value: void) => value   , target:[asyncvoid]           })
      sample({clock:voidClock   , fn:(value: void) => value   , target:[asyncunknown]        })
      sample({clock:voidClock   , fn:(value: void) => value   , target:[asyncany]            })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:[asyncinferred]       })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:[asyncexplicitUnknown]})
      sample({clock:unknownClock, fn:(value: unknown) => value, target:[asyncvoid]           })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:[asyncunknown]        })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:[asyncany]            })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[asyncinferred]       })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[asyncexplicitUnknown]})
      sample({clock:anyClock    , fn:(value: any) => value    , target:[asyncvoid]           })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[asyncunknown]        })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[asyncany]            })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[asyncnumber]         })
      sample({clock:anyClock    , fn:(value: any) => value    , target:[asyncstring]         })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[asyncinferred]       })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[asyncexplicitUnknown]})
      sample({clock:neverClock  , fn:(value: never) => value  , target:[asyncvoid]           })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[asyncunknown]        })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[asyncany]            })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[asyncnever]          })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[asyncnumber]         })
      sample({clock:neverClock  , fn:(value: never) => value  , target:[asyncstring]         })
      sample({clock:numberClock , fn:(value: number) => value , target:[asyncinferred]       })
      sample({clock:numberClock , fn:(value: number) => value , target:[asyncexplicitUnknown]})
      sample({clock:numberClock , fn:(value: number) => value , target:[asyncvoid]           })
      sample({clock:numberClock , fn:(value: number) => value , target:[asyncunknown]        })
      sample({clock:numberClock , fn:(value: number) => value , target:[asyncany]            })
      sample({clock:numberClock , fn:(value: number) => value , target:[asyncnumber]         })
      sample({clock:stringClock , fn:(value: string) => value , target:[asyncinferred]       })
      sample({clock:stringClock , fn:(value: string) => value , target:[asyncexplicitUnknown]})
      sample({clock:stringClock , fn:(value: string) => value , target:[asyncvoid]           })
      sample({clock:stringClock , fn:(value: string) => value , target:[asyncunknown]        })
      sample({clock:stringClock , fn:(value: string) => value , target:[asyncany]            })
      sample({clock:stringClock , fn:(value: string) => value , target:[asyncstring]         })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('extracted, fn, async (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        fn: (value: void) => value,
        //@ts-expect-error
        target: [asyncnever],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        fn: (value: void) => value,
        //@ts-expect-error
        target: [asyncnumber],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        fn: (value: void) => value,
        //@ts-expect-error
        target: [asyncstring],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        fn: (value: unknown) => value,
        //@ts-expect-error
        target: [asyncnever],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        fn: (value: unknown) => value,
        //@ts-expect-error
        target: [asyncnumber],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        fn: (value: unknown) => value,
        //@ts-expect-error
        target: [asyncstring],
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        fn: (value: any) => value,
        //@ts-expect-error
        target: [asyncnever],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        fn: (value: number) => value,
        //@ts-expect-error
        target: [asyncnever],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        fn: (value: number) => value,
        //@ts-expect-error
        target: [asyncstring],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        fn: (value: string) => value,
        //@ts-expect-error
        target: [asyncnever],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        fn: (value: string) => value,
        //@ts-expect-error
        target: [asyncnumber],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value?: void | undefined) => void; target: readonly [Unit<void>]; error: \\"fn result should extend target type\\"; }'.
      lack of expected error at test line 7 'fn: (value: void) => value,'
      lack of expected error at test line 9 'target: [asyncnever],'
      lack of expected error at test line 13 'clock: voidClock,'
      Type '(value: void) => void' is not assignable to type '(value?: void | undefined) => number'.
        Type 'void' is not assignable to type 'number'.
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 21 'clock: voidClock,'
      Type '(value: void) => void' is not assignable to type '(value?: void | undefined) => string'.
        Type 'void' is not assignable to type 'string'.
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value: unknown) => unknown; target: readonly [Unit<unknown>]; error: \\"fn result should extend target type\\"; }'.
      lack of expected error at test line 31 'fn: (value: unknown) => value,'
      lack of expected error at test line 33 'target: [asyncnever],'
      lack of expected error at test line 37 'clock: unknownClock,'
      Type '(value: unknown) => unknown' is not assignable to type '(value: unknown) => number'.
        Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 41 'target: [asyncnumber],'
      lack of expected error at test line 45 'clock: unknownClock,'
      Type '(value: unknown) => unknown' is not assignable to type '(value: unknown) => string'.
        Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 49 'target: [asyncstring],'
      lack of expected error at test line 53 'clock: anyClock,'
      lack of expected error at test line 55 'fn: (value: any) => value,'
      lack of expected error at test line 57 'target: [asyncnever],'
      Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value: number) => number; target: readonly [Unit<number>]; error: \\"fn result should extend target type\\"; }'.
      lack of expected error at test line 63 'fn: (value: number) => value,'
      lack of expected error at test line 65 'target: [asyncnever],'
      lack of expected error at test line 69 'clock: numberClock,'
      Type '(value: number) => number' is not assignable to type '(value: number) => string'.
        Type 'number' is not assignable to type 'string'.
      Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value: string) => string; target: readonly [Unit<string>]; error: \\"fn result should extend target type\\"; }'.
      lack of expected error at test line 79 'fn: (value: string) => value,'
      lack of expected error at test line 81 'target: [asyncnever],'
      lack of expected error at test line 85 'clock: stringClock,'
      Type '(value: string) => string' is not assignable to type '(value: string) => number'.
        Type 'string' is not assignable to type 'number'.
      Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('mutable, clock, async', () => {
  test('mutable, clock, async (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , target:asyncinferredMutable       })
      sample({clock:voidClock   , target:asyncexplicitUnknownMutable})
      sample({clock:voidClock   , target:asyncvoidMutable           })
      sample({clock:voidClock   , target:asyncunknownMutable        })
      sample({clock:voidClock   , target:asyncanyMutable            })
      sample({clock:unknownClock, target:asyncinferredMutable       })
      sample({clock:unknownClock, target:asyncexplicitUnknownMutable})
      sample({clock:unknownClock, target:asyncvoidMutable           })
      sample({clock:unknownClock, target:asyncunknownMutable        })
      sample({clock:unknownClock, target:asyncanyMutable            })
      sample({clock:anyClock    , target:asyncinferredMutable       })
      sample({clock:anyClock    , target:asyncexplicitUnknownMutable})
      sample({clock:anyClock    , target:asyncvoidMutable           })
      sample({clock:anyClock    , target:asyncunknownMutable        })
      sample({clock:anyClock    , target:asyncanyMutable            })
      sample({clock:anyClock    , target:asyncnumberMutable         })
      sample({clock:anyClock    , target:asyncstringMutable         })
      sample({clock:neverClock  , target:asyncinferredMutable       })
      sample({clock:neverClock  , target:asyncexplicitUnknownMutable})
      sample({clock:neverClock  , target:asyncvoidMutable           })
      sample({clock:neverClock  , target:asyncunknownMutable        })
      sample({clock:neverClock  , target:asyncanyMutable            })
      sample({clock:neverClock  , target:asyncneverMutable          })
      sample({clock:neverClock  , target:asyncnumberMutable         })
      sample({clock:neverClock  , target:asyncstringMutable         })
      sample({clock:numberClock , target:asyncinferredMutable       })
      sample({clock:numberClock , target:asyncexplicitUnknownMutable})
      sample({clock:numberClock , target:asyncvoidMutable           })
      sample({clock:numberClock , target:asyncunknownMutable        })
      sample({clock:numberClock , target:asyncanyMutable            })
      sample({clock:numberClock , target:asyncnumberMutable         })
      sample({clock:stringClock , target:asyncinferredMutable       })
      sample({clock:stringClock , target:asyncexplicitUnknownMutable})
      sample({clock:stringClock , target:asyncvoidMutable           })
      sample({clock:stringClock , target:asyncunknownMutable        })
      sample({clock:stringClock , target:asyncanyMutable            })
      sample({clock:stringClock , target:asyncstringMutable         })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('mutable, clock, async (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: asyncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: asyncnumberMutable,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: asyncstringMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: asyncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: asyncnumberMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: asyncstringMutable,
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        target: asyncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        target: asyncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        target: asyncstringMutable,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        target: asyncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        target: asyncnumberMutable,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      lack of expected error at test line 5 'clock: voidClock,'
      lack of expected error at test line 7 'target: asyncneverMutable,'
      lack of expected error at test line 11 'clock: voidClock,'
      Type 'Effect<number, void, Error>[]' is not assignable to type 'readonly UnitTargetable<void>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<void>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 17 'clock: voidClock,'
      Type 'Effect<string, void, Error>[]' is not assignable to type 'readonly UnitTargetable<void>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<void>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'void'.
      lack of expected error at test line 23 'clock: unknownClock,'
      lack of expected error at test line 25 'target: asyncneverMutable,'
      lack of expected error at test line 29 'clock: unknownClock,'
      lack of expected error at test line 31 'target: asyncnumberMutable,'
      lack of expected error at test line 35 'clock: unknownClock,'
      lack of expected error at test line 37 'target: asyncstringMutable,'
      lack of expected error at test line 41 'clock: anyClock,'
      lack of expected error at test line 43 'target: asyncneverMutable,'
      lack of expected error at test line 47 'clock: numberClock,'
      lack of expected error at test line 49 'target: asyncneverMutable,'
      lack of expected error at test line 53 'clock: numberClock,'
      Type 'Effect<string, void, Error>[]' is not assignable to type 'readonly UnitTargetable<number>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<number>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 59 'clock: stringClock,'
      lack of expected error at test line 61 'target: asyncneverMutable,'
      lack of expected error at test line 65 'clock: stringClock,'
      Type 'Effect<number, void, Error>[]' is not assignable to type 'readonly UnitTargetable<string>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<string>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('mutable, source, async', () => {
  test('mutable, source, async (should pass)', () => {
    //prettier-ignore
    {
      sample({source:voidClock   , target:asyncinferredMutable       })
      sample({source:voidClock   , target:asyncexplicitUnknownMutable})
      sample({source:voidClock   , target:asyncvoidMutable           })
      sample({source:voidClock   , target:asyncunknownMutable        })
      sample({source:voidClock   , target:asyncanyMutable            })
      sample({source:unknownClock, target:asyncinferredMutable       })
      sample({source:unknownClock, target:asyncexplicitUnknownMutable})
      sample({source:unknownClock, target:asyncvoidMutable           })
      sample({source:unknownClock, target:asyncunknownMutable        })
      sample({source:unknownClock, target:asyncanyMutable            })
      sample({source:anyClock    , target:asyncinferredMutable       })
      sample({source:anyClock    , target:asyncexplicitUnknownMutable})
      sample({source:anyClock    , target:asyncvoidMutable           })
      sample({source:anyClock    , target:asyncunknownMutable        })
      sample({source:anyClock    , target:asyncanyMutable            })
      sample({source:anyClock    , target:asyncnumberMutable         })
      sample({source:anyClock    , target:asyncstringMutable         })
      sample({source:neverClock  , target:asyncinferredMutable       })
      sample({source:neverClock  , target:asyncexplicitUnknownMutable})
      sample({source:neverClock  , target:asyncvoidMutable           })
      sample({source:neverClock  , target:asyncunknownMutable        })
      sample({source:neverClock  , target:asyncanyMutable            })
      sample({source:neverClock  , target:asyncneverMutable          })
      sample({source:neverClock  , target:asyncnumberMutable         })
      sample({source:neverClock  , target:asyncstringMutable         })
      sample({source:numberClock , target:asyncinferredMutable       })
      sample({source:numberClock , target:asyncexplicitUnknownMutable})
      sample({source:numberClock , target:asyncvoidMutable           })
      sample({source:numberClock , target:asyncunknownMutable        })
      sample({source:numberClock , target:asyncanyMutable            })
      sample({source:numberClock , target:asyncnumberMutable         })
      sample({source:stringClock , target:asyncinferredMutable       })
      sample({source:stringClock , target:asyncexplicitUnknownMutable})
      sample({source:stringClock , target:asyncvoidMutable           })
      sample({source:stringClock , target:asyncunknownMutable        })
      sample({source:stringClock , target:asyncanyMutable            })
      sample({source:stringClock , target:asyncstringMutable         })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('mutable, source, async (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: asyncneverMutable,
      })
      sample({
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: asyncnumberMutable,
      })
      sample({
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: asyncstringMutable,
      })
      sample({
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: asyncneverMutable,
      })
      sample({
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: asyncnumberMutable,
      })
      sample({
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: asyncstringMutable,
      })
      sample({
        //@ts-expect-error
        source: anyClock,
        //@ts-expect-error
        target: asyncneverMutable,
      })
      sample({
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: asyncneverMutable,
      })
      sample({
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: asyncstringMutable,
      })
      sample({
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: asyncneverMutable,
      })
      sample({
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: asyncnumberMutable,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 7 'target: asyncneverMutable,'
      lack of expected error at test line 11 'source: voidClock,'
      Type 'Effect<number, void, Error>[]' is not assignable to type 'Unit<void>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 17 'source: voidClock,'
      Type 'Effect<string, void, Error>[]' is not assignable to type 'Unit<void>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 25 'target: asyncneverMutable,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 31 'target: asyncnumberMutable,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 37 'target: asyncstringMutable,'
      lack of expected error at test line 41 'source: anyClock,'
      lack of expected error at test line 43 'target: asyncneverMutable,'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 49 'target: asyncneverMutable,'
      lack of expected error at test line 53 'source: numberClock,'
      Type 'Effect<string, void, Error>[]' is not assignable to type 'Unit<number>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 61 'target: asyncneverMutable,'
      lack of expected error at test line 65 'source: stringClock,'
      Type 'Effect<number, void, Error>[]' is not assignable to type 'Unit<string>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('mutable, both, async', () => {
  test('mutable, both, async (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , source:voidClock   , target:asyncinferredMutable       })
      sample({clock:voidClock   , source:voidClock   , target:asyncexplicitUnknownMutable})
      sample({clock:voidClock   , source:voidClock   , target:asyncvoidMutable           })
      sample({clock:voidClock   , source:voidClock   , target:asyncunknownMutable        })
      sample({clock:voidClock   , source:voidClock   , target:asyncanyMutable            })
      sample({clock:unknownClock, source:unknownClock, target:asyncinferredMutable       })
      sample({clock:unknownClock, source:unknownClock, target:asyncexplicitUnknownMutable})
      sample({clock:unknownClock, source:unknownClock, target:asyncvoidMutable           })
      sample({clock:unknownClock, source:unknownClock, target:asyncunknownMutable        })
      sample({clock:unknownClock, source:unknownClock, target:asyncanyMutable            })
      sample({clock:anyClock    , source:anyClock    , target:asyncinferredMutable       })
      sample({clock:anyClock    , source:anyClock    , target:asyncexplicitUnknownMutable})
      sample({clock:anyClock    , source:anyClock    , target:asyncvoidMutable           })
      sample({clock:anyClock    , source:anyClock    , target:asyncunknownMutable        })
      sample({clock:anyClock    , source:anyClock    , target:asyncanyMutable            })
      sample({clock:anyClock    , source:anyClock    , target:asyncnumberMutable         })
      sample({clock:anyClock    , source:anyClock    , target:asyncstringMutable         })
      sample({clock:neverClock  , source:neverClock  , target:asyncinferredMutable       })
      sample({clock:neverClock  , source:neverClock  , target:asyncexplicitUnknownMutable})
      sample({clock:neverClock  , source:neverClock  , target:asyncvoidMutable           })
      sample({clock:neverClock  , source:neverClock  , target:asyncunknownMutable        })
      sample({clock:neverClock  , source:neverClock  , target:asyncanyMutable            })
      sample({clock:neverClock  , source:neverClock  , target:asyncneverMutable          })
      sample({clock:neverClock  , source:neverClock  , target:asyncnumberMutable         })
      sample({clock:neverClock  , source:neverClock  , target:asyncstringMutable         })
      sample({clock:numberClock , source:numberClock , target:asyncinferredMutable       })
      sample({clock:numberClock , source:numberClock , target:asyncexplicitUnknownMutable})
      sample({clock:numberClock , source:numberClock , target:asyncvoidMutable           })
      sample({clock:numberClock , source:numberClock , target:asyncunknownMutable        })
      sample({clock:numberClock , source:numberClock , target:asyncanyMutable            })
      sample({clock:numberClock , source:numberClock , target:asyncnumberMutable         })
      sample({clock:stringClock , source:stringClock , target:asyncinferredMutable       })
      sample({clock:stringClock , source:stringClock , target:asyncexplicitUnknownMutable})
      sample({clock:stringClock , source:stringClock , target:asyncvoidMutable           })
      sample({clock:stringClock , source:stringClock , target:asyncunknownMutable        })
      sample({clock:stringClock , source:stringClock , target:asyncanyMutable            })
      sample({clock:stringClock , source:stringClock , target:asyncstringMutable         })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('mutable, both, async (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: asyncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: asyncnumberMutable,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: asyncstringMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: asyncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: asyncnumberMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: asyncstringMutable,
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        source: anyClock,
        //@ts-expect-error
        target: asyncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: asyncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: asyncstringMutable,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: asyncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: asyncnumberMutable,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      lack of expected error at test line 5 'clock: voidClock,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 9 'target: asyncneverMutable,'
      lack of expected error at test line 13 'clock: voidClock,'
      lack of expected error at test line 15 'source: voidClock,'
      Type 'Effect<number, void, Error>[]' is not assignable to type 'Unit<void>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 21 'clock: voidClock,'
      lack of expected error at test line 23 'source: voidClock,'
      Type 'Effect<string, void, Error>[]' is not assignable to type 'Unit<void>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'void'.
      lack of expected error at test line 29 'clock: unknownClock,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 33 'target: asyncneverMutable,'
      lack of expected error at test line 37 'clock: unknownClock,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 41 'target: asyncnumberMutable,'
      lack of expected error at test line 45 'clock: unknownClock,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 49 'target: asyncstringMutable,'
      lack of expected error at test line 53 'clock: anyClock,'
      lack of expected error at test line 55 'source: anyClock,'
      lack of expected error at test line 57 'target: asyncneverMutable,'
      lack of expected error at test line 61 'clock: numberClock,'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 65 'target: asyncneverMutable,'
      lack of expected error at test line 69 'clock: numberClock,'
      lack of expected error at test line 71 'source: numberClock,'
      Type 'Effect<string, void, Error>[]' is not assignable to type 'Unit<number>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 77 'clock: stringClock,'
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 81 'target: asyncneverMutable,'
      lack of expected error at test line 85 'clock: stringClock,'
      lack of expected error at test line 87 'source: stringClock,'
      Type 'Effect<number, void, Error>[]' is not assignable to type 'Unit<string>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('mutable, Boolean, async', () => {
  test('mutable, Boolean, async (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , filter:Boolean, target:asyncinferredMutable       })
      sample({clock:voidClock   , filter:Boolean, target:asyncexplicitUnknownMutable})
      sample({clock:voidClock   , filter:Boolean, target:asyncvoidMutable           })
      sample({clock:voidClock   , filter:Boolean, target:asyncunknownMutable        })
      sample({clock:voidClock   , filter:Boolean, target:asyncanyMutable            })
      sample({clock:unknownClock, filter:Boolean, target:asyncinferredMutable       })
      sample({clock:unknownClock, filter:Boolean, target:asyncexplicitUnknownMutable})
      sample({clock:unknownClock, filter:Boolean, target:asyncvoidMutable           })
      sample({clock:unknownClock, filter:Boolean, target:asyncunknownMutable        })
      sample({clock:unknownClock, filter:Boolean, target:asyncanyMutable            })
      sample({clock:anyClock    , filter:Boolean, target:asyncinferredMutable       })
      sample({clock:anyClock    , filter:Boolean, target:asyncexplicitUnknownMutable})
      sample({clock:anyClock    , filter:Boolean, target:asyncvoidMutable           })
      sample({clock:anyClock    , filter:Boolean, target:asyncunknownMutable        })
      sample({clock:anyClock    , filter:Boolean, target:asyncanyMutable            })
      sample({clock:anyClock    , filter:Boolean, target:asyncnumberMutable         })
      sample({clock:anyClock    , filter:Boolean, target:asyncstringMutable         })
      sample({clock:neverClock  , filter:Boolean, target:asyncinferredMutable       })
      sample({clock:neverClock  , filter:Boolean, target:asyncexplicitUnknownMutable})
      sample({clock:neverClock  , filter:Boolean, target:asyncvoidMutable           })
      sample({clock:neverClock  , filter:Boolean, target:asyncunknownMutable        })
      sample({clock:neverClock  , filter:Boolean, target:asyncanyMutable            })
      sample({clock:neverClock  , filter:Boolean, target:asyncneverMutable          })
      sample({clock:neverClock  , filter:Boolean, target:asyncnumberMutable         })
      sample({clock:neverClock  , filter:Boolean, target:asyncstringMutable         })
      sample({clock:numberClock , filter:Boolean, target:asyncinferredMutable       })
      sample({clock:numberClock , filter:Boolean, target:asyncexplicitUnknownMutable})
      sample({clock:numberClock , filter:Boolean, target:asyncvoidMutable           })
      sample({clock:numberClock , filter:Boolean, target:asyncunknownMutable        })
      sample({clock:numberClock , filter:Boolean, target:asyncanyMutable            })
      sample({clock:numberClock , filter:Boolean, target:asyncnumberMutable         })
      sample({clock:stringClock , filter:Boolean, target:asyncinferredMutable       })
      sample({clock:stringClock , filter:Boolean, target:asyncexplicitUnknownMutable})
      sample({clock:stringClock , filter:Boolean, target:asyncvoidMutable           })
      sample({clock:stringClock , filter:Boolean, target:asyncunknownMutable        })
      sample({clock:stringClock , filter:Boolean, target:asyncanyMutable            })
      sample({clock:stringClock , filter:Boolean, target:asyncstringMutable         })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('mutable, Boolean, async (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: asyncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: asyncnumberMutable,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: asyncstringMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: asyncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: asyncnumberMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: asyncstringMutable,
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: asyncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: asyncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: asyncstringMutable,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: asyncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: asyncnumberMutable,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      lack of expected error at test line 5 'clock: voidClock,'
      lack of expected error at test line 7 'filter: Boolean,'
      lack of expected error at test line 9 'target: asyncneverMutable,'
      lack of expected error at test line 13 'clock: voidClock,'
      lack of expected error at test line 15 'filter: Boolean,'
      Type 'Effect<number, void, Error>[]' is not assignable to type 'readonly UnitTargetable<void>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<void>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 21 'clock: voidClock,'
      lack of expected error at test line 23 'filter: Boolean,'
      Type 'Effect<string, void, Error>[]' is not assignable to type 'readonly UnitTargetable<void>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<void>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'void'.
      lack of expected error at test line 29 'clock: unknownClock,'
      lack of expected error at test line 31 'filter: Boolean,'
      lack of expected error at test line 33 'target: asyncneverMutable,'
      lack of expected error at test line 37 'clock: unknownClock,'
      lack of expected error at test line 39 'filter: Boolean,'
      lack of expected error at test line 41 'target: asyncnumberMutable,'
      lack of expected error at test line 45 'clock: unknownClock,'
      lack of expected error at test line 47 'filter: Boolean,'
      lack of expected error at test line 49 'target: asyncstringMutable,'
      lack of expected error at test line 53 'clock: anyClock,'
      lack of expected error at test line 55 'filter: Boolean,'
      lack of expected error at test line 57 'target: asyncneverMutable,'
      lack of expected error at test line 61 'clock: numberClock,'
      lack of expected error at test line 63 'filter: Boolean,'
      lack of expected error at test line 65 'target: asyncneverMutable,'
      lack of expected error at test line 69 'clock: numberClock,'
      lack of expected error at test line 71 'filter: Boolean,'
      Type 'Effect<string, void, Error>[]' is not assignable to type 'readonly UnitTargetable<number>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<number>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 77 'clock: stringClock,'
      lack of expected error at test line 79 'filter: Boolean,'
      lack of expected error at test line 81 'target: asyncneverMutable,'
      lack of expected error at test line 85 'clock: stringClock,'
      lack of expected error at test line 87 'filter: Boolean,'
      Type 'Effect<number, void, Error>[]' is not assignable to type 'readonly UnitTargetable<string>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<string>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('mutable, filter, async', () => {
  test('mutable, filter, async (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , filter:() => true, target:asyncinferredMutable       })
      sample({clock:voidClock   , filter:() => true, target:asyncexplicitUnknownMutable})
      sample({clock:voidClock   , filter:() => true, target:asyncvoidMutable           })
      sample({clock:voidClock   , filter:() => true, target:asyncunknownMutable        })
      sample({clock:voidClock   , filter:() => true, target:asyncanyMutable            })
      sample({clock:unknownClock, filter:() => true, target:asyncinferredMutable       })
      sample({clock:unknownClock, filter:() => true, target:asyncexplicitUnknownMutable})
      sample({clock:unknownClock, filter:() => true, target:asyncvoidMutable           })
      sample({clock:unknownClock, filter:() => true, target:asyncunknownMutable        })
      sample({clock:unknownClock, filter:() => true, target:asyncanyMutable            })
      sample({clock:anyClock    , filter:() => true, target:asyncinferredMutable       })
      sample({clock:anyClock    , filter:() => true, target:asyncexplicitUnknownMutable})
      sample({clock:anyClock    , filter:() => true, target:asyncvoidMutable           })
      sample({clock:anyClock    , filter:() => true, target:asyncunknownMutable        })
      sample({clock:anyClock    , filter:() => true, target:asyncanyMutable            })
      sample({clock:anyClock    , filter:() => true, target:asyncnumberMutable         })
      sample({clock:anyClock    , filter:() => true, target:asyncstringMutable         })
      sample({clock:neverClock  , filter:() => true, target:asyncinferredMutable       })
      sample({clock:neverClock  , filter:() => true, target:asyncexplicitUnknownMutable})
      sample({clock:neverClock  , filter:() => true, target:asyncvoidMutable           })
      sample({clock:neverClock  , filter:() => true, target:asyncunknownMutable        })
      sample({clock:neverClock  , filter:() => true, target:asyncanyMutable            })
      sample({clock:neverClock  , filter:() => true, target:asyncneverMutable          })
      sample({clock:neverClock  , filter:() => true, target:asyncnumberMutable         })
      sample({clock:neverClock  , filter:() => true, target:asyncstringMutable         })
      sample({clock:numberClock , filter:() => true, target:asyncinferredMutable       })
      sample({clock:numberClock , filter:() => true, target:asyncexplicitUnknownMutable})
      sample({clock:numberClock , filter:() => true, target:asyncvoidMutable           })
      sample({clock:numberClock , filter:() => true, target:asyncunknownMutable        })
      sample({clock:numberClock , filter:() => true, target:asyncanyMutable            })
      sample({clock:numberClock , filter:() => true, target:asyncnumberMutable         })
      sample({clock:stringClock , filter:() => true, target:asyncinferredMutable       })
      sample({clock:stringClock , filter:() => true, target:asyncexplicitUnknownMutable})
      sample({clock:stringClock , filter:() => true, target:asyncvoidMutable           })
      sample({clock:stringClock , filter:() => true, target:asyncunknownMutable        })
      sample({clock:stringClock , filter:() => true, target:asyncanyMutable            })
      sample({clock:stringClock , filter:() => true, target:asyncstringMutable         })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('mutable, filter, async (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: asyncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: asyncnumberMutable,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: asyncstringMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: asyncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: asyncnumberMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: asyncstringMutable,
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: asyncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: asyncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: asyncstringMutable,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: asyncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: asyncnumberMutable,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 7 'filter: () => true,'
      lack of expected error at test line 9 'target: asyncneverMutable,'
      lack of expected error at test line 13 'clock: voidClock,'
      lack of expected error at test line 15 'filter: () => true,'
      Type 'Effect<number, void, Error>[]' is not assignable to type 'Unit<void>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 21 'clock: voidClock,'
      lack of expected error at test line 23 'filter: () => true,'
      Type 'Effect<string, void, Error>[]' is not assignable to type 'Unit<void>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 31 'filter: () => true,'
      lack of expected error at test line 33 'target: asyncneverMutable,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 39 'filter: () => true,'
      lack of expected error at test line 41 'target: asyncnumberMutable,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 47 'filter: () => true,'
      lack of expected error at test line 49 'target: asyncstringMutable,'
      lack of expected error at test line 53 'clock: anyClock,'
      lack of expected error at test line 55 'filter: () => true,'
      lack of expected error at test line 57 'target: asyncneverMutable,'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 63 'filter: () => true,'
      lack of expected error at test line 65 'target: asyncneverMutable,'
      lack of expected error at test line 69 'clock: numberClock,'
      lack of expected error at test line 71 'filter: () => true,'
      Type 'Effect<string, void, Error>[]' is not assignable to type 'Unit<number>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 79 'filter: () => true,'
      lack of expected error at test line 81 'target: asyncneverMutable,'
      lack of expected error at test line 85 'clock: stringClock,'
      lack of expected error at test line 87 'filter: () => true,'
      Type 'Effect<number, void, Error>[]' is not assignable to type 'Unit<string>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('mutable, fn, async', () => {
  test('mutable, fn, async (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , fn:(value: void) => value   , target:asyncinferredMutable       })
      sample({clock:voidClock   , fn:(value: void) => value   , target:asyncexplicitUnknownMutable})
      sample({clock:voidClock   , fn:(value: void) => value   , target:asyncvoidMutable           })
      sample({clock:voidClock   , fn:(value: void) => value   , target:asyncunknownMutable        })
      sample({clock:voidClock   , fn:(value: void) => value   , target:asyncanyMutable            })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:asyncinferredMutable       })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:asyncexplicitUnknownMutable})
      sample({clock:unknownClock, fn:(value: unknown) => value, target:asyncvoidMutable           })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:asyncunknownMutable        })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:asyncanyMutable            })
      sample({clock:anyClock    , fn:(value: any) => value    , target:asyncinferredMutable       })
      sample({clock:anyClock    , fn:(value: any) => value    , target:asyncexplicitUnknownMutable})
      sample({clock:anyClock    , fn:(value: any) => value    , target:asyncvoidMutable           })
      sample({clock:anyClock    , fn:(value: any) => value    , target:asyncunknownMutable        })
      sample({clock:anyClock    , fn:(value: any) => value    , target:asyncanyMutable            })
      sample({clock:anyClock    , fn:(value: any) => value    , target:asyncnumberMutable         })
      sample({clock:anyClock    , fn:(value: any) => value    , target:asyncstringMutable         })
      sample({clock:neverClock  , fn:(value: never) => value  , target:asyncinferredMutable       })
      sample({clock:neverClock  , fn:(value: never) => value  , target:asyncexplicitUnknownMutable})
      sample({clock:neverClock  , fn:(value: never) => value  , target:asyncvoidMutable           })
      sample({clock:neverClock  , fn:(value: never) => value  , target:asyncunknownMutable        })
      sample({clock:neverClock  , fn:(value: never) => value  , target:asyncanyMutable            })
      sample({clock:neverClock  , fn:(value: never) => value  , target:asyncneverMutable          })
      sample({clock:neverClock  , fn:(value: never) => value  , target:asyncnumberMutable         })
      sample({clock:neverClock  , fn:(value: never) => value  , target:asyncstringMutable         })
      sample({clock:numberClock , fn:(value: number) => value , target:asyncinferredMutable       })
      sample({clock:numberClock , fn:(value: number) => value , target:asyncexplicitUnknownMutable})
      sample({clock:numberClock , fn:(value: number) => value , target:asyncvoidMutable           })
      sample({clock:numberClock , fn:(value: number) => value , target:asyncunknownMutable        })
      sample({clock:numberClock , fn:(value: number) => value , target:asyncanyMutable            })
      sample({clock:numberClock , fn:(value: number) => value , target:asyncnumberMutable         })
      sample({clock:stringClock , fn:(value: string) => value , target:asyncinferredMutable       })
      sample({clock:stringClock , fn:(value: string) => value , target:asyncexplicitUnknownMutable})
      sample({clock:stringClock , fn:(value: string) => value , target:asyncvoidMutable           })
      sample({clock:stringClock , fn:(value: string) => value , target:asyncunknownMutable        })
      sample({clock:stringClock , fn:(value: string) => value , target:asyncanyMutable            })
      sample({clock:stringClock , fn:(value: string) => value , target:asyncstringMutable         })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('mutable, fn, async (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        fn: (value: void) => value,
        //@ts-expect-error
        target: asyncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        fn: (value: void) => value,
        //@ts-expect-error
        target: asyncnumberMutable,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        fn: (value: void) => value,
        //@ts-expect-error
        target: asyncstringMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        fn: (value: unknown) => value,
        //@ts-expect-error
        target: asyncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        fn: (value: unknown) => value,
        //@ts-expect-error
        target: asyncnumberMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        fn: (value: unknown) => value,
        //@ts-expect-error
        target: asyncstringMutable,
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        fn: (value: any) => value,
        //@ts-expect-error
        target: asyncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        fn: (value: number) => value,
        //@ts-expect-error
        target: asyncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        fn: (value: number) => value,
        //@ts-expect-error
        target: asyncstringMutable,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        fn: (value: string) => value,
        //@ts-expect-error
        target: asyncneverMutable,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        fn: (value: string) => value,
        //@ts-expect-error
        target: asyncnumberMutable,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      lack of expected error at test line 5 'clock: voidClock,'
      Type '(value: void) => void' is not assignable to type '(value?: void | undefined) => never'.
        Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 9 'target: asyncneverMutable,'
      lack of expected error at test line 13 'clock: voidClock,'
      Type '(value: void) => void' is not assignable to type '(value?: void | undefined) => never'.
        Type 'void' is not assignable to type 'never'.
      Type 'Effect<number, void, Error>[]' is not assignable to type 'Unit<void>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 21 'clock: voidClock,'
      Type '(value: void) => void' is not assignable to type '(value?: void | undefined) => never'.
        Type 'void' is not assignable to type 'never'.
      Type 'Effect<string, void, Error>[]' is not assignable to type 'Unit<void>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'void'.
      lack of expected error at test line 29 'clock: unknownClock,'
      Type '(value: unknown) => unknown' is not assignable to type '(value: unknown) => never'.
        Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 33 'target: asyncneverMutable,'
      lack of expected error at test line 37 'clock: unknownClock,'
      Type '(value: unknown) => unknown' is not assignable to type '(value: unknown) => never'.
        Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 41 'target: asyncnumberMutable,'
      lack of expected error at test line 45 'clock: unknownClock,'
      Type '(value: unknown) => unknown' is not assignable to type '(value: unknown) => never'.
        Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 49 'target: asyncstringMutable,'
      lack of expected error at test line 53 'clock: anyClock,'
      lack of expected error at test line 55 'fn: (value: any) => value,'
      lack of expected error at test line 57 'target: asyncneverMutable,'
      lack of expected error at test line 61 'clock: numberClock,'
      Type '(value: number) => number' is not assignable to type '(value: number) => never'.
        Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 65 'target: asyncneverMutable,'
      lack of expected error at test line 69 'clock: numberClock,'
      Type '(value: number) => number' is not assignable to type '(value: number) => never'.
        Type 'number' is not assignable to type 'never'.
      Type 'Effect<string, void, Error>[]' is not assignable to type 'Unit<number>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 77 'clock: stringClock,'
      Type '(value: string) => string' is not assignable to type '(value: string) => never'.
        Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 81 'target: asyncneverMutable,'
      lack of expected error at test line 85 'clock: stringClock,'
      Type '(value: string) => string' is not assignable to type '(value: string) => never'.
        Type 'string' is not assignable to type 'never'.
      Type 'Effect<number, void, Error>[]' is not assignable to type 'Unit<string>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('readonlyArray, clock, async', () => {
  test('readonlyArray, clock, async (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , target:asyncinferredReadonly       })
      sample({clock:voidClock   , target:asyncexplicitUnknownReadonly})
      sample({clock:voidClock   , target:asyncvoidReadonly           })
      sample({clock:voidClock   , target:asyncunknownReadonly        })
      sample({clock:voidClock   , target:asyncanyReadonly            })
      sample({clock:unknownClock, target:asyncinferredReadonly       })
      sample({clock:unknownClock, target:asyncexplicitUnknownReadonly})
      sample({clock:unknownClock, target:asyncvoidReadonly           })
      sample({clock:unknownClock, target:asyncunknownReadonly        })
      sample({clock:unknownClock, target:asyncanyReadonly            })
      sample({clock:anyClock    , target:asyncinferredReadonly       })
      sample({clock:anyClock    , target:asyncexplicitUnknownReadonly})
      sample({clock:anyClock    , target:asyncvoidReadonly           })
      sample({clock:anyClock    , target:asyncunknownReadonly        })
      sample({clock:anyClock    , target:asyncanyReadonly            })
      sample({clock:anyClock    , target:asyncnumberReadonly         })
      sample({clock:anyClock    , target:asyncstringReadonly         })
      sample({clock:neverClock  , target:asyncinferredReadonly       })
      sample({clock:neverClock  , target:asyncexplicitUnknownReadonly})
      sample({clock:neverClock  , target:asyncvoidReadonly           })
      sample({clock:neverClock  , target:asyncunknownReadonly        })
      sample({clock:neverClock  , target:asyncanyReadonly            })
      sample({clock:neverClock  , target:asyncneverReadonly          })
      sample({clock:neverClock  , target:asyncnumberReadonly         })
      sample({clock:neverClock  , target:asyncstringReadonly         })
      sample({clock:numberClock , target:asyncinferredReadonly       })
      sample({clock:numberClock , target:asyncexplicitUnknownReadonly})
      sample({clock:numberClock , target:asyncvoidReadonly           })
      sample({clock:numberClock , target:asyncunknownReadonly        })
      sample({clock:numberClock , target:asyncanyReadonly            })
      sample({clock:numberClock , target:asyncnumberReadonly         })
      sample({clock:stringClock , target:asyncinferredReadonly       })
      sample({clock:stringClock , target:asyncexplicitUnknownReadonly})
      sample({clock:stringClock , target:asyncvoidReadonly           })
      sample({clock:stringClock , target:asyncunknownReadonly        })
      sample({clock:stringClock , target:asyncanyReadonly            })
      sample({clock:stringClock , target:asyncstringReadonly         })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('readonlyArray, clock, async (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: asyncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: asyncnumberReadonly,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: asyncstringReadonly,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: asyncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: asyncnumberReadonly,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: asyncstringReadonly,
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        target: asyncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        target: asyncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        target: asyncstringReadonly,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        target: asyncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        target: asyncnumberReadonly,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      lack of expected error at test line 5 'clock: voidClock,'
      lack of expected error at test line 7 'target: asyncneverReadonly,'
      lack of expected error at test line 11 'clock: voidClock,'
      Type 'readonly Effect<number, void, Error>[]' is not assignable to type 'readonly UnitTargetable<void>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<void>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 17 'clock: voidClock,'
      Type 'readonly Effect<string, void, Error>[]' is not assignable to type 'readonly UnitTargetable<void>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<void>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'void'.
      lack of expected error at test line 23 'clock: unknownClock,'
      lack of expected error at test line 25 'target: asyncneverReadonly,'
      lack of expected error at test line 29 'clock: unknownClock,'
      lack of expected error at test line 31 'target: asyncnumberReadonly,'
      lack of expected error at test line 35 'clock: unknownClock,'
      lack of expected error at test line 37 'target: asyncstringReadonly,'
      lack of expected error at test line 41 'clock: anyClock,'
      lack of expected error at test line 43 'target: asyncneverReadonly,'
      lack of expected error at test line 47 'clock: numberClock,'
      lack of expected error at test line 49 'target: asyncneverReadonly,'
      lack of expected error at test line 53 'clock: numberClock,'
      Type 'readonly Effect<string, void, Error>[]' is not assignable to type 'readonly UnitTargetable<number>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<number>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 59 'clock: stringClock,'
      lack of expected error at test line 61 'target: asyncneverReadonly,'
      lack of expected error at test line 65 'clock: stringClock,'
      Type 'readonly Effect<number, void, Error>[]' is not assignable to type 'readonly UnitTargetable<string>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<string>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('readonlyArray, source, async', () => {
  test('readonlyArray, source, async (should pass)', () => {
    //prettier-ignore
    {
      sample({source:voidClock   , target:asyncinferredReadonly       })
      sample({source:voidClock   , target:asyncexplicitUnknownReadonly})
      sample({source:voidClock   , target:asyncvoidReadonly           })
      sample({source:voidClock   , target:asyncunknownReadonly        })
      sample({source:voidClock   , target:asyncanyReadonly            })
      sample({source:unknownClock, target:asyncinferredReadonly       })
      sample({source:unknownClock, target:asyncexplicitUnknownReadonly})
      sample({source:unknownClock, target:asyncvoidReadonly           })
      sample({source:unknownClock, target:asyncunknownReadonly        })
      sample({source:unknownClock, target:asyncanyReadonly            })
      sample({source:anyClock    , target:asyncinferredReadonly       })
      sample({source:anyClock    , target:asyncexplicitUnknownReadonly})
      sample({source:anyClock    , target:asyncvoidReadonly           })
      sample({source:anyClock    , target:asyncunknownReadonly        })
      sample({source:anyClock    , target:asyncanyReadonly            })
      sample({source:anyClock    , target:asyncnumberReadonly         })
      sample({source:anyClock    , target:asyncstringReadonly         })
      sample({source:neverClock  , target:asyncinferredReadonly       })
      sample({source:neverClock  , target:asyncexplicitUnknownReadonly})
      sample({source:neverClock  , target:asyncvoidReadonly           })
      sample({source:neverClock  , target:asyncunknownReadonly        })
      sample({source:neverClock  , target:asyncanyReadonly            })
      sample({source:neverClock  , target:asyncneverReadonly          })
      sample({source:neverClock  , target:asyncnumberReadonly         })
      sample({source:neverClock  , target:asyncstringReadonly         })
      sample({source:numberClock , target:asyncinferredReadonly       })
      sample({source:numberClock , target:asyncexplicitUnknownReadonly})
      sample({source:numberClock , target:asyncvoidReadonly           })
      sample({source:numberClock , target:asyncunknownReadonly        })
      sample({source:numberClock , target:asyncanyReadonly            })
      sample({source:numberClock , target:asyncnumberReadonly         })
      sample({source:stringClock , target:asyncinferredReadonly       })
      sample({source:stringClock , target:asyncexplicitUnknownReadonly})
      sample({source:stringClock , target:asyncvoidReadonly           })
      sample({source:stringClock , target:asyncunknownReadonly        })
      sample({source:stringClock , target:asyncanyReadonly            })
      sample({source:stringClock , target:asyncstringReadonly         })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('readonlyArray, source, async (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: asyncneverReadonly,
      })
      sample({
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: asyncnumberReadonly,
      })
      sample({
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: asyncstringReadonly,
      })
      sample({
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: asyncneverReadonly,
      })
      sample({
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: asyncnumberReadonly,
      })
      sample({
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: asyncstringReadonly,
      })
      sample({
        //@ts-expect-error
        source: anyClock,
        //@ts-expect-error
        target: asyncneverReadonly,
      })
      sample({
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: asyncneverReadonly,
      })
      sample({
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: asyncstringReadonly,
      })
      sample({
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: asyncneverReadonly,
      })
      sample({
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: asyncnumberReadonly,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 7 'target: asyncneverReadonly,'
      lack of expected error at test line 11 'source: voidClock,'
      Type 'readonly Effect<number, void, Error>[]' is not assignable to type 'readonly Unit<void>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 17 'source: voidClock,'
      Type 'readonly Effect<string, void, Error>[]' is not assignable to type 'readonly Unit<void>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 25 'target: asyncneverReadonly,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 31 'target: asyncnumberReadonly,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 37 'target: asyncstringReadonly,'
      lack of expected error at test line 41 'source: anyClock,'
      lack of expected error at test line 43 'target: asyncneverReadonly,'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 49 'target: asyncneverReadonly,'
      lack of expected error at test line 53 'source: numberClock,'
      Type 'readonly Effect<string, void, Error>[]' is not assignable to type 'readonly Unit<number>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 61 'target: asyncneverReadonly,'
      lack of expected error at test line 65 'source: stringClock,'
      Type 'readonly Effect<number, void, Error>[]' is not assignable to type 'readonly Unit<string>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('readonlyArray, both, async', () => {
  test('readonlyArray, both, async (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , source:voidClock   , target:asyncinferredReadonly       })
      sample({clock:voidClock   , source:voidClock   , target:asyncexplicitUnknownReadonly})
      sample({clock:voidClock   , source:voidClock   , target:asyncvoidReadonly           })
      sample({clock:voidClock   , source:voidClock   , target:asyncunknownReadonly        })
      sample({clock:voidClock   , source:voidClock   , target:asyncanyReadonly            })
      sample({clock:unknownClock, source:unknownClock, target:asyncinferredReadonly       })
      sample({clock:unknownClock, source:unknownClock, target:asyncexplicitUnknownReadonly})
      sample({clock:unknownClock, source:unknownClock, target:asyncvoidReadonly           })
      sample({clock:unknownClock, source:unknownClock, target:asyncunknownReadonly        })
      sample({clock:unknownClock, source:unknownClock, target:asyncanyReadonly            })
      sample({clock:anyClock    , source:anyClock    , target:asyncinferredReadonly       })
      sample({clock:anyClock    , source:anyClock    , target:asyncexplicitUnknownReadonly})
      sample({clock:anyClock    , source:anyClock    , target:asyncvoidReadonly           })
      sample({clock:anyClock    , source:anyClock    , target:asyncunknownReadonly        })
      sample({clock:anyClock    , source:anyClock    , target:asyncanyReadonly            })
      sample({clock:anyClock    , source:anyClock    , target:asyncnumberReadonly         })
      sample({clock:anyClock    , source:anyClock    , target:asyncstringReadonly         })
      sample({clock:neverClock  , source:neverClock  , target:asyncinferredReadonly       })
      sample({clock:neverClock  , source:neverClock  , target:asyncexplicitUnknownReadonly})
      sample({clock:neverClock  , source:neverClock  , target:asyncvoidReadonly           })
      sample({clock:neverClock  , source:neverClock  , target:asyncunknownReadonly        })
      sample({clock:neverClock  , source:neverClock  , target:asyncanyReadonly            })
      sample({clock:neverClock  , source:neverClock  , target:asyncneverReadonly          })
      sample({clock:neverClock  , source:neverClock  , target:asyncnumberReadonly         })
      sample({clock:neverClock  , source:neverClock  , target:asyncstringReadonly         })
      sample({clock:numberClock , source:numberClock , target:asyncinferredReadonly       })
      sample({clock:numberClock , source:numberClock , target:asyncexplicitUnknownReadonly})
      sample({clock:numberClock , source:numberClock , target:asyncvoidReadonly           })
      sample({clock:numberClock , source:numberClock , target:asyncunknownReadonly        })
      sample({clock:numberClock , source:numberClock , target:asyncanyReadonly            })
      sample({clock:numberClock , source:numberClock , target:asyncnumberReadonly         })
      sample({clock:stringClock , source:stringClock , target:asyncinferredReadonly       })
      sample({clock:stringClock , source:stringClock , target:asyncexplicitUnknownReadonly})
      sample({clock:stringClock , source:stringClock , target:asyncvoidReadonly           })
      sample({clock:stringClock , source:stringClock , target:asyncunknownReadonly        })
      sample({clock:stringClock , source:stringClock , target:asyncanyReadonly            })
      sample({clock:stringClock , source:stringClock , target:asyncstringReadonly         })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('readonlyArray, both, async (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: asyncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: asyncnumberReadonly,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        source: voidClock,
        //@ts-expect-error
        target: asyncstringReadonly,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: asyncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: asyncnumberReadonly,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        source: unknownClock,
        //@ts-expect-error
        target: asyncstringReadonly,
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        source: anyClock,
        //@ts-expect-error
        target: asyncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: asyncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        source: numberClock,
        //@ts-expect-error
        target: asyncstringReadonly,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: asyncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        source: stringClock,
        //@ts-expect-error
        target: asyncnumberReadonly,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      lack of expected error at test line 5 'clock: voidClock,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 9 'target: asyncneverReadonly,'
      lack of expected error at test line 13 'clock: voidClock,'
      lack of expected error at test line 15 'source: voidClock,'
      Type 'readonly Effect<number, void, Error>[]' is not assignable to type 'readonly Unit<void>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 21 'clock: voidClock,'
      lack of expected error at test line 23 'source: voidClock,'
      Type 'readonly Effect<string, void, Error>[]' is not assignable to type 'readonly Unit<void>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'void'.
      lack of expected error at test line 29 'clock: unknownClock,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 33 'target: asyncneverReadonly,'
      lack of expected error at test line 37 'clock: unknownClock,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 41 'target: asyncnumberReadonly,'
      lack of expected error at test line 45 'clock: unknownClock,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 49 'target: asyncstringReadonly,'
      lack of expected error at test line 53 'clock: anyClock,'
      lack of expected error at test line 55 'source: anyClock,'
      lack of expected error at test line 57 'target: asyncneverReadonly,'
      lack of expected error at test line 61 'clock: numberClock,'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 65 'target: asyncneverReadonly,'
      lack of expected error at test line 69 'clock: numberClock,'
      lack of expected error at test line 71 'source: numberClock,'
      Type 'readonly Effect<string, void, Error>[]' is not assignable to type 'readonly Unit<number>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 77 'clock: stringClock,'
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 81 'target: asyncneverReadonly,'
      lack of expected error at test line 85 'clock: stringClock,'
      lack of expected error at test line 87 'source: stringClock,'
      Type 'readonly Effect<number, void, Error>[]' is not assignable to type 'readonly Unit<string>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('readonlyArray, Boolean, async', () => {
  test('readonlyArray, Boolean, async (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , filter:Boolean, target:asyncinferredReadonly       })
      sample({clock:voidClock   , filter:Boolean, target:asyncexplicitUnknownReadonly})
      sample({clock:voidClock   , filter:Boolean, target:asyncvoidReadonly           })
      sample({clock:voidClock   , filter:Boolean, target:asyncunknownReadonly        })
      sample({clock:voidClock   , filter:Boolean, target:asyncanyReadonly            })
      sample({clock:unknownClock, filter:Boolean, target:asyncinferredReadonly       })
      sample({clock:unknownClock, filter:Boolean, target:asyncexplicitUnknownReadonly})
      sample({clock:unknownClock, filter:Boolean, target:asyncvoidReadonly           })
      sample({clock:unknownClock, filter:Boolean, target:asyncunknownReadonly        })
      sample({clock:unknownClock, filter:Boolean, target:asyncanyReadonly            })
      sample({clock:anyClock    , filter:Boolean, target:asyncinferredReadonly       })
      sample({clock:anyClock    , filter:Boolean, target:asyncexplicitUnknownReadonly})
      sample({clock:anyClock    , filter:Boolean, target:asyncvoidReadonly           })
      sample({clock:anyClock    , filter:Boolean, target:asyncunknownReadonly        })
      sample({clock:anyClock    , filter:Boolean, target:asyncanyReadonly            })
      sample({clock:anyClock    , filter:Boolean, target:asyncnumberReadonly         })
      sample({clock:anyClock    , filter:Boolean, target:asyncstringReadonly         })
      sample({clock:neverClock  , filter:Boolean, target:asyncinferredReadonly       })
      sample({clock:neverClock  , filter:Boolean, target:asyncexplicitUnknownReadonly})
      sample({clock:neverClock  , filter:Boolean, target:asyncvoidReadonly           })
      sample({clock:neverClock  , filter:Boolean, target:asyncunknownReadonly        })
      sample({clock:neverClock  , filter:Boolean, target:asyncanyReadonly            })
      sample({clock:neverClock  , filter:Boolean, target:asyncneverReadonly          })
      sample({clock:neverClock  , filter:Boolean, target:asyncnumberReadonly         })
      sample({clock:neverClock  , filter:Boolean, target:asyncstringReadonly         })
      sample({clock:numberClock , filter:Boolean, target:asyncinferredReadonly       })
      sample({clock:numberClock , filter:Boolean, target:asyncexplicitUnknownReadonly})
      sample({clock:numberClock , filter:Boolean, target:asyncvoidReadonly           })
      sample({clock:numberClock , filter:Boolean, target:asyncunknownReadonly        })
      sample({clock:numberClock , filter:Boolean, target:asyncanyReadonly            })
      sample({clock:numberClock , filter:Boolean, target:asyncnumberReadonly         })
      sample({clock:stringClock , filter:Boolean, target:asyncinferredReadonly       })
      sample({clock:stringClock , filter:Boolean, target:asyncexplicitUnknownReadonly})
      sample({clock:stringClock , filter:Boolean, target:asyncvoidReadonly           })
      sample({clock:stringClock , filter:Boolean, target:asyncunknownReadonly        })
      sample({clock:stringClock , filter:Boolean, target:asyncanyReadonly            })
      sample({clock:stringClock , filter:Boolean, target:asyncstringReadonly         })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('readonlyArray, Boolean, async (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: asyncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: asyncnumberReadonly,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: asyncstringReadonly,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: asyncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: asyncnumberReadonly,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: asyncstringReadonly,
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: asyncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: asyncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: asyncstringReadonly,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: asyncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: Boolean,
        //@ts-expect-error
        target: asyncnumberReadonly,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      lack of expected error at test line 5 'clock: voidClock,'
      lack of expected error at test line 7 'filter: Boolean,'
      lack of expected error at test line 9 'target: asyncneverReadonly,'
      lack of expected error at test line 13 'clock: voidClock,'
      lack of expected error at test line 15 'filter: Boolean,'
      Type 'readonly Effect<number, void, Error>[]' is not assignable to type 'readonly UnitTargetable<void>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<void>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 21 'clock: voidClock,'
      lack of expected error at test line 23 'filter: Boolean,'
      Type 'readonly Effect<string, void, Error>[]' is not assignable to type 'readonly UnitTargetable<void>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<void>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'void'.
      lack of expected error at test line 29 'clock: unknownClock,'
      lack of expected error at test line 31 'filter: Boolean,'
      lack of expected error at test line 33 'target: asyncneverReadonly,'
      lack of expected error at test line 37 'clock: unknownClock,'
      lack of expected error at test line 39 'filter: Boolean,'
      lack of expected error at test line 41 'target: asyncnumberReadonly,'
      lack of expected error at test line 45 'clock: unknownClock,'
      lack of expected error at test line 47 'filter: Boolean,'
      lack of expected error at test line 49 'target: asyncstringReadonly,'
      lack of expected error at test line 53 'clock: anyClock,'
      lack of expected error at test line 55 'filter: Boolean,'
      lack of expected error at test line 57 'target: asyncneverReadonly,'
      lack of expected error at test line 61 'clock: numberClock,'
      lack of expected error at test line 63 'filter: Boolean,'
      lack of expected error at test line 65 'target: asyncneverReadonly,'
      lack of expected error at test line 69 'clock: numberClock,'
      lack of expected error at test line 71 'filter: Boolean,'
      Type 'readonly Effect<string, void, Error>[]' is not assignable to type 'readonly UnitTargetable<number>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'UnitTargetable<number>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 77 'clock: stringClock,'
      lack of expected error at test line 79 'filter: Boolean,'
      lack of expected error at test line 81 'target: asyncneverReadonly,'
      lack of expected error at test line 85 'clock: stringClock,'
      lack of expected error at test line 87 'filter: Boolean,'
      Type 'readonly Effect<number, void, Error>[]' is not assignable to type 'readonly UnitTargetable<string>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'UnitTargetable<string>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('readonlyArray, filter, async', () => {
  test('readonlyArray, filter, async (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , filter:() => true, target:asyncinferredReadonly       })
      sample({clock:voidClock   , filter:() => true, target:asyncexplicitUnknownReadonly})
      sample({clock:voidClock   , filter:() => true, target:asyncvoidReadonly           })
      sample({clock:voidClock   , filter:() => true, target:asyncunknownReadonly        })
      sample({clock:voidClock   , filter:() => true, target:asyncanyReadonly            })
      sample({clock:unknownClock, filter:() => true, target:asyncinferredReadonly       })
      sample({clock:unknownClock, filter:() => true, target:asyncexplicitUnknownReadonly})
      sample({clock:unknownClock, filter:() => true, target:asyncvoidReadonly           })
      sample({clock:unknownClock, filter:() => true, target:asyncunknownReadonly        })
      sample({clock:unknownClock, filter:() => true, target:asyncanyReadonly            })
      sample({clock:anyClock    , filter:() => true, target:asyncinferredReadonly       })
      sample({clock:anyClock    , filter:() => true, target:asyncexplicitUnknownReadonly})
      sample({clock:anyClock    , filter:() => true, target:asyncvoidReadonly           })
      sample({clock:anyClock    , filter:() => true, target:asyncunknownReadonly        })
      sample({clock:anyClock    , filter:() => true, target:asyncanyReadonly            })
      sample({clock:anyClock    , filter:() => true, target:asyncnumberReadonly         })
      sample({clock:anyClock    , filter:() => true, target:asyncstringReadonly         })
      sample({clock:neverClock  , filter:() => true, target:asyncinferredReadonly       })
      sample({clock:neverClock  , filter:() => true, target:asyncexplicitUnknownReadonly})
      sample({clock:neverClock  , filter:() => true, target:asyncvoidReadonly           })
      sample({clock:neverClock  , filter:() => true, target:asyncunknownReadonly        })
      sample({clock:neverClock  , filter:() => true, target:asyncanyReadonly            })
      sample({clock:neverClock  , filter:() => true, target:asyncneverReadonly          })
      sample({clock:neverClock  , filter:() => true, target:asyncnumberReadonly         })
      sample({clock:neverClock  , filter:() => true, target:asyncstringReadonly         })
      sample({clock:numberClock , filter:() => true, target:asyncinferredReadonly       })
      sample({clock:numberClock , filter:() => true, target:asyncexplicitUnknownReadonly})
      sample({clock:numberClock , filter:() => true, target:asyncvoidReadonly           })
      sample({clock:numberClock , filter:() => true, target:asyncunknownReadonly        })
      sample({clock:numberClock , filter:() => true, target:asyncanyReadonly            })
      sample({clock:numberClock , filter:() => true, target:asyncnumberReadonly         })
      sample({clock:stringClock , filter:() => true, target:asyncinferredReadonly       })
      sample({clock:stringClock , filter:() => true, target:asyncexplicitUnknownReadonly})
      sample({clock:stringClock , filter:() => true, target:asyncvoidReadonly           })
      sample({clock:stringClock , filter:() => true, target:asyncunknownReadonly        })
      sample({clock:stringClock , filter:() => true, target:asyncanyReadonly            })
      sample({clock:stringClock , filter:() => true, target:asyncstringReadonly         })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('readonlyArray, filter, async (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: asyncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: asyncnumberReadonly,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: asyncstringReadonly,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: asyncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: asyncnumberReadonly,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: asyncstringReadonly,
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: asyncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: asyncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: asyncstringReadonly,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: asyncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        filter: () => true,
        //@ts-expect-error
        target: asyncnumberReadonly,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 7 'filter: () => true,'
      lack of expected error at test line 9 'target: asyncneverReadonly,'
      lack of expected error at test line 13 'clock: voidClock,'
      lack of expected error at test line 15 'filter: () => true,'
      Type 'readonly Effect<number, void, Error>[]' is not assignable to type 'readonly Unit<void>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 21 'clock: voidClock,'
      lack of expected error at test line 23 'filter: () => true,'
      Type 'readonly Effect<string, void, Error>[]' is not assignable to type 'readonly Unit<void>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 31 'filter: () => true,'
      lack of expected error at test line 33 'target: asyncneverReadonly,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 39 'filter: () => true,'
      lack of expected error at test line 41 'target: asyncnumberReadonly,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 47 'filter: () => true,'
      lack of expected error at test line 49 'target: asyncstringReadonly,'
      lack of expected error at test line 53 'clock: anyClock,'
      lack of expected error at test line 55 'filter: () => true,'
      lack of expected error at test line 57 'target: asyncneverReadonly,'
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 63 'filter: () => true,'
      lack of expected error at test line 65 'target: asyncneverReadonly,'
      lack of expected error at test line 69 'clock: numberClock,'
      lack of expected error at test line 71 'filter: () => true,'
      Type 'readonly Effect<string, void, Error>[]' is not assignable to type 'readonly Unit<number>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 79 'filter: () => true,'
      lack of expected error at test line 81 'target: asyncneverReadonly,'
      lack of expected error at test line 85 'clock: stringClock,'
      lack of expected error at test line 87 'filter: () => true,'
      Type 'readonly Effect<number, void, Error>[]' is not assignable to type 'readonly Unit<string>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('readonlyArray, fn, async', () => {
  test('readonlyArray, fn, async (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidClock   , fn:(value: void) => value   , target:asyncinferredReadonly       })
      sample({clock:voidClock   , fn:(value: void) => value   , target:asyncexplicitUnknownReadonly})
      sample({clock:voidClock   , fn:(value: void) => value   , target:asyncvoidReadonly           })
      sample({clock:voidClock   , fn:(value: void) => value   , target:asyncunknownReadonly        })
      sample({clock:voidClock   , fn:(value: void) => value   , target:asyncanyReadonly            })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:asyncinferredReadonly       })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:asyncexplicitUnknownReadonly})
      sample({clock:unknownClock, fn:(value: unknown) => value, target:asyncvoidReadonly           })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:asyncunknownReadonly        })
      sample({clock:unknownClock, fn:(value: unknown) => value, target:asyncanyReadonly            })
      sample({clock:anyClock    , fn:(value: any) => value    , target:asyncinferredReadonly       })
      sample({clock:anyClock    , fn:(value: any) => value    , target:asyncexplicitUnknownReadonly})
      sample({clock:anyClock    , fn:(value: any) => value    , target:asyncvoidReadonly           })
      sample({clock:anyClock    , fn:(value: any) => value    , target:asyncunknownReadonly        })
      sample({clock:anyClock    , fn:(value: any) => value    , target:asyncanyReadonly            })
      sample({clock:anyClock    , fn:(value: any) => value    , target:asyncnumberReadonly         })
      sample({clock:anyClock    , fn:(value: any) => value    , target:asyncstringReadonly         })
      sample({clock:neverClock  , fn:(value: never) => value  , target:asyncinferredReadonly       })
      sample({clock:neverClock  , fn:(value: never) => value  , target:asyncexplicitUnknownReadonly})
      sample({clock:neverClock  , fn:(value: never) => value  , target:asyncvoidReadonly           })
      sample({clock:neverClock  , fn:(value: never) => value  , target:asyncunknownReadonly        })
      sample({clock:neverClock  , fn:(value: never) => value  , target:asyncanyReadonly            })
      sample({clock:neverClock  , fn:(value: never) => value  , target:asyncneverReadonly          })
      sample({clock:neverClock  , fn:(value: never) => value  , target:asyncnumberReadonly         })
      sample({clock:neverClock  , fn:(value: never) => value  , target:asyncstringReadonly         })
      sample({clock:numberClock , fn:(value: number) => value , target:asyncinferredReadonly       })
      sample({clock:numberClock , fn:(value: number) => value , target:asyncexplicitUnknownReadonly})
      sample({clock:numberClock , fn:(value: number) => value , target:asyncvoidReadonly           })
      sample({clock:numberClock , fn:(value: number) => value , target:asyncunknownReadonly        })
      sample({clock:numberClock , fn:(value: number) => value , target:asyncanyReadonly            })
      sample({clock:numberClock , fn:(value: number) => value , target:asyncnumberReadonly         })
      sample({clock:stringClock , fn:(value: string) => value , target:asyncinferredReadonly       })
      sample({clock:stringClock , fn:(value: string) => value , target:asyncexplicitUnknownReadonly})
      sample({clock:stringClock , fn:(value: string) => value , target:asyncvoidReadonly           })
      sample({clock:stringClock , fn:(value: string) => value , target:asyncunknownReadonly        })
      sample({clock:stringClock , fn:(value: string) => value , target:asyncanyReadonly            })
      sample({clock:stringClock , fn:(value: string) => value , target:asyncstringReadonly         })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('readonlyArray, fn, async (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        fn: (value: void) => value,
        //@ts-expect-error
        target: asyncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        fn: (value: void) => value,
        //@ts-expect-error
        target: asyncnumberReadonly,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        fn: (value: void) => value,
        //@ts-expect-error
        target: asyncstringReadonly,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        fn: (value: unknown) => value,
        //@ts-expect-error
        target: asyncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        fn: (value: unknown) => value,
        //@ts-expect-error
        target: asyncnumberReadonly,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        fn: (value: unknown) => value,
        //@ts-expect-error
        target: asyncstringReadonly,
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        fn: (value: any) => value,
        //@ts-expect-error
        target: asyncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        fn: (value: number) => value,
        //@ts-expect-error
        target: asyncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        fn: (value: number) => value,
        //@ts-expect-error
        target: asyncstringReadonly,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        fn: (value: string) => value,
        //@ts-expect-error
        target: asyncneverReadonly,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        fn: (value: string) => value,
        //@ts-expect-error
        target: asyncnumberReadonly,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      lack of expected error at test line 5 'clock: voidClock,'
      Type '(value: void) => void' is not assignable to type '(value?: void | undefined) => never'.
        Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 9 'target: asyncneverReadonly,'
      lack of expected error at test line 13 'clock: voidClock,'
      Type '(value: void) => void' is not assignable to type '(value?: void | undefined) => never'.
        Type 'void' is not assignable to type 'never'.
      Type 'readonly Effect<number, void, Error>[]' is not assignable to type 'readonly Unit<void>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'Unit<void>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'void'.
      lack of expected error at test line 21 'clock: voidClock,'
      Type '(value: void) => void' is not assignable to type '(value?: void | undefined) => never'.
        Type 'void' is not assignable to type 'never'.
      Type 'readonly Effect<string, void, Error>[]' is not assignable to type 'readonly Unit<void>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'Unit<void>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'void'.
      lack of expected error at test line 29 'clock: unknownClock,'
      Type '(value: unknown) => unknown' is not assignable to type '(value: unknown) => never'.
        Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 33 'target: asyncneverReadonly,'
      lack of expected error at test line 37 'clock: unknownClock,'
      Type '(value: unknown) => unknown' is not assignable to type '(value: unknown) => never'.
        Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 41 'target: asyncnumberReadonly,'
      lack of expected error at test line 45 'clock: unknownClock,'
      Type '(value: unknown) => unknown' is not assignable to type '(value: unknown) => never'.
        Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 49 'target: asyncstringReadonly,'
      lack of expected error at test line 53 'clock: anyClock,'
      lack of expected error at test line 55 'fn: (value: any) => value,'
      lack of expected error at test line 57 'target: asyncneverReadonly,'
      lack of expected error at test line 61 'clock: numberClock,'
      Type '(value: number) => number' is not assignable to type '(value: number) => never'.
        Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 65 'target: asyncneverReadonly,'
      lack of expected error at test line 69 'clock: numberClock,'
      Type '(value: number) => number' is not assignable to type '(value: number) => never'.
        Type 'number' is not assignable to type 'never'.
      Type 'readonly Effect<string, void, Error>[]' is not assignable to type 'readonly Unit<number>[]'.
        Type 'Effect<string, void, Error>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'number'.
      lack of expected error at test line 77 'clock: stringClock,'
      Type '(value: string) => string' is not assignable to type '(value: string) => never'.
        Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 81 'target: asyncneverReadonly,'
      lack of expected error at test line 85 'clock: stringClock,'
      Type '(value: string) => string' is not assignable to type '(value: string) => never'.
        Type 'string' is not assignable to type 'never'.
      Type 'readonly Effect<number, void, Error>[]' is not assignable to type 'readonly Unit<string>[]'.
        Type 'Effect<number, void, Error>' is not assignable to type 'Unit<string>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
