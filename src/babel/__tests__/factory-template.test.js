import {transformSync} from '@babel/core'

import babelPlugin from '../babel-plugin'
import {formatCode} from './utils'

/**
 * Regression: Babel 8 requires @babel/template replacements to be
 * identifiers or AST nodes. Passing JSON.stringify(...) for sid/name/method
 * breaks factory wrapping under Babel 8.
 */
describe('factory template placeholders', () => {
  const source = `
    import {createQuery} from '@farfetched/core'
    import {debounce} from 'patronum'

    const q = createQuery({handler: async () => null})
    debounce({source: q, timeout: 100})
  `

  it('wraps factories with stringLiteral sid/name/method (addLoc)', () => {
    const {code} = transformSync(source, {
      configFile: false,
      babelrc: false,
      filename: 'factory-template.test.js',
      plugins: [
        [
          babelPlugin,
          {
            addLoc: true,
            addNames: true,
            factories: ['@farfetched/core', 'patronum'],
          },
        ],
      ],
    })

    const formatted = formatCode(code)
    expect(formatted).toContain("sid: '")
    expect(formatted).toContain("name: 'q'")
    expect(formatted).toContain("method: 'createQuery'")
    expect(formatted).toContain("name: 'none'")
    expect(formatted).toContain("method: 'debounce'")
    expect(formatted).toMatch(/withFactory/)
  })

  it('wraps factories with stringLiteral sid only (no names/loc)', () => {
    const {code} = transformSync(source, {
      configFile: false,
      babelrc: false,
      filename: 'factory-template.test.js',
      plugins: [
        [
          babelPlugin,
          {
            addLoc: false,
            addNames: false,
            factories: ['@farfetched/core', 'patronum'],
          },
        ],
      ],
    })

    const formatted = formatCode(code)
    expect(formatted).toContain("sid: '")
    expect(formatted).not.toContain('name:')
    expect(formatted).not.toContain('method:')
    expect(formatted).toMatch(/withFactory/)
  })
})
