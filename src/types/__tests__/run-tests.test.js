// @flow

import execa from 'execa'

jest.setTimeout(50000)

test('TypeScript', async() => {
  try {
    const data = await execa('npx', ['tsc', '-p', 'src/types'])
    expect(data).toMatchSnapshot('resolved')
  } catch (err) {
    expect(err.message).toMatchSnapshot('rejected')
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
    expect(
      data.errors.map(error => error.message.map(p => p.descr)),
    ).toMatchSnapshot('json messages')
  }
})
