//@flow

import React from 'react'
import {cx} from 'linaria'
import {createStoreObject} from 'effector'
import {createComponent} from 'effector-react'
import debounce from 'lodash.debounce'

import 'codemirror/lib/codemirror.css'
import './styles.css'
import {ShareButton} from './components/ShareButton'
import {VersionLink} from './components/VersionLink'
import {VersionSelector} from './components/VersionSelector'
import Panel from './components/CodeMirrorPanel'
import Errors from './components/Errors'
import SecondanaryTabs from './components/SecondanaryTabs'
import Console from './components/Console'
import Outline from './components/Outline'
import {
  sourceCode,
  logs,
  packageVersions,
  selectVersion,
  graphiteCode,
  changeSources,
  codeError,
  stats,
  shareableUrl,
  copyShareableUrl,
  version,
  tab,
  tabApi,
  codeSetCursor,
} from './domain'

const OutlineView = createComponent(stats, ({}, stats) => <Outline {...stats} />)

const ErrorsView = createComponent(
  codeError,
  ({}, {message, isError, stack}) => (
    <Errors isError={isError} message={message} stack={stack} />
  ),
)

const jsonRef = React.createRef()

const changeSourcesDebounced = debounce(changeSources, 500)
const CodeView = createComponent(sourceCode, ({}, sources) => (
  <Panel
    className="sources"
    setCursor={codeSetCursor}
    value={sources}
    mode="text/jsx"
    onChange={changeSourcesDebounced}
    lineWrapping
  />
))

const GraphiteView = createComponent(graphiteCode, ({style}, graphite) => (
  <Panel
    className="results"
    style={style}
    readOnly={true}
    passive
    lineWrapping={false}
    ref={jsonRef}
    value={graphite}
    mode="application/json"
  />
))

const ShareButtonView = createComponent(shareableUrl, ({}, shareableUrl) => (
  <ShareButton
    className="try-button try-button-share"
    url={shareableUrl}
    onClick={copyShareableUrl}
  />
))

const VersionSelectorView = createComponent(
  createStoreObject({versions: packageVersions, selected: version}),
  ({}, {versions, selected}) => (
    <VersionSelector
      versions={versions}
      selected={selected}
      onChange={selectVersion}
    />
  ),
)

const VersionLinkView = createComponent(version, ({}, version) => (
  <VersionLink version={version} />
))

const TabsView = createComponent(tab, (_, tab) => (
  <>
    <ul
      className={cx(
        tab === 'graphite' && 'show-graphite',
        tab === 'dom' && 'show-dom',
        'toolbar',
        'header-tabs',
      )}>
      <li className="tab graphite-tab" onClick={tabApi.showGraphite}>
        Graphite
      </li>
      <li className="tab dom-tab" onClick={tabApi.showDOM}>
        DOM
      </li>
    </ul>
    {tab === 'graphite' && <GraphiteView />}
    <div
      style={{display: tab === 'dom' ? 'block' : 'none'}}
      className="dom">
      <iframe id="dom" />
    </div>
  </>
))

export default (
  <div className="try-inner">
    <VersionLinkView />
    <OutlineView />
    <CodeView />
    <div className="header">
      <VersionSelectorView />
      <ShareButtonView />
    </div>
    <TabsView />
    <SecondanaryTabs />
    <ErrorsView />
  </div>
)
