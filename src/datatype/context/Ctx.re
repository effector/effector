type ctxType =
  | ComputeType
  | EmitType
  | RunType
  | FilterType
  | UpdateType;

let ctxT =
  fun
  | ComputeType => 21
  | EmitType => 22
  | RunType => 23
  | FilterType => 24
  | UpdateType => 25;

type time;

/* type date; abstract type for a document object */
[@bs.scope "Date"] [@bs.val] external now : unit => time = "now";

[@bs.deriving abstract]
type ctx('a) = {
  [@bs.as "type"]
  type_: int,
  data: 'a,
  time,
};

[@bs.deriving abstract]
type computeData = {
  args: array(Js.Json.t),
  result: Js.Json.t,
  error: Js.Json.t,
  isError: bool,
  isNone: bool,
  isChanged: bool,
};

let compute =
  (.
    args: array(Js.Json.t),
    result: Js.Json.t,
    error: Js.Json.t,
    isError: bool,
    isNone: bool,
    isChanged: bool,
  ) => {
    let data =
      computeData(~args, ~result, ~error, ~isError, ~isNone, ~isChanged);
    ctx(~type_=ctxT(ComputeType), ~time=now(), ~data);
  };

[@bs.deriving abstract]
type runData = {
  args: array(Js.Json.t),
  parentContext: ctx(Js.Json.t) /* compute | emit | filter | update */
};

let run =
  (. args: array(Js.Json.t), parentContext: ctx(Js.Json.t)) => {
    let data = runData(~args, ~parentContext);
    ctx(~type_=ctxT(RunType), ~time=now(), ~data);
  };

[@bs.deriving abstract]
type emitData = {
  eventName: string,
  payload: Js.Json.t,
};

let emit =
  (. eventName: string, payload: Js.Json.t) => {
    let data = emitData(~payload, ~eventName);
    ctx(~type_=ctxT(EmitType), ~time=now(), ~data);
  };

[@bs.deriving abstract]
type filterData = {
  value: Js.Json.t,
  isChanged: bool,
};

let filter =
  (. value: Js.Json.t, isChanged: bool) => {
    let data = filterData(~value, ~isChanged);
    ctx(~type_=ctxT(FilterType), ~time=now(), ~data);
  };

[@bs.deriving abstract]
type updateData = {value: Js.Json.t};

let update =
  (. value: Js.Json.t) => {
    let data = updateData(~value);
    ctx(~type_=ctxT(UpdateType), ~time=now(), ~data);
  };