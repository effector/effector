//@flow
import type {Stream} from 'most'
import {type ID, createIDType} from '../id'
const nextID = createIDType()

export class BareEvent<Payload, Instance> {
  $call: (payload: Payload) => Instance
  id: ID = nextID()
  used: number
  isMolten: boolean
  /*::+*/run: (payload: Payload) => Instance
  getType: () => string
  melt(): this {
    if (this.isMolten) {
      throw new Error(`Already molten instance`)
    }
    function event(payload) {
      return event.run(payload)
    }
    Object.setPrototypeOf(event, this.constructor.prototype)
    Object.assign(event, this)
    this.isMolten = event.isMolten = true
    return (event/*: any*/)
  }
  listen: () => Stream<{
    type: string,
    payload: Payload,
    meta: {
      typeId: number,
      id: number,
      isNew: boolean,
    },
  }>
  //$off
  apply(that: any, [payload]: [Payload]): Instance {
    return this.run(payload)
  }
}
