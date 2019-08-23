export function processFlow({errors}) {
  return errors.map(e => {
    const result = {}
    const extra = e.extra
      .map(e1 => e1.message[0])
      .slice(1)
      .map(processItem)
    const message = processItem(e.message[0])
    result.refs = extra
    result.message = message
    return result
  })
}
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
