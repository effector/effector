import {USE_PERF} from '../env'

export let beginMark: (label: string) => void
export let endMark: (label: string) => void
if (USE_PERF && typeof performance !== 'undefined' && performance.mark) {
  beginMark = label => {
    performance.mark('☄️ ' + label + ' start')
  }
  endMark = label => {
    try {
      performance.measure('☄️ ' + label, '☄️ ' + label + ' start')
    } catch (err) {} // Clear marks immediately to avoid growing buffer.

    performance.clearMarks('☄️ ' + label + ' start')
    performance.clearMeasures('☄️ ' + label)
  }
} else {
  beginMark = label => {}
  endMark = label => {}
}
