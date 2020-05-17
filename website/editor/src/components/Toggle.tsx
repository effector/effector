import * as React from 'react'
import {styled} from 'linaria/react'
import {createStore, createEvent, Store, Event} from 'effector'
import {createComponent, StoreView} from 'effector-react'

export function Toggle({
  name,
  checked,
  onChange,
  style,
  size = 'default',
}: {
  name: string,
  checked: boolean,
  onChange: (e: SyntheticEvent<HTMLInputElement>) => any,
}) {
  return (
    <Input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      name={name}
      style={style}
      size={size}
    />
  )
}

Toggle.defaultProps = {
  checked: false,
  onChange() {},
}

const toggeSizeSettings = {
  small: {
    top: '1px',
    minWidth: '3.5em',
    width: '3.5em',
    height: '1.6em',
    borderRadius: '2em',
    margin: 0,
    before: {
      borderRadius: '1em',
    },
    after: {
      top: '3px',
      width: '1.45em',
      height: '1.45em',
    },
  },
  default: {
    top: '-1px',
    minWidth: '4em',
    width: 'calc(100% - 0.6em)',
    height: '2em',
    borderRadius: '2em',
    margin: '0 0.6em 0 0',
    before: {
      borderRadius: '2em',
    },
    after: {
      top: '3px',
      width: '1.8em',
      height: '1.8em',
    },
  },
}

const Input = styled.input`
  --color-main: #e95801;
  --color-second: #676778;
  --shadow-intense: 0.4;
  top: ${props => toggeSizeSettings[props.size].top};
  position: relative;
  height: ${props => toggeSizeSettings[props.size].height};
  width: ${props => toggeSizeSettings[props.size].width};
  min-width: ${props => toggeSizeSettings[props.size].minWidth};
  border-radius: ${props => toggeSizeSettings[props.size].borderRadius};
  -webkit-appearance: none;
  outline: none;
  margin: ${props => toggeSizeSettings[props.size].margin};
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
    border-radius: ${props =>
    toggeSizeSettings[props.size].before.borderRadius};
    top: 0;
    left: 0;
    box-sizing: content-box;
    box-shadow: inset 1.5px 1px 2px rgba(0, 0, 0, var(--shadow-intense));
  }
  &::after {
    content: '';
    position: absolute;
    display: block;
    height: ${props => toggeSizeSettings[props.size].after.height};
    width: ${props => toggeSizeSettings[props.size].after.width};
    top: ${props => toggeSizeSettings[props.size].after.top};
    border-radius: 1em;
    background: white;
    box-shadow: 0 0px 1px rgba(0, 0, 0, var(--shadow-intense)),
      2px 2px 2px 0 rgba(0, 0, 0, var(--shadow-intense));
    transition: background 0.07s ease-out, left 0.07s ease-out;
  }
`
