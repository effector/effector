import { createStore, createEvent } from "effector";

// Events describe what happened
const incremented = createEvent();
const decremented = createEvent();

// The store reacts to events — no dispatch, no reducers, no selectors
const $count = createStore(0)
  .on(incremented, (count) => count + 1)
  .on(decremented, (count) => count - 1);

$count.watch((count) => {
  document.getElementById("count").textContent = count;
});

document.getElementById("increment").addEventListener("click", () => incremented());
document.getElementById("decrement").addEventListener("click", () => decremented());
