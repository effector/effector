module.exports = function setupLocation(file, loc, reportPath) {
  const {readJSONSync} = require('fs-extra')
  const report = readJSONSync(reportPath)
  const errors = []
  for (const {pos, message} of report) {
    if (inRange(loc, pos)) errors.push(message)
  }
  if (errors.length === 0) return 'no errors'
  return `\n--typescript--\n${errors.join(`\n`)}\n`
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
