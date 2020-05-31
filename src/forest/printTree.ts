import {Block} from './relation.h'

export function printTree(start: Block) {
  let block = start
  while (block.type !== 'using') {
    block = block.parent.parent
  }
  const lines = [] as {pad: number; text: string}[]
  parseLevel(block, 0)
  function parseLevel(level: Block, pad: number) {
    switch (level.type) {
      case 'text':
        lines.push({
          pad,
          text: `[Text] ${level.value.textContent!.slice(0, 20)}`,
        })
        break
      case 'element': {
        let tag = '??'
        if (level.value) tag = level.value.tagName.toLowerCase()
        lines.push({
          pad,
          text: `[Element] ${tag}`,
        })
        parseLevel(level.child.child, pad + 1)
        break
      }
      case 'fragment': {
        lines.push({
          pad,
          text: `[Fragment]`,
        })
        level.child.forEach(edge => {
          lines.push({
            pad: pad + 1,
            text: `[${edge.type}] index ${edge.index} | visible ${edge.visible}`,
          })
          parseLevel(edge.child, pad + 2)
        })
        break
      }
      case 'using': {
        lines.push({
          pad,
          text: `[Using]`,
        })
        parseLevel(level.child.child, pad + 1)
        break
      }
      case 'list': {
        lines.push({
          pad,
          text: `[List]`,
        })
        level.child.forEach(edge => {
          lines.push({
            pad: pad + 1,
            text: `[${
              edge.type
            }] left ${!!edge.left} | right ${!!edge.right} | visible ${
              edge.visible
            } | last ${edge.parent.lastChild === edge}`,
          })
          parseLevel(edge.child, pad + 2)
        })
        break
      }
      case 'route': {
        lines.push(
          {
            pad,
            text: `[Route]`,
          },
          {
            pad: pad + 1,
            text: `[RF] visible ${level.child.visible}`,
          },
        )
        parseLevel(level.child.child, pad + 2)
        break
      }
      case 'tree': {
        lines.push({
          pad,
          text: `[Tree]`,
        })
        parseLevel(level.child, pad + 1)
        break
      }
    }
  }
  const results = [] as string[]
  for (const {pad, text} of lines) {
    results.push('  '.repeat(pad) + text)
  }
  console.log(results.join(`\n`))
}
