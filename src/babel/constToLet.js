module.exports = function(babel) {
  return {
    name: 'const-to-let',
    visitor: {
      VariableDeclaration(path) {
        if (path.parent.type === 'Program') return
        if (path.node.kind !== 'const') return
        path.node.kind = 'let'
      },
    },
  }
}
