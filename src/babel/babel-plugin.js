//@noflow

const importName = 'effector'

const normalizeOptions = options => {
  const defaultStoreCreators = ['createStore']
  const defaultEventCreators = ['createEvent']
  const defaultEffectCreators = ['createEffect']
  const defaultDomainCreators = ['createDomain']

  return {
    filename:
      typeof options.filename === 'undefined'
        ? true
        : Boolean(options.filename),
    stores:
      typeof options.stores === 'undefined' ? true : Boolean(options.stores),
    events:
      typeof options.events === 'undefined' ? true : Boolean(options.events),
    effects:
      typeof options.effects === 'undefined' ? true : Boolean(options.effects),
    domains:
      typeof options.domains === 'undefined' ? true : Boolean(options.domains),
    storeCreators: new Set(options.storeCreators || defaultStoreCreators),
    eventCreators: new Set(options.eventCreators || defaultEventCreators),
    effectCreators: new Set(options.effectCreators || defaultEffectCreators),
    domainCreators: new Set(options.domainCreators || defaultDomainCreators),
  }
}

module.exports = function(babel, options = {}) {
  const {
    filename: enableFileName,
    stores,
    events,
    effects,
    domains,
    storeCreators,
    eventCreators,
    effectCreators,
    domainCreators,
  } = normalizeOptions(options)

  const {types: t} = babel

  return {
    name: '@effector/babel-plugin', // not required
    visitor: {
      ImportDeclaration(path) {
        const source = path.node.source.value
        const specifiers = path.node.specifiers
        if (source === importName) {
          for (const {name, store, event, effect, domain} of specifiers
            .filter(s => s.imported)
            .map(s => ({
              name: s.local.name,
              store: storeCreators.has(s.imported.name),
              event: eventCreators.has(s.imported.name),
              effect: effectCreators.has(s.imported.name),
              domain: domainCreators.has(s.imported.name),
            }))) {
            if (store) {
              storeCreators.add(name)
            } else if (event) {
              eventCreators.add(name)
            } else if (effect) {
              effectCreators.add(name)
            } else if (domain) {
              domainCreators.add(name)
            }
          }
        }
      },

      CallExpression(path, state) {
        if (!state.fileNameIdentifier) {
          const fileName = enableFileName ? state.filename || '' : ''

          const fileNameIdentifier = path.scope.generateUidIdentifier(
            '_effectorFileName',
          )
          const scope = path.hub.getScope()
          if (scope) {
            scope.push({
              id: fileNameIdentifier,
              init: t.stringLiteral(fileName),
            })
          }
          state.fileNameIdentifier = fileNameIdentifier
        }

        if (t.isIdentifier(path.node.callee)) {
          if (stores && storeCreators.has(path.node.callee.name)) {
            const id = findCandidateNameForExpression(path)
            if (id) {
              setStoreNameAfter(path, state, id, babel.types)
            }
          }
          if (events && eventCreators.has(path.node.callee.name)) {
            const id = findCandidateNameForExpression(path)
            if (id) {
              setEventNameAfter(path, state, id, babel.types)
            }
          }
          if (effects && effectCreators.has(path.node.callee.name)) {
            const id = findCandidateNameForExpression(path)
            if (id) {
              setEventNameAfter(path, state, id, babel.types)
            }
          }
          if (domains && domainCreators.has(path.node.callee.name)) {
            const id = findCandidateNameForExpression(path)
            if (id) {
              setEventNameAfter(path, state, id, babel.types)
            }
          }
        }

        if (t.isMemberExpression(path.node.callee)) {
          if (stores && path.node.callee.property.name === 'store') {
            const id = findCandidateNameForExpression(path)
            if (id) {
              setStoreNameAfter(path, state, id, babel.types)
            }
          }
          if (events && path.node.callee.property.name === 'event') {
            const id = findCandidateNameForExpression(path)
            if (id) {
              setEventNameAfter(path, state, id, babel.types)
            }
          }
          if (effects && path.node.callee.property.name === 'effect') {
            const id = findCandidateNameForExpression(path)
            if (id) {
              setEventNameAfter(path, state, id, babel.types)
            }
          }
          if (domains && path.node.callee.property.name === 'domain') {
            const id = findCandidateNameForExpression(path)
            if (id) {
              setEventNameAfter(path, state, id, babel.types)
            }
          }
        }
      },
    },
  }
}

// function addImportDeclaration(path, t, names) {
//   if (!path) return
//   const importDeclaration = t.importDeclaration(
//     names.map(name =>
//       t.importSpecifier(t.identifier(name), t.identifier(name)),
//     ),
//     t.stringLiteral(importName),
//   )
//   importDeclaration.leadingComments = path.node.body[0].leadingComments
//   path.unshiftContainer('body', importDeclaration)
// }

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

function setStoreNameAfter(path, state, nameNodeId, t) {
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
    if (!args[0]) return
    args[1] = configExpr
    if (oldConfig) {
      args[1].properties.push(t.objectProperty(t.identifier('ɔ'), oldConfig))
    }
    args[1].properties.push(locProp)
    args[1].properties.push(nameProp)
  }
}

function setEventNameAfter(path, state, nameNodeId, t) {
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
    const name = t.stringLiteral(displayName)
    if (!args[0]) args[0] = name
    args[1] = configExpr
    if (oldConfig) {
      args[1].properties.push(t.objectProperty(t.identifier('ɔ'), oldConfig))
    }
    args[1].properties.push(locProp)
    args[1].properties.push(nameProp)
  }
}
