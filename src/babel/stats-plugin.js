//@noflow

module.exports = myMacro

function myMacro({types: t}) {
  return {
    name: 'stats-plugin',
    visitor: {
      CallExpression(path) {
        if (path.get('callee').isIdentifier({name: 'createEvent'})) {
          console.log('createEvent')
        }
      },
    },
  }
}
