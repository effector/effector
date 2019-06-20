//@flow

import React from 'react'
import {cx} from 'linaria'
import {styled} from 'linaria/react'
import {LogsView} from '../logs/view'
import {createComponent} from 'effector-react'
import {createApi, createStore, createStoreObject, Store} from 'effector'

const tab: Store<'console'> = createStore('console')
// tab.on(stats, (tab, {event, store, effect, domain}) => {
//   if (event.length > 0) return 'events'
//   if (store.length > 0) return 'storages'
//   if (effect.length > 0) return 'effects'
//   if (domain.length > 0) return 'domains'
//   return 'events'
// })
const api = createApi(tab, {
  // showEvents: () => 'events',
  // showStorages: () => 'storages',
  // showEffects: () => 'effects',
  // showDomains: () => 'domains',
  showConsole: () => 'console',
})

const TabContent = styled('div')`
  overflow: auto;
`

const TabView = createComponent(tab, ({}, tab) => {
  //TODO: unify this
  const className = `tab-content ${cx(
    // tab === 'events' && 'show-events',
    // tab === 'storages' && 'show-storages',
    // tab === 'effects' && 'show-effects',
    // tab === 'domains' && 'show-domains',
    tab === 'console' && 'show-console',
  )}`
  const mapper = item => {
    const name = item?.compositeName?.fullName || item?.shortName || item.id
    return <li key={item.kind + item.id + name}>{name}</li>
  }
  return <TabContent>{tab === 'console' && <LogsView />}</TabContent>
})

const ToolbarView = createComponent(tab, ({}, tab) => {
  const className = `toolbar ${cx(
    // tab === 'events' && 'show-events',
    // tab === 'storages' && 'show-storages',
    // tab === 'effects' && 'show-effects',
    // tab === 'domains' && 'show-domains',
    tab === 'console' && 'show-console',
  )}`
  return (
    <ul className={className}>
      <li onClick={api.showConsole} className="tab console-tab">
        Console
      </li>
    </ul>
  )
})

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
