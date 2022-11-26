---
id: countdown
title: Таймер обратного отсчета на setTimeout
sidebar_label: Таймер обратного отсчета
---

Иногда нам нужен простой обратный отсчет. Следующий пример позволяет нам обрабатывать каждый тик и прерывать таймер.

[Ссылка на песочницу](https://share.effector.dev/DIQP8UbH)

Задача:

1. Выполнять тик каждые `timeout` миллисекунд
2. Каждый тик должен отправлять оставшиеся секунды слушателям
3. Обратный отсчет может быть остановлен (аргумент `abort`)
4. Обратный отсчет не может быть запущен, если он уже запущен

```js
function createCountdown(
  name,
  {start, abort = createEvent(`${name}Reset`), timeout = 1000},
) {
  // Запускаться каждые 1 секунду
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

Использование:

```js
const startCountdown = createEvent()
const abortCountdown = createEvent()

const countdown = createCountdown('simple', {
  start: startCountdown,
  abort: abortCountdown,
})

// обработка каждого тика
countdown.tick.watch(remainSeconds => {
  console.info('Tick. Remain seconds: ', remainSeconds)
})

// старт
startCountdown(15) // 15 тиков для обратного отсчета, 1 тик в секунду

// прерывание через 5 секунд
setTimeout(abortCountdown, 5000)
```
