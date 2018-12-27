# bs-effector-react

[ReasonML](https://reasonml.github.io/) bindings for [effector-react](https://github.com/zerobias/effector).

## Installation

```sh
npm install --save bs-effector-react
```

Then add bs-effector to bs-dependencies in your `bsconfig.json`:

```json
{
  "bs-dependencies": ["bs-effector-react"]
}
```

## Usage

```reason
open Effector;

let counter = Store.make(0);
let increment: Event.t(unit) = Event.make("increment");

counter
  |> Store.watch(state => Js.log(state));
counter
  |> Store.on(increment, (state, _) => state + 1);

let component = EffectorReact.createComponent(counter);

let make = (_children) => {
  ...component,
  render: self =>
    <div className="counter">
      (ReasonReact.stringToElement("counter: " ++ string_of_int(self.state)))
      <br />
      <button onClick=(_ => increment())>
        (ReasonReact.stringToElement("increment"))
      </button>
    </div>,
};
```
