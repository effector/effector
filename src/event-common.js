//@flow

// import {safeDispatch, port} from './port'

import {nextEventID, toTag, counter, type Tag} from './id'

export function basicCommon(
  domainName: string, name: string
) {
  const type: Tag = toTag(domainName, name)
  return {
    eventID: nextEventID(),
    nextSeq: counter(),
    getType: (): Tag => type,
  }
}

