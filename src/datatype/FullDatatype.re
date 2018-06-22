module Cmd /*: {    type cmd;    let compute: Js.Json.t => cmd;    let run: Js.Json.t => cmd;    let emit: Js.Json.t => cmd;    let filter: Js.Json.t => cmd;    let update: Js.Json.t => cmd;    let show: cmd => string;  }*/ = {
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
  let cmdUnTF =
    fun
    | 11 => ComputeType
    | 12 => EmitType
    | 13 => RunType
    | 14 => FilterType
    | 15 => UpdateType
    | _ => ComputeType;
  [@bs.deriving abstract]
  type cmd = {
    [@bs.as "type"]
    type_: int,
    data: Js.Json.t,
  };
  let cmdUnT = cmd => cmdUnTF(cmd |. type_);
  let cmdByType = (c: cmdType, data: Js.Json.t) : cmd => {
    let ins = cmd(~type_=cmdT(c), ~data);
    ins;
  };
  let compute = cmdByType(ComputeType);
  let run = cmdByType(RunType);
  let emit = cmdByType(EmitType);
  let filter = cmdByType(FilterType);
  let update = cmdByType(UpdateType);
  let show: cmd => string =
    cmd =>
      switch (cmd |. type_) {
      | 11 => "Compute"
      | 12 => "Emit(" ++ [%raw "cmd.data.fullName"] ++ ")"
      | 13 => "Run"
      | 14 => "Filter"
      | 15 => "Update"
      | _ => ""
      };
};

let cmd = {
  "compute": Cmd.compute,
  "run": Cmd.run,
  "emit": Cmd.emit,
  "filter": Cmd.filter,
  "update": Cmd.update,
  "show": Cmd.show,
  "COMPUTE": 11,
  "EMIT": 12,
  "RUN": 13,
  "FILTER": 14,
  "UPDATE": 15,
};

/*: {    type time;    type ctx('a) = {      .      "type_": int,      "data": 'a,      "time": time,    };    type computeData;    let compute:      (. array(Js.Json.t), Js.Json.t, Js.Json.t, bool, bool, bool) =>      ctx(computeData);    type emitData;    let emit: (. string, Js.Json.t) => ctx(emitData);    type filterData;    let filter: (. Js.Json.t, bool) => ctx(filterData);    type updateData;    let update: (. Js.Json.t) => ctx(updateData);    type runData;    let run: (. array(Js.Json.t), ctx(Js.Json.t)) => ctx(runData);  }*/
module Ctx = {
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
  let getType = (ctx: ctx('a)) => ctx |. type_;
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
  type ctxg =
    | ComputeG(ctx(computeData))
    | EmitG(ctx(emitData))
    | RunG(ctx(runData))
    | FilterG(ctx(filterData))
    | UpdateG(ctx(updateData));
};

let getCtxType = Ctx.getType;

let ctx = {
  "compute": Ctx.compute,
  "run": Ctx.run,
  "emit": Ctx.emit,
  "filter": Ctx.filter,
  "update": Ctx.update,
  "COMPUTE": 21,
  "EMIT": 22,
  "RUN": 23,
  "FILTER": 24,
  "UPDATE": 25,
};

module Step /*: {    type step('a);    /* [@bs...] external step : (~type_: int, ~data: 'a) => step('a) = ""; */    /* external type_ : step('a) => int = "";       external data : step('a) => 'a = ""; */    /* module Label:       {         type stepType = SingleType | MultiType | SeqType;         let stepT: stepType => int;         let single: int;         let multi: int;         let seq: int;       }; */    type set('a) = {. add: (. 'a) => set('a)};    let setAdd = (s: set('a), a: 'a) => s |. add(a);    /* [@bs...] external createSet: array('a) => set('a) = "Set"; */    let single: (~data: Cmd.cmd) => step(Cmd.cmd);    let multi: unit => step(set('a));    let seq: (~data: array(step('a))) => step(array(step('a)));    let show: step('a) => string;  }*/ = {
  [@bs.deriving abstract]
  type step('a) = {
    [@bs.as "type"]
    type_: int,
    data: 'a,
  };
  module Label = {
    type stepType =
      | [@bs.as 31] SingleType
      | [@bs.as 32] MultiType
      | [@bs.as 33] SeqType;
    let stepT =
      fun
      | SingleType => 31
      | MultiType => 32
      | SeqType => 33;
    let single = stepT(SingleType);
    let multi = stepT(MultiType);
    let seq = stepT(SeqType);
  };
  type set('a) = {. add: (. 'a) => set('a)};
  let setAdd = (s: set('a), v: 'a) => {
    s;
    v;
    %raw
    "s.add(v)";
    ();
  };
  [@bs.new] external createSet : array('a) => set('a) = "Set";
  let single = (~data: Cmd.cmd) => step(~data, ~type_=Label.single);
  let multi = () => step(~data=createSet([||]), ~type_=Label.multi);
  let seq = (~data: array(step(_))) => step(~data, ~type_=Label.seq);
  [@bs.module "./showstep.js"]
  external show' : (step('a), Cmd.cmd => string) => string = "show";
  let show = a => show'(a, Cmd.show);
};

let step = {
  "single": (~data: Cmd.cmd) => Step.single(~data),
  "multi": () => (Step.multi(): Step.step(Step.set(int))),
  "seq": (~data: array(Step.step(int))) => Step.seq(~data),
  "show": (a: Step.step(int)) => Step.show(a),
  "SINGLE": 31,
  "MULTI": 32,
  "SEQ": 33,
};