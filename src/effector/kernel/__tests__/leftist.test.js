//@flow
import faker from 'faker'
//$todo
import prettyHrtime from 'pretty-hrtime'
import {singleton, insert, rank, iterate, type leftist} from '../leftist'
class Cmd {
  static id = 0
  id = ++Cmd.id
  type: 'pure' | 'lock' | 'effect'
  data: any
  constructor(type: 'pure' | 'lock' | 'effect', data: any) {
    this.type = type
    this.data = data
  }
}

const cmdGreaterThan = (a: Cmd, b: Cmd) => {
  if (a.type === b.type) return a.id > b.id
  let arank = -1
  switch (a.type) {
    case 'pure':
      arank = 0
      break
    case 'lock':
      arank = 1
      break
    case 'effect':
      arank = 2
      break
  }
  let brank = -1
  switch (b.type) {
    case 'pure':
      brank = 0
      break
    case 'lock':
      brank = 1
      break
    case 'effect':
      brank = 2
      break
  }
  return arank > brank
}
test('it works', () => {
  const zeroTree = singleton(new Cmd('pure', 'foo'))
  const oneTree = insert(new Cmd('lock', 'bar'), zeroTree, cmdGreaterThan)
  const twoTree = insert(new Cmd('effect', 'baz'), oneTree, cmdGreaterThan)
  const threeTree = insert(new Cmd('lock', 'bar'), twoTree, cmdGreaterThan)
  console.log(rank(threeTree), threeTree)

  console.table((iterate(threeTree, cmdGreaterThan): any))
})
test('stress', () => {
  const AMOUNT = 100
  faker.seed(0xdeadbeef)
  const namesSet = Array.from({length: AMOUNT}, () => faker.name.firstName())
  const names = Array.from({length: AMOUNT}, () =>
    faker.random.arrayElement(namesSet),
  )
  console.log(new Set(names).size)
  const types = Array.from(
    {length: AMOUNT},
    (): 'pure' | 'lock' | 'effect' => {
      const result = faker.random.arrayElement(['pure', 'lock', 'effect'])
      return result
    },
  )
  const cmds = Array(AMOUNT)
  const time = process.hrtime()
  for (let i = 0; i < AMOUNT; i++) {
    cmds[i] = new Cmd(types[i], names[i])
  }
  let tree: leftist<Cmd> = singleton(new Cmd('pure', 'start'))
  for (let i = 0; i < AMOUNT; i++) {
    tree = insert(cmds[i], tree, cmdGreaterThan)
  }
  const order = iterate(tree, cmdGreaterThan)
  const totalTime = process.hrtime(time)
  console.log(prettyHrtime(totalTime, {verbose: true}))
  expect(order).toMatchSnapshot()
  expect(tree).toMatchSnapshot()

  console.table((order: any))
})
