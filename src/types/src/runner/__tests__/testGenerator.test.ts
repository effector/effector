import {
  bracket,
  compute,
  generate,
  union,
  bool,
  val,
  text,
  rawPermute,
} from '../manifold'
import {printMethod} from '../text'
import {testGenerator} from '../manifold/testGenerator'

test('guard use case', () => {
  const result = generate(() => {
    const clockType = union(['no', 'unit', 'array'])
    const filterType = union(['fn', 'store', 'bool'])
    const sourceType = bool({
      source: {clockType},
      when: {clockType: 'no'},
      cases: {
        true: () => union(['unit', 'object', 'tuple']),
        false: () => union(['no', 'unit', 'object', 'tuple']),
      },
    })
    const targetType = union(['unit', 'array'])
    const sourceSubtype = bracket({
      source: {sourceType, targetType},
      matchGroups: {
        source: {
          object: {sourceType: 'object'},
          tuple: {sourceType: 'tuple'},
          __: {},
        },
        target: {
          unit: {targetType: 'unit'},
          array: {targetType: 'array'},
          __: {},
        },
      },
      fn(
        v:
          | 'fullObject'
          | 'nullableField'
          | 'smallObject'
          | 'fullTuple'
          | 'smallTuple'
          | null,
        {source, target},
      ) {
        source({
          object() {
            target({
              unit: () => union(['fullObject', 'nullableField', 'smallObject']),
              array() {
                val('source object target array')
              },
              __: () => text`source object target ${targetType}`,
            })
          },
          tuple() {
            target({
              unit: () => union(['fullTuple', 'smallTuple']),
              array() {
                val('source tuple target array')
              },
              __: () => text`source tuple target __ ${targetType}`,
            })
          },
          __: () => text`source __ ${sourceType}`,
        })
      },
    })
    const noSource = bool({
      source: {sourceType},
      when: {sourceType: 'no'},
    })

    const targetVoid = bool({
      source: {},
      when: {},
      avoid: [
        noSource,
        bool({
          source: {sourceSubtype},
          when: [
            {sourceSubtype: 'smallTuple'},
            {sourceSubtype: 'nullableField'},
            {sourceSubtype: 'smallObject'},
          ],
        }),
      ],
      flag: true,
    })
    const noTargetAny = bool({
      source: {sourceSubtype},
      when: [
        {sourceSubtype: 'smallTuple'},
        {sourceSubtype: 'nullableField'},
        {sourceSubtype: 'smallObject'},
      ],
    })
    const targetAny = bracket({
      source: {targetType},
      matchGroups: {
        _: {
          unit: {targetType: 'unit'},
          array: {targetType: 'array'},
        },
      },
      fn(v: boolean, {_}) {
        _({
          unit() {
            // bool({
            //   source: {},
            //   when: {},
            //   avoid: [targetVoid, noSource, noTargetAny],
            //   flag: true,
            // })
            return false
          },
          array: () => union([false, true]),
        })
      },
    })
    // const targetIsTyped = bracket({
    //   source: {targetAny, targetVoid, targetType},
    //   matchGroups: {
    //     _: {
    //       array: {targetType: 'array'},
    //       nonAny: {
    //         targetAny: false,
    //         targetVoid: false,
    //         targetType: 'unit',
    //       },
    //       any: [
    //         {targetAny: true, targetType: 'unit'},
    //         {targetVoid: true, targetType: 'unit'},
    //       ],
    //       __: {},
    //     },
    //   },
    //   fn(v: boolean, {_}) {
    //     _({
    //       array: () => true,
    //       nonAny: () => true,
    //       any: () => false,
    //       __: () => false,
    //     })
    //   },
    // })
    // const combinable = bool({
    //   source: {sourceType},
    //   when: [{sourceType: 'object'}, {sourceType: 'tuple'}],
    // })
    // const wrongTarget = bool({
    //   source: {},
    //   when: {},
    //   flag: true,
    //   need: [targetIsTyped],
    //   // avoid: [noSource],
    // })
    const content = text`sourceType: ${sourceType}, sourceSubtype: ${sourceSubtype}, filterType: ${filterType}, targetType: ${targetType}`
    return content
    // return {
    //   pass: val(true),
    //   testName: val('name'),
    //   content,
    // }
  })
  // expect(result.length).toBe(new Set(result).size)
  expect(result).toMatchInlineSnapshot(`
Array [
  "sourceType: unit, sourceSubtype: source __ unit, filterType: fn, targetType: unit",
  "sourceType: unit, sourceSubtype: source __ unit, filterType: fn, targetType: array",
  "sourceType: object, sourceSubtype: fullObject, filterType: fn, targetType: unit",
  "sourceType: object, sourceSubtype: nullableField, filterType: fn, targetType: unit",
  "sourceType: object, sourceSubtype: smallObject, filterType: fn, targetType: unit",
  "sourceType: object, sourceSubtype: source object target array, filterType: fn, targetType: array",
  "sourceType: tuple, sourceSubtype: fullTuple, filterType: fn, targetType: unit",
  "sourceType: tuple, sourceSubtype: smallTuple, filterType: fn, targetType: unit",
  "sourceType: tuple, sourceSubtype: source tuple target array, filterType: fn, targetType: array",
  "sourceType: unit, sourceSubtype: source __ unit, filterType: store, targetType: unit",
  "sourceType: unit, sourceSubtype: source __ unit, filterType: store, targetType: array",
  "sourceType: object, sourceSubtype: fullObject, filterType: store, targetType: unit",
  "sourceType: object, sourceSubtype: nullableField, filterType: store, targetType: unit",
  "sourceType: object, sourceSubtype: smallObject, filterType: store, targetType: unit",
  "sourceType: object, sourceSubtype: source object target array, filterType: store, targetType: array",
  "sourceType: tuple, sourceSubtype: fullTuple, filterType: store, targetType: unit",
  "sourceType: tuple, sourceSubtype: smallTuple, filterType: store, targetType: unit",
  "sourceType: tuple, sourceSubtype: source tuple target array, filterType: store, targetType: array",
  "sourceType: unit, sourceSubtype: source __ unit, filterType: bool, targetType: unit",
  "sourceType: unit, sourceSubtype: source __ unit, filterType: bool, targetType: array",
  "sourceType: object, sourceSubtype: fullObject, filterType: bool, targetType: unit",
  "sourceType: object, sourceSubtype: nullableField, filterType: bool, targetType: unit",
  "sourceType: object, sourceSubtype: smallObject, filterType: bool, targetType: unit",
  "sourceType: object, sourceSubtype: source object target array, filterType: bool, targetType: array",
  "sourceType: tuple, sourceSubtype: fullTuple, filterType: bool, targetType: unit",
  "sourceType: tuple, sourceSubtype: smallTuple, filterType: bool, targetType: unit",
  "sourceType: tuple, sourceSubtype: source tuple target array, filterType: bool, targetType: array",
  "sourceType: no, sourceSubtype: source __ no, filterType: fn, targetType: unit",
  "sourceType: no, sourceSubtype: source __ no, filterType: fn, targetType: array",
  "sourceType: unit, sourceSubtype: source __ unit, filterType: fn, targetType: unit",
  "sourceType: unit, sourceSubtype: source __ unit, filterType: fn, targetType: array",
  "sourceType: object, sourceSubtype: fullObject, filterType: fn, targetType: unit",
  "sourceType: object, sourceSubtype: nullableField, filterType: fn, targetType: unit",
  "sourceType: object, sourceSubtype: smallObject, filterType: fn, targetType: unit",
  "sourceType: object, sourceSubtype: source object target array, filterType: fn, targetType: array",
  "sourceType: tuple, sourceSubtype: fullTuple, filterType: fn, targetType: unit",
  "sourceType: tuple, sourceSubtype: smallTuple, filterType: fn, targetType: unit",
  "sourceType: tuple, sourceSubtype: source tuple target array, filterType: fn, targetType: array",
  "sourceType: no, sourceSubtype: source __ no, filterType: store, targetType: unit",
  "sourceType: no, sourceSubtype: source __ no, filterType: store, targetType: array",
  "sourceType: unit, sourceSubtype: source __ unit, filterType: store, targetType: unit",
  "sourceType: unit, sourceSubtype: source __ unit, filterType: store, targetType: array",
  "sourceType: object, sourceSubtype: fullObject, filterType: store, targetType: unit",
  "sourceType: object, sourceSubtype: nullableField, filterType: store, targetType: unit",
  "sourceType: object, sourceSubtype: smallObject, filterType: store, targetType: unit",
  "sourceType: object, sourceSubtype: source object target array, filterType: store, targetType: array",
  "sourceType: tuple, sourceSubtype: fullTuple, filterType: store, targetType: unit",
  "sourceType: tuple, sourceSubtype: smallTuple, filterType: store, targetType: unit",
  "sourceType: tuple, sourceSubtype: source tuple target array, filterType: store, targetType: array",
  "sourceType: no, sourceSubtype: source __ no, filterType: bool, targetType: unit",
  "sourceType: no, sourceSubtype: source __ no, filterType: bool, targetType: array",
  "sourceType: unit, sourceSubtype: source __ unit, filterType: bool, targetType: unit",
  "sourceType: unit, sourceSubtype: source __ unit, filterType: bool, targetType: array",
  "sourceType: object, sourceSubtype: fullObject, filterType: bool, targetType: unit",
  "sourceType: object, sourceSubtype: nullableField, filterType: bool, targetType: unit",
  "sourceType: object, sourceSubtype: smallObject, filterType: bool, targetType: unit",
  "sourceType: object, sourceSubtype: source object target array, filterType: bool, targetType: array",
  "sourceType: tuple, sourceSubtype: fullTuple, filterType: bool, targetType: unit",
  "sourceType: tuple, sourceSubtype: smallTuple, filterType: bool, targetType: unit",
  "sourceType: tuple, sourceSubtype: source tuple target array, filterType: bool, targetType: array",
  "sourceType: no, sourceSubtype: source __ no, filterType: fn, targetType: unit",
  "sourceType: no, sourceSubtype: source __ no, filterType: fn, targetType: array",
  "sourceType: unit, sourceSubtype: source __ unit, filterType: fn, targetType: unit",
  "sourceType: unit, sourceSubtype: source __ unit, filterType: fn, targetType: array",
  "sourceType: object, sourceSubtype: fullObject, filterType: fn, targetType: unit",
  "sourceType: object, sourceSubtype: nullableField, filterType: fn, targetType: unit",
  "sourceType: object, sourceSubtype: smallObject, filterType: fn, targetType: unit",
  "sourceType: object, sourceSubtype: source object target array, filterType: fn, targetType: array",
  "sourceType: tuple, sourceSubtype: fullTuple, filterType: fn, targetType: unit",
  "sourceType: tuple, sourceSubtype: smallTuple, filterType: fn, targetType: unit",
  "sourceType: tuple, sourceSubtype: source tuple target array, filterType: fn, targetType: array",
  "sourceType: no, sourceSubtype: source __ no, filterType: store, targetType: unit",
  "sourceType: no, sourceSubtype: source __ no, filterType: store, targetType: array",
  "sourceType: unit, sourceSubtype: source __ unit, filterType: store, targetType: unit",
  "sourceType: unit, sourceSubtype: source __ unit, filterType: store, targetType: array",
  "sourceType: object, sourceSubtype: fullObject, filterType: store, targetType: unit",
  "sourceType: object, sourceSubtype: nullableField, filterType: store, targetType: unit",
  "sourceType: object, sourceSubtype: smallObject, filterType: store, targetType: unit",
  "sourceType: object, sourceSubtype: source object target array, filterType: store, targetType: array",
  "sourceType: tuple, sourceSubtype: fullTuple, filterType: store, targetType: unit",
  "sourceType: tuple, sourceSubtype: smallTuple, filterType: store, targetType: unit",
  "sourceType: tuple, sourceSubtype: source tuple target array, filterType: store, targetType: array",
  "sourceType: no, sourceSubtype: source __ no, filterType: bool, targetType: unit",
  "sourceType: no, sourceSubtype: source __ no, filterType: bool, targetType: array",
  "sourceType: unit, sourceSubtype: source __ unit, filterType: bool, targetType: unit",
  "sourceType: unit, sourceSubtype: source __ unit, filterType: bool, targetType: array",
  "sourceType: object, sourceSubtype: fullObject, filterType: bool, targetType: unit",
  "sourceType: object, sourceSubtype: nullableField, filterType: bool, targetType: unit",
  "sourceType: object, sourceSubtype: smallObject, filterType: bool, targetType: unit",
  "sourceType: object, sourceSubtype: source object target array, filterType: bool, targetType: array",
  "sourceType: tuple, sourceSubtype: fullTuple, filterType: bool, targetType: unit",
  "sourceType: tuple, sourceSubtype: smallTuple, filterType: bool, targetType: unit",
  "sourceType: tuple, sourceSubtype: source tuple target array, filterType: bool, targetType: array",
]
`)
})
