//@noflow

const importName = 'effector-react'

module.exports = function(babel, options = {}) {
  const componentCreators = new Set(
    options.componentCreators || ['createComponent'],
  )

  const {types: t} = babel

  return {
    name: '@effector/babel-plugin-react',
    visitor: {
      ImportDeclaration(path) {
        const source = path.node.source.value
        const specifiers = path.node.specifiers
        if (source === importName) {
          for (const specifier of specifiers.filter(
            s => s.imported && componentCreators.has(s.imported.name),
          )) {
            componentCreators.add(specifier.local.name)
          }
        }
      },

      CallExpression(path) {
        if (t.isIdentifier(path.node.callee)) {
          if (componentCreators.has(path.node.callee.name)) {
            const id = findCandidateNameForExpression(path)
            if (id) {
              setDisplayNameAfter(path, id, babel.types)
            }
          }
        }
      },
    },
  }
}

function findCandidateNameForExpression(path) {
  let id
  path.find(path => {
    if (path.isAssignmentExpression()) {
      id = path.node.left
    } else if (path.isObjectProperty()) {
      id = path.node.key
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

function setDisplayNameAfter(path, nameNodeId, t, displayName) {
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
      t.assignmentExpression(
        '=',
        t.memberExpression(nameNodeId, t.identifier('displayName')),
        t.stringLiteral(displayName),
      ),
    )

    blockLevelStmnt.insertAfter(setDisplayNameStmn)
  }
}
