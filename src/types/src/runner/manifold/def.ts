import {assert} from './assert'
import {forIn} from './forIn'
import {
  Def,
  DeclKind,
  Decl,
  StackDecl,
  Bracket,
  Branch,
  Val,
  Union,
  DataDecl,
  Compute,
  kv,
  array,
  Filter,
} from './types'

export function isDef(value: unknown): value is Def<DeclKind, unknown> {
  if (typeof value === 'object' && value !== null) {
    return declKinds.includes((value as any).kind)
  }
  return false
}
const nextDefID = (() => {
  let id = 0
  return () => (++id).toString(36)
})()
function addDeclToStack(decl: Decl): any {
  stack.peek(ctx => {
    switch (ctx.kind) {
      case 'bracket': {
        assert(decl.kind === 'branch', 'bracket should contain only branches')
        if (ctx.data.decls.includes(decl)) return
        ctx.data.decls.push(decl)
        ctx.links.push(decl)
        decl.owners.push(ctx)
        break
      }
      case 'branch': {
        if (ctx.data.decls.includes(decl)) return
        ctx.data.decls.push(decl)
        ctx.links.push(decl)
        decl.owners.push(ctx)
      }
    }
  })
  return decl
}
export const def = {
  bracket(): Bracket {
    return addDeclToStack({
      id: nextDefID(),
      kind: 'bracket',
      data: {decls: [], source: {}, matchGroup: [], result: null as any},
      prev: [],
      next: [],
      owners: [],
      links: [],
    })
  },
  branch(): Branch {
    return addDeclToStack({
      id: nextDefID(),
      kind: 'branch',
      data: {decls: [], result: null as any},
      prev: [],
      next: [],
      owners: [],
      links: [],
    })
  },
  val<Data>(data: Data): Val<Data> {
    return addDeclToStack({
      id: nextDefID(),
      kind: 'val',
      data,
      prev: [],
      next: [],
      owners: [],
      links: [],
    })
  },
  union<T extends string | boolean>(items: array<T>): Union<T> {
    return addDeclToStack({
      id: nextDefID(),
      kind: 'union',
      items,
      prev: [],
      next: [],
      owners: [],
      links: [],
    } as any)
  },
  compute<T>({
    source,
    fn,
  }: {
    source: kv<DataDecl<unknown>>
    fn: (source: kv<unknown>) => T
  }): Compute<T> {
    const id = nextDefID()
    const prev = [] as Decl[]
    const result: Compute<T> = addDeclToStack({
      id,
      kind: 'compute',
      source,
      fn,
      prev,
      next: [],
      owners: [],
      links: [],
    } as any)
    forIn(source, decl => {
      prev.push(decl)
      decl.next.push(result)
    })
    return result
  },
  filter({
    source,
    fn,
  }: {
    source: kv<DataDecl<unknown>>
    fn: (source: kv<unknown>) => boolean
  }) {
    const id = nextDefID()
    const prev = [] as Decl[]
    const result: Filter = addDeclToStack({
      id,
      kind: 'filter',
      source,
      fn,
      prev,
      next: [],
      owners: [],
      links: [],
    } as any)
    forIn(source, decl => {
      prev.push(decl)
      decl.next.push(result)
    })
    return result
  },
}
const declKinds = Object.keys(def)

export const stack: {
  items: StackDecl[]
  peek(fn: (ctx: StackDecl) => void): void
  wrap<T>(ctx: StackDecl, fn: (ctx: StackDecl) => T): T
  branch<T>(fn: (ctx: Branch) => T): [Branch, T]
  bracket<T>(fn: (ctx: Bracket) => T): [Bracket, T]
} = {
  items: [],
  peek(fn) {
    if (stack.items.length > 0) {
      fn(stack.items[stack.items.length - 1])
    }
  },
  wrap(ctx, fn) {
    stack.items.push(ctx)
    try {
      return fn(ctx)
    } finally {
      stack.items.pop()
    }
  },
  branch(fn) {
    return stack.wrap(def.branch(), ctx => {
      const branch = ctx as Branch
      const result = fn(branch)
      if (isDef(result)) {
        branch.data.result = result as Decl
      } else if (result === undefined) {
        assert(
          branch.data.decls.length > 0,
          'branch should contain at least one declaration or return declaration',
        )
        branch.data.result = branch.data.decls[branch.data.decls.length - 1]
      } else {
        branch.data.result = def.val(result)
      }
      return [branch, result]
    })
  },
  bracket(fn) {
    return stack.wrap(def.bracket(), ctx => {
      const result = fn(ctx as Bracket)
      return [ctx as Bracket, result]
    })
  },
}
