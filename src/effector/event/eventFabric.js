//@flow
import $$observable from 'symbol-observable'

import {
  step,
  Kind,
  stringRefcount,
  createNode,
  type Unit,
  bind,
} from '../stdlib'
import {type Effect, effectFabric} from '../effect'
import {launch, upsertLaunch} from '../kernel'
import {noop} from '../blocks'

import {getDisplayName} from '../naming'
import type {Subscription} from '../index.h'
import type {EventConfigPart} from '../config'
import type {Event} from './index.h'
import {type CompositeName, createName} from '../compositeName'
import {thru} from '../thru'
import {createLink} from './forward'

const nextID = stringRefcount()

export function eventFabric<Payload>({
  name: nameRaw,
  parent,
  config = {},
}: {
  name?: string,
  parent?: CompositeName,
  config?: EventConfigPart,
  ...
}): Event<Payload> {
  const id = nextID()
  const name = nameRaw || id
  const compositeName = createName(name, parent)
  const fullName = compositeName.fullName
  const graphite = createNode({
    node: [],
    family: {
      type: 'regular',
    },
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

  createLink(contramapped, {
    child: [event],
    scope: {handler: fn},
    node: [
      step.compute({
        fn: (newValue, {handler}) => handler(newValue),
      }),
    ],
    family: {
      type: 'crosslink',
      links: [event],
    },
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
  createLink(event, {
    child: [mapped],
    scope: {handler: fn},
    node: [
      step.compute({
        fn: (payload, {handler}) => handler(payload),
      }),
    ],
    family: {
      type: 'crosslink',
      links: [event],
    },
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
  const mapped = eventFabric({
    name: '' + event.shortName + ' →? *',
    parent: event.domainName,
  })
  let node
  let scope
  //null values not allowed
  if (typeof fn === 'object') {
    scope = {fn: fn.fn}
    node = [
      step.filter({
        fn: (upd, {fn}) => fn(upd),
      }),
    ]
  } else {
    console.error('.filter(fn) deprecated, use .filterMap instead')
    scope = {fn}
    node = [
      step.compute({
        fn: (payload, {fn}) => fn(payload),
      }),
      step.filter({
        fn: result => result !== undefined,
      }),
    ]
  }
  createLink(event, {
    scope,
    child: [mapped],
    node,
    family: {
      type: 'crosslink',
      links: [mapped],
    },
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
  createLink(event, {
    scope: {fn},
    child: [mapped],
    node: [
      step.compute({
        fn: (payload, {fn}) => fn(payload),
      }),
      step.filter({
        fn: result => result !== undefined,
      }),
    ],
    family: {
      type: 'crosslink',
      links: [mapped],
    },
  })
  return mapped
}

function watchEvent<Payload>(
  event: Event<Payload>,
  watcher: (payload: Payload, type: string) => any,
): Subscription {
  const watcherEffect = effectFabric({
    name: event.shortName + ' watcher',
    domainName: '',
    parent: event.domainName,
    config: {
      handler(payload) {
        return watcher(payload, getDisplayName(event))
      },
    },
  })
  const subscription = createLink(event, {
    //prettier-ignore
    node: [
      noop,
      step.run({fn: x => x})
    ],
    child: [watcherEffect],
    family: {
      type: 'crosslink',
      links: [watcherEffect],
    },
  })
  //$todo
  subscription.fail = watcherEffect.fail
  //$todo
  subscription.done = watcherEffect.done
  return subscription
}
