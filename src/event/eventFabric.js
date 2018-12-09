//@flow
//@jsx fx

// import invariant from 'invariant'
// import warning from 'warning'
import fx from 'effector/stdlib/fx'
import $$observable from 'symbol-observable'
import type {Subscription} from '../effector/index.h'
import type {Event} from './index.h'
import type {Store} from 'effector/store'
import type {Effect} from 'effector/effect'
import {Kind, type kind} from 'effector/stdlib/kind'
import {makeVisitorRecordMap} from 'effector/stdlib/visitor'

// import type {TypeDef} from 'effector/stdlib/typedef'
import {walkEvent} from 'effector/graphite'
import {eventRefcount} from '../refcount'
import {type CompositeName, createName} from '../compositeName'

import fabric from './concreteFabric'

export function eventFabric<Payload>({
  name: nameRaw,
  parent,
}: {
  name?: string,
  parent?: CompositeName,
}): Event<Payload> {
  const id = eventRefcount()
  const name = nameRaw || id
  const fullName = makeName(name, parent)
  const compositeName = createName(name, parent)
  const graphite = fabric.event({
    fullName,
    runner(payload: Payload): Payload {
      return instanceAsEvent.create(payload, fullName)
    },
  })

  const instance = (payload: Payload): Payload =>
    instanceAsEvent.create(payload, fullName)
  const instanceAsEvent: Event<Payload> = (instance: any)
  instanceAsEvent.graphite = graphite

  instance.getType = () => compositeName.fullName
  ;(instance: any).create = (payload, fullName) => {
    walkEvent(payload, instanceAsEvent)
    return payload
  }
  ;(instance: any).kind = Kind.event
  ;(instance: any)[$$observable] = () => instance
  instance.id = id
  instance.watch = watch
  instance.map = map
  instance.prepend = prepend
  instance.subscribe = subscribe
  instance.to = to
  instance.shortName = name
  instance.domainName = parent
  instance.compositeName = compositeName
  instance.filter = filter
  function filter<Next>(fn: Payload => Next | void): Event<Next> {
    return filterEvent(instanceAsEvent, fn)
  }

  function map<Next>(fn: Payload => Next): Event<Next> {
    return mapEvent(instanceAsEvent, fn)
  }
  const visitors = makeVisitorRecordMap({
    to: {
      visitor: {
        store: (target, handler) =>
          watch(payload => target.setState(payload, handler)),
        event: (target, handler) => watch(target.create),
        effect: (target, handler) => watch(target.create),
        none(target, handler) {
          throw new TypeError('Unsupported kind')
        },
      },
      reader: target => ((target.kind: any): kind),
      writer: (handler, target, handlerFn) => handler(target, handlerFn),
    },
  })
  function to(
    target: Store<any> & Event<any> & Effect<any, any, any>,
    handler?: Function,
  ): Subscription {
    return visitors.to(target, handler)
  }

  function watch(
    watcher: (payload: Payload, type: string) => any,
  ): Subscription {
    return watchEvent(instanceAsEvent, watcher)
  }

  function subscribe(observer): Subscription {
    return watch(payload => observer.next(payload))
  }
  function prepend<Before>(fn: Before => Payload) {
    const contramapped: Event<Before> = eventFabric({
      name: `* → ${name}`,
      parent,
    })
    fabric.prependEvent({
      fn,
      graphite: contramapped.graphite,
      parentGraphite: graphite,
    })
    return contramapped
  }

  return (instance: $todo)
}

declare function mapEvent<A, B>(event: Event<A>, fn: (_: A) => B): Event<B>
declare function mapEvent<A, B>(
  effect: Effect<A, any, any>,
  fn: (_: A) => B,
): Event<B>
function mapEvent<A, B>(event: Event<A> | Effect<A, any, any>, fn: A => B) {
  const mapped = eventFabric({
    name: `${event.shortName} → *`,
    parent: event.domainName,
  })
  fabric.mapEvent({
    fn,
    graphite: mapped.graphite,
    parentGraphite: event.graphite,
  })
  return mapped
}

function filterEvent<A, B>(
  event: Event<A> | Effect<A, any, any>,
  fn: A => B | void,
): Event<B> {
  const mapped = eventFabric({
    name: `${event.shortName} →? *`,
    parent: event.domainName,
  })
  fabric.filterEvent({
    fn,
    graphite: mapped.graphite,
    parentGraphite: event.graphite,
  })
  return mapped
}

function watchEvent<Payload>(
  event: Event<Payload>,
  watcher: (payload: Payload, type: string) => any,
): Subscription {
  const runCmd = (
    <single>
      <run runner={(newValue: Payload) => watcher(newValue, event.getType())} />
    </single>
  )
  event.graphite.next.data.push(runCmd)
  const unsubscribe = () => {
    const i = event.graphite.next.data.indexOf(runCmd)
    if (i === -1) return

    event.graphite.next.data.splice(i, 1)
  }
  unsubscribe.unsubscribe = unsubscribe
  return unsubscribe
}
function makeName(name: string, compositeName?: CompositeName) {
  return [compositeName?.fullName, name].filter(Boolean).join('/')
}
