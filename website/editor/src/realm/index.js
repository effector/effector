//@flow

import {
  createEvent,
  split,
  type Effect,
  type Store,
  type Domain,
  type Event,
  type Unit,
} from 'effector'

export const realmInvoke: Event<{|
  method: string,
  params: Array<any>,
  instance: any,
|}> = createEvent()

export const realmClearNode: Event<Unit<any>> = createEvent()

export const {realmEvent, realmStore, realmEffect, realmDomain} = split<*, any>(
  realmInvoke.map(e => e.instance || {}),
  {
    realmEvent: obj => obj.kind === 'event' || obj.kind === 2,
    realmStore: obj => obj.kind === 'store' || obj.kind === 1,
    realmEffect: obj => obj.kind === 'effect' || obj.kind === 3,
    realmDomain: obj => obj.onCreateDomain && obj.domain,
  },
)
