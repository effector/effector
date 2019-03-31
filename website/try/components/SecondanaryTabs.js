//@flow

import React from 'react'
import {cx} from 'linaria'
import {styled} from 'linaria/react'
import Console from './Console'
import {logs, stats} from '../domain'
import {createComponent} from 'effector-react'
import {createApi, createStore, createStoreObject, Store} from 'effector'

const tab: Store<
  'console',
> = createStore('console')
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
  showConsole: () => 'console'
})

const TabContent = styled('div')`
  overflow: auto;
`

const LogsView = createComponent(
  logs.map(logs => logs.map(({method, args}) => ({method, data: args}))),
  ({style}, logs) => <Console className="console" style={style} logs={logs} />,
)

const TabView = createComponent(tab, ({}, tab) => {
  //TODO: unify this
  const className = `tab-content ${cx(
    // tab === 'events' && 'show-events',
    // tab === 'storages' && 'show-storages',
    // tab === 'effects' && 'show-effects',
    // tab === 'domains' && 'show-domains',
    tab === 'console' && 'show-console'
  )}`
  const mapper = item => {
    const name = item?.compositeName?.fullName || item?.shortName || item.id
    return <li key={item.kind + item.id + name}>{name}</li>
  }
  return (
    <TabContent>
      {tab === 'console' && <LogsView />}
    </TabContent>
  )
})

const ToolbarView = createComponent(
  tab,
  ({}, tab) => {
    const className = `toolbar ${cx(
      // tab === 'events' && 'show-events',
      // tab === 'storages' && 'show-storages',
      // tab === 'effects' && 'show-effects',
      // tab === 'domains' && 'show-domains',
      tab === 'console' && 'show-console'
    )}`
    return (
      <ul className={className}>
        <li onClick={api.showConsole} className="tab console-tab">
          Console
        </li>
      </ul>
    )
  },
)

export default function SecondanaryTabs() {
  return (
    <div className="secondanary-tabs">
      <ToolbarView />
      <TabView />
    </div>
  )
}
