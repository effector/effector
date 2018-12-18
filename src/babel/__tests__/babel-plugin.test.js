//@flow

import fs from 'fs'
import path from 'path'
import {transformFileSync} from '@babel/core'

describe('babel-plugin', () => {
  const fixturesDir = path.join(__dirname, 'fixtures')
  fs.readdirSync(fixturesDir)
    .sort()
    .map(caseName => {
      if (caseName === '.babelrc') return
      if (caseName === '.DS_Store') return
      it(`should ${caseName.split('-').join(' ')}`, () => {
        const fixtureDir = path.join(fixturesDir, caseName)
        const fixturePath = path.join(fixtureDir, 'index.js')
        const fixture = transformFileSync(fixturePath, {
          configFile: path.join(__dirname, '.babelrc'),
        }).code

        expect(fixture).toMatchSnapshot()
      })
    })
})
