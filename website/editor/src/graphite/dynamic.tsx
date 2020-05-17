import {graphite, resetGraphiteState} from './domain'
import {realmEvent, realmStore, realmEffect} from '../realm'

import {Graph, CompositeName, kind} from './index.h'

const graphiteInvokeSetter = (
  state,
  event: {
    kind: kind,
    id: string,
    compositeName?: CompositeName,
    shortName?: string,
    graphite: Graph,
  },
) => {
  let result
  if (state.__shouldReset === true) result = {}
  else result = {...state}
  result[
    `${event.kind} '${event.compositeName?.fullName ??
      event.shortName ??
      event.id}'`
  ] = event.graphite.seq
  return result
}

graphite
  .on(realmEvent, graphiteInvokeSetter)
  .on(realmStore, graphiteInvokeSetter)
  .on(realmEffect, graphiteInvokeSetter)
  .on(resetGraphiteState, e => {
    e.__shouldReset = true
    return e
  })
