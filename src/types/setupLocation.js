//@flow
module.exports = function setupLocation(
  file /*: string*/,
  loc /*: {
  start: {line: number, column: number},
  end: {line: number, column: number},
}*/,
) {
  //@ts-ignore
  const {ts, flow, fileTypes} = require('./.reports/type-report-full.json')
  const reportList = []
  if (fileTypes.ts.includes(file) || fileTypes.both.includes(file)) {
    const tsErr = matchTypecheckerMessages(ts, file, loc)
    reportList.push(`\n--typescript--\n${tsErr}\n`)
  }
  if (fileTypes.flow.includes(file) || fileTypes.both.includes(file)) {
    const flowErr = matchTypecheckerMessages(flow, file, loc)
    reportList.push(`\n--flow--\n${flowErr}\n`)
  }
  return reportList.join('')
}

function matchTypecheckerMessages(report, fileName, loc) {
  const messages = []
  for (const {pos, message, file} of report) {
    if (file === fileName && inRange(loc, pos)) messages.push(message)
  }
  if (messages.length === 0) return 'no errors'
  return messages.join(`\n`)
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
