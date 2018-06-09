type ctx('a);

type computeData;

let compute:
  (. array(Js.Json.t), Js.Json.t, Js.Json.t, bool, bool, bool) =>
  ctx(computeData);

type emitData;

let emit: (. string, Js.Json.t) => ctx(emitData);

type filterData;

let filter: (. Js.Json.t, bool) => ctx(filterData);

type updateData;

let update: (. Js.Json.t) => ctx(updateData);

type runData;

let run: (. array(Js.Json.t), ctx(Js.Json.t)) => ctx(runData);