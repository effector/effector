---
id: glossary
title: Glossary
---

This is a glossary of the core terms in Effector, along with their type signatures. The types are documented using [TypeScript notation](http://typescriptlang.org).

## Event

*Event* is an intention to change state.

```typescript
function createEvent<E>(eventName?: string): Event<E>;
```

- [`createEvent(eventName)`]() creates event

```typescript
type Event<Payload> = {
 (payload: Payload): Payload;
 watch(watcher: (payload: Payload) => any): Subscription;
 map<T>(fn: (payload: Payload) => T): Event<T>;
 filter(options: {fn(payload: Payload): boolean}): Event<Payload>;
 filterMap<T>(fn: (payload: Payload) => T | void): Event<T>;
 prepend<Before>(fn: (params: Before) => Payload): Event<Before>;
 shortName: string;
}
```

- [`(payload)`]() calls `Event` with payload
- [`watch(watcher)`]() listens to this event and calls given [`watcher`](#watcher)
- [`map(fn)`]()
- [`filter({fn})`]() creates new event that will receive update only when given `fn` returns true
- [`filterMap(fn)`]() creates new event that will receive value, returned by given `fn`, but only when it returns anything but undefined. Use cases: extract value from react's refs; statically typed filters;
- [`prepend(fn)`]() creates new event that preprocesses payload before calling original event
- [`shortName`]() is used for debug

## Effect

*Effect* is a container for async function. 

It can be safely used in place of the original async function.

It returns promise with result of function call

The only requirement for function:

- __Should__ have zero or one argument

```typescript
function createEffect<Params, Done, Fail>(
 effectName?: string,
): Effect<Params, Done, Fail>;
```

- [`createEffect(effectName)`]() creates effect

```typescript
type Effect<Params, Done, Fail = Error> = {
 (payload: Params): Promise<Done>;
 done: Event<{params: Params, result: Done}>;
 fail: Event<{params: Params, error: Fail}>;
 use: {
  (asyncFunction: (params: Params) => Promise<Done>): this,
  getCurrent(): (params: Params) => Promise<Done>,
 };
 watch(watcher: (payload: Params) => any): Subscription;
 prepend<Before>(fn: (_: Before) => Params): Event<Before>;
 shortName: string;
}
```

- [`(payload)`]() calls `Effect` with payload
- [`use(asyncFunction)`]() injects async function into effect (can be called multiple times)
- [`watch(watcher)`]() listens to this effect and calls given [`watcher`](#watcher)
- [`prepend(fn)`]() creates new effect that preprocesses payload before calling original event
- [`shortName`]() is used for debug

## Store

*Store* is an object that holds the state tree.
There can be multiple stores.

```typescript
function createStore<State>(defaultState: State): Store<State>
```
```typescript
function createStoreObject<State: {[key: string]: Store<any> | any}>(
  obj: State
): Store<$ObjMap<State, <S>(field: Store<S> | S) => S>>
```

- [`createStore(defaultState)`]() creates new store
- [`createStoreObject(obj)`]() combines multiple stores into one

```typescript
type Store<State> = {
 reset(...triggers: Array<Event<any> | Effect<any, any, any> | Store<any>>): this;
 getState(): State;
 map<T>(fn: (_: State) => T): Store<T>;
 on<E>(
  trigger: Event<E> | Effect<E, any, any> | Store<E>,
  handler: (state: State, payload: E) => State | void,
 ): this;
 off(trigger: Event<any> | Effect<any, any, any> | Store<any>): void;
 watch<E>(
  watcher: (state: State, payload: E, type: string) => any,
 ): Subscription;
 watch<E>(
  trigger: Event<E> | Effect<E, any, any> | Store<E>,
  watcher: (state: State, payload: E) => any,
 ): Subscription;
 thru<U>(fn: (store: Store<State>) => U): U;
 shortName: string;
 defaultState: State;
}
```

- [`reset(...triggers)`]() resets state to default when event occurs
- [`getState()`]() returns current state
- [`map(fn)`]() creates computed store from previous state
- [`on(event, handler)`]() calls [`reducer`](#reducer) on store when event occurs
- [`off(event)`]() disables [`reducer`](#reducer)
- [`watch(watcher)`]() calls given [`watcher`](#watcher) when event occurs
- [`thru(fn)`]() calls function with this store and return its result
- [`shortName`]() is used for debug
- [`defaultState`]() is `createStore` first argument

## Domain

*Domain* is a namespace for your events, stores and effects.

Domain can subscribe to event, effect, store or nested domain creation with `onCreateEvent`, `onCreateStore`, `onCreateEffect`, `onCreateDomain` methods.

It is useful for logging or other side effects.

```typescript
function createDomain(domainName?: string): Domain;
```

- [`createDomain(domainName)`]() creates new domain

```typescript
type Domain = {
 onCreateEvent(hook: (newEvent: Event<unknown>) => any): Subscription;
 onCreateEffect(hook: (newEffect: Effect<unknown, unknown, unknown>) => any): Subscription;
 onCreateStore(hook: (newStore: Store<unknown>) => any): Subscription;
 onCreateDomain(hook: (newDomain: Domain) => any): Subscription;
 event<Payload>(name?: string): Event<Payload>;
 effect<Params, Done, Fail>(name?: string): Effect<Params, Done, Fail>;
 store<State>(defaultState: State): Store<State>;
 domain(name?: string): Domain;
}
```

- [`onCreateEvent(hook)`]() calls hook when nested [`Event`](#event) created
- [`onCreateEffect(hook)`]() calls hook when nested [`Effect`](#effect) created
- [`onCreateStore(hook)`]() calls hook when nested [`Store`](#store) created
- [`onCreateDomain(hook)`]() calls hook when nested `Domain` created
- [`event(name)`]() is the function that creates [`Event`](#event) described above.
- [`effect(name)`]() is the function that creates [`Effect`](#effect) described above.
- [`store(defaultState)`]() is the function that creates Store described above.
- [`domain(name)`]() creates nested domain.

## Reducer

```typescript
type StoreReducer<State, E> = (state: S, payload: E) => State | void
type EventOrEffectReducer<T, E> = (state: T, payload: E) => T
```

*Reducer* calculates a new state given the previous state and an event.

## Watcher

```typescript
type Watcher<T> = (update: T) => any
```

*Watcher* is used for __side effects__

## Subscription

```typescript
type Subscription = {
 (): void,
 unsubscribe(): void,
}
```
