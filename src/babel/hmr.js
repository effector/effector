/**
 * @import { NodePath } from '@babel/traverse';
 * @import { Program, CallExpression } from '@babel/types;
 */

const REGION_NAME = '_internalHMRRegion';
const DEFAULT_WATCHED_CALLS = [
  'map',
  'filter',
  'filterMap',
  'subscribe',
  'on',
  'watch',
  'reset',
  'prepend'
];

/**
 * @param {NodePath<any>} path
 * @returns {boolean}
 */
function isSupportHMR(path) {
  return !path.findParent((parent) =>
    parent &&
    [
      'FunctionDeclaration',
      'ArrowFunctionExpression',
      'ExportDefaultDeclaration',
      'ClassDeclaration'
    ].includes(parent.node.type)
  );
}

/**
 *
 * @param {Babel} babel
 * @param {NodePath<Program>} path
 * @param {'module' | 'commonjs'} env 
 * @param {string[]} factories 
 * @returns {void}
 */
function transformHmr(babel, path, env, factories) {
  /** @type {Set<string>} */
  const watchedFactories = new Set(DEFAULT_WATCHED_CALLS);

  const buildUnitInit = babel.template(`
    withRegion(${REGION_NAME}, () => %%statement%%)  
  `);
  
  const buildImportSpecifier = (importName) => ({
    type: 'ImportSpecifier',
    local: {
      type: 'Identifier',
      name: importName,
    },
    imported: {
      type: 'Identifier',
      name: importName,
    },
  });

  path.traverse({
    /**
     *
     * @param {NodePath<ImportDeclaration>} call
     * @returns
     */
    ImportDeclaration: declaration => {
      const source = declaration.node.source.value;
      const specifiers = declaration.node.specifiers.map(specifier => specifier.local.name);

      if (!['effector', ...factories].includes(source)) {
        return;
      }

      for (const specifier of specifiers) {
        watchedFactories.add(specifier);
      }

      if (source !== 'effector') {
        return;
      }

      declaration.insertAfter(babel.template.ast(`const _internalHMRRegion = createNode();`));

      for (const specifier of ['withRegion', 'createNode', 'clearNode']) {
        if (specifiers.includes(specifier)) continue;
        declaration.node.specifiers.push(buildImportSpecifier(specifier));
      }
    },
    /**
     *
     * @param {NodePath<CallExpression>} call
     * @returns
     */
    CallExpression: call => {
      const isWatchedFactoryCall = 
        watchedFactories.has(call.node.callee.name) ||
        watchedFactories.has(call.node.callee.property?.name);

      if (!isSupportHMR(call) || !isWatchedFactoryCall) {
        return;
      }

      call.replaceWith(buildUnitInit({ statement: call.node }));
    },
  })

  switch (env) {
    case 'es': {
      path.node.body.push(
        babel.template.ast(`
          if (import.meta.hot || import.meta.webpackHot) {
            (import.meta.hot || import.meta.webpackHot).dispose(() => clearNode(_internalHMRRegion));
          } else {
            console.warn('[effector hmr] HMR is not available in current environment.');
          }
        `)
      )

      break;
    }
    case 'cjs': {
      path.node.body.push(
        babel.template.ast(`
          if (module.hot) {
            module.hot.dispose(() => clearNode(_internalHMRRegion));
          } else {
            console.warn('[effector hmr] HMR is not available in current environment.');
          }
        `)
      )

      break;
    }
  }
}

module.exports = {transformHmr}
