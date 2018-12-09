var suite = (function (exports) {
	'use strict';

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var global$1 = typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};

	// based off https://github.com/defunctzombie/node-process/blob/master/browser.js

	function defaultSetTimout() {
	  throw new Error('setTimeout has not been defined');
	}

	function defaultClearTimeout() {
	  throw new Error('clearTimeout has not been defined');
	}

	var cachedSetTimeout = defaultSetTimout;
	var cachedClearTimeout = defaultClearTimeout;

	if (typeof global$1.setTimeout === 'function') {
	  cachedSetTimeout = setTimeout;
	}

	if (typeof global$1.clearTimeout === 'function') {
	  cachedClearTimeout = clearTimeout;
	}

	function runTimeout(fun) {
	  if (cachedSetTimeout === setTimeout) {
	    //normal enviroments in sane situations
	    return setTimeout(fun, 0);
	  } // if setTimeout wasn't available but was latter defined


	  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	    cachedSetTimeout = setTimeout;
	    return setTimeout(fun, 0);
	  }

	  try {
	    // when when somebody has screwed with setTimeout but no I.E. maddness
	    return cachedSetTimeout(fun, 0);
	  } catch (e) {
	    try {
	      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	      return cachedSetTimeout.call(null, fun, 0);
	    } catch (e) {
	      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	      return cachedSetTimeout.call(this, fun, 0);
	    }
	  }
	}

	function runClearTimeout(marker) {
	  if (cachedClearTimeout === clearTimeout) {
	    //normal enviroments in sane situations
	    return clearTimeout(marker);
	  } // if clearTimeout wasn't available but was latter defined


	  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	    cachedClearTimeout = clearTimeout;
	    return clearTimeout(marker);
	  }

	  try {
	    // when when somebody has screwed with setTimeout but no I.E. maddness
	    return cachedClearTimeout(marker);
	  } catch (e) {
	    try {
	      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	      return cachedClearTimeout.call(null, marker);
	    } catch (e) {
	      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	      return cachedClearTimeout.call(this, marker);
	    }
	  }
	}

	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	  if (!draining || !currentQueue) {
	    return;
	  }

	  draining = false;

	  if (currentQueue.length) {
	    queue = currentQueue.concat(queue);
	  } else {
	    queueIndex = -1;
	  }

	  if (queue.length) {
	    drainQueue();
	  }
	}

	function drainQueue() {
	  if (draining) {
	    return;
	  }

	  var timeout = runTimeout(cleanUpNextTick);
	  draining = true;
	  var len = queue.length;

	  while (len) {
	    currentQueue = queue;
	    queue = [];

	    while (++queueIndex < len) {
	      if (currentQueue) {
	        currentQueue[queueIndex].run();
	      }
	    }

	    queueIndex = -1;
	    len = queue.length;
	  }

	  currentQueue = null;
	  draining = false;
	  runClearTimeout(timeout);
	}

	function nextTick(fun) {
	  var args = new Array(arguments.length - 1);

	  if (arguments.length > 1) {
	    for (var i = 1; i < arguments.length; i++) {
	      args[i - 1] = arguments[i];
	    }
	  }

	  queue.push(new Item(fun, args));

	  if (queue.length === 1 && !draining) {
	    runTimeout(drainQueue);
	  }
	} // v8 likes predictible objects

	function Item(fun, array) {
	  this.fun = fun;
	  this.array = array;
	}

	Item.prototype.run = function () {
	  this.fun.apply(null, this.array);
	};

	var title = 'browser';
	var platform = 'browser';
	var browser = true;
	var env = {};
	var argv = [];
	var version = ''; // empty string to avoid regexp issues

	var versions = {};
	var release = {};
	var config = {};

	function noop() {}

	var on = noop;
	var addListener = noop;
	var once = noop;
	var off = noop;
	var removeListener = noop;
	var removeAllListeners = noop;
	var emit = noop;
	function binding(name) {
	  throw new Error('process.binding is not supported');
	}
	function cwd() {
	  return '/';
	}
	function chdir(dir) {
	  throw new Error('process.chdir is not supported');
	}
	function umask() {
	  return 0;
	} // from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js

	var performance = global$1.performance || {};

	var performanceNow = performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function () {
	  return new Date().getTime();
	}; // generate timestamp or delta
	// see http://nodejs.org/api/process.html#process_process_hrtime


	function hrtime(previousTimestamp) {
	  var clocktime = performanceNow.call(performance) * 1e-3;
	  var seconds = Math.floor(clocktime);
	  var nanoseconds = Math.floor(clocktime % 1 * 1e9);

	  if (previousTimestamp) {
	    seconds = seconds - previousTimestamp[0];
	    nanoseconds = nanoseconds - previousTimestamp[1];

	    if (nanoseconds < 0) {
	      seconds--;
	      nanoseconds += 1e9;
	    }
	  }

	  return [seconds, nanoseconds];
	}
	var startTime = new Date();
	function uptime() {
	  var currentTime = new Date();
	  var dif = currentTime - startTime;
	  return dif / 1000;
	}
	var process = {
	  nextTick: nextTick,
	  title: title,
	  browser: browser,
	  env: env,
	  argv: argv,
	  version: version,
	  versions: versions,
	  on: on,
	  addListener: addListener,
	  once: once,
	  off: off,
	  removeListener: removeListener,
	  removeAllListeners: removeAllListeners,
	  emit: emit,
	  binding: binding,
	  cwd: cwd,
	  chdir: chdir,
	  umask: umask,
	  hrtime: hrtime,
	  platform: platform,
	  release: release,
	  config: config,
	  uptime: uptime
	};

	const escapeStringRegexp = require('escape-string-regexp');

	const ansiStyles = require('ansi-styles');

	const stdoutColor = require('supports-color').stdout;

	const template = require("./templates.js");

	const levelMapping = ['ansi', 'ansi', 'ansi256', 'ansi16m']; // `color-convert` models to exclude from the Chalk API due to conflicts and such

	const skipModels = new Set(['gray']);
	const styles = Object.create(null);

	function applyOptions(obj, options) {
	  options = options || {}; // Detect level if not set manually

	  const scLevel = stdoutColor ? stdoutColor.level : 0;
	  obj.level = options.level === undefined ? scLevel : options.level;
	  obj.enabled = 'enabled' in options ? options.enabled : obj.level > 0;
	}

	function Chalk(options) {
	  // We check for this.template here since calling `chalk.constructor()`
	  // by itself will have a `this` of a previously constructed chalk object
	  if (!this || !(this instanceof Chalk) || this.template) {
	    const chalk = {};
	    applyOptions(chalk, options);

	    chalk.template = function () {
	      const args = [].slice.call(arguments);
	      return chalkTag.apply(null, [chalk.template].concat(args));
	    };

	    Object.setPrototypeOf(chalk, Chalk.prototype);
	    Object.setPrototypeOf(chalk.template, chalk);
	    chalk.template.constructor = Chalk;
	    return chalk.template;
	  }

	  applyOptions(this, options);
	} // Use bright blue on Windows as the normal blue color is illegible

	for (const key of Object.keys(ansiStyles)) {
	  ansiStyles[key].closeRe = new RegExp(escapeStringRegexp(ansiStyles[key].close), 'g');
	  styles[key] = {
	    get() {
	      const codes = ansiStyles[key];
	      return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, key);
	    }

	  };
	}

	styles.visible = {
	  get() {
	    return build.call(this, this._styles || [], true, 'visible');
	  }

	};
	ansiStyles.color.closeRe = new RegExp(escapeStringRegexp(ansiStyles.color.close), 'g');

	for (const model of Object.keys(ansiStyles.color.ansi)) {
	  if (skipModels.has(model)) {
	    continue;
	  }

	  styles[model] = {
	    get() {
	      const level = this.level;
	      return function () {
	        const open = ansiStyles.color[levelMapping[level]][model].apply(null, arguments);
	        const codes = {
	          open,
	          close: ansiStyles.color.close,
	          closeRe: ansiStyles.color.closeRe
	        };
	        return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, model);
	      };
	    }

	  };
	}

	ansiStyles.bgColor.closeRe = new RegExp(escapeStringRegexp(ansiStyles.bgColor.close), 'g');

	for (const model of Object.keys(ansiStyles.bgColor.ansi)) {
	  if (skipModels.has(model)) {
	    continue;
	  }

	  const bgModel = 'bg' + model[0].toUpperCase() + model.slice(1);
	  styles[bgModel] = {
	    get() {
	      const level = this.level;
	      return function () {
	        const open = ansiStyles.bgColor[levelMapping[level]][model].apply(null, arguments);
	        const codes = {
	          open,
	          close: ansiStyles.bgColor.close,
	          closeRe: ansiStyles.bgColor.closeRe
	        };
	        return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, model);
	      };
	    }

	  };
	}

	const proto = Object.defineProperties(() => {}, styles);

	function build(_styles, _empty, key) {
	  const builder = function () {
	    return applyStyle.apply(builder, arguments);
	  };

	  builder._styles = _styles;
	  builder._empty = _empty;
	  const self = this;
	  Object.defineProperty(builder, 'level', {
	    enumerable: true,

	    get() {
	      return self.level;
	    },

	    set(level) {
	      self.level = level;
	    }

	  });
	  Object.defineProperty(builder, 'enabled', {
	    enumerable: true,

	    get() {
	      return self.enabled;
	    },

	    set(enabled) {
	      self.enabled = enabled;
	    }

	  }); // See below for fix regarding invisible grey/dim combination on Windows

	  builder.hasGrey = this.hasGrey || key === 'gray' || key === 'grey'; // `__proto__` is used because we must return a function, but there is
	  // no way to create a function with a different prototype

	  builder.__proto__ = proto; // eslint-disable-line no-proto

	  return builder;
	}

	function applyStyle() {
	  // Support varags, but simply cast to string in case there's only one arg
	  const args = arguments;
	  const argsLen = args.length;
	  let str = String(arguments[0]);

	  if (argsLen === 0) {
	    return '';
	  }

	  if (argsLen > 1) {
	    // Don't slice `arguments`, it prevents V8 optimizations
	    for (let a = 1; a < argsLen; a++) {
	      str += ' ' + args[a];
	    }
	  }

	  if (!this.enabled || this.level <= 0 || !str) {
	    return this._empty ? '' : str;
	  } // Turns out that on Windows dimmed gray text becomes invisible in cmd.exe,
	  // see https://github.com/chalk/chalk/issues/58
	  // If we're on Windows and we're dealing with a gray color, temporarily make 'dim' a noop.


	  const originalDim = ansiStyles.dim.open;

	  for (const code of this._styles.slice().reverse()) {
	    // Replace any instances already present with a re-opening code
	    // otherwise only the part of the string until said closing code
	    // will be colored, and the rest will simply be 'plain'.
	    str = code.open + str.replace(code.closeRe, code.open) + code.close; // Close the styling before a linebreak and reopen
	    // after next line to fix a bleed issue on macOS
	    // https://github.com/chalk/chalk/pull/92

	    str = str.replace(/\r?\n/g, `${code.close}$&${code.open}`);
	  } // Reset the original `dim` if we changed it to work around the Windows dimmed gray issue


	  ansiStyles.dim.open = originalDim;
	  return str;
	}

	function chalkTag(chalk, strings) {
	  if (!Array.isArray(strings)) {
	    // If chalk() was called by itself or with a string,
	    // return the string itself as a string.
	    return [].slice.call(arguments, 1).join(' ');
	  }

	  const args = [].slice.call(arguments, 2);
	  const parts = [strings.raw[0]];

	  for (let i = 1; i < strings.length; i++) {
	    parts.push(String(args[i - 1]).replace(/[{}\\]/g, '\\$&'));
	    parts.push(String(strings.raw[i]));
	  }

	  return template(chalk, parts.join(''));
	}

	Object.defineProperties(Chalk.prototype, styles);
	module.exports = Chalk(); // eslint-disable-line new-cap

	module.exports.supportsColor = stdoutColor;
	module.exports.default = module.exports; // For TypeScript

	var chalk = /*#__PURE__*/Object.freeze({

	});

	/**
	 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */
	// and `typeof null`

	const getType = value => {
	  if (value === undefined) {
	    return 'undefined';
	  } else if (value === null) {
	    return 'null';
	  } else if (Array.isArray(value)) {
	    return 'array';
	  } else if (typeof value === 'boolean') {
	    return 'boolean';
	  } else if (typeof value === 'function') {
	    return 'function';
	  } else if (typeof value === 'number') {
	    return 'number';
	  } else if (typeof value === 'string') {
	    return 'string';
	  } else if (typeof value === 'object') {
	    if (value.constructor === RegExp) {
	      return 'regexp';
	    } else if (value.constructor === Map) {
	      return 'map';
	    } else if (value.constructor === Set) {
	      return 'set';
	    } else if (value.constructor === Date) {
	      return 'date';
	    }

	    return 'object'; // $FlowFixMe https://github.com/facebook/flow/issues/1015
	  } else if (typeof value === 'symbol') {
	    return 'symbol';
	  }

	  throw new Error(`value of unknown type: ${value}`);
	};

	var build$1 = getType;

	var colorName = {
	  "aliceblue": [240, 248, 255],
	  "antiquewhite": [250, 235, 215],
	  "aqua": [0, 255, 255],
	  "aquamarine": [127, 255, 212],
	  "azure": [240, 255, 255],
	  "beige": [245, 245, 220],
	  "bisque": [255, 228, 196],
	  "black": [0, 0, 0],
	  "blanchedalmond": [255, 235, 205],
	  "blue": [0, 0, 255],
	  "blueviolet": [138, 43, 226],
	  "brown": [165, 42, 42],
	  "burlywood": [222, 184, 135],
	  "cadetblue": [95, 158, 160],
	  "chartreuse": [127, 255, 0],
	  "chocolate": [210, 105, 30],
	  "coral": [255, 127, 80],
	  "cornflowerblue": [100, 149, 237],
	  "cornsilk": [255, 248, 220],
	  "crimson": [220, 20, 60],
	  "cyan": [0, 255, 255],
	  "darkblue": [0, 0, 139],
	  "darkcyan": [0, 139, 139],
	  "darkgoldenrod": [184, 134, 11],
	  "darkgray": [169, 169, 169],
	  "darkgreen": [0, 100, 0],
	  "darkgrey": [169, 169, 169],
	  "darkkhaki": [189, 183, 107],
	  "darkmagenta": [139, 0, 139],
	  "darkolivegreen": [85, 107, 47],
	  "darkorange": [255, 140, 0],
	  "darkorchid": [153, 50, 204],
	  "darkred": [139, 0, 0],
	  "darksalmon": [233, 150, 122],
	  "darkseagreen": [143, 188, 143],
	  "darkslateblue": [72, 61, 139],
	  "darkslategray": [47, 79, 79],
	  "darkslategrey": [47, 79, 79],
	  "darkturquoise": [0, 206, 209],
	  "darkviolet": [148, 0, 211],
	  "deeppink": [255, 20, 147],
	  "deepskyblue": [0, 191, 255],
	  "dimgray": [105, 105, 105],
	  "dimgrey": [105, 105, 105],
	  "dodgerblue": [30, 144, 255],
	  "firebrick": [178, 34, 34],
	  "floralwhite": [255, 250, 240],
	  "forestgreen": [34, 139, 34],
	  "fuchsia": [255, 0, 255],
	  "gainsboro": [220, 220, 220],
	  "ghostwhite": [248, 248, 255],
	  "gold": [255, 215, 0],
	  "goldenrod": [218, 165, 32],
	  "gray": [128, 128, 128],
	  "green": [0, 128, 0],
	  "greenyellow": [173, 255, 47],
	  "grey": [128, 128, 128],
	  "honeydew": [240, 255, 240],
	  "hotpink": [255, 105, 180],
	  "indianred": [205, 92, 92],
	  "indigo": [75, 0, 130],
	  "ivory": [255, 255, 240],
	  "khaki": [240, 230, 140],
	  "lavender": [230, 230, 250],
	  "lavenderblush": [255, 240, 245],
	  "lawngreen": [124, 252, 0],
	  "lemonchiffon": [255, 250, 205],
	  "lightblue": [173, 216, 230],
	  "lightcoral": [240, 128, 128],
	  "lightcyan": [224, 255, 255],
	  "lightgoldenrodyellow": [250, 250, 210],
	  "lightgray": [211, 211, 211],
	  "lightgreen": [144, 238, 144],
	  "lightgrey": [211, 211, 211],
	  "lightpink": [255, 182, 193],
	  "lightsalmon": [255, 160, 122],
	  "lightseagreen": [32, 178, 170],
	  "lightskyblue": [135, 206, 250],
	  "lightslategray": [119, 136, 153],
	  "lightslategrey": [119, 136, 153],
	  "lightsteelblue": [176, 196, 222],
	  "lightyellow": [255, 255, 224],
	  "lime": [0, 255, 0],
	  "limegreen": [50, 205, 50],
	  "linen": [250, 240, 230],
	  "magenta": [255, 0, 255],
	  "maroon": [128, 0, 0],
	  "mediumaquamarine": [102, 205, 170],
	  "mediumblue": [0, 0, 205],
	  "mediumorchid": [186, 85, 211],
	  "mediumpurple": [147, 112, 219],
	  "mediumseagreen": [60, 179, 113],
	  "mediumslateblue": [123, 104, 238],
	  "mediumspringgreen": [0, 250, 154],
	  "mediumturquoise": [72, 209, 204],
	  "mediumvioletred": [199, 21, 133],
	  "midnightblue": [25, 25, 112],
	  "mintcream": [245, 255, 250],
	  "mistyrose": [255, 228, 225],
	  "moccasin": [255, 228, 181],
	  "navajowhite": [255, 222, 173],
	  "navy": [0, 0, 128],
	  "oldlace": [253, 245, 230],
	  "olive": [128, 128, 0],
	  "olivedrab": [107, 142, 35],
	  "orange": [255, 165, 0],
	  "orangered": [255, 69, 0],
	  "orchid": [218, 112, 214],
	  "palegoldenrod": [238, 232, 170],
	  "palegreen": [152, 251, 152],
	  "paleturquoise": [175, 238, 238],
	  "palevioletred": [219, 112, 147],
	  "papayawhip": [255, 239, 213],
	  "peachpuff": [255, 218, 185],
	  "peru": [205, 133, 63],
	  "pink": [255, 192, 203],
	  "plum": [221, 160, 221],
	  "powderblue": [176, 224, 230],
	  "purple": [128, 0, 128],
	  "rebeccapurple": [102, 51, 153],
	  "red": [255, 0, 0],
	  "rosybrown": [188, 143, 143],
	  "royalblue": [65, 105, 225],
	  "saddlebrown": [139, 69, 19],
	  "salmon": [250, 128, 114],
	  "sandybrown": [244, 164, 96],
	  "seagreen": [46, 139, 87],
	  "seashell": [255, 245, 238],
	  "sienna": [160, 82, 45],
	  "silver": [192, 192, 192],
	  "skyblue": [135, 206, 235],
	  "slateblue": [106, 90, 205],
	  "slategray": [112, 128, 144],
	  "slategrey": [112, 128, 144],
	  "snow": [255, 250, 250],
	  "springgreen": [0, 255, 127],
	  "steelblue": [70, 130, 180],
	  "tan": [210, 180, 140],
	  "teal": [0, 128, 128],
	  "thistle": [216, 191, 216],
	  "tomato": [255, 99, 71],
	  "turquoise": [64, 224, 208],
	  "violet": [238, 130, 238],
	  "wheat": [245, 222, 179],
	  "white": [255, 255, 255],
	  "whitesmoke": [245, 245, 245],
	  "yellow": [255, 255, 0],
	  "yellowgreen": [154, 205, 50]
	};

	var conversions = createCommonjsModule(function (module) {
	/* MIT license */
	 // NOTE: conversions should only return primitive values (i.e. arrays, or
	//       values that give correct `typeof` results).
	//       do not use box values types (i.e. Number(), String(), etc.)


	var reverseKeywords = {};

	for (var key in colorName) {
	  if (colorName.hasOwnProperty(key)) {
	    reverseKeywords[colorName[key]] = key;
	  }
	}

	var convert = module.exports = {
	  rgb: {
	    channels: 3,
	    labels: 'rgb'
	  },
	  hsl: {
	    channels: 3,
	    labels: 'hsl'
	  },
	  hsv: {
	    channels: 3,
	    labels: 'hsv'
	  },
	  hwb: {
	    channels: 3,
	    labels: 'hwb'
	  },
	  cmyk: {
	    channels: 4,
	    labels: 'cmyk'
	  },
	  xyz: {
	    channels: 3,
	    labels: 'xyz'
	  },
	  lab: {
	    channels: 3,
	    labels: 'lab'
	  },
	  lch: {
	    channels: 3,
	    labels: 'lch'
	  },
	  hex: {
	    channels: 1,
	    labels: ['hex']
	  },
	  keyword: {
	    channels: 1,
	    labels: ['keyword']
	  },
	  ansi16: {
	    channels: 1,
	    labels: ['ansi16']
	  },
	  ansi256: {
	    channels: 1,
	    labels: ['ansi256']
	  },
	  hcg: {
	    channels: 3,
	    labels: ['h', 'c', 'g']
	  },
	  apple: {
	    channels: 3,
	    labels: ['r16', 'g16', 'b16']
	  },
	  gray: {
	    channels: 1,
	    labels: ['gray']
	  }
	}; // hide .channels and .labels properties

	for (var model in convert) {
	  if (convert.hasOwnProperty(model)) {
	    if (!('channels' in convert[model])) {
	      throw new Error('missing channels property: ' + model);
	    }

	    if (!('labels' in convert[model])) {
	      throw new Error('missing channel labels property: ' + model);
	    }

	    if (convert[model].labels.length !== convert[model].channels) {
	      throw new Error('channel and label counts mismatch: ' + model);
	    }

	    var channels = convert[model].channels;
	    var labels = convert[model].labels;
	    delete convert[model].channels;
	    delete convert[model].labels;
	    Object.defineProperty(convert[model], 'channels', {
	      value: channels
	    });
	    Object.defineProperty(convert[model], 'labels', {
	      value: labels
	    });
	  }
	}

	convert.rgb.hsl = function (rgb) {
	  var r = rgb[0] / 255;
	  var g = rgb[1] / 255;
	  var b = rgb[2] / 255;
	  var min = Math.min(r, g, b);
	  var max = Math.max(r, g, b);
	  var delta = max - min;
	  var h;
	  var s;
	  var l;

	  if (max === min) {
	    h = 0;
	  } else if (r === max) {
	    h = (g - b) / delta;
	  } else if (g === max) {
	    h = 2 + (b - r) / delta;
	  } else if (b === max) {
	    h = 4 + (r - g) / delta;
	  }

	  h = Math.min(h * 60, 360);

	  if (h < 0) {
	    h += 360;
	  }

	  l = (min + max) / 2;

	  if (max === min) {
	    s = 0;
	  } else if (l <= 0.5) {
	    s = delta / (max + min);
	  } else {
	    s = delta / (2 - max - min);
	  }

	  return [h, s * 100, l * 100];
	};

	convert.rgb.hsv = function (rgb) {
	  var r = rgb[0];
	  var g = rgb[1];
	  var b = rgb[2];
	  var min = Math.min(r, g, b);
	  var max = Math.max(r, g, b);
	  var delta = max - min;
	  var h;
	  var s;
	  var v;

	  if (max === 0) {
	    s = 0;
	  } else {
	    s = delta / max * 1000 / 10;
	  }

	  if (max === min) {
	    h = 0;
	  } else if (r === max) {
	    h = (g - b) / delta;
	  } else if (g === max) {
	    h = 2 + (b - r) / delta;
	  } else if (b === max) {
	    h = 4 + (r - g) / delta;
	  }

	  h = Math.min(h * 60, 360);

	  if (h < 0) {
	    h += 360;
	  }

	  v = max / 255 * 1000 / 10;
	  return [h, s, v];
	};

	convert.rgb.hwb = function (rgb) {
	  var r = rgb[0];
	  var g = rgb[1];
	  var b = rgb[2];
	  var h = convert.rgb.hsl(rgb)[0];
	  var w = 1 / 255 * Math.min(r, Math.min(g, b));
	  b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
	  return [h, w * 100, b * 100];
	};

	convert.rgb.cmyk = function (rgb) {
	  var r = rgb[0] / 255;
	  var g = rgb[1] / 255;
	  var b = rgb[2] / 255;
	  var c;
	  var m;
	  var y;
	  var k;
	  k = Math.min(1 - r, 1 - g, 1 - b);
	  c = (1 - r - k) / (1 - k) || 0;
	  m = (1 - g - k) / (1 - k) || 0;
	  y = (1 - b - k) / (1 - k) || 0;
	  return [c * 100, m * 100, y * 100, k * 100];
	};
	/**
	 * See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
	 * */


	function comparativeDistance(x, y) {
	  return Math.pow(x[0] - y[0], 2) + Math.pow(x[1] - y[1], 2) + Math.pow(x[2] - y[2], 2);
	}

	convert.rgb.keyword = function (rgb) {
	  var reversed = reverseKeywords[rgb];

	  if (reversed) {
	    return reversed;
	  }

	  var currentClosestDistance = Infinity;
	  var currentClosestKeyword;

	  for (var keyword in colorName) {
	    if (colorName.hasOwnProperty(keyword)) {
	      var value = colorName[keyword]; // Compute comparative distance

	      var distance = comparativeDistance(rgb, value); // Check if its less, if so set as closest

	      if (distance < currentClosestDistance) {
	        currentClosestDistance = distance;
	        currentClosestKeyword = keyword;
	      }
	    }
	  }

	  return currentClosestKeyword;
	};

	convert.keyword.rgb = function (keyword) {
	  return colorName[keyword];
	};

	convert.rgb.xyz = function (rgb) {
	  var r = rgb[0] / 255;
	  var g = rgb[1] / 255;
	  var b = rgb[2] / 255; // assume sRGB

	  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
	  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
	  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
	  var x = r * 0.4124 + g * 0.3576 + b * 0.1805;
	  var y = r * 0.2126 + g * 0.7152 + b * 0.0722;
	  var z = r * 0.0193 + g * 0.1192 + b * 0.9505;
	  return [x * 100, y * 100, z * 100];
	};

	convert.rgb.lab = function (rgb) {
	  var xyz = convert.rgb.xyz(rgb);
	  var x = xyz[0];
	  var y = xyz[1];
	  var z = xyz[2];
	  var l;
	  var a;
	  var b;
	  x /= 95.047;
	  y /= 100;
	  z /= 108.883;
	  x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
	  y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
	  z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
	  l = 116 * y - 16;
	  a = 500 * (x - y);
	  b = 200 * (y - z);
	  return [l, a, b];
	};

	convert.hsl.rgb = function (hsl) {
	  var h = hsl[0] / 360;
	  var s = hsl[1] / 100;
	  var l = hsl[2] / 100;
	  var t1;
	  var t2;
	  var t3;
	  var rgb;
	  var val;

	  if (s === 0) {
	    val = l * 255;
	    return [val, val, val];
	  }

	  if (l < 0.5) {
	    t2 = l * (1 + s);
	  } else {
	    t2 = l + s - l * s;
	  }

	  t1 = 2 * l - t2;
	  rgb = [0, 0, 0];

	  for (var i = 0; i < 3; i++) {
	    t3 = h + 1 / 3 * -(i - 1);

	    if (t3 < 0) {
	      t3++;
	    }

	    if (t3 > 1) {
	      t3--;
	    }

	    if (6 * t3 < 1) {
	      val = t1 + (t2 - t1) * 6 * t3;
	    } else if (2 * t3 < 1) {
	      val = t2;
	    } else if (3 * t3 < 2) {
	      val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
	    } else {
	      val = t1;
	    }

	    rgb[i] = val * 255;
	  }

	  return rgb;
	};

	convert.hsl.hsv = function (hsl) {
	  var h = hsl[0];
	  var s = hsl[1] / 100;
	  var l = hsl[2] / 100;
	  var smin = s;
	  var lmin = Math.max(l, 0.01);
	  var sv;
	  var v;
	  l *= 2;
	  s *= l <= 1 ? l : 2 - l;
	  smin *= lmin <= 1 ? lmin : 2 - lmin;
	  v = (l + s) / 2;
	  sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
	  return [h, sv * 100, v * 100];
	};

	convert.hsv.rgb = function (hsv) {
	  var h = hsv[0] / 60;
	  var s = hsv[1] / 100;
	  var v = hsv[2] / 100;
	  var hi = Math.floor(h) % 6;
	  var f = h - Math.floor(h);
	  var p = 255 * v * (1 - s);
	  var q = 255 * v * (1 - s * f);
	  var t = 255 * v * (1 - s * (1 - f));
	  v *= 255;

	  switch (hi) {
	    case 0:
	      return [v, t, p];

	    case 1:
	      return [q, v, p];

	    case 2:
	      return [p, v, t];

	    case 3:
	      return [p, q, v];

	    case 4:
	      return [t, p, v];

	    case 5:
	      return [v, p, q];
	  }
	};

	convert.hsv.hsl = function (hsv) {
	  var h = hsv[0];
	  var s = hsv[1] / 100;
	  var v = hsv[2] / 100;
	  var vmin = Math.max(v, 0.01);
	  var lmin;
	  var sl;
	  var l;
	  l = (2 - s) * v;
	  lmin = (2 - s) * vmin;
	  sl = s * vmin;
	  sl /= lmin <= 1 ? lmin : 2 - lmin;
	  sl = sl || 0;
	  l /= 2;
	  return [h, sl * 100, l * 100];
	}; // http://dev.w3.org/csswg/css-color/#hwb-to-rgb


	convert.hwb.rgb = function (hwb) {
	  var h = hwb[0] / 360;
	  var wh = hwb[1] / 100;
	  var bl = hwb[2] / 100;
	  var ratio = wh + bl;
	  var i;
	  var v;
	  var f;
	  var n; // wh + bl cant be > 1

	  if (ratio > 1) {
	    wh /= ratio;
	    bl /= ratio;
	  }

	  i = Math.floor(6 * h);
	  v = 1 - bl;
	  f = 6 * h - i;

	  if ((i & 0x01) !== 0) {
	    f = 1 - f;
	  }

	  n = wh + f * (v - wh); // linear interpolation

	  var r;
	  var g;
	  var b;

	  switch (i) {
	    default:
	    case 6:
	    case 0:
	      r = v;
	      g = n;
	      b = wh;
	      break;

	    case 1:
	      r = n;
	      g = v;
	      b = wh;
	      break;

	    case 2:
	      r = wh;
	      g = v;
	      b = n;
	      break;

	    case 3:
	      r = wh;
	      g = n;
	      b = v;
	      break;

	    case 4:
	      r = n;
	      g = wh;
	      b = v;
	      break;

	    case 5:
	      r = v;
	      g = wh;
	      b = n;
	      break;
	  }

	  return [r * 255, g * 255, b * 255];
	};

	convert.cmyk.rgb = function (cmyk) {
	  var c = cmyk[0] / 100;
	  var m = cmyk[1] / 100;
	  var y = cmyk[2] / 100;
	  var k = cmyk[3] / 100;
	  var r;
	  var g;
	  var b;
	  r = 1 - Math.min(1, c * (1 - k) + k);
	  g = 1 - Math.min(1, m * (1 - k) + k);
	  b = 1 - Math.min(1, y * (1 - k) + k);
	  return [r * 255, g * 255, b * 255];
	};

	convert.xyz.rgb = function (xyz) {
	  var x = xyz[0] / 100;
	  var y = xyz[1] / 100;
	  var z = xyz[2] / 100;
	  var r;
	  var g;
	  var b;
	  r = x * 3.2406 + y * -1.5372 + z * -0.4986;
	  g = x * -0.9689 + y * 1.8758 + z * 0.0415;
	  b = x * 0.0557 + y * -0.2040 + z * 1.0570; // assume sRGB

	  r = r > 0.0031308 ? 1.055 * Math.pow(r, 1.0 / 2.4) - 0.055 : r * 12.92;
	  g = g > 0.0031308 ? 1.055 * Math.pow(g, 1.0 / 2.4) - 0.055 : g * 12.92;
	  b = b > 0.0031308 ? 1.055 * Math.pow(b, 1.0 / 2.4) - 0.055 : b * 12.92;
	  r = Math.min(Math.max(0, r), 1);
	  g = Math.min(Math.max(0, g), 1);
	  b = Math.min(Math.max(0, b), 1);
	  return [r * 255, g * 255, b * 255];
	};

	convert.xyz.lab = function (xyz) {
	  var x = xyz[0];
	  var y = xyz[1];
	  var z = xyz[2];
	  var l;
	  var a;
	  var b;
	  x /= 95.047;
	  y /= 100;
	  z /= 108.883;
	  x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
	  y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
	  z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
	  l = 116 * y - 16;
	  a = 500 * (x - y);
	  b = 200 * (y - z);
	  return [l, a, b];
	};

	convert.lab.xyz = function (lab) {
	  var l = lab[0];
	  var a = lab[1];
	  var b = lab[2];
	  var x;
	  var y;
	  var z;
	  y = (l + 16) / 116;
	  x = a / 500 + y;
	  z = y - b / 200;
	  var y2 = Math.pow(y, 3);
	  var x2 = Math.pow(x, 3);
	  var z2 = Math.pow(z, 3);
	  y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
	  x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
	  z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;
	  x *= 95.047;
	  y *= 100;
	  z *= 108.883;
	  return [x, y, z];
	};

	convert.lab.lch = function (lab) {
	  var l = lab[0];
	  var a = lab[1];
	  var b = lab[2];
	  var hr;
	  var h;
	  var c;
	  hr = Math.atan2(b, a);
	  h = hr * 360 / 2 / Math.PI;

	  if (h < 0) {
	    h += 360;
	  }

	  c = Math.sqrt(a * a + b * b);
	  return [l, c, h];
	};

	convert.lch.lab = function (lch) {
	  var l = lch[0];
	  var c = lch[1];
	  var h = lch[2];
	  var a;
	  var b;
	  var hr;
	  hr = h / 360 * 2 * Math.PI;
	  a = c * Math.cos(hr);
	  b = c * Math.sin(hr);
	  return [l, a, b];
	};

	convert.rgb.ansi16 = function (args) {
	  var r = args[0];
	  var g = args[1];
	  var b = args[2];
	  var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2]; // hsv -> ansi16 optimization

	  value = Math.round(value / 50);

	  if (value === 0) {
	    return 30;
	  }

	  var ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));

	  if (value === 2) {
	    ansi += 60;
	  }

	  return ansi;
	};

	convert.hsv.ansi16 = function (args) {
	  // optimization here; we already know the value and don't need to get
	  // it converted for us.
	  return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
	};

	convert.rgb.ansi256 = function (args) {
	  var r = args[0];
	  var g = args[1];
	  var b = args[2]; // we use the extended greyscale palette here, with the exception of
	  // black and white. normal palette only has 4 greyscale shades.

	  if (r === g && g === b) {
	    if (r < 8) {
	      return 16;
	    }

	    if (r > 248) {
	      return 231;
	    }

	    return Math.round((r - 8) / 247 * 24) + 232;
	  }

	  var ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
	  return ansi;
	};

	convert.ansi16.rgb = function (args) {
	  var color = args % 10; // handle greyscale

	  if (color === 0 || color === 7) {
	    if (args > 50) {
	      color += 3.5;
	    }

	    color = color / 10.5 * 255;
	    return [color, color, color];
	  }

	  var mult = (~~(args > 50) + 1) * 0.5;
	  var r = (color & 1) * mult * 255;
	  var g = (color >> 1 & 1) * mult * 255;
	  var b = (color >> 2 & 1) * mult * 255;
	  return [r, g, b];
	};

	convert.ansi256.rgb = function (args) {
	  // handle greyscale
	  if (args >= 232) {
	    var c = (args - 232) * 10 + 8;
	    return [c, c, c];
	  }

	  args -= 16;
	  var rem;
	  var r = Math.floor(args / 36) / 5 * 255;
	  var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
	  var b = rem % 6 / 5 * 255;
	  return [r, g, b];
	};

	convert.rgb.hex = function (args) {
	  var integer = ((Math.round(args[0]) & 0xFF) << 16) + ((Math.round(args[1]) & 0xFF) << 8) + (Math.round(args[2]) & 0xFF);
	  var string = integer.toString(16).toUpperCase();
	  return '000000'.substring(string.length) + string;
	};

	convert.hex.rgb = function (args) {
	  var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);

	  if (!match) {
	    return [0, 0, 0];
	  }

	  var colorString = match[0];

	  if (match[0].length === 3) {
	    colorString = colorString.split('').map(function (char) {
	      return char + char;
	    }).join('');
	  }

	  var integer = parseInt(colorString, 16);
	  var r = integer >> 16 & 0xFF;
	  var g = integer >> 8 & 0xFF;
	  var b = integer & 0xFF;
	  return [r, g, b];
	};

	convert.rgb.hcg = function (rgb) {
	  var r = rgb[0] / 255;
	  var g = rgb[1] / 255;
	  var b = rgb[2] / 255;
	  var max = Math.max(Math.max(r, g), b);
	  var min = Math.min(Math.min(r, g), b);
	  var chroma = max - min;
	  var grayscale;
	  var hue;

	  if (chroma < 1) {
	    grayscale = min / (1 - chroma);
	  } else {
	    grayscale = 0;
	  }

	  if (chroma <= 0) {
	    hue = 0;
	  } else if (max === r) {
	    hue = (g - b) / chroma % 6;
	  } else if (max === g) {
	    hue = 2 + (b - r) / chroma;
	  } else {
	    hue = 4 + (r - g) / chroma + 4;
	  }

	  hue /= 6;
	  hue %= 1;
	  return [hue * 360, chroma * 100, grayscale * 100];
	};

	convert.hsl.hcg = function (hsl) {
	  var s = hsl[1] / 100;
	  var l = hsl[2] / 100;
	  var c = 1;
	  var f = 0;

	  if (l < 0.5) {
	    c = 2.0 * s * l;
	  } else {
	    c = 2.0 * s * (1.0 - l);
	  }

	  if (c < 1.0) {
	    f = (l - 0.5 * c) / (1.0 - c);
	  }

	  return [hsl[0], c * 100, f * 100];
	};

	convert.hsv.hcg = function (hsv) {
	  var s = hsv[1] / 100;
	  var v = hsv[2] / 100;
	  var c = s * v;
	  var f = 0;

	  if (c < 1.0) {
	    f = (v - c) / (1 - c);
	  }

	  return [hsv[0], c * 100, f * 100];
	};

	convert.hcg.rgb = function (hcg) {
	  var h = hcg[0] / 360;
	  var c = hcg[1] / 100;
	  var g = hcg[2] / 100;

	  if (c === 0.0) {
	    return [g * 255, g * 255, g * 255];
	  }

	  var pure = [0, 0, 0];
	  var hi = h % 1 * 6;
	  var v = hi % 1;
	  var w = 1 - v;
	  var mg = 0;

	  switch (Math.floor(hi)) {
	    case 0:
	      pure[0] = 1;
	      pure[1] = v;
	      pure[2] = 0;
	      break;

	    case 1:
	      pure[0] = w;
	      pure[1] = 1;
	      pure[2] = 0;
	      break;

	    case 2:
	      pure[0] = 0;
	      pure[1] = 1;
	      pure[2] = v;
	      break;

	    case 3:
	      pure[0] = 0;
	      pure[1] = w;
	      pure[2] = 1;
	      break;

	    case 4:
	      pure[0] = v;
	      pure[1] = 0;
	      pure[2] = 1;
	      break;

	    default:
	      pure[0] = 1;
	      pure[1] = 0;
	      pure[2] = w;
	  }

	  mg = (1.0 - c) * g;
	  return [(c * pure[0] + mg) * 255, (c * pure[1] + mg) * 255, (c * pure[2] + mg) * 255];
	};

	convert.hcg.hsv = function (hcg) {
	  var c = hcg[1] / 100;
	  var g = hcg[2] / 100;
	  var v = c + g * (1.0 - c);
	  var f = 0;

	  if (v > 0.0) {
	    f = c / v;
	  }

	  return [hcg[0], f * 100, v * 100];
	};

	convert.hcg.hsl = function (hcg) {
	  var c = hcg[1] / 100;
	  var g = hcg[2] / 100;
	  var l = g * (1.0 - c) + 0.5 * c;
	  var s = 0;

	  if (l > 0.0 && l < 0.5) {
	    s = c / (2 * l);
	  } else if (l >= 0.5 && l < 1.0) {
	    s = c / (2 * (1 - l));
	  }

	  return [hcg[0], s * 100, l * 100];
	};

	convert.hcg.hwb = function (hcg) {
	  var c = hcg[1] / 100;
	  var g = hcg[2] / 100;
	  var v = c + g * (1.0 - c);
	  return [hcg[0], (v - c) * 100, (1 - v) * 100];
	};

	convert.hwb.hcg = function (hwb) {
	  var w = hwb[1] / 100;
	  var b = hwb[2] / 100;
	  var v = 1 - b;
	  var c = v - w;
	  var g = 0;

	  if (c < 1) {
	    g = (v - c) / (1 - c);
	  }

	  return [hwb[0], c * 100, g * 100];
	};

	convert.apple.rgb = function (apple) {
	  return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
	};

	convert.rgb.apple = function (rgb) {
	  return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
	};

	convert.gray.rgb = function (args) {
	  return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
	};

	convert.gray.hsl = convert.gray.hsv = function (args) {
	  return [0, 0, args[0]];
	};

	convert.gray.hwb = function (gray) {
	  return [0, 100, gray[0]];
	};

	convert.gray.cmyk = function (gray) {
	  return [0, 0, 0, gray[0]];
	};

	convert.gray.lab = function (gray) {
	  return [gray[0], 0, 0];
	};

	convert.gray.hex = function (gray) {
	  var val = Math.round(gray[0] / 100 * 255) & 0xFF;
	  var integer = (val << 16) + (val << 8) + val;
	  var string = integer.toString(16).toUpperCase();
	  return '000000'.substring(string.length) + string;
	};

	convert.rgb.gray = function (rgb) {
	  var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
	  return [val / 255 * 100];
	};
	});
	var conversions_1 = conversions.rgb;
	var conversions_2 = conversions.hsl;
	var conversions_3 = conversions.hsv;
	var conversions_4 = conversions.hwb;
	var conversions_5 = conversions.cmyk;
	var conversions_6 = conversions.xyz;
	var conversions_7 = conversions.lab;
	var conversions_8 = conversions.lch;
	var conversions_9 = conversions.hex;
	var conversions_10 = conversions.keyword;
	var conversions_11 = conversions.ansi16;
	var conversions_12 = conversions.ansi256;
	var conversions_13 = conversions.hcg;
	var conversions_14 = conversions.apple;
	var conversions_15 = conversions.gray;

	/*
		this function routes a model to all other models.

		all functions that are routed have a property `.conversion` attached
		to the returned synthetic function. This property is an array
		of strings, each with the steps in between the 'from' and 'to'
		color models (inclusive).

		conversions that are not possible simply are not included.
	*/


	function buildGraph() {
	  var graph = {}; // https://jsperf.com/object-keys-vs-for-in-with-closure/3

	  var models = Object.keys(conversions);

	  for (var len = models.length, i = 0; i < len; i++) {
	    graph[models[i]] = {
	      // http://jsperf.com/1-vs-infinity
	      // micro-opt, but this is simple.
	      distance: -1,
	      parent: null
	    };
	  }

	  return graph;
	} // https://en.wikipedia.org/wiki/Breadth-first_search


	function deriveBFS(fromModel) {
	  var graph = buildGraph();
	  var queue = [fromModel]; // unshift -> queue -> pop

	  graph[fromModel].distance = 0;

	  while (queue.length) {
	    var current = queue.pop();
	    var adjacents = Object.keys(conversions[current]);

	    for (var len = adjacents.length, i = 0; i < len; i++) {
	      var adjacent = adjacents[i];
	      var node = graph[adjacent];

	      if (node.distance === -1) {
	        node.distance = graph[current].distance + 1;
	        node.parent = current;
	        queue.unshift(adjacent);
	      }
	    }
	  }

	  return graph;
	}

	function link(from, to) {
	  return function (args) {
	    return to(from(args));
	  };
	}

	function wrapConversion(toModel, graph) {
	  var path = [graph[toModel].parent, toModel];
	  var fn = conversions[graph[toModel].parent][toModel];
	  var cur = graph[toModel].parent;

	  while (graph[cur].parent) {
	    path.unshift(graph[cur].parent);
	    fn = link(conversions[graph[cur].parent][cur], fn);
	    cur = graph[cur].parent;
	  }

	  fn.conversion = path;
	  return fn;
	}

	var route = function (fromModel) {
	  var graph = deriveBFS(fromModel);
	  var conversion = {};
	  var models = Object.keys(graph);

	  for (var len = models.length, i = 0; i < len; i++) {
	    var toModel = models[i];
	    var node = graph[toModel];

	    if (node.parent === null) {
	      // no possible conversion, or this node is the source model.
	      continue;
	    }

	    conversion[toModel] = wrapConversion(toModel, graph);
	  }

	  return conversion;
	};

	var convert = {};
	var models = Object.keys(conversions);

	function wrapRaw(fn) {
	  var wrappedFn = function (args) {
	    if (args === undefined || args === null) {
	      return args;
	    }

	    if (arguments.length > 1) {
	      args = Array.prototype.slice.call(arguments);
	    }

	    return fn(args);
	  }; // preserve .conversion property if there is one


	  if ('conversion' in fn) {
	    wrappedFn.conversion = fn.conversion;
	  }

	  return wrappedFn;
	}

	function wrapRounded(fn) {
	  var wrappedFn = function (args) {
	    if (args === undefined || args === null) {
	      return args;
	    }

	    if (arguments.length > 1) {
	      args = Array.prototype.slice.call(arguments);
	    }

	    var result = fn(args); // we're assuming the result is an array here.
	    // see notice in conversions.js; don't use box types
	    // in conversion functions.

	    if (typeof result === 'object') {
	      for (var len = result.length, i = 0; i < len; i++) {
	        result[i] = Math.round(result[i]);
	      }
	    }

	    return result;
	  }; // preserve .conversion property if there is one


	  if ('conversion' in fn) {
	    wrappedFn.conversion = fn.conversion;
	  }

	  return wrappedFn;
	}

	models.forEach(function (fromModel) {
	  convert[fromModel] = {};
	  Object.defineProperty(convert[fromModel], 'channels', {
	    value: conversions[fromModel].channels
	  });
	  Object.defineProperty(convert[fromModel], 'labels', {
	    value: conversions[fromModel].labels
	  });
	  var routes = route(fromModel);
	  var routeModels = Object.keys(routes);
	  routeModels.forEach(function (toModel) {
	    var fn = routes[toModel];
	    convert[fromModel][toModel] = wrapRounded(fn);
	    convert[fromModel][toModel].raw = wrapRaw(fn);
	  });
	});
	var colorConvert = convert;

	var ansiStyles$1 = createCommonjsModule(function (module) {



	const wrapAnsi16 = (fn, offset) => function () {
	  const code = fn.apply(colorConvert, arguments);
	  return `\u001B[${code + offset}m`;
	};

	const wrapAnsi256 = (fn, offset) => function () {
	  const code = fn.apply(colorConvert, arguments);
	  return `\u001B[${38 + offset};5;${code}m`;
	};

	const wrapAnsi16m = (fn, offset) => function () {
	  const rgb = fn.apply(colorConvert, arguments);
	  return `\u001B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
	};

	function assembleStyles() {
	  const codes = new Map();
	  const styles = {
	    modifier: {
	      reset: [0, 0],
	      // 21 isn't widely supported and 22 does the same thing
	      bold: [1, 22],
	      dim: [2, 22],
	      italic: [3, 23],
	      underline: [4, 24],
	      inverse: [7, 27],
	      hidden: [8, 28],
	      strikethrough: [9, 29]
	    },
	    color: {
	      black: [30, 39],
	      red: [31, 39],
	      green: [32, 39],
	      yellow: [33, 39],
	      blue: [34, 39],
	      magenta: [35, 39],
	      cyan: [36, 39],
	      white: [37, 39],
	      gray: [90, 39],
	      // Bright color
	      redBright: [91, 39],
	      greenBright: [92, 39],
	      yellowBright: [93, 39],
	      blueBright: [94, 39],
	      magentaBright: [95, 39],
	      cyanBright: [96, 39],
	      whiteBright: [97, 39]
	    },
	    bgColor: {
	      bgBlack: [40, 49],
	      bgRed: [41, 49],
	      bgGreen: [42, 49],
	      bgYellow: [43, 49],
	      bgBlue: [44, 49],
	      bgMagenta: [45, 49],
	      bgCyan: [46, 49],
	      bgWhite: [47, 49],
	      // Bright color
	      bgBlackBright: [100, 49],
	      bgRedBright: [101, 49],
	      bgGreenBright: [102, 49],
	      bgYellowBright: [103, 49],
	      bgBlueBright: [104, 49],
	      bgMagentaBright: [105, 49],
	      bgCyanBright: [106, 49],
	      bgWhiteBright: [107, 49]
	    }
	  }; // Fix humans

	  styles.color.grey = styles.color.gray;

	  for (const groupName of Object.keys(styles)) {
	    const group = styles[groupName];

	    for (const styleName of Object.keys(group)) {
	      const style = group[styleName];
	      styles[styleName] = {
	        open: `\u001B[${style[0]}m`,
	        close: `\u001B[${style[1]}m`
	      };
	      group[styleName] = styles[styleName];
	      codes.set(style[0], style[1]);
	    }

	    Object.defineProperty(styles, groupName, {
	      value: group,
	      enumerable: false
	    });
	    Object.defineProperty(styles, 'codes', {
	      value: codes,
	      enumerable: false
	    });
	  }

	  const ansi2ansi = n => n;

	  const rgb2rgb = (r, g, b) => [r, g, b];

	  styles.color.close = '\u001B[39m';
	  styles.bgColor.close = '\u001B[49m';
	  styles.color.ansi = {
	    ansi: wrapAnsi16(ansi2ansi, 0)
	  };
	  styles.color.ansi256 = {
	    ansi256: wrapAnsi256(ansi2ansi, 0)
	  };
	  styles.color.ansi16m = {
	    rgb: wrapAnsi16m(rgb2rgb, 0)
	  };
	  styles.bgColor.ansi = {
	    ansi: wrapAnsi16(ansi2ansi, 10)
	  };
	  styles.bgColor.ansi256 = {
	    ansi256: wrapAnsi256(ansi2ansi, 10)
	  };
	  styles.bgColor.ansi16m = {
	    rgb: wrapAnsi16m(rgb2rgb, 10)
	  };

	  for (let key of Object.keys(colorConvert)) {
	    if (typeof colorConvert[key] !== 'object') {
	      continue;
	    }

	    const suite = colorConvert[key];

	    if (key === 'ansi16') {
	      key = 'ansi';
	    }

	    if ('ansi16' in suite) {
	      styles.color.ansi[key] = wrapAnsi16(suite.ansi16, 0);
	      styles.bgColor.ansi[key] = wrapAnsi16(suite.ansi16, 10);
	    }

	    if ('ansi256' in suite) {
	      styles.color.ansi256[key] = wrapAnsi256(suite.ansi256, 0);
	      styles.bgColor.ansi256[key] = wrapAnsi256(suite.ansi256, 10);
	    }

	    if ('rgb' in suite) {
	      styles.color.ansi16m[key] = wrapAnsi16m(suite.rgb, 0);
	      styles.bgColor.ansi16m[key] = wrapAnsi16m(suite.rgb, 10);
	    }
	  }

	  return styles;
	} // Make the export immutable


	Object.defineProperty(module, 'exports', {
	  enumerable: true,
	  get: assembleStyles
	});
	});

	var collections = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.printIteratorEntries = printIteratorEntries;
	exports.printIteratorValues = printIteratorValues;
	exports.printListItems = printListItems;
	exports.printObjectProperties = printObjectProperties;

	const getSymbols = Object.getOwnPropertySymbols || (obj => []);
	/**
	 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *
	 */


	const isSymbol = key => // $FlowFixMe string literal `symbol`. This value is not a valid `typeof` return value
	typeof key === 'symbol' || toString.call(key) === '[object Symbol]'; // Return entries (for example, of a map)
	// with spacing, indentation, and comma
	// without surrounding punctuation (for example, braces)


	function printIteratorEntries( // Flow 0.51.0: property `@@iterator` of $Iterator not found in Object
	iterator, config, indentation, depth, refs, printer) {
	  let separator = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : ': ';
	  let result = '';
	  let current = iterator.next();

	  if (!current.done) {
	    result += config.spacingOuter;
	    const indentationNext = indentation + config.indent;

	    while (!current.done) {
	      const name = printer(current.value[0], config, indentationNext, depth, refs);
	      const value = printer(current.value[1], config, indentationNext, depth, refs);
	      result += indentationNext + name + separator + value;
	      current = iterator.next();

	      if (!current.done) {
	        result += ',' + config.spacingInner;
	      } else if (!config.min) {
	        result += ',';
	      }
	    }

	    result += config.spacingOuter + indentation;
	  }

	  return result;
	} // Return values (for example, of a set)
	// with spacing, indentation, and comma
	// without surrounding punctuation (braces or brackets)


	function printIteratorValues(iterator, config, indentation, depth, refs, printer) {
	  let result = '';
	  let current = iterator.next();

	  if (!current.done) {
	    result += config.spacingOuter;
	    const indentationNext = indentation + config.indent;

	    while (!current.done) {
	      result += indentationNext + printer(current.value, config, indentationNext, depth, refs);
	      current = iterator.next();

	      if (!current.done) {
	        result += ',' + config.spacingInner;
	      } else if (!config.min) {
	        result += ',';
	      }
	    }

	    result += config.spacingOuter + indentation;
	  }

	  return result;
	} // Return items (for example, of an array)
	// with spacing, indentation, and comma
	// without surrounding punctuation (for example, brackets)


	function printListItems(list, config, indentation, depth, refs, printer) {
	  let result = '';

	  if (list.length) {
	    result += config.spacingOuter;
	    const indentationNext = indentation + config.indent;

	    for (let i = 0; i < list.length; i++) {
	      result += indentationNext + printer(list[i], config, indentationNext, depth, refs);

	      if (i < list.length - 1) {
	        result += ',' + config.spacingInner;
	      } else if (!config.min) {
	        result += ',';
	      }
	    }

	    result += config.spacingOuter + indentation;
	  }

	  return result;
	} // Return properties of an object
	// with spacing, indentation, and comma
	// without surrounding punctuation (for example, braces)


	function printObjectProperties(val, config, indentation, depth, refs, printer) {
	  let result = '';
	  let keys = Object.keys(val).sort();
	  const symbols = getSymbols(val);

	  if (symbols.length) {
	    keys = keys.filter(key => !isSymbol(key)).concat(symbols);
	  }

	  if (keys.length) {
	    result += config.spacingOuter;
	    const indentationNext = indentation + config.indent;

	    for (let i = 0; i < keys.length; i++) {
	      const key = keys[i];
	      const name = printer(key, config, indentationNext, depth, refs);
	      const value = printer(val[key], config, indentationNext, depth, refs);
	      result += indentationNext + name + ': ' + value;

	      if (i < keys.length - 1) {
	        result += ',' + config.spacingInner;
	      } else if (!config.min) {
	        result += ',';
	      }
	    }

	    result += config.spacingOuter + indentation;
	  }

	  return result;
	}
	});

	unwrapExports(collections);
	var collections_1 = collections.printIteratorEntries;
	var collections_2 = collections.printIteratorValues;
	var collections_3 = collections.printListItems;
	var collections_4 = collections.printObjectProperties;

	var asymmetric_matcher = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.test = exports.serialize = undefined;


	/**
	 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *
	 */


	const asymmetricMatcher = Symbol.for('jest.asymmetricMatcher');
	const SPACE = ' ';

	const serialize = exports.serialize = (val, config, indentation, depth, refs, printer) => {
	  const stringedValue = val.toString();

	  if (stringedValue === 'ArrayContaining' || stringedValue === 'ArrayNotContaining') {
	    if (++depth > config.maxDepth) {
	      return '[' + stringedValue + ']';
	    }

	    return stringedValue + SPACE + '[' + (0, collections.printListItems)(val.sample, config, indentation, depth, refs, printer) + ']';
	  }

	  if (stringedValue === 'ObjectContaining' || stringedValue === 'ObjectNotContaining') {
	    if (++depth > config.maxDepth) {
	      return '[' + stringedValue + ']';
	    }

	    return stringedValue + SPACE + '{' + (0, collections.printObjectProperties)(val.sample, config, indentation, depth, refs, printer) + '}';
	  }

	  if (stringedValue === 'StringMatching' || stringedValue === 'StringNotMatching') {
	    return stringedValue + SPACE + printer(val.sample, config, indentation, depth, refs);
	  }

	  if (stringedValue === 'StringContaining' || stringedValue === 'StringNotContaining') {
	    return stringedValue + SPACE + printer(val.sample, config, indentation, depth, refs);
	  }

	  return val.toAsymmetricMatcher();
	};

	const test = exports.test = val => val && val.$$typeof === asymmetricMatcher;

	exports.default = {
	  serialize: serialize,
	  test: test
	};
	});

	unwrapExports(asymmetric_matcher);
	var asymmetric_matcher_1 = asymmetric_matcher.test;
	var asymmetric_matcher_2 = asymmetric_matcher.serialize;

	var ansiRegex = () => {
	  const pattern = ['[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[a-zA-Z\\d]*)*)?\\u0007)', '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))'].join('|');
	  return new RegExp(pattern, 'g');
	};

	var convert_ansi = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.serialize = exports.test = undefined;



	var _ansiRegex2 = _interopRequireDefault(ansiRegex);



	var _ansiStyles2 = _interopRequireDefault(ansiStyles$1);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	}

	const toHumanReadableAnsi = text => text.replace((0, _ansiRegex2.default)(), (match, offset, string) => {
	  switch (match) {
	    case _ansiStyles2.default.red.close:
	    case _ansiStyles2.default.green.close:
	    case _ansiStyles2.default.cyan.close:
	    case _ansiStyles2.default.gray.close:
	    case _ansiStyles2.default.white.close:
	    case _ansiStyles2.default.yellow.close:
	    case _ansiStyles2.default.bgRed.close:
	    case _ansiStyles2.default.bgGreen.close:
	    case _ansiStyles2.default.bgYellow.close:
	    case _ansiStyles2.default.inverse.close:
	    case _ansiStyles2.default.dim.close:
	    case _ansiStyles2.default.bold.close:
	    case _ansiStyles2.default.reset.open:
	    case _ansiStyles2.default.reset.close:
	      return '</>';

	    case _ansiStyles2.default.red.open:
	      return '<red>';

	    case _ansiStyles2.default.green.open:
	      return '<green>';

	    case _ansiStyles2.default.cyan.open:
	      return '<cyan>';

	    case _ansiStyles2.default.gray.open:
	      return '<gray>';

	    case _ansiStyles2.default.white.open:
	      return '<white>';

	    case _ansiStyles2.default.yellow.open:
	      return '<yellow>';

	    case _ansiStyles2.default.bgRed.open:
	      return '<bgRed>';

	    case _ansiStyles2.default.bgGreen.open:
	      return '<bgGreen>';

	    case _ansiStyles2.default.bgYellow.open:
	      return '<bgYellow>';

	    case _ansiStyles2.default.inverse.open:
	      return '<inverse>';

	    case _ansiStyles2.default.dim.open:
	      return '<dim>';

	    case _ansiStyles2.default.bold.open:
	      return '<bold>';

	    default:
	      return '';
	  }
	});
	/**
	 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *
	 */


	const test = exports.test = val => typeof val === 'string' && val.match((0, _ansiRegex2.default)());

	const serialize = exports.serialize = (val, config, indentation, depth, refs, printer) => printer(toHumanReadableAnsi(val), config, indentation, depth, refs);

	exports.default = {
	  serialize: serialize,
	  test: test
	};
	});

	unwrapExports(convert_ansi);
	var convert_ansi_1 = convert_ansi.serialize;
	var convert_ansi_2 = convert_ansi.test;

	var dom_collection = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.serialize = exports.test = undefined;


	/**
	 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *
	 */


	const SPACE = ' ';
	const COLLECTION_NAMES = ['DOMStringMap', 'NamedNodeMap'];

	const test = exports.test = val => val && val.constructor && COLLECTION_NAMES.indexOf(val.constructor.name) !== -1;

	const convertCollectionToObject = collection => {
	  let result = {};

	  if (collection.constructor.name === 'NamedNodeMap') {
	    for (let i = 0; i < collection.length; i++) {
	      result[collection[i].name] = collection[i].value;
	    }
	  } else {
	    result = Object.assign({}, collection);
	  }

	  return result;
	};

	const serialize = exports.serialize = (collection, config, indentation, depth, refs, printer) => {
	  if (++depth > config.maxDepth) {
	    return '[' + collection.constructor.name + ']';
	  }

	  return collection.constructor.name + SPACE + '{' + (0, collections.printObjectProperties)(convertCollectionToObject(collection), config, indentation, depth, refs, printer) + '}';
	};

	exports.default = {
	  serialize: serialize,
	  test: test
	};
	});

	unwrapExports(dom_collection);
	var dom_collection_1 = dom_collection.serialize;
	var dom_collection_2 = dom_collection.test;

	var escape_html = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.default = escapeHTML;
	/**
	 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *
	 */

	function escapeHTML(str) {
	  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
	}
	});

	unwrapExports(escape_html);

	var markup = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.printElementAsLeaf = exports.printElement = exports.printComment = exports.printText = exports.printChildren = exports.printProps = undefined;



	var _escape_html2 = _interopRequireDefault(escape_html);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	} // Return empty string if keys is empty.

	/**
	 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *
	 */


	const printProps = exports.printProps = (keys, props, config, indentation, depth, refs, printer) => {
	  const indentationNext = indentation + config.indent;
	  const colors = config.colors;
	  return keys.map(key => {
	    const value = props[key];
	    let printed = printer(value, config, indentationNext, depth, refs);

	    if (typeof value !== 'string') {
	      if (printed.indexOf('\n') !== -1) {
	        printed = config.spacingOuter + indentationNext + printed + config.spacingOuter + indentation;
	      }

	      printed = '{' + printed + '}';
	    }

	    return config.spacingInner + indentation + colors.prop.open + key + colors.prop.close + '=' + colors.value.open + printed + colors.value.close;
	  }).join('');
	}; // Return empty string if children is empty.


	const printChildren = exports.printChildren = (children, config, indentation, depth, refs, printer) => children.map(child => config.spacingOuter + indentation + (typeof child === 'string' ? printText(child, config) : printer(child, config, indentation, depth, refs))).join('');

	const printText = exports.printText = (text, config) => {
	  const contentColor = config.colors.content;
	  return contentColor.open + (0, _escape_html2.default)(text) + contentColor.close;
	};

	const printComment = exports.printComment = (comment, config) => {
	  const commentColor = config.colors.comment;
	  return commentColor.open + '<!--' + (0, _escape_html2.default)(comment) + '-->' + commentColor.close;
	}; // Separate the functions to format props, children, and element,
	// so a plugin could override a particular function, if needed.
	// Too bad, so sad: the traditional (but unnecessary) space
	// in a self-closing tagColor requires a second test of printedProps.


	const printElement = exports.printElement = (type, printedProps, printedChildren, config, indentation) => {
	  const tagColor = config.colors.tag;
	  return tagColor.open + '<' + type + (printedProps && tagColor.close + printedProps + config.spacingOuter + indentation + tagColor.open) + (printedChildren ? '>' + tagColor.close + printedChildren + config.spacingOuter + indentation + tagColor.open + '</' + type : (printedProps && !config.min ? '' : ' ') + '/') + '>' + tagColor.close;
	};

	const printElementAsLeaf = exports.printElementAsLeaf = (type, config) => {
	  const tagColor = config.colors.tag;
	  return tagColor.open + '<' + type + tagColor.close + ' …' + tagColor.open + ' />' + tagColor.close;
	};
	});

	unwrapExports(markup);
	var markup_1 = markup.printElementAsLeaf;
	var markup_2 = markup.printElement;
	var markup_3 = markup.printComment;
	var markup_4 = markup.printText;
	var markup_5 = markup.printChildren;
	var markup_6 = markup.printProps;

	var dom_element = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.serialize = exports.test = undefined;


	/**
	 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *
	 */


	const ELEMENT_NODE = 1;
	const TEXT_NODE = 3;
	const COMMENT_NODE = 8;
	const FRAGMENT_NODE = 11;
	const ELEMENT_REGEXP = /^((HTML|SVG)\w*)?Element$/;

	const testNode = (nodeType, name) => nodeType === ELEMENT_NODE && ELEMENT_REGEXP.test(name) || nodeType === TEXT_NODE && name === 'Text' || nodeType === COMMENT_NODE && name === 'Comment' || nodeType === FRAGMENT_NODE && name === 'DocumentFragment';

	const test = exports.test = val => val && val.constructor && val.constructor.name && testNode(val.nodeType, val.constructor.name); // Convert array of attribute objects to keys array and props object.


	const keysMapper = attribute => attribute.name;

	const propsReducer = (props, attribute) => {
	  props[attribute.name] = attribute.value;
	  return props;
	};

	const serialize = exports.serialize = (node, config, indentation, depth, refs, printer) => {
	  if (node.nodeType === TEXT_NODE) {
	    return (0, markup.printText)(node.data, config);
	  }

	  if (node.nodeType === COMMENT_NODE) {
	    return (0, markup.printComment)(node.data, config);
	  }

	  const type = node.nodeType === FRAGMENT_NODE ? `DocumentFragment` : node.tagName.toLowerCase();

	  if (++depth > config.maxDepth) {
	    return (0, markup.printElementAsLeaf)(type, config);
	  }

	  return (0, markup.printElement)(type, (0, markup.printProps)(Array.prototype.map.call(node.attributes || [], keysMapper).sort(), Array.prototype.reduce.call(node.attributes || [], propsReducer, {}), config, indentation + config.indent, depth, refs, printer), (0, markup.printChildren)(Array.prototype.slice.call(node.childNodes || node.children), config, indentation + config.indent, depth, refs, printer), config, indentation);
	};

	exports.default = {
	  serialize: serialize,
	  test: test
	};
	});

	unwrapExports(dom_element);
	var dom_element_1 = dom_element.serialize;
	var dom_element_2 = dom_element.test;

	var immutable = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.test = exports.serialize = undefined;

	 // SENTINEL constants are from https://github.com/facebook/immutable-js

	/**
	 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *
	 */


	const IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
	const IS_LIST_SENTINEL = '@@__IMMUTABLE_LIST__@@';
	const IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
	const IS_MAP_SENTINEL = '@@__IMMUTABLE_MAP__@@';
	const IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';
	const IS_RECORD_SENTINEL = '@@__IMMUTABLE_RECORD__@@'; // immutable v4

	const IS_SEQ_SENTINEL = '@@__IMMUTABLE_SEQ__@@';
	const IS_SET_SENTINEL = '@@__IMMUTABLE_SET__@@';
	const IS_STACK_SENTINEL = '@@__IMMUTABLE_STACK__@@';

	const getImmutableName = name => 'Immutable.' + name;

	const printAsLeaf = name => '[' + name + ']';

	const SPACE = ' ';
	const LAZY = '…'; // Seq is lazy if it calls a method like filter

	const printImmutableEntries = (val, config, indentation, depth, refs, printer, type) => ++depth > config.maxDepth ? printAsLeaf(getImmutableName(type)) : getImmutableName(type) + SPACE + '{' + (0, collections.printIteratorEntries)(val.entries(), config, indentation, depth, refs, printer) + '}'; // Record has an entries method because it is a collection in immutable v3.
	// Return an iterator for Immutable Record from version v3 or v4.


	const getRecordEntries = val => {
	  let i = 0;
	  return {
	    next: function () {
	      if (i < val._keys.length) {
	        const key = val._keys[i++];
	        return {
	          done: false,
	          value: [key, val.get(key)]
	        };
	      }

	      return {
	        done: true
	      };
	    }
	  };
	};

	const printImmutableRecord = (val, config, indentation, depth, refs, printer) => {
	  // _name property is defined only for an Immutable Record instance
	  // which was constructed with a second optional descriptive name arg
	  const name = getImmutableName(val._name || 'Record');
	  return ++depth > config.maxDepth ? printAsLeaf(name) : name + SPACE + '{' + (0, collections.printIteratorEntries)(getRecordEntries(val), config, indentation, depth, refs, printer) + '}';
	};

	const printImmutableSeq = (val, config, indentation, depth, refs, printer) => {
	  const name = getImmutableName('Seq');

	  if (++depth > config.maxDepth) {
	    return printAsLeaf(name);
	  }

	  if (val[IS_KEYED_SENTINEL]) {
	    return name + SPACE + '{' + ( // from Immutable collection of entries or from ECMAScript object
	    val._iter || val._object ? (0, collections.printIteratorEntries)(val.entries(), config, indentation, depth, refs, printer) : LAZY) + '}';
	  }

	  return name + SPACE + '[' + (val._iter || // from Immutable collection of values
	  val._array || // from ECMAScript array
	  val._collection || // from ECMAScript collection in immutable v4
	  val._iterable // from ECMAScript collection in immutable v3
	  ? (0, collections.printIteratorValues)(val.values(), config, indentation, depth, refs, printer) : LAZY) + ']';
	};

	const printImmutableValues = (val, config, indentation, depth, refs, printer, type) => ++depth > config.maxDepth ? printAsLeaf(getImmutableName(type)) : getImmutableName(type) + SPACE + '[' + (0, collections.printIteratorValues)(val.values(), config, indentation, depth, refs, printer) + ']';

	const serialize = exports.serialize = (val, config, indentation, depth, refs, printer) => {
	  if (val[IS_MAP_SENTINEL]) {
	    return printImmutableEntries(val, config, indentation, depth, refs, printer, val[IS_ORDERED_SENTINEL] ? 'OrderedMap' : 'Map');
	  }

	  if (val[IS_LIST_SENTINEL]) {
	    return printImmutableValues(val, config, indentation, depth, refs, printer, 'List');
	  }

	  if (val[IS_SET_SENTINEL]) {
	    return printImmutableValues(val, config, indentation, depth, refs, printer, val[IS_ORDERED_SENTINEL] ? 'OrderedSet' : 'Set');
	  }

	  if (val[IS_STACK_SENTINEL]) {
	    return printImmutableValues(val, config, indentation, depth, refs, printer, 'Stack');
	  }

	  if (val[IS_SEQ_SENTINEL]) {
	    return printImmutableSeq(val, config, indentation, depth, refs, printer);
	  } // For compatibility with immutable v3 and v4, let record be the default.


	  return printImmutableRecord(val, config, indentation, depth, refs, printer);
	}; // Explicitly comparing sentinel properties to true avoids false positive
	// when mock identity-obj-proxy returns the key as the value for any key.


	const test = exports.test = val => val && (val[IS_ITERABLE_SENTINEL] === true || val[IS_RECORD_SENTINEL] === true);

	exports.default = {
	  serialize: serialize,
	  test: test
	};
	});

	unwrapExports(immutable);
	var immutable_1 = immutable.test;
	var immutable_2 = immutable.serialize;

	var react_element = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.test = exports.serialize = undefined;


	/**
	 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *
	 */


	const elementSymbol = Symbol.for('react.element');
	const fragmentSymbol = Symbol.for('react.fragment');
	const forwardRefSymbol = Symbol.for('react.forward_ref');
	const providerSymbol = Symbol.for('react.provider');
	const contextSymbol = Symbol.for('react.context'); // Given element.props.children, or subtree during recursive traversal,
	// return flattened array of children.

	const getChildren = function (arg) {
	  let children = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	  if (Array.isArray(arg)) {
	    arg.forEach(item => {
	      getChildren(item, children);
	    });
	  } else if (arg != null && arg !== false) {
	    children.push(arg);
	  }

	  return children;
	};

	const getType = element => {
	  const type = element.type;

	  if (typeof type === 'string') {
	    return type;
	  }

	  if (typeof type === 'function') {
	    return type.displayName || type.name || 'Unknown';
	  }

	  if (type === fragmentSymbol) {
	    return 'React.Fragment';
	  }

	  if (typeof type === 'object' && type !== null) {
	    if (type.$$typeof === providerSymbol) {
	      return 'Context.Provider';
	    }

	    if (type.$$typeof === contextSymbol) {
	      return 'Context.Consumer';
	    }

	    if (type.$$typeof === forwardRefSymbol) {
	      const functionName = type.render.displayName || type.render.name || '';
	      return functionName !== '' ? 'ForwardRef(' + functionName + ')' : 'ForwardRef';
	    }
	  }

	  return 'UNDEFINED';
	};

	const getPropKeys = element => {
	  const props = element.props;
	  return Object.keys(props).filter(key => key !== 'children' && props[key] !== undefined).sort();
	};

	const serialize = exports.serialize = (element, config, indentation, depth, refs, printer) => ++depth > config.maxDepth ? (0, markup.printElementAsLeaf)(getType(element), config) : (0, markup.printElement)(getType(element), (0, markup.printProps)(getPropKeys(element), element.props, config, indentation + config.indent, depth, refs, printer), (0, markup.printChildren)(getChildren(element.props.children), config, indentation + config.indent, depth, refs, printer), config, indentation);

	const test = exports.test = val => val && val.$$typeof === elementSymbol;

	exports.default = {
	  serialize: serialize,
	  test: test
	};
	});

	unwrapExports(react_element);
	var react_element_1 = react_element.test;
	var react_element_2 = react_element.serialize;

	var react_test_component = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.test = exports.serialize = undefined;


	/**
	 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *
	 */


	const testSymbol = Symbol.for('react.test.json');

	const getPropKeys = object => {
	  const props = object.props;
	  return props ? Object.keys(props).filter(key => props[key] !== undefined).sort() : [];
	};

	const serialize = exports.serialize = (object, config, indentation, depth, refs, printer) => ++depth > config.maxDepth ? (0, markup.printElementAsLeaf)(object.type, config) : (0, markup.printElement)(object.type, object.props ? (0, markup.printProps)(getPropKeys(object), // Despite ternary expression, Flow 0.51.0 found incorrect error:
	// undefined is incompatible with the expected param type of Object
	// $FlowFixMe
	object.props, config, indentation + config.indent, depth, refs, printer) : '', object.children ? (0, markup.printChildren)(object.children, config, indentation + config.indent, depth, refs, printer) : '', config, indentation);

	const test = exports.test = val => val && val.$$typeof === testSymbol;

	exports.default = {
	  serialize: serialize,
	  test: test
	};
	});

	unwrapExports(react_test_component);
	var react_test_component_1 = react_test_component.test;
	var react_test_component_2 = react_test_component.serialize;

	var build$2 = createCommonjsModule(function (module) {



	var _ansiStyles2 = _interopRequireDefault(ansiStyles$1);





	var _asymmetric_matcher2 = _interopRequireDefault(asymmetric_matcher);



	var _convert_ansi2 = _interopRequireDefault(convert_ansi);



	var _dom_collection2 = _interopRequireDefault(dom_collection);



	var _dom_element2 = _interopRequireDefault(dom_element);



	var _immutable2 = _interopRequireDefault(immutable);



	var _react_element2 = _interopRequireDefault(react_element);



	var _react_test_component2 = _interopRequireDefault(react_test_component);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	}
	/**
	 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *
	 */


	const toString = Object.prototype.toString;
	const toISOString = Date.prototype.toISOString;
	const errorToString = Error.prototype.toString;
	const regExpToString = RegExp.prototype.toString;
	const symbolToString = Symbol.prototype.toString; // Explicitly comparing typeof constructor to function avoids undefined as name
	// when mock identity-obj-proxy returns the key as the value for any key.

	const getConstructorName = val => typeof val.constructor === 'function' && val.constructor.name || 'Object'; // Is val is equal to global window object? Works even if it does not exist :)

	/* global window */


	const isWindow = val => typeof window !== 'undefined' && val === window;

	const SYMBOL_REGEXP = /^Symbol\((.*)\)(.*)$/;
	const NEWLINE_REGEXP = /\n/gi;

	class PrettyFormatPluginError extends Error {
	  constructor(message, stack) {
	    super(message);
	    this.stack = stack;
	    this.name = this.constructor.name;
	  }

	}

	function isToStringedArrayType(toStringed) {
	  return toStringed === '[object Array]' || toStringed === '[object ArrayBuffer]' || toStringed === '[object DataView]' || toStringed === '[object Float32Array]' || toStringed === '[object Float64Array]' || toStringed === '[object Int8Array]' || toStringed === '[object Int16Array]' || toStringed === '[object Int32Array]' || toStringed === '[object Uint8Array]' || toStringed === '[object Uint8ClampedArray]' || toStringed === '[object Uint16Array]' || toStringed === '[object Uint32Array]';
	}

	function printNumber(val) {
	  return Object.is(val, -0) ? '-0' : String(val);
	}

	function printFunction(val, printFunctionName) {
	  if (!printFunctionName) {
	    return '[Function]';
	  }

	  return '[Function ' + (val.name || 'anonymous') + ']';
	}

	function printSymbol(val) {
	  return symbolToString.call(val).replace(SYMBOL_REGEXP, 'Symbol($1)');
	}

	function printError(val) {
	  return '[' + errorToString.call(val) + ']';
	}

	function printBasicValue(val, printFunctionName, escapeRegex) {
	  if (val === true || val === false) {
	    return '' + val;
	  }

	  if (val === undefined) {
	    return 'undefined';
	  }

	  if (val === null) {
	    return 'null';
	  }

	  const typeOf = typeof val;

	  if (typeOf === 'number') {
	    return printNumber(val);
	  }

	  if (typeOf === 'string') {
	    return '"' + val.replace(/"|\\/g, '\\$&') + '"';
	  }

	  if (typeOf === 'function') {
	    return printFunction(val, printFunctionName);
	  }

	  if (typeOf === 'symbol') {
	    return printSymbol(val);
	  }

	  const toStringed = toString.call(val);

	  if (toStringed === '[object WeakMap]') {
	    return 'WeakMap {}';
	  }

	  if (toStringed === '[object WeakSet]') {
	    return 'WeakSet {}';
	  }

	  if (toStringed === '[object Function]' || toStringed === '[object GeneratorFunction]') {
	    return printFunction(val, printFunctionName);
	  }

	  if (toStringed === '[object Symbol]') {
	    return printSymbol(val);
	  }

	  if (toStringed === '[object Date]') {
	    return isNaN(+val) ? 'Date { NaN }' : toISOString.call(val);
	  }

	  if (toStringed === '[object Error]') {
	    return printError(val);
	  }

	  if (toStringed === '[object RegExp]') {
	    if (escapeRegex) {
	      // https://github.com/benjamingr/RegExp.escape/blob/master/polyfill.js
	      return regExpToString.call(val).replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
	    }

	    return regExpToString.call(val);
	  }

	  if (val instanceof Error) {
	    return printError(val);
	  }

	  return null;
	}

	function printComplexValue(val, config, indentation, depth, refs, hasCalledToJSON) {
	  if (refs.indexOf(val) !== -1) {
	    return '[Circular]';
	  }

	  refs = refs.slice();
	  refs.push(val);
	  const hitMaxDepth = ++depth > config.maxDepth;
	  const min = config.min;

	  if (config.callToJSON && !hitMaxDepth && val.toJSON && typeof val.toJSON === 'function' && !hasCalledToJSON) {
	    return printer(val.toJSON(), config, indentation, depth, refs, true);
	  }

	  const toStringed = toString.call(val);

	  if (toStringed === '[object Arguments]') {
	    return hitMaxDepth ? '[Arguments]' : (min ? '' : 'Arguments ') + '[' + (0, collections.printListItems)(val, config, indentation, depth, refs, printer) + ']';
	  }

	  if (isToStringedArrayType(toStringed)) {
	    return hitMaxDepth ? '[' + val.constructor.name + ']' : (min ? '' : val.constructor.name + ' ') + '[' + (0, collections.printListItems)(val, config, indentation, depth, refs, printer) + ']';
	  }

	  if (toStringed === '[object Map]') {
	    return hitMaxDepth ? '[Map]' : 'Map {' + (0, collections.printIteratorEntries)(val.entries(), config, indentation, depth, refs, printer, ' => ') + '}';
	  }

	  if (toStringed === '[object Set]') {
	    return hitMaxDepth ? '[Set]' : 'Set {' + (0, collections.printIteratorValues)(val.values(), config, indentation, depth, refs, printer) + '}';
	  } // Avoid failure to serialize global window object in jsdom test environment.
	  // For example, not even relevant if window is prop of React element.


	  return hitMaxDepth || isWindow(val) ? '[' + getConstructorName(val) + ']' : (min ? '' : getConstructorName(val) + ' ') + '{' + (0, collections.printObjectProperties)(val, config, indentation, depth, refs, printer) + '}';
	}

	function printPlugin(plugin, val, config, indentation, depth, refs) {
	  let printed;

	  try {
	    printed = plugin.serialize ? plugin.serialize(val, config, indentation, depth, refs, printer) : plugin.print(val, valChild => printer(valChild, config, indentation, depth, refs), str => {
	      const indentationNext = indentation + config.indent;
	      return indentationNext + str.replace(NEWLINE_REGEXP, '\n' + indentationNext);
	    }, {
	      edgeSpacing: config.spacingOuter,
	      min: config.min,
	      spacing: config.spacingInner
	    }, config.colors);
	  } catch (error) {
	    throw new PrettyFormatPluginError(error.message, error.stack);
	  }

	  if (typeof printed !== 'string') {
	    throw new Error(`pretty-format: Plugin must return type "string" but instead returned "${typeof printed}".`);
	  }

	  return printed;
	}

	function findPlugin(plugins, val) {
	  for (let p = 0; p < plugins.length; p++) {
	    try {
	      if (plugins[p].test(val)) {
	        return plugins[p];
	      }
	    } catch (error) {
	      throw new PrettyFormatPluginError(error.message, error.stack);
	    }
	  }

	  return null;
	}

	function printer(val, config, indentation, depth, refs, hasCalledToJSON) {
	  const plugin = findPlugin(config.plugins, val);

	  if (plugin !== null) {
	    return printPlugin(plugin, val, config, indentation, depth, refs);
	  }

	  const basicResult = printBasicValue(val, config.printFunctionName, config.escapeRegex);

	  if (basicResult !== null) {
	    return basicResult;
	  }

	  return printComplexValue(val, config, indentation, depth, refs, hasCalledToJSON);
	}

	const DEFAULT_THEME = {
	  comment: 'gray',
	  content: 'reset',
	  prop: 'yellow',
	  tag: 'cyan',
	  value: 'green'
	};
	const DEFAULT_THEME_KEYS = Object.keys(DEFAULT_THEME);
	const DEFAULT_OPTIONS = {
	  callToJSON: true,
	  escapeRegex: false,
	  highlight: false,
	  indent: 2,
	  maxDepth: Infinity,
	  min: false,
	  plugins: [],
	  printFunctionName: true,
	  theme: DEFAULT_THEME
	};

	function validateOptions(options) {
	  Object.keys(options).forEach(key => {
	    if (!DEFAULT_OPTIONS.hasOwnProperty(key)) {
	      throw new Error(`pretty-format: Unknown option "${key}".`);
	    }
	  });

	  if (options.min && options.indent !== undefined && options.indent !== 0) {
	    throw new Error('pretty-format: Options "min" and "indent" cannot be used together.');
	  }

	  if (options.theme !== undefined) {
	    if (options.theme === null) {
	      throw new Error(`pretty-format: Option "theme" must not be null.`);
	    }

	    if (typeof options.theme !== 'object') {
	      throw new Error(`pretty-format: Option "theme" must be of type "object" but instead received "${typeof options.theme}".`);
	    }
	  }
	}

	const getColorsHighlight = (options // $FlowFixMe: Flow thinks keys from `Colors` are missing from `DEFAULT_THEME_KEYS`
	) => DEFAULT_THEME_KEYS.reduce((colors, key) => {
	  const value = options.theme && options.theme[key] !== undefined ? options.theme[key] : DEFAULT_THEME[key];
	  const color = _ansiStyles2.default[value];

	  if (color && typeof color.close === 'string' && typeof color.open === 'string') {
	    colors[key] = color;
	  } else {
	    throw new Error(`pretty-format: Option "theme" has a key "${key}" whose value "${value}" is undefined in ansi-styles.`);
	  }

	  return colors;
	}, Object.create(null));

	const getColorsEmpty = () => // $FlowFixMe: Flow thinks keys from `Colors` are missing from `DEFAULT_THEME_KEYS`
	DEFAULT_THEME_KEYS.reduce((colors, key) => {
	  colors[key] = {
	    close: '',
	    open: ''
	  };
	  return colors;
	}, Object.create(null));

	const getPrintFunctionName = options => options && options.printFunctionName !== undefined ? options.printFunctionName : DEFAULT_OPTIONS.printFunctionName;

	const getEscapeRegex = options => options && options.escapeRegex !== undefined ? options.escapeRegex : DEFAULT_OPTIONS.escapeRegex;

	const getConfig = options => ({
	  callToJSON: options && options.callToJSON !== undefined ? options.callToJSON : DEFAULT_OPTIONS.callToJSON,
	  colors: options && options.highlight ? getColorsHighlight(options) : getColorsEmpty(),
	  escapeRegex: getEscapeRegex(options),
	  indent: options && options.min ? '' : createIndent(options && options.indent !== undefined ? options.indent : DEFAULT_OPTIONS.indent),
	  maxDepth: options && options.maxDepth !== undefined ? options.maxDepth : DEFAULT_OPTIONS.maxDepth,
	  min: options && options.min !== undefined ? options.min : DEFAULT_OPTIONS.min,
	  plugins: options && options.plugins !== undefined ? options.plugins : DEFAULT_OPTIONS.plugins,
	  printFunctionName: getPrintFunctionName(options),
	  spacingInner: options && options.min ? ' ' : '\n',
	  spacingOuter: options && options.min ? '' : '\n'
	});

	function createIndent(indent) {
	  return new Array(indent + 1).join(' ');
	}

	function prettyFormat(val, options) {
	  if (options) {
	    validateOptions(options);

	    if (options.plugins) {
	      const plugin = findPlugin(options.plugins, val);

	      if (plugin !== null) {
	        return printPlugin(plugin, val, getConfig(options), '', 0, []);
	      }
	    }
	  }

	  const basicResult = printBasicValue(val, getPrintFunctionName(options), getEscapeRegex(options));

	  if (basicResult !== null) {
	    return basicResult;
	  }

	  return printComplexValue(val, getConfig(options), '', 0, []);
	}

	prettyFormat.plugins = {
	  AsymmetricMatcher: _asymmetric_matcher2.default,
	  ConvertAnsi: _convert_ansi2.default,
	  DOMCollection: _dom_collection2.default,
	  DOMElement: _dom_element2.default,
	  Immutable: _immutable2.default,
	  ReactElement: _react_element2.default,
	  ReactTestComponent: _react_test_component2.default
	};
	module.exports = prettyFormat;
	});

	unwrapExports(build$2);

	var build$3 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.matcherHint = exports.pluralize = exports.ensureNumbers = exports.ensureExpectedIsNumber = exports.ensureActualIsNumber = exports.ensureNoExpected = exports.printWithType = exports.printExpected = exports.printReceived = exports.highlightTrailingWhitespace = exports.stringify = exports.SUGGEST_TO_CONTAIN_EQUAL = exports.SUGGEST_TO_EQUAL = exports.RECEIVED_COLOR = exports.EXPECTED_COLOR = undefined;



	var _chalk2 = _interopRequireDefault(chalk);



	var _jestGetType2 = _interopRequireDefault(build$1);



	var _prettyFormat2 = _interopRequireDefault(build$2);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	}

	var _prettyFormat$plugins = _prettyFormat2.default.plugins;
	/**
	 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *
	 */

	const AsymmetricMatcher = _prettyFormat$plugins.AsymmetricMatcher,
	      DOMCollection = _prettyFormat$plugins.DOMCollection,
	      DOMElement = _prettyFormat$plugins.DOMElement,
	      Immutable = _prettyFormat$plugins.Immutable,
	      ReactElement = _prettyFormat$plugins.ReactElement,
	      ReactTestComponent = _prettyFormat$plugins.ReactTestComponent;
	const PLUGINS = [ReactTestComponent, ReactElement, DOMElement, DOMCollection, Immutable, AsymmetricMatcher];
	const EXPECTED_COLOR = exports.EXPECTED_COLOR = _chalk2.default.green;
	const RECEIVED_COLOR = exports.RECEIVED_COLOR = _chalk2.default.red;
	const NUMBERS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen'];

	const SUGGEST_TO_EQUAL = exports.SUGGEST_TO_EQUAL = _chalk2.default.dim('Note that you are testing for equality with the stricter `toBe` matcher using `Object.is`. For deep equality only, use `toEqual` instead.');

	const SUGGEST_TO_CONTAIN_EQUAL = exports.SUGGEST_TO_CONTAIN_EQUAL = _chalk2.default.dim('Looks like you wanted to test for object/array equality with the stricter `toContain` matcher. You probably need to use `toContainEqual` instead.');

	const stringify = exports.stringify = function (object) {
	  let maxDepth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
	  const MAX_LENGTH = 10000;
	  let result;

	  try {
	    result = (0, _prettyFormat2.default)(object, {
	      maxDepth: maxDepth,
	      min: true,
	      plugins: PLUGINS
	    });
	  } catch (e) {
	    result = (0, _prettyFormat2.default)(object, {
	      callToJSON: false,
	      maxDepth: maxDepth,
	      min: true,
	      plugins: PLUGINS
	    });
	  }

	  return result.length >= MAX_LENGTH && maxDepth > 1 ? stringify(object, Math.floor(maxDepth / 2)) : result;
	};

	const highlightTrailingWhitespace = exports.highlightTrailingWhitespace = text => text.replace(/\s+$/gm, _chalk2.default.inverse('$&'));

	const printReceived = exports.printReceived = object => RECEIVED_COLOR(highlightTrailingWhitespace(stringify(object)));

	const printExpected = exports.printExpected = value => EXPECTED_COLOR(highlightTrailingWhitespace(stringify(value)));

	const printWithType = exports.printWithType = (name, received, print) => {
	  const type = (0, _jestGetType2.default)(received);
	  return name + ':' + (type !== 'null' && type !== 'undefined' ? '\n  ' + type + ': ' : ' ') + print(received);
	};

	const ensureNoExpected = exports.ensureNoExpected = (expected, matcherName) => {
	  matcherName || (matcherName = 'This');

	  if (typeof expected !== 'undefined') {
	    throw new Error(matcherHint('[.not]' + matcherName, undefined, '') + '\n\n' + 'Matcher does not accept any arguments.\n' + printWithType('Got', expected, printExpected));
	  }
	};

	const ensureActualIsNumber = exports.ensureActualIsNumber = (actual, matcherName) => {
	  matcherName || (matcherName = 'This matcher');

	  if (typeof actual !== 'number') {
	    throw new Error(matcherHint('[.not]' + matcherName) + '\n\n' + `Received value must be a number.\n` + printWithType('Received', actual, printReceived));
	  }
	};

	const ensureExpectedIsNumber = exports.ensureExpectedIsNumber = (expected, matcherName) => {
	  matcherName || (matcherName = 'This matcher');

	  if (typeof expected !== 'number') {
	    throw new Error(matcherHint('[.not]' + matcherName) + '\n\n' + `Expected value must be a number.\n` + printWithType('Got', expected, printExpected));
	  }
	};

	const ensureNumbers = exports.ensureNumbers = (actual, expected, matcherName) => {
	  ensureActualIsNumber(actual, matcherName);
	  ensureExpectedIsNumber(expected, matcherName);
	};

	const pluralize = exports.pluralize = (word, count) => (NUMBERS[count] || count) + ' ' + word + (count === 1 ? '' : 's');

	const matcherHint = exports.matcherHint = function (matcherName) {
	  let received = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'received';
	  let expected = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'expected';
	  let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
	  const comment = options.comment,
	        isDirectExpectCall = options.isDirectExpectCall,
	        isNot = options.isNot,
	        secondArgument = options.secondArgument;
	  return _chalk2.default.dim('expect' + (isDirectExpectCall ? '' : '(')) + RECEIVED_COLOR(received) + (isNot ? `${_chalk2.default.dim(').')}not${_chalk2.default.dim(matcherName + '(')}` : _chalk2.default.dim((isDirectExpectCall ? '' : ')') + matcherName + '(')) + EXPECTED_COLOR(expected) + (secondArgument ? `${_chalk2.default.dim(', ')}${EXPECTED_COLOR(secondArgument)}` : '') + _chalk2.default.dim(`)${comment ? ` // ${comment}` : ''}`);
	};
	});

	unwrapExports(build$3);
	var build_1 = build$3.matcherHint;
	var build_2 = build$3.pluralize;
	var build_3 = build$3.ensureNumbers;
	var build_4 = build$3.ensureExpectedIsNumber;
	var build_5 = build$3.ensureActualIsNumber;
	var build_6 = build$3.ensureNoExpected;
	var build_7 = build$3.printWithType;
	var build_8 = build$3.printExpected;
	var build_9 = build$3.printReceived;
	var build_10 = build$3.highlightTrailingWhitespace;
	var build_11 = build$3.stringify;
	var build_12 = build$3.SUGGEST_TO_CONTAIN_EQUAL;
	var build_13 = build$3.SUGGEST_TO_EQUAL;
	var build_14 = build$3.RECEIVED_COLOR;
	var build_15 = build$3.EXPECTED_COLOR;

	var jasmine_utils = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.equals = equals;
	exports.isA = isA;
	exports.fnNameFor = fnNameFor;
	exports.isUndefined = isUndefined;
	exports.hasProperty = hasProperty;
	exports.isImmutableUnorderedKeyed = isImmutableUnorderedKeyed;
	exports.isImmutableUnorderedSet = isImmutableUnorderedSet; // Extracted out of jasmine 2.5.2

	function equals(a, b, customTesters, strictCheck) {
	  customTesters = customTesters || [];
	  return eq(a, b, [], [], customTesters, strictCheck ? hasKey : hasDefinedKey);
	}
	/*
	Copyright (c) 2008-2016 Pivotal Labs

	Permission is hereby granted, free of charge, to any person obtaining
	a copy of this software and associated documentation files (the
	"Software"), to deal in the Software without restriction, including
	without limitation the rights to use, copy, modify, merge, publish,
	distribute, sublicense, and/or sell copies of the Software, and to
	permit persons to whom the Software is furnished to do so, subject to
	the following conditions:

	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
	LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
	OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


	*/

	/* eslint-disable */


	function isAsymmetric(obj) {
	  return obj && isA('Function', obj.asymmetricMatch);
	}

	function asymmetricMatch(a, b) {
	  var asymmetricA = isAsymmetric(a),
	      asymmetricB = isAsymmetric(b);

	  if (asymmetricA && asymmetricB) {
	    return undefined;
	  }

	  if (asymmetricA) {
	    return a.asymmetricMatch(b);
	  }

	  if (asymmetricB) {
	    return b.asymmetricMatch(a);
	  }
	} // Equality function lovingly adapted from isEqual in
	//   [Underscore](http://underscorejs.org)


	function eq(a, b, aStack, bStack, customTesters, hasKey) {
	  var result = true;
	  var asymmetricResult = asymmetricMatch(a, b);

	  if (asymmetricResult !== undefined) {
	    return asymmetricResult;
	  }

	  for (var i = 0; i < customTesters.length; i++) {
	    var customTesterResult = customTesters[i](a, b);

	    if (customTesterResult !== undefined) {
	      return customTesterResult;
	    }
	  }

	  if (a instanceof Error && b instanceof Error) {
	    return a.message == b.message;
	  }

	  if (Object.is(a, b)) {
	    return true;
	  } // A strict comparison is necessary because `null == undefined`.


	  if (a === null || b === null) {
	    return a === b;
	  }

	  var className = Object.prototype.toString.call(a);

	  if (className != Object.prototype.toString.call(b)) {
	    return false;
	  }

	  switch (className) {
	    // Strings, numbers, dates, and booleans are compared by value.
	    case '[object String]':
	      // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	      // equivalent to `new String("5")`.
	      return a == String(b);

	    case '[object Number]':
	      // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
	      // other numeric values.
	      return a != +a ? b != +b : a === 0 ? 1 / a == 1 / b : a == +b;

	    case '[object Date]':
	    case '[object Boolean]':
	      // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	      // millisecond representations. Note that invalid dates with millisecond representations
	      // of `NaN` are not equivalent.
	      return +a == +b;
	    // RegExps are compared by their source patterns and flags.

	    case '[object RegExp]':
	      return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase;
	  }

	  if (typeof a != 'object' || typeof b != 'object') {
	    return false;
	  }

	  var aIsDomNode = isDomNode(a);
	  var bIsDomNode = isDomNode(b);

	  if (aIsDomNode && bIsDomNode) {
	    // At first try to use DOM3 method isEqualNode
	    if (a.isEqualNode) {
	      return a.isEqualNode(b);
	    } // IE8 doesn't support isEqualNode, try to use outerHTML && innerText


	    var aIsElement = a instanceof Element;
	    var bIsElement = b instanceof Element;

	    if (aIsElement && bIsElement) {
	      return a.outerHTML == b.outerHTML;
	    }

	    if (aIsElement || bIsElement) {
	      return false;
	    }

	    return a.innerText == b.innerText && a.textContent == b.textContent;
	  }

	  if (aIsDomNode || bIsDomNode) {
	    return false;
	  } // Assume equality for cyclic structures. The algorithm for detecting cyclic
	  // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.


	  var length = aStack.length;

	  while (length--) {
	    // Linear search. Performance is inversely proportional to the number of
	    // unique nested structures.
	    if (aStack[length] == a) {
	      return bStack[length] == b;
	    }
	  } // Add the first object to the stack of traversed objects.


	  aStack.push(a);
	  bStack.push(b);
	  var size = 0; // Recursively compare objects and arrays.
	  // Compare array lengths to determine if a deep comparison is necessary.

	  if (className == '[object Array]') {
	    size = a.length;

	    if (size !== b.length) {
	      return false;
	    }

	    while (size--) {
	      result = eq(a[size], b[size], aStack, bStack, customTesters, hasKey);

	      if (!result) {
	        return false;
	      }
	    }
	  } // Deep compare objects.


	  var aKeys = keys(a, className == '[object Array]', hasKey),
	      key;
	  size = aKeys.length; // Ensure that both objects contain the same number of properties before comparing deep equality.

	  if (keys(b, className == '[object Array]', hasKey).length !== size) {
	    return false;
	  }

	  while (size--) {
	    key = aKeys[size]; // Deep compare each member

	    result = hasKey(b, key) && eq(a[key], b[key], aStack, bStack, customTesters, hasKey);

	    if (!result) {
	      return false;
	    }
	  } // Remove the first object from the stack of traversed objects.


	  aStack.pop();
	  bStack.pop();
	  return result;
	}

	function keys(obj, isArray, hasKey) {
	  var allKeys = function (o) {
	    var keys = [];

	    for (var key in o) {
	      if (hasKey(o, key)) {
	        keys.push(key);
	      }
	    }

	    return keys.concat(Object.getOwnPropertySymbols(o).filter( //$FlowFixMe Jest complains about nullability, but we know for sure that property 'symbol' does exist.
	    symbol => Object.getOwnPropertyDescriptor(o, symbol).enumerable));
	  }(obj);

	  if (!isArray) {
	    return allKeys;
	  }

	  var extraKeys = [];

	  if (allKeys.length === 0) {
	    return allKeys;
	  }

	  for (var x = 0; x < allKeys.length; x++) {
	    //$FlowFixMe
	    if (typeof allKeys[x] === 'symbol' || !allKeys[x].match(/^[0-9]+$/)) {
	      extraKeys.push(allKeys[x]);
	    }
	  }

	  return extraKeys;
	}

	function hasDefinedKey(obj, key) {
	  return hasKey(obj, key) && obj[key] !== undefined;
	}

	function hasKey(obj, key) {
	  return Object.prototype.hasOwnProperty.call(obj, key);
	}

	function isA(typeName, value) {
	  return Object.prototype.toString.apply(value) === '[object ' + typeName + ']';
	}

	function isDomNode(obj) {
	  return obj !== null && typeof obj === 'object' && typeof obj.nodeType === 'number' && typeof obj.nodeName === 'string';
	}

	function fnNameFor(func) {
	  if (func.name) {
	    return func.name;
	  }

	  const matches = func.toString().match(/^\s*function\s*(\w*)\s*\(/);
	  return matches ? matches[1] : '<anonymous>';
	}

	function isUndefined(obj) {
	  return obj === void 0;
	}

	function getPrototype(obj) {
	  if (Object.getPrototypeOf) {
	    return Object.getPrototypeOf(obj);
	  }

	  if (obj.constructor.prototype == obj) {
	    return null;
	  }

	  return obj.constructor.prototype;
	}

	function hasProperty(obj, property) {
	  if (!obj) {
	    return false;
	  }

	  if (Object.prototype.hasOwnProperty.call(obj, property)) {
	    return true;
	  }

	  return hasProperty(getPrototype(obj), property);
	} // SENTINEL constants are from https://github.com/facebook/immutable-js


	const IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
	const IS_SET_SENTINEL = '@@__IMMUTABLE_SET__@@';
	const IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

	function isImmutableUnorderedKeyed(maybeKeyed) {
	  return !!(maybeKeyed && maybeKeyed[IS_KEYED_SENTINEL] && !maybeKeyed[IS_ORDERED_SENTINEL]);
	}

	function isImmutableUnorderedSet(maybeSet) {
	  return !!(maybeSet && maybeSet[IS_SET_SENTINEL] && !maybeSet[IS_ORDERED_SENTINEL]);
	}
	});

	unwrapExports(jasmine_utils);
	var jasmine_utils_1 = jasmine_utils.equals;
	var jasmine_utils_2 = jasmine_utils.isA;
	var jasmine_utils_3 = jasmine_utils.fnNameFor;
	var jasmine_utils_4 = jasmine_utils.isUndefined;
	var jasmine_utils_5 = jasmine_utils.hasProperty;
	var jasmine_utils_6 = jasmine_utils.isImmutableUnorderedKeyed;
	var jasmine_utils_7 = jasmine_utils.isImmutableUnorderedSet;

	var utils = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.isOneline = exports.isError = exports.partition = exports.typeEquality = exports.subsetEquality = exports.iterableEquality = exports.getObjectSubset = exports.getPath = exports.hasOwnProperty = undefined;
	exports.emptyObject = emptyObject;



	const hasOwnProperty = exports.hasOwnProperty = (object, value) => Object.prototype.hasOwnProperty.call(object, value) || Object.prototype.hasOwnProperty.call(object.constructor.prototype, value);
	/**
	 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *
	 */


	const getPath = exports.getPath = (object, propertyPath) => {
	  if (!Array.isArray(propertyPath)) {
	    propertyPath = propertyPath.split('.');
	  }

	  if (propertyPath.length) {
	    const lastProp = propertyPath.length === 1;
	    const prop = propertyPath[0];
	    const newObject = object[prop];

	    if (!lastProp && (newObject === null || newObject === undefined)) {
	      // This is not the last prop in the chain. If we keep recursing it will
	      // hit a `can't access property X of undefined | null`. At this point we
	      // know that the chain has broken and we can return right away.
	      return {
	        hasEndProp: false,
	        lastTraversedObject: object,
	        traversedPath: []
	      };
	    }

	    const result = getPath(newObject, propertyPath.slice(1));

	    if (result.lastTraversedObject === null) {
	      result.lastTraversedObject = object;
	    }

	    result.traversedPath.unshift(prop);

	    if (lastProp) {
	      result.hasEndProp = hasOwnProperty(object, prop);

	      if (!result.hasEndProp) {
	        result.traversedPath.shift();
	      }
	    }

	    return result;
	  }

	  return {
	    lastTraversedObject: null,
	    traversedPath: [],
	    value: object
	  };
	}; // Strip properties from object that are not present in the subset. Useful for
	// printing the diff for toMatchObject() without adding unrelated noise.


	const getObjectSubset = exports.getObjectSubset = (object, subset) => {
	  if (Array.isArray(object)) {
	    if (Array.isArray(subset) && subset.length === object.length) {
	      return subset.map((sub, i) => getObjectSubset(object[i], sub));
	    }
	  } else if (object instanceof Date) {
	    return object;
	  } else if (typeof object === 'object' && object !== null && typeof subset === 'object' && subset !== null) {
	    const trimmed = {};
	    Object.keys(subset).filter(key => hasOwnProperty(object, key)).forEach(key => trimmed[key] = getObjectSubset(object[key], subset[key]));

	    if (Object.keys(trimmed).length > 0) {
	      return trimmed;
	    }
	  }

	  return object;
	};

	const IteratorSymbol = Symbol.iterator;

	const hasIterator = object => !!(object != null && object[IteratorSymbol]);

	const iterableEquality = exports.iterableEquality = (a, b) => {
	  if (typeof a !== 'object' || typeof b !== 'object' || Array.isArray(a) || Array.isArray(b) || !hasIterator(a) || !hasIterator(b)) {
	    return undefined;
	  }

	  if (a.constructor !== b.constructor) {
	    return false;
	  }

	  if (a.size !== undefined) {
	    if (a.size !== b.size) {
	      return false;
	    } else if ((0, jasmine_utils.isA)('Set', a) || (0, jasmine_utils.isImmutableUnorderedSet)(a)) {
	      let allFound = true;

	      for (const aValue of a) {
	        if (!b.has(aValue)) {
	          let has = false;

	          for (const bValue of b) {
	            const isEqual = (0, jasmine_utils.equals)(aValue, bValue, [iterableEquality]);

	            if (isEqual === true) {
	              has = true;
	            }
	          }

	          if (has === false) {
	            allFound = false;
	            break;
	          }
	        }
	      }

	      if (allFound) {
	        return true;
	      }
	    } else if ((0, jasmine_utils.isA)('Map', a) || (0, jasmine_utils.isImmutableUnorderedKeyed)(a)) {
	      let allFound = true;

	      for (const aEntry of a) {
	        if (!b.has(aEntry[0]) || !(0, jasmine_utils.equals)(aEntry[1], b.get(aEntry[0]), [iterableEquality])) {
	          let has = false;

	          for (const bEntry of b) {
	            const matchedKey = (0, jasmine_utils.equals)(aEntry[0], bEntry[0], [iterableEquality]);
	            let matchedValue = false;

	            if (matchedKey === true) {
	              matchedValue = (0, jasmine_utils.equals)(aEntry[1], bEntry[1], [iterableEquality]);
	            }

	            if (matchedValue === true) {
	              has = true;
	            }
	          }

	          if (has === false) {
	            allFound = false;
	            break;
	          }
	        }
	      }

	      if (allFound) {
	        return true;
	      }
	    }
	  }

	  const bIterator = b[IteratorSymbol]();

	  for (const aValue of a) {
	    const nextB = bIterator.next();

	    if (nextB.done || !(0, jasmine_utils.equals)(aValue, nextB.value, [iterableEquality])) {
	      return false;
	    }
	  }

	  if (!bIterator.next().done) {
	    return false;
	  }

	  return true;
	};

	const isObjectWithKeys = a => a !== null && typeof a === 'object' && !(a instanceof Error) && !(a instanceof Array) && !(a instanceof Date);

	const subsetEquality = exports.subsetEquality = (object, subset) => {
	  if (!isObjectWithKeys(subset)) {
	    return undefined;
	  }

	  return Object.keys(subset).every(key => object != null && hasOwnProperty(object, key) && (0, jasmine_utils.equals)(object[key], subset[key], [iterableEquality, subsetEquality]));
	};

	const typeEquality = exports.typeEquality = (a, b) => {
	  if (a == null || b == null || a.constructor.name === b.constructor.name) {
	    return undefined;
	  }

	  return false;
	};

	const partition = exports.partition = (items, predicate) => {
	  const result = [[], []];
	  items.forEach(item => result[predicate(item) ? 0 : 1].push(item));
	  return result;
	}; // Copied from https://github.com/graingert/angular.js/blob/a43574052e9775cbc1d7dd8a086752c979b0f020/src/Angular.js#L685-L693


	const isError = exports.isError = value => {
	  switch (Object.prototype.toString.call(value)) {
	    case '[object Error]':
	      return true;

	    case '[object Exception]':
	      return true;

	    case '[object DOMException]':
	      return true;

	    default:
	      return value instanceof Error;
	  }
	};

	function emptyObject(obj) {
	  return obj && typeof obj === 'object' ? !Object.keys(obj).length : false;
	}

	const MULTILINE_REGEXP = /[\r\n]/;

	const isOneline = exports.isOneline = (expected, received) => typeof expected === 'string' && typeof received === 'string' && (!MULTILINE_REGEXP.test(expected) || !MULTILINE_REGEXP.test(received));
	});

	unwrapExports(utils);
	var utils_1 = utils.isOneline;
	var utils_2 = utils.isError;
	var utils_3 = utils.partition;
	var utils_4 = utils.typeEquality;
	var utils_5 = utils.subsetEquality;
	var utils_6 = utils.iterableEquality;
	var utils_7 = utils.getObjectSubset;
	var utils_8 = utils.getPath;
	var utils_9 = utils.emptyObject;

	var base = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports['default'] =
	/*istanbul ignore end*/
	Diff;

	function Diff() {}

	Diff.prototype = {
	  /*istanbul ignore start*/

	  /*istanbul ignore end*/
	  diff: function diff(oldString, newString) {
	    /*istanbul ignore start*/
	    var
	    /*istanbul ignore end*/
	    options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	    var callback = options.callback;

	    if (typeof options === 'function') {
	      callback = options;
	      options = {};
	    }

	    this.options = options;
	    var self = this;

	    function done(value) {
	      if (callback) {
	        setTimeout(function () {
	          callback(undefined, value);
	        }, 0);
	        return true;
	      } else {
	        return value;
	      }
	    } // Allow subclasses to massage the input prior to running


	    oldString = this.castInput(oldString);
	    newString = this.castInput(newString);
	    oldString = this.removeEmpty(this.tokenize(oldString));
	    newString = this.removeEmpty(this.tokenize(newString));
	    var newLen = newString.length,
	        oldLen = oldString.length;
	    var editLength = 1;
	    var maxEditLength = newLen + oldLen;
	    var bestPath = [{
	      newPos: -1,
	      components: []
	    }]; // Seed editLength = 0, i.e. the content starts with the same values

	    var oldPos = this.extractCommon(bestPath[0], newString, oldString, 0);

	    if (bestPath[0].newPos + 1 >= newLen && oldPos + 1 >= oldLen) {
	      // Identity per the equality and tokenizer
	      return done([{
	        value: this.join(newString),
	        count: newString.length
	      }]);
	    } // Main worker method. checks all permutations of a given edit length for acceptance.


	    function execEditLength() {
	      for (var diagonalPath = -1 * editLength; diagonalPath <= editLength; diagonalPath += 2) {
	        var basePath =
	        /*istanbul ignore start*/
	        void 0
	        /*istanbul ignore end*/
	        ;

	        var addPath = bestPath[diagonalPath - 1],
	            removePath = bestPath[diagonalPath + 1],
	            _oldPos = (removePath ? removePath.newPos : 0) - diagonalPath;

	        if (addPath) {
	          // No one else is going to attempt to use this value, clear it
	          bestPath[diagonalPath - 1] = undefined;
	        }

	        var canAdd = addPath && addPath.newPos + 1 < newLen,
	            canRemove = removePath && 0 <= _oldPos && _oldPos < oldLen;

	        if (!canAdd && !canRemove) {
	          // If this path is a terminal then prune
	          bestPath[diagonalPath] = undefined;
	          continue;
	        } // Select the diagonal that we want to branch from. We select the prior
	        // path whose position in the new string is the farthest from the origin
	        // and does not pass the bounds of the diff graph


	        if (!canAdd || canRemove && addPath.newPos < removePath.newPos) {
	          basePath = clonePath(removePath);
	          self.pushComponent(basePath.components, undefined, true);
	        } else {
	          basePath = addPath; // No need to clone, we've pulled it from the list

	          basePath.newPos++;
	          self.pushComponent(basePath.components, true, undefined);
	        }

	        _oldPos = self.extractCommon(basePath, newString, oldString, diagonalPath); // If we have hit the end of both strings, then we are done

	        if (basePath.newPos + 1 >= newLen && _oldPos + 1 >= oldLen) {
	          return done(buildValues(self, basePath.components, newString, oldString, self.useLongestToken));
	        } else {
	          // Otherwise track this path as a potential candidate and continue.
	          bestPath[diagonalPath] = basePath;
	        }
	      }

	      editLength++;
	    } // Performs the length of edit iteration. Is a bit fugly as this has to support the
	    // sync and async mode which is never fun. Loops over execEditLength until a value
	    // is produced.


	    if (callback) {
	      (function exec() {
	        setTimeout(function () {
	          // This should not happen, but we want to be safe.

	          /* istanbul ignore next */
	          if (editLength > maxEditLength) {
	            return callback();
	          }

	          if (!execEditLength()) {
	            exec();
	          }
	        }, 0);
	      })();
	    } else {
	      while (editLength <= maxEditLength) {
	        var ret = execEditLength();

	        if (ret) {
	          return ret;
	        }
	      }
	    }
	  },

	  /*istanbul ignore start*/

	  /*istanbul ignore end*/
	  pushComponent: function pushComponent(components, added, removed) {
	    var last = components[components.length - 1];

	    if (last && last.added === added && last.removed === removed) {
	      // We need to clone here as the component clone operation is just
	      // as shallow array clone
	      components[components.length - 1] = {
	        count: last.count + 1,
	        added: added,
	        removed: removed
	      };
	    } else {
	      components.push({
	        count: 1,
	        added: added,
	        removed: removed
	      });
	    }
	  },

	  /*istanbul ignore start*/

	  /*istanbul ignore end*/
	  extractCommon: function extractCommon(basePath, newString, oldString, diagonalPath) {
	    var newLen = newString.length,
	        oldLen = oldString.length,
	        newPos = basePath.newPos,
	        oldPos = newPos - diagonalPath,
	        commonCount = 0;

	    while (newPos + 1 < newLen && oldPos + 1 < oldLen && this.equals(newString[newPos + 1], oldString[oldPos + 1])) {
	      newPos++;
	      oldPos++;
	      commonCount++;
	    }

	    if (commonCount) {
	      basePath.components.push({
	        count: commonCount
	      });
	    }

	    basePath.newPos = newPos;
	    return oldPos;
	  },

	  /*istanbul ignore start*/

	  /*istanbul ignore end*/
	  equals: function equals(left, right) {
	    if (this.options.comparator) {
	      return this.options.comparator(left, right);
	    } else {
	      return left === right || this.options.ignoreCase && left.toLowerCase() === right.toLowerCase();
	    }
	  },

	  /*istanbul ignore start*/

	  /*istanbul ignore end*/
	  removeEmpty: function removeEmpty(array) {
	    var ret = [];

	    for (var i = 0; i < array.length; i++) {
	      if (array[i]) {
	        ret.push(array[i]);
	      }
	    }

	    return ret;
	  },

	  /*istanbul ignore start*/

	  /*istanbul ignore end*/
	  castInput: function castInput(value) {
	    return value;
	  },

	  /*istanbul ignore start*/

	  /*istanbul ignore end*/
	  tokenize: function tokenize(value) {
	    return value.split('');
	  },

	  /*istanbul ignore start*/

	  /*istanbul ignore end*/
	  join: function join(chars) {
	    return chars.join('');
	  }
	};

	function buildValues(diff, components, newString, oldString, useLongestToken) {
	  var componentPos = 0,
	      componentLen = components.length,
	      newPos = 0,
	      oldPos = 0;

	  for (; componentPos < componentLen; componentPos++) {
	    var component = components[componentPos];

	    if (!component.removed) {
	      if (!component.added && useLongestToken) {
	        var value = newString.slice(newPos, newPos + component.count);
	        value = value.map(function (value, i) {
	          var oldValue = oldString[oldPos + i];
	          return oldValue.length > value.length ? oldValue : value;
	        });
	        component.value = diff.join(value);
	      } else {
	        component.value = diff.join(newString.slice(newPos, newPos + component.count));
	      }

	      newPos += component.count; // Common case

	      if (!component.added) {
	        oldPos += component.count;
	      }
	    } else {
	      component.value = diff.join(oldString.slice(oldPos, oldPos + component.count));
	      oldPos += component.count; // Reverse add and remove so removes are output first to match common convention
	      // The diffing algorithm is tied to add then remove output and this is the simplest
	      // route to get the desired output with minimal overhead.

	      if (componentPos && components[componentPos - 1].added) {
	        var tmp = components[componentPos - 1];
	        components[componentPos - 1] = components[componentPos];
	        components[componentPos] = tmp;
	      }
	    }
	  } // Special case handle for when one terminal is ignored (i.e. whitespace).
	  // For this case we merge the terminal into the prior string and drop the change.
	  // This is only available for string mode.


	  var lastComponent = components[componentLen - 1];

	  if (componentLen > 1 && typeof lastComponent.value === 'string' && (lastComponent.added || lastComponent.removed) && diff.equals('', lastComponent.value)) {
	    components[componentLen - 2].value += lastComponent.value;
	    components.pop();
	  }

	  return components;
	}

	function clonePath(path) {
	  return {
	    newPos: path.newPos,
	    components: path.components.slice(0)
	  };
	}
	});

	unwrapExports(base);

	var character = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports.characterDiff = undefined;
	exports.
	/*istanbul ignore end*/
	diffChars = diffChars;


	/*istanbul ignore start*/


	var _base2 = _interopRequireDefault(base);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    'default': obj
	  };
	}
	/*istanbul ignore end*/


	var characterDiff =
	/*istanbul ignore start*/
	exports.
	/*istanbul ignore end*/
	characterDiff = new
	/*istanbul ignore start*/
	_base2['default']
	/*istanbul ignore end*/
	();

	function diffChars(oldStr, newStr, options) {
	  return characterDiff.diff(oldStr, newStr, options);
	}
	});

	unwrapExports(character);
	var character_1 = character.characterDiff;
	var character_2 = character.diffChars;

	var params = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports.
	/*istanbul ignore end*/
	generateOptions = generateOptions;

	function generateOptions(options, defaults) {
	  if (typeof options === 'function') {
	    defaults.callback = options;
	  } else if (options) {
	    for (var name in options) {
	      /* istanbul ignore else */
	      if (options.hasOwnProperty(name)) {
	        defaults[name] = options[name];
	      }
	    }
	  }

	  return defaults;
	}
	});

	unwrapExports(params);
	var params_1 = params.generateOptions;

	var word = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports.wordDiff = undefined;
	exports.
	/*istanbul ignore end*/
	diffWords = diffWords;
	/*istanbul ignore start*/

	exports.
	/*istanbul ignore end*/
	diffWordsWithSpace = diffWordsWithSpace;


	/*istanbul ignore start*/


	var _base2 = _interopRequireDefault(base);
	/*istanbul ignore end*/



	/*istanbul ignore start*/


	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    'default': obj
	  };
	}
	/*istanbul ignore end*/
	// Based on https://en.wikipedia.org/wiki/Latin_script_in_Unicode
	//
	// Ranges and exceptions:
	// Latin-1 Supplement, 0080–00FF
	//  - U+00D7  × Multiplication sign
	//  - U+00F7  ÷ Division sign
	// Latin Extended-A, 0100–017F
	// Latin Extended-B, 0180–024F
	// IPA Extensions, 0250–02AF
	// Spacing Modifier Letters, 02B0–02FF
	//  - U+02C7  ˇ &#711;  Caron
	//  - U+02D8  ˘ &#728;  Breve
	//  - U+02D9  ˙ &#729;  Dot Above
	//  - U+02DA  ˚ &#730;  Ring Above
	//  - U+02DB  ˛ &#731;  Ogonek
	//  - U+02DC  ˜ &#732;  Small Tilde
	//  - U+02DD  ˝ &#733;  Double Acute Accent
	// Latin Extended Additional, 1E00–1EFF


	var extendedWordChars = /^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/;
	var reWhitespace = /\S/;
	var wordDiff =
	/*istanbul ignore start*/
	exports.
	/*istanbul ignore end*/
	wordDiff = new
	/*istanbul ignore start*/
	_base2['default']
	/*istanbul ignore end*/
	();

	wordDiff.equals = function (left, right) {
	  if (this.options.ignoreCase) {
	    left = left.toLowerCase();
	    right = right.toLowerCase();
	  }

	  return left === right || this.options.ignoreWhitespace && !reWhitespace.test(left) && !reWhitespace.test(right);
	};

	wordDiff.tokenize = function (value) {
	  var tokens = value.split(/(\s+|\b)/); // Join the boundary splits that we do not consider to be boundaries. This is primarily the extended Latin character set.

	  for (var i = 0; i < tokens.length - 1; i++) {
	    // If we have an empty string in the next field and we have only word chars before and after, merge
	    if (!tokens[i + 1] && tokens[i + 2] && extendedWordChars.test(tokens[i]) && extendedWordChars.test(tokens[i + 2])) {
	      tokens[i] += tokens[i + 2];
	      tokens.splice(i + 1, 2);
	      i--;
	    }
	  }

	  return tokens;
	};

	function diffWords(oldStr, newStr, options) {
	  options =
	  /*istanbul ignore start*/
	  (0, params.generateOptions
	  /*istanbul ignore end*/
	  )(options, {
	    ignoreWhitespace: true
	  });
	  return wordDiff.diff(oldStr, newStr, options);
	}

	function diffWordsWithSpace(oldStr, newStr, options) {
	  return wordDiff.diff(oldStr, newStr, options);
	}
	});

	unwrapExports(word);
	var word_1 = word.wordDiff;
	var word_2 = word.diffWords;
	var word_3 = word.diffWordsWithSpace;

	var line = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports.lineDiff = undefined;
	exports.
	/*istanbul ignore end*/
	diffLines = diffLines;
	/*istanbul ignore start*/

	exports.
	/*istanbul ignore end*/
	diffTrimmedLines = diffTrimmedLines;


	/*istanbul ignore start*/


	var _base2 = _interopRequireDefault(base);
	/*istanbul ignore end*/



	/*istanbul ignore start*/


	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    'default': obj
	  };
	}
	/*istanbul ignore end*/


	var lineDiff =
	/*istanbul ignore start*/
	exports.
	/*istanbul ignore end*/
	lineDiff = new
	/*istanbul ignore start*/
	_base2['default']
	/*istanbul ignore end*/
	();

	lineDiff.tokenize = function (value) {
	  var retLines = [],
	      linesAndNewlines = value.split(/(\n|\r\n)/); // Ignore the final empty token that occurs if the string ends with a new line

	  if (!linesAndNewlines[linesAndNewlines.length - 1]) {
	    linesAndNewlines.pop();
	  } // Merge the content and line separators into single tokens


	  for (var i = 0; i < linesAndNewlines.length; i++) {
	    var line = linesAndNewlines[i];

	    if (i % 2 && !this.options.newlineIsToken) {
	      retLines[retLines.length - 1] += line;
	    } else {
	      if (this.options.ignoreWhitespace) {
	        line = line.trim();
	      }

	      retLines.push(line);
	    }
	  }

	  return retLines;
	};

	function diffLines(oldStr, newStr, callback) {
	  return lineDiff.diff(oldStr, newStr, callback);
	}

	function diffTrimmedLines(oldStr, newStr, callback) {
	  var options =
	  /*istanbul ignore start*/
	  (0, params.generateOptions
	  /*istanbul ignore end*/
	  )(callback, {
	    ignoreWhitespace: true
	  });
	  return lineDiff.diff(oldStr, newStr, options);
	}
	});

	unwrapExports(line);
	var line_1 = line.lineDiff;
	var line_2 = line.diffLines;
	var line_3 = line.diffTrimmedLines;

	var sentence = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports.sentenceDiff = undefined;
	exports.
	/*istanbul ignore end*/
	diffSentences = diffSentences;


	/*istanbul ignore start*/


	var _base2 = _interopRequireDefault(base);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    'default': obj
	  };
	}
	/*istanbul ignore end*/


	var sentenceDiff =
	/*istanbul ignore start*/
	exports.
	/*istanbul ignore end*/
	sentenceDiff = new
	/*istanbul ignore start*/
	_base2['default']
	/*istanbul ignore end*/
	();

	sentenceDiff.tokenize = function (value) {
	  return value.split(/(\S.+?[.!?])(?=\s+|$)/);
	};

	function diffSentences(oldStr, newStr, callback) {
	  return sentenceDiff.diff(oldStr, newStr, callback);
	}
	});

	unwrapExports(sentence);
	var sentence_1 = sentence.sentenceDiff;
	var sentence_2 = sentence.diffSentences;

	var css = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports.cssDiff = undefined;
	exports.
	/*istanbul ignore end*/
	diffCss = diffCss;


	/*istanbul ignore start*/


	var _base2 = _interopRequireDefault(base);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    'default': obj
	  };
	}
	/*istanbul ignore end*/


	var cssDiff =
	/*istanbul ignore start*/
	exports.
	/*istanbul ignore end*/
	cssDiff = new
	/*istanbul ignore start*/
	_base2['default']
	/*istanbul ignore end*/
	();

	cssDiff.tokenize = function (value) {
	  return value.split(/([{}:;,]|\s+)/);
	};

	function diffCss(oldStr, newStr, callback) {
	  return cssDiff.diff(oldStr, newStr, callback);
	}
	});

	unwrapExports(css);
	var css_1 = css.cssDiff;
	var css_2 = css.diffCss;

	var json = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports.jsonDiff = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	  return typeof obj;
	} : function (obj) {
	  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};

	exports.
	/*istanbul ignore end*/
	diffJson = diffJson;
	/*istanbul ignore start*/

	exports.
	/*istanbul ignore end*/
	canonicalize = canonicalize;


	/*istanbul ignore start*/


	var _base2 = _interopRequireDefault(base);
	/*istanbul ignore end*/



	/*istanbul ignore start*/


	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    'default': obj
	  };
	}
	/*istanbul ignore end*/


	var objectPrototypeToString = Object.prototype.toString;
	var jsonDiff =
	/*istanbul ignore start*/
	exports.
	/*istanbul ignore end*/
	jsonDiff = new
	/*istanbul ignore start*/
	_base2['default']
	/*istanbul ignore end*/
	(); // Discriminate between two lines of pretty-printed, serialized JSON where one of them has a
	// dangling comma and the other doesn't. Turns out including the dangling comma yields the nicest output:

	jsonDiff.useLongestToken = true;
	jsonDiff.tokenize =
	/*istanbul ignore start*/
	line.lineDiff
	/*istanbul ignore end*/
	.tokenize;

	jsonDiff.castInput = function (value) {
	  /*istanbul ignore start*/
	  var _options =
	  /*istanbul ignore end*/
	  this.options,
	      undefinedReplacement = _options.undefinedReplacement,
	      _options$stringifyRep = _options.stringifyReplacer,
	      stringifyReplacer = _options$stringifyRep === undefined ? function (k, v)
	  /*istanbul ignore start*/
	  {
	    return (
	      /*istanbul ignore end*/
	      typeof v === 'undefined' ? undefinedReplacement : v
	    );
	  } : _options$stringifyRep;
	  return typeof value === 'string' ? value : JSON.stringify(canonicalize(value, null, null, stringifyReplacer), stringifyReplacer, '  ');
	};

	jsonDiff.equals = function (left, right) {
	  return (
	    /*istanbul ignore start*/
	    _base2['default']
	    /*istanbul ignore end*/
	    .prototype.equals.call(jsonDiff, left.replace(/,([\r\n])/g, '$1'), right.replace(/,([\r\n])/g, '$1'))
	  );
	};

	function diffJson(oldObj, newObj, options) {
	  return jsonDiff.diff(oldObj, newObj, options);
	} // This function handles the presence of circular references by bailing out when encountering an
	// object that is already on the "stack" of items being processed. Accepts an optional replacer


	function canonicalize(obj, stack, replacementStack, replacer, key) {
	  stack = stack || [];
	  replacementStack = replacementStack || [];

	  if (replacer) {
	    obj = replacer(key, obj);
	  }

	  var i =
	  /*istanbul ignore start*/
	  void 0
	  /*istanbul ignore end*/
	  ;

	  for (i = 0; i < stack.length; i += 1) {
	    if (stack[i] === obj) {
	      return replacementStack[i];
	    }
	  }

	  var canonicalizedObj =
	  /*istanbul ignore start*/
	  void 0
	  /*istanbul ignore end*/
	  ;

	  if ('[object Array]' === objectPrototypeToString.call(obj)) {
	    stack.push(obj);
	    canonicalizedObj = new Array(obj.length);
	    replacementStack.push(canonicalizedObj);

	    for (i = 0; i < obj.length; i += 1) {
	      canonicalizedObj[i] = canonicalize(obj[i], stack, replacementStack, replacer, key);
	    }

	    stack.pop();
	    replacementStack.pop();
	    return canonicalizedObj;
	  }

	  if (obj && obj.toJSON) {
	    obj = obj.toJSON();
	  }

	  if (
	  /*istanbul ignore start*/
	  (typeof
	  /*istanbul ignore end*/
	  obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null) {
	    stack.push(obj);
	    canonicalizedObj = {};
	    replacementStack.push(canonicalizedObj);

	    var sortedKeys = [],
	        _key =
	    /*istanbul ignore start*/
	    void 0
	    /*istanbul ignore end*/
	    ;

	    for (_key in obj) {
	      /* istanbul ignore else */
	      if (obj.hasOwnProperty(_key)) {
	        sortedKeys.push(_key);
	      }
	    }

	    sortedKeys.sort();

	    for (i = 0; i < sortedKeys.length; i += 1) {
	      _key = sortedKeys[i];
	      canonicalizedObj[_key] = canonicalize(obj[_key], stack, replacementStack, replacer, _key);
	    }

	    stack.pop();
	    replacementStack.pop();
	  } else {
	    canonicalizedObj = obj;
	  }

	  return canonicalizedObj;
	}
	});

	unwrapExports(json);
	var json_1 = json.jsonDiff;
	var json_2 = json.diffJson;
	var json_3 = json.canonicalize;

	var array = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports.arrayDiff = undefined;
	exports.
	/*istanbul ignore end*/
	diffArrays = diffArrays;


	/*istanbul ignore start*/


	var _base2 = _interopRequireDefault(base);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    'default': obj
	  };
	}
	/*istanbul ignore end*/


	var arrayDiff =
	/*istanbul ignore start*/
	exports.
	/*istanbul ignore end*/
	arrayDiff = new
	/*istanbul ignore start*/
	_base2['default']
	/*istanbul ignore end*/
	();

	arrayDiff.tokenize = function (value) {
	  return value.slice();
	};

	arrayDiff.join = arrayDiff.removeEmpty = function (value) {
	  return value;
	};

	function diffArrays(oldArr, newArr, callback) {
	  return arrayDiff.diff(oldArr, newArr, callback);
	}
	});

	unwrapExports(array);
	var array_1 = array.arrayDiff;
	var array_2 = array.diffArrays;

	var parse = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports.
	/*istanbul ignore end*/
	parsePatch = parsePatch;

	function parsePatch(uniDiff) {
	  /*istanbul ignore start*/
	  var
	  /*istanbul ignore end*/
	  options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  var diffstr = uniDiff.split(/\r\n|[\n\v\f\r\x85]/),
	      delimiters = uniDiff.match(/\r\n|[\n\v\f\r\x85]/g) || [],
	      list = [],
	      i = 0;

	  function parseIndex() {
	    var index = {};
	    list.push(index); // Parse diff metadata

	    while (i < diffstr.length) {
	      var line = diffstr[i]; // File header found, end parsing diff metadata

	      if (/^(\-\-\-|\+\+\+|@@)\s/.test(line)) {
	        break;
	      } // Diff index


	      var header = /^(?:Index:|diff(?: -r \w+)+)\s+(.+?)\s*$/.exec(line);

	      if (header) {
	        index.index = header[1];
	      }

	      i++;
	    } // Parse file headers if they are defined. Unified diff requires them, but
	    // there's no technical issues to have an isolated hunk without file header


	    parseFileHeader(index);
	    parseFileHeader(index); // Parse hunks

	    index.hunks = [];

	    while (i < diffstr.length) {
	      var _line = diffstr[i];

	      if (/^(Index:|diff|\-\-\-|\+\+\+)\s/.test(_line)) {
	        break;
	      } else if (/^@@/.test(_line)) {
	        index.hunks.push(parseHunk());
	      } else if (_line && options.strict) {
	        // Ignore unexpected content unless in strict mode
	        throw new Error('Unknown line ' + (i + 1) + ' ' + JSON.stringify(_line));
	      } else {
	        i++;
	      }
	    }
	  } // Parses the --- and +++ headers, if none are found, no lines
	  // are consumed.


	  function parseFileHeader(index) {
	    var fileHeader = /^(---|\+\+\+)\s+(.*)$/.exec(diffstr[i]);

	    if (fileHeader) {
	      var keyPrefix = fileHeader[1] === '---' ? 'old' : 'new';
	      var data = fileHeader[2].split('\t', 2);
	      var fileName = data[0].replace(/\\\\/g, '\\');

	      if (/^".*"$/.test(fileName)) {
	        fileName = fileName.substr(1, fileName.length - 2);
	      }

	      index[keyPrefix + 'FileName'] = fileName;
	      index[keyPrefix + 'Header'] = (data[1] || '').trim();
	      i++;
	    }
	  } // Parses a hunk
	  // This assumes that we are at the start of a hunk.


	  function parseHunk() {
	    var chunkHeaderIndex = i,
	        chunkHeaderLine = diffstr[i++],
	        chunkHeader = chunkHeaderLine.split(/@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/);
	    var hunk = {
	      oldStart: +chunkHeader[1],
	      oldLines: +chunkHeader[2] || 1,
	      newStart: +chunkHeader[3],
	      newLines: +chunkHeader[4] || 1,
	      lines: [],
	      linedelimiters: []
	    };
	    var addCount = 0,
	        removeCount = 0;

	    for (; i < diffstr.length; i++) {
	      // Lines starting with '---' could be mistaken for the "remove line" operation
	      // But they could be the header for the next file. Therefore prune such cases out.
	      if (diffstr[i].indexOf('--- ') === 0 && i + 2 < diffstr.length && diffstr[i + 1].indexOf('+++ ') === 0 && diffstr[i + 2].indexOf('@@') === 0) {
	        break;
	      }

	      var operation = diffstr[i].length == 0 && i != diffstr.length - 1 ? ' ' : diffstr[i][0];

	      if (operation === '+' || operation === '-' || operation === ' ' || operation === '\\') {
	        hunk.lines.push(diffstr[i]);
	        hunk.linedelimiters.push(delimiters[i] || '\n');

	        if (operation === '+') {
	          addCount++;
	        } else if (operation === '-') {
	          removeCount++;
	        } else if (operation === ' ') {
	          addCount++;
	          removeCount++;
	        }
	      } else {
	        break;
	      }
	    } // Handle the empty block count case


	    if (!addCount && hunk.newLines === 1) {
	      hunk.newLines = 0;
	    }

	    if (!removeCount && hunk.oldLines === 1) {
	      hunk.oldLines = 0;
	    } // Perform optional sanity checking


	    if (options.strict) {
	      if (addCount !== hunk.newLines) {
	        throw new Error('Added line count did not match for hunk at line ' + (chunkHeaderIndex + 1));
	      }

	      if (removeCount !== hunk.oldLines) {
	        throw new Error('Removed line count did not match for hunk at line ' + (chunkHeaderIndex + 1));
	      }
	    }

	    return hunk;
	  }

	  while (i < diffstr.length) {
	    parseIndex();
	  }

	  return list;
	}
	});

	unwrapExports(parse);
	var parse_1 = parse.parsePatch;

	var distanceIterator = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;

	exports["default"] =
	/*istanbul ignore end*/
	function (start, minLine, maxLine) {
	  var wantForward = true,
	      backwardExhausted = false,
	      forwardExhausted = false,
	      localOffset = 1;
	  return function iterator() {
	    if (wantForward && !forwardExhausted) {
	      if (backwardExhausted) {
	        localOffset++;
	      } else {
	        wantForward = false;
	      } // Check if trying to fit beyond text length, and if not, check it fits
	      // after offset location (or desired location on first iteration)


	      if (start + localOffset <= maxLine) {
	        return localOffset;
	      }

	      forwardExhausted = true;
	    }

	    if (!backwardExhausted) {
	      if (!forwardExhausted) {
	        wantForward = true;
	      } // Check if trying to fit before text beginning, and if not, check it fits
	      // before offset location


	      if (minLine <= start - localOffset) {
	        return -localOffset++;
	      }

	      backwardExhausted = true;
	      return iterator();
	    } // We tried to fit hunk before text beginning and beyond text length, then
	    // hunk can't fit on the text. Return undefined

	  };
	};
	});

	unwrapExports(distanceIterator);

	var apply = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports.
	/*istanbul ignore end*/
	applyPatch = applyPatch;
	/*istanbul ignore start*/

	exports.
	/*istanbul ignore end*/
	applyPatches = applyPatches;




	/*istanbul ignore start*/


	var _distanceIterator2 = _interopRequireDefault(distanceIterator);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    'default': obj
	  };
	}
	/*istanbul ignore end*/


	function applyPatch(source, uniDiff) {
	  /*istanbul ignore start*/
	  var
	  /*istanbul ignore end*/
	  options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  if (typeof uniDiff === 'string') {
	    uniDiff =
	    /*istanbul ignore start*/
	    (0, parse.parsePatch
	    /*istanbul ignore end*/
	    )(uniDiff);
	  }

	  if (Array.isArray(uniDiff)) {
	    if (uniDiff.length > 1) {
	      throw new Error('applyPatch only works with a single input.');
	    }

	    uniDiff = uniDiff[0];
	  } // Apply the diff to the input


	  var lines = source.split(/\r\n|[\n\v\f\r\x85]/),
	      delimiters = source.match(/\r\n|[\n\v\f\r\x85]/g) || [],
	      hunks = uniDiff.hunks,
	      compareLine = options.compareLine || function (lineNumber, line, operation, patchContent)
	  /*istanbul ignore start*/
	  {
	    return (
	      /*istanbul ignore end*/
	      line === patchContent
	    );
	  },
	      errorCount = 0,
	      fuzzFactor = options.fuzzFactor || 0,
	      minLine = 0,
	      offset = 0,
	      removeEOFNL =
	  /*istanbul ignore start*/
	  void 0
	  /*istanbul ignore end*/
	  ,
	      addEOFNL =
	  /*istanbul ignore start*/
	  void 0
	  /*istanbul ignore end*/
	  ;
	  /**
	   * Checks if the hunk exactly fits on the provided location
	   */


	  function hunkFits(hunk, toPos) {
	    for (var j = 0; j < hunk.lines.length; j++) {
	      var line = hunk.lines[j],
	          operation = line.length > 0 ? line[0] : ' ',
	          content = line.length > 0 ? line.substr(1) : line;

	      if (operation === ' ' || operation === '-') {
	        // Context sanity check
	        if (!compareLine(toPos + 1, lines[toPos], operation, content)) {
	          errorCount++;

	          if (errorCount > fuzzFactor) {
	            return false;
	          }
	        }

	        toPos++;
	      }
	    }

	    return true;
	  } // Search best fit offsets for each hunk based on the previous ones


	  for (var i = 0; i < hunks.length; i++) {
	    var hunk = hunks[i],
	        maxLine = lines.length - hunk.oldLines,
	        localOffset = 0,
	        toPos = offset + hunk.oldStart - 1;
	    var iterator =
	    /*istanbul ignore start*/
	    (0, _distanceIterator2['default']
	    /*istanbul ignore end*/
	    )(toPos, minLine, maxLine);

	    for (; localOffset !== undefined; localOffset = iterator()) {
	      if (hunkFits(hunk, toPos + localOffset)) {
	        hunk.offset = offset += localOffset;
	        break;
	      }
	    }

	    if (localOffset === undefined) {
	      return false;
	    } // Set lower text limit to end of the current hunk, so next ones don't try
	    // to fit over already patched text


	    minLine = hunk.offset + hunk.oldStart + hunk.oldLines;
	  } // Apply patch hunks


	  var diffOffset = 0;

	  for (var _i = 0; _i < hunks.length; _i++) {
	    var _hunk = hunks[_i],
	        _toPos = _hunk.oldStart + _hunk.offset + diffOffset - 1;

	    diffOffset += _hunk.newLines - _hunk.oldLines;

	    if (_toPos < 0) {
	      // Creating a new file
	      _toPos = 0;
	    }

	    for (var j = 0; j < _hunk.lines.length; j++) {
	      var line = _hunk.lines[j],
	          operation = line.length > 0 ? line[0] : ' ',
	          content = line.length > 0 ? line.substr(1) : line,
	          delimiter = _hunk.linedelimiters[j];

	      if (operation === ' ') {
	        _toPos++;
	      } else if (operation === '-') {
	        lines.splice(_toPos, 1);
	        delimiters.splice(_toPos, 1);
	        /* istanbul ignore else */
	      } else if (operation === '+') {
	        lines.splice(_toPos, 0, content);
	        delimiters.splice(_toPos, 0, delimiter);
	        _toPos++;
	      } else if (operation === '\\') {
	        var previousOperation = _hunk.lines[j - 1] ? _hunk.lines[j - 1][0] : null;

	        if (previousOperation === '+') {
	          removeEOFNL = true;
	        } else if (previousOperation === '-') {
	          addEOFNL = true;
	        }
	      }
	    }
	  } // Handle EOFNL insertion/removal


	  if (removeEOFNL) {
	    while (!lines[lines.length - 1]) {
	      lines.pop();
	      delimiters.pop();
	    }
	  } else if (addEOFNL) {
	    lines.push('');
	    delimiters.push('\n');
	  }

	  for (var _k = 0; _k < lines.length - 1; _k++) {
	    lines[_k] = lines[_k] + delimiters[_k];
	  }

	  return lines.join('');
	} // Wrapper that supports multiple file patches via callbacks.


	function applyPatches(uniDiff, options) {
	  if (typeof uniDiff === 'string') {
	    uniDiff =
	    /*istanbul ignore start*/
	    (0, parse.parsePatch
	    /*istanbul ignore end*/
	    )(uniDiff);
	  }

	  var currentIndex = 0;

	  function processIndex() {
	    var index = uniDiff[currentIndex++];

	    if (!index) {
	      return options.complete();
	    }

	    options.loadFile(index, function (err, data) {
	      if (err) {
	        return options.complete(err);
	      }

	      var updatedContent = applyPatch(data, index, options);
	      options.patched(index, updatedContent, function (err) {
	        if (err) {
	          return options.complete(err);
	        }

	        processIndex();
	      });
	    });
	  }

	  processIndex();
	}
	});

	unwrapExports(apply);
	var apply_1 = apply.applyPatch;
	var apply_2 = apply.applyPatches;

	var create = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports.
	/*istanbul ignore end*/
	structuredPatch = structuredPatch;
	/*istanbul ignore start*/

	exports.
	/*istanbul ignore end*/
	createTwoFilesPatch = createTwoFilesPatch;
	/*istanbul ignore start*/

	exports.
	/*istanbul ignore end*/
	createPatch = createPatch;


	/*istanbul ignore start*/


	function _toConsumableArray(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }

	    return arr2;
	  } else {
	    return Array.from(arr);
	  }
	}
	/*istanbul ignore end*/


	function structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options) {
	  if (!options) {
	    options = {};
	  }

	  if (typeof options.context === 'undefined') {
	    options.context = 4;
	  }

	  var diff =
	  /*istanbul ignore start*/
	  (0, line.diffLines
	  /*istanbul ignore end*/
	  )(oldStr, newStr, options);
	  diff.push({
	    value: '',
	    lines: []
	  }); // Append an empty value to make cleanup easier

	  function contextLines(lines) {
	    return lines.map(function (entry) {
	      return ' ' + entry;
	    });
	  }

	  var hunks = [];
	  var oldRangeStart = 0,
	      newRangeStart = 0,
	      curRange = [],
	      oldLine = 1,
	      newLine = 1;
	  /*istanbul ignore start*/

	  var _loop = function _loop(
	  /*istanbul ignore end*/
	  i) {
	    var current = diff[i],
	        lines = current.lines || current.value.replace(/\n$/, '').split('\n');
	    current.lines = lines;

	    if (current.added || current.removed) {
	      /*istanbul ignore start*/
	      var _curRange;
	      /*istanbul ignore end*/
	      // If we have previous context, start with that


	      if (!oldRangeStart) {
	        var prev = diff[i - 1];
	        oldRangeStart = oldLine;
	        newRangeStart = newLine;

	        if (prev) {
	          curRange = options.context > 0 ? contextLines(prev.lines.slice(-options.context)) : [];
	          oldRangeStart -= curRange.length;
	          newRangeStart -= curRange.length;
	        }
	      } // Output our changes

	      /*istanbul ignore start*/


	      (_curRange =
	      /*istanbul ignore end*/
	      curRange).push.
	      /*istanbul ignore start*/
	      apply
	      /*istanbul ignore end*/
	      (
	      /*istanbul ignore start*/
	      _curRange
	      /*istanbul ignore end*/
	      ,
	      /*istanbul ignore start*/
	      _toConsumableArray(
	      /*istanbul ignore end*/
	      lines.map(function (entry) {
	        return (current.added ? '+' : '-') + entry;
	      }))); // Track the updated file position


	      if (current.added) {
	        newLine += lines.length;
	      } else {
	        oldLine += lines.length;
	      }
	    } else {
	      // Identical context lines. Track line changes
	      if (oldRangeStart) {
	        // Close out any changes that have been output (or join overlapping)
	        if (lines.length <= options.context * 2 && i < diff.length - 2) {
	          /*istanbul ignore start*/
	          var _curRange2;
	          /*istanbul ignore end*/
	          // Overlapping

	          /*istanbul ignore start*/


	          (_curRange2 =
	          /*istanbul ignore end*/
	          curRange).push.
	          /*istanbul ignore start*/
	          apply
	          /*istanbul ignore end*/
	          (
	          /*istanbul ignore start*/
	          _curRange2
	          /*istanbul ignore end*/
	          ,
	          /*istanbul ignore start*/
	          _toConsumableArray(
	          /*istanbul ignore end*/
	          contextLines(lines)));
	        } else {
	          /*istanbul ignore start*/
	          var _curRange3;
	          /*istanbul ignore end*/
	          // end the range and output


	          var contextSize = Math.min(lines.length, options.context);
	          /*istanbul ignore start*/

	          (_curRange3 =
	          /*istanbul ignore end*/
	          curRange).push.
	          /*istanbul ignore start*/
	          apply
	          /*istanbul ignore end*/
	          (
	          /*istanbul ignore start*/
	          _curRange3
	          /*istanbul ignore end*/
	          ,
	          /*istanbul ignore start*/
	          _toConsumableArray(
	          /*istanbul ignore end*/
	          contextLines(lines.slice(0, contextSize))));

	          var hunk = {
	            oldStart: oldRangeStart,
	            oldLines: oldLine - oldRangeStart + contextSize,
	            newStart: newRangeStart,
	            newLines: newLine - newRangeStart + contextSize,
	            lines: curRange
	          };

	          if (i >= diff.length - 2 && lines.length <= options.context) {
	            // EOF is inside this hunk
	            var oldEOFNewline = /\n$/.test(oldStr);
	            var newEOFNewline = /\n$/.test(newStr);

	            if (lines.length == 0 && !oldEOFNewline) {
	              // special case: old has no eol and no trailing context; no-nl can end up before adds
	              curRange.splice(hunk.oldLines, 0, '\\ No newline at end of file');
	            } else if (!oldEOFNewline || !newEOFNewline) {
	              curRange.push('\\ No newline at end of file');
	            }
	          }

	          hunks.push(hunk);
	          oldRangeStart = 0;
	          newRangeStart = 0;
	          curRange = [];
	        }
	      }

	      oldLine += lines.length;
	      newLine += lines.length;
	    }
	  };

	  for (var i = 0; i < diff.length; i++) {
	    /*istanbul ignore start*/
	    _loop(
	    /*istanbul ignore end*/
	    i);
	  }

	  return {
	    oldFileName: oldFileName,
	    newFileName: newFileName,
	    oldHeader: oldHeader,
	    newHeader: newHeader,
	    hunks: hunks
	  };
	}

	function createTwoFilesPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options) {
	  var diff = structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options);
	  var ret = [];

	  if (oldFileName == newFileName) {
	    ret.push('Index: ' + oldFileName);
	  }

	  ret.push('===================================================================');
	  ret.push('--- ' + diff.oldFileName + (typeof diff.oldHeader === 'undefined' ? '' : '\t' + diff.oldHeader));
	  ret.push('+++ ' + diff.newFileName + (typeof diff.newHeader === 'undefined' ? '' : '\t' + diff.newHeader));

	  for (var i = 0; i < diff.hunks.length; i++) {
	    var hunk = diff.hunks[i];
	    ret.push('@@ -' + hunk.oldStart + ',' + hunk.oldLines + ' +' + hunk.newStart + ',' + hunk.newLines + ' @@');
	    ret.push.apply(ret, hunk.lines);
	  }

	  return ret.join('\n') + '\n';
	}

	function createPatch(fileName, oldStr, newStr, oldHeader, newHeader, options) {
	  return createTwoFilesPatch(fileName, fileName, oldStr, newStr, oldHeader, newHeader, options);
	}
	});

	unwrapExports(create);
	var create_1 = create.structuredPatch;
	var create_2 = create.createTwoFilesPatch;
	var create_3 = create.createPatch;

	var array$2 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports.
	/*istanbul ignore end*/
	arrayEqual = arrayEqual;
	/*istanbul ignore start*/

	exports.
	/*istanbul ignore end*/
	arrayStartsWith = arrayStartsWith;

	function arrayEqual(a, b) {
	  if (a.length !== b.length) {
	    return false;
	  }

	  return arrayStartsWith(a, b);
	}

	function arrayStartsWith(array, start) {
	  if (start.length > array.length) {
	    return false;
	  }

	  for (var i = 0; i < start.length; i++) {
	    if (start[i] !== array[i]) {
	      return false;
	    }
	  }

	  return true;
	}
	});

	unwrapExports(array$2);
	var array_1$1 = array$2.arrayEqual;
	var array_2$1 = array$2.arrayStartsWith;

	var merge_1 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports.
	/*istanbul ignore end*/
	calcLineCount = calcLineCount;
	/*istanbul ignore start*/

	exports.
	/*istanbul ignore end*/
	merge = merge;






	/*istanbul ignore start*/


	function _toConsumableArray(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }

	    return arr2;
	  } else {
	    return Array.from(arr);
	  }
	}
	/*istanbul ignore end*/


	function calcLineCount(hunk) {
	  /*istanbul ignore start*/
	  var _calcOldNewLineCount =
	  /*istanbul ignore end*/
	  calcOldNewLineCount(hunk.lines),
	      oldLines = _calcOldNewLineCount.oldLines,
	      newLines = _calcOldNewLineCount.newLines;

	  if (oldLines !== undefined) {
	    hunk.oldLines = oldLines;
	  } else {
	    delete hunk.oldLines;
	  }

	  if (newLines !== undefined) {
	    hunk.newLines = newLines;
	  } else {
	    delete hunk.newLines;
	  }
	}

	function merge(mine, theirs, base) {
	  mine = loadPatch(mine, base);
	  theirs = loadPatch(theirs, base);
	  var ret = {}; // For index we just let it pass through as it doesn't have any necessary meaning.
	  // Leaving sanity checks on this to the API consumer that may know more about the
	  // meaning in their own context.

	  if (mine.index || theirs.index) {
	    ret.index = mine.index || theirs.index;
	  }

	  if (mine.newFileName || theirs.newFileName) {
	    if (!fileNameChanged(mine)) {
	      // No header or no change in ours, use theirs (and ours if theirs does not exist)
	      ret.oldFileName = theirs.oldFileName || mine.oldFileName;
	      ret.newFileName = theirs.newFileName || mine.newFileName;
	      ret.oldHeader = theirs.oldHeader || mine.oldHeader;
	      ret.newHeader = theirs.newHeader || mine.newHeader;
	    } else if (!fileNameChanged(theirs)) {
	      // No header or no change in theirs, use ours
	      ret.oldFileName = mine.oldFileName;
	      ret.newFileName = mine.newFileName;
	      ret.oldHeader = mine.oldHeader;
	      ret.newHeader = mine.newHeader;
	    } else {
	      // Both changed... figure it out
	      ret.oldFileName = selectField(ret, mine.oldFileName, theirs.oldFileName);
	      ret.newFileName = selectField(ret, mine.newFileName, theirs.newFileName);
	      ret.oldHeader = selectField(ret, mine.oldHeader, theirs.oldHeader);
	      ret.newHeader = selectField(ret, mine.newHeader, theirs.newHeader);
	    }
	  }

	  ret.hunks = [];
	  var mineIndex = 0,
	      theirsIndex = 0,
	      mineOffset = 0,
	      theirsOffset = 0;

	  while (mineIndex < mine.hunks.length || theirsIndex < theirs.hunks.length) {
	    var mineCurrent = mine.hunks[mineIndex] || {
	      oldStart: Infinity
	    },
	        theirsCurrent = theirs.hunks[theirsIndex] || {
	      oldStart: Infinity
	    };

	    if (hunkBefore(mineCurrent, theirsCurrent)) {
	      // This patch does not overlap with any of the others, yay.
	      ret.hunks.push(cloneHunk(mineCurrent, mineOffset));
	      mineIndex++;
	      theirsOffset += mineCurrent.newLines - mineCurrent.oldLines;
	    } else if (hunkBefore(theirsCurrent, mineCurrent)) {
	      // This patch does not overlap with any of the others, yay.
	      ret.hunks.push(cloneHunk(theirsCurrent, theirsOffset));
	      theirsIndex++;
	      mineOffset += theirsCurrent.newLines - theirsCurrent.oldLines;
	    } else {
	      // Overlap, merge as best we can
	      var mergedHunk = {
	        oldStart: Math.min(mineCurrent.oldStart, theirsCurrent.oldStart),
	        oldLines: 0,
	        newStart: Math.min(mineCurrent.newStart + mineOffset, theirsCurrent.oldStart + theirsOffset),
	        newLines: 0,
	        lines: []
	      };
	      mergeLines(mergedHunk, mineCurrent.oldStart, mineCurrent.lines, theirsCurrent.oldStart, theirsCurrent.lines);
	      theirsIndex++;
	      mineIndex++;
	      ret.hunks.push(mergedHunk);
	    }
	  }

	  return ret;
	}

	function loadPatch(param, base) {
	  if (typeof param === 'string') {
	    if (/^@@/m.test(param) || /^Index:/m.test(param)) {
	      return (
	        /*istanbul ignore start*/
	        (0, parse.parsePatch
	        /*istanbul ignore end*/
	        )(param)[0]
	      );
	    }

	    if (!base) {
	      throw new Error('Must provide a base reference or pass in a patch');
	    }

	    return (
	      /*istanbul ignore start*/
	      (0, create.structuredPatch
	      /*istanbul ignore end*/
	      )(undefined, undefined, base, param)
	    );
	  }

	  return param;
	}

	function fileNameChanged(patch) {
	  return patch.newFileName && patch.newFileName !== patch.oldFileName;
	}

	function selectField(index, mine, theirs) {
	  if (mine === theirs) {
	    return mine;
	  } else {
	    index.conflict = true;
	    return {
	      mine: mine,
	      theirs: theirs
	    };
	  }
	}

	function hunkBefore(test, check) {
	  return test.oldStart < check.oldStart && test.oldStart + test.oldLines < check.oldStart;
	}

	function cloneHunk(hunk, offset) {
	  return {
	    oldStart: hunk.oldStart,
	    oldLines: hunk.oldLines,
	    newStart: hunk.newStart + offset,
	    newLines: hunk.newLines,
	    lines: hunk.lines
	  };
	}

	function mergeLines(hunk, mineOffset, mineLines, theirOffset, theirLines) {
	  // This will generally result in a conflicted hunk, but there are cases where the context
	  // is the only overlap where we can successfully merge the content here.
	  var mine = {
	    offset: mineOffset,
	    lines: mineLines,
	    index: 0
	  },
	      their = {
	    offset: theirOffset,
	    lines: theirLines,
	    index: 0
	  }; // Handle any leading content

	  insertLeading(hunk, mine, their);
	  insertLeading(hunk, their, mine); // Now in the overlap content. Scan through and select the best changes from each.

	  while (mine.index < mine.lines.length && their.index < their.lines.length) {
	    var mineCurrent = mine.lines[mine.index],
	        theirCurrent = their.lines[their.index];

	    if ((mineCurrent[0] === '-' || mineCurrent[0] === '+') && (theirCurrent[0] === '-' || theirCurrent[0] === '+')) {
	      // Both modified ...
	      mutualChange(hunk, mine, their);
	    } else if (mineCurrent[0] === '+' && theirCurrent[0] === ' ') {
	      /*istanbul ignore start*/
	      var _hunk$lines;
	      /*istanbul ignore end*/
	      // Mine inserted

	      /*istanbul ignore start*/


	      (_hunk$lines =
	      /*istanbul ignore end*/
	      hunk.lines).push.
	      /*istanbul ignore start*/
	      apply
	      /*istanbul ignore end*/
	      (
	      /*istanbul ignore start*/
	      _hunk$lines
	      /*istanbul ignore end*/
	      ,
	      /*istanbul ignore start*/
	      _toConsumableArray(
	      /*istanbul ignore end*/
	      collectChange(mine)));
	    } else if (theirCurrent[0] === '+' && mineCurrent[0] === ' ') {
	      /*istanbul ignore start*/
	      var _hunk$lines2;
	      /*istanbul ignore end*/
	      // Theirs inserted

	      /*istanbul ignore start*/


	      (_hunk$lines2 =
	      /*istanbul ignore end*/
	      hunk.lines).push.
	      /*istanbul ignore start*/
	      apply
	      /*istanbul ignore end*/
	      (
	      /*istanbul ignore start*/
	      _hunk$lines2
	      /*istanbul ignore end*/
	      ,
	      /*istanbul ignore start*/
	      _toConsumableArray(
	      /*istanbul ignore end*/
	      collectChange(their)));
	    } else if (mineCurrent[0] === '-' && theirCurrent[0] === ' ') {
	      // Mine removed or edited
	      removal(hunk, mine, their);
	    } else if (theirCurrent[0] === '-' && mineCurrent[0] === ' ') {
	      // Their removed or edited
	      removal(hunk, their, mine, true);
	    } else if (mineCurrent === theirCurrent) {
	      // Context identity
	      hunk.lines.push(mineCurrent);
	      mine.index++;
	      their.index++;
	    } else {
	      // Context mismatch
	      conflict(hunk, collectChange(mine), collectChange(their));
	    }
	  } // Now push anything that may be remaining


	  insertTrailing(hunk, mine);
	  insertTrailing(hunk, their);
	  calcLineCount(hunk);
	}

	function mutualChange(hunk, mine, their) {
	  var myChanges = collectChange(mine),
	      theirChanges = collectChange(their);

	  if (allRemoves(myChanges) && allRemoves(theirChanges)) {
	    // Special case for remove changes that are supersets of one another
	    if (
	    /*istanbul ignore start*/
	    (0, array$2.arrayStartsWith
	    /*istanbul ignore end*/
	    )(myChanges, theirChanges) && skipRemoveSuperset(their, myChanges, myChanges.length - theirChanges.length)) {
	      /*istanbul ignore start*/
	      var _hunk$lines3;
	      /*istanbul ignore end*/

	      /*istanbul ignore start*/


	      (_hunk$lines3 =
	      /*istanbul ignore end*/
	      hunk.lines).push.
	      /*istanbul ignore start*/
	      apply
	      /*istanbul ignore end*/
	      (
	      /*istanbul ignore start*/
	      _hunk$lines3
	      /*istanbul ignore end*/
	      ,
	      /*istanbul ignore start*/
	      _toConsumableArray(
	      /*istanbul ignore end*/
	      myChanges));

	      return;
	    } else if (
	    /*istanbul ignore start*/
	    (0, array$2.arrayStartsWith
	    /*istanbul ignore end*/
	    )(theirChanges, myChanges) && skipRemoveSuperset(mine, theirChanges, theirChanges.length - myChanges.length)) {
	      /*istanbul ignore start*/
	      var _hunk$lines4;
	      /*istanbul ignore end*/

	      /*istanbul ignore start*/


	      (_hunk$lines4 =
	      /*istanbul ignore end*/
	      hunk.lines).push.
	      /*istanbul ignore start*/
	      apply
	      /*istanbul ignore end*/
	      (
	      /*istanbul ignore start*/
	      _hunk$lines4
	      /*istanbul ignore end*/
	      ,
	      /*istanbul ignore start*/
	      _toConsumableArray(
	      /*istanbul ignore end*/
	      theirChanges));

	      return;
	    }
	  } else if (
	  /*istanbul ignore start*/
	  (0, array$2.arrayEqual
	  /*istanbul ignore end*/
	  )(myChanges, theirChanges)) {
	    /*istanbul ignore start*/
	    var _hunk$lines5;
	    /*istanbul ignore end*/

	    /*istanbul ignore start*/


	    (_hunk$lines5 =
	    /*istanbul ignore end*/
	    hunk.lines).push.
	    /*istanbul ignore start*/
	    apply
	    /*istanbul ignore end*/
	    (
	    /*istanbul ignore start*/
	    _hunk$lines5
	    /*istanbul ignore end*/
	    ,
	    /*istanbul ignore start*/
	    _toConsumableArray(
	    /*istanbul ignore end*/
	    myChanges));

	    return;
	  }

	  conflict(hunk, myChanges, theirChanges);
	}

	function removal(hunk, mine, their, swap) {
	  var myChanges = collectChange(mine),
	      theirChanges = collectContext(their, myChanges);

	  if (theirChanges.merged) {
	    /*istanbul ignore start*/
	    var _hunk$lines6;
	    /*istanbul ignore end*/

	    /*istanbul ignore start*/


	    (_hunk$lines6 =
	    /*istanbul ignore end*/
	    hunk.lines).push.
	    /*istanbul ignore start*/
	    apply
	    /*istanbul ignore end*/
	    (
	    /*istanbul ignore start*/
	    _hunk$lines6
	    /*istanbul ignore end*/
	    ,
	    /*istanbul ignore start*/
	    _toConsumableArray(
	    /*istanbul ignore end*/
	    theirChanges.merged));
	  } else {
	    conflict(hunk, swap ? theirChanges : myChanges, swap ? myChanges : theirChanges);
	  }
	}

	function conflict(hunk, mine, their) {
	  hunk.conflict = true;
	  hunk.lines.push({
	    conflict: true,
	    mine: mine,
	    theirs: their
	  });
	}

	function insertLeading(hunk, insert, their) {
	  while (insert.offset < their.offset && insert.index < insert.lines.length) {
	    var line = insert.lines[insert.index++];
	    hunk.lines.push(line);
	    insert.offset++;
	  }
	}

	function insertTrailing(hunk, insert) {
	  while (insert.index < insert.lines.length) {
	    var line = insert.lines[insert.index++];
	    hunk.lines.push(line);
	  }
	}

	function collectChange(state) {
	  var ret = [],
	      operation = state.lines[state.index][0];

	  while (state.index < state.lines.length) {
	    var line = state.lines[state.index]; // Group additions that are immediately after subtractions and treat them as one "atomic" modify change.

	    if (operation === '-' && line[0] === '+') {
	      operation = '+';
	    }

	    if (operation === line[0]) {
	      ret.push(line);
	      state.index++;
	    } else {
	      break;
	    }
	  }

	  return ret;
	}

	function collectContext(state, matchChanges) {
	  var changes = [],
	      merged = [],
	      matchIndex = 0,
	      contextChanges = false,
	      conflicted = false;

	  while (matchIndex < matchChanges.length && state.index < state.lines.length) {
	    var change = state.lines[state.index],
	        match = matchChanges[matchIndex]; // Once we've hit our add, then we are done

	    if (match[0] === '+') {
	      break;
	    }

	    contextChanges = contextChanges || change[0] !== ' ';
	    merged.push(match);
	    matchIndex++; // Consume any additions in the other block as a conflict to attempt
	    // to pull in the remaining context after this

	    if (change[0] === '+') {
	      conflicted = true;

	      while (change[0] === '+') {
	        changes.push(change);
	        change = state.lines[++state.index];
	      }
	    }

	    if (match.substr(1) === change.substr(1)) {
	      changes.push(change);
	      state.index++;
	    } else {
	      conflicted = true;
	    }
	  }

	  if ((matchChanges[matchIndex] || '')[0] === '+' && contextChanges) {
	    conflicted = true;
	  }

	  if (conflicted) {
	    return changes;
	  }

	  while (matchIndex < matchChanges.length) {
	    merged.push(matchChanges[matchIndex++]);
	  }

	  return {
	    merged: merged,
	    changes: changes
	  };
	}

	function allRemoves(changes) {
	  return changes.reduce(function (prev, change) {
	    return prev && change[0] === '-';
	  }, true);
	}

	function skipRemoveSuperset(state, removeChanges, delta) {
	  for (var i = 0; i < delta; i++) {
	    var changeContent = removeChanges[removeChanges.length - delta + i].substr(1);

	    if (state.lines[state.index + i] !== ' ' + changeContent) {
	      return false;
	    }
	  }

	  state.index += delta;
	  return true;
	}

	function calcOldNewLineCount(lines) {
	  var oldLines = 0;
	  var newLines = 0;
	  lines.forEach(function (line) {
	    if (typeof line !== 'string') {
	      var myCount = calcOldNewLineCount(line.mine);
	      var theirCount = calcOldNewLineCount(line.theirs);

	      if (oldLines !== undefined) {
	        if (myCount.oldLines === theirCount.oldLines) {
	          oldLines += myCount.oldLines;
	        } else {
	          oldLines = undefined;
	        }
	      }

	      if (newLines !== undefined) {
	        if (myCount.newLines === theirCount.newLines) {
	          newLines += myCount.newLines;
	        } else {
	          newLines = undefined;
	        }
	      }
	    } else {
	      if (newLines !== undefined && (line[0] === '+' || line[0] === ' ')) {
	        newLines++;
	      }

	      if (oldLines !== undefined && (line[0] === '-' || line[0] === ' ')) {
	        oldLines++;
	      }
	    }
	  });
	  return {
	    oldLines: oldLines,
	    newLines: newLines
	  };
	}
	});

	unwrapExports(merge_1);
	var merge_2 = merge_1.calcLineCount;
	var merge_3 = merge_1.merge;

	var dmp = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports.
	/*istanbul ignore end*/
	convertChangesToDMP = convertChangesToDMP; // See: http://code.google.com/p/google-diff-match-patch/wiki/API

	function convertChangesToDMP(changes) {
	  var ret = [],
	      change =
	  /*istanbul ignore start*/
	  void 0
	  /*istanbul ignore end*/
	  ,
	      operation =
	  /*istanbul ignore start*/
	  void 0
	  /*istanbul ignore end*/
	  ;

	  for (var i = 0; i < changes.length; i++) {
	    change = changes[i];

	    if (change.added) {
	      operation = 1;
	    } else if (change.removed) {
	      operation = -1;
	    } else {
	      operation = 0;
	    }

	    ret.push([operation, change.value]);
	  }

	  return ret;
	}
	});

	unwrapExports(dmp);
	var dmp_1 = dmp.convertChangesToDMP;

	var xml = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports.
	/*istanbul ignore end*/
	convertChangesToXML = convertChangesToXML;

	function convertChangesToXML(changes) {
	  var ret = [];

	  for (var i = 0; i < changes.length; i++) {
	    var change = changes[i];

	    if (change.added) {
	      ret.push('<ins>');
	    } else if (change.removed) {
	      ret.push('<del>');
	    }

	    ret.push(escapeHTML(change.value));

	    if (change.added) {
	      ret.push('</ins>');
	    } else if (change.removed) {
	      ret.push('</del>');
	    }
	  }

	  return ret.join('');
	}

	function escapeHTML(s) {
	  var n = s;
	  n = n.replace(/&/g, '&amp;');
	  n = n.replace(/</g, '&lt;');
	  n = n.replace(/>/g, '&gt;');
	  n = n.replace(/"/g, '&quot;');
	  return n;
	}
	});

	unwrapExports(xml);
	var xml_1 = xml.convertChangesToXML;

	var lib = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports.canonicalize = exports.convertChangesToXML = exports.convertChangesToDMP = exports.merge = exports.parsePatch = exports.applyPatches = exports.applyPatch = exports.createPatch = exports.createTwoFilesPatch = exports.structuredPatch = exports.diffArrays = exports.diffJson = exports.diffCss = exports.diffSentences = exports.diffTrimmedLines = exports.diffLines = exports.diffWordsWithSpace = exports.diffWords = exports.diffChars = exports.Diff = undefined;
	/*istanbul ignore end*/


	/*istanbul ignore start*/


	var _base2 = _interopRequireDefault(base);
	/*istanbul ignore end*/



























	/*istanbul ignore start*/


	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    'default': obj
	  };
	}
	/* See LICENSE file for terms of use */

	/*
	 * Text diff implementation.
	 *
	 * This library supports the following APIS:
	 * JsDiff.diffChars: Character by character diff
	 * JsDiff.diffWords: Word (as defined by \b regex) diff which ignores whitespace
	 * JsDiff.diffLines: Line based diff
	 *
	 * JsDiff.diffCss: Diff targeted at CSS content
	 *
	 * These methods are based on the implementation proposed in
	 * "An O(ND) Difference Algorithm and its Variations" (Myers, 1986).
	 * http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.4.6927
	 */


	exports.
	/*istanbul ignore end*/
	Diff = _base2['default'];
	/*istanbul ignore start*/

	exports.
	/*istanbul ignore end*/
	diffChars = character.diffChars;
	/*istanbul ignore start*/

	exports.
	/*istanbul ignore end*/
	diffWords = word.diffWords;
	/*istanbul ignore start*/

	exports.
	/*istanbul ignore end*/
	diffWordsWithSpace = word.diffWordsWithSpace;
	/*istanbul ignore start*/

	exports.
	/*istanbul ignore end*/
	diffLines = line.diffLines;
	/*istanbul ignore start*/

	exports.
	/*istanbul ignore end*/
	diffTrimmedLines = line.diffTrimmedLines;
	/*istanbul ignore start*/

	exports.
	/*istanbul ignore end*/
	diffSentences = sentence.diffSentences;
	/*istanbul ignore start*/

	exports.
	/*istanbul ignore end*/
	diffCss = css.diffCss;
	/*istanbul ignore start*/

	exports.
	/*istanbul ignore end*/
	diffJson = json.diffJson;
	/*istanbul ignore start*/

	exports.
	/*istanbul ignore end*/
	diffArrays = array.diffArrays;
	/*istanbul ignore start*/

	exports.
	/*istanbul ignore end*/
	structuredPatch = create.structuredPatch;
	/*istanbul ignore start*/

	exports.
	/*istanbul ignore end*/
	createTwoFilesPatch = create.createTwoFilesPatch;
	/*istanbul ignore start*/

	exports.
	/*istanbul ignore end*/
	createPatch = create.createPatch;
	/*istanbul ignore start*/

	exports.
	/*istanbul ignore end*/
	applyPatch = apply.applyPatch;
	/*istanbul ignore start*/

	exports.
	/*istanbul ignore end*/
	applyPatches = apply.applyPatches;
	/*istanbul ignore start*/

	exports.
	/*istanbul ignore end*/
	parsePatch = parse.parsePatch;
	/*istanbul ignore start*/

	exports.
	/*istanbul ignore end*/
	merge = merge_1.merge;
	/*istanbul ignore start*/

	exports.
	/*istanbul ignore end*/
	convertChangesToDMP = dmp.convertChangesToDMP;
	/*istanbul ignore start*/

	exports.
	/*istanbul ignore end*/
	convertChangesToXML = xml.convertChangesToXML;
	/*istanbul ignore start*/

	exports.
	/*istanbul ignore end*/
	canonicalize = json.canonicalize;
	});

	unwrapExports(lib);
	var lib_1 = lib.canonicalize;
	var lib_2 = lib.convertChangesToXML;
	var lib_3 = lib.convertChangesToDMP;
	var lib_4 = lib.merge;
	var lib_5 = lib.parsePatch;
	var lib_6 = lib.applyPatches;
	var lib_7 = lib.applyPatch;
	var lib_8 = lib.createPatch;
	var lib_9 = lib.createTwoFilesPatch;
	var lib_10 = lib.structuredPatch;
	var lib_11 = lib.diffArrays;
	var lib_12 = lib.diffJson;
	var lib_13 = lib.diffCss;
	var lib_14 = lib.diffSentences;
	var lib_15 = lib.diffTrimmedLines;
	var lib_16 = lib.diffLines;
	var lib_17 = lib.diffWordsWithSpace;
	var lib_18 = lib.diffWords;
	var lib_19 = lib.diffChars;
	var lib_20 = lib.Diff;

	var constants = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.SIMILAR_MESSAGE = exports.NO_DIFF_MESSAGE = undefined;



	var _chalk2 = _interopRequireDefault(chalk);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	}

	const NO_DIFF_MESSAGE = exports.NO_DIFF_MESSAGE = _chalk2.default.dim('Compared values have no visual difference.');
	/**
	 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *
	 */


	const SIMILAR_MESSAGE = exports.SIMILAR_MESSAGE = _chalk2.default.dim('Compared values serialize to the same structure.\n' + 'Printing internal object structure without calling `toJSON` instead.');
	});

	unwrapExports(constants);
	var constants_1 = constants.SIMILAR_MESSAGE;
	var constants_2 = constants.NO_DIFF_MESSAGE;

	var diff_strings = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.default = diffStrings;



	var _chalk2 = _interopRequireDefault(chalk);





	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	}

	const DIFF_CONTEXT_DEFAULT = 5; // removed | added | equal
	// Given diff digit, return array which consists of:
	// if compared line is removed or added: corresponding original line
	// if compared line is equal: original received and expected lines

	/**
	 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *
	 */
	// Given chunk, return diff character.

	const getDiffChar = chunk => chunk.removed ? '-' : chunk.added ? '+' : ' '; // Given diff character in line of hunk or computed from properties of chunk.


	const getDiffDigit = char => char === '-' ? -1 : char === '+' ? 1 : 0; // Color for text of line.


	const getColor = (digit, onlyIndentationChanged) => {
	  if (digit === -1) {
	    return _chalk2.default.green; // removed
	  }

	  if (digit === 1) {
	    return _chalk2.default.red; // added
	  }

	  return onlyIndentationChanged ? _chalk2.default.cyan : _chalk2.default.dim;
	}; // Do NOT color leading or trailing spaces if original lines are equal:
	// Background color for leading or trailing spaces.


	const getBgColor = (digit, onlyIndentationChanged) => digit === 0 && !onlyIndentationChanged ? _chalk2.default.bgYellow : _chalk2.default.inverse; // ONLY trailing if expected value is snapshot or multiline string.


	const highlightTrailingSpaces = (line, bgColor) => line.replace(/\s+$/, bgColor('$&')); // BOTH leading AND trailing if expected value is data structure.


	const highlightLeadingTrailingSpaces = (line, bgColor // If line consists of ALL spaces: highlight all of them.
	) => highlightTrailingSpaces(line, bgColor).replace( // If line has an ODD length of leading spaces: highlight only the LAST.
	/^(\s\s)*(\s)(?=[^\s])/, '$1' + bgColor('$2'));

	const getAnnotation = options => _chalk2.default.green('- ' + (options && options.aAnnotation || 'Expected')) + '\n' + _chalk2.default.red('+ ' + (options && options.bAnnotation || 'Received')) + '\n\n'; // Given string, return array of its lines.


	const splitIntoLines = string => {
	  const lines = string.split('\n');

	  if (lines.length !== 0 && lines[lines.length - 1] === '') {
	    lines.pop();
	  }

	  return lines;
	}; // Given diff character and compared line, return original line with colors.


	const formatLine = (char, lineCompared, getOriginal) => {
	  const digit = getDiffDigit(char);

	  if (getOriginal) {
	    // Compared without indentation if expected value is data structure.
	    const lineArray = getOriginal(digit);
	    const lineOriginal = lineArray[0];
	    const onlyIndentationChanged = digit === 0 && lineOriginal.length !== lineArray[1].length;
	    return getColor(digit, onlyIndentationChanged)(char + ' ' + // Prepend indentation spaces from original to compared line.
	    lineOriginal.slice(0, lineOriginal.length - lineCompared.length) + highlightLeadingTrailingSpaces(lineCompared, getBgColor(digit, onlyIndentationChanged)));
	  } // Format compared line when expected is snapshot or multiline string.


	  return getColor(digit)(char + ' ' + highlightTrailingSpaces(lineCompared, getBgColor(digit)));
	}; // Given original lines, return callback function
	// which given diff digit, returns array.


	const getterForChunks = original => {
	  const linesExpected = splitIntoLines(original.a);
	  const linesReceived = splitIntoLines(original.b);
	  let iExpected = 0;
	  let iReceived = 0;
	  return digit => {
	    if (digit === -1) {
	      return [linesExpected[iExpected++]];
	    }

	    if (digit === 1) {
	      return [linesReceived[iReceived++]];
	    } // Because compared line is equal: original received and expected lines.


	    return [linesReceived[iReceived++], linesExpected[iExpected++]];
	  };
	}; // jest --expand


	const formatChunks = (a, b, original) => {
	  const chunks = (0, lib.diffLines)(a, b);

	  if (chunks.every(chunk => !chunk.removed && !chunk.added)) {
	    return null;
	  }

	  const getOriginal = original && getterForChunks(original);
	  return chunks.reduce((lines, chunk) => {
	    const char = getDiffChar(chunk);
	    splitIntoLines(chunk.value).forEach(line => {
	      lines.push(formatLine(char, line, getOriginal));
	    });
	    return lines;
	  }, []).join('\n');
	}; // Only show patch marks ("@@ ... @@") if the diff is big.
	// To determine this, we need to compare either the original string (a) to
	// `hunk.oldLines` or a new string to `hunk.newLines`.
	// If the `oldLinesCount` is greater than `hunk.oldLines`
	// we can be sure that at least 1 line has been "hidden".


	const shouldShowPatchMarks = (hunk, oldLinesCount) => oldLinesCount > hunk.oldLines;

	const createPatchMark = hunk => {
	  const markOld = `-${hunk.oldStart},${hunk.oldLines}`;
	  const markNew = `+${hunk.newStart},${hunk.newLines}`;
	  return _chalk2.default.yellow(`@@ ${markOld} ${markNew} @@`);
	}; // Given original lines, return callback function which given indexes for hunk,
	// returns another callback function which given diff digit, returns array.


	const getterForHunks = original => {
	  const linesExpected = splitIntoLines(original.a);
	  const linesReceived = splitIntoLines(original.b);
	  return (iExpected, iReceived) => digit => {
	    if (digit === -1) {
	      return [linesExpected[iExpected++]];
	    }

	    if (digit === 1) {
	      return [linesReceived[iReceived++]];
	    } // Because compared line is equal: original received and expected lines.


	    return [linesReceived[iReceived++], linesExpected[iExpected++]];
	  };
	}; // jest --no-expand


	const formatHunks = (a, b, contextLines, original) => {
	  const options = {
	    context: typeof contextLines === 'number' && contextLines >= 0 ? contextLines : DIFF_CONTEXT_DEFAULT
	  };

	  var _structuredPatch = (0, lib.structuredPatch)('', '', a, b, '', '', options);

	  const hunks = _structuredPatch.hunks;

	  if (hunks.length === 0) {
	    return null;
	  }

	  const getter = original && getterForHunks(original);
	  const oldLinesCount = (a.match(/\n/g) || []).length;
	  return hunks.reduce((lines, hunk) => {
	    if (shouldShowPatchMarks(hunk, oldLinesCount)) {
	      lines.push(createPatchMark(hunk));
	    } // Hunk properties are one-based but index args are zero-based.


	    const getOriginal = getter && getter(hunk.oldStart - 1, hunk.newStart - 1);
	    hunk.lines.forEach(line => {
	      lines.push(formatLine(line[0], line.slice(1), getOriginal));
	    });
	    return lines;
	  }, []).join('\n');
	};

	function diffStrings(a, b, options, original) {
	  // Because `formatHunks` and `formatChunks` ignore one trailing newline,
	  // always append newline to strings:
	  a += '\n';
	  b += '\n'; // `diff` uses the Myers LCS diff algorithm which runs in O(n+d^2) time
	  // (where "d" is the edit distance) and can get very slow for large edit
	  // distances. Mitigate the cost by switching to a lower-resolution diff
	  // whenever linebreaks are involved.

	  const result = options && options.expand === false ? formatHunks(a, b, options && options.contextLines, original) : formatChunks(a, b, original);
	  return result === null ? constants.NO_DIFF_MESSAGE : getAnnotation(options) + result;
	}
	});

	unwrapExports(diff_strings);

	var build$4 = createCommonjsModule(function (module) {



	var _prettyFormat2 = _interopRequireDefault(build$2);



	var _chalk2 = _interopRequireDefault(chalk);



	var _jestGetType2 = _interopRequireDefault(build$1);



	var _diff_strings2 = _interopRequireDefault(diff_strings);



	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	}
	/**
	 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *
	 */


	var _prettyFormat$plugins = _prettyFormat2.default.plugins;
	const AsymmetricMatcher = _prettyFormat$plugins.AsymmetricMatcher,
	      DOMCollection = _prettyFormat$plugins.DOMCollection,
	      DOMElement = _prettyFormat$plugins.DOMElement,
	      Immutable = _prettyFormat$plugins.Immutable,
	      ReactElement = _prettyFormat$plugins.ReactElement,
	      ReactTestComponent = _prettyFormat$plugins.ReactTestComponent;
	const PLUGINS = [ReactTestComponent, ReactElement, DOMElement, DOMCollection, Immutable, AsymmetricMatcher];
	const FORMAT_OPTIONS = {
	  plugins: PLUGINS
	};
	const FORMAT_OPTIONS_0 = Object.assign({}, FORMAT_OPTIONS, {
	  indent: 0
	});
	const FALLBACK_FORMAT_OPTIONS = {
	  callToJSON: false,
	  maxDepth: 10,
	  plugins: PLUGINS
	};
	const FALLBACK_FORMAT_OPTIONS_0 = Object.assign({}, FALLBACK_FORMAT_OPTIONS, {
	  indent: 0
	}); // Generate a string that will highlight the difference between two values
	// with green and red. (similar to how github does code diffing)

	function diff(a, b, options) {
	  if (a === b) {
	    return constants.NO_DIFF_MESSAGE;
	  }

	  const aType = (0, _jestGetType2.default)(a);
	  let expectedType = aType;
	  let omitDifference = false;

	  if (aType === 'object' && typeof a.asymmetricMatch === 'function') {
	    if (a.$$typeof !== Symbol.for('jest.asymmetricMatcher')) {
	      // Do not know expected type of user-defined asymmetric matcher.
	      return null;
	    }

	    if (typeof a.getExpectedType !== 'function') {
	      // For example, expect.anything() matches either null or undefined
	      return null;
	    }

	    expectedType = a.getExpectedType(); // Primitive types boolean and number omit difference below.
	    // For example, omit difference for expect.stringMatching(regexp)

	    omitDifference = expectedType === 'string';
	  }

	  if (expectedType !== (0, _jestGetType2.default)(b)) {
	    return '  Comparing two different types of values.' + ` Expected ${_chalk2.default.green(expectedType)} but ` + `received ${_chalk2.default.red((0, _jestGetType2.default)(b))}.`;
	  }

	  if (omitDifference) {
	    return null;
	  }

	  switch (aType) {
	    case 'string':
	      return (0, _diff_strings2.default)(a, b, options);

	    case 'number':
	    case 'boolean':
	      return null;

	    case 'map':
	      return compareObjects(sortMap(a), sortMap(b), options);

	    case 'set':
	      return compareObjects(sortSet(a), sortSet(b), options);

	    default:
	      return compareObjects(a, b, options);
	  }
	}

	function sortMap(map) {
	  return new Map(Array.from(map.entries()).sort());
	}

	function sortSet(set) {
	  return new Set(Array.from(set.values()).sort());
	}

	function compareObjects(a, b, options) {
	  let diffMessage;
	  let hasThrown = false;

	  try {
	    diffMessage = (0, _diff_strings2.default)((0, _prettyFormat2.default)(a, FORMAT_OPTIONS_0), (0, _prettyFormat2.default)(b, FORMAT_OPTIONS_0), options, {
	      a: (0, _prettyFormat2.default)(a, FORMAT_OPTIONS),
	      b: (0, _prettyFormat2.default)(b, FORMAT_OPTIONS)
	    });
	  } catch (e) {
	    hasThrown = true;
	  } // If the comparison yields no results, compare again but this time
	  // without calling `toJSON`. It's also possible that toJSON might throw.


	  if (!diffMessage || diffMessage === constants.NO_DIFF_MESSAGE) {
	    diffMessage = (0, _diff_strings2.default)((0, _prettyFormat2.default)(a, FALLBACK_FORMAT_OPTIONS_0), (0, _prettyFormat2.default)(b, FALLBACK_FORMAT_OPTIONS_0), options, {
	      a: (0, _prettyFormat2.default)(a, FALLBACK_FORMAT_OPTIONS),
	      b: (0, _prettyFormat2.default)(b, FALLBACK_FORMAT_OPTIONS)
	    });

	    if (diffMessage !== constants.NO_DIFF_MESSAGE && !hasThrown) {
	      diffMessage = constants.SIMILAR_MESSAGE + '\n\n' + diffMessage;
	    }
	  }

	  return diffMessage;
	}

	module.exports = diff;
	});

	unwrapExports(build$4);

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;

	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];

	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  } // if the path is allowed to go above the root, restore leading ..s


	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }

	  return parts;
	} // Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.


	var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;

	var splitPath = function (filename) {
	  return splitPathRe.exec(filename).slice(1);
	}; // path.resolve([from ...], to)
	// posix version


	function resolve() {
	  var resolvedPath = '',
	      resolvedAbsolute = false;

	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = i >= 0 ? arguments[i] : '/'; // Skip empty and invalid entries

	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }

	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  } // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)
	  // Normalize the path


	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function (p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');
	  return (resolvedAbsolute ? '/' : '') + resolvedPath || '.';
	}
	// posix version

	function normalize(path) {
	  var isPathAbsolute = isAbsolute(path),
	      trailingSlash = substr(path, -1) === '/'; // Normalize the path

	  path = normalizeArray(filter(path.split('/'), function (p) {
	    return !!p;
	  }), !isPathAbsolute).join('/');

	  if (!path && !isPathAbsolute) {
	    path = '.';
	  }

	  if (path && trailingSlash) {
	    path += '/';
	  }

	  return (isPathAbsolute ? '/' : '') + path;
	}

	function isAbsolute(path) {
	  return path.charAt(0) === '/';
	} // posix version

	function join() {
	  var paths = Array.prototype.slice.call(arguments, 0);
	  return normalize(filter(paths, function (p, index) {
	    if (typeof p !== 'string') {
	      throw new TypeError('Arguments to path.join must be strings');
	    }

	    return p;
	  }).join('/'));
	} // path.relative(from, to)
	// posix version

	function relative(from, to) {
	  from = resolve(from).substr(1);
	  to = resolve(to).substr(1);

	  function trim(arr) {
	    var start = 0;

	    for (; start < arr.length; start++) {
	      if (arr[start] !== '') break;
	    }

	    var end = arr.length - 1;

	    for (; end >= 0; end--) {
	      if (arr[end] !== '') break;
	    }

	    if (start > end) return [];
	    return arr.slice(start, end - start + 1);
	  }

	  var fromParts = trim(from.split('/'));
	  var toParts = trim(to.split('/'));
	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;

	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }

	  var outputParts = [];

	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }

	  outputParts = outputParts.concat(toParts.slice(samePartsLength));
	  return outputParts.join('/');
	}
	var sep = '/';
	var delimiter = ':';
	function dirname(path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];

	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }

	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }

	  return root + dir;
	}
	function basename(path, ext) {
	  var f = splitPath(path)[2]; // TODO: make this comparison case-insensitive on windows?

	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }

	  return f;
	}
	function extname(path) {
	  return splitPath(path)[3];
	}
	var _path = {
	  extname: extname,
	  basename: basename,
	  dirname: dirname,
	  sep: sep,
	  delimiter: delimiter,
	  relative: relative,
	  join: join,
	  isAbsolute: isAbsolute,
	  normalize: normalize,
	  resolve: resolve
	};

	function filter(xs, f) {
	  if (xs.filter) return xs.filter(f);
	  var res = [];

	  for (var i = 0; i < xs.length; i++) {
	    if (f(xs[i], i, xs)) res.push(xs[i]);
	  }

	  return res;
	} // String.prototype.substr - negative index don't work in IE8


	var substr = 'ab'.substr(-1) === 'b' ? function (str, start, len) {
	  return str.substr(start, len);
	} : function (str, start, len) {
	  if (start < 0) start = str.length + start;
	  return str.substr(start, len);
	};

	var build$5 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.replacePathSepForRegex = exports.escapeStrForRegex = exports.escapePathForRegex = undefined;



	var _path2 = _interopRequireDefault(_path);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	}

	const escapePathForRegex = exports.escapePathForRegex = dir => {
	  if (_path2.default.sep === '\\') {
	    // Replace "\" with "/" so it's not escaped by escapeStrForRegex.
	    // replacePathSepForRegex will convert it back.
	    dir = dir.replace(/\\/g, '/');
	  }

	  return replacePathSepForRegex(escapeStrForRegex(dir));
	};
	/**
	 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *
	 */


	const escapeStrForRegex = exports.escapeStrForRegex = string => string.replace(/[[\]{}()*+?.\\^$|]/g, '\\$&');

	const replacePathSepForRegex = exports.replacePathSepForRegex = string => {
	  if (_path2.default.sep === '\\') {
	    return string.replace(/(\/|(.)?\\(?![[\]{}()*+?.^$|\\]))/g, (_match, p1, p2) => p2 && p2 !== '\\' ? p2 + '\\\\' : '\\\\');
	  }

	  return string;
	};
	});

	unwrapExports(build$5);
	var build_1$1 = build$5.replacePathSepForRegex;
	var build_2$1 = build$5.escapeStrForRegex;
	var build_3$1 = build$5.escapePathForRegex;

	var matchers_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});



	var _jestDiff2 = _interopRequireDefault(build$4);



	var _jestGetType2 = _interopRequireDefault(build$1);









	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	}

	const matchers = {
	  toBe: function (received, expected) {
	    const comment = 'Object.is equality';
	    const pass = Object.is(received, expected);
	    const message = pass ? () => (0, build$3.matcherHint)('.toBe', undefined, undefined, {
	      comment: comment,
	      isNot: true
	    }) + '\n\n' + `Expected: ${(0, build$3.printExpected)(expected)}\n` + `Received: ${(0, build$3.printReceived)(received)}` : () => {
	      const suggestToEqual = (0, _jestGetType2.default)(received) === (0, _jestGetType2.default)(expected) && ((0, _jestGetType2.default)(received) === 'object' || (0, _jestGetType2.default)(expected) === 'array') && (0, jasmine_utils.equals)(received, expected, [utils.iterableEquality]);
	      const oneline = (0, utils.isOneline)(expected, received);
	      const diffString = (0, _jestDiff2.default)(expected, received, {
	        expand: this.expand
	      });
	      return (0, build$3.matcherHint)('.toBe', undefined, undefined, {
	        comment: comment,
	        isNot: false
	      }) + '\n\n' + `Expected: ${(0, build$3.printExpected)(expected)}\n` + `Received: ${(0, build$3.printReceived)(received)}` + (diffString && !oneline ? `\n\nDifference:\n\n${diffString}` : '') + (suggestToEqual ? ` ${build$3.SUGGEST_TO_EQUAL}` : '');
	    }; // Passing the the actual and expected objects so that a custom reporter
	    // could access them, for example in order to display a custom visual diff,
	    // or create a different error message

	    return {
	      actual: received,
	      expected: expected,
	      message: message,
	      name: 'toBe',
	      pass: pass
	    };
	  },
	  toBeCloseTo: function (actual, expected) {
	    let precision = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
	    const secondArgument = arguments.length === 3 ? 'precision' : null;
	    (0, build$3.ensureNumbers)(actual, expected, '.toBeCloseTo');
	    const pass = Math.abs(expected - actual) < Math.pow(10, -precision) / 2;

	    const message = () => (0, build$3.matcherHint)('.toBeCloseTo', undefined, undefined, {
	      isNot: this.isNot,
	      secondArgument: secondArgument
	    }) + '\n\n' + `Precision: ${(0, build$3.printExpected)(precision)}-digit\n` + `Expected: ${(0, build$3.printExpected)(expected)}\n` + `Received: ${(0, build$3.printReceived)(actual)}`;

	    return {
	      message: message,
	      pass: pass
	    };
	  },
	  toBeDefined: function (actual, expected) {
	    (0, build$3.ensureNoExpected)(expected, '.toBeDefined');
	    const pass = actual !== void 0;

	    const message = () => (0, build$3.matcherHint)('.toBeDefined', 'received', '', {
	      isNot: this.isNot
	    }) + '\n\n' + `Received: ${(0, build$3.printReceived)(actual)}`;

	    return {
	      message: message,
	      pass: pass
	    };
	  },
	  toBeFalsy: function (actual, expected) {
	    (0, build$3.ensureNoExpected)(expected, '.toBeFalsy');
	    const pass = !actual;

	    const message = () => (0, build$3.matcherHint)('.toBeFalsy', 'received', '', {
	      isNot: this.isNot
	    }) + '\n\n' + `Received: ${(0, build$3.printReceived)(actual)}`;

	    return {
	      message: message,
	      pass: pass
	    };
	  },
	  toBeGreaterThan: function (actual, expected) {
	    (0, build$3.ensureNumbers)(actual, expected, '.toBeGreaterThan');
	    const pass = actual > expected;

	    const message = () => (0, build$3.matcherHint)('.toBeGreaterThan', undefined, undefined, {
	      isNot: this.isNot
	    }) + '\n\n' + `Expected: ${(0, build$3.printExpected)(expected)}\n` + `Received: ${(0, build$3.printReceived)(actual)}`;

	    return {
	      message: message,
	      pass: pass
	    };
	  },
	  toBeGreaterThanOrEqual: function (actual, expected) {
	    (0, build$3.ensureNumbers)(actual, expected, '.toBeGreaterThanOrEqual');
	    const pass = actual >= expected;

	    const message = () => (0, build$3.matcherHint)('.toBeGreaterThanOrEqual', undefined, undefined, {
	      isNot: this.isNot
	    }) + '\n\n' + `Expected: ${(0, build$3.printExpected)(expected)}\n` + `Received: ${(0, build$3.printReceived)(actual)}`;

	    return {
	      message: message,
	      pass: pass
	    };
	  },
	  toBeInstanceOf: function (received, constructor) {
	    const constType = (0, _jestGetType2.default)(constructor);

	    if (constType !== 'function') {
	      throw new Error((0, build$3.matcherHint)('.toBeInstanceOf', 'value', 'constructor', {
	        isNot: this.isNot
	      }) + `\n\n` + `Expected constructor to be a function. Instead got:\n` + `  ${(0, build$3.printExpected)(constType)}`);
	    }

	    const pass = received instanceof constructor;
	    const message = pass ? () => (0, build$3.matcherHint)('.toBeInstanceOf', 'value', 'constructor', {
	      isNot: this.isNot
	    }) + '\n\n' + `Expected constructor: ${(0, build$3.EXPECTED_COLOR)(constructor.name || String(constructor))}\n` + `Received value: ${(0, build$3.printReceived)(received)}` : () => (0, build$3.matcherHint)('.toBeInstanceOf', 'value', 'constructor', {
	      isNot: this.isNot
	    }) + '\n\n' + `Expected constructor: ${(0, build$3.EXPECTED_COLOR)(constructor.name || String(constructor))}\n` + `Received constructor: ${(0, build$3.RECEIVED_COLOR)(received != null ? received.constructor && received.constructor.name : '')}\n` + `Received value: ${(0, build$3.printReceived)(received)}`;
	    return {
	      message: message,
	      pass: pass
	    };
	  },
	  toBeLessThan: function (actual, expected) {
	    (0, build$3.ensureNumbers)(actual, expected, '.toBeLessThan');
	    const pass = actual < expected;

	    const message = () => (0, build$3.matcherHint)('.toBeLessThan', undefined, undefined, {
	      isNot: this.isNot
	    }) + '\n\n' + `Expected: ${(0, build$3.printExpected)(expected)}\n` + `Received: ${(0, build$3.printReceived)(actual)}`;

	    return {
	      message: message,
	      pass: pass
	    };
	  },
	  toBeLessThanOrEqual: function (actual, expected) {
	    (0, build$3.ensureNumbers)(actual, expected, '.toBeLessThanOrEqual');
	    const pass = actual <= expected;

	    const message = () => (0, build$3.matcherHint)('.toBeLessThanOrEqual', undefined, undefined, {
	      isNot: this.isNot
	    }) + '\n\n' + `Expected: ${(0, build$3.printExpected)(expected)}\n` + `Received: ${(0, build$3.printReceived)(actual)}`;

	    return {
	      message: message,
	      pass: pass
	    };
	  },
	  toBeNaN: function (actual, expected) {
	    (0, build$3.ensureNoExpected)(expected, '.toBeNaN');
	    const pass = Number.isNaN(actual);

	    const message = () => (0, build$3.matcherHint)('.toBeNaN', 'received', '', {
	      isNot: this.isNot
	    }) + '\n\n' + `Received: ${(0, build$3.printReceived)(actual)}`;

	    return {
	      message: message,
	      pass: pass
	    };
	  },
	  toBeNull: function (actual, expected) {
	    (0, build$3.ensureNoExpected)(expected, '.toBeNull');
	    const pass = actual === null;

	    const message = () => (0, build$3.matcherHint)('.toBeNull', 'received', '', {
	      isNot: this.isNot
	    }) + '\n\n' + `Received: ${(0, build$3.printReceived)(actual)}`;

	    return {
	      message: message,
	      pass: pass
	    };
	  },
	  toBeTruthy: function (actual, expected) {
	    (0, build$3.ensureNoExpected)(expected, '.toBeTruthy');
	    const pass = !!actual;

	    const message = () => (0, build$3.matcherHint)('.toBeTruthy', 'received', '', {
	      isNot: this.isNot
	    }) + '\n\n' + `Received: ${(0, build$3.printReceived)(actual)}`;

	    return {
	      message: message,
	      pass: pass
	    };
	  },
	  toBeUndefined: function (actual, expected) {
	    (0, build$3.ensureNoExpected)(expected, '.toBeUndefined');
	    const pass = actual === void 0;

	    const message = () => (0, build$3.matcherHint)('.toBeUndefined', 'received', '', {
	      isNot: this.isNot
	    }) + '\n\n' + `Received: ${(0, build$3.printReceived)(actual)}`;

	    return {
	      message: message,
	      pass: pass
	    };
	  },
	  toContain: function (collection, value) {
	    const collectionType = (0, _jestGetType2.default)(collection);
	    let converted = null;

	    if (Array.isArray(collection) || typeof collection === 'string') {
	      // strings have `indexOf` so we don't need to convert
	      // arrays have `indexOf` and we don't want to make a copy
	      converted = collection;
	    } else {
	      try {
	        converted = Array.from(collection);
	      } catch (e) {
	        throw new Error((0, build$3.matcherHint)('[.not].toContainEqual', 'collection', 'value') + '\n\n' + `Expected ${(0, build$3.RECEIVED_COLOR)('collection')} to be an array-like structure.\n` + (0, build$3.printWithType)('Received', collection, build$3.printReceived));
	      }
	    } // At this point, we're either a string or an Array,
	    // which was converted from an array-like structure.


	    const pass = converted.indexOf(value) != -1;
	    const message = pass ? () => (0, build$3.matcherHint)('.not.toContain', collectionType, 'value') + '\n\n' + `Expected ${collectionType}:\n` + `  ${(0, build$3.printReceived)(collection)}\n` + `Not to contain value:\n` + `  ${(0, build$3.printExpected)(value)}\n` : () => {
	      const suggestToContainEqual = converted !== null && typeof converted !== 'string' && converted instanceof Array && converted.findIndex(item => (0, jasmine_utils.equals)(item, value, [utils.iterableEquality])) !== -1;
	      return (0, build$3.matcherHint)('.toContain', collectionType, 'value') + '\n\n' + `Expected ${collectionType}:\n` + `  ${(0, build$3.printReceived)(collection)}\n` + `To contain value:\n` + `  ${(0, build$3.printExpected)(value)}` + (suggestToContainEqual ? `\n\n${build$3.SUGGEST_TO_CONTAIN_EQUAL}` : '');
	    };
	    return {
	      message: message,
	      pass: pass
	    };
	  },
	  toContainEqual: function (collection, value) {
	    const collectionType = (0, _jestGetType2.default)(collection);
	    let converted = null;

	    if (Array.isArray(collection)) {
	      converted = collection;
	    } else {
	      try {
	        converted = Array.from(collection);
	      } catch (e) {
	        throw new Error((0, build$3.matcherHint)('[.not].toContainEqual', 'collection', 'value') + '\n\n' + `Expected ${(0, build$3.RECEIVED_COLOR)('collection')} to be an array-like structure.\n` + (0, build$3.printWithType)('Received', collection, build$3.printReceived));
	      }
	    }

	    const pass = converted.findIndex(item => (0, jasmine_utils.equals)(item, value, [utils.iterableEquality])) !== -1;
	    const message = pass ? () => (0, build$3.matcherHint)('.not.toContainEqual', collectionType, 'value') + '\n\n' + `Expected ${collectionType}:\n` + `  ${(0, build$3.printReceived)(collection)}\n` + `Not to contain a value equal to:\n` + `  ${(0, build$3.printExpected)(value)}\n` : () => (0, build$3.matcherHint)('.toContainEqual', collectionType, 'value') + '\n\n' + `Expected ${collectionType}:\n` + `  ${(0, build$3.printReceived)(collection)}\n` + `To contain a value equal to:\n` + `  ${(0, build$3.printExpected)(value)}`;
	    return {
	      message: message,
	      pass: pass
	    };
	  },
	  toEqual: function (received, expected) {
	    const pass = (0, jasmine_utils.equals)(received, expected, [utils.iterableEquality]);
	    const message = pass ? () => (0, build$3.matcherHint)('.not.toEqual') + '\n\n' + `Expected value to not equal:\n` + `  ${(0, build$3.printExpected)(expected)}\n` + `Received:\n` + `  ${(0, build$3.printReceived)(received)}` : () => {
	      const oneline = (0, utils.isOneline)(expected, received);
	      const diffString = (0, _jestDiff2.default)(expected, received, {
	        expand: this.expand
	      });
	      return (0, build$3.matcherHint)('.toEqual') + '\n\n' + `Expected value to equal:\n` + `  ${(0, build$3.printExpected)(expected)}\n` + `Received:\n` + `  ${(0, build$3.printReceived)(received)}` + (diffString && !oneline ? `\n\nDifference:\n\n${diffString}` : '');
	    }; // Passing the the actual and expected objects so that a custom reporter
	    // could access them, for example in order to display a custom visual diff,
	    // or create a different error message

	    return {
	      actual: received,
	      expected: expected,
	      message: message,
	      name: 'toEqual',
	      pass: pass
	    };
	  },
	  toHaveLength: function (received, length) {
	    if (typeof received !== 'string' && (!received || typeof received.length !== 'number')) {
	      throw new Error((0, build$3.matcherHint)('[.not].toHaveLength', 'received', 'length') + '\n\n' + `Expected value to have a 'length' property that is a number. ` + `Received:\n` + `  ${(0, build$3.printReceived)(received)}\n` + (received ? `received.length:\n  ${(0, build$3.printReceived)(received.length)}` : ''));
	    }

	    const pass = received.length === length;
	    const message = pass ? () => (0, build$3.matcherHint)('.not.toHaveLength', 'received', 'length') + '\n\n' + `Expected value to not have length:\n` + `  ${(0, build$3.printExpected)(length)}\n` + `Received:\n` + `  ${(0, build$3.printReceived)(received)}\n` + `received.length:\n` + `  ${(0, build$3.printReceived)(received.length)}` : () => (0, build$3.matcherHint)('.toHaveLength', 'received', 'length') + '\n\n' + `Expected value to have length:\n` + `  ${(0, build$3.printExpected)(length)}\n` + `Received:\n` + `  ${(0, build$3.printReceived)(received)}\n` + `received.length:\n` + `  ${(0, build$3.printReceived)(received.length)}`;
	    return {
	      message: message,
	      pass: pass
	    };
	  },
	  toHaveProperty: function (object, keyPath, value) {
	    const valuePassed = arguments.length === 3;
	    const secondArgument = valuePassed ? 'value' : null;

	    if (!object && typeof object !== 'string' && typeof object !== 'number') {
	      throw new Error((0, build$3.matcherHint)('[.not].toHaveProperty', 'object', 'path', {
	        secondArgument: secondArgument
	      }) + '\n\n' + `Expected ${(0, build$3.RECEIVED_COLOR)('object')} to be an object. Received:\n` + `  ${(0, _jestGetType2.default)(object)}: ${(0, build$3.printReceived)(object)}`);
	    }

	    const keyPathType = (0, _jestGetType2.default)(keyPath);

	    if (keyPathType !== 'string' && keyPathType !== 'array') {
	      throw new Error((0, build$3.matcherHint)('[.not].toHaveProperty', 'object', 'path', {
	        secondArgument: secondArgument
	      }) + '\n\n' + `Expected ${(0, build$3.EXPECTED_COLOR)('path')} to be a string or an array. Received:\n` + `  ${(0, _jestGetType2.default)(keyPath)}: ${(0, build$3.printReceived)(keyPath)}`);
	    }

	    const result = (0, utils.getPath)(object, keyPath);
	    const lastTraversedObject = result.lastTraversedObject,
	          hasEndProp = result.hasEndProp;
	    const pass = valuePassed ? (0, jasmine_utils.equals)(result.value, value, [utils.iterableEquality]) : hasEndProp;
	    const traversedPath = result.traversedPath.join('.');
	    const message = pass ? () => (0, build$3.matcherHint)('.not.toHaveProperty', 'object', 'path', {
	      secondArgument: secondArgument
	    }) + '\n\n' + `Expected the object:\n` + `  ${(0, build$3.printReceived)(object)}\n` + `Not to have a nested property:\n` + `  ${(0, build$3.printExpected)(keyPath)}\n` + (valuePassed ? `With a value of:\n  ${(0, build$3.printExpected)(value)}\n` : '') : () => {
	      const diffString = valuePassed && hasEndProp ? (0, _jestDiff2.default)(value, result.value, {
	        expand: this.expand
	      }) : '';
	      return (0, build$3.matcherHint)('.toHaveProperty', 'object', 'path', {
	        secondArgument: secondArgument
	      }) + '\n\n' + `Expected the object:\n` + `  ${(0, build$3.printReceived)(object)}\n` + `To have a nested property:\n` + `  ${(0, build$3.printExpected)(keyPath)}\n` + (valuePassed ? `With a value of:\n  ${(0, build$3.printExpected)(value)}\n` : '') + (hasEndProp ? `Received:\n` + `  ${(0, build$3.printReceived)(result.value)}` + (diffString ? `\n\nDifference:\n\n${diffString}` : '') : traversedPath ? `Received:\n  ${(0, build$3.RECEIVED_COLOR)('object')}.${traversedPath}: ${(0, build$3.printReceived)(lastTraversedObject)}` : '');
	    };

	    if (pass === undefined) {
	      throw new Error('pass must be initialized');
	    }

	    return {
	      message: message,
	      pass: pass
	    };
	  },
	  toMatch: function (received, expected) {
	    if (typeof received !== 'string') {
	      throw new Error((0, build$3.matcherHint)('[.not].toMatch', 'string', 'expected') + '\n\n' + `${(0, build$3.RECEIVED_COLOR)('string')} value must be a string.\n` + (0, build$3.printWithType)('Received', received, build$3.printReceived));
	    }

	    if (!(expected && typeof expected.test === 'function') && !(typeof expected === 'string')) {
	      throw new Error((0, build$3.matcherHint)('[.not].toMatch', 'string', 'expected') + '\n\n' + `${(0, build$3.EXPECTED_COLOR)('expected')} value must be a string or a regular expression.\n` + (0, build$3.printWithType)('Expected', expected, build$3.printExpected));
	    }

	    const pass = new RegExp(typeof expected === 'string' ? (0, build$5.escapeStrForRegex)(expected) : expected).test(received);
	    const message = pass ? () => (0, build$3.matcherHint)('.not.toMatch') + `\n\nExpected value not to match:\n` + `  ${(0, build$3.printExpected)(expected)}` + `\nReceived:\n` + `  ${(0, build$3.printReceived)(received)}` : () => (0, build$3.matcherHint)('.toMatch') + `\n\nExpected value to match:\n` + `  ${(0, build$3.printExpected)(expected)}` + `\nReceived:\n` + `  ${(0, build$3.printReceived)(received)}`;
	    return {
	      message: message,
	      pass: pass
	    };
	  },
	  toMatchObject: function (receivedObject, expectedObject) {
	    if (typeof receivedObject !== 'object' || receivedObject === null) {
	      throw new Error((0, build$3.matcherHint)('[.not].toMatchObject', 'object', 'expected') + '\n\n' + `${(0, build$3.RECEIVED_COLOR)('received')} value must be an object.\n` + (0, build$3.printWithType)('Received', receivedObject, build$3.printReceived));
	    }

	    if (typeof expectedObject !== 'object' || expectedObject === null) {
	      throw new Error((0, build$3.matcherHint)('[.not].toMatchObject', 'object', 'expected') + '\n\n' + `${(0, build$3.EXPECTED_COLOR)('expected')} value must be an object.\n` + (0, build$3.printWithType)('Expected', expectedObject, build$3.printExpected));
	    }

	    const pass = (0, jasmine_utils.equals)(receivedObject, expectedObject, [utils.iterableEquality, utils.subsetEquality]);
	    const message = pass ? () => (0, build$3.matcherHint)('.not.toMatchObject') + `\n\nExpected value not to match object:\n` + `  ${(0, build$3.printExpected)(expectedObject)}` + `\nReceived:\n` + `  ${(0, build$3.printReceived)(receivedObject)}` : () => {
	      const diffString = (0, _jestDiff2.default)(expectedObject, (0, utils.getObjectSubset)(receivedObject, expectedObject), {
	        expand: this.expand
	      });
	      return (0, build$3.matcherHint)('.toMatchObject') + `\n\nExpected value to match object:\n` + `  ${(0, build$3.printExpected)(expectedObject)}` + `\nReceived:\n` + `  ${(0, build$3.printReceived)(receivedObject)}` + (diffString ? `\nDifference:\n${diffString}` : '');
	    };
	    return {
	      message: message,
	      pass: pass
	    };
	  },
	  toStrictEqual: function (received, expected) {
	    const pass = (0, jasmine_utils.equals)(received, expected, [utils.iterableEquality, utils.typeEquality], true);
	    const message = pass ? () => (0, build$3.matcherHint)('.not.toStrictEqual') + '\n\n' + `Expected value to not equal:\n` + `  ${(0, build$3.printExpected)(expected)}\n` + `Received:\n` + `  ${(0, build$3.printReceived)(received)}` : () => {
	      const diffString = (0, _jestDiff2.default)(expected, received, {
	        expand: this.expand
	      });
	      return (0, build$3.matcherHint)('.toStrictEqual') + '\n\n' + `Expected value to equal:\n` + `  ${(0, build$3.printExpected)(expected)}\n` + `Received:\n` + `  ${(0, build$3.printReceived)(received)}` + (diffString ? `\n\nDifference:\n\n${diffString}` : '');
	    }; // Passing the the actual and expected objects so that a custom reporter
	    // could access them, for example in order to display a custom visual diff,
	    // or create a different error message

	    return {
	      actual: received,
	      expected: expected,
	      message: message,
	      name: 'toStrictEqual',
	      pass: pass
	    };
	  }
	};
	/**
	 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *
	 */

	exports.default = matchers;
	});

	unwrapExports(matchers_1);

	var spy_matchers = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _slicedToArray = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;

	    try {
	      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);

	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i['return']) _i['return']();
	      } finally {
	        if (_d) throw _e;
	      }
	    }

	    return _arr;
	  }

	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if (Symbol.iterator in Object(arr)) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError('Invalid attempt to destructure non-iterable instance');
	    }
	  };
	}();









	var _jestDiff2 = _interopRequireDefault(build$4);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	}

	const CALL_PRINT_LIMIT = 3;
	/**
	 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *
	 */

	const RETURN_PRINT_LIMIT = 5;
	const LAST_CALL_PRINT_LIMIT = 1;

	const createToBeCalledMatcher = matcherName => (received, expected) => {
	  (0, build$3.ensureNoExpected)(expected, matcherName);
	  ensureMock(received, matcherName);
	  const receivedIsSpy = isSpy(received);
	  const type = receivedIsSpy ? 'spy' : 'mock function';
	  const receivedName = receivedIsSpy ? 'spy' : received.getMockName();
	  const identifier = receivedIsSpy || receivedName === 'jest.fn()' ? type : `${type} "${receivedName}"`;
	  const count = receivedIsSpy ? received.calls.count() : received.mock.calls.length;
	  const calls = receivedIsSpy ? received.calls.all().map(x => x.args) : received.mock.calls;
	  const pass = count > 0;
	  const message = pass ? () => (0, build$3.matcherHint)('.not' + matcherName, receivedName, '') + '\n\n' + `Expected ${identifier} not to be called ` + formatReceivedCalls(calls, CALL_PRINT_LIMIT, {
	    sameSentence: true
	  }) : () => (0, build$3.matcherHint)(matcherName, receivedName, '') + '\n\n' + `Expected ${identifier} to have been called, but it was not called.`;
	  return {
	    message: message,
	    pass: pass
	  };
	};

	const createToReturnMatcher = matcherName => (received, expected) => {
	  (0, build$3.ensureNoExpected)(expected, matcherName);
	  ensureMock(received, matcherName);
	  const receivedName = received.getMockName();
	  const identifier = receivedName === 'jest.fn()' ? 'mock function' : `mock function "${receivedName}"`; // List of return values that correspond only to calls that did not throw
	  // an error

	  const returnValues = received.mock.results.filter(result => !result.isThrow).map(result => result.value);
	  const count = returnValues.length;
	  const pass = count > 0;
	  const message = pass ? () => (0, build$3.matcherHint)('.not' + matcherName, receivedName, '') + '\n\n' + `Expected ${identifier} not to have returned, but it returned:\n` + `  ${getPrintedReturnValues(returnValues, RETURN_PRINT_LIMIT)}` : () => (0, build$3.matcherHint)(matcherName, receivedName, '') + '\n\n' + `Expected ${identifier} to have returned.`;
	  return {
	    message: message,
	    pass: pass
	  };
	};

	const createToBeCalledTimesMatcher = matcherName => (received, expected) => {
	  (0, build$3.ensureExpectedIsNumber)(expected, matcherName);
	  ensureMock(received, matcherName);
	  const receivedIsSpy = isSpy(received);
	  const type = receivedIsSpy ? 'spy' : 'mock function';
	  const receivedName = receivedIsSpy ? 'spy' : received.getMockName();
	  const identifier = receivedIsSpy || receivedName === 'jest.fn()' ? type : `${type} "${receivedName}"`;
	  const count = receivedIsSpy ? received.calls.count() : received.mock.calls.length;
	  const pass = count === expected;
	  const message = pass ? () => (0, build$3.matcherHint)('.not' + matcherName, receivedName, String(expected)) + `\n\n` + `Expected ${identifier} not to be called ` + `${(0, build$3.EXPECTED_COLOR)((0, build$3.pluralize)('time', expected))}, but it was` + ` called exactly ${(0, build$3.RECEIVED_COLOR)((0, build$3.pluralize)('time', count))}.` : () => (0, build$3.matcherHint)(matcherName, receivedName, String(expected)) + '\n\n' + `Expected ${identifier} to have been called ` + `${(0, build$3.EXPECTED_COLOR)((0, build$3.pluralize)('time', expected))},` + ` but it was called ${(0, build$3.RECEIVED_COLOR)((0, build$3.pluralize)('time', count))}.`;
	  return {
	    message: message,
	    pass: pass
	  };
	};

	const createToReturnTimesMatcher = matcherName => (received, expected) => {
	  (0, build$3.ensureExpectedIsNumber)(expected, matcherName);
	  ensureMock(received, matcherName);
	  const receivedName = received.getMockName();
	  const identifier = receivedName === 'jest.fn()' ? 'mock function' : `mock function "${receivedName}"`; // List of return results that correspond only to calls that did not throw
	  // an error

	  const returnResults = received.mock.results.filter(result => !result.isThrow);
	  const count = returnResults.length;
	  const pass = count === expected;
	  const message = pass ? () => (0, build$3.matcherHint)('.not' + matcherName, receivedName, String(expected)) + `\n\n` + `Expected ${identifier} not to have returned ` + `${(0, build$3.EXPECTED_COLOR)((0, build$3.pluralize)('time', expected))}, but it` + ` returned exactly ${(0, build$3.RECEIVED_COLOR)((0, build$3.pluralize)('time', count))}.` : () => (0, build$3.matcherHint)(matcherName, receivedName, String(expected)) + '\n\n' + `Expected ${identifier} to have returned ` + `${(0, build$3.EXPECTED_COLOR)((0, build$3.pluralize)('time', expected))},` + ` but it returned ${(0, build$3.RECEIVED_COLOR)((0, build$3.pluralize)('time', count))}.`;
	  return {
	    message: message,
	    pass: pass
	  };
	};

	const createToBeCalledWithMatcher = matcherName => function (received) {
	  for (var _len = arguments.length, expected = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    expected[_key - 1] = arguments[_key];
	  }

	  ensureMock(received, matcherName);
	  const receivedIsSpy = isSpy(received);
	  const type = receivedIsSpy ? 'spy' : 'mock function';
	  const receivedName = receivedIsSpy ? 'spy' : received.getMockName();
	  const identifier = receivedIsSpy || receivedName === 'jest.fn()' ? type : `${type} "${receivedName}"`;
	  const calls = receivedIsSpy ? received.calls.all().map(x => x.args) : received.mock.calls;

	  var _partition = (0, utils.partition)(calls, call => (0, jasmine_utils.equals)(call, expected, [utils.iterableEquality])),
	      _partition2 = _slicedToArray(_partition, 2);

	  const match = _partition2[0],
	        fail = _partition2[1];
	  const pass = match.length > 0;
	  const message = pass ? () => (0, build$3.matcherHint)('.not' + matcherName, receivedName) + '\n\n' + `Expected ${identifier} not to have been called with:\n` + `  ${(0, build$3.printExpected)(expected)}` : () => (0, build$3.matcherHint)(matcherName, receivedName) + '\n\n' + `Expected ${identifier} to have been called with:\n` + formatMismatchedCalls(fail, expected, CALL_PRINT_LIMIT);
	  return {
	    message: message,
	    pass: pass
	  };
	};

	const createToReturnWithMatcher = matcherName => (received, expected) => {
	  ensureMock(received, matcherName);
	  const receivedName = received.getMockName();
	  const identifier = receivedName === 'jest.fn()' ? 'mock function' : `mock function "${receivedName}"`; // List of return values that correspond only to calls that did not throw
	  // an error

	  const returnValues = received.mock.results.filter(result => !result.isThrow).map(result => result.value);

	  var _partition3 = (0, utils.partition)(returnValues, value => (0, jasmine_utils.equals)(expected, value, [utils.iterableEquality])),
	      _partition4 = _slicedToArray(_partition3, 1);

	  const match = _partition4[0];
	  const pass = match.length > 0;
	  const message = pass ? () => (0, build$3.matcherHint)('.not' + matcherName, receivedName) + '\n\n' + `Expected ${identifier} not to have returned:\n` + `  ${(0, build$3.printExpected)(expected)}\n` + `But it returned exactly:\n` + `  ${(0, build$3.printReceived)(expected)}` : () => (0, build$3.matcherHint)(matcherName, receivedName) + '\n\n' + `Expected ${identifier} to have returned:\n` + formatMismatchedReturnValues(returnValues, expected, RETURN_PRINT_LIMIT);
	  return {
	    message: message,
	    pass: pass
	  };
	};

	const createLastCalledWithMatcher = matcherName => function (received) {
	  for (var _len2 = arguments.length, expected = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	    expected[_key2 - 1] = arguments[_key2];
	  }

	  ensureMock(received, matcherName);
	  const receivedIsSpy = isSpy(received);
	  const type = receivedIsSpy ? 'spy' : 'mock function';
	  const receivedName = receivedIsSpy ? 'spy' : received.getMockName();
	  const identifier = receivedIsSpy || receivedName === 'jest.fn()' ? type : `${type} "${receivedName}"`;
	  const calls = receivedIsSpy ? received.calls.all().map(x => x.args) : received.mock.calls;
	  const pass = (0, jasmine_utils.equals)(calls[calls.length - 1], expected, [utils.iterableEquality]);
	  const message = pass ? () => (0, build$3.matcherHint)('.not' + matcherName, receivedName) + '\n\n' + `Expected ${identifier} to not have been last called with:\n` + `  ${(0, build$3.printExpected)(expected)}` : () => (0, build$3.matcherHint)(matcherName, receivedName) + '\n\n' + `Expected ${identifier} to have been last called with:\n` + formatMismatchedCalls(calls, expected, LAST_CALL_PRINT_LIMIT);
	  return {
	    message: message,
	    pass: pass
	  };
	};

	const createLastReturnedMatcher = matcherName => (received, expected) => {
	  ensureMock(received, matcherName);
	  const receivedName = received.getMockName();
	  const identifier = receivedName === 'jest.fn()' ? 'mock function' : `mock function "${receivedName}"`;
	  const results = received.mock.results;
	  const lastResult = results[results.length - 1];
	  const pass = !!lastResult && !lastResult.isThrow && (0, jasmine_utils.equals)(lastResult.value, expected, [utils.iterableEquality]);
	  const message = pass ? () => (0, build$3.matcherHint)('.not' + matcherName, receivedName) + '\n\n' + `Expected ${identifier} to not have last returned:\n` + `  ${(0, build$3.printExpected)(expected)}\n` + `But it last returned exactly:\n` + `  ${(0, build$3.printReceived)(lastResult.value)}` : () => (0, build$3.matcherHint)(matcherName, receivedName) + '\n\n' + `Expected ${identifier} to have last returned:\n` + `  ${(0, build$3.printExpected)(expected)}\n` + (!lastResult ? `But it was ${(0, build$3.RECEIVED_COLOR)('not called')}` : lastResult.isThrow ? `But the last call ${(0, build$3.RECEIVED_COLOR)('threw an error')}` : `But the last call returned:\n  ${(0, build$3.printReceived)(lastResult.value)}`);
	  return {
	    message: message,
	    pass: pass
	  };
	};

	const createNthCalledWithMatcher = matcherName => function (received, nth) {
	  for (var _len3 = arguments.length, expected = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
	    expected[_key3 - 2] = arguments[_key3];
	  }

	  ensureMock(received, matcherName);
	  const receivedIsSpy = isSpy(received);
	  const type = receivedIsSpy ? 'spy' : 'mock function';

	  if (typeof nth !== 'number' || parseInt(nth, 10) !== nth || nth < 1) {
	    const message = () => `nth value ${(0, build$3.printReceived)(nth)} must be a positive integer greater than ${(0, build$3.printExpected)(0)}`;

	    const pass = false;
	    return {
	      message: message,
	      pass: pass
	    };
	  }

	  const receivedName = receivedIsSpy ? 'spy' : received.getMockName();
	  const identifier = receivedIsSpy || receivedName === 'jest.fn()' ? type : `${type} "${receivedName}"`;
	  const calls = receivedIsSpy ? received.calls.all().map(x => x.args) : received.mock.calls;
	  const pass = (0, jasmine_utils.equals)(calls[nth - 1], expected, [utils.iterableEquality]);
	  const message = pass ? () => (0, build$3.matcherHint)('.not' + matcherName, receivedName) + '\n\n' + `Expected ${identifier} ${nthToString(nth)} call to not have been called with:\n` + `  ${(0, build$3.printExpected)(expected)}` : () => (0, build$3.matcherHint)(matcherName, receivedName) + '\n\n' + `Expected ${identifier} ${nthToString(nth)} call to have been called with:\n` + formatMismatchedCalls(calls[nth - 1] ? [calls[nth - 1]] : [], expected, LAST_CALL_PRINT_LIMIT);
	  return {
	    message: message,
	    pass: pass
	  };
	};

	const createNthReturnedWithMatcher = matcherName => (received, nth, expected) => {
	  ensureMock(received, matcherName);

	  if (typeof nth !== 'number' || parseInt(nth, 10) !== nth || nth < 1) {
	    const message = () => `nth value ${(0, build$3.printReceived)(nth)} must be a positive integer greater than ${(0, build$3.printExpected)(0)}`;

	    const pass = false;
	    return {
	      message: message,
	      pass: pass
	    };
	  }

	  const receivedName = received.getMockName();
	  const identifier = receivedName === 'jest.fn()' ? 'mock function' : `mock function "${receivedName}"`;
	  const results = received.mock.results;
	  const nthResult = results[nth - 1];
	  const pass = !!nthResult && !nthResult.isThrow && (0, jasmine_utils.equals)(nthResult.value, expected, [utils.iterableEquality]);
	  const nthString = nthToString(nth);
	  const message = pass ? () => (0, build$3.matcherHint)('.not' + matcherName, receivedName) + '\n\n' + `Expected ${identifier} ${nthString} call to not have returned with:\n` + `  ${(0, build$3.printExpected)(expected)}\n` + `But the ${nthString} call returned exactly:\n` + `  ${(0, build$3.printReceived)(nthResult.value)}` : () => (0, build$3.matcherHint)(matcherName, receivedName) + '\n\n' + `Expected ${identifier} ${nthString} call to have returned with:\n` + `  ${(0, build$3.printExpected)(expected)}\n` + (results.length === 0 ? `But it was ${(0, build$3.RECEIVED_COLOR)('not called')}` : nth > results.length ? `But it was only called ${(0, build$3.printReceived)(results.length)} times` : nthResult.isThrow ? `But the ${nthString} call ${(0, build$3.RECEIVED_COLOR)('threw an error')}` : `But the ${nthString} call returned with:\n  ${(0, build$3.printReceived)(nthResult.value)}`);
	  return {
	    message: message,
	    pass: pass
	  };
	};

	const spyMatchers = {
	  lastCalledWith: createLastCalledWithMatcher('.lastCalledWith'),
	  lastReturnedWith: createLastReturnedMatcher('.lastReturnedWith'),
	  nthCalledWith: createNthCalledWithMatcher('.nthCalledWith'),
	  nthReturnedWith: createNthReturnedWithMatcher('.nthReturnedWith'),
	  toBeCalled: createToBeCalledMatcher('.toBeCalled'),
	  toBeCalledTimes: createToBeCalledTimesMatcher('.toBeCalledTimes'),
	  toBeCalledWith: createToBeCalledWithMatcher('.toBeCalledWith'),
	  toHaveBeenCalled: createToBeCalledMatcher('.toHaveBeenCalled'),
	  toHaveBeenCalledTimes: createToBeCalledTimesMatcher('.toHaveBeenCalledTimes'),
	  toHaveBeenCalledWith: createToBeCalledWithMatcher('.toHaveBeenCalledWith'),
	  toHaveBeenLastCalledWith: createLastCalledWithMatcher('.toHaveBeenLastCalledWith'),
	  toHaveBeenNthCalledWith: createNthCalledWithMatcher('.toHaveBeenNthCalledWith'),
	  toHaveLastReturnedWith: createLastReturnedMatcher('.toHaveLastReturnedWith'),
	  toHaveNthReturnedWith: createNthReturnedWithMatcher('.toHaveNthReturnedWith'),
	  toHaveReturned: createToReturnMatcher('.toHaveReturned'),
	  toHaveReturnedTimes: createToReturnTimesMatcher('.toHaveReturnedTimes'),
	  toHaveReturnedWith: createToReturnWithMatcher('.toHaveReturnedWith'),
	  toReturn: createToReturnMatcher('.toReturn'),
	  toReturnTimes: createToReturnTimesMatcher('.toReturnTimes'),
	  toReturnWith: createToReturnWithMatcher('.toReturnWith')
	};

	const isSpy = spy => spy.calls && typeof spy.calls.count === 'function';

	const ensureMock = (mockOrSpy, matcherName) => {
	  if (!mockOrSpy || (mockOrSpy.calls === undefined || mockOrSpy.calls.all === undefined) && mockOrSpy._isMockFunction !== true) {
	    throw new Error((0, build$3.matcherHint)('[.not]' + matcherName, 'jest.fn()', '') + '\n\n' + `${(0, build$3.RECEIVED_COLOR)('jest.fn()')} value must be a mock function ` + `or spy.\n` + (0, build$3.printWithType)('Received', mockOrSpy, build$3.printReceived));
	  }
	};

	const getPrintedCalls = (calls, limit, sep, fn) => {
	  const result = [];
	  let i = calls.length;

	  while (--i >= 0 && --limit >= 0) {
	    result.push(fn(calls[i]));
	  }

	  return result.join(sep);
	};

	const getPrintedReturnValues = (calls, limit) => {
	  const result = [];

	  for (let i = 0; i < calls.length && i < limit; i += 1) {
	    result.push((0, build$3.printReceived)(calls[i]));
	  }

	  if (calls.length > limit) {
	    result.push(`...and ${(0, build$3.printReceived)(calls.length - limit)} more`);
	  }

	  return result.join('\n\n  ');
	};

	const formatReceivedCalls = (calls, limit, options) => {
	  if (calls.length) {
	    const but = options && options.sameSentence ? 'but' : 'But';
	    const count = calls.length - limit;
	    const printedCalls = getPrintedCalls(calls, limit, ', ', build$3.printReceived);
	    return `${but} it was called ` + `with:\n  ` + printedCalls + (count > 0 ? '\nand ' + (0, build$3.RECEIVED_COLOR)((0, build$3.pluralize)('more call', count)) + '.' : '');
	  } else {
	    return `But it was ${(0, build$3.RECEIVED_COLOR)('not called')}.`;
	  }
	};

	const formatMismatchedCalls = (calls, expected, limit) => {
	  if (calls.length) {
	    return getPrintedCalls(calls, limit, '\n\n', formatMismatchedArgs.bind(null, expected));
	  } else {
	    return `  ${(0, build$3.printExpected)(expected)}\n` + `But it was ${(0, build$3.RECEIVED_COLOR)('not called')}.`;
	  }
	};

	const formatMismatchedReturnValues = (returnValues, expected, limit) => {
	  if (returnValues.length) {
	    return `  ${(0, build$3.printExpected)(expected)}\n` + `But it returned:\n` + `  ${getPrintedReturnValues(returnValues, limit)}`;
	  } else {
	    return `  ${(0, build$3.printExpected)(expected)}\n` + `But it did ${(0, build$3.RECEIVED_COLOR)('not return')}.`;
	  }
	};

	const formatMismatchedArgs = (expected, received) => {
	  const length = Math.max(expected.length, received.length);
	  const printedArgs = [];

	  for (let i = 0; i < length; i++) {
	    if (!(0, jasmine_utils.equals)(expected[i], received[i], [utils.iterableEquality])) {
	      const oneline = (0, utils.isOneline)(expected[i], received[i]);
	      const diffString = (0, _jestDiff2.default)(expected[i], received[i]);
	      printedArgs.push(`  ${(0, build$3.printExpected)(expected[i])}\n` + `as argument ${i + 1}, but it was called with\n` + `  ${(0, build$3.printReceived)(received[i])}.` + (diffString && !oneline ? `\n\nDifference:\n\n${diffString}` : ''));
	    } else if (i >= expected.length) {
	      printedArgs.push(`  Did not expect argument ${i + 1} ` + `but it was called with ${(0, build$3.printReceived)(received[i])}.`);
	    }
	  }

	  return printedArgs.join('\n');
	};

	const nthToString = nth => {
	  switch (nth) {
	    case 1:
	      return 'first';

	    case 2:
	      return 'second';

	    case 3:
	      return 'third';
	  }

	  return `${nth}th`;
	};

	exports.default = spyMatchers;
	});

	unwrapExports(spy_matchers);

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.createMatcher = undefined;

	var _jestGetType = require('jest-get-type');

	var _jestGetType2 = _interopRequireDefault(_jestGetType);

	var _jestRegexUtil = require('jest-regex-util');

	var _jestMessageUtil = require('jest-message-util');

	var _jestMatcherUtils = require('jest-matcher-utils');

	var _jasmine_utils = require("./jasmine_utils");

	var _utils = require("./utils");

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	}

	const createMatcher = exports.createMatcher = (matcherName, fromPromise) => (actual, expected) => {
	  const value = expected;
	  let error;

	  if (fromPromise && (0, _utils.isError)(actual)) {
	    error = actual;
	  } else {
	    if (typeof actual !== 'function') {
	      if (!fromPromise) {
	        throw new Error((0, _jestMatcherUtils.matcherHint)(matcherName, 'function', (0, _jestGetType2.default)(value)) + '\n\n' + 'Received value must be a function, but instead ' + `"${(0, _jestGetType2.default)(actual)}" was found`);
	      }
	    } else {
	      try {
	        actual();
	      } catch (e) {
	        error = e;
	      }
	    }
	  }

	  if (typeof expected === 'string') {
	    expected = new RegExp((0, _jestRegexUtil.escapeStrForRegex)(expected));
	  }

	  if (typeof expected === 'function') {
	    return toThrowMatchingError(matcherName, error, expected);
	  } else if (expected && typeof expected.test === 'function') {
	    return toThrowMatchingStringOrRegexp(matcherName, error, expected, value);
	  } else if (expected && typeof expected === 'object') {
	    return toThrowMatchingErrorInstance(matcherName, error, expected);
	  } else if (expected === undefined) {
	    const pass = error !== undefined;
	    return {
	      message: pass ? () => (0, _jestMatcherUtils.matcherHint)('.not' + matcherName, 'function', '') + '\n\n' + 'Expected the function not to throw an error.\n' + printActualErrorMessage(error) : () => (0, _jestMatcherUtils.matcherHint)(matcherName, 'function', (0, _jestGetType2.default)(value)) + '\n\n' + 'Expected the function to throw an error.\n' + printActualErrorMessage(error),
	      pass: pass
	    };
	  } else {
	    throw new Error((0, _jestMatcherUtils.matcherHint)('.not' + matcherName, 'function', (0, _jestGetType2.default)(value)) + '\n\n' + 'Unexpected argument passed.\nExpected: ' + `${(0, _jestMatcherUtils.printExpected)('string')}, ${(0, _jestMatcherUtils.printExpected)('Error (type)')} or ${(0, _jestMatcherUtils.printExpected)('regexp')}.\n` + (0, _jestMatcherUtils.printWithType)('Got', String(expected), _jestMatcherUtils.printExpected));
	  }
	};
	/**
	 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *
	 */


	const matchers$1 = {
	  toThrow: createMatcher('.toThrow'),
	  toThrowError: createMatcher('.toThrowError')
	};

	const toThrowMatchingStringOrRegexp = (name, error, pattern, value) => {
	  if (error && !error.message && !error.name) {
	    error = new Error(error);
	  }

	  const pass = !!(error && error.message.match(pattern));
	  const message = pass ? () => (0, _jestMatcherUtils.matcherHint)('.not' + name, 'function', (0, _jestGetType2.default)(value)) + '\n\n' + `Expected the function not to throw an error matching:\n` + `  ${(0, _jestMatcherUtils.printExpected)(value)}\n` + printActualErrorMessage(error) : () => (0, _jestMatcherUtils.matcherHint)(name, 'function', (0, _jestGetType2.default)(value)) + '\n\n' + `Expected the function to throw an error matching:\n` + `  ${(0, _jestMatcherUtils.printExpected)(value)}\n` + printActualErrorMessage(error);
	  return {
	    message: message,
	    pass: pass
	  };
	};

	const toThrowMatchingErrorInstance = (name, error, expectedError) => {
	  if (error && !error.message && !error.name) {
	    error = new Error(error);
	  }

	  const pass = (0, _jasmine_utils.equals)(error, expectedError);
	  const message = pass ? () => (0, _jestMatcherUtils.matcherHint)('.not' + name, 'function', 'error') + '\n\n' + `Expected the function not to throw an error matching:\n` + `  ${(0, _jestMatcherUtils.printExpected)(expectedError)}\n` + printActualErrorMessage(error) : () => (0, _jestMatcherUtils.matcherHint)(name, 'function', 'error') + '\n\n' + `Expected the function to throw an error matching:\n` + `  ${(0, _jestMatcherUtils.printExpected)(expectedError)}\n` + printActualErrorMessage(error);
	  return {
	    message: message,
	    pass: pass
	  };
	};

	const toThrowMatchingError = (name, error, ErrorClass) => {
	  const pass = !!(error && error instanceof ErrorClass);
	  const message = pass ? () => (0, _jestMatcherUtils.matcherHint)('.not' + name, 'function', 'type') + '\n\n' + `Expected the function not to throw an error of type:\n` + `  ${(0, _jestMatcherUtils.printExpected)(ErrorClass.name)}\n` + printActualErrorMessage(error) : () => (0, _jestMatcherUtils.matcherHint)(name, 'function', 'type') + '\n\n' + `Expected the function to throw an error of type:\n` + `  ${(0, _jestMatcherUtils.printExpected)(ErrorClass.name)}\n` + printActualErrorMessage(error);
	  return {
	    message: message,
	    pass: pass
	  };
	};

	const printActualErrorMessage = error => {
	  if (error) {
	    var _separateMessageFromS = (0, _jestMessageUtil.separateMessageFromStack)(error.stack);

	    const message = _separateMessageFromS.message,
	          stack = _separateMessageFromS.stack;
	    return `Instead, it threw:\n` + (0, _jestMatcherUtils.RECEIVED_COLOR)('  ' + (0, _jestMatcherUtils.highlightTrailingWhitespace)(message) + (0, _jestMessageUtil.formatStackTrace)(stack, {
	      rootDir: process.cwd(),
	      testMatch: []
	    }, {
	      noStackTrace: false
	    }));
	  }

	  return `But it didn't throw anything.`;
	};

	exports.default = matchers$1;

	var to_throw_matchers = /*#__PURE__*/Object.freeze({

	});

	var asymmetric_matchers = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.stringNotMatching = exports.stringMatching = exports.stringNotContaining = exports.stringContaining = exports.objectNotContaining = exports.objectContaining = exports.arrayNotContaining = exports.arrayContaining = exports.anything = exports.any = exports.AsymmetricMatcher = undefined;




	/**
	 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *
	 */


	class AsymmetricMatcher {
	  constructor() {
	    this.$$typeof = Symbol.for('jest.asymmetricMatcher');
	  }

	}

	exports.AsymmetricMatcher = AsymmetricMatcher;

	class Any extends AsymmetricMatcher {
	  constructor(sample) {
	    super();

	    if (typeof sample === 'undefined') {
	      throw new TypeError('any() expects to be passed a constructor function. ' + 'Please pass one or use anything() to match any object.');
	    }

	    this.sample = sample;
	  }

	  asymmetricMatch(other) {
	    if (this.sample == String) {
	      return typeof other == 'string' || other instanceof String;
	    }

	    if (this.sample == Number) {
	      return typeof other == 'number' || other instanceof Number;
	    }

	    if (this.sample == Function) {
	      return typeof other == 'function' || other instanceof Function;
	    }

	    if (this.sample == Object) {
	      return typeof other == 'object';
	    }

	    if (this.sample == Boolean) {
	      return typeof other == 'boolean';
	    }

	    return other instanceof this.sample;
	  }

	  toString() {
	    return 'Any';
	  }

	  getExpectedType() {
	    if (this.sample == String) {
	      return 'string';
	    }

	    if (this.sample == Number) {
	      return 'number';
	    }

	    if (this.sample == Function) {
	      return 'function';
	    }

	    if (this.sample == Object) {
	      return 'object';
	    }

	    if (this.sample == Boolean) {
	      return 'boolean';
	    }

	    return (0, jasmine_utils.fnNameFor)(this.sample);
	  }

	  toAsymmetricMatcher() {
	    return 'Any<' + (0, jasmine_utils.fnNameFor)(this.sample) + '>';
	  }

	}

	class Anything extends AsymmetricMatcher {
	  asymmetricMatch(other) {
	    return !(0, jasmine_utils.isUndefined)(other) && other !== null;
	  }

	  toString() {
	    return 'Anything';
	  } // No getExpectedType method, because it matches either null or undefined.


	  toAsymmetricMatcher() {
	    return 'Anything';
	  }

	}

	class ArrayContaining extends AsymmetricMatcher {
	  constructor(sample) {
	    let inverse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	    super();
	    this.sample = sample;
	    this.inverse = inverse;
	  }

	  asymmetricMatch(other) {
	    if (!Array.isArray(this.sample)) {
	      throw new Error(`You must provide an array to ${this.toString()}, not '` + typeof this.sample + "'.");
	    }

	    const result = this.sample.length === 0 || Array.isArray(other) && this.sample.every(item => other.some(another => (0, jasmine_utils.equals)(item, another)));
	    return this.inverse ? !result : result;
	  }

	  toString() {
	    return `Array${this.inverse ? 'Not' : ''}Containing`;
	  }

	  getExpectedType() {
	    return 'array';
	  }

	}

	class ObjectContaining extends AsymmetricMatcher {
	  constructor(sample) {
	    let inverse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	    super();
	    this.sample = sample;
	    this.inverse = inverse;
	  }

	  asymmetricMatch(other) {
	    if (typeof this.sample !== 'object') {
	      throw new Error(`You must provide an object to ${this.toString()}, not '` + typeof this.sample + "'.");
	    }

	    if (this.inverse) {
	      for (const property in this.sample) {
	        if ((0, jasmine_utils.hasProperty)(other, property) && (0, jasmine_utils.equals)(this.sample[property], other[property]) && !(0, utils.emptyObject)(this.sample[property]) && !(0, utils.emptyObject)(other[property])) {
	          return false;
	        }
	      }

	      return true;
	    } else {
	      for (const property in this.sample) {
	        if (!(0, jasmine_utils.hasProperty)(other, property) || !(0, jasmine_utils.equals)(this.sample[property], other[property])) {
	          return false;
	        }
	      }

	      return true;
	    }
	  }

	  toString() {
	    return `Object${this.inverse ? 'Not' : ''}Containing`;
	  }

	  getExpectedType() {
	    return 'object';
	  }

	}

	class StringContaining extends AsymmetricMatcher {
	  constructor(sample) {
	    let inverse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	    super();

	    if (!(0, jasmine_utils.isA)('String', sample)) {
	      throw new Error('Expected is not a string');
	    }

	    this.sample = sample;
	    this.inverse = inverse;
	  }

	  asymmetricMatch(other) {
	    if (!(0, jasmine_utils.isA)('String', other)) {
	      throw new Error('Actual is not a string');
	    }

	    const result = other.includes(this.sample);
	    return this.inverse ? !result : result;
	  }

	  toString() {
	    return `String${this.inverse ? 'Not' : ''}Containing`;
	  }

	  getExpectedType() {
	    return 'string';
	  }

	}

	class StringMatching extends AsymmetricMatcher {
	  constructor(sample) {
	    let inverse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	    super();

	    if (!(0, jasmine_utils.isA)('String', sample) && !(0, jasmine_utils.isA)('RegExp', sample)) {
	      throw new Error('Expected is not a String or a RegExp');
	    }

	    this.sample = new RegExp(sample);
	    this.inverse = inverse;
	  }

	  asymmetricMatch(other) {
	    if (!(0, jasmine_utils.isA)('String', other)) {
	      throw new Error('Actual is not a string');
	    }

	    const result = this.sample.test(other);
	    return this.inverse ? !result : result;
	  }

	  toString() {
	    return `String${this.inverse ? 'Not' : ''}Matching`;
	  }

	  getExpectedType() {
	    return 'string';
	  }

	}

	const any = exports.any = expectedObject => new Any(expectedObject);

	const anything = exports.anything = () => new Anything();

	const arrayContaining = exports.arrayContaining = sample => new ArrayContaining(sample);

	const arrayNotContaining = exports.arrayNotContaining = sample => new ArrayContaining(sample, true);

	const objectContaining = exports.objectContaining = sample => new ObjectContaining(sample);

	const objectNotContaining = exports.objectNotContaining = sample => new ObjectContaining(sample, true);

	const stringContaining = exports.stringContaining = expected => new StringContaining(expected);

	const stringNotContaining = exports.stringNotContaining = expected => new StringContaining(expected, true);

	const stringMatching = exports.stringMatching = expected => new StringMatching(expected);

	const stringNotMatching = exports.stringNotMatching = expected => new StringMatching(expected, true);
	});

	unwrapExports(asymmetric_matchers);
	var asymmetric_matchers_1 = asymmetric_matchers.stringNotMatching;
	var asymmetric_matchers_2 = asymmetric_matchers.stringMatching;
	var asymmetric_matchers_3 = asymmetric_matchers.stringNotContaining;
	var asymmetric_matchers_4 = asymmetric_matchers.stringContaining;
	var asymmetric_matchers_5 = asymmetric_matchers.objectNotContaining;
	var asymmetric_matchers_6 = asymmetric_matchers.objectContaining;
	var asymmetric_matchers_7 = asymmetric_matchers.arrayNotContaining;
	var asymmetric_matchers_8 = asymmetric_matchers.arrayContaining;
	var asymmetric_matchers_9 = asymmetric_matchers.anything;
	var asymmetric_matchers_10 = asymmetric_matchers.any;
	var asymmetric_matchers_11 = asymmetric_matchers.AsymmetricMatcher;

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.setMatchers = exports.getMatchers = exports.setState = exports.getState = exports.INTERNAL_MATCHER_FLAG = undefined;

	var _asymmetric_matchers = require("./asymmetric_matchers");

	function _toConsumableArray(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

	    return arr2;
	  } else {
	    return Array.from(arr);
	  }
	}
	/**
	 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *
	 */
	// Global matchers object holds the list of available matchers and
	// the state, that can hold matcher specific values that change over time.


	const JEST_MATCHERS_OBJECT = Symbol.for('$$jest-matchers-object'); // Notes a built-in/internal Jest matcher.
	// Jest may override the stack trace of Errors thrown by internal matchers.

	const INTERNAL_MATCHER_FLAG = exports.INTERNAL_MATCHER_FLAG = Symbol.for('$$jest-internal-matcher');

	if (!global$1[JEST_MATCHERS_OBJECT]) {
	  Object.defineProperty(global$1, JEST_MATCHERS_OBJECT, {
	    value: {
	      matchers: Object.create(null),
	      state: {
	        assertionCalls: 0,
	        expectedAssertionsNumber: null,
	        isExpectingAssertions: false,
	        suppressedErrors: [] // errors that are not thrown immediately.

	      }
	    }
	  });
	}

	const getState = exports.getState = () => global$1[JEST_MATCHERS_OBJECT].state;

	const setState = exports.setState = state => {
	  Object.assign(global$1[JEST_MATCHERS_OBJECT].state, state);
	};

	const getMatchers = exports.getMatchers = () => global$1[JEST_MATCHERS_OBJECT].matchers;

	const setMatchers = exports.setMatchers = (matchers, isInternal, expect) => {
	  Object.keys(matchers).forEach(key => {
	    const matcher = matchers[key];
	    Object.defineProperty(matcher, INTERNAL_MATCHER_FLAG, {
	      value: isInternal
	    });

	    if (!isInternal) {
	      // expect is defined
	      class CustomMatcher extends _asymmetric_matchers.AsymmetricMatcher {
	        constructor() {
	          let inverse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	          super();
	          this.inverse = inverse;

	          for (var _len = arguments.length, sample = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	            sample[_key - 1] = arguments[_key];
	          }

	          this.sample = sample;
	        }

	        asymmetricMatch(other) {
	          var _ref = matcher.apply(undefined, [other].concat(_toConsumableArray(this.sample)));

	          const pass = _ref.pass;
	          return this.inverse ? !pass : pass;
	        }

	        toString() {
	          return `${this.inverse ? 'not.' : ''}${key}`;
	        }

	        getExpectedType() {
	          return 'any';
	        }

	        toAsymmetricMatcher() {
	          return `${this.toString()}<${this.sample.join(', ')}>`;
	        }

	      }

	      expect[key] = function () {
	        for (var _len2 = arguments.length, sample = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	          sample[_key2] = arguments[_key2];
	        }

	        return new (Function.prototype.bind.apply(CustomMatcher, [null].concat([false], sample)))();
	      };

	      if (!expect.not) {
	        expect.not = {};
	      }

	      expect.not[key] = function () {
	        for (var _len3 = arguments.length, sample = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	          sample[_key3] = arguments[_key3];
	        }

	        return new (Function.prototype.bind.apply(CustomMatcher, [null].concat([true], sample)))();
	      };
	    }
	  });
	  Object.assign(global$1[JEST_MATCHERS_OBJECT].matchers, matchers);
	};

	var jest_matchers_object = /*#__PURE__*/Object.freeze({

	});

	var extract_expected_assertions_errors = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});




	/**
	 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *
	 */


	const resetAssertionsLocalState = () => {
	  (0, jest_matchers_object.setState)({
	    assertionCalls: 0,
	    expectedAssertionsNumber: null,
	    isExpectingAssertions: false
	  });
	}; // Create and format all errors related to the mismatched number of `expect`
	// calls and reset the matcher's state.


	const extractExpectedAssertionsErrors = () => {
	  const result = [];

	  var _getState = (0, jest_matchers_object.getState)();

	  const assertionCalls = _getState.assertionCalls,
	        expectedAssertionsNumber = _getState.expectedAssertionsNumber,
	        expectedAssertionsNumberError = _getState.expectedAssertionsNumberError,
	        isExpectingAssertions = _getState.isExpectingAssertions,
	        isExpectingAssertionsError = _getState.isExpectingAssertionsError;
	  resetAssertionsLocalState();

	  if (typeof expectedAssertionsNumber === 'number' && assertionCalls !== expectedAssertionsNumber) {
	    const numOfAssertionsExpected = (0, build$3.EXPECTED_COLOR)((0, build$3.pluralize)('assertion', expectedAssertionsNumber));
	    expectedAssertionsNumberError.message = (0, build$3.matcherHint)('.assertions', '', String(expectedAssertionsNumber), {
	      isDirectExpectCall: true
	    }) + '\n\n' + `Expected ${numOfAssertionsExpected} to be called but received ` + (0, build$3.RECEIVED_COLOR)((0, build$3.pluralize)('assertion call', assertionCalls || 0)) + '.';
	    result.push({
	      actual: assertionCalls,
	      error: expectedAssertionsNumberError,
	      expected: expectedAssertionsNumber
	    });
	  }

	  if (isExpectingAssertions && assertionCalls === 0) {
	    const expected = (0, build$3.EXPECTED_COLOR)('at least one assertion');
	    const received = (0, build$3.RECEIVED_COLOR)('received none');
	    isExpectingAssertionsError.message = (0, build$3.matcherHint)('.hasAssertions', '', '', {
	      isDirectExpectCall: true
	    }) + '\n\n' + `Expected ${expected} to be called but ${received}.`;
	    result.push({
	      actual: 'none',
	      error: isExpectingAssertionsError,
	      expected: 'at least one'
	    });
	  }

	  return result;
	};

	exports.default = extractExpectedAssertionsErrors;
	});

	unwrapExports(extract_expected_assertions_errors);

	var build$6 = createCommonjsModule(function (module) {



	var matcherUtils = _interopRequireWildcard(build$3);





	var _matchers2 = _interopRequireDefault(matchers_1);



	var _spy_matchers2 = _interopRequireDefault(spy_matchers);



	var _to_throw_matchers2 = _interopRequireDefault(to_throw_matchers);









	var _extract_expected_assertions_errors2 = _interopRequireDefault(extract_expected_assertions_errors);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	}

	function _interopRequireWildcard(obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};

	    if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }

	    newObj.default = obj;
	    return newObj;
	  }
	}
	/**
	 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *
	 */


	class JestAssertionError extends Error {}

	const isPromise = obj => !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';

	const createToThrowErrorMatchingSnapshotMatcher = function (matcher) {
	  return function (received, testNameOrInlineSnapshot) {
	    return matcher.apply(this, [received, testNameOrInlineSnapshot, true]);
	  };
	};

	const getPromiseMatcher = (name, matcher) => {
	  if (name === 'toThrow' || name === 'toThrowError') {
	    return (0, to_throw_matchers.createMatcher)('.' + name, true);
	  } else if (name === 'toThrowErrorMatchingSnapshot' || name === 'toThrowErrorMatchingInlineSnapshot') {
	    return createToThrowErrorMatchingSnapshotMatcher(matcher);
	  }

	  return null;
	};

	const expect = function (actual) {
	  if ((arguments.length <= 1 ? 0 : arguments.length - 1) !== 0) {
	    throw new Error('Expect takes at most one argument.');
	  }

	  const allMatchers = (0, jest_matchers_object.getMatchers)();
	  const expectation = {
	    not: {},
	    rejects: {
	      not: {}
	    },
	    resolves: {
	      not: {}
	    }
	  };
	  const err = new JestAssertionError();
	  Object.keys(allMatchers).forEach(name => {
	    const matcher = allMatchers[name];
	    const promiseMatcher = getPromiseMatcher(name, matcher) || matcher;
	    expectation[name] = makeThrowingMatcher(matcher, false, actual);
	    expectation.not[name] = makeThrowingMatcher(matcher, true, actual);
	    expectation.resolves[name] = makeResolveMatcher(name, promiseMatcher, false, actual, err);
	    expectation.resolves.not[name] = makeResolveMatcher(name, promiseMatcher, true, actual, err);
	    expectation.rejects[name] = makeRejectMatcher(name, promiseMatcher, false, actual, err);
	    expectation.rejects.not[name] = makeRejectMatcher(name, promiseMatcher, true, actual, err);
	  });
	  return expectation;
	};

	const getMessage = message => message && message() || matcherUtils.RECEIVED_COLOR('No message was specified for this matcher.');

	const makeResolveMatcher = (matcherName, matcher, isNot, actual, outerErr) => function () {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  const matcherStatement = `.resolves.${isNot ? 'not.' : ''}${matcherName}`;

	  if (!isPromise(actual)) {
	    throw new JestAssertionError(matcherUtils.matcherHint(matcherStatement, 'received', '') + '\n\n' + `${matcherUtils.RECEIVED_COLOR('received')} value must be a Promise.\n` + matcherUtils.printWithType('Received', actual, matcherUtils.printReceived));
	  }

	  const innerErr = new JestAssertionError();
	  return actual.then(result => makeThrowingMatcher(matcher, isNot, result, innerErr).apply(null, args), reason => {
	    outerErr.message = matcherUtils.matcherHint(matcherStatement, 'received', '') + '\n\n' + `Expected ${matcherUtils.RECEIVED_COLOR('received')} Promise to resolve, ` + 'instead it rejected to value\n' + `  ${matcherUtils.printReceived(reason)}`;
	    return Promise.reject(outerErr);
	  });
	};

	const makeRejectMatcher = (matcherName, matcher, isNot, actual, outerErr) => function () {
	  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	    args[_key2] = arguments[_key2];
	  }

	  const matcherStatement = `.rejects.${isNot ? 'not.' : ''}${matcherName}`;

	  if (!isPromise(actual)) {
	    throw new JestAssertionError(matcherUtils.matcherHint(matcherStatement, 'received', '') + '\n\n' + `${matcherUtils.RECEIVED_COLOR('received')} value must be a Promise.\n` + matcherUtils.printWithType('Received', actual, matcherUtils.printReceived));
	  }

	  const innerErr = new JestAssertionError();
	  return actual.then(result => {
	    outerErr.message = matcherUtils.matcherHint(matcherStatement, 'received', '') + '\n\n' + `Expected ${matcherUtils.RECEIVED_COLOR('received')} Promise to reject, ` + 'instead it resolved to value\n' + `  ${matcherUtils.printReceived(result)}`;
	    return Promise.reject(outerErr);
	  }, reason => makeThrowingMatcher(matcher, isNot, reason, innerErr).apply(null, args));
	};

	const makeThrowingMatcher = (matcher, isNot, actual, err) => function throwingMatcher() {
	  let throws = true;
	  const utils$$1 = Object.assign({}, matcherUtils, {
	    iterableEquality: utils.iterableEquality,
	    subsetEquality: utils.subsetEquality
	  });
	  const matcherContext = Object.assign( // When throws is disabled, the matcher will not throw errors during test
	  // execution but instead add them to the global matcher state. If a
	  // matcher throws, test execution is normally stopped immediately. The
	  // snapshot matcher uses it because we want to log all snapshot
	  // failures in a test.
	  {
	    dontThrow: () => throws = false
	  }, (0, jest_matchers_object.getState)(), {
	    equals: jasmine_utils.equals,
	    error: err,
	    isNot: isNot,
	    utils: utils$$1
	  });

	  const processResult = result => {
	    _validateResult(result);

	    (0, jest_matchers_object.getState)().assertionCalls++;

	    if (result.pass && isNot || !result.pass && !isNot) {
	      // XOR
	      const message = getMessage(result.message);
	      let error;

	      if (err) {
	        error = err;
	        error.message = message;
	      } else {
	        error = new JestAssertionError(message); // Try to remove this function from the stack trace frame.
	        // Guard for some environments (browsers) that do not support this feature.

	        if (Error.captureStackTrace) {
	          Error.captureStackTrace(error, throwingMatcher);
	        }
	      } // Passing the result of the matcher with the error so that a custom
	      // reporter could access the actual and expected objects of the result
	      // for example in order to display a custom visual diff


	      error.matcherResult = result;

	      if (throws) {
	        throw error;
	      } else {
	        (0, jest_matchers_object.getState)().suppressedErrors.push(error);
	      }
	    }
	  };

	  const handlError = error => {
	    if (matcher[jest_matchers_object.INTERNAL_MATCHER_FLAG] === true && !(error instanceof JestAssertionError) && error.name !== 'PrettyFormatPluginError' && // Guard for some environments (browsers) that do not support this feature.
	    Error.captureStackTrace) {
	      // Try to remove this and deeper functions from the stack trace frame.
	      Error.captureStackTrace(error, throwingMatcher);
	    }

	    throw error;
	  };

	  let potentialResult;

	  try {
	    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	      args[_key3] = arguments[_key3];
	    }

	    potentialResult = matcher.apply(matcherContext, [actual].concat(args));

	    if (isPromise(potentialResult)) {
	      const asyncResult = potentialResult;
	      return asyncResult.then(aResult => processResult(aResult)).catch(error => handlError(error));
	    } else {
	      const syncResult = potentialResult;
	      return processResult(syncResult);
	    }
	  } catch (error) {
	    return handlError(error);
	  }
	};

	expect.extend = matchers => (0, jest_matchers_object.setMatchers)(matchers, false, expect);

	expect.anything = asymmetric_matchers.anything;
	expect.any = asymmetric_matchers.any;
	expect.not = {
	  arrayContaining: asymmetric_matchers.arrayNotContaining,
	  objectContaining: asymmetric_matchers.objectNotContaining,
	  stringContaining: asymmetric_matchers.stringNotContaining,
	  stringMatching: asymmetric_matchers.stringNotMatching
	};
	expect.objectContaining = asymmetric_matchers.objectContaining;
	expect.arrayContaining = asymmetric_matchers.arrayContaining;
	expect.stringContaining = asymmetric_matchers.stringContaining;
	expect.stringMatching = asymmetric_matchers.stringMatching;

	const _validateResult = result => {
	  if (typeof result !== 'object' || typeof result.pass !== 'boolean' || result.message && typeof result.message !== 'string' && typeof result.message !== 'function') {
	    throw new Error('Unexpected return from a matcher function.\n' + 'Matcher functions should ' + 'return an object in the following format:\n' + '  {message?: string | function, pass: boolean}\n' + `'${matcherUtils.stringify(result)}' was returned`);
	  }
	};

	function assertions(expected) {
	  const error = new Error();

	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(error, assertions);
	  }

	  (0, jest_matchers_object.getState)().expectedAssertionsNumber = expected;
	  (0, jest_matchers_object.getState)().expectedAssertionsNumberError = error;
	}

	function hasAssertions() {
	  const error = new Error();

	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(error, hasAssertions);
	  }

	  matcherUtils.ensureNoExpected(arguments.length <= 0 ? undefined : arguments[0], '.hasAssertions');
	  (0, jest_matchers_object.getState)().isExpectingAssertions = true;
	  (0, jest_matchers_object.getState)().isExpectingAssertionsError = error;
	} // add default jest matchers


	(0, jest_matchers_object.setMatchers)(_matchers2.default, true, expect);
	(0, jest_matchers_object.setMatchers)(_spy_matchers2.default, true, expect);
	(0, jest_matchers_object.setMatchers)(_to_throw_matchers2.default, true, expect);

	expect.addSnapshotSerializer = () => void 0;

	expect.assertions = assertions;
	expect.hasAssertions = hasAssertions;
	expect.getState = jest_matchers_object.getState;
	expect.setState = jest_matchers_object.setState;
	expect.extractExpectedAssertionsErrors = _extract_expected_assertions_errors2.default;
	module.exports = expect;
	});

	var index$5 = unwrapExports(build$6);

	const mock = require('jest-mock');
	const jest = {
	  fn() {
	    return mock.fn();
	  }

	};

	exports.expect = index$5;
	exports.jest = jest;

	return exports;

}({}));
