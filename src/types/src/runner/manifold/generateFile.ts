import {promises} from 'fs'
import {resolve} from 'path'

import {exec} from './operators'
import {createGroupedCases} from './createGroupedCases'
import {byFields} from './byFields'
import {fileGeneratorConfStruct} from './config'
import {leftPad} from '../text'

export async function generateFile({cases}: {cases: Array<() => void>}) {
  const fileMap: Record<
    string,
    Array<{header: string; usedMethods: string[]; generatedLines: string[]}>
  > = {}
  for (const caseFn of cases) {
    const execResult = exec(caseFn, fileGeneratorConfStruct)
    const generatedLines = createGroupedCases(
      byFields(execResult.plan, execResult.config, execResult.items).map(
        e => e.value,
      ),
      execResult.grouping,
    )
    const file = execResult.file!
    const header = execResult.header!.trim()
    const usedMethods = execResult.usedMethods!
    if (!(file in fileMap)) fileMap[file] = []
    fileMap[file].push({header, usedMethods, generatedLines})
  }
  await Promise.all(
    Object.entries(fileMap).map(async ([file, blocks]) => {
      const usedMethods = [
        ...new Set(blocks.flatMap(block => block.usedMethods)),
      ]
      const fileLines = [
        '/* eslint-disable no-unused-vars */',
        `import {${usedMethods.join(', ')}} from 'effector'`,
        `const typecheck = '{global}'`,
      ]
      if (blocks.length === 1) {
        const [block] = blocks
        fileLines.push(block.header, ...block.generatedLines)
      } else {
        for (const block of blocks) {
          fileLines.push('{')
          fileLines.push(...leftPad([block.header]))
          fileLines.push(...leftPad(block.generatedLines))
          fileLines.push('}')
        }
      }
      const fullFileName = resolve(
        __dirname,
        '..',
        '..',
        '..',
        '__tests__',
        'effector',
        ...`${file}.test.ts`.split('/'),
      )
      const content = fileLines.join(`\n`)
      await promises.writeFile(fullFileName, content)
    }),
  )
  const filesTotal = Object.keys(fileMap).map(
    file => `__tests__/effector/${file}.test.ts`,
  )
  console.log(`generated files:\n${filesTotal.join(`\n`)}`)
}
