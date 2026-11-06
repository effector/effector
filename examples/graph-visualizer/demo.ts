import {createEvent, createStore, createEffect, sample, combine} from 'effector'
import {captureGraph} from './graph'
import {mountGraph} from './view'

const capture = captureGraph()
const increment = createEvent({name: 'increment'})
const reset = createEvent({name: 'reset'})
const count = createStore(0, {name: '$count'})
  .on(increment, n => n + 1)
  .reset(reset)
const doubled = count.map(n => n * 2)
const summary = combine({count, doubled})
const save = createEffect({
  name: 'save',
  handler: async (value: number) => value,
})
sample({source: count, clock: increment, target: save})
const viewer = mountGraph(document.getElementById('graph')!, capture)
const state = document.getElementById('state')!
summary.watch(value => {
  state.textContent = `Count: ${value.count} · Doubled: ${value.doubled}`
})
document.getElementById('increment')!.addEventListener('click', () => {
  increment()
  viewer.refresh()
})
document.getElementById('reset')!.addEventListener('click', () => {
  reset()
  viewer.refresh()
})
document.getElementById('more')!.addEventListener('click', () => {
  for (let i = 0; i < 300; i++)
    createStore(i, {name: `$extra-${i}`}).on(increment, n => n + 1)
  viewer.refresh()
})
document.getElementById('dispose')!.addEventListener('click', () => {
  viewer.dispose()
  capture.dispose()
})
