//@noflow

const importName = 'effector'

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
    exportMetadata,
  } = normalizeOptions(options)

  const {types: t} = babel
  const plugin = {
    name: '@effector/babel-plugin',
    visitor: {
      ImportDeclaration(path) {
        const source = path.node.source.value
        const specifiers = path.node.specifiers
        if (source === importName) {
          for (let i = 0; i < specifiers.length; i++) {
            const s = specifiers[i]
            if (!s.imported) continue
            const importedName = s.imported.name
            const localName = s.local.name
            if (storeCreators.has(importedName)) {
              storeCreators.add(localName)
            } else if (eventCreators.has(importedName)) {
              eventCreators.add(localName)
            } else if (effectCreators.has(importedName)) {
              effectCreators.add(localName)
            } else if (domainCreators.has(importedName)) {
              domainCreators.add(localName)
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
        if (!state.stores) state.stores = new Set()
        if (!state.events) state.events = new Set()
        if (!state.effects) state.effects = new Set()
        if (!state.domains) state.domains = new Set()

        if (t.isIdentifier(path.node.callee)) {
          if (stores && storeCreators.has(path.node.callee.name)) {
            const id = findCandidateNameForExpression(path)
            if (id) {
              setStoreNameAfter(path, state, id, babel.types)
              state.stores.add(id.name)
            }
          }
          if (events && eventCreators.has(path.node.callee.name)) {
            const id = findCandidateNameForExpression(path)
            if (id) {
              setEventNameAfter(path, state, id, babel.types)
              state.events.add(id.name)
            }
          }
          if (effects && effectCreators.has(path.node.callee.name)) {
            const id = findCandidateNameForExpression(path)
            if (id) {
              setEventNameAfter(path, state, id, babel.types)
              state.effects.add(id.name)
            }
          }
          if (domains && domainCreators.has(path.node.callee.name)) {
            const id = findCandidateNameForExpression(path)
            if (id) {
              setEventNameAfter(path, state, id, babel.types)
              state.domains.add(id.name)
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
  if (exportMetadata) {
    createMetadataVisitor(plugin, exportMetadata)
  }
  return plugin
}
const normalizeOptions = options => {
  let exportMetadata
  if ('exportMetadata' in options) {
    if (typeof options.exportMetadata === 'function') {
      exportMetadata = options.exportMetadata
    } else if (options.exportMetadata == true /* == for truthy values */) {
      exportMetadata = require('./plugin/defaultMetaVisitor.js')
        .defaultMetaVisitor
    } else {
      exportMetadata = null
    }
  } else {
    exportMetadata = null
  }
  return readConfigFlags({
    options,
    properties: {
      filename: true,
      stores: true,
      events: true,
      effects: true,
      domains: true,
    },
    result: {
      exportMetadata,
      storeCreators: new Set(options.storeCreators || ['createStore']),
      eventCreators: new Set(options.eventCreators || ['createEvent']),
      effectCreators: new Set(options.effectCreators || ['createEffect']),
      domainCreators: new Set(options.domainCreators || ['createDomain']),
    },
  })

  function readConfigFlags({options, properties, result}) {
    for (const property in properties) {
      if (property in options) {
        result[property] = Boolean(options[property])
      } else {
        result[property] = properties[property]
      }
    }
    return result
  }
}

function createMetadataVisitor(plugin, exportMetadata) {
  const {join, relative} = require('path')
  plugin.visitor.Program = {
    exit(_, state) {
      const metadata = join(
        state.file.opts.root,
        '.effector',
        relative(state.file.opts.root, state.filename) + '.json',
      )
      exportMetadata(metadata, {
        stores: Array.from(state.stores),
        effects: Array.from(state.effects),
        domains: Array.from(state.domains),
        events: Array.from(state.events),
      })
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
  const fileLineLiteral = t.numericLiteral(lineNumber != null ? lineNumber : -1)
  const fileColumnLiteral = t.numericLiteral(
    columnNumber != null ? columnNumber : -1,
  )

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
  const displayName = nameNodeId.name
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
    if (!args[0]) return
    const oldConfig = args[1]
    const configExpr = (args[1] = t.objectExpression([]))

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

    if (oldConfig) {
      configExpr.properties.push(t.objectProperty(t.identifier('ɔ'), oldConfig))
    }
    configExpr.properties.push(locProp)
    configExpr.properties.push(nameProp)
    configExpr.properties.push(stableID)
  }
}

function setEventNameAfter(path, state, nameNodeId, t) {
  const displayName = nameNodeId.name

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
    if (!args[0]) args[0] = t.stringLiteral(displayName)
    const oldConfig = args[1]
    const configExpr = (args[1] = t.objectExpression([]))

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

    if (oldConfig) {
      configExpr.properties.push(t.objectProperty(t.identifier('ɔ'), oldConfig))
    }
    configExpr.properties.push(locProp)
    configExpr.properties.push(nameProp)
    configExpr.properties.push(stableID)
  }
}

/**
 * "foo src/index.js [12,30]"
 */
function generateStableID(babelRoot, fileName, varName, line, column) {
  return `${varName} ${fileName.replace(babelRoot, '')} [${line}, ${column}]`
}
