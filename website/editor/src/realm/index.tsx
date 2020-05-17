import {createEvent, split, Event, Unit} from 'effector'
import {StoreView} from 'effector-react'

export const realmInvoke: Event<{
  method: string,
  params: Array<any>,
  instance: any,
}> = createEvent()

export const realmStatus: Event<{
  active: boolean,
  throwError: boolean,
}> = createEvent()

export const realmStatusApi: {
  init: Event<void>,
  done: Event<void>,
  fail: Event<void>,
} = {
  init: realmStatus.prepend(() => ({
    active: true,
    throwError: false,
  })),
  done: realmStatus.prepend(() => ({
    active: false,
    throwError: false,
  })),
  fail: realmStatus.prepend(() => ({
    active: false,
    throwError: true,
  })),
}

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
export const realmListener: Event<{
  type: string,
  target: any,
  fn: Function,
  options?: any,
}> = createEvent()
export const realmRemoveListener: Event<{
  type: string,
  target: any,
  fn: Function,
  options?: any,
}> = createEvent()
export const realmClearInterval: Event<IntervalID> = createEvent()
export const realmClearTimeout: Event<TimeoutID> = createEvent()
export const realmClearNode: Event<Unit<any>> = createEvent()
export const realmComponent: Event<StoreView<any, any>> = createEvent()
