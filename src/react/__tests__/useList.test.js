//@flow

import * as React from 'react'
import {render, container, act} from 'effector/fixtures/react'

import {createStore, createEvent, restore} from 'effector'

import {useList} from '../useList'
import {useStore} from '../useStore'

it('should render store items', async() => {
  const list = createStore(['foo', 'bar', 'baz'])

  const List = () => (
    <div>
      {useList(list, (item, index) => (
        <div>
          {item}
          {index}
        </div>
      ))}
    </div>
  )

  await render(<List />)
  expect(container.firstChild).toMatchInlineSnapshot(`
    <div>
      <div>
        foo
        0
      </div>
      <div>
        bar
        1
      </div>
      <div>
        baz
        2
      </div>
    </div>
  `)
})

it('should handle updates without dull re-renders', async() => {
  const fn = jest.fn()
  const update = createEvent()
  const list = createStore(['foo', 'bar', 'baz']).on(
    update,
    (list, {key, value}) => {
      const upd = [...list]
      upd[key] = value
      return upd
    },
  )

  const List = () => (
    <div>
      {useList(list, (item, index) => {
        fn(item)
        return (
          <div>
            {item}
            {index}
          </div>
        )
      })}
    </div>
  )
  await render(<List />)
  expect(container.firstChild).toMatchInlineSnapshot(`
    <div>
      <div>
        foo
        0
      </div>
      <div>
        bar
        1
      </div>
      <div>
        baz
        2
      </div>
    </div>
  `)
  expect(fn).toBeCalledTimes(3)
  await act(async() => {
    update({key: 1, value: 'update'})
  })
  expect(container.firstChild).toMatchInlineSnapshot(`
    <div>
      <div>
        foo
        0
      </div>
      <div>
        update
        1
      </div>
      <div>
        baz
        2
      </div>
    </div>
  `)
  expect(fn).toBeCalledTimes(4)
})

it('should handle inserts without dull re-renders', async() => {
  const fn = jest.fn()
  const insert = createEvent()
  const list = createStore(['foo', 'bar', 'baz']).on(insert, (list, value) => [
    ...list,
    value,
  ])

  const List = () => (
    <div>
      {useList(list, (item, index) => {
        fn(item)
        return (
          <div>
            {item}
            {index}
          </div>
        )
      })}
    </div>
  )

  await render(<List />)
  expect(container.firstChild).toMatchInlineSnapshot(`
    <div>
      <div>
        foo
        0
      </div>
      <div>
        bar
        1
      </div>
      <div>
        baz
        2
      </div>
    </div>
  `)
  expect(fn).toBeCalledTimes(3)
  await act(async() => {
    insert('update')
  })
  expect(container.firstChild).toMatchInlineSnapshot(`
    <div>
      <div>
        foo
        0
      </div>
      <div>
        bar
        1
      </div>
      <div>
        baz
        2
      </div>
      <div>
        update
        3
      </div>
    </div>
  `)
  expect(fn).toBeCalledTimes(4)
})

it('should update when keys are changed', async() => {
  const changeDependency = createEvent()
  const list = createStore(['foo', 'bar', 'baz'])
  const dependency = restore(changeDependency, 'dep')

  const List = () => {
    const dep = useStore(dependency)
    return (
      <div>
        {useList(list, {
          keys: [dep],
          fn: item => (
            <div>
              {item} {dep}
            </div>
          ),
        })}
      </div>
    )
  }

  await render(<List />)
  expect(container.firstChild).toMatchInlineSnapshot(`
    <div>
      <div>
        foo
         
        dep
      </div>
      <div>
        bar
         
        dep
      </div>
      <div>
        baz
         
        dep
      </div>
    </div>
  `)
  await act(async() => {
    changeDependency('changed')
  })
  expect(container.firstChild).toMatchInlineSnapshot(`
    <div>
      <div>
        foo
         
        changed
      </div>
      <div>
        bar
         
        changed
      </div>
      <div>
        baz
         
        changed
      </div>
    </div>
  `)
})
