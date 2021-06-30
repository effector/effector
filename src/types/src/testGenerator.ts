import {generateFile} from './runner/manifold/generateFile'

// import sampleClockArray from './generator/sampleClockArray.generator'
import sampleArrayTargetCombinable from './generator/sampleArrayTargetCombinable.generator'
import sampleArrayTargetPlain from './generator/sampleArrayTargetPlain.generator'
import sampleReturn from './generator/sampleReturn.generator'
import guardGenerator from './generator/guard.generator'

generateFile({
  //prettier-ignore
  cases: [
    sampleArrayTargetPlain,
    sampleArrayTargetCombinable,
    sampleReturn,
    guardGenerator,
  ]
})

// generateFile({
//   file: 'clockArrayGen',
//   dir: 'sample/generated',
//   usedMethods: ['createStore', 'createEvent', 'sample'],
//   header: sampleClockArray.header,
//   generateCases() {
//     const casesDefs = byFields(sampleClockArray.shape)
//     const resultCases = createGroupedCases(casesDefs, sampleClockArray.grouping)
//     return {
//       description: '',
//       noGroup: true,
//       cases: resultCases,
//     }
//   },
// })
