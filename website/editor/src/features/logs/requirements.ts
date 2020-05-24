import {createEvent} from 'effector'

/** When code source changed */
export const sourcesChanged = createEvent<string>()

/** When effector version changed in UI */
export const versionChanged = createEvent<string>()

export const realmActiveChanged = createEvent<boolean>()

export const autoScrollLogChanged = createEvent<boolean>()
