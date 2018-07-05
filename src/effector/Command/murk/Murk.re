type t;

type tt =
  | NoWrap(tt)
  | Wrap('t): tt;

[@bs.module "./index.js"] [@bs.val] external murking : (. 'a) => t = "";

[@bs.module "./index.js"] external demurking : (. t) => 'a = "";

[@bs.module "./index.js"] external creating : (. unit) => t = "";

[@bs.module "./index.js"] external lifting : (. t, 'a => 'b) => t = "";

let murk: (. unit) => t = creating;