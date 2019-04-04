//@flow

import * as React from 'react'

import {createComponent} from 'effector-react'
import {typeHint} from './domain'
import {styled} from 'linaria/react'

const TypeHint = styled.pre`
  grid-column: 1 / span 1;
  grid-row: 2 / span 1;
  border-bottom: 1px solid #ddd;
  border-left: 1px solid #ddd;
  font-family: monospace;
  word-wrap: break-word;
  white-space: pre-wrap;
  word-break: normal;
  padding: 0 4px;
  margin: 0;

  @media (min-width: 700px) {
    grid-column: 2 / span 1;
    grid-row: 6 / span 1;
    border-top: 1px solid #ddd;
    border-bottom: 0;
  }
`

export const TypeHintView = createComponent<{||}, _>(typeHint, ({}, type) => {
  return <TypeHint>{type}</TypeHint>
})
