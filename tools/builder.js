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
})({"OjAK":[function(require,module,exports) {
module.exports = {
  "name": "effector-dev",
  "version": "0.18.0-rc.2",
  "description": "Reactive state manager",
  "typings": "index.d.ts",
  "private": true,
  "scripts": {
    "docs": "docsify serve .",
    "build:bs": "bsb -make-world",
    "start:bs": "bsb -make-world -w",
    "clean:bs": "bsb -clean-world",
    "server": "micro",
    "test": "npx jest --config=jest.config.js",
    "bench": "node --expose-gc bench/bench.test.js",
    "prepublish:all": "npm run build",
    "prepublish:next": "npm run build",
    "publish:all": "node scripts/publish.js",
    "publish:next": "NEXT='true' node scripts/publish.js",
    "build": "yarn build:standart && yarn build:nodeps",
    "build:builder": "npx parcel build --no-minify --no-source-maps --no-autoinstall -d tools -o builder.js -t node tools/builder/tasks.config.js",
    "builder": "node tools/builder.js",
    "builder:watch": "npx nodemon -w tools/builder/ -w src -i tools/builder.js -x 'yarn build:builder && yarn builder'",
    "postinstall": "yarn build:builder",
    "build:nodeps": "IS_BUILD='true' BUILD_UMD='true' rollup -c",
    "build:standart": "IS_BUILD='true' rollup -c",
    "test:watch": "npx jest --config=jest.config.js --watch",
    "flow": "node_modules/.bin/flow status",
    "flow:stop": "node_modules/.bin/flow stop",
    "flow:restart": "yarn flow:stop && yarn flow",
    "repack": "npx prepack 'npm/effector/effector.bundle.js' --inlineExpressions --compatibility browser --out 'npm/effector/effector.prepack-bundle.js'"
  },
  "author": "Zero Bias",
  "license": "MIT",
  "devDependencies": {
    "@babel/cli": "^7.2.0",
    "@babel/core": "^7.2.2",
    "@babel/node": "^7.2.2",
    "@babel/plugin-proposal-async-generator-functions": "^7.2.0",
    "@babel/plugin-proposal-class-properties": "^7.2.1",
    "@babel/plugin-proposal-decorators": "^7.2.2",
    "@babel/plugin-proposal-export-namespace-from": "^7.2.0",
    "@babel/plugin-proposal-nullish-coalescing-operator": "^7.2.0",
    "@babel/plugin-proposal-object-rest-spread": "^7.2.0",
    "@babel/plugin-proposal-optional-chaining": "^7.2.0",
    "@babel/plugin-transform-block-scoping": "^7.2.0",
    "@babel/plugin-transform-flow-comments": "^7.2.0",
    "@babel/plugin-transform-flow-strip-types": "^7.2.0",
    "@babel/plugin-transform-for-of": "^7.2.0",
    "@babel/plugin-transform-modules-commonjs": "^7.2.0",
    "@babel/preset-env": "^7.2.0",
    "@babel/preset-flow": "^7.0.0",
    "@babel/preset-react": "^7.0.0",
    "@babel/register": "^7.0.0",
    "babel-core": "7.0.0-bridge.0",
    "babel-eslint": "^10.0.1",
    "babel-jest": "^23.6.0",
    "babel-plugin-dev-expression": "^0.2.1",
    "babel-plugin-macros": "^2.4.2",
    "babel-plugin-module-resolver": "^3.1.1",
    "babel-plugin-transform-inline-environment-variables": "^0.4.3",
    "bs-platform": "^4.0.14",
    "chalk": "^2.4.1",
    "chokidar": "^2.0.4",
    "codegen.macro": "^3.0.0",
    "connect": "^3.6.6",
    "cross-env": "^5.2.0",
    "cross-fetch": "^3.0.0",
    "docsify-cli": "^4.3.0",
    "enzyme": "^3.8.0",
    "enzyme-adapter-react-16": "^1.7.1",
    "eslint": "^5.10.0",
    "eslint-plugin-babel": "^5.3.0",
    "eslint-plugin-flowtype": "^3.2.0",
    "eslint-plugin-jest": "^22.1.2",
    "eslint-plugin-react": "^7.11.1",
    "execa": "^1.0.0",
    "express": "^4.16.4",
    "flow-bin": "^0.89.0",
    "flow-copy-source": "^2.0.2",
    "flowgen": "^1.3.0",
    "fs-extra": "^7.0.1",
    "graphlib": "^2.1.7",
    "immer": "^1.8.2",
    "immutable": "^4.0.0-rc.12",
    "jest": "^23.6.0",
    "jest-enzyme": "^7.0.1",
    "jest-runner-eslint": "^0.7.1",
    "js-yaml": "^3.12.0",
    "jscodeshift": "^0.6.2",
    "jsdom": "^13.1.0",
    "jsdom-global": "^3.0.2",
    "micro": "^9.3.3",
    "micro-dev": "^3.0.0",
    "most": "^1.7.3",
    "nodemon": "^1.18.9",
    "now": "^12.1.12",
    "parcel-bundler": "^1.10.3",
    "penv.macro": "^0.2.0",
    "prepack": "^0.2.54",
    "prettier": "^1.15.3",
    "prettier-eslint": "^8.8.2",
    "prettier-eslint-cli": "^4.7.1",
    "pretty-hrtime": "^1.0.3",
    "preval.macro": "^3.0.0",
    "puppeteer": "^1.11.0",
    "raf": "^3.4.1",
    "raw.macro": "^0.2.0",
    "react": "^16.6.3",
    "react-dom": "^16.6.3",
    "react-test-renderer": "^16.6.3",
    "reason-react": "^0.5.3",
    "redux": "^4.0.1",
    "redux-act": "^1.7.4",
    "rimraf": "^2.6.2",
    "rollup": "^0.67.4",
    "rollup-plugin-babel": "^4.1.0",
    "rollup-plugin-bucklescript": "^0.7.0",
    "rollup-plugin-commonjs": "^9.2.0",
    "rollup-plugin-json": "^3.1.0",
    "rollup-plugin-node-builtins": "^2.1.2",
    "rollup-plugin-node-globals": "^1.4.0",
    "rollup-plugin-node-resolve": "^4.0.0",
    "rollup-plugin-replace": "^2.1.0",
    "rollup-plugin-size-snapshot": "^0.7.0",
    "rollup-plugin-terser": "^3.0.0",
    "rollup-plugin-visualizer": "^0.9.2",
    "scope.macro": "^1.0.0",
    "serve": "^10.1.1",
    "setimmediate": "^1.0.5",
    "shelljs": "^0.8.3",
    "styled-components": "^4.1.2",
    "terser": "^3.11.0",
    "vue": "^2.5.21"
  },
  "maintainers": [{
    "name": "Zero Bias",
    "email": "ribkatt@gmail.com"
  }, {
    "name": "goodmind",
    "email": "andwebar@gmail.com"
  }],
  "repository": "https://github.com/zerobias/effector",
  "dependencies": {
    "symbol-observable": "^1.2.0"
  },
  "alias": {
    "warning": "./src/warning/index.js",
    "invariant": "./src/invariant/index.js",
    "effector": "./src/index.js",
    "effector-react": "./src/react",
    "effector-vue": "./src/vue",
    "effector/domain": "./src/domain",
    "effector/effect": "./src/effect",
    "effector/event": "./src/event",
    "effector/store": "./src/store",
    "effector/graphite": "./src/graphite",
    "effector/graphite/tarjan": "./src/graphite/tarjan",
    "effector/graphite/typedef": "./src/graphite/typedef",
    "effector/stdlib/fx": "./src/stdlib/fx",
    "effector/stdlib/kind": "./src/stdlib/kind",
    "effector/stdlib/typedef": "./src/stdlib/typedef",
    "effector/stdlib/visitor": "./src/stdlib/visitor",
    "effector/stdlib/stateref": "./src/stdlib/stateref",
    "effector/stdlib/iterator": "./src/stdlib/iterator",
    "effector/flags": "./src/flags.prod",
    "effector/perf": "./src/perf"
  }
};
},{}],"FO+Z":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dir = dir;
exports.outputPackageJSON = outputPackageJSON;
exports.massCopy = massCopy;
exports.taskList = taskList;
exports.getSourcemapPathTransform = void 0;

var _path = require("path");

var fs = _interopRequireWildcard(require("fs-extra"));

var _package = _interopRequireDefault(require("../../package.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const root = process.cwd();

function dir(...paths) {
  return (0, _path.resolve)(root, ...paths);
}

async function outputPackageJSON(path, config) {
  let fullPath;
  if (path.endsWith('package.json')) fullPath = dir(path);else fullPath = dir(path, 'package.json');
  await fs.outputJSON(fullPath, config, {
    spaces: 2
  });
}

function massCopy(from, to, targets) {
  const jobs = [];

  for (const target of targets) {
    if (typeof target === 'string') {
      jobs.push([dir(from, target), dir(to, target)]);
    } else {
      const [fromFile, toFile] = target;

      if (typeof toFile === 'string') {
        jobs.push([dir(from, fromFile), dir(to, toFile)]);
      } else {
        for (const toFileName of toFile) {
          jobs.push([dir(from, fromFile), dir(to, toFileName)]);
        }
      }
    }
  }

  return Promise.all(jobs.map(([from, to]) => fs.copy(from, to)));
}

function taskList({
  tasks,
  hooks
}) {
  const pending = [];

  const run = tasks => tasks.reduce((p, task) => p.then(task), Promise.resolve());

  return run(hooks.beforeAll).then(() => {
    for (const pkg in tasks) {
      if (pkg === 'beforeAll') continue;
      pending.push(run(tasks[pkg]));
    }

    return Promise.all(pending);
  });
}
/* eslint-disable max-len */

/**
 * @example ../../src/react/createComponent.js -> node_modules/effector-react/createComponent.js
 */


const getSourcemapPathTransform = name => function sourcemapPathTransform(relativePath) {
  let packagePath = (0, _path.join)('../..', _package.default.alias[name]);

  if ((0, _path.extname)(packagePath) !== '') {
    packagePath = (0, _path.dirname)(packagePath);
  }

  return (0, _path.join)(`node_modules/${name}`, (0, _path.relative)(packagePath, relativePath));
};

exports.getSourcemapPathTransform = getSourcemapPathTransform;
},{"../../package.json":"OjAK"}],"OiEt":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rollupEffector = rollupEffector;
exports.rollupEffectorReact = rollupEffectorReact;
exports.rollupEffectorVue = rollupEffectorVue;
exports.getPlugins = void 0;

var _rollup = require("rollup");

var _rollupPluginBabel = _interopRequireDefault(require("rollup-plugin-babel"));

var _rollupPluginNodeResolve = _interopRequireDefault(require("rollup-plugin-node-resolve"));

var _rollupPluginTerser = require("rollup-plugin-terser");

var _rollupPluginCommonjs = _interopRequireDefault(require("rollup-plugin-commonjs"));

var _rollupPluginReplace = _interopRequireDefault(require("rollup-plugin-replace"));

var _rollupPluginSizeSnapshot = require("rollup-plugin-size-snapshot");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//$off
//$off
//$off
//$off
//$off
//$off
// import
const minifyConfig = ({
  prettify,
  toplevel = true
}) => ({
  ecma: 8,
  mangle: {
    toplevel
  },
  compress: {
    pure_getters: true
  },
  output: prettify ? {
    comments: /#/i,
    beautify: true,
    indent_level: 2
  } : {
    comments: /#/i
  }
});

const getPlugins = (name, type = 'cjs') => ({
  babel: (0, _rollupPluginBabel.default)({// runtimeHelpers: true,
    // exclude: /(\.re|node_modules.*)/,
  }),
  replace: (0, _rollupPluginReplace.default)({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  commonjs: (0, _rollupPluginCommonjs.default)({}),
  resolve: (0, _rollupPluginNodeResolve.default)({}),
  terser: (0, _rollupPluginTerser.terser)(minifyConfig({
    prettify: !!process.env.PRETTIFY,
    toplevel: type !== 'umd'
  })),
  sizeSnapshot: (0, _rollupPluginSizeSnapshot.sizeSnapshot)()
});

exports.getPlugins = getPlugins;

async function rollupEffector() {
  const name = 'effector';

  const run = async output => {
    const plugins = getPlugins(name, output.format);
    const build = await (0, _rollup.rollup)({
      input: (0, _utils.dir)(`packages/${name}/index.js`),
      external: ['warning', 'invariant', 'react', 'vue', 'most', 'symbol-observable', 'effector'],
      plugins: [plugins.resolve, plugins.babel, plugins.terser, plugins.sizeSnapshot]
    });
    await build.write(output);
  };

  async function umd() {
    const plugins = getPlugins(name, 'umd'); //$off

    const build = await (0, _rollup.rollup)({
      input: String((0, _utils.dir)(`packages/${name}/index.js`)),
      plugins: [plugins.resolve, plugins.babel, plugins.replace, plugins.commonjs, plugins.terser, plugins.sizeSnapshot],
      external: ['react', 'effector']
    });
    await build.write({
      file: (0, _utils.dir)(`npm/${name}/${name}.bundle.js`),
      format: 'iife',
      name,
      sourcemap: true
    });
  }

  await Promise.all([run({
    file: (0, _utils.dir)(`npm/${name}/${name}.cjs.js`),
    format: 'cjs',
    name,
    sourcemap: true,
    sourcemapPathTransform: (0, _utils.getSourcemapPathTransform)(name)
  }), run({
    file: (0, _utils.dir)(`npm/${name}/${name}.es.js`),
    format: 'es',
    name,
    sourcemap: true,
    sourcemapPathTransform: (0, _utils.getSourcemapPathTransform)(name)
  }), umd()]);
}

async function rollupEffectorReact() {
  const name = 'effector-react';

  const run = async output => {
    const plugins = getPlugins(name, output.format);
    const build = await (0, _rollup.rollup)({
      input: (0, _utils.dir)(`packages/${name}/index.js`),
      external: ['warning', 'invariant', 'react', 'vue', 'most', 'symbol-observable', 'effector'],
      plugins: [plugins.resolve, plugins.babel, plugins.terser, plugins.sizeSnapshot]
    });
    await build.write(output);
  };

  async function umd() {
    const plugins = getPlugins(name, 'umd'); //$off

    const build = await (0, _rollup.rollup)({
      input: String((0, _utils.dir)(`packages/${name}/index.js`)),
      plugins: [plugins.resolve, plugins.babel, plugins.replace, plugins.commonjs, plugins.terser, plugins.sizeSnapshot],
      external: ['react', 'effector']
    });
    await build.write({
      file: (0, _utils.dir)(`npm/${name}/${name}.bundle.js`),
      format: 'iife',
      name: 'effectorReact',
      sourcemap: true
    });
  }

  await Promise.all([run({
    file: (0, _utils.dir)(`npm/${name}/${name}.cjs.js`),
    format: 'cjs',
    name,
    sourcemap: true,
    sourcemapPathTransform: (0, _utils.getSourcemapPathTransform)(name)
  }), run({
    file: (0, _utils.dir)(`npm/${name}/${name}.es.js`),
    format: 'es',
    name,
    sourcemap: true,
    sourcemapPathTransform: (0, _utils.getSourcemapPathTransform)(name)
  }), umd()]);
}

async function rollupEffectorVue() {
  const name = 'effector-vue';

  const run = async output => {
    const plugins = getPlugins(name, output.format);
    const build = await (0, _rollup.rollup)({
      input: (0, _utils.dir)(`packages/${name}/index.js`),
      external: ['warning', 'invariant', 'react', 'vue', 'most', 'symbol-observable', 'effector'],
      plugins: [plugins.resolve, plugins.babel, plugins.terser, plugins.sizeSnapshot]
    });
    await build.write(output);
  };

  async function umd() {
    const plugins = getPlugins(name, 'umd'); //$off

    const build = await (0, _rollup.rollup)({
      input: String((0, _utils.dir)(`packages/${name}/index.js`)),
      plugins: [plugins.resolve, plugins.babel, plugins.replace, plugins.commonjs, plugins.terser, plugins.sizeSnapshot],
      external: ['vue', 'effector']
    });
    await build.write({
      file: (0, _utils.dir)(`npm/${name}/${name}.bundle.js`),
      format: 'iife',
      name: 'effectorVue',
      sourcemap: true
    });
  }

  await Promise.all([run({
    file: (0, _utils.dir)(`npm/${name}/${name}.cjs.js`),
    format: 'cjs',
    name,
    sourcemap: true,
    sourcemapPathTransform: (0, _utils.getSourcemapPathTransform)(name)
  }), run({
    file: (0, _utils.dir)(`npm/${name}/${name}.es.js`),
    format: 'es',
    name,
    sourcemap: true,
    sourcemapPathTransform: (0, _utils.getSourcemapPathTransform)(name)
  }), umd()]);
}
},{"./utils":"FO+Z"}],"WuXe":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const maintainers = [{
  name: 'Zero Bias',
  email: 'ribkatt@gmail.com'
}, {
  name: 'goodmind',
  email: 'andwebar@gmail.com'
}];
const version = {
  effector: '0.18.0-rc.2',
  'effector-react': '0.18.0-rc.2',
  'effector-vue': '0.18.0-rc.2',
  'bs-effector': '0.18.0-rc.2',
  'bs-effector-react': '0.18.0-rc.2'
};

const getFiles = name => ['README.md', 'LICENSE', `${name}.es.js`, `${name}.cjs.js`, `${name}.es.js.map`, `${name}.cjs.js.map`, `${name}.cjs.js.flow`, `${name}.es.js.flow`, 'index.d.ts', 'index.js.flow'];

var _default = {
  effector: {
    name: 'effector',
    version: version['effector'],
    description: 'Reactive state manager',
    main: 'effector.cjs.js',
    module: 'effector.es.js',
    'jsnext:main': 'effector.es.js',
    typings: 'index.d.ts',
    scripts: {},
    author: 'Zero Bias',
    license: 'MIT',
    devDependencies: {},
    dependencies: {
      'symbol-observable': '^1.2.0'
    },
    maintainers,
    sideEffects: false,
    files: getFiles('effector'),
    repository: 'https://github.com/zerobias/effector',
    homepage: 'https://zerobias.github.io/effector/',
    engines: {
      node: '>=6.0.0'
    },
    bugs: 'https://github.com/zerobias/effector/issues',
    keywords: ['data', 'datastructure', 'functional', 'collection', 'state', 'store', 'reactive', 'streams', 'actions', 'effects', 'redux']
  },
  'effector-react': {
    name: 'effector-react',
    version: version['effector-react'],
    description: 'React bindings for effector',
    main: 'effector-react.cjs.js',
    module: 'effector-react.es.js',
    'jsnext:main': 'effector-react.es.js',
    typings: 'index.d.ts',
    scripts: {},
    author: 'Zero Bias',
    license: 'MIT',
    devDependencies: {},
    dependencies: {
      effector: '^0.18.0-rc.2'
    },
    peerDependencies: {
      react: '*'
    },
    maintainers,
    sideEffects: false,
    files: getFiles('effector-react'),
    repository: 'https://github.com/zerobias/effector',
    homepage: 'https://zerobias.github.io/effector/',
    engines: {
      node: '>=6.0.0'
    },
    bugs: 'https://github.com/zerobias/effector/issues',
    keywords: ['data', 'datastructure', 'functional', 'collection', 'state', 'store', 'reactive', 'streams', 'actions', 'effects', 'redux', 'react']
  },
  'effector-vue': {
    name: 'effector-vue',
    version: version['effector-vue'],
    description: 'Vue bindings for effector',
    main: 'effector-vue.cjs.js',
    module: 'effector-vue.es.js',
    'jsnext:main': 'effector-vue.es.js',
    typings: 'index.d.ts',
    scripts: {},
    author: 'Zero Bias',
    license: 'MIT',
    devDependencies: {},
    dependencies: {
      effector: '^0.18.0-rc.2'
    },
    peerDependencies: {
      vue: '*'
    },
    maintainers,
    sideEffects: false,
    files: getFiles('effector-vue'),
    repository: 'https://github.com/zerobias/effector',
    homepage: 'https://zerobias.github.io/effector/',
    engines: {
      node: '>=6.0.0'
    },
    bugs: 'https://github.com/zerobias/effector/issues',
    keywords: ['data', 'datastructure', 'functional', 'collection', 'state', 'store', 'reactive', 'streams', 'actions', 'effects', 'redux', 'vue']
  },
  'bs-effector': {
    name: 'bs-effector',
    version: version['bs-effector'],
    description: 'Reason bindings for effector',
    author: 'Zero Bias',
    license: 'MIT',
    devDependencies: {},
    dependencies: {},
    peerDependencies: {
      effector: '*'
    },
    maintainers,
    files: ['src/', 'bsconfig.json'],
    keywords: ['bucklescript', 'reason', 'bsb', 'data', 'datastructure', 'functional', 'collection', 'state', 'store', 'reactive', 'streams', 'actions', 'effects', 'redux'],
    repository: 'https://github.com/zerobias/effector',
    bugs: 'https://github.com/zerobias/effector/issues'
  },
  'bs-effector-react': {
    name: 'bs-effector-react',
    version: version['bs-effector-react'],
    description: 'Reason bindings for effector-react',
    author: 'Zero Bias',
    license: 'MIT',
    devDependencies: {},
    dependencies: {
      effector: '*'
    },
    peerDependencies: {
      'reason-react': '*'
    },
    maintainers,
    files: ['src/', 'bsconfig.json'],
    keywords: ['bucklescript', 'reason', 'bsb', 'data', 'datastructure', 'functional', 'collection', 'state', 'store', 'reactive', 'streams', 'actions', 'effects', 'redux', 'react'],
    repository: 'https://github.com/zerobias/effector',
    bugs: 'https://github.com/zerobias/effector/issues'
  }
};
exports.default = _default;
},{}],"Exye":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  'bs-effector': {
    name: 'bs-effector',
    sources: {
      dir: 'src',
      subdirs: true
    },
    'bsc-flags': ['-bs-no-version-header', '-bs-g'],
    reason: {
      'react-jsx': 2
    },
    'bs-dev-dependencies': [],
    namespace: true,
    refmt: 3
  },
  'bs-effector-react': {
    name: 'bs-effector-react',
    sources: {
      dir: 'src',
      subdirs: true
    },
    'bs-dependencies': ['bs-effector', 'reason-react'],
    'bsc-flags': ['-bs-no-version-header', '-bs-g'],
    reason: {
      'react-jsx': 2
    },
    'bs-dev-dependencies': [],
    namespace: true,
    refmt: 3
  }
};
exports.default = _default;
},{}],"J5sa":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var fs = _interopRequireWildcard(require("fs-extra"));

var _execa = _interopRequireDefault(require("execa"));

var _rollup = require("./rollup");

var _packages = _interopRequireDefault(require("./packages.config"));

var _bsconfigs = _interopRequireDefault(require("./bsconfigs.config"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

//$todo
const publishScript = name => async () => {
  const args = process.argv.slice(2);
  if (args.length < 2) return;
  const command = args.shift();
  const argument = args.shift();

  if (command === 'publish') {
    if (argument === 'next') {
      const {
        stdout,
        stderr
      } = await (0, _execa.default)('npm', ['publish', '--tag', 'next'], {
        cwd: `${process.cwd()}/npm/${name}`
      });
      console.log(stdout);
      console.error(stderr);
    } else if (argument === 'latest') {
      const {
        stdout,
        stderr
      } = await (0, _execa.default)('npm', ['publish', '--tag', 'latest'], {
        cwd: `${process.cwd()}/npm/${name}`
      });
      console.log(stdout);
      console.error(stderr);
    }
  }
};

var _default = (0, _utils.taskList)({
  tasks: {
    effector: [() => (0, _utils.outputPackageJSON)('packages/effector/package.json', _packages.default.effector), () => (0, _utils.massCopy)('.', 'npm/effector', ['LICENSE', 'README.md']), () => (0, _utils.massCopy)('packages/effector', 'npm/effector', ['index.d.ts', 'package.json', ['index.js.flow', ['index.js.flow', 'effector.cjs.js.flow', 'effector.es.js.flow', 'effector.bundle.js.flow']]]), _rollup.rollupEffector, publishScript('effector')],
    'effector-react': [() => (0, _utils.outputPackageJSON)('packages/effector-react/package.json', _packages.default['effector-react']), () => (0, _utils.massCopy)('.', 'npm/effector-react', ['LICENSE']), () => (0, _utils.massCopy)('packages/effector-react', 'npm/effector-react', ['index.d.ts', 'README.md', 'package.json', ['index.js.flow', ['index.js.flow', 'effector-react.cjs.js.flow', 'effector-react.es.js.flow', 'effector-react.bundle.js.flow']]]), _rollup.rollupEffectorReact, publishScript('effector-react')],
    'effector-vue': [() => (0, _utils.outputPackageJSON)('packages/effector-vue/package.json', _packages.default['effector-vue']), () => (0, _utils.massCopy)('.', 'npm/effector-vue', ['LICENSE']), () => (0, _utils.massCopy)('packages/effector-vue', 'npm/effector-vue', ['index.d.ts', 'README.md', 'package.json', ['index.js.flow', ['index.js.flow', 'effector-vue.cjs.js.flow', 'effector-vue.es.js.flow', 'effector-vue.bundle.js.flow']]]), _rollup.rollupEffectorVue, publishScript('effector-vue')],
    'bs-effector': [() => (0, _utils.outputPackageJSON)('packages/bs-effector/package.json', _packages.default['bs-effector']), () => fs.outputJSON('packages/bs-effector/bsconfig.json', _bsconfigs.default['bs-effector'], {
      spaces: 2
    }), () => (0, _utils.massCopy)('.', 'npm/bs-effector', ['LICENSE']), () => (0, _utils.massCopy)('packages/bs-effector', 'npm/bs-effector', ['README.md', 'package.json', 'bsconfig.json', 'src/Effector.re']), publishScript('bs-effector')],
    'bs-effector-react': [() => (0, _utils.outputPackageJSON)('packages/bs-effector-react/package.json', _packages.default['bs-effector-react']), () => fs.outputJSON('packages/bs-effector-react/bsconfig.json', _bsconfigs.default['bs-effector-react'], {
      spaces: 2
    }), () => (0, _utils.massCopy)('.', 'npm/bs-effector-react', ['LICENSE']), () => (0, _utils.massCopy)('packages/bs-effector-react', 'npm/bs-effector-react', ['README.md', 'package.json', 'bsconfig.json', 'src/EffectorReact.re']), publishScript('bs-effector-react')]
  },
  hooks: {
    beforeAll: [() => fs.emptyDir(`${process.cwd()}/npm`)]
  }
});

exports.default = _default;
},{"./rollup":"OiEt","./packages.config":"WuXe","./bsconfigs.config":"Exye","./utils":"FO+Z"}]},{},["J5sa"], null)