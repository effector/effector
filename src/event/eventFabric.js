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
import {createUnsubscribe} from '../unsubscribe'
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
  instance.watch = watchEvent.bind(null, instanceAsEvent)
  instance.map = mapEvent.bind(null, instanceAsEvent)
  instance.filter = filterEvent.bind(null, instanceAsEvent)
  instance.prepend = prepend
  instance.subscribe = subscribe
  instance.shortName = name
  instance.domainName = parent
  instance.compositeName = compositeName

  function subscribe(observer): Subscription {
    return instance.watch(payload => observer.next(payload))
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
  return createUnsubscribe({
    child: runCmd,
    parent: event.graphite,
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
export function forward<T>(opts: {from: Event<T>, to: Event<T>}): Subscription {
  fabric.forwardEvent({
    graphite: opts.to.graphite,
    parentGraphite: opts.from.graphite,
  })
  return createUnsubscribe({
    child: opts.to.graphite.seq,
    parent: opts.from.graphite,
  })
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
  forwardEvent(args: {|graphite: GraphiteMeta, parentGraphite: GraphiteMeta|}) {
    const {graphite, parentGraphite} = args
    pushNext(graphite.seq, parentGraphite.next)
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
