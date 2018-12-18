open Effector;

module CreateComponent = {
  type t;

  type action =
    | UpdateState(t);

  let component = ReasonReact.reducerComponent("Component");

  let make = (store: Store.t('a)) => {
    ...component,
    initialState: () => {
      Js.log(store);
      store##defaultState;
    },
    didMount: self => {
      let callback = (state: 'a) => self.send(UpdateState(state));

      let unsubscribe = store |> Store.watch(callback);
      self.onUnmount(() => unsubscribe());
    },
    reducer: (action, _state) =>
      switch (action) {
      | UpdateState(state) => ReasonReact.Update(state)
      },
  };
};