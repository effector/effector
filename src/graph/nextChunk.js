// @flow
import invariant from 'invariant'
import type {Opts} from './index.h'

function getChildren<Item, Result>(
 items: $ReadOnlyArray<Item>,
 current: Map<Item, $ReadOnlyArray<Result>>,
 e,
): Item[] {
 return items.filter(item => (current.get(item) || []).includes(e))
}

export function nextChunk<Item, Result>(
 opts: Opts<Item, Result>,
 setSafe: (safe: boolean) => void,
 graph: Map<Item, Array<Item>>,
 queue: Set<Item>,
 running: Set<Item>,
): () => Array<Item> {
 const force = typeof opts.force === 'boolean' ? opts.force : false
 const isSync = !!opts.sync ? 'sync' : 'async'
 return function getNextChunk(): Array<Item> {
  let chunk = []
  if (!queue.size) {
   return chunk
  }

  const current = new Map()

  for (const key of queue) {
   const deps = graph.get(key) || []
   const curr = deps.filter(dep => queue.has(dep))

   current.set(key, curr)

   if (!curr.length) {
    chunk.push(key)
   }
  }

  if (chunk.length === 0) {
   invariant(force, 'Cycle detected in graph')

   const items = Array.from(queue)
   const sorted = items.sort((a, b) => {
    const aCurr = current.get(a) || []
    const bCurr = current.get(b) || []
    const deps = aCurr.length - bCurr.length
    if (deps !== 0) return deps

    const aChildren = getChildren(items, current, a)
    const bChildren = getChildren(items, current, b)
    return bChildren.length - aChildren.length
   })

   const first = sorted[0]
   chunk.push(first)
   setSafe(false)
  }
  // const temp = [...chunk]
  chunk = chunk.filter(key => {
   const deps = graph.get(key) || []
   return !deps.find(dep => running.has(dep))
  })
  // console.log(isSync, temp, chunk)

  for (const key of chunk) {
   queue.delete(key)
  }

  return chunk
 }
}
