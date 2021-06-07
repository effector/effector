const nextID = (() => {
  let id = 0
  return () => (++id).toString(36)
})()
type Tuple<T = unknown> = [T] | [T, ...T[]]
type SourceRec = Record<string, Declarator>
type Matcher<Src extends SourceRec> = Partial<
  {[K in keyof Src]: Src[K] extends Ref<infer S, unknown> ? S : never}
>
type SingleVariant<Src extends SourceRec> = Tuple<Matcher<Src>> | Matcher<Src>

type VariantLevel<Src extends SourceRec> = Record<string, SingleVariant<Src>>
type VariantLevelRec<Src extends SourceRec> = Record<string, VariantLevel<Src>>
type Ref<T, K> = {
  id: string
  name: string
  kind: K
  __t: T
  prepared: object
}
type Declarator =
  | Union
  | Value<unknown>
  | Fn<unknown>
  | Raw<unknown>
  | ComputeVariant<unknown>
  | Bool
  | Separate<unknown>

type Separate<T> = Ref<T, 'separate'>

type Union<Cases extends string = string> = Ref<Cases, 'union'> & {
  variants: Tuple<Cases>
}
type Value<T> = Ref<T, 'value'> & {
  value: T
}
type Fn<T> = Ref<T, 'fn'> & {fn: (args: any) => T}
type ComputeVariant<T> = Ref<T, 'computeVariant'> & {
  cases: Record<string, T>
}

type Bool = Ref<boolean, 'bool'>

type RawCase = {compute: object} | {split: object} | {flag: object}
type Raw<T = unknown> = Ref<T, 'raw'> & {value: RawCase}

type BuiltInObject =
  | Error
  | Date
  | RegExp
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | ReadonlyMap<unknown, unknown>
  | ReadonlySet<unknown>
  | WeakMap<object, unknown>
  | WeakSet<object>
  | ArrayBuffer
  | DataView
  | Function
  | Promise<unknown>
  | Generator

/**
 * Force typescript to print real type instead of geneic types
 *
 * It's better to see {a: string; b: number}
 * instead of GetCombinedValue<{a: Store<string>; b: Store<number>}>
 * */
type Show<A extends any> = A extends BuiltInObject
  ? A
  : {
      [K in keyof A]: A[K]
    } // & {}

type UnionToIntersection<Union> = // `extends unknown` is always going to be the case and is used to convert the
  // `Union` into a [distributive conditional
  // type](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types).
  (Union extends unknown // The union type is used as the only argument to a function since the union // of function arguments is an intersection.
  ? (distributedUnion: Union) => void // This won't happen.
  : never) extends (mergedIntersection: infer Intersection) => void // arguments of unions of functions as an intersection of the union. // Infer the `Intersection` type since TypeScript represents the positional
    ? Intersection
    : never
type UnionToTuple<Union> = UnionToIntersection<
  // Distributive conditional trick.
  // See the source for the `UnionToIntersection` type for more details.
  Union extends unknown ? (distributed: Union) => void : never
> extends (merged: infer Intersection) => void // Transforms ('A' | 'B') into [[[], "A"], "B"], but destructures the arrays
  ? readonly [...UnionToTuple<Exclude<Union, Intersection>>, Intersection]
  : []

type CaseLayerLast<
  Src extends SourceRec,
  Variants extends VariantLevelRec<Src>,
  CurrentCase extends keyof Variants
> = {
  [K in keyof Variants[CurrentCase]]: unknown
}

//prettier-ignore
type CaseLayerMiddle<
  Src extends SourceRec,
  Variants extends VariantLevelRec<Src>,
  CurrentCase extends keyof Variants,
  CaseNames extends Tuple<keyof Variants>
> = CaseNames extends readonly [infer NextCase, ...infer NextCaseNames]
  ? NextCase extends string
    ? {
      [VariantName in keyof Variants[CurrentCase]]: NextCaseNames extends readonly []
        ? CaseLayerLast<Src, Variants, NextCase> | unknown
        : NextCaseNames extends Tuple<string>
        ? CaseLayerMiddle<Src, Variants, NextCase, NextCaseNames>
        : 'NextCaseNames not a string[]'
    }
    : 'NextCase not a string'
  : 'CaseLayerMiddle never'

type CaseLayer<
  Src extends SourceRec,
  Variants extends VariantLevelRec<Src>
> = UnionToTuple<keyof Variants> extends readonly [
  infer CurrentCase,
  ...(infer CaseNames),
]
  ? CurrentCase extends string
    ? CaseNames extends readonly []
      ? CaseLayerLast<Src, Variants, CurrentCase>
      : CaseNames extends Tuple<string>
      ? CaseLayerMiddle<Src, Variants, CurrentCase, CaseNames>
      : 'CaseNames not a string[]'
    : 'CurrentCase not a string'
  : 'CaseLayer never'

type ValueOf<Obj extends Record<string, unknown>> = Show<
  {
    [K in keyof Obj]: Obj[K] extends infer T ? T : never
  }[keyof Obj]
>

type TypeOfCaseLayerLast<
  Src extends SourceRec,
  Variants extends VariantLevelRec<Src>,
  CurrentCase extends keyof Variants,
  Layer extends CaseLayerLast<Src, Variants, CurrentCase>
> = ValueOf<Layer>

type TypeOfCaseLayerMiddle<
  Src extends SourceRec,
  Variants extends VariantLevelRec<Src>,
  CurrentCase extends keyof Variants,
  CaseNames extends Tuple<keyof Variants>,
  Layer extends CaseLayerMiddle<Src, Variants, CurrentCase, CaseNames>
> = CaseNames extends readonly [infer NextCase, ...(infer NextCaseNames)]
  ? NextCase extends string
    ? NextCaseNames extends readonly []
      ? ValueOf<
          {
            [K in keyof Layer]: Layer[K] extends CaseLayerLast<
              Src,
              Variants,
              NextCase
            >
              ? TypeOfCaseLayerLast<Src, Variants, NextCase, Layer[K]>
              : 'TypeOf CaseLayerMiddle A' //Layer[K]
          }
        >
      : NextCaseNames extends Tuple<string>
      ? ValueOf<
          {
            [K in keyof Layer]: Layer[K] extends CaseLayerMiddle<
              Src,
              Variants,
              NextCase,
              NextCaseNames
            >
              ? TypeOfCaseLayerMiddle<
                  Src,
                  Variants,
                  NextCase,
                  NextCaseNames,
                  Layer[K]
                >
              : 'TypeOf CaseLayerMiddle B' //Layer[K]
          }
        >
      : 'NextCaseNames not a string[]'
    : 'NextCase not a string'
  : 'TypeOf CaseLayerMiddle never'
type IsEq<A, B> = A extends B ? (B extends A ? 1 : 0) : 0
type TypeOfCaseLayer<
  Src extends SourceRec,
  Variants extends VariantLevelRec<Src>,
  Layer extends CaseLayer<Src, Variants>
> = UnionToTuple<keyof Variants> extends readonly [
  infer CurrentCase,
  ...(infer CaseNames),
]
  ? CurrentCase extends string
    ? CaseNames extends readonly []
      ? ValueOf<
          {
            [K in keyof Layer]: Layer[K] extends CaseLayerLast<
              Src,
              Variants,
              CurrentCase
            >
              ? TypeOfCaseLayerLast<Src, Variants, CurrentCase, Layer[K]>
              : LayerValue<Src, Variants, CurrentCase, Layer, K>
          }
        >
      : CaseNames extends Tuple<string>
      ? CaseNames extends readonly [infer NextCase, ...(infer NextCaseNames)]
        ? NextCase extends string
          ? NextCaseNames extends readonly []
            ? ValueOf<
                {
                  [K in keyof Layer]: Layer[K] extends CaseLayerLast<
                    Src,
                    Variants,
                    NextCase
                  >
                    ? TypeOfCaseLayerLast<Src, Variants, NextCase, Layer[K]>
                    : LayerValue<Src, Variants, NextCase, Layer, K>
                }
              >
            : NextCaseNames extends Tuple<string>
            ? ValueOf<
                {
                  [K in keyof Layer]: Layer[K] extends CaseLayerMiddle<
                    Src,
                    Variants,
                    NextCase,
                    NextCaseNames
                  >
                    ? TypeOfCaseLayerMiddle<
                        Src,
                        Variants,
                        NextCase,
                        NextCaseNames,
                        Layer[K]
                      >
                    : LayerValue<Src, Variants, NextCase, Layer, K>
                }
              >
            : 'NextCaseNames not a string[]'
          : 'NextCase not a string'
        : 'wrong CaseNames'
      : 'CaseNames not a string[]'
    : 'CurrentCase not a string'
  : 'TypeOf CaseLayer never'
type LayerValue<
  Src extends SourceRec,
  Variants extends VariantLevelRec<Src>,
  Case extends keyof Variants,
  Layer extends CaseLayer<Src, Variants>,
  K extends keyof Layer
> = Layer[K] extends object
  ? IsEq<keyof Layer[K], keyof Variants[Case]> extends 1
    ? ValueOf<{[L in keyof Layer[K]]: Layer[K][L]}>
    : Layer[K]
  : Layer[K]

function getName(id: string, name?: string) {
  let result = name ?? id
  if (result in currentShape) result = `${id}_${result}`
  return result
}
type SepCases_<
  Src extends SourceRec,
  Variants extends VariantLevelRec<Src>,
  AllCases extends Tuple<keyof Variants>
> = AllCases extends readonly [infer CurrentCase, ...(infer CaseNames)]
  ? CurrentCase extends string
    ? CaseNames extends readonly []
      ? Partial<{[K in keyof Variants[CurrentCase]]: Declarator}>
      : CaseNames extends Tuple<string>
      ? {
          [K in keyof Variants[CurrentCase]]:
            | Declarator
            | SepCases_<Src, Variants, CaseNames>
        }
      : 'CaseNames not a string[]'
    : 'CurrentCase not a string'
  : 'TypeOf CaseLayer never'
type SepCases<
  Src extends SourceRec,
  Variants extends VariantLevelRec<Src>
> = UnionToTuple<keyof Variants> extends readonly [...(infer Keys)]
  ? Keys extends Tuple<keyof Variants>
    ? SepCases_<Src, Variants, Keys>
    : never
  : never

type TypeofSepCases_<
  Src extends SourceRec,
  Variants extends VariantLevelRec<Src>,
  Cases extends SepCases<Src, Variants>,
  AllCases extends Tuple<keyof Variants>
> = AllCases extends readonly [infer CurrentCase, ...(infer CaseNames)]
  ? CurrentCase extends string
    ? CaseNames extends readonly []
      ? ValueOf<
          {
            [K in keyof Variants[CurrentCase]]: Cases[K] extends Ref<
              infer T,
              unknown
            >
              ? T
              : never
          }
        >
      : CaseNames extends Tuple<string>
      ? ValueOf<
          {
            [K in keyof Variants[CurrentCase]]: Cases[K] extends SepCases_<
              Src,
              Variants,
              CaseNames
            >
              ? TypeofSepCases_<Src, Variants, Cases[K], CaseNames>
              : Cases[K] extends Ref<infer T, unknown>
              ? T
              : unknown
          }
        >
      : 'CaseNames not a string[]'
    : 'CurrentCase not a string'
  : 'TypeOf CaseLayer never'

type TypeofSepCases<
  Src extends SourceRec,
  Variants extends VariantLevelRec<Src>,
  Cases extends SepCases<Src, Variants>
> = UnionToTuple<keyof Variants> extends readonly [...(infer Keys)]
  ? Keys extends Tuple<keyof Variants>
    ? TypeofSepCases_<Src, Variants, Cases, Keys>
    : never
  : never

// ------
function isRef(value: unknown): value is Ref<unknown, unknown> {
  return typeof value === 'object' && value !== null && '__t' in value
}
/**
 * default cases '__' are not used in type inference
 */
export function separate<
  Src extends SourceRec,
  Variants extends VariantLevelRec<Src>,
  Cases extends SepCases<Src, Variants>
>({
  name,
  variant,
  cases,
  source,
}: {
  source: Src
  name?: string
  variant: Variants
  cases: Cases
}): Separate<TypeofSepCases<Src, Variants, Cases>> {
  const id = nextID()

  const variants = {} as any
  for (const variantName in variant) {
    variants[variantName] = matcher(source, variant[variantName])
  }

  const val: Separate<TypeofSepCases<Src, Variants, Cases>> = {
    id,
    name: getName(id, name),
    kind: 'separate',
    __t: null as any,
    prepared: {
      split: {
        variants,
        cases: traverseCases(variant, cases),
      },
    },
  }

  currentShape[val.name] = val.prepared
  return val
}
function traverseCases(
  variants: Record<string, Record<string, unknown>>,
  cases: Record<string, any>,
): Record<string, any> {
  const variantNames = Object.keys(variants)
  if (variantNames.length === 0) {
    console.warn(`empty variants for cases`, cases)
    return {}
  }
  const [first, ...rest] = variantNames
  return traverseCases_(first, rest, variants, cases)
  function traverseCases_(
    currentVariantName: string,
    nextVariants: string[],
    variants: Record<string, Record<string, unknown>>,
    cases: Record<string, any>,
  ) {
    const resultCases: Record<string, any> = {}
    const variant = variants[currentVariantName]
    const branchNames = [...Object.keys(variant), '__']
    for (const branchName of branchNames) {
      if (!(branchName in cases)) continue
      const caseValue = cases[branchName]
      if (isRef(caseValue)) {
        resultCases[branchName] = caseValue.prepared
        // {
        //   ref: caseValue.name,
        // }
      } else if (typeof caseValue === 'object' && caseValue !== null) {
        if (nextVariants.length > 0) {
          const [first, ...rest] = nextVariants
          resultCases[branchName] = traverseCases_(
            first,
            rest,
            variants,
            caseValue,
          )
        } else {
          console.warn(
            `incorrect case value for last branch "${branchName}"`,
            caseValue,
          )
        }
      } else {
        console.warn(
          `incorrect case value for branch "${branchName}"`,
          caseValue,
        )
      }
    }
    return resultCases
  }
}

export function bool<Src extends SourceRec>({
  source,
  name,
  true: onTrue,
  false: onFalse,
}: {
  source: Src
  name?: string
  true?: SingleVariant<Src>
  false?: SingleVariant<Src>
}) {
  const id = nextID()
  const val: Bool = {
    id,
    name: getName(id, name),
    kind: 'bool',
    __t: false,
    prepared: {
      bool: {
        true: onTrue && singleMatcher(source, onTrue),
        false: onFalse && singleMatcher(source, onFalse),
      },
    },
  }
  if (name === val.name) currentShape[val.name] = val.prepared
  return val
}
export function value<T>(value: T, name?: string) {
  const id = nextID()
  const val: Value<T> = {
    id,
    name: getName(id, name),
    kind: 'value',
    value,
    __t: value,
    prepared: {value},
  }
  if (name === val.name) currentShape[val.name] = val.prepared
  return val
}
export function union<OneOf extends string>(
  oneOf: Tuple<OneOf>,
  name?: string,
) {
  const id = nextID()
  const val: Union<OneOf> = {
    id,
    name: getName(id, name),
    kind: 'union',
    variants: oneOf,
    __t: null as any,
    prepared: {union: oneOf},
  }
  if (name === val.name) currentShape[val.name] = val.prepared
  return val
}
export function computeFn<Src extends Tuple<Declarator> | SourceRec, T>({
  source,
  fn,
  name,
}: {
  source: Src
  fn: (
    args: {
      [K in keyof Src]: Src[K] extends Ref<infer S, unknown> ? S : never
    },
  ) => T
  name?: string
}) {
  const id = nextID()
  const val: Fn<T> = {
    id,
    name: getName(id, name),
    kind: 'fn',
    fn,
    __t: null as any,
    prepared: {
      compute: {
        fn(args: Record<string, any>) {
          return val.fn(
            argsToSource({
              source,
              args,
            }),
          )
        },
      },
    },
  }
  currentShape[val.name] = val.prepared
  return val
}
export function computeVariants<
  Src extends SourceRec,
  Variants extends VariantLevelRec<Src>,
  Cases extends CaseLayer<Src, Variants>
>({
  source,
  variant,
  cases,
  name,
}: {
  source: Src
  variant: Variants
  cases: Cases
  name?: string
}): ComputeVariant<TypeOfCaseLayer<Src, Variants, Cases>> {
  const id = nextID()

  const variants = {} as any
  for (const variantName in variant) {
    variants[variantName] = matcher(source, variant[variantName])
  }
  const val: ComputeVariant<TypeOfCaseLayer<Src, Variants, Cases>> = {
    id,
    name: getName(id, name),
    kind: 'computeVariant',
    cases: cases as any,
    __t: null as any,
    prepared: {
      compute: {variants, cases},
    },
  }

  currentShape[val.name] = val.prepared
  return val
}
export function computeVariant<
  Src extends SourceRec,
  Variant extends VariantLevel<Src>,
  Cases extends {[K in keyof Variant]: unknown}
>({
  source,
  variant,
  cases,
  name,
}: {
  source: Src
  variant: Variant
  cases: Cases
  name?: string
}): ComputeVariant<Cases[keyof Cases]> {
  const id = nextID()

  const val: ComputeVariant<Cases[keyof Cases]> = {
    id,
    name: getName(id, name),
    kind: 'computeVariant',
    cases: cases as any,
    __t: null as any,
    prepared: {
      compute: {
        variant: matcher(source, variant),
        cases,
      },
    },
  }
  currentShape[val.name] = val.prepared
  return val
}
/** convert internal variable map to object with human-readable fields
 *
 *      args = {foo_1: 0, bar_2: 'ok'}
 *        source = {foo: foo_1, bar: bar_2}
 *          return = {foo: 0, bar: 'ok'}
 *        source = [bar_2, foo_1]
 *          return = ['ok', 0]
 */
function argsToSource<Src extends Tuple<Declarator> | SourceRec>({
  source,
  args,
}: {
  source: Src
  args: Record<string, any>
}): {
  [K in keyof Src]: Src[K] extends Ref<infer T, unknown> ? T : never
} {
  let namedArgs: any
  if (Array.isArray(source)) {
    namedArgs = source.map(({name}) => args[name])
  } else {
    const argsMap: Record<string, any> = {}
    for (const key in source) {
      argsMap[key] = args[(source as SourceRec)[key].name]
    }
    namedArgs = argsMap
  }
  return namedArgs
}
/** convert object with human-readable fields to internal variable map
 *
 *      caseItem = {foo: 0, bar: 'ok'}
 *      source = {foo: foo_1, bar: bar_2}
 *        return = {foo_1: 0, bar_2: 'ok'}
 */
function sourceToArgs<
  Src extends SourceRec,
  Case extends Partial<
    {[K in keyof Src]: Src[K] extends Ref<infer S, unknown> ? S : never}
  >
>(source: Src, caseItem: Case) {
  const realMatchMap = {} as Record<string, any>
  for (const alias in caseItem) {
    const resolvedName = source[alias].name
    realMatchMap[resolvedName] = caseItem[alias]
  }
  return realMatchMap
}

export function matcher<
  Src extends SourceRec,
  Variant extends VariantLevel<Src>
>(source: Src, cases: Variant) {
  const result = {} as {
    [K in keyof Variant]: Variant[K] extends Tuple<unknown>
      ? {[L in keyof Variant[K]]: Record<string, any>}
      : Record<string, any>
  }
  for (const key in cases) {
    result[key] = singleMatcher(source, cases[key]) as any
  }
  return result
}
function singleMatcher<
  Src extends SourceRec,
  VariantField extends SingleVariant<Src>
>(source: Src, caseItem: VariantField) {
  if (Array.isArray(caseItem)) {
    return caseItem.map(caseItem => sourceToArgs(source, caseItem))
  }
  return sourceToArgs(
    source,
    caseItem as Exclude<VariantField, Tuple<Matcher<Src>>>,
  )
}
export function insert<T = unknown>(name: string, shape: RawCase): Raw<T>
export function insert<T = unknown>(shape: RawCase): Raw<T>
export function insert<T = unknown>(...args: [RawCase] | [string, RawCase]) {
  const id = nextID()
  let name: string
  let shape: RawCase
  if (typeof args[0] === 'string' && args[1]) {
    ;[name, shape] = args
  } else {
    ;[shape] = args
    name = id
  }
  const val: Raw<T> = {
    id,
    name: getName(id, name),
    kind: 'raw',
    value: shape,
    __t: null as any,
    prepared: shape,
  }
  if (name === val.name) currentShape[val.name] = val.prepared
  return val
}
let currentShape: Record<string, any>
export function exec(fn: () => void) {
  const prevShape = currentShape
  currentShape = {}
  try {
    fn()
    return currentShape
  } finally {
    currentShape = prevShape
  }
}
