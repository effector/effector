//@flow

import type {Message} from './message'
import {getReducerId} from './register'
import {UniversalSpace} from './discrete-space'

type RawAction<A = mixed> = string | Message<A> | {getType(): string}


declare
class ReduxField<S> {
    (state: S, message: any): S,
    on<P, A/*::: Message<P> | $ReadOnlyArray<Message<P>>*/>
        ( actions: A, reducer: (state: S, payload: P) => S ): ReduxReducer<S>
  }

export class ReduxReducer<State = mixed> /*::extends ReduxField<State>*/ {
  /*::+*/reducer: this
  defaultState: State
  types: Map<string, Function> = new Map()
  domainStates: UniversalSpace<Symbol, State> = new UniversalSpace(
    (symbolicId: Symbol) => this.defaultState
  )
  reducerId: number = getReducerId()
  symbolicId: Symbol = Symbol(`reducer/${this.reducerId}`)
  constructor(defaultState: State) {
    /*::super()*/
    this.defaultState = defaultState
    //$off
    this.on = this.on.bind(this)
    //$off
    this.off = this.off.bind(this)
  }
  has(value: any) {
    return this.types.has(normalizeType(value))
  }
  ensureState(state?: State): State {
    if (state === undefined) return this.defaultState
    return state
  }
  reduce<P, M>(state: State, message: {
    type: string,
    payload: P,
    meta: M,
  }): State {
    const handler = this.types.get(message.type)
    const trueState = this.ensureState(state)
    if (message && handler) {
      const result = handler(trueState, message.payload, message.meta)
      if (result !== undefined) return result
    }
    return trueState
  }

  on<P, A/*::: Message<P> | $ReadOnlyArray<Message<P>>*/>(
    typeOrActionCreator: A,
    handler: (state: State, payload: P) => State
  ): ReduxReducer<State> {
    if (Array.isArray(typeOrActionCreator)) {
      typeOrActionCreator.forEach(message => {
        this.on(message, handler)
      })
    } else {
      this.types.set(normalizeType(typeOrActionCreator), handler)
    }

    return this.reducer
  }

  off(typeOrActionCreator: RawAction<*> | $ReadOnlyArray<RawAction<*>>) {
    if (Array.isArray(typeOrActionCreator)) {
      typeOrActionCreator.forEach(this.off)
    } else {
      this.types.delete(normalizeType(typeOrActionCreator))
    }
    return this.reducer
  }
  manual(fn: (on: $PropertyType<this, 'on'>, off: $PropertyType<this, 'off'>) => void) {
    fn(this.on, this.off)
    return this.reducer
  }

}

export function createReducer<State>(defaultState: State): ReduxReducer<State> {
  const reducerObject: ReduxReducer<State> = new ReduxReducer(defaultState)
  function reduce<P, M>(state: State = this.defaultState, message: {
    type: string,
    payload: P,
    meta: M,
  }): State {
    return this.reduce(state, message)
  }
  const binded = reduce.bind(reducerObject)
  //$off
  reducerObject.reducer = binded
  const result = Object.setPrototypeOf(binded, reducerObject)

  return result
}

function normalizeType(typeOrActionCreator: RawAction<*>) {
  if (typeof typeOrActionCreator === 'string') return typeOrActionCreator
  if (typeof typeOrActionCreator.getType === 'function' || typeof typeOrActionCreator.toString === 'function') {
    return typeOrActionCreator.toString()
  }
  return String(typeOrActionCreator)
}
