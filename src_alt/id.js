//@flow

import {counter} from './register'
import {option} from 'fp-ts'

export /*::opaque*/
type ActorId/*:::string*/ = string

export /*::opaque*/
type Route/*:::$ReadOnlyArray<ActorId>*/ = ActorId[]

export /*::opaque*/
type RouteString/*:::string*/ = string

const count = counter()

export const getActorId: () => ActorId =
  () => count().toString(36)

export function serialize(
  id: string | number | ActorId
): ActorId {
  if (typeof id === 'number') return id.toString(36)
  return id
}

export function deserialize(
  id: string | number | ActorId
): number {
  if (typeof id === 'number') return id
  return parseInt(id, 36)
}

export function isEqualId(a: ActorId, b: ActorId) {
  return deserialize(a) === deserialize(b)
}

export function isActor(value: mixed): boolean %checks {
  return (
    (typeof value === 'string')
    && (parseInt(value, 36).toString(36) === value)
  )
}

export function serializeRoute(
  route: string | string[] | Route | RouteString
): RouteString {
  if (typeof route === 'string') {
    return serializeRoute(route.split(' '))
  }
  const serializedBlock = route.map(serialize)
  return serializedBlock.join(' ')
}

export function deserializeRoute(
  route: string | RouteString
): Route {
  return route
    .split(' ')
    .map(serialize)
}

export function isEmpty(route: Route) {
  return route.length === 0
}

export function putHead(
  actorId: ActorId, route: Route
): Route {
  return [serialize(actorId), ...route]
}

export function pullHead(
  route: Route
): option.Option<{
  head: ActorId,
  route: Route,
}> {
  if (route.length === 0)
    return option.none
  const [head, ...newRoute] = route
  return option.some({
    head, route: newRoute,
  })
}

export function routeOf(actorId: ActorId): Route {
  return [actorId]
}
