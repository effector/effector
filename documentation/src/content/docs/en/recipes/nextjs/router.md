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
import { attach, createEvent, createStore, sample } from 'effector'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

const routerAttached = createEvent<AppRouterInstance>()
const navigationTriggered = createEvent<string>()

const $router = createStore<AppRouterInstance | null>(null).on(
  routerAttached,
  (_, router) => router,
)

const navigateFx = attach({
  source: $router,
  effect: (router, path) => {
    if (!router) return
    return router.push(path)
  },
})

sample({
  clock: navigationTriggered,
  target: navigateFx,
})

export { navigationTriggered, routerAttached }

```

We make provider:

```js
import { useUnit } from 'effector-react';
import { useRouter } from 'next/navigation'

export function EffectorRouterProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const attachRouter = useUnit(routerAttached)

  useEffect(() => {
    attachRouter(router)
  }, [router, attachRouter])

  return <>{children}</>
}
```

We use provider:

```js
import { EffectorRouterProvider } from '@/providers/effector-router-provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <EffectorRouterProvider>
          {children}
        </EffectorRouterProvider>
      </body>
    </html>
  );
}
```

And we use it in our models:

```js
import { sample } from 'effector';

    ...

sample({
    clock: getUserFx.done,
    fn: () => '/home',
    target: navigationTriggered,
});

```

or in components:

```js
'use client';

import { useUnit } from 'effector-react';
import { navigationTriggered } from '@/your-path-name';

    ...

export function goToSomeRouteNameButton() {
  const goToSomeRouteName = useUnit(navigationTriggered);

  return (
    <button onClick={() => goToSomeRouteName('/some-route-name')}>
      do it!
    </button>
  );
}


```
