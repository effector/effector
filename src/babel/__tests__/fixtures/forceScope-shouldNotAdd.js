import {useEvent, useGate, useList, useStore, useStoreMap, useUnit} from 'effector-react'
import {
  useEvent as useScopedEvent,
  useGate as useScopedGate,
  useList as useScopedList,
  useStore as useScopedStore,
  useStoreMap as useScopedStoreMap,
  useUnit as useScopedUnit
} from 'effector-react/scope'
import {
  useEvent as useCompatEvent,
  useGate as useCompatGate,
  useList as useCompatList,
  useStore as useCompatStore,
  useStoreMap as useCompatStoreMap,
  useUnit as useCompatUnit
} from 'effector-react/compat'

// ## useEvent

useEvent(some, {})
useEvent(some, {very: true})
useEvent(some, {forceScope: false})
useEvent(some, null)

const event2 = useScopedEvent(some)
useScopedEvent(another)
useScopedEvent(some)

useScopedEvent(some, {})
useScopedEvent(some, {very: true})
useScopedEvent(some, {forceScope: false})
useScopedEvent(some, null)

useCompatEvent(some, {})
useCompatEvent(some, {very: true})
useCompatEvent(some, {forceScope: false})
useCompatEvent(some, null)


// ## useStore

useStore(some, {})
useStore(some, {very: true})
useStore(some, {forceScope: false})
useStore(some, null)

const value3 = useScopedStore($store)
useScopedStore($store)
useScopedStore($store)

useScopedStore(some, {})
useScopedStore(some, {very: true})
useScopedStore(some, {forceScope: false})
useScopedStore(some, null)

useCompatStore(some, {})
useCompatStore(some, {very: true})
useCompatStore(some, {forceScope: false})
useCompatStore(some, null)

// ## useUnit

useUnit($foo, {})
useUnit({}, {})
useUnit([], {})
useUnit({a: $b}, {})
useUnit([$b], {})
useUnit([$b, $a], {})
useUnit($foo, {})
useUnit({}, null)
useUnit([], undefined)
useUnit({a: $b}, {forceScope: false})

const value18 = useScopedUnit({})
const value19 = useScopedUnit({a: $foo})
const value20 = useScopedUnit([])
const value21 = useScopedUnit([$foo])
const value22 = useScopedUnit([$foo])
useScopedUnit([$foo])
const value23 = useScopedUnit(some)
const value24 = useScopedUnit($another)

useScopedUnit($foo, {})
useScopedUnit({}, {})
useScopedUnit([], {})
useScopedUnit({a: $b}, {})
useScopedUnit([$b], {})
useScopedUnit([$b, $a], {})
useScopedUnit($foo, {})
useScopedUnit({}, null)
useScopedUnit([], undefined)
useScopedUnit({a: $b}, {forceScope: false})

useCompatUnit($foo, {})
useCompatUnit({}, {})
useCompatUnit([], {})
useCompatUnit({a: $b}, {})
useCompatUnit([$b], {})
useCompatUnit([$b, $a], {})
useCompatUnit($foo, {})
useCompatUnit({}, null)
useCompatUnit([], undefined)
useCompatUnit({a: $b}, {forceScope: false})

// ## useList

const items40 = useList($store, fn, {})
const items41 = useList($store, (a) => 1, {})
const items42 = useList($store, {fn: () => 1}, {forceScope: false})
const items43 = useList($store, {fn: () => 1, keys: []}, {another: true})
const items44 = useList($store, (a) => 1, null)
const items45 = useList($store, {fn: () => 1}, undefined)
const items46 = useList($store, {fn: () => 1, keys: []}, {})

const items47 = useScopedList($store, (a) => 1)
const items48 = useScopedList($store, {fn: () => 1})
const items49 = useScopedList($store, {
  fn() {
    return 1
  }
})
const items50 = useScopedList($store, {fn: () => 1, keys: []})
const items51 = useScopedList($store, (a) => 1)
const items52 = useScopedList($store, {fn: () => 1})
const items53 = useScopedList($store, {fn: () => 1, keys: []})

const items54 = useScopedList($store, (a) => 1, {})
const items55 = useScopedList($store, {fn: () => 1}, {forceScope: false})
const items56 = useScopedList($store, {fn: () => 1, keys: []}, {another: true})
const items57 = useScopedList($store, (a) => 1, null)
const items58 = useScopedList($store, {fn: () => 1}, undefined)
const items59 = useScopedList($store, {fn: () => 1, keys: []}, {})

const items61 = useCompatList($store, (a) => 1, {})
const items62 = useCompatList($store, {fn: () => 1}, {forceScope: false})
const items63 = useCompatList($store, {fn: () => 1, keys: []}, {another: true})
const items64 = useCompatList($store, (a) => 1, null)
const items65 = useCompatList($store, {fn: () => 1}, undefined)
const items66 = useCompatList($store, {fn: () => 1, keys: []}, {})

// ## useStoreMap

useStoreMap({
  store: $store,
  keys: [b, c],
  fn: (a) => 1,
  updateFilter: (u, c) => false,
  defaultValue: 0,
  forceScope: false
})
const value110 = useStoreMap({
  store: $store,
  keys: [b, c],
  fn: (a) => 1,
  updateFilter: (u, c) => false,
  defaultValue: 0,
  forceScope: false
})
const value112 = useStoreMap({store: $store, keys: [b, c], fn: (a) => 1, defaultValue: 0, forceScope: false})
const value113 = useStoreMap({store: $store, keys: [b, c], fn: (a) => 1, forceScope: false})
useStoreMap({store: $store, keys: [b, c], fn, updateFilter: (u, c) => false, defaultValue: 0, forceScope: false})

useScopedStoreMap({store: $store, keys: [b, c], fn: (a) => 1})
useScopedStoreMap({store: $store, keys: [b, c], fn})
const value114 = useScopedStoreMap({store: $store, keys: [b, c], fn: (a) => 1})
const value115 = useScopedStoreMap({store: $store, keys: [b, c], fn: (a) => 1, updateFilter: (u, c) => false})
const value116 = useScopedStoreMap({
  store: $store,
  keys: [b, c],
  fn: (a) => 1,
  updateFilter: (u, c) => false,
  defaultValue: 0
})
const value117 = useScopedStoreMap({store: $store, keys: [b, c], fn: (a, k) => 1})
const value118 = useScopedStoreMap({store: $store, keys: [b, c], fn: (a, [b, c]) => 1})
const value119 = useScopedStoreMap({
  store: $store, keys: [b, c], fn: function(a, [b, c]) {
    return 1
  }
})
const value120 = useScopedStoreMap({
  store: $store, keys: [b, c], fn(a, [b, c]) {
    return 1
  }
})

useScopedStoreMap($store, (a) => 1)
useScopedStoreMap($store, fn)
const value121 = useScopedStoreMap($store, fn)
const value122 = useScopedStoreMap($store, (a) => 1)
const value123 = useScopedStoreMap($store, (a, b) => 1)
const value124 = useScopedStoreMap($store, (a, [b, c]) => 1)
const value125 = useScopedStoreMap($store, function(a, [b, c]) {
  return 1
})
const value126 = useScopedStoreMap($store, function demo(a, [b, c]) {
  return 1
})

useScopedStoreMap({
  store: $store,
  keys: [b, c],
  fn: (a) => 1,
  updateFilter: (u, c) => false,
  defaultValue: 0,
  forceScope: false
})
const value127 = useScopedStoreMap({
  store: $store,
  keys: [b, c],
  fn: (a) => 1,
  updateFilter: (u, c) => false,
  defaultValue: 0,
  forceScope: false
})
const value128 = useScopedStoreMap({store: $store, keys: [b, c], fn: (a) => 1, defaultValue: 0, forceScope: false})
const value129 = useScopedStoreMap({store: $store, keys: [b, c], fn: (a) => 1, forceScope: false})
useScopedStoreMap({store: $store, keys: [b, c], fn, updateFilter: (u, c) => false, defaultValue: 0, forceScope: false})

useCompatStoreMap({
  store: $store,
  keys: [b, c],
  fn: (a) => 1,
  updateFilter: (u, c) => false,
  defaultValue: 0,
  forceScope: false
})
const value130 = useCompatStoreMap({
  store: $store,
  keys: [b, c],
  fn: (a) => 1,
  updateFilter: (u, c) => false,
  defaultValue: 0,
  forceScope: false
})
const value131 = useCompatStoreMap({store: $store, keys: [b, c], fn: (a) => 1, defaultValue: 0, forceScope: false})
const value132 = useCompatStoreMap({store: $store, keys: [b, c], fn: (a) => 1, forceScope: false})
useCompatStoreMap({store: $store, keys: [b, c], fn, updateFilter: (u, c) => false, defaultValue: 0, forceScope: false})

// ## useGate

useGate(Gate, {a: 1}, 1)
useGate(Gate, {a: 1}, {})
useGate(Gate, {a: 1}, null)
useGate(Gate, {a: 1}, {forceScope: false})

useScopedGate(Gate)
useScopedGate(Gate, {})
useScopedGate(Gate, 1)
useScopedGate(Gate, {a: 1})
useScopedGate(Gate)
useScopedGate(Gate, {a: 1})

useScopedGate(Gate, {a: 1}, 1)
useScopedGate(Gate, {a: 1}, {})
useScopedGate(Gate, {a: 1}, null)
useScopedGate(Gate, {a: 1}, {forceScope: false})

useCompatGate(Gate, {a: 1}, 1)
useCompatGate(Gate, {a: 1}, {})
useCompatGate(Gate, {a: 1}, null)
useCompatGate(Gate, {a: 1}, {forceScope: false})
