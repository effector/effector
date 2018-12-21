open Effector;

type action('a) =
  | UpdateState('a);

let component = ReasonReact.reducerComponent("Component");

let createComponent = (store: Store.t('a)) => {
  ...component,
  initialState: () => store##defaultState,
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