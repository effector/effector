import * as ts from 'typescript'
import {resolve, relative} from 'path'
import {
  existsSync,
  readFileSync,
  readdirSync,
  writeFileSync,
  watchFile,
} from 'fs'
import {JsonOutput} from './types'
import {jsonOutputToAnnotatedFile} from './generateFile'

const WATCH_CHANGES = true
const WATCH_GENERATED = true

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
const tsConfigRaw: any = {
  compilerOptions: {
    strictNullChecks: true,
    module: 'CommonJS',
    target: 'esnext',
    jsx: 'react',
    allowJs: true,
    strict: true,
    allowSyntheticDefaultImports: true,
    moduleResolution: 'node',
    resolveJsonModule: true,
    lib: ['esnext', 'es2019'],
    baseUrl: './',
    paths: {
      effector: ['packages/effector/index.d.ts'],
    },
  },
  exclude: [],
}

//JSON.parse(readFileSync(TS_CONFIG_PATH, 'utf8'))
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
  function notImplemented() {
    throw Error('not implemented')
  }
})()

function watchVirtual() {
  const TEST_FILE = 'virtual.test.ts'
  const TEST_FILE_PATH = resolve(REPO_ROOT, TEST_FILE)
  const REAL_JSON = resolve(__dirname, '..', '..', '..', 'jsonOutput.json')
  const fileList = [
    {
      file: TEST_FILE,
      path: TEST_FILE_PATH,
      version: 0,
    },
    {
      file: 'effector',
      path: EFFECTOR_TYPES,
      version: 0,
    },
  ]
  let annots: {
    fromLine: number
    toLine: number
    group: number
    caseItem: number
  }[] = []
  let jsonOut: JsonOutput
  let ouptutContent: string = ''
  const services = ts.createLanguageService(
    {
      getScriptFileNames: () => [TEST_FILE],
      getScriptVersion(fileName) {
        const absolutePath = resolve(REPO_ROOT, fileName)
        const record = fileList.find(e => e.path === absolutePath)
        if (!record) {
          return '0'
        }
        return record.version.toString()
      },
      getScriptSnapshot(fileNameShort) {
        const isVirtual = fileNameShort === TEST_FILE
        const fileName = resolve(REPO_ROOT, fileNameShort)
        if (!isVirtual && !existsSync(fileName)) {
          // console.error('no file', fileName)
          return undefined
        }
        let rawContent: string
        if (isVirtual) {
          const jsonOutput: JsonOutput = JSON.parse(
            readFileSync(REAL_JSON, 'utf8'),
          )
          jsonOut = jsonOutput
          const {file, annotations} = jsonOutputToAnnotatedFile(jsonOutput)
          annots = annotations
          rawContent = file
          ouptutContent = file
          writeFileSync(resolve(__dirname, '..', '..', 'out.gen.ts'), file)
        } else {
          rawContent = readFileSync(fileName, 'utf8')
        }

        if (fileNameShort.includes('/lib.'))
          return ts.ScriptSnapshot.fromString(rawContent)
        const content = [
          // `/// <reference path="../../../../../node_modules/@types/jest/index.d.ts" />`,
          rawContent
            // .replace(/'effector'/gm, `'../../../../../packages/effector'`)
            .replace(/\@ts\-expect\-error/gm, ''),
        ].join(`\n`)
        return ts.ScriptSnapshot.fromString(content)
      },
      getCurrentDirectory: () => REPO_ROOT,
      getCompilationSettings: () => tsConfig,
      getDefaultLibFileName(options: ts.CompilerOptions) {
        return ts.getDefaultLibFilePath(options)
      },
      fileExists(path) {
        if (
          path === JEST_TYPES_FILE ||
          path === EFFECTOR_PACKAGE ||
          TEST_FILE_PATH
        )
          return true
        if (fileList.some(e => e.path === path)) return true
        // if (path.includes('node_modules') || path.includes('package.json'))
        //   return false
        return ts.sys.fileExists(path)
      },
      readFile(path, encoding) {
        if (path === JEST_TYPES_FILE) return jestTypes
        if (path === TEST_FILE_PATH) return ouptutContent
        const result = ts.sys.readFile(path, encoding)
        return result
      },
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
    },
    ts.createDocumentRegistry(),
  )
  logErrors(TEST_FILE_PATH, TEST_FILE)
  if (WATCH_GENERATED) {
    watchFile(
      TEST_FILE_PATH,
      {persistent: true, interval: 250},
      (curr, prev) => {
        if (+curr.mtime <= +prev.mtime) {
          return
        }
        const item = fileList.find(e => e.path === TEST_FILE_PATH)!
        try {
          item.version++
        } catch (err) {
          console.error(err)
        }
        logErrors(TEST_FILE_PATH, TEST_FILE)
      },
    )
  }

  function logErrors(fileName: string, fileNameShort: string) {
    const allDiagnostics = services
      .getCompilerOptionsDiagnostics()
      .concat(services.getSyntacticDiagnostics(fileName))
      .concat(services.getSemanticDiagnostics(fileName))
    allDiagnostics.forEach(diagnostic => {
      const message = ts.flattenDiagnosticMessageText(
        diagnostic.messageText,
        '\n',
      )
      if (message.includes(`Unused '@ts-expect-error' directive.`)) return
      if (message.includes(`implicitly has an 'any' type`)) return

      if (diagnostic.file) {
        /** added lines for library reference */
        const CHANGED_FILE_OFFSET = 0
        const {line, character} = diagnostic.file.getLineAndCharacterOfPosition(
          diagnostic.start!,
        )
        const lineReal = line + 1 - CHANGED_FILE_OFFSET
        const annot = annots.find(
          ann => ann.fromLine <= lineReal && ann.toLine >= lineReal,
        )!

        if (annot) {
          const result = jsonOut.groups[annot.group].caseItems[annot.caseItem]
          if (result.pass) {
            console.warn('unexpected error in case', result)
            console.log(
              `TS${diagnostic.code}(${lineReal},${character + 1}): ${message}`,
            )
          }
        } else {
          console.log(
            `TS${diagnostic.code} ${
              diagnostic.file.fileName
            } (${lineReal},${character + 1}): ${message}`,
          )
        }
      } else {
        console.log(`TS${diagnostic.code} ${message}`)
      }
      // console.log(diagnostic)
    })
    if (allDiagnostics.length === 0) {
      console.log(`no errors in file ${fileNameShort}`)
    }
  }
}

function createWatcher() {
  function watch(rootFileNames: string[]) {
    const servicesHost: ts.LanguageServiceHost = {
      getScriptFileNames: () => rootFileNames,
      getScriptVersion(fileName) {
        const absolutePath = resolve(OUTPUT_DIR, fileName)
        const record = fileList.find(e => e.path === absolutePath)
        if (!record) {
          return '0'
        }
        return record.version.toString()
      },
      getScriptSnapshot(fileNameShort) {
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
          rawContent
            // .replace(/'effector'/gm, `'../../../../../packages/effector'`)
            .replace(/\@ts\-expect\-error/gm, ''),
        ].join(`\n`)
        return ts.ScriptSnapshot.fromString(content)
      },
      getCurrentDirectory: () => OUTPUT_DIR,
      getCompilationSettings: () => tsConfig,
      getDefaultLibFileName(options: ts.CompilerOptions) {
        return ts.getDefaultLibFilePath(options)
      },
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
    const services = ts.createLanguageService(
      servicesHost,
      ts.createDocumentRegistry(),
    )

    rootFileNames.forEach(fileNameShort => {
      const fileName = resolve(OUTPUT_DIR, fileNameShort)
      logErrors(fileName, fileNameShort)
      if (WATCH_CHANGES) {
        watchFile(fileName, {persistent: true, interval: 250}, (curr, prev) => {
          if (+curr.mtime <= +prev.mtime) {
            return
          }
          const item = fileList.find(e => e.path === fileName)!
          try {
            item.version++
          } catch (err) {
            console.error(err)
          }
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
        const message = ts.flattenDiagnosticMessageText(
          diagnostic.messageText,
          '\n',
        )
        if (message.includes(`Unused '@ts-expect-error' directive.`)) return
        if (message.includes(`implicitly has an 'any' type`)) return

        if (diagnostic.file) {
          /** added lines for library reference */
          const CHANGED_FILE_OFFSET = 1
          const {
            line,
            character,
          } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!)
          console.log(
            `TS${diagnostic.code} ${diagnostic.file.fileName} (${line +
              1 -
              CHANGED_FILE_OFFSET},${character + 1}): ${message}`,
          )
        } else {
          console.log(`TS${diagnostic.code} ${message}`)
        }
        // console.log(diagnostic)
      })
      if (allDiagnostics.length === 0) {
        console.log(`no errors in file ${fileNameShort}`)
      }
    }
  }

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
  watch(currentDirectoryFiles)
}

// createWatcher()
watchVirtual()
