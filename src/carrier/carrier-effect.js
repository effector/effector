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
    this.dispatch(this)
    return this.defer
      .done
      .then(({result}) => result)
  }
  fail(): Promise<Fail> {
    this.dispatch(this)
    return this.defer
      .fail
      .then(({error}) => error)
  }
  promise(): Promise<Done> {
    this.dispatch(this)
    return Promise.race([
      this.done(),
      this.fail().then(err => Promise.reject(err))
    ])
  }
}
