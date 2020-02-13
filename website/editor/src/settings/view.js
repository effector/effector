// @flow

import * as React from 'react'
import {useStore, useStoreMap, useList} from 'effector-react'
import {styled} from 'linaria/react'
import {Toggle} from '../components/Toggle'
import {
  typeHoverToggleChange,
  flowToggleChange,
  tsToggleChange,
  clickPrettify,
  prettier,
} from '.'
import {flowToggle, tsToggle, typeHoverToggle} from './state'
import {selectVersion} from '../editor'
import {packageVersions, version} from '../editor/state'

export const PrettifyButton = () => {
  const {disabled, text} = useStoreMap({
    store: prettier.pending,
    keys: [],
    fn: pending => ({
      text: pending ? 'In progress' : 'Prettify',
      disabled: pending,
    }),
  })
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
        <div className="versions">
          <select
            value={useStore(version)}
            onChange={e => selectVersion(e.currentTarget.value)}>
            {useList(packageVersions, item => (
              <option value={item}>{item}</option>
            ))}
          </select>
        </div>
        Effector version
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

const SettingsGroup = styled.div`
  --settings-row-padding: 15px;

  background-color: #f7f7f7;
  border-left: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  grid-column: 3 / span 1;
  grid-row: 3 / span 2;

  @media (max-width: 699px) {
    grid-column: 1 / span 1;
    grid-row: 3 / span 7;
  }
`

const Label = styled.label`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: auto 1fr;
  padding: var(--settings-row-padding);
  border-bottom: 1px solid #ddd;
  font-weight: bold;
`

export const Section = styled.section`
  background-color: #fff;
  border-bottom: 15px solid #f7f7f7;

  & + & {
    border-top: 1px solid #ddd;
  }
`

const Button = styled.button`
  --color-main: #e95801;
  margin: var(--settings-row-padding);

  display: inline-block;
  border: none;
  border-radius: 2px;
  border-width: 0;
  padding: 0.5rem 1rem;
  text-decoration: none;
  background: var(--color-main);
  color: #ffffff;
  font-family: sans-serif;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  transition: background 70ms ease-in-out, transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;

  &:hover,
  &:focus {
    background: #0053ba;
  }

  &:focus {
    outline: 1px solid #fff;
    outline-offset: -4px;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background: hsl(213, 50%, 45%);
    color: hsla(0, 0%, 100%, 0.9);
    cursor: not-allowed;
  }
`
