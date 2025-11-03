let enabled = false

export function setDebugTraces(value: boolean) {
  enabled = value

  if (value) {
    console.log(`[effector/debug_traces] Debug traces enabled`)
  }
}

export function debugTracesEnabled() {
  return enabled
}
