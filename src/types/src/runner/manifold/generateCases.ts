import {exec} from './operators'
import {createGroupedCases} from './createGroupedCases'
import {byFields} from './byFields'

export function suiteGenerator(execFn: () => void) {
  const execResult = exec(execFn)
  const cases = createGroupedCases(
    byFields(execResult.plan, execResult.config, execResult.items).map(
      e => e.value,
    ),
    execResult.grouping,
  )
  return cases.join(`\n`)
}
