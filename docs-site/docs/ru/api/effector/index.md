---
id: effector
title: Справочник по API
description: Перечень основных методов API, по группам
---

Перечень основных методов API, по группам

## Создание юнитов

- [createEvent](docs/ru/api/effector/createEvent.md)
- [createStore](docs/ru/api/effector/createStore.md)
- [createEffect](docs/ru/api/effector/createEffect.md)
- [createDomain](docs/ru/api/effector/createDomain.md)

## Типы юнитов

- [Event](docs/ru/api/effector/Event.md)
- [Effect](docs/ru/api/effector/Effect.md)
- [Store](docs/ru/api/effector/Store.md)
- [Domain](docs/ru/api/effector/Domain.md)

## Основные методы библиотеки

- [combine(...stores, f)](docs/ru/api/effector/combine.md)
- [attach({effect, mapParams, source?})](docs/ru/api/effector/attach.md)
- [createApi(store, api)](docs/ru/api/effector/createApi.md)
- [forward({from, to})](docs/ru/api/effector/forward.md)
- [merge([eventA, eventB])](docs/ru/api/effector/merge.md)
- [sample({clock, source, fn, target})](docs/ru/api/effector/sample.md)
- [guard({source, filter, target})](docs/ru/api/effector/guard.md)
- [split(event, cases)](docs/ru/api/effector/split.md)
- [is](docs/ru/api/effector/is.md)
- [fromObservable(observable)](docs/ru/api/effector/fromObservable.md)

## Fork api

- [Scope](docs/ru/api/effector/Scope.md)
- [fork](docs/ru/api/effector/fork.md)
- [serialize](docs/ru/api/effector/serialize.md)
- [hydrate](docs/ru/api/effector/hydrate.md)
- [allSettled](docs/ru/api/effector/allSettled.md)
- [scopeBind](docs/ru/api/effector/scopeBind.md)

## Babel plugin

- [effector/babel-plugin](docs/ru/api/effector/babel-plugin.md)

## Низкоуровневый api

- [clearNode](docs/ru/api/effector/clearNode.md)
- [withRegion](docs/ru/api/effector/withRegion.md)
