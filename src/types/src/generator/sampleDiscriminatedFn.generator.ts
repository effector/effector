import {
  bool,
  computeFn,
  config,
  every,
  not,
  union,
} from '../runner/manifold/operators'

type DataType = 'A' | 'AB' | 'ABC'
type FnArgument = 'inferred' | DataType
type TargetType = DataType | 'unknown' | 'void'

const dataTypes = ['A', 'AB', 'ABC'] as const

export default () => {
  const sourceType = union<DataType>({
    oneOf: dataTypes,
    sort: [...dataTypes],
  })
  const fnArgument = union<FnArgument>({
    oneOf: ['inferred', ...dataTypes],
    sort: ['inferred', ...dataTypes],
  })
  const fnReturn = union<DataType>({
    oneOf: dataTypes,
    sort: [...dataTypes],
  })
  const targetType = union<TargetType>({
    oneOf: [...dataTypes, 'unknown', 'void'],
    sort: [...dataTypes, 'unknown', 'void'],
  })
  const targetShape = union({
    oneOf: ['unit', 'array'],
    sort: ['unit', 'array'],
  })
  const sourceCode = computeFn({
    source: {sourceType},
    fn: ({sourceType}) => `${sourceType.toLowerCase()}Source`,
  })
  const fnCode = computeFn({
    source: {fnArgument, fnReturn},
    fn: ({fnArgument, fnReturn}) => {
      const argument =
        fnArgument === 'inferred' ? 'value' : `value: ${fnArgument}`
      return `(${argument}) => null as unknown as ${fnReturn}`
    },
  })
  const targetCode = computeFn({
    source: {targetType, targetShape},
    fn: ({targetType, targetShape}) => {
      const target = `${targetType.toLowerCase()}Target`
      return targetShape === 'unit' ? target : `[${target}]`
    },
  })
  const fnCompatible = computeFn({
    source: {sourceType, fnArgument},
    fn: ({sourceType, fnArgument}) =>
      fnArgument === 'inferred' || isSubtype(sourceType, fnArgument),
  })
  const targetCompatible = computeFn({
    source: {fnReturn, targetType},
    fn: ({fnReturn, targetType}) =>
      targetType === 'unknown' ||
      targetType === 'void' ||
      isSubtype(fnReturn, targetType),
  })
  const fnPass = bool({
    source: {fnCompatible},
    true: {fnCompatible: true},
  })
  const targetPass = bool({
    source: {targetCompatible},
    true: {targetCompatible: true},
  })
  const pass = every([fnPass, targetPass])
  const targetError = every([fnPass, not(targetPass)])

  config({
    header,
    file: 'generated/sampleDiscriminatedFn',
    usedMethods: ['createEvent', 'sample'],
    grouping: {
      pass,
      getHash: [sourceType, fnArgument, targetShape],
      tags: {sourceType, fnArgument, fnReturn, targetType, targetShape},
      describeGroup: computeFn({
        source: {sourceType, fnArgument, targetShape},
        fn: ({sourceType, fnArgument, targetShape}) =>
          `${sourceType} source, ${fnArgument} fn argument, ${targetShape} target`,
      }),
      createTestLines: {
        method: 'sample',
        shape: {
          source: sourceCode,
          fn: {
            field: fnCode,
            markError: not(pass),
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

function isSubtype(source: DataType, target: DataType) {
  const order: DataType[] = ['A', 'AB', 'ABC']
  return order.indexOf(source) <= order.indexOf(target)
}

const header = `
type A = {kind: 'a'; a: number}
type B = {kind: 'b'; b: string}
type C = {kind: 'c'; c: boolean}
type AB = A | B
type ABC = A | B | C

const aSource = createEvent<A>()
const abSource = createEvent<AB>()
const abcSource = createEvent<ABC>()

const aTarget = createEvent<A>()
const abTarget = createEvent<AB>()
const abcTarget = createEvent<ABC>()
const unknownTarget = createEvent<unknown>()
const voidTarget = createEvent<void>()
`
