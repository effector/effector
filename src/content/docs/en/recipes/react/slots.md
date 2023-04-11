---
title: Slots
redirectFrom:
  - /docs/recipes/react/slots
  - /recipes/react/slots
---

A slot is a place in a component where you can insert any unknown component. It's a well-known abstraction used by frameworks
such as Vue.js and Svelte.

Slots aren't present in the React. With React, you can achieve this goal using props or `React.Context`.
In large projects, this is not convenient, because it generates "props hell" or smears the logic.

Using React with effector, we can achieve slot goals without the problems described above.

- [Slots proposal](https://github.com/WICG/webcomponents/blob/gh-pages/proposals/Slots-Proposal)
- [Vue.js docs](https://v3.vuejs.org/guide/component-slots.html)
- [Svelte docs](https://svelte.dev/docs#slot)
- [@space307/effector-react-slots](https://github.com/space307/effector-react-slots)

[Open ReplIt](https://replit.com/@binjospookie/effector-react-slots-example)

```tsx
import { createApi, createStore, createEvent, sample, split } from "effector";
import { useStoreMap } from "effector-react";
import React from "react";

import type { ReactElement, PropsWithChildren } from "react";

type Component<S> = (props: PropsWithChildren<S>) => ReactElement | null;
type Store<S> = {
  readonly component: Component<S>;
};

function createSlotFactory<Id>({ slots }: { readonly slots: Record<string, Id> }) {
  const api = {
    remove: createEvent<{ readonly id: Id }>(),
    set: createEvent<{ readonly id: Id; readonly component: Component<any> }>(),
  };

  function createSlot<P>({ id }: { readonly id: Id }) {
    const defaultToStore: Store<P> = {
      component: () => null,
    };
    const $slot = createStore<Store<P>>(defaultToStore);
    const slotApi = createApi($slot, {
      remove: (state) => ({ ...state, component: defaultToStore.component }),
      set: (state, payload: Component<P>) => ({ ...state, component: payload }),
    });
    const isSlotEventCalling = (payload: { readonly id: Id }) => payload.id === id;

    sample({
      clock: api.remove,
      filter: isSlotEventCalling,
      target: slotApi.remove,
    });

    sample({
      clock: api.set,
      filter: isSlotEventCalling,
      fn: ({ component }) => component,
      target: slotApi.set,
    });

    function Slot(props: P = {} as P) {
      const Component = useStoreMap({
        store: $slot,
        fn: ({ component }) => component,
        keys: [],
      });

      return <Component {...props} />;
    }

    return {
      $slot,
    };
  }

  return {
    api,
    createSlot,
  };
}

const SLOTS = { FOO: "foo" } as const;

const { api, createSlot } = createSlotFactory({ slots: SLOTS });

const { Slot: FooSlot } = createSlot({ id: SLOTS.FOO });

const ComponentWithSlot = () => (
  <>
    <h1>Hello, Slots!</h1>
    <FooSlot />
  </>
);

const updateFeatures = createEvent<string>("");
const $featureToggle = createStore<string>("");

const MyAwesomeFeature = () => <p>Look at my horse</p>;
const VeryAwesomeFeature = () => <p>My horse is amaizing</p>;

$featureToggle.on(updateFeatures, (_, feature) => feature);

split({
  source: $featureToggle,
  match: {
    awesome: (data) => data === "awesome",
    veryAwesome: (data) => data === "veryAwesome",
    hideAll: (data) => data === "hideAll",
  },
  cases: {
    awesome: api.set.prepend(() => ({
      id: SLOTS.FOO,
      component: MyAwesomeFeature,
    })),
    veryAwesome: api.set.prepend(() => ({
      id: SLOTS.FOO,
      component: VeryAwesomeFeature,
    })),
    hideAll: api.remove.prepend(() => ({ id: SLOTS.FOO })),
  },
});

// updateFeatures('awesome'); // render MyAwesomeFeature in slot
// updateFeatures('veryAwesome'); // render VeryAwesomeFeature in slot
// updateFeatures('hideAll'); // render nothing in slot
```
