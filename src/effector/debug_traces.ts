let enabled = false

export function setDebugTraces(value: boolean) {
  enabled = value

  if (value) {
    console.error(
      new Error(
        `
---
 The 'effector/enable_debug_traces' module was imported and debug traces are now enabled.

 You will see a detailed trace to the unit location in error messages, where applicable.

 Note that using this API may cause a significant performance impact, so it is not recommended for use in production.
---
        `,
      ),
    )
  }
}

export function debugTracesEnabled() {
  return enabled
}
