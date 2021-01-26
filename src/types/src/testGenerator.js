//@ts-check

const {
  generateCaseSetFile,
  boolField,
  printArray,
  createTest,
  byFields,
  createGroupedCases,
  printBools,
} = require('./generateCaseSetFile')

const sampleClockArray = require('./generator/sampleClockArray.generator')
const sampleArrayTargetCombinable = require('./generator/sampleArrayTargetCombinable.generator')
const sampleArrayTargetPlain = require('./generator/sampleArrayTargetPlain.generator')
const sampleReturn = require('./generator/sampleReturn.generator')
const guardGenerator = require('./generator/guard.generator')
/**
  fn:
  - with fn with second argument
  - with fn without second argument
  - without fn

  source:
  - unit
  - combinable

  target:
  - without target
  - unit
  - array of units


  clock array kinds:
    no unification to any:
  - [voidt, str]
  - [str, voidt]
    unification to any:
  - [voidt, anyt, str]
  - [voidt, str, anyt]
  - [anyt, voidt, str]
  - [anyt, str, voidt]
  - [str, voidt, anyt]
  - [str, anyt, voidt]
  */

generateCaseSetFile({
  file: 'clockArrayGen',
  dir: 'sample/generated',
  usedMethods: ['createStore', 'createEvent', 'sample'],
  header: sampleClockArray.header,
  shape: {},
  generateCases({}) {
    const casesDefs = byFields([{}], {
      shape: sampleClockArray.shape,
    })
    const resultCases = createGroupedCases(casesDefs, sampleClockArray.grouping)
    return {
      description: '',
      noGroup: true,
      cases: resultCases,
    }
  },
})

generateCaseSetFile({
  shape: {
    combinable: boolField(),
  },
  generateCases({combinable}) {
    if (combinable) {
      const casesDefs = byFields([{}], {
        shape: sampleArrayTargetCombinable.shape,
      })
      const resultCases = createGroupedCases(
        casesDefs,
        sampleArrayTargetCombinable.grouping,
      )
      return {
        description: 'combinable',
        cases: resultCases,
      }
    }
    const casesDefs = byFields([{}], {
      shape: sampleArrayTargetPlain.shape,
    })
    const resultCases = createGroupedCases(
      casesDefs,
      sampleArrayTargetPlain.grouping,
    )
    return {
      description: 'basic cases',
      cases: resultCases,
    }
  },
  file: 'arrayTargetGen',
  dir: 'sample/generated',
  usedMethods: ['createStore', 'createEvent', 'sample', 'combine'],
  header: `
/** used as valid source type */
type AN = {a: number}
/** used as invalid source type */
type AS = {a: string}
/** used as valid source type */
type AB = {a: number; b: string}
/** used as invalid source type */
type ABN = {a: number; b: number}
const voidt = createEvent()
const anyt = createEvent<any>()
const str = createEvent<string>()
const num = createEvent<number>()
const numStr = createEvent<number | string>()
const strBool = createEvent<string | boolean>()
const $num = createStore<number>(0)
const $str = createStore<string>('')
const a_num = createEvent<AN>()
const a_str = createEvent<AS>()
const ab = createEvent<AB>()
const abn = createEvent<ABN>()
const l_num = createEvent<[number]>()
const l_str = createEvent<[string]>()
const l_num_str = createEvent<[number, string]>()
const l_num_num = createEvent<[number, number]>()
`,
})

generateCaseSetFile({
  shape: {},
  generateCases({}) {
    const casesDefs = byFields([{}], {
      shape: sampleReturn.shape,
    })
    const resultCases = createGroupedCases(casesDefs, sampleReturn.grouping)
    return {
      description: '-',
      noGroup: true,
      cases: resultCases,
    }
  },
  file: 'sampleReturnGen',
  dir: 'sample/generated',
  usedMethods: ['createStore', 'createEvent', 'sample', 'Event', 'Store'],
  header: sampleReturn.header,
})

generateCaseSetFile({
  shape: {},
  generateCases({}) {
    const casesDefs = byFields([{}], {
      shape: guardGenerator.shape,
    })
    const resultCases = createGroupedCases(casesDefs, guardGenerator.grouping)
    return {
      description: '-',
      noGroup: true,
      cases: resultCases,
    }
  },
  file: 'guardGen',
  dir: 'generated',
  usedMethods: ['createStore', 'createEvent', 'guard'],
  header: guardGenerator.header,
})
