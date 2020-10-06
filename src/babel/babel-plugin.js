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
    guards,
    attaches,
    splits,
    apis,
    storeCreators,
    eventCreators,
    effectCreators,
    domainCreators,
    restoreCreators,
    combineCreators,
    sampleCreators,
    forwardCreators,
    guardCreators,
    attachCreators,
    splitCreators,
    apiCreators,
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
  const creatorsList = [
    storeCreators,
    eventCreators,
    effectCreators,
    domainCreators,
    restoreCreators,
    combineCreators,
    sampleCreators,
    forwardCreators,
    guardCreators,
    attachCreators,
    splitCreators,
    apiCreators,
  ]
  const importVisitor = {
    ImportDeclaration(path) {
      const source = path.node.source.value
      const specifiers = path.node.specifiers
      if (importName.has(source)) {
        for (let i = 0; i < specifiers.length; i++) {
          const s = specifiers[i]
          if (!s.imported) continue
          const importedName = s.imported.name
          const localName = s.local.name
          if (importedName === localName) continue
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
          } else if (guardCreators.has(importedName)) {
            guardCreators.add(localName)
          } else if (attachCreators.has(importedName)) {
            attachCreators.add(localName)
          } else if (splitCreators.has(importedName)) {
            splitCreators.add(localName)
          } else if (apiCreators.has(importedName)) {
            apiCreators.add(localName)
          }
        }
      } else {
        for (let i = 0; i < specifiers.length; i++) {
          const s = specifiers[i]
          if (!s.imported) continue
          const localName = s.local.name
          if (creatorsList.some(set => set.has(localName))) {
            this.effector_ignoredImports.add(localName)
          }
        }
      }
    },
  }
  const plugin = {
    name: '@effector/babel-plugin',
    pre() {
      this.effector_ignoredImports = new Set()
    },
    visitor: {
      Program: {
        enter(path, state) {
          path.traverse(importVisitor, state)
        },
      },

      CallExpression(path, state) {
        if (addLoc && !state.fileNameIdentifier) {
          const fileName = enableFileName
            ? stripRoot(state.file.opts.root || '', state.filename || '')
            : ''

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
        if (!state.stores) state.stores = new Set()
        if (!state.events) state.events = new Set()
        if (!state.effects) state.effects = new Set()
        if (!state.domains) state.domains = new Set()

        if (
          t.isIdentifier(path.node.callee) &&
          !this.effector_ignoredImports.has(path.node.callee.name)
        ) {
          const name = path.node.callee.name
          if (stores && storeCreators.has(name)) {
            const id = findCandidateNameForExpression(path)
            setStoreNameAfter(path, state, id, babel.types, smallConfig)
            if (id) {
              state.stores.add(id.name)
            }
          }
          if (events && eventCreators.has(name)) {
            const id = findCandidateNameForExpression(path)
            setEventNameAfter(path, state, id, babel.types, smallConfig)
            if (id) {
              state.events.add(id.name)
            }
          }
          if (effects && effectCreators.has(name)) {
            const id = findCandidateNameForExpression(path)
            setEventNameAfter(path, state, id, babel.types, smallConfig)
            if (id) {
              state.effects.add(id.name)
            }
          }
          if (domains && domainCreators.has(name)) {
            const id = findCandidateNameForExpression(path)
            setEventNameAfter(path, state, id, babel.types, smallConfig)
            if (id) {
              state.domains.add(id.name)
            }
          }
          if (restores && restoreCreators.has(name)) {
            const id = findCandidateNameForExpression(path)
            setRestoreNameAfter(path, state, id, babel.types, smallConfig)
            if (id) {
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
          if (guards && guardCreators.has(name)) {
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
          if (attaches && attachCreators.has(name)) {
            setConfigForConfigurableMethod(
              path,
              state,
              findCandidateNameForExpression(path),
              babel.types,
              smallConfig,
              true,
            )
          }
          if (splits && splitCreators.has(name)) {
            setConfigForConfigurableMethod(
              path,
              state,
              null,
              babel.types,
              smallConfig,
              false,
            )
          }
          if (apis && apiCreators.has(name)) {
            setConfigForConfigurableMethod(
              path,
              state,
              null,
              babel.types,
              smallConfig,
              false,
            )
          }
        }

        if (t.isMemberExpression(path.node.callee)) {
          if (stores && isDomainMethod.store(path)) {
            const id = findCandidateNameForExpression(path)
            setStoreNameAfter(path, state, id, babel.types, smallConfig)
          }
          if (events && isDomainMethod.event(path)) {
            const id = findCandidateNameForExpression(path)
            setEventNameAfter(path, state, id, babel.types, smallConfig)
          }
          if (effects && isDomainMethod.effect(path)) {
            const id = findCandidateNameForExpression(path)
            setEventNameAfter(path, state, id, babel.types, smallConfig)
          }
          if (domains && isDomainMethod.domain(path)) {
            const id = findCandidateNameForExpression(path)
            setEventNameAfter(path, state, id, babel.types, smallConfig)
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
  const defaults = options.noDefaults
    ? {
        store: [],
        event: [],
        effect: [],
        domain: [],
        restore: [],
        combine: [],
        sample: [],
        forward: [],
        guard: [],
        attach: [],
        split: [],
        createApi: [],
        domainMethods: {
          store: [],
          event: [],
          effect: [],
          domain: [],
        },
      }
    : {
        store: ['createStore'],
        event: ['createEvent'],
        effect: ['createEffect'],
        domain: ['createDomain'],
        restore: ['restore'],
        combine: ['combine'],
        sample: ['sample'],
        forward: ['forward'],
        guard: ['guard'],
        attach: ['attach'],
        split: ['split'],
        createApi: ['createApi'],
        domainMethods: {
          store: ['store', 'createStore'],
          event: ['event', 'createEvent'],
          effect: ['effect', 'createEffect'],
          domain: ['domain', 'createDomain'],
        },
      }
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
      guards: true,
      attaches: true,
      splits: true,
      apis: true,
    },
    result: {
      importName: new Set(
        options.importName
          ? Array.isArray(options.importName)
            ? options.importName
            : [options.importName]
          : [
              'effector',
              'effector/compat',
              'effector-root',
              'effector-root/compat',
              'effector-logger',
              'trail/runtime',
              '@zerobias/effector',
            ],
      ),
      exportMetadata,
      storeCreators: new Set(options.storeCreators || defaults.store),
      eventCreators: new Set(options.eventCreators || defaults.event),
      effectCreators: new Set(options.effectCreators || defaults.effect),
      domainCreators: new Set(options.domainCreators || defaults.domain),
      restoreCreators: new Set(options.restoreCreators || defaults.restore),
      combineCreators: new Set(options.combineCreators || defaults.combine),
      sampleCreators: new Set(options.sampleCreators || defaults.sample),
      forwardCreators: new Set(options.forwardCreators || defaults.forward),
      guardCreators: new Set(options.guardCreators || defaults.guard),
      attachCreators: new Set(options.attachCreators || defaults.attach),
      splitCreators: new Set(options.splitCreators || defaults.split),
      apiCreators: new Set(options.apiCreators || defaults.createApi),
      domainMethods: readConfigShape(
        options.domainMethods,
        defaults.domainMethods,
      ),
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

  const fileProperty = property(t, 'file', fileNameIdentifier)
  const lineProperty = property(t, 'line', fileLineLiteral)
  const columnProperty = property(t, 'column', fileColumnLiteral)
  return t.objectExpression([fileProperty, lineProperty, columnProperty])
}
function setRestoreNameAfter(path, state, nameNodeId, t, {addLoc, compressor}) {
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
    if (!args[1]) return
    const oldConfig = args[2]
    const configExpr = (args[2] = t.objectExpression([]))

    const stableID = stringProperty(
      t,
      'sid',
      generateStableID(
        state.file.opts.root,
        state.filename,
        displayName,
        loc.line,
        loc.column,
        compressor,
      ),
    )

    if (oldConfig) {
      configExpr.properties.push(property(t, 'ɔ', oldConfig))
    }
    if (addLoc) {
      const locProp = property(
        t,
        'loc',
        makeTrace(state.fileNameIdentifier, loc.line, loc.column, t),
      )
      configExpr.properties.push(locProp)
    }
    if (displayName) {
      configExpr.properties.push(stringProperty(t, 'name', displayName))
    }
    configExpr.properties.push(stableID)
  }
}
function setStoreNameAfter(path, state, nameNodeId, t, {addLoc, compressor}) {
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
    const oldConfig = args[1]
    const configExpr = (args[1] = t.objectExpression([]))

    const stableID = stringProperty(
      t,
      'sid',
      generateStableID(
        state.file.opts.root,
        state.filename,
        displayName,
        loc.line,
        loc.column,
        compressor,
      ),
    )

    if (oldConfig) {
      configExpr.properties.push(property(t, 'ɔ', oldConfig))
    }
    if (addLoc) {
      const locProp = property(
        t,
        'loc',
        makeTrace(state.fileNameIdentifier, loc.line, loc.column, t),
      )
      configExpr.properties.push(locProp)
    }
    if (displayName) {
      configExpr.properties.push(stringProperty(t, 'name', displayName))
    }
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

    const stableID = stringProperty(
      t,
      'sid',
      generateStableID(
        state.file.opts.root,
        state.filename,
        displayName,
        loc.line,
        loc.column,
        compressor,
      ),
    )

    if (addLoc) {
      const locProp = property(
        t,
        'loc',
        makeTrace(state.fileNameIdentifier, loc.line, loc.column, t),
      )
      configExpr.properties.push(locProp)
    }
    if (displayName) {
      configExpr.properties.push(stringProperty(t, 'name', displayName))
    }
    configExpr.properties.push(stableID)
    args[0] = t.objectExpression([
      property(t, 'ɔ', commonArgs),
      property(t, 'config', configExpr),
    ])
  }
}

function setEventNameAfter(path, state, nameNodeId, t, {addLoc, compressor}) {
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
    const firstArgument = args[0]
    if (!firstArgument) {
      if (displayName) {
        args[0] = t.stringLiteral(displayName)
      }
    }
    const oldConfig = args[1]
    const configExpr = (args[firstArgument ? 1 : 0] = t.objectExpression([]))

    const stableID = stringProperty(
      t,
      'sid',
      generateStableID(
        state.file.opts.root,
        state.filename,
        displayName,
        loc.line,
        loc.column,
        compressor,
      ),
    )

    if (oldConfig) {
      configExpr.properties.push(property(t, 'ɔ', oldConfig))
    }
    if (addLoc) {
      const locProp = property(
        t,
        'loc',
        makeTrace(state.fileNameIdentifier, loc.line, loc.column, t),
      )
      configExpr.properties.push(locProp)
    }
    if (displayName) {
      configExpr.properties.push(stringProperty(t, 'name', displayName))
    }
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

function property(t, field, content) {
  return t.objectProperty(t.identifier(field), content)
}

function stringProperty(t, field, value) {
  return property(t, field, t.stringLiteral(value))
}
