---
title: effector
description: Перечень основных методов API, по группам
lang: ru
---

Перечень основных методов API, по группам

## Типы юнитов

- [Event](/ru/api/effector/Event)
- [Effect](/ru/api/effector/Effect)
- [Store](/ru/api/effector/Store)
- [Domain](/ru/api/effector/Domain)
- [Scope](/ru/api/effector/Scope)

## Создание юнитов

- [createEvent](/ru/api/effector/createEvent)
- [createStore](/ru/api/effector/createStore)
- [createEffect](/ru/api/effector/createEffect)
- [createDomain](/ru/api/effector/createDomain)

## Основные методы библиотеки

- [combine(...stores, f)](/ru/api/effector/combine)
- [attach({effect, mapParams?, source?})](/ru/api/effector/attach)
- [sample({clock, source, fn, target})](/ru/api/effector/sample)
- [merge([eventA, eventB])](/ru/api/effector/merge)
- [split(event, cases)](/ru/api/effector/split)
- [createApi(store, api)](/ru/api/effector/createApi)

## Fork API

- [fork](/ru/api/effector/fork)
- [serialize](/ru/api/effector/serialize)
- [allSettled](/ru/api/effector/allSettled)
- [scopeBind](/ru/api/effector/scopeBind)
- [hydrate](/ru/api/effector/hydrate)

## Плагины для компилятора

- [effector/babel-plugin](/ru/api/effector/babel-plugin)
- [@effector/swc-plugin](https://github.com/effector/swc-plugin)

## Служебные функции

- [is](/ru/api/effector/is)
- [fromObservable(observable)](/ru/api/effector/fromObservable)

## Низкоуровневый API

- [clearNode](/ru/api/effector/clearNode)
- [withRegion](/ru/api/effector/withRegion)
- [launch](/ru/api/effector/launch)
- [inspect](/ru/api/effector/inspect)

## Устаревшие методы

- [forward({from, to})](/ru/api/effector/forward)
- [guard({source, filter, target})](/ru/api/effector/guard)
