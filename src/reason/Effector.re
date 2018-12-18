module Domain = {
  type t('e) = 'e => 'e;

  [@bs.module "effector"]
  external make: string => t('e) = "createDomain";
};

module Effect = {
  type t('e) = 'e => 'e;

  [@bs.module "effector"]
  external make: string => t('e) = "createEffect";
};

module Event = {
  type t('e) = 'e => 'e;

  [@bs.module "effector"]
  external make: string => t('e) = "createEvent";

  [@bs.send]
  external _watch: (t('p), 'p => unit) => unit = "watch";

  let watch: ('p => unit, t('p)) => unit = (f, store) => _watch(store, f);
};

module Store = {
  type t('a) = {
    .
    "kind": int,
    "defaultState": 'a,
    [@bs.meth] "getState": unit => 'a,
  };

  type subscription = unit => unit;

  [@bs.module "effector"]
  external make: 'state => t('state) = "createStore";
  [@bs.module "effector"]
  external makeObject: 'a => t('b) = "createStoreObject";

  [@bs.send]
  external _map: (t('a), 'a => 'b) => t('b) = "map";

  [@bs.send]
  external _on: (t('state), Event.t('e), ('state, 'e) => 'state) => t('state) = "on";

  [@bs.send]
  external _watch: (t('state), 'state => unit) => subscription = "watch";

  let on: (Event.t('e), ('state, 'e) => 'state, t('state)) => t('state) = (event, f, store) => _on(store, event, f);
  let map: ('a => 'b, t('a)) => t('b) = (f, store) => _map(store, f);
  let watch: ('state => unit, t('state)) => subscription = (f, store) => _watch(store, f);
};