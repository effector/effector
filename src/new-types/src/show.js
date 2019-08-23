import {resolve, relative, basename} from 'path'
import {readFile} from 'fs-extra'
import {codeFrameColumns} from '@babel/code-frame'

const root = resolve(__dirname, '../types')
const printRoot = resolve(__dirname, '../..')
function fromPrintRoot(source) {
  return relative(printRoot, resolve(root, source))
}

const files = {}
function flatMap(list, cb) {
  return list.reduce((acc, x) => acc.concat(cb(x)), [])
}

export async function generateReport(errors) {
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
}

async function readSource(source) {
  if (source in files) return files[source]
  const path = resolve(root, source)
  const result = await readFile(path, 'utf8')
  files[source] = result
  return result
}

async function printMessage(msg, isRef, printHead, lineNumbersPad) {
  if (msg.type === 'LibFile') return printLibRef(msg, isRef, lineNumbersPad)
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
