import {USE_PERF} from './env'
import {now} from './now'
type Bucket = {
  calls: number
  time: number
  label: string
  childTime: number
}
export const measures = new Map<string, Bucket>()
const bucketStack: Array<{bucket: Bucket; pendingStart: number}> = []
const startMeasure = (label: string) => {
  let bucket = measures.get(label)
  if (!bucket) {
    bucket = {
      calls: 0,
      time: 0,
      label,
      childTime: 0,
    }
    measures.set(label, bucket)
  }
  bucket.calls += 1
  bucketStack.push({bucket, pendingStart: now()})
}
const endMeasure = (label: string) => {
  const bucket = measures.get(label)!
  const pendingStart = bucketStack.pop()!.pendingStart
  const time = now() - pendingStart
  bucket.time += time

  if (bucketStack.length > 0) {
    const parent = bucketStack[bucketStack.length - 1].bucket
    parent.childTime += time
  }
}

export {startMeasure as perfStart, endMeasure as perfEnd}

export let beginMark: (label: string) => void
export let endMark: (label: string) => void
if (USE_PERF && typeof performance !== 'undefined' && performance.mark) {
  beginMark = label => {
    performance.mark('☄️ ' + label + ' start')
    startMeasure(label)
  }
  endMark = label => {
    endMeasure(label)
    try {
      performance.measure('☄️ ' + label, '☄️ ' + label + ' start')
    } catch (err) {} // Clear marks immediately to avoid growing buffer.

    performance.clearMarks('☄️ ' + label + ' start')
    performance.clearMeasures('☄️ ' + label)
  }
} else {
  beginMark = label => {
    startMeasure(label)
  }
  endMark = label => {
    endMeasure(label)
  }
}
