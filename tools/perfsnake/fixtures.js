//@flow

function callCond(_: any) {
  if (this(_)) return _
}

function cond<T>(fn: (_: T) => boolean): (_: T) => T | void {
  return callCond.bind(fn)
}

export function getPixelEvent(x: number, y: number, setProperty: *) {
  return setProperty.filter(cond(data => data.x === x && data.y === y))
}

export function propCond(
  prop: 'wall' | 'food' | 'snake' | 'cursor',
  e: *,
  s: *,
) {
  const result = e.filter(cond(data => data.prop === prop))
  s.on(result, extractValue)
  return result
}
export function joinRow(...list: Array<string>) {
  return list.join('')
}
function selectFill(o: *): string {
  return o.fill
}
export function mapRow(p: *) {
  return p.map(selectFill)
}
function extractValue(_, data) {
  return data.value
}
export function switchChar(opts: {
  hasWall: boolean,
  hasFood: boolean,
  hasSnake: boolean,
  hasCursor: boolean,
}) {
  if (opts.hasCursor) return '↖'
  if (opts.hasWall) return '#'
  if (opts.hasSnake) return '*'
  if (opts.hasFood) return '@'
  return ' '
}
export function mergeStore(data: {
  fill: string,
  baseInfo: {
    hasWall: boolean,
    hasFood: boolean,
    hasSnake: boolean,
    hasCursor: boolean,
  },
}) {
  return {
    fill: data.fill,
    hasWall: data.baseInfo.hasWall,
    hasFood: data.baseInfo.hasFood,
    hasSnake: data.baseInfo.hasSnake,
    hasCursor: data.baseInfo.hasCursor,
  }
}
