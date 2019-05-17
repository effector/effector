// @flow

const recast = require('recast')
const {visit, namedTypes: n, builders: b} = require('ast-types')
const fs = require('fs')

const code = fs.readFileSync('./fixture.js')
const ast = recast.parse(code, {
  parser: require('recast/parsers/flow'),
})

visit(ast, {
  visitTypeAlias(path) {
    const generate = path.parentPath.value.leadingComments.find(
      comment => comment.value.trim() === '@generate',
    )
    if (!generate) this.abort()

    n.ObjectTypeAnnotation.assert(path.node.right)

    let idProperty = b.objectTypeProperty(
      b.identifier('id'),
      b.stringTypeAnnotation(),
      false,
    )

    for (const property of path.node.right.properties) {
      if (
        property.leadingComments &&
        property.leadingComments.find(comment => comment.value.trim() === '@id')
      ) {
        idProperty = property
      }

      const id = b.identifier(property.key.name)
      id.typeAnnotation = b.typeAnnotation(
        b.genericTypeAnnotation(
          b.identifier('Store'),
          b.typeParameterInstantiation([
            b.genericTypeAnnotation(
              b.identifier('Map'),
              b.typeParameterInstantiation([idProperty.value, property.value]),
            ),
          ]),
        ),
      )
      const init = b.callExpression(
        b.identifier('createStore'),
        [b.newExpression(b.identifier('Map'), [])],
        [b.identifier('meme')],
      )
      path.parentPath.insertAfter(
        b.exportNamedDeclaration(
          b.variableDeclaration('const', [b.variableDeclarator(id, init)]),
        ),
      )
    }

    this.traverse(path)
  },
})

console.log(recast.print(ast).code)
