//@flow

import {atom, atomically, is, maybeStatic, type Lifecycle} from '..'

describe('anonymous reactors', () => {
 it('are created with the .react method', () => {
  const a = atom('a')
  let val = null
  a.react(d => {
   val = d
  })

  expect(val).toBe('a')

  a.set('b')

  expect(val).toBe('b')
 })

 it('can start when the `from` condition becomes truthy', () => {
  const from = atom(false)
  const a = atom('a')
  let val = null
  a.react(
   d => {
    val = d
   },
   {from},
  )

  expect(val).toBe(null)

  from.set('truthy value')

  expect(val).toBe('a')

  a.set('b')

  expect(val).toBe('b')
 })

 it('can stop (forever) when the `until` condition becomes truthy', () => {
  const until = atom(false)
  const a = atom('a')
  let val = null
  a.react(
   d => {
    val = d
   },
   {until},
  )

  expect(val).toBe('a')

  a.set('b')

  expect(val).toBe('b')

  until.set('truthy value')

  a.set('c')

  expect(val).toBe('b')

  until.set(false)

  a.set('d')

  expect(val).toBe('b')
 })

 it('can start and stop when the `when` condition becomes truthy and falsey respectively', () => {
  const when = atom(false)
  const a = atom('a')
  let val = null
  a.react(
   d => {
    val = d
   },
   {when},
  )

  expect(val).toBe(null)

  when.set('truthy value')

  expect(val).toBe('a')

  a.set('b')

  expect(val).toBe('b')

  when.set(0) //falsey value

  a.set('c')

  expect(val).toBe('b')

  when.set(1) //truthy value

  expect(val).toBe('c')
 })

 it('can have `from`, `when`, and `until` specified as functions', () => {
  {
   const cond = atom(false)
   const a = atom('a')
   let val = null
   a.react(
    d => {
     val = d
    },
    {when: () => !!cond.get()},
   )

   expect(val).toBe(null)

   cond.set('truthy value')

   expect(val).toBe('a')
  }

  {
   const cond = atom(false)
   const a = atom('a')
   let val = null
   a.react(
    d => {
     val = d
    },
    {from: () => !!cond.get()},
   )

   expect(val).toBe(null)

   cond.set('truthy value')

   expect(val).toBe('a')
  }

  {
   const a = atom('a')
   let val = null
   a.react(
    d => {
     val = d
    },
    {until: () => is(a, 'b').get()},
   )

   expect(val).toBe('a')

   a.set('c')

   expect(val).toBe('c')

   a.set('b')

   expect(val).toBe('c')

   a.set('a')

   expect(val).toBe('c')
  }
 })

 it(`can have \`from\`, \`when\`, and \`until\` specified as functions
      that use the derivable itself`, () => {
  {
   const a = atom('a')
   let val = null
   a.react(
    d => {
     val = d
    },
    {when: d => d.get() > 'c'},
   )

   expect(val).toBe(null)

   a.set('x')

   expect(val).toBe('x')
  }

  {
   const a = atom('a')
   let val = null
   a.react(
    d => {
     val = d
    },
    {from: d => d.get() > 'c'},
   )

   expect(val).toBe(null)

   a.set('x')

   expect(val).toBe('x')
  }
  {
   const a = atom('a')
   let val = null
   a.react(
    d => {
     val = d
    },
    {until: d => is(d, 'b').get()},
   )

   expect(val).toBe('a')

   a.set('c')

   expect(val).toBe('c')

   a.set('b')

   expect(val).toBe('c')

   a.set('a')

   expect(val).toBe('c')
  }
 })

 it('doesnt like it when `from`, `when`, and `until` are other things', () => {
  const a = atom('a')
  expect(() => {
   //$off expect error
   a.react(() => null, {from: 'a string'})
  }).toThrow()
  expect(() => {
   //$off expect error
   a.react(() => null, {when: 3})
  }).toThrow()
  expect(() => {
   //$off expect error
   a.react(() => null, {until: new Date()})
  }).toThrow()
 })

 it('can have `from`, `when`, and `until` conditions all at once', () => {
  {
   // normal usage
   const from = atom(false)
   const when = atom(false)
   const until = atom(false)

   const a = atom('a')
   let val = null
   a.react(
    d => {
     val = d
    },
    {from, when, until},
   )

   expect(val).toBe(null)

   from.set(true)
   // when is still false
   expect(val).toBe(null)
   when.set(true)
   expect(val).toBe('a')
   a.set('b')
   expect(val).toBe('b')
   when.set(false)
   a.set('c')
   expect(val).toBe('b')
   when.set(true)
   expect(val).toBe('c')
   until.set(true)
   a.set('d')
   expect(val).toBe('c')
  }

  {
   // until already true
   const from = atom(false)
   const when = atom(false)
   const until = atom(true)

   const a = atom('a')
   let val = null
   a.react(
    d => {
     val = d
    },
    {from, when, until},
   )

   expect(val).toBe(null)
   from.set(true)
   // when is still false
   expect(val).toBe(null)
   when.set(true)
   expect(val).toBe(null)
  }

  {
   // until already true
   const from = atom(false)
   const when = atom(false)
   const until = atom(true)

   const a = atom('a')
   let val = null
   a.react(
    d => {
     val = d
    },
    {from, when, until},
   )

   expect(val).toBe(null)
   from.set(true)
   // when is still false
   expect(val).toBe(null)
   when.set(true)
   expect(val).toBe(null)
  }

  {
   // when already true
   const from = atom(false)
   const when = atom(true)
   const until = atom(false)

   const a = atom('a')
   let val = null
   a.react(
    d => {
     val = d
    },
    {from, when, until},
   )

   expect(val).toBe(null)
   from.set(true)
   expect(val).toBe('a')
  }

  {
   // from and when already true
   const from = atom(true)
   const when = atom(true)
   const until = atom(false)

   const a = atom('a')
   let val = null
   a.react(
    d => {
     val = d
    },
    {from, when, until},
   )

   expect(val).toBe('a')
  }

  {
   // from and until already true
   const from = atom(true)
   const when = atom(false)
   const until = atom(true)

   const a = atom('a')
   let val = null
   a.react(
    d => {
     val = d
    },
    {from, when, until},
   )

   expect(val).toBe(null)
   when.set(true)
   expect(val).toBe(null)
  }

  {
   // until and when already true
   const from = atom(false)
   const when = atom(true)
   const until = atom(true)

   const a = atom('a')
   let val = null
   a.react(
    d => {
     val = d
    },
    {from, when, until},
   )

   expect(val).toBe(null)
   from.set(true)
   expect(val).toBe(null)
  }

  {
   // when and until become true atomically
   const when = atom(false)
   const until = atom(false)

   const a = atom('a')
   let val = null
   a.react(
    d => {
     val = d
    },
    {when, until},
   )

   expect(val).toBe(null)
   atomically(() => {
    when.set(true)
    until.set(true)
   })

   expect(val).toBe(null)
  }
 })

 it('can specify that the first reaction should be skipped', () => {
  const when = atom(false)
  const a = atom('a')
  let val = null
  a.react(
   d => {
    val = d
   },
   {skipFirst: true, when},
  )

  expect(val).toBe(null)
  when.set(true)
  expect(val).toBe(null)
  a.set('b')
  expect(val).toBe('b')
 })

 it('can specify that a reaction should only happen once', () => {
  {
   // without skipFirst
   const a = atom('a')
   let val = null
   a.react(
    d => {
     val = d
    },
    {once: true},
   )

   expect(val).toBe('a')

   a.set('b')
   expect(val).toBe('a')
  }

  {
   // with skipFirst
   const a = atom('a')
   let val = null
   a.react(
    d => {
     val = d
    },
    {skipFirst: true, once: true},
   )

   expect(val).toBe(null)

   a.set('b')
   expect(val).toBe('b')
   a.set('c')
   expect(val).toBe('b')
  }

  {
   // with when
   const when = atom(false)
   const a = atom('a')
   let val = null
   a.react(
    d => {
     val = d
    },
    {when, once: true},
   )

   expect(val).toBe(null)

   a.set('b')

   expect(val).toBe(null)
   when.set(true)

   expect(val).toBe('b')

   a.set('c')
   expect(val).toBe('b')
  }
 })
})

test('reactor do not create derivation for lifecycle function', () => {
 const a = atom(1)
 const from = atom(true)
 const until = atom(false)
 const when = atom(true)
 a.react(() => {}, {
  from: () => from.get(),
  until: () => until.get(),
  when: () => when.get(),
 })
 //$todo
 expect(a._activeChildren[0]._governor._parent._parents).toEqual(
  expect.arrayContaining([from, until, when]),
 )
})

describe('the .react method', () => {
 it('must have a function as the first argument', () => {
  expect(() => {
   //$off expect error
   atom(5).react()
  }).toThrow()
  expect(() => {
   //$off expect error
   atom(5).react(4)
  }).toThrow()
  expect(() => {
   //$off expect error
   atom(5).react('')
  }).toThrow()
  expect(() => {
   //$off expect error
   atom(5).react({})
  }).toThrow()
 })
})

describe('setting the values of atoms in a reaction phase', () => {
 it('is ok as long as no cycles are created', () => {
  const a = atom('a')

  const b = atom('b')

  a.react(d => {
   b.set(b.get() + d)
  })

  expect(b.get()).toBe('ba')

  a.set('aa')

  expect(b.get()).toBe('baaa')

  // derivable disallows
  expect(() => {
   b.react(d => {
    a.set(d)
   })
  }).not.toThrow() // just exit safely
 })

 it('is not allowed if the atom in question is upstream of the reactor', () => {
  const n = atom(3)

  // currently 1
  const nmod2 = n.map(x => x % 2)

  const double = d => d * 2

  nmod2.react(
   () => {
    n.update(double)
   },
   {skipFirst: true},
  )

  expect(() => {
   n.set(2)
  }).not.toThrow() // just exit safely
  // nmod2 becomes 0, reactor triggers n being set to 4
  // reactor caught up in sweep again, identified as cycle
 })
})

describe('the `when` optons to the `react` method', () => {
 it('allows one to tie the lifecycle of a reactor to some piece of state anonymously', () => {
  const $Cond = atom(false)
  const $N = atom(0)
  const inc = x => x + 1

  let i = 0
  $N.react(
   () => {
    i++
   },
   {when: $Cond},
  )

  expect(i).toBe(0)

  $N.update(inc)

  expect(i).toBe(0)

  $Cond.set(true)

  expect(i).toBe(1)

  $N.update(inc)

  expect(i).toBe(2)

  $N.update(inc)
  $N.update(inc)

  expect(i).toBe(4)

  // it uses truthy/falsiness
  $Cond.set(0)

  $N.update(inc)
  $N.update(inc)

  expect(i).toBe(4)
 })

 it('casts the condition to a boolean', () => {
  const $Cond = atom('blub')
  const $N = atom(0)
  const inc = x => x + 1

  let i = 0

  $N.react(
   () => {
    i++
   },
   {when: $Cond},
  )

  expect(i).toBe(1)

  $N.update(inc)
  expect(i).toBe(2)
  $N.update(inc)
  $N.update(inc)
  $N.update(inc)
  expect(i).toBe(5)
  $Cond.set('steve')
  // sould cause .force() if not casting to boolean, which would inc i
  expect(i).toBe(5)
 })
})

describe('the .maybeStatic method', () => {
 it('only reacts when the thing in the derivable is not null or undefined', () => {
  const a = atom(null)

  let _a = 'Tree'

  maybeStatic(a, d => {
   _a = d
  })

  expect(_a).toBe('Tree')

  a.set('House')

  expect(_a).toBe('House')

  a.set(void 0)

  expect(_a).toBe('House')
 })

 it('merges any given when condition', () => {
  const a = atom(null)
  const when = atom(true)

  let _a = 'Tree'

  maybeStatic(
   a,
   d => {
    _a = d
   },
   ({when}: Lifecycle<string>),
  )

  expect(_a).toBe('Tree')

  a.set('House')

  expect(_a).toBe('House')

  a.set(void 0)

  expect(_a).toBe('House')

  a.set('Tree')

  expect(_a).toBe('Tree')

  when.set(false)

  a.set('House')

  expect(_a).toBe('Tree')
 })

 it("shouldn't touch any other conditions", () => {
  const a = atom(null)
  const when = atom(true)
  const from = atom(false)
  const until = atom(false)

  let _a = 'Tree'

  maybeStatic(
   a,
   d => {
    _a = d
   },
   ({when, from, until}: Lifecycle<string>),
  )

  expect(_a).toBe('Tree')

  a.set('House')

  expect(_a).toBe('Tree')

  from.set(true)

  expect(_a).toBe('House')

  a.set(void 0)

  expect(_a).toBe('House')

  when.set(false)

  a.set('Tree')

  expect(_a).toBe('House')

  when.set(true)

  expect(_a).toBe('Tree')

  until.set(true)

  a.set('House')

  expect(_a).toBe('Tree')
 })
})
