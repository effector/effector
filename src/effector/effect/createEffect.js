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
  return effectFabric(normalizeEventConfig(nameOrConfig, opts))
}
