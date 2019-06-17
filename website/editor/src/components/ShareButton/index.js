//@flow

import * as React from 'react'

import {useStore} from 'effector-react'

import {message, clickShare, sharedUrl, inputRef, clickInputUrl} from './api'
import {TryButton, Tooltip, Arrow} from './view'
import {shareCode} from '../../graphql'

const Message = () => {
  const text = useStore(message)
  return text
}

const SharedUrl = () => {
  const url = useStore(sharedUrl)
  return (
    <input onClick={clickInputUrl} ref={inputRef} value={url || ''} readOnly />
  )
}

const ShareText = () => {
  const pending = useStore(shareCode.pending)
  if (pending) return <div>Sharing...</div>
  return <div onClick={clickShare}>Share</div>
}

export function ShareButton() {
  return (
    <TryButton>
      <SharedUrl />
      <ShareText />
      <Tooltip>
        <Arrow />
        <Message />
      </Tooltip>
    </TryButton>
  )
}
