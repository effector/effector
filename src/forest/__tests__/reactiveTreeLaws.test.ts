import {createStore, createEvent, sample, combine, forward} from 'effector'
import {h, using, list, node, spec, remap} from 'forest'

declare const act: (cb?: () => any) => Promise<void>
declare const initBrowser: () => Promise<void>
declare const el: HTMLElement
declare const exec: (cb: () => any) => Promise<string[]>
declare const execFunc: <T>(cb: () => Promise<T>) => Promise<T>

beforeEach(async () => {
  await initBrowser()
}, 10e3)

describe('update store from nested block', () => {
  describe('by sample', () => {
    test('with shared store', async () => {
      const [s1, s2, s3] = await exec(async () => {
        const title = createStore('clicked:')
        const items = createStore(['a', 'b'])
        await new Promise(rs => {
          using(el, {
            fn() {
              list(items, ({store}) => {
                const click = createEvent<MouseEvent>()
                sample({
                  source: {title, id: store},
                  clock: click,
                  fn: ({title, id}) => `${title} ${id}`,
                  target: title,
                })
                h('b', {
                  text: combine(store, title, (id, title) => `${id} ${title}`),
                  handler: {click},
                  attr: {id: store},
                })
              })
            },
            onComplete: rs,
          })
        })
        await act()
        const firstItem = el.querySelector('#a') as HTMLDivElement
        const secondItem = el.querySelector('#b') as HTMLDivElement
        await act(async () => {
          firstItem.click()
        })
        await act(async () => {
          secondItem.click()
        })
      })
      expect(s1).toMatchInlineSnapshot(`
        "
        <b id='a'>a clicked:</b><b id='b'>b clicked:</b>
        "
      `)
      expect(s2).toMatchInlineSnapshot(`
        "
        <b id='a'>a clicked: a</b><b id='b'>b clicked: a</b>
        "
      `)
      expect(s3).toMatchInlineSnapshot(`
        "
        <b id='a'>a clicked: a b</b><b id='b'>b clicked: a b</b>
        "
      `)
    })
    test('with templated store', async () => {
      const [s1, s2, s3] = await exec(async () => {
        const blocks = createStore(['A', 'B'])
        const items = createStore(['a', 'b'])
        await new Promise(rs => {
          using(el, {
            fn() {
              list(blocks, ({store: block}) => {
                const title = createStore('clicked:')
                list(items, ({store}) => {
                  const click = createEvent<MouseEvent>()
                  sample({
                    source: {title, id: store, block},
                    clock: click,
                    fn: ({title, id, block}) => `${title} ${block}${id}`,
                    target: title,
                  })
                  h('b', {
                    text: combine(
                      block,
                      store,
                      title,
                      (block, id, title) => `${block}${id} ${title}`,
                    ),
                    handler: {click},
                    attr: {
                      id: combine(block, store, (block, id) => `${block}${id}`),
                    },
                  })
                })
              })
            },
            onComplete: rs,
          })
        })
        await act()
        const firstItem = el.querySelector('#Aa') as HTMLDivElement
        const secondItem = el.querySelector('#Bb') as HTMLDivElement
        await act(async () => {
          firstItem.click()
        })
        await act(async () => {
          secondItem.click()
        })
      })
      expect(s1).toMatchInlineSnapshot(`
        "
        <b id='Aa'>Aa clicked:</b><b id='Ab'>Ab clicked:</b
        ><b id='Ba'>Ba clicked:</b><b id='Bb'>Bb clicked:</b>
        "
      `)
      expect(s2).toMatchInlineSnapshot(`
        "
        <b id='Aa'>Aa clicked: Aa</b><b id='Ab'>Ab clicked: Aa</b
        ><b id='Ba'>Ba clicked:</b><b id='Bb'>Bb clicked:</b>
        "
      `)
      expect(s3).toMatchInlineSnapshot(`
        "
        <b id='Aa'>Aa clicked: Aa</b><b id='Ab'>Ab clicked: Aa</b
        ><b id='Ba'>Ba clicked: Bb</b><b id='Bb'>Bb clicked: Bb</b>
        "
      `)
    })
  })
  describe('by on', () => {
    test('with shared store', async () => {
      const [s1, s2, s3] = await exec(async () => {
        const title = createStore('clicked:')
        const items = createStore(['a', 'b'])
        await new Promise(rs => {
          using(el, {
            fn() {
              list(items, ({store}) => {
                const click = createEvent<MouseEvent>()
                title.on(sample(store, click), (title, id) => `${title} ${id}`)
                h('b', {
                  text: combine(store, title, (id, title) => `${id} ${title}`),
                  handler: {click},
                  attr: {id: store},
                })
              })
            },
            onComplete: rs,
          })
        })
        await act()
        const firstItem = el.querySelector('#a') as HTMLDivElement
        const secondItem = el.querySelector('#b') as HTMLDivElement
        await act(async () => {
          firstItem.click()
        })
        await act(async () => {
          secondItem.click()
        })
      })
      expect(s1).toMatchInlineSnapshot(`
        "
        <b id='a'>a clicked:</b><b id='b'>b clicked:</b>
        "
      `)
      expect(s2).toMatchInlineSnapshot(`
        "
        <b id='a'>a clicked: a</b><b id='b'>b clicked: a</b>
        "
      `)
      expect(s3).toMatchInlineSnapshot(`
        "
        <b id='a'>a clicked: a b</b><b id='b'>b clicked: a b</b>
        "
      `)
    })
    test('with templated store', async () => {
      const [s1, s2, s3] = await exec(async () => {
        const blocks = createStore(['A', 'B'])
        const items = createStore(['a', 'b'])
        await new Promise(rs => {
          using(el, {
            fn() {
              list(blocks, ({store: block}) => {
                const title = createStore('clicked:')
                list(items, ({store}) => {
                  const id = combine(
                    block,
                    store,
                    (block, id) => `${block}${id}`,
                  )
                  const click = createEvent<MouseEvent>()
                  title.on(sample(id, click), (title, id) => `${title} ${id}`)
                  h('b', {
                    text: combine(
                      block,
                      store,
                      title,
                      (block, id, title) => `${block}${id} ${title}`,
                    ),
                    handler: {click},
                    attr: {id},
                  })
                })
              })
            },
            onComplete: rs,
          })
        })
        await act()
        const firstItem = el.querySelector('#Aa') as HTMLDivElement
        const secondItem = el.querySelector('#Bb') as HTMLDivElement
        await act(async () => {
          firstItem.click()
        })
        await act(async () => {
          secondItem.click()
        })
      })
      expect(s1).toMatchInlineSnapshot(`
        "
        <b id='Aa'>Aa clicked:</b><b id='Ab'>Ab clicked:</b
        ><b id='Ba'>Ba clicked:</b><b id='Bb'>Bb clicked:</b>
        "
      `)
      expect(s2).toMatchInlineSnapshot(`
        "
        <b id='Aa'>Aa clicked: Aa</b><b id='Ab'>Ab clicked: Aa</b
        ><b id='Ba'>Ba clicked:</b><b id='Bb'>Bb clicked:</b>
        "
      `)
      expect(s3).toMatchInlineSnapshot(`
        "
        <b id='Aa'>Aa clicked: Aa</b><b id='Ab'>Ab clicked: Aa</b
        ><b id='Ba'>Ba clicked: Bb</b><b id='Bb'>Bb clicked: Bb</b>
        "
      `)
    })
    test('handler + on edge case', async () => {
      const updates = await execFunc(async () => {
        const updates = [] as number[]
        const count = createStore(0)

        count.watch(upd => {
          updates.push(upd)
        })
        await new Promise(rs => {
          using(el, {
            onComplete: rs,
            fn() {
              const click = createEvent<any>()
              count.on(click, x => x + 1)
              h('button', {
                text: 'Store',
                handler: {click},
                attr: {id: 'click'},
              })
            },
          })
        })
        await act(async () => {
          el.querySelector<HTMLButtonElement>('#click')!.click()
        })
        return updates
      })
      expect(updates).toEqual([0, 1])
    })
  })
})

describe('watchers support', () => {
  test('from global store', async () => {
    const updates = await execFunc(async () => {
      const updates = [] as number[]
      const inc = createEvent()
      const count = createStore(0).on(inc, x => x + 1)
      using(el, {
        fn() {
          count.watch(e => {
            updates.push(e)
          })
        },
      })
      await act(async () => {
        inc()
      })
      return updates
    })
    expect(updates).toEqual([0, 1])
  })
})

describe('store and event on a same level', () => {
  test('on support', async () => {
    const updates = await execFunc(async () => {
      const updates = [] as number[]
      await new Promise(rs => {
        using(el, {
          onComplete: rs,
          fn() {
            const delta = createStore(0)
            const gotHeight = createEvent<number>()
            delta.on(gotHeight, (_, x) => x)
            delta.watch(x => {
              updates.push(x)
            })
            h('div', {
              text: '~/ - /~',
              fn() {
                node(() => {
                  gotHeight(10)
                })
              },
            })
          },
        })
      })
      return updates
    })
    expect(updates).toMatchInlineSnapshot(`
      Array [
        0,
        10,
      ]
    `)
  })
  test('forward support', async () => {
    const updates = await execFunc(async () => {
      const updates = [] as number[]
      await new Promise(rs => {
        using(el, {
          onComplete: rs,
          fn() {
            const delta = createStore(0)
            const gotHeight = createEvent<number>()
            forward({
              from: gotHeight,
              to: delta,
            })
            delta.watch(x => {
              updates.push(x)
            })
            h('div', {
              text: '~/ - /~',
              fn() {
                node(() => {
                  gotHeight(10)
                })
              },
            })
          },
        })
      })
      return updates
    })
    expect(updates).toMatchInlineSnapshot(`
      Array [
        0,
        10,
      ]
    `)
  })
})

describe('getState support', () => {
  test('store from same level', async () => {
    expect(
      await execFunc(async () => {
        const results = [] as string[]
        const users = createStore([
          {id: 1, name: 'alice'},
          {id: 2, name: 'bob'},
          {id: 3, name: 'carol'},
        ])
        using(el, () => {
          h('ul', () => {
            list({
              source: users,
              key: 'id',
              fn({store}) {
                h('li', () => {
                  const name = remap(store, 'name')
                  spec({text: name})
                  node(() => {
                    results.push(name.getState())
                  })
                })
              },
            })
          })
        })
        await act()
        return results
      }),
    ).toMatchInlineSnapshot(`
      Array [
        "alice",
        "bob",
        "carol",
      ]
    `)
  })
  test('store from parent level', async () => {
    expect(
      await execFunc(async () => {
        const results = [] as string[]
        const users = createStore([
          {id: 1, name: 'alice'},
          {id: 2, name: 'bob'},
          {id: 3, name: 'carol'},
        ])
        using(el, () => {
          h('ul', () => {
            list({
              source: users,
              key: 'id',
              fn({store}) {
                const name = remap(store, 'name')
                h('li', () => {
                  node(() => {
                    results.push(name.getState())
                  })
                })
              },
            })
          })
        })
        await act()
        return results
      }),
    ).toMatchInlineSnapshot(`
      Array [
        null,
        null,
        null,
      ]
    `)
  })
})

describe('imperative calls support', () => {
  test('event from same level', async () => {
    expect(
      await execFunc(async () => {
        const results = [] as string[]
        const users = createStore([
          {id: 1, name: 'alice'},
          {id: 2, name: 'bob'},
          {id: 3, name: 'carol'},
        ])
        using(el, () => {
          h('ul', () => {
            list({
              source: users,
              key: 'id',
              fn({store}) {
                h('li', () => {
                  const name = remap(store, 'name')
                  const trigger = createEvent()
                  trigger.watch(() => {
                    results.push(name.getState())
                  })
                  node(() => {
                    trigger()
                  })
                })
              },
            })
          })
        })
        await act()
        return results
      }),
    ).toMatchInlineSnapshot(`
      Array [
        "alice",
        "bob",
        "carol",
      ]
    `)
  })
  test('event from parent level', async () => {
    expect(
      await execFunc(async () => {
        const results = [] as string[]
        const users = createStore([
          {id: 1, name: 'alice'},
          {id: 2, name: 'bob'},
          {id: 3, name: 'carol'},
        ])
        using(el, () => {
          h('ul', () => {
            list({
              source: users,
              key: 'id',
              fn({store}) {
                const name = remap(store, 'name')
                const trigger = createEvent()
                trigger.watch(() => {
                  results.push(name.getState())
                })
                h('li', () => {
                  node(() => {
                    trigger()
                  })
                })
              },
            })
          })
        })
        await act()
        return results
      }),
    ).toMatchInlineSnapshot(`
      Array [
        "alice",
        "bob",
        "carol",
      ]
    `)
  })
  test('event from parent level watched on single child', async () => {
    expect(
      await execFunc(async () => {
        const results = [] as string[]
        const users = createStore([
          {id: 1, name: 'alice'},
          {id: 2, name: 'bob'},
          {id: 3, name: 'carol'},
        ])
        using(el, () => {
          h('ul', () => {
            list({
              source: users,
              key: 'id',
              fn({store}) {
                const name = remap(store, 'name')
                const trigger = createEvent()
                h('li', () => {
                  trigger.watch(() => {
                    results.push(name.getState())
                  })
                  node(() => {
                    trigger()
                  })
                })
              },
            })
          })
        })
        await act()
        return results
      }),
    ).toMatchInlineSnapshot(`
      Array [
        "alice",
        "bob",
        "carol",
      ]
    `)
  })
  test('event from root level', async () => {
    expect(
      await execFunc(async () => {
        const results = [] as string[]
        const users = createStore([
          {id: 1, name: 'alice'},
          {id: 2, name: 'bob'},
          {id: 3, name: 'carol'},
        ])
        const trigger = createEvent()
        using(el, () => {
          h('ul', () => {
            list({
              source: users,
              key: 'id',
              fn({store}) {
                const name = remap(store, 'name')
                trigger.watch(() => {
                  results.push(name.getState())
                })
                h('li', () => {
                  node(() => {
                    trigger()
                  })
                })
              },
            })
          })
        })
        await act()
        trigger()
        return results
      }),
    ).toMatchInlineSnapshot(`
      Array [
        null,
        null,
        null,
        null,
      ]
    `)
  })
})
