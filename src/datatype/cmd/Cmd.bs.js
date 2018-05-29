


function cmdT(param) {
  return param + 11 | 0;
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

export {
  cmdT ,
  cmdByType ,
  compute ,
  run ,
  emit ,
  filter ,
  update ,
  
}
/* No side effect */
