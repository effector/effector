// @flow

import * as React from 'react'
import {Section, Label, SettingsGroup, Button} from './styled'
import {Toggle} from '../components/Toggle'
import {VersionSelector} from '../components/VersionSelector'
import {
  typeHoverToggle,
  typeHoverToggleChange,
  flowToggle,
  flowToggleChange,
  tsToggle,
  tsToggleChange,
  prettierButtonStatus,
  clickPrettify,
} from './domain'
import {selectVersion} from '../editor'
import {packageVersions, version} from '../editor/state'
import {useStore} from 'effector-react'

export {flowToggle, tsToggle} from './domain'

export const PrettifyButton = () => {
  const {disabled, text} = useStore(prettierButtonStatus)
  return (
    <Button disabled={disabled} onClick={clickPrettify}>
      {text}
    </Button>
  )
}

export const Settings = () => (
  <SettingsGroup>
    <Section>
      <Label>
        <VersionSelector
          versions={useStore(packageVersions)}
          selected={useStore(version)}
          onChange={selectVersion}
        />
      </Label>
    </Section>
    <Section>
      <Label>
        <Toggle
          name="flow"
          checked={useStore(flowToggle)}
          onChange={flowToggleChange}
        />
        Flow
      </Label>
      <Label>
        <Toggle
          name="typescript"
          checked={useStore(tsToggle)}
          onChange={tsToggleChange}
        />
        TypeScript
      </Label>
    </Section>
    <Section>
      <Label>
        <Toggle
          name="typehover"
          checked={useStore(typeHoverToggle)}
          onChange={typeHoverToggleChange}
        />
        Type hover
      </Label>
    </Section>
    {/*<Label>
        <Toggle
          name="rollup"
          checked={useStore(flowToggle)}
          onChange={flowToggleChange}
        />
        Rollup
      </Label>*/}
  </SettingsGroup>
)
