// @flow
import invariant from 'invariant'
import type {Config, Context, Graph} from './index.h'

export function defaultResolver<Item, Result>(
 opts: Config<Item, Result, *>,
 ctx: Context<Item, Result>,
) {
 for (const key of ctx.queue) {
  const deps = ctx.graph.get(key) || []
  const curr = deps.filter(dep => ctx.queue.has(dep))

  ctx.current.set(key, curr)

  if (!curr.length) {
   ctx.chunk.push(key)
  }
 }
}

export function forceResolver<Item, Result>(
 opts: Config<Item, Result, *>,
 ctx: Context<Item, Result>,
) {
 invariant(opts.force, 'Cycle detected in graph')

 const items = Array.from(ctx.queue)
 const sorted = items.sort((a, b) => {
  const aCurr = ctx.current.get(a) || []
  const bCurr = ctx.current.get(b) || []
  const deps = aCurr.length - bCurr.length
  if (deps !== 0) return deps

  const aChildren = items.filter(item =>
   (ctx.current.get(item) || []).includes(a),
  )
  const bChildren = items.filter(item =>
   (ctx.current.get(item) || []).includes(b),
  )
  return bChildren.length - aChildren.length
 })

 const first = sorted[0]
 ctx.chunk.push(first)
 ctx.setSafe(false)
}
