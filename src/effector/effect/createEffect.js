//@flow

import type {Effect} from '../unit.h'
import {effectFabric} from './effectFabric'
import {
  normalizeEventConfig,
  type EffectConfigPart,
  type Config,
} from '../config'

export function createEffect<Payload, Done>(
  nameOrConfig?: string | EffectConfigPart<Payload, Done>,
  opts?: Config<EffectConfigPart<Payload, Done>>,
): Effect<Payload, Done, *> {
  return effectFabric(normalizeEventConfig(nameOrConfig, opts))
}
