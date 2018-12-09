// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"2gTp":[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';
/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function (condition, format, a, b, c, d, e, f) {
  if ("production" !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;

    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame

    throw error;
  }
};

module.exports = invariant;
},{}],"FqNM":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.beginMark = beginMark;
exports.endMark = endMark;
var perf;
var effectorEmoji = '☄️';
var useTimingAPI = typeof window !== 'undefined' && window.performance;

function formatMarkName(markName) {
  return "".concat(effectorEmoji, " ").concat(markName);
}

function beginMark(markName) {
  if (useTimingAPI) {
    performance.mark(formatMarkName(markName));
  }
}

function endMark(label, markName) {
  if (useTimingAPI) {
    var formattedMarkName = formatMarkName(markName);
    var formattedLabel = formatMarkName(label);

    try {
      performance.measure(formattedLabel, formattedMarkName);
    } catch (err) {} // Clear marks immediately to avoid growing buffer.


    performance.clearMarks(formattedMarkName);
    performance.clearMeasures(formattedLabel);
  }
}
},{}],"JZ8d":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = symbolObservablePonyfill;

function symbolObservablePonyfill(root) {
  var result;
  var Symbol = root.Symbol;

  if (typeof Symbol === 'function') {
    if (Symbol.observable) {
      result = Symbol.observable;
    } else {
      result = Symbol('observable');
      Symbol.observable = result;
    }
  } else {
    result = '@@observable';
  }

  return result;
}

;
},{}],"LkZ7":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ponyfill = _interopRequireDefault(require("./ponyfill.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global window */
var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (typeof module !== 'undefined') {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill.default)(root);
var _default = result;
exports.default = _default;
},{"./ponyfill.js":"JZ8d"}],"fq6M":[function(require,module,exports) {

},{}],"isOT":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EFFECT = exports.EVENT = exports.STORE = exports.NONE = void 0;
var NONE = -1;
exports.NONE = NONE;
var STORE = 1;
exports.STORE = STORE;
var EVENT = 2;
exports.EVENT = EVENT;
var EFFECT = 3;
exports.EFFECT = EFFECT;
},{}],"mBNb":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require("./case/api");

Object.keys(_api).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _api[key];
    }
  });
});
},{"./case/api":"isOT"}],"7HvL":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readKind = readKind;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function safeKind(kind) {
  // prettier-ignore
  switch (kind) {
    case 1:
      return 1;

    case 2:
      return 2;

    case 3:
      return 3;

    default:
      return -1;
  }
}

function readKind(value) {
  if (_typeof(value) !== 'object' && typeof value !== 'function') return -1;
  if (value === null) return -1;
  return safeKind(value.kind);
}
},{}],"DzZz":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isStore = isStore;
exports.isEvent = isEvent;
exports.isEffect = isEffect;
exports.isNone = isNone;

var _readKind = require("./readKind");

var Kind = _interopRequireWildcard(require("./index.h"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function isStore(value) {
  return (0, _readKind.readKind)(value) === 1;
}

function isEvent(value) {
  return (0, _readKind.readKind)(value) === 2;
}

function isEffect(value) {
  return (0, _readKind.readKind)(value) === 3;
}

function isNone(value) {
  return (0, _readKind.readKind)(value) === -1;
}
},{"./readKind":"7HvL","./index.h":"fq6M"}],"RRwc":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  readKind: true
};
Object.defineProperty(exports, "readKind", {
  enumerable: true,
  get: function () {
    return _readKind.readKind;
  }
});

var _index = require("./index.h");

Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index[key];
    }
  });
});

var _case = require("./case");

Object.keys(_case).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _case[key];
    }
  });
});

var _is = require("./is");

Object.keys(_is).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _is[key];
    }
  });
});

var _readKind = require("./readKind");
},{"./index.h":"fq6M","./case":"mBNb","./is":"DzZz","./readKind":"7HvL"}],"a/+C":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeDef = typeDef;

var _invariant = _interopRequireDefault(require("invariant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fabricHandler(create) {
  if (typeof create === 'function') return create;
  return function (_) {
    return _;
  };
}

function typeDef(group, t) {
  var result = {};

  var _loop = function _loop(_key) {
    var handler = fabricHandler(t[_key]);

    result[_key] = function () {
      return {
        type: _key,
        group: group,
        data: handler.apply(void 0, arguments)
      };
    };
  };

  for (var _key in t) {
    _loop(_key);
  }

  return result;
}
},{"invariant":"2gTp"}],"3L3o":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ctx = exports.Cmd = exports.Step = void 0;

var _typedef = require("effector/stdlib/typedef");

var type = function type() {
  return null;
};

var Step = (0, _typedef.typeDef)('step', {
  single: type(),
  multi: type(),
  seq: type()
});
exports.Step = Step;
var Cmd = (0, _typedef.typeDef)('cmd', {
  compute: type(),
  emit: type(),
  run: type(),
  filter: type(),
  update: type()
});
exports.Cmd = Cmd;
var Ctx = (0, _typedef.typeDef)('ctx', {
  compute: function compute(args, result, error, isError, isNone, isChanged) {
    return {
      args: args,
      result: result,
      error: error,
      isError: isError,
      isNone: isNone,
      isChanged: isChanged
    };
  },
  emit: function emit(eventName, payload) {
    return {
      eventName: eventName,
      payload: payload
    };
  },
  run: function run(args, parentContext) {
    return {
      args: args,
      parentContext: parentContext
    };
  },
  filter: function filter(value, isChanged) {
    return {
      value: value,
      isChanged: isChanged
    };
  },
  update: function update(value) {
    return {
      value: value
    };
  }
});
exports.Ctx = Ctx;
},{"effector/stdlib/typedef":"a/+C"}],"pE7H":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.walkEvent = walkEvent;

var _invariant = _interopRequireDefault(require("invariant"));

var _typedef = require("effector/graphite/typedef");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function walkEvent(payload, event) {
  var steps = event.graphite.seq;

  var eventCtx = _typedef.Ctx.emit(event.getType(), payload);

  var transactions = [];
  stepVisitor.seq(steps, eventCtx, transactions);

  for (var i = 0; i < transactions.length; i++) {
    transactions[i]();
  }
}

var stepVisitor = {
  single: function single(step, currentCtx, transactions) {
    var innerData = step.data;
    var single = innerData;
    var ctx = currentCtx;
    (0, _invariant.default)(ctx.type in stepArgVisitor, 'impossible case "%s"', ctx.type);
    var arg = stepArgVisitor[ctx.type](ctx.data);
    (0, _invariant.default)(single.type in cmdVisitor, 'impossible case "%s"', single.type);
    var result = cmdVisitor[single.type](arg, single, ctx, transactions);
    if (!result) return;
    if (result.type === 'run') return;
    if (result.type === 'filter' && !result.data.isChanged) return;
    return result;
  },
  multi: function multi(step, currentCtx, transactions) {
    if (step.data.length === 0) return;

    for (var i = 0, result, item; i < step.data.length; i++) {
      item = step.data[i];
      (0, _invariant.default)(item.type in stepVisitor, 'impossible case "%s"', item.type);
      result = stepVisitor[item.type](item, currentCtx, transactions);
    }
  },
  seq: function seq(steps, prev, transactions) {
    if (steps.data.length === 0) return;
    var currentCtx = prev;
    var step;

    for (var i = 0; i < steps.data.length; i++) {
      step = steps.data[i];
      var isMulti = step.type === 'multi';
      (0, _invariant.default)(step.type in stepVisitor, 'impossible case "%s"', step.type);
      var stepResult = stepVisitor[step.type](step, currentCtx, transactions);
      if (isMulti) continue;
      if (stepResult === undefined) return;
      if (stepResult.type === 'filter' && !stepResult.data.isChanged) return;
      currentCtx = stepResult;
    }
  }
};
var stepArgVisitor = {
  compute: function compute(data) {
    return data.result;
  },
  emit: function emit(data) {
    return data.payload;
  },
  run: function run(data) {
    return data, (0, _invariant.default)(false, 'RunContext is not supported');
  },
  filter: function filter(data) {
    return data.value;
  },
  update: function update(data) {
    return data.value;
  }
};
var cmdVisitor = {
  emit: function emit(arg, single, ctx, transactions) {
    return _typedef.Ctx.emit(single.data.fullName, arg);
  },
  filter: function filter(arg, single, ctx, transactions) {
    try {
      var isChanged = single.data.filter(arg, ctx);
      return _typedef.Ctx.filter(arg, isChanged);
    } catch (err) {
      console.error(err);
    }
  },
  run: function run(arg, single, ctx, transactions) {
    var transCtx = single.data.transactionContext;
    if (transCtx) transactions.push(transCtx(arg));

    try {
      single.data.runner(arg);
    } catch (err) {
      console.error(err);
    }

    return _typedef.Ctx.run([arg], ctx);
  },
  update: function update(arg, single, ctx, transactions) {
    var newCtx = _typedef.Ctx.update(arg);

    single.data.store[2](arg);
    return newCtx;
  },
  compute: function compute(arg, single, ctx, transactions) {
    var newCtx = _typedef.Ctx.compute([undefined, arg, ctx], null, null, false, true, true);

    try {
      var result = single.data.reduce(undefined, arg, newCtx);
      newCtx.data.result = result;
      newCtx.data.isNone = result === undefined;
    } catch (err) {
      newCtx.data.isError = true;
      newCtx.data.error = err;
      newCtx.data.isChanged = false;
    }

    if (!newCtx.data.isChanged) return;
    return newCtx;
  }
};
},{"invariant":"2gTp","effector/graphite/typedef":"3L3o"}],"IxJB":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRef = createRef;

/*::
declare function hide<T>(
  full: [ID, Read<T>, Write<T>, CopyRef<T>, Close, T]
): Ref<T>
*/
var nextID = 0;

function read() {
  return this[5];
}

function write(t) {
  this[5] = t;
}

function close() {
  this.length = 0;
}

function copyRef() {
  return (
    /*::hide(*/
    [++nextID, read, write, copyRef, close, this[5]]
  );
  /*::)*/
}

function createRef(t) {
  return (
    /*::hide(*/
    [++nextID, read, write, copyRef, close, t]
  );
  /*::)*/
}
},{}],"51X3":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.frame = exports.seq = void 0;

var _createRef = require("../ref/createRef");

var seq = (0, _createRef.createRef)(null);
exports.seq = seq;
var frame = (0, _createRef.createRef)(null);
exports.frame = frame;
},{"../ref/createRef":"IxJB"}],"NMwW":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "walkEvent", {
  enumerable: true,
  get: function () {
    return _walk.walkEvent;
  }
});
Object.defineProperty(exports, "seq", {
  enumerable: true,
  get: function () {
    return _frame.seq;
  }
});
Object.defineProperty(exports, "frame", {
  enumerable: true,
  get: function () {
    return _frame.frame;
  }
});

var _walk = require("./walk");

var _frame = require("./frame");
},{"./walk":"pE7H","./frame":"51X3"}],"ZAbB":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringRefcount = stringRefcount;
exports.intRefcount = intRefcount;
exports.eventRefcount = void 0;

function stringRefcount() {
  var id = 0;
  return function () {
    return (++id).toString(36);
  };
}

function intRefcount() {
  var id = 0;
  return function () {
    return ++id;
  };
}

var eventRefcount = stringRefcount();
exports.eventRefcount = eventRefcount;
},{}],"Eeez":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createName = createName;
exports.CompositeName = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CompositeName =
/*::
+path: Array<string>;
+shortName: string;
+fullName: string;
*/
function CompositeName(name, parentPath) {
  _classCallCheck(this, CompositeName);

  var path = parentPath.concat(name === '' ? [] : [name]);
  this.shortName = name;
  this.path = path;
  this.fullName = path.join('/');
};

exports.CompositeName = CompositeName;

function createName(name, parent) {
  return new CompositeName(name, parent === undefined ? [] : parent.path);
}
},{}],"88Gy":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eventFabric = eventFabric;
exports.watchEvent = watchEvent;

var _symbolObservable = _interopRequireDefault(require("symbol-observable"));

var Kind = _interopRequireWildcard(require("../kind"));

var _typedef = require("effector/graphite/typedef");

var _graphite = require("effector/graphite");

var _refcount = require("../refcount");

var _compositeName = require("../compositeName");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function eventFabric(_ref) {
  var nameRaw = _ref.name,
      parent = _ref.parent,
      vertex = _ref.vertex;
  var id = (0, _refcount.eventRefcount)();
  var name = nameRaw || id;
  var fullName = makeName(name, parent);
  var compositeName = (0, _compositeName.createName)(name, parent);

  var cmd = _typedef.Cmd.emit({
    subtype: 'event',
    fullName: fullName,
    runner: createGraphite
  });

  var step = _typedef.Step.single(cmd);

  var nextSteps = _typedef.Step.multi([]);

  var stepFull = _typedef.Step.seq([step, nextSteps]);

  var graphite = {
    next: nextSteps,
    seq: stepFull
  };

  var instance = function instance(payload) {
    return instanceAsEvent.create(payload, fullName);
  };

  function createGraphite(payload) {
    return instanceAsEvent.create(payload, fullName);
  }

  var instanceAsEvent = instance;
  instanceAsEvent.graphite = graphite;

  var getType = function getType() {
    return compositeName.fullName;
  };

  Object.defineProperty(instance, 'toString', {
    configurable: true,
    value: getType
  });
  instance.getType = getType;

  instance.create = function (payload, fullName) {
    (0, _graphite.walkEvent)(payload, instanceAsEvent);
    return payload;
  };

  instance.kind = Kind.EVENT;

  instance[_symbolObservable.default] = function () {
    return instance;
  };

  instance.id = id;
  instance.watch = watch;
  instance.map = map;
  instance.prepend = prepend;
  instance.subscribe = subscribe;
  instance.to = to; // instance.epic = epic

  instance.shortName = name;
  instance.domainName = parent;
  instance.compositeName = compositeName;
  instance.filter = filter;

  instance.getNode = function () {
    return vertex;
  };

  function filter(fn) {
    return filterEvent(instanceAsEvent, fn);
  }

  function map(fn) {
    return mapEvent(instanceAsEvent, fn);
  }

  function to(target, handler) {
    switch (Kind.readKind(target)) {
      case Kind.STORE:
        return watch(function (payload) {
          return target.setState(payload, handler);
        });

      case Kind.EVENT:
      case Kind.EFFECT:
        return watch(target.create);

      default:
        {
          throw new TypeError('Unsupported kind');
        }
    }
  }

  function watch(watcher) {
    return watchEvent(instanceAsEvent, watcher);
  }

  function subscribe(observer) {
    return watch(function (payload) {
      return observer.next(payload);
    });
  }

  function prepend(fn) {
    var vert = vertex.createChild(['event', "* \u2192 ".concat(name)]);
    var contramapped = eventFabric({
      name: "* \u2192 ".concat(name),
      parent: parent,
      vertex: vert
    });

    var computeCmd = _typedef.Step.single(_typedef.Cmd.compute({
      reduce: function reduce(_, newValue, ctx) {
        return fn(newValue);
      }
    }));

    var nextSeq = _typedef.Step.seq([computeCmd].concat(_toConsumableArray(instanceAsEvent.graphite.seq.data)));

    contramapped.graphite.next.data.push(nextSeq);
    return contramapped;
  }

  return instance;
}

function mapEvent(event, fn) {
  var vertex = event.getNode();
  var mapped = eventFabric({
    name: "".concat(event.shortName, " \u2192 *"),
    parent: event.domainName,
    vertex: vertex.createChild(['event', "".concat(event.shortName, " \u2192 *")])
  });

  var computeCmd = _typedef.Step.single(_typedef.Cmd.compute({
    reduce: function reduce(_, newValue, ctx) {
      return fn(newValue);
    }
  }));

  var nextSeq = _typedef.Step.seq([computeCmd].concat(_toConsumableArray(mapped.graphite.seq.data)));

  event.graphite.next.data.push(nextSeq);
  return mapped;
}

function filterEvent(event, fn) {
  var vertex = event.getNode();
  var mapped = eventFabric({
    name: "".concat(event.shortName, " \u2192? *"),
    parent: event.domainName,
    vertex: vertex.createChild(['event', "".concat(event.shortName, " \u2192? *")])
  });

  var computeCmd = _typedef.Step.single(_typedef.Cmd.compute({
    reduce: function reduce(_, newValue, ctx) {
      return fn(newValue);
    }
  }));

  var filterCmd = _typedef.Step.single(_typedef.Cmd.filter({
    filter: function filter(result, ctx) {
      return result !== undefined;
    }
  }));

  var nextSeq = _typedef.Step.seq([computeCmd, filterCmd].concat(_toConsumableArray(mapped.graphite.seq.data)));

  event.graphite.next.data.push(nextSeq);
  return mapped;
}

function watchEvent(instanceAsEvent, watcher) {
  var singleCmd = _typedef.Step.single(_typedef.Cmd.run({
    runner: function runner(newValue) {
      return watcher(newValue, instanceAsEvent.getType());
    }
  }));

  var sq = _graphite.seq[1]();

  var runCmd;
  var isWrited = false;

  if (sq !== null) {
    if (sq.data.length > 0) {
      var last = sq.data[sq.data.length - 1];

      if (last.type === 'multi') {
        last.data.push(singleCmd);
      } else {
        sq.data.push(singleCmd);
      }

      isWrited = true;
    }

    runCmd = isWrited ? sq : _typedef.Step.seq(sq.data.concat([singleCmd]));
  } else runCmd = singleCmd;

  instanceAsEvent.graphite.next.data.push(runCmd);

  var unsubscribe = function unsubscribe() {
    var i = instanceAsEvent.graphite.next.data.indexOf(runCmd);
    if (i === -1) return;
    instanceAsEvent.graphite.next.data.splice(i, 1);
  };

  unsubscribe.unsubscribe = unsubscribe;
  return unsubscribe;
}

function makeName(name, compositeName) {
  return [compositeName === null || compositeName === void 0 ? void 0 : compositeName.fullName, name].filter(Boolean).join('/');
}
},{"symbol-observable":"LkZ7","../kind":"RRwc","effector/graphite/typedef":"3L3o","effector/graphite":"NMwW","../refcount":"ZAbB","../compositeName":"Eeez"}],"kzen":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VertexRef = exports.Vertex = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var i = 0;

var Vertex =
/*#__PURE__*/
function () {
  /*::;+*/
  function Vertex(name) {
    _classCallCheck(this, Vertex);

    this.id = ++i;
    this.name = void 0;
    this.connections = [];
    this.name = name;
  }

  _createClass(Vertex, [{
    key: "dependsOn",
    value: function dependsOn(vertex) {
      this.connections.push(vertex);
    }
  }, {
    key: "createChild",
    value: function createChild(_) {
      var vertex = new Vertex(_);
      vertex.connections.push(this);
      return vertex;
    }
  }]);

  return Vertex;
}();

exports.Vertex = Vertex;

var VertexRef =
/*::;+*/
// used in tarjan algorithm
// went ahead and explicity initalized them
function VertexRef(valueIndex) {
  _classCallCheck(this, VertexRef);

  this.valueIndex = void 0;
  this.index = -1;
  this.lowlink = -1;
  this.valueIndex = valueIndex;
};

exports.VertexRef = VertexRef;
},{}],"vk7K":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decomposeGraph = decomposeGraph;
exports.tarjan = tarjan;
exports.Graph = void 0;

var _Vertex = require("./Vertex");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Graph =
/*#__PURE__*/
function () {
  function Graph() {
    _classCallCheck(this, Graph);

    this.verticles = [];
    this.rings = 0;
    this.values = void 0;
    this.active = false;
    this.changed = false;
  }

  _createClass(Graph, [{
    key: "decompose",
    value: function decompose() {
      if (this.active) {
        decomposeGraph(this);
      } else {
        this.changed = true;
      }
    }
  }, {
    key: "addNode",
    value: function addNode(data) {
      var vert = new _Vertex.Vertex(data);
      this.verticles.push(vert);
      this.decompose();
      return vert;
    }
  }, {
    key: "dependsOn",
    value: function dependsOn(dependent, dependency) {
      dependent.dependsOn(dependency);
      this.decompose();
    }
  }, {
    key: "breakDependency",
    value: function breakDependency(dependent, dependency) {
      var index = dependent.connections.indexOf(dependency);
      if (index === -1) return;
      dependent.connections.splice(index, 1);
      this.decompose();
    }
  }, {
    key: "activate",
    value: function activate() {
      this.active = true;
      if (!this.changed) return;
      this.changed = false;
      decomposeGraph(this);
    }
  }]);

  return Graph;
}();

exports.Graph = Graph;
var i = 0;

var TarjanContext = function TarjanContext() {
  _classCallCheck(this, TarjanContext);

  this.vertices = void 0;
  this.values = void 0;
  this.vertIDs = void 0;
  this.vertRefs = void 0;
  this.id = ++i;
  this.scc = [];
  this.index = 0;
  this.refStack = [];
  this.connections = void 0;
};

function strongconnect(ctx, vertex) {
  // Set the depth index for v to the smallest unused index
  vertex.index = ctx.index;
  vertex.lowlink = ctx.index;
  ctx.index = ctx.index + 1;
  ctx.refStack.push(vertex); // Consider successors of v
  // aka... consider each vertex in vertex.connections

  var connects = ctx.connections[vertex.valueIndex];

  for (var w, _i = 0; _i < connects.length; _i++) {
    w = ctx.vertRefs[connects[_i]];

    if (w.index < 0) {
      // Successor w has not yet been visited; recurse on it
      strongconnect(ctx, w);
      vertex.lowlink = Math.min(vertex.lowlink, w.lowlink);
    } else if (ctx.refStack.indexOf(w) !== -1) {
      // Successor w is in stack S and hence in the current SCC
      vertex.lowlink = Math.min(vertex.lowlink, w.index);
    }
  } // If v is a root node, pop the stack and generate an SCC


  if (vertex.lowlink !== vertex.index) return; // start a new strongly connected component

  var currentScc = [];
  var ww;

  if (ctx.refStack.length > 0) {
    do {
      ww = ctx.refStack.pop(); // add ww to current strongly connected component

      currentScc.push(ctx.values[ww.valueIndex]);
    } while (vertex.valueIndex !== ww.valueIndex);
  } // output the current strongly connected component
  // ... i'm going to push the results to a member scc array variable


  if (currentScc.length > 0) {
    ctx.scc.push(currentScc);
  }
}

function comparator(a, b) {
  if (a.id === b.id) return 0;
  if (a.id > b.id) return -1;
  return 1;
}

function decomposeGraph(graph) {
  //$todo wtf
  var blocks = tarjan(graph.verticles);
  var result = [];

  for (var _i2 = 0; _i2 < blocks.length; _i2++) {
    result.push.apply(result, _toConsumableArray(blocks[_i2]));
  }

  graph.values = result;
  graph.rings = blocks.length;
  return result;
}

function tarjan(nodes) {
  // const nodes = nodes_.sort(comparator)
  var ctx = new TarjanContext();
  ctx.vertices = nodes;
  var values = new Array(nodes.length);
  var vertIDs = new Array(nodes.length);
  var vertRefs = new Array(nodes.length);
  var connections = new Array(nodes.length);
  ctx.values = values;
  ctx.vertIDs = vertIDs;
  ctx.vertRefs = vertRefs;
  ctx.connections = connections;

  for (var _i3 = 0; _i3 < nodes.length; _i3++) {
    var vert = nodes[_i3];
    values[_i3] = vert.name;
    vertIDs[_i3] = vert.id;
    vertRefs[_i3] = new _Vertex.VertexRef(_i3);
  }

  for (var _i4 = 0; _i4 < nodes.length; _i4++) {
    var _vert = nodes[_i4];
    connections[_i4] = _vert.connections.map(function (con) {
      return vertIDs.indexOf(con.id);
    }); // console.log(connections)
  }

  for (var _i5 = 0; _i5 < vertRefs.length; _i5++) {
    var _vert2 = vertRefs[_i5];

    if (_vert2.index < 0) {
      strongconnect(ctx, _vert2);
    }
  }

  return ctx.scc;
}
},{"./Vertex":"kzen"}],"1ySN":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Vertex", {
  enumerable: true,
  get: function () {
    return _Vertex.Vertex;
  }
});
Object.defineProperty(exports, "Graph", {
  enumerable: true,
  get: function () {
    return _Graph.Graph;
  }
});
Object.defineProperty(exports, "tarjan", {
  enumerable: true,
  get: function () {
    return _Graph.tarjan;
  }
});

var _Vertex = require("./Vertex");

var _Graph = require("./Graph");
},{"./Vertex":"kzen","./Graph":"vk7K"}],"KQqO":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEvent = createEvent;

var _eventFabric = require("./eventFabric");

var _tarjan = require("effector/graphite/tarjan");

function createEvent(name) {
  return (0, _eventFabric.eventFabric)({
    name: name,
    vertex: new _tarjan.Vertex(['event', name || ''])
  });
}
},{"./eventFabric":"88Gy","effector/graphite/tarjan":"1ySN"}],"A6jS":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "eventFabric", {
  enumerable: true,
  get: function () {
    return _eventFabric.eventFabric;
  }
});
Object.defineProperty(exports, "watchEvent", {
  enumerable: true,
  get: function () {
    return _eventFabric.watchEvent;
  }
});
Object.defineProperty(exports, "createEvent", {
  enumerable: true,
  get: function () {
    return _createEvent.createEvent;
  }
});

var _eventFabric = require("./eventFabric");

var _createEvent = require("./createEvent");
},{"./eventFabric":"88Gy","./createEvent":"KQqO"}],"I4tw":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setStoreName = setStoreName;

var _compositeName = require("../compositeName");

function setStoreName(store, rawName) {
  var compositeName = (0, _compositeName.createName)(rawName, store.domainName);
  store.shortName = rawName;
  store.compositeName = compositeName;
}
},{"../compositeName":"Eeez"}],"M9sN":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compute = _compute;
exports.filter = _filter;
exports.run = _run;
exports.emit = _emit;
exports.update = _update;
exports.StepBox = void 0;

var _typedef = require("effector/graphite/typedef");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _compute(reduce) {
  return _typedef.Cmd.compute({
    reduce: reduce
  });
}

function _filter(filt) {
  return _typedef.Cmd.filter({
    filter: filt
  });
}

function _run(data) {
  return _typedef.Cmd.run(data);
}

function _emit(subtype, fullName, runner) {
  return _typedef.Cmd.emit({
    subtype: subtype,
    fullName: fullName,
    runner: runner
  });
}

function _update(store) {
  return _typedef.Cmd.update({
    store: store
  });
}

var StepBox =
/*#__PURE__*/
function () {
  function StepBox() {
    _classCallCheck(this, StepBox);

    this.depth = 0;
    this.mod = 'seq';
    this.prime = _typedef.Step.seq([]);
    this.current = this.prime;
  }

  _createClass(StepBox, [{
    key: "modeSeq",
    value: function modeSeq() {
      if (this.mod === 'par') {
        var prime = this.prime;

        var next = _typedef.Step.seq([]);

        prime.data.push(next);
        this.current = next;
      }

      this.mod = 'seq';
      return (
        /*::toSeq(*/
        this
      );
      /*::)*/
    }
  }, {
    key: "modePar",
    value: function modePar() {
      if (this.mod === 'seq') {
        var prime = this.prime;

        var next = _typedef.Step.multi([]);

        prime.data.push(next);
        this.current = next;
      }

      this.mod = 'par';
      return (
        /*::toPar(*/
        this
      );
      /*::)*/
    }
  }, {
    key: "push",
    value: function push(step) {
      var solo = _typedef.Step.single(step);

      this.current.data.push(solo);
      return this;
    }
  }, {
    key: "compute",
    value: function compute(reduce) {
      this.push(_compute(reduce));
      return this;
    }
  }, {
    key: "filter",
    value: function filter(filt) {
      this.push(_filter(filt));
      return this;
    }
  }, {
    key: "run",
    value: function run(data) {
      this.push(_run(data));
      return this;
    }
  }, {
    key: "emit",
    value: function emit(subtype, fullName, runner) {
      this.push(_emit(subtype, fullName, runner));
      return this;
    }
  }, {
    key: "update",
    value: function update(store) {
      this.push(_update(store));
      return this;
    } // step(...fabs: Array<(api: StepBox<*>) => StepBox<*>>) {
    //  fabs.map(f => f(this))
    //  return this
    // }
    // seq(...fabs: Array<(api: StepBox<*>) => StepBox<*>>) {
    //  fabs.map(f => f(this))
    //  return this
    // }

  }]);

  return StepBox;
}();
/*::
declare function toPar(stepBox: StepBox<'seq'>): StepBox<'par'>;
declare function toPar(stepBox: StepBox<'par'>): StepBox<'par'>;
declare function toPar(stepBox: StepBox<'par' | 'seq'>): StepBox<'par'>;
declare function toSeq(stepBox: StepBox<'seq'>): StepBox<'seq'>;
declare function toSeq(stepBox: StepBox<'par'>): StepBox<'seq'>;
declare function toSeq(stepBox: StepBox<'par' | 'seq'>): StepBox<'seq'>;
*/


exports.StepBox = StepBox;
},{"effector/graphite/typedef":"3L3o"}],"bCZr":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storeFabric = storeFabric;
exports.getDisplayName = getDisplayName;

var _invariant = _interopRequireDefault(require("invariant"));

var perf = _interopRequireWildcard(require("effector/perf"));

var _symbolObservable = _interopRequireDefault(require("symbol-observable"));

var _event = require("effector/event");

var _typedef = require("effector/graphite/typedef");

var Kind = _interopRequireWildcard(require("../kind"));

var _setStoreName = require("./setStoreName");

var _createRef = require("../ref/createRef");

var Box = _interopRequireWildcard(require("./StepBox"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var id = 0;

function storeFabric(props) {
  var currentId = (++id).toString(36);
  var currentState = props.currentState,
      name = props.name,
      parent = props.parent;
  var defaultState = currentState;
  var plainState = (0, _createRef.createRef)(defaultState);
  var subscribers = new Map();
  var shouldChange = Box.filter(function (newValue, ctx) {
    return newValue !== undefined && newValue !== plainState[1]();
  });
  var cmd = Box.update(plainState);
  var bx = new Box.StepBox().modeSeq().push(shouldChange).push(cmd).modePar();
  var updater = (0, _event.createEvent)("update ".concat(currentId));

  var store = _defineProperty({
    graphite: {
      next: bx.current,
      seq: bx.prime
    },
    defaultState: defaultState,
    kind: Kind.STORE,
    id: currentId,
    shortName: currentId,
    domainName: parent,
    withProps: withProps,
    setState: setState,
    map: map,
    on: on,
    off: off,
    to: to,
    watch: watch,
    // epic,
    thru: thru,
    subscribe: _subscribe,
    getState: getState,
    reset: reset
  }, _symbolObservable.default, observable);

  if (name) (0, _setStoreName.setStoreName)(store, name);
  store.dispatch = dispatch;
  on(updater, function (_, payload) {
    return payload;
  });

  function getState() {
    return plainState[1]();
  }

  function map(fn, firstState) {
    //prettier-ignore
    return mapStore
    /*::<State, NextState>*/
    (store, fn, firstState);
  }

  function _subscribe(listener) {
    if (__DEV__) perf.beginMark("Start ".concat(getDisplayName(store), " subscribe (id: ").concat(store.id, ")"));
    (0, _invariant.default)(typeof listener === 'function', 'Expected the listener to be a function.');
    var lastCall = getState();
    var active = true;

    var runCmd = _typedef.Step.single(Box.run({
      runner: function runner(args) {
        if (args === lastCall || !active) return;
        lastCall = args;

        try {
          listener(args);
          if (__DEV__) perf.endMark("Call ".concat(getDisplayName(store), " subscribe listener (id: ").concat(store.id, ")"), "Start ".concat(getDisplayName(store), " subscribe (id: ").concat(store.id, ")"));
        } catch (err) {
          console.error(err);
          if (__DEV__) perf.endMark("Got error on ".concat(getDisplayName(store), " subscribe (id: ").concat(store.id, ")"), "Start ".concat(getDisplayName(store), " subscribe (id: ").concat(store.id, ")"));
        }
      }
    }));

    store.graphite.next.data.push(runCmd);
    listener(lastCall);

    function unsubscribe() {
      active = false;
      var i = store.graphite.next.data.indexOf(runCmd);
      if (i === -1) return;
      store.graphite.next.data.splice(i, 1);
    }

    unsubscribe.unsubscribe = unsubscribe; //$off

    return unsubscribe;
  }

  function dispatch(action) {
    // if (action === undefined || action === null) return action
    // if (typeof action.type !== 'string' && typeof action.type !== 'number')
    //  return action
    return action;
  }

  function observable() {
    return _defineProperty({
      subscribe: function subscribe(observer) {
        (0, _invariant.default)(_typeof(observer) === 'object' && observer !== null, 'Expected the observer to be an object.');

        function observeState(state) {
          if (observer.next) {
            observer.next(state);
          }
        }

        return _subscribe(observeState);
      }
    }, _symbolObservable.default, function () {
      return this;
    });
  }

  function reset(event) {
    return on(event, function () {
      return defaultState;
    });
  }

  function off(event) {
    var currentSubscription = subscribers.get(event);
    if (currentSubscription === undefined) return;
    currentSubscription();
    subscribers.delete(event);
  }

  function on(event, handler) {
    var e = event;
    off(e);
    var computeCmd = Box.compute(function (_, newValue, ctx) {
      var lastState = getState();
      return handler(lastState, newValue, e.getType());
    });
    var filterCmd = Box.filter(function (data, ctx) {
      var lastState = getState();
      return data !== lastState && data !== undefined;
    });

    var step = _typedef.Step.single(computeCmd);

    var filtStep = _typedef.Step.single(filterCmd);

    var nextSeq = _typedef.Step.seq([step, filtStep].concat(_toConsumableArray(store.graphite.seq.data)));

    e.graphite.next.data.push(nextSeq);
    subscribers.set(e, function () {
      var i = e.graphite.next.data.indexOf(nextSeq);
      if (i === -1) return;
      e.graphite.next.data.splice(i, 1);
    });
    return store;
  }

  function withProps(fn) {
    return function (props) {
      return fn(getState(), props);
    };
  }

  function to(action, reduce) {
    var needReduce = Kind.isStore(action) && typeof reduce === 'function';
    return watch(function (data) {
      if (!needReduce) {
        action(data);
      } else {
        var _lastState = action.getState();

        var reduced = reduce(_lastState, data);
        if (_lastState !== reduced) action.setState(reduced);
      }
    });
  }

  function watch(eventOrFn, fn) {
    switch (Kind.readKind(eventOrFn)) {
      case 2:
      case 3:
        if (typeof fn === 'function') {
          return eventOrFn.watch(function (payload) {
            return fn(store.getState(), payload, eventOrFn.getType());
          });
        } else throw new TypeError('watch requires function handler');

      default:
        if (typeof eventOrFn === 'function') {
          return _subscribe(eventOrFn);
        } else throw new TypeError('watch requires function handler');

    }
  }

  function stateSetter(_, payload) {
    return payload;
  }

  function setState(value, reduce) {
    var currentReducer = typeof reduce === 'function' ? reduce : stateSetter;
    var state = getState();
    var newResult = currentReducer(state, value);
    setter(state, newResult);
  }

  function setter(oldState, newState) {
    if (newState === undefined || newState === oldState) return;
    updater(newState);
  }

  function thru(fn) {
    return fn(store);
  }

  return store;
}

function getDisplayName(store) {
  if (store.compositeName) {
    return store.compositeName.fullName;
  }

  if (store.domainName) {
    return store.domainName.fullName;
  }

  return store.id;
}

function mapStore(store, fn, firstState) {
  if (__DEV__) perf.beginMark("Start ".concat(getDisplayName(store), " map (id: ").concat(store.id, ")"));
  var lastValue = store.getState();
  var lastResult = fn(lastValue, firstState);
  var innerStore = storeFabric({
    name: "".concat(store.shortName, " \u2192 *"),
    currentState: lastResult,
    parent: store.domainName
  });

  var computeCmd = _typedef.Step.single(Box.compute(function (_, newValue, ctx) {
    lastValue = newValue;
    var lastState = innerStore.getState();
    var result = fn(newValue, lastState);
    if (__DEV__) perf.endMark("Map ".concat(getDisplayName(store), " (id: ").concat(store.id, ")"), "Start ".concat(getDisplayName(store), " subscribe (id: ").concat(store.id, ")"));
    return result;
  }));

  var filterCmdPost = _typedef.Step.single(Box.filter(function (result, ctx) {
    var lastState = innerStore.getState();
    var isChanged = result !== lastState && result !== undefined;

    if (isChanged) {
      lastResult = result;
    }

    return isChanged;
  }));

  var nextSeq = _typedef.Step.seq([computeCmd, filterCmdPost].concat(_toConsumableArray(innerStore.graphite.seq.data)));

  store.graphite.next.data.push(nextSeq);

  var off = function off() {
    var i = store.graphite.next.data.indexOf(nextSeq);
    if (i === -1) return;
    store.graphite.next.data.splice(i, 1);
  };

  return innerStore;
}
},{"invariant":"2gTp","effector/perf":"FqNM","symbol-observable":"LkZ7","effector/event":"A6jS","effector/graphite/typedef":"3L3o","../kind":"RRwc","./setStoreName":"I4tw","../ref/createRef":"IxJB","./StepBox":"M9sN"}],"Zzgs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStore = createStore;

var _storeFabric = require("./storeFabric");

function createStore(state) {
  return (0, _storeFabric.storeFabric)({
    currentState: state
  });
}
},{"./storeFabric":"bCZr"}],"ZpTT":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStoreObject = createStoreObject;
exports.extract = extract;

var _typedef = require("effector/graphite/typedef");

var _event = require("effector/event");

var Kind = _interopRequireWildcard(require("../kind"));

var _storeFabric = require("./storeFabric");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function createStoreArray(obj) {
  var state = _toConsumableArray(obj);

  var stateNew = _toConsumableArray(obj);

  var updater = (0, _event.createEvent)("update ".concat(Math.random().toString()));
  var updates = [];

  var committer = function committer() {
    updates = [];
    return function () {
      var current = store.getState();

      for (var _i = 0; _i < updates.length; _i++) {
        var fn = updates[_i];
        current = fn(current);
      }

      commit = committer();
      updater(current);
    };
  };

  var commit = committer();
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var _step$value = _slicedToArray(_step.value, 2),
          key = _step$value[0],
          child = _step$value[1];

      if (Kind.isStore(child)) {
        var substore = child;

        var runCmd = _typedef.Cmd.run({
          runner: function runner(newValue) {}
        });

        runCmd.data.transactionContext = function (data) {
          updates.push(function (state) {
            var nextState = _toConsumableArray(state);

            nextState[key] = data;
            return nextState;
          });
          return commit;
        };

        stateNew[key] = substore.getState();
        substore.graphite.next.data.push(_typedef.Step.single(runCmd));
      }
    };

    for (var _iterator = state.map(function (e, i) {
      return [i, e];
    })[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var name = "combine(".concat(obj.map(function (store) {
    if (!Kind.isStore(store)) return store.toString();
    return (0, _storeFabric.getDisplayName)(store);
  }).join(', '), ")");
  var store = (0, _storeFabric.storeFabric)({
    name: name,
    currentState: stateNew
  }); //$todo

  store.defaultShape = obj;
  store.on(updater, function (_, payload) {
    return payload;
  });
  return store;
}

function createStoreObjectMap(obj) {
  var state = _objectSpread({}, obj);

  var stateNew = _objectSpread({}, obj);

  var updater = (0, _event.createEvent)("update ".concat(Math.random().toString()));
  var updates = [];

  var committer = function committer() {
    updates = [];
    return function () {
      var current = store.getState();

      for (var _i2 = 0; _i2 < updates.length; _i2++) {
        var fn = updates[_i2];
        current = fn(current);
      }

      commit = committer();
      updater(current);
    };
  };

  var commit = committer();

  var _arr2 = Object.entries(state);

  var _loop2 = function _loop2() {
    var _arr2$_i = _slicedToArray(_arr2[_i3], 2),
        key = _arr2$_i[0],
        child = _arr2$_i[1];

    if (!Kind.isStore(child)) return "continue";
    var substore = child;

    var runCmd = _typedef.Cmd.run({
      runner: function runner(newValue) {}
    });

    runCmd.data.transactionContext = function (data) {
      updates.push(function (state) {
        return _objectSpread({}, state, _defineProperty({}, key, data));
      }); // commit()

      return commit;
    };

    stateNew[key] = substore.getState();
    substore.graphite.next.data.push(_typedef.Step.single(runCmd));
  };

  for (var _i3 = 0; _i3 < _arr2.length; _i3++) {
    var _ret = _loop2();

    if (_ret === "continue") continue;
  }

  var name = "combine(".concat(Object.values(obj).map(function (store) {
    if (!Kind.isStore(store)) return store.toString();
    return (0, _storeFabric.getDisplayName)(store);
  }).join(', '), ")");
  var store = (0, _storeFabric.storeFabric)({
    name: name,
    currentState: stateNew
  }); //$todo

  store.defaultShape = obj;
  store.on(updater, function (_, payload) {
    return payload;
  });
  return store;
}

function createStoreObject(obj) {
  if (Array.isArray(obj)) {
    return createStoreArray(obj);
  }

  return createStoreObjectMap(obj);
}

function extract(store, extractor) {
  var result;
  if ('defaultShape' in store) result = extractor(store.defaultShape);else result = extractor(store.defaultState);
  return createStoreObject(result);
}
},{"effector/graphite/typedef":"3L3o","effector/event":"A6jS","../kind":"RRwc","./storeFabric":"bCZr"}],"CllD":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApi = createApi;

var _event = require("effector/event");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function createApi(store, setters) {
  var result = {};

  var _arr = Object.entries(setters);

  for (var _i = 0; _i < _arr.length; _i++) {
    var _arr$_i = _slicedToArray(_arr[_i], 2),
        key = _arr$_i[0],
        handler = _arr$_i[1];

    var event = (0, _event.createEvent)(key);
    store.on(event, handler);
    result[key] = event;
  }

  return result;
}
},{"effector/event":"A6jS"}],"o5xb":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.restoreObject = restoreObject;
exports.restoreEffect = restoreEffect;
exports.restoreEvent = restoreEvent;
exports.restore = restore;

var _createStore = require("./createStore");

var Kind = _interopRequireWildcard(require("effector/kind"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function restoreObject(obj) {
  var result = {};

  var _arr = Object.entries(obj);

  for (var _i = 0; _i < _arr.length; _i++) {
    var _arr$_i = _slicedToArray(_arr[_i], 2),
        _key = _arr$_i[0],
        value = _arr$_i[1];

    result[_key] = (0, _createStore.createStore)(value);
  }

  return result;
}

function restoreEffect(event, defaultState) {
  var store = (0, _createStore.createStore)(defaultState);
  store.on(event.done, function (_, _ref) {
    var result = _ref.result;
    return result;
  });
  return store;
}

function restoreEvent(event, defaultState) {
  var store = (0, _createStore.createStore)(defaultState);
  store.on(event, function (_, v) {
    return v;
  });
  return store;
}

function restore(obj, defaultState) {
  switch (Kind.readKind(obj)) {
    case Kind.STORE:
      return obj;

    case Kind.EVENT:
      return restoreEvent(obj, defaultState);

    case Kind.EFFECT:
      return restoreEffect(obj, defaultState);

    default:
      return restoreObject(obj);
  }
}
},{"./createStore":"Zzgs","effector/kind":"RRwc"}],"rMii":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "storeFabric", {
  enumerable: true,
  get: function () {
    return _storeFabric.storeFabric;
  }
});
Object.defineProperty(exports, "getDisplayName", {
  enumerable: true,
  get: function () {
    return _storeFabric.getDisplayName;
  }
});
Object.defineProperty(exports, "createStore", {
  enumerable: true,
  get: function () {
    return _createStore.createStore;
  }
});
Object.defineProperty(exports, "setStoreName", {
  enumerable: true,
  get: function () {
    return _setStoreName.setStoreName;
  }
});
Object.defineProperty(exports, "createStoreObject", {
  enumerable: true,
  get: function () {
    return _createStoreObject.createStoreObject;
  }
});
Object.defineProperty(exports, "extract", {
  enumerable: true,
  get: function () {
    return _createStoreObject.extract;
  }
});
Object.defineProperty(exports, "createApi", {
  enumerable: true,
  get: function () {
    return _createApi.createApi;
  }
});
Object.defineProperty(exports, "restore", {
  enumerable: true,
  get: function () {
    return _restore.restore;
  }
});
Object.defineProperty(exports, "restoreEvent", {
  enumerable: true,
  get: function () {
    return _restore.restoreEvent;
  }
});
Object.defineProperty(exports, "restoreEffect", {
  enumerable: true,
  get: function () {
    return _restore.restoreEffect;
  }
});
Object.defineProperty(exports, "restoreObject", {
  enumerable: true,
  get: function () {
    return _restore.restoreObject;
  }
});

var _storeFabric = require("./storeFabric");

var _createStore = require("./createStore");

var _setStoreName = require("./setStoreName");

var _createStoreObject = require("./createStoreObject");

var _createApi = require("./createApi");

var _restore = require("./restore");
},{"./storeFabric":"bCZr","./createStore":"Zzgs","./setStoreName":"I4tw","./createStoreObject":"ZpTT","./createApi":"CllD","./restore":"o5xb"}],"XNKx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combine = combine;

var _invariant = _interopRequireDefault(require("invariant"));

var _store = require("effector/store");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function combine() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  (0, _invariant.default)(args.length > 0, 'at least one argument required');
  var handler = args[args.length - 1];
  var stores = args.slice(0, -1);
  var structStore = (0, _store.createStoreObject)(stores);
  return structStore.map(function (list) {
    return handler.apply(void 0, _toConsumableArray(list));
  });
}
},{"invariant":"2gTp","effector/store":"rMii"}],"ujbe":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  combine: true
};
Object.defineProperty(exports, "combine", {
  enumerable: true,
  get: function () {
    return _combine.combine;
  }
});

var _combine = require("./combine");

var _index = require("./index.h");

Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index[key];
    }
  });
});
},{"./combine":"XNKx","./index.h":"fq6M"}],"XOCG":[function(require,module,exports) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';
/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var __DEV__ = "production" !== 'production';

var warning = function () {};

if (__DEV__) {
  var printWarning = function printWarning(format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);

    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });

    if (typeof console !== 'undefined') {
      console.error(message);
    }

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function (condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);

    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }

    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (!condition) {
      printWarning.apply(null, [format].concat(args));
    }
  };
}

module.exports = warning;
},{}],"LDyu":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exec = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var exec = function exec(args, cbs) {
  var syncError;
  /*:: = throwSymbol*/

  var req;
  /*:: = doneSymbol*/

  var successSync = false;
  var fpromise;

  try {
    req = cbs[2](args);
    successSync = true;
  } catch (err) {
    syncError = err;
  }

  if (successSync === false) {
    fpromise = new Promise(function (_, rj) {
      rj(syncError);
    });

    fpromise.cache = function () {
      return undefined;
    };

    var _anyway = Promise.resolve(undefined);

    fpromise.anyway = function () {
      return _anyway;
    };

    cbs[1]({
      error: syncError,
      params: args
    });
    return fpromise;
  }

  if (_typeof(req) === 'object' && req !== null && typeof req.then === 'function') {
    var then = req;
    fpromise = then.then(function (result) {
      fpromise.cache = function () {
        return result;
      };

      cbs[0]({
        result: result,
        params: args
      });
      return result;
    }, function (error) {
      cbs[1]({
        error: error,
        params: args
      });
      throw error;
    });

    var _anyway2 = fpromise.then(function () {}, function () {});

    fpromise.anyway = function () {
      return _anyway2;
    };

    return fpromise;
  }

  var done = req;
  fpromise = new Promise(function (rs) {
    rs(done);
  });

  fpromise.cache = function () {
    return done;
  };

  var anyway = Promise.resolve(undefined);

  fpromise.anyway = function () {
    return anyway;
  };

  cbs[0]({
    result: done,
    params: args
  });
  return fpromise;
};

exports.exec = exec;
},{}],"3Cnt":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callbacks = void 0;

var cbDone = function cbDone(value) {
  var cb = this[3];
  this.length = 0;
  cb(value);
};

var cbFail = function cbFail(value) {
  var cb = this[4];
  this.length = 0;
  cb(value);
};

var callbacks = function callbacks(thunk, onDone, onFail) {
  return [cbDone, cbFail, thunk, onDone, onFail];
};

exports.callbacks = callbacks;
},{}],"Jd9z":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.effectFabric = effectFabric;

var _warning = _interopRequireDefault(require("warning"));

var Kind = _interopRequireWildcard(require("../kind"));

var _event = require("effector/event");

var _exec = require("./exec");

var _callbacks = require("./callbacks");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import invariant from 'invariant'
function effectFabric(_ref) {
  var name = _ref.name,
      domainName = _ref.domainName,
      parent = _ref.parent,
      vertex = _ref.vertex;
  var instanceAsEvent = (0, _event.eventFabric)({
    name: name,
    parent: parent,
    vertex: vertex
  });
  var instance = instanceAsEvent;
  var eventCreate = instanceAsEvent.create;
  var done = (0, _event.eventFabric)({
    name: "".concat(instanceAsEvent.shortName, " done"),
    parent: parent,
    vertex: vertex.createChild(['event', "".concat(instanceAsEvent.shortName, " done")])
  });
  var fail = (0, _event.eventFabric)({
    name: "".concat(instanceAsEvent.shortName, " fail"),
    parent: parent,
    vertex: vertex.createChild(['event', "".concat(instanceAsEvent.shortName, " fail")])
  }); // instanceAsEvent.step.data.delete(instanceAsEvent.cmd)

  instance.done = done;
  instance.fail = fail;

  instance.use = function (fn) {
    thunk = fn;
  };

  instance.use.getCurrent = function () {
    return thunk;
  };

  instance.kind = Kind.EFFECT;

  instance.create = function (params) {
    eventCreate(params, instanceAsEvent.getType());
    return (0, _exec.exec)(params, (0, _callbacks.callbacks)(thunk, function (result) {
      return void done(result);
    }, function (error) {
      return void fail(error);
    }));
  };

  var thunk = function thunk(value) {
    (0, _warning.default)(false, "no thunk used in ".concat(instanceAsEvent.getType()));
    var result = Promise.resolve();
    return result;
  };

  return instance;
}
},{"warning":"XOCG","../kind":"RRwc","effector/event":"A6jS","./exec":"LDyu","./callbacks":"3Cnt"}],"F3Qw":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEffect = createEffect;

var _effectFabric = require("./effectFabric");

var _tarjan = require("effector/graphite/tarjan");

function createEffect(name) {
  return (0, _effectFabric.effectFabric)({
    name: name,
    domainName: '',
    vertex: new _tarjan.Vertex(['effect', name || ''])
  });
}
},{"./effectFabric":"Jd9z","effector/graphite/tarjan":"1ySN"}],"rJE3":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "effectFabric", {
  enumerable: true,
  get: function () {
    return _effectFabric.effectFabric;
  }
});
Object.defineProperty(exports, "createEffect", {
  enumerable: true,
  get: function () {
    return _createEffect.createEffect;
  }
});

var _effectFabric = require("./effectFabric");

var _createEffect = require("./createEffect");
},{"./effectFabric":"Jd9z","./createEffect":"F3Qw"}],"nlnQ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.domainHooks = domainHooks;
exports.DomainHistory = void 0;

var _event = require("effector/event");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DomainHistory = function DomainHistory() {
  _classCallCheck(this, DomainHistory);

  this.events = new Set();
  this.effects = new Set();
  this.storages = new Set();
  this.domains = new Set();
};

exports.DomainHistory = DomainHistory;

function domainHooks(history, compositeName, graph, parentHooks) {
  var hooks;

  if (parentHooks) {
    hooks = childDomainHooks(parentHooks);
  } else {
    hooks = singleDomainHooks(compositeName, graph);
  }

  hooks.domain.watch(function (domain) {
    history.domains.add(domain);
  });
  hooks.event.watch(function (event) {
    history.events.add(event);
  });
  hooks.store.watch(function (store) {
    history.storages.add(store);
  });
  hooks.effect.watch(function (effect) {
    history.effects.add(effect);
  });
  return hooks;
}

var singleDomainHooks = function singleDomainHooks(compositeName, graph) {
  var event = (0, _event.eventFabric)({
    name: "".concat(compositeName.fullName, " event hook"),
    parent: compositeName,
    vertex: graph.addNode(['event', "".concat(compositeName.fullName, " event hook")])
  });
  var effect = (0, _event.eventFabric)({
    name: "".concat(compositeName.fullName, " effect hook"),
    parent: compositeName,
    vertex: graph.addNode(['event', "".concat(compositeName.fullName, " effect hook")])
  });
  var store = (0, _event.eventFabric)({
    name: "".concat(compositeName.fullName, " store hook"),
    parent: compositeName,
    vertex: graph.addNode(['event', "".concat(compositeName.fullName, " store hook")])
  });
  var domain = (0, _event.eventFabric)({
    name: graph.addNode(['event', "".concat(compositeName.fullName, " domain hook")]),
    parent: compositeName,
    vertex: graph.addNode(['event', "".concat(compositeName.fullName, " domain hook")])
  });
  return {
    event: event,
    effect: effect,
    store: store,
    domain: domain
  };
};

var childDomainHooks = function childDomainHooks(parentHooks) {
  var event = parentHooks.event.prepend(function (_) {
    return _;
  });
  var effect = parentHooks.effect.prepend(function (_) {
    return _;
  });
  var store = parentHooks.store.prepend(function (_) {
    return _;
  });
  var domain = parentHooks.domain.prepend(function (_) {
    return _;
  });
  return {
    event: event,
    effect: effect,
    store: store,
    domain: domain
  };
};
},{"effector/event":"A6jS"}],"VIaP":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.domainFabric = domainFabric;

var _store = require("effector/store");

var _event = require("effector/event");

var _effect = require("effector/effect");

var _compositeName = require("../compositeName");

var _refcount = require("../refcount");

var _hook = require("./hook");

var _tarjan = require("effector/graphite/tarjan");

var nextId = (0, _refcount.stringRefcount)();

function domainFabric(nameRaw, parent, parentHooks) {
  var graph = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : new _tarjan.Graph();
  var id = nextId();
  var name = nameRaw || '';
  var compositeName = (0, _compositeName.createName)(name, parent);
  var history = new _hook.DomainHistory();
  var hooks = (0, _hook.domainHooks)(history, compositeName, graph, parentHooks);
  return {
    compositeName: compositeName,
    id: id,
    getType: function getType() {
      return compositeName.fullName;
    },
    onCreateEvent: function onCreateEvent(hook) {
      history.events.forEach(hook);
      return hooks.event.watch(hook);
    },
    onCreateEffect: function onCreateEffect(hook) {
      history.effects.forEach(hook);
      return hooks.effect.watch(hook);
    },
    onCreateStore: function onCreateStore(hook) {
      history.storages.forEach(hook);
      return hooks.store.watch(hook);
    },
    onCreateDomain: function onCreateDomain(hook) {
      history.domains.forEach(hook);
      return hooks.domain.watch(hook);
    },
    event: function event(name) {
      var vertex = graph.addNode(['event', compositeName.fullName]);
      var result = (0, _event.eventFabric)({
        name: name,
        parent: compositeName,
        vertex: vertex
      });
      hooks.event(result);
      return result;
    },
    effect: function effect(name) {
      var vertex = graph.addNode(['effect', compositeName.fullName]);
      var result = (0, _effect.effectFabric)({
        name: name,
        domainName: compositeName.fullName,
        parent: compositeName,
        vertex: vertex
      });
      hooks.effect(result);
      return result;
    },
    domain: function domain(name) {
      var result = domainFabric(name, compositeName, hooks, graph);
      hooks.domain(result);
      return result;
    },
    store: function store(state) {
      var result = (0, _store.storeFabric)({
        currentState: state,
        parent: compositeName
      });
      hooks.store(result);
      return result;
    }
  };
}
},{"effector/store":"rMii","effector/event":"A6jS","effector/effect":"rJE3","../compositeName":"Eeez","../refcount":"ZAbB","./hook":"nlnQ","effector/graphite/tarjan":"1ySN"}],"GkB0":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDomain = createDomain;

var _domainFabric = require("./domainFabric");

function createDomain(name) {
  return (0, _domainFabric.domainFabric)(name === undefined ? '' : name);
}
},{"./domainFabric":"VIaP"}],"BmNX":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "domainFabric", {
  enumerable: true,
  get: function () {
    return _domainFabric.domainFabric;
  }
});
Object.defineProperty(exports, "createDomain", {
  enumerable: true,
  get: function () {
    return _createDomain.createDomain;
  }
});

var _domainFabric = require("./domainFabric");

var _createDomain = require("./createDomain");
},{"./domainFabric":"VIaP","./createDomain":"GkB0"}],"Focm":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "combine", {
  enumerable: true,
  get: function () {
    return _effector.combine;
  }
});
Object.defineProperty(exports, "createDomain", {
  enumerable: true,
  get: function () {
    return _domain.createDomain;
  }
});
Object.defineProperty(exports, "createEvent", {
  enumerable: true,
  get: function () {
    return _event.createEvent;
  }
});
Object.defineProperty(exports, "createEffect", {
  enumerable: true,
  get: function () {
    return _effect.createEffect;
  }
});
Object.defineProperty(exports, "createStore", {
  enumerable: true,
  get: function () {
    return _store.createStore;
  }
});
Object.defineProperty(exports, "createStoreObject", {
  enumerable: true,
  get: function () {
    return _store.createStoreObject;
  }
});
Object.defineProperty(exports, "setStoreName", {
  enumerable: true,
  get: function () {
    return _store.setStoreName;
  }
});
Object.defineProperty(exports, "extract", {
  enumerable: true,
  get: function () {
    return _store.extract;
  }
});
Object.defineProperty(exports, "createApi", {
  enumerable: true,
  get: function () {
    return _store.createApi;
  }
});
Object.defineProperty(exports, "restore", {
  enumerable: true,
  get: function () {
    return _store.restore;
  }
});
Object.defineProperty(exports, "restoreEvent", {
  enumerable: true,
  get: function () {
    return _store.restoreEvent;
  }
});
Object.defineProperty(exports, "restoreEffect", {
  enumerable: true,
  get: function () {
    return _store.restoreEffect;
  }
});
Object.defineProperty(exports, "restoreObject", {
  enumerable: true,
  get: function () {
    return _store.restoreObject;
  }
});

var _effector = require("./effector");

var _domain = require("effector/domain");

var _event = require("effector/event");

var _effect = require("effector/effect");

var _store = require("effector/store");
},{"./effector":"ujbe","effector/domain":"BmNX","effector/event":"A6jS","effector/effect":"rJE3","effector/store":"rMii"}]},{},["Focm"], "effector")