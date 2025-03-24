---
title: Use scopeBind in Next.js
redirectFrom:
  - /recipes/nextjs/scope-bind
---

:::tip
There is the official Next.js bindings package - [`@effector/next`](https://github.com/effector/next). Follow its documentation to find out, how to integrate Next.js with effector.
:::

There are situations when we need to get values from external libraries through callbacks.
If we directly bind [events](/en/api/effector/createEvent), then we will face the loss of the scope.
To solve this problem, we can use [scopeBind](/en/api/effector/scopeBind).

We have some external library that returns us the status of our connection.
Let's call it an instance in the store and call it _$service_, and we will take the status through an event.

```js
import { createEvent, createStore } from "effector";

const $connectStatus = createStore("close");
const connectEv = createEvent();

sample({
  clock: connectEv,
  targt: $connectStatus,
});
```

Next, we need to create an effect, within which we will connect our [event](/en/api/effector/createEvent) and _service_.

```js
import { attach, scopeBind } from "effector";

const connectFx = attach({
  source: {
    service: $service,
  },
  async effect({ service }) {
    /**
     * `scopeBind` will automatically derive current scope, if called inside of an Effect
     */
    const serviceStarted = scopeBind(connectEv);

    return await service.on("service_start", serviceStarted);
  },
});
```

After calling our [effect](/en/api/effector/createEffect), the [event](/en/api/effector/createEvent) will be tied to the [scope](/en/api/effector/Scope) and will be able to take the current value from our _service_.
