


function compute(args, result, error, isError, isNone, isChanged) {
  var data = {
    args: args,
    result: result,
    error: error,
    isError: isError,
    isNone: isNone,
    isChanged: isChanged
  };
  return {
          type: 21,
          data: data,
          time: Date.now()
        };
}

function run(args, parentContext) {
  var data = {
    args: args,
    parentContext: parentContext
  };
  return {
          type: 23,
          data: data,
          time: Date.now()
        };
}

function emit(eventName, payload) {
  var data = {
    eventName: eventName,
    payload: payload
  };
  return {
          type: 22,
          data: data,
          time: Date.now()
        };
}

function filter(value, isChanged) {
  var data = {
    value: value,
    isChanged: isChanged
  };
  return {
          type: 24,
          data: data,
          time: Date.now()
        };
}

function update(value) {
  var data = {
    value: value
  };
  return {
          type: 25,
          data: data,
          time: Date.now()
        };
}

export {
  compute ,
  emit ,
  filter ,
  update ,
  run ,
  
}
/* No side effect */
