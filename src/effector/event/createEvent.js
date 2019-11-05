//@flow

import $$observable from 'symbol-observable'

import type {Event, Effect} from '../unit.h'
import {step, createNode, bind, nextUnitID} from '../stdlib'
import {launch} from '../kernel'

import type {Subscription} from '../index.h'
import {normalizeConfig, type EventConfigPart, type Config} from '../config'
import {type CompositeName, createName, mapName, joinName} from '../naming'
import {thru} from '../thru'
import {createLinkNode} from '../forward'
import {watchUnit} from '../watcher'

declare export function createEvent<Payload>(
  name?: string | EventConfigPart,
  config?: Config<EventConfigPart>,
): Event<Payload>
export function createEvent<Payload>(
  nameOrConfig: any,
  maybeConfig: any,
): Event<Payload> {
  const config = normalizeConfig({name: nameOrConfig, config: maybeConfig})
  const {parent, sid = null, named = null} = config
  const id = nextUnitID()
  const name = named ? named : config.name || id
  const compositeName = createName(name, parent)
  const fullName = compositeName.fullName
  const graphite = createNode({
    node: [],
    meta: {unit: 'event', name, sid, named},
  })

  //$off
  const instance: Event<Payload> = (
    payload: Payload,
    ...args: any[]
  ): Payload => instance.create(payload, fullName, args)
  ;(instance: any).getType = () => fullName
  //eslint-disable-next-line no-unused-vars
  ;(instance: any).create = (payload, fullName, args) => {
    launch(instance, payload)
    return payload
  }
  instance.sid = sid
  instance.graphite = graphite
  instance.shortName = name
  instance.domainName = parent
  instance.compositeName = compositeName
  instance.defaultConfig = config
  ;(instance: any).kind = 'event'
  ;(instance: any)[$$observable] = () => instance
  ;(instance: any).id = id
  ;(instance: any).watch = bind(watchUnit, instance)
  ;(instance: any).map = bind(mapEvent, instance)
  ;(instance: any).filter = bind(filterEvent, instance)
  ;(instance: any).filterMap = bind(filterMapEvent, instance)
  ;(instance: any).prepend = bind(prepend, instance)
  ;(instance: any).subscribe = bind(subscribe, instance)
  ;(instance: any).thru = bind(thru, instance)

  return instance
}

function subscribe(event, observer): Subscription {
  return event.watch(payload => observer.next(payload))
}

function prepend(event, fn: (_: any) => *) {
  const contramapped: Event<any> = createEvent('* → ' + event.shortName, {
    parent: event.domainName,
  })

  createLinkNode(contramapped, event, {
    scope: {handler: fn},
    node: [
      step.compute({
        fn: (newValue, {handler}) => handler(newValue),
      }),
    ],
    meta: {op: 'prepend'},
  })
  return contramapped
}

declare function mapEvent<A, B>(event: Event<A>, fn: (_: A) => B): Event<B>
declare function mapEvent<A, B>(
  effect: Effect<A, any, any>,
  fn: (_: A) => B,
): Event<B>
function mapEvent<A, B>(event: Event<A> | Effect<A, any, any>, fn: A => B) {
  let config
  let name
  if (typeof fn === 'object') {
    config = fn
    name = fn.name
    fn = fn.fn
  }
  const mapped = createEvent(mapName(event, name), {
    parent: event.domainName,
    config,
  })
  createLinkNode(event, mapped, {
    scope: {handler: fn},
    node: [
      step.compute({
        fn: (payload, {handler}) => handler(payload),
      }),
    ],
    meta: {op: 'map'},
  })
  return mapped
}

function filterEvent(
  event: Event<any> | Effect<any, any, any>,
  fn:
    | {|
        fn(_: any): boolean,
      |}
    | (any => any | void),
): any {
  if (typeof fn === 'function') {
    console.error('.filter(fn) is deprecated, use .filterMap instead')
    return filterMapEvent(event, fn)
  }
  const mapped = createEvent(joinName(event, ' →? *'), {
    parent: event.domainName,
  })
  createLinkNode(event, mapped, {
    scope: {fn: fn.fn},
    node: [
      step.filter({
        fn: (upd, {fn}) => fn(upd),
      }),
    ],
    meta: {op: 'filter'},
  })
  return mapped
}

function filterMapEvent(
  event: Event<any> | Effect<any, any, any>,
  fn: any => any | void,
): any {
  const mapped = createEvent(joinName(event, ' →? *'), {
    parent: event.domainName,
  })
  createLinkNode(event, mapped, {
    scope: {fn},
    node: [
      step.compute({
        fn: (payload, {fn}) => fn(payload),
      }),
      step.check.defined(),
    ],
    meta: {op: 'filterMap'},
  })
  return mapped
}
