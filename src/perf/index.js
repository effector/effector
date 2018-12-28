//@flow

import {__DEBUG__} from 'effector/flags'
import {getDisplayName, type Store} from 'effector/store'

type StoreMeasurementPhase = 'map' | 'subscribe'

const effectorEmoji = '\u2604'

const supportsUserTiming =
  typeof performance !== 'undefined'
  && typeof performance.mark === 'function'
  && typeof performance.clearMarks === 'function'
  && typeof performance.measure === 'function'
  && typeof performance.clearMeasures === 'function'

const enableUserTimingAPI = __DEBUG__

function formatMarkName(markName: string) {
  return `${effectorEmoji} ${markName}`
}

const formatLabel = (label: string, warning: string | null) => {
  const prefix = `${effectorEmoji} `
  const suffix = warning ? ` Warning: ${warning}` : ''
  return `${prefix}${label}${suffix}`
}

function getStoreLabel(storeName: string, phase: StoreMeasurementPhase) {
  return `${storeName}.${phase}`
}

function getStoreMarkName(label: string, debugID: string) {
  return `${label} (#${debugID})`
}

export function beginMark(markName: string) {
  performance.mark(formatMarkName(markName))
}

export function endMark(
  label: string,
  markName: string,
  warning: string | null,
) {
  const formattedMarkName = formatMarkName(markName)
  const formattedLabel = formatLabel(label, warning)
  try {
    performance.measure(formattedLabel, formattedMarkName)
  } catch (err) {}
  // Clear marks immediately to avoid growing buffer.
  performance.clearMarks(formattedMarkName)
  performance.clearMeasures(formattedLabel)
}

export function beginStoreMark<S>(
  store: Store<S>,
  phase: StoreMeasurementPhase,
) {
  if (enableUserTimingAPI) {
    if (!supportsUserTiming) return
    const componentName = getDisplayName(store)
    const debugID = store.id
    const label = getStoreLabel(componentName, phase)
    const markName = getStoreMarkName(label, debugID)
    beginMark(markName)
    return true
  }
}

export function endStoreMark<S>(
  store: Store<S>,
  phase: StoreMeasurementPhase,
  warning: string | null,
) {
  if (enableUserTimingAPI) {
    if (!supportsUserTiming) return
    const componentName = getDisplayName(store)
    const debugID = store.id
    const label = getStoreLabel(componentName, phase)
    const markName = getStoreMarkName(label, debugID)
    endMark(label, markName, warning)
  }
}
