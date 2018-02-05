//@flow

import {Dispose} from '../defer'
import {type ID, createIDType} from '../id'

const nextID = createIDType()

export /*::opaque*/ type Obscure/*: any*/ = mixed

export class Carrier<E = Obscure> {
  id: ID = nextID()
  dispose: Dispose<E> = new Dispose
  dispatched(): Promise<E> {
    return this.dispose.done
  }
  typeId: number
  type: string
  payload: E
  dispatch: Function
  plain() {
    return {
      type: this.type,
      payload: this.payload
    }
  }
}

function id<T>(x): T {
  return x
}

export function carrier<E>(
  typeId: number,
  type: string,
  payload: E,
  dispatch: Function = id
): Carrier<E> {
  const result = new Carrier
  result.payload = payload
  result.type = type
  result.typeId = typeId
  result.dispatch = dispatch
  return result
}

export function is(e: mixed): boolean /*::%checks*/ {
  return (
    typeof e === 'object'
    && e != null
    && typeof e.type === 'string'
    && e instanceof Carrier
  )
}
