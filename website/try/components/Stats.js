//@flow

import React from 'react'
import cx from 'classnames'
import {stats} from '../domain'
import {createComponent} from 'effector-react'
import {createApi, createStore, createStoreObject, Store} from 'effector'

const tab: Store<'events' | 'storages' | 'effects' | 'domains'> = createStore(
  'events',
)
tab.on(stats, (tab, {event, store, effect, domain}) => {
  if (event.length > 0) return 'events'
  if (store.length > 0) return 'storages'
  if (effect.length > 0) return 'effects'
  if (domain.length > 0) return 'domains'
  return 'events'
})
const api = createApi(tab, {
  showEvents: () => 'events',
  showStorages: () => 'storages',
  showEffects: () => 'effects',
  showDomains: () => 'domains',
  //showDOM: () => 'dom'
})

const TabView = createComponent(tab, ({event, store, effect, domain}, tab) => {
  //TODO: unify this
  const className = `tab-content ${cx({
    'show-events': tab === 'events',
    'show-storages': tab === 'storages',
    'show-effects': tab === 'effects',
    'show-domains': tab === 'domains',
    //'show-dom': tab === 'dom'
  })}`
  const mapper = item => {
    const name = item?.compositeName?.fullName || item?.shortName || item.id
    return <li key={item.kind + item.id + name}>{name}</li>
  }
  return (
    <div className={className}>
      <div className="events-tab-content">
        <ol>{event.map(mapper)}</ol>
      </div>
      <div className="storages-tab-content">
        <ol>{store.map(mapper)}</ol>
      </div>
      <div className="effects-tab-content">
        <ol>{effect.map(mapper)}</ol>
      </div>
      <div className="domains-tab-content">
        <ol>{domain.map(mapper)}</ol>
      </div>
    </div>
  )
})

const ToolbarView = createComponent(
  tab,
  ({event, store, effect, domain}, tab) => {
    const className = `toolbar ${cx({
      'show-events': tab === 'events',
      'show-storages': tab === 'storages',
      'show-effects': tab === 'effects',
      'show-domains': tab === 'domains',
      //'show-dom': tab === 'dom'
    })}`
    return (
      <ul className={className}>
        {event.length > 0 && (
          <li onClick={api.showEvents} className="tab events-tab">
            Events
          </li>
        )}
        {store.length > 0 && (
          <li onClick={api.showStorages} className="tab storages-tab">
            Storages
          </li>
        )}
        {effect.length > 0 && (
          <li onClick={api.showEffects} className="tab effects-tab">
            Effects
          </li>
        )}
        {domain.length > 0 && (
          <li onClick={api.showDomains} className="tab domains-tab">
            Domains
          </li>
        )}
      </ul>
    )
  },
)

export default function Stats({event, store, effect, domain}) {
  const isStats =
    event.length > 0
    || store.length > 0
    || effect.length > 0
    || domain.length > 0
  if (isStats) {
    return (
      <div className="stats has-stats">
        <ToolbarView
          event={event}
          store={store}
          effect={effect}
          domain={domain}
        />
        <TabView event={event} store={store} effect={effect} domain={domain} />
      </div>
    )
  }
  return <div className="stats no-stats" />
}
