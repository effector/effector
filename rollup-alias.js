//@flow

import {normalize, parse, join} from 'path'
import {existsSync} from 'fs'

export default function aliasPlugin({
 pathMap = new Map(),
 extensions = [],
} /*: {
 pathMap: Map<string, string | ((
    substring: string,
    ...args: Array<any>
  ) => string)>,
 extensions: Array<string>,
}*/ = {}) {
 return {
  resolveId(importee /*: string*/, importer /*: string*/) {
   for (const [key, path] of pathMap) {
    if (importee.substring(0, key.length) !== key) continue
    let directory = importee.replace(key, path)
    if (existsSync(directory)) {
     const stats = parse(directory)
     if (stats.ext === '' && stats.base === stats.name) {
      directory = join(directory, 'index.js')
     }
     return normalize(directory)
    }
    const ext = '/index.js'
    if (existsSync(directory + ext)) {
     return normalize(directory + ext)
    }
    for (const ext of extensions) {
     if (existsSync(directory + ext)) {
      return normalize(directory + ext)
     }
    }
   }
  },
 }
}
