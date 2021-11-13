import {generateFile} from './runner/manifold/generateFile'

import sampleClockArray from './generator/sampleClockArray.generator'
import sampleArrayTargetCombinable from './generator/sampleArrayTargetCombinable.generator'
import sampleArrayTargetPlain from './generator/sampleArrayTargetPlain.generator'
import sampleReturn from './generator/sampleReturn.generator'
import sampleFilterGenerator from './generator/sampleFilter.generator'
import guardGenerator from './generator/guard.generator'

generateFile({
  //prettier-ignore
  cases: [
    sampleArrayTargetPlain,
    sampleArrayTargetCombinable,
    sampleReturn,
    sampleFilterGenerator,
    guardGenerator,
    sampleClockArray,
  ],
})
