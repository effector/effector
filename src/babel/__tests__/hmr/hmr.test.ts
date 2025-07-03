import {configSetup, readAndCompile} from '../utils'

describe('hmr module', () => {
  test('esm format', async () => {
    expect(
      await readAndCompile(__dirname, 'hmr.js', configSetup('es', 'js')),
    ).toMatchSnapshot()
  })

  test('cjs format', async () => {
    expect(
      await readAndCompile(__dirname, 'hmr.js', configSetup('cjs', 'js')),
    ).toMatchSnapshot()
  })
})
