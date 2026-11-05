import {spawn} from 'child_process'
import {promises as fs} from 'fs'
import {dirname, relative, resolve, sep} from 'path'

type Diagnostic = {
  fileName?: string
  line: number
  character: number
  message: string
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
  const filesContents = await Promise.all(
    fullTestFileNames.map(async name => ({
      name: relative(__dirname, name),
      fullName: name,
      code: await fs
        .readFile(name, 'utf8')
        .then(code => code.replace(/\@ts\-expect\-error/gm, '//expected-error')),
    })),
  )
  const expectErrorsLines = filesContents.map(({name, code}) => {
    const linesOfCode = code.split(`\n`)
    return {
      name,
      expectedErrors: linesOfCode
        .map((line, index) => (line.includes('//expected-error') ? index : -1))
        .filter(index => index !== -1),
      testLines: linesOfCode
        .map((line, index) =>
          line.includes('test(') || line.includes('it(') ? index : -1,
        )
        .filter(index => index !== -1),
      linesOfCode,
    }
  })
  const runnerRoot = resolve(__dirname, '..', '.reports', 'ts-runner')
  const materializedTestsRoot = resolve(runnerRoot, '__tests__')
  const configFile = resolve(runnerRoot, 'tsconfig.json')
  const tempToOriginal = new Map<string, string>()

  await fs.rm(runnerRoot, {recursive: true, force: true})
  await fs.mkdir(materializedTestsRoot, {recursive: true})

  try {
    const materializedFiles = await Promise.all(
      filesContents.map(async ({name, fullName, code}) => {
        const fileName = resolve(
          materializedTestsRoot,
          relative(testsRoot, fullName),
        )
        await fs.mkdir(dirname(fileName), {recursive: true})
        await fs.writeFile(fileName, code, 'utf8')
        tempToOriginal.set(normalizePath(fileName), name)
        return fileName
      }),
    )
    const rootFile = resolve(materializedTestsRoot, 'index.ts')
    await fs.writeFile(
      rootFile,
      materializedFiles
        .map(fileName => {
          const importPath = `./${relative(materializedTestsRoot, fileName)
            .replace(/\.(j|t)sx?$/gi, '')
            .split(sep)
            .join('/')}`
          return `import '${importPath}'`
        })
        .join(`\n`),
      'utf8',
    )

    const compilerOptions = {
      ...tsConfig,
      module: 'Node16',
      moduleResolution: 'Node16',
      paths: Object.fromEntries(
        Object.entries(paths).map(([moduleName, path]) => {
          const declaration = resolve(__dirname, ...path.split(sep))
          return [
            moduleName,
            [relative(runnerRoot, declaration).split(sep).join('/')],
          ]
        }),
      ),
    }
    delete compilerOptions.baseUrl
    const files = [
      rootFile,
      ...typings.map(typing =>
        resolve(process.cwd(), 'node_modules', ...typing.split('/')),
      ),
    ]
    await fs.writeFile(
      configFile,
      JSON.stringify({compilerOptions, files}, null, 2),
      'utf8',
    )

    const output = await runTypeScript(configFile)
    return createReport(
      parseDiagnostics(output, tempToOriginal),
      expectErrorsLines,
    )
  } finally {
    await fs.rm(runnerRoot, {recursive: true, force: true})
  }
}

async function runTypeScript(configFile: string) {
  const tsc = resolve(process.cwd(), 'node_modules', 'typescript', 'bin', 'tsc')
  return new Promise<string>((resolvePromise, reject) => {
    const child = spawn(
      process.execPath,
      [tsc, '--project', configFile, '--pretty', 'false'],
      {
        cwd: __dirname,
        stdio: ['ignore', 'pipe', 'pipe'],
      },
    )
    let output = ''
    child.stdout.on('data', chunk => {
      output += chunk
    })
    child.stderr.on('data', chunk => {
      output += chunk
    })
    child.on('error', reject)
    child.on('close', code => {
      if (code !== 0 && output.trim() === '') {
        reject(new Error(`TypeScript exited with code ${code}`))
      } else {
        resolvePromise(output)
      }
    })
  })
}

function parseDiagnostics(
  output: string,
  tempToOriginal: Map<string, string>,
): Diagnostic[] {
  const diagnostics: Diagnostic[] = []
  const fileDiagnostic = /^(.+)\((\d+),(\d+)\): error TS\d+: (.*)$/
  const globalDiagnostic = /^error TS\d+: (.*)$/
  let current: Diagnostic | null = null

  for (const line of output.replace(/\r/g, '').split('\n')) {
    const fileMatch = line.match(fileDiagnostic)
    if (fileMatch) {
      if (current) diagnostics.push(current)
      const absoluteFileName = normalizePath(resolve(__dirname, fileMatch[1]))
      current = {
        fileName: tempToOriginal.get(absoluteFileName) ?? fileMatch[1],
        line: Number(fileMatch[2]),
        character: Number(fileMatch[3]),
        message: fileMatch[4],
      }
      continue
    }
    const globalMatch = line.match(globalDiagnostic)
    if (globalMatch) {
      if (current) diagnostics.push(current)
      current = {
        line: -1,
        character: -1,
        message: globalMatch[1],
      }
      continue
    }
    if (current && line !== '') {
      current.message += `\n${line}`
    }
  }
  if (current) diagnostics.push(current)
  return diagnostics
}

function createReport(
  diagnostics: Diagnostic[],
  expectErrorsLines: Array<{
    name: string
    expectedErrors: number[]
    testLines: number[]
    linesOfCode: string[]
  }>,
) {
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
    const targetLine = expectedErrorLine + 1
    const errorOffset =
      testLineOffset === undefined ? targetLine : targetLine - testLineOffset
    const content = fileExpectErrors.linesOfCode[targetLine].trim()
    messages.push(
      `Error ${fileName} (${targetLine},4): lack of expected error at test line ${errorOffset} '${content}'`,
    )
  }

  for (const diagnostic of diagnostics) {
    if (!diagnostic.fileName) {
      messages.push(`Error: ${diagnostic.message}`)
      continue
    }
    const fileName = diagnostic.fileName
    const fileExpectErrors = expectErrorsLines.find(e => e.name === fileName)
    const fileUnprocessed = unprocessedExpectErrors.find(
      e => e.fileName === fileName,
    )
    if (!fileExpectErrors || !fileUnprocessed) {
      throw new Error(
        `TypeScript diagnostic outside type tests: ${fileName}(${diagnostic.line},${diagnostic.character}): ${diagnostic.message}`,
      )
    }

    const line = diagnostic.line - 1
    const character = diagnostic.character - 1
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
    } else if (fileUnprocessed.expectedErrors.includes(expectedErrorLine)) {
      fileUnprocessed.expectedErrors.splice(
        fileUnprocessed.expectedErrors.indexOf(expectedErrorLine),
        1,
      )
    }

    const unprocessedBehind = fileUnprocessed.expectedErrors.filter(
      expectedLine => expectedLine < expectedErrorLine,
    )
    for (const expectedLine of unprocessedBehind) {
      pushExpectedErrorMessage(expectedLine, fileName)
      fileUnprocessed.expectedErrors.splice(
        fileUnprocessed.expectedErrors.indexOf(expectedLine),
        1,
      )
    }
    messages.push(
      `Error ${fileName} (${errorPosition}): ${diagnostic.message}`,
    )
  }

  for (const {fileName, expectedErrors} of unprocessedExpectErrors) {
    for (const expectedErrorLine of expectedErrors) {
      pushExpectedErrorMessage(expectedErrorLine, fileName)
    }
  }
  return messages.join(`\n`)
}

function normalizePath(path: string) {
  return resolve(path).split(sep).join('/')
}
