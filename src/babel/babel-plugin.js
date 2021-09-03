module.exports = function (babel, options = {}) {
  const {
    addNames,
    addLoc,
    debugSids,
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
    merges,
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
    mergeCreators,
    domainMethods,
    factories,
    importName,
    reactSsr,
  } = normalizeOptions(options)
  const factoriesUsed = factories.length > 0
  const hasRelativeFactories = factories.some(
    fab => fab.startsWith('./') || fab.startsWith('../'),
  )
  const smallConfig = {addLoc, addNames, debugSids}
  const {types: t, template} = babel
  let factoryTemplate
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
    mergeCreators,
  ]
  const methodParsers = [
    {
      flag: stores,
      set: storeCreators,
      fn: (path, state, name, id) =>
        setStoreNameAfter(path, state, id, t, smallConfig, false),
    },
    {
      flag: events,
      set: eventCreators,
      fn: (path, state, name, id) =>
        setEventNameAfter(path, state, id, t, smallConfig),
    },
    {
      flag: effects,
      set: effectCreators,
      fn: (path, state, name, id) =>
        setEventNameAfter(path, state, id, t, smallConfig),
    },
    {
      flag: domains,
      set: domainCreators,
      fn: (path, state, name, id) =>
        setEventNameAfter(path, state, id, t, smallConfig),
    },
    {
      flag: restores,
      set: restoreCreators,
      fn: (path, state, name, id) =>
        setRestoreNameAfter(path, state, id, t, smallConfig),
    },
    {
      flag: combines,
      set: combineCreators,
      fn: (path, state, name, id) =>
        setConfigForConfMethod(path, state, id, t, smallConfig, false, name),
    },
    {
      flag: samples,
      set: sampleCreators,
      fn: (path, state, name, id) =>
        setConfigForConfMethod(path, state, id, t, smallConfig, false),
    },
    {
      flag: forwards,
      set: forwardCreators,
      fn: (path, state, name, id) =>
        setConfigForConfMethod(path, state, id, t, smallConfig, true),
    },
    {
      flag: guards,
      set: guardCreators,
      fn: (path, state, name, id) =>
        setConfigForConfMethod(path, state, id, t, smallConfig, false, name),
    },
    {
      flag: attaches,
      set: attachCreators,
      fn: (path, state, name, id) =>
        setConfigForConfMethod(path, state, id, t, smallConfig, true, name),
    },
    {
      flag: splits,
      set: splitCreators,
      fn: (path, state, name, id) =>
        setConfigForConfMethod(path, state, null, t, smallConfig, false, name),
    },
    {
      flag: apis,
      set: apiCreators,
      fn: (path, state, name, id) =>
        setConfigForConfMethod(path, state, null, t, smallConfig, false),
    },
    {
      flag: merges,
      set: mergeCreators,
      fn: (path, state, name, id) =>
        setStoreNameAfter(path, state, id, t, smallConfig, false, name),
    },
  ]
  const domainMethodParsers = [
    {
      flag: stores,
      set: domainMethods.store,
      fn: (path, state, name, id) =>
        setStoreNameAfter(path, state, id, t, smallConfig, false),
    },
    {
      flag: events,
      set: domainMethods.event,
      fn: (path, state, name, id) =>
        setEventNameAfter(path, state, id, t, smallConfig),
    },
    {
      flag: effects,
      set: domainMethods.effect,
      fn: (path, state, name, id) =>
        setEventNameAfter(path, state, id, t, smallConfig),
    },
    {
      flag: domains,
      set: domainMethods.domain,
      fn: (path, state, name, id) =>
        setEventNameAfter(path, state, id, t, smallConfig),
    },
  ]
  function addImport(path, method) {
    const programPath = path.find(path => path.isProgram())
    const [newPath] = programPath.unshiftContainer(
      'body',
      t.importDeclaration(
        [
          t.importSpecifier(
            programPath.scope.generateUidIdentifier(method),
            t.identifier(method),
          ),
        ],
        t.stringLiteral('effector'),
      ),
    )
    let found

    newPath.get('specifiers').forEach(specifier => {
      if (specifier.node.imported.name === method) {
        found = specifier
      }
    })

    programPath.scope.registerBinding('module', found)
    return found.node.local.name
  }
  const importVisitor = {
    ImportDeclaration(path, state) {
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
          } else if (mergeCreators.has(importedName)) {
            mergeCreators.add(localName)
          }
        }
      } else {
        for (let i = 0; i < specifiers.length; i++) {
          const s = specifiers[i]
          const isDefaultImport = t.isImportDefaultSpecifier(s)
          if (!s.imported && !isDefaultImport) continue
          const localName = s.local.name
          if (creatorsList.some(set => set.has(localName))) {
            this.effector_ignoredImports.add(localName)
          }
        }
      }
      if (reactSsr) {
        if (source === 'effector-react' || source === 'effector-react/compat') {
          path.node.source.value = 'effector-react/scope'
        }
      }
      if (factoriesUsed) {
        const rootPath = state.file.opts.root || ''
        if (!this.effector_factoryPaths) {
          if (hasRelativeFactories) {
            const {resolve} = require('path')
            this.effector_factoryPaths = factories.map(fab => {
              if (fab.startsWith('./') || fab.startsWith('../')) {
                const resolvedFab = resolve(rootPath, fab)
                return stripRoot(rootPath, resolvedFab, true)
              }
              return fab
            })
          } else {
            this.effector_factoryPaths = factories
          }
        }
        let normalizedSource = source
        if (normalizedSource.startsWith('.')) {
          const {resolve, parse} = require('path')
          const currentFile = state.filename || ''
          const {dir} = parse(currentFile)
          const resolvedImport = resolve(dir, normalizedSource)
          normalizedSource = stripRoot(rootPath, resolvedImport, true)
        }
        normalizedSource = stripExtension(normalizedSource)
        if (this.effector_factoryPaths.includes(normalizedSource)) {
          this.effector_needFactoryImport = true
          if (!this.effector_factoryMap) {
            this.effector_factoryMap = new Map()
            if (!factoryTemplate) {
              let tpl
              factoryTemplate = template(
                addLoc
                  ? 'FACTORY({sid: SID,fn:()=>FN,name:NAME,method:METHOD,loc:LOC})'
                  : addNames
                  ? 'FACTORY({sid: SID,fn:()=>FN,name:NAME,method:METHOD})'
                  : 'FACTORY({sid: SID,fn:()=>FN})',
              )
            }
          }
          for (let i = 0; i < specifiers.length; i++) {
            const s = specifiers[i]
            const isDefaultImport = t.isImportDefaultSpecifier(s)
            if (!s.imported && !isDefaultImport) continue
            const importedName = isDefaultImport ? 'default' : s.imported.name
            const localName = s.local.name
            this.effector_factoryMap.set(localName, {
              localName,
              importedName,
              source: normalizedSource,
            })
          }
        }
      }
    },
  }
  function applyMethodParsers(methodParsers, path, state, name) {
    for (let i = 0; i < methodParsers.length; i++) {
      const {flag, set, fn} = methodParsers[i]
      if (flag && set.has(name)) {
        fn(path, state, name, findCandidateNameForExpression(path))
      }
    }
  }
  const plugin = {
    name: 'effector/babel-plugin',
    pre() {
      this.effector_ignoredImports = new Set()
      this.effector_withFactoryName = null
    },
    post() {
      this.effector_ignoredImports.clear()
      this.effector_needFactoryImport = false
      this.effector_factoryImportAdded = false
      this.effector_withFactoryName = null
      if (this.effector_factoryMap) {
        this.effector_factoryMap.clear()
        delete this.effector_factoryMap
      }
      if (this.effector_factoryPaths) {
        delete this.effector_factoryPaths
      }
    },
    visitor: {
      Program: {
        enter(path, state) {
          path.traverse(importVisitor, state)
        },
      },

      CallExpression(path, state) {
        addFileNameIdentifier(addLoc, enableFileName, t, path, state)

        if (t.isIdentifier(path.node.callee)) {
          const name = path.node.callee.name
          if (!this.effector_ignoredImports.has(name)) {
            applyMethodParsers(methodParsers, path, state, name)
          }
          if (
            factoriesUsed &&
            this.effector_factoryMap &&
            !path.node.effector_isFactory &&
            this.effector_factoryMap.has(name)
          ) {
            if (!this.effector_factoryImportAdded) {
              this.effector_factoryImportAdded = true
              this.effector_withFactoryName = addImport(path, 'withFactory')
            }
            const {source, importedName, localName} =
              this.effector_factoryMap.get(name)
            path.node.effector_isFactory = true
            const idNode = findCandidateNameForExpression(path)
            const resultName = idNode ? idNode.name : ''
            let loc
            path.find(path => {
              if (path.isCallExpression()) {
                loc = path.node.loc.start
                return true
              }
            })
            const sid = generateStableID(
              state.file.opts.root,
              state.filename,
              resultName,
              loc.line,
              loc.column,
              debugSids,
            )
            const factoryConfig = {
              SID: JSON.stringify(sid),
              FN: path.node,
              FACTORY: this.effector_withFactoryName,
            }
            if (addLoc || addNames) {
              factoryConfig.NAME = JSON.stringify(
                !resultName || resultName === '' ? 'none' : resultName,
              )
              factoryConfig.METHOD = JSON.stringify(importedName)
            }
            if (addLoc) {
              factoryConfig.LOC = makeTrace(
                state.fileNameIdentifier,
                loc.line,
                loc.column,
                t,
              )
            }
            path.replaceWith(factoryTemplate(factoryConfig))
          }
        }

        if (t.isMemberExpression(path.node.callee)) {
          applyMethodParsers(
            domainMethodParsers,
            path,
            state,
            path.node.callee.property.name,
          )
        }
      },
    },
  }
  return plugin
}
function addFileNameIdentifier(addLoc, enableFileName, t, path, state) {
  if (addLoc && !state.fileNameIdentifier) {
    const fileName = enableFileName
      ? stripRoot(state.file.opts.root || '', state.filename || '', false)
      : ''

    const fileNameIdentifier =
      path.scope.generateUidIdentifier('_effectorFileName')
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
        merge: [],
        domainMethods: {
          store: [],
          event: [],
          effect: [],
          domain: [],
        },
        factories: [],
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
        merge: ['merge'],
        domainMethods: {
          store: ['store', 'createStore'],
          event: ['event', 'createEvent'],
          effect: ['effect', 'createEffect'],
          domain: ['domain', 'createDomain'],
        },
        factories: [],
      }
  return readConfigFlags({
    options,
    properties: {
      reactSsr: false,
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
      merges: true,
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
              '@effector/effector',
            ],
      ),
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
      mergeCreators: new Set(options.mergeCreators || defaults.merge),
      domainMethods: readConfigShape(
        options.domainMethods,
        defaults.domainMethods,
      ),
      factories: (options.factories || defaults.factories).map(stripExtension),
      addLoc: Boolean(options.addLoc),
      debugSids: Boolean(options.debugSids),
      addNames:
        typeof options.addNames !== 'undefined'
          ? Boolean(options.addNames)
          : true,
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
function setRestoreNameAfter(path, state, nameNodeId, t, {addLoc, addNames, debugSids}) {
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
        debugSids,
      ),
    )

    if (oldConfig) {
      configExpr.properties.push(property(t, 'and', oldConfig))
    }
    if (addLoc) {
      const locProp = property(
        t,
        'loc',
        makeTrace(state.fileNameIdentifier, loc.line, loc.column, t),
      )
      configExpr.properties.push(locProp)
    }
    if (displayName && addNames) {
      configExpr.properties.push(stringProperty(t, 'name', displayName))
    }
    configExpr.properties.push(stableID)
  }
}
function setStoreNameAfter(
  path,
  state,
  nameNodeId,
  t,
  {addLoc, addNames, debugSids},
  fillFirstArg,
  checkBindingName,
) {
  const displayName = nameNodeId ? nameNodeId.name : ''
  if (isLocalVariable(path, checkBindingName)) return
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
    if (!args[0]) {
      if (!fillFirstArg) return
      args[0] = t.nullLiteral()
    }
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
        debugSids,
      ),
    )

    if (oldConfig) {
      configExpr.properties.push(property(t, 'and', oldConfig))
    }
    if (addLoc) {
      const locProp = property(
        t,
        'loc',
        makeTrace(state.fileNameIdentifier, loc.line, loc.column, t),
      )
      configExpr.properties.push(locProp)
    }
    if (displayName && addNames) {
      configExpr.properties.push(stringProperty(t, 'name', displayName))
    }
    configExpr.properties.push(stableID)
  }
}
function isLocalVariable(path, checkBindingName) {
  if (!checkBindingName) return false
  const binding = path.scope.getOwnBinding(checkBindingName)
  if (binding) {
    const module = binding.path.find(path => path.isImportDeclaration())
    return !module
  }
  return false
}
function setConfigForConfMethod(
  path,
  state,
  nameNodeId,
  t,
  {addLoc, addNames, debugSids},
  singleArgument,
  checkBindingName,
) {
  const displayName = nameNodeId ? nameNodeId.name : ''
  if (isLocalVariable(path, checkBindingName)) return
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
        debugSids,
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
    if (displayName && addNames) {
      configExpr.properties.push(stringProperty(t, 'name', displayName))
    }
    configExpr.properties.push(stableID)
    args[0] = t.objectExpression([
      property(t, 'and', commonArgs),
      property(t, 'or', configExpr),
    ])
  }
}

function setEventNameAfter(path, state, nameNodeId, t, {addLoc, addNames, debugSids}) {
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
        debugSids,
      ),
    )

    if (oldConfig) {
      configExpr.properties.push(property(t, 'and', oldConfig))
    }
    if (addLoc) {
      const locProp = property(
        t,
        'loc',
        makeTrace(state.fileNameIdentifier, loc.line, loc.column, t),
      )
      configExpr.properties.push(locProp)
    }
    if (displayName && addNames) {
      configExpr.properties.push(stringProperty(t, 'name', displayName))
    }
    configExpr.properties.push(stableID)
  }
}
function stripExtension(path) {
  const {extname} = require('path')
  const ext = extname(path)
  if (ext.length > 0) {
    path = path.slice(0, -ext.length)
  }
  return path
}
function stripRoot(babelRoot, fileName, omitFirstSlash) {
  const {sep, normalize} = require('path')
  const rawPath = fileName.replace(babelRoot, '')
  let normalizedSeq = normalize(rawPath).split(sep)
  if (omitFirstSlash && normalizedSeq.length > 0 && normalizedSeq[0] === '') {
    normalizedSeq = normalizedSeq.slice(1)
  }
  const normalizedPath = normalizedSeq.join('/')
  return normalizedPath
}
/**
 * "foo src/index.js [12,30]"
 */
function generateStableID(babelRoot, fileName, varName, line, column, debugSids) {
  const normalizedPath = stripRoot(babelRoot, fileName, false)
  const appendix = debugSids ? `:${normalizedPath}:${varName}` : ''
  return hashCode(`${varName} ${normalizedPath} [${line}, ${column}]`) + appendix
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
