type step('a);

/* [@bs...] external step : (~type_: int, ~data: 'a) => step('a) = ""; */
/* external type_ : step('a) => int = "";

   external data : step('a) => 'a = ""; */
/* module Label:
   {
     type stepType = SingleType | MultiType | SeqType;
     let stepT: stepType => int;
     let single: int;
     let multi: int;
     let seq: int;
   }; */
type set('a);

/* [@bs...] external createSet: array('a) => set('a) = "Set"; */
let single: (~data: Graphite.Cmd.cmd) => step(Graphite.Cmd.cmd);

let multi: unit => step(set('a));

let seq: (~data: array(step('a))) => step(array(step('a)));