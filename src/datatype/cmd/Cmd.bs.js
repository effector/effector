


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

function show(cmd) {
  var match = cmd.type;
  var switcher = match - 11 | 0;
  if (switcher > 4 || switcher < 0) {
    return "";
  } else {
    switch (switcher) {
      case 0 : 
          return "Compute";
      case 1 : 
          return "Emit(" + ((cmd.data.fullName) + ")");
      case 2 : 
          return "Run";
      case 3 : 
          return "Filter";
      case 4 : 
          return "Update";
      
    }
  }
}

export {
  compute ,
  run ,
  emit ,
  filter ,
  update ,
  show ,
  
}
/* No side effect */
