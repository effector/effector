---
title: React Counter
redirectFrom:
  - /docs/recipes/react/counter
  - /recipes/react/counter
---

```js
import React from "react";
import ReactDOM from "react-dom";
import { createEvent, createStore, combine } from "effector";
import { useUnit } from "effector-react";

const plus = createEvent();

const $counter = createStore(1);

const $counterText = $counter.map((count) => `current value = ${count}`);
const $counterCombined = combine({ counter: $counter, text: $counterText });

$counter.on(plus, (count) => count + 1);

function App() {
  const counter = useUnit($counter);
  const counterText = useUnit($counterText);
  const counterCombined = useUnit($counterCombined);

  return (
    <div>
      <button onClick={plus}>Plus</button>
      <div>counter: {counter}</div>
      <div>counterText: ${counterText}</div>
      <div>
        counterCombined: {counterCombined.counter}, {counterCombined.text}
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
```

[Try it](https://share.effector.dev/2n8Bh4CZ)
