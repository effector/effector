module.exports = function setupLocation(
  file /*: string*/,
  loc /*: {
  start: {line: number, column: number},
  end: {line: number, column: number},
}*/,
) {
  //@ts-ignore
  const {tsReport, fileNames} = require('./.reports/type-report-full.json')
  const reportList = []
  if (fileNames.includes(file)) {
    const tsErr = matchTypecheckerMessages(tsReport, file, loc)
    reportList.push(`\n${tsErr}\n`)
  } else {
    console.warn(`file ${file} doesnt type checked`)
    console.log(fileNames)
    reportList.push(`\nno errors\n`)
  }
  return reportList.join('')
}

function matchTypecheckerMessages(report, fileName, loc) {
  const messages = []
  for (const {pos, message, file} of report) {
    if (file === fileName && inRange(loc, pos)) messages.push(message)
  }
  if (messages.length === 0) return 'no errors'
  return messages.join(`\n`).trim()
}

function inRange({start, end}, {line, col}) {
  return (
    gt(line, col, start.line, start.column, true) &&
    !gt(line, col, end.line, end.column, false)
  )
}
function gt(line1, col1, line2, col2, orEqual) {
  if (line1 === line2) {
    return orEqual ? col1 >= col2 : col1 > col2
  }
  return line1 > line2
}
