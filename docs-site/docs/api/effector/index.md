---
id: effector
title: API Reference
---

## Unit creators

- [createEvent](docs/api/effector/createEvent.md)
- [createStore](docs/api/effector/createStore.md)
- [createEffect](docs/api/effector/createEffect.md)
- [createDomain](docs/api/effector/createDomain.md)

## Unit definitions

- [Event](docs/api/effector/Event.md)
- [Effect](docs/api/effector/Effect.md)
- [Store](docs/api/effector/Store.md)
- [Domain](docs/api/effector/Domain.md)

## Top-Level Exports

- [combine(...stores, f)](docs/api/effector/combine.md)
- [attach({effect, mapParams, source?})](docs/api/effector/attach.md)
- [createApi(store, api)](docs/api/effector/createApi.md)
- [forward({from, to})](docs/api/effector/forward.md)
- [merge([eventA, eventB])](docs/api/effector/merge.md)
- [sample({clock, source, fn, target})](docs/api/effector/sample.md)
- [guard({source, filter, target})](docs/api/effector/guard.md)
- [split(event, cases)](docs/api/effector/split.md)
- [is](docs/api/effector/is.md)
- [fromObservable(observable)](docs/api/effector/fromObservable.md)

## Fork api

- [Scope](docs/api/effector/Scope.md)
- [fork](docs/api/effector/fork.md)
- [serialize](docs/api/effector/serialize.md)
- [hydrate](docs/api/effector/hydrate.md)
- [allSettled](docs/api/effector/allSettled.md)
- [scopeBind](docs/api/effector/scopeBind.md)

## Babel plugin

- [effector/babel-plugin](docs/api/effector/babel-plugin.md)

## Low level api

- [clearNode](docs/api/effector/clearNode.md)
- [withRegion](docs/api/effector/withRegion.md)
