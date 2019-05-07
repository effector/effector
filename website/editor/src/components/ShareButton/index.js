//@flow

import * as React from 'react'

import {createComponent} from 'effector-react'

import {shareableUrl} from '../../domain'

import {message, clickShare} from './api'
import {TryButton, Tooltip, Arrow} from './view'

const Message = createComponent(message, (props, message) => message)

const SharedUrl = createComponent(shareableUrl, ({}, url) => (
  <input id="shareableUrl" value={url} readOnly />
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
