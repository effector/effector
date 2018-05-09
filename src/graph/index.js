// @flow

import type {OptsAsync, OptsSync, Opts, Results} from './index.h'

import {graphRunnerAsync, graphRunnerSync} from './runner'

declare export default function graphRunner<Item, Result>(
 opts: OptsSync<Item, Result>,
): Results<Item, Result>
declare export default function graphRunner<Item, Result>(
 opts: OptsAsync<Item, Result>,
): Promise<Results<Item, Result>>
export default function graphRunner<Item, Result>(
 opts: Opts<Item, Result>,
): Promise<Results<Item, Result>> | Results<Item, Result> {
 if (opts.sync === true) return graphRunnerSync(opts)
 return graphRunnerAsync(opts)
}
