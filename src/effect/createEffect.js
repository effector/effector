//@flow

import {effectFabric} from './effectFabric'
import {normalizeConfig, type EffectConfigPart, type Config} from '../config'
import type {Effect} from './index.h'

export function createEffect<Payload, Done>(
  name?: string,
  config?: Config<EffectConfigPart<Payload, Done>>,
): Effect<Payload, Done, *> {
  const opts = normalizeConfig(config)
  return effectFabric({
    name,
    domainName: '',
    config: opts,
  })
}
