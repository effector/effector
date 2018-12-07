//@noflow

const importName = 'effector'

module.exports = function(babel) {
  let functionName

  const {types: t} = babel

  return {
    name: 'ast-transform', // not required
    visitor: {
      // ImportDeclaration(path) {
      //   const source = path.node.source.value
      //   const specifiers = path.node.specifiers
      //   if (source === 'effector') {
      //     const specifier = specifiers.find(
      //       s => s.imported && s.imported.name === 'setStoreName',
      //     )
      //     if (specifier) {
      //       functionName = specifier.local.name
      //     } else {
      //       specifiers.push(setStoreName)
      //       functionName = 'setStoreName'
      //     }
      //   }
      // },

      CallExpression(path) {
        if (t.isIdentifier(path.node.callee)) {
          if (path.node.callee.name === 'createStore') {
            addImportDeclaration(findProgram(path, t), t)
            functionName = 'setStoreName'
            const id = findCandidateNameForExpression(path)
            if (id) {
              setDisplayNameAfter(path, id, babel.types, functionName)
            }
          }
        }
        if (t.isMemberExpression(path.node.callee)) {
          if (path.node.callee.property.name === 'store') {
            addImportDeclaration(findProgram(path, t), t)
            functionName = 'setStoreName'
            const id = findCandidateNameForExpression(path)
            if (id) {
              setDisplayNameAfter(path, id, babel.types, functionName)
            }
          }
        }
      },
    },
  }
}

function addImportDeclaration(path, t) {
  if (!path) return
  const setStoreName = t.importSpecifier(
    t.identifier('setStoreName'),
    t.identifier('setStoreName'),
  )
  const importDeclaration = t.importDeclaration(
    [setStoreName],
    t.stringLiteral(importName),
  )
  importDeclaration.leadingComments = path.node.body[0].leadingComments
  //if (!hasImportNode) {
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

function findProgram(path, t) {
  let program
  path.find(path => {
    if (path.isProgram()) {
      const res = path.node.body.find(path => t.isImportDeclaration(path))
      if (!res) return false
      if (res.source) {
        if (res.source.value === importName) return false
        program = path
        return true
      }
    }
  })
  return program
}

function setDisplayNameAfter(path, nameNodeId, t, functionName, displayName) {
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
    const trailingComments = blockLevelStmnt.node.trailingComments
    delete blockLevelStmnt.node.trailingComments

    const setDisplayNameStmn = t.expressionStatement(
      t.callExpression(t.identifier(functionName), [
        nameNodeId,
        t.stringLiteral(displayName),
      ]),
    )

    blockLevelStmnt.insertAfter(setDisplayNameStmn)
  }
}
