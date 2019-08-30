const {resolve, relative, parse} = require('path')
const execa = require('execa')
const {readFile, remove, copyFile, outputJSON, pathExists} = require('fs-extra')

const jestAdapter = require('jest-circus/runner')

module.exports = async function(
  globalConfig,
  config,
  environment,
  runtime,
  testPath,
) {
  await typeCheck(testPath)
  return jestAdapter(globalConfig, config, environment, runtime, testPath)
}

const PRINT_FOREIGN_FILE_NAME = false
const TEST_DIR = 'types'

async function typeCheck(testPath) {
  const root = resolve(__dirname, '../..', TEST_DIR)
  const repoRoot = resolve(__dirname, '../../..')
  const movedFileFlow = resolve(__dirname, '..', '__fixtures__/flow/index.js')
  const movedFileTS = resolve(
    __dirname,
    '..',
    '__fixtures__/typescript/index.tsx',
  )

  const testMeta = {
    flow: false,
    ts: false,
  }
  if (/\.jsx?$/.test(testPath)) {
    testMeta.flow = true
    const sibling = testPath.replace(/^(.+)\.j(sx?)$/, '$1.t$2')
    if (!(await pathExists(sibling))) {
      testMeta.ts = true
    }
  } else if (/\.tsx?$/.test(testPath)) {
    testMeta.ts = true
  }

  const relativeTestPath = relative(root, testPath)

  const typechecks = []
  if (testMeta.flow) typechecks.push(flowBranch())
  if (testMeta.ts) typechecks.push(tsBranch())

  const reports = await Promise.all(typechecks)
  const outputData = {meta: testMeta, testPath: relativeTestPath}
  for (const {type, report} of reports) {
    outputData[type] = report
  }

  await outputJSON(resolve(__dirname, '..', 'type-report.json'), outputData, {
    spaces: 2,
  })
  async function tsBranch() {
    await copyFile(testPath, movedFileTS)
    const report = await runTypeScript()
    await remove(movedFileTS)
    return {type: 'ts', report: normalizeTSReport(report)}
  }
  async function flowBranch() {
    await copyFile(testPath, movedFileFlow)
    const report = await runFlow()
    await remove(movedFileFlow)
    return {type: 'flow', report}
  }
  function normalizeTSReport(report) {
    let current = {
      pos: {line: -1, col: -1},
      lines: [],
    }
    const tsProcessed = []
    for (const line of report.split(/\n/).slice(2)) {
      if (line.startsWith(' ')) {
        current.lines.push(line)
      } else {
        const match = line.match(/.+\((\d+),(\d+)\): (.+)/)
        if (match) {
          const x = +match[2]
          const y = +match[1]
          const message = match[3]
          tsProcessed.push(current)
          current = {
            pos: {line: y, col: x},
            lines: [message],
          }
        } else {
          current.lines.push(line)
        }
      }
    }
    tsProcessed.push(current)
    const tsReport = tsProcessed.slice(1).map(({pos, lines}) => ({
      pos,
      message: lines.join(`\n`),
      file: relativeTestPath,
    }))
    return tsReport
  }

  async function runTypeScript() {
    try {
      const result = await execa('npx', [
        'tsc',
        '-p',
        `src/${TEST_DIR}/__fixtures__/typescript`,
      ])
      console.warn('no errors found by typescript typecheck', result)
      return ''
    } catch (err) {
      const cleanedMessage = err.message
        // .replace(/src\/types\//gm, '')
        .replace(
          new RegExp(relative(repoRoot, movedFileTS), 'gm'),
          relativeTestPath,
        )
        .replace(/error TS\d+: /gm, '')
      // .replace(/\(\d+,\d+\)/gm, '')
      return cleanedMessage //{errors: cleanedMessage}
    }
  }
  async function runFlow() {
    const files = {}
    try {
      const result = await execa('npx', [
        'flow',
        'check',
        '--json',
        `src/${TEST_DIR}/__fixtures__/flow`,
      ])
      console.warn('no errors found by flow typecheck', result)
      return []
    } catch (err) {
      const data = JSON.parse(
        err.message.substring(err.message.indexOf('\n') + 1).trim(),
      )
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
        let currentPath = fromPrintRoot(message.source)
        const printCurrentPath =
          PRINT_FOREIGN_FILE_NAME && message.source !== framePath
        if (currentPath.startsWith('packages'))
          currentPath = currentPath.replace('packages/', '')
        currentPath = currentPath.replace(
          new RegExp(relative(repoRoot, movedFileFlow), 'gm'),
          relativeTestPath,
        )

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
        errorsPack.push(await getNewMessage(message, message.source, true))
        const messages = await Promise.all(
          refs.map(ref => getNewMessage(ref, message.source, false)),
        )
        errorsPack.push(...messages)
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
}
