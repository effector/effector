/* @flow */

import React from 'react'

const headerStyle = {
  fontSize: '1.5em',
  fontFamily: 'sans-serif',
  whiteSpace: 'pre-wrap',
  // Top bottom margin spaces header
  // Right margin revents overlap with close button
  margin: '0 2rem 0.75rem 0',
  flex: '0 0 auto',
  maxHeight: '50%',
  overflow: 'auto',
}

type HeaderPropType = {|
  headerText: string,
|}

function Header(props: HeaderPropType) {
  return <div style={headerStyle}>{props.headerText}</div>
}

export default Header
