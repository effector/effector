//@flow

import {Dispose} from '../defer'
import {type ID, createIDType} from '../id'

const nextID = createIDType()

export class Carrier<E = void> {
  id: ID = nextID()
  dispose: Dispose<E> = new Dispose
  dispatched(): Promise<E> {
    return this.dispose.done
  }
  isSent: boolean = false
  isScheduled: boolean = false
  typeId: number
  type: string
  payload: E
  dispatch: () => void
  plain() {
    return {
      type: this.type,
      payload: this.payload,
      meta: {
        typeId: this.typeId,
        id: this.id,
      },
    }
  }
  send(): Promise<E> {
    this.dispatch()
    return this.dispatched()
  }
}

export function carrier<E>(
  typeId: number,
  type: string,
  payload: E,
  dispatch: (result: Carrier<E>) => Carrier<E>
): Carrier<E> {
  const result: Carrier<E> = new Carrier
  result.payload = payload
  result.type = type
  result.typeId = typeId
  result.dispatch = () => { dispatch(result) }
  result.dispatched().then(() => result.isSent = true)
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
