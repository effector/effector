import * as React from 'react'
import { shallow } from 'enzyme'

import Console from '..'

it('renders', () => {
  const result = shallow(
    <Console
      logs={[
        {
          method: 'log',
          id: 'id',
          data: ['my-log']
        }
      ]}
    />
  )

  expect(result.html()).toContain('my-log')
})

it('formats messages', () => {
  const result = shallow(
    <Console
      logs={[
        {
          method: 'log',
          id: 'id',
          data: ['%ctest', 'color: red']
        }
      ]}
    />
  )

  expect(result.html()).toContain('<span style="color: red;">test</span>')
})

it('displays object names', () => {
  const result = shallow(
    <Console
      logs={[
        {
          method: 'log',
          id: 'id',
          data: [new class MyObject {}()]
        }
      ]}
    />
  )

  expect(result.html()).toContain('MyObject {}')
})
