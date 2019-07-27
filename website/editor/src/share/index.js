//@flow

import * as React from 'react'
import {useStore} from 'effector-react'
import {shareCode} from '../graphql'
import {sourceCode} from '../domain'
import {ShareGroup, ShareButton, SharedUrl, Label} from './styled'
import {sharedUrl, canShare, urlRef, clickShare} from './controller'
import {Section} from '../settings/styled'
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
  return (
    url && (
      <Section>
        <SharedUrl ref={urlRef} value={url} readOnly />
      </Section>
    )
  )
}

export const Share = () => (
  <ShareGroup>
    <Section>
      <Label>
        <Save />
        <Copy />
      </Label>
    </Section>
    <Url />
  </ShareGroup>
)
