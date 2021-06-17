import {assert} from './assert'
import {forIn, forInMap} from './forIn'
import {
  Def,
  Decl,
  Val,
  DataDecl,
  Compute,
  kv,
  KV,
  MG,
  kvDecl,
  Filter,
  array,
  Union,
  MatchGroupFlat,
  Bracket,
} from './types'
import {stack, def, isDef} from './def'
import {rawPermute} from './permute'

function link(prev: Decl, next: Decl) {
  if (!prev.next.includes(next)) prev.next.push(next)
  if (!next.prev.includes(prev)) next.prev.push(prev)
}

export function bracket<
  Src extends kv<Decl>,
  MatchGroups extends kv<kv<unknown>>,
  F extends (
    val: any,
    groups: {
      [G in keyof MatchGroups]: MG<Src, MatchGroupFlat<Src, MatchGroups[G]>>
    },
  ) => void
>({
  source,
  matchGroups,
  fn,
}: {
  source: Src
  matchGroups: MatchGroups
  fn: [keyof MatchGroups] extends [keyof Parameters<F>[1]] ? F : never
}): Val<Parameters<F>[0]> {
  // F extends (val: infer T) => any ? Val<T> : never {
  const vl = def.val(null as any)
  const groups: any = forInMap(matchGroups, (group, groupName) => {
    return (obj: kv<any>) => {
      stack.bracket(ctx => {
        forIn(source, decl => {
          link(decl, ctx)
        })
        ctx.data.source = source
        ctx.data.result = vl
        link(ctx, vl)

        forIn(obj, (caseFn, key) => {
          assert(key in group, `no key "${key}" in group "${groupName}"`)
          const groupCase = group[key]
          /**
           * implementation of array cases in bracket is very odd
           * so it is normalized here
           * */
          if (Array.isArray(groupCase)) {
            groupCase.forEach(groupCase => {
              applyGroupCase(groupCase, caseFn, ctx)
            })
          } else {
            applyGroupCase(groupCase as kvDecl<Src>, caseFn, ctx)
          }
        })
      })
    }
  })

  fn(null as any, groups)

  return vl as any

  function applyGroupCase(
    groupCase: kvDecl<Src>,
    caseFn: () => unknown,
    ctx: Bracket,
  ) {
    const [branch] = stack.branch(() => caseFn())
    link(ctx, branch)
    link(branch, branch.data.result)
    link(branch.data.result, vl)
    ctx.data.matchGroup.push(groupCase)
  }
}
export function permute<T>({
  items,
  reorder = false,
  amount: {min = 0, max = items.length} = {},
  requiredItems,
}: {
  items: array<T>
  reorder?: boolean
  amount?: {min?: number; max?: number}
  requiredItems?: T[]
}): Union<T[]> {
  const combinations = rawPermute({
    items: [...items],
    reorder,
    amount: {min, max},
    requiredItems,
  })
  //@ts-ignore
  return union(combinations as any)
}
export function bool<
  Src extends kv<DataDecl<unknown>>,
  TD extends Decl,
  TF extends Decl
>(config: {
  source: Src
  when: kvDecl<Src> | kvDecl<Src>[]
  cases: {
    true: () => TD
    false: () => TF
  }
  avoid?: array<DataDecl<boolean>>
  need?: array<DataDecl<boolean>>
}): [TD, TF] extends [Def<any, infer D>, Def<any, infer F>] ? Val<D | F> : never
export function bool<Src extends kv<DataDecl<unknown>>>(config: {
  source: Src
  when: kvDecl<Src> | kvDecl<Src>[]
  avoid?: array<DataDecl<boolean>>
  need?: array<DataDecl<boolean>>
  flag?: boolean
}): Val<boolean>
export function bool<Src extends kv<DataDecl<unknown>>>({
  source,
  when,
  cases: userCases,
  avoid,
  need,
  flag,
}: {
  source: Src
  when: kvDecl<Src> | kvDecl<Src>[]
  cases?: {
    true: () => Decl
    false: () => Decl
  }
  avoid?: array<DataDecl<boolean>>
  need?: array<DataDecl<boolean>>
  flag?: boolean
}): Val<any> {
  if (userCases) {
    assert(
      typeof flag !== 'boolean',
      '"flag" and "cases" cannot be used at the same time',
    )
  }
  if (flag)
    userCases = {
      true: () => union([false, true]),
      false: () => val(false),
    }
  source = {...source}
  const caseBase = {} as any
  if (need)
    need.forEach((decl, i) => {
      //@ts-ignore
      source[`need_${i}`] = decl
      caseBase[`need_${i}`] = true
    })
  if (avoid)
    avoid.forEach((decl, i) => {
      //@ts-ignore
      source[`avoid_${i}`] = decl
      caseBase[`avoid_${i}`] = false
    })
  // if (Array.isArray(when)) {
  //   const cases = {} as any
  //   for (let i = 0; i < when.length; i++) {
  //     cases[`case_${i}`] = {...when[i], ...caseBase}
  //   }
  //   cases.fallback = {}
  //   const boolBracket = bracket({
  //     source,
  //     matchGroups: {_: cases},
  //     fn(val: boolean, {_}) {
  //       const caseMap = forInMap(cases, () => userCases?.true ?? (() => ok))
  //       caseMap.fallback = userCases?.false ?? (() => nope)
  //       _(caseMap)
  //     },
  //   })
  //   return boolBracket
  // } else
  return bracket({
    source,
    matchGroups: {
      _: {
        true: Array.isArray(when)
          ? when.map(when => ({...when, ...caseBase}))
          : {...when, ...caseBase},
        false: {},
      },
    },
    fn(val: boolean, {_}) {
      _({
        true: userCases?.true ?? (() => def.val(true)),
        false: userCases?.false ?? (() => def.val(false)),
      })
    },
  })
}
export const union = def.union
export const val = def.val
export function compute<Src extends kv<DataDecl<unknown>>, T>({
  source,
  fn,
}: {
  source: Src
  fn: (
    data: {
      [K in keyof Src]: Src[K] extends Def<any, infer Data> ? Data : never
    },
  ) => T
}): Compute<T> {
  return def.compute({source, fn: fn as any})
}
export function text(
  words: TemplateStringsArray,
  ...values: Array<
    | string
    | number
    | null
    | boolean
    | void
    | DataDecl<string | number | null | boolean | void>
  >
) {
  const argMap: Record<string, number> = {}
  const source = {} as any
  values.forEach((value, idx) => {
    if (isDef(value)) {
      source[value.id] = value
      argMap[value.id] = idx
    }
  })
  return compute({
    source,
    fn(args) {
      const sequence = [...values]
      forIn(argMap, (idx, field) => {
        // assert(field in args, `field "${field}" not found in args`)
        sequence[idx] = args[field] as any
      })
      const cleanSequence = sequence.map(item =>
        item === null || item === undefined ? '' : item,
      )
      return createWordsArray(words, cleanSequence).join('')
    },
  })
  function createWordsArray(
    x: TemplateStringsArray,
    args: Array<any>,
  ): Array<any> {
    if (args.length === 0) return x as any
    const words: Array<any> = [x[0]]
    for (let i = 0; i < args.length; i++) {
      words.push(args[i], x[i + 1])
    }
    return words
  }
}
export function filter<Src extends kv<DataDecl<unknown>>>({
  source,
  fn,
}: {
  source: Src
  fn: (
    data: {
      [K in keyof Src]: Src[K] extends Def<any, infer Data> ? Data : never
    },
  ) => boolean
}): Filter {
  return def.filter({source, fn: fn as any})
}
