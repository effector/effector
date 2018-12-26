# bs-effector

[ReasonML](https://reasonml.github.io/) bindings for [effector](https://github.com/zerobias/effector).

## Installation

```sh
npm install --save bs-effector
```

Then add bs-effector to bs-dependencies in your `bsconfig.json`:

```json
{
  "bs-dependencies": ["bs-effector"]
}
```

## Usage

```reason
open Effector;

let counter = Store.make(0);
let increment: Event.t(unit) = Event.make("increment");
let decrement: Event.t(unit) = Event.make("decrement");

Store.(
  counter
  |> on(increment, (state, payload) => state + 1)
  |> on(decrement, (state, payload) => state - 1)
);

let text = Store.make("hello world");

let d = Store.(counter |> map(v => "test"));

counter |> Store.watch(state => Js.log(state));

increment |> Event.watch(state => {
  Js.log({j|event $state|j});
});
```