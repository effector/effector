//@flow

import {getActId} from './register'

export type AbstractAct<P = mixed> = {
  type: string,
  id: number,
  payload: P,
  isError: boolean,
}

export type ActTag
  = 'act'
  | 'async/init'
  | 'async/done'
  | 'async/fail'

export class Act<P = mixed, /*::+*/Tag/*:::ActTag*/ = 'act'> {
  id: number = getActId()
  typeId: number
  type: string
  storeId: number = -1
  domainId: number = -1
  payload: P
  /*::+*/tag: Tag
  constructor(
    typeId: number,
    type: string,
    payload: P,
    tag: Tag = ('act': any),
  ) {
    this.typeId = typeId
    this.type = type
    this.payload = payload
    this.tag = tag
  }
  toJSON(): AbstractAct<P> {
    return {
      id: this.id,
      type: this.type,
      payload: this.payload,
      isError: this.tag === 'async/fail',
      meta: {
        storeId: this.storeId,
        tag: this.tag,
        typeId: this.typeId,
        id: this.id,
        type: this.type,
      },
    }
  }
}

