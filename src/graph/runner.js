// @flow

import type {Config, Results, Context} from './index.h'
import * as Task from './task.h'
import {asyncProvider, syncProvider} from './next'

export async function graphRunnerAsync<Item, Result>(
 opts: Config<Item, Result, (item: Item) => Promise<Result>>,
): Promise<Results<Item, Result>> {
 let safe = true
 const queue = new Set(opts.graph.keys())
 const running = new Set()

 const values: Map<Item, Task.Try<Result>> = new Map()
 const setSafe = newSafe => {
  safe = newSafe
 }
 const ctx: Context<Item, Result> = {
  queue,
  running,
  values,
  setSafe,
  graph: opts.graph,
  chunk: [],
  current: new Map(),
 }
 await asyncProvider(opts, ctx)

 const {results, errors} = splitResults(values)
 return {
  safe,
  values: results,
  errors,
 }
}

export function graphRunnerSync<Item, Result>(
 opts: Config<Item, Result, (item: Item) => Result>,
): Results<Item, Result> {
 let safe = true
 const queue = new Set(opts.graph.keys())
 const running = new Set()

 const values: Map<Item, Task.Try<Result>> = new Map()
 const setSafe = newSafe => {
  safe = newSafe
 }
 const ctx: Context<Item, Result> = {
  queue,
  running,
  values,
  setSafe,
  graph: opts.graph,
  chunk: [],
  current: new Map(),
 }
 const gen = syncProvider(opts, ctx)
 for (const next of gen);
 const {results, errors} = splitResults(values)
 return {
  safe,
  values: results,
  errors,
 }
}

function splitResults<Item, Result>(
 values: Map<Item, Task.Try<Result>>,
): {
 errors: Map<Item, any>,
 results: Map<Item, Result>,
} {
 const results = new Map()
 const errors = new Map()
 for (const [key, val] of values) {
  switch (val[0]) {
   case (1: Task.Value):
    results.set(key, (val[1]: Result))
    break
   case (2: Task.Throw):
    errors.set(key, (val[1]: any))
    break
  }
 }
 return {results, errors}
}
