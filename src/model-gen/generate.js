// @flow

const recast = require('recast')
const camelCase = require('camelcase')
const {visit, namedTypes: n, builders: b} = require('ast-types')
const fs = require('fs')

const code = fs.readFileSync('./fixture.js').toString()
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

      const id = b.identifier(
        camelCase(path.node.id.name + '_' + property.key.name),
      )
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
      const init = b.callExpression(b.identifier('createStore'), [
        b.newExpression(b.identifier('Map'), []),
      ])
      path.parentPath.insertAfter(
        b.exportNamedDeclaration(
          b.variableDeclaration('const', [b.variableDeclarator(id, init)]),
        ),
      )
    }

    let paramId = b.identifier(path.node.id.name.toLowerCase())
    paramId.typeAnnotation = b.typeAnnotation(
      b.genericTypeAnnotation(path.node.id, null),
    )
    let singleStoreId = b.identifier(path.node.id.name.toLowerCase())
    singleStoreId.typeAnnotation = b.typeAnnotation(
      b.genericTypeAnnotation(
        b.identifier('Store'),
        b.typeParameterInstantiation([
          b.unionTypeAnnotation([
            b.genericTypeAnnotation(path.node.id, null),
            b.nullTypeAnnotation(),
          ]),
        ]),
      ),
    )
    let listStoreId = b.identifier(camelCase(path.node.id.name + 'List'))
    listStoreId.typeAnnotation = b.typeAnnotation(
      b.genericTypeAnnotation(
        b.identifier('Store'),
        b.typeParameterInstantiation([
          b.arrayTypeAnnotation(b.genericTypeAnnotation(path.node.id, null)),
        ]),
      ),
    )
    path.parentPath.insertAfter(
      b.exportNamedDeclaration(
        b.variableDeclaration('const', [
          b.variableDeclarator(
            listStoreId,
            b.callExpression(b.identifier('createStore'), [
              b.arrayExpression([]),
            ]),
          ),
        ]),
      ),
    )
    path.parentPath.insertAfter(
      b.exportNamedDeclaration(
        b.variableDeclaration('const', [
          b.variableDeclarator(
            singleStoreId,
            b.callExpression(b.identifier('createStore'), [
              b.identifier('null'),
            ]),
          ),
        ]),
      ),
    )
    path.parentPath.insertAfter(
      b.exportNamedDeclaration(
        b.variableDeclaration('const', [
          b.variableDeclarator(
            b.identifier(camelCase('get' + path.node.id.name + 'ID')),
            b.arrowFunctionExpression(
              [paramId],
              b.memberExpression(
                b.identifier(path.node.id.name.toLowerCase()),
                b.identifier(idProperty.key.name),
              ),
            ),
          ),
        ]),
      ),
    )

    this.traverse(path)
  },
})

console.log(recast.print(ast).code)
