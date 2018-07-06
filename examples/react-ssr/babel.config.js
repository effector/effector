module.exports = api => {
 api.cache(() => `${process.env.NODE_ENV}/${process.env.TARGET}`)
 return {
  presets: [
   '@babel/preset-flow',
   '@babel/preset-react',
   [
    '@babel/preset-env',
    {
     modules: false,
     targets: getTargets(process.env.TARGET),
    },
   ],
  ],
 }
}

const getTargets = env => {
 switch (env) {
  case 'client':
   return {
    browsers: ['last 2 version', 'not dead'],
   }
  case 'server':
  default:
   return {
    node: 'current',
   }
 }
}
