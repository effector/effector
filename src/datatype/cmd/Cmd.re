/* include ReImpl; */
/* [@bs.deriving accessors] */
/* [@bs.deriving jsConverter] */
type cmdType =
  | ComputeType
  | EmitType
  | RunType
  | FilterType
  | UpdateType;

let cmdT =
  fun
  | ComputeType => 11
  | EmitType => 12
  | RunType => 13
  | FilterType => 14
  | UpdateType => 15;

[@bs.deriving abstract]
type cmd = {
  [@bs.as "type"]
  type_: int,
  data: Js.Json.t,
};

let cmdByType = (c: cmdType, data: Js.Json.t) : cmd => {
  let ins = cmd(~type_=cmdT(c), ~data);
  ins;
};

let compute = cmdByType(ComputeType);

let run = cmdByType(RunType);

let emit = cmdByType(EmitType);

let filter = cmdByType(FilterType);

let update = cmdByType(UpdateType);