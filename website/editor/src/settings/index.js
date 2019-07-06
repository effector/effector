// @flow

import * as React from 'react'
import {Section, Label, SettingsGroup, Button} from './styled'
import {Toggle} from '../components/Toggle'
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
import {useStore} from 'effector-react'

export {flowToggle, tsToggle} from './domain'

const Prettify = () => {
  const {disabled, text} = useStore(prettierButtonStatus)
  return (
    <Section>
      <Button disabled={disabled} onClick={clickPrettify}>
        {text}
      </Button>
    </Section>
  )
}

export const Settings = () => (
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
    <Prettify />
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
