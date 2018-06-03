


function compute(data) {
  return {
          type: 21,
          data: data,
          time: Date.now()
        };
}

function run(data) {
  return {
          type: 23,
          data: data,
          time: Date.now()
        };
}

function emit(data) {
  return {
          type: 22,
          data: data,
          time: Date.now()
        };
}

function filter(data) {
  return {
          type: 24,
          data: data,
          time: Date.now()
        };
}

function update(data) {
  return {
          type: 25,
          data: data,
          time: Date.now()
        };
}

export {
  compute ,
  run ,
  emit ,
  filter ,
  update ,
  
}
/* No side effect */
