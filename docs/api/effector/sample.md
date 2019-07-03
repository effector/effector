---
id: sample
title: sample
hide_title: true
---

# `sample(sourceStore, clockEvent, fn)`
Overall this method can be used in order to link two nodes, resulting the third one, which will fire only upon `clock` node trigger.  
_Note: [_`Unit`_](Unit.md) chapter may come in handy, to be aware of way of using this method._

Passes current `sourceStore`'s state and `clockEvent`'s value to `fn` handler. Quite a common case when you need to handle some event with some store's state. Instead of using `store.getState()`, in body of effect, which may cause race conditions and inconsistency of state at the moment of effect thunk invocation.

Returned Unit may be observed (via `watch`), since it's valid graph node.

#### Arguments

1. `sourceStore` _(Store)_: Source event
2. `clockEvent` _(Event)_: Clock(Trigger) event
3. `fn`? _(Function)_: Callable handler, should be **pure**. Since, this handler is supposed to organize data flow, you should avoid declaring side-effects here. It's more appropriate to place it in `watch` method for sampled node;

#### Returns

([_`Event`_](Event.md)) - Event, which fires upon clock is triggered

#### Example 1

```javascript
const store = createStore('foo');
const event = createEvent();

const sampled = sample(store, event);
sampled.watch(console.log); // Use this watcher for side-effects

event() // => hello zerobias
```
[try it](https://share.effector.dev/yQQ3y1rR)

#### Example 2

```javascript
const login = createStore('peter');

const sendMessage = createEvent();
const fullMessage = sample(login, sendMessage, (login, text) => ({login, text}));

fullMessage.watch(({login, text}) => { // Use this watcher for side-effects
  console.log(`[${login}]: ${text}`);
})
sendMessage('hello'); // => [peter]: hello
sendMessage('how r u?'); // => [peter]: how r u?

```
[try it](https://share.effector.dev/H8v43HFg)


# `sample(sourceEvent, clockEvent, fn)`

Passes last `sourceEvent` invocation argument value and `clockEvent` value to `fn` handler.

#### Arguments

1. `sourceEvent` _(Event)_: Source event
2. `clockEvent` _(Event)_: Clock(Trigger) event
3. `fn`? _(Function)_: Callable handler, should be **pure**

#### Returns

([_`Event`_](Event.md)) - Event, which fires upon clock is triggered

#### Example

```js
const event1 = createEvent();
const event2 = createEvent();

const sampled = sample(event1, event2, (a, b) => `${a} ${b}`);
sampled.watch(console.log);

event1("Hello");
event2("World"); // => Hello World
event2("effector!"); // => Hello effector!

sampled("Can be invoked too!"); // => Can be invoked too!
```
[try it](https://share.effector.dev/DiJmvmbo)

# `sample(event, store, fn)`

Passes last `event` invocation argument value and `store`'s updated state to `fn` handler.

#### Arguments

1. `event` _(Event)_: Source event
2. `store` _(Store)_: Triggers sampled unit upon store update
3. `fn`? _(Function)_: Callable handler, should be **pure**

#### Returns

([_`Event`_](Event.md)) - Event, which fires upon clock is triggered

#### Example

```js
const event = createEvent();
const inc = createEvent();
const count = createStore(0)
  .on(inc, (state) => state + 1);

const sampled = sample(event, count, (c, i) => `Current count is ${i}, last event invocation: ${c}`);
sampled.watch(console.log);

inc() // => nothing

event("foo");
inc() // => Current count is 2, last event invocation: foo 

event("bar");
inc(); // => Current count is 3, last event invocation: bar 
```
[try it](https://share.effector.dev/nlqvcb0f)

# `sample(sourceStore, clockStore, fn)`

Passes last `sourceStore`'s current state and `clockStore`'s updated state to `fn` handler, upon `clockStore`'s update.

#### Arguments

1. `sourceStore` _(Store)_: Source store
2. `clockStore` _(Store)_: Triggers sampled unit upon store update
3. `fn`? _(Function)_: Callable handler, should be **pure**

#### Returns

([_`Store`_](Store.md)) - Store, which updates upon clock update

#### Example

```js
const inc = createEvent();
const setName = createEvent();

const name = createStore("John")
  .on(setName, (_, v) => v);

const clock = createStore(0)
  .on(inc, (i) => i + 1);

const sampled = sample(name, clock, (name, i) => `${name} has ${i} coins`);
sampled.watch(console.log);
 // => John has 0 coins (initial store update triggered sampled store)

setName("Doe");
inc(); // => Doe has 1 coins
```
[try it](https://share.effector.dev/vx6fdb21)

# `sample({source, clock, fn, greedy?})`

Object-like arguments passing, working exactly the same sa examples above.

`greedy` modifier defines, whether sampler will wait of  resolving calculation result, and will batch all updates, resulting only one trigger, either will be triggered upon every linked node invocation, e.g. if `greedy` is `true`, `sampler` will fire, upon trigger of every node, linked to clock, whereas `non-greedy sampler(greedy: false)` will fire upon the last linked node trigger.

#### Arguments

1. `params` _(Object)_: Configuration object

#### Returns

([_`Event`_](Event.md)|[_`Store`_](Store.md)) - Unit, which fires/updates upon `clock` is trigged

#### Example

```js
const lastEvent = createStore(null)
  .on(clickButton, (_, data) => data)
  .on(closeModal, () => 'modal')

lastEvent.updates.watch(data => {
  //here we need everything
  //console.log(`sending important analytics event: ${data}`)
})

lastEvent.updates.watch(data => {
  //here we need only final value
  //console.log(`render <div class="yourstatus">${data}</div>`)
})

const analyticReportsEnabled = createStore(false)

const commonSampling = sample({
  source: analyticReportsEnabled,
  clock: merge([clickButton, closeModal]),
  fn: (isEnabled, data) => ({isEnabled, data}),
})

const greedySampling = sample({
  source: analyticReportsEnabled,
  clock: merge([clickButton, closeModal]),
  fn: (isEnabled, data) => ({isEnabled, data}),
  greedy: true,
})

commonSampling.watch(data => console.log('non greedy update', data))
greedySampling.watch(data => console.log('greedy update', data))

clickButton('click A')
  // => greedy update {isEnabled: false, data: "click A"}
  // => greedy update {isEnabled: false, data: "close modal"}
  // => non greedy update {isEnabled: false, data: "click A"}

clickButton('click B')
  // => greedy update {isEnabled: false, data: "click B"}
  // => greedy update {isEnabled: false, data: "close modal"}
  // => non greedy update {isEnabled: false, data: "click B"}
```
[try it](https://share.effector.dev/fUNURePx)