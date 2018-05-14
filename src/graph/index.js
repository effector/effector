// @flow

import type {OptsAsync, OptsSync, Graph, Resolver, Results} from './index.h'

import {graphRunnerAsync, graphRunnerSync} from './runners'
import {optsToConfig} from './config'

export function runSyncGraph<Item, Result>(opts: {
 graph: Graph<Item>,
 task: (item: Item) => Result,
 force?: boolean,
 resolvers?: Iterable<Resolver<Item, Result>>,
}): Results<Item, Result> {
 const optsNew: OptsSync<Item, Result> = {...opts, sync: true}
 return graphRunnerSync(optsToConfig(optsNew))
}

declare export default function graphRunner<Item, Result>(
 opts: OptsSync<Item, Result>,
): Results<Item, Result>
declare export default function graphRunner<Item, Result>(
 opts: OptsAsync<Item, Result>,
): Promise<Results<Item, Result>>
export default function graphRunner(opts: *) {
 if (opts.sync === true) return graphRunnerSync(optsToConfig(opts))
 return graphRunnerAsync(optsToConfig(opts))
}
