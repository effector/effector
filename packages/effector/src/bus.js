//@flow strict
import gud, { type ID } from 'gud'

export class ExternalSource {}
export class Lifecycle {}
export class OtherEvent {}
export class Propagation {}

type BusEvent
  = ExternalSource
  | Lifecycle
  | OtherEvent
  | Propagation

function dispatch(type: BusEvent, value: any) {
  console.log('dispatch', type, value)
}

export function dispatchExternal(value: any) {
  dispatch(new ExternalSource, value)
}

export function dispatchOther(value: any) {
  dispatch(new OtherEvent, value)
}

export function dispatchLifecycle(value: any) {
  dispatch(new Lifecycle, value)
}

export function dispatchPropagation(value: any) {
  dispatch(new Propagation, value)
}

class Event {
  /*::+*/id: ID = gud();
  /*::+*/mailbox: Set<ID> = new Set()
}

class Red<T> {
  /*::+*/id: ID = gud();
  /*::+*/mailbox: Map<BusEvent, any> = new Map()
  on(ev: Event) {
    ev.mailbox.add(this.id)
  }
}
