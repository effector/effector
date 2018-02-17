# Changelog

## 0.9.1

- Add hot reload support for root domains
- Add support for dispatching halt action
```js
import {createHaltAction} from 'effector'

store.dispatch(createHaltAction()) //This store will be unsubscribed
```

## 0.9.0

First stable version

## Before 0.9.0

Proof of concept
