import {createStore, createEvent, restore, combine, sample} from 'effector'
import {
  h,
  using,
  list,
  remap,
  spec,
  variant,
  node,
  handler,
  tree,
} from 'effector-dom'

declare const act: (cb?: () => any) => Promise<void>
declare const initBrowser: () => Promise<void>
declare const el: HTMLElement
declare const exec: (cb: () => any) => Promise<string[]>
declare const execFunc: <T>(cb: () => Promise<T>) => Promise<T>

beforeEach(async () => {
  await initBrowser()
}, 10e3)

type MDNode =
  | {
      type: 'text'
      value: string
    }
  | {
      type: 'bold'
    }
  | {
      type: 'header'
      level: '1' | '2' | '3'
    }
  | {
      type: 'list'
      listType: 'ordered' | 'unordered'
    }
  | {
      type: 'listItem'
    }

type MD = {
  value: MDNode
  child: MD[]
}

test('tree', async () => {
  const [s1] = await exec(async () => {
    function mdText(text: string): MD {
      return {
        value: {
          type: 'text',
          value: text,
        },
        child: [],
      }
    }
    function listItem(child: MD[]): MD {
      return {
        value: {
          type: 'listItem',
        },
        child,
      }
    }
    const mdAST = createStore<MD[]>([
      {
        value: {
          type: 'header',
          level: '1',
        },
        child: [mdText('Title')],
      },
      {
        value: {
          type: 'list',
          listType: 'unordered',
        },
        child: [
          listItem([
            {
              value: {
                type: 'bold',
              },
              child: [mdText('Foo')],
            },
            mdText(': '),
            mdText('item one'),
          ]),
          listItem([
            {
              value: {
                type: 'bold',
              },
              child: [mdText('Bar')],
            },
            mdText(': '),
            mdText('item two'),
          ]),
        ],
      },
    ])
    using(el, () => {
      tree({
        source: mdAST,
        child: 'child',
        fn({store, child}) {
          variant({
            source: remap(store, 'value'),
            key: 'type',
            cases: {
              text({store}) {
                h('span', {
                  text: remap(store, 'value'),
                })
              },
              bold: () => h('b', child),
              list({store}) {
                variant({
                  source: store,
                  key: 'listType',
                  cases: {
                    ordered: () => h('ol', child),
                    unordered: () => h('ul', child),
                  },
                })
              },
              listItem: () => h('li', child),
              header({store}) {
                variant({
                  source: store,
                  key: 'level',
                  cases: {
                    1: () => h('h1', child),
                    2: () => h('h2', child),
                    3: () => h('h3', child),
                  },
                })
              },
            },
          })
        },
      })
    })
    await act()
  })
  expect(s1).toMatchInlineSnapshot(
    `"<h1><span>Title</span></h1><ul><li><b><span>Foo</span></b><span>: </span><span>item one</span></li><li><b><span>Bar</span></b><span>: </span><span>item two</span></li></ul>"`,
  )
})
