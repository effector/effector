//@flow

import * as Ctx from 'effector/datatype/context'
import type {
 Multi as MultiStep,
 Seq as SeqStep,
 Single as SingleStep,
} from 'effector/datatype/step'

export type Subscriber<A> = {
 next(value: A): void,
 // error(err: Error): void,
 //complete(): void,
}

export type SingleStepValidContext =
 | Ctx.emit
 | Ctx.compute
 | Ctx.filter
 | Ctx.update

export type Subscription = {
 (): void,
 unsubscribe(): void,
}

export type Unsubscribe = () => void

export type GraphiteMeta = {
 next: MultiStep,
 seq: SeqStep,
}
