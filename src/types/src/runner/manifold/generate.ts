import {assert} from './assert'
import {forIn, forInMap} from './forIn'
import {Decl, StackDecl, Branch, DataDecl, kv, Union, Bracket} from './types'
import {stack, isDef} from './def'

export function generate<D extends Decl>(
  fn: () => D,
): D extends DataDecl<infer T> ? T[] : any[] {
  assert(stack.items.length === 0, 'stack should be empty')
  const [ctx, root] = stack.branch(ctx => {
    const result = fn()
    assert(isDef(result), 'generate function should return declaration')
    return result as Decl
  })

  function compile(
    node: StackDecl,
    scope: Context,
    arg: {keepUnions?: boolean; noMatch?: () => void} = {},
  ): Context[] {
    switch (node.kind) {
      case 'bracket': {
        // if (isSomeSourcesAreNotPresent(node.data.source, node, ctx, scope))
        //   return []

        let choosenDecl: Branch
        const accumulatedSource = {} as Record<string, Decl>
        decls: for (
          let i = 0;
          i < node.data.decls.length && !choosenDecl!;
          i++
        ) {
          const decl = node.data.decls[i]
          const matchBy = node.data.matchGroup[i]
          let noMatch: true | void
          if (Array.isArray(matchBy)) {
            for (const submatch of matchBy) {
              forIn(submatch, (value, key) => {
                accumulatedSource[key] = node.data.source[key]
              })
              if (
                isSomeSourcesAreNotPresent(accumulatedSource, node, ctx, scope)
              ) {
                noMatch = true
                continue
              }
              const mappedSource = createSourceObject(accumulatedSource, scope)
              noMatch = forIn(submatch, (value, key) => {
                // if (!(key in mappedSource)) return
                assert(
                  key in mappedSource,
                  `no key "${key}" for value "${value}" is found in source`,
                )
                if (value !== mappedSource[key]) return true
              })
              if (noMatch) break
            }
          } else {
            forIn(matchBy, (value, key) => {
              accumulatedSource[key] = node.data.source[key]
            })
            if (
              isSomeSourcesAreNotPresent(accumulatedSource, node, ctx, scope)
            ) {
              noMatch = true
              continue
            }
            const mappedSource = createSourceObject(accumulatedSource, scope)
            noMatch = forIn(matchBy, (value, key) => {
              // if (!(key in mappedSource)) return
              assert(
                key in mappedSource,
                `no key "${key}" for value "${value}" is found in source`,
              )
              if (value !== mappedSource[key]) return true
            })
          }
          if (!noMatch) {
            choosenDecl = decl
          }
        }
        if (!choosenDecl!) {
          if (arg.noMatch) arg.noMatch()
          return [scope]
        }
        // assert(choosenDecl!, 'at least one case should match')
        context.addBracket(scope, node, choosenDecl)
        let match = true
        const scopes = compile(choosenDecl, scope, {
          keepUnions: true,
          noMatch() {
            match = false
          },
        })
        if (!match) return [scope]
        scopes.forEach(scope => {
          // if (
          //   context.get(scope, choosenDecl.data.result.id, false) === undefined
          // )
          //   return false
          if (context.has(scope, choosenDecl.data.result.id))
            context.set(
              scope,
              node.data.result.id,
              context.get(scope, choosenDecl.data.result.id),
            )
          return true
        })
        return scopes
      }
      case 'branch': {
        let scopes: Context[] = [scope]
        for (let i = 0; i < node.data.decls.length; i++) {
          const item = node.data.decls[i]
          switch (item.kind) {
            case 'val': {
              scopes.forEach(scope => {
                if (!context.has(scope, item.id))
                  context.set(scope, item.id, item.data)
              })
              break
            }
            case 'compute': {
              // scopes = scopes.filter(scope => {
              //   return !isSomeSourcesAreNotPresent(
              //     item.source,
              //     item,
              //     ctx,
              //     scope,
              //   )
              // })
              scopes.forEach(scope => {
                if (isSomeSourcesAreNotPresent(item.source, item, ctx, scope))
                  return
                const mappedSource = createSourceObject(item.source, scope)
                context.set(scope, item.id, item.fn(mappedSource))
              })
              break
            }
            case 'union': {
              scopes = scopes.flatMap(scope => [
                context.withoutUnion(scope, item),
                ...item.items.map((value: any) =>
                  context.withUnion(scope, item, value),
                ),
              ])
              break
            }
            case 'filter': {
              scopes = scopes.filter(scope => {
                if (isSomeSourcesAreNotPresent(item.source, item, ctx, scope))
                  return false
                const mappedSource = createSourceObject(item.source, scope)
                return item.fn(mappedSource)
              })
              break
            }
            case 'branch':
            case 'bracket': {
              scopes = scopes.flatMap(scope => {
                let noMatch = false
                let results = compile(item, scope, {
                  keepUnions: true,
                  noMatch() {
                    noMatch = true
                  },
                })
                // if (item.data.result.kind === 'union') {
                //   results = results.filter(
                //     scope =>
                //       !scope.ignoredUnions.includes(
                //         item.data.result as Union<unknown>,
                //       ),
                //   )
                // }
                !noMatch &&
                  //   item.kind === 'branch' &&
                  results.forEach(scope => {
                    context.set(
                      scope,
                      node.data.result.id,
                      context.get(scope, item.data.result.id),
                    )
                  })
                // return results
                return noMatch ? [] : results
              })
              break
            }
          }
        }
        // if (node.data.result.kind === 'union') {
        //   scopes = scopes.filter(
        //     scope =>
        //       !scope.ignoredUnions.includes(node.data.result as Union<unknown>),
        //   )
        // }
        return scopes
      }
    }
  }
  const rawResult = compile(ctx, context.create())
  const resultScopesRaw = rawResult.filter(scope => {
    const unions = getDependencyUnions(ctx, root, scope)
    // const deps = getExecutionDeps(ctx, root, scope)
    const noFalseIgnore = scope.ignoredUnions.every(
      union => !unions.includes(union),
    )
    const usedUnions = scope.usedUnions.filter(union => {
      if (union.owners.length === 0) return true
      const owner = union.owners[0]
      if (owner.kind !== 'branch') return true
      if (owner.owners.length === 0) return true
      const bracketOwner = owner.owners[0]
      if (bracketOwner.kind !== 'bracket') return true
      const bracketInfo = scope.bracketCases.find(e => e.decl === bracketOwner)
      if (!bracketInfo) return false // ???
      return bracketInfo.select === owner
    })
    const noFalseInclude = usedUnions.every(union => unions.includes(union))
    // for (const union of usedUnions) {
    //   const value = context.get(scope, union.id, true)
    //   //@ts-ignore
    //   if (!union.items.includes(value)) return false
    // }
    if (noFalseIgnore && !noFalseInclude) {
      debugger
    }
    return noFalseIgnore && noFalseInclude
  })
  const resultScopes: typeof resultScopesRaw = []
  for (const scope of resultScopesRaw) {
    const deps = getAllDeps(ctx, root, scope)
    const depsIds = deps.map(({id}) => id)
    forIn(scope.values, (value, key) => {
      if (!depsIds.includes(key)) {
        context.delete(scope, key)
      }
    })
    if (resultScopes.every(e => !deepCompare(e.values, scope.values))) {
      resultScopes.push(scope)
    }
  }

  // console.table(
  //   resultScopes.map(e => {
  //     const allDeps = getAllDeps(ctx, root, e)
  //     const result = {} as any
  //     forIn(e.values, (value, key) => {
  //       const decl = allDeps.find(dep => dep.id === key)
  //       result[declToString(decl!)] = value
  //     })
  //     return result
  //   }),
  // )
  const results = resultScopes.map(scope => {
    switch (root.kind) {
      case 'branch':
      case 'bracket':
        return context.get(scope, root.data.result.id)
      default:
        return context.get(scope, root.id)
    }
  })
  return results as any
}

type Context = {
  values: Record<string, any>
  ignoredUnions: Union<unknown>[]
  usedUnions: Union<unknown>[]
  bracketCases: {decl: Bracket; select: Branch}[]
}

function declToString(decl: Decl) {
  return `${decl.id}#${decl.kind}`
}

const context = {
  create(): Context {
    return {
      values: {},
      usedUnions: [],
      ignoredUnions: [],
      bracketCases: [],
    }
  },
  get(ctx: Context, key: string, strict: boolean = true) {
    strict && assert(key in ctx.values, `no key "${key}" in context`)
    return ctx.values[key]
  },
  set(ctx: Context, key: string, value: any) {
    ctx.values[key] = value
  },
  delete(ctx: Context, key: string) {
    delete ctx.values[key]
  },
  has(ctx: Context, key: string) {
    return key in ctx.values
  },
  clone(ctx: Context): Context {
    return {
      values: {...ctx.values},
      ignoredUnions: [...ctx.ignoredUnions],
      usedUnions: [...ctx.usedUnions],
      bracketCases: [...ctx.bracketCases],
    }
  },
  addBracket(ctx: Context, bracket: Bracket, select: Branch) {
    ctx.bracketCases.push({decl: bracket, select})
  },
  withUnion<T>(ctx: Context, union: Union<T>, value: T) {
    const result = context.clone(ctx)
    context.set(result, union.id, value)
    result.usedUnions.push(union)
    return result
  },
  withoutUnion(ctx: Context, union: Union<unknown>) {
    const result = context.clone(ctx)
    result.ignoredUnions.push(union)
    return result
  },
}
function getDependentSet(decl: Decl, ctx: Context) {
  const visited = new Set<Decl>()
  const result: Decl[] = []
  let firstCall = true
  visit(decl)
  return result
  function visit(decl: Decl) {
    if (visited.has(decl) && !firstCall) return
    visited.add(decl)
    firstCall = false
    let nextBranch: Branch
    if (decl.kind === 'bracket') {
      const usageInfo = ctx.bracketCases.find(e => e.decl === decl)
      if (!usageInfo) return
      nextBranch = usageInfo.select
    }
    result.push(decl)
    decl.next.forEach(item => {
      if (nextBranch) {
        if (item === nextBranch) visit(item)
      } else {
        visit(item)
      }
    })
    decl.links.forEach(item => {
      if (nextBranch) {
        if (item === nextBranch) visit(item)
      } else {
        visit(item)
      }
    })
  }
}
function getAllDeps(branch: Branch, resultDecl: Decl, ctx: Context) {
  const allUsedDecls = [
    ...new Set([
      ...getDependentSet(branch, ctx),
      ...getDependencySet(resultDecl),
    ]),
  ]
  return allUsedDecls
}
function getExecutionDeps(branch: Branch, resultDecl: Decl, ctx: Context) {
  return getDependencySet(resultDecl, getDependentSet(branch, ctx))
}
function getDependencySet(decl: Decl, include?: Decl[]) {
  const visited = new Set<Decl>()
  const result: Decl[] = []
  let firstCall = true
  visit(decl)
  return result
  function visit(decl: Decl) {
    if (visited.has(decl) && !firstCall) return
    if (include && !include.includes(decl) && !firstCall) return
    firstCall = false
    visited.add(decl)
    result.push(decl)
    decl.prev.forEach(item => {
      visit(item)
    })
    decl.owners.forEach(item => {
      visit(item)
    })
  }
}
function getDependencyUnions(
  rootBranch: Branch,
  targetDecl: Decl,
  ctx: Context,
) {
  // while (rootBranch.owners.length > 0) {
  //   rootBranch = rootBranch.owners[0] as any
  // }
  const executionDeps = getExecutionDeps(rootBranch, targetDecl, ctx)
  const unions = executionDeps.filter(e => e.kind === 'union') as Union<
    unknown
  >[]
  return unions
}
function isSomeSourcesAreNotPresent(
  source: kv<Decl>,
  targetDecl: Decl,
  rootBranch: Branch,
  scope: Context,
) {
  let notPresent = false
  const executionDeps = getExecutionDeps(rootBranch, targetDecl, scope)
  forIn(source, item => {
    if (
      !executionDeps.includes(item) ||
      scope.ignoredUnions.includes(item as any)
    ) {
      notPresent = true
      return true
    }
    // if (unions.some(u => scope.ignoredUnions.includes(u))) {
    //   notPresent = true
    //   return true
    // }
  })
  return notPresent
}
function createSourceObject(source: kv<Decl>, scope: Context) {
  return forInMap(source, item => {
    switch (item.kind) {
      case 'val': {
        // if (context.has(scope, item.id))
        return context.get(scope, item.id, true)
        // return item.data
      }
      case 'compute':
      case 'union':
        return context.get(scope, item.id, true)
      case 'branch':
      case 'bracket':
        return context.get(scope, item.data.result.id, true)
    }
  })
}

function deepCompare(a: any, b: any) {
  if (a === b) return true
  if (typeof a === 'object' && a !== null) {
    if (typeof b === 'object' && b !== null) {
      if (Array.isArray(a)) {
        if (Array.isArray(b)) {
          if (a.length !== b.length) return false
          for (let i = 0; i < a.length; i++) {
            if (!deepCompare(a[i], b[i])) return false
          }
          return true
        } else return false
      } else if (Array.isArray(b)) {
        return false
      } else {
        const keysA = Object.keys(a)
        const keysB = Object.keys(b)
        if (keysA.length !== keysB.length) return false
        if (new Set([...keysA, ...keysB]).size !== keysA.length) return false
        for (const key in a) {
          if (!deepCompare(a[key], b[key])) return false
        }
        return true
      }
    } else return false
  } else return false
}
