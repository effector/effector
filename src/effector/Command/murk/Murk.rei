type t;

let murking: (. 'a) => t;

let demurking: (. t) => 'a;

let lifting: (. t, 'a => 'b) => t;

let murk: (. unit) => t;