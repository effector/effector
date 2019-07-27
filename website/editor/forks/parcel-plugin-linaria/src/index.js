/* eslint-disable func-names */

module.exports = function(bundler) {
  bundler.addAssetType('js', require.resolve('./LinariaAsset'))
  bundler.addAssetType('ts', require.resolve('./LinariaAsset'))
  bundler.addAssetType('tsx', require.resolve('./LinariaAsset'))
}