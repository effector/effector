//@flow strict

import fs from 'fs'
import path from 'path'
import {transformFileSync} from '@babel/core'

describe('babel-plugin', () => {
  const fixturesDir = path.join(__dirname, 'fixtures')
  const testCases = fs
    .readdirSync(fixturesDir)
    .filter(file => file.endsWith('.js'))
    .sort()
  for (const caseFile of testCases) {
    const caseName = caseFile
      .split('-')
      .join(' ')
      .slice(0, -3)

    const optionsName = `${caseFile.slice(0, -3)}.options.json`
    const optionsPath = path.join(fixturesDir, optionsName)
    const hasOptions = fs.existsSync(optionsPath)

    if (hasOptions) {
      const options = JSON.parse(
        fs.readFileSync(optionsPath, {encoding: 'utf8'}).toString(),
      )

      it(`should ${caseName} with options`, () => {
        const fixturePath = path.join(fixturesDir, caseFile)
        const fixture = transformFileSync(fixturePath, {
          // configFile: path.resolve(__dirname, '../../../babel.config.js'),
          configFile: false,
          babelrc: false,
          envName: 'test',
          plugins: [[path.resolve(__dirname, '../babel-plugin.js'), options]],
        })?.code

        expect(fixture).toMatchSnapshot()
      })
    } else {
      it(`should ${caseName}`, () => {
        const fixturePath = path.join(fixturesDir, caseFile)
        const fixture = transformFileSync(fixturePath, {
          configFile: path.join(__dirname, '.babelrc'),
        })?.code

        expect(fixture).toMatchSnapshot()
      })
    }
  }
})
