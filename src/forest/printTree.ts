import type {Block} from './relation.h'
function printVisible({visible}: {visible: boolean}) {
  return visible ? 'visible' : 'invisible'
}
function printIdx({index}: {index: number}) {
  return `[${index}]`
}
function printVisibleIndexed(
  level: Extract<Block, {index: number; visible: boolean}>,
) {
  return `[${level.type}] ${printIdx(level)} | ${printVisible(level)}`
}
function printCond(tag: string, cond: boolean) {
  return cond ? tag : `not ${tag}`
}
function parseChilds(
  level: {child: Block[]},
  pad: number,
  lines: {pad: number; text: string}[],
) {
  level.child.forEach(edge => {
    parseLevel(edge, pad + 1, lines)
  })
}
function parseLevel(
  level: Block,
  pad: number,
  lines: {pad: number; text: string}[],
) {
  switch (level.type) {
    case 'text': {
      const content = level.value.textContent!.slice(0, 20)
      const isVisible = printVisible(level)
      lines.push({
        pad,
        text: `[text] ${printIdx(level)} | ${isVisible} | "${content}"`,
      })
      break
    }
    case 'element': {
      let tag = '??'
      if (level.value) tag = level.value.tagName.toLowerCase()
      const isVisible = printVisible(level)
      lines.push({
        pad,
        text: `[element] <${tag}> ${printIdx(level)} | ${isVisible}`,
      })
      parseChilds(level, pad, lines)
      break
    }
    case 'using': {
      lines.push({
        pad,
        text: `[Using]`,
      })
      parseChilds(level, pad, lines)
      break
    }
    case 'list':
    case 'route':
    case 'recItem':
    case 'rec':
    case 'block':
    case 'blockItem': {
      lines.push({
        pad,
        text: printVisibleIndexed(level),
      })
      parseChilds(level, pad, lines)
      break
    }
    case 'LF': {
      const left = printCond('left', !!level.left)
      const right = printCond('right', !!level.right)
      const last = printCond('last', level.parent.lastChild === level)
      const isVisible = printVisible(level)
      lines.push({
        pad,
        text: `[LF] ${left} | ${right} | ${isVisible} | ${last}`,
      })
      parseChilds(level, pad, lines)
      break
    }
    default: {
      const _: never = level
    }
  }
}
export function printTree(start: Block, fromTop: boolean = true) {
  let block = start
  if (fromTop) {
    while (block.type !== 'using') {
      block = block.parent
    }
  }
  const lines = [] as {pad: number; text: string}[]
  parseLevel(block, 0, lines)

  const results = [] as string[]
  function hasSiblingAtPad(idx: number, pad: number) {
    let hasSiblings = false
    for (let i = idx + 1; i < lines.length; i++) {
      const item = lines[i]
      if (item.pad > pad) continue
      if (item.pad === pad) {
        hasSiblings = true
        break
      }
      if (item.pad < pad) break
    }
    return hasSiblings
  }
  for (const [idx, {pad, text}] of lines.entries()) {
    const siblings = Array.from({length: pad}, (_, pad) =>
      hasSiblingAtPad(idx, pad),
    )
    const line: string[] = []
    for (let i = 0; i < pad; i++) {
      const blockSymbol = siblings[i] ? '│ ' : '  '
      line.push(blockSymbol)
    }
    let hasSiblings = hasSiblingAtPad(idx, pad)
    const bendSymbol = hasSiblings ? '├' : '└'
    const lastPad = pad > 0 ? `${bendSymbol}─` : ''

    results.push(line.join('') + lastPad + text)
  }
  console.log(results.join(`\n`))
}
