import execa from 'execa'
import fs from 'fs-extra'
import {processFlow} from '../src/proc'
import {generateReport} from '../src/show'

async function runFlow() {
  try {
    const result = await execa('npx', [
      'flow',
      'check',
      '--json',
      `src/types/__fixtures__/flow`,
    ])
    return {result}
  } catch (err) {
    const data = JSON.parse(
      err.message.substring(err.message.indexOf('\n') + 1).trim(),
    )
    const result = await generateReport(processFlow(data))

    return {errors: result}
  }
}

async function runTypeScript() {
  try {
    const result = await execa('npx', [
      'tsc',
      '-p',
      `src/types/__fixtures__/typescript`,
    ])
    return {result}
  } catch (err) {
    const cleanedMessage = err.message
      .replace(/src\/types\//gm, '')
      .replace(/error TS\d+: /gm, '')
      .replace(/\(\d+,\d+\)/gm, '')
    return {errors: cleanedMessage}
  }
}

export async function typeCheck(tsFile, flowFile) {
  const ts = await runTypeScript()
  const flow = await runFlow()

  expect(ts.errors).toMatchSnapshot()
  expect(flow.errors).toMatchSnapshot()

  await fs.remove(tsFile)
  await fs.remove(flowFile)
}
