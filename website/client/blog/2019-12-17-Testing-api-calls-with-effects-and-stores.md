---
slug: testing-api-calls-with-effects-and-stores
title: Testing api calls with effects and stores
author: Zero Bias
author_title: Effector Core Team
authorURL: https://github.com/zerobias
author_image_url: https://avatars1.githubusercontent.com/u/15912112?v=4
tags: [effector, testing, jest]
---

This article is about how to test effects and stores with api calls

<!--truncate-->

Effects in effector allows users to change their implementation (handler) via use calls, which would be used to mocking them in tests.
In this example we'll use jest for tests. At first, I'll show full implementation of module with tests and then will describe it line-by-line.


```js
import {createEvent} from 'effector'
import {apiRequestFX, lastResults} from '../app'

let currentHandler

beforeEach(() => {
  currentHandler = apiRequestFX.use.getCurrent()
})

afterEach(() => {
 apiRequestFX.use(currentHandler)
})

const resetResults = createEvent()

beforeAll(() => {
  lastResults.reset(resetResults)
})

afterAll(() => {
  lastResults.off(resetResults)
})

test('api requests will be added to the end of lastResults list', async() => {
  resetResults()
  apiRequestFX.use(() => 'api response')
  await apiRequestFX()
  expect(lastResults.getState()).toEqual(['api response'])
  apiRequestFX.use(() => 'last update')
  await apiRequestFX()
  expect(lastResults.getState()).toEqual(['api response', 'last update'])
})
```

## Setup

At first, we importing apiRequestFX effect and lastResults from our application code.
Assume that lastResults is a store with array of results of apiRequestFX and its default state is empty array.

```js
import {apiRequestFX, lastResults} from '../app'
```

Then we defining setup code, which will save current handler before each test run and restore it later.

[use.getCurrent in docs](https://effector.dev/docs/api/effector/effect/#usegetcurrent)

```js
let currentHandler

beforeEach(() => {
   currentHandler = apiRequestFX.use.getCurrent()
})

afterEach(() => {
  apiRequestFX.use(currentHandler)
})
```

After that we defining additional event to reset state of lastResults store and remove it during teardown after all tests in that module

```js
import {createEvent} from 'effector'

const resetResults = createEvent()

beforeAll(() => {
 lastResults.reset(resetResults)
})

afterAll(() => {
 lastResults.off(resetResults)
})
```

And finally, defining our tests

## Tests

```js
test('api requests will be added to the end of lastResults list', async() => {
  resetResults()
  apiRequestFX.use(() => 'api response')
  await apiRequestFX()
  expect(lastResults.getState()).toEqual(['api response'])
  apiRequestFX.use(() => 'last update')
  await apiRequestFX()
  expect(lastResults.getState()).toEqual(['api response', 'last update'])
})
```

Here, at first we call resetResults to be sure that we'll work with empty array.

```js
resetResults()
```

Then we defining handler for next call, so that function will be used during apiRequestFX invocation.

```js
apiRequestFX.use(() => 'api response')
```

As effect is just an async function, we're going to call it directly and check that state of given store is matched our expectations.

```js
await apiRequestFX()
expect(lastResults.getState()).toEqual(['api response'])
```

Then we changing the handler again and checking that new item is going to appear at the end of the list.
Although in application code you usually will not  use getState(), but in testing it is pretty useful method, allowed us to validate changes in stores directly

```js
apiRequestFX.use(() => 'last update')
await apiRequestFX()
expect(lastResults.getState()).toEqual(['api response', 'last update'])
```

So, in this article we implemented tests, which allowed us to be sure that lastResults store will correctly updated after api requests.

Thanks for reading!
