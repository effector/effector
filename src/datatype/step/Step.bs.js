


var single = 31;

var multi = 32;

var seq = 33;

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
  single$1 as single,
  multi$1 as multi,
  seq$1 as seq,
  
}
/* No side effect */
