const importName = 'effector-react'

module.exports = function(babel, options = {}) {
  const componentCreators = new Set(
    options.componentCreators || ['createComponent'],
  )
  const enableFileName =
    typeof options.filename === 'undefined' ? true : Boolean(options.filename)

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

      CallExpression(path, state) {
        if (!state.fileNameIdentifier) {
          const fileName = enableFileName ? state.filename || '' : ''

          const fileNameIdentifier = path.scope.generateUidIdentifier(
            '_effectorFileName',
          )
          // babel bug https://github.com/babel/babel/issues/9496
          if (path.hub) {
            const scope = path.hub.getScope()
            if (scope) {
              scope.push({
                id: fileNameIdentifier,
                init: t.stringLiteral(fileName),
              })
            }
          }
          state.fileNameIdentifier = fileNameIdentifier
        }
        if (t.isIdentifier(path.node.callee)) {
          if (componentCreators.has(path.node.callee.name)) {
            const id = findCandidateNameForExpression(path)
            if (id) setComponentNameAfter(path, state, id, babel.types)
          }
          if (path.node.callee.name === 'useStore') {
            const id = findComponentName(path)
            if (id) setUseStoreNameAfter(path, state, id, babel.types)
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

function isComponentName(node) {
  if (node && node.type === 'Identifier') {
    return !/^[a-z]/.test(node.name)
  } else {
    return false
  }
}
function findComponentName(path) {
  let id
  path.find(path => {
    if (isComponentName(path.node.id)) {
      id = path.node.id
    }

    // we've got an id! no need to continue
    if (id) return true
  })
  return id
}

function makeTrace(fileNameIdentifier, lineNumber, columnNumber, t) {
  const fileLineLiteral =
    lineNumber != null ? t.numericLiteral(lineNumber) : t.numericLiteral(-1)
  const fileColumnLiteral =
    columnNumber != null ? t.numericLiteral(columnNumber) : t.numericLiteral(-1)
  const fileProperty = t.objectProperty(
    t.identifier('file'),
    fileNameIdentifier,
  )
  const lineProperty = t.objectProperty(t.identifier('line'), fileLineLiteral)
  const columnProperty = t.objectProperty(
    t.identifier('column'),
    fileColumnLiteral,
  )
  return t.objectExpression([fileProperty, lineProperty, columnProperty])
}
function setComponentNameAfter(path, state, nameNodeId, t) {
  let displayName
  if (!displayName) {
    displayName = nameNodeId.name
  }

  let args
  let loc
  path.find(path => {
    if (path.isCallExpression()) {
      args = path.node.arguments
      loc = path.node.loc.start
      return true
    }
  })

  if (args && displayName) {
    const oldConfig = args[2]
    const configExpr = t.objectExpression([])
    const nameProp = t.objectProperty(
      t.identifier('name'),
      t.stringLiteral(displayName),
    )
    const locProp = t.objectProperty(
      t.identifier('loc'),
      makeTrace(state.fileNameIdentifier, loc.line, loc.column, t),
    )
    const stableID = t.objectProperty(
      t.identifier('sid'),
      t.stringLiteral(
        generateStableID(
          state.file.opts.root,
          state.filename,
          displayName,
          loc.line,
          loc.column,
        ),
      ),
    )
    if (!args[0]) return
    args[2] = configExpr
    if (oldConfig) {
      args[2].properties.push(t.objectProperty(t.identifier('and'), oldConfig))
    }
    args[2].properties.push(locProp)
    args[2].properties.push(nameProp)
    args[2].properties.push(stableID)
  }
}
function setUseStoreNameAfter(path, state, nameNodeId, t) {
  let displayName
  if (!displayName) {
    displayName = nameNodeId.name
  }

  let args
  let loc
  path.find(path => {
    if (path.isCallExpression()) {
      args = path.node.arguments
      loc = path.node.loc.start
      return true
    }
  })

  if (args && displayName) {
    const oldConfig = args[1]
    const configExpr = t.objectExpression([])
    const nameProp = t.objectProperty(
      t.identifier('name'),
      t.stringLiteral(displayName),
    )
    const locProp = t.objectProperty(
      t.identifier('loc'),
      makeTrace(state.fileNameIdentifier, loc.line, loc.column, t),
    )
    const stableID = t.objectProperty(
      t.identifier('sid'),
      t.stringLiteral(
        generateStableID(
          state.file.opts.root,
          state.filename,
          displayName,
          loc.line,
          loc.column,
        ),
      ),
    )
    if (!args[0]) return
    args[1] = configExpr
    if (oldConfig) {
      args[1].properties.push(t.objectProperty(t.identifier('and'), oldConfig))
    }
    args[1].properties.push(locProp)
    args[1].properties.push(nameProp)
    args[1].properties.push(stableID)
  }
}

/**
 * "foo src/index.js [12,30]"
 */
function generateStableID(babelRoot, fileName, varName, line, column) {
  const {sep, normalize} = require('path')
  const rawPath = fileName.replace(babelRoot, '')
  const normalizedPath = normalize(rawPath)
    .split(sep)
    .join('/')
  return `${varName} ${normalizedPath} [${line}, ${column}]`
}
