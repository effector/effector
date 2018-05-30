


function ctxByType(c, data) {
  return {
          type: c + 21 | 0,
          data: data,
          time: Date.now()
        };
}

function compute(param) {
  return ctxByType(/* ComputeType */0, param);
}

function run(param) {
  return ctxByType(/* RunType */2, param);
}

function emit(param) {
  return ctxByType(/* EmitType */1, param);
}

function filter(param) {
  return ctxByType(/* FilterType */3, param);
}

function update(param) {
  return ctxByType(/* UpdateType */4, param);
}

export {
  compute ,
  run ,
  emit ,
  filter ,
  update ,
  
}
/* No side effect */
