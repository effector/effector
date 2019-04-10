//@flow

import {eventFabric} from './eventFabric'
import {normalizeConfig, type EventConfigPart, type Config} from '../config'
import type {Event} from './index.h'

export function createEvent<Payload>(
  name?: string,
  config: Config<EventConfigPart> = {},
): Event<Payload> {
  const opts = normalizeConfig(config)
  return eventFabric({
    name,
    config: opts,
  })
}
