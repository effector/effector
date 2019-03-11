//@flow
import $$observable from 'symbol-observable'

import {cmd, Kind, stringRefcount, createGraph} from 'effector/stdlib'
import type {Effect} from 'effector/effect'
import {walkEvent} from 'effector/graphite'

import type {Subscription} from '../effector/index.h'
import type {Event} from './index.h'
import {type CompositeName, createName} from '../compositeName'
import {forward} from './forward'

const nextID = stringRefcount()

export function eventFabric<Payload>({
  name: nameRaw,
  parent,
}: {
  name?: string,
  parent?: CompositeName,
}): Event<Payload> {
  const id = nextID()
  const name = nameRaw || id
  const fullName = makeName(name, parent)
  const compositeName = createName(name, parent)
  const graphite = createGraph({
    node: [
      cmd('emit', {
        fullName,
        meta: {
          fullName,
          section: id,
        },
      }),
    ],
  })

  //$off
  const instance: Event<Payload> = (
    payload: Payload,
    ...args: any[]
  ): Payload => instance.create(payload, fullName, args)
  ;(instance: any).getType = () => compositeName.fullName
  //eslint-disable-next-line no-unused-vars
  ;(instance: any).create = (payload, fullName, args) => {
    walkEvent(payload, instance)
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
  instance.graphite = graphite
  instance.shortName = name
  instance.domainName = parent
  instance.compositeName = compositeName

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
  forward({
    from: contramapped,
    to: {
      graphite: createGraph({
        node: [
          cmd('compute', {
            fn: newValue => fn(newValue),
          }),
          event.graphite.seq,
        ],
      }),
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
  forward({
    from: event,
    to: {
      graphite: createGraph({
        node: [
          cmd('compute', {
            fn: newValue => fn(newValue),
          }),
          mapped.graphite.seq,
        ],
      }),
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
  forward({
    from: event,
    to: {
      graphite: createGraph({
        node: [
          cmd('compute', {
            fn: newValue => fn(newValue),
          }),
          cmd('filter', {
            fn: result => result !== undefined,
          }),
          mapped.graphite.seq,
        ],
      }),
    },
  })
  return mapped
}

function watchEvent<Payload>(
  event: Event<Payload>,
  watcher: (payload: Payload, type: string) => any,
): Subscription {
  return forward({
    from: event,
    to: {
      graphite: createGraph({
        node: [
          cmd('run', {
            fn: (newValue: Payload) => watcher(newValue, event.getType()),
          }),
        ],
      }),
    },
  })
}
function makeName(name: string, compositeName?: CompositeName) {
  const fullName = compositeName?.fullName
  if (!fullName) {
    if (!name) return ''
    return name
  }
  return '' + fullName + '/' + name
}
