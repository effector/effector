//@flow

import React from 'react'
import {styled} from 'linaria/react'
import type {StackFrame as StackFrameType} from '../../evaluator/stackframe/stack-frame'

const StackFrame = styled.div``

const Link = styled.div`
  font-size: 0.9em;
  margin-bottom: 0.9em;
`

function getPrettyURL(
  sourceFileName: ?string,
  sourceLineNumber: ?number,
  sourceColumnNumber: ?number,
  fileName: ?string,
  lineNumber: ?number,
  columnNumber: ?number,
  compiled: boolean,
): string {
  let prettyURL
  if (!compiled && sourceFileName && typeof sourceLineNumber === 'number') {
    // Remove everything up to the first /src/ or /node_modules/
    const trimMatch = /^[/|\\].*?[/|\\]((src|node_modules)[/|\\].*)/.exec(
      sourceFileName,
    )
    if (trimMatch && trimMatch[1]) {
      prettyURL = trimMatch[1]
    } else {
      prettyURL = sourceFileName
    }
    prettyURL += ':' + sourceLineNumber
    // Note: we intentionally skip 0's because they're produced by cheap Webpack maps
    if (sourceColumnNumber) {
      prettyURL += ':' + sourceColumnNumber
    }
  } else if (fileName && typeof lineNumber === 'number') {
    prettyURL = fileName + ':' + lineNumber
    // Note: we intentionally skip 0's because they're produced by cheap Webpack maps
    if (columnNumber) {
      prettyURL += ':' + columnNumber
    }
  } else {
    prettyURL = 'unknown'
  }
  return prettyURL.replace('webpack://', '.')
}

export default function({frame}: {frame: StackFrameType, ...}) {
  const {
    fileName,
    lineNumber,
    columnNumber,
    _scriptCode: scriptLines,
    _originalFileName: sourceFileName,
    _originalLineNumber: sourceLineNumber,
    _originalColumnNumber: sourceColumnNumber,
    _originalScriptCode: sourceLines,
  } = frame
  const functionName = frame.getFunctionName()
  const url = getPrettyURL(
    sourceFileName,
    sourceLineNumber,
    sourceColumnNumber,
    fileName,
    lineNumber,
    columnNumber,
    false,
  )
  return (
    <StackFrame>
      <div>{functionName}</div>
      <Link>{url}</Link>
    </StackFrame>
  )
}
