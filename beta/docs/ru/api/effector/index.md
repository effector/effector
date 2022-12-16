---
title: Справочник по API
description: Перечень основных методов API, по группам
lang: ru-RU
---

# Перечень основных методов API

## Создание юнитов

- [createEvent](./createEvent.md)
- [createStore](./createStore.md)
- [createEffect](./createEffect.md)
- [createDomain](./createDomain.md)

## Типы юнитов

- [Event](./Event.md)
- [Effect](./Effect.md)
- [Store](./Store.md)
- [Domain](./Domain.md)
- [Scope](./Scope.md)

## Основные методы библиотеки

- [combine(...stores, f)](./combine.md)
- [attach({effect, mapParams, source?})](./attach.md)
- [createApi(store, api)](./createApi.md)
- [forward({from, to})](./forward.md)
- [merge([eventA, eventB])](./merge.md)
- [sample({clock, source, fn, target})](./sample.md)
- [guard({source, filter, target})](./guard.md)
- [split(event, cases)](./split.md)
- [fromObservable(observable)](./fromObservable.md)

## Fork API

- [fork](./fork.md)
- [serialize](./serialize.md)
- [hydrate](./hydrate.md)
- [allSettled](./allSettled.md)
- [scopeBind](./scopeBind.md)

## Плагины для компилятора

- [effector/babel-plugin](./babel-plugin.md)
- [@effector/swc-plugin](https://github.com/effector/swc-plugin)

## Служебные функции

- [is](./is.md)

## Низкоуровневый API

- [clearNode](./clearNode.md)
- [withRegion](./withRegion.md)
- [launch](./launch.md)
