//@flow

import {createEvent, split, type Event, type Unit} from 'effector'
import type {StoreView} from 'effector-react'

export const realmInvoke: Event<{|
  method: string,
  params: Array<any>,
  instance: any,
|}> = createEvent()

export const realmStatus: Event<{|
  active: boolean,
  throwError: boolean,
|}> = createEvent()

//$off
export const {realmEvent, realmStore, realmEffect, realmDomain} = split(
  realmInvoke.map(e => e.instance || {}),
  {
    realmEvent: obj => obj.kind === 'event' || obj.kind === 2,
    realmStore: obj => obj.kind === 'store' || obj.kind === 1,
    realmEffect: obj => obj.kind === 'effect' || obj.kind === 3,
    realmDomain: obj => obj.onCreateDomain && obj.domain,
  },
)

export const realmInterval: Event<IntervalID> = createEvent()
export const realmTimeout: Event<TimeoutID> = createEvent()
export const realmClearNode: Event<Unit<any>> = createEvent()
export const realmComponent: Event<StoreView<any, any>> = createEvent()
