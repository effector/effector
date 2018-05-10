// @flow

import type {Config, Context} from './index.h'

export function nextChunk<Item, Result>(
 opts: Config<Item, Result, *>,
 ctx: Context<Item, Result>,
): Array<Item> {
 const chunk = []
 ctx.chunk = chunk
 const current = new Map()
 ctx.current = current
 if (!ctx.queue.size) {
  return chunk
 }

 for (const resolver of opts.resolvers) {
  resolver(opts, ctx)
  const isCycle = chunk.length === 0
  if (!isCycle) break
 }
 const newChunks = chunk.filter(key => {
  const deps = opts.graph.get(key)
  if (deps === undefined) return false
  return !deps.find(dep => ctx.running.has(dep))
 })
 // console.log(newChunks, chunk)
 for (const key of newChunks) {
  ctx.queue.delete(key)
 }
 return newChunks
}
