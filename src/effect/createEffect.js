//@flow

import {effectFabric} from './effectFabric'
import type {Effect} from './index.h'
export function createEffect<Payload, Done>(
  name?: string,
  config?: {
    handler?: (payload: Payload) => (Promise<Done> | Done),
  }
): Effect<Payload, Done, *> {
  const opts = {}
  opts.name = name
  opts.domainName = ''
  opts.handler = config?.handler
  return effectFabric(opts)
}
