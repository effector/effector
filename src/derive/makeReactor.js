//@flow

import {derive} from './derivation'
import {reactorFabric, type ReactorOpts} from './reactorFabric'

export function makeReactor(
 derivable: *,
 f: Function,
 options: $Shape<$Exact<ReactorOpts>>,
) {
 return reactorFabric(derive, derivable, f, options)
}
