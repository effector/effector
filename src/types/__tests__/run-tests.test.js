// @flow

//$off
import execa from 'execa'
//$off
// import {outputJSON} from 'fs-extra'
import {processFlow} from '../proc'
import {generateReport} from '../show'

jest.setTimeout(50000)

test('TypeScript', async() => {
  try {
    const data = await execa('npx', ['tsc', '-p', 'src/types'])
    expect(data).toMatchSnapshot('resolved')
  } catch (err) {
    const cleanedMessage = err.message
      .replace(/src\/types\//gm, '')
      .replace(/error TS\d+: /gm, '')
    expect(cleanedMessage).toMatchSnapshot('rejected')
  }
})

test('Flow', async() => {
  try {
    const data = await execa('npx', [
      'flow',
      'focus-check',
      '--strip-root',
      '--json',
      'src/types/types.test.js',
    ])
    expect(JSON.parse(data.stdout)).toMatchSnapshot('resolved')
  } catch (err) {
    const data = JSON.parse(
      err.message.substring(err.message.indexOf('\n') + 1).trim(),
    )
    const result = await generateReport(processFlow(data))

    expect(result).toMatchSnapshot('json messages')
  }
})
