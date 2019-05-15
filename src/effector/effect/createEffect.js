//@flow

import {effectFabric} from './effectFabric'
import {
  normalizeEventConfig,
  type EffectConfigPart,
  type Config,
} from '../config'
import type {Effect} from './index.h'

export function createEffect<Payload, Done>(
  nameOrConfig?: string | EffectConfigPart<Payload, Done>,
  opts?: Config<EffectConfigPart<Payload, Done>>,
): Effect<Payload, Done, *> {
  const {config, name} = normalizeEventConfig(nameOrConfig, opts)
  return effectFabric({
    name,
    domainName: '',
    config,
  })
}
