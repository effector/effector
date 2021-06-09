const nextID = (() => {
  let id = 0
  return () => (++id).toString(36)
})()
type Tuple<T = unknown> = readonly [T] | readonly [T, ...(readonly T[])]
type SourceRec = Record<string, Declarator>
type Matcher<Src extends SourceRec> = Partial<
  {[K in keyof Src]: Src[K] extends Ref<infer S, unknown> ? S : never}
>
type SingleVariant<Src extends SourceRec> = Tuple<Matcher<Src>> | Matcher<Src>

type VariantLevel<Src extends SourceRec> = Record<string, SingleVariant<Src>>
type VariantLevelRec<Src extends SourceRec> = Record<string, VariantLevel<Src>>
export type Ref<T, K> = {
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
  | Flag
  | Permute<unknown>

type Permute<T> = Ref<T[], 'permute'>
type Flag = Ref<boolean, 'flag'>

type Separate<T> = Ref<T, 'separate'>

type Union<Cases extends string = string> = Ref<Cases, 'union'> & {
  variants: Tuple<Cases>
}
type Value<T> = Ref<T, 'value'>
type Fn<T> = Ref<T, 'fn'>
type ComputeVariant<T> = Ref<T, 'computeVariant'> & {
  cases: Record<string, T>
}

type Bool = Ref<boolean, 'bool'>

type RawCase = {compute: object} | {split: object}
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
  : readonly []

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
  if (result in ctx.shape) result = `${id}_${result}`
  return result
}
type SepCases_<
  Src extends SourceRec,
  Variants extends VariantLevelRec<Src>,
  AllCases extends Tuple<keyof Variants>
> = AllCases extends readonly [infer CurrentCase, ...(infer CaseNames)]
  ? CurrentCase extends string
    ? CaseNames extends readonly []
      ? Partial<
          {
            [K in keyof Variants[CurrentCase]]: Declarator
          } & {
            __: Declarator
          }
        >
      : CaseNames extends Tuple<string>
      ? Partial<
          {
            [K in keyof Variants[CurrentCase]]:
              | SepCases_<Src, Variants, CaseNames>
              | Declarator
          } &
            (CaseNames extends readonly [
              infer CurrentCaseA,
              ...(infer CaseNamesA),
            ]
              ? CurrentCaseA extends string
                ? CaseNamesA extends readonly []
                  ? {__: Declarator}
                  : CaseNamesA extends Tuple<string>
                  ? {
                      __:
                        | Declarator
                        | Partial<
                            {
                              [K in keyof Variants[CurrentCaseA]]:
                                | Declarator
                                | SepCases_<Src, Variants, CaseNamesA>
                            }
                          >
                    }
                  : 'SepCases_ CaseNamesA not a string[]'
                : 'SepCases_ CaseNames not a string[] 2'
              : 'SepCases_ CurrentCaseA not a string')
        >
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
              : 'never'
          } &
            ('__' extends keyof Cases
              ? {__: Cases['__'] extends Ref<infer T, unknown> ? T : 'never 2'}
              : {})
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
          } &
            ('__' extends keyof Cases
              ? {
                  __: Cases['__'] extends SepCases_<Src, Variants, CaseNames>
                    ? TypeofSepCases_<Src, Variants, Cases['__'], CaseNames>
                    : Cases['__'] extends Ref<infer T, unknown>
                    ? T
                    : unknown
                }
              : {})
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
    : 'never'
  : 'never'

// ------
function isRef(value: unknown): value is Ref<unknown, unknown> {
  return typeof value === 'object' && value !== null && '__t' in value
}

export function separate<
  Src extends SourceRec,
  Variants extends Record<string, VariantLevel<Src> /* | VariantLevel<Src>[]*/>,
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
  const sources: Declarator[] = Object.values(source)
  const variants = {} as any
  for (const variantName in variant) {
    const variantRec = variant[variantName]
    if (
      typeof variantRec !== 'object' ||
      variantRec === null ||
      Array.isArray(variantRec)
    ) {
      throw Error(
        `variant "${variantName}" should be an object with cases-objects`,
      )
    }
    for (const singleMatchName in variantRec) {
      const singleMatch = variantRec[singleMatchName]
      if (typeof singleMatch !== 'object' || singleMatch === null) {
        throw Error(
          `variant "${variantName}/${singleMatchName}" should be an object with cases-objects`,
        )
      }
      for (const singleMatchItem of Array.isArray(singleMatch)
        ? singleMatch
        : [singleMatch]) {
        for (const field in singleMatchItem) {
          if (!(field in source)) {
            throw Error(
              `variant "${variantName}/${singleMatchName}" has field "${field}" without source`,
            )
          }
        }
      }
    }
  }
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

  ctx.shape[val.name] = val.prepared
  ctx.items[val.id] = val
  addSourceRefs(val.id, sources)
  return val

  function traverseCases(
    variants: Record<
      string,
      Record<string, unknown> | Record<string, unknown>[]
    >,
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
      variants: Record<
        string,
        Record<string, unknown> | Record<string, unknown>[]
      >,
      cases: Record<string, any>,
    ) {
      const resultCases: Record<string, any> = {}
      const variant = variants[currentVariantName]
      const branchNames = [
        ...new Set(
          Array.isArray(variant)
            ? variant.flatMap(e => Object.keys(e))
            : Object.keys(variant),
        ),
        '__',
      ]
      for (const branchName of branchNames) {
        if (!(branchName in cases)) continue
        const caseValue = cases[branchName]
        if (isRef(caseValue)) {
          resultCases[branchName] = caseValue.prepared
          ctx.targets[id] = ctx.targets[id] ?? []
          ctx.targets[id].push(caseValue.id)
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
}

export function permute<T>({
  name,
  items,
  noReorder,
  amount,
}: {
  name?: string
  items: T[]
  amount?: {min: number; max: number}
  noReorder?: boolean
}) {
  const id = nextID()
  const permute = {items} as any
  if (typeof noReorder === 'boolean') {
    permute.noReorder = noReorder
  }
  if (amount) permute.amount = amount
  const val: Permute<T> = {
    id,
    name: getName(id, name),
    kind: 'permute',
    __t: null as any,
    prepared: {permute},
  }
  /* if (name === val.name) */ ctx.shape[val.name] = val.prepared
  ctx.items[val.id] = val
  addSourceRefs(val.id)
  return val
}

export function flag({
  name,
  needs,
  avoid,
}: {
  name?: string
  needs?: Declarator | Tuple<Declarator>
  avoid?: Declarator | Tuple<Declarator>
} = {}) {
  const id = nextID()
  const flag = {} as any
  const source: Declarator[] = []
  if (needs) {
    flag.needs = Array.isArray(needs)
      ? needs.map(processDeclarator)
      : processDeclarator(needs as Declarator)
  }
  if (avoid) {
    flag.avoid = Array.isArray(avoid)
      ? avoid.map(processDeclarator)
      : processDeclarator(avoid as Declarator)
  }
  const val: Flag = {
    id,
    name: getName(id, name),
    kind: 'flag',
    __t: null as any,
    prepared: {flag},
  }
  /* if (name === val.name) */ ctx.shape[val.name] = val.prepared
  ctx.items[val.id] = val
  addSourceRefs(val.id, source)
  return val

  function processDeclarator(decl: Declarator) {
    source.push(decl)
    if (decl.name !== decl.id) return decl.name
    return decl.prepared
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
  /* if (name === val.name) */ ctx.shape[val.name] = val.prepared
  ctx.items[val.id] = val
  addSourceRefs(val.id, source)
  return val
}
export function value<T>(value: T, name?: string) {
  const id = nextID()
  const val: Value<T> = {
    id,
    name: getName(id, name),
    kind: 'value',
    __t: value,
    prepared: {value},
  }
  /* if (name === val.name) */ ctx.shape[val.name] = val.prepared
  ctx.items[val.id] = val
  addSourceRefs(val.id)
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
  /* if (name === val.name) */ ctx.shape[val.name] = val.prepared
  ctx.items[val.id] = val
  addSourceRefs(val.id)
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
    __t: null as any,
    prepared: {
      compute: {
        fn(args: Record<string, any>) {
          try {
            return fn(
              argsToSource({
                source,
                args,
              }),
            )
          } catch (err) {
            console.error(err)
            console.log({source, val, args})
          }
        },
      },
    },
  }
  ctx.shape[val.name] = val.prepared
  ctx.items[val.id] = val
  addSourceRefs(val.id, source)
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

  ctx.shape[val.name] = val.prepared
  ctx.items[val.id] = val
  addSourceRefs(val.id, source)
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
  ctx.shape[val.name] = val.prepared
  ctx.items[val.id] = val
  addSourceRefs(val.id, source)
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
    namedArgs = source.map(item => {
      const {name} = item
      // if (!(name in args)) {
      //   throw Error(`no "${item.name}/${item.id}" in args`)
      // }
      return name
    })
  } else {
    const argsMap: Record<string, any> = {}
    for (const key in source) {
      const item = (source as SourceRec)[key]
      // if (!(item.name in args)) {
      //   console.warn({source, args, key, name: item.name})
      //   throw Error(`no "${key}/${item.name}/${item.id}" in args`)
      // }
      argsMap[key] = args[item.name]
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
    if (alias in source) {
      const resolvedName = source[alias].name
      realMatchMap[resolvedName] = caseItem[alias]
    } else {
      console.warn(`no alias "${alias}" in caseItem`, caseItem)
      console.trace('no alias')
    }
  }
  return realMatchMap
}

export function matcher<
  Src extends SourceRec,
  Variant extends VariantLevel<Src>
>(
  source: Src,
  cases: Variant,
): {
  [K in keyof Variant]: Variant[K] extends Tuple<unknown>
    ? {[L in keyof Variant[K]]: Record<string, any>}
    : Record<string, any>
}
export function matcher<
  Src extends SourceRec,
  Variants extends VariantLevel<Src>[]
>(
  source: Src,
  cases: Variants,
): [
  ...{
    [L in keyof Variants]: {
      [K in keyof Variants[L]]: Variants[L][K] extends Tuple<unknown>
        ? {[M in keyof Variants[L][K]]: Record<string, any>}
        : Record<string, any>
    }
  },
]
export function matcher<
  Src extends SourceRec,
  Variant extends VariantLevel<Src> | VariantLevel<Src>[]
>(source: Src, cases: Variant) {
  const result = {} as any
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
  /* if (name === val.name) */ ctx.shape[val.name] = val.prepared
  ctx.items[val.id] = val
  addSourceRefs(val.id)
  return val
}
let ctx: {
  shape: Record<string, any>
  configUsed: boolean
  items: Record<string, Declarator>
  /**
   * references TO id
   *
   * bool({source: {sourceReference}}): referencedBy
   *
   * {[sourceReference]: referencedBy[]}
   * sourceReference -> referencedBy
   * */
  references: Record<string, string[]>
  /**
   * inline references FROM id
   *
   * separate({cases: {_: targetReference}}): referencedBy
   *
   * {[referencedBy]: targetReference[]}
   * referencedBy -> targetReference
   **/
  targets: Record<string, string[]>
  config: {
    header: string
    grouping: Record<string, any>
  }
}
export function config({
  header,
  grouping,
}: {
  header: string
  grouping: Record<string, any>
}) {
  ctx.configUsed = true
  ctx.config.header = header
  ctx.config.grouping = grouping
}

function addSourceRefs(
  id: string,
  source?: Record<string, Declarator> | Tuple<Declarator> | Declarator[],
) {
  ctx.references[id] = []
  if (source) {
    if (Array.isArray(source)) {
      for (const sourceItem of source) {
        ctx.references[sourceItem.id] = ctx.references[sourceItem.id] ?? []
        ctx.references[sourceItem.id].push(id)
      }
    } else {
      for (const field in source) {
        const sourceId = (source as Record<string, Declarator>)[field].id
        ctx.references[sourceId] = ctx.references[sourceId] ?? []
        ctx.references[sourceId].push(id)
      }
    }
  }
}

/** {[reference]: referencedBy[]} */
function toposort(rawGraph: Record<string, string[]>) {
  const graph = {} as Record<string, string[]>
  for (const id in rawGraph) {
    graph[id] = [...new Set(rawGraph[id])]
  }
  const result = [] as string[]
  const visited = {} as Record<string, boolean>
  const temp = {} as Record<string, boolean>
  for (const node in graph) {
    if (!visited[node] && !temp[node]) {
      topologicalSortHelper(node)
    }
  }
  result.reverse()
  return result
  function topologicalSortHelper(node: string) {
    temp[node] = true
    const neighbors = graph[node]
    for (let i = 0; i < neighbors.length; i++) {
      const n = neighbors[i]
      if (temp[n]) {
        // continue
        throw Error('found cycle in DAG')
      }
      if (!visited[n]) {
        topologicalSortHelper(n)
      }
    }
    temp[node] = false
    visited[node] = true
    result.push(node)
  }
}
/**
 * foo bar
 *
 *
 *         const a = value('inline')
 *         const b = value('root', 'b')
 *         const c = flag({source: {a}})
 *         const d = flag({source: {b}, name: 'd'})
 *         const e = value('inline')
 *         const f = value('root', 'f')
 *         const g = separate({source: {a}, cases: {e}})
 *         const h = separate({source: {a}, cases: {f}})
 *         //
 *         const i = value('inline')
 *         const j = separate({source: {a}, cases: {i}})
 *         const k = value('root', 'k')
 *         const l = separate({source: {a}, cases: {k}})
 *         const m = value('inline')
 *         const n = separate({source: {a}, cases: {m}})
 *         //
 *         const o = value('inline')
 *         const p = separate({source: {a}, cases: {o}, name: 'p'})
 *         const q = value('root', 'q')
 *         const r = separate({source: {a}, cases: {q}, name: 'r'})
 *         const s = value('inline')
 *         const t = separate({source: {a}, cases: {s}, name: 't'})
 *
 * named roots
 *
 *
 *
 *         [b, d, f, k, p, q, r, t]
 *
 *
 * inline targets
 *
 *         g ~> e
 *         h ~> f
 *         j ~> i
 *         l ~> k
 *         n ~> m
 *         p ~> o
 *         r ~> q
 *         t ~> s
 *
 * non-inline targets
 *
 *         a -> [c, g, h, j, l, n, p, r, t]
 *         b -> d
 *
 *
 * source -> target chains
 *
 *         a -> [c, g, h, j, l, n, p, r, t]
 *         b -> d
 *         c -> []
 *         d -> []
 *         e -> []
 *         f -> []
 *         g -> e
 *         h -> f
 *         i -> []
 *         j -> i
 *         k -> []
 *         l -> k
 *         m -> []
 *         n -> m
 *         o -> []
 *         p -> o
 *         q -> []
 *         r -> q
 *         s -> []
 *         t -> s
 *
 *
 * target <- source chains
 *
 *         a <- []
 *         b <- []
 *         c <- a
 *         d <- []
 *         e <- g
 *         f <- h
 *         g <- a
 *         h <- a
 *         i <- j
 *         j <- a
 *         k <- l
 *         l <- a
 *         m <- n
 *         n <- a
 *         o <- p
 *         p <- a
 *         q <- r
 *         r <- a
 *         s <- t
 *         t <- a
 *
 *
 * node -> source / target chains
 *
 *         a -> [] / [c, g, h, j, l, n, p, r, t]
 *         b -> [] / d
 *         c -> a / []
 *         d -> [] / []
 *         e -> g / []
 *         f -> h / []
 *         g -> a / e
 *         h -> a / f
 *         i -> j / []
 *         j -> a / i
 *         k -> l / []
 *         l -> a / k
 *         m -> n / []
 *         n -> a / m
 *         o -> p / []
 *         p -> a / o
 *         q -> r / []
 *         r -> a / q
 *         s -> t / []
 *         t -> a / s
 */
function processDeclaratorsToShape() {
  /** graph roots */
  const named = new Set<string>()
  const appearAsInlineTarget = new Set<string>()
  /**
   * inline references FROM id
   *
   * separate({cases: {_: targetReference}}): referencedBy
   *
   * {[referencedBy]: targetReference[]}
   *
   * referencedBy -> targetReference
   **/
  const inlineRefs: Record<string, string[]> = {}
  /**
   * inline references TO id
   *
   * separate({cases: {_: targetReference}}): referencedBy
   *
   * {[targetReference]: referencedBy[]}
   *
   * referencedBy -> targetReference
   **/
  const inlineRefsBack: Record<string, string[]> = {}
  /**
   * array of references FROM id
   *
   * sourceReference -> referencedBy
   *
   * {[sourceReference]: referencedBy[]}
   **/
  const refGraph: Record<string, string[]> = {}
  /**
   * array of references TO id
   *
   * sourceReference[] -> referencedBy
   *
   * {[referencedBy]: sourceReference[]}
   **/
  const refGraphBack: Record<string, string[]> = {}
  const graph: Record<string, string[]> = {}
  for (const id in ctx.items) {
    const val = ctx.items[id]
    const refs = ctx.references[id]
    const targets = ctx.targets[id]
    const hasName = val.name !== val.id
    if (hasName) {
      named.add(id)
    }
    if (!refGraph[id]) refGraph[id] = []
    if (!inlineRefsBack[id]) inlineRefsBack[id] = []
    refGraphBack[id] = []
    inlineRefs[id] = []
    graph[id] = []
    // refGraph[id] ?? []
    if (refs)
      for (const refID of refs) {
        refGraph[refID] = refGraph[refID] ?? []
        refGraph[refID].push(id)
        refGraphBack[id].push(refID)
      }
    if (targets) {
      for (const target of targets) {
        appearAsInlineTarget.add(target)
        inlineRefs[id].push(target)
        inlineRefsBack[target] = inlineRefsBack[target] ?? []
        inlineRefsBack[target].push(id)
      }
    }
  }
  const visited = new Set<string>()
  const only = new Set<string>()
  const stack: [string, 'up' | 'down' | 'target'][] = []
  for (const rootId of named) {
    only.add(rootId)
    visitDecl(rootId)
  }
  for (const id in graph) {
    graph[id].sort((a, b) => {
      const an = parseInt(a, 36)
      const bn = parseInt(b, 36)
      return an - bn
    })
  }
  const sortedIds = toposort(graph)
  const resultShape: Record<string, any> = {}
  for (const id of sortedIds) {
    if (!only.has(id)) continue
    const item = ctx.items[id]
    resultShape[item.name] = item.prepared
  }
  console.log(
    `\n\n\n+++++++++\n`,
    sortedIds
      .filter(e => only.has(e))
      .map(
        id =>
          `${ctx.items[id].name}#${ctx.items[id].kind} => ${graph[id]
            .map(e => `${ctx.items[e].name}#${ctx.items[e].kind}`)
            .join(', ')}`,
      )
      .join(`\n`),
    `\n\n---------\n\n`,
  )

  return resultShape
  function visitDecl(id: string, mode: 'up' | 'down' | 'target' = 'up') {
    const item = ctx.items[id]
    if (
      named.has(id) ||
      !appearAsInlineTarget.has(id) ||
      refGraphBack[id].length > 0 ||
      inlineRefsBack[id].length > 1 ||
      mode === 'up'
    )
      only.add(id)
    if (visited.has(id)) return
    visited.add(id)
    stack.push([
      item.name === item.id ? `${item.kind}#${item.name}` : item.name,
      mode,
    ])
    console.log(stack.map(([id, mode]) => `${id}:${mode}`).join(' -> '))
    refGraph[id].forEach(sourceID => {
      // only.add(sourceID)
      graph[sourceID].push(id)
      visitDecl(sourceID, 'up')
    })
    inlineRefs[id].forEach(targetID => {
      // only.add(targetID)
      graph[targetID].push(id)
      visitDecl(targetID, 'target')
    })
    console.log(
      `${stack[0][0]} ~>`,
      graph[id].map(id => ctx.items[id].name).join(' '),
    )
    stack.pop()
  }
}
export function exec(fn: () => void) {
  const prevShape = ctx
  ctx = {
    shape: {},
    configUsed: false,
    items: {},
    references: {},
    targets: {},
    config: {
      header: '',
      grouping: {},
    },
  }
  try {
    fn()
    const shape = processDeclaratorsToShape()
    if (ctx.configUsed)
      return {
        shape,
        grouping: ctx.config.grouping,
        header: ctx.config.header,
      }
    return shape
  } catch (err) {
    console.error(err)
    const shape = processDeclaratorsToShape()
    if (ctx.configUsed)
      return {
        shape,
        grouping: ctx.config.grouping,
        header: ctx.config.header,
      }
    return shape
  } finally {
    ctx = prevShape
  }
}
