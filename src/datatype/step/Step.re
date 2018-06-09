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

type set('a);

[@bs.new] external createSet : array('a) => set('a) = "Set";

let single = (~data: Cmd.cmd) => step(~data, ~type_=Label.single);

let multi = () => step(~data=createSet([||]), ~type_=Label.multi);

let seq = (~data: array(step(_))) => step(~data, ~type_=Label.seq);