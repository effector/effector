//@flow
import $$observable from 'symbol-observable'

import {
  step,
  Kind,
  stringRefcount,
  createNode,
  type Unit,
  bind,
  addLinkToOwner,
} from '../stdlib'
import {type Effect, effectFabric} from '../effect'
import {launch} from '../kernel'
import {noop} from '../blocks'

import type {Subscription} from '../index.h'
import type {EventConfigPart} from '../config'
import type {Event} from './index.h'
import {type CompositeName, createName} from '../compositeName'
import {thru} from '../thru'
import {createLink, createLinkNode} from './forward'

const nextID = stringRefcount()

export function eventFabric<Payload>({
  name: nameRaw,
  parent,
  config = {},
}: {
  +name?: string,
  +parent?: CompositeName,
  +config?: EventConfigPart,
  ...
}): Event<Payload> {
  const id = nextID()
  const name = nameRaw || id
  const compositeName = createName(name, parent)
  const fullName = compositeName.fullName
  const graphite = createNode({
    node: [],
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
  instance.graphite = graphite
  instance.shortName = name
  instance.domainName = parent
  instance.compositeName = compositeName
  instance.defaultConfig = config
  ;(instance: any).kind = Kind.event
  ;(instance: any)[$$observable] = () => instance
  ;(instance: any).id = id
  ;(instance: any).watch = bind(watchEvent, instance)
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
  const contramapped: Event<any> = eventFabric({
    name: '* → ' + event.shortName,
    parent: event.domainName,
  })

  createLinkNode(contramapped, event, {
    scope: {handler: fn},
    node: [
      step.compute({
        fn: (newValue, {handler}) => handler(newValue),
      }),
    ],
  })
  return contramapped
}

declare function mapEvent<A, B>(event: Event<A>, fn: (_: A) => B): Event<B>
declare function mapEvent<A, B>(
  effect: Effect<A, any, any>,
  fn: (_: A) => B,
): Event<B>
function mapEvent<A, B>(event: Event<A> | Effect<A, any, any>, fn: A => B) {
  const mapped = eventFabric({
    name: '' + event.shortName + ' → *',
    parent: event.domainName,
  })
  createLinkNode(event, mapped, {
    scope: {handler: fn},
    node: [
      step.compute({
        fn: (payload, {handler}) => handler(payload),
      }),
    ],
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
  const mapped = eventFabric({
    name: '' + event.shortName + ' →? *',
    parent: event.domainName,
  })
  createLinkNode(event, mapped, {
    scope: {fn: fn.fn},
    node: [
      step.filter({
        fn: (upd, {fn}) => fn(upd),
      }),
    ],
  })
  return mapped
}

function filterMapEvent(
  event: Event<any> | Effect<any, any, any>,
  fn: any => any | void,
): any {
  const mapped = eventFabric({
    name: '' + event.shortName + ' →? *',
    parent: event.domainName,
  })
  createLinkNode(event, mapped, {
    scope: {fn},
    node: [
      step.compute({
        fn: (payload, {fn}) => fn(payload),
      }),
      step.filter({
        fn: result => result !== undefined,
      }),
    ],
  })
  return mapped
}

function watchEvent<Payload>(
  event: Event<Payload>,
  watcher: (payload: Payload) => any,
): Subscription {
  const watcherEffect = effectFabric({
    name: event.shortName + ' watcher',
    parent: event.domainName,
    config: {handler: watcher},
  })
  const subscription = createLink(event, watcherEffect, {
    node: [noop, step.run({fn: x => x})],
  })
  addLinkToOwner(event, watcherEffect)
  //$todo
  subscription.fail = watcherEffect.fail
  //$todo
  subscription.done = watcherEffect.done
  return subscription
}
