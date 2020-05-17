import * as React from 'react'
import {useStore, useStoreMap} from 'effector-react'
import {tab as _tab, tabApi} from './domain'
import {GraphiteView} from '../graphite/view'
import {PrettifyButton, Settings} from '../settings/view'
import {flowToggle as _flowToggle} from '../settings/state'
import {TypeErrorsView} from '../flow/view'
import {Share} from '../share/view'
import {TabHeader, TabHeaderList} from './styled'
import {mediaQuery} from '../components/mediaQuery'
import {Gist} from '../github/view'

export const SmallScreens = mediaQuery('(max-width: 699px)')
export const DesktopScreens = mediaQuery('(min-width: 700px)')

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
  gist: {
    select: tabApi.showGist,
    title: 'Gist',
  },
}

const TabHeaderTemplate = ({name}) => {
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
      <TabHeaderList
        className="header-tabs"
        style={{
          borderLeft: '1px solid #ddd',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
        <PrettifyButton />
        <SmallScreens>
          <TabHeaderTemplate name="editor" />
        </SmallScreens>
        {flowToggle && <TabHeaderTemplate name="errors" />}
        <TabHeaderTemplate name="dom" />
        <TabHeaderTemplate name="share" />
        <TabHeaderTemplate name="settings" />
      </TabHeaderList>
      {tab === 'graphite' && <GraphiteView />}
      <div style={{display: tab === 'dom' ? 'block' : 'none'}} className="dom">
        <iframe id="dom" />
      </div>
      {tab === 'share' && <Share />}
      {tab === 'settings' && <Settings />}
      {tab === 'errors' && <TypeErrorsView />}
    </>
  )
}
