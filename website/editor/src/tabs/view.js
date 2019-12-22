// @flow

import * as React from 'react'
import {useStore, useStoreMap} from 'effector-react'
import {tab as _tab, tabApi} from './domain'
import {GraphiteView} from '../graphite/view'
import {Settings} from '../settings/view'
import {flowToggle as _flowToggle} from '../settings/state'
import {TypeErrorsView} from '../flow/view'
import {Share} from '../share'
import {TabHeader, TabHeaderList} from './styled'
import {mediaQuery} from '../components/mediaQuery'

const SmallScreens = mediaQuery('(max-width: 699px)')

const tabs = {
  editor: {
    select: tabApi.showEditor,
    title: 'Editor',
  },
  outline: {
    select: tabApi.showOutline,
    title: 'Outline',
  },
  errors: {
    select: tabApi.showErrors,
    title: 'Errors',
  },
  dom: {
    select: tabApi.showDOM,
    title: 'DOM',
  },
  share: {
    select: tabApi.showShare,
    title: 'Share',
  },
  settings: {
    select: tabApi.showSettings,
    title: 'Settings',
  },
}

const TabHeaderTemplate = ({name}: {name: $Keys<typeof tabs>, ...}) => {
  const isActive = useStoreMap({
    store: _tab,
    keys: [name],
    fn: (activeTab, [tab]) => activeTab === tab,
  })
  const {select, title} = tabs[name]
  return (
    <TabHeader onClick={select} isActive={isActive}>
      {title}
    </TabHeader>
  )
}

export const TabsView = () => {
  const tab = useStore(_tab)
  const flowToggle = useStore(_flowToggle)
  return (
    <>
      <TabHeaderList className="header-tabs">
        <SmallScreens>
          <TabHeaderTemplate name="editor" />
          <TabHeaderTemplate name="outline" />
        </SmallScreens>
        {flowToggle && <TabHeaderTemplate name="errors" />}
        <TabHeaderTemplate name="dom" />
        <TabHeaderTemplate name="share" />
        <TabHeaderTemplate name="settings" />
      </TabHeaderList>
      {tab === 'graphite' && <GraphiteView />}
      <div
        style={{visibility: tab === 'dom' ? 'visible' : 'hidden'}}
        className="dom">
        <iframe id="dom" />
      </div>
      {tab === 'share' && <Share />}
      {tab === 'settings' && <Settings />}
      {tab === 'errors' && <TypeErrorsView />}
    </>
  )
}
