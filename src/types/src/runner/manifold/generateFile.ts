import {promises} from 'fs'
import {resolve} from 'path'
import {exec} from './operators'
import {createGroupedCases} from './createGroupedCases'
import {byFields} from './byFields'
import {fileGeneratorConfStruct} from './config'
import {leftPad} from '../text'
import {CaseItem, JsonOutput} from './types'

export function jsonOutputToAnnotatedFile(jsonOutput: JsonOutput) {
  /** annotations[groupIndex][caseIndex] */
  const annotations: {
    fromLine: number
    toLine: number
    group: number
    caseItem: number
  }[] = []
  const file: string[] = [...resplitLines(jsonOutput.header)]
  for (let i = 0; i < jsonOutput.groups.length; i++) {
    const group = jsonOutput.groups[i]
    file.push(';{', ...resplitLines([group.header]))
    for (let j = 0; j < group.caseItems.length; j++) {
      const caseItem = group.caseItems[j]
      const lines = resplitLines([caseItem.text]).filter(
        line => !line.includes('ts-expect-error'),
      )
      annotations.push({
        fromLine: file.length,
        toLine: file.length + lines.length + 2,
        group: i,
        caseItem: j,
      })
      file.push(';{', ...lines, '}')
    }
    file.push('}')
  }
  return {
    file: file.join(`\n`),
    annotations,
  }
  function resplitLines(lines: string[]) {
    return lines.join(`\n`).split(`\n`)
  }
}

export function generateFileData({cases}: {cases: Array<() => void>}) {
  const fileMap: Record<
    string,
    Array<{
      header: string
      usedMethods: string[]
      generatedLines: string[]
      caseItems: Array<CaseItem<any>>
    }>
  > = {}
  for (const caseFn of cases) {
    const execResult = exec(caseFn, fileGeneratorConfStruct)
    const {finalLines: generatedLines, resultCasesItems} = createGroupedCases(
      byFields(execResult.plan, execResult.config, execResult.items).map(
        e => e.value,
      ),
      execResult.grouping,
    )
    const file = execResult.file!
    const header = execResult.header!.trim()
    const usedMethods = execResult.usedMethods!
    if (!(file in fileMap)) fileMap[file] = []
    fileMap[file].push({
      header,
      usedMethods,
      generatedLines,
      caseItems: resultCasesItems,
    })
  }
  const jsonOutput: JsonOutput = {
    usedMethods: [],
    header: [],
    groups: [],
  }
  const fileResults = Object.entries(fileMap).map(([file, blocks]) => {
    const usedMethods = [...new Set(blocks.flatMap(block => block.usedMethods))]
    jsonOutput.usedMethods = [
      ...new Set([...jsonOutput.usedMethods, ...usedMethods]),
    ]
    const fileLines = [
      '/* eslint-disable no-unused-vars */',
      `import {${usedMethods.join(', ')}} from 'effector'`,
      `const typecheck = '{global}'`,
    ]
    for (const block of blocks) {
      jsonOutput.groups.push({
        file,
        header: block.header,
        caseItems: block.caseItems,
      })
    }
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
    const readableFileName = `__tests__/effector/${file}.test.ts`
    const content = fileLines.join(`\n`)
    return {fullFileName, content, readableFileName}
  })
  jsonOutput.header = [
    '/* eslint-disable no-unused-vars */',
    `import {${jsonOutput.usedMethods.join(', ')}} from 'effector'`,
    `const typecheck = '{global}'`,
  ]
  const jsonOutputFileName = resolve(
    __dirname,
    '..',
    '..',
    '..',
    'jsonOutput.json',
  )
  return {
    jsonResult: {
      fileName: jsonOutputFileName,
      output: jsonOutput,
    },
    fileResults,
  }
}

export async function generateFile({cases}: {cases: Array<() => void>}) {
  const {jsonResult, fileResults} = generateFileData({cases})
  await Promise.all(
    fileResults.map(({fullFileName, content}) =>
      promises.writeFile(fullFileName, content),
    ),
  )
  await promises.writeFile(
    jsonResult.fileName,
    JSON.stringify(jsonResult.output, null, 2),
  )
  const filesTotal = fileResults.map(({readableFileName}) => readableFileName)
  console.log(`generated files:\n${filesTotal.join(`\n`)}`)
}
