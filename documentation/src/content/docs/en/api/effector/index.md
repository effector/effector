---
title: effector
redirectFrom:
  - /api/effector
---

List of the methods

## Unit Definitions (#unit-definitions)

- [Event](/en/api/effector/Event)
- [Effect](/en/api/effector/Effect)
- [Store](/en/api/effector/Store)
- [Domain](/en/api/effector/Domain)
- [Scope](/en/api/effector/Scope)

## Unit Creators (#unit-creators)

- [createEvent](/en/api/effector/createEvent)
- [createStore](/en/api/effector/createStore)
- [createEffect](/en/api/effector/createEffect)
- [createDomain](/en/api/effector/createDomain)

## Common Methods (#common-methods)

- [combine(...stores, f)](/en/api/effector/combine)
- [attach({effect, mapParams?, source?})](/en/api/effector/attach)
- [sample({clock, source, fn, target})](/en/api/effector/sample)
- [merge([eventA, eventB])](/en/api/effector/merge)
- [split(event, cases)](/en/api/effector/split)
- [createApi(store, api)](/en/api/effector/createApi)

## Fork API (#fork-api)

- [fork](/en/api/effector/fork)
- [serialize](/en/api/effector/serialize)
- [allSettled](/en/api/effector/allSettled)
- [scopeBind](/en/api/effector/scopeBind)
- [hydrate](/en/api/effector/hydrate)

## Plugins (#plugins)

- [effector/babel-plugin](/en/api/effector/babel-plugin)
- [@effector/swc-plugin](https://github.com/effector/swc-plugin)

## Utilities (#utilities)

- [is](/en/api/effector/is)
- [fromObservable(observable)](/en/api/effector/fromObservable)

## Low Level API (#low-level-api)

- [clearNode](/en/api/effector/clearNode)
- [withRegion](/en/api/effector/withRegion)
- [launch](/en/api/effector/launch)
- [inspect](/en/api/effector/inspect)

## Import Map (#import-map)

Package `effector` provides couple different entry points for different purposes:

- [effector/compat](/en/api/effector/module/compat)
- [effector/inspect](/en/api/effector/module/inspect)
- [effector/babel-plugin](/en/api/effector/module/babel-plugin)

## Deprecated Methods (#deprecated-methods)

- [forward({from, to})](/en/api/effector/forward)
- [guard({source, filter, target})](/en/api/effector/guard)
