//@flow

import type {Performance} from 'perf_hooks'

let perf: Performance
const effectorEmoji = '☄️'

const useTimingAPI = typeof window !== 'undefined' && window.performance

function formatMarkName(markName: string) {
  return `${effectorEmoji} ${markName}`
}

export function beginMark(markName: string) {
  if (useTimingAPI) {
    performance.mark(formatMarkName(markName))
  }
}

export function endMark(label: string, markName: string) {
  if (useTimingAPI) {
    const formattedMarkName = formatMarkName(markName)
    const formattedLabel = formatMarkName(label)
    try {
      performance.measure(formattedLabel, formattedMarkName)
    } catch (err) {}
    // Clear marks immediately to avoid growing buffer.
    performance.clearMarks(formattedMarkName)
    performance.clearMeasures(formattedLabel)
  }
}
