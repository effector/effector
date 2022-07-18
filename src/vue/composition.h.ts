import {Domain, Event, Store} from 'effector'

type Gate<Props = void> = {
  open: Event<Props>;
  close: Event<Props>;
  status: Store<boolean>;
  state: Store<Props>;
  set: Event<Props>;
};

type GateConfig<T> = {
  name?: string;
  defaultState?: T;
  domain?: Domain;
};

export {
  Gate,
  GateConfig,
}
