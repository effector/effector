//@flow

import * as React from 'react'

import {TodoList} from './TodoList'

import {Header} from './Header'
import {Footer} from './Footer'

export const App = () => (
 <React.Fragment>
  <Header />
  <TodoList />
  <Footer />
 </React.Fragment>
)
