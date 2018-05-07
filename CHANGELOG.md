# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.16.1-beta.12"></a>
## [0.16.1-beta.12](https://gitlab.com/zerobias/effector/compare/v0.14.0...v0.16.1-beta.12) (2018-05-07)



# Changelog

## 0.16.0

* Removed most-subject dependency
* New api

## 0.15.0-rc.2

* Add AVar: low-level interface for asynchronous variables
* Clean up builds before publishing
* Add types dir into npm build

## 0.14.0

* Add independent `createStore` method
* Replace console.warn with console.error in warnings
* Make reducers full-featured store elements (add `.get()`, `.set(x)` and `.map(fn)` methods)
* Add observable declaration to effects, events and reducers, which allow interop in this way: `from(effect)`

## 0.13.0

* Build via rollup
* New module architechture

## 0.12.0

* Exclude coverage from npm build
* Rename `mill` to `collect`
* Rename `joint` to `combine`

## 0.11.1

* Remove source files from npm release

## 0.11.0

* Add support for sync functions in `.use`
* **breaking** Rename config option `effectImplementationCheck` to `unused`

## 0.10.2

* Fix overriding of flow modules

## 0.10.0

* **breaking** Removed `rootDomain` alias for `createRootDomain`
* Fixed duplication of `typeConstant` events
* Added sync event propagation
* Catching of watch function errors
* Added warning to port errors
* Added type aliases `DomainAuto`, `EventAuto` and `EffectAuto`
* Added `mill` fluent "AND" reducer combinator

```js
import { mill, type MillType, type Reducer } from 'effector'

type A = 'foo'
type B = 'bar'
declare var reducerA: Reducer<A>
declare var reducerB: Reducer<B>

const tuple: MillType<A, B> = mill()
 .and(reducerA)
 .and(reducerB)

const union: Reducer<{
 a: A,
 b: B,
 staticField: string,
}> = tuple.joint((a: A, b: B) => ({
 a,
 b,
 staticField: 'its ok',
}))
```

## 0.9.1

* Added hot reload support for root domains
* Added support for dispatching halt action

```js
import { createHaltAction } from 'effector'

store.dispatch(createHaltAction()) //This store will be unsubscribed
```

## 0.9.0

First stable version

## Before 0.9.0

Proof of concept
