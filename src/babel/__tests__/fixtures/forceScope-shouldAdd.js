import {useEvent, useGate, useList, useStore, useStoreMap, useUnit} from 'effector-react'
import {
  useEvent as useCompatEvent,
  useGate as useCompatGate,
  useList as useCompatList,
  useStore as useCompatStore,
  useStoreMap as useCompatStoreMap,
  useUnit as useCompatUnit
} from 'effector-react/compat'

// ## useEvent
const event = useEvent(some)
useEvent(another)
useEvent(some)

const event1 = useCompatEvent(some)
useCompatEvent(another)
useCompatEvent(some)


// ## useStore
const value1 = useStore($store)
useStore($store)
useStore($store)

const value2 = useCompatStore($store)
useCompatStore($store)
useCompatStore($store)

// ## useUnit
const value4 = useUnit({})
const value5 = useUnit({a: $foo})
const value6 = useUnit([])
const value7 = useUnit([$foo])
const value8 = useUnit([$foo])
useUnit([$foo])
const value9 = useUnit(some)
const value10 = useUnit($another)

const value11 = useCompatUnit({})
const value12 = useCompatUnit({a: $foo})
const value13 = useCompatUnit([])
const value14 = useCompatUnit([$foo])
const value15 = useCompatUnit([$foo])
useCompatUnit([$foo])
const value16 = useCompatUnit(some)
const value17 = useCompatUnit($another)

// ## useList
const items25 = useList($store, fn)
const items26 = useList($store, (a) => 1)
const items27 = useList($store, {fn: () => 1})
const items28 = useList($store, {
  fn() {
    return 1
  }
})
const items29 = useList($store, {fn: () => 1, keys: []})
const items30 = useList($store, (a) => 1)
const items31 = useList($store, {fn: () => 1})
const items32 = useList($store, {fn: () => 1, keys: []})

const items33 = useCompatList($store, (a) => 1)
const items34 = useCompatList($store, {fn: () => 1})
const items35 = useCompatList($store, {
  fn() {
    return 1
  }
})
const items36 = useCompatList($store, {fn: () => 1, keys: []})
const items37 = useCompatList($store, (a) => 1)
const items38 = useCompatList($store, {fn: () => 1})
const items39 = useCompatList($store, {fn: () => 1, keys: []})

// ## useStoreMap
useStoreMap({store: $store, keys: [b, c], fn: (a) => 1})
useStoreMap({store: $store, keys: [b, c], fn})
const value71 = useStoreMap({store: $store, keys: [b, c], fn: (a) => 1})
const value72 = useStoreMap({store: $store, keys: [b, c], fn: (a) => 1, updateFilter: (u, c) => false})
const value73 = useStoreMap({store: $store, keys: [b, c], fn: (a) => 1, updateFilter: (u, c) => false, defaultValue: 0})
const value74 = useStoreMap({store: $store, keys: [b, c], fn: (a, k) => 1})
const value75 = useStoreMap({store: $store, keys: [b, c], fn: (a, [b, c]) => 1})
const value76 = useStoreMap({
  store: $store, keys: [b, c], fn: function(a, [b, c]) {
    return 1
  }
})
const value77 = useStoreMap({
  store: $store, keys: [b, c], fn(a, [b, c]) {
    return 1
  }
})

useCompatStoreMap({store: $store, keys: [b, c], fn: (a) => 1})
useCompatStoreMap({store: $store, keys: [b, c], fn})
const value81 = useCompatStoreMap({store: $store, keys: [b, c], fn: (a) => 1})
const value82 = useCompatStoreMap({store: $store, keys: [b, c], fn: (a) => 1, updateFilter: (u, c) => false})
const value83 = useCompatStoreMap({
  store: $store, keys: [b, c], fn: (a) => 1, updateFilter: (u, c) => false, defaultValue: 0
})
const value84 = useCompatStoreMap({store: $store, keys: [b, c], fn: (a, k) => 1})
const value85 = useCompatStoreMap({store: $store, keys: [b, c], fn: (a, [b, c]) => 1})
const value86 = useCompatStoreMap({
  store: $store, keys: [b, c], fn: function(a, [b, c]) {
    return 1
  }
})
const value87 = useCompatStoreMap({
  store: $store, keys: [b, c], fn(a, [b, c]) {
    return 1
  }
})

// Should convert to object with forceScope: true
useStoreMap($store, (a) => 1)
useStoreMap($store, fn)
const value91 = useStoreMap($store, fn)
const value92 = useStoreMap($store, (a) => 1)
const value93 = useStoreMap($store, (a, b) => 1)
const value94 = useStoreMap($store, (a, [b, c]) => 1)
const value95 = useStoreMap($store, function(a, [b, c]) {
  return 1
})
const value96 = useStoreMap($store, function demo(a, [b, c]) {
  return 1
})

useCompatStoreMap($store, (a) => 1)
useCompatStoreMap($store, fn)
const value100 = useCompatStoreMap($store, fn)
const value101 = useCompatStoreMap($store, (a) => 1)
const value102 = useCompatStoreMap($store, (a, b) => 1)
const value103 = useCompatStoreMap($store, (a, [b, c]) => 1)
const value104 = useCompatStoreMap($store, function(a, [b, c]) {
  return 1
})
const value105 = useCompatStoreMap($store, function demo(a, [b, c]) {
  return 1
})

// ## useGate
useGate(Gate)
useGate(Gate, {})
useGate(Gate, 1)
useGate(Gate, {a: 1})
useGate(Gate)
useGate(Gate, {a: 1})

useCompatGate(Gate)
useCompatGate(Gate, {})
useCompatGate(Gate, 1)
useCompatGate(Gate, {a: 1})
useCompatGate(Gate)
useCompatGate(Gate, {a: 1})
