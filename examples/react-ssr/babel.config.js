module.exports = api => {
 api.cache(() => `${process.env.NODE_ENV}/${process.env.TARGET}`)
 let envConfig
 if (process.env.TARGET === 'server') {
  envConfig = serverEnvConfig
 } else {
  envConfig = browserEnvConfig
 }
 return {
  presets: [
   '@babel/preset-flow',
   '@babel/preset-react',
   ['@babel/preset-env', envConfig],
  ],
 }
}

const browserEnvConfig = {
 modules: false,
 targets: {
  browsers: ['last 2 version', 'not dead'],
 },
}

const serverEnvConfig = {
 modules: false,
 targets: {
  node: 'current',
 },
}
