/* eslint-disable func-names */

module.exports = function(bundler) {
  bundler.addAssetType('js', require.resolve('./LinariaAsset'))
}
