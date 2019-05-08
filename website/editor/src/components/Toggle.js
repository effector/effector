//@flow

import * as React from 'react'
import {styled} from 'linaria/react'
import {createStore, createEvent, type Store, type Event} from 'effector'
import {createComponent, type StoreView} from 'effector-react'

export function createToggle(
  defaultState: boolean = false,
): $ReadOnly<{
  Toggle: StoreView<boolean, {name?: string}>,
  state: Store<boolean>,
  toggle: Event<void>,
  onChange: Event<*>,
}> {
  const toggle = createEvent('toggle toggle')
  const onChange = createEvent('on checkbox change')
  const state = createStore(defaultState)
    .on(toggle, state => !state)
    .on(onChange, (state, e) => e.target.checked)
  const Toggle = createComponent(state, ({name}: {name?: string}, state) => (
    <Input type="checkbox" checked={state} onChange={onChange} name={name} />
  ))
  return {Toggle, toggle, state, onChange}
}

const Input = styled.input`
  --color-main: #e95801;
  --color-second: #676778;
  --shadow-intense: 0.4;
  top: -1px;
  position: relative;
  height: 1em;
  width: calc(100% - 0.6em);
  max-width: 2em;
  border-radius: 0.5em;
  -webkit-appearance: none;
  outline: none;
  margin: 0 0.6em 0 0;
  &:checked::before {
    background-color: var(--color-main);
  }
  &:not(:checked)::before {
    background-color: var(--color-second);
  }
  &:checked::after {
    left: calc(100% - 9px);
  }
  &:not(:checked)::after {
    left: 2px;
  }
  &::before {
    content: '';
    position: absolute;
    display: block;
    height: 100%;
    width: 100%;
    padding: 2px;
    border-radius: 1em;
    top: 0;
    left: 0;
    box-sizing: content-box;
    box-shadow: inset 0.5px 0.5px 1px rgba(0, 0, 0, var(--shadow-intense));
  }
  &::after {
    content: '';
    position: absolute;
    display: block;
    height: 1em;
    width: 1em;
    top: 2px;
    border-radius: 1em;
    background: white;
    box-shadow: 0 0px 1px rgba(0, 0, 0, var(--shadow-intense)),
      2px 2px 2px 0 rgba(0, 0, 0, var(--shadow-intense));
    transition: background 0.07s ease-out, left 0.07s ease-out;
  }
`
