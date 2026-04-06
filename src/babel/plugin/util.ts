import type {NodePath} from '@babel/traverse'
import type {PluginPass} from '@babel/core'
import type {
  Identifier,
  Expression,
  PatternLike,
  Program,
  CallExpression,
  ImportSpecifier,
} from '@babel/types'

import type {
  ImportNamesMap,
  MethodParser,
  PluginState,
  SmallConfig,
} from './types'

export const REGION_NAME = '_internalHMRRegion'

export function addFileNameIdentifier(
  addLoc: boolean,
  enableFileName: boolean,
  t: typeof import('@babel/types'),
  path: NodePath<any>,
  state: PluginPass,
) {
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

export function addImport(
  t: typeof import('@babel/types'),
  path: NodePath<any>,
  method: 'withFactory' | 'clearNode' | 'createNode' | 'withRegion',
  importNamesMap: ImportNamesMap,
) {
  if (importNamesMap[method] !== null) {
    return importNamesMap[method]!
  }
  const programPath = findProgramPath(path)
  const uid = programPath.scope.generateUidIdentifier(method)
  const specifier = t.importSpecifier(uid, t.identifier(method))
  if (importNamesMap.importDeclaration === null) {
    const importDeclaration = t.importDeclaration(
      [specifier],
      t.stringLiteral('effector'),
    )
    const [importPath] = programPath.unshiftContainer('body', importDeclaration)
    importNamesMap.importDeclaration = importDeclaration
    importNamesMap.importDeclarationPath = importPath
  } else {
    importNamesMap.importDeclaration.specifiers.push(specifier)
  }
  importNamesMap[method] = uid.name
  return uid.name
}

export function getImportedName(
  t: typeof import('@babel/types'),
  node: ImportSpecifier,
) {
  return t.isIdentifier(node.imported)
    ? node.imported.name
    : node.imported.value
}

export function applyMethodParsers(
  methodParsers: MethodParser[],
  path: NodePath<any>,
  state: PluginState,
  name: string,
) {
  for (let i = 0; i < methodParsers.length; i++) {
    const {flag, set, fn} = methodParsers[i]
    if (flag && set.has(name)) {
      fn(path, state, name, findCandidateNameForExpression(path))
    }
  }
}

export function findCandidateNameForExpression(
  path: NodePath<any>,
): Identifier {
  let id: Identifier | undefined
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
    return false
  })
  return id!
}

export function makeTrace(
  fileNameIdentifier: Identifier,
  lineNumber: number,
  columnNumber: number,
  t: typeof import('@babel/types'),
) {
  const fileLineLiteral = t.numericLiteral(lineNumber != null ? lineNumber : -1)
  const fileColumnLiteral = t.numericLiteral(
    columnNumber != null ? columnNumber : -1,
  )

  const fileProperty = property(t, 'file', fileNameIdentifier)
  const lineProperty = property(t, 'line', fileLineLiteral)
  const columnProperty = property(t, 'column', fileColumnLiteral)
  return t.objectExpression([fileProperty, lineProperty, columnProperty])
}

function findLocArgs(path: NodePath) {
  let loc: {line: number; column: number} | undefined
  let args: CallExpression['arguments'] | undefined
  path.find(path => {
    if (path.isCallExpression()) {
      args = path.node.arguments
      loc = path.node.loc?.start
      return true
    }
    return false
  })
  return {args, loc}
}

export function setRestoreNameAfter(
  path: NodePath,
  state: PluginState,
  nameNodeId: Identifier | null,
  t: typeof import('@babel/types'),
  {addLoc, addNames, debugSids}: SmallConfig,
  checkBindingName?: string,
) {
  const displayName = nameNodeId ? nameNodeId.name : ''
  if (isLocalVariable(path, checkBindingName)) return
  const {args, loc} = findLocArgs(path)

  if (args!) {
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
        loc!.line,
        loc!.column,
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
        makeTrace(state.fileNameIdentifier!, loc!.line, loc!.column, t),
      )
      configExpr.properties.push(locProp)
    }
    if (displayName && addNames) {
      configExpr.properties.push(stringProperty(t, 'name', displayName))
    }
    configExpr.properties.push(stableID)
  }
}

export function setStoreNameAfter(
  path: NodePath,
  state: PluginState,
  nameNodeId: Identifier | null,
  t: typeof import('@babel/types'),
  {addLoc, addNames, debugSids}: SmallConfig,
  fillFirstArg: boolean,
  checkBindingName?: string,
) {
  const displayName = nameNodeId ? nameNodeId.name : ''
  if (isLocalVariable(path, checkBindingName)) return
  const {args, loc} = findLocArgs(path)

  if (args!) {
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
        loc!.line,
        loc!.column,
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
        makeTrace(state.fileNameIdentifier!, loc!.line, loc!.column, t),
      )
      configExpr.properties.push(locProp)
    }
    if (displayName && addNames) {
      configExpr.properties.push(stringProperty(t, 'name', displayName))
    }
    configExpr.properties.push(stableID)
  }
}

export function isLocalVariable(
  path: NodePath,
  checkBindingName: string | undefined,
) {
  if (!checkBindingName) return false
  const binding = path.scope.getBinding(checkBindingName)
  if (binding) return binding.kind !== 'module'
  return false
}

export function setConfigForConfMethod(
  path: NodePath,
  state: PluginState,
  nameNodeId: Identifier | null,
  t: typeof import('@babel/types'),
  {addLoc, addNames, debugSids}: SmallConfig,
  singleArgument: boolean,
  checkBindingName?: string,
  allowEmptyArguments?: boolean,
) {
  const displayName = nameNodeId ? nameNodeId.name : ''
  if (isLocalVariable(path, checkBindingName)) return
  const {args, loc} = findLocArgs(path)

  if (args!) {
    if (!args[0] && !allowEmptyArguments) return
    const commonArgs = singleArgument
      ? args[0]
      : t.arrayExpression(args.slice())
    args.length = 0
    const configExpr = t.objectExpression([])

    const stableID = stringProperty(
      t,
      'sid',
      generateStableID(
        state.file.opts.root,
        state.filename,
        displayName,
        loc!.line,
        loc!.column,
        debugSids,
      ),
    )

    if (addLoc) {
      const locProp = property(
        t,
        'loc',
        makeTrace(state.fileNameIdentifier!, loc!.line, loc!.column, t),
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

export function setEventNameAfter(
  path: NodePath,
  state: PluginState,
  nameNodeId: Identifier | null,
  t: typeof import('@babel/types'),
  {addLoc, addNames, debugSids}: SmallConfig,
  checkBindingName?: string,
) {
  const displayName = nameNodeId ? nameNodeId.name : ''
  if (isLocalVariable(path, checkBindingName)) return
  const {args, loc} = findLocArgs(path)

  if (args!) {
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
        loc!.line,
        loc!.column,
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
        makeTrace(state.fileNameIdentifier!, loc!.line, loc!.column, t),
      )
      configExpr.properties.push(locProp)
    }
    if (displayName && addNames) {
      configExpr.properties.push(stringProperty(t, 'name', displayName))
    }
    configExpr.properties.push(stableID)
  }
}

export function rememberLocalName(
  importedName: string,
  localName: string,
  creatorsList: Set<string>[],
) {
  for (const creators of creatorsList) {
    if (creators.has(importedName)) {
      creators.add(localName)
      return
    }
  }
}

export function normalizeSource(
  source: string,
  rootPath: string,
  state: PluginState,
) {
  let normalizedSource = source
  if (normalizedSource.startsWith('.')) {
    const {resolve, parse} = require('path')
    const currentFile = state.filename || ''
    const {dir} = parse(currentFile)
    const resolvedImport = resolve(dir, normalizedSource)
    normalizedSource = stripRoot(rootPath, resolvedImport, true)
  }
  return stripExtension(normalizedSource)
}

export function stripExtension(path: string) {
  const {extname} = require('path')
  const ext = extname(path)
  if (ext.length > 0) {
    path = path.slice(0, -ext.length)
  }
  return path
}

export function stripRoot(
  babelRoot: string | null | undefined,
  fileName: string | undefined,
  omitFirstSlash: boolean,
) {
  const {sep, normalize} = require('path')
  const rawPath = (fileName || '').replace(babelRoot || '', '')
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
export function generateStableID(
  babelRoot: string | null | undefined,
  fileName: string | undefined,
  varName: string,
  line: number,
  column: number,
  debugSids: boolean,
) {
  const normalizedPath = stripRoot(babelRoot, fileName, false)
  const appendix = debugSids ? `:${normalizedPath}:${varName}` : ''
  return (
    hashCode(`${varName} ${normalizedPath} [${line}, ${column}]`) + appendix
  )
}

function hashCode(s: string) {
  let h = 0
  let i = 0
  if (s.length > 0)
    while (i < s.length) h = ((h << 5) - h + s.charCodeAt(i++)) | 0
  return h.toString(36)
}

export function property(
  t: typeof import('@babel/types'),
  field: string,
  content: Expression | PatternLike,
) {
  return t.objectProperty(t.identifier(field), content)
}

function stringProperty(
  t: typeof import('@babel/types'),
  field: string,
  value: string,
) {
  return property(t, field, t.stringLiteral(value))
}

export function findProgramPath(path: NodePath<any>) {
  return path.find(path => path.isProgram())! as NodePath<Program>
}
