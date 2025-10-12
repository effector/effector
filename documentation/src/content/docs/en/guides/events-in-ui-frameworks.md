---
title: Handle events in UI-frameworks
description: How to react on events in UI-frameworks in effector model
---

# Handle events in UI-frameworks (#events-in-ui-frameworks)

Sometimes you need to do something on UI-framework layer when an [event](/en/api/effector/Event) is fired on effector layer. For example, you may want to show a notification when a request for data is failed. In this article, we will look into a way to do it.

## The problem (#the-problem)

:::tip{title="UI-framework"}
In this article, we will use [React](https://reactjs.org/) as an example of a UI-framework. However, the same principles can be applied to any other UI-framework.
:::

Let us imagine that we have an application uses [Ant Design](https://ant.design/) and its [notification system](https://ant.design/components/notification). It is pretty straightforward to show a notification on UI-layer

```tsx
import { notification } from "antd";

function App() {
  const [api, contextHolder] = notification.useNotification();

  const showNotification = () => {
    api.info({
      message: "Hello, React",
      description: "Notification from UI-layer",
    });
  };

  return (
    <>
      {contextHolder}
      <button onClick={showNotification}>Show notification</button>
    </>
  );
}
```

But what if we want to show a notification when a request for data is failed? The whole data-flow of the application should not be exposed to the UI-layer. So, we need to find a way to handle [events](/en/api/effector/Event) on UI-layer without exposing the whole data-flow.

Let us say that we have an [event](/en/api/effector/Event) responsible for data loading failure:

```ts
// model.ts
import { createEvent } from "effector";

const dataLoadingFailed = createEvent<{ reason: string }>();
```

Our application calls it every time when a request for data is failed, and we need to listen to it on UI-layer.

## The solution (#the-solution)

We need to bound `dataLoadingFailed` and `notification.useNotification` somehow.

Let us take a look on a ideal solution and a couple of not-so-good solutions.

### Save `notification` instance to a store (#ideal-solution)

The best way is saving `notification` API-instance to a [store](/en/api/effector/Store) and using it thru [effect](/en/api/effector/Effect). Let us create a couple new units to do it.

```ts
// notifications.ts
import { createEvent, createStore, sample } from "effector";

// We will use instance from this Store in the application
const $notificationApi = createStore(null);

// It has to be called every time when a new instance of notification API is created
export const notificationApiChanged = createEvent();

// Save new instance to the Store
sample({
  clock: notificationApiChanged,
  target: $notificationApi,
});
```

Now we have to call `notificationApiChanged` to save `notification` API-instance to [store](/en/api/effector/Store) `$notificationApi`.

```tsx {8-15}
import { notification } from "antd";
import { useEffect } from "react";
import { useUnit } from "effector-react";

import { notificationApiChanged } from "./notifications";

function App() {
  // use useUnit to respect Fork API rules
  const onNewApiInstance = useUnit(notificationApiChanged);
  const [api, contextHolder] = notification.useNotification();

  // call onNewApiInstance on every change of api
  useEffect(() => {
    onNewApiInstance(api);
  }, [api]);

  return (
    <>
      {contextHolder}
      {/* ...the rest of the application */}
    </>
  );
}
```

After that, we have a valid [store](/en/api/effector/Store) `$notificationApi` with `notification` API-instance. We can use it in any place of the application. Let us create a couple [effects](/en/api/effector/Effect) to work with it comfortably.

```ts
// notifications.ts
import { attach } from "effector";

// ...

export const showWarningFx = attach({
  source: $notificationApi,
  effect(api, { message, description }) {
    if (!api) {
      throw new Error("Notification API is not ready");
    }

    api.warning({ message, description });
  },
});
```

:::tip{title="about attach"}
[`attach`](/en/api/effector/attach) is a function that allows to bind specific [store](/en/api/effector/Store) to an [effect](/en/api/effector/Effect). It means that we can use `notificationApi` in `showWarningFx` without passing it as a parameter.
:::

[Effect](/en/api/effector/Effect) `showWarningFx` can be used in any place of the application without any additional hustle.

```ts {8-13}
// model.ts
import { createEvent, sample } from "effector";

import { showWarningFx } from "./notifications";

const dataLoadingFailed = createEvent<{ reason: string }>();

// Show warning when dataLoadingFailed is happened
sample({
  clock: dataLoadingFailed,
  fn: ({ reason }) => ({ message: reason }),
  target: showWarningFx,
});
```

Now we have a valid solution to handle [events](/en/api/effector/Event) on UI-layer without exposing the whole data-flow. This approach you can use for any UI API, even put a router in the framework and manage it from the data model.

However, if you want to know why other (maybe more obvious) solutions are not so good, you can read about them below.

### Bad solution №1 (#bad-solution)

Bad solution number one is using global instance of `notification`.
Ant Design allows using global notification instance.

```ts {7-17}
// model.ts
import { createEvent, createEffect, sample } from "effector";
import { notification } from "antd";

const dataLoadingFailed = createEvent<{ reason: string }>();

// Create an Effect to show a notification
const showWarningFx = createEffect((params: { message: string }) => {
  notification.warning(params);
});

// Execute it when dataLoadingFailed is happened
sample({
  clock: dataLoadingFailed,
  fn: ({ reason }) => ({ message: reason }),
  target: showWarningFx,
});
```

In this solution it is not possible to use any Ant's settings from React Context, because it does not have access to the React at all. It means that notifications will not be styled properly and could look different from the rest of the application.

**So, this is not a solution.**

### Bad solution №2 (#bad-solution-2)

Bad solution number two is using `.watch` method of an [event](/en/api/effector/Event) in a component.
It is possible to call `.watch` method of an [event](/en/api/effector/Event) in a component.

```tsx {9-17}
import { useEffect } from "react";
import { notification } from "antd";

import { dataLoadingFailed } from "./model";

function App() {
  const [api, contextHolder] = notification.useNotification();

  useEffect(
    () =>
      dataLoadingFailed.watch(({ reason }) => {
        api.warning({
          message: reason,
        });
      }),
    [api],
  );

  return (
    <>
      {contextHolder}
      {/* ...the rest of the application */}
    </>
  );
}
```

In this solution we do not respect [rules for scope](/en/advanced/work-with-scope#scope-rules), it means that we could have memory leaks, problems with test environments and Storybook-like tools.

**So, this is not a solution.**

## Related APIs and Articles (#related-api-and-docs)

- **API**

  - [`Scope`](/en/api/effector/Scope) – Description of scope and its methods
  - [`Event`](/en/api/effector/Event) – Description of event and its methods
  - [`Store`](/en/api/effector/Store) – Description of store and its methods

- **Articles**

  - [Why you need explicit app start event](/en/resources/explicit-start)
  - [Isolated scopes](/en/advanced/work-with-scope)
  - [Testing guide](/en/guides/testing)
