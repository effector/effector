//@flow

import {__DEV__} from 'effector/flags'
import type {CompositeName} from '../compositeName'
import {getDisplayName} from 'effector/naming'

type StoreMeasurementPhase = 'map' | 'subscribe'

let currentPhase: StoreMeasurementPhase | null = null
let currentPhaseStore: {
  compositeName?: CompositeName,
  domainName?: CompositeName,
  /*::+*/ id: string,
  /*::...*/
} | null = null

const enableUserTimingAPI = __DEV__

function startPhaseTimer(/*::
  store: {
    compositeName?: CompositeName,
    domainName?: CompositeName,
    +id: string,
    ...
  },
  phase: StoreMeasurementPhase,
*/) {}

function stopPhaseTimer(/*::warning: string | null*/) {}

if (enableUserTimingAPI) {
  const effectorEmoji = '\u2604'

  const supportsUserTiming =
    typeof performance !== 'undefined'
    && typeof performance.mark === 'function'
    && typeof performance.clearMarks === 'function'
    && typeof performance.measure === 'function'
    && typeof performance.clearMeasures === 'function'

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

  function beginMark(markName: string) {
    performance.mark(formatMarkName(markName))
  }

  function clearMark(markName: string) {
    performance.clearMarks(formatMarkName(markName))
  }

  function endMark(label: string, markName: string, warning: string | null) {
    const formattedMarkName = formatMarkName(markName)
    const formattedLabel = formatLabel(label, warning)
    try {
      performance.measure(formattedLabel, formattedMarkName)
    } catch (err) {}
    // Clear marks immediately to avoid growing buffer.
    performance.clearMarks(formattedMarkName)
    performance.clearMeasures(formattedLabel)
  }

  function beginStoreMark(store, phase: StoreMeasurementPhase) {
    const componentName = getDisplayName(store)
    const debugID = store.id
    const label = getStoreLabel(componentName, phase)
    const markName = getStoreMarkName(label, debugID)
    beginMark(markName)
    return true
  }

  function clearStoreMark(store, phase: StoreMeasurementPhase) {
    const componentName = getDisplayName(store)
    const debugID = store.id
    const label = getStoreLabel(componentName, phase)
    const markName = getStoreMarkName(label, debugID)
    clearMark(markName)
  }

  function endStoreMark(
    store,
    phase: StoreMeasurementPhase,
    warning: string | null,
  ) {
    const componentName = getDisplayName(store)
    const debugID = store.id
    const label = getStoreLabel(componentName, phase)
    const markName = getStoreMarkName(label, debugID)
    endMark(label, markName, warning)
  }

  const clearPendingPhaseMeasurement = () => {
    if (currentPhase !== null && currentPhaseStore !== null) {
      clearStoreMark(currentPhaseStore, currentPhase)
    }
    currentPhaseStore = null
    currentPhase = null
    //hasScheduledUpdateInCurrentPhase = false
  }

  startPhaseTimer = function(
    store: {
      compositeName?: CompositeName,
      domainName?: CompositeName,
      /*::+*/ id: string,
      /*::...*/
    },
    phase: StoreMeasurementPhase,
  ): void {
    if (!supportsUserTiming) {
      return
    }
    clearPendingPhaseMeasurement()
    if (!beginStoreMark(store, phase)) {
      return
    }
    currentPhaseStore = store
    currentPhase = phase
  }

  stopPhaseTimer = function(warning: string | null): void {
    if (!supportsUserTiming) {
      return
    }
    if (currentPhase !== null && currentPhaseStore !== null) {
      endStoreMark(currentPhaseStore, currentPhase, warning)
    }
    currentPhase = null
    currentPhaseStore = null
  }
}

export {startPhaseTimer, stopPhaseTimer}
