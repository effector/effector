//@flow

import * as React from 'react'
import {render, container, act} from 'effector/fixtures/react'

import {createDomain, createStore, createEvent, restore} from 'effector'

import {useList} from '../useList'
import {useStore} from '../useStore'

test('reference example', async() => {
  const create = createEvent()
  const $data = createStore({})
  const $order = createStore([])

  $data.on(create, (_, doc) => ({..._, [doc.id]: doc}))
  $order.on(create, (_, doc) => [..._, doc.id])

  const List = () => {
    const data = useStore($data)
    return (
      <div>
        {useList($order, {
          keys: [data],
          fn(id) {
            return (
              <div>
                {id} - {data[id].name}
              </div>
            )
          },
        })}
      </div>
    )
  }
  await render(<List />)
  await act(async() => {
    create({id: 555, name: `name1`})
    create({id: 666, name: `name2`})
    create({id: 777, name: `name3`})
    create({id: 888, name: `name4`})
  })
  expect(container.firstChild).toMatchInlineSnapshot(`
    <div>
      <div>
        555
         - 
        name1
      </div>
      <div>
        666
         - 
        name2
      </div>
      <div>
        777
         - 
        name3
      </div>
      <div>
        888
         - 
        name4
      </div>
    </div>
  `)
})

test('useList with domains', async() => {
  const domain = createDomain()
  const create = domain.event()
  const $data = domain.store({})
  const $order = domain.store([])

  $data.on(create, (_, doc) => ({..._, [doc.id]: doc}))
  $order.on(create, (_, doc) => [..._, doc.id])

  const List = () => {
    const data = useStore($data)
    return (
      <div>
        {useList($order, {
          keys: [data],
          fn(id) {
            return (
              <div>
                {id} - {data[id].name}
              </div>
            )
          },
        })}
      </div>
    )
  }
  await render(<List />)
  await act(async() => {
    create({id: 555, name: `name1`})
    create({id: 666, name: `name2`})
    create({id: 777, name: `name3`})
    create({id: 888, name: `name4`})
  })
  expect(container.firstChild).toMatchInlineSnapshot(`
    <div>
      <div>
        555
         - 
        name1
      </div>
      <div>
        666
         - 
        name2
      </div>
      <div>
        777
         - 
        name3
      </div>
      <div>
        888
         - 
        name4
      </div>
    </div>
  `)
})
