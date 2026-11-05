import {
  bool,
  computeFn,
  computeVariant,
  config,
  every,
  not,
  union,
} from '../runner/manifold/operators'

type Predicate =
  | 'explicitA'
  | 'inferredA'
  | 'booleanA'
  | 'namedA'
  | 'explicitB'
  | 'invalidC'
type TargetType = 'A' | 'B' | 'AB' | 'unknown' | 'void'

export default () => {
  const mode = union({
    oneOf: ['source', 'clock'],
    sort: ['source', 'clock'],
  })
  const predicate = union<Predicate>({
    oneOf: [
      'explicitA',
      'inferredA',
      'booleanA',
      'namedA',
      'explicitB',
      'invalidC',
    ],
    sort: 'string',
  })
  const targetType = union<TargetType>({
    oneOf: ['A', 'B', 'AB', 'unknown', 'void'],
    sort: ['A', 'B', 'AB', 'unknown', 'void'],
  })
  const targetShape = union({
    oneOf: ['unit', 'array'],
    sort: ['unit', 'array'],
  })
  const sourceCode = computeVariant({
    source: {mode},
    variant: {
      source: {mode: 'source'},
      clock: {mode: 'clock'},
    },
    cases: {
      source: 'abSource',
      clock: null,
    },
  })
  const clockCode = computeVariant({
    source: {mode},
    variant: {
      source: {mode: 'source'},
      clock: {mode: 'clock'},
    },
    cases: {
      source: null,
      clock: 'abSource',
    },
  })
  const filterCode = computeVariant({
    source: {predicate},
    variant: {
      explicitA: {predicate: 'explicitA'},
      inferredA: {predicate: 'inferredA'},
      booleanA: {predicate: 'booleanA'},
      namedA: {predicate: 'namedA'},
      explicitB: {predicate: 'explicitB'},
      invalidC: {predicate: 'invalidC'},
    },
    cases: {
      explicitA: "(value): value is A => value.kind === 'a'",
      inferredA: "(value) => value.kind === 'a'",
      booleanA: "(value): boolean => value.kind === 'a'",
      namedA: 'isA',
      explicitB: "(value): value is B => value.kind === 'b'",
      invalidC: '((value): value is C => true)',
    },
  })
  const targetCode = computeFn({
    source: {targetType, targetShape},
    fn: ({targetType, targetShape}) => {
      const target = `${targetType.toLowerCase()}Target`
      return targetShape === 'unit' ? target : `[${target}]`
    },
  })
  const predicateValid = bool({
    source: {predicate},
    false: {predicate: 'invalidC'},
  })
  const targetCompatibleValue = computeFn({
    source: {predicate, targetType},
    fn: ({predicate, targetType}) =>
      targetType === 'unknown' ||
      targetType === 'void' ||
      acceptedPayload(predicate) === targetType ||
      targetType === 'AB',
  })
  const targetPass = bool({
    source: {targetCompatibleValue},
    true: {targetCompatibleValue: true},
  })
  const pass = every([predicateValid, targetPass])
  const sourceMode = bool({
    source: {mode},
    true: {mode: 'source'},
  })
  const clockMode = bool({
    source: {mode},
    true: {mode: 'clock'},
  })
  const sourceSidePredicate = bool({
    source: {predicate},
    true: [{predicate: 'booleanA'}, {predicate: 'invalidC'}],
  })
  const sourceSideTargetError = every([
    sourceSidePredicate,
    not(targetPass),
  ])
  const sourceError = every([sourceMode, sourceSideTargetError])
  const clockError = every([clockMode, sourceSideTargetError])
  const targetError = every([
    predicateValid,
    not(sourceSidePredicate),
    not(targetPass),
  ])

  config({
    header,
    file: 'generated/sampleTypeGuards',
    usedMethods: ['createEvent', 'sample'],
    grouping: {
      pass,
      getHash: [mode, predicate, targetShape],
      tags: {mode, predicate, targetType, targetShape},
      describeGroup: computeFn({
        source: {mode, predicate, targetShape},
        fn: ({mode, predicate, targetShape}) =>
          `${mode}, ${predicate}, ${targetShape} target`,
      }),
      createTestLines: {
        method: 'sample',
        shape: {
          source: {
            field: sourceCode,
            markError: sourceError,
          },
          clock: {
            field: clockCode,
            markError: clockError,
          },
          filter: {
            field: filterCode,
            markError: not(predicateValid),
          },
          target: {
            field: targetCode,
            markError: targetError,
          },
        },
      },
    },
  })
}

function acceptedPayload(predicate: Predicate): 'A' | 'B' | 'AB' | 'C' {
  if (
    predicate === 'explicitA' ||
    predicate === 'inferredA' ||
    predicate === 'namedA'
  ) {
    return 'A'
  }
  if (predicate === 'explicitB') return 'B'
  if (predicate === 'invalidC') return 'C'
  return 'AB'
}

const header = `
type A = {kind: 'a'; a: number}
type B = {kind: 'b'; b: string}
type C = {kind: 'c'; c: boolean}
type AB = A | B

const abSource = createEvent<AB>()
const aTarget = createEvent<A>()
const bTarget = createEvent<B>()
const abTarget = createEvent<AB>()
const unknownTarget = createEvent<unknown>()
const voidTarget = createEvent<void>()

const isA = (value: AB): value is A => value.kind === 'a'
`
