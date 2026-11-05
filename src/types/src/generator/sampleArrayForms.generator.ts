import {
  bool,
  computeFn,
  computeVariant,
  config,
  every,
  not,
  union,
} from '../runner/manifold/operators'

type PayloadType = 'number' | 'string' | 'unknown' | 'any' | 'void' | 'never'
type Form =
  | 'unit'
  | 'inline'
  | 'mutable'
  | 'readonlyTuple'
  | 'readonlyArray'
type FormPair =
  | 'unit/unit'
  | 'unit/inline'
  | 'inline/unit'
  | 'inline/inline'
  | 'mutable/mutable'
  | 'readonlyTuple/readonlyTuple'
  | 'readonlyArray/readonlyArray'
  | 'mutable/readonlyArray'
  | 'readonlyArray/mutable'

const payloadTypes = [
  'number',
  'string',
  'unknown',
  'any',
  'void',
  'never',
] as const

export default () => {
  const formPair = union<FormPair>({
    oneOf: [
      'unit/unit',
      'unit/inline',
      'inline/unit',
      'inline/inline',
      'mutable/mutable',
      'readonlyTuple/readonlyTuple',
      'readonlyArray/readonlyArray',
      'mutable/readonlyArray',
      'readonlyArray/mutable',
    ],
    sort: 'string',
  })
  const clockType = union<PayloadType>({
    oneOf: payloadTypes,
    sort: [...payloadTypes],
  })
  const targetType = union<PayloadType>({
    oneOf: payloadTypes,
    sort: [...payloadTypes],
  })
  const filter = union({
    oneOf: ['none', 'Boolean'],
    sort: ['none', 'Boolean'],
  })
  const clockForm = computeFn({
    source: {formPair},
    fn: ({formPair}) => formPair.split('/')[0] as Form,
    sort: 'string',
  })
  const targetForm = computeFn({
    source: {formPair},
    fn: ({formPair}) => formPair.split('/')[1] as Form,
    sort: 'string',
  })
  const clockCode = computeFn({
    source: {clockForm, clockType},
    fn: ({clockForm, clockType}) =>
      renderUnitCollection(clockType, 'Clock', clockForm),
  })
  const targetCode = computeFn({
    source: {targetForm, targetType},
    fn: ({targetForm, targetType}) =>
      renderUnitCollection(targetType, 'Target', targetForm),
  })
  const filterCode = computeVariant({
    source: {filter},
    variant: {
      none: {filter: 'none'},
      Boolean: {filter: 'Boolean'},
    },
    cases: {
      none: null,
      Boolean: 'Boolean',
    },
  })
  const valueCompatible = computeFn({
    source: {clockType, targetType},
    fn: ({clockType, targetType}) =>
      isAssignable(clockType, targetType),
  })
  const formSupported = computeFn({
    source: {clockForm},
    fn: ({clockForm}) =>
      clockForm !== 'readonlyTuple' && clockForm !== 'readonlyArray',
  })
  const valuePass = bool({
    source: {valueCompatible},
    true: {valueCompatible: true},
  })
  const formPass = bool({
    source: {formSupported},
    true: {formSupported: true},
  })
  const pass = every([valuePass, formPass])
  const fieldError = every([formPass, not(valuePass)])

  config({
    header,
    file: 'generated/sampleArrayForms',
    usedMethods: ['createEvent', 'sample'],
    grouping: {
      pass,
      getHash: [formPair, filter],
      tags: {formPair, clockType, targetType, filter},
      describeGroup: computeFn({
        source: {formPair, filter},
        fn: ({formPair, filter}) => `${formPair}, ${filter} filter`,
      }),
      createTestLines: {
        method: 'sample',
        shape: {
          clock: {
            field: clockCode,
            markError: fieldError,
          },
          filter: filterCode,
          target: {
            field: targetCode,
            markError: fieldError,
          },
        },
      },
    },
  })
}

function renderUnitCollection(
  payload: PayloadType,
  role: 'Clock' | 'Target',
  form: Form,
) {
  const unit = `${payload}${role}`
  switch (form) {
    case 'unit':
      return unit
    case 'inline':
      return `[${unit}]`
    case 'mutable':
      return `${unit}Mutable`
    case 'readonlyTuple':
      return `${unit}ReadonlyTuple`
    case 'readonlyArray':
      return `${unit}ReadonlyArray`
  }
}

function isAssignable(source: PayloadType, target: PayloadType) {
  if (source === 'never') return true
  if (target === 'any' || target === 'unknown' || target === 'void') return true
  if (source === 'any') return target !== 'never'
  return source === target
}

const header = `
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

const numberClockReadonlyArray: ReadonlyArray<typeof numberClock> = [numberClock]
const stringClockReadonlyArray: ReadonlyArray<typeof stringClock> = [stringClock]
const unknownClockReadonlyArray: ReadonlyArray<typeof unknownClock> = [unknownClock]
const anyClockReadonlyArray: ReadonlyArray<typeof anyClock> = [anyClock]
const voidClockReadonlyArray: ReadonlyArray<typeof voidClock> = [voidClock]
const neverClockReadonlyArray: ReadonlyArray<typeof neverClock> = [neverClock]

const numberTargetReadonlyArray: ReadonlyArray<typeof numberTarget> = [numberTarget]
const stringTargetReadonlyArray: ReadonlyArray<typeof stringTarget> = [stringTarget]
const unknownTargetReadonlyArray: ReadonlyArray<typeof unknownTarget> = [unknownTarget]
const anyTargetReadonlyArray: ReadonlyArray<typeof anyTarget> = [anyTarget]
const voidTargetReadonlyArray: ReadonlyArray<typeof voidTarget> = [voidTarget]
const neverTargetReadonlyArray: ReadonlyArray<typeof neverTarget> = [neverTarget]
`
