//@flow

import * as Task from './task.h'

import type {Graph, Config, Context} from './index.h'
import {nextChunk} from './nextChunk'

function removeDependent<Item, Result>(
 drop: Item,
 ctx: Context<Item, Result>,
 toDrop: Set<Item> = new Set(),
) {
 for (const [key, values] of ctx.graph) {
  if (toDrop.has(key)) continue
  if (values.includes(drop)) {
   toDrop.add(key)
   removeDependent(key, ctx)
  }
 }
 for (const e of toDrop) {
  ctx.graph.delete(e)
  ctx.queue.delete(e)
 }
 return toDrop.size
}

export function* syncProvider<Item, Result>(
 opts: Config<Item, Result, (item: Item) => Result>,
 ctx: Context<Item, Result>,
): Generator<Array<Item>, void, void> {
 while (ctx.queue.size > 0) {
  const chunk = nextChunk(opts, ctx)

  for (const key of chunk) {
   ctx.running.add(key)
   let result: Task.Try<Result>
   try {
    const value = opts.task(key, ...(ctx.graph.get(key) || []))
    result = [(1: Task.Value), value]
   } catch (error) {
    const err = [(2: Task.Throw), error]
    result = err
   }
   processResult(result, key, ctx)
  }
  yield chunk
 }
}

async function asyncProviderCore<Item, Result>(
 key: Item,
 opts: Config<Item, Result, (item: Item) => Promise<Result>>,
 ctx: Context<Item, Result>,
) {
 ctx.running.add(key)
 let result: Task.Try<Result>
 try {
  const value = await opts.task(key)
  result = [(1: Task.Value), value]
 } catch (error) {
  const err = [(2: Task.Throw), error]
  result = err
 }
 processResult(result, key, ctx)
}

export async function asyncProvider<Item, Result>(
 opts: Config<Item, Result, (item: Item) => Promise<Result>>,
 ctx: Context<Item, Result>,
) {
 while (ctx.queue.size > 0) {
  const chunk = nextChunk(opts, ctx)
  await Promise.race(chunk.map(key => asyncProviderCore(key, opts, ctx)))
 }
}

function processResult<Item, Result>(
 result: Task.Try<Result>,
 key: Item,
 ctx: Context<Item, Result>,
) {
 switch (result[0]) {
  case (2: Task.Throw): {
   removeDependent(key, ctx)
  }
  case (1: Task.Value): {
   ctx.running.delete(key)
   ctx.values.set(key, result)
   break
  }
 }
}
