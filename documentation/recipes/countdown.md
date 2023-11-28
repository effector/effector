---
id: countdown
title: Countdown timer on setTimeout
sidebar_label: Countdown timer
---

Sometimes we need simple countdown. Next example allows us to handle each tick and abort the timer.

[Link to a playground](https://share.effector.dev/DIQP8UbH)

Task:

1. Execute tick every `timeout` milliseconds
2. Each tick should send left seconds to listeners
3. Countdown can be stopped (`abort` argument)
4. Countdown can't be started if already started

```js
function createCountdown(
  name,
  {start, abort = createEvent(`${name}Reset`), timeout = 1000},
) {
  // tick every 1 second
  const $working = createStore(true, {name: `${name}Working`})
  const tick = createEvent(`${name}Tick`)
  const timerFx = createEffect(`${name}Timer`).use(() => wait(timeout))

  $working.on(abort, () => false).on(start, () => true)

  guard({
    source: start,
    filter: timerFx.pending.map(is => !is),
    target: tick,
  })

  forward({
    from: tick,
    to: timerFx,
  })

  const willTick = guard({
    source: timerFx.done.map(({params}) => params - 1),
    filter: seconds => seconds >= 0,
  })

  guard({
    source: willTick,
    filter: $working,
    target: tick,
  })

  return {tick}
}

function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
```

Usage:

```js
const startCountdown = createEvent()
const abortCountdown = createEvent()

const countdown = createCountdown('simple', {
  start: startCountdown,
  abort: abortCountdown,
})

// handle each tick
countdown.tick.watch(remainSeconds => {
  console.info('Tick. Remain seconds: ', remainSeconds)
})

// let's start
startCountdown(15) // 15 ticks to count down, 1 tick per second

// abort after 5 second
setTimeout(abortCountdown, 5000)
```
