//@flow

// import {async as subject, type Subject} from 'most-subject'

import {Event} from './event'

import {runEffect} from './run-effect'


export function Effect<
  Params,
  Done,
  Fail,
  State
>(name: string) {
  function runner(typeId, type, payload, dispatch) {
    return runEffect(payload, dispatch, this)
  }
  this.thunk = never
  Event.call(this, name, runner)
  // Object.assign(eff, this)
  // return eff
}

Effect.prototype = Object.create(Event.prototype)
Effect.prototype.constructor = Effect

Effect.prototype.use = function use(thunk: (params: *) => Promise<*>) {
  this.thunk = thunk
  return this
}

function never(props: any): Promise<any> {
  console.warn(`


  Running an effect without implementation

`, props)
  return new Promise(() => {})
}
