//@flow

import React from 'react'
import {cx} from 'linaria'
import {styled} from 'linaria/react'
import {combine} from 'effector'
import {useStore, createComponent} from 'effector-react'
import debounce from 'lodash.debounce'
import Media from 'react-media'

//$off
import 'codemirror/lib/codemirror.css'
import './styles.css'
import {Share} from './share'
import {VersionLink} from './components/VersionLink'
import {VersionSelector} from './components/VersionSelector'
import {Header} from './components/Header'
import Panel from './components/CodeMirrorPanel'
import Errors from './components/Errors'
import SecondanaryTabs from './components/SecondanaryTabs'
import Outline from './components/Outline'
import {TypeHintView} from './flow/view'
import {GraphiteView} from './graphite/view'
import {isDesktopChanges, tab, tabApi} from './tabs/domain'
import {
  selectVersion,
  sourceCode,
  changeSources,
  codeError,
  stats,
  version,
  codeMarkLine,
  codeCursorActivity,
  codeSetCursor,
  packageVersions,
} from './domain'

const OutlineView = createComponent(
  {
    displayOutline: combine(tab, isDesktopChanges, (tab, isDesktop) =>
      isDesktop ? true : tab === 'outline',
    ),
    stats,
  },
  ({}, {displayOutline, stats}) => (
    <Outline
      style={{visibility: displayOutline ? 'visible' : 'hidden'}}
      {...stats}
    />
  ),
)

const ErrorsView = createComponent(
  codeError,
  ({}, {isError, error, stackFrames}) => (
    <Errors isError={isError} error={error} stackFrames={stackFrames} />
  ),
)

const changeSourcesDebounced = debounce(changeSources, 500)
const CodeView = createComponent(
  {
    displayEditor: combine(tab, isDesktopChanges, (tab, isDesktop) =>
      isDesktop ? true : tab === 'editor',
    ),
    sourceCode,
  },
  ({}, {displayEditor, sourceCode}) => {
    return (
      <div
        className="sources"
        style={{visibility: displayEditor ? 'visible' : 'hidden'}}>
        <Panel
          markLine={codeMarkLine}
          setCursor={codeSetCursor}
          onCursorActivity={codeCursorActivity}
          value={sourceCode}
          mode="text/jsx"
          onChange={changeSourcesDebounced}
          lineWrapping
        />
        <TypeHintView />
      </div>
    )
  },
)

const VersionLinkView = createComponent(version, ({}, version) => (
  <VersionLink version={version} />
))

const TabHeader = styled.li`
  border-right: 1px solid #ddd;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  padding: 7px 15px;
  margin: 0;
  background-color: ${({isActive}) => (isActive ? 'white' : 'inherit')};
`

const TabsView = createComponent(tab, (_, tab) => (
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
      <TabHeader onClick={tabApi.showGraphite} isActive={tab === 'graphite'}>
        Graphite
      </TabHeader>
      <TabHeader onClick={tabApi.showDOM} isActive={tab === 'dom'}>
        DOM
      </TabHeader>
      <TabHeader onClick={tabApi.showShare} isActive={tab === 'share'}>
        Share
      </TabHeader>
    </ul>
    {tab === 'graphite' && <GraphiteView />}
    <div
      style={{visibility: tab === 'dom' ? 'visible' : 'hidden'}}
      className="dom">
      <iframe id="dom" />
    </div>
    {tab === 'share' && <Share />}
  </>
))

const VersionSelectorView = createComponent(
  {versions: packageVersions, selected: version},
  (_, {versions, selected}) => {
    // const versions = useStore(packageVersions)
    // const selected = useStore(version)
    //TODO: bug in createComponent, probably actually in watchers
    //,
    return (
      <VersionSelector
        versions={versions}
        selected={selected}
        onChange={selectVersion}
      />
    )
  },
)

export default (
  <div className="try-inner">
    <VersionLinkView />
    <OutlineView />
    <CodeView />
    <Header>
      <VersionSelectorView />
    </Header>
    <TabsView />
    <SecondanaryTabs />
    <ErrorsView />
  </div>
)
