import {createStore, createEvent, sample, combine, Event, Store} from 'effector'
import {h, using, list, node, spec, remap} from 'forest'

import prettyHtml from 'effector/fixtures/prettyHtml'

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
        await new Promise((rs: any) => {
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
        <b id='a'>a clicked: a</b><b id='b'>b clicked:</b>
        "
      `)
      expect(s3).toMatchInlineSnapshot(`
        "
        <b id='a'>a clicked: a</b><b id='b'>b clicked: b</b>
        "
      `)
    })
    test('with templated store', async () => {
      const [s1, s2, s3] = await exec(async () => {
        const blocks = createStore(['A', 'B'])
        const items = createStore(['a', 'b'])
        await new Promise((rs: any) => {
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
        await new Promise((rs: any) => {
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
        <b id='a'>a clicked: a</b><b id='b'>b clicked:</b>
        "
      `)
      expect(s3).toMatchInlineSnapshot(`
        "
        <b id='a'>a clicked: a</b><b id='b'>b clicked: a b</b>
        "
      `)
    })
    test('with templated store', async () => {
      const [s1, s2, s3] = await exec(async () => {
        const blocks = createStore(['A', 'B'])
        const items = createStore(['a', 'b'])
        await new Promise((rs: any) => {
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
    describe('handler + on edge cases', () => {
      test('#1', async () => {
        const updates = await execFunc(async () => {
          const updates = [] as number[]
          const count = createStore(0)

          count.watch(upd => {
            updates.push(upd)
          })
          await new Promise((rs: any) => {
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
      describe('#2', () => {
        test('units in root', async () => {
          const [s1, s2, s3, s4] = await exec(async () => {
            const inc = createEvent<any>()
            const $counter = createStore(0)
            $counter.on(inc, count => count + 1)
            await new Promise((rs: any) => {
              using(el, {
                fn() {
                  /**
                    model-bound component
                    same external $counter
                  */
                  h('p', () => {
                    h('button', {
                      handler: {click: inc},
                      text: $counter,
                      attr: {id: 'a'},
                    })
                  })
                  h('p', () => {
                    h('button', {
                      handler: {click: inc},
                      text: $counter,
                      attr: {id: 'b'},
                    })
                  })
                  /**
                    With internal units bounded to external units
                    $counter -> $myCount, inc <- u
                  */
                  h('p', () => {
                    const up = createEvent<any>()
                    const $myCount = createStore(0)
                    sample({clock: $counter, target: $myCount})
                    sample({clock: up, target: inc})
                    h('button', {
                      handler: {click: up},
                      text: $myCount,
                      attr: {id: 'c'},
                    })
                  })
                  h('p', () => {
                    const up = createEvent<any>()
                    const $myCount = createStore(0)
                    sample({clock: $counter, target: $myCount})
                    sample({clock: up, target: inc})
                    h('button', {
                      handler: {click: up},
                      text: $myCount,
                      attr: {id: 'd'},
                    })
                  })
                },
                onComplete: rs,
              })
            })
            await act()
            await act(async () => {
              el.querySelector<HTMLButtonElement>('#a')!.click()
            })
            await act(async () => {
              el.querySelector<HTMLButtonElement>('#c')!.click()
            })
            await act(async () => {
              el.querySelector<HTMLButtonElement>('#b')!.click()
            })
          })
          expect(s1).toMatchInlineSnapshot(`
            "
            <p><button id='a'>0</button></p>
            <p><button id='b'>0</button></p>
            <p><button id='c'>0</button></p>
            <p><button id='d'>0</button></p>
            "
          `)
          expect(s2).toMatchInlineSnapshot(`
            "
            <p><button id='a'>1</button></p>
            <p><button id='b'>1</button></p>
            <p><button id='c'>1</button></p>
            <p><button id='d'>1</button></p>
            "
          `)
          expect(s3).toMatchInlineSnapshot(`
            "
            <p><button id='a'>2</button></p>
            <p><button id='b'>2</button></p>
            <p><button id='c'>2</button></p>
            <p><button id='d'>2</button></p>
            "
          `)
          expect(s4).toMatchInlineSnapshot(`
            "
            <p><button id='a'>3</button></p>
            <p><button id='b'>3</button></p>
            <p><button id='c'>3</button></p>
            <p><button id='d'>3</button></p>
            "
          `)
        })
        test('units in using', async () => {
          const [s1, s2, s3, s4] = await exec(async () => {
            await new Promise((rs: any) => {
              using(el, {
                fn() {
                  const inc = createEvent<any>()
                  const $counter = createStore(0)
                  $counter.on(inc, count => count + 1)
                  /**
                    model-bound component
                    same external $counter
                  */
                  h('p', () => {
                    h('button', {
                      handler: {click: inc},
                      text: $counter,
                      attr: {id: 'a'},
                    })
                  })
                  h('p', () => {
                    h('button', {
                      handler: {click: inc},
                      text: $counter,
                      attr: {id: 'b'},
                    })
                  })
                  /**
                    With internal units bounded to external units
                    $counter -> $myCount, inc <- u
                  */
                  h('p', () => {
                    const up = createEvent<any>()
                    const $myCount = createStore(0)
                    sample({clock: $counter, target: $myCount})
                    sample({clock: up, target: inc})
                    h('button', {
                      handler: {click: up},
                      text: $myCount,
                      attr: {id: 'c'},
                    })
                  })
                  h('p', () => {
                    const up = createEvent<any>()
                    const $myCount = createStore(0)
                    sample({clock: $counter, target: $myCount})
                    sample({clock: up, target: inc})
                    h('button', {
                      handler: {click: up},
                      text: $myCount,
                      attr: {id: 'd'},
                    })
                  })
                },
                onComplete: rs,
              })
            })
            await act()
            await act(async () => {
              el.querySelector<HTMLButtonElement>('#a')!.click()
            })
            await act(async () => {
              el.querySelector<HTMLButtonElement>('#c')!.click()
            })
            await act(async () => {
              el.querySelector<HTMLButtonElement>('#b')!.click()
            })
          })
          expect(s1).toMatchInlineSnapshot(`
            "
            <p><button id='a'>0</button></p>
            <p><button id='b'>0</button></p>
            <p><button id='c'>0</button></p>
            <p><button id='d'>0</button></p>
            "
          `)
          expect(s2).toMatchInlineSnapshot(`
            "
            <p><button id='a'>1</button></p>
            <p><button id='b'>1</button></p>
            <p><button id='c'>1</button></p>
            <p><button id='d'>1</button></p>
            "
          `)
          expect(s3).toMatchInlineSnapshot(`
            "
            <p><button id='a'>2</button></p>
            <p><button id='b'>2</button></p>
            <p><button id='c'>2</button></p>
            <p><button id='d'>2</button></p>
            "
          `)
          expect(s4).toMatchInlineSnapshot(`
            "
            <p><button id='a'>3</button></p>
            <p><button id='b'>3</button></p>
            <p><button id='c'>3</button></p>
            <p><button id='d'>3</button></p>
            "
          `)
        })
      })
      describe('#3', () => {
        test('external store and event', async () => {
          const [s1, s2, s3] = await exec(async () => {
            const enable = createEvent<any>()
            const disable = createEvent<any>()
            const enabled = createStore(false)
              .on(enable, () => true)
              .on(disable, () => false)
            const disabled = enabled.map(is => !is)
            await new Promise((rs: any) => {
              using(el, {
                fn() {
                  h('button', {
                    text: 'Enable',
                    attr: {disabled: enabled, id: 'a'},
                    handler: {click: enable},
                  })
                  h('button', {
                    text: 'Disable',
                    attr: {disabled, id: 'b'},
                    handler: {click: disable},
                  })
                  h('button', {
                    text: 'Disable',
                    attr: {disabled, id: 'c'},
                    handler: {click: disable},
                  })
                },
                onComplete: rs,
              })
            })
            await act()
            await act(async () => {
              el.querySelector<HTMLButtonElement>('#a')!.click()
            })
            await act(async () => {
              el.querySelector<HTMLButtonElement>('#b')!.click()
            })
          })
          expect(s1).toMatchInlineSnapshot(`
            "
            <button id='a'>Enable</button
            ><button id='b' disabled='true'>Disable</button
            ><button id='c' disabled='true'>Disable</button>
            "
          `)
          expect(s2).toMatchInlineSnapshot(`
            "
            <button id='a' disabled='true'>Enable</button
            ><button id='b'>Disable</button
            ><button id='c'>Disable</button>
            "
          `)
          expect(s3).toMatchInlineSnapshot(`
            "
            <button id='a'>Enable</button
            ><button id='b' disabled='true'>Disable</button
            ><button id='c' disabled='true'>Disable</button>
            "
          `)
        })
        test('internal store and event', async () => {
          const [s1, s2, s3] = await exec(async () => {
            await new Promise((rs: any) => {
              using(el, {
                fn() {
                  const enable = createEvent<any>()
                  const disable = createEvent<any>()
                  const enabled = createStore(false)
                    .on(enable, () => true)
                    .on(disable, () => false)
                  const disabled = enabled.map(is => !is)
                  h('button', {
                    text: 'Enable',
                    attr: {disabled: enabled, id: 'a'},
                    handler: {click: enable},
                  })
                  h('button', {
                    text: 'Disable',
                    attr: {disabled, id: 'b'},
                    handler: {click: disable},
                  })
                  h('button', {
                    text: 'Disable',
                    attr: {disabled, id: 'c'},
                    handler: {click: disable},
                  })
                },
                onComplete: rs,
              })
            })
            await act()
            await act(async () => {
              el.querySelector<HTMLButtonElement>('#a')!.click()
            })
            await act(async () => {
              el.querySelector<HTMLButtonElement>('#b')!.click()
            })
          })
          expect(s1).toMatchInlineSnapshot(`
            "
            <button id='a'>Enable</button
            ><button id='b' disabled='true'>Disable</button
            ><button id='c' disabled='true'>Disable</button>
            "
          `)
          expect(s2).toMatchInlineSnapshot(`
            "
            <button id='a' disabled='true'>Enable</button
            ><button id='b'>Disable</button
            ><button id='c'>Disable</button>
            "
          `)
          expect(s3).toMatchInlineSnapshot(`
            "
            <button id='a'>Enable</button
            ><button id='b' disabled='true'>Disable</button
            ><button id='c' disabled='true'>Disable</button>
            "
          `)
        })
      })
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
      await new Promise((rs: any) => {
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
      await new Promise((rs: any) => {
        using(el, {
          onComplete: rs,
          fn() {
            const delta = createStore(0)
            const gotHeight = createEvent<number>()
            sample({clock: gotHeight, target: delta})
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
describe('event from root, sample and nested store', () => {
  it('works when nested store is used', async () => {
    const {itemUpdates} = await execFunc(async () => {
      const itemUpdates = [] as string[]
      const htmlSnapshots = [] as string[]
      const selectItem = createEvent<string>()

      const currentFile = createStore('foo').on(selectItem, (_, file) => file)

      const openFile = createEvent<any>()

      const files = createStore([{id: 'foo'}, {id: 'bar'}, {id: 'baz'}])

      selectItem.watch(e => {
        itemUpdates.push(e)
      })
      await new Promise((rs: any) => {
        using(el, {
          fn() {
            h('ul', () => {
              list({
                source: files,
                key: 'id',
                fields: ['id'],
                fn({fields: [id]}) {
                  h('li', () => {
                    spec({text: id})
                    sample({
                      source: id,
                      clock: openFile,
                      target: selectItem,
                    })
                    const selected = combine(
                      id,
                      currentFile,
                      (file, selectedFile) => file === selectedFile,
                    )
                    h('button', {
                      handler: {click: openFile},
                      attr: {disabled: selected, id},
                      text: 'open',
                    })
                    h('span', {
                      visible: selected,
                      text: 'selected',
                    })
                  })
                },
              })
            })
          },
          onComplete: rs,
        })
      })

      await act(async () => {
        el.querySelector<HTMLButtonElement>('#baz')!.click()
      })
      htmlSnapshots.push(el.innerHTML)
      await act(async () => {
        el.querySelector<HTMLButtonElement>('#baz')!.click()
      })
      htmlSnapshots.push(el.innerHTML)

      return {itemUpdates, htmlSnapshots}
    })
    expect(itemUpdates).toMatchInlineSnapshot(`
      Array [
        "foo",
        "baz",
        "bar",
      ]
    `)
  })
  it('works when nested store is not used', async () => {
    const {itemUpdates, htmlSnapshots} = await execFunc(async () => {
      const itemUpdates = [] as string[]
      const htmlSnapshots = [] as string[]
      const selectItem = createEvent<string>()

      const currentFile = createStore('foo').on(selectItem, (_, file) => file)

      const openFile = createEvent<any>()

      const files = createStore([{id: 'foo'}, {id: 'bar'}, {id: 'baz'}])

      selectItem.watch(e => {
        itemUpdates.push(e)
      })
      await new Promise((rs: any) => {
        using(el, {
          fn() {
            h('ul', () => {
              list({
                source: files,
                key: 'id',
                fields: ['id'],
                fn({fields: [id]}) {
                  h('li', {
                    fn() {
                      spec({text: id})
                      sample({
                        source: id,
                        clock: openFile,
                        target: selectItem,
                      })

                      const selected = combine(
                        id,
                        currentFile,
                        (file, selectedFile) => file === selectedFile,
                      )
                      h('button', {
                        handler: {click: openFile},
                        attr: {disabled: selected},
                        text: 'open',
                      })
                      h('span', {
                        visible: selected,
                        text: [id, ' selected'],
                      })
                    },
                  })
                },
              })
            })
          },
          onComplete: rs,
        })
      })
      const [, , baz] = [...el.querySelectorAll('button')]
      await act(async () => {
        baz.click()
      })
      htmlSnapshots.push(el.innerHTML)
      await act(async () => {
        baz.click()
      })
      htmlSnapshots.push(el.innerHTML)

      return {itemUpdates, htmlSnapshots}
    })
    expect(itemUpdates).toMatchInlineSnapshot(`
      Array [
        "foo",
        "baz",
        "bar",
      ]
    `)
    /**
     *  TODO improve meaningless html code
     */
    expect(prettyHtml(htmlSnapshots[0])).toMatchInlineSnapshot(`
      "
      <ul>
        <li>
          foo<button disabled='true'>open</button
          ><span>foo selected</span>
        </li>
        <li>
          bar<button disabled='true'>open</button
          ><span>bar selected</span>
        </li>
        <li>
          baz<button disabled='true'>open</button
          ><span>baz selected</span>
        </li>
      </ul>
      "
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
        "alice",
        "bob",
        "carol",
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
