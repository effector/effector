//@flow

import type {Multi as MultiStep, Seq as SeqStep} from 'effector/datatype/stept'

export type Subscriber<A> = {
  next(value: A): void,
  // error(err: Error): void,
  //complete(): void,
}

export type Subscription = {
  (): void,
  unsubscribe(): void,
}

export type Unsubscribe = () => void

export type GraphiteMeta = {
  next: MultiStep,
  seq: SeqStep,
}
