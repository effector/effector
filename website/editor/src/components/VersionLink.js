//@flow

import React from 'react'
import ReactDOM from 'react-dom'

const root = document.getElementById('version')
if (!root) throw Error('no #version node')

const getHref = ({version, match, isMaster}) => {
  if (match)
    return {
      href: `pull/${match[1]}`,
      displayVersion: `PR #${match[1]}`,
    }
  if (isMaster)
    return {
      href: `tree/master`,
      displayVersion: 'master',
    }
  return {
    href: `releases/tag/${version}`,
    displayVersion: `v${version}`,
  }
}

export const VersionLink = ({version}: {version: string}) => {
  const {href, displayVersion} = getHref({
    version,
    match: version.match(/^pr-(\d+)$/),
    isMaster: version === 'master',
  })
  return ReactDOM.createPortal(
    <a
      href={`https://github.com/zerobias/effector/${href}`}
      target="_blank"
      rel="noopener noreferrer">
      {displayVersion}
    </a>,
    root,
  )
}
