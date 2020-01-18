import {USE_PERF} from '../env'

export function beginMark(markName: string) {
  // if (USE_PERF) {
  //   performance.mark('☄️ ' + markName + ' start')
  // }
}

export function endMark(label: string) {
  // if (USE_PERF) {
  //   try {
  //     performance.measure('☄️ ' + label, '☄️ ' + label + ' start')
  //   } catch (err) {} // Clear marks immediately to avoid growing buffer.
  //   performance.clearMarks('☄️ ' + label + ' start')
  //   performance.clearMeasures('☄️ ' + label)
  // }
}
