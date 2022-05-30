const { create, getDefaultConfig } = require("enhanced-resolve-jest");

/*
This resolver is needed because jest uses node exports field by default, when
we actually need to use main or browser from package.json
 */
module.exports = create(jestConfig => {
  const baseConfig = getDefaultConfig(jestConfig);
  baseConfig.aliasFields = ["browser"];
  baseConfig.mainFields = ["browser", "main"];
  return baseConfig;
})