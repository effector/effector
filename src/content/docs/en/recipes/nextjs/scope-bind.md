---
title: Use scopeBind in Next.js
---

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

To pick up the current [scope](/en/api/effector/Scope), let's write a callback in [useScope.tsx](/en/recipes/nextjs/integrate) under our _useScope_:

```js
...

export const getCurrentScope = () => scope;

...
```

Now we need to save the current [scope](/en/api/effector/Scope) somewhere.

```js
import { createEvent, createStore, sample, Scope } from 'effector';

const getCurrentScopeEv = createEvent<Scope>();
const $currentScope = createStore<Scope | null>(null);

sample({
    clock: getCurrentScopeEv,
    target: $currentScope,
});
```

And on our page we take our [scope](/en/api/effector/Scope):

```js
import { useEvent } from 'effector-react/scope';

    ...

    const getScope = useEvent(getCurrentScopeEv);

    useEffect(() => {
        const scope = getCurrentScope();

        getScope(scope);
    }, [getScope]);

    ...

```

Next, we need to create an effect, within which we will connect our [event](/en/api/effector/createEvent) and _service_.

```js
import { attach, scopeBind } from "effector";

const connectFx = attach({
  source: {
    service: $service,
    currentScope: $currentScope,
  },
  async effect({ service, currentScope }) {
    return await service.on("service_start", scopeBind(connectEv), { scope: currentScope });
  },
});
```

After calling our [effect](/en/api/effector/createEffect), the [event](/en/api/effector/createEvent) will be tied to the [scope](/en/api/effector/Scope) and will be able to take the current value from our _service_.
