//@flow

const importName = 'effector'

module.exports = function(babel, options = {}) {
  const functionNames = []
  const defaultCreators = ['createStore', 'restoreEvent', 'restoreEffect']
  const storeCreators = new Set(options.storeCreators || defaultCreators)

  const {types: t} = babel

  return {
    name: '@effector/babel-plugin', // not required
    visitor: {
      ImportDeclaration(path) {
        const source = path.node.source.value
        const specifiers = path.node.specifiers
        if (source === importName) {
          for (const specifier of specifiers.filter(
            s => s.imported && storeCreators.has(s.imported.name),
          )) {
            storeCreators.add(specifier.local.name)
          }
        }
      },

      CallExpression(path) {
        if (t.isIdentifier(path.node.callee)) {
          if (storeCreators.has(path.node.callee.name)) {
            functionNames[0] = 'setStoreName'
            addImportDeclaration(
              findProgram(path, t, functionNames),
              t,
              functionNames,
            )
            const id = findCandidateNameForExpression(path)
            if (id) {
              setStoreNameAfter(path, id, babel.types, functionNames[0])
            }
          }
        }

        if (t.isMemberExpression(path.node.callee)) {
          if (path.node.callee.property.name === 'store') {
            functionNames[0] = 'setStoreName'
            addImportDeclaration(
              findProgram(path, t, functionNames),
              t,
              functionNames,
            )
            const id = findCandidateNameForExpression(path)
            if (id) {
              setStoreNameAfter(path, id, babel.types, functionNames[0])
            }
          }
        }
      },
    },
  }
}

function addImportDeclaration(path, t, names) {
  if (!path) return
  const importDeclaration = t.importDeclaration(
    names.map(name =>
      t.importSpecifier(t.identifier(name), t.identifier(name)),
    ),
    t.stringLiteral(importName),
  )
  importDeclaration.leadingComments = path.node.body[0].leadingComments
  path.unshiftContainer('body', importDeclaration)
}

function findCandidateNameForExpression(path) {
  let id
  path.find(path => {
    if (path.isAssignmentExpression()) {
      id = path.node.left
      // } else if (path.isObjectProperty()) {
      // id = path.node.key;
    } else if (path.isVariableDeclarator()) {
      id = path.node.id
    } else if (path.isStatement()) {
      // we've hit a statement, we should stop crawling up
      return true
    }

    // we've got an id! no need to continue
    if (id) return true
  })
  return id
}

function findProgram(path, t, functionNames) {
  let program
  path.find(path => {
    if (path.isProgram()) {
      const res = path.node.body.find(
        node => t.isImportDeclaration(node) && node.source.value === importName,
      )
      if (!res) {
        program = path
        return true
      }
      if (res.source) {
        if (res.source.value === importName) {
          if (
            res.specifiers.some(node => functionNames.includes(node.local.name))
          ) {
            return false
          }
        }
        program = path
        return true
      }
    }
  })
  return program
}

function setStoreNameAfter(path, nameNodeId, t, functionName, displayName) {
  if (!displayName) {
    displayName = nameNodeId.name
  }

  let blockLevelStmnt
  path.find(path => {
    if (path.parentPath.isBlock()) {
      blockLevelStmnt = path
      return true
    }
  })

  if (blockLevelStmnt && displayName) {
    // const trailingComments = blockLevelStmnt.node.trailingComments
    delete blockLevelStmnt.node.trailingComments

    const setStoreNameStmn = t.expressionStatement(
      t.callExpression(t.identifier(functionName), [
        nameNodeId,
        t.stringLiteral(displayName),
      ]),
    )

    blockLevelStmnt.insertAfter(setStoreNameStmn)
  }
}
