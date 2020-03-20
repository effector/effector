//@flow

import React, {useState} from 'react'
import {styled} from 'linaria/react'
import {createComponent} from 'effector-react'
import {createApi, createStore, Store} from 'effector'
import {LogsView} from '../logs/view'
import {TabHeaderList} from '../tabs/styled'
import Sizer from './Sizer'
import {theme} from './Console/theme/default'
import {clearConsole} from '../logs'
import {ArrowToBottom} from './Icons/ArrowToBottom'
import {autoScrollLog} from '../settings/state'
import {toggleAutoScroll} from '../settings'
import {IconButton} from './IconButton'


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

// style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: 10, minHeight: 36}}>
const ToolbarView = createComponent({tab, autoScrollLog}, ({}, {tab, autoScrollLog}) => (
  <TabHeaderList justify="space-between">
    <Tab onClick={api.showConsole} isActive={tab === 'console'}>
      Console
    </Tab>
    <div style={{ margin: '0 6px'}}>
      <ArrowToBottom
        width={22}
        height={22}
        color={autoScrollLog ? '#2680eb' : 'gray'}
        style={{ margin: '0 5px', cursor: 'pointer' }}
        onClick={toggleAutoScroll}
      />
      <IconButton title="Clear" icon={theme.styles.TRASH_ICON} onClick={clearConsole} />
    </div>
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
    grid-row: 5 / span 1;
    grid-template-columns: repeat(2, minmax(100px, 1fr));
  }
`

export default function() {
  const [ref, setRef] = useState(null)

  return (
    <SecondanaryTabs ref={setRef} id="console-panel">
      <Sizer direction="horizontal" cssVar="--console-height" container={ref} sign={-1} />
      <ToolbarView />
      <TabView />
    </SecondanaryTabs>
  )
}
