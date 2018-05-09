//@flow

import {atom, withEquality} from '..'

import dag from '../../graph'

class RW<A> {
 value: A
 refs: Array<(A) => void> = []
 constructor(value: A) {
  this.value = value
 }
 get(): A {
  return this.value
 }
 set(value: A) {
  this.value = value
 }
 watch(fn: (_: A) => void) {
  this.refs.push(fn)
 }
}

type SetTask<A> = {
 type: 'set',
 value: A,
 target: RW<A>,
}

type ComputeTask<A> = {
 type: 'compute',
 value: A => A,
 target: RW<A>,
 parent: RW<A>,
}

test('with graph', async() => {
 const val1 = atom(0)
 const val2 = val1.map(n => {
  const nn = n + 1
  return nn
 })
 const v3 = new RW(0)
 const v4 = new RW(-1)
 const setV3: SetTask<number> = {
  type: 'set',
  value: 3,
  target: v3,
 }
 const updV4: ComputeTask<number> = {
  type: 'compute',
  value(n) {
   const nn = n + 1
   return nn
  },
  target: v4,
  parent: v3,
 }
 const upd = await dag({
  graph: new Map([[setV3, []], [updV4, [setV3]]]),
  async task<A>(task: SetTask<A> | ComputeTask<A>) {
   switch (task.type) {
    case 'set': {
     task.target.set(task.value)
     return task.value
    }
    case 'compute': {
     const n = task.parent.get()
     const result = task.value(n)
     task.target.set(result)
     return result
    }
   }
  },
 })
 expect(upd).toMatchSnapshot()
 expect(v4.get()).toBe(4)
})

test('can be dereferenced via .get to obtain its current state', () => {
 expect(atom(0).get()).toBe(0)
})

test('can be .set to change its current state', () => {
 const n = atom(0)
 n.set(1)
 expect(n.get()).toBe(1)
})

test('can .update (a la swap in clojure)', () => {
 const n = atom(0)
 n.set(1)
 const double = x => x * 2
 n.update(double)
 expect(n.get()).toBe(2)
 n.update(double)
 expect(n.get()).toBe(4)

 expect(() => {
  //$off expect error
  n.update()
 }).toThrow()
})

test('update with arguments', () => {
 const n = atom(0)
 const sum = (value, ...args) => args.reduce((acc, d) => acc + d, value)
 n.update(sum, 1)
 expect(n.get()).toBe(1)
 n.update(sum, 1, 2)
 expect(n.get()).toBe(4)
 n.update(sum, 1, 2, 3)
 expect(n.get()).toBe(10)
 n.update(sum, 1, 2, 3, 4)
 expect(n.get()).toBe(20)
 expect(() => {
  //$off expect error
  n.update(sum, 1, 2, 3, 4, 5)
  expect(n.get()).toBe(35)
 }).not.toThrow()
})

test('can include an equality-checking function', () => {
 const a = atom(0)
 const b = withEquality(a, () => false)
 // creates a brand new atom
 expect(a).not.toBe(b)

 let numReactions = 0
 a.react(
  () => {
   numReactions++
  },
  {skipFirst: true},
 )
 b.react(
  () => {
   numReactions++
  },
  {skipFirst: true},
 )

 expect(numReactions).toBe(0)
 a.set(0)
 expect(numReactions).toBe(0)
 a.set(0)
 expect(numReactions).toBe(0)

 b.set(0)
 expect(numReactions).toBe(1)
 b.set(0)
 expect(numReactions).toBe(2)
})

test('only likes functions for equality functions', () => {
 expect(() => {
  //$off
  withEquality(atom(4), 'yo')
 }).toThrow()
 expect(() => {
  //$off
  withEquality(atom(4), 0)
 }).toThrow()
})

test('the concurrent modification of _reactors bug doesnt happen any more', () => {
 const $A = atom(false)
 const $B = atom(false)

 let A_success = false
 let C_success = false

 $A.react(
  () => {
   A_success = true
  },
  {from: $A},
 )

 const $C = $A.map(a => a && $B.get())

 $C.react(
  () => {
   C_success = true
  },
  {from: $C},
 )

 expect(A_success).toBe(false)
 expect(C_success).toBe(false)
 // used to be that this would cause the 'from' controller on C to be ignored
 // during the runReactor iteration in .set
 $A.set(true)
 expect(A_success).toBe(true)
 expect(C_success).toBe(false)
 $B.set(true)

 expect(C_success).toBe(true)
})
