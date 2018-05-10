// @flow
import invariant from 'invariant'
import type {Config, Context, Graph} from './index.h'

export function defaultResolver<Item, Result>(
 opts: Config<Item, Result, *>,
 context: Context<Item, Result>,
) {
 for (const key of context.queue) {
  const deps = opts.graph.get(key) || []
  const curr = deps.filter(dep => context.queue.has(dep))

  context.current.set(key, curr)

  if (!curr.length) {
   context.chunk.push(key)
  }
 }
}

export function forceResolver<Item, Result>(
 opts: Config<Item, Result, *>,
 context: Context<Item, Result>,
) {
 invariant(opts.force, 'Cycle detected in graph')

 const items = Array.from(context.queue)
 const sorted = items.sort((a, b) => {
  const aCurr = context.current.get(a) || []
  const bCurr = context.current.get(b) || []
  const deps = aCurr.length - bCurr.length
  if (deps !== 0) return deps

  const aChildren = items.filter(item =>
   (context.current.get(item) || []).includes(a),
  )
  const bChildren = items.filter(item =>
   (context.current.get(item) || []).includes(b),
  )
  return bChildren.length - aChildren.length
 })

 const first = sorted[0]
 context.chunk.push(first)
 context.setSafe(false)
}
