export type Tuple<T = unknown> = readonly [T] | readonly [T, ...(readonly T[])]
export type SourceRec = Record<string, Declarator>
export type Matcher<Src extends SourceRec> = Partial<
  {[K in keyof Src]: Src[K] extends Ref<infer S, unknown> ? S : never}
>
export type SingleVariant<Src extends SourceRec> =
  | Tuple<Matcher<Src>>
  | Matcher<Src>

export type VariantLevel<Src extends SourceRec> = Record<
  string,
  SingleVariant<Src>
>
export type VariantLevelRec<Src extends SourceRec> = Record<
  string,
  VariantLevel<Src>
>
export type Ref<T, K> = {
  id: string
  name: string
  kind: K
  __t: T
  prepared: object
}
export type Declarator =
  | Union
  | UnionAny<unknown>
  | Value<unknown>
  | Fn<unknown>
  | Raw<unknown>
  | ComputeVariant<unknown>
  | Bool
  | Separate<unknown>
  | Flag
  | Permute<unknown>

export type DataDecl<T> =
  | UnionAny<T>
  | Value<T>
  | Fn<T>
  | Raw<T>
  | ComputeVariant<T>
  | Separate<T>
  | Permute<T>

export type BoolDecl =
  | Flag
  | Bool
  | UnionAny<boolean>
  | Value<boolean>
  | Fn<boolean>
  | Raw<boolean>
  | ComputeVariant<boolean>
  | Separate<boolean>

export type Permute<T> = Ref<T[], 'permute'> & {
  permute: {
    items: T[]
    noReorder?: boolean
    amount?: {min: number; max: number}
  }
}
export type Flag = Ref<boolean, 'flag'> & {
  needs: string[]
  avoid: string[]
  decls: {
    true: Value<boolean>
    false: Value<boolean>
  }
}

export type Separate<T> = Ref<T, 'separate'> & {
  variant: Record<string, Record<string, any>>
  cases: Record<string, Ref<unknown, unknown> | Record<string, unknown>>
}

type UnionAny<Cases> = Ref<Cases, 'union'> & {
  variants: Tuple<Cases>
}
export type Union<Cases extends string = string> = Ref<Cases, 'union'> & {
  variants: Tuple<Cases>
}
export type Value<T> = Ref<T, 'value'> & {value: T}
export type Fn<T> = Ref<T, 'fn'> & {
  fn(args: Record<string, any>): T | void
}
export type ComputeVariant<T> = Ref<T, 'computeVariant'> & {
  variant: Record<string, Record<string, any>>
  cases: Record<string, Ref<unknown, unknown> | Record<string, unknown>>
}

export type Bool = Ref<boolean, 'bool'> & {
  bool: {
    true: Record<string, any> | Record<string, any>[] | void
    false: Record<string, any> | Record<string, any>[] | void
  }
  decls: {
    true: Value<boolean>
    false: Value<boolean>
  }
}

export type RawCase = {compute: object} | {split: object}
export type Raw<T = unknown> = Ref<T, 'raw'> & {value: RawCase}

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
  (
    Union extends unknown // The union type is used as the only argument to a function since the union // of function arguments is an intersection.
      ? (distributedUnion: Union) => void // This won't happen.
      : never
  ) extends (mergedIntersection: infer Intersection) => void // arguments of unions of functions as an intersection of the union. // Infer the `Intersection` type since TypeScript represents the positional
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
  CurrentCase extends keyof Variants,
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

export type CaseLayer<
  Src extends SourceRec,
  Variants extends VariantLevelRec<Src>,
> = UnionToTuple<keyof Variants> extends readonly [
  infer CurrentCase,
  ...infer CaseNames
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
  Layer extends CaseLayerLast<Src, Variants, CurrentCase>,
> = ValueOf<Layer>

type TypeOfCaseLayerMiddle<
  Src extends SourceRec,
  Variants extends VariantLevelRec<Src>,
  CurrentCase extends keyof Variants,
  CaseNames extends Tuple<keyof Variants>,
  Layer extends CaseLayerMiddle<Src, Variants, CurrentCase, CaseNames>,
> = CaseNames extends readonly [infer NextCase, ...infer NextCaseNames]
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
export type TypeOfCaseLayer<
  Src extends SourceRec,
  Variants extends VariantLevelRec<Src>,
  Layer extends CaseLayer<Src, Variants>,
> = UnionToTuple<keyof Variants> extends readonly [
  infer CurrentCase,
  ...infer CaseNames
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
      ? CaseNames extends readonly [infer NextCase, ...infer NextCaseNames]
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
  K extends keyof Layer,
> = Layer[K] extends object
  ? IsEq<keyof Layer[K], keyof Variants[Case]> extends 1
    ? ValueOf<{[L in keyof Layer[K]]: Layer[K][L]}>
    : Layer[K]
  : Layer[K]

type SepCases_<
  Src extends SourceRec,
  Variants extends VariantLevelRec<Src>,
  AllCases extends Tuple<keyof Variants>,
> = AllCases extends readonly [infer CurrentCase, ...infer CaseNames]
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
              ...infer CaseNamesA
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

export type SepCases<
  Src extends SourceRec,
  Variants extends VariantLevelRec<Src>,
> = UnionToTuple<keyof Variants> extends readonly [...infer Keys]
  ? Keys extends Tuple<keyof Variants>
    ? SepCases_<Src, Variants, Keys>
    : never
  : never

type TypeofSepCases_<
  Src extends SourceRec,
  Variants extends VariantLevelRec<Src>,
  Cases extends SepCases<Src, Variants>,
  AllCases extends Tuple<keyof Variants>,
> = AllCases extends readonly [infer CurrentCase, ...infer CaseNames]
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

export type TypeofSepCases<
  Src extends SourceRec,
  Variants extends VariantLevelRec<Src>,
  Cases extends SepCases<Src, Variants>,
> = UnionToTuple<keyof Variants> extends readonly [...infer Keys]
  ? Keys extends Tuple<keyof Variants>
    ? TypeofSepCases_<Src, Variants, Cases, Keys>
    : 'never'
  : 'never'

export type WordValue = string | number | void | null | boolean
export type WordDecl = DataDecl<WordValue>
export type Word = WordValue | WordDecl

export type Grouping<T extends Record<string, any>> = {
  filter?: (obj: T) => boolean
  getHash: DataDecl<string> | Record<string, Declarator> | Declarator[]
  describeGroup:
    | DataDecl<string>
    | DataDecl<{
        description: string
        noGroup?: boolean
        largeGroup?: string | null
      }>
    | DataDecl<
        | string
        | {
            description: string
            noGroup?: boolean
            largeGroup?: string | null
          }
      >
  createTestLines:
    | ((obj: T) => any[])
    | {
        type: 'table'
        fields: Array<Declarator> | Record<string, Declarator>
      }
    | {
        type: 'text'
        value: DataDecl<WordValue | WordValue[]>
      }
    | {
        method: string
        shape: Record<
          string,
          | Declarator
          | {
              field: Declarator
              when?: Declarator
              markError?: DataDecl<string | string[] | boolean> | BoolDecl
            }
        >
        addExpectError?: boolean | BoolDecl
      }

  sortByFields?: {[K in keyof T]: Array<T[K]> | 'string'}
  pass?: boolean | BoolDecl | ((obj: T) => boolean)
  tags?: Record<string, Declarator>
  childFile?: DataDecl<string | null | void>
}

export type ExecutionPlan = {
  shape: Record<string, any>
  configReferencedIds: string[]
  /**
   * array of references FROM id
   *
   * separate({source: {_: sourceReference}}): referencedBy
   *
   * {[sourceReference]: referencedBy[]}
   *
   * sourceReference -> referencedBy
   **/
  sourceFor: Record<string, string[]>
  /**
   * sources OF id
   *
   * separate({source: {_: sourceReference}}): referencedBy
   *
   * {[referencedBy]: sourceReference[]}
   *
   * sourceReference -> referencedBy
   **/
  sourcesOf: Record<string, string[]>
  sortedIds: string[]
}

export type CtxConfig = {
  header?: string
  grouping: Grouping<any>
  file?: string
  childFile?: DataDecl<string | null | void>
  usedMethods?: string[]
  skipCases?: BoolDecl[]
}
export type PartialCtxConfig = {
  header?: string
  grouping?: Partial<Grouping<any>>
  file?: string
  childFile?: DataDecl<string | null | void>
  usedMethods?: string[]
  skipCases?: BoolDecl[]
}

export type ConfigStructShape = {
  type: 'shape'
  required: boolean
  shape: Record<string, ConfigStruct>
}
export type ConfigStructKV = {
  type: 'kv'
  required: boolean
}
export type ConfigStruct =
  | {
      type: 'value'
      required: boolean
    }
  | ConfigStructShape
  | ConfigStructKV

export type Ctx = {
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
  config: PartialCtxConfig
  configValidator: ConfigStructShape
}

export type CaseItem<T> = {
  value: T
  text: string
  pass: boolean
  description: string
}
export type JsonOutput = {
  usedMethods: string[]
  header: string[]
  groups: Array<{
    /** non-unique tag */
    file: string
    header: string
    caseItems: Array<CaseItem<any>>
  }>
}
