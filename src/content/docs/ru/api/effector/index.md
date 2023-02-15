---
title: Справочник по API
description: Перечень основных методов API, по группам
lang: ru
---

# Перечень основных методов API

## Создание юнитов

- [createEvent](./createEvent)
- [createStore](./createStore)
- [createEffect](./createEffect)
- [createDomain](./createDomain)

## Типы юнитов

- [Event](./Event)
- [Effect](./Effect)
- [Store](./Store)
- [Domain](./Domain)
- [Scope](./Scope)

## Основные методы библиотеки

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

## Плагины для компилятора

- [effector/babel-plugin](./babel-plugin)
- [@effector/swc-plugin](https://github.com/effector/swc-plugin)

## Служебные функции

- [is](./is)

## Низкоуровневый API

- [clearNode](./clearNode)
- [withRegion](./withRegion)
- [launch](./launch)
