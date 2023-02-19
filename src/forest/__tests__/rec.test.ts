import type {BrowserObject} from 'webdriverio'
import {createStore, createEvent, combine, sample} from 'effector'
import {using, h, spec, text, list, rec, remap} from 'forest'
import {Leaf} from '../index.h'

// let addGlobals: Function
declare const act: (cb?: () => any) => Promise<void>
declare const initBrowser: () => Promise<void>
declare const el: HTMLElement
// let execFun: <T>(cb: (() => Promise<T> | T) | string) => Promise<T>
// let readHTML: () => string
declare const browser: BrowserObject
declare const exec: (cb: () => any) => Promise<string[]>
declare const execFunc: <T>(cb: () => Promise<T>) => Promise<T>

beforeEach(async () => {
  await initBrowser()
}, 10e3)

test('rec visible support', async () => {
  const [s1, s2, s3] = await exec(async () => {
    const toggleNestedRows = createEvent()
    const nestedRowsVisible = createStore(true).on(
      toggleNestedRows,
      visible => !visible,
    )
    type Item = {
      value: string
      child: Item[]
    }
    type FlatItem = {
      value: string
      child: string[]
    }
    const items = createStore([
      {
        value: 'a',
        child: [
          {
            value: 'a_a',
            child: [],
          },
          {
            value: 'a_b',
            child: [
              {
                value: 'a_b_a',
                child: [],
              },
            ],
          },
        ],
      },
      {
        value: 'b',
        child: [
          {
            value: 'b_a',
            child: [],
          },
          {
            value: 'b_b',
            child: [],
          },
        ],
      },
    ])
    const flatItems = items.map(list => {
      const result = [] as FlatItem[]
      list.forEach(processValue)
      function processValue({value, child}: Item) {
        result.push({value, child: child.map(({value}) => value)})
        child.forEach(processValue)
      }
      return result
    })
    const topLevelFlatItems = flatItems.map(list =>
      list
        .filter(({value}) => value.length === 1)
        .map(item => ({item, level: 0})),
    )
    let rootLeaf: Leaf
    //@ts-expect-error
    using(el, {
      fn() {
        const Row = rec<{item: FlatItem; level: number}>(({store}) => {
          const [level, item] = remap(store, ['level', 'item'] as const)
          const visible = combine(
            level,
            nestedRowsVisible,
            (level, visible) => {
              if (level === 0) return true
              return visible
            },
          )
          const childs = combine(
            flatItems,
            item,
            level,
            (list, {child}, level) =>
              list
                .filter(({value}) => child.includes(value))
                .map(item => ({item, level: level + 1})),
          )
          h('div', {
            // style: {marginLeft: '1em'},
            visible,
            fn() {
              spec({text: [remap(item, 'value'), ' ', level]})

              list(childs, ({store}) => {
                Row({store})
              })
            },
          })
        })
        list(topLevelFlatItems, ({store}) => {
          Row({store})
        })
      },
      onRoot({leaf}: {leaf: Leaf}) {
        rootLeaf = leaf
      },
    })
    await act()
    // printLeaf(rootLeaf)
    await act(() => {
      toggleNestedRows()
    })
    await act(() => {
      toggleNestedRows()
    })
    // printLeaf(rootLeaf)
  })
  expect(s1).toMatchInlineSnapshot(`
    "
    <div>
      a 0
      <div>a_a 1</div>
      <div>
        a_b 1
        <div>a_b_a 2</div>
      </div>
    </div>
    <div>
      b 0
      <div>b_a 1</div>
      <div>b_b 1</div>
    </div>
    "
  `)
  expect(s2).toMatchInlineSnapshot(`
    "
    <div>a 0</div>
    <div>b 0</div>
    "
  `)
  expect(s3).toBe(s1)
})

test('rec style update support', async () => {
  const [s1, s2, s3] = await exec(async () => {
    const toggleNestedRows = createEvent()
    const nestedRowsVisible = createStore(true).on(
      toggleNestedRows,
      visible => !visible,
    )
    type Item = {
      value: string
      child: Item[]
    }
    type FlatItem = {
      value: string
      child: string[]
    }
    const items = createStore([
      {
        value: 'a',
        child: [
          {
            value: 'a_a',
            child: [],
          },
          {
            value: 'a_b',
            child: [
              {
                value: 'a_b_a',
                child: [],
              },
            ],
          },
        ],
      },
      {
        value: 'b',
        child: [
          {
            value: 'b_a',
            child: [],
          },
          {
            value: 'b_b',
            child: [],
          },
        ],
      },
    ])
    const flatItems = items.map(list => {
      const result = [] as FlatItem[]
      list.forEach(processValue)
      function processValue({value, child}: Item) {
        result.push({value, child: child.map(({value}) => value)})
        child.forEach(processValue)
      }
      return result
    })
    const topLevelFlatItems = flatItems.map(list =>
      list
        .filter(({value}) => value.length === 1)
        .map(item => ({item, level: 0})),
    )
    let rootLeaf: Leaf
    //@ts-expect-error
    using(el, {
      fn() {
        const Row = rec<{item: FlatItem; level: number}>(({store}) => {
          const [level, item] = remap(store, ['level', 'item'] as const)
          const visible = combine(
            level,
            nestedRowsVisible,
            (level, visible): string => {
              if (level === 0) return 'yes'
              return visible ? 'yes' : 'no'
            },
          )
          h('div', {
            style: {marginLeft: level.map(value => `${value}em`)},
            data: {visible},
            fn() {
              const value = remap(item, 'value')
              const status = visible.map(
                vis => (vis === 'yes' ? 'visible' : 'hidden') as string,
              )
              text`${value} ${level} ${status}`
            },
          })
          const childs = combine(
            flatItems,
            store,
            (list, {item: {child}, level}) =>
              list
                .filter(({value}) => child.includes(value))
                .map(item => ({item, level: level + 1})),
          )
          list(childs, ({store}) => {
            Row({store})
          })
        })
        list(topLevelFlatItems, ({store}) => {
          Row({store})
        })
      },
      onRoot({leaf}: {leaf: Leaf}) {
        rootLeaf = leaf
      },
    })
    await act()
    // printLeaf(rootLeaf)
    await act(() => {
      toggleNestedRows()
    })
    await act(() => {
      toggleNestedRows()
    })
    // printLeaf(rootLeaf)
  })
  expect(s1).toMatchInlineSnapshot(`
"
<div data-visible='yes' style='margin-left: 0em'>
  a 0 visible
</div>
<div data-visible='yes' style='margin-left: 1em'>
  a_a 1 visible
</div>
<div data-visible='yes' style='margin-left: 1em'>
  a_b 1 visible
</div>
<div data-visible='yes' style='margin-left: 2em'>
  a_b_a 2 visible
</div>
<div data-visible='yes' style='margin-left: 0em'>
  b 0 visible
</div>
<div data-visible='yes' style='margin-left: 1em'>
  b_a 1 visible
</div>
<div data-visible='yes' style='margin-left: 1em'>
  b_b 1 visible
</div>
"
`)
  expect(s2).toMatchInlineSnapshot(`
"
<div data-visible='yes' style='margin-left: 0em'>
  a 0 visible
</div>
<div data-visible='no' style='margin-left: 1em'>
  a_a 1 hidden
</div>
<div data-visible='no' style='margin-left: 1em'>
  a_b 1 hidden
</div>
<div data-visible='no' style='margin-left: 2em'>
  a_b_a 2 hidden
</div>
<div data-visible='yes' style='margin-left: 0em'>
  b 0 visible
</div>
<div data-visible='no' style='margin-left: 1em'>
  b_a 1 hidden
</div>
<div data-visible='no' style='margin-left: 1em'>
  b_b 1 hidden
</div>
"
`)
  expect(s3).toBe(s1)
})

function printLeaf(leaf: Leaf) {
  const rows = [] as string[]
  parse(leaf, {level: 0})
  function parse(leaf: Leaf, {level}: {level: number}) {
    const {data} = leaf
    const tab = ' '.repeat(level * 2)
    rows.push(`${tab}id: ${leaf.fullID}`)
    rows.push(`${tab}type: ${data.type}`)
    switch (data.type) {
      case 'using': {
        break
      }
      case 'element': {
        const {value, index} = data.block
        rows.push(`${tab}index: ${index}`)
        rows.push(`${tab}text: ${value.textContent}`)
        break
      }
      case 'list': {
        break
      }
      case 'listItem': {
        break
      }
      case 'route': {
        break
      }
      case 'recItem': {
        break
      }
      case 'rec': {
        break
      }
    }
    let hasChilds = false
    iterateChildLeafs(leaf, child => {
      parse(child, {level: level + 1})
      rows.push(`${tab}  --`)
      hasChilds = true
    })
    if (hasChilds) {
      rows.pop()
    }
  }
  console.log(rows.join(`\n`))
  function iterateChildLeafs(leaf: Leaf, cb: (child: Leaf) => void) {
    for (const key in leaf.root.childSpawns[leaf.fullID]) {
      const childs = leaf.root.childSpawns[leaf.fullID][key]
      for (let i = 0; i < childs.length; i++) {
        cb(childs[i])
      }
    }
  }
}

test('top level rec suppot', async () => {
  //prettier-ignore
  type Item = {id: number; title: string; child: Item[]};
  const [s1] = await exec(async () => {
    const Article = rec<Item>(({store}) => {
      const [title, child] = remap(store, ['title', 'child'] as const)
      h('div', () => {
        h('header', {text: title})
        list({
          source: child,
          key: 'id',
          fn({store}) {
            Article({store})
          },
        })
      })
    })
    const item = createStore<Item>({
      id: 0,
      title: 'root',
      child: [
        {
          id: 1,
          title: 'a',
          child: [],
        },
        {
          id: 2,
          title: 'b',
          child: [
            {
              id: 3,
              title: 'c',
              child: [],
            },
          ],
        },
      ],
    })
    using(el, () => {
      h('section', () => {
        Article({store: item})
      })
    })
    await act()
  })
  expect(s1).toMatchInlineSnapshot(`
    "
    <section>
      <div>
        <header>root</header>
        <div><header>a</header></div>
        <div>
          <header>b</header>
          <div><header>c</header></div>
        </div>
      </div>
    </section>
    "
  `)
})

describe('recursion', () => {
  /**
   * TODO wrong behavior!
   * infinite loop during #c click
   */
  test.skip('store update #1', async () => {
    type ValueType = {id: string; child: ValueType[]}
    const [initial, cClicked, bClicked, dClicked, aClicked] = await exec(
      async () => {
        const Value = rec<ValueType & {parentValues: number[]}>(({store}) => {
          const [id, child, inputValues] = remap(store, [
            'id',
            'child',
            'parentValues',
          ])
          const click = createEvent<any>()
          const count = createStore(0).on(click, x => x + 1)
          const parentValues = combine(inputValues, count, (items, n) => [
            ...items,
            n,
          ])
          h('div', () => {
            h('button', {
              attr: {id},
              handler: {click},
              text: ['Click ', id],
            })
            h('b', {text: count})
            list(inputValues, ({store}) => {
              h('i', {text: store})
            })
            list(child, ({store}) => {
              Value({
                store: combine(
                  store,
                  parentValues,
                  ({id, child}, parentValues) => ({id, child, parentValues}),
                ),
              })
            })
          })
        })
        const root = createStore<ValueType & {parentValues: number[]}>({
          id: 'a',
          child: [
            {id: 'b', child: [{id: 'c', child: []}]},
            {id: 'd', child: [{id: 'e', child: []}]},
            {id: 'f', child: []},
          ],
          parentValues: [],
        })
        using(el, {
          fn() {
            Value({store: root})
          },
        })
        await act()
        await act(async () => {
          el.querySelector<HTMLButtonElement>('#c')!.click()
        })
        await act(async () => {
          el.querySelector<HTMLButtonElement>('#b')!.click()
        })
        await act(async () => {
          el.querySelector<HTMLButtonElement>('#d')!.click()
        })
        await act(async () => {
          el.querySelector<HTMLButtonElement>('#a')!.click()
        })
      },
    )

    expect(initial).toMatchInlineSnapshot()
    expect(cClicked).toMatchInlineSnapshot()
    expect(bClicked).toMatchInlineSnapshot()
    expect(dClicked).toMatchInlineSnapshot()
    expect(aClicked).toMatchInlineSnapshot()
  })
  describe('store update #2', () => {
    //prettier-ignore
    type ValueType = {id: string; child: ValueType[]};
    test('with on', async () => {
      const [initial, cClicked, bClicked, dClicked, aClicked] = await exec(
        async () => {
          const Value = rec<ValueType>(({store}) => {
            const [id, child] = remap(store, ['id', 'child'])
            const click = createEvent<any>()
            const count = createStore(0).on(click, x => x + 1)
            h('div', () => {
              h('button', {
                attr: {id},
                handler: {click},
                text: ['Click ', id],
              })
              h('b', {text: count})
              list(child, ({store}) => {
                Value({store})
              })
            })
          })
          const root = createStore<ValueType>({
            id: 'a',
            child: [
              {id: 'b', child: [{id: 'c', child: []}]},
              {id: 'd', child: [{id: 'e', child: []}]},
              {id: 'f', child: []},
            ],
          })
          using(el, {
            fn() {
              Value({store: root})
            },
          })
          await act()
          await act(async () => {
            el.querySelector<HTMLButtonElement>('#c')!.click()
          })
          await act(async () => {
            el.querySelector<HTMLButtonElement>('#b')!.click()
          })
          await act(async () => {
            el.querySelector<HTMLButtonElement>('#d')!.click()
          })
          await act(async () => {
            el.querySelector<HTMLButtonElement>('#a')!.click()
          })
        },
      )

      expect(initial).toMatchInlineSnapshot(`
  "
  <div>
    <button id='a'>Click a</button><b>0</b>
    <div>
      <button id='b'>Click b</button><b>0</b>
      <div><button id='c'>Click c</button><b>0</b></div>
    </div>
    <div>
      <button id='d'>Click d</button><b>0</b>
      <div><button id='e'>Click e</button><b>0</b></div>
    </div>
    <div><button id='f'>Click f</button><b>0</b></div>
  </div>
  "
  `)
      expect(cClicked).toMatchInlineSnapshot(`
  "
  <div>
    <button id='a'>Click a</button><b>0</b>
    <div>
      <button id='b'>Click b</button><b>0</b>
      <div><button id='c'>Click c</button><b>1</b></div>
    </div>
    <div>
      <button id='d'>Click d</button><b>0</b>
      <div><button id='e'>Click e</button><b>0</b></div>
    </div>
    <div><button id='f'>Click f</button><b>0</b></div>
  </div>
  "
  `)
      expect(bClicked).toMatchInlineSnapshot(`
  "
  <div>
    <button id='a'>Click a</button><b>0</b>
    <div>
      <button id='b'>Click b</button><b>1</b>
      <div><button id='c'>Click c</button><b>1</b></div>
    </div>
    <div>
      <button id='d'>Click d</button><b>0</b>
      <div><button id='e'>Click e</button><b>0</b></div>
    </div>
    <div><button id='f'>Click f</button><b>0</b></div>
  </div>
  "
  `)
      expect(dClicked).toMatchInlineSnapshot(`
  "
  <div>
    <button id='a'>Click a</button><b>0</b>
    <div>
      <button id='b'>Click b</button><b>1</b>
      <div><button id='c'>Click c</button><b>1</b></div>
    </div>
    <div>
      <button id='d'>Click d</button><b>1</b>
      <div><button id='e'>Click e</button><b>0</b></div>
    </div>
    <div><button id='f'>Click f</button><b>0</b></div>
  </div>
  "
  `)
      expect(aClicked).toMatchInlineSnapshot(`
  "
  <div>
    <button id='a'>Click a</button><b>1</b>
    <div>
      <button id='b'>Click b</button><b>1</b>
      <div><button id='c'>Click c</button><b>1</b></div>
    </div>
    <div>
      <button id='d'>Click d</button><b>1</b>
      <div><button id='e'>Click e</button><b>0</b></div>
    </div>
    <div><button id='f'>Click f</button><b>0</b></div>
  </div>
  "
  `)
    })
    test('with sample single target', async () => {
      const [initial, cClicked, bClicked, dClicked, aClicked] = await exec(
        async () => {
          const Value = rec<ValueType>(({store}) => {
            const [id, child] = remap(store, ['id', 'child'])
            const click = createEvent<any>()
            const count = createStore(0)
            sample({
              clock: click,
              source: count,
              target: count,
              fn: x => x + 1,
            })
            h('div', () => {
              h('button', {
                attr: {id},
                handler: {click},
                text: ['Click ', id],
              })
              h('b', {text: count})
              list(child, ({store}) => {
                Value({store})
              })
            })
          })
          const root = createStore<ValueType>({
            id: 'a',
            child: [
              {id: 'b', child: [{id: 'c', child: []}]},
              {id: 'd', child: [{id: 'e', child: []}]},
              {id: 'f', child: []},
            ],
          })
          using(el, {
            fn() {
              Value({store: root})
            },
          })
          await act()
          await act(async () => {
            el.querySelector<HTMLButtonElement>('#c')!.click()
          })
          await act(async () => {
            el.querySelector<HTMLButtonElement>('#b')!.click()
          })
          await act(async () => {
            el.querySelector<HTMLButtonElement>('#d')!.click()
          })
          await act(async () => {
            el.querySelector<HTMLButtonElement>('#a')!.click()
          })
        },
      )

      expect(initial).toMatchInlineSnapshot(`
  "
  <div>
    <button id='a'>Click a</button><b>0</b>
    <div>
      <button id='b'>Click b</button><b>0</b>
      <div><button id='c'>Click c</button><b>0</b></div>
    </div>
    <div>
      <button id='d'>Click d</button><b>0</b>
      <div><button id='e'>Click e</button><b>0</b></div>
    </div>
    <div><button id='f'>Click f</button><b>0</b></div>
  </div>
  "
  `)
      expect(cClicked).toMatchInlineSnapshot(`
  "
  <div>
    <button id='a'>Click a</button><b>0</b>
    <div>
      <button id='b'>Click b</button><b>0</b>
      <div><button id='c'>Click c</button><b>1</b></div>
    </div>
    <div>
      <button id='d'>Click d</button><b>0</b>
      <div><button id='e'>Click e</button><b>0</b></div>
    </div>
    <div><button id='f'>Click f</button><b>0</b></div>
  </div>
  "
  `)
      expect(bClicked).toMatchInlineSnapshot(`
  "
  <div>
    <button id='a'>Click a</button><b>0</b>
    <div>
      <button id='b'>Click b</button><b>1</b>
      <div><button id='c'>Click c</button><b>1</b></div>
    </div>
    <div>
      <button id='d'>Click d</button><b>0</b>
      <div><button id='e'>Click e</button><b>0</b></div>
    </div>
    <div><button id='f'>Click f</button><b>0</b></div>
  </div>
  "
  `)
      expect(dClicked).toMatchInlineSnapshot(`
  "
  <div>
    <button id='a'>Click a</button><b>0</b>
    <div>
      <button id='b'>Click b</button><b>1</b>
      <div><button id='c'>Click c</button><b>1</b></div>
    </div>
    <div>
      <button id='d'>Click d</button><b>1</b>
      <div><button id='e'>Click e</button><b>0</b></div>
    </div>
    <div><button id='f'>Click f</button><b>0</b></div>
  </div>
  "
  `)
      expect(aClicked).toMatchInlineSnapshot(`
  "
  <div>
    <button id='a'>Click a</button><b>1</b>
    <div>
      <button id='b'>Click b</button><b>1</b>
      <div><button id='c'>Click c</button><b>1</b></div>
    </div>
    <div>
      <button id='d'>Click d</button><b>1</b>
      <div><button id='e'>Click e</button><b>0</b></div>
    </div>
    <div><button id='f'>Click f</button><b>0</b></div>
  </div>
  "
  `)
    })
    test('with sample array target', async () => {
      const [initial, cClicked, bClicked, dClicked, aClicked] = await exec(
        async () => {
          const Value = rec<ValueType>(({store}) => {
            const [id, child] = remap(store, ['id', 'child'])
            const click = createEvent<any>()
            const count = createStore(0)
            sample({
              clock: click,
              source: count,
              target: [count],
              fn: x => x + 1,
            })
            h('div', () => {
              h('button', {
                attr: {id},
                handler: {click},
                text: ['Click ', id],
              })
              h('b', {text: count})
              list(child, ({store}) => {
                Value({store})
              })
            })
          })
          const root = createStore<ValueType>({
            id: 'a',
            child: [
              {id: 'b', child: [{id: 'c', child: []}]},
              {id: 'd', child: [{id: 'e', child: []}]},
              {id: 'f', child: []},
            ],
          })
          using(el, {
            fn() {
              Value({store: root})
            },
          })
          await act()
          await act(async () => {
            el.querySelector<HTMLButtonElement>('#c')!.click()
          })
          await act(async () => {
            el.querySelector<HTMLButtonElement>('#b')!.click()
          })
          await act(async () => {
            el.querySelector<HTMLButtonElement>('#d')!.click()
          })
          await act(async () => {
            el.querySelector<HTMLButtonElement>('#a')!.click()
          })
        },
      )

      expect(initial).toMatchInlineSnapshot(`
  "
  <div>
    <button id='a'>Click a</button><b>0</b>
    <div>
      <button id='b'>Click b</button><b>0</b>
      <div><button id='c'>Click c</button><b>0</b></div>
    </div>
    <div>
      <button id='d'>Click d</button><b>0</b>
      <div><button id='e'>Click e</button><b>0</b></div>
    </div>
    <div><button id='f'>Click f</button><b>0</b></div>
  </div>
  "
  `)
      expect(cClicked).toMatchInlineSnapshot(`
  "
  <div>
    <button id='a'>Click a</button><b>0</b>
    <div>
      <button id='b'>Click b</button><b>0</b>
      <div><button id='c'>Click c</button><b>1</b></div>
    </div>
    <div>
      <button id='d'>Click d</button><b>0</b>
      <div><button id='e'>Click e</button><b>0</b></div>
    </div>
    <div><button id='f'>Click f</button><b>0</b></div>
  </div>
  "
  `)
      expect(bClicked).toMatchInlineSnapshot(`
  "
  <div>
    <button id='a'>Click a</button><b>0</b>
    <div>
      <button id='b'>Click b</button><b>1</b>
      <div><button id='c'>Click c</button><b>1</b></div>
    </div>
    <div>
      <button id='d'>Click d</button><b>0</b>
      <div><button id='e'>Click e</button><b>0</b></div>
    </div>
    <div><button id='f'>Click f</button><b>0</b></div>
  </div>
  "
  `)
      expect(dClicked).toMatchInlineSnapshot(`
  "
  <div>
    <button id='a'>Click a</button><b>0</b>
    <div>
      <button id='b'>Click b</button><b>1</b>
      <div><button id='c'>Click c</button><b>1</b></div>
    </div>
    <div>
      <button id='d'>Click d</button><b>1</b>
      <div><button id='e'>Click e</button><b>0</b></div>
    </div>
    <div><button id='f'>Click f</button><b>0</b></div>
  </div>
  "
  `)
      expect(aClicked).toMatchInlineSnapshot(`
  "
  <div>
    <button id='a'>Click a</button><b>1</b>
    <div>
      <button id='b'>Click b</button><b>1</b>
      <div><button id='c'>Click c</button><b>1</b></div>
    </div>
    <div>
      <button id='d'>Click d</button><b>1</b>
      <div><button id='e'>Click e</button><b>0</b></div>
    </div>
    <div><button id='f'>Click f</button><b>0</b></div>
  </div>
  "
  `)
    })
  })
})
