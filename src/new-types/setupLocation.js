//@flow
module.exports = function setupLocation(
  file /*: string*/,
  loc /*: {
  start: {line: number, column: number},
  end: {line: number, column: number},
}*/,
  reportPath /*: string */,
) {
  //@ts-ignore
  const {readJSONSync} = require('fs-extra')
  const report = readJSONSync(reportPath)
  return `\n--typescript--\n${matchTypecheckerMessages(
    report.ts,
    loc,
  )}\n\n--flow--\n${matchTypecheckerMessages(report.flow, loc)}\n`
}

function matchTypecheckerMessages(report, loc) {
  const messages = []
  for (const {pos, message} of report) {
    if (inRange(loc, pos)) messages.push(message)
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
