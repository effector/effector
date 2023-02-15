---
id: effector
title: API Reference
---

# List of the methods

## Unit creators

- [createEvent](./createEvent)
- [createStore](./createStore)
- [createEffect](./createEffect)
- [createDomain](./createDomain)

## Unit definitions

- [Event](./Event)
- [Effect](./Effect)
- [Store](./Store)
- [Domain](./Domain)
- [Scope](./Scope)

## Common methods

- [combine(...stores, f)](./combine)
- [attach({effect, mapParams, source?})](./attach)
- [createApi(store, api)](./createApi)
- [forward({from, to})](./forward)
- [merge([eventA, eventB])](./merge)
- [sample({clock, source, fn, target})](./sample)
- [guard({source, filter, target})](./guard)
- [split(event, cases)](./split)
- [fromObservable(observable)](./fromObservable)

## Fork API

- [fork](./fork)
- [serialize](./serialize)
- [hydrate](./hydrate)
- [allSettled](./allSettled)
- [scopeBind](./scopeBind)

## Plugins

- [effector/babel-plugin](./babel-plugin)
- [@effector/swc-plugin](https://github.com/effector/swc-plugin)

## Utilities

- [is](./is)

## Low level api

- [clearNode](./clearNode)
- [withRegion](./withRegion)
- [launch](./launch)
