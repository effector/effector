

import * as Block from "bs-platform/lib/es6/block.js";
import * as ShowstepJs from "./showstep.js";
import * as Murk$Graphite from "../effector/Command/murk/Murk.bs.js";

function cmdT(param) {
  return param + 11 | 0;
}

function cmdUnTF(param) {
  var switcher = param - 11 | 0;
  if (switcher > 4 || switcher < 0) {
    return /* ComputeType */0;
  } else {
    return switcher;
  }
}

function cmdUnT(cmd) {
  return cmdUnTF(cmd.type);
}

function cmdByType(c, data) {
  return {
          type: c + 11 | 0,
          data: data
        };
}

function compute(param) {
  return {
          type: 11,
          data: param
        };
}

function run(param) {
  return {
          type: 13,
          data: param
        };
}

function emit(param) {
  return {
          type: 12,
          data: param
        };
}

function filter(param) {
  return {
          type: 14,
          data: param
        };
}

function update(param) {
  return {
          type: 15,
          data: param
        };
}

function show(cmd) {
  var match = cmd.type;
  var switcher = match - 11 | 0;
  if (switcher > 4 || switcher < 0) {
    return "";
  } else {
    switch (switcher) {
      case 0 : 
          return "Compute";
      case 1 : 
          return "Emit(" + ((cmd.data.fullName) + ")");
      case 2 : 
          return "Run";
      case 3 : 
          return "Filter";
      case 4 : 
          return "Update";
      
    }
  }
}

var Cmd = /* module */Block.localModule([
    "cmdT",
    "cmdUnTF",
    "cmdUnT",
    "cmdByType",
    "compute",
    "run",
    "emit",
    "filter",
    "update",
    "show"
  ], [
    cmdT,
    cmdUnTF,
    cmdUnT,
    cmdByType,
    compute,
    run,
    emit,
    filter,
    update,
    show
  ]);

var cmd = {
  compute: compute,
  run: run,
  emit: emit,
  filter: filter,
  update: update,
  show: show,
  COMPUTE: 11,
  EMIT: 12,
  RUN: 13,
  FILTER: 14,
  UPDATE: 15
};

function ctxT(param) {
  return param + 21 | 0;
}

function getType(ctx) {
  return ctx.type;
}

function compute$1(args, result, error, isError, isNone, isChanged) {
  var data = {
    args: args,
    result: result,
    error: error,
    isError: isError,
    isNone: isNone,
    isChanged: isChanged
  };
  return {
          type: 21,
          data: data,
          time: Date.now()
        };
}

function run$1(args, parentContext) {
  var data = {
    args: args,
    parentContext: parentContext
  };
  return {
          type: 23,
          data: data,
          time: Date.now()
        };
}

function emit$1(eventName, payload) {
  var data = {
    eventName: eventName,
    payload: payload
  };
  return {
          type: 22,
          data: data,
          time: Date.now()
        };
}

function filter$1(value, isChanged) {
  var data = {
    value: value,
    isChanged: isChanged
  };
  return {
          type: 24,
          data: data,
          time: Date.now()
        };
}

function update$1(value) {
  var data = {
    value: value
  };
  return {
          type: 25,
          data: data,
          time: Date.now()
        };
}

var Ctx = /* module */Block.localModule([
    "ctxT",
    "getType",
    "compute",
    "run",
    "emit",
    "filter",
    "update"
  ], [
    ctxT,
    getType,
    compute$1,
    run$1,
    emit$1,
    filter$1,
    update$1
  ]);

var ctx = {
  compute: compute$1,
  run: run$1,
  emit: emit$1,
  filter: filter$1,
  update: update$1,
  COMPUTE: 21,
  EMIT: 22,
  RUN: 23,
  FILTER: 24,
  UPDATE: 25
};

function stepT(param) {
  return param + 31 | 0;
}

var single = 31;

var multi = 32;

var seq = 33;

var Label = /* module */Block.localModule([
    "stepT",
    "single",
    "multi",
    "seq"
  ], [
    stepT,
    single,
    multi,
    seq
  ]);

var counter = [0];

function id() {
  counter[0] = counter[0] + 1 | 0;
  return counter[0].toString(36);
}

var ExecId = /* module */Block.localModule(["id"], [id]);

function emit$2(param_0) {
  return /* Emit */Block.variant("Emit", 0, [param_0]);
}

function fullStoreUpdate(param_0) {
  return /* FullStoreUpdate */Block.variant("FullStoreUpdate", 1, [param_0]);
}

function partialStoreUpdate(param_0, param_1) {
  return /* PartialStoreUpdate */Block.variant("PartialStoreUpdate", 2, [
            param_0,
            param_1
          ]);
}

function cloneStoreValue(param_0) {
  return /* CloneStoreValue */Block.variant("CloneStoreValue", 3, [param_0]);
}

function sideEffect(param_0) {
  return /* SideEffect */Block.variant("SideEffect", 4, [param_0]);
}

var UniEvent = /* module */Block.localModule([
    "emit",
    "fullStoreUpdate",
    "partialStoreUpdate",
    "cloneStoreValue",
    "sideEffect"
  ], [
    emit$2,
    fullStoreUpdate,
    partialStoreUpdate,
    cloneStoreValue,
    sideEffect
  ]);

var UniContext = /* module */Block.localModule([], []);

function oneStep(param_0) {
  return /* OneStep */Block.variant("OneStep", 0, [param_0]);
}

function stepSeq(param_0) {
  return /* StepSeq */Block.variant("StepSeq", 1, [param_0]);
}

function stepPar(param_0) {
  return /* StepPar */Block.variant("StepPar", 2, [param_0]);
}

function ContextControl(Context) {
  var cacheState = function (id, state) {
    Context[/* storeCache */0][id] = state;
    return /* () */0;
  };
  var getCached = function (id, state) {
    var match = Context[/* storeCache */0][id];
    if (match !== undefined) {
      return match;
    } else {
      cacheState(id, state);
      return state;
    }
  };
  var getEventData = function (id) {
    var data = Context[/* eventData */3][id];
    Context[/* eventData */3][id] = Murk$Graphite.murking(undefined);
    return data;
  };
  var setEventData = function (id, data) {
    Context[/* eventData */3][id] = data;
    return /* () */0;
  };
  return /* module */Block.localModule([
            "cacheState",
            "getCached",
            "getEventData",
            "setEventData"
          ], [
            cacheState,
            getCached,
            getEventData,
            setEventData
          ]);
}

var storeCache = { };

var sideEffects = /* array */[];

var pendingEvents = /* array */[];

var eventData = { };

var ContextExample = /* module */Block.localModule([
    "storeCache",
    "sideEffects",
    "pendingEvents",
    "eventData"
  ], [
    storeCache,
    sideEffects,
    pendingEvents,
    eventData
  ]);

function cacheState(id, state) {
  storeCache[id] = state;
  return /* () */0;
}

function getCached(id, state) {
  var match = storeCache[id];
  if (match !== undefined) {
    return match;
  } else {
    cacheState(id, state);
    return state;
  }
}

function getEventData(id) {
  var data = eventData[id];
  eventData[id] = Murk$Graphite.murking(undefined);
  return data;
}

function setEventData(id, data) {
  eventData[id] = data;
  return /* () */0;
}

var ControlledContext = /* module */Block.localModule([
    "cacheState",
    "getCached",
    "getEventData",
    "setEventData"
  ], [
    cacheState,
    getCached,
    getEventData,
    setEventData
  ]);

cacheState("foo", Murk$Graphite.murking("bar"));

var res = getCached("foo", Murk$Graphite.murking("or that"));

var res1 = getCached("foos", Murk$Graphite.murking("or that"));

var Uni = /* module */Block.localModule([
    "ExecId",
    "UniEvent",
    "UniContext",
    "oneStep",
    "stepSeq",
    "stepPar",
    "ContextControl",
    "ContextExample",
    "ControlledContext",
    "res",
    "res1"
  ], [
    ExecId,
    UniEvent,
    UniContext,
    oneStep,
    stepSeq,
    stepPar,
    ContextControl,
    ContextExample,
    ControlledContext,
    res,
    res1
  ]);

function single$1(data) {
  return {
          type: single,
          data: data
        };
}

function multi$1() {
  return {
          type: multi,
          data: /* array */[]
        };
}

function seq$1(data) {
  return {
          type: seq,
          data: data
        };
}

function show$1(a) {
  return ShowstepJs.show(a, show);
}

var Step = /* module */Block.localModule([
    "Label",
    "Uni",
    "single",
    "multi",
    "seq",
    "show"
  ], [
    Label,
    Uni,
    single$1,
    multi$1,
    seq$1,
    show$1
  ]);

var step = {
  single: (function (data) {
      return {
              type: single,
              data: data
            };
    }),
  multi: (function () {
      return {
              type: multi,
              data: /* array */[]
            };
    }),
  seq: (function (data) {
      return {
              type: seq,
              data: data
            };
    }),
  show: (function (a) {
      return ShowstepJs.show(a, show);
    }),
  SINGLE: 31,
  MULTI: 32,
  SEQ: 33
};

var getCtxType = getType;

export {
  Cmd ,
  cmd ,
  Ctx ,
  getCtxType ,
  ctx ,
  Step ,
  step ,
  
}
/*  Not a pure module */
