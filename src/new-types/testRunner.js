const execa = require('execa')
const {resolve, relative, basename} = require('path')
const {codeFrameColumns} = require('@babel/code-frame')
const {readFile, outputFile, remove, copyFile, outputJSON} = require('fs-extra')

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

async function typeCheck(testPath) {
  const root = resolve(__dirname, '../new-types')
  const repoRoot = resolve(__dirname, '../..')
  const movedFileFlow = resolve(__dirname, '__fixtures__/flow/index.js')
  const movedFileTS = resolve(__dirname, '__fixtures__/typescript/index.ts')
  await Promise.all([
    copyFile(testPath, movedFileFlow),
    copyFile(testPath, movedFileTS),
  ])

  const relativeTestPath = relative(root, testPath)
  const files = {}
  const ts = await runTypeScript()
  const flow = await runFlow()

  const tsReport = normalizeTSReport(ts)
  await outputJSON(resolve(__dirname, 'ts-report.json'), tsReport, {spaces: 2})
  await outputJSON(resolve(__dirname, 'flow-report.json'), flow, {spaces: 2})
  // expect(ts.errors).toMatchSnapshot()
  // expect(flow.errors).toMatchSnapshot()

  await Promise.all([remove(movedFileFlow), remove(movedFileTS)])

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
        `src/new-types/__fixtures__/typescript`,
      ])
      return {result}
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
    try {
      const result = await execa('npx', [
        'flow',
        'check',
        '--json',
        `src/new-types/__fixtures__/flow`,
      ])
      return {result}
    } catch (err) {
      const data = JSON.parse(
        err.message.substring(err.message.indexOf('\n') + 1).trim(),
      )
      const result = await generateReport(processFlow(data))

      return {errors: result}
    }

    async function generateReport(errors) {
      const results = []
      const getLines = ({loc: {start, end}}) => [start.line, end.line]
      const lineNumbersPad = Math.max(
        ...flatMap(errors, ({message, refs}) => [
          getLines(message),
          ...flatMap(refs, getLines),
        ]),
      ).toString().length

      for (const {message, refs} of errors) {
        results.push(await printMessage(message, false, true, lineNumbersPad))
        let lastSource = message.source
        for (const ref of refs) {
          const printHead = lastSource !== ref.source
          lastSource = ref.source
          results.push(await printMessage(ref, true, printHead, lineNumbersPad))
        }
        results.push('  ')
      }
      return results.join(`\n\n`)

      async function readSource(source) {
        if (source in files) return files[source]
        const path = resolve(root, source)
        const result = await readFile(path, 'utf8')
        files[source] = result
        return result
      }

      async function printMessage(msg, isRef, printHead, lineNumbersPad) {
        if (msg.type === 'LibFile')
          return printLibRef(msg, isRef, lineNumbersPad)
        const source = await readSource(msg.source)
        const head = printHead ? `  ${fromPrintRoot(msg.source)}\n` : ''
        let frame
        if (isRef) {
          frame = printFrameRef(
            codeFrameColumns(source, msg.loc, {
              linesAbove: 2,
              linesBelow: 2,
              // message
            }),
            msg.descr,
            2,
            lineNumbersPad,
          )
        } else {
          const pad = addIndent('|  ', 4 + 1)
          const withPad = line => `${pad}${line}`
          let descr = msg.descr
          const acc = []
          const max = 80
          const trailMin = 15
          if (descr.includes('because ')) {
            const index = descr.indexOf('because ')
            splitLongLine(descr.slice(0, index), acc, max, trailMin)
            splitLongLine(descr.slice(index), acc, max, trailMin)
          } else {
            splitLongLine(descr, acc, max, trailMin)
          }
          acc.push('')
          descr = ['', ...acc.map(withPad)].join(`\n`)
          frame = codeFrameColumns(source, msg.loc, {
            linesAbove: 2,
            linesBelow: 2,
            message: descr,
          })
          const padInit =
            frame
              .split(`\n`)
              .find(line => line.startsWith('>'))
              .indexOf('|') -
            1 -
            2
          const offset = lineNumbersPad - padInit
          frame = addIndent(frame, offset)
            .split(`\n`)
            .map(line => {
              const trimmed = line.trimStart()
              if (trimmed.startsWith('>')) {
                const cutted = trimmed.slice(2)
                const lineNumberBlockEnd = Math.max(0, cutted.indexOf('|'))
                return `>  ${cutted.slice(lineNumberBlockEnd)}`
              }
              const lineNumberBlockEnd = Math.max(0, line.indexOf('|'))
              return addIndent(line.slice(lineNumberBlockEnd), 3)
            })
            .join(`\n`)
        }
        return `${head}${frame}`
      }
      function splitLongLine(line, acc, max, trailMin) {
        let currentLine = line
        while (currentLine.length > max) {
          let bound = max - 1
          let trail = -1
          let trailFound = false
          let lastSpace
          while (!trailFound) {
            lastSpace = currentLine.lastIndexOf(' ', bound)
            if (lastSpace === -1) {
              acc.push(currentLine)
              return
            }
            trail = currentLine.length - lastSpace
            if (trail < trailMin) {
              bound = Math.max(0, lastSpace - 1)
            } else {
              trailFound = true
            }
          }
          acc.push(currentLine.slice(0, lastSpace))
          currentLine = currentLine.slice(lastSpace + 1)
        }
        acc.push(currentLine)
      }
      async function printLibRef(msg, isRef, lineNumbersPad) {
        const filledSource = [
          Array(Math.max(0, msg.loc.start.line - 1))
            .fill('')
            .join(`\n`),
          msg.context,
          '',
        ].join(`\n`)
        const libPath = `<BUILTINS>/${basename(msg.source)}`
        const frame = printFrameRef(
          codeFrameColumns(filledSource, msg.loc, {
            linesAbove: 0,
            linesBelow: 0,
            // message
          }),
          msg.descr,
          0,
          lineNumbersPad,
        )
        return `   ${libPath}\n${frame}`
      }
      function printFrameRef(frame, descr, padTop, lineNumbersPad) {
        let padNumbers = lineNumbersPad
        let offset = 0
        const result = frame
          .split(`\n`)
          .reverse()
          .map((line, index, arr) => {
            const i = arr.length - 1 - index
            const lineNumberBlockEnd = Math.max(0, line.indexOf('|'))
            if (i === padTop + 1) {
              padNumbers = line.indexOf('|') - 1 - 2
              offset = lineNumbersPad // - padNumbers
              const index = line.lastIndexOf('^')
              return `${line.slice(lineNumberBlockEnd, index + 1)}^ ${descr}`
            }
            if (i === padTop) {
              return `> ${line.slice(2 + padNumbers)}`
            }

            return line.slice(lineNumberBlockEnd)
          })
          .reverse()
          .join(`\n`)
        const offsetResult = addIndent(result, offset)
        return offsetResult
          .split(`\n`)
          .map((line, i) => {
            if (i === padTop) return line.slice(offset)
            return line
          })
          .join(`\n`)
      }
      function addIndent(str, n = 2) {
        const space = Array(n)
          .fill(' ')
          .join('')
        const splitted = str.split(/\n/gi)
        const padded = splitted.map(line => `${space}${line}`)
        return padded.join(`\n`)
      }

      function flatMap(list, cb) {
        return list.reduce((acc, x) => acc.concat(cb(x)), [])
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
