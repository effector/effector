import {readFile} from 'fs/promises'
import babelPlugin from '../babel-plugin'
import {join} from 'path'
import {parseAsync, transformAsync, traverse} from '@babel/core'
import generate from '@babel/generator'
import {modifyFile} from '../hmr'

async function transformHMR(caseId) {
  const code = await readFile(
    join(__dirname, `./fixtures/hmr/${caseId}.js`),
    'utf-8',
  )

  const ast = await parseAsync(code)

  traverse(ast, {
    enter(path) {
      modifyFile(path)
    },
  })

  return generate(ast).code
}

async function transformPlugin(caseId) {
  const code = await readFile(
    join(__dirname, `./fixtures/hmr/${caseId}.js`),
    'utf-8',
  )

  return transformAsync(code, {
    plugins: [[babelPlugin, {addNames: false, addLoc: false, hmr: true}]],
  }).then(({code}) => code)
}

describe('hmr babel', () => {
  describe('independent hmr modify', () => {
    test('effector code at root', async () => {
      expect(await transformHMR(1)).toMatchInlineSnapshot(`
        "import { createEvent, createStore, sample, withRegion, createNode, clearNode } from 'effector';
        let _internalHMRRegion = createNode();
        let $count;
        let increment;
        let decrement;
        withRegion(_internalHMRRegion, () => {
          $count = createStore(0);
          increment = createEvent();
          decrement = createEvent();
          sample({
            clock: increment,
            source: $count,
            fn: count => count + 1,
            target: $count
          });
          sample({
            clock: decrement,
            source: $count,
            fn: count => count - 1,
            target: $count
          });
        });
        let _internalHmrApi;
        try {
          _internalHmrApi = eval(\\"import.meta.hot ?? import.meta.webpackHot ?? module.hot\\");
        } catch {
          throw '[Effector HMR] Fatal error. Current environment doesn\\\\'t support HMR API';
        }
        if (_internalHmrApi) {
          _internalHmrApi.dispose(() => clearNode(_internalHMRRegion););
        }"
      `)
    })

    test('effector code in incorrect uncalled fabric', async () => {
      expect(await transformHMR(2)).toMatchInlineSnapshot(`
        "import { createEvent, createStore, sample } from 'effector';
        function incorrect() {
          const $count = createStore(0);
          const increment = createEvent();
          const decrement = createEvent();
          sample({
            clock: increment,
            source: $count,
            fn: count => count + 1,
            target: $count
          });
          sample({
            clock: decrement,
            source: $count,
            fn: count => count - 1,
            target: $count
          });
        }"
      `)
    })

    test('effector code in incorrect called fabric', async () => {
      expect(await transformHMR(3)).toMatchInlineSnapshot(`
        "import { createEvent, createStore, sample } from 'effector';
        function incorrect() {
          const $count = createStore(0);
          const increment = createEvent();
          const decrement = createEvent();
          sample({
            clock: increment,
            source: $count,
            fn: count => count + 1,
            target: $count
          });
          sample({
            clock: decrement,
            source: $count,
            fn: count => count - 1,
            target: $count
          });
        }
        const model = incorrect();"
      `)
    })

    test('effector code in correct uncalled fabric', async () => {
      expect(await transformHMR(4)).toMatchInlineSnapshot(`
        "import { createEvent, createStore, sample } from \\"effector\\";
        import { createFactory } from \\"@withease/factories\\";
        const correct = createFactory(() => {
          const $count = createStore(0);
          const increment = createEvent();
          const decrement = createEvent();
          sample({
            clock: increment,
            source: $count,
            fn: count => count + 1,
            target: $count
          });
          sample({
            clock: decrement,
            source: $count,
            fn: count => count - 1,
            target: $count
          });
        });"
      `)
    })

    test('effector code at corrent called fabric', async () => {
      expect(await transformHMR(5)).toMatchInlineSnapshot(`
        "import { createEvent, createStore, sample, withRegion, createNode, clearNode } from \\"effector\\";
        import { createFactory, invoke } from \\"@withease/factories\\";
        let _internalHMRRegion = createNode();
        let model;
        withRegion(_internalHMRRegion, () => {
          model = invoke(correct);
        });
        const correct = createFactory(() => {
          const $count = createStore(0);
          const increment = createEvent();
          const decrement = createEvent();
          sample({
            clock: increment,
            source: $count,
            fn: count => count + 1,
            target: $count
          });
          sample({
            clock: decrement,
            source: $count,
            fn: count => count - 1,
            target: $count
          });
        });
        let _internalHmrApi;
        try {
          _internalHmrApi = eval(\\"import.meta.hot ?? import.meta.webpackHot ?? module.hot\\");
        } catch {
          throw '[Effector HMR] Fatal error. Current environment doesn\\\\'t support HMR API';
        }
        if (_internalHmrApi) {
          _internalHmrApi.dispose(() => clearNode(_internalHMRRegion););
        }"
      `)
    })

    test('effector code at corrent called fabric (callback in invoke)', async () => {
      expect(await transformHMR(5.1)).toMatchInlineSnapshot(`
        "import { createEvent, createStore, sample, withRegion, createNode, clearNode } from \\"effector\\";
        import { createFactory, invoke } from \\"@withease/factories\\";
        let _internalHMRRegion = createNode();
        let model;
        withRegion(_internalHMRRegion, () => {
          model = invoke(() => correct());
        });
        const correct = createFactory(() => {
          const $count = createStore(0);
          const increment = createEvent();
          const decrement = createEvent();
          sample({
            clock: increment,
            source: $count,
            fn: count => count + 1,
            target: $count
          });
          sample({
            clock: decrement,
            source: $count,
            fn: count => count - 1,
            target: $count
          });
        });
        let _internalHmrApi;
        try {
          _internalHmrApi = eval(\\"import.meta.hot ?? import.meta.webpackHot ?? module.hot\\");
        } catch {
          throw '[Effector HMR] Fatal error. Current environment doesn\\\\'t support HMR API';
        }
        if (_internalHmrApi) {
          _internalHmrApi.dispose(() => clearNode(_internalHMRRegion););
        }"
      `)
    })

    test('effector code at root & incorrect uncalled fabric in same file', async () => {
      expect(await transformHMR(6)).toMatchInlineSnapshot(`
        "import { createEvent, createStore, sample, withRegion, createNode, clearNode } from \\"effector\\";
        let _internalHMRRegion = createNode();
        let $rcount;
        let rincrement;
        let rdecrement;
        withRegion(_internalHMRRegion, () => {
          $rcount = createStore(0);
          rincrement = createEvent();
          rdecrement = createEvent();
          sample({
            clock: rincrement,
            source: $rcount,
            fn: count => count + 1,
            target: $rcount
          });
          sample({
            clock: rdecrement,
            source: $rcount,
            fn: count => count - 1,
            target: $rcount
          });
        });
        function incorrect() {
          const $count = createStore(0);
          const increment = createEvent();
          const decrement = createEvent();
          sample({
            clock: increment,
            source: $count,
            fn: count => count + 1,
            target: $count
          });
          sample({
            clock: decrement,
            source: $count,
            fn: count => count - 1,
            target: $count
          });
        }
        let _internalHmrApi;
        try {
          _internalHmrApi = eval(\\"import.meta.hot ?? import.meta.webpackHot ?? module.hot\\");
        } catch {
          throw '[Effector HMR] Fatal error. Current environment doesn\\\\'t support HMR API';
        }
        if (_internalHmrApi) {
          _internalHmrApi.dispose(() => clearNode(_internalHMRRegion););
        }"
      `)
    })

    test('effector code at root & incorrect called fabric in same file', async () => {
      expect(await transformHMR(7)).toMatchInlineSnapshot(`
        "import { createEvent, createStore, sample, withRegion, createNode, clearNode } from \\"effector\\";
        let _internalHMRRegion = createNode();
        let $rcount;
        let rincrement;
        let rdecrement;
        withRegion(_internalHMRRegion, () => {
          $rcount = createStore(0);
          rincrement = createEvent();
          rdecrement = createEvent();
          sample({
            clock: rincrement,
            source: $rcount,
            fn: count => count + 1,
            target: $rcount
          });
          sample({
            clock: rdecrement,
            source: $rcount,
            fn: count => count - 1,
            target: $rcount
          });
        });
        function incorrect() {
          const $count = createStore(0);
          const increment = createEvent();
          const decrement = createEvent();
          sample({
            clock: increment,
            source: $count,
            fn: count => count + 1,
            target: $count
          });
          sample({
            clock: decrement,
            source: $count,
            fn: count => count - 1,
            target: $count
          });
        }
        const model = incorrect();
        let _internalHmrApi;
        try {
          _internalHmrApi = eval(\\"import.meta.hot ?? import.meta.webpackHot ?? module.hot\\");
        } catch {
          throw '[Effector HMR] Fatal error. Current environment doesn\\\\'t support HMR API';
        }
        if (_internalHmrApi) {
          _internalHmrApi.dispose(() => clearNode(_internalHMRRegion););
        }"
      `)
    })

    test('effector code at root & correct uncalled fabric in same file', async () => {
      expect(await transformHMR(8)).toMatchInlineSnapshot(`
        "import { createFactory } from \\"@withease/factories\\";
        import { createEvent, createStore, sample, withRegion, createNode, clearNode } from \\"effector\\";
        let _internalHMRRegion = createNode();
        let $rcount;
        let rincrement;
        let rdecrement;
        withRegion(_internalHMRRegion, () => {
          $rcount = createStore(0);
          rincrement = createEvent();
          rdecrement = createEvent();
          sample({
            clock: rincrement,
            source: $rcount,
            fn: count => count + 1,
            target: $rcount
          });
          sample({
            clock: rdecrement,
            source: $rcount,
            fn: count => count - 1,
            target: $rcount
          });
        });
        const correct = createFactory(() => {
          const $count = createStore(0);
          const increment = createEvent();
          const decrement = createEvent();
          sample({
            clock: increment,
            source: $count,
            fn: count => count + 1,
            target: $count
          });
          sample({
            clock: decrement,
            source: $count,
            fn: count => count - 1,
            target: $count
          });
        });
        let _internalHmrApi;
        try {
          _internalHmrApi = eval(\\"import.meta.hot ?? import.meta.webpackHot ?? module.hot\\");
        } catch {
          throw '[Effector HMR] Fatal error. Current environment doesn\\\\'t support HMR API';
        }
        if (_internalHmrApi) {
          _internalHmrApi.dispose(() => clearNode(_internalHMRRegion););
        }"
      `)
    })

    test('effector code at root & correct called fabric in same file', async () => {
      expect(await transformHMR(9)).toMatchInlineSnapshot(`
        "import { createFactory, invoke } from \\"@withease/factories\\";
        import { createEvent, createStore, sample, withRegion, createNode, clearNode } from \\"effector\\";
        let _internalHMRRegion = createNode();
        let $rcount;
        let rincrement;
        let rdecrement;
        let model;
        withRegion(_internalHMRRegion, () => {
          $rcount = createStore(0);
          rincrement = createEvent();
          rdecrement = createEvent();
          sample({
            clock: rincrement,
            source: $rcount,
            fn: count => count + 1,
            target: $rcount
          });
          sample({
            clock: rdecrement,
            source: $rcount,
            fn: count => count - 1,
            target: $rcount
          });
          model = invoke(correct);
        });
        const correct = createFactory(() => {
          const $count = createStore(0);
          const increment = createEvent();
          const decrement = createEvent();
          sample({
            clock: increment,
            source: $count,
            fn: count => count + 1,
            target: $count
          });
          sample({
            clock: decrement,
            source: $count,
            fn: count => count - 1,
            target: $count
          });
        });
        let _internalHmrApi;
        try {
          _internalHmrApi = eval(\\"import.meta.hot ?? import.meta.webpackHot ?? module.hot\\");
        } catch {
          throw '[Effector HMR] Fatal error. Current environment doesn\\\\'t support HMR API';
        }
        if (_internalHmrApi) {
          _internalHmrApi.dispose(() => clearNode(_internalHMRRegion););
        }"
      `)
    })

    test('effector code at root & correct called fabric in same file (callback in invoke)', async () => {
      expect(await transformHMR(9.1)).toMatchInlineSnapshot(`
        "import { createFactory, invoke } from \\"@withease/factories\\";
        import { createEvent, createStore, sample, withRegion, createNode, clearNode } from \\"effector\\";
        let _internalHMRRegion = createNode();
        let $rcount;
        let rincrement;
        let rdecrement;
        let model;
        withRegion(_internalHMRRegion, () => {
          $rcount = createStore(0);
          rincrement = createEvent();
          rdecrement = createEvent();
          sample({
            clock: rincrement,
            source: $rcount,
            fn: count => count + 1,
            target: $rcount
          });
          sample({
            clock: rdecrement,
            source: $rcount,
            fn: count => count - 1,
            target: $rcount
          });
          model = invoke(() => correct());
        });
        const correct = createFactory(() => {
          const $count = createStore(0);
          const increment = createEvent();
          const decrement = createEvent();
          sample({
            clock: increment,
            source: $count,
            fn: count => count + 1,
            target: $count
          });
          sample({
            clock: decrement,
            source: $count,
            fn: count => count - 1,
            target: $count
          });
        });
        let _internalHmrApi;
        try {
          _internalHmrApi = eval(\\"import.meta.hot ?? import.meta.webpackHot ?? module.hot\\");
        } catch {
          throw '[Effector HMR] Fatal error. Current environment doesn\\\\'t support HMR API';
        }
        if (_internalHmrApi) {
          _internalHmrApi.dispose(() => clearNode(_internalHMRRegion););
        }"
      `)
    })

    test('effector code at root & sample variable', async () => {
      expect(await transformHMR(10)).toMatchInlineSnapshot(`
        "import { createEvent, createStore, sample, withRegion, createNode, clearNode } from 'effector';
        let _internalHMRRegion = createNode();
        let $count;
        let increment;
        let decrement;
        let $store;
        withRegion(_internalHMRRegion, () => {
          $count = createStore(0);
          increment = createEvent();
          decrement = createEvent();
          sample({
            clock: increment,
            source: $count,
            fn: count => count + 1,
            target: $count
          });
          sample({
            clock: decrement,
            source: $count,
            fn: count => count - 1,
            target: $count
          });
          $store = sample({
            clock: $count
          });
        });
        let _internalHmrApi;
        try {
          _internalHmrApi = eval(\\"import.meta.hot ?? import.meta.webpackHot ?? module.hot\\");
        } catch {
          throw '[Effector HMR] Fatal error. Current environment doesn\\\\'t support HMR API';
        }
        if (_internalHmrApi) {
          _internalHmrApi.dispose(() => clearNode(_internalHMRRegion););
        }"
      `)
    })
  })

  describe('babel plugin intergation', () => {
    test('effector code at root', async () => {
      expect(await transformPlugin(1)).toMatchInlineSnapshot(`
        "\\"use strict\\";

        var _effector = require(\\"effector\\");
        let _internalHMRRegion = (0, _effector.createNode)();
        let $count;
        let increment;
        let decrement;
        (0, _effector.withRegion)(_internalHMRRegion, () => {
          $count = (0, _effector.createStore)(0, {
            sid: \\"-z0wt8e\\"
          });
          increment = (0, _effector.createEvent)({
            sid: \\"978m4i\\"
          });
          decrement = (0, _effector.createEvent)({
            sid: \\"-lof7sr\\"
          });
          (0, _effector.sample)({
            and: [{
              clock: increment,
              source: $count,
              fn: count => count + 1,
              target: $count
            }],
            or: {
              sid: \\"-arnael\\"
            }
          });
          (0, _effector.sample)({
            and: [{
              clock: decrement,
              source: $count,
              fn: count => count - 1,
              target: $count
            }],
            or: {
              sid: \\"imu8o9\\"
            }
          });
        });
        let _internalHmrApi;
        try {
          _internalHmrApi = eval(\\"import.meta.hot ?? import.meta.webpackHot ?? module.hot\\");
        } catch {
          throw '[Effector HMR] Fatal error. Current environment doesn\\\\'t support HMR API';
        }
        if (_internalHmrApi) {
          _internalHmrApi.dispose(() => (0, _effector.clearNode)(_internalHMRRegion););
        }"
      `)
    })

    test('effector code in incorrect uncalled fabric', async () => {
      expect(await transformPlugin(2)).toMatchInlineSnapshot(`
        "\\"use strict\\";

        var _effector = require(\\"effector\\");
        function incorrect() {
          const $count = (0, _effector.createStore)(0, {
            sid: \\"-yjv6sh\\"
          });
          const increment = (0, _effector.createEvent)({
            sid: \\"9oa92i\\"
          });
          const decrement = (0, _effector.createEvent)({
            sid: \\"-l7dkur\\"
          });
          (0, _effector.sample)({
            and: [{
              clock: increment,
              source: $count,
              fn: count => count + 1,
              target: $count
            }],
            or: {
              sid: \\"-ar3hri\\"
            }
          });
          (0, _effector.sample)({
            and: [{
              clock: decrement,
              source: $count,
              fn: count => count - 1,
              target: $count
            }],
            or: {
              sid: \\"ine1bc\\"
            }
          });
        }"
      `)
    })

    test('effector code in incorrect called fabric', async () => {
      expect(await transformPlugin(3)).toMatchInlineSnapshot(`
        "\\"use strict\\";

        var _effector = require(\\"effector\\");
        function incorrect() {
          const $count = (0, _effector.createStore)(0, {
            sid: \\"-yjv6sh\\"
          });
          const increment = (0, _effector.createEvent)({
            sid: \\"9oa92i\\"
          });
          const decrement = (0, _effector.createEvent)({
            sid: \\"-l7dkur\\"
          });
          (0, _effector.sample)({
            and: [{
              clock: increment,
              source: $count,
              fn: count => count + 1,
              target: $count
            }],
            or: {
              sid: \\"-ar3hri\\"
            }
          });
          (0, _effector.sample)({
            and: [{
              clock: decrement,
              source: $count,
              fn: count => count - 1,
              target: $count
            }],
            or: {
              sid: \\"ine1bc\\"
            }
          });
        }
        const model = incorrect();"
      `)
    })

    test('effector code in correct uncalled fabric', async () => {
      expect(await transformPlugin(4)).toMatchInlineSnapshot(`
        "\\"use strict\\";

        var _effector = require(\\"effector\\");
        var _factories = require(\\"@withease/factories\\");
        const correct = (0, _effector.withFactory)({
          sid: \\"-gflem9\\",
          fn: () => (0, _factories.createFactory)(() => {
            const $count = (0, _effector.createStore)(0, {
              sid: \\"-y2tkea\\"
            });
            const increment = (0, _effector.createEvent)({
              sid: \\"a5bvgp\\"
            });
            const decrement = (0, _effector.createEvent)({
              sid: \\"-kqbygk\\"
            });
            (0, _effector.sample)({
              and: [{
                clock: increment,
                source: $count,
                fn: count => count + 1,
                target: $count
              }],
              or: {
                sid: \\"-aqjp65\\"
              }
            });
            (0, _effector.sample)({
              and: [{
                clock: decrement,
                source: $count,
                fn: count => count - 1,
                target: $count
              }],
              or: {
                sid: \\"inxtwp\\"
              }
            });
          })
        });"
      `)
    })

    test('effector code at corrent called fabric', async () => {
      expect(await transformPlugin(5)).toMatchInlineSnapshot(`
        "\\"use strict\\";

        var _effector = require(\\"effector\\");
        var _factories = require(\\"@withease/factories\\");
        let _internalHMRRegion = (0, _effector.createNode)();
        let model;
        (0, _effector.withRegion)(_internalHMRRegion, () => {
          model = (0, _effector.withFactory)({
            sid: \\"-qbyui2\\",
            fn: () => (0, _factories.invoke)(correct)
          });
        });
        const correct = (0, _effector.withFactory)({
          sid: \\"-gflem9\\",
          fn: () => (0, _factories.createFactory)(() => {
            const $count = (0, _effector.createStore)(0, {
              sid: \\"-y2tkea\\"
            });
            const increment = (0, _effector.createEvent)({
              sid: \\"a5bvgp\\"
            });
            const decrement = (0, _effector.createEvent)({
              sid: \\"-kqbygk\\"
            });
            (0, _effector.sample)({
              and: [{
                clock: increment,
                source: $count,
                fn: count => count + 1,
                target: $count
              }],
              or: {
                sid: \\"-aqjp65\\"
              }
            });
            (0, _effector.sample)({
              and: [{
                clock: decrement,
                source: $count,
                fn: count => count - 1,
                target: $count
              }],
              or: {
                sid: \\"inxtwp\\"
              }
            });
          })
        });
        let _internalHmrApi;
        try {
          _internalHmrApi = eval(\\"import.meta.hot ?? import.meta.webpackHot ?? module.hot\\");
        } catch {
          throw '[Effector HMR] Fatal error. Current environment doesn\\\\'t support HMR API';
        }
        if (_internalHmrApi) {
          _internalHmrApi.dispose(() => (0, _effector.clearNode)(_internalHMRRegion););
        }"
      `)
    })

    test('effector code at corrent called fabric (callback in invoke)', async () => {
      expect(await transformPlugin(5.1)).toMatchInlineSnapshot(`
        "\\"use strict\\";

        var _effector = require(\\"effector\\");
        var _factories = require(\\"@withease/factories\\");
        let _internalHMRRegion = (0, _effector.createNode)();
        let model;
        (0, _effector.withRegion)(_internalHMRRegion, () => {
          model = (0, _effector.withFactory)({
            sid: \\"-qbyui2\\",
            fn: () => (0, _factories.invoke)(() => correct())
          });
        });
        const correct = (0, _effector.withFactory)({
          sid: \\"-gflem9\\",
          fn: () => (0, _factories.createFactory)(() => {
            const $count = (0, _effector.createStore)(0, {
              sid: \\"-y2tkea\\"
            });
            const increment = (0, _effector.createEvent)({
              sid: \\"a5bvgp\\"
            });
            const decrement = (0, _effector.createEvent)({
              sid: \\"-kqbygk\\"
            });
            (0, _effector.sample)({
              and: [{
                clock: increment,
                source: $count,
                fn: count => count + 1,
                target: $count
              }],
              or: {
                sid: \\"-aqjp65\\"
              }
            });
            (0, _effector.sample)({
              and: [{
                clock: decrement,
                source: $count,
                fn: count => count - 1,
                target: $count
              }],
              or: {
                sid: \\"inxtwp\\"
              }
            });
          })
        });
        let _internalHmrApi;
        try {
          _internalHmrApi = eval(\\"import.meta.hot ?? import.meta.webpackHot ?? module.hot\\");
        } catch {
          throw '[Effector HMR] Fatal error. Current environment doesn\\\\'t support HMR API';
        }
        if (_internalHmrApi) {
          _internalHmrApi.dispose(() => (0, _effector.clearNode)(_internalHMRRegion););
        }"
      `)
    })

    test('effector code at root & incorrect uncalled fabric in same file', async () => {
      expect(await transformPlugin(6)).toMatchInlineSnapshot(`
        "\\"use strict\\";

        var _effector = require(\\"effector\\");
        let _internalHMRRegion = (0, _effector.createNode)();
        let $rcount;
        let rincrement;
        let rdecrement;
        (0, _effector.withRegion)(_internalHMRRegion, () => {
          $rcount = (0, _effector.createStore)(0, {
            sid: \\"-54x7wp\\"
          });
          rincrement = (0, _effector.createEvent)({
            sid: \\"-3ch5ox\\"
          });
          rdecrement = (0, _effector.createEvent)({
            sid: \\"-y84zm6\\"
          });
          (0, _effector.sample)({
            and: [{
              clock: rincrement,
              source: $rcount,
              fn: count => count + 1,
              target: $rcount
            }],
            or: {
              sid: \\"-arnael\\"
            }
          });
          (0, _effector.sample)({
            and: [{
              clock: rdecrement,
              source: $rcount,
              fn: count => count - 1,
              target: $rcount
            }],
            or: {
              sid: \\"imu8o9\\"
            }
          });
        });
        function incorrect() {
          const $count = (0, _effector.createStore)(0, {
            sid: \\"-vzebwt\\"
          });
          const increment = (0, _effector.createEvent)({
            sid: \\"-or7utm\\"
          });
          const decrement = (0, _effector.createEvent)({
            sid: \\"-1siimn\\"
          });
          (0, _effector.sample)({
            and: [{
              clock: increment,
              source: $count,
              fn: count => count + 1,
              target: $count
            }],
            or: {
              sid: \\"j4zgaw\\"
            }
          });
          (0, _effector.sample)({
            and: [{
              clock: decrement,
              source: $count,
              fn: count => count - 1,
              target: $count
            }],
            or: {
              sid: \\"jkdox0\\"
            }
          });
        }
        let _internalHmrApi;
        try {
          _internalHmrApi = eval(\\"import.meta.hot ?? import.meta.webpackHot ?? module.hot\\");
        } catch {
          throw '[Effector HMR] Fatal error. Current environment doesn\\\\'t support HMR API';
        }
        if (_internalHmrApi) {
          _internalHmrApi.dispose(() => (0, _effector.clearNode)(_internalHMRRegion););
        }"
      `)
    })

    test('effector code at root & incorrect called fabric in same file', async () => {
      expect(await transformPlugin(7)).toMatchInlineSnapshot(`
        "\\"use strict\\";

        var _effector = require(\\"effector\\");
        let _internalHMRRegion = (0, _effector.createNode)();
        let $rcount;
        let rincrement;
        let rdecrement;
        (0, _effector.withRegion)(_internalHMRRegion, () => {
          $rcount = (0, _effector.createStore)(0, {
            sid: \\"-54x7wp\\"
          });
          rincrement = (0, _effector.createEvent)({
            sid: \\"-3ch5ox\\"
          });
          rdecrement = (0, _effector.createEvent)({
            sid: \\"-y84zm6\\"
          });
          (0, _effector.sample)({
            and: [{
              clock: rincrement,
              source: $rcount,
              fn: count => count + 1,
              target: $rcount
            }],
            or: {
              sid: \\"-arnael\\"
            }
          });
          (0, _effector.sample)({
            and: [{
              clock: rdecrement,
              source: $rcount,
              fn: count => count - 1,
              target: $rcount
            }],
            or: {
              sid: \\"imu8o9\\"
            }
          });
        });
        function incorrect() {
          const $count = (0, _effector.createStore)(0, {
            sid: \\"-vzebwt\\"
          });
          const increment = (0, _effector.createEvent)({
            sid: \\"-or7utm\\"
          });
          const decrement = (0, _effector.createEvent)({
            sid: \\"-1siimn\\"
          });
          (0, _effector.sample)({
            and: [{
              clock: increment,
              source: $count,
              fn: count => count + 1,
              target: $count
            }],
            or: {
              sid: \\"j4zgaw\\"
            }
          });
          (0, _effector.sample)({
            and: [{
              clock: decrement,
              source: $count,
              fn: count => count - 1,
              target: $count
            }],
            or: {
              sid: \\"jkdox0\\"
            }
          });
        }
        const model = incorrect();
        let _internalHmrApi;
        try {
          _internalHmrApi = eval(\\"import.meta.hot ?? import.meta.webpackHot ?? module.hot\\");
        } catch {
          throw '[Effector HMR] Fatal error. Current environment doesn\\\\'t support HMR API';
        }
        if (_internalHmrApi) {
          _internalHmrApi.dispose(() => (0, _effector.clearNode)(_internalHMRRegion););
        }"
      `)
    })

    test('effector code at root & correct uncalled fabric in same file', async () => {
      expect(await transformPlugin(8)).toMatchInlineSnapshot(`
        "\\"use strict\\";

        var _effector = require(\\"effector\\");
        var _factories = require(\\"@withease/factories\\");
        let _internalHMRRegion = (0, _effector.createNode)();
        let $rcount;
        let rincrement;
        let rdecrement;
        (0, _effector.withRegion)(_internalHMRRegion, () => {
          $rcount = (0, _effector.createStore)(0, {
            sid: \\"-4nvlii\\"
          });
          rincrement = (0, _effector.createEvent)({
            sid: \\"-2vfjaq\\"
          });
          rdecrement = (0, _effector.createEvent)({
            sid: \\"-xr3d7z\\"
          });
          (0, _effector.sample)({
            and: [{
              clock: rincrement,
              source: $rcount,
              fn: count => count + 1,
              target: $rcount
            }],
            or: {
              sid: \\"-ar3ht8\\"
            }
          });
          (0, _effector.sample)({
            and: [{
              clock: rdecrement,
              source: $rcount,
              fn: count => count - 1,
              target: $rcount
            }],
            or: {
              sid: \\"ine19m\\"
            }
          });
        });
        const correct = (0, _effector.withFactory)({
          sid: \\"wh8kc5\\",
          fn: () => (0, _factories.createFactory)(() => {
            const $count = (0, _effector.createStore)(0, {
              sid: \\"-vicpim\\"
            });
            const increment = (0, _effector.createEvent)({
              sid: \\"-oa68ff\\"
            });
            const decrement = (0, _effector.createEvent)({
              sid: \\"-1bgw8g\\"
            });
            (0, _effector.sample)({
              and: [{
                clock: increment,
                source: $count,
                fn: count => count + 1,
                target: $count
              }],
              or: {
                sid: \\"j5j8w9\\"
              }
            });
            (0, _effector.sample)({
              and: [{
                clock: decrement,
                source: $count,
                fn: count => count - 1,
                target: $count
              }],
              or: {
                sid: \\"jkxhid\\"
              }
            });
          })
        });
        let _internalHmrApi;
        try {
          _internalHmrApi = eval(\\"import.meta.hot ?? import.meta.webpackHot ?? module.hot\\");
        } catch {
          throw '[Effector HMR] Fatal error. Current environment doesn\\\\'t support HMR API';
        }
        if (_internalHmrApi) {
          _internalHmrApi.dispose(() => (0, _effector.clearNode)(_internalHMRRegion););
        }"
      `)
    })

    test('effector code at root & correct called fabric in same file', async () => {
      expect(await transformPlugin(9)).toMatchInlineSnapshot(`
        "\\"use strict\\";

        var _effector = require(\\"effector\\");
        var _factories = require(\\"@withease/factories\\");
        let _internalHMRRegion = (0, _effector.createNode)();
        let $rcount;
        let rincrement;
        let rdecrement;
        let model;
        (0, _effector.withRegion)(_internalHMRRegion, () => {
          $rcount = (0, _effector.createStore)(0, {
            sid: \\"-4nvlii\\"
          });
          rincrement = (0, _effector.createEvent)({
            sid: \\"-2vfjaq\\"
          });
          rdecrement = (0, _effector.createEvent)({
            sid: \\"-xr3d7z\\"
          });
          (0, _effector.sample)({
            and: [{
              clock: rincrement,
              source: $rcount,
              fn: count => count + 1,
              target: $rcount
            }],
            or: {
              sid: \\"-ar3ht8\\"
            }
          });
          (0, _effector.sample)({
            and: [{
              clock: rdecrement,
              source: $rcount,
              fn: count => count - 1,
              target: $rcount
            }],
            or: {
              sid: \\"ine19m\\"
            }
          });
          model = (0, _effector.withFactory)({
            sid: \\"22qh5m\\",
            fn: () => (0, _factories.invoke)(correct)
          });
        });
        const correct = (0, _effector.withFactory)({
          sid: \\"wh8kc5\\",
          fn: () => (0, _factories.createFactory)(() => {
            const $count = (0, _effector.createStore)(0, {
              sid: \\"-vicpim\\"
            });
            const increment = (0, _effector.createEvent)({
              sid: \\"-oa68ff\\"
            });
            const decrement = (0, _effector.createEvent)({
              sid: \\"-1bgw8g\\"
            });
            (0, _effector.sample)({
              and: [{
                clock: increment,
                source: $count,
                fn: count => count + 1,
                target: $count
              }],
              or: {
                sid: \\"j5j8w9\\"
              }
            });
            (0, _effector.sample)({
              and: [{
                clock: decrement,
                source: $count,
                fn: count => count - 1,
                target: $count
              }],
              or: {
                sid: \\"jkxhid\\"
              }
            });
          })
        });
        let _internalHmrApi;
        try {
          _internalHmrApi = eval(\\"import.meta.hot ?? import.meta.webpackHot ?? module.hot\\");
        } catch {
          throw '[Effector HMR] Fatal error. Current environment doesn\\\\'t support HMR API';
        }
        if (_internalHmrApi) {
          _internalHmrApi.dispose(() => (0, _effector.clearNode)(_internalHMRRegion););
        }"
      `)
    })

    test('effector code at root & correct called fabric in same file (callback in invoke)', async () => {
      expect(await transformPlugin(9.1)).toMatchInlineSnapshot(`
        "\\"use strict\\";

        var _effector = require(\\"effector\\");
        var _factories = require(\\"@withease/factories\\");
        let _internalHMRRegion = (0, _effector.createNode)();
        let $rcount;
        let rincrement;
        let rdecrement;
        let model;
        (0, _effector.withRegion)(_internalHMRRegion, () => {
          $rcount = (0, _effector.createStore)(0, {
            sid: \\"-4nvlii\\"
          });
          rincrement = (0, _effector.createEvent)({
            sid: \\"-2vfjaq\\"
          });
          rdecrement = (0, _effector.createEvent)({
            sid: \\"-xr3d7z\\"
          });
          (0, _effector.sample)({
            and: [{
              clock: rincrement,
              source: $rcount,
              fn: count => count + 1,
              target: $rcount
            }],
            or: {
              sid: \\"-ar3ht8\\"
            }
          });
          (0, _effector.sample)({
            and: [{
              clock: rdecrement,
              source: $rcount,
              fn: count => count - 1,
              target: $rcount
            }],
            or: {
              sid: \\"ine19m\\"
            }
          });
          model = (0, _effector.withFactory)({
            sid: \\"22qh5m\\",
            fn: () => (0, _factories.invoke)(() => correct())
          });
        });
        const correct = (0, _effector.withFactory)({
          sid: \\"wh8kc5\\",
          fn: () => (0, _factories.createFactory)(() => {
            const $count = (0, _effector.createStore)(0, {
              sid: \\"-vicpim\\"
            });
            const increment = (0, _effector.createEvent)({
              sid: \\"-oa68ff\\"
            });
            const decrement = (0, _effector.createEvent)({
              sid: \\"-1bgw8g\\"
            });
            (0, _effector.sample)({
              and: [{
                clock: increment,
                source: $count,
                fn: count => count + 1,
                target: $count
              }],
              or: {
                sid: \\"j5j8w9\\"
              }
            });
            (0, _effector.sample)({
              and: [{
                clock: decrement,
                source: $count,
                fn: count => count - 1,
                target: $count
              }],
              or: {
                sid: \\"jkxhid\\"
              }
            });
          })
        });
        let _internalHmrApi;
        try {
          _internalHmrApi = eval(\\"import.meta.hot ?? import.meta.webpackHot ?? module.hot\\");
        } catch {
          throw '[Effector HMR] Fatal error. Current environment doesn\\\\'t support HMR API';
        }
        if (_internalHmrApi) {
          _internalHmrApi.dispose(() => (0, _effector.clearNode)(_internalHMRRegion););
        }"
      `)
    })

    test('effector code at root & sample variable', async () => {
      expect(await transformPlugin(10)).toMatchInlineSnapshot(`
        "\\"use strict\\";

        var _effector = require(\\"effector\\");
        let _internalHMRRegion = (0, _effector.createNode)();
        let $count;
        let increment;
        let decrement;
        let $store;
        (0, _effector.withRegion)(_internalHMRRegion, () => {
          $count = (0, _effector.createStore)(0, {
            sid: \\"-z0wt8e\\"
          });
          increment = (0, _effector.createEvent)({
            sid: \\"978m4i\\"
          });
          decrement = (0, _effector.createEvent)({
            sid: \\"-lof7sr\\"
          });
          (0, _effector.sample)({
            and: [{
              clock: increment,
              source: $count,
              fn: count => count + 1,
              target: $count
            }],
            or: {
              sid: \\"-arnael\\"
            }
          });
          (0, _effector.sample)({
            and: [{
              clock: decrement,
              source: $count,
              fn: count => count - 1,
              target: $count
            }],
            or: {
              sid: \\"imu8o9\\"
            }
          });
          $store = (0, _effector.sample)({
            and: [{
              clock: $count
            }],
            or: {
              sid: \\"wxkf5w\\"
            }
          });
        });
        let _internalHmrApi;
        try {
          _internalHmrApi = eval(\\"import.meta.hot ?? import.meta.webpackHot ?? module.hot\\");
        } catch {
          throw '[Effector HMR] Fatal error. Current environment doesn\\\\'t support HMR API';
        }
        if (_internalHmrApi) {
          _internalHmrApi.dispose(() => (0, _effector.clearNode)(_internalHMRRegion););
        }"
      `)
    })
  })
})
