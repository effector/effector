//@flow

import {getStoreId} from './register'

export class Engine<State = {}> {
  engineId = getStoreId()
  symbolicId: Symbol = Symbol(`engine/${this.engineId}`)
  seq: number = -1
  getState: (targetId: number) => State
  setState(state: State) {
    this.seq += 1
    this.getState = (targetId: number) => state
  }
}

export function engine<State>(): Engine<State> {
  return new Engine
}
