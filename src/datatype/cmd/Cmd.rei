type cmd;

let compute: Js.Json.t => cmd;

let run: Js.Json.t => cmd;

let emit: Js.Json.t => cmd;

let filter: Js.Json.t => cmd;

let update: Js.Json.t => cmd;