import {promises} from 'fs'
import {resolve} from 'path'

import {suiteGenerator} from './generateCases'

export async function generateFile(config: {
  file: string
  dir: string
  usedMethods: string[]
  header: string
  // shape?: Record<string, any>[]
  generateCases(): //shape: Record<string, any>,
  void //{description: string; noGroup?: boolean; cases: string[]}
}) {
  const {file, dir, usedMethods = [], header = ''} = config

  const suite = suiteGenerator(config.generateCases)
  const content = `/* eslint-disable no-unused-vars */
import {${usedMethods.join(', ')}} from 'effector'
const typecheck = '{global}'

${header.trim()}

${suite}`

  const srcRoot = resolve(
    __dirname,
    '..',
    '__tests__',
    'effector',
    ...dir.split('/'),
  )
  const fullFileName = resolve(srcRoot, `${file}.test.ts`)
  await promises.writeFile(fullFileName, content)
}
