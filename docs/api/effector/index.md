---
id: effector
title: API Reference
---

### Top-Level Exports

- [createEvent(name?)](createEvent.md)
- [createEffect(name?)](createEffect.md)
- [createStore(defaultState)](createStore.md)
- [createDomain(name?)](createDomain.md)
- [createStoreObject({storeA, storeB})](createStoreObject.md)
- [createApi(store, api)](createApi.md)
- [combine(...stores, f)](combine.md)
- [forward({from, to})](forward.md)
- [fromObservable(observable)](fromObservable.md)
- [guard({source, filter, target})](guard.md)
- [merge([eventA, eventB])](merge.md)
- [restore(event, defaultState)](restore.md)
- [restore(effect, defaultState)](restore.md)
- [restore(obj)](restore.md)
- [split(event, cases)](split.md)
- [sample(sourceStore, clockEvent, fn)](sample.md)

### Event API

- [Event\<Payload\>](Event.md)

### Effect API

- [Effect<Params, Done, Fail>](Effect.md)

### Store API

- [Store\<State\>](Store.md)

### Domain API

- [Domain](Domain.md)
