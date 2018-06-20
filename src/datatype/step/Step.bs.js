


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

export {
  Label ,
  single$1 as single,
  multi$1 as multi,
  seq$1 as seq,
  
}
/* No side effect */
