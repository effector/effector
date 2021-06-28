import {
  Ref,
  SourceRec,
  SepCases,
  VariantLevel,
  Declarator,
  Union,
  Value,
  Fn,
  Raw,
  ComputeVariant,
  Bool,
  Separate,
  Flag,
  Permute,
  RawCase,
  TypeofSepCases,
  Tuple,
  SingleVariant,
  VariantLevelRec,
  CaseLayer,
  TypeOfCaseLayer,
  Matcher,
  Grouping,
  ConfigStructShape,
} from './types'
import {isRef} from './isRef'
import {processDeclaratorsToShape} from './processDeclaratorsToShape'
import {ctx, ctxWrap} from './ctx'
import {applyConfigStruct, confStruct, validateRequiredFields} from './config'
import {assert} from './assert'

const nextID = (() => {
  let id = 0
  return () => `__${(++id).toString(36)}`
})()

function getName(id: string, name?: string) {
  let result = name ?? id
  if (result in ctx.shape) result = `${id}_${result}`
  return result
}

// ------

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
    // if (decl.name !== decl.id)
    return decl.name
    // return decl.prepared
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
  assert(
    (!onTrue && onFalse) || (onTrue && !onFalse),
    'either true or false should be defined but not both',
  )
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

export function config(data: {
  header?: string
  file?: string
  usedMethods?: string[]
  grouping?: Partial<Grouping<any>>
}): void
export function config<T>(data: {
  header?: string
  file?: string
  usedMethods?: string[]
  grouping: Partial<Grouping<T>>
}): void
export function config(data: {
  header?: string
  file?: string
  usedMethods?: string[]
  grouping?: Partial<Grouping<any>>
}) {
  const configUpdated = applyConfigStruct(
    ctx.configValidator.shape,
    ctx.config,
    data,
  )
  if (configUpdated) ctx.configUsed = true
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

export function exec(fn: () => void, struct: ConfigStructShape = confStruct) {
  return ctxWrap(
    {
      shape: {},
      configUsed: false,
      items: {},
      references: {},
      targets: {},
      config: {},
      configValidator: struct,
    },
    currCtx => {
      fn()
      if (!currCtx.configUsed) throw Error('no config() used')
      validateRequiredFields(currCtx.configValidator, currCtx.config)
      const shape = processDeclaratorsToShape()
      return {
        shape,
        grouping: currCtx.config.grouping,
        header: currCtx.config.header ?? null,
        file: currCtx.config.file ?? null,
        config: currCtx.config,
        usedMethods: currCtx.config.usedMethods ?? null,
      }
    },
  )
}
