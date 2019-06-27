// @flow

import * as React from 'react'
import {Section, Label, SettingsGroup} from './styled'
import {Toggle} from '../components/Toggle'
import {
  typeHoverToggle,
  typeHoverToggleChange,
  flowToggle,
  flowToggleChange,
  tsToggle,
  tsToggleChange,
} from './domain'
import {useStore} from 'effector-react'

export {flowToggle, tsToggle}

export const Settings = () => {
  return (
    <SettingsGroup>
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
}
