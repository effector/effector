import { createEvent, createStore, sample } from "effector";
import { createFactory, invoke } from "@withease/factories";

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

const model = invoke(correct);
