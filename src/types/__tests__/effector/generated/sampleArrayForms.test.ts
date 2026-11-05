/* eslint-disable no-unused-vars */
import {createEvent, sample} from 'effector'
const typecheck = '{global}'
const numberClock = createEvent<number>()
const stringClock = createEvent<string>()
const unknownClock = createEvent<unknown>()
const anyClock = createEvent<any>()
const voidClock = createEvent<void>()
const neverClock = createEvent<never>()

const numberTarget = createEvent<number>()
const stringTarget = createEvent<string>()
const unknownTarget = createEvent<unknown>()
const anyTarget = createEvent<any>()
const voidTarget = createEvent<void>()
const neverTarget = createEvent<never>()

const numberClockMutable = [numberClock]
const stringClockMutable = [stringClock]
const unknownClockMutable = [unknownClock]
const anyClockMutable = [anyClock]
const voidClockMutable = [voidClock]
const neverClockMutable = [neverClock]

const numberTargetMutable = [numberTarget]
const stringTargetMutable = [stringTarget]
const unknownTargetMutable = [unknownTarget]
const anyTargetMutable = [anyTarget]
const voidTargetMutable = [voidTarget]
const neverTargetMutable = [neverTarget]

const numberClockReadonlyTuple = [numberClock] as const
const stringClockReadonlyTuple = [stringClock] as const
const unknownClockReadonlyTuple = [unknownClock] as const
const anyClockReadonlyTuple = [anyClock] as const
const voidClockReadonlyTuple = [voidClock] as const
const neverClockReadonlyTuple = [neverClock] as const

const numberTargetReadonlyTuple = [numberTarget] as const
const stringTargetReadonlyTuple = [stringTarget] as const
const unknownTargetReadonlyTuple = [unknownTarget] as const
const anyTargetReadonlyTuple = [anyTarget] as const
const voidTargetReadonlyTuple = [voidTarget] as const
const neverTargetReadonlyTuple = [neverTarget] as const

const numberClockReadonlyArray: ReadonlyArray<typeof numberClock> = [
  numberClock,
]
const stringClockReadonlyArray: ReadonlyArray<typeof stringClock> = [
  stringClock,
]
const unknownClockReadonlyArray: ReadonlyArray<typeof unknownClock> = [
  unknownClock,
]
const anyClockReadonlyArray: ReadonlyArray<typeof anyClock> = [anyClock]
const voidClockReadonlyArray: ReadonlyArray<typeof voidClock> = [voidClock]
const neverClockReadonlyArray: ReadonlyArray<typeof neverClock> = [neverClock]

const numberTargetReadonlyArray: ReadonlyArray<typeof numberTarget> = [
  numberTarget,
]
const stringTargetReadonlyArray: ReadonlyArray<typeof stringTarget> = [
  stringTarget,
]
const unknownTargetReadonlyArray: ReadonlyArray<typeof unknownTarget> = [
  unknownTarget,
]
const anyTargetReadonlyArray: ReadonlyArray<typeof anyTarget> = [anyTarget]
const voidTargetReadonlyArray: ReadonlyArray<typeof voidTarget> = [voidTarget]
const neverTargetReadonlyArray: ReadonlyArray<typeof neverTarget> = [
  neverTarget,
]
describe('unit/unit, none filter', () => {
  test('unit/unit, none filter (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:numberClock , target:numberTarget })
      sample({clock:numberClock , target:unknownTarget})
      sample({clock:numberClock , target:anyTarget    })
      sample({clock:numberClock , target:voidTarget   })
      sample({clock:stringClock , target:stringTarget })
      sample({clock:stringClock , target:unknownTarget})
      sample({clock:stringClock , target:anyTarget    })
      sample({clock:stringClock , target:voidTarget   })
      sample({clock:unknownClock, target:unknownTarget})
      sample({clock:unknownClock, target:anyTarget    })
      sample({clock:unknownClock, target:voidTarget   })
      sample({clock:anyClock    , target:numberTarget })
      sample({clock:anyClock    , target:stringTarget })
      sample({clock:anyClock    , target:unknownTarget})
      sample({clock:anyClock    , target:anyTarget    })
      sample({clock:anyClock    , target:voidTarget   })
      sample({clock:voidClock   , target:unknownTarget})
      sample({clock:voidClock   , target:anyTarget    })
      sample({clock:voidClock   , target:voidTarget   })
      sample({clock:neverClock  , target:numberTarget })
      sample({clock:neverClock  , target:stringTarget })
      sample({clock:neverClock  , target:unknownTarget})
      sample({clock:neverClock  , target:anyTarget    })
      sample({clock:neverClock  , target:voidTarget   })
      sample({clock:neverClock  , target:neverTarget  })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('unit/unit, none filter (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        target: stringTarget,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        target: neverTarget,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        target: numberTarget,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        target: neverTarget,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: numberTarget,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: stringTarget,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: neverTarget,
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        target: neverTarget,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: numberTarget,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: stringTarget,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: neverTarget,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 13 'target: neverTarget,'
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 25 'target: neverTarget,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 31 'target: numberTarget,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 37 'target: stringTarget,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 43 'target: neverTarget,'
      Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'any' is not assignable to type 'never'.
      lack of expected error at test line 49 'target: neverTarget,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 67 'target: neverTarget,'
      "
    `)
  })
})
describe('unit/unit, Boolean filter', () => {
  test('unit/unit, Boolean filter (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:numberClock , filter:Boolean, target:numberTarget })
      sample({clock:numberClock , filter:Boolean, target:unknownTarget})
      sample({clock:numberClock , filter:Boolean, target:anyTarget    })
      sample({clock:numberClock , filter:Boolean, target:voidTarget   })
      sample({clock:stringClock , filter:Boolean, target:stringTarget })
      sample({clock:stringClock , filter:Boolean, target:unknownTarget})
      sample({clock:stringClock , filter:Boolean, target:anyTarget    })
      sample({clock:stringClock , filter:Boolean, target:voidTarget   })
      sample({clock:unknownClock, filter:Boolean, target:unknownTarget})
      sample({clock:unknownClock, filter:Boolean, target:anyTarget    })
      sample({clock:unknownClock, filter:Boolean, target:voidTarget   })
      sample({clock:anyClock    , filter:Boolean, target:numberTarget })
      sample({clock:anyClock    , filter:Boolean, target:stringTarget })
      sample({clock:anyClock    , filter:Boolean, target:unknownTarget})
      sample({clock:anyClock    , filter:Boolean, target:anyTarget    })
      sample({clock:anyClock    , filter:Boolean, target:voidTarget   })
      sample({clock:voidClock   , filter:Boolean, target:unknownTarget})
      sample({clock:voidClock   , filter:Boolean, target:anyTarget    })
      sample({clock:voidClock   , filter:Boolean, target:voidTarget   })
      sample({clock:neverClock  , filter:Boolean, target:numberTarget })
      sample({clock:neverClock  , filter:Boolean, target:stringTarget })
      sample({clock:neverClock  , filter:Boolean, target:unknownTarget})
      sample({clock:neverClock  , filter:Boolean, target:anyTarget    })
      sample({clock:neverClock  , filter:Boolean, target:voidTarget   })
      sample({clock:neverClock  , filter:Boolean, target:neverTarget  })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('unit/unit, Boolean filter (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: numberClock,
        filter: Boolean,
        //@ts-expect-error
        target: stringTarget,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        filter: Boolean,
        //@ts-expect-error
        target: neverTarget,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        filter: Boolean,
        //@ts-expect-error
        target: numberTarget,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        filter: Boolean,
        //@ts-expect-error
        target: neverTarget,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        filter: Boolean,
        //@ts-expect-error
        target: numberTarget,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        filter: Boolean,
        //@ts-expect-error
        target: stringTarget,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        filter: Boolean,
        //@ts-expect-error
        target: neverTarget,
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        filter: Boolean,
        //@ts-expect-error
        target: neverTarget,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        filter: Boolean,
        //@ts-expect-error
        target: numberTarget,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        filter: Boolean,
        //@ts-expect-error
        target: stringTarget,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        filter: Boolean,
        //@ts-expect-error
        target: neverTarget,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 15 'target: neverTarget,'
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 29 'target: neverTarget,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 36 'target: numberTarget,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 43 'target: stringTarget,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 50 'target: neverTarget,'
      Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'any' is not assignable to type 'never'.
      lack of expected error at test line 57 'target: neverTarget,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 78 'target: neverTarget,'
      "
    `)
  })
})
describe('unit/inline, none filter', () => {
  test('unit/inline, none filter (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:numberClock , target:[numberTarget] })
      sample({clock:numberClock , target:[unknownTarget]})
      sample({clock:numberClock , target:[anyTarget]    })
      sample({clock:numberClock , target:[voidTarget]   })
      sample({clock:stringClock , target:[stringTarget] })
      sample({clock:stringClock , target:[unknownTarget]})
      sample({clock:stringClock , target:[anyTarget]    })
      sample({clock:stringClock , target:[voidTarget]   })
      sample({clock:unknownClock, target:[unknownTarget]})
      sample({clock:unknownClock, target:[anyTarget]    })
      sample({clock:unknownClock, target:[voidTarget]   })
      sample({clock:anyClock    , target:[numberTarget] })
      sample({clock:anyClock    , target:[stringTarget] })
      sample({clock:anyClock    , target:[unknownTarget]})
      sample({clock:anyClock    , target:[anyTarget]    })
      sample({clock:anyClock    , target:[voidTarget]   })
      sample({clock:voidClock   , target:[unknownTarget]})
      sample({clock:voidClock   , target:[anyTarget]    })
      sample({clock:voidClock   , target:[voidTarget]   })
      sample({clock:neverClock  , target:[numberTarget] })
      sample({clock:neverClock  , target:[stringTarget] })
      sample({clock:neverClock  , target:[unknownTarget]})
      sample({clock:neverClock  , target:[anyTarget]    })
      sample({clock:neverClock  , target:[voidTarget]   })
      sample({clock:neverClock  , target:[neverTarget]  })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('unit/inline, none filter (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        target: [stringTarget],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        //@ts-expect-error
        target: [neverTarget],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        target: [numberTarget],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        //@ts-expect-error
        target: [neverTarget],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: [numberTarget],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: [stringTarget],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        //@ts-expect-error
        target: [neverTarget],
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        //@ts-expect-error
        target: [neverTarget],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: [numberTarget],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: [stringTarget],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        //@ts-expect-error
        target: [neverTarget],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 13 'target: [neverTarget],'
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 25 'target: [neverTarget],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 31 'target: [numberTarget],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 37 'target: [stringTarget],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 43 'target: [neverTarget],'
      Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'any' is not assignable to type 'never'.
      lack of expected error at test line 49 'target: [neverTarget],'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 67 'target: [neverTarget],'
      "
    `)
  })
})
describe('unit/inline, Boolean filter', () => {
  test('unit/inline, Boolean filter (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:numberClock , filter:Boolean, target:[numberTarget] })
      sample({clock:numberClock , filter:Boolean, target:[unknownTarget]})
      sample({clock:numberClock , filter:Boolean, target:[anyTarget]    })
      sample({clock:numberClock , filter:Boolean, target:[voidTarget]   })
      sample({clock:stringClock , filter:Boolean, target:[stringTarget] })
      sample({clock:stringClock , filter:Boolean, target:[unknownTarget]})
      sample({clock:stringClock , filter:Boolean, target:[anyTarget]    })
      sample({clock:stringClock , filter:Boolean, target:[voidTarget]   })
      sample({clock:unknownClock, filter:Boolean, target:[unknownTarget]})
      sample({clock:unknownClock, filter:Boolean, target:[anyTarget]    })
      sample({clock:unknownClock, filter:Boolean, target:[voidTarget]   })
      sample({clock:anyClock    , filter:Boolean, target:[numberTarget] })
      sample({clock:anyClock    , filter:Boolean, target:[stringTarget] })
      sample({clock:anyClock    , filter:Boolean, target:[unknownTarget]})
      sample({clock:anyClock    , filter:Boolean, target:[anyTarget]    })
      sample({clock:anyClock    , filter:Boolean, target:[voidTarget]   })
      sample({clock:voidClock   , filter:Boolean, target:[unknownTarget]})
      sample({clock:voidClock   , filter:Boolean, target:[anyTarget]    })
      sample({clock:voidClock   , filter:Boolean, target:[voidTarget]   })
      sample({clock:neverClock  , filter:Boolean, target:[numberTarget] })
      sample({clock:neverClock  , filter:Boolean, target:[stringTarget] })
      sample({clock:neverClock  , filter:Boolean, target:[unknownTarget]})
      sample({clock:neverClock  , filter:Boolean, target:[anyTarget]    })
      sample({clock:neverClock  , filter:Boolean, target:[voidTarget]   })
      sample({clock:neverClock  , filter:Boolean, target:[neverTarget]  })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('unit/inline, Boolean filter (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: numberClock,
        filter: Boolean,
        //@ts-expect-error
        target: [stringTarget],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        filter: Boolean,
        //@ts-expect-error
        target: [neverTarget],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        filter: Boolean,
        //@ts-expect-error
        target: [numberTarget],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        filter: Boolean,
        //@ts-expect-error
        target: [neverTarget],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        filter: Boolean,
        //@ts-expect-error
        target: [numberTarget],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        filter: Boolean,
        //@ts-expect-error
        target: [stringTarget],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        filter: Boolean,
        //@ts-expect-error
        target: [neverTarget],
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        filter: Boolean,
        //@ts-expect-error
        target: [neverTarget],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        filter: Boolean,
        //@ts-expect-error
        target: [numberTarget],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        filter: Boolean,
        //@ts-expect-error
        target: [stringTarget],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        filter: Boolean,
        //@ts-expect-error
        target: [neverTarget],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 15 'target: [neverTarget],'
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 29 'target: [neverTarget],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 36 'target: [numberTarget],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 43 'target: [stringTarget],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 50 'target: [neverTarget],'
      Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'any' is not assignable to type 'never'.
      lack of expected error at test line 57 'target: [neverTarget],'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 78 'target: [neverTarget],'
      "
    `)
  })
})
test('readonlyTuple/readonlyTuple, none filter (should fail)', () => {
  //prettier-ignore
  {
    //@ts-expect-error
    sample({clock:numberClockReadonlyTuple , target:numberTargetReadonlyTuple })
    //@ts-expect-error
    sample({clock:numberClockReadonlyTuple , target:stringTargetReadonlyTuple })
    //@ts-expect-error
    sample({clock:numberClockReadonlyTuple , target:unknownTargetReadonlyTuple})
    //@ts-expect-error
    sample({clock:numberClockReadonlyTuple , target:anyTargetReadonlyTuple    })
    //@ts-expect-error
    sample({clock:numberClockReadonlyTuple , target:voidTargetReadonlyTuple   })
    //@ts-expect-error
    sample({clock:numberClockReadonlyTuple , target:neverTargetReadonlyTuple  })
    //@ts-expect-error
    sample({clock:stringClockReadonlyTuple , target:numberTargetReadonlyTuple })
    //@ts-expect-error
    sample({clock:stringClockReadonlyTuple , target:stringTargetReadonlyTuple })
    //@ts-expect-error
    sample({clock:stringClockReadonlyTuple , target:unknownTargetReadonlyTuple})
    //@ts-expect-error
    sample({clock:stringClockReadonlyTuple , target:anyTargetReadonlyTuple    })
    //@ts-expect-error
    sample({clock:stringClockReadonlyTuple , target:voidTargetReadonlyTuple   })
    //@ts-expect-error
    sample({clock:stringClockReadonlyTuple , target:neverTargetReadonlyTuple  })
    //@ts-expect-error
    sample({clock:unknownClockReadonlyTuple, target:numberTargetReadonlyTuple })
    //@ts-expect-error
    sample({clock:unknownClockReadonlyTuple, target:stringTargetReadonlyTuple })
    //@ts-expect-error
    sample({clock:unknownClockReadonlyTuple, target:unknownTargetReadonlyTuple})
    //@ts-expect-error
    sample({clock:unknownClockReadonlyTuple, target:anyTargetReadonlyTuple    })
    //@ts-expect-error
    sample({clock:unknownClockReadonlyTuple, target:voidTargetReadonlyTuple   })
    //@ts-expect-error
    sample({clock:unknownClockReadonlyTuple, target:neverTargetReadonlyTuple  })
    //@ts-expect-error
    sample({clock:anyClockReadonlyTuple    , target:numberTargetReadonlyTuple })
    //@ts-expect-error
    sample({clock:anyClockReadonlyTuple    , target:stringTargetReadonlyTuple })
    //@ts-expect-error
    sample({clock:anyClockReadonlyTuple    , target:unknownTargetReadonlyTuple})
    //@ts-expect-error
    sample({clock:anyClockReadonlyTuple    , target:anyTargetReadonlyTuple    })
    //@ts-expect-error
    sample({clock:anyClockReadonlyTuple    , target:voidTargetReadonlyTuple   })
    //@ts-expect-error
    sample({clock:anyClockReadonlyTuple    , target:neverTargetReadonlyTuple  })
    //@ts-expect-error
    sample({clock:voidClockReadonlyTuple   , target:numberTargetReadonlyTuple })
    //@ts-expect-error
    sample({clock:voidClockReadonlyTuple   , target:stringTargetReadonlyTuple })
    //@ts-expect-error
    sample({clock:voidClockReadonlyTuple   , target:unknownTargetReadonlyTuple})
    //@ts-expect-error
    sample({clock:voidClockReadonlyTuple   , target:anyTargetReadonlyTuple    })
    //@ts-expect-error
    sample({clock:voidClockReadonlyTuple   , target:voidTargetReadonlyTuple   })
    //@ts-expect-error
    sample({clock:voidClockReadonlyTuple   , target:neverTargetReadonlyTuple  })
    //@ts-expect-error
    sample({clock:neverClockReadonlyTuple  , target:numberTargetReadonlyTuple })
    //@ts-expect-error
    sample({clock:neverClockReadonlyTuple  , target:stringTargetReadonlyTuple })
    //@ts-expect-error
    sample({clock:neverClockReadonlyTuple  , target:unknownTargetReadonlyTuple})
    //@ts-expect-error
    sample({clock:neverClockReadonlyTuple  , target:anyTargetReadonlyTuple    })
    //@ts-expect-error
    sample({clock:neverClockReadonlyTuple  , target:voidTargetReadonlyTuple   })
    //@ts-expect-error
    sample({clock:neverClockReadonlyTuple  , target:neverTargetReadonlyTuple  })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    The type 'readonly [EventCallable<number>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<number>]'.
    The type 'readonly [EventCallable<number>]' is 'readonly' and cannot be assigned to the mutable type '[Unit<string>]'.
    Type 'readonly [EventCallable<string>]' is not assignable to type 'readonly [UnitTargetable<number>]'.
      Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
    The type 'readonly [EventCallable<number>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<number>]'.
    The type 'readonly [EventCallable<number>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<number>]'.
    The type 'readonly [EventCallable<number>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<number>]'.
    The type 'readonly [EventCallable<number>]' is 'readonly' and cannot be assigned to the mutable type '[Unit<never>]'.
    The type 'readonly [EventCallable<string>]' is 'readonly' and cannot be assigned to the mutable type '[Unit<number>]'.
    Type 'readonly [EventCallable<number>]' is not assignable to type 'readonly [UnitTargetable<string>]'.
      Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
    The type 'readonly [EventCallable<string>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<string>]'.
    The type 'readonly [EventCallable<string>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<string>]'.
    The type 'readonly [EventCallable<string>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<string>]'.
    The type 'readonly [EventCallable<string>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<string>]'.
    The type 'readonly [EventCallable<string>]' is 'readonly' and cannot be assigned to the mutable type '[Unit<never>]'.
    The type 'readonly [EventCallable<unknown>]' is 'readonly' and cannot be assigned to the mutable type '[Unit<number>]'.
    The type 'readonly [EventCallable<unknown>]' is 'readonly' and cannot be assigned to the mutable type '[Unit<string>]'.
    The type 'readonly [EventCallable<unknown>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<unknown>]'.
    The type 'readonly [EventCallable<unknown>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<unknown>]'.
    The type 'readonly [EventCallable<unknown>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<unknown>]'.
    The type 'readonly [EventCallable<unknown>]' is 'readonly' and cannot be assigned to the mutable type '[Unit<never>]'.
    The type 'readonly [EventCallable<any>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<any>]'.
    The type 'readonly [EventCallable<any>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<any>]'.
    The type 'readonly [EventCallable<any>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<any>]'.
    The type 'readonly [EventCallable<any>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<any>]'.
    The type 'readonly [EventCallable<any>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<any>]'.
    The type 'readonly [EventCallable<any>]' is 'readonly' and cannot be assigned to the mutable type '[Unit<never>]'.
    The type 'readonly [EventCallable<void>]' is 'readonly' and cannot be assigned to the mutable type '[Unit<number>]'.
    Type 'readonly [EventCallable<number>]' is not assignable to type 'readonly [UnitTargetable<void>]'.
      Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
    The type 'readonly [EventCallable<void>]' is 'readonly' and cannot be assigned to the mutable type '[Unit<string>]'.
    Type 'readonly [EventCallable<string>]' is not assignable to type 'readonly [UnitTargetable<void>]'.
      Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
    The type 'readonly [EventCallable<void>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<void>]'.
    The type 'readonly [EventCallable<void>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<void>]'.
    The type 'readonly [EventCallable<void>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<void>]'.
    The type 'readonly [EventCallable<void>]' is 'readonly' and cannot be assigned to the mutable type '[Unit<never>]'.
    The type 'readonly [EventCallable<never>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<never>]'.
    The type 'readonly [EventCallable<never>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<never>]'.
    The type 'readonly [EventCallable<never>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<never>]'.
    The type 'readonly [EventCallable<never>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<never>]'.
    The type 'readonly [EventCallable<never>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<never>]'.
    The type 'readonly [EventCallable<never>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<never>]'.
    "
  `)
})
test('readonlyTuple/readonlyTuple, Boolean filter (should fail)', () => {
  //prettier-ignore
  {
    //@ts-expect-error
    sample({clock:numberClockReadonlyTuple , filter:Boolean, target:numberTargetReadonlyTuple })
    //@ts-expect-error
    sample({clock:numberClockReadonlyTuple , filter:Boolean, target:stringTargetReadonlyTuple })
    //@ts-expect-error
    sample({clock:numberClockReadonlyTuple , filter:Boolean, target:unknownTargetReadonlyTuple})
    //@ts-expect-error
    sample({clock:numberClockReadonlyTuple , filter:Boolean, target:anyTargetReadonlyTuple    })
    //@ts-expect-error
    sample({clock:numberClockReadonlyTuple , filter:Boolean, target:voidTargetReadonlyTuple   })
    //@ts-expect-error
    sample({clock:numberClockReadonlyTuple , filter:Boolean, target:neverTargetReadonlyTuple  })
    //@ts-expect-error
    sample({clock:stringClockReadonlyTuple , filter:Boolean, target:numberTargetReadonlyTuple })
    //@ts-expect-error
    sample({clock:stringClockReadonlyTuple , filter:Boolean, target:stringTargetReadonlyTuple })
    //@ts-expect-error
    sample({clock:stringClockReadonlyTuple , filter:Boolean, target:unknownTargetReadonlyTuple})
    //@ts-expect-error
    sample({clock:stringClockReadonlyTuple , filter:Boolean, target:anyTargetReadonlyTuple    })
    //@ts-expect-error
    sample({clock:stringClockReadonlyTuple , filter:Boolean, target:voidTargetReadonlyTuple   })
    //@ts-expect-error
    sample({clock:stringClockReadonlyTuple , filter:Boolean, target:neverTargetReadonlyTuple  })
    //@ts-expect-error
    sample({clock:unknownClockReadonlyTuple, filter:Boolean, target:numberTargetReadonlyTuple })
    //@ts-expect-error
    sample({clock:unknownClockReadonlyTuple, filter:Boolean, target:stringTargetReadonlyTuple })
    //@ts-expect-error
    sample({clock:unknownClockReadonlyTuple, filter:Boolean, target:unknownTargetReadonlyTuple})
    //@ts-expect-error
    sample({clock:unknownClockReadonlyTuple, filter:Boolean, target:anyTargetReadonlyTuple    })
    //@ts-expect-error
    sample({clock:unknownClockReadonlyTuple, filter:Boolean, target:voidTargetReadonlyTuple   })
    //@ts-expect-error
    sample({clock:unknownClockReadonlyTuple, filter:Boolean, target:neverTargetReadonlyTuple  })
    //@ts-expect-error
    sample({clock:anyClockReadonlyTuple    , filter:Boolean, target:numberTargetReadonlyTuple })
    //@ts-expect-error
    sample({clock:anyClockReadonlyTuple    , filter:Boolean, target:stringTargetReadonlyTuple })
    //@ts-expect-error
    sample({clock:anyClockReadonlyTuple    , filter:Boolean, target:unknownTargetReadonlyTuple})
    //@ts-expect-error
    sample({clock:anyClockReadonlyTuple    , filter:Boolean, target:anyTargetReadonlyTuple    })
    //@ts-expect-error
    sample({clock:anyClockReadonlyTuple    , filter:Boolean, target:voidTargetReadonlyTuple   })
    //@ts-expect-error
    sample({clock:anyClockReadonlyTuple    , filter:Boolean, target:neverTargetReadonlyTuple  })
    //@ts-expect-error
    sample({clock:voidClockReadonlyTuple   , filter:Boolean, target:numberTargetReadonlyTuple })
    //@ts-expect-error
    sample({clock:voidClockReadonlyTuple   , filter:Boolean, target:stringTargetReadonlyTuple })
    //@ts-expect-error
    sample({clock:voidClockReadonlyTuple   , filter:Boolean, target:unknownTargetReadonlyTuple})
    //@ts-expect-error
    sample({clock:voidClockReadonlyTuple   , filter:Boolean, target:anyTargetReadonlyTuple    })
    //@ts-expect-error
    sample({clock:voidClockReadonlyTuple   , filter:Boolean, target:voidTargetReadonlyTuple   })
    //@ts-expect-error
    sample({clock:voidClockReadonlyTuple   , filter:Boolean, target:neverTargetReadonlyTuple  })
    //@ts-expect-error
    sample({clock:neverClockReadonlyTuple  , filter:Boolean, target:numberTargetReadonlyTuple })
    //@ts-expect-error
    sample({clock:neverClockReadonlyTuple  , filter:Boolean, target:stringTargetReadonlyTuple })
    //@ts-expect-error
    sample({clock:neverClockReadonlyTuple  , filter:Boolean, target:unknownTargetReadonlyTuple})
    //@ts-expect-error
    sample({clock:neverClockReadonlyTuple  , filter:Boolean, target:anyTargetReadonlyTuple    })
    //@ts-expect-error
    sample({clock:neverClockReadonlyTuple  , filter:Boolean, target:voidTargetReadonlyTuple   })
    //@ts-expect-error
    sample({clock:neverClockReadonlyTuple  , filter:Boolean, target:neverTargetReadonlyTuple  })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    The type 'readonly [EventCallable<number>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<number>]'.
    The type 'readonly [EventCallable<number>]' is 'readonly' and cannot be assigned to the mutable type '[Unit<string>]'.
    Type 'readonly [EventCallable<string>]' is not assignable to type 'readonly [UnitTargetable<number>]'.
      Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
    The type 'readonly [EventCallable<number>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<number>]'.
    The type 'readonly [EventCallable<number>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<number>]'.
    The type 'readonly [EventCallable<number>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<number>]'.
    The type 'readonly [EventCallable<number>]' is 'readonly' and cannot be assigned to the mutable type '[Unit<never>]'.
    The type 'readonly [EventCallable<string>]' is 'readonly' and cannot be assigned to the mutable type '[Unit<number>]'.
    Type 'readonly [EventCallable<number>]' is not assignable to type 'readonly [UnitTargetable<string>]'.
      Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
    The type 'readonly [EventCallable<string>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<string>]'.
    The type 'readonly [EventCallable<string>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<string>]'.
    The type 'readonly [EventCallable<string>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<string>]'.
    The type 'readonly [EventCallable<string>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<string>]'.
    The type 'readonly [EventCallable<string>]' is 'readonly' and cannot be assigned to the mutable type '[Unit<never>]'.
    The type 'readonly [EventCallable<unknown>]' is 'readonly' and cannot be assigned to the mutable type '[Unit<number>]'.
    The type 'readonly [EventCallable<unknown>]' is 'readonly' and cannot be assigned to the mutable type '[Unit<string>]'.
    The type 'readonly [EventCallable<unknown>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<unknown>]'.
    The type 'readonly [EventCallable<unknown>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<unknown>]'.
    The type 'readonly [EventCallable<unknown>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<unknown>]'.
    The type 'readonly [EventCallable<unknown>]' is 'readonly' and cannot be assigned to the mutable type '[Unit<never>]'.
    The type 'readonly [EventCallable<any>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<any>]'.
    The type 'readonly [EventCallable<any>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<any>]'.
    The type 'readonly [EventCallable<any>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<any>]'.
    The type 'readonly [EventCallable<any>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<any>]'.
    The type 'readonly [EventCallable<any>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<any>]'.
    The type 'readonly [EventCallable<any>]' is 'readonly' and cannot be assigned to the mutable type '[Unit<never>]'.
    The type 'readonly [EventCallable<void>]' is 'readonly' and cannot be assigned to the mutable type '[Unit<number>]'.
    Type 'readonly [EventCallable<number>]' is not assignable to type 'readonly [UnitTargetable<void>]'.
      Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
    The type 'readonly [EventCallable<void>]' is 'readonly' and cannot be assigned to the mutable type '[Unit<string>]'.
    Type 'readonly [EventCallable<string>]' is not assignable to type 'readonly [UnitTargetable<void>]'.
      Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
    The type 'readonly [EventCallable<void>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<void>]'.
    The type 'readonly [EventCallable<void>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<void>]'.
    The type 'readonly [EventCallable<void>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<void>]'.
    The type 'readonly [EventCallable<void>]' is 'readonly' and cannot be assigned to the mutable type '[Unit<never>]'.
    The type 'readonly [EventCallable<never>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<never>]'.
    The type 'readonly [EventCallable<never>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<never>]'.
    The type 'readonly [EventCallable<never>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<never>]'.
    The type 'readonly [EventCallable<never>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<never>]'.
    The type 'readonly [EventCallable<never>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<never>]'.
    The type 'readonly [EventCallable<never>]' is 'readonly' and cannot be assigned to the mutable type '[EventCallable<never>]'.
    "
  `)
})
test('readonlyArray/readonlyArray, none filter (should fail)', () => {
  //prettier-ignore
  {
    //@ts-expect-error
    sample({clock:numberClockReadonlyArray , target:numberTargetReadonlyArray })
    //@ts-expect-error
    sample({clock:numberClockReadonlyArray , target:stringTargetReadonlyArray })
    //@ts-expect-error
    sample({clock:numberClockReadonlyArray , target:unknownTargetReadonlyArray})
    //@ts-expect-error
    sample({clock:numberClockReadonlyArray , target:anyTargetReadonlyArray    })
    //@ts-expect-error
    sample({clock:numberClockReadonlyArray , target:voidTargetReadonlyArray   })
    //@ts-expect-error
    sample({clock:numberClockReadonlyArray , target:neverTargetReadonlyArray  })
    //@ts-expect-error
    sample({clock:stringClockReadonlyArray , target:numberTargetReadonlyArray })
    //@ts-expect-error
    sample({clock:stringClockReadonlyArray , target:stringTargetReadonlyArray })
    //@ts-expect-error
    sample({clock:stringClockReadonlyArray , target:unknownTargetReadonlyArray})
    //@ts-expect-error
    sample({clock:stringClockReadonlyArray , target:anyTargetReadonlyArray    })
    //@ts-expect-error
    sample({clock:stringClockReadonlyArray , target:voidTargetReadonlyArray   })
    //@ts-expect-error
    sample({clock:stringClockReadonlyArray , target:neverTargetReadonlyArray  })
    //@ts-expect-error
    sample({clock:unknownClockReadonlyArray, target:numberTargetReadonlyArray })
    //@ts-expect-error
    sample({clock:unknownClockReadonlyArray, target:stringTargetReadonlyArray })
    //@ts-expect-error
    sample({clock:unknownClockReadonlyArray, target:unknownTargetReadonlyArray})
    //@ts-expect-error
    sample({clock:unknownClockReadonlyArray, target:anyTargetReadonlyArray    })
    //@ts-expect-error
    sample({clock:unknownClockReadonlyArray, target:voidTargetReadonlyArray   })
    //@ts-expect-error
    sample({clock:unknownClockReadonlyArray, target:neverTargetReadonlyArray  })
    //@ts-expect-error
    sample({clock:anyClockReadonlyArray    , target:numberTargetReadonlyArray })
    //@ts-expect-error
    sample({clock:anyClockReadonlyArray    , target:stringTargetReadonlyArray })
    //@ts-expect-error
    sample({clock:anyClockReadonlyArray    , target:unknownTargetReadonlyArray})
    //@ts-expect-error
    sample({clock:anyClockReadonlyArray    , target:anyTargetReadonlyArray    })
    //@ts-expect-error
    sample({clock:anyClockReadonlyArray    , target:voidTargetReadonlyArray   })
    //@ts-expect-error
    sample({clock:anyClockReadonlyArray    , target:neverTargetReadonlyArray  })
    //@ts-expect-error
    sample({clock:voidClockReadonlyArray   , target:numberTargetReadonlyArray })
    //@ts-expect-error
    sample({clock:voidClockReadonlyArray   , target:stringTargetReadonlyArray })
    //@ts-expect-error
    sample({clock:voidClockReadonlyArray   , target:unknownTargetReadonlyArray})
    //@ts-expect-error
    sample({clock:voidClockReadonlyArray   , target:anyTargetReadonlyArray    })
    //@ts-expect-error
    sample({clock:voidClockReadonlyArray   , target:voidTargetReadonlyArray   })
    //@ts-expect-error
    sample({clock:voidClockReadonlyArray   , target:neverTargetReadonlyArray  })
    //@ts-expect-error
    sample({clock:neverClockReadonlyArray  , target:numberTargetReadonlyArray })
    //@ts-expect-error
    sample({clock:neverClockReadonlyArray  , target:stringTargetReadonlyArray })
    //@ts-expect-error
    sample({clock:neverClockReadonlyArray  , target:unknownTargetReadonlyArray})
    //@ts-expect-error
    sample({clock:neverClockReadonlyArray  , target:anyTargetReadonlyArray    })
    //@ts-expect-error
    sample({clock:neverClockReadonlyArray  , target:voidTargetReadonlyArray   })
    //@ts-expect-error
    sample({clock:neverClockReadonlyArray  , target:neverTargetReadonlyArray  })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Type 'readonly EventCallable<number>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<number>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<number>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<number>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<number>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<number>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<string>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<string>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<string>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<string>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<string>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<string>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<unknown>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<unknown>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<unknown>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<unknown>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<unknown>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<unknown>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<any>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<any>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<any>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<any>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<any>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<any>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<void>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<void>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<void>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<void>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<void>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<void>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<never>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<never>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<never>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<never>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<never>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<never>[]' is not assignable to type 'never'.
    "
  `)
})
test('readonlyArray/readonlyArray, Boolean filter (should fail)', () => {
  //prettier-ignore
  {
    //@ts-expect-error
    sample({clock:numberClockReadonlyArray , filter:Boolean, target:numberTargetReadonlyArray })
    //@ts-expect-error
    sample({clock:numberClockReadonlyArray , filter:Boolean, target:stringTargetReadonlyArray })
    //@ts-expect-error
    sample({clock:numberClockReadonlyArray , filter:Boolean, target:unknownTargetReadonlyArray})
    //@ts-expect-error
    sample({clock:numberClockReadonlyArray , filter:Boolean, target:anyTargetReadonlyArray    })
    //@ts-expect-error
    sample({clock:numberClockReadonlyArray , filter:Boolean, target:voidTargetReadonlyArray   })
    //@ts-expect-error
    sample({clock:numberClockReadonlyArray , filter:Boolean, target:neverTargetReadonlyArray  })
    //@ts-expect-error
    sample({clock:stringClockReadonlyArray , filter:Boolean, target:numberTargetReadonlyArray })
    //@ts-expect-error
    sample({clock:stringClockReadonlyArray , filter:Boolean, target:stringTargetReadonlyArray })
    //@ts-expect-error
    sample({clock:stringClockReadonlyArray , filter:Boolean, target:unknownTargetReadonlyArray})
    //@ts-expect-error
    sample({clock:stringClockReadonlyArray , filter:Boolean, target:anyTargetReadonlyArray    })
    //@ts-expect-error
    sample({clock:stringClockReadonlyArray , filter:Boolean, target:voidTargetReadonlyArray   })
    //@ts-expect-error
    sample({clock:stringClockReadonlyArray , filter:Boolean, target:neverTargetReadonlyArray  })
    //@ts-expect-error
    sample({clock:unknownClockReadonlyArray, filter:Boolean, target:numberTargetReadonlyArray })
    //@ts-expect-error
    sample({clock:unknownClockReadonlyArray, filter:Boolean, target:stringTargetReadonlyArray })
    //@ts-expect-error
    sample({clock:unknownClockReadonlyArray, filter:Boolean, target:unknownTargetReadonlyArray})
    //@ts-expect-error
    sample({clock:unknownClockReadonlyArray, filter:Boolean, target:anyTargetReadonlyArray    })
    //@ts-expect-error
    sample({clock:unknownClockReadonlyArray, filter:Boolean, target:voidTargetReadonlyArray   })
    //@ts-expect-error
    sample({clock:unknownClockReadonlyArray, filter:Boolean, target:neverTargetReadonlyArray  })
    //@ts-expect-error
    sample({clock:anyClockReadonlyArray    , filter:Boolean, target:numberTargetReadonlyArray })
    //@ts-expect-error
    sample({clock:anyClockReadonlyArray    , filter:Boolean, target:stringTargetReadonlyArray })
    //@ts-expect-error
    sample({clock:anyClockReadonlyArray    , filter:Boolean, target:unknownTargetReadonlyArray})
    //@ts-expect-error
    sample({clock:anyClockReadonlyArray    , filter:Boolean, target:anyTargetReadonlyArray    })
    //@ts-expect-error
    sample({clock:anyClockReadonlyArray    , filter:Boolean, target:voidTargetReadonlyArray   })
    //@ts-expect-error
    sample({clock:anyClockReadonlyArray    , filter:Boolean, target:neverTargetReadonlyArray  })
    //@ts-expect-error
    sample({clock:voidClockReadonlyArray   , filter:Boolean, target:numberTargetReadonlyArray })
    //@ts-expect-error
    sample({clock:voidClockReadonlyArray   , filter:Boolean, target:stringTargetReadonlyArray })
    //@ts-expect-error
    sample({clock:voidClockReadonlyArray   , filter:Boolean, target:unknownTargetReadonlyArray})
    //@ts-expect-error
    sample({clock:voidClockReadonlyArray   , filter:Boolean, target:anyTargetReadonlyArray    })
    //@ts-expect-error
    sample({clock:voidClockReadonlyArray   , filter:Boolean, target:voidTargetReadonlyArray   })
    //@ts-expect-error
    sample({clock:voidClockReadonlyArray   , filter:Boolean, target:neverTargetReadonlyArray  })
    //@ts-expect-error
    sample({clock:neverClockReadonlyArray  , filter:Boolean, target:numberTargetReadonlyArray })
    //@ts-expect-error
    sample({clock:neverClockReadonlyArray  , filter:Boolean, target:stringTargetReadonlyArray })
    //@ts-expect-error
    sample({clock:neverClockReadonlyArray  , filter:Boolean, target:unknownTargetReadonlyArray})
    //@ts-expect-error
    sample({clock:neverClockReadonlyArray  , filter:Boolean, target:anyTargetReadonlyArray    })
    //@ts-expect-error
    sample({clock:neverClockReadonlyArray  , filter:Boolean, target:voidTargetReadonlyArray   })
    //@ts-expect-error
    sample({clock:neverClockReadonlyArray  , filter:Boolean, target:neverTargetReadonlyArray  })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Type 'readonly EventCallable<number>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<number>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<number>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<number>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<number>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<number>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<string>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<string>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<string>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<string>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<string>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<string>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<unknown>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<unknown>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<unknown>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<unknown>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<unknown>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<unknown>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<any>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<any>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<any>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<any>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<any>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<any>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<void>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<void>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<void>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<void>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<void>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<void>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<never>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<never>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<never>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<never>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<never>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<never>[]' is not assignable to type 'never'.
    "
  `)
})
test('readonlyArray/mutable, none filter (should fail)', () => {
  //prettier-ignore
  {
    //@ts-expect-error
    sample({clock:numberClockReadonlyArray , target:numberTargetMutable })
    //@ts-expect-error
    sample({clock:numberClockReadonlyArray , target:stringTargetMutable })
    //@ts-expect-error
    sample({clock:numberClockReadonlyArray , target:unknownTargetMutable})
    //@ts-expect-error
    sample({clock:numberClockReadonlyArray , target:anyTargetMutable    })
    //@ts-expect-error
    sample({clock:numberClockReadonlyArray , target:voidTargetMutable   })
    //@ts-expect-error
    sample({clock:numberClockReadonlyArray , target:neverTargetMutable  })
    //@ts-expect-error
    sample({clock:stringClockReadonlyArray , target:numberTargetMutable })
    //@ts-expect-error
    sample({clock:stringClockReadonlyArray , target:stringTargetMutable })
    //@ts-expect-error
    sample({clock:stringClockReadonlyArray , target:unknownTargetMutable})
    //@ts-expect-error
    sample({clock:stringClockReadonlyArray , target:anyTargetMutable    })
    //@ts-expect-error
    sample({clock:stringClockReadonlyArray , target:voidTargetMutable   })
    //@ts-expect-error
    sample({clock:stringClockReadonlyArray , target:neverTargetMutable  })
    //@ts-expect-error
    sample({clock:unknownClockReadonlyArray, target:numberTargetMutable })
    //@ts-expect-error
    sample({clock:unknownClockReadonlyArray, target:stringTargetMutable })
    //@ts-expect-error
    sample({clock:unknownClockReadonlyArray, target:unknownTargetMutable})
    //@ts-expect-error
    sample({clock:unknownClockReadonlyArray, target:anyTargetMutable    })
    //@ts-expect-error
    sample({clock:unknownClockReadonlyArray, target:voidTargetMutable   })
    //@ts-expect-error
    sample({clock:unknownClockReadonlyArray, target:neverTargetMutable  })
    //@ts-expect-error
    sample({clock:anyClockReadonlyArray    , target:numberTargetMutable })
    //@ts-expect-error
    sample({clock:anyClockReadonlyArray    , target:stringTargetMutable })
    //@ts-expect-error
    sample({clock:anyClockReadonlyArray    , target:unknownTargetMutable})
    //@ts-expect-error
    sample({clock:anyClockReadonlyArray    , target:anyTargetMutable    })
    //@ts-expect-error
    sample({clock:anyClockReadonlyArray    , target:voidTargetMutable   })
    //@ts-expect-error
    sample({clock:anyClockReadonlyArray    , target:neverTargetMutable  })
    //@ts-expect-error
    sample({clock:voidClockReadonlyArray   , target:numberTargetMutable })
    //@ts-expect-error
    sample({clock:voidClockReadonlyArray   , target:stringTargetMutable })
    //@ts-expect-error
    sample({clock:voidClockReadonlyArray   , target:unknownTargetMutable})
    //@ts-expect-error
    sample({clock:voidClockReadonlyArray   , target:anyTargetMutable    })
    //@ts-expect-error
    sample({clock:voidClockReadonlyArray   , target:voidTargetMutable   })
    //@ts-expect-error
    sample({clock:voidClockReadonlyArray   , target:neverTargetMutable  })
    //@ts-expect-error
    sample({clock:neverClockReadonlyArray  , target:numberTargetMutable })
    //@ts-expect-error
    sample({clock:neverClockReadonlyArray  , target:stringTargetMutable })
    //@ts-expect-error
    sample({clock:neverClockReadonlyArray  , target:unknownTargetMutable})
    //@ts-expect-error
    sample({clock:neverClockReadonlyArray  , target:anyTargetMutable    })
    //@ts-expect-error
    sample({clock:neverClockReadonlyArray  , target:voidTargetMutable   })
    //@ts-expect-error
    sample({clock:neverClockReadonlyArray  , target:neverTargetMutable  })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Type 'readonly EventCallable<number>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<number>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<number>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<number>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<number>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<number>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<string>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<string>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<string>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<string>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<string>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<string>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<unknown>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<unknown>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<unknown>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<unknown>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<unknown>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<unknown>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<any>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<any>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<any>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<any>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<any>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<any>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<void>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<void>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<void>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<void>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<void>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<void>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<never>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<never>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<never>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<never>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<never>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<never>[]' is not assignable to type 'never'.
    "
  `)
})
test('readonlyArray/mutable, Boolean filter (should fail)', () => {
  //prettier-ignore
  {
    //@ts-expect-error
    sample({clock:numberClockReadonlyArray , filter:Boolean, target:numberTargetMutable })
    //@ts-expect-error
    sample({clock:numberClockReadonlyArray , filter:Boolean, target:stringTargetMutable })
    //@ts-expect-error
    sample({clock:numberClockReadonlyArray , filter:Boolean, target:unknownTargetMutable})
    //@ts-expect-error
    sample({clock:numberClockReadonlyArray , filter:Boolean, target:anyTargetMutable    })
    //@ts-expect-error
    sample({clock:numberClockReadonlyArray , filter:Boolean, target:voidTargetMutable   })
    //@ts-expect-error
    sample({clock:numberClockReadonlyArray , filter:Boolean, target:neverTargetMutable  })
    //@ts-expect-error
    sample({clock:stringClockReadonlyArray , filter:Boolean, target:numberTargetMutable })
    //@ts-expect-error
    sample({clock:stringClockReadonlyArray , filter:Boolean, target:stringTargetMutable })
    //@ts-expect-error
    sample({clock:stringClockReadonlyArray , filter:Boolean, target:unknownTargetMutable})
    //@ts-expect-error
    sample({clock:stringClockReadonlyArray , filter:Boolean, target:anyTargetMutable    })
    //@ts-expect-error
    sample({clock:stringClockReadonlyArray , filter:Boolean, target:voidTargetMutable   })
    //@ts-expect-error
    sample({clock:stringClockReadonlyArray , filter:Boolean, target:neverTargetMutable  })
    //@ts-expect-error
    sample({clock:unknownClockReadonlyArray, filter:Boolean, target:numberTargetMutable })
    //@ts-expect-error
    sample({clock:unknownClockReadonlyArray, filter:Boolean, target:stringTargetMutable })
    //@ts-expect-error
    sample({clock:unknownClockReadonlyArray, filter:Boolean, target:unknownTargetMutable})
    //@ts-expect-error
    sample({clock:unknownClockReadonlyArray, filter:Boolean, target:anyTargetMutable    })
    //@ts-expect-error
    sample({clock:unknownClockReadonlyArray, filter:Boolean, target:voidTargetMutable   })
    //@ts-expect-error
    sample({clock:unknownClockReadonlyArray, filter:Boolean, target:neverTargetMutable  })
    //@ts-expect-error
    sample({clock:anyClockReadonlyArray    , filter:Boolean, target:numberTargetMutable })
    //@ts-expect-error
    sample({clock:anyClockReadonlyArray    , filter:Boolean, target:stringTargetMutable })
    //@ts-expect-error
    sample({clock:anyClockReadonlyArray    , filter:Boolean, target:unknownTargetMutable})
    //@ts-expect-error
    sample({clock:anyClockReadonlyArray    , filter:Boolean, target:anyTargetMutable    })
    //@ts-expect-error
    sample({clock:anyClockReadonlyArray    , filter:Boolean, target:voidTargetMutable   })
    //@ts-expect-error
    sample({clock:anyClockReadonlyArray    , filter:Boolean, target:neverTargetMutable  })
    //@ts-expect-error
    sample({clock:voidClockReadonlyArray   , filter:Boolean, target:numberTargetMutable })
    //@ts-expect-error
    sample({clock:voidClockReadonlyArray   , filter:Boolean, target:stringTargetMutable })
    //@ts-expect-error
    sample({clock:voidClockReadonlyArray   , filter:Boolean, target:unknownTargetMutable})
    //@ts-expect-error
    sample({clock:voidClockReadonlyArray   , filter:Boolean, target:anyTargetMutable    })
    //@ts-expect-error
    sample({clock:voidClockReadonlyArray   , filter:Boolean, target:voidTargetMutable   })
    //@ts-expect-error
    sample({clock:voidClockReadonlyArray   , filter:Boolean, target:neverTargetMutable  })
    //@ts-expect-error
    sample({clock:neverClockReadonlyArray  , filter:Boolean, target:numberTargetMutable })
    //@ts-expect-error
    sample({clock:neverClockReadonlyArray  , filter:Boolean, target:stringTargetMutable })
    //@ts-expect-error
    sample({clock:neverClockReadonlyArray  , filter:Boolean, target:unknownTargetMutable})
    //@ts-expect-error
    sample({clock:neverClockReadonlyArray  , filter:Boolean, target:anyTargetMutable    })
    //@ts-expect-error
    sample({clock:neverClockReadonlyArray  , filter:Boolean, target:voidTargetMutable   })
    //@ts-expect-error
    sample({clock:neverClockReadonlyArray  , filter:Boolean, target:neverTargetMutable  })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Type 'readonly EventCallable<number>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<number>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<number>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<number>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<number>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<number>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<string>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<string>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<string>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<string>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<string>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<string>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<unknown>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<unknown>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<unknown>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<unknown>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<unknown>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<unknown>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<any>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<any>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<any>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<any>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<any>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<any>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<void>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<void>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<void>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<void>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<void>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<void>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<never>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<never>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<never>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<never>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<never>[]' is not assignable to type 'never'.
    Type 'readonly EventCallable<never>[]' is not assignable to type 'never'.
    "
  `)
})
describe('mutable/readonlyArray, none filter', () => {
  test('mutable/readonlyArray, none filter (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:numberClockMutable , target:numberTargetReadonlyArray })
      sample({clock:numberClockMutable , target:unknownTargetReadonlyArray})
      sample({clock:numberClockMutable , target:anyTargetReadonlyArray    })
      sample({clock:numberClockMutable , target:voidTargetReadonlyArray   })
      sample({clock:stringClockMutable , target:stringTargetReadonlyArray })
      sample({clock:stringClockMutable , target:unknownTargetReadonlyArray})
      sample({clock:stringClockMutable , target:anyTargetReadonlyArray    })
      sample({clock:stringClockMutable , target:voidTargetReadonlyArray   })
      sample({clock:unknownClockMutable, target:unknownTargetReadonlyArray})
      sample({clock:unknownClockMutable, target:anyTargetReadonlyArray    })
      sample({clock:unknownClockMutable, target:voidTargetReadonlyArray   })
      sample({clock:anyClockMutable    , target:numberTargetReadonlyArray })
      sample({clock:anyClockMutable    , target:stringTargetReadonlyArray })
      sample({clock:anyClockMutable    , target:unknownTargetReadonlyArray})
      sample({clock:anyClockMutable    , target:anyTargetReadonlyArray    })
      sample({clock:anyClockMutable    , target:voidTargetReadonlyArray   })
      sample({clock:voidClockMutable   , target:unknownTargetReadonlyArray})
      sample({clock:voidClockMutable   , target:anyTargetReadonlyArray    })
      sample({clock:voidClockMutable   , target:voidTargetReadonlyArray   })
      sample({clock:neverClockMutable  , target:numberTargetReadonlyArray })
      sample({clock:neverClockMutable  , target:stringTargetReadonlyArray })
      sample({clock:neverClockMutable  , target:unknownTargetReadonlyArray})
      sample({clock:neverClockMutable  , target:anyTargetReadonlyArray    })
      sample({clock:neverClockMutable  , target:voidTargetReadonlyArray   })
      sample({clock:neverClockMutable  , target:neverTargetReadonlyArray  })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('mutable/readonlyArray, none filter (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: numberClockMutable,
        //@ts-expect-error
        target: stringTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: numberClockMutable,
        //@ts-expect-error
        target: neverTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: stringClockMutable,
        //@ts-expect-error
        target: numberTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: stringClockMutable,
        //@ts-expect-error
        target: neverTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: unknownClockMutable,
        //@ts-expect-error
        target: numberTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: unknownClockMutable,
        //@ts-expect-error
        target: stringTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: unknownClockMutable,
        //@ts-expect-error
        target: neverTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: anyClockMutable,
        //@ts-expect-error
        target: neverTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: voidClockMutable,
        //@ts-expect-error
        target: numberTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: voidClockMutable,
        //@ts-expect-error
        target: stringTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: voidClockMutable,
        //@ts-expect-error
        target: neverTargetReadonlyArray,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      lack of expected error at test line 5 'clock: numberClockMutable,'
      lack of expected error at test line 7 'target: stringTargetReadonlyArray,'
      lack of expected error at test line 11 'clock: numberClockMutable,'
      lack of expected error at test line 13 'target: neverTargetReadonlyArray,'
      lack of expected error at test line 17 'clock: stringClockMutable,'
      lack of expected error at test line 19 'target: numberTargetReadonlyArray,'
      lack of expected error at test line 23 'clock: stringClockMutable,'
      lack of expected error at test line 25 'target: neverTargetReadonlyArray,'
      lack of expected error at test line 29 'clock: unknownClockMutable,'
      lack of expected error at test line 31 'target: numberTargetReadonlyArray,'
      lack of expected error at test line 35 'clock: unknownClockMutable,'
      lack of expected error at test line 37 'target: stringTargetReadonlyArray,'
      lack of expected error at test line 41 'clock: unknownClockMutable,'
      lack of expected error at test line 43 'target: neverTargetReadonlyArray,'
      lack of expected error at test line 47 'clock: anyClockMutable,'
      lack of expected error at test line 49 'target: neverTargetReadonlyArray,'
      lack of expected error at test line 53 'clock: voidClockMutable,'
      lack of expected error at test line 55 'target: numberTargetReadonlyArray,'
      lack of expected error at test line 59 'clock: voidClockMutable,'
      lack of expected error at test line 61 'target: stringTargetReadonlyArray,'
      lack of expected error at test line 65 'clock: voidClockMutable,'
      lack of expected error at test line 67 'target: neverTargetReadonlyArray,'
      "
    `)
  })
})
describe('mutable/readonlyArray, Boolean filter', () => {
  test('mutable/readonlyArray, Boolean filter (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:numberClockMutable , filter:Boolean, target:numberTargetReadonlyArray })
      sample({clock:numberClockMutable , filter:Boolean, target:unknownTargetReadonlyArray})
      sample({clock:numberClockMutable , filter:Boolean, target:anyTargetReadonlyArray    })
      sample({clock:numberClockMutable , filter:Boolean, target:voidTargetReadonlyArray   })
      sample({clock:stringClockMutable , filter:Boolean, target:stringTargetReadonlyArray })
      sample({clock:stringClockMutable , filter:Boolean, target:unknownTargetReadonlyArray})
      sample({clock:stringClockMutable , filter:Boolean, target:anyTargetReadonlyArray    })
      sample({clock:stringClockMutable , filter:Boolean, target:voidTargetReadonlyArray   })
      sample({clock:unknownClockMutable, filter:Boolean, target:unknownTargetReadonlyArray})
      sample({clock:unknownClockMutable, filter:Boolean, target:anyTargetReadonlyArray    })
      sample({clock:unknownClockMutable, filter:Boolean, target:voidTargetReadonlyArray   })
      sample({clock:anyClockMutable    , filter:Boolean, target:numberTargetReadonlyArray })
      sample({clock:anyClockMutable    , filter:Boolean, target:stringTargetReadonlyArray })
      sample({clock:anyClockMutable    , filter:Boolean, target:unknownTargetReadonlyArray})
      sample({clock:anyClockMutable    , filter:Boolean, target:anyTargetReadonlyArray    })
      sample({clock:anyClockMutable    , filter:Boolean, target:voidTargetReadonlyArray   })
      sample({clock:voidClockMutable   , filter:Boolean, target:unknownTargetReadonlyArray})
      sample({clock:voidClockMutable   , filter:Boolean, target:anyTargetReadonlyArray    })
      sample({clock:voidClockMutable   , filter:Boolean, target:voidTargetReadonlyArray   })
      sample({clock:neverClockMutable  , filter:Boolean, target:numberTargetReadonlyArray })
      sample({clock:neverClockMutable  , filter:Boolean, target:stringTargetReadonlyArray })
      sample({clock:neverClockMutable  , filter:Boolean, target:unknownTargetReadonlyArray})
      sample({clock:neverClockMutable  , filter:Boolean, target:anyTargetReadonlyArray    })
      sample({clock:neverClockMutable  , filter:Boolean, target:voidTargetReadonlyArray   })
      sample({clock:neverClockMutable  , filter:Boolean, target:neverTargetReadonlyArray  })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('mutable/readonlyArray, Boolean filter (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: numberClockMutable,
        filter: Boolean,
        //@ts-expect-error
        target: stringTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: numberClockMutable,
        filter: Boolean,
        //@ts-expect-error
        target: neverTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: stringClockMutable,
        filter: Boolean,
        //@ts-expect-error
        target: numberTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: stringClockMutable,
        filter: Boolean,
        //@ts-expect-error
        target: neverTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: unknownClockMutable,
        filter: Boolean,
        //@ts-expect-error
        target: numberTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: unknownClockMutable,
        filter: Boolean,
        //@ts-expect-error
        target: stringTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: unknownClockMutable,
        filter: Boolean,
        //@ts-expect-error
        target: neverTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: anyClockMutable,
        filter: Boolean,
        //@ts-expect-error
        target: neverTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: voidClockMutable,
        filter: Boolean,
        //@ts-expect-error
        target: numberTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: voidClockMutable,
        filter: Boolean,
        //@ts-expect-error
        target: stringTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: voidClockMutable,
        filter: Boolean,
        //@ts-expect-error
        target: neverTargetReadonlyArray,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      lack of expected error at test line 5 'clock: numberClockMutable,'
      lack of expected error at test line 8 'target: stringTargetReadonlyArray,'
      lack of expected error at test line 12 'clock: numberClockMutable,'
      lack of expected error at test line 15 'target: neverTargetReadonlyArray,'
      lack of expected error at test line 19 'clock: stringClockMutable,'
      lack of expected error at test line 22 'target: numberTargetReadonlyArray,'
      lack of expected error at test line 26 'clock: stringClockMutable,'
      lack of expected error at test line 29 'target: neverTargetReadonlyArray,'
      lack of expected error at test line 33 'clock: unknownClockMutable,'
      lack of expected error at test line 36 'target: numberTargetReadonlyArray,'
      lack of expected error at test line 40 'clock: unknownClockMutable,'
      lack of expected error at test line 43 'target: stringTargetReadonlyArray,'
      lack of expected error at test line 47 'clock: unknownClockMutable,'
      lack of expected error at test line 50 'target: neverTargetReadonlyArray,'
      lack of expected error at test line 54 'clock: anyClockMutable,'
      lack of expected error at test line 57 'target: neverTargetReadonlyArray,'
      lack of expected error at test line 61 'clock: voidClockMutable,'
      lack of expected error at test line 64 'target: numberTargetReadonlyArray,'
      lack of expected error at test line 68 'clock: voidClockMutable,'
      lack of expected error at test line 71 'target: stringTargetReadonlyArray,'
      lack of expected error at test line 75 'clock: voidClockMutable,'
      lack of expected error at test line 78 'target: neverTargetReadonlyArray,'
      "
    `)
  })
})
describe('mutable/mutable, none filter', () => {
  test('mutable/mutable, none filter (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:numberClockMutable , target:numberTargetMutable })
      sample({clock:numberClockMutable , target:unknownTargetMutable})
      sample({clock:numberClockMutable , target:anyTargetMutable    })
      sample({clock:numberClockMutable , target:voidTargetMutable   })
      sample({clock:stringClockMutable , target:stringTargetMutable })
      sample({clock:stringClockMutable , target:unknownTargetMutable})
      sample({clock:stringClockMutable , target:anyTargetMutable    })
      sample({clock:stringClockMutable , target:voidTargetMutable   })
      sample({clock:unknownClockMutable, target:unknownTargetMutable})
      sample({clock:unknownClockMutable, target:anyTargetMutable    })
      sample({clock:unknownClockMutable, target:voidTargetMutable   })
      sample({clock:anyClockMutable    , target:numberTargetMutable })
      sample({clock:anyClockMutable    , target:stringTargetMutable })
      sample({clock:anyClockMutable    , target:unknownTargetMutable})
      sample({clock:anyClockMutable    , target:anyTargetMutable    })
      sample({clock:anyClockMutable    , target:voidTargetMutable   })
      sample({clock:voidClockMutable   , target:unknownTargetMutable})
      sample({clock:voidClockMutable   , target:anyTargetMutable    })
      sample({clock:voidClockMutable   , target:voidTargetMutable   })
      sample({clock:neverClockMutable  , target:numberTargetMutable })
      sample({clock:neverClockMutable  , target:stringTargetMutable })
      sample({clock:neverClockMutable  , target:unknownTargetMutable})
      sample({clock:neverClockMutable  , target:anyTargetMutable    })
      sample({clock:neverClockMutable  , target:voidTargetMutable   })
      sample({clock:neverClockMutable  , target:neverTargetMutable  })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('mutable/mutable, none filter (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: numberClockMutable,
        //@ts-expect-error
        target: stringTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: numberClockMutable,
        //@ts-expect-error
        target: neverTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: stringClockMutable,
        //@ts-expect-error
        target: numberTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: stringClockMutable,
        //@ts-expect-error
        target: neverTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClockMutable,
        //@ts-expect-error
        target: numberTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClockMutable,
        //@ts-expect-error
        target: stringTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClockMutable,
        //@ts-expect-error
        target: neverTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: anyClockMutable,
        //@ts-expect-error
        target: neverTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: voidClockMutable,
        //@ts-expect-error
        target: numberTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: voidClockMutable,
        //@ts-expect-error
        target: stringTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: voidClockMutable,
        //@ts-expect-error
        target: neverTargetMutable,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      lack of expected error at test line 5 'clock: numberClockMutable,'
      lack of expected error at test line 7 'target: stringTargetMutable,'
      lack of expected error at test line 11 'clock: numberClockMutable,'
      lack of expected error at test line 13 'target: neverTargetMutable,'
      lack of expected error at test line 17 'clock: stringClockMutable,'
      lack of expected error at test line 19 'target: numberTargetMutable,'
      lack of expected error at test line 23 'clock: stringClockMutable,'
      lack of expected error at test line 25 'target: neverTargetMutable,'
      lack of expected error at test line 29 'clock: unknownClockMutable,'
      lack of expected error at test line 31 'target: numberTargetMutable,'
      lack of expected error at test line 35 'clock: unknownClockMutable,'
      lack of expected error at test line 37 'target: stringTargetMutable,'
      lack of expected error at test line 41 'clock: unknownClockMutable,'
      lack of expected error at test line 43 'target: neverTargetMutable,'
      lack of expected error at test line 47 'clock: anyClockMutable,'
      lack of expected error at test line 49 'target: neverTargetMutable,'
      lack of expected error at test line 53 'clock: voidClockMutable,'
      lack of expected error at test line 55 'target: numberTargetMutable,'
      lack of expected error at test line 59 'clock: voidClockMutable,'
      lack of expected error at test line 61 'target: stringTargetMutable,'
      lack of expected error at test line 65 'clock: voidClockMutable,'
      lack of expected error at test line 67 'target: neverTargetMutable,'
      "
    `)
  })
})
describe('mutable/mutable, Boolean filter', () => {
  test('mutable/mutable, Boolean filter (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:numberClockMutable , filter:Boolean, target:numberTargetMutable })
      sample({clock:numberClockMutable , filter:Boolean, target:unknownTargetMutable})
      sample({clock:numberClockMutable , filter:Boolean, target:anyTargetMutable    })
      sample({clock:numberClockMutable , filter:Boolean, target:voidTargetMutable   })
      sample({clock:stringClockMutable , filter:Boolean, target:stringTargetMutable })
      sample({clock:stringClockMutable , filter:Boolean, target:unknownTargetMutable})
      sample({clock:stringClockMutable , filter:Boolean, target:anyTargetMutable    })
      sample({clock:stringClockMutable , filter:Boolean, target:voidTargetMutable   })
      sample({clock:unknownClockMutable, filter:Boolean, target:unknownTargetMutable})
      sample({clock:unknownClockMutable, filter:Boolean, target:anyTargetMutable    })
      sample({clock:unknownClockMutable, filter:Boolean, target:voidTargetMutable   })
      sample({clock:anyClockMutable    , filter:Boolean, target:numberTargetMutable })
      sample({clock:anyClockMutable    , filter:Boolean, target:stringTargetMutable })
      sample({clock:anyClockMutable    , filter:Boolean, target:unknownTargetMutable})
      sample({clock:anyClockMutable    , filter:Boolean, target:anyTargetMutable    })
      sample({clock:anyClockMutable    , filter:Boolean, target:voidTargetMutable   })
      sample({clock:voidClockMutable   , filter:Boolean, target:unknownTargetMutable})
      sample({clock:voidClockMutable   , filter:Boolean, target:anyTargetMutable    })
      sample({clock:voidClockMutable   , filter:Boolean, target:voidTargetMutable   })
      sample({clock:neverClockMutable  , filter:Boolean, target:numberTargetMutable })
      sample({clock:neverClockMutable  , filter:Boolean, target:stringTargetMutable })
      sample({clock:neverClockMutable  , filter:Boolean, target:unknownTargetMutable})
      sample({clock:neverClockMutable  , filter:Boolean, target:anyTargetMutable    })
      sample({clock:neverClockMutable  , filter:Boolean, target:voidTargetMutable   })
      sample({clock:neverClockMutable  , filter:Boolean, target:neverTargetMutable  })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('mutable/mutable, Boolean filter (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: numberClockMutable,
        filter: Boolean,
        //@ts-expect-error
        target: stringTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: numberClockMutable,
        filter: Boolean,
        //@ts-expect-error
        target: neverTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: stringClockMutable,
        filter: Boolean,
        //@ts-expect-error
        target: numberTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: stringClockMutable,
        filter: Boolean,
        //@ts-expect-error
        target: neverTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClockMutable,
        filter: Boolean,
        //@ts-expect-error
        target: numberTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClockMutable,
        filter: Boolean,
        //@ts-expect-error
        target: stringTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClockMutable,
        filter: Boolean,
        //@ts-expect-error
        target: neverTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: anyClockMutable,
        filter: Boolean,
        //@ts-expect-error
        target: neverTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: voidClockMutable,
        filter: Boolean,
        //@ts-expect-error
        target: numberTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: voidClockMutable,
        filter: Boolean,
        //@ts-expect-error
        target: stringTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: voidClockMutable,
        filter: Boolean,
        //@ts-expect-error
        target: neverTargetMutable,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      lack of expected error at test line 5 'clock: numberClockMutable,'
      lack of expected error at test line 8 'target: stringTargetMutable,'
      lack of expected error at test line 12 'clock: numberClockMutable,'
      lack of expected error at test line 15 'target: neverTargetMutable,'
      lack of expected error at test line 19 'clock: stringClockMutable,'
      lack of expected error at test line 22 'target: numberTargetMutable,'
      lack of expected error at test line 26 'clock: stringClockMutable,'
      lack of expected error at test line 29 'target: neverTargetMutable,'
      lack of expected error at test line 33 'clock: unknownClockMutable,'
      lack of expected error at test line 36 'target: numberTargetMutable,'
      lack of expected error at test line 40 'clock: unknownClockMutable,'
      lack of expected error at test line 43 'target: stringTargetMutable,'
      lack of expected error at test line 47 'clock: unknownClockMutable,'
      lack of expected error at test line 50 'target: neverTargetMutable,'
      lack of expected error at test line 54 'clock: anyClockMutable,'
      lack of expected error at test line 57 'target: neverTargetMutable,'
      lack of expected error at test line 61 'clock: voidClockMutable,'
      lack of expected error at test line 64 'target: numberTargetMutable,'
      lack of expected error at test line 68 'clock: voidClockMutable,'
      lack of expected error at test line 71 'target: stringTargetMutable,'
      lack of expected error at test line 75 'clock: voidClockMutable,'
      lack of expected error at test line 78 'target: neverTargetMutable,'
      "
    `)
  })
})
describe('inline/unit, none filter', () => {
  test('inline/unit, none filter (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:[numberClock] , target:numberTarget })
      sample({clock:[numberClock] , target:unknownTarget})
      sample({clock:[numberClock] , target:anyTarget    })
      sample({clock:[numberClock] , target:voidTarget   })
      sample({clock:[stringClock] , target:stringTarget })
      sample({clock:[stringClock] , target:unknownTarget})
      sample({clock:[stringClock] , target:anyTarget    })
      sample({clock:[stringClock] , target:voidTarget   })
      sample({clock:[unknownClock], target:unknownTarget})
      sample({clock:[unknownClock], target:anyTarget    })
      sample({clock:[unknownClock], target:voidTarget   })
      sample({clock:[anyClock]    , target:numberTarget })
      sample({clock:[anyClock]    , target:stringTarget })
      sample({clock:[anyClock]    , target:unknownTarget})
      sample({clock:[anyClock]    , target:anyTarget    })
      sample({clock:[anyClock]    , target:voidTarget   })
      sample({clock:[voidClock]   , target:unknownTarget})
      sample({clock:[voidClock]   , target:anyTarget    })
      sample({clock:[voidClock]   , target:voidTarget   })
      sample({clock:[neverClock]  , target:numberTarget })
      sample({clock:[neverClock]  , target:stringTarget })
      sample({clock:[neverClock]  , target:unknownTarget})
      sample({clock:[neverClock]  , target:anyTarget    })
      sample({clock:[neverClock]  , target:voidTarget   })
      sample({clock:[neverClock]  , target:neverTarget  })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('inline/unit, none filter (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: [numberClock],
        //@ts-expect-error
        target: stringTarget,
      })
      sample({
        //@ts-expect-error
        clock: [numberClock],
        //@ts-expect-error
        target: neverTarget,
      })
      sample({
        //@ts-expect-error
        clock: [stringClock],
        //@ts-expect-error
        target: numberTarget,
      })
      sample({
        //@ts-expect-error
        clock: [stringClock],
        //@ts-expect-error
        target: neverTarget,
      })
      sample({
        //@ts-expect-error
        clock: [unknownClock],
        //@ts-expect-error
        target: numberTarget,
      })
      sample({
        //@ts-expect-error
        clock: [unknownClock],
        //@ts-expect-error
        target: stringTarget,
      })
      sample({
        //@ts-expect-error
        clock: [unknownClock],
        //@ts-expect-error
        target: neverTarget,
      })
      sample({
        //@ts-expect-error
        clock: [anyClock],
        //@ts-expect-error
        target: neverTarget,
      })
      sample({
        //@ts-expect-error
        clock: [voidClock],
        //@ts-expect-error
        target: numberTarget,
      })
      sample({
        //@ts-expect-error
        clock: [voidClock],
        //@ts-expect-error
        target: stringTarget,
      })
      sample({
        //@ts-expect-error
        clock: [voidClock],
        //@ts-expect-error
        target: neverTarget,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 13 'target: neverTarget,'
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 25 'target: neverTarget,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 31 'target: numberTarget,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 37 'target: stringTarget,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 43 'target: neverTarget,'
      Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'any' is not assignable to type 'never'.
      lack of expected error at test line 49 'target: neverTarget,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 67 'target: neverTarget,'
      "
    `)
  })
})
describe('inline/unit, Boolean filter', () => {
  test('inline/unit, Boolean filter (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:[numberClock] , filter:Boolean, target:numberTarget })
      sample({clock:[numberClock] , filter:Boolean, target:unknownTarget})
      sample({clock:[numberClock] , filter:Boolean, target:anyTarget    })
      sample({clock:[numberClock] , filter:Boolean, target:voidTarget   })
      sample({clock:[stringClock] , filter:Boolean, target:stringTarget })
      sample({clock:[stringClock] , filter:Boolean, target:unknownTarget})
      sample({clock:[stringClock] , filter:Boolean, target:anyTarget    })
      sample({clock:[stringClock] , filter:Boolean, target:voidTarget   })
      sample({clock:[unknownClock], filter:Boolean, target:unknownTarget})
      sample({clock:[unknownClock], filter:Boolean, target:anyTarget    })
      sample({clock:[unknownClock], filter:Boolean, target:voidTarget   })
      sample({clock:[anyClock]    , filter:Boolean, target:numberTarget })
      sample({clock:[anyClock]    , filter:Boolean, target:stringTarget })
      sample({clock:[anyClock]    , filter:Boolean, target:unknownTarget})
      sample({clock:[anyClock]    , filter:Boolean, target:anyTarget    })
      sample({clock:[anyClock]    , filter:Boolean, target:voidTarget   })
      sample({clock:[voidClock]   , filter:Boolean, target:unknownTarget})
      sample({clock:[voidClock]   , filter:Boolean, target:anyTarget    })
      sample({clock:[voidClock]   , filter:Boolean, target:voidTarget   })
      sample({clock:[neverClock]  , filter:Boolean, target:numberTarget })
      sample({clock:[neverClock]  , filter:Boolean, target:stringTarget })
      sample({clock:[neverClock]  , filter:Boolean, target:unknownTarget})
      sample({clock:[neverClock]  , filter:Boolean, target:anyTarget    })
      sample({clock:[neverClock]  , filter:Boolean, target:voidTarget   })
      sample({clock:[neverClock]  , filter:Boolean, target:neverTarget  })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('inline/unit, Boolean filter (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: [numberClock],
        filter: Boolean,
        //@ts-expect-error
        target: stringTarget,
      })
      sample({
        //@ts-expect-error
        clock: [numberClock],
        filter: Boolean,
        //@ts-expect-error
        target: neverTarget,
      })
      sample({
        //@ts-expect-error
        clock: [stringClock],
        filter: Boolean,
        //@ts-expect-error
        target: numberTarget,
      })
      sample({
        //@ts-expect-error
        clock: [stringClock],
        filter: Boolean,
        //@ts-expect-error
        target: neverTarget,
      })
      sample({
        //@ts-expect-error
        clock: [unknownClock],
        filter: Boolean,
        //@ts-expect-error
        target: numberTarget,
      })
      sample({
        //@ts-expect-error
        clock: [unknownClock],
        filter: Boolean,
        //@ts-expect-error
        target: stringTarget,
      })
      sample({
        //@ts-expect-error
        clock: [unknownClock],
        filter: Boolean,
        //@ts-expect-error
        target: neverTarget,
      })
      sample({
        //@ts-expect-error
        clock: [anyClock],
        filter: Boolean,
        //@ts-expect-error
        target: neverTarget,
      })
      sample({
        //@ts-expect-error
        clock: [voidClock],
        filter: Boolean,
        //@ts-expect-error
        target: numberTarget,
      })
      sample({
        //@ts-expect-error
        clock: [voidClock],
        filter: Boolean,
        //@ts-expect-error
        target: stringTarget,
      })
      sample({
        //@ts-expect-error
        clock: [voidClock],
        filter: Boolean,
        //@ts-expect-error
        target: neverTarget,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 15 'target: neverTarget,'
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 29 'target: neverTarget,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 36 'target: numberTarget,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 43 'target: stringTarget,'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 50 'target: neverTarget,'
      Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'any' is not assignable to type 'never'.
      lack of expected error at test line 57 'target: neverTarget,'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 78 'target: neverTarget,'
      "
    `)
  })
})
describe('inline/inline, none filter', () => {
  test('inline/inline, none filter (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:[numberClock] , target:[numberTarget] })
      sample({clock:[numberClock] , target:[unknownTarget]})
      sample({clock:[numberClock] , target:[anyTarget]    })
      sample({clock:[numberClock] , target:[voidTarget]   })
      sample({clock:[stringClock] , target:[stringTarget] })
      sample({clock:[stringClock] , target:[unknownTarget]})
      sample({clock:[stringClock] , target:[anyTarget]    })
      sample({clock:[stringClock] , target:[voidTarget]   })
      sample({clock:[unknownClock], target:[unknownTarget]})
      sample({clock:[unknownClock], target:[anyTarget]    })
      sample({clock:[unknownClock], target:[voidTarget]   })
      sample({clock:[anyClock]    , target:[numberTarget] })
      sample({clock:[anyClock]    , target:[stringTarget] })
      sample({clock:[anyClock]    , target:[unknownTarget]})
      sample({clock:[anyClock]    , target:[anyTarget]    })
      sample({clock:[anyClock]    , target:[voidTarget]   })
      sample({clock:[voidClock]   , target:[unknownTarget]})
      sample({clock:[voidClock]   , target:[anyTarget]    })
      sample({clock:[voidClock]   , target:[voidTarget]   })
      sample({clock:[neverClock]  , target:[numberTarget] })
      sample({clock:[neverClock]  , target:[stringTarget] })
      sample({clock:[neverClock]  , target:[unknownTarget]})
      sample({clock:[neverClock]  , target:[anyTarget]    })
      sample({clock:[neverClock]  , target:[voidTarget]   })
      sample({clock:[neverClock]  , target:[neverTarget]  })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('inline/inline, none filter (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: [numberClock],
        //@ts-expect-error
        target: [stringTarget],
      })
      sample({
        //@ts-expect-error
        clock: [numberClock],
        //@ts-expect-error
        target: [neverTarget],
      })
      sample({
        //@ts-expect-error
        clock: [stringClock],
        //@ts-expect-error
        target: [numberTarget],
      })
      sample({
        //@ts-expect-error
        clock: [stringClock],
        //@ts-expect-error
        target: [neverTarget],
      })
      sample({
        //@ts-expect-error
        clock: [unknownClock],
        //@ts-expect-error
        target: [numberTarget],
      })
      sample({
        //@ts-expect-error
        clock: [unknownClock],
        //@ts-expect-error
        target: [stringTarget],
      })
      sample({
        //@ts-expect-error
        clock: [unknownClock],
        //@ts-expect-error
        target: [neverTarget],
      })
      sample({
        //@ts-expect-error
        clock: [anyClock],
        //@ts-expect-error
        target: [neverTarget],
      })
      sample({
        //@ts-expect-error
        clock: [voidClock],
        //@ts-expect-error
        target: [numberTarget],
      })
      sample({
        //@ts-expect-error
        clock: [voidClock],
        //@ts-expect-error
        target: [stringTarget],
      })
      sample({
        //@ts-expect-error
        clock: [voidClock],
        //@ts-expect-error
        target: [neverTarget],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 13 'target: [neverTarget],'
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 25 'target: [neverTarget],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 31 'target: [numberTarget],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 37 'target: [stringTarget],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 43 'target: [neverTarget],'
      Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'any' is not assignable to type 'never'.
      lack of expected error at test line 49 'target: [neverTarget],'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 67 'target: [neverTarget],'
      "
    `)
  })
})
describe('inline/inline, Boolean filter', () => {
  test('inline/inline, Boolean filter (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:[numberClock] , filter:Boolean, target:[numberTarget] })
      sample({clock:[numberClock] , filter:Boolean, target:[unknownTarget]})
      sample({clock:[numberClock] , filter:Boolean, target:[anyTarget]    })
      sample({clock:[numberClock] , filter:Boolean, target:[voidTarget]   })
      sample({clock:[stringClock] , filter:Boolean, target:[stringTarget] })
      sample({clock:[stringClock] , filter:Boolean, target:[unknownTarget]})
      sample({clock:[stringClock] , filter:Boolean, target:[anyTarget]    })
      sample({clock:[stringClock] , filter:Boolean, target:[voidTarget]   })
      sample({clock:[unknownClock], filter:Boolean, target:[unknownTarget]})
      sample({clock:[unknownClock], filter:Boolean, target:[anyTarget]    })
      sample({clock:[unknownClock], filter:Boolean, target:[voidTarget]   })
      sample({clock:[anyClock]    , filter:Boolean, target:[numberTarget] })
      sample({clock:[anyClock]    , filter:Boolean, target:[stringTarget] })
      sample({clock:[anyClock]    , filter:Boolean, target:[unknownTarget]})
      sample({clock:[anyClock]    , filter:Boolean, target:[anyTarget]    })
      sample({clock:[anyClock]    , filter:Boolean, target:[voidTarget]   })
      sample({clock:[voidClock]   , filter:Boolean, target:[unknownTarget]})
      sample({clock:[voidClock]   , filter:Boolean, target:[anyTarget]    })
      sample({clock:[voidClock]   , filter:Boolean, target:[voidTarget]   })
      sample({clock:[neverClock]  , filter:Boolean, target:[numberTarget] })
      sample({clock:[neverClock]  , filter:Boolean, target:[stringTarget] })
      sample({clock:[neverClock]  , filter:Boolean, target:[unknownTarget]})
      sample({clock:[neverClock]  , filter:Boolean, target:[anyTarget]    })
      sample({clock:[neverClock]  , filter:Boolean, target:[voidTarget]   })
      sample({clock:[neverClock]  , filter:Boolean, target:[neverTarget]  })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('inline/inline, Boolean filter (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: [numberClock],
        filter: Boolean,
        //@ts-expect-error
        target: [stringTarget],
      })
      sample({
        //@ts-expect-error
        clock: [numberClock],
        filter: Boolean,
        //@ts-expect-error
        target: [neverTarget],
      })
      sample({
        //@ts-expect-error
        clock: [stringClock],
        filter: Boolean,
        //@ts-expect-error
        target: [numberTarget],
      })
      sample({
        //@ts-expect-error
        clock: [stringClock],
        filter: Boolean,
        //@ts-expect-error
        target: [neverTarget],
      })
      sample({
        //@ts-expect-error
        clock: [unknownClock],
        filter: Boolean,
        //@ts-expect-error
        target: [numberTarget],
      })
      sample({
        //@ts-expect-error
        clock: [unknownClock],
        filter: Boolean,
        //@ts-expect-error
        target: [stringTarget],
      })
      sample({
        //@ts-expect-error
        clock: [unknownClock],
        filter: Boolean,
        //@ts-expect-error
        target: [neverTarget],
      })
      sample({
        //@ts-expect-error
        clock: [anyClock],
        filter: Boolean,
        //@ts-expect-error
        target: [neverTarget],
      })
      sample({
        //@ts-expect-error
        clock: [voidClock],
        filter: Boolean,
        //@ts-expect-error
        target: [numberTarget],
      })
      sample({
        //@ts-expect-error
        clock: [voidClock],
        filter: Boolean,
        //@ts-expect-error
        target: [stringTarget],
      })
      sample({
        //@ts-expect-error
        clock: [voidClock],
        filter: Boolean,
        //@ts-expect-error
        target: [neverTarget],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      lack of expected error at test line 15 'target: [neverTarget],'
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      lack of expected error at test line 29 'target: [neverTarget],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      lack of expected error at test line 36 'target: [numberTarget],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      lack of expected error at test line 43 'target: [stringTarget],'
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      lack of expected error at test line 50 'target: [neverTarget],'
      Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'any' is not assignable to type 'never'.
      lack of expected error at test line 57 'target: [neverTarget],'
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      lack of expected error at test line 78 'target: [neverTarget],'
      "
    `)
  })
})
