//@flow

import * as React from 'react'

import {createComponent} from 'effector-react'

import {todosView} from './store/view'
// import {addTodo} from './store/event'

const Footer = () => (
 <footer>
  <a href="https://github.com/zerobias/effector">effector on github</a>
 </footer>
)

const Header = () => (
 <header>
  <h1>Todo list ☄</h1>
 </header>
)

const TodoList = createComponent(todosView, (props: {||}, state) =>
 state.map(item => <div key={item.id}>{item.text}</div>),
)

export const App = () => (
 <main>
  <Header />
  <TodoList />
  <Footer />
 </main>
)
