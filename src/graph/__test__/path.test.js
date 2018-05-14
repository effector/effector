//@flow

import {
 atom,
 derive,
 lens,
 struct,
 type Atom,
 type Derivable,
} from '../../derive'

import {createStore} from '../..'

import * as Path from '../path'

test.skip('smoke', async() => {
 expect(() => {
  Path.getStorePath(() => ({key: 'abc'}))
 }).not.toThrow()
 const store2 = {key: 'abc', atom: atom(createStore('ok'))}
 const result = Path.getStorePath(() => store2)
 console.log(result.length)
 console.log(...result[0])
 console.log(...result[1])
 console.log(Path.readPath(result[0]))
 console.log(Path.readPath(result[1]))
 expect(humanize(result)).toMatchSnapshot()
})
function humanize(list) {
 return list.map(path =>
  path.map(e => {
   switch (e[0]) {
    case (-2: Path.RootValue): //$todo
     return {type: 'root', value: e[1]()}
    case (-1: Path.OpaqueValue):
     return e[1]
    case (0: Path.NoValue):
     return 'null'
    case (1: Path.PlainValue):
     return 'plain'
    case (2: Path.DerivedValue):
     return 'derived'
    case (3: Path.StoreValue):
     return 'store'
    case (4: Path.StoreObjectValue): //$todo
     return `field ${e[1]}`
    case (5: Path.StoreArrayValue): //$todo
     return `list ${e[1]}`
    default:
     return `unknown ${e[0]}`
   }
  }),
 )
}
