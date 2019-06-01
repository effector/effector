//@flow
import $$observable from 'symbol-observable'

import {step, Kind, stringRefcount, createGraph, type Unit} from '../stdlib'
import type {Effect} from '../effect'
import {launch} from '../kernel'
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
  const graphite = createGraph({
    meta: {
      subtype: 'node',
      node: 'event',
      event: {
        id,
        name: fullName,
        bound: null,
      },
    },
    node: [
      step.emit({
        fullName,
      }),
    ],
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
  ;(instance: any).kind = Kind.event
  ;(instance: any)[$$observable] = () => instance
  ;(instance: any).id = id
  ;(instance: any).watch = watchEvent.bind(null, instance)
  ;(instance: any).map = mapEvent.bind(null, instance)
  ;(instance: any).filter = filterEvent.bind(null, instance)
  ;(instance: any).prepend = prepend.bind(null, instance)
  ;(instance: any).subscribe = subscribe.bind(null, instance)
  ;(instance: any).thru = thru.bind(instance)
  instance.graphite = graphite
  instance.shortName = name
  instance.domainName = parent
  instance.compositeName = compositeName
  instance.defaultConfig = config

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
  contramapped.graphite.meta.event.bound = {
    type: 'prepend',
    prepend: {
      event: event.id,
    },
  }
  createLink(contramapped, {
    child: [event],
    scope: {handler: fn},
    node: [
      step.compute({
        fn: (newValue, {handler}) => handler(newValue),
      }),
    ],
    meta: {
      subtype: 'crosslink',
      crosslink: 'event_prepend',
      event_prepend: {
        from: contramapped.id,
        to: event.id,
      },
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
  mapped.graphite.meta.event.bound = {
    type: 'map',
    map: {
      event: event.id,
    },
  }
  createLink(event, {
    child: [mapped],
    scope: {handler: fn},
    node: [
      step.compute({
        fn: (payload, {handler}) => handler(payload),
      }),
    ],
    meta: {
      subtype: 'crosslink',
      crosslink: 'event_map',
      event_map: {
        from: event.id,
        to: mapped.id,
      },
    },
  })
  return mapped
}

function filterEvent<A, B>(
  event: Event<A> | Effect<A, any, any>,
  fn: A => B | void,
): Event<B> {
  const mapped = eventFabric({
    name: '' + event.shortName + ' →? *',
    parent: event.domainName,
  })
  mapped.graphite.meta.event.bound = {
    type: 'filter',
    filter: {
      event: event.id,
    },
  }
  createLink(event, {
    scope: {handler: fn},
    child: [mapped],
    node: [
      step.compute({
        fn: (payload, {handler}) => handler(payload),
      }),
      step.filter({
        fn(result, scope) {
          scope.val = result
          return result !== undefined
        },
      }),
      step.compute({
        fn(newValue, scope) {
          return scope.val
        },
      }),
    ],
    meta: {
      subtype: 'crosslink',
      crosslink: 'event_filter',
      event_filter: {
        from: event.id,
        to: mapped.id,
      },
    },
  })
  return mapped
}

function watchEvent<Payload>(
  event: Unit,
  watcher: (payload: Payload, type: string) => any,
): Subscription {
  return createLink(event, {
    scope: {trigger: event, handler: watcher},
    //prettier-ignore
    node: [
      noop,
      step.run({
        fn: (payload: Payload, {trigger, handler}) => handler(
          payload,
          getDisplayName(trigger),
        ),
      }),
    ],
    meta: {
      subtype: 'crosslink',
      crosslink: 'event_watch',
      event_watch: {
        event: event.id,
      },
    },
  })
}
