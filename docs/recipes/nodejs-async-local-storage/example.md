---
id: nodejs-async-storage-example
title: Node.js AsyncLocalStorage example
sidebar_label: Node.js AsyncLocalStorage example
---

The following example is a Node.js counter that stores data to Redis.
It uses store, events and effects, which will be created from scratch and saved to AsyncLocalStorage for each HTTP request.


```typescript
import { attach, createEffect, createEvent, createStore } from 'effector';
import { diDep, diInit, diSet } from 'ts-fp-di';
import { diEffector } from 'ts-fp-di-effector';
import Koa from 'koa';
import Router from 'koa-router';
import Redis from 'ioredis';

const diEff = diEffector({
  onCreateEffect(sid, effect) {
    effect.watch((val) => {
      console.log(`Effect "${sid}" call with value: ${val}`);
    });
    effect.doneData.watch((val) => {
      console.log(`Effect "${sid}" done with value: ${val}`);
    });
    effect.failData.watch((val) => {
      console.log(`Effect "${sid}" fail with value: ${val}`);
    });
  },
  onCreateEvent(sid, event) {
    event.watch((val) => {
      console.log(`Event "${sid}" call with value: ${val}`);
    });
  },
  onCreateStore(sid, store) {
    store.watch((state, val) => {
      console.log(`Store "${sid}" mutation with value: ${val}`);
      console.log(`Store "${sid}" mutation, current state: ${state}`);
    });
  },
});

const increment = diEff('increment', () => createEvent());
const decrement = diEff('decrement', () => createEvent());
const reset = diEff('reset', () => createEvent());

const pullCounterFx = diEff('pullCounterFx', () =>
  createEffect<void, number>(async () => {
    const login = diDep('login');
    const count = await redis.get(`${login}:counter`);
    return Number(count ?? 0);
  })
);

const pushCounterFx = diEff('pushCounterFx', () =>
  attach({
    source: $counter(),
    effect: createEffect<number, number>(async (count) => {
      const login = diDep('login');
      await redis.set(`${login}:counter`, count);
      return count;
    }),
  })
);

const $counter = diEff('$counter', () =>
  createStore(0)
    .on(increment(), (state) => state + 1)
    .on(decrement(), (state) => state - 1)
    .on(pullCounterFx().doneData, (_, value) => value)
    .reset(reset())
);

const app = new Koa();
const router = new Router();
const redis = new Redis();

app.use(async (_, next) => {
  await diInit(async () => {
    diSet('login', 'xxx');
    await next();
  });
});

router.post('/increment', async (ctx) => {
  $counter();
  await pullCounterFx()();
  increment()();
  ctx.body = await pushCounterFx()();
});

router.post('/decrement', async (ctx) => {
  $counter();
  await pullCounterFx()();
  decrement()();
  ctx.body = await pushCounterFx()();
});

router.post('/reset', async (ctx) => {
  $counter();
  await pullCounterFx()();
  reset()();
  ctx.body = await pushCounterFx()();
});

app.use(router.routes());

app.listen(4000);
```
