//@flow

import {massCopy, outputPackageJSON} from 'Builder/utils'
import packages from 'Builder/packages.config'

export const copyLicense = (libName: string) => () =>
  massCopy('.', `npm/${libName}`, ['LICENSE'])
export const generatePackageJSON = (libName: string) => () =>
  outputPackageJSON(`packages/${libName}/package.json`, packages[libName])
