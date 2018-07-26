//@flow

import type {Performance} from 'perf_hooks'

let perf: Performance
const effectorEmoji = '☄️' + ' '

if (window && window.performance) {
 perf = window.performance
} else {
 //perf = require('perf_hooks').performance
}

function formatMarkName(markName: string) {
 return `${effectorEmoji} ${markName}`
}

export function beginMark(markName: string) {
 perf.mark(formatMarkName(markName))
}

export function endMark(label: string, markName: string) {
 const formattedMarkName = formatMarkName(markName)
 const formattedLabel = formatMarkName(label)
 try {
  perf.measure(formattedLabel, formattedMarkName)
 } catch (err) {}
 // Clear marks immediately to avoid growing buffer.
 perf.clearMarks(formattedMarkName)
 perf.clearMeasures(formattedLabel)
}
