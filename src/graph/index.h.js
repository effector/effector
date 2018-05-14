//@flow

import * as Task from './task.h'

export type Graph<Item> = Map<Item, Array<Item>>
export type Resolver<Item, Result> = (
 opts: Config<Item, Result, *>,
 context: Context<Item, Result>,
) => void

export type Context<Item, Result> = {
 setSafe: (safe: boolean) => void,
 graph: Graph<Item>,
 queue: Set<Item>,
 running: Set<Item>,
 chunk: Array<Item>,
 current: Graph<Item>,
 values: Map<Item, Task.Try<Result>>,
}

export type OptsAsync<Item, Result> = {
 graph: Graph<Item>,
 task: (item: Item, ...deps: Item[]) => Promise<Result>,
 force?: boolean,
 sync?: false,
 resolvers?: Iterable<Resolver<Item, Result>>,
}
export type OptsSync<Item, Result> = {
 graph: Graph<Item>,
 task: (item: Item, ...deps: Item[]) => Result,
 force?: boolean,
 sync: true,
 resolvers?: Iterable<Resolver<Item, Result>>,
}
export type Config<Item, Result, Task: (item: Item, ...deps: Item[]) => *> = {
 +graph: Graph<Item>,
 +task: Task,
 +force: boolean,
 +sync: boolean,
 +resolvers: Iterable<Resolver<Item, Result>>,
}
export type Opts<Item, Result> =
 | OptsSync<Item, Result>
 | OptsAsync<Item, Result>
export type Results<Item, Result> = {
 safe: boolean,
 values: Map<Item, Result>,
 errors: Map<Item, any>,
}
