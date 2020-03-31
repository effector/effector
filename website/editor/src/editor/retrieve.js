//@flow

import defaultSourceCode from './defaultSourceCode'
import defaultVersions from '../versions.json'
import {decompress, compress} from './compression'

export function retrieveCode(): string {
  const isStuck = readStuckFlag()
  if (/https\:\/\/(.+\.)?effector\.dev/.test(location.origin)) {
    if ('__code__' in window) {
      const preloaded: {
        code: string,
        description: string,
        tags: string[],
        ...
      } = (window: any).__code__
      return preloaded.code
    }
  }
  const code = getUrlParameter('src')
  if (code) {
    return decompress(code)
  }
  const storageCode = localStorage.getItem('code-compressed')
  if (storageCode != null) {
    const decompressed = decompress(storageCode)
    if (isStuck) {
      const withThrow = `throw Error('this code leads to infinite loop')\n${decompressed}`
      localStorage.setItem('code-compressed', compress(withThrow))
      return withThrow
    }
    return decompressed
  }
  return defaultSourceCode
}

function readStuckFlag() {
  try {
    let flag = JSON.parse(localStorage.getItem('runtime/stuck'))
    if (typeof flag !== 'boolean') flag = false
    localStorage.setItem('runtime/stuck', JSON.stringify(false))
    return flag
  } catch (err) {
    return false
  }
}

export function retrieveVersion(): string {
  const version = getUrlParameter('version')
  if (version) {
    return version
  }
  return defaultVersions[0]
}

function getUrlParameter(name: string): string {
  const urlSearch = new URLSearchParams(location.search)
  if (urlSearch.has(name)) return urlSearch.get(name)
  return ''
}
