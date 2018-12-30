//@flow
//@jsx fx
//eslint-disable-next-line no-unused-vars
import fx from 'effector/stdlib/fx'

import {pushNext, type GraphiteMeta} from 'effector/stdlib/typedef'
import $$observable from 'symbol-observable'
import type {Subscription} from '../effector/index.h'
import type {Event} from './index.h'
import type {Effect} from 'effector/effect'
import {Kind} from 'effector/stdlib/kind'
import {walkEvent} from 'effector/graphite'
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
  const graphite = fabric.event({
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
  instance.watch = watch
  instance.map = map
  instance.prepend = prepend
  instance.subscribe = subscribe
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
      name: '* → ' + name,
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
    name: '' + event.shortName + ' → *',
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
    name: '' + event.shortName + ' →? *',
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
    <run runner={(newValue: Payload) => watcher(newValue, event.getType())} />
  )
  //$todo
  pushNext(runCmd, event.graphite.next)
  const unsubscribe = () => {
    const i = event.graphite.next.data.indexOf(runCmd)
    if (i === -1) return

    event.graphite.next.data.splice(i, 1)
  }
  unsubscribe.unsubscribe = unsubscribe
  return unsubscribe
}
function makeName(name: string, compositeName?: CompositeName) {
  const fullName = compositeName?.fullName
  if (!fullName) {
    if (!name) return ''
    return name
  }
  return '' + fullName + '/' + name
}
const fabric = {
  event(args: {fullName: string}): GraphiteMeta {
    const nextSteps = <multi />
    const stepFull = (
      <seq>
        <emit fullName={args.fullName} />
        {nextSteps}
      </seq>
    )
    const graphite = {next: nextSteps, seq: stepFull}
    return graphite
  },
  prependEvent(args: {|
    fn: Function,
    graphite: GraphiteMeta,
    parentGraphite: GraphiteMeta,
  |}) {
    const {fn, graphite, parentGraphite} = args
    pushNext(
      <seq>
        <compute fn={newValue => fn(newValue)} />
        {parentGraphite.seq}
      </seq>,
      graphite.next,
    )
  },
  mapEvent(args: {|
    fn: Function,
    graphite: GraphiteMeta,
    parentGraphite: GraphiteMeta,
  |}) {
    const {fn, graphite, parentGraphite} = args
    pushNext(
      <seq>
        <compute fn={newValue => fn(newValue)} />
        {graphite.seq}
      </seq>,
      parentGraphite.next,
    )
  },
  filterEvent(args: {|
    fn: Function,
    graphite: GraphiteMeta,
    parentGraphite: GraphiteMeta,
  |}) {
    const {fn, graphite, parentGraphite} = args
    pushNext(
      <seq>
        <compute fn={newValue => fn(newValue)} />
        <filter filter={result => result !== undefined} />
        {graphite.seq}
      </seq>,
      parentGraphite.next,
    )
  },
}
