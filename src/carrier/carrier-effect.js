//@flow


import {Carrier} from './carrier'
import {Defer} from '../defer'
import type {DoneType, FailType} from '../index.h'

import {type ID, createIDType} from '../id'
const nextSEQ = createIDType()

export class CarrierEffect<
  Params = void,
  Done = void,
  Fail = Error
> extends Carrier<Params> {
  seq: ID = nextSEQ()
  defer: Defer<DoneType<Params, Done>, FailType<Params, Fail>> = new Defer
  done(): Promise<Done> {
    const result = this.defer
      .done
      .then(({result}) => result)
    this.dispatch()
    return result
  }
  fail(): Promise<Fail> {
    const result = this.defer
      .fail
      .then(({error}) => error)
    this.dispatch()
    return result
  }
  promise(): Promise<Done> {
    return Promise.race([
      this.done(),
      this.fail().then(err => Promise.reject(err))
    ])
  }
  plain() {
    const {type, payload, meta} = super.plain()
    //$off
    return {
      type, payload, meta: {
        ...meta,
        seq: this.seq,
      }
    }
  }
}

export function carrierEffect<Params, Done, Fail>(
  params: Params, type: string, typeId: number,
  dispatch: (value: CarrierEffect<Params, Done, Fail>) => CarrierEffect<Params, Done, Fail>
): CarrierEffect<Params, Done, Fail> {
  const result = new CarrierEffect
  result.payload = params
  result.type = type
  result.typeId = typeId
  result.dispatch = () => {
    result.dispatch = never
    dispatch(result)
  }
  return result
}

const never = () => {}
