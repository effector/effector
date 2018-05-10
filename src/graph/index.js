// @flow

import type {OptsAsync, OptsSync, Opts, Results} from './index.h'

import {graphRunnerAsync, graphRunnerSync} from './runner'
import {optsToConfig} from './config'

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
