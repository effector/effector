---
id: effector
title: API Reference
---

### Top-Level Exports 

- [createEvent(name?)](createEvent.md)
- [createEffect(name?)](createEffect.md)
- [createStore(defaultState)](createStore.md)
- [createDomain(name?)](createDomain.md)
- [combine(...stores, f)](combine.md)
- [createStoreObject({storeA, storeB})](createStoreObject.md)
- [createApi(store, api)](createApi.md)
- [restore(event, defaultState)](restore.md)
- [restore(effect, defaultState)](restore.md)
- [restore(obj)](restore.md)
- [forward({from, to})](forward.md)
- [fromObservable(observable)](fromObservable.md)

### Event API

- [Event\<Payload\>](Event.md)

### Effect API

- [Effect<Params, Done, Fail>](Effect.md)

### Store API

- [Store\<State\>](Store.md)

### Domain API

- [Domain](Domain.md)