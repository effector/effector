import {createStore, createEvent, sample, combine} from 'effector'
import {h, using, list, spec} from 'effector-dom'

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
        <b id=\\"a\\">a clicked:</b><b id=\\"b\\">b clicked:</b>
        "
      `)
      expect(s2).toMatchInlineSnapshot(`
        "
        <b id=\\"a\\">a clicked: a</b><b id=\\"b\\">b clicked: a</b>
        "
      `)
      expect(s3).toMatchInlineSnapshot(`
        "
        <b id=\\"a\\">a clicked: a b</b><b id=\\"b\\">b clicked: a b</b>
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
        <b id=\\"Aa\\">Aa clicked:</b><b id=\\"Ab\\">Ab clicked:</b
        ><b id=\\"Ba\\">Ba clicked:</b><b id=\\"Bb\\">Bb clicked:</b>
        "
      `)
      expect(s2).toMatchInlineSnapshot(`
        "
        <b id=\\"Aa\\">Aa clicked: Aa</b><b id=\\"Ab\\">Ab clicked: Aa</b
        ><b id=\\"Ba\\">Ba clicked:</b><b id=\\"Bb\\">Bb clicked:</b>
        "
      `)
      expect(s3).toMatchInlineSnapshot(`
        "
        <b id=\\"Aa\\">Aa clicked: Aa</b><b id=\\"Ab\\">Ab clicked: Aa</b
        ><b id=\\"Ba\\">Ba clicked: Bb</b><b id=\\"Bb\\">Bb clicked: Bb</b>
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
        <b id=\\"a\\">a clicked:</b><b id=\\"b\\">b clicked:</b>
        "
      `)
      expect(s2).toMatchInlineSnapshot(`
        "
        <b id=\\"a\\">a clicked: a</b><b id=\\"b\\">b clicked: a</b>
        "
      `)
      expect(s3).toMatchInlineSnapshot(`
        "
        <b id=\\"a\\">a clicked: a b</b><b id=\\"b\\">b clicked: a b</b>
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
        <b id=\\"Aa\\">Aa clicked:</b><b id=\\"Ab\\">Ab clicked:</b
        ><b id=\\"Ba\\">Ba clicked:</b><b id=\\"Bb\\">Bb clicked:</b>
        "
      `)
      expect(s2).toMatchInlineSnapshot(`
        "
        <b id=\\"Aa\\">Aa clicked: Aa</b><b id=\\"Ab\\">Ab clicked: Aa</b
        ><b id=\\"Ba\\">Ba clicked:</b><b id=\\"Bb\\">Bb clicked:</b>
        "
      `)
      expect(s3).toMatchInlineSnapshot(`
        "
        <b id=\\"Aa\\">Aa clicked: Aa</b><b id=\\"Ab\\">Ab clicked: Aa</b
        ><b id=\\"Ba\\">Ba clicked: Bb</b><b id=\\"Bb\\">Bb clicked: Bb</b>
        "
      `)
    })
  })
})
