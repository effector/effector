---
id: babel-plugin
title: Babel plugin
hide_title: true
---

# effector/babel-plugin

Built-in plugin for babel, which can be used for ssr and debugging. It inserts a name of a unit, inferred from variable name and `sid` (stable identifier), computed from location in the source code.

For example, in case of [effects without handlers](./Effect.md#usehandler), it will improve error message by clearly showing in which effect error happened.

```js
import {createEffect} from 'effector'

const fetchFx = createEffect()

fetchFx()

// => no handler used in fetchFx
```

[Try it](https://share.effector.dev/Yb8vQ1Ly)

## Usage

In the simplest case, it can be used without any configuration:

```json
{
  "plugins": ["effector/babel-plugin"]
}
```
