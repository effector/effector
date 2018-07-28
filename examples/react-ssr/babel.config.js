module.exports = api => {
 api.cache(() => `${process.env.NODE_ENV}/${process.env.TARGET}`)
 const isClient = process.env.TARGET === 'client'
 let targets = {
  node: 'current',
 }
 let ssr = true
 if (process.env.TARGET === 'client') {
  targets = {
   browsers: ['last 2 version', 'not dead'],
  }
  ssr = false
 }
 return {
  presets: [
   '@babel/preset-flow',
   '@babel/preset-react',
   [
    '@babel/preset-env',
    {
     modules: false,
     targets,
    },
   ],
  ],
  plugins: [
   [
    'babel-plugin-styled-components',
    {
     ssr: true,
     displayName: true,
     fileName: true,
     transpileTemplateLiterals: true,
    },
   ],
  ],
 }
}
