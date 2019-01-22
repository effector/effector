//@flow
//@jsx fx
import $$observable from 'symbol-observable'

//eslint-disable-next-line no-unused-vars
import {fx, Kind, type GraphiteMeta, type TypeDef} from 'effector/stdlib'
import {createWatcher} from 'effector/watcher'
import type {Effect} from 'effector/effect'
import {walkEvent} from 'effector/graphite'

import type {Subscription} from '../effector/index.h'
import type {Event} from './index.h'
import {eventRefcount} from '../refcount'
import {type CompositeName, createName} from '../compositeName'

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
  const graphite = fabric({
    fullName,
  })

  const instance = (payload: Payload, ...args: any[]): Payload =>
    instanceAsEvent.create(payload, fullName, args)
  const instanceAsEvent: Event<Payload> = (instance: any)
  instanceAsEvent.graphite = graphite

  instance.getType = () => compositeName.fullName
  //eslint-disable-next-line no-unused-vars
  ;(instance: any).create = (payload, fullName, args) => {
    walkEvent(payload, instanceAsEvent)
    return payload
  }
  ;(instance: any).kind = Kind.event
  ;(instance: any)[$$observable] = () => instance
  instance.id = id
  instance.watch = watchEvent.bind(null, instanceAsEvent)
  instance.map = mapEvent.bind(null, instanceAsEvent)
  instance.filter = filterEvent.bind(null, instanceAsEvent)
  instance.prepend = prepend.bind(null, instance)
  instance.subscribe = subscribe.bind(null, instance)
  instance.shortName = name
  instance.domainName = parent
  instance.compositeName = compositeName

  return (instance: $todo)
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
      graphite: {
        seq: (
          <seq>
            <compute fn={newValue => fn(newValue)} />
            {event.graphite.seq}
          </seq>
        ),
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
  forward({
    from: event,
    to: {
      graphite: {
        seq: (
          <seq>
            <compute fn={newValue => fn(newValue)} />
            {mapped.graphite.seq}
          </seq>
        ),
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
  forward({
    from: event,
    to: {
      graphite: {
        seq: (
          <seq>
            <compute fn={newValue => fn(newValue)} />
            <filter filter={result => result !== undefined} />
            {mapped.graphite.seq}
          </seq>
        ),
      },
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
      graphite: {
        seq: ((
          <run
            runner={(newValue: Payload) => watcher(newValue, event.getType())}
          />
        ): $todo),
      },
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
type Graphiter = {
  +graphite: GraphiteMeta,
  /*::...*/
}
type GraphiterSmall = {
  +graphite: {
    +seq: TypeDef<'seq' | 'loop', 'step'>,
    /*::...*/
  },
  /*::...*/
}

export function forward(opts: {
  from: Graphiter,
  to: GraphiterSmall,
}): Subscription {
  const toSeq = opts.to.graphite.seq
  const fromGraphite = opts.from.graphite
  fromGraphite.next.data.push(toSeq)
  return createWatcher({
    child: toSeq,
    parent: fromGraphite,
  })
}

const fabric = (args: {fullName: string}): GraphiteMeta => {
  const nextSteps = <multi />
  return {
    next: nextSteps,
    seq: (
      <seq>
        <emit fullName={args.fullName} />
        {nextSteps}
      </seq>
    ),
  }
}
