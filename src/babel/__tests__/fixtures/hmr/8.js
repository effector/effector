import { createFactory } from "@withease/factories";
import { createEvent, createStore, sample } from "effector";

const $rcount = createStore(0);
const rincrement = createEvent();
const rdecrement = createEvent();

sample({
  clock: rincrement,
  source: $rcount,
  fn: (count) => count + 1,
  target: $rcount,
});

sample({
  clock: rdecrement,
  source: $rcount,
  fn: (count) => count - 1,
  target: $rcount,
});

const correct = createFactory(() => {
  const $count = createStore(0);
  const increment = createEvent();
  const decrement = createEvent();

  sample({
    clock: increment,
    source: $count,
    fn: (count) => count + 1,
    target: $count,
  });

  sample({
    clock: decrement,
    source: $count,
    fn: (count) => count - 1,
    target: $count,
  });
});
