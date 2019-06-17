//@flow

import * as React from 'react'
import {useStore} from 'effector-react'
import {shareCode} from '../graphql'
import {sourceCode} from '../domain'
import {ShareGroup, ShareButton, SharedUrl} from './styled'
import {sharedUrl, canShare, urlRef, clickShare} from './controller'
import {isShareAPISupported} from '../device'

const Save = () => {
  const pending = useStore(shareCode.pending)
  const codeToShare = useStore(sourceCode)
  return (
    <ShareButton onClick={() => shareCode(codeToShare)} disabled={pending}>
      save
    </ShareButton>
  )
}

const Copy = () => {
  const shareAllowed = useStore(canShare)
  const copyMessage = <>copy&nbsp;to&nbsp;clipboard</>
  return (
    <ShareButton onClick={clickShare} disabled={!shareAllowed}>
      {isShareAPISupported ? 'share' : copyMessage}
    </ShareButton>
  )
}

const Url = () => {
  const url = useStore(sharedUrl)
  return <SharedUrl ref={urlRef} value={url} readOnly />
}

export const Share = () => (
  <ShareGroup>
    <Save />
    <Copy />
    <Url />
  </ShareGroup>
)
