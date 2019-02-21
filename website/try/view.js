import React from 'react'
import ReactDOM from 'react-dom'
import {createStoreObject} from 'effector'
import {createComponent} from 'effector-react'

import 'codemirror/lib/codemirror.css'
import './styles.css'
import {VersionLink} from './components/VersionLink'
import {VersionSelector} from './components/VersionSelector'
import Panel from './components/CodeMirrorPanel'
import Errors from './components/Errors'
import Stats from './components/Stats'
import {
  sourceCode,
  packageVersions,
  selectVersion,
  graphiteCode,
  changeSources,
  codeError,
  stats,
} from './domain'
import {version} from './evaluator'

const StatsView = createComponent(stats, ({}, {event, store}) => (
  <Stats event={event} store={store} />
))

const ErrorsView = createComponent(
  codeError,
  ({}, {message, isError, stack}) => (
    <Errors isError={isError} message={message} stack={stack} />
  ),
)

const jsonRef = React.createRef()

const CodeView = createComponent(sourceCode, ({}, sources) => (
  <Panel
    className="sources"
    value={sources}
    mode="application/javascript"
    onChange={changeSources}
    lineWrapping
  />
))

const GraphiteView = createComponent(graphiteCode, ({}, graphite) => (
  <Panel
    className="results"
    readOnly={true}
    passive
    lineWrapping={false}
    ref={jsonRef}
    value={graphite}
    mode="application/json"
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

export default (
  <div className="try-inner">
    <VersionLinkView />
    <CodeView />
    <VersionSelectorView />
    <GraphiteView />
    <ErrorsView />
    <StatsView />
  </div>
)
