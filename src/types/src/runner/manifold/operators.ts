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
  Word,
  WordValue,
  WordDecl,
  BoolDecl,
  DataDecl,
} from './types'
import {isDeclarator, isRef} from './isRef'
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

function assertSource<Src extends SourceRec | Tuple<Declarator>>(
  source: Src,
  methodName: string,
) {
  for (const key in source) {
    const decl = source[key]
    assert(
      isDeclarator(decl),
      `key "${key}" in ${methodName} source is not declarator`,
    )
  }
}

// ------

export function separate<
  Src extends SourceRec,
  Variants extends Record<string, VariantLevel<Src> /* | VariantLevel<Src>[]*/>,
  Cases extends SepCases<Src, Variants>,
>({
  name,
  variant,
  cases,
  source,
  sort,
}: {
  source: Src
  name?: string
  variant: Variants
  cases: Cases
  sort?: Array<TypeofSepCases<Src, Variants, Cases>> | 'string'
}): Separate<TypeofSepCases<Src, Variants, Cases>> {
  assertSource(source, 'separate')
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
    prepared: {},
    variant: variants,
    cases: traverseCases(id, variant, cases),
  }

  ctx.shape[val.name] = val
  ctx.items[val.id] = val
  addSourceRefs(val.id, sources)
  if (sort) config({grouping: {sortByFields: {[val.name]: sort}}})
  return val
}
function traverseCases(
  id: string,
  variants: Record<string, Record<string, unknown> | Record<string, unknown>[]>,
  cases: Record<string, any>,
): Record<string, Declarator | Record<string, Declarator>> {
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
    cases: Record<string, Declarator | Record<string, unknown>>,
  ) {
    const resultCases: Record<string, Declarator | Record<string, Declarator>> =
      {}
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
        //@ts-expect-error
        resultCases[branchName] = caseValue
        //@ts-expect-error
        addCasesRefs(id, [caseValue])
      } else if (typeof caseValue === 'object' && caseValue !== null) {
        if (nextVariants.length > 0) {
          const [first, ...rest] = nextVariants
          resultCases[branchName] = traverseCases_(
            first,
            rest,
            variants,
            caseValue as Record<string, Declarator | Record<string, unknown>>,
          ) as Record<string, Declarator>
        } else {
          const val = value(caseValue)
          resultCases[branchName] = val
          addCasesRefs(id, [val])
          // console.warn(
          //   `incorrect case value for last branch "${branchName}"`,
          //   caseValue,
          // )
        }
      } else {
        const val = value(caseValue)
        resultCases[branchName] = val
        addCasesRefs(id, [val])
        // console.warn(
        //   `incorrect case value for branch "${branchName}"`,
        //   caseValue,
        // )
      }
    }
    return resultCases
  }
}
export function permute<T>({
  name,
  items,
  noReorder,
  amount,
  sort,
}: {
  name?: string
  items: T[]
  amount?: {min: number; max: number}
  noReorder?: boolean
  sort?: T[] | 'string'
}) {
  const id = nextID()
  const permute: {
    items: T[]
    noReorder?: boolean
    amount?: {min: number; max: number}
  } = {items}
  if (typeof noReorder === 'boolean') {
    permute.noReorder = noReorder
  }
  if (amount) permute.amount = amount
  const val: Permute<T> = {
    id,
    name: getName(id, name),
    kind: 'permute',
    __t: null as any,
    prepared: {},
    permute,
  }
  /* if (name === val.name) */ ctx.shape[val.name] = val
  ctx.items[val.id] = val
  addSourceRefs(val.id)
  if (sort) config({grouping: {sortByFields: {[val.name]: sort}}})
  return val
}

export function flag({
  name,
  needs,
  avoid,
  sort,
}: {
  name?: string
  needs?: Declarator | Tuple<Declarator>
  avoid?: Declarator | Tuple<Declarator>
  sort?: boolean[]
} = {}) {
  const id = nextID()
  const source: Declarator[] = []
  const val: Flag = {
    id,
    name: getName(id, name),
    kind: 'flag',
    __t: null as any,
    prepared: {},
    needs: needs
      ? Array.isArray(needs)
        ? needs.map(processDeclarator)
        : [processDeclarator(needs as Declarator)]
      : [],
    avoid: avoid
      ? Array.isArray(avoid)
        ? avoid.map(processDeclarator)
        : [processDeclarator(avoid as Declarator)]
      : [],
    decls: {
      true: value(true),
      false: value(false),
    },
  }
  /* if (name === val.name) */ ctx.shape[val.name] = val
  ctx.items[val.id] = val
  addSourceRefs(val.id, source)
  addCasesRefs(val.id, [val.decls.true, val.decls.false])
  if (sort) config({grouping: {sortByFields: {[val.name]: sort}}})
  return val

  function processDeclarator(decl: Declarator) {
    source.push(decl)
    // if (decl.name !== decl.id)
    return decl.id
    // return decl.prepared
  }
}

export function bool<Src extends SourceRec>({
  source,
  name,
  true: onTrue,
  false: onFalse,
  sort,
}: {
  source: Src
  name?: string
  true?: SingleVariant<Src>
  false?: SingleVariant<Src>
  sort?: boolean[]
}) {
  assert(
    (!onTrue && onFalse) || (onTrue && !onFalse),
    'either true or false should be defined but not both',
  )
  assertSource(source, 'bool')
  const id = nextID()
  let boolDef: Bool['bool']
  let decls: Bool['decls']
  if (onFalse && !onTrue) {
    boolDef = {
      true: singleMatcher(source, onFalse),
      false: undefined,
    }
    decls = {
      true: value(false),
      false: value(true),
    }
  } else {
    boolDef = {
      true: onTrue && singleMatcher(source, onTrue),
      false: onFalse && singleMatcher(source, onFalse),
    }
    decls = {
      true: value(true),
      false: value(false),
    }
  }
  const val: Bool = {
    id,
    name: getName(id, name),
    kind: 'bool',
    __t: false,
    prepared: {},
    bool: boolDef,
    decls,
  }
  /* if (name === val.name) */ ctx.shape[val.name] = val
  ctx.items[val.id] = val
  addSourceRefs(val.id, source)
  addCasesRefs(val.id, [val.decls.true, val.decls.false])
  if (sort) config({grouping: {sortByFields: {[val.name]: sort}}})
  return val
}
export function value<T>(value: T, name?: string) {
  const id = nextID()
  const val: Value<T> = {
    id,
    name: getName(id, name),
    kind: 'value',
    __t: value,
    prepared: {},
    value,
  }
  /* if (name === val.name) */ ctx.shape[val.name] = val
  ctx.items[val.id] = val
  addSourceRefs(val.id)
  return val
}
export function union<OneOf extends string>(
  oneOf: Tuple<OneOf>,
  name?: string,
): Union<OneOf>
export function union<OneOf extends string>(config: {
  oneOf: Tuple<OneOf>
  sort?: OneOf[] | 'string'
}): Union<OneOf>
export function union<OneOf extends string>(
  oneOf: Tuple<OneOf> | {oneOf: Tuple<OneOf>; sort?: OneOf[] | 'string'},
  name?: string,
): Union<OneOf> {
  //@ts-ignore
  const items: Tuple<OneOf> = Array.isArray(oneOf) ? oneOf : oneOf.oneOf
  const id = nextID()
  const val: Union<OneOf> = {
    id,
    name: getName(id, name),
    kind: 'union',
    variants: items,
    __t: null as any,
    prepared: {},
  }
  /* if (name === val.name) */ ctx.shape[val.name] = val
  ctx.items[val.id] = val
  addSourceRefs(val.id)
  if (!Array.isArray(oneOf) && 'sort' in oneOf) {
    config({grouping: {sortByFields: {[val.name]: oneOf.sort!}}})
  }
  return val
}
export function computeFn<Src extends Tuple<Declarator> | SourceRec, T>({
  source,
  fn,
  name,
  sort,
}: {
  source: Src
  fn: (
    args: {
      [K in keyof Src]: Src[K] extends Ref<infer S, unknown> ? S : never
    },
  ) => T
  name?: string
  sort?: T[] | 'string'
}) {
  assertSource(source, 'computeFn')
  const id = nextID()
  const val: Fn<T> = {
    id,
    name: getName(id, name),
    kind: 'fn',
    __t: null as any,
    prepared: {},
    fn(args: Record<string, any>) {
      try {
        const mapped = argsToSource({
          source,
          args,
        })
        return fn(mapped)
      } catch (err) {
        console.error(err)
        console.log({source, val, args})
      }
    },
  }
  ctx.shape[val.name] = val
  ctx.items[val.id] = val
  addSourceRefs(val.id, source)
  if (sort) config({grouping: {sortByFields: {[val.name]: sort}}})
  return val
}
export function computeVariants<
  Src extends SourceRec,
  Variants extends VariantLevelRec<Src>,
  Cases extends CaseLayer<Src, Variants>,
>({
  source,
  variant,
  cases,
  name,
  sort,
}: {
  source: Src
  variant: Variants
  cases: Cases
  name?: string
  sort?: Array<TypeOfCaseLayer<Src, Variants, Cases>> | 'string'
}): ComputeVariant<TypeOfCaseLayer<Src, Variants, Cases>> {
  const id = nextID()
  assertSource(source, 'computeVariants')
  const variants = {} as any
  for (const variantName in variant) {
    variants[variantName] = matcher(source, variant[variantName])
  }
  const val: ComputeVariant<TypeOfCaseLayer<Src, Variants, Cases>> = {
    id,
    name: getName(id, name),
    kind: 'computeVariant',
    variant: variants,
    //@ts-ignore
    cases: traverseCases(id, variant, cases),
    __t: null as any,
    prepared: {},
  }

  ctx.shape[val.name] = val
  ctx.items[val.id] = val
  addSourceRefs(val.id, source)

  if (sort) config({grouping: {sortByFields: {[val.name]: sort}}})
  return val
}
export function computeVariant<
  Src extends SourceRec,
  Variant extends VariantLevel<Src>,
  Cases extends {[K in keyof Variant]: unknown},
>({
  source,
  variant,
  cases,
  name,
  sort,
}: {
  source: Src
  variant: Variant
  cases: Cases
  name?: string
  sort?: Array<Cases[keyof Cases]> | 'string'
}): ComputeVariant<Cases[keyof Cases]> {
  assertSource(source, 'computeVariant')
  //@ts-ignore
  return computeVariants({
    source,
    variant: {_: variant},
    //@ts-ignore
    cases,
    name,
    //@ts-ignore
    sort,
  })
  // const id = nextID()

  // const val: ComputeVariant<Cases[keyof Cases]> = {
  //   id,
  //   name: getName(id, name),
  //   kind: 'computeVariant',
  //   cases: cases as any,
  //   variant: {_: matcher(source, variant)},
  //   __t: null as any,
  //   prepared: {},
  // }
  // ctx.shape[val.name] = val
  // ctx.items[val.id] = val
  // addSourceRefs(val.id, source)
  // if (sort) config({grouping: {sortByFields: {[val.name]: sort}}})
  // return val
}
export function sortOrder(decls: Declarator[]) {
  const sortByFields = ctx.config.grouping!.sortByFields!
  const keys = Object.keys(sortByFields)
  const declNames = decls.map(decl => decl.name)
  assert(
    declNames.every(name => keys.includes(name)),
    () => {
      const missedDecls = declNames
        .filter(name => !keys.includes(name))
        .join(',')
      const missedDeclsFull = decls.filter(e => !keys.includes(e.name))
      console.log(...missedDeclsFull)
      return `decls ${missedDecls} are not sorted`
    },
  )
  const declNamesOrdered = [
    ...declNames,
    ...keys.filter(key => !declNames.includes(key)),
  ]
  const result: Record<string, any> = {}
  for (const name of declNamesOrdered) result[name] = sortByFields[name]
  ctx.config.grouping!.sortByFields = result
}

function createWordsArray(
  x: TemplateStringsArray,
  args: Array<WordValue>,
): Array<WordValue> {
  if (args.length === 0) return x as any
  const words: Array<WordValue> = [x[0]]
  for (let i = 0; i < args.length; i++) {
    words.push(args[i], x[i + 1])
  }
  return words
}
export function fmt(x: TemplateStringsArray, ...args: Array<Word>) {
  const decls = [...args.entries()]
    .filter(([, e]) => isRef(e))
    .map(([idx, decl]) => {
      return {
        decl: decl as WordDecl,
        position: idx,
        key: `__${idx}`,
      }
    })
  const blueprint = args.map(e => (isRef(e) ? null : e))
  const sources: Record<string, WordDecl> = {}
  for (const {key, decl} of decls) {
    sources[key] = decl
  }
  return computeFn({
    source: sources,
    fn(values) {
      const resultValues = [...blueprint]
      for (let i = 0; i < decls.length; i++) {
        const decl = decls[i]
        resultValues[decl.position] = String(values[decl.key])
      }
      return createWordsArray(x, resultValues).join('')
    },
  })
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
  >,
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
  Variant extends VariantLevel<Src>,
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
  Variants extends VariantLevel<Src>[],
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
  }
]
export function matcher<
  Src extends SourceRec,
  Variant extends VariantLevel<Src> | VariantLevel<Src>[],
>(source: Src, cases: Variant) {
  const result = {} as any
  for (const key in cases) {
    result[key] = singleMatcher(source, cases[key] as any)
  }
  return result
}
function singleMatcher<
  Src extends SourceRec,
  VariantField extends SingleVariant<Src>,
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
  skipCases?: BoolDecl | BoolDecl[]
  childFile?: DataDecl<string | null | void>
}): void
export function config<
  T extends Record<string, any>,
  Src extends SourceRec,
>(data: {
  header?: string
  file?: string
  usedMethods?: string[]
  grouping: Partial<Grouping<T>>
  skipCases?: BoolDecl | BoolDecl[]
  childFile?: DataDecl<string | null | void>
}): void
export function config(data: {
  header?: string
  file?: string
  usedMethods?: string[]
  grouping?: Partial<Grouping<any>>
  skipCases?: BoolDecl | BoolDecl[]
  childFile?: DataDecl<string | null | void>
}) {
  const resultData =
    data.skipCases && !Array.isArray(data.skipCases)
      ? {...data, skipCases: [data.skipCases]}
      : data
  const configUpdated = applyConfigStruct(
    ctx.configValidator.shape,
    ctx.config,
    resultData,
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
/** add inline references FROM id */
function addCasesRefs(id: string, targets: Declarator[]) {
  ctx.targets[id] = ctx.targets[id] ?? []
  ctx.targets[id].push(...targets.map(e => e.id))
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
      const plan = processDeclaratorsToShape()
      return {
        plan,
        items: currCtx.items,
        grouping: currCtx.config.grouping,
        header: currCtx.config.header ?? null,
        file: currCtx.config.file ?? null,
        config: currCtx.config,
        usedMethods: currCtx.config.usedMethods ?? null,
        skipCases: currCtx.config.skipCases ?? null,
        childFile: currCtx.config.childFile ?? null,
      }
    },
  )
}

export function matchUnion<Cases extends string>(
  decl: DataDecl<Cases>,
  matchCases: Cases[] | Cases,
) {
  const matches = Array.isArray(matchCases) ? matchCases : [matchCases]
  const cases = [] as any
  for (const matchCase of matches) {
    cases.push({decl: matchCase})
  }
  return bool({
    source: {decl},
    true: cases,
  })
}

export function some(decls: BoolDecl[]) {
  const source = {} as Record<string, any>
  const cases = [] as any
  for (const [idx, decl] of Object.entries(decls)) {
    source[`some_${idx}`] = decl
    cases.push({[`some_${idx}`]: true})
  }
  return bool({
    source,
    true: cases,
  })
}

export function every(decls: BoolDecl[]) {
  const source = {} as Record<string, any>
  const cases = {} as any
  for (const [idx, decl] of Object.entries(decls)) {
    source[`every_${idx}`] = decl
    cases[`every_${idx}`] = true
  }
  return bool({
    source,
    true: cases,
  })
}

export function none(decls: BoolDecl[]) {
  const source = {} as Record<string, any>
  const cases = {} as any
  for (const [idx, decl] of Object.entries(decls)) {
    source[`none_${idx}`] = decl
    cases[`none_${idx}`] = false
  }
  return bool({
    source,
    true: cases,
  })
}

export function not(decl: BoolDecl) {
  return none([decl])
}
