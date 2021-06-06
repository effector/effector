const nextID = (() => {
  let id = 0
  return () => (++id).toString(36)
})()
type Tuple<T = unknown> = [T] | [T, ...T[]]
type Matcher<Src extends Record<string, Declarator>> = Partial<
  {[K in keyof Src]: Src[K] extends Ref<infer S, unknown> ? S : never}
>
type MatcherDeep<
  SrcLayers extends Record<string, Record<string, Declarator>>
> = {
  [L in keyof SrcLayers]: Partial<
    {
      [K in keyof SrcLayers[L]]: SrcLayers[L][K] extends Ref<infer S, unknown>
        ? S
        : never
    }
  >
}
type Ref<T, K> = {
  id: string
  name: string
  kind: K
  __t: T
}
type Declarator =
  | Union
  | Value<unknown>
  | Fn<unknown>
  | Raw<unknown>
  | ComputeVariant<unknown>
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
type RawCase =
  | {compute: object}
  | {value: any}
  | {split: object}
  | {flag: object}
  | {true: object}
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

type VariantRec<Src extends Record<string, Declarator>> = Record<
  string,
  Tuple<Matcher<Src>> | Matcher<Src>
>
type CaseLayerLast<
  Src extends Record<string, Declarator>,
  Variants extends Record<string, VariantRec<Src>>,
  CurrentCase extends keyof Variants
> = {
  [K in keyof Variants[CurrentCase]]: unknown
}

//prettier-ignore
type CaseLayerMiddle<
  Src extends Record<string, Declarator>,
  Variants extends Record<string, VariantRec<Src>>,
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
  Src extends Record<string, Declarator>,
  Variants extends Record<string, VariantRec<Src>>
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
  Src extends Record<string, Declarator>,
  Variants extends Record<string, VariantRec<Src>>,
  CurrentCase extends keyof Variants,
  Layer extends CaseLayerLast<Src, Variants, CurrentCase>
> = ValueOf<Layer>

type TypeOfCaseLayerMiddle<
  Src extends Record<string, Declarator>,
  Variants extends Record<string, VariantRec<Src>>,
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
  Src extends Record<string, Declarator>,
  Variants extends Record<string, VariantRec<Src>>,
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
  Src extends Record<string, Declarator>,
  Variants extends Record<string, VariantRec<Src>>,
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
export function value<T>(value: T, name?: string) {
  const id = nextID()
  const val: Value<T> = {
    id,
    name: getName(id, name),
    kind: 'value',
    value,
    __t: value,
  }
  currentShape[val.name] = {value}
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
  }
  currentShape[val.name] = {union: oneOf}
  return val
}
export function computeFn<
  Src extends Tuple<Declarator> | Record<string, Declarator>,
  T
>({
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
  }
  currentShape[val.name] = {
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
  }
  return val
}
export function computeVariants<
  Src extends Record<string, Declarator>,
  Variants extends Record<string, VariantRec<Src>>,
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

  const val: ComputeVariant<TypeOfCaseLayer<Src, Variants, Cases>> = {
    id,
    name: getName(id, name),
    kind: 'computeVariant',
    cases: cases as any,
    __t: null as any,
  }
  const variants = {} as any
  for (const variantName in variant) {
    variants[variantName] = matcher(source, variant[variantName])
  }
  currentShape[val.name] = {
    compute: {variants, cases},
  }
  return val
}
export function computeVariant<
  Src extends Record<string, Declarator>,
  Variant extends Record<string, Tuple<Matcher<Src>> | Matcher<Src>>,
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
}): ComputeVariant<Cases[keyof Cases]>
// export function computeVariant<
//   SrcLayers extends Record<string, Record<string, Declarator>>,
//   Variant extends Record<string, MatcherDeep<SrcLayers>>,
//   Cases extends {[K in keyof Variant]: }
// >({
//   source,
//   variant,
//   cases,
//   name,
// }: {
//   source: Src
//   variant: Variant
//   cases: Cases
//   name?: string
// }): ComputeVariant<Cases[keyof Cases]>
export function computeVariant<
  Src extends Record<string, Declarator>,
  Variant extends Record<string, Tuple<Matcher<Src>> | Matcher<Src>>,
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
  }
  currentShape[val.name] = {
    compute: {
      variant: matcher(source, variant),
      cases,
    },
  }
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
function argsToSource<
  Src extends Tuple<Declarator> | Record<string, Declarator>
>({
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
      argsMap[key] = args[(source as Record<string, Declarator>)[key].name]
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
  Src extends Record<string, Declarator>,
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
  Src extends Record<string, Declarator>,
  Cases extends Record<string, Tuple<Matcher<Src>> | Matcher<Src>>
>(source: Src, cases: Cases) {
  const result = {} as {
    [K in keyof Cases]: Cases[K] extends Tuple<unknown>
      ? {[L in keyof Cases[K]]: Record<string, any>}
      : Record<string, any>
  }
  for (const key in cases) {
    result[key] = singleMatcher(source, cases[key]) as any
  }
  return result
}
function singleMatcher<
  Src extends Record<string, Declarator>,
  Case extends Tuple<Matcher<Src>> | Matcher<Src>
>(source: Src, caseItem: Case) {
  if (Array.isArray(caseItem)) {
    return caseItem.map(caseItem => sourceToArgs(source, caseItem))
  }
  return sourceToArgs(source, caseItem as Exclude<Case, Tuple<Matcher<Src>>>)
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
  }
  currentShape[val.name] = shape
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
