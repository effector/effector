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
type ctx = {
  [@bs.as "type"]
  type_: int,
  data: Js.Json.t,
  time,
};

let ctxByType = (c: ctxType) =>
  (. data: Js.Json.t) => ctx(~type_=ctxT(c), ~data, ~time=now());

let compute = ctxByType(ComputeType);

let run = ctxByType(RunType);

let emit = ctxByType(EmitType);

let filter = ctxByType(FilterType);

let update = ctxByType(UpdateType);