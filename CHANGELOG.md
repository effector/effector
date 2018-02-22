# Changelog

## 0.11.0
- Add support for sync functions in `.use`
- **breaking** Rename config option `effectImplementationCheck` to `unused`

## 0.10.2
- Fix overriding of flow modules

## 0.10.0
- **breaking** Removed `rootDomain` alias for `createRootDomain`
- Fixed duplication of `typeConstant` events
- Added sync event propagation
- Catching of watch function errors
- Added warning to port errors
- Added type aliases `DomainAuto`, `EventAuto` and `EffectAuto`
- Added `mill` fluent "AND" reducer combinator
```js
import {mill, type MillType, type Reducer} from 'effector'

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
}> = tuple.joint(
  (a: A, b: B) => ({
    a, b,
    staticField: 'its ok',
  })
)

```

## 0.9.1

- Added hot reload support for root domains
- Added support for dispatching halt action
```js
import {createHaltAction} from 'effector'

store.dispatch(createHaltAction()) //This store will be unsubscribed
```

## 0.9.0

First stable version

## Before 0.9.0

Proof of concept
