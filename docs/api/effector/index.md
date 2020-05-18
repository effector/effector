---
id: effector
title: API Reference
---

## Unit creators

- [createEvent](./createEvent.md)
- [createStore](./createStore.md)
- [createEffect](./createEffect.md)
- [createDomain](./createDomain.md)

## Unit definitions

- [Event](./Event.md)
- [Effect](./Effect.md)
- [Store](./Store.md)
- [Domain](./Domain.md)

## Top-Level Exports

- [combine(...stores, f)](./combine.md)
- [createApi(store, api)](./createApi.md)
- [forward({from, to})](./forward.md)
- [merge([eventA, eventB])](./merge.md)
- [split(event, cases)](./split.md)
- [sample({source, clock, fn, target})](./sample.md)
- [guard({source, filter, target})](./guard.md)
- [attach({effect, mapParams, source?})](./attach.md)
- [restore(event, defaultState)](./restore.md)
- [restore(effect, defaultState)](./restore.md)
- [restore(obj)](./restore.md)
- [is](./is.md)
- [fromObservable(observable)](./fromObservable.md)

## Babel plugin

- [effector/babel-plugin](./babel-plugin.md)
