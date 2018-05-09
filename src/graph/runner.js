// @flow

import type {OptsAsync, OptsSync, Results} from './index.h'

import {nextChunk} from './nextChunk'
import {nextSync, nextAsync} from './next'

export function graphRunnerAsync<Item, Result>(
 opts: OptsAsync<Item, Result>,
): Promise<Results<Item, Result>> {
 const graph = opts.graph
 const task = opts.task

 let safe = true
 const queue = new Set(graph.keys())
 const running = new Set()

 const values = new Map()

 const getNextChunk = nextChunk(
  opts,
  newSafe => {
   safe = newSafe
  },
  graph,
  queue,
  running,
 )
 const next = () => nextAsync(getNextChunk, task, running, values, queue)

 return new Promise((rs, rj) => next().then(rs, rj)).then(() => ({
  safe,
  values,
 }))
}

export function graphRunnerSync<Item, Result>(
 opts: OptsSync<Item, Result>,
): Results<Item, Result> {
 const graph = opts.graph
 const task = opts.task

 let safe = true
 const queue = new Set(graph.keys())
 const running = new Set()

 const values = new Map()

 const getNextChunk = nextChunk(
  opts,
  newSafe => {
   safe = newSafe
  },
  graph,
  queue,
  running,
 )

 const results = nextSync(getNextChunk, task, running, values, queue)
 return {
  safe,
  values,
 }
}
