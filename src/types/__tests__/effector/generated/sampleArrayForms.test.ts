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
        target: stringTarget,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        target: neverTarget,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        target: numberTarget,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        target: neverTarget,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        target: numberTarget,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        target: stringTarget,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        target: neverTarget,
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        target: neverTarget,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        target: numberTarget,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        target: stringTarget,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        target: neverTarget,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 6 'target: stringTarget,'
      Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 16 'target: numberTarget,'
      Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'any' is not assignable to type 'never'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      Unmarked error at test line 46 'target: numberTarget,'
      Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      Unmarked error at test line 51 'target: stringTarget,'
      Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
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
        target: stringTarget,
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        filter: Boolean,
        target: neverTarget,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        filter: Boolean,
        target: numberTarget,
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        filter: Boolean,
        target: neverTarget,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        filter: Boolean,
        target: numberTarget,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        filter: Boolean,
        target: stringTarget,
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        filter: Boolean,
        target: neverTarget,
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        filter: Boolean,
        target: neverTarget,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        filter: Boolean,
        target: numberTarget,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        filter: Boolean,
        target: stringTarget,
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        filter: Boolean,
        target: neverTarget,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 7 'target: stringTarget,'
      Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 19 'target: numberTarget,'
      Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'any' is not assignable to type 'never'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      Unmarked error at test line 55 'target: numberTarget,'
      Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      Unmarked error at test line 61 'target: stringTarget,'
      Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
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
        target: [stringTarget],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        target: [neverTarget],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        target: [numberTarget],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        target: [neverTarget],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        target: [numberTarget],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        target: [stringTarget],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        target: [neverTarget],
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        target: [neverTarget],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        target: [numberTarget],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        target: [stringTarget],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        target: [neverTarget],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 6 'target: [stringTarget],'
      Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 16 'target: [numberTarget],'
      Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'any' is not assignable to type 'never'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      Unmarked error at test line 46 'target: [numberTarget],'
      Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      Unmarked error at test line 51 'target: [stringTarget],'
      Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
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
        target: [stringTarget],
      })
      sample({
        //@ts-expect-error
        clock: numberClock,
        filter: Boolean,
        target: [neverTarget],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        filter: Boolean,
        target: [numberTarget],
      })
      sample({
        //@ts-expect-error
        clock: stringClock,
        filter: Boolean,
        target: [neverTarget],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        filter: Boolean,
        target: [numberTarget],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        filter: Boolean,
        target: [stringTarget],
      })
      sample({
        //@ts-expect-error
        clock: unknownClock,
        filter: Boolean,
        target: [neverTarget],
      })
      sample({
        //@ts-expect-error
        clock: anyClock,
        filter: Boolean,
        target: [neverTarget],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        filter: Boolean,
        target: [numberTarget],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        filter: Boolean,
        target: [stringTarget],
      })
      sample({
        //@ts-expect-error
        clock: voidClock,
        filter: Boolean,
        target: [neverTarget],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 7 'target: [stringTarget],'
      Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 19 'target: [numberTarget],'
      Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'any' is not assignable to type 'never'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      Unmarked error at test line 55 'target: [numberTarget],'
      Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      Unmarked error at test line 61 'target: [stringTarget],'
      Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      "
    `)
  })
})
describe('readonlyTuple/readonlyTuple, none filter', () => {
  test('readonlyTuple/readonlyTuple, none filter (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:numberClockReadonlyTuple , target:numberTargetReadonlyTuple })
      sample({clock:numberClockReadonlyTuple , target:unknownTargetReadonlyTuple})
      sample({clock:numberClockReadonlyTuple , target:anyTargetReadonlyTuple    })
      sample({clock:numberClockReadonlyTuple , target:voidTargetReadonlyTuple   })
      sample({clock:stringClockReadonlyTuple , target:stringTargetReadonlyTuple })
      sample({clock:stringClockReadonlyTuple , target:unknownTargetReadonlyTuple})
      sample({clock:stringClockReadonlyTuple , target:anyTargetReadonlyTuple    })
      sample({clock:stringClockReadonlyTuple , target:voidTargetReadonlyTuple   })
      sample({clock:unknownClockReadonlyTuple, target:unknownTargetReadonlyTuple})
      sample({clock:unknownClockReadonlyTuple, target:anyTargetReadonlyTuple    })
      sample({clock:unknownClockReadonlyTuple, target:voidTargetReadonlyTuple   })
      sample({clock:anyClockReadonlyTuple    , target:numberTargetReadonlyTuple })
      sample({clock:anyClockReadonlyTuple    , target:stringTargetReadonlyTuple })
      sample({clock:anyClockReadonlyTuple    , target:unknownTargetReadonlyTuple})
      sample({clock:anyClockReadonlyTuple    , target:anyTargetReadonlyTuple    })
      sample({clock:anyClockReadonlyTuple    , target:voidTargetReadonlyTuple   })
      sample({clock:voidClockReadonlyTuple   , target:unknownTargetReadonlyTuple})
      sample({clock:voidClockReadonlyTuple   , target:anyTargetReadonlyTuple    })
      sample({clock:voidClockReadonlyTuple   , target:voidTargetReadonlyTuple   })
      sample({clock:neverClockReadonlyTuple  , target:numberTargetReadonlyTuple })
      sample({clock:neverClockReadonlyTuple  , target:stringTargetReadonlyTuple })
      sample({clock:neverClockReadonlyTuple  , target:unknownTargetReadonlyTuple})
      sample({clock:neverClockReadonlyTuple  , target:anyTargetReadonlyTuple    })
      sample({clock:neverClockReadonlyTuple  , target:voidTargetReadonlyTuple   })
      sample({clock:neverClockReadonlyTuple  , target:neverTargetReadonlyTuple  })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('readonlyTuple/readonlyTuple, none filter (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: numberClockReadonlyTuple,
        target: stringTargetReadonlyTuple,
      })
      sample({
        //@ts-expect-error
        clock: numberClockReadonlyTuple,
        target: neverTargetReadonlyTuple,
      })
      sample({
        //@ts-expect-error
        clock: stringClockReadonlyTuple,
        target: numberTargetReadonlyTuple,
      })
      sample({
        //@ts-expect-error
        clock: stringClockReadonlyTuple,
        target: neverTargetReadonlyTuple,
      })
      sample({
        //@ts-expect-error
        clock: unknownClockReadonlyTuple,
        target: numberTargetReadonlyTuple,
      })
      sample({
        //@ts-expect-error
        clock: unknownClockReadonlyTuple,
        target: stringTargetReadonlyTuple,
      })
      sample({
        //@ts-expect-error
        clock: unknownClockReadonlyTuple,
        target: neverTargetReadonlyTuple,
      })
      sample({
        //@ts-expect-error
        clock: anyClockReadonlyTuple,
        target: neverTargetReadonlyTuple,
      })
      sample({
        //@ts-expect-error
        clock: voidClockReadonlyTuple,
        target: numberTargetReadonlyTuple,
      })
      sample({
        //@ts-expect-error
        clock: voidClockReadonlyTuple,
        target: stringTargetReadonlyTuple,
      })
      sample({
        //@ts-expect-error
        clock: voidClockReadonlyTuple,
        target: neverTargetReadonlyTuple,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'readonly [EventCallable<number>]' is not assignable to type 'readonly [Unit<string>]'.
        Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 6 'target: stringTargetReadonlyTuple,'
      Type 'readonly [EventCallable<string>]' is not assignable to type 'readonly [UnitTargetable<number>]'.
        Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<number>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'number'.
      Type 'readonly [EventCallable<number>]' is not assignable to type 'readonly [Unit<never>]'.
        Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'never'.
      Type 'readonly [EventCallable<string>]' is not assignable to type 'readonly [Unit<number>]'.
        Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 16 'target: numberTargetReadonlyTuple,'
      Type 'readonly [EventCallable<number>]' is not assignable to type 'readonly [UnitTargetable<string>]'.
        Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<string>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'string'.
      Type 'readonly [EventCallable<string>]' is not assignable to type 'readonly [Unit<never>]'.
        Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'never'.
      Type 'readonly [EventCallable<unknown>]' is not assignable to type 'readonly [Unit<number>]'.
        Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'unknown' is not assignable to type 'number'.
      Type 'readonly [EventCallable<unknown>]' is not assignable to type 'readonly [Unit<string>]'.
        Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
          Types of property '__' are incompatible.
            Type 'unknown' is not assignable to type 'string'.
      Type 'readonly [EventCallable<unknown>]' is not assignable to type 'readonly [Unit<never>]'.
        Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'unknown' is not assignable to type 'never'.
      Type 'readonly [EventCallable<any>]' is not assignable to type 'readonly [Unit<never>]'.
        Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'any' is not assignable to type 'never'.
      Type 'readonly [EventCallable<void>]' is not assignable to type 'readonly [Unit<number>]'.
        Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'void' is not assignable to type 'number'.
      Unmarked error at test line 46 'target: numberTargetReadonlyTuple,'
      Type 'readonly [EventCallable<number>]' is not assignable to type 'readonly [UnitTargetable<void>]'.
        Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<void>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'void'.
      Type 'readonly [EventCallable<void>]' is not assignable to type 'readonly [Unit<string>]'.
        Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
          Types of property '__' are incompatible.
            Type 'void' is not assignable to type 'string'.
      Unmarked error at test line 51 'target: stringTargetReadonlyTuple,'
      Type 'readonly [EventCallable<string>]' is not assignable to type 'readonly [UnitTargetable<void>]'.
        Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<void>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'void'.
      Type 'readonly [EventCallable<void>]' is not assignable to type 'readonly [Unit<never>]'.
        Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'void' is not assignable to type 'never'.
      "
    `)
  })
})
describe('readonlyTuple/readonlyTuple, Boolean filter', () => {
  test('readonlyTuple/readonlyTuple, Boolean filter (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:numberClockReadonlyTuple , filter:Boolean, target:numberTargetReadonlyTuple })
      sample({clock:numberClockReadonlyTuple , filter:Boolean, target:unknownTargetReadonlyTuple})
      sample({clock:numberClockReadonlyTuple , filter:Boolean, target:anyTargetReadonlyTuple    })
      sample({clock:numberClockReadonlyTuple , filter:Boolean, target:voidTargetReadonlyTuple   })
      sample({clock:stringClockReadonlyTuple , filter:Boolean, target:stringTargetReadonlyTuple })
      sample({clock:stringClockReadonlyTuple , filter:Boolean, target:unknownTargetReadonlyTuple})
      sample({clock:stringClockReadonlyTuple , filter:Boolean, target:anyTargetReadonlyTuple    })
      sample({clock:stringClockReadonlyTuple , filter:Boolean, target:voidTargetReadonlyTuple   })
      sample({clock:unknownClockReadonlyTuple, filter:Boolean, target:unknownTargetReadonlyTuple})
      sample({clock:unknownClockReadonlyTuple, filter:Boolean, target:anyTargetReadonlyTuple    })
      sample({clock:unknownClockReadonlyTuple, filter:Boolean, target:voidTargetReadonlyTuple   })
      sample({clock:anyClockReadonlyTuple    , filter:Boolean, target:numberTargetReadonlyTuple })
      sample({clock:anyClockReadonlyTuple    , filter:Boolean, target:stringTargetReadonlyTuple })
      sample({clock:anyClockReadonlyTuple    , filter:Boolean, target:unknownTargetReadonlyTuple})
      sample({clock:anyClockReadonlyTuple    , filter:Boolean, target:anyTargetReadonlyTuple    })
      sample({clock:anyClockReadonlyTuple    , filter:Boolean, target:voidTargetReadonlyTuple   })
      sample({clock:voidClockReadonlyTuple   , filter:Boolean, target:unknownTargetReadonlyTuple})
      sample({clock:voidClockReadonlyTuple   , filter:Boolean, target:anyTargetReadonlyTuple    })
      sample({clock:voidClockReadonlyTuple   , filter:Boolean, target:voidTargetReadonlyTuple   })
      sample({clock:neverClockReadonlyTuple  , filter:Boolean, target:numberTargetReadonlyTuple })
      sample({clock:neverClockReadonlyTuple  , filter:Boolean, target:stringTargetReadonlyTuple })
      sample({clock:neverClockReadonlyTuple  , filter:Boolean, target:unknownTargetReadonlyTuple})
      sample({clock:neverClockReadonlyTuple  , filter:Boolean, target:anyTargetReadonlyTuple    })
      sample({clock:neverClockReadonlyTuple  , filter:Boolean, target:voidTargetReadonlyTuple   })
      sample({clock:neverClockReadonlyTuple  , filter:Boolean, target:neverTargetReadonlyTuple  })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('readonlyTuple/readonlyTuple, Boolean filter (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: numberClockReadonlyTuple,
        filter: Boolean,
        target: stringTargetReadonlyTuple,
      })
      sample({
        //@ts-expect-error
        clock: numberClockReadonlyTuple,
        filter: Boolean,
        target: neverTargetReadonlyTuple,
      })
      sample({
        //@ts-expect-error
        clock: stringClockReadonlyTuple,
        filter: Boolean,
        target: numberTargetReadonlyTuple,
      })
      sample({
        //@ts-expect-error
        clock: stringClockReadonlyTuple,
        filter: Boolean,
        target: neverTargetReadonlyTuple,
      })
      sample({
        //@ts-expect-error
        clock: unknownClockReadonlyTuple,
        filter: Boolean,
        target: numberTargetReadonlyTuple,
      })
      sample({
        //@ts-expect-error
        clock: unknownClockReadonlyTuple,
        filter: Boolean,
        target: stringTargetReadonlyTuple,
      })
      sample({
        //@ts-expect-error
        clock: unknownClockReadonlyTuple,
        filter: Boolean,
        target: neverTargetReadonlyTuple,
      })
      sample({
        //@ts-expect-error
        clock: anyClockReadonlyTuple,
        filter: Boolean,
        target: neverTargetReadonlyTuple,
      })
      sample({
        //@ts-expect-error
        clock: voidClockReadonlyTuple,
        filter: Boolean,
        target: numberTargetReadonlyTuple,
      })
      sample({
        //@ts-expect-error
        clock: voidClockReadonlyTuple,
        filter: Boolean,
        target: stringTargetReadonlyTuple,
      })
      sample({
        //@ts-expect-error
        clock: voidClockReadonlyTuple,
        filter: Boolean,
        target: neverTargetReadonlyTuple,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'readonly [EventCallable<number>]' is not assignable to type 'readonly [Unit<string>]'.
        Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 7 'target: stringTargetReadonlyTuple,'
      Type 'readonly [EventCallable<string>]' is not assignable to type 'readonly [UnitTargetable<number>]'.
        Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<number>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'number'.
      Type 'readonly [EventCallable<number>]' is not assignable to type 'readonly [Unit<never>]'.
        Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'never'.
      Type 'readonly [EventCallable<string>]' is not assignable to type 'readonly [Unit<number>]'.
        Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 19 'target: numberTargetReadonlyTuple,'
      Type 'readonly [EventCallable<number>]' is not assignable to type 'readonly [UnitTargetable<string>]'.
        Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<string>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'string'.
      Type 'readonly [EventCallable<string>]' is not assignable to type 'readonly [Unit<never>]'.
        Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'never'.
      Type 'readonly [EventCallable<unknown>]' is not assignable to type 'readonly [Unit<number>]'.
        Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'unknown' is not assignable to type 'number'.
      Type 'readonly [EventCallable<unknown>]' is not assignable to type 'readonly [Unit<string>]'.
        Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
          Types of property '__' are incompatible.
            Type 'unknown' is not assignable to type 'string'.
      Type 'readonly [EventCallable<unknown>]' is not assignable to type 'readonly [Unit<never>]'.
        Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'unknown' is not assignable to type 'never'.
      Type 'readonly [EventCallable<any>]' is not assignable to type 'readonly [Unit<never>]'.
        Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'any' is not assignable to type 'never'.
      Type 'readonly [EventCallable<void>]' is not assignable to type 'readonly [Unit<number>]'.
        Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'void' is not assignable to type 'number'.
      Unmarked error at test line 55 'target: numberTargetReadonlyTuple,'
      Type 'readonly [EventCallable<number>]' is not assignable to type 'readonly [UnitTargetable<void>]'.
        Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<void>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'void'.
      Type 'readonly [EventCallable<void>]' is not assignable to type 'readonly [Unit<string>]'.
        Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
          Types of property '__' are incompatible.
            Type 'void' is not assignable to type 'string'.
      Unmarked error at test line 61 'target: stringTargetReadonlyTuple,'
      Type 'readonly [EventCallable<string>]' is not assignable to type 'readonly [UnitTargetable<void>]'.
        Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<void>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'void'.
      Type 'readonly [EventCallable<void>]' is not assignable to type 'readonly [Unit<never>]'.
        Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'void' is not assignable to type 'never'.
      "
    `)
  })
})
describe('readonlyArray/readonlyArray, none filter', () => {
  test('readonlyArray/readonlyArray, none filter (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:numberClockReadonlyArray , target:numberTargetReadonlyArray })
      sample({clock:numberClockReadonlyArray , target:unknownTargetReadonlyArray})
      sample({clock:numberClockReadonlyArray , target:anyTargetReadonlyArray    })
      sample({clock:numberClockReadonlyArray , target:voidTargetReadonlyArray   })
      sample({clock:stringClockReadonlyArray , target:stringTargetReadonlyArray })
      sample({clock:stringClockReadonlyArray , target:unknownTargetReadonlyArray})
      sample({clock:stringClockReadonlyArray , target:anyTargetReadonlyArray    })
      sample({clock:stringClockReadonlyArray , target:voidTargetReadonlyArray   })
      sample({clock:unknownClockReadonlyArray, target:unknownTargetReadonlyArray})
      sample({clock:unknownClockReadonlyArray, target:anyTargetReadonlyArray    })
      sample({clock:unknownClockReadonlyArray, target:voidTargetReadonlyArray   })
      sample({clock:anyClockReadonlyArray    , target:numberTargetReadonlyArray })
      sample({clock:anyClockReadonlyArray    , target:stringTargetReadonlyArray })
      sample({clock:anyClockReadonlyArray    , target:unknownTargetReadonlyArray})
      sample({clock:anyClockReadonlyArray    , target:anyTargetReadonlyArray    })
      sample({clock:anyClockReadonlyArray    , target:voidTargetReadonlyArray   })
      sample({clock:voidClockReadonlyArray   , target:unknownTargetReadonlyArray})
      sample({clock:voidClockReadonlyArray   , target:anyTargetReadonlyArray    })
      sample({clock:voidClockReadonlyArray   , target:voidTargetReadonlyArray   })
      sample({clock:neverClockReadonlyArray  , target:numberTargetReadonlyArray })
      sample({clock:neverClockReadonlyArray  , target:stringTargetReadonlyArray })
      sample({clock:neverClockReadonlyArray  , target:unknownTargetReadonlyArray})
      sample({clock:neverClockReadonlyArray  , target:anyTargetReadonlyArray    })
      sample({clock:neverClockReadonlyArray  , target:voidTargetReadonlyArray   })
      sample({clock:neverClockReadonlyArray  , target:neverTargetReadonlyArray  })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('readonlyArray/readonlyArray, none filter (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: numberClockReadonlyArray,
        target: stringTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: numberClockReadonlyArray,
        target: neverTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: stringClockReadonlyArray,
        target: numberTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: stringClockReadonlyArray,
        target: neverTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: unknownClockReadonlyArray,
        target: numberTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: unknownClockReadonlyArray,
        target: stringTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: unknownClockReadonlyArray,
        target: neverTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: anyClockReadonlyArray,
        target: neverTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: voidClockReadonlyArray,
        target: numberTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: voidClockReadonlyArray,
        target: stringTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: voidClockReadonlyArray,
        target: neverTargetReadonlyArray,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'readonly EventCallable<number>[]' is not assignable to type 'readonly Unit<string>[]'.
        Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 6 'target: stringTargetReadonlyArray,'
      Type 'readonly EventCallable<string>[]' is not assignable to type 'readonly UnitTargetable<number>[]'.
        Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<number>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'number'.
      Type 'readonly EventCallable<number>[]' is not assignable to type 'readonly Unit<never>[]'.
        Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'never'.
      Type 'readonly EventCallable<string>[]' is not assignable to type 'readonly Unit<number>[]'.
        Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 16 'target: numberTargetReadonlyArray,'
      Type 'readonly EventCallable<number>[]' is not assignable to type 'readonly UnitTargetable<string>[]'.
        Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<string>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'string'.
      Type 'readonly EventCallable<string>[]' is not assignable to type 'readonly Unit<never>[]'.
        Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'never'.
      Type 'readonly EventCallable<unknown>[]' is not assignable to type 'readonly Unit<number>[]'.
        Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'unknown' is not assignable to type 'number'.
      Type 'readonly EventCallable<unknown>[]' is not assignable to type 'readonly Unit<string>[]'.
        Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
          Types of property '__' are incompatible.
            Type 'unknown' is not assignable to type 'string'.
      Type 'readonly EventCallable<unknown>[]' is not assignable to type 'readonly Unit<never>[]'.
        Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'unknown' is not assignable to type 'never'.
      Type 'readonly EventCallable<any>[]' is not assignable to type 'readonly Unit<never>[]'.
        Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'any' is not assignable to type 'never'.
      Type 'readonly EventCallable<void>[]' is not assignable to type 'readonly Unit<number>[]'.
        Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'void' is not assignable to type 'number'.
      Unmarked error at test line 46 'target: numberTargetReadonlyArray,'
      Type 'readonly EventCallable<number>[]' is not assignable to type 'readonly UnitTargetable<void>[]'.
        Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<void>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'void'.
      Type 'readonly EventCallable<void>[]' is not assignable to type 'readonly Unit<string>[]'.
        Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
          Types of property '__' are incompatible.
            Type 'void' is not assignable to type 'string'.
      Unmarked error at test line 51 'target: stringTargetReadonlyArray,'
      Type 'readonly EventCallable<string>[]' is not assignable to type 'readonly UnitTargetable<void>[]'.
        Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<void>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'void'.
      Type 'readonly EventCallable<void>[]' is not assignable to type 'readonly Unit<never>[]'.
        Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'void' is not assignable to type 'never'.
      "
    `)
  })
})
describe('readonlyArray/readonlyArray, Boolean filter', () => {
  test('readonlyArray/readonlyArray, Boolean filter (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:numberClockReadonlyArray , filter:Boolean, target:numberTargetReadonlyArray })
      sample({clock:numberClockReadonlyArray , filter:Boolean, target:unknownTargetReadonlyArray})
      sample({clock:numberClockReadonlyArray , filter:Boolean, target:anyTargetReadonlyArray    })
      sample({clock:numberClockReadonlyArray , filter:Boolean, target:voidTargetReadonlyArray   })
      sample({clock:stringClockReadonlyArray , filter:Boolean, target:stringTargetReadonlyArray })
      sample({clock:stringClockReadonlyArray , filter:Boolean, target:unknownTargetReadonlyArray})
      sample({clock:stringClockReadonlyArray , filter:Boolean, target:anyTargetReadonlyArray    })
      sample({clock:stringClockReadonlyArray , filter:Boolean, target:voidTargetReadonlyArray   })
      sample({clock:unknownClockReadonlyArray, filter:Boolean, target:unknownTargetReadonlyArray})
      sample({clock:unknownClockReadonlyArray, filter:Boolean, target:anyTargetReadonlyArray    })
      sample({clock:unknownClockReadonlyArray, filter:Boolean, target:voidTargetReadonlyArray   })
      sample({clock:anyClockReadonlyArray    , filter:Boolean, target:numberTargetReadonlyArray })
      sample({clock:anyClockReadonlyArray    , filter:Boolean, target:stringTargetReadonlyArray })
      sample({clock:anyClockReadonlyArray    , filter:Boolean, target:unknownTargetReadonlyArray})
      sample({clock:anyClockReadonlyArray    , filter:Boolean, target:anyTargetReadonlyArray    })
      sample({clock:anyClockReadonlyArray    , filter:Boolean, target:voidTargetReadonlyArray   })
      sample({clock:voidClockReadonlyArray   , filter:Boolean, target:unknownTargetReadonlyArray})
      sample({clock:voidClockReadonlyArray   , filter:Boolean, target:anyTargetReadonlyArray    })
      sample({clock:voidClockReadonlyArray   , filter:Boolean, target:voidTargetReadonlyArray   })
      sample({clock:neverClockReadonlyArray  , filter:Boolean, target:numberTargetReadonlyArray })
      sample({clock:neverClockReadonlyArray  , filter:Boolean, target:stringTargetReadonlyArray })
      sample({clock:neverClockReadonlyArray  , filter:Boolean, target:unknownTargetReadonlyArray})
      sample({clock:neverClockReadonlyArray  , filter:Boolean, target:anyTargetReadonlyArray    })
      sample({clock:neverClockReadonlyArray  , filter:Boolean, target:voidTargetReadonlyArray   })
      sample({clock:neverClockReadonlyArray  , filter:Boolean, target:neverTargetReadonlyArray  })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('readonlyArray/readonlyArray, Boolean filter (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: numberClockReadonlyArray,
        filter: Boolean,
        target: stringTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: numberClockReadonlyArray,
        filter: Boolean,
        target: neverTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: stringClockReadonlyArray,
        filter: Boolean,
        target: numberTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: stringClockReadonlyArray,
        filter: Boolean,
        target: neverTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: unknownClockReadonlyArray,
        filter: Boolean,
        target: numberTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: unknownClockReadonlyArray,
        filter: Boolean,
        target: stringTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: unknownClockReadonlyArray,
        filter: Boolean,
        target: neverTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: anyClockReadonlyArray,
        filter: Boolean,
        target: neverTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: voidClockReadonlyArray,
        filter: Boolean,
        target: numberTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: voidClockReadonlyArray,
        filter: Boolean,
        target: stringTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: voidClockReadonlyArray,
        filter: Boolean,
        target: neverTargetReadonlyArray,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'readonly EventCallable<number>[]' is not assignable to type 'readonly Unit<string>[]'.
        Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 7 'target: stringTargetReadonlyArray,'
      Type 'readonly EventCallable<string>[]' is not assignable to type 'readonly UnitTargetable<number>[]'.
        Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<number>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'number'.
      Type 'readonly EventCallable<number>[]' is not assignable to type 'readonly Unit<never>[]'.
        Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'never'.
      Type 'readonly EventCallable<string>[]' is not assignable to type 'readonly Unit<number>[]'.
        Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 19 'target: numberTargetReadonlyArray,'
      Type 'readonly EventCallable<number>[]' is not assignable to type 'readonly UnitTargetable<string>[]'.
        Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<string>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'string'.
      Type 'readonly EventCallable<string>[]' is not assignable to type 'readonly Unit<never>[]'.
        Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'never'.
      Type 'readonly EventCallable<unknown>[]' is not assignable to type 'readonly Unit<number>[]'.
        Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'unknown' is not assignable to type 'number'.
      Type 'readonly EventCallable<unknown>[]' is not assignable to type 'readonly Unit<string>[]'.
        Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
          Types of property '__' are incompatible.
            Type 'unknown' is not assignable to type 'string'.
      Type 'readonly EventCallable<unknown>[]' is not assignable to type 'readonly Unit<never>[]'.
        Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'unknown' is not assignable to type 'never'.
      Type 'readonly EventCallable<any>[]' is not assignable to type 'readonly Unit<never>[]'.
        Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'any' is not assignable to type 'never'.
      Type 'readonly EventCallable<void>[]' is not assignable to type 'readonly Unit<number>[]'.
        Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'void' is not assignable to type 'number'.
      Unmarked error at test line 55 'target: numberTargetReadonlyArray,'
      Type 'readonly EventCallable<number>[]' is not assignable to type 'readonly UnitTargetable<void>[]'.
        Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<void>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'void'.
      Type 'readonly EventCallable<void>[]' is not assignable to type 'readonly Unit<string>[]'.
        Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
          Types of property '__' are incompatible.
            Type 'void' is not assignable to type 'string'.
      Unmarked error at test line 61 'target: stringTargetReadonlyArray,'
      Type 'readonly EventCallable<string>[]' is not assignable to type 'readonly UnitTargetable<void>[]'.
        Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<void>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'void'.
      Type 'readonly EventCallable<void>[]' is not assignable to type 'readonly Unit<never>[]'.
        Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'void' is not assignable to type 'never'.
      "
    `)
  })
})
describe('readonlyArray/mutable, none filter', () => {
  test('readonlyArray/mutable, none filter (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:numberClockReadonlyArray , target:numberTargetMutable })
      sample({clock:numberClockReadonlyArray , target:unknownTargetMutable})
      sample({clock:numberClockReadonlyArray , target:anyTargetMutable    })
      sample({clock:numberClockReadonlyArray , target:voidTargetMutable   })
      sample({clock:stringClockReadonlyArray , target:stringTargetMutable })
      sample({clock:stringClockReadonlyArray , target:unknownTargetMutable})
      sample({clock:stringClockReadonlyArray , target:anyTargetMutable    })
      sample({clock:stringClockReadonlyArray , target:voidTargetMutable   })
      sample({clock:unknownClockReadonlyArray, target:unknownTargetMutable})
      sample({clock:unknownClockReadonlyArray, target:anyTargetMutable    })
      sample({clock:unknownClockReadonlyArray, target:voidTargetMutable   })
      sample({clock:anyClockReadonlyArray    , target:numberTargetMutable })
      sample({clock:anyClockReadonlyArray    , target:stringTargetMutable })
      sample({clock:anyClockReadonlyArray    , target:unknownTargetMutable})
      sample({clock:anyClockReadonlyArray    , target:anyTargetMutable    })
      sample({clock:anyClockReadonlyArray    , target:voidTargetMutable   })
      sample({clock:voidClockReadonlyArray   , target:unknownTargetMutable})
      sample({clock:voidClockReadonlyArray   , target:anyTargetMutable    })
      sample({clock:voidClockReadonlyArray   , target:voidTargetMutable   })
      sample({clock:neverClockReadonlyArray  , target:numberTargetMutable })
      sample({clock:neverClockReadonlyArray  , target:stringTargetMutable })
      sample({clock:neverClockReadonlyArray  , target:unknownTargetMutable})
      sample({clock:neverClockReadonlyArray  , target:anyTargetMutable    })
      sample({clock:neverClockReadonlyArray  , target:voidTargetMutable   })
      sample({clock:neverClockReadonlyArray  , target:neverTargetMutable  })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('readonlyArray/mutable, none filter (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: numberClockReadonlyArray,
        target: stringTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: numberClockReadonlyArray,
        target: neverTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: stringClockReadonlyArray,
        target: numberTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: stringClockReadonlyArray,
        target: neverTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClockReadonlyArray,
        target: numberTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClockReadonlyArray,
        target: stringTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClockReadonlyArray,
        target: neverTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: anyClockReadonlyArray,
        target: neverTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: voidClockReadonlyArray,
        target: numberTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: voidClockReadonlyArray,
        target: stringTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: voidClockReadonlyArray,
        target: neverTargetMutable,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'readonly EventCallable<number>[]' is not assignable to type 'readonly Unit<string>[]'.
        Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 6 'target: stringTargetMutable,'
      Type 'EventCallable<string>[]' is not assignable to type 'readonly UnitTargetable<number>[]'.
        Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<number>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'number'.
      Type 'readonly EventCallable<number>[]' is not assignable to type 'readonly Unit<never>[]'.
        Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'never'.
      Type 'readonly EventCallable<string>[]' is not assignable to type 'readonly Unit<number>[]'.
        Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 16 'target: numberTargetMutable,'
      Type 'EventCallable<number>[]' is not assignable to type 'readonly UnitTargetable<string>[]'.
        Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<string>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'string'.
      Type 'readonly EventCallable<string>[]' is not assignable to type 'readonly Unit<never>[]'.
        Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'never'.
      Type 'readonly EventCallable<unknown>[]' is not assignable to type 'readonly Unit<number>[]'.
        Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'unknown' is not assignable to type 'number'.
      Type 'readonly EventCallable<unknown>[]' is not assignable to type 'readonly Unit<string>[]'.
        Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
          Types of property '__' are incompatible.
            Type 'unknown' is not assignable to type 'string'.
      Type 'readonly EventCallable<unknown>[]' is not assignable to type 'readonly Unit<never>[]'.
        Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'unknown' is not assignable to type 'never'.
      Type 'readonly EventCallable<any>[]' is not assignable to type 'readonly Unit<never>[]'.
        Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'any' is not assignable to type 'never'.
      Type 'readonly EventCallable<void>[]' is not assignable to type 'readonly Unit<number>[]'.
        Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'void' is not assignable to type 'number'.
      Unmarked error at test line 46 'target: numberTargetMutable,'
      Type 'EventCallable<number>[]' is not assignable to type 'readonly UnitTargetable<void>[]'.
        Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<void>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'void'.
      Type 'readonly EventCallable<void>[]' is not assignable to type 'readonly Unit<string>[]'.
        Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
          Types of property '__' are incompatible.
            Type 'void' is not assignable to type 'string'.
      Unmarked error at test line 51 'target: stringTargetMutable,'
      Type 'EventCallable<string>[]' is not assignable to type 'readonly UnitTargetable<void>[]'.
        Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<void>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'void'.
      Type 'readonly EventCallable<void>[]' is not assignable to type 'readonly Unit<never>[]'.
        Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'void' is not assignable to type 'never'.
      "
    `)
  })
})
describe('readonlyArray/mutable, Boolean filter', () => {
  test('readonlyArray/mutable, Boolean filter (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:numberClockReadonlyArray , filter:Boolean, target:numberTargetMutable })
      sample({clock:numberClockReadonlyArray , filter:Boolean, target:unknownTargetMutable})
      sample({clock:numberClockReadonlyArray , filter:Boolean, target:anyTargetMutable    })
      sample({clock:numberClockReadonlyArray , filter:Boolean, target:voidTargetMutable   })
      sample({clock:stringClockReadonlyArray , filter:Boolean, target:stringTargetMutable })
      sample({clock:stringClockReadonlyArray , filter:Boolean, target:unknownTargetMutable})
      sample({clock:stringClockReadonlyArray , filter:Boolean, target:anyTargetMutable    })
      sample({clock:stringClockReadonlyArray , filter:Boolean, target:voidTargetMutable   })
      sample({clock:unknownClockReadonlyArray, filter:Boolean, target:unknownTargetMutable})
      sample({clock:unknownClockReadonlyArray, filter:Boolean, target:anyTargetMutable    })
      sample({clock:unknownClockReadonlyArray, filter:Boolean, target:voidTargetMutable   })
      sample({clock:anyClockReadonlyArray    , filter:Boolean, target:numberTargetMutable })
      sample({clock:anyClockReadonlyArray    , filter:Boolean, target:stringTargetMutable })
      sample({clock:anyClockReadonlyArray    , filter:Boolean, target:unknownTargetMutable})
      sample({clock:anyClockReadonlyArray    , filter:Boolean, target:anyTargetMutable    })
      sample({clock:anyClockReadonlyArray    , filter:Boolean, target:voidTargetMutable   })
      sample({clock:voidClockReadonlyArray   , filter:Boolean, target:unknownTargetMutable})
      sample({clock:voidClockReadonlyArray   , filter:Boolean, target:anyTargetMutable    })
      sample({clock:voidClockReadonlyArray   , filter:Boolean, target:voidTargetMutable   })
      sample({clock:neverClockReadonlyArray  , filter:Boolean, target:numberTargetMutable })
      sample({clock:neverClockReadonlyArray  , filter:Boolean, target:stringTargetMutable })
      sample({clock:neverClockReadonlyArray  , filter:Boolean, target:unknownTargetMutable})
      sample({clock:neverClockReadonlyArray  , filter:Boolean, target:anyTargetMutable    })
      sample({clock:neverClockReadonlyArray  , filter:Boolean, target:voidTargetMutable   })
      sample({clock:neverClockReadonlyArray  , filter:Boolean, target:neverTargetMutable  })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('readonlyArray/mutable, Boolean filter (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: numberClockReadonlyArray,
        filter: Boolean,
        target: stringTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: numberClockReadonlyArray,
        filter: Boolean,
        target: neverTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: stringClockReadonlyArray,
        filter: Boolean,
        target: numberTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: stringClockReadonlyArray,
        filter: Boolean,
        target: neverTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClockReadonlyArray,
        filter: Boolean,
        target: numberTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClockReadonlyArray,
        filter: Boolean,
        target: stringTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClockReadonlyArray,
        filter: Boolean,
        target: neverTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: anyClockReadonlyArray,
        filter: Boolean,
        target: neverTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: voidClockReadonlyArray,
        filter: Boolean,
        target: numberTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: voidClockReadonlyArray,
        filter: Boolean,
        target: stringTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: voidClockReadonlyArray,
        filter: Boolean,
        target: neverTargetMutable,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'readonly EventCallable<number>[]' is not assignable to type 'readonly Unit<string>[]'.
        Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 7 'target: stringTargetMutable,'
      Type 'EventCallable<string>[]' is not assignable to type 'readonly UnitTargetable<number>[]'.
        Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<number>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'number'.
      Type 'readonly EventCallable<number>[]' is not assignable to type 'readonly Unit<never>[]'.
        Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'never'.
      Type 'readonly EventCallable<string>[]' is not assignable to type 'readonly Unit<number>[]'.
        Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 19 'target: numberTargetMutable,'
      Type 'EventCallable<number>[]' is not assignable to type 'readonly UnitTargetable<string>[]'.
        Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<string>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'string'.
      Type 'readonly EventCallable<string>[]' is not assignable to type 'readonly Unit<never>[]'.
        Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'never'.
      Type 'readonly EventCallable<unknown>[]' is not assignable to type 'readonly Unit<number>[]'.
        Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'unknown' is not assignable to type 'number'.
      Type 'readonly EventCallable<unknown>[]' is not assignable to type 'readonly Unit<string>[]'.
        Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
          Types of property '__' are incompatible.
            Type 'unknown' is not assignable to type 'string'.
      Type 'readonly EventCallable<unknown>[]' is not assignable to type 'readonly Unit<never>[]'.
        Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'unknown' is not assignable to type 'never'.
      Type 'readonly EventCallable<any>[]' is not assignable to type 'readonly Unit<never>[]'.
        Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'any' is not assignable to type 'never'.
      Type 'readonly EventCallable<void>[]' is not assignable to type 'readonly Unit<number>[]'.
        Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'void' is not assignable to type 'number'.
      Unmarked error at test line 55 'target: numberTargetMutable,'
      Type 'EventCallable<number>[]' is not assignable to type 'readonly UnitTargetable<void>[]'.
        Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<void>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'void'.
      Type 'readonly EventCallable<void>[]' is not assignable to type 'readonly Unit<string>[]'.
        Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
          Types of property '__' are incompatible.
            Type 'void' is not assignable to type 'string'.
      Unmarked error at test line 61 'target: stringTargetMutable,'
      Type 'EventCallable<string>[]' is not assignable to type 'readonly UnitTargetable<void>[]'.
        Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<void>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'void'.
      Type 'readonly EventCallable<void>[]' is not assignable to type 'readonly Unit<never>[]'.
        Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'void' is not assignable to type 'never'.
      "
    `)
  })
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
        target: stringTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: numberClockMutable,
        target: neverTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: stringClockMutable,
        target: numberTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: stringClockMutable,
        target: neverTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: unknownClockMutable,
        target: numberTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: unknownClockMutable,
        target: stringTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: unknownClockMutable,
        target: neverTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: anyClockMutable,
        target: neverTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: voidClockMutable,
        target: numberTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: voidClockMutable,
        target: stringTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: voidClockMutable,
        target: neverTargetReadonlyArray,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<number>[]' is not assignable to type 'readonly Unit<string>[]'.
        Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 6 'target: stringTargetReadonlyArray,'
      Type 'readonly EventCallable<string>[]' is not assignable to type 'readonly UnitTargetable<number>[]'.
        Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<number>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<number>[]' is not assignable to type 'readonly Unit<never>[]'.
        Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'never'.
      Type 'EventCallable<string>[]' is not assignable to type 'readonly Unit<number>[]'.
        Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 16 'target: numberTargetReadonlyArray,'
      Type 'readonly EventCallable<number>[]' is not assignable to type 'readonly UnitTargetable<string>[]'.
        Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<string>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<string>[]' is not assignable to type 'readonly Unit<never>[]'.
        Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'never'.
      Type 'EventCallable<unknown>[]' is not assignable to type 'readonly Unit<number>[]'.
        Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'unknown' is not assignable to type 'number'.
      Type 'EventCallable<unknown>[]' is not assignable to type 'readonly Unit<string>[]'.
        Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
          Types of property '__' are incompatible.
            Type 'unknown' is not assignable to type 'string'.
      Type 'EventCallable<unknown>[]' is not assignable to type 'readonly Unit<never>[]'.
        Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'unknown' is not assignable to type 'never'.
      Type 'EventCallable<any>[]' is not assignable to type 'readonly Unit<never>[]'.
        Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'any' is not assignable to type 'never'.
      Type 'EventCallable<void>[]' is not assignable to type 'readonly Unit<number>[]'.
        Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'void' is not assignable to type 'number'.
      Unmarked error at test line 46 'target: numberTargetReadonlyArray,'
      Type 'readonly EventCallable<number>[]' is not assignable to type 'readonly UnitTargetable<void>[]'.
        Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<void>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'void'.
      Type 'EventCallable<void>[]' is not assignable to type 'readonly Unit<string>[]'.
        Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
          Types of property '__' are incompatible.
            Type 'void' is not assignable to type 'string'.
      Unmarked error at test line 51 'target: stringTargetReadonlyArray,'
      Type 'readonly EventCallable<string>[]' is not assignable to type 'readonly UnitTargetable<void>[]'.
        Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<void>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<void>[]' is not assignable to type 'readonly Unit<never>[]'.
        Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'void' is not assignable to type 'never'.
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
        target: stringTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: numberClockMutable,
        filter: Boolean,
        target: neverTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: stringClockMutable,
        filter: Boolean,
        target: numberTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: stringClockMutable,
        filter: Boolean,
        target: neverTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: unknownClockMutable,
        filter: Boolean,
        target: numberTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: unknownClockMutable,
        filter: Boolean,
        target: stringTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: unknownClockMutable,
        filter: Boolean,
        target: neverTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: anyClockMutable,
        filter: Boolean,
        target: neverTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: voidClockMutable,
        filter: Boolean,
        target: numberTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: voidClockMutable,
        filter: Boolean,
        target: stringTargetReadonlyArray,
      })
      sample({
        //@ts-expect-error
        clock: voidClockMutable,
        filter: Boolean,
        target: neverTargetReadonlyArray,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<number>[]' is not assignable to type 'readonly Unit<string>[]'.
        Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 7 'target: stringTargetReadonlyArray,'
      Type 'readonly EventCallable<string>[]' is not assignable to type 'readonly UnitTargetable<number>[]'.
        Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<number>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<number>[]' is not assignable to type 'readonly Unit<never>[]'.
        Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'never'.
      Type 'EventCallable<string>[]' is not assignable to type 'readonly Unit<number>[]'.
        Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 19 'target: numberTargetReadonlyArray,'
      Type 'readonly EventCallable<number>[]' is not assignable to type 'readonly UnitTargetable<string>[]'.
        Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<string>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<string>[]' is not assignable to type 'readonly Unit<never>[]'.
        Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'never'.
      Type 'EventCallable<unknown>[]' is not assignable to type 'readonly Unit<number>[]'.
        Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'unknown' is not assignable to type 'number'.
      Type 'EventCallable<unknown>[]' is not assignable to type 'readonly Unit<string>[]'.
        Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
          Types of property '__' are incompatible.
            Type 'unknown' is not assignable to type 'string'.
      Type 'EventCallable<unknown>[]' is not assignable to type 'readonly Unit<never>[]'.
        Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'unknown' is not assignable to type 'never'.
      Type 'EventCallable<any>[]' is not assignable to type 'readonly Unit<never>[]'.
        Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'any' is not assignable to type 'never'.
      Type 'EventCallable<void>[]' is not assignable to type 'readonly Unit<number>[]'.
        Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'void' is not assignable to type 'number'.
      Unmarked error at test line 55 'target: numberTargetReadonlyArray,'
      Type 'readonly EventCallable<number>[]' is not assignable to type 'readonly UnitTargetable<void>[]'.
        Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<void>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'void'.
      Type 'EventCallable<void>[]' is not assignable to type 'readonly Unit<string>[]'.
        Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
          Types of property '__' are incompatible.
            Type 'void' is not assignable to type 'string'.
      Unmarked error at test line 61 'target: stringTargetReadonlyArray,'
      Type 'readonly EventCallable<string>[]' is not assignable to type 'readonly UnitTargetable<void>[]'.
        Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<void>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<void>[]' is not assignable to type 'readonly Unit<never>[]'.
        Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'void' is not assignable to type 'never'.
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
        target: stringTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: numberClockMutable,
        target: neverTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: stringClockMutable,
        target: numberTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: stringClockMutable,
        target: neverTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClockMutable,
        target: numberTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClockMutable,
        target: stringTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClockMutable,
        target: neverTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: anyClockMutable,
        target: neverTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: voidClockMutable,
        target: numberTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: voidClockMutable,
        target: stringTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: voidClockMutable,
        target: neverTargetMutable,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<number>[]' is not assignable to type 'readonly Unit<string>[]'.
        Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 6 'target: stringTargetMutable,'
      Type 'EventCallable<string>[]' is not assignable to type 'readonly UnitTargetable<number>[]'.
        Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<number>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<number>[]' is not assignable to type 'readonly Unit<never>[]'.
        Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'never'.
      Type 'EventCallable<string>[]' is not assignable to type 'readonly Unit<number>[]'.
        Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 16 'target: numberTargetMutable,'
      Type 'EventCallable<number>[]' is not assignable to type 'readonly UnitTargetable<string>[]'.
        Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<string>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<string>[]' is not assignable to type 'readonly Unit<never>[]'.
        Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'never'.
      Type 'EventCallable<unknown>[]' is not assignable to type 'readonly Unit<number>[]'.
        Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'unknown' is not assignable to type 'number'.
      Type 'EventCallable<unknown>[]' is not assignable to type 'readonly Unit<string>[]'.
        Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
          Types of property '__' are incompatible.
            Type 'unknown' is not assignable to type 'string'.
      Type 'EventCallable<unknown>[]' is not assignable to type 'readonly Unit<never>[]'.
        Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'unknown' is not assignable to type 'never'.
      Type 'EventCallable<any>[]' is not assignable to type 'readonly Unit<never>[]'.
        Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'any' is not assignable to type 'never'.
      Type 'EventCallable<void>[]' is not assignable to type 'readonly Unit<number>[]'.
        Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'void' is not assignable to type 'number'.
      Unmarked error at test line 46 'target: numberTargetMutable,'
      Type 'EventCallable<number>[]' is not assignable to type 'readonly UnitTargetable<void>[]'.
        Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<void>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'void'.
      Type 'EventCallable<void>[]' is not assignable to type 'readonly Unit<string>[]'.
        Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
          Types of property '__' are incompatible.
            Type 'void' is not assignable to type 'string'.
      Unmarked error at test line 51 'target: stringTargetMutable,'
      Type 'EventCallable<string>[]' is not assignable to type 'readonly UnitTargetable<void>[]'.
        Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<void>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<void>[]' is not assignable to type 'readonly Unit<never>[]'.
        Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'void' is not assignable to type 'never'.
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
        target: stringTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: numberClockMutable,
        filter: Boolean,
        target: neverTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: stringClockMutable,
        filter: Boolean,
        target: numberTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: stringClockMutable,
        filter: Boolean,
        target: neverTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClockMutable,
        filter: Boolean,
        target: numberTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClockMutable,
        filter: Boolean,
        target: stringTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: unknownClockMutable,
        filter: Boolean,
        target: neverTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: anyClockMutable,
        filter: Boolean,
        target: neverTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: voidClockMutable,
        filter: Boolean,
        target: numberTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: voidClockMutable,
        filter: Boolean,
        target: stringTargetMutable,
      })
      sample({
        //@ts-expect-error
        clock: voidClockMutable,
        filter: Boolean,
        target: neverTargetMutable,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<number>[]' is not assignable to type 'readonly Unit<string>[]'.
        Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 7 'target: stringTargetMutable,'
      Type 'EventCallable<string>[]' is not assignable to type 'readonly UnitTargetable<number>[]'.
        Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<number>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<number>[]' is not assignable to type 'readonly Unit<never>[]'.
        Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'never'.
      Type 'EventCallable<string>[]' is not assignable to type 'readonly Unit<number>[]'.
        Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 19 'target: numberTargetMutable,'
      Type 'EventCallable<number>[]' is not assignable to type 'readonly UnitTargetable<string>[]'.
        Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<string>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<string>[]' is not assignable to type 'readonly Unit<never>[]'.
        Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'never'.
      Type 'EventCallable<unknown>[]' is not assignable to type 'readonly Unit<number>[]'.
        Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'unknown' is not assignable to type 'number'.
      Type 'EventCallable<unknown>[]' is not assignable to type 'readonly Unit<string>[]'.
        Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
          Types of property '__' are incompatible.
            Type 'unknown' is not assignable to type 'string'.
      Type 'EventCallable<unknown>[]' is not assignable to type 'readonly Unit<never>[]'.
        Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'unknown' is not assignable to type 'never'.
      Type 'EventCallable<any>[]' is not assignable to type 'readonly Unit<never>[]'.
        Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'any' is not assignable to type 'never'.
      Type 'EventCallable<void>[]' is not assignable to type 'readonly Unit<number>[]'.
        Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'void' is not assignable to type 'number'.
      Unmarked error at test line 55 'target: numberTargetMutable,'
      Type 'EventCallable<number>[]' is not assignable to type 'readonly UnitTargetable<void>[]'.
        Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<void>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type 'void'.
      Type 'EventCallable<void>[]' is not assignable to type 'readonly Unit<string>[]'.
        Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
          Types of property '__' are incompatible.
            Type 'void' is not assignable to type 'string'.
      Unmarked error at test line 61 'target: stringTargetMutable,'
      Type 'EventCallable<string>[]' is not assignable to type 'readonly UnitTargetable<void>[]'.
        Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<void>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<void>[]' is not assignable to type 'readonly Unit<never>[]'.
        Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
          Types of property '__' are incompatible.
            Type 'void' is not assignable to type 'never'.
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
        target: stringTarget,
      })
      sample({
        //@ts-expect-error
        clock: [numberClock],
        target: neverTarget,
      })
      sample({
        //@ts-expect-error
        clock: [stringClock],
        target: numberTarget,
      })
      sample({
        //@ts-expect-error
        clock: [stringClock],
        target: neverTarget,
      })
      sample({
        //@ts-expect-error
        clock: [unknownClock],
        target: numberTarget,
      })
      sample({
        //@ts-expect-error
        clock: [unknownClock],
        target: stringTarget,
      })
      sample({
        //@ts-expect-error
        clock: [unknownClock],
        target: neverTarget,
      })
      sample({
        //@ts-expect-error
        clock: [anyClock],
        target: neverTarget,
      })
      sample({
        //@ts-expect-error
        clock: [voidClock],
        target: numberTarget,
      })
      sample({
        //@ts-expect-error
        clock: [voidClock],
        target: stringTarget,
      })
      sample({
        //@ts-expect-error
        clock: [voidClock],
        target: neverTarget,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 6 'target: stringTarget,'
      Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 16 'target: numberTarget,'
      Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'any' is not assignable to type 'never'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      Unmarked error at test line 46 'target: numberTarget,'
      Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      Unmarked error at test line 51 'target: stringTarget,'
      Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
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
        target: stringTarget,
      })
      sample({
        //@ts-expect-error
        clock: [numberClock],
        filter: Boolean,
        target: neverTarget,
      })
      sample({
        //@ts-expect-error
        clock: [stringClock],
        filter: Boolean,
        target: numberTarget,
      })
      sample({
        //@ts-expect-error
        clock: [stringClock],
        filter: Boolean,
        target: neverTarget,
      })
      sample({
        //@ts-expect-error
        clock: [unknownClock],
        filter: Boolean,
        target: numberTarget,
      })
      sample({
        //@ts-expect-error
        clock: [unknownClock],
        filter: Boolean,
        target: stringTarget,
      })
      sample({
        //@ts-expect-error
        clock: [unknownClock],
        filter: Boolean,
        target: neverTarget,
      })
      sample({
        //@ts-expect-error
        clock: [anyClock],
        filter: Boolean,
        target: neverTarget,
      })
      sample({
        //@ts-expect-error
        clock: [voidClock],
        filter: Boolean,
        target: numberTarget,
      })
      sample({
        //@ts-expect-error
        clock: [voidClock],
        filter: Boolean,
        target: stringTarget,
      })
      sample({
        //@ts-expect-error
        clock: [voidClock],
        filter: Boolean,
        target: neverTarget,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 7 'target: stringTarget,'
      Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 19 'target: numberTarget,'
      Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'any' is not assignable to type 'never'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      Unmarked error at test line 55 'target: numberTarget,'
      Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      Unmarked error at test line 61 'target: stringTarget,'
      Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
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
        target: [stringTarget],
      })
      sample({
        //@ts-expect-error
        clock: [numberClock],
        target: [neverTarget],
      })
      sample({
        //@ts-expect-error
        clock: [stringClock],
        target: [numberTarget],
      })
      sample({
        //@ts-expect-error
        clock: [stringClock],
        target: [neverTarget],
      })
      sample({
        //@ts-expect-error
        clock: [unknownClock],
        target: [numberTarget],
      })
      sample({
        //@ts-expect-error
        clock: [unknownClock],
        target: [stringTarget],
      })
      sample({
        //@ts-expect-error
        clock: [unknownClock],
        target: [neverTarget],
      })
      sample({
        //@ts-expect-error
        clock: [anyClock],
        target: [neverTarget],
      })
      sample({
        //@ts-expect-error
        clock: [voidClock],
        target: [numberTarget],
      })
      sample({
        //@ts-expect-error
        clock: [voidClock],
        target: [stringTarget],
      })
      sample({
        //@ts-expect-error
        clock: [voidClock],
        target: [neverTarget],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 6 'target: [stringTarget],'
      Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 16 'target: [numberTarget],'
      Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'any' is not assignable to type 'never'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      Unmarked error at test line 46 'target: [numberTarget],'
      Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      Unmarked error at test line 51 'target: [stringTarget],'
      Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
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
        target: [stringTarget],
      })
      sample({
        //@ts-expect-error
        clock: [numberClock],
        filter: Boolean,
        target: [neverTarget],
      })
      sample({
        //@ts-expect-error
        clock: [stringClock],
        filter: Boolean,
        target: [numberTarget],
      })
      sample({
        //@ts-expect-error
        clock: [stringClock],
        filter: Boolean,
        target: [neverTarget],
      })
      sample({
        //@ts-expect-error
        clock: [unknownClock],
        filter: Boolean,
        target: [numberTarget],
      })
      sample({
        //@ts-expect-error
        clock: [unknownClock],
        filter: Boolean,
        target: [stringTarget],
      })
      sample({
        //@ts-expect-error
        clock: [unknownClock],
        filter: Boolean,
        target: [neverTarget],
      })
      sample({
        //@ts-expect-error
        clock: [anyClock],
        filter: Boolean,
        target: [neverTarget],
      })
      sample({
        //@ts-expect-error
        clock: [voidClock],
        filter: Boolean,
        target: [numberTarget],
      })
      sample({
        //@ts-expect-error
        clock: [voidClock],
        filter: Boolean,
        target: [stringTarget],
      })
      sample({
        //@ts-expect-error
        clock: [voidClock],
        filter: Boolean,
        target: [neverTarget],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Unmarked error at test line 7 'target: [stringTarget],'
      Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'never'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Unmarked error at test line 19 'target: [numberTarget],'
      Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<string>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'never'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'number'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'string'.
      Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'unknown' is not assignable to type 'never'.
      Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'any' is not assignable to type 'never'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'number'.
      Unmarked error at test line 55 'target: [numberTarget],'
      Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'string'.
      Unmarked error at test line 61 'target: [stringTarget],'
      Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<void>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'void'.
      Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
        Types of property '__' are incompatible.
          Type 'void' is not assignable to type 'never'.
      "
    `)
  })
})
