const {resolve, relative, parse, sep, join, extname, basename} = require('path')
const execa = require('execa')
const {
  readFile,
  copy,
  outputJSON,
  outputFile,
  ensureDir,
  readdir,
} = require('fs-extra')

const WRITE_RAW_REPORTS = false

module.exports = async function() {
  const reportPath = resolve(
    __dirname,
    '..',
    '.reports',
    'type-report-full.json',
  )
  const testsDir = resolve(__dirname, '..', '__tests__')
  const flowTestDir = resolve(__dirname, '..', '__fixtures__', '.flow')
  const tsTestDir = resolve(__dirname, '..', '__fixtures__', '.typescript')
  const flowTemplateDir = resolve(__dirname, '..', '__fixtures__', 'flow')
  const tsTemplateDir = resolve(__dirname, '..', '__fixtures__', 'typescript')
  const {files: testFiles, dirs} = await getTestFiles(testsDir)
  await Promise.all([
    (async function() {
      await ensureDir(flowTestDir)
      await copy(flowTemplateDir, flowTestDir, {
        overwrite: true,
        errorOnExist: false,
        recursive: false,
      })
      await copy(testsDir, flowTestDir, {
        overwrite: true,
        errorOnExist: false,
        recursive: true,
        preserveTimestamps: true,
        filter(filePath, to) {
          if (extname(filePath) === '') return true
          const fileMeta = testFiles.find(file => file.fullPath === filePath)
          if (!fileMeta) return false
          return fileMeta.type === 'flow'
        },
      })
      await Promise.all(
        testFiles
          .filter(({type}) => type === 'both')
          .map(fileMeta => {
            const relativePath = relative(testsDir, fileMeta.fullPath)
            const target = join(flowTestDir, relativePath)
            return copy(fileMeta.fullPath, target, {
              overwrite: true,
              errorOnExist: false,
              preserveTimestamps: true,
            })
          }),
      )
    })(),
    (async function() {
      await ensureDir(tsTestDir)
      await copy(tsTemplateDir, tsTestDir, {
        overwrite: true,
        errorOnExist: false,
        recursive: false,
      })
      await copy(testsDir, tsTestDir, {
        overwrite: true,
        errorOnExist: false,
        recursive: true,
        preserveTimestamps: true,
        filter(filePath, to) {
          if (extname(filePath) === '') return true
          const fileMeta = testFiles.find(file => file.fullPath === filePath)
          if (!fileMeta) return false
          return fileMeta.type === 'ts'
        },
      })
      await Promise.all(
        testFiles
          .filter(({type}) => type === 'both')
          .map(fileMeta => {
            const ext = extname(fileMeta.fullPath)
            const newExt = ext === '.js' ? '.ts' : '.tsx'
            const newFullPath = fileMeta.fullPath.replace(ext, newExt)
            const relativePath = relative(testsDir, newFullPath)
            const target = join(tsTestDir, relativePath)
            return copy(fileMeta.fullPath, target, {
              overwrite: true,
              errorOnExist: false,
              preserveTimestamps: true,
            })
          }),
      )
    })(),
  ])
  const [tsReport, flowReport] = await Promise.all([
    runTypeScript(testFiles),
    runFlow(testFiles),
  ])
  const fileTypes = {
    ts: [],
    flow: [],
    both: [],
  }
  for (const {fullPath, type} of testFiles) {
    const rel = relative(testsDir, fullPath)
    fileTypes[type].push(rel)
  }
  await outputJSON(
    reportPath,
    {ts: tsReport, flow: flowReport, fileTypes},
    {spaces: 2},
  )

  // throw Error('[expected error]')
}

const PRINT_FOREIGN_FILE_NAME = false
const TEST_DIR = 'types'
const DIR_NAME = 'fullTest'
async function getTestFiles(root) {
  const {files, dirs} = await readTypeDir(root)
  const result = []
  for (const file of files) {
    if (file.isJSFile) {
      const hasTSSibling = files.some(
        ({relativeDir, baseName, isJSFile}) =>
          relativeDir === file.relativeDir &&
          baseName === file.baseName &&
          !isJSFile,
      )
      result.push({
        fullPath: file.fullPath,
        type: hasTSSibling ? 'flow' : 'both',
        relativePath: relative(root, file.fullPath),
        ext: file.ext,
      })
    } else {
      result.push({
        fullPath: file.fullPath,
        type: 'ts',
        relativePath: relative(root, file.fullPath),
        ext: file.ext,
      })
    }
  }
  return {files: result, dirs}
  async function readTypeDir(dir) {
    const dirents = await readdir(dir, {withFileTypes: true})
    const files = []
    const reqs = []
    const dirs = []
    for (const dirent of dirents) {
      const name = dirent.name
      if (dirent.isFile()) {
        const fullPath = resolve(dir, name)
        const ext = extname(name)
        const isTSFile = ext === '.ts' || ext === '.tsx'
        const isJSFile = ext === '.js' || ext === '.jsx'
        if (!isTSFile && !isJSFile) continue
        files.push({
          baseName: basename(name, ext),
          relativeDir: relative(root, dir),
          fullPath,
          isJSFile,
          ext,
        })
      } else {
        dirs.push(resolve(dir, name))
        reqs.push(readTypeDir(resolve(dir, name)))
      }
    }
    const subdirs = await Promise.all(reqs)
    for (const subdir of subdirs) {
      files.push(...subdir.files)
      dirs.push(...subdir.dirs)
    }
    return {files, dirs}
  }
}
async function runTypeScript(testFiles) {
  testFiles = testFiles.filter(({type}) => type === 'ts' || type === 'both')
  const testsDir = resolve(__dirname, '..', '__tests__')
  const repoRoot = resolve(__dirname, '..', '..', '..')
  const tsTestDir = resolve(__dirname, '..', '__fixtures__', '.typescript')
  const reportPath = resolve(__dirname, '..', '.reports', 'type-report-ts-raw')
  const importPaths = testFiles.map(
    ({fullPath}) => `import './${relative(testsDir, fullPath)}'`,
  )

  // await outputFile(resolve(tsTestDir, 'index.tsx'), importPaths.join(`\n`))
  const version = await execa('npx', ['tsc', '-v'])
  try {
    const result = await execa('npx', [
      'tsc',
      '-p',
      join('src', 'types', '__fixtures__', '.typescript'),
    ])
    console.warn('no errors found by typescript typecheck', result)
    return ''
  } catch (err) {
    const cleanedMessage = err.message.replace(/error TS\d+: /gm, '')
    if (WRITE_RAW_REPORTS) {
      await outputFile(reportPath, cleanedMessage)
    }
    return normalizeTSReport(cleanedMessage)
  }
  function normalizeTSReport(report) {
    let current = {
      pos: {line: -1, col: -1},
      lines: [],
      file: '',
    }
    const tsProcessed = []
    for (const line of report.split(/\n/).slice(2)) {
      if (line.startsWith(' ')) {
        current.lines.push(line)
      } else {
        const match = line.match(
          /src\/types\/__fixtures__\/\.typescript\/(.+)\((\d+),(\d+)\): (.+)/,
        )
        if (match) {
          const file = match[1]
          const x = +match[3]
          const y = +match[2]
          const message = match[4]
          tsProcessed.push(current)
          current = {
            pos: {line: y, col: x},
            lines: [message],
            file,
          }
        } else {
          current.lines.push(line)
        }
      }
    }
    tsProcessed.push(current)
    const tsReport = tsProcessed.slice(1).map(({pos, lines, file}) => ({
      pos,
      message: lines.join(`\n`),
      file: recontructFileName(file),
    }))
    return tsReport
  }
  function recontructFileName(file) {
    file = resolve(testsDir, file)
      .replace('.tsx', '')
      .replace('.ts', '')
      .replace('.jsx', '')
      .replace('.js', '')
    const {ext} = testFiles.find(({fullPath, type}) => {
      if (type === 'flow') return false
      fullPath = fullPath
        .replace('.tsx', '')
        .replace('.ts', '')
        .replace('.jsx', '')
        .replace('.js', '')
      return fullPath === file
    })
    return relative(testsDir, `${file}${ext}`)
  }
}
async function runFlow(testFiles) {
  testFiles = testFiles.filter(({type}) => type === 'flow' || type === 'both')
  const root = resolve(__dirname, '..')
  const testsDir = resolve(__dirname, '..', '__tests__')
  const repoRoot = resolve(__dirname, '..', '..', '..')
  const flowTestDir = resolve(__dirname, '..', '__fixtures__', '.flow')
  const reportPath = resolve(
    __dirname,
    '..',
    '.reports',
    'type-report-flow-raw.json',
  )
  const importPaths = testFiles.map(
    ({fullPath}) => `import './${relative(testsDir, fullPath)}'`,
  )

  await outputFile(
    resolve(flowTestDir, 'index.js'),
    `//@flow\n${importPaths.join(`\n`)}`,
  )

  const files = {}
  try {
    const result = await execa('npx', [
      'flow',
      'check',
      '--json',
      join('src', 'types', '__fixtures__', '.flow'),
    ])
    console.warn('no errors found by flow typecheck', result)
    return []
  } catch (err) {
    const data = JSON.parse(
      err.message.substring(err.message.indexOf('\n') + 1).trim(),
    )
    if (WRITE_RAW_REPORTS) {
      await outputJSON(reportPath, data, {spaces: 2})
    }
    const result = await generateReport(processFlow(data))

    return result
  }

  async function generateReport(errors) {
    const resultsNew = []
    function getMarkLine(sourceLine, loc) {
      const paddingLeft = sourceLine.length - sourceLine.trimStart().length
      sourceLine = sourceLine.trimStart()
      const startColumn = Math.max(0, loc.start.column - 1 - paddingLeft)
      const endColumn = Math.max(0, loc.end.column - paddingLeft)
      let markLine = Array(startColumn)
        .fill(' ')
        .join('')
      let addEllipsis = false
      let markLength = 0
      if (loc.end.line !== loc.start.line) {
        markLength = Math.max(0, sourceLine.length - startColumn)
        addEllipsis = true
      } else {
        markLength = Math.max(
          0,
          Math.min(sourceLine.length, endColumn) - startColumn,
        )
      }
      markLine += Array(markLength)
        .fill('^')
        .join('')
      if (addEllipsis) markLine += '...'
      return markLine
    }
    async function getNewMessage(message, framePath, isRoot) {
      let {descr} = message
      const fullDescription = {
        header: [],
        explanation: [],
      }
      if (isRoot) {
        descr = descr.replace(/\`/gi, `'`).replace(/\.$/, '')
        const splitPoint = descr.indexOf(' because ')
        if (splitPoint === -1) {
          fullDescription.header.push(descr)
        } else {
          const [briefDescription, explanation] = descr.split(' because ')
          fullDescription.header.push(briefDescription)
          fullDescription.explanation.push(`  ${explanation}`)
        }
      }

      const {loc} = message
      if (message.type !== 'SourceFile') {
        let sourceLine = message.context
        let markLine = getMarkLine(sourceLine, loc)
        sourceLine = sourceLine.trimStart()
        if (!isRoot) {
          const fill = Array(descr.length + 1)
            .fill(' ')
            .join('')
          sourceLine = `${fill}${sourceLine}`
          markLine = `${fill}${markLine}`
          const firstPointer = markLine.indexOf('^')
          if (firstPointer >= descr.length + 1) {
            const before = markLine.slice(0, firstPointer - descr.length - 1)
            const after = markLine.slice(firstPointer - 1)
            markLine = `${before}${descr}${after}`
          }
        } else {
          markLine = `  ${markLine}`
          sourceLine = `  ${sourceLine}`
        }
        const sourceFile = `<BUILTINS>/${parse(message.source).base}`
        const lines = [
          ...fullDescription.header,
          sourceFile,
          sourceLine,
          markLine,
          ...fullDescription.explanation,
        ]
        return {
          pos: {
            line: loc.start.line,
            col: loc.start.column,
          },
          file: sourceFile,
          lines,
        }
      }
      const sourceCode = await readSource(message.source)
      const printCurrentPath =
        PRINT_FOREIGN_FILE_NAME && message.source !== framePath
      const flowDirRoot = join('src', 'types', '__fixtures__', '.flow')
      const currentPath = fromPrintRoot(message.source)
        .replace('packages' + sep, '')
        .replace(flowDirRoot, '')

      let sourceLine = (
        sourceCode.split(/\n/)[Math.max(0, loc.start.line - 1)] || ''
      ).trimEnd()
      let markLine = getMarkLine(sourceLine, loc)
      sourceLine = sourceLine.trimStart()
      if (!isRoot) {
        const fill = Array(descr.length + 1)
          .fill(' ')
          .join('')
        sourceLine = `${fill}${sourceLine}`
        markLine = `${fill}${markLine}`
        const firstPointer = markLine.indexOf('^')
        if (firstPointer >= descr.length + 1) {
          const before = markLine.slice(0, firstPointer - descr.length - 1)
          const after = markLine.slice(firstPointer - 1)
          markLine = `${before}${descr}${after}`
        }
      } else {
        markLine = `  ${markLine}`
        sourceLine = `  ${sourceLine}`
      }
      const lines = [...fullDescription.header]
      if (printCurrentPath) lines.push(currentPath)
      lines.push(sourceLine, markLine, ...fullDescription.explanation)
      return {
        pos: {
          line: loc.start.line,
          col: loc.start.column,
        },
        file: currentPath,
        lines,
      }
    }
    for (const {message, refs} of errors) {
      const errorsPack = []
      const errTop = await getNewMessage(message, message.source, true)
      if (!errTop) {
        console.warn('flow error in type definition file itself')
        continue
      }
      errorsPack.push(errTop)
      const messages = await Promise.all(
        refs.map(ref => getNewMessage(ref, message.source, false)),
      )
      errorsPack.push(...messages.filter(Boolean))
      //prettier-ignore
      const lines = errorsPack.map(
        ({lines}, i) => i === 0
          ? lines.join(`\n`)
          : lines
            .map(line => line
              .split(`\n`)
              .map(line => `  ${line}`)
              .join(`\n`))
            .join(`\n`)
      )
      resultsNew.push({
        pos: errorsPack[0].pos,
        message: lines.join(`\n`),
        file: errorsPack[0].file,
      })
    }
    return resultsNew

    async function readSource(source) {
      if (source in files) return files[source]
      const path = resolve(root, source)
      const result = await readFile(path, 'utf8')
      files[source] = result
      return result
    }

    function fromPrintRoot(source) {
      return relative(repoRoot, resolve(root, source))
    }
  }

  function processFlow({errors}) {
    return errors.map(e => {
      const result = {}
      const extra = (e.extra || [])
        .map(e1 => e1.message[0])
        .slice(1)
        .map(processItem)
      const message = processItem(e.message[0])
      result.refs = extra
      result.message = message
      return result
    })
    function processItem(e) {
      e = removeType(e)
      e = normalizeLoc(e)
      return e
    }
    function removeType(e) {
      const item = Object.assign({}, e)
      delete item.type
      return item
    }
    function normalizeLoc(e) {
      const item = Object.assign({}, e)
      delete item.path
      delete item.line
      delete item.endline
      delete item.start
      delete item.end
      item.source = item.loc.source
      item.type = item.loc.type
      const loc = {
        start: {line: item.loc.start.line, column: item.loc.start.column},
        end: {line: item.loc.end.line, column: item.loc.end.column},
      }
      item.loc = loc
      return item
    }
  }
}
