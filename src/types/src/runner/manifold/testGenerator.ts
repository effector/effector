import {DataDecl} from './types'
import {generate} from './generate'
import {assert} from './assert'
import {compute} from './declarationFactory'

export function testGenerator(
  fn: () => {
    // align: DataDecl<boolean>
    pass: DataDecl<boolean>
    testName: DataDecl<string>
    // testGroup: DataDecl<string[]>
    content: DataDecl<string>
    // usedMethods: DataDecl<string[]>
    // file: DataDecl<string>
    // header: DataDecl<string>
  },
) {
  const result = generate(() => {
    const results = fn()
    // assert('pass' in results)
    // assert('testName' in results)
    // assert('content' in results)
    return compute({
      source: results,
      fn: ({pass, testName, content}) => ({pass, testName, content}),
    })
  })
  console.log(result)
  return result
}
