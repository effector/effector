//@flow

import * as React from 'react'
import {styled} from 'linaria/react'
import {createStore, createEvent, type Store, type Event} from 'effector'
import {createComponent, type StoreView} from 'effector-react'

export function Toggle({
  name,
  checked,
  onChange,
}: {
  name: string,
  checked: boolean,
  onChange: (e: SyntheticEvent<HTMLInputElement>) => mixed,
}) {
  return (
    <Input type="checkbox" checked={checked} onChange={onChange} name={name} />
  )
}
Toggle.defaultProps = {
  checked: false,
  onChange() {},
}

const Input = styled.input`
  --color-main: #e95801;
  --color-second: #676778;
  --shadow-intense: 0.4;
  top: -1px;
  position: relative;
  height: 2em;
  width: calc(100% - 0.6em);
  min-width: 4em;
  border-radius: 2em;
  -webkit-appearance: none;
  outline: none;
  margin: 0 0.6em 0 0;
  cursor: pointer;
  &:checked::before {
    background-color: var(--color-main);
  }
  &:not(:checked)::before {
    background-color: var(--color-second);
  }
  &:checked::after {
    left: calc(100% - 20px);
  }
  &:not(:checked)::after {
    left: 4px;
  }
  &::before {
    content: '';
    position: absolute;
    display: block;
    height: 100%;
    width: 100%;
    padding: 2px;
    border-radius: 2em;
    top: 0;
    left: 0;
    box-sizing: content-box;
    box-shadow: inset 1.5px 1px 2px rgba(0, 0, 0, var(--shadow-intense));
  }
  &::after {
    content: '';
    position: absolute;
    display: block;
    height: 1.8em;
    width: 1.8em;
    top: 3px;
    border-radius: 1em;
    background: white;
    box-shadow: 0 0px 1px rgba(0, 0, 0, var(--shadow-intense)),
      2px 2px 2px 0 rgba(0, 0, 0, var(--shadow-intense));
    transition: background 0.07s ease-out, left 0.07s ease-out;
  }
`
