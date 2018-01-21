
declare module 'eventemitter2' {
  declare export type eventNS = string[]
  declare export type EventID = string[] | string
  declare export type Emit = (event: EventID, ...values: any[]) => boolean
  declare export type On = (event: EventID, listener: Listener) => EventEmitter2
  declare export interface ConstructorOptions {

    /**
     *
     * @default  false
     * @description  set EventEmitterType to `true` to use wildcards.
     */
    wildcard ? : boolean,

    /**
     *
     * @default  '.'
     * @description  the delimiter used to segment namespaces.
     */
    delimiter ? : string,

    /**
     *
     * @default  true
     * @description  set EventEmitterType to `true` if you want to emit the newListener events.
     */
    newListener ? : boolean,

    /**
     *
     * @default  10
     * @description  the maximum amount of listeners that can be assigned to an event.
     */
    maxListeners ? : number,

    /**
     *
     * @default  false
     * @description  show event name in memory leak message when more than maximum amount of listeners is assigned, default false
     */
    verboseMemoryLeak ? : boolean
  }
  declare export type Listener = (...values: any[]) => any // should be void
  declare export interface EventAndListener {
    (event: EventID, ...values: any[]): void
  }
  declare export type EventEmitterType = {
    emit(event: EventID, ...values: any[]): boolean,
    on(event: EventID, listener: Listener): EventEmitterType,
    off(event: string, listener: Listener): EventEmitterType,
  }
  declare export class EventEmitter2 {
    constructor(options ? : ConstructorOptions): EventEmitter2 & EventEmitterType,
    emit(event: EventID, ...values: any[]): boolean,
    emitAsync(event: EventID, ...values: any[]): Promise < any[] > ,
    addListener(event: string, listener: Listener): EventEmitterType,
    on(event: EventID, listener: Listener): EventEmitterType,
    prependListener(event: EventID, listener: Listener): EventEmitterType,
    once(event: EventID, listener: Listener): EventEmitterType,
    prependOnceListener(event: EventID, listener: Listener): EventEmitterType,
    many(event: EventID, timesToListen: number, listener: Listener): EventEmitterType,
    prependMany(event: EventID, timesToListen: number, listener: Listener): EventEmitterType,
    onAny(listener: EventAndListener): EventEmitterType,
    prependAny(listener: EventAndListener): EventEmitterType,
    offAny(listener: Listener): EventEmitterType,
    removeListener(event: EventID, listener: Listener): EventEmitterType,
    off(event: string, listener: Listener): EventEmitterType,
    removeAllListeners(event ? : string | eventNS): EventEmitterType,
    setMaxListeners(n: number): void,
    eventNames(): string[],
    listeners(event: EventID): () => {}[],
    listenersAny(): () => {}[]
  }
  declare export default typeof EventEmitter2
}