

import * as ShowstepJs from "./showstep.js";

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

var Cmd = /* module */[
  /* cmdT */cmdT,
  /* cmdUnTF */cmdUnTF,
  /* cmdUnT */cmdUnT,
  /* cmdByType */cmdByType,
  /* compute */compute,
  /* run */run,
  /* emit */emit,
  /* filter */filter,
  /* update */update,
  /* show */show
];

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

var Ctx = /* module */[
  /* ctxT */ctxT,
  /* getType */getType,
  /* compute */compute$1,
  /* run */run$1,
  /* emit */emit$1,
  /* filter */filter$1,
  /* update */update$1
];

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

var Label = /* module */[
  /* stepT */stepT,
  /* single */single,
  /* multi */multi,
  /* seq */seq
];

function setAdd(_, _$1) {
  ((s.add(v)));
  return /* () */0;
}

function single$1(data) {
  return {
          type: single,
          data: data
        };
}

function multi$1() {
  return {
          type: multi,
          data: new Set(/* array */[])
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

var Step = /* module */[
  /* Label */Label,
  /* setAdd */setAdd,
  /* single */single$1,
  /* multi */multi$1,
  /* seq */seq$1,
  /* show */show$1
];

var step = {
  single: (function (data) {
      return {
              type: single,
              data: data
            };
    }),
  multi: (function () {
      return multi$1(/* () */0);
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
/* ./showstep.js Not a pure module */
