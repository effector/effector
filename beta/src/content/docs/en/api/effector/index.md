---
title: effector
redirectFrom:
  - /api/effector
---

List of the methods

## Unit definitions

- [Event](/en/api/effector/Event)
- [Effect](/en/api/effector/Effect)
- [Store](/en/api/effector/Store)
- [Domain](/en/api/effector/Domain)
- [Scope](/en/api/effector/Scope)

## Unit creators

- [createEvent](/en/api/effector/createEvent)
- [createStore](/en/api/effector/createStore)
- [createEffect](/en/api/effector/createEffect)
- [createDomain](/en/api/effector/createDomain)

## Common methods

- [combine(...stores, f)](/en/api/effector/combine)
- [attach({effect, mapParams?, source?})](/en/api/effector/attach)
- [sample({clock, source, fn, target})](/en/api/effector/sample)
- [merge([eventA, eventB])](/en/api/effector/merge)
- [split(event, cases)](/en/api/effector/split)
- [createApi(store, api)](/en/api/effector/createApi)

## Fork API

- [fork](/en/api/effector/fork)
- [serialize](/en/api/effector/serialize)
- [allSettled](/en/api/effector/allSettled)
- [scopeBind](/en/api/effector/scopeBind)
- [hydrate](/en/api/effector/hydrate)

## Plugins

- [effector/babel-plugin](/en/api/effector/babel-plugin)
- [@effector/swc-plugin](https://github.com/effector/swc-plugin)

## Utilities

- [is](/en/api/effector/is)
- [fromObservable(observable)](/en/api/effector/fromObservable)

## Low level api

- [clearNode](/en/api/effector/clearNode)
- [withRegion](/en/api/effector/withRegion)
- [launch](/en/api/effector/launch)
- [inspect](/en/api/effector/inspect)

## Deprecated methods

- [forward({from, to})](/en/api/effector/forward)
- [guard({source, filter, target})](/en/api/effector/guard)
