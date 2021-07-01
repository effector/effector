import * as ts from 'typescript'
import {resolve, relative} from 'path'
import {
  existsSync,
  readFileSync,
  readdirSync,
  writeFileSync,
  watchFile,
} from 'fs'

const WATCH_CHANGES = true

const primeTargetDir = 'generated'
const debugTargetDir = 'gen2'
const currentTargetDir = primeTargetDir

/** dir with generated tests */
const OUTPUT_DIR = resolve(
  __dirname,
  '..',
  '..',
  '..',
  '__tests__',
  'effector',
  currentTargetDir,
)

const TS_CONFIG_PATH = resolve(__dirname, '..', '..', 'tsconfig.json')
const tsConfigRaw = JSON.parse(readFileSync(TS_CONFIG_PATH, 'utf8'))
const REPO_ROOT = resolve(__dirname, '..', '..', '..', '..', '..')
const EFFECTOR_TYPES = resolve(REPO_ROOT, 'packages', 'effector', 'index.d.ts')
const EFFECTOR_PACKAGE = resolve(
  REPO_ROOT,
  'packages',
  'effector',
  'package.json',
)
const REPO_NODE_MODULES = resolve(REPO_ROOT, 'node_modules')
const JEST_TYPES_DIR = resolve(REPO_ROOT, 'node_modules', '@types', 'jest')
const JEST_TYPES_FILE = resolve(
  REPO_ROOT,
  'node_modules',
  '@types',
  'jest',
  'index.d.ts',
)
const jestTypes = readFileSync(JEST_TYPES_FILE, 'utf8')
const tsConfig = (() => {
  const result: any = {}
  const config = tsConfigRaw.compilerOptions
  const notImplemented = () => {
    throw Error('not implemented')
  }
  function getResultValue(field: string, value: any) {
    switch (field) {
      case 'module':
        switch (value) {
          case 'ESNext':
            return ts.ModuleKind.ESNext
          case 'CommonJS':
            /** WARN option change */
            return ts.ModuleKind.ESNext
          // return ts.ModuleKind.CommonJS
          default:
            notImplemented()
        }
      case 'target':
        switch (value) {
          case 'esnext':
            return ts.ScriptTarget.ESNext
          case 'ES5':
            return ts.ScriptTarget.ES5
          default:
            notImplemented()
        }
      case 'moduleResolution':
        switch (value) {
          case 'node':
            return ts.ModuleResolutionKind.NodeJs
          default:
            notImplemented()
        }
      case 'lib':
        return value.map((lib: string) => `lib.${lib}.d.ts`)
      case 'jsx':
      default:
        return value
    }
  }
  for (const field in config) {
    result[field] = getResultValue(field, config[field])
  }
  return result
})()

function createWatcher() {
  function watch(rootFileNames: string[], options: ts.CompilerOptions) {
    const common = {
      getCurrentDirectory: () => OUTPUT_DIR,
      getDefaultLibFileName(options: ts.CompilerOptions) {
        // return 'index.d.ts'
        return ts.getDefaultLibFilePath(options)
      },
    }
    // Create the language service host to allow the LS to communicate with the host
    const servicesHost: ts.LanguageServiceHost = {
      getScriptFileNames: () => rootFileNames,
      getScriptVersion(fileName) {
        const absolutePath = resolve(OUTPUT_DIR, fileName)
        const record = fileList.find(e => e.path === absolutePath)
        // console.log({fileName, absolutePath, record})
        if (!record) {
          return '0'
        }
        return record.version.toString()
        // files[fileName] && files[fileName].version.toString(),
      },
      getScriptSnapshot(fileNameShort) {
        // if (fileNameShort.includes('esnext')) {
        //   fileNameShort = fileNameShort.replace(
        //     /\/esnext\..+$/g,
        //     '/lib.esnext.d.ts',
        //   )
        //   return ts.ScriptSnapshot.fromString(
        //     readFileSync(fileNameShort, 'utf8'),
        //   )
        // }
        const fileName = resolve(OUTPUT_DIR, fileNameShort)
        if (!existsSync(fileName)) {
          // console.error('no file', fileName)
          return undefined
        }
        const rawContent = readFileSync(fileName, 'utf8')
        if (fileNameShort.includes('/lib.'))
          return ts.ScriptSnapshot.fromString(rawContent)
        const content = [
          `/// <reference path="../../../../../node_modules/@types/jest/index.d.ts" />`,
          // `const typecheck = '{global}'`,
          rawContent
            .replace(/'effector'/gm, `'../../../../../packages/effector'`)
            .replace(/\@ts\-expect\-error/gm, ''),
        ].join(`\n`)
        return ts.ScriptSnapshot.fromString(content)
      },
      getCurrentDirectory: common.getCurrentDirectory,
      getCompilationSettings: () => tsConfig,
      getDefaultLibFileName: common.getDefaultLibFileName,
      fileExists(path) {
        if (path === JEST_TYPES_FILE || path === EFFECTOR_PACKAGE) return true
        if (fileList.some(e => e.path === path)) return true
        if (path.includes('node_modules') || path.includes('package.json'))
          return false
        return ts.sys.fileExists(path)
      },
      readFile(path, encoding) {
        if (path === JEST_TYPES_FILE) return jestTypes
        const result = ts.sys.readFile(path, encoding)
        return result
      },
      // getCustomTransformers() {
      //   return {
      //     before: [
      //       fac => {
      //         return node => {
      //           const statements = [...node.statements].map(stm => {
      //             if (ts.isImportDeclaration(stm)) {
      //               if (ts.isStringLiteral(stm.moduleSpecifier)) {
      //                 if (stm.moduleSpecifier.text === 'effector') {
      //                   console.log('found effector import')
      //                   const stmResult = fac.factory.updateImportDeclaration(
      //                     stm,
      //                     stm.decorators,
      //                     stm.modifiers,
      //                     stm.importClause,
      //                     fac.factory.createStringLiteral(
      //                       '../../../../../packages/effector',
      //                     ),
      //                   )
      //                   // console.log('stmResult', stmResult)
      //                   return stmResult
      //                 }
      //               }
      //             }
      //             return stm
      //           })
      //           statements.push(
      //             fac.factory.createExpressionStatement(
      //               fac.factory.createStringLiteral('nu ok'),
      //             ),
      //           )
      //           const result = fac.factory.updateSourceFile(
      //             node,
      //             statements,
      //             node.isDeclarationFile,
      //             node.referencedFiles,
      //             node.typeReferenceDirectives,
      //             node.hasNoDefaultLib,
      //             node.libReferenceDirectives,
      //           )
      //           console.log(result.getFullText(), result)
      //           fac
      //           return result
      //           // ts.visitEachChild(
      //           //   node,
      //           //   node => {
      //           //     if (ts.isImportDeclaration(node)) {
      //           //       if (ts.isStringLiteral(node.moduleSpecifier)) {
      //           //         if (node.moduleSpecifier.text === 'effector') {
      //           //           console.log('found effector import')
      //           //           return ts.factory.updateImportDeclaration(
      //           //             node,
      //           //             undefined,
      //           //             undefined,
      //           //             undefined,
      //           //             ts.factory.createStringLiteral(
      //           //               '../../../../../packages/effector',
      //           //             ),
      //           //           )
      //           //         }
      //           //       }
      //           //     }
      //           //     return node
      //           //   },
      //           //   fac,
      //           // )
      //           // return node
      //         }
      //       },
      //     ],
      //   }
      // },
      readDirectory(path, extension, exclude, include, depth) {
        console.log('readDirectory', {path, extension, exclude, include, depth})
        return ts.sys.readDirectory(path, extension, exclude, include, depth)
      },
      directoryExists(name) {
        if (name === JEST_TYPES_DIR) return true
        if (name.includes('node_modules')) return false
        return ts.sys.directoryExists(name)
      },
      getDirectories(path) {
        console.log('getDirectories', path)
        return ts.sys.getDirectories(path)
      },
      // resolveModuleNames,
      // isKnownTypesPackageName(name) {
      //   console.log('isKnownTypesPackageName', name)
      //   if (name === 'effector') return true
      //   return false
      // },
    }
    // ts.createLanguageServiceSourceFile
    // Create the language service files
    const services = ts.createLanguageService(
      servicesHost,
      ts.createDocumentRegistry(),
    )

    // Now const's watch the files
    rootFileNames.forEach(fileNameShort => {
      const fileName = resolve(OUTPUT_DIR, fileNameShort)
      // First time around, emit all files
      logErrors(fileName, fileNameShort)
      if (WATCH_CHANGES) {
        watchFile(fileName, {persistent: true, interval: 250}, (curr, prev) => {
          // Check timestamp
          if (+curr.mtime <= +prev.mtime) {
            return
          }
          // Update the version to signal a change in the file
          const item = fileList.find(e => e.path === fileName)!
          // console.log({item, fileName})
          try {
            item.version++
          } catch (err) {
            console.error(err)
          }
          // write the changes to disk
          logErrors(fileName, fileNameShort)
        })
      }
    })

    function logErrors(fileName: string, fileNameShort: string) {
      const allDiagnostics = services
        .getCompilerOptionsDiagnostics()
        .concat(services.getSyntacticDiagnostics(fileName))
        .concat(services.getSemanticDiagnostics(fileName))
      allDiagnostics.forEach(diagnostic => {
        printDiag(diagnostic)
      })
      if (allDiagnostics.length === 0) {
        console.log(`no errors in file ${fileNameShort}`)
      }
    }
    function printDiag(diagnostic: ts.Diagnostic) {
      const message = ts.flattenDiagnosticMessageText(
        diagnostic.messageText,
        '\n',
      )
      if (message.includes(`Unused '@ts-expect-error' directive.`)) return
      if (message.includes(`implicitly has an 'any' type`)) return

      if (diagnostic.file) {
        /** added lines for library reference */
        const CHANGED_FILE_OFFSET = 1
        const {line, character} = diagnostic.file.getLineAndCharacterOfPosition(
          diagnostic.start!,
        )
        console.log(
          `TS${diagnostic.code} ${diagnostic.file.fileName} (${line +
            1 -
            CHANGED_FILE_OFFSET},${character + 1}): ${message}`,
        )
      } else {
        console.log(`TS${diagnostic.code} ${message}`)
      }
      // console.log(diagnostic)
    }
  }

  // Initialize files constituting the program as all .ts files in the current directory
  const currentDirectoryFiles = readdirSync(OUTPUT_DIR).filter(
    fileName =>
      fileName.length >= 3 && fileName.substr(fileName.length - 3, 3) === '.ts',
  )
  console.log('currentDirectoryFiles', currentDirectoryFiles)
  const fileList = currentDirectoryFiles.map(fileNameShort => {
    const fileName = resolve(OUTPUT_DIR, fileNameShort)
    // const content = readFileSync(fileName, 'utf8')
    return {
      file: fileNameShort,
      path: fileName,
      // content,
      version: 0,
    }
  })
  fileList.push({
    file: 'effector',
    path: EFFECTOR_TYPES,
    // content: readFileSync(EFFECTOR_TYPES, 'utf8'),
    version: 0,
  })
  // Start the watcher
  watch(currentDirectoryFiles, tsConfig)
}

createWatcher()
