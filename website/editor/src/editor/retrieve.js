//@flow

import defaultSourceCode from './defaultSourceCode'
import defaultVersions from '../versions.json'
import {decompress} from './compression'

export function retrieveCode(): string {
  if (/https\:\/\/(.+\.)?effector\.dev/.test(location.origin)) {
    if ('__code__' in window) {
      const preloaded: {
        code: string,
        description: string,
        tags: string[],
      } = (window: any).__code__
      return preloaded.code
    }
  }
  const code = getUrlParameter('code')
  if (code) {
    return decompress(code)
  }
  const storageCode = localStorage.getItem('code-compressed')
  if (storageCode != null) {
    return decompress(storageCode)
  }
  return defaultSourceCode
}

export function retrieveVersion(): string {
  const version = getUrlParameter('version')
  if (version) {
    return version
  }
  return defaultVersions[0]
}

function getUrlParameter(name: string): string {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
  const results = regex.exec(location.search)
  return results === null
    ? ''
    : decodeURIComponent(results[1].replace(/\+/g, ' '))
}
