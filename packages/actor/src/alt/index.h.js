//@flow

export type {PlainActorSystem} from './system'
export type {PlainActor} from './actor'
export type OpaqueEvent = {
 type: any,
 payload: any,
 meta: any,
}

export type Observer<T> = {
 next(value: T): any,
}

export type Actor<A> = {
 inbox: Set<OpaqueEvent>,
 dispatch(event: OpaqueEvent): void,
 getState(): A,
 subscribe(observer: Observer<A>): void,
}

export type OpaqueObserver = {
 next(value: any): any,
}

export type OpaqueHandler = (context: any, event: OpaqueEvent, meta: any) => any
export type OpaqueSeq = Iterable<OpaqueHandler>

export type OpaqueActor = {
 inbox: Set<OpaqueEvent>,
 dispatch(event: OpaqueEvent): void,
 getState(): any,
 subscribe(observer: OpaqueObserver): void,
 childActors: Set<OpaqueActor>,
}

export type ActorSystem = {
 childActors: Set<OpaqueActor>,
}
