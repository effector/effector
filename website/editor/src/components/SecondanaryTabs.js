//@flow

import React from 'react'
import {styled} from 'linaria/react'
import {createComponent} from 'effector-react'
import {createApi, createStore, Store} from 'effector'
import {LogsView} from '../logs/view'
import {TabHeaderList} from '../tabs/styled'

const tab: Store<'console'> = createStore('console')
const api = createApi(tab, {
  showConsole: () => 'console',
})

const Tab = styled.li`
  border-right: 1px solid #ddd;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  padding: 7px 15px;
  margin: 0;
  background-color: ${({isActive}) => (isActive ? 'white' : 'inherit')};
  border-bottom: ${({isActive}) => (isActive ? '1px solid #fff' : 'none')};
  margin-bottom: ${({isActive}) => (isActive ? '-1px' : '0')};
`

const TabContent = styled.div`
  overflow: auto;
`

const TabView = createComponent(tab, ({}, tab) => (
  <TabContent>{tab === 'console' && <LogsView />}</TabContent>
))

const ToolbarView = createComponent(tab, ({}, tab) => (
  <TabHeaderList>
    <Tab onClick={api.showConsole} isActive={tab === 'console'}>
      Console
    </Tab>
  </TabHeaderList>
))

const SecondanaryTabs = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-left: 1px solid #ddd;

  @media (max-width: 699px) {
    grid-column: 1 / span 1;
    grid-row: 11 / span 1;
    grid-template-columns: repeat(2, minmax(100px, 1fr));
  }

  @media (min-width: 700px) {
    grid-column: 3 / span 1;
    grid-row: 5 / span 2;
    grid-template-columns: repeat(2, minmax(100px, 1fr));
  }
`

export default function() {
  return (
    <SecondanaryTabs>
      <ToolbarView />
      <TabView />
    </SecondanaryTabs>
  )
}
