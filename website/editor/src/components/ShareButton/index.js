//@flow

import * as React from 'react'

import {createComponent} from 'effector-react'

import {message, clickShare, sharedUrl, inputRef} from './api'
import {TryButton, Tooltip, Arrow} from './view'

const Message = createComponent(message, (props, message) => message)

const SharedUrl = createComponent(sharedUrl, ({}, url) => (
  <input ref={inputRef} value={url || ''} readOnly />
))

export function ShareButton() {
  return (
    <TryButton>
      <SharedUrl />
      <div onClick={clickShare}>Share</div>
      <Tooltip>
        <Arrow />
        <Message />
      </Tooltip>
    </TryButton>
  )
}
