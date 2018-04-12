//@flow

import type {Key, PrivateSet} from './index.h'

import {getFromSetMap} from './utils'

export function get(ref: PrivateSet<Key>, eventName: Key): Set<Key> {
 return getFromSetMap(ref, eventName)
}

export function add(ref: PrivateSet<Key>, instance: Key, eventName: Key) {
 get(ref, eventName).add(instance)
}

export function remove(ref: PrivateSet<Key>, instance: Key, eventName: Key) {
 const eventRef = ref.get(eventName)
 if (!eventRef) {
  return
 }
 eventRef.delete(instance)
}

export function size(ref: PrivateSet<Key>, instance: Key, eventName: Key) {
 const eventRef = ref.get(eventName)
 if (!eventRef) {
  return 0
 }
 return eventRef.size
}

export function has(ref: PrivateSet<Key>, instance: Key, eventName: Key) {
 const eventRef = ref.get(eventName)
 if (!eventRef) {
  return false
 }
 return eventRef.has(instance)
}

export function clear(ref: PrivateSet<Key>, instance: Key, eventName: Key) {
 const eventRef = ref.get(eventName)
 if (!eventRef) {
  return
 }
 return eventRef.clear()
}
