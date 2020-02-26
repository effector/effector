//@noflow

module.exports = function(babel, options = {}) {
  const {
    compressor,
    addLoc,
    filename: enableFileName,
    stores,
    events,
    effects,
    domains,
    restores,
    combines,
    samples,
    forwards,
    storeCreators,
    eventCreators,
    effectCreators,
    domainCreators,
    restoreCreators,
    combineCreators,
    sampleCreators,
    forwardCreators,
    domainMethods,
    exportMetadata,
    importName,
  } = normalizeOptions(options)
  const smallConfig = {compressor, addLoc}
  const {types: t} = babel
  const isPropertyNameInRange = (range, path) =>
    range.has(path.node.callee.property.name)
  const isDomainMethod = {
    store: isPropertyNameInRange.bind(null, domainMethods.store),
    event: isPropertyNameInRange.bind(null, domainMethods.event),
    effect: isPropertyNameInRange.bind(null, domainMethods.effect),
    domain: isPropertyNameInRange.bind(null, domainMethods.domain),
  }
  const plugin = {
    name: '@effector/babel-plugin',
    visitor: {
      ImportDeclaration(path) {
        const source = path.node.source.value
        const specifiers = path.node.specifiers
        if (importName.has(source)) {
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
            } else if (restoreCreators.has(importedName)) {
              restoreCreators.add(localName)
            } else if (combineCreators.has(importedName)) {
              combineCreators.add(localName)
            } else if (sampleCreators.has(importedName)) {
              sampleCreators.add(localName)
            } else if (forwardCreators.has(importedName)) {
              forwardCreators.add(localName)
            }
          }
        }
      },

      CallExpression(path, state) {
        if (addLoc && !state.fileNameIdentifier) {
          const fileName = enableFileName
            ? stripRoot(state.file.opts.root || '', state.filename || '')
            : ''

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
          const name = path.node.callee.name
          if (stores && storeCreators.has(name)) {
            const id = findCandidateNameForExpression(path)
            if (id) {
              setStoreNameAfter(path, state, id, babel.types, smallConfig)
              state.stores.add(id.name)
            }
          }
          if (events && eventCreators.has(name)) {
            const id = findCandidateNameForExpression(path)
            if (id) {
              setEventNameAfter(path, state, id, babel.types, smallConfig)
              state.events.add(id.name)
            }
          }
          if (effects && effectCreators.has(name)) {
            const id = findCandidateNameForExpression(path)
            if (id) {
              setEventNameAfter(path, state, id, babel.types, smallConfig)
              state.effects.add(id.name)
            }
          }
          if (domains && domainCreators.has(name)) {
            const id = findCandidateNameForExpression(path)
            if (id) {
              setEventNameAfter(path, state, id, babel.types, smallConfig)
              state.domains.add(id.name)
            }
          }
          if (restores && restoreCreators.has(name)) {
            const id = findCandidateNameForExpression(path)
            if (id) {
              setRestoreNameAfter(path, state, id, babel.types, smallConfig)
              state.stores.add(id.name)
            }
          }
          if (combines && combineCreators.has(name)) {
            const id = findCandidateNameForExpression(path)
            setConfigForConfigurableMethod(
              path,
              state,
              id,
              babel.types,
              smallConfig,
              false,
            )
            if (id) {
              state.stores.add(id.name)
            }
          }
          if (samples && sampleCreators.has(name)) {
            setConfigForConfigurableMethod(
              path,
              state,
              findCandidateNameForExpression(path),
              babel.types,
              smallConfig,
              false,
            )
          }
          if (forwards && forwardCreators.has(name)) {
            setConfigForConfigurableMethod(
              path,
              state,
              findCandidateNameForExpression(path),
              babel.types,
              smallConfig,
              true,
            )
          }
        }

        if (t.isMemberExpression(path.node.callee)) {
          if (stores && isDomainMethod.store(path)) {
            const id = findCandidateNameForExpression(path)
            if (id) {
              setStoreNameAfter(path, state, id, babel.types, smallConfig)
            }
          }
          if (events && isDomainMethod.event(path)) {
            const id = findCandidateNameForExpression(path)
            if (id) {
              setEventNameAfter(path, state, id, babel.types, smallConfig)
            }
          }
          if (effects && isDomainMethod.effect(path)) {
            const id = findCandidateNameForExpression(path)
            if (id) {
              setEventNameAfter(path, state, id, babel.types, smallConfig)
            }
          }
          if (domains && isDomainMethod.domain(path)) {
            const id = findCandidateNameForExpression(path)
            if (id) {
              setEventNameAfter(path, state, id, babel.types, smallConfig)
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
      restores: true,
      combines: true,
      samples: true,
      forwards: true,
    },
    result: {
      importName: new Set(
        options.importName
          ? Array.isArray(options.importName)
            ? options.importName
            : [options.importName]
          : ['effector', '@zerobias/effector'],
      ),
      exportMetadata,
      storeCreators: new Set(options.storeCreators || ['createStore']),
      eventCreators: new Set(options.eventCreators || ['createEvent']),
      effectCreators: new Set(options.effectCreators || ['createEffect']),
      domainCreators: new Set(options.domainCreators || ['createDomain']),
      restoreCreators: new Set(options.restoreCreators || ['restore']),
      combineCreators: new Set(options.combineCreators || ['combine']),
      sampleCreators: new Set(options.sampleCreators || ['sample']),
      forwardCreators: new Set(options.forwardCreators || ['forward']),
      domainMethods: readConfigShape(options.domainMethods, {
        store: ['store', 'createStore'],
        event: ['event', 'createEvent'],
        effect: ['effect', 'createEffect'],
        domain: ['domain', 'createDomain'],
      }),
      addLoc: Boolean(options.addLoc),
      compressor: options.compressSid === false ? str => str : hashCode,
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
  function readConfigShape(shape = {}, defaults = {}) {
    const result = {}
    for (const key in defaults) {
      result[key] = readConfigArray(shape[key], defaults[key])
    }
    return result
  }
  function readConfigArray(array, defaults) {
    return new Set(array || defaults)
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
function setRestoreNameAfter(path, state, nameNodeId, t, {addLoc, compressor}) {
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
    if (!args[1]) return
    const oldConfig = args[2]
    const configExpr = (args[2] = t.objectExpression([]))

    const nameProp = t.objectProperty(
      t.identifier('name'),
      t.stringLiteral(displayName),
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
          compressor,
        ),
      ),
    )

    if (oldConfig) {
      configExpr.properties.push(t.objectProperty(t.identifier('ɔ'), oldConfig))
    }
    if (addLoc) {
      const locProp = t.objectProperty(
        t.identifier('loc'),
        makeTrace(state.fileNameIdentifier, loc.line, loc.column, t),
      )
      configExpr.properties.push(locProp)
    }
    configExpr.properties.push(nameProp)
    configExpr.properties.push(stableID)
  }
}
function setStoreNameAfter(path, state, nameNodeId, t, {addLoc, compressor}) {
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

    const stableID = t.objectProperty(
      t.identifier('sid'),
      t.stringLiteral(
        generateStableID(
          state.file.opts.root,
          state.filename,
          displayName,
          loc.line,
          loc.column,
          compressor,
        ),
      ),
    )

    if (oldConfig) {
      configExpr.properties.push(t.objectProperty(t.identifier('ɔ'), oldConfig))
    }
    if (addLoc) {
      const locProp = t.objectProperty(
        t.identifier('loc'),
        makeTrace(state.fileNameIdentifier, loc.line, loc.column, t),
      )
      configExpr.properties.push(locProp)
    }
    configExpr.properties.push(nameProp)
    configExpr.properties.push(stableID)
  }
}
function setConfigForConfigurableMethod(
  path,
  state,
  nameNodeId,
  t,
  {addLoc, compressor},
  singleArgument,
) {
  const displayName = nameNodeId ? nameNodeId.name : ''
  let args
  let loc
  path.find(path => {
    if (path.isCallExpression()) {
      args = path.node.arguments
      loc = path.node.loc.start
      return true
    }
  })

  if (args) {
    if (!args[0]) return
    const commonArgs = singleArgument
      ? args[0]
      : t.ArrayExpression(args.slice())
    args.length = 0
    const configExpr = t.objectExpression([])

    const nameProp = t.objectProperty(
      t.identifier('name'),
      t.stringLiteral(displayName),
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
          compressor,
        ),
      ),
    )

    if (addLoc) {
      const locProp = t.objectProperty(
        t.identifier('loc'),
        makeTrace(state.fileNameIdentifier, loc.line, loc.column, t),
      )
      configExpr.properties.push(locProp)
    }
    configExpr.properties.push(nameProp)
    configExpr.properties.push(stableID)
    args[0] = t.objectExpression([
      t.objectProperty(t.identifier('ɔ'), commonArgs),
      t.objectProperty(t.identifier('config'), configExpr),
    ])
  }
}

function setEventNameAfter(path, state, nameNodeId, t, {addLoc, compressor}) {
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

    const stableID = t.objectProperty(
      t.identifier('sid'),
      t.stringLiteral(
        generateStableID(
          state.file.opts.root,
          state.filename,
          displayName,
          loc.line,
          loc.column,
          compressor,
        ),
      ),
    )

    if (oldConfig) {
      configExpr.properties.push(t.objectProperty(t.identifier('ɔ'), oldConfig))
    }
    if (addLoc) {
      const locProp = t.objectProperty(
        t.identifier('loc'),
        makeTrace(state.fileNameIdentifier, loc.line, loc.column, t),
      )
      configExpr.properties.push(locProp)
    }
    configExpr.properties.push(nameProp)
    configExpr.properties.push(stableID)
  }
}
function stripRoot(babelRoot, fileName) {
  const {sep, normalize} = require('path')
  const rawPath = fileName.replace(babelRoot, '')
  const normalizedPath = normalize(rawPath)
    .split(sep)
    .join('/')
  return normalizedPath
}
/**
 * "foo src/index.js [12,30]"
 */
function generateStableID(
  babelRoot,
  fileName,
  varName,
  line,
  column,
  compressor,
) {
  const normalizedPath = stripRoot(babelRoot, fileName)
  return compressor(`${varName} ${normalizedPath} [${line}, ${column}]`)
}
function hashCode(s) {
  let h = 0
  let i = 0
  if (s.length > 0)
    while (i < s.length) h = ((h << 5) - h + s.charCodeAt(i++)) | 0
  return h.toString(36)
}
