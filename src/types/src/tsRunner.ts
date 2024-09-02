import * as ts from 'typescript'
import {promises as fs} from 'fs'
import {resolve, relative} from 'path'

function createCompilerHost({
  options,
  testFiles,
  declarations,
}: {
  options: ts.CompilerOptions
  testFiles: Array<{
    name: string
    code: string
  }>
  declarations: Array<{
    name: string
    fileName: string
    code: string
  }>
}): ts.CompilerHost {
  const testFileNames = testFiles.map(({name}) => name)
  const testFileNamesRelative = testFileNames.map(name =>
    name.replace('../__tests__/', '').replace(/\.(j|t)sx?$/gi, ''),
  )
  const tests = testFiles.map(({code}) => code)
  const declNames = declarations.map(({name}) => name)
  const declFileNames = declarations.map(({fileName}) => fileName)
  const decls = declarations.map(({code}) => code)
  function withFile<T>(
    fileName: string,
    {virtual, real}: {virtual: (code: string) => T; real: () => T},
  ) {
    if (testFileNames.includes(fileName))
      return virtual(tests[testFileNames.indexOf(fileName)])
    if (declFileNames.includes(fileName))
      return virtual(decls[declFileNames.indexOf(fileName)])
    return real()
  }
  const resolutionHost: ts.ModuleResolutionHost = {
    fileExists(fileName) {
      return withFile(fileName, {
        virtual: () => true,
        real: () => ts.sys.fileExists(fileName),
      })
    },
    readFile(fileName) {
      return withFile(fileName, {
        virtual: code => code,
        real: () => ts.sys.readFile(fileName),
      })
    },
  }
  return {
    ...resolutionHost,
    getSourceFile(fileName, languageVersion) {
      const sourceText = resolutionHost.readFile(fileName)
      if (sourceText !== undefined)
        return ts.createSourceFile(fileName, sourceText, languageVersion)
    },
    getDefaultLibFileName: () => 'lib.d.ts',
    getDefaultLibLocation: () =>
      resolve(__dirname, '..', '..', '..', 'node_modules', 'typescript', 'lib'),
    writeFile(fileName, content) {
      // return ts.sys.writeFile(fileName, content)
      throw Error('not implemented')
    },
    getCurrentDirectory: () => ts.sys.getCurrentDirectory(),
    getDirectories: path => ts.sys.getDirectories(path),
    getCanonicalFileName: fileName =>
      ts.sys.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase(),
    getNewLine: () => ts.sys.newLine,
    useCaseSensitiveFileNames: () => ts.sys.useCaseSensitiveFileNames,
    resolveModuleNames(moduleNames, containingFile) {
      const resolvedModules: ts.ResolvedModule[] = []
      for (const moduleName of moduleNames) {
        if (declNames.includes(moduleName)) {
          resolvedModules.push({
            resolvedFileName: declFileNames[declNames.indexOf(moduleName)],
          })
        } else if (testFileNamesRelative.includes(moduleName)) {
          resolvedModules.push({
            resolvedFileName:
              testFileNames[testFileNamesRelative.indexOf(moduleName)],
          })
        } else {
          // try to use standard resolution
          const result = ts.resolveModuleName(
            moduleName,
            containingFile,
            options,
            resolutionHost,
          )
          if (result.resolvedModule) {
            resolvedModules.push(result.resolvedModule)
          } else {
            console.error(`module '${moduleName}' is not found`)
            console.log({testFileNames, testFileNamesRelative})
          }
        }
      }
      return resolvedModules
    },
  }
}

export async function compile({
  fullTestFileNames,
  testsRoot,
  paths,
  typings,
  tsConfig,
}: {
  fullTestFileNames: string[]
  testsRoot: string
  paths: {[moduleName: string]: string}
  typings: string[]
  tsConfig: Record<string, any>
}) {
  const [declarations, filesContents] = await Promise.all([
    Promise.all(
      Object.entries(paths).map(async ([name, path]) => {
        const fileName = resolve(__dirname, ...path.split(/\//gi))
        return {
          name,
          fileName,
          code: await fs.readFile(fileName, 'utf8'),
        }
      }),
    ),
    Promise.all(
      fullTestFileNames.map(async name => ({
        name: relative(__dirname, name),
        code: await fs
          .readFile(name, 'utf8')
          .then(code =>
            code.replace(/\@ts\-expect\-error/gm, '//expected-error'),
          ),
      })),
    ),
  ])
  const expectErrorsLines = filesContents.map(({name, code}) => {
    const linesOfCode = code.split(`\n`)
    return {
      name,
      expectedErrors: linesOfCode
        .map((e, idx) => (e.includes('//expected-error') ? idx : -1))
        .filter(e => e !== -1),
      testLines: linesOfCode
        .map((e, idx) => {
          if (e.includes('test(') || e.includes('it(')) return idx
          return -1
        })
        .filter(e => e !== -1),
      linesOfCode,
    }
  })
  const options = ts.convertCompilerOptionsFromJson(
    tsConfig,
    '../../..',
  ).options
  const rootFileFullPath = resolve(testsRoot, 'index.ts')
  const rootFileRelativePath = relative(__dirname, rootFileFullPath)
  const host = createCompilerHost({
    options,
    testFiles: [
      {
        name: rootFileRelativePath,
        code: fullTestFileNames
          .map(file => {
            const relativeImport = relative(testsRoot, file)
            const noExt = relativeImport.replace(/\.(j|t)sx?$/gi, '')
            return `import '${noExt}'`
          })
          .join(`\n`),
      },
      ...filesContents,
    ],
    declarations: declarations,
  })
  const program = ts.createProgram(
    [
      ...typings.map(typing => `./node_modules/${typing}`),
      rootFileRelativePath,
    ],
    options,
    host,
  )
  const allDiagnostics = program
    .getOptionsDiagnostics()
    .concat(program.getSyntacticDiagnostics())
    .concat(program.getSemanticDiagnostics())
    .concat(program.getDeclarationDiagnostics())
  return createReport(allDiagnostics)

  function createReport(allDiagnostics: ts.Diagnostic[]) {
    const messages: string[] = []
    const unprocessedExpectErrors = expectErrorsLines.map(
      ({name, expectedErrors}) => ({
        fileName: name,
        expectedErrors: [...expectedErrors],
      }),
    )
    function pushExpectedErrorMessage(
      expectedErrorLine: number,
      fileName: string,
    ) {
      const fileExpectErrors = expectErrorsLines.find(e => e.name === fileName)!
      const testLineOffset = fileExpectErrors.testLines.findLast(
        testLine => testLine < expectedErrorLine,
      )
      /** error is expected at line next to line with expect error mark */
      const targetLine = expectedErrorLine + 1
      const errorOffset =
        testLineOffset === undefined ? targetLine : targetLine - testLineOffset
      const content = fileExpectErrors.linesOfCode[targetLine].trim()
      messages.push(
        `Error ${fileName} (${targetLine},4): lack of expected error at test line ${errorOffset} '${content}'`,
      )
    }
    for (const diagnostic of allDiagnostics) {
      const message = ts.flattenDiagnosticMessageText(
        diagnostic.messageText,
        '\n',
      )
      if (diagnostic.file) {
        const fileName = diagnostic.file.fileName
        const fileExpectErrors = expectErrorsLines.find(
          e => e.name === fileName,
        )!
        const {expectedErrors: fileUnprocessedExpectErrors} =
          unprocessedExpectErrors.find(e => e.fileName === fileName)!
        let {line, character} = diagnostic.file.getLineAndCharacterOfPosition(
          diagnostic.start!,
        )
        const expectedErrorLine = line - 1
        const errorPosition = `${line + 1},${character + 1}`

        if (!fileExpectErrors.expectedErrors.includes(expectedErrorLine)) {
          const testLineOffset = fileExpectErrors.testLines.findLast(
            testLine => testLine < line,
          )
          const errorOffset =
            testLineOffset === undefined ? line : line - testLineOffset
          const content = fileExpectErrors.linesOfCode[line].trim()
          messages.push(
            `Error ${fileName} (${errorPosition}): Unmarked error at test line ${errorOffset} '${content}'`,
          )
        } else {
          /** there could be more than one error per line, protect from removing twice */
          if (fileUnprocessedExpectErrors.includes(expectedErrorLine)) {
            fileUnprocessedExpectErrors.splice(
              fileUnprocessedExpectErrors.indexOf(expectedErrorLine),
              1,
            )
          }
        }
        const unprocessedExpectErrorsBehind =
          fileUnprocessedExpectErrors.filter(e => e < expectedErrorLine)
        for (const expectedErrorLine of unprocessedExpectErrorsBehind) {
          pushExpectedErrorMessage(expectedErrorLine, fileName)
          fileUnprocessedExpectErrors.splice(
            fileUnprocessedExpectErrors.indexOf(expectedErrorLine),
            1,
          )
        }
        messages.push(`Error ${fileName} (${errorPosition}): ${message}`)
      } else {
        messages.push(`Error: ${message}`)
      }
    }
    for (const {fileName, expectedErrors} of unprocessedExpectErrors) {
      for (const expectedErrorLine of expectedErrors) {
        pushExpectedErrorMessage(expectedErrorLine, fileName)
      }
    }
    return messages.join(`\n`)
  }
}
