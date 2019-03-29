//@flow

import warning from 'warning'
import type {Effect} from './index.h'
import {Kind} from 'effector/stdlib'

import {eventFabric, type Event} from 'effector/event'
import type {EffectConfigPart} from '../config'
import type {CompositeName} from '../compositeName'
import {exec} from './exec'
import {callbacks} from './callbacks'

export function effectFabric<Payload, Done>({
  name,
  domainName,
  parent,
  config,
}: {
  name?: string,
  domainName: string,
  parent?: CompositeName,
  config: EffectConfigPart<Payload, Done>,
}): Effect<Payload, Done, *> {
  const {handler} = config

  //$off
  const instance: Effect<Payload, Done, any> = eventFabric({
    name,
    parent,
    config,
  })

  const eventCreate = instance.create
  const done: Event<{params: Payload, result: Done}> = eventFabric({
    name: '' + instance.shortName + ' done',
    parent,
    config,
  })
  const fail: Event<{params: Payload, error: *}> = eventFabric({
    name: '' + instance.shortName + ' fail',
    parent,
    config,
  })

  //eslint-disable-next-line no-unused-vars
  let thunk: Function = handler || defaultThunk.bind(instance)

  instance.done = done
  instance.fail = fail
  ;(instance: any).use = fn => {
    thunk = fn
    return instance
  }
  ;(instance: any).use.getCurrent = (): any => thunk
  ;(instance: any).kind = Kind.effect
  ;(instance: any).create = (params: Payload, fullName, args) => {
    eventCreate(params, instance.getType(), args)
    return exec(
      params,
      callbacks(thunk, result => void done(result), error => void fail(error)),
    )
  }

  return instance
}
//eslint-disable-next-line no-unused-vars
function defaultThunk(value) {
  warning(false, 'no thunk used in %s', this.getType())
  return Promise.resolve()
}
