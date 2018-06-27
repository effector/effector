//@flow

// import invariant from 'invariant'
import warning from 'warning'
import type {Effect} from './index.h'
import * as Kind from '../kind'

import {eventFabric, type Event} from 'effector/event'
import type {CompositeName} from '../compositeName'
import {exec} from './exec'
import {callbacks} from './callbacks'

export function effectFabric<Payload, Done>({
 name,
 domainName,
 parent,
}: {
 name?: string,
 domainName: string,
 parent?: CompositeName,
}): Effect<Payload, Done, *> {
 const instanceAsEvent: Event<Payload> = eventFabric({
  name,
  parent,
 })

 const instance: Effect<Payload, Done, any> = (instanceAsEvent: any)
 const eventCreate = instanceAsEvent.create
 const done: Event<{params: Payload, result: Done}> = eventFabric({
  name: `${instanceAsEvent.shortName} done`,
  parent,
 })
 const fail: Event<{params: Payload, error: *}> = eventFabric({
  name: `${instanceAsEvent.shortName} fail`,
  parent,
 })

 // instanceAsEvent.step.data.delete(instanceAsEvent.cmd)
 instance.done = done
 instance.fail = fail
 ;(instance: any).use = fn => {
  thunk = fn
 }
 ;(instance: any).use.getCurrent = (): any => thunk
 ;(instance: any).kind = Kind.EFFECT
 ;(instance: any).create = (params: Payload) => {
  eventCreate(params, instanceAsEvent.getType())
  return exec(
   params,
   callbacks(thunk, result => void done(result), error => void fail(error)),
  )
 }
 let thunk: Function = (value: Payload): Promise<Done> => {
  warning(false, 'no thunk used')
  const result: Promise<Done> = (Promise.resolve(): any)
  return result
 }

 return instance
}
