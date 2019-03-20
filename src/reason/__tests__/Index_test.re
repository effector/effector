open Jest;

open Effector;

describe("#createEvent", () =>
  test("some behavior", () => {
    open Expect;

    let counter = Store.make(0);
    let increment: Event.t(unit) = Event.make("increment");
    let decrement: Event.t(unit) = Event.make("decrement");

    Store.(
      counter
      |> on(increment, (state, payload) => state + 1)
      |> on(decrement, (state, payload) => state - 1)
      |> ignore
    );

    let text = Store.make("hello world");

    let d = Store.(counter |> map(v => "test"));

    expect(Store.(counter |> getState)) |> toMatchSnapshot;
  })
);