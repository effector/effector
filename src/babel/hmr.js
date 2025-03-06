/**
 * @import { NodePath } from '@babel/traverse';
 * @import { ImportDeclaration, Program, Statement, VariableDeclaration, VariableDeclarator, CallExpression } from '@babel/types;
 * 
 * @import * as Babel from '@babel/core';
 */

const createUnits = [
  'createEvent',
  'createStore',
  'createEffect',
  'sample',
  'merge',
  'combine',
]

/**
 * @param {NodePath<any>} path
 * @returns {boolean}
 */
function isSupportHMR(path) {
  return path.scope.block.type === 'Program';
}

/**
 *
 * @param {NodePath<Program>} path
 * @returns {{ statements: Statement[]; declarations: VariableDeclaration[]; lastImport: ImportDeclaration; withPrefix: (name: string) => string }}
 */
function getUnitInitStatements(path) {
  /**
   * @type {Statement[]}
   */
  const statements = []
  /**
   * @type {VariableDeclaration[]}
   */
  const declarations = []
  /**
   * @type {NodePath<ImportDeclaration>}
   */
  let lastImport;
  /**
   * @type {string}
   */
  let prefix;


  path.traverse({
    /**
     *
     * @param {NodePath<ImportDeclaration>} call
     * @returns
     */
    ImportDeclaration: declaration => {
      lastImport = declaration

      if (declaration.node.source.value !== 'effector') {
        return
      }

      if (declaration.node.specifiers.length === 1) {
        const specifier = declaration.node.specifiers[0]

        if (!specifier) {
          throw new Error()
        }

        prefix = specifier.local.name
      } else {
        let needToImported = ['withRegion', 'createNode', 'clearNode']

        for (const specifier of declaration.node.specifiers) {
          needToImported = needToImported.filter(
            unit => unit !== specifier.local.name,
          )
        }

        for (const importName of needToImported) {
          declaration.node.specifiers.push({
            type: 'ImportSpecifier',
            local: {
              type: 'Identifier',
              name: importName,
            },
            imported: {
              type: 'Identifier',
              name: importName,
            },
          })
        }
      }
    },
    /**
     *
     * @param {NodePath<CallExpression>} call
     * @returns
     */
    CallExpression: call => {
      if (
        call.node.callee.type !== 'Identifier' ||
        call.node.callee.name !== 'sample'
      ) {
        return
      }

      if (!isSupportHMR(call)) {
        return
      }

      /**
       * @type {Statement}
       */
      const statement = {
        type: 'ExpressionStatement',
        expression: call.node,
      }

      statements.push(statement)

      if (
        call.parentPath.node.type === 'ExpressionStatement' &&
        call.parentPath.parentPath.node.type === 'Program'
      ) {
        call.parentPath.remove()
      }
    },

    /**
     *
     * @param {NodePath<VariableDeclaration>} variable
     * @returns
     */
    VariableDeclaration(variable) {
      if (!isSupportHMR(variable)) {
        return
      }

      variable.traverse({
        /**
         *
         * @param {NodePath<CallExpression>} call
         * @returns
         */
        CallExpression(call) {
          if (call.node.callee.type !== 'Identifier') {
            return
          }

          const isInvoke = call.node.callee.name === 'invoke'

          if (!isSupportHMR(call) && !isInvoke) {
            return
          }

          const isCreateUnitFunction = createUnits.includes(
            call.node.callee.name,
          )

          if (!isCreateUnitFunction && !isInvoke) {
            return
          }

          /**
           * @type {NodePath<VariableDeclarator> | null}
           */
          const declarationPath = call.findParent(parent =>
            parent.isVariableDeclarator(),
          )

          if (!declarationPath) {
            return
          }

          const {node: declaration} = declarationPath

          declarations.push({
            type: 'VariableDeclaration',
            kind: 'let',
            declarations: [{type: 'VariableDeclarator', id: declaration.id}],
          })

          statements.push({
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '=',
              left: declaration.id,
              right: declaration.init,
            },
          })

          declarationPath.remove()

          if (variable.node?.declarations.length === 0) {
            variable.parentPath.remove()
          }
        },
      })
    },
  })

  return {statements, declarations, lastImport, withPrefix: (name) => prefix ? `${prefix}.${name}` : name}
}

/**
 *
 * @param {Babel} babel
 * @param {NodePath<Program>} path
 * @returns {void}
 */
function modifyFile(babel, path) {
  const {declarations, statements, lastImport, withPrefix} = getUnitInitStatements(path)

  if (!statements.length) {
    return
  }

  lastImport.insertAfter([
    ...declarations,
    ...babel.template(`
      const _internalHMRRegion = ${withPrefix('createNode')}();
      
      ${withPrefix('withRegion')}(_internalHMRRegion, () => {
        %%statements%%
      });
    `)({ statements }),
  ])

  path.node.body.push(
    babel.template.ast(`
      try {
        (typeof module !== 'undefined' ? module.hot : eval('import.meta.hot || import.meta.webpackHot'))
          .dispose(() => ${withPrefix('clearNode')}(_internalHMRRegion))
      } catch {
        console.warning('[effector hmr] HMR is not available in current environment.');
      }
    `)
  )
}

module.exports = {modifyFile}
