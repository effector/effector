---
title: Integrate with Next.js router
redirectFrom:
  - /recipes/nextjs/router
---

:::tip
There is the official Next.js bindings package - [`@effector/next`](https://github.com/effector/next). Follow its documentation to find out, how to integrate Next.js with effector.
:::


This is a simplified example of integration with the Next.js router.
We create a similar model for storing the router instance:

```js
import { attach, createEvent, createStore, sample } from 'effector';
import { NextRouter } from 'next/router';

const attachRouterEv = createEvent<NextRouter | null>();
const $router = createStore<NextRouter | null>(null);

$router.on(attachRouterEv, (_, router) => router);

const goToRouteEv = createEvent<string>();

const goToRouteFx = attach({
    source: $router,
    effect: (router, param) => {
        return router && router.asPath !== param && router.push(param);
    },
});

sample({
    clock: goToRouteEv,
    target: goToRouteFx,
});

export { $router, attachRouterEv, goToRouteFx };

```

We take the router instance from \__app.tsx_:

```js
import { useUnit } from 'effector-react';
import { useRouter } from 'next/router';

    ...

    const router = useRouter();
    const attachRouter = useEvent(attachRouterEv);

    useEffect(() => {
        attachRouter(router);
    }, [router, attachRouter]);

    ...

```

And we use it in our models:

```js
import { sample } from 'effector';

    ...

sample({
    clock: redirectEv,
    fn: () => '/home',
    target: goToRouteFx,
});

```
