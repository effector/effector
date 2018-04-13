//@flow

export type {Actor} from './actor'
export type {ActorPrivateMeta} from './meta'

export type Event = string
export type Catch = (e: Event) => Promise<void>
export type Filter<A, B> = (_: A, e: Event) => ?B
import type {Actor} from './actor'
export type Handler</*::-*/ A, B> = (
 _: A,
 e: Event,
 a: Actor<B>,
) => Promise<any>
export type DefaultKeeper<B> = Handler<Error, B>
