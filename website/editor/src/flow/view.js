//@flow

import * as React from 'react'

import {createComponent} from 'effector-react'
import {typeHint} from './domain'
import {styled} from 'linaria/react'

const lineHeight = 1.5
const lines = 3

const TypeHint = styled.pre`
  border-top: 1px solid #ddd;
  border-left: 1px solid #ddd;
  line-height: ${lineHeight}em;
  max-height: ${lineHeight * lines}em;
  overflow: auto;
  font-family: monospace;
  word-wrap: break-word;
  white-space: pre-wrap;
  word-break: normal;
  padding: 0 4px;
  margin: 0;
`

export const TypeHintView = createComponent<{||}, _>(typeHint, ({}, type) => {
  return <TypeHint>{type}</TypeHint>
})
