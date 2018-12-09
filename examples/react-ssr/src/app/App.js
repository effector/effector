//@flow

import * as React from 'react'
import styled from 'styled-components'
import {createComponent} from 'effector-react'

import * as Button from '../ui/Button'
import * as Text from '../ui/Text'
import {Card, WhiteCard} from '../ui/Card'
import {todosView, codeSource} from './store/view'
// import {addTodo} from './store/event'

const Footer = () => (
 <footer>
  <Button.A href="https://github.com/zerobias/effector">
   effector on github
  </Button.A>
 </footer>
)
const HeadBlock = styled.header`
 grid-area: header;
`
const Header = () => (
 <HeadBlock>
  <Text.H1 bold align="center" fontSize={6}>
   Todo list ☄
  </Text.H1>
 </HeadBlock>
)

const ItemCard = Card.extend`
 display: flex;
 justify-content: space-between;
`

const EventsHeader = styled.div`
 display: flex;
 justify-content: space-between;
`

const Item = ({text}) => (
 <ItemCard boxShadowSize="sm" p={3} color="black" bg="white">
  <Text.Span bold>Event</Text.Span>
  <Text.Span>{text}</Text.Span>
 </ItemCard>
)
const CodeBox = Card.extend`
 grid-area: code;
`
const Code = createComponent(codeSource, (_: {||}, source) => (
 <CodeBox boxShadowSize="sm" p={3} color="black" bg="white">
  <Text.P bold>Source code</Text.P>
  <code>{source.map((line, i) => <p key={i}>{line}</p>)}</code>
 </CodeBox>
))
const EventsWrapper = Card.extend`
 grid-area: events;
 display: grid;
 grid-template-columns: 10rem;
 grid-gap: 1rem;
`

const Main = styled.main`
 display: grid;
 grid-gap: 1rem;
 grid-template-areas:
  'header header'
  'events code';
`

const TodoList = createComponent(todosView, (props: {||}, state) => (
 <EventsWrapper boxShadowSize="sm" p={3} color="black" bg="white">
  <EventsHeader>
   <Text.Span bold fontSize={4}>
    Events
   </Text.Span>
   <Button.A p={2}>+</Button.A>
  </EventsHeader>
  {state.map(item => <Item key={item.id} text={item.text} />)}
 </EventsWrapper>
))

export const App = () => (
 <Main>
  <Header />
  <TodoList />
  <Code />
  <Footer />
 </Main>
)
