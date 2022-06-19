const { generateConfig } = require('../../babel.config')

const meta = {
  isBuild: !!process.env.IS_BUILD,
  isTest: process.env.NODE_ENV === 'test',
  isCompat: false,
  isEsm: false,
  isSolid: true
}

module.exports = api => {
  api && api.cache && api.cache.never && api.cache.never()
  return generateConfig(meta)
}