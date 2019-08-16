//@flow

import {eventFabric} from './eventFabric'
import {
  normalizeEventConfig,
  type EventConfigPart,
  type Config,
} from '../config'
import type {Event} from './index.h'

export function createEvent<Payload>(
  nameOrConfig?: string | EventConfigPart,
  opts?: Config<EventConfigPart> = {},
): Event<Payload> {
  return eventFabric(normalizeEventConfig(nameOrConfig, opts))
}
