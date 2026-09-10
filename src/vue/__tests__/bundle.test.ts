import {existsSync, readFileSync} from 'fs'
import {resolve} from 'path'

/**
 * The suite runs against the sources: babel maps `effector-vue` to `src/vue`,
 * so nothing here loads the published files and terser never runs. These cases
 * read the build when it is there, after `yarn build`, and are skipped when it
 * is not.
 */
const files = [
  'composition.mjs',
  'composition.cjs.js',
  'options-vue3.mjs',
  'options-vue3.cjs.js',
].map(name => resolve(__dirname, '../../../npm/effector-vue', name))

const built = files.every(file => existsSync(file))

;(built ? describe : describe.skip)('the built package', () => {
  /**
   * `booleans_as_integers` of terser turns a boolean literal into a number,
   * and Vue 3.5 reads a numeric `deep` as the depth to traverse, so `1` would
   * watch the top level of the props and nothing under it.
   */
  test.each(files)('keeps the deep watch option a boolean in %s', file => {
    const code = readFileSync(file, 'utf8')

    expect(code.match(/deep:\s*\d+/g) || []).toEqual([])
  })
})
