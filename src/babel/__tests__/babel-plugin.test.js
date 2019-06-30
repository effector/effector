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
    it(`should ${caseName}`, () => {
      const fixturePath = path.join(fixturesDir, caseFile)
      const fixture = transformFileSync(fixturePath, {
        configFile: path.join(__dirname, '.babelrc'),
      })?.code

      expect(fixture).toMatchSnapshot()
    })
  }
})
