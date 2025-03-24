import fs from 'fs'
import path from 'path'
import {transformFileSync} from '@babel/core'
import {formatCode} from './utils'

describe('babel-plugin', () => {
  const fixturesDir = path.join(__dirname, 'fixtures')
  const testCases = fs
    .readdirSync(fixturesDir)
    .filter(file => file.endsWith('.js'))
    .sort()
  for (const caseFile of testCases) {
    const isMultiPass = caseFile.includes('multiPass')
    const caseName = caseFile.split('-').join(' ').slice(0, -3)

    const optionsName = `${caseFile.slice(0, -3)}.options.json`
    const optionsPath = path.join(fixturesDir, optionsName)
    const hasOptions = fs.existsSync(optionsPath)

    if (isMultiPass) {
      it('support multiple passes of babel plugin', () => {
        const options = {filename: true, addLoc: true}
        const fixturePath = path.join(fixturesDir, caseFile)
        const fixture = transformFileSync(fixturePath, {
          configFile: false,
          babelrc: false,
          envName: 'test',
          plugins: [
            [path.resolve(__dirname, '../babel-plugin.js'), options],
            [
              path.resolve(__dirname, '../babel-plugin.js'),
              options,
              'effector-logger',
            ],
          ],
        })?.code

        expect(formatCode(fixture)).toMatchSnapshot()
      })
    } else if (hasOptions) {
      const options = JSON.parse(
        fs.readFileSync(optionsPath, {encoding: 'utf8'}).toString(),
      )

      it(`should ${caseName} with options`, () => {
        const fixturePath = path.join(fixturesDir, caseFile)
        const fixture = transformFileSync(fixturePath, {
          configFile: false,
          babelrc: false,
          envName: 'test',
          plugins: [[path.resolve(__dirname, '../babel-plugin.js'), options]],
        })?.code

        expect(formatCode(fixture)).toMatchSnapshot()
      })
    } else {
      it(`should ${caseName}`, () => {
        const fixturePath = path.join(fixturesDir, caseFile)
        const fixture = transformFileSync(fixturePath, {
          configFile: path.join(__dirname, '.babelrc'),
        })?.code

        expect(formatCode(fixture)).toMatchSnapshot()
      })
    }
  }
})
