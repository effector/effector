/* eslint-disable no-unused-vars */
import {createStore, createEvent, guard, Event, Store} from 'effector'
const consoleError = console.error

beforeAll(() => {
  console.error = (message, ...args) => {
    if (String(message).includes('guard')) return
    consoleError(message, ...args)
  }
})

afterAll(() => {
  console.error = consoleError
})
const typecheck = '{global}'
type AN = {a: number}
const $num = createStore(0)
const a = createStore({a: 0})
const num = createEvent<number>()
const aNum = createEvent<AN>()
const aT = createStore({a: 0})
const aNumT = createEvent<AN>()
const fn0 = () => ({a: 0})
const fn1 = ({a}: AN) => ({a})
const fn2 = ({a}: AN, c: number) => ({a: a + c})

describe('no target', () => {
  test('no target, none clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: Event<AN> = guard({filter: () => true, source:aNum    })}
      {const result: Event<AN> = guard({filter: () => true, source:a       })}
      {const result: Event<AN> = guard({filter: () => true, source:{a:$num}})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('no target, event clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: Event<AN> = guard({filter: () => true, source:aNum    , clock:num})}
      {const result: Event<AN> = guard({filter: () => true, source:a       , clock:num})}
      {const result: Event<AN> = guard({filter: () => true, source:{a:$num}, clock:num})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('no target, store clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: Event<AN> = guard({filter: () => true, source:aNum    , clock:$num})}
      {const result: Event<AN> = guard({filter: () => true, source:a       , clock:$num})}
      {const result: Event<AN> = guard({filter: () => true, source:{a:$num}, clock:$num})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('no target, tuple clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: Event<AN> = guard({filter: () => true, source:aNum    , clock:[num,$num]})}
      {const result: Event<AN> = guard({filter: () => true, source:a       , clock:[num,$num]})}
      {const result: Event<AN> = guard({filter: () => true, source:{a:$num}, clock:[num,$num]})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})
describe('unit target', () => {
  test('unit target, none clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: Event<AN> = guard({filter: () => true, source:aNum    , target:aNumT})}
      {const result: Store<AN> = guard({filter: () => true, source:aNum    , target:aT   })}
      {const result: Store<AN> = guard({filter: () => true, source:a       , target:aT   })}
      {const result: Event<AN> = guard({filter: () => true, source:a       , target:aNumT})}
      {const result: Event<AN> = guard({filter: () => true, source:{a:$num}, target:aNumT})}
      {const result: Store<AN> = guard({filter: () => true, source:{a:$num}, target:aT   })}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('unit target, event clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: Event<AN> = guard({filter: () => true, source:aNum    , clock:num, target:aNumT})}
      {const result: Store<AN> = guard({filter: () => true, source:aNum    , clock:num, target:aT   })}
      {const result: Event<AN> = guard({filter: () => true, source:a       , clock:num, target:aNumT})}
      {const result: Store<AN> = guard({filter: () => true, source:a       , clock:num, target:aT   })}
      {const result: Event<AN> = guard({filter: () => true, source:{a:$num}, clock:num, target:aNumT})}
      {const result: Store<AN> = guard({filter: () => true, source:{a:$num}, clock:num, target:aT   })}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('unit target, store clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: Store<AN> = guard({filter: () => true, source:aNum    , clock:$num, target:aT   })}
      {const result: Event<AN> = guard({filter: () => true, source:aNum    , clock:$num, target:aNumT})}
      {const result: Event<AN> = guard({filter: () => true, source:a       , clock:$num, target:aNumT})}
      {const result: Store<AN> = guard({filter: () => true, source:a       , clock:$num, target:aT   })}
      {const result: Event<AN> = guard({filter: () => true, source:{a:$num}, clock:$num, target:aNumT})}
      {const result: Store<AN> = guard({filter: () => true, source:{a:$num}, clock:$num, target:aT   })}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('unit target, tuple clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: Store<AN> = guard({filter: () => true, source:aNum    , clock:[num,$num], target:aT   })}
      {const result: Event<AN> = guard({filter: () => true, source:aNum    , clock:[num,$num], target:aNumT})}
      {const result: Event<AN> = guard({filter: () => true, source:a       , clock:[num,$num], target:aNumT})}
      {const result: Store<AN> = guard({filter: () => true, source:a       , clock:[num,$num], target:aT   })}
      {const result: Event<AN> = guard({filter: () => true, source:{a:$num}, clock:[num,$num], target:aNumT})}
      {const result: Store<AN> = guard({filter: () => true, source:{a:$num}, clock:[num,$num], target:aT   })}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})
describe('tuple target', () => {
  test('tuple target, none clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: [Event<AN>, Store<AN>] = guard({filter: () => true, source:aNum    , target:[aNumT,aT]})}
      {const result: [Event<AN>, Store<AN>] = guard({filter: () => true, source:a       , target:[aNumT,aT]})}
      {const result: [Event<AN>, Store<AN>] = guard({filter: () => true, source:{a:$num}, target:[aNumT,aT]})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('tuple target, event clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: [Event<AN>, Store<AN>] = guard({filter: () => true, source:aNum    , clock:num, target:[aNumT,aT]})}
      {const result: [Event<AN>, Store<AN>] = guard({filter: () => true, source:a       , clock:num, target:[aNumT,aT]})}
      {const result: [Event<AN>, Store<AN>] = guard({filter: () => true, source:{a:$num}, clock:num, target:[aNumT,aT]})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('tuple target, store clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: [Event<AN>, Store<AN>] = guard({filter: () => true, source:aNum    , clock:$num, target:[aNumT,aT]})}
      {const result: [Event<AN>, Store<AN>] = guard({filter: () => true, source:a       , clock:$num, target:[aNumT,aT]})}
      {const result: [Event<AN>, Store<AN>] = guard({filter: () => true, source:{a:$num}, clock:$num, target:[aNumT,aT]})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('tuple target, tuple clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: [Event<AN>, Store<AN>] = guard({filter: () => true, source:aNum    , clock:[num,$num], target:[aNumT,aT]})}
      {const result: [Event<AN>, Store<AN>] = guard({filter: () => true, source:a       , clock:[num,$num], target:[aNumT,aT]})}
      {const result: [Event<AN>, Store<AN>] = guard({filter: () => true, source:{a:$num}, clock:[num,$num], target:[aNumT,aT]})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})
