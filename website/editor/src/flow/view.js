//@flow

import * as React from 'react'
import {useStore, useList} from 'effector-react'
import {styled} from 'linaria/react'

import {typeErrors, typeHint} from './state'
import {typeHoverToggle} from '../settings/state'
import type {FlowMessage, FlowInfoTree} from './index.h'

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

const TypeErrors = styled.pre`
  display: flex;
  margin: 0;
  position: static;
  font-size: 80%;
  font-family: Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
    monospace;
  border-left: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 7px 10px;
  grid-column: 3 / span 1;
  grid-row: 3 / span 2;

  @media (max-width: 699px) {
    grid-column: 1 / span 1;
    grid-row: 3 / span 7;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li + li {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid #eee;
  }
`

const Scroll = styled.div`
  display: flex;
  overflow: auto;
`

export const TypeHintView = () => {
  const type = useStore(typeHint)
  const enabled = useStore(typeHoverToggle)
  return enabled ? null : <TypeHint>{type}</TypeHint>
}

const ErrorMessage = ({type, loc, context, descr}: FlowMessage) => {
  if (loc && loc.source != null && context != null) {
    const basename = loc.source.replace(/.*\//, '')
    //$todo
    const filename = basename !== 'repl.js' ? `${loc.source}:` : ''
    const prefix = `${filename}${loc.start.line}: `

    const before = context.slice(0, loc.start.column - 1)
    const highlight =
      loc.start.line === loc.end.line
        ? context.slice(loc.start.column - 1, loc.end.column)
        : context.slice(loc.start.column - 1)
    const after =
      loc.start.line === loc.end.line ? context.slice(loc.end.column) : ''

    const offset = loc.start.column + prefix.length - 1
    const arrow = `${(prefix + before).replace(/[^ ]/g, ' ')}^ `

    return (
      <>
        <div>
          {prefix + before}
          <strong className="msgHighlight">{highlight}</strong>
          {after}
        </div>
        {arrow}
        <span className="msgType">{descr}</span>
      </>
    )
  } else if (type === 'Comment') {
    return `. ${descr}\n`
  } else {
    return `${descr}\n`
  }
}

const Extra = ({message, children}: FlowInfoTree) => (
  <ul>
    {message && (
      <li>
        {message.map((message, key) => (
          <ErrorMessage key={key} {...message} />
        ))}
      </li>
    )}
    {children && (
      <li>
        {children.map((extra, key) => (
          <Extra key={key} {...extra} />
        ))}
      </li>
    )}
  </ul>
)

export const TypeErrorsView = () => (
  <TypeErrors>
    <Scroll>
      <ul>
        {useList(typeErrors, error => {
          // TODO: hide libdefs until errors are fixed
          if (
            process.env.NODE_ENV === 'production' &&
            error.message[0].loc?.type === 'LibFile'
          )
            return null

          return (
            <li>
              {error.message.map((message, key) => (
                <ErrorMessage key={key} {...message} />
              ))}
              {error.extra &&
                error.extra.map((extra, key) => <Extra key={key} {...extra} />)}
            </li>
          )
        })}
      </ul>
    </Scroll>
  </TypeErrors>
)
