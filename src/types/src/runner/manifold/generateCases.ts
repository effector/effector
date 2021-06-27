import {exec} from '../manifold'
import {createGroupedCases} from './createGroupedCases'
import {byFields} from './byFields'

export function suiteGenerator(execFn: () => void) {
  const execResult = exec(execFn)
  const cases = createGroupedCases(
    byFields(execResult.shape),
    execResult.grouping,
  )
  return cases.join(`\n`)
}
