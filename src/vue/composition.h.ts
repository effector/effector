import {Domain, Event, Store} from 'effector'

type Gate<Props> = {
  open: Event<Props | void>;
  close: Event<Props | void>;
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
