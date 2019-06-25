// @flow

import * as React from 'react'
import {cx} from 'linaria'
import {styled} from 'linaria/react'
import {createComponent} from 'effector-react'
import {tab, tabApi} from './domain'
import {GraphiteView} from '../graphite/view'
import {Settings} from '../settings'
import {Share} from '../share'
import Media from 'react-media'

const TabHeader = styled.li`
  border-right: 1px solid #ddd;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  padding: 7px 15px;
  margin: 0;
  background-color: ${({isActive}) => (isActive ? 'white' : 'inherit')};
`

export const TabsView = createComponent<_, _>(tab, (_, tab) => (
  <>
    <ul className={cx('toolbar', 'header-tabs')}>
      <Media query="(max-width: 699px)">
        <>
          <TabHeader onClick={tabApi.showEditor} isActive={tab === 'editor'}>
            Editor
          </TabHeader>
          <TabHeader onClick={tabApi.showOutline} isActive={tab === 'outline'}>
            Outline
          </TabHeader>
        </>
      </Media>
      <TabHeader onClick={tabApi.showDOM} isActive={tab === 'dom'}>
        DOM
      </TabHeader>
      <TabHeader onClick={tabApi.showShare} isActive={tab === 'share'}>
        Share
      </TabHeader>
      <TabHeader onClick={tabApi.showSettings} isActive={tab === 'settings'}>
        Settings
      </TabHeader>
    </ul>
    {tab === 'graphite' && <GraphiteView />}
    <div
      style={{visibility: tab === 'dom' ? 'visible' : 'hidden'}}
      className="dom">
      <iframe id="dom" />
    </div>
    {tab === 'share' && <Share />}
    {tab === 'settings' && <Settings />}
  </>
))
