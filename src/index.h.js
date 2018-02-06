//@flow

import type {Stream} from 'most'
import type {Subject} from 'most-subject'

export interface Named {
  scope(): Iterable<string>,
}

export interface Typed {
  getType(): string,
}

export interface WithStateLink<State> {
  getState(): Stream<State>,
}

export interface Dispatcher {
  // dispatch$: Subject<any>
  mergeEvents(events: Emitter): void,
}

export interface Emitter {
  event$: Subject<any>,
  emit(next: any): void,
}
