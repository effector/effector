//@flow

import * as React from 'react'
import {useStore} from 'effector-react'
import {shareCode} from '../graphql'
import {sourceCode} from '../editor/state'
import {ShareGroup, ShareButton, SharedUrl, Label} from './styled'
import {sharedUrl, canShare, urlRef, clickShare} from './controller'
import {Section} from '../settings/view'
import {isShareAPISupported} from '../device'
import {config} from '../github/config'


const Save = () => {
  const pending = useStore(shareCode.pending)
  const codeToShare = useStore(sourceCode)
  return (
    <ShareButton onClick={() => shareCode(codeToShare)} disabled={pending}>
      Save
    </ShareButton>
  )
}

const Copy = () => {
  const shareAllowed = useStore(canShare)
  return (
    <ShareButton onClick={clickShare} disabled={!shareAllowed}>
      {isShareAPISupported ? 'Share' : 'Copy to clipboard'}
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


export const Share = () => {
  return (
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
}
