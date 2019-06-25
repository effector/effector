// @flow

import * as React from 'react'
import {Label, SettingsGroup} from './styled'
import {Toggle} from '../components/Toggle'
import {flowToggle, flowToggleChange} from './domain'
import {useStore} from 'effector-react'

export const Settings = () => {
  return (
    <SettingsGroup>
      <Label>
        <Toggle
          name="flow"
          checked={useStore(flowToggle)}
          onChange={flowToggleChange}
        />
        Flow
      </Label>
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
