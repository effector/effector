import {generateFile} from './runner/manifold/generateFile'

import sampleTargetRequirements from './generator/sampleTargetRequirements.generator'
import sampleCallbackInference from './generator/sampleCallbackInference.generator'
import sampleInlineEffect from './generator/sampleInlineEffect.generator'
import sampleClockArray from './generator/sampleClockArray.generator'
import sampleArrayTargetCombinable from './generator/sampleArrayTargetCombinable.generator'
import sampleArrayTarget from './generator/sampleArrayTarget.generator'
import sampleReturn from './generator/sampleReturn.generator'
import sampleFilterGenerator from './generator/sampleFilter.generator'
import guardGenerator from './generator/guard.generator'
import sampleFn from './generator/sampleFn.generator'
import sampleArrayForms from './generator/sampleArrayForms.generator'
import sampleDiscriminatedFn from './generator/sampleDiscriminatedFn.generator'
import sampleTypeGuards from './generator/sampleTypeGuards.generator'

generateFile({
  //prettier-ignore
  cases: [
    sampleTargetRequirements,
    sampleCallbackInference,
    sampleInlineEffect,
    sampleArrayTarget,
    sampleArrayTargetCombinable,
    sampleReturn,
    sampleFilterGenerator,
    guardGenerator,
    sampleClockArray,
    sampleFn,
    sampleArrayForms,
    sampleDiscriminatedFn,
    sampleTypeGuards,
  ],
})
