//@flow

import {effectFabric} from './effectFabric'
import type {Effect} from './index.h'
// import {Vertex} from 'effector/graphite/tarjan'
export function createEffect<Payload, Done>(
  name?: string,
): Effect<Payload, Done, *> {
  return effectFabric({
    name,
    domainName: '',
    // vertex: new Vertex<['effect', string]>(['effect', name || '']),
  })
}
