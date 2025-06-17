import {createEvent, createStore, sample, createEffect, attach} from 'effector'
import {createFactory, invoke} from '@withease/factories';

function incorrect() {
  const $si = createStore(0);
  const ei = createEvent();
  const iFx = createEffect(() => {});

  return { $si, ei, iFx };
}

const incorrectArrow = () => createStore(0);

const correct = createFactory(() => {
  const $si = createStore(0);
  const ei = createEvent();
  const iFx = createEffect(() => {});

  return { $si, ei, iFx };
});

const fx = createEffect(() => {});
const attachedFx = attach({ effect: fx });

const $count = createStore(0)
const increment = createEvent()
const decrement = createEvent()

export const exportedConst = createStore('');
export let exportedLet = createStore('');

const model = invoke(correct);
const incorrectModel = incorrect();
const incorrectArrowModel = incorrectArrow();

$count.on(increment, (count) => count + 1);
$count.watch(console.log);

const $store = sample({ clock: $count });

if (true) {
  sample({
    clock: increment,
    source: $count,
    fn: (count) => count + 1,
    target: $count,
  })
}

sample({
  clock: decrement,
  source: $count,
  fn: (count) => count - 1,
  target: $count,
})

sample({
  clock: decrement,
  target: increment.prepend(() => -1),
})

class Class {
  event = createEvent()
}

export default createEvent();