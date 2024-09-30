import {generateFile} from './runner/manifold/generateFile'

import sampleClockArray from './generator/sampleClockArray.generator'
import sampleArrayTargetCombinable from './generator/sampleArrayTargetCombinable.generator'
import sampleArrayTarget from './generator/sampleArrayTarget.generator'
import sampleReturn from './generator/sampleReturn.generator'
import sampleFilterGenerator from './generator/sampleFilter.generator'
import sampleFn from './generator/sampleFn.generator'

generateFile({
  //prettier-ignore
  cases: [
    sampleArrayTarget,
    sampleArrayTargetCombinable,
    sampleReturn,
    sampleFilterGenerator,
    sampleClockArray,
    sampleFn,
  ],
})
