//@flow

import * as React from 'react'
import {renderToString} from 'react-dom/server'
import {App} from '../app/component/App'
import {injectData} from '../app/store/event'
import {html} from './html'

import '../client/on'

export const render = () => {
 const state = {
  todos: [
   {
    id: 1,
    text: 'ssr 1',
    date: new Date(),
   },
   {
    id: 2,
    text: 'ssr 2',
    date: new Date(),
   },
  ],
  itemList: {
   order: [1, 2],
   status: [[1, 'active'], [2, 'active']],
   visible: [[1, true], [2, true]],
   selected: null,
  },
  nextID: 3,
  filterStatus: 'all',
 }
 injectData(state)
 const str = renderToString(<App />)
 const result = html(str, state)
 return result
}
